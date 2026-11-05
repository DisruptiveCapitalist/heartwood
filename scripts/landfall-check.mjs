#!/usr/bin/env node
// The numbers in docs/cards/chapter-25-land-signs.md: how far away an atoll
// can be seen, and how much wider the signs of it make the target.
//
// A check rather than app code — nothing in src/ calls it. It exists because
// "an atoll is visible from about ten miles" is a statement about coconut
// palms and the height of a canoe's deck, and anyone printing the figure
// should be able to see which heights it assumes.
//
//   node scripts/landfall-check.mjs

const FT = 0.3048
// Distance in nautical miles at which an object of height h (feet) meets the
// horizon of an eye at height e (feet). 1.064 is the geometry alone
// (sqrt(2Rh) with R = 3440 nm); 1.17 is the standard allowance for
// atmospheric refraction used in the nautical tables.
const reach = (e, h, k) => k * (Math.sqrt(e) + Math.sqrt(h))
const row = (label, eM, hM) => {
  const e = eM / FT, h = hM / FT
  console.log(`  ${label.padEnd(42)} ${reach(e, h, 1.064).toFixed(1).padStart(5)} nm   ${reach(e, h, 1.17).toFixed(1).padStart(5)} nm`)
}

console.log('how far off an atoll meets the horizon        geometry   with refraction')
row('eye 1.5 m, mature palms 18 m', 1.5, 18)
row('eye 1.5 m, shorter palms 14 m', 1.5, 14)
row('eye 2.5 m (standing), palms 18 m', 2.5, 18)
row('eye 1.5 m, bare sand cay 3 m', 1.5, 3)
row('eye 1.5 m, high island 300 m', 1.5, 300)

console.log('\nhow wide the target is, in nautical miles across')
const width = (r) => 2 * r
console.log(`  the land itself, a motu                      ${width(0.5).toFixed(0)} nm`)
console.log(`  palms on the horizon, 10 nm each side        ${width(10).toFixed(0)} nm`)
console.log(`  noio at Thompson's 40 nm                     ${width(40).toFixed(0)} nm`)
console.log(`  the Manihi-to-Maupiti screen                 400 nm (a group, not one island)`)
console.log('\nso the signs are worth a factor of', (width(40) / width(10)).toFixed(0), 'on the width of a single atoll,')
console.log('and the screen another', (400 / width(40)).toFixed(0), '- which is why the group matters more than the sign.')
