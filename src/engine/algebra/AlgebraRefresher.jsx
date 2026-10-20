import { useState } from 'react'
import { REFRESHER, LESSONS, parseNumber, close } from '../../content/algebra/algebra-content.js'
import { readRefresher, writeRefresher, readFamiliar, writeFamiliar, writePathChoice } from '../../lib/algebra.js'

// MATH REFRESHER — five optional questions, and nothing is scored.
//
// The point is not to find out what someone does not know. It is to let an
// adult skip what is still there: every question has an "I know this" button
// beside it, and marking one familiar is as valid an answer as getting it
// right. A wrong answer is met with the explanation, not a cross.
//
// It ends with ONE suggested lesson and a list to override it with, because a
// suggestion the learner cannot refuse is a test wearing a friendly hat.

const SUGGESTIONS = {
  equations: {
    title: `Lesson 7 — Undoing one move`,
    body: `You may recognize it once we see an example. Lesson 7 rebuilds solving from the idea of undoing, then its stretch problem takes you to two steps — the kind in question 4.`,
    n: 7
  },
  signed: {
    title: `Lesson 2 — Numbers with a direction`,
    body: `Let's rebuild negative numbers from direction and distance on a number line, so the sign rules make sense rather than needing to be remembered.`,
    n: 2
  },
  expressions: {
    title: `Lesson 3 — Letters that stand for numbers`,
    body: `You may recognize it once we see an example. Lesson 3 rebuilds variables, expressions and substitution — including why multiplying comes before adding.`,
    n: 3
  }
}

const OVERRIDES = [
  { n: 1, label: `Lesson 1 — Saying how one thing depends on another` },
  { n: 2, label: `Lesson 2 — Numbers with a direction` },
  { n: 3, label: `Lesson 3 — Letters that stand for numbers` },
  { n: 4, label: `Lesson 4 — What the equals sign is really saying` },
  { n: 4, label: `Lesson 4, deeper — why "the same to both sides" always works`, stage: 'understand', deeper: true },
  { n: 7, label: `Lesson 7 — Undoing one move (with a two-step stretch)` }
]

const STATUS = {
  ok: { label: 'STILL THERE', color: 'var(--green-text)' },
  familiar: { label: 'FAMILIAR', color: 'var(--green-text)' },
  no: { label: 'WORTH REBUILDING', color: 'var(--accent)' },
  unsure: { label: 'WORTH REBUILDING', color: 'var(--accent)' }
}

export default function AlgebraRefresher({ onOpenLesson, onHome, onCatalog }) {
  const saved = readRefresher()
  const [res, setRes] = useState(() => saved?.res ?? {})
  const [finished, setFinished] = useState(() => !!saved?.finished)
  const [answers, setAnswers] = useState({})

  // Arriving here is itself a statement about who is using the app.
  useState(() => { writePathChoice('refresh'); return null })

  const persist = (nextRes, nextFinished) => {
    setRes(nextRes)
    setFinished(nextFinished)
    writeRefresher({ res: nextRes, finished: nextFinished })
    // Anything still there, or claimed as familiar, is marked so the lessons
    // can offer to skip it.
    const fam = { ...readFamiliar() }
    for (const q of REFRESHER) {
      if (nextRes[q.id] === 'ok' || nextRes[q.id] === 'familiar') fam[q.concept] = true
    }
    writeFamiliar(fam)
  }

  const mark = (id, value) => persist({ ...res, [id]: value }, finished)

  const check = (q) => {
    const v = parseNumber(answers[q.id])
    if (isNaN(v)) return
    mark(q.id, close(v, q.answer, 0.01) ? 'ok' : 'no')
  }

  const answered = REFRESHER.filter((q) => res[q.id]).length
  const gap = REFRESHER.find((q) => res[q.id] === 'no' || res[q.id] === 'unsure')
  const showResult = finished || answered === REFRESHER.length

  const suggestion = !gap
    ? {
        title: `Start with Week 5 — systems and modeling`,
        body: `Nothing here needed rebuilding. Lesson 21 begins the newer ground: two unknowns, systems, and modeling real situations. You can mark earlier topics familiar as you go.`,
        n: 21
      }
    : SUGGESTIONS[gap.id] ?? {
        title: `Lesson ${gap.lesson} — ${LESSONS[gap.lesson].title}`,
        body: `You may recognize it once we see an example. This lesson rebuilds "${gap.topic.toLowerCase()}" from a picture first, then the reasoning behind each step.`,
        n: gap.lesson
      }

  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px 80px' }}>
      <header style={{ padding: '26px 0 18px', borderBottom: '1px solid var(--rule-2)', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <button onClick={onCatalog} className="hw-link"
          style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.22em', color: 'var(--accent)', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
          HEARTWOOD UNIVERSITY
        </button>
        <button onClick={onHome} className="hw-link"
          style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
          ← Algebra Companion
        </button>
      </header>

      <div style={{ padding: '46px 0 26px', maxWidth: 760 }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.2em', color: 'var(--label)' }}>
          MATH REFRESHER
        </span>
        <h1 style={{ fontSize: 46, fontWeight: 400, lineHeight: 1.08, letterSpacing: '-.02em', margin: '12px 0 0', textWrap: 'pretty' }}>
          Bring the ideas back to life
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--ink-3)', margin: '16px 0 0', textWrap: 'pretty' }}>
          Five questions, none of them scored and none of them compulsory. If one is still
          there, say so and skip it. If one is not, you get the explanation rather than a
          cross — and at the end, one suggestion about where to start, which you are free
          to ignore.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 14, maxWidth: 820 }}>
        {REFRESHER.map((q, i) => {
          const r = res[q.id]
          const status = r ? STATUS[r] : null
          const message = r === 'ok' ? `That one's still with you.`
            : r === 'familiar' ? `Skipped — marked familiar. You can revisit it any time.`
              : r === 'no' ? `Good to know — this is where we'll rebuild. ${q.back}`
                : r === 'unsure' ? `Let's rebuild it. ${q.back}` : ''
          return (
            <div key={q.id} style={{ border: '1px solid var(--field)', borderRadius: 9, padding: '20px 22px', background: 'var(--paper)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: 'var(--label)' }}>
                  {i + 1} · {q.topic.toUpperCase()}
                </span>
                {status && (
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', color: status.color }}>
                    {status.label}
                  </span>
                )}
              </div>

              <p style={{ margin: 0, fontSize: 22, lineHeight: 1.4, fontFamily: 'var(--sans)', fontWeight: 600 }}>{q.q}</p>
              {q.hint && !r && (
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>{q.hint}</span>
              )}

              {!r && (
                <div style={{ display: 'flex', gap: 9, alignItems: 'center', flexWrap: 'wrap' }}>
                  <input type="text" inputMode="text" value={answers[q.id] ?? ''} aria-label={`Answer to: ${q.q}`}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') check(q) }}
                    style={{ width: 140, padding: '11px 13px', fontFamily: 'var(--sans)', fontSize: 18, border: '1px solid var(--field)', borderRadius: 5, background: 'var(--paper)', color: 'var(--ink)' }} />
                  <button className="hw-btn" onClick={() => check(q)}
                    style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.1em', padding: '12px 18px', background: 'var(--ink)', color: '#f6f1e7', borderColor: 'var(--ink)' }}>
                    CHECK
                  </button>
                  <button className="hw-btn" onClick={() => mark(q.id, 'unsure')} style={{ fontSize: 12.5, padding: '12px 15px' }}>
                    I'm not sure
                  </button>
                  <button className="hw-btn" onClick={() => mark(q.id, 'familiar')} style={{ fontSize: 12.5, padding: '12px 15px' }}>
                    I know this — skip it
                  </button>
                </div>
              )}

              {message && (
                <p aria-live="polite" style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)', textWrap: 'pretty' }}>
                  {message}
                </p>
              )}
              {r && (
                <button className="hw-btn" onClick={() => mark(q.id, undefined)}
                  style={{ alignSelf: 'flex-start', fontSize: 12, padding: '8px 13px' }}>
                  Answer it again
                </button>
              )}
            </div>
          )
        })}
      </div>

      {!showResult && answered > 0 && (
        <button className="hw-btn" onClick={() => persist(res, true)}
          style={{ marginTop: 22, fontSize: 12.5, fontWeight: 700, letterSpacing: '.1em', padding: '13px 22px', borderColor: 'var(--ink)' }}>
          SUGGEST WHERE TO START
        </button>
      )}

      {showResult && (
        <div style={{ marginTop: 26, border: '1px solid var(--field)', borderRadius: 9, background: 'var(--paper)', overflow: 'hidden', maxWidth: 820 }}>
          <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.2em', color: 'var(--accent)' }}>
              A SUGGESTED STARTING POINT
            </span>
            <span style={{ fontSize: 30, lineHeight: 1.2, textWrap: 'pretty' }}>{suggestion.title}</span>
            <span style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)', textWrap: 'pretty' }}>{suggestion.body}</span>
            <button className="hw-btn" onClick={() => onOpenLesson(suggestion.n, 'refresh')}
              style={{ alignSelf: 'flex-start', marginTop: 4, fontSize: 12.5, fontWeight: 700, letterSpacing: '.1em', padding: '14px 24px', background: 'var(--ink)', color: '#f6f1e7', borderColor: 'var(--ink)' }}>
              OPEN LESSON {suggestion.n}
            </button>
          </div>
          <div style={{ padding: '18px 26px', borderTop: '1px solid var(--rule-2)', background: 'var(--paper-alt)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: 'var(--muted)' }}>
              OR CHOOSE YOUR OWN
            </span>
            {OVERRIDES.map((o) => (
              <button key={o.label} className="hw-link" onClick={() => onOpenLesson(o.n, 'refresh', o.stage, o.deeper)}
                style={{ textAlign: 'left', fontSize: 19, lineHeight: 1.4, background: 'none', border: 0, padding: 0, color: 'var(--accent)', cursor: 'pointer' }}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
