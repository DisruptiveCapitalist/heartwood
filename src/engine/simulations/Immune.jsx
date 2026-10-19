import { useState } from 'react'

// Anatomy & Physiology, Week 5. One defence, two views.
//
//   defence      (Lesson 21) the same infection, met for the first time and the second
//   inflammation (Lesson 22) what the four familiar signs actually are
//
// The first mode is built around the comparison that makes immune memory
// obvious: a first meeting takes about twelve days to clear and the antibody
// response does not even begin for five of them, while a second meeting is over
// in three with an antibody level several times higher. That gap is what a
// vaccine buys, and it is visible rather than asserted.
//
// The spec warns against presenting innate and adaptive defences as separate
// systems, so the innate line runs in both cases and the copy says plainly that
// it is the innate response which holds the line while the adaptive one gets
// ready — and which tells it what to get ready for.

const DAYS = 18

function curves(day, seen) {
  if (!seen) {
    return {
      pathogen: 100 * Math.exp(-(((day - 5.5) / 2.8) ** 2)),
      innate: 62 * (1 - Math.exp(-day / 0.45)) * Math.exp(-day / 16),
      antibody: 100 / (1 + Math.exp(-(day - 9) / 1.8))
    }
  }
  return {
    pathogen: 22 * Math.exp(-(((day - 1.4) / 1.0) ** 2)),
    innate: 48 * (1 - Math.exp(-day / 0.3)) * Math.exp(-day / 5),
    antibody: 90 + 620 / (1 + Math.exp(-(day - 2.4) / 0.8))
  }
}

const SIGNS = [
  { id: 'red', name: 'Redness', why: `Small vessels nearby widen, so far more blood reaches the spot. More blood means more red cells at the surface.` },
  { id: 'heat', name: 'Heat', why: `The same extra blood, arriving at your core temperature, into skin that is normally cooler than the middle of you.` },
  { id: 'swell', name: 'Swelling', why: `Those vessels also become deliberately leaky, letting fluid and cells out into the tissue. The swelling is the delivery, not the damage.` },
  { id: 'pain', name: 'Pain', why: `Chemicals released at the site lower the threshold of the nerve endings there — so ordinary pressure now hurts, and you leave it alone.` }
]

export default function Immune({ mode = 'defence' }) {
  const [day, setDay] = useState(6)
  const [seen, setSeen] = useState(false)
  const [hours, setHours] = useState(12)
  const [blocked, setBlocked] = useState(false)
  const [sign, setSign] = useState('red')

  const c = curves(day, seen)
  const firstPeak = 100
  const peak = seen ? 710 : 100
  const cleared = seen ? 3 : 12
  const s = SIGNS.find((x) => x.id === sign)

  // Inflammation mode: a splinter, over four days.
  const h = hours
  const neutrophils = blocked ? 4 : 100 * Math.exp(-(((h - 14) / 14) ** 2))
  const macrophages = blocked ? 3 : 100 * Math.exp(-(((h - 56) / 34) ** 2))
  const bugs = blocked ? Math.min(100, 8 * Math.exp(h / 26)) : 100 * Math.exp(-h / 17)
  const healing = blocked ? Math.max(0, 8 - h / 14) : Math.min(100, Math.max(0, (h - 22) * 1.3))

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{mode === 'defence' ? (seen ? 'Met it before' : 'First meeting') : 'The splinter site'}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 23 }}>
            {mode === 'defence'
              ? (c.pathogen < 2 ? 'Clear' : c.pathogen > 50 ? 'Losing ground' : 'Holding it')
              : (blocked ? 'Going wrong' : h < 24 ? 'Clearing it out' : h < 60 ? 'Rebuilding' : 'Nearly mended')}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {mode === 'defence'
              ? (seen
                ? 'The antibody was already there and more arrived within a day. It was over before you would have felt much — which is the whole of what a vaccine buys.'
                : day < 5
                  ? 'The fast defences are holding the line, and they are also carrying samples back so the slow ones know what to build. Nothing specific has arrived yet.'
                  : day < 11
                    ? 'The specific response has started. Antibody is climbing, and the infection has turned the corner.'
                    : 'Cleared — and a small number of cells will stay behind, remembering this exact intruder for years.')
              : (blocked
                ? 'With the response blocked, nothing is arriving to clear the bacteria and nothing is rebuilding. The swelling was never the problem.'
                : h < 24
                  ? 'The first wave has arrived in numbers and is clearing the bacteria. Everything you can see and feel is that delivery being made.'
                  : 'The second wave is tidying up and directing the rebuilding. The signs settle as the work finishes.')}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'defence' ? <>
            <Stat label="Days to clear it" value={cleared} u="days" accent foot={seen ? 'four times faster' : 'and you would feel every one'} />
            <Stat label="Peak antibody" value={`${(peak / firstPeak).toFixed(0)}×`} u="" foot={seen ? 'against a first meeting' : 'the baseline for comparison'} />
            <Stat label="Specific response begins" value={seen ? 'day 1' : 'day 5'} u="" foot="the rest is the fast defences holding on" />
          </> : <>
            <Stat label="First wave" value={Math.round(neutrophils)} u="%" foot="arriving within hours" />
            <Stat label="Second wave" value={Math.round(macrophages)} u="%" accent foot="clearing up and directing repair" />
            <Stat label="Bacteria left" value={Math.round(bugs)} u="%" foot={blocked ? 'climbing — nothing is stopping them' : 'falling as the cells arrive'} />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 284, background: 'var(--paper)' }}
        role="img" aria-label={mode === 'defence'
          ? `Three lines over eighteen days: the infection, the fast defences and the antibody response.`
          : `A splinter site over four days, with waves of cells arriving and the wound closing.`}>
        <svg viewBox="0 0 560 246" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 230 }}>
          {mode === 'defence' ? <>
            {[
              { key: 'pathogen', label: 'the infection', hue: 28, scale: 1 },
              { key: 'innate', label: 'fast defences', hue: 85, scale: 1 },
              { key: 'antibody', label: 'antibody', hue: 300, scale: seen ? 0.14 : 1 }
            ].map((line) => {
              const pts = Array.from({ length: DAYS * 4 + 1 }, (_, i) => {
                const d = i / 4
                const v = curves(d, seen)[line.key] * line.scale
                return `${60 + (d / DAYS) * 420},${196 - Math.min(100, v) * 1.5}`
              }).join(' ')
              return <g key={line.key}>
                <polyline points={pts} fill="none" stroke={`oklch(0.55 0.14 ${line.hue})`} strokeWidth="3.2" strokeLinejoin="round" />
                <text x="488" y={196 - Math.min(100, curves(DAYS, seen)[line.key] * line.scale) * 1.5 + 4}
                  fontFamily="var(--sans)" fontSize="11.5" fill={`oklch(0.45 0.13 ${line.hue})`}>{line.label}</text>
              </g>
            })}
            <line x1="60" y1="196" x2="480" y2="196" stroke="var(--rule)" strokeWidth="1.5" />
            {[0, 3, 6, 9, 12, 15, 18].map((d) => (
              <g key={d}>
                <line x1={60 + (d / DAYS) * 420} y1="192" x2={60 + (d / DAYS) * 420} y2="200" stroke="var(--rule)" strokeWidth="1.5" />
                <text x={60 + (d / DAYS) * 420} y="216" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fill="var(--muted)">{d}</text>
              </g>
            ))}
            <text x="270" y="236" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">DAYS</text>
            <line x1={60 + (day / DAYS) * 420} y1="34" x2={60 + (day / DAYS) * 420} y2="196" stroke="var(--accent)" strokeWidth="2" />
            {seen && <text x="60" y="28" fontFamily="var(--sans)" fontSize="11" fill="var(--muted)">antibody shown at one-seventh scale — it goes far off the top</text>}
          </> : <>
            <rect x="60" y="56" width="420" height="30" rx="6" fill="oklch(0.88 0.04 45)" stroke="oklch(0.50 0.08 45)" strokeWidth="2" />
            <rect x="60" y="86" width="420" height="78" fill="oklch(0.94 0.02 45)" stroke="oklch(0.56 0.06 45)" strokeWidth="1.5" />
            <path d="M 262 46 l 0 56" stroke="var(--machine)" strokeWidth="5" strokeLinecap="round" />
            {!blocked && (
              <ellipse cx="268" cy="100" rx={26 + neutrophils * 0.26} ry={16 + neutrophils * 0.12}
                fill="oklch(0.74 0.13 28)" opacity="0.32" />
            )}
            {Array.from({ length: Math.round(neutrophils / 9) }, (_, i) => (
              <circle key={`n${i}`} cx={200 + ((i * 53) % 150)} cy={96 + ((i * 29) % 58)} r="6" fill="oklch(0.60 0.15 28)" />
            ))}
            {Array.from({ length: Math.round(macrophages / 14) }, (_, i) => (
              <circle key={`m${i}`} cx={214 + ((i * 61) % 130)} cy={104 + ((i * 37) % 48)} r="9" fill="oklch(0.50 0.12 300)" opacity="0.85" />
            ))}
            <rect x="60" y="178" width="420" height="16" rx="8" fill="oklch(0.93 0.02 155)" />
            <rect x="60" y="178" width={4.2 * healing} height="16" rx="8" fill="oklch(0.58 0.13 155)" />
            <text x="56" y="190" textAnchor="end" fontFamily="var(--sans)" fontSize="11.5" fontWeight="600" fill="var(--label)">mended</text>
            <text x="60" y="222" fontFamily="var(--sans)" fontSize="11.5" fill="var(--muted)">
              hour {h} · <tspan fill="oklch(0.50 0.15 28)">● first wave</tspan> · <tspan fill="oklch(0.44 0.12 300)">● second wave</tspan>
            </text>
            <text x="480" y="42" textAnchor="end" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">A SPLINTER WENT IN HERE</text>
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          {mode === 'defence'
            ? 'Illustrative shapes rather than one real infection — the timings differ enormously between pathogens and between people.'
            : 'A teaching model. Inflammation deep inside you produces none of the four visible signs, which is why it cannot be judged by looking.'}
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'defence' ? <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 230 }}>
            <label htmlFor="hw-day" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Day {day}</label>
            <input id="hw-day" type="range" min="0" max={DAYS} step="1" value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              style={{ width: 230, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <button className="hw-btn" onClick={() => setSeen((x) => !x)} aria-pressed={seen}
            style={{ background: seen ? 'var(--ink)' : 'var(--paper)', color: seen ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
            {seen ? 'BACK TO THE FIRST MEETING' : 'NOW MEET IT A SECOND TIME'}
          </button>
        </> : <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 230 }}>
            <label htmlFor="hw-hr2" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Hour {hours}</label>
            <input id="hw-hr2" type="range" min="0" max="96" step="2" value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              style={{ width: 230, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <button className="hw-btn" onClick={() => setBlocked((b) => !b)} aria-pressed={blocked}
            style={{ borderColor: blocked ? 'oklch(0.55 0.17 28)' : undefined, color: blocked ? 'oklch(0.48 0.17 28)' : undefined }}>
            {blocked ? 'LET IT RESPOND' : 'BLOCK THE RESPONSE ENTIRELY'}
          </button>
        </>}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          {mode === 'defence' ? 'Compare the two meetings at day 3.' : 'Block it, then run the clock forward.'}
        </span>
      </div>

      {mode === 'inflammation' && (
        <div style={{ padding: '18px 24px 20px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
          <div style={{ maxWidth: 660, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SIGNS.map((x) => (
                <button key={x.id} className="hw-btn" onClick={() => setSign(x.id)} aria-pressed={sign === x.id}
                  style={{ background: sign === x.id ? 'var(--ink)' : 'var(--paper)', color: sign === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
                  {x.name.toUpperCase()}
                </button>
              ))}
            </div>
            <p style={{ margin: '14px 0 0', fontSize: 16.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty' }}>
              <strong>{s.name}.</strong> {s.why}
            </p>
          </div>
        </div>
      )}
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
