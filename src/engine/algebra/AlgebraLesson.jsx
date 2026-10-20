import { useEffect, useMemo, useState } from 'react'
import { LESSONS, STAGES, PATHS, VOICES, REFLECT_PROMPTS } from '../../content/algebra/algebra-content.js'
import { readAlgebra, writeAlgebra, PATH_IDS } from '../../lib/algebra.js'
import { getVisual } from './visuals/index.js'
import Problem from './Problem.jsx'
import StuckPanel from './StuckPanel.jsx'

// The Algebra Companion's lesson player. One component renders any of the
// thirty lessons, on any of the three pathways.
//
// What makes it different from the generic player next door:
//   - a pathway can be switched mid-lesson, and each keeps its own record
//   - the learner answers questions, so Problem.jsx does the real work
//   - observations in SEE IT stay hidden until the visual has been used
//   - guided problems appear one at a time, each unlocked by the one before
//   - "I don't get it" is at every stage AND on every problem

/** Items and problems can be limited to particular pathways. */
const inPath = (path) => (x) =>
  (!x.paths && !x.p) || x.p === 'all' || (x.paths || x.p || '').split(',').map((s) => s.trim()).includes(path)

const Badge = ({ voice }) => (
  <span style={{
    fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em',
    color: VOICES[voice] ?? 'var(--ink)'
  }}>THE {voice}</span>
)

const Prompt = ({ voice, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 22 }}>
    <Badge voice={voice} />
    <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, fontStyle: 'italic', color: 'var(--ink-2)', textWrap: 'pretty' }}>
      {children}
    </p>
  </div>
)

export default function AlgebraLesson({ course, n, path, onPath, onLesson, onHome, onCatalog }) {
  const lesson = LESSONS[n]
  const [p, setP] = useState(() => readAlgebra(n, path))
  const [stuck, setStuck] = useState(null)

  // A new lesson or a new pathway is a different record entirely.
  useEffect(() => { setP(readAlgebra(n, path)); setStuck(null); window.scrollTo(0, 0) }, [n, path])

  const save = (patch) => {
    const next = { ...p, ...patch }
    setP(next)
    writeAlgebra(n, path, next)
  }

  const stage = p.stage ?? 0
  const key = STAGES[stage].key
  const go = (i) => {
    const s = Math.max(0, Math.min(STAGES.length - 1, i))
    save({ stage: s, visited: { ...p.visited, [STAGES[s].key]: true } })
    setStuck(null)
    window.scrollTo(0, 0)
  }

  const keep = inPath(path)
  const openStuck = (which, smaller) =>
    setStuck({ stuck: lesson.stuck?.[which ?? key] ?? lesson.stuck?.[key], smaller: !!smaller })

  // Per-problem records live inside the lesson record so a half-finished
  // challenge survives closing the tab.
  const recFor = (id) => ({
    answer: p.answers?.[id] ?? '',
    result: p.solved?.[id] ?? null,
    tries: p.tries?.[id] ?? 0,
    hints: p.hints?.[id] ?? 0,
    worked: !!p.worked?.[id]
  })
  const setRecFor = (id) => (rec) => save({
    answers: { ...p.answers, [id]: rec.answer },
    solved: { ...p.solved, [id]: rec.result },
    tries: { ...p.tries, [id]: rec.tries },
    hints: { ...p.hints, [id]: rec.hints },
    worked: { ...p.worked, [id]: rec.worked }
  })

  const Visual = getVisual(lesson.see.visual)
  const engaged = !!p.visited?.seeEngaged || !!p.obsForced

  // Guided problems arrive one at a time: the next appears once this one is right.
  const guided = useMemo(() => {
    const all = lesson.understand.guided ?? []
    const out = []
    for (const g of all) {
      out.push(g)
      if (!p.solved?.[g.id]?.ok) break
    }
    return out
  }, [lesson, p.solved])

  const challenge = (lesson.challenge.problems ?? []).filter(keep)
  const checks = (lesson.feynman.checks ?? []).filter(keep)
  const written = (p.feynmanText ?? '').trim()
  const checkHits = checks.map((c) => {
    try { return new RegExp(c.k, 'i').test(written) } catch { return false }
  })
  const gap = lesson.feynman.gap
  const gapOpen = p.feynmanSubmitted && gap && checkHits[gap.check] === false

  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px 80px' }}>
      <header style={{ padding: '26px 0 18px', borderBottom: '1px solid var(--rule-2)', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <button onClick={onCatalog} className="hw-link"
          style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.22em', color: 'var(--accent)', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
          HEARTWOOD UNIVERSITY
        </button>
        <button onClick={onHome} className="hw-link"
          style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
          ← {course.title}
        </button>
      </header>

      <div style={{ padding: '34px 0 22px' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.2em', color: 'var(--label)' }}>
          {lesson.kicker}
        </span>
        <h1 style={{ fontSize: 42, fontWeight: 400, lineHeight: 1.08, letterSpacing: '-.02em', margin: '12px 0 0', textWrap: 'pretty' }}>
          {lesson.title}
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--ink-3)', margin: '16px 0 0', maxWidth: 760, textWrap: 'pretty' }}>
          {lesson.hook[path]}
        </p>

        <div style={{ display: 'flex', gap: 7, marginTop: 22, flexWrap: 'wrap' }}>
          {PATH_IDS.map((id) => (
            <button key={id} className="hw-btn" onClick={() => onPath(id)} aria-pressed={id === path}
              title={PATHS[id].who}
              style={{
                fontSize: 11.5, fontWeight: 700, letterSpacing: '.12em', padding: '10px 14px',
                background: id === path ? 'var(--ink)' : 'var(--paper)',
                color: id === path ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)'
              }}>
              {PATHS[id].label}
            </button>
          ))}
        </div>
      </div>

      <nav aria-label="Lesson stages" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 0 24px', borderBottom: '1px solid var(--rule)' }}>
        {STAGES.map((s, i) => {
          const current = i === stage
          const done = p.visited?.[s.key] && !current
          return (
            <button key={s.key} onClick={() => go(i)} aria-current={current ? 'step' : undefined}
              style={{
                fontFamily: 'var(--sans)', display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start',
                padding: '9px 14px', borderRadius: 'var(--r-sm)',
                background: current ? 'var(--ink)' : done ? 'var(--paper)' : 'transparent',
                color: current ? '#f6f1e7' : done ? 'var(--ink-2)' : 'var(--label)',
                border: `1px solid ${current ? 'var(--ink)' : done ? '#cdc0ab' : '#ded4c2'}`
              }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.13em' }}>{s.label}</span>
              <span style={{ fontSize: 10.5, letterSpacing: '.06em', opacity: .72 }}>{s.min} min</span>
            </button>
          )
        })}
      </nav>

      <section style={{ padding: '30px 0 0', maxWidth: 820 }}>
        {key === 'see' && (
          <>
            <Prompt voice="PROFESSOR">{lesson.see.prompt[path]}</Prompt>
            {Visual
              ? <Visual
                  // Keyed by lesson and pathway so a new lesson gets a FRESH
                  // visual. Without this React keeps the component mounted and
                  // only swaps the props, so Lesson 12 inherits Lesson 18's
                  // slider values — and a tabbed visual arriving with no `tab`
                  // in its state crashes on the first render. The generic
                  // player next door needs the same key for the same reason.
                  key={`${n}.${path}`}
                  see={lesson.see}
                  onEngaged={() => save({ visited: { ...p.visited, seeEngaged: true } })} />
              : <div style={{ border: '1px dashed var(--field)', borderRadius: 7, padding: 28, fontFamily: 'var(--sans)', color: 'var(--muted)' }}>
                  The <strong>{lesson.see.visual}</strong> visual is not built yet. It arrives with a later week.
                </div>}
            <div style={{ marginTop: 26 }}>
              {engaged ? (
                <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
                  {lesson.see.observations.map((o, i) => (
                    <li key={i} style={{ fontSize: 17, lineHeight: 1.6, borderLeft: '3px solid var(--accent)', paddingLeft: 14, textWrap: 'pretty' }}>{o}</li>
                  ))}
                </ul>
              ) : (
                <button className="hw-btn" onClick={() => save({ obsForced: true })}
                  style={{ fontSize: 12.5, padding: '11px 16px' }}>
                  Show me what I should have noticed
                </button>
              )}
            </div>
          </>
        )}

        {key === 'understand' && (
          <>
            <Prompt voice="PROFESSOR">{lesson.understand.prompt[path]}</Prompt>
            <ol style={{ margin: '0 0 28px', paddingLeft: 24, display: 'grid', gap: 16 }}>
              {lesson.understand.sentences.map((s, i) => (
                <li key={i} style={{ fontSize: 18, lineHeight: 1.65, textWrap: 'pretty' }}>{s}</li>
              ))}
            </ol>

            {(lesson.understand.worked ?? []).map((w, i) => (
              <div key={i} style={{ border: '1px solid var(--rule-2)', borderRadius: 7, padding: '18px 20px', marginBottom: 16, background: 'var(--card-alt, var(--paper))' }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.16em', color: 'var(--label)' }}>
                  {w.title.toUpperCase()}
                </span>
                <div style={{ display: 'grid', gap: 11, marginTop: 13 }}>
                  {w.steps.map((s, j) => (
                    <div key={j} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, auto) 1fr', gap: 16, alignItems: 'baseline' }}>
                      <span style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600 }}>{s.m}</span>
                      <span style={{ fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink-3)' }}>{s.w}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {guided.length > 0 && (
              <div style={{ marginTop: 26 }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: 'var(--accent)' }}>
                  {lesson.understand.guidedTitle}
                </span>
                <div style={{ display: 'grid', gap: 14, marginTop: 12 }}>
                  {guided.map((g, i) => (
                    <Problem key={g.id} problem={g} index={i} total={(lesson.understand.guided ?? []).length}
                      rec={recFor(g.id)} setRec={setRecFor(g.id)} onStuck={openStuck} />
                  ))}
                </div>
              </div>
            )}

            {(lesson.understand.vocab ?? []).length > 0 && (
              <div style={{ marginTop: 28, border: '1px solid var(--rule-2)', borderRadius: 7, padding: '18px 20px' }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.16em', color: 'var(--label)' }}>
                  WHAT THINGS ARE CALLED
                </span>
                <dl style={{ margin: '13px 0 0', display: 'grid', gap: 10 }}>
                  {lesson.understand.vocab.map((v) => (
                    <div key={v.term}>
                      <dt style={{ fontFamily: 'var(--sans)', fontSize: 15.5, fontWeight: 700 }}>{v.term}</dt>
                      <dd style={{ margin: '2px 0 0', fontSize: 15.5, lineHeight: 1.55, color: 'var(--ink-3)' }}>{v.def}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {lesson.understand.deeper && (
              <div style={{ marginTop: 20 }}>
                <button className="hw-btn" onClick={() => save({ deeper: !p.deeper })}
                  style={{ fontSize: 12.5, padding: '11px 16px', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                  {p.deeper ? 'Hide' : 'Go deeper'} — {lesson.understand.deeper.title}
                </button>
                {p.deeper && (
                  <div style={{ marginTop: 14, display: 'grid', gap: 13 }}>
                    {lesson.understand.deeper.paras.map((t, i) => (
                      <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.65, textWrap: 'pretty' }}>{t}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {key === 'connect' && (
          <>
            <Prompt voice="ROOMMATE">{lesson.connect.prompt[path]}</Prompt>
            <div style={{ display: 'grid', gap: 9 }}>
              {lesson.connect.items.filter(keep).map((item) => {
                const on = !!p.connects?.[item.t]
                return (
                  <button key={item.t} className="hw-btn" onClick={() => save({ connects: { ...p.connects, [item.t]: !on } })}
                    aria-pressed={on}
                    style={{
                      textAlign: 'left', fontSize: 16.5, lineHeight: 1.5, padding: '13px 15px',
                      background: on ? 'oklch(0.96 0.03 155)' : 'var(--paper)',
                      borderColor: on ? 'oklch(0.50 0.12 155)' : 'var(--field)'
                    }}>
                    {item.t}
                  </button>
                )
              })}
            </div>

            {lesson.connect.builder && (
              <div style={{ marginTop: 20, border: '1px solid oklch(0.44 0.10 250)', borderRadius: 7, padding: '18px 20px' }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.16em', color: 'oklch(0.44 0.10 250)' }}>
                  THE BUILDER · {lesson.connect.builder.title.toUpperCase()}
                </span>
                <p style={{ margin: '11px 0 0', fontSize: 17, lineHeight: 1.6, textWrap: 'pretty' }}>{lesson.connect.builder.body}</p>
              </div>
            )}

            <label style={{ display: 'block', marginTop: 22 }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.16em', color: 'var(--label)' }}>
                ONE OF YOUR OWN
              </span>
              <textarea value={p.connectOwn ?? ''} onChange={(e) => save({ connectOwn: e.target.value })}
                placeholder={lesson.connect.own} rows={3}
                style={{ display: 'block', width: '100%', marginTop: 9, padding: '13px 15px', fontSize: 16.5, lineHeight: 1.55, fontFamily: 'var(--serif, inherit)', border: '1px solid var(--field)', borderRadius: 7, background: 'var(--paper)', color: 'var(--ink)', resize: 'vertical' }} />
            </label>

            {Object.values(p.connects ?? {}).some(Boolean) && (
              <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.6, color: 'var(--green-text)', textWrap: 'pretty' }}>
                {lesson.connect.affirm}
              </p>
            )}
          </>
        )}

        {key === 'feynman' && (
          <>
            <Prompt voice="FEYNMAN CHECK">{lesson.feynman.prompt[path]}</Prompt>
            <textarea value={p.feynmanText ?? ''} onChange={(e) => save({ feynmanText: e.target.value })}
              rows={8} placeholder="In your own words…"
              style={{ display: 'block', width: '100%', padding: '15px 17px', fontSize: 17, lineHeight: 1.6, border: '1px solid var(--field)', borderRadius: 7, background: 'var(--paper)', color: 'var(--ink)', resize: 'vertical' }} />
            <button className="hw-btn" onClick={() => save({ feynmanSubmitted: true })}
              style={{ marginTop: 14, fontSize: 12.5, fontWeight: 700, letterSpacing: '.12em', padding: '12px 22px', background: 'var(--ink)', color: '#f6f1e7', borderColor: 'var(--ink)' }}>
              {p.feynmanSubmitted ? 'CHECK IT AGAIN' : 'CHECK MY EXPLANATION'}
            </button>

            {p.feynmanSubmitted && (
              <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
                {checks.map((c, i) => (
                  <div key={c.t} style={{ display: 'flex', gap: 11, alignItems: 'baseline' }}>
                    <span aria-hidden style={{ fontSize: 17, color: checkHits[i] ? 'var(--green-text)' : 'var(--label)' }}>
                      {checkHits[i] ? '✓' : '○'}
                    </span>
                    <span style={{ fontSize: 16.5, lineHeight: 1.5, color: checkHits[i] ? 'var(--ink)' : 'var(--muted)' }}>
                      {c.t}
                    </span>
                  </div>
                ))}
                {gapOpen && (
                  <div style={{ marginTop: 6, border: '1px solid var(--accent)', borderRadius: 7, padding: '15px 17px', background: 'var(--accent-wash, oklch(0.97 0.012 45))' }}>
                    <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.6, textWrap: 'pretty' }}>{gap.msg}</p>
                    <button className="hw-btn" onClick={() => go(gap.stage)}
                      style={{ marginTop: 12, fontSize: 12.5, padding: '10px 15px', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                      Back to {STAGES[gap.stage].label}
                    </button>
                  </div>
                )}
                <p style={{ marginTop: 4, fontSize: 14, lineHeight: 1.55, color: 'var(--muted)' }}>
                  These are keyword checks, not a mark. A tick you did not earn, or a circle you did, is the checker being crude — your own judgement of the explanation is the one that counts.
                </p>
              </div>
            )}
          </>
        )}

        {key === 'challenge' && (
          <>
            <Prompt voice="EDITOR">{lesson.challenge.prompt[path]}</Prompt>
            <div style={{ display: 'grid', gap: 16 }}>
              {challenge.map((pr, i) => (
                <Problem key={pr.id} problem={pr} index={i} total={challenge.length}
                  rec={recFor(pr.id)} setRec={setRecFor(pr.id)} onStuck={openStuck}
                  turn={path === 'together'
                    ? (i % 2 === 0 ? 'STUDENT ANSWERS · ADULT CHECKS THE REASONING' : 'ADULT ANSWERS · STUDENT CHECKS THE REASONING')
                    : ''} />
              ))}
            </div>
          </>
        )}

        {key === 'reflect' && (
          <>
            <Prompt voice="JOURNAL">{lesson.reflect?.prompt?.[path] ?? lesson.reflect?.prompt ?? REFLECT_PROMPTS[0]}</Prompt>
            {(path === 'together' ? ['STUDENT', 'ADULT'] : ['']).map((who, i) => (
              <label key={who || 'one'} style={{ display: 'block', marginBottom: 16 }}>
                {who && (
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.16em', color: 'var(--label)' }}>{who}</span>
                )}
                <textarea
                  value={(i === 0 ? p.journalText : p.journalTextB) ?? ''}
                  onChange={(e) => save(i === 0 ? { journalText: e.target.value } : { journalTextB: e.target.value })}
                  rows={5} placeholder={REFLECT_PROMPTS[i % REFLECT_PROMPTS.length]}
                  style={{ display: 'block', width: '100%', marginTop: who ? 8 : 0, padding: '15px 17px', fontSize: 17, lineHeight: 1.6, border: '1px solid var(--field)', borderRadius: 7, background: 'var(--paper)', color: 'var(--ink)', resize: 'vertical' }} />
              </label>
            ))}
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>
              Levels move backward as well as forward, and none of this is a grade.
            </p>
          </>
        )}

        <div style={{ marginTop: 26 }}>
          {stuck ? (
            <StuckPanel stuck={stuck.stuck} prereq={lesson.prereq} startSmaller={stuck.smaller}
              onPrereq={(href) => onLesson(typeof href === 'number' ? href : n - 1)}
              onClose={() => setStuck(null)} />
          ) : (
            <button className="hw-btn" onClick={() => openStuck(key, false)}
              style={{ fontSize: 12.5, padding: '11px 16px', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              I don't get it
            </button>
          )}
        </div>
      </section>

      <footer style={{ display: 'flex', justifyContent: 'space-between', gap: 14, marginTop: 44, paddingTop: 22, borderTop: '1px solid var(--rule-2)' }}>
        <button className="hw-btn" onClick={() => stage === 0 ? onHome() : go(stage - 1)}
          style={{ fontSize: 12.5, letterSpacing: '.1em', padding: '12px 20px' }}>
          {stage === 0 ? 'BACK TO THE CLASS' : 'BACK'}
        </button>
        <button className="hw-btn"
          onClick={() => stage === STAGES.length - 1 ? (n < 30 ? onLesson(n + 1) : onHome()) : go(stage + 1)}
          style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.12em', padding: '12px 22px', background: 'var(--ink)', color: '#f6f1e7', borderColor: 'var(--ink)' }}>
          {stage === STAGES.length - 1 ? (n < 30 ? `NEXT · LESSON ${n + 1}` : 'FINISH') : `NEXT · ${STAGES[stage + 1].label}`}
        </button>
      </footer>
    </main>
  )
}
