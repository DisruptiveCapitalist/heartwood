// Where the stars are, for Navigation Week 4.
//
// Same rule as Week 3: if a thing can be computed to better than the lesson
// needs, compute it, and check the computation against something published.
// Precession can. So the catalogue below holds J2000 positions — the standard
// epoch every star atlas uses — and everything else is derived.
//
// Positions are from the Hipparcos catalogue as reproduced in the Yale Bright
// Star Catalogue (5th revised edition, Hoffleit & Warren, 1991) and the
// Astronomical Almanac's list of navigational stars.
//
// Conventions, stated once:
//
//   right ascension  degrees, 0 to 360 (not hours — converted on the way in)
//   declination      degrees, north positive. The SKY's declination, nothing
//                    whatever to do with the magnetic declination of Lesson 7
//   latitude         degrees, north positive
//   azimuth          degrees clockwise from true north
//   altitude         degrees above the true horizon
//   hour angle       degrees, 0 on the meridian, negative to the east

import { julianDay } from './sun.js'

const rad = (d) => (d * Math.PI) / 180
const deg = (r) => (r * 180) / Math.PI
const hms = (h, m, s) => (h + m / 60 + s / 3600) * 15
const dms = (sign, d, m, s) => sign * (d + m / 60 + s / 3600)

/**
 * The stars this course uses, at J2000.
 *
 * Deliberately short. A navigator needs a handful of patterns they can find
 * from a car park, not a catalogue — and every star here earns its place by
 * being part of a method the lessons actually teach.
 */
export const STARS = {
  polaris:    { name: `Polaris`, ra: hms(2, 31, 49.09), dec: dms(+1, 89, 15, 50.8), mag: 1.98, group: 'pole' },
  dubhe:      { name: `Dubhe`, ra: hms(11, 3, 43.67), dec: dms(+1, 61, 45, 3.7), mag: 1.79, group: 'dipper' },
  merak:      { name: `Merak`, ra: hms(11, 1, 50.48), dec: dms(+1, 56, 22, 56.7), mag: 2.37, group: 'dipper' },
  phecda:     { name: `Phecda`, ra: hms(11, 53, 49.85), dec: dms(+1, 53, 41, 41.1), mag: 2.44, group: 'dipper' },
  megrez:     { name: `Megrez`, ra: hms(12, 15, 25.56), dec: dms(+1, 57, 1, 57.4), mag: 3.31, group: 'dipper' },
  alioth:     { name: `Alioth`, ra: hms(12, 54, 1.75), dec: dms(+1, 55, 57, 35.4), mag: 1.77, group: 'dipper' },
  mizar:      { name: `Mizar`, ra: hms(13, 23, 55.54), dec: dms(+1, 54, 55, 31.3), mag: 2.27, group: 'dipper' },
  alkaid:     { name: `Alkaid`, ra: hms(13, 47, 32.44), dec: dms(+1, 49, 18, 47.8), mag: 1.86, group: 'dipper' },

  schedar:    { name: `Schedar`, ra: hms(0, 40, 30.44), dec: dms(+1, 56, 32, 14.4), mag: 2.24, group: 'cassiopeia' },
  caph:       { name: `Caph`, ra: hms(0, 9, 10.69), dec: dms(+1, 59, 8, 59.2), mag: 2.28, group: 'cassiopeia' },
  gamma_cas:  { name: `Navi`, ra: hms(0, 56, 42.53), dec: dms(+1, 60, 43, 0.3), mag: 2.47, group: 'cassiopeia' },
  ruchbah:    { name: `Ruchbah`, ra: hms(1, 25, 48.95), dec: dms(+1, 60, 14, 7.0), mag: 2.68, group: 'cassiopeia' },
  segin:      { name: `Segin`, ra: hms(1, 54, 23.73), dec: dms(+1, 63, 40, 12.4), mag: 3.35, group: 'cassiopeia' },

  acrux:      { name: `Acrux`, ra: hms(12, 26, 35.9), dec: dms(-1, 63, 5, 56.7), mag: 0.76, group: 'crux' },
  gacrux:     { name: `Gacrux`, ra: hms(12, 31, 9.96), dec: dms(-1, 57, 6, 47.6), mag: 1.59, group: 'crux' },
  mimosa:     { name: `Mimosa`, ra: hms(12, 47, 43.27), dec: dms(-1, 59, 41, 19.4), mag: 1.25, group: 'crux' },
  delta_cru:  { name: `Imai`, ra: hms(12, 15, 8.72), dec: dms(-1, 58, 44, 56.1), mag: 2.79, group: 'crux' },

  rigil:      { name: `Rigil Kentaurus`, ra: hms(14, 39, 36.49), dec: dms(-1, 60, 50, 2.3), mag: -0.27, group: 'pointers' },
  hadar:      { name: `Hadar`, ra: hms(14, 3, 49.4), dec: dms(-1, 60, 22, 22.9), mag: 0.61, group: 'pointers' },

  sirius:     { name: `Sirius`, ra: hms(6, 45, 8.92), dec: dms(-1, 16, 42, 58.0), mag: -1.46, group: 'bright' },
  vega:       { name: `Vega`, ra: hms(18, 36, 56.34), dec: dms(+1, 38, 47, 1.3), mag: 0.03, group: 'bright' },
  betelgeuse: { name: `Betelgeuse`, ra: hms(5, 55, 10.31), dec: dms(+1, 7, 24, 25.4), mag: 0.50, group: 'bright' },
  rigel:      { name: `Rigel`, ra: hms(5, 14, 32.27), dec: dms(-1, 8, 12, 5.9), mag: 0.13, group: 'bright' },
  arcturus:   { name: `Arcturus`, ra: hms(14, 15, 39.67), dec: dms(+1, 19, 10, 56.7), mag: -0.05, group: 'bright' },
  altair:     { name: `Altair`, ra: hms(19, 50, 46.99), dec: dms(+1, 8, 52, 5.9), mag: 0.77, group: 'bright' }
}

/**
 * A star's position precessed from J2000 to another date.
 *
 * The rigorous rotation, not the small-angle approximation. The approximation
 * divides by cos(declination), which is fine for Sirius and useless for
 * Polaris — half a degree from the pole, the one star this week depends on.
 *
 * Meeus, *Astronomical Algorithms* (2nd ed., 1998), chapter 21.
 */
export function precess(star, year) {
  const T = (year - 2000) / 100

  const sec = 1 / 3600
  const zeta = sec * (2306.2181 * T + 0.30188 * T * T + 0.017998 * T * T * T)
  const z = sec * (2306.2181 * T + 1.09468 * T * T + 0.018203 * T * T * T)
  const theta = sec * (2004.3109 * T - 0.42665 * T * T - 0.041833 * T * T * T)

  const a0 = rad(star.ra + zeta), d0 = rad(star.dec), th = rad(theta)

  const A = Math.cos(d0) * Math.sin(a0)
  const B = Math.cos(th) * Math.cos(d0) * Math.cos(a0) - Math.sin(th) * Math.sin(d0)
  const C = Math.sin(th) * Math.cos(d0) * Math.cos(a0) + Math.cos(th) * Math.sin(d0)

  return {
    ...star,
    ra: ((deg(Math.atan2(A, B)) + z) % 360 + 360) % 360,
    dec: deg(Math.asin(Math.max(-1, Math.min(1, C))))
  }
}

/** Every star, precessed to the given year. */
export const skyFor = (year) =>
  Object.fromEntries(Object.entries(STARS).map(([id, s]) => [id, { id, ...precess(s, year) }]))

/**
 * Greenwich mean sidereal time, in degrees.
 *
 * Sidereal time is the sky's own clock: it is the right ascension currently
 * crossing your meridian. It runs about four minutes a day fast on the Sun's,
 * which is why the same star rises four minutes earlier each night and why
 * Lesson 16 can call the sky a clock without exaggerating.
 */
export function gmst(jd) {
  const d = jd - 2451545.0
  const T = d / 36525
  const g = 280.46061837 + 360.98564736629 * d + 0.000387933 * T * T - (T * T * T) / 38710000
  return ((g % 360) + 360) % 360
}

/** Local sidereal time in degrees, for a longitude east-positive. */
export const lst = (jd, longitude) => (((gmst(jd) + longitude) % 360) + 360) % 360

/** Where a star is, as seen from a place, at a moment. */
export function starPosition({ star, jd, latitude, longitude }) {
  const H = (((lst(jd, longitude) - star.ra) % 360) + 360) % 360
  const ha = rad(H > 180 ? H - 360 : H)
  const la = rad(latitude), de = rad(star.dec)

  const sinAlt = Math.sin(la) * Math.sin(de) + Math.cos(la) * Math.cos(de) * Math.cos(ha)
  const altitude = deg(Math.asin(Math.max(-1, Math.min(1, sinAlt))))
  const azimuth = (deg(Math.atan2(
    Math.sin(ha),
    Math.cos(ha) * Math.sin(la) - Math.tan(de) * Math.cos(la)
  )) + 180) % 360

  return { altitude, azimuth, hourAngle: deg(ha) }
}

/**
 * What a star does at a given latitude: whether it ever rises, whether it ever
 * sets, where it comes up, and how high it gets.
 *
 * `culminationAzimuth` is the point the Field Guide spec asks this course to
 * be careful about. A star crosses the meridian due SOUTH only if its
 * declination is less than your latitude; if it is greater, the star crosses
 * due north, and a reader who has been taught "highest means south" is then
 * exactly 180° wrong.
 */
export function starBehaviour(star, latitude) {
  const la = rad(latitude), de = rad(star.dec)

  const circumpolar = star.dec >= 90 - Math.abs(latitude) && latitude > 0
    ? true
    : star.dec <= -(90 - Math.abs(latitude)) && latitude < 0
  const neverRises = latitude > 0
    ? star.dec <= -(90 - latitude)
    : star.dec >= 90 + latitude

  const maxAltitude = 90 - Math.abs(latitude - star.dec)
  const minAltitude = Math.abs(latitude + star.dec) - 90 + (latitude >= 0 ? 0 : 0)

  // Where it comes up, on the true horizon. cos(A) = sin(dec)/cos(lat) — and
  // it has no solution for a star that never rises or never sets, which is
  // the same thing the two flags above say.
  const cosA = Math.sin(de) / Math.cos(la)
  const riseAzimuth = Math.abs(cosA) <= 1 ? deg(Math.acos(cosA)) : null

  // Due south, or due north? The whole of the spec's warning, in one line.
  const culminationAzimuth = star.dec > latitude ? 0 : 180

  return {
    circumpolar: !!circumpolar,
    neverRises: !!neverRises,
    maxAltitude,
    minAltitude: 90 - Math.abs(180 - Math.abs(latitude + (90 - star.dec)) - 90) - 90,
    riseAzimuth,
    setAzimuth: riseAzimuth === null ? null : 360 - riseAzimuth,
    culminationAzimuth
  }
}

/**
 * Great-circle angular distance between two points on the sky, in degrees.
 *
 * Used to measure how well the Southern Cross's long axis actually finds the
 * south celestial pole — a method everybody quotes as "about four and a half
 * times" and nobody seems to quote an error for.
 */
export function separation(a, b) {
  const d1 = rad(a.dec), d2 = rad(b.dec), dra = rad(a.ra - b.ra)
  const c = Math.sin(d1) * Math.sin(d2) + Math.cos(d1) * Math.cos(d2) * Math.cos(dra)
  return deg(Math.acos(Math.max(-1, Math.min(1, c))))
}

/** A point `times` as far along the great circle from `a` through `b`. */
export function extendAlong(a, b, times) {
  const toVec = (p) => {
    const d = rad(p.dec), r = rad(p.ra)
    return [Math.cos(d) * Math.cos(r), Math.cos(d) * Math.sin(r), Math.sin(d)]
  }
  const u = toVec(a), v = toVec(b)
  const dot = Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1] + u[2] * v[2]))
  const ang = Math.acos(dot) * times

  // Component of v perpendicular to u, normalised: the direction to travel.
  const perp = v.map((n, i) => n - dot * u[i])
  const len = Math.hypot(...perp) || 1
  const w = perp.map((n) => n / len)

  const out = u.map((n, i) => n * Math.cos(ang) + w[i] * Math.sin(ang))
  return {
    ra: ((deg(Math.atan2(out[1], out[0])) % 360) + 360) % 360,
    dec: deg(Math.asin(Math.max(-1, Math.min(1, out[2]))))
  }
}

export { julianDay }
