import { useMemo, useState } from 'react'
import { solveTruss, distributeToDeck, SPAN } from '../../lib/truss.js'

// Lesson 9. Drive a truck across a bridge and watch the structure answer.
//
// Every member's colour and thickness comes out of a real statics solve (see
// lib/truss.js), not from a designer's guess. That matters more here than
// anywhere else in the course: the whole claim of the lesson is that the load
// takes a *path*, and a diagram that merely looked structural would be teaching
// the learner to trust a picture.
//
// Red is compression, blue is tension. Nothing in the truss is idle: move the
// truck and members swap jobs.

const W = 560
const H = 190
const PAD = 40
const SCALE_X = (W - PAD * 2) / 4
const SCALE_Y = 92

export default function BridgeTruss() {
  const [x, setX] = useState(2)
  const [weight, setWeight] = useState(100)

  const result = useMemo(
    () => solveTruss(SPAN, distributeToDeck(SPAN.deckNodes, SPAN.nodes, x, weight)),
    [x, weight]
  )

  const px = (n) => PAD + n.x * SCALE_X
  const py = (n) => H - 40 - n.y * SCALE_Y

  const forces = result?.forces ?? SPAN.members.map(() => 0)
  const peak = Math.max(1, ...forces.map((f) => Math.abs(f)))
  const hardest = forces.reduce((best, f, i) => (Math.abs(f) > Math.abs(forces[best]) ? i : best), 0)

  const left = result?.reactions.pinY ?? 0
  const right = result?.reactions.rollerY ?? 0
  const truckX = PAD + x * SCALE_X

  const name = (k) => {
    const [a, b] = SPAN.members[k]
    if (a < 5 && b < 5) return 'a deck member'
    if (a >= 5 && b >= 5) return 'the top chord'
    return 'a diagonal'
  }

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Into the ground, each end</span>
          <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
            <span className="hw-readout-num" style={{ fontSize: 30 }}>
              {left.toFixed(0)}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> lb</span>
            </span>
            <span className="hw-readout-num" style={{ fontSize: 30 }}>
              {right.toFixed(0)}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> lb</span>
            </span>
          </div>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 220 }}>
            Always {weight} lb between them. The bridge holds nothing up — it passes everything along.
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
          <span className="hw-readout-label">Working hardest right now</span>
          <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)' }}>
            {name(hardest)}, {forces[hardest] > 0 ? 'being pulled apart' : 'being squeezed'} with {Math.abs(forces[hardest]).toFixed(0)} lb.
          </span>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, fontSize: 12, color: 'var(--muted)' }}>
            <span><span style={{ display: 'inline-block', width: 14, height: 4, background: 'var(--brake)', marginRight: 6, verticalAlign: 'middle' }} />squeezed</span>
            <span><span style={{ display: 'inline-block', width: 14, height: 4, background: 'var(--builder)', marginRight: 6, verticalAlign: 'middle' }} />stretched</span>
          </div>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'var(--paper)' }}
        role="img"
        aria-label={`A truss bridge with a truck on it. ${left.toFixed(0)} pounds goes into the left support and ${right.toFixed(0)} into the right. The bottom members are stretched and the top ones squeezed.`}
      >
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <line x1="0" y1={H - 38} x2={W} y2={H - 38} stroke="#cdc0ab" strokeWidth="1" />

          {SPAN.members.map(([a, b], k) => {
            const f = forces[k]
            const mag = Math.abs(f) / peak
            return (
              <line
                key={k}
                x1={px(SPAN.nodes[a])} y1={py(SPAN.nodes[a])}
                x2={px(SPAN.nodes[b])} y2={py(SPAN.nodes[b])}
                stroke={Math.abs(f) < 0.5 ? '#c9bfae' : f > 0 ? 'var(--builder)' : 'var(--brake)'}
                strokeWidth={1.5 + mag * 7}
                strokeLinecap="round"
              />
            )
          })}

          {SPAN.nodes.map((n, i) => (
            <circle key={i} cx={px(n)} cy={py(n)} r="3.5" fill="var(--machine)" />
          ))}

          {/* the supports, and the force each one hands to the ground */}
          {[{ n: SPAN.nodes[SPAN.pin], v: left }, { n: SPAN.nodes[SPAN.roller], v: right }].map((s, i) => (
            <g key={i}>
              <polygon
                points={`${px(s.n)},${py(s.n)} ${px(s.n) - 11},${py(s.n) + 18} ${px(s.n) + 11},${py(s.n) + 18}`}
                fill="var(--car-cabin)"
              />
              <line
                x1={px(s.n)} y1={py(s.n) + 20} x2={px(s.n)} y2={py(s.n) + 20 + (s.v / weight) * 26}
                stroke="var(--brake)" strokeWidth="3"
              />
            </g>
          ))}

          {/* the truck */}
          <g transform={`translate(${truckX}, ${py(SPAN.nodes[0]) - 26})`}>
            <rect x="-26" y="0" width="52" height="16" rx="3" fill="var(--car-body)" />
            <rect x="8" y="-11" width="18" height="12" rx="2" fill="var(--car-cabin)" />
            <circle cx="-14" cy="18" r="5" fill="var(--tyre)" />
            <circle cx="16" cy="18" r="5" fill="var(--tyre)" />
          </g>
        </svg>

        <div style={{ position: 'absolute', left: 22, bottom: 12, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          Thickness is how hard a piece is working. Nothing here is decoration.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 260 }}>
          <label htmlFor="hw-bridge-x" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Drive the truck across
          </label>
          <input id="hw-bridge-x" type="range" min="0" max="4" step="0.05"
            value={x} onChange={(e) => setX(Number(e.target.value))}
            style={{ width: 260, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 180 }}>
          <label htmlFor="hw-bridge-w" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            The truck weighs · {weight}
          </label>
          <input id="hw-bridge-w" type="range" min="20" max="200" step="10"
            value={weight} onChange={(e) => setWeight(Number(e.target.value))}
            style={{ width: 180, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 280, textAlign: 'right' }}>
          Park it over a support and watch the whole truss go quiet.
        </span>
      </div>
    </div>
  )
}
