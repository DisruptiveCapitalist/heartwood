import { useRef, useState, useCallback, useEffect } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// The molecular view, used three times across the course with different things
// switched on:
//
//   Lesson 13 (heat)        — temperature and the spread of speeds.
//   Lesson 16 (temperature) — plus how *much* stuff there is, so the learner
//                             can separate the average from the total.
//   Lesson 20 (pressure)    — plus a wall they can move, so squeezing the box
//                             raises the collision rate by itself.
//
// Defaults reproduce Lesson 13 exactly, so adding the later two could not
// disturb it.

const BOX_H = 178
const BOX_W_MAX = 340
const READOUT_HZ = 8
const BINS = 14
const HIT_WINDOW = 0.8

// An average particle at room temperature moves at 1 unit.
const speedFor = (f) => Math.sqrt(Math.max(0.0008, (f + 459.67) / (70 + 459.67)))

const makeParticle = (w) => {
  const s = (Math.random() + Math.random() + Math.random()) / 1.5
  const a = Math.random() * Math.PI * 2
  return { x: Math.random() * w, y: Math.random() * BOX_H, vx: Math.cos(a) * s, vy: Math.sin(a) * s, s }
}

export default function ParticleBox({
  active,
  showHistogram = true,
  showPressure = true,
  showAmount = false,     // Lesson 16: a particle-count slider
  showTotals = false,     // Lesson 16: average-per-particle against the total
  showVolume = false,     // Lesson 20: a wall the learner can push in
  defaultCount = 120,
  defaultTemp = 70
}) {
  const [tempF, setTempF] = useState(defaultTemp)
  const [count, setCount] = useState(defaultCount)
  const [boxW, setBoxW] = useState(BOX_W_MAX)
  const [ui, setUi] = useState({ avg: 1, hits: 0, bins: new Array(BINS).fill(0) })

  const sim = useRef(null)
  const canvasRef = useRef(null)
  const live = useRef({ temp: defaultTemp, w: BOX_W_MAX })
  live.current = { temp: tempF, w: boxW }

  if (!sim.current) {
    sim.current = { p: Array.from({ length: defaultCount }, () => makeParticle(BOX_W_MAX)), hits: 0, window: 0, acc: 0, rate: 0 }
  }

  // Add or remove particles without disturbing the ones already in flight.
  useEffect(() => {
    const p = sim.current.p
    while (p.length < count) p.push(makeParticle(live.current.w))
    while (p.length > count) p.pop()
  }, [count])

  const step = useCallback((dt) => {
    const s = sim.current
    const w = live.current.w
    const scale = speedFor(live.current.temp) * 84

    for (const q of s.p) {
      if (q.x > w) q.x = w                    // the wall may have moved in
      q.x += q.vx * scale * dt
      q.y += q.vy * scale * dt
      if (q.x < 0) { q.x = 0; q.vx = -q.vx; s.hits++ }
      else if (q.x > w) { q.x = w; q.vx = -q.vx; s.hits++ }
      if (q.y < 0) { q.y = 0; q.vy = -q.vy; s.hits++ }
      else if (q.y > BOX_H) { q.y = BOX_H; q.vy = -q.vy; s.hits++ }
    }

    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, BOX_W_MAX, BOX_H)
      const sc = speedFor(live.current.temp)
      for (const q of s.p) {
        const hot = Math.min(1, (q.s * sc) / 1.8)
        ctx.fillStyle = `oklch(${(0.62 - hot * 0.16).toFixed(3)} ${(0.06 + hot * 0.14).toFixed(3)} ${(70 - hot * 45).toFixed(0)})`
        ctx.beginPath()
        ctx.arc(q.x, q.y, 2.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    s.window += dt
    s.acc += dt
    if (s.acc >= 1 / READOUT_HZ) {
      s.acc = 0
      const sc = speedFor(live.current.temp)
      const bins = new Array(BINS).fill(0)
      let total = 0
      for (const q of s.p) {
        const v = q.s * sc
        total += v
        bins[Math.min(BINS - 1, Math.floor((v / 3) * BINS))]++
      }
      if (s.window >= HIT_WINDOW) {
        const measured = s.hits / s.window
        // Counting hits over one short window is a Poisson sample with about
        // 11% noise on it. Averaging a few windows keeps the reading steady
        // enough that squeezing the box tells the truth rather than the noise.
        s.rate = s.rate ? s.rate * 0.72 + measured * 0.28 : measured
        s.hits = 0
        s.window = 0
      }
      setUi({ avg: s.p.length ? total / s.p.length : 0, hits: s.rate, bins })
    }
  }, [])

  useRafLoop(active, step)

  useEffect(() => {
    if (!active) canvasRef.current?.getContext('2d')?.clearRect(0, 0, BOX_W_MAX, BOX_H)
  }, [active])

  const peak = Math.max(1, ...ui.bins)
  const warmth = Math.min(1, Math.max(0, (tempF - 20) / 380))
  // Total jiggling: how many there are, times how much each one has.
  const totalJiggle = (count * ui.avg * ui.avg) / (defaultCount * 1)
  const perimeter = 2 * (boxW + BOX_H)
  // Kinetic theory for a flat box: the collision rate per unit of wall is
  // proportional to how crowded the box is, so this is (hits per unit wall)
  // normalised against a full box of the same gas at room temperature. The
  // reference below is measured from this simulation, not guessed.
  const REFERENCE_RATE_PER_LENGTH = 0.0560
  const pressure = (ui.hits / perimeter) / REFERENCE_RATE_PER_LENGTH

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">
            {showTotals ? 'Average speed, per particle' : 'Average particle speed'}
          </span>
          <span className="hw-readout-num" style={{ color: warmth > 0.55 ? 'var(--brake)' : 'var(--ink)' }}>
            {ui.avg.toFixed(2)}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> × room temperature</span>
          </span>

          {showTotals && (
            <>
              <span className="hw-readout-label" style={{ marginTop: 10 }}>All the jiggling added up</span>
              <span className="hw-readout-num" style={{ fontSize: 30, color: 'var(--builder)' }}>
                {totalJiggle.toFixed(2)}
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> × a room-temperature boxful</span>
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 236, marginTop: 4 }}>
                One is the average. The other counts how many there are. They are not the same number and they do not move together.
              </span>
            </>
          )}

          {showPressure && !showTotals && (
            <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 230, marginTop: 6 }}>
              Hitting the walls {Math.round(ui.hits)} times a second.
              {showVolume ? '' : ' Remember that number — it becomes pressure in Week 4.'}
            </span>
          )}
        </div>

        <div data-align="right" style={{ width: 250, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          {showVolume ? (
            <>
              <span className="hw-readout-label">Pressure on the walls</span>
              <span className="hw-readout-num" style={{ fontSize: 30, color: pressure > 1.6 ? 'var(--brake)' : 'var(--ink)' }}>
                {pressure.toFixed(2)}
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> × normal</span>
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>
                {Math.round(ui.hits)} hits a second, spread over the walls there are. Push the wall in and neither the particles nor their speed change — only how often they arrive.
              </span>
            </>
          ) : showHistogram ? (
            <>
              <span className="hw-readout-label">How many are going how fast</span>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 54, background: 'var(--paper-alt)', border: '1px solid var(--rule-2)', borderRadius: 4, padding: '4px 6px' }}>
                {ui.bins.map((n, i) => (
                  <div key={i} style={{ flex: 1, height: `${Math.max(2, (n / peak) * 100)}%`, background: 'var(--accent-bright)', borderRadius: 1, opacity: 0.35 + (i / BINS) * 0.65 }} />
                ))}
              </div>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                Slow on the left, fast on the right. Heating shifts the whole spread — it does not pick one speed.
              </span>
            </>
          ) : null}
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label={`A box of ${count} particles in constant motion at ${tempF} degrees, hitting the walls about ${Math.round(ui.hits)} times a second.`}
      >
        <div style={{
          position: 'absolute', left: '50%', top: 34, marginLeft: -BOX_W_MAX / 2 - 3,
          width: boxW + 6, height: BOX_H + 6, border: '3px solid var(--machine)', borderRadius: 3,
          background: `oklch(${(0.985 - warmth * 0.03).toFixed(3)} ${(warmth * 0.03).toFixed(3)} 45)`,
          overflow: 'hidden', transition: 'width .08s linear'
        }}>
          <canvas ref={canvasRef} width={BOX_W_MAX} height={BOX_H} style={{ display: 'block', width: BOX_W_MAX, height: BOX_H }} />
        </div>

        {showVolume && (
          <div style={{
            position: 'absolute', left: '50%', top: 28, marginLeft: -BOX_W_MAX / 2 + boxW + 3,
            width: 14, height: BOX_H + 18, background: 'var(--accent)', borderRadius: 2
          }} />
        )}

        <div style={{ position: 'absolute', left: 22, bottom: 14, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          {showVolume
            ? 'The same particles the whole time. Only the room they have changes.'
            : showAmount
              ? 'Every dot is the same kind of particle, moving at the same sort of speed. There are simply more of them.'
              : 'Nothing here is ever still. Not at room temperature, and not in a block of ice.'}
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 240 }}>
          <label htmlFor="hw-temp" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Temperature · {tempF}°F
          </label>
          <input id="hw-temp" type="range" min="-450" max="400" step="5"
            value={tempF} onChange={(e) => setTempF(Number(e.target.value))}
            style={{ width: 240, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        {showAmount && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 200 }}>
            <label htmlFor="hw-count" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              How much stuff · {count} particles
            </label>
            <input id="hw-count" type="range" min="20" max="260" step="10"
              value={count} onChange={(e) => setCount(Number(e.target.value))}
              style={{ width: 200, accentColor: 'var(--accent)', height: 28 }} />
          </div>
        )}

        {showVolume && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 200 }}>
            <label htmlFor="hw-vol" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Squeeze the box · {Math.round((boxW / BOX_W_MAX) * 100)}% of its room
            </label>
            <input id="hw-vol" type="range" min="90" max={BOX_W_MAX} step="5"
              value={boxW} onChange={(e) => setBoxW(Number(e.target.value))}
              style={{ width: 200, accentColor: 'var(--accent)', height: 28 }} />
          </div>
        )}

        {!showVolume && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[{ l: 'Almost absolute zero', v: -450 }, { l: 'Ice', v: 20 }, { l: 'A cool room', v: 60 }, { l: 'Hot tea', v: 190 }, { l: 'A frying pan', v: 380 }].map((p) => (
              <button key={p.l} className="hw-btn" onClick={() => setTempF(p.v)} style={{ padding: '12px 14px', letterSpacing: '.04em' }}>
                {p.l}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
