import { useState } from 'react'

// Navigation, Lesson 3 — latitude and longitude.
//
// The lesson's hard part is not reading a coordinate. It is that the two
// numbers are not the same kind of number: a degree of latitude is the same
// distance everywhere, and a degree of longitude shrinks to nothing at the
// poles. So the readout carries both, side by side, and the longitude one
// collapses as you slide north — which is meridian convergence made arithmetic
// rather than asserted.
//
//   1° of latitude   ≈ 69.1 miles, at every latitude
//   1' of latitude   =  1 nautical mile (1.15 statute miles) — that is where
//                       the nautical mile comes from
//   1° of longitude  ≈ 69.2 × cos(latitude) miles
//                       69.2 at the Equator · 48.9 at 45° · 34.6 at 60° · 0 at the pole
//
// The globe is an orthographic projection turned so the marker always faces
// you, which means moving east actually spins the world.

const R = 118
const TILT = 20                         // degrees, so the grid reads as a ball
const EQ_DEG_MI = 24901 / 360           // one degree of longitude at the Equator
const LAT_DEG_MI = 24860 / 360          // one degree of latitude, anywhere

const PLACES = [
  { name: `The Equator at the prime meridian`, lat: 0, lon: 0, note: `Where both numbers are zero — in the Gulf of Guinea, as it happens.` },
  { name: `Greenwich, London`, lat: 51.48, lon: 0, note: `Longitude 0° by agreement, not by nature. Someone had to choose.` },
  { name: `Columbus, Ohio`, lat: 39.9612, lon: -83.0, note: `Most of the United States is a long way west of zero — hence the minus.` },
  { name: `Quito, Ecuador`, lat: -0.18, lon: -78.47, note: `Almost exactly on the Equator, and well into the western half.` },
  { name: `The North Pole`, lat: 90, lon: 0, note: `Every line of longitude meets here. The number stops meaning anything.` }
]

const rad = (d) => (d * Math.PI) / 180

/** Degrees as degrees, minutes and seconds. */
function dms(value, pos, neg) {
  const hemi = value >= 0 ? pos : neg
  const a = Math.abs(value)
  const d = Math.floor(a)
  const mFull = (a - d) * 60
  const m = Math.floor(mFull)
  const s = (mFull - m) * 60
  return `${d}° ${String(m).padStart(2, '0')}′ ${s.toFixed(1).padStart(4, '0')}″ ${hemi}`
}

export default function GlobeGrid() {
  const [lat, setLat] = useState(39.9612)
  const [lon, setLon] = useState(-83)
  const [place, setPlace] = useState(null)

  // Turn the globe so the chosen meridian faces the reader.
  const lon0 = lon
  const lat0 = TILT

  const project = (la, lo) => {
    const dl = rad(lo - lon0)
    const cosc = Math.sin(rad(lat0)) * Math.sin(rad(la)) + Math.cos(rad(lat0)) * Math.cos(rad(la)) * Math.cos(dl)
    return {
      x: R * Math.cos(rad(la)) * Math.sin(dl),
      y: -R * (Math.cos(rad(lat0)) * Math.sin(rad(la)) - Math.sin(rad(lat0)) * Math.cos(rad(la)) * Math.cos(dl)),
      front: cosc > 0
    }
  }

  /** A line of constant latitude or longitude, clipped to the visible face. */
  const arc = (points) => {
    let d = ''
    let pen = false
    for (const p of points) {
      if (!p.front) { pen = false; continue }
      d += `${pen ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `
      pen = true
    }
    return d
  }

  const parallels = []
  for (let la = -75; la <= 75; la += 15) {
    const pts = []
    for (let lo = -180; lo <= 180; lo += 3) pts.push(project(la, lo))
    parallels.push({ la, d: arc(pts) })
  }
  const meridians = []
  for (let lo = -180; lo < 180; lo += 15) {
    const pts = []
    for (let la = -90; la <= 90; la += 3) pts.push(project(la, lo))
    meridians.push({ lo, d: arc(pts) })
  }
  const equator = arc(Array.from({ length: 121 }, (_, i) => project(0, -180 + i * 3)))

  const you = project(lat, lon)
  const lonMi = EQ_DEG_MI * Math.cos(rad(lat))
  const shrunk = Math.round((1 - lonMi / EQ_DEG_MI) * 100)

  const pick = (p) => { setLat(p.lat); setLon(p.lon); setPlace(p) }
  const current = place && place.lat === lat && place.lon === lon ? place : null

  return (
    <div className="hw-sim">
      <div style={{ padding: '16px 22px 0', display: 'flex', gap: 34, flexWrap: 'wrap' }}>
        <div>
          <span className="hw-label">THE COORDINATE</span>
          <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, lineHeight: 1.3, marginTop: 4 }}>
            {dms(lat, 'N', 'S')}<br />{dms(lon, 'E', 'W')}
          </div>
        </div>
        <div>
          <span className="hw-label">ONE DEGREE OF LATITUDE HERE</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4 }}>
            {LAT_DEG_MI.toFixed(1)} miles
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>the same at every latitude</div>
        </div>
        <div>
          <span className="hw-label">ONE DEGREE OF LONGITUDE HERE</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, color: 'var(--accent)', marginTop: 4 }}>
            {lonMi.toFixed(1)} miles
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            {lonMi < 0.05
              ? `nothing left — every line of longitude meets here`
              : shrunk <= 0
                ? `its widest — you are on the Equator`
                : `${shrunk}% narrower than at the Equator`}
          </div>
        </div>
      </div>

      <div className="hw-stage" style={{ position: 'relative', background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <svg viewBox="-150 -150 300 300" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', maxWidth: 360, height: 'auto', display: 'block', margin: '0 auto' }}
          role="img" aria-label={`A globe with a latitude and longitude grid. The marker is at ${dms(lat, 'north', 'south')}, ${dms(lon, 'east', 'west')}. One degree of longitude here is ${lonMi.toFixed(1)} miles.`}>
          <circle cx="0" cy="0" r={R} fill="oklch(0.90 0.035 230)" stroke="var(--ink)" strokeWidth="1.5" />
          {meridians.map((m) => (
            <path key={`m${m.lo}`} d={m.d} fill="none" stroke="var(--ink)" strokeWidth={m.lo === 0 ? 2 : 0.8}
              opacity={m.lo === 0 ? 0.85 : 0.3} />
          ))}
          {parallels.map((p) => (
            <path key={`p${p.la}`} d={p.d} fill="none" stroke="var(--ink)" strokeWidth="0.8" opacity="0.3" />
          ))}
          <path d={equator} fill="none" stroke="var(--ink)" strokeWidth="2" opacity="0.85" />

          {you.front && (
            <>
              <circle cx={you.x} cy={you.y} r="7" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2.5" />
              <circle cx={you.x} cy={you.y} r="13" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
            </>
          )}

          <text x="0" y={-R - 10} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 11, fill: 'var(--muted)' }}>North Pole</text>
          <text x="0" y={R + 20} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 11, fill: 'var(--muted)' }}>South Pole</text>
        </svg>

        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)', margin: '4px 0 0', textAlign: 'center' }}>
          The lines of longitude are furthest apart at the Equator and meet at both poles.
        </p>
        {current && (
          <p style={{ fontSize: 18, lineHeight: 1.5, margin: '10px 0 0', color: 'var(--ink-2)', textAlign: 'center', textWrap: 'pretty' }}>
            <strong>{current.name}.</strong> {current.note}
          </p>
        )}
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 210 }}>
            <label htmlFor="hw-lat" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Latitude · {lat >= 0 ? `${lat.toFixed(2)}° N` : `${Math.abs(lat).toFixed(2)}° S`}
            </label>
            <input id="hw-lat" type="range" min="-90" max="90" step="0.5" value={lat}
              onChange={(e) => { setLat(Number(e.target.value)); setPlace(null) }}
              style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 210 }}>
            <label htmlFor="hw-lon" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Longitude · {lon >= 0 ? `${lon.toFixed(2)}° E` : `${Math.abs(lon).toFixed(2)}° W`}
            </label>
            <input id="hw-lon" type="range" min="-180" max="180" step="0.5" value={lon}
              onChange={(e) => { setLon(Number(e.target.value)); setPlace(null) }}
              style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {PLACES.map((p) => (
            <button key={p.name} className="hw-btn" onClick={() => pick(p)} aria-pressed={current?.name === p.name}
              style={{
                fontSize: 12.5, padding: '10px 13px',
                background: current?.name === p.name ? 'var(--ink)' : 'var(--paper)',
                color: current?.name === p.name ? '#f6f1e7' : 'var(--ink)',
                borderColor: current?.name === p.name ? 'var(--ink)' : 'var(--field)'
              }}>
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
