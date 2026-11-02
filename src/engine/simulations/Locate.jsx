import { useState } from 'react'

// Navigation, Lesson 5 — putting it together: where am I?
//
// A quarter-degree of Ohio, drawn to true scale. Everything the learner does
// is the week's three skills at once: read a coordinate, read a map, and say
// where something is in a way another person could follow.
//
// The map is true to scale, which makes one thing visible that a lesson can
// only assert: the graticule cells are NOT square. At this latitude
//
//   1 minute of latitude   = 1.151 miles  → 117.7 px
//   1 minute of longitude  = 0.880 miles  →  90.0 px
//
// Both work out to 102.2 px per mile, so distance is the same in any direction
// — and the cells come out visibly taller than they are wide, because a minute
// of longitude here is only 76% of a minute of latitude. Lesson 3's arithmetic,
// standing on a map.
//
// Distance and bearing from Camp Heartwood are shown at all times; they are
// what the weekly challenge asks the learner to produce in words.

const W = 900
const H = 706

const LAT = [40 + 10 / 60, 40 + 16 / 60]          // 40° 10′ N to 40° 16′ N
const LON = [-(83 + 10 / 60), -83]                 // 83° 10′ W to 83° 00′ W

const MI_PER_MIN_LAT = 24860 / 360 / 60            // 1.1509 miles
const MID_LAT = (LAT[0] + LAT[1]) / 2
const MI_PER_MIN_LON = (24901 / 360 / 60) * Math.cos((MID_LAT * Math.PI) / 180)   // 0.8803 miles

const TOL_MI = 0.15                                // 264 yards — a fair fix
const STEP = 5 / 3600                              // the sliders move in 5-second steps
const BLUE = 'oklch(0.48 0.10 250)'
const GREEN = 'oklch(0.50 0.12 155)'

const px = (lat, lon) => [
  ((lon - LON[0]) / (LON[1] - LON[0])) * W,
  ((LAT[1] - lat) / (LAT[1] - LAT[0])) * H
]
const PX_PER_MI = W / ((LON[1] - LON[0]) * 60 * MI_PER_MIN_LON)

const FEATURES = [
  { id: 'pond',   name: `Beaver Pond`,      lat: 40 + 14 / 60,    lon: -(83 + 7.5 / 60) },
  { id: 'rock',   name: `Hollow Rock`,      lat: 40 + 12 / 60,    lon: -(83 + 3 / 60), elev: 1284 },
  { id: 'bridge', name: `The stone bridge`, lat: 40 + 11.25 / 60, lon: -(83 + 8.75 / 60) },
  { id: 'junc',   name: `The trail junction`, lat: 40 + 13.5 / 60, lon: -(83 + 1.5 / 60) },
  { id: 'tower',  name: `The fire tower`,   lat: 40 + 15 / 60,    lon: -(83 + 5 / 60) },
  { id: 'camp',   name: `Camp Heartwood`,   lat: 40 + 10.5 / 60,  lon: -(83 + 4.5 / 60) }
]
const byId = (id) => FEATURES.find((f) => f.id === id)
const CAMP = byId('camp')

const TASKS = [
  { id: 't1', kind: 'find', target: 'pond',   ask: `Put the crosshair on **Beaver Pond**, then read off its coordinates.` },
  { id: 't2', kind: 'plot', target: 'rock',   ask: `Something sits at **40° 12′ 00″ N, 83° 03′ 00″ W**. Plot it, and see what it is.` },
  { id: 't3', kind: 'find', target: 'tower',  ask: `Put the crosshair on **the fire tower**, then read off its coordinates.` },
  { id: 't4', kind: 'plot', target: 'bridge', ask: `Plot **40° 11′ 15″ N, 83° 08′ 45″ W**.` },
  { id: 't5', kind: 'find', target: 'junc',   ask: `Put the crosshair on **the trail junction**.` }
]

/** Degrees as degrees, minutes and seconds. */
function dms(value, pos, neg) {
  const hemi = value >= 0 ? pos : neg
  const a = Math.abs(value)
  const d = Math.floor(a)
  const mFull = (a - d) * 60
  const m = Math.floor(mFull)
  const s = Math.round((mFull - m) * 60)
  const carry = s === 60
  return `${d}° ${String(carry ? m + 1 : m).padStart(2, '0')}′ ${String(carry ? 0 : s).padStart(2, '0')}″ ${hemi}`
}

/** North-south and east-west miles from a to b, using this latitude's figures. */
const offset = (a, b) => ({
  north: (b.lat - a.lat) * 60 * MI_PER_MIN_LAT,
  east: (b.lon - a.lon) * 60 * MI_PER_MIN_LON
})
const range = (a, b) => { const o = offset(a, b); return Math.hypot(o.north, o.east) }
const bearing = (a, b) => { const o = offset(a, b); return ((Math.atan2(o.east, o.north) * 180) / Math.PI + 360) % 360 }

const COMPASS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west']
const named = (brg) => COMPASS[Math.round(brg / 45) % 8]

export default function Locate() {
  const [lat, setLat] = useState(CAMP.lat)
  const [lon, setLon] = useState(CAMP.lon)
  const [taskId, setTaskId] = useState(null)
  const [checked, setChecked] = useState(null)

  const here = { lat, lon }
  const task = TASKS.find((t) => t.id === taskId) ?? null
  const fromCamp = range(CAMP, here)
  const brgCamp = bearing(CAMP, here)

  const move = (patch) => { setLat((l) => patch.lat ?? l); setLon((o) => patch.lon ?? o); setChecked(null) }

  const check = () => {
    if (!task) return
    const goal = byId(task.target)
    const miss = range(here, goal)
    if (miss <= TOL_MI) {
      setChecked({ ok: true, miss, goal })
    } else {
      setChecked({ ok: false, miss, goal, way: named(bearing(here, goal)) })
    }
  }

  const [cx, cy] = px(lat, lon)
  const minuteLines = []
  for (let m = 1; m < 6; m++) minuteLines.push({ kind: 'lat', v: LAT[0] + m / 60 })
  for (let m = 1; m < 10; m++) minuteLines.push({ kind: 'lon', v: LON[0] + m / 60 })

  let verdict = null
  if (checked?.ok) {
    const g = checked.goal
    const yards = Math.round(checked.miss * 1760)
    const how = yards < 20 ? `Dead on.` : `You were ${yards} yards out — well inside a fair fix.`
    // Half the places are named "The ..."; mid-sentence they need a small t.
    const lower = g.name.startsWith('The ') ? `t${g.name.slice(1)}` : g.name
    verdict = task.kind === 'plot'
      ? `That spot is **${lower}**${g.elev ? `, ${g.elev.toLocaleString()} feet` : ''}. ${how}`
      : `**${g.name}**: ${dms(g.lat, 'N', 'S')}, ${dms(g.lon, 'E', 'W')}. ${how}`
  } else if (checked) {
    verdict = `Not yet — you are ${checked.miss.toFixed(2)} miles away, and it lies to the **${checked.way}** of the crosshair. Nudge the sliders and check again.`
  }

  return (
    <div className="hw-sim">
      <div style={{ padding: '16px 22px 0', display: 'flex', gap: 34, flexWrap: 'wrap' }}>
        <div>
          <span className="hw-label">THE CROSSHAIR IS AT</span>
          <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 500, lineHeight: 1.3, marginTop: 4 }}>
            {dms(lat, 'N', 'S')}<br />{dms(lon, 'E', 'W')}
          </div>
        </div>
        <div>
          <span className="hw-label">FROM CAMP HEARTWOOD</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 500, color: 'var(--accent)', marginTop: 4 }}>
            {fromCamp < 0.05 ? `you are at camp` : `${fromCamp.toFixed(2)} miles`}
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            {fromCamp < 0.05 ? `the starting point` : `bearing ${String(Math.round(brgCamp)).padStart(3, '0')}° — ${named(brgCamp)}`}
          </div>
        </div>
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '12px 22px 0', height: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={`A map from 40 degrees 10 minutes to 40 degrees 16 minutes north, and 83 degrees to 83 degrees 10 minutes west, with six named places. The crosshair is at ${dms(lat, 'north', 'south')}, ${dms(lon, 'east', 'west')}, ${fromCamp.toFixed(2)} miles from Camp Heartwood on a bearing of ${Math.round(brgCamp)} degrees.`}>
          <rect x="0" y="0" width={W} height={H} rx="6" fill="#f5efe3" />

          {/* woods */}
          {[[700, 160, 86, 62], [790, 230, 60, 48], [300, 600, 96, 54], [170, 120, 70, 50], [560, 540, 78, 50]].map(([x, y, rx, ry], i) => (
            <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="oklch(0.88 0.045 145)" />
          ))}

          {/* the stream: out of the pond, down past the bridge, off the map */}
          <path d="M 212 262 C 178 330 196 400 150 468 C 128 505 118 530 112 559 C 100 620 86 660 64 706"
            fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="225" cy="235" rx="52" ry="34" fill="oklch(0.88 0.05 230)" stroke={BLUE} strokeWidth="1.5" />

          {/* Mill Road, over the bridge; Camp Lane down to the camp */}
          <path d="M 10 700 L 96 600 L 112 559 L 250 512 L 420 466 L 630 471" fill="none" stroke="#ddd0b6" strokeWidth="11" />
          <path d="M 10 700 L 96 600 L 112 559 L 250 512 L 420 466 L 630 471" fill="none" stroke="#f1e7d4" strokeWidth="4" />
          <path d="M 300 497 L 380 580 L 495 647" fill="none" stroke="#ddd0b6" strokeWidth="9" />
          <text x="470" y="470" textAnchor="middle" transform="rotate(-11 470 470)"
            style={{ fontFamily: 'var(--sans)', fontSize: 13, fontStyle: 'italic', fill: 'var(--muted)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: '#f5efe3', strokeWidth: 5 }}>Mill Road</tspan>
          </text>

          {/* the trails */}
          <path d="M 495 647 L 572 560 L 630 471" fill="none" stroke="#9a8d76" strokeWidth="2.6" strokeDasharray="9 7" />
          <path d="M 630 471 L 706 382 L 765 294" fill="none" stroke="#9a8d76" strokeWidth="2.6" strokeDasharray="9 7" />
          <path d="M 765 294 L 630 220 L 450 118" fill="none" stroke="#9a8d76" strokeWidth="2.6" strokeDasharray="9 7" />

          {/* the graticule, at whole minutes */}
          {minuteLines.map((m) => {
            if (m.kind === 'lat') {
              const y = px(m.v, LON[0])[1]
              return (
                <g key={`la${m.v}`}>
                  <line x1="0" y1={y} x2={W} y2={y} stroke="var(--ink)" strokeWidth="1" opacity="0.26" />
                  <text x="6" y={y - 6} style={{ fontFamily: 'var(--sans)', fontSize: 12, fill: 'var(--muted)' }}>
                    {`40° ${Math.round((m.v - 40) * 60)}′ N`}
                  </text>
                </g>
              )
            }
            const x = px(LAT[0], m.v)[0]
            return (
              <g key={`lo${m.v}`}>
                <line x1={x} y1="0" x2={x} y2={H} stroke="var(--ink)" strokeWidth="1" opacity="0.26" />
                <text x={x + 5} y={H - 8} style={{ fontFamily: 'var(--sans)', fontSize: 12, fill: 'var(--muted)' }}>
                  {`83° ${String(Math.round(-(m.v + 83) * 60)).padStart(2, '0')}′ W`}
                </text>
              </g>
            )
          })}

          {/* the six places */}
          {FEATURES.map((f) => {
            const [x, y] = px(f.lat, f.lon)
            const lit = checked?.ok && checked.goal.id === f.id
            return (
              <g key={f.id}>
                {f.id === 'rock' && (
                  <>
                    <path d={`M ${x - 9} ${y} L ${x + 9} ${y} M ${x} ${y - 9} L ${x} ${y + 9}`} stroke="var(--ink)" strokeWidth="2.5" />
                    <text x={x + 13} y={y + 19} style={{ fontFamily: 'var(--sans)', fontSize: 12, fill: 'var(--ink-3)' }}>{f.elev}</text>
                  </>
                )}
                {f.id === 'tower' && (
                  <path d={`M ${x - 9} ${y + 9} L ${x} ${y - 10} L ${x + 9} ${y + 9} Z M ${x - 5} ${y + 2} L ${x + 5} ${y + 2}`}
                    fill="none" stroke="var(--ink)" strokeWidth="2.2" />
                )}
                {f.id === 'camp' && (
                  <path d={`M ${x - 10} ${y + 8} L ${x} ${y - 9} L ${x + 10} ${y + 8} Z`} fill="var(--ink)" />
                )}
                {f.id === 'bridge' && (
                  <path d={`M ${x - 11} ${y - 6} L ${x + 11} ${y + 6} M ${x - 11} ${y + 3} L ${x + 11} ${y + 15}`}
                    stroke="var(--ink)" strokeWidth="2.6" />
                )}
                {f.id === 'junc' && <circle cx={x} cy={y} r="6" fill="none" stroke="var(--ink)" strokeWidth="2.4" />}
                {lit && <circle cx={x} cy={y} r="22" fill="none" stroke={GREEN} strokeWidth="3" />}
                <text x={x} y={f.id === 'pond' ? y + 5 : y - 16} textAnchor="middle"
                  style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, fill: lit ? GREEN : 'var(--ink)' }}>
                  <tspan style={{ paintOrder: 'stroke', stroke: '#f5efe3', strokeWidth: 5 }}>{f.name}</tspan>
                </text>
              </g>
            )
          })}

          {/* the crosshair */}
          <line x1={cx} y1="0" x2={cx} y2={H} stroke="var(--accent)" strokeWidth="1" opacity="0.45" strokeDasharray="4 5" />
          <line x1="0" y1={cy} x2={W} y2={cy} stroke="var(--accent)" strokeWidth="1" opacity="0.45" strokeDasharray="4 5" />
          <circle cx={cx} cy={cy} r="11" fill="none" stroke="var(--accent)" strokeWidth="3" />
          <circle cx={cx} cy={cy} r="2.5" fill="var(--accent)" />

          {/* north arrow and scale */}
          <g transform={`translate(${W - 50} 42)`}>
            <line x1="0" y1="24" x2="0" y2="-14" stroke="var(--ink)" strokeWidth="2.5" />
            <path d="M 0 -22 l -7 12 l 14 0 z" fill="var(--ink)" />
            <text x="0" y="42" textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700, fill: 'var(--ink)' }}>N</text>
          </g>
          <g transform={`translate(${W - 150} ${H - 76})`}>
            <line x1="0" y1="0" x2={PX_PER_MI} y2="0" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1={PX_PER_MI} y1="-6" x2={PX_PER_MI} y2="6" stroke="var(--ink)" strokeWidth="2.5" />
            <text x={PX_PER_MI / 2} y="20" textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: 'var(--ink-3)' }}>1 mile</text>
          </g>
        </svg>

        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)', margin: '6px 0 0', textAlign: 'center' }}>
          Drawn to true scale. The grid cells are a minute each way — and taller than they are wide, because here a
          minute of longitude is {MI_PER_MIN_LON.toFixed(2)} miles against latitude&rsquo;s {MI_PER_MIN_LAT.toFixed(2)}.
        </p>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 220 }}>
            <label htmlFor="hw-loc-lat" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Latitude · {dms(lat, 'N', 'S')}
            </label>
            <input id="hw-loc-lat" type="range" min={LAT[0]} max={LAT[1]} step={STEP} value={lat}
              onChange={(e) => move({ lat: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 220 }}>
            <label htmlFor="hw-loc-lon" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Longitude · {dms(lon, 'E', 'W')}
            </label>
            <input id="hw-loc-lon" type="range" min={LON[0]} max={LON[1]} step={STEP} value={lon}
              onChange={(e) => move({ lon: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          {TASKS.map((t, i) => (
            <button key={t.id} className="hw-btn" aria-pressed={taskId === t.id}
              onClick={() => { setTaskId(t.id === taskId ? null : t.id); setChecked(null) }}
              style={{
                padding: '10px 14px', fontSize: 12.5,
                background: taskId === t.id ? 'var(--ink)' : 'var(--paper)',
                color: taskId === t.id ? '#f6f1e7' : 'var(--ink)',
                borderColor: taskId === t.id ? 'var(--ink)' : 'var(--field)'
              }}>
              {t.kind === 'find' ? `FIND ${i + 1}` : `PLOT ${i + 1}`}
            </button>
          ))}
          {task && (
            <button className="hw-btn hw-btn-solid" style={{ padding: '10px 18px', fontSize: 12.5 }} onClick={check}>
              CHECK MY ANSWER
            </button>
          )}
        </div>

        {task && (
          <div style={{
            padding: '13px 16px', borderRadius: 'var(--r-md)',
            border: `1px solid ${checked?.ok ? GREEN : 'var(--rule)'}`,
            background: checked?.ok ? 'var(--green-wash)' : 'var(--paper)'
          }}>
            <p style={{ fontSize: 18, lineHeight: 1.5, margin: 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>
              {task.ask.split(/(\*\*[^*]+\*\*)/).map((s, i) =>
                s.startsWith('**') ? <strong key={i} style={{ fontWeight: 600 }}>{s.slice(2, -2)}</strong> : s)}
            </p>
            {verdict && (
              <p aria-live="polite" style={{ fontSize: 18, lineHeight: 1.5, margin: '9px 0 0', color: checked.ok ? 'var(--green-text)' : 'var(--ink-3)', textWrap: 'pretty' }}>
                {verdict.split(/(\*\*[^*]+\*\*)/).map((s, i) =>
                  s.startsWith('**') ? <strong key={i} style={{ fontWeight: 600 }}>{s.slice(2, -2)}</strong> : s)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
