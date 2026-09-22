import { useState } from 'react'

// Energy travelling through a machine, losing some of itself at every handover.
//
// Lesson 14 uses one chain — water to light bulb — to show that a generator
// converts rather than creates. Lesson 15 stacks several chains side by side so
// the learner can see that "wasted" energy was never destroyed, only sent
// somewhere nobody wanted it.
//
// The band's width is the energy still travelling. Every stub peeling off it is
// drawn to the same scale, so the picture cannot flatter a machine.

const W = 560
const LANE = 74
const TOP = 26

function Chain({ chain, input, unit, y, showTitle }) {
  const steps = chain.steps
  const x0 = 88
  const x1 = W - 76
  const stepW = (x1 - x0) / steps.length

  // Rounding each loss on its own made the printed numbers add to 101 out of
  // 100 — which is an unfortunate thing for a diagram about conservation to do.
  // The displayed losses are differences between displayed flows instead, so
  // what is on screen always adds up.
  let flow = input
  const bands = []
  for (const [i, s] of steps.entries()) {
    const out = flow * s.efficiency
    bands.push({
      ...s,
      from: flow, to: out,
      shownFrom: Math.round(flow), shownTo: Math.round(out),
      x: x0 + i * stepW, w: stepW
    })
    flow = out
  }
  const thick = (v) => Math.max(1.5, (v / input) * 34)

  return (
    <g transform={`translate(0, ${y})`}>
      {showTitle && (
        <text x="0" y="-6" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.4" fill="var(--label)">
          {chain.label.toUpperCase()}
        </text>
      )}

      <text x="0" y="26" fontFamily="var(--sans)" fontSize="12" fill="var(--ink-2)">{chain.inputLabel}</text>
      <rect x="0" y="30" width={x0} height={thick(input)} fill="var(--accent)" />

      {bands.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={30} width={b.w} height={thick(b.from)} fill="var(--accent)" opacity={0.92 - i * 0.06} />
          <text x={b.x + 3} y={24} fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">{b.label}</text>
          {/* what falls out here */}
          {b.shownFrom - b.shownTo > 0 && (
            <>
              <rect x={b.x + b.w - 5} y={30 + thick(b.to)} width="5" height={thick(b.from - b.to)} fill="var(--brake)" />
              <rect x={b.x + b.w - 5} y={30 + thick(b.from)} width={Math.max(6, stepW * 0.5)} height={Math.max(1.5, thick(b.from - b.to))} fill="var(--brake)" opacity="0.55" />
              <text
                x={b.x + b.w - 2} y={30 + thick(b.from) + thick(b.from - b.to) + 11}
                fontFamily="var(--sans)" fontSize="10.5" fill="var(--brake)"
              >
                {b.lossLabel} · {b.shownFrom - b.shownTo}
              </text>
            </>
          )}
        </g>
      ))}

      <rect x={x1} y={30} width={40} height={thick(flow)} fill="var(--green)" />
      <text x={x1 + 44} y={30 + Math.max(11, thick(flow) / 2 + 4)} fontFamily="var(--sans)" fontSize="12" fontWeight="600" fill="var(--green-text)">
        {Math.round(flow)} {unit}
      </text>
      <text x={x1 + 44} y={30 + Math.max(11, thick(flow) / 2 + 4) + 14} fontFamily="var(--sans)" fontSize="10.5" fill="var(--muted)">
        {((flow / input) * 100).toFixed(0)}% useful
      </text>
    </g>
  )
}

export default function EnergyChain({
  chains = [],
  unit = 'units',
  amountLabel = 'Energy going in',
  amountMin = 20,
  amountMax = 200,
  amountDefault = 100,
  caption = ''
}) {
  const [amount, setAmount] = useState(amountDefault)
  const height = TOP + chains.length * LANE + 26
  const best = chains.reduce((b, c) => {
    const e = c.steps.reduce((p, s) => p * s.efficiency, 1)
    return e > b.e ? { e, label: c.label } : b
  }, { e: 0, label: '' })

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{amountLabel}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>
            {amount}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> {unit}</span>
          </span>
        </div>
        <div data-align="right" style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">Reading the picture</span>
          <span style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>
            The wide band is energy still travelling. Every red stub is energy that left, and it is drawn to the same scale.
          </span>
          {chains.length > 1 && (
            <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>
              Best here: {best.label}, at {(best.e * 100).toFixed(0)}%.
            </span>
          )}
        </div>
      </div>

      <div className="hw-stage" style={{ height: Math.max(230, height + 34), background: 'var(--paper)' }} role="img" aria-label={caption || 'An energy flow diagram, narrowing at every stage as energy leaves as heat.'}>
        <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: height }}>
          {chains.map((c, i) => (
            <Chain key={c.id} chain={c} input={amount} unit={unit} y={TOP + i * LANE} showTitle={chains.length > 1} />
          ))}
        </svg>
        {caption && (
          <div style={{ position: 'absolute', left: 22, bottom: 12, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
            {caption}
          </div>
        )}
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 280 }}>
          <label htmlFor="hw-energy-in" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            {amountLabel} · {amount} {unit}
          </label>
          <input id="hw-energy-in" type="range" min={amountMin} max={amountMax} step="5"
            value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            style={{ width: 280, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 320, textAlign: 'right' }}>
          Turn it up and every part of the picture grows together. The shares never change.
        </span>
      </div>
    </div>
  )
}
