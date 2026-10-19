import { useState } from 'react'

// Anatomy & Physiology, Week 5. Two lessons, carefully.
//
//   rules    (Lesson 24) why it takes several failures and a great deal of time
//   response (Lesson 25) what finds it, how it hides, and what treatment aims at
//
// The spec is specific about what must not be taught here. Cancer is a group of
// diseases, not one. It arises from combinations of biological change,
// environmental exposure, inherited susceptibility, age and chance — so the
// simulation has a control for several of those and never resolves to a single
// cause. Not every tumour is cancer. And it must not be presented as simply a
// failure of the immune system, nor may any supplement or peptide be suggested
// to prevent or cure it. None is named anywhere in either mode.
//
// The multi-hit model is why the first mode is built the way it is: with the
// safeguards intact the required changes essentially never accumulate within a
// lifetime, which is the honest reason this is uncommon given that your cells
// divide some tens of millions of times an hour.

const NEEDED = 6

const GUARDS = [
  { id: 'repair', name: `DNA repair`, what: `Finds and mends damaged DNA before the cell divides. Working constantly, in every cell, all day.` },
  { id: 'check', name: `Checkpoints`, what: `Halt a damaged cell before it divides and give the repair crew time. The genes behind these are the tumour suppressors.` },
  { id: 'apoptosis', name: `Programmed death`, what: `A damaged cell that cannot be mended switches itself off and is cleared away. Dying on purpose is a normal part of being a cell.` }
]

const STAGES = [
  { id: 'watch', name: `Found and dealt with`, what: `Immune cells patrol tissue and recognise cells displaying something abnormal. Most abnormal cells are dealt with quietly, and you never know.` },
  { id: 'evade', name: `Hidden`, what: `Some abnormal cells stop displaying the flags that mark them out, or actively switch off the immune cells that arrive. Hiding is not the same as the immune system failing.` },
  { id: 'supply', name: `Fed`, what: `Beyond about a millimetre, a clump cannot get enough oxygen by diffusion alone. It signals for blood vessels to grow toward it — and without that it simply stops.` },
  { id: 'spread', name: `Spread`, what: `Some cells leave, survive the journey, and start again elsewhere. This is metastasis, and it is what changes the picture most — not the size of the original.` }
]

const TREATMENTS = [
  { id: 'surgery', name: `Surgery`, aims: `Remove the tumour itself.`, limit: `Only reaches what can be found and reached, and nothing that has already left.` },
  { id: 'radiation', name: `Radiation`, aims: `Damage DNA in a targeted area so those cells cannot keep dividing.`, limit: `Local. Healthy tissue in the path is affected too, which is why aim and dose matter so much.` },
  { id: 'chemo', name: `Chemotherapy`, aims: `Attack cells that are dividing quickly, wherever they are in the body.`, limit: `Your own fast-dividing tissues — gut lining, hair, marrow — are hit as well. That is where most of the side effects come from.` },
  { id: 'targeted', name: `Targeted therapy`, aims: `Act on a specific molecular change present in that particular tumour.`, limit: `Only works if that change is present, which is why tumours are tested before it is used.` },
  { id: 'immuno', name: `Immunotherapy`, aims: `Remove the brakes cancer cells use to switch immune cells off, so patrol can resume.`, limit: `Helps in some cancers and not others, and a freed immune system can turn on healthy tissue too.` },
  { id: 'hormone', name: `Hormone therapy`, aims: `Starve a tumour whose growth depends on a hormone, by blocking it or lowering it.`, limit: `Only for cancers that are driven that way — Lesson 18's blockers, put to this use.` }
]

export default function Cancer({ mode = 'rules' }) {
  const [years, setYears] = useState(40)
  const [off, setOff] = useState([])
  const [exposure, setExposure] = useState(1)
  const [stage, setStage] = useState('watch')
  const [treat, setTreat] = useState('surgery')

  const rate = 0.012 * 2.6 ** off.length * exposure
  const changes = Math.min(NEEDED, years * rate)
  const escaped = changes >= NEEDED
  const toggle = (id) => setOff((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]))

  const st = STAGES.find((x) => x.id === stage)
  const tr = TREATMENTS.find((x) => x.id === treat)
  const stageIndex = STAGES.findIndex((x) => x.id === stage)

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{mode === 'rules' ? 'After these years' : st.name}</span>
          <span className="hw-readout-num" style={{ color: mode === 'rules' ? (escaped ? 'oklch(0.52 0.16 28)' : 'var(--accent)') : 'var(--accent)', fontSize: 22 }}>
            {mode === 'rules'
              ? (escaped ? 'Enough changes' : `${changes.toFixed(1)} of ${NEEDED}`)
              : st.name}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {mode === 'rules'
              ? (off.length === 0
                ? 'With every safeguard working, the changes needed essentially never accumulate in a lifetime — which is the real reason this is uncommon given how often your cells divide.'
                : escaped
                  ? 'Enough separate changes have accumulated in one cell line. Note how many safeguards had to fail first, and how long it still took.'
                  : 'With a safeguard down, damage accumulates faster. It still takes several more changes, and it still takes years.')
              : st.what}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'rules' ? <>
            <Stat label="Safeguards not working" value={`${off.length} of 3`} u="" foot={off.length ? 'each one lost speeds it up' : 'all three intact'} />
            <Stat label="Changes accumulated" value={changes.toFixed(1)} u={`of ${NEEDED}`} accent foot="in the most affected cell line" />
            <Stat label="Years passed" value={years} u="" foot="age is the time for this to add up" />
          </> : <>
            <Stat label="Where it has got to" value={`${stageIndex + 1} of 4`} u="" accent />
            <Stat label="Still local?" value={stage === 'spread' ? 'No' : 'Yes'} u=""
              foot={stage === 'spread' ? 'this is the change that matters most' : 'confined to where it started'} />
            <Stat label="Treatment shown" value={tr.name} u="" foot="one of several, often combined" />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 282, background: 'var(--paper)' }}
        role="img" aria-label={mode === 'rules'
          ? `A tissue of cells accumulating changes over ${years} years, with ${off.length} of three safeguards disabled.`
          : `A small group of abnormal cells at the "${st.name}" stage.`}>
        <svg viewBox="0 0 560 244" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 228 }}>
          {mode === 'rules' ? <>
            {Array.from({ length: 72 }, (_, i) => {
              const x = 52 + (i % 12) * 40
              const y = 38 + Math.floor(i / 12) * 32
              // One cell line carries the changes; the rest pick up harmless ones.
              const lead = i === 41
              const marks = lead ? changes : Math.min(2, (changes * ((i * 7) % 5)) / 14)
              const sev = lead ? changes / NEEDED : marks / NEEDED
              return <g key={i}>
                <rect x={x} y={y} width="32" height="24" rx="7"
                  fill={escaped && lead ? 'oklch(0.60 0.17 28)' : `oklch(${0.92 - sev * 0.16} ${0.02 + sev * 0.13} ${155 - sev * 120})`}
                  stroke={lead && changes > 0.5 ? 'oklch(0.44 0.15 28)' : 'oklch(0.62 0.05 155)'}
                  strokeWidth={lead && changes > 0.5 ? 2.4 : 1.4} />
                {Array.from({ length: Math.floor(marks) }, (_, k) => (
                  <circle key={k} cx={x + 6 + k * 5} cy={y + 18} r="2" fill="oklch(0.42 0.15 28)" />
                ))}
              </g>
            })}
            <text x="52" y="28" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">A PATCH OF ORDINARY TISSUE</text>
            <text x="52" y="238" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
              dots are changes carried by a cell · most changes are harmless · it takes several particular ones, in one line
            </text>
          </> : <>
            <circle cx="230" cy="112" r={stage === 'watch' ? 26 : stage === 'evade' ? 40 : 54} fill="oklch(0.86 0.09 28)" stroke="oklch(0.44 0.15 28)" strokeWidth="2.6" />
            {stageIndex >= 2 && [0, 1, 2].map((i) => (
              <path key={i} d={`M ${84 + i * 10} ${60 + i * 50} q 60 ${20 - i * 18} 92 ${52 - i * 4}`} fill="none" stroke="oklch(0.56 0.17 25)" strokeWidth="4" strokeLinecap="round" />
            ))}
            {[0, 1, 2, 3, 4].map((i) => {
              const angle = (i / 5) * Math.PI * 2
              const r = 92
              const found = stage === 'watch'
              return <g key={i} opacity={stage === 'evade' ? 0.35 : 1}>
                <circle cx={230 + Math.cos(angle) * r} cy={112 + Math.sin(angle) * r * 0.7} r="11"
                  fill={found ? 'oklch(0.56 0.13 155)' : 'oklch(0.80 0.05 155)'} stroke="oklch(0.36 0.11 155)" strokeWidth="2" />
              </g>
            })}
            {stage === 'spread' && [0, 1].map((i) => (
              <circle key={i} cx={420 + i * 62} cy={70 + i * 90} r="13" fill="oklch(0.70 0.14 28)" stroke="oklch(0.44 0.15 28)" strokeWidth="2.2" />
            ))}
            <text x="230" y="222" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
              {stage === 'watch' ? 'green cells are immune patrol, and they are finding it'
                : stage === 'evade' ? 'patrol is still arriving — and is being switched off, or finding nothing to recognise'
                  : stage === 'supply' ? 'vessels growing toward it; beyond about a millimetre nothing grows without them'
                    : 'cells have left and started again elsewhere'}
            </text>
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {mode === 'rules'
            ? 'A simplified teaching model of one path. Cancer is a group of diseases — the changes, the number needed and the timescale differ enormously between them.'
            : 'A simplified picture. Immune surveillance is one factor among several, and cancer is not simply a failure of it. Treatment choices depend on the cancer, the stage, its molecular features and the person.'}
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'rules' ? <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 210 }}>
            <label htmlFor="hw-yr" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Years passed · {years}</label>
            <input id="hw-yr" type="range" min="0" max="90" step="1" value={years}
              onChange={(e) => setYears(Number(e.target.value))} style={{ width: 210, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 190 }}>
            <label htmlFor="hw-exp" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Extra damage · {exposure === 1 ? 'none' : `${exposure}×`}
            </label>
            <input id="hw-exp" type="range" min="1" max="4" step="0.5" value={exposure}
              onChange={(e) => setExposure(Number(e.target.value))} style={{ width: 190, accentColor: 'var(--accent)', height: 28 }} />
          </div>
        </> : (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {STAGES.map((x) => (
              <button key={x.id} className="hw-btn" onClick={() => setStage(x.id)} aria-pressed={stage === x.id}
                style={{ background: stage === x.id ? 'var(--ink)' : 'var(--paper)', color: stage === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
                {x.name.toUpperCase()}
              </button>
            ))}
          </div>
        )}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          {mode === 'rules' ? 'Leave all three on and run the years to ninety.' : 'Then look at what each treatment can and cannot reach.'}
        </span>
      </div>

      <div style={{ padding: '18px 24px 20px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {mode === 'rules' ? <>
            <span className="hw-label">THE THREE SAFEGUARDS — TURN ONE OFF AND SEE</span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '12px 0 0' }}>
              {GUARDS.map((g) => (
                <button key={g.id} className="hw-btn" onClick={() => toggle(g.id)} aria-pressed={off.includes(g.id)}
                  style={{
                    borderColor: off.includes(g.id) ? 'oklch(0.55 0.17 28)' : 'var(--ink)',
                    color: off.includes(g.id) ? 'oklch(0.48 0.17 28)' : 'var(--ink)'
                  }}>
                  {off.includes(g.id) ? `${g.name.toUpperCase()} — OFF` : g.name.toUpperCase()}
                </button>
              ))}
            </div>
            <p style={{ margin: '12px 0 0', fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>
              {GUARDS.find((g) => off.includes(g.id))?.what ?? GUARDS[0].what}
            </p>
          </> : <>
            <span className="hw-label">WHAT TREATMENT AIMS AT</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0 0' }}>
              {TREATMENTS.map((t) => (
                <button key={t.id} className="hw-btn" onClick={() => setTreat(t.id)} aria-pressed={treat === t.id}
                  style={{ fontSize: 12.5, padding: '8px 12px', background: treat === t.id ? 'var(--ink)' : 'var(--paper)', color: treat === t.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
                  {t.name}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginTop: 14 }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <span className="hw-label" style={{ color: 'oklch(0.40 0.11 155)' }}>WHAT IT AIMS AT</span>
                <p style={{ margin: '6px 0 0', fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>{tr.aims}</p>
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <span className="hw-label" style={{ color: 'oklch(0.48 0.14 28)' }}>WHAT IT CANNOT DO</span>
                <p style={{ margin: '6px 0 0', fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>{tr.limit}</p>
              </div>
            </div>
          </>}
        </div>
      </div>
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
