import { useState, useMemo } from 'react'

// Electricity & Energy, Lesson 24 — building a sine wave out of switches.
//
// The thing worth understanding is that an inverter never produces a smoothly
// varying voltage. It cannot: it has a DC rail and some transistors, and a
// transistor is either on or off. What it does instead is switch the full rail
// on and off about 267 times per mains cycle, varying how LONG it stays on each
// time so the AVERAGE follows a sine, and then lets an inductor do the
// averaging. Chopping, not shaping.
//
// Harmonic distortion measured over the first forty harmonics, computed from
// the exact waveform drawn on screen:
//
//   square wave        47%     cheapest, and hard on anything with a coil in it
//   modified sine      30%     a stepped approximation, the old budget inverter
//   PWM, unfiltered     3%     in this band — the rest is up at the carrier
//   PWM, filtered       0%     a small inductor removes what is left
//
// The PWM row needs its caveat stated rather than hidden: a raw PWM waveform
// is violently spiky, but its rubbish sits at 16 kHz and above, where a modest
// filter kills it. The low-order harmonics — the ones that heat motors and
// transformers — are what the 3% measures, and those are the ones that matter.
//
// A 120 V RMS supply needs a 170 V peak, and the eight-panel string from
// Lesson 19 sits at 246 V. The numbers across this course do join up.

const CARRIER = 267          // switching periods per mains cycle — 16 kHz at 60 Hz

const MODES = [
  {
    id: 'square', name: `A square wave`,
    what: `The crudest possible inverter: slam the rail one way, then the other, sixty times a second. It is the right average and the wrong shape, and anything with a coil in it — a motor, a transformer, a fan — runs hot and loud on this.`
  },
  {
    id: 'modified', name: `A modified sine`,
    what: `A square wave with a pause at each crossing. Better, and for years this was what a cheap inverter sold in a car accessory shop produced. Fine for a kettle, poor for a motor, and some electronics refuse it outright.`
  },
  {
    id: 'pwm', name: `Switched at 16 kHz`,
    what: `The rail chopped 267 times per cycle, each pulse a little wider near the peaks. The average is already a sine — but the actual voltage is still slamming between the rails, so nothing smooth has happened yet.`
  },
  {
    id: 'filtered', name: `And then filtered`,
    what: `An inductor cannot change its current instantly, so it averages the chopping out. What leaves the inverter is a genuine sine wave, and the switching noise is at 16 kHz where a small filter disposes of it easily.`
  }
]

const wave = (id) => {
  if (id === 'square') return (t) => (Math.sin(t) >= 0 ? 1 : -1)
  if (id === 'modified') return (t) => {
    const d = ((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    if (d < Math.PI / 6) return 0
    if (d < 5 * Math.PI / 6) return 1
    if (d < 7 * Math.PI / 6) return 0
    if (d < 11 * Math.PI / 6) return -1
    return 0
  }
  if (id === 'pwm') return (t) => {
    const carrier = ((t * CARRIER / (2 * Math.PI)) % 1) * 2 - 1
    return Math.sin(t) > carrier ? 1 : -1
  }
  return (t) => Math.sin(t)
}

function analyse(f) {
  const N = 16384
  const mag = []
  for (let k = 1; k <= 40; k++) {
    let a = 0, b = 0
    for (let i = 0; i < N; i++) {
      const t = (i / N) * 2 * Math.PI
      a += f(t) * Math.cos(k * t)
      b += f(t) * Math.sin(k * t)
    }
    mag[k] = Math.hypot(2 * a / N, 2 * b / N)
  }
  let h = 0
  for (let k = 2; k <= 40; k++) h += mag[k] ** 2
  return { mag, thd: (Math.sqrt(h) / mag[1]) * 100 }
}

const W = 520, H = 150

export default function Inverter() {
  const [id, setId] = useState('square')
  const m = MODES.find((x) => x.id === id)
  const f = useMemo(() => wave(id), [id])
  const { mag, thd } = useMemo(() => analyse(wave(id)), [id])

  const span = id === 'pwm' ? Math.PI / 2 : 4 * Math.PI
  const pts = []
  const steps = id === 'pwm' ? 6000 : 800
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * span
    const x = 42 + (i / steps) * (W - 56)
    const y = 76 - f(t) * 52
    pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  const ideal = []
  for (let i = 0; i <= 400; i++) {
    const t = (i / 400) * span
    ideal.push(`${i === 0 ? 'M' : 'L'} ${(42 + (i / 400) * (W - 56)).toFixed(1)} ${(76 - Math.sin(t) * 52).toFixed(1)}`)
  }

  const clean = thd < 5

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{m.name}</span>
          <span className="hw-readout-num" style={{ color: clean ? 'oklch(0.45 0.13 150)' : 'oklch(0.52 0.16 28)', fontSize: 23 }}>
            {thd.toFixed(1)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}>% distortion</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 246, minHeight: 86, marginTop: 4 }}>
            {m.what}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Switches per mains cycle" value={id === 'pwm' || id === 'filtered' ? CARRIER : id === 'modified' ? 4 : 2} u=""
            foot={id === 'pwm' || id === 'filtered' ? '16,000 times a second' : 'and that is the whole problem'} />
          <Stat label="Safe for a motor?" value={id === 'pwm' ? 'In effect' : thd < 5 ? 'Yes' : thd < 35 ? 'Poorly' : 'No'} u=""
            accent={thd < 5}
            foot={id === 'pwm' ? 'the motor’s own coils do the averaging'
              : thd < 5 ? 'this is what the grid delivers' : 'the extra frequencies become heat'} />
          <Stat label="DC rail needed" value="246" u="V" foot="120 V RMS wants a 170 V peak" />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 272, background: 'var(--paper)' }}
        role="img" aria-label={`${m.name}, with ${thd.toFixed(1)} per cent harmonic distortion.`}>
        <svg viewBox={`0 0 ${W} 232`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 206 }}>
          <line x1="42" y1="76" x2={W - 14} y2="76" stroke="var(--rule-2)" strokeWidth="1.2" />
          <text x="36" y="27" textAnchor="end" fontFamily="var(--sans)" fontSize="9.5" fill="var(--muted)">+246V</text>
          <text x="36" y="131" textAnchor="end" fontFamily="var(--sans)" fontSize="9.5" fill="var(--muted)">−246V</text>
          {id !== 'filtered' && <path d={ideal.join(' ')} fill="none" stroke="oklch(0.70 0.06 150)" strokeWidth="1.6" strokeDasharray="4 4" />}
          <path d={pts.join(' ')} fill="none" stroke={clean ? 'oklch(0.40 0.12 150)' : 'oklch(0.50 0.15 28)'} strokeWidth={id === 'pwm' ? 1.3 : 2.2} />
          {id === 'pwm' && (
            <text x={W - 14} y="140" textAnchor="end" fontFamily="var(--sans)" fontSize="10" fontStyle="italic" fill="var(--muted)">
              one quarter of a cycle, magnified — the pulses widen towards the peak
            </text>
          )}

          {/* harmonic content */}
          <text x="42" y="162" fontFamily="var(--sans)" fontSize="10" fontWeight="700" letterSpacing="0.9" fill="var(--label)">WHAT FREQUENCIES ARE IN IT</text>
          <line x1="42" y1="212" x2={W - 14} y2="212" stroke="var(--rule-2)" strokeWidth="1.2" />
          {Array.from({ length: 19 }, (_, j) => {
            const k = j + 1
            const h = Math.min(40, (mag[k] / mag[1]) * 40)
            const x = 48 + j * 24
            return <g key={k}>
              <rect x={x} y={212 - h} width="15" height={h} rx="1.5"
                fill={k === 1 ? 'oklch(0.45 0.13 150)' : 'oklch(0.56 0.16 28)'} />
              {(k === 1 || k % 4 === 1) && (
                <text x={x + 7.5} y="224" textAnchor="middle" fontFamily="var(--sans)" fontSize="9" fill="var(--muted)">
                  {k === 1 ? '60Hz' : `${k}×`}
                </text>
              )}
            </g>
          })}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 8, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {id === 'pwm'
            ? `Distortion here counts only the first forty harmonics, and by that measure PWM is already clean. Its real content sits at 16 kHz — off this chart, and exactly what the filter is for.`
            : `Green is the 60 Hz you wanted. Everything red is a frequency you did not ask for, and a motor turns all of it into heat.`}
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {MODES.map((x) => (
            <button key={x.id} className="hw-btn" onClick={() => setId(x.id)} aria-pressed={id === x.id}
              style={{ fontSize: 12.5, padding: '10px 13px', background: id === x.id ? 'var(--ink)' : 'var(--paper)', color: id === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
              {x.name}
            </button>
          ))}
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 220, textAlign: 'right' }}>
          Step through all four and watch the red bars disappear.
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
