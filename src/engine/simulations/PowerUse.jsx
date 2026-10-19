import { useState } from 'react'

// Electricity & Energy, Lesson 6 — what the bill actually counts.
//
// The misconception this exists to kill: that a high-wattage appliance is an
// expensive one. Watts are a rate; the bill counts the rate multiplied by the
// time. A 2,000 W kettle for three minutes uses 0.10 kWh and a 9 W bulb left on
// for ten hours uses 0.09 — so the kettle everyone worries about costs about
// the same as the bulb nobody thinks about.
//
// Every figure here is a real appliance rating, and the fridge carries a duty
// cycle because a fridge is not drawing its rated power most of the time — a
// detail that is wrong in most explanations of this.

const THINGS = [
  { id: 'kettle', name: `Electric kettle`, watts: 2000, mins: 3, note: `Enormous power, for about as long as it takes to find a mug.` },
  { id: 'led', name: `LED bulb`, watts: 9, mins: 600, note: `Tiny power — and left on all evening, which is the half people forget.` },
  { id: 'old', name: `Old-style bulb`, watts: 60, mins: 600, note: `The same evening, before LEDs. Nearly seven times the energy for the same light.` },
  { id: 'fridge', name: `Fridge, over a day`, watts: 150, mins: 1440, duty: 0.3, note: `Rated at 150 W, but its motor only runs about a third of the time. The rating alone would mislead you by three times.` },
  { id: 'shower', name: `Electric shower`, watts: 8500, mins: 10, note: `The biggest single draw in most houses — and still only ten minutes of it.` },
  { id: 'tv', name: `Television, an evening`, watts: 100, mins: 240, note: `Modest power, four hours. This is the shape of most of a household bill.` },
  { id: 'charger', name: `Phone charger`, watts: 5, mins: 120, note: `The thing people unplug to save money. Two hours of it costs a fraction of a penny.` },
  { id: 'heater', name: `Plug-in heater`, watts: 1500, mins: 180, note: `High power **and** a long time. That combination is what actually moves a bill.` }
]

export default function PowerUse() {
  const [sel, setSel] = useState('kettle')
  const [rate, setRate] = useState(17)         // cents per kWh

  const t = THINGS.find((x) => x.id === sel)
  const hours = (t.mins / 60) * (t.duty ?? 1)
  const kWh = (t.watts / 1000) * hours
  const cost = kWh * (rate / 100)
  const max = Math.max(...THINGS.map((x) => (x.watts / 1000) * ((x.mins / 60) * (x.duty ?? 1))))

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{t.name}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {kWh < 0.1 ? kWh.toFixed(3) : kWh.toFixed(2)}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> kWh</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 50, marginTop: 4 }}>
            <Mark text={t.note} />
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Its power rating" value={t.watts.toLocaleString()} u="watts" foot="the rate, not the amount" />
          <Stat label="For how long" value={t.duty ? `${(t.mins / 60).toFixed(0)} h × ${Math.round(t.duty * 100)}%` : t.mins >= 60 ? `${(t.mins / 60).toFixed(0)} hours` : `${t.mins} min`} u=""
            foot={t.duty ? 'its motor only runs part of the time' : 'how long it actually ran'} />
          <Stat label="What it costs" value={cost < 0.1 ? `${(cost * 100).toFixed(1)}¢` : `$${cost.toFixed(2)}`} u="" accent foot={`at ${rate}¢ a unit`} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 294, background: 'var(--paper)' }}
        role="img" aria-label={`A comparison of how much energy eight household appliances use, with ${t.name} using ${kWh.toFixed(2)} kilowatt hours.`}>
        <svg viewBox="0 0 560 256" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 240 }}>
          <text x="40" y="22" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">ENERGY USED — WHICH IS WHAT THE BILL COUNTS</text>
          {THINGS.map((x, i) => {
            const y = 38 + i * 26
            const e = (x.watts / 1000) * ((x.mins / 60) * (x.duty ?? 1))
            const on = x.id === sel
            return <g key={x.id} onClick={() => setSel(x.id)} style={{ cursor: 'pointer' }}>
              <text x="166" y={y + 10} textAnchor="end" fontFamily="var(--sans)" fontSize="12"
                fontWeight={on ? 700 : 500} fill={on ? 'var(--ink)' : 'var(--muted)'}>{x.name}</text>
              <rect x="174" y={y} width="300" height="15" rx="7" fill="oklch(0.94 0.02 85)" />
              <rect x="174" y={y} width={Math.max(3, (e / max) * 300)} height="15" rx="7"
                fill={on ? 'oklch(0.58 0.15 45)' : 'oklch(0.80 0.07 45)'} />
              <text x="482" y={y + 11} fontFamily="var(--sans)" fontSize="11.5" style={{ fontVariantNumeric: 'tabular-nums' }}
                fill={on ? 'var(--ink)' : 'var(--muted)'}>{e < 0.1 ? e.toFixed(3) : e.toFixed(2)}</text>
            </g>
          })}
          <text x="174" y="252" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
            Notice where the kettle sits against the bulb left on all evening.
          </text>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Typical ratings and typical use. Your own appliances and your own habits will differ — the point is the shape, not the exact figures.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 250 }}>
          <label htmlFor="hw-rate" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            What you pay for a unit · {rate}¢ per kWh
          </label>
          <input id="hw-rate" type="range" min="8" max="45" step="1" value={rate}
            onChange={(e) => setRate(Number(e.target.value))} style={{ width: 250, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 240, textAlign: 'right' }}>
          Tap the kettle, then the LED bulb. Read both bars.
        </span>
      </div>
    </div>
  )
}

function Mark({ text }) {
  return <>{String(text).split(/(\*\*[^*]+\*\*)/g).map((b, i) =>
    b.startsWith('**') && b.endsWith('**')
      ? <strong key={i} style={{ fontWeight: 600 }}>{b.slice(2, -2)}</strong>
      : <span key={i}>{b}</span>)}</>
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
