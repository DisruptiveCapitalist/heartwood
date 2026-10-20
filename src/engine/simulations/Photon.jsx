import { useState } from 'react'

// Electricity & Energy, Lesson 16 — light knocks something loose.
//
// The whole lesson is the quantum point, and it is genuinely counterintuitive:
// what a photon can do is set by its COLOUR, not by how many of them arrive.
// Silicon's band gap is 1.12 eV. A photon below that energy does nothing at
// all, and no quantity of such photons will ever add up to one freed electron.
// A photon above it frees exactly one electron and wastes the excess as heat.
//
//   E(eV) = 1239.84 / lambda(nm)      so 1.12 eV is a wavelength of 1,107 nm
//
//    350 nm  3.54 eV   32% of the photon used, the rest heat
//    550 nm  2.25 eV   50%
//    900 nm  1.38 eV   81%
//   1107 nm  1.12 eV   100% — the one wavelength silicon uses perfectly
//   1500 nm  0.83 eV   passes straight through
//
// The brightness control exists to be disappointing: it multiplies the current
// and changes the per-photon verdict not at all. That is the observation the
// lesson is built on.

const EV_NM = 1239.84193
const GAP = 1.12

const PRESETS = [
  { nm: 350, label: `Ultraviolet` },
  { nm: 450, label: `Blue` },
  { nm: 550, label: `Green` },
  { nm: 700, label: `Red` },
  { nm: 900, label: `Near infrared` },
  { nm: 1107, label: `Silicon's limit` },
  { nm: 1500, label: `Far infrared` }
]

// The standard accounting for silicon under the AM1.5 solar spectrum.
const BUDGET = [
  { label: `Too red to be absorbed`, pct: 19, tone: 'oklch(0.58 0.14 28)', note: `below 1.12 eV — passes straight through the cell` },
  { label: `Excess, lost as heat`, pct: 33, tone: 'oklch(0.68 0.12 65)', note: `the part of each photon above the gap` },
  { label: `Lost inside the cell`, pct: 15, tone: 'oklch(0.72 0.05 85)', note: `voltage and fill-factor losses — Lesson 20` },
  { label: `Reaches your wires`, pct: 33, tone: 'oklch(0.52 0.13 150)', note: `the theoretical ceiling. Real panels manage 20–23%` }
]

const colourFor = (nm) => nm < 380 ? 'oklch(0.55 0.20 300)' : nm < 450 ? 'oklch(0.50 0.20 275)'
  : nm < 495 ? 'oklch(0.60 0.16 240)' : nm < 570 ? 'oklch(0.62 0.16 145)'
    : nm < 590 ? 'oklch(0.78 0.15 95)' : nm < 620 ? 'oklch(0.70 0.16 60)'
      : nm < 750 ? 'oklch(0.55 0.19 28)' : 'oklch(0.42 0.06 30)'

export default function Photon() {
  const [nm, setNm] = useState(550)
  const [bright, setBright] = useState(50)

  const energy = EV_NM / nm
  const frees = energy >= GAP
  const used = frees ? (GAP / energy) * 100 : 0
  const wasted = frees ? energy - GAP : energy
  const visible = nm >= 380 && nm <= 750

  // Brightness is watts, not photons. Fixed watts of violet light arrives as
  // far fewer, stronger lumps than the same watts of red — and since each lump
  // frees exactly one electron, the current follows the COUNT, not the energy.
  // So deep red just above the gap gives the most current of any colour.
  const milliamps = frees ? Math.round((bright * GAP) / energy) : 0

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{frees ? 'Frees an electron' : 'Nothing happens'}</span>
          <span className="hw-readout-num" style={{ color: frees ? 'var(--accent)' : 'oklch(0.52 0.16 28)', fontSize: 23 }}>
            {energy.toFixed(2)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> eV</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 244, minHeight: 62, marginTop: 4 }}>
            {frees
              ? (used > 95
                ? `Almost perfectly matched to silicon. This photon has just enough to free an electron and almost nothing left over to waste — which is why 1,107 nm is the ideal wavelength for a silicon cell.`
                : `Enough to free one electron, and ${wasted.toFixed(2)} eV left over that silicon cannot use. That surplus becomes heat in the cell. A more energetic photon does not make a better electron — only a hotter panel.`)
              : `Not enough. Silicon needs 1.12 eV to free an electron and this photon carries ${energy.toFixed(2)}. It passes straight through the cell as if it were glass, and turning the brightness up will never change that.`}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="How much of it is used" value={frees ? used.toFixed(0) : '0'} u="%" accent={frees}
            foot={frees ? `${wasted.toFixed(2)} eV becomes heat` : 'the whole photon is wasted'} />
          <Stat label="Electrons freed by one photon" value={frees ? '1' : '0'} u=""
            foot="never two, however energetic" />
          <Stat label="Current from the cell" value={milliamps} u="mA"
            foot={frees ? 'the same watts of redder light gives more' : 'no amount of this colour helps'} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 272, background: 'var(--paper)' }}
        role="img" aria-label={`A photon of ${nm} nanometres carrying ${energy.toFixed(2)} electronvolts, ${frees ? 'freeing an electron from silicon' : 'passing through the silicon unabsorbed'}.`}>
        <svg viewBox="0 0 560 236" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '6px 0 auto 0', width: '100%', height: 196 }}>
          <rect x="300" y="34" width="150" height="150" rx="5" fill="oklch(0.80 0.02 250)" stroke="var(--machine)" strokeWidth="2" />
          <text x="375" y="200" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" letterSpacing="1.1" fill="var(--label)">SILICON</text>

          {Array.from({ length: Math.max(1, Math.round(bright / 22)) }, (_, i) => {
            const y = 70 + i * 24
            return <g key={i}>
              <path d={`M 60 ${y} q 12 -9 24 0 q 12 9 24 0 q 12 -9 24 0 q 12 9 24 0 q 12 -9 24 0`}
                fill="none" stroke={colourFor(nm)} strokeWidth="2.6" opacity="0.95" />
              <path d={`M 204 ${y} L ${frees ? 300 : 452} ${y}`} stroke={colourFor(nm)} strokeWidth="2.6"
                strokeDasharray={frees ? 'none' : '6 5'} opacity={frees ? 0.95 : 0.5} />
              <path d={`M ${frees ? 300 : 452} ${y} l -9 -5 l 0 10 z`} fill={colourFor(nm)} opacity={frees ? 0.95 : 0.5} transform={`translate(${frees ? 9 : 9} 0)`} />
            </g>
          })}

          {frees && <>
            <circle cx="372" cy="100" r="9" fill="oklch(0.52 0.13 150)" />
            <text x="372" y="105" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" fill="#f6f1e7">e</text>
            <path d="M 384 100 L 442 100" stroke="oklch(0.42 0.12 150)" strokeWidth="2.6" />
            <path d="M 450 100 l -9 -5 l 0 10 z" fill="oklch(0.42 0.12 150)" />
            <text x="470" y="96" textAnchor="start" fontFamily="var(--sans)" fontSize="11" fontWeight="600" fill="oklch(0.42 0.12 150)">freed</text>
            {used < 95 && <>
              <path d="M 372 118 q 7 10 0 20 q -7 10 0 20" fill="none" stroke="oklch(0.62 0.15 55)" strokeWidth="2.4" />
              <text x="386" y="156" textAnchor="start" fontFamily="var(--sans)" fontSize="11" fill="oklch(0.55 0.14 55)">
                {wasted.toFixed(2)} eV as heat
              </text>
            </>}
          </>}
          {!frees && (
            <text x="470" y="96" textAnchor="start" fontFamily="var(--sans)" fontSize="11" fontWeight="600" fill="oklch(0.52 0.16 28)">straight through</text>
          )}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, display: 'flex', gap: 2, alignItems: 'stretch', height: 34 }}>
          {BUDGET.map((b) => (
            <div key={b.label} title={b.note} style={{ width: `${b.pct}%`, background: b.tone, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, color: '#f6f1e7' }}>{b.pct}%</span>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 22, bottom: 46, fontFamily: 'var(--sans)', fontSize: 10.5, fontWeight: 700, letterSpacing: '1.1px', color: 'var(--label)' }}>
          WHERE ALL THE SUNLIGHT GOES · TOO RED · HEAT · LOST IN THE CELL · USED
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 210 }}>
          <label htmlFor="hw-nm" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            {nm} nm · {visible ? 'visible' : nm < 380 ? 'ultraviolet' : 'infrared'}
          </label>
          <input id="hw-nm" type="range" min="300" max="2000" step="25" value={nm}
            onChange={(e) => setNm(Number(e.target.value))} style={{ width: 210, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 150 }}>
          <label htmlFor="hw-bright" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Brightness · {bright}%</label>
          <input id="hw-bright" type="range" min="10" max="100" step="10" value={bright}
            onChange={(e) => setBright(Number(e.target.value))} style={{ width: 150, accentColor: 'var(--accent)', height: 28 }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {PRESETS.map((p) => (
            <button key={p.nm} className="hw-btn" onClick={() => setNm(p.nm)} aria-pressed={nm === p.nm}
              style={{ fontSize: 12, padding: '7px 10px', background: nm === p.nm ? 'var(--ink)' : 'var(--paper)', color: nm === p.nm ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
              {p.label}
            </button>
          ))}
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          Go to far infrared, then turn the brightness to 100%. Nothing.
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
