import { useMemo, useState } from 'react'

// Navigation, Lesson 4 — maps: turning the Earth into a picture.
//
// Two tabs, because the lesson has two halves and they are different problems.
//
// FLATTEN IT. Greenland and Africa as lat/long outlines, pushed through three
// projections. Nothing about the comparison is asserted: the area ratio in the
// readout is the shoelace area of the polygon actually drawn, so the number
// always describes what is on the screen.
//
//   true areas      Greenland 836,330 sq mi · Africa 11,724,000 sq mi → 14.0×
//   equal-area map  measures 14.0×   (the outlines were tuned until it did)
//   Mercator        measures  1.0×   — the famous illusion, not an exaggeration
//   the globe       measures 15.3×   at this viewing angle, both foreshortened
//
// READ THE GROUND. One analytic height field, contoured live by marching
// squares, so the lines cannot disagree with the hill they describe — and the
// cross-section is sampled from the same function.
//
//   6 ft of ground per pixel → the map is 1.02 × 0.64 miles
//   summit 1,689 ft · saddle 1,295 ft · lowest ground 1,200 ft
//   steepest hillside 47 ft per 100 ft (25°) — 40-ft contours 85 ft apart
//   broad ridge top    9 ft per 100 ft  (5°) — 40-ft contours 433 ft apart

const W = 900
const H = 560
const FT_PER_PX = 6
const BASE = 1200
const CONTOUR = 'oklch(0.46 0.07 60)'

const rad = (d) => (d * Math.PI) / 180
const deg = (r) => (r * 180) / Math.PI

/* ---- Flatten it ------------------------------------------------------- */

const GREENLAND = [
  [83.5, -33], [81.5, -17], [78, -20], [76, -20], [70, -22], [68, -29], [64, -40],
  [60.5, -43], [64, -50], [69, -51], [75, -58], [78, -70], [80, -65], [82, -48]
]
const AFRICA = [
  [37, 10], [32, 22], [31, 32], [12, 43], [11, 51], [-1, 42], [-10, 40], [-26, 33],
  [-34, 25], [-34, 18], [-23, 14], [-6, 12], [4, 9], [5, -4], [14, -17], [21, -17], [28, -11], [36, -6]
]
const TRUE_RATIO = 11724000 / 836330      // 14.0

const WINDOW = { lat: [-40, 84], lon: [-85, 60] }
const GLOBE_AT = { lat: 30, lon: -12 }

const PROJECTIONS = {
  globe: {
    label: `A globe`,
    blurb: `The real shape. Nothing is distorted — but you can only ever see half of it, and the half you see is squashed towards the edges.`,
    project: ([la, lo]) => {
      const dl = rad(lo - GLOBE_AT.lon)
      const cosc = Math.sin(rad(GLOBE_AT.lat)) * Math.sin(rad(la)) +
        Math.cos(rad(GLOBE_AT.lat)) * Math.cos(rad(la)) * Math.cos(dl)
      return [
        Math.cos(rad(la)) * Math.sin(dl),
        -(Math.cos(rad(GLOBE_AT.lat)) * Math.sin(rad(la)) - Math.sin(rad(GLOBE_AT.lat)) * Math.cos(rad(la)) * Math.cos(dl)),
        cosc > 0
      ]
    }
  },
  mercator: {
    label: `Mercator`,
    blurb: `Every compass direction comes out as a straight line — which is why sailors have used it for four hundred years. The price is paid in size, and the bill grows towards the poles.`,
    project: ([la, lo]) => {
      const c = Math.max(-84, Math.min(84, la))
      return [rad(lo), -Math.log(Math.tan(Math.PI / 4 + rad(c) / 2)), true]
    }
  },
  equal: {
    label: `Equal-area`,
    blurb: `Sizes are honest everywhere. The price is paid in shape: look what happens to Greenland and to the far north of Africa — squashed flat.`,
    project: ([la, lo]) => [rad(lo), -Math.sin(rad(la)), true]
  }
}

/** Polygon area in whatever units the points are in. */
function shoelace(pts) {
  let a = 0
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i]
    const [x2, y2] = pts[(i + 1) % pts.length]
    a += x1 * y2 - x2 * y1
  }
  return Math.abs(a) / 2
}

/**
 * Projects the lat/long window, then fits it with ONE scale for both axes — so
 * the drawn areas, and therefore the readout, stay honest.
 *
 * The frame is a different shape in each projection, which is itself part of
 * the lesson: to show the same piece of the world, Mercator needs a much taller
 * sheet than an equal-area map does. So the panel's height follows the
 * projection rather than the projection being squeezed into a fixed panel. The
 * returned function carries `h` (the viewBox height to use), `k` (the scale, so
 * the globe's rim can be drawn at the right radius) and `sheet` (the edges of
 * the mapped window).
 */
function fitted(key) {
  const { project } = PROJECTIONS[key]
  const frame = []
  for (let la = WINDOW.lat[0]; la <= WINDOW.lat[1]; la += 2) {
    frame.push(project([la, WINDOW.lon[0]]), project([la, WINDOW.lon[1]]))
  }
  for (let lo = WINDOW.lon[0]; lo <= WINDOW.lon[1]; lo += 2) {
    frame.push(project([WINDOW.lat[0], lo]), project([WINDOW.lat[1], lo]))
  }
  if (key === 'globe') frame.push([-1, -1, true], [1, 1, true])

  const xs = frame.map((p) => p[0])
  const ys = frame.map((p) => p[1])
  const x0 = Math.min(...xs), x1 = Math.max(...xs)
  const y0 = Math.min(...ys), y1 = Math.max(...ys)
  const pad = 26
  const wide = (W - 2 * pad) / (x1 - x0)
  const h = Math.max(460, Math.min(780, wide * (y1 - y0) + 2 * pad))
  const k = Math.min(wide, (h - 2 * pad) / (y1 - y0))
  const ox = (W - k * (x1 - x0)) / 2 - k * x0
  const oy = (h - k * (y1 - y0)) / 2 - k * y0

  const to = (ll) => {
    const [x, y, front] = project(ll)
    return [k * x + ox, k * y + oy, front]
  }
  to.h = h
  to.k = k
  to.sheet = { x: (W - k * (x1 - x0)) / 2, y: (h - k * (y1 - y0)) / 2, w: k * (x1 - x0), ht: k * (y1 - y0) }
  return to
}

function Flatten({ which, setWhich }) {
  const to = useMemo(() => fitted(which), [which])
  const proj = PROJECTIONS[which]

  const poly = (ring) => ring.map((ll) => to(ll))
  const g = poly(GREENLAND)
  const a = poly(AFRICA)
  const path = (pts) => `M ${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L ')} Z`

  // Measured from what is drawn, not asserted.
  const drawn = shoelace(a.map((p) => [p[0], p[1]])) / shoelace(g.map((p) => [p[0], p[1]]))

  const grat = []
  for (let la = -30; la <= 75; la += 15) {
    const pts = []
    for (let lo = WINDOW.lon[0]; lo <= WINDOW.lon[1]; lo += 2) pts.push(to([la, lo]))
    grat.push(pts)
  }
  for (let lo = -75; lo <= 45; lo += 15) {
    const pts = []
    for (let la = WINDOW.lat[0]; la <= WINDOW.lat[1]; la += 2) pts.push(to([la, lo]))
    grat.push(pts)
  }
  const line = (pts) => {
    let d = '', pen = false
    for (const p of pts) {
      if (!p[2]) { pen = false; continue }
      d += `${pen ? 'L' : 'M'} ${p[0].toFixed(1)} ${p[1].toFixed(1)} `
      pen = true
    }
    return d
  }

  const cmp = drawn < 1.15
    ? `the same size as Greenland`
    : `${drawn.toFixed(1)} times the size of Greenland`
  const verdict = drawn < 2
    ? `Africa is really ${TRUE_RATIO.toFixed(0)} times larger. This map is out by a factor of ${(TRUE_RATIO / drawn).toFixed(0)}.`
    : Math.abs(drawn - TRUE_RATIO) < 1.5
      ? `The true figure is ${TRUE_RATIO.toFixed(0)}, so this picture is very nearly honest about size.`
      : `The true figure is ${TRUE_RATIO.toFixed(0)}.`

  return (
    <>
      <div style={{ padding: '14px 22px 0' }}>
        <span className="hw-label">ON THIS MAP, AFRICA LOOKS</span>
        <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 28, fontWeight: 500, lineHeight: 1.2, marginTop: 4 }}>
          {cmp}
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
          {verdict}{which === 'globe' ? ` Measured on the visible face, which is itself foreshortened near the rim.` : ''}
        </div>
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${to.h}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={`${proj.label}. Greenland and Africa with a latitude and longitude grid. On this map Africa looks ${cmp}. ${verdict}`}>
          {which === 'globe'
            ? <circle cx={W / 2} cy={to.h / 2} r={to.k} fill="oklch(0.90 0.035 230)" stroke="var(--ink)" strokeWidth="1.5" />
            : <rect x={to.sheet.x} y={to.sheet.y} width={to.sheet.w} height={to.sheet.ht}
                fill="oklch(0.90 0.035 230)" stroke="var(--ink)" strokeWidth="1.5" />}
          {grat.map((pts, i) => (
            <path key={i} d={line(pts)} fill="none" stroke="var(--ink)" strokeWidth="0.8" opacity="0.26" />
          ))}
          <path d={path(a)} fill="oklch(0.78 0.07 85)" stroke="var(--ink)" strokeWidth="1.6" />
          <path d={path(g)} fill="oklch(0.84 0.05 200)" stroke="var(--ink)" strokeWidth="1.6" />
          {/* the sheet's edge again, over the land. On the equal-area map the top
              of Greenland sits within a pixel of 84° N — everything above 80°
              is squashed almost to nothing — so the border has to be drawn last
              or it runs through the coastline. */}
          {which !== 'globe' && (
            <rect x={to.sheet.x} y={to.sheet.y} width={to.sheet.w} height={to.sheet.ht}
              fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          )}
          {(() => {
            const cg = g.reduce((s, p) => [s[0] + p[0] / g.length, s[1] + p[1] / g.length], [0, 0])
            const ca = a.reduce((s, p) => [s[0] + p[0] / a.length, s[1] + p[1] / a.length], [0, 0])
            return (
              <>
                <text x={cg[0]} y={cg[1]} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, fill: 'var(--ink)' }}>Greenland</text>
                <text x={ca[0]} y={ca[1]} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 17, fontWeight: 600, fill: 'var(--ink)' }}>Africa</text>
              </>
            )
          })()}
        </svg>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 11 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(PROJECTIONS).map(([key, p]) => (
            <button key={key} className="hw-btn" aria-pressed={which === key} onClick={() => setWhich(key)}
              style={{
                background: which === key ? 'var(--ink)' : 'var(--paper)',
                color: which === key ? '#f6f1e7' : 'var(--ink)',
                borderColor: which === key ? 'var(--ink)' : 'var(--field)'
              }}>
              {p.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 17.5, lineHeight: 1.5, margin: 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>{proj.blurb}</p>
        {which !== 'globe' && (
          <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)', margin: 0 }}>
            The sheet itself changes shape. Both maps cover the same piece of the world — 85° W to 60° E, 40° S to 84° N —
            and Mercator needs a far taller page to do it.
          </p>
        )}
      </div>
    </>
  )
}

/* ---- Read the ground -------------------------------------------------- */

const bump = (x, y, cx, cy, amp, sx, sy, rot = 0) => {
  const c = Math.cos(rot), s = Math.sin(rot)
  const dx = x - cx, dy = y - cy
  const u = (dx * c + dy * s) / sx
  const v = (-dx * s + dy * c) / sy
  return amp * Math.exp(-(u * u + v * v) / 2)
}

/** Feet above sea level at a point on the map. The only description of the land. */
const elev = (x, y) => BASE
  + bump(x, y, 250, 240, 500, 118, 105)
  + bump(x, y, 660, 330, 340, 205, 86, -0.33)
  - bump(x, y, 455, 300, 130, 150, 62, 0.5)
  + bump(x, y, 140, 480, 55, 210, 170)

/** Rise over run, in feet per foot of ground. */
const slope = (x, y) => Math.hypot(
  (elev(x + 2, y) - elev(x - 2, y)) / (4 * FT_PER_PX),
  (elev(x, y + 2) - elev(x, y - 2)) / (4 * FT_PER_PX)
)

const SUMMIT = { x: 238, y: 252 }
const STEEPEST = { x: 348, y: 258 }

/**
 * Somewhere to write an index contour's height. Walking outward from the summit
 * crosses each level exactly once, so every label lands on its own line. The
 * four arms are tried in a rotating order so consecutive levels go in different
 * directions rather than crowding together down the same hillside.
 */
const ARMS = [[1, 0.25], [0.2, -1], [-1, 0.25], [-0.3, 1]]

function labelSpot(level, nth = 0) {
  for (let i = 0; i < ARMS.length; i++) {
    const [dx, dy] = ARMS[(nth + i) % ARMS.length]
    const m = Math.hypot(dx, dy)
    let prev = elev(SUMMIT.x, SUMMIT.y)
    for (let r = 10; r < 560; r += 3) {
      const x = SUMMIT.x + (dx / m) * r
      const y = SUMMIT.y + (dy / m) * r
      if (x < 24 || x > W - 24 || y < 22 || y > H - 44) break
      const v = elev(x, y)
      if ((prev - level) * (v - level) <= 0 && slope(x, y) > 0.03) return [x, y]
      prev = v
    }
  }
  return null
}

const SECTION = { a: [80, 180], b: [860, 400] }

const SPOTS = [
  { id: 'summit', name: `The summit`, x: SUMMIT.x, y: SUMMIT.y },
  { id: 'steep', name: `The steep face`, x: STEEPEST.x, y: STEEPEST.y },
  { id: 'saddle', name: `The saddle`, x: 470, y: 300 },
  { id: 'ridge', name: `The broad ridge top`, x: 660, y: 330 }
]

/** Marching squares. One path per level, segments as separate subpaths. */
function contours(level, step = 8) {
  const at = (x, y) => elev(x, y) - level
  const cross = (xa, ya, va, xb, yb, vb) => {
    const t = va / (va - vb)
    return [xa + (xb - xa) * t, ya + (yb - ya) * t]
  }
  let d = ''
  for (let x = 0; x < W; x += step) {
    for (let y = 0; y < H; y += step) {
      const x2 = Math.min(x + step, W), y2 = Math.min(y + step, H)
      const tl = at(x, y), tr = at(x2, y), br = at(x2, y2), bl = at(x, y2)
      const hits = []
      if ((tl < 0) !== (tr < 0)) hits.push(cross(x, y, tl, x2, y, tr))
      if ((tr < 0) !== (br < 0)) hits.push(cross(x2, y, tr, x2, y2, br))
      if ((br < 0) !== (bl < 0)) hits.push(cross(x2, y2, br, x, y2, bl))
      if ((bl < 0) !== (tl < 0)) hits.push(cross(x, y2, bl, x, y, tl))
      // Two crossings join; four means a saddle inside the cell, and pairing
      // them the wrong way would draw an X. Pair by adjacency instead.
      if (hits.length === 2) {
        d += `M ${hits[0][0].toFixed(1)} ${hits[0][1].toFixed(1)} L ${hits[1][0].toFixed(1)} ${hits[1][1].toFixed(1)} `
      } else if (hits.length === 4) {
        d += `M ${hits[0][0].toFixed(1)} ${hits[0][1].toFixed(1)} L ${hits[1][0].toFixed(1)} ${hits[1][1].toFixed(1)} `
        d += `M ${hits[2][0].toFixed(1)} ${hits[2][1].toFixed(1)} L ${hits[3][0].toFixed(1)} ${hits[3][1].toFixed(1)} `
      }
    }
  }
  return d
}

function Ground({ interval, setInterval, spot, setSpot, section, setSection, legend, setLegend }) {
  const levels = useMemo(() => {
    const out = []
    let lo = Infinity, hi = -Infinity
    for (let x = 0; x <= W; x += 6) for (let y = 0; y <= H; y += 6) {
      const v = elev(x, y)
      if (v < lo) lo = v
      if (v > hi) hi = v
    }
    for (let l = Math.ceil((lo + 1) / interval) * interval; l <= hi; l += interval) out.push(l)
    return out
  }, [interval])

  const paths = useMemo(() => levels.map((l) => ({ l, d: contours(l) })), [levels])

  const here = SPOTS.find((s) => s.id === spot) ?? SPOTS[0]
  const hereSlope = slope(here.x, here.y)
  // At a summit the ground is level and the lines ring the point rather than
  // crossing it, so "how far apart are they" has no answer worth printing —
  // 40 ÷ 0.006 would read "6,820 ft apart", which is arithmetic, not a fact.
  const spacingFt = hereSlope > 0.02 ? interval / hereSlope : null

  // The cross-section, sampled from the same height function.
  const profile = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 160; i++) {
      const t = i / 160
      pts.push([
        SECTION.a[0] + (SECTION.b[0] - SECTION.a[0]) * t,
        SECTION.a[1] + (SECTION.b[1] - SECTION.a[1]) * t
      ])
    }
    return pts.map(([x, y], i) => ({ t: i / 160, z: elev(x, y) }))
  }, [])

  const pLo = 1140, pHi = 1740, pH = 150
  const profileD = `M ${profile.map((p) => `${(60 + p.t * 780).toFixed(1)} ${(pH - ((p.z - pLo) / (pHi - pLo)) * pH).toFixed(1)}`).join(' L ')}`
  const sectionLenFt = Math.hypot(SECTION.b[0] - SECTION.a[0], SECTION.b[1] - SECTION.a[1]) * FT_PER_PX

  return (
    <>
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 34, flexWrap: 'wrap' }}>
        <div>
          <span className="hw-label">AT {here.name.replace(/^The /, '').toUpperCase()}</span>
          <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4 }}>
            {Math.round(elev(here.x, here.y) / 1).toLocaleString()} feet
          </div>
        </div>
        <div>
          <span className="hw-label">HOW STEEP IT IS THERE</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, color: 'var(--accent)', marginTop: 4 }}>
            {Math.round(hereSlope * 100)} ft per 100 · {Math.round(deg(Math.atan(hereSlope)))}°
          </div>
        </div>
        <div>
          <span className="hw-label">SO THE LINES THERE SIT</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4 }}>
            {spacingFt ? `${Math.round(spacingFt).toLocaleString()} ft apart` : `almost level here`}
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            {spacingFt ? `at a ${interval}-foot interval` : `the lines ring this point rather than crossing it`}
          </div>
        </div>
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={`A topographic map of two hills with a saddle between them, contoured every ${interval} feet. At ${here.name}, the ground is ${Math.round(elev(here.x, here.y))} feet above sea level and slopes ${Math.round(hereSlope * 100)} feet in every 100.`}>
          <rect x="0" y="0" width={W} height={H} rx="6" fill="#f6f1e4" />

          {paths.map(({ l, d }) => {
            const index = l % (interval * 5) === 0
            return <path key={l} d={d} fill="none" stroke={CONTOUR} strokeWidth={index ? 2.2 : 1} opacity={index ? 0.95 : 0.6} />
          })}

          {/* index-contour elevations, one per level, spread around the summit */}
          {paths.filter(({ l }) => l % (interval * 5) === 0).map(({ l }, i) => {
            const at = labelSpot(l, i)
            if (!at) return null
            return (
              <text key={`lbl${l}`} x={at[0]} y={at[1]} textAnchor="middle"
                style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, fill: CONTOUR }}>
                <tspan style={{ paintOrder: 'stroke', stroke: '#f6f1e4', strokeWidth: 5 }}>{l}</tspan>
              </text>
            )
          })}

          {section && (
            <>
              <line x1={SECTION.a[0]} y1={SECTION.a[1]} x2={SECTION.b[0]} y2={SECTION.b[1]}
                stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="10 7" />
              <text x={SECTION.a[0] - 8} y={SECTION.a[1] + 5} textAnchor="end" style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 700, fill: 'var(--ink)' }}>A</text>
              <text x={SECTION.b[0] + 8} y={SECTION.b[1] + 5} style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 700, fill: 'var(--ink)' }}>B</text>
            </>
          )}

          {/* the summit, with its spot elevation */}
          <path d={`M ${SUMMIT.x - 7} ${SUMMIT.y} L ${SUMMIT.x + 7} ${SUMMIT.y} M ${SUMMIT.x} ${SUMMIT.y - 7} L ${SUMMIT.x} ${SUMMIT.y + 7}`}
            stroke="var(--ink)" strokeWidth="2.5" />
          <text x={SUMMIT.x + 12} y={SUMMIT.y + 5} style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, fill: 'var(--ink)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: '#f6f1e4', strokeWidth: 5 }}>{Math.round(elev(SUMMIT.x, SUMMIT.y))}</tspan>
          </text>

          {/* where the learner is reading */}
          <circle cx={here.x} cy={here.y} r="9" fill="none" stroke="var(--accent)" strokeWidth="3" />
          <circle cx={here.x} cy={here.y} r="3" fill="var(--accent)" />

          {/* north arrow and scale bar — a map is not a map without them */}
          <g transform={`translate(${W - 54} 44)`}>
            <line x1="0" y1="26" x2="0" y2="-14" stroke="var(--ink)" strokeWidth="2.5" />
            <path d="M 0 -22 l -7 12 l 14 0 z" fill="var(--ink)" />
            <text x="0" y="44" textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 700, fill: 'var(--ink)' }}>N</text>
          </g>
          <g transform={`translate(40 ${H - 34})`}>
            <line x1="0" y1="0" x2={1000 / FT_PER_PX} y2="0" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1={1000 / FT_PER_PX} y1="-6" x2={1000 / FT_PER_PX} y2="6" stroke="var(--ink)" strokeWidth="2.5" />
            <text x={500 / FT_PER_PX} y="21" textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 14, fill: 'var(--ink-3)' }}>1,000 feet</text>
          </g>

        </svg>

        {legend && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '10px 26px', alignItems: 'center',
            marginTop: 8, padding: '12px 16px', borderRadius: 'var(--r-md)',
            border: '1px solid var(--rule)', background: 'var(--paper-alt)'
          }}>
            <span className="hw-readout-label">WHAT THE MARKS MEAN</span>
            {[
              [`Contour — every ${interval} ft`, <path d="M 2 9 L 40 9" stroke={CONTOUR} strokeWidth="1" />],
              [`Index contour, labelled`, <path d="M 2 9 L 40 9" stroke={CONTOUR} strokeWidth="2.2" />],
              [`Summit, with its height`, <path d="M 14 9 L 28 9 M 21 2 L 21 16" stroke="var(--ink)" strokeWidth="2.5" />],
              [`Where you are reading`, <g><circle cx="21" cy="9" r="7" fill="none" stroke="var(--accent)" strokeWidth="2.5" /><circle cx="21" cy="9" r="2.5" fill="var(--accent)" /></g>],
              [`The A–B section line`, <path d="M 2 9 L 40 9" stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="8 6" />]
            ].map(([label, mark]) => (
              <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <svg width="42" height="18" viewBox="0 0 42 18" aria-hidden="true" style={{ flex: 'none' }}>{mark}</svg>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-2)' }}>{label}</span>
              </span>
            ))}
          </div>
        )}

        {section && (
          <svg viewBox={`0 0 ${W} ${pH + 46}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block', marginTop: 8 }}
            role="img" aria-label={`A side-on cross-section along the line A to B, ${Math.round(sectionLenFt).toLocaleString()} feet long. It climbs to about 1,676 feet, drops to a saddle near 1,286 feet, rises again to about 1,504 feet, and then falls away.`}>
            <rect x="0" y="0" width={W} height={pH + 46} rx="6" fill="var(--paper-alt)" />
            {[1200, 1400, 1600].map((z) => {
              const y = pH - ((z - pLo) / (pHi - pLo)) * pH
              return (
                <g key={z}>
                  <line x1="60" y1={y} x2="840" y2={y} stroke="var(--rule)" strokeWidth="1" />
                  <text x="52" y={y + 4} textAnchor="end" style={{ fontFamily: 'var(--sans)', fontSize: 12, fill: 'var(--muted)' }}>{z}</text>
                </g>
              )
            })}
            <path d={`${profileD} L 840 ${pH} L 60 ${pH} Z`} fill="oklch(0.88 0.04 85)" />
            <path d={profileD} fill="none" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="60" y={pH + 24} style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 700, fill: 'var(--ink)' }}>A</text>
            <text x="840" y={pH + 24} textAnchor="end" style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 700, fill: 'var(--ink)' }}>B</text>
            <text x="450" y={pH + 24} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: 'var(--muted)' }}>
              the same ground, seen from the side · {(sectionLenFt / 5280).toFixed(2)} miles of walking
            </text>
          </svg>
        )}
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="hw-readout-label">A LINE EVERY</span>
          {[20, 40, 100].map((iv) => (
            <button key={iv} className="hw-btn" aria-pressed={interval === iv} onClick={() => setInterval(iv)}
              style={{
                padding: '10px 15px', fontSize: 12.5,
                background: interval === iv ? 'var(--ink)' : 'var(--paper)',
                color: interval === iv ? '#f6f1e7' : 'var(--ink)',
                borderColor: interval === iv ? 'var(--ink)' : 'var(--field)'
              }}>
              {iv} ft
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <button className="hw-btn" aria-pressed={section} onClick={() => setSection((s) => !s)}
            style={{ padding: '10px 15px', fontSize: 12.5, background: section ? 'var(--accent-wash)' : 'var(--paper)', borderColor: section ? 'var(--accent)' : 'var(--field)' }}>
            {section ? 'HIDE THE SIDE VIEW' : 'SHOW IT FROM THE SIDE'}
          </button>
          <button className="hw-btn" aria-pressed={legend} onClick={() => setLegend((l) => !l)}
            style={{ padding: '10px 15px', fontSize: 12.5, background: legend ? 'var(--accent-wash)' : 'var(--paper)', borderColor: legend ? 'var(--accent)' : 'var(--field)' }}>
            {legend ? 'HIDE THE LEGEND' : 'WHAT DO THE MARKS MEAN?'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="hw-readout-label">READ THE GROUND AT</span>
          {SPOTS.map((s) => (
            <button key={s.id} className="hw-btn" aria-pressed={spot === s.id} onClick={() => setSpot(s.id)}
              style={{
                padding: '10px 13px', fontSize: 12.5,
                background: spot === s.id ? 'var(--accent-wash)' : 'var(--paper)',
                borderColor: spot === s.id ? 'var(--accent)' : 'var(--field)'
              }}>
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

/* ---- The two halves --------------------------------------------------- */

const TABS = [
  { id: 'flatten', label: `Flatten the world` },
  { id: 'ground', label: `Read the ground` }
]

export default function MapMaker() {
  const [tab, setTab] = useState('flatten')
  const [which, setWhich] = useState('globe')
  const [interval, setInterval] = useState(40)
  const [spot, setSpot] = useState('summit')
  const [section, setSection] = useState(false)
  const [legend, setLegend] = useState(false)

  return (
    <div className="hw-sim">
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--rule)', background: 'var(--paper-alt)' }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} aria-pressed={tab === t.id}
            style={{
              flex: 1, minHeight: 46, border: 'none', borderBottom: `3px solid ${tab === t.id ? 'var(--accent)' : 'transparent'}`,
              background: tab === t.id ? 'var(--paper)' : 'transparent',
              fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 700, letterSpacing: '.12em',
              color: tab === t.id ? 'var(--ink)' : 'var(--muted)', textTransform: 'uppercase'
            }}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'flatten'
        ? <Flatten which={which} setWhich={setWhich} />
        : <Ground interval={interval} setInterval={setInterval} spot={spot} setSpot={setSpot}
            section={section} setSection={setSection} legend={legend} setLegend={setLegend} />}
    </div>
  )
}
