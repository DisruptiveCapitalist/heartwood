import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Anatomy & Physiology, Lesson 5 — cells talking to each other, and what the
// conversation is for.
//
// Blood sugar is the example because it makes both halves of the lesson visible
// at once: a molecule released by one organ, received only by cells carrying the
// matching receptor, and a level that comes back into range as a result. The
// learner can also stop the message being received, which is the clearest way
// to show that the loop — not the molecule — is what does the regulating.
//
// This is a simplified teaching model with the clock sped up, and it says so on
// screen. Real regulation involves more signals, more organs and wide individual
// variation. Per the course spec this course does not diagnose: nothing here is
// a measurement of anybody, and the copy never invites the learner to compare it
// with their own readings.

const SET = 90           // where the loop is aiming, mg/dL
const LOW = 70
const HIGH = 140
const K_INSULIN = 0.085  // uptake driven by the signal
const K_BASAL = 0.012    // uptake that happens without the signal at all
const K_GLUCAGON = 0.10
const MEAL = 70

export default function FeedbackLoop({ active, mode = 'glucose' }) {
  const [blocked, setBlocked] = useState(false)
  const [ui, setUi] = useState({ level: SET, meal: 0 })

  const sim = useRef({ level: SET, meal: 0, acc: 0 })
  const live = useRef({})
  live.current = { blocked }

  const step = useCallback((dt) => {
    const s = sim.current
    const { blocked } = live.current

    // A meal arrives over a few seconds rather than all at once.
    if (s.meal > 0) {
      const give = Math.min(s.meal, MEAL * 0.5 * dt)
      s.meal -= give
      s.level += give
    }

    const above = Math.max(0, s.level - SET)
    const below = Math.max(0, LOW - s.level)

    // Insulin-driven uptake only happens if the message is received. Some
    // uptake happens regardless — the brain does not wait to be told.
    s.level -= above * (blocked ? 0 : K_INSULIN) * dt
    s.level -= above * K_BASAL * dt
    s.level += below * K_GLUCAGON * dt

    s.acc += dt
    if (s.acc >= 1 / 12) {
      s.acc = 0
      setUi({ level: s.level, meal: s.meal })
    }
  }, [])

  useRafLoop(active, step)

  const level = ui.level
  const high = level > HIGH
  const releasing = level > SET + 4 ? 'insulin' : level < LOW ? 'glucagon' : null
  const eat = () => { sim.current.meal = MEAL }

  // Where the needle sits on a 50–220 scale.
  const pos = Math.max(0, Math.min(1, (level - 50) / 170))
  const bandL = (LOW - 50) / 170
  const bandR = (HIGH - 50) / 170

  const state = level > HIGH ? 'Above the usual range'
    : level < LOW ? 'Below the usual range'
      : 'Within the usual range'

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Sugar in the blood</span>
          <span className="hw-readout-num" style={{ color: high ? 'oklch(0.52 0.15 40)' : 'var(--accent)' }}>
            {Math.round(level)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> mg/dL</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 48, marginTop: 4 }}>
            {blocked
              ? 'The message is being sent and not received. It drifts down very slowly — some cells take sugar up without being told — but the loop is not closing.'
              : releasing === 'insulin'
                ? 'The pancreas is releasing insulin. Only cells with the matching receptor respond, and they are taking sugar out of the blood.'
                : releasing === 'glucagon'
                  ? 'Low. The pancreas is releasing glucagon instead, which tells the liver to put sugar back in.'
                  : 'Steady, and nothing much is being released. A loop at rest looks like nothing happening.'}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <div>
            <div className="hw-readout-label">The loop</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, lineHeight: 1.25 }}>
              {blocked ? 'Open' : 'Closed'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {blocked ? 'sent, but not received' : 'sent, received, corrected'}
            </div>
          </div>
          <div>
            <div className="hw-readout-label">Being released now</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, lineHeight: 1.25, textTransform: 'capitalize' }}>
              {releasing ?? 'Neither'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {releasing === 'insulin' ? 'a peptide, 51 amino acids — Lesson 4' : releasing === 'glucagon' ? 'a peptide, 29 amino acids' : 'the level is where it should be'}
            </div>
          </div>
          <div>
            <div className="hw-readout-label">Where it sits</div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{state}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>roughly 70 to 140 for most people</div>
          </div>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 268, background: 'var(--paper)' }}
        role="img"
        aria-label={`Blood sugar at ${Math.round(level)} milligrams per decilitre. The regulating loop is ${blocked ? 'open' : 'closed'}.`}
      >
        <svg viewBox="0 0 560 220" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 200 }}>
          {/* the level, as a dial along a scale with the usual range marked */}
          <rect x="40" y="36" width="480" height="22" rx="11" fill="#ece3d2" />
          <rect x={40 + bandL * 480} y="36" width={(bandR - bandL) * 480} height="22" rx="11" fill="oklch(0.88 0.06 155)" />
          <rect x="40" y="36" width={pos * 480} height="22" rx="11"
            fill={high ? 'oklch(0.70 0.14 40)' : 'oklch(0.62 0.10 45)'} opacity="0.55" />
          <circle cx={40 + pos * 480} cy="47" r="11" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
          <text x="40" y="26" fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">50</text>
          <text x={40 + bandL * 480} y="26" fontFamily="var(--sans)" fontSize="11" fontWeight="700" fill="oklch(0.36 0.10 155)">70</text>
          <text x={40 + bandR * 480} y="26" fontFamily="var(--sans)" fontSize="11" fontWeight="700" fill="oklch(0.36 0.10 155)">140</text>
          <text x="520" y="26" textAnchor="end" fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">220</text>

          {/* the three parties to the conversation */}
          {[
            { x: 110, label: 'PANCREAS', sub: 'notices, and speaks', on: !!releasing, hue: 340 },
            { x: 280, label: 'THE BLOOD', sub: 'carries it everywhere', on: !!releasing, hue: 28 },
            { x: 450, label: 'MUSCLE & FAT', sub: blocked ? 'not receiving' : 'listening, and acting', on: !!releasing && !blocked, hue: 155 }
          ].map((c) => (
            <g key={c.label}>
              <circle cx={c.x} cy="124" r="40"
                fill={c.on ? `oklch(0.86 0.09 ${c.hue})` : '#f0e9dc'}
                stroke={`oklch(0.44 0.11 ${c.hue})`} strokeWidth={c.on ? 4 : 2.5} />
              <text x={c.x} y="180" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">{c.label}</text>
              <text x={c.x} y="196" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">{c.sub}</text>
            </g>
          ))}

          {/* the receptor, or the absence of one being any use */}
          <g>
            <rect x="436" y="80" width="28" height="11" rx="4" fill={blocked ? '#cdc0ab' : `oklch(0.58 0.13 155)`} />
            <path d="M 442 80 l 0 -11 M 458 80 l 0 -11" stroke={blocked ? '#cdc0ab' : 'oklch(0.42 0.12 155)'} strokeWidth="3.5" strokeLinecap="round" />
            {blocked && <path d="M 430 62 l 40 36 M 470 62 l -40 36" stroke="oklch(0.55 0.17 28)" strokeWidth="3.5" strokeLinecap="round" />}
          </g>

          {/* the message in transit */}
          {releasing && (
            <g>
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={158 + i * 96} cy="124" r="6"
                  fill={releasing === 'insulin' ? 'oklch(0.55 0.14 340)' : 'oklch(0.58 0.13 85)'} />
              ))}
              <text x="280" y="104" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="600" fill="var(--ink-2)">
                {releasing === 'insulin' ? 'insulin →' : '← glucagon, to the liver'}
              </text>
            </g>
          )}
        </svg>

        <div style={{ position: 'absolute', left: 24, bottom: 10, right: 24, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          A simplified model with the clock sped up. Real regulation uses more signals and more organs, varies a great deal between people, and nothing here is a measurement of anyone.
        </div>
      </div>

      <div className="hw-controls">
        <button
          className="hw-btn" onClick={eat}
          style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 24px',
            borderColor: 'var(--ink)', background: 'var(--ink)', color: '#f6f1e7'
          }}
        >
          EAT SOMETHING
        </button>

        <button
          className="hw-btn" onClick={() => setBlocked((b) => !b)} aria-pressed={blocked}
          style={{ borderColor: blocked ? 'oklch(0.55 0.17 28)' : undefined, color: blocked ? 'oklch(0.48 0.17 28)' : undefined }}
        >
          {blocked ? 'LET IT BE RECEIVED AGAIN' : 'STOP IT BEING RECEIVED'}
        </button>

        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 250, textAlign: 'right' }}>
          Eat, watch it come back. Then stop the message and eat again.
        </span>
      </div>
    </div>
  )
}
