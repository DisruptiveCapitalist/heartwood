import { describe, it, expect } from 'vitest'
import { ouStep, decay, lag, makeTrace } from '../lib/sim.js'

// A deterministic stand-in for Math.random, so the same "road" is driven at
// every frame rate.
function seeded(seed = 12345) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** The Lesson 2 autopilot, run headless at a given refresh rate. */
function rideBicycle(fps, seconds = 30) {
  const rand = seeded()
  const dt = Math.min(0.045, 1 / fps)
  const steps = Math.round(seconds * fps)
  let lean = 1.6, leanVel = 0, sLean = 1.6, sVel = 0, bump = 0
  const leans = [], steers = []

  for (let i = 0; i < steps; i++) {
    const react = lag(1 / 12, dt)
    sLean += (lean - sLean) * react
    sVel += (leanVel - sVel) * react
    bump = Math.max(-70, Math.min(70, ouStep(bump, 0.23, 35.3, dt, rand)))

    const steer = Math.max(-1, Math.min(1, sLean * 0.24 + sVel * 0.13))
    const power = Math.min(2.4, 1) * 90
    const tip = 150 * Math.sin((lean * Math.PI) / 180)

    leanVel = (leanVel + (tip - steer * power + bump) * dt) * decay(2.08, dt)
    lean += leanVel * dt
    if (Math.abs(lean) > 44) return { crashed: true }

    if (i > fps) { leans.push(lean); steers.push(steer) }
  }

  const rms = (a) => Math.sqrt(a.reduce((s, x) => s + x * x, 0) / a.length)
  return { crashed: false, leanRMS: rms(leans), steerRMS: rms(steers) }
}

describe('frame-rate independence', () => {
  const rates = [30, 60, 75, 90, 120, 144]
  const runs = rates.map((fps) => ({ fps, ...rideBicycle(fps) }))

  it('the rider never falls over on a straight road, at any refresh rate', () => {
    for (const r of runs) expect(r.crashed, `crashed at ${r.fps} Hz`).toBe(false)
  })

  it('the bicycle keeps wobbling — the wobble is the lesson', () => {
    // The design was tuned at 60 Hz to hold roughly 1 degree RMS. A 120 Hz
    // display must not quietly turn that into a dead-straight line.
    for (const r of runs) {
      expect(r.leanRMS, `lean RMS at ${r.fps} Hz`).toBeGreaterThan(0.6)
      expect(r.leanRMS, `lean RMS at ${r.fps} Hz`).toBeLessThan(1.8)
    }
  })

  it('steering activity does not fall away as the display gets faster', () => {
    const slowest = runs[0].steerRMS
    const fastest = runs[runs.length - 1].steerRMS
    expect(fastest / slowest).toBeGreaterThan(0.7)
    expect(fastest / slowest).toBeLessThan(1.4)
  })
})

describe('decay helpers', () => {
  it('decays by the same amount per second however it is stepped', () => {
    const oneStep = decay(2, 1)
    let many = 1
    for (let i = 0; i < 100; i++) many *= decay(2, 0.01)
    expect(many).toBeCloseTo(oneStep, 6)
  })
})

describe('steering trace', () => {
  it('holds the same number of seconds at any frame rate', () => {
    for (const fps of [30, 60, 144]) {
      const t = makeTrace({ hz: 30, seconds: 3 })
      expect(t.size).toBe(90)
      let pushes = 0
      for (let i = 0; i < fps * 3; i++) if (t.push(1, 1 / fps)) pushes++
      // Three seconds of input should advance the trace by about three seconds.
      expect(pushes).toBeGreaterThan(60)
    }
  })

  it('renders oldest to newest across the full width', () => {
    const t = makeTrace({ hz: 30, seconds: 3 })
    const pts = t.points(280, 30, 24).split(' ')
    expect(pts).toHaveLength(90)
    expect(pts[0]).toBe('0.0,30.0')
    expect(pts[89].startsWith('280.0')).toBe(true)
  })
})
