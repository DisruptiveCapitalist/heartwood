import { useRef, useState, useCallback } from 'react'
import { useRafLoop, holdProps } from '../../lib/sim.js'

// Lesson 7. Lean on a heavy box until it goes.
//
// The whole lesson is in one moment: the instant it breaks free, the resistance
// *drops*, so the box lurches away from you faster than you expected. Everyone
// has done this with furniture. Almost nobody has been told why.
//
// While it is still: friction matches whatever you apply, exactly, up to its
// limit. That is the strange part — a force that knows how hard to push back.

const G = 32.2
const MU_S = 0.62      // it takes this much of the weight to break it loose
const MU_K = 0.38      // and only this much to keep it sliding
const RAMP = 26        // lb per second while you lean
const READOUT_HZ = 15

export default function BoxPush({ active }) {
  const sim = useRef({ push: 0, v: 0, x: 0, moving: false, leaning: false, acc: 0, broke: false })
  const boxRef = useRef(null)
  const [weight, setWeight] = useState(60)
  const [ui, setUi] = useState({ push: 0, friction: 0, v: 0, moving: false, broke: false })

  const step = useCallback((dt) => {
    const s = sim.current
    const staticLimit = MU_S * weight
    const kinetic = MU_K * weight

    s.push = s.leaning ? Math.min(staticLimit * 1.6, s.push + RAMP * dt) : Math.max(0, s.push - RAMP * 2.2 * dt)

    let friction
    if (!s.moving) {
      if (s.push > staticLimit) {
        s.moving = true
        s.broke = true
        friction = kinetic
      } else {
        // Static friction is not a fixed number. It is whatever it needs to be.
        friction = s.push
      }
    } else {
      friction = kinetic
    }

    if (s.moving) {
      const net = s.push - friction
      s.v = Math.max(0, s.v + (net / weight) * G * dt)
      s.x = Math.min(100, s.x + s.v * dt * 4)
      if (s.v <= 0.001 && s.push <= kinetic) { s.moving = false; s.v = 0 }
    }

    if (boxRef.current) boxRef.current.style.left = `${8 + s.x * 0.62}%`

    s.acc += dt
    if (s.acc >= 1 / READOUT_HZ) {
      s.acc = 0
      setUi({ push: s.push, friction, v: s.v, moving: s.moving, broke: s.broke })
    }
  }, [weight])

  useRafLoop(active, step)

  const setLeaning = (on) => { sim.current.leaning = on }

  const reset = () => {
    const s = sim.current
    s.push = 0; s.v = 0; s.x = 0; s.moving = false; s.leaning = false; s.broke = false
    if (boxRef.current) boxRef.current.style.left = '8%'
    setUi({ push: 0, friction: 0, v: 0, moving: false, broke: false })
  }

  const staticLimit = MU_S * weight
  const kinetic = MU_K * weight
  const note = ui.moving
    ? 'It went. Notice the floor is now fighting you less than it was a moment ago.'
    : ui.push > 0
      ? `Not moving. The floor is pushing back with exactly your ${ui.push.toFixed(0)} lb — no more, no less.`
      : 'Lean on it. Watch the two numbers while nothing happens.'

  const barW = (v) => `${Math.min(100, (v / (staticLimit * 1.6)) * 100)}%`

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Your push</span>
          <span className="hw-readout-num" style={{ color: 'var(--ink)' }}>
            {ui.push.toFixed(0)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> lb</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 220, minHeight: 48, lineHeight: 1.5 }}>
            {note}
          </span>
        </div>

        <div data-align="right" style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
          <span className="hw-readout-label">The floor pushing back</span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: ui.moving ? 'var(--green)' : 'var(--accent)' }}>
            {ui.friction.toFixed(0)} lb
          </span>
          <div style={{ height: 8, background: 'var(--rule-2)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
            <div style={{ height: 8, width: barW(ui.friction), background: ui.moving ? 'var(--green)' : 'var(--accent-bright)' }} />
            <div style={{ position: 'absolute', top: -3, left: barW(staticLimit), width: 2, height: 14, background: 'var(--brake)' }} />
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            The red mark is where it lets go — {staticLimit.toFixed(0)} lb. After that it only takes {kinetic.toFixed(0)}.
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label="A heavy box on a floor. Leaning on it does nothing until the push exceeds the floor's grip, and then the box slides away."
      >
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 62, background: 'var(--ground)', borderTop: '1px solid #cdc0ab' }} />

        <div ref={boxRef} style={{ position: 'absolute', bottom: 62, left: '8%', width: 96, height: 84 }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 96, height: 84, background: 'var(--car-cabin)', borderRadius: 3 }} />
          <div style={{ position: 'absolute', bottom: 40, left: 0, width: 96, height: 3, background: 'rgba(255,253,247,.25)' }} />
          <span style={{
            position: 'absolute', bottom: 92, left: 0, whiteSpace: 'nowrap',
            fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: 'var(--muted)'
          }}>
            {weight} LB
          </span>
          {/* your push, drawn on the left face */}
          <div style={{ position: 'absolute', bottom: 34, left: -Math.min(70, 8 + ui.push * 0.8), height: 4, width: Math.min(70, 8 + ui.push * 0.8), background: 'var(--ink)' }} />
          {/* the floor pushing back, drawn along the base */}
          <div style={{ position: 'absolute', bottom: -6, left: 4, height: 4, width: Math.min(88, 4 + ui.friction * 0.8), background: ui.moving ? 'var(--green)' : 'var(--accent-bright)' }} />
        </div>

        <div style={{ position: 'absolute', left: 22, bottom: 16, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          Black bar: what you are applying. Coloured bar: what the floor is applying back.
        </div>
      </div>

      <div className="hw-controls">
        <button
          className="hw-btn"
          {...holdProps(() => setLeaning(true), () => setLeaning(false))}
          style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '.14em', padding: '13px 26px',
            borderColor: 'var(--ink)', background: ui.push > 0 ? 'var(--ink)' : 'var(--paper)',
            color: ui.push > 0 ? '#f6f1e7' : 'var(--ink)'
          }}
        >
          HOLD TO LEAN HARDER
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 180 }}>
          <label htmlFor="hw-box-weight" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            The box weighs · {weight} lb
          </label>
          <input id="hw-box-weight" type="range" min="20" max="160" step="10"
            value={weight} onChange={(e) => { setWeight(Number(e.target.value)); reset() }}
            style={{ width: 180, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <button className="hw-btn" onClick={reset}>PUT IT BACK</button>
      </div>
    </div>
  )
}
