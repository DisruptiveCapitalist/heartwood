// Reading the natural world — Navigation, the optional Field Week.
//
// Six weeks of this course taught instruments: a compass, the Sun, the stars,
// a map, a clock. This week is the other half of the subject, and it is the
// half that has to be taught carefully, because almost everything popularly
// said about it is wrong in the same way. "Moss grows on the north side."
// "Follow a stream and you will come out somewhere." "The prevailing wind is
// westerly, so the flagged trees point east."
//
// Every one of those takes a clue about CONDITIONS and reads it as a clue
// about DIRECTION, and the arithmetic here exists to show how much that costs.
//
// A WARNING ABOUT WHAT IS MEASURED AND WHAT IS MODELLED, because this file
// mixes the two more than any other in the project and the lessons must not:
//
//   MEASURED, in the sense the rest of the course means it — a consequence of
//   geometry or arithmetic that would be the same for anybody who worked it
//   out. The convergence of survey meridians. The yards an angular error costs
//   per mile. How the flow direction of ice spreading from a dome varies from
//   site to site. The behaviour of water on a height field. The statistics of
//   reading one tree when you know the odds.
//
//   MODELLED — a simplification of something far more complicated, chosen
//   because it is the first-order truth and labelled wherever it is used.
//   Valley channelling of wind is a model. The height field is invented
//   terrain. The moss probabilities are the learner's assumption, not a
//   measurement of any wood anywhere, and the simulation says so on screen.
//
// The lessons must never present the second kind as the first. What IS honest
// about the modelled parts is the conclusion drawn from them, because the
// conclusion is about the inference and not about the moss: if you grant the
// assumption, here is what follows — and what follows is that the clue is far
// weaker than the folklore claims even when the folklore's premise is granted.

const rad = (d) => (d * Math.PI) / 180
const deg = (r) => (r * 180) / Math.PI
export const norm = (d) => ((d % 360) + 360) % 360
/** Smallest angle between two bearings, signed, −180 to 180. */
export const delta = (a, b) => { const d = norm(a - b); return d > 180 ? d - 360 : d }
export const brg = (d) => String(Math.round(norm(d)) % 360).padStart(3, '0')

export const YARDS_PER_MILE = 1760

/**
 * THE SMALL-ANGLE RULE, and it is only that.
 *
 * `d · tan θ` is the course's oldest arithmetic, from Lesson 7: it is how far
 * off the line you are once you have made `d` of FORWARD progress, and for the
 * degree or two a compass is wrong by it is the right number — about 31 yards
 * a mile per degree.
 *
 * It is the wrong number for a large angle, and Design caught this course
 * using it that way. Walk a mile on a bearing sixty degrees off and you have
 * walked a mile, not two: the honest question is how far you finish from where
 * you meant to be, and that is `strayedBy` below. At 60° this function says
 * 3,048 yards and the truth is 1,760.
 *
 * Kept, because the small-angle form is what Lessons 7, 29 and 35 mean, and
 * because `tan` is the right function when the forward distance is what is
 * fixed — a position line pivoting on a landmark, a survey line held for a
 * measured easting. Not to be used above about ten degrees.
 */
export const yardsOff = (miles, degrees) => miles * YARDS_PER_MILE * Math.tan(rad(Math.abs(degrees)))

/**
 * How far you finish from where you meant to be, having walked `miles` on a
 * bearing `degrees` off the one you wanted.
 *
 * Both of you walked the same distance, so the two endpoints and the start
 * make an isosceles triangle and the gap is its base: 2 d sin(θ/2). This is
 * correct at every angle, and it tends to the same 31 yards a mile per degree
 * as θ gets small, which is why the old rule works where it works.
 *
 * At sixty degrees the triangle is equilateral, so you finish exactly as far
 * from your destination as you walked — a mile off, after a mile. That is a
 * better sentence than the one this course had, and it has the merit of being
 * true.
 */
export const strayedBy = (miles, degrees) =>
  2 * miles * YARDS_PER_MILE * Math.sin(rad(Math.abs(degrees)) / 2)

/* ---- wind: a local fact (Lesson 31) ----------------------------------- */

/**
 * Wind in a valley, as a MODEL and not a measurement.
 *
 * Real airflow over real terrain needs a mesoscale model and a supercomputer.
 * What is true at first order, and is what the lesson is about, is channelling:
 * a valley will not let air cross it, so the across-valley component of the
 * wind is suppressed and the along-valley component survives. The air leaves
 * the valley going the way the valley goes, at a speed reduced by the cosine
 * of the angle it came in at.
 *
 * So the wind you FEEL in a valley is a fact about the valley. Reading it as
 * the prevailing wind is the error this lesson exists to prevent, and the
 * deflection returned here is the size of that error in degrees.
 *
 * @param {number} windFrom     the free-air wind, degrees it blows FROM
 * @param {number} valleyAxis   the valley's line, either of its two directions
 * @param {number} [speed]
 */
export function channelled(windFrom, valleyAxis, speed = 10) {
  // The direction the free air is GOING, as a unit vector (east, north).
  const to = norm(windFrom + 180)
  const v = { e: Math.sin(rad(to)), n: Math.cos(rad(to)) }
  // The valley's two directions. The air takes whichever it already favours.
  const a = { e: Math.sin(rad(valleyAxis)), n: Math.cos(rad(valleyAxis)) }
  const along = v.e * a.e + v.n * a.n
  const goes = along >= 0 ? valleyAxis : norm(valleyAxis + 180)
  const from = norm(goes + 180)
  return {
    from,
    goes,
    speed: speed * Math.abs(along),
    /** How wrong you are if you read the valley's wind as the prevailing one. */
    deflection: Math.abs(delta(from, windFrom)),
    /** Nothing survives when the wind is square to the valley. */
    stalled: Math.abs(along) < 0.02
  }
}

/**
 * A wind-flagged tree flags DOWNWIND: the crown is pushed and the branches
 * grow away from the weather, so the flag points the way the wind is going,
 * not the way it comes from. Reading it backwards is a 180° error, which is
 * the largest mistake available anywhere in this course.
 */
export const flagPoints = (windFrom) => norm(windFrom + 180)

/**
 * The lake or sea breeze, and the reason a shore is the worst possible place
 * to take wind for a compass. Land heats faster than water by day and cools
 * faster by night, so the breeze blows onshore in the afternoon and offshore
 * before dawn. Not a model: a reversal, twice a day, of exactly 180°.
 *
 * @param {number} towardsWater  bearing from the shore out over the water
 * @param {boolean} day
 */
export const lakeBreeze = (towardsWater, day) =>
  day ? norm(towardsWater) : norm(towardsWater + 180)

/* ---- water: the shape of the ground (Lesson 32) ------------------------ */

export const GRID = { w: 96, h: 72, yardsPerCell: 110 }

/**
 * Invented terrain, and deliberately so: a height field with the three things
 * Lesson 32 has to show. A main valley whose stream bends through most of the
 * compass; two slopes of opposite aspect for Lesson 33; and a closed hollow
 * with no outlet, so that "follow the water downhill and you will come out
 * somewhere" ends in a swamp, which is the safety point the Field Guide's
 * Chapter 18 insists on.
 *
 * Analytic rather than random, so the same ground is there every time and the
 * contours, the streams and the cross-section cannot disagree with each other.
 */
export function heights({ w, h } = GRID) {
  const z = new Float64Array(w * h)
  const bump = (x, y, cx, cy, rx, ry, amp) => {
    const dx = (x - cx) / rx
    const dy = (y - cy) / ry
    return amp * Math.exp(-(dx * dx + dy * dy))
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // A regional tilt that dominates the relief, so the water actually goes
      // somewhere: about 900 feet in the north-west down to 630 in the
      // south-east, which is forty feet a mile — ordinary Ohio.
      let v = 900 - (x / w) * 210 - (y / h) * 60
      // Ridges and spurs, modest against that tilt so they bend the drainage
      // rather than damming it.
      v += bump(x, y, 26, 10, 40, 13, 120)
      v += bump(x, y, 80, 16, 22, 15, 90)
      v += bump(x, y, 16, 44, 15, 18, 80)
      v += bump(x, y, 58, 58, 26, 14, 95)
      v += bump(x, y, 88, 54, 16, 20, 70)
      // One hollow with no way out. It has to be deeper than the tilt across
      // its own width, or it would simply drain downhill like everything
      // else — which is why a closed basin is a thing you notice on a map.
      v -= bump(x, y, 44, 40, 8, 7, 150)
      z[y * w + x] = v
    }
  }
  return z
}

const NEIGHBOURS = [
  [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]
]

/**
 * Steepest-descent flow, one of eight directions per cell — the D8 scheme
 * every drainage model starts from. A cell with no lower neighbour is a sink,
 * and sinks are not an artefact to be filled away here: one of them is the
 * swamp the lesson is about.
 *
 * @returns {Int8Array} index into NEIGHBOURS, or -1 for a sink
 */
export function downhill(z, { w, h } = GRID) {
  const dir = new Int8Array(w * h).fill(-1)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x
      let best = 0
      let pick = -1
      for (let k = 0; k < 8; k++) {
        const nx = x + NEIGHBOURS[k][0]
        const ny = y + NEIGHBOURS[k][1]
        const run = NEIGHBOURS[k][0] && NEIGHBOURS[k][1] ? Math.SQRT2 : 1
        // Off the sheet is downhill. Skipping out-of-bounds neighbours instead
        // made the border a dam: water arriving at the edge could not leave,
        // so it ran ALONG it, and the longest "stream" on this sheet turned
        // out to be mostly the paper's own border. That inflated the lesson's
        // headline — 225° of wander and 8.4 miles — with an artefact of the
        // grid. A real sheet is a window on country that continues.
        const zn = nx < 0 || ny < 0 || nx >= w || ny >= h ? -Infinity : z[ny * w + nx]
        const slope = (z[i] - zn) / run
        if (slope > best) { best = slope; pick = k }
      }
      dir[i] = pick
    }
  }
  return dir
}

/** Where a cell's water goes next, or -1 if it leaves the sheet or stops. */
export function flowsTo(dir, i, { w, h } = GRID) {
  const k = dir[i]
  if (k < 0) return -1
  const x = i % w
  const y = (i / w) | 0
  const nx = x + NEIGHBOURS[k][0]
  const ny = y + NEIGHBOURS[k][1]
  if (nx < 0 || ny < 0 || nx >= w || ny >= h) return -1
  return ny * w + nx
}

/** How many cells drain through each cell. One unit of rain on every cell. */
export function accumulate(dir, { w, h } = GRID) {
  const acc = new Float64Array(w * h).fill(1)
  const order = Array.from({ length: w * h }, (_, i) => i)
  // Process from high ground down, which for a D8 field means sorting by how
  // many steps a cell is from a sink. Counting in-degree and peeling is
  // simpler and exact.
  const indeg = new Int32Array(w * h)
  for (let i = 0; i < w * h; i++) {
    const j = flowsTo(dir, i, { w, h })
    if (j >= 0) indeg[j] += 1
  }
  const queue = order.filter((i) => indeg[i] === 0)
  for (let qi = 0; qi < queue.length; qi++) {
    const i = queue[qi]
    const j = flowsTo(dir, i, { w, h })
    if (j < 0) continue
    acc[j] += acc[i]
    if (--indeg[j] === 0) queue.push(j)
  }
  return acc
}

/** Follow the water from a cell until it stops. Returns the cells it crosses. */
export function trace(dir, start, { w, h } = GRID) {
  const path = [start]
  const seen = new Set([start])
  let i = start
  for (let step = 0; step < w * h; step++) {
    const j = flowsTo(dir, i, { w, h })
    if (j < 0) break
    i = j
    if (seen.has(i)) break
    seen.add(i)
    path.push(i)
  }
  return path
}

/** Every cell whose water passes through `outlet`, including it. */
export function basin(dir, outlet, { w, h } = GRID) {
  const into = new Map()
  for (let i = 0; i < w * h; i++) {
    const j = flowsTo(dir, i, { w, h })
    if (j < 0) continue
    if (!into.has(j)) into.set(j, [])
    into.get(j).push(i)
  }
  const out = new Set([outlet])
  const stack = [outlet]
  while (stack.length) {
    for (const up of into.get(stack.pop()) ?? []) {
      if (!out.has(up)) { out.add(up); stack.push(up) }
    }
  }
  return out
}

/** Is this cell a sink — water arrives and does not leave? */
export const isSink = (dir, i) => dir[i] < 0

/**
 * A cell on the edge of the sheet. The distinction matters and the lesson
 * turns on it: water that reaches the edge has left the map and may well
 * reach a road, while water that stops in a hollow in the middle of the sheet
 * has stopped, and so will you. Since the edge now drains off, a walk that
 * ends on one ended because the paper did.
 */
export const isEdge = (i, { w, h } = GRID) =>
  i % w === 0 || i % w === w - 1 || (i / w | 0) === 0 || (i / w | 0) === h - 1

/** A sink that is not simply the edge of the paper: a closed basin. */
export const isHollow = (dir, i, grid = GRID) => isSink(dir, i) && !isEdge(i, grid)

/** The bearing from one grid cell to another. Grid y runs south. */
export function cellBearing(a, b, { w } = GRID) {
  const ax = a % w
  const ay = (a / w) | 0
  const bx = b % w
  const by = (b / w) | 0
  return norm(deg(Math.atan2(bx - ax, ay - by)))
}

/**
 * How much a watercourse wanders, in degrees of bearing, sampled along its
 * length. The number Lesson 32 is built on: a stream has no direction, it has
 * a sequence of directions, and the average of them is not a fact about
 * anything.
 */
export function wander(path, step = 6, grid = GRID) {
  const legs = []
  for (let i = 0; i + step < path.length; i += step) {
    legs.push(cellBearing(path[i], path[i + step], grid))
  }
  // A path too short for two legs has not wandered, but it still has a
  // direction, and a caller printing `from` must not be handed undefined.
  if (legs.length === 0) return { legs, spread: 0, from: null, to: null }
  if (legs.length === 1) return { legs, spread: 0, from: legs[0], to: legs[0] }
  // The spread of a set of bearings is not max minus min — it is the smallest
  // arc that contains them all, which has to be found by trying each start.
  let spread = 360
  let at = legs[0]
  for (const start of legs) {
    const widest = Math.max(...legs.map((b) => norm(b - start)))
    if (widest < spread) { spread = widest; at = start }
  }
  return { legs, spread, from: at, to: norm(at + spread) }
}

/* ---- living signs: what one tree can tell you (Lesson 33) -------------- */

export function random(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * A moss survey, under an assumption the learner sets and the screen states.
 *
 * `pNorth` and `pSouth` are the chance of moss on each side of a trunk in this
 * habitat. They are NOT a measurement of any wood: they are the premise, and
 * the premise is generous to the folklore — it grants that the shaded side is
 * genuinely favoured. What the arithmetic then shows is how little that buys
 * you on a single tree, which is the only form in which anybody ever uses the
 * rule.
 *
 * A tree with moss on both sides, or on neither, says nothing at all. Only the
 * one-sided trees carry any information, and some of those point the wrong way.
 */
export function mossSurvey({ pNorth, pSouth, n = 40, seed = 11 }) {
  const rng = random(seed)
  let both = 0
  let neither = 0
  let northOnly = 0
  let southOnly = 0
  const trees = []
  for (let i = 0; i < n; i++) {
    const north = rng() < pNorth
    const south = rng() < pSouth
    if (north && south) both += 1
    else if (!north && !south) neither += 1
    else if (north) northOnly += 1
    else southOnly += 1
    trees.push({ north, south })
  }
  const informative = northOnly + southOnly
  return {
    n,
    trees,
    both,
    neither,
    northOnly,
    southOnly,
    informative,
    /** Of the trees that say anything, the share that say the right thing. */
    rightWay: informative ? northOnly / informative : null,
    /** And the share of ALL trees that both speak and are right. */
    useful: northOnly / n
  }
}

/** The same thing exactly, without sampling — what the premise implies. */
export function mossOdds(pNorth, pSouth) {
  const northOnly = pNorth * (1 - pSouth)
  const southOnly = pSouth * (1 - pNorth)
  const informative = northOnly + southOnly
  return {
    both: pNorth * pSouth,
    neither: (1 - pNorth) * (1 - pSouth),
    northOnly,
    southOnly,
    informative,
    rightWay: informative ? northOnly / informative : null
  }
}

/* ---- rock and snow: a local force (Lesson 34) -------------------------- */

/**
 * Ice spreading from a dome flows outward, so the direction it scratches into
 * the rock at a site is the bearing from the dome to that site — not north,
 * and not the same at the next site along.
 *
 * Geometry, not a glaciological model: a real ice sheet is steered by the
 * ground, splits around high country into lobes, and changes over time, which
 * is exactly why the lesson's caution says regional context is required. The
 * two Ohio sublobes are named because the split itself is documented.
 */
export function iceFlow(dome, site) {
  const de = site.e - dome.e
  const dn = site.n - dome.n
  return norm(deg(Math.atan2(de, dn)))
}

/** How far apart two sites' striations point, in degrees. */
export const flowSpread = (dome, a, b) => Math.abs(delta(iceFlow(dome, a), iceFlow(dome, b)))

/**
 * Snow builds where the wind drops it — on the LEE side of whatever broke the
 * flow. So a drift or a cornice records the local wind of the storm that made
 * it, which Lesson 31 has already shown is not the prevailing wind. Two
 * inferences deep, and each one loses you something.
 */
export const driftOn = (windFrom) => norm(windFrom + 180)

/* ---- the land people left (Lesson 35) ---------------------------------- */

export const SECTION_MILES = 1
export const SECTIONS_PER_TOWNSHIP = 36
export const TOWNSHIP_MILES = 6
/** Miles in a degree of latitude, the figure Lesson 3 used. */
export const MILES_PER_DEGREE = 69.17

/**
 * How much the meridians close over a given easting, in degrees.
 *
 * This is why a rectangular survey cannot tile the Earth, why the Public Land
 * Survey has correction lines, and — for this lesson — how good a section-line
 * road is as a compass. Over one township at Ohio's latitude it is a few
 * minutes of arc, which is a far better north than any compass in this course.
 */
export function convergence(latitude, eastMiles) {
  const dLon = eastMiles / (MILES_PER_DEGREE * Math.cos(rad(latitude)))
  return dLon * Math.sin(rad(latitude))
}

/**
 * Boundaries run by metes and bounds, which is how the Virginia Military
 * District was laid out: each line follows the ground — a stream, a ridge, a
 * marked tree, the edge of an earlier claim. The bearings that result are not
 * random, they are the landscape's, but from a traveller's point of view the
 * difference does not matter: they carry no agreed direction, so a road built
 * on them says nothing about north.
 *
 * Generated from the water on the Lesson 32 height field where possible, so
 * that the irregular tract and the drainage are the same ground.
 */
export function metesBearings(n = 24, seed = 5) {
  const rng = random(seed)
  return Array.from({ length: n }, () => norm(rng() * 360))
}

/**
 * The expected error, in degrees, of taking one boundary of a given system to
 * be north. A grid gives you the convergence; metes and bounds give you the
 * average of a uniform circle, which is ninety degrees — the formal way of
 * saying it tells you nothing.
 */
export const expectedError = (bearings) => {
  if (!bearings.length) return 90
  const best = bearings.map((b) => {
    const toCardinal = [0, 90, 180, 270].map((c) => Math.abs(delta(b, c)))
    return Math.min(...toCardinal)
  })
  return best.reduce((t, v) => t + v, 0) / best.length
}

/* ---- measuring height with a compass (Lesson 36, Chapter 14) ----------- */

/**
 * The clinometer sum, and the only place in this subject where standing in
 * the right spot makes the arithmetic disappear.
 *
 * Height above eye level is the horizontal distance times the tangent of the
 * vertical angle. Everything interesting is in how the answer goes wrong.
 */
export const ASSUMED_EYE_FEET = 5.5

export const heightAboveEye = (distance, angle) => distance * Math.tan(rad(angle))

/** The whole object, eye height included — which is the commonest omission. */
export const objectHeight = (distance, angle, eye = ASSUMED_EYE_FEET) =>
  heightAboveEye(distance, angle) + eye

/**
 * On sloping ground the base of the object is not at your eye level, so one
 * angle is not enough: sight the top AND the base, and add the two tangents.
 * Ignoring the down-angle to a base below you UNDERSTATES the height by
 * `distance × tan(down)`, every time, in the same direction — a bias, in
 * Lesson 22's sense, not a wobble.
 */
export const heightBothAngles = (distance, up, down) =>
  distance * (Math.tan(rad(up)) + Math.tan(rad(down)))

/** The same instrument turned round: a known height gives a distance. */
export const distanceFromHeight = (height, angle) => height / Math.tan(rad(angle))

/**
 * How much a degree of sighting error costs, as a fraction of the answer.
 *
 * Differentiating d·tan θ gives d·sec²θ, and dividing by the height itself
 * leaves δθ / (sin θ cos θ), which is 2δθ / sin 2θ. That function has a
 * minimum at forty-five degrees and climbs steeply at both ends — and it is
 * the same expression for a distance taken from a known height, because the
 * two are the same sum inverted.
 *
 * The practical consequence is the lesson: walk until the top of the thing is
 * at forty-five degrees. That is where the sighting error costs least AND
 * where the height above your eye is simply the distance you walked, so there
 * is no tangent to look up at all.
 */
export const BEST_ANGLE = 45
export const angleSensitivity = (angle, degError = 1) =>
  (2 * rad(degError)) / Math.sin(2 * rad(angle))

/**
 * The two errors together, as fractions: pacing is proportional and goes
 * straight through, sighting is proportional and depends on where you stood.
 * Independent, so they add in quadrature — Lesson 29's rule.
 */
export const heightError = (angle, degError, pace) =>
  Math.hypot(pace, angleSensitivity(angle, degError))

/** What forgetting your eye height costs, as a fraction of the true height. */
export const eyeOmission = (distance, angle, eye = ASSUMED_EYE_FEET) =>
  eye / objectHeight(distance, angle, eye)
