import { useState } from 'react'

// Anatomy & Physiology, Week 4. One cell, two questions.
//
//   classes (Lesson 17) can this hormone get in, or must it knock?
//   binding (Lesson 18) it bound — so what? does anything happen?
//
// The second mode is the intellectual spine of the whole week, and it is built
// around one pair of numbers: receptors occupied, and response produced. A
// blocker can occupy ninety per cent of the receptors and produce nothing at
// all. Once a learner has watched that, the sentence "it binds to the receptor"
// stops sounding like evidence of anything — which is exactly what the course
// spec asks this week to achieve before Lesson 20 asks them to judge a claim.
//
// Dose-response is the standard saturating curve, response = max · d/(d + K).
// Occupancy uses the same form, so the two numbers come apart honestly rather
// than by being written separately.

const HORMONES = [
  {
    id: 'peptide', name: 'A peptide hormone', example: 'insulin, glucagon, growth hormone',
    crosses: false, onset: 'minutes', lasts: 'hours',
    note: `Made of amino acids, water-loving, and far too large and too wet to slip through a membrane made of fat. It has to knock — and the receptor it knocks on passes the message inward without ever letting it in.`
  },
  {
    id: 'steroid', name: 'A steroid hormone', example: 'oestrogen, testosterone, cortisol',
    crosses: true, onset: 'hours', lasts: 'hours to days',
    note: `Built from cholesterol and fat-soluble, so it passes straight through the membrane as if it were not there. Its receptor is inside, and what it ends up doing is switching genes on — which is why it is slow to start and slow to stop.`
  },
  {
    id: 'amine', name: 'Built from one amino acid', example: 'adrenaline, thyroid hormone',
    crosses: null, onset: 'seconds, or days', lasts: 'minutes, or weeks',
    note: `The awkward category, and worth meeting precisely because it is awkward. Adrenaline works at the surface and is done within minutes. Thyroid hormone, from the same chemical family, goes inside and takes days. The neat two-box scheme is a convenience, not a law.`
  }
]

const MOLECULES = [
  {
    id: 'real', name: 'The real hormone', fits: true, max: 100, k: 10,
    note: `Fits, and the fit changes the receptor's shape. That shape change is the message. This is what the receptor is for.`
  },
  {
    id: 'partial', name: 'A weak imitation', fits: true, max: 38, k: 10,
    note: `Fits properly and triggers only a fraction of the response, however much you give. Real drugs behave like this, and it is sometimes exactly what is wanted.`
  },
  {
    id: 'blocker', name: 'A blocker', fits: true, max: 0, k: 6,
    note: `Fits beautifully — better than the real thing — and changes nothing. It sits in the way, so the real hormone cannot get in either. Beta blockers work precisely this way, and they are useful because of it.`
  },
  {
    id: 'nearly', name: 'Nearly the right shape', fits: false, max: 0, k: 999,
    note: `Close, and close is nothing. It does not hold, so it does not stay, so no message is sent. Most molecules in your blood at any moment are this, to most receptors.`
  }
]

export default function Receptor({ mode = 'binding' }) {
  const [hormone, setHormone] = useState('peptide')
  const [mol, setMol] = useState('real')
  const [dose, setDose] = useState(10)

  const h = HORMONES.find((x) => x.id === hormone)
  const m = MOLECULES.find((x) => x.id === mol)

  const occupancy = m.fits ? (dose / (dose + m.k)) * 100 : 0
  const response = m.fits ? m.max * (dose / (dose + m.k)) : 0

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{mode === 'classes' ? h.name : m.name}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 23 }}>
            {mode === 'classes'
              ? (h.crosses === null ? 'Either, depending' : h.crosses ? 'Goes straight in' : 'Has to knock')
              : (!m.fits ? 'Nothing happens' : response > 1 ? 'Something happens' : 'It binds. Nothing happens.')}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {mode === 'classes' ? h.note : m.note}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'classes' ? <>
            <Stat label="Where its receptor is" value={h.crosses === null ? 'Both' : h.crosses ? 'Inside' : 'On the surface'} u="" accent />
            <Stat label="Time to take effect" value={h.onset} u="" foot="after it arrives" />
            <Stat label="How long it lasts" value={h.lasts} u="" foot="once it has started" />
          </> : <>
            <Stat label="Receptors occupied" value={Math.round(occupancy)} u="%" foot="how much of it is bound" />
            <Stat label="Response produced" value={Math.round(response)} u="%" accent
              foot={occupancy > 50 && response < 1 ? 'occupied, and doing nothing' : 'what the cell actually does'} />
            <Stat label="Dose given" value={dose} u="units" foot="more is not always more" />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 276, background: 'var(--paper)' }}
        role="img" aria-label={mode === 'classes'
          ? `A cell membrane with a hormone either crossing it or binding to a receptor on its surface.`
          : `A receptor with a molecule in it. ${Math.round(occupancy)} per cent occupied, ${Math.round(response)} per cent response.`}>
        <svg viewBox="0 0 560 240" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 224 }}>
          {Array.from({ length: 22 }, (_, i) => {
            const x = 40 + i * 24
            return <g key={i} opacity={mode === 'classes' || i < 8 || i > 13 ? 1 : 0.25}>
              <circle cx={x} cy="74" r="5" fill="oklch(0.62 0.09 235)" />
              <path d={`M ${x - 2} 79 l 0 20 M ${x + 2} 79 l 0 20`} stroke="oklch(0.54 0.07 235)" strokeWidth="1.7" strokeLinecap="round" />
              <circle cx={x} cy="124" r="5" fill="oklch(0.62 0.09 235)" />
              <path d={`M ${x - 2} 119 l 0 -20 M ${x + 2} 119 l 0 -20`} stroke="oklch(0.54 0.07 235)" strokeWidth="1.7" strokeLinecap="round" />
            </g>
          })}
          <text x="40" y="38" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">OUTSIDE THE CELL</text>
          <text x="40" y="168" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">INSIDE THE CELL</text>

          {mode === 'classes' ? <>
            <rect x="256" y="62" width="30" height="74" rx="13" fill="oklch(0.76 0.11 340)" stroke="oklch(0.42 0.13 340)" strokeWidth="2.4" />
            {h.crosses === false && <>
              <circle cx="271" cy="40" r="11" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
              <path d="M 271 148 l 0 34 M 262 174 l 9 10 l 9 -10" fill="none" stroke="oklch(0.50 0.13 340)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              <text x="292" y="186" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">the message goes on without it</text>
            </>}
            {h.crosses === true && <>
              <circle cx="380" cy="42" r="10" fill="var(--accent)" opacity="0.35" />
              <circle cx="380" cy="100" r="10" fill="var(--accent)" opacity="0.6" />
              <circle cx="380" cy="172" r="10" fill="var(--accent)" />
              <circle cx="430" cy="186" r="26" fill="oklch(0.89 0.045 300)" stroke="oklch(0.45 0.12 300)" strokeWidth="2.4" />
              <text x="430" y="190" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="oklch(0.36 0.12 300)">DNA</text>
              <text x="266" y="212" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">straight through, and on to the genes</text>
            </>}
            {h.crosses === null && <>
              <circle cx="271" cy="40" r="10" fill="var(--accent)" />
              <circle cx="400" cy="168" r="10" fill="oklch(0.56 0.13 200)" />
              <text x="266" y="212" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">adrenaline knocks · thyroid hormone walks in</text>
            </>}
          </> : <>
            <path d="M 248 62 l 0 74 l 18 0 l 0 -26 l 14 0 l 0 -22 l -14 0 l 0 -26 z"
              fill="oklch(0.78 0.10 340)" stroke="oklch(0.42 0.13 340)" strokeWidth="2.4" transform="translate(28 0)" />
            <path d="M 332 62 l 0 74 l -18 0 l 0 -26 l -14 0 l 0 -22 l 14 0 l 0 -26 z"
              fill="oklch(0.78 0.10 340)" stroke="oklch(0.42 0.13 340)" strokeWidth="2.4" transform="translate(-28 0)" />
            {m.fits ? (
              <rect x="290" y="88" width="24" height="22" rx="4" fill="var(--accent)" stroke="var(--paper)" strokeWidth="1.8" />
            ) : (
              <g>
                <circle cx="302" cy="46" r="13" fill="oklch(0.70 0.06 85)" stroke="var(--machine)" strokeWidth="2" />
                <path d="M 286 62 l 32 0" stroke="oklch(0.55 0.17 28)" strokeWidth="3" strokeDasharray="4 4" />
              </g>
            )}
            <rect x="200" y="186" width="212" height="18" rx="9" fill="oklch(0.93 0.02 155)" />
            <rect x="200" y="186" width={2.12 * response} height="18" rx="9" fill="oklch(0.60 0.14 155)" />
            <text x="196" y="200" textAnchor="end" fontFamily="var(--sans)" fontSize="11.5" fontWeight="600" fill="var(--label)">response</text>
            <rect x="200" y="158" width="212" height="18" rx="9" fill="oklch(0.93 0.02 340)" />
            <rect x="200" y="158" width={2.12 * occupancy} height="18" rx="9" fill="oklch(0.62 0.13 340)" />
            <text x="196" y="172" textAnchor="end" fontFamily="var(--sans)" fontSize="11.5" fontWeight="600" fill="var(--label)">occupied</text>
            {occupancy > 50 && response < 1 && (
              <text x="306" y="228" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fontWeight="700" fill="oklch(0.48 0.16 28)">
                most of them taken, and nothing is happening
              </text>
            )}
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {mode === 'classes'
            ? 'A teaching diagram. Real signalling runs through long relays inside the cell, and lock-and-key is a simplification of a far more flexible fit.'
            : 'A teaching model of one receptor. Doses are arbitrary units, and nothing here describes any actual medicine or product.'}
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'classes' ? (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {HORMONES.map((x) => (
              <button key={x.id} className="hw-btn" onClick={() => setHormone(x.id)} aria-pressed={hormone === x.id}
                style={{ background: hormone === x.id ? 'var(--ink)' : 'var(--paper)', color: hormone === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
                {x.name.toUpperCase()}
              </button>
            ))}
          </div>
        ) : <>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {MOLECULES.map((x) => (
              <button key={x.id} className="hw-btn" onClick={() => setMol(x.id)} aria-pressed={mol === x.id}
                style={{ background: mol === x.id ? 'var(--ink)' : 'var(--paper)', color: mol === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
                {x.name.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 220 }}>
            <label htmlFor="hw-dose" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Dose · {dose}</label>
            <input id="hw-dose" type="range" min="1" max="120" step="1"
              value={dose} onChange={(e) => setDose(Number(e.target.value))}
              style={{ width: 220, accentColor: 'var(--accent)', height: 28 }} />
          </div>
        </>}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 240, textAlign: 'right' }}>
          {mode === 'classes' ? 'The third one is the interesting one.' : 'Try the blocker, then turn the dose right up.'}
        </span>
      </div>

      {mode === 'classes' && (
        <div style={{ padding: '16px 24px 18px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <span className="hw-label">FOR EXAMPLE</span>
            <p style={{ margin: '8px 0 0', fontSize: 16.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>{h.example}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value, u, foot, accent }) {
  return (
    <div>
      <div className="hw-readout-label">{label}</div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: accent ? 'var(--accent)' : undefined }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> {u}</span>
      </div>
      {foot && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{foot}</div>}
    </div>
  )
}
