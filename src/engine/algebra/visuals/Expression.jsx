import { useState } from 'react'

// Lesson 3. A slider substitutes a value for the letter, and a TRUE/FALSE line
// says whether the equation holds.
//
// The reason this is a slider and not a box to type in: the learner sees the
// expression take a different value for every input, and the equation be false
// for all of them but one. That is the whole difference between an expression
// and an equation, and it is much easier to watch than to be told.

export default function Expression({ see, onEngaged }) {
  const cards = see.cards
  const [i, setI] = useState(0)
  const [vals, setVals] = useState({})

  const cd = cards[i] ?? cards[0]
  const v = vals[i] ?? 1
  const value = cd.a * v + cd.b
  const solution = (cd.target - cd.b) / cd.a
  const isTrue = value === cd.target
  const u = cd.unit || ''

  const substitution = cd.b
    ? `${cd.a} × ${v} + ${cd.b}  =  ${cd.a * v} + ${cd.b}  =  ${u}${value}`
    : `${cd.a} × ${v}  =  ${u}${value}`

  const setValue = (next) => {
    setVals((m) => ({ ...m, [i]: next }))
    if (cd.a * next + cd.b === cd.target) onEngaged?.()
  }

  return (
    <div className="hw-sim">
      <div className="hw-controls" style={{ gap: 8, flexWrap: 'wrap', borderBottom: '1px solid var(--rule-2)' }}>
        {cards.map((c, k) => (
          <button key={c.expr} className="hw-btn" onClick={() => setI(k)} aria-pressed={k === i}
            style={{
              fontSize: 13.5, padding: '10px 14px', borderColor: 'var(--ink)', fontWeight: 600,
              background: k === i ? 'var(--ink)' : 'var(--paper)', color: k === i ? '#f6f1e7' : 'var(--ink)'
            }}>{c.expr}</button>
        ))}
      </div>

      <div className="hw-stage" style={{ height: 290, background: 'var(--paper)' }}
        role="img" aria-label={`The expression ${cd.expr} with ${cd.v} = ${v}, which makes ${value}. The equation ${cd.expr} = ${cd.target} is ${isTrue ? 'true' : 'false'}.`}>
        <div style={{ position: 'absolute', left: 22, right: 22, top: 16, fontSize: 16, lineHeight: 1.5, color: 'var(--ink-3)', textWrap: 'pretty' }}>
          {cd.story}
        </div>

        <div style={{ position: 'absolute', left: 22, right: 22, top: 70, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 38, fontWeight: 600, color: 'var(--ink)' }}>{cd.expr}</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--muted)', marginTop: 10 }}>{substitution}</div>
        </div>

        <div style={{
          position: 'absolute', left: 22, right: 22, bottom: 16,
          background: isTrue ? 'oklch(0.97 0.02 155)' : 'var(--paper)',
          border: `1px solid ${isTrue ? 'oklch(0.85 0.05 155)' : 'var(--rule-2)'}`,
          borderRadius: 7, padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap'
        }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 21, fontWeight: 600 }}>{cd.expr} = {cd.target}</span>
          <span style={{
            fontFamily: 'var(--sans)', fontSize: 11.5, fontWeight: 700, letterSpacing: '.12em',
            padding: '5px 10px', borderRadius: 4, color: '#f6f1e7',
            background: isTrue ? 'oklch(0.50 0.12 155)' : 'oklch(0.50 0.13 25)'
          }}>{isTrue ? 'TRUE' : 'FALSE'}</span>
          <span style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--ink-3)', flex: 1, minWidth: 220 }}>
            {isTrue
              ? `True — and only when ${cd.v} = ${solution}. That value is the equation's solution.`
              : `With ${cd.v} = ${v} the expression makes ${u}${value}, not ${u}${cd.target}. Keep sliding.`}
          </span>
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 220 }}>
          <label htmlFor="hw-expr" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            {cd.v} = {v}
          </label>
          <input id="hw-expr" type="range" min="0" max={cd.max} step="1" value={v}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          Slide until the line turns true. Only one value does it.
        </span>
      </div>
    </div>
  )
}
