import { useState } from 'react'

// Electricity & Energy, Lesson 14 — the field that goes round in a circle.
//
// The point that makes magnetism finally make sense: field lines always close
// on themselves. There is no magnetic equivalent of a charge for them to start
// or end on, so the lines leaving a magnet's north pole do not stop at the
// south — they continue back through the magnet itself. Every shape here is a
// closed loop, and the learner can trace one all the way round.
//
// A solenoid's field is B = μ₀nI, which is a real and checkable figure: two
// hundred turns over ten centimetres at two amps gives about 5 millitesla —
// a hundred times the Earth's field, from a battery and some wire.

const MU0 = 4 * Math.PI * 1e-7

const SHAPES = [
  {
    id: 'wire', name: `A straight wire`,
    what: `Circles around it, getting weaker with distance. Nothing points along the wire and nothing points away from it — the field simply goes round. This is what turned Ørsted's compass.`
  },
  {
    id: 'loop', name: `One loop`,
    what: `Bend the wire into a circle and all those rings reinforce each other through the middle. You now have a field that comes out of one face and goes in the other — a magnet, made of nothing but a bent wire.`
  },
  {
    id: 'coil', name: `A coil of many turns`,
    what: `Stack the loops and the field inside adds up turn by turn. The shape outside is now indistinguishable from a bar magnet's, which is the clue that a bar magnet is doing the same thing by other means.`
  },
  {
    id: 'iron', name: `The same coil, with an iron core`,
    what: `Iron responds to the field by lining up its own internal magnetism and adding it. The same current and the same turns now give a field hundreds of times stronger — until the iron runs out of alignment to give, which is called saturation.`
  },
  {
    id: 'bar', name: `A bar magnet`,
    what: `No current, no battery, no wire. Inside the iron, enormous numbers of atoms are each a tiny circling current, and in this material they stay lined up. The field outside is the same shape as the coil's for exactly that reason.`
  }
]

export default function FieldShape() {
  const [sel, setSel] = useState('wire')
  const [turns, setTurns] = useState(200)
  const [amps, setAmps] = useState(2)

  const s = SHAPES.find((x) => x.id === sel)

  // Every figure below is the textbook formula for that geometry, in millitesla.
  // Fixed dimensions: the wire is read 1 cm away, the loop is 2 cm in radius,
  // the coil is 10 cm long. Iron multiplies the coil's field about two hundred
  // times until it saturates, which real iron does between 1.5 and 2 tesla.
  const coil = MU0 * (turns / 0.1) * amps * 1000      // B = mu0 * n * I
  const raw = sel === 'wire' ? (MU0 * amps) / (2 * Math.PI * 0.01) * 1000   // mu0*I / 2*pi*d
    : sel === 'loop' ? (MU0 * amps) / (2 * 0.02) * 1000                     // mu0*I / 2r
      : sel === 'coil' ? coil
        : sel === 'iron' ? coil * 200
          : 50                                                              // a ferrite bar, at its pole
  const strength = Math.min(raw, sel === 'iron' ? 1500 : raw)
  const saturating = sel === 'iron' && raw > 1500
  const vsEarth = strength / 0.05
  const dims = sel === 'wire' ? `measured 1 cm from the wire` : sel === 'loop' ? `a loop 2 cm across the radius`
    : sel === 'bar' ? `at the pole of a ferrite magnet` : `a coil 10 cm long`

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{s.name}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 22 }}>
            {strength < 1 ? `${(strength * 1000).toFixed(0)} µT` : `${strength.toFixed(strength < 10 ? 2 : 0)} mT`}
          </span>
          <span style={{ fontSize: 11.5, color: 'var(--label)' }}>{dims}</span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {s.what}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Against the Earth's field" value={`${vsEarth < 10 ? vsEarth.toFixed(1) : Math.round(vsEarth).toLocaleString()}×`} u="" accent foot="the Earth is about 0.05 mT" />
          <Stat label="Do the lines close?" value="Always" u="" foot="there is nothing for them to end on" />
          <Stat label="Needs a current?" value={sel === 'bar' ? 'No' : 'Yes'} u=""
            foot={sel === 'bar' ? 'the currents are inside the atoms' : saturating ? 'and the iron has run out of give' : 'switch it off and it goes'} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 286, background: 'var(--paper)' }}
        role="img" aria-label={`Magnetic field lines around ${s.name.toLowerCase()}, all forming closed loops.`}>
        <svg viewBox="0 0 560 248" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 232 }}>
          {sel === 'wire' ? <>
            <circle cx="280" cy="120" r="9" fill="var(--machine)" />
            <circle cx="280" cy="120" r="4" fill="oklch(0.56 0.16 28)" />
            {[30, 54, 80, 108, 138].map((r) => (
              <g key={r}>
                <circle cx="280" cy="120" r={r} fill="none" stroke="oklch(0.52 0.13 300)" strokeWidth="2" opacity={0.85 - r / 220} />
                <path d={`M ${280 + r} 120 l -7 -6 l 0 12 z`} fill="oklch(0.48 0.12 300)" opacity={0.85 - r / 220} />
              </g>
            ))}
            <text x="280" y="236" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">looking along the wire — the field goes round it</text>
          </> : sel === 'bar' ? <>
            <rect x="222" y="98" width="116" height="44" rx="6" fill="oklch(0.62 0.15 28)" />
            <rect x="222" y="98" width="58" height="44" rx="6" fill="oklch(0.46 0.08 250)" />
            <text x="251" y="128" textAnchor="middle" fontFamily="var(--sans)" fontSize="18" fontWeight="700" fill="#f6f1e7">S</text>
            <text x="309" y="128" textAnchor="middle" fontFamily="var(--sans)" fontSize="18" fontWeight="700" fill="#f6f1e7">N</text>
            {[30, 58, 88].map((d) => (
              <path key={d} d={`M 338 120 C ${400 + d} ${120 - d * 1.5} ${160 - d} ${120 - d * 1.5} 222 120`}
                fill="none" stroke="oklch(0.52 0.13 300)" strokeWidth="2" opacity={0.8 - d / 180} />
            ))}
            {[30, 58, 88].map((d) => (
              <path key={`b${d}`} d={`M 338 120 C ${400 + d} ${120 + d * 1.5} ${160 - d} ${120 + d * 1.5} 222 120`}
                fill="none" stroke="oklch(0.52 0.13 300)" strokeWidth="2" opacity={0.8 - d / 180} />
            ))}
            <path d="M 236 120 L 324 120" stroke="oklch(0.52 0.13 300)" strokeWidth="2.4" strokeDasharray="5 4" />
            <text x="280" y="236" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
              the dashed line is the same field, continuing <tspan fontWeight="700">through</tspan> the magnet — every line is a closed loop
            </text>
          </> : <>
            {sel === 'iron' && <rect x="214" y="104" width="132" height="34" rx="5" fill="oklch(0.74 0.03 85)" stroke="var(--machine)" strokeWidth="2" />}
            {Array.from({ length: sel === 'loop' ? 1 : 7 }, (_, i) => {
              const x = sel === 'loop' ? 280 : 220 + i * 21
              return <ellipse key={i} cx={x} cy="121" rx="10" ry="34" fill="none" stroke="oklch(0.50 0.14 45)" strokeWidth="4" />
            })}
            {[26, 52, 80].map((d) => (
              <g key={d}>
                <path d={`M 352 ${121 - d * 0.3} C ${420 + d} ${121 - d * 1.4} ${140 - d} ${121 - d * 1.4} 208 ${121 - d * 0.3}`}
                  fill="none" stroke="oklch(0.52 0.13 300)" strokeWidth="2" opacity={0.8 - d / 170} />
                <path d={`M 352 ${121 + d * 0.3} C ${420 + d} ${121 + d * 1.4} ${140 - d} ${121 + d * 1.4} 208 ${121 + d * 0.3}`}
                  fill="none" stroke="oklch(0.52 0.13 300)" strokeWidth="2" opacity={0.8 - d / 170} />
              </g>
            ))}
            <path d="M 214 121 L 346 121" stroke="oklch(0.52 0.13 300)" strokeWidth="3" />
            <path d="M 300 121 l -10 -6 l 0 12 z" fill="oklch(0.48 0.12 300)" />
            <text x="280" y="236" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
              {sel === 'loop' ? 'one loop, and the field already has two faces' : 'the same shape a bar magnet makes — and for the same reason'}
            </text>
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {sel === 'bar' ? 'A typical ferrite bar magnet, measured at its pole. No current is supplied anywhere — the circulating currents are inside the atoms.'
            : sel === 'wire' ? 'The real figure for a long straight wire, read 1 cm away. The field falls off in proportion to the distance, not its square.'
              : 'Real figures for a coil of this size. Iron multiplies the field several hundredfold until it saturates, around one and a half tesla.'}
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SHAPES.map((x) => (
            <button key={x.id} className="hw-btn" onClick={() => setSel(x.id)} aria-pressed={sel === x.id}
              style={{ fontSize: 12.5, padding: '9px 12px', background: sel === x.id ? 'var(--ink)' : 'var(--paper)', color: sel === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
              {x.name}
            </button>
          ))}
        </div>
        {sel !== 'bar' && (
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 140, visibility: sel === 'wire' ? 'hidden' : 'visible' }}>
              <label htmlFor="hw-turns" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>{turns} turns</label>
              <input id="hw-turns" type="range" min="20" max="400" step="20" value={turns}
                onChange={(e) => setTurns(Number(e.target.value))} style={{ width: 140, accentColor: 'var(--accent)', height: 28 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 140 }}>
              <label htmlFor="hw-cur" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>{amps} amps</label>
              <input id="hw-cur" type="range" min="1" max="6" step="1" value={amps}
                onChange={(e) => setAmps(Number(e.target.value))} style={{ width: 140, accentColor: 'var(--accent)', height: 28 }} />
            </div>
          </div>
        )}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 220, textAlign: 'right' }}>
          Compare the last two. They make the same shape.
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
