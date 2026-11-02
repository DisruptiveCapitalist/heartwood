import FacultyBadge from '../FacultyBadge.jsx'
import { Rich } from '../../lib/rich.jsx'
import { COMPLETION, FEYNMAN_MIN_WORDS } from '../../content/schema.js'

// The learner explains it back, with the technical word taken away. What comes
// back is a checklist to hold their own answer against — self-assessment, not
// machine grading. See README, "What is deliberately not built".
export default function FeynmanIt({ lesson, course, progress, set }) {
  const f = lesson.feynman
  const text = progress.feynmanText ?? ''
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const usedBanned = (f.banned ?? []).some((stem) => new RegExp(stem, 'i').test(text))

  const note = usedBanned ? f.bannedNote : words > 24 ? 'good length' : words > 0 ? 'keep going' : ''

  // On Navigation the explanation is what completes the lesson, so a one-line
  // answer is turned away rather than quietly accepted. The guard is a floor on
  // effort, not a judgement of the words.
  const gated = course?.completeOn === COMPLETION.FEYNMAN
  const tooShort = gated && words < FEYNMAN_MIN_WORDS
  const submit = () => { if (!tooShort) set({ feynmanSubmitted: true }) }

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
            onClick={submit}
            disabled={tooShort}
            style={{ padding: '12px 22px' }}
          >
            I'M DONE — READ IT BACK
          </button>
        </div>
        {tooShort && words > 0 && (
          <p aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 14, margin: 0, color: 'var(--brake)' }}>
            A little more, please — at least two or three sentences, so it's a real explanation.
          </p>
        )}
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
          {gated && (
            <p style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, margin: '6px 0 0', color: 'var(--green-text)' }}>
              Lesson {lesson.number} now counts as complete.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
