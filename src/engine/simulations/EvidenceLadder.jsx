import { useState } from 'react'

// Anatomy & Physiology, Lesson 20 — where a claim actually sits.
//
// This is the tool the course was commissioned for. The spec's mission section
// asks that the learner finish able to evaluate claims about peptides and
// health products, and §8 requires that a mechanism must never be presented as
// proof that a treatment works. So the ladder separates "something happens in a
// dish" from "it helps a person", and the examples are placed on it by evidence
// rather than by how they are marketed.
//
// §8 also requires that approval status be checked against current authoritative
// sources rather than memory. The regulatory statements below were verified
// against FDA material in October 2026 and are date-stamped on screen, because
// they will go out of date and a learner who does not know that has been
// given a false sense of currency. The lesson's job is the method, not the list.

const RUNGS = [
  { n: 1, name: `An idea`, what: `A mechanism that looks promising on paper. Nothing has been tested.` },
  { n: 2, name: `Cells in a dish`, what: `It does something to cells in a laboratory. Almost everything does something to cells in a dish.` },
  { n: 3, name: `Animals`, what: `It does something in mice or rats. Most things that work here never work in people.` },
  { n: 4, name: `A small human study`, what: `A few dozen people, often without a comparison group. Enough to justify a bigger trial, not enough to act on.` },
  { n: 5, name: `Large randomised trials`, what: `Thousands of people, randomly assigned, compared against a control. This is where "it helps" can first be said honestly.` },
  { n: 6, name: `Approved for a named use`, what: `A regulator has judged the evidence sufficient for one specific purpose, in one specific group, at a stated dose.` }
]

const CLAIMS = [
  {
    id: 'insulin', rung: 6, label: `Insulin for type 1 diabetes`,
    known: `About as settled as medicine gets. In use since the 1920s, with the mechanism, the dosing and the risks all thoroughly characterised.`,
    unknown: `Nothing about whether it works. Plenty about how best to deliver and time it — which is a different kind of question.`
  },
  {
    id: 'sema-t2d', rung: 6, label: `Semaglutide for type 2 diabetes`,
    known: `Approved for type 2 diabetes, with the label later extended to reducing cardiovascular risk in people with type 2 diabetes and heart disease, and in January 2025 to reducing worsening kidney disease and cardiovascular death in type 2 diabetes with chronic kidney disease.`,
    unknown: `Very long-term effects over decades, and how it compares head to head with every alternative in every group of people.`
  },
  {
    id: 'sema-weight', rung: 6, label: `Semaglutide for weight management`,
    known: `Approved for obesity in adults in June 2021 under a different brand name from the diabetes product, later extended to adolescents and to cardiovascular risk reduction in people with established cardiovascular disease.`,
    unknown: `What happens over many years, what happens on stopping, and how much of the loss is muscle rather than fat in whom.`
  },
  {
    id: 'teriparatide', rung: 6, label: `Teriparatide for osteoporosis`,
    known: `A peptide copy of part of parathyroid hormone — Lesson 16's calcium gland — approved for osteoporosis, with a first generic approved in November 2023.`,
    unknown: `Nothing about the basic question. How it is best sequenced with other approaches is still worked on.`
  },
  {
    id: 'bpc', rung: 3, label: `BPC-157 for healing tendons`,
    known: `Studies in cells and in animals, and a great deal of marketing. The US regulator placed it in a category of substances identified as presenting significant safety risks for pharmacy compounding, citing limited safety information and difficulties characterising the material. An advisory committee considered it in July 2026 with the agency's own briefing weighing against listing it, and the nominations were withdrawn. It has been banned in sport since 2022.`,
    unknown: `Whether it helps a human being. There is no approved human use anywhere, and the purity and content of what is actually sold is itself unestablished.`
  },
  {
    id: 'rfo', rung: 2, label: `A peptide sold "for research use only"`,
    known: `That phrase is not a disclaimer or a formality. It means the product has not been assessed for use in people, and selling it for that purpose is not permitted — which is precisely why the wording is there.`,
    unknown: `What is in the vial. Without an approved manufacturer there is no assurance of identity, purity, dose or sterility, and regulators have issued warnings to sellers over exactly this.`
  }
]

const QUESTIONS = [
  `Which molecule is actually being discussed?`,
  `What is it supposed to act on?`,
  `What evidence exists — in cells, in animals, in people?`,
  `Has a benefit that matters to a person been shown?`,
  `What harms, interactions and unknowns are reported?`,
  `Is it approved for this use, in this group?`,
  `How reliable is the source, the manufacture and the storage?`
]

export default function EvidenceLadder() {
  const [sel, setSel] = useState('bpc')
  const c = CLAIMS.find((x) => x.id === sel)
  const rung = RUNGS.find((r) => r.n === c.rung)

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{c.label}</span>
          <span className="hw-readout-num" style={{ color: c.rung >= 5 ? 'oklch(0.45 0.13 155)' : 'oklch(0.52 0.15 40)', fontSize: 23 }}>
            {rung.name}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 244, minHeight: 50, marginTop: 4 }}>
            {rung.what}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="How far up" value={`${c.rung} of 6`} u="" accent />
          <Stat label="Shown to help a person" value={c.rung >= 5 ? 'Yes' : 'Not yet'} u=""
            foot={c.rung >= 5 ? 'for the stated use' : 'whatever the mechanism suggests'} />
          <Stat label="Approved for this use" value={c.rung >= 6 ? 'Yes' : 'No'} u="" foot="as of October 2026" />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 300, background: 'var(--paper)' }}
        role="img" aria-label={`An evidence ladder of six rungs, with "${c.label}" placed on rung ${c.rung}.`}>
        <svg viewBox="0 0 560 262" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 246 }}>
          {RUNGS.map((r) => {
            const y = 232 - (r.n - 1) * 38
            const here = r.n === c.rung
            const below = r.n <= c.rung
            return <g key={r.n}>
              <rect x="40" y={y - 24} width="330" height="30" rx="8"
                fill={here ? (c.rung >= 5 ? 'oklch(0.88 0.08 155)' : 'oklch(0.90 0.07 40)') : below ? 'oklch(0.95 0.02 85)' : 'transparent'}
                stroke={here ? (c.rung >= 5 ? 'oklch(0.42 0.12 155)' : 'oklch(0.50 0.14 40)') : 'var(--rule)'}
                strokeWidth={here ? 2.6 : 1.4} strokeDasharray={below ? '0' : '5 5'} />
              <text x="56" y={y - 4} fontFamily="var(--sans)" fontSize="13" fontWeight={here ? 700 : 500}
                fill={below ? 'var(--ink)' : 'var(--muted)'}>{r.n}. {r.name}</text>
              {here && (
                <text x="382" y={y - 4} fontFamily="var(--sans)" fontSize="12.5" fontWeight="700"
                  fill={c.rung >= 5 ? 'oklch(0.38 0.12 155)' : 'oklch(0.46 0.15 40)'}>← it is here</text>
              )}
            </g>
          })}
          <line x1="40" y1="60" x2="370" y2="60" stroke="oklch(0.50 0.13 155)" strokeWidth="2" strokeDasharray="7 5" />
          <text x="376" y="52" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1" fill="oklch(0.38 0.12 155)">above this line,</text>
          <text x="376" y="66" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1" fill="oklch(0.38 0.12 155)">it has helped people</text>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Regulatory positions checked October 2026 and they do change — the method is what to keep, and a regulator's own site is where to look a status up.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CLAIMS.map((x) => (
            <button key={x.id} className="hw-btn" onClick={() => setSel(x.id)} aria-pressed={sel === x.id}
              style={{
                fontSize: 12.5, padding: '9px 13px',
                background: sel === x.id ? 'var(--ink)' : 'var(--paper)',
                color: sel === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)'
              }}>
              {x.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 24px 20px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
        <div style={{ maxWidth: 660, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 250 }}>
            <span className="hw-label" style={{ color: 'oklch(0.40 0.11 155)' }}>WHAT IS ESTABLISHED</span>
            <p style={{ margin: '8px 0 0', fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty' }}>{c.known}</p>
          </div>
          <div style={{ flex: 1, minWidth: 250 }}>
            <span className="hw-label" style={{ color: 'oklch(0.48 0.14 28)' }}>WHAT IS NOT</span>
            <p style={{ margin: '8px 0 0', fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty' }}>{c.unknown}</p>
          </div>
        </div>
        <div style={{ maxWidth: 660, margin: '20px auto 0', paddingTop: 16, borderTop: '1px solid var(--rule-2)' }}>
          <span className="hw-label">SEVEN QUESTIONS, FOR ANYTHING</span>
          <ol style={{ margin: '10px 0 0', paddingLeft: 20, fontSize: 15.5, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            {QUESTIONS.map((q) => <li key={q}>{q}</li>)}
          </ol>
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
