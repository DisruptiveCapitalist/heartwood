import { useState } from 'react'
import { currentAt, maxPower, voc, isc, fillFactor } from '../../lib/panel.js'

// Electricity & Energy, Lesson 20 — the panel's best moment.
//
// A panel does not have "an output". It has a curve, and every point on that
// curve is a different trade between volts and amps. Only one of them is the
// most power, and both ends of the curve deliver precisely nothing:
//
//   short circuit   13.7 A at 0 V    = 0 W
//   open circuit     0 A at 37.4 V   = 0 W
//   the knee        13.1 A at 30.8 V = 402 W
//
// The two controls move the curve in two different directions, which is the
// part worth seeing. More light raises it — current follows the sunlight almost
// exactly. More heat narrows it — voltage falls about 0.29% for every degree.
// So the best day for a panel is bright and COLD, and a 402 W panel on a 65 °C
// roof in full sun makes 339 W, which is 16% below its label.
//
// Everything here sets up Lesson 21: the knee moves all day, so something has
// to keep finding it.

const W = 520, H = 190, PADL = 44, PADB = 30

const watts = (n) => `${Math.round(n)} ${Math.round(n) === 1 ? 'watt' : 'watts'}`

export default function IVCurve() {
  const [vPct, setVPct] = useState(82)
  const [irr, setIrr] = useState(1000)
  const [degC, setDegC] = useState(25)

  const Vo = voc(degC)
  const Io = isc(irr)
  const mpp = maxPower(irr, degC)
  const ff = fillFactor(irr, degC)

  const V = (vPct / 100) * Vo
  const I = currentAt(V, irr, degC)
  const P = V * I
  const atKnee = Math.abs(P - mpp.p) < mpp.p * 0.02 && mpp.p > 0

  // Axes are pinned to standard conditions so the curve visibly shrinks.
  const VMAX = 40, IMAX = 14
  const px = (v) => PADL + (v / VMAX) * (W - PADL - 14)
  const py = (i) => H - PADB - (i / IMAX) * (H - PADB - 14)
  const pyP = (p) => H - PADB - (p / 420) * (H - PADB - 14)

  const curve = []
  const power = []
  for (let k = 0; k <= 90; k++) {
    const v = (k / 90) * Vo
    const i = currentAt(v, irr, degC)
    curve.push(`${k === 0 ? 'M' : 'L'} ${px(v).toFixed(1)} ${py(i).toFixed(1)}`)
    power.push(`${k === 0 ? 'M' : 'L'} ${px(v).toFixed(1)} ${pyP(v * i).toFixed(1)}`)
  }

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">
            {P < 1 ? 'Delivering nothing at all' : atKnee ? 'At the knee — the best it can do' : 'Working, but not at its best'}
          </span>
          <span className="hw-readout-num" style={{ color: atKnee ? 'oklch(0.45 0.13 150)' : 'var(--accent)' }}>
            {Math.round(P)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> watts</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 246, minHeight: 74, marginTop: 4 }}>
            {vPct <= 2
              ? `Short circuit. The current is at its maximum and the voltage is zero, so the power is zero. The panel is working as hard as it can and delivering nothing whatever.`
              : vPct >= 99
                ? `Open circuit. The voltage is at its maximum and no current flows, so again the power is zero. Both ends of this curve are useless.`
                : atKnee
                  ? `This is the knee. Push the voltage higher and the current collapses; pull it lower and you give away voltage for almost no extra current. One point on the whole curve, and it is worth ${Math.round(mpp.p)} watts.`
                  : P < mpp.p * 0.8
                    ? `Well away from the knee — you are leaving ${watts(mpp.p - P)} on the roof. Everything the panel could be making is still there; it is simply not being asked for correctly.`
                    : `Close, but not quite. The knee is at ${mpp.v.toFixed(1)} volts and there are still ${watts(mpp.p - P)} to be had.`}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Right now" value={`${V.toFixed(1)} V × ${I.toFixed(1)} A`} u="" accent={atKnee} foot={`the best here is ${Math.round(mpp.p)} W`} />
          <Stat label="Open circuit / short circuit" value={`${Vo.toFixed(1)} V / ${Io.toFixed(1)} A`} u=""
            foot="both of them worth zero watts" />
          <Stat label="Fill factor" value={(ff * 100).toFixed(0)} u="%"
            foot="how square the curve is — 75 to 80 is normal" />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 262, background: 'var(--paper)' }}
        role="img" aria-label={`Current-voltage curve for a solar panel at ${irr} watts per square metre and ${degC} degrees, operating at ${V.toFixed(1)} volts and ${I.toFixed(1)} amps, which is ${Math.round(P)} watts.`}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '10px 0 auto 0', width: '100%', height: 200 }}>
          <line x1={PADL} y1={H - PADB} x2={W - 10} y2={H - PADB} stroke="var(--rule-2)" strokeWidth="1.5" />
          <line x1={PADL} y1="10" x2={PADL} y2={H - PADB} stroke="var(--rule-2)" strokeWidth="1.5" />
          {[0, 10, 20, 30, 40].map((v) => (
            <g key={v}>
              <line x1={px(v)} y1={H - PADB} x2={px(v)} y2={H - PADB + 4} stroke="var(--rule-2)" strokeWidth="1.2" />
              <text x={px(v)} y={H - PADB + 16} textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fill="var(--muted)">{v}V</text>
            </g>
          ))}
          {[0, 5, 10].map((i) => (
            <text key={i} x={PADL - 6} y={py(i) + 3.5} textAnchor="end" fontFamily="var(--sans)" fontSize="10" fill="var(--muted)">{i}A</text>
          ))}

          <path d={power.join(' ')} fill="none" stroke="oklch(0.70 0.11 65)" strokeWidth="2" strokeDasharray="5 4" />
          <path d={curve.join(' ')} fill="none" stroke="oklch(0.44 0.13 250)" strokeWidth="2.6" />

          {mpp.p > 0 && <>
            <rect x={px(0)} y={py(mpp.i)} width={px(mpp.v) - px(0)} height={py(0) - py(mpp.i)}
              fill="oklch(0.52 0.13 150)" opacity="0.13" />
            <circle cx={px(mpp.v)} cy={py(mpp.i)} r="4.5" fill="none" stroke="oklch(0.42 0.12 150)" strokeWidth="2" />
            {/* Anchored to the LEFT of the knee and clamped to the plot. Placed to
                the right it runs under the legend, and SVG does not clip text — it
                simply draws one label across the other. */}
            <text x={px(mpp.v) - 9} y={Math.max(13, py(mpp.i) - 8)} textAnchor="end"
              fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="oklch(0.40 0.12 150)">
              the knee · {Math.round(mpp.p)} W
            </text>
          </>}

          <line x1={px(V)} y1="10" x2={px(V)} y2={H - PADB} stroke="oklch(0.52 0.16 28)" strokeWidth="1.6" strokeDasharray="4 3" />
          <circle cx={px(V)} cy={py(I)} r="6" fill="oklch(0.56 0.17 28)" stroke="var(--paper)" strokeWidth="2" />

          <text x={W - 12} y="22" textAnchor="end" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="oklch(0.60 0.11 65)">power (dashed)</text>
          <text x={W - 12} y="36" textAnchor="end" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="oklch(0.44 0.13 250)">current (solid)</text>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 8, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          The shaded rectangle is the power you are getting: volts across, amps up. Its area is the whole of what a panel does.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 180 }}>
          <label htmlFor="hw-op" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Working at · {V.toFixed(1)} V</label>
          <input id="hw-op" type="range" min="0" max="100" step="0.1" value={vPct}
            onChange={(e) => setVPct(Number(e.target.value))} style={{ width: 180, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 150 }}>
          <label htmlFor="hw-irr" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Sunlight · {irr} W/m²</label>
          <input id="hw-irr" type="range" min="100" max="1000" step="100" value={irr}
            onChange={(e) => setIrr(Number(e.target.value))} style={{ width: 150, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 150 }}>
          <label htmlFor="hw-temp" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Cell at · {degC} °C</label>
          <input id="hw-temp" type="range" min="-10" max="70" step="5" value={degC}
            onChange={(e) => setDegC(Number(e.target.value))} style={{ width: 150, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ flex: 1 }} />
        <button className="hw-btn" onClick={() => setVPct(Number(((mpp.v / Vo) * 100).toFixed(1)))}
          style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.1em', padding: '11px 16px', borderColor: 'var(--ink)' }}>
          FIND THE KNEE
        </button>
      </div>
    </div>
  )
}

function Stat({ label, value, u, foot, accent }) {
  return (
    <div>
      <div className="hw-readout-label">{label}</div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: accent ? 'oklch(0.45 0.13 150)' : undefined }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> {u}</span>
      </div>
      {foot && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{foot}</div>}
    </div>
  )
}
