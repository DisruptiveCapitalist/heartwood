import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Lesson 3. Roll a ball and watch where it stops.
//
// The thing to notice is not that it stops — it is that the *surface* decides
// where, and the *mass* does not. Rolling resistance is proportional to weight,
// so the deceleration comes out as mu * g with the mass cancelling out, exactly
// the way it cancelled for the two dropped balls in Lesson 1. A heavier ball on
// carpet stops in the same place as a light one, which nobody believes until
// they have put two pins on the floor.
//
// Each run leaves a pin where the ball stopped, and the pins stay, so the four
// surfaces can be compared side by side rather than remembered.

const G = 32.2                 // ft/s²
const SCENE_FEET = 30          // how much floor is visible
const BALL_FT = 0.7            // drawn diameter, in scene feet

const SURFACES = [
  { id: 'ice',    label: 'Ice',    mu: 0.010, fill: '#dbe9ef', edge: '#b9d2dc' },
  { id: 'wood',   label: 'Wood',   mu: 0.040, fill: '#e8d9bd', edge: '#cbb491' },
  { id: 'carpet', label: 'Carpet', mu: 0.100, fill: '#ddd2c4', edge: '#bfae99' },
  { id: 'grass',  label: 'Grass',  mu: 0.180, fill: '#d4dcc3', edge: '#b2bd9b' }
]

const READOUT_HZ = 12

export default function RollingBall({ active }) {
  const sim = useRef({ x: 0, v: 0, rolling: false, mu: SURFACES[1].mu, acc: 0 })
  const ballRef = useRef(null)
  const [surface, setSurface] = useState(SURFACES[1])
  const [speed, setSpeed] = useState(4)      // ft/s
  const [mass, setMass] = useState(1)        // lb — deliberately makes no difference
  const [ui, setUi] = useState({ x: 0, v: 0, rolling: false, gone: false })
  const [pins, setPins] = useState([])

  const predicted = (v, mu) => (v * v) / (2 * mu * G)

  const step = useCallback((dt) => {
    const s = sim.current
    if (!s.rolling) return

    const a = s.mu * G
    s.v = Math.max(0, s.v - a * dt)
    s.x += s.v * dt

    if (ballRef.current) {
      ballRef.current.style.left = `${(Math.min(s.x, SCENE_FEET) / SCENE_FEET) * 100}%`
      ballRef.current.style.transform = `rotate(${(s.x / (Math.PI * BALL_FT)) * 360}deg)`
    }

    if (s.v <= 0.001) {
      s.rolling = false
      s.v = 0
      const stoppedAt = s.x
      setUi({ x: stoppedAt, v: 0, rolling: false, gone: stoppedAt > SCENE_FEET })
      setPins((prev) => {
        const next = prev.filter((p) => p.id !== s.surfaceId)
        return [...next, { id: s.surfaceId, label: s.surfaceLabel, feet: stoppedAt, edge: s.surfaceEdge }]
      })
      return
    }

    s.acc += dt
    if (s.acc >= 1 / READOUT_HZ) {
      s.acc = 0
      setUi({ x: s.x, v: s.v, rolling: true, gone: s.x > SCENE_FEET })
    }
  }, [])

  useRafLoop(active, step)

  const roll = () => {
    const s = sim.current
    s.x = 0
    s.v = speed
    s.mu = surface.mu
    s.surfaceId = surface.id
    s.surfaceLabel = surface.label
    s.surfaceEdge = surface.edge
    s.rolling = true
    setUi({ x: 0, v: speed, rolling: true, gone: false })
  }

  const clear = () => {
    const s = sim.current
    s.rolling = false; s.x = 0; s.v = 0
    if (ballRef.current) { ballRef.current.style.left = '0%'; ballRef.current.style.transform = 'none' }
    setPins([])
    setUi({ x: 0, v: 0, rolling: false, gone: false })
  }

  const note = ui.rolling
    ? (ui.gone ? 'Off the end of the room, still rolling.' : 'Rolling. The floor is taking the motion, a little at a time.')
    : ui.x > 0
      ? (ui.gone
        ? `It left the room. It would go about ${predicted(speed, surface.mu).toFixed(0)} feet in all.`
        : `Stopped after ${ui.x.toFixed(1)} feet.`)
      : 'Pick a floor, then roll it.'

  const ballPx = 34 + (mass - 1) * 5

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Distance</span>
          <span className="hw-readout-num" style={{ color: 'var(--ink)' }}>
            {ui.x > SCENE_FEET ? `${SCENE_FEET}+` : ui.x.toFixed(1)}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> ft</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 210, minHeight: 34 }}>
            {note}
          </span>
        </div>

        <div data-align="right" style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
          <span className="hw-readout-label">Where it stopped</span>
          {pins.length === 0 ? (
            <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>
              Roll on one floor, then another. The pins stay.
            </span>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {pins.slice().sort((a, b) => b.feet - a.feet).map((p) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, fontSize: 12.5, color: 'var(--ink-2)' }}>
                  <span>{p.label}</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 58, color: 'var(--muted)' }}>
                    {p.feet > SCENE_FEET ? 'off the end' : `${p.feet.toFixed(1)} ft`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label={`A ball rolling across ${surface.label.toLowerCase()}. It slows and stops; the floor decides where.`}
      >
        {/* the floor */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 78, background: surface.fill, borderTop: `1px solid ${surface.edge}` }} />
        {/* a ruler, so distance is something you can see rather than only read */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 58, height: 20 }}>
          {[0, 5, 10, 15, 20, 25, 30].map((ft) => (
            <div key={ft} style={{ position: 'absolute', left: `${(ft / SCENE_FEET) * 100}%`, bottom: 0 }}>
              <div style={{ width: 1, height: 7, background: surface.edge }} />
              <span style={{ position: 'absolute', left: 3, bottom: -2, fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--muted)' }}>{ft}</span>
            </div>
          ))}
        </div>

        {/* pins from earlier runs */}
        {pins.filter((p) => p.feet <= SCENE_FEET).map((p) => (
          <div key={p.id} style={{ position: 'absolute', bottom: 78, left: `${(p.feet / SCENE_FEET) * 100}%` }}>
            <div style={{ width: 2, height: 46, background: p.edge }} />
            <span style={{
              position: 'absolute', bottom: 48, left: -2, whiteSpace: 'nowrap',
              fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '.08em',
              color: 'var(--muted)', textTransform: 'uppercase'
            }}>
              {p.label}
            </span>
          </div>
        ))}

        <div
          ref={ballRef}
          style={{
            position: 'absolute', bottom: 78, left: '0%', width: ballPx, height: ballPx,
            marginLeft: -ballPx / 2, borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: 'inset -4px -5px 0 rgba(0,0,0,.18)'
          }}
        >
          {/* one stripe, so the rolling is visible and not just a sliding disc */}
          <div style={{ position: 'absolute', top: '50%', left: 3, right: 3, height: 2, marginTop: -1, background: 'rgba(255,253,247,.65)' }} />
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {SURFACES.map((s) => {
            const on = s.id === surface.id
            return (
              <button
                key={s.id}
                className="hw-btn"
                onClick={() => setSurface(s)}
                aria-pressed={on}
                style={{
                  padding: '12px 16px', letterSpacing: '.06em',
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 170 }}>
          <label htmlFor="hw-roll-speed" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Push · {speed.toFixed(1)} ft/s
          </label>
          <input id="hw-roll-speed" type="range" min="1" max="6" step="0.5"
            value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
            style={{ width: 170, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 170 }}>
          <label htmlFor="hw-roll-mass" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Ball · {mass.toFixed(1)} lb
          </label>
          <input id="hw-roll-mass" type="range" min="0.5" max="5" step="0.5"
            value={mass} onChange={(e) => setMass(Number(e.target.value))}
            style={{ width: 170, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <button className="hw-btn hw-btn-solid" onClick={roll} style={{ padding: '13px 24px' }}>ROLL IT</button>
        <button className="hw-btn" onClick={clear}>CLEAR PINS</button>
      </div>
    </div>
  )
}
