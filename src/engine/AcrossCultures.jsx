import { Rich } from '../lib/rich.jsx'

// A tradition, set beside the skill it illustrates.
//
// The Navigation spec is unusually firm here, and it is the right rule: never
// put a cultural claim on screen without an evidence label, an honest note on
// what is still uncertain, and a real source. If a source cannot be found, the
// claim does not go in.
//
// So this component cannot render without all three. That is deliberate — a
// missing source should break the build, not quietly ship.

const EVIDENCE = {
  'WELL DOCUMENTED': {
    bg: 'oklch(0.95 0.03 155)', fg: 'oklch(0.38 0.10 155)', border: '1px solid oklch(0.85 0.05 155)'
  },
  'DOCUMENTED REGIONALLY': {
    bg: 'oklch(0.95 0.03 45)', fg: 'oklch(0.42 0.11 45)', border: '1px solid oklch(0.85 0.05 45)'
  },
  'PLAUSIBLE BUT UNCERTAIN': {
    bg: 'oklch(0.95 0.03 85)', fg: 'oklch(0.42 0.09 85)', border: '1px dashed oklch(0.82 0.06 85)'
  },
  'MODERN INTERPRETATION': {
    bg: '#f3ede2', fg: '#4a4238', border: '1px dotted #b8ab98'
  }
}

export const EVIDENCE_LABELS = Object.keys(EVIDENCE)

export default function AcrossCultures({ card }) {
  if (!card) return null
  const pill = EVIDENCE[card.label] ?? EVIDENCE['MODERN INTERPRETATION']

  return (
    <div style={{
      maxWidth: 800, background: 'var(--paper)', border: '1px solid #d8cdba',
      borderRadius: 7, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: '#8a7f70' }}>
          ACROSS CULTURES · {card.place}
        </span>
        <span style={{
          fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em',
          padding: '4px 9px', borderRadius: 4,
          background: pill.bg, color: pill.fg, border: pill.border
        }}>
          {card.label}
        </span>
      </div>

      {card.paragraphs.map((text, i) => (
        <p key={i} style={{ fontSize: 20, lineHeight: 1.55, margin: 0, color: 'var(--ink-2)', textWrap: 'pretty' }}>
          <Rich text={text} />
        </p>
      ))}

      <p style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.6, margin: 0, color: '#6b6155', textWrap: 'pretty' }}>
        <strong style={{ fontWeight: 700 }}>What remains uncertain:</strong> <Rich text={card.uncertain} />
        {' '}<strong style={{ fontWeight: 700 }}>Sources:</strong> <Rich text={card.sources} />
      </p>
    </div>
  )
}
