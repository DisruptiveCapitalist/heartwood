import { useState } from 'react'

// Anatomy & Physiology, Lesson 19 — metabolism, and four organs sharing a job.
//
// The number that does the teaching: roughly 400 kcal of liver glycogen against
// something like a hundred thousand in fat. A learner who has seen those two
// side by side will never again think of the body as running on one tank.
//
// Two facts here are commonly unknown and worth the space. Muscle glycogen is
// private — muscle lacks the enzyme to release glucose back into the blood, so
// its several hundred grams are for its own use only. And the spec is explicit
// that metabolic health must not be reduced to one hormone, so the panel of
// other inputs is part of the simulation rather than a footnote in the prose.

const LIVER_KCAL = 400
const MUSCLE_KCAL = 1600
const FAT_KCAL = 100000

export default function FuelStore() {
  const [hours, setHours] = useState(0)

  // Liver glycogen carries the overnight fast and is largely gone by a day.
  const liver = Math.max(0, Math.exp(-hours / 11) * 100)
  const glucoseShare = 15 + 75 * Math.exp(-hours / 7)
  const fatShare = 100 - glucoseShare
  const signal = hours < 3 ? 'insulin' : hours < 14 ? 'glucagon' : 'glucagon and more besides'
  const state = hours < 3 ? 'Just eaten' : hours < 9 ? 'Between meals' : hours < 18 ? 'Overnight' : 'A day without food'

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{state}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {Math.round(fatShare)}%<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> from fat</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 50, marginTop: 4 }}>
            {hours < 3
              ? 'Insulin is high. Sugar is being taken out of the blood and put away — into the liver, into muscle, and into fat.'
              : hours < 14
                ? 'Insulin has fallen and glucagon has risen. The liver is handing glucose back out, and fat is being drawn on more with every hour.'
                : 'The liver store is nearly spent. Fat is carrying almost all of it now, and several signals besides glucagon are involved.'}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Liver store left" value={Math.round(liver)} u="%" accent foot={`about ${LIVER_KCAL} kcal when full`} />
          <Stat label="Fat store" value="~100,000" u="kcal" foot="two hundred and fifty times the liver's" />
          <Stat label="Mainly listening to" value={signal.split(' and ')[0]} u="" foot="among a good many others" />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 288, background: 'var(--paper)' }}
        role="img" aria-label={`Fuel stores at ${hours} hours since eating: liver ${Math.round(liver)} per cent, and ${Math.round(fatShare)} per cent of energy coming from fat.`}>
        <svg viewBox="0 0 560 250" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 234 }}>
          {[
            { name: 'LIVER', sub: 'hands glucose back to the blood', x: 46, full: liver, cap: `${LIVER_KCAL} kcal`, hue: 28 },
            { name: 'MUSCLE', sub: 'keeps its own — cannot share it', x: 206, full: Math.max(20, liver * 0.8 + 20), cap: `${MUSCLE_KCAL} kcal`, hue: 340 },
            { name: 'FAT', sub: 'the store that barely moves', x: 366, full: 97, cap: `~${(FAT_KCAL / 1000).toFixed(0)},000 kcal`, hue: 45 }
          ].map((s) => (
            <g key={s.name}>
              <rect x={s.x} y="40" width="130" height="120" rx="10" fill="oklch(0.94 0.02 85)" stroke={`oklch(0.46 0.09 ${s.hue})`} strokeWidth="2.4" />
              <rect x={s.x + 4} y={44 + (112 * (100 - s.full)) / 100} width="122" height={(112 * s.full) / 100} rx="7" fill={`oklch(0.74 0.12 ${s.hue})`} />
              <text x={s.x + 65} y="180" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="700" letterSpacing="1.3" fill="var(--label)">{s.name}</text>
              <text x={s.x + 65} y="198" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">{s.cap}</text>
              <text x={s.x + 65} y="216" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">{s.sub}</text>
            </g>
          ))}
          <rect x="46" y="20" width={450 * (glucoseShare / 100)} height="12" rx="6" fill="oklch(0.60 0.13 200)" />
          <rect x={46 + 450 * (glucoseShare / 100)} y="20" width={450 * (fatShare / 100)} height="12" rx="6" fill="oklch(0.66 0.13 45)" />
          <text x="46" y="14" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" letterSpacing="1.2" fill="oklch(0.40 0.11 200)">SUGAR</text>
          <text x="496" y="14" textAnchor="end" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" letterSpacing="1.2" fill="oklch(0.44 0.12 45)">FAT</text>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Illustrative figures for an average adult. Real stores and the mix of fuels differ hugely with size, fitness, diet, activity and health.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 270 }}>
          <label htmlFor="hw-hours" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Hours since you ate · {hours}
          </label>
          <input id="hw-hours" type="range" min="0" max="36" step="1"
            value={hours} onChange={(e) => setHours(Number(e.target.value))}
            style={{ width: 270, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          Compare the liver's bar with the fat one. Then read the numbers under them.
        </span>
      </div>

      <div style={{ padding: '18px 24px 20px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          <span className="hw-label">WHAT ELSE IS SETTING THIS, BESIDES INSULIN</span>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
            {['glucagon', 'adrenaline', 'cortisol', 'thyroid hormone', 'growth hormone', 'signals from fat itself',
              'signals from the gut', 'how much you moved', 'how you slept', 'what you inherited', 'illness', 'medicines']
              .map((x) => (
                <span key={x} style={{
                  fontFamily: 'var(--sans)', fontSize: 13.5, padding: '6px 12px', borderRadius: 999,
                  background: 'var(--paper)', border: '1px solid var(--rule)', color: 'var(--ink-2)'
                }}>{x}</span>
              ))}
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 14.5, lineHeight: 1.5, color: 'var(--muted)' }}>
            Any account of metabolism built on one hormone is leaving most of this out.
          </p>
        </div>
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
