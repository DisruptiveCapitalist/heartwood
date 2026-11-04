import { useMemo, useState } from 'react'
import { julianDay, solarPosition, solarNoon, clock } from '../../lib/sun.js'

// Navigation, Lesson 14 — solar time and the compass.
//
// Clock noon and solar noon are different, and they are different for three
// reasons that have nothing to do with each other. The lesson's whole job is
// to keep them apart, so the simulation shows them separately and adds them up
// in front of the learner:
//
//   1. WHERE YOU ARE IN YOUR TIME ZONE. Four minutes a degree, every day of
//      the year, same sign. Ohio is 8° west of the 75th meridian its clocks
//      are set by, so its Sun is 32 minutes late. Anchorage is nearly 15°
//      west of the 135th, which is an hour.
//
//   2. THE EQUATION OF TIME. The Earth's orbit is an ellipse and its axis is
//      tilted, so the Sun runs fast in some months and slow in others, by as
//      much as a quarter of an hour either way. It is the same for everyone on
//      Earth on a given day and it has nothing to do with where you stand.
//
//   3. DAYLIGHT SAVING, where it is kept: a flat hour, by statute. It has to
//      be its own line. Folding it into the first one made the panel claim
//      that Columbus "keeps the 60° meridian's time" and stands 23° west of
//      it, which is arithmetically equivalent and geographically nonsense —
//      Ohio's clocks are the 75th meridian's, with an hour added in summer.
//
// Both come out of src/lib/sun.js. The four extremes of the curve below —
// about -14 minutes in February, +4 in May, -6 in July, +16 in early November
// — are checked against the published values in src/__tests__/sun.test.js.

const W = 760
const H = 452
const PAD = { l: 62, r: 30, t: 116, b: 76 }
const PW = W - PAD.l - PAD.r
const PH = H - PAD.t - PAD.b

const PLACES = [
  { id: 'bos', name: `Boston`, lon: -71.06, tz: -5, dst: true },
  { id: 'cmh', name: `Columbus`, lon: -83.00, tz: -5, dst: true },
  { id: 'qui', name: `Quito`, lon: -78.47, tz: -5, dst: false },
  { id: 'anc', name: `Anchorage`, lon: -149.90, tz: -9, dst: true }
]

// 2026: clocks go forward on 8 March (day 66, counting January 1 as 0) and
// back on 1 November (day 304). The window excludes the day they go back —
// that morning is already standard time, and including it put the Sun an hour
// out on exactly the day a reader might check.
const DST_FROM = 66
const DST_TO = 304

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_START = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]

/** Day-of-year (0-based) to a calendar date in 2026. */
function dateOf(doy) {
  let m = 11
  while (m > 0 && MONTH_START[m] > doy) m -= 1
  return { month: m + 1, day: doy - MONTH_START[m] + 1, label: `${doy - MONTH_START[m] + 1} ${MONTHS[m]}` }
}

export default function SolarClock() {
  const [placeId, setPlace] = useState('cmh')
  const [doy, setDoy] = useState(304)          // 1 November, near the biggest gap

  const place = PLACES.find((p) => p.id === placeId)
  const date = dateOf(doy)
  const summer = place.dst && doy >= DST_FROM && doy < DST_TO
  const tz = place.tz + (summer ? 1 : 0)
  // The meridian the zone is NAMED for, not the one the shifted clock implies.
  const standardMeridian = place.tz * 15

  // The curve, and this day's point on it.
  const curve = useMemo(() => {
    const pts = []
    for (let d = 0; d < 365; d += 1) {
      const { month, day } = dateOf(d)
      pts.push({ d, eq: solarPosition(julianDay(2026, month, day) + 0.5).eqTime })
    }
    return pts
  }, [])

  const jd = julianDay(2026, date.month, date.day)
  const { eqTime } = solarPosition(jd + 0.5)
  const noon = solarNoon(jd, place.lon, tz)

  // The three reasons, separately. Their sum is the whole gap by construction
  // rather than by coincidence: solarNoon() is 720 − 4·longitude − eqTime +
  // 60·tz, and these are exactly those terms, with the daylight-saving hour
  // split out of the last one.
  const fromPlace = 4 * (standardMeridian - place.lon)
  const fromOrbit = -eqTime
  const fromStatute = summer ? 60 : 0
  const gap = fromPlace + fromOrbit + fromStatute

  const maxEq = 17
  const x = (d) => PAD.l + (d / 364) * PW
  const y = (eq) => PAD.t + PH / 2 - (eq / maxEq) * (PH / 2)

  const path = curve.map((p, i) => `${i ? 'L' : 'M'} ${x(p.d).toFixed(1)} ${y(p.eq).toFixed(1)}`).join(' ')
  const sign = (n) => `${n >= 0 ? '+' : '−'}${Math.abs(n).toFixed(0)}`

  return (
    <div className="hw-sim">
      <div className="hw-readouts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">THE SUN IS HIGHEST AT</span>
          <span className="hw-readout-num">{clock(noon)}</span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 230 }}>
            {Math.abs(gap) < 1
              ? `which is clock noon, for once`
              : `${Math.abs(Math.round(gap))} minutes ${gap > 0 ? 'after' : 'before'} the clock says noon${summer ? `, with the clocks forward` : ``}`}
          </span>
        </div>

        <div data-align="right" style={{ width: 250, display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'right' }}>
          <span className="hw-readout-label" style={{ textWrap: 'balance' }}>
            AND THE GAP IS {summer ? 'THREE' : 'TWO'} SEPARATE THINGS
          </span>
          <span style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>
            <strong>{sign(fromPlace)} min</strong> for standing {Math.abs(place.lon - standardMeridian).toFixed(1)}° {place.lon < standardMeridian ? 'west' : 'east'} of the {Math.abs(standardMeridian)}° meridian<br />
            <strong>{sign(fromOrbit)} min</strong> for the Earth&apos;s orbit, on this date
            {summer && <><br /><strong>+60 min</strong> because the clocks are forward</>}
          </span>
        </div>
      </div>

      <div className="hw-stage" style={{ height: H, background: 'var(--paper)' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
          <text x={PAD.l} y={PAD.t - 24} style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '.12em', fill: 'var(--label)' }}>
            THE EQUATION OF TIME — MINUTES THE SUN RUNS FAST OR SLOW
          </text>

          {/* The zero line is the one worth naming: four days a year the Sun
              and a well-set clock agree. */}
          <line x1={PAD.l} y1={y(0)} x2={PAD.l + PW} y2={y(0)} stroke="var(--rule)" strokeWidth="1.5" />
          {[-15, -10, -5, 5, 10, 15].map((v) => (
            <g key={v}>
              <line x1={PAD.l} y1={y(v)} x2={PAD.l + PW} y2={y(v)} stroke="var(--rule)" strokeWidth="0.6" strokeDasharray="2 6" />
              <text x={PAD.l - 10} y={y(v) + 4} textAnchor="end" style={{ fontFamily: 'var(--sans)', fontSize: 10, fill: 'var(--label)' }}>
                {v > 0 ? `+${v}` : v}
              </text>
            </g>
          ))}
          <text x={PAD.l - 10} y={y(0) + 4} textAnchor="end" style={{ fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 700, fill: 'var(--ink-3)' }}>0</text>

          {MONTH_START.map((d, i) => (
            <text key={i} x={x(d + 15)} y={PAD.t + PH + 20} textAnchor="middle"
              style={{ fontFamily: 'var(--sans)', fontSize: 10, fill: 'var(--label)' }}>{MONTHS[i]}</text>
          ))}

          <path d={path} fill="none" stroke="oklch(0.55 0.13 250)" strokeWidth="2.5" />

          {/* Where we are on it. */}
          <line x1={x(doy)} y1={PAD.t - 6} x2={x(doy)} y2={PAD.t + PH} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx={x(doy)} cy={y(eqTime)} r={6} fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
          <text x={x(doy) + (doy > 250 ? -12 : 12)} y={y(eqTime) - 12} textAnchor={doy > 250 ? 'end' : 'start'}
            style={{ fontFamily: 'var(--sans)', fontSize: 12, paintOrder: 'stroke', stroke: 'var(--paper)', strokeWidth: 3.5, strokeLinejoin: 'round', fill: 'var(--ink-2)' }}>
            {date.label}: the Sun runs {eqTime >= 0 ? `${eqTime.toFixed(1)} min fast` : `${Math.abs(eqTime).toFixed(1)} min slow`}
          </text>

          <g style={{ fontFamily: 'var(--sans)', fontSize: 12.5, fill: 'var(--muted)' }}>
            <text x={PAD.l} y={H - 62}>
              the same on this date for everyone on Earth — unlike the line below it
            </text>
            <text x={PAD.l} y={H - 42}>
              {place.name} keeps the {Math.abs(standardMeridian)}° meridian&apos;s time{summer ? `, with an hour added for the summer` : ``}
            </text>
            <text x={PAD.l} y={H - 22}>
              so a sundial here reads {Math.abs(Math.round(gap))} min {gap > 0 ? 'behind' : 'ahead of'} the clock today
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="hw-solar-doy" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            MOVE THROUGH THE YEAR — {date.label}
          </label>
          <input id="hw-solar-doy" type="range" min={0} max={364} step={1}
            value={doy} onChange={(e) => setDoy(Number(e.target.value))} />
        </div>
      </div>
    </div>
  )
}
