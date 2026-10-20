// Electricity & Energy · Week 6 · Lesson 27 — two motors, two problems.
//
// Physics I looked at a fridge and a ceiling fan too, and asked where the heat
// went. This lesson asks what the wires are doing, which turns out to be a
// different and harder question — and the copy says so, because the learner
// has met these objects in this course before.
//
// The real content is a puzzle Lesson 25 set up and did not resolve: a single
// phase gives a motor no reason to prefer one direction over the other. A
// rotating field needs at least two phases out of step. So every single-phase
// motor in a house has to manufacture a second phase somehow, and the two
// objects here solve it in two different ways — a capacitor in the fridge's
// compressor, a shaded pole in a cheap fan.
//
// The fridge's starting surge is Lesson 12's stall current: at a standstill
// there is no back-EMF, so it draws several times its running current for a
// fraction of a second, and that is the dip in the lights.

export default {
  id: 'lesson-27',
  number: 2,
  week: 6,
  title: `A refrigerator and a ceiling fan`,
  openingQuestion: `You met both of these in Physics I, where the questions were about heat. Today the questions are about the wires. Both contain a motor running on a single phase — and Lesson 25 said a single phase gives a motor no reason whatever to turn one way rather than the other. So how does either of them start?`,
  concept: `Two motors, two problems`,

  see: {
    voice: 'professor',
    line: `Same rule as yesterday: your list first. And for each one, ask yourself how it decides which way to turn.`,
    simulation: {
      id: 'object-inspector',
      props: {
        prompt: 'What is the electricity doing in here?',
        objects: [
          {
            id: 'fridge', label: 'A refrigerator', shape: 'fridge',
            physics: [
              { concept: 'A motor under load', lesson: 12, note: 'The compressor is squeezing gas, which is hard work. The motor draws exactly as much current as that work demands and not a bit more.' },
              { concept: 'The starting surge', lesson: 12, note: 'At a standstill there is no back-EMF, so it briefly draws several times its running current. That is the dip you see in the lights.' },
              { concept: 'A capacitor to start it', lesson: 25, note: 'A single phase cannot make a rotating field. A capacitor shifts the current in a second winding out of step, faking the second phase — and it is the part that fails.' },
              { concept: 'It cycles on and off', lesson: 6, note: 'About 150 W while running, nothing while resting, and perhaps a third of the day running. The bill counts the average, not the badge.' },
              { concept: 'It is a heat pump', lesson: 'Physics I', note: 'It does not make cold, it moves heat outward. The coils at the back are warm for exactly that reason.' }
            ]
          },
          {
            id: 'fan', label: 'A ceiling fan', shape: 'fan',
            physics: [
              { concept: 'A shaded pole', lesson: 25, note: 'A cheap fan fakes its second phase with a copper ring round part of each pole, which delays the field there. Crude, inefficient, and it has no moving parts to fail.' },
              { concept: 'Barely any load', lesson: 12, note: 'Air is light work, so it draws very little — about 70 W, less than a filament bulb. Almost nothing is being asked of it.' },
              { concept: 'Speed by changing the push', lesson: 3, note: 'The old three-position switch puts a capacitor or a coil in series to drop the voltage. Less push, less speed — and the wasted energy becomes heat in the switch.' },
              { concept: 'It does not cool the room', lesson: 6, note: 'Every watt it draws ends up as heat in that room. It cools *you*, by moving air across skin, and leaving it on in an empty room warms the house slightly.' },
              { concept: 'Reversible in winter', lesson: 25, note: 'Swap which winding leads and the field rotates the other way. The switch on the body is doing exactly that.' }
            ]
          }
        ]
      }
    },
    observations: [
      { text: `Both are motors on a **single phase**, and Lesson 25 showed that one phase alone cannot make a rotating field. Each has to manufacture a second phase somehow.` },
      { text: `The fridge uses a **capacitor** — which is why a fridge that hums but will not start usually needs a two-pound part rather than a new fridge.` },
      { text: `The fan uses a **shaded pole**: a copper ring round part of each pole that delays the field there. Crude and wasteful, with nothing to wear out.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first finishes something Lesson 25 deliberately left hanging.`,
    sentences: [
      `A **single phase cannot start a motor** on its own, because the field it makes simply pulses back and forth along one line rather than rotating. A rotor sitting in that field is pushed equally hard both ways and does nothing. Give it a shove by hand and it will happily run in whichever direction you shoved it — which is the clue to what it is missing.`,
      `So every single-phase motor **fakes a second phase**. Put current through a second winding with its timing shifted — by a capacitor, or by a copper ring that drags the field in part of the pole — and the two together produce enough of a rotation to get started and to choose a direction. It is a workaround, it costs efficiency, and three-phase motors need none of it.`,
      `Everything else about these two is **load**. The fridge's compressor is genuinely hard work, so it draws real current, surges at startup and runs hot; the fan is pushing air, which is almost nothing, so it draws less than an old light bulb. Same principle, same problem, and two orders of magnitude between them because of what they are being asked to do.`
    ],
    sequence: {
      label: `WHY YOUR LIGHTS DIP WHEN THE FRIDGE STARTS`,
      note: `Lesson 12, happening in your kitchen several times an hour`,
      steps: [
        { name: `The thermostat closes`, body: `The compressor motor is connected to 120 V while completely stationary. Nothing is turning yet.` },
        { name: `There is no back-EMF`, body: `A motor only opposes its supply when it is moving. At a standstill it opposes nothing, so the full voltage drives current through a very low resistance.` },
        { name: `So it draws its stall current`, body: `Several times the running figure — perhaps 800 W from something that will settle at 150. For a fraction of a second it is the biggest load in the house.` },
        { name: `The house voltage sags`, body: `That surge pulls current through the service cable and the pole transformer, and the small voltage drop along them is shared by everything in the building.` },
        { name: `Your lights dip`, body: `A filament responds instantly to the lower voltage. An LED with a well-made driver often does not, which is why this is less visible than it used to be.` },
        { name: `And a second later it is over`, body: `The motor is at speed, generating back-EMF, drawing a fraction of what it took to start. The dip lasted exactly as long as it took to get going.` }
      ]
    },
    comparison: {
      label: `A SWING, AND A REVOLVING DOOR`,
      body: `Push a child on a swing and you are pushing back and forth along one line. However hard you push, the swing never goes round — a straight-line push cannot produce a rotation, only an oscillation. That is a single-phase field, and it is why the motor sits there humming. Now think of a revolving door with people pushing at several points around it in sequence: each push arrives a little after the last, further round, and the door turns continuously and in a definite direction. That sequence is what a second phase provides, and a three-phase supply provides it for nothing. *Where the analogy stops:* a swing genuinely cannot be made to rotate by one person, and a single-phase motor can — it is simply that the second push has to be manufactured inside the machine, with a capacitor or a copper ring, rather than arriving down the wire.`
    },
    naming: `A motor that uses a capacitor to shift the timing of a second winding is a **capacitor-start motor**, and the far cruder trick of a copper ring around part of each pole is a **shaded-pole motor** — inefficient, cheap, and still used in millions of fans and small pumps. The huge current drawn by a stationary motor is **locked-rotor** or **inrush** current. One honest note: a fan genuinely does not cool a room, and the arithmetic is unforgiving — every watt it draws becomes heat in the room it is standing in, so a fan running in an empty room warms the house very slightly. What it does is move air across skin, which carries heat away from **you** far faster. That is an entirely real effect and it is worth knowing it works on people rather than on rooms.`,
    formalNames: {
      terms: [
        { term: `Capacitor-start motor`, meaning: `A single-phase motor with a second winding fed through a capacitor to shift its timing and fake a rotating field. The capacitor is what usually fails.` },
        { term: `Shaded-pole motor`, meaning: `The cheapest solution: a copper ring round part of each pole delays the field there. Wasteful, feeble, and nothing to wear out.` },
        { term: `Inrush current`, meaning: `What a stationary motor draws before it generates any back-EMF. Several times the running figure, and the cause of dipping lights.` },
        { term: `Duty cycle`, meaning: `The fraction of the time something actually runs. A fridge's badge says 150 W; what it costs depends on how much of the day it spends running.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've noticed.`,
    items: [
      `Lights dipping when the fridge or air conditioning starts.`,
      `A fridge that hums but will not start.`,
      `A ceiling fan with a reverse switch on the body.`,
      `A bathroom fan that takes a moment to get going.`,
      `A fridge's coils being warm at the back.`,
      `An old fan that runs more slowly than it used to.`
    ],
    builder: {
      body: `Here is a diagnosis you can now make. If a fridge, a pump or a compressor **hums loudly but does not turn**, and giving the fan or pulley a nudge sets it running normally, the starting capacitor has almost certainly failed. The motor is perfectly fine — it has simply lost its fake second phase, so it has no reason to choose a direction, and your nudge supplied the reason. Do not open a fridge's electrical compartment, because a start capacitor can hold a dangerous charge long after it is unplugged. But you can now tell a repair person what you think it is, and be right, and that is a different conversation from "it stopped working."`
    },
    ownPlaceholder: `Something with a motor in it that behaved oddly…`,
    synthesis: `That nudge test is the whole lesson in one gesture. You are supplying by hand exactly what the capacitor was supposed to supply electrically — a reason to turn one way rather than the other — and the motor does the rest perfectly well without it.`
  },

  feynman: {
    line: `Teach it back — your choice of object again.`,
    instruction: `Pick either one and explain what happens from the moment it switches on. **Use any words you like.** If you can get as far as why it chooses a direction, you have gone further than most people ever do.`,
    unrestricted: true,
    bannedNote: `no banned words this week — go as far as you can instead`,
    placeholder: `When the thermostat closes, the motor is sitting still, so…`,
    checks: [
      `A stationary motor draws far more than a running one, and you said why.`,
      `A single supply alone gives the rotor no reason to prefer a direction.`,
      `Something inside manufactures a second, out-of-step push to settle it.`,
      `Once it is up to speed it opposes its own supply and the current falls.`
    ],
    closing: `If you got the fourth one, you have explained both the dipping lights and why the fridge is quiet a second later — two everyday observations from one idea.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a summer habit, and one about a number on a badge.`,
    prediction: {
      question: `You leave a ceiling fan running in an empty room all day to keep it cool. What actually happens to the room?`,
      options: [
        {
          id: 'warmer',
          text: `It gets very slightly warmer.`,
          verdict: `Correct, and it follows from Physics I's conservation with no electrical subtlety at all. The fan draws about 70 watts. That energy goes into moving air, the moving air is slowed by friction against itself, the walls and the furniture, and every last bit of it ends as heat in that room. Nothing leaves. You have installed a very small, very inefficient heater with a draught. The fan is still worth having — moving air across skin carries heat away from a person far faster than still air does — but it works on people, not rooms, and in an empty room it is doing the opposite of what was intended.`
        },
        {
          id: 'cooler',
          text: `It gets cooler — that is what fans are for.`,
          verdict: `This is the universal assumption and it is why fans get left on in empty rooms. But ask where the heat would **go**. A fan has no outside, no refrigerant, no exhaust — it is a motor and some blades in a sealed room, and it cannot move heat out through a wall. An air conditioner can, because it has a hot end hanging outside the building. A fan simply stirs. What it genuinely does is sweep still, warm, humid air away from skin and replace it, which makes a person feel several degrees cooler while the thermometer on the wall does not move.`
        },
        {
          id: 'nothing',
          text: `Nothing measurable — 70 watts is far too small to matter.`,
          verdict: `In practice very nearly right, and worth saying so: 70 watts in a room is comparable to one person sitting in it, and it will be swamped by the sun on the window. But "too small to measure" is a different claim from "it cools the room", and the direction matters more than the size here. Over eight hours those 70 watts are 0.56 kWh deposited in the house, which your air conditioning will then pay again to remove. Switching a fan off in an empty room is one of the few energy-saving habits where the reasoning is completely watertight.`
        }
      ]
    },
    open: {
      question: `A fridge's badge says about 150 watts and an electric kettle's says 3,000. Yet over a year the fridge usually costs far more to run than the kettle. How?`,
      placeholder: `It must be about how long each one is actually on…`,
      reveal: [
        `Because a badge is a **rate** and a bill counts a **total** — Lesson 6, arriving in the kitchen. The kettle draws twenty times as hard but runs for perhaps four minutes a day: 3,000 W × 0.07 h is about 0.2 kWh. The fridge draws far less but runs perhaps a third of every hour of every day, all year: 150 W × 8 h is about 1.2 kWh a day, six times the kettle's.`,
        `This is the single most useful habit the course can leave you with, and it costs nothing: whenever you see a wattage, immediately ask **how many hours**. The answer reorders almost every intuition people have about their electricity bill. The things that feel expensive are the dramatic, brief ones — the kettle, the shower, the toaster. The things that actually dominate are the quiet, constant ones: refrigeration, heating, hot water, and anything that is never switched off.`,
        `It also tells you where effort is worth spending. Replacing a fifteen-year-old fridge can genuinely change a bill, because it runs every hour of every day and efficiency compounds across all of them. Being careful with the kettle cannot, however virtuous it feels, because there are only so many cups of tea in a day. Tomorrow we go out to the car, where a generator and a motor turn out to be the same machine being used in two directions on the same vehicle.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `Something in my own home I now think I could explain:`,
    placeholder: `I'd never thought about why…`,
    mapFooter: `Still nothing new. The map is mostly recombination now.`,
    tomorrow: `Tomorrow, Lesson 28 — out to the car. There is a generator under the bonnet that is quietly three-phase, and in a hybrid there is a motor that becomes a generator every time you lift off the accelerator. Same machine, both directions, and you have known the principle since Week 3.`
  },

  routes: [
    { id: 'analogy', body: `Pushing a child on a swing can never make the swing go round, however hard you push — a back-and-forth push produces an oscillation and nothing else. To get rotation you need pushes arriving in sequence at different points, like people round a revolving door. A single-phase motor is a swing being asked to behave like a revolving door, and the capacitor is a second person standing at the next position.` },
    { id: 'object', body: `Look at the back of a fridge for a small cylindrical can wired to the compressor — that is usually the start capacitor, and it is one of the commonest failures in any household appliance. A motor that hums without turning has almost always lost that part rather than the motor itself, which is why the repair is often cheap and the diagnosis is worth knowing.` },
    { id: 'story', body: `The shaded-pole motor was patented in 1890 and is still made in enormous numbers, despite being perhaps 20% efficient. It survives because it is spectacularly cheap and has nothing that can wear out — no capacitor, no centrifugal switch, no brushes. For a bathroom fan that runs ten minutes a day, nobody has ever been able to justify anything better.` },
    { id: 'experiment', body: `Watch a lamp on the same circuit as your fridge and wait for the compressor to start. If the lamp is an old filament one you will see a clear dip; if it is a good LED you may see nothing at all, because its driver holds its output steady through a brief sag. That difference is itself a measurement — you are comparing how two lamps respond to a voltage you cannot see.` },
    { id: 'smaller', body: `Forget capacitors and poles. Two sentences: a motor running on one supply has no reason to turn one way rather than the other, so something inside has to give it one. A stationary motor also draws enormously more than a running one, which is why the lights dip for an instant and then recover.` },
    { id: 'backward', body: `Start from a fact you can test: a fridge that hums but will not turn will often start if you nudge the fan with a finger, and then run perfectly for hours. What can a nudge possibly supply that 120 volts could not? Not energy — the supply has plenty. It supplies a **direction**. Work backwards from that and you arrive at everything in this lesson.` }
  ],

  map: [
    { name: `Seeing it in the world`, level: 4 },
    { name: `Motors`, level: 5 },
    { name: `Three-phase`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `A circuit is a loop`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Induction`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
