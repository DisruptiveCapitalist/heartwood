import FacultyBadge from '../FacultyBadge.jsx'
import { Rich } from '../../lib/rich.jsx'
import AcrossCultures from '../AcrossCultures.jsx'
import { closesItems } from '../../content/schema.js'

// "Where else have you seen this?" Multi-select, plus one of the learner's own.
//
// Where the synthesis line sits is a per-course decision, because the stage is
// not the same shape in every course.
//
// In Navigation the line is a comment on the six items and an Across Cultures
// card stands between them and the foot of the stage, so a learner reading
// downward met a paragraph from another century before the sentence that
// answered the list. Design asked for the move after reading the exports.
//
// The other three courses have no Across Cultures card — only the Builder
// activity — and the original engine handoff describes the stage as items,
// Builder, then one of your own, with the line appearing last. They keep that
// order until someone asks otherwise, so this is one markup block rendered in
// one of two places rather than two copies that can drift apart. Which course
// gets which placement lives in the schema, because the exporter has to tell
// the handbook writer the same thing.
//
// Either way it appears only once the learner has engaged: two items ticked, or
// one of their own written. Design's note said "ticked two"; the typed-own path
// is kept because writing your own is the same thinking, and dropping it would
// hide the line from a learner who answers that way.

export default function ConnectIt({ course, lesson, progress, set }) {
  const c = lesson.connect
  const connects = progress.connects ?? {}
  const selected = Object.values(connects).filter(Boolean).length
  const enough = selected >= 2 || (progress.connectOwn ?? '').trim().length > 12
  const underItems = closesItems(course?.id)

  const toggle = (i) => set({ connects: { ...connects, [i]: !connects[i] } })

  const synthesis = enough ? (
    <p className="hw-fade" style={{ fontSize: 20, lineHeight: 1.5, maxWidth: 700, margin: 0, color: 'var(--ink-2)', fontStyle: 'italic', textWrap: 'pretty' }}>
      <Rich text={c.synthesis} />
    </p>
  ) : null

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

      {underItems && synthesis}

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

      {c.acrossCultures && <AcrossCultures card={c.acrossCultures} />}

      {!underItems && synthesis}

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
    </div>
  )
}
