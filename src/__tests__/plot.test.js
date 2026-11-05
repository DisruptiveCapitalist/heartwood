import { describe, it, expect } from 'vitest'
import {
  SHEET, MARKS, WEEK5_MARKS, YOU, bearing, distance, cut, intersect, along,
  cockedHat, inside, area, across, sight, reckon, naismith, random, gaussian,
  yards, fromYards, norm, delta
} from '../lib/plot.js'

// Week 5 makes four numerical claims that the copy quotes, and all four are
// either counter-intuitive or contradict something navigators are told. So all
// four are measured here rather than asserted in prose.
//
//   1. A fix's error goes as 1 / sin(cut angle). Two bearings crossing at 25°
//      are three times worse than the same two bearings crossing at 90°, with
//      the same compass and the same care.
//   2. The cocked hat contains the true position one time in four — and that
//      fraction does not depend on how good your bearings are, or on where the
//      landmarks sit. Lesson 22's whole argument.
//   3. The size of the cocked hat barely predicts how wrong the fix is. The
//      correlation is about 0.3, which means "small triangle, good fix" is not
//      a rule, and the simulation can produce a 31-yard triangle 82 yards out.
//   4. A CONSTANT error — a mis-set declination, say — behaves completely
//      differently from random error. Spread your landmarks round you and most
//      of it cancels; take them all from one side and none of it does.
//
// The sheet is the one Lesson 10 established, at 380 px to the mile, with two
// landmarks added so that Week 5 can offer a choice of three.

const r0 = (n) => Math.round(n)
const marks = (...ids) => ids.map((id) => WEEK5_MARKS.find((m) => m.id === id))
const truthTo = (ms) => ms.map((m) => bearing(YOU, m))

/** The cocked hat for a set of marks with a given error on each bearing. */
const hatFor = (ms, errors) =>
  cockedHat(ms.map((m, i) => ({ mark: m, observed: truthTo(ms)[i] + errors[i] })))

const centroid = (h) => ({
  x: (h[0].x + h[1].x + h[2].x) / 3,
  y: (h[0].y + h[1].y + h[2].y) / 3
})

describe('the sheet', () => {
  it('is drawn to the scale Lesson 10 quoted', () => {
    // Lesson 10: "Seven degrees ... across this sheet's two miles it is 446
    // yards." That fixes the scale, so the two lessons cannot drift apart.
    expect(SHEET.w / SHEET.pxPerMile).toBeCloseTo(2, 2)
    expect(r0(1760 * 2 * Math.tan((7.22 * Math.PI) / 180))).toBe(446)
  })

  it("keeps Lesson 10's three landmarks where they were", () => {
    for (const m of MARKS) {
      const same = WEEK5_MARKS.find((w) => w.id === m.id)
      expect(same, `${m.id} missing from the Week 5 sheet`).toBeTruthy()
      expect([same.x, same.y], `${m.id} moved`).toEqual([m.x, m.y])
    }
  })

  it('puts every landmark on the sheet, and the observer among them', () => {
    for (const m of WEEK5_MARKS) {
      expect(m.x > 0 && m.x < SHEET.w, `${m.id} x`).toBe(true)
      expect(m.y > 0 && m.y < SHEET.h, `${m.id} y`).toBe(true)
    }
    expect(YOU.x > 0 && YOU.x < SHEET.w).toBe(true)
    expect(YOU.y > 0 && YOU.y < SHEET.h).toBe(true)
  })

  it('offers both a bunched trio and a spread one, which is the point of five', () => {
    const biggestGap = (ms) => {
      const b = truthTo(ms).sort((p, q) => p - q)
      return Math.max(...b.map((t, i) => norm(b[(i + 1) % b.length] - t)))
    }
    // All three in front of you: a gap of more than half the horizon.
    expect(biggestGap(marks('tower', 'pond', 'rock'))).toBeGreaterThan(180)
    // Spread round you: no gap that big.
    expect(biggestGap(marks('pond', 'rock', 'quarry'))).toBeLessThan(180)
  })
})

describe('bearings and lines on paper', () => {
  it('reads a bearing off the sheet with north up and y downward', () => {
    // The sign trap: SVG y grows downward, so "north" is −y. Get this wrong
    // and every line on the sheet is drawn upside down.
    expect(bearing({ x: 0, y: 0 }, { x: 0, y: -100 })).toBeCloseTo(0, 6)
    expect(bearing({ x: 0, y: 0 }, { x: 100, y: 0 })).toBeCloseTo(90, 6)
    expect(bearing({ x: 0, y: 0 }, { x: 0, y: 100 })).toBeCloseTo(180, 6)
    expect(bearing({ x: 0, y: 0 }, { x: -100, y: 0 })).toBeCloseTo(270, 6)
  })

  it('walks back along a bearing to where it started', () => {
    const p = { x: 300, y: 300 }
    for (const b of [0, 37, 112, 254, 359]) {
      const q = along(p, b, 140)
      expect(bearing(p, q)).toBeCloseTo(b, 6)
      expect(distance(p, q)).toBeCloseTo(140, 6)
    }
  })

  it('crosses two correct bearings exactly on the observer', () => {
    // The sanity check the whole week rests on: no error in, no error out.
    for (const [a, b] of [['tower', 'pond'], ['pond', 'rock'], ['quarry', 'ford']]) {
      const [ma, mb] = marks(a, b)
      const fix = intersect(ma, bearing(YOU, ma), mb, bearing(YOU, mb))
      expect(distance(fix, YOU), `${a}+${b}`).toBeLessThan(1e-6)
    }
  })

  it('refuses to invent a fix from two bearings in the same direction', () => {
    const [ma, mb] = marks('tower', 'pond')
    expect(intersect(ma, 40, mb, 40)).toBeNull()
    expect(intersect(ma, 40, mb, 220)).toBeNull()   // reciprocal: the same line
  })

  it('measures the cut angle the same way round either way', () => {
    expect(cut(10, 100)).toBeCloseTo(90, 6)
    expect(cut(100, 10)).toBeCloseTo(90, 6)
    expect(cut(10, 170)).toBeCloseTo(20, 6)         // nearly reciprocal: a poor cut
    expect(cut(350, 10)).toBeCloseTo(20, 6)         // across 0
  })

  it('moves a position line sideways by range times the tangent of the error', () => {
    // One degree at a mile is 31 yards, the figure Lesson 10 quotes.
    expect(r0(yards(across(SHEET.pxPerMile, 1)))).toBe(31)
    expect(r0(yards(across(SHEET.pxPerMile, 7.22)))).toBe(223)   // half of 446
  })
})

// Claim 1. The cut angle, not the compass, decides how good a two-bearing fix
// is — and the relation is a closed form, so the geometry can be checked
// against the algebra instead of against my arithmetic.
describe('the cut angle decides the fix', () => {
  const PAIRS = [
    ['quarry', 'ford', 90, 52],
    ['tower', 'pond', 87, 57],
    ['tower', 'rock', 68, 70],
    ['rock', 'ford', 39, 105],
    ['pond', 'rock', 25, 162]
  ]

  it('is a three-fold spread across one sheet, from the same two degrees', () => {
    for (const [a, b, expectedCut, expectedWorst] of PAIRS) {
      const [ma, mb] = marks(a, b)
      const ta = bearing(YOU, ma)
      const tb = bearing(YOU, mb)
      expect(r0(cut(ta, tb)), `cut ${a}+${b}`).toBe(expectedCut)

      let worst = 0
      for (const sa of [-2, 2]) {
        for (const sb of [-2, 2]) {
          worst = Math.max(worst, distance(YOU, intersect(ma, ta + sa, mb, tb + sb)))
        }
      }
      expect(r0(yards(worst)), `worst fix error ${a}+${b}`).toBe(expectedWorst)
    }
    // Best pair to worst pair, same instrument, same care, same sheet.
    expect(PAIRS[4][3] / PAIRS[0][3]).toBeGreaterThan(3)
  })

  it('matches the closed form, which is where the 1 / sin comes from', () => {
    // Line A displaced by a yards, line B by b yards, crossing at θ: the fix
    // moves by √(a² + b² ± 2ab·cos θ) / sin θ. Checking the drawn geometry
    // against that is what makes "1 / sin" a result rather than a slogan.
    for (const [a, b] of [['quarry', 'ford'], ['tower', 'rock'], ['pond', 'rock']]) {
      const [ma, mb] = marks(a, b)
      const ta = bearing(YOU, ma)
      const tb = bearing(YOU, mb)
      const theta = (cut(ta, tb) * Math.PI) / 180
      const da = yards(across(distance(YOU, ma), 2))
      const db = yards(across(distance(YOU, mb), 2))

      let worst = 0
      for (const sa of [-2, 2]) {
        for (const sb of [-2, 2]) {
          worst = Math.max(worst, yards(distance(YOU, intersect(ma, ta + sa, mb, tb + sb))))
        }
      }
      const predicted = Math.sqrt(da * da + db * db + 2 * da * db * Math.cos(theta)) / Math.sin(theta)

      // Within a few per cent, not exactly: the closed form treats a displaced
      // line as parallel to the true one, and it is not — it pivots on the
      // landmark. The agreement is best exactly where the result matters, at
      // the shallow cuts (0.1% at 25° and 39°) and loosest at the near-square
      // ones, where it is 5% of a small number.
      expect(Math.abs(worst - predicted) / worst, `${a}+${b}`).toBeLessThan(0.06)
    }
  })

  it('blows up as the cut closes, which is why a near-reciprocal pair is useless', () => {
    const [ma, mb] = marks('tower', 'pond')
    const ta = bearing(YOU, ma)
    const errAt = (theta) => {
      const fix = intersect(ma, ta + 2, mb, ta + theta)
      return fix ? yards(distance(YOU, fix)) : Infinity
    }
    // Halving the cut angle roughly doubles the error, all the way down.
    expect(errAt(40) / errAt(80)).toBeGreaterThan(1.7)
    expect(errAt(20) / errAt(40)).toBeGreaterThan(1.7)
    expect(errAt(5)).toBeGreaterThan(yards(distance(YOU, ma)))   // worse than useless
  })
})

// Claim 2. The one-in-four result, by enumeration and by sampling.
describe('the cocked hat holds the truth one time in four', () => {
  const TRIOS = [
    ['tower', 'pond', 'rock'],
    ['pond', 'rock', 'quarry'],
    ['tower', 'quarry', 'ford'],
    ['tower', 'rock', 'ford']
  ]

  it('is exactly two of the eight ways three errors can fall', () => {
    // The derivation, as a test. Each line falls on one side of the truth or
    // the other; that is 2³ = 8 equally likely combinations; exactly two of
    // them wrap the truth in a triangle. Nothing here is about navigation —
    // it is counting — which is why the answer cannot be improved upon.
    for (const ids of TRIOS) {
      const ms = marks(...ids)
      let hits = 0
      for (const s0 of [-1, 1]) {
        for (const s1 of [-1, 1]) {
          for (const s2 of [-1, 1]) {
            if (inside(YOU, hatFor(ms, [2 * s0, 2 * s1, 2 * s2]))) hits += 1
          }
        }
      }
      expect(hits, `${ids.join('+')}`).toBe(2)
    }
  })

  it('stays one in four however good the bearings are', () => {
    // This is the part that catches people out. A careful navigator's triangle
    // is small, and still only contains the truth a quarter of the time.
    const ms = marks('tower', 'pond', 'rock')
    for (const sigma of [0.5, 1, 2, 4]) {
      const rng = random(12345)
      let n = 0
      let hits = 0
      for (let k = 0; k < 20000; k += 1) {
        const hat = hatFor(ms, [gaussian(rng) * sigma, gaussian(rng) * sigma, gaussian(rng) * sigma])
        if (hat.some((p) => !p)) continue
        n += 1
        if (inside(YOU, hat)) hits += 1
      }
      expect(hits / n, `sigma ${sigma}°`).toBeGreaterThan(0.235)
      expect(hits / n, `sigma ${sigma}°`).toBeLessThan(0.265)
    }
  })

  it('stays one in four wherever the landmarks are', () => {
    for (const ids of TRIOS) {
      const ms = marks(...ids)
      const rng = random(2024)
      let n = 0
      let hits = 0
      for (let k = 0; k < 20000; k += 1) {
        const hat = hatFor(ms, [gaussian(rng) * 2, gaussian(rng) * 2, gaussian(rng) * 2])
        if (hat.some((p) => !p)) continue
        n += 1
        if (inside(YOU, hat)) hits += 1
      }
      expect(hits / n, ids.join('+')).toBeGreaterThan(0.235)
      expect(hits / n, ids.join('+')).toBeLessThan(0.265)
    }
  })
})

// Claim 3. A small triangle is not a good fix. This is the one that changes
// what a navigator should DO, so it gets the most careful test.
describe('the size of the triangle barely tells you anything', () => {
  const ms = marks('tower', 'pond', 'rock')

  it('correlates only weakly with how wrong the fix actually is', () => {
    const rng = random(777)
    const pts = []
    for (let k = 0; k < 20000; k += 1) {
      const hat = hatFor(ms, [gaussian(rng) * 2, gaussian(rng) * 2, gaussian(rng) * 2])
      if (hat.some((p) => !p)) continue
      pts.push([Math.sqrt(area(hat)), distance(YOU, centroid(hat))])
    }
    const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length
    const mx = mean(pts.map((p) => p[0]))
    const my = mean(pts.map((p) => p[1]))
    const sx = Math.sqrt(mean(pts.map((p) => (p[0] - mx) ** 2)))
    const sy = Math.sqrt(mean(pts.map((p) => (p[1] - my) ** 2)))
    const r = mean(pts.map((p) => (p[0] - mx) * (p[1] - my))) / (sx * sy)

    // Some relation — a huge triangle does mean something went wrong — but
    // nowhere near enough to read the one off the other.
    expect(r).toBeGreaterThan(0.2)
    expect(r).toBeLessThan(0.45)
  })

  it('can be small and badly wrong, or large and nearly right', () => {
    // Two specific samples the simulation also produces, so the copy can
    // quote them and the learner can reproduce them.
    const small = hatFor(ms, [3.0, 0.8, 2.2])
    const large = hatFor(ms, [-6.6, 1.1, 2.0])
    expect(r0(yards(Math.sqrt(area(small))))).toBe(31)
    expect(r0(yards(distance(YOU, centroid(small))))).toBe(82)
    expect(r0(yards(Math.sqrt(area(large))))).toBe(120)
    expect(r0(yards(distance(YOU, centroid(large))))).toBe(45)

    // The small triangle is the worse fix. That is the whole lesson.
    expect(distance(YOU, centroid(small))).toBeGreaterThan(distance(YOU, centroid(large)))
    expect(area(small)).toBeLessThan(area(large))
  })
})

// Claim 4. Random error and constant error are different animals, and the
// remedy for the second one is where you point the compass, not how carefully.
describe('a constant error is not a random one', () => {
  it('mostly cancels when the landmarks are spread round you', () => {
    const spread = marks('pond', 'rock', 'quarry')
    const hat = hatFor(spread, [2, 2, 2])
    expect(r0(yards(Math.sqrt(area(hat)))), 'triangle side').toBe(108)
    expect(r0(yards(distance(YOU, centroid(hat)))), 'fix error').toBe(11)
    expect(inside(YOU, hat), 'truth inside the hat').toBe(true)
  })

  it('does not cancel at all when they are all on one side', () => {
    const bunched = marks('tower', 'pond', 'rock')
    const hat = hatFor(bunched, [2, 2, 2])
    expect(r0(yards(Math.sqrt(area(hat)))), 'triangle side').toBe(57)
    expect(r0(yards(distance(YOU, centroid(hat)))), 'fix error').toBe(81)
    expect(inside(YOU, hat), 'truth inside the hat').toBe(false)
  })

  it('leaves the smaller triangle holding the worse fix', () => {
    // Side by side, the sentence the lesson is built on: the tidy-looking
    // triangle is seven times further out than the sprawling one.
    const bunched = hatFor(marks('tower', 'pond', 'rock'), [2, 2, 2])
    const spread = hatFor(marks('pond', 'rock', 'quarry'), [2, 2, 2])
    expect(area(bunched)).toBeLessThan(area(spread))
    expect(distance(YOU, centroid(bunched))).toBeGreaterThan(5 * distance(YOU, centroid(spread)))
  })

  it('never puts the truth inside when every bearing leans the same way and the marks do not surround you', () => {
    const bunched = marks('tower', 'pond', 'rock')
    for (const bias of [-5, -3, -1, 1, 2, 3, 5]) {
      expect(inside(YOU, hatFor(bunched, [bias, bias, bias])), `bias ${bias}°`).toBe(false)
    }
  })
})

// Lesson 23. The arithmetic of a measured distance, and the fact that it moves
// you in a different direction from a bearing error.
describe('measuring the distance', () => {
  it('puts a distance error along the line and a bearing error across it', () => {
    const range = fromYards(1021)
    expect(r0(yards(across(range, 2))), 'two degrees, across').toBe(36)
    expect(r0(1021 * 0.05), 'five per cent, along').toBe(51)

    // Both are proportional to the range, so the comparison is the same at
    // any scale: a 2° bearing is worth about a 3.5% distance measurement.
    const ratio = yards(across(range, 2)) / 1021
    expect(ratio).toBeCloseTo(0.0349, 3)
  })

  it('agrees with Naismith, who is still the planning rule on British hills', () => {
    expect(naismith(6, 0)).toBeCloseTo(2, 6)
    expect(naismith(6, 1500)).toBeCloseTo(2.75, 6)
    expect(naismith(3, 2000)).toBeCloseTo(2, 6)
  })
})

// Lesson 24. Dead reckoning, and the distinction the copy must not blur: a
// steering bias accumulates with distance run, a current with time elapsed.
describe('dead reckoning', () => {
  const START = { x: 150, y: 470 }
  const threeMilesAt = (speed) => [{ course: 45, speed, hours: 3 / speed }]

  it('carries a position forward and leaves it where the arithmetic says', () => {
    const r = reckon(START, [{ course: 90, speed: 3, hours: 1 }])
    expect(r.run).toBeCloseTo(3, 6)
    expect(r.gap).toBeCloseTo(0, 6)                       // nothing wrong, nothing lost
    expect(r.plotted[1].x - START.x).toBeCloseTo(3 * SHEET.pxPerMile, 6)
    expect(r.plotted[1].y).toBeCloseTo(START.y, 6)
  })

  it('makes a steering bias cost the same whatever speed you go', () => {
    const slow = reckon(START, threeMilesAt(1.5), { bias: 5 })
    const fast = reckon(START, threeMilesAt(3), { bias: 5 })
    expect(yards(slow.gap)).toBeCloseTo(yards(fast.gap), 3)
    expect(r0(yards(fast.gap))).toBe(461)

    // And it is the per-mile figure, three times over: 5° is 154 yd a mile.
    expect(r0(1760 * Math.tan((5 * Math.PI) / 180))).toBe(154)
    expect(r0(yards(fast.gap) / 3)).toBe(154)
  })

  it('makes a current cost double when you go half the speed', () => {
    const slow = reckon(START, threeMilesAt(1.5), { set: 180, drift: 0.5 })
    const fast = reckon(START, threeMilesAt(3), { set: 180, drift: 0.5 })
    expect(r0(yards(fast.gap))).toBe(880)                 // half a mile in one hour
    expect(r0(yards(slow.gap))).toBe(1760)                // a whole mile in two
    expect(slow.gap / fast.gap).toBeCloseTo(2, 6)
  })

  it('pushes the track the way the current sets, not the way it comes from', () => {
    // A wind is named for where it comes FROM and a current for where it goes
    // TO, and mixing the two conventions reverses the correction.
    const r = reckon(START, [{ course: 90, speed: 3, hours: 1 }], { set: 180, drift: 1 })
    expect(r.made[1].y).toBeGreaterThan(r.plotted[1].y)   // south is +y on the sheet
    expect(r0(bearing(r.plotted[1], r.made[1]))).toBe(180)
  })

  it('accumulates leg by leg rather than resetting at each turn', () => {
    const legs = [
      { course: 90, speed: 3, hours: 0.5 },
      { course: 0, speed: 3, hours: 0.5 },
      { course: 270, speed: 3, hours: 0.5 }
    ]
    const r = reckon(START, legs, { bias: 4 })
    expect(r.plotted).toHaveLength(4)
    expect(r.run).toBeCloseTo(4.5, 6)
    // Three legs of a square that should have come back over itself; the bias
    // means the end of the plot and the end of the walk are not the same place.
    expect(yards(r.gap)).toBeGreaterThan(100)
  })
})

// Lesson 25. The running fix: one landmark, two bearings, and a known run in
// between. It is worthless until the run has opened the cut angle, and showing
// where that threshold falls is the lesson.
describe('the running fix', () => {
  const TOWER = WEEK5_MARKS.find((m) => m.id === 'tower')
  const START = { x: 300, y: 430 }
  const COURSE = 90

  /** Transfer the first line forward along the run, then cut it with the second. */
  const runningFix = (runYards, errors = [0, 0]) => {
    const second = along(START, COURSE, fromYards(runYards))
    const first = bearing(START, TOWER) + errors[0]
    const then = bearing(second, TOWER) + errors[1]
    const moved = along(TOWER, COURSE, fromYards(runYards))
    return { second, fix: intersect(moved, first, TOWER, then), cut: cut(first, then) }
  }

  it('lands on the truth when nothing is wrong', () => {
    for (const run of [300, 600, 900, 1200]) {
      const { second, fix } = runningFix(run)
      expect(distance(fix, second), `run ${run} yd`).toBeLessThan(1e-6)
    }
  })

  it('is useless until the run has opened the angle', () => {
    const table = [[300, 7, 2492], [600, 16, 616], [900, 26, 317], [1200, 37, 204]]
    for (const [run, expectedCut, expectedWorst] of table) {
      let worst = 0
      for (const s1 of [-2, 2]) {
        for (const s2 of [-2, 2]) {
          const { second, fix } = runningFix(run, [s1, s2])
          if (fix) worst = Math.max(worst, yards(distance(second, fix)))
        }
      }
      expect(r0(runningFix(run).cut), `cut after ${run} yd`).toBe(expectedCut)
      expect(r0(worst), `worst fix error after ${run} yd`).toBe(expectedWorst)
    }
    // At 300 yards the fix can be further out than the tower is away: not a
    // poor fix, a meaningless one.
    expect(2492).toBeGreaterThan(yards(distance(START, TOWER)))
  })

  it('gives nothing at all if you run straight at the landmark', () => {
    // The sight line does not swing, so there is no second line to cross —
    // the one case where doing everything right yields no fix.
    const straight = bearing(START, TOWER)
    const second = along(START, straight, fromYards(600))
    expect(cut(bearing(START, TOWER), bearing(second, TOWER))).toBeLessThan(0.01)
    expect(intersect(along(TOWER, straight, fromYards(600)), straight, TOWER, straight)).toBeNull()
  })

  it('inherits the error in the run, amplified by the cut', () => {
    // A running fix is only as good as Lesson 23's distance measurement.
    const { second } = runningFix(900)
    const first = bearing(START, TOWER)
    const then = bearing(second, TOWER)
    for (const [pct, expected] of [[5, 74], [10, 148], [15, 221]]) {
      const assumed = 900 * (1 + pct / 100)
      const fix = intersect(along(TOWER, COURSE, fromYards(assumed)), first, TOWER, then)
      expect(r0(yards(distance(second, fix))), `run ${pct}% long`).toBe(expected)
    }
  })
})

describe('the seeded generator', () => {
  it('gives the same sample twice, so a re-render does not reshuffle the sky', () => {
    const a = random(99)
    const b = random(99)
    for (let i = 0; i < 20; i += 1) expect(a()).toBe(b())
  })

  it('produces something close to a normal distribution', () => {
    const rng = random(5)
    const xs = Array.from({ length: 50000 }, () => gaussian(rng))
    const mean = xs.reduce((s, v) => s + v, 0) / xs.length
    const sd = Math.sqrt(xs.reduce((s, v) => s + (v - mean) ** 2, 0) / xs.length)
    expect(Math.abs(mean)).toBeLessThan(0.02)
    expect(sd).toBeCloseTo(1, 1)
    expect(xs.filter((x) => Math.abs(x) < 1).length / xs.length).toBeCloseTo(0.683, 1)
  })

  it('normalises and compares bearings without a seam at north', () => {
    expect(norm(-10)).toBeCloseTo(350, 6)
    expect(norm(370)).toBeCloseTo(10, 6)
    expect(delta(10, 350)).toBeCloseTo(20, 6)
    expect(delta(350, 10)).toBeCloseTo(-20, 6)
  })
})
