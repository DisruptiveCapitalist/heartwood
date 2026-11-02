import { useCallback, useRef, useState } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Navigation, Lesson 2 — zooming out from a backyard to the whole Earth.
//
// The single rule the handoff calls non-negotiable: DRAWN TO TRUE SCALE. The
// bend must be invisible until about the size of a state, because that is the
// whole argument — the ground is not lying to you, it really is flat for the
// patch you can see. Exaggerating the curvature to make it visible would
// destroy the lesson while appearing to illustrate it.
//
// So the vertical scale equals the horizontal scale, always. At 900 px across:
//
//   view        drop            drop on screen
//   100 ft      0.0007 in       0.0005 px   invisible
//   1 mile      2 in            0.03 px     invisible
//   25 miles    104 ft          0.7 px      invisible
//   280 miles   2.5 miles       8 px        just visible — this is the moment
//   1,000 miles 32 miles        28 px
//   2,800 miles 256 miles       82 px       unmistakable
//
// Sag at half-width h on a sphere of radius R is R − √(R² − h²). Zooming eases
// in LOG space so each step feels the same size, which it would not otherwise:
// the last step is 28 times the first.

const R_MI = 3959
const W = 900, H = 320, FLAT_Y = 100

const STOPS = [
  { w: 100 / 5280, label: `Your backyard`, sub: `100 feet`, name: `Your backyard`,
    note: `Thinner than a sheet of paper. Perfectly flat.` },
  { w: 1, label: `A neighborhood`, sub: `1 mile`, name: `A neighborhood`,
    note: `Less than the height of a curb, spread across a mile.` },
  { w: 25, label: `A county`, sub: `25 miles`, name: `A county`,
    note: `A 10-story building — spread across 25 miles. Still looks flat from any hill.` },
  { w: 280, label: `A state`, sub: `about 280 miles`, name: `A state about the size of Pennsylvania`,
    note: `Now the bend is just visible on the screen.` },
  { w: 1000, label: `Half a country`, sub: `1,000 miles`, name: `Half a country`,
    note: `Higher than airliners fly, many times over.` },
  { w: 2800, label: `Coast to coast`, sub: `about 2,800 miles`, name: `Coast to coast`,
    note: `Unmistakably part of a ball.` },
  { w: 0, label: `The whole Earth`, sub: `7,900 miles across`, name: `The whole Earth`,
    note: '', globe: true }
]

/** How far the ground falls below a flat line, over a span this wide. */
const sagFor = (widthMi) => {
  const h = widthMi / 2
  if (h >= R_MI) return R_MI
  return R_MI - Math.sqrt(R_MI * R_MI - h * h)
}

/** The drop, in whatever unit makes it readable. */
function dropText(widthMi) {
  const mi = sagFor(widthMi)
  const inches = mi * 63360
  if (inches < 0.001) return `less than 1/1000 of an inch`
  if (inches < 12) return `about ${inches < 1 ? inches.toFixed(2) : Math.round(inches)} inches`
  const feet = mi * 5280
  if (feet < 5280) return `about ${Math.round(feet)} feet`
  return `about ${mi < 10 ? mi.toFixed(1) : Math.round(mi)} miles`
}

export default function ZoomOut({ active }) {
  const [stop, setStop] = useState(0)
  const [, tick] = useState(0)
  const view = useRef(Math.log(STOPS[0].w))
  const globeFade = useRef(0)

  const target = STOPS[stop]
  const targetLog = target.globe ? Math.log(2800) : Math.log(target.w)

  const step = useCallback((dt) => {
    // Frame-rate independent form of the handoff's "× 0.12 per frame" at 60fps.
    const k = 1 - Math.pow(1 - 0.12, Math.min(3, dt * 60))
    view.current += (targetLog - view.current) * k
    const wantFade = target.globe ? 1 : 0
    globeFade.current += (wantFade - globeFade.current) * k
    tick((n) => (n + 1) % 1000)
  }, [targetLog, target.globe])
  useRafLoop(active, step)

  const widthMi = Math.exp(view.current)
  const pxPerMi = W / widthMi
  const sag = sagFor(widthMi)
  const sagPx = sag * pxPerMi

  // 81 samples, true scale: the vertical drop uses the same px-per-mile as the
  // horizontal span, so nothing here is stretched.
  const ground = []
  for (let i = 0; i <= 80; i++) {
    const t = i / 80
    const x = t * W
    const dMi = Math.abs(t - 0.5) * widthMi
    const dropMi = dMi >= R_MI ? R_MI : R_MI - Math.sqrt(R_MI * R_MI - dMi * dMi)
    ground.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${(FLAT_Y + dropMi * pxPerMi).toFixed(2)}`)
  }

  const fade = globeFade.current
  const G = { cx: W / 2, cy: 160, r: 112 }

  return (
    <div className="hw-sim">
      <div style={{ padding: '16px 22px 0', display: 'flex', gap: 34, flexWrap: 'wrap' }}>
        <div>
          <span className="hw-label">YOU'RE LOOKING AT</span>
          <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 500, lineHeight: 1.2, marginTop: 4 }}>
            {target.name}
          </div>
        </div>
        <div>
          <span className="hw-label">HOW FAR THE GROUND DROPS BELOW A FLAT LINE</span>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 500, color: 'var(--accent)', lineHeight: 1.2, marginTop: 4 }}>
            {target.globe ? '—' : dropText(target.w)}
          </div>
        </div>
      </div>

      <div className="hw-stage" style={{ position: 'relative', background: 'transparent', padding: '12px 22px 0', height: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={target.globe
            ? `A globe showing the axis, both poles, the Equator and a marker at about 40 degrees north.`
            : `The ground across ${target.sub}, drawn to true scale beside a perfectly flat line. It drops ${dropText(target.w)}.`}>

          <g opacity={1 - fade}>
            <line x1="0" y1={FLAT_Y} x2={W} y2={FLAT_Y} stroke="var(--accent)" strokeWidth="2" strokeDasharray="9 7" />
            <text x="12" y={FLAT_Y - 10} style={{ fontFamily: 'var(--sans)', fontSize: 14, fill: 'var(--accent)' }}>a perfectly flat line</text>

            <path d={`${ground.join(' ')} L ${W} ${H} L 0 ${H} Z`} fill="oklch(0.88 0.035 95)" opacity="0.7" />
            <path d={ground.join(' ')} fill="none" stroke="var(--ink)" strokeWidth="2.5" />

            {sagPx > 1.5 && (
              <g>
                <line x1={W - 26} y1={FLAT_Y} x2={W - 26} y2={FLAT_Y + sagPx} stroke="var(--accent)" strokeWidth="4" />
                <line x1={W - 34} y1={FLAT_Y + sagPx} x2={W - 18} y2={FLAT_Y + sagPx} stroke="var(--accent)" strokeWidth="2" />
              </g>
            )}

            <circle cx={W / 2} cy={FLAT_Y} r="5" fill="var(--ink)" />
            <text x={W / 2} y={FLAT_Y - 14} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, fill: 'var(--ink)' }}>You</text>
          </g>

          {fade > 0.01 && (
            <g opacity={fade}>
              <circle cx={G.cx} cy={G.cy} r={G.r} fill="oklch(0.88 0.04 230)" stroke="var(--ink)" strokeWidth="2.5" />
              <line x1={G.cx} y1={G.cy - G.r - 24} x2={G.cx} y2={G.cy + G.r + 24} stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="6 5" />
              <ellipse cx={G.cx} cy={G.cy} rx={G.r} ry="26" fill="none" stroke="var(--ink)" strokeWidth="2" />
              <text x={G.cx + G.r + 10} y={G.cy + 5} style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, fill: 'var(--ink)' }}>Equator</text>
              <text x={G.cx} y={G.cy - G.r - 32} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 14, fill: 'var(--ink-3)' }}>North Pole</text>
              <text x={G.cx} y={G.cy + G.r + 42} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 14, fill: 'var(--ink-3)' }}>South Pole</text>
              <text x={G.cx - G.r - 12} y={G.cy - 44} textAnchor="end" style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: 'var(--ink-3)' }}>Northern Hemisphere</text>
              <text x={G.cx - G.r - 12} y={G.cy + 56} textAnchor="end" style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: 'var(--ink-3)' }}>Southern Hemisphere</text>
              <path d={`M ${G.cx - 40} ${G.cy - G.r - 6} q 40 -16 80 0`} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
              <path d={`M ${G.cx + 40} ${G.cy - G.r - 6} l -10 -5 l 1 11 z`} fill="var(--accent)" />
              <text x={G.cx + 58} y={G.cy - G.r - 14} style={{ fontFamily: 'var(--sans)', fontSize: 13, fill: 'var(--accent)' }}>turns toward the east, once a day</text>
              <circle cx={G.cx + G.r * Math.cos(-0.7)} cy={G.cy - 26 * 2.6} r="6" fill="var(--accent)" />
              <text x={G.cx + G.r * Math.cos(-0.7) + 12} y={G.cy - 26 * 2.6 + 5} style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600, fill: 'var(--accent)' }}>You (about 40° N)</text>
            </g>
          )}
        </svg>

        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)', margin: '6px 0 0', textAlign: 'center' }}>
          Drawn to true scale — nothing exaggerated
        </p>
        {target.note && (
          <p style={{ fontSize: 18, lineHeight: 1.5, margin: '10px 0 0', color: 'var(--ink-2)', textAlign: 'center', textWrap: 'pretty' }}>
            {target.note}
          </p>
        )}
      </div>

      <div className="hw-controls" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8 }}>
        {STOPS.map((s, i) => (
          <button key={s.label} className="hw-btn" aria-pressed={i === stop} onClick={() => setStop(i)}
            style={{
              display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start', minHeight: 46,
              padding: '10px 13px',
              background: i === stop ? 'var(--ink)' : 'var(--paper)',
              color: i === stop ? '#f6f1e7' : 'var(--ink)',
              borderColor: i === stop ? 'var(--ink)' : 'var(--field)'
            }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 600 }}>{s.label}</span>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 11.5, opacity: 0.75 }}>{s.sub}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
