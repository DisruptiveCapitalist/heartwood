// A small method-of-joints solver for flat, pin-jointed trusses.
//
// The bridge lesson lives or dies on this being real. A structure diagram with
// hand-picked colours would be the structural equivalent of a bicycle that does
// not wobble: it would look right and teach the wrong thing. With a solver, the
// learner drags the truck and the members respond because they must.
//
// Sign convention: a positive member force is TENSION (the member is being
// pulled apart and is pulling its two ends together). Negative is COMPRESSION.

/** Gaussian elimination with partial pivoting. Returns null for a singular system. */
function solveLinear(A, b) {
  const n = b.length
  const M = A.map((row, i) => [...row, b[i]])

  for (let col = 0; col < n; col++) {
    let pivot = col
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r
    }
    if (Math.abs(M[pivot][col]) < 1e-10) return null
    ;[M[col], M[pivot]] = [M[pivot], M[col]]

    for (let r = 0; r < n; r++) {
      if (r === col) continue
      const f = M[r][col] / M[col][col]
      if (f === 0) continue
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c]
    }
  }

  return M.map((row, i) => row[n] / row[i])   // back-substituted already: diagonal / RHS
}

/**
 * @param {{nodes: {x:number,y:number}[], members: [number,number][], pin: number, roller: number}} truss
 * @param {Record<number, [number, number]>} loads  node index -> [Fx, Fy], downward is negative Fy
 * @returns {{forces: number[], reactions: {pinX:number, pinY:number, rollerY:number}, residual: number} | null}
 */
export function solveTruss(truss, loads) {
  const { nodes, members, pin, roller } = truss
  const n = nodes.length
  const m = members.length
  const unknowns = m + 3
  if (2 * n !== unknowns) return null   // not statically determinate

  const A = Array.from({ length: 2 * n }, () => new Array(unknowns).fill(0))
  const b = new Array(2 * n).fill(0)

  members.forEach(([i, j], k) => {
    const dx = nodes[j].x - nodes[i].x
    const dy = nodes[j].y - nodes[i].y
    const L = Math.hypot(dx, dy)
    const ux = dx / L
    const uy = dy / L
    // Tension pulls each end toward the other end.
    A[2 * i][k] += ux
    A[2 * i + 1][k] += uy
    A[2 * j][k] -= ux
    A[2 * j + 1][k] -= uy
  })

  A[2 * pin][m] += 1          // pin, horizontal
  A[2 * pin + 1][m + 1] += 1  // pin, vertical
  A[2 * roller + 1][m + 2] += 1 // roller, vertical only

  for (const [node, [fx, fy]] of Object.entries(loads)) {
    b[2 * Number(node)] -= fx
    b[2 * Number(node) + 1] -= fy
  }

  const x = solveLinear(A, b)
  if (!x || x.some((v) => !Number.isFinite(v))) return null

  // How badly the answer fails equilibrium. Should be numerical noise.
  let residual = 0
  for (let r = 0; r < 2 * n; r++) {
    let sum = 0
    for (let c = 0; c < unknowns; c++) sum += A[r][c] * x[c]
    residual = Math.max(residual, Math.abs(sum - b[r]))
  }

  return {
    forces: x.slice(0, m),
    reactions: { pinX: x[m], pinY: x[m + 1], rollerY: x[m + 2] },
    residual
  }
}

/**
 * A load sitting on the deck between two nodes is carried to both of them,
 * in the proportion you would expect — which is how a real deck works, and is
 * also why the truck's weight arrives at the truss in two places at once.
 */
export function distributeToDeck(deckNodes, nodes, x, weight) {
  const loads = {}
  const add = (node, fy) => { loads[node] = [(loads[node]?.[0] ?? 0), (loads[node]?.[1] ?? 0) + fy] }

  for (let k = 0; k < deckNodes.length - 1; k++) {
    const a = deckNodes[k]
    const c = deckNodes[k + 1]
    const xa = nodes[a].x
    const xc = nodes[c].x
    if (x >= xa && x <= xc) {
      const t = (x - xa) / (xc - xa)
      add(a, -weight * (1 - t))
      add(c, -weight * t)
      return loads
    }
  }
  add(deckNodes[x < nodes[deckNodes[0]].x ? 0 : deckNodes.length - 1], -weight)
  return loads
}

/** The Warren-with-verticals span the bridge lesson uses. */
export const SPAN = {
  nodes: [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
    { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }
  ],
  members: [
    [0, 1], [1, 2], [2, 3], [3, 4],       // deck
    [5, 6], [6, 7],                        // top chord
    [0, 5], [1, 5], [1, 6], [2, 6], [3, 6], [3, 7], [4, 7]
  ],
  deckNodes: [0, 1, 2, 3, 4],
  pin: 0,
  roller: 4
}
