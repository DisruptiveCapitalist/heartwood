import { useRef, useState, useCallback } from 'react'
import { useRafLoop, holdProps } from '../../lib/sim.js'

// Lesson 10. A rock on one end of a plank, your hand on the other.
//
// The slider that matters is not how hard you push — it is *where*. Move your
// hand out and the force you need falls, in exact proportion, and the number
// telling you the minimum falls with it before you have pushed at all. That is
// the whole of leverage, and it is also why a weight held at arm's length is so
// much worse than the same weight held against your chest.

const G = 32.2
const RAMP = 34            // lb per second while you lean on it
const READOUT_HZ = 15
const MAX_TILT = 16        // degrees

export default function Lever({ active }) {
  const sim = useRef({ push: 0, leaning: false, tilt: 0, acc: 0 })
  const plankRef = useRef(null)

  const [load, setLoad] = useState(60)          // lb on the short side
  const [loadArm] = useState(1)                 // feet from the pivot — fixed, it is the given
  const [arm, setArm] = useState(2)             // feet from the pivot to your hand
  const [ui, setUi] = useState({ push: 0, tilt: 0 })

  const loadTorque = load * loadArm
  const needed = loadTorque / arm

  const step = useCallback((dt) => {
    const s = sim.current
    s.push = s.leaning
      ? Math.min(needed * 1.9 + 8, s.push + RAMP * dt)
      : Math.max(0, s.push - RAMP * 2.4 * dt)

    const net = s.push * arm - loadTorque
    const target = net > 0 ? Math.min(MAX_TILT, (net / Math.max(1, loadTorque)) * 14) : 0
    s.tilt += (target - s.tilt) * Math.min(1, dt * 6)

    if (plankRef.current) plankRef.current.style.transform = `rotate(${(-s.tilt).toFixed(2)}deg)`

    s.acc += dt
    if (s.acc >= 1 / READOUT_HZ) {
      s.acc = 0
      setUi({ push: s.push, tilt: s.tilt })
    }
  }, [arm, loadTorque, needed])

  useRafLoop(active, step)

  const reset = () => {
    const s = sim.current
    s.push = 0; s.leaning = false; s.tilt = 0
    if (plankRef.current) plankRef.current.style.transform = 'rotate(0deg)'
    setUi({ push: 0, tilt: 0 })
  }

  const yourTorque = ui.push * arm
  const lifting = ui.tilt > 0.4
  const note = lifting
    ? `It is moving. You are turning the plank harder than the rock is.`
    : ui.push > 0
      ? `Not yet. You need ${needed.toFixed(0)} lb at this distance.`
      : `Pick a distance first. The number you need changes before you touch it.`

  const PIVOT_PCT = 32
  const handPct = PIVOT_PCT + arm * 15
  const loadPct = PIVOT_PCT - loadArm * 15

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">You need to push</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {needed.toFixed(0)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> lb</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 220, minHeight: 34 }}>
            {note}
          </span>
        </div>

        <div data-align="right" style={{ width: 272, display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
          <span className="hw-readout-label">Turning effect, each side</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12.5 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--ink-2)' }}>The rock · {load} lb × {loadArm} ft</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 62, color: 'var(--muted)' }}>{loadTorque.toFixed(0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--ink-2)' }}>You · {ui.push.toFixed(0)} lb × {arm} ft</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 62, color: lifting ? 'var(--green)' : 'var(--muted)' }}>
                {yourTorque.toFixed(0)}
              </span>
            </div>
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Pounds times feet, both sides. Whichever is bigger wins — and the feet count as much as the pounds.
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label={`A plank on a pivot with a ${load} pound rock on the short side. Pushing further from the pivot needs less force.`}
      >
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 42, height: 1, background: '#cdc0ab' }} />

        {/* distance marks, so "further out" is a thing you can see */}
        {[1, 2, 3, 4].map((ft) => (
          <div key={ft} style={{ position: 'absolute', left: `${PIVOT_PCT + ft * 15}%`, bottom: 44, width: 1, height: 8, background: 'var(--rule)' }}>
            <span style={{ position: 'absolute', top: 10, left: -6, fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--muted)' }}>{ft}</span>
          </div>
        ))}

        <div ref={plankRef} style={{
          position: 'absolute', left: `${PIVOT_PCT}%`, bottom: 108, width: 2, height: 2,
          transformOrigin: '50% 100%'
        }}>
          <div style={{ position: 'absolute', left: `${-(PIVOT_PCT - 6) * 5}px`, bottom: -6, width: 520, height: 12, marginLeft: -170, background: 'var(--car-cabin)', borderRadius: 2 }} />
        </div>

        {/* pivot */}
        <div style={{
          position: 'absolute', left: `${PIVOT_PCT}%`, bottom: 42, marginLeft: -18, width: 0, height: 0,
          borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderBottom: '62px solid var(--machine)'
        }} />

        {/* the rock */}
        <div style={{
          position: 'absolute', left: `${loadPct}%`, bottom: 116, marginLeft: -24,
          width: 48, height: 40, borderRadius: '10px 14px 8px 12px', background: 'var(--car-body)'
        }} />
        <span style={{
          position: 'absolute', left: `${loadPct}%`, bottom: 160, marginLeft: -24,
          fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: 'var(--muted)'
        }}>
          {load} LB
        </span>

        {/* your hand, and the push you are applying */}
        <div style={{ position: 'absolute', left: `${handPct}%`, bottom: 122, marginLeft: -13, width: 26, height: 20, borderRadius: '6px 6px 3px 3px', background: 'oklch(0.52 0.13 45)' }} />
        <div style={{ position: 'absolute', left: `${handPct}%`, bottom: 142, width: 3, height: Math.min(56, ui.push * 0.9), marginLeft: -1.5, background: 'var(--ink)' }} />

        <div style={{ position: 'absolute', left: 22, bottom: 14, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          The numbers along the plank are feet from the pivot.
        </div>
      </div>

      <div className="hw-controls">
        <button
          className="hw-btn"
          {...holdProps(() => { sim.current.leaning = true }, () => { sim.current.leaning = false })}
          style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '.14em', padding: '13px 26px',
            borderColor: 'var(--ink)', background: ui.push > 0 ? 'var(--ink)' : 'var(--paper)',
            color: ui.push > 0 ? '#f6f1e7' : 'var(--ink)'
          }}
        >
          HOLD TO PUSH DOWN
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 200 }}>
          <label htmlFor="hw-lever-arm" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Your hand · {arm} ft from the pivot
          </label>
          <input id="hw-lever-arm" type="range" min="0.5" max="4" step="0.5"
            value={arm} onChange={(e) => { setArm(Number(e.target.value)); reset() }}
            style={{ width: 200, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 170 }}>
          <label htmlFor="hw-lever-load" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            The rock · {load} lb
          </label>
          <input id="hw-lever-load" type="range" min="20" max="200" step="10"
            value={load} onChange={(e) => { setLoad(Number(e.target.value)); reset() }}
            style={{ width: 170, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <button className="hw-btn" onClick={reset}>LET GO</button>
      </div>
    </div>
  )
}
