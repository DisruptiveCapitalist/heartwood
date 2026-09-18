import { useState } from 'react'

// Lesson 6. You are standing on a bathroom scale, and the scale is in a lift.
//
// The question the lesson opens with — "you are sitting still, are there forces
// on you?" — is hard to answer honestly while nothing is moving, because two
// forces that cancel look exactly like no forces at all. The lift separates
// them. Gravity never changes. The floor's push does, and the scale reports it.
//
// Nothing is animated here on a clock: the learner picks a state and reads it.
// That is deliberate. The thing to notice is a comparison, not a motion.

const STATES = [
  { id: 'still',  label: 'Standing still',     a: 0,     note: 'The floor pushes up exactly as hard as gravity pulls down. Nothing changes — which is Lesson 1, not an absence of forces.' },
  { id: 'up',     label: 'Lift starts upward', a: 0.25,  note: 'To start you moving upward, the floor has to push harder than gravity pulls. You feel it in your knees.' },
  { id: 'down',   label: 'Lift starts downward', a: -0.25, note: 'Now the floor eases off. Gravity wins by a little, and you feel briefly lighter.' },
  { id: 'fall',   label: 'The cable snaps',    a: -1,    note: 'The floor has stopped pushing altogether. The scale reads zero — and so would you, falling alongside it. This is what "weightless" actually means.' }
]

export default function ElevatorScale() {
  const [weight, setWeight] = useState(170)
  const [state, setState] = useState(STATES[0])

  const reading = Math.round(weight * (1 + state.a))
  const gravityArrow = 74                                   // never changes
  const supportArrow = Math.max(0, 74 * (1 + state.a))

  const readingColor = state.a > 0 ? 'var(--warn)' : state.a < 0 ? 'var(--builder)' : 'var(--ink)'

  const Arrow = ({ up, height, label, color, left }) => (
    <div style={{ position: 'absolute', left, bottom: up ? 96 : 96, height, width: 0 }}>
      <div style={{
        position: 'absolute', left: -2, bottom: up ? 0 : -height, width: 4, height,
        background: color, opacity: height < 2 ? 0 : 1
      }} />
      <div style={{
        position: 'absolute', left: -7,
        bottom: up ? height - 2 : -height - 8,
        width: 0, height: 0,
        borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
        [up ? 'borderBottom' : 'borderTop']: `10px solid ${color}`,
        opacity: height < 2 ? 0 : 1
      }} />
      <span style={{
        position: 'absolute', left: 12, bottom: up ? height / 2 : -height / 2,
        whiteSpace: 'nowrap', fontFamily: 'var(--sans)', fontSize: 11,
        fontWeight: 700, letterSpacing: '.1em', color
      }}>
        {label}
      </span>
    </div>
  )

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">The scale reads</span>
          <span className="hw-readout-num" style={{ color: readingColor }}>
            {reading}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> lb</span>
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 210 }}>
            You still contain exactly as much of you as you did a second ago.
          </span>
        </div>

        <div data-align="right" style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">What is acting on you</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12.5 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <span style={{ color: 'var(--ink-2)' }}>Gravity, pulling down</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 54, color: 'var(--muted)' }}>{weight} lb</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <span style={{ color: 'var(--ink-2)' }}>The floor, pushing up</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 54, color: 'var(--muted)' }}>{reading} lb</span>
            </div>
          </div>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', minHeight: 48, lineHeight: 1.5 }}>
            {state.note}
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 300, background: 'var(--paper)' }}
        role="img"
        aria-label={`A person standing on a bathroom scale inside a lift. Gravity pulls down with ${weight} pounds; the floor pushes up with ${reading}.`}
      >
        {/* the lift car */}
        <div style={{ position: 'absolute', left: '50%', marginLeft: -130, bottom: 40, width: 260, height: 220, border: '2px solid var(--rule)', borderRadius: 3, background: 'var(--paper-alt)' }} />
        <div style={{ position: 'absolute', left: '50%', marginLeft: -130, bottom: 40, width: 260, height: 8, background: 'var(--car-body)' }} />
        {/* cable */}
        <div style={{
          position: 'absolute', left: '50%', bottom: 260, width: 2, height: 26,
          background: state.id === 'fall' ? 'transparent' : 'var(--car-body)'
        }} />
        {state.id === 'fall' && (
          <span style={{ position: 'absolute', left: '50%', marginLeft: 8, bottom: 266, fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--brake)' }}>
            snapped
          </span>
        )}

        {/* the scale */}
        <div style={{ position: 'absolute', left: '50%', marginLeft: -34, bottom: 48, width: 68, height: 14, borderRadius: 3, background: 'var(--car-cabin)' }} />

        {/* the person */}
        <div style={{ position: 'absolute', left: '50%', marginLeft: -16, bottom: 62, width: 32, height: 34, background: 'oklch(0.44 0.11 45)', borderRadius: 4 }} />
        <div style={{ position: 'absolute', left: '50%', marginLeft: -18, bottom: 96, width: 36, height: 50, background: 'oklch(0.52 0.13 45)', borderRadius: '9px 9px 5px 5px' }} />
        <div style={{ position: 'absolute', left: '50%', marginLeft: -12, bottom: 146, width: 24, height: 24, borderRadius: '50%', background: 'oklch(0.44 0.11 45)' }} />

        {/* the two forces, drawn to scale against each other */}
        <div style={{ position: 'absolute', left: '50%', width: 0, height: 0 }}>
          <Arrow up={false} height={gravityArrow} label="GRAVITY" color="var(--ink)" left={-58} />
          <Arrow up height={supportArrow} label="THE FLOOR" color={readingColor} left={62} />
        </div>

        <div style={{ position: 'absolute', left: 22, bottom: 14, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          The two arrows are drawn to the same scale. Compare their lengths, not their labels.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {STATES.map((s) => {
            const on = s.id === state.id
            return (
              <button
                key={s.id}
                className="hw-btn"
                onClick={() => setState(s)}
                aria-pressed={on}
                style={{
                  padding: '12px 16px', letterSpacing: '.04em',
                  borderColor: on ? 'var(--accent)' : 'var(--field)',
                  background: on ? 'var(--accent-wash-2)' : 'var(--paper)',
                  color: on ? 'var(--ink)' : 'var(--ink-3)'
                }}
              >
                {s.label}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 180 }}>
          <label htmlFor="hw-body-weight" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            You weigh · {weight} lb
          </label>
          <input id="hw-body-weight" type="range" min="90" max="280" step="5"
            value={weight} onChange={(e) => setWeight(Number(e.target.value))}
            style={{ width: 180, accentColor: 'var(--accent)', height: 28 }} />
        </div>
      </div>
    </div>
  )
}
