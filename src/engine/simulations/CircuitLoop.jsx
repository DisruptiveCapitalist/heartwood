import { useRef, useState, useCallback, useEffect } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Electricity & Energy, Lesson 1. A loop, a battery, a lamp and a switch.
//
// The lesson rests on one comparison the learner has to make with their own
// eyes: the lamp lights the instant the loop closes, and the orange charge they
// are following has gone almost nowhere. Two numbers run side by side to make
// that checkable — seconds since the switch closed, and how far that one charge
// has actually crept, at the speed a real one would.
//
// The dots are drawn thousands of times faster than life. The millimetre
// readout is not: it advances at a genuine drift velocity, which is why it
// stays so embarrassingly small.

const W = 560
const BOX = { x0: 62, y0: 42, x1: 498, y1: 192 }
const TOP = BOX.x1 - BOX.x0
const SIDE = BOX.y1 - BOX.y0
const PERIM = 2 * (TOP + SIDE)
const N = 44

const LAMP_S = TOP / 2                                   // top edge, centre
const SWITCH_S = TOP + SIDE + TOP / 2                     // bottom edge, centre
const BATTERY_S = TOP + SIDE + TOP + SIDE / 2             // left edge, middle
const BEHIND = [[LAMP_S, 34], [SWITCH_S, 36], [BATTERY_S, 30]]

/** Distance s around the loop, clockwise from the top-left corner. */
function pos(s) {
  let t = ((s % PERIM) + PERIM) % PERIM
  if (t < TOP) return { x: BOX.x0 + t, y: BOX.y0 }
  t -= TOP
  if (t < SIDE) return { x: BOX.x1, y: BOX.y0 + t }
  t -= SIDE
  if (t < TOP) return { x: BOX.x1 - t, y: BOX.y1 }
  t -= TOP
  return { x: BOX.x0, y: BOX.y1 - t }
}

const hidden = (s) => BEHIND.some(([at, half]) => {
  const d = Math.abs(((s - at + PERIM * 1.5) % PERIM) - PERIM / 2)
  return Math.abs(PERIM / 2 - d) < half
})

const stateFor = (closed, v) => (!closed ? 'Off' : v <= 3 ? 'Dim' : v <= 7.5 ? 'On' : 'Bright')

export default function CircuitLoop({ active }) {
  const [volts, setVolts] = useState(6)
  const [closed, setClosed] = useState(false)
  const [mark, setMark] = useState(4)
  const [ui, setUi] = useState({ elapsed: 0, travel: 0 })

  const sim = useRef({ offset: 0, elapsed: 0, travel: 0, acc: 0 })
  const dotRefs = useRef([])
  const live = useRef({ volts: 6, closed: false })
  live.current = { volts, closed }

  const slow = useRef(1)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const apply = () => { slow.current = mq?.matches ? 0.3 : 1 }
    apply()
    mq?.addEventListener?.('change', apply)
    return () => mq?.removeEventListener?.('change', apply)
  }, [])

  const step = useCallback((dt) => {
    const s = sim.current
    const { volts: v, closed: on } = live.current

    if (on) {
      s.offset += (v / 12) * 0.03 * slow.current * dt
      s.elapsed += dt
      // A real charge in a real wire. Not slowed down, not sped up.
      s.travel += v * 0.012 * dt
    }

    for (let i = 0; i < N; i++) {
      const p = pos((i / N + s.offset) * PERIM)
      const el = dotRefs.current[i]
      if (el) { el.setAttribute('cx', p.x.toFixed(1)); el.setAttribute('cy', p.y.toFixed(1)) }
    }

    s.acc += dt
    if (s.acc >= 1 / 12) {
      s.acc = 0
      setUi({ elapsed: s.elapsed, travel: s.travel })
    }
  }, [])

  useRafLoop(active, step)

  const toggle = () => {
    if (!closed) { sim.current.elapsed = 0; sim.current.travel = 0; setUi({ elapsed: 0, travel: 0 }) }
    setClosed((c) => !c)
  }

  const markAnother = () => {
    // Somewhere the learner can actually watch it — not tucked behind the lamp,
    // the switch or the battery.
    const base = sim.current.offset
    for (let tries = 0; tries < N; tries++) {
      const i = Math.floor(Math.random() * N)
      if (i !== mark && !hidden((i / N + base) * PERIM)) { setMark(i); sim.current.travel = 0; setUi((u) => ({ ...u, travel: 0 })); return }
    }
  }

  const lamp = stateFor(closed, volts)
  const glow = closed ? volts / 12 : 0
  const note = closed
    ? (ui.elapsed < 4
      ? 'Every charge in the loop started at the same moment. The lamp didn’t wait.'
      : 'The lamp is lit. Your orange charge is nowhere near it — and doesn’t need to be.')
    : (ui.elapsed > 0
      ? 'Loop broken. Every charge stopped at once — the ones in the lamp too.'
      : 'The loop is open. The wire is already full; nothing is moving.')

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">The lamp</span>
          <span className="hw-readout-num" style={{ color: closed ? 'var(--accent)' : 'var(--muted)' }}>{lamp}</span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 220, minHeight: 34, marginTop: 4 }}>
            {note}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <div>
            <div className="hw-readout-label">Since the loop closed</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {ui.elapsed.toFixed(1)}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> sec</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>the lamp needed a hundred-millionth of one</div>
          </div>
          <div>
            <div className="hw-readout-label">Your marked charge has moved</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--accent)' }}>
              {ui.travel.toFixed(2)}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> mm</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>at the speed a real one would creep</div>
          </div>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label={`A circuit loop with a battery, a lamp and a switch. The switch is ${closed ? 'closed and the lamp is lit' : 'open and nothing is moving'}.`}
      >
        <svg viewBox={`0 0 ${W} 234`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '6px 0 auto 0', width: '100%', height: 216 }}>
          {closed && (
            <circle cx={BOX.x0 + TOP / 2} cy={BOX.y0} r={30 + glow * 26} fill="oklch(0.93 0.11 85)" opacity={0.18 + glow * 0.5} />
          )}

          {/* the wire */}
          <rect
            x={BOX.x0} y={BOX.y0} width={TOP} height={SIDE}
            fill="none" stroke="#b9ab94" strokeWidth="7" strokeLinejoin="round"
          />

          {/* the charges, which were in the wire before anything was switched on */}
          <g>
            {Array.from({ length: N }, (_, i) => {
              const p = pos((i / N) * PERIM)
              const isMark = i === mark
              return (
                <circle
                  key={i}
                  ref={(el) => { dotRefs.current[i] = el }}
                  cx={p.x} cy={p.y} r={isMark ? 5.5 : 3.6}
                  fill={isMark ? 'var(--accent)' : 'oklch(0.44 0.10 250)'}
                  stroke={isMark ? 'var(--paper)' : 'none'} strokeWidth={isMark ? 1.6 : 0}
                />
              )
            })}
          </g>

          {/* the lamp */}
          <circle cx={BOX.x0 + TOP / 2} cy={BOX.y0} r="21" fill={closed ? 'oklch(0.93 0.11 85)' : '#f0e9dc'} stroke="var(--machine)" strokeWidth="3" />
          <path d={`M ${BOX.x0 + TOP / 2 - 7} ${BOX.y0 + 5} q 7 -16 14 0`} fill="none" stroke="var(--machine)" strokeWidth="2" />
          <text x={BOX.x0 + TOP / 2} y={BOX.y0 - 30} textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="var(--label)">LAMP</text>

          {/* the battery */}
          <rect x={BOX.x0 - 11} y={BOX.y0 + SIDE / 2 - 17} width="22" height="7" fill="var(--machine)" />
          <rect x={BOX.x0 - 7} y={BOX.y0 + SIDE / 2 - 2} width="14" height="7" fill="var(--machine)" />
          <rect x={BOX.x0 - 11} y={BOX.y0 + SIDE / 2 + 13} width="22" height="7" fill="var(--machine)" />
          <text x={BOX.x0 - 18} y={BOX.y0 + SIDE / 2 - 20} textAnchor="end" fontFamily="var(--sans)" fontSize="13" fill="var(--muted)">+</text>
          <text x={BOX.x0 - 18} y={BOX.y0 + SIDE / 2 + 24} textAnchor="end" fontFamily="var(--sans)" fontSize="13" fill="var(--muted)">−</text>

          {/* the switch */}
          <circle cx={BOX.x0 + TOP / 2 - 24} cy={BOX.y1} r="4" fill="var(--machine)" />
          <circle cx={BOX.x0 + TOP / 2 + 24} cy={BOX.y1} r="4" fill="var(--machine)" />
          <line
            x1={BOX.x0 + TOP / 2 - 24} y1={BOX.y1}
            x2={BOX.x0 + TOP / 2 + (closed ? 24 : 16)} y2={BOX.y1 + (closed ? 0 : -22)}
            stroke="var(--machine)" strokeWidth="5" strokeLinecap="round"
          />
          {!closed && <rect x={BOX.x0 + TOP / 2 - 20} y={BOX.y1 - 3.5} width="40" height="7" fill="var(--paper)" />}
          <text x={BOX.x0 + TOP / 2} y={BOX.y1 + 24} textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="var(--label)">
            {closed ? 'CLOSED' : 'OPEN'}
          </text>
        </svg>

        <div style={{ position: 'absolute', left: 22, bottom: 12, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          The charges here are drawn thousands of times faster than real life. Real ones would take hours to go once around this loop.
        </div>
      </div>

      <div className="hw-controls">
        <button
          className="hw-btn"
          onClick={toggle}
          aria-pressed={closed}
          style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 24px',
            borderColor: 'var(--ink)', background: closed ? 'var(--ink)' : 'var(--paper)',
            color: closed ? '#f6f1e7' : 'var(--ink)'
          }}
        >
          {closed ? 'OPEN THE SWITCH' : 'CLOSE THE SWITCH'}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 210 }}>
          <label htmlFor="hw-volts" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Battery push · {volts.toFixed(1)} volts
          </label>
          <input id="hw-volts" type="range" min="1.5" max="12" step="1.5"
            value={volts} onChange={(e) => setVolts(Number(e.target.value))}
            style={{ width: 210, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <button className="hw-btn" onClick={markAnother}>MARK A NEW CHARGE</button>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 270, textAlign: 'right' }}>
          Watch the lamp and your orange charge at the same time.
        </span>
      </div>
    </div>
  )
}
