import FacultyBadge from '../FacultyBadge.jsx'
import { Rich } from '../../lib/rich.jsx'

// The learner explains it back, with the technical word taken away. What comes
// back is a checklist to hold their own answer against — self-assessment, not
// machine grading. See README, "What is deliberately not built".
export default function FeynmanIt({ lesson, progress, set }) {
  const f = lesson.feynman
  const text = progress.feynmanText ?? ''
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const usedBanned = f.banned.some((stem) => new RegExp(stem, 'i').test(text))

  const note = usedBanned ? f.bannedNote : words > 24 ? 'good length' : words > 0 ? 'keep going' : ''

  return (
    <div className="hw-fade" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <FacultyBadge voice="feynman" line={f.line} />

      <p style={{ fontSize: 26, lineHeight: 1.35, fontWeight: 300, maxWidth: 760, margin: 0, textWrap: 'pretty' }}>
        <Rich text={f.instruction} />
      </p>

      <div style={{ maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <textarea
          className="hw-field"
          aria-label="Your explanation"
          value={text}
          onChange={(e) => set({ feynmanText: e.target.value })}
          placeholder={f.placeholder}
          style={{ fontSize: 20, lineHeight: 1.55, padding: '18px 20px', minHeight: 190 }}
        />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--sans)',
          fontSize: 12.5, color: 'var(--label)', flexWrap: 'wrap'
        }}>
          <span>{words} words</span>
          <span aria-live="polite" style={{ color: usedBanned ? 'var(--brake)' : 'var(--label)' }}>{note}</span>
          <span style={{ flex: 1 }} />
          <button
            className="hw-btn hw-btn-solid"
            onClick={() => set({ feynmanSubmitted: true })}
            style={{ padding: '12px 22px' }}
          >
            I'M DONE — READ IT BACK
          </button>
        </div>
      </div>

      {progress.feynmanSubmitted && (
        <div className="hw-card hw-fade" style={{ maxWidth: 800, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className="hw-label">WHAT A GOOD EXPLANATION CONTAINS — CHECK YOUR OWN</span>
          {f.checks.map((text, i) => (
            <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
              <span aria-hidden="true" style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--green)', paddingTop: 3 }}>✓</span>
              <span style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--ink-2)' }}><Rich text={text} /></span>
            </div>
          ))}
          <p style={{ fontSize: 19, lineHeight: 1.55, margin: '6px 0 0', color: 'var(--ink-4)', fontStyle: 'italic', textWrap: 'pretty' }}>
            <Rich text={f.closing} />
          </p>
        </div>
      )}
    </div>
  )
}
