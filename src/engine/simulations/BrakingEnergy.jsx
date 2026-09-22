import { useRef, useState, useCallback } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Lesson 11. Lesson 1's braking car, with the books opened.
//
// The motion does not stop. It is drained into four buckets, and the learner
// watches the level in the car fall as the levels in the buckets rise. Two
// things to notice:
//
//   Doubling the speed does not double what has to be got rid of. It
//   quadruples it — the bar at 60 is four times the bar at 30. That is the
//   single most useful fact about road safety anybody ever learns.
//
//   Braking gently does not reduce the total by one joule. It only spreads it
//   over more time, which is Lesson 5's bargain wearing a different coat.

const MASS_KG = 1588          // a 3,500 lb car
const MPH_TO_MS = 0.44704
const MUG = 79                // kJ to bring a mug of water to the boil
const DISC_HEAT_CAP = 3.68    // kJ per °F rise across two front discs

const SHARE = [
  { id: 'brakes', label: 'The brake discs', share: 0.90, tone: 'var(--brake)' },
  { id: 'tires',  label: 'Tires and road',  share: 0.055, tone: 'var(--accent-bright)' },
  { id: 'air',    label: 'Pushing air',     share: 0.04, tone: 'var(--builder)' },
  { id: 'sound',  label: 'Sound',           share: 0.005, tone: 'var(--muted)' }
]

const READOUT_HZ = 15

export default function BrakingEnergy({ active }) {
  const [speed0, setSpeed0] = useState(60)
  const [hard, setHard] = useState(true)
  const sim = useRef({ v: 0, running: false, spent: 0, acc: 0, x: 8 })
  const carRef = useRef(null)

  const total = 0.5 * MASS_KG * (speed0 * MPH_TO_MS) ** 2 / 1000   // kJ
  const [ui, setUi] = useState({ v: 0, spent: 0, running: false })

  const step = useCallback((dt) => {
    const s = sim.current
    if (!s.running) return

    const rate = hard ? 7.5 : 2.6        // m/s² — a hard stop versus an easy one
    const before = s.v
    s.v = Math.max(0, s.v - rate * dt)
    const shed = 0.5 * MASS_KG * (before ** 2 - s.v ** 2) / 1000
    s.spent += shed
    s.x += s.v * dt * 1.6

    if (carRef.current) carRef.current.style.left = `${Math.min(74, s.x)}%`
    if (s.v <= 0) { s.running = false; setUi({ v: 0, spent: s.spent, running: false }); return }

    s.acc += dt
    if (s.acc >= 1 / READOUT_HZ) {
      s.acc = 0
      setUi({ v: s.v, spent: s.spent, running: true })
    }
  }, [hard])

  useRafLoop(active, step)

  const go = () => {
    const s = sim.current
    s.v = speed0 * MPH_TO_MS; s.spent = 0; s.x = 8; s.running = true
    if (carRef.current) carRef.current.style.left = '8%'
    setUi({ v: s.v, spent: 0, running: true })
  }

  const reset = () => {
    const s = sim.current
    s.v = 0; s.spent = 0; s.x = 8; s.running = false
    if (carRef.current) carRef.current.style.left = '8%'
    setUi({ v: 0, spent: 0, running: false })
  }

  const remaining = Math.max(0, total - ui.spent)
  const discRise = (ui.spent * 0.90) / DISC_HEAT_CAP

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">Motion still in the car</span>
          <span className="hw-readout-num" style={{ color: remaining > 1 ? 'var(--ink)' : 'var(--muted)' }}>
            {remaining.toFixed(0)}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> kJ</span>
          </span>
          <div style={{ width: 210, height: 10, background: 'var(--rule-2)', borderRadius: 5, overflow: 'hidden', marginTop: 4 }}>
            <div style={{ height: 10, width: `${(remaining / total) * 100}%`, background: 'var(--accent)' }} />
          </div>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 220, marginTop: 4 }}>
            At {speed0} mph that is {(total / MUG).toFixed(1)} mugs of water brought to the boil.
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">Where it went</span>
          {SHARE.map((b) => {
            const v = ui.spent * b.share
            return (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, fontSize: 12.5 }}>
                <span style={{ color: 'var(--ink-2)' }}>{b.label}</span>
                <span style={{ width: 84, height: 7, background: 'var(--rule-2)', borderRadius: 2, overflow: 'hidden' }}>
                  <span style={{ display: 'block', height: 7, width: `${total ? (v / (total * b.share)) * 100 : 0}%`, background: b.tone }} />
                </span>
                <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 52, color: 'var(--muted)' }}>{v.toFixed(0)} kJ</span>
              </div>
            )
          })}
          <span aria-live="polite" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            {ui.spent > 1
              ? `The front discs are about ${discRise.toFixed(0)}°F hotter than before you braked.`
              : 'Nothing has moved yet.'}
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: 'linear-gradient(var(--paper) 0%, var(--paper) 66%, var(--ground) 66%, var(--ground) 100%)' }}
        role="img"
        aria-label="A car braking to a stop, with the energy of its motion draining into brake heat, tires, air and sound."
      >
        <div style={{ position: 'absolute', left: 0, right: 0, top: '66%', height: 1, background: '#cdc0ab' }} />
        <div ref={carRef} style={{ position: 'absolute', bottom: 54, left: '8%', width: 150, height: 74 }}>
          <div style={{ position: 'absolute', bottom: 12, left: 0, width: 150, height: 38, borderRadius: '7px 12px 6px 6px', background: 'var(--car-body)' }} />
          <div style={{ position: 'absolute', bottom: 46, left: 32, width: 82, height: 30, borderRadius: '10px 10px 2px 2px', background: 'var(--car-cabin)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 18, width: 26, height: 26, borderRadius: '50%', background: 'var(--tyre)', border: '4px solid var(--tyre-rim)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 106, width: 26, height: 26, borderRadius: '50%', background: 'var(--tyre)', border: '4px solid var(--tyre-rim)' }} />
          {/* the discs glowing as they take the energy */}
          {[18, 106].map((x) => (
            <div key={x} style={{
              position: 'absolute', bottom: 7, left: x + 7, width: 12, height: 12, borderRadius: '50%',
              background: 'var(--brake)', opacity: Math.min(0.95, (ui.spent / Math.max(1, total)) * 1.1)
            }} />
          ))}
        </div>

        <div style={{ position: 'absolute', left: 22, bottom: 14, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          The bar on the left empties. Nothing about it disappears — watch the right-hand side fill by the same amount.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 200 }}>
          <label htmlFor="hw-brake-speed" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            Starting speed · {speed0} mph
          </label>
          <input id="hw-brake-speed" type="range" min="20" max="80" step="5"
            value={speed0} onChange={(e) => { setSpeed0(Number(e.target.value)); reset() }}
            style={{ width: 200, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <button
          className="hw-btn"
          onClick={() => setHard((h) => !h)}
          aria-pressed={hard}
          style={{ letterSpacing: '.04em', borderColor: hard ? 'var(--brake)' : 'var(--field)', color: hard ? 'var(--brake)' : 'var(--ink-3)' }}
        >
          {hard ? 'Braking hard' : 'Braking gently'}
        </button>

        <button className="hw-btn hw-btn-solid" onClick={go} style={{ padding: '13px 24px' }}>DRIVE AND BRAKE</button>
        <button className="hw-btn" onClick={reset}>RESET</button>
      </div>
    </div>
  )
}
