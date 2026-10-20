// Electricity & Energy · Week 6 · Lesson 28 — out to the car.
//
// Two objects, and between them the whole of Week 3 used in both directions on
// the same vehicle.
//
// The alternator is the lesson's quiet surprise: it is genuinely three-phase,
// which almost nobody realises. Three sets of windings, three voltages 120°
// apart, and then six diodes turning all of it into the DC a battery needs.
// Lesson 25 said three-phase is how electricity is generated rather than
// something done to it afterwards, and there is one under the bonnet of
// essentially every car ever built since the 1960s.
//
// The hybrid's brakes are Lesson 12 and Lesson 13 being the same machine. Lift
// off and the motor becomes a generator; the resistance you feel is the current
// being pushed on by the field, and it is coming out as charge rather than as
// brake dust. Physics I spent a week on the kinetic energy that an ordinary car
// throws away at every stop, and this is where it stops being thrown away.
//
// The honest limit is worth stating: regenerative braking cannot do an
// emergency stop. Friction brakes are still fitted, still legally required, and
// still what actually stops the car when it matters.

export default {
  id: 'lesson-28',
  number: 3,
  week: 6,
  title: `A car's alternator and a hybrid's brakes`,
  openingQuestion: `There is a generator under the bonnet of every car, and it has a feature almost nobody knows about. And in a hybrid there is a machine that is a motor on the way up to speed and a generator on the way back down — the same machine, the same week of this course, used in both directions within a few seconds of each other.`,
  concept: `The same machine, both ways`,

  see: {
    voice: 'professor',
    line: `Your list first. For the alternator, ask what shape the electricity is when it leaves the windings — and what has to happen to it before a battery will take it.`,
    simulation: {
      id: 'object-inspector',
      props: {
        prompt: 'What is the electricity doing in here?',
        objects: [
          {
            id: 'alternator', label: "A car's alternator", shape: 'alternator',
            physics: [
              { concept: 'Spin makes electricity', lesson: 13, note: 'A belt from the engine turns it. Coils moving past a magnetic field, exactly as Faraday had it — the engine is paying for every watt.' },
              { concept: 'It is three-phase', lesson: 25, note: 'Three sets of windings, 120° apart. Almost nobody knows this, and it is there for the same reason a factory uses it: smooth, compact, efficient.' },
              { concept: 'Six diodes make it DC', lesson: 17, note: 'A battery will not take alternating current, so a bridge of PN junctions folds every half-cycle the same way up. Junctions again, doing a third job.' },
              { concept: 'Loaded, it is harder to turn', lesson: 13, note: 'Switch on headlights, heater and demister at idle and a small engine audibly labours. You are feeling the current being pushed on by the field.' },
              { concept: 'The field is adjustable', lesson: 14, note: 'A regulator varies the current in the rotor’s electromagnet, so the output voltage stays at about 14 V whatever the engine speed. Lesson 14, controlling Lesson 13.' }
            ]
          },
          {
            id: 'hybrid', label: "A hybrid's brakes", shape: 'hybrid',
            physics: [
              { concept: 'The motor becomes a generator', lesson: 13, note: 'Lift off and the machine that drove the wheels is driven by them instead. Nothing switches over mechanically — only the electronics change their mind about which way power should flow.' },
              { concept: 'The drag is the current', lesson: 12, note: 'The retarding force you feel is the field pushing back on the current you are now making. Draw more current, brake harder — and it is all under software control.' },
              { concept: 'Into the battery, as ions', lesson: 22, note: 'The energy ends as lithium ions pushed back to the graphite side. The spring is being rewound by the car slowing down.' },
              { concept: 'The inverter decides', lesson: 24, note: 'Switching at thousands of times a second sets how much current flows, and therefore how hard the car brakes. The brake pedal is partly a request to software.' },
              { concept: 'Friction brakes are still there', lesson: 'Physics I', note: 'Regeneration cannot do an emergency stop, and below walking pace it does almost nothing. The discs remain, and they remain the thing that actually stops you.' }
            ]
          }
        ]
      }
    },
    observations: [
      { text: `A car's alternator is **three-phase** — three windings 120° apart, exactly as Lesson 25 described, with six diodes turning the result into the DC a battery will accept.` },
      { text: `A hybrid's motor and generator are **not two machines**. Lift off the accelerator and nothing changes mechanically; only the electronics change their mind about which way power should flow.` },
      { text: `And the drag you feel is the **current itself** — the field pushing back on what you are now generating. The brake pedal is partly a request to software.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first is Week 3's whole claim arriving in a car park.`,
    sentences: [
      `A motor and a generator are **one machine**, and which it is depends only on whether you are supplying the electricity or the spin. In a hybrid this is not a metaphor or a close analogy — it is the same lump of iron and copper, bolted in one place, doing both jobs within seconds of each other, with no clutch and no changeover. Only the electronics decide which direction the power flows.`,
      `An alternator is the same fact in the older, simpler direction: the engine supplies the spin and electricity comes out. And it comes out **three-phase**, because that is simply what a rotating machine with three sets of windings produces — then six diodes fold it into DC, because a battery will not accept anything else.`,
      `In both cases the thing you can **feel** is the current. Load an alternator and the engine labours; draw more current from a hybrid's motor and the car slows harder. In each case the mechanical resistance and the electrical current are the same event seen from two ends, which is the single idea Week 3 was built on.`
    ],
    sequence: {
      label: `WHERE THE ENERGY GOES WHEN A CAR SLOWS DOWN`,
      note: `follow it twice — once in an ordinary car, once in a hybrid`,
      steps: [
        { name: `A moving car holds energy`, body: `Physics I called it kinetic energy, and at speed it is a substantial amount. Stopping means getting rid of all of it, somehow.` },
        { name: `Ordinary brakes make heat`, body: `Pads rub discs, the discs get hot, the heat blows away into the air. Every stop converts the whole lot into warm air, and it is gone.` },
        { name: `A hybrid asks for it back`, body: `The motor is spun by the wheels and becomes a generator. The current it makes has to be pushed against the field, and that push is what slows the car.` },
        { name: `Harder braking, more current`, body: `The software increases the current it draws, the retarding force rises in proportion, and the pedal feels like an ordinary brake pedal throughout.` },
        { name: `It ends as rewound chemistry`, body: `Lithium ions pushed back across to the graphite side. The car's motion has become a wound spring, available again in a minute or two.` },
        { name: `But not all of it, and not always`, body: `Below walking pace there is too little to be worth taking, and in an emergency stop the friction brakes must do the work. Expect perhaps half back in town, and far less on a motorway where you rarely stop at all.` }
      ]
    },
    comparison: {
      label: `A BICYCLE DYNAMO YOU CAN TURN UP`,
      body: `An old bicycle dynamo rubbing on the tyre makes the bike noticeably harder to pedal, and everyone who had one knew it — switching the light on was something you felt in your legs. That drag is not friction in the dynamo; it is the current you are generating being pushed on by the magnetic field, and it is the price of the light. Now imagine a dial that let you choose how much current to draw: at zero the bike coasts freely, and turned up it drags hard enough to slow you down a hill without touching the brakes, with the energy going into a battery instead of into your lamp. That dial is what a hybrid's software has, and the brake pedal is how you ask for it. *Where the analogy stops:* a dynamo's drag is a nuisance, something to be tolerated for the light. In a hybrid the drag is the **product** — you wanted to slow down anyway, so the braking is free and the electricity is a refund on energy you were about to throw away.`
    },
    naming: `Turning alternating current into direct current is **rectification**, and the six-diode arrangement in an alternator is a **three-phase bridge rectifier**. The part that holds the output near 14 V regardless of engine speed is the **voltage regulator**, and it works by varying the current in the rotor's **field winding** rather than by wasting the excess. Slowing a vehicle by generating is **regenerative braking**, and a system that blends it smoothly with the friction brakes under one pedal is **brake blending**. One honest note on the numbers: regeneration typically recovers something like 15 to 30% of a vehicle's total energy use over a mixed journey, and much more of the braking energy specifically in stop-start traffic. Claims much above that are usually quoting the best case for a single deceleration rather than a journey.`,
    formalNames: {
      terms: [
        { term: `Rectification`, meaning: `Turning AC into DC. Six diodes in an alternator fold all three phases the same way up, because a battery accepts nothing else.` },
        { term: `Field winding`, meaning: `The electromagnet in an alternator's rotor. Varying its current varies the output, which is how 14 V is held at any engine speed.` },
        { term: `Regenerative braking`, meaning: `Slowing by generating. The retarding force is the current being pushed on by the field, and it goes to the battery instead of the air.` },
        { term: `Brake blending`, meaning: `Software mixing regeneration and friction under one pedal, so the driver feels a normal brake while the split changes continuously.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've felt or seen.`,
    items: [
      `An engine note dipping when you switch on headlights at idle.`,
      `A battery warning light on a dashboard.`,
      `A hybrid or electric car slowing firmly when you lift off.`,
      `Brake discs on an electric car that look rusty and unused.`,
      `A squealing belt on a cold morning.`,
      `A bicycle dynamo that made pedalling harder.`
    ],
    builder: {
      body: `The rusty discs are a genuinely good observation and you can make it in any car park. Look at the brake discs of an older hybrid or electric car and compare them with a petrol car of the same age: they are often visibly rustier and less worn, because they are used so much less. Manufacturers have had to design around this — some cars deliberately apply the friction brakes occasionally to scrub the rust off, because discs that are never used corrode and then perform badly on the one occasion they are needed. That is a maintenance problem created entirely by solving an energy problem, and it is a good example of engineering being a chain of consequences rather than a single clever idea.`
    },
    ownPlaceholder: `Something in a car I'd never thought about electrically…`,
    synthesis: `The engine-note dip and the bicycle dynamo are the same measurement by two means. In both cases you are sensing, through your legs or your ears, how much current is being drawn — because the current and the mechanical drag are not two things.`
  },

  feynman: {
    line: `Teach it back — your choice.`,
    instruction: `Explain either how a car charges its own battery, or how a hybrid slows down without using its brakes. **Use any words you like**, and go as far as you can before you stop.`,
    unrestricted: true,
    bannedNote: `no banned words — see how far the explanation runs instead`,
    placeholder: `The engine turns a belt, and the belt turns something that…`,
    checks: [
      `Something is being spun, and spinning it near magnets produces electricity.`,
      `Taking more electricity out makes the thing physically harder to turn.`,
      `That resistance is useful in one case and a cost in the other.`,
      `And a machine that generates when spun is the same machine that spins when fed.`
    ],
    closing: `That last check is the one Week 3 was built on, and if you reached it from a car rather than from a diagram, it has properly landed.`
  },

  challenge: {
    voice: 'editor',
    line: `One about where regeneration earns its keep, and one about a tempting idea.`,
    prediction: {
      question: `Where does regenerative braking recover the **most** energy?`,
      options: [
        {
          id: 'town',
          text: `Stop-start traffic in a town.`,
          verdict: `Correct, and it inverts the usual intuition about efficient driving. Regeneration recovers energy from **slowing down**, so it earns its keep wherever you do a lot of it — and nowhere involves more braking than city traffic. This is why hybrids and electric cars quote better city figures than motorway ones, exactly the opposite of a petrol car, which is at its worst in town because it idles, accelerates repeatedly and converts every single stop into brake heat. The two technologies are efficient in opposite places, and it comes down to what happens to the kinetic energy at each stop.`
        },
        {
          id: 'motorway',
          text: `On a long motorway drive, where there is the most energy involved.`,
          verdict: `There is certainly the most kinetic energy, since it rises with the square of speed — but regeneration cannot touch energy you never give up. On a motorway you accelerate once and hold speed for an hour, and what you are fighting is air resistance, which takes your energy away irrecoverably into turbulence behind the car. There is almost nothing to brake for. A hybrid on a motorway is close to an ordinary car carrying a heavy battery, which is why its motorway figures are its least impressive ones.`
        },
        {
          id: 'hills',
          text: `Going down a long hill.`,
          verdict: `This is the best of the alternatives and it genuinely works — a long descent can put a useful amount back, and electric lorries on mountain routes recover a great deal. But two things limit it. The battery may simply fill up, after which there is nowhere to put the energy and the friction brakes have to take over; and most journeys contain far more individual stops than long descents. Hills are the best **single** case and town traffic is the best overall, because it offers the most opportunities.`
        }
      ]
    },
    open: {
      question: `If a hybrid can recharge itself by braking, why can it not recharge itself by driving — fit a generator to the wheels and let it top up the battery as you go along?`,
      placeholder: `That sounds like it should work, but something must be wrong with it…`,
      reveal: [
        `Because the generator's drag would have to be overcome by the motor, and the motor is powered by the battery you are trying to fill. Every watt the generator produces costs the motor more than a watt to supply, because nothing is perfectly efficient. You would be running the battery down faster than you filled it, and the difference would come out as heat. It is a **perpetual motion machine** with extra steps, and Physics I spent a week establishing why no arrangement of parts has ever managed one.`,
        `What makes regenerative braking different is that it only ever takes energy you had **already decided to discard**. You wanted to slow down; that energy was going to become brake heat and be lost. Capturing some of it costs you nothing, because the slowing was the goal rather than the price. The moment you try to generate while maintaining speed, the energy stops being free and starts coming out of the battery.`,
        `This distinction is the most useful one in the whole of energy, and it is worth carrying out of this course: ask whether the energy you are capturing was **about to be wasted anyway**. Regenerative braking, waste-heat recovery and solar panels on a roof all pass that test. Generators on wheels, turbines in the ducts of an electric car and any device advertised as powering itself all fail it — and they fail it for the same reason, every time, no matter how the mechanism is arranged. Tomorrow we go back indoors and open the panel on your own wall.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `Something about a car I now understand differently:`,
    placeholder: `I'd always assumed that…`,
    mapFooter: `Week 3 and Week 5, applied to something with wheels.`,
    tomorrow: `Tomorrow, Lesson 29 — your own house, from the meter inward. The grey box on the wall, the row of switches inside it, and the question almost everybody gets wrong: what is a circuit breaker actually protecting?`
  },

  routes: [
    { id: 'analogy', body: `A bicycle dynamo you could turn up or down. At zero it spins freely and the bike coasts; turned up it drags hard, and the harder it drags the brighter the light. A hybrid has that dial, the brake pedal asks for a setting, and the energy goes into a battery instead of a lamp. The drag was always the current; it is simply useful now.` },
    { id: 'object', body: `Look at an alternator next time a bonnet is open — the ribbed belt, the aluminium casing, the fan slots. Inside are three sets of windings and six diodes, and the warning light on the dashboard means only that this part has stopped being turned. A car with a snapped belt runs until its battery is flat and then stops, which is perhaps twenty minutes.` },
    { id: 'story', body: `Cars used dynamos, which produce DC directly through a commutator, until the 1960s. Alternators replaced them everywhere once cheap silicon diodes made rectification practical — because a three-phase alternator with no commutator is smaller, lighter, longer-lived and works at idle, where a dynamo barely produced anything. The change was not about generation at all; it was about having a cheap way to turn AC into DC.` },
    { id: 'experiment', body: `In a petrol car at idle, with the handbrake on, switch on headlights, heated rear window, blower and anything else electrical, and listen. On a small engine the note drops and the idle speed dips for a moment before the engine management compensates. You are hearing the alternator become harder to turn, which is the current you have just asked for.` },
    { id: 'smaller', body: `Forget rectifiers and blending. Two sentences: spinning a motor makes electricity, and taking that electricity out makes it harder to spin. In a car's alternator that resistance is the price of your headlights; in a hybrid's brakes it is the whole point.` },
    { id: 'backward', body: `Start from the brake discs on an electric car looking rusty and barely worn. If the brakes are hardly being used, what is stopping the car? Something else must be absorbing the energy, and it has to put it somewhere. Work backwards from a rusty disc and you arrive at a motor being driven by the wheels and a battery being refilled.` }
  ],

  map: [
    { name: `Seeing it in the world`, level: 4 },
    { name: `Generators`, level: 5 },
    { name: `Motors`, level: 5 },
    { name: `Three-phase`, level: 5 },
    { name: `Batteries`, level: 5 },
    { name: `Semiconductors`, level: 5 },
    { name: `Inverters`, level: 5 },
    { name: `Induction`, level: 5 },
    { name: `AC and DC`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
