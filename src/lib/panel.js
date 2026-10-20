// The solar panel model shared by Lessons 18, 19 and 20.
//
// One ordinary modern module: 108 half-cells, which is 54 cells in series
// electrically, each contributing about 0.69 V. The single-diode equation with
// a series resistance, which is the standard model and gives honest numbers:
//
//   I(V) = Isc · (1 − exp((V + I·Rs − Voc) / Vt))
//
// At standard test conditions — 1,000 W/m² and 25 °C — this gives:
//
//   Voc 37.4 V   Isc 13.7 A   MPP 30.8 V × 13.1 A = 402 W   fill factor 78%
//
// which is a real 400 W panel. The temperature coefficient of −0.29%/°C is
// also real, and is why the same panel makes about 15% less on a hot roof than
// its label claims. Lesson 20 is built on that gap.
//
// It lives here rather than inside one simulation because three lessons quote
// these numbers and they must not be allowed to drift apart.

export const SERIES_CELLS = 54
export const VOC_STC = 37.4
export const ISC_STC = 13.7
export const RS = 0.18
export const TEMP_CO = 0.0029      // per °C, Voc falls as the cell warms
const N = 1.0
const K = 0.0257                   // kT/q at 25 °C, volts

/** Open-circuit voltage at a given cell temperature. */
export function voc(degC) {
  return VOC_STC * (1 - TEMP_CO * (degC - 25))
}

/** Short-circuit current, which follows the light almost exactly. */
export function isc(irradiance) {
  return ISC_STC * (irradiance / 1000)
}

/** Current at a given terminal voltage. Solved by relaxation because Rs makes
 *  the equation implicit — 60 passes is comfortably enough to settle. */
export function currentAt(V, irradiance, degC) {
  const Il = isc(irradiance)
  const Vo = voc(degC)
  if (irradiance <= 0 || V >= Vo) return 0
  const Vt = N * K * SERIES_CELLS * ((degC + 273.15) / 298.15)
  let i = Il
  for (let k = 0; k < 60; k++) {
    const target = Il * (1 - Math.exp((V + i * RS - Vo) / Vt))
    i += (target - i) * 0.3
  }
  return Math.max(0, i)
}

/** The maximum power point: the knee of the curve, and the only place on it
 *  worth operating. Lesson 20 is about finding it; Lesson 21 about tracking it. */
export function maxPower(irradiance, degC) {
  const Vo = voc(degC)
  let best = { v: 0, i: 0, p: 0 }
  // Fine enough that the reported knee voltage is stable to 0.1 V, which is the
  // precision the lessons quote it at.
  for (let V = 0; V <= Vo; V += Vo / 2000) {
    const i = currentAt(V, irradiance, degC)
    const p = V * i
    if (p > best.p) best = { v: V, i, p }
  }
  return best
}

/** Fill factor: how square the curve is. A real module manages 75–80%. */
export function fillFactor(irradiance, degC) {
  const denom = voc(degC) * isc(irradiance)
  return denom > 0 ? maxPower(irradiance, degC).p / denom : 0
}
