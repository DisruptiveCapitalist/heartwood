import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Electricity & Energy, Lesson 25 — one phase, or three.
//
// Two facts, and the second is the one nobody is ever told.
//
// The first: single-phase power PULSATES. Voltage and current both pass through
// zero together, so the instantaneous power is zero twice per cycle — 120 times
// a second — and peaks at twice the average in between. Your house runs on a
// supply that is delivering nothing at all for an instant, 120 times a second,
// and only the inertia of everything attached hides it.
//
//   single phase, 120 V and 10 A → 1,200 W average, 2,400 W peak, 0 W twice a cycle
//   three phase,  120 V and 10 A → 3,600 W, constant, never zero
//
// The three sines are 120° apart, and sin²(x) + sin²(x−120°) + sin²(x−240°) is
// exactly 3/2 for every x. The sum does not wobble. That is not an approximation
// or a design achievement; it is an identity.
//
// The second fact: three coils spaced 120° apart and fed 120° apart produce a
// magnetic field that ROTATES, all by itself, at the supply frequency. Put a
// rotor in it and it is dragged round. No commutator, no brushes, no starting
// capacitor — which is why every serious industrial motor is three-phase, and
// why Lesson 12's commutator was a problem that three-phase simply does not
// have.
//
// Line-to-line voltage is sqrt(3) times the phase voltage: 120 V phases give
// 208 V between any two of them, which is where American commercial 208 V comes
// from.

const V = 120
const I = 10

export default function Phases({ active }) {
  const [three, setThree] = useState(false)
  const [ui, setUi] = useState({ a: 0 })

  const sim = useRef({ a: 0, acc: 0 })
  const step = useCallback((dt) => {
    const s = sim.current
    s.a = (s.a + dt * 1.1) % (Math.PI * 2)
    s.acc += dt
    if (s.acc >= 1 / 30) { s.acc = 0; setUi({ a: s.a }) }
  }, [])
  useRafLoop(active, step)

  const a = ui.a
  const total = three ? 3 * V * I : V * I
  const inst = three
    ? 3 * V * I
    : 2 * V * I * Math.sin(a) * Math.sin(a)

  const W = 520
  const WAVE_W = 360        // traces stop here, leaving the right column for the field
  const curve = (phase, amp, mid, scale) => {
    const d = []
    for (let i = 0; i <= 240; i++) {
      const t = (i / 240) * 4 * Math.PI
      d.push(`${i === 0 ? 'M' : 'L'} ${(44 + (i / 240) * WAVE_W).toFixed(1)} ${(mid - Math.sin(t + phase) * amp * scale).toFixed(1)}`)
    }
    return d.join(' ')
  }
  // Instantaneous power, in units of the single-phase average. One phase gives
  // 2·sin²(wt), which swings between 0 and 2. Three phases sum to a flat 3.
  const powerCurve = () => {
    const d = []
    for (let i = 0; i <= 240; i++) {
      const t = (i / 240) * 4 * Math.PI
      const p = three ? 3 : 2 * Math.sin(t) * Math.sin(t)
      d.push(`${i === 0 ? 'M' : 'L'} ${(44 + (i / 240) * WAVE_W).toFixed(1)} ${(206 - p * 17).toFixed(1)}`)
    }
    return d.join(' ')
  }

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{three ? 'Three phases, 120° apart' : 'One phase'}</span>
          <span className="hw-readout-num" style={{ color: three ? 'oklch(0.45 0.13 150)' : 'var(--accent)', fontSize: 23 }}>
            {Math.round(inst).toLocaleString()}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> W right now</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 246, minHeight: 86, marginTop: 4 }}>
            {three
              ? `The three add to a constant. Where one phase is passing through zero the other two are carrying, and sin² of three angles 120° apart sums to exactly 3/2 at every instant — an identity, not a happy accident. The field below rotates because of it.`
              : `Voltage and current cross zero together, so the power is zero twice per cycle — 120 times a second — and twice the average in between. The lights do not flicker only because the filament has not time to cool.`}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Average power" value={total.toLocaleString()} u="W" accent={three}
            foot={three ? 'and it never varies' : 'but never steady for an instant'} />
          <Stat label="Power reaches zero" value={three ? 'Never' : '120'} u={three ? '' : 'times a second'}
            foot={three ? 'the sum is flat' : 'twice per cycle, every cycle'} />
          <Stat label="Between any two wires" value={three ? Math.round(V * Math.sqrt(3)) : V} u="volts"
            foot={three ? '√3 × 120 — where 208 V comes from' : 'one live, one neutral'} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 290, background: 'var(--paper)' }}
        role="img" aria-label={three
          ? `Three voltages 120 degrees apart, their total power constant, and the magnetic field they produce rotating.`
          : `One alternating voltage, with its power pulsating to zero twice per cycle.`}>
        <svg viewBox={`0 0 ${W} 250`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 224 }}>
          <line x1="44" y1="74" x2="408" y2="74" stroke="var(--rule-2)" strokeWidth="1.2" />
          <path d={curve(0, 44, 74, 1)} fill="none" stroke="oklch(0.50 0.15 28)" strokeWidth="2.2" />
          {three && <>
            <path d={curve(-2.0944, 44, 74, 1)} fill="none" stroke="oklch(0.48 0.13 150)" strokeWidth="2.2" />
            <path d={curve(-4.1888, 44, 74, 1)} fill="none" stroke="oklch(0.46 0.13 250)" strokeWidth="2.2" />
          </>}
          <text x="38" y="34" textAnchor="end" fontFamily="var(--sans)" fontSize="9.5" fill="var(--muted)">+170</text>
          <text x="38" y="120" textAnchor="end" fontFamily="var(--sans)" fontSize="9.5" fill="var(--muted)">−170</text>

          <text x="44" y="150" fontFamily="var(--sans)" fontSize="10" fontWeight="700" letterSpacing="0.9" fill="var(--label)">
            POWER DELIVERED, INSTANT BY INSTANT
          </text>
          <line x1="44" y1="206" x2="408" y2="206" stroke="var(--rule-2)" strokeWidth="1.2" />
          <path d={powerCurve()} fill="none" stroke={three ? 'oklch(0.40 0.12 150)' : 'oklch(0.52 0.16 28)'} strokeWidth="2.4" />
          <text x="408" y="168" textAnchor="end" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700"
            fill={three ? 'oklch(0.38 0.12 150)' : 'oklch(0.50 0.15 28)'}>
            {three ? 'flat — never reaches zero' : 'zero, 120 times a second'}
          </text>

          {/* the rotating field */}
          {three && <g transform="translate(462 74)">
            {[0, 1, 2].map((k) => {
              const ang = (k * 2 * Math.PI) / 3 - Math.PI / 2
              return <g key={k}>
                <circle cx={Math.cos(ang) * 34} cy={Math.sin(ang) * 34} r="9"
                  fill="none" stroke={['oklch(0.50 0.15 28)', 'oklch(0.48 0.13 150)', 'oklch(0.46 0.13 250)'][k]} strokeWidth="3" />
              </g>
            })}
            <line x1="0" y1="0" x2={Math.cos(a) * 26} y2={Math.sin(a) * 26} stroke="var(--ink)" strokeWidth="3" />
            <circle cx="0" cy="0" r="3.5" fill="var(--ink)" />
            <text x="0" y="62" textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fontWeight="700" fill="var(--label)">IT ROTATES</text>
          </g>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 8, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {three
            ? `Three coils spaced 120° apart, fed 120° apart, make a field that turns on its own at the supply frequency. A motor needs nothing else to start.`
            : `A single phase cannot do that. A one-phase motor needs a capacitor or a shaded pole to fake a second phase and get itself going.`}
        </div>
      </div>

      <div className="hw-controls">
        <button className="hw-btn" onClick={() => setThree((t) => !t)} aria-pressed={three}
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 20px', borderColor: 'var(--ink)', background: three ? 'var(--paper)' : 'var(--ink)', color: three ? 'var(--ink)' : '#f6f1e7' }}>
          {three ? 'BACK TO ONE PHASE' : 'ADD THE OTHER TWO PHASES'}
        </button>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 240, textAlign: 'right' }}>
          Watch the lower trace when the other two arrive.
        </span>
      </div>
    </div>
  )
}

function Stat({ label, value, u, foot, accent }) {
  return (
    <div>
      <div className="hw-readout-label">{label}</div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: accent ? 'oklch(0.45 0.13 150)' : undefined }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> {u}</span>
      </div>
      {foot && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{foot}</div>}
    </div>
  )
}
