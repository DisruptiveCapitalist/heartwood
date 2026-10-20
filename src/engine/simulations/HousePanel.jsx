import { useState } from 'react'

// Electricity & Energy, Lesson 29 — your house, from the meter inward.
//
// The misconception this exists to break: a breaker does not protect the
// appliance, and it does not protect you from shock. It protects the WIRE. Its
// rating is chosen from the gauge of the cable behind the wall, so that the
// cable can never be made hot enough to set fire to the house. That is why a
// 15 A breaker sits on 14-gauge wire and a 30 A breaker on 10-gauge, and why
// fitting a larger breaker "because it keeps tripping" is the one genuinely
// dangerous thing an amateur can do at a panel.
//
// Real North American figures. 240 V split-phase service, 200 A main:
//
//   15 A  14 AWG  120 V  1,800 W    lighting, general outlets
//   20 A  12 AWG  120 V  2,400 W    kitchen and bathroom outlets
//   30 A  10 AWG  240 V  7,200 W    clothes dryer
//   40 A   8 AWG  240 V  9,600 W    electric range
//   50 A   6 AWG  240 V 12,000 W    car charger
//
// The everyday scenario is the kitchen one: a kettle at 1,500 W, a toaster at
// 1,200 and a microwave at 1,200 on the 20 A kitchen circuit draw 32.5 A between them,
// which is more than twice what the wire is rated to carry. The breaker opens
// in a second or two, and the lesson is that it was doing its job rather than
// failing at it.
//
// The 80% rule is real and is why a 50 A charger circuit is only allowed to
// draw 40 A continuously: breakers are rated for continuous duty at four
// fifths of their number.

const CIRCUITS = [
  { id: 'lights', name: `Lighting`, amps: 15, awg: 14, volts: 120, note: `Ceiling lights through most of the house. Modern LEDs draw so little that this circuit is almost never troubled.` },
  { id: 'living', name: `Living room outlets`, amps: 15, awg: 14, volts: 120, note: `General-purpose outlets. Electronics are light work; a space heater on one of these is the usual cause of trouble.` },
  { id: 'kitchen', name: `Kitchen outlets`, amps: 20, awg: 12, volts: 120, note: `Heavier wire and a bigger breaker than the rest of the house, because everything in a kitchen makes heat — and heat means amps.` },
  { id: 'dryer', name: `Clothes dryer`, amps: 30, awg: 10, volts: 240, note: `Its own 240 V circuit. Both live wires, no neutral needed for the heating element — which is why the plug has a different shape.` },
  { id: 'range', name: `Electric range`, amps: 40, awg: 8, volts: 240, note: `The biggest ordinary load in a house. Thick cable, and a breaker chosen to match that cable rather than the cooker.` },
  { id: 'ev', name: `Car charger`, amps: 50, awg: 6, volts: 240, note: `Continuous for hours, so the 80% rule bites: a 50 A circuit may only be asked for 40 A, which is 9.6 kW.` }
]

const LOADS = {
  lights: [
    { name: `12 LED bulbs`, w: 120 }, { name: `12 old filament bulbs`, w: 720 }, { name: `Outside floodlight`, w: 150 }
  ],
  living: [
    { name: `Television`, w: 100 }, { name: `Laptop and router`, w: 90 }, { name: `Vacuum cleaner`, w: 1000 }, { name: `Space heater`, w: 1500 }
  ],
  kitchen: [
    { name: `Fridge`, w: 150 }, { name: `Kettle`, w: 1500 }, { name: `Toaster`, w: 1200 }, { name: `Microwave`, w: 1200 }
  ],
  dryer: [{ name: `Dryer, heating`, w: 5000 }, { name: `Dryer, drum only`, w: 300 }],
  range: [{ name: `Oven`, w: 3000 }, { name: `Two large rings`, w: 4800 }, { name: `All four rings`, w: 7600 }],
  ev: [{ name: `Charging at 40 A`, w: 9600 }, { name: `Charging at 24 A`, w: 5760 }]
}

export default function HousePanel() {
  const [pick, setPick] = useState('kitchen')
  const [on, setOn] = useState({})

  const c = CIRCUITS.find((x) => x.id === pick)
  const loads = LOADS[pick]
  const watts = loads.reduce((sum, l, i) => sum + (on[`${pick}-${i}`] ? l.w : 0), 0)
  const amps = watts / c.volts
  const pctOfBreaker = (amps / c.amps) * 100
  const tripped = amps > c.amps
  const overContinuous = !tripped && amps > c.amps * 0.8

  // Everything else in the house, against a 200 A service.
  const houseAmps = 32 + watts / 240
  const servicePct = (houseAmps / 200) * 100

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{tripped ? 'The breaker has opened' : c.name}</span>
          <span className="hw-readout-num" style={{ color: tripped ? 'oklch(0.52 0.16 28)' : 'var(--accent)', fontSize: 23 }}>
            {amps.toFixed(1)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> A of {c.amps} A</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 246, minHeight: 74, marginTop: 4 }}>
            {tripped
              ? `More current than the cable behind the wall is rated to carry, so the breaker opened. It is not protecting the kettle and it is not protecting you — it is making sure that ${c.awg}-gauge wire never gets hot enough to start a fire.`
              : overContinuous
                ? `Over four fifths of the rating. A breaker will hold this, but not indefinitely — the rules only allow a circuit to be loaded to 80% of its number for hours at a time, which is why this matters most for car chargers and heaters.`
                : c.note}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="What the breaker protects" value={`${c.awg} AWG`} u="wire"
            foot="not the appliance, and not you" />
          <Stat label="Drawing" value={watts.toLocaleString()} u="W" accent={!tripped}
            foot={`the limit is ${(c.amps * c.volts).toLocaleString()} W at ${c.volts} V`} />
          <Stat label="Whole house, of 200 A" value={houseAmps.toFixed(0)} u="A"
            foot={`${servicePct.toFixed(0)}% of the service — the main breaker is fine`} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 286, background: 'var(--paper)' }}
        role="img" aria-label={`A breaker panel with the ${c.name} circuit selected, drawing ${amps.toFixed(1)} amps of its ${c.amps} amp rating${tripped ? ' and tripped' : ''}.`}>
        <svg viewBox="0 0 560 248" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 216 }}>
          {/* the panel — circuit names go INSIDE it, as they do on a real one,
              so they cannot collide with the bars in the right-hand column */}
          <rect x="20" y="18" width="272" height="206" rx="4" fill="oklch(0.90 0.01 250)" stroke="var(--machine)" strokeWidth="2" />
          <rect x="38" y="30" width="236" height="26" rx="3" fill="oklch(0.42 0.03 250)" />
          <text x="156" y="48" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="#f6f1e7">MAIN · 200 A</text>
          <line x1="50" y1="60" x2="50" y2="218" stroke="oklch(0.55 0.02 250)" strokeWidth="3" />
          <line x1="92" y1="60" x2="92" y2="218" stroke="oklch(0.55 0.02 250)" strokeWidth="3" />
          <text x="156" y="238" textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fill="var(--muted)">two busbars · 120 V each · 240 V across</text>

          {CIRCUITS.map((x, i) => {
            const y = 68 + i * 26
            const here = x.id === pick
            const off = here && tripped
            return <g key={x.id} onClick={() => setPick(x.id)} style={{ cursor: 'pointer' }}>
              <rect x={off ? 52 : 46} y={y} width="52" height="18" rx="2"
                fill={off ? 'oklch(0.60 0.17 28)' : here ? 'oklch(0.58 0.14 45)' : 'oklch(0.80 0.02 250)'}
                stroke="var(--machine)" strokeWidth={here ? 2 : 1} />
              <text x={off ? 78 : 72} y={y + 13} textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fontWeight="700"
                fill={here ? '#f6f1e7' : 'var(--muted)'}>{x.amps}A</text>
              <text x="110" y={y + 13} textAnchor="start" fontFamily="var(--sans)" fontSize="10.5"
                fontWeight={here ? 700 : 500} fill={here ? 'var(--ink)' : 'var(--muted)'}>{x.name}</text>
            </g>
          })}

          {/* load against the rating */}
          <text x="428" y="40" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" letterSpacing="0.9" fill="var(--label)">
            THIS CIRCUIT
          </text>
          <rect x="348" y="52" width="160" height="22" rx="3" fill="oklch(0.90 0.01 85)" stroke="var(--machine)" strokeWidth="1.2" />
          <rect x="348" y="52" width={Math.min(160, (pctOfBreaker / 100) * 160)} height="22" rx="3"
            fill={tripped ? 'oklch(0.58 0.17 28)' : overContinuous ? 'oklch(0.70 0.13 70)' : 'oklch(0.52 0.13 150)'} />
          <line x1={348 + 160 * 0.8} y1="48" x2={348 + 160 * 0.8} y2="78" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x={348 + 160 * 0.8} y="90" textAnchor="middle" fontFamily="var(--sans)" fontSize="9.5" fill="var(--muted)">80%</text>
          <text x="428" y="112" textAnchor="middle" fontFamily="var(--sans)" fontSize="13" fontWeight="700"
            fill={tripped ? 'oklch(0.50 0.16 28)' : 'var(--ink)'}>
            {tripped ? 'TRIPPED' : `${pctOfBreaker.toFixed(0)}% of the breaker`}
          </text>

          <text x="428" y="152" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" letterSpacing="0.9" fill="var(--label)">
            THE WHOLE HOUSE
          </text>
          <rect x="348" y="164" width="160" height="22" rx="3" fill="oklch(0.90 0.01 85)" stroke="var(--machine)" strokeWidth="1.2" />
          <rect x="348" y="164" width={Math.min(160, (servicePct / 100) * 160)} height="22" rx="3" fill="oklch(0.46 0.10 250)" />
          <text x="428" y="204" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
            {houseAmps.toFixed(0)} A of 200
          </text>
          <text x="428" y="222" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontStyle="italic" fill="var(--muted)">
            a circuit trips long before the house does
          </text>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Typical North American figures. The breaker's number is chosen from the wire's gauge — never from what you intend to plug in.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {loads.map((l, i) => {
            const key = `${pick}-${i}`
            const active = !!on[key]
            return <button key={key} className="hw-btn" onClick={() => setOn((o) => ({ ...o, [key]: !o[key] }))} aria-pressed={active}
              style={{ fontSize: 12, padding: '9px 11px', background: active ? 'var(--ink)' : 'var(--paper)', color: active ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
              {l.name} · {l.w >= 1000 ? `${(l.w / 1000).toFixed(1)} kW` : `${l.w} W`}
            </button>
          })}
        </div>
        <span style={{ flex: 1 }} />
        <button className="hw-btn" onClick={() => setOn({})}
          style={{ fontSize: 12.5, padding: '10px 14px', borderColor: 'var(--ink)' }}>
          SWITCH EVERYTHING OFF
        </button>
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 200, textAlign: 'right' }}>
          Kettle, toaster and microwave together, on the kitchen circuit.
        </span>
      </div>
    </div>
  )
}

function Stat({ label, value, u, foot, accent }) {
  return (
    <div>
      <div className="hw-readout-label">{label}</div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: accent ? 'var(--accent)' : undefined }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> {u}</span>
      </div>
      {foot && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{foot}</div>}
    </div>
  )
}
