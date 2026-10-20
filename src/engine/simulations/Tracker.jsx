import { useState, useMemo } from 'react'
import { maxPower, currentAt } from '../../lib/panel.js'

// Electricity & Energy, Lesson 21 — chasing the knee all day.
//
// Lesson 20 left the panel sitting on one point of its curve. This lesson moves
// the curve: the sun rises and sets, the cells heat up, cloud crosses the roof,
// and the knee drifts the whole time. The question is whether that matters.
//
// It turns out the honest answer is more interesting than the sales pitch.
// A WELL-CHOSEN fixed voltage is very nearly as good as tracking — on one day:
//
//              MPPT      24 V   27 V   28 V   30 V   32 V   34 V
//   summer   2.88 kWh     87%    96%    98%    96%    79%    40%
//   winter   1.38 kWh     75%    85%    88%    94%    98%    98%
//   cloudy   1.68 kWh     82%    92%    95%    98%    95%    72%
//
// 28 V is excellent in summer and poor in winter; 32 V is the reverse. No
// single fixed voltage clears 95% on all three, because the knee in July and
// the knee in January are not in the same place. That is the case for tracking
// — not a large gain on any one afternoon, but never being wrong.
//
// The cloud pattern is deterministic so the figures are reproducible.

const cloudAt = (h) => 0.55 + 0.45 * Math.sin(h * 2.7) * Math.sin(h * 1.3)

const DAYS = [
  { id: 'summer', name: `A hot summer day`, from: 6, to: 18, peak: 1000, rise: 30, cloudy: false,
    amb: (h) => 14 + 10 * Math.sin(Math.PI * (h - 7) / 12),
    what: `Long, bright and hot. The cells reach the mid-fifties by noon, so the knee slides DOWN to about 27.6 volts — heat costs voltage.` },
  { id: 'winter', name: `A cold clear day`, from: 8, to: 16, peak: 620, rise: 25, cloudy: false,
    amb: (h) => -2 + 4 * Math.sin(Math.PI * (h - 9) / 8),
    what: `Short and weak, but freezing — and cold panels make more volts. The knee sits UP around 33, nowhere near where it was in July.` },
  { id: 'cloudy', name: `A day of broken cloud`, from: 6, to: 18, peak: 1000, rise: 26, cloudy: true,
    amb: (h) => 16 + 8 * Math.sin(Math.PI * (h - 7) / 12),
    what: `The light jumps between full sun and deep shade within seconds. The knee moves vertically every time, and a tracker has to keep up.` }
]

const irradiance = (d, h) => {
  const base = Math.max(0, d.peak * Math.sin(Math.PI * (h - d.from) / (d.to - d.from)))
  return d.cloudy ? base * Math.max(0.12, cloudAt(h)) : base
}

function runDay(d, fixedV) {
  const pts = []
  let mppt = 0, fixed = 0
  for (let h = d.from; h <= d.to; h += 0.1) {
    const irr = irradiance(d, h)
    if (irr < 1) continue
    const t = d.amb(h) + d.rise * (irr / 1000)
    const best = maxPower(irr, t)
    const pf = fixedV * currentAt(fixedV, irr, t)
    mppt += best.p * 0.1
    fixed += pf * 0.1
    pts.push({ h, best: best.p, fixed: pf, knee: best.v, temp: t })
  }
  return { pts, mppt: mppt / 1000, fixed: fixed / 1000 }
}

const W = 520, H = 178, PADL = 42, PADB = 26

export default function Tracker() {
  const [dayId, setDayId] = useState('summer')
  const [fixedV, setFixedV] = useState(28)

  const d = DAYS.find((x) => x.id === dayId)
  const run = useMemo(() => runDay(d, fixedV), [d, fixedV])
  const scores = useMemo(() => DAYS.map((x) => {
    const r = runDay(x, fixedV)
    return { id: x.id, pct: r.mppt > 0 ? (r.fixed / r.mppt) * 100 : 0 }
  }), [fixedV])

  const pct = run.mppt > 0 ? (run.fixed / run.mppt) * 100 : 0
  const kneeLo = Math.min(...run.pts.map((p) => p.knee))
  const kneeHi = Math.max(...run.pts.map((p) => p.knee))
  const allGood = scores.every((s) => s.pct >= 95)

  const px = (h) => PADL + ((h - 6) / 12) * (W - PADL - 14)
  const py = (p) => H - PADB - (p / 420) * (H - PADB - 14)
  const area = (key) => {
    if (!run.pts.length) return ''
    const top = run.pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${px(p.h).toFixed(1)} ${py(p[key]).toFixed(1)}`).join(' ')
    return `${top} L ${px(run.pts[run.pts.length - 1].h).toFixed(1)} ${py(0)} L ${px(run.pts[0].h).toFixed(1)} ${py(0)} Z`
  }

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{d.name}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 23 }}>
            {run.mppt.toFixed(2)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> kWh tracking</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 246, minHeight: 74, marginTop: 4 }}>
            {d.what} Across this day the knee moves between {kneeLo.toFixed(1)} and {kneeHi.toFixed(1)} volts, and a fixed {fixedV} V collects {pct.toFixed(0)}% of what tracking would.
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label={`Held at ${fixedV} V instead`} value={run.fixed.toFixed(2)} u="kWh"
            accent={pct >= 95} foot={`${pct.toFixed(0)}% of what tracking gets`} />
          <Stat label="Where the knee went today" value={`${kneeLo.toFixed(1)}–${kneeHi.toFixed(1)}`} u="V"
            foot="it never stops moving" />
          <Stat label="Thrown away" value={Math.round((run.mppt - run.fixed) * 1000)} u="Wh"
            foot={pct >= 99 ? 'barely anything, on this day' : 'sunlight that was already paid for'} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 268, background: 'var(--paper)' }}
        role="img" aria-label={`Power through ${d.name}, tracking the maximum power point against holding a fixed ${fixedV} volts.`}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 176 }}>
          <line x1={PADL} y1={H - PADB} x2={W - 10} y2={H - PADB} stroke="var(--rule-2)" strokeWidth="1.5" />
          <line x1={PADL} y1="10" x2={PADL} y2={H - PADB} stroke="var(--rule-2)" strokeWidth="1.5" />
          {[6, 9, 12, 15, 18].map((h) => (
            <text key={h} x={px(h)} y={H - PADB + 15} textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fill="var(--muted)">
              {h === 12 ? 'noon' : h > 12 ? `${h - 12}pm` : `${h}am`}
            </text>
          ))}
          {[0, 200, 400].map((p) => (
            <text key={p} x={PADL - 6} y={py(p) + 3.5} textAnchor="end" fontFamily="var(--sans)" fontSize="10" fill="var(--muted)">{p}W</text>
          ))}

          <path d={area('best')} fill="oklch(0.52 0.13 150)" opacity="0.18" />
          <path d={area('fixed')} fill="oklch(0.56 0.17 28)" opacity="0.30" />
          <path d={run.pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${px(p.h).toFixed(1)} ${py(p.best).toFixed(1)}`).join(' ')}
            fill="none" stroke="oklch(0.40 0.12 150)" strokeWidth="2.2" />
          <path d={run.pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${px(p.h).toFixed(1)} ${py(p.fixed).toFixed(1)}`).join(' ')}
            fill="none" stroke="oklch(0.50 0.16 28)" strokeWidth="2" strokeDasharray="5 3" />

          <text x={W - 12} y="20" textAnchor="end" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="oklch(0.38 0.12 150)">tracking the knee</text>
          <text x={W - 12} y="34" textAnchor="end" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="oklch(0.48 0.16 28)">held at {fixedV} V</text>
        </svg>

        <div style={{ position: 'absolute', left: 22, bottom: 8, right: 22, display: 'flex', gap: 14, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '1.1px', color: 'var(--label)' }}>
            {fixedV} V ON ALL THREE DAYS
          </span>
          {scores.map((s) => (
            <span key={s.id} style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: s.pct >= 95 ? 'oklch(0.40 0.12 150)' : 'oklch(0.50 0.16 28)', fontWeight: s.id === dayId ? 700 : 500 }}>
              {s.id} <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{s.pct.toFixed(0)}%</strong>
            </span>
          ))}
          <span style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
            {allGood ? `— and tracking still beats it on every one.` : `— no single voltage is right on all three.`}
          </span>
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {DAYS.map((x) => (
            <button key={x.id} className="hw-btn" onClick={() => setDayId(x.id)} aria-pressed={dayId === x.id}
              style={{ fontSize: 12.5, padding: '10px 13px', background: dayId === x.id ? 'var(--ink)' : 'var(--paper)', color: dayId === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
              {x.name}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 190 }}>
          <label htmlFor="hw-fixed" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Hold the panel at · {fixedV} V</label>
          <input id="hw-fixed" type="range" min="12" max="36" step="1" value={fixedV}
            onChange={(e) => setFixedV(Number(e.target.value))} style={{ width: 190, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 220, textAlign: 'right' }}>
          Try to find one voltage that is good on all three days.
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
