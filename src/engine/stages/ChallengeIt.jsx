import FacultyBadge from '../FacultyBadge.jsx'
import { Rich } from '../../lib/rich.jsx'

// The Editor. Two questions: a prediction where *every* option gets a real,
// respectful verdict — the wrong answers are where the learning is, and none of
// them gets a buzzer — and then a harder open one behind a deliberate reveal.
export default function ChallengeIt({ lesson, progress, set }) {
  const c = lesson.challenge
  const picked = c.prediction.options.find((o) => o.id === progress.predict)

  return (
    <div className="hw-fade" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <FacultyBadge voice={c.voice} line={c.line} />

      <div style={{ maxWidth: 840, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 24, lineHeight: 1.4, fontWeight: 300, margin: 0, textWrap: 'pretty' }}>
          <Rich text={c.prediction.question} />
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {c.prediction.options.map((o) => {
            const on = progress.predict === o.id
            return (
              <button
                key={o.id}
                onClick={() => set({ predict: o.id })}
                aria-pressed={on}
                style={{
                  fontFamily: 'var(--serif)', textAlign: 'left', fontSize: 20, lineHeight: 1.4,
                  padding: '16px 20px', minHeight: 'var(--tap)', borderRadius: 'var(--r-md)',
                  background: on ? 'var(--accent-wash-2)' : 'var(--paper)',
                  border: `1px solid ${on ? 'var(--accent)' : 'var(--rule)'}`,
                  color: '#2f2921'
                }}
              >
                <Rich text={o.text} />
              </button>
            )
          })}
        </div>

        {picked && (
          <div className="hw-card hw-fade" style={{ padding: '20px 24px' }}>
            <p style={{ fontSize: 20, lineHeight: 1.55, margin: 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>
              <Rich text={picked.verdict} />
            </p>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 840, display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 6, borderTop: '1px solid var(--rule)' }}>
        <p style={{ fontSize: 24, lineHeight: 1.4, fontWeight: 300, margin: '18px 0 0', textWrap: 'pretty' }}>
          <Rich text={c.open.question} />
        </p>
        <textarea
          className="hw-field"
          aria-label="Your answer"
          value={progress.editorAnswer ?? ''}
          onChange={(e) => set({ editorAnswer: e.target.value })}
          placeholder={c.open.placeholder}
          style={{ fontSize: 19, lineHeight: 1.55, padding: '16px 18px', minHeight: 130 }}
        />
        <div>
          <button
            className="hw-btn"
            onClick={() => set({ editorRevealed: true })}
            aria-expanded={!!progress.editorRevealed}
            style={{
              fontWeight: 700, letterSpacing: '.12em', padding: '12px 22px',
              borderColor: 'var(--ink)',
              background: progress.editorRevealed ? 'var(--paper)' : 'var(--ink)',
              color: progress.editorRevealed ? 'var(--ink-3)' : '#f6f1e7'
            }}
          >
            SHOW ME WHAT YOU'D SAY
          </button>
        </div>

        {progress.editorRevealed && (
          <div className="hw-fade" style={{ padding: '22px 24px', borderLeft: '3px solid var(--editor)', background: 'var(--editor-wash)' }}>
            {c.open.reveal.map((para, i) => (
              <p key={i} style={{ fontSize: 20, lineHeight: 1.55, margin: i ? '16px 0 0' : 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>
                <Rich text={para} />
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
