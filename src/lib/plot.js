// Plane geometry on a map sheet — Navigation, Week 5.
//
// Weeks 3 and 4 computed the sky, because the sky is not negotiable and the
// answers are published. Week 5 computes something smaller and much more
// useful: what happens to a position fix when the bearings that made it are
// each a degree or two wrong.
//
// That is worth computing rather than asserting, because the honest answers are
// counter-intuitive and the folklore is wrong in a specific, checkable way:
//
//   1. Two lines crossing at a shallow angle give a long thin fix. The error
//      goes as 1 / sin(cut angle), so a 20° cut is three times worse than a
//      60° one at the same range, and nothing about care or instrument quality
//      changes that.
//   2. The cocked hat — the little triangle three bearings leave — does NOT
//      contain your position most of the time. With three independent,
//      symmetric bearing errors it contains it one time in four. The derivation
//      is in plot.test.js and the simulation lets you watch it happen.
//
// CONVENTIONS, because mixing these up is the classic way to draw a line
// backwards. The sheet is SVG space: x increases to the right, y increases
// DOWNWARD, and map north is straight up the page (every Navigation map sheet
// is drawn to true north — see Lesson 10). A bearing is degrees clockwise from
// north. So the vector along bearing b is (sin b, −cos b), with the minus sign
// doing the work of y pointing the wrong way.
//
// A bearing you TAKE points from you to the landmark. The line you DRAW runs
// from the landmark back towards you, along the reciprocal. The two are 180°
// apart and the distinction matters: `intersect` takes observed bearings and
// handles the reversal itself, because doing it at each call site is how a fix
// ends up on the wrong side of the sheet.

/** The sheet Lesson 10 established, and its scale. 760 px across is 2 miles. */
export const SHEET = { w: 760, h: 560, pxPerMile: 380 }

export const YARDS_PER_MILE = 1760

/** The three landmarks of Lesson 10's sheet, in sheet coordinates. */
export const MARKS = [
  { id: 'tower', name: `The fire tower`, x: 596, y: 128 },
  { id: 'pond', name: `Beaver Pond`, x: 274, y: 132 },
  { id: 'rock', name: `Hollow Rock`, x: 614, y: 386 }
]

/**
 * The same sheet in Week 5, with two landmarks added.
 *
 * Lesson 10's three are all in front of the observer — the biggest gap between
 * their bearings is 205°, more than half the horizon — and that turns out to
 * matter enormously for a three-bearing fix. So the ford and the old quarry are
 * added behind, and the learner can choose a trio that surrounds them or one
 * that does not, and watch the difference. The two new marks sit at nearly the
 * same range as the old three (about 1,000 yards), so that spread is the only
 * thing changing when the choice changes.
 */
export const WEEK5_MARKS = [
  ...MARKS,
  { id: 'quarry', name: `The old quarry`, x: 477, y: 513 },
  { id: 'ford', name: `The ford`, x: 207, y: 357 }
]

/**
 * Where the learner is standing in Week 5 — and, for the first time in the
 * course, a position they do not know. Weeks 1 to 4 always told them; this week
 * the whole exercise is to recover it from bearings. The simulation knows it
 * because it has to measure the error, and the readouts never show it until the
 * learner asks.
 */
export const YOU = { x: 420, y: 300 }

export const markById = (id, from = WEEK5_MARKS) => from.find((m) => m.id === id)

/** Mid-sentence, "The fire tower" wants a small t — "Beaver Pond" does not. */
export const midSentence = (name) => (name.startsWith('The ') ? `t${name.slice(1)}` : name)

const rad = (d) => (d * Math.PI) / 180
const deg = (r) => (r * 180) / Math.PI

export const norm = (d) => ((d % 360) + 360) % 360
export const brg = (d) => String(Math.round(norm(d)) % 360).padStart(3, '0')

/** Smallest angle between two bearings, signed, −180 to 180. */
export const delta = (a, b) => { const d = norm(a - b); return d > 180 ? d - 360 : d }

export const px = { toYards: (p) => (p / SHEET.pxPerMile) * YARDS_PER_MILE }
export const miles = (p) => p / SHEET.pxPerMile
export const yards = (p) => px.toYards(p)

/** Pixels per yard, for drawing a measured distance. */
export const fromYards = (y) => (y / YARDS_PER_MILE) * SHEET.pxPerMile

/** Bearing from one sheet point to another, degrees true. */
export const bearing = (from, to) => norm(deg(Math.atan2(to.x - from.x, from.y - to.y)))

export const distance = (a, b) => Math.hypot(b.x - a.x, b.y - a.y)

/** The point `d` pixels from `p` along bearing `b`. */
export const along = (p, b, d) => ({
  x: p.x + Math.sin(rad(b)) * d,
  y: p.y - Math.cos(rad(b)) * d
})

/**
 * Where two position lines cross.
 *
 * Each argument is a landmark and the bearing OBSERVED to it from the unknown
 * position. The drawn line runs back from the landmark along the reciprocal,
 * which this handles, so callers pass what the compass said.
 *
 * Returns null when the lines are parallel or very nearly so — which is a real
 * case, not a defensive one: two bearings to things in the same direction give
 * no fix at all, and the simulation has to say so rather than draw a point
 * somewhere off the sheet.
 */
export function intersect(markA, observedA, markB, observedB) {
  const ua = { x: Math.sin(rad(observedA)), y: -Math.cos(rad(observedA)) }
  const ub = { x: Math.sin(rad(observedB)), y: -Math.cos(rad(observedB)) }
  const den = ua.x * ub.y - ua.y * ub.x
  if (Math.abs(den) < 1e-9) return null

  // markA + t·ua = markB + s·ub, solved for t. Direction, not reciprocal:
  // the line is the same line either way round, so the sign of u is free.
  const dx = markB.x - markA.x
  const dy = markB.y - markA.y
  const t = (dx * ub.y - dy * ub.x) / den
  return { x: markA.x + t * ua.x, y: markA.y + t * ua.y }
}

/**
 * The angle at which two position lines cross, 0 to 90. This is the single
 * number that decides whether a fix is tight or long and thin, and it is a
 * property of where the landmarks are, not of how carefully you worked.
 */
export const cut = (observedA, observedB) => {
  const d = Math.abs(delta(observedA, observedB)) % 180
  return d > 90 ? 180 - d : d
}

/**
 * The three vertices of the cocked hat: the pairwise crossings of three
 * position lines. Any pair may be parallel, so a vertex may be null.
 *
 * @param {{mark: object, observed: number}[]} lines  exactly three
 */
export function cockedHat(lines) {
  const pairs = [[0, 1], [1, 2], [2, 0]]
  return pairs.map(([i, j]) =>
    intersect(lines[i].mark, lines[i].observed, lines[j].mark, lines[j].observed))
}

/** Twice the signed area of a triangle — the sign says which way it is wound. */
const cross2 = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)

export function area(triangle) {
  if (triangle.some((p) => !p)) return null
  const [a, b, c] = triangle
  return Math.abs(cross2(a, b, c)) / 2
}

/** Is a point inside a triangle? Edges count as inside; the measure is zero. */
export function inside(point, triangle) {
  if (!point || triangle.some((p) => !p)) return false
  const [a, b, c] = triangle
  const s1 = cross2(a, b, point)
  const s2 = cross2(b, c, point)
  const s3 = cross2(c, a, point)
  return (s1 >= 0 && s2 >= 0 && s3 >= 0) || (s1 <= 0 && s2 <= 0 && s3 <= 0)
}

/**
 * Take bearings from a true position to each of several landmarks, each with a
 * given error added. The errors are in degrees and are the caller's business —
 * the test suite feeds it every sign combination, the simulation feeds it
 * samples from a seeded generator.
 *
 * @returns {{mark: object, truth: number, observed: number, range: number}[]}
 */
export function sight(truePosition, marks, errors = []) {
  return marks.map((mark, i) => {
    const truth = bearing(truePosition, mark)
    return {
      mark,
      truth,
      observed: norm(truth + (errors[i] ?? 0)),
      range: distance(truePosition, mark)
    }
  })
}

/**
 * How far a bearing error of `error` degrees moves the position line sideways
 * at range `range`. This is the whole arithmetic of plotting error and it is
 * one multiplication: the line pivots on the landmark, so the miss grows with
 * the distance to it.
 */
export const across = (range, error) => range * Math.tan(rad(Math.abs(error)))

/* ---- dead reckoning ----------------------------------------------------- */

/**
 * Carry a position forward over a series of legs.
 *
 * Each leg is a course steered and a time run at a speed. Two tracks come out:
 * the one you would PLOT, from what you intended, and the one you actually
 * MADE, with a steering bias and a current added. The gap between their ends is
 * the thing Lesson 24 is about, and it grows with distance run, not with time
 * elapsed — a point the copy has to get right, since a boat held still by a
 * foul tide accumulates error all the same.
 *
 * @param {{x:number,y:number}} start
 * @param {{course:number, speed:number, hours:number}[]} legs  speed in mph
 * @param {{bias?:number, set?:number, drift?:number}} [error]
 *   bias   degrees added to every steered course (a consistent lean)
 *   set    the direction the current flows TOWARDS, degrees true
 *   drift  its speed, mph
 */
export function reckon(start, legs, error = {}) {
  const { bias = 0, set = 0, drift = 0 } = error
  const plotted = [{ ...start }]
  const made = [{ ...start }]

  for (const leg of legs) {
    const run = leg.speed * leg.hours * SHEET.pxPerMile
    const pushed = drift * leg.hours * SHEET.pxPerMile

    plotted.push(along(plotted[plotted.length - 1], leg.course, run))
    const steered = along(made[made.length - 1], norm(leg.course + bias), run)
    made.push(along(steered, set, pushed))
  }

  const end = { plotted: plotted[plotted.length - 1], made: made[made.length - 1] }
  return {
    plotted,
    made,
    gap: distance(end.plotted, end.made),
    bearingOfGap: bearing(end.plotted, end.made),
    run: legs.reduce((t, l) => t + l.speed * l.hours, 0)
  }
}

/* ---- measuring distance on the ground ----------------------------------- */

/**
 * What a pace count says you have walked.
 *
 * `calibration` is the pace length you measured on a flat, known course, in
 * yards per double-pace. `actual` is what your pace is really doing out here —
 * shorter uphill, shorter when tired, shorter in deep ground. A pace count is
 * precise and biased: it will give you the same wrong answer every time, which
 * is why the error is a percentage of the distance and not a fixed margin.
 */
export const paced = (count, calibration) => count * calibration

export const paceError = (count, calibration, actual) =>
  Math.abs(count * calibration - count * actual)

/**
 * Naismith's rule, 1892: an hour for every three miles, plus an hour for every
 * 2,000 feet of ascent. Still the standard planning estimate on British hills,
 * and still, as every walker discovers, optimistic for a tired party.
 */
export const naismith = (milesFlat, feetUp) => milesFlat / 3 + feetUp / 2000

/** A seeded generator, so a simulation redraws the same sample on re-render. */
export function random(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Two normal deviates from a uniform generator, Box–Muller. */
export function gaussian(rng) {
  let u = 0
  while (u === 0) u = rng()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng())
}
