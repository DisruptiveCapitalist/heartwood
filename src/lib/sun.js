// Where the Sun is, for Navigation Week 3.
//
// Unlike magnetic declination — which Lesson 7 had to look up, because the
// dipole picture gets it wrong by ten degrees — the Sun's position IS
// computable, to far better than a lesson needs. So it is computed here, once,
// and every simulation and every number in Weeks 3's copy comes out of these
// functions rather than out of a table someone typed.
//
// The algorithm is NOAA's (the one behind their Solar Calculator), good to
// about a hundredth of a degree for years near the present. Checked against
// published times and azimuths in src/__tests__/sun.test.js; the comparisons
// and their sources are recorded there.
//
// Conventions, stated once because every one of them is a chance to be wrong:
//
//   latitude   degrees, north positive
//   longitude  degrees, EAST positive (so Columbus, Ohio is -83)
//   azimuth    degrees clockwise from true north: 0 N, 90 E, 180 S, 270 W
//   altitude   degrees above the true horizon, negative below it
//   hour angle degrees, 0 at local solar noon, negative in the morning
//   time       minutes after local midnight, in the zone's standard time
//
// Refraction is deliberately NOT applied to the altitude: a shadow is cast by
// where the Sun appears to be, but every length and direction this course
// draws is far above the horizon, where refraction is a few hundredths of a
// degree. The one place it matters — sunrise and sunset, where it is about
// half a degree and moves the event by minutes — is handled explicitly by
// riseSet(), which uses the standard -0.833° horizon.

const rad = (d) => (d * Math.PI) / 180
const deg = (r) => (r * 180) / Math.PI

/**
 * The Julian day of a local clock time on that date.
 *
 * julianDay() gives 00:00 UT; everything below needs the actual instant,
 * because the Sun's declination moves by up to about 0.4 degrees in a day.
 * Holding it fixed at midnight makes the whole day's geometry symmetrical
 * about noon, which quietly turns the equal-shadow method of Lesson 13 into a
 * perfect instrument — it came out at 0.00 degrees of error everywhere, which
 * is how the omission was spotted. Its real error is small, but it is not
 * zero, and a lesson comparing two methods must not get that for free.
 *
 * Daily figures — sunrise, sunset, solar noon — are taken at local noon, which
 * is the usual convention and good to a few seconds.
 */
const atLocal = (jd, minutes, tz) => jd + (minutes - tz * 60) / 1440

/** Days from the J2000.0 epoch to 00:00 UT on this calendar date. */
export function julianDay(year, month, day) {
  // Fliegel and Van Flandern, via NOAA. Valid for any Gregorian date.
  let y = year, m = month
  if (m <= 2) { y -= 1; m += 12 }
  const a = Math.floor(y / 100)
  const b = 2 - a + Math.floor(a / 4)
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5
}

/**
 * The Sun's declination and the equation of time, for a Julian century.
 *
 * The equation of time is the gap between the Sun and a clock: minutes to ADD
 * to mean solar time to get apparent (sundial) time. It is why Lesson 14
 * exists — a sundial and a wristwatch disagree by up to a quarter of an hour,
 * and the disagreement is not a fault in either.
 */
export function solarPosition(jd) {
  const t = (jd - 2451545.0) / 36525.0

  const meanLong = (280.46646 + t * (36000.76983 + t * 0.0003032)) % 360
  const meanAnom = 357.52911 + t * (35999.05029 - 0.0001537 * t)
  const eccent = 0.016708634 - t * (0.000042037 + 0.0000001267 * t)

  const centre =
    Math.sin(rad(meanAnom)) * (1.914602 - t * (0.004817 + 0.000014 * t)) +
    Math.sin(rad(2 * meanAnom)) * (0.019993 - 0.000101 * t) +
    Math.sin(rad(3 * meanAnom)) * 0.000289

  const trueLong = meanLong + centre
  const omega = 125.04 - 1934.136 * t
  const appLong = trueLong - 0.00569 - 0.00478 * Math.sin(rad(omega))

  const meanObliq = 23 + (26 + (21.448 - t * (46.815 + t * (0.00059 - t * 0.001813))) / 60) / 60
  const obliq = meanObliq + 0.00256 * Math.cos(rad(omega))

  const declination = deg(Math.asin(Math.sin(rad(obliq)) * Math.sin(rad(appLong))))

  // Equation of time, in minutes.
  const y = Math.tan(rad(obliq / 2)) ** 2
  const eqTime = 4 * deg(
    y * Math.sin(2 * rad(meanLong)) -
    2 * eccent * Math.sin(rad(meanAnom)) +
    4 * eccent * y * Math.sin(rad(meanAnom)) * Math.cos(2 * rad(meanLong)) -
    0.5 * y * y * Math.sin(4 * rad(meanLong)) -
    1.25 * eccent * eccent * Math.sin(2 * rad(meanAnom))
  )

  return { declination, eqTime }
}

/**
 * Minutes after local midnight at which the Sun crosses the meridian — the
 * moment the shadow is shortest, and the thing a sundial calls noon.
 *
 * `tz` is the standard-time offset in hours (Ohio is -5). Clock noon and solar
 * noon differ for two separate reasons, and Lesson 14 needs them kept apart:
 * the equation of time, which is about the Earth's orbit, and the distance
 * from the time zone's meridian, which is about politics.
 */
export function solarNoon(jd, longitude, tz) {
  const { eqTime } = solarPosition(atLocal(jd, 720, tz))
  return 720 - 4 * longitude - eqTime + tz * 60
}

/** Where the Sun is, as seen from a place, at a moment. */
export function sunPosition({ jd, minutes, latitude, longitude, tz }) {
  const { declination, eqTime } = solarPosition(atLocal(jd, minutes, tz))

  // True solar time, in minutes, then the hour angle.
  const trueSolar = minutes + eqTime + 4 * longitude - tz * 60
  const hourAngle = trueSolar / 4 - 180

  const la = rad(latitude), de = rad(declination), ha = rad(hourAngle)

  const sinAlt = Math.sin(la) * Math.sin(de) + Math.cos(la) * Math.cos(de) * Math.cos(ha)
  const altitude = deg(Math.asin(Math.max(-1, Math.min(1, sinAlt))))

  // atan2 form: no quadrant special-casing, and it stays well behaved when the
  // Sun is near the zenith, where the cosine form loses its grip.
  const azimuth = (deg(Math.atan2(
    Math.sin(ha),
    Math.cos(ha) * Math.sin(la) - Math.tan(de) * Math.cos(la)
  )) + 180) % 360

  return { altitude, azimuth, declination, eqTime, hourAngle }
}

/** The direction a shadow points, and its length for a stick of height 1. */
export function shadow(sun) {
  if (sun.altitude <= 0) return null
  return {
    bearing: (sun.azimuth + 180) % 360,
    length: 1 / Math.tan(rad(sun.altitude))
  }
}

/**
 * Sunrise and sunset, as minutes after local midnight, plus the bearings the
 * Sun rises and sets on.
 *
 * -0.833° is the standard convention: half a degree of refraction at the
 * horizon plus the Sun's own semi-diameter, so the moment is the upper limb
 * appearing rather than the centre. Returns null where the Sun does not rise
 * or set at all that day — which is the honest answer above the Arctic circle
 * and the reason Lesson 11 does not promise that the Sun rises in the east.
 */
export function riseSet(jd, latitude, longitude, tz) {
  const { declination } = solarPosition(atLocal(jd, 720, tz))
  const la = rad(latitude), de = rad(declination)

  const cosH = (Math.cos(rad(90.833)) - Math.sin(la) * Math.sin(de)) / (Math.cos(la) * Math.cos(de))
  if (cosH > 1 || cosH < -1) return null

  const h = deg(Math.acos(cosH))
  const noon = solarNoon(jd, longitude, tz)

  // The bearing at the moment of rising, from the same geometry.
  const cosAz = (Math.sin(de) - Math.sin(rad(-0.833)) * Math.sin(la)) /
    (Math.cos(rad(-0.833)) * Math.cos(la))
  const riseBearing = deg(Math.acos(Math.max(-1, Math.min(1, cosAz))))

  return {
    sunrise: noon - 4 * h,
    sunset: noon + 4 * h,
    noon,
    riseBearing,
    setBearing: 360 - riseBearing,
    daylight: 8 * h
  }
}

/**
 * "7:42 am" from minutes after midnight, for a readout.
 *
 * Rounds to the minute FIRST and then splits. Splitting first and rounding the
 * remainder turns 419.9 into "6:60", which prints as 6:00 — an hour early, and
 * silently, because the number still looks like a time.
 */
export function clock(minutes) {
  const total = Math.round(((minutes % 1440) + 1440) % 1440) % 1440
  const h24 = Math.floor(total / 60)
  const mm = total % 60
  const h = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h}:${String(mm).padStart(2, '0')} ${h24 < 12 ? 'am' : 'pm'}`
}
