import { useState } from 'react'

// Electricity & Energy, Lesson 10 — why one dead bulb used to darken the string.
//
// Three identical 60 W bulbs on a 120 V supply. In parallel each gets the full
// 120 V and runs at 60 W. In series they share it — 40 V each — and because
// power goes as the square of the voltage across them, each produces about
// 6.7 W. A ninth of the light, from the same bulbs and the same supply.
//
// That is the arithmetic behind the old Christmas lights, and it is also why a
// house is wired in parallel. The cost of parallel is that currents add, which
// is what the breaker is counting — so the lesson ends where a tripped breaker
// begins.

const SUPPLY = 120
const RATED_W = 60
const R = (SUPPLY * SUPPLY) / RATED_W     // 240 ohms

export default function SeriesParallel() {
  const [series, setSeries] = useState(true)
  const [n, setN] = useState(3)
  const [broken, setBroken] = useState(false)

  const working = broken ? n - 1 : n
  let perBulbW, totalA, perBulbV, lit
  if (series) {
    lit = !broken
    const totalR = R * n
    const i = lit ? SUPPLY / totalR : 0
    perBulbV = lit ? SUPPLY / n : 0
    perBulbW = i * i * R
    totalA = i
  } else {
    lit = true
    perBulbV = SUPPLY
    perBulbW = RATED_W
    totalA = (working * RATED_W) / SUPPLY
  }
  const share = (perBulbW / RATED_W) * 100

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{series ? 'All in one loop' : 'Each on its own branch'}</span>
          <span className="hw-readout-num" style={{ color: lit && share > 50 ? 'var(--accent)' : 'oklch(0.52 0.15 40)', fontSize: 22 }}>
            {!lit ? 'All of them out' : series ? `${share.toFixed(0)}% as bright` : 'Full brightness'}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {series
              ? (broken
                ? 'One bulb has failed and the loop is broken — so nothing anywhere can move. Week 1 Lesson 2, now with a practical cost attached.'
                : `They share the 120 volts, ${Math.round(perBulbV)} each. And heat goes as the square of the voltage across a bulb, so a third of the voltage gives about a ninth of the light.`)
              : (broken
                ? 'One has failed and the others have not noticed. Each branch is its own complete loop, so a break in one leaves the rest untouched.'
                : 'Every bulb gets the full 120 volts, so every bulb runs at its rated brightness. The price is that the currents add up.')}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Across each bulb" value={Math.round(perBulbV)} u="volts" foot={series ? `the supply, shared ${n} ways` : 'the full supply, each'} />
          <Stat label="Each bulb produces" value={perBulbW.toFixed(1)} u="watts" accent foot={`rated at ${RATED_W}`} />
          <Stat label="Total current drawn" value={totalA.toFixed(2)} u="amps" foot={series ? 'one path, so one current' : 'the branches add up'} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 282, background: 'var(--paper)' }}
        role="img" aria-label={`${n} bulbs wired in ${series ? 'series' : 'parallel'}${broken ? ', one of them failed' : ''}.`}>
        <svg viewBox="0 0 560 244" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 228 }}>
          <rect x="36" y="96" width="22" height="8" fill="var(--machine)" />
          <rect x="40" y="110" width="14" height="8" fill="var(--machine)" />
          <rect x="36" y="124" width="22" height="8" fill="var(--machine)" />
          <text x="47" y="152" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" fill="var(--label)">120 V</text>

          {series ? <>
            <path d={`M 58 100 L 90 100 L 90 60 L 500 60 L 500 168 L 90 168 L 90 128 L 58 128`}
              fill="none" stroke="#b9ab94" strokeWidth="6" strokeLinejoin="round" />
            {Array.from({ length: n }, (_, i) => {
              const x = 140 + i * (320 / n)
              const dead = broken && i === 1
              return <g key={i}>
                <circle cx={x} cy="60" r="20"
                  fill={dead ? '#e8e0d2' : lit ? `oklch(${0.72 + (share / 100) * 0.2} ${0.06 + (share / 100) * 0.07} 85)` : '#f0e9dc'}
                  stroke="var(--machine)" strokeWidth="3" />
                {dead && <path d={`M ${x - 9} 51 l 18 18 M ${x + 9} 51 l -18 18`} stroke="oklch(0.55 0.17 28)" strokeWidth="3" strokeLinecap="round" />}
              </g>
            })}
            <text x="280" y="196" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="700" letterSpacing="1.2" fill="var(--label)">ONE LOOP THROUGH ALL OF THEM</text>
          </> : <>
            <path d="M 58 100 L 90 100 L 90 44 L 500 44 M 58 128 L 90 128 L 90 184 L 500 184" fill="none" stroke="#b9ab94" strokeWidth="6" strokeLinejoin="round" />
            {Array.from({ length: n }, (_, i) => {
              const x = 160 + i * (300 / n)
              const dead = broken && i === 1
              return <g key={i}>
                <path d={`M ${x} 44 L ${x} 94 M ${x} 134 L ${x} 184`} stroke="#b9ab94" strokeWidth="5" />
                <circle cx={x} cy="114" r="20"
                  fill={dead ? '#e8e0d2' : 'oklch(0.92 0.11 85)'} stroke="var(--machine)" strokeWidth="3" />
                {dead && <path d={`M ${x - 9} 105 l 18 18 M ${x + 9} 105 l -18 18`} stroke="oklch(0.55 0.17 28)" strokeWidth="3" strokeLinecap="round" />}
              </g>
            })}
            <text x="280" y="212" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="700" letterSpacing="1.2" fill="var(--label)">A SEPARATE LOOP FOR EACH</text>
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Sixty-watt bulbs on a 120-volt supply. A real filament's resistance changes with temperature, so a real string dims a little differently.
        </div>
      </div>

      <div className="hw-controls">
        <button className="hw-btn" onClick={() => setSeries((x) => !x)} aria-pressed={series}
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 20px', borderColor: 'var(--ink)', background: series ? 'var(--ink)' : 'var(--paper)', color: series ? '#f6f1e7' : 'var(--ink)' }}>
          {series ? 'WIRE THEM SEPARATELY' : 'WIRE THEM IN ONE LOOP'}
        </button>
        <button className="hw-btn" onClick={() => setBroken((b) => !b)} aria-pressed={broken}
          style={{ borderColor: broken ? 'oklch(0.55 0.17 28)' : undefined, color: broken ? 'oklch(0.48 0.17 28)' : undefined }}>
          {broken ? 'REPLACE THE DEAD BULB' : 'BREAK ONE BULB'}
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 150 }}>
          <label htmlFor="hw-n" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>{n} bulbs</label>
          <input id="hw-n" type="range" min="2" max="6" step="1" value={n}
            onChange={(e) => setN(Number(e.target.value))} style={{ width: 150, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 210, textAlign: 'right' }}>
          Break one in each arrangement, and compare.
        </span>
      </div>
    </div>
  )
}

function Stat({ label, value, u, foot, accent }) {
  return (
    <div>
      <div className="hw-readout-label">{label}</div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 24, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: accent ? 'var(--accent)' : undefined }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> {u}</span>
      </div>
      {foot && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{foot}</div>}
    </div>
  )
}
