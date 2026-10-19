import { useState } from 'react'

// Anatomy & Physiology, Week 6. Two systems, one logic.
//
//   cycle (Lesson 26) four hormones over 28 days, and what menopause does to them
//   male  (Lesson 27) the same three-storey axis, and what supplying from outside does
//
// Both modes rest on Lesson 16's axis. The payoff in each is the same shape and
// worth having twice: when a gland stops answering, the pituitary shouts louder
// — which is why a raised FSH marks menopause exactly as a raised TSH marks an
// underactive thyroid. And supplying a hormone from outside shuts the axis down,
// which is the steroid taper from Lesson 16 appearing in a quite different place.
//
// The spec asks for this to be respectful, accurate, and pitched at an adult,
// and to separate general education from individual assessment. Ranges here are
// typical rather than normative, and the copy says so.

const DAYS = 28

/** Relative hormone levels across one cycle. Shapes, not units. */
function cycle(d, after) {
  if (after) {
    return { fsh: 86, lh: 72, oestrogen: 7, progesterone: 4 }
  }
  const bump = (c, w) => Math.exp(-(((d - c) / w) ** 2))
  return {
    fsh: 16 + 22 * bump(3, 3.4) + 26 * bump(13, 1.1),
    lh: 10 + 82 * bump(13, 0.9),
    oestrogen: 12 + 72 * bump(12.4, 2.6) + 30 * bump(21, 4.2),
    progesterone: 3 + 76 * bump(21, 4.0) * (d > 14 ? 1 : 0.04)
  }
}

const PARTS_F = [
  { id: 'ovary', name: `Ovaries`, what: `Hold every egg from before birth, release one about once a month, and make most of the oestrogen and progesterone. They are the gland in this axis.` },
  { id: 'tube', name: `Fallopian tubes`, what: `Catch the released egg and carry it toward the uterus. Fertilisation, when it happens, usually happens here rather than in the uterus.` },
  { id: 'uterus', name: `Uterus`, what: `A muscular chamber whose lining is rebuilt and shed on the cycle you are watching. Progesterone is what maintains that lining.` },
  { id: 'cervix', name: `Cervix`, what: `The narrow lower neck of the uterus. Its mucus changes consistency across the cycle, which is itself a response to the hormones on the chart.` },
  { id: 'vagina', name: `Vagina and vulva`, what: `The muscular passage and the external structures. Like all of the above, their tissue responds to the same hormones and changes when those change.` }
]

const PARTS_M = [
  { id: 'testes', name: `Testes`, what: `Make sperm and make testosterone — two jobs, separately regulated. They sit outside the body because sperm production needs to run two or three degrees below your core temperature.` },
  { id: 'epi', name: `Epididymis`, what: `A coiled tube on the back of each testis, about six metres long uncoiled, where sperm spend some days maturing and gaining the ability to swim.` },
  { id: 'vas', name: `Vas deferens`, what: `The tube carrying sperm onward. It is this that is cut in a vasectomy — which is why that procedure does not affect testosterone at all.` },
  { id: 'glands', name: `Seminal vesicles and prostate`, what: `Add most of the fluid volume, with sugars for fuel and buffers against acidity. Sperm themselves are a very small fraction of what is produced.` },
  { id: 'penis', name: `Penis`, what: `Carries both urine and semen, through the same passage but never at once — a valve arrangement makes the two mutually exclusive.` }
]

export default function Reproduction({ mode = 'cycle' }) {
  const [day, setDay] = useState(13)
  const [after, setAfter] = useState(false)
  const [sel, setSel] = useState(mode === 'cycle' ? 'ovary' : 'testes')
  const [supplied, setSupplied] = useState(false)

  const h = cycle(day, after)
  const parts = mode === 'cycle' ? PARTS_F : PARTS_M
  const p = parts.find((x) => x.id === sel) ?? parts[0]

  // Lesson 27: supplying testosterone from outside quietens the instruction.
  const lh = supplied ? 8 : 100
  const sperm = supplied ? 14 : 100
  const testo = supplied ? 150 : 100

  const phase = after ? 'After menopause' : day <= 5 ? 'Shedding the lining' : day < 13 ? 'Building up' : day <= 15 ? 'Around ovulation' : 'Waiting, lining maintained'

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{mode === 'cycle' ? phase : (supplied ? 'Supplied from outside' : 'Running on its own')}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 22 }}>
            {mode === 'cycle'
              ? (after ? 'Instruction high, output low' : day === 13 || day === 14 ? 'The surge' : `Day ${day}`)
              : (supplied ? 'The axis has gone quiet' : 'Instruction and output balanced')}
          </span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {mode === 'cycle'
              ? (after
                ? 'The ovaries are no longer answering, so the pituitary asks louder and louder — exactly as it does with an underactive thyroid. A raised FSH is read the same way, and for the same reason.'
                : day >= 12 && day <= 15
                  ? 'Rising oestrogen has, unusually, told the pituitary to push harder rather than ease off. That burst of LH is what releases the egg — the one place in the body where feedback runs positive.'
                  : 'One gland, four hormones, each shaping the next. Nothing here is decided; it is a loop running.')
              : (supplied
                ? 'Testosterone arriving from outside is detected upstairs, so the instruction stops. The testes are no longer being asked to do either job — and sperm production falls with it.'
                : 'The pituitary asks, the testes make testosterone and sperm, and the testosterone tells the pituitary to ease off. Lesson 16’s three storeys again.')}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          {mode === 'cycle' ? <>
            <Stat label="Instruction (FSH)" value={Math.round(h.fsh)} u="" accent={after} foot={after ? 'high — nothing is answering' : 'from the pituitary'} />
            <Stat label="Oestrogen" value={Math.round(h.oestrogen)} u="" foot={after ? 'low, and no longer cycling' : 'made by the ovary'} />
            <Stat label="Progesterone" value={Math.round(h.progesterone)} u="" foot={after ? 'low' : 'only after ovulation'} />
          </> : <>
            <Stat label="Instruction (LH)" value={lh} u="%" accent foot={supplied ? 'switched off from above' : 'ordinary'} />
            <Stat label="Testosterone" value={testo} u="%" foot={supplied ? 'high — and from outside' : 'made in the testes'} />
            <Stat label="Sperm production" value={sperm} u="%" foot={supplied ? 'fallen with the instruction' : 'about 1,500 a second'} />
          </>}
        </div>
      </div>

      <div className="hw-stage" style={{ height: 292, background: 'var(--paper)' }}
        role="img" aria-label={mode === 'cycle'
          ? `Four hormone levels across a 28-day cycle, at day ${day}.`
          : `The three-storey axis controlling the testes, with the instruction ${supplied ? 'switched off' : 'running'}.`}>
        <svg viewBox="0 0 560 254" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 238 }}>
          {mode === 'cycle' ? <>
            {[
              { key: 'fsh', label: 'FSH — the instruction', hue: 300 },
              { key: 'lh', label: 'LH — the trigger', hue: 28 },
              { key: 'oestrogen', label: 'oestrogen', hue: 340 },
              { key: 'progesterone', label: 'progesterone', hue: 155 }
            ].map((line, i) => {
              const pts = Array.from({ length: DAYS * 3 + 1 }, (_, k) => {
                const d = k / 3
                const v = cycle(d, after)[line.key]
                return `${56 + (d / DAYS) * 400},${186 - Math.min(100, v) * 1.42}`
              }).join(' ')
              return <g key={line.key}>
                <polyline points={pts} fill="none" stroke={`oklch(0.55 0.14 ${line.hue})`} strokeWidth="3" strokeLinejoin="round" />
                <text x="464" y={38 + i * 17} fontFamily="var(--sans)" fontSize="11" fill={`oklch(0.45 0.13 ${line.hue})`}>{line.label}</text>
              </g>
            })}
            <line x1="56" y1="186" x2="456" y2="186" stroke="var(--rule)" strokeWidth="1.5" />
            {[1, 7, 14, 21, 28].map((d) => (
              <g key={d}>
                <line x1={56 + (d / DAYS) * 400} y1="182" x2={56 + (d / DAYS) * 400} y2="190" stroke="var(--rule)" strokeWidth="1.5" />
                <text x={56 + (d / DAYS) * 400} y="206" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fill="var(--muted)">{d}</text>
              </g>
            ))}
            <text x="256" y="226" textAnchor="middle" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">DAY OF THE CYCLE</text>
            {!after && <line x1={56 + (day / DAYS) * 400} y1="30" x2={56 + (day / DAYS) * 400} y2="186" stroke="var(--accent)" strokeWidth="2" />}
            {!after && <text x={56 + (14 / DAYS) * 400} y="26" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fontWeight="700" fill="oklch(0.46 0.15 28)">ovulation</text>}
            {after && <text x="256" y="110" textAnchor="middle" fontFamily="var(--sans)" fontSize="13" fontWeight="700" fill="var(--muted)">after menopause the cycle stops — the instruction stays high</text>}
          </> : <>
            {[
              { y: 30, w: 150, label: 'Hypothalamus', hue: 300 },
              { y: 86, w: 150, label: 'Pituitary', hue: 300 },
              { y: 150, w: 150, label: 'Testes', hue: 28 }
            ].map((b, i) => (
              <g key={b.label}>
                <rect x="70" y={b.y} width={b.w} height="38" rx="10" fill={`oklch(0.89 0.05 ${b.hue})`} stroke={`oklch(0.44 0.12 ${b.hue})`} strokeWidth="2.2" />
                <text x="145" y={b.y + 24} textAnchor="middle" fontFamily="var(--sans)" fontSize="13" fill={`oklch(0.34 0.12 ${b.hue})`}>{b.label}</text>
                {i < 2 && (
                  <path d={`M 145 ${b.y + 38} l 0 ${i === 1 ? 26 : 18}`} stroke={supplied ? 'oklch(0.82 0.03 85)' : 'oklch(0.50 0.13 300)'} strokeWidth={supplied ? 2 : 6} strokeLinecap="round" />
                )}
              </g>
            ))}
            <path d="M 220 168 q 70 0 70 -60 q 0 -58 -70 -58" fill="none" stroke="oklch(0.50 0.13 28)" strokeWidth={supplied ? 7 : 4} strokeLinecap="round" strokeDasharray="7 5" />
            <text x="300" y="104" fontFamily="var(--sans)" fontSize="11.5" fill="oklch(0.44 0.13 28)">testosterone tells it to ease off</text>
            {supplied && <>
              <path d="M 70 168 l -36 0" stroke="oklch(0.56 0.16 28)" strokeWidth="7" strokeLinecap="round" />
              <text x="30" y="172" textAnchor="end" fontFamily="var(--sans)" fontSize="11.5" fontWeight="600" fill="oklch(0.48 0.16 28)">from outside</text>
            </>}
            <g transform="translate(316 152)">
              <text x="0" y="0" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.2" fill="var(--label)">BEYOND REPRODUCTION</text>
              {['bone density', 'muscle mass', 'red cell production'].map((t, i) => (
                <text key={t} x="0" y={20 + i * 17} fontFamily="var(--sans)" fontSize="12" fill="var(--muted)">· {t}</text>
              ))}
            </g>
          </>}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Typical shapes in relative units, not anybody's measurements. Cycles vary a great deal between people and between months, and variation is not in itself a problem.
        </div>
      </div>

      <div className="hw-controls">
        {mode === 'cycle' ? <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 220 }}>
            <label htmlFor="hw-day2" className="hw-readout-label" style={{ letterSpacing: '.14em' }}>Day {day} of 28</label>
            <input id="hw-day2" type="range" min="1" max="28" step="1" value={day} disabled={after}
              onChange={(e) => setDay(Number(e.target.value))} style={{ width: 220, accentColor: 'var(--accent)', height: 28 }} />
          </div>
          <button className="hw-btn" onClick={() => setAfter((a) => !a)} aria-pressed={after}
            style={{ background: after ? 'var(--ink)' : 'var(--paper)', color: after ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
            {after ? 'BACK TO A CYCLE' : 'AFTER MENOPAUSE'}
          </button>
        </> : (
          <button className="hw-btn" onClick={() => setSupplied((x) => !x)} aria-pressed={supplied}
            style={{ borderColor: supplied ? 'oklch(0.55 0.17 28)' : 'var(--ink)', color: supplied ? 'oklch(0.48 0.17 28)' : 'var(--ink)' }}>
            {supplied ? 'STOP SUPPLYING IT' : 'SUPPLY TESTOSTERONE FROM OUTSIDE'}
          </button>
        )}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 240, textAlign: 'right' }}>
          {mode === 'cycle' ? 'Stop at day 13 and look at what LH does.' : 'Watch the third number, not the second.'}
        </span>
      </div>

      <div style={{ padding: '18px 24px 20px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {parts.map((x) => (
              <button key={x.id} className="hw-btn" onClick={() => setSel(x.id)} aria-pressed={sel === x.id}
                style={{ fontSize: 12.5, padding: '8px 12px', background: sel === x.id ? 'var(--ink)' : 'var(--paper)', color: sel === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
                {x.name}
              </button>
            ))}
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 16.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty' }}>
            <strong>{p.name}.</strong> {p.what}
          </p>
        </div>
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
