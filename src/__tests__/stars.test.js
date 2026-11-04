import { describe, it, expect } from 'vitest'
import {
  STARS, precess, skyFor, gmst, starPosition, starBehaviour, separation, extendAlong, julianDay
} from '../lib/stars.js'

// Week 4 computes star positions rather than looking them up, which is only
// defensible if the computation is checked against something published.
//
// Polaris is the test case, because precession moves it faster in declination
// than it moves almost anything else and the published figures are easy to
// find. Values gathered 2026-11-04:
//
//   2018  about 89° 20.1'   (siranah.de's navigation tables)
//   2022  about 89.35°      (cavac encyclopedia)
//   max   89° 32' 23" mean, February 2102; 89° 32' 50.62" apparent, March
//         2100 (Wikipedia, "Pole star", citing the two different conventions)
//
// The approximate precession formula divides by cos(declination) and is
// useless this close to the pole, so src/lib/stars.js uses the rigorous
// rotation. These tests are what tell the difference.

const arcmin = (deg) => deg * 60
const polarisAt = (year) => precess(STARS.polaris, year)

describe('precession, against published positions', () => {
  it('puts Polaris where the almanacs put it in 2018 and 2022', () => {
    // Within half an arcminute, which is the spread between the published
    // figures themselves — mean versus apparent place differ by about that.
    expect(Math.abs(arcmin(polarisAt(2018).dec) - arcmin(89 + 20.1 / 60))).toBeLessThan(0.5)
    expect(Math.abs(polarisAt(2022).dec - 89.35)).toBeLessThan(0.02)
  })

  it('brings Polaris closest to the pole around 2100, at the published distance', () => {
    const distance = (y) => arcmin(90 - polarisAt(y).dec)

    let best = { d: 999 }
    for (let y = 2000; y <= 2200; y += 1) {
      const d = distance(y)
      if (d < best.d) best = { y, d }
    }
    expect(best.y, 'closest approach year').toBeGreaterThan(2090)
    expect(best.y, 'closest approach year').toBeLessThan(2110)
    expect(best.d, 'closest approach distance in arcminutes').toBeGreaterThan(27)
    expect(best.d, 'closest approach distance in arcminutes').toBeLessThan(28)
  })

  it('moves it the right way, and by a sensible amount', () => {
    // J2000 is the catalogue value, so this is also a check that precess()
    // leaves a star alone when asked for its own epoch.
    expect(Math.abs(precess(STARS.polaris, 2000).dec - STARS.polaris.dec)).toBeLessThan(1e-6)
    expect(polarisAt(2026).dec).toBeGreaterThan(polarisAt(2000).dec)
    expect(arcmin(90 - polarisAt(2026).dec)).toBeGreaterThan(37)
    expect(arcmin(90 - polarisAt(2026).dec)).toBeLessThan(38)
  })

  it('leaves a star near the celestial equator roughly alone in declination', () => {
    // Betelgeuse is at declination 7°, where precession in declination is
    // modest. A formula that blew up near the pole would also misbehave here.
    const moved = Math.abs(precess(STARS.betelgeuse, 2026).dec - STARS.betelgeuse.dec)
    expect(moved).toBeLessThan(0.2)
    expect(moved).toBeGreaterThan(0)
  })
})

describe('the sky, by geometry', () => {
  const sky = skyFor(2026)

  it('runs sidereal time about four minutes a day fast on the clock', () => {
    const jd = julianDay(2026, 10, 15)
    const turn = ((gmst(jd + 1) - gmst(jd)) % 360 + 360) % 360
    // One solar day is a bit more than one full turn of the sky: the excess,
    // in minutes of time, is the four minutes of Lesson 16.
    expect((turn / 360) * 24 * 60).toBeGreaterThan(3.8)
    expect((turn / 360) * 24 * 60).toBeLessThan(4.1)
  })

  it('holds Polaris near the pole all night while other stars sweep', () => {
    const jd = julianDay(2026, 10, 15)
    const at = (star, h) => starPosition({ star, jd: jd + h / 24, latitude: 39.96, longitude: -83 })

    const polaris = [0, 3, 6].map((h) => at(sky.polaris, h))
    for (const p of polaris) expect(Math.abs(p.altitude - 39.96)).toBeLessThan(1)

    // Something near the celestial equator must move a great deal in the
    // same six hours, or the model is not turning at all.
    const swing = Math.abs(at(sky.betelgeuse, 0).azimuth - at(sky.betelgeuse, 6).azimuth)
    expect(swing).toBeGreaterThan(20)
  })

  // The Field Guide spec's explicit instruction for Chapter 7, as a test:
  // the highest point of a star's path is NOT universally south.
  it('sends a star north of the zenith when its declination beats your latitude', () => {
    expect(starBehaviour(sky.vega, 25.76).culminationAzimuth, 'Vega from Miami').toBe(0)
    expect(starBehaviour(sky.vega, 39.96).culminationAzimuth, 'Vega from Columbus').toBe(180)
    expect(sky.vega.dec).toBeGreaterThan(25.76)
    expect(sky.vega.dec).toBeLessThan(39.96)

    // The whole Big Dipper crosses north from anywhere in the United States.
    for (const id of ['dubhe', 'merak', 'alioth', 'alkaid']) {
      expect(starBehaviour(sky[id], 39.96).culminationAzimuth, `${id} from Columbus`).toBe(0)
    }
  })

  it('makes a star circumpolar exactly when its declination clears 90 minus the latitude', () => {
    expect(starBehaviour(sky.dubhe, 39.96).circumpolar, 'Dubhe from Columbus').toBe(true)
    expect(starBehaviour(sky.dubhe, 25.76).circumpolar, 'Dubhe from Miami').toBe(false)
    expect(starBehaviour(sky.vega, 61.22).circumpolar, 'Vega from Anchorage').toBe(true)
    expect(starBehaviour(sky.sirius, 61.22).circumpolar, 'Sirius from Anchorage').toBe(false)
  })

  it('fixes a star\'s rising point by its declination and your latitude alone', () => {
    // Same star, three latitudes, three different rising bearings — and the
    // further north you go the further round it comes up.
    const rise = (lat) => starBehaviour(sky.sirius, lat).riseAzimuth
    expect(Math.round(rise(25.76))).toBe(109)
    expect(Math.round(rise(39.96))).toBe(112)
    expect(Math.round(rise(61.22))).toBe(127)

    // A star on the celestial equator rises due east from everywhere.
    const equatorial = { ...sky.sirius, dec: 0 }
    for (const lat of [0, 25, 40, 61]) {
      expect(Math.abs(starBehaviour(equatorial, lat).riseAzimuth - 90)).toBeLessThan(0.001)
    }
  })
})

// The two pointing rules the lessons quote, measured rather than asserted.
// Both are near their own best, and neither is good — the lesson is in the
// gap between how accurate they are and how useful they are.
describe('the pointing rules', () => {
  const sky = skyFor(2026)
  const NCP = { ra: 0, dec: 90 }
  const SCP = { ra: 0, dec: -90 }

  it('sends the northern pointers within three degrees of Polaris', () => {
    const landed = extendAlong(sky.merak, sky.dubhe, 6)   // five gaps past Dubhe
    const miss = separation(landed, sky.polaris)
    expect(miss).toBeGreaterThan(2.5)
    expect(miss).toBeLessThan(2.8)

    // And no multiple does much better, because the three are not in line.
    let best = 99
    for (let k = 3; k <= 9; k += 0.01) best = Math.min(best, separation(extendAlong(sky.merak, sky.dubhe, k), sky.polaris))
    expect(best).toBeGreaterThan(1.8)
    expect(best).toBeLessThan(2.0)
  })

  it('sends the Southern Cross within three degrees of the south pole, and no closer', () => {
    const landed = extendAlong(sky.gacrux, sky.acrux, 5.5)  // 4.5 lengths past Acrux
    expect(separation(landed, SCP)).toBeGreaterThan(2.6)
    expect(separation(landed, SCP)).toBeLessThan(2.8)

    // The floor: the axis itself does not point at the pole, so care cannot
    // get under this. It is the whole argument of Lesson 19.
    let best = 99
    for (let k = 3; k <= 7; k += 0.01) best = Math.min(best, separation(extendAlong(sky.gacrux, sky.acrux, k), SCP))
    expect(best).toBeGreaterThan(2.6)
    expect(best).toBeLessThan(2.7)
  })

  it('measures the long axis and the pointer gap at the lengths the lessons quote', () => {
    expect(separation(sky.gacrux, sky.acrux)).toBeCloseTo(6.01, 1)
    expect(separation(sky.merak, sky.dubhe)).toBeCloseTo(5.37, 1)
    expect(separation(sky.dubhe, sky.polaris)).toBeCloseTo(28.71, 1)
  })

  it('agrees that the two hemispheres are equally badly served', () => {
    // The point of Lesson 19: the methods are the same quality. What differs
    // is that the northern one has a star waiting at the end of it.
    const north = separation(extendAlong(sky.merak, sky.dubhe, 6), sky.polaris)
    const south = separation(extendAlong(sky.gacrux, sky.acrux, 5.5), SCP)
    expect(Math.abs(north - south)).toBeLessThan(0.3)
    expect(separation(sky.polaris, NCP) * 60).toBeLessThan(38)
  })
})
