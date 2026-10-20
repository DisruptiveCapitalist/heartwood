import { useState } from 'react'
import { fmt } from '../../../content/algebra/algebra-content.js'

// Lessons 7, 8 and 10. A chain of operations done to x, and the learner undoes
// them — the LAST one first.
//
// That ordering is the whole lesson, and it is why this is a machine rather
// than an equation. Reading "3x + 4 = 19" left to right suggests undoing the
// × 3 first, which does not work. Watching a number go through two boxes makes
// it obvious that coming back out means leaving by the door you came in by.
//
// A wrong choice is answered with arithmetic rather than a no: it shows what
// that move would actually produce, and puts the result back through the step
// to show it does not fit.

const OPS = ['+', '−', '×', '÷']
const INV = { '+': '−', '−': '+', '×': '÷', '÷': '×' }
const WORD = { '+': 'adding', '−': 'subtracting', '×': 'multiplying', '÷': 'dividing' }

const ap = (op, a, k) =>
  op === '+' ? a + k : op === '−' ? a - k : op === '×' ? a * k : a / k

/** "3x + 4", built left to right the way the machine applies its operations. */
const expressionFor = (ops) => {
  let e = 'x'
  ops.forEach(([op, k], j) => {
    if (op === '×') e = j === 0 ? `${k}x` : `${k}(${e})`
    else if (op === '÷') e = `${j === 0 ? 'x' : `(${e})`} ÷ ${k}`
    else e = `${e} ${op} ${k}`
  })
  return e
}

export default function Machine({ see, onEngaged }) {
  const machines = see.machines.map((m) => ({ ...m, ops: m.ops || [[m.op, m.k]] }))
  const [idx, setIdx] = useState(0)
  const [picks, setPicks] = useState({})
  const [wrong, setWrong] = useState(null)

  const m = machines[idx]
  const nOps = m.ops.length
  const mine = picks[idx] ?? []
  const step = mine.length
  const done = step >= nOps

  // Work backwards from the output, undoing one operation per pick made.
  const back = [m.out]
  for (let j = 0; j < step; j++) {
    const [op, k] = m.ops[nOps - 1 - j]
    back.push(ap(INV[op], back[back.length - 1], k))
  }
  const cur = back[back.length - 1]
  const curOp = done ? null : m.ops[nOps - 1 - step]
  const x = m.ops.slice().reverse().reduce((a, [op, k]) => ap(INV[op], a, k), m.out)

  const choose = (o) => {
    if (o === INV[curOp[0]]) {
      const next = { ...picks, [idx]: [...mine, o] }
      setPicks(next)
      setWrong(null)
      if (next[idx].length >= nOps) onEngaged?.()
    } else {
      setWrong({ idx, step, op: o })
    }
  }

  const badPick = wrong && wrong.idx === idx && wrong.step === step ? wrong.op : null

  let result = ''
  let tone = 'neutral'
  if (done) {
    tone = 'ok'
    let v = x
    let chain = fmt(x)
    for (const [op, k] of m.ops) { v = ap(op, v, k); chain += ` ${op} ${k} = ${fmt(v)}` }
    result = `x = ${fmt(x)}. Check it forward: ${chain} ✓` +
      (nOps > 1 ? ' You undid the operations in reverse order — last one first.' : '')
  } else if (badPick) {
    tone = 'bad'
    const k = curOp[1]
    const val = ap(badPick, cur, k)
    result = badPick === curOp[0]
      ? `That runs this step forward again: ${fmt(cur)} ${badPick} ${k} = ${fmt(val)}. Further from x, not back toward it.`
      : `${fmt(cur)} ${badPick} ${k} = ${fmt(val)}. Put that back through the ${curOp[0]} ${k} step: ${fmt(val)} ${curOp[0]} ${k} = ${fmt(ap(curOp[0], val, k))} — not ${fmt(cur)}. What undoes ${WORD[curOp[0]]}?`
  } else if (step > 0) {
    result = `Good — that undid the ${m.ops[nOps - step][0]} ${m.ops[nOps - step][1]}. Now undo the step before it.`
  }

  const Box = ({ t, kind }) => (
    <span style={{
      display: 'grid', placeItems: 'center', minWidth: kind === 'op' ? 62 : 58, height: 58, padding: '0 12px',
      borderRadius: 6, fontFamily: 'var(--sans)', fontWeight: 600,
      fontSize: kind === 'op' ? 23 : 27,
      fontStyle: kind === 'in' && t === 'x' ? 'italic' : 'normal',
      border: kind === 'in' ? '2px dashed var(--accent)' : kind === 'op' ? '1px solid var(--ink)' : '1px solid var(--field)',
      background: kind === 'op' ? 'var(--ink)' : kind === 'out' ? 'var(--paper-alt)' : 'var(--paper)',
      color: kind === 'op' ? '#f6f1e7' : kind === 'in' ? 'var(--accent)' : 'var(--ink)'
    }}>{t}</span>
  )

  const TONE = {
    ok: { bg: 'oklch(0.97 0.02 155)', bd: 'oklch(0.85 0.05 155)' },
    bad: { bg: 'oklch(0.975 0.012 25)', bd: 'oklch(0.86 0.04 25)' },
    neutral: { bg: 'var(--paper-alt)', bd: 'var(--rule-2)' }
  }[tone]

  return (
    <div className="hw-sim">
      <div className="hw-controls" style={{ gap: 8, flexWrap: 'wrap', borderBottom: '1px solid var(--rule-2)', borderTop: 0 }}>
        {machines.map((mm, i) => {
          const on = i === idx
          const finished = (picks[i] ?? []).length >= mm.ops.length
          return (
            <button key={i} className="hw-btn" onClick={() => { setIdx(i); setWrong(null) }} aria-pressed={on}
              style={{
                fontSize: 13, fontWeight: 600, padding: '10px 14px', borderColor: 'var(--ink)',
                background: on ? 'var(--ink)' : 'var(--paper)', color: on ? '#f6f1e7' : 'var(--ink)'
              }}>
              {expressionFor(mm.ops)} = {mm.out}{finished ? ' ✓' : ''}
            </button>
          )
        })}
      </div>

      <div className="hw-stage" style={{ minHeight: 230, background: 'var(--paper)', position: 'relative', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}
        role="img" aria-label={`A machine: x goes in, ${m.ops.map(([op, k]) => `${op} ${k}`).join(' then ')}, and ${m.out} comes out.`}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box t={done ? fmt(x) : 'x'} kind="in" />
          {m.ops.map(([op, k], j) => (
            <span key={j} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span aria-hidden style={{ color: 'var(--label)', fontSize: 19 }}>→</span>
              <Box t={`${op} ${k}`} kind="op" />
            </span>
          ))}
          <span aria-hidden style={{ color: 'var(--label)', fontSize: 19 }}>→</span>
          <Box t={String(m.out)} kind="out" />
        </div>

        <div style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 600 }}>
          {expressionFor(m.ops)} = {m.out}
        </div>

        {step > 0 && (
          <div style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--accent)' }}>
            {back.map((v) => fmt(v)).join('  →  ')}
          </div>
        )}

        {result && (
          <div style={{ background: TONE.bg, border: `1px solid ${TONE.bd}`, borderRadius: 7, padding: '12px 15px', fontSize: 15.5, lineHeight: 1.5, textWrap: 'pretty', maxWidth: 620 }}>
            {result}
          </div>
        )}
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
        <span className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
          {done
            ? 'SOLVED. TRY ANOTHER MACHINE.'
            : `${nOps > 1 && step === 0 ? 'UNDO THE LAST STEP FIRST. ' : ''}WHICH MOVE UNDOES THE ${curOp[0]} ${curOp[1]}, STARTING FROM ${fmt(cur)}?`}
        </span>
        {!done && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {OPS.map((o) => (
              <button key={o} className="hw-btn" onClick={() => choose(o)}
                style={{
                  fontSize: 16, fontWeight: 600, padding: '12px 18px',
                  borderColor: badPick === o ? 'oklch(0.46 0.15 25)' : 'var(--field)'
                }}>
                {o} {curOp[1]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
