import { useMemo, useState } from 'react'
import { PATHS, LEVELS } from '../../content/algebra/algebra-content.js'
import {
  readAlgebra, readPathChoice, writePathChoice, PATH_IDS,
  conceptLevels, weekRows, todayCard, algebraProgress
} from '../../lib/algebra.js'

// The Algebra Companion's class home.
//
// The one thing it does that the other class homes do not: it asks WHO is
// here before anything else. The same thirty lessons read differently to a
// student meeting an idea, an adult rebuilding it and the two of them working
// together, and the pathway is remembered so the question is asked once.

const STATUS_COLOR = {
  READY: 'var(--label)', 'IN PROGRESS': 'var(--accent)', COMPLETE: 'var(--green-text)'
}

export default function AlgebraHome({ course, onOpenLesson, onCatalog, onRefresher }) {
  const [path, setPath] = useState(() => readPathChoice())

  const progressOf = useMemo(() => {
    const cache = {}
    return (n, p) => (cache[`${n}.${p}`] ??= readAlgebra(n, p))
  }, [path])

  const choose = (id) => { writePathChoice(id); setPath(id) }

  const active = path ?? 'learn'
  const today = todayCard(active, progressOf)
  const rows = weekRows(active, progressOf)
  const concepts = conceptLevels(progressOf)
  const prog = algebraProgress(active, progressOf)

  return (
    <main style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px 80px' }}>
      <header style={{ padding: '26px 0 18px', borderBottom: '1px solid var(--rule-2)' }}>
        <button onClick={onCatalog} className="hw-link"
          style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.22em', color: 'var(--accent)', background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
          HEARTWOOD UNIVERSITY
        </button>
      </header>

      <div style={{ padding: '46px 0 30px', maxWidth: 820 }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.2em', color: 'var(--label)' }}>
          CLASS {course.order} · {course.kicker.toUpperCase()}
        </span>
        <h1 style={{ fontSize: 50, fontWeight: 400, lineHeight: 1.06, letterSpacing: '-.02em', margin: '12px 0 0', textWrap: 'pretty' }}>
          {course.title}
        </h1>
        <p style={{ fontSize: 26, lineHeight: 1.3, fontWeight: 300, fontStyle: 'italic', color: 'var(--ink-3)', margin: '14px 0 0', textWrap: 'pretty' }}>
          {course.subtitle}
        </p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)', margin: '20px 0 0', letterSpacing: '.03em' }}>
          {course.meta}
        </p>
      </div>

      <section aria-labelledby="pathways" style={{ paddingBottom: 34 }}>
        <h2 id="pathways" style={{ fontSize: 28, fontWeight: 400, margin: '0 0 6px' }}>
          {path ? 'Your pathway' : 'Who is here today?'}
        </h2>
        <p style={{ fontSize: 17, color: 'var(--ink-3)', margin: '0 0 18px' }}>
          {path ? 'Change it any time — inside a lesson too. Each keeps its own place.' : 'The same thirty lessons, read three ways. Pick one; you can change it whenever you like.'}
        </p>
        <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}>
          {PATH_IDS.map((id) => {
            const on = id === path
            return (
              <button key={id} onClick={() => choose(id)} aria-pressed={on}
                style={{
                  textAlign: 'left', padding: '20px 22px', borderRadius: 9, cursor: 'pointer',
                  background: on ? 'var(--ink)' : 'var(--paper)',
                  color: on ? '#f6f1e7' : 'var(--ink)',
                  border: `1px solid ${on ? 'var(--ink)' : 'var(--field)'}`
                }}>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: on ? '#f6f1e7' : 'var(--accent)' }}>
                  {PATHS[id].label}
                </span>
                <span style={{ display: 'block', fontSize: 17, lineHeight: 1.45, marginTop: 10, opacity: on ? 0.95 : 1 }}>
                  {PATHS[id].who}
                </span>
                <span style={{ display: 'block', fontSize: 15, lineHeight: 1.5, marginTop: 8, fontStyle: 'italic', color: on ? '#e4dcd0' : 'var(--muted)' }}>
                  {PATHS[id].line}
                </span>
              </button>
            )
          })}
        </div>
        {!path && onRefresher && (
          <button className="hw-btn" onClick={onRefresher}
            style={{ marginTop: 16, fontSize: 12.5, padding: '11px 16px', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            Not sure where to start? Try the five-question refresher
          </button>
        )}
      </section>

      {path && (
        <>
          <section style={{ border: '1px solid var(--field)', borderRadius: 9, padding: '26px 28px', background: 'var(--paper)', marginBottom: 40 }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.2em', color: 'var(--accent)' }}>
              {today.kicker}
            </span>
            <h2 style={{ fontSize: 32, fontWeight: 400, lineHeight: 1.12, margin: '12px 0 0' }}>{today.title}</h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-3)', margin: '12px 0 0', maxWidth: 680, textWrap: 'pretty' }}>
              {today.blurb}
            </p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 20, flexWrap: 'wrap' }}>
              <button className="hw-btn" onClick={() => onOpenLesson(today.n, active)}
                style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.12em', padding: '13px 20px', background: 'var(--ink)', color: '#f6f1e7', borderColor: 'var(--ink)' }}>
                {today.cta}
              </button>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>{today.meta}</span>
            </div>
          </section>

          <section aria-labelledby="journey" style={{ marginBottom: 44 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 14, borderBottom: '1px solid var(--rule-2)', paddingBottom: 10, marginBottom: 20 }}>
              <h2 id="journey" style={{ fontSize: 28, fontWeight: 400, margin: 0 }}>The six-week curriculum</h2>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
                {prog.done} of 30 done · all thirty written · enter anywhere
              </span>
            </div>
            <div style={{ display: 'grid', gap: 26 }}>
              {rows.map((w) => (
                <div key={w.number} style={{ display: 'grid', gridTemplateColumns: 'minmax(190px, 240px) 1fr', gap: 24, alignItems: 'start' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: 'var(--label)' }}>
                      WEEK {w.number}
                    </span>
                    <h3 style={{ fontSize: 21, fontWeight: 400, margin: '7px 0 0' }}>{w.title}</h3>
                    <p style={{ fontSize: 15.5, fontStyle: 'italic', color: 'var(--muted)', margin: '6px 0 0', lineHeight: 1.45 }}>{w.idea}</p>
                  </div>
                  <div style={{ display: 'grid', gap: 7 }}>
                    {w.lessons.map((l) => (
                      <button key={l.n} onClick={() => onOpenLesson(l.n, active)}
                        style={{
                          display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'baseline',
                          textAlign: 'left', padding: '12px 15px', borderRadius: 7, cursor: 'pointer',
                          background: 'var(--paper)', border: '1px solid var(--field)'
                        }}>
                        <span style={{ fontSize: 16.5, lineHeight: 1.4 }}>
                          <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--label)', marginRight: 10 }}>{l.n}</span>
                          {l.title}
                        </span>
                        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600, letterSpacing: '.1em', color: STATUS_COLOR[l.status], whiteSpace: 'nowrap' }}>
                          {l.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="map" style={{ marginBottom: 44 }}>
            <h2 id="map" style={{ fontSize: 28, fontWeight: 400, margin: '0 0 6px' }}>Where each idea stands</h2>
            <p style={{ fontSize: 16, color: 'var(--muted)', margin: '0 0 18px' }}>
              The highest level reached on any pathway. Levels move backward as well as forward, and none of it is a grade.
            </p>
            <div style={{ display: 'grid', gap: 7, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {concepts.map((c) => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', padding: '9px 0', borderBottom: '1px solid var(--rule-2)' }}>
                  <span style={{ fontSize: 16 }}>{c.name}</span>
                  <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ display: 'flex', gap: 3 }}>
                      {[1, 2, 3, 4, 5].map((k) => (
                        <span key={k} style={{ width: 16, height: 6, borderRadius: 2, background: k <= c.level ? 'var(--accent)' : 'var(--rule-2)' }} />
                      ))}
                    </span>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: 11.5, color: 'var(--muted)', width: 86, textAlign: 'right' }}>
                      {LEVELS[c.level]}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <section style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))' }}>
        {course.closing.map((c) => (
          <div key={c.label} style={{
            border: `1px solid ${c.tone === 'green' ? 'oklch(0.85 0.05 155)' : 'var(--field)'}`,
            background: c.tone === 'green' ? 'oklch(0.97 0.02 155)' : 'var(--paper)',
            borderRadius: 9, padding: '20px 22px'
          }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: c.tone === 'green' ? 'var(--green-text)' : 'var(--accent)' }}>
              {c.label}
            </span>
            <p style={{ margin: '11px 0 0', fontSize: 16.5, lineHeight: 1.55, textWrap: 'pretty' }}>{c.body}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
