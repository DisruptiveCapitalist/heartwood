import FacultyBadge from '../FacultyBadge.jsx'
import { Rich } from '../../lib/rich.jsx'

// "Where else have you seen this?" Multi-select, plus one of the learner's own.
export default function ConnectIt({ lesson, progress, set }) {
  const c = lesson.connect
  const connects = progress.connects ?? {}
  const selected = Object.values(connects).filter(Boolean).length
  const enough = selected >= 2 || (progress.connectOwn ?? '').trim().length > 12

  const toggle = (i) => set({ connects: { ...connects, [i]: !connects[i] } })

  return (
    <div className="hw-fade" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <FacultyBadge voice={c.voice} line={c.line} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, maxWidth: 900 }}>
        {c.items.map((text, i) => {
          const on = !!connects[i]
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              aria-pressed={on}
              style={{
                fontFamily: 'var(--serif)', textAlign: 'left', fontSize: 19, lineHeight: 1.4,
                padding: '16px 18px', minHeight: 'var(--tap)', borderRadius: 'var(--r-md)',
                background: on ? 'var(--green-wash)' : 'var(--paper)',
                border: `1px solid ${on ? 'var(--green)' : 'var(--rule)'}`,
                color: '#2f2921'
              }}
            >
              <Rich text={text} />
            </button>
          )
        })}
      </div>

      {c.builder && (
        <div className="hw-card" style={{ maxWidth: 800, padding: '22px 24px' }}>
          <span style={{
            fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '.2em',
            padding: '5px 10px', borderRadius: 4, background: 'var(--builder)', color: '#f6f1e7'
          }}>
            THE BUILDER
          </span>
          <p style={{ fontSize: 20, lineHeight: 1.55, margin: '14px 0 0', color: 'var(--ink-2)', textWrap: 'pretty' }}>
            <Rich text={c.builder.body} />
          </p>
        </div>
      )}

      <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 9 }}>
        <label className="hw-label" htmlFor="hw-connect-own">ONE OF YOUR OWN</label>
        <textarea
          id="hw-connect-own"
          className="hw-field"
          value={progress.connectOwn ?? ''}
          onChange={(e) => set({ connectOwn: e.target.value })}
          placeholder={c.ownPlaceholder}
          style={{ fontSize: 19, lineHeight: 1.5, padding: '14px 16px', minHeight: 96 }}
        />
      </div>

      {enough && (
        <p className="hw-fade" style={{ fontSize: 20, lineHeight: 1.5, maxWidth: 700, margin: 0, color: 'var(--ink-2)', fontStyle: 'italic', textWrap: 'pretty' }}>
          <Rich text={c.synthesis} />
        </p>
      )}
    </div>
  )
}
