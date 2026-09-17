import { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// Frame-rate independence
//
// The prototypes applied their decay constants once per *frame*:
//
//     bump    = bump * 0.93   + noise * dt
//     leanVel = leanVel * 0.992
//
// 0.93 per frame is a 0.23 s correlation time at 60 Hz — and a 0.12 s one on a
// 120 Hz display. Worse, the noise was scaled by dt where an AR(1) process needs
// sqrt(dt) to hold its variance. Measured over a 30 s run of the autopilot:
//
//     30 Hz   lean RMS 1.28°   steer RMS 0.50
//     60 Hz   lean RMS 1.03°   steer RMS 0.38     <- what the design was tuned on
//    120 Hz   lean RMS 0.42°   steer RMS 0.19
//    144 Hz   lean RMS 0.31°   steer RMS 0.15
//
// On a ProMotion laptop the bicycle would have held itself almost perfectly
// still underneath a caption reading "Every wiggle is a correction." The wobble
// is the lesson, so these helpers put the time constants in seconds and let dt
// be whatever the display gives us. Verified flat from 30 Hz to 144 Hz.
// ---------------------------------------------------------------------------

/** Multiplier that decays a value to 1/e over `tau` seconds. */
export function decay(tau, dt) {
  return Math.exp(-dt / tau)
}

/** Smoothing factor for "chase the target with a `tau`-second lag". */
export function lag(tau, dt) {
  return 1 - Math.exp(-dt / tau)
}

/**
 * One step of an Ornstein-Uhlenbeck process: noise that is correlated over
 * `tau` seconds and holds a steady-state standard deviation of `sigma`,
 * whatever the frame rate.
 *
 * White noise would integrate away to nothing; a slower decay would read as a
 * steady turn rather than a series of corrections. Both matter to the lesson.
 */
export function ouStep(prev, tau, sigma, dt, rand = Math.random) {
  const a = Math.exp(-dt / tau)
  // Uniform noise has variance 1/12, so sqrt(12) normalises it to unit variance.
  const kick = (rand() - 0.5) * Math.sqrt(12) * sigma * Math.sqrt(1 - a * a)
  return prev * a + kick
}

export const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)

/**
 * requestAnimationFrame loop that runs only while `active`.
 *
 * `active` is false whenever the SEE IT stage is off screen, so a simulation
 * never burns cycles — and the bicycle never quietly falls over in a stage the
 * learner is not looking at. dt is clamped so a backgrounded tab cannot come
 * back with a single enormous step.
 */
export function useRafLoop(active, step, maxDt = 0.045) {
  const stepRef = useRef(step)
  stepRef.current = step

  useEffect(() => {
    if (!active) return undefined
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(maxDt, (now - last) / 1000)
      last = now
      if (dt > 0) stepRef.current(dt)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, maxDt])
}

/**
 * A rolling trace sampled at a fixed rate, so the plot always shows the same
 * number of *seconds* of history. The prototype kept the last 140 frames, which
 * was 4.7 s at 30 Hz and under 1 s at 144 Hz — the faster the display, the less
 * of the wobble was on screen.
 */
export function makeTrace({ hz = 30, seconds = 3 } = {}) {
  const size = Math.round(hz * seconds)
  const values = new Array(size).fill(0)
  let acc = 0
  let head = 0
  return {
    size,
    push(value, dt) {
      acc += dt
      const interval = 1 / hz
      let pushed = false
      while (acc >= interval) {
        acc -= interval
        values[head] = value
        head = (head + 1) % size
        pushed = true
      }
      return pushed
    },
    /** Oldest-to-newest, as an SVG `points` string. */
    points(width, midY, scale) {
      let out = ''
      for (let i = 0; i < size; i++) {
        const v = values[(head + i) % size]
        const x = (i * (width / (size - 1))).toFixed(1)
        const y = (midY - v * scale).toFixed(1)
        out += (i ? ' ' : '') + x + ',' + y
      }
      return out
    },
    reset() {
      values.fill(0)
      acc = 0
      head = 0
    }
  }
}

/**
 * Press-and-hold handlers for a control that must release on mouse-up, on
 * mouse-leave (otherwise the brake sticks on) and on touch-end.
 */
export function holdProps(on, off) {
  return {
    onMouseDown: on,
    onMouseUp: off,
    onMouseLeave: off,
    onTouchStart: (e) => { e.preventDefault(); on() },
    onTouchEnd: (e) => { e.preventDefault(); off() },
    onKeyDown: (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); on() } },
    onKeyUp: (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); off() } }
  }
}
