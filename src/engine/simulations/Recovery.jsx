import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Anatomy & Physiology, Lesson 15 — different tissues, different clocks.
//
// The lesson's point, and the reason the spec asks for progressive loading to be
// explained: muscle recovers and adapts in days to a couple of weeks, tendon and
// ligament over months, bone slower still. So a person who trains by how their
// muscles feel will be loading a tendon that is weeks behind and a bone that is
// months behind — and that mismatch is where a great many injuries live.
//
// Nothing here is an exercise prescription. The spec forbids that explicitly,
// and the simulation is built to show a general pattern rather than to tell
// anybody what to do: there is no "right" session, and no schedule to follow.

const TISSUES = [
  { id: 'muscle', name: 'Muscle', tau: 10, hue: 28, note: `Sore within a day, easy again within three, stronger within a fortnight. The fastest tissue you have, and the only one that talks to you.` },
  { id: 'tendon', name: 'Tendon and ligament', tau: 56, hue: 45, note: `Far less blood reaches it, and it rebuilds slowly — a couple of months to adapt to work the muscle got used to in a fortnight.` },
  { id: 'bone', name: 'Bone', tau: 130, hue: 85, note: `Slowest of all. Months of consistent loading before the structure itself is meaningfully different, as Lesson 11 showed from the other side.` }
]

const DAYS_PER_SEC = 7
const SPAN = 180

export default function Recovery({ active }) {
  const [ui, setUi] = useState({ day: 0 })
  const [done, setDone] = useState(false)
  const sim = useRef({ day: 0, acc: 0 })
  const live = useRef({})
  live.current = { done }

  const step = useCallback((dt) => {
    const s = sim.current
    if (!live.current.done) return
    s.day = Math.min(SPAN, s.day + dt * DAYS_PER_SEC)
    s.acc += dt
    if (s.acc >= 1 / 20) { s.acc = 0; setUi({ day: s.day }) }
  }, [])
  useRafLoop(active, step)

  const day = ui.day
  const adapt = (tau) => (done ? 1 - Math.exp(-day / tau) : 0)
  const soreness = done ? Math.max(0, Math.exp(-Math.abs(day - 1.5) / 1.6)) : 0

  const start = () => { sim.current.day = 0; setUi({ day: 0 }); setDone(true) }

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Since that session</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {day < 1 ? '—' : Math.round(day)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> days</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 48, marginTop: 4 }}>
            {!done ? 'One hard session, then watch three tissues answer it at three different speeds.'
              : day < 4 ? 'The muscle is sore and will settle within days. Nothing else has noticeably begun.'
                : day < 30 ? 'The muscle feels fine and is already stronger. The tendon has barely started, and the bone has not.'
                  : day < 100 ? 'The tendon is catching up at last. The bone is still some way behind it.'
                    : 'All three have now answered — but they finished months apart, and only one of them ever told you how it was getting on.'}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {TISSUES.map((t) => (
            <div key={t.id}>
              <div className="hw-readout-label">{t.name}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: `oklch(0.48 0.13 ${t.hue})` }}>
                {Math.round(adapt(t.tau) * 100)}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> % adapted</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 268, background: 'var(--paper)' }}
        role="img" aria-label={`Three tissues adapting after one hard session, at ${Math.round(day)} days.`}>
        <svg viewBox="0 0 560 230" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 212 }}>
          {TISSUES.map((t, i) => {
            const y = 54 + i * 52
            const w = adapt(t.tau) * 330
            return <g key={t.id}>
              <text x="150" y={y + 5} textAnchor="end" fontFamily="var(--sans)" fontSize="12.5" fontWeight="600" fill="var(--ink)">{t.name}</text>
              <rect x="162" y={y - 11} width="330" height="22" rx="11" fill="oklch(0.93 0.02 85)" />
              <rect x="162" y={y - 11} width={w} height="22" rx="11" fill={`oklch(0.70 0.12 ${t.hue})`} />
              <text x="500" y={y + 5} fontFamily="var(--sans)" fontSize="12" style={{ fontVariantNumeric: 'tabular-nums' }} fill="var(--muted)">{Math.round(adapt(t.tau) * 100)}%</text>
            </g>
          })}
          {soreness > 0.04 && (
            <g>
              <rect x="162" y="32" width={Math.max(6, soreness * 90)} height="8" rx="4" fill="oklch(0.56 0.17 28)" />
              <text x={168 + Math.max(6, soreness * 90)} y="40" fontFamily="var(--sans)" fontSize="11" fontWeight="600" fill="oklch(0.48 0.16 28)">soreness</text>
            </g>
          )}
          <line x1="162" y1="196" x2="492" y2="196" stroke="var(--rule)" strokeWidth="1.5" />
          {[0, 30, 60, 90, 120, 150, 180].map((d) => (
            <g key={d}>
              <line x1={162 + (d / SPAN) * 330} y1="192" x2={162 + (d / SPAN) * 330} y2="200" stroke="var(--rule)" strokeWidth="1.5" />
              <text x={162 + (d / SPAN) * 330} y="214" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fill="var(--muted)">{d}</text>
            </g>
          ))}
          <text x="327" y="186" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">DAYS</text>
          {done && <line x1={162 + (day / SPAN) * 330} y1="30" x2={162 + (day / SPAN) * 330} y2="196" stroke="var(--accent)" strokeWidth="2" />}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          A general pattern, not a schedule. Real timescales differ with age, health, history and what the session actually was — and this is not advice about anybody's training.
        </div>
      </div>

      <div className="hw-controls">
        <button className="hw-btn" onClick={start}
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 24px', borderColor: 'var(--ink)', background: 'var(--ink)', color: '#f6f1e7' }}>
          {done ? 'DO IT AGAIN' : 'ONE HARD SESSION'}
        </button>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 260, textAlign: 'right' }}>
          Note the day the muscle feels fine. Then look at the other two bars.
        </span>
      </div>
    </div>
  )
}
