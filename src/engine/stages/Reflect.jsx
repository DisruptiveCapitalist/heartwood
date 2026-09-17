import FacultyBadge from '../FacultyBadge.jsx'
import UnderstandingMap from '../UnderstandingMap.jsx'
import { Rich } from '../../lib/rich.jsx'

export default function Reflect({ lesson, course, progress, set }) {
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
