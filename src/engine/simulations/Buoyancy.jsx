import { useRef, useState, useCallback, useEffect } from 'react'
import { useRafLoop } from '../../lib/sim.js'

// Buoyancy, drawn two ways over one piece of physics.
//
//   variant "ship"    (Lesson 18) — a liquid with a surface. The object settles
//                     at a waterline, submerged by exactly the fraction that
//                     makes the displaced water weigh what the object weighs.
//   variant "balloon" (Lesson 17) — a gas with no surface to settle at. Lighter
//                     than its surroundings means it simply keeps going up.
//
// The single sentence underneath both: a fluid pushes up with the weight of the
// fluid the object has pushed out of the way. Everything else is arithmetic.

const WATER = 62.4        // lb per cubic foot
const AIR_AT = (f) => 39.7 / (f + 459.67) // lb per cubic foot, near enough

export default function Buoyancy({ active, variant = 'ship' }) {
  const isShip = variant === 'ship'

  // Ship: a hull of fixed outside volume, made heavier by cargo.
  const [hollow, setHollow] = useState(true)
  const [cargo, setCargo] = useState(0)
  // Balloon: a parcel of air whose density falls as you heat it.
  const [parcelF, setParcelF] = useState(70)
  const outsideF = 60

  const VOL = isShip ? 100 : 700          // cubic feet
  const STEEL = 490                       // lb per cubic foot
  const steelShell = 1800                 // lb of plate in the hull
  const solidSteel = STEEL * VOL          // 49,000 lb of solid steel, which sinks

  const weight = isShip
    ? (hollow ? steelShell + cargo : solidSteel)
    : VOL * AIR_AT(parcelF)

  const fluidDensity = isShip ? WATER : AIR_AT(outsideF)
  const objectDensity = weight / VOL
  const buoyant = VOL * fluidDensity      // if fully submerged
  const floats = objectDensity < fluidDensity
  const submergedFraction = Math.min(1, objectDensity / fluidDensity)

  const sim = useRef({ y: 0, v: 0 })
  const bodyRef = useRef(null)
  const [ui, setUi] = useState({ y: 0 })

  const step = useCallback((dt) => {
    const s = sim.current
    if (isShip) return
    // A parcel lighter than its surroundings accelerates upward; heavier, down.
    const net = (fluidDensity - objectDensity) / Math.max(0.005, objectDensity)
    s.v += net * 9.0 * dt
    s.v *= 0.965
    s.y = Math.max(-70, Math.min(150, s.y + s.v * dt * 10))
    if (s.y <= -70 || s.y >= 150) s.v = 0
    if (bodyRef.current) bodyRef.current.style.bottom = `${86 + s.y}px`
    setUi({ y: s.y })
  }, [isShip, fluidDensity, objectDensity])

  useRafLoop(active && !isShip, step)

  useEffect(() => { sim.current.y = 0; sim.current.v = 0; setUi({ y: 0 }) }, [variant])

  const reset = () => {
    sim.current.y = 0; sim.current.v = 0
    if (bodyRef.current) bodyRef.current.style.bottom = '86px'
    setUi({ y: 0 })
  }

  // ---- drawing -----------------------------------------------------------
  const WATERLINE = 150
  const hullH = 74
  const sunkPx = Math.round(submergedFraction * hullH)

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{isShip ? 'How heavy, per cubic foot' : 'The parcel, per cubic foot'}</span>
          <span className="hw-readout-num" style={{ color: floats ? 'var(--builder)' : 'var(--brake)' }}>
            {objectDensity < 1 ? objectDensity.toFixed(3) : objectDensity.toFixed(1)}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> lb/ft³</span>
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 232, marginTop: 4 }}>
            {isShip ? 'Water' : 'The air around it'} weighs{' '}
            {fluidDensity < 1 ? fluidDensity.toFixed(3) : fluidDensity.toFixed(1)} lb/ft³.
            {' '}{floats ? 'Less than the fluid, so up it goes.' : 'More than the fluid, so down it goes.'}
          </span>
        </div>

        <div data-align="right" style={{ width: 262, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">The two forces</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12.5 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <span style={{ color: 'var(--ink-2)' }}>Weight, pulling down</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 72, color: 'var(--muted)' }}>{weight.toFixed(1)} lb</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <span style={{ color: 'var(--ink-2)' }}>Fluid pushed aside</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 72, color: 'var(--muted)' }}>
                {(isShip ? buoyant * submergedFraction : buoyant).toFixed(1)} lb
              </span>
            </div>
          </div>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', minHeight: 48, lineHeight: 1.5 }}>
            {isShip
              ? (floats
                ? `It settles until the water it has pushed aside weighs exactly what it does — ${Math.round(submergedFraction * 100)}% under.`
                : 'Even fully under, the water it pushes aside weighs less than the steel does. There is no depth at which the books balance.')
              : (floats
                ? 'Warmer air is thinner, so the same parcel weighs less than the air it displaces. The difference is what lifts it.'
                : 'Cooler than its surroundings, so it is the denser of the two. It sinks.')}
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 270, background: isShip ? 'var(--paper)' : 'linear-gradient(#eef4f7 0%, #fffdf7 100%)' }}
        role="img"
        aria-label={isShip
          ? `A steel hull in water, ${Math.round(submergedFraction * 100)} per cent submerged.`
          : `A parcel of air at ${parcelF} degrees in surrounding air at ${outsideF} degrees.`}
      >
        {isShip ? (
          <>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: WATERLINE - 44, background: '#dbe9ef', borderTop: '2px solid #a9c6d3' }} />
            {/* the water the hull has pushed out of the way */}
            <div style={{
              position: 'absolute', left: '50%', marginLeft: -84, bottom: WATERLINE - 44 - sunkPx,
              width: 168, height: sunkPx, background: '#bcd7e2', border: '1px dashed #7ba4b6'
            }} />
            <div style={{
              position: 'absolute', left: '50%', marginLeft: -84, bottom: WATERLINE - 44 - sunkPx,
              width: 168, height: hullH,
              background: hollow ? 'var(--car-cabin)' : 'var(--machine)',
              borderRadius: '4px 4px 22px 22px'
            }}>
              {hollow && (
                <div style={{ position: 'absolute', left: 10, right: 10, top: 8, bottom: 26, background: 'var(--paper)', borderRadius: 3 }}>
                  <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: 'var(--muted)' }}>
                    {cargo > 0 ? `${cargo} LB CARGO` : 'AIR'}
                  </span>
                </div>
              )}
              {!hollow && (
                <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#f6f1e7' }}>
                  SOLID STEEL
                </span>
              )}
            </div>
            <div style={{ position: 'absolute', left: 22, bottom: 14, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
              The dashed box is the water that had to go somewhere else.
            </div>
          </>
        ) : (
          <>
            {[30, 78, 126, 174, 222].map((x) => (
              <div key={x} style={{ position: 'absolute', left: `${x / 4}%`, top: 16, bottom: 40, width: 1, background: 'rgba(120,150,165,.18)' }} />
            ))}
            <div ref={bodyRef} style={{
              position: 'absolute', left: '50%', marginLeft: -44, bottom: 86,
              width: 88, height: 74, borderRadius: '44px 44px 18px 18px',
              background: `oklch(${(0.72 - Math.min(0.24, (parcelF - 60) / 900)).toFixed(3)} ${(0.05 + Math.min(0.13, (parcelF - 60) / 2200)).toFixed(3)} 45)`,
              border: '2px solid var(--accent-deep)'
            }}>
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 700, color: '#fffdf7' }}>
                {parcelF}°F
              </span>
            </div>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 40, height: 1, background: '#cdc0ab' }} />
            <div style={{ position: 'absolute', left: 22, bottom: 14, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
              The air around it is {outsideF}°F throughout. Only the parcel changes.
            </div>
          </>
        )}
      </div>

      <div className="hw-controls">
        {isShip ? (
          <>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="hw-btn" onClick={() => setHollow(false)} aria-pressed={!hollow}
                style={{ padding: '12px 16px', borderColor: !hollow ? 'var(--accent)' : 'var(--field)', background: !hollow ? 'var(--accent-wash-2)' : 'var(--paper)' }}>
                Solid steel
              </button>
              <button className="hw-btn" onClick={() => setHollow(true)} aria-pressed={hollow}
                style={{ padding: '12px 16px', borderColor: hollow ? 'var(--accent)' : 'var(--field)', background: hollow ? 'var(--accent-wash-2)' : 'var(--paper)' }}>
                Hollow hull
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 230 }}>
              <label htmlFor="hw-cargo" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
                Cargo aboard · {cargo} lb
              </label>
              <input id="hw-cargo" type="range" min="0" max="5400" step="100"
                value={cargo} disabled={!hollow}
                onChange={(e) => setCargo(Number(e.target.value))}
                style={{ width: 230, accentColor: 'var(--accent)', height: 28, opacity: hollow ? 1 : 0.4 }} />
            </div>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 280, textAlign: 'right' }}>
              Same steel either way. Load it until the books stop balancing.
            </span>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 250 }}>
              <label htmlFor="hw-parcel" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
                Heat the parcel · {parcelF}°F
              </label>
              <input id="hw-parcel" type="range" min="0" max="300" step="5"
                value={parcelF} onChange={(e) => { setParcelF(Number(e.target.value)); reset() }}
                style={{ width: 250, accentColor: 'var(--accent)', height: 28 }} />
            </div>
            <button className="hw-btn" onClick={reset}>PUT IT BACK</button>
            <span style={{ flex: 1 }} />
            <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 280, textAlign: 'right' }}>
              Cool it below {outsideF}°F and watch what it does instead.
            </span>
          </>
        )}
      </div>
    </div>
  )
}
