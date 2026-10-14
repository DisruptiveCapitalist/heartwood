import { useState } from 'react'
import Plate from '../plates.jsx'

// Anatomy & Physiology, Lesson 1 — what a body is made of.
//
// The design is guess-first and that is the whole point: the grid stays grey
// until the learner commits to an answer, because "which jar is heaviest?" only
// teaches anything if you have taken a side first. Every one of the four
// guesses gets a real reply — iron and calcium are the interesting wrong ones,
// and neither is treated as a mistake.
//
// Two readings of the same body. By weight, oxygen is nearly two-thirds of you,
// because you are mostly water and almost all of water's weight is its oxygen.
// By count, hydrogen wins six to ten, because it is the lightest atom there is.
// Flipping between them is the lesson: the same body, two honest answers.
//
// The weight slider feeds arithmetic and nothing else. It is never written to
// storage — the course spec forbids keeping anything about the learner's own
// body, and a remembered body weight is exactly that.

const EL = [
  {
    id: 'O', plate: 'water', name: 'Oxygen', color: 'oklch(0.52 0.11 235)',
    w: 65, wSq: 65, c: 24, cSq: 24,
    role: `Mostly inside water, and part of nearly every other molecule in you as well. The oxygen you breathe in is what lets your cells release energy from food — that is Lesson 3.`
  },
  {
    id: 'C', plate: 'carbonChain', name: 'Carbon', color: '#3d362d',
    w: 18, wSq: 18, c: 12, cSq: 12,
    role: `The backbone of the molecules of life. Proteins, fats, sugars and DNA are all built on chains and rings of carbon atoms.`
  },
  {
    id: 'H', plate: 'hydrogenEverywhere', name: 'Hydrogen', color: 'oklch(0.80 0.07 235)',
    w: 10, wSq: 10, c: 62, cSq: 62,
    role: `The lightest atom there is, so it adds little weight. But it is in every water molecule and every organic molecule, which makes it by far the most numerous.`
  },
  {
    id: 'N', plate: 'aminoAcid', name: 'Nitrogen', color: 'oklch(0.52 0.12 155)',
    w: 3, wSq: 3, c: 1.1, cSq: 1,
    role: `Part of every amino acid — so of every protein — and of DNA. You breathe plenty of it in and out unused; the nitrogen your body builds with comes from food.`
  },
  {
    id: 'Ca', plate: 'boneMineral', name: 'Calcium', color: 'oklch(0.84 0.07 85)',
    w: 1.5, wSq: 2, c: 0.2, cSq: 0,
    role: `About 99% of it sits in bones and teeth. The small amount in blood and cells helps trigger muscle contraction and nerve signals.`
  },
  {
    id: 'P', plate: 'atp', name: 'Phosphorus', color: 'oklch(0.60 0.13 45)',
    w: 1, wSq: 1, c: 0.2, cSq: 0,
    role: `Calcium's partner in bone mineral. Also part of DNA, of every cell's outer membrane, and of ATP, the molecule cells use to hand energy around.`
  },
  {
    id: 'X', plate: 'saltLattice', name: 'Everything else', color: '#b9ab94',
    w: 1.5, wSq: 1, c: 0.5, cSq: 1,
    role: `Potassium, sulfur, sodium, chlorine and magnesium, plus traces of a dozen more. Iron is in here: only about 4 grams in a whole adult, roughly the weight of a small nail — yet it is what lets your blood carry oxygen.`
  }
]

const GUESSES = [
  { id: 'C', label: `Carbon`, reply: `A very good guess — carbon is the backbone of every molecule of life, and it is the second-biggest jar. But oxygen outweighs it more than three to one. The reason is water: you are mostly water, and almost all of water's weight is its oxygen.` },
  { id: 'Ca', label: `Calcium`, reply: `Understandable — bones feel like the heaviest, most solid part of you. But the whole skeleton is only about 15% of your weight, and even bone is partly water and protein. Calcium comes in fifth, about 1.5%.` },
  { id: 'O', label: `Oxygen`, reply: `Yes — and most people don't guess it. Oxygen is nearly two-thirds of your weight. Almost all of it isn't the gas in your lungs; it is locked inside water, which makes up more than half of you.` },
  { id: 'Fe', label: `Iron`, reply: `Iron is famous because it is in blood, so it feels important — and it is. But there are only about 4 grams in a whole adult, the weight of a small nail. It is too small even to earn one square below. The biggest jar is oxygen.` }
]

const GREY = '#e6ddcd'

/** Pounds, without a pointless trailing zero. Two decimals, because the lesson
 *  copy calls calcium "two and a quarter pounds" and a readout of 2.3 beside
 *  that sentence reads like a disagreement. 1.5% of 150 lb is 2.25. */
const fmt = (n) => String(Math.round(n * 100) / 100)

export default function ElementGrid({ memory = {}, remember }) {
  // The guess persists — the visual is meaningless once un-guessed, so coming
  // back to the lesson should not wipe it. The body weight deliberately does not.
  const guess = memory.guess ?? null
  const [mode, setMode] = useState('w')
  const [sel, setSel] = useState(null)
  const [lb, setLb] = useState(150)

  const shown = !!guess
  const byW = mode === 'w'
  const reply = GUESSES.find((g) => g.id === guess)?.reply ?? ''
  const selected = EL.find((e) => e.id === sel) ?? null

  const squares = []
  for (const e of EL) {
    const n = byW ? e.wSq : e.cSq
    for (let k = 0; k < n; k++) squares.push(e)
  }

  const caption = !shown
    ? `Make a guess above and the jars fill in.`
    : byW
      ? `Each square is 1% of your weight. Percentages are rounded and vary a little from person to person.`
      : `Each square is 1 in every 100 atoms. Calcium and phosphorus are too few to earn a square.`

  const pick = (id) => { remember?.({ guess: id }); setSel(null) }

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)', alignItems: 'flex-start' }}>
        {!shown ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 560 }}>
            <span className="hw-readout-label">Which jar is heaviest?</span>
            <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
              {GUESSES.map((g) => (
                <button key={g.id} className="hw-btn" onClick={() => pick(g.id)}
                  style={{ fontSize: 14, padding: '11px 18px' }}>
                  {g.label}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>
              Commit to one. Nothing fills in until you do.
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 600 }}>
            <span className="hw-readout-label">
              Your guess · {GUESSES.find((g) => g.id === guess)?.label}
            </span>
            <p aria-live="polite" style={{ margin: 0, fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty' }}>
              {reply}
            </p>
          </div>
        )}
      </div>

      <div className="hw-stage" style={{ height: 'auto', padding: '22px 24px', background: 'var(--paper)', position: 'relative' }}>
        <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div
            role="img"
            aria-label={shown
              ? (byW
                ? `A hundred squares, one per percent of body weight: 65 oxygen, 18 carbon, 10 hydrogen, 3 nitrogen, 2 calcium, 1 phosphorus, 1 everything else.`
                : `A hundred squares, one per hundred atoms: 62 hydrogen, 24 oxygen, 12 carbon, 1 nitrogen, 1 everything else.`)
              : `A hundred grey squares, waiting for a guess.`}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 3,
              width: 232, flex: '0 0 auto'
            }}
          >
            {squares.map((e, i) => (
              <div key={i} style={{
                aspectRatio: '1', borderRadius: 2,
                background: shown ? e.color : GREY,
                opacity: shown && sel && sel !== e.id ? 0.18 : 1,
                transition: 'opacity .18s ease, background .3s ease'
              }} />
            ))}
          </div>

          <div style={{ flex: 1, minWidth: 250, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {EL.map((e) => {
              const pct = byW ? e.w : e.c
              const value = !shown ? '?'
                : byW ? `${pct}% · ${fmt(lb * pct / 100)} lb`
                  : pct < 1 ? `fewer than 1 in 100` : `about ${Math.round(pct)} in 100`
              const on = sel === e.id
              return (
                <button
                  key={e.id}
                  onClick={() => setSel(on ? null : e.id)}
                  disabled={!shown}
                  aria-pressed={on}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 11, width: '100%',
                    padding: '7px 11px', borderRadius: 'var(--r-sm)', textAlign: 'left',
                    fontFamily: 'var(--sans)', fontSize: 14, cursor: shown ? 'pointer' : 'default',
                    background: on ? 'var(--accent-wash-2)' : 'var(--card)',
                    border: `1px solid ${on ? 'var(--accent-edge)' : 'var(--rule)'}`,
                    color: 'var(--ink)'
                  }}
                >
                  <span style={{
                    width: 15, height: 15, borderRadius: 3, flex: '0 0 auto',
                    background: shown ? e.color : GREY
                  }} />
                  <span style={{ flex: 1 }}>
                    {e.name}
                    {e.id !== 'X' && (
                      <span style={{ color: 'var(--muted)', fontWeight: 600 }}> {e.id}</span>
                    )}
                  </span>
                  <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--label)' }}>{value}</span>
                </button>
              )
            })}
          </div>
        </div>

        {selected && (
          <div style={{
            marginTop: 18, padding: '16px 18px 18px', borderLeft: '3px solid var(--accent)',
            background: 'var(--accent-wash)', borderRadius: 'var(--r-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 12 }}>
              <Plate id={selected.plate} title={selected.name} width={420} />
            </div>
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
              <span className="hw-label">{selected.name.toUpperCase()} — WHAT IT DOES IN YOU</span>
              <p style={{ margin: '8px 0 0', fontSize: 16, lineHeight: 1.55, color: 'var(--ink-2)', textWrap: 'pretty' }}>
                {selected.role}
              </p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 14, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {caption}
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 0, border: '1px solid var(--ink)', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
          {[['w', 'BY WEIGHT'], ['c', 'BY NUMBER OF ATOMS']].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setMode(k)}
              aria-pressed={mode === k}
              style={{
                fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 700, letterSpacing: '.1em',
                padding: '12px 16px', border: 'none', cursor: 'pointer',
                background: mode === k ? 'var(--ink)' : 'var(--paper)',
                color: mode === k ? '#f6f1e7' : 'var(--ink)'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 220 }}>
          <label htmlFor="hw-lb" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            A body that weighs · {lb} lb
          </label>
          <input id="hw-lb" type="range" min="90" max="260" step="5"
            value={lb} onChange={(e) => setLb(Number(e.target.value))}
            style={{ width: 220, accentColor: 'var(--accent)', height: 28 }} />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Only for the arithmetic. Nothing here is saved.
          </span>
        </div>

        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 240, textAlign: 'right' }}>
          {shown ? 'Tap any element to see what it does in you.' : 'Four jars. One of them is much heavier.'}
        </span>
      </div>
    </div>
  )
}
