import { useState } from 'react'

// Electricity & Energy, Lesson 17 — the one-way door.
//
// Lesson 16 ended with a problem it could not solve: light frees an electron,
// and then the electron falls straight back where it came from. A slab of pure
// silicon in full sun does nothing but get warm. This lesson is the missing
// half — the built-in electric field that catches the electron before it can
// fall back, and which exists because of two deliberate impurities.
//
// Silicon has four outer electrons. Phosphorus has five, so one is spare: that
// is N-type. Boron has three, so one is missing: that is P-type, and the gap is
// a "hole" that behaves like a positive carrier. Join the two and electrons
// diffuse across, leaving charged ions behind and building a field of about
// 0.7 V across a region a fraction of a micron thick.
//
// A real silicon cell's open-circuit voltage is about 0.69 V per cell, which is
// not a coincidence — Lesson 19 stacks 54 of them to reach 37 volts.

const STEPS = [
  {
    id: 'pure', name: `Pure silicon`, badge: `no free charge`,
    what: `Every silicon atom has four outer electrons, and in a perfect crystal every one of them is spoken for — shared with a neighbour. Nothing is free to move, so nothing can carry a current. Sunlight on this makes heat and nothing else.`
  },
  {
    id: 'n', name: `Add phosphorus — N-type`, badge: `a spare electron each`,
    what: `Phosphorus has five outer electrons where silicon has four. Four of them join the crystal; the fifth has nothing to pair with and wanders freely. About one atom in a million is enough. The spare carriers are negative, so this is N-type.`
  },
  {
    id: 'p', name: `Add boron — P-type`, badge: `a missing electron each`,
    what: `Boron has three. One bond in the crystal is left unfilled, and a neighbouring electron can hop into the gap — which moves the gap the other way. That travelling absence behaves exactly like a positive carrier, and is called a hole.`
  },
  {
    id: 'join', name: `Join them`, badge: `0.7 V built in`,
    what: `At the boundary, spare electrons fall into nearby holes and both vanish. What is left behind is a thin zone with no carriers at all but with charged atoms on each side — negative on the P side, positive on the N side. Those charges make a permanent electric field.`
  },
  {
    id: 'light', name: `Now shine light on it`, badge: `current at last`,
    what: `A photon frees an electron, exactly as Lesson 16 described. But now, before it can fall back, the built-in field sweeps it to the N side and sweeps the hole to the P side. They cannot return across the field. That separation is a voltage, and a wire gives it somewhere to go.`
  }
]

export default function Junction() {
  const [step, setStep] = useState(0)
  const [doped, setDoped] = useState(true)
  const s = STEPS[step]
  const lit = s.id === 'light'
  const working = lit && doped
  const done = step >= STEPS.length - 1

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Step {step + 1} of {STEPS.length}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 21 }}>{s.name}</span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 246, minHeight: 74, marginTop: 4 }}>
            {lit && !doped
              ? `Without the two impurities there is no junction, so there is no built-in field. The photon still frees an electron — and the electron falls straight back where it came from, a few billionths of a second later. All that arrives is heat. This is the experiment that shows the doping is the whole trick.`
              : s.what}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Built-in field" value={step >= 3 && doped ? '0.7' : '0'} u="volts" accent={step >= 3 && doped}
            foot={step >= 3 && doped ? 'across a zone under a micron thick' : 'nothing holds the charges apart'} />
          <Stat label="Free to carry current"
            value={!doped || s.id === 'pure' ? 'Nothing' : s.id === 'n' ? 'Electrons' : s.id === 'p' ? 'Holes' : 'Both'} u=""
            foot={!doped || s.id === 'pure' ? 'every bond is spoken for' : 'about one atom in a million'} />
          <Stat label="Useful output" value={working ? '0.69' : '0'} u="V per cell" accent={working}
            foot={working ? '54 of these make a panel' : lit ? 'the electron just falls back' : 'no light yet'} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 278, background: 'var(--paper)' }}
        role="img" aria-label={`A silicon PN junction at step ${step + 1}: ${s.name}.`}>
        <svg viewBox="0 0 560 240" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 212 }}>
          {/* the two halves */}
          <rect x="110" y="48" width="170" height="124" fill={step >= 2 && doped ? 'oklch(0.84 0.05 55)' : 'oklch(0.84 0.02 250)'} stroke="var(--machine)" strokeWidth="2" />
          <rect x="280" y="48" width="170" height="124" fill={step >= 1 && doped ? 'oklch(0.84 0.05 240)' : 'oklch(0.84 0.02 250)'} stroke="var(--machine)" strokeWidth="2" />

          {doped && step >= 2 && <text x="150" y="40" textAnchor="middle" fontFamily="var(--sans)" fontSize="13" fontWeight="700" fill="oklch(0.48 0.14 45)">P-type</text>}
          {doped && step >= 1 && <text x="410" y="40" textAnchor="middle" fontFamily="var(--sans)" fontSize="13" fontWeight="700" fill="oklch(0.44 0.13 250)">N-type</text>}

          {/* carriers */}
          {doped && step >= 2 && [0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={`h${i}`} cx={134 + (i % 3) * 48} cy={78 + Math.floor(i / 3) * 56} r="7.5"
              fill="none" stroke="oklch(0.52 0.16 40)" strokeWidth="2.2" />
          ))}
          {doped && step >= 1 && [0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={`e${i}`} cx={326 + (i % 3) * 48} cy={78 + Math.floor(i / 3) * 56} r="7.5" fill="oklch(0.44 0.13 250)" />
          ))}

          {/* depletion region and its field */}
          {doped && step >= 3 && <>
            <rect x="256" y="48" width="48" height="124" fill="oklch(0.93 0.01 85)" stroke="var(--machine)" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="280" y="190" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" letterSpacing="0.6" fill="var(--label)">DEPLETION ZONE</text>
            {[70, 100, 130, 160].map((y) => (
              <g key={y}>
                <path d={`M 300 ${y} L 262 ${y}`} stroke="oklch(0.48 0.14 300)" strokeWidth="2.2" />
                <path d={`M 258 ${y} l 9 -5 l 0 10 z`} fill="oklch(0.48 0.14 300)" />
              </g>
            ))}
            <text x="280" y="30" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="oklch(0.44 0.13 300)">the field: 0.7 V</text>
          </>}

          {/* light */}
          {lit && [84, 120, 156].map((y) => (
            <g key={y}>
              <path d={`M 22 ${y - 14} q 10 -8 20 0 q 10 8 20 0 q 10 -8 20 0`} fill="none" stroke="oklch(0.72 0.15 85)" strokeWidth="2.4" />
              <path d={`M 82 ${y - 14} L 250 ${y - 2}`} stroke="oklch(0.72 0.15 85)" strokeWidth="2.2" />
            </g>
          ))}

          {/* the freed pair */}
          {working && <>
            <circle cx="330" cy="118" r="8" fill="oklch(0.44 0.13 250)" />
            <path d="M 342 118 L 430 118" stroke="oklch(0.42 0.12 150)" strokeWidth="2.6" />
            <path d="M 440 118 l -10 -5 l 0 10 z" fill="oklch(0.42 0.12 150)" />
            <circle cx="232" cy="118" r="8" fill="none" stroke="oklch(0.52 0.16 40)" strokeWidth="2.4" />
            <path d="M 220 118 L 132 118" stroke="oklch(0.52 0.16 40)" strokeWidth="2.6" />
            <path d="M 122 118 l 10 -5 l 0 10 z" fill="oklch(0.52 0.16 40)" />
            <text x="280" y="214" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="oklch(0.42 0.12 150)">
              swept apart — and they cannot get back
            </text>
          </>}
          {lit && !doped && (
            <text x="280" y="214" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="oklch(0.52 0.16 28)">
              freed, then straight back again — only heat comes out
            </text>
          )}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          The depletion zone is drawn far too wide to be seen. In a real cell it is a fraction of a micron, and the whole wafer is thinner than a business card.
        </div>
      </div>

      <div className="hw-controls">
        <button className="hw-btn" onClick={() => setStep((x) => (x >= STEPS.length - 1 ? 0 : x + 1))}
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 22px', borderColor: 'var(--ink)', background: done ? 'var(--paper)' : 'var(--ink)', color: done ? 'var(--ink)' : '#f6f1e7' }}>
          {done ? 'BACK TO PURE SILICON' : 'NEXT STEP'}
        </button>
        {done && (
          <button className="hw-btn" onClick={() => setDoped((d) => !d)} aria-pressed={!doped}
            style={{ fontSize: 13, padding: '13px 18px', borderColor: 'var(--ink)' }}>
            {doped ? 'TAKE THE DOPING AWAY' : 'PUT IT BACK'}
          </button>
        )}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 232, textAlign: 'right' }}>
          {done ? 'Now take the doping away and shine the same light on it.' : 'Two impurities, and then a field that was never switched on.'}
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
