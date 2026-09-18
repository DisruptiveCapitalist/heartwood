import { describe, it, expect } from 'vitest'
import { solveTruss, distributeToDeck, SPAN } from '../lib/truss.js'

describe('truss solver', () => {
  it('is statically determinate', () => {
    expect(2 * SPAN.nodes.length).toBe(SPAN.members.length + 3)
  })

  it('satisfies equilibrium at every joint', () => {
    for (const x of [0.5, 1, 1.7, 2, 2.5, 3.2, 4]) {
      const out = solveTruss(SPAN, distributeToDeck(SPAN.deckNodes, SPAN.nodes, x, 100))
      expect(out, `no solution with the load at ${x}`).not.toBeNull()
      expect(out.residual, `residual with the load at ${x}`).toBeLessThan(1e-6)
    }
  })

  it('carries the whole load into the two supports', () => {
    const out = solveTruss(SPAN, distributeToDeck(SPAN.deckNodes, SPAN.nodes, 2, 100))
    expect(out.reactions.pinY + out.reactions.rollerY).toBeCloseTo(100, 6)
    expect(out.reactions.pinX).toBeCloseTo(0, 6)
  })

  it('shifts the reactions toward whichever support the load is nearer', () => {
    const left = solveTruss(SPAN, distributeToDeck(SPAN.deckNodes, SPAN.nodes, 1, 100))
    const right = solveTruss(SPAN, distributeToDeck(SPAN.deckNodes, SPAN.nodes, 3, 100))
    expect(left.reactions.pinY).toBeGreaterThan(left.reactions.rollerY)
    expect(right.reactions.rollerY).toBeGreaterThan(right.reactions.pinY)
  })

  it('puts the bottom chord in tension and the top chord in compression', () => {
    // The signature of a loaded simple span, and the thing the lesson claims.
    const out = solveTruss(SPAN, distributeToDeck(SPAN.deckNodes, SPAN.nodes, 2, 100))
    const force = (a, b) => {
      const k = SPAN.members.findIndex((mm) => (mm[0] === a && mm[1] === b) || (mm[0] === b && mm[1] === a))
      return out.forces[k]
    }
    expect(force(1, 2), 'bottom chord should be pulled apart').toBeGreaterThan(0)
    expect(force(2, 3), 'bottom chord should be pulled apart').toBeGreaterThan(0)
    expect(force(5, 6), 'top chord should be squeezed').toBeLessThan(0)
    expect(force(6, 7), 'top chord should be squeezed').toBeLessThan(0)
  })

  it('shares a load between the two deck nodes it sits between', () => {
    const loads = distributeToDeck(SPAN.deckNodes, SPAN.nodes, 1.25, 100)
    expect(loads[1][1]).toBeCloseTo(-75, 6)
    expect(loads[2][1]).toBeCloseTo(-25, 6)
  })
})
