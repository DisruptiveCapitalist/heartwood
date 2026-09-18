import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Lesson 5. Something is thrown at you and you catch it.
//
// Two things to notice, and they are different things.
//
//   Momentum is mass times speed, so a heavy slow thing and a light fast thing
//   can be equally hard to stop. Set the sliders until the two readouts match
//   and the point makes itself.
//
//   Then: the momentum does not decide how much it hurts. The *give* does.
//   Same catch, same momentum, hands that travel a foot instead of an inch, and
//   the force drops by a factor of ten. Soft hands are not politeness; they are
//   arithmetic.

const APPROACH_FT = 20
const APPROACH_PCT = 76        // the rest of the scene is the catch itself
const G_C = 32.174             // lb-mass to lb-force
const READOUT_HZ = 15

export default function CatchIt({ active }) {
  const sim = useRef({ x: 0, v: 0, flying: false, caught: false, force: 0, acc: 0 })
  const ballRef = useRef(null)
  const handsRef = useRef(null)

  const [mass, setMass] = useState(0.3)      // lb — a baseball
  const [speed, setSpeed] = useState(60)     // ft/s
  const [give, setGive] = useState(1.0)      // ft your hands travel while stopping it

  const [ui, setUi] = useState({ v: 0, force: 0, flying: false, caught: false, penetration: 0 })

  const place = (x) => {
    if (x <= APPROACH_FT) return (x / APPROACH_FT) * APPROACH_PCT
    const p = Math.min(1, (x - APPROACH_FT) / give)
    return APPROACH_PCT + p * (100 - APPROACH_PCT)
  }

  const step = useCallback((dt) => {
    const s = sim.current
    if (!s.flying) return

    if (s.x > APPROACH_FT) {
      // Constant deceleration, chosen so it comes to rest exactly at the end of
      // the give. That is what a real catch approximates.
      const a = (speed * speed) / (2 * give)
      s.v = Math.max(0, s.v - a * dt)
      s.force = (mass * a) / G_C
    }
    s.x += s.v * dt

    const penetration = Math.max(0, Math.min(give, s.x - APPROACH_FT))
    if (ballRef.current) ballRef.current.style.left = `${place(s.x)}%`
    if (handsRef.current) {
      handsRef.current.style.left = `${APPROACH_PCT + (penetration / give) * (100 - APPROACH_PCT)}%`
    }

    if (s.v <= 0.01 && s.x > APPROACH_FT) {
      s.flying = false
      s.caught = true
      setUi({ v: 0, force: s.force, flying: false, caught: true, penetration })
      return
    }

    s.acc += dt
    if (s.acc >= 1 / READOUT_HZ) {
      s.acc = 0
      setUi({ v: s.v, force: s.force, flying: true, caught: false, penetration })
    }
  }, [mass, speed, give])

  useRafLoop(active, step)

  const launch = () => {
    const s = sim.current
    s.x = 0; s.v = speed; s.flying = true; s.caught = false; s.force = 0
    if (handsRef.current) handsRef.current.style.left = `${APPROACH_PCT}%`
    setUi({ v: speed, force: 0, flying: true, caught: false, penetration: 0 })
  }

  const reset = () => {
    const s = sim.current
    s.x = 0; s.v = 0; s.flying = false; s.caught = false; s.force = 0
    if (ballRef.current) ballRef.current.style.left = '0%'
    if (handsRef.current) handsRef.current.style.left = `${APPROACH_PCT}%`
    setUi({ v: 0, force: 0, flying: false, caught: false, penetration: 0 })
  }

  const momentum = mass * speed
  const force = ui.force
  const sting = force > 120 ? 'That one you feel in your wrist.'
    : force > 45 ? 'A solid thump.'
      : force > 0 ? 'Barely anything. Your hands did the work over a longer distance.'
        : ''
  const forceColor = force > 120 ? 'var(--brake)' : force > 45 ? 'var(--warn)' : 'var(--ink)'
  const ballPx = Math.max(16, Math.min(56, 14 + Math.sqrt(mass) * 22))

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Momentum · mass × speed</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {momentum.toFixed(1)}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> lb·ft/s</span>
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 220, minHeight: 34 }}>
            {mass.toFixed(1)} lb going {speed} ft/s. Heavy and slow can match light and fast.
          </span>
        </div>

        <div data-align="right" style={{ width: 250, display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'right' }}>
          <span className="hw-readout-label">Force on your hands</span>
          <span className="hw-readout-num" style={{ color: forceColor, fontSize: 32 }}>
            {force > 0 ? force.toFixed(0) : '—'}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}>{force > 0 ? ' lb' : ''}</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', minHeight: 34 }}>
            {sting || 'Throw it and see what the catch costs.'}
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label="A ball thrown toward a pair of waiting hands. The hands give as they catch it; more give means less force."
      >
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 64, height: 1, background: 'var(--rule)' }} />

        {/* the catch zone — how far the hands are allowed to travel */}
        <div style={{
          position: 'absolute', left: `${APPROACH_PCT}%`, right: 0, bottom: 65, height: 96,
          background: 'var(--accent-wash)', borderLeft: '1px dashed var(--accent-edge)'
        }} />
        <span style={{
          position: 'absolute', left: `${APPROACH_PCT}%`, bottom: 168, marginLeft: 8,
          fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '.12em', color: 'var(--label)'
        }}>
          GIVE · {give.toFixed(1)} FT
        </span>

        <div ref={ballRef} style={{
          position: 'absolute', bottom: 92, left: '0%', width: ballPx, height: ballPx,
          marginLeft: -ballPx / 2, borderRadius: '50%', background: 'var(--accent-deep)'
        }} />

        {/* the hands, which move back as they absorb */}
        <div ref={handsRef} style={{ position: 'absolute', bottom: 66, left: `${APPROACH_PCT}%`, width: 2, height: 2 }}>
          <div style={{ position: 'absolute', bottom: 46, left: 2, width: 20, height: 40, borderRadius: '10px 10px 4px 4px', background: 'oklch(0.52 0.13 45)' }} />
          <div style={{ position: 'absolute', bottom: 12, left: 8, width: 18, height: 40, borderRadius: '9px 9px 4px 4px', background: 'oklch(0.44 0.11 45)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 4, width: 34, height: 14, borderRadius: 7, background: 'var(--car-body)' }} />
        </div>

        <div style={{ position: 'absolute', left: 22, bottom: 20, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          The give is drawn much larger than life, so you can see it happen.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 170 }}>
          <label htmlFor="hw-catch-mass" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Mass · {mass.toFixed(1)} lb
          </label>
          <input id="hw-catch-mass" type="range" min="0.2" max="20" step="0.1"
            value={mass} onChange={(e) => setMass(Number(e.target.value))}
            style={{ width: 170, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 170 }}>
          <label htmlFor="hw-catch-speed" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Speed · {speed} ft/s
          </label>
          <input id="hw-catch-speed" type="range" min="2" max="90" step="1"
            value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
            style={{ width: 170, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 190 }}>
          <label htmlFor="hw-catch-give" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Hands give · {give.toFixed(1)} ft
          </label>
          <input id="hw-catch-give" type="range" min="0.1" max="2" step="0.1"
            value={give} onChange={(e) => setGive(Number(e.target.value))}
            style={{ width: 190, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <button className="hw-btn hw-btn-solid" onClick={launch} style={{ padding: '13px 24px' }}>THROW IT</button>
        <button className="hw-btn" onClick={reset}>RESET</button>
      </div>
    </div>
  )
}
