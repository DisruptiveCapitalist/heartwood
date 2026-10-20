import { useState } from 'react'

// Electricity & Energy, Week 5. One cell, two questions.
//
//   spring (Lesson 22) what a battery actually is
//   wear   (Lesson 23) why it does not last forever
//
// The cell is an ordinary 18650: 3,000 mAh, 3.6 V nominal, about 10.8 Wh.
//
// Lesson 22's point is that a lithium cell is not burning anything. The lithium
// ions shuttle between a graphite anode and a metal-oxide cathode and slot in
// between the layers — intercalation — and nothing is consumed. That is why it
// is reversible, and the voltage curve below is measured from real cells: steep
// at both ends and remarkably flat in the middle, which is why a phone can sit
// at "60%" for so long.
//
// Lesson 23's arithmetic, with cycles to 80% capacity as 500·(100/DoD)^1.6 and
// life roughly halving per 12 °C above 25:
//
//   DoD    cycles at 25C   lifetime Wh      at 40C   lifetime Wh
//   100%        500            5,400          210        2,270
//    80%        715            6,174          300        2,596
//    50%      1,516            8,185          637        3,441
//    20%      6,566           14,183        2,761        5,963
//
// Shallow cycling delivers over two and a half times as much total energy from
// the same cell, which is why an electric car hides a buffer at both ends and a
// phone offers to stop at 80%.

const CAP_AH = 3.0
const NOMINAL = 3.6

// Open-circuit voltage against state of charge, interpolated from real NMC.
const CURVE = [3.00, 3.50, 3.60, 3.65, 3.70, 3.75, 3.82, 3.90, 3.98, 4.08, 4.20]
const voltageAt = (soc) => {
  const x = Math.min(0.999, Math.max(0, soc)) * 10
  const i = Math.floor(x)
  return CURVE[i] + (CURVE[i + 1] - CURVE[i]) * (x - i)
}

const cyclesFor = (dod, degC) => (500 * Math.pow(100 / dod, 1.6)) / Math.pow(2, (degC - 25) / 12)

const CHEM = [
  { name: `Lead-acid`, wh: 35, eff: 0.9, note: `Heavy, cheap, and genuinely consumed — the plates change substance as it discharges.` },
  { name: `LFP lithium`, wh: 160, eff: 0.92, note: `Less energy per kilo than NMC, and far longer-lived. Now standard in home storage.` },
  { name: `NMC lithium`, wh: 250, eff: 0.92, note: `The usual phone and car cell. Nothing is consumed; ions shuttle and slot in.` },
  { name: `Petrol`, wh: 12700, eff: 0.25, note: `Vastly more per kilo — but an engine wastes three quarters of it, and you cannot put it back.` }
]

export default function Battery({ mode = 'spring' }) {
  const [soc, setSoc] = useState(60)
  const [dod, setDod] = useState(100)
  const [degC, setDegC] = useState(25)

  const s = soc / 100
  const volts = voltageAt(s)
  const stored = CAP_AH * NOMINAL * s

  const cycles = cyclesFor(dod, degC)
  const lifetimeWh = cycles * CAP_AH * NOMINAL * (dod / 100)
  const years = cycles / 365
  const vsFull = lifetimeWh / (cyclesFor(100, 25) * CAP_AH * NOMINAL)

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{mode === 'spring' ? `Charged to ${soc}%` : `Using ${dod}% of it each time`}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 23 }}>
            {mode === 'spring'
              ? <>{volts.toFixed(2)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> volts</span></>
              : <>{Math.round(cycles).toLocaleString()}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> cycles</span></>}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 246, minHeight: 74, marginTop: 4 }}>
            {mode === 'spring'
              ? (soc < 8
                ? `${soc === 0 ? 'Empty' : 'Nearly empty'}, and the voltage is falling off a cliff. Almost all the lithium has moved to the cathode side, and there is very little left to shift.`
                : soc > 92
                  ? `${soc === 100 ? 'Full' : 'Nearly full'}, and the voltage is climbing steeply again. Pushing the last few per cent in is the hardest work and the hardest on the cell — which is tomorrow's lesson.`
                  : `The flat middle. Between about 20 and 80 per cent the voltage barely moves, which is why your phone seems to sit at one figure for hours and then drop quickly at the end.`)
              : (dod >= 95
                ? `Flat to full, every time. The hardest possible treatment — the cell is being pushed through the steep ends of its voltage curve twice a day, where the strain is greatest.`
                : dod <= 30
                  ? `A shallow nibble out of the middle. Each cycle delivers little, but there are so many more of them that the cell gives up far more energy in total before it wears out.`
                  : `Part of the range, kept away from both extremes. Most of the capacity, most of the time, and a great deal more life than running it flat.`)}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'spring' ? <>
            <Stat label="Energy held" value={stored.toFixed(1)} u="Wh" accent foot={`of ${(CAP_AH * NOMINAL).toFixed(1)} Wh full`} />
            <Stat label="Lithium consumed" value="None" u="" foot="the ions only move — and move back" />
            <Stat label="To run a 10 W lamp" value={Math.round((stored / 10) * 60)} u="min" foot="one cell, from where it is now" />
          </> : <>
            <Stat label="Total energy before it wears out" value={(lifetimeWh / 1000).toFixed(1)} u="kWh" accent={vsFull > 1.3}
              foot={`${vsFull.toFixed(1)}× what full cycling gives`} />
            <Stat label="At one cycle a day" value={years < 10 ? years.toFixed(1) : Math.round(years)} u="years"
              foot="until it holds only 80%" />
            <Stat label="Each cycle delivers" value={(CAP_AH * NOMINAL * (dod / 100)).toFixed(1)} u="Wh"
              foot={dod >= 100 ? 'everything it has, every time'
                : dod >= 70 ? 'most of it, and not many times over'
                  : 'less each time, but far more often'} />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 272, background: 'var(--paper)' }}
        role="img" aria-label={mode === 'spring'
          ? `A lithium cell charged to ${soc} per cent, reading ${volts.toFixed(2)} volts.`
          : `Cell life against depth of discharge, currently ${dod} per cent at ${degC} degrees.`}>
        <svg viewBox="0 0 560 236" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 196 }}>
          {mode === 'spring' ? <>
            {/* anode | electrolyte | cathode */}
            <rect x="60" y="40" width="130" height="130" fill="oklch(0.42 0.02 260)" stroke="var(--machine)" strokeWidth="2" />
            <rect x="190" y="40" width="180" height="130" fill="oklch(0.92 0.02 85)" stroke="var(--machine)" strokeWidth="1.5" />
            <rect x="370" y="40" width="130" height="130" fill="oklch(0.50 0.11 35)" stroke="var(--machine)" strokeWidth="2" />
            <text x="125" y="32" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="var(--label)">GRAPHITE</text>
            <text x="280" y="32" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="var(--label)">ELECTROLYTE</text>
            <text x="435" y="32" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="var(--label)">METAL OXIDE</text>
            {[0, 1, 2, 3, 4].map((r) => (
              <line key={r} x1="60" y1={56 + r * 26} x2="190" y2={56 + r * 26} stroke="oklch(0.62 0.02 260)" strokeWidth="1" />
            ))}
            {Array.from({ length: 20 }, (_, i) => {
              const inAnode = i < Math.round(s * 20)
              const row = i % 5, col = Math.floor(i / 5)
              const x = inAnode ? 78 + col * 28 : 388 + col * 28
              const y = 56 + row * 26
              return <circle key={i} cx={x} cy={y} r="6.5" fill="oklch(0.80 0.15 95)" stroke="oklch(0.45 0.10 95)" strokeWidth="1.2" />
            })}
            <text x="280" y="112" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fontWeight="700" fill="var(--muted)">
              {soc >= 99 ? 'all on the left — full' : soc <= 1 ? 'all on the right — empty' : 'the same ions, on one side or the other'}
            </text>
            <text x="280" y="196" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
              charging moves them left · discharging lets them back · nothing is used up
            </text>
          </> : <>
            {/* lifetime energy against depth of discharge */}
            <line x1="52" y1="172" x2="528" y2="172" stroke="var(--rule-2)" strokeWidth="1.5" />
            <line x1="52" y1="18" x2="52" y2="172" stroke="var(--rule-2)" strokeWidth="1.5" />
            {[100, 80, 60, 50, 40, 30, 20].map((d) => {
              const wh = cyclesFor(d, degC) * CAP_AH * NOMINAL * (d / 100)
              const x = 52 + ((100 - d) / 80) * 470
              const h = Math.min(150, (wh / 16000) * 150)
              const here = Math.abs(d - dod) < 5
              return <g key={d}>
                <rect x={x - 22} y={172 - h} width="44" height={h} rx="2"
                  fill={here ? 'oklch(0.52 0.13 150)' : 'oklch(0.80 0.05 150)'} stroke="var(--machine)" strokeWidth={here ? 2 : 0.8} />
                <text x={x} y="186" textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fontWeight={here ? 700 : 500} fill={here ? 'var(--ink)' : 'var(--muted)'}>{d}%</text>
                <text x={x} y={172 - h - 5} textAnchor="middle" fontFamily="var(--sans)" fontSize="9.5" fontWeight="700" fill="var(--label)">
                  {(wh / 1000).toFixed(1)}
                </text>
              </g>
            })}
            <text x="290" y="208" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="0.8" fill="var(--label)">
              HOW DEEP EACH CYCLE GOES → TOTAL kWh BEFORE IT IS WORN OUT
            </text>
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {mode === 'spring'
            ? `One 18650 cell: 3,000 mAh, 3.6 V nominal, 10.8 Wh. The voltage curve is interpolated from real cells.`
            : `Worn out means down to 80% of its original capacity — the usual definition, and not the end of usefulness.`}
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'spring' ? <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 240 }}>
            <label htmlFor="hw-soc" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>State of charge · {soc}%</label>
            <input id="hw-soc" type="range" min="0" max="100" step="1" value={soc}
              onChange={(e) => setSoc(Number(e.target.value))} style={{ width: 240, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <span style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', maxWidth: 300, justifyContent: 'flex-end' }}>
            {CHEM.map((c) => (
              <span key={c.name} title={c.note} style={{ fontFamily: 'var(--sans)', fontSize: 11.5, color: 'var(--muted)' }}>
                {c.name} <strong style={{ color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(c.wh * c.eff).toLocaleString()}</strong> Wh/kg
              </span>
            ))}
          </div>
        </> : <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 190 }}>
            <label htmlFor="hw-dod" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Depth of discharge · {dod}%</label>
            <input id="hw-dod" type="range" min="20" max="100" step="10" value={dod}
              onChange={(e) => setDod(Number(e.target.value))} style={{ width: 190, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 160 }}>
            <label htmlFor="hw-batt-t" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Kept at · {degC} °C</label>
            <input id="hw-batt-t" type="range" min="5" max="45" step="5" value={degC}
              onChange={(e) => setDegC(Number(e.target.value))} style={{ width: 160, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 210, textAlign: 'right' }}>
            Take it to 20%, then push the temperature to 45.
          </span>
        </>}
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
