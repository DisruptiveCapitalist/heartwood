import { useRef, useState, useCallback, useEffect } from 'react'
import { useRafLoop, ouStep, decay, lag, clamp, makeTrace, holdProps } from '../../lib/sim.js'

// Lesson 2, seen from behind. A game the learner can lose, and losing is the
// lesson: at 12 mph steering saves you, at 0 mph nothing does.
//
// Three behaviours are load-bearing and are what the constants below protect:
//   1. at 12 mph steering into the lean recovers;
//   2. at 0 mph the handlebars do nothing, because steering power goes with v²;
//   3. the autopilot holds up by visibly oscillating, never by settling flat.
//
// (3) is why the disturbance is a correlated process with a time constant in
// seconds rather than a per-frame multiplier — see lib/sim.js.

const TIP_GAIN = 150          // gravity's pull on a lean, deg/s² at 90°
const CRASH_AT = 44           // degrees
const START_LEAN = 1.6

const BUMP_TAU = 0.23         // seconds — road roughness correlation time
const BUMP_SIGMA = 35.3       // steady-state std, matched to the tuned prototype
const BUMP_CLAMP = 70
const DAMP_TAU = 2.08         // seconds — lean velocity bleed
const REACT_TAU = 1 / 12      // seconds — the rider's reflexes are not instant

const READOUT_HZ = 12
const TRACE = { hz: 30, seconds: 3 }
const PLOT = { w: 280, h: 60, mid: 30, scale: 24 }

export default function BicycleBalance({ active, steerAuthority = 90 }) {
  const sim = useRef({
    lean: START_LEAN, leanVel: 0, sLean: START_LEAN, sVel: 0,
    bump: 0, steer: 0, input: 0, speed: 12,
    // On by default. Left off, the bicycle is on the ground about two seconds
    // after the page paints — before the learner has finished reading the line
    // telling them to ride it — and the steering trace under "every wiggle is a
    // correction" is a dead flat line.
    auto: true,
    crashed: false, acc: 0
  })

  const trace = useRef(makeTrace(TRACE))
  const leanRef = useRef(null)
  const barRef = useRef(null)
  const polyRef = useRef(null)
  const roadRef = useRef(null)

  const [ui, setUi] = useState({ lean: START_LEAN, crashed: false, speed: 12, auto: true, input: 0 })

  const step = useCallback((dt) => {
    const s = sim.current
    if (s.crashed) return

    // What the rider can feel, which lags what is actually happening.
    const react = lag(REACT_TAU, dt)
    s.sLean += (s.lean - s.sLean) * react
    s.sVel += (s.leanVel - s.sVel) * react

    s.bump = clamp(ouStep(s.bump, BUMP_TAU, BUMP_SIGMA, dt), -BUMP_CLAMP, BUMP_CLAMP)

    // A hand on the bars always beats the autopilot, so "try to keep it up"
    // works whether or not the reflexes are switched on.
    const autoSteer = clamp(s.sLean * 0.24 + s.sVel * 0.13, -1, 1)
    s.steer = s.input !== 0 ? s.input : (s.auto ? autoSteer : 0)

    const v = s.speed / 12
    const power = Math.min(2.4, v * v) * steerAuthority
    const tip = TIP_GAIN * Math.sin(s.lean * Math.PI / 180)

    s.leanVel = (s.leanVel + (tip - s.steer * power + s.bump) * dt) * decay(DAMP_TAU, dt)
    s.lean += s.leanVel * dt

    if (Math.abs(s.lean) > CRASH_AT) {
      s.lean = s.lean > 0 ? CRASH_AT : -CRASH_AT
      s.leanVel = 0
      s.crashed = true
    }

    if (leanRef.current) leanRef.current.style.transform = `rotate(${s.lean.toFixed(2)}deg)`
    if (barRef.current) {
      barRef.current.style.transform =
        `rotate(${(s.steer * 16).toFixed(1)}deg) scaleX(${(1 - Math.abs(s.steer) * 0.25).toFixed(3)})`
    }

    if (trace.current.push(s.steer, dt) && polyRef.current) {
      polyRef.current.setAttribute('points', trace.current.points(PLOT.w, PLOT.mid, PLOT.scale))
    }

    s.acc += dt
    if (s.acc >= 1 / READOUT_HZ || s.crashed) {
      s.acc = 0
      setUi((u) => ({ ...u, lean: s.lean, crashed: s.crashed }))
    }
  }, [steerAuthority])

  useRafLoop(active, step)

  // Arrow keys steer, but only while the scene is on screen and the learner is
  // not typing into something.
  useEffect(() => {
    if (!active) return undefined
    const isTyping = (el) => el && /^(INPUT|TEXTAREA)$/.test(el.tagName)
    const down = (e) => {
      if (isTyping(e.target)) return
      if (e.key === 'ArrowLeft') { sim.current.input = -1; setUi((u) => ({ ...u, input: -1 })) }
      if (e.key === 'ArrowRight') { sim.current.input = 1; setUi((u) => ({ ...u, input: 1 })) }
    }
    const up = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        sim.current.input = 0
        setUi((u) => ({ ...u, input: 0 }))
      }
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [active])

  const setInput = (v) => { sim.current.input = v; setUi((u) => ({ ...u, input: v })) }

  const setSpeed = (v) => {
    sim.current.speed = v
    setUi((u) => ({ ...u, speed: v }))
    if (roadRef.current) {
      roadRef.current.style.animationDuration = v > 0.4 ? (2.6 / v).toFixed(2) + 's' : '4s'
      roadRef.current.style.animationPlayState = v > 0.4 ? 'running' : 'paused'
    }
  }

  const toggleAuto = () => {
    const auto = !sim.current.auto
    sim.current.auto = auto
    setUi((u) => ({ ...u, auto }))
  }

  const reset = () => {
    const s = sim.current
    s.lean = START_LEAN; s.leanVel = 0; s.sLean = START_LEAN; s.sVel = 0
    s.bump = 0; s.steer = 0; s.input = 0; s.crashed = false
    trace.current.reset()
    if (polyRef.current) polyRef.current.setAttribute('points', trace.current.points(PLOT.w, PLOT.mid, PLOT.scale))
    setUi((u) => ({ ...u, lean: START_LEAN, crashed: false, input: 0 }))
  }

  const absLean = Math.abs(ui.lean)
  const leanColor = absLean > 24 ? 'var(--brake)' : absLean > 10 ? 'var(--warn)' : 'var(--ink)'
  const leanNote = ui.crashed
    ? 'On the ground. Steering could not save it.'
    : ui.speed < 1
      ? 'Stopped. The handlebars do nothing now.'
      : absLean > 20
        ? 'Falling — steer toward the lean.'
        : 'Held up by constant small corrections.'

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Lean</span>
          <span className="hw-readout-num" style={{ color: leanColor }}>
            {absLean.toFixed(1)}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}>°</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 200, minHeight: 34 }}>
            {leanNote}
          </span>
        </div>

        <div data-align="right" style={{ width: PLOT.w, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">Your steering, moment by moment</span>
          <svg
            viewBox={`0 0 ${PLOT.w} ${PLOT.h}`}
            preserveAspectRatio="none"
            role="img"
            aria-label="A trace of the last three seconds of steering. It wanders constantly above and below centre."
            style={{ width: '100%', maxWidth: PLOT.w, height: PLOT.h, display: 'block', background: 'var(--paper-alt)', border: '1px solid var(--rule-2)', borderRadius: 4 }}
          >
            <line x1="0" y1={PLOT.mid} x2={PLOT.w} y2={PLOT.mid} stroke="#ded4c2" strokeWidth="1" />
            <polyline ref={polyRef} points="" fill="none" stroke="var(--accent-bright)" strokeWidth="1.6" />
          </svg>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Every wiggle is a correction. This is what balancing actually is.
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{
          height: 300,
          background: 'linear-gradient(var(--paper) 0%, var(--paper) 74%, var(--ground) 74%, var(--ground) 100%)'
        }}
        role="img"
        aria-label="A bicycle and rider seen from behind, tipping left and right. Steering moves the wheel back under the lean; at zero speed it does nothing and the bicycle falls."
      >
        <div style={{ position: 'absolute', left: 0, right: 0, top: '74%', height: 1, background: '#cdc0ab' }} />
        <div
          ref={roadRef}
          data-hw-road
          style={{
            position: 'absolute', left: -64, right: -64, top: 'calc(74% + 30px)', height: 3,
            background: 'repeating-linear-gradient(90deg, var(--rule) 0 36px, transparent 36px 64px)',
            animation: 'hwRoad 1s linear infinite',
            animationDuration: (2.6 / 12).toFixed(2) + 's',
            animationPlayState: 'running'
          }}
        />
        <div style={{ position: 'absolute', left: 22, bottom: 16, right: 22, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          The ground is going by at {ui.speed.toFixed(1)} mph. The front wheel is the only thing that can move sideways.
        </div>

        <div style={{ position: 'absolute', bottom: 78, left: '50%', width: 2, height: 2 }}>
          <div ref={leanRef} style={{ position: 'absolute', bottom: 0, left: 0, width: 2, height: 150, transformOrigin: '50% 100%' }}>
            <div style={{ position: 'absolute', bottom: 0, left: -21, width: 42, height: 42, borderRadius: '50%', border: '8px solid var(--machine)', background: 'var(--paper-alt)', boxSizing: 'border-box' }} />
            <div style={{ position: 'absolute', bottom: 18, left: -3, width: 6, height: 6, borderRadius: '50%', background: 'var(--machine)' }} />
            <div style={{ position: 'absolute', bottom: 38, left: -4, width: 8, height: 46, borderRadius: 3, background: 'var(--machine)' }} />
            <div style={{ position: 'absolute', bottom: 79, left: -17, width: 34, height: 10, borderRadius: 5, background: 'var(--machine)' }} />
            <div style={{ position: 'absolute', bottom: 30, left: -20, width: 10, height: 58, borderRadius: 5, background: 'var(--accent-deep)' }} />
            <div style={{ position: 'absolute', bottom: 30, left: 10, width: 10, height: 58, borderRadius: 5, background: 'var(--accent-deep)' }} />
            <div style={{ position: 'absolute', bottom: 86, left: -16, width: 32, height: 46, borderRadius: '9px 9px 5px 5px', background: 'oklch(0.52 0.13 45)' }} />
            <div style={{ position: 'absolute', bottom: 134, left: -11, width: 22, height: 22, borderRadius: '50%', background: 'var(--accent-deep)' }} />
            <div style={{ position: 'absolute', bottom: 104, left: -3, width: 6, height: 22, borderRadius: 3, background: 'var(--machine)' }} />
            {/* Wider than the rider and outlined in paper, because it is the
                thing the copy tells the learner to watch. */}
            <div ref={barRef} style={{ position: 'absolute', bottom: 122, left: -34, width: 68, height: 8, borderRadius: 4, background: 'var(--machine)', transformOrigin: '50% 50%', boxShadow: '0 0 0 2px var(--paper)' }} />
          </div>
        </div>

        {ui.crashed && (
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 46, textAlign: 'center',
            fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, letterSpacing: '.06em', color: 'var(--brake)'
          }}>
            <span style={{ background: 'var(--paper)', padding: '4px 12px', borderRadius: 4 }}>Over you go. Press RESET.</span>
          </div>
        )}
      </div>

      <div className="hw-controls">
        <button
          className="hw-btn"
          {...holdProps(() => setInput(-1), () => setInput(0))}
          style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0, padding: '13px 22px', color: 'var(--ink-2)', background: ui.input < 0 ? 'oklch(0.92 0.05 45)' : 'var(--paper)' }}
        >
          ◀ STEER LEFT
        </button>
        <button
          className="hw-btn"
          {...holdProps(() => setInput(1), () => setInput(0))}
          style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0, padding: '13px 22px', color: 'var(--ink-2)', background: ui.input > 0 ? 'oklch(0.92 0.05 45)' : 'var(--paper)' }}
        >
          STEER RIGHT ▶
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 200 }}>
          <label htmlFor="hw-speed" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Speed · {ui.speed.toFixed(1)} mph
          </label>
          <input
            id="hw-speed"
            type="range" min="0" max="16" step="0.5"
            value={ui.speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={{ width: 200, accentColor: 'var(--accent)', height: 28 }}
          />
        </div>

        <button
          className="hw-btn"
          onClick={toggleAuto}
          aria-pressed={ui.auto}
          style={{
            letterSpacing: '.06em',
            borderColor: ui.auto ? 'var(--green)' : 'var(--field)',
            background: ui.auto ? 'var(--green-wash)' : 'var(--paper)',
            color: ui.auto ? 'var(--green-deep)' : 'var(--ink-3)'
          }}
        >
          {ui.auto ? "Rider's reflexes: on" : "Rider's reflexes: off"}
        </button>

        <button className="hw-btn" onClick={reset}>RESET</button>
      </div>
    </div>
  )
}
