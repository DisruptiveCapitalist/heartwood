import { useState } from 'react'
import { maxPower, voc, ISC_STC } from '../../lib/panel.js'

// Electricity & Energy, Week 4. One array, two questions.
//
//   shading (Lesson 18) what one shaded cell does to fifty-four
//   wiring  (Lesson 19) why panels are wired in long series strings
//
// Both are Week 1's Lesson 10 again — the Christmas lights — at a scale where
// the answer costs real money.
//
// Shading: cells in series all carry the same current, so the whole panel is
// limited by its worst cell. Shade one cell of fifty-four completely and the
// panel delivers nothing at all. A bypass diode across each third of the panel
// turns that total loss into the loss of one third.
//
// The hot-spot figure is the one that surprises people: the worst case is not
// full shade but HALF shade, because the heat forced into the shaded cell is
// current times reverse voltage, and full shade leaves no current to force.
// The product peaks at 50%, at about 125 W concentrated in one six-inch cell.
//
// Wiring: series and parallel deliver identical power and wildly different
// currents, and the cable loss goes as the square of the current. Eight panels
// in parallel on a 20 m run of 4 mm² cable lose over half of what they make.

const RUN_M = 20
const CABLE_OHM = (1.68e-8 / 4e-6) * RUN_M * 2    // 4 mm² copper, there and back

export default function PanelArray({ mode = 'shading' }) {
  const [shade, setShade] = useState(50)
  const [bypass, setBypass] = useState(true)
  const [count, setCount] = useState(8)
  const [wiring, setWiring] = useState('series')

  const one = maxPower(1000, 25)
  const f = shade / 100

  // Shading. Series cells share one current, so the worst cell sets it.
  const limited = one.p * (1 - f)
  const shadedPower = bypass ? Math.max(limited, one.p * (2 / 3)) : limited
  const bypassing = bypass && one.p * (2 / 3) > limited
  const hotspot = bypass ? 0 : ISC_STC * (1 - f) * (f * 53 * 0.69)

  // Wiring. The same panels, the same watts, very different current.
  const series = wiring === 'series'
  const vString = series ? one.v * count : one.v
  const iString = series ? one.i : one.i * count
  const arrayW = one.p * count
  const loss = iString * iString * CABLE_OHM
  const vocCold = voc(-10) * (series ? count : 1)
  const inWindow = vString >= 200 && vString <= 600
  const vocSafe = vocCold <= 600

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{mode === 'shading' ? (shade === 0 ? 'Full sun' : 'One cell shaded') : `${count} panels, ${series ? 'in series' : 'in parallel'}`}</span>
          <span className="hw-readout-num" style={{ color: mode === 'shading' && shadedPower < one.p * 0.5 ? 'oklch(0.52 0.16 28)' : 'var(--accent)' }}>
            {mode === 'shading'
              ? <>{Math.round(shadedPower)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> W of {Math.round(one.p)}</span></>
              : <>{Math.round(vString)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> V at {iString.toFixed(1)} A</span></>}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 246, minHeight: 74, marginTop: 4 }}>
            {mode === 'shading'
              ? (shade === 0
                ? `Every cell is making the same current, so the string is happy. One panel in full sun: 402 watts.`
                : bypassing
                  ? `The shaded cell can no longer pass the full current, so the bypass diode across its third of the panel has opened a way round. You lose that third — and keep the other two.`
                  : bypass
                    ? `Light shading only. The shaded cell can still pass this much current, so the diode has not yet had to step in and nothing is being bypassed.`
                    : `Fifty-four cells in series must all carry the same current, and one of them cannot. It is throttling the entire panel — and at full shade the panel delivers nothing at all.`)
              : (series
                ? `Voltage adds and current does not. ${count} panels make ${Math.round(vString)} V at ${iString.toFixed(1)} A — the same watts as any other arrangement, but at a current thin cable can carry.`
                : `Current adds and voltage does not. The same ${Math.round(arrayW).toLocaleString()} watts now arrive as ${iString.toFixed(1)} amps, and the cable loss goes as the square of that.`)}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'shading' ? <>
            <Stat label="Power left" value={Math.round((shadedPower / one.p) * 100)} u="%" accent
              foot={bypassing ? 'two thirds of the panel, working' : 'of what the panel could make'} />
            <Stat label="Cells shaded" value={shade === 0 ? '0' : '1'} u="of 54"
              foot={shade === 0 ? 'nothing in the way' : `${shade}% of one cell covered`} />
            <Stat label="Heat forced into that cell" value={Math.round(hotspot)} u="W"
              foot={bypass ? 'the diode prevents this entirely'
                : shade === 0 ? 'nothing is being held back'
                  : shade >= 100 ? 'no current flows at all, so none is forced through it'
                    : 'concentrated in one six-inch square'} />
          </> : <>
            <Stat label="The array makes" value={(arrayW / 1000).toFixed(2)} u="kW" accent foot="identical either way" />
            <Stat label="Lost in 20 m of cable" value={loss < 10 ? loss.toFixed(1) : Math.round(loss)} u="W"
              foot={`${((loss / arrayW) * 100).toFixed(1)}% — and it goes as current squared`} />
            <Stat label="Coldest-morning voltage" value={Math.round(vocCold)} u="V"
              foot={vocSafe ? 'inside the inverter’s 600 V limit' : 'OVER the 600 V limit — too many in the string'} />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 274, background: 'var(--paper)' }}
        role="img" aria-label={mode === 'shading'
          ? `A solar panel of 54 cells with one cell ${shade}% shaded, ${bypass ? 'with' : 'without'} bypass diodes.`
          : `${count} solar panels wired in ${wiring}.`}>
        <svg viewBox="0 0 560 240" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 208 }}>
          {mode === 'shading' ? <>
            {Array.from({ length: 54 }, (_, i) => {
              const third = Math.floor(i / 18)
              const col = i % 18
              const x = 48 + col * 26, y = 46 + third * 56
              const isShaded = i === 24
              const dead = !bypass && shade > 0
              const cut = bypassing && third === 1
              return <rect key={i} x={x} y={y} width="22" height="38" rx="2"
                fill={isShaded ? `oklch(${0.72 - f * 0.42} 0.03 250)` : cut ? 'oklch(0.86 0.02 85)' : dead ? 'oklch(0.80 0.02 250)' : 'oklch(0.42 0.07 255)'}
                stroke={isShaded ? 'oklch(0.45 0.16 28)' : 'var(--machine)'} strokeWidth={isShaded ? 2 : 0.8} />
            })}
            {[0, 1, 2].map((t) => (
              <text key={t} x={280} y={39 + t * 56} textAnchor="middle" fontFamily="var(--sans)" fontSize="9.5" fontWeight="700" letterSpacing="0.8"
                fill={bypassing && t === 1 ? 'oklch(0.50 0.15 45)' : 'var(--label)'}>
                {bypass ? (bypassing && t === 1 ? 'BYPASSED — DIODE CONDUCTING' : `THIRD ${t + 1} · BYPASS DIODE FITTED`) : `THIRD ${t + 1} · NO DIODE`}
              </text>
            ))}
            {!bypass && shade > 0 && (
              <text x="280" y="232" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="700" fill="oklch(0.50 0.16 28)">
                one cell of fifty-four is holding back all the others
              </text>
            )}
          </> : <>
            {Array.from({ length: count }, (_, i) => {
              const perRow = Math.min(count, 8)
              const rows = Math.ceil(count / 8)
              const col = i % perRow, row = Math.floor(i / perRow)
              const w = 50, gap = 8
              const x = 280 - (perRow * (w + gap) - gap) / 2 + col * (w + gap)
              const y = (rows === 1 ? 72 : 42) + row * 74
              return <g key={i}>
                <rect x={x} y={y} width={w} height="58" rx="3" fill="oklch(0.42 0.07 255)" stroke="var(--machine)" strokeWidth="1.5" />
                {[1, 2, 3].map((k) => <line key={k} x1={x + k * 12.5} y1={y} x2={x + k * 12.5} y2={y + 58} stroke="oklch(0.62 0.04 255)" strokeWidth="0.8" />)}
                {series && col < perRow - 1 && <line x1={x + w} y1={y + 29} x2={x + w + gap} y2={y + 29} stroke="oklch(0.50 0.14 45)" strokeWidth="2.5" />}
                {!series && <>
                  <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y - 14} stroke="oklch(0.50 0.14 45)" strokeWidth="2.5" />
                  <line x1={x + w / 2} y1={y + 58} x2={x + w / 2} y2={y + 72} stroke="oklch(0.50 0.14 45)" strokeWidth="2.5" />
                </>}
              </g>
            })}
            {!series && <>
              <line x1="40" y1={count > 8 ? 28 : 58} x2="520" y2={count > 8 ? 28 : 58} stroke="oklch(0.50 0.14 45)" strokeWidth="3" />
              <line x1="40" y1={count > 8 ? 190 : 202} x2="520" y2={count > 8 ? 190 : 202} stroke="oklch(0.50 0.14 45)" strokeWidth="3" />
            </>}
            <text x="280" y="232" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="700"
              fill={series ? 'oklch(0.42 0.12 150)' : 'oklch(0.50 0.16 28)'}>
              {series ? `${iString.toFixed(1)} A in the cable — ordinary wire carries this easily`
                : `${iString.toFixed(1)} A in the cable — and ${Math.round(loss)} W of it becomes heat`}
            </text>
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {mode === 'shading'
            ? `A real panel has three bypass diodes, one across each third, hidden in the junction box on the back.`
            : `Cable loss is for a 20 m run of 4 mm² copper, there and back — the sort of cable a roof array actually uses.`}
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'shading' ? <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 220 }}>
            <label htmlFor="hw-shade" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              One cell covered · {shade}%
            </label>
            <input id="hw-shade" type="range" min="0" max="100" step="10" value={shade}
              onChange={(e) => setShade(Number(e.target.value))} style={{ width: 220, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <button className="hw-btn" onClick={() => setBypass((b) => !b)} aria-pressed={!bypass}
            style={{ fontSize: 13, padding: '13px 18px', borderColor: 'var(--ink)' }}>
            {bypass ? 'REMOVE THE BYPASS DIODES' : 'PUT THEM BACK'}
          </button>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 220, textAlign: 'right' }}>
            Take the diodes out, then cover one cell completely.
          </span>
        </> : <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 190 }}>
            <label htmlFor="hw-count" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>{count} panels</label>
            <input id="hw-count" type="range" min="2" max="16" step="1" value={count}
              onChange={(e) => setCount(Number(e.target.value))} style={{ width: 190, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['series', 'parallel'].map((w) => (
              <button key={w} className="hw-btn" onClick={() => setWiring(w)} aria-pressed={wiring === w}
                style={{ fontSize: 12.5, padding: '11px 15px', background: wiring === w ? 'var(--ink)' : 'var(--paper)', color: wiring === w ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
                {w === 'series' ? 'IN SERIES' : 'IN PARALLEL'}
              </button>
            ))}
          </div>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 228, textAlign: 'right' }}>
            {inWindow ? 'This string is inside the inverter’s window.' : `${Math.round(vString)} V is outside the inverter’s 200–600 V window.`}
          </span>
        </>}
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
