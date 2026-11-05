import { useMemo, useState } from 'react'
import {
  yardsOff, channelled, flagPoints, lakeBreeze, brg, norm, delta,
  GRID, heights, downhill, accumulate, trace, basin, isHollow, isEdge, wander,
  mossOdds, mossSurvey,
  iceFlow, flowSpread, driftOn,
  convergence, metesBearings, expectedError, TOWNSHIP_MILES, SECTIONS_PER_TOWNSHIP,
  heightAboveEye, objectHeight, distanceFromHeight, angleSensitivity, heightError,
  eyeOmission, BEST_ANGLE, ASSUMED_EYE_FEET
} from '../../lib/field.js'

// Navigation, Lessons 31 to 35 — the optional Field Week.
//
//   'wind'    a valley makes its own wind, and a shore makes two   (Lesson 31)
//   'water'   drainage is the shape of the ground, not a direction (Lesson 32)
//   'living'  what one mossy tree can actually tell you            (Lesson 33)
//   'ice'     a scratch in rock points away from the dome          (Lesson 34)
//   'survey'  a road is a compass only if somebody surveyed it     (Lesson 35)
//   'height'  where to stand so the arithmetic disappears          (Lesson 36)
//
// EVERYTHING QUOTED IS COMPUTED IN src/lib/field.js AND CHECKED IN
// src/__tests__/field.test.js — but that file mixes two kinds of claim and
// says so at its head, and these scenes must keep the two apart on screen.
// The valley wind and the moss odds are MODELS whose premises the learner
// sets; the captions say so in as many words. The drainage, the convergence
// of the survey meridians and the geometry of ice spreading from a dome are
// consequences, and need no apology.
//
// The findings the week is built on:
//
//   A west wind in a north-west valley is felt as a wind from 330° — sixty
//   degrees deflected, at half the speed. Sixty degrees over one mile is 3,048
//   yards, which is not an error but a different journey. And a lake shore
//   reverses its wind by exactly 180° between afternoon and dawn.
//
//   The longest watercourse on this sheet runs 9.3 miles and through 146° of
//   the compass. One hollow in the middle takes 5,273 acres of drainage — a
//   third of the sheet — and has no outlet at all.
//
//   Granting the folklore its premise, on an open slope half the trees say
//   nothing and four in five of the rest are right. In the damp ravine, where
//   the moss actually is, 68% have moss all round, only 29% say anything, and
//   of those barely three in five are right.
//
//   Two sites sixty miles apart under the same ice are scratched 8.6° apart,
//   because ice flows outward from a dome and not southward from the pole.
//
//   And a road on a section line is true to 0.07° — 2.2 yards in a mile, about
//   twenty-seven times better than a compass read to two degrees. A road laid
//   out by metes and bounds sits, on average, 22° from the nearest cardinal,
//   and nothing tells you which cardinal it was aiming at.

export const MODES = ['wind', 'water', 'living', 'ice', 'survey', 'height']

const PAPER = '#f5efe3'
const RED = 'oklch(0.46 0.15 25)'
const GREEN = 'oklch(0.50 0.12 155)'
const BLUE = 'oklch(0.44 0.13 255)'

const W = 760
const H = 560
const READOUT_INSET = { paddingInline: 14 }
const r0 = (n) => Math.round(n)
const r1 = (n) => Math.round(n * 10) / 10
const num = (n) => r0(n).toLocaleString('en-US')
const pct = (x) => `${Math.round(x * 100)}%`

/* ---- furniture --------------------------------------------------------- */

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

function Pick({ options, value, onChange, label }) {
  return (
    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
      {label && <span className="hw-readout-label">{label}</span>}
      {options.map((o) => {
        const on = o.id === value
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

function Tag({ x, y, children, colour = 'var(--ink)', size = 12, anchor = 'middle', weight = 600 }) {
  return (
    <text x={x} y={y} textAnchor={anchor}
      style={{ fontFamily: 'var(--sans)', fontSize: size, fontWeight: weight, fill: colour }}>
      <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>{children}</tspan>
    </text>
  )
}

function Frame({ children, label, h = H }) {
  return (
    <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label={label}>
      <rect x="0" y="0" width={W} height={h} rx="6" fill={PAPER} />
      {children}
    </svg>
  )
}

const Stage = ({ children }) => (
  <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
    {children}
  </div>
)

// As in Voyage: the stylesheet gives .hw-controls `flex-wrap: wrap`, which is
// right for a row and inflates the lines of a column.
const Controls = ({ children }) => (
  <div className="hw-controls hw-controls-stack"
    style={{ flexDirection: 'column', alignItems: 'stretch', flexWrap: 'nowrap', gap: 12 }}>{children}</div>
)

/**
 * A banner that says, on the picture itself, when a premise is the learner's.
 *
 * Wraps to a second line rather than running off the paper: these sentences
 * are the honesty of the week and must not be the thing that gets clipped.
 * 105 characters is what fits across this frame at 11.5px.
 */
function Premise({ children, y = H - 26 }) {
  const text = String(children).replace(/\s+/g, ' ').trim()
  let lines = [text]
  if (text.length > 105) {
    let cut = text.lastIndexOf(' ', Math.ceil(text.length / 2) + 18)
    if (cut < 20) cut = text.indexOf(' ', Math.ceil(text.length / 2))
    lines = [text.slice(0, cut), text.slice(cut + 1)]
  }
  const top = y - 13 - (lines.length - 1) * 15
  return (
    <g>
      <rect x="18" y={top - 5} width={W - 36} height={lines.length * 15 + 15} rx="5"
        fill="var(--accent-wash)" opacity="0.75" />
      {lines.map((line, i) => (
        <text key={i} x={W / 2} y={top + 11 + i * 15} textAnchor="middle"
          style={{ fontFamily: 'var(--sans)', fontSize: 11.5, fontWeight: 700, letterSpacing: '.04em', fill: 'var(--ink-2)' }}>
          {line}
        </text>
      ))}
    </g>
  )
}

/** An arrow pointing the way something is going. */
function Arrow({ at, bearing, len = 34, colour = BLUE, width = 2.4, head = 7 }) {
  const r = (bearing * Math.PI) / 180
  const dx = Math.sin(r)
  const dy = -Math.cos(r)
  const a = { x: at.x - (dx * len) / 2, y: at.y - (dy * len) / 2 }
  const b = { x: at.x + (dx * len) / 2, y: at.y + (dy * len) / 2 }
  const left = { x: b.x - dx * head + dy * head * 0.6, y: b.y - dy * head - dx * head * 0.6 }
  const right = { x: b.x - dx * head - dy * head * 0.6, y: b.y - dy * head + dx * head * 0.6 }
  return (
    <g>
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={colour} strokeWidth={width} />
      <polygon points={`${b.x},${b.y} ${left.x},${left.y} ${right.x},${right.y}`} fill={colour} />
    </g>
  )
}

/* ---- Lesson 31 — the wind ---------------------------------------------- */

// Three valleys with different axes, so one prevailing wind produces three
// different local winds on one picture. The axes are the picture's; the
// channelling is the model.
// Everything here lives below y = 100. The readouts are an absolutely
// positioned overlay on the stage and reach 92 units into this picture —
// measured in the page, at 1,500px — so the free wind, the hills and the
// valley mouths all start beneath that line.
const VALLEYS = [
  { id: 'north', name: `the north valley`, axis: 330, at: { x: 196, y: 320 }, path: 'M 86 476 Q 172 400 232 296 T 302 196' },
  { id: 'middle', name: `the middle valley`, axis: 70, at: { x: 478, y: 348 }, path: 'M 298 424 Q 430 378 568 352 T 736 320' },
  { id: 'south', name: `the south valley`, axis: 20, at: { x: 258, y: 452 }, path: 'M 192 524 Q 248 470 280 412 T 334 344' }
]

function Valley() {
  const [windFrom, setWindFrom] = useState(270)
  const [speed, setSpeed] = useState(12)
  const [which, setWhich] = useState('north')

  const v = VALLEYS.find((q) => q.id === which)
  const c = channelled(windFrom, v.axis, speed)
  const miss = yardsOff(1, c.deflection)

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="THE WIND OVER THE HILLS" value={`${brg(windFrom)}°`} width={185}
          note={`${speed} mph, and the only wind on the forecast`} />
        <Readout label="THE WIND IN THIS VALLEY" value={c.stalled ? `almost nothing` : `${brg(c.from)}°`}
          width={200} colour={c.deflection > 30 ? RED : undefined}
          note={c.stalled
            ? `the wind is square to the valley, so almost none of it gets in — and what little does will be swirling`
            : `at ${r1(c.speed)} mph. The valley will not let air across it, so what blows down it is what was already going that way.`} />
        <Readout align="right" width={300} label="SO A TREE HERE IS OUT BY"
          value={`${r0(c.deflection)}°`} colour={c.deflection > 30 ? RED : GREEN}
          note={`if you read it as the prevailing wind — which is ${num(miss)} yards in every mile you walk on it. ${c.deflection > 45 ? `That is not an error. That is a different journey.` : ``}`} />
      </div>

      <Stage>
        <Frame label={`A map of three valleys. A prevailing wind from ${brg(windFrom)} degrees is channelled along each valley's own axis, so the wind in ${v.name} comes from ${brg(c.from)} degrees — ${r0(c.deflection)} degrees away from the prevailing wind.`}>
          {/* the hills */}
          {[[120, 232, 140, 52], [566, 230, 150, 58], [492, 452, 160, 62], [92, 470, 110, 46]].map(([cx, cy, rx, ry], i) => (
            <g key={i}>
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="var(--ink)" opacity="0.07" />
              <ellipse cx={cx} cy={cy} rx={rx * 0.6} ry={ry * 0.6} fill="var(--ink)" opacity="0.07" />
            </g>
          ))}

          {VALLEYS.map((q) => (
            <path key={q.id} d={q.path} fill="none" stroke={q.id === which ? 'var(--ink)' : 'var(--ink-3)'}
              strokeWidth={q.id === which ? 3 : 1.6} opacity={q.id === which ? 0.55 : 0.3} />
          ))}

          {/* the free wind, along the top */}
          {[90, 300, 510, 690].map((x) => (
            <Arrow key={x} at={{ x, y: 128 }} bearing={norm(windFrom + 180)} len={46} colour="var(--ink-3)" width="2" />
          ))}
          <Tag x={W / 2} y={168} size={12.5} weight={700} colour="var(--ink-2)">
            the wind over the hills — from {brg(windFrom)}°
          </Tag>

          {/* each valley's own wind */}
          {VALLEYS.map((q) => {
            const cc = channelled(windFrom, q.axis, speed)
            const on = q.id === which
            return (
              <g key={q.id} opacity={on ? 1 : 0.42}>
                {!cc.stalled && (
                  <Arrow at={q.at} bearing={cc.goes} len={on ? 64 : 44}
                    colour={on ? BLUE : 'var(--ink-3)'} width={on ? 3.4 : 2} head={on ? 10 : 7} />
                )}
                <Tag x={q.at.x} y={q.at.y + (on ? 46 : 34)} size={on ? 12.5 : 11.5} weight={on ? 700 : 500}
                  colour={on ? BLUE : 'var(--ink-3)'}>
                  {cc.stalled ? `${q.name}: no wind to speak of` : `${q.name}: from ${brg(cc.from)}°`}
                </Tag>
              </g>
            )
          })}

          {/* the flagged tree in the chosen valley */}
          {!c.stalled && (
            <g transform={`translate(${v.at.x} ${v.at.y - 58})`}>
              <line x1="0" y1="0" x2="0" y2="-34" stroke="var(--ink)" strokeWidth="3" />
              {[0, 1, 2].map((i) => {
                const f = (flagPoints(c.from) * Math.PI) / 180
                const L = 22 - i * 4
                return (
                  <line key={i} x1="0" y1={-16 - i * 8} x2={Math.sin(f) * L} y2={-16 - i * 8 - Math.cos(f) * L * 0.35}
                    stroke="var(--ink)" strokeWidth="2.2" />
                )
              })}
              <Tag x={0} y={22} size={11.5} weight={700}>a tree flagged by THIS wind</Tag>
            </g>
          )}

          <Premise>
{`A MODEL: a valley keeps the wind that was already going its way and sheds the rest. Real airflow is harder than this; the deflection is not.`}
          </Premise>
        </Frame>
      </Stage>

      <Controls>
        <Pick label="STAND IN" options={VALLEYS} value={which} onChange={setWhich} />
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-wf" label={`The prevailing wind is from ${brg(windFrom)}°`} min={0} max={350} step={10}
            value={windFrom} onChange={setWindFrom} />
          <Slider id="hw-ws" label={`Blowing ${speed} mph`} min={4} max={30} step={1} value={speed} onChange={setSpeed} />
        </div>
      </Controls>
    </>
  )
}

function Shore() {
  const [day, setDay] = useState(true)
  const towardsWater = 270
  const from = lakeBreeze(towardsWater, day)

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="THE TIME" value={day ? `3 in the afternoon` : `4 in the morning`} width={200}
          note={day ? `the land is warmer than the water` : `the water is warmer than the land`} />
        <Readout label="THE WIND ON THIS BEACH" value={`${brg(from)}°`} width={185} colour={BLUE}
          note={day ? `off the water and onto the land` : `off the land and onto the water`} />
        <Readout align="right" width={300} label="AND TWELVE HOURS AGO IT WAS"
          value={`${brg(lakeBreeze(towardsWater, !day))}°`} colour={RED}
          note={`Exactly the opposite. The same beach, the same season, the same weather — and a wind that answers "which way is west?" with both answers every day.`} />
      </div>

      <Stage>
        <Frame label={`A lake shore with the water to the west. In the afternoon the breeze blows onshore from ${brg(lakeBreeze(towardsWater, true))} degrees; before dawn it blows offshore from ${brg(lakeBreeze(towardsWater, false))} degrees — a reversal of 180 degrees.`}>
          <rect x="0" y="0" width="250" height={H} fill={BLUE} opacity="0.12" />
          <path d={`M 250 0 Q 268 120 246 240 T 258 400 T 240 ${H}`} fill="none" stroke={BLUE} strokeWidth="3" opacity="0.5" />
          <Tag x={120} y={60} size={13} weight={700} colour={BLUE}>the lake</Tag>
          <Tag x={520} y={60} size={13} weight={700}>the land</Tag>

          {/* the sun or the stars */}
          <g transform="translate(640 110)">
            {day ? (
              <>
                <circle cx="0" cy="0" r="22" fill="var(--accent)" opacity="0.8" />
                {Array.from({ length: 8 }, (_, i) => {
                  const a = (i * Math.PI) / 4
                  return <line key={i} x1={Math.cos(a) * 30} y1={Math.sin(a) * 30} x2={Math.cos(a) * 40}
                    y2={Math.sin(a) * 40} stroke="var(--accent)" strokeWidth="2.5" opacity="0.8" />
                })}
              </>
            ) : (
              <>
                <path d="M 8 -20 A 22 22 0 1 0 8 20 A 17 17 0 1 1 8 -20 Z" fill="var(--ink-3)" />
                {[[-40, -26], [34, -34], [48, 10], [-30, 28]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="2" fill="var(--ink-3)" />
                ))}
              </>
            )}
          </g>

          {[180, 280, 380].map((y) => (
            <Arrow key={y} at={{ x: day ? 360 : 360, y }} bearing={norm(from + 180)} len={120} colour={BLUE} width="4" head="13" />
          ))}
          <Tag x={360} y={450} size={13} weight={700} colour={BLUE}>
            {day ? `onshore — the warm land is rising and the lake air comes in beneath it` : `offshore — now the land is the cold one, and it runs out over the water`}
          </Tag>

          <Premise>
{`Not a model. Land heats and cools faster than water, so a shore breeze reverses twice a day, every day, by exactly 180°.`}
          </Premise>
        </Frame>
      </Stage>

      <Controls>
        <div className="hw-actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Toggle on={day} onClick={() => setDay(true)}>THREE IN THE AFTERNOON</Toggle>
          <Toggle on={!day} onClick={() => setDay(false)}>FOUR IN THE MORNING</Toggle>
        </div>
      </Controls>
    </>
  )
}

function Wind() {
  const [tab, setTab] = useState('valley')
  return (
    <>
      {tab === 'valley' ? <Valley /> : <Shore />}
      <Controls>
        <Pick label="SHOW ME" value={tab} onChange={setTab} options={[
          { id: 'valley', name: `A wind in a valley` },
          { id: 'shore', name: `A wind on a shore` }
        ]} />
      </Controls>
    </>
  )
}

/* ---- the sheet Lessons 32 and 33 share --------------------------------- */

const SHEET = { x: 40, y: 56, w: 680, h: 510 }
const cellW = SHEET.w / GRID.w
const cellH = SHEET.h / GRID.h
const cellX = (i) => SHEET.x + (i % GRID.w) * cellW + cellW / 2
const cellY = (i) => SHEET.y + ((i / GRID.w) | 0) * cellH + cellH / 2

const terrain = (() => {
  const z = heights()
  const dir = downhill(z)
  const acc = accumulate(dir)
  let hollow = -1
  for (let i = 0; i < GRID.w * GRID.h; i++) if (isHollow(dir, i)) hollow = i
  return { z, dir, acc, hollow }
})()

/** Contour lines by marching squares over the same field everything else uses. */
function contourPaths(z, level) {
  const { w, h } = GRID
  const segs = []
  const at = (x, y) => z[y * w + x]
  const lerp = (a, b, za, zb) => {
    const t = (level - za) / (zb - za)
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
  }
  for (let y = 0; y < h - 1; y++) {
    for (let x = 0; x < w - 1; x++) {
      const zs = [at(x, y), at(x + 1, y), at(x + 1, y + 1), at(x, y + 1)]
      const ps = [
        { x: SHEET.x + x * cellW, y: SHEET.y + y * cellH },
        { x: SHEET.x + (x + 1) * cellW, y: SHEET.y + y * cellH },
        { x: SHEET.x + (x + 1) * cellW, y: SHEET.y + (y + 1) * cellH },
        { x: SHEET.x + x * cellW, y: SHEET.y + (y + 1) * cellH }
      ]
      const crossings = []
      for (let k = 0; k < 4; k++) {
        const a = k
        const b = (k + 1) % 4
        if ((zs[a] >= level) !== (zs[b] >= level)) crossings.push(lerp(ps[a], ps[b], zs[a], zs[b]))
      }
      if (crossings.length === 2) segs.push(crossings)
      else if (crossings.length === 4) { segs.push([crossings[0], crossings[1]]); segs.push([crossings[2], crossings[3]]) }
    }
  }
  return segs.map((s) => `M ${s[0].x.toFixed(1)} ${s[0].y.toFixed(1)} L ${s[1].x.toFixed(1)} ${s[1].y.toFixed(1)}`).join(' ')
}

/* ---- Lesson 32 — water ------------------------------------------------- */

// The two middle starts are 220 yards apart on one hillside and they do
// completely different things: one walk comes out at the edge of the sheet,
// the other ends in the hollow. That pairing is the lesson.
const STARTS = [
  { id: 'west', name: `the west slope`, cell: 40 * GRID.w + 12 },
  { id: 'ridge', name: `the north-west ridge`, cell: 10 * GRID.w + 10 },
  { id: 'above', name: `220 yards higher up that ridge`, cell: 8 * GRID.w + 10 },
  { id: 'south', name: `the south ridge`, cell: 56 * GRID.w + 30 }
]

function Water() {
  const [startId, setStartId] = useState('west')
  const [interval, setInterval] = useState(40)
  const [showBasin, setShowBasin] = useState(true)

  const start = STARTS.find((s) => s.id === startId)
  const path = useMemo(() => trace(terrain.dir, start.cell), [startId])
  const end = path[path.length - 1]
  const offSheet = isEdge(end)
  const wd = useMemo(() => wander(path), [startId])
  const area = useMemo(() => (showBasin ? basin(terrain.dir, end) : null), [startId, showBasin])
  const miles = (path.length * GRID.yardsPerCell) / 1760
  const acres = area ? (area.size * GRID.yardsPerCell ** 2) / 4840 : 0

  const levels = useMemo(() => {
    const out = []
    for (let L = 640; L <= 980; L += interval) out.push(L)
    return out
  }, [interval])

  const streams = useMemo(() => {
    const out = []
    for (let i = 0; i < GRID.w * GRID.h; i++) if (terrain.acc[i] > 28) out.push(i)
    return out
  }, [])

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="FOLLOW THE WATER AND YOU WALK" value={`${r1(miles)} mi`} width={195}
          note={`from ${start.name}`} />
        <Readout label="THROUGH THIS MUCH OF THE COMPASS" value={`${r0(wd.spread)}°`} width={225}
          colour={wd.spread > 90 ? RED : undefined}
          note={wd.legs.length > 1
            ? `swinging between ${brg(wd.from)}° and ${brg(wd.to)}°. A watercourse has no direction. It has a sequence of them.`
            : `too short a run to wander`} />
        <Readout align="right" width={280} label="AND YOU COME OUT"
          value={offSheet ? `off the sheet` : `nowhere`} colour={offSheet ? undefined : RED}
          note={offSheet
            ? `at the edge of the map, which may or may not be anywhere useful — the map does not say.`
            : `This hollow has no outlet. ${num(acres)} acres drain into it and nothing drains out, and a stream that ends here ends in standing water with you in the middle of it.`} />
      </div>

      <Stage>
        <Frame label={`A contour sheet six miles by four and a half, with the streams drawn from the drainage. Following the water from ${start.name} is a walk of ${r1(miles)} miles through ${r0(wd.spread)} degrees of the compass, ending ${offSheet ? 'at the edge of the sheet' : 'in a closed hollow with no outlet'}.`}>
          <rect x={SHEET.x} y={SHEET.y} width={SHEET.w} height={SHEET.h} fill="#efe6d4" />
          {levels.map((L) => (
            <path key={L} d={contourPaths(terrain.z, L)} fill="none"
              stroke="var(--ink)" strokeWidth={L % 200 === 0 ? 1.3 : 0.7} opacity={L % 200 === 0 ? 0.45 : 0.28} />
          ))}

          {area && [...area].map((i) => (
            <rect key={i} x={SHEET.x + (i % GRID.w) * cellW} y={SHEET.y + ((i / GRID.w) | 0) * cellH}
              width={cellW + 0.5} height={cellH + 0.5} fill={offSheet ? GREEN : RED} opacity="0.13" />
          ))}

          {streams.map((i) => (
            <circle key={i} cx={cellX(i)} cy={cellY(i)} r={Math.min(3, 0.9 + terrain.acc[i] / 400)}
              fill={BLUE} opacity="0.75" />
          ))}

          <path d={path.map((i, k) => `${k ? 'L' : 'M'} ${cellX(i).toFixed(1)} ${cellY(i).toFixed(1)}`).join(' ')}
            fill="none" stroke={RED} strokeWidth="2.6" strokeDasharray="7 5" />

          <circle cx={cellX(start.cell)} cy={cellY(start.cell)} r="7" fill="var(--ink)" />
          <Tag x={cellX(start.cell)} y={cellY(start.cell) - 14}>you start here</Tag>

          <circle cx={cellX(end)} cy={cellY(end)} r="8" fill={offSheet ? GREEN : RED} />
          <Tag x={cellX(end)} y={cellY(end) + (cellY(end) > H - 70 ? -16 : 26)} colour={offSheet ? GREEN : RED}>
            {offSheet ? `the water leaves the sheet` : `the water stops. So do you.`}
          </Tag>

          {terrain.hollow >= 0 && end !== terrain.hollow && (
            <Tag x={cellX(terrain.hollow)} y={cellY(terrain.hollow)} size={11.5} weight={700} colour={RED}>
              the hollow
            </Tag>
          )}

          <g transform={`translate(${W - 150} 34)`}>
            <line x1="0" y1="26" x2="0" y2="-6" stroke="var(--ink)" strokeWidth="2.5" />
            <path d="M 0 -14 l -7 12 l 14 0 z" fill="var(--ink)" />
            <Tag x={0} y={42} size={11} weight={700}>TRUE N</Tag>
          </g>
          <g transform={`translate(70 ${H - 22})`}>
            <Tag x={(1760 / GRID.yardsPerCell) * cellW / 2} y={-10} size={11} weight={500} colour="var(--ink-2)">one mile</Tag>
            <line x1="0" y1="0" x2={(1760 / GRID.yardsPerCell) * cellW} y2="0" stroke="var(--ink)" strokeWidth="3" />
          </g>
        </Frame>
      </Stage>

      <Controls>
        <Pick label="START FROM" options={STARTS} value={startId} onChange={setStartId} />
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Slider id="hw-ci" label={`Contours every ${interval} feet`} min={20} max={80} step={20}
            value={interval} onChange={setInterval} />
          <div className="hw-actions">
            <Toggle on={showBasin} onClick={() => setShowBasin((b) => !b)}>
              {showBasin ? `HIDE WHAT DRAINS THERE` : `SHOW WHAT DRAINS THERE`}
            </Toggle>
          </div>
        </div>
      </Controls>
    </>
  )
}

/* ---- Lesson 33 — living signs ------------------------------------------ */

const HABITATS = [
  { id: 'ravine', name: `A shaded, damp ravine`, pNorth: 0.85, pSouth: 0.80 },
  { id: 'slope', name: `An open slope`, pNorth: 0.55, pSouth: 0.25 },
  { id: 'ridge', name: `A dry ridge top`, pNorth: 0.25, pSouth: 0.10 }
]

function Living() {
  const [habitatId, setHabitat] = useState('ravine')
  const [seed, setSeed] = useState(11)

  const habitat = HABITATS.find((h) => h.id === habitatId)
  const odds = mossOdds(habitat.pNorth, habitat.pSouth)
  const survey = useMemo(
    () => mossSurvey({ pNorth: habitat.pNorth, pSouth: habitat.pSouth, n: 40, seed }),
    [habitatId, seed]
  )

  const cols = 10
  const cell = { w: 64, h: 80 }
  const originX = (W - cols * cell.w) / 2 + cell.w / 2
  // Below the readout overlay, which is four lines deep on this scene. The
  // scene's own title is gone: the habitat button underneath already names it
  // and in the picture it was printed over.
  const originY = 182

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="TREES WITH MOSS ALL ROUND, OR NONE" value={pct((survey.both + survey.neither) / survey.n)}
          width={230} note={`${survey.both} of 40 all round, ${survey.neither} with none. Not one of them points anywhere.`} />
        <Readout label="SO THIS MANY SAY ANYTHING" value={`${survey.informative} of 40`} width={190}
          colour={survey.informative < 16 ? RED : undefined}
          note={`moss on one side only`} />
        <Readout align="right" width={290} label="AND OF THOSE, THE SHARE POINTING NORTH"
          value={survey.rightWay === null ? `—` : pct(survey.rightWay)}
          colour={survey.rightWay !== null && survey.rightWay < 0.7 ? RED : GREEN}
          note={`The odds behind this wood say ${pct(odds.rightWay)}. Pick one tree at random and you have about that chance of being right — in the place where moss is thickest, barely better than tossing a coin.`} />
      </div>

      <Stage>
        <Frame label={`Forty trees surveyed in ${habitat.name.toLowerCase()}. ${survey.both} have moss all round, ${survey.neither} have none, ${survey.northOnly} have it on the north side only and ${survey.southOnly} on the south side only.`}>
          <g transform={`translate(${originX - 62} ${originY})`}>
            <line x1="0" y1="18" x2="0" y2="-12" stroke="var(--ink)" strokeWidth="2" />
            <path d="M 0 -18 l -6 10 l 12 0 z" fill="var(--ink)" />
            <Tag x={0} y={34} size={10.5} weight={700}>N</Tag>
          </g>

          {survey.trees.map((t, i) => {
            const cx = originX + (i % cols) * cell.w
            const cy = originY + Math.floor(i / cols) * cell.h
            const says = (t.north && !t.south) || (!t.north && t.south)
            const right = t.north && !t.south
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="17" fill="none" stroke="var(--ink)" strokeWidth="1.6" opacity="0.5" />
                {t.north && <path d={`M ${cx - 17} ${cy} A 17 17 0 0 1 ${cx + 17} ${cy}`} fill="none"
                  stroke={GREEN} strokeWidth="6" opacity="0.85" />}
                {t.south && <path d={`M ${cx + 17} ${cy} A 17 17 0 0 1 ${cx - 17} ${cy}`} fill="none"
                  stroke={GREEN} strokeWidth="6" opacity="0.85" />}
                {says && (
                  <text x={cx} y={cy + 5} textAnchor="middle"
                    style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700, fill: right ? GREEN : RED }}>
                    {right ? '✓' : '✗'}
                  </text>
                )}
              </g>
            )
          })}

          <Tag x={W / 2} y={originY + 3 * cell.h + 48} size={12} weight={600} colour="var(--ink-2)">
            a tick means the moss really is on the north side · a cross means it is on the south · no mark means the tree said nothing
          </Tag>

          <Premise>
{`YOUR PREMISE, not a measurement: moss here is ${pct(habitat.pNorth)} likely on the shaded side and ${pct(habitat.pSouth)} on the sunny one. The folklore is granted its point, and this is what it is worth.`}
          </Premise>
        </Frame>
      </Stage>

      <Controls>
        <Pick label="SURVEY" options={HABITATS} value={habitatId} onChange={setHabitat} />
        <div className="hw-actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Toggle on={false} onClick={() => setSeed((s) => s + 1)}>WALK ON AND SURVEY FORTY MORE</Toggle>
        </div>
      </Controls>
    </>
  )
}

/* ---- Lesson 34 — rock and snow ----------------------------------------- */

// Two lobes of one ice sheet, split by high ground — the Miami and Scioto
// sublobes of the Huron-Erie lobe were separated by the Bellefontaine
// Outlier, which is documented. The flow geometry is a model: ice spreads
// outward from a dome. The consequence is the lesson.
const LOBES = [
  { id: 'miami', name: `the Miami sublobe`, dome: { e: -260, n: 430 }, tint: BLUE },
  { id: 'scioto', name: `the Scioto sublobe`, dome: { e: 240, n: 430 }, tint: GREEN }
]
const SITES = [
  { id: 's1', name: `Site A`, e: -120, n: 40, lobe: 'miami' },
  { id: 's2', name: `Site B`, e: -40, n: 10, lobe: 'miami' },
  { id: 's3', name: `Site C`, e: 70, n: 30, lobe: 'scioto' },
  { id: 's4', name: `Site D`, e: 170, n: 60, lobe: 'scioto' }
]

const mapX = (e) => W / 2 + e * 1.55
const mapY = (n) => 470 - n * 0.85

function Ice() {
  const [a, setA] = useState('s1')
  const [b, setB] = useState('s3')

  const sa = SITES.find((s) => s.id === a)
  const sb = SITES.find((s) => s.id === b)
  const domeOf = (s) => LOBES.find((l) => l.id === s.lobe).dome
  const fa = iceFlow(domeOf(sa), sa)
  const fb = iceFlow(domeOf(sb), sb)
  const apart = Math.abs(delta(fa, fb))
  const sameLobe = sa.lobe === sb.lobe
  const milesApart = Math.hypot(sb.e - sa.e, sb.n - sa.n)

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="THE SCRATCHES AT THE FIRST SITE RUN" value={`${brg(fa)}°`} width={215}
          note={`and they are a fact about that rock, not about the pole`} />
        <Readout label="AT THE SECOND, THEY RUN" value={`${brg(fb)}°`} width={185}
          note={`${r0(milesApart)} miles away, under the same ice sheet`} />
        <Readout align="right" width={290} label="SO THE TWO DISAGREE BY"
          value={`${r1(apart)}°`} colour={apart > 20 ? RED : apart > 6 ? undefined : GREEN}
          note={sameLobe
            ? `Both sites are under the same lobe, and the ice still scratched them ${r1(apart)}° apart, because ice spreads outward from where it is thickest. Take either one for north and you are ${num(yardsOff(1, Math.abs(delta(fa, 180))))} yards a mile out.`
            : `These two are under different lobes, split by high ground. The same ice sheet, the same winter, and two answers that are nowhere near each other.`} />
      </div>

      <Stage>
        <Frame label={`A regional map of ice flowing outward from two domes. Striations at ${sa.name} run ${brg(fa)} degrees and at ${sb.name} ${brg(fb)} degrees — ${r1(apart)} degrees apart.`}>
          {LOBES.map((l) => (
            <g key={l.id}>
              <circle cx={mapX(l.dome.e)} cy={mapY(l.dome.n)} r="150" fill={l.tint} opacity="0.07" />
              <circle cx={mapX(l.dome.e)} cy={mapY(l.dome.n)} r="9" fill={l.tint} />
              <Tag x={mapX(l.dome.e)} y={mapY(l.dome.n) - 18} size={12} colour={l.tint}>{l.name}</Tag>
              {/* flow lines radiating from the dome */}
              {Array.from({ length: 9 }, (_, i) => {
                const bearing = 140 + i * 12.5
                const r = (bearing * Math.PI) / 180
                const x1 = mapX(l.dome.e) + Math.sin(r) * 60
                const y1 = mapY(l.dome.n) - Math.cos(r) * 60 * 0.55
                const x2 = mapX(l.dome.e) + Math.sin(r) * 330
                const y2 = mapY(l.dome.n) - Math.cos(r) * 330 * 0.55
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={l.tint} strokeWidth="1.2" opacity="0.3" />
              })}
            </g>
          ))}

          <Tag x={W / 2} y={44} size={12.5} weight={700} colour="var(--ink-2)">
            high ground between the two — in Ohio, the Bellefontaine Outlier
          </Tag>
          <line x1={mapX(-10)} y1={mapY(430)} x2={mapX(-10)} y2={mapY(120)}
            stroke="var(--ink)" strokeWidth="2" strokeDasharray="6 6" opacity="0.35" />

          {SITES.map((s) => {
            const chosen = s.id === a || s.id === b
            const f = iceFlow(domeOf(s), s)
            return (
              <g key={s.id} opacity={chosen ? 1 : 0.45}>
                <Arrow at={{ x: mapX(s.e), y: mapY(s.n) }} bearing={f} len={chosen ? 58 : 38}
                  colour={chosen ? RED : 'var(--ink-3)'} width={chosen ? 3.2 : 2} head={chosen ? 9 : 6} />
                <circle cx={mapX(s.e)} cy={mapY(s.n)} r="5" fill="var(--ink)" />
                <Tag x={mapX(s.e)} y={mapY(s.n) + 44} size={chosen ? 12.5 : 11.5} weight={chosen ? 700 : 500}>
                  {s.name} · {brg(f)}°
                </Tag>
              </g>
            )
          })}

          <g transform={`translate(${W - 92} ${H - 104})`}>
            <line x1="0" y1="30" x2="0" y2="-10" stroke="var(--ink)" strokeWidth="2.5" />
            <path d="M 0 -18 l -7 12 l 14 0 z" fill="var(--ink)" />
            <Tag x={0} y={46} size={11} weight={700}>TRUE N</Tag>
          </g>

          <Premise>
{`A MODEL of the flow: ice spreads outward from where it is thickest. That the Ohio lobes were split by high ground is not a model — it is why the sublobes have names.`}
          </Premise>
        </Frame>
      </Stage>

      <Controls>
        <Pick label="FIRST SITE" options={SITES} value={a} onChange={setA} />
        <Pick label="SECOND SITE" options={SITES} value={b} onChange={setB} />
      </Controls>
    </>
  )
}

/* ---- Lesson 35 — the land people left ---------------------------------- */

const LAT = 40

function Survey() {
  const [system, setSystem] = useState('grid')
  const [error, setError] = useState(2)

  const conv = convergence(LAT, TOWNSHIP_MILES)
  const gridYards = yardsOff(1, conv)
  const compassYards = yardsOff(1, error)
  const metes = useMemo(() => metesBearings(14, 5), [])
  const metesError = expectedError(metes)

  const grid = system === 'grid'
  const box = { x: 90, y: 110, w: 580, h: 390 }

  // The irregular tract: boundaries that follow the ground. Drawn from the
  // same generator the arithmetic uses, so the picture and the figure agree.
  const tracts = useMemo(() => {
    const out = []
    let x = box.x + 30
    let y = box.y + 40
    for (let i = 0; i < metes.length; i++) {
      const r = (metes[i] * Math.PI) / 180
      const len = 70 + ((i * 37) % 60)
      const nx = Math.min(box.x + box.w - 20, Math.max(box.x + 20, x + Math.sin(r) * len))
      const ny = Math.min(box.y + box.h - 20, Math.max(box.y + 20, y - Math.cos(r) * len))
      out.push({ a: { x, y }, b: { x: nx, y: ny }, bearing: metes[i] })
      x = nx
      y = ny
    }
    return out
  }, [])

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label={grid ? `A SECTION-LINE ROAD IS OFF TRUE NORTH BY` : `A ROAD HERE IS OFF THE NEAREST CARDINAL BY`}
          value={grid ? `${r1(conv * 60)}′` : `${r0(metesError)}°`} width={225}
          colour={grid ? GREEN : RED}
          note={grid
            ? `four minutes of arc across a township — the meridians closing on the pole, and nothing else`
            : `on average, and nothing tells you WHICH cardinal it was aiming at, so even that is the best of four guesses`} />
        <Readout label={grid ? `WHICH IS, PER MILE WALKED` : `WHICH IS, PER MILE WALKED`}
          value={grid ? `${r1(gridYards)} yd` : `${num(yardsOff(1, metesError))} yd`} width={185}
          colour={grid ? GREEN : RED} note={grid ? `off the line you meant to hold` : `and that is the AVERAGE case`} />
        <Readout align="right" width={290} label="AND YOUR COMPASS, READ TO TWO DEGREES"
          value={`${r1(compassYards)} yd`}
          note={grid
            ? `So the road is ${r1(compassYards / gridYards)} times the better instrument. Somebody surveyed it to true north and left it lying on the ground for you.`
            : `Here the compass wins by a mile, literally. The lesson is not that roads are a bad compass — it is that a road is only a compass where somebody made it one.`} />
      </div>

      <Stage>
        <Frame label={grid
          ? `A township of thirty-six square-mile sections with roads on the section lines, every one running true north-south or east-west.`
          : `A tract surveyed by metes and bounds, its boundaries following the ground, with roads on no consistent bearing at all.`}>
          <Tag x={W / 2} y={60} size={14} weight={700}>
            {grid ? `Six miles square — thirty-six sections, and a road on every line` : `The same six miles, surveyed by metes and bounds`}
          </Tag>

          <rect x={box.x} y={box.y} width={box.w} height={box.h} fill="#efe6d4" />

          {grid ? (
            <>
              {Array.from({ length: 7 }, (_, i) => (
                <g key={i}>
                  <line x1={box.x + (i * box.w) / 6} y1={box.y} x2={box.x + (i * box.w) / 6} y2={box.y + box.h}
                    stroke="var(--ink)" strokeWidth={i === 0 || i === 6 ? 2.4 : 1.8} opacity="0.75" />
                  <line x1={box.x} y1={box.y + (i * box.h) / 6} x2={box.x + box.w} y2={box.y + (i * box.h) / 6}
                    stroke="var(--ink)" strokeWidth={i === 0 || i === 6 ? 2.4 : 1.8} opacity="0.75" />
                </g>
              ))}
              {Array.from({ length: SECTIONS_PER_TOWNSHIP }, (_, i) => (
                <text key={i} x={box.x + ((i % 6) + 0.5) * (box.w / 6)}
                  y={box.y + (Math.floor(i / 6) + 0.5) * (box.h / 6) + 5} textAnchor="middle"
                  style={{ fontFamily: 'var(--sans)', fontSize: 11.5, fill: 'var(--ink-3)' }}>
                  {i + 1}
                </text>
              ))}
              <Tag x={box.x + box.w / 2} y={box.y + box.h + 28} size={12.5} weight={700} colour={GREEN}>
                every road here runs 000°, 090°, 180° or 270° — to within four minutes of arc
              </Tag>
            </>
          ) : (
            <>
              <path d={`M ${box.x + 20} ${box.y + 300} Q ${box.x + 160} ${box.y + 250}, ${box.x + 280} ${box.y + 310} T ${box.x + 560} ${box.y + 280}`}
                fill="none" stroke={BLUE} strokeWidth="5" opacity="0.4" />
              {tracts.map((t, i) => (
                <g key={i}>
                  <line x1={t.a.x} y1={t.a.y} x2={t.b.x} y2={t.b.y} stroke="var(--ink)" strokeWidth="2" opacity="0.8" />
                  <circle cx={t.b.x} cy={t.b.y} r="3" fill="var(--ink)" opacity="0.6" />
                </g>
              ))}
              <Tag x={box.x + box.w / 2} y={box.y + box.h + 28} size={12.5} weight={700} colour={RED}>
                every line follows the ground — a stream, a ridge, a marked tree, somebody else's older claim
              </Tag>
            </>
          )}

          <g transform={`translate(${W - 66} 150)`}>
            <line x1="0" y1="30" x2="0" y2="-10" stroke="var(--ink)" strokeWidth="2.5" />
            <path d="M 0 -18 l -7 12 l 14 0 z" fill="var(--ink)" />
            <Tag x={0} y={46} size={11} weight={700}>TRUE N</Tag>
          </g>
        </Frame>
      </Stage>

      <Controls>
        <Pick label="WHERE YOU ARE STANDING" value={system} onChange={setSystem} options={[
          { id: 'grid', name: `On the survey grid` },
          { id: 'metes', name: `In the Virginia Military District` }
        ]} />
        <Slider id="hw-ce" label={`Your compass is good to ${error}°`} min={1} max={6} step={0.5}
          value={error} onChange={setError} />
      </Controls>
    </>
  )
}

/* ---- Lesson 36 — measuring height with a compass ------------------------ */

// An oak, sixty feet to the top, which is a big one but not a freak. The
// drawing is to scale in both directions, so the observer's eye height is as
// small as it really is — which is the point of the chapter's own caution.
const TREE_FEET = 60
const ABOVE_EYE = TREE_FEET - ASSUMED_EYE_FEET
const FAR = 300
const PX_PER_FOOT = 520 / FAR
const GROUND = 316
const FRAME_H = 584
const STAND_X = 110

function Height() {
  const [distance, setDistance] = useState(240)
  const [sight, setSight] = useState(1)
  const [pace, setPace] = useState(5)

  const angle = (Math.atan2(ABOVE_EYE, distance) * 180) / Math.PI
  const band = heightError(angle, sight, pace / 100)
  const feet = band * ABOVE_EYE
  const best = heightError(BEST_ANGLE, sight, pace / 100)
  const bestFeet = best * ABOVE_EYE
  const at45 = distanceFromHeight(ABOVE_EYE, BEST_ANGLE)

  const baseX = STAND_X + distance * PX_PER_FOOT
  const eyeY = GROUND - ASSUMED_EYE_FEET * PX_PER_FOOT
  const topY = GROUND - TREE_FEET * PX_PER_FOOT

  // the error curve
  const cx0 = 90
  const cx1 = W - 50
  const cy0 = 524
  const cy1 = 412
  const TOP = 0.2
  const CX = (a) => cx0 + ((a - 5) / 80) * (cx1 - cx0)
  const CY = (e) => cy0 - Math.min(1, e / TOP) * (cy0 - cy1)
  const curve = Array.from({ length: 81 }, (_, i) => 5 + i)
    .map((a, i) => `${i ? 'L' : 'M'} ${CX(a).toFixed(1)} ${CY(heightError(a, sight, pace / 100)).toFixed(1)}`)
    .join(' ')

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="THE TOP OF THE TREE IS AT" value={`${r1(angle)}°`} width={185}
          note={`from ${num(distance)} feet away`} />
        <Readout label="SO YOUR ANSWER IS WORTH" value={`±${r1(feet)} ft`} width={185}
          colour={band > best * 1.25 ? RED : GREEN}
          note={`on a ${num(ABOVE_EYE)}-foot height above your eye — ${r1(band * 100)}%`} />
        <Readout align="right" width={310} label="AND IF YOU STOOD AT FORTY-FIVE DEGREES"
          value={`±${r1(bestFeet)} ft`} colour={GREEN}
          note={`which is ${num(at45)} feet from the trunk. That is where a degree of sighting error costs least — and where the height above your eye is simply the distance you walked, with no tangent to look up.`} />
      </div>

      <Stage>
        <Frame h={FRAME_H} label={`A tree sixty feet tall seen from ${distance} feet away, with the sight line to the top at ${r1(angle)} degrees. Below, a curve of the error in the answer against the angle you stand at, which is least at forty-five degrees.`}>
          {/* the ground */}
          <line x1="40" y1={GROUND} x2={W - 30} y2={GROUND} stroke="var(--ink)" strokeWidth="2" opacity="0.5" />

          {/* the tree */}
          <g>
            <line x1={baseX} y1={GROUND} x2={baseX} y2={topY + 10} stroke="var(--ink)" strokeWidth="5" />
            <ellipse cx={baseX} cy={topY + 26} rx="30" ry="34" fill={GREEN} opacity="0.28" />
            <ellipse cx={baseX} cy={topY + 14} rx="20" ry="20" fill={GREEN} opacity="0.3" />
            <Tag x={baseX} y={topY - 14} size={12.5} weight={700}>{`${TREE_FEET} feet, and you do not know that`}</Tag>
          </g>

          {/* the observer */}
          <g>
            <line x1={STAND_X} y1={GROUND} x2={STAND_X} y2={eyeY} stroke="var(--ink)" strokeWidth="3" />
            <circle cx={STAND_X} cy={eyeY - 5} r="5" fill="var(--ink)" />
            <Tag x={STAND_X - 8} y={GROUND + 20} anchor="end" size={11.5} weight={600}>
              {`eye ${ASSUMED_EYE_FEET} ft`}
            </Tag>
          </g>

          {/* the sight line and the angle */}
          <line x1={STAND_X} y1={eyeY} x2={baseX} y2={topY} stroke={BLUE} strokeWidth="2.4" />
          <line x1={STAND_X} y1={eyeY} x2={baseX} y2={eyeY} stroke="var(--ink-3)" strokeWidth="1.4" strokeDasharray="5 5" />
          <path d={`M ${STAND_X + 44} ${eyeY} A 44 44 0 0 0 ${STAND_X + 44 * Math.cos((angle * Math.PI) / 180)} ${eyeY - 44 * Math.sin((angle * Math.PI) / 180)}`}
            fill="none" stroke={BLUE} strokeWidth="1.6" />
          <Tag x={STAND_X + 62} y={eyeY - 16} anchor="start" size={12.5} weight={700} colour={BLUE}>{`${r1(angle)}°`}</Tag>

          {/* the measured base distance */}
          <line x1={STAND_X} y1={GROUND + 34} x2={baseX} y2={GROUND + 34} stroke="var(--accent)" strokeWidth="2" />
          {[STAND_X, baseX].map((x) => (
            <line key={x} x1={x} y1={GROUND + 28} x2={x} y2={GROUND + 40} stroke="var(--accent)" strokeWidth="2" />
          ))}
          <Tag x={(STAND_X + baseX) / 2} y={GROUND + 54} size={12.5} weight={700} colour="var(--accent)">
            {`${num(distance)} feet, paced — and good to ${pace}%`}
          </Tag>

          {/* the error curve */}
          <g>
            {[0, 0.05, 0.1, 0.15, 0.2].map((e) => (
              <g key={e}>
                <line x1={cx0} y1={CY(e)} x2={cx1} y2={CY(e)} stroke="var(--ink)" strokeWidth="0.7" opacity="0.18" />
                <Tag x={cx0 - 10} y={CY(e) + 4} anchor="end" size={10.5} weight={500} colour="var(--ink-2)">
                  {`${Math.round(e * 100)}%`}
                </Tag>
              </g>
            ))}
            {[5, 25, 45, 65, 85].map((a) => (
              <g key={a}>
                <line x1={CX(a)} y1={cy1} x2={CX(a)} y2={cy0} stroke="var(--ink)" strokeWidth="0.7" opacity="0.18" />
                <Tag x={CX(a)} y={cy0 + 18} size={10.5} weight={500} colour="var(--ink-2)">{`${a}°`}</Tag>
              </g>
            ))}
            <path d={curve} fill="none" stroke={RED} strokeWidth="2.6" />
            <line x1={CX(45)} y1={cy1 - 4} x2={CX(45)} y2={cy0 + 4} stroke={GREEN} strokeWidth="1.8" opacity="0.8" />
            <circle cx={CX(angle)} cy={CY(band)} r="6" fill={BLUE} />
            {/* Beside the line and inside the chart: above it, this label
                landed on the paced-distance caption, and at the foot of the
                chart it landed on the degree labels. */}
            <Tag x={CX(45) + 12} y={cy1 + 44} anchor="start" size={12} weight={700} colour={GREEN}>
              the best place to stand
            </Tag>
            <Tag x={W / 2} y={cy0 + 42} size={12} weight={600} colour="var(--ink-2)">
              how wrong the answer is, against the angle you take it at
            </Tag>
          </g>
        </Frame>
      </Stage>

      <Controls>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-hd" label={`Standing ${num(distance)} feet from the trunk`} min={25} max={FAR} step={5}
            value={distance} onChange={setDistance} />
          <Slider id="hw-hs" label={`Sighting good to ${sight}°`} min={0.5} max={3} step={0.5}
            value={sight} onChange={setSight} />
          <Slider id="hw-hp" label={`Pacing good to ${pace}%`} min={2} max={10} step={1}
            value={pace} onChange={setPace} />
        </div>
        <div className="hw-actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Toggle on={Math.abs(angle - 45) < 1} onClick={() => setDistance(Math.round(at45 / 5) * 5)}>
            WALK UNTIL THE TOP IS AT 45°
          </Toggle>
          <Toggle on={distance === FAR} onClick={() => setDistance(FAR)}>STAND WELL BACK</Toggle>
        </div>
      </Controls>
    </>
  )
}

/* ---- one week, six jobs ------------------------------------------------ */

export default function Field({ mode = 'wind' }) {
  const Scene = { wind: Wind, water: Water, living: Living, ice: Ice, survey: Survey, height: Height }[mode] ?? Wind
  return (
    <div className="hw-sim">
      <Scene />
    </div>
  )
}
