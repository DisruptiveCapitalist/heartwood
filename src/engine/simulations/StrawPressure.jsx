import { useState } from 'react'

// Lesson 19. The straw, and the fact that nobody pulls anything.
//
// The learner reduces the pressure inside the straw and the liquid climbs — but
// the arrows make clear that the climbing is being done by the atmosphere
// pressing on the surface of the drink, not by anything reaching down the tube.
//
// Then the switch that settles it: take the atmosphere away and suck as hard as
// you like. Nothing happens at all.

const ATM_PSI = 14.7
const WATER_FT_PER_PSI = 2.31      // feet of water supported per psi of difference
const STRAW_IN = 10                // how much straw is drawn

export default function StrawPressure() {
  const [suck, setSuck] = useState(20)      // per cent of the way to a vacuum
  const [atmosphere, setAtmosphere] = useState(true)

  const outside = atmosphere ? ATM_PSI : 0
  const inside = outside * (1 - suck / 100)
  const difference = outside - inside
  const riseFt = difference * WATER_FT_PER_PSI
  const riseIn = riseFt * 12
  const drawnIn = Math.min(STRAW_IN, riseIn)
  const reachesMouth = riseIn >= STRAW_IN
  const maxFt = ATM_PSI * WATER_FT_PER_PSI

  const strawH = 176
  const pxPerInch = strawH / STRAW_IN
  const colH = drawnIn * pxPerInch

  const Arrow = ({ left, size }) => (
    <div style={{ position: 'absolute', left, bottom: 64, width: 0 }}>
      <div style={{ position: 'absolute', left: -1.5, bottom: 0, width: 3, height: size, background: 'var(--builder)' }} />
      <div style={{
        position: 'absolute', left: -6, bottom: size - 1, width: 0, height: 0,
        borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '9px solid var(--builder)'
      }} />
    </div>
  )

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">The drink climbs</span>
          <span className="hw-readout-num" style={{ color: riseIn > 0.2 ? 'var(--ink)' : 'var(--muted)' }}>
            {riseIn < 100 ? riseIn.toFixed(1) : Math.round(riseIn)}
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> inches</span>
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 236, marginTop: 4 }}>
            {!atmosphere
              ? 'Nothing. Suck as hard as you like — there is nothing outside to do the pushing.'
              : reachesMouth
                ? 'It is at your mouth. The atmosphere did all of it.'
                : 'Rising, because the outside push now beats the inside one.'}
          </span>
        </div>

        <div data-align="right" style={{ width: 262, display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'right' }}>
          <span className="hw-readout-label">The two pressures</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12.5 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <span style={{ color: 'var(--ink-2)' }}>Air pressing on the drink</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 62, color: 'var(--builder)' }}>{outside.toFixed(1)} psi</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <span style={{ color: 'var(--ink-2)' }}>Inside the straw</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 62, color: 'var(--accent)' }}>{inside.toFixed(1)} psi</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid var(--rule-2)', paddingTop: 4 }}>
              <span style={{ color: 'var(--ink-2)' }}>Difference doing the work</span>
              <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 62, color: 'var(--muted)' }}>{difference.toFixed(1)} psi</span>
            </div>
          </div>
          <span style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            Even a perfect vacuum only reaches {maxFt.toFixed(0)} feet. That is the whole atmosphere's worth of push, and there is no more available.
          </span>
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 300, background: atmosphere ? 'var(--paper)' : '#efeae4' }}
        role="img"
        aria-label={`A straw in a glass. Outside pressure ${outside.toFixed(1)} psi, inside ${inside.toFixed(1)}, and the drink has climbed ${riseIn.toFixed(1)} inches.`}
      >
        {/* the atmosphere pressing on the surface of the drink */}
        {atmosphere && [-116, -92, 62, 86, 110].map((x, i) => (
          <Arrow key={i} left={`calc(50% + ${x}px)`} size={26} />
        ))}
        {!atmosphere && (
          <span style={{
            position: 'absolute', left: '50%', top: 26, transform: 'translateX(-50%)',
            fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 700, letterSpacing: '.16em', color: 'var(--muted)'
          }}>
            NO ATMOSPHERE
          </span>
        )}

        {/* the glass */}
        <div style={{
          position: 'absolute', left: '50%', marginLeft: -78, bottom: 34, width: 156, height: 96,
          border: '3px solid #b9cdd6', borderTop: 'none', borderRadius: '0 0 10px 10px', background: 'rgba(219,233,239,.35)'
        }} />
        <div style={{ position: 'absolute', left: '50%', marginLeft: -75, bottom: 37, width: 150, height: 58, background: '#c9a26a' }} />

        {/* the straw */}
        <div style={{
          position: 'absolute', left: '50%', marginLeft: -13, bottom: 64, width: 26, height: strawH,
          border: '2px solid #b9cdd6', borderRadius: 3, background: 'var(--paper)', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: colH, background: '#c9a26a' }} />
        </div>

        {/* inch marks up the straw */}
        {[2, 4, 6, 8, 10].map((n) => (
          <div key={n} style={{ position: 'absolute', left: '50%', marginLeft: 15, bottom: 64 + n * pxPerInch, width: 7, height: 1, background: 'var(--rule)' }}>
            <span style={{ position: 'absolute', left: 10, top: -7, fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--muted)' }}>{n}"</span>
          </div>
        ))}

        <div style={{ position: 'absolute', left: 22, bottom: 10, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          The blue arrows are the only thing pushing anywhere. Notice that none of them is inside the straw.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 250 }}>
          <label htmlFor="hw-suck" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
            How much air you draw out · {suck}%
          </label>
          <input id="hw-suck" type="range" min="0" max="100" step="1"
            value={suck} onChange={(e) => setSuck(Number(e.target.value))}
            style={{ width: 250, accentColor: 'var(--accent)', height: 28 }} />
        </div>

        <button
          className="hw-btn"
          onClick={() => setAtmosphere((a) => !a)}
          aria-pressed={!atmosphere}
          style={{
            letterSpacing: '.04em',
            borderColor: atmosphere ? 'var(--field)' : 'var(--brake)',
            color: atmosphere ? 'var(--ink-3)' : 'var(--brake)'
          }}
        >
          {atmosphere ? 'Take the atmosphere away' : 'Give the atmosphere back'}
        </button>
      </div>
    </div>
  )
}
