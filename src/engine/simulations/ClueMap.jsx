import { useState } from 'react'

// Navigation, Lesson 1 — the friend lost in the park.
//
// Five clues. Two of them sound helpful and narrow nothing; three of them each
// put her on a shape, and the shapes are intersected live. The lesson is in
// watching "I'm walking north" change absolutely nothing on the map.
//
// The geometry is chosen so the three shapes agree at exactly one point, and
// the handoff says to keep it that way:
//
//   tower (560, 90), oak (400, 270)
//   ray straight down from the tower  ∩  circle r300 about the tower → ONE point
//   circle r300 about the tower       ∩  circle r200 about the oak   → TWO points
//   all three                                                        → (560, 390)
//
// Checked: (560,390) is 300 below the tower, and √(160² + 120²) = 200 from the
// oak. The intersections below are analytic, not sampled, so that stays exact.

const TOWER = { x: 560, y: 90 }
const OAK = { x: 400, y: 270 }
const ACCENT = 'oklch(0.50 0.12 45)'
const BLUE = 'oklch(0.48 0.10 250)'
const GREEN = 'oklch(0.50 0.12 155)'

const SHAPES = {
  ray: { type: 'ray', x: TOWER.x, from: TOWER.y },
  tower: { type: 'circle', cx: TOWER.x, cy: TOWER.y, r: 300 },
  oak: { type: 'circle', cx: OAK.x, cy: OAK.y, r: 200 }
}

const CLUES = [
  { id: 'walk', quote: `"I'm walking north."`, effect: `Which way she's going. Says nothing about where she is.` },
  { id: 'see', quote: `"I can see the water tower."`, effect: `It's visible from almost the whole park. Still nothing.` },
  { id: 'ray', quote: `"The water tower is straight north of me."`, effect: `A direction from something you both know. Now she's on a line.`, shape: 'ray' },
  { id: 'tower', quote: `"I'm about 300 steps from the water tower."`, effect: `A distance from a known point. Now she's on a circle.`, shape: 'tower' },
  { id: 'oak', quote: `"The old oak is about 200 steps away."`, effect: `A second reference point. A second circle.`, shape: 'oak' }
]

const on = (shape, p, tol = 0.6) => {
  if (shape.type === 'ray') return Math.abs(p.x - shape.x) <= tol && p.y >= shape.from - tol
  return Math.abs(Math.hypot(p.x - shape.cx, p.y - shape.cy) - shape.r) <= tol
}

/** Where a vertical ray meets a circle: 0, 1 or 2 points, those below the start. */
function rayCircle(ray, c) {
  const dx = ray.x - c.cx
  const under = c.r * c.r - dx * dx
  if (under < 0) return []
  const dy = Math.sqrt(under)
  return [c.cy - dy, c.cy + dy]
    .filter((y) => y >= ray.from)
    .map((y) => ({ x: ray.x, y }))
}

/** Where two circles meet: 0, 1 or 2 points. */
function circleCircle(a, b) {
  const dx = b.cx - a.cx
  const dy = b.cy - a.cy
  const d = Math.hypot(dx, dy)
  if (d === 0 || d > a.r + b.r || d < Math.abs(a.r - b.r)) return []
  const t = (a.r * a.r - b.r * b.r + d * d) / (2 * d)
  const h2 = a.r * a.r - t * t
  if (h2 < 0) return []
  const h = Math.sqrt(h2)
  const mx = a.cx + (t * dx) / d
  const my = a.cy + (t * dy) / d
  if (h === 0) return [{ x: mx, y: my }]
  return [
    { x: mx + (h * dy) / d, y: my - (h * dx) / d },
    { x: mx - (h * dy) / d, y: my + (h * dx) / d }
  ]
}

/** Every point that lies on ALL the active shapes. */
function fix(shapes) {
  if (shapes.length < 2) return []
  const candidates = []
  for (let i = 0; i < shapes.length; i++) {
    for (let j = i + 1; j < shapes.length; j++) {
      const a = shapes[i], b = shapes[j]
      if (a.type === 'ray' && b.type === 'circle') candidates.push(...rayCircle(a, b))
      else if (a.type === 'circle' && b.type === 'ray') candidates.push(...rayCircle(b, a))
      else if (a.type === 'circle' && b.type === 'circle') candidates.push(...circleCircle(a, b))
    }
  }
  const kept = candidates.filter((p) => shapes.every((s) => on(s, p)))
  // Two shapes can produce the same crossing twice; collapse duplicates.
  return kept.filter((p, i) => kept.findIndex((q) => Math.hypot(p.x - q.x, p.y - q.y) < 1.5) === i)
}

export default function ClueMap() {
  const [active, setActive] = useState({})

  const chosen = CLUES.filter((c) => active[c.id])
  const shapes = chosen.filter((c) => c.shape).map((c) => SHAPES[c.shape])
  const points = fix(shapes)

  let status, note, tone = 'var(--ink)'
  if (shapes.length === 0) {
    status = `Anywhere in the park`
    note = chosen.length
      ? `Those clues sound helpful. Look at the map — they didn't narrow anything.`
      : `Turn on a clue and watch what it does.`
  } else if (shapes.length === 1) {
    status = shapes[0].type === 'ray' ? `Anywhere along this line` : `Anywhere on this circle`
    note = `One good clue gives you a shape, not a place.`
  } else if (points.length === 0) {
    status = `Nowhere`
    note = `These clues disagree. Turn one off.`
    tone = 'var(--brake)'
  } else if (points.length === 1) {
    status = `One place. Found her.`
    note = `Clues that each meant little on their own, crossing at one spot.`
    tone = GREEN
  } else {
    status = `Two places`
    note = `Two shapes can cross twice — so two clues may not be enough.`
  }

  return (
    <div className="hw-sim">
      <div style={{ padding: '16px 22px 0' }}>
        <span className="hw-label">WHERE SHE COULD BE</span>
        <div aria-live="polite" style={{ fontFamily: 'var(--sans)', fontSize: 30, fontWeight: 500, color: tone, lineHeight: 1.2, marginTop: 4 }}>
          {status}
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{note}</div>
      </div>

      <div className="hw-stage" style={{ position: 'relative', background: 'transparent', padding: '14px 22px 0', height: 'auto' }}>
        <svg viewBox="0 0 900 520" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img" aria-label={`A park map with a water tower and an old oak. ${chosen.length} clues are on. ${status}. ${note}`}>
          <rect x="0" y="0" width="900" height="520" rx="6" fill="#f4eee2" />
          {shapes.length === 0 && chosen.length > 0 && (
            <rect x="0" y="0" width="900" height="520" rx="6" fill={ACCENT} opacity="0.07" />
          )}

          <path d="M 0 400 C 200 380 320 430 480 420 S 780 380 900 400" fill="none" stroke="#e6dac4" strokeWidth="26" />
          <path d="M 170 0 C 200 160 150 300 190 520" fill="none" stroke="#e6dac4" strokeWidth="22" />
          <ellipse cx="250" cy="150" rx="105" ry="62" fill="oklch(0.90 0.035 230)" />
          {[[700, 300, 42], [762, 262, 34], [742, 344, 30], [806, 316, 26]].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="oklch(0.86 0.05 145)" />
          ))}

          <text x="258" y="156" textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 15, fill: '#6b6155' }}>Pond</text>
          <text x="752" y="310" textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 15, fill: '#4a6b50' }}>Woods</text>

          {/* the shapes each clue draws */}
          {active.ray && <line x1={TOWER.x} y1={TOWER.y} x2={TOWER.x} y2="520" stroke={ACCENT} strokeWidth="5" />}
          {active.tower && <circle cx={TOWER.x} cy={TOWER.y} r="300" fill="none" stroke={ACCENT} strokeWidth="3" strokeDasharray="12 8" />}
          {active.oak && <circle cx={OAK.x} cy={OAK.y} r="200" fill="none" stroke={BLUE} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />}

          {/* the two reference points */}
          <circle cx={TOWER.x} cy={TOWER.y} r="15" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
          <circle cx={TOWER.x} cy={TOWER.y} r="5" fill="var(--ink)" />
          <text x={TOWER.x} y={TOWER.y - 26} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600, fill: 'var(--ink)' }}>Water tower</text>

          <circle cx={OAK.x} cy={OAK.y} r="16" fill="oklch(0.62 0.10 145)" />
          <text x={OAK.x} y={OAK.y + 38} textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600, fill: 'var(--ink)' }}>Old oak</text>

          {/* where she could be */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="11" fill={points.length === 1 ? GREEN : 'var(--ink)'} stroke="var(--paper)" strokeWidth="3" />
              {points.length === 1 && (
                <text x={p.x + 20} y={p.y + 6} style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600, fill: GREEN }}>She's here</text>
              )}
            </g>
          ))}

          {/* north arrow and scale */}
          <g transform="translate(846 44)">
            <line x1="0" y1="26" x2="0" y2="-14" stroke="var(--ink)" strokeWidth="2.5" />
            <path d="M 0 -22 l -7 12 l 14 0 z" fill="var(--ink)" />
            <text x="0" y="44" textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 700, fill: 'var(--ink)' }}>N</text>
          </g>
          <g transform="translate(40 474)">
            <line x1="0" y1="0" x2="100" y2="0" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="var(--ink)" strokeWidth="2.5" />
            <line x1="100" y1="-6" x2="100" y2="6" stroke="var(--ink)" strokeWidth="2.5" />
            <text x="50" y="22" textAnchor="middle" style={{ fontFamily: 'var(--sans)', fontSize: 14, fill: 'var(--ink-3)' }}>100 steps</text>
          </g>
        </svg>
      </div>

      <div className="hw-controls" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10, alignItems: 'stretch' }}>
        {CLUES.map((c) => {
          const lit = !!active[c.id]
          return (
            <button key={c.id} className="hw-btn" aria-pressed={lit}
              onClick={() => setActive((a) => ({ ...a, [c.id]: !a[c.id] }))}
              style={{
                display: 'flex', flexDirection: 'column', gap: 7, alignItems: 'flex-start',
                textAlign: 'left', padding: '13px 15px', minHeight: 46,
                background: lit ? 'var(--accent-wash)' : 'var(--paper)',
                borderColor: lit ? 'var(--accent)' : 'var(--field)'
              }}>
              <span style={{ fontSize: 17, lineHeight: 1.4, fontStyle: 'italic' }}>{c.quote}</span>
              {lit && (
                <span style={{ fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.45, color: 'var(--muted)' }}>{c.effect}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
