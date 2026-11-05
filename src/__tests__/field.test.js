import { describe, it, expect } from 'vitest'
import {
  yardsOff, channelled, flagPoints, lakeBreeze, delta, norm,
  GRID, heights, downhill, accumulate, trace, basin, isSink, isEdge, isHollow,
  cellBearing, wander,
  mossOdds, mossSurvey,
  iceFlow, flowSpread, driftOn,
  convergence, expectedError, metesBearings, MILES_PER_DEGREE
} from '../lib/field.js'

// Field Week's arithmetic. The file it tests mixes two kinds of claim and says
// so at the top: things that follow from geometry, which these tests pin down
// exactly, and first-order models of complicated physical things, where what
// is pinned down is the CONSEQUENCE of the model rather than the model's truth.

describe('what an angle costs on the ground', () => {
  it('keeps Lesson 7 arithmetic: about 31 yards a mile per degree', () => {
    expect(Math.round(yardsOff(1, 1))).toBe(31)
    expect(Math.round(yardsOff(1, 2))).toBe(61)
    expect(Math.round(yardsOff(2, 7.2))).toBe(445)
  })

  // The number that makes Field Week's cautions worth a week. A sixty-degree
  // error is not a wobble to be corrected; it is a different journey.
  it('finds a sixty-degree error is not an error but another destination', () => {
    expect(Math.round(yardsOff(1, 60))).toBe(3048)
    expect(yardsOff(1, 60) / 1760).toBeCloseTo(1.73, 2)
  })
})

describe('wind is a local fact', () => {
  // The model: a valley suppresses the across-valley component and keeps the
  // along-valley one. What is tested is that the model does what it claims.
  it('turns a west wind into a north-west one in a north-west valley', () => {
    const c = channelled(270, 330, 10)
    expect(Math.round(c.from)).toBe(330)
    expect(Math.round(c.deflection)).toBe(60)
    expect(c.speed).toBeCloseTo(5, 6)
    expect(c.stalled).toBe(false)
  })

  it('takes whichever way down the valley the wind already favoured', () => {
    expect(Math.round(channelled(270, 30, 10).from)).toBe(210)
    expect(Math.round(channelled(90, 30, 10).from)).toBe(30)
  })

  it('leaves a wind straight down the valley alone', () => {
    const c = channelled(270, 270, 10)
    expect(c.deflection).toBeCloseTo(0, 6)
    expect(c.speed).toBeCloseTo(10, 6)
  })

  it('has nothing left when the wind is square to the valley', () => {
    const c = channelled(270, 0, 10)
    expect(c.stalled).toBe(true)
    expect(c.speed).toBeCloseTo(0, 6)
  })

  it('flags a tree downwind, which is the way the wind is going', () => {
    expect(flagPoints(270)).toBe(90)
    expect(flagPoints(0)).toBe(180)
    expect(Math.abs(delta(flagPoints(135), 135))).toBe(180)
  })

  // Not a model. A shore reverses its wind twice a day, exactly.
  it('reverses the lake breeze between afternoon and dawn', () => {
    expect(lakeBreeze(90, true)).toBe(90)
    expect(lakeBreeze(90, false)).toBe(270)
    for (const towards of [0, 45, 180, 315]) {
      expect(Math.abs(delta(lakeBreeze(towards, true), lakeBreeze(towards, false)))).toBe(180)
    }
  })
})

describe('water and the shape of the ground', () => {
  const z = heights()
  const dir = downhill(z)
  const acc = accumulate(dir)
  const { w, h } = GRID
  const all = Array.from({ length: w * h }, (_, i) => i)

  it('drains a sheet six miles by four and a half', () => {
    expect((w * GRID.yardsPerCell) / 1760).toBeCloseTo(6, 1)
    expect((h * GRID.yardsPerCell) / 1760).toBeCloseTo(4.5, 1)
    const lo = Math.min(...z)
    const hi = Math.max(...z)
    expect(Math.round(hi)).toBe(974)
    expect(Math.round(lo)).toBe(637)
  })

  it('conserves the rain: every cell drains to a sink', () => {
    const sinks = all.filter((i) => isSink(dir, i))
    const total = sinks.reduce((t, i) => t + acc[i], 0)
    expect(total).toBe(w * h)
  })

  // The required case from the Field Guide's Chapter 18. One hollow in the
  // middle of the sheet takes nearly a square mile of drainage and has no
  // outlet at all — so "follow the water and you will come out somewhere" is
  // false on this ground, as it is on a great deal of real ground.
  it('has exactly one closed hollow, and it is a big one', () => {
    const hollows = all.filter((i) => isHollow(dir, i))
    expect(hollows).toHaveLength(1)
    const swamp = hollows[0]
    expect(swamp % w).toBe(44)
    expect((swamp / w) | 0).toBe(40)
    const b = basin(dir, swamp)
    expect(b.size).toBe(2109)
    const sqMiles = (b.size * GRID.yardsPerCell ** 2) / (1760 ** 2)
    expect(sqMiles).toBeCloseTo(8.2, 1)
    expect(Math.round((b.size * GRID.yardsPerCell ** 2) / 4840)).toBe(5273)
    // Nearly a third of the sheet drains into it and none of it comes out.
    expect(b.size / (w * h)).toBeGreaterThan(0.3)
  })

  it('distinguishes leaving the sheet from stopping on it', () => {
    expect(isEdge(0)).toBe(true)
    expect(isEdge(w * h - 1)).toBe(true)
    expect(isEdge(40 * w + 44)).toBe(false)
    const sinks = all.filter((i) => isSink(dir, i))
    expect(sinks.filter((i) => isEdge(i)).length).toBe(sinks.length - 1)
  })

  it('gives bearings on the grid the same sense as the rest of the course', () => {
    // Grid y runs south, so a cell one row up is due north.
    expect(cellBearing(10 * w + 10, 9 * w + 10)).toBeCloseTo(0, 6)
    expect(cellBearing(10 * w + 10, 10 * w + 11)).toBeCloseTo(90, 6)
    expect(cellBearing(10 * w + 10, 11 * w + 10)).toBeCloseTo(180, 6)
  })

  // Lesson 32's headline. A watercourse does not have a direction; it has a
  // sequence of them, and on this sheet the longest one covers 146 degrees of
  // the compass between its head and its mouth.
  it('finds one stream running through 146 degrees of the compass', () => {
    let longest = []
    for (let y = 2; y < h - 2; y += 3) {
      for (let x = 2; x < w - 2; x += 3) {
        const p = trace(dir, y * w + x)
        if (p.length > longest.length) longest = p
      }
    }
    expect(longest).toHaveLength(149)
    expect((longest.length * GRID.yardsPerCell) / 1760).toBeCloseTo(9.3, 1)
    const wd = wander(longest)
    expect(Math.round(wd.spread)).toBe(146)
    expect(Math.round(wd.from)).toBe(90)
    expect(isEdge(longest[longest.length - 1])).toBe(true)
  })

  // A spread is the smallest arc that holds every leg, not the largest minus
  // the smallest: a stream that runs due north and then a little west of
  // north has wandered 27 degrees, not 333.
  // Lesson 32's two starts, 220 yards apart on one hillside, and the whole
  // argument of the lesson: one of them comes out and the other does not.
  it('sends two walks 220 yards apart to opposite fates', () => {
    const hollow = all.find((i) => isHollow(dir, i))
    const ridge = trace(dir, 10 * w + 10)
    const above = trace(dir, 8 * w + 10)
    expect(ridge[ridge.length - 1]).toBe(hollow)
    expect(isEdge(above[above.length - 1])).toBe(true)
    expect(2 * GRID.yardsPerCell).toBe(220)
    expect((ridge.length * GRID.yardsPerCell) / 1760).toBeCloseTo(3.4, 1)
    expect((above.length * GRID.yardsPerCell) / 1760).toBeCloseTo(5.9, 1)
  })

  // And the one the lesson opens on: eight and a half miles of walking that
  // faces through five eighths of the compass before it is finished.
  it('finds a stream that covers 225 degrees before it is done', () => {
    const p = trace(dir, 40 * w + 12)
    expect(p).toHaveLength(135)
    expect((p.length * GRID.yardsPerCell) / 1760).toBeCloseTo(8.4, 1)
    const wd = wander(p)
    expect(Math.round(wd.spread)).toBe(225)
    expect(Math.round(wd.from)).toBe(90)
    expect(Math.round(wd.to)).toBe(315)
  })

  it('gives a short path a direction rather than a NaN', () => {
    const wd = wander(trace(dir, 10 * w + 10).slice(0, 4))
    expect(wd.from).toBe(null)
    expect(wd.spread).toBe(0)
  })

  it('measures a spread as the smallest arc holding every leg', () => {
    const at = (x, y) => y * w + x
    const path = [
      at(50, 50), at(50, 49), at(50, 48), at(50, 47), at(50, 46), at(50, 45), at(50, 44),
      at(49, 43), at(49, 42), at(48, 41), at(48, 40), at(47, 39), at(47, 38)
    ]
    const wd = wander(path, 6)
    expect(wd.legs.map(Math.round)).toEqual([0, 333])
    expect(Math.round(wd.spread)).toBe(27)
    expect(Math.round(wd.from)).toBe(333)
    expect(norm(-10)).toBe(350)
  })
})

describe('what one tree can tell you', () => {
  // The premise is generous to the folklore: the shaded side really is
  // favoured. The arithmetic is about what follows, not about any wood.
  const open = mossOdds(0.55, 0.25)
  const ravine = mossOdds(0.85, 0.80)

  it('finds half the trees on an open slope saying nothing at all', () => {
    expect(open.informative).toBeCloseTo(0.525, 6)
    expect(open.both + open.neither).toBeCloseTo(0.475, 6)
    expect(open.rightWay).toBeCloseTo(0.7857, 3)
  })

  // The damp ravine is where the folklore does worst, and it is exactly where
  // people look, because that is where moss is.
  it('finds the mossiest place the least informative', () => {
    expect(ravine.both).toBeCloseTo(0.68, 6)
    expect(ravine.informative).toBeCloseTo(0.29, 6)
    expect(ravine.rightWay).toBeCloseTo(0.5862, 3)
    expect(ravine.informative).toBeLessThan(open.informative)
    expect(ravine.rightWay).toBeLessThan(open.rightWay)
  })

  it('never does better than the odds on the favoured side', () => {
    for (const [pn, ps] of [[0.5, 0.2], [0.9, 0.1], [0.3, 0.3]]) {
      const o = mossOdds(pn, ps)
      if (pn === ps) expect(o.rightWay).toBeCloseTo(0.5, 6)
      else expect(o.rightWay).toBeGreaterThan(0.5)
    }
  })

  it('samples in step with its own odds', () => {
    const s = mossSurvey({ pNorth: 0.55, pSouth: 0.25, n: 4000, seed: 3 })
    expect(s.informative / s.n).toBeCloseTo(open.informative, 1)
    expect(s.rightWay).toBeCloseTo(open.rightWay, 1)
    expect(s.both + s.neither + s.northOnly + s.southOnly).toBe(4000)
  })
})

describe('ice records where it came from, not north', () => {
  const dome = { e: 0, n: 400 }

  it('points the flow away from the dome at every site', () => {
    expect(iceFlow(dome, { e: 0, n: 0 })).toBeCloseTo(180, 6)
    expect(iceFlow(dome, { e: 400, n: 400 })).toBeCloseTo(90, 6)
  })

  // Two sites a county apart, under the same ice, scratched in different
  // directions — which is the whole of the lesson's caution, as geometry.
  it('finds sites sixty miles apart differing by nearly nine degrees', () => {
    expect(flowSpread(dome, { e: -30, n: 0 }, { e: 30, n: 0 })).toBeCloseTo(8.6, 1)
    expect(flowSpread(dome, { e: -60, n: 0 }, { e: 60, n: 0 })).toBeCloseTo(17.1, 1)
  })

  it('drops snow on the lee of whatever broke the wind', () => {
    expect(driftOn(270)).toBe(90)
    expect(driftOn(0)).toBe(180)
  })
})

describe('the land people left', () => {
  it('closes the meridians by four minutes of arc across a township', () => {
    expect(convergence(40, 6) * 60).toBeCloseTo(4.37, 1)
    expect(convergence(40, 6)).toBeCloseTo(0.0728, 3)
    expect(convergence(0, 6)).toBeCloseTo(0, 6)
    expect(convergence(40, 24)).toBeGreaterThan(convergence(40, 6))
    expect(MILES_PER_DEGREE).toBeCloseTo(69.17, 2)
  })

  // Lesson 35's finding, and the most surprising thing in Field Week: a road
  // built on a section line is a far better compass than the compass.
  it('makes a section-line road twenty-seven times better than a compass', () => {
    const road = yardsOff(1, convergence(40, 6))
    const compass = yardsOff(1, 2)
    expect(Math.round(road * 10) / 10).toBe(2.2)
    expect(Math.round(compass * 10) / 10).toBe(61.5)
    expect(compass / road).toBeCloseTo(27.5, 1)
  })

  it('leaves a metes-and-bounds road saying nothing a traveller can use', () => {
    expect(expectedError([0, 90, 180, 270])).toBe(0)
    // A bearing that follows the ground is on average 22 degrees from the
    // nearest cardinal — and you cannot know WHICH cardinal, so even that
    // figure is the best case of four guesses.
    const spread = expectedError(metesBearings(4000, 5))
    expect(spread).toBeGreaterThan(20)
    expect(spread).toBeLessThan(25)
  })
})
