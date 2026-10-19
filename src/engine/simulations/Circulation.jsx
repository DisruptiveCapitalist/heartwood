import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Anatomy & Physiology, Week 2. One circulation, seen three ways.
//
//   heart   (Lesson 6)  two pumps bolted together, and what they move per minute
//   vessels (Lesson 7)  why the blood almost stops in the capillaries
//   lungs   (Lesson 8)  where the oxygen gets on, and what decides how much
//
// Every mode reads off one slider — how hard the body is working — through real
// physiology rather than three separate inventions:
//
//   stroke volume rises with rate, then plateaus
//   cardiac output = rate × stroke volume
//   venous saturation falls as the tissues extract more
//   oxygen used per minute = output × the arterial-venous difference
//
// At rest that chain produces about 4.9 L/min and 225 mL of oxygen a minute,
// which is what a resting adult actually does. The numbers are not decoration:
// Lesson 8's whole argument is that breathing is only one of four things that
// decide oxygen delivery, and the learner has to be able to hold breathing
// still and watch the other three move.

const HB = 15            // g/dL haemoglobin, a typical adult
const O2_CAP = 1.34      // mL of oxygen carried per gram of haemoglobin
const SAO2 = 0.98        // arterial saturation leaving healthy lungs

/** Everything else follows from the heart rate. */
function physiology(hr) {
  const stroke = 70 + Math.min(40, Math.max(0, (hr - 70) * 0.45))   // mL per beat
  const output = (hr * stroke) / 1000                                // L/min
  const svo2 = Math.max(0.30, 0.75 - (output - 4.9) * 0.026)         // venous saturation
  const caO2 = O2_CAP * HB * SAO2                                    // mL per dL
  const cvO2 = O2_CAP * HB * svo2
  const vo2 = output * 10 * (caO2 - cvO2)                            // mL of oxygen per minute
  const breaths = 12 + Math.max(0, (output - 4.9) * 1.9)
  return { stroke, output, svo2, vo2, breaths, effort: output / 4.9 }
}

// Resting velocities, cm/s, and the total cross-section each is spread over.
const VESSELS = [
  {
    id: 'artery', name: 'Artery', speed: 33, area: 4.5, pressure: 93, wall: 13,
    fill: 'oklch(0.62 0.17 25)', note: `Thick, muscular and elastic, because it takes the full force of every beat. It can narrow or widen to change where blood goes.`
  },
  {
    id: 'capillary', name: 'Capillary', speed: 0.04, area: 4500, pressure: 25, wall: 2,
    fill: 'oklch(0.70 0.13 25)', note: `One cell thick — thin enough for oxygen and nutrients to cross out and waste to cross in. This is the only place any of that happens.`
  },
  {
    id: 'vein', name: 'Vein', speed: 15, area: 18, pressure: 8, wall: 5,
    fill: 'oklch(0.48 0.10 255)', note: `Thin-walled and roomy, at low pressure. Valves inside stop blood falling back down, and the squeeze of your muscles helps push it home.`
  }
]

export default function Circulation({ active, mode = 'heart' }) {
  const [hr, setHr] = useState(70)
  const [sel, setSel] = useState(null)
  const [ui, setUi] = useState({ phase: 0 })

  const p = physiology(hr)
  const live = useRef({})
  live.current = { hr }

  const sim = useRef({ phase: 0, acc: 0 })
  const step = useCallback((dt) => {
    const s = sim.current
    s.phase = (s.phase + (live.current.hr / 60) * dt) % 1
    s.acc += dt
    if (s.acc >= 1 / 20) { s.acc = 0; setUi({ phase: s.phase }) }
  }, [])
  useRafLoop(active, step)

  // One beat: contract for the first third, fill for the rest.
  const squeeze = ui.phase < 0.33 ? Math.sin((ui.phase / 0.33) * Math.PI) : 0
  const vessel = VESSELS.find((v) => v.id === sel) ?? null
  const effort = p.effort

  const label = hr <= 75 ? 'Resting' : hr <= 100 ? 'Walking' : hr <= 140 ? 'Working hard' : 'Flat out'

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">
            {mode === 'heart' ? 'Pumped each minute' : mode === 'vessels' ? 'Blood through every route' : 'Oxygen used each minute'}
          </span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {mode === 'lungs'
              ? <>{Math.round(p.vo2)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> mL</span></>
              : <>{p.output.toFixed(1)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> L</span></>}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 236, minHeight: 48, marginTop: 4 }}>
            {mode === 'heart'
              ? `${label}. Both sides squeeze together — the right sends blood to the lungs, the left sends it to the rest of you, the same amount each.`
              : mode === 'vessels'
                ? `${label}. Every drop goes through all three in turn, so the same litres pass each one — and yet they could hardly be less alike.`
                : `${label}. You are breathing ${Math.round(p.breaths)} times a minute, and that is only one of the four things setting this number.`}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'heart' && <>
            <Stat label="Beats each minute" value={hr} u="bpm" />
            <Stat label="Pushed out per beat" value={Math.round(p.stroke)} u="mL"
              foot={`about ${p.stroke < 85 ? 'a third' : p.stroke < 105 ? 'two-fifths' : 'half'} of a cup`} />
            <Stat label="Rate × volume" value={p.output.toFixed(1)} u="L/min" accent foot="this is called cardiac output" />
          </>}
          {mode === 'vessels' && <>
            <Stat label="Speed in an artery" value={(33 * effort).toFixed(0)} u="cm/s" />
            <Stat label="Speed in a capillary" value={(0.04 * effort).toFixed(2)} u="cm/s" accent
              foot="about eight hundred times slower" />
            <Stat label="All capillaries together" value="4,500" u="cm²" foot="against 4.5 for the aorta" />
          </>}
          {mode === 'lungs' && <>
            <Stat label="Leaving the lungs" value={Math.round(SAO2 * 100)} u="% full" foot="almost completely loaded" />
            <Stat label="Coming back" value={Math.round(p.svo2 * 100)} u="% full" accent
              foot={p.svo2 < 0.6 ? 'the tissues are taking far more' : 'still three-quarters loaded'} />
            <Stat label="Breaths each minute" value={Math.round(p.breaths)} u="" foot="one of four things that matter" />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: mode === 'vessels' ? 300 : 286, background: 'var(--paper)' }}
        role="img"
        aria-label={mode === 'heart'
          ? `A heart with four chambers beating ${hr} times a minute, sending blood to the lungs on one side and the body on the other.`
          : mode === 'vessels' ? `Cross-sections of an artery, a capillary and a vein, drawn to show their walls.`
            : `An air sac with a capillary around it, oxygen crossing into the blood and carbon dioxide crossing out.`}
      >
        <svg viewBox="0 0 560 250" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: mode === 'vessels' ? 250 : 236 }}>
          {mode === 'heart' && <HeartScene squeeze={squeeze} phase={ui.phase} svo2={p.svo2} />}
          {mode === 'vessels' && <VesselScene sel={sel} onPick={setSel} effort={effort} />}
          {mode === 'lungs' && <LungScene phase={ui.phase} svo2={p.svo2} />}
        </svg>

        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {mode === 'heart'
            ? 'Blue is blood with its oxygen spent, red is blood freshly loaded. The colours are a convention — real venous blood is dark red, never blue.'
            : mode === 'vessels'
              ? 'Cross-sections, not to scale with each other: a capillary is far too small to draw beside an artery honestly.'
              : 'A teaching diagram. You have around 300 million air sacs, and laid flat they would cover most of a tennis court.'}
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 250 }}>
          <label htmlFor="hw-hr" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            How hard you're working · {hr} beats a minute
          </label>
          <input id="hw-hr" type="range" min="50" max="180" step="5"
            value={hr} onChange={(e) => setHr(Number(e.target.value))}
            style={{ width: 250, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 250, textAlign: 'right' }}>
          {mode === 'heart' ? 'Watch the two sides. They never take turns.'
            : mode === 'vessels' ? 'Tap a vessel. Then compare the two speeds.'
              : 'Hold the breathing in mind and watch what else changes.'}
        </span>
      </div>

      {vessel && mode === 'vessels' && (
        <div style={{ padding: '18px 24px 20px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
          <div style={{ maxWidth: 620, margin: '0 auto' }}>
            <span className="hw-label">{vessel.name.toUpperCase()}</span>
            <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', margin: '10px 0 8px', fontFamily: 'var(--sans)', fontSize: 14 }}>
              <span>Pressure · <strong>{vessel.pressure} mmHg</strong></span>
              <span>Speed · <strong>{(vessel.speed * effort).toFixed(vessel.speed < 1 ? 2 : 0)} cm/s</strong></span>
              <span>All of them together · <strong>{vessel.area.toLocaleString()} cm²</strong></span>
            </div>
            <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty' }}>{vessel.note}</p>
          </div>
        </div>
      )}
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

const BLUE = 'oklch(0.48 0.10 255)'
const RED = 'oklch(0.56 0.17 25)'

/** Lesson 6 — the double loop, and the two pumps that drive it. */
function HeartScene({ squeeze, phase, svo2 }) {
  const k = 1 - squeeze * 0.12
  const drop = (t) => ((phase + t) % 1)
  return <g>
    <ellipse cx="150" cy="40" rx="78" ry="26" fill="oklch(0.90 0.05 235)" stroke="oklch(0.44 0.10 235)" strokeWidth="2.4" />
    <text x="150" y="45" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fontWeight="700" letterSpacing="1.4" fill="oklch(0.34 0.09 235)">LUNGS</text>
    <rect x="332" y="18" width="160" height="44" rx="12" fill="oklch(0.92 0.03 45)" stroke="oklch(0.46 0.09 45)" strokeWidth="2.4" />
    <text x="412" y="45" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fontWeight="700" letterSpacing="1.4" fill="oklch(0.36 0.09 45)">THE REST OF YOU</text>

    <g transform={`translate(280 160) scale(${k} ${2 - k}) translate(-280 -160)`}>
      <path d="M 196 96 h 78 v 46 h -78 z" fill={BLUE} opacity="0.82" />
      <path d="M 196 146 h 78 v 72 l -39 14 l -39 -40 z" fill={BLUE} />
      <path d="M 286 96 h 78 v 46 h -78 z" fill={RED} opacity="0.82" />
      <path d="M 286 146 h 78 v 46 l -39 40 l -39 -14 z" fill={RED} />
      <path d="M 196 96 h 168 v 96 l -84 54 l -84 -54 z" fill="none" stroke="oklch(0.34 0.10 25)" strokeWidth="3.4" strokeLinejoin="round" />
      <line x1="280" y1="96" x2="280" y2="240" stroke="oklch(0.34 0.10 25)" strokeWidth="3" />
      <line x1="196" y1="144" x2="364" y2="144" stroke="oklch(0.34 0.10 25)" strokeWidth="2.6" strokeDasharray="7 5" />
      {[[237, 144], [323, 144]].map(([x, y]) => (
        <path key={x} d={`M ${x - 13} ${y} l 13 ${squeeze > 0.25 ? -11 : 11} l 13 ${squeeze > 0.25 ? 11 : -11}`}
          fill="none" stroke="var(--paper)" strokeWidth="3.4" strokeLinecap="round" />
      ))}
      <text x="237" y="120" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="#f6f1e7">RIGHT TOP</text>
      <text x="237" y="186" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="#f6f1e7">RIGHT PUMP</text>
      <text x="323" y="120" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="#f6f1e7">LEFT TOP</text>
      <text x="323" y="186" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="#f6f1e7">LEFT PUMP</text>
    </g>

    <path d="M 214 96 C 206 70 176 64 160 66" fill="none" stroke={BLUE} strokeWidth="7" strokeLinecap="round" />
    <path d="M 142 66 C 120 70 108 110 150 150 C 180 178 186 196 196 200" fill="none" stroke={RED} strokeWidth="7" strokeLinecap="round" opacity="0.55" />
    <path d="M 346 96 C 356 70 380 62 412 62" fill="none" stroke={RED} strokeWidth="7" strokeLinecap="round" />
    <path d="M 470 62 C 500 70 508 150 420 196 C 390 212 300 246 280 246" fill="none" stroke={BLUE} strokeWidth="7" strokeLinecap="round" opacity="0.55" />

    {[0, 0.5].map((t) => {
      const u = drop(t)
      const pos = u < 0.5
        ? { x: 214 - (214 - 160) * (u / 0.5), y: 96 - 30 * Math.sin((u / 0.5) * Math.PI * 0.5) }
        : { x: 346 + (412 - 346) * ((u - 0.5) / 0.5), y: 96 - 34 * Math.sin(((u - 0.5) / 0.5) * Math.PI * 0.5) }
      return <circle key={t} cx={pos.x} cy={pos.y} r="6.5" fill={u < 0.5 ? BLUE : RED} stroke="var(--paper)" strokeWidth="1.6" />
    })}

    <text x="150" y="80" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">to the lungs and back</text>
    <text x="412" y="80" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">out to the body and back</text>
    <text x="500" y="232" textAnchor="end" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
      returning {Math.round(svo2 * 100)}% loaded
    </text>
  </g>
}

/** Lesson 7 — three vessels, one bloodstream. */
function VesselScene({ sel, onPick, effort }) {
  return <g>
    {VESSELS.map((v, i) => {
      const cx = 110 + i * 170
      const on = sel === v.id
      const outer = v.id === 'capillary' ? 26 : 52
      return <g key={v.id} onClick={() => onPick(sel === v.id ? null : v.id)} style={{ cursor: 'pointer' }}
        opacity={sel && !on ? 0.45 : 1}>
        <circle cx={cx} cy="104" r={outer} fill="var(--card)" stroke={v.fill} strokeWidth={v.wall} />
        <circle cx={cx} cy="104" r={outer - v.wall / 2 - 2} fill="oklch(0.93 0.04 25)" />
        {on && <circle cx={cx} cy="104" r={outer + 12} fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 5" />}
        <text x={cx} y="182" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fontWeight="700" letterSpacing="1.2" fill="var(--label)">{v.name.toUpperCase()}</text>
        <text x={cx} y="202" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fill="var(--muted)">
          {(v.speed * effort).toFixed(v.speed < 1 ? 2 : 0)} cm/s
        </text>
        <text x={cx} y="222" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fill="var(--muted)">
          {v.pressure} mmHg
        </text>
      </g>
    })}
    <text x="280" y="32" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="700" letterSpacing="1.2" fill="var(--label)">
      AWAY FROM THE HEART → THROUGH THE TISSUE → BACK TO IT
    </text>
  </g>
}

/** Lesson 8 — where the oxygen gets on. */
function LungScene({ phase, svo2 }) {
  const cross = (i) => ((phase * 2 + i * 0.22) % 1)
  return <g>
    <circle cx="200" cy="112" r="76" fill="oklch(0.96 0.02 235)" stroke="oklch(0.50 0.08 235)" strokeWidth="3" />
    <text x="200" y="108" textAnchor="middle" fontFamily="var(--sans)" fontSize="13" fontWeight="700" letterSpacing="1.4" fill="oklch(0.38 0.08 235)">AIR SAC</text>
    <text x="200" y="128" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">one cell thick</text>
    <path d="M 276 60 C 330 80 330 144 276 164" fill="none" stroke="oklch(0.78 0.09 25)" strokeWidth="26" strokeLinecap="round" />
    <path d="M 276 60 C 330 80 330 144 276 164" fill="none" stroke="oklch(0.56 0.17 25)" strokeWidth="3" strokeLinecap="round" />
    <text x="356" y="82" fontFamily="var(--sans)" fontSize="12" fontWeight="700" letterSpacing="1.2" fill="var(--label)">CAPILLARY</text>
    <text x="356" y="102" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">arriving {Math.round(svo2 * 100)}% loaded</text>
    <text x="356" y="122" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">leaving 98% loaded</text>
    {[0, 1, 2].map((i) => {
      const u = cross(i)
      return <g key={i}>
        <circle cx={246 + u * 50} cy={80 + i * 28} r="6" fill="oklch(0.52 0.11 235)" opacity={0.35 + u * 0.65} />
        <circle cx={246 - u * 50} cy={150 - i * 22} r="5.5" fill="oklch(0.50 0.09 155)" opacity={0.9 - u * 0.5} />
      </g>
    })}
    <text x="40" y="78" fontFamily="var(--sans)" fontSize="12" fill="oklch(0.42 0.11 235)">oxygen in →</text>
    <text x="40" y="166" fontFamily="var(--sans)" fontSize="12" fill="oklch(0.40 0.10 155)">← carbon dioxide out</text>
    <text x="200" y="214" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
      nothing pushes the gases across — each simply moves to where there is less of it
    </text>
  </g>
}
