import { useMemo, useState } from 'react'
import { fmt } from '../../../content/algebra/algebra-content.js'
import { plot } from '../../../content/algebra/algebra-util.js'

// The workhorse. Twenty-one of the thirty lessons use this one component.
//
// A lesson supplies some controls — sliders, tabs, buttons — and a pure
// `render(values)` function that returns what to show: a headline number, a
// graph spec, bars, a table, a message. Fraction bars, every graph, the
// receipts and the formulas are all this. Keeping the drawing in the content
// and the mechanics here is what stopped the Algebra Companion needing
// twenty-one separate components.
//
// `plot()` lives with the content, ported from the handoff, and turns a
// math-space spec into SVG primitives. Its labels become real <text> elements,
// which the handoff asks for explicitly: a graph whose numbers are painted into
// a background image cannot be read by anything but an eye.

export default function Generic({ see, onEngaged }) {
  const g = see.generic

  const initial = useMemo(() => {
    const v = {}
    for (const s of g.sliders ?? []) v[s.id] = s.def
    if (g.tabs) v.tab = 0
    return { ...v, ...(g.init ?? {}) }
  }, [g])

  const [v, setV] = useState(initial)
  const [moves, setMoves] = useState(0)

  const update = (patch) => {
    const next = { ...v, ...patch }
    setV(next)
    const n = moves + 1
    setMoves(n)
    // Engaged once the lesson's own goal is met, or after enough fiddling that
    // the learner has plainly had a go.
    if (g.render(next)?.goal || n >= 5) onEngaged?.()
  }

  const out = g.render(v) ?? {}
  const P = out.plot ? plot(out.plot) : null
  const table = out.table
  const sliders = (g.sliders ?? []).filter((s) => !s.show || s.show(v))
  const buttons = (g.buttons ?? []).filter((b) => !b.show || b.show(v))

  return (
    <div className="hw-sim">
      {g.tabs && (
        <div className="hw-controls" style={{ gap: 8, flexWrap: 'wrap', borderBottom: '1px solid var(--rule-2)', borderTop: 0 }}>
          {g.tabs.map((t, i) => (
            <button key={t} className="hw-btn" aria-pressed={i === v.tab}
              onClick={() => update({ tab: i, ...((g.onTab && g.onTab(i)) || {}) })}
              style={{
                fontSize: 12.5, padding: '10px 14px', borderColor: 'var(--ink)',
                background: i === v.tab ? 'var(--ink)' : 'var(--paper)',
                color: i === v.tab ? '#f6f1e7' : 'var(--ink)'
              }}>{t}</button>
          ))}
        </div>
      )}

      <div className="hw-stage" style={{ minHeight: 190, background: 'var(--paper)', position: 'relative', padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {out.story && (
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.5, color: 'var(--ink-3)', textWrap: 'pretty' }}>{out.story}</p>
        )}

        {out.big && (
          <div style={{ fontFamily: 'var(--sans)', fontSize: 30, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
            {out.big}
          </div>
        )}
        {out.note && (
          <div style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--muted)', marginTop: -8 }}>{out.note}</div>
        )}

        {P && (
          <svg viewBox="0 0 480 360" preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', maxWidth: 480, height: 'auto', alignSelf: 'center' }}
            role="img" aria-label={out.alt || 'A graph'}>
            {P.grid.map((l, i) => (
              <line key={`g${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.c} strokeWidth={l.w} />
            ))}
            {P.paths.map((p, i) => (
              <path key={`p${i}`} d={p.d} fill="none" stroke={p.c} strokeWidth={p.w} strokeDasharray={p.dash} strokeLinecap="round" />
            ))}
            {P.dots.map((d, i) => (
              <circle key={`d${i}`} cx={d.x} cy={d.y} r={d.r} fill={d.c} stroke={d.ring} strokeWidth="2" />
            ))}
            {P.labels.map((t, i) => (
              <text key={`l${i}`} x={t.x} y={t.y} fill={t.c} textAnchor={t.a}
                style={{ fontFamily: 'var(--sans)', fontSize: t.s, fontWeight: 600 }}>{t.t}</text>
            ))}
          </svg>
        )}

        {out.bars?.length > 0 && (
          <div style={{ display: 'grid', gap: 10 }}>
            {out.bars.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                {b.label && (
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 13.5, color: 'var(--ink-3)', minWidth: 92 }}>{b.label}</span>
                )}
                <span style={{ display: 'flex', gap: 2, flex: 1, minWidth: 180 }}>
                  {b.cells.map((c, j) => (
                    <span key={j} style={{ flex: 1, height: 26, background: c.bg, border: '1px solid var(--field)', borderRadius: 2 }} />
                  ))}
                </span>
                {b.right && (
                  <span style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', minWidth: 48, textAlign: 'right' }}>{b.right}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {table && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  {table.head.map((h, i) => (
                    <th key={i} style={{ textAlign: i === 0 ? 'left' : 'right', padding: '6px 12px 6px 0', fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 700, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((r, ri) => (
                  <tr key={ri}>
                    {r.map((cell, ci) => {
                      const hot = table.hl && table.hl(ri, ci)
                      return (
                        <td key={ci} style={{
                          textAlign: ci === 0 ? 'left' : 'right', padding: '5px 12px 5px 0', whiteSpace: 'nowrap',
                          fontFamily: ci === 0 ? 'var(--sans)' : 'inherit',
                          fontSize: ci === 0 ? 13 : 18, fontWeight: ci === 0 ? 600 : 400,
                          color: hot ? 'var(--accent)' : 'var(--ink)',
                          background: hot ? 'oklch(0.95 0.03 45)' : 'transparent'
                        }}>{String(cell)}</td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {out.msg && (
          <div style={{
            background: out.ok ? 'oklch(0.97 0.02 155)' : 'var(--card-alt, var(--paper-alt))',
            border: `1px solid ${out.ok ? 'oklch(0.85 0.05 155)' : 'var(--rule-2)'}`,
            borderRadius: 7, padding: '12px 15px', fontSize: 15.5, lineHeight: 1.5, textWrap: 'pretty'
          }}>{out.msg}</div>
        )}
      </div>

      {(sliders.length > 0 || buttons.length > 0) && (
        <div className="hw-controls" style={{ gap: 18, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {sliders.map((s) => (
            <div key={s.id} style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 190, flex: '1 1 190px', maxWidth: 300 }}>
              <label htmlFor={`g-${s.id}`} className="hw-readout-label" style={{ letterSpacing: '.14em' }}>
                {s.label} · {(s.pre || '') + fmt(v[s.id]) + (s.unit || '')}
              </label>
              <input id={`g-${s.id}`} type="range" min={s.min} max={s.max} step={s.step || 1} value={v[s.id]}
                onChange={(e) => update({ [s.id]: Number(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--accent)', height: 28 }} />
            </div>
          ))}
          {buttons.map((b, i) => (
            <button key={i} className="hw-btn" onClick={() => update(b.act(v))}
              style={{
                fontSize: 12.5, padding: '11px 15px', borderColor: 'var(--ink)',
                background: b.primary ? 'var(--ink)' : 'var(--paper)',
                color: b.primary ? '#f6f1e7' : 'var(--ink)'
              }}>
              {typeof b.label === 'function' ? b.label(v) : b.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
