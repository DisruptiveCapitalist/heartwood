// Detail plates — a small drawing of one named thing.
//
// The course spec (§6) asks for labelled illustrations of the individual items,
// not only of the whole scene, and it is right: a lesson that explains a
// ribosome in prose while drawing it as a dot on a diagram is asking the learner
// to take the interesting part on trust.
//
// These are authored drawings rather than photographs, for three reasons. The
// spec prefers clear diagrams and warns against decorative imagery. They are a
// couple of kilobytes each instead of a couple of hundred, which matters because
// the offline course is one single file. And they stay sharp on a tablet at any
// size, which a bitmap does not.
//
// Each plate draws into the same 180×120 box so they line up wherever they are
// used. Keep them schematic: the job is to make one thing recognisable, and the
// spec is explicit that a simplified teaching drawing must not pretend to be a
// complete picture of the biology.
//
// Captions are clipped by the 180-wide box, silently, with no warning anywhere.
// At this size a centred caption fits in about 26 characters. Measure a new one
// in the browser with getBBox rather than trusting it to look about right —
// three of the first twelve overflowed and one of them lost its first word.

const BOX = '0 0 180 120'
const INK = 'var(--machine)'
const LABEL = 'var(--label)'

const tiny = { fontFamily: 'var(--sans)', fontSize: 9, fontWeight: 700, letterSpacing: 0.6, fill: LABEL }

/** A phospholipid: a head and two tails, pointing up or down. */
function Lipid({ x, y, down, hue = 235 }) {
  const d = down ? 1 : -1
  return <g>
    <circle cx={x} cy={y} r="4" fill={`oklch(0.62 0.09 ${hue})`} />
    <path d={`M ${x - 1.7} ${y + d * 4} l 0 ${d * 17} M ${x + 1.7} ${y + d * 4} l 0 ${d * 17}`}
      stroke={`oklch(0.52 0.07 ${hue})`} strokeWidth="1.5" strokeLinecap="round" />
  </g>
}

const PLATES = {
  // ---- the parts of a cell ------------------------------------------------
  membrane: () => <g>
    {Array.from({ length: 15 }, (_, i) => <Lipid key={`t${i}`} x={14 + i * 11} y={36} down />)}
    {Array.from({ length: 15 }, (_, i) => <Lipid key={`b${i}`} x={14 + i * 11} y={84} />)}
    <rect x="96" y="26" width="24" height="68" rx="11" fill="oklch(0.74 0.11 340)" stroke="oklch(0.44 0.13 340)" strokeWidth="2" />
    <path d="M 108 26 l 0 -8 M 108 94 l 0 8" stroke="oklch(0.44 0.13 340)" strokeWidth="2.5" strokeLinecap="round" />
    <text x="90" y="14" textAnchor="middle" {...tiny}>TWO MOLECULES THICK</text>
    <text x="172" y="112" textAnchor="end" {...tiny}>a protein door</text>
  </g>,

  nucleus: () => <g>
    <circle cx="90" cy="60" r="46" fill="oklch(0.90 0.04 300)" stroke="oklch(0.45 0.12 300)" strokeWidth="2.5" />
    <circle cx="90" cy="60" r="41" fill="none" stroke="oklch(0.45 0.12 300)" strokeWidth="2" strokeDasharray="16 7" />
    <path d="M 62 44 q 13 11 26 0 q 13 -11 26 0 M 62 62 q 13 11 26 0 q 13 -11 26 0 M 68 80 q 11 10 22 0"
      fill="none" stroke="oklch(0.42 0.13 300)" strokeWidth="2.2" />
    <circle cx="112" cy="44" r="9" fill="oklch(0.55 0.13 300)" />
    <text x="90" y="116" textAnchor="middle" {...tiny}>GAPS LET THE COPIES OUT</text>
  </g>,

  ribosome: () => <g>
    <path d="M 56 44 q 30 -16 60 0 q 10 14 -2 22 l -56 0 q -12 -8 -2 -22 z" fill="oklch(0.78 0.08 85)" stroke="oklch(0.40 0.10 85)" strokeWidth="2.5" />
    <path d="M 60 70 q 28 16 54 0 q 6 12 -6 18 l -42 0 q -12 -6 -6 -18 z" fill="oklch(0.68 0.09 85)" stroke="oklch(0.40 0.10 85)" strokeWidth="2.5" />
    <line x1="10" y1="66" x2="170" y2="66" stroke="oklch(0.50 0.13 85)" strokeWidth="2.6" strokeDasharray="7 4" />
    {[126, 140, 154, 168].map((x, i) => (
      <circle key={x} cx={x} cy={30 - i * 0} r="5.5" fill={`oklch(0.72 0.10 ${[235, 45, 155, 300][i]})`} stroke={INK} strokeWidth="1.2" />
    ))}
    <path d="M 116 44 q 10 -14 10 -14" fill="none" stroke={INK} strokeWidth="1.6" />
    <text x="12" y="80" {...tiny}>mRNA IN</text>
    <text x="168" y="48" textAnchor="end" {...tiny}>CHAIN OUT</text>
  </g>,

  er: () => <g>
    {[0, 1, 2].map((i) => <g key={i}>
      <path d={`M 18 ${34 + i * 26} q 36 -15 70 0 q 34 15 72 0`} fill="none" stroke="oklch(0.50 0.10 85)" strokeWidth="4.5" strokeLinecap="round" />
      {[26, 52, 78, 104, 130, 152].map((x, k) => (
        <circle key={x} cx={x} cy={32 + i * 26 + (k % 2 ? 5 : -4)} r="3.4" fill="oklch(0.38 0.09 85)" />
      ))}
    </g>)}
    <circle cx="152" cy="104" r="11" fill="none" stroke="oklch(0.50 0.10 85)" strokeWidth="3" />
    <text x="14" y="116" {...tiny}>THE DOTS ARE RIBOSOMES</text>
  </g>,

  golgi: () => <g>
    {[0, 1, 2, 3].map((i) => (
      <path key={i} d={`M ${34 + i * 5} ${32 + i * 17} q 56 -20 112 0`}
        fill="none" stroke="oklch(0.52 0.12 340)" strokeWidth="6" strokeLinecap="round" />
    ))}
    {[[158, 42], [166, 66], [154, 90]].map(([x, y]) => (
      <circle key={x + y} cx={x} cy={y} r="8" fill="oklch(0.86 0.07 340)" stroke="oklch(0.46 0.12 340)" strokeWidth="2.2" />
    ))}
    <text x="90" y="116" textAnchor="middle" {...tiny}>PACKED, LABELLED, SENT</text>
  </g>,

  mito: () => <g>
    <ellipse cx="90" cy="60" rx="76" ry="40" fill="oklch(0.84 0.07 40)" stroke="oklch(0.44 0.13 40)" strokeWidth="3" />
    <ellipse cx="90" cy="60" rx="68" ry="32" fill="oklch(0.90 0.05 40)" stroke="oklch(0.44 0.13 40)" strokeWidth="2" />
    <path d="M 28 60 q 10 -22 20 0 q 10 22 20 0 q 10 -22 20 0 q 10 22 20 0 q 10 -22 20 0 q 10 22 20 0"
      fill="none" stroke="oklch(0.48 0.13 40)" strokeWidth="2.6" />
    <text x="90" y="116" textAnchor="middle" {...tiny}>FOLDED, FOR MORE SURFACE</text>
  </g>,

  lyso: () => <g>
    <circle cx="90" cy="58" r="42" fill="oklch(0.86 0.08 155)" stroke="oklch(0.40 0.11 155)" strokeWidth="3" />
    {[[72, 44], [104, 48], [84, 72], [110, 70]].map(([x, y], i) => (
      <path key={i} d={`M ${x} ${y} l 7 -5 l 0 10 z`} fill="oklch(0.42 0.12 155)" />
    ))}
    <path d="M 64 62 l 11 4 l -3 9" fill="none" stroke="oklch(0.34 0.06 85)" strokeWidth="3" strokeLinecap="round" />
    <text x="90" y="116" textAnchor="middle" {...tiny}>ENZYMES, SAFELY SHUT IN</text>
  </g>,

  cyto: () => <g>
    <rect x="10" y="18" width="160" height="82" rx="8" fill="oklch(0.95 0.015 235)" stroke="oklch(0.55 0.08 235)" strokeWidth="2.5" />
    {Array.from({ length: 40 }, (_, i) => {
      const x = 20 + ((i * 37) % 142)
      const y = 28 + ((i * 53) % 64)
      const h = [235, 45, 155, 300, 85][i % 5]
      return i % 3 === 0
        ? <path key={i} d={`M ${x} ${y} q 6 -5 11 0 q 5 5 10 0`} fill="none" stroke={`oklch(0.58 0.09 ${h})`} strokeWidth="2" />
        : <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 5 : 3} fill={`oklch(0.70 0.08 ${h})`} />
    })}
    <text x="90" y="116" textAnchor="middle" {...tiny}>CROWDED — NOT EMPTY SPACE</text>
  </g>,

  // ---- the four kinds of tissue -------------------------------------------
  epithelial: () => <g>
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i}>
        <rect x={18 + i * 24} y="26" width="22" height="56" rx="4" fill="oklch(0.90 0.04 235)" stroke="oklch(0.46 0.10 235)" strokeWidth="2.2" />
        <circle cx={29 + i * 24} cy="60" r="6.5" fill="oklch(0.52 0.11 235)" />
      </g>
    ))}
    <line x1="14" y1="86" x2="166" y2="86" stroke="oklch(0.40 0.08 85)" strokeWidth="4" />
    <text x="90" y="18" textAnchor="middle" {...tiny}>PACKED TIGHT — A SURFACE</text>
    <text x="90" y="106" textAnchor="middle" {...tiny}>SITTING ON A THIN MAT</text>
  </g>,

  connective: () => <g>
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M 12 ${30 + i * 15} q 40 ${i % 2 ? -11 : 11} 80 0 q 40 ${i % 2 ? 11 : -11} 76 0`}
        fill="none" stroke="oklch(0.62 0.08 85)" strokeWidth="3" strokeLinecap="round" />
    ))}
    {[[44, 48], [100, 72], [138, 42]].map(([x, y]) => (
      <ellipse key={x} cx={x} cy={y} rx="11" ry="8" fill="oklch(0.80 0.09 45)" stroke="oklch(0.44 0.12 45)" strokeWidth="2.2" />
    ))}
    <text x="90" y="112" textAnchor="middle" {...tiny}>FEW CELLS, A LOT OF FIBRE</text>
  </g>,

  muscle: () => <g>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x="12" y={26 + i * 24} width="156" height="18" rx="9" fill="oklch(0.86 0.07 28)" stroke="oklch(0.44 0.13 28)" strokeWidth="2.2" />
        {Array.from({ length: 11 }, (_, k) => (
          <line key={k} x1={24 + k * 13} y1={27 + i * 24} x2={24 + k * 13} y2={43 + i * 24}
            stroke="oklch(0.50 0.12 28)" strokeWidth="1.8" />
        ))}
        <circle cx={20 + i * 50} cy={35 + i * 24} r="4.5" fill="oklch(0.38 0.11 28)" />
      </g>
    ))}
    <text x="90" y="112" textAnchor="middle" {...tiny}>THE STRIPES DO THE WORK</text>
  </g>,

  nervous: () => <g>
    <circle cx="44" cy="60" r="20" fill="oklch(0.88 0.05 300)" stroke="oklch(0.44 0.12 300)" strokeWidth="2.5" />
    <circle cx="44" cy="60" r="7" fill="oklch(0.50 0.12 300)" />
    {[[-18, -20], [-22, 0], [-16, 20], [-4, -26]].map(([dx, dy], i) => (
      <path key={i} d={`M ${44 + dx * 0.9} ${60 + dy * 0.9} l ${dx} ${dy} m ${-dx * 0.35} ${-dy * 0.35} l ${dy * 0.4} ${-dx * 0.4}`}
        fill="none" stroke="oklch(0.46 0.12 300)" strokeWidth="2.4" strokeLinecap="round" />
    ))}
    <line x1="64" y1="60" x2="146" y2="60" stroke="oklch(0.46 0.12 300)" strokeWidth="3.4" />
    {[76, 100, 124].map((x) => (
      <rect key={x} x={x} y="52" width="18" height="16" rx="7" fill="oklch(0.84 0.06 85)" stroke="oklch(0.46 0.10 85)" strokeWidth="2" />
    ))}
    {[[160, 44], [164, 60], [160, 76]].map(([x, y]) => (
      <g key={y}>
        <line x1="146" y1="60" x2={x} y2={y} stroke="oklch(0.46 0.12 300)" strokeWidth="2.4" />
        <circle cx={x} cy={y} r="5" fill="oklch(0.55 0.13 300)" />
      </g>
    ))}
    <text x="90" y="112" textAnchor="middle" {...tiny}>ONE LONG WIRE, WRAPPED</text>
  </g>
}

export const PLATE_IDS = Object.keys(PLATES)

/** A labelled detail drawing of one named thing, or nothing if there isn't one. */
export default function Plate({ id, width = 180, title }) {
  const Draw = PLATES[id]
  if (!Draw) return null
  return (
    <svg
      viewBox={BOX}
      width={width}
      style={{ width, height: 'auto', flex: '0 0 auto', display: 'block' }}
      role="img"
      aria-label={title ? `Diagram: ${title}` : 'Detail diagram'}
    >
      <Draw />
    </svg>
  )
}
