import { useState } from 'react'

// Anatomy & Physiology, Week 6. What the body does to things that enter it.
//
//   medicine  (Lesson 28) absorbed, distributed, transformed, removed
//   digestion (Lesson 29) the organs doing it, and the numbers involved
//
// These are one component because they are one fact: everything absorbed from
// the gut goes to the liver before it reaches the rest of you. That is why a
// swallowed dose and an injected dose of the same medicine are not the same
// thing, and it is the hinge between the two lessons.
//
// The curve is the standard one-compartment model with first-order absorption,
// C(t) = F·D·ka/(ka−ke) · (e^−ke·t − e^−ka·t), which is what pharmacologists
// actually use. Halving the elimination rate — what reduced kidney or liver
// function does — doubles the half-life, and the learner can watch the dose
// stop clearing before the next one is due.

const KA = 1.1          // absorption rate, per hour
const KE_OK = 0.139     // elimination, per hour — a five-hour half-life
const KE_SLOW = 0.069   // half the clearance, so twice the half-life
const F_ORAL = 0.45     // what survives the first pass through the liver
const LOW = 20
const HIGH = 60

function level(t, dose, oral, slow) {
  const ke = slow ? KE_SLOW : KE_OK
  if (!oral) return dose * Math.exp(-ke * t)
  return ((F_ORAL * dose * KA) / (KA - ke)) * (Math.exp(-ke * t) - Math.exp(-KA * t))
}

const ORGANS = [
  { id: 'mouth', name: `Mouth and stomach`, what: `Breaking food into pieces small enough to work on — mechanically, then with acid and enzymes. Almost nothing is absorbed here; this stage is preparation.` },
  { id: 'intestine', name: `Small intestine`, what: `Where essentially all absorption happens. Folded and fringed into a surface of roughly thirty square metres — about half a badminton court, packed into your abdomen.` },
  { id: 'liver', name: `Liver`, what: `Everything absorbed from the gut goes here **first**, before reaching the rest of you. It sorts, stores, builds, and chemically transforms — including most medicines, which is why a swallowed dose is not an injected one.` },
  { id: 'pancreas', name: `Pancreas`, what: `Sends digestive enzymes into the intestine — and, from the islands within it, the insulin and glucagon of Lesson 5. Two unrelated jobs in one organ.` },
  { id: 'kidney', name: `Kidneys`, what: `Filter about 180 litres of fluid from your blood every day and give back more than 99% of it. What is left, around a litre and a half, is urine. They are adjusting the whole blood, continuously.` }
]

export default function Processing({ mode = 'medicine' }) {
  const [dose, setDose] = useState(100)
  const [oral, setOral] = useState(true)
  const [slow, setSlow] = useState(false)
  const [sel, setSel] = useState('liver')

  const ke = slow ? KE_SLOW : KE_OK
  const halfLife = Math.log(2) / ke
  const tPeak = oral ? Math.log(KA / ke) / (KA - ke) : 0
  const peak = level(tPeak, dose, oral, slow)
  // How long it stays useful: hours above the lower edge of the window.
  let inWindow = 0
  for (let t = 0; t < 48; t += 0.1) if (level(t, dose, oral, slow) >= LOW) inWindow += 0.1

  const o = ORGANS.find((x) => x.id === sel)
  const tooHigh = peak > HIGH

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{mode === 'medicine' ? (oral ? 'Swallowed' : 'Injected') : 'The processing organs'}</span>
          <span className="hw-readout-num" style={{ color: tooHigh && mode === 'medicine' ? 'oklch(0.52 0.16 28)' : 'var(--accent)', fontSize: 22 }}>
            {mode === 'medicine' ? (tooHigh ? 'Above the window' : peak < LOW ? 'Never reaches it' : 'In the window') : o.name}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {mode === 'medicine'
              ? (oral
                ? `Swallowed, it has to be absorbed and then pass through the liver before reaching the rest of you — so less than half arrives, and it arrives gradually.`
                : `Injected, all of it is in the blood at once and the liver gets it only on the way round. Same dose, a completely different shape.`)
              : o.what.replace(/\*\*/g, '')}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'medicine' ? <>
            <Stat label="Highest level reached" value={Math.round(peak)} u="" accent foot={`the useful band is ${LOW} to ${HIGH}`} />
            <Stat label="Half-life" value={halfLife.toFixed(1)} u="hours" foot={slow ? 'doubled — it is clearing slowly' : 'time for half to go'} />
            <Stat label="Hours in the useful band" value={inWindow.toFixed(1)} u="" foot="which is what sets the dosing interval" />
          </> : <>
            <Stat label="Filtered each day" value="180" u="litres" accent foot="by the kidneys, from your blood" />
            <Stat label="Given back" value="99+" u="%" foot="about 1.5 litres leaves as urine" />
            <Stat label="Absorbing surface" value="~30" u="m²" foot="folded into your abdomen" />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 290, background: 'var(--paper)' }}
        role="img" aria-label={mode === 'medicine'
          ? `A concentration curve over 24 hours, peaking at ${Math.round(peak)}.`
          : `The path from mouth to intestine to liver, with the kidneys filtering the blood.`}>
        <svg viewBox="0 0 560 252" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 236 }}>
          {mode === 'medicine' ? <>
            <rect x="60" y={190 - HIGH * 1.6} width="420" height={(HIGH - LOW) * 1.6} fill="oklch(0.90 0.06 155)" opacity="0.6" />
            <text x="486" y={190 - ((HIGH + LOW) / 2) * 1.6} fontFamily="var(--sans)" fontSize="11" fill="oklch(0.38 0.11 155)">useful</text>
            <text x="486" y={190 - HIGH * 1.6 - 8} fontFamily="var(--sans)" fontSize="11" fill="oklch(0.48 0.15 28)">too much</text>
            <polyline
              points={Array.from({ length: 241 }, (_, i) => {
                const t = i / 10
                return `${60 + (t / 24) * 420},${190 - Math.min(130, level(t, dose, oral, slow)) * 1.6}`
              }).join(' ')}
              fill="none" stroke="oklch(0.50 0.15 28)" strokeWidth="3.2" strokeLinejoin="round" />
            <line x1="60" y1="190" x2="480" y2="190" stroke="var(--rule)" strokeWidth="1.5" />
            {[0, 4, 8, 12, 16, 20, 24].map((t) => (
              <g key={t}>
                <line x1={60 + (t / 24) * 420} y1="186" x2={60 + (t / 24) * 420} y2="194" stroke="var(--rule)" strokeWidth="1.5" />
                <text x={60 + (t / 24) * 420} y="210" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fill="var(--muted)">{t}</text>
              </g>
            ))}
            <text x="270" y="230" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">HOURS AFTER THE DOSE</text>
            <text x="60" y="28" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">
              {oral ? 'ABSORBED · DISTRIBUTED · TRANSFORMED · REMOVED' : 'STRAIGHT IN · DISTRIBUTED · TRANSFORMED · REMOVED'}
            </text>
          </> : <>
            {[
              { x: 46, y: 40, w: 96, h: 42, label: 'Mouth, stomach', id: 'mouth', hue: 45 },
              { x: 46, y: 104, w: 96, h: 42, label: 'Intestine', id: 'intestine', hue: 85 },
              { x: 206, y: 72, w: 110, h: 50, label: 'LIVER — first stop', id: 'liver', hue: 28 },
              { x: 206, y: 150, w: 110, h: 42, label: 'Pancreas', id: 'pancreas', hue: 340 },
              { x: 372, y: 104, w: 110, h: 50, label: 'Kidneys', id: 'kidney', hue: 200 }
            ].map((b) => (
              <g key={b.id} onClick={() => setSel(b.id)} style={{ cursor: 'pointer' }}>
                <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="10"
                  fill={sel === b.id ? `oklch(0.78 0.11 ${b.hue})` : `oklch(0.92 0.04 ${b.hue})`}
                  stroke={`oklch(0.44 0.12 ${b.hue})`} strokeWidth={sel === b.id ? 3 : 2} />
                <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 4} textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="600" fill="var(--ink)">{b.label}</text>
              </g>
            ))}
            <path d="M 94 82 l 0 22" stroke="var(--machine)" strokeWidth="4" strokeLinecap="round" />
            <path d="M 142 124 l 60 -24" stroke="oklch(0.52 0.14 28)" strokeWidth="6" strokeLinecap="round" />
            <text x="150" y="146" fontFamily="var(--sans)" fontSize="11" fontWeight="600" fill="oklch(0.44 0.14 28)">everything, first</text>
            <path d="M 316 100 l 56 14" stroke="oklch(0.50 0.11 200)" strokeWidth="5" strokeLinecap="round" />
            <path d="M 427 154 q 0 54 -120 54 q -140 0 -140 -40" fill="none" stroke="oklch(0.56 0.10 25)" strokeWidth="3.4" strokeDasharray="6 5" />
            <text x="300" y="224" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">and all of it travels in the blood you met in Week 2</text>
            <text x="46" y="28" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">TAP ANY ORGAN</text>
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {mode === 'medicine'
            ? 'A standard teaching model in arbitrary units. Real medicines differ enormously, and no dose or interval here describes any actual product.'
            : 'Figures are typical adult values. The intestinal surface is often quoted far larger in older textbooks; careful measurement puts it near thirty square metres.'}
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'medicine' ? <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 200 }}>
            <label htmlFor="hw-dose2" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Dose · {dose}</label>
            <input id="hw-dose2" type="range" min="20" max="200" step="10" value={dose}
              onChange={(e) => setDose(Number(e.target.value))} style={{ width: 200, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <button className="hw-btn" onClick={() => setOral((x) => !x)} aria-pressed={!oral}
            style={{ background: oral ? 'var(--paper)' : 'var(--ink)', color: oral ? 'var(--ink)' : '#f6f1e7', borderColor: 'var(--ink)' }}>
            {oral ? 'INJECT IT INSTEAD' : 'SWALLOW IT INSTEAD'}
          </button>
          <button className="hw-btn" onClick={() => setSlow((x) => !x)} aria-pressed={slow}
            style={{ borderColor: slow ? 'oklch(0.55 0.17 28)' : undefined, color: slow ? 'oklch(0.48 0.17 28)' : undefined }}>
            {slow ? 'CLEARING NORMALLY' : 'CLEARING IT MORE SLOWLY'}
          </button>
        </> : (
          <span style={{ fontFamily: 'var(--sans)', fontSize: 13.5, color: 'var(--ink)' }}>
            Tap the liver, and then read where everything absorbed goes first.
          </span>
        )}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          {mode === 'medicine' ? 'Inject the same dose and watch the peak.' : 'One hundred and eighty litres, every day.'}
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
