// Detail plates — a labelled figure of one named thing.
//
// The course spec (§6) asks for labelled illustrations of the individual items,
// not only of the scene they sit in: a lesson that explains a ribosome in prose
// while drawing it as a dot is asking for the interesting part to be taken on
// trust. These are drawn rather than photographed — the spec prefers clear
// diagrams and warns off decorative imagery, a drawing is a couple of kilobytes
// where a photograph is a couple of hundred, and vector art stays sharp on a
// tablet at any size.
//
// They are built like a plate in a reference book: the subject in the middle,
// terse labels in the margins on leader lines, and one sentence of caption
// underneath. The labels are the point — an unlabelled drawing is decoration,
// which is the thing the spec says not to make.
//
// LAYOUT RULES, because nothing warns you when you break them:
//   viewBox is 380 × 215 for every plate, so they line up wherever used.
//   Left labels end-anchored at x=96; right labels start-anchored at x=284.
//   Keep the subject inside x 105–275. Keep a margin label under 15 characters
//   and the caption under 55. Those limits are measured, not guessed: a margin
//   label is about 6.2 units per character and a caption about 6.9, and five of
//   the first twelve labels overran before being measured. Text that overruns
//   is NOT clipped — it silently runs out over the lesson's own words, which is
//   how a caption once appeared mid-sentence. Measure a new one with getBBox.

const BOX = '0 0 380 215'
const RULE = 'oklch(0.62 0.02 85)'
const LABEL = 'var(--label)'

const tiny = { fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600, letterSpacing: 0.3, fill: LABEL }
const capStyle = { fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 700, letterSpacing: 0.9, fill: LABEL }

/** A margin label on a leader line, pointing at one feature. */
function Lead({ at, to, text, side = 'left' }) {
  const end = side === 'left' ? 96 : 284
  return (
    <g>
      <polyline
        points={`${at[0]},${at[1]} ${to[0]},${to[1]} ${end},${to[1]}`}
        fill="none" stroke={RULE} strokeWidth="1" strokeLinejoin="round"
      />
      <circle cx={at[0]} cy={at[1]} r="2.2" fill={RULE} />
      <text
        x={side === 'left' ? end - 6 : end + 6} y={to[1] + 3.8}
        textAnchor={side === 'left' ? 'end' : 'start'} {...tiny}
      >{text}</text>
    </g>
  )
}

/** The one-line caption under every plate. */
const Cap = ({ children }) => (
  <text x="190" y="206" textAnchor="middle" {...capStyle}>{children}</text>
)

/** A phospholipid: a head and two tails. */
function Lipid({ x, y, down, hue = 235 }) {
  const d = down ? 1 : -1
  return <g>
    <circle cx={x} cy={y} r="4.2" fill={`oklch(0.62 0.09 ${hue})`} />
    <path d={`M ${x - 1.8} ${y + d * 4.2} l 0 ${d * 19} M ${x + 1.8} ${y + d * 4.2} l 0 ${d * 19}`}
      stroke={`oklch(0.54 0.07 ${hue})`} strokeWidth="1.5" strokeLinecap="round" />
  </g>
}

const PLATES = {
  // ---- the parts of a cell ------------------------------------------------
  membrane: () => <g>
    <text x="190" y="26" textAnchor="middle" {...tiny} fill={RULE}>O U T S I D E</text>
    {Array.from({ length: 15 }, (_, i) => <Lipid key={`t${i}`} x={110 + i * 11.6} y={48} down />)}
    {Array.from({ length: 15 }, (_, i) => <Lipid key={`b${i}`} x={110 + i * 11.6} y={116} />)}
    <text x="190" y="146" textAnchor="middle" {...tiny} fill={RULE}>I N S I D E</text>
    <rect x="176" y="36" width="26" height="92" rx="12" fill="oklch(0.76 0.11 340)" stroke="oklch(0.44 0.13 340)" strokeWidth="2.2" />
    <path d="M 189 56 l 0 52" stroke="oklch(0.44 0.13 340)" strokeWidth="2" strokeDasharray="4 4" />
    <Lead at={[121, 48]} to={[108, 44]} text="watery head" side="left" />
    <Lead at={[121, 68]} to={[108, 86]} text="fatty tails" side="left" />
    <Lead at={[202, 60]} to={[266, 48]} text="a way through" side="right" />
    <Lead at={[248, 116]} to={[266, 126]} text="two deep" side="right" />
    <Cap>A BORDER TWO MOLECULES THICK</Cap>
  </g>,

  nucleus: () => <g>
    <circle cx="190" cy="98" r="62" fill="oklch(0.91 0.035 300)" stroke="oklch(0.45 0.12 300)" strokeWidth="2.6" />
    <circle cx="190" cy="98" r="56" fill="none" stroke="oklch(0.45 0.12 300)" strokeWidth="2" strokeDasharray="22 9" />
    <path d="M 152 76 q 18 14 36 0 q 18 -14 36 0 M 152 100 q 18 14 36 0 q 18 -14 36 0 M 160 124 q 15 13 30 0"
      fill="none" stroke="oklch(0.42 0.13 300)" strokeWidth="2.3" />
    <circle cx="218" cy="72" r="11" fill="oklch(0.55 0.13 300)" />
    <Lead at={[140, 68]} to={[124, 50]} text="double wall" side="left" />
    <Lead at={[163, 48]} to={[146, 34]} text="a pore" side="left" />
    <Lead at={[170, 100]} to={[120, 136]} text="DNA" side="left" />
    <Lead at={[227, 66]} to={[262, 54]} text="nucleolus" side="right" />
    <Cap>THE ORIGINAL NEVER LEAVES THIS ROOM</Cap>
  </g>,

  ribosome: () => <g>
    <path d="M 142 58 q 48 -24 96 0 q 16 22 -3 34 l -90 0 q -19 -12 -3 -34 z" fill="oklch(0.79 0.08 85)" stroke="oklch(0.40 0.10 85)" strokeWidth="2.5" />
    <path d="M 148 104 q 44 22 84 0 q 10 18 -9 26 l -66 0 q -19 -8 -9 -26 z" fill="oklch(0.68 0.09 85)" stroke="oklch(0.40 0.10 85)" strokeWidth="2.5" />
    <line x1="104" y1="99" x2="276" y2="99" stroke="oklch(0.50 0.13 85)" strokeWidth="2.8" strokeDasharray="8 5" />
    {[216, 232, 248, 264].map((x, i) => (
      <circle key={x} cx={x} cy="40" r="6.5" fill={`oklch(0.74 0.10 ${[235, 45, 155, 300][i]})`} stroke="oklch(0.40 0.06 85)" strokeWidth="1.2" />
    ))}
    <path d="M 232 60 q -6 -16 -16 -20" fill="none" stroke="oklch(0.45 0.08 85)" strokeWidth="1.6" />
    <Lead at={[160, 66]} to={[126, 56]} text="large part" side="left" />
    <Lead at={[166, 116]} to={[126, 132]} text="small part" side="left" />
    <Lead at={[118, 99]} to={[108, 86]} text="the copy" side="left" />
    <Lead at={[256, 40]} to={[272, 30]} text="chain so far" side="right" />
    <Cap>READS THREE LETTERS, ADDS ONE PIECE</Cap>
  </g>,

  er: () => <g>
    {[0, 1, 2].map((i) => <g key={i}>
      <path d={`M 108 ${48 + i * 34} q 40 -18 82 0 q 40 18 82 0`} fill="none" stroke="oklch(0.52 0.10 85)" strokeWidth="5" strokeLinecap="round" />
      {[116, 146, 176, 206, 236, 264].map((x, k) => (
        <circle key={x} cx={x} cy={46 + i * 34 + (k % 2 ? 6 : -5)} r="4" fill="oklch(0.38 0.09 85)" />
      ))}
    </g>)}
    <circle cx="258" cy="150" r="13" fill="none" stroke="oklch(0.52 0.10 85)" strokeWidth="3.2" />
    <Lead at={[146, 40]} to={[120, 32]} text="ribosomes" side="left" />
    <Lead at={[130, 82]} to={[108, 96]} text="folded sheet" side="left" />
    <Lead at={[269, 146]} to={[280, 150]} text="parcel leaving" side="right" />
    <Cap>ROUGH BECAUSE OF WHAT IS STUCK TO IT</Cap>
  </g>,

  golgi: () => <g>
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M ${128 + i * 6} ${48 + i * 24} q 62 -24 124 0`}
        fill="none" stroke="oklch(0.52 0.12 340)" strokeWidth="6.5" strokeLinecap="round" />
    ))}
    {[[268, 62], [276, 96], [262, 130]].map(([x, y]) => (
      <circle key={y} cx={x} cy={y} r="9.5" fill="oklch(0.87 0.07 340)" stroke="oklch(0.46 0.12 340)" strokeWidth="2.4" />
    ))}
    <Lead at={[150, 44]} to={[122, 34]} text="comes in here" side="left" />
    <Lead at={[138, 118]} to={[110, 140]} text="stacked bags" side="left" />
    <Lead at={[277, 96]} to={[286, 96]} text="goes out here" side="right" />
    <Cap>LABELLED, PACKED AND ADDRESSED</Cap>
  </g>,

  mito: () => <g>
    <ellipse cx="190" cy="96" rx="86" ry="52" fill="oklch(0.85 0.07 40)" stroke="oklch(0.44 0.13 40)" strokeWidth="3" />
    <ellipse cx="190" cy="96" rx="76" ry="42" fill="oklch(0.92 0.04 40)" stroke="oklch(0.44 0.13 40)" strokeWidth="2.2" />
    <path d="M 118 96 q 12 -28 24 0 q 12 28 24 0 q 12 -28 24 0 q 12 28 24 0 q 12 -28 24 0 q 12 28 24 0"
      fill="none" stroke="oklch(0.48 0.13 40)" strokeWidth="2.8" />
    <Lead at={[130, 60]} to={[112, 40]} text="outer skin" side="left" />
    <Lead at={[142, 76]} to={[110, 148]} text="inner skin" side="left" />
    <Lead at={[214, 82]} to={[280, 48]} text="the folds" side="right" />
    <Lead at={[232, 120]} to={[280, 146]} text="ATP made here" side="right" />
    <Cap>FOLDED INSIDE, FOR MORE WORKING SURFACE</Cap>
  </g>,

  lyso: () => <g>
    <circle cx="190" cy="94" r="54" fill="oklch(0.87 0.08 155)" stroke="oklch(0.40 0.11 155)" strokeWidth="3" />
    {[[168, 72], [212, 78], [180, 112], [218, 108]].map(([x, y], i) => (
      <path key={i} d={`M ${x} ${y} l 9 -6 l 0 12 z`} fill="oklch(0.42 0.12 155)" />
    ))}
    <path d="M 154 92 l 14 5 l -4 12" fill="none" stroke="oklch(0.34 0.06 85)" strokeWidth="3.4" strokeLinecap="round" />
    <Lead at={[148, 60]} to={[120, 44]} text="sealed bag" side="left" />
    <Lead at={[158, 98]} to={[112, 140]} text="worn-out part" side="left" />
    <Lead at={[222, 80]} to={[274, 60]} text="enzymes" side="right" />
    <Cap>BROKEN DOWN SO THE PIECES CAN BE REUSED</Cap>
  </g>,

  cyto: () => <g>
    <rect x="104" y="36" width="172" height="118" rx="10" fill="oklch(0.95 0.015 235)" stroke="oklch(0.55 0.08 235)" strokeWidth="2.6" />
    {Array.from({ length: 54 }, (_, i) => {
      const x = 114 + ((i * 41) % 152)
      const y = 46 + ((i * 59) % 98)
      const h = [235, 45, 155, 300, 85][i % 5]
      return i % 3 === 0
        ? <path key={i} d={`M ${x} ${y} q 7 -6 13 0 q 6 6 12 0`} fill="none" stroke={`oklch(0.58 0.09 ${h})`} strokeWidth="2.1" />
        : <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 6 : 3.4} fill={`oklch(0.70 0.08 ${h})`} />
    })}
    <Lead at={[128, 60]} to={[104, 40]} text="proteins" side="left" />
    <Lead at={[138, 126]} to={[104, 146]} text="water between" side="left" />
    <Lead at={[262, 84]} to={[282, 76]} text="nothing spare" side="right" />
    <Cap>A THICK SOUP, NOT A ROOMY BAG</Cap>
  </g>,

  // ---- the four kinds of tissue -------------------------------------------
  epithelial: () => <g>
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i}>
        <rect x={110 + i * 28} y="46" width="26" height="70" rx="5" fill="oklch(0.90 0.04 235)" stroke="oklch(0.46 0.10 235)" strokeWidth="2.3" />
        <circle cx={123 + i * 28} cy="88" r="7.5" fill="oklch(0.52 0.11 235)" />
      </g>
    ))}
    <line x1="104" y1="122" x2="282" y2="122" stroke="oklch(0.44 0.09 85)" strokeWidth="4.5" />
    <Lead at={[150, 44]} to={[104, 32]} text="free surface" side="left" />
    <Lead at={[137, 88]} to={[104, 148]} text="one nucleus" side="left" />
    <Lead at={[250, 122]} to={[284, 134]} text="thin mat under" side="right" />
    <Lead at={[222, 52]} to={[284, 38]} text="no gaps" side="right" />
    <Cap>PACKED TIGHT — THIS IS A SURFACE</Cap>
  </g>,

  connective: () => <g>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <path key={i} d={`M 104 ${46 + i * 16} q 46 ${i % 2 ? -13 : 13} 92 0 q 46 ${i % 2 ? 13 : -13} 88 0`}
        fill="none" stroke="oklch(0.62 0.08 85)" strokeWidth="3.2" strokeLinecap="round" />
    ))}
    <rect x="104" y="40" width="176" height="98" fill="none" />
    {[[146, 70], [206, 104], [248, 62]].map(([x, y]) => (
      <ellipse key={x} cx={x} cy={y} rx="13" ry="9" fill="oklch(0.81 0.09 45)" stroke="oklch(0.44 0.12 45)" strokeWidth="2.3" />
    ))}
    <Lead at={[133, 70]} to={[104, 46]} text="a few cells" side="left" />
    <Lead at={[120, 110]} to={[100, 148]} text="fibres, mostly" side="left" />
    <Lead at={[261, 62]} to={[284, 52]} text="space between" side="right" />
    <Cap>FEW CELLS HOLDING A LOT OF FIBRE</Cap>
  </g>,

  muscle: () => <g>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x="104" y={48 + i * 30} width="176" height="22" rx="11" fill="oklch(0.87 0.07 28)" stroke="oklch(0.44 0.13 28)" strokeWidth="2.3" />
        {Array.from({ length: 13 }, (_, k) => (
          <line key={k} x1={116 + k * 13} y1={49 + i * 30} x2={116 + k * 13} y2={69 + i * 30}
            stroke="oklch(0.50 0.12 28)" strokeWidth="1.9" />
        ))}
        <circle cx={128 + i * 58} cy={59 + i * 30} r="5" fill="oklch(0.38 0.11 28)" />
      </g>
    ))}
    <Lead at={[110, 48]} to={[100, 34]} text="one fibre" side="left" />
    <Lead at={[128, 119]} to={[100, 148]} text="edge nuclei" side="left" />
    <Lead at={[246, 78]} to={[284, 64]} text="the stripes" side="right" />
    <Cap>THE STRIPES ARE THE PULLING MACHINERY</Cap>
  </g>,

  nervous: () => <g>
    <circle cx="136" cy="96" r="24" fill="oklch(0.88 0.05 300)" stroke="oklch(0.44 0.12 300)" strokeWidth="2.6" />
    <circle cx="136" cy="96" r="8.5" fill="oklch(0.50 0.12 300)" />
    {[[-22, -24], [-26, 0], [-20, 24], [-6, -30]].map(([dx, dy], i) => (
      <path key={i} d={`M ${136 + dx * 0.85} ${96 + dy * 0.85} l ${dx} ${dy} m ${-dx * 0.35} ${-dy * 0.35} l ${dy * 0.42} ${-dx * 0.42}`}
        fill="none" stroke="oklch(0.46 0.12 300)" strokeWidth="2.5" strokeLinecap="round" />
    ))}
    <line x1="160" y1="96" x2="250" y2="96" stroke="oklch(0.46 0.12 300)" strokeWidth="3.6" />
    {[170, 198, 226].map((x) => (
      <rect key={x} x={x} y="86" width="22" height="20" rx="9" fill="oklch(0.85 0.06 85)" stroke="oklch(0.46 0.10 85)" strokeWidth="2.1" />
    ))}
    {[[268, 76], [274, 96], [268, 116]].map(([x, y]) => (
      <g key={y}>
        <line x1="250" y1="96" x2={x} y2={y} stroke="oklch(0.46 0.12 300)" strokeWidth="2.5" />
        <circle cx={x} cy={y} r="6" fill="oklch(0.55 0.13 300)" />
      </g>
    ))}
    <Lead at={[112, 72]} to={[96, 44]} text="branches in" side="left" />
    <Lead at={[136, 112]} to={[100, 148]} text="cell body" side="left" />
    <Lead at={[209, 86]} to={[268, 40]} text="wrapped" side="right" />
    <Lead at={[276, 112]} to={[286, 136]} text="hands on" side="right" />
    <Cap>ONE CELL, FROM A FOOT TO A YARD LONG</Cap>
  </g>
}

export const PLATE_IDS = Object.keys(PLATES)

/** A labelled figure of one named thing, or nothing if there isn't one. */
export default function Plate({ id, width = 400, title }) {
  const Draw = PLATES[id]
  if (!Draw) return null
  return (
    <svg
      viewBox={BOX}
      style={{ width: '100%', maxWidth: width, height: 'auto', display: 'block' }}
      role="img"
      aria-label={title ? `Diagram: ${title}` : 'Detail diagram'}
    >
      <Draw />
    </svg>
  )
}
