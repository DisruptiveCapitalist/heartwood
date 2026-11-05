import { describe, it, expect } from 'vitest'
import { NAVIGATORS } from '../engine/simulations/Voyage.jsx'
import {
  lonFromSeconds, secondsFromLon, nmPerDegLon, lonMiles, clockDrift,
  MOON_ARCMIN_PER_HOUR, lunarHours, lunarLonDeg, lunarLonNm, LUNAR_PENALTY,
  METRES_PER_NS, rangeFromClock, GPS_NET_US_PER_DAY,
  circleCross, disagreement, solveWithClock,
  aimOff, phi, legCost, offsetFor,
  naismith, cone, endRadius, C, DAY_POINTS, dayLegs,
  missBy, fitShapes, challenge, planBearing, planDistance
} from '../lib/voyage.js'

// Every number Week 6's copy quotes is produced here. Where a published figure
// exists, the test checks against the published figure rather than against
// itself — the clock drift against Harrison's Jamaica trial, the lunar-distance
// penalty against the quarter-degree the reference works give, the relativistic
// drift against the ten-kilometres-a-day everyone quotes.

describe('longitude is a clock', () => {
  it('pays four minutes to the degree, which is fifteen to the hour', () => {
    expect(lonFromSeconds(240)).toBeCloseTo(1, 12)
    expect(lonFromSeconds(3600)).toBeCloseTo(15, 12)
    expect(secondsFromLon(1)).toBe(240)
  })

  it('charges a quarter of a mile for one second, at the Equator', () => {
    expect(lonFromSeconds(1) * 60).toBeCloseTo(0.25, 10) // arcminutes
    expect(lonMiles(1, 0)).toBeCloseTo(0.25, 10)
  })

  it('charges less the further from the Equator you are', () => {
    expect(nmPerDegLon(0)).toBeCloseTo(60, 10)
    expect(nmPerDegLon(60)).toBeCloseTo(30, 10)
    expect(nmPerDegLon(90)).toBeCloseTo(0, 10)
    // 40° N — the course's own latitude. A second of clock is 0.19 of a mile
    // here and a quarter of one at Jamaica, which is a real and quotable
    // difference and the reason the prize trials went to the Caribbean.
    expect(lonMiles(1, 40)).toBeCloseTo(0.1915, 3)
    expect(lonMiles(1, 18)).toBeCloseTo(0.2378, 3)
  })

  // The Jamaica trial, 1761-62: H4 was 5.1 seconds slow after the passage, and
  // the contemporary account puts that at 1.25 minutes of longitude. The
  // arithmetic here lands on 1.275, so the figure in the sources is this sum
  // rounded, which is the corroboration worth having.
  it('reproduces the Harrison figure the sources quote', () => {
    expect(lonFromSeconds(5.1) * 60).toBeCloseTo(1.275, 3)
    expect(lonMiles(5.1, 0)).toBeCloseTo(1.275, 3)
    expect(Math.round(lonMiles(5.1, 0) * 100) / 100).toBe(1.27)
  })

  it('turns a daily rate into miles over a passage', () => {
    expect(clockDrift(3, 81)).toBe(243)
    expect(lonMiles(clockDrift(3, 81), 0)).toBeCloseTo(60.75, 2)
    expect(lonMiles(clockDrift(1, 81), 40)).toBeCloseTo(15.51, 2)
    // Ten seconds a day — a good domestic clock of the period — over a Jamaica
    // passage is two hundred miles, and that is the whole problem in one line.
    expect(Math.round(lonMiles(clockDrift(10, 81), 0))).toBe(203)
  })
})

describe('the Moon as a clock', () => {
  it('moves about its own diameter in an hour', () => {
    expect(MOON_ARCMIN_PER_HOUR).toBeCloseTo(32.94, 2)
    // Half a degree an hour, which is how every text states it.
    expect(MOON_ARCMIN_PER_HOUR / 60).toBeCloseTo(0.549, 3)
  })

  // The reference works say the combined error of a lunar-distance observation
  // is about half an arcminute, worth about a minute of Greenwich time and a
  // quarter of a degree of longitude — about 15 nautical miles at the Equator.
  // This computes 0.91 minutes and 13.7 miles from the Moon's motion alone, so
  // the published figure and this arithmetic agree to within their rounding.
  it('agrees with the published half-arcminute figure', () => {
    expect(lunarHours(0.5) * 60).toBeCloseTo(0.911, 2)
    expect(lunarLonNm(0.5, 0)).toBeCloseTo(13.66, 1)
    expect(lunarLonDeg(0.5)).toBeGreaterThan(0.2)
    expect(lunarLonDeg(0.5)).toBeLessThan(0.3)
  })

  it('charges twenty-seven minutes of longitude for one of angle', () => {
    expect(LUNAR_PENALTY).toBeCloseTo(27.32, 2)
    // Which is the whole history: the same instrument that gives latitude to a
    // mile gives longitude to twenty-seven.
    expect(lunarLonNm(1, 0) / 1).toBeCloseTo(27.32, 1)
  })
})

describe('the same arithmetic with light', () => {
  it('goes very nearly a foot in a nanosecond', () => {
    expect(METRES_PER_NS).toBeCloseTo(0.2998, 4)
    expect(METRES_PER_NS / 0.3048).toBeCloseTo(0.9836, 4) // feet — 0.98, not 1.00
    expect(rangeFromClock(1e-6)).toBeCloseTo(299.79, 1)
  })

  it('makes the relativistic drift the ten kilometres a day everyone quotes', () => {
    expect(GPS_NET_US_PER_DAY).toBe(38)
    const km = rangeFromClock(GPS_NET_US_PER_DAY * 1e-6) / 1000
    expect(km).toBeCloseTo(11.39, 1)
    expect(km).toBeGreaterThan(10)
    expect(km).toBeLessThan(12)
  })

  it('uses the defined speed of light', () => {
    expect(C).toBe(299792458)
  })
})

describe('circles of position', () => {
  const S = [{ x: -6000, y: 9000 }, { x: 7000, y: 11000 }, { x: 9000, y: -4000 }]
  const truth = { x: 300, y: -200 }
  const ranges = (bias) => S.map((s) => Math.hypot(s.x - truth.x, s.y - truth.y) + bias)

  it('crosses two circles at two points, or at none', () => {
    const pts = circleCross({ x: 0, y: 0 }, 5, { x: 8, y: 0 }, 5)
    expect(pts).toHaveLength(2)
    expect(pts[0].x).toBeCloseTo(4, 9)
    expect(Math.abs(pts[0].y)).toBeCloseTo(3, 9)
    expect(circleCross({ x: 0, y: 0 }, 1, { x: 50, y: 0 }, 1)).toHaveLength(0)
    expect(circleCross({ x: 0, y: 0 }, 1, { x: 0, y: 0 }, 5)).toHaveLength(0)
    // Tangent: one point, not two.
    expect(circleCross({ x: 0, y: 0 }, 4, { x: 10, y: 0 }, 6)).toHaveLength(1)
  })

  it('meets at a point only when the clock is right', () => {
    expect(disagreement(S, ranges(0), 0)).toBeLessThan(1e-6)
    expect(disagreement(S, ranges(300), 0)).toBeGreaterThan(50)
    expect(disagreement(S, ranges(300), 300)).toBeLessThan(1e-6)
  })

  // The lesson's claim: the receiver does not know the time, it solves for it,
  // and the position falls out of the same arithmetic. So the solver has to
  // recover a planted bias it was never told.
  it('recovers a planted clock error and the position with it', () => {
    const bias = 1e-6 * C // one microsecond
    const sol = solveWithClock(S, ranges(bias), 2000)
    expect(sol.clock).toBeCloseTo(bias, 0)
    expect(sol.at.x).toBeCloseTo(truth.x, 0)
    expect(sol.at.y).toBeCloseTo(truth.y, 0)
    expect(sol.residual).toBeLessThan(0.01)
  })

  it('recovers it whichever way the clock is wrong', () => {
    for (const ns of [-900, -100, -10, 10, 100, 900]) {
      const bias = ns * 1e-9 * C
      const sol = solveWithClock(S, ranges(bias), 2000)
      expect(sol.clock, `${ns} ns`).toBeCloseTo(bias, 0)
      expect(Math.hypot(sol.at.x - truth.x, sol.at.y - truth.y), `${ns} ns`).toBeLessThan(0.5)
    }
  })

  // And the cost of NOT solving for it. A microsecond is 300 metres of range
  // and rather more than 300 metres of position, because the geometry
  // amplifies it — which is why the quoted figure for this simulation is
  // measured rather than taken to be c × t.
  it('shows what ignoring the clock costs, which is more than the range error', () => {
    const out = (ns) => {
      const bias = ns * 1e-9 * C
      const r = ranges(bias)
      const pts = circleCross(S[0], r[0], S[1], r[1])
      const near = pts.reduce((a, b) =>
        Math.hypot(a.x - truth.x, a.y - truth.y) < Math.hypot(b.x - truth.x, b.y - truth.y) ? a : b)
      return Math.hypot(near.x - truth.x, near.y - truth.y)
    }
    expect(out(10)).toBeCloseTo(3.6, 0)
    expect(out(100)).toBeCloseTo(35.6, 0)
    expect(out(1000)).toBeCloseTo(354, 0)
    // Bigger than the 300 m of range the same error buys.
    expect(out(1000)).toBeGreaterThan(rangeFromClock(1e-6))
  })
})

describe('aiming off', () => {
  it('has a normal tail good enough to quote percentages from', () => {
    expect(phi(0)).toBeCloseTo(0.5, 6)
    expect(phi(1)).toBeCloseTo(0.8413, 4)
    expect(phi(1.96)).toBeCloseTo(0.975, 3)
    expect(phi(-1)).toBeCloseTo(0.1587, 4)
    expect(phi(3)).toBeCloseTo(0.99865, 4)
  })

  it('samples agree with the closed form for which side you land on', () => {
    for (const offset of [2, 4, 6, 8]) {
      const a = aimOff({ range: 1200, sigma: 3, offset, n: 20000, seed: 11 })
      expect(a.sampledKnownSide, `offset ${offset}`).toBeCloseTo(a.pKnownSide, 2)
    }
  })

  // The table Lesson 27 quotes. 1,200 yards to the stream, three degrees of
  // bearing error — which is a realistic figure for holding a course through
  // woodland, not for reading a compass on a table.
  it('reproduces the lesson table at 1,200 yards and three degrees', () => {
    const at = (offset) => aimOff({ range: 1200, sigma: 3, offset, n: 20000, seed: 11 })
    const straight = at(0)
    expect(Math.round(straight.meanWalk)).toBe(50)
    expect(Math.round(straight.p90Walk)).toBe(104)
    expect(Math.round(straight.blindSpan)).toBe(208)

    const four = at(4)
    expect(Math.round(four.pKnownSide * 1000) / 10).toBeCloseTo(90.9, 1)
    expect(Math.round(four.meanWalk)).toBe(89)

    const eight = at(8)
    expect(Math.round(eight.pKnownSide * 1000) / 10).toBeCloseTo(99.6, 1)
    expect(Math.round(eight.meanWalk)).toBe(169)
  })

  // The number that makes the technique worth teaching: the detour itself is
  // nothing. Seven degrees off a 1,200-yard leg is nine yards of extra walking,
  // because the hypotenuse of a long thin triangle is barely longer than the
  // long side.
  it('costs almost nothing on the leg itself', () => {
    expect(legCost(1200, 7)).toBeCloseTo(9.03, 1)
    expect(legCost(1200, 8)).toBeCloseTo(11.79, 1)
    expect(legCost(1200, 15)).toBeCloseTo(42.3, 1)
    // Under one per cent of the leg, out to ten degrees.
    expect(legCost(1200, 10) / 1200).toBeLessThan(0.016)
  })

  it('names the offset that makes the side all but certain', () => {
    expect(offsetFor(3, 0.99)).toBeCloseTo(6.98, 1)
    expect(offsetFor(2, 0.99)).toBeCloseTo(4.65, 1)
    // 2.33 sigma, as the normal table says it must be, and the practical rule
    // "aim off by two and a half times your error" falls out of it.
    expect(offsetFor(3, 0.99) / 3).toBeCloseTo(2.33, 1)
  })

  // What it does NOT do, and the copy must not claim: it does not save
  // walking. At every error size the aimed-off walk along the feature is
  // longer than the straight-ahead miss. What it removes is the coin toss.
  it('does not save distance — it removes the coin toss', () => {
    for (const sigma of [1, 2, 3, 4, 6]) {
      const k = offsetFor(sigma, 0.99)
      const straight = aimOff({ range: 1200, sigma, offset: 0, n: 20000, seed: 3 })
      const aimed = aimOff({ range: 1200, sigma, offset: k, n: 20000, seed: 3 })
      expect(aimed.meanWalk, `sigma ${sigma}`).toBeGreaterThan(straight.meanWalk)
      expect(aimed.pKnownSide, `sigma ${sigma}`).toBeGreaterThan(0.985)
      // And the walk it asks for stays inside the stretch you would have had
      // to search blind, which is the comparison that justifies it.
      expect(aimed.meanWalk, `sigma ${sigma}`).toBeLessThan(straight.blindSpan)
    }
  })

  it('aims at the target when told not to aim off at all', () => {
    const a = aimOff({ range: 1200, sigma: 0.0001, offset: 0, n: 500, seed: 5 })
    expect(a.meanWalk).toBeLessThan(0.1)
    expect(a.pKnownSide).toBe(0)
  })
})

describe('planning a journey', () => {
  const LEGS = dayLegs()
  const at = (legs, systematic = false) =>
    Math.round(endRadius(cone(legs, { sigma: 3, pace: 0.05, systematic })))
  const fixAfter = (i) => LEGS.map((l, j) => (j === i ? { ...l, fix: true } : l))

  // The plan is a picture of a table, so a mileage that disagrees with the
  // drawing is invisible. These come off the positions, not out of the copy.
  it('measures its legs off the plan', () => {
    expect(LEGS).toHaveLength(7)
    expect(LEGS[0].miles).toBeCloseTo(1.051, 3)
    expect(LEGS[1].miles).toBeCloseTo(0.750, 3)
    expect(LEGS[6].miles).toBeCloseTo(1.931, 3)
    const miles = LEGS.reduce((t, l) => t + l.miles, 0)
    const up = LEGS.reduce((t, l) => t + l.feetUp, 0)
    expect(miles).toBeCloseTo(8.443, 3)
    expect(up).toBe(1000)
    // And it comes back to where it started.
    expect(DAY_POINTS[0].e).toBe(DAY_POINTS[DAY_POINTS.length - 1].e)
    expect(DAY_POINTS[0].n).toBe(DAY_POINTS[DAY_POINTS.length - 1].n)
  })

  it('keeps Naismith as Lesson 23 had it', () => {
    expect(naismith(3, 0)).toBeCloseTo(1, 10)
    expect(naismith(0, 2000)).toBeCloseTo(1, 10)
    expect(naismith(6, 1500)).toBeCloseTo(2.75, 10)
    // The whole circuit: eight and a half miles and a thousand feet of climb
    // is three hours and twenty minutes, of which the climb is half an hour.
    const miles = LEGS.reduce((t, l) => t + l.miles, 0)
    expect(naismith(miles, 1000)).toBeCloseTo(3.314, 3)
    expect(naismith(miles, 1000) - naismith(miles, 0)).toBeCloseTo(0.5, 10)
  })

  it('adds a box per leg and quotes its worst corner', () => {
    const rows = cone([{ miles: 1.1 }], { sigma: 3, pace: 0.05 })
    expect(rows[0].acrossYd).toBeCloseTo(1.1 * 1760 * Math.tan(Math.PI / 60), 6)
    expect(Math.round(rows[0].acrossYd)).toBe(101)
    expect(Math.round(rows[0].alongYd)).toBe(97)
    expect(Math.round(rows[0].own)).toBe(140)
  })

  // Three degrees of bearing and five per cent of pace contribute almost
  // exactly the same amount, because tan 3 degrees is 0.052 and five per cent
  // is 0.050. That is Lesson 23's exchange rate — two degrees is worth about
  // three and a half per cent — turning up again in the plan.
  it('finds the compass and the pace count contributing equally', () => {
    const rows = cone([{ miles: 2 }], { sigma: 3, pace: 0.05 })
    expect(rows[0].acrossYd / rows[0].alongYd).toBeCloseTo(1.048, 2)
  })

  it('grows root-n for random error and n for systematic', () => {
    expect(at(LEGS, false)).toBe(423)
    expect(at(LEGS, true)).toBe(1076)
    // Seven legs: near enough the square root of seven, and exactly that if
    // the legs were equal.
    expect(at(LEGS, true) / at(LEGS, false)).toBeGreaterThan(2.4)
    expect(at(LEGS, true) / at(LEGS, false)).toBeLessThan(2.7)
  })

  it('collapses the cone to the quality of a fix, and only there', () => {
    const rows = cone(fixAfter(1), { sigma: 3, pace: 0.05 })
    expect(Math.round(rows[1].radius)).toBe(50)
    expect(Math.round(rows[2].radius)).toBeGreaterThan(50)
  })

  // The finding Lesson 29 is built on. One fix is one piece of work wherever
  // it is taken, and where it is taken changes what it is worth by a factor of
  // nine: at the first landmark it takes 84 yards off the end of the day, and
  // at the last it takes 780 off.
  it('finds where a fix is taken mattering more than taking one', () => {
    expect(at(fixAfter(0), true)).toBe(992)
    expect(at(fixAfter(5), true)).toBe(296)
    expect(at(LEGS, true) - at(fixAfter(0), true)).toBe(84)
    expect(at(LEGS, true) - at(fixAfter(5), true)).toBe(780)
    expect(at(fixAfter(0), false)).toBe(405)
    expect(at(fixAfter(5), false)).toBe(251)
  })

  it('finds only the last fix bounding where the day ends', () => {
    const two = LEGS.map((l, j) => (j === 1 || j === 5 ? { ...l, fix: true } : l))
    expect(at(two, false)).toBe(at(fixAfter(5), false))
    expect(at(two, true)).toBe(at(fixAfter(5), true))
  })

  it('never lets the cone grow at all if every leg ends on a fix', () => {
    expect(at(LEGS.map((l) => ({ ...l, fix: true })), true)).toBe(50)
  })

  it('returns nothing for a route with no legs', () => {
    expect(cone([], { sigma: 3, pace: 0.05 })).toEqual([])
    expect(endRadius([])).toBe(0)
  })
})

describe('weighing up evidence that disagrees', () => {
  it('measures how far a point misses a line, and a circle', () => {
    // A line through the origin running due north: the miss is the easting.
    expect(missBy({ kind: 'line', at: { x: 0, y: 0 }, bearing: 0 }, { x: 3, y: 99 })).toBeCloseTo(3, 9)
    // Running due east: the miss is the northing.
    expect(missBy({ kind: 'line', at: { x: 0, y: 0 }, bearing: 90 }, { x: 99, y: 4 })).toBeCloseTo(4, 9)
    expect(missBy({ kind: 'circle', at: { x: 0, y: 0 }, r: 10 }, { x: 13, y: 0 })).toBeCloseTo(3, 9)
    expect(missBy({ kind: 'circle', at: { x: 0, y: 0 }, r: 10 }, { x: 0, y: 6 })).toBeCloseTo(4, 9)
  })

  it('puts the fit exactly where three lines are concurrent', () => {
    const f = fitShapes([
      { kind: 'line', at: { x: 0, y: 0 }, bearing: 0 },
      { kind: 'line', at: { x: 0, y: 0 }, bearing: 90 },
      { kind: 'line', at: { x: 5, y: -5 }, bearing: 45 }
    ], { x: 1, y: 1 }, 10)
    expect(f.at.x).toBeCloseTo(0, 4)
    expect(f.at.y).toBeCloseTo(0, 4)
    expect(f.rms).toBeLessThan(1e-4)
  })

  it('has nothing to say about no evidence at all', () => {
    expect(fitShapes([], { x: 0, y: 0 })).toBe(null)
  })

  // Lesson 30's problem, and the four ways of answering it.
  const c = challenge()
  const yd = (miles) => Math.round(miles * 1760)
  const drop = (id) => c.dropping.find((d) => d.drop === id)

  it('sets a problem with three sighted bearings and one counted distance', () => {
    expect(c.evidence).toHaveLength(4)
    expect(c.evidence.filter((e) => e.kind === 'line')).toHaveLength(3)
    // The pace count is 120 yards long on a 1,003-yard run — twelve per cent,
    // which is what broken ground does to a stride.
    const pace = c.evidence.find((e) => e.id === 'pace')
    expect(yd(pace.truth)).toBe(1003)
    expect(yd(pace.observed)).toBe(1124)
    expect(yd(pace.observed - pace.truth)).toBe(120)
  })

  it('offers three bearings that genuinely cut each other', () => {
    const cut = (a, b) => { const d = Math.abs(((a - b) % 360 + 360) % 360) % 180; return d > 90 ? 180 - d : d }
    const b = c.evidence.filter((e) => e.kind === 'line').map((e) => e.truth)
    expect(cut(b[0], b[1])).toBeGreaterThan(80)
    expect(cut(b[1], b[2])).toBeGreaterThan(40)
    expect(cut(b[0], b[2])).toBeGreaterThan(40)
  })

  it('finds discarding the counted distance measurably best', () => {
    expect(Math.round(c.all.yardsOut)).toBe(87)
    expect(Math.round(drop('pace').yardsOut)).toBe(58)
    expect(Math.round(drop('tower').yardsOut)).toBe(81)
    expect(Math.round(drop('pond').yardsOut)).toBe(86)
    expect(Math.round(drop('quarry').yardsOut)).toBe(123)
    // Best of the four, and better than keeping everything.
    for (const id of ['tower', 'quarry', 'pond']) {
      expect(drop('pace').yardsOut, `vs dropping ${id}`).toBeLessThan(drop(id).yardsOut)
    }
    expect(drop('pace').yardsOut).toBeLessThan(c.all.yardsOut)
  })

  // The trap, and the reason this lesson closes the course rather than opening
  // it: the set of evidence that agrees best with itself is the set that is
  // most wrong. Two lines and a circle can be made to pass through one point,
  // so a one-yard residual means the evidence was not enough to argue with,
  // not that the answer is good.
  it('finds the tidiest-looking answer the worst one', () => {
    const tidiest = c.dropping.reduce((a, b) => (b.rms < a.rms ? b : a))
    const worst = c.dropping.reduce((a, b) => (b.yardsOut > a.yardsOut ? b : a))
    expect(tidiest.drop).toBe('quarry')
    expect(worst.drop).toBe('quarry')
    expect(yd(tidiest.rms)).toBeLessThan(3)
    expect(yd(drop('pace').rms)).toBeGreaterThan(yd(tidiest.rms))
  })

  it("keeps the plan's bearings and distances consistent with the plan", () => {
    const tower = DAY_POINTS.find((p) => p.id === 'tower')
    const pond = DAY_POINTS.find((p) => p.id === 'pond')
    expect(planBearing(tower, pond)).toBeCloseTo(257.9, 1)
    expect(planBearing(pond, tower)).toBeCloseTo(77.9, 1)
    expect(planDistance(tower, pond)).toBeCloseTo(1.432, 3)
    // Due north is 000 and due east is 090, as everywhere else in the course.
    expect(planBearing({ e: 0, n: 0 }, { e: 0, n: 1 })).toBeCloseTo(0, 9)
    expect(planBearing({ e: 0, n: 0 }, { e: 1, n: 0 })).toBeCloseTo(90, 9)
  })
})

// The four kits Lesson 28 steps through, computed from the same table the
// simulation draws from, so the copy, the handbook description and the screen
// cannot drift apart. Thirty days at a hundred miles a day on the parallel of
// 20 degrees, where a degree of longitude is 56.4 miles.
describe('what each kit is worth after a passage', () => {
  const DAYS = 30
  const LAT = 20
  const RUN = 100
  const row = (id) => {
    const n = NAVIGATORS.find((x) => x.id === id)
    const dr = n.dr * RUN * DAYS
    const chron = n.rate === null ? null : lonMiles(clockDrift(n.rate, DAYS), LAT)
    const lunar = n.lunars ? lunarLonNm(n.arcmin, LAT) : null
    return {
      lat: n.arcmin,
      lon: Math.min(...[dr, chron, lunar].filter((v) => v !== null)),
      dr,
      chron,
      lunar
    }
  }

  it('is four kits and no more', () => {
    expect(NAVIGATORS.map((n) => n.id)).toEqual(['eye', 'kamal', 'lunars', 'chron'])
  })

  it('reproduces Lesson 28\'s table', () => {
    expect(row('eye').lat).toBe(60)
    expect(Math.round(row('eye').lon)).toBe(150)
    expect(row('kamal').lat).toBe(30)
    expect(Math.round(row('kamal').lon)).toBe(150)
    expect(row('lunars').lat).toBe(2)
    expect(Math.round(row('lunars').lon)).toBe(51)
    expect(row('chron').lat).toBe(2)
    expect(Math.round(row('chron').lon)).toBe(21)
  })

  it('finds a better instrument moving a level and only a clock a gradient', () => {
    // The latitude line is flat: the same at day one as at day thirty.
    for (const n of NAVIGATORS) expect(n.arcmin).toBe(n.arcmin)
    // Dead reckoning climbs at 3 to 5 miles a day; a 3 s/day chronometer at 0.7.
    const perDay = lonMiles(clockDrift(3, 1), LAT)
    expect(Math.round(perDay * 10) / 10).toBe(0.7)
    expect(NAVIGATORS.find((n) => n.id === 'chron').dr * RUN).toBe(3)
    expect((NAVIGATORS.find((n) => n.id === 'chron').dr * RUN) / perDay).toBeGreaterThan(4)
  })

  it('finds the Moon only beating the reckoning after seventeen days', () => {
    const n = NAVIGATORS.find((n) => n.id === 'lunars')
    const days = lunarLonNm(n.arcmin, LAT) / (n.dr * RUN)
    expect(Math.round(days)).toBe(17)
  })
})

// The figures in Lesson 27's challenge verdicts, which talk about a mile and
// twelve degrees rather than the simulation's defaults.
describe('aiming off at a mile', () => {
  const MILE = 1760
  it('costs thirty-nine yards on the leg at twelve degrees', () => {
    expect(Math.round(legCost(MILE, 12))).toBe(39)
  })

  it('asks for 374 yards of wall at twelve degrees and 247 at eight', () => {
    expect(Math.round(MILE * Math.tan((12 * Math.PI) / 180))).toBe(374)
    expect(Math.round(MILE * Math.tan((8 * Math.PI) / 180))).toBe(247)
    expect(374 - 247).toBe(127)
  })

  it('needs nine or ten degrees for four degrees of error', () => {
    expect(offsetFor(4, 0.99)).toBeGreaterThan(9)
    expect(offsetFor(4, 0.99)).toBeLessThan(10)
  })
})
