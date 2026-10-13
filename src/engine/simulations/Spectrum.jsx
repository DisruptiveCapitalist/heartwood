import { useState } from 'react'

// Lesson 29. A flashlight and a microwave, side by side on one scale.
//
// The thing to notice is how little of the spectrum you can see. Visible light
// is drawn to scale here — a sliver — which is the honest picture and is far
// more striking than the usual diagram that gives the rainbow a third of the
// width.

const C = 299792458

// Position on the bar is log10 of the wavelength in metres, from 1 km to 1 pm.
const LO = 3
const HI = -12
const toPct = (log) => ((LO - log) / (LO - HI)) * 100

const BANDS = [
  { id: 'radio', label: 'Radio', from: 3, to: -0.5, tone: '#cbd8e0', use: 'Broadcast, shortwave, your car aerial.' },
  { id: 'micro', label: 'Microwave', from: -0.5, to: -3, tone: '#bcd0c6', use: 'Ovens, Wi-Fi, phones, radar.' },
  { id: 'ir', label: 'Infrared', from: -3, to: -6.155, tone: '#e0cdb4', use: 'Heat you feel from a fire. Remote controls.' },
  { id: 'vis', label: 'Visible', from: -6.155, to: -6.40, tone: 'linear-gradient(90deg,#c0392b,#d4a017,#4a7c3f,#2e5f8a,#5b3a8a)', use: 'Everything your eyes have ever seen.' },
  { id: 'uv', label: 'Ultraviolet', from: -6.40, to: -8, tone: '#cfc3e0', use: 'Sunburn. Vitamin D. Sterilising lamps.' },
  { id: 'xray', label: 'X-ray', from: -8, to: -11, tone: '#c9c9cf', use: 'Seeing bones. Airport scanners.' },
  { id: 'gamma', label: 'Gamma', from: -11, to: -12, tone: '#d8c0c0', use: 'Nuclear decay. Deep space.' }
]

const PRESETS = [
  { label: 'Radio station', log: 0.5 },
  { label: 'Wi-Fi', log: -0.9 },
  { label: 'Microwave oven', log: -0.9 },
  { label: 'A warm radiator', log: -4.8 },
  { label: 'Red light', log: -6.19 },
  { label: 'Blue light', log: -6.37 },
  { label: 'Sunburn', log: -6.52 },
  { label: 'Chest X-ray', log: -10.2 }
]

const human = (m) => {
  if (m >= 1) return `${m.toFixed(m >= 10 ? 0 : 2)} m`
  if (m >= 1e-3) return `${(m * 1000).toFixed(m >= 1e-2 ? 0 : 1)} mm`
  if (m >= 1e-6) return `${(m * 1e6).toFixed(m >= 1e-5 ? 0 : 2)} µm`
  if (m >= 1e-9) return `${(m * 1e9).toFixed(m >= 1e-8 ? 0 : 2)} nm`
  return `${(m * 1e12).toFixed(1)} pm`
}

const hz = (f) =>
  f >= 1e15 ? `${(f / 1e15).toFixed(1)} PHz`
    : f >= 1e12 ? `${(f / 1e12).toFixed(1)} THz`
      : f >= 1e9 ? `${(f / 1e9).toFixed(1)} GHz`
        : f >= 1e6 ? `${(f / 1e6).toFixed(0)} MHz`
          : `${(f / 1e3).toFixed(0)} kHz`

export default function Spectrum() {
  const [log, setLog] = useState(-6.28)

  const metres = Math.pow(10, log)
  const freq = C / metres
  // Energy per photon, in electron-volts. The number that decides what it can do.
  const eV = (1.2398e-6) / metres
  const band = BANDS.find((b) => log <= b.from && log > b.to) ?? BANDS[0]

  const danger = eV > 3.1
    ? 'Enough energy per packet to knock electrons off atoms. This is the line where light starts being able to damage things chemically.'
    : 'Not enough energy per packet to break a molecule. It can warm things — sometimes a great deal — but it cannot alter them chemically.'

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{band.label}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)' }}>{human(metres)}</span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 230, marginTop: 4 }}>
            {hz(freq)} · {band.use}
          </span>
        </div>

        <div data-align="right" style={{ width: 266, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">Energy in one packet</span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: eV > 3.1 ? 'var(--brake)' : 'var(--ink)' }}>
            {eV < 0.001 ? eV.toExponential(1) : eV < 1 ? eV.toFixed(3) : eV.toFixed(1)} eV
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5, minHeight: 60 }}>
            {danger}
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 250, background: 'var(--paper)' }}
        role="img"
        aria-label={`The electromagnetic spectrum. Currently at ${human(metres)}, in the ${band.label} band.`}
      >
        <div style={{ position: 'absolute', left: 24, right: 24, top: 44, height: 46, display: 'flex', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--rule)' }}>
          {BANDS.map((b) => (
            <div
              key={b.id}
              title={b.label}
              style={{
                width: `${toPct(b.to) - toPct(b.from)}%`,
                background: b.tone,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--sans)', fontSize: 10, fontWeight: 700, letterSpacing: '.06em',
                color: 'var(--ink-2)', overflow: 'hidden', whiteSpace: 'nowrap'
              }}
            >
              {toPct(b.to) - toPct(b.from) > 7 ? b.label : ''}
            </div>
          ))}
        </div>

        {/* the marker */}
        <div style={{ position: 'absolute', left: `calc(24px + ${toPct(log)}% * (100% - 48px) / 100%)`, top: 30, width: 2, height: 74, background: 'var(--ink)' }} />
        <div style={{ position: 'absolute', left: `calc(24px + ${toPct(log)}% * (100% - 48px) / 100%)`, top: 20, marginLeft: -5, width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '9px solid var(--ink)' }} />

        <div style={{ position: 'absolute', left: 24, right: 24, top: 98, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--sans)', fontSize: 10.5, color: 'var(--muted)' }}>
          <span>a kilometre long</span>
          <span>the width of an atom</span>
        </div>

        <div style={{ position: 'absolute', left: 24, right: 24, top: 132, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)' }}>
          The whole of what your eyes can see is the thin striped band in the middle — about one part in two thousand of what is drawn here, and this bar itself only covers part of the range.
        </div>

        <div style={{ position: 'absolute', left: 24, bottom: 14, right: 24, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Every one of these is the same thing travelling at the same speed. Only the size of the ripple differs.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 260 }}>
          <label htmlFor="hw-spec" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Slide across the whole spectrum
          </label>
          <input id="hw-spec" type="range" min="-12" max="3" step="0.05"
            value={log} onChange={(e) => setLog(Number(e.target.value))}
            style={{ width: 260, accentColor: 'var(--accent)', height: 28, direction: 'rtl' }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {PRESETS.map((p) => (
            <button key={p.label} className="hw-btn" onClick={() => setLog(p.log)} style={{ padding: '11px 13px', fontSize: 12, letterSpacing: '.02em' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
