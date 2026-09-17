import BrakingCar from './BrakingCar.jsx'
import BicycleBalance from './BicycleBalance.jsx'

// A lesson's SEE IT stage names a simulation by id. A new lesson that needs a
// new scene adds a component here; lessons that can reuse an existing scene
// just point at it with different props.
//
// Copy is data. A simulation is code — that asymmetry is the real cost of
// authoring lesson 3 and beyond, and it is deliberate that it shows here.

export const simulations = {
  'braking-car': BrakingCar,
  'bicycle-balance': BicycleBalance
}

export function getSimulation(id) {
  return simulations[id] ?? null
}
