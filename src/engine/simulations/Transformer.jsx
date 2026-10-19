import { useState } from 'react'

// Electricity & Energy, Lesson 9 — trading push for flow.
//
// A transformer swaps voltage for current and keeps the product — which sounds
// like an accountant's trick until you remember Week 1's Lesson 5: heat lost in
// a wire is I²R, and it goes as the square. Halve the current and you quarter
// the loss. Raise the voltage a hundred times and the loss falls ten thousand.
//
// The numbers here are a real transmission problem: 100 MW down a line with
// about 10 ohms of resistance. At 10 kV the loss exceeds the power being sent,
// which is not a disadvantage but an impossibility — and that single result is
// why the grid runs at hundreds of thousands of volts.

const POWER = 100e6     // watts to deliver
const LINE_R = 10       // ohms, a long line

export default function Transformer() {
  const [kv, setKv] = useState(140)
  const [turns, setTurns] = useState(10)

  const volts = kv * 1000
  const current = POWER / volts
  const loss = current * current * LINE_R
  const lossPct = (loss / POWER) * 100
  const possible = lossPct < 100

  // The small transformer: 120 V in, turns ratio out.
  const inV = 120
  const outV = inV * turns
  const inA = 2
  const outA = inA / turns

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Sending 100 megawatts down the line</span>
          <span className="hw-readout-num" style={{ color: lossPct > 20 ? 'oklch(0.52 0.16 28)' : 'var(--accent)' }}>
            {lossPct.toFixed(lossPct >= 100 ? 0 : 1)}%
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> lost as heat</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {!possible
              ? 'The line would waste more than you are sending, which is not a bad deal — it is an impossibility. You cannot transmit power at this voltage at all.'
              : lossPct > 20
                ? 'Most of it is arriving, but a great deal is heating the countryside. This is why nobody builds a grid at these voltages.'
                : 'Almost all of it arrives. The current is low, and heat in a wire goes as the current squared — which is the whole reason the grid looks the way it does.'}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Line voltage" value={kv} u="kV" foot="what the transformer put it to" />
          <Stat label="Current in the line" value={current < 1000 ? Math.round(current) : `${(current / 1000).toFixed(1)}k`} u="amps" accent
            foot="higher voltage, lower current" />
          <Stat label="Heat lost in the wire" value={(loss / 1e6).toFixed(loss / 1e6 >= 100 ? 0 : 2)} u="MW" foot="and it goes as the square" />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 292, background: 'var(--paper)' }}
        role="img" aria-label={`A transmission line carrying 100 megawatts at ${kv} kilovolts, losing ${lossPct.toFixed(1)} per cent as heat.`}>
        <svg viewBox="0 0 560 254" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 238 }}>
          <text x="40" y="22" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">A SMALL TRANSFORMER — PUSH TRADED FOR FLOW</text>
          <g transform="translate(0 6)">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path key={`p${i}`} d={`M 92 ${42 + i * 10} q -14 5 0 10`} fill="none" stroke="oklch(0.52 0.12 45)" strokeWidth="3" />
            ))}
            <rect x="104" y="36" width="16" height="72" fill="var(--machine)" opacity="0.5" />
            {Array.from({ length: Math.min(18, turns + 2) }, (_, i) => (
              <path key={`s${i}`} d={`M 132 ${38 + i * 4} q 14 2 0 4`} fill="none" stroke="oklch(0.50 0.13 300)" strokeWidth="2.2" />
            ))}
            <text x="72" y="126" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">{inV} V · {inA} A</text>
            <text x="160" y="126" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">{outV.toLocaleString()} V · {outA.toFixed(2)} A</text>
            <text x="116" y="146" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="700" fill="oklch(0.40 0.12 155)">
              {(inV * inA).toLocaleString()} W in · {Math.round(outV * outA).toLocaleString()} W out
            </text>
          </g>

          <line x1="40" y1="172" x2="520" y2="172" stroke="var(--rule-2)" strokeWidth="1.5" />
          <text x="40" y="192" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">AND THE SAME TRICK, ACROSS A COUNTRY</text>
          <rect x="40" y="202" width="46" height="36" rx="7" fill="oklch(0.86 0.08 45)" stroke="oklch(0.44 0.12 45)" strokeWidth="2.2" />
          <text x="63" y="224" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="var(--ink)">PLANT</text>
          <rect x="474" y="202" width="46" height="36" rx="7" fill="oklch(0.86 0.06 235)" stroke="oklch(0.44 0.10 235)" strokeWidth="2.2" />
          <text x="497" y="224" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="var(--ink)">TOWN</text>
          <line x1="86" y1="214" x2="474" y2="214" stroke="oklch(0.70 0.04 85)" strokeWidth="9" strokeLinecap="round" />
          <line x1="86" y1="214" x2={86 + Math.min(388, (lossPct / 100) * 388)} y2="214"
            stroke="oklch(0.58 0.17 28)" strokeWidth="9" strokeLinecap="round" />
          <text x="280" y="236" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill={lossPct > 20 ? 'oklch(0.48 0.16 28)' : 'var(--muted)'}>
            {!possible ? 'the whole line is heat — nothing arrives' : `red is what heats the wire · ${(100 - lossPct).toFixed(1)}% arrives`}
          </text>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          A real transmission problem, simplified: one line, one resistance, no reactance. Real grids are more complicated and the reasoning is exactly this.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 230 }}>
          <label htmlFor="hw-kv" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Line voltage · {kv} kV</label>
          <input id="hw-kv" type="range" min="10" max="500" step="10" value={kv}
            onChange={(e) => setKv(Number(e.target.value))} style={{ width: 230, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 190 }}>
          <label htmlFor="hw-turns" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Turns ratio · 1 to {turns}</label>
          <input id="hw-turns" type="range" min="2" max="20" step="1" value={turns}
            onChange={(e) => setTurns(Number(e.target.value))} style={{ width: 190, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          Drag the line voltage down to 10 kV and read the loss.
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
