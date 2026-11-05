import { useMemo, useState } from 'react'
import {
  lonFromSeconds, lonMiles, nmPerDegLon, clockDrift, lunarLonNm,
  METRES_PER_NS, circleCross, disagreement, solveWithClock,
  aimOff, offsetFor, naismith, cone, endRadius,
  DAY_POINTS, dayLegs, planPoint, challenge
} from '../../lib/voyage.js'

// Navigation, Lessons 26 to 30 — the last week.
//
//   'clock'      longitude is a clock, and so is a satellite       (Lesson 26)
//   'aim'        aiming off, and what it costs                    (Lesson 27)
//   'assay'      latitude is flat, longitude rots                 (Lesson 28)
//   'route'      a day's plan, and where the fix goes              (Lesson 29)
//   'challenge'  four measurements, one of them wrong             (Lesson 30)
//
// EVERYTHING QUOTED IN THE COPY IS COMPUTED IN src/lib/voyage.js AND CHECKED IN
// src/__tests__/voyage.test.js. The findings that drove the week:
//
//   Longitude is bought with time at a brutal exchange rate. One second of
//   clock error is a quarter of a nautical mile at the Equator; a clock losing
//   ten seconds a day — a good domestic clock of the period — is two hundred
//   miles out by Jamaica. Harrison's H4 lost 5.1 seconds in eighty-one days,
//   which this arithmetic makes 1.27 miles and the contemporary account made
//   1.25: the sum and the source agree.
//
//   A satellite receiver does the same thing with light, which goes 0.2998
//   metres in a nanosecond. It has no good clock, so it does not know the time
//   — it solves for it, as an extra unknown, which is why it needs one more
//   satellite than there are dimensions. A microsecond of unsolved clock error
//   is 300 metres of range and, on this geometry, 354 metres of position.
//
//   Aiming off does NOT save walking. At every error size the walk along the
//   stream is longer than the straight-ahead miss would have been. What it buys
//   is the sign: seven degrees of deliberate offset makes the side 99% certain
//   and costs nine yards on a 1,200-yard leg.
//
//   Latitude error does not grow with the length of a voyage and longitude
//   error does. That is the whole asymmetry, it holds for every tradition, and
//   a chronometer is the only thing that ever changed it: 0.7 miles a day
//   against the reckoning's 5.
//
//   On a day's walk it matters far more WHERE you take your one fix than
//   whether you take one. The same fix is worth 84 yards at the first landmark
//   and 780 at the last.
//
//   And the set of evidence that agrees best with itself can be the set that is
//   most wrong — two lines and a circle will pass through a point and look
//   immaculate while being 123 yards out.

export const MODES = ['clock', 'aim', 'assay', 'route', 'challenge']

const PAPER = '#f5efe3'
const RED = 'oklch(0.46 0.15 25)'
const GREEN = 'oklch(0.50 0.12 155)'
const BLUE = 'oklch(0.44 0.13 255)'

const W = 760
const H = 560

// As on the Week 5 sheet: .hw-readouts floats over the top of the stage, and
// this drawing fills the picture, so the readout text would otherwise start on
// the very edge of the paper. Scoped here rather than changed in the
// stylesheet, which five finished courses depend on.
const READOUT_INSET = { paddingInline: 14 }
const r0 = (n) => Math.round(n)
const r1 = (n) => Math.round(n * 10) / 10
const num = (n) => r0(n).toLocaleString('en-US')

/* ---- small shared furniture -------------------------------------------- */

function Readout({ label, value, note, colour, width = 240, align }) {
  return (
    <div data-align={align} style={{
      width, display: 'flex', flexDirection: 'column', gap: 3,
      textAlign: align === 'right' ? 'right' : 'left'
    }}>
      <span className="hw-readout-label" style={{ textWrap: 'balance' }}>{label}</span>
      <span className="hw-readout-num" style={colour ? { color: colour } : undefined}>{value}</span>
      {note && <span style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.45 }}>{note}</span>}
    </div>
  )
}

function Pick({ options, value, onChange, label, multi = false }) {
  return (
    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
      {label && <span className="hw-readout-label">{label}</span>}
      {options.map((o) => {
        const on = multi ? value.includes(o.id) : o.id === value
        return (
          <button key={o.id} className="hw-btn" aria-pressed={on} onClick={() => onChange(o.id)}
            style={{
              padding: '9px 12px', fontSize: 12.5,
              background: on ? 'var(--ink)' : 'var(--paper)',
              color: on ? '#f6f1e7' : 'var(--ink)',
              borderColor: on ? 'var(--ink)' : 'var(--field)'
            }}>{o.name}</button>
        )
      })}
    </div>
  )
}

function Slider({ id, label, min, max, step = 1, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: '1 1 220px' }}>
      <label htmlFor={id} className="hw-readout-label" style={{ letterSpacing: '.14em' }}>{label}</label>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
    </div>
  )
}

function Toggle({ on, onClick, children }) {
  return (
    <button className="hw-btn" aria-pressed={on} onClick={onClick}
      style={{
        padding: '10px 14px', fontSize: 12.5,
        background: on ? 'var(--accent-wash)' : 'var(--paper)',
        borderColor: on ? 'var(--accent)' : 'var(--field)'
      }}>{children}</button>
  )
}

/** A label with a halo, so it stays readable over a line or a grid. */
function Tag({ x, y, children, colour = 'var(--ink)', size = 12, anchor = 'middle', weight = 600 }) {
  return (
    <text x={x} y={y} textAnchor={anchor}
      style={{ fontFamily: 'var(--sans)', fontSize: size, fontWeight: weight, fill: colour }}>
      <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>{children}</tspan>
    </text>
  )
}

function Frame({ children, label, h = H, bg = PAPER }) {
  return (
    <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label={label}>
      <rect x="0" y="0" width={W} height={h} rx="6" fill={bg} />
      {children}
    </svg>
  )
}

const Stage = ({ children }) => (
  <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
    {children}
  </div>
)

// `flexWrap: 'nowrap'` is load-bearing and looks like noise. The stylesheet
// gives .hw-controls `flex-wrap: wrap`, which is right for its default row
// direction; turning the direction to column without also turning the wrap off
// makes a multi-line column flex container, and those inflate their lines — 47
// px of sliders came out 114 px tall, leaving a 67 px band of nothing between
// the sliders and the buttons underneath them. Measured, not guessed: setting
// the container to nowrap in the page collapsed the row to 47.
const Controls = ({ children }) => (
  <div className="hw-controls hw-controls-stack"
    style={{ flexDirection: 'column', alignItems: 'stretch', flexWrap: 'nowrap', gap: 12 }}>{children}</div>
)

/* ---- Lesson 26, first face — a clock at sea ---------------------------- */

// The 1761 passage, near enough: out from the Canaries and across the trades to
// the West Indies. Longitude is drawn in degrees because a clock error IS a
// fixed number of degrees; what it costs in miles depends on the latitude, and
// the slider makes that the learner's discovery rather than a sentence.
const DEPART = -16.6 // Canaries
const ARRIVE = -59.6 // Barbados
const SPAN = [-10, -70]
const KNOTS_PER_DAY = 100

const lonX = (lon) => W - ((-lon - -SPAN[0]) / (-SPAN[1] - -SPAN[0])) * W

function ClockAtSea() {
  const [rate, setRate] = useState(10)
  const [days, setDays] = useState(20)
  const [lat, setLat] = useState(20)

  const perDeg = nmPerDegLon(lat)
  const runDeg = (KNOTS_PER_DAY * days) / perDeg
  const trueLon = Math.max(SPAN[1] + 1.5, DEPART - runDeg)
  // A clock that LOSES time reads Greenwich earlier than it is, so local time
  // minus the clock is too big, so the longitude comes out too far EAST.
  const slip = clockDrift(rate, days)
  const offDeg = lonFromSeconds(slip)
  const thinkLon = trueLon + offDeg
  const offMiles = lonMiles(slip, lat)

  const y = 222
  const xTrue = lonX(trueLon)
  const xThink = lonX(thinkLon)
  // The danger case, and the reason the sign is worth a paragraph: believing
  // you are east of where you are means believing the island is still ahead.
  const passed = trueLon < ARRIVE && thinkLon > ARRIVE

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="YOUR CLOCK IS OUT BY" value={`${num(slip)} s`} width={190}
          note={`${rate} s a day for ${days} days — and nothing on board can tell you`} />
        <Readout label="WHICH IS THIS MUCH LONGITUDE" value={`${r1(offDeg)}°`} width={210}
          note={`four minutes to the degree, whatever the latitude`} />
        <Readout align="right" width={290} label="AND THIS MANY MILES"
          value={`${num(offMiles)} nm`} colour={offMiles > 60 ? RED : GREEN}
          note={`at ${lat}° of latitude, where a degree of longitude is ${r1(perDeg)} miles. Your latitude, meanwhile, is out by nothing at all: you measured it this noon.`} />
      </div>

      <Stage>
        <Frame h={410} label={`A chart of the Atlantic between 10 and 70 degrees west. After ${days} days the ship is at ${r1(-trueLon)} degrees west, and a clock ${slip} seconds slow puts the reckoned position ${r1(offDeg)} degrees — ${r0(offMiles)} nautical miles — to the east of it.`}>
          {/* meridians */}
          {Array.from({ length: 13 }, (_, i) => -10 - i * 5).map((lon) => (
            <g key={lon}>
              <line x1={lonX(lon)} y1="92" x2={lonX(lon)} y2="352"
                stroke="var(--ink)" strokeWidth={lon % 10 === 0 ? 1.1 : 0.6} opacity="0.22" />
              {lonX(lon) > 22 && lonX(lon) < W - 22 && (
                <Tag x={lonX(lon)} y={374} size={11} weight={500} colour="var(--ink-2)">{`${-lon}°W`}</Tag>
              )}
            </g>
          ))}
          {/* the parallel being sailed */}
          <line x1="0" y1={y} x2={W} y2={y} stroke="var(--ink)" strokeWidth="1.6" opacity="0.5" strokeDasharray="10 7" />
          <Tag x={W - 16} y={y - 12} anchor="end" size={11.5} colour="var(--ink-2)" weight={700}>
            {`the parallel of ${lat}° N — measured every clear noon, and it never drifts`}
          </Tag>

          {/* the two ports */}
          {[[DEPART, `the Canaries`], [ARRIVE, `Barbados`]].map(([lon, name]) => (
            <g key={name}>
              <circle cx={lonX(lon)} cy={y} r="7" fill="var(--ink)" />
              <Tag x={lonX(lon)} y={y + 26} size={12.5}>{name}</Tag>
            </g>
          ))}

          {/* the band of longitude the clock could have put you in */}
          <rect x={Math.min(xTrue, xThink)} y={y - 62} width={Math.abs(xThink - xTrue)} height="124"
            fill={RED} fillOpacity="0.13" stroke={RED} strokeWidth="1" strokeOpacity="0.4" />

          <line x1={lonX(DEPART)} y1={y} x2={xTrue} y2={y} stroke={GREEN} strokeWidth="3" />
          <circle cx={xTrue} cy={y} r="8" fill={GREEN} />
          <Tag x={xTrue} y={y + 50} colour={GREEN}>you are actually here</Tag>
          <path d={`M ${xThink - 9} ${y - 9} L ${xThink + 9} ${y + 9} M ${xThink - 9} ${y + 9} L ${xThink + 9} ${y - 9}`}
            stroke={RED} strokeWidth="3" />
          <Tag x={xThink} y={y - 76} colour={RED}>the plot says here</Tag>
          {Math.abs(xThink - xTrue) > 26 && (
            <Tag x={(xThink + xTrue) / 2} y={y + 80} colour={RED} size={12.5} weight={700}>
              {`${num(offMiles)} nm east of the truth`}
            </Tag>
          )}

          {passed && (
            <g>
              <rect x="60" y="112" width="400" height="56" rx="5" fill={RED} fillOpacity="0.15"
                stroke={RED} strokeWidth="1.2" />
              <Tag x="260" y="137" colour={RED} size={13} weight={700}>You have sailed past Barbados.</Tag>
              <Tag x="260" y="156" colour={RED} size={12} weight={500}>The plot still says it is ahead of you.</Tag>
            </g>
          )}
        </Frame>
      </Stage>

      <Controls>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-rate" label={`Your clock loses ${rate} s a day`} min={0} max={30} step={0.5}
            value={rate} onChange={setRate} />
          <Slider id="hw-days" label={`${days} days out, at ${KNOTS_PER_DAY} miles a day`} min={1} max={40} step={1}
            value={days} onChange={setDays} />
          <Slider id="hw-lat" label={`Sailing the parallel of ${lat}° N`} min={0} max={60} step={5}
            value={lat} onChange={setLat} />
        </div>
        <div className="hw-actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Toggle on={rate === 0.063} onClick={() => setRate(0.063)}>HARRISON'S H4 — 0.06 s A DAY</Toggle>
          <Toggle on={rate === 3} onClick={() => setRate(3)}>A GOOD CHRONOMETER — 3 s</Toggle>
          <Toggle on={rate === 10} onClick={() => setRate(10)}>A GOOD HOUSE CLOCK — 10 s</Toggle>
          <Toggle on={rate === 30} onClick={() => setRate(30)}>A POCKET WATCH — 30 s</Toggle>
        </div>
      </Controls>
    </>
  )
}

/* ---- Lesson 26, second face — the same sum with light ------------------- */

// Three ranging stations rather than four satellites, because the page is flat:
// in two dimensions you need three measurements to find two coordinates and the
// clock, and in three you need four. The scale is 20 metres to the pixel, so
// these stations are six kilometres off rather than twenty thousand — the
// geometry is the point, not the altitude.
// `dy` is where the name sits. Station A's goes BELOW its dot: the first
// readout's note is four lines deep at this width and printed over a label
// above it, which only a full-size screenshot showed.
const STATIONS = [
  { x: 96, y: 112, name: `station A`, dy: 26 },
  { x: 664, y: 148, name: `station B`, dy: -15 },
  { x: 520, y: 470, name: `station C`, dy: -15 }
]
const TRUE_AT = { x: 320, y: 318 }
const M_PER_PX = 20

function ClockAsUnknown() {
  const [ns, setNs] = useState(1000)
  const [solved, setSolved] = useState(false)

  const biasM = ns * METRES_PER_NS
  const biasPx = biasM / M_PER_PX
  const trueRanges = STATIONS.map((s) => Math.hypot(s.x - TRUE_AT.x, s.y - TRUE_AT.y))
  const ranges = trueRanges.map((r) => r + biasPx)

  const sol = useMemo(() => solveWithClock(STATIONS, ranges, 200), [ns])
  // How far from meeting the three circles are, in metres, before anything is
  // solved for: the number that says "no such place exists".
  const missM = disagreement(STATIONS, ranges, 0) * M_PER_PX
  const solvedNs = sol ? (sol.clock * M_PER_PX) / METRES_PER_NS : 0
  const naive = circleCross(STATIONS[0], ranges[0], STATIONS[1], ranges[1])
  const picked = naive.length
    ? naive.reduce((a, b) =>
      Math.hypot(a.x - TRUE_AT.x, a.y - TRUE_AT.y) < Math.hypot(b.x - TRUE_AT.x, b.y - TRUE_AT.y) ? a : b)
    : null
  const naiveOut = picked ? Math.hypot(picked.x - TRUE_AT.x, picked.y - TRUE_AT.y) * M_PER_PX : null

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="YOUR CLOCK IS OUT BY" value={`${num(ns)} ns`} width={185}
          note={`so every range is ${num(biasM)} m long — light goes ${METRES_PER_NS.toFixed(4)} m in a nanosecond, which is very nearly a foot`} />
        <Readout label="THE THREE CIRCLES MISS BY" value={solved ? `0 m` : `${num(missM)} m`}
          width={205} colour={solved ? GREEN : missM > 1 ? RED : GREEN}
          note={solved
            ? `because one correction — the one below — brought them to a point`
            : `there is no place at all that is all three of those distances away`} />
        <Readout align="right" width={300}
          label={solved ? `SO THE CLOCK ERROR MUST BE` : `IGNORE IT AND THE FIX IS OUT BY`}
          value={solved ? `${num(solvedNs)} ns` : `${num(naiveOut ?? 0)} m`}
          colour={solved ? GREEN : RED}
          note={solved
            ? `nobody measured that. It came out of the arithmetic, along with the position — which is why the receiver needs a fourth satellite and not a better clock.`
            : `more than the ${num(biasM)} m of range error, because the geometry multiplies it`} />
      </div>

      <Stage>
        <Frame h={540} label={`Three ranging stations and three circles of position. A clock error of ${ns} nanoseconds makes every measured range ${r0(biasM)} metres too long, so the three circles do not meet. Solving for the clock error brings them to a point.`}>
          {STATIONS.map((s, i) => (
            <g key={s.name}>
              <circle cx={s.x} cy={s.y} r={ranges[i]} fill="none" stroke={RED} strokeWidth="1.8"
                strokeDasharray="7 5" opacity="0.85" />
              {solved && (
                <circle cx={s.x} cy={s.y} r={ranges[i] - sol.clock} fill="none" stroke={GREEN}
                  strokeWidth="2" opacity="0.9" />
              )}
              <circle cx={s.x} cy={s.y} r="7" fill="var(--ink)" />
              <Tag x={s.x} y={s.y + s.dy} size={12.5}>{s.name}</Tag>
            </g>
          ))}
          {!solved && picked && (
            <>
              <path d={`M ${picked.x - 9} ${picked.y - 9} L ${picked.x + 9} ${picked.y + 9} M ${picked.x - 9} ${picked.y + 9} L ${picked.x + 9} ${picked.y - 9}`}
                stroke={RED} strokeWidth="3" />
              <line x1={picked.x} y1={picked.y} x2={picked.x - 90} y2={picked.y + 62}
                stroke={RED} strokeWidth="1.2" strokeDasharray="3 3" />
              <Tag x={picked.x - 96} y={picked.y + 70} anchor="end" colour={RED}>
                two circles, taken at their word
              </Tag>
            </>
          )}
          <circle cx={TRUE_AT.x} cy={TRUE_AT.y} r="7" fill={GREEN} />
          <circle cx={TRUE_AT.x} cy={TRUE_AT.y} r="15" fill="none" stroke={GREEN} strokeWidth="2" opacity="0.6" />
          <Tag x={TRUE_AT.x} y={TRUE_AT.y - 28} colour={GREEN}>where you actually are</Tag>
          <g transform={`translate(28 ${508})`}>
            <line x1="0" y1="0" x2={1000 / M_PER_PX} y2="0" stroke="var(--ink)" strokeWidth="3" />
            <Tag x={25} y={-10} anchor="start" size={11} weight={500} colour="var(--ink-2)">one kilometre</Tag>
          </g>
        </Frame>
      </Stage>

      <Controls>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Slider id="hw-ns" label={`Receiver clock ${ns > 0 ? 'slow' : ns < 0 ? 'fast' : 'exact'} by ${Math.abs(ns)} ns`}
            min={-1500} max={1500} step={50} value={ns} onChange={(v) => { setNs(v); setSolved(false) }} />
          <div className="hw-actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Toggle on={solved} onClick={() => setSolved((s) => !s)}>
              {solved ? `TAKE THE RANGES AT THEIR WORD AGAIN` : `SOLVE FOR THE CLOCK`}
            </Toggle>
          </div>
        </div>
      </Controls>
    </>
  )
}

function TheClock() {
  const [tab, setTab] = useState('sea')
  return (
    <>
      {tab === 'sea' ? <ClockAtSea /> : <ClockAsUnknown />}
      <Controls>
        <Pick label="SHOW ME" value={tab} onChange={setTab} options={[
          { id: 'sea', name: `A clock at sea` },
          { id: 'light', name: `The same sum, with light` }
        ]} />
      </Controls>
    </>
  )
}

/* ---- Lesson 27 — aiming off -------------------------------------------- */

const SHOTS = 160

function AimOff() {
  const [range, setRange] = useState(1200)
  const [sigma, setSigma] = useState(3)
  const [offset, setOffset] = useState(0)

  const stats = useMemo(() => aimOff({ range, sigma, offset, n: 20000, seed: 11 }), [range, sigma, offset])
  const shots = useMemo(() => {
    const a = aimOff({ range, sigma, offset, n: SHOTS, seed: 4 })
    return a.landings
  }, [range, sigma, offset])

  const yTop = 150
  const yFrom = 505
  const k = (yFrom - yTop) / range // px per yard, true in both directions
  const target = { x: 360, y: yTop }
  const start = { x: target.x, y: yFrom }
  const px = (yd) => yd * k
  const aimed = { x: target.x + px(range * Math.tan((offset * Math.PI) / 180)), y: yTop }
  const edge = (deg) => target.x + px(range * Math.tan((deg * Math.PI) / 180))
  const best = offsetFor(sigma, 0.99)

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="YOU LAND ON THE SIDE YOU CHOSE" width={225}
          value={offset === 0 ? `a coin toss` : `${r1(stats.pKnownSide * 100)}%`}
          colour={offset === 0 ? RED : stats.pKnownSide > 0.98 ? GREEN : undefined}
          note={offset === 0
            ? `aim straight at the bridge and you arrive beside it on a side you have no way of knowing`
            : `so you turn ${offset > 0 ? 'left' : 'right'} along the stream and walk until you meet it`} />
        <Readout label="THEN WALK ALONG THE STREAM" value={`${num(stats.meanWalk)} yd`} width={200}
          note={`on average; ${num(stats.p90Walk)} yards nineteen times in twenty`} />
        <Readout align="right" width={290}
          label={offset === 0 ? `AND THE BANK YOU MIGHT SEARCH IS` : `AND THE DETOUR ITSELF COSTS`}
          value={offset === 0 ? `${num(stats.blindSpan)} yd` : `${num(stats.meanExtra)} yd`}
          colour={offset === 0 ? RED : GREEN}
          note={offset === 0
            ? `long, and you will not know which end of it to start from. There is no detour to pay for, because you have not made one.`
            : `on a ${num(range)}-yard leg. That is what certainty of side costs: the long thin triangle's hypotenuse is barely longer than its long side.`} />
      </div>

      <Stage>
        <Frame label={`A walk of ${range} yards to a footbridge on a stream. Aiming off by ${offset} degrees puts the arrival ${r0(stats.meanWalk)} yards along the stream from the bridge, on the chosen side ${r1(stats.pKnownSide * 100)} per cent of the time.`}>
          {/* the stream */}
          <path d={`M 0 ${yTop} C 140 ${yTop - 16}, 260 ${yTop + 14}, 400 ${yTop - 6} S 640 ${yTop + 12}, ${W} ${yTop - 4}`}
            fill="none" stroke={BLUE} strokeWidth="7" opacity="0.5" />
          <Tag x={40} y={yTop - 24} anchor="start" size={12} colour={BLUE} weight={700}>
            the stream — you cannot miss it
          </Tag>

          {/* the cone of where you might arrive */}
          <polygon points={`${start.x},${start.y} ${edge(offset - 2 * sigma)},${yTop} ${edge(offset + 2 * sigma)},${yTop}`}
            fill={RED} fillOpacity="0.08" />

          <line x1={start.x} y1={start.y} x2={target.x} y2={target.y}
            stroke="var(--ink-3)" strokeWidth="1.5" strokeDasharray="4 5" />
          <line x1={start.x} y1={start.y} x2={aimed.x} y2={aimed.y} stroke="var(--ink)" strokeWidth="2.5" />

          {/* where you actually arrive */}
          {shots.map((x, i) => (
            <circle key={i} cx={target.x + px(x)} cy={yTop + ((i % 7) - 3) * 2.2} r="3"
              fill={offset !== 0 && Math.sign(x) === Math.sign(offset) ? GREEN : RED} fillOpacity="0.65" />
          ))}

          <g>
            <rect x={target.x - 15} y={yTop - 9} width="30" height="18" rx="3" fill={PAPER}
              stroke="var(--ink)" strokeWidth="2" />
            <Tag x={target.x} y={yTop - 44} size={13} weight={700}>the footbridge</Tag>
          </g>

          <circle cx={start.x} cy={start.y} r="7" fill="var(--ink)" />
          <Tag x={start.x} y={start.y + 26}>you set off from here, {num(range)} yards away</Tag>
          {offset !== 0 && (
            <Tag x={(start.x + aimed.x) / 2 + (offset > 0 ? 54 : -54)} y={(yTop + yFrom) / 2}
              size={12.5} weight={700}>{`aimed ${Math.abs(offset)}° ${offset > 0 ? 'right' : 'left'}`}</Tag>
          )}
          <Tag x={W - 24} y={yTop + 46} anchor="end" size={11.5} weight={500} colour="var(--ink-2)">
            {`${SHOTS} walks, each with ${sigma}° of error on the course held`}
          </Tag>
        </Frame>
      </Stage>

      <Controls>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-off" label={`Aim off by ${offset > 0 ? '+' : ''}${offset}°`} min={-16} max={16} step={1}
            value={offset} onChange={setOffset} />
          <Slider id="hw-sig" label={`You hold a course to about ${sigma}°`} min={1} max={6} step={0.5}
            value={sigma} onChange={setSigma} />
          <Slider id="hw-rng" label={`The stream is ${num(range)} yards away`} min={400} max={2000} step={100}
            value={range} onChange={setRange} />
        </div>
        <div className="hw-actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Toggle on={offset === 0} onClick={() => setOffset(0)}>AIM STRAIGHT AT IT</Toggle>
          <Toggle on={offset === Math.round(best)} onClick={() => setOffset(Math.round(best))}>
            {`AIM OFF ${Math.round(best)}° — 99% SURE OF THE SIDE`}
          </Toggle>
        </div>
      </Controls>
    </>
  )
}

/* ---- Lesson 28 — latitude is flat, longitude rots ---------------------- */

// A kit is an INSTRUMENT and nothing else. It used to carry its own quality
// of dead reckoning too — 5% of the run for the first two and 3% for the last
// two — and that was wrong twice over. It produced two figures in the lesson
// that could not be reconciled, because "150 miles by day 30" belonged to one
// kit and "3 miles a day" to another and neither said so; and it falsified the
// lesson's own claim, since stepping from the kamal to the sextant then
// changed the CLIMBING line as well as the flat one, with no clock involved.
//
// The reckoning is now one figure for every kit, set by the learner, so that
// changing the kit moves only what the kit can move.
export const NAVIGATORS = [
  { id: 'eye', name: `By eye and a log line`, arcmin: 60, rate: null },
  { id: 'kamal', name: `A kamal, no clock`, arcmin: 30, rate: null },
  { id: 'lunars', name: `A sextant and the Moon`, arcmin: 2, rate: null, lunars: true },
  { id: 'chron', name: `A sextant and a chronometer`, arcmin: 2, rate: 3, lunars: true }
]

function Assay() {
  const [who, setWho] = useState('eye')
  const [days, setDays] = useState(30)
  const [lat, setLat] = useState(20)
  // How good the reckoning is, as a fraction of the distance run. The same for
  // every kit, because the lesson's claim is about what a kit CAN change.
  const [reckon, setReckon] = useState(5)

  const nav = NAVIGATORS.find((n) => n.id === who)
  const run = KNOTS_PER_DAY
  const drPerDay = (reckon / 100) * run

  const latErr = nav.arcmin // one arcminute of altitude is one mile of latitude
  const drAt = (d) => drPerDay * d
  const chronAt = (d) => (nav.rate === null ? null : lonMiles(clockDrift(nav.rate, d), lat))
  const lunarErr = nav.lunars ? lunarLonNm(nav.arcmin, lat) : null

  const top = 220
  const x0 = 70
  const x1 = W - 40
  const y0 = 430
  // The plot top, and it is set by the readouts rather than by taste: they
  // are an absolutely positioned overlay on the stage and three lines of note
  // reach this far down, so the day marker's caption sits just above here.
  const y1 = 130
  const X = (d) => x0 + (d / 40) * (x1 - x0)
  const Y = (nm) => y0 - Math.min(1, nm / top) * (y0 - y1)
  const path = (f) => Array.from({ length: 81 }, (_, i) => i / 2)
    .map((d) => `${d ? 'L' : 'M'} ${X(d).toFixed(1)} ${Y(f(d)).toFixed(1)}`).join(' ')

  // Four lines that cross a movable vertical marker and each other cannot all
  // be labelled where they run: on the chronometer kit the latitude line sits
  // at 2 miles and the chronometer's climbs from 0 through 28, so anything
  // written beside one is written across the other. So the curves are named in
  // a legend instead, in the upper left, which is empty in all four kits — and
  // the legend is drawn last, on its own patch of paper, so the day marker
  // passes behind it rather than through it.
  const legend = [
    { colour: GREEN, text: `latitude, from the sky — flat for ever` },
    { colour: RED, text: `longitude, by reckoning alone` },
    ...(lunarErr !== null
      ? [{
        // "about", because the figure is what this kit's sextant and this
        // parallel give, not a constant of the method; and the full "never
        // improves" rather than "flat", because a flat 51 could be read as
        // always exactly 51 rather than as not growing with the voyage.
        colour: 'var(--accent)',
        dash: '9 6',
        text: `longitude, by the Moon — about ${num(lunarErr)} miles, and it never improves`
      }]
      : []),
    ...(nav.rate !== null ? [{ colour: BLUE, text: `longitude, by the chronometer` }] : [])
  ]
  const legendTop = 140
  // Wide enough for the longest row it is actually showing: the Moon's line
  // carries a number and the others do not, so a fixed width is either too
  // wide for two kits or too narrow for the other two. 6.75 px a character is
  // measured off the rendered 12.5 px bold sans, with the swatch and padding
  // added.
  const legendWidth = Math.max(...legend.map((r) => r.text.length)) * 6.6 + 56

  const lonNow = Math.min(...[drAt(days), lunarErr, chronAt(days)].filter((v) => v !== null))

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="AFTER THE PASSAGE, YOUR LATITUDE IS" value={`${num(latErr)} nm`} width={215}
          colour={GREEN} note={`out — and it was the same on day one. You can check it every clear night, so it never gets worse.`} />
        <Readout label="YOUR LONGITUDE IS" value={`${num(lonNow)} nm`} width={165}
          colour={lonNow > 60 ? RED : lonNow > 20 ? undefined : GREEN}
          note={`out, by the best means you have`} />
        <Readout align="right" width={300} label="SO EAST AND WEST IS WORSE BY"
          value={`${r1(lonNow / Math.max(latErr, 0.01))}×`}
          // Kept to three lines. The readouts are an absolutely positioned
          // overlay on the stage, so a fourth line reaches down into the chart
          // and lands on the day marker's caption. The figure this note used to
          // carry — that the Moon only beats the reckoning after 17 days — is
          // in the lesson's own copy, which has room for it.
          note={nav.rate === null
            ? (nav.lunars
              ? `and the reckoning adds ${r1(drPerDay)} miles a day. Only the Moon checks it, at about ${num(lunarErr)}.`
              : `and the reckoning adds ${r1(drPerDay)} miles a day, which nothing you can observe checks.`)
            : `and only a clock ever changed that: ${r1(lonMiles(clockDrift(nav.rate, 1), lat))} miles a day against the reckoning's ${r1(drPerDay)}.`} />
      </div>

      <Stage>
        <Frame h={500} label={`A graph of position error in nautical miles against days at sea. The latitude line is flat. The dead-reckoning longitude line climbs steadily. A chronometer's line climbs far more slowly, and the lunar-distance line is flat but high.`}>
          {/* grid */}
          {[0, 50, 100, 150, 200].map((nm) => (
            <g key={nm}>
              <line x1={x0} y1={Y(nm)} x2={x1} y2={Y(nm)} stroke="var(--ink)" strokeWidth="0.7" opacity="0.18" />
              <Tag x={x0 - 10} y={Y(nm) + 4} anchor="end" size={11} weight={500} colour="var(--ink-2)">{nm}</Tag>
            </g>
          ))}
          {[0, 10, 20, 30, 40].map((d) => (
            <g key={d}>
              <line x1={X(d)} y1={y1} x2={X(d)} y2={y0} stroke="var(--ink)" strokeWidth="0.7" opacity="0.18" />
              <Tag x={X(d)} y={y0 + 22} size={11} weight={500} colour="var(--ink-2)">{d}</Tag>
            </g>
          ))}
          <Tag x={(x0 + x1) / 2} y={y0 + 44} size={12} weight={700} colour="var(--ink-2)">days at sea</Tag>
          <Tag x={x0 - 42} y={(y0 + y1) / 2} size={12} weight={700} colour="var(--ink-2)">miles</Tag>

          {/* today, drawn under everything so the labels' halos cut it */}
          <line x1={X(days)} y1={y1} x2={X(days)} y2={y0 + 6} stroke="var(--ink)" strokeWidth="1.6" opacity="0.6" />
          {/* Sits as low as it can without entering the plot: the readouts
              float over the stage and the longest of the four notes reaches
              down to here. Measured at 1,500 px — 21 px of clearance. */}
          <Tag x={X(days)} y={y1 - 4} size={12} weight={700}>{`day ${days}`}</Tag>

          {/* dead reckoning */}
          <path d={path(drAt)} fill="none" stroke={RED} strokeWidth="2.6" />

          {/* lunars */}
          {lunarErr !== null && (
            <>
              <path d={path(() => lunarErr)} fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeDasharray="9 6" />
            </>
          )}
          {/* chronometer */}
          {nav.rate !== null && (
            <>
              <path d={path((d) => chronAt(d))} fill="none" stroke={BLUE} strokeWidth="2.6" />

            </>
          )}
          {/* latitude */}
          <path d={path(() => latErr)} fill="none" stroke={GREEN} strokeWidth="3" />
          {/* the legend, last and opaque */}
          <rect x={X(1.2) - 12} y={legendTop - 16} width={legendWidth} height={legend.length * 20 + 10}
            rx="5" fill={PAPER} opacity="0.94" />
          {legend.map((row, i) => (
            <g key={row.text} transform={`translate(${X(1.2)} ${legendTop + i * 20})`}>
              <line x1="0" y1="-4" x2="26" y2="-4" stroke={row.colour} strokeWidth="3"
                strokeDasharray={row.dash} />
              <Tag x={36} y={0} anchor="start" size={12.5} weight={700} colour={row.colour}>{row.text}</Tag>
            </g>
          ))}

        </Frame>
      </Stage>

      <Controls>
        <Pick label="WHAT YOU HAVE WITH YOU" options={NAVIGATORS} value={who} onChange={setWho} />
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-adays" label={`${days} days at sea, ${num(days * run)} miles run`} min={1} max={40} step={1}
            value={days} onChange={setDays} />
          <Slider id="hw-alat" label={`On the parallel of ${lat}° — a degree of longitude is ${r1(nmPerDegLon(lat))} miles here`}
            min={0} max={60} step={5} value={lat} onChange={setLat} />
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-adr" label={`The reckoning is good to ${reckon}% of the distance run — ${r1(drPerDay)} miles a day`}
            min={1} max={8} step={1} value={reckon} onChange={setReckon} />
        </div>
      </Controls>
    </>
  )
}

/* ---- the plan Lessons 29 and 30 share ---------------------------------- */

const PLAN_PX = 180
const planX = (e) => 70 + (e - 0.25) * PLAN_PX
const planY = (n) => 510 - (n - 0.30) * PLAN_PX
const YD_PX = PLAN_PX / 1760

function PlanSheet({ children, label, lit = [], marks = DAY_POINTS.slice(0, 7) }) {
  return (
    <Frame label={label}>
      <defs>
        <clipPath id="hw-plan"><rect x="0" y="0" width={W} height={H} rx="6" /></clipPath>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`v${i}`} x1={70 + i * PLAN_PX} y1="0" x2={70 + i * PLAN_PX} y2={H}
          stroke="var(--ink)" strokeWidth="0.8" opacity="0.18" />
      ))}
      {[0, 1, 2].map((i) => (
        <line key={`h${i}`} x1="0" y1={510 - i * PLAN_PX} x2={W} y2={510 - i * PLAN_PX}
          stroke="var(--ink)" strokeWidth="0.8" opacity="0.18" />
      ))}
      <g transform="translate(700 150)">
        <line x1="0" y1="26" x2="0" y2="-14" stroke="var(--ink)" strokeWidth="2.5" />
        <path d="M 0 -22 l -7 12 l 14 0 z" fill="var(--ink)" />
        <Tag x={0} y={44} size={11} weight={700}>TRUE N</Tag>
      </g>
      <g transform={`translate(${W - 230} ${H - 24})`}>
        {/* A position line can run anywhere, and on Lesson 30 one runs straight
            through here. The bar gets a patch of paper to sit on. */}
        <rect x="-14" y="-26" width={PLAN_PX + 28} height="38" rx="5" fill={PAPER} opacity="0.94" />
        <Tag x={PLAN_PX / 2} y={-11} size={11.5} weight={500} colour="var(--ink-2)">one mile</Tag>
        <line x1="0" y1="0" x2={PLAN_PX} y2="0" stroke="var(--ink)" strokeWidth="3" />
        {[0, PLAN_PX / 2, PLAN_PX].map((x) => (
          <line key={x} x1={x} y1="-5" x2={x} y2="5" stroke="var(--ink)" strokeWidth="1.5" />
        ))}
      </g>
      <g clipPath="url(#hw-plan)">{children}</g>
      {marks.map((p) => {
        const on = lit.includes(p.id)
        return (
          <g key={p.id} opacity={on || !lit.length ? 1 : 0.45}>
            <circle cx={planX(p.e)} cy={planY(p.n)} r={on ? 8 : 6} fill="var(--ink)" />
            <Tag x={planX(p.e)} y={planY(p.n) - 16} size={12.5} weight={on ? 700 : 500}>
              {p.name.replace(/^the /, '')}
            </Tag>
          </g>
        )
      })}
    </Frame>
  )
}

/* ---- Lesson 29 — a day's plan ------------------------------------------ */

function Route() {
  const [sigma, setSigma] = useState(3)
  const [pace, setPace] = useState(5)
  const [systematic, setSystematic] = useState(false)
  const [fixes, setFixes] = useState([])

  const legs = useMemo(
    () => dayLegs().map((l, i) => ({ ...l, fix: fixes.includes(i) })),
    [fixes]
  )
  const rows = cone(legs, { sigma, pace: pace / 100, systematic })
  const miles = legs.reduce((t, l) => t + l.miles, 0)
  const hours = naismith(miles, legs.reduce((t, l) => t + l.feetUp, 0))
  const end = endRadius(rows)
  const none = endRadius(cone(dayLegs(), { sigma, pace: pace / 100, systematic }))

  const toggle = (i) => setFixes((f) => (f.includes(i) ? f.filter((j) => j !== i) : [...f, i]))

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="THE DAY IS" value={`${r1(miles)} mi`} width={150}
          note={`and ${num(legs.reduce((t, l) => t + l.feetUp, 0))} feet of climb`} />
        <Readout label="WHICH NAISMITH CALLS" value={`${r1(hours)} h`} width={175}
          note={`${r1(miles / 3)} for the distance and ${r1(legs.reduce((t, l) => t + l.feetUp, 0) / 2000)} for the climb`} />
        <Readout align="right" width={350} label="AND YOU GET BACK TO CAMP KNOWING WHERE YOU ARE TO"
          value={`${num(end)} yd`} colour={end > 300 ? RED : end > 120 ? undefined : GREEN}
          note={fixes.length === 0
            ? `with no fix taken all day. Tap a landmark below to stand on it and fix your position there.`
            : `with ${fixes.length === 1 ? 'one fix' : `${fixes.length} fixes`} taken — ${num(none - end)} yards better than taking none. Only the LAST fix bounds where the day ends.`} />
      </div>

      <Stage>
        <PlanSheet label={`A plan of a day's circuit, ${r1(miles)} miles and ${r1(hours)} hours, with the error cone drawn growing along it and collapsing wherever a fix is taken. It ends ${r0(end)} yards wide.`}>
          {/* the cone */}
          {rows.map((r, i) => (
            <circle key={`c${i}`} cx={planX(r.to.e)} cy={planY(r.to.n)} r={Math.max(2, r.radius * YD_PX)}
              fill={r.fix ? GREEN : RED} fillOpacity={r.fix ? 0.18 : 0.12}
              stroke={r.fix ? GREEN : RED} strokeWidth="1" strokeOpacity="0.45" />
          ))}
          {/* the route */}
          <path d={DAY_POINTS.map((p, i) => `${i ? 'L' : 'M'} ${planX(p.e)} ${planY(p.n)}`).join(' ')}
            fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          {rows.map((r, i) => (
            <Tag key={`t${i}`} x={(planX(r.from.e) + planX(r.to.e)) / 2}
              y={(planY(r.from.n) + planY(r.to.n)) / 2 - 6} size={11.5} weight={700} colour="var(--ink-2)">
              {`${r1(r.miles)} mi`}
            </Tag>
          ))}
          <circle cx={planX(DAY_POINTS[0].e)} cy={planY(DAY_POINTS[0].n)} r="9" fill={GREEN} />
          <Tag x={planX(DAY_POINTS[0].e) + 14} y={planY(DAY_POINTS[0].n) + 22} anchor="start" colour={GREEN}>
            start and finish
          </Tag>
        </PlanSheet>
      </Stage>

      <Controls>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="hw-readout-label">FIX YOUR POSITION AT</span>
          {dayLegs().map((l, i) => i < 6 && (
            <button key={i} className="hw-btn" aria-pressed={fixes.includes(i)} onClick={() => toggle(i)}
              style={{
                padding: '9px 12px', fontSize: 12.5,
                background: fixes.includes(i) ? 'var(--ink)' : 'var(--paper)',
                color: fixes.includes(i) ? '#f6f1e7' : 'var(--ink)',
                borderColor: fixes.includes(i) ? 'var(--ink)' : 'var(--field)'
              }}>{l.to.name.replace(/^the /, '')}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Slider id="hw-rs" label={`You hold a course to ${sigma}°`} min={1} max={6} step={0.5}
            value={sigma} onChange={setSigma} />
          <Slider id="hw-rp" label={`Your pace count is good to ${pace}%`} min={2} max={15} step={1}
            value={pace} onChange={setPace} />
          <div className="hw-actions">
            <Toggle on={systematic} onClick={() => setSystematic((s) => !s)}>
              {systematic ? `ERRORS THAT WOBBLE EACH LEG` : `ERRORS THAT LEAN THE SAME WAY ALL DAY`}
            </Toggle>
          </div>
        </div>
      </Controls>
    </>
  )
}

/* ---- Lesson 30 — four measurements, one of them wrong ------------------ */

const DROPS = [
  { id: 'none', name: `Trust all four` },
  { id: 'tower', name: `Distrust the fire tower bearing` },
  { id: 'quarry', name: `Distrust the quarry bearing` },
  { id: 'pond', name: `Distrust the pond bearing` },
  { id: 'pace', name: `Distrust the pace count` }
]

function Challenge() {
  const [drop, setDrop] = useState('none')
  const c = useMemo(() => challenge(), [])
  const result = drop === 'none' ? c.all : c.dropping.find((d) => d.drop === drop)
  const kept = c.evidence.filter((e) => e.id !== drop)
  const truth = { x: c.truth.e, y: -c.truth.n }
  const fix = result.at
  const toPx = (p) => ({ x: planX(p.x), y: planY(-p.y) })
  const fx = toPx(fix)
  const tx = toPx(truth)
  const rmsYd = result.rms * 1760

  const lineEnds = (e) => {
    const at = planPoint(e.mark)
    const b = ((e.observed + 180) * Math.PI) / 180
    const a = { x: at.x + Math.sin(b) * 4, y: at.y - Math.cos(b) * 4 }
    const z = { x: at.x - Math.sin(b) * 4, y: at.y + Math.cos(b) * 4 }
    return [toPx(a), toPx(z)]
  }

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="THE EVIDENCE YOU ARE USING" width={200}
          value={`${kept.length} of 4`}
          note={drop === 'none'
            ? `three bearings and a pace count, and they do not all agree`
            : `having thrown out ${c.evidence.find((e) => e.id === drop).name}`} />
        <Readout label="IT FITS ITSELF TO" value={`${num(rmsYd)} yd`} width={175}
          note={`which is how tidy the answer LOOKS, and nothing more`} />
        <Readout align="right" width={320} label="AND THE ANSWER IS WRONG BY"
          value={`${num(result.yardsOut)} yd`}
          colour={result.yardsOut < 70 ? GREEN : result.yardsOut > 110 ? RED : undefined}
          note={rmsYd < 5
            ? `Two bearings and one distance always pass through a point, so a tidy residual means the evidence was too thin to argue with. It is the worst of the five.`
            : `the simulation knows where you are because it has to measure this. You would not.`} />
      </div>

      <Stage>
        <PlanSheet lit={['tower', 'quarry', 'pond']}
          label={`Three bearings and a pace count, plotted on the day's plan. ${drop === 'none' ? 'All four together' : `Without ${c.evidence.find((e) => e.id === drop).name}`}, the best-fitting position is ${r0(result.yardsOut)} yards from the truth.`}>
          {c.evidence.map((e) => {
            const on = e.id !== drop
            if (e.kind === 'circle') {
              return (
                <circle key={e.id} cx={planX(e.mark.e)} cy={planY(e.mark.n)} r={e.observed * PLAN_PX}
                  fill="none" stroke={on ? 'var(--accent)' : 'var(--ink-3)'} strokeWidth={on ? 2.4 : 1.2}
                  strokeDasharray="9 6" opacity={on ? 0.95 : 0.3} />
              )
            }
            const [a, z] = lineEnds(e)
            return (
              <line key={e.id} x1={a.x} y1={a.y} x2={z.x} y2={z.y}
                stroke={on ? BLUE : 'var(--ink-3)'} strokeWidth={on ? 2.2 : 1.2}
                strokeDasharray="8 6" opacity={on ? 0.95 : 0.3} />
            )
          })}
          <circle cx={tx.x} cy={tx.y} r="7" fill={GREEN} />
          <circle cx={tx.x} cy={tx.y} r="15" fill="none" stroke={GREEN} strokeWidth="2" opacity="0.6" />
          <path d={`M ${fx.x - 9} ${fx.y - 9} L ${fx.x + 9} ${fx.y + 9} M ${fx.x - 9} ${fx.y + 9} L ${fx.x + 9} ${fx.y - 9}`}
            stroke={RED} strokeWidth="3" />
          <Tag x={tx.x} y={tx.y + 34} colour={GREEN}>where you actually are</Tag>

          {/* the close-up, because a hundred yards is ten pixels of this plan */}
          <Inset at={fix} truth={truth} evidence={kept} />
        </PlanSheet>
      </Stage>

      <Controls>
        <Pick label="WHICH DO YOU THROW AWAY?" options={DROPS} value={drop} onChange={setDrop} />
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
          Every one of the five has been measured. Four of them are worse than the best one, and the
          one that fits itself most neatly is the furthest out.
        </div>
      </Controls>
    </>
  )
}

/**
 * A magnified window on the fix.
 *
 * The whole argument of Lesson 30 happens inside a circle a hundred yards
 * across, which is ten pixels of a plan eight miles wide. Drawn at plan scale
 * the five answers are indistinguishable, so they get a panel with the
 * magnification printed on it — the same device Week 5 needed for the cocked
 * hat, and for the same reason.
 */
// The box is kept clear of the stone bridge's label, which starts at x 201:
// at 190 wide it reached 214 and covered the first two letters.
function Inset({ at, truth, evidence, x = 16, y = 236, w = 176, h = 190 }) {
  const span = 0.14 // miles across the window
  const k = (w * 0.8) / span
  const toLocal = (p) => ({
    x: w / 2 + (p.x - at.x) * k,
    y: (h - 26) / 2 + (p.y - at.y) * k
  })
  const t = toLocal(truth)
  const f = toLocal(at)
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <clipPath id="hw-voyage-inset"><rect x="1" y="1" width={w - 2} height={h - 28} rx="4" /></clipPath>
      </defs>
      <rect x="0" y="0" width={w} height={h} rx="6" fill={PAPER} stroke="var(--ink)"
        strokeWidth="1.2" strokeOpacity="0.55" />
      <rect x="0" y="0" width={w} height={h - 26} rx="6" fill="var(--paper-alt)" fillOpacity="0.5" />
      <g clipPath="url(#hw-voyage-inset)">
        {evidence.map((e) => {
          if (e.kind === 'circle') {
            const c = toLocal({ x: e.mark.e, y: -e.mark.n })
            return <circle key={e.id} cx={c.x} cy={c.y} r={e.observed * k} fill="none"
              stroke="var(--accent)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          }
          const [a, z] = [0, 1].map((i) => {
            const at0 = { x: e.mark.e, y: -e.mark.n }
            const b = ((e.observed + 180) * Math.PI) / 180
            const d = i ? -6 : 6
            return toLocal({ x: at0.x + Math.sin(b) * d, y: at0.y - Math.cos(b) * d })
          })
          return <line key={e.id} x1={a.x} y1={a.y} x2={z.x} y2={z.y} stroke={BLUE} strokeWidth="1.4"
            vectorEffect="non-scaling-stroke" />
        })}
        <circle cx={t.x} cy={t.y} r="4" fill={GREEN} />
        <path d={`M ${f.x - 5} ${f.y - 5} L ${f.x + 5} ${f.y + 5} M ${f.x - 5} ${f.y + 5} L ${f.x + 5} ${f.y - 5}`}
          stroke={RED} strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
        <line x1={t.x} y1={t.y} x2={f.x} y2={f.y} stroke={RED} strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      <text x={w / 2} y={h - 9} textAnchor="middle"
        style={{ fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, fill: 'var(--ink-2)' }}>
        THE ANSWER, CLOSE UP · ×{Math.round(k / PLAN_PX)}
      </text>
    </g>
  )
}

/* ---- one week, five jobs ----------------------------------------------- */

export default function Voyage({ mode = 'clock' }) {
  const Scene = {
    clock: TheClock,
    aim: AimOff,
    assay: Assay,
    route: Route,
    challenge: Challenge
  }[mode] ?? TheClock

  return (
    <div className="hw-sim">
      <Scene />
    </div>
  )
}
