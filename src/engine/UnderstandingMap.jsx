import { LEVELS } from '../content/schema.js'

// Not a score. No percentages, no totals — and concepts move backward as well
// as forward (brief §6).
export default function UnderstandingMap({ entries, title = 'UNDERSTANDING MAP', footer }) {
  return (
    <div className="hw-card" style={{ overflow: 'hidden', alignSelf: 'start' }}>
      <div style={{
        padding: '14px 20px', borderBottom: '1px solid var(--rule-2)', display: 'flex',
        alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap'
      }}>
        <span className="hw-label">{title}</span>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '.06em', color: 'var(--faint)' }}>
          {LEVELS.join(' → ')}
        </span>
      </div>

      {entries.map((m) => (
        <div
          key={m.name}
          style={{
            display: 'grid', gridTemplateColumns: 'minmax(120px,1fr) 150px', gap: 16,
            alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid var(--rule-3)'
          }}
        >
          <span style={{ fontSize: 19, color: m.level > 0 ? '#2f2921' : 'var(--faint)' }}>{m.name}</span>
          <span
            style={{ display: 'flex', gap: 5, justifyContent: 'flex-end' }}
            role="img"
            aria-label={m.level > 0 ? `${m.name}: ${LEVELS[m.level - 1]}` : `${m.name}: not yet encountered`}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                style={{
                  width: 20, height: 7, borderRadius: 2,
                  background: i < m.level ? (m.level >= 4 ? 'var(--green)' : 'var(--accent)') : 'var(--rule-2)'
                }}
              />
            ))}
          </span>
        </div>
      ))}

      {footer && (
        <div style={{ padding: '14px 20px', fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--label)' }}>
          {footer}
        </div>
      )}
    </div>
  )
}
