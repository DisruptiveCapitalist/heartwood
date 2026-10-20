import { useState } from 'react'
import { parseProblem, similarProblem, parseNumber, close, fmt } from '../../content/algebra/algebra-content.js'

// "Bring a problem from school."
//
// The rule this is built around, and the handoff states it twice: it never just
// hands over the answer. It classifies what the problem is testing, points at
// the lesson that covers it, and then offers two ways in — a SIMILAR problem
// with different numbers to try first, or a walk through the learner's own,
// where the learner does every calculation and "Show me" is always one press
// further than the attempt.
//
// The parser is ported from the handoff and recognises one- and two-step linear
// equations including −x, b + ax and x/d forms, unknowns on both sides,
// systems, fractions, slope and ratio language, bare expressions, and word
// problems. Anything it cannot solve still gets the five-question process,
// which is the part that transfers.

const EXAMPLES = ['2x + 7 = 19', 'x − 8 = −3', 'x/4 = 6', '5x = 3x + 12']

const PROCESS = [
  { l: 'READ', t: `What is the problem actually asking for? Say it in your own words.` },
  { l: 'IDENTIFY', t: `What information is given? Underline every number and what it measures.` },
  { l: 'REPRESENT', t: `What is unknown? Give it a letter, and write how it's related to what you know.` },
  { l: 'CHOOSE', t: `Which idea could help — an equation, a ratio, a graph?` },
  { l: 'SOLVE · CHECK', t: `Work it through, then put your answer back into the original situation. Does it make sense?` }
]

export default function ProblemReader({ path, onOpenLesson }) {
  const [text, setText] = useState('')
  const [parsed, setParsed] = useState(null)
  const [mode, setMode] = useState(null)

  const [simAnswer, setSimAnswer] = useState('')
  const [simChecked, setSimChecked] = useState(false)
  const [simSteps, setSimSteps] = useState(false)

  const [shown, setShown] = useState(1)
  const [walkAnswers, setWalkAnswers] = useState({})
  const [walkResults, setWalkResults] = useState({})
  const [note, setNote] = useState('')

  const read = (t) => {
    const value = t ?? text
    setText(value)
    setParsed(parseProblem(value))
    setMode(null)
    setSimAnswer(''); setSimChecked(false); setSimSteps(false)
    setShown(1); setWalkAnswers({}); setWalkResults({}); setNote('')
  }

  const P = parsed
  const linear = P?.kind === 'linear'

  // ---- the similar problem --------------------------------------------------
  const S = linear ? similarProblem(P) : null
  const simValue = parseNumber(simAnswer)
  const simLeft = (val) => (S.p.a * val) / S.p.d + S.p.b
  let simMessage = ''
  let simOk = false
  if (linear && simChecked) {
    if (isNaN(simValue)) simMessage = 'Enter a number.'
    else if (close(simValue, S.x)) {
      simOk = true
      simMessage = `Yes — ${S.p.v} = ${fmt(S.x)}. Now try yours the same way: ${P.text}`
    } else {
      simMessage = `Check it: with ${S.p.v} = ${fmt(simValue)}, the left side is ${fmt(simLeft(simValue))} but the right side is ${fmt(S.p.r)}. Try again, or press "Show me how."`
    }
  }

  // ---- the walkthrough ------------------------------------------------------
  let steps = []
  if (linear) {
    const p = P.p
    const v = p.v
    const done = []
    if (p.a !== 1) done.push(`multiplied by ${fmt(p.a)}`)
    if (p.d !== 1) done.push(`divided by ${fmt(p.d)}`)
    if (p.b) done.push(`${done.length ? 'then ' : ''}${p.b > 0 ? `had ${fmt(p.b)} added` : `had ${fmt(-p.b)} taken away`}`)

    steps = [
      { label: 'READ', t: `It's asking: what value of ${v} makes ${P.text} true?` },
      { label: 'IDENTIFY', t: `The right side is ${fmt(p.r)}. On the left, ${v} has been ${done.join(', ') || 'left alone'}.` },
      { label: 'REPRESENT', t: `It's already an equation — a balance. Whatever you do to one side, do to the other.` },
      {
        label: 'CHOOSE',
        t: P.moves.length === 0 ? `${v} is already alone.`
          : P.moves.length === 1 ? `One thing was done to ${v}, so one move undoes it: ${P.moves[0].move.toLowerCase()}.`
            : `${P.moves.length} things were done. Undo the last one first: ${P.moves.map((m) => m.undo).join(', then ')}.`
      }
    ]

    P.moves.forEach((m, i) => {
      const key = `m${i}`
      const r = walkResults[key]
      steps.push({
        label: `SOLVE ${i + 1}`,
        t: `${m.move}.`,
        ask: r !== 'ok' && r !== 'shown' ? m.ask : null,
        key,
        value: m.value,
        gate: r === 'ok' || r === 'shown',
        message: r === 'ok' ? `Yes. Now:  ${m.line}`
          : r === 'shown' ? m.line
            : r === 'nan' ? 'Enter a number.'
              : r === 'no' ? 'Not quite — work out just that one calculation again.' : '',
        ok: r === 'ok' || r === 'shown'
      })
    })

    const xs = fmt(P.x)
    steps.push({
      label: 'CHECK',
      t: `Put ${v} = ${xs} back into the original: ${P.text.replace(new RegExp(v, 'g'), `(${xs})`)}. The left side comes to ${fmt((p.a * P.x) / p.d + p.b)}, the same as the right. ✓`
    })
    steps.push({
      label: 'EXPLAIN',
      t: `Why does ${xs} make sense? Say it in your own words before you write it up.`,
      note: true
    })
  }

  const visible = steps.slice(0, shown)
  const last = visible[visible.length - 1]
  const blocked = !!(last && last.ask && !last.gate)

  const checkStep = (s) => {
    const val = parseNumber(walkAnswers[s.key])
    setWalkResults((w) => ({ ...w, [s.key]: isNaN(val) ? 'nan' : close(val, s.value) ? 'ok' : 'no' }))
  }

  return (
    <section aria-labelledby="bring" style={{ marginBottom: 44 }}>
      <h2 id="bring" style={{ fontSize: 28, fontWeight: 400, margin: '0 0 6px' }}>Bring a problem from school</h2>
      <p style={{ fontSize: 17, color: 'var(--ink-3)', margin: '0 0 18px', maxWidth: 720, textWrap: 'pretty' }}>
        Type a problem you have been set. I will tell you what it is testing and which lesson
        covers it, then help you work it — I will not do it for you.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <input type="text" value={text} aria-label="A problem from school"
          placeholder="for example  2x + 7 = 19"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') read() }}
          style={{ flex: 1, minWidth: 260, padding: '14px 16px', fontFamily: 'var(--sans)', fontSize: 18, border: '1px solid var(--field)', borderRadius: 7, background: 'var(--paper)', color: 'var(--ink)' }} />
        <button className="hw-btn" onClick={() => read()}
          style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.1em', padding: '15px 22px', background: 'var(--ink)', color: '#f6f1e7', borderColor: 'var(--ink)' }}>
          READ IT
        </button>
      </div>

      <div style={{ display: 'flex', gap: 7, marginTop: 11, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--muted)' }}>or try:</span>
        {EXAMPLES.map((e) => (
          <button key={e} className="hw-btn" onClick={() => read(e)} style={{ fontSize: 13, padding: '7px 12px' }}>{e}</button>
        ))}
      </div>

      {P && (
        <div style={{ marginTop: 20, border: '1px solid var(--field)', borderRadius: 9, background: 'var(--paper)', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 820 }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: 'var(--accent)' }}>
            THIS IS ABOUT · {P.concept.toUpperCase()}
          </span>
          {P.text && (
            <span style={{ fontFamily: 'var(--sans)', fontSize: 24, fontWeight: 600 }}>{P.text}</span>
          )}
          <span style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', textWrap: 'pretty' }}>
            What it is testing: {P.testing}
          </span>
          <button className="hw-link" onClick={() => onOpenLesson(P.lesson, path)}
            style={{ alignSelf: 'flex-start', fontSize: 17, background: 'none', border: 0, padding: 0, color: 'var(--accent)', cursor: 'pointer' }}>
            Open Lesson {P.lesson} →
          </button>

          {linear ? (
            <>
              <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 4 }}>
                {[['similar', 'Try a similar one first'], ['walk', 'Walk me through mine']].map(([id, label]) => (
                  <button key={id} className="hw-btn" onClick={() => setMode(id)} aria-pressed={mode === id}
                    style={{
                      fontSize: 12.5, fontWeight: 700, letterSpacing: '.08em', padding: '12px 18px', borderColor: 'var(--ink)',
                      background: mode === id ? 'var(--ink)' : 'var(--paper)', color: mode === id ? '#f6f1e7' : 'var(--ink)'
                    }}>{label}</button>
                ))}
              </div>

              {mode === 'similar' && (
                <div style={{ borderTop: '1px solid var(--rule-2)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.16em', color: 'var(--label)' }}>
                    SAME SHAPE, DIFFERENT NUMBERS
                  </span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600 }}>{S.text}</span>
                  <div style={{ display: 'flex', gap: 9, alignItems: 'center', flexWrap: 'wrap' }}>
                    <label htmlFor="sim" style={{ fontFamily: 'var(--sans)', fontSize: 17, fontWeight: 600 }}>{S.p.v} =</label>
                    <input id="sim" type="text" inputMode="text" value={simAnswer}
                      onChange={(e) => { setSimAnswer(e.target.value); setSimChecked(false) }}
                      onKeyDown={(e) => { if (e.key === 'Enter') setSimChecked(true) }}
                      style={{ width: 120, padding: '11px 13px', fontFamily: 'var(--sans)', fontSize: 17, border: '1px solid var(--field)', borderRadius: 5, background: 'var(--paper)', color: 'var(--ink)' }} />
                    <button className="hw-btn" onClick={() => setSimChecked(true)}
                      style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.1em', padding: '12px 18px', background: 'var(--ink)', color: '#f6f1e7', borderColor: 'var(--ink)' }}>CHECK</button>
                    {!simSteps && !simOk && (
                      <button className="hw-btn" onClick={() => setSimSteps(true)} style={{ fontSize: 12.5, padding: '12px 15px' }}>Show me how</button>
                    )}
                  </div>
                  {simMessage && (
                    <p aria-live="polite" style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: simOk ? 'var(--green-text)' : 'var(--ink-2)', textWrap: 'pretty' }}>{simMessage}</p>
                  )}
                  {simSteps && (
                    <ol style={{ margin: 0, paddingLeft: 22, display: 'grid', gap: 6 }}>
                      {S.moves.map((m, i) => (
                        <li key={i} style={{ fontFamily: 'var(--sans)', fontSize: 15.5, lineHeight: 1.5 }}>{m.move} → {m.line}</li>
                      ))}
                    </ol>
                  )}
                </div>
              )}

              {mode === 'walk' && (
                <div style={{ borderTop: '1px solid var(--rule-2)', paddingTop: 16, display: 'grid', gap: 12 }}>
                  {visible.map((s) => (
                    <div key={s.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(90px, auto) 1fr', gap: 16, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', color: 'var(--accent)' }}>{s.label}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                        <span style={{ fontSize: 17, lineHeight: 1.55, textWrap: 'pretty' }}>{s.t}</span>
                        {s.ask && (
                          <div style={{ display: 'flex', gap: 9, alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: 'var(--sans)', fontSize: 16 }}>{s.ask}</span>
                            <input type="text" inputMode="text" aria-label={s.ask} value={walkAnswers[s.key] ?? ''}
                              onChange={(e) => setWalkAnswers((w) => ({ ...w, [s.key]: e.target.value }))}
                              onKeyDown={(e) => { if (e.key === 'Enter') checkStep(s) }}
                              style={{ width: 100, padding: '9px 11px', fontFamily: 'var(--sans)', fontSize: 16, border: '1px solid var(--field)', borderRadius: 5, background: 'var(--paper)', color: 'var(--ink)' }} />
                            <button className="hw-btn" onClick={() => checkStep(s)} style={{ fontSize: 12, padding: '9px 14px' }}>CHECK</button>
                            <button className="hw-btn" onClick={() => setWalkResults((w) => ({ ...w, [s.key]: 'shown' }))} style={{ fontSize: 12, padding: '9px 14px' }}>Show me</button>
                          </div>
                        )}
                        {s.message && (
                          <span aria-live="polite" style={{ fontSize: 15.5, lineHeight: 1.5, color: s.ok ? 'var(--green-text)' : 'oklch(0.46 0.15 25)' }}>{s.message}</span>
                        )}
                        {s.note && (
                          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3}
                            placeholder="Because…"
                            style={{ width: '100%', padding: '12px 14px', fontSize: 16, lineHeight: 1.55, border: '1px solid var(--field)', borderRadius: 7, background: 'var(--paper)', color: 'var(--ink)', resize: 'vertical' }} />
                        )}
                      </div>
                    </div>
                  ))}
                  {shown < steps.length && (
                    <button className="hw-btn" onClick={() => setShown(shown + 1)} disabled={blocked}
                      style={{ justifySelf: 'start', fontSize: 12.5, fontWeight: 700, letterSpacing: '.1em', padding: '11px 20px', opacity: blocked ? 0.4 : 1, borderColor: 'var(--ink)' }}>
                      NEXT STEP
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div style={{ borderTop: '1px solid var(--rule-2)', paddingTop: 16, display: 'grid', gap: 11 }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.16em', color: 'var(--label)' }}>
                FIVE QUESTIONS THAT CRACK MOST OF THEM
              </span>
              {PROCESS.map((q) => (
                <div key={q.l} style={{ display: 'grid', gridTemplateColumns: 'minmax(110px, auto) 1fr', gap: 16, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', color: 'var(--accent)' }}>{q.l}</span>
                  <span style={{ fontSize: 16.5, lineHeight: 1.55, textWrap: 'pretty' }}>{q.t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
