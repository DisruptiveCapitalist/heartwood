import { useRef, useState, useCallback, useEffect } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Waves, drawn two ways over one idea.
//
//   variant "air"    (Lesson 21) — a longitudinal sound wave. Drawn honestly:
//                    the particles move back and forth along the direction of
//                    travel, which is what sound actually does, and the
//                    marked one has a home position it never leaves.
//   variant "string" (Lesson 22) — a string fixed at both ends, with length,
//                    tension and thickness setting a real frequency.
//
// The claim both make is the same: the pattern travels, the material does not.

const W = 560
const MID = 86
const N = 72
const SPEED = 150      // px per second, the drawn wave speed

// f = (n / 2L) * sqrt(T / mu)
const stringHz = (lengthIn, tensionLb, gauge, harmonic) => {
  const L = (lengthIn * 0.0254)
  const T = tensionLb * 4.448
  const mu = gauge * 0.0001
  return (harmonic / (2 * L)) * Math.sqrt(T / mu)
}

const NOTES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B']
const noteFor = (hz) => {
  if (!Number.isFinite(hz) || hz <= 0) return '—'
  const n = Math.round(12 * Math.log2(hz / 440))
  const name = NOTES[((n + 9) % 12 + 12) % 12]
  return `${name}${Math.floor((n + 9) / 12) + 4}`
}

export default function WaveMedium({ active, variant = 'air' }) {
  const isAir = variant === 'air'

  const [freq, setFreq] = useState(1.2)        // air: cycles per second, drawn
  const [medium, setMedium] = useState(true)   // air: is there anything to carry it
  const [lengthIn, setLengthIn] = useState(25)
  const [tension, setTension] = useState(28)
  const [gauge, setGauge] = useState(5)
  const [harmonic, setHarmonic] = useState(1)

  const sim = useRef({ t: 0, acc: 0 })
  const dotRefs = useRef([])
  const stringRef = useRef(null)
  const live = useRef({})
  live.current = { freq, medium, lengthIn, tension, gauge, harmonic }

  const [ui, setUi] = useState({ wander: 0, home: 0 })

  const step = useCallback((dt) => {
    const s = sim.current
    s.t += dt

    if (isAir) {
      const { freq: f, medium: hasAir } = live.current
      const k = (2 * Math.PI) / 150          // one wavelength every 150px
      const w = 2 * Math.PI * f
      let marked = 0
      for (let i = 0; i < N; i++) {
        const home = 24 + i * ((W - 48) / (N - 1))
        // Longitudinal: the shove is along the direction of travel, so the dots
        // bunch and spread rather than waving up and down.
        const d = hasAir ? 9 * Math.sin(k * home - w * s.t) : 0
        const el = dotRefs.current[i]
        if (el) el.setAttribute('cx', (home + d).toFixed(1))
        if (i === 36) marked = d
      }
      s.acc += dt
      if (s.acc >= 1 / 15) { s.acc = 0; setUi({ wander: marked, home: 24 + 36 * ((W - 48) / (N - 1)) }) }
    } else {
      const { harmonic: n } = live.current
      const pts = []
      for (let i = 0; i <= 60; i++) {
        const u = i / 60
        const y = MID - 34 * Math.sin(n * Math.PI * u) * Math.cos(s.t * 7)
        pts.push(`${(40 + u * (W - 80)).toFixed(1)},${y.toFixed(1)}`)
      }
      stringRef.current?.setAttribute('points', pts.join(' '))
    }
  }, [isAir])

  useRafLoop(active, step)

  useEffect(() => { sim.current.t = 0 }, [variant])

  const hz = stringHz(lengthIn, tension, gauge, harmonic)

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        {isAir ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span className="hw-readout-label">Your marked particle</span>
              <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
                {Math.abs(ui.wander).toFixed(1)}
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> px from home</span>
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 230, marginTop: 4 }}>
                It jiggles about one spot and never leaves it. Nothing is travelling from the speaker to the ear.
              </span>
            </div>
            <div data-align="right" style={{ width: 252, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
              <span className="hw-readout-label">What is travelling</span>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                {medium
                  ? 'The pattern of bunching and spreading — moving left to right at the speed of sound, through air that stays where it is.'
                  : 'Nothing. With no air there is nothing to bunch up, and nothing crosses the gap at all.'}
              </span>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span className="hw-readout-label">Frequency</span>
              <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
                {hz < 1000 ? hz.toFixed(0) : (hz / 1000).toFixed(2) + 'k'}
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> cycles a second</span>
              </span>
              <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 230, marginTop: 4 }}>
                Roughly the note {noteFor(hz)}. Shorter, tighter or thinner all push it up.
              </span>
            </div>
            <div data-align="right" style={{ width: 252, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
              <span className="hw-readout-label">Which of the three you changed</span>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                Length {lengthIn}″ · tension {tension} lb · thickness {gauge}
                {harmonic > 1 ? ` · ${harmonic} loops` : ''}
              </span>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                A guitar's six strings are the same length under similar tension. Only the thickness differs.
              </span>
            </div>
          </>
        )}
      </div>

      <div
        className="hw-stage"
        style={{ height: 230, background: 'var(--paper)' }}
        role="img"
        aria-label={isAir
          ? 'A row of air particles bunching and spreading as a sound wave passes. Each one stays near its own position.'
          : `A string fixed at both ends, vibrating at about ${hz.toFixed(0)} cycles a second.`}
      >
        <svg viewBox={`0 0 ${W} 150`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '14px 0 auto 0', width: '100%', height: 150 }}>
          {isAir ? (
            <>
              <rect x="6" y={MID - 30} width="12" height="60" rx="2" fill="var(--car-body)" />
              <text x="12" y={MID + 48} textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fontWeight="700" letterSpacing="1" fill="var(--label)">VOICE</text>
              <circle cx={W - 16} cy={MID} r="13" fill="none" stroke="var(--car-body)" strokeWidth="3" />
              <text x={W - 16} y={MID + 48} textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fontWeight="700" letterSpacing="1" fill="var(--label)">EAR</text>

              <line x1={ui.home} y1={MID - 26} x2={ui.home} y2={MID + 26} stroke="var(--accent-edge)" strokeWidth="1" strokeDasharray="3 3" />

              {Array.from({ length: N }, (_, i) => {
                const home = 24 + i * ((W - 48) / (N - 1))
                const mark = i === 36
                return (
                  <circle
                    key={i}
                    ref={(el) => { dotRefs.current[i] = el }}
                    cx={home} cy={MID} r={mark ? 5.5 : 3.2}
                    fill={mark ? 'var(--accent)' : 'oklch(0.44 0.10 250)'}
                    opacity={medium ? 1 : 0.18}
                  />
                )
              })}
              {!medium && (
                <text x={W / 2} y={MID - 44} textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="700" letterSpacing="2" fill="var(--muted)">
                  NO AIR — NOTHING TO CARRY IT
                </text>
              )}
            </>
          ) : (
            <>
              <rect x="30" y={MID - 36} width="8" height="72" rx="2" fill="var(--machine)" />
              <rect x={W - 38} y={MID - 36} width="8" height="72" rx="2" fill="var(--machine)" />
              <polyline ref={stringRef} points="" fill="none" stroke="var(--accent)" strokeWidth={1 + gauge * 0.42} strokeLinecap="round" />
            </>
          )}
        </svg>

        <div style={{ position: 'absolute', left: 22, bottom: 12, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {isAir
            ? 'The orange particle has a dashed line marking where it lives. Watch how far it gets from it.'
            : 'Both ends are clamped, so only whole numbers of loops will fit. That is why a string has notes rather than a smear.'}
        </div>
      </div>

      <div className="hw-controls">
        {isAir ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 220 }}>
              <label htmlFor="hw-freq" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
                How fast the voice shakes the air
              </label>
              <input id="hw-freq" type="range" min="0.3" max="3" step="0.1"
                value={freq} onChange={(e) => setFreq(Number(e.target.value))}
                style={{ width: 220, accentColor: 'var(--accent)', height: 28 }} />
            </div>
            <button
              className="hw-btn"
              onClick={() => setMedium((m) => !m)}
              aria-pressed={!medium}
              style={{ letterSpacing: '.04em', borderColor: medium ? 'var(--field)' : 'var(--brake)', color: medium ? 'var(--ink-3)' : 'var(--brake)' }}
            >
              {medium ? 'Take the air away' : 'Give the air back'}
            </button>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 160 }}>
              <label htmlFor="hw-len" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Length · {lengthIn}″</label>
              <input id="hw-len" type="range" min="8" max="40" step="1" value={lengthIn}
                onChange={(e) => setLengthIn(Number(e.target.value))} style={{ width: 160, accentColor: 'var(--accent)', height: 28 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 160 }}>
              <label htmlFor="hw-ten" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Tightness · {tension} lb</label>
              <input id="hw-ten" type="range" min="8" max="60" step="1" value={tension}
                onChange={(e) => setTension(Number(e.target.value))} style={{ width: 160, accentColor: 'var(--accent)', height: 28 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 160 }}>
              <label htmlFor="hw-gau" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Thickness · {gauge}</label>
              <input id="hw-gau" type="range" min="1" max="12" step="1" value={gauge}
                onChange={(e) => setGauge(Number(e.target.value))} style={{ width: 160, accentColor: 'var(--accent)', height: 28 }} />
            </div>
            <button className="hw-btn" onClick={() => setHarmonic((h) => (h >= 4 ? 1 : h + 1))}>
              {harmonic === 1 ? 'TOUCH IT LIGHTLY' : `${harmonic} LOOPS`}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
