// The last week's arithmetic — Navigation, Week 6.
//
// Weeks 3 and 4 computed the sky. Week 5 computed what a wrong bearing does to
// a position on a map sheet. Week 6 computes the two things the course has been
// deferring since Lesson 3, and one thing it has never mentioned at all:
//
//   1. LONGITUDE IS A CLOCK. The exchange rate has been in the learner's
//      notebook since Lesson 14 — fifteen degrees to the hour — and what it
//      means in practice is that east-west position is bought with time and
//      nothing else. Four minutes of clock error is a degree. One second is a
//      quarter of a nautical mile at the Equator. That is a brutal rate to pay
//      on an instrument that has to survive a gun deck and a damp winter, and
//      it is the whole reason the problem took three centuries.
//
//   2. THE SAME SUM, WITH LIGHT. A satellite receiver does Harrison's trick
//      with a different clock: light goes 0.2998 metres in a nanosecond, so a
//      microsecond of clock error is 300 metres of range error. The receiver
//      has no good clock, so it does not know the time — it SOLVES for the
//      time, as an extra unknown, which is why it needs one more satellite
//      than there are dimensions to find.
//
//   3. AIMING OFF. The one practical technique in the whole course that makes
//      an error smaller by deliberately making it bigger. Walk straight at a
//      point and a bearing error leaves you beside it on an unknown side; walk
//      deliberately wide of it and the side is known. Measured here, because
//      the usual advice ("aim off by more than your likely error") is sound and
//      says nothing about what it costs, and the cost turns out to be
//      astonishingly small.
//
// CONVENTIONS. Angles in degrees at the boundary, radians inside. Longitude
// counts positive east. A clock that is SLOW makes you think you are further
// west than you are, because local noon seems to arrive later than it does;
// the sign is handled where it matters and stated where it is quoted.

const rad = (d) => (d * Math.PI) / 180

/* ---- longitude is a clock ---------------------------------------------- */

export const DEG_PER_HOUR = 15
export const MINUTES_PER_DEGREE = 4
export const NM_PER_DEGREE = 60
/** A nautical mile in metres, and in yards, by definition since 1929. */
export const NM_METRES = 1852
export const NM_YARDS = NM_METRES / 0.9144

/** Degrees of longitude that `seconds` of clock error is worth. 240 s to 1°. */
export const lonFromSeconds = (seconds) => seconds / 240
export const secondsFromLon = (deg) => deg * 240

/**
 * Nautical miles in a degree of longitude at this latitude. 60 at the Equator
 * and nothing at all at the pole — which is Lesson 3's point arriving with a
 * consequence attached: the same clock error costs less the further north you
 * are, and a navigator in the Channel was better off than one at Barbados.
 */
export const nmPerDegLon = (lat) => NM_PER_DEGREE * Math.cos(rad(lat))

/** How far east or west `seconds` of clock error puts you, in nautical miles. */
export const lonMiles = (seconds, lat = 0) => lonFromSeconds(seconds) * nmPerDegLon(lat)

/** A clock losing or gaining `rate` seconds a day, after `days`. */
export const clockDrift = (rate, days) => rate * days

/* ---- the Moon as the clock nobody had to carry -------------------------- */

/** Sidereal month, days. The Moon's circuit against the stars. */
export const SIDEREAL_MONTH = 27.321661

/**
 * Arcminutes an hour the Moon moves against the stars — about 33, which is a
 * shade more than its own diameter. That number is the entire lunar-distance
 * method: the Moon is a hand on the sky's clock, and the hand is slow.
 */
export const MOON_ARCMIN_PER_HOUR = (360 * 60) / (SIDEREAL_MONTH * 24)

/** Hours of Greenwich time you get wrong from `arcmin` of angular error. */
export const lunarHours = (arcmin) => arcmin / MOON_ARCMIN_PER_HOUR
export const lunarLonDeg = (arcmin) => lunarHours(arcmin) * DEG_PER_HOUR
export const lunarLonNm = (arcmin, lat = 0) => lunarLonDeg(arcmin) * nmPerDegLon(lat)

/**
 * The penalty the method charges: arcminutes of longitude per arcminute of
 * measured angle. Because the hand is slow, a small error on the angle is a
 * large error on the time, and this is the factor by which. It is about 27, and
 * it is why a sextant good enough to give latitude to a mile gave longitude to
 * thirty — and why a clock won the moment one could be built.
 */
export const LUNAR_PENALTY = lunarLonDeg(1) * 60

/* ---- the same arithmetic, with light ----------------------------------- */

export const C = 299792458
/** Metres light covers in a nanosecond — 0.2998, near enough a foot. */
export const METRES_PER_NS = C * 1e-9
/** Range error from a clock error, in metres. */
export const rangeFromClock = (seconds) => seconds * C

/**
 * What relativity does to a satellite clock, microseconds a day. The orbit is
 * higher, which runs it fast, and faster-moving, which runs it slow; the first
 * wins. Published figures, not modelled here: about +45 from the gravitational
 * term and about −7 from the velocity term.
 */
export const GPS_GR_US_PER_DAY = 45
export const GPS_SR_US_PER_DAY = -7
export const GPS_NET_US_PER_DAY = GPS_GR_US_PER_DAY + GPS_SR_US_PER_DAY

/* ---- the clock as an unknown ------------------------------------------- */

/**
 * Where two circles of position cross.
 *
 * Satellite ranging is this and nothing more: a measured range from a known
 * place puts you on a circle (a sphere, in three dimensions). Two circles cross
 * at two points and a third picks between them — EXCEPT that the ranges are
 * measured with the receiver's own cheap clock, so they are all wrong by the
 * same amount, and the three circles do not meet anywhere at all.
 *
 * @returns {{x,y}[]} 0, 1 or 2 points
 */
export function circleCross(a, ra, b, rb) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const d = Math.hypot(dx, dy)
  if (d < 1e-9 || d > ra + rb || d < Math.abs(ra - rb)) return []
  const t = (ra * ra - rb * rb + d * d) / (2 * d)
  const h2 = ra * ra - t * t
  const h = h2 > 0 ? Math.sqrt(h2) : 0
  const mid = { x: a.x + (t * dx) / d, y: a.y + (t * dy) / d }
  const off = { x: (-dy * h) / d, y: (dx * h) / d }
  if (h === 0) return [mid]
  return [
    { x: mid.x + off.x, y: mid.y + off.y },
    { x: mid.x - off.x, y: mid.y - off.y }
  ]
}

/**
 * How badly three circles of position disagree, given a guess at the clock
 * error. `ranges` are the measured (pseudo-)ranges; `guess` is the correction
 * subtracted from every one of them, in the same units.
 *
 * Zero means they meet at a point. The function is the thing a receiver
 * minimises, and the minimum is the clock error — which is the idea the lesson
 * exists to land: your position comes out of the arithmetic, and so does the
 * time, and neither was known beforehand.
 */
export function disagreement(stations, ranges, guess = 0) {
  const r = ranges.map((v) => v - guess)
  if (r.some((v) => v <= 0)) return Infinity
  const pts = circleCross(stations[0], r[0], stations[1], r[1])
  if (pts.length === 0) return Infinity
  // Of the two crossings, the one that suits the third circle better.
  return Math.min(...pts.map((p) => Math.abs(Math.hypot(p.x - stations[2].x, p.y - stations[2].y) - r[2])))
}

/**
 * Solve three circles of position for the position AND the clock error, by
 * bisecting on the one number that makes them agree.
 *
 * Deliberately not a matrix solve. The whole point for a learner is that there
 * is exactly one correction that brings three disagreeing circles to a point,
 * so the code looks for that one number and reports it.
 *
 * @param {{x,y}[]} stations     three known places
 * @param {number[]} ranges      three measured ranges, all long by the same unknown
 * @param {number} span          how far to search either way
 * @returns {{at: {x,y}, clock: number, residual: number}|null}
 */
export function solveWithClock(stations, ranges, span = 2000) {
  let lo = -span
  let hi = span
  // Coarse scan first: the residual is not monotonic, so a bare bisection can
  // walk away from the minimum. 400 steps over the span, then refine.
  let best = { guess: 0, bad: disagreement(stations, ranges, 0) }
  const steps = 400
  for (let i = 0; i <= steps; i++) {
    const g = lo + ((hi - lo) * i) / steps
    const bad = disagreement(stations, ranges, g)
    if (bad < best.bad) best = { guess: g, bad }
  }
  let step = (hi - lo) / steps
  for (let k = 0; k < 60; k++) {
    const left = disagreement(stations, ranges, best.guess - step)
    const right = disagreement(stations, ranges, best.guess + step)
    if (left < best.bad) best = { guess: best.guess - step, bad: left }
    else if (right < best.bad) best = { guess: best.guess + step, bad: right }
    else step /= 2
  }
  const r = ranges.map((v) => v - best.guess)
  const pts = circleCross(stations[0], r[0], stations[1], r[1])
  if (pts.length === 0) return null
  const at = pts.reduce((p, q) => {
    const dp = Math.abs(Math.hypot(p.x - stations[2].x, p.y - stations[2].y) - r[2])
    const dq = Math.abs(Math.hypot(q.x - stations[2].x, q.y - stations[2].y) - r[2])
    return dq < dp ? q : p
  })
  return { at, clock: best.guess, residual: best.bad }
}

/* ---- aiming off -------------------------------------------------------- */

/** A seeded generator, so the same controls always draw the same scatter. */
export function random(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function gaussian(rng) {
  let u = 0
  while (u === 0) u = rng()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng())
}

/** The standard normal's tail, good to about 1e-7 — Zelen & Severo 26.2.17. */
export function phi(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2)
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 +
    t * (-1.821255978 + t * 1.330274429))))
  return z >= 0 ? 1 - p : p
}

/**
 * Walk from a known point to a feature that runs across your path — a stream, a
 * track, a wall — with a target on it: the bridge, the gate, the stile.
 *
 * `offset` is how far off you deliberately aim, in degrees. Aim straight (0)
 * and you arrive beside the target on a side you cannot know. Aim wide and you
 * arrive on a side you chose, and walk back along the feature to find it.
 *
 * Everything is in yards along the feature, measured from the target, positive
 * in the direction you aimed off.
 *
 * @param {object} o
 * @param {number} o.range   how far the feature is, yards
 * @param {number} o.sigma   how well you hold a bearing, degrees (one sigma)
 * @param {number} o.offset  the deliberate offset, degrees
 * @param {number} [o.n]     trials
 * @param {number} [o.seed]
 */
export function aimOff({ range, sigma, offset, n = 4000, seed = 7 }) {
  const rng = random(seed)
  let onSide = 0
  let walk = 0
  let extra = 0
  const landings = []
  for (let i = 0; i < n; i++) {
    const err = offset + gaussian(rng) * sigma
    const x = range * Math.tan(rad(err))
    landings.push(x)
    // You know which way to turn when you land on the side you aimed for.
    if (offset !== 0 && Math.sign(x) === Math.sign(offset)) onSide += 1
    walk += Math.abs(x)
    extra += range * (1 / Math.cos(rad(err)) - 1)
  }
  landings.sort((a, b) => a - b)
  const q = (p) => landings[Math.min(landings.length - 1, Math.floor(p * landings.length))]
  return {
    // Closed form, which the test checks the sampling against.
    pKnownSide: offset === 0 ? 0 : phi(Math.abs(offset) / sigma),
    sampledKnownSide: offset === 0 ? 0 : onSide / n,
    meanWalk: walk / n,
    p90Walk: Math.max(Math.abs(q(0.05)), Math.abs(q(0.95))),
    meanExtra: extra / n,
    /** How much feature you may have to search when the side is unknown. */
    blindSpan: 2 * Math.max(Math.abs(q(0.05)), Math.abs(q(0.95))),
    landings
  }
}

/**
 * The extra ground the leg itself costs when you aim off — range × (sec k − 1).
 * Tiny, and the reason the technique is nearly free: the hypotenuse of a long
 * thin triangle is barely longer than its long side.
 */
export const legCost = (range, offset) => range * (1 / Math.cos(rad(offset)) - 1)

/** The offset that leaves a `p` chance of landing on the side you chose. */
export const offsetFor = (sigma, p = 0.99) => {
  let lo = 0
  let hi = 20
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2
    if (phi(mid / sigma) < p) lo = mid
    else hi = mid
  }
  return (lo + hi) / 2
}

/* ---- planning a journey ------------------------------------------------ */

/**
 * Naismith's rule, 1892, as Lesson 23 had it: an hour for three miles, plus an
 * hour for every 2,000 feet of climb.
 */
export const naismith = (miles, feetUp = 0) => miles / 3 + feetUp / 2000

/**
 * The error cone along a planned route.
 *
 * Each leg contributes a box: `miles × tan(sigma)` across the line of travel
 * from not holding the bearing, and `miles × pace` along it from not measuring
 * the distance. The radius quoted is the half-diagonal of that box — the worst
 * corner, not the average miss — because a plan is made against the worst
 * corner.
 *
 * How the legs add is the week's last appearance of Lesson 22's distinction,
 * and it is worth a factor of root-n:
 *
 *   systematic  the errors all lean the same way (a mis-set declination, a
 *               pace calibrated on the wrong ground) so the radii simply add
 *   random      they are independent, so they add in quadrature
 *
 * A leg marked `fix` ends somewhere you can positively identify, and the cone
 * collapses to the quality of that fix — which is Week 5's whole contribution
 * to a day's walk.
 *
 * @param {{miles:number, feetUp?:number, fix?:boolean, name?:string}[]} legs
 * @param {{sigma:number, pace:number, fixRadius?:number, systematic?:boolean}} o
 */
export function cone(legs, { sigma, pace, fixRadius = 50, systematic = false }) {
  let carried = 0
  let hours = 0
  let miles = 0
  const out = []
  for (const leg of legs) {
    const yards = leg.miles * 1760
    const acrossYd = yards * Math.tan(rad(sigma))
    const alongYd = yards * pace
    const own = Math.hypot(acrossYd, alongYd)
    carried = systematic ? carried + own : Math.hypot(carried, own)
    hours += naismith(leg.miles, leg.feetUp ?? 0)
    miles += leg.miles
    const radius = leg.fix ? fixRadius : carried
    if (leg.fix) carried = fixRadius
    // `miles` stays the LEG's own length. The running totals are named, because
    // shadowing the leg's length with the cumulative one put "4 mi" on a label
    // beside a leg that is one mile long, and nothing but a screenshot caught it.
    out.push({ ...leg, acrossYd, alongYd, own, radius, hours, cumulativeMiles: miles })
  }
  return out
}

/** The last leg's radius — what a plan is judged on. */
export const endRadius = (rows) => (rows.length ? rows[rows.length - 1].radius : 0)

/* ---- weighing up evidence that disagrees -------------------------------- */

/** How far a point is from a line of position, or from a circle of position. */
export function missBy(shape, p) {
  if (shape.kind === 'circle') {
    return Math.abs(Math.hypot(p.x - shape.at.x, p.y - shape.at.y) - shape.r)
  }
  // A line through `at` along `bearing`, in sheet coordinates: y downward, so
  // the direction is (sin b, −cos b) and the normal is (cos b, sin b).
  const b = rad(shape.bearing)
  const nx = Math.cos(b)
  const ny = Math.sin(b)
  return Math.abs((p.x - shape.at.x) * nx + (p.y - shape.at.y) * ny)
}

/**
 * The point that fits several pieces of evidence best — least squares, found by
 * grid and refinement rather than by algebra, because the shapes are a mix of
 * lines and circles and the honest answer is "whatever is closest to all of
 * them".
 *
 * This is what a navigator does by eye when three position lines leave a
 * triangle, and it is the arithmetic behind Lesson 30's question: when four
 * measurements disagree, which one do you throw away?
 *
 * @param {object[]} shapes  {kind:'line', at, bearing} or {kind:'circle', at, r}
 * @param {{x,y}} near       where to start looking
 * @param {number} span      how far either way, in the same units
 */
export function fitShapes(shapes, near, span = 400) {
  if (!shapes.length) return null
  let best = { ...near }
  let bad = Infinity
  let step = span
  const cost = (p) => shapes.reduce((t, s) => t + missBy(s, p) ** 2, 0)
  for (let pass = 0; pass < 40; pass++) {
    let moved = false
    for (let i = -8; i <= 8; i++) {
      for (let j = -8; j <= 8; j++) {
        const p = { x: best.x + (i * step) / 8, y: best.y + (j * step) / 8 }
        const c = cost(p)
        if (c < bad - 1e-12) { bad = c; best = p; moved = true }
      }
    }
    if (!moved) step /= 2
    if (step < 1e-6) break
  }
  return { at: best, cost: bad, rms: Math.sqrt(bad / shapes.length) }
}

/* ---- the day Lesson 29 plans ------------------------------------------- */

/**
 * A day's circuit, in miles east and north of the bottom-left corner of the
 * plan. Seven legs and about eight and a half miles, visiting the five
 * landmarks Week 5's sheet established and coming back to camp.
 *
 * The positions are the authority and the leg lengths are derived from them, so
 * the plan on screen and the mileages in the copy cannot disagree — the mistake
 * that would otherwise be invisible, because a plan is a picture of a table.
 *
 * `up` is the climb on the leg ARRIVING at that point, in feet. The circuit
 * climbs a thousand feet in total, which is what makes Naismith's second term
 * worth half an hour.
 */
export const DAY_POINTS = [
  { id: 'camp', name: `Camp Heartwood`, e: 0.25, n: 0.30, up: 0 },
  { id: 'bridge', name: `the stone bridge`, e: 1.20, n: 0.75, up: 120 },
  { id: 'ford', name: `the ford`, e: 1.80, n: 0.30, up: 0 },
  { id: 'quarry', name: `the old quarry`, e: 2.70, n: 1.00, up: 260 },
  { id: 'rock', name: `Hollow Rock`, e: 3.30, n: 1.85, up: 310 },
  { id: 'tower', name: `the fire tower`, e: 2.35, n: 2.40, up: 180 },
  { id: 'pond', name: `Beaver Pond`, e: 0.95, n: 2.10, up: 40 },
  { id: 'home', name: `Camp Heartwood`, e: 0.25, n: 0.30, up: 90 }
]

/** A plan point as a drawing point: y runs downward, so bearings behave. */
export const planPoint = (p) => ({ x: p.e, y: -p.n })
export const planBearing = (from, to) => {
  const d = (Math.atan2(to.e - from.e, to.n - from.n) * 180) / Math.PI
  return ((d % 360) + 360) % 360
}
export const planDistance = (a, b) => Math.hypot(b.e - a.e, b.n - a.n)

/**
 * Lesson 30's problem. You set off from the fire tower for Beaver Pond and
 * drifted south of the line; you have three bearings and a pace count, and
 * they do not all agree. Which do you throw away?
 *
 * The three bearings carry a couple of degrees each, which is Week 2's honest
 * figure. The pace count is twelve per cent long, which is Lesson 23's honest
 * figure for a stride on broken ground — and crucially it is a BIAS, not a
 * wobble, which is why it disagrees with three things that are only wobbling.
 *
 * Returns the evidence, and what each way of discarding one piece produces.
 * The point of the exercise is that the best of the four is measurably best.
 */
export const CHALLENGE_TRUTH = { e: 1.90, n: 2.05 }
export const CHALLENGE_PACE_LONG = 0.12
/** Degrees of error on the three bearings, as taken. */
export const CHALLENGE_BEARING_ERRORS = [1.5, -1.0, 2.0]

export function challenge(truth = CHALLENGE_TRUTH, pacePct = CHALLENGE_PACE_LONG) {
  const by = (id) => DAY_POINTS.find((p) => p.id === id)
  const marks = [by('tower'), by('quarry'), by('pond')]
  const from = by('tower')
  const evidence = marks.map((mark, i) => ({
    id: ['tower', 'quarry', 'pond'][i],
    kind: 'line',
    mark,
    name: `the bearing to ${mark.name}`,
    truth: planBearing(truth, mark),
    observed: planBearing(truth, mark) + CHALLENGE_BEARING_ERRORS[i],
    range: planDistance(truth, mark)
  }))
  const trueRun = planDistance(from, truth)
  evidence.push({
    id: 'pace',
    kind: 'circle',
    mark: from,
    name: `the pace count from ${from.name}`,
    truth: trueRun,
    observed: trueRun * (1 + pacePct),
    range: trueRun
  })

  const shape = (e) => e.kind === 'circle'
    ? { kind: 'circle', at: planPoint(e.mark), r: e.observed }
    : { kind: 'line', at: planPoint(e.mark), bearing: e.observed }

  const fitOf = (keep) => {
    const f = fitShapes(keep.map(shape), planPoint(truth), 0.4)
    if (!f) return null
    const out = Math.hypot(f.at.x - truth.e, f.at.y + truth.n)
    return { at: f.at, rms: f.rms, milesOut: out, yardsOut: out * 1760 }
  }

  return {
    truth,
    evidence,
    all: fitOf(evidence),
    dropping: evidence.map((e) => ({
      drop: e.id,
      name: e.name,
      ...fitOf(evidence.filter((x) => x !== e))
    }))
  }
}

/** The circuit as legs, measured off the plan rather than asserted beside it. */
export function dayLegs(points = DAY_POINTS) {
  const out = []
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]
    const b = points[i]
    out.push({
      name: `${a.name} to ${b.name}`,
      from: a,
      to: b,
      miles: Math.hypot(b.e - a.e, b.n - a.n),
      feetUp: b.up ?? 0
    })
  }
  return out
}
