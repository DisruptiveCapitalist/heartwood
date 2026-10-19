import { useState } from 'react'

// Anatomy & Physiology, Lesson 30 — the whole person.
//
// The spec asks for several educational scenarios and for the learner to trace
// the chain of events across cells, tissues, organs and systems. These are the
// seven it names, and each step carries the lesson it came from — so the final
// lesson is not a summary written at the learner but a structure they walk
// through, recognising their own six weeks as they go.
//
// Nothing here is new material. That is the point: by this lesson every link
// has already been earned, and the only new thing is seeing them joined up.

const LEVELS = ['Molecule', 'Cell', 'Tissue', 'Organ', 'System', 'Person']

const SCENARIOS = [
  {
    id: 'exercise', name: `You walk up a hill`,
    chain: [
      { level: 0, from: `L3`, text: `Working muscle spends ATP far faster than at rest, and the mitochondria need more oxygen to recharge it.` },
      { level: 1, from: `L14`, text: `More motor units are switched on. Each fibre still pulls all-or-nothing — there are simply more of them doing it.` },
      { level: 3, from: `L6`, text: `The heart raises both rate and the amount per beat. Output climbs from about 4.9 litres a minute toward 16.` },
      { level: 4, from: `L8`, text: `Breathing rises too — but the bigger change is that the muscle extracts far more from the same blood, taking venous saturation from 75% down toward 46%.` },
      { level: 2, from: `L7`, text: `Capillaries in the working muscle open up, while those in the gut narrow. The same blood is redirected rather than multiplied.` },
      { level: 5, from: `L15`, text: `And afterwards the muscle recovers in days, while the tendon takes months — which is why the hill feels easier next week and your Achilles may not agree.` }
    ]
  },
  {
    id: 'cold', name: `You step outside in winter`,
    chain: [
      { level: 2, from: `L9`, text: `Sensors in the skin report a falling temperature within seconds.` },
      { level: 1, from: `L10`, text: `Nerve signals reach the small vessels near the surface in milliseconds — this is a nervous instruction, not a hormonal one.` },
      { level: 2, from: `L9`, text: `Smooth muscle in those vessel walls contracts. Blood flow to the skin falls to a fraction of what it was.` },
      { level: 4, from: `L9`, text: `Heat loss drops. Your hands go cold and your core stays at 98.6 — a choice, made in seconds, about which part of you to protect.` },
      { level: 5, from: `L5`, text: `And the discomfort is part of the loop: it is how a cell-level decision gets a whole person to find gloves.` }
    ]
  },
  {
    id: 'infection', name: `A splinter goes in`,
    chain: [
      { level: 0, from: `L21`, text: `Patrolling cells recognise molecular patterns found on bacteria and never on you. No learning required.` },
      { level: 2, from: `L22`, text: `Nearby vessels widen and are made deliberately leaky. That is the redness, the heat and the swelling, all at once.` },
      { level: 1, from: `L22`, text: `Neutrophils arrive within hours in huge numbers; macrophages follow over days to clear up and direct repair.` },
      { level: 4, from: `L21`, text: `Fragments are carried away and presented to the specific half of your defences, which takes about five days to build a matching antibody.` },
      { level: 5, from: `L22`, text: `Collagen is laid down, the edges drawn together, and the patch remodelled over months — Lesson 12's protein, doing this job now.` },
      { level: 5, from: `L21`, text: `A few memory cells stay behind. Meet that same intruder again and it is over in three days rather than twelve.` }
    ]
  },
  {
    id: 'bone', name: `Your bones, while you sit here`,
    chain: [
      { level: 1, from: `L11`, text: `Osteocytes buried in the hard bone sense the strain of every load and report it.` },
      { level: 1, from: `L11`, text: `Osteoclasts dissolve old bone away; osteoblasts follow and lay down new. Balance is what "no change" actually is.` },
      { level: 0, from: `L12`, text: `What they lay down is collagen with mineral packed around it — the stiff and the flexible, neither any use alone.` },
      { level: 3, from: `L16`, text: `Parathyroid hormone can call calcium back out of it when blood levels fall. Your skeleton is also a store.` },
      { level: 5, from: `L11`, text: `Unloaded, it goes at about 1.5% a month. Loaded, it returns at a quarter of a percent. Which is why a cast, a hospital bed and a spaceflight all look the same to a bone.` }
    ]
  },
  {
    id: 'hormone', name: `A hormone reaches a cell`,
    chain: [
      { level: 3, from: `L16`, text: `A gland releases it into the blood, where it goes everywhere. Nothing is addressed to anyone.` },
      { level: 1, from: `L5`, text: `Only cells carrying the matching receptor can respond. The selectivity is in the listening, not the sending.` },
      { level: 0, from: `L17`, text: `A peptide cannot cross the membrane, so it binds at the surface. A steroid walks straight in and acts on the genes.` },
      { level: 1, from: `L18`, text: `Binding is not triggering. Something can occupy 95% of the receptors and produce nothing at all.` },
      { level: 1, from: `L4`, text: `Where it does trigger, the usual result is a gene read, a working copy made, and a protein built.` },
      { level: 5, from: `L16`, text: `And the product of all that feeds back and tells the gland to ease off. No one is in charge anywhere in this chain.` }
    ]
  },
  {
    id: 'medicine', name: `You take a tablet`,
    chain: [
      { level: 3, from: `L29`, text: `It is absorbed across the small intestine — thirty square metres of surface folded into your abdomen.` },
      { level: 3, from: `L29`, text: `And it goes to the liver **first**, before anything else, which transforms a good deal of it on the way through.` },
      { level: 4, from: `L7`, text: `What survives is distributed by the blood, reaching every tissue within a minute or two.` },
      { level: 0, from: `L18`, text: `At its target it binds a receptor — and whether it triggers, blocks or does nothing is a separate question from whether it fits.` },
      { level: 3, from: `L28`, text: `The liver keeps transforming it and the kidneys keep removing it. Half is gone in about five hours — or ten, if clearance is reduced.` },
      { level: 5, from: `L20`, text: `And none of that is evidence it helps anybody. Mechanism is a reason to investigate; a trial is what answers the question.` }
    ]
  },
  {
    id: 'abnormal', name: `One cell stops following the rules`,
    chain: [
      { level: 0, from: `L24`, text: `Damage occurs — from copying, from chemistry, from sunlight. Constantly, in every cell, and almost always repaired.` },
      { level: 1, from: `L24`, text: `Repair, checkpoints and programmed death each catch nearly everything. Getting past all three, several times, in one cell line, is a tall order.` },
      { level: 1, from: `L25`, text: `Immune patrol finds and removes most abnormal cells quietly. What gets past has usually learned to hide rather than overpowered anything.` },
      { level: 2, from: `L25`, text: `Beyond about a millimetre nothing grows without persuading blood vessels to grow toward it.` },
      { level: 5, from: `L24`, text: `And what changes the picture most is not size but whether it has spread — which is why that is the first question asked.` },
      { level: 5, from: `L25`, text: `Treatment aims at different things and is chosen on the type, how far it has gone, its molecular features and the person.` }
    ]
  }
]

export default function WholeBody() {
  const [sel, setSel] = useState('exercise')
  const [step, setStep] = useState(0)

  const s = SCENARIOS.find((x) => x.id === sel)
  const shown = s.chain.slice(0, step)
  const done = step >= s.chain.length

  const pick = (id) => { setSel(id); setStep(0) }

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{s.name}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 22 }}>
            {step === 0 ? 'Trace it yourself first' : done ? 'All the way through' : `Step ${step} of ${s.chain.length}`}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {step === 0
              ? 'Before you press anything — try to say what happens, and at what level. Then uncover it one step at a time and see how much you had.'
              : done
                ? 'Six weeks, in one chain. Every link in it is something you have already worked through.'
                : 'Keep going — and notice how often the chain jumps between levels rather than running down them in order.'}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Levels involved" value={new Set(shown.map((c) => c.level)).size || '—'} u={`of ${LEVELS.length}`} accent />
          <Stat label="Lessons drawn on" value={new Set(shown.map((c) => c.from)).size || '—'} u="" foot="across all six weeks" />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 300, background: 'var(--paper)', overflowY: 'auto' }}
        role="img" aria-label={`A chain of events for "${s.name}", ${step} of ${s.chain.length} steps revealed.`}>
        <div style={{ padding: '96px 24px 18px' }}>
          {shown.length === 0 ? (
            <p style={{ margin: 0, fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--muted)', textAlign: 'center', paddingTop: 20 }}>
              Nothing revealed yet. Say it out loud first — that is the exercise.
            </p>
          ) : shown.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '9px 0', borderTop: i ? '1px solid var(--rule-2)' : 'none' }}>
              <span style={{
                fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em',
                padding: '4px 8px', borderRadius: 999, flex: '0 0 auto', minWidth: 68, textAlign: 'center',
                background: 'var(--accent-wash-2)', color: 'var(--accent)', border: '1px solid var(--accent-edge)'
              }}>{LEVELS[c.level].toUpperCase()}</span>
              <span style={{ flex: 1, fontSize: 16.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty' }}>
                <Mark text={c.text} />
              </span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 11.5, fontWeight: 700, color: 'var(--muted)', flex: '0 0 auto' }}>{c.from}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hw-controls">
        <button className="hw-btn" onClick={() => setStep((x) => (x >= s.chain.length ? 0 : x + 1))}
          style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 22px', borderColor: 'var(--ink)',
            background: done ? 'var(--paper)' : 'var(--ink)', color: done ? 'var(--ink)' : '#f6f1e7'
          }}>
          {step === 0 ? 'SHOW ME THE FIRST STEP' : done ? 'START AGAIN' : 'NEXT STEP'}
        </button>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 250, textAlign: 'right' }}>
          Say it before you press. That is where the learning is.
        </span>
      </div>

      <div style={{ padding: '18px 24px 20px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <span className="hw-label">SEVEN THINGS THAT HAPPEN IN A BODY</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            {SCENARIOS.map((x) => (
              <button key={x.id} className="hw-btn" onClick={() => pick(x.id)} aria-pressed={sel === x.id}
                style={{ fontSize: 12.5, padding: '8px 12px', background: sel === x.id ? 'var(--ink)' : 'var(--paper)', color: sel === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
                {x.name}
              </button>
            ))}
          </div>
        </div>
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
