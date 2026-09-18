import { useState } from 'react'

// Lesson 8. Sit down and watch where your weight goes.
//
// Two things the drawing has to make visible, because the lesson claims both:
//
//   The load splits between the legs, and how it splits depends on where you
//   sit. Slide toward one leg and that leg takes almost all of it.
//
//   The seat itself is doing something different from the legs. The legs are
//   being squeezed end to end. The seat is being bent — which means its top
//   surface is squeezed and its bottom surface is stretched, at the same time,
//   in the same piece of wood. That is the whole idea of the lesson and it is
//   very hard to believe without seeing it.

const SEAT_LEFT = 22     // percent of the scene
const SEAT_RIGHT = 78

export default function ChairLoad() {
  const [weight, setWeight] = useState(170)
  const [pos, setPos] = useState(0.5)        // 0 = over the left leg, 1 = over the right

  const left = weight * (1 - pos)
  const right = weight * pos
  // Bending is largest under the load and vanishes over each leg.
  const bending = weight * pos * (1 - pos)
  const bendPeak = weight * 0.25
  const bend = bendPeak > 0 ? bending / bendPeak : 0

  const seatX = SEAT_LEFT + pos * (SEAT_RIGHT - SEAT_LEFT)
  const legBar = (lb) => Math.max(2, (lb / weight) * 52)
  const sag = 3 + bend * 13

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Down each leg</span>
          <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
            <span className="hw-readout-num" style={{ fontSize: 30, color: 'var(--brake)' }}>
              {left.toFixed(0)}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> lb</span>
            </span>
            <span className="hw-readout-num" style={{ fontSize: 30, color: 'var(--brake)' }}>
              {right.toFixed(0)}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> lb</span>
            </span>
          </div>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 220 }}>
            Left and right. They always add to {weight} — the chair never invents or loses any of you.
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
          <span className="hw-readout-label">Inside the seat itself</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12.5 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--brake)' }}>Top surface · squeezed</span>
              <span style={{ width: 90, height: 7, borderRadius: 2, background: 'var(--rule-2)', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: 7, width: `${bend * 100}%`, background: 'var(--brake)' }} />
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
              <span style={{ color: 'var(--builder)' }}>Bottom surface · stretched</span>
              <span style={{ width: 90, height: 7, borderRadius: 2, background: 'var(--rule-2)', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: 7, width: `${bend * 100}%`, background: 'var(--builder)' }} />
              </span>
            </div>
          </div>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', minHeight: 34, lineHeight: 1.5 }}>
            {bend > 0.85
              ? 'Sitting in the middle bends the seat hardest — furthest from either leg.'
              : bend < 0.25
                ? 'Right over a leg, the seat has almost nothing to do. The load goes straight down.'
                : 'Slide to the middle and the bending grows; slide over a leg and it disappears.'}
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 300, background: 'var(--paper)' }}
        role="img"
        aria-label={`A chair with someone sitting on it. ${left.toFixed(0)} pounds goes down the left leg and ${right.toFixed(0)} down the right.`}
      >
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 44, height: 1, background: '#cdc0ab' }} />

        {/* the person */}
        <div style={{ position: 'absolute', left: `${seatX}%`, bottom: 150, marginLeft: -17, width: 34, height: 44, background: 'oklch(0.52 0.13 45)', borderRadius: '8px 8px 4px 4px' }} />
        <div style={{ position: 'absolute', left: `${seatX}%`, bottom: 192, marginLeft: -11, width: 22, height: 22, borderRadius: '50%', background: 'oklch(0.44 0.11 45)' }} />

        {/* the weight arrow */}
        <div style={{ position: 'absolute', left: `${seatX}%`, bottom: 108, width: 3, height: 38, marginLeft: -1.5, background: 'var(--ink)' }} />
        <div style={{
          position: 'absolute', left: `${seatX}%`, bottom: 100, marginLeft: -7, width: 0, height: 0,
          borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '10px solid var(--ink)'
        }} />
        <span style={{
          position: 'absolute', left: `${seatX}%`, bottom: 124, marginLeft: 10, whiteSpace: 'nowrap',
          fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: 'var(--ink)'
        }}>
          {weight} LB
        </span>

        {/* the seat, drawn sagging under the load */}
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ position: 'absolute', left: `${SEAT_LEFT}%`, width: `${SEAT_RIGHT - SEAT_LEFT}%`, bottom: 92, height: 22 }}>
          <path
            d={`M 0 4 Q ${pos * 100} ${4 + sag} 100 4 L 100 12 Q ${pos * 100} ${12 + sag} 0 12 Z`}
            fill="var(--car-cabin)"
          />
          <path d={`M 0 4 Q ${pos * 100} ${4 + sag} 100 4`} stroke="var(--brake)" strokeWidth={1 + bend * 2.4} fill="none" />
          <path d={`M 0 12 Q ${pos * 100} ${12 + sag} 100 12`} stroke="var(--builder)" strokeWidth={1 + bend * 2.4} fill="none" />
        </svg>

        {/* the legs, thickening with what they carry */}
        {[{ x: SEAT_LEFT, lb: left }, { x: SEAT_RIGHT, lb: right }].map((leg) => (
          <div key={leg.x}>
            <div style={{
              position: 'absolute', left: `${leg.x}%`, bottom: 44, height: 50,
              width: 8 + (leg.lb / weight) * 10, marginLeft: -(8 + (leg.lb / weight) * 10) / 2,
              background: 'var(--car-cabin)'
            }} />
            {/* the floor pushing back */}
            <div style={{ position: 'absolute', left: `${leg.x}%`, bottom: 10, width: 3, height: legBar(leg.lb), marginLeft: -1.5, background: 'var(--brake)' }} />
            <div style={{
              position: 'absolute', left: `${leg.x}%`, bottom: 10 + legBar(leg.lb), marginLeft: -7, width: 0, height: 0,
              borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: '10px solid var(--brake)'
            }} />
          </div>
        ))}

        <div style={{ position: 'absolute', left: 22, bottom: 16, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          Red is being squeezed. Blue is being stretched. Both are happening in one plank.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 220 }}>
          <label htmlFor="hw-chair-pos" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Where you sit
          </label>
          <input id="hw-chair-pos" type="range" min="0" max="1" step="0.02"
            value={pos} onChange={(e) => setPos(Number(e.target.value))}
            style={{ width: 220, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 180 }}>
          <label htmlFor="hw-chair-weight" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            You weigh · {weight} lb
          </label>
          <input id="hw-chair-weight" type="range" min="80" max="300" step="10"
            value={weight} onChange={(e) => setWeight(Number(e.target.value))}
            style={{ width: 180, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 300, textAlign: 'right' }}>
          Slide yourself right over one leg and watch the other one stop working.
        </span>
      </div>
    </div>
  )
}
