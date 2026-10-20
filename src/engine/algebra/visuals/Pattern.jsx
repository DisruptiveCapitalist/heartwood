import { useState } from 'react'
import { parseNumber } from '../../../content/algebra/algebra-content.js'

// Lesson 1. Café tables pushed into a row, and the chairs around them.
//
// The whole lesson turns on one move: counting, then noticing, then never
// counting again. So the predictions matter more than the slider — you cannot
// draw a hundred tables, and that is the point. The observations stay hidden
// until one prediction is right, because the sentence "that is what a rule
// gives you" means nothing to someone who has not just used one.

const seatsFor = (n) => 2 * n + 2

const PREDICTIONS = [
  { id: 'p10', label: `10 tables?`, t: 10 },
  { id: 'p100', label: `100 tables?`, t: 100 }
]

export default function Pattern({ onEngaged }) {
  const [n, setN] = useState(1)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState({})

  const seats = seatsFor(n)

  const check = (q) => {
    const v = parseNumber(answers[q.id])
    if (isNaN(v)) return
    const right = seatsFor(q.t)
    let msg
    if (v === right) msg = 'ok'
    else if (v === 2 * q.t) msg = `That counts the long-side chairs — 2 per table — but not the two at the ends.`
    else if (v === 4 * q.t) msg = `That gives every table 4 chairs, as if it stood alone. Pushed together, the ends where tables touch have no chairs.`
    else msg = `Not quite. How many chairs does each extra table add? Look at the counted row.`
    setResults((r) => ({ ...r, [q.id]: msg }))
    if (msg === 'ok') onEngaged?.()
  }

  return (
    <div className="hw-sim">
      <div className="hw-stage" style={{ height: 272, background: 'var(--paper)' }}
        role="img" aria-label={`${n} square ${n === 1 ? 'table' : 'tables'} pushed together in a row, with a chair above and below each table and one at each end: ${seats} chairs.`}>
        <svg viewBox="0 0 560 150" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '18px 0 auto 0', width: '100%', height: 150 }}>
          {Array.from({ length: n }, (_, i) => {
            const w = Math.min(54, 300 / n)
            const x = 280 - (n * w) / 2 + i * w
            return <g key={i}>
              <rect x={x} y="58" width={w - 2} height="40" rx="3" fill="oklch(0.80 0.04 70)" stroke="var(--machine)" strokeWidth="1.5" />
              <circle cx={x + w / 2 - 1} cy="40" r="9" fill="oklch(0.50 0.12 45)" />
              <circle cx={x + w / 2 - 1} cy="116" r="9" fill="oklch(0.50 0.12 45)" />
            </g>
          })}
          <circle cx={280 - (n * Math.min(54, 300 / n)) / 2 - 16} cy="78" r="9" fill="oklch(0.44 0.10 250)" />
          <circle cx={280 + (n * Math.min(54, 300 / n)) / 2 + 14} cy="78" r="9" fill="oklch(0.44 0.10 250)" />
          <text x="280" y="140" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fill="var(--muted)">
            the two blue chairs are the ends — they never change
          </text>
        </svg>
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'var(--sans)' }}>
            <div className="hw-readout-label">{n} {n === 1 ? 'table' : 'tables'}</div>
            <div style={{ fontSize: 30, fontWeight: 600, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
              {seats}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> chairs</span>
            </div>
          </div>
          <table style={{ fontFamily: 'var(--sans)', fontSize: 12.5, borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '2px 10px 2px 0', color: 'var(--label)' }}>tables</td>
                {[1, 2, 3, 4, 5].map((t) => (
                  <td key={t} style={{ padding: '2px 7px', fontWeight: t === n ? 700 : 500, color: t === n ? 'var(--accent)' : 'var(--ink)' }}>{t}</td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '2px 10px 2px 0', color: 'var(--label)' }}>chairs</td>
                {[1, 2, 3, 4, 5].map((t) => (
                  <td key={t} style={{ padding: '2px 7px', fontWeight: t === n ? 700 : 500, color: t === n ? 'var(--accent)' : 'var(--ink)' }}>{seatsFor(t)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 300 }}>
          <label htmlFor="hw-pat" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Tables in the row · {n}</label>
          <input id="hw-pat" type="range" min="1" max="5" step="1" value={n}
            onChange={(e) => setN(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {PREDICTIONS.map((q) => {
            const r = results[q.id]
            const ok = r === 'ok'
            return (
              <div key={q.id} style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 236, flex: 1 }}>
                <label htmlFor={`hw-${q.id}`} className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
                  Without drawing it — {q.label}
                </label>
                <div style={{ display: 'flex', gap: 7 }}>
                  <input id={`hw-${q.id}`} type="text" inputMode="numeric" value={answers[q.id] ?? ''}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') check(q) }}
                    style={{ width: 92, padding: '9px 10px', fontFamily: 'var(--sans)', fontSize: 15, border: '1px solid var(--field)', borderRadius: 5, background: 'var(--paper)', color: 'var(--ink)' }} />
                  <button className="hw-btn" onClick={() => check(q)} style={{ fontSize: 12.5, padding: '9px 14px', borderColor: 'var(--ink)' }}>CHECK</button>
                </div>
                {r && (
                  <span style={{ fontSize: 12.5, lineHeight: 1.45, color: ok ? 'var(--green-text)' : 'oklch(0.46 0.15 25)' }}>
                    {ok
                      ? `Yes — ${seatsFor(q.t)}. ${q.t === 100 ? 'No drawing needed: that is what a rule gives you.' : 'Twice the tables, plus the two ends.'}`
                      : r}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        {(results.p10 === 'ok' || results.p100 === 'ok') && (
          <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', background: 'var(--green-wash, oklch(0.97 0.02 155))', border: '1px solid oklch(0.85 0.05 155)', borderRadius: 7, padding: '12px 14px' }}>
            Twice the tables, plus two. In symbols, <strong>c = 2t + 2</strong> — and it answers for any number of tables at all.
          </div>
        )}
      </div>
    </div>
  )
}
