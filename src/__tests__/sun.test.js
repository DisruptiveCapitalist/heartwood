import { describe, it, expect } from 'vitest'
import { julianDay, solarPosition, solarNoon, sunPosition, shadow, riseSet, clock } from '../lib/sun.js'

// Week 3 computes the Sun rather than looking it up, which is only defensible
// if the computation is checked against something published. These are real
// times from sunrise-sunset.org (which runs the NOAA algorithm independently
// of this file), fetched on 2026-11-04 and converted to local standard time:
//
//   Columbus OH  39.9612 -83.0007  21 Jun 2026  EDT  rise 6:03:30  noon 13:33:52  set 21:04:15
//   Columbus OH                    21 Dec 2026  EST  rise 7:50:11  noon 12:30:10  set 17:10:10
//   Sydney AU   -33.8688 151.2093  21 Jun 2026  AEST rise 6:59:55  noon 11:56:53  set 16:53:52
//
// Sydney is in the list on purpose: it is the case that catches a sign error
// in the hour-angle formula, which a northern-hemisphere-only check cannot.

const mins = (h, m, s = 0) => h * 60 + m + s / 60

const PUBLISHED = [
  { name: 'Columbus, 21 June', lat: 39.9612, lon: -83.0007, tz: -4, date: [2026, 6, 21],
    sunrise: mins(6, 3, 30), noon: mins(13, 33, 52), sunset: mins(21, 4, 15) },
  { name: 'Columbus, 21 December', lat: 39.9612, lon: -83.0007, tz: -5, date: [2026, 12, 21],
    sunrise: mins(7, 50, 11), noon: mins(12, 30, 10), sunset: mins(17, 10, 10) },
  { name: 'Sydney, 21 June', lat: -33.8688, lon: 151.2093, tz: 10, date: [2026, 6, 21],
    sunrise: mins(6, 59, 55), noon: mins(11, 56, 53), sunset: mins(16, 53, 52) }
]

describe('the Sun, against published times', () => {
  for (const p of PUBLISHED) {
    it(`${p.name} is within a minute of the published sunrise, noon and sunset`, () => {
      const jd = julianDay(...p.date)
      const r = riseSet(jd, p.lat, p.lon, p.tz)
      expect(r, 'the Sun rises there that day').toBeTruthy()
      expect(Math.abs(r.sunrise - p.sunrise), 'sunrise').toBeLessThan(1)
      expect(Math.abs(r.sunset - p.sunset), 'sunset').toBeLessThan(1)
      expect(Math.abs(r.noon - p.noon), 'solar noon').toBeLessThan(1)
      // solarNoon() and riseSet() must not drift apart — the copy uses both.
      expect(Math.abs(solarNoon(jd, p.lon, p.tz) - r.noon)).toBeLessThan(0.01)
    })
  }
})

// Facts that hold by geometry rather than by algorithm, so they catch the
// errors a times-only check sails past — a flipped hemisphere, or an azimuth
// that is right in the morning and wrong in the afternoon.
describe('the Sun, by geometry', () => {
  const noonAt = (lat, lon, tz, date) => {
    const jd = julianDay(...date)
    const r = riseSet(jd, lat, lon, tz)
    return { ...sunPosition({ jd, minutes: r.noon, latitude: lat, longitude: lon, tz }), r }
  }

  it('is as high at noon as the latitudes allow, and no higher', () => {
    for (const [lat, lon, tz, date] of [
      [39.9612, -83.0007, -4, [2026, 6, 21]],
      [39.9612, -83.0007, -5, [2026, 12, 21]],
      [-33.8688, 151.2093, 10, [2026, 6, 21]],
      [-33.8688, 151.2093, 11, [2026, 12, 21]]
    ]) {
      const s = noonAt(lat, lon, tz, date)
      expect(Math.abs(s.altitude - (90 - Math.abs(lat - s.declination))), `${lat} on ${date}`)
        .toBeLessThan(0.02)
    }
  })

  it('stands due south at noon in the north, and due north in the south', () => {
    const north = noonAt(39.9612, -83.0007, -5, [2026, 12, 21])
    expect(Math.abs(north.azimuth - 180)).toBeLessThan(0.1)

    const south = noonAt(-33.8688, 151.2093, 10, [2026, 6, 21])
    expect(Math.min(south.azimuth, 360 - south.azimuth)).toBeLessThan(0.1)
  })

  // Honolulu is north of the equator and south of the June Sun, so at noon the
  // Sun is BEHIND you looking south — the case that breaks the cosine form of
  // the azimuth and the reason this file uses atan2.
  it('passes north of the zenith where the Sun is further north than you are', () => {
    const s = noonAt(21.3069, -157.8583, -10, [2026, 6, 21])
    expect(s.declination).toBeGreaterThan(21.3069)
    expect(Math.min(s.azimuth, 360 - s.azimuth), 'the Sun should be due NORTH').toBeLessThan(0.1)
    expect(s.altitude).toBeLessThan(90)
    expect(s.altitude).toBeGreaterThan(87)
  })

  it('rises in the east and sets in the west only near the equinox', () => {
    const eq = riseSet(julianDay(2026, 3, 20), 39.9612, -83.0007, -4)
    expect(Math.abs(eq.riseBearing - 90), 'equinox sunrise is within a degree of east').toBeLessThan(1)

    const jun = riseSet(julianDay(2026, 6, 21), 39.9612, -83.0007, -4)
    const dec = riseSet(julianDay(2026, 12, 21), 39.9612, -83.0007, -5)
    // A third of a right angle apart, which is the whole point of Lesson 11.
    expect(jun.riseBearing).toBeLessThan(60)
    expect(dec.riseBearing).toBeGreaterThan(119)
    expect(dec.riseBearing - jun.riseBearing).toBeGreaterThan(60)
  })

  it('neither rises nor sets inside the Arctic circle at the solstices', () => {
    expect(riseSet(julianDay(2026, 6, 21), 69.6492, 18.9553, 2)).toBeNull()
    expect(riseSet(julianDay(2026, 12, 21), 69.6492, 18.9553, 1)).toBeNull()
  })

  it('casts a shadow opposite itself, and none at all after sunset', () => {
    const jd = julianDay(2026, 6, 21)
    const at = (m) => sunPosition({ jd, minutes: m, latitude: 39.9612, longitude: -83.0007, tz: -4 })

    for (const m of [mins(8, 0), mins(13, 33), mins(18, 0)]) {
      const s = at(m)
      const sh = shadow(s)
      expect(Math.abs((((sh.bearing - s.azimuth) % 360) + 360) % 360 - 180)).toBeLessThan(0.001)
      // A low Sun throws a long shadow; the stick is 1 unit tall.
      expect(sh.length).toBeGreaterThan(0)
      expect(Math.abs(sh.length - 1 / Math.tan((s.altitude * Math.PI) / 180))).toBeLessThan(1e-9)
    }
    expect(shadow(at(mins(23, 0))), 'no Sun, no shadow').toBeNull()
  })

  it('swings the shadow through the morning to the afternoon, west to east', () => {
    const jd = julianDay(2026, 6, 21)
    const at = (m) => shadow(sunPosition({ jd, minutes: m, latitude: 39.9612, longitude: -83.0007, tz: -4 }))
    // Morning Sun in the east puts the shadow in the west, and the other way
    // round after noon. This is the direction the Field Guide's two marks
    // depend on, so it is worth a test rather than a diagram.
    expect(at(mins(9, 0)).bearing).toBeGreaterThan(180)   // west of north
    expect(at(mins(18, 0)).bearing).toBeLessThan(180)     // east of north
  })

  it('is shortest at solar noon', () => {
    const jd = julianDay(2026, 6, 21)
    const noon = riseSet(jd, 39.9612, -83.0007, -4).noon
    const len = (m) => shadow(sunPosition({ jd, minutes: m, latitude: 39.9612, longitude: -83.0007, tz: -4 })).length
    for (const off of [-120, -40, -5, 5, 40, 120]) {
      expect(len(noon + off), `${off} minutes from noon`).toBeGreaterThan(len(noon))
    }
  })
})

describe('the equation of time', () => {
  // The four stations of the analemma, from the Astronomical Almanac's
  // published extremes: about -14 min in mid-February, +4 in mid-May, -6 in
  // late July and +16 in early November.
  it('reaches its four published extremes in the right months', () => {
    const eot = (m, d) => solarPosition(julianDay(2026, m, d)).eqTime
    expect(eot(2, 11)).toBeLessThan(-13.5)
    expect(eot(5, 14)).toBeGreaterThan(3.5)
    expect(eot(7, 26)).toBeLessThan(-6)
    expect(eot(11, 3)).toBeGreaterThan(16)
  })

  it('passes through zero four times a year', () => {
    const days = []
    for (let m = 1; m <= 12; m++) for (let d = 1; d <= 28; d++) days.push(solarPosition(julianDay(2026, m, d)).eqTime)
    let crossings = 0
    for (let i = 1; i < days.length; i++) if (Math.sign(days[i]) !== Math.sign(days[i - 1])) crossings += 1
    expect(crossings).toBe(4)
  })
})

describe('the clock readout', () => {
  // 419.9 minutes printed as "6:00 am" for a while: the minutes were rounded
  // after the split, so 59.9 became 60 and the hour never carried. An hour
  // wrong, and it still looked like a time.
  it('carries the hour when the minutes round up', () => {
    expect(clock(419.9)).toBe('7:00 am')
    expect(clock(59.7)).toBe('1:00 am')
    expect(clock(1439.8)).toBe('12:00 am')
  })

  it('reads noon and midnight as twelve, not zero', () => {
    expect(clock(0)).toBe('12:00 am')
    expect(clock(720)).toBe('12:00 pm')
    expect(clock(753.7)).toBe('12:34 pm')
  })
})
