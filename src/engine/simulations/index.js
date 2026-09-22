import BrakingCar from './BrakingCar.jsx'
import BicycleBalance from './BicycleBalance.jsx'
import RollingBall from './RollingBall.jsx'
import TwoCarts from './TwoCarts.jsx'
import CatchIt from './CatchIt.jsx'
import ElevatorScale from './ElevatorScale.jsx'
import BoxPush from './BoxPush.jsx'
import ChairLoad from './ChairLoad.jsx'
import BridgeTruss from './BridgeTruss.jsx'
import Lever from './Lever.jsx'
import BrakingEnergy from './BrakingEnergy.jsx'
import SpringDrop from './SpringDrop.jsx'
import ParticleBox from './ParticleBox.jsx'
import EnergyChain from './EnergyChain.jsx'

// A lesson's SEE IT stage names a simulation by id. A new lesson that needs a
// new scene adds a component here; lessons that can reuse an existing scene
// just point at it with different props.
//
// Copy is data. A simulation is code — that asymmetry is the real cost of
// authoring lesson 3 and beyond, and it is deliberate that it shows here.

export const simulations = {
  'braking-car': BrakingCar,
  'bicycle-balance': BicycleBalance,
  'rolling-ball': RollingBall,
  'two-carts': TwoCarts,
  'catch-it': CatchIt,
  'elevator-scale': ElevatorScale,
  'box-push': BoxPush,
  'chair-load': ChairLoad,
  'bridge-truss': BridgeTruss,
  'lever': Lever,
  'braking-energy': BrakingEnergy,
  'spring-drop': SpringDrop,
  'particle-box': ParticleBox,
  'energy-chain': EnergyChain
}

export function getSimulation(id) {
  return simulations[id] ?? null
}
