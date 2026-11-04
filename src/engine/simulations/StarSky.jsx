import { useMemo, useState } from 'react'
import { julianDay, skyFor, starPosition, starBehaviour, separation, extendAlong } from '../../lib/stars.js'

// Navigation, Lessons 16 to 20 — the night sky.
//
//   'turning'   the whole sky from one spot, with star trails: everything
//               wheels, and one point does not
//   'pointers'  the view centred on the north celestial pole, with the Big
//               Dipper's pointers and Cassiopeia either side of it
//   'latitude'  Polaris's little circle round the pole, and what that does to
//               reading latitude off it
//   'south'     the Southern Cross, the extended axis, and how far short of
//               the pole it lands
//   'meridian'  which stars cross the meridian to the NORTH — the thing the
//               Field Guide spec explicitly asks this course not to get wrong
//
// Positions come from src/lib/stars.js: J2000 catalogue entries precessed to
// the year, checked in src/__tests__/stars.test.js against published values
// for Polaris — the computation reproduces its maximum of 89° 32.4' near 2100
// exactly, and 2018's 89° 20.1' to within a third of an arcminute.
//
// MEASURED BEFORE ANY COPY WAS WRITTEN:
//   Polaris is 37.7' from the pole in 2026, so its altitude swings 0.63°
//   either side of your latitude — up to 38 nautical miles of error if you
//   read latitude straight off it without noting the hour.
//   The Southern Cross's long axis is 6.01° and the rule of extending it 4.5
//   lengths past Acrux lands 2.68° from the south celestial pole. No multiple
//   does better than 2.65°, because the axis does not point at the pole: that
//   is a floor, not a mistake, and care cannot get under it.

export const MODES = ['turning', 'pointers', 'latitude', 'south', 'meridian']

const W = 760
const H = 440
const CX = W / 2
const CY = H / 2 - 12
const R = 172
const rad = (d) => (d * Math.PI) / 180

const PLACES = [
  { id: 'mia', name: `Miami`, lat: 25.76, lon: -80.19, tz: -5 },
  { id: 'cmh', name: `Columbus`, lat: 39.96, lon: -83.00, tz: -5 },
  { id: 'anc', name: `Anchorage`, lat: 61.22, lon: -149.90, tz: -9 },
  { id: 'syd', name: `Sydney`, lat: -33.87, lon: 151.21, tz: 10 }
]

const DATES = [
  { id: 'jan', label: `January`, date: [2026, 1, 15] },
  { id: 'apr', label: `April`, date: [2026, 4, 15] },
  { id: 'jul', label: `July`, date: [2026, 7, 15] },
  { id: 'oct', label: `October`, date: [2026, 10, 15] }
]

// Everything in this file is drawn on a night sky, which makes it the first
// simulation in the course with a dark stage — so none of the house ink
// colours can be used, and the floating readouts need lightening too.
const GROUP_COLOUR = {
  pole: 'oklch(0.86 0.16 85)',
  dipper: 'oklch(0.78 0.11 250)',
  cassiopeia: 'oklch(0.78 0.10 310)',
  crux: 'oklch(0.76 0.15 30)',
  pointers: 'oklch(0.74 0.10 35)',
  bright: 'oklch(0.93 0.01 265)'
}

const SKY_INK = 'oklch(0.93 0.01 265)'
const SKY_DIM = 'oklch(0.70 0.03 265)'

// A scattering of fainter stars so the sky reads as a sky and the turning is
// visible away from the named patterns. Fixed seed: the same sky every time,
// which matters because a learner moving the slider must see things move
// rather than be resampled.
const FIELD = (() => {
  let seed = 20261104
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648 }
  return Array.from({ length: 160 }, () => ({
    ra: rnd() * 360,
    dec: Math.asin(rnd() * 2 - 1) * 180 / Math.PI,
    mag: 3.6 + rnd() * 1.8
  }))
})()

/** Lines joining the stars of a pattern, so a shape reads as a shape. */
const JOINS = {
  dipper: [['dubhe', 'merak'], ['merak', 'phecda'], ['phecda', 'megrez'], ['megrez', 'dubhe'],
           ['megrez', 'alioth'], ['alioth', 'mizar'], ['mizar', 'alkaid']],
  cassiopeia: [['caph', 'schedar'], ['schedar', 'gamma_cas'], ['gamma_cas', 'ruchbah'], ['ruchbah', 'segin']],
  crux: [['gacrux', 'acrux'], ['mimosa', 'delta_cru']],
  pointers: [['rigil', 'hadar']]
}

const dotSize = (mag) => Math.max(1.6, 4.6 - mag * 0.75)

// The stars a method actually names. Labelling every bright thing in a view
// this tight stacked four of Crux's names on top of one another.
const NAMED = new Set(['polaris', 'dubhe', 'merak', 'acrux', 'gacrux', 'rigil', 'sirius', 'vega'])

export default function StarSky({ mode = 'turning' }) {
  const [placeId, setPlace] = useState(mode === 'south' ? 'syd' : 'cmh')
  const [dateId, setDate] = useState('oct')
  const [hour, setHour] = useState(22)
  const [trails, setTrails] = useState(mode === 'turning')
  const [lat, setLat] = useState(39.96)

  const place = PLACES.find((p) => p.id === placeId)
  const when = DATES.find((d) => d.id === dateId)
  const latitude = mode === 'latitude' ? lat : place.lat

  const sky = useMemo(() => skyFor(2026), [])

  // The moment, as a Julian day. The slider runs across the night, so hours
  // past midnight are the next calendar day.
  const jd = useMemo(() => {
    const base = julianDay(...when.date)
    return base + (hour - place.tz) / 24
  }, [when, hour, place])

  const visible = useMemo(() => {
    const args = { jd, latitude, longitude: place.lon }
    return Object.fromEntries(Object.entries(sky).map(([id, s]) =>
      [id, { ...s, ...starPosition({ star: s, ...args }) }]))
  }, [sky, jd, latitude, place])

  // ---- the two projections ------------------------------------------------
  // Horizon view: bearing round the rim, altitude in from it. North up, east
  // right — the map's orientation and Week 3's, not a star chart's.
  const horizon = (s) => {
    const r = (R * (90 - s.altitude)) / 90
    return [CX + r * Math.sin(rad(s.azimuth)), CY - r * Math.cos(rad(s.azimuth))]
  }

  // Pole view: centred on the celestial pole, radius proportional to how far
  // from it the star sits. The sky's own turning is then a plain rotation.
  const south = mode === 'south'
  const poleDist = (s) => south ? 90 + s.dec : 90 - s.dec
  const pole = (s) => {
    const span = 48
    const r = (R * poleDist(s)) / span
    const a = rad(s.hourAngle * (south ? -1 : 1))
    return [CX + r * Math.sin(a), CY - r * Math.cos(a) * (south ? -1 : 1)]
  }

  const usesPole = mode === 'pointers' || mode === 'south'
  const project = usesPole ? pole : horizon
  const shown = Object.values(visible).filter((s) => {
    if (usesPole) return poleDist(s) <= 48
    return s.altitude > 0
  })

  // ---- mode-specific measurements ----------------------------------------
  const polarisOffset = 90 - sky.polaris.dec
  const polarisNow = visible.polaris

  // "Extend the pointers about five times" means five lengths BEYOND Dubhe,
  // which is SIX from Merak — drawing it as five from Merak stops the line
  // well short of Polaris, which is how the ambiguity shows itself. The rule
  // as stated lands 2.6° off; the best any multiple can do is 1.9°, so the
  // line is drawn at the rule rather than at the optimum and falls a little
  // short on purpose.
  const pointerMiss = useMemo(
    () => separation(extendAlong(sky.merak, sky.dubhe, 6), sky.polaris), [sky])

  const crux = useMemo(() => {
    const tip = extendAlong(sky.gacrux, sky.acrux, 5.5)
    return { tip, miss: separation(tip, { ra: 0, dec: -90 }), axis: separation(sky.gacrux, sky.acrux) }
  }, [sky])

  const northCrossers = useMemo(() =>
    Object.values(sky).filter((s) => s.dec > latitude && !starBehaviour(s, latitude).neverRises),
  [sky, latitude])

  const readout = {
    turning: {
      label: `EVERYTHING TURNS EXCEPT`,
      value: polarisNow.altitude > 0 ? `Polaris` : `nothing you can see`,
      note: polarisNow.altitude > 0
        ? `sitting ${polarisNow.altitude.toFixed(1)}° up, almost still, while the rest wheels around it`
        : `at ${latitude.toFixed(0)}° south the north pole of the sky is below your horizon`
    },
    pointers: {
      label: `FIVE LENGTHS PAST DUBHE LANDS`,
      value: `${pointerMiss.toFixed(1)}°`,
      note: `from Polaris — and that is close enough, because Polaris is the only bright thing anywhere near there`
    },
    latitude: {
      label: `POLARIS IS THIS HIGH`,
      value: polarisNow.altitude > 0 ? `${polarisNow.altitude.toFixed(2)}°` : `below the horizon`,
      note: polarisNow.altitude > 0
        ? `and you are standing at ${latitude.toFixed(2)}° — out by ${Math.abs(polarisNow.altitude - latitude).toFixed(2)}°`
        : `Polaris cannot help you south of the equator`
    },
    south: {
      label: `THE AXIS, EXTENDED, MISSES BY`,
      value: `${crux.miss.toFixed(1)}°`,
      note: `4.5 lengths past Acrux. No multiple does better than 2.6° — the axis does not point at the pole`
    },
    meridian: {
      label: `CROSS THE MERIDIAN TO THE NORTH`,
      value: `${northCrossers.length}`,
      note: `of the ${Object.keys(sky).length} stars here, at ${latitude.toFixed(0)}°${latitude >= 0 ? ' N' : ' S'} — for these, highest does NOT mean south`
    }
  }[mode]

  return (
    <div className="hw-sim">
      <div className="hw-readouts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label" style={{ textWrap: 'balance', color: SKY_DIM }}>{readout.label}</span>
          <span className="hw-readout-num" style={{ color: SKY_INK }}>{readout.value}</span>
          <span style={{ fontSize: 12.5, color: SKY_DIM, maxWidth: 236 }}>{readout.note}</span>
        </div>

        <div data-align="right" style={{ width: 230, display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right' }}>
          <span className="hw-readout-label" style={{ textWrap: 'balance', color: SKY_DIM }}>
            {usesPole ? 'CENTRED ON THE CELESTIAL POLE' : 'LOOKING UP FROM'}
          </span>
          <span style={{ fontSize: 13.5, color: SKY_INK, lineHeight: 1.5 }}>
            {mode === 'latitude' ? `latitude ${latitude.toFixed(2)}°` : place.name}<br />
            <span style={{ color: SKY_DIM }}>{when.label}, {hour % 12 === 0 ? 12 : hour % 12}{hour < 12 || hour >= 24 ? 'am' : 'pm'}</span>
          </span>
        </div>
      </div>

      <div className="hw-stage" style={{ height: H, background: 'oklch(0.23 0.03 260)' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
          <circle cx={CX} cy={CY} r={R} fill="oklch(0.18 0.03 265)" stroke="oklch(0.42 0.04 265)" strokeWidth="1.5" />

          {!usesPole && [['N', 0], ['E', 90], ['S', 180], ['W', 270]].map(([name, az]) => (
            <text key={name} x={CX + (R + 20) * Math.sin(rad(az))} y={CY - (R + 20) * Math.cos(rad(az)) + 5}
              textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700, fill: SKY_DIM }}>
              {name}
            </text>
          ))}

          {usesPole && [15, 30, 45].map((d) => (
            <circle key={d} cx={CX} cy={CY} r={(R * d) / 48} fill="none" stroke="oklch(0.36 0.04 265)" strokeWidth="0.8" strokeDasharray="3 6" />
          ))}

          {!usesPole && FIELD.map((f, i) => {
            const p = starPosition({ star: f, jd, latitude, longitude: place.lon })
            if (p.altitude <= 0) return null
            const [x, y] = horizon(p)
            return <circle key={`f${i}`} cx={x} cy={y} r={Math.max(0.7, 2.6 - f.mag * 0.45)} fill={SKY_DIM} opacity="0.5" />
          })}

          {/* Star trails: where each star was over the past six hours. */}
          {trails && !usesPole && shown.map((s) => {
            const pts = []
            for (let k = 0; k <= 12; k++) {
              const p = starPosition({ star: s, jd: jd - (k * 0.5) / 24, latitude, longitude: place.lon })
              if (p.altitude > 0) pts.push(horizon(p))
            }
            if (pts.length < 2) return null
            return <path key={`t${s.id}`} d={pts.map((p, i) => `${i ? 'L' : 'M'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')}
              fill="none" stroke="oklch(0.45 0.05 265)" strokeWidth="1.1" />
          })}

          {/* The patterns, joined up. */}
          {Object.entries(JOINS).map(([group, pairs]) => pairs.map(([a, b], i) => {
            const sa = visible[a], sb = visible[b]
            if (!sa || !sb) return null
            if (usesPole ? (poleDist(sa) > 48 || poleDist(sb) > 48) : (sa.altitude <= 0 || sb.altitude <= 0)) return null
            const [x1, y1] = project(sa), [x2, y2] = project(sb)
            return <line key={`${group}${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={GROUP_COLOUR[group]} strokeWidth="1.4" opacity="0.75" />
          }))}

          {/* The stars themselves. */}
          {shown.map((s) => {
            const [x, y] = project(s)
            return (
              <g key={s.id}>
                <circle cx={x} cy={y} r={dotSize(s.mag)} fill={GROUP_COLOUR[s.group] ?? 'var(--paper)'} />
                {NAMED.has(s.id) && (
                  <text x={x + 7} y={y + 4} style={{ fontFamily: 'var(--sans)', fontSize: 10, fill: SKY_DIM }}>{s.name}</text>
                )}
              </g>
            )
          })}

          {mode === 'pointers' && visible.merak.altitude > -90 && (() => {
            const [mx, my] = project(visible.merak)
            const [dx, dy] = project(visible.dubhe)
            const ux = dx - mx, uy = dy - my
            return (
              <line x1={mx} y1={my} x2={mx + ux * 6} y2={my + uy * 6}
                stroke="oklch(0.72 0.17 85)" strokeWidth="1.6" strokeDasharray="6 5" opacity="0.9" />
            )
          })()}

          {mode === 'south' && (() => {
            const [gx, gy] = project(visible.gacrux)
            const [ax, ay] = project(visible.acrux)
            const ux = ax - gx, uy = ay - gy
            return (
              <g>
                <line x1={gx} y1={gy} x2={gx + ux * 5.5} y2={gy + uy * 5.5}
                  stroke="oklch(0.72 0.17 85)" strokeWidth="1.6" strokeDasharray="6 5" />
                <circle cx={CX} cy={CY} r={5} fill="none" stroke="oklch(0.85 0.02 265)" strokeWidth="2" />
                <text x={CX + 10} y={CY - 8} style={{ fontFamily: 'var(--sans)', fontSize: 11, fill: SKY_INK }}>
                  the true pole
                </text>
              </g>
            )
          })()}

          {mode === 'latitude' && polarisNow.altitude > 0 && (() => {
            // Polaris's own little circle, drawn at the scale of the plot.
            const r = (R * polarisOffset) / 90
            const [px, py] = horizon({ altitude: latitude, azimuth: 0 })
            return (
              <g>
                <circle cx={px} cy={py} r={r * 6} fill="none" stroke="oklch(0.72 0.17 85)" strokeWidth="1" strokeDasharray="3 4" />
                <text x={px} y={py + r * 6 + 16} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 10.5, fill: SKY_DIM }}>
                  its circle round the true pole, ×6
                </text>
              </g>
            )
          })()}

          {mode === 'meridian' && (
            <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} stroke="oklch(0.62 0.10 85)" strokeWidth="1.2" strokeDasharray="5 6" />
          )}

          <text x={20} y={H - 12} style={{ fontFamily: 'var(--sans)', fontSize: 11.5, fill: SKY_DIM }}>
            {usesPole
              ? `the pole is the centre · rings every 15° out from it`
              : `the rim is the horizon · the centre is straight overhead · north up, east right`}
          </text>
        </svg>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 13 }}>
        {mode !== 'latitude' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <span className="hw-readout-label" style={{ marginRight: 4 }}>STAND IN</span>
            {PLACES.map((p) => (
              <button key={p.id} className="hw-btn" aria-pressed={p.id === placeId} onClick={() => setPlace(p.id)}
                style={{ borderColor: p.id === placeId ? 'var(--accent)' : 'var(--field)', background: p.id === placeId ? 'var(--accent-wash-2)' : 'var(--paper)' }}>
                {p.name}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span className="hw-readout-label" style={{ marginRight: 4 }}>IN</span>
          {DATES.map((d) => (
            <button key={d.id} className="hw-btn" aria-pressed={d.id === dateId} onClick={() => setDate(d.id)}
              style={{ borderColor: d.id === dateId ? 'var(--accent)' : 'var(--field)', background: d.id === dateId ? 'var(--accent-wash-2)' : 'var(--paper)' }}>
              {d.label}
            </button>
          ))}
          {mode === 'turning' && (
            <button className="hw-btn" aria-pressed={trails} onClick={() => setTrails((t) => !t)}
              style={{ marginLeft: 8, borderColor: trails ? 'var(--accent)' : 'var(--field)', background: trails ? 'var(--accent-wash-2)' : 'var(--paper)' }}>
              {trails ? 'HIDE THE TRAILS' : 'SHOW THE TRAILS'}
            </button>
          )}
        </div>

        {mode === 'latitude' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="hw-star-lat" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              STAND AT LATITUDE {latitude.toFixed(0)}° NORTH
            </label>
            <input id="hw-star-lat" type="range" min={2} max={72} step={1}
              value={Math.round(lat)} onChange={(e) => setLat(Number(e.target.value))} />
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="hw-star-hour" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            MOVE THROUGH THE NIGHT
          </label>
          <input id="hw-star-hour" type="range" min={18} max={30} step={1}
            value={hour} onChange={(e) => setHour(Number(e.target.value))} />
        </div>
      </div>
    </div>
  )
}
