import { useMemo, useState } from 'react'
import { julianDay, sunPosition, riseSet, clock } from '../../lib/sun.js'

// Navigation, Lesson 11 — why the Sun appears to move.
//
// The misconception to kill is "the Sun rises in the east and sets in the
// west". It is true twice a year and wrong every other day, and at Columbus's
// latitude it is wrong by more than thirty degrees at the solstices — a third
// of a right angle, which is the difference between walking to a town and
// missing it entirely.
//
// Nothing here is a stored table. Every number comes from src/lib/sun.js,
// which is NOAA's algorithm checked against published sunrise, noon and sunset
// times in src/__tests__/sun.test.js. So the readouts cannot drift away from
// the drawing, and the drawing cannot drift away from the sky.
//
// The view is a bearing-and-height plot, not a photograph of the sky: the
// direction round the rim is a compass bearing, read exactly as Lesson 8 reads
// one, and the distance in from the rim is how high the Sun has climbed. North
// is up and east is to the right, as on the map — NOT as on a star chart,
// where east is to the left because you are looking up rather than down. The
// shadow plots in Lessons 12 and 13 use this same ground orientation, so the
// two pictures can be laid on top of each other.
//
// A track that hugs the rim is a Sun that never gets high, which is what
// winter looks like, drawn.

const W = 760
const H = 430
const R = 168                      // the horizon circle
const CX = W / 2
const CY = H / 2 + 6
const rad = (d) => (d * Math.PI) / 180

// Three dates that say everything: the Sun at its furthest north, at its
// furthest south, and the day it crosses the equator. `summer` is whether the
// United States is on daylight saving that day — 2026's runs from 8 March to
// 1 November — which matters below.
const DATES = [
  { id: 'jun', label: `21 June`, date: [2026, 6, 21], summer: true, note: `the longest day` },
  { id: 'eqx', label: `20 March`, date: [2026, 3, 20], summer: true, note: `the equinox` },
  { id: 'dec', label: `21 December`, date: [2026, 12, 21], summer: false, note: `the shortest day` }
]

// The clock offset belongs to the PLACE, not to the date. Hanging it on the
// date put Anchorage's solar noon at 6:01 pm — it was being read on Ohio's
// clock. Quito keeps one offset all year, which is the commoner arrangement
// worldwide; the United States moves its clocks, so those three need both.
const PLACES = [
  { id: 'qui', name: `Quito`, lat: -0.18, lon: -78.47, tz: -5, dst: false, blurb: `on the equator` },
  { id: 'cmh', name: `Columbus`, lat: 39.96, lon: -83.00, tz: -5, dst: true, blurb: `40° north` },
  { id: 'anc', name: `Anchorage`, lat: 61.22, lon: -149.90, tz: -9, dst: true, blurb: `61° north` },
  { id: 'fai', name: `Utqiagvik`, lat: 71.29, lon: -156.79, tz: -9, dst: true, blurb: `inside the Arctic circle` }
]

/** The offset the clocks in that place actually read on that date. */
const zoneOf = (place, when) => place.tz + (place.dst && when.summer ? 1 : 0)

/** Plan view: bearing around, 90−altitude out from the centre. */
const project = (azimuth, altitude) => {
  const r = (R * (90 - altitude)) / 90
  return [CX + r * Math.sin(rad(azimuth)), CY - r * Math.cos(rad(azimuth))]
}

export default function SunPath() {
  const [placeId, setPlace] = useState('cmh')
  const [dateId, setDate] = useState('jun')
  const [offset, setOffset] = useState(0)        // minutes from solar noon

  const place = PLACES.find((p) => p.id === placeId)
  const when = DATES.find((d) => d.id === dateId)

  const day = useMemo(() => {
    const jd = julianDay(...when.date)
    const tz = zoneOf(place, when)
    const args = { jd, latitude: place.lat, longitude: place.lon, tz }
    const rs = riseSet(jd, place.lat, place.lon, tz)

    // The track, sampled every four minutes of the day. Points below the
    // horizon are dropped rather than clamped: a Sun that is down is not on
    // the edge of the picture, it is out of it.
    const track = []
    for (let m = 0; m <= 1440; m += 4) {
      const s = sunPosition({ ...args, minutes: m })
      if (s.altitude > 0) track.push({ m, ...s })
    }

    // Noon from riseSet where there is one; otherwise the highest sample, so
    // the midnight-sun case still has something to point at.
    const noon = rs ? rs.noon : track.reduce((b, p) => (p.altitude > b.altitude ? p : b), track[0])?.m ?? 720
    const high = sunPosition({ ...args, minutes: noon })

    return { jd, args, rs, track, noon, high }
  }, [place, when])

  const now = day.noon + offset
  const sun = sunPosition({ ...day.args, minutes: now })
  const up = sun.altitude > 0

  const trackPath = day.track.length
    ? day.track.map((p, i) => `${i ? 'L' : 'M'} ${project(p.azimuth, p.altitude).map((n) => n.toFixed(1)).join(' ')}`).join(' ')
    : ''

  const [sx, sy] = project(sun.azimuth, Math.max(sun.altitude, 0))

  return (
    <div className="hw-sim">
      <div className="hw-readouts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">IT COMES UP ON</span>
          <span className="hw-readout-num">
            {day.rs ? `${String(Math.round(day.rs.riseBearing)).padStart(3, '0')}°` : `—`}
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 210 }}>
            {day.rs
              ? `${Math.abs(Math.round(day.rs.riseBearing) - 90) <= 1
                  ? `due east, which happens twice a year`
                  : `${Math.abs(Math.round(day.rs.riseBearing - 90))}° ${day.rs.riseBearing < 90 ? 'north' : 'south'} of due east`}`
              : `It does not rise or set here today.`}
          </span>
        </div>

        <div data-align="right" style={{ width: 230, display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right' }}>
          <span className="hw-readout-label" style={{ textWrap: 'balance' }}>HIGHEST IT GETS</span>
          <span className="hw-readout-num">{day.high.altitude.toFixed(1)}°</span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>
            {day.rs
              ? `${(day.rs.daylight / 60).toFixed(1)} hours of daylight`
              : day.high.altitude > 0 ? `daylight all day and all night` : `no daylight at all`}
          </span>
        </div>
      </div>

      <div className="hw-stage" style={{ height: H, background: 'var(--paper)' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
          {/* The sky, as a disc: rim is the horizon, centre is overhead. */}
          <circle cx={CX} cy={CY} r={R} fill="oklch(0.95 0.02 240)" stroke="var(--rule)" strokeWidth="1.5" />
          {[30, 60].map((alt) => (
            <g key={alt}>
              <circle cx={CX} cy={CY} r={(R * (90 - alt)) / 90} fill="none"
                stroke="var(--rule)" strokeWidth="1" strokeDasharray="3 5" />
              <text x={CX + 5} y={CY - (R * (90 - alt)) / 90 + 13}
                style={{ fontFamily: 'var(--sans)', fontSize: 10, fill: 'var(--label)' }}>{alt}° up</text>
            </g>
          ))}
          <circle cx={CX} cy={CY} r={2.5} fill="var(--label)" />

          {/* The four directions, named on the horizon itself. */}
          {[['N', 0], ['E', 90], ['S', 180], ['W', 270]].map(([name, az]) => {
            const [x, y] = project(az, 0)
            const [lx, ly] = [CX + (R + 20) * Math.sin(rad(az)), CY - (R + 20) * Math.cos(rad(az))]
            return (
              <g key={name}>
                <line x1={CX + (R - 7) * Math.sin(rad(az))} y1={CY - (R - 7) * Math.cos(rad(az))} x2={x} y2={y}
                  stroke="var(--ink-3)" strokeWidth="1.5" />
                <text x={lx} y={ly + 5} textAnchor="middle"
                  style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700, fill: 'var(--ink-3)' }}>{name}</text>
              </g>
            )
          })}

          {/* The day's track, and where it meets the horizon. */}
          {trackPath && <path d={trackPath} fill="none" stroke="oklch(0.62 0.17 55)" strokeWidth="3" strokeLinecap="round" />}
          {day.rs && [day.rs.riseBearing, day.rs.setBearing].map((b, i) => {
            const [x, y] = project(b, 0)
            return <circle key={i} cx={x} cy={y} r={5} fill="var(--paper)" stroke="oklch(0.62 0.17 55)" strokeWidth="2.5" />
          })}

          {/* Due east and due west, to measure the rising point against. */}
          {[90, 270].map((az) => {
            const [x, y] = project(az, 0)
            return <line key={az} x1={CX} y1={CY} x2={x} y2={y} stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 6" />
          })}

          {up && (
            <g>
              <circle cx={sx} cy={sy} r={13} fill="oklch(0.86 0.15 85)" stroke="oklch(0.55 0.14 60)" strokeWidth="2" />
              <line x1={CX} y1={CY} x2={sx} y2={sy} stroke="oklch(0.55 0.14 60)" strokeWidth="1" strokeDasharray="3 4" />
            </g>
          )}

          <text x={CX} y={CY - R - 34} textAnchor="middle"
            style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '.12em', fill: 'var(--label)' }}>
            BEARING ROUND THE RIM · THE RIM IS THE HORIZON · THE CENTRE IS STRAIGHT OVERHEAD
          </text>

          <g style={{ fontFamily: 'var(--sans)', fontSize: 12.5, fill: 'var(--ink-2)' }}>
            <text x={20} y={H - 42}>{place.name}, {place.blurb}</text>
            <text x={20} y={H - 22} style={{ fill: 'var(--muted)' }}>{when.label} — {when.note}</text>
            <text x={W - 20} y={H - 42} textAnchor="end">
              {up ? `${clock(now)} · ${sun.altitude.toFixed(1)}° up, bearing ${Math.round(sun.azimuth)}°` : `${clock(now)} · below the horizon`}
            </text>
            <text x={W - 20} y={H - 22} textAnchor="end" style={{ fill: 'var(--muted)' }}>
              {offset === 0 ? `solar noon — the shadow is shortest now` : `${Math.abs(offset / 60).toFixed(1)} hours ${offset < 0 ? 'before' : 'after'} solar noon`}
            </text>
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

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span className="hw-readout-label" style={{ marginRight: 4 }}>ON</span>
          {DATES.map((d) => (
            <button key={d.id} className="hw-btn" aria-pressed={d.id === dateId} onClick={() => setDate(d.id)}
              style={{ borderColor: d.id === dateId ? 'var(--accent)' : 'var(--field)', background: d.id === dateId ? 'var(--accent-wash-2)' : 'var(--paper)' }}>
              {d.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="hw-sun-time" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            MOVE THROUGH THE DAY
          </label>
          <input id="hw-sun-time" type="range" min={-420} max={420} step={10}
            value={offset} onChange={(e) => setOffset(Number(e.target.value))} />
        </div>
      </div>
    </div>
  )
}
