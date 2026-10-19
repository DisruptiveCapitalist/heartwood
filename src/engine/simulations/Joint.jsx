import { useState } from 'react'

// Anatomy & Physiology, Lesson 13 — joints, and the bargain every one of them makes.
//
// Four joints, and the point is the trade rather than the anatomy: the shoulder
// buys the largest range in the body by giving up bony stability, and pays for
// it by being the most commonly dislocated joint there is. The hip buys the
// opposite. Neither is better designed; they are answers to different questions.
//
// Figures are the usual clinical ones — roughly 180° of shoulder flexion against
// about 120° at the hip, a socket covering around a quarter of the humeral head
// against most of the femoral head, and the shoulder accounting for about half
// of all dislocations seen.

const JOINTS = [
  {
    id: 'shoulder', name: 'Shoulder', range: 180, stability: 1,
    kind: `Ball and socket — with barely any socket`,
    holds: `Muscles and a ring of tough tissue, almost entirely. The bony socket covers only about a quarter of the ball.`,
    cost: `The most commonly dislocated joint in the body — something like half of all dislocations.`,
    gain: `More range than anything else you own. You can put your hand almost anywhere around yourself.`
  },
  {
    id: 'hip', name: 'Hip', range: 120, stability: 4,
    kind: `Ball and socket — with a deep one`,
    holds: `The socket itself, mostly, wrapped in some of the strongest ligaments in the body.`,
    cost: `Noticeably less range. You cannot put your foot where you can put your hand.`,
    gain: `It carries your whole weight, every step, for decades. Dislocating one normally takes a car accident.`
  },
  {
    id: 'knee', name: 'Knee', range: 135, stability: 3,
    kind: `A hinge, essentially one direction`,
    holds: `Ligaments — four main ones — and the muscles around it. The bone ends barely interlock at all.`,
    cost: `Twist it while it is loaded and the ligaments are what gives. This is the famous sporting injury.`,
    gain: `A long, strong lever that bends one way and resists everything else.`
  },
  {
    id: 'spine', name: 'Spine', range: 10, stability: 5,
    kind: `Twenty-four small joints in a column`,
    holds: `Discs between the bones, short tough ligaments, and a great deal of muscle.`,
    cost: `No single joint does much. Ask one to do the work of several and that is where backs complain.`,
    gain: `Add up ten degrees twenty-four times and you can touch your toes — while protecting a spinal cord the whole way.`
  }
]

export default function Joint() {
  const [sel, setSel] = useState('shoulder')
  const j = JOINTS.find((x) => x.id === sel)

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{j.name}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>{j.kind.split(' — ')[0]}</span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 48, marginTop: 4 }}>
            {j.kind}. {j.holds}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="How far it moves" value={j.range} u={j.id === 'spine' ? '° each' : '°'} accent
            foot={j.id === 'spine' ? 'but there are twenty-four of them' : 'bending in its main direction'} />
          <Stat label="How hard to dislocate" value={'●'.repeat(j.stability) + '○'.repeat(5 - j.stability)} u=""
            foot={j.stability <= 2 ? 'held by soft tissue, not bone' : 'held by its own shape'} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 268, background: 'var(--paper)' }}
        role="img" aria-label={`A diagram of the ${j.name.toLowerCase()} joint and how far it moves.`}>
        <svg viewBox="0 0 560 230" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 212 }}>
          <path d={arc(170, 120, 74, j.id === 'spine' ? 10 : j.range)} fill="oklch(0.90 0.06 45)" opacity="0.5" />
          <path d={arc(170, 120, 74, j.id === 'spine' ? 240 : j.range)} fill="none" stroke="oklch(0.56 0.12 45)" strokeWidth="2" strokeDasharray={j.id === 'spine' ? '6 6' : '0'} opacity={j.id === 'spine' ? 0.7 : 0} />
          <line x1="170" y1="120" x2="170" y2="36" stroke="var(--machine)" strokeWidth="9" strokeLinecap="round" />
          <line x1="170" y1="120" x2={170 + 84 * Math.sin((Math.min(j.range, 180) * Math.PI) / 180)}
            y2={120 - 84 * Math.cos((Math.min(j.range, 180) * Math.PI) / 180)}
            stroke="oklch(0.50 0.13 45)" strokeWidth="9" strokeLinecap="round" />
          <circle cx="170" cy="120" r={10 + j.stability * 3} fill="oklch(0.86 0.07 200)" stroke="oklch(0.42 0.10 200)" strokeWidth="3" />
          <text x="170" y="210" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" letterSpacing="1.2" fill="var(--label)">
            {j.id === 'spine' ? 'ONE JOINT · AND TWENTY-THREE MORE' : `${j.range}° OF MOVEMENT`}
          </text>
          <g transform="translate(316 34)">
            {[
              ['Cartilage', 'a smooth, slippery cap on each bone end', 'oklch(0.84 0.07 200)'],
              ['Synovial fluid', 'slipperier than anything manufactured', 'oklch(0.88 0.06 85)'],
              ['Ligament', 'bone to bone — it stops things', 'oklch(0.82 0.08 45)'],
              ['Tendon', 'muscle to bone — it pulls things', 'oklch(0.80 0.09 28)']
            ].map(([name, what, col], i) => (
              <g key={name} transform={`translate(0 ${i * 42})`}>
                <rect x="0" y="0" width="14" height="14" rx="4" fill={col} stroke="var(--machine)" strokeWidth="1.6" />
                <text x="24" y="12" fontFamily="var(--sans)" fontSize="13" fontWeight="600" fill="var(--ink)">{name}</text>
                <text x="24" y="30" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">{what}</text>
              </g>
            ))}
          </g>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Every joint trades range against steadiness. None of them gets both, and which way it leans is the whole design.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {JOINTS.map((x) => (
            <button key={x.id} className="hw-btn" onClick={() => setSel(x.id)} aria-pressed={sel === x.id}
              style={{ background: sel === x.id ? 'var(--ink)' : 'var(--paper)', color: sel === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
              {x.name.toUpperCase()}
            </button>
          ))}
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          Compare the shoulder with the hip. They are the same kind of joint.
        </span>
      </div>

      <div style={{ padding: '18px 24px 20px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 250 }}>
            <span className="hw-label" style={{ color: 'oklch(0.40 0.11 155)' }}>WHAT IT BUYS</span>
            <p style={{ margin: '8px 0 0', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-2)' }}>{j.gain}</p>
          </div>
          <div style={{ flex: 1, minWidth: 250 }}>
            <span className="hw-label" style={{ color: 'oklch(0.48 0.14 28)' }}>WHAT IT COSTS</span>
            <p style={{ margin: '8px 0 0', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-2)' }}>{j.cost}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** A pie wedge of `deg` degrees, opening upward from (cx, cy). */
function arc(cx, cy, r, deg) {
  const a = (Math.min(deg, 359) * Math.PI) / 180
  const x = cx + r * Math.sin(a)
  const y = cy - r * Math.cos(a)
  return `M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${deg > 180 ? 1 : 0} 1 ${x} ${y} Z`
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
