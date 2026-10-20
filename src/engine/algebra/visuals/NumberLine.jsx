import { useState } from 'react'
import { fmt } from '../../../content/algebra/algebra-content.js'

// Lesson 2. Three situations on one number line, and a running sum built from
// the moves the learner actually makes.
//
// The point of doing it with moves rather than a slider is that the expression
// writes itself underneath — −4 + 7 = 3 — so a signed number stops being a rule
// about minus signs and becomes a direction you just travelled.

const LO = -12, HI = 12
const pct = (v) => (((v - LO) / (HI - LO)) * 100).toFixed(3) + '%'

export default function NumberLine({ see, onEngaged }) {
  const scenarios = see.scenarios
  const [i, setI] = useState(0)
  const [pos, setPos] = useState(null)
  const [moves, setMoves] = useState([])
  const [solved, setSolved] = useState({})

  const sc = scenarios[i] ?? scenarios[0]
  const at = pos == null ? sc.start : pos

  const move = (d) => {
    const next = at + d
    if (next < LO || next > HI) return
    const mv = moves.slice()
    if (mv.length && Math.sign(mv[mv.length - 1]) === Math.sign(d)) mv[mv.length - 1] += d
    else mv.push(d)
    setPos(next)
    setMoves(mv)
    if (next === sc.answer) {
      setSolved((s) => ({ ...s, [i]: true }))
      onEngaged?.()
    }
  }

  const pick = (k) => { setI(k); setPos(null); setMoves([]) }
  const done = moves.length > 0 && at === sc.answer
  const expr = fmt(sc.start) +
    moves.map((m) => (m > 0 ? ' + ' : ' − ') + Math.abs(m)).join('') +
    (moves.length ? ' = ' + fmt(at) : '')

  return (
    <div className="hw-sim">
      <div className="hw-controls" style={{ gap: 8, flexWrap: 'wrap', borderBottom: '1px solid var(--rule-2)' }}>
        {scenarios.map((s, k) => (
          <button key={s.label} className="hw-btn" onClick={() => pick(k)} aria-pressed={k === i}
            style={{
              fontSize: 12.5, padding: '10px 13px', borderColor: 'var(--ink)',
              background: k === i ? 'var(--ink)' : 'var(--paper)', color: k === i ? '#f6f1e7' : 'var(--ink)'
            }}>
            {s.label}{solved[k] ? ' ✓' : ''}
          </button>
        ))}
      </div>

      <div className="hw-stage" style={{ height: 258, background: 'var(--paper)' }}
        role="img" aria-label={`A number line from −12 to 12. The marker is at ${fmt(at)}; the situation started at ${fmt(sc.start)}.`}>
        <div style={{ position: 'absolute', left: 22, right: 22, top: 16, fontSize: 16, lineHeight: 1.5, color: 'var(--ink-3)', textWrap: 'pretty' }}>
          {sc.t}
        </div>

        <div style={{ position: 'absolute', left: 40, right: 40, top: 96, height: 76 }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 36, height: 2, background: 'var(--machine)' }} />
          {Array.from({ length: 25 }, (_, k) => {
            const v = k + LO
            const zero = v === 0
            const major = v % 2 === 0
            return (
              <span key={v}>
                <span style={{
                  position: 'absolute', left: pct(v), top: zero ? 24 : major ? 28 : 31,
                  width: zero ? 3 : 1.5, height: zero ? 24 : major ? 16 : 10,
                  marginLeft: zero ? -1.5 : -0.75, background: zero ? 'var(--ink)' : 'var(--label)'
                }} />
                {major && (
                  <span style={{
                    position: 'absolute', left: pct(v), top: 52, transform: 'translateX(-50%)',
                    fontFamily: 'var(--sans)', fontSize: zero ? 14 : 12, fontWeight: zero ? 700 : 500,
                    color: zero ? 'var(--ink)' : 'var(--muted)'
                  }}>{fmt(v)}</span>
                )}
              </span>
            )
          })}
          <span style={{
            position: 'absolute', left: pct(sc.start), top: 29, transform: 'translateX(-50%)',
            width: 15, height: 15, borderRadius: '50%', border: '2px solid var(--label)', background: 'var(--paper)'
          }} />
          <span style={{
            position: 'absolute', left: pct(at), top: 27, transform: 'translateX(-50%)',
            width: 19, height: 19, borderRadius: '50%', background: done ? 'var(--green-text)' : 'var(--accent)',
            border: '2px solid var(--paper)', transition: 'left .25s ease'
          }} />
        </div>

        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 44, textAlign: 'center', fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', minHeight: 28 }}>
          {expr}
        </div>
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 14, textAlign: 'center', fontFamily: 'var(--sans)', fontSize: 13.5, color: done ? 'var(--green-text)' : 'var(--ink-3)' }}>
          {done ? 'Yes — that is where it ends up.'
            : moves.length ? `You are at ${fmt(at)}${sc.unit || ''}.`
              : `Start at ${fmt(sc.start)}${sc.unit || ''} (the hollow circle).`}
        </div>
      </div>

      <div className="hw-controls" style={{ gap: 8, flexWrap: 'wrap' }}>
        {[[-5, '← 5'], [-1, '← 1'], [1, '1 →'], [5, '5 →']].map(([d, label]) => {
          const off = at + d < LO || at + d > HI
          return (
            <button key={label} className="hw-btn" onClick={() => move(d)} disabled={off}
              style={{ fontSize: 13.5, padding: '11px 16px', opacity: off ? 0.4 : 1, borderColor: 'var(--ink)' }}>
              {label}
            </button>
          )
        })}
        <span style={{ flex: 1 }} />
        <button className="hw-btn" onClick={() => { setPos(null); setMoves([]) }}
          style={{ fontSize: 12.5, padding: '11px 14px', borderColor: 'var(--ink)' }}>START AGAIN</button>
      </div>
    </div>
  )
}
