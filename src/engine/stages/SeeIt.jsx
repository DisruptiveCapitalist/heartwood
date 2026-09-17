import FacultyBadge from '../FacultyBadge.jsx'
import { getSimulation } from '../simulations/index.js'
import { Rich } from '../../lib/rich.jsx'

// A real situation and a live scene. No definitions, no terminology — the
// learner manipulates it and notices something before being told anything.
export default function SeeIt({ lesson, active }) {
  const see = lesson.see
  const Simulation = getSimulation(see.simulation.id)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <FacultyBadge voice={see.voice} line={see.line} />

      {Simulation
        ? <Simulation active={active} {...(see.simulation.props ?? {})} />
        : (
          <div className="hw-card" style={{ padding: '22px 24px' }}>
            <p style={{ margin: 0, fontSize: 19, color: 'var(--ink-2)' }}>
              This lesson asks for a simulation called “{see.simulation.id}”, which has not been
              built yet. Register it in <code>src/engine/simulations/index.js</code>.
            </p>
          </div>
        )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
        {see.observations.map((o, i) => (
          <div
            key={i}
            style={{
              padding: '18px 20px', borderRadius: 'var(--r-md)',
              background: o.emphasis ? 'var(--accent-wash-2)' : 'var(--paper)',
              border: `1px solid ${o.emphasis ? 'var(--accent-edge)' : 'var(--rule)'}`
            }}
          >
            <p style={{ fontSize: 19, lineHeight: 1.55, margin: 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>
              <Rich text={o.text} />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
