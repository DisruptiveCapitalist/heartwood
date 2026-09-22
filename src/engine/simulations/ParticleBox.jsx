import { useRef, useState, useCallback, useEffect } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// The molecular view. Lesson 13 uses it for heat; Lessons 16 and 20 will reuse
// it for temperature and pressure, which is why it counts wall hits it does not
// yet need.
//
// Two things the learner should notice, and neither is "the dots move":
//
//   Raising the temperature does not set every particle to a new speed. It
//   widens a spread. At any temperature there are slow ones and fast ones, and
//   the histogram is the honest picture of what "hot" means.
//
//   The walls are being hit constantly, and the rate goes up with temperature.
//   That rate is pressure, arriving a week early.

const COUNT = 120
const BOX = { w: 340, h: 190 }
const READOUT_HZ = 8
const BINS = 14

// Speed scale: an average particle at room temperature moves at 1 unit.
const speedFor = (f) => Math.sqrt(Math.max(0.02, (f + 459.67) / (70 + 459.67)))

export default function ParticleBox({ active, showHistogram = true, showPressure = true }) {
  const [tempF, setTempF] = useState(70)
  const [ui, setUi] = useState({ avg: 1, hits: 0, bins: new Array(BINS).fill(0) })

  const sim = useRef(null)
  const canvasRef = useRef(null)
  const tempRef = useRef(tempF)
  tempRef.current = tempF

  if (!sim.current) {
    const rand = () => Math.random()
    sim.current = {
      p: Array.from({ length: COUNT }, () => {
        // A spread of speeds, not one speed. Two random draws give a plausible
        // bell rather than a flat line.
        const s = (rand() + rand() + rand()) / 1.5
        const a = rand() * Math.PI * 2
        return { x: rand() * BOX.w, y: rand() * BOX.h, vx: Math.cos(a) * s, vy: Math.sin(a) * s, s }
      }),
      hits: 0, window: 0, acc: 0, rate: 0
    }
  }

  const step = useCallback((dt) => {
    const s = sim.current
    const scale = speedFor(tempRef.current) * 84   // px per second

    for (const q of s.p) {
      q.x += q.vx * scale * dt
      q.y += q.vy * scale * dt
      if (q.x < 0) { q.x = 0; q.vx = -q.vx; s.hits++ }
      else if (q.x > BOX.w) { q.x = BOX.w; q.vx = -q.vx; s.hits++ }
      if (q.y < 0) { q.y = 0; q.vy = -q.vy; s.hits++ }
      else if (q.y > BOX.h) { q.y = BOX.h; q.vy = -q.vy; s.hits++ }
    }

    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, BOX.w, BOX.h)
      for (const q of s.p) {
        // Faster particles are drawn warmer, so the spread is visible in the
        // box and not only in the histogram.
        const hot = Math.min(1, (q.s * speedFor(tempRef.current)) / 1.8)
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
      const sc = speedFor(tempRef.current)
      const bins = new Array(BINS).fill(0)
      let total = 0
      for (const q of s.p) {
        const v = q.s * sc
        total += v
        bins[Math.min(BINS - 1, Math.floor((v / 3) * BINS))]++
      }
      if (s.window >= 0.8) {
        s.rate = s.hits / s.window
        s.hits = 0
        s.window = 0
      }
      setUi({ avg: total / COUNT, hits: s.rate ?? 0, bins })
    }
  }, [])

  useRafLoop(active, step)

  useEffect(() => {
    if (!active && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx?.clearRect(0, 0, BOX.w, BOX.h)
    }
  }, [active])

  const peak = Math.max(1, ...ui.bins)
  const warmth = Math.min(1, Math.max(0, (tempF - 20) / 380))

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Average particle speed</span>
          <span className="hw-readout-num" style={{ color: warmth > 0.55 ? 'var(--brake)' : 'var(--ink)' }}>
            {ui.avg.toFixed(2)}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> × room temperature</span>
          </span>
          {showPressure && (
            <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 230, marginTop: 6 }}>
              Hitting the walls {Math.round(ui.hits)} times a second. Remember that number — it becomes pressure in Week 4.
            </span>
          )}
        </div>

        {showHistogram && (
          <div data-align="right" style={{ width: 250, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
            <span className="hw-readout-label">How many are going how fast</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 54, background: 'var(--paper-alt)', border: '1px solid var(--rule-2)', borderRadius: 4, padding: '4px 6px' }}>
              {ui.bins.map((n, i) => (
                <div key={i} style={{
                  flex: 1, height: `${Math.max(2, (n / peak) * 100)}%`,
                  background: 'var(--accent-bright)', borderRadius: 1, opacity: 0.35 + (i / BINS) * 0.65
                }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>
              Slow on the left, fast on the right. Heating shifts the whole spread — it does not pick one speed.
            </span>
          </div>
        )}
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label={`A box of particles in constant motion. At ${tempF} degrees the average particle moves ${ui.avg.toFixed(2)} times as fast as at room temperature, and there is a spread of speeds at every temperature.`}
      >
        <div style={{
          position: 'absolute', left: '50%', top: 30, marginLeft: -BOX.w / 2 - 3,
          width: BOX.w + 6, height: BOX.h + 6, border: '3px solid var(--machine)', borderRadius: 3,
          background: `oklch(${(0.985 - warmth * 0.03).toFixed(3)} ${(warmth * 0.03).toFixed(3)} 45)`
        }}>
          <canvas ref={canvasRef} width={BOX.w} height={BOX.h} style={{ display: 'block', width: BOX.w, height: BOX.h }} />
        </div>

        <div style={{ position: 'absolute', left: 22, bottom: 14, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          Nothing here is ever still. Not at room temperature, and not in a block of ice.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 280 }}>
          <label htmlFor="hw-temp" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Temperature · {tempF}°F
          </label>
          <input id="hw-temp" type="range" min="-450" max="400" step="5"
            value={tempF} onChange={(e) => setTempF(Number(e.target.value))}
            style={{ width: 280, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[{ l: 'Almost absolute zero', v: -450 }, { l: 'Ice', v: 20 }, { l: 'A cool room', v: 60 }, { l: 'Hot tea', v: 190 }, { l: 'A frying pan', v: 380 }].map((p) => (
            <button key={p.l} className="hw-btn" onClick={() => setTempF(p.v)} style={{ padding: '12px 14px', letterSpacing: '.04em' }}>
              {p.l}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
