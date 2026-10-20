import { parseNumber, close, ERROR_TYPES } from '../../content/algebra/algebra-content.js'

// One problem, and everything that happens around a wrong answer.
//
// This component is the reason the Algebra Companion needed its own player. The
// other three classes ask the learner to predict and then explain; this one
// asks them to WORK something out, which means a wrong answer has to be met
// properly rather than buzzed.
//
// The order is deliberate and comes straight from the handoff:
//
//   1. Diagnose. Known wrong answers are listed per problem with the mistake
//      they come from — a meaning mix-up, a sign slip, the order of steps. The
//      learner is told what it looks like happened, not that they are wrong.
//   2. Show the substitution. "Put 8 back in: 6 × 8 = 48, but the right side is
//      42" is worth more than any amount of encouragement.
//   3. Hints, one at a time, and only for number problems.
//   4. The worked steps — but only after the hints run out or two tries, so
//      they cannot be used to skip the thinking.
//   5. After three tries, offer the smaller idea underneath instead.

/**
 * What to say about an answer.
 *
 * A near miss is treated as an arithmetic slip rather than a misunderstanding,
 * because telling someone who has the method right that they do not understand
 * is both wrong and discouraging.
 */
export function diagnose(p, raw) {
  const v = parseNumber(raw)
  if (isNaN(v)) {
    return { ok: false, type: 'notation', text: `Enter a number — a whole number, a decimal like 2.5, or a fraction like 8/3.` }
  }
  if (close(v, p.answer)) return { ok: true, text: p.success || 'Yes.' }

  const known = (p.diag || []).find((d) => close(v, d.v, 0.02))
  const checkLine = p.check ? p.check(v) : ''
  if (known) return { ok: false, type: known.type, text: known.msg, checkLine }

  const near = Math.abs(v - p.answer) <= Math.max(2, Math.abs(p.answer) * 0.15)
  return near
    ? { ok: false, type: 'arithmetic', text: `Your method looks right — the slip is probably in the arithmetic. Redo just the last calculation.`, checkLine }
    : { ok: false, type: null, text: `Not quite. Put your answer back into the original and see whether both sides match — then try a hint, or press "I don't get it."`, checkLine }
}

const FEEDBACK = {
  ok: { bg: 'oklch(0.97 0.02 155)', border: 'oklch(0.85 0.05 155)', kicker: 'oklch(0.36 0.10 155)' },
  no: { bg: 'oklch(0.975 0.012 25)', border: 'oklch(0.86 0.04 25)', kicker: 'oklch(0.42 0.13 25)' }
}

export default function Problem({ problem: p, index, total, rec, setRec, onStuck, turn }) {
  const result = rec.result ?? null
  const tries = rec.tries ?? 0
  const hintsShown = rec.hints ?? 0
  const workedShown = !!rec.worked
  const solved = !!result?.ok
  const hints = p.hints || []

  const submit = () => {
    const res = diagnose(p, rec.answer ?? '')
    setRec({ ...rec, result: res, tries: tries + 1 })
  }

  const pickOption = (o) => {
    setRec({
      ...rec,
      result: { ok: !!o.correct, pick: o.id, text: o.v, type: o.correct ? null : 'meaning' },
      tries: tries + 1
    })
  }

  const tone = result ? (result.ok ? FEEDBACK.ok : FEEDBACK.no) : null
  const canHint = p.kind === 'number' && hintsShown < hints.length
  const canWorked = p.kind === 'number' && !!p.worked && !workedShown && (hintsShown >= hints.length || tries >= 2)

  return (
    <div style={{ border: '1px solid var(--rule-2)', borderRadius: 7, padding: '18px 20px', background: 'var(--paper)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: 'var(--accent)' }}>
          {p.tier || `STEP ${index + 1} OF ${total}`}
        </span>
        {turn && (
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', color: 'var(--blue-text, oklch(0.44 0.10 250))' }}>
            {turn}
          </span>
        )}
      </div>

      <p style={{ fontSize: 18, lineHeight: 1.5, margin: 0, textWrap: 'pretty' }}>{p.q}</p>

      {p.kind === 'number' && (
        <div style={{ display: 'flex', gap: 9, alignItems: 'center', flexWrap: 'wrap' }}>
          <label htmlFor={`p-${p.id}`} style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600 }}>
            {p.label || 'x ='}
          </label>
          <input
            id={`p-${p.id}`} type="text" inputMode="text" value={rec.answer ?? ''}
            aria-label={`Answer for ${p.q}`} disabled={solved}
            onChange={(e) => setRec({ ...rec, answer: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter' && !solved) submit() }}
            style={{ width: 120, padding: '10px 12px', fontFamily: 'var(--sans)', fontSize: 16, border: '1px solid var(--field)', borderRadius: 5, background: 'var(--paper)', color: 'var(--ink)' }} />
          {!solved && (
            <button className="hw-btn" onClick={submit}
              style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.12em', padding: '11px 20px', background: 'var(--ink)', color: '#f6f1e7', borderColor: 'var(--ink)' }}>
              CHECK
            </button>
          )}
        </div>
      )}

      {p.kind === 'choice' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(p.options || []).map((o) => {
            const picked = result?.pick === o.id
            return (
              <button key={o.id} className="hw-btn" onClick={() => pickOption(o)} disabled={solved}
                style={{
                  textAlign: 'left', fontSize: 16, lineHeight: 1.45, padding: '13px 15px',
                  background: picked ? (o.correct ? 'oklch(0.96 0.03 155)' : 'oklch(0.97 0.02 45)') : 'var(--paper)',
                  borderColor: picked ? (o.correct ? 'oklch(0.50 0.12 155)' : 'var(--accent)') : 'var(--field)'
                }}>
                {o.t}
              </button>
            )
          })}
        </div>
      )}

      {result && (
        <div style={{ background: tone.bg, border: `1px solid ${tone.border}`, borderRadius: 7, padding: '13px 15px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', color: tone.kicker }}>
            {result.ok
              ? 'THE EDITOR · YES'
              : result.type ? `THE EDITOR · WHAT I THINK HAPPENED: ${ERROR_TYPES[result.type]}` : 'THE EDITOR'}
          </span>
          <span style={{ fontSize: 16, lineHeight: 1.5, textWrap: 'pretty' }}>{result.text}</span>
          {!result.ok && result.checkLine && (
            <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-3)' }}>{result.checkLine}</span>
          )}
        </div>
      )}

      {hints.slice(0, hintsShown).map((h, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', color: 'var(--label)', whiteSpace: 'nowrap' }}>
            HINT {i + 1}
          </span>
          <span style={{ fontSize: 15.5, lineHeight: 1.5 }}>{h}</span>
        </div>
      ))}

      {workedShown && p.worked && (
        <ol style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {p.worked.map((s, i) => (
            <li key={i} style={{ fontFamily: 'var(--sans)', fontSize: 15.5, lineHeight: 1.5 }}>{s}</li>
          ))}
        </ol>
      )}

      {!solved && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {canHint && (
            <button className="hw-btn" onClick={() => setRec({ ...rec, hints: hintsShown + 1 })}
              style={{ fontSize: 12.5, padding: '10px 14px' }}>
              {hintsShown === 0 ? 'Give me a hint' : 'Another hint'}
            </button>
          )}
          {canWorked && (
            <button className="hw-btn" onClick={() => setRec({ ...rec, worked: true })}
              style={{ fontSize: 12.5, padding: '10px 14px' }}>
              Show me the worked steps
            </button>
          )}
          <button className="hw-btn" onClick={() => onStuck?.(p.stuck, false)}
            style={{ fontSize: 12.5, padding: '10px 14px' }}>
            I don't get it
          </button>
          {tries >= 3 && (
            <button className="hw-btn" onClick={() => onStuck?.(p.stuck, true)}
              style={{ fontSize: 12.5, padding: '10px 14px', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              Let's make it smaller
            </button>
          )}
        </div>
      )}
    </div>
  )
}
