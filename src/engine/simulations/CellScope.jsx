import { useState } from 'react'
import Plate from '../plates.jsx'

// Anatomy & Physiology, Week 1. One cell, looked at two ways.
//
//   tour   (Lesson 2) what the cell has to get done, and which part does it —
//          including a five-step walk from "a messenger arrives" to "a protein
//          leaves," which is the spec's own example for this lesson
//   energy (Lesson 3) where usable energy comes from, and what it costs
//
// The course spec is explicit that the organelles must not be taught as a
// vocabulary list, so every part is described by the job the cell needs doing
// rather than by its definition.
//
// The energy mode is quantitative and the numbers are the real ones: about 30
// ATP from a glucose molecule with oxygen, and 2 without it. That ratio is the
// whole lesson — it is why hard work burns fuel so fast — and it is also why
// the spec's warning matters, that not all ATP comes from mitochondria.

const PARTS = [
  {
    id: 'membrane', name: `Cell membrane`,
    need: `The cell has to keep its insides in and decide what gets through.`,
    role: `A double layer of fat molecules, two molecules thick, studded with proteins that act as doors, pumps and receivers. It is not a wall — it is a busy border crossing, and most of what a cell does to stay alive happens here or because of here.`
  },
  {
    id: 'nucleus', name: `Nucleus`,
    need: `The cell has to keep its instructions safe and readable.`,
    role: `The DNA lives in here, wound up and protected. When the cell needs a particular protein, only the relevant stretch of DNA is read, and what leaves the nucleus is a short working copy — not the original. The instructions never go out on the floor.`
  },
  {
    id: 'ribosome', name: `Ribosomes`,
    need: `The cell has to build proteins from the instructions.`,
    role: `Tiny machines that read the working copy and link amino acids together in the order it specifies. Some float free in the fluid; many sit on the surface of the endoplasmic reticulum, which is what makes that surface look rough.`
  },
  {
    id: 'er', name: `Endoplasmic reticulum`,
    need: `The cell has to fold and finish new proteins properly.`,
    role: `A folded sheet of membrane running out from the nucleus — a production line. Proteins made on its rough surface are threaded inside to be folded and checked. A badly folded protein is a problem, and this is where most of them get caught.`
  },
  {
    id: 'golgi', name: `Golgi apparatus`,
    need: `The cell has to label things and send them to the right place.`,
    role: `A stack of flattened pouches that receives finished proteins, adds chemical tags, and packs them into bubbles addressed to where they are needed — inside the cell, into the membrane, or out of the cell altogether. The dispatch department.`
  },
  {
    id: 'mito', name: `Mitochondria`,
    need: `The cell has to pay for all of this, and everything costs energy.`,
    role: `Where most of the cell's usable energy is released from food using oxygen. A cell with heavy demands — heart muscle, for instance — is packed with them; others have far fewer. They have their own small loop of DNA, a leftover from an ancient and very successful merger. Lesson 3 is about nothing else.`
  },
  {
    id: 'lyso', name: `Lysosome`,
    need: `The cell has to clear away what is worn out or broken.`,
    role: `A bubble of digestive enzymes, kept safely sealed off. Worn-out parts and swallowed debris are delivered here and broken back down into pieces the cell can reuse. Recycling, not rubbish.`
  },
  {
    id: 'cyto', name: `Cytoplasm`,
    need: `All of this has to happen somewhere, in something.`,
    role: `The crowded, watery fluid everything sits in — and it really is crowded, far more like a thick soup than the empty space in a diagram. Most of the body's water is in here, which is why oxygen led the grid in Lesson 1.`
  }
]

const STEPS = [
  { at: 'membrane', text: `A messenger molecule arrives from somewhere else in the body and fits into a **receptor** on the membrane — the way a key fits one lock and not others.` },
  { at: 'cyto', text: `The receptor changes shape, and that change passes the message inward through a relay of molecules in the cytoplasm. Nothing from outside has actually come in.` },
  { at: 'nucleus', text: `In the nucleus, the stretch of DNA for the needed protein is read, and a short working copy of it — **mRNA** — is made and sent out.` },
  { at: 'er', text: `A **ribosome** on the endoplasmic reticulum reads the copy and links amino acids together in that exact order. The chain folds into a protein.` },
  { at: 'golgi', text: `The Golgi tags it, packs it into a bubble, and the cell ships it out — a finished answer to a message that arrived five steps ago.` }
]

const EFFICIENT = 30      // ATP per glucose, with oxygen
const QUICK = 2           // ATP per glucose, without it
const O2_CAP = 12         // how much the oxygen supply can keep up with

export default function CellScope({ mode = 'tour' }) {
  const [sel, setSel] = useState(null)
  const [step, setStep] = useState(0)        // 0 = not started
  const [demand, setDemand] = useState(1)

  const isEnergy = mode === 'energy'
  const part = PARTS.find((p) => p.id === sel) ?? null
  const live = step > 0 ? STEPS[step - 1] : null
  const lit = isEnergy ? 'mito' : (live?.at ?? sel)

  // Ohm's-law-simple, and the same every time it is asked.
  const aerobic = Math.min(demand, O2_CAP)
  const anaerobic = Math.max(0, demand - O2_CAP)
  const glucose = aerobic / EFFICIENT + anaerobic / QUICK
  const restGlucose = 1 / EFFICIENT
  const fuel = glucose / restGlucose                   // × resting
  const fromMito = Math.round((aerobic / demand) * 100)

  const glow = (id) => (lit === id ? 1 : 0)
  const dim = (id) => (lit && lit !== id ? 0.42 : 1)

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)', alignItems: 'flex-start' }}>
        {isEnergy ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 250 }}>
              <span className="hw-readout-label">Fuel burned each second</span>
              <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>{fuel.toFixed(0)}×</span>
              <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 230, minHeight: 34, marginTop: 4 }}>
                {anaerobic > 0
                  ? 'Oxygen can no longer keep up. The rest is being made the quick way — and the quick way wastes fuel.'
                  : 'Everything is being made with oxygen, in the mitochondria. This is the efficient way.'}
              </span>
            </div>
            <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
              <div>
                <div className="hw-readout-label">Energy made each second</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  {demand}×<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> resting</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>as ATP, the cell's energy currency</div>
              </div>
              <div>
                <div className="hw-readout-label">Made in the mitochondria</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  {fromMito}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> %</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {anaerobic > 0 ? 'the remainder needs no oxygen at all' : 'all of it, while oxygen keeps up'}
                </div>
              </div>
              <div>
                <div className="hw-readout-label">From one glucose molecule</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  {anaerobic > 0 ? `${QUICK} or ${EFFICIENT}` : EFFICIENT}
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> ATP</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>with oxygen, about 30; without it, 2</div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 600 }}>
            <span className="hw-readout-label">
              {live ? `Following a message · step ${step} of ${STEPS.length}` : `Eight parts, one cell`}
            </span>
            <p aria-live="polite" style={{ margin: 0, fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty', minHeight: 66 }}>
              {live ? <Mark text={live.text} />
                : `Tap any part of the cell to see what the cell needs it for, and what it looks like close up — or follow a message all the way through, below.`}
            </p>
          </div>
        )}
      </div>

      <div
        className="hw-stage"
        style={{ height: 300, background: 'var(--paper)' }}
        role="img"
        aria-label={`A cutaway of a cell showing the membrane, nucleus, endoplasmic reticulum, Golgi apparatus, mitochondria, a lysosome and ribosomes.`}
      >
        <svg viewBox="0 0 560 290" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '4px 0 auto 0', width: '100%', height: 250 }}>
          {/* the cell, and the fluid everything sits in */}
          <ellipse
            cx="280" cy="140" rx="252" ry="126"
            fill="oklch(0.95 0.015 235)" stroke="oklch(0.55 0.08 235)" strokeWidth={lit === 'membrane' ? 7 : 4}
            opacity={dim('cyto') === 1 ? 1 : 0.9}
            onClick={() => !isEnergy && setSel(sel === 'cyto' ? null : 'cyto')}
            style={{ cursor: isEnergy ? 'default' : 'pointer' }}
          />
          {lit === 'membrane' && (
            <ellipse cx="280" cy="140" rx="252" ry="126" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="7 6" />
          )}
          {/* The rim is its own target. Without this the membrane is the one
              part of the cell that cannot be selected, because the filled
              ellipse underneath claims every click for the cytoplasm — and the
              membrane is both the hardest part to picture and the best drawing
              of the set. Stroke-only hit testing, so it never steals a click
              from an organelle inside. */}
          {!isEnergy && (
            <ellipse
              cx="280" cy="140" rx="252" ry="126"
              fill="none" stroke="transparent" strokeWidth="20" pointerEvents="stroke"
              style={{ cursor: 'pointer' }}
              onClick={() => setSel(sel === 'membrane' ? null : 'membrane')}
            />
          )}

          {/* the nucleus */}
          <g onClick={() => !isEnergy && setSel(sel === 'nucleus' ? null : 'nucleus')} style={{ cursor: isEnergy ? 'default' : 'pointer', opacity: dim('nucleus') }}>
            <circle cx="158" cy="140" r="62" fill="oklch(0.88 0.05 300)" stroke="oklch(0.45 0.12 300)" strokeWidth={glow('nucleus') ? 5 : 3} />
            <path d="M 130 118 q 14 12 28 0 q 14 -12 28 0 M 130 140 q 14 12 28 0 q 14 -12 28 0 M 130 162 q 14 12 28 0 q 14 -12 28 0"
              fill="none" stroke="oklch(0.42 0.13 300)" strokeWidth="2.4" />
            <text x="158" y="218" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">NUCLEUS</text>
          </g>

          {/* the endoplasmic reticulum, with ribosomes on it */}
          <g onClick={() => !isEnergy && setSel(sel === 'er' ? null : 'er')} style={{ cursor: isEnergy ? 'default' : 'pointer', opacity: dim('er') }}>
            {[0, 1, 2].map((i) => (
              <path key={i}
                d={`M 228 ${96 + i * 17} q 30 -13 58 0 q 28 13 56 0`}
                fill="none" stroke="oklch(0.50 0.10 85)" strokeWidth={glow('er') ? 5 : 3.4} strokeLinecap="round" />
            ))}
            {[236, 262, 290, 316, 338].map((x, i) => (
              <circle key={x} cx={x} cy={92 + (i % 2) * 17} r="3.4" fill="oklch(0.38 0.09 85)" />
            ))}
            <text x="285" y="76" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">ER + RIBOSOMES</text>
          </g>

          {/* ribosomes, as their own target */}
          <g onClick={() => !isEnergy && setSel(sel === 'ribosome' ? null : 'ribosome')} style={{ cursor: isEnergy ? 'default' : 'pointer', opacity: dim('ribosome') }}>
            {[[205, 60], [330, 52], [372, 72]].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r={glow('ribosome') ? 6 : 4.2} fill="oklch(0.38 0.09 85)" />
            ))}
          </g>

          {/* the Golgi */}
          <g onClick={() => !isEnergy && setSel(sel === 'golgi' ? null : 'golgi')} style={{ cursor: isEnergy ? 'default' : 'pointer', opacity: dim('golgi') }}>
            {[0, 1, 2, 3].map((i) => (
              <path key={i}
                d={`M ${250 + i * 3} ${196 + i * 13} q 38 -17 76 0`}
                fill="none" stroke="oklch(0.52 0.12 340)" strokeWidth={glow('golgi') ? 6 : 4.2} strokeLinecap="round" />
            ))}
            <text x="288" y="262" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">GOLGI</text>
          </g>

          {/* mitochondria */}
          <g onClick={() => !isEnergy && setSel(sel === 'mito' ? null : 'mito')} style={{ cursor: isEnergy ? 'default' : 'pointer', opacity: dim('mito') }}>
            {[[438, 112, -18], [398, 196, 14], [480, 176, -6]].map(([x, y, rot], i) => (
              <g key={i} transform={`rotate(${rot} ${x} ${y})`}>
                <ellipse cx={x} cy={y} rx="38" ry="19"
                  fill={isEnergy ? `oklch(${0.76 - demand * 0.004} ${0.09 + demand * 0.004} 40)` : 'oklch(0.80 0.08 40)'}
                  stroke="oklch(0.44 0.13 40)" strokeWidth={glow('mito') ? 4.5 : 3} />
                <path d={`M ${x - 26} ${y} q 7 -9 13 0 q 7 9 13 0 q 7 -9 13 0`} fill="none" stroke="oklch(0.44 0.13 40)" strokeWidth="2.2" />
              </g>
            ))}
            <text x="438" y="66" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">MITOCHONDRIA</text>
          </g>

          {/* the lysosome */}
          <g onClick={() => !isEnergy && setSel(sel === 'lyso' ? null : 'lyso')} style={{ cursor: isEnergy ? 'default' : 'pointer', opacity: dim('lyso') }}>
            <circle cx="196" cy="226" r={glow('lyso') ? 20 : 16} fill="oklch(0.82 0.09 155)" stroke="oklch(0.40 0.11 155)" strokeWidth="3" />
            <text x="196" y="258" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" letterSpacing="1" fill="var(--label)">LYSOSOME</text>
          </g>

          {/* the receptor on the membrane, and the messenger that fits it */}
          {!isEnergy && (
            <g style={{ opacity: dim('membrane') }}>
              <path d="M 150 22 l 0 -13 M 166 26 l 0 -13" stroke="oklch(0.45 0.14 340)" strokeWidth="4" strokeLinecap="round" />
              <rect x="144" y="18" width="28" height="12" rx="4" fill="oklch(0.60 0.14 340)" />
              {step >= 1 && (
                <circle cx="158" cy="2" r="7" fill="var(--accent)" stroke="var(--paper)" strokeWidth="1.5" />
              )}
              <text x="182" y="18" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" letterSpacing="1" fill="var(--label)">RECEPTOR</text>
            </g>
          )}

          {/* what energy mode is really about: fuel in, ATP out */}
          {isEnergy && (
            <g fontFamily="var(--sans)">
              <text x="40" y="52" fontSize="12.5" fill="oklch(0.42 0.11 235)">glucose + oxygen →</text>
              <text x="40" y="236" fontSize="12.5" fill="oklch(0.42 0.11 155)">← carbon dioxide + water</text>
              {anaerobic > 0 && (
                <text x="40" y="256" fontSize="12.5" fontWeight="600" fill="oklch(0.50 0.15 28)">← lactate, building up</text>
              )}
            </g>
          )}
        </svg>

        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {isEnergy
            ? 'A teaching diagram, not a photograph: a real cell is crowded, and glycolysis happens out in the fluid, not inside the mitochondria.'
            : 'A teaching diagram, not a photograph. A real cell is far more crowded than this, and far less tidy.'}
        </div>
      </div>

      {/* The selected part, drawn as well as described. The scene shows where it
          sits; this shows what it is, which a dot on a diagram cannot. */}
      {part && !live && !isEnergy && (
        <div style={{
          padding: '20px 24px 22px', borderTop: '1px solid var(--rule)', background: 'var(--card)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 16 }}>
            <Plate id={part.id} title={part.name} width={440} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, maxWidth: 620, margin: '0 auto' }}>
            <span className="hw-label">{part.name.toUpperCase()}</span>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.45, fontStyle: 'italic', color: 'var(--ink)' }}>
              {part.need}
            </p>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty' }}>
              {part.role}
            </p>
          </div>
        </div>
      )}

      <div className="hw-controls">
        {isEnergy ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 250 }}>
              <label htmlFor="hw-demand" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
                Work being done · {demand}× resting
              </label>
              <input id="hw-demand" type="range" min="1" max="20" step="1"
                value={demand} onChange={(e) => setDemand(Number(e.target.value))}
                style={{ width: 250, accentColor: 'var(--accent)', height: 28 }} />
            </div>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 250, textAlign: 'right' }}>
              Push it past the point where oxygen keeps up and watch the fuel number, not the energy number.
            </span>
          </>
        ) : (
          <>
            <button
              className="hw-btn"
              onClick={() => { setSel(null); setStep((s) => (s >= STEPS.length ? 0 : s + 1)) }}
              style={{
                fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 22px',
                borderColor: 'var(--ink)',
                background: step > 0 && step < STEPS.length ? 'var(--ink)' : 'var(--paper)',
                color: step > 0 && step < STEPS.length ? '#f6f1e7' : 'var(--ink)'
              }}
            >
              {step === 0 ? 'FOLLOW A MESSAGE IN' : step >= STEPS.length ? 'START AGAIN' : `NEXT STEP · ${step} OF ${STEPS.length}`}
            </button>
            {step > 0 && (
              <button className="hw-btn" onClick={() => setStep(0)}>BACK TO THE TOUR</button>
            )}
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 250, textAlign: 'right' }}>
              {step > 0 ? 'Notice that nothing from outside ever came in.' : 'Tap any part of the cell.'}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

/** The simulation's own copy carries **bold**, like lesson copy does. */
function Mark({ text }) {
  return <>{String(text).split(/(\*\*[^*]+\*\*)/g).map((bit, i) =>
    bit.startsWith('**') && bit.endsWith('**')
      ? <strong key={i} style={{ fontWeight: 600 }}>{bit.slice(2, -2)}</strong>
      : <span key={i}>{bit}</span>
  )}</>
}
