import { useMemo, useState } from 'react'
import { julianDay, sunPosition, riseSet, shadow, clock } from '../../lib/sun.js'

// Navigation, Lessons 12, 13 and 15 — the shadow of a stick in the ground.
//
//   'watch'    the shadow through a day: which way it points, how long it is,
//              and the fact that its shortest moment is true north
//   'methods'  the Field Guide's two methods, drawn on the same ground, with
//              the error of each one measured against true east-west
//   'compare'  the shadow's true north beside a compass's magnetic north,
//              which is how you measure your own declination
//
// Ground plan, north up and east right — the same orientation as Lesson 11's
// sky plot and as every map in Week 1.
//
// WHAT THE MEASUREMENTS SAID, before any of the copy was written. Errors in
// degrees against true east-west, at Columbus, from src/lib/sun.js:
//
//   two marks, 20 minutes apart, first mark at:
//     equinox      0.1 all day — the shadow tip runs dead straight that day
//     1 May        0.8 at noon · 7.7 two hours before · 14.9 four hours before
//     21 June      1.0 at noon · 11.2 two hours before · 23.3 four hours after
//     21 December  2.2 at noon · 21.1 two hours before · 30.7 four hours before
//
//   equal shadows, same place:
//     equinox      0.09   (the worst case: declination moves fastest)
//     21 June      0.00   (the best: declination is standing still)
//     21 December  0.00
//
// Two things in that table are worth the lesson's time. The first is that the
// two-mark method is not approximately right — four hours from noon in
// December it is thirty degrees wrong, which is not a navigation method, it is
// a coin toss. The second is that the methods fail under OPPOSITE conditions:
// the two-mark method is exact at the equinox and worst at the solstices,
// because it is the curvature of the shadow's path that defeats it; the
// equal-shadow method is exact at the solstices and worst at the equinox,
// because the only thing that defeats it is the Sun's declination drifting
// between the morning mark and the afternoon one. Its worst is a fifth of a
// degree against the other's thirty.
//
// Also measured, and worth saying because the Field Guide's instruction draws
// the eye to the wrong knob: lengthening the wait from 15 to 20 minutes
// changes the two-mark error by a few tenths of a degree. WHEN you do it
// matters enormously; how long you wait barely matters at all.

export const MODES = ['watch', 'methods', 'compare']

const W = 760
const H = 430
const CX = W / 2
const CY = H / 2 + 14
const rad = (d) => (d * Math.PI) / 180
const deg = (r) => (r * 180) / Math.PI

const PLACES = [
  { id: 'cmh', name: `Columbus`, lat: 39.96, lon: -83.00, tz: -5, dst: true, declination: -7.22 },
  { id: 'mia', name: `Miami`, lat: 25.76, lon: -80.19, tz: -5, dst: true, declination: -6.58 },
  { id: 'anc', name: `Anchorage`, lat: 61.22, lon: -149.90, tz: -9, dst: true, declination: 15.52 }
]

const DATES = [
  { id: 'eqx', label: `20 March`, date: [2026, 3, 20], summer: true, note: `the equinox` },
  { id: 'may', label: `1 May`, date: [2026, 5, 1], summer: true, note: `late spring` },
  { id: 'jun', label: `21 June`, date: [2026, 6, 21], summer: true, note: `the longest day` },
  { id: 'dec', label: `21 December`, date: [2026, 12, 21], summer: false, note: `the shortest day` }
]

const zoneOf = (p, d) => p.tz + (p.dst && d.summer ? 1 : 0)

/** Where the shadow's tip falls, in stick-heights east and north of the base. */
function tipAt(args, minutes) {
  const sun = sunPosition({ ...args, minutes })
  const sh = shadow(sun)
  if (!sh) return null
  return {
    minutes,
    x: sh.length * Math.sin(rad(sh.bearing)),
    y: sh.length * Math.cos(rad(sh.bearing)),
    length: sh.length,
    bearing: sh.bearing,
    altitude: sun.altitude
  }
}

/**
 * The angle a line between two marks makes with true east-west, 0 to 90.
 *
 * This is the whole measurement of Lesson 13, so it is one function used for
 * both methods — neither can be flattered by being measured differently.
 */
function errorFromEastWest(a, b) {
  const t = ((deg(Math.atan2(b.y - a.y, b.x - a.x)) % 180) + 180) % 180
  return Math.min(t, 180 - t)
}

/** The afternoon moment when the shadow is as long as it was at `before`. */
function matchingShadow(args, noon, before) {
  const want = before.length
  let lo = noon, hi = noon + (noon - before.minutes) * 3
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    const p = tipAt(args, mid)
    if (!p) { hi = mid; continue }
    if (p.length < want) lo = mid; else hi = mid
  }
  return tipAt(args, (lo + hi) / 2)
}

export default function ShadowStick({ mode = 'watch' }) {
  const [placeId, setPlace] = useState('cmh')
  const [dateId, setDate] = useState(mode === 'methods' ? 'dec' : 'jun')
  const [offset, setOffset] = useState(mode === 'methods' ? -120 : 0)
  const [wait, setWait] = useState(20)

  const place = PLACES.find((p) => p.id === placeId)
  const when = DATES.find((d) => d.id === dateId)

  const model = useMemo(() => {
    const jd = julianDay(...when.date)
    const tz = zoneOf(place, when)
    const args = { jd, latitude: place.lat, longitude: place.lon, tz }
    const rs = riseSet(jd, place.lat, place.lon, tz)
    const noon = rs ? rs.noon : 720

    // The trail of the shadow's tip. Cut at 8° of altitude: below that the
    // shadow is seven stick-heights long and the drawing is all trail and no
    // stick, which is also why nobody does this at sunset.
    const trail = []
    for (let m = noon - 420; m <= noon + 420; m += 3) {
      const p = tipAt(args, m)
      if (p && p.altitude >= 8) trail.push(p)
    }

    const first = tipAt(args, noon + offset)
    const second = tipAt(args, noon + offset + wait)
    const twoMark = first && second ? { first, second, error: errorFromEastWest(first, second) } : null

    // The equal-shadow pair, taken the same number of minutes before noon as
    // the first mark, so the two methods start at the same moment.
    // Both methods begin with the SAME mark — that is what makes this a
    // comparison. All that differs is what you do next: wait twenty minutes,
    // or wait until the shadow is that length again.
    const morning = first
    const evening = morning ? matchingShadow(args, noon, morning) : null
    const equal = morning && evening
      ? { morning, evening, error: errorFromEastWest(morning, evening), wait: evening.minutes - morning.minutes }
      : null

    return { args, rs, noon, trail, twoMark, equal }
  }, [place, when, offset, wait])

  // Fit the drawing to what is actually on it.
  //
  // Centring on the stick wasted half the panel: in winter the whole shadow
  // lies north of the base, so everything was crammed into the top while the
  // bottom stayed empty — and at that scale the two marks of the two-mark
  // method, twenty minutes apart, landed on top of each other and could not be
  // told apart. Fitting the trail instead makes them separate on their own.
  //
  // The fit deliberately ignores the time slider, so the picture does not jump
  // about underneath the learner while they move through the day.
  const view = useMemo(() => {
    const pts = [{ x: 0, y: 0 }, ...model.trail]
    if (model.equal) {
      const r = model.equal.morning.length
      pts.push({ x: r, y: 0 }, { x: -r, y: 0 }, { x: 0, y: r }, { x: 0, y: -r })
    }
    const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y)
    const minX = Math.min(...xs), maxX = Math.max(...xs)
    const minY = Math.min(...ys), maxY = Math.max(...ys)

    const scale = Math.min(
      (W - 300) / Math.max(maxX - minX, 0.5),
      (H - 150) / Math.max(maxY - minY, 0.5),
      140
    )
    // Put the middle of what is drawn in the middle of the panel.
    return {
      scale,
      ox: CX - ((minX + maxX) / 2) * scale,
      oy: CY + ((minY + maxY) / 2) * scale
    }
  }, [model])

  const { scale } = view
  const px = (p) => [view.ox + p.x * scale, view.oy - p.y * scale]
  const [ORX, ORY] = px({ x: 0, y: 0 })
  const now = model.noon + offset
  const sun = sunPosition({ ...model.args, minutes: now })
  const here = tipAt(model.args, now)

  // The shadow at the shortest moment of the day IS the true north-south line.
  const noonTip = tipAt(model.args, model.noon)

  return (
    <div className="hw-sim">
      <div className="hw-readouts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">
            {mode === 'methods' ? 'TWO MARKS, A WAIT APART' : mode === 'compare' ? 'THE SHADOW AT ITS SHORTEST' : 'THE SHADOW NOW'}
          </span>
          <span className="hw-readout-num" style={{ color: mode === 'methods' && model.twoMark && model.twoMark.error > 5 ? 'var(--brake)' : 'var(--ink)' }}>
            {mode === 'methods'
              ? model.twoMark ? `${model.twoMark.error.toFixed(1)}° off` : `no Sun`
              : mode === 'compare'
                ? `000°`
                : here ? `${String(Math.round(here.bearing)).padStart(3, '0')}°` : `none`}
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 220 }}>
            {mode === 'methods'
              ? `the line between the marks, against true east–west`
              : mode === 'compare'
                ? `a shadow at noon points at the true pole, not the magnetic one`
                : here ? `${here.length.toFixed(2)} times the height of the stick` : `the Sun is down`}
          </span>
        </div>

        <div data-align="right" style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right' }}>
          <span className="hw-readout-label" style={{ textWrap: 'balance' }}>
            {mode === 'methods' ? 'EQUAL SHADOWS, EITHER SIDE OF NOON' : mode === 'compare' ? 'WHAT THE COMPASS SAYS' : 'TIME'}
          </span>
          <span className="hw-readout-num" style={{ color: mode === 'methods' ? 'var(--green)' : 'var(--ink)' }}>
            {mode === 'methods'
              ? model.equal ? `${model.equal.error.toFixed(2)}° off` : `—`
              : mode === 'compare'
                ? `${place.declination > 0 ? '' : '−'}${Math.abs(place.declination).toFixed(1)}°`
                : clock(now)}
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>
            {mode === 'methods'
              ? model.equal ? `${Math.round(model.equal.wait)} minutes between the two marks` : ``
              : mode === 'compare'
                ? `declination at ${place.name} — ${Math.abs(place.declination).toFixed(1)}° ${place.declination > 0 ? 'east' : 'west'}`
                : offset === 0 ? `solar noon — this is the shortest it gets` : `${Math.abs(offset)} minutes ${offset < 0 ? 'before' : 'after'} solar noon`}
          </span>
        </div>
      </div>

      <div className="hw-stage" style={{ height: H, background: 'var(--paper)' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
          {/* The ground, and which way is which on it. */}
          <line x1={ORX - 250} y1={ORY} x2={ORX + 250} y2={ORY} stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 6" />
          <line x1={ORX} y1={ORY - 170} x2={ORX} y2={ORY + 170} stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 6" />
          <g style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, fill: 'var(--ink-3)' }}>
            <text x={ORX} y={ORY - 176} textAnchor="middle">TRUE N</text>
            <text x={ORX + 258} y={ORY + 4}>E</text>
            <text x={ORX - 262} y={ORY + 4}>W</text>
          </g>

          {/* The trail the tip actually takes — a straight line at the
              equinox, a curve on every other day of the year. */}
          {model.trail.length > 1 && (
            <path d={model.trail.map((p, i) => `${i ? 'L' : 'M'} ${px(p).map((n) => n.toFixed(1)).join(' ')}`).join(' ')}
              fill="none" stroke="var(--rule)" strokeWidth="2" />
          )}

          {mode !== 'methods' && here && (
            <g>
              <line x1={ORX} y1={ORY} x2={px(here)[0]} y2={px(here)[1]} stroke="oklch(0.45 0.03 60)" strokeWidth="7" strokeLinecap="round" opacity="0.75" />
              <circle cx={px(here)[0]} cy={px(here)[1]} r={5} fill="oklch(0.45 0.03 60)" />
            </g>
          )}

          {mode === 'compare' && noonTip && (
            <g>
              {/* True north from the shadow, magnetic north from the needle. */}
              <line x1={ORX} y1={ORY} x2={ORX} y2={ORY - 150} stroke="var(--green)" strokeWidth="3" />
              <text x={ORX + 6} y={ORY - 130} style={{ fontFamily: 'var(--sans)', fontSize: 11.5, fill: 'var(--green)' }}>
                TRUE NORTH, from the shadow
              </text>
              {/* Magnetic north lies at TRUE bearing D, where D is the
                  declination counted positive east (Lesson 7's convention:
                  true = magnetic + declination). Columbus is −7.22, so the
                  needle sits 7.2° WEST of the true line — to the left. This
                  was drawn with the sign flipped at first, which put the
                  needle on the wrong side of north in every place. */}
              <line x1={ORX} y1={ORY}
                x2={ORX + 150 * Math.sin(rad(place.declination))}
                y2={ORY - 150 * Math.cos(rad(place.declination))}
                stroke="var(--brake)" strokeWidth="3" />
              <text x={ORX + 150 * Math.sin(rad(place.declination)) + (place.declination > 0 ? 8 : -8)}
                y={ORY - 150 * Math.cos(rad(place.declination)) - 8}
                textAnchor={place.declination > 0 ? 'start' : 'end'}
                style={{ fontFamily: 'var(--sans)', fontSize: 11.5, fill: 'var(--brake)' }}>
                MAGNETIC NORTH, from the needle
              </text>
            </g>
          )}

          {mode === 'methods' && model.twoMark && (
            <g>
              {/* Method A: two marks a short wait apart, and the line through
                  them extended, so the learner sees where it would send them. */}
              {(() => {
                const [ax, ay] = px(model.twoMark.first)
                const [bx, by] = px(model.twoMark.second)
                const dx = bx - ax, dy = by - ay
                const n = Math.hypot(dx, dy) || 1
                const ex = (dx / n) * 240, ey = (dy / n) * 240
                const mx = (ax + bx) / 2, my = (ay + by) / 2
                return (
                  <g>
                    <line x1={mx - ex} y1={my - ey} x2={mx + ex} y2={my + ey}
                      stroke="var(--brake)" strokeWidth="2.5" strokeDasharray="7 5" />
                    <circle cx={bx} cy={by} r={5.5} fill="var(--brake)" />
                    <text x={bx} y={by + 20} textAnchor="middle"
                      style={{ fontFamily: 'var(--sans)', fontSize: 11, paintOrder: 'stroke', stroke: 'var(--paper)', strokeWidth: 3.5, strokeLinejoin: 'round', fill: 'var(--brake)' }}>
                      {wait} min later
                    </text>
                  </g>
                )
              })()}
            </g>
          )}

          {mode === 'methods' && model.equal && (
            <g>
              {(() => {
                const [ax, ay] = px(model.equal.morning)
                const [bx, by] = px(model.equal.evening)
                return (
                  <g>
                    {/* The circle the method is actually built on: same
                        distance from the stick, before noon and after. */}
                    <circle cx={ORX} cy={ORY} r={model.equal.morning.length * scale} fill="none"
                      stroke="var(--green)" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.8" />
                    <line x1={ax} y1={ay} x2={bx} y2={by} stroke="var(--green)" strokeWidth="2.5" />
                    <circle cx={bx} cy={by} r={5.5} fill="var(--green)" />
                    <text x={bx} y={by - 12} textAnchor="middle"
                      style={{ fontFamily: 'var(--sans)', fontSize: 11, paintOrder: 'stroke', stroke: 'var(--paper)', strokeWidth: 3.5, strokeLinejoin: 'round', fill: 'var(--green)' }}>
                      same length again
                    </text>
                    {/* The one mark both methods start from, drawn once. */}
                    <circle cx={ax} cy={ay} r={6} fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
                    <text x={ax - 14} y={ay - 14} textAnchor="end"
                      style={{ fontFamily: 'var(--sans)', fontSize: 11, paintOrder: 'stroke', stroke: 'var(--paper)', strokeWidth: 3.5, strokeLinejoin: 'round', fill: 'var(--ink-2)' }}>
                      the first mark
                    </text>
                  </g>
                )
              })()}
            </g>
          )}

          {/* The stick itself, last, so nothing is drawn over it. */}
          <circle cx={ORX} cy={ORY} r={6} fill="var(--ink)" />

          <g style={{ fontFamily: 'var(--sans)', fontSize: 12.5, fill: 'var(--ink-2)' }}>
            <text x={20} y={H - 42}>{place.name}, {place.lat.toFixed(0)}° north</text>
            <text x={20} y={H - 22} style={{ fill: 'var(--muted)' }}>{when.label} — {when.note}</text>
            {mode === 'methods' && (
              <>
                <text x={W - 20} y={H - 42} textAnchor="end" style={{ fill: 'var(--brake)' }}>
                  dashed red: the line between two marks {wait} minutes apart
                </text>
                <text x={W - 20} y={H - 22} textAnchor="end" style={{ fill: 'var(--green)' }}>
                  green: the line between two equal shadows
                </text>
              </>
            )}
            {mode === 'watch' && (
              <text x={W - 20} y={H - 32} textAnchor="end" style={{ fill: 'var(--muted)' }}>
                the grey curve is where the tip goes all day
              </text>
            )}
          </g>
        </svg>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 13 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span className="hw-readout-label" style={{ marginRight: 4 }}>STAND IN</span>
          {PLACES.map((p) => (
            <button key={p.id} className="hw-btn" aria-pressed={p.id === placeId} onClick={() => setPlace(p.id)}
              style={{ borderColor: p.id === placeId ? 'var(--accent)' : 'var(--field)', background: p.id === placeId ? 'var(--accent-wash-2)' : 'var(--paper)' }}>
              {p.name}
            </button>
          ))}
        </div>

        {mode !== 'compare' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <span className="hw-readout-label" style={{ marginRight: 4 }}>ON</span>
            {DATES.map((d) => (
              <button key={d.id} className="hw-btn" aria-pressed={d.id === dateId} onClick={() => setDate(d.id)}
                style={{ borderColor: d.id === dateId ? 'var(--accent)' : 'var(--field)', background: d.id === dateId ? 'var(--accent-wash-2)' : 'var(--paper)' }}>
                {d.label}
              </button>
            ))}
          </div>
        )}

        {mode !== 'compare' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="hw-shadow-when" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              {mode === 'methods'
                ? `PUT THE FIRST MARK DOWN ${Math.abs(offset)} MINUTES BEFORE NOON`
                : 'MOVE THROUGH THE DAY'}
            </label>
            <input id="hw-shadow-when" type="range"
              min={mode === 'methods' ? -300 : -300} max={mode === 'methods' ? -20 : 300} step={10}
              value={offset} onChange={(e) => setOffset(Number(e.target.value))} />
          </div>
        )}

        {mode === 'methods' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="hw-shadow-wait" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              AND WAIT {wait} MINUTES
            </label>
            <input id="hw-shadow-wait" type="range" min={10} max={40} step={5}
              value={wait} onChange={(e) => setWait(Number(e.target.value))} />
          </div>
        )}
      </div>
    </div>
  )
}
