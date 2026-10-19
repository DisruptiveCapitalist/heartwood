import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Electricity & Energy, Week 2. What the wall is actually doing.
//
//   waveform (Lesson 7) one way, or back and forth — and what 120 volts means
//   outlet   (Lesson 8) three holes, and what the third one is for
//
// The number that does the work in the first mode: mains quoted as 120 volts
// actually swings to about ±170. The 120 is the RMS value — the steady voltage
// that would heat a filament the same amount — and once a learner has seen the
// peak they understand why that definition had to be invented.
//
// The second mode is a safety lesson told as a circuit. A fault puts the live
// wire onto a metal case; without a ground there is no path except through a
// person, and with one there is a path so good that the breaker trips. The GFCI
// from Week 1's Lesson 4 story reappears here doing its actual job.

const RMS = 120
const PEAK = RMS * Math.SQRT2      // about 169.7
const HZ = 60

const FAULTS = [
  {
    id: 'ok', name: `Working normally`, caseV: 0, personMa: 0, trips: false,
    what: `Current leaves on the live wire, does its work, and returns on the neutral. The ground wire carries nothing at all — which is its normal state and why it is easy to forget it is there.`
  },
  {
    id: 'nogrnd', name: `A fault, with no ground`, caseV: 120, personMa: 80, trips: false,
    what: `The live wire has touched the metal case. With no ground wire the case simply sits at 120 volts, waiting. Touch it while standing on a floor and **you** become the path to earth — and the breaker sees nothing unusual, because from its point of view nothing is.`
  },
  {
    id: 'grnd', name: `The same fault, with a ground`, caseV: 0, personMa: 0, trips: true, by: `The breaker opens`,
    what: `The ground wire gives that current a far easier path than a person. An enormous current flows to earth, the breaker sees it instantly and opens the circuit. The appliance is dead and nobody was hurt.`
  },
  {
    id: 'gfci', name: `A GFCI outlet`, caseV: 0, personMa: 4, trips: true, by: `The GFCI opens`,
    what: `It compares what leaves on the live wire with what returns on the neutral. Those must match. A mismatch of about five thousandths of an amp means current is going somewhere else — and it opens the circuit in around a fortieth of a second, well before harm is done.`
  }
]

export default function Mains({ active, mode = 'waveform' }) {
  const [ac, setAc] = useState(true)
  const [fault, setFault] = useState('ok')
  const [ui, setUi] = useState({ t: 0 })

  const sim = useRef({ t: 0, acc: 0 })
  const step = useCallback((dt) => {
    const s = sim.current
    s.t += dt
    s.acc += dt
    if (s.acc >= 1 / 30) { s.acc = 0; setUi({ t: s.t }) }
  }, [])
  useRafLoop(active && mode === 'waveform', step)

  const f = FAULTS.find((x) => x.id === fault)
  // Two cycles across the window, slowed enormously so it can be watched.
  const slowHz = 1.1
  const phase = ui.t * slowHz
  const now = ac ? PEAK * Math.sin(phase * Math.PI * 2) : RMS

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{mode === 'waveform' ? (ac ? 'Alternating — the wall' : 'Direct — a battery') : f.name}</span>
          <span className="hw-readout-num" style={{ color: mode === 'outlet' && f.personMa > 10 ? 'oklch(0.52 0.16 28)' : 'var(--accent)', fontSize: mode === 'outlet' ? 21 : undefined }}>
            {mode === 'waveform'
              ? <>{now >= 0 ? '+' : '−'}{Math.abs(now).toFixed(0)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> volts</span></>
              : (f.trips ? f.by : f.personMa > 10 ? 'Dangerous' : 'Nothing unusual')}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {mode === 'waveform'
              ? (ac
                ? `It reverses sixty times a second and swings to about ±170 — yet it is called 120. That 120 is the steady voltage that would heat a filament exactly as much, and it is the only honest single number for something that is never still.`
                : `A battery holds one voltage, one way round, and stays there. Simple to understand and, as Lesson 9 will show, very expensive to send any distance.`)
              : <Mark text={f.what} />}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'waveform' ? <>
            <Stat label="What it is called" value={RMS} u="volts" accent foot="the RMS value" />
            <Stat label="What it actually reaches" value={ac ? `±${PEAK.toFixed(0)}` : RMS} u="volts" foot={ac ? 'forty per cent higher than the label' : 'steady, and that is all'} />
            <Stat label="Reversals each second" value={ac ? HZ * 2 : 0} u="" foot={ac ? `${HZ} complete cycles` : 'it never reverses'} />
          </> : <>
            <Stat label="Voltage on the metal case" value={f.caseV} u="V" accent={f.caseV > 0} foot={f.caseV ? 'and nothing is warning you' : 'safe to touch'} />
            <Stat label="Through a person" value={f.personMa} u="mA" foot={f.personMa > 10 ? 'enough to be very serious' : f.personMa ? 'caught before it mattered' : 'none'} />
            <Stat label="Does protection act?" value={f.trips ? 'Yes' : 'No'} u="" foot={f.trips ? 'the circuit opens' : 'nothing has been detected'} />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 286, background: 'var(--paper)' }}
        role="img" aria-label={mode === 'waveform'
          ? `A voltage trace, ${ac ? 'a sine wave swinging between plus and minus 170 volts' : 'a flat line at 120 volts'}.`
          : `An outlet with three holes and an appliance, in the "${f.name}" condition.`}>
        <svg viewBox="0 0 560 248" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 232 }}>
          {mode === 'waveform' ? <>
            <line x1="56" y1="120" x2="508" y2="120" stroke="var(--rule)" strokeWidth="1.5" />
            {[RMS, -RMS].map((v) => (
              <g key={v}>
                <line x1="56" y1={120 - v * 0.42} x2="508" y2={120 - v * 0.42} stroke="oklch(0.62 0.10 155)" strokeWidth="1.4" strokeDasharray="6 5" />
                <text x="512" y={124 - v * 0.42} fontFamily="var(--sans)" fontSize="10.5" fill="oklch(0.42 0.11 155)">{v > 0 ? '+120' : '−120'}</text>
              </g>
            ))}
            <polyline
              points={Array.from({ length: 181 }, (_, i) => {
                const x = 56 + (i / 180) * 452
                const u = (i / 180) * 2 - phase
                const v = ac ? PEAK * Math.sin(u * Math.PI * 2) : RMS
                return `${x},${120 - v * 0.42}`
              }).join(' ')}
              fill="none" stroke="oklch(0.52 0.16 28)" strokeWidth="3.2" strokeLinejoin="round" />
            <text x="56" y="30" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">
              {ac ? 'SIXTY TIMES A SECOND, IN REAL LIFE — SLOWED HERE SO YOU CAN SEE IT' : 'A BATTERY: ONE VALUE, ONE DIRECTION'}
            </text>
            <text x="56" y="226" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
              {ac ? 'the green lines are what it is called; the red line is what it does' : 'nothing to average — the label and the reality are the same number'}
            </text>
          </> : <>
            <rect x="60" y="56" width="150" height="130" rx="14" fill="oklch(0.95 0.015 85)" stroke="var(--machine)" strokeWidth="3" />
            {[['LIVE', 92, 'oklch(0.56 0.17 28)'], ['NEUTRAL', 128, 'oklch(0.50 0.08 255)'], ['GROUND', 164, 'oklch(0.46 0.12 155)']].map(([n, y, c]) => (
              <g key={n}>
                <rect x="84" y={y - 7} width="16" height="14" rx="3" fill={c} />
                <text x="110" y={y + 5} fontFamily="var(--sans)" fontSize="11.5" fontWeight="600" fill="var(--ink)">{n}</text>
              </g>
            ))}
            <rect x="300" y="70" width="150" height="104" rx="10"
              fill={f.caseV > 0 ? 'oklch(0.84 0.11 28)' : 'oklch(0.90 0.03 85)'} stroke="var(--machine)" strokeWidth="3" />
            <text x="375" y="118" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="700" letterSpacing="1.2" fill="var(--ink)">METAL CASE</text>
            <text x="375" y="138" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" style={{ fontVariantNumeric: 'tabular-nums' }} fill="var(--ink-2)">{f.caseV} V</text>
            <path d="M 210 92 L 300 92" stroke="oklch(0.56 0.17 28)" strokeWidth="5" />
            <path d="M 210 128 L 300 128" stroke="oklch(0.50 0.08 255)" strokeWidth="5" />
            <path d="M 210 164 L 288 164 L 288 100" stroke="oklch(0.46 0.12 155)" strokeWidth="5" fill="none"
              opacity={fault === 'nogrnd' ? 0.18 : 1} strokeDasharray={fault === 'nogrnd' ? '6 6' : '0'} />
            {f.personMa > 0 && <>
              <circle cx="470" cy="196" r="15" fill="oklch(0.84 0.07 45)" stroke="var(--machine)" strokeWidth="2.4" />
              <path d="M 452 182 L 420 150" stroke={f.personMa > 10 ? 'oklch(0.56 0.17 28)' : 'oklch(0.60 0.10 155)'} strokeWidth="4" />
              <text x="492" y="200" fontFamily="var(--sans)" fontSize="11.5" fill={f.personMa > 10 ? 'oklch(0.48 0.16 28)' : 'var(--muted)'}>{f.personMa} mA</text>
            </>}
            {f.trips && <text x="135" y="212" textAnchor="middle" fontFamily="var(--sans)" fontSize="12" fontWeight="700" fill="oklch(0.40 0.12 155)">CIRCUIT OPEN</text>}
            <text x="60" y="38" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">THE OUTLET</text>
            <text x="300" y="38" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">SOMETHING PLUGGED INTO IT</text>
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {mode === 'waveform'
            ? 'Figures are for a 120 V, 60 Hz supply. Much of the world uses about 230 V at 50 Hz, and the same reasoning applies with different numbers.'
            : 'A teaching diagram of how the protection is meant to work. Real wiring faults are a matter for an electrician, and this is not instruction for working on anything live.'}
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'waveform' ? (
          <button className="hw-btn" onClick={() => setAc((x) => !x)} aria-pressed={ac}
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em', padding: '13px 22px', borderColor: 'var(--ink)', background: ac ? 'var(--ink)' : 'var(--paper)', color: ac ? '#f6f1e7' : 'var(--ink)' }}>
            {ac ? 'SHOW ME A BATTERY INSTEAD' : 'BACK TO THE WALL'}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {FAULTS.map((x) => (
              <button key={x.id} className="hw-btn" onClick={() => setFault(x.id)} aria-pressed={fault === x.id}
                style={{ fontSize: 12.5, padding: '9px 12px', background: fault === x.id ? 'var(--ink)' : 'var(--paper)', color: fault === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
                {x.name}
              </button>
            ))}
          </div>
        )}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 240, textAlign: 'right' }}>
          {mode === 'waveform' ? 'Watch the peak against the dashed line.' : 'Take the second one, then the third.'}
        </span>
      </div>
    </div>
  )
}

function Mark({ text }) {
  return <>{String(text).split(/(\*\*[^*]+\*\*)/g).map((b, i) =>
    b.startsWith('**') && b.endsWith('**')
      ? <strong key={i} style={{ fontWeight: 600 }}>{b.slice(2, -2)}</strong>
      : <span key={i}>{b}</span>)}</>
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
