import { useMemo } from 'react'
import { openCourses, comingClass } from '../content/index.js'
import { readProgress, courseProgress } from '../lib/progress.js'
import { readAlgebra, readPathChoice, algebraProgress } from '../lib/algebra.js'
import { useLearner } from '../lib/learner.jsx'

// The way in. One card per class, and a dashed one for the class being written.
//
// The original brief said not to build a catalog until the method was proven.
// It is proven, so this exists now — but it keeps the same promise the rest of
// the app makes: no percentages, no scores, no badges. The strip of thirty
// segments says how much of a class has been walked, and nothing else.

const STATUS_COLOR = {
  'NOT STARTED': 'var(--label)',
  'IN PROGRESS': 'var(--accent)',
  COMPLETE: 'var(--green-text)'
}

function greeting(name) {
  const h = new Date().getHours()
  const part = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  return name ? `${part}, ${name}.` : `${part}.`
}

function ClassCard({ course, index, onOpen }) {
  // The Algebra Companion keeps one record per lesson AND pathway, so its
  // progress cannot be read the generic way. The card shows the pathway the
  // learner last chose, defaulting to the student's.
  const p = useMemo(() => {
    if (course.kind === 'algebra') {
      const cache = {}
      const of = (n, path) => (cache[`${n}.${path}`] ??= readAlgebra(n, path))
      return algebraProgress(readPathChoice() ?? 'learn', of)
    }
    const cache = {}
    const of = (lessonId) => (cache[lessonId] ??= readProgress(course.id, lessonId))
    return courseProgress(course, of)
  }, [course])
  const kicker = `CLASS ${index}${course.after ? ` · AFTER ${course.after.toUpperCase()}` : ''}`

  return (
    <button
      onClick={() => onOpen(course.id)}
      className="hw-class-card"
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        textAlign: 'left', minHeight: 320, padding: 0,
        background: 'var(--paper)', border: '1px solid var(--field)', borderRadius: 9
      }}
    >
      <span style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px 26px 0' }}>
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.2em', color: 'var(--accent)' }}>
            {kicker}
          </span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600, letterSpacing: '.1em', color: STATUS_COLOR[p.status], whiteSpace: 'nowrap' }}>
            {p.status}
          </span>
        </span>
        <span style={{ fontSize: 32, fontWeight: 400, lineHeight: 1.1 }}>{course.title}</span>
        <span style={{ fontSize: 20, fontStyle: 'italic', color: 'var(--ink-3)' }}>{course.subtitle}</span>
        <span style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--ink-4)', textWrap: 'pretty' }}>{course.blurb}</span>
      </span>

      <span style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '20px 26px 22px' }}>
        <span
          style={{ display: 'flex', gap: 3 }}
          role="img"
          aria-label={`${p.done} of ${p.total} lessons finished; ${p.built} written so far.`}
        >
          {Array.from({ length: p.total }, (_, i) => (
            <span
              key={i}
              style={{
                flex: 1, height: 6, borderRadius: 1,
                background: i < p.done ? 'var(--green)' : i < p.built ? '#cdc0ab' : '#ebe3d4'
              }}
            />
          ))}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
            {p.done} of {p.total} lessons · {course.weeks.length} weeks
          </span>
          <span style={{
            fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 700, letterSpacing: '.12em',
            padding: '12px 18px', background: 'var(--ink)', color: '#f6f1e7', borderRadius: 5
          }}>
            {p.started ? 'CONTINUE' : 'OPEN CLASS'}
          </span>
        </span>
      </span>
    </button>
  )
}

export default function Catalog({ onOpenCourse }) {
  const { name } = useLearner()

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

      <div style={{ padding: '52px 0 38px' }}>
        <h1 style={{ fontSize: 52, lineHeight: 1.05, fontWeight: 400, letterSpacing: '-.02em', margin: 0 }}>
          {greeting(name)}
        </h1>
        <p style={{ fontSize: 24, fontWeight: 300, fontStyle: 'italic', color: 'var(--ink-3)', margin: '14px 0 0' }}>
          Your classes. Pick one up where you left it, or start something new.
        </p>
      </div>

      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16,
        paddingBottom: 18, borderBottom: '1px solid var(--rule)', flexWrap: 'wrap'
      }}>
        <h2 style={{ fontSize: 28, fontWeight: 400, margin: 0 }}>Classes</h2>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {openCourses.length} open{comingClass ? ' · 1 on the way' : ''}
        </span>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
        gap: 22, paddingTop: 26
      }}>
        {openCourses.map((course, i) => (
          <ClassCard key={course.id} course={course} index={i + 1} onOpen={onOpenCourse} />
        ))}

        {comingClass && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 10, minHeight: 320,
            padding: '24px 26px', background: 'transparent',
            border: '1px dashed #b9ab94', borderRadius: 9
          }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.2em', color: 'var(--muted)' }}>
              CLASS {openCourses.length + 1} · COMING
            </span>
            <span style={{ fontSize: 32, fontWeight: 400, lineHeight: 1.1, color: 'var(--ink-4)' }}>
              {comingClass.title}
            </span>
            <span style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--ink-4)', textWrap: 'pretty' }}>
              {comingClass.blurb}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
