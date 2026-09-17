import { FACULTY } from '../content/schema.js'
import { Rich } from '../lib/rich.jsx'

// Every stage opens the same way: who is speaking, then one line from them.
export default function FacultyBadge({ voice, line }) {
  const f = FACULTY[voice] ?? FACULTY.professor
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <span style={{
        fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '.2em',
        padding: '5px 10px', borderRadius: 4, background: f.bg, color: f.fg, whiteSpace: 'nowrap'
      }}>
        {f.label}
      </span>
      {line && (
        <span style={{ fontSize: 18, color: 'var(--ink-4)', fontStyle: 'italic' }}>
          <Rich text={line} />
        </span>
      )}
    </div>
  )
}
