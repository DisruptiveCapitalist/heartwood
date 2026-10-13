import { useRef, useState, useCallback, useEffect } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Electricity & Energy, Week 1. One circuit, seen five ways.
//
//   drift  (Lesson 1) the lamp is instant; the charges crawl
//   break  (Lesson 2) cut it anywhere and everything stops everywhere
//   push   (Lesson 3) stack batteries; the push changes, the stuff does not
//   flow   (Lesson 4) three meters round the loop, all reading the same
//   resist (Lesson 5) same current through cord and element — only one glows
//
// Underneath all five is one line of physics, Ohm's law, and every mode reads
// its numbers off that same line. That is deliberate: five lessons that each
// invented their own arithmetic could quietly contradict each other, and a
// caption fighting its own simulation is the worst failure available here.
//
// Lesson 1, in detail: it rests on one comparison the learner has to make with
// their own eyes — the lamp lights the instant the loop closes, and the orange
// charge they are following has gone almost nowhere. Two numbers run side by
// side to make that checkable. The dots are drawn thousands of times faster
// than life; the millimetre readout is not, which is why it stays so
// embarrassingly small.

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

// --- the one line of physics ------------------------------------------------
const LAMP_OHMS = 12          // the lamp, on its own
const CORD_OHMS = 0.3         // the fat wire that feeds it — small, not zero
const FULL_WATTS = 12         // 12 V across the lamp: the brightest this gets

// A heated element, as a first-order lag towards a power-dependent steady
// temperature. Tuned so a few ohms glows and a dozen does not, which is the
// whole of Lesson 5.
const AMBIENT_F = 70
const DEG_PER_WATT = 30
const THERMAL_TAU = 2.2
const GLOW_F = 800

/** The modes this component serves, exported so a lesson that names one with a
 *  typo fails in the test suite rather than quietly rendering Lesson 1's lamp
 *  underneath Lesson 5's copy. */
export const MODES = ['drift', 'break', 'push', 'flow', 'resist']

const START = {
  drift: { volts: 6, closed: false },
  break: { volts: 6, closed: true },
  push: { volts: 1.5, closed: true },
  flow: { volts: 6, closed: true },
  resist: { volts: 12, closed: true }
}

// Lesson 4's three meters: either side of the lamp, and round the far side.
const METERS = [
  { s: TOP * 0.21, label: 'BEFORE THE LAMP' },
  { s: TOP * 0.79, label: 'AFTER THE LAMP' },
  { s: TOP + SIDE * 0.52, label: 'FAR SIDE' }
]

// Lesson 2's eight places to cut, all on clear straight runs.
const CUTS = [
  { s: TOP * 0.14, where: 'the top wire, left of the lamp' },
  { s: TOP * 0.86, where: 'the top wire, right of the lamp' },
  { s: TOP + SIDE * 0.3, where: 'the right-hand wire' },
  { s: TOP + SIDE * 0.7, where: 'the right-hand wire, low down' },
  { s: TOP + SIDE + TOP * 0.14, where: 'the bottom wire, right of the switch' },
  { s: TOP + SIDE + TOP * 0.86, where: 'the bottom wire, left of the switch' },
  { s: TOP + SIDE + TOP + SIDE * 0.18, where: 'the left-hand wire, below the battery' },
  { s: TOP + SIDE + TOP + SIDE * 0.82, where: 'the left-hand wire, above the battery' }
]

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

/** Which way the wire runs at s — needed to draw a gap across it. */
function axisAt(s) {
  let t = ((s % PERIM) + PERIM) % PERIM
  if (t < TOP) return 'h'
  t -= TOP
  if (t < SIDE) return 'v'
  t -= SIDE
  return t < TOP ? 'h' : 'v'
}

const hidden = (s) => BEHIND.some(([at, half]) => {
  const d = Math.abs(((s - at + PERIM * 1.5) % PERIM) - PERIM / 2)
  return Math.abs(PERIM / 2 - d) < half
})

// Lesson 1 described the lamp by voltage, which only worked while the lamp was
// the only thing in the loop. These are the same four words at the same four
// places, restated in watts so every mode can share them.
const stateFor = (on, watts) =>
  (!on ? 'Off' : watts <= 0.75 ? 'Dim' : watts <= 4.7 ? 'On' : 'Bright')

/** Charges past a fixed point since the switch closed. Differs between points
 *  by at most one — whichever charge happens to be mid-gate. */
const crossings = (offset, s) => {
  const phase = N - (s / PERIM) * N
  return Math.max(0, Math.floor(offset * N + phase) - Math.floor(phase))
}

export default function CircuitLoop({ active, mode = 'drift' }) {
  const init = START[mode] ?? START.drift
  const [volts, setVolts] = useState(init.volts)
  const [closed, setClosed] = useState(init.closed)
  const [mark, setMark] = useState(4)
  const [cut, setCut] = useState(null)                  // break mode
  const [element, setElement] = useState(3)             // resist mode, ohms
  const [ui, setUi] = useState({ elapsed: 0, travel: 0, offset: 0, tEl: AMBIENT_F, tCord: AMBIENT_F })

  const isResist = mode === 'resist'
  const load = isResist ? element + CORD_OHMS : LAMP_OHMS
  const flowing = closed && cut == null
  const amps = flowing ? volts / load : 0
  const wattsEl = amps * amps * (isResist ? element : LAMP_OHMS)
  const wattsCord = amps * amps * CORD_OHMS
  const cells = Math.round(volts / 1.5)

  const sim = useRef({ offset: 0, elapsed: 0, travel: 0, acc: 0, tEl: AMBIENT_F, tCord: AMBIENT_F })
  const dotRefs = useRef([])
  const live = useRef({})
  live.current = { amps, flowing, wattsEl, wattsCord, isResist }

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
    const { amps: a, flowing: on, wattsEl, wattsCord, isResist } = live.current

    if (on) {
      // The charges move with the current, not the voltage. At a fixed lamp
      // those are proportional, so Lesson 1 looks exactly as it always did —
      // and in Lesson 5 a bigger element visibly slows them, which is the point.
      s.offset += a * 0.03 * slow.current * dt
      s.elapsed += dt
      // A real charge in a real wire. Not slowed down, not sped up.
      s.travel += a * 0.144 * dt
    }

    if (isResist) {
      const k = 1 - Math.exp(-dt / THERMAL_TAU)
      s.tEl += (AMBIENT_F + DEG_PER_WATT * wattsEl - s.tEl) * k
      s.tCord += (AMBIENT_F + DEG_PER_WATT * wattsCord - s.tCord) * k
    }

    for (let i = 0; i < N; i++) {
      const p = pos((i / N + s.offset) * PERIM)
      const el = dotRefs.current[i]
      if (el) { el.setAttribute('cx', p.x.toFixed(1)); el.setAttribute('cy', p.y.toFixed(1)) }
    }

    s.acc += dt
    if (s.acc >= 1 / 12) {
      s.acc = 0
      setUi({ elapsed: s.elapsed, travel: s.travel, offset: s.offset, tEl: s.tEl, tCord: s.tCord })
    }
  }, [])

  useRafLoop(active, step)

  const resetClock = () => { sim.current.elapsed = 0; setUi((u) => ({ ...u, elapsed: 0 })) }

  const toggle = () => {
    if (!closed) { sim.current.elapsed = 0; sim.current.travel = 0; setUi((u) => ({ ...u, elapsed: 0, travel: 0 })) }
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

  const lamp = stateFor(flowing, wattsEl)
  const glow = flowing ? Math.min(1, (isResist ? wattsEl / 40 : wattsEl / FULL_WATTS)) : 0
  const elGlow = Math.max(0, Math.min(1, (ui.tEl - GLOW_F) / 700))

  const note = (() => {
    if (mode === 'break') {
      return cut
        ? `Broken at ${cut.where}. Every charge in the loop stopped — including the ones inside the lamp, on the other side of the gap.`
        : (closed
          ? 'Complete. Click the wire anywhere you like and see how much of the loop stops.'
          : 'The switch is open — which is just a tidy, deliberate break in the same loop.')
    }
    if (mode === 'push') {
      return `${cells} cell${cells === 1 ? '' : 's'}, ${volts.toFixed(1)} volts of push. The loop still holds exactly ${N} charges — it held that many before you touched anything.`
    }
    if (mode === 'flow') {
      return 'Three meters, three places. Compare the readings before and after the lamp.'
    }
    if (mode === 'resist') {
      return ui.tEl > GLOW_F
        ? 'The element is glowing. The cord feeding it carries exactly the same current and is barely warm.'
        : 'Same current through both. Squeeze the element thinner and watch which one gets hot.'
    }
    return closed
      ? (ui.elapsed < 4
        ? 'Every charge in the loop started at the same moment. The lamp didn’t wait.'
        : 'The lamp is lit. Your orange charge is nowhere near it — and doesn’t need to be.')
      : (ui.elapsed > 0
        ? 'Loop broken. Every charge stopped at once — the ones in the lamp too.'
        : 'The loop is open. The wire is already full; nothing is moving.')
  })()

  const big = { fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }
  const unit = { fontSize: 13, fontWeight: 500, color: 'var(--label)' }
  const sub = { fontSize: 12, color: 'var(--muted)' }

  const Stat = ({ label, value, u, foot, accent }) => (
    <div>
      <div className="hw-readout-label">{label}</div>
      <div style={{ ...big, color: accent ? 'var(--accent)' : undefined }}>
        {value}<span style={unit}> {u}</span>
      </div>
      {foot && <div style={sub}>{foot}</div>}
    </div>
  )

  const cutPos = cut ? pos(cut.s) : null
  const cutAxis = cut ? axisAt(cut.s) : 'h'

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{isResist ? 'The element' : 'The lamp'}</span>
          <span className="hw-readout-num" style={{ color: flowing ? 'var(--accent)' : 'var(--muted)' }}>
            {isResist ? (ui.tEl > GLOW_F ? 'Glowing' : flowing ? 'Warm' : 'Cold') : lamp}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 230, minHeight: 34, marginTop: 4 }}>
            {note}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'drift' && <>
            <Stat label="Since the loop closed" value={ui.elapsed.toFixed(1)} u="sec"
              foot="the lamp needed a hundred-millionth of one" />
            <Stat label="Your marked charge has moved" value={ui.travel.toFixed(2)} u="mm" accent
              foot="at the speed a real one would creep" />
          </>}

          {mode === 'break' && <>
            <Stat label="The loop" value={flowing ? 'Complete' : 'Open'} u=""
              foot={cut ? 'one gap, anywhere, is enough' : 'unbroken, all the way round'} />
            <Stat label="Charges moving" value={flowing ? 'All 44' : 'None'} u="" accent
              foot="everywhere in the loop, or nowhere" />
          </>}

          {mode === 'push' && <>
            <Stat label="The push" value={volts.toFixed(1)} u="volts" accent
              foot={`${cells} cell${cells === 1 ? '' : 's'} end to end`} />
            <Stat label="Charges in the loop" value={N} u=""
              foot="unchanged by anything you just did" />
            <Stat label="Going past each second" value={amps.toFixed(2)} u="amps"
              foot="more push, more flow — same charges" />
          </>}

          {mode === 'flow' && <>
            <Stat label="Current, at every meter" value={amps.toFixed(2)} u="amps" accent
              foot="charge past a point each second" />
            <Stat label="One charge is crawling at" value={(amps * 0.144).toFixed(2)} u="mm/sec"
              foot="how much goes by, not how fast" />
          </>}

          {mode === 'resist' && <>
            <Stat label="Element" value={element.toFixed(1)} u="ohms"
              foot={`${wattsEl.toFixed(1)} watts of heat`} />
            <Stat label="Current, through both" value={amps.toFixed(2)} u="amps" accent
              foot="the cord and the element, identical" />
            <Stat label="Element temperature" value={Math.round(ui.tEl)} u="°F"
              foot={`cord: ${Math.round(ui.tCord)} °F`} />
          </>}
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label={`A circuit loop with a battery, a ${isResist ? 'heating element' : 'lamp'} and a switch. ${
          flowing ? 'The loop is complete and charge is moving.' : cut ? `The wire is cut at ${cut.where} and nothing is moving.` : 'The switch is open and nothing is moving.'
        }`}
      >
        <svg viewBox={`0 0 ${W} 234`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '6px 0 auto 0', width: '100%', height: 216 }}>
          {!isResist && flowing && (
            <circle cx={BOX.x0 + TOP / 2} cy={BOX.y0} r={30 + glow * 26} fill="oklch(0.93 0.11 85)" opacity={0.18 + glow * 0.5} />
          )}
          {isResist && elGlow > 0 && (
            <rect x={BOX.x0 + TOP / 2 - 34} y={BOX.y0 - 16} width="68" height="32" rx="14"
              fill={`oklch(${0.55 + elGlow * 0.3} ${0.17 + elGlow * 0.04} ${28 + elGlow * 38})`} opacity={0.2 + elGlow * 0.45} />
          )}

          {/* the wire — fat in Lesson 5, where its thickness is the lesson */}
          <rect
            x={BOX.x0} y={BOX.y0} width={TOP} height={SIDE}
            fill="none" stroke="#b9ab94" strokeWidth={isResist ? 11 : 7} strokeLinejoin="round"
          />

          {/* the charges, which were in the wire before anything was switched on */}
          <g>
            {Array.from({ length: N }, (_, i) => {
              const p = pos((i / N) * PERIM)
              const isMark = mode === 'drift' && i === mark
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

          {/* the lamp, or Lesson 5's thin element in its place */}
          {isResist ? <>
            <rect x={BOX.x0 + TOP / 2 - 30} y={BOX.y0 - 8} width="60" height="16" fill="var(--paper)" />
            <path
              d={`M ${BOX.x0 + TOP / 2 - 30} ${BOX.y0} ${Array.from({ length: 8 }, (_, i) =>
                `l 3.75 ${i % 2 ? 7 : -7}`).join(' ')} l 0 0 L ${BOX.x0 + TOP / 2 + 30} ${BOX.y0}`}
              fill="none"
              stroke={elGlow > 0 ? `oklch(${0.6 + elGlow * 0.3} ${0.19 + elGlow * 0.03} ${30 + elGlow * 40})` : 'var(--machine)'}
              strokeWidth="3" strokeLinejoin="round"
            />
            <text x={BOX.x0 + TOP / 2} y={BOX.y0 - 24} textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="var(--label)">THIN ELEMENT</text>
            <text x={BOX.x1 + 14} y={BOX.y0 + SIDE / 2 - 4} fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">FAT CORD</text>
            <text x={BOX.x1 + 14} y={BOX.y0 + SIDE / 2 + 13} fontFamily="var(--sans)" fontSize="13" style={{ fontVariantNumeric: 'tabular-nums' }} fill="var(--muted)">{Math.round(ui.tCord)} °F</text>
          </> : <>
            <circle cx={BOX.x0 + TOP / 2} cy={BOX.y0} r="21" fill={flowing ? 'oklch(0.93 0.11 85)' : '#f0e9dc'} stroke="var(--machine)" strokeWidth="3" />
            <path d={`M ${BOX.x0 + TOP / 2 - 7} ${BOX.y0 + 5} q 7 -16 14 0`} fill="none" stroke="var(--machine)" strokeWidth="2" />
            <text x={BOX.x0 + TOP / 2} y={BOX.y0 - 30} textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="var(--label)">LAMP</text>
          </>}

          {/* the battery — one cell per 1.5 volts once Lesson 3 starts stacking */}
          {mode === 'push' ? (
            Array.from({ length: cells }, (_, i) => {
              const y = BOX.y0 + SIDE / 2 - (cells - 1) * 9 + i * 18
              return <g key={i}>
                <rect x={BOX.x0 - 12} y={y - 5} width="24" height="5" fill="var(--machine)" />
                <rect x={BOX.x0 - 7} y={y + 3} width="14" height="5" fill="var(--machine)" />
              </g>
            })
          ) : <>
            <rect x={BOX.x0 - 11} y={BOX.y0 + SIDE / 2 - 17} width="22" height="7" fill="var(--machine)" />
            <rect x={BOX.x0 - 7} y={BOX.y0 + SIDE / 2 - 2} width="14" height="7" fill="var(--machine)" />
            <rect x={BOX.x0 - 11} y={BOX.y0 + SIDE / 2 + 13} width="22" height="7" fill="var(--machine)" />
          </>}
          <text x={BOX.x0 - 18} y={BOX.y0 + SIDE / 2 - 20} textAnchor="end" fontFamily="var(--sans)" fontSize="13" fill="var(--muted)">+</text>
          <text x={BOX.x0 - 18} y={BOX.y0 + SIDE / 2 + 24} textAnchor="end" fontFamily="var(--sans)" fontSize="13" fill="var(--muted)">−</text>

          {/* Lesson 4's meters. Drawn over the charges, so each one reads the
              traffic at exactly one point. */}
          {mode === 'flow' && METERS.map((m, i) => {
            const p = pos(m.s)
            const vert = axisAt(m.s) === 'v'
            return <g key={i}>
              <rect x={p.x - 25} y={p.y - 15} width="50" height="30" rx="5"
                fill="var(--paper)" stroke="var(--machine)" strokeWidth="2.5" />
              <text x={p.x} y={p.y + 5} textAnchor="middle" fontFamily="var(--sans)" fontSize="14" fontWeight="600" style={{ fontVariantNumeric: 'tabular-nums' }} fill="var(--ink)">{amps.toFixed(2)}</text>
              <text x={vert ? p.x - 32 : p.x} y={vert ? p.y + 4 : p.y - 21} textAnchor={vert ? 'end' : 'middle'}
                fontFamily="var(--sans)" fontSize="9.5" fontWeight="700" letterSpacing="1" fill="var(--label)">{m.label}</text>
              <text x={vert ? p.x - 32 : p.x} y={vert ? p.y + 18 : p.y + 27} textAnchor={vert ? 'end' : 'middle'}
                fontFamily="var(--sans)" fontSize="10.5" style={{ fontVariantNumeric: 'tabular-nums' }} fill="var(--muted)">{crossings(ui.offset, m.s)} gone by</text>
            </g>
          })}

          {/* the switch */}
          <circle cx={BOX.x0 + TOP / 2 - 24} cy={BOX.y1} r="4" fill="var(--machine)" />
          <circle cx={BOX.x0 + TOP / 2 + 24} cy={BOX.y1} r="4" fill="var(--machine)" />
          <line
            x1={BOX.x0 + TOP / 2 - 24} y1={BOX.y1}
            x2={BOX.x0 + TOP / 2 + (closed ? 24 : 16)} y2={BOX.y1 + (closed ? 0 : -22)}
            stroke="var(--machine)" strokeWidth="5" strokeLinecap="round"
          />
          {!closed && <rect x={BOX.x0 + TOP / 2 - 20} y={BOX.y1 - 5.5} width="40" height="11" fill="var(--paper)" />}
          <text x={BOX.x0 + TOP / 2} y={BOX.y1 + 24} textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.5" fill="var(--label)">
            {closed ? 'CLOSED' : 'OPEN'}
          </text>

          {/* Lesson 2: eight places the learner can cut, and the gap it leaves */}
          {mode === 'break' && <g>
            {CUTS.map((c, i) => {
              const p = pos(c.s)
              const vert = axisAt(c.s) === 'v'
              return <rect
                key={i}
                x={p.x - (vert ? 11 : 20)} y={p.y - (vert ? 20 : 11)}
                width={vert ? 22 : 40} height={vert ? 40 : 22}
                rx="4" fill="transparent" style={{ cursor: 'pointer' }}
                onClick={() => { setCut(c); resetClock() }}
              >
                <title>Cut the wire at {c.where}</title>
              </rect>
            })}
            {!cut && CUTS.map((c, i) => {
              const p = pos(c.s)
              return <circle key={`h${i}`} cx={p.x} cy={p.y} r="9" fill="none"
                stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" pointerEvents="none" />
            })}
            {cutPos && <g pointerEvents="none">
              <rect
                x={cutPos.x - (cutAxis === 'v' ? 7 : 9)} y={cutPos.y - (cutAxis === 'v' ? 9 : 7)}
                width={cutAxis === 'v' ? 14 : 18} height={cutAxis === 'v' ? 18 : 14}
                fill="var(--paper)"
              />
              <path
                d={cutAxis === 'v'
                  ? `M ${cutPos.x - 6} ${cutPos.y - 8} l 12 3 M ${cutPos.x - 6} ${cutPos.y + 8} l 12 -3`
                  : `M ${cutPos.x - 8} ${cutPos.y - 6} l 3 12 M ${cutPos.x + 8} ${cutPos.y - 6} l -3 12`}
                stroke="oklch(0.55 0.19 28)" strokeWidth="3" strokeLinecap="round"
              />
            </g>}
          </g>}
        </svg>

        <div style={{ position: 'absolute', left: 22, bottom: 12, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {mode === 'resist'
            ? 'The cord and the element are the same circuit, carrying the same current. Only the thin one glows.'
            : mode === 'flow'
              ? 'Each meter counts the charges passing that one spot. Nothing is consumed on the way round.'
              : 'The charges here are drawn thousands of times faster than real life. Real ones would take hours to go once around this loop.'}
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'break' ? (
          <button
            className="hw-btn" onClick={() => { setCut(null); resetClock() }} disabled={!cut}
            style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 24px',
              borderColor: 'var(--ink)', background: cut ? 'var(--ink)' : 'var(--paper)',
              color: cut ? '#f6f1e7' : 'var(--muted)', opacity: cut ? 1 : 0.6
            }}
          >
            MEND THE WIRE
          </button>
        ) : (
          <button
            className="hw-btn" onClick={toggle} aria-pressed={closed}
            style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 24px',
              borderColor: 'var(--ink)', background: closed ? 'var(--ink)' : 'var(--paper)',
              color: closed ? '#f6f1e7' : 'var(--ink)'
            }}
          >
            {closed ? 'OPEN THE SWITCH' : 'CLOSE THE SWITCH'}
          </button>
        )}

        {mode === 'push' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="hw-btn" onClick={() => setVolts((v) => Math.max(1.5, v - 1.5))} disabled={cells <= 1} aria-label="Take a cell out">− CELL</button>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, minWidth: 86, textAlign: 'center' }}>
              {cells} × 1.5 V
            </span>
            <button className="hw-btn" onClick={() => setVolts((v) => Math.min(12, v + 1.5))} disabled={cells >= 8} aria-label="Add a cell">ADD A CELL</button>
          </div>
        ) : mode === 'resist' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 230 }}>
            <label htmlFor="hw-ohms" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Element · {element.toFixed(1)} ohms
            </label>
            <input id="hw-ohms" type="range" min="1.5" max="12" step="0.5"
              value={element} onChange={(e) => setElement(Number(e.target.value))}
              style={{ width: 230, accentColor: 'var(--accent)', height: 28 }} />
          </div>
        ) : mode === 'break' ? (
          <span style={{ fontFamily: 'var(--sans)', fontSize: 13.5, color: 'var(--ink)' }}>
            Click the wire at any of the marked spots to cut it.
          </span>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 210 }}>
            <label htmlFor="hw-volts" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Battery push · {volts.toFixed(1)} volts
            </label>
            <input id="hw-volts" type="range" min="1.5" max="12" step="1.5"
              value={volts} onChange={(e) => setVolts(Number(e.target.value))}
              style={{ width: 210, accentColor: 'var(--accent)', height: 28 }} />
          </div>
        )}

        {mode === 'drift' && <button className="hw-btn" onClick={markAnother}>MARK A NEW CHARGE</button>}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 270, textAlign: 'right' }}>
          {mode === 'drift' ? 'Watch the lamp and your orange charge at the same time.'
            : mode === 'break' ? 'Try the far side of the lamp. Then the near side.'
              : mode === 'push' ? 'Watch which number changes and which one refuses to.'
                : mode === 'flow' ? 'Read the two meters either side of the lamp.'
                  : 'Thin element, big heat. Same current either way.'}
        </span>
      </div>
    </div>
  )
}
