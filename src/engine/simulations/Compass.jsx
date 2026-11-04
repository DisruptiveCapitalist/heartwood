import { useMemo, useState } from 'react'

// Navigation, Lessons 8, 9 and 10 — one baseplate compass, three jobs.
//
//   mode 'take'    taking a bearing to something you can see   (Lesson 8)
//   mode 'follow'  walking that bearing across real ground     (Lesson 9)
//   mode 'map'     putting the bearing back on the map         (Lesson 10)
//
// All three share CompassFace, which is the instrument the Field Guide's
// Chapter 8 diagram has to match: baseplate, direction-of-travel arrow, index
// line, rotating housing, orienting arrow and orienting lines, and the needle.
//
// MECHANICS, and the reason this is worth simulating rather than describing.
// Every plan view here is drawn with TRUE north up, and the needle sits at the
// declination angle — Columbus, Ohio, 7.2° W (NOAA NCEI, WMM2025, 1 Jan 2026),
// the same figure Lesson 7 uses. Write `aim` for the way the baseplate points
// and `dial` for the number at the index line. The orienting arrow is fixed at
// the housing's N, so it points along true bearing (aim − dial). Boxing the
// needle means setting that equal to the declination, which gives
//
//     dial = aim − declination      and so      dial IS the magnetic bearing
//     true = magnetic + declination
//
// Worked through: the barn is at true 042°. Aim at it, box the needle, and the
// dial must read 042 − (−7.2) = 049 magnetic. Convert back: 49.2 + (−7.2) = 42.
// The two steps are what make the number mean anything, which is why the
// readout stays blank until both are done.
//
// An error of A degrees costs 1,760 × tan(A) yards per mile — about 31 yards
// a mile per degree.

const DECLINATION = -7.22          // Columbus, Ohio · NOAA NCEI WMM2025 · 1 Jan 2026
const YARDS_PER_MILE = 1760
const RED = 'oklch(0.46 0.15 25)'
const GREEN = 'oklch(0.50 0.12 155)'

export const MODES = ['take', 'follow', 'map']

const rad = (d) => (d * Math.PI) / 180
const norm = (d) => ((d % 360) + 360) % 360
const brg = (d) => String(Math.round(norm(d))).padStart(3, '0')
/** Smallest angle between two bearings, signed. */
const delta = (a, b) => { const d = norm(a - b); return d > 180 ? d - 360 : d }

/* ---- the instrument ---------------------------------------------------- */

/**
 * A baseplate compass seen from above, turned to `aim`, with the housing set
 * so the index line reads `dial`. The needle always points at `needleAt`.
 */
function CompassFace({ aim, dial, needleAt, r = 86, labels = false }) {
  const housing = -dial                       // the N mark, relative to the baseplate
  const ticks = []
  for (let i = 0; i < 72; i++) {
    const a = rad(i * 5 - 90)
    const inner = i % 18 === 0 ? r - 14 : i % 6 === 0 ? r - 10 : r - 6
    ticks.push(
      <line key={i} x1={inner * Math.cos(a)} y1={inner * Math.sin(a)} x2={r * Math.cos(a)} y2={r * Math.sin(a)}
        stroke="var(--ink)" strokeWidth={i % 18 === 0 ? 1.6 : 0.7} opacity={i % 18 === 0 ? 0.85 : 0.45} />
    )
  }

  return (
    <g transform={`rotate(${aim})`}>
      {/* baseplate */}
      <rect x={-r - 20} y={-r - 62} width={2 * r + 40} height={2 * r + 104} rx="9"
        fill="var(--paper)" fillOpacity="0.93" stroke="var(--ink)" strokeWidth="1.5" />
      {/* direction-of-travel arrow */}
      <line x1="0" y1={-r - 12} x2="0" y2={-r - 52} stroke={'var(--accent)'} strokeWidth="3.5" />
      <path d={`M 0 ${-r - 60} l -8 14 l 16 0 z`} fill={'var(--accent)'} />
      {/* index line */}
      <line x1="0" y1={-r - 12} x2="0" y2={-r + 2} stroke="var(--ink)" strokeWidth="2.5" />

      {/* housing */}
      <circle cx="0" cy="0" r={r} fill="var(--paper-alt)" stroke="var(--ink)" strokeWidth="1.5" />
      <g transform={`rotate(${housing})`}>
        {ticks}
        {[['N', 0], ['E', 90], ['S', 180], ['W', 270]].map(([t, a]) => {
          const p = rad(a - 90)
          return (
            <text key={t} x={(r - 28) * Math.cos(p)} y={(r - 28) * Math.sin(p) + 5} textAnchor="middle"
              transform={`rotate(${-housing - aim} ${(r - 28) * Math.cos(p)} ${(r - 28) * Math.sin(p)})`}
              style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700, fill: 'var(--ink)' }}>{t}</text>
          )
        })}
        {/* orienting arrow and lines — the "shed" the needle has to park in */}
        <path d={`M 0 ${-r + 24} l -11 20 l 7 0 l 0 ${r - 10} l 8 0 l 0 ${-(r - 10)} l 7 0 z`}
          fill="none" stroke={GREEN} strokeWidth="2.2" />
        {[-22, 22].map((dx) => (
          <line key={dx} x1={dx} y1={-r + 34} x2={dx} y2={r - 20} stroke={GREEN} strokeWidth="1" opacity="0.6" />
        ))}
      </g>

      {/* the needle — it does not care how the compass is held */}
      <g transform={`rotate(${needleAt - aim})`}>
        <path d={`M 0 ${-r + 16} l 9 ${r - 16} l -9 10 l -9 -10 z`} fill={RED} />
        <path d={`M 0 ${r - 16} l 9 ${-(r - 16)} l -9 -10 l -9 10 z`} fill="var(--ink)" opacity="0.72" />
      </g>
      <circle cx="0" cy="0" r="4" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />

      {labels && (
        <g style={{ fontFamily: 'var(--sans)', fontSize: 11.5, fill: 'var(--muted)' }}
          transform={`rotate(${-aim})`}>
          <text x={r + 30} y={-r - 44}>direction-of-travel arrow</text>
          <text x={r + 30} y={-r + 2}>index line — read the bearing here</text>
          <text x={r + 30} y={10}>rotating housing</text>
          <text x={-r - 30} y={-18} textAnchor="end">orienting arrow</text>
          <text x={-r - 30} y={40} textAnchor="end">magnetic needle</text>
          <text x={-r - 30} y={r + 56} textAnchor="end">baseplate</text>
        </g>
      )}
    </g>
  )
}

/* ---- Lesson 8 — taking a bearing --------------------------------------- */

const W8 = 760
const H8 = 560
const EYE = { x: W8 / 2, y: H8 / 2 }

// Landmarks by TRUE bearing, because the plan view is drawn true-north-up.
//
// They sit on a ring, all at the same distance from the eye, and that is
// deliberate twice over. Drawn to scale, the nearer two disappeared behind the
// baseplate — and more to the point, a bearing carries no distance at all. Two
// of these could be a quarter-mile and ten miles away and the readings would
// be identical. Putting them on a ring says so.
const MARKS = [
  { id: 'barn', name: `The red barn`, trueB: 42 },
  { id: 'pine', name: `A lone pine`, trueB: 115 },
  { id: 'mast', name: `The radio mast`, trueB: 198 },
  { id: 'spire', name: `A church spire`, trueB: 287 },
  { id: 'tower', name: `The water tower`, trueB: 335 }
]
const RING = 215

function Take({ target, setTarget, aim, setAim, dial, setDial, labels, setLabels }) {
  const mark = MARKS.find((m) => m.id === target) ?? MARKS[0]
  const needleAt = norm(DECLINATION)

  const aimed = Math.abs(delta(aim, mark.trueB)) <= 2
  const boxed = Math.abs(delta(aim - dial, DECLINATION)) <= 2
  const done = aimed && boxed

  const magnetic = norm(aim - DECLINATION)
  const trueB = norm(magnetic + DECLINATION)

  const place = (m) => [
    EYE.x + Math.sin(rad(m.trueB)) * RING,
    EYE.y - Math.cos(rad(m.trueB)) * RING
  ]

  return (
    <>
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 30, flexWrap: 'wrap', minHeight: 82 }}>
        <div>
          <span className="hw-label">STEP 1 — AIM IT AT THE THING</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 500, marginTop: 4, color: aimed ? GREEN : 'var(--ink-3)' }}>
            {aimed ? `on the ${mark.name.replace(/^(The|A) /, '')}` : `${Math.abs(Math.round(delta(aim, mark.trueB)))}° to go`}
          </div>
        </div>
        <div>
          <span className="hw-label">STEP 2 — BOX THE NEEDLE</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 500, marginTop: 4, color: boxed ? GREEN : 'var(--ink-3)' }}>
            {boxed ? `parked in the shed` : `${Math.abs(Math.round(delta(aim - dial, DECLINATION)))}° out`}
          </div>
        </div>
        <div>
          <span className="hw-label">STEP 3 — READ IT</span>
          <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4, color: done ? 'var(--accent)' : 'var(--faint)' }}>
            {done ? `${brg(magnetic)}° magnetic` : `— not yet —`}
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            {done
              ? `${brg(trueB)}° true, once you ${DECLINATION < 0 ? 'take off' : 'add'} the ${Math.abs(DECLINATION).toFixed(1)}°`
              : `both steps first, or the number means nothing`}
          </div>
        </div>
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <svg viewBox={`0 0 ${W8} ${H8}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={`Looking down on a field with five landmarks around you and a baseplate compass in your hands. ${done ? `The bearing to ${mark.name} is ${brg(magnetic)} degrees magnetic, ${brg(trueB)} degrees true.` : `The compass is not yet both aimed and boxed, so there is no bearing to read.`}`}>
          <rect x="0" y="0" width={W8} height={H8} rx="6" fill="#f3efe4" />

          {/* true north, for reference */}
          <line x1={EYE.x} y1="14" x2={EYE.x} y2={EYE.y} stroke="var(--ink)" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
          <text x={EYE.x + 7} y="24" style={{ fontFamily: 'var(--sans)', fontSize: 11.5, fill: 'var(--muted)' }}>true north</text>

          {MARKS.map((m) => {
            const [x, y] = place(m)
            const lit = m.id === target
            return (
              <g key={m.id}>
                {lit && done && <line x1={EYE.x} y1={EYE.y} x2={x} y2={y} stroke="var(--accent)" strokeWidth="2" strokeDasharray="7 6" />}
                <circle cx={x} cy={y} r={lit ? 11 : 7} fill={lit ? 'var(--accent)' : 'var(--ink)'} opacity={lit ? 1 : 0.55} />
                <text x={x} y={y - 18} textAnchor="middle"
                  style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: lit ? 700 : 500, fill: lit ? 'var(--ink)' : 'var(--ink-3)' }}>
                  <tspan style={{ paintOrder: 'stroke', stroke: '#f3efe4', strokeWidth: 5 }}>{m.name}</tspan>
                </text>
              </g>
            )
          })}

          <g transform={`translate(${EYE.x} ${EYE.y})`}>
            <CompassFace aim={aim} dial={dial} needleAt={needleAt} labels={labels} />
          </g>
        </svg>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)', margin: '6px 0 0', textAlign: 'center' }}>
          They are drawn all the same distance away on purpose. A bearing says which way, and nothing whatever about how far.
        </p>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 13 }}>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="hw-readout-label">TAKE A BEARING TO</span>
          {MARKS.map((m) => (
            <button key={m.id} className="hw-btn" aria-pressed={target === m.id} onClick={() => setTarget(m.id)}
              style={{
                padding: '10px 13px', fontSize: 12.5,
                background: target === m.id ? 'var(--ink)' : 'var(--paper)',
                color: target === m.id ? '#f6f1e7' : 'var(--ink)',
                borderColor: target === m.id ? 'var(--ink)' : 'var(--field)'
              }}>
              {m.name}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <button className="hw-btn" aria-pressed={labels} onClick={() => setLabels((l) => !l)}
            style={{ padding: '10px 14px', fontSize: 12.5, background: labels ? 'var(--accent-wash)' : 'var(--paper)', borderColor: labels ? 'var(--accent)' : 'var(--field)' }}>
            {labels ? 'HIDE THE PART NAMES' : 'NAME THE PARTS'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 215 }}>
            <label htmlFor="hw-aim" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Turn your whole body · the arrow points {brg(aim)}°
            </label>
            <input id="hw-aim" type="range" min="0" max="359" step="1" value={aim}
              onChange={(e) => setAim(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 215 }}>
            <label htmlFor="hw-dial" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Turn the dial · the index line says {brg(dial)}°
            </label>
            <input id="hw-dial" type="range" min="0" max="359" step="1" value={dial}
              onChange={(e) => setDial(Number(e.target.value))}
              style={{ width: '100%', accentColor: GREEN, height: 28 }} />
          </div>
        </div>
      </div>
    </>
  )
}

/* ---- Lesson 9 — following it ------------------------------------------- */

const W9 = 760
const H9 = 560
// Centred, because the walk swings either side of north and a start pinned
// to the left ran the path off the panel at westerly bearings.
const START = { x: W9 / 2, y: H9 - 56 }
const LEG_YD = 220
const LEGS = 8                                  // 8 × 220 yd = one mile
const PX_PER_YD = 0.235                         // 1,760 yd fits the panel

// A fixed wobble, so the lesson can quote what happens. Degrees, one per leg.
const WOBBLE = [3.5, -2.1, 4.4, -1.2, 5.3, -3.6, 2.8, 4.1]
const TRUCK = { leg: 4, swing: 19 }             // a pickup parked beside leg 5

function walk(bearingMag, method, interference) {
  const pts = [{ x: START.x, y: START.y }]
  let heading = bearingMag
  let x = START.x, y = START.y
  for (let i = 0; i < LEGS; i++) {
    let err = method === 'landmark' ? WOBBLE[i] * 0.22 : WOBBLE[i]
    if (interference && i === TRUCK.leg) err += TRUCK.swing
    // Eyes on the needle: you never re-reference, so the error rides along.
    // Eyes on a landmark: each sighting starts again from the bearing.
    heading = method === 'landmark' ? bearingMag + err : heading + err
    const d = LEG_YD * PX_PER_YD
    x += Math.sin(rad(heading)) * d
    y -= Math.cos(rad(heading)) * d
    pts.push({ x, y, heading })
  }
  return pts
}

function Follow({ bearing, setBearing, method, setMethod, truck, setTruck }) {
  const path = useMemo(() => walk(bearing, method, truck), [bearing, method, truck])
  const ideal = useMemo(() => {
    const d = LEGS * LEG_YD * PX_PER_YD
    return { x: START.x + Math.sin(rad(bearing)) * d, y: START.y - Math.cos(rad(bearing)) * d }
  }, [bearing])
  const end = path[path.length - 1]
  const missYd = Math.hypot(end.x - ideal.x, end.y - ideal.y) / PX_PER_YD

  const needleAt = norm(DECLINATION)
  const aim = norm(bearing + DECLINATION)        // holding it on the bearing

  return (
    <>
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 30, flexWrap: 'wrap' }}>
        <div>
          <span className="hw-label">AFTER ONE MILE YOU ARE</span>
          <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4, color: missYd < 60 ? GREEN : missYd < 200 ? 'var(--accent)' : RED }}>
            {Math.round(missYd)} yards off
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            from where that bearing should have put you
          </div>
        </div>
        <div>
          <span className="hw-label">HOW YOU WALKED IT</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 500, marginTop: 4 }}>
            {method === 'landmark' ? `sighting on a landmark` : `watching the needle`}
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            {method === 'landmark'
              ? `every sighting starts the bearing again`
              : `each wobble is added to the last one`}
          </div>
        </div>
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <svg viewBox={`0 0 ${W9} ${H9}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={`A mile of ground walked on a bearing of ${brg(bearing)} magnetic, ${method === 'landmark' ? 'sighting on a landmark each leg' : 'watching the needle the whole way'}${truck ? ', with a parked truck beside the fifth leg' : ''}. You finish ${Math.round(missYd)} yards from where the bearing should have put you.`}>
          <rect x="0" y="0" width={W9} height={H9} rx="6" fill="#f3efe4" />

          {/* where the bearing should have taken you */}
          <line x1={START.x} y1={START.y} x2={ideal.x} y2={ideal.y} stroke="var(--ink)" strokeWidth="2" strokeDasharray="9 7" opacity="0.5" />
          <circle cx={ideal.x} cy={ideal.y} r="9" fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="3 3" />
          {/* beside its marker, not above it: the two endpoints sit close
              together and the two labels were running into each other */}
          <text x={ideal.x - 15} y={ideal.y + 5} textAnchor="end" style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: 'var(--ink-3)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: '#f3efe4', strokeWidth: 5 }}>where you meant to be</tspan>
          </text>

          {/* where you actually went */}
          <path d={`M ${path.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`}
            fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinejoin="round" />
          {path.slice(1, -1).map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={method === 'landmark' ? 5 : 3} fill="var(--accent)" opacity={method === 'landmark' ? 1 : 0.6} />
          ))}
          <circle cx={end.x} cy={end.y} r="9" fill="var(--accent)" />
          <text x={end.x} y={end.y + 26} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, fill: 'var(--accent)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: '#f3efe4', strokeWidth: 5 }}>where you got to</tspan>
          </text>

          {/* the miss */}
          {missYd > 25 && (
            <line x1={end.x} y1={end.y} x2={ideal.x} y2={ideal.y} stroke={RED} strokeWidth="2" />
          )}

          <circle cx={START.x} cy={START.y} r="8" fill="var(--ink)" />
          <text x={START.x} y={START.y + 26} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: 'var(--ink-3)' }}>start</text>

          {truck && (() => {
            const p = path[TRUCK.leg]
            return (
              <g>
                <rect x={p.x + 16} y={p.y - 13} width="44" height="24" rx="4" fill="#6b6155" />
                <rect x={p.x + 24} y={p.y - 21} width="20" height="10" rx="3" fill="#6b6155" />
                <text x={p.x + 68} y={p.y + 4} style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: RED }}>
                  a parked truck — the needle swings {TRUCK.swing}°
                </text>
              </g>
            )
          })()}

          {/* bottom right, where no bearing in range puts the path */}
          <g transform={`translate(${W9 - 110} ${H9 - 120})`}>
            <CompassFace aim={aim} dial={bearing} needleAt={needleAt} r={54} />
          </g>

          <g transform={`translate(28 44)`}>
            <line x1="0" y1="0" x2={220 * PX_PER_YD} y2="0" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1={220 * PX_PER_YD} y1="-6" x2={220 * PX_PER_YD} y2="6" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="0" y="19" style={{ fontFamily: 'var(--sans)', fontSize: 12.5, fill: 'var(--ink-3)' }}>220 yards — one leg</text>
          </g>
        </svg>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 13 }}>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="hw-readout-label">WALK IT BY</span>
          {[['needle', `Watching the needle`], ['landmark', `Sighting on a landmark`]].map(([id, name]) => (
            <button key={id} className="hw-btn" aria-pressed={method === id} onClick={() => setMethod(id)}
              style={{
                padding: '10px 13px', fontSize: 12.5,
                background: method === id ? 'var(--ink)' : 'var(--paper)',
                color: method === id ? '#f6f1e7' : 'var(--ink)',
                borderColor: method === id ? 'var(--ink)' : 'var(--field)'
              }}>
              {name}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <button className="hw-btn" aria-pressed={truck} onClick={() => setTruck((t) => !t)}
            style={{ padding: '10px 14px', fontSize: 12.5, background: truck ? 'var(--accent-wash)' : 'var(--paper)', borderColor: truck ? 'var(--accent)' : 'var(--field)' }}>
            {truck ? 'MOVE THE TRUCK AWAY' : 'PARK A TRUCK ON THE ROUTE'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <label htmlFor="hw-bearing" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            The bearing you are following · {brg(bearing)}° magnetic
          </label>
          <input id="hw-bearing" type="range" min="-35" max="35" step="1" value={bearing > 180 ? bearing - 360 : bearing}
            onChange={(e) => setBearing(norm(Number(e.target.value)))}
            style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
        </div>
      </div>
    </>
  )
}

/* ---- Lesson 10 — back on the map --------------------------------------- */

const W10 = 760
const H10 = 560
const STAND = { x: 196, y: 430, name: `The trail junction` }
const SIGHTS = [
  { id: 'tower', name: `The fire tower`, x: 596, y: 128 },
  { id: 'pond', name: `Beaver Pond`, x: 274, y: 132 },
  { id: 'rock', name: `Hollow Rock`, x: 614, y: 386 }
]
const mapBearing = (s) => norm((Math.atan2(s.x - STAND.x, STAND.y - s.y) * 180) / Math.PI)

/** Mid-sentence, "The fire tower" wants a small t — "Beaver Pond" does not. */
const midSentence = (name) => (name.startsWith('The ') ? `t${name.slice(1)}` : name)

function MapWork({ sight, setSight, plot, setPlot, oriented, setOriented }) {
  const target = SIGHTS.find((s) => s.id === sight) ?? SIGHTS[0]
  const trueB = mapBearing(target)
  const magnetic = norm(trueB - DECLINATION)
  const hit = Math.abs(delta(plot, trueB)) <= 2

  const L = 620
  const ex = STAND.x + Math.sin(rad(plot)) * L
  const ey = STAND.y - Math.cos(rad(plot)) * L

  return (
    <>
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 30, flexWrap: 'wrap' }}>
        <div>
          <span className="hw-label">YOUR COMPASS SAID</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4 }}>{brg(magnetic)}° magnetic</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>sighting on {midSentence(target.name)}</div>
        </div>
        <div>
          <span className="hw-label">SO ON THE MAP, DRAW</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, color: 'var(--accent)', marginTop: 4 }}>{brg(trueB)}° true</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            {brg(magnetic)} {DECLINATION < 0 ? '−' : '+'} {Math.abs(DECLINATION).toFixed(1)} — the map is drawn to true north
          </div>
        </div>
        <div>
          <span className="hw-label">YOUR LINE</span>
          <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4, color: hit ? GREEN : 'var(--ink-3)' }}>
            {hit ? `through ${midSentence(target.name)}` : `${Math.abs(Math.round(delta(plot, trueB)))}° off it`}
          </div>
        </div>
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <svg viewBox={`0 0 ${W10} ${H10}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={`A map sheet with the trail junction marked and three landmarks on it. The compass reads ${brg(magnetic)} magnetic to ${target.name}, which is ${brg(trueB)} true on the map. The drawn line ${hit ? 'passes through it' : `is ${Math.abs(Math.round(delta(plot, trueB)))} degrees off it`}.`}>
          <rect x="0" y="0" width={W10} height={H10} rx="6" fill="#f5efe3" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`v${i}`} x1={70 + i * 150} y1="0" x2={70 + i * 150} y2={H10} stroke="var(--ink)" strokeWidth="0.8" opacity="0.2" />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line key={`h${i}`} x1="0" y1={70 + i * 140} x2={W10} y2={70 + i * 140} stroke="var(--ink)" strokeWidth="0.8" opacity="0.2" />
          ))}

          {/* which way the map's north is, and which way the needle is */}
          {/* top LEFT: in the right-hand corner this group and its note printed
              straight over the fire tower and its label */}
          <g transform={`translate(64 54)`}>
            <line x1="0" y1="30" x2="0" y2="-16" stroke="var(--ink)" strokeWidth="2.5" />
            <path d="M 0 -24 l -7 12 l 14 0 z" fill="var(--ink)" />
            <text x="0" y="48" textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 700, fill: 'var(--ink)' }}>TRUE N</text>
            {oriented && (
              <g transform={`rotate(${DECLINATION})`}>
                <line x1="0" y1="30" x2="0" y2="-16" stroke={RED} strokeWidth="2.5" />
                <path d="M 0 -24 l 7 12 l -7 0 z" fill={RED} />
              </g>
            )}
          </g>
          {oriented && (
            <text x="12" y="118" style={{ fontFamily: 'var(--sans)', fontSize: 12.5, fill: RED }}>
              magnetic north, {Math.abs(DECLINATION).toFixed(1)}° {DECLINATION < 0 ? 'W' : 'E'} of it
            </text>
          )}

          {/* the line you draw */}
          <line x1={STAND.x} y1={STAND.y} x2={ex} y2={ey} stroke={hit ? GREEN : 'var(--accent)'} strokeWidth="2.5" strokeDasharray="8 6" />

          {SIGHTS.map((s) => {
            const lit = s.id === sight
            return (
              <g key={s.id}>
                <circle cx={s.x} cy={s.y} r={lit ? 10 : 7} fill={lit ? 'var(--ink)' : 'var(--ink)'} opacity={lit ? 1 : 0.45} />
                {lit && hit && <circle cx={s.x} cy={s.y} r="20" fill="none" stroke={GREEN} strokeWidth="3" />}
                <text x={s.x} y={s.y - 19} textAnchor="middle"
                  style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: lit ? 700 : 500, fill: 'var(--ink)' }}>
                  <tspan style={{ paintOrder: 'stroke', stroke: '#f5efe3', strokeWidth: 5 }}>{s.name}</tspan>
                </text>
              </g>
            )
          })}

          <path d={`M ${STAND.x - 9} ${STAND.y + 8} L ${STAND.x} ${STAND.y - 9} L ${STAND.x + 9} ${STAND.y + 8} Z`} fill="var(--accent)" />
          <text x={STAND.x} y={STAND.y + 28} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, fill: 'var(--accent)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: '#f5efe3', strokeWidth: 5 }}>you are here</tspan>
          </text>
        </svg>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 13 }}>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="hw-readout-label">SIGHT ON</span>
          {SIGHTS.map((s) => (
            <button key={s.id} className="hw-btn" aria-pressed={sight === s.id} onClick={() => setSight(s.id)}
              style={{
                padding: '10px 13px', fontSize: 12.5,
                background: sight === s.id ? 'var(--ink)' : 'var(--paper)',
                color: sight === s.id ? '#f6f1e7' : 'var(--ink)',
                borderColor: sight === s.id ? 'var(--ink)' : 'var(--field)'
              }}>
              {s.name}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <button className="hw-btn" aria-pressed={oriented} onClick={() => setOriented((o) => !o)}
            style={{ padding: '10px 14px', fontSize: 12.5, background: oriented ? 'var(--accent-wash)' : 'var(--paper)', borderColor: oriented ? 'var(--accent)' : 'var(--field)' }}>
            {oriented ? 'HIDE MAGNETIC NORTH' : 'SHOW BOTH NORTHS'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <label htmlFor="hw-plot" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Swing the line round · {brg(plot)}° true
          </label>
          <input id="hw-plot" type="range" min="0" max="359" step="1" value={plot}
            onChange={(e) => setPlot(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
        </div>
      </div>
    </>
  )
}

/* ---- one instrument, three jobs ---------------------------------------- */

export default function Compass({ mode = 'take' }) {
  const [target, setTarget] = useState('barn')
  const [aim, setAim] = useState(0)
  const [dial, setDial] = useState(0)
  const [labels, setLabels] = useState(false)

  const [bearing, setBearing] = useState(10)
  const [method, setMethod] = useState('needle')
  const [truck, setTruck] = useState(false)

  const [sight, setSight] = useState('tower')
  const [plot, setPlot] = useState(0)
  const [oriented, setOriented] = useState(false)

  return (
    <div className="hw-sim">
      {mode === 'follow'
        ? <Follow bearing={bearing} setBearing={setBearing} method={method} setMethod={setMethod} truck={truck} setTruck={setTruck} />
        : mode === 'map'
          ? <MapWork sight={sight} setSight={setSight} plot={plot} setPlot={setPlot} oriented={oriented} setOriented={setOriented} />
          : <Take target={target} setTarget={setTarget} aim={aim} setAim={setAim} dial={dial} setDial={setDial} labels={labels} setLabels={setLabels} />}
    </div>
  )
}
