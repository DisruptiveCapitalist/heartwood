import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Anatomy & Physiology, Week 3. One bone, two questions.
//
//   remodel  (Lesson 11) it is alive, and it is being rebuilt while you read
//   material (Lesson 12) it is two materials, and neither works alone
//
// The remodelling rates are deliberately asymmetric because the real ones are:
// unloaded bone is lost at well over a percent a month — the figure from bed
// rest and from spaceflight — while loading adds it back at a small fraction of
// that speed. Losing fast and gaining slowly is the single most useful fact
// about bone, and a symmetric model would quietly teach the opposite.
//
// The material mode peaks in toughness near 62% mineral, which is roughly what
// bone actually is. That is not a coincidence arranged for the lesson; it is
// the finding, and the learner can go looking for the best point themselves.

const REAL_MINERAL = 65          // per cent by weight, near enough
const MONTHS_PER_SEC = 1

export default function Bone({ active, mode = 'remodel' }) {
  const [load, setLoad] = useState(1)
  const [mineral, setMineral] = useState(REAL_MINERAL)
  const [ui, setUi] = useState({ months: 0, density: 100 })

  const sim = useRef({ months: 0, density: 100, acc: 0 })
  const live = useRef({})
  live.current = { load }

  const step = useCallback((dt) => {
    const s = sim.current
    const l = live.current.load
    s.months += dt * MONTHS_PER_SEC
    // Lose fast when unloaded; gain slowly when worked. Both per month.
    const rate = l < 1 ? -(1 - l) * 1.5 : (l - 1) * 0.25
    s.density = Math.max(45, Math.min(118, s.density + rate * dt * MONTHS_PER_SEC))
    s.acc += dt
    if (s.acc >= 1 / 12) { s.acc = 0; setUi({ months: s.months, density: s.density }) }
  }, [])
  useRafLoop(active && mode === 'remodel', step)

  const reset = () => { sim.current.months = 0; sim.current.density = 100; setUi({ months: 0, density: 100 }) }

  // --- Lesson 12's two materials -------------------------------------------
  const stiffness = mineral / REAL_MINERAL
  const brittle = Math.max(0, (mineral - 70) / 30)
  const bend = 1 / Math.max(0.15, stiffness)
  const verdict = bend > 2.5 ? 'Folds' : brittle > 0.6 ? 'Shatters' : 'Holds'
  const toughness = Math.exp(-(((mineral - 62) / 26) ** 2))

  const density = ui.density
  const losing = load < 1
  const label = load < 0.35 ? 'Bed rest' : load < 0.9 ? 'Sitting most of the day' : load < 1.4 ? 'Ordinary days on your feet' : 'Carrying and loading it'

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{mode === 'remodel' ? 'Bone left' : 'Under a load'}</span>
          <span className="hw-readout-num" style={{ color: mode === 'remodel' ? (density < 88 ? 'oklch(0.52 0.15 40)' : 'var(--accent)') : (verdict === 'Holds' ? 'var(--accent)' : 'oklch(0.52 0.15 40)') }}>
            {mode === 'remodel' ? `${density.toFixed(1)}%` : verdict}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 236, minHeight: 48, marginTop: 4 }}>
            {mode === 'remodel'
              ? (losing
                ? 'Nothing is pulling on it, so the cells that remove bone are winning. This is what happens in a cast, in a hospital bed, and in orbit.'
                : load > 1.1
                  ? 'Being worked. It is building — but look at the clock, because building is far slower than losing.'
                  : 'Ordinary use. Removal and rebuilding are running at about the same rate, which is what "staying the same" actually is.')
              : (verdict === 'Folds'
                ? 'Too little mineral. It bends and keeps bending — this is a bone soaked in vinegar, and you can tie it in a knot.'
                : verdict === 'Shatters'
                  ? 'Too much mineral and nothing to hold it together. Stiff, and it goes like a piece of chalk.'
                  : 'Both together. Stiff enough to stand on, and with enough give to take a knock without breaking.')}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'remodel' ? <>
            <Stat label="Time passed" value={ui.months.toFixed(0)} u="months" foot="one second here is one month" />
            <Stat label="Changing by" value={`${load < 1 ? '' : '+'}${(load < 1 ? -(1 - load) * 1.5 : (load - 1) * 0.25).toFixed(2)}`} u="% a month"
              accent foot={losing ? 'and loss is the fast direction' : 'gains come slowly'} />
            <Stat label="Replaced completely" value="~10" u="years" foot="whether you notice or not" />
          </> : <>
            <Stat label="Mineral" value={mineral} u="%" foot={`real bone is about ${REAL_MINERAL}%`} />
            <Stat label="Stiffness" value={stiffness.toFixed(2)} u="×" foot="against real bone" />
            <Stat label="Resistance to breaking" value={toughness.toFixed(2)} u="×" accent
              foot={toughness > 0.95 ? 'about as good as it gets' : 'worse than real bone'} />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 272, background: 'var(--paper)' }}
        role="img"
        aria-label={mode === 'remodel'
          ? `A cut-through bone whose inner struts thin or thicken. Density is ${density.toFixed(0)} per cent of where it started.`
          : `A bone under load, bending or breaking depending on how much mineral it contains.`}>
        <svg viewBox="0 0 560 240" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 224 }}>
          {mode === 'remodel' ? <RemodelScene density={density} losing={losing} working={load > 1.1} />
            : <MaterialScene mineral={mineral} bend={bend} verdict={verdict} />}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {mode === 'remodel'
            ? 'A teaching model with the clock sped up enormously. Real rates vary a great deal with age, hormones, nutrition and health.'
            : 'The two kitchen demonstrations are real: vinegar dissolves the mineral away, and baking burns the collagen out.'}
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'remodel' ? <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 250 }}>
            <label htmlFor="hw-load" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              How much it's being used · {label}
            </label>
            <input id="hw-load" type="range" min="0" max="2" step="0.1"
              value={load} onChange={(e) => setLoad(Number(e.target.value))}
              style={{ width: 250, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <button className="hw-btn" onClick={reset}>BACK TO THE START</button>
        </> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 260 }}>
            <label htmlFor="hw-min" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              How much of it is mineral · {mineral}%
            </label>
            <input id="hw-min" type="range" min="0" max="100" step="5"
              value={mineral} onChange={(e) => setMineral(Number(e.target.value))}
              style={{ width: 260, accentColor: 'var(--accent)', height: 28 }} />
          </div>
        )}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 240, textAlign: 'right' }}>
          {mode === 'remodel' ? 'Take the load off and watch the clock, not the bar.' : 'Find the best point yourself, then read what real bone is.'}
        </span>
      </div>
    </div>
  )
}

function Stat({ label, value, u, foot, accent }) {
  return (
    <div>
      <div className="hw-readout-label">{label}</div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: accent ? 'var(--accent)' : undefined }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> {u}</span>
      </div>
      {foot && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{foot}</div>}
    </div>
  )
}

/** Lesson 11 — a cut-through bone, thinning or thickening. */
function RemodelScene({ density, losing, working }) {
  const t = Math.max(0.2, Math.min(1.25, density / 100))
  return <g>
    <rect x="120" y="54" width="320" height="120" rx="58" fill="oklch(0.95 0.025 85)" stroke="oklch(0.46 0.08 85)" strokeWidth={5 + t * 5} />
    <rect x="152" y="74" width="256" height="80" rx="38" fill="oklch(0.90 0.05 30)" opacity="0.35" />
    {Array.from({ length: 26 }, (_, i) => {
      const x = 162 + (i % 13) * 19
      const y = 88 + Math.floor(i / 13) * 34
      return <g key={i}>
        <line x1={x} y1={y} x2={x + 16} y2={y + 26} stroke="oklch(0.62 0.06 85)" strokeWidth={0.8 + t * 3} strokeLinecap="round" />
        <line x1={x + 16} y1={y} x2={x} y2={y + 26} stroke="oklch(0.62 0.06 85)" strokeWidth={0.8 + t * 3} strokeLinecap="round" />
      </g>
    })}
    <text x="280" y="42" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.4" fill="var(--label)">HARD OUTER SHELL</text>
    <text x="280" y="196" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.4" fill="var(--label)">SPONGY INSIDE, AND MARROW</text>
    {[0, 1, 2].map((i) => (
      <circle key={`c${i}`} cx={176 + i * 44} cy={66} r="7"
        fill={losing ? 'oklch(0.58 0.16 28)' : 'oklch(0.78 0.04 28)'} opacity={losing ? 1 : 0.4} />
    ))}
    {[0, 1, 2].map((i) => (
      <rect key={`b${i}`} x={348 + i * 30} y={158} width="12" height="12" rx="3"
        fill={working ? 'oklch(0.50 0.13 155)' : 'oklch(0.78 0.04 155)'} opacity={working ? 1 : 0.4} />
    ))}
    <text x="120" y="218" fontFamily="var(--sans)" fontSize="11.5" fill="oklch(0.48 0.14 28)">● cells removing bone</text>
    <text x="340" y="218" fontFamily="var(--sans)" fontSize="11.5" fill="oklch(0.42 0.12 155)">■ cells laying it down</text>
  </g>
}

/** Lesson 12 — the same bone, made of different stuff. */
function MaterialScene({ mineral, bend, verdict }) {
  const sag = Math.min(58, bend * 16)
  const snap = verdict === 'Shatters'
  const hue = 85 - (mineral / 100) * 25
  return <g>
    <rect x="86" y="86" width="26" height="62" rx="6" fill="var(--machine)" />
    <rect x="448" y="86" width="26" height="62" rx="6" fill="var(--machine)" />
    {snap ? <>
      <path d={`M 112 112 L 268 112 L 258 134 L 112 134 Z`} fill={`oklch(0.93 0.03 ${hue})`} stroke={`oklch(0.46 0.07 ${hue})`} strokeWidth="4" />
      <path d={`M 292 112 L 448 112 L 448 134 L 282 134 Z`} fill={`oklch(0.93 0.03 ${hue})`} stroke={`oklch(0.46 0.07 ${hue})`} strokeWidth="4" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={266 + i * 9} cy={150 + i * 11} r="3.4" fill={`oklch(0.60 0.06 ${hue})`} />
      ))}
    </> : (
      <path d={`M 112 112 Q 280 ${112 + sag * 2} 448 112 L 448 134 Q 280 ${134 + sag * 2} 112 134 Z`}
        fill={`oklch(0.93 0.03 ${hue})`} stroke={`oklch(0.46 0.07 ${hue})`} strokeWidth="4" strokeLinejoin="round" />
    )}
    <path d="M 280 40 l 0 42 M 268 70 l 12 14 l 12 -14" fill="none" stroke="oklch(0.50 0.14 28)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <text x="280" y="32" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.4" fill="var(--label)">THE SAME LOAD, EVERY TIME</text>
    <text x="280" y="212" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fill="var(--muted)">
      {verdict === 'Folds' ? 'collagen without mineral — flexible and useless for standing on'
        : verdict === 'Shatters' ? 'mineral without collagen — stiff, and brittle as chalk'
          : 'mineral for stiffness, collagen for give — and you need both'}
    </text>
  </g>
}
