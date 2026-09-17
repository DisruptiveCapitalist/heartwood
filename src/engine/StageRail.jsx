import { STAGES } from '../content/schema.js'

// The only navigation in a lesson. Stages are freely clickable in any order —
// nothing is ever locked.
export default function StageRail({ stage, visited, onGo, sessionMinutes = 30, showTimings = true }) {
  return (
    <nav
      aria-label="Lesson stages"
      style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 0 22px', borderBottom: '1px solid var(--rule)' }}
    >
      {STAGES.map((s, i) => {
        const current = i === stage
        const done = visited[s.key] && !current
        const meta = showTimings
          ? `${sessionMinutes >= 30 ? s.m30 : s.m20} min`
          : done ? 'visited' : current ? 'now' : '—'
        return (
          <button
            key={s.key}
            onClick={() => onGo(i)}
            aria-current={current ? 'step' : undefined}
            style={{
              fontFamily: 'var(--sans)', display: 'flex', flexDirection: 'column', gap: 3,
              alignItems: 'flex-start', padding: '9px 14px', borderRadius: 'var(--r-sm)',
              background: current ? 'var(--ink)' : done ? 'var(--paper)' : 'transparent',
              color: current ? '#f6f1e7' : done ? 'var(--ink-2)' : 'var(--label)',
              border: `1px solid ${current ? 'var(--ink)' : done ? '#cdc0ab' : '#ded4c2'}`
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.13em' }}>{s.label}</span>
            <span style={{ fontSize: 10.5, letterSpacing: '.06em', opacity: .72 }}>{meta}</span>
          </button>
        )
      })}
    </nav>
  )
}
