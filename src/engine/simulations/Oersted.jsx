import { useState } from 'react'

// Electricity & Energy, Lesson 11 — the compass that flinches.
//
// Ørsted's 1820 observation, made measurable. The field around a straight wire
// is B = μ₀I / 2πr, and the needle settles along the sum of that field and the
// Earth's own — so the deflection is the arctangent of the ratio between them.
//
// Those two numbers are why nobody noticed for decades. At a centimetre from a
// ten-amp wire the field is about four times the Earth's and the needle swings
// right round; at half a metre it is a twelfth of it and barely twitches. You
// need a strong current and a close compass, and before about 1800 there were
// no strong steady currents to be had anywhere.

const EARTH = 50             // microtesla
const MU0 = 4 * Math.PI * 1e-7

/** Field from a long straight wire, in microtesla. */
const fieldAt = (amps, cm) => (MU0 * amps) / (2 * Math.PI * (cm / 100)) * 1e6

export default function Oersted() {
  const [amps, setAmps] = useState(10)
  const [cm, setCm] = useState(2)
  const [on, setOn] = useState(true)
  const [reversed, setReversed] = useState(false)
  const [below, setBelow] = useState(false)

  const b = on ? fieldAt(amps, cm) : 0
  const ratio = b / EARTH
  // The needle settles along the sum of the two fields.
  const deflect = (Math.atan(ratio) * 180) / Math.PI
  const sign = (reversed ? -1 : 1) * (below ? -1 : 1)
  const angle = deflect * sign

  const verdict = deflect < 3 ? 'Barely moves' : deflect < 25 ? 'A clear nudge' : deflect < 60 ? 'Swings well over' : 'Almost at right angles'

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">The needle</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 23 }}>{on ? verdict : 'Points north'}</span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {!on
              ? 'With no current the needle does what a compass has always done — lines up with the Earth and sits there.'
              : below
                ? 'Underneath the wire it swings the **other** way. The field is not pushing outward from the wire; it is going round it.'
                : deflect < 10
                  ? 'Almost nothing. The wire’s field here is a small fraction of the Earth’s, and the Earth wins. This is why the effect went unnoticed for so long.'
                  : 'The needle has turned to sit across the wire rather than along it, which is the strange part — it is not attracted to the wire, it is lining up with something that circles it.'}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Field from the wire" value={on ? b.toFixed(b < 10 ? 1 : 0) : 0} u="µT" accent foot="falls off with distance" />
          <Stat label="Against the Earth's" value={on ? `${ratio.toFixed(ratio < 1 ? 2 : 1)}×` : '0×'} u="" foot={`the Earth is about ${EARTH} µT`} />
          <Stat label="Needle turned by" value={Math.abs(angle).toFixed(0)} u="°" foot={deflect > 60 ? 'nearly square to the wire' : 'away from north'} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 286, background: 'var(--paper)' }}
        role="img" aria-label={`A straight wire with a compass ${below ? 'below' : 'above'} it at ${cm} centimetres, the needle turned ${Math.abs(angle).toFixed(0)} degrees.`}>
        <svg viewBox="0 0 560 248" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 232 }}>
          <line x1="40" y1="124" x2="520" y2="124" stroke="#b9ab94" strokeWidth="9" strokeLinecap="round" />
          {on && [1, 2, 3, 4, 5].map((i) => {
            const r = 22 + i * 17
            return <g key={i} opacity={0.22 + 0.1 * (6 - i)}>
              <ellipse cx="280" cy="124" rx={r * 0.5} ry={r} fill="none" stroke="oklch(0.52 0.13 300)" strokeWidth="1.6" />
            </g>
          })}
          {on && [0, 1, 2].map((i) => {
            const x = 150 + i * 130
            const dir = reversed ? -1 : 1
            return <path key={i} d={`M ${x} 124 l ${dir * 22} -7 l 0 14 z`} fill="oklch(0.52 0.16 28)" />
          })}
          <text x="40" y="112" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">
            {on ? `A WIRE CARRYING ${amps} ${amps === 1 ? 'AMP' : 'AMPS'}` : 'A WIRE CARRYING NOTHING'}
          </text>

          <g transform={`translate(280 ${below ? 124 + cm * 3.4 : 124 - cm * 3.4})`}>
            <circle r="30" fill="var(--card)" stroke="var(--machine)" strokeWidth="2.6" />
            <text y="-34" textAnchor="middle" fontFamily="var(--sans)" fontSize="10" fontWeight="700" fill="var(--muted)">N</text>
            <g transform={`rotate(${angle})`}>
              <path d="M 0 -22 L 6 6 L 0 2 L -6 6 Z" fill="oklch(0.56 0.17 28)" />
              <path d="M 0 22 L 6 -6 L 0 -2 L -6 -6 Z" fill="oklch(0.42 0.04 250)" />
            </g>
            <circle r="3" fill="var(--machine)" />
          </g>
          <line x1="310" y1="124" x2="310" y2={below ? 124 + cm * 3.4 : 124 - cm * 3.4} stroke="var(--rule)" strokeWidth="1.4" strokeDasharray="4 4" />
          <text x="318" y={124 + (below ? cm * 1.7 : -cm * 1.7)} fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">{cm} cm</text>
          <text x="40" y="236" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
            the rings are the wire's own field — notice that they go <tspan fontWeight="700">round</tspan> it, not out from it
          </text>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Field strengths are the real ones for a long straight wire — the field falls off in proportion to the distance, not its square. A compass really does behave like this.
        </div>
      </div>

      <div className="hw-controls">
        <button className="hw-btn" onClick={() => setOn((x) => !x)} aria-pressed={on}
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '12px 18px', borderColor: 'var(--ink)', background: on ? 'var(--ink)' : 'var(--paper)', color: on ? '#f6f1e7' : 'var(--ink)' }}>
          {on ? 'SWITCH THE CURRENT OFF' : 'SWITCH IT ON'}
        </button>
        <button className="hw-btn" onClick={() => setReversed((x) => !x)} disabled={!on}>REVERSE IT</button>
        <button className="hw-btn" onClick={() => setBelow((x) => !x)}>{below ? 'COMPASS ABOVE' : 'COMPASS BELOW'}</button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 150 }}>
          <label htmlFor="hw-cm" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>{cm} cm away</label>
          <input id="hw-cm" type="range" min="1" max="30" step="1" value={cm}
            onChange={(e) => setCm(Number(e.target.value))} style={{ width: 150, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 150 }}>
          <label htmlFor="hw-amps" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>{amps} amps</label>
          <input id="hw-amps" type="range" min="1" max="30" step="1" value={amps}
            onChange={(e) => setAmps(Number(e.target.value))} style={{ width: 150, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 220, textAlign: 'right' }}>
          Put the compass below the wire and watch which way it goes.
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
