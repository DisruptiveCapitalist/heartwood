import { useState } from 'react'

// Lessons 4, 5 and 9. A scale with bags marked x and single blocks.
//
// This is the picture the whole of Week 2 stands on, so it is deliberately
// fussy about one thing: changing ONE side tips the beam and changing BOTH
// sides does not. The learner can break the balance on purpose and watch the
// equation stop being true, which is a far better argument than being told.
//
// The bag opens at the end, not the beginning. Opening it first turns the
// lesson into arithmetic; opening it last turns it into confirmation.

const ACCENT = 'oklch(0.50 0.12 45)'
const BLUE = 'oklch(0.44 0.10 250)'

const term = (bags, blocks) => {
  const b = bags === 0 ? '' : bags === 1 ? 'x' : `${bags}x`
  return b && blocks ? `${b} + ${blocks}` : b || String(blocks)
}

export default function Balance({ see, onEngaged }) {
  const cfg = see.balance
  const [b, setB] = useState(() => ({ bL: cfg.bL ?? 1, bR: cfg.bR ?? 0, nL: cfg.nL, nR: cfg.nR, open: false }))
  const [last, setLast] = useState('')

  const diff = cfg.x * b.bL + b.nL - (cfg.x * b.bR + b.nR)
  const solved = diff === 0 &&
    ((b.bL === 1 && b.bR === 0 && b.nL === 0) || (b.bR === 1 && b.bL === 0 && b.nR === 0))

  const set = (patch, how) => {
    const next = { ...b, ...patch }
    setB(next)
    setLast(how)
    const d = cfg.x * next.bL + next.nL - (cfg.x * next.bR + next.nR)
    const done = d === 0 &&
      ((next.bL === 1 && next.bR === 0 && next.nL === 0) || (next.bR === 1 && next.bL === 0 && next.nR === 0))
    if (done || next.open) onEngaged?.()
  }

  const note = b.open
    ? `Inside: ${cfg.x} blocks. ${solved ? 'Exactly what the scale told you.' : 'Did the scale already tell you?'}`
    : solved
      ? `One bag is alone, and it balances ${b.bL ? b.nR : b.nL} blocks. So x = ${cfg.x}. You solved an equation.`
      : diff !== 0
        ? (last === 'one'
          ? `Tipped. Changing only one side broke the balance — the statement is no longer true.`
          : `Not level: the ${diff > 0 ? 'left' : 'right'} side is heavier.`)
        : last === 'both'
          ? `Still level. Both sides changed by the same amount.`
          : `Level. Whatever is in each bag, the two sides weigh the same.`

  const tilt = -Math.max(-12, Math.min(12, diff * 3))
  const cmp = diff === 0 ? '=' : diff > 0 ? '>' : '<'

  const pan = (bags, blocks, side) => {
    const items = [
      ...Array.from({ length: bags }, (_, i) => ({ k: `bag${i}`, bag: true })),
      ...Array.from({ length: blocks }, (_, i) => ({ k: `blk${i}`, bag: false }))
    ]
    return (
      <div key={side} style={{ display: 'flex', flexWrap: 'wrap', gap: 4, width: 170, justifyContent: 'center', alignItems: 'flex-end', minHeight: 54 }}>
        {items.map((it) => it.bag ? (
          <span key={it.k} style={{ width: 40, height: 46, borderRadius: '10px 10px 14px 14px', background: ACCENT, color: '#f6f1e7', display: 'grid', placeItems: 'center', fontFamily: 'var(--sans)', fontSize: 21, fontWeight: 600 }}>
            {b.open ? cfg.x : 'x'}
          </span>
        ) : (
          <span key={it.k} style={{ width: 20, height: 20, borderRadius: 3, background: BLUE }} />
        ))}
      </div>
    )
  }

  const Btn = ({ label, onClick, off, primary }) => (
    <button className="hw-btn" onClick={onClick} disabled={off}
      style={{
        fontSize: 12.5, padding: '10px 13px', opacity: off ? 0.4 : 1,
        background: primary ? 'var(--ink)' : 'var(--paper)',
        color: primary ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)'
      }}>{label}</button>
  )

  return (
    <div className="hw-sim">
      <div className="hw-stage" style={{ height: 300, background: 'var(--paper)' }}
        role="img" aria-label={`A balance scale. Left pan: ${b.bL} bags marked x and ${b.nL} blocks. Right pan: ${b.bR} bags and ${b.nR} blocks. ${diff === 0 ? 'The beam is level.' : `The ${diff > 0 ? 'left' : 'right'} side is lower.`}`}>
        <div style={{ position: 'absolute', inset: '16px 22px auto', display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: 27, fontWeight: 600, display: 'flex', gap: 14, alignItems: 'baseline' }}>
            <span>{term(b.bL, b.nL)}</span>
            <span style={{ color: diff === 0 ? 'var(--ink)' : 'oklch(0.46 0.15 25)' }}>{cmp}</span>
            <span>{term(b.bR, b.nR)}</span>
          </div>
        </div>

        <div style={{ position: 'absolute', inset: '66px 0 auto 0', height: 150 }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: 2, height: 112, background: 'var(--machine)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 112, transform: 'translateX(-50%)', width: 86, height: 10, borderRadius: 3, background: 'var(--machine)' }} />
          <div style={{
            position: 'absolute', left: '50%', top: 0, width: 400, height: 6, borderRadius: 3,
            background: 'var(--ink)', transform: `translateX(-50%) rotate(${tilt.toFixed(2)}deg)`,
            transformOrigin: 'center', transition: 'transform .35s ease'
          }} />
          {[['LEFT', b.bL, b.nL, -1], ['RIGHT', b.bR, b.nR, 1]].map(([name, bags, blocks, dir]) => (
            <div key={name} style={{
              position: 'absolute', left: `calc(50% + ${dir * 200 * Math.cos(tilt * Math.PI / 180)}px)`,
              top: 6 + dir * 200 * Math.sin(tilt * Math.PI / 180),
              transform: 'translateX(-50%)', transition: 'all .35s ease',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
            }}>
              <div style={{ width: 2, height: 22, background: 'var(--machine)' }} />
              {pan(bags, blocks, name)}
              <div style={{ width: 174, height: 5, borderRadius: 3, background: 'var(--machine)' }} />
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 12, fontFamily: 'var(--sans)', fontSize: 13.5, lineHeight: 1.45, color: solved ? 'var(--green-text)' : 'var(--ink-3)', textAlign: 'center' }}>
          {note}
        </div>
      </div>

      <div className="hw-controls" style={{ gap: 18, flexWrap: 'wrap' }}>
        {[
          { label: 'LEFT PAN', btns: [
            { label: '+ 1', onClick: () => set({ nL: b.nL + 1 }, 'one'), off: b.nL >= 10 },
            { label: '− 1', onClick: () => set({ nL: b.nL - 1 }, 'one'), off: b.nL <= 0 }] },
          { label: 'RIGHT PAN', btns: [
            { label: '+ 1', onClick: () => set({ nR: b.nR + 1 }, 'one'), off: b.nR >= 12 },
            { label: '− 1', onClick: () => set({ nR: b.nR - 1 }, 'one'), off: b.nR <= 0 }] },
          { label: 'BOTH PANS', btns: [
            { label: 'Take 1 off both', onClick: () => set({ nL: b.nL - 1, nR: b.nR - 1 }, 'both'), off: b.nL <= 0 || b.nR <= 0, primary: true },
            { label: 'Add 1 to both', onClick: () => set({ nL: b.nL + 1, nR: b.nR + 1 }, 'both'), off: b.nL >= 10 || b.nR >= 12 }] },
          ...(cfg.bR ? [{ label: 'BAGS', btns: [
            { label: 'Take a bag off both', onClick: () => set({ bL: b.bL - 1, bR: b.bR - 1 }, 'both'), off: b.bL <= 0 || b.bR <= 0, primary: true }] }] : []),
          { label: 'THE BAGS', btns: [
            { label: b.open ? 'Close the bag' : 'Open the bag', onClick: () => set({ open: !b.open }, 'open') },
            { label: 'Start again', onClick: () => { setB({ bL: cfg.bL ?? 1, bR: cfg.bR ?? 0, nL: cfg.nL, nR: cfg.nR, open: false }); setLast('') } }] }
        ].map((g) => (
          <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span className="hw-readout-label" style={{ letterSpacing: '.14em' }}>{g.label}</span>
            <span style={{ display: 'flex', gap: 7 }}>{g.btns.map((x) => <Btn key={x.label} {...x} />)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
