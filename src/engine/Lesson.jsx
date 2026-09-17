import { useEffect, useMemo, useRef, useState } from 'react'
import { STAGES } from '../content/schema.js'
import { readProgress, writeProgress } from '../lib/progress.js'
import { Rich } from '../lib/rich.jsx'
import StageRail from './StageRail.jsx'
import StuckPanel from './StuckPanel.jsx'
import SeeIt from './stages/SeeIt.jsx'
import UnderstandIt from './stages/UnderstandIt.jsx'
import ConnectIt from './stages/ConnectIt.jsx'
import FeynmanIt from './stages/FeynmanIt.jsx'
import ChallengeIt from './stages/ChallengeIt.jsx'
import Reflect from './stages/Reflect.jsx'

// One component renders every lesson in every subject. Everything that differs
// between lessons is in the content object.

const STAGE_COMPONENTS = [SeeIt, UnderstandIt, ConnectIt, FeynmanIt, ChallengeIt, Reflect]

export default function Lesson({ course, lesson, onHome, sessionMinutes = 30, showTimings = true }) {
  const [progress, setProgress] = useState(() => readProgress(course.id, lesson.id))
  const [stuckOpen, setStuckOpen] = useState(false)
  const [route, setRoute] = useState(null)
  const topRef = useRef(null)

  // Reloading a different lesson without remounting.
  useEffect(() => {
    setProgress(readProgress(course.id, lesson.id))
    setStuckOpen(false)
    setRoute(null)
  }, [course.id, lesson.id])

  // Everything the learner types is saved as it is typed.
  const set = (patch) => {
    setProgress((prev) => {
      const next = { ...prev, ...patch }
      writeProgress(course.id, lesson.id, next)
      return next
    })
  }

  const goStage = (i) => {
    const stage = Math.max(0, Math.min(STAGES.length - 1, i))
    setRoute(null)
    set({ stage, visited: { ...progress.visited, [STAGES[stage].key]: true } })
    topRef.current?.scrollIntoView({ block: 'start', behavior: 'auto' })
  }

  const week = useMemo(() => course.weeks[lesson.week - 1], [course, lesson.week])
  const Stage = STAGE_COMPONENTS[progress.stage] ?? SeeIt
  const nextLabel = progress.stage >= STAGES.length - 1
    ? 'FINISH FOR TODAY'
    : `NEXT · ${STAGES[progress.stage + 1].label}`

  return (
    <div ref={topRef} className="hw-shell" style={{ paddingBottom: 80 }}>
      <header style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24,
        padding: '26px 0 18px', borderBottom: '1px solid var(--rule)', flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.22em', color: 'var(--accent)' }}>
            HEARTWOOD UNIVERSITY
          </span>
          <span style={{ fontSize: 21, fontWeight: 400, letterSpacing: '-.01em' }}>
            {course.title} — {course.subtitle}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)', flexWrap: 'wrap' }}>
          <a href="#/" onClick={(e) => { e.preventDefault(); onHome() }}>← {course.title}</a>
          <span>Week {lesson.week} of {course.weeks.length} · Lesson {lesson.number} of {week.lessons.length}</span>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }} aria-hidden="true">
            {week.lessons.map((_, i) => (
              <span key={i} style={{
                width: 9, height: 9, borderRadius: '50%',
                background: i < lesson.number ? 'var(--accent)' : 'transparent',
                border: `1px solid ${i < lesson.number ? 'var(--accent)' : '#cdc0ab'}`
              }} />
            ))}
          </span>
        </div>
      </header>

      <div style={{ padding: '42px 0 30px', maxWidth: 800 }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.2em', color: 'var(--label)' }}>
          LESSON {lesson.number} · {week.title.toUpperCase()}
        </span>
        <h1 style={{ fontSize: 46, lineHeight: 1.08, fontWeight: 400, letterSpacing: '-.02em', margin: '14px 0 0', textWrap: 'pretty' }}>
          <Rich text={lesson.title} />
        </h1>
        <p style={{ fontSize: 23, lineHeight: 1.45, fontWeight: 300, fontStyle: 'italic', color: 'var(--ink-3)', margin: '20px 0 0', textWrap: 'pretty' }}>
          <Rich text={lesson.openingQuestion} />
        </p>
      </div>

      <StageRail
        stage={progress.stage}
        visited={progress.visited}
        onGo={goStage}
        sessionMinutes={sessionMinutes}
        showTimings={showTimings}
      />

      <main style={{ padding: '34px 0 0' }}>
        <Stage
          key={progress.stage}
          lesson={lesson}
          course={course}
          progress={progress}
          set={set}
          active={progress.stage === 0}
        />
      </main>

      <StuckPanel
        open={stuckOpen}
        onToggle={() => setStuckOpen((o) => !o)}
        routes={lesson.routes}
        route={route}
        onRoute={setRoute}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '26px 0 0', flexWrap: 'wrap' }}>
        <span style={{ flex: 1 }} />
        <button className="hw-btn" onClick={() => goStage(progress.stage - 1)} disabled={progress.stage === 0}>
          BACK
        </button>
        <button
          className="hw-btn hw-btn-solid"
          style={{ padding: '13px 26px' }}
          onClick={() => (progress.stage >= STAGES.length - 1 ? onHome() : goStage(progress.stage + 1))}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
