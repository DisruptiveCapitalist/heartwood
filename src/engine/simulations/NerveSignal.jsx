import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Anatomy & Physiology, Lesson 10 — signals at extraordinary speed.
//
// Two signals race the same metre of nerve, because that race is something the
// learner has felt: stub a toe and the sharp pain arrives at once, with the
// deep ache a second behind it. Same injury, two kinds of fibre, two speeds.
// Wrapped fibres carry it at around 90 metres a second; bare ones at about 1.
//
// The third bar is a hormone, which takes a different route entirely — into the
// blood, round the body, and found by whatever has the receptor. It is drawn to
// the same scale so that "fast" and "slow" stop being adjectives. The spec asks
// for this comparison explicitly, and asks that it not be overstated: hormones
// are slower and longer-lasting as a rule, with real exceptions.

const DIST = 1.0          // metres, toe to spinal cord, near enough
const FAST = 90           // m/s, a wrapped fibre
const SLOW = 1            // m/s, a bare one
const HORMONE = 20        // seconds, adrenaline reaching the body in the blood

const SHOW = 2.6          // seconds of the race we draw before resetting

export default function NerveSignal({ active }) {
  const [running, setRunning] = useState(false)
  const [ui, setUi] = useState({ t: 0 })
  const sim = useRef({ t: 0, acc: 0 })
  const live = useRef({})
  live.current = { running }

  const step = useCallback((dt) => {
    const s = sim.current
    if (!live.current.running) return
    s.t = Math.min(SHOW, s.t + dt)
    s.acc += dt
    if (s.acc >= 1 / 30) { s.acc = 0; setUi({ t: s.t }) }
  }, [])
  useRafLoop(active, step)

  const t = ui.t
  const fastArrived = t >= DIST / FAST
  const slowArrived = t >= DIST / SLOW
  const fastPos = Math.min(1, (t * FAST) / DIST)
  const slowPos = Math.min(1, (t * SLOW) / DIST)
  const hormonePos = Math.min(1, t / HORMONE)

  const go = () => { sim.current.t = 0; setUi({ t: 0 }); setRunning(true) }

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Since the toe was stubbed</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {t.toFixed(2)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> sec</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 236, minHeight: 48, marginTop: 4 }}>
            {!running ? 'One injury. Three messages about it, travelling at wildly different speeds.'
              : slowArrived ? 'Both pains have arrived — the sharp one long ago, the dull one just now. The hormone is still on its way round.'
                : fastArrived ? 'The sharp pain is already in. The dull ache is still crawling up your leg.'
                  : 'Both still on the way.'}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Wrapped fibre" value={(DIST / FAST * 1000).toFixed(0)} u="ms" accent foot={`${FAST} metres a second`} />
          <Stat label="Bare fibre" value={(DIST / SLOW).toFixed(1)} u="sec" foot={`${SLOW} metre a second — ninety times slower`} />
          <Stat label="A hormone, by blood" value={HORMONE} u="sec" foot="and it lasts for minutes after" />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 262, background: 'var(--paper)' }}
        role="img"
        aria-label={`Three signals racing one metre: a wrapped nerve fibre, a bare nerve fibre, and a hormone carried in the blood.`}>
        <svg viewBox="0 0 560 230" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '6px 0 auto 0', width: '100%', height: 214 }}>
          {[
            { y: 52, pos: fastPos, label: 'WRAPPED FIBRE', sub: 'sharp pain', hue: 300, wrapped: true },
            { y: 112, pos: slowPos, label: 'BARE FIBRE', sub: 'dull ache', hue: 300, wrapped: false },
            { y: 172, pos: hormonePos, label: 'A HORMONE', sub: 'carried in the blood', hue: 25, wrapped: false }
          ].map((row) => (
            <g key={row.label}>
              <line x1="150" y1={row.y} x2="470" y2={row.y} stroke={`oklch(0.78 0.04 ${row.hue})`} strokeWidth="9" strokeLinecap="round" />
              {row.wrapped && [0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={166 + i * 52} y={row.y - 8} width="38" height="16" rx="7"
                  fill="oklch(0.86 0.06 85)" stroke="oklch(0.46 0.10 85)" strokeWidth="1.8" />
              ))}
              <line x1="150" y1={row.y} x2={150 + row.pos * 320} y2={row.y}
                stroke={`oklch(0.52 0.14 ${row.hue})`} strokeWidth="9" strokeLinecap="round" />
              <circle cx={150 + row.pos * 320} cy={row.y} r="8" fill={`oklch(0.48 0.16 ${row.hue})`} stroke="var(--paper)" strokeWidth="2" />
              <text x="142" y={row.y - 12} textAnchor="end" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1" fill="var(--label)">{row.label}</text>
              <text x="142" y={row.y + 8} textAnchor="end" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">{row.sub}</text>
              {row.pos >= 1 && (
                <text x="482" y={row.y + 5} fontFamily="var(--sans)" fontSize="12" fontWeight="700" fill="oklch(0.42 0.12 155)">arrived</text>
              )}
            </g>
          ))}
          <text x="150" y="212" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" letterSpacing="1.2" fill="var(--label)">THE TOE</text>
          <text x="470" y="212" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" letterSpacing="1.2" fill="var(--label)">THE SPINAL CORD</text>
          <text x="310" y="26" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fill="var(--muted)">one metre, three ways of covering it</text>
        </svg>

        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          The yellow sleeves are the wrapping. The signal skips between the gaps instead of crawling the whole length, which is where the speed comes from.
        </div>
      </div>

      <div className="hw-controls">
        <button className="hw-btn" onClick={go}
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 24px', borderColor: 'var(--ink)', background: 'var(--ink)', color: '#f6f1e7' }}>
          {t > 0 ? 'STUB IT AGAIN' : 'STUB YOUR TOE'}
        </button>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 250, textAlign: 'right' }}>
          You have felt this. Sharp first, then the ache.
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
