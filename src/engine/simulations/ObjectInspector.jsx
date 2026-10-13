import { useState } from 'react'

// Week 6. The Professor steps back and the learner does the explaining, so this
// is deliberately not a lookup table.
//
// Pick an object and you get a drawing and nothing else. The ideas are hidden
// until asked for, one at a time, so the learner has somewhere to put their own
// answer first — and each one, when it comes, says which lesson it is from, so
// the week reads as a recombination rather than new material.
//
// Used by Lessons 26, 28 and 30 with different sets of objects.

const SHAPES = {
  bridge: (
    <g stroke="var(--machine)" strokeWidth="3" fill="none">
      <line x1="20" y1="86" x2="140" y2="86" />
      <path d="M 28 86 L 52 46 L 80 86 L 108 46 L 132 86" />
      <line x1="52" y1="46" x2="108" y2="46" />
      <polygon points="20,86 12,102 28,102" fill="var(--machine)" stroke="none" />
      <polygon points="140,86 132,102 148,102" fill="var(--machine)" stroke="none" />
    </g>
  ),
  ladder: (
    <g stroke="var(--machine)" strokeWidth="3" fill="none">
      <line x1="46" y1="102" x2="96" y2="26" />
      <line x1="64" y1="102" x2="114" y2="26" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={49 + i * 13} y1={97 - i * 19} x2={67 + i * 13} y2={97 - i * 19} />
      ))}
      <line x1="20" y1="102" x2="150" y2="102" strokeWidth="2" />
      <line x1="118" y1="20" x2="118" y2="104" strokeWidth="2" />
    </g>
  ),
  bicycle: (
    <g stroke="var(--machine)" strokeWidth="3" fill="none">
      <circle cx="46" cy="82" r="20" />
      <circle cx="116" cy="82" r="20" />
      <path d="M 46 82 L 76 46 L 106 46 L 116 82 M 76 46 L 86 82 L 116 82" />
      <line x1="100" y1="36" x2="118" y2="36" />
    </g>
  ),
  boat: (
    <g>
      <path d="M 30 78 L 140 78 L 124 100 L 46 100 Z" fill="var(--car-body)" />
      <line x1="85" y1="26" x2="85" y2="78" stroke="var(--machine)" strokeWidth="3" />
      <path d="M 88 32 L 122 72 L 88 72 Z" fill="var(--car-cabin)" />
      <line x1="14" y1="86" x2="156" y2="86" stroke="#a9c6d3" strokeWidth="2" />
    </g>
  ),
  airplane: (
    <g>
      <ellipse cx="86" cy="64" rx="56" ry="11" fill="var(--car-body)" />
      <path d="M 70 62 L 112 40 L 122 44 L 92 64 Z" fill="var(--car-cabin)" />
      <path d="M 70 66 L 108 86 L 118 82 L 92 64 Z" fill="var(--car-cabin)" />
      <path d="M 32 58 L 20 40 L 32 40 Z" fill="var(--car-cabin)" />
    </g>
  ),
  fridge: (
    <g>
      <rect x="52" y="20" width="62" height="88" rx="4" fill="var(--car-cabin)" />
      <line x1="52" y1="52" x2="114" y2="52" stroke="var(--paper)" strokeWidth="2" />
      <rect x="104" y="30" width="4" height="14" fill="var(--paper)" />
      <rect x="104" y="60" width="4" height="14" fill="var(--paper)" />
      <path d="M 114 70 q 16 0 16 -14" stroke="var(--brake)" strokeWidth="3" fill="none" />
    </g>
  ),
  fan: (
    <g stroke="var(--machine)" strokeWidth="3" fill="none">
      <line x1="83" y1="18" x2="83" y2="40" />
      <circle cx="83" cy="48" r="8" fill="var(--machine)" />
      <path d="M 83 48 q 36 -12 44 10 q -24 10 -44 -10" fill="var(--car-cabin)" stroke="none" />
      <path d="M 83 48 q -36 -12 -44 10 q 24 10 44 -10" fill="var(--car-cabin)" stroke="none" />
      <path d="M 83 48 q 10 34 -14 42 q -12 -22 14 -42" fill="var(--car-cabin)" stroke="none" />
    </g>
  ),
  cup: (
    <g>
      <path d="M 54 40 L 62 100 L 108 100 L 116 40 Z" fill="var(--car-cabin)" />
      <path d="M 116 52 q 22 4 0 30" stroke="var(--car-cabin)" strokeWidth="6" fill="none" />
      <path d="M 58 56 L 112 56" stroke="#c9a26a" strokeWidth="8" />
    </g>
  ),
  door: (
    <g>
      <rect x="54" y="18" width="64" height="92" fill="var(--car-cabin)" />
      <circle cx="108" cy="66" r="4" fill="var(--paper)" />
      <line x1="54" y1="18" x2="54" y2="110" stroke="var(--machine)" strokeWidth="4" />
    </g>
  ),
  bulb: (
    <g>
      <circle cx="84" cy="52" r="26" fill="oklch(0.93 0.11 85)" stroke="var(--machine)" strokeWidth="3" />
      <path d="M 76 58 q 8 -16 16 0" stroke="var(--machine)" strokeWidth="2" fill="none" />
      <rect x="74" y="78" width="20" height="18" fill="var(--car-cabin)" />
    </g>
  ),
  shoe: (
    <g>
      <path d="M 34 92 L 38 64 L 66 64 L 92 80 L 128 84 L 132 96 L 36 96 Z" fill="var(--car-body)" />
      <line x1="30" y1="98" x2="140" y2="98" stroke="var(--rule)" strokeWidth="3" />
    </g>
  ),
  kettle: (
    <g>
      <path d="M 54 46 L 60 102 L 112 102 L 118 46 Z" fill="var(--car-cabin)" />
      <path d="M 54 56 L 32 40 L 36 34 L 58 50" fill="var(--car-cabin)" />
      <path d="M 70 46 q 16 -22 32 0" stroke="var(--machine)" strokeWidth="4" fill="none" />
    </g>
  )
}

export default function ObjectInspector({ objects = [], prompt = 'What physics can you see?' }) {
  const [pick, setPick] = useState(objects[0]?.id)
  const [shown, setShown] = useState(0)

  const object = objects.find((o) => o.id === pick) ?? objects[0]
  const ideas = object?.physics ?? []
  const all = shown >= ideas.length

  const choose = (id) => { setPick(id); setShown(0) }

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{object?.label}</span>
          <span className="hw-readout-num" style={{ color: all ? 'var(--green)' : 'var(--ink)' }}>
            {shown}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--label)' }}> of {ideas.length} shown</span>
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 228, marginTop: 4 }}>
            {shown === 0
              ? 'Say yours out loud first. Then see whether it is on the list.'
              : all
                ? 'That is the list. If you found one that is not on it, you are right and the list is short.'
                : 'Keep going before you ask for the next one.'}
          </span>
        </div>

        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
          <span className="hw-readout-label">{prompt}</span>
          {shown === 0 ? (
            <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
              Nothing yet. That is deliberate — this week you go first.
            </span>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {ideas.slice(0, shown).map((p) => (
                <div key={p.concept} style={{ fontSize: 12.5, lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, color: 'var(--ink-2)' }}>{p.concept}</span>
                  <span style={{ color: 'var(--faint)' }}> · Lesson {p.lesson}</span>
                  <div style={{ color: 'var(--muted)' }}>{p.note}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="hw-stage"
        style={{ height: 230, background: 'var(--paper)' }}
        role="img"
        aria-label={`A drawing of ${object?.label}. ${shown} of ${ideas.length} physical ideas revealed.`}
      >
        <svg viewBox="0 0 168 124" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '16px 0 auto 0', width: '100%', height: 168 }}>
          {SHAPES[object?.shape] ?? null}
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 14, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          No labels on the drawing. The labels are the part you supply.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {objects.map((o) => (
            <button
              key={o.id}
              className="hw-btn"
              onClick={() => choose(o.id)}
              aria-pressed={o.id === pick}
              style={{
                padding: '12px 15px', letterSpacing: '.03em',
                borderColor: o.id === pick ? 'var(--accent)' : 'var(--field)',
                background: o.id === pick ? 'var(--accent-wash-2)' : 'var(--paper)',
                color: o.id === pick ? 'var(--ink)' : 'var(--ink-3)'
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
        <span style={{ flex: 1 }} />
        <button
          className="hw-btn hw-btn-solid"
          onClick={() => setShown((n) => Math.min(ideas.length, n + 1))}
          disabled={all}
          style={{ padding: '13px 22px' }}
        >
          {shown === 0 ? 'I HAVE ONE — SHOW ME' : all ? 'THAT IS ALL OF THEM' : 'SHOW ME ANOTHER'}
        </button>
        {shown > 0 && <button className="hw-btn" onClick={() => setShown(0)}>HIDE THEM AGAIN</button>}
      </div>
    </div>
  )
}
