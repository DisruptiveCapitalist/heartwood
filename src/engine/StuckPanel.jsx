import { ROUTE_IDS, ROUTE_LABELS } from '../content/schema.js'
import { Rich } from '../lib/rich.jsx'

// The most important interaction in the product (brief §8). Saying "I don't get
// it" never repeats the explanation — it offers six different ways in, and the
// panel stays open so the learner can try another.
export default function StuckPanel({ open, onToggle, routes, route, onRoute }) {
  const chosen = routes.find((r) => r.id === route)

  return (
    <>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '38px 0 0',
        marginTop: 34, borderTop: '1px solid var(--rule)', flexWrap: 'wrap'
      }}>
        <button
          onClick={onToggle}
          aria-expanded={open}
          style={{
            fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 600, letterSpacing: '.06em',
            padding: '13px 20px', minHeight: 'var(--tap)', borderRadius: 'var(--r-sm)',
            border: `1px dashed ${open ? 'var(--green)' : '#8f8271'}`,
            background: open ? 'var(--green-wash)' : 'transparent',
            color: open ? 'var(--green-deep)' : 'var(--ink-4)'
          }}
        >
          I don't get it
        </button>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--label)' }}>
          No shame in that sentence. It's the most useful one here.
        </span>
      </div>

      {open && (
        <div className="hw-fade" style={{
          marginTop: 22, border: '1px solid var(--green-edge-2)', borderRadius: 'var(--r-md)',
          background: 'var(--paper)', overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px 20px', background: 'var(--green-wash-2)',
            borderBottom: '1px solid var(--green-edge)', display: 'flex',
            alignItems: 'center', gap: 12, flexWrap: 'wrap'
          }}>
            <span style={{
              fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '.2em',
              padding: '5px 10px', borderRadius: 4, background: 'var(--green)', color: '#f6f1e7'
            }}>
              THE ROOMMATE
            </span>
            <span style={{ fontSize: 18, color: 'var(--ink-2)', fontStyle: 'italic' }}>
              Then we go a different way. Which door do you want?
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '16px 20px' }}>
            {ROUTE_IDS.map((id) => {
              const on = route === id
              return (
                <button
                  key={id}
                  onClick={() => onRoute(id)}
                  aria-pressed={on}
                  style={{
                    fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 600, letterSpacing: '.06em',
                    padding: '12px 18px', minHeight: 'var(--tap)', borderRadius: 'var(--r-sm)',
                    background: on ? 'var(--green)' : 'var(--paper)',
                    border: `1px solid ${on ? 'var(--green)' : 'var(--field)'}`,
                    color: on ? '#f6f1e7' : 'var(--ink-3)'
                  }}
                >
                  {ROUTE_LABELS[id]}
                </button>
              )
            })}
          </div>

          {chosen && (
            <div style={{ padding: '6px 20px 24px' }}>
              <p style={{ fontSize: 21, lineHeight: 1.55, maxWidth: 740, margin: 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>
                <Rich text={chosen.body} />
              </p>
            </div>
          )}
        </div>
      )}
    </>
  )
}
