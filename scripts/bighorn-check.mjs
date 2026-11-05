#!/usr/bin/env node
// The two numbers in docs/cards/chapter-23-bighorn-medicine-wheel.md.
//
// A check rather than app code: no simulation in the course calls any of this,
// which is why it lives in scripts/ and not in src/lib/. It exists so that the
// figures in a handbook card can be re-derived by whoever doubts them, which is
// the whole of the card's argument.
//
//   node scripts/bighorn-check.mjs

const rad = (d) => (d * Math.PI) / 180
const deg = (r) => (r * 180) / Math.PI

const PHI = 44 + 49 / 60 + 34 / 3600   // 44° 49′ 34″ N, the landmark's coordinate
const OBLIQUITY = 23.44                // close enough for the last millennium
const FT = 0.3048

// Azimuth from north of a body of declination `dec` meeting a horizon of
// altitude `h`. Centre of the disc, no refraction — both are small against the
// degrees this card is arguing about.
const azimuth = (dec, h = 0) =>
  deg(Math.acos((Math.sin(rad(dec)) - Math.sin(rad(h)) * Math.sin(rad(PHI))) /
                (Math.cos(rad(h)) * Math.cos(rad(PHI)))))

// Solar declination `d` days from the June solstice, to first order.
const declination = (d) => OBLIQUITY * Math.cos(rad(0.9856 * d))

// Days from the solstice at which sunrise has moved `shift` degrees along the
// horizon. Bisection, because declination(d) is monotonic over the range.
const daysForShift = (shift, h = 0) => {
  const target = azimuth(OBLIQUITY, h) + shift
  let lo = 0, hi = 90
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    azimuth(declination(mid), h) < target ? (lo = mid) : (hi = mid)
  }
  return (lo + hi) / 2
}

// A direction read between two marks each known to ±half, at separation base.
const slack = (half, base) => deg(Math.atan(half / base))

console.log(`latitude ${PHI.toFixed(3)}°, solstice sunrise azimuth ${azimuth(OBLIQUITY).toFixed(2)}° on a level horizon\n`)

console.log('what a degree of slack is worth, in days either side of the solstice')
for (const h of [-0.5, 0, 1, 2]) {
  const row = [0.5, 1, 2, 3].map((s) => `${s}° = ${daysForShift(s, h).toFixed(0)} d`).join('   ')
  console.log(`  horizon ${String(h).padStart(4)}°   ${row}`)
}

console.log('\nhow well the stones can define a direction')
console.log(`  centres to ±0.5 m over 41 ft (rim to centre)   ${slack(0.5, 41 * FT).toFixed(1)}°`)
console.log(`  centres to ±0.5 m over 60 ft                   ${slack(0.5, 60 * FT).toFixed(1)}°`)
console.log(`  edges of a 12 ft and a 6 ft cairn over 41 ft    ${slack((6 + 3) * FT, 41 * FT).toFixed(1)}°`)

const pairs = (7 * 6) / 2
console.log('\nhow many candidate lines the wheel offers')
console.log(`  7 cairns: ${pairs} pairs, ${pairs * 2} azimuths, mean gap ${(360 / (pairs * 2)).toFixed(1)}°`)
console.log(`  with 28 spokes: ${pairs * 2 + 56} azimuths, mean gap ${(360 / (pairs * 2 + 56)).toFixed(1)}°`)
