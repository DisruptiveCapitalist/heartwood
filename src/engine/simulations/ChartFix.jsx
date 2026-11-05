import { useMemo, useState } from 'react'
import {
  SHEET, WEEK5_MARKS, YOU, bearing, distance, cut, intersect, along, cockedHat,
  inside, area, across, reckon, yards, fromYards, brg, midSentence, random, gaussian
} from '../../lib/plot.js'

// Navigation, Lessons 21 to 25 — one map sheet, five jobs.
//
//   'fix'      two bearings crossed, and what the cut angle does    (Lesson 21)
//   'hat'      three bearings, and the triangle they leave          (Lesson 22)
//   'pace'     measuring the distance, and which way the error lies (Lesson 23)
//   'reckon'   carrying a position forward without any landmark     (Lesson 24)
//   'running'  one landmark, two bearings, and a run between them   (Lesson 25)
//
// The sheet is the one Lesson 10 established — the fire tower, Beaver Pond and
// Hollow Rock in the same places, 380 px to the mile, drawn to true north — with
// the ford and the old quarry added behind the observer, because Week 5 turns
// out to depend on whether the landmarks surround you.
//
// EVERYTHING QUOTED IN THE COPY IS COMPUTED IN src/lib/plot.js AND CHECKED IN
// src/__tests__/plot.test.js. The four findings that drove the week:
//
//   A two-bearing fix is as good as its cut angle and nothing else. On this one
//   sheet, with the same compass and the same two degrees of error, the best
//   pair lands 52 yards out and the worst 162 — a three-fold spread decided
//   entirely by which two landmarks were chosen.
//
//   The cocked hat contains the true position one time in four. Not usually.
//   Not often. One time in four, and that fraction does not improve when the
//   bearings do: 25.2% at half a degree, 25.2% at four degrees.
//
//   The size of the triangle hardly predicts the error — the correlation is
//   0.30. The simulation can be asked for a 31-yard triangle whose fix is 82
//   yards out, and a 120-yard triangle whose fix is 45 yards out.
//
//   A constant error behaves nothing like a random one. Two degrees the same
//   way on all three bearings: with the landmarks spread round you the fix is
//   11 yards out, with them all in front of you it is 81 yards out — and the
//   bunched set is the one that draws the SMALLER, tidier triangle.

export const MODES = ['fix', 'hat', 'pace', 'reckon', 'running']

const PAPER = '#f5efe3'
const RED = 'oklch(0.46 0.15 25)'
const GREEN = 'oklch(0.50 0.12 155)'
const BLUE = 'oklch(0.44 0.13 255)'

const W = SHEET.w
const H = SHEET.h

// .hw-readouts is inset 22px from the stage, and so is the SVG — so on this
// simulation, whose paper fills the whole picture, the readout text begins
// exactly on the edge of the sheet. Every other simulation's chart has its own
// margin inside the drawing. Scoped to this component rather than changed in
// the stylesheet, which four finished courses depend on.
const READOUT_INSET = { paddingInline: 14 }
const r0 = (n) => Math.round(n)
/** Yards, rounded, with a separator — the copy writes 1,021 and so should the screen. */
const yd = (px) => r0(yards(px)).toLocaleString('en-US')
/** The same number, unformatted, for comparisons. */
const ydn = (px) => r0(yards(px))
const mark = (id) => WEEK5_MARKS.find((m) => m.id === id)

/* ---- the sheet --------------------------------------------------------- */

/**
 * The map sheet: grid, north arrow, scale bar, landmarks. Everything drawn on
 * top of it is clipped to it, so a position line that runs off the paper stops
 * at the edge the way it would on paper.
 */
function Sheet({ children, lit = [], dim = [], label }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: 'auto', display: 'block' }} role="img" aria-label={label}>
      <defs>
        <clipPath id="hw-sheet"><rect x="0" y="0" width={W} height={H} rx="6" /></clipPath>
      </defs>
      <rect x="0" y="0" width={W} height={H} rx="6" fill={PAPER} />
      <g clipPath="url(#hw-sheet)">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`v${i}`} x1={70 + i * 150} y1="0" x2={70 + i * 150} y2={H}
            stroke="var(--ink)" strokeWidth="0.8" opacity="0.2" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line key={`h${i}`} x1="0" y1={70 + i * 140} x2={W} y2={70 + i * 140}
            stroke="var(--ink)" strokeWidth="0.8" opacity="0.2" />
        ))}
        {children}
      </g>

      {/* True north and the scale bar both live along the BOTTOM of the sheet.
          At full width .hw-readouts is position:absolute and floats over the
          top of the stage — 92 px of it, which is about 71 units of this
          viewBox — so anything drawn in the top band is printed over. The
          north arrow was there and the readout sat on top of it, so it now
          starts below the band rather than inside it.
          The scale caption is set above its bar rather than after it: beside
          it, the text ran off the right-hand edge of the paper. */}
      <g transform={`translate(42 118)`}>
        <line x1="0" y1="26" x2="0" y2="-14" stroke="var(--ink)" strokeWidth="2.5" />
        <path d="M 0 -22 l -7 12 l 14 0 z" fill="var(--ink)" />
        <text x="0" y="44" textAnchor="middle"
          style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, fill: 'var(--ink)' }}>
          <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>TRUE N</tspan>
        </text>
      </g>
      <g transform={`translate(${W - 212} ${H - 26})`}>
        <text x="0" y="-11" style={{ fontFamily: 'var(--sans)', fontSize: 11.5, fill: 'var(--ink-2)' }}>
          <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>half a mile — 880 yards</tspan>
        </text>
        <line x1="0" y1="0" x2={SHEET.pxPerMile / 2} y2="0" stroke="var(--ink)" strokeWidth="3" />
        {[0, SHEET.pxPerMile / 4, SHEET.pxPerMile / 2].map((x) => (
          <line key={x} x1={x} y1="-5" x2={x} y2="5" stroke="var(--ink)" strokeWidth="1.5" />
        ))}
      </g>

      {WEEK5_MARKS.map((m) => {
        const on = lit.includes(m.id)
        const faded = dim.includes(m.id)
        if (faded && !on) return null
        return (
          <g key={m.id} opacity={on ? 1 : 0.4}>
            <circle cx={m.x} cy={m.y} r={on ? 9 : 6} fill="var(--ink)" />
            <text x={m.x} y={m.y - 17} textAnchor="middle"
              style={{ fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: on ? 700 : 500, fill: 'var(--ink)' }}>
              <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>{m.name}</tspan>
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** A position line: through a landmark, along a bearing, right across the sheet. */
function Line({ at, bearing: b, colour = BLUE, width = 2, dash = '8 6', opacity = 1 }) {
  const a = along(at, b, 1400)
  const z = along(at, b, -1400)
  return <line x1={a.x} y1={a.y} x2={z.x} y2={z.y} stroke={colour} strokeWidth={width}
    strokeDasharray={dash} opacity={opacity} />
}

/** Where the simulation knows you are. Shown because the lesson is the error. */
function Truth({ at, label = `where you actually are` }) {
  return (
    <g>
      <circle cx={at.x} cy={at.y} r="7" fill={GREEN} />
      <circle cx={at.x} cy={at.y} r="15" fill="none" stroke={GREEN} strokeWidth="2" opacity="0.6" />
      <text x={at.x} y={at.y + 32} textAnchor="middle"
        style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, fill: GREEN }}>
        <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>{label}</tspan>
      </text>
    </g>
  )
}

/**
 * The place the plot says you are.
 *
 * `near` is the marker it may collide with. A good fix puts the cross within a
 * few pixels of the truth, and then three captions — this one, the truth's and
 * the gap's — print on top of each other. When they are that close the cross
 * is unambiguous on its own and the gap label carries the number, so this
 * caption stands down rather than being nudged somewhere it does not belong.
 */
function Plotted({ at, near, label = `where the plot says` }) {
  if (!at) return null
  const crowded = near && distance(at, near) < 46
  return (
    <g>
      <path d={`M ${at.x - 9} ${at.y - 9} L ${at.x + 9} ${at.y + 9} M ${at.x - 9} ${at.y + 9} L ${at.x + 9} ${at.y - 9}`}
        stroke={RED} strokeWidth="3" />
      {!crowded && (
        <text x={at.x} y={at.y - 18} textAnchor="middle"
          style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, fill: RED }}>
          <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>{label}</tspan>
        </text>
      )}
    </g>
  )
}

/** The gap between two points, drawn and labelled in yards. */
function Gap({ from, to }) {
  if (!from || !to) return null
  if (ydn(distance(from, to)) < 4) return null
  const d = yd(distance(from, to))
  // Set the label off to the side of the gap, square to it, so a short gap
  // does not put the number on top of the two markers it runs between.
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }
  const len = Math.max(1, distance(from, to))
  const off = { x: -(to.y - from.y) / len, y: (to.x - from.x) / len }
  const at = { x: mid.x + off.x * 34, y: mid.y + off.y * 34 }
  return (
    <g>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={RED} strokeWidth="1.6" strokeDasharray="3 3" />
      <text x={at.x} y={at.y + 4} textAnchor="middle"
        style={{ fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 700, fill: RED }}>
        <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>{d} yd out</tspan>
      </text>
    </g>
  )
}

/**
 * A magnified corner of the sheet.
 *
 * The whole point of Lessons 21 and 22 is a region a few yards across on a
 * sheet two miles wide: a fifteen-yard cocked hat is three pixels of this
 * viewBox, and at half a degree of error it is less than one. Drawn at sheet
 * scale the thing the lesson is about is simply not there, so it gets a panel
 * of its own with the magnification printed on it.
 *
 * The scale is chosen so the region of interest fills most of the panel, and
 * clamped, so a good fix and a terrible one both stay legible. Strokes carry
 * vectorEffect="non-scaling-stroke" or the magnification would thicken every
 * line along with the geometry.
 */
function Inset({ at, span, children, x = 20, y = H - 192, w = 160, h = 166, label }) {
  if (!at) return null
  const k = Math.min(48, Math.max(2, (w * 0.78) / Math.max(span, 4)))
  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <clipPath id="hw-inset"><rect x="1" y="1" width={w - 2} height={h - 28} rx="4" /></clipPath>
      </defs>
      <rect x="0" y="0" width={w} height={h} rx="6" fill={PAPER}
        stroke="var(--ink)" strokeWidth="1.2" strokeOpacity="0.55" />
      <rect x="0" y="0" width={w} height={h - 26} rx="6" fill="var(--paper-alt)" fillOpacity="0.5" />
      <g clipPath="url(#hw-inset)">
        <g transform={`translate(${w / 2} ${(h - 26) / 2}) scale(${k}) translate(${-at.x} ${-at.y})`}>
          {children}
        </g>
      </g>
      <text x={w / 2} y={h - 9} textAnchor="middle"
        style={{ fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, fill: 'var(--ink-2)' }}>
        {label} · ×{Math.round(k)}
      </text>
    </g>
  )
}

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

function Pick({ options, value, onChange, label, idOf = (o) => o.id, nameOf = (o) => o.name }) {
  return (
    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
      {label && <span className="hw-readout-label">{label}</span>}
      {options.map((o) => {
        const id = idOf(o)
        const on = id === value
        return (
          <button key={id} className="hw-btn" aria-pressed={on} onClick={() => onChange(id)}
            style={{
              padding: '9px 12px', fontSize: 12.5,
              background: on ? 'var(--ink)' : 'var(--paper)',
              color: on ? '#f6f1e7' : 'var(--ink)',
              borderColor: on ? 'var(--ink)' : 'var(--field)'
            }}>{nameOf(o)}</button>
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

/* ---- Lesson 21 — two bearings crossed ---------------------------------- */

function TwoBearings() {
  const [a, setA] = useState('quarry')
  const [b, setB] = useState('ford')
  // Both bearings wrong the same way by default, so that changing which two
  // landmarks are used is the ONLY thing that changes. Set one of them the
  // other way and the shallow pair suddenly looks good — which is true, and
  // true only for that one combination of signs, and the reason the shaded
  // region rather than the crossing point is what the learner should read.
  const [errA, setErrA] = useState(2)
  const [errB, setErrB] = useState(2)

  const ma = mark(a)
  const mb = mark(b)
  const same = a === b
  const ta = bearing(YOU, ma)
  const tb = bearing(YOU, mb)
  const theta = cut(ta, tb)
  const fix = same ? null : intersect(ma, ta + errA, mb, tb + errB)

  // The region the fix could be in, if each bearing is wrong by up to the
  // amount set. Four corners, one per combination of the two extremes — which
  // is the whole picture of why a shallow cut gives a long thin answer.
  const E = Math.max(Math.abs(errA), Math.abs(errB), 0.25)
  const box = same ? [] : [[-E, -E], [-E, E], [E, E], [E, -E]]
    .map(([p, q]) => intersect(ma, ta + p, mb, tb + q))
  const usable = box.length === 4 && box.every(Boolean)
  // How much of the sheet the uncertainty region covers, so the inset can
  // choose a magnification that fits it.
  const boxSpan = usable
    ? Math.max(...box.map((p) => distance(p, YOU))) * 2.2
    : 0
  const missN = fix ? ydn(distance(YOU, fix)) : null
  const miss = fix ? yd(distance(YOU, fix)) : null

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="THEY CROSS AT" value={same ? `—` : `${r0(theta)}°`}
          colour={same ? RED : theta >= 60 ? GREEN : theta >= 30 ? undefined : RED}
          note={same
            ? `Two bearings to the same landmark are one bearing. There is no crossing and no fix.`
            : theta >= 60
              ? `A square cut. The two lines pin each other down.`
              : theta >= 30
                ? `Usable, and you can see the answer starting to stretch.`
                : `A shallow cut. The lines lie almost along each other, and the fix slides.`} />
        <Readout align="right" width={290} label="SO THE FIX IS OUT BY"
          value={miss === null ? `no fix` : `${miss} yd`} colour={missN === null ? RED : missN > 120 ? RED : GREEN}
          note={same ? `Pick two different landmarks.`
            : `with ${Math.abs(errA)}° on one bearing and ${Math.abs(errB)}° on the other, at ${yd(distance(YOU, ma))} and ${yd(distance(YOU, mb))} yards`} />
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <Sheet lit={[a, b]}
          label={`A map sheet. Bearings plotted back from ${ma.name} and ${mb.name} cross at ${r0(theta)} degrees. With errors of ${errA} and ${errB} degrees the fix lands ${miss ?? 0} yards from the true position.`}>
          {usable && (
            <polygon points={box.map((p) => `${p.x},${p.y}`).join(' ')}
              fill={RED} fillOpacity="0.13" stroke={RED} strokeWidth="1" strokeOpacity="0.4" />
          )}
          {!same && <Line at={ma} bearing={ta + errA} />}
          {!same && <Line at={mb} bearing={tb + errB} />}
          <Truth at={YOU} />
          <Plotted at={fix} near={YOU} />
          <Gap from={fix} to={YOU} />
          {usable && (
            <Inset at={YOU} span={boxSpan} label="THE FIX, CLOSE UP">
              <polygon points={box.map((p) => `${p.x},${p.y}`).join(' ')}
                fill={RED} fillOpacity="0.18" stroke={RED} strokeWidth="1"
                strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
              <circle cx={YOU.x} cy={YOU.y} r="2.5" fill={GREEN} vectorEffect="non-scaling-stroke" />
              {fix && (
                <path d={`M ${fix.x - 3} ${fix.y - 3} L ${fix.x + 3} ${fix.y + 3} M ${fix.x - 3} ${fix.y + 3} L ${fix.x + 3} ${fix.y - 3}`}
                  stroke={RED} strokeWidth="2" vectorEffect="non-scaling-stroke" />
              )}
            </Inset>
          )}
        </Sheet>
      </div>

      <div className="hw-controls hw-controls-stack" style={{ flexDirection: 'column', alignItems: 'stretch', flexWrap: 'nowrap', gap: 12 }}>
        <Pick label="FIRST BEARING TO" options={WEEK5_MARKS} value={a} onChange={setA} />
        <Pick label="SECOND BEARING TO" options={WEEK5_MARKS} value={b} onChange={setB} />
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-ea" label={`First bearing wrong by ${errA > 0 ? '+' : ''}${errA}°`}
            min={-4} max={4} step={0.5} value={errA} onChange={setErrA} />
          <Slider id="hw-eb" label={`Second bearing wrong by ${errB > 0 ? '+' : ''}${errB}°`}
            min={-4} max={4} step={0.5} value={errB} onChange={setErrB} />
        </div>
      </div>
    </>
  )
}

/* ---- Lesson 22 — the cocked hat ---------------------------------------- */

const TRIOS = [
  { id: 'front', name: `All three in front of you`, ids: ['tower', 'pond', 'rock'] },
  { id: 'round', name: `Spread round you`, ids: ['pond', 'rock', 'quarry'] },
  { id: 'wide', name: `Spread the other way`, ids: ['tower', 'quarry', 'ford'] }
]

function CockedHat() {
  const [trioId, setTrio] = useState('front')
  const [sigma, setSigma] = useState(2)
  const [constant, setConstant] = useState(false)
  // Sample 3 on load: a 15-yard triangle whose fix is 42 yards out, with the
  // truth outside it. A tidy little triangle and a bad fix is the lesson, and
  // opening on a lucky draw would teach the opposite.
  const [sample, setSample] = useState(3)
  const [tally, setTally] = useState({ n: 0, inside: 0 })

  const trio = TRIOS.find((t) => t.id === trioId)
  const marks = trio.ids.map(mark)
  const truth = marks.map((m) => bearing(YOU, m))

  const errors = useMemo(() => {
    if (constant) return [sigma, sigma, sigma]
    const rng = random(sample * 7919 + 13)
    return [gaussian(rng) * sigma, gaussian(rng) * sigma, gaussian(rng) * sigma]
  }, [constant, sigma, sample])

  const lines = marks.map((m, i) => ({ mark: m, observed: truth[i] + errors[i] }))
  const hat = cockedHat(lines)
  const good = hat.every(Boolean)
  const centre = good
    ? { x: (hat[0].x + hat[1].x + hat[2].x) / 3, y: (hat[0].y + hat[1].y + hat[2].y) / 3 }
    : null
  const holds = good && inside(YOU, hat)
  // Big enough to hold both the triangle and the true position, so the inset
  // never crops the one comparison it exists to make.
  const hatSpan = good
    ? Math.max(...hat.map((p) => distance(p, centre)), distance(YOU, centre)) * 2.2
    : 0
  const side = good ? yd(Math.sqrt(area(hat))) : null
  const missN = centre ? ydn(distance(YOU, centre)) : null
  const miss = centre ? yd(distance(YOU, centre)) : null

  // A fresh set of bearings, and a note kept of how often the truth was in it.
  const again = () => {
    setConstant(false)
    setSample((s) => s + 1)
    setTally((t) => ({ n: t.n + 1, inside: t.inside + (holds ? 1 : 0) }))
  }

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="THE TRIANGLE IS ABOUT" value={side === null ? `—` : `${side} yd`} width={200}
          note={`a side, from ${constant ? `the same ${sigma}° on all three bearings` : `errors of ${errors.map((e) => `${e > 0 ? '+' : ''}${e.toFixed(1)}°`).join(', ')}`}`} />
        <Readout label="AND THE FIX IS OUT BY" value={miss === null ? `—` : `${miss} yd`} width={180}
          colour={missN !== null && missN > 60 ? RED : GREEN} note={`taking the middle of it as your position`} />
        <Readout align="right" width={250} label="IS THE TRUTH INSIDE THE TRIANGLE?"
          value={holds ? `yes` : `no`} colour={holds ? GREEN : RED}
          note={tally.n > 0
            ? `${tally.inside} of the last ${tally.n} ${tally.n === 1 ? 'set was' : 'sets were'} — the long run is one in four`
            : `press TAKE ANOTHER SET and keep count`} />
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <Sheet lit={trio.ids} dim={WEEK5_MARKS.map((m) => m.id).filter((id) => !trio.ids.includes(id))}
          label={`Three bearings plotted back from ${marks.map((m) => m.name).join(', ')} leave a triangle about ${side} yards a side. The true position is ${holds ? 'inside' : 'outside'} it, and the middle of the triangle is ${miss} yards from the truth.`}>
          {good && (
            <polygon points={hat.map((p) => `${p.x},${p.y}`).join(' ')}
              fill={holds ? GREEN : RED} fillOpacity="0.15" stroke={holds ? GREEN : RED} strokeWidth="1.5" />
          )}
          {lines.map((l, i) => <Line key={i} at={l.mark} bearing={l.observed} />)}
          <Truth at={YOU} />
          <Plotted at={centre} near={YOU} label={`the middle of the hat`} />
          <Gap from={centre} to={YOU} />
          {good && (
            <Inset at={centre} span={hatSpan} label={holds ? `THE HAT HOLDS YOU` : `THE HAT MISSES YOU`}>
              {lines.map((l, i) => {
                const a = along(l.mark, l.observed, 1400)
                const z = along(l.mark, l.observed, -1400)
                return <line key={i} x1={a.x} y1={a.y} x2={z.x} y2={z.y} stroke={BLUE}
                  strokeWidth="1" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
              })}
              <polygon points={hat.map((p) => `${p.x},${p.y}`).join(' ')}
                fill={holds ? GREEN : RED} fillOpacity="0.2" stroke={holds ? GREEN : RED}
                strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle cx={YOU.x} cy={YOU.y} r="2.5" fill={GREEN} vectorEffect="non-scaling-stroke" />
              <path d={`M ${centre.x - 3} ${centre.y - 3} L ${centre.x + 3} ${centre.y + 3} M ${centre.x - 3} ${centre.y + 3} L ${centre.x + 3} ${centre.y - 3}`}
                stroke={RED} strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </Inset>
          )}
        </Sheet>
      </div>

      <div className="hw-controls hw-controls-stack" style={{ flexDirection: 'column', alignItems: 'stretch', flexWrap: 'nowrap', gap: 12 }}>
        <Pick label="WHICH THREE" options={TRIOS} value={trioId} onChange={setTrio} />
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Slider id="hw-sigma" label={`Bearings good to about ${sigma}°`} min={0.5} max={4} step={0.5}
            value={sigma} onChange={setSigma} />
          <div className="hw-actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="hw-btn" onClick={again} style={{ padding: '10px 14px', fontSize: 12.5 }}>
              TAKE ANOTHER SET
            </button>
            <button className="hw-btn" aria-pressed={constant} onClick={() => setConstant((c) => !c)}
              style={{
                padding: '10px 14px', fontSize: 12.5,
                background: constant ? 'var(--accent-wash)' : 'var(--paper)',
                borderColor: constant ? 'var(--accent)' : 'var(--field)'
              }}>
              {constant ? `BACK TO RANDOM ERRORS` : `ALL THREE WRONG THE SAME WAY`}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

/* ---- Lesson 23 — measuring the distance -------------------------------- */

function Pacing() {
  const [to, setTo] = useState('quarry')
  // Short rather than long by default: the ford-to-quarry leg climbs, and a
  // stride shortens going uphill, so the realistic opening case is stopping
  // short of the mark rather than overrunning it.
  const [pct, setPct] = useState(-5)
  const [err, setErr] = useState(2)

  const from = mark('ford')
  const target = mark(to)
  const b = bearing(from, target)
  const trueRange = distance(from, target)
  const walked = trueRange * (1 + pct / 100)

  // Where you think you have arrived: wrong bearing, wrong distance. The two
  // errors are at right angles to each other, which is the whole lesson.
  const believed = along(from, b + err, walked)
  const alongOnly = along(from, b, walked)
  const acrossOnly = along(from, b + err, trueRange)
  const alongYd = yd(Math.abs(walked - trueRange))
  const acrossYd = yd(across(trueRange, err))

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="THE DISTANCE ERROR MOVES YOU" value={`${alongYd} yd`} width={225}
          note={`ALONG the line — ${Math.abs(pct)}% of ${yd(trueRange)} yards, which is what a mis-measured pace does`} />
        <Readout label="THE BEARING ERROR MOVES YOU" value={`${acrossYd} yd`} width={225}
          note={`ACROSS it — ${Math.abs(err)}° at ${yd(trueRange)} yards, which is what a mis-read compass does`} />
        <Readout align="right" width={210} label="TOGETHER" value={`${yd(distance(target, believed))} yd`}
          colour={RED} note={`from where you meant to be`} />
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <Sheet lit={['ford', to]} dim={WEEK5_MARKS.map((m) => m.id).filter((id) => id !== 'ford' && id !== to)}
          label={`A walk from the ford to ${target.name}. A ${pct} per cent distance error moves the arrival ${alongYd} yards along the line and a ${err} degree bearing error moves it ${acrossYd} yards across, landing ${yd(distance(target, believed))} yards from the intended point.`}>
          {/* the error box: the two measurements are perpendicular, so it is a box */}
          <polygon fill={RED} fillOpacity="0.1" stroke="none" points={[target, alongOnly, believed, acrossOnly]
            .map((p) => `${p.x},${p.y}`).join(' ')} />
          <line x1={from.x} y1={from.y} x2={target.x} y2={target.y} stroke={GREEN} strokeWidth="2.5" />
          <line x1={from.x} y1={from.y} x2={believed.x} y2={believed.y} stroke={RED} strokeWidth="2.5" strokeDasharray="8 6" />
          <line x1={target.x} y1={target.y} x2={alongOnly.x} y2={alongOnly.y} stroke={BLUE} strokeWidth="3" />
          <line x1={target.x} y1={target.y} x2={acrossOnly.x} y2={acrossOnly.y} stroke="var(--accent)" strokeWidth="3" />
          <text x={(target.x + alongOnly.x) / 2 + 8} y={(target.y + alongOnly.y) / 2 + 18}
            style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 700, fill: BLUE }}>
            <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>{alongYd} yd along</tspan>
          </text>
          <text x={(target.x + acrossOnly.x) / 2 + 8} y={(target.y + acrossOnly.y) / 2 - 10}
            style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 700, fill: 'var(--accent)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>{acrossYd} yd across</tspan>
          </text>
          <Plotted at={believed} label={`where you stop`} />
          <text x={from.x} y={from.y + 30} textAnchor="middle"
            style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, fill: GREEN }}>
            <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>you set off here</tspan>
          </text>
        </Sheet>
      </div>

      <div className="hw-controls hw-controls-stack" style={{ flexDirection: 'column', alignItems: 'stretch', flexWrap: 'nowrap', gap: 12 }}>
        <Pick label="WALK TO" value={to} onChange={setTo}
          options={WEEK5_MARKS.filter((m) => m.id !== 'ford')} />
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-pct" label={`Your pace is ${pct > 0 ? 'long' : pct < 0 ? 'short' : 'exact'} by ${Math.abs(pct)}%`}
            min={-15} max={15} step={1} value={pct} onChange={setPct} />
          <Slider id="hw-berr" label={`Your bearing is off by ${err > 0 ? '+' : ''}${err}°`}
            min={-6} max={6} step={0.5} value={err} onChange={setErr} />
        </div>
      </div>
    </>
  )
}

/* ---- Lesson 24 — dead reckoning ---------------------------------------- */

// Three legs that fold back on themselves, so 1.6 miles of running fits on a
// sheet two miles wide with room for the current to push the track about.
// Three legs that fold back on themselves, so 1.6 miles of running fits on a
// sheet two miles wide. The start sits high and to the left because the current
// is allowed to set any way at all, and a track shoved off the bottom of the
// paper would lose the one marker the lesson is about.
const LEGS = [
  { course: 70, part: 0.40 },
  { course: 130, part: 0.35 },
  { course: 60, part: 0.25 }
]
const TOTAL_MILES = 1.6
const DR_START = { x: 90, y: 300 }

function DeadReckoning() {
  const [speed, setSpeed] = useState(3)
  const [bias, setBias] = useState(4)
  const [drift, setDrift] = useState(0.4)
  const [set, setSet] = useState(180)

  const START = DR_START
  const totalMiles = TOTAL_MILES
  const hours = totalMiles / speed
  const legs = LEGS.map((l) => ({ course: l.course, speed, hours: hours * l.part }))

  const r = reckon(START, legs, { bias, set, drift })
  const fromBias = reckon(START, legs, { bias }).gap
  const fromCurrent = reckon(START, legs, { set, drift }).gap

  const path = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')

  // A strong current running for long enough carries the real track clean off
  // the paper, and that is not a case to engineer away — it is what dead
  // reckoning does to people. So the physics is left alone and the marker is
  // pinned to the edge with the distance beyond it named, rather than drawn
  // somewhere it is not.
  const end = r.made[r.made.length - 1]
  const INSET = 20
  const onSheet = end.x > INSET && end.x < W - INSET && end.y > INSET && end.y < H - INSET
  const shown = onSheet ? end : {
    x: Math.min(W - INSET, Math.max(INSET, end.x)),
    y: Math.min(H - INSET, Math.max(INSET, end.y))
  }
  const beyond = yd(distance(shown, end))

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="YOU HAVE RUN" value={`${totalMiles.toFixed(1)} mi`} width={170}
          note={`in ${hours.toFixed(1)} hours at ${speed} mph, on three courses`} />
        <Readout label="AND THE PLOT IS WRONG BY" value={`${yd(r.gap)} yd`} colour={RED} width={200}
          note={onSheet
            ? `in the direction ${brg(r.bearingOfGap)}°`
            : `in the direction ${brg(r.bearingOfGap)}° — which has taken you off this sheet altogether`} />
        <Readout align="right" width={300} label="OF WHICH"
          value={`${yd(fromBias)} + ${yd(fromCurrent)} yd`}
          note={`the steering bias grows with the ${totalMiles.toFixed(1)} miles run; the current grows with the ${hours.toFixed(1)} hours elapsed. Halve the speed and the second one doubles while the first does not move.`} />
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <Sheet dim={WEEK5_MARKS.map((m) => m.id)}
          label={`A dead reckoning plot of three legs, ${totalMiles} miles in ${hours.toFixed(1)} hours. The plotted track and the track actually made diverge, ending ${yd(r.gap)} yards apart.`}>
          <path d={path(r.plotted)} fill="none" stroke={BLUE} strokeWidth="2.5" strokeDasharray="9 6" />
          <path d={path(r.made)} fill="none" stroke={GREEN} strokeWidth="2.5" />
          {r.plotted.slice(1).map((p, i) => (
            <circle key={`p${i}`} cx={p.x} cy={p.y} r="4" fill={BLUE} />
          ))}
          {r.made.slice(1).map((p, i) => (
            <circle key={`m${i}`} cx={p.x} cy={p.y} r="4" fill={GREEN} />
          ))}
          <circle cx={START.x} cy={START.y} r="7" fill="var(--ink)" />
          <text x={START.x + 12} y={START.y + 5}
            style={{ fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 600, fill: 'var(--ink)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>your last known fix</tspan>
          </text>
          <Plotted at={r.plotted[r.plotted.length - 1]} near={shown} label={`the plot says here`} />
          <Truth at={shown} label={onSheet ? `you are actually here` : `off the sheet — ${beyond} yd past this edge`} />
          <Gap from={r.plotted[r.plotted.length - 1]} to={shown} />
        </Sheet>
      </div>

      <div className="hw-controls hw-controls-stack" style={{ flexDirection: 'column', alignItems: 'stretch', flexWrap: 'nowrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-sp" label={`Going ${speed} mph — ${hours.toFixed(1)} hours for the run`}
            min={2} max={6} step={0.5} value={speed} onChange={setSpeed} />
          <Slider id="hw-bias" label={`Steering ${bias > 0 ? 'right' : bias < 0 ? 'left' : 'true'} by ${Math.abs(bias)}°`}
            min={-8} max={8} step={1} value={bias} onChange={setBias} />
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-drift" label={`Current ${drift.toFixed(1)} mph`} min={0} max={0.8} step={0.1}
            value={drift} onChange={setDrift} />
          <Slider id="hw-set" label={`Setting towards ${brg(set)}°`} min={0} max={350} step={10}
            value={set} onChange={setSet} />
        </div>
      </div>
    </>
  )
}

/* ---- Lesson 25 — the running fix --------------------------------------- */

function RunningFix() {
  const [run, setRun] = useState(900)
  const [err, setErr] = useState(2)

  const TOWER = mark('tower')
  const START = { x: 300, y: 430 }
  const COURSE = 90

  const second = along(START, COURSE, fromYards(run))
  const first = bearing(START, TOWER)
  const then = bearing(second, TOWER)
  const theta = cut(first, then)

  // Transfer the first line forward along the run. On paper you slide the line
  // itself; the arithmetic is the same as sliding the landmark.
  const moved = along(TOWER, COURSE, fromYards(run))
  const fix = intersect(moved, first + err, TOWER, then - err)

  let worst = 0
  for (const s1 of [-err, err]) {
    for (const s2 of [-err, err]) {
      const f = intersect(moved, first + s1, TOWER, then + s2)
      if (f) worst = Math.max(worst, distance(second, f))
    }
  }

  return (
    <>
      <div className="hw-readouts" style={READOUT_INSET}>
        <Readout label="THE SIGHT LINE HAS SWUNG" value={`${theta.toFixed(1)}°`} width={190}
          colour={theta >= 25 ? GREEN : RED}
          note={`from ${brg(first)}° to ${brg(then)}° over ${run} yards of running`} />
        <Readout label="SO THE CUT COULD LEAVE YOU" value={`${yd(worst)} yd`} width={220}
          colour={ydn(worst) > 400 ? RED : GREEN}
          note={`out, worst case, with ${err}° on each bearing`} />
        <Readout align="right" width={260} label="WHICH IS"
          value={worst > distance(START, TOWER) ? `meaningless` : worst > fromYards(400) ? `too loose to use` : `a fix`}
          colour={worst > fromYards(400) ? RED : GREEN}
          note={worst > distance(START, TOWER)
            ? `further than the tower is away. Run further before you take the second bearing.`
            : worst > fromYards(400)
              ? `better than nothing and not much better. The cut is still too shallow.`
              : `one landmark, two bearings, and a measured run between them.`} />
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <Sheet lit={['tower']} dim={['pond', 'rock', 'quarry', 'ford']}
          label={`One landmark, two bearings and a ${run} yard run between them. The sight line swings ${theta.toFixed(1)} degrees, and the resulting fix could be ${yd(worst)} yards out.`}>
          {/* the run, and the transferred first line */}
          <line x1={START.x} y1={START.y} x2={second.x} y2={second.y} stroke="var(--ink)" strokeWidth="3" />
          <Line at={TOWER} bearing={first} colour="var(--ink-3)" width="1.5" dash="3 5" opacity="0.7" />
          <Line at={moved} bearing={first + err} colour={BLUE} />
          <Line at={TOWER} bearing={then - err} colour={BLUE} />
          <circle cx={START.x} cy={START.y} r="6" fill="var(--ink)" />
          <text x={START.x - 10} y={START.y + 24} textAnchor="end"
            style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, fill: 'var(--ink)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>first bearing taken here</tspan>
          </text>
          <text x={(START.x + second.x) / 2} y={START.y - 12} textAnchor="middle"
            style={{ fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 700, fill: 'var(--ink)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: PAPER, strokeWidth: 5 }}>ran {run} yd on 090</tspan>
          </text>
          <Truth at={second} label={`second bearing taken here`} />
          <Plotted at={fix} near={second} />
          <Gap from={fix} to={second} />
        </Sheet>
      </div>

      <div className="hw-controls hw-controls-stack" style={{ flexDirection: 'column', alignItems: 'stretch', flexWrap: 'nowrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Slider id="hw-run" label={`Run ${run} yards between the two bearings`} min={200} max={1300} step={50}
            value={run} onChange={setRun} />
          <Slider id="hw-rerr" label={`Each bearing good to ${err}°`} min={0.5} max={4} step={0.5}
            value={err} onChange={setErr} />
        </div>
      </div>
    </>
  )
}

/* ---- one sheet, five jobs ---------------------------------------------- */

export default function ChartFix({ mode = 'fix' }) {
  const Scene = {
    fix: TwoBearings,
    hat: CockedHat,
    pace: Pacing,
    reckon: DeadReckoning,
    running: RunningFix
  }[mode] ?? TwoBearings

  return (
    <div className="hw-sim">
      <Scene />
    </div>
  )
}
