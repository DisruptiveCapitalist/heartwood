import { useState } from 'react'

// Anatomy & Physiology, Lesson 23 — four kinds of trouble, and why one medicine
// cannot cover them.
//
// The spec requires one thing to land above all others: antibiotics act against
// susceptible bacteria and not against viruses. The reason is structural rather
// than a matter of strength, so the simulation leads with the size and the
// machinery. A bacterium is a living cell with its own wall and its own
// ribosomes; those are what an antibiotic attacks. A virus has neither, which
// is why there is simply nothing there for the drug to act on.
//
// Sizes are real and drawn to scale against each other, which is the point: at
// this scale a virus beside a bacterium is a full stop beside a shoe.

const BUGS = [
  {
    id: 'bacteria', name: 'Bacteria', size: 2000, sizeLabel: `about 2 micrometres`,
    alive: `A complete living cell`,
    copies: `Divides in two, on its own, anywhere it can feed — in your gut, on a worktop, in a wound.`,
    target: `Its own wall and its own protein-building machinery, both unlike yours.`,
    treat: `Antibiotics, where the particular bacterium is susceptible to them.`,
    note: `Most bacteria you meet are harmless and a great many are useful — you carry a few pounds of them, and the ones in your gut help digest what you eat.`
  },
  {
    id: 'virus', name: 'Viruses', size: 100, sizeLabel: `about 0.1 micrometres`,
    alive: `Not a cell, and arguably not alive`,
    copies: `Cannot copy itself at all. It gets inside one of your cells and makes your machinery build more of it.`,
    target: `There is no wall and no machinery of its own to attack — it is using yours.`,
    treat: `Antivirals, where they exist, attacking steps specific to that virus. Often supportive care while your own defences work.`,
    note: `This is the whole reason antibiotics do nothing for a cold or flu. It is not that they are too weak. There is nothing in a virus for them to act on.`
  },
  {
    id: 'fungus', name: 'Fungi', size: 4000, sizeLabel: `about 4 micrometres`,
    alive: `A living cell — and built much like yours`,
    copies: `Buds or grows as threads, often slowly, often on a surface or in a warm damp place.`,
    target: `Hard. A fungal cell is far more like one of your own than a bacterium is.`,
    treat: `Antifungals, which are fewer and more difficult precisely because of that similarity.`,
    note: `Athlete's foot and thrush are the familiar ones. The resemblance to our own cells is why treating a deep fungal infection is so much harder than treating a bacterial one.`
  },
  {
    id: 'parasite', name: 'Parasites', size: 9000, sizeLabel: `from micrometres to metres`,
    alive: `Living, and sometimes an entire animal`,
    copies: `Enormously varied — many have life cycles passing through more than one host.`,
    target: `Depends entirely on the organism. There is no general approach.`,
    treat: `Specific antiparasitic medicines, chosen for the particular parasite.`,
    note: `The category runs from single cells causing malaria to tapeworms several feet long. "Parasite" describes a way of living, not a kind of organism.`
  }
]

export default function Pathogens() {
  const [sel, setSel] = useState('virus')
  const b = BUGS.find((x) => x.id === sel)
  const bact = BUGS[0]

  return (
    <div className="hw-sim">
      <div className="hw-readouts" style={{ fontFamily: 'var(--sans)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="hw-readout-label">{b.name}</span>
          <span className="hw-readout-num" style={{ color: 'var(--accent)', fontSize: 22 }}>{b.alive}</span>
          <span aria-live="polite" style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 240, minHeight: 62, marginTop: 4 }}>
            {b.note}
          </span>
        </div>
        <div data-align="right" style={{ width: 268, display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'right' }}>
          <Stat label="Roughly how big" value={b.sizeLabel} u="" />
          <Stat label="Against a bacterium" value={sel === 'bacteria' ? '—' : `${(b.size / bact.size).toFixed(b.size < bact.size ? 2 : 1)}×`} u=""
            accent foot={sel === 'virus' ? 'twenty times smaller across' : 'drawn to scale below'} />
          <Stat label="Do antibiotics work?" value={sel === 'bacteria' ? 'Sometimes' : 'No'} u=""
            foot={sel === 'bacteria' ? 'if that bacterium is susceptible' : 'there is nothing there to attack'} />
        </div>
      </div>

      <div className="hw-stage" style={{ height: 280, background: 'var(--paper)' }}
        role="img" aria-label={`A comparison of a bacterium, a virus, a fungal cell and a parasite, drawn to scale against each other.`}>
        <svg viewBox="0 0 560 240" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: '8px 0 auto 0', width: '100%', height: 224 }}>
          <text x="40" y="26" fontFamily="var(--sans)" fontSize="11" fontWeight="700" letterSpacing="1.3" fill="var(--label)">DRAWN TO SCALE AGAINST EACH OTHER</text>
          <ellipse cx="110" cy="106" rx="48" ry="30" fill={sel === 'bacteria' ? 'oklch(0.66 0.15 155)' : 'oklch(0.88 0.05 155)'} stroke="oklch(0.38 0.12 155)" strokeWidth="2.6" />
          <text x="110" y="162" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="var(--label)">BACTERIUM</text>
          <circle cx="212" cy="106" r="2.6" fill={sel === 'virus' ? 'oklch(0.56 0.17 28)' : 'oklch(0.74 0.10 28)'} />
          <circle cx="212" cy="106" r="13" fill="none" stroke="oklch(0.56 0.17 28)" strokeWidth="1.4" strokeDasharray="3 3" />
          <text x="212" y="162" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="var(--label)">VIRUS</text>
          <text x="212" y="178" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fill="var(--muted)">(ringed to be findable)</text>
          <circle cx="330" cy="106" r="52" fill={sel === 'fungus' ? 'oklch(0.70 0.13 85)' : 'oklch(0.90 0.05 85)'} stroke="oklch(0.44 0.10 85)" strokeWidth="2.6" />
          <circle cx="330" cy="106" r="17" fill="oklch(0.52 0.10 300)" opacity="0.5" />
          <text x="330" y="176" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="var(--label)">FUNGAL CELL</text>
          <path d="M 420 70 q 40 18 0 36 q -40 18 0 36" fill="none" stroke={sel === 'parasite' ? 'oklch(0.56 0.14 45)' : 'oklch(0.80 0.07 45)'} strokeWidth="13" strokeLinecap="round" />
          <text x="448" y="176" textAnchor="middle" fontFamily="var(--sans)" fontSize="11.5" fontWeight="700" fill="var(--label)">PARASITE</text>
          <text x="448" y="192" textAnchor="middle" fontFamily="var(--sans)" fontSize="10.5" fill="var(--muted)">(any size at all)</text>
          <text x="40" y="222" fontFamily="var(--sans)" fontSize="12" fill="var(--muted)">
            A bacterium is roughly twenty times across what a virus is — and a few hundred could sit inside one of your own cells.
          </text>
        </svg>
        <div style={{ position: 'absolute', left: 22, bottom: 10, right: 22, fontFamily: 'var(--sans)', fontSize: 12.5, color: 'var(--muted)' }}>
          Shapes are schematic and sizes approximate. All four categories contain enormous variety, and most members of all four are harmless to you.
        </div>
      </div>

      <div className="hw-controls">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {BUGS.map((x) => (
            <button key={x.id} className="hw-btn" onClick={() => setSel(x.id)} aria-pressed={sel === x.id}
              style={{ background: sel === x.id ? 'var(--ink)' : 'var(--paper)', color: sel === x.id ? '#f6f1e7' : 'var(--ink)', borderColor: 'var(--ink)' }}>
              {x.name.toUpperCase()}
            </button>
          ))}
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 230, textAlign: 'right' }}>
          Read the "what is there to attack" line for each.
        </span>
      </div>

      <div style={{ padding: '18px 24px 20px', borderTop: '1px solid var(--rule)', background: 'var(--card)' }}>
        <div style={{ maxWidth: 660, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {[['HOW IT MAKES MORE', b.copies], ['WHAT IS THERE TO ATTACK', b.target], ['WHAT IS USED', b.treat]].map(([k, v]) => (
            <div key={k}>
              <span className="hw-label">{k}</span>
              <p style={{ margin: '8px 0 0', fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink-2)', textWrap: 'pretty' }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, u, foot, accent }) {
  return (
    <div>
      <div className="hw-readout-label">{label}</div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 600, color: accent ? 'var(--accent)' : undefined }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--label)' }}> {u}</span>
      </div>
      {foot && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{foot}</div>}
    </div>
  )
}
