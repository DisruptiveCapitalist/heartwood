import { useState } from 'react'

// Light bending, drawn two ways over Snell's law.
//
//   variant "straw" (Lesson 24) — a boundary between air and water, with an
//                   object under the surface and an eye above it. The dashed
//                   line is where the eye *thinks* the object is, which is the
//                   whole lesson: nothing bent except the light.
//   variant "lens"  (Lesson 25) — a mirror, a converging lens and a diverging
//                   one, with rays you can aim.
//
// Angles come out of Snell's law rather than being drawn by eye, so the
// straight-on case really does pass through undeviated — which the challenge
// asks the learner to notice.

const W = 560
const H = 230
const N_AIR = 1.0
const N_WATER = 1.33
const N_GLASS = 1.52

const refract = (thetaIn, n1, n2) => {
  const s = (n1 / n2) * Math.sin(thetaIn)
  return Math.abs(s) > 1 ? null : Math.asin(s)   // null = total internal reflection
}

const deg = (r) => (r * 180) / Math.PI
const rad = (d) => (d * Math.PI) / 180

function Straw({ angleDeg, depth }) {
  const surfaceY = 96
  const objX = 300
  const objY = surfaceY + depth

  // The ray that reaches the eye leaves the object at `angleDeg` from vertical,
  // then bends away from the normal on its way out into the air.
  const tIn = rad(angleDeg)
  const tOut = refract(tIn, N_WATER, N_AIR)
  const hitX = objX - Math.tan(tIn) * depth
  const outDx = tOut == null ? 0 : Math.tan(tOut) * (surfaceY - 18)
  const eyeX = hitX - outDx

  // Where the eye traces that ray back to, which is not where the object is.
  const apparentY = surfaceY + (hitX - objX) / (tOut == null ? -1 : -Math.tan(tOut))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 212 }}>
      <rect x="40" y={surfaceY} width={W - 80} height={H - surfaceY - 24} fill="#dbe9ef" />
      <line x1="40" y1={surfaceY} x2={W - 40} y2={surfaceY} stroke="#a9c6d3" strokeWidth="2" />
      <line x1={hitX} y1={surfaceY - 34} x2={hitX} y2={surfaceY + 34} stroke="var(--rule)" strokeWidth="1" strokeDasharray="4 4" />

      {/* the ray that actually gets to the eye */}
      <line x1={objX} y1={objY} x2={hitX} y2={surfaceY} stroke="var(--accent-bright)" strokeWidth="2.4" />
      <line x1={hitX} y1={surfaceY} x2={eyeX} y2="18" stroke="var(--accent-bright)" strokeWidth="2.4" />

      {/* where the eye believes it came from */}
      <line x1={hitX} y1={surfaceY} x2={objX} y2={apparentY} stroke="var(--builder)" strokeWidth="1.6" strokeDasharray="5 4" />
      <circle cx={objX} cy={apparentY} r="7" fill="none" stroke="var(--builder)" strokeWidth="2" strokeDasharray="3 3" />

      <circle cx={objX} cy={objY} r="8" fill="var(--car-body)" />
      <text x={objX + 14} y={objY + 4} fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">where it is</text>
      <text x={objX + 14} y={apparentY + 4} fontFamily="var(--sans)" fontSize="11" fill="var(--builder)">where you see it</text>

      <circle cx={eyeX} cy="14" r="11" fill="none" stroke="var(--machine)" strokeWidth="2.5" />
      <circle cx={eyeX} cy="14" r="3.5" fill="var(--machine)" />
    </svg>
  )
}

function Lens({ kind, angleDeg }) {
  const cx = 300
  const axisY = 112
  const rays = [-34, 0, 34]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 212 }}>
      <line x1="30" y1={axisY} x2={W - 30} y2={axisY} stroke="var(--rule)" strokeWidth="1" strokeDasharray="4 4" />

      {kind === 'mirror' && <rect x={cx} y={axisY - 62} width="7" height="124" fill="var(--machine)" />}
      {kind === 'converge' && <ellipse cx={cx} cy={axisY} rx="13" ry="60" fill="rgba(170,205,220,.5)" stroke="var(--builder)" strokeWidth="2" />}
      {kind === 'diverge' && (
        <path d={`M ${cx - 12} ${axisY - 60} q 12 60 0 120 l 24 0 q -12 -60 0 -120 z`} fill="rgba(170,205,220,.5)" stroke="var(--builder)" strokeWidth="2" />
      )}

      {rays.map((off, i) => {
        const y0 = axisY + off + angleDeg * 0.9
        if (kind === 'mirror') {
          const inSlope = (y0 - (axisY + off)) / 260
          return (
            <g key={i}>
              <line x1="34" y1={y0} x2={cx} y2={axisY + off} stroke="var(--accent-bright)" strokeWidth="2.2" />
              <line x1={cx} y1={axisY + off} x2="34" y2={axisY + off - (y0 - (axisY + off)) - inSlope * 0} stroke="var(--accent-bright)" strokeWidth="2.2" opacity="0.75" />
            </g>
          )
        }
        // A thin lens brings parallel rays to one point; a diverging one spreads
        // them as if they came from one.
        const f = kind === 'converge' ? 150 : -150
        const yAt = axisY + off
        const slopeOut = -(yAt - axisY) / f
        return (
          <g key={i}>
            <line x1="34" y1={y0} x2={cx} y2={yAt} stroke="var(--accent-bright)" strokeWidth="2.2" />
            <line x1={cx} y1={yAt} x2={W - 34} y2={yAt + slopeOut * (W - 34 - cx)} stroke="var(--accent-bright)" strokeWidth="2.2" />
            {kind === 'diverge' && (
              <line x1={cx} y1={yAt} x2={cx - 150} y2={yAt - slopeOut * 150} stroke="var(--builder)" strokeWidth="1.4" strokeDasharray="5 4" />
            )}
          </g>
        )
      })}

      <circle cx={kind === 'converge' ? cx + 150 : cx - 150} cy={axisY} r="5" fill={kind === 'mirror' ? 'transparent' : 'var(--accent)'} />
      {kind !== 'mirror' && (
        <text x={kind === 'converge' ? cx + 150 : cx - 150} y={axisY + 22} textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">
          {kind === 'converge' ? 'they meet here' : 'they seem to come from here'}
        </text>
      )}
    </svg>
  )
}

export default function RayOptics({ variant = 'straw' }) {
  const isStraw = variant === 'straw'
  const [angle, setAngle] = useState(32)
  const [depth, setDepth] = useState(60)
  const [kind, setKind] = useState('converge')

  const tOut = refract(rad(angle), N_WATER, N_AIR)
  const bentBy = tOut == null ? null : deg(tOut) - angle

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{isStraw ? 'How much the light bends' : 'What the glass does'}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {isStraw
              ? (tOut == null ? '—' : `${bentBy.toFixed(1)}°`)
              : (kind === 'converge' ? 'Gathers' : kind === 'diverge' ? 'Spreads' : 'Reflects')}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 230, minHeight: 48, lineHeight: 1.5 }}>
            {isStraw
              ? (angle === 0
                ? 'Straight up through the surface: no bend at all. Crossing a boundary is not what bends light — crossing it at an angle is.'
                : tOut == null
                  ? 'Too shallow an angle to get out at all. The surface has become a mirror from underneath.'
                  : 'The light changes direction at the surface. Your eye has no way of knowing that, so it traces the ray straight back.')
              : (kind === 'mirror'
                ? 'The ray leaves at the same angle it arrived, on the other side of the line.'
                : kind === 'converge'
                  ? 'Rays arriving parallel are brought together at one point. That is a magnifying glass, a camera and the lens in your eye.'
                  : 'Rays are spread apart, as though they had come from a point behind the glass.')}
          </span>
        </div>
        {isStraw && (
          <div data-align="right" style={{ width: 252, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
            <span className="hw-readout-label">Why it bends</span>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)' }}>
              Light travels about a third slower in water than in air. Arriving at a slant, one edge of the beam reaches the slower material first and the whole thing swings round — like a trolley with one wheel on grass.
            </span>
          </div>
        )}
      </div>

      <div
        className="hw-stage"
        style={{ height: 230, background: 'var(--paper)' }}
        role="img"
        aria-label={isStraw
          ? 'An object under water and an eye above it. The light bends at the surface, so the object appears somewhere it is not.'
          : 'Parallel rays meeting a mirror, a converging lens or a diverging lens.'}
      >
        {isStraw ? <Straw angleDeg={angle} depth={depth} /> : <Lens kind={kind} angleDeg={angle - 32} />}
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {isStraw
            ? 'Orange is the light that reaches your eye. Blue dashes are where your eye assumes it started.'
            : 'The rays arrive parallel. What happens after the glass is the whole job of the glass.'}
        </div>
      </div>

      <div className="hw-controls">
        {isStraw ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 230 }}>
              <label htmlFor="hw-angle" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
                Where you are standing · {angle}° off straight above
              </label>
              <input id="hw-angle" type="range" min="0" max="48" step="1"
                value={angle} onChange={(e) => setAngle(Number(e.target.value))}
                style={{ width: 230, accentColor: 'var(--accent)', height: 28 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 180 }}>
              <label htmlFor="hw-depth" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
                How deep it is
              </label>
              <input id="hw-depth" type="range" min="24" max="100" step="2"
                value={depth} onChange={(e) => setDepth(Number(e.target.value))}
                style={{ width: 180, accentColor: 'var(--accent)', height: 28 }} />
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[['mirror', 'Mirror'], ['converge', 'Magnifying glass'], ['diverge', 'Spreading lens']].map(([id, label]) => (
                <button key={id} className="hw-btn" onClick={() => setKind(id)} aria-pressed={kind === id}
                  style={{
                    padding: '12px 16px', letterSpacing: '.04em',
                    borderColor: kind === id ? 'var(--accent)' : 'var(--field)',
                    background: kind === id ? 'var(--accent-wash-2)' : 'var(--paper)'
                  }}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 190 }}>
              <label htmlFor="hw-tilt" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Tilt the rays</label>
              <input id="hw-tilt" type="range" min="0" max="64" step="2"
                value={angle} onChange={(e) => setAngle(Number(e.target.value))}
                style={{ width: 190, accentColor: 'var(--accent)', height: 28 }} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
