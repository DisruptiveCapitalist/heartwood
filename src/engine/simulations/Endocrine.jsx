import { useState } from 'react'

// Anatomy & Physiology, Lesson 16 — glands, and a loop that governs itself.
//
// Two halves. A body map the learner can tap, because the endocrine system is
// the one body system with no shape — it is a scattered set of organs with
// nothing in common but their method. And the thyroid axis, which is the
// cleanest negative-feedback loop in the body and the one that makes sense of
// why a blood test for thyroid trouble measures the *pituitary's* hormone
// rather than the thyroid's.

const GLANDS = [
  {
    id: 'pituitary', name: 'Pituitary', x: 196, y: 36, r: 11,
    makes: `Hormones that command other glands — plus growth hormone directly.`,
    acts: `The thyroid, the adrenals, the ovaries and testes, and bone and muscle.`,
    note: `Pea-sized, under the brain, and often called the master gland — though it takes its own orders from the hypothalamus just above it. Most of what it releases is an instruction to another gland.`
  },
  {
    id: 'thyroid', name: 'Thyroid', x: 196, y: 76, r: 13,
    makes: `Thyroid hormone, built around iodine.`,
    acts: `Essentially every cell you have.`,
    note: `It sets the pace of the whole body — how fast cells work, how much heat you make, how fast your heart beats. Too little and everything slows; too much and everything races.`
  },
  {
    id: 'parathyroid', name: 'Parathyroid', x: 222, y: 84, r: 8,
    makes: `Parathyroid hormone.`,
    acts: `Bone, kidney and gut — all to manage calcium.`,
    note: `Four glands the size of grains of rice, stuck on the back of the thyroid and doing something entirely different. When blood calcium falls, they call it out of your bones — Lesson 11's demolition crew, taking orders.`
  },
  {
    id: 'adrenal', name: 'Adrenals', x: 196, y: 140, r: 11,
    makes: `Adrenaline, cortisol, and hormones managing salt and water.`,
    acts: `Heart, vessels, liver, immune system, kidneys.`,
    note: `One on top of each kidney, and really two glands in one. The middle makes adrenaline in seconds; the outside makes cortisol over hours. Fast and slow, in the same organ.`
  },
  {
    id: 'pancreas', name: 'Pancreas', x: 216, y: 160, r: 12,
    makes: `Insulin and glucagon.`,
    acts: `Liver, muscle and fat.`,
    note: `Mostly a digestive organ, with small islands of hormone-making cells scattered through it. Those islands are perhaps 2% of it, and they are what Lesson 5's loop was running on.`
  },
  {
    id: 'gonads', name: 'Ovaries / testes', x: 196, y: 206, r: 11,
    makes: `Oestrogen and progesterone, or testosterone.`,
    acts: `Reproductive organs — and bone, muscle, blood and brain besides.`,
    note: `Their effects reach far outside reproduction, which is why hormonal change at any age shows up in bone density and muscle as well. Week 6 takes this properly.`
  }
]

export default function Endocrine() {
  const [sel, setSel] = useState('thyroid')
  const [extra, setExtra] = useState(false)
  const g = GLANDS.find((x) => x.id === sel)

  // The thyroid axis. Give hormone from outside and the pituitary backs off.
  const tsh = extra ? 0.2 : 2.1          // the pituitary's instruction, mIU/L
  const t4 = extra ? 1.9 : 1.2           // thyroid hormone in blood, ng/dL

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{g.name}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 23 }}>{g.makes.split(',')[0].replace(/\.$/, '')}</span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 60, marginTop: 4 }}>
            {g.note}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="The pituitary's instruction" value={tsh.toFixed(1)} u="units" accent
            foot={extra ? 'turned right down' : 'ordinary, steady' } />
          <Stat label="Thyroid hormone in blood" value={t4.toFixed(1)} u="units"
            foot={extra ? 'high — and from outside' : 'where the loop holds it'} />
          <Stat label="What a blood test reads" value={extra ? 'Low instruction' : 'Normal'} u=""
            foot="which is why the test measures the pituitary" />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 290, background: 'var(--paper)' }}
        role="img" aria-label={`A body with its hormone glands marked, and the loop between the pituitary and the thyroid.`}>
        <svg viewBox="0 0 560 250" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 234 }}>
          <path d="M 196 22 m -17 0 a 17 17 0 1 0 34 0 a 17 17 0 1 0 -34 0 M 196 48 l 0 86 M 196 62 l -30 26 M 196 62 l 30 26 M 196 134 l -20 74 M 196 134 l 20 74"
            fill="none" stroke="oklch(0.80 0.03 85)" strokeWidth="18" strokeLinecap="round" />
          {GLANDS.map((x) => (
            <g key={x.id} onClick={() => setSel(x.id)} style={{ cursor: 'pointer' }}>
              <circle cx={x.x} cy={x.y} r={x.r + (sel === x.id ? 5 : 0)}
                fill={sel === x.id ? 'oklch(0.62 0.15 340)' : 'oklch(0.80 0.09 340)'}
                stroke="oklch(0.38 0.13 340)" strokeWidth="2.4" />
              {sel === x.id && <circle cx={x.x} cy={x.y} r={x.r + 11} fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeDasharray="4 4" />}
            </g>
          ))}
          <text x="196" y="238" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">TAP ANY GLAND</text>

          <g transform="translate(316 26)">
            <text x="0" y="0" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">THE LOOP THAT RUNS THE THYROID</text>
            <rect x="0" y="16" width="130" height="34" rx="9" fill="oklch(0.88 0.06 300)" stroke="oklch(0.44 0.12 300)" strokeWidth="2.2" />
            <text x="65" y="38" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fill="oklch(0.34 0.12 300)">Pituitary</text>
            <path d={`M 65 50 l 0 36`} stroke={extra ? 'oklch(0.80 0.03 85)' : 'oklch(0.50 0.13 300)'} strokeWidth={extra ? 2 : 6} strokeLinecap="round" />
            <text x="76" y="72" fontFamily="var(--sans)" fontSize="11" fill={extra ? 'var(--muted)' : 'oklch(0.42 0.12 300)'}>
              {extra ? 'barely asking' : 'asks for more'}
            </text>
            <rect x="0" y="86" width="130" height="34" rx="9" fill="oklch(0.88 0.06 200)" stroke="oklch(0.42 0.11 200)" strokeWidth="2.2" />
            <text x="65" y="108" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fill="oklch(0.32 0.11 200)">Thyroid</text>
            <path d={`M 130 103 q 46 0 46 -45 q 0 -45 -46 -45`} fill="none" stroke="oklch(0.50 0.11 200)" strokeWidth={extra ? 7 : 4} strokeLinecap="round" strokeDasharray="6 5" />
            <text x="150" y="60" fontFamily="var(--sans)" fontSize="11" fill="oklch(0.38 0.10 200)">tells it to stop</text>
            {extra && <>
              <path d="M 0 103 l -34 0" stroke="oklch(0.56 0.16 28)" strokeWidth="6" strokeLinecap="round" />
              <text x="-38" y="107" textAnchor="end" fontFamily="var(--sans)" fontSize="11" fontWeight="600" fill="oklch(0.48 0.16 28)">from outside</text>
            </>}
          </g>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          A teaching model. The numbers are illustrative units, not anybody's results, and real reference ranges differ between laboratories.
        </div>
      </div>

      <div className="hw-controls">
        <button className="hw-btn" onClick={() => setExtra((e) => !e)} aria-pressed={extra}
          style={{ borderColor: extra ? 'oklch(0.55 0.17 28)' : undefined, color: extra ? 'oklch(0.48 0.17 28)' : undefined }}>
          {extra ? 'STOP GIVING IT FROM OUTSIDE' : 'GIVE THYROID HORMONE FROM OUTSIDE'}
        </button>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 250, textAlign: 'right' }}>
          Watch which number moves first, and which way.
        </span>
      </div>

      <div style={{ padding: '18px 24px 20px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 230 }}>
            <span className="hw-label">IT MAKES</span>
            <p style={{ margin: '8px 0 0', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-2)' }}>{g.makes}</p>
          </div>
          <div style={{ flex: 1, minWidth: 230 }}>
            <span className="hw-label">IT ACTS ON</span>
            <p style={{ margin: '8px 0 0', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-2)' }}>{g.acts}</p>
          </div>
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
