import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Lesson 12. A weight is lifted, dropped onto a spring, and thrown back up.
//
// Three bars, always adding to the same total: height, motion, squeeze. The
// weight trades between them continuously and never loses any, which is the
// claim of the lesson made checkable rather than asserted.
//
// Nothing here has friction, which is why it never stops. That is deliberate
// and the caption says so — Lesson 13 is about why the real one does.

const G = 9.81
const READOUT_HZ = 15
const SCENE_M = 2.4           // metres of headroom drawn in the scene
const SPRING_TOP = 0.5        // where the spring begins, in metres
const K = 900                 // N/m

export default function SpringDrop({ active }) {
  const [mass, setMass] = useState(4)
  const [start, setStart] = useState(2.0)
  const sim = useRef({ y: 2.0, v: 0, running: false, acc: 0 })
  const weightRef = useRef(null)
  const springRef = useRef(null)
  const [ui, setUi] = useState({ y: 2.0, v: 0, running: false })

  const totalFor = (m, h) => m * G * h

  const step = useCallback((dt) => {
    const s = sim.current
    if (!s.running) return

    // Velocity Verlet on small fixed sub-steps. Plain Euler drifted the total
    // by about 2% over a few bounces, which a lesson claiming "the total never
    // moves" cannot afford — the caption would have been arguing with the
    // simulation. This holds it to a few hundredths of a percent.
    const accel = (y) => -G + (K * Math.max(0, SPRING_TOP - y)) / mass
    const sub = Math.max(1, Math.ceil(dt / 0.0008))
    const h = dt / sub
    for (let i = 0; i < sub; i++) {
      const a0 = accel(s.y)
      s.v += a0 * h * 0.5
      s.y += s.v * h
      s.v += accel(s.y) * h * 0.5
    }

    const squeeze = Math.max(0, SPRING_TOP - s.y)
    if (weightRef.current) weightRef.current.style.bottom = `${40 + (s.y / SCENE_M) * 170}px`
    if (springRef.current) springRef.current.style.height = `${Math.max(4, ((SPRING_TOP - squeeze) / SCENE_M) * 170)}px`

    s.acc += dt
    if (s.acc >= 1 / READOUT_HZ) {
      s.acc = 0
      setUi({ y: s.y, v: s.v, running: true })
    }
  }, [mass])

  useRafLoop(active, step)

  const drop = () => {
    const s = sim.current
    s.y = start; s.v = 0; s.running = true
    setUi({ y: start, v: 0, running: true })
  }

  const reset = () => {
    const s = sim.current
    s.y = start; s.v = 0; s.running = false
    if (weightRef.current) weightRef.current.style.bottom = `${40 + (start / SCENE_M) * 170}px`
    if (springRef.current) springRef.current.style.height = `${(SPRING_TOP / SCENE_M) * 170}px`
    setUi({ y: start, v: 0, running: false })
  }

  const total = totalFor(mass, start)
  const squeeze = Math.max(0, SPRING_TOP - ui.y)
  const height = mass * G * ui.y
  const motion = 0.5 * mass * ui.v ** 2
  const elastic = 0.5 * K * squeeze ** 2
  const sum = height + motion + elastic

  const Bar = ({ label, value, tone }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, fontSize: 12.5 }}>
      <span style={{ color: 'var(--ink-2)' }}>{label}</span>
      <span style={{ width: 96, height: 9, background: 'var(--rule-2)', borderRadius: 2, overflow: 'hidden' }}>
        <span style={{ display: 'block', height: 9, width: `${total ? Math.min(100, (value / total) * 100) : 0}%`, background: tone }} />
      </span>
      <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 46, color: 'var(--muted)' }}>{value.toFixed(1)} J</span>
    </div>
  )

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">All of it, added up</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {sum.toFixed(1)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> joules</span>
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 220, marginTop: 4 }}>
            Watch this number while everything else changes. It is the point of the lesson.
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">Which form it is in</span>
          <Bar label="Up high" value={height} tone="var(--builder)" />
          <Bar label="Moving" value={motion} tone="var(--accent-bright)" />
          <Bar label="Squeezed into the spring" value={elastic} tone="var(--green)" />
          <span style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            Three bars, one budget. Nothing is ever added and nothing is ever removed.
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label="A weight dropped onto a spring. Its energy moves between height, motion and squeeze, and the total never changes."
      >
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 28, height: 12, background: 'var(--car-body)' }} />

        {/* height marks */}
        {[0.5, 1, 1.5, 2].map((m) => (
          <div key={m} style={{ position: 'absolute', left: '50%', marginLeft: 46, bottom: 40 + (m / SCENE_M) * 170, width: 26, height: 1, background: 'var(--rule)' }}>
            <span style={{ position: 'absolute', left: 30, top: -7, fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--muted)' }}>{m} m</span>
          </div>
        ))}

        {/* the spring */}
        <div ref={springRef} style={{
          position: 'absolute', left: '50%', marginLeft: -22, bottom: 40, width: 44,
          height: (SPRING_TOP / SCENE_M) * 170,
          background: 'repeating-linear-gradient(0deg, var(--green) 0 3px, transparent 3px 8px)',
          borderLeft: '2px solid var(--green)', borderRight: '2px solid var(--green)'
        }} />

        {/* the weight */}
        <div ref={weightRef} style={{
          position: 'absolute', left: '50%', marginLeft: -26, bottom: 40 + (start / SCENE_M) * 170,
          width: 52, height: 38, borderRadius: 4, background: 'var(--car-cabin)'
        }}>
          <span style={{
            position: 'absolute', left: 0, right: 0, top: 11, textAlign: 'center',
            fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 700, color: '#f6f1e7'
          }}>
            {mass} kg
          </span>
        </div>

        <div style={{ position: 'absolute', left: 22, bottom: 6, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          Nothing here rubs against anything, which is why it never settles. Tomorrow is about why the real one does.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 190 }}>
          <label htmlFor="hw-drop-height" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Lift it to · {start.toFixed(1)} m
          </label>
          <input id="hw-drop-height" type="range" min="0.8" max="2.3" step="0.1"
            value={start} onChange={(e) => { setStart(Number(e.target.value)); sim.current.running = false; sim.current.y = Number(e.target.value); sim.current.v = 0; setUi({ y: Number(e.target.value), v: 0, running: false }) }}
            style={{ width: 190, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 170 }}>
          <label htmlFor="hw-drop-mass" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            The weight · {mass} kg
          </label>
          <input id="hw-drop-mass" type="range" min="1" max="10" step="1"
            value={mass} onChange={(e) => { setMass(Number(e.target.value)); reset() }}
            style={{ width: 170, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <button className="hw-btn hw-btn-solid" onClick={drop} style={{ padding: '13px 24px' }}>LET GO</button>
        <button className="hw-btn" onClick={reset}>PUT IT BACK</button>
      </div>
    </div>
  )
}
