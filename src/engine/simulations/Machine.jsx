import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Electricity & Energy, Week 3. One machine, run both ways.
//
//   motor     (Lesson 12) electricity in, spin out
//   generator (Lesson 13) spin in, electricity out
//
// They are deliberately one component because they are one machine. A motor
// spun by hand generates; a generator fed with current turns. Building them
// separately would teach two facts where there is only one.
//
// The motor's arithmetic is the standard DC model and it carries the lesson:
//   ε = kω       the voltage the spinning generates against its own supply
//   I = (V−ε)/R  so current falls as it speeds up
//   τ = kI
// At a standstill ε is zero, so the current is at its maximum and the torque
// with it — and none of that is doing any work, which is exactly why a jammed
// motor burns out.
//
// The generator's number is the one nobody expects: a two-pole machine must
// turn at 3,600 rpm to make 60 Hz, which is why power station turbines run at
// that speed and not some other.

const V = 12
const R = 2
const K = 0.05          // N·m per amp, and volts per rad/s

export default function Machine({ active, mode = 'motor' }) {
  const [load, setLoad] = useState(40)
  const [commutator, setCommutator] = useState(true)
  const [rpm, setRpm] = useState(3600)
  const [ui, setUi] = useState({ angle: 0 })

  const stallI = V / R
  const stallT = K * stallI

  // Without a commutator the loop lines up with the field and stays there, so
  // the machine really is at a standstill — and a motor at a standstill is
  // stalled, whatever the load dial says. It draws its full current, generates
  // nothing back, and turns every watt into heat. Reading anything else here
  // would have the numbers contradicting the picture beside them.
  const halted = mode === 'motor' && !commutator
  const torque = halted ? stallT : (load / 100) * stallT
  const current = torque / K
  const emf = Math.max(0, V - current * R)
  const omega = halted ? 0 : Math.max(0, emf / K)
  const motorRpm = (omega * 60) / (2 * Math.PI)
  const heat = current * current * R
  const output = torque * omega

  // Generator: a two-pole machine makes one cycle per revolution.
  const hz = rpm / 60
  const genPeak = K * ((rpm * 2 * Math.PI) / 60)

  const sim = useRef({ angle: 0, acc: 0 })
  const live = useRef({})
  live.current = { spin: mode === 'motor' ? (commutator ? omega : 0) : (rpm * 2 * Math.PI) / 60, commutator, mode }

  const step = useCallback((dt) => {
    const s = sim.current
    const { spin, commutator, mode } = live.current
    if (mode === 'motor' && !commutator) {
      // Without a commutator the loop swings to alignment and stops there.
      s.angle += (Math.PI / 2 - s.angle) * Math.min(1, dt * 3)
    } else {
      s.angle = (s.angle + spin * dt * 0.06) % (Math.PI * 2)
    }
    s.acc += dt
    if (s.acc >= 1 / 24) { s.acc = 0; setUi({ angle: s.angle }) }
  }, [])
  useRafLoop(active, step)

  const a = ui.angle
  const stalled = mode === 'motor' && (load >= 99 || halted)

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{mode === 'motor' ? (stalled ? 'Jammed solid' : 'Turning') : 'Being turned'}</span>
          <span className="hw-readout-num" style={{ color: stalled ? 'oklch(0.52 0.16 28)' : 'var(--accent)' }}>
            {mode === 'motor'
              ? <>{Math.round(motorRpm)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> rpm</span></>
              : <>{hz.toFixed(0)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> Hz out</span></>}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {mode === 'motor'
              ? (!commutator
                ? 'Without a commutator the loop swings until it lines up with the field and stops there. One push, and then nothing — which is why a motor needs the current reversed twice per turn.'
                : stalled
                  ? 'Held still, it draws its full current and produces its full torque — and does no work whatever. All of that power is becoming heat, which is how a jammed motor destroys itself.'
                  : 'As it speeds up it generates a voltage against its own supply, so the current falls. A motor at speed draws far less than a motor starting.')
              : (rpm === 3600
                ? 'Three thousand six hundred revolutions a minute is sixty a second, and a two-pole machine makes one cycle per revolution. That is where 60 Hz comes from — and why turbines run at exactly this speed.'
                : 'Spin it faster and both the voltage and the frequency rise together. A grid needs the frequency held exactly, which is why the speed is held exactly.')}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'motor' ? <>
            <Stat label="Current it draws" value={current.toFixed(2)} u="amps" accent={stalled} foot={stalled ? 'the most it can — and all of it heat' : 'falls as it speeds up'} />
            <Stat label="Voltage it generates back" value={emf.toFixed(1)} u="V" foot={`against the ${V} it is given`} />
            <Stat label="Useful work out" value={output.toFixed(1)} u="W" foot={`and ${heat.toFixed(1)} W as heat`} />
          </> : <>
            <Stat label="Turning at" value={rpm.toLocaleString()} u="rpm" foot="one cycle per revolution" />
            <Stat label="Peak voltage out" value={genPeak.toFixed(0)} u="V" accent foot="rises with speed" />
            <Stat label="And it comes out as" value="AC" u="" foot="a sine wave, which is Lesson 7" />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 290, background: 'var(--paper)' }}
        role="img" aria-label={mode === 'motor'
          ? `A current-carrying loop between two magnets, ${commutator ? `turning at ${Math.round(motorRpm)} rpm` : 'stopped at alignment'}.`
          : `A loop being turned between two magnets, producing an alternating voltage.`}>
        <svg viewBox="0 0 560 252" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 236 }}>
          <rect x="40" y="56" width="46" height="130" rx="6" fill="oklch(0.62 0.15 28)" />
          <text x="63" y="128" textAnchor="middle" fontFamily="var(--sans)" fontSize="19" fontWeight="700" fill="#f6f1e7">N</text>
          <rect x="246" y="56" width="46" height="130" rx="6" fill="oklch(0.46 0.08 250)" />
          <text x="269" y="128" textAnchor="middle" fontFamily="var(--sans)" fontSize="19" fontWeight="700" fill="#f6f1e7">S</text>
          {[72, 100, 128, 156, 184].map((y) => (
            <g key={y}>
              <line x1="86" y1={y} x2="246" y2={y} stroke="oklch(0.60 0.07 300)" strokeWidth="1.6" strokeDasharray="5 5" />
              <path d={`M 166 ${y} l -8 -4 l 0 8 z`} fill="oklch(0.52 0.10 300)" />
            </g>
          ))}

          <g transform={`translate(166 121)`}>
            <ellipse rx="64" ry={Math.abs(Math.cos(a)) * 46 + 4} fill="none" stroke="oklch(0.50 0.14 45)" strokeWidth="5"
              transform="rotate(0)" />
            <circle cx={Math.cos(a) * 64} cy={Math.sin(a) * 18} r="7" fill="oklch(0.56 0.16 28)" />
            <circle cx={-Math.cos(a) * 64} cy={-Math.sin(a) * 18} r="7" fill="oklch(0.44 0.08 250)" />
          </g>
          <text x="166" y="208" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">
            {mode === 'motor' ? (commutator ? 'COMMUTATOR REVERSING TWICE A TURN' : 'NO COMMUTATOR — IT STOPS HERE') : 'TURNED BY SOMETHING ELSE'}
          </text>

          {mode === 'generator' && <>
            <polyline
              points={Array.from({ length: 121 }, (_, i) => {
                const u = (i / 120) * 3
                const v = Math.sin((u - a / (Math.PI * 2)) * Math.PI * 2)
                return `${332 + (i / 120) * 190},${121 - v * 52}`
              }).join(' ')}
              fill="none" stroke="oklch(0.52 0.16 28)" strokeWidth="3" strokeLinejoin="round" />
            <line x1="332" y1="121" x2="522" y2="121" stroke="var(--rule)" strokeWidth="1.4" />
            <text x="427" y="196" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">one cycle per revolution</text>
            <text x="332" y="54" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">WHAT COMES OUT</text>
          </>}
          {mode === 'motor' && <>
            <rect x="332" y="68" width="190" height="104" rx="10" fill="var(--card)" stroke="var(--rule)" strokeWidth="1.6" />
            <text x="427" y="94" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">WHERE THE POWER GOES</text>
            <rect x="348" y="108" width="158" height="16" rx="8" fill="oklch(0.93 0.02 155)" />
            <rect x="348" y="108" width={Math.max(2, (output / (V * stallI)) * 158)} height="16" rx="8" fill="oklch(0.56 0.13 155)" />
            <text x="348" y="140" fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">useful work</text>
            <rect x="348" y="146" width="158" height="16" rx="8" fill="oklch(0.95 0.02 28)" />
            <rect x="348" y="146" width={Math.max(2, (heat / (V * stallI)) * 158)} height="16" rx="8" fill="oklch(0.60 0.15 28)" />
            <text x="348" y="178" fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">heat</text>
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          A single loop between two magnets. A real machine has many loops at many angles, which smooths the {mode === 'motor' ? 'torque' : 'output'} — and the principle is exactly this one.
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'motor' ? <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 230 }}>
            <label htmlFor="hw-load" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              How hard it has to work · {load}%
            </label>
            <input id="hw-load" type="range" min="0" max="100" step="5" value={load}
              onChange={(e) => setLoad(Number(e.target.value))} style={{ width: 230, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <button className="hw-btn" onClick={() => setCommutator((c) => !c)} aria-pressed={!commutator}
            style={{ borderColor: commutator ? undefined : 'oklch(0.55 0.17 28)', color: commutator ? undefined : 'oklch(0.48 0.17 28)' }}>
            {commutator ? 'TAKE THE COMMUTATOR OUT' : 'PUT IT BACK'}
          </button>
        </> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 260 }}>
            <label htmlFor="hw-rpm" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
              Turning it at · {rpm.toLocaleString()} rpm
            </label>
            <input id="hw-rpm" type="range" min="600" max="6000" step="300" value={rpm}
              onChange={(e) => setRpm(Number(e.target.value))} style={{ width: 260, accentColor: 'var(--accent)', height: 28 }} />
          </div>
        )}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          {mode === 'motor' ? 'Jam it to 100% and look at where the power goes.' : 'Find 3,600 rpm and read the frequency.'}
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
