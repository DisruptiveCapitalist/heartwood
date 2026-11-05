#!/usr/bin/env node
// The numbers in docs/cards/chapter-29-africa-indian-ocean.md: the distances
// the monsoon timetable governs, what a finger-width of star altitude is worth
// in miles, and the pace of a Saharan caravan.
//
// A check rather than app code — nothing in src/ calls it. Distances are
// great-circle, which is a floor for a sailing passage and a fiction for a
// camel; both are labelled as such in the card.
//
//   node scripts/indian-ocean-check.mjs

const R_NM = 3440.065
const rad = (d) => (d * Math.PI) / 180
const sep = (a, b) => {
  const [la1, lo1] = a.map(rad), [la2, lo2] = b.map(rad)
  const h = Math.sin((la2 - la1) / 2) ** 2 +
            Math.cos(la1) * Math.cos(la2) * Math.sin((lo2 - lo1) / 2) ** 2
  return 2 * R_NM * Math.asin(Math.sqrt(h))
}
const KM = 1.852

const P = {
  babElMandeb: [12.6, 43.4], muziris: [10.2, 76.2], aden: [12.8, 45.0],
  calicut: [11.25, 75.78], hormuz: [27.1, 56.45], mogadishu: [2.04, 45.34],
  malindi: [-3.22, 40.12], kilwa: [-8.96, 39.5], sofala: [-20.17, 34.73],
  borneoSE: [-3.32, 114.59], madagascarN: [-12.28, 49.29],
  sijilmasa: [31.28, -4.28], taghaza: [23.6, -5.0], walata: [17.3, -7.03]
}
const leg = (from, to, label) => {
  const nm = sep(P[from], P[to])
  console.log(`  ${label.padEnd(34)} ${nm.toFixed(0).padStart(5)} nm  (${(nm * KM).toFixed(0).padStart(5)} km)`)
  return nm
}

console.log('passages the monsoon timetable governs')
const ocelisMuziris = leg('babElMandeb', 'muziris', 'Bab el-Mandeb to Muziris')
leg('aden', 'calicut', 'Aden to Calicut')
leg('hormuz', 'calicut', 'Hormuz to Calicut (star chart 4)')
leg('mogadishu', 'kilwa', 'Mogadishu to Kilwa')
leg('kilwa', 'sofala', 'Kilwa to Sofala (the leg too far)')
const crossing = leg('borneoSE', 'madagascarN', 'SE Borneo to north Madagascar')

console.log('\nspeeds implied by the one ancient duration we have')
for (const days of [40, 60]) {
  const nmPerDay = ocelisMuziris / days
  console.log(`  Bab el-Mandeb to Muziris in ${days} days = ${nmPerDay.toFixed(0)} nm/day = ${(nmPerDay / 24).toFixed(1)} knots`)
}
console.log(`  the Borneo crossing at 80 nm/day would take ${(crossing / 80).toFixed(0)} days without a stop`)

console.log('\nwhat one finger of star altitude is worth')
for (const [name, deg] of [['Arab isbaʿ, 1°36′', 1.607], ['zhi, if 1.9°', 1.9]]) {
  console.log(`  ${name.padEnd(18)} = ${(deg * 60).toFixed(0)} nm of latitude; a quarter of it = ${((deg * 60) / 4).toFixed(0)} nm`)
}
const latSpan = Math.abs(P.mogadishu[0] - P.kilwa[0])
console.log(`  the Swahili coast spans ${latSpan.toFixed(1)}° of latitude, so ${(latSpan / 1.607).toFixed(0)} fingers end to end`)

console.log('\nthe caravan')
const sijToWalata = sep(P.sijilmasa, P.walata), sijToTaghaza = sep(P.sijilmasa, P.taghaza)
console.log(`  Sijilmasa to Walata, straight line   ${(sijToWalata * KM).toFixed(0)} km`)
console.log(`    Ibn Battuta: two months to the day → ${((sijToWalata * KM) / 60).toFixed(0)} km a day as the crow flies`)
console.log(`  Sijilmasa to Taghaza, straight line  ${(sijToTaghaza * KM).toFixed(0)} km`)
console.log(`    his 25 days to Taghaza → ${((sijToTaghaza * KM) / 25).toFixed(0)} km a day; a real track is longer, so the pace is a floor`)
