#!/usr/bin/env node
// The numbers in docs/cards/chapter-26-mesoamerica.md: the Maya calendar's
// arithmetic, the drift in the Dresden Venus table, what an hour of clock
// error is worth in longitude, and how far off a low coast can be seen.
//
// A check rather than app code — nothing in src/ calls it.
//
//   node scripts/mesoamerica-check.mjs

const TZOLKIN = 260, HAAB = 365
const gcd = (a, b) => (b ? gcd(b, a % b) : a)
const round = (TZOLKIN * HAAB) / gcd(TZOLKIN, HAAB)

console.log('the calendar')
console.log(`  tzolk'in ${TZOLKIN} d, haab' ${HAAB} d, calendar round ${round.toLocaleString()} d`)
console.log(`  = ${round / HAAB} haab' = ${round / TZOLKIN} tzolk'in = ${(round / 365.2422).toFixed(2)} tropical years`)
const LONG_COUNT = { "k'in": 1, winal: 20, tun: 360, "k'atun": 7200, "b'ak'tun": 144000 }
for (const [name, days] of Object.entries(LONG_COUNT)) {
  console.log(`  1 ${name.padEnd(9)} = ${String(days).padStart(6)} d = ${(days / 365.2422).toFixed(2)} tropical years`)
}

const CANON = 584, TRUE_SYNODIC = 583.92
console.log('\nthe Dresden Venus table')
console.log(`  5 Venus periods of ${CANON} d = ${5 * CANON} d, and 8 haab' = ${8 * HAAB} d — the same number`)
console.log(`  the table runs 65 periods = ${65 * CANON} d = ${(65 * CANON) / HAAB} haab' = ${(65 * CANON) / round} calendar rounds`)
const perPeriod = CANON - TRUE_SYNODIC
console.log(`  but a true synodic period is ${TRUE_SYNODIC} d, so the count gains ${perPeriod.toFixed(2)} d each time round`)
for (const n of [5, 65]) {
  const days = n * perPeriod, years = (n * CANON) / HAAB
  console.log(`    after ${String(n).padStart(2)} periods (${years.toFixed(0)} haab') the table is ${days.toFixed(1)} d ahead of the sky`)
}
console.log(`  which is one day every ${(1 / (perPeriod / (CANON / HAAB))).toFixed(0)} years, and the table carries instructions to subtract days`)

console.log('\nwhat the calendar cannot do')
const lat = 20.68   // Chichén Itzá
const nmPerDegLon = 60 * Math.cos((lat * Math.PI) / 180)
console.log(`  one hour of clock error = 15° of longitude = ${(15 * nmPerDegLon).toFixed(0)} nm at ${lat}° N (${(15 * nmPerDegLon * 1.1508).toFixed(0)} statute miles)`)
console.log(`  one DAY of error = 360° — a count of days is not a clock, whatever its precision`)

console.log('\nhow far off a low coast is visible')
const FT = 0.3048
const reach = (eM, hM, k = 1.17) => k * (Math.sqrt(eM / FT) + Math.sqrt(hM / FT))
console.log(`  eye 1.5 m, coastal woodland 10 m: ${reach(1.5, 10).toFixed(1)} nm`)
console.log(`  eye 1.5 m, bare limestone shore 5 m: ${reach(1.5, 5).toFixed(1)} nm`)
