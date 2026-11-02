import FacultyBadge from '../FacultyBadge.jsx'
import UnderstandingMap from '../UnderstandingMap.jsx'
import { Rich } from '../../lib/rich.jsx'
import { COMPLETION } from '../../content/schema.js'

export default function Reflect({ lesson, course, progress, set, goStage }) {
  const r = lesson.reflect
  const written = (progress.journalText ?? '').trim().length > 0

  return (
    <div className="hw-fade" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <FacultyBadge voice={r.voice} line={r.line} />

      <div style={{ maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label htmlFor="hw-journal" style={{ fontSize: 24, lineHeight: 1.4, fontWeight: 300, margin: 0, textWrap: 'pretty' }}>
          <Rich text={r.prompt} />
        </label>
        <textarea
          id="hw-journal"
          className="hw-field"
          value={progress.journalText ?? ''}
          onChange={(e) => set({ journalText: e.target.value })}
          placeholder={r.placeholder}
          style={{ fontSize: 20, lineHeight: 1.55, padding: '18px 20px', minHeight: 150 }}
        />
        <span aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--label)' }}>
          {written ? 'Saved to your journal — it will be here tomorrow.' : 'Saves itself as you type.'}
        </span>
      </div>

      <div style={{ maxWidth: 800 }}>
        <UnderstandingMap
          entries={lesson.map}
          title={`UNDERSTANDING MAP · ${course.title.toUpperCase()}`}
          footer={r.mapFooter}
        />
      </div>

      {course?.completeOn === COMPLETION.FEYNMAN && (
        // The learner asked for this: everything stays open, but a lesson is
        // not "done" until the explanation exists. The banner says so plainly
        // rather than hiding the rule inside a disabled button.
        <div style={{
          maxWidth: 800, padding: '18px 22px', borderRadius: 'var(--r-md)',
          background: progress.feynmanSubmitted ? 'oklch(0.97 0.02 155)' : 'var(--paper)',
          border: `1px solid ${progress.feynmanSubmitted ? 'oklch(0.85 0.05 155)' : 'var(--rule-2)'}`,
          display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--ink-2)', flex: 1, minWidth: 260, textWrap: 'pretty' }}>
            {progress.feynmanSubmitted
              ? `Lesson ${lesson.number} is complete. Your explanation is saved with it.`
              : `Everything here is open, but the lesson counts as done once you've written your explanation in FEYNMAN IT.`}
          </span>
          {!progress.feynmanSubmitted && goStage && (
            <button className="hw-btn" onClick={() => goStage(3)} style={{ padding: '12px 18px' }}>
              GO TO FEYNMAN IT
            </button>
          )}
        </div>
      )}

      <div style={{
        maxWidth: 800, padding: '22px 24px', background: 'var(--accent-wash)',
        border: '1px solid var(--accent-edge-2)', borderRadius: 'var(--r-md)'
      }}>
        <p style={{ fontSize: 20, lineHeight: 1.55, margin: 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>
          <Rich text={r.tomorrow} />
        </p>
      </div>
    </div>
  )
}
