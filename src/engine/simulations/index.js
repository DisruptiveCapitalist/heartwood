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
import Buoyancy from './Buoyancy.jsx'
import StrawPressure from './StrawPressure.jsx'
import CircuitLoop from './CircuitLoop.jsx'
import WaveMedium from './WaveMedium.jsx'
import RayOptics from './RayOptics.jsx'
import HearingAid from './HearingAid.jsx'
import ObjectInspector from './ObjectInspector.jsx'
import Spectrum from './Spectrum.jsx'
import ElementGrid from './ElementGrid.jsx'
import CellScope from './CellScope.jsx'
import ProteinChain from './ProteinChain.jsx'
import FeedbackLoop from './FeedbackLoop.jsx'
import Circulation from './Circulation.jsx'
import BodyHeat from './BodyHeat.jsx'
import NerveSignal from './NerveSignal.jsx'
import Bone from './Bone.jsx'
import Joint from './Joint.jsx'
import MuscleUnit from './MuscleUnit.jsx'
import Recovery from './Recovery.jsx'
import Endocrine from './Endocrine.jsx'
import Receptor from './Receptor.jsx'
import FuelStore from './FuelStore.jsx'
import EvidenceLadder from './EvidenceLadder.jsx'
import Immune from './Immune.jsx'
import Pathogens from './Pathogens.jsx'
import Cancer from './Cancer.jsx'
import Reproduction from './Reproduction.jsx'
import Processing from './Processing.jsx'
import WholeBody from './WholeBody.jsx'
import PowerUse from './PowerUse.jsx'
import Mains from './Mains.jsx'
import Transformer from './Transformer.jsx'
import SeriesParallel from './SeriesParallel.jsx'
import Oersted from './Oersted.jsx'
import Machine from './Machine.jsx'
import FieldShape from './FieldShape.jsx'
import GridJourney from './GridJourney.jsx'
import Photon from './Photon.jsx'
import Junction from './Junction.jsx'
import PanelArray from './PanelArray.jsx'
import IVCurve from './IVCurve.jsx'
import Tracker from './Tracker.jsx'
import Battery from './Battery.jsx'
import Inverter from './Inverter.jsx'
import Phases from './Phases.jsx'

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
  'energy-chain': EnergyChain,
  'buoyancy': Buoyancy,
  'straw-pressure': StrawPressure,
  'circuit-loop': CircuitLoop,
  'wave-medium': WaveMedium,
  'ray-optics': RayOptics,
  'hearing-aid': HearingAid,
  'object-inspector': ObjectInspector,
  'spectrum': Spectrum,
  'element-grid': ElementGrid,
  'cell-scope': CellScope,
  'protein-chain': ProteinChain,
  'feedback-loop': FeedbackLoop,
  'circulation': Circulation,
  'body-heat': BodyHeat,
  'nerve-signal': NerveSignal,
  'bone': Bone,
  'joint': Joint,
  'muscle-unit': MuscleUnit,
  'recovery': Recovery,
  'endocrine': Endocrine,
  'receptor': Receptor,
  'fuel-store': FuelStore,
  'evidence-ladder': EvidenceLadder,
  'immune': Immune,
  'pathogens': Pathogens,
  'cancer': Cancer,
  'reproduction': Reproduction,
  'processing': Processing,
  'whole-body': WholeBody,
  'power-use': PowerUse,
  'mains': Mains,
  'transformer': Transformer,
  'series-parallel': SeriesParallel,
  'oersted': Oersted,
  'machine': Machine,
  'field-shape': FieldShape,
  'grid-journey': GridJourney,
  'photon': Photon,
  'junction': Junction,
  'panel-array': PanelArray,
  'iv-curve': IVCurve,
  'tracker': Tracker,
  'battery': Battery,
  'inverter': Inverter,
  'phases': Phases
}

export function getSimulation(id) {
  return simulations[id] ?? null
}
