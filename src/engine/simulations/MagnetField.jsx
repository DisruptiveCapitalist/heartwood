import { useMemo, useState } from 'react'

// Navigation, Lesson 6 — what is magnetism, and why does a needle point?
//
// Two tabs, one field-tracing routine. Everything drawn and every number read
// out comes from the same field function, so the needle cannot disagree with
// the lines around it.
//
// A BAR MAGNET is modelled as two point poles a fixed distance apart — the
// classic picture, and the right one near a real magnet. THE EARTH is modelled
// as a single point dipole at the centre, which is the standard first
// approximation and the one that gives the textbook relation exactly:
//
//     tan(dip) = 2 × tan(magnetic latitude)
//       0° at the magnetic equator · 67° at magnetic latitude 49° · 90° at the pole
//
// The dipole axis is tilted 9.21° from the axis of rotation (NOAA NCEI,
// WMM2025 at 2025.0), and the end of that magnet lying under the Arctic is its
// SOUTH pole — which is why the north end of a compass needle is pulled there.
//
// This model is good for the shape of the field and poor at predicting the
// local angle: see Lesson 7, where the real numbers come from a published
// model rather than from this picture.

const W = 760
const H = 470
const BLUE = 'oklch(0.48 0.10 250)'
const RED = 'oklch(0.46 0.15 25)'

const rad = (d) => (d * Math.PI) / 180
const deg = (r) => (r * 180) / Math.PI

/* ---- the two fields ---------------------------------------------------- */

const BAR = { x: W / 2, y: H / 2, len: 128, w: 46 }
const POLES = [
  { x: BAR.x, y: BAR.y - BAR.len / 2, q: +1 },   // north end
  { x: BAR.x, y: BAR.y + BAR.len / 2, q: -1 }
]

/** Field of the bar magnet, as two point poles. */
function barField(x, y) {
  let bx = 0, by = 0
  for (const p of POLES) {
    const dx = x - p.x, dy = y - p.y
    const r = Math.max(9, Math.hypot(dx, dy))
    const k = p.q / (r * r * r)
    bx += k * dx
    by += k * dy
  }
  return [bx, by]
}

const EARTH = { x: W / 2, y: H / 2, r: 150 }
const TILT = 9.21                      // degrees, NOAA WMM2025

/** Field of a point dipole at the Earth's centre, tilted from the spin axis. */
function earthField(x, y) {
  const dx = x - EARTH.x, dy = y - EARTH.y
  const r = Math.max(14, Math.hypot(dx, dy))
  // A magnet's moment points from its OWN south pole to its OWN north pole. The
  // south pole is the end under the Arctic — drawn at the top of the page — so
  // the moment points DOWN the page. Getting this backwards flips the sign of
  // the dip and has the needle leaning the wrong way, while the field lines,
  // which are drawn undirected, look exactly the same. It cost one check
  // against tan(dip) = 2 tan(latitude) to catch.
  const mx = -Math.sin(rad(TILT)), my = Math.cos(rad(TILT))
  const dot = (mx * dx + my * dy) / r
  return [
    (3 * dot * (dx / r) - mx) / (r * r * r),
    (3 * dot * (dy / r) - my) / (r * r * r)
  ]
}

/** One field line, traced both ways from a seed point. */
function trace(field, sx, sy, step, steps, inside) {
  const go = (dir) => {
    let x = sx, y = sy
    const pts = [[x, y]]
    for (let i = 0; i < steps; i++) {
      const [bx, by] = field(x, y)
      const m = Math.hypot(bx, by)
      if (m < 1e-12) break
      x += (dir * step * bx) / m
      y += (dir * step * by) / m
      if (x < -60 || x > W + 60 || y < -60 || y > H + 60) break
      if (inside && inside(x, y)) break
      pts.push([x, y])
    }
    return pts
  }
  const back = go(-1).reverse()
  return [...back, ...go(1).slice(1)]
}

const toPath = (pts) =>
  pts.length < 2 ? '' : `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')}`

/* ---- the scenes -------------------------------------------------------- */

const BAR_SPOTS = [
  { id: 'above', name: `Straight above it`, x: BAR.x, y: BAR.y - 150 },
  { id: 'side', name: `Off to the side`, x: BAR.x + 190, y: BAR.y },
  { id: 'corner', name: `Up at the corner`, x: BAR.x + 150, y: BAR.y - 120 },
  { id: 'below', name: `Underneath`, x: BAR.x, y: BAR.y + 150 }
]

function Bar({ spot, setSpot, lines, setLines, flipped, setFlipped }) {
  const field = useMemo(() => (flipped
    ? (x, y) => { const [bx, by] = barField(x, y); return [-bx, -by] }
    : barField), [flipped])

  const paths = useMemo(() => {
    const out = []
    for (let i = 0; i < 9; i++) {
      const a = rad(-80 + i * 20)
      const sx = POLES[0].x + 16 * Math.sin(a)
      const sy = POLES[0].y - 16 * Math.cos(a)
      out.push(trace(field, sx, sy, 4, 420))
    }
    return out.map(toPath)
  }, [field])

  const here = BAR_SPOTS.find((s) => s.id === spot) ?? BAR_SPOTS[0]
  const [bx, by] = field(here.x, here.y)
  const needle = deg(Math.atan2(by, bx)) + 90      // 0 = up the page
  const strength = Math.hypot(bx, by)
  // Reported against the strength straight off the end, so it is a ratio the
  // reader can check rather than a number in invented units.
  const refPt = field(BAR.x, BAR.y - 150)
  const relative = strength / Math.hypot(refPt[0], refPt[1])

  return (
    <>
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 34, flexWrap: 'wrap' }}>
        <div>
          <span className="hw-label">THE NEEDLE POINTS</span>
          <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4 }}>
            {((Math.round(needle) % 360 + 360) % 360)}° on the page
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            straight along the line it is sitting on
          </div>
        </div>
        <div>
          <span className="hw-label">HOW STRONG THE PULL IS THERE</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, color: 'var(--accent)', marginTop: 4 }}>
            {relative >= 1 ? `×${relative.toFixed(2)}` : `×${relative.toFixed(2)}`}
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            against the spot straight off the north end
          </div>
        </div>
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={`A bar magnet with its field drawn as lines. A small compass needle sits ${here.name.toLowerCase()} and points along the line it is on, at ${Math.round(needle)} degrees measured on the page.`}>
          <rect x="0" y="0" width={W} height={H} rx="6" fill="var(--paper-alt)" />

          {lines && paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="var(--ink)" strokeWidth="1.1" opacity="0.35" />
          ))}

          <rect x={BAR.x - BAR.w / 2} y={BAR.y - BAR.len / 2} width={BAR.w} height={BAR.len / 2}
            fill={flipped ? BLUE : RED} />
          <rect x={BAR.x - BAR.w / 2} y={BAR.y} width={BAR.w} height={BAR.len / 2}
            fill={flipped ? RED : BLUE} />
          <rect x={BAR.x - BAR.w / 2} y={BAR.y - BAR.len / 2} width={BAR.w} height={BAR.len}
            fill="none" stroke="var(--ink)" strokeWidth="1.5" rx="3" />
          <text x={BAR.x} y={BAR.y - BAR.len / 2 + 26} textAnchor="middle"
            style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 700, fill: '#fff' }}>
            {flipped ? 'S' : 'N'}
          </text>
          <text x={BAR.x} y={BAR.y + BAR.len / 2 - 11} textAnchor="middle"
            style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 700, fill: '#fff' }}>
            {flipped ? 'N' : 'S'}
          </text>

          {/* the little compass, drawn where it sits and turned to the field */}
          <g transform={`translate(${here.x} ${here.y}) rotate(${needle})`}>
            <circle cx="0" cy="0" r="26" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <path d="M 0 -20 L 6 0 L 0 7 L -6 0 Z" fill={RED} />
            <path d="M 0 20 L 6 0 L 0 -7 L -6 0 Z" fill="var(--ink)" opacity="0.75" />
            <circle cx="0" cy="0" r="2.5" fill="var(--paper)" />
          </g>
          <text x={here.x} y={here.y + 44} textAnchor="middle"
            style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: 'var(--muted)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: 'var(--paper-alt)', strokeWidth: 5 }}>a compass here</tspan>
          </text>
        </svg>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 11 }}>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="hw-readout-label">PUT THE COMPASS</span>
          {BAR_SPOTS.map((s) => (
            <button key={s.id} className="hw-btn" aria-pressed={spot === s.id} onClick={() => setSpot(s.id)}
              style={{
                padding: '10px 13px', fontSize: 12.5,
                background: spot === s.id ? 'var(--accent-wash)' : 'var(--paper)',
                borderColor: spot === s.id ? 'var(--accent)' : 'var(--field)'
              }}>
              {s.name}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <button className="hw-btn" aria-pressed={lines} onClick={() => setLines((l) => !l)}
            style={{ padding: '10px 14px', fontSize: 12.5, background: lines ? 'var(--accent-wash)' : 'var(--paper)', borderColor: lines ? 'var(--accent)' : 'var(--field)' }}>
            {lines ? 'HIDE THE FIELD' : 'SHOW THE FIELD'}
          </button>
          <button className="hw-btn" onClick={() => setFlipped((f) => !f)} style={{ padding: '10px 14px', fontSize: 12.5 }}>
            TURN THE MAGNET ROUND
          </button>
        </div>
        <p style={{ fontSize: 17.5, lineHeight: 1.5, margin: 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>
          The needle never points <em>at</em> the magnet. It lies down along whichever line passes through
          where it is sitting — which is what &ldquo;a field&rdquo; means: every spot in the room has a direction attached to it.
        </p>
      </div>
    </>
  )
}

const EARTH_SPOTS = [
  { id: 'eq', name: `The magnetic equator`, mlat: 0 },
  { id: 'mid', name: `Ohio`, mlat: 49 },
  { id: 'north', name: `Northern Alaska`, mlat: 62 },
  { id: 'pole', name: `The pole`, mlat: 88 }
]

function Earth({ spot, setSpot, lines, setLines }) {
  const paths = useMemo(() => {
    // A dipole's field line through a point on the magnetic equator reaches its
    // furthest at that point, so seeding there, just outside the surface and
    // then further out, draws the nested arcs of the textbook picture — and
    // keeps lines where the lesson needs them, hugging the ground.
    const out = []
    const eqx = Math.cos(rad(TILT)), eqy = Math.sin(rad(TILT))
    for (const f of [1.06, 1.3, 1.7, 2.3, 3.1]) {
      for (const side of [1, -1]) {
        out.push(trace(earthField,
          EARTH.x + side * f * EARTH.r * eqx,
          EARTH.y + side * f * EARTH.r * eqy,
          4, 700,
          (x, y) => Math.hypot(x - EARTH.x, y - EARTH.y) < EARTH.r * 0.98))
      }
    }
    return out.map(toPath)
  }, [])

  const here = EARTH_SPOTS.find((s) => s.id === spot) ?? EARTH_SPOTS[1]
  // Where that magnetic latitude sits on the drawn globe, measured from the
  // tilted axis rather than the spin axis — so the marker lands on the field.
  const a = rad(90 - here.mlat) + rad(TILT)
  const px = EARTH.x + EARTH.r * Math.sin(a)
  const py = EARTH.y - EARTH.r * Math.cos(a)
  const [bx, by] = earthField(px, py)

  // The dip is the angle between the field and the local horizontal.
  const upx = (px - EARTH.x) / EARTH.r, upy = (py - EARTH.y) / EARTH.r
  const down = -(bx * upx + by * upy)
  const along = Math.hypot(bx, by) ** 2 - down * down
  const dip = deg(Math.atan2(down, Math.sqrt(Math.max(0, along))))
  const needle = deg(Math.atan2(by, bx)) + 90

  return (
    <>
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 34, flexWrap: 'wrap' }}>
        <div>
          <span className="hw-label">HOW FAR THE FIELD DIVES, THERE</span>
          <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, color: 'var(--accent)', marginTop: 4 }}>
            {Math.round(dip)}° below level
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            magnetic latitude {here.mlat}° · tan(dip) = 2 × tan(latitude)
          </div>
        </div>
        <div>
          <span className="hw-label">WHAT A FLAT COMPASS CAN USE</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 23, fontWeight: 500, marginTop: 4 }}>
            {Math.round(Math.cos(rad(dip)) * 100)}% of the pull
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            the rest of it is pulling straight down
          </div>
        </div>
      </div>

      <div className="hw-stage" style={{ background: 'transparent', padding: '10px 22px 0', height: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={`The Earth with a bar magnet inside it, tilted ${TILT} degrees from the axis it spins on. At magnetic latitude ${here.mlat} degrees the field dives ${Math.round(dip)} degrees below level.`}>
          <rect x="0" y="0" width={W} height={H} rx="6" fill="var(--paper-alt)" />

          {lines && paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="var(--ink)" strokeWidth="1.1" opacity="0.3" />
          ))}

          <circle cx={EARTH.x} cy={EARTH.y} r={EARTH.r} fill="oklch(0.90 0.035 230)" stroke="var(--ink)" strokeWidth="1.5" />

          {/* the axis it spins on */}
          <line x1={EARTH.x} y1={EARTH.y - EARTH.r - 34} x2={EARTH.x} y2={EARTH.y + EARTH.r + 34}
            stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="7 6" />
          {/* to the left of the axis: the marker for "the pole" sits just to the
              right of it, and the two labels were printing over each other */}
          <text x={EARTH.x - 12} y={EARTH.y - EARTH.r - 22} textAnchor="end"
            style={{ fontFamily: 'var(--sans)', fontSize: 12, fill: 'var(--muted)' }}>
            the axis it spins on — true north
          </text>

          {/* the magnet inside, tilted */}
          <g transform={`translate(${EARTH.x} ${EARTH.y}) rotate(${TILT})`}>
            <rect x={-19} y={-EARTH.r * 0.62} width={38} height={EARTH.r * 0.62} fill={BLUE} opacity="0.92" />
            <rect x={-19} y={0} width={38} height={EARTH.r * 0.62} fill={RED} opacity="0.92" />
            <rect x={-19} y={-EARTH.r * 0.62} width={38} height={EARTH.r * 1.24} fill="none" stroke="var(--ink)" strokeWidth="1.5" rx="3" />
            <text x="0" y={-EARTH.r * 0.62 + 24} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 17, fontWeight: 700, fill: '#fff' }}>S</text>
            <text x="0" y={EARTH.r * 0.62 - 10} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 17, fontWeight: 700, fill: '#fff' }}>N</text>
          </g>

          <line x1={EARTH.x - EARTH.r} y1={EARTH.y} x2={EARTH.x + EARTH.r} y2={EARTH.y}
            stroke="var(--ink)" strokeWidth="1" opacity="0.45" />

          {/* the compass, lying flat on the ground and tipping with the field */}
          <g transform={`translate(${px} ${py})`}>
            <line x1={-26 * upy} y1={26 * upx} x2={26 * upy} y2={-26 * upx} stroke="var(--ink)" strokeWidth="2" />
            <g transform={`rotate(${needle})`}>
              <path d="M 0 -24 L 6 0 L 0 7 L -6 0 Z" fill={RED} />
              <path d="M 0 24 L 6 0 L 0 -7 L -6 0 Z" fill="var(--ink)" opacity="0.75" />
            </g>
            <circle cx="0" cy="0" r="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
          </g>
          <text x={px + 34 * upx} y={py + 34 * upy + 4} textAnchor={upx < 0 ? 'end' : 'start'}
            style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: 'var(--ink-2)' }}>
            <tspan style={{ paintOrder: 'stroke', stroke: 'var(--paper-alt)', strokeWidth: 5 }}>{here.name}</tspan>
          </text>

          <text x={22} y={H - 20} style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: 'var(--muted)' }}>
            The end of the magnet under the Arctic is its <tspan style={{ fontWeight: 700 }}>south</tspan> pole. That is what the north end of a needle is chasing.
          </text>
        </svg>
      </div>

      <div className="hw-controls" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 11 }}>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="hw-readout-label">STAND AT</span>
          {EARTH_SPOTS.map((s) => (
            <button key={s.id} className="hw-btn" aria-pressed={spot === s.id} onClick={() => setSpot(s.id)}
              style={{
                padding: '10px 13px', fontSize: 12.5,
                background: spot === s.id ? 'var(--accent-wash)' : 'var(--paper)',
                borderColor: spot === s.id ? 'var(--accent)' : 'var(--field)'
              }}>
              {s.name}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <button className="hw-btn" aria-pressed={lines} onClick={() => setLines((l) => !l)}
            style={{ padding: '10px 14px', fontSize: 12.5, background: lines ? 'var(--accent-wash)' : 'var(--paper)', borderColor: lines ? 'var(--accent)' : 'var(--field)' }}>
            {lines ? 'HIDE THE FIELD' : 'SHOW THE FIELD'}
          </button>
        </div>
        <p style={{ fontSize: 17.5, lineHeight: 1.5, margin: 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>
          This is the simple picture — one bar magnet at the centre. It gets the <em>shape</em> right and the
          local angle wrong, which is tomorrow&rsquo;s whole lesson.
        </p>
      </div>
    </>
  )
}

/* ---- the two halves ---------------------------------------------------- */

const TABS = [
  { id: 'bar', label: `A magnet on the table` },
  { id: 'earth', label: `The Earth itself` }
]

export default function MagnetField() {
  const [tab, setTab] = useState('bar')
  const [barSpot, setBarSpot] = useState('above')
  const [earthSpot, setEarthSpot] = useState('mid')
  const [lines, setLines] = useState(true)
  const [flipped, setFlipped] = useState(false)

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
      {tab === 'bar'
        ? <Bar spot={barSpot} setSpot={setBarSpot} lines={lines} setLines={setLines} flipped={flipped} setFlipped={setFlipped} />
        : <Earth spot={earthSpot} setSpot={setEarthSpot} lines={lines} setLines={setLines} />}
    </div>
  )
}
