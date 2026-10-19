import { useState } from 'react'

// Electricity & Energy, Lesson 15 — from the plant to the wall.
//
// The closing lesson of the week, and deliberately an assembly rather than
// anything new. Every stage is something already met: the turbine turns a
// generator (Lesson 13), the generator makes AC at a frequency set by its speed
// (Lesson 7), transformers trade push for flow (Lesson 9), the line loses I²R
// (Lesson 5), and what arrives is the 120 volts of Lesson 7.
//
// The voltages are real ones for a North American grid, and the step at the end
// is the one most people have never thought about: the transformer on the pole
// outside the house is doing the same job as the one at the power station, four
// hundred thousand volts further down. There are three such changes here:
// 20 kV up to 400 kV, down to 11 kV, and down to 120.

const STAGES = [
  { id: 'turbine', name: `The turbine`, volts: null, what: `Steam, falling water or wind turns a shaft. Everything upstream of here — the fuel, the dam, the wind — exists only to turn this.`, from: `Physics I` },
  { id: 'gen', name: `The generator`, volts: 20000, what: `A loop spinning in a magnetic field, exactly as Lesson 13 showed. At 3,600 revolutions a minute it makes 60 cycles a second, which is where the grid's frequency comes from.`, from: `L13` },
  { id: 'up', name: `Step-up transformer`, volts: 400000, what: `Voltage up twentyfold, current down twentyfold, power the same. This is the single most important step in the whole journey.`, from: `L9` },
  { id: 'line', name: `The transmission line`, volts: 400000, loss: 0.6, what: `Hundreds of miles of bare wire held far apart on pylons. At this voltage the current is low, so the heat lost is a fraction of a per cent.`, from: `L5` },
  { id: 'sub', name: `The substation`, volts: 11000, what: `Down again for local distribution — shorter distances, so a lower voltage is affordable. This is the humming compound behind a fence.`, from: `L9` },
  { id: 'pole', name: `The pole transformer`, volts: 120, what: `The grey cylinder on the pole or the green box on the pavement, serving perhaps fifty houses. The same device as the one at the power station, at the other end of its range.`, from: `L9` },
  { id: 'socket', name: `Your socket`, volts: 120, what: `Alternating, sixty times a second, swinging to about ±170 and correctly called 120. Three holes, two of which do the work.`, from: `L7 · L8` }
]

export default function GridJourney() {
  const [step, setStep] = useState(0)
  const s = STAGES[step]
  const done = step >= STAGES.length - 1

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Stage {step + 1} of {STAGES.length}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 23 }}>{s.name}</span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 244, minHeight: 62, marginTop: 4 }}>
            {s.what}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Voltage here" value={s.volts === null ? '—' : s.volts >= 1000 ? `${(s.volts / 1000).toLocaleString()}k` : s.volts} u={s.volts === null ? 'mechanical' : 'volts'} accent />
          <Stat label="Lost on this stage" value={s.loss ? `${s.loss}` : '—'} u={s.loss ? '%' : ''} foot={s.loss ? 'as heat in the wire' : 'nothing worth counting'} />
          <Stat label="Where you met it" value={s.from} u="" foot="nothing here is new" />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 272, background: 'var(--paper)' }}
        role="img" aria-label={`The journey from a turbine to a socket, at stage ${step + 1}: ${s.name}.`}>
        <svg viewBox="0 0 560 236" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 220 }}>
          <line x1="44" y1="120" x2="516" y2="120" stroke="var(--rule-2)" strokeWidth="3" />
          {STAGES.map((x, i) => {
            const cx = 50 + i * 77
            const here = i === step
            const past = i < step
            return <g key={x.id} onClick={() => setStep(i)} style={{ cursor: 'pointer' }}>
              <circle cx={cx} cy="120" r={here ? 19 : 12}
                fill={here ? 'oklch(0.60 0.15 45)' : past ? 'oklch(0.80 0.08 45)' : 'oklch(0.93 0.02 85)'}
                stroke="var(--machine)" strokeWidth={here ? 3 : 2} />
              <text x={cx} y={here ? 126 : 125} textAnchor="middle" fontFamily="var(--sans)" fontSize={here ? 13 : 11} fontWeight="700"
                fill={here || past ? '#f6f1e7' : 'var(--muted)'}>{i + 1}</text>
              <text x={cx} y={i % 2 ? 160 : 92} textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5"
                fontWeight={here ? 700 : 500} fill={here ? 'var(--ink)' : 'var(--muted)'}>
                {x.volts === null ? 'turbine' : x.volts >= 1000 ? `${x.volts / 1000}kV` : `${x.volts}V`}
              </text>
            </g>
          })}
          <text x="50" y="196" textAnchor="start" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">POWER STATION</text>
          <text x="516" y="196" textAnchor="end" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">YOUR WALL</text>
          <text x="280" y="220" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
            the voltage is changed three times — and every change is the same device
          </text>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Typical North American figures. Other countries use different voltages at every stage and the sequence is identical.
        </div>
      </div>

      <div className="hw-controls">
        <button className="hw-btn" onClick={() => setStep((x) => (x >= STAGES.length - 1 ? 0 : x + 1))}
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 22px', borderColor: 'var(--ink)', background: done ? 'var(--paper)' : 'var(--ink)', color: done ? 'var(--ink)' : '#f6f1e7' }}>
          {done ? 'BACK TO THE TURBINE' : 'NEXT STAGE'}
        </button>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 250, textAlign: 'right' }}>
          Every stage names the lesson it came from. None of it is new.
        </span>
      </div>
    </div>
  )
}

function Stat({ label, value, u, foot, accent }) {
  return (
    <div>
      <div className="hw-readout-label">{label}</div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 24, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: accent ? 'var(--accent)' : undefined }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> {u}</span>
      </div>
      {foot && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{foot}</div>}
    </div>
  )
}
