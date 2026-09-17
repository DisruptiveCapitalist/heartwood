import FacultyBadge from '../FacultyBadge.jsx'
import { Rich } from '../../lib/rich.jsx'

// Three sentences carry the mental model. The concept is named only after the
// learner already has it, and the vocabulary comes last of all.
export default function UnderstandIt({ lesson }) {
  const u = lesson.understand

  return (
    <div className="hw-fade" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <FacultyBadge voice={u.voice} line={u.line} />

      <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {u.sentences.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700, color: 'var(--accent)', paddingTop: 7, minWidth: 22 }}>
              {i + 1}
            </span>
            <p style={{ fontSize: 24, lineHeight: 1.45, fontWeight: 300, margin: 0, textWrap: 'pretty' }}>
              <Rich text={s} />
            </p>
          </div>
        ))}
      </div>

      <div className="hw-card" style={{ padding: '22px 24px', maxWidth: 760 }}>
        <span className="hw-label">{u.comparison.label}</span>
        <p style={{ fontSize: 20, lineHeight: 1.55, margin: '12px 0 0', color: 'var(--ink-2)', textWrap: 'pretty' }}>
          <Rich text={u.comparison.body} />
        </p>
      </div>

      <div style={{ padding: '20px 24px', borderLeft: '3px solid oklch(0.54 0.12 45)', background: 'var(--accent-wash)', maxWidth: 760 }}>
        <p style={{ fontSize: 20, lineHeight: 1.5, margin: 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>
          <Rich text={u.naming} />
        </p>
      </div>

      <div className="hw-card" style={{ maxWidth: 760, overflow: 'hidden' }}>
        <div style={{
          padding: '14px 22px', borderBottom: '1px solid var(--rule-2)', display: 'flex',
          alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap'
        }}>
          <span className="hw-label">THE FORMAL NAMES</span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--faint)' }}>
            so you recognize them when you hear them
          </span>
        </div>
        <dl style={{
          display: 'grid', gridTemplateColumns: 'minmax(150px, 220px) minmax(0, 1fr)',
          gap: '14px 22px', padding: '18px 22px', margin: 0
        }}>
          {u.formalNames.terms.map((t) => (
            <div key={t.term} style={{ display: 'contents' }}>
              <dt style={{ fontSize: 19, fontWeight: 600 }}>{t.term}</dt>
              <dd style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--ink-2)', margin: 0 }}>
                <Rich text={t.meaning} />
              </dd>
            </div>
          ))}
        </dl>
        {u.formalNames.note && (
          <div style={{
            padding: '14px 22px', borderTop: '1px solid var(--rule-2)', fontSize: 18,
            lineHeight: 1.5, color: 'var(--ink-4)', fontStyle: 'italic', textWrap: 'pretty'
          }}>
            <Rich text={u.formalNames.note} />
          </div>
        )}
      </div>
    </div>
  )
}
