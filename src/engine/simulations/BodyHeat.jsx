import { useState } from 'react'

// Anatomy & Physiology, Lesson 9 — why hands and feet get cold.
//
// The lesson's point is that cold hands are usually the system working rather
// than failing, so the simulation has to make the trade visible: the learner can
// override it, hold the blood in the hands, and watch the core temperature fall.
// That override is the whole argument. Nothing else shows as plainly that the
// body is choosing, every minute, which part of you to protect.
//
// Per the course spec this lesson explains physiology and does not diagnose.
// The numbers are a teaching model of a healthy response to cold air; they are
// not a measurement of anybody, and the copy says when to ask a doctor rather
// than offering the learner a verdict on themselves.

const CORE = 98.6

/** Skin blood flow as a share of its warm-weather maximum. */
const flowFor = (ambient) => Math.max(4, Math.min(100, 100 * ((ambient - 15) / 70) ** 2))

export default function BodyHeat() {
  const [ambient, setAmbient] = useState(45)
  const [override, setOverride] = useState(false)

  const natural = flowFor(ambient)
  const flow = override ? 100 : natural
  const hand = ambient + (CORE - ambient) * Math.sqrt(flow / 100) * 0.92
  // Holding the skin open in the cold costs the core. This is why it doesn't.
  const core = override ? CORE - 6 * (flow / 100) * ((CORE - ambient) / 78.6) : CORE

  const state = hand > 90 ? 'Warm' : hand > 75 ? 'Cool' : hand > 60 ? 'Cold' : 'Very cold'
  const coreLow = core < 97

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Your hands</span>
          <span className="hw-readout-num" style={{ color: hand > 75 ? 'var(--accent)' : 'oklch(0.50 0.12 250)' }}>{state}</span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 236, minHeight: 48, marginTop: 4 }}>
            {override
              ? coreLow
                ? 'You are holding the blood out in the skin — and losing it. The middle of you is cooling, which is the one thing the body will not allow.'
                : 'Blood is being held out in the skin. In mild air that costs nothing much.'
              : natural < 30
                ? 'The vessels near the surface have narrowed. Less blood goes where the heat would be lost, so your hands go cold and your middle stays put.'
                : 'Plenty of blood is reaching the skin. Nothing needs defending today.'}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Blood reaching the skin" value={Math.round(flow)} u="%" accent foot="of what it could be" />
          <Stat label="Hand temperature" value={hand.toFixed(1)} u="°F" foot="skin, not blood" />
          <Stat label="The middle of you" value={core.toFixed(1)} u="°F"
            foot={coreLow ? 'falling — this is the cost' : 'held, almost whatever happens'} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 262, background: 'var(--paper)' }}
        role="img"
        aria-label={`A torso and a hand. ${Math.round(flow)} percent of the usual blood is reaching the skin, the hand is at ${hand.toFixed(0)} degrees and the core is at ${core.toFixed(0)}.`}>
        <svg viewBox="0 0 560 230" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 212 }}>
          <ellipse cx="170" cy="118" rx="74" ry="92" fill={coreLow ? 'oklch(0.86 0.06 250)' : 'oklch(0.88 0.08 35)'}
            stroke="oklch(0.44 0.10 35)" strokeWidth="3" />
          <text x="170" y="112" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fontWeight="700" letterSpacing="1.4" fill="oklch(0.34 0.10 35)">THE CORE</text>
          <text x="170" y="134" textAnchor="middle" fontFamily="var(--sans)" fontSize="15" fontWeight="600" style={{ fontVariantNumeric: 'tabular-nums' }} fill="oklch(0.34 0.10 35)">{core.toFixed(1)}°F</text>

          <path d="M 244 96 C 300 86 340 96 376 110" fill="none" stroke="oklch(0.56 0.17 25)"
            strokeWidth={3 + (flow / 100) * 13} strokeLinecap="round" />
          <path d="M 376 140 C 340 152 300 158 244 146" fill="none" stroke="oklch(0.48 0.10 255)"
            strokeWidth={3 + (flow / 100) * 11} strokeLinecap="round" />

          <g>
            <ellipse cx="434" cy="124" rx="52" ry="42"
              fill={hand > 90 ? 'oklch(0.86 0.09 35)' : hand > 75 ? 'oklch(0.88 0.05 60)' : hand > 60 ? 'oklch(0.89 0.04 250)' : 'oklch(0.87 0.06 260)'}
              stroke="oklch(0.44 0.08 35)" strokeWidth="2.6" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={462} y={96 + i * 17} width="34" height="12" rx="6"
                fill={hand > 75 ? 'oklch(0.86 0.07 40)' : 'oklch(0.88 0.04 255)'} stroke="oklch(0.44 0.08 35)" strokeWidth="2" />
            ))}
            <text x="434" y="190" textAnchor="middle" fontFamily="var(--sans)" fontSize="12.5" fontWeight="700" letterSpacing="1.4" fill="var(--label)">YOUR HAND</text>
            <text x="434" y="210" textAnchor="middle" fontFamily="var(--sans)" fontSize="15" fontWeight="600" style={{ fontVariantNumeric: 'tabular-nums' }} fill="var(--ink-2)">{hand.toFixed(1)}°F</text>
          </g>

          <text x="310" y="78" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
            {flow < 30 ? 'narrowed — less heat sent out to be lost' : 'open — heat flowing out to the skin'}
          </text>
          <text x="40" y="36" fontFamily="var(--sans)" fontSize="12.5" fontWeight="700" letterSpacing="1.2" fill="var(--label)">
            AIR AROUND YOU · {ambient}°F
          </text>
        </svg>

        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          A teaching model of a healthy response to cold air, not a measurement of anybody. Hands differ a great deal between people and with age.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 240 }}>
          <label htmlFor="hw-amb" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Air around you · {ambient}°F
          </label>
          <input id="hw-amb" type="range" min="20" max="85" step="5"
            value={ambient} onChange={(e) => setAmbient(Number(e.target.value))}
            style={{ width: 240, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <button className="hw-btn" onClick={() => setOverride((o) => !o)} aria-pressed={override}
          style={{ borderColor: override ? 'oklch(0.55 0.17 28)' : undefined, color: override ? 'oklch(0.48 0.17 28)' : undefined }}>
          {override ? 'LET THE BODY DECIDE' : 'KEEP MY HANDS WARM'}
        </button>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          Turn it cold. Then insist on warm hands and watch the other number.
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
