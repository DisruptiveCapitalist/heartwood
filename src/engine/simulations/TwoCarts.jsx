import { useRef, useState, useCallback } from 'react'
import { useRafLoop, holdProps } from '../../lib/sim.js'

// Lesson 4. The same push, given to two carts of different mass, at the same
// moment. The light one runs away from the heavy one and the gap keeps opening.
//
// The point the learner should reach on their own: doubling the push does not
// make the heavy cart behave like the light one — it makes it behave like the
// light one did *before you doubled it*. Mass is not a nuisance in the
// arithmetic; it is the thing being measured.
//
// Nothing here slows the carts down. That is deliberate, and Lesson 1's law is
// why: once you let go, neither of them has any reason to stop.

const TRACK_FEET = 24
const READOUT_HZ = 12

export default function TwoCarts({ active }) {
  const sim = useRef({
    light: { x: 0, v: 0 }, heavy: { x: 0, v: 0 }, pushing: false, acc: 0
  })
  const lightRef = useRef(null)
  const heavyRef = useRef(null)

  const [force, setForce] = useState(8)       // lb of push
  const [heavyMass, setHeavyMass] = useState(4)
  const LIGHT_MASS = 1

  const [ui, setUi] = useState({ lv: 0, hv: 0, lx: 0, hx: 0, pushing: false })

  const step = useCallback((dt) => {
    const s = sim.current
    // Pounds of force on pounds of mass: the units cancel into g, which keeps
    // the numbers in a range the learner can feel rather than merely read.
    const aLight = s.pushing ? (force / LIGHT_MASS) * 2 : 0
    const aHeavy = s.pushing ? (force / heavyMass) * 2 : 0

    s.light.v += aLight * dt
    s.heavy.v += aHeavy * dt
    s.light.x = Math.min(TRACK_FEET, s.light.x + s.light.v * dt)
    s.heavy.x = Math.min(TRACK_FEET, s.heavy.x + s.heavy.v * dt)
    if (s.light.x >= TRACK_FEET) s.light.v = 0
    if (s.heavy.x >= TRACK_FEET) s.heavy.v = 0

    if (lightRef.current) lightRef.current.style.left = `${(s.light.x / TRACK_FEET) * 100}%`
    if (heavyRef.current) heavyRef.current.style.left = `${(s.heavy.x / TRACK_FEET) * 100}%`

    s.acc += dt
    if (s.acc >= 1 / READOUT_HZ) {
      s.acc = 0
      setUi({ lv: s.light.v, hv: s.heavy.v, lx: s.light.x, hx: s.heavy.x, pushing: s.pushing })
    }
  }, [force, heavyMass])

  useRafLoop(active, step)

  const setPushing = (on) => {
    sim.current.pushing = on
    setUi((u) => ({ ...u, pushing: on }))
  }

  const reset = () => {
    const s = sim.current
    s.light = { x: 0, v: 0 }; s.heavy = { x: 0, v: 0 }; s.pushing = false
    if (lightRef.current) lightRef.current.style.left = '0%'
    if (heavyRef.current) heavyRef.current.style.left = '0%'
    setUi({ lv: 0, hv: 0, lx: 0, hx: 0, pushing: false })
  }

  const ratio = ui.hv > 0.05 ? (ui.lv / ui.hv) : null
  const note = ui.pushing
    ? 'Same hand, same push, both carts. Watch the gap open.'
    : ui.lv > 0
      ? 'You let go. Neither one is slowing down — nothing is stopping them.'
      : 'Hold the push. Give both carts exactly the same shove.'

  const cart = (label, weight, w, tone) => (
    <>
      <div style={{ position: 'absolute', bottom: 14, left: 0, width: w, height: 30 + weight * 2, background: tone, borderRadius: '4px 4px 2px 2px' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 8, width: 16, height: 16, borderRadius: '50%', background: 'var(--tyre)', border: '3px solid var(--tyre-rim)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: w - 24, width: 16, height: 16, borderRadius: '50%', background: 'var(--tyre)', border: '3px solid var(--tyre-rim)' }} />
      <span style={{
        position: 'absolute', bottom: 48 + weight * 2, left: 0, whiteSpace: 'nowrap',
        fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: 'var(--muted)'
      }}>
        {label}
      </span>
    </>
  )

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Speed · light cart</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {ui.lv.toFixed(1)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> ft/s</span>
          </span>
          <span className="hw-readout-label" style={{ marginTop: 8 }}>Speed · heavy cart</span>
          <span className="hw-readout-num" style={{ color: 'var(--ink)' }}>
            {ui.hv.toFixed(1)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> ft/s</span>
          </span>
        </div>

        <div data-align="right" style={{ width: 250, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">What the gap is telling you</span>
          <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)', minHeight: 40 }}>
            {ratio
              ? `The light cart is going ${ratio.toFixed(1)}× as fast. The heavy one is ${(heavyMass / LIGHT_MASS).toFixed(0)}× the mass.`
              : 'Push them and compare the two speeds.'}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)' }}>{note}</span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label="Two carts on a track, one light and one heavy. The same push accelerates the light one faster."
      >
        <div style={{ position: 'absolute', left: 0, right: 0, top: 96, height: 1, background: 'var(--rule)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 42, height: 1, background: 'var(--rule)' }} />

        <div ref={lightRef} style={{ position: 'absolute', top: 40, left: '0%', width: 56, height: 56 }}>
          {cart(`${LIGHT_MASS} LB`, 1, 56, 'oklch(0.60 0.10 45)')}
        </div>
        <div ref={heavyRef} style={{ position: 'absolute', bottom: 42, left: '0%', width: 72, height: 72 }}>
          {cart(`${heavyMass} LB`, Math.min(6, heavyMass), 72, 'var(--car-body)')}
        </div>
      </div>

      <div className="hw-controls">
        <button
          className="hw-btn"
          {...holdProps(() => setPushing(true), () => setPushing(false))}
          style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '.14em', padding: '13px 26px',
            borderColor: 'var(--ink)',
            background: ui.pushing ? 'var(--ink)' : 'var(--paper)',
            color: ui.pushing ? '#f6f1e7' : 'var(--ink)'
          }}
        >
          HOLD TO PUSH BOTH
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 180 }}>
          <label htmlFor="hw-force" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Push · {force} lb
          </label>
          <input id="hw-force" type="range" min="2" max="20" step="1"
            value={force} onChange={(e) => setForce(Number(e.target.value))}
            style={{ width: 180, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 180 }}>
          <label htmlFor="hw-heavy" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Heavy cart · {heavyMass} lb
          </label>
          <input id="hw-heavy" type="range" min="2" max="10" step="1"
            value={heavyMass} onChange={(e) => setHeavyMass(Number(e.target.value))}
            style={{ width: 180, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <button className="hw-btn" onClick={reset}>BACK TO THE START</button>
      </div>
    </div>
  )
}
