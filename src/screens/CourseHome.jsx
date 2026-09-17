import { useMemo } from 'react'
import { Rich } from '../lib/rich.jsx'
import { useLearner } from '../lib/learner.jsx'
import { journalText, download } from '../lib/storage.js'
import { readProgress, todayCard, weekRows, courseMap, journalEntries } from '../lib/progress.js'
import UnderstandingMap from '../engine/UnderstandingMap.jsx'

// The place the learner lands every day. It answers one question — what am I
// doing today? — and then gets out of the way. A journey, not a dashboard: no
// percentages, no streaks, no scores, no badges.

const STATUS_STYLE = {
  COMPLETE: { bg: 'oklch(0.97 0.02 155)', bd: 'var(--green-edge)', fg: 'var(--green-text)' },
  'IN PROGRESS': { bg: 'var(--paper)', bd: 'var(--rule)', fg: 'var(--accent)' },
  READY: { bg: 'var(--paper)', bd: 'var(--rule)', fg: 'var(--muted)' },
  'NOT YET WRITTEN': { bg: 'transparent', bd: 'var(--inert)', fg: 'var(--faint)' }
}

export default function CourseHome({ course, onOpenLesson, sessionMinutes = 30 }) {
  const { name, setName } = useLearner()
  const progressOf = useMemo(() => {
    const cache = {}
    return (lessonId) => (cache[lessonId] ??= readProgress(course.id, lessonId))
  }, [course.id])

  const today = todayCard(course, progressOf, sessionMinutes)
  const weeks = weekRows(course, progressOf)
  const map = courseMap(course, progressOf)
  const entries = journalEntries(course, progressOf)
  const lastNote = entries.length ? entries[entries.length - 1].text : ''

  return (
    <div className="hw-shell" style={{ paddingBottom: 80 }}>
      <header style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24,
        padding: '26px 0 18px', borderBottom: '1px solid var(--rule)', flexWrap: 'wrap'
      }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.22em', color: 'var(--accent)' }}>
          HEARTWOOD UNIVERSITY
        </span>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Learn the heart of a subject. See it in the world.
        </span>
      </header>

      <div style={{ padding: '46px 0 30px' }}>
        <h1 style={{ fontSize: 50, lineHeight: 1.06, fontWeight: 400, letterSpacing: '-.02em', margin: 0 }}>
          {course.title}
        </h1>
        <p style={{ fontSize: 26, fontWeight: 300, fontStyle: 'italic', color: 'var(--ink-3)', margin: '10px 0 0' }}>
          {course.subtitle}
        </p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)', margin: '18px 0 0' }}>
          {course.meta}
        </p>
      </div>

      {/* Today — the only emphasised thing on the page. */}
      <section style={{ border: '1px solid #cdc0ab', borderRadius: 9, background: 'var(--paper)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 28, padding: '26px 28px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 380px', minWidth: 0 }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: 'var(--accent)' }}>
              {today.kicker}
            </span>
            <h2 style={{ fontSize: 34, fontWeight: 400, lineHeight: 1.15, margin: '12px 0 0', textWrap: 'pretty' }}>
              <Rich text={today.title} />
            </h2>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--ink-2)', margin: '14px 0 0', textWrap: 'pretty' }}>
              <Rich text={today.blurb} />
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <button
              className="hw-btn hw-btn-solid"
              style={{ fontSize: 13, padding: '16px 30px' }}
              onClick={() => onOpenLesson(today.lessonId)}
            >
              {today.cta}
            </button>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--muted)' }}>{today.meta}</span>
          </div>
        </div>

        {lastNote && (
          <div style={{ background: 'var(--paper-alt)', borderTop: '1px solid var(--rule)', padding: '16px 28px' }}>
            <span className="hw-label">LAST TIME YOU WROTE</span>
            <p style={{ fontSize: 19, lineHeight: 1.55, fontStyle: 'italic', color: 'var(--ink-2)', margin: '8px 0 0', textWrap: 'pretty' }}>
              “{lastNote}”
            </p>
          </div>
        )}
      </section>

      {/* The journey */}
      <section style={{ padding: '48px 0 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: 28, fontWeight: 400, margin: 0 }}>The six-week journey</h2>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
            Heartwood does not rush. Two days for one idea is allowed.
          </span>
        </div>

        <div style={{ marginTop: 18 }}>
          {weeks.map((w) => (
            <div
              key={w.number}
              className="hw-week"
            >
              <div>
                <span style={{
                  fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em',
                  color: w.active ? 'var(--accent)' : 'var(--faint)'
                }}>
                  WEEK {w.number}
                </span>
                <h3 style={{ fontSize: 24, fontWeight: 400, margin: '8px 0 0', color: w.active ? 'var(--ink)' : 'var(--muted)' }}>
                  {w.title}
                </h3>
                <p style={{ fontSize: 18, fontStyle: 'italic', color: 'var(--muted)', margin: '8px 0 0', textWrap: 'pretty' }}>
                  {w.idea}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {w.lessons.map((l) => {
                  const s = STATUS_STYLE[l.status]
                  const inner = (
                    <>
                      <span style={{
                        fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em',
                        color: l.built ? 'var(--accent)' : 'var(--muted)', minWidth: 74
                      }}>
                        LESSON {l.number}
                      </span>
                      <span style={{ fontSize: 19, flex: 1, color: l.built ? '#2f2921' : 'var(--ink-4)', textWrap: 'pretty' }}>
                        <Rich text={l.title} />
                      </span>
                      <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: s.fg, whiteSpace: 'nowrap' }}>
                        {l.status}
                      </span>
                    </>
                  )
                  const style = {
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                    minHeight: 'var(--tap)', borderRadius: 'var(--r-md)',
                    background: s.bg, border: `1px solid ${s.bd}`, textAlign: 'left', width: '100%'
                  }
                  return l.built ? (
                    <button key={l.number} style={style} onClick={() => onOpenLesson(l.lessonId)}>{inner}</button>
                  ) : (
                    <div key={l.number} style={style}>{inner}</div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map and journal */}
      <section style={{
        padding: '48px 0 0', display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: 26, alignItems: 'start'
      }}>
        <UnderstandingMap
          entries={map}
          title={`UNDERSTANDING MAP · ${course.title.toUpperCase()}`}
          footer="Concepts move backward as well as forward. Nothing here is a grade."
        />

        <div className="hw-card" style={{ overflow: 'hidden', alignSelf: 'start' }}>
          <div style={{
            padding: '14px 20px', borderBottom: '1px solid var(--rule-2)', display: 'flex',
            alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap'
          }}>
            <span className="hw-label">THE JOURNAL</span>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '.06em', color: 'var(--faint)' }}>
              {entries.length === 1 ? '1 entry' : `${entries.length} entries`}
            </span>
          </div>

          {entries.length === 0 ? (
            <div style={{ padding: '18px 20px' }}>
              <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--muted)', margin: '0 0 14px' }}>
                Nothing written yet. When you get there, these are the ways in:
              </p>
              {course.journalPrompts.map((p) => (
                <p key={p} style={{ fontSize: 19, lineHeight: 1.5, fontStyle: 'italic', color: 'var(--ink-4)', margin: '0 0 8px' }}>
                  {p}
                </p>
              ))}
            </div>
          ) : (
            <>
              {entries.map((e) => (
                <div key={e.lessonId} style={{ padding: '16px 20px', borderBottom: '1px solid var(--rule-3)' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: 'var(--label)' }}>
                    {e.label}
                  </span>
                  <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)', margin: '8px 0 0', textWrap: 'pretty' }}>
                    {e.text}
                  </p>
                </div>
              ))}
              <div style={{ padding: '14px 20px' }}>
                <button
                  className="hw-btn"
                  onClick={() => download(
                    `heartwood-journal-${course.id}.txt`,
                    journalText(course, entries)
                  )}
                >
                  KEEP A COPY
                </button>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--muted)', margin: '10px 0 0' }}>
                  Saves a plain text file. Your writing lives in this browser — a copy outside it
                  is worth having.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Quiet, and at the bottom, because it is a preference rather than a
          part of the course. Blank is the right default: it is what anyone this
          course is shared with should see. */}
      <section style={{ padding: '48px 0 0' }}>
        <div className="hw-card" style={{ padding: '18px 22px', display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <label htmlFor="hw-learner-name" className="hw-label" style={{ whiteSpace: 'nowrap' }}>
            WHAT THE FACULTY CALL YOU
          </label>
          <input
            id="hw-learner-name"
            className="hw-field"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="a first name, or leave it blank"
            style={{ fontSize: 19, padding: '12px 14px', minHeight: 'var(--tap)', width: 260, maxWidth: '100%' }}
          />
          <span style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)', flex: '1 1 240px', lineHeight: 1.5 }}>
            Saved for this browser only. Left blank, the lessons read neutrally —
            which is what someone you share this with will see.
          </span>
        </div>
      </section>

      <section style={{ padding: '48px 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
        {course.closing.map((c) => (
          <div
            key={c.label}
            style={{
              padding: '20px 22px', borderRadius: 'var(--r-md)',
              background: c.tone === 'green' ? 'var(--green-wash-2)' : 'var(--paper)',
              border: `1px solid ${c.tone === 'green' ? 'var(--green-edge)' : 'var(--rule)'}`
            }}
          >
            <span className="hw-label" style={{ color: c.tone === 'green' ? 'var(--green-deep)' : 'var(--label)' }}>
              {c.label}
            </span>
            <p style={{ fontSize: 19, lineHeight: 1.55, margin: '12px 0 0', color: 'var(--ink-2)', textWrap: 'pretty' }}>
              <Rich text={c.body} />
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
