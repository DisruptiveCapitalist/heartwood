import { useState } from 'react'

// "I don't get it", available at every stage and on every problem.
//
// The rule the handoff is firmest about: it never repeats an explanation. Each
// press moves to a different WAY of saying the thing — simplify it, show me,
// use an example, work backward, try it together, find the stuck point — and
// when the ways run out, or after three presses on the same concept, it stops
// explaining and offers the smaller idea underneath instead.
//
// That last move is the important one. Three failed explanations of the same
// idea is evidence that the idea is not the problem; something below it is.

export default function StuckPanel({ stuck, prereq, startSmaller, onPrereq, onClose }) {
  const ways = stuck?.ways ?? []
  const [i, setI] = useState(0)
  const [smaller, setSmaller] = useState(!!startSmaller)

  const way = ways[Math.min(i, ways.length - 1)]
  const exhausted = i >= ways.length - 1
  const offerSmaller = smaller || i >= 2 || exhausted

  return (
    <div style={{
      border: '1px solid var(--accent)', borderRadius: 7, background: 'var(--accent-wash, oklch(0.97 0.012 45))',
      padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: '.18em', color: 'var(--accent)' }}>
          {smaller ? 'A SMALLER IDEA FIRST' : `ANOTHER WAY · ${way?.type ?? 'SIMPLIFY IT'}`}
        </span>
        <button className="hw-btn" onClick={onClose} style={{ fontSize: 12, padding: '7px 12px' }}>Close</button>
      </div>

      {stuck?.concept && !smaller && (
        <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--muted)' }}>
          Stuck on: {stuck.concept}
        </span>
      )}

      <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, textWrap: 'pretty' }}>
        {smaller ? (prereq?.body ?? 'Let us take the idea underneath this one first.') : way?.body}
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {!smaller && !exhausted && (
          <button className="hw-btn" onClick={() => setI(i + 1)} style={{ fontSize: 12.5, padding: '10px 14px' }}>
            Still stuck — try another way
          </button>
        )}
        {!smaller && offerSmaller && (
          <button className="hw-btn" onClick={() => setSmaller(true)}
            style={{ fontSize: 12.5, padding: '10px 14px', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            Let's make it smaller
          </button>
        )}
        {smaller && prereq?.href && onPrereq && (
          <button className="hw-btn" onClick={() => onPrereq(prereq.href)}
            style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '.12em', padding: '11px 18px', background: 'var(--ink)', color: '#f6f1e7', borderColor: 'var(--ink)' }}>
            {prereq.label ? prereq.label.toUpperCase() : 'GO THERE'}
          </button>
        )}
      </div>
    </div>
  )
}
