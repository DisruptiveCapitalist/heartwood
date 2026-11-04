import { useState } from 'react'

// Navigation, Lesson 7 — true north and magnetic north.
//
// Lesson 6's bar-magnet picture gets the shape of the field right and the
// local angle wrong. Checked: a centred dipole predicts about 2.5° EAST for
// Columbus, Ohio; the published value is 7.2° WEST. Wrong by ten degrees and
// by its sign. So nothing here is modelled — the four figures below were
// looked up, and the simulation says where they came from.
//
//   NOAA NCEI, World Magnetic Model WMM2025, evaluated 1 January 2026:
//     Seattle, WA   47.61 N 122.33 W   +14.97°  (15.0° E)   −0.124°/yr
//     Denver, CO    39.74 N 104.99 W    +7.56°  ( 7.6° E)   −0.080°/yr
//     Columbus, OH  39.96 N  83.00 W    −7.22°  ( 7.2° W)   −0.018°/yr
//     Boston, MA    42.36 N  71.06 W   −13.98°  (14.0° W)   +0.071°/yr
//
//   The agonic line — where declination is zero — runs close to 93° W in 2026.
//   Probed at four points: 30 N 88.0 W → −2.87 · 30 N 91.5 W → −0.62 ·
//   40 N 93.0 W → −0.05 · 45 N 94.0 W → +0.46.
//
// Sign convention, and the thing people get backwards:
//     declination is positive EAST
//     true  = magnetic + declination
//     magnetic = true − declination
//
// Cost of ignoring it: a bearing off by A degrees puts you 1,760 × tan(A)
// yards off course per mile — about 31 yards a mile for every degree.

const W = 760
const rad = (d) => (d * Math.PI) / 180

const PLACES = [
  { id: 'sea', name: `Seattle, WA`, lat: 47.61, lon: -122.33, dec: 14.97, sv: -0.124 },
  { id: 'den', name: `Denver, CO`, lat: 39.74, lon: -104.99, dec: 7.56, sv: -0.080 },
  { id: 'cmh', name: `Columbus, OH`, lat: 39.96, lon: -83.00, dec: -7.22, sv: -0.018 },
  { id: 'bos', name: `Boston, MA`, lat: 42.36, lon: -71.06, dec: -13.98, sv: 0.071 }
]
const SOURCE = `NOAA NCEI · World Magnetic Model 2025 · evaluated 1 January 2026`

/**
 * Where declination is zero, from four probes of the same model, extended to
 * the top and bottom of the panel so the line and the two shaded regions span
 * the whole chart. Ordered south to north.
 */
const AGONIC = [[24, -92.1], [30, -92.5], [35, -92.8], [40, -93.0], [45, -93.2], [50, -93.4]]

const say = (d) => (Math.abs(d) < 0.05 ? `0°` : `${Math.abs(d).toFixed(1)}° ${d > 0 ? 'E' : 'W'}`)
const brg = (b) => String(Math.round(((b % 360) + 360) % 360)).padStart(3, '0')

/* ---- the two norths ---------------------------------------------------- */

function Roses({ dec, setDec, mag, setMag, place, setPlace }) {
  const R = 118
  const trueB = ((mag + dec) % 360 + 360) % 360
  const offPerMile = 1760 * Math.tan(rad(Math.abs(dec)))

  const ray = (angle, len) => {
    const a = rad(angle - 90)
    return [len * Math.cos(a), len * Math.sin(a)]
  }
  const [tx, ty] = ray(0, R)
  const [mx, my] = ray(dec, R)
  const [bx, by] = ray(trueB, R - 16)

  return (
    <>
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 34, flexWrap: 'wrap' }}>
        <div>
          <span className="hw-label">YOUR COMPASS READS</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4 }}>{brg(mag)}° magnetic</div>
        </div>
        <div>
          <span className="hw-label">ON THE MAP THAT IS</span>
          <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, color: 'var(--accent)', marginTop: 4 }}>
            {brg(trueB)}° true
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            true = magnetic {dec >= 0 ? '+' : '−'} {Math.abs(dec).toFixed(1)}
          </div>
        </div>
        <div>
          <span className="hw-label">IGNORE IT FOR TWO MILES</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4 }}>
            {Math.round(offPerMile * 2).toLocaleString()} yards off
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            {Math.round(offPerMile)} yards for every mile you walk
          </div>
        </div>
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <svg viewBox="-170 -170 340 340" preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', maxWidth: 380, height: 'auto', display: 'block', margin: '0 auto' }}
          role="img" aria-label={`A compass rose. Magnetic north lies ${say(dec)} of true north. A compass reading of ${brg(mag)} degrees magnetic is ${brg(trueB)} degrees true.`}>
          <circle cx="0" cy="0" r={R} fill="var(--paper)" stroke="var(--field)" strokeWidth="1" />
          {Array.from({ length: 72 }, (_, i) => {
            const a = rad(i * 5 - 90)
            const inner = i % 18 === 0 ? R - 13 : i % 6 === 0 ? R - 9 : R - 5
            return <line key={i} x1={inner * Math.cos(a)} y1={inner * Math.sin(a)} x2={R * Math.cos(a)} y2={R * Math.sin(a)}
              stroke="var(--ink)" strokeWidth={i % 18 === 0 ? 1.6 : 0.7} opacity={i % 18 === 0 ? 0.8 : 0.4} />
          })}

          {/* The two arrows are only a few degrees apart over most of the
              country, so naming them at their tips puts one word on top of
              the other. They are named in the legend underneath instead. */}
          <line x1="0" y1="0" x2={tx} y2={ty} stroke="var(--ink)" strokeWidth="2.5" />
          <path d="M 0 -136 l -5 10 l 10 0 z" fill="var(--ink)" />

          <line x1="0" y1="0" x2={mx} y2={my} stroke={'oklch(0.46 0.15 25)'} strokeWidth="2.5" />
          <g transform={`rotate(${dec})`}>
            <path d="M 0 -136 l 7 12 l -7 0 z" fill="oklch(0.46 0.15 25)" />
          </g>

          {/* the angle between them */}
          {Math.abs(dec) > 0.4 && (
            <path d={`M 0 ${-R + 40} A ${R - 40} ${R - 40} 0 0 ${dec > 0 ? 1 : 0} ${(R - 40) * Math.cos(rad(dec - 90))} ${(R - 40) * Math.sin(rad(dec - 90))}`}
              fill="none" stroke="oklch(0.46 0.15 25)" strokeWidth="1.5" strokeDasharray="4 4" />
          )}
          <text x={dec > 0 ? 18 : -18} y={-R + 56} textAnchor={dec > 0 ? 'start' : 'end'}
            style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, fill: 'oklch(0.46 0.15 25)' }}>
            {say(dec)}
          </text>

          {/* the direction you are actually going */}
          <line x1="0" y1="0" x2={bx} y2={by} stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          <circle cx={bx} cy={by} r="6" fill="var(--accent)" />
          <circle cx="0" cy="0" r="5" fill="var(--ink)" />
        </svg>
        <div style={{ display: 'flex', gap: 22, justifyContent: 'center', flexWrap: 'wrap', margin: '4px 0 0' }}>
          {[[`True north — what the map is drawn to`, 'var(--ink)', 'M 2 9 L 34 9 M 34 9 l -9 -4 l 0 8 z'],
            [`Magnetic north — what the needle gives you`, 'oklch(0.46 0.15 25)', 'M 2 9 L 34 9 M 34 9 l -9 -4 l 0 4 z'],
            [`The way you are actually walking`, 'var(--accent)', 'M 2 9 L 34 9']].map(([label, colour, d]) => (
            <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="36" height="18" viewBox="0 0 36 18" aria-hidden="true" style={{ flex: 'none' }}>
                <path d={d} stroke={colour} strokeWidth="2.5" fill={colour} />
              </svg>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--ink-2)' }}>{label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 13 }}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 215 }}>
            <label htmlFor="hw-dec" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Declination here · {say(dec)}
            </label>
            <input id="hw-dec" type="range" min="-20" max="20" step="0.1" value={dec}
              onChange={(e) => { setDec(Number(e.target.value)); setPlace(null) }}
              style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 215 }}>
            <label htmlFor="hw-mag" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              What the compass reads · {brg(mag)}°
            </label>
            <input id="hw-mag" type="range" min="0" max="359" step="1" value={mag}
              onChange={(e) => setMag(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="hw-readout-label">OR STAND IN</span>
          {PLACES.map((p) => (
            <button key={p.id} className="hw-btn" aria-pressed={place === p.id}
              onClick={() => { setDec(p.dec); setPlace(p.id) }}
              style={{
                padding: '10px 13px', fontSize: 12.5,
                background: place === p.id ? 'var(--ink)' : 'var(--paper)',
                color: place === p.id ? '#f6f1e7' : 'var(--ink)',
                borderColor: place === p.id ? 'var(--ink)' : 'var(--field)'
              }}>
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

/* ---- where, and when --------------------------------------------------- */

const MAP = { lon: [-125, -65], lat: [24, 50], w: W, h: 420 }
const mx = (lon) => ((lon - MAP.lon[0]) / (MAP.lon[1] - MAP.lon[0])) * MAP.w
const my = (lat) => ((MAP.lat[1] - lat) / (MAP.lat[1] - MAP.lat[0])) * MAP.h

function Chart({ place, setPlace, setDec, years, setYears }) {
  const chosen = PLACES.find((p) => p.id === place) ?? null
  const then = chosen ? chosen.dec + chosen.sv * years : null

  const agonic = `M ${AGONIC.map(([la, lo]) => `${mx(lo).toFixed(1)} ${my(la).toFixed(1)}`).join(' L ')}`
  // Closing the shaded regions straight off the end of the line cut a diagonal
  // across the chart. Walk the line north to south, then down the panel's own
  // edge, so each region is bounded by the line and nothing else.
  const down = AGONIC.slice().reverse().map(([la, lo]) => `${mx(lo).toFixed(1)} ${my(la).toFixed(1)}`).join(' L ')
  const westOf = `M 0 0 L ${down} L 0 ${MAP.h} Z`
  const eastOf = `M ${MAP.w} 0 L ${down} L ${MAP.w} ${MAP.h} Z`

  return (
    <>
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 34, flexWrap: 'wrap', minHeight: 74 }}>
        {chosen ? (
          <>
            <div>
              <span className="hw-label">{chosen.name.toUpperCase()}, TODAY</span>
              <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, color: 'var(--accent)', marginTop: 4 }}>
                {say(chosen.dec)}
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
                a compass there points {say(chosen.dec)} of true north
              </div>
            </div>
            <div>
              <span className="hw-label">IN {years} YEARS</span>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4 }}>{say(then)}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
                moving {Math.abs(chosen.sv).toFixed(3)}° a year, {chosen.sv > 0 ? 'eastward' : 'westward'}
              </div>
            </div>
          </>
        ) : (
          <div>
            <span className="hw-label">PICK A PLACE</span>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 400, marginTop: 4, color: 'var(--ink-3)' }}>
              Four looked-up figures, and the line where the number is zero.
            </div>
          </div>
        )}
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={`A plot of the United States by latitude and longitude, with the line of zero declination running close to 93 degrees west. West of it a compass points east of true north; east of it, west of true north. Four places are marked with their published values.`}>
          <rect x="0" y="0" width={MAP.w} height={MAP.h} rx="6" fill="var(--paper-alt)" />

          {/* which way your compass leans, either side of the zero line */}
          <path d={westOf} fill="oklch(0.95 0.03 155)" opacity="0.75" />
          <path d={eastOf} fill="oklch(0.96 0.025 45)" opacity="0.8" />

          {/* the graticule */}
          {[-120, -110, -100, -90, -80, -70].map((lo) => (
            <g key={lo}>
              <line x1={mx(lo)} y1="0" x2={mx(lo)} y2={MAP.h} stroke="var(--ink)" strokeWidth="0.8" opacity="0.2" />
              <text x={mx(lo) + 4} y={MAP.h - 8} style={{ fontFamily: 'var(--sans)', fontSize: 11, fill: 'var(--muted)' }}>{Math.abs(lo)}° W</text>
            </g>
          ))}
          {[30, 35, 40, 45].map((la) => (
            <g key={la}>
              <line x1="0" y1={my(la)} x2={MAP.w} y2={my(la)} stroke="var(--ink)" strokeWidth="0.8" opacity="0.2" />
              <text x="6" y={my(la) - 5} style={{ fontFamily: 'var(--sans)', fontSize: 11, fill: 'var(--muted)' }}>{la}° N</text>
            </g>
          ))}

          <path d={agonic} fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          <text x={mx(-93) - 10} y="28" textAnchor="end" style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, fill: 'var(--ink)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: 'var(--paper-alt)', strokeWidth: 5 }}>zero — the two norths agree</tspan>
          </text>
          <text x={mx(-112)} y={MAP.h - 46} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 14, fill: 'oklch(0.38 0.10 155)' }}>
            west of the line: the needle leans <tspan style={{ fontWeight: 700 }}>east</tspan>
          </text>
          <text x={mx(-76)} y={MAP.h - 46} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 14, fill: 'oklch(0.42 0.11 45)' }}>
            east of it: the needle leans <tspan style={{ fontWeight: 700 }}>west</tspan>
          </text>

          {PLACES.map((p) => {
            const lit = place === p.id
            return (
              <g key={p.id}>
                <circle cx={mx(p.lon)} cy={my(p.lat)} r={lit ? 9 : 6} fill={lit ? 'var(--accent)' : 'var(--ink)'} />
                <text x={mx(p.lon)} y={my(p.lat) - 15}
                  textAnchor={mx(p.lon) < 86 ? 'start' : mx(p.lon) > MAP.w - 86 ? 'end' : 'middle'}
                  style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, fill: 'var(--ink)' }}>
                  <tspan style={{ paintOrder: 'stroke', stroke: 'var(--paper-alt)', strokeWidth: 5 }}>{p.name.split(',')[0]} · {say(p.dec)}</tspan>
                </text>
              </g>
            )
          })}
        </svg>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)', margin: '6px 0 0', textAlign: 'center' }}>
          {SOURCE}. Look yours up before a trip — these four are examples, not a rule.
        </p>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 13 }}>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="hw-readout-label">PICK A PLACE</span>
          {PLACES.map((p) => (
            <button key={p.id} className="hw-btn" aria-pressed={place === p.id}
              onClick={() => { setPlace(p.id); setDec(p.dec) }}
              style={{
                padding: '10px 13px', fontSize: 12.5,
                background: place === p.id ? 'var(--ink)' : 'var(--paper)',
                color: place === p.id ? '#f6f1e7' : 'var(--ink)',
                borderColor: place === p.id ? 'var(--ink)' : 'var(--field)'
              }}>
              {p.name}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <label htmlFor="hw-years" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Let it drift · {years} years
          </label>
          <input id="hw-years" type="range" min="0" max="50" step="1" value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
        </div>
      </div>
    </>
  )
}

/* ---- the two halves ---------------------------------------------------- */

const TABS = [
  { id: 'rose', label: `The two norths` },
  { id: 'chart', label: `Where, and when` }
]

export default function Declination() {
  const [tab, setTab] = useState('rose')
  const [dec, setDec] = useState(-7.22)
  const [mag, setMag] = useState(45)
  const [place, setPlace] = useState('cmh')
  const [years, setYears] = useState(10)

  return (
    <div className="hw-sim">
      <div style={{ display: 'flex', borderBottom: '1px solid var(--rule)', background: 'var(--paper-alt)' }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} aria-pressed={tab === t.id}
            style={{
              flex: 1, minHeight: 46, border: 'none',
              borderBottom: `3px solid ${tab === t.id ? 'var(--accent)' : 'transparent'}`,
              background: tab === t.id ? 'var(--paper)' : 'transparent',
              fontFamily: 'var(--sans)', fontSize: 12.5, fontWeight: 700, letterSpacing: '.12em',
              color: tab === t.id ? 'var(--ink)' : 'var(--muted)', textTransform: 'uppercase'
            }}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'rose'
        ? <Roses dec={dec} setDec={setDec} mag={mag} setMag={setMag} place={place} setPlace={setPlace} />
        : <Chart place={place} setPlace={setPlace} setDec={setDec} years={years} setYears={setYears} />}
    </div>
  )
}
