import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Anatomy & Physiology, Lesson 14 — where force actually comes from.
//
// The idea worth the whole lesson: a muscle fibre has no volume control. Given
// a signal it contracts fully, and given none it does nothing. So a muscle
// cannot make each fibre pull harder for a heavier load — it recruits more
// fibres. Lifting a feather and lifting a suitcase differ in how much of the
// muscle was switched on, not in how hard any part of it tried.
//
// Recruitment runs smallest-first, which is why fine control is possible at low
// force and why heavy efforts feel coarse. The filament animation underneath is
// the mechanism: heads grab, pull, let go and reset, each cycle costing one ATP
// — which is where Lesson 3's currency is actually spent.

const UNITS = 24

export default function MuscleUnit({ active }) {
  const [effort, setEffort] = useState(20)
  const [ui, setUi] = useState({ phase: 0 })

  const sim = useRef({ phase: 0, acc: 0 })
  const live = useRef({})
  live.current = { effort }

  const step = useCallback((dt) => {
    const s = sim.current
    s.phase = (s.phase + dt * (0.6 + live.current.effort / 90)) % 1
    s.acc += dt
    if (s.acc >= 1 / 24) { s.acc = 0; setUi({ phase: s.phase }) }
  }, [])
  useRafLoop(active, step)

  const on = Math.round((effort / 100) * UNITS)
  const shorten = 0.16 * Math.sin(ui.phase * Math.PI * 2) ** 2
  const task = effort < 12 ? 'Holding a teaspoon'
    : effort < 35 ? 'Carrying a full mug'
      : effort < 65 ? 'Lifting a bag of shopping'
        : effort < 90 ? 'Shifting a heavy case' : 'Everything you have'

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">What you're doing</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 24 }}>{task}</span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 48, marginTop: 4 }}>
            {on <= 4
              ? 'Only a handful of bundles are switched on — the smallest ones, which is why light work can be so precise.'
              : on >= UNITS - 2
                ? 'Nearly every bundle is in. There is nothing left to call on, and this is what "as hard as I can" means.'
                : 'More bundles have been brought in. The ones already working are not pulling any harder — they cannot.'}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Bundles switched on" value={`${on} of ${UNITS}`} u="" accent foot="each one is all-or-nothing" />
          <Stat label="Each one is pulling" value="100" u="%" foot="the same, at every effort" />
          <Stat label="Force from the muscle" value={Math.round((on / UNITS) * 100)} u="%" foot="of everything it has" />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 272, background: 'var(--paper)' }}
        role="img" aria-label={`A muscle with ${on} of ${UNITS} bundles switched on, and the sliding filaments inside one of them.`}>
        <svg viewBox="0 0 560 240" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 224 }}>
          <text x="40" y="26" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.4" fill="var(--label)">THE WHOLE MUSCLE</text>
          {Array.from({ length: UNITS }, (_, i) => {
            const lit = i < on
            const x = 40 + (i % 12) * 42
            const y = 40 + Math.floor(i / 12) * 26
            return <rect key={i} x={x} y={y} width="34" height="16" rx="7"
              fill={lit ? 'oklch(0.62 0.15 28)' : 'oklch(0.90 0.02 28)'}
              stroke={lit ? 'oklch(0.40 0.14 28)' : 'oklch(0.70 0.03 28)'} strokeWidth="2" />
          })}

          <text x="40" y="122" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.4" fill="var(--label)">INSIDE ONE OF THEM</text>
          <g transform="translate(0 16)">
            <line x1="56" y1="150" x2="504" y2="150" stroke="oklch(0.48 0.10 255)" strokeWidth="7" strokeLinecap="round" />
            {[0, 1].map((side) => {
              const dir = side ? 1 : -1
              const base = 280 + dir * (52 - shorten * 180)
              return <g key={side}>
                <line x1={base} y1="128" x2={base + dir * 150} y2="128" stroke="oklch(0.84 0.06 85)" strokeWidth="9" strokeLinecap="round" />
                <line x1={base} y1="172" x2={base + dir * 150} y2="172" stroke="oklch(0.84 0.06 85)" strokeWidth="9" strokeLinecap="round" />
                <line x1={base + dir * 150} y1="108" x2={base + dir * 150} y2="192" stroke="oklch(0.44 0.08 85)" strokeWidth="4" />
              </g>
            })}
            <line x1="200" y1="150" x2="360" y2="150" stroke="oklch(0.54 0.13 300)" strokeWidth="11" strokeLinecap="round" />
            {Array.from({ length: 10 }, (_, i) => {
              const x = 208 + i * 16
              const up = i % 2 === 0
              const grab = Math.sin(ui.phase * Math.PI * 2 + i) > 0
              return <line key={i} x1={x} y1={150} x2={x + (grab ? 7 : -3)} y2={up ? 131 : 169}
                stroke="oklch(0.44 0.14 300)" strokeWidth="3" strokeLinecap="round" />
            })}
            <text x="280" y="212" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
              the heads grab, pull, let go and reset — one ATP each time
            </text>
          </g>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Real muscles have hundreds or thousands of bundles, not twenty-four — and in your eye a bundle may be ten fibres, in your thigh a thousand.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 260 }}>
          <label htmlFor="hw-eff" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            How much force you want · {effort}%
          </label>
          <input id="hw-eff" type="range" min="4" max="100" step="4"
            value={effort} onChange={(e) => setEffort(Number(e.target.value))}
            style={{ width: 260, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 240, textAlign: 'right' }}>
          Watch the middle number. It never moves.
        </span>
      </div>
    </div>
  )
}

function Stat({ label, value, u, foot, accent }) {
  return (
    <div>
      <div className="hw-readout-label">{label}</div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: accent ? 'var(--accent)' : undefined }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> {u}</span>
      </div>
      {foot && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{foot}</div>}
    </div>
  )
}
