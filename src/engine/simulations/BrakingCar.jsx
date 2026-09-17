import { useRef, useState, useCallback } from 'react'
import { useRafLoop, lag, holdProps } from '../../lib/sim.js'

// Lesson 1. A car at 40 mph, a brake you hold down, and a passenger who is not
// attached to any of it. The seatbelt toggle is the payoff: with it on, the lean
// is capped and the status line says what is doing the stopping.
//
// Simulation state lives in a ref and is written straight to the DOM each frame.
// React only re-renders the readouts, and only a few times a second — a lesson
// page should not re-reconcile sixty times a second to move a car.

const SET_SPEED = 40
const LOOP_AT = 82
const LOOP_TO = -14
const READOUT_HZ = 12

export default function BrakingCar({ active, brakeStrength = 26 }) {
  const sim = useRef({
    speed: SET_SPEED, braking: false, belt: false,
    carX: 6, lean: 0, decel: 0, acc: 0, stopped: false
  })

  const carRef = useRef(null)
  const leanRef = useRef(null)
  const beltRef = useRef(null)
  const barRef = useRef(null)

  const [ui, setUi] = useState({ speed: SET_SPEED, decel: 0, braking: false, belt: false, stopped: false })

  const step = useCallback((dt) => {
    const s = sim.current
    const prev = s.speed

    s.speed = s.braking
      ? Math.max(0, prev - brakeStrength * dt)
      : Math.min(SET_SPEED, prev + 14 * dt)

    s.decel = Math.max(0, (prev - s.speed) / dt)
    s.stopped = s.speed < 0.2 && prev < 1

    s.carX += s.speed * dt * 0.42
    if (s.carX > LOOP_AT) s.carX = LOOP_TO

    // The belt caps how far you travel before something stops you.
    const cap = s.belt ? 9 : 27
    const target = Math.min(cap, s.decel * (s.belt ? 0.30 : 0.92))
    s.lean += (target - s.lean) * lag(0.143, dt)

    if (carRef.current) carRef.current.style.left = s.carX.toFixed(2) + '%'
    if (leanRef.current) leanRef.current.style.transform = `rotate(${s.lean.toFixed(2)}deg)`
    if (barRef.current) barRef.current.style.width = Math.min(100, (s.decel / 40) * 100).toFixed(0) + '%'

    s.acc += dt
    if (s.acc >= 1 / READOUT_HZ) {
      s.acc = 0
      setUi({ speed: s.speed, decel: s.decel, braking: s.braking, belt: s.belt, stopped: s.stopped })
    }
  }, [brakeStrength])

  useRafLoop(active, step)

  const setBraking = (on) => {
    sim.current.braking = on
    setUi((u) => ({ ...u, braking: on }))
  }

  const toggleBelt = () => {
    const belt = !sim.current.belt
    sim.current.belt = belt
    if (beltRef.current) beltRef.current.style.background = belt ? 'var(--green)' : 'transparent'
    setUi((u) => ({ ...u, belt }))
  }

  const reset = () => {
    const s = sim.current
    s.braking = false; s.speed = SET_SPEED; s.carX = 6; s.lean = 0; s.decel = 0; s.stopped = false
    setUi((u) => ({ ...u, speed: SET_SPEED, decel: 0, braking: false, stopped: false }))
  }

  const sceneNote = ui.braking
    ? (ui.belt
      ? 'The belt is pushing backward on you. That push is what stops you.'
      : 'The car is slowing. Your body has not been told.')
    : ui.stopped
      ? 'Car: 0 mph. You: still settling back.'
      : 'Rolling along. Car and passenger agree.'

  const decelNote = ui.decel > 1 ? 'the car is losing speed fast' : ui.braking ? 'stopped' : 'steady — nothing is changing'

  return (
    <div className="hw-sim">
      <div
        className="hw-readouts"
        style={{ fontFamily: 'var(--sans)' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Speed</span>
          <span className="hw-readout-num" style={{ color: 'var(--ink)' }}>
            {Math.round(ui.speed)}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> mph</span>
          </span>
        </div>
        <div data-align="right" style={{ width: 230, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">How hard the car is slowing</span>
          <div style={{ height: 8, background: 'var(--rule-2)', borderRadius: 4, overflow: 'hidden' }}>
            <div ref={barRef} style={{ height: 8, width: '0%', background: 'var(--accent-bright)' }} />
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)', minHeight: 17 }}>{decelNote}</span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{
          height: 270,
          background: 'linear-gradient(var(--paper) 0%, var(--paper) 62%, var(--ground) 62%, var(--ground) 100%)'
        }}
        role="img"
        aria-label="A car driving from left to right with a passenger visible through the window. Holding the brake slows the car; the passenger keeps going and tips forward."
      >
        <div style={{ position: 'absolute', left: 0, right: 0, top: '62%', height: 1, background: '#cdc0ab' }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 'calc(62% + 26px)', height: 2,
          background: 'repeating-linear-gradient(90deg, var(--rule) 0 34px, transparent 34px 64px)'
        }} />

        <div ref={carRef} style={{ position: 'absolute', bottom: 64, left: '6%', width: 210, height: 104 }}>
          <div style={{ position: 'absolute', bottom: 16, left: 0, width: 210, height: 52, borderRadius: '9px 16px 8px 8px', background: 'var(--car-body)' }} />
          <div style={{ position: 'absolute', bottom: 62, left: 44, width: 116, height: 44, borderRadius: '13px 13px 2px 2px', background: 'var(--car-cabin)' }} />
          <div style={{ position: 'absolute', bottom: 68, left: 52, width: 100, height: 32, borderRadius: '8px 8px 2px 2px', background: 'var(--car-glass)', overflow: 'hidden' }}>
            <div ref={leanRef} style={{ position: 'absolute', bottom: 0, left: 34, width: 30, height: 30, transformOrigin: '50% 100%' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 9, width: 12, height: 19, borderRadius: '5px 5px 2px 2px', background: 'var(--accent)' }} />
              <div style={{ position: 'absolute', bottom: 17, left: 7, width: 16, height: 16, borderRadius: '50%', background: 'oklch(0.55 0.11 45)' }} />
              <div ref={beltRef} style={{ position: 'absolute', bottom: 2, left: 6, width: 20, height: 2, background: 'transparent', transform: 'rotate(-38deg)', transformOrigin: '0 50%' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 0, left: 26, width: 34, height: 34, borderRadius: '50%', background: 'var(--tyre)', border: '5px solid var(--tyre-rim)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 148, width: 34, height: 34, borderRadius: '50%', background: 'var(--tyre)', border: '5px solid var(--tyre-rim)' }} />
        </div>

        <div
          aria-live="polite"
          style={{ position: 'absolute', bottom: 14, left: 22, right: 22, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)', minHeight: 19 }}
        >
          {sceneNote}
        </div>
      </div>

      <div className="hw-controls">
        <button
          {...holdProps(() => setBraking(true), () => setBraking(false))}
          style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '.14em', padding: '13px 26px',
            minHeight: 'var(--tap)', borderRadius: 'var(--r-sm)', border: '1px solid var(--brake-edge)',
            background: ui.braking ? 'var(--brake-held)' : 'var(--brake)', color: '#fff8f2'
          }}
        >
          HOLD TO BRAKE
        </button>
        <button className="hw-btn" onClick={reset}>BACK TO 40</button>
        <button
          className="hw-btn"
          onClick={toggleBelt}
          aria-pressed={ui.belt}
          style={{
            letterSpacing: '.06em',
            borderColor: ui.belt ? 'var(--green)' : 'var(--field)',
            background: ui.belt ? 'var(--green-wash)' : 'var(--paper)',
            color: ui.belt ? 'var(--green-deep)' : 'var(--ink-3)'
          }}
        >
          {ui.belt ? 'Seatbelt: on' : 'Seatbelt: off'}
        </button>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 330, textAlign: 'right' }}>
          Watch the passenger, not the car.
        </span>
      </div>
    </div>
  )
}
