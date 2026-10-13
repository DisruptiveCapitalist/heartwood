import { useState } from 'react'

// Anatomy & Physiology, Lesson 4 — DNA to a finished molecule.
//
// Two ideas in one scene. The first is the path: a stretch of DNA is copied to
// mRNA, a ribosome links amino acids in that order, and the chain folds. The
// second is the one the course spec insists on — that there is no universal
// length at which a peptide becomes a protein. The learner picks a real
// molecule and watches it get built, and the landmark they are most likely to
// stop on is insulin, which at fifty-one amino acids is routinely called both.
//
// Every length here is the real one.

const PICKS = [
  { n: 1, name: `Glycine`, note: `The simplest amino acid there is. On its own it is a building block, not yet a chain.` },
  { n: 3, name: `Glutathione`, note: `Three amino acids. Your cells make it constantly; it helps protect them from chemical damage.` },
  { n: 9, name: `Oxytocin`, note: `Nine amino acids, and a hormone — released by the pituitary, and involved in childbirth and in milk release.` },
  { n: 29, name: `Glucagon`, note: `Twenty-nine. Released by the pancreas when blood sugar falls, and it tells the liver to release some. Lesson 5 puts it to work.` },
  { n: 51, name: `Insulin`, called: `Called both`, note: `Fifty-one, in two linked chains. This is the honest middle of the argument: insulin is called a peptide hormone and a protein, by different people, on the same day.` },
  { n: 153, name: `Myoglobin`, note: `One hundred and fifty-three, folded around an iron atom that holds oxygen inside muscle. Nobody would call this a peptide.` },
  { n: 1050, name: `Collagen, one chain`, note: `About a thousand. Three of these twist together into a rope — the most abundant protein in your body, and the reason Lesson 12 is about bone.` }
]

const STEPS = [
  { label: `THE GENE`, text: `A stretch of the DNA in the nucleus. Not the whole of it — just the section that specifies this one molecule.` },
  { label: `THE WORKING COPY`, text: `That section is read and copied into **mRNA**, a single strand that can leave the nucleus. The original DNA stays behind, untouched. This step is called **transcription**.` },
  { label: `THE CHAIN`, text: `A **ribosome** reads the copy three letters at a time, and each triplet names one amino acid. It links them in that exact order. This step is **translation**.` },
  { label: `FOLDED`, text: `The finished chain folds up, pulled into shape by its own amino acids. The shape is what does the job — an unfolded chain is useless, which is why the cell checks the folding so carefully.` }
]

// Enough colours to make "these are different amino acids" visible at a glance.
const HUES = [235, 45, 155, 300, 85, 340, 190]
const MAX_BEADS = 44

// The length rule, except where a molecule is genuinely called both — which is
// this lesson's entire point, and saying "usually called a protein" on insulin
// would quietly take a side the field has not taken.
const kind = (m) => m.called ?? (m.n === 1 ? `An amino acid` : m.n <= 50 ? `Usually called a peptide` : `Usually called a protein`)

export default function ProteinChain() {
  const [pick, setPick] = useState(4)      // insulin: the interesting one
  const [step, setStep] = useState(0)

  const mol = PICKS[pick]
  const n = mol.n
  const shown = Math.min(n, MAX_BEADS)
  const beads = Array.from({ length: shown }, (_, i) => HUES[i % HUES.length])
  const stage = STEPS[step]

  // The gene is three DNA letters per amino acid, which is worth seeing.
  const letters = n * 3

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300 }}>
          <span className="hw-readout-label">{mol.name}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {n === 1 ? '1 amino acid' : `${n} amino acids`}
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 280, minHeight: 50, marginTop: 4 }}>
            {mol.note}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <div>
            <div className="hw-readout-label">What it would be called</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 600, lineHeight: 1.25 }}>{kind(mol)}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>and the boundary is a convention, not a rule</div>
          </div>
          <div>
            <div className="hw-readout-label">Letters of DNA needed</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {letters.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>three letters name one amino acid</div>
          </div>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 268, background: 'var(--paper)' }}
        role="img"
        aria-label={`${stage.label.toLowerCase()} stage of building ${mol.name}, which is ${n} amino acids long.`}
      >
        <div style={{ position: 'absolute', inset: '18px 24px auto 24px' }}>
          <span className="hw-label">STEP {step + 1} OF 4 · {stage.label}</span>
        </div>

        <svg viewBox="0 0 560 170" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '50px 0 auto 0', width: '100%', height: 170 }}>
          {step === 0 && (
            <g>
              {/* a double helix, with the gene for this molecule marked off */}
              {Array.from({ length: 34 }, (_, i) => {
                const x = 30 + i * 15
                const t = i * 0.55
                const y1 = 70 + Math.sin(t) * 26
                const y2 = 70 - Math.sin(t) * 26
                const inGene = i >= 8 && i < 8 + Math.max(1, Math.min(18, Math.round(n / 60) + 2))
                return <g key={i} opacity={inGene ? 1 : 0.32}>
                  <line x1={x} y1={y1} x2={x} y2={y2} stroke={inGene ? 'var(--accent)' : 'oklch(0.55 0.06 300)'} strokeWidth="2.4" />
                  <circle cx={x} cy={y1} r="3.6" fill="oklch(0.45 0.12 300)" />
                  <circle cx={x} cy={y2} r="3.6" fill="oklch(0.62 0.09 300)" />
                </g>
              })}
              <text x="190" y="140" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" letterSpacing="1.2" fill="var(--accent)">
                THE GENE FOR {mol.name.toUpperCase()}
              </text>
            </g>
          )}

          {step === 1 && (
            <g>
              <path
                d={`M 30 ${70} ${Array.from({ length: 33 }, (_, i) => `Q ${38 + i * 15} ${70 + (i % 2 ? 22 : -22)} ${45 + i * 15} 70`).join(' ')}`}
                fill="none" stroke="oklch(0.55 0.13 85)" strokeWidth="4" strokeLinecap="round" />
              {Array.from({ length: 24 }, (_, i) => (
                <circle key={i} cx={40 + i * 21} cy={70 + (i % 2 ? 9 : -9)} r="4" fill="oklch(0.45 0.13 85)" />
              ))}
              <text x="280" y="140" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" letterSpacing="1.2" fill="var(--label)">
                mRNA — A SINGLE STRAND, AND A COPY
              </text>
            </g>
          )}

          {step === 2 && (
            <g>
              {beads.map((h, i) => {
                const perRow = 22
                const x = 42 + (i % perRow) * 22
                const y = 44 + Math.floor(i / perRow) * 30
                return <g key={i}>
                  {i % perRow !== 0 && <line x1={x - 22} y1={y} x2={x} y2={y} stroke="var(--machine)" strokeWidth="2.4" />}
                  <circle cx={x} cy={y} r="8" fill={`oklch(0.72 0.10 ${h})`} stroke={`oklch(0.42 0.12 ${h})`} strokeWidth="2" />
                </g>
              })}
              <text x="280" y="152" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
                {n > MAX_BEADS ? `the first ${MAX_BEADS} of ${n} — the chain runs on well past the edge` : `all ${n}, linked in the order the copy specified`}
              </text>
            </g>
          )}

          {step === 3 && (
            <g>
              {/* the same beads, pulled into a compact shape */}
              {beads.map((h, i) => {
                const a = i * 2.39996                       // a spiral, so it looks packed rather than random
                const r = 7 + Math.sqrt(i) * 11
                return <circle key={i}
                  cx={280 + Math.cos(a) * r} cy={72 + Math.sin(a) * r * 0.62}
                  r="8" fill={`oklch(0.72 0.10 ${h})`} stroke={`oklch(0.42 0.12 ${h})`} strokeWidth="1.8" />
              })}
              <text x="280" y="152" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
                the shape is the job — this is a sketch of folding, not {mol.name}'s real structure
              </text>
            </g>
          )}
        </svg>

        <div style={{ position: 'absolute', left: 24, bottom: 12, right: 24, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.45 }}>
          <Mark text={stage.text} />
        </div>
      </div>

      <div className="hw-controls">
        <button
          className="hw-btn"
          onClick={() => setStep((s) => (s + 1) % 4)}
          style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 22px',
            borderColor: 'var(--ink)',
            background: step < 3 ? 'var(--ink)' : 'var(--paper)',
            color: step < 3 ? '#f6f1e7' : 'var(--ink)'
          }}
        >
          {step < 3 ? 'NEXT STEP' : 'START AGAIN'}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 250 }}>
          <label htmlFor="hw-pick" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Build something longer · {mol.name}
          </label>
          <input id="hw-pick" type="range" min="0" max={PICKS.length - 1} step="1"
            value={pick} onChange={(e) => setPick(Number(e.target.value))}
            style={{ width: 250, accentColor: 'var(--accent)', height: 28 }} />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            one amino acid, up to a thousand
          </span>
        </div>

        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          Stop on insulin and read what it gets called.
        </span>
      </div>
    </div>
  )
}

function Mark({ text }) {
  return <>{String(text).split(/(\*\*[^*]+\*\*)/g).map((bit, i) =>
    bit.startsWith('**') && bit.endsWith('**')
      ? <strong key={i} style={{ fontWeight: 600 }}>{bit.slice(2, -2)}</strong>
      : <span key={i}>{bit}</span>
  )}</>
}
