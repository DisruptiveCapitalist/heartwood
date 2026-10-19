// Electricity & Energy · Week 3 · Lesson 15 — the whole journey.
//
// The week's closing lesson, and deliberately an assembly rather than anything
// new. Every stage in the simulation names the lesson it came from:
//
//   1  the turbine        mechanical            Physics I
//   2  the generator       20 kV, 60 Hz         Lesson 13
//   3  step-up            400 kV                Lesson 9
//   4  the line           400 kV, 0.6% lost     Lesson 5
//   5  the substation      11 kV                Lesson 9
//   6  the pole              120 V              Lesson 9
//   7  your socket           120 V AC           Lessons 7 and 8
//
// Three voltage changes, all made by the same device at three different scales:
// 20 kV up to 400 kV, down to 11 kV, and down to 120.
// The 0.6% figure is the same one Lesson 9 measured off the transformer
// simulation at 400 kV, so the two agree by construction rather than by luck.
//
// Typical North American figures. The voltages differ elsewhere; the sequence
// does not.

export default {
  id: 'lesson-15',
  number: 5,
  week: 3,
  title: `From the power plant to your wall`,
  openingQuestion: `Somewhere a few hundred miles from you, water is boiling. The steam is turning a shaft, and about a fifteenth of a second later a lamp in your house is brighter for it. Nothing is stored along the way and nothing waits. Can you now name every single thing that happens in between — and say which lesson taught you each one?`,
  concept: `Nothing new`,

  see: {
    voice: 'professor',
    line: `{name}, step through all seven stages. Read the right-hand column as you go — it tells you where you met each one. Nothing today is new.`,
    simulation: { id: 'grid-journey' },
    observations: [
      { text: `Seven stages, and the voltage is changed **three times** — 20 kV up to 400 kV, down to 11 kV, down to 120. Every one of those three is the same device, a transformer.` },
      { text: `The long-distance line at **400 kV loses 0.6%** of what it carries. That is the figure Lesson 9 measured, and it is the entire justification for the step-up before it.` },
      { text: `**Every stage names a lesson you have already done.** The turbine is Physics I, the generator is Lesson 13, the transformers are Lesson 9, the line's heat is Lesson 5, the socket is Lessons 7 and 8.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and today they are a summary rather than a revelation. That is the point.`,
    sentences: [
      `The grid is a **single mechanical system stretched across a continent**. The turbine, the generator, the line and the motor in your fridge are all connected at this instant, and when you switch something on, the extra torque is felt by spinning machines hundreds of miles away within a second. Nothing is stored. The electricity you used this evening was being made as you used it.`,
      `Everything that looks complicated about it follows from **one square**. Heat lost in a wire is the current squared times the resistance, so long-distance transmission must use the smallest possible current, so it must use the highest practical voltage — and that is why the countryside is full of pylons at a voltage nobody's house ever receives. The entire visible appearance of the grid comes from I²R.`,
      `And the thing that makes it possible is that **voltage can be traded for current almost for free**, with no moving parts, by induction — the discovery of this week. The square made high-voltage transmission necessary; induction made it possible; and only alternating current can be transformed. Those three facts, in that order, are the design of every grid on Earth.`
    ],
    sequence: {
      label: `ONE WATT, FROM THE BOILER TO THE LAMP`,
      note: `follow it the whole way — and notice that none of it is new`,
      steps: [
        { name: `Steam turns a shaft`, body: `Heat becomes rotation, at an efficiency Physics I already settled: around 40% for the best thermal plant, because of thermodynamics rather than poor engineering.` },
        { name: `The shaft generates`, body: `A coil turning in a magnetic field, 3,600 rpm, 60 Hz, around 20,000 volts. **Lesson 13.** The frequency is the rotation speed and nothing else.` },
        { name: `A transformer steps it up`, body: `To 400,000 volts, with the current falling by the same factor. **Lesson 9.** One per cent is paid here to avoid losing forty in the line.` },
        { name: `It crosses the country`, body: `Bare wires held far apart on pylons, because at this voltage the air is the insulation. 0.6% lost as heat. **Lesson 5**, scaled up by a factor of a million.` },
        { name: `Down at a substation`, body: `To 11,000 volts for local distribution — shorter distances, so a lower voltage is affordable. The humming compound behind a fence. **Lesson 9** again.` },
        { name: `And down on the pole`, body: `The grey cylinder or the green box, serving perhaps fifty houses, to 120 volts. **Lesson 9** a third time, at a thousandth of the scale.` },
        { name: `Into your lamp`, body: `Through the breaker panel, the outlet's three holes and the switch that completes the circle. **Lessons 1, 2, 7 and 8.** And the filament is Lesson 5 one final time.` }
      ]
    },
    comparison: {
      label: `WATER, AND WHY THE COMPARISON FINALLY BREAKS`,
      body: `Through most of this course a water analogy has been allowed to do real work: voltage as pressure, current as flow, resistance as a narrow pipe. For the grid it holds for one more step — a reservoir high up, mains under pressure, narrow pipes to each house — and then it breaks irreparably, in a way worth naming now that you know enough to see it. A water system **stores**. The reservoir holds days of supply, so demand and supply need never match exactly. The grid stores essentially nothing: generation must equal consumption at every instant, continent-wide, and the only buffer is the kinetic energy of spinning metal, which is measured in seconds. *Where the analogy stops, finally:* no plumber has to boil more water the instant you open a tap. Every time you switch on a kettle, somewhere a turbine is fractionally harder to turn and a valve opens to compensate. That is why the grid is the largest machine ever built and why its frequency is watched continuously.`
    },
    naming: `The high-voltage long-distance network is **transmission**; the lower-voltage local network is **distribution**, and the two words are not interchangeable in the industry. The requirement that generation match consumption at every instant is **balancing**, and the frequency is the signal it is judged by. The whole interconnected system is a **grid** or an **interconnection** — North America has a handful of them, and they are not all synchronised with each other. One honest note: the figures in the simulation are typical rather than universal. Transmission runs anywhere from 115 kV to 765 kV, distribution from 4 kV to 35 kV, and most of the world delivers 230 volts to the house rather than 120. The sequence is the same everywhere; only the numbers move.`,
    formalNames: {
      terms: [
        { term: `Transmission and distribution`, meaning: `The high-voltage long-distance network, and the lower-voltage local one. Different voltages, different hardware, different names.` },
        { term: `Balancing`, meaning: `Keeping generation equal to consumption at every instant, because the grid stores almost nothing. Judged by the frequency.` },
        { term: `Grid or interconnection`, meaning: `A set of generators and loads all turning in synchronism. The largest machine ever built, and there are only a few of them.` },
        { term: `I²R`, meaning: `Heat lost in a wire: current squared times resistance. The single equation that decided the physical appearance of the entire electrical world.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you pass regularly.`,
    items: [
      `Pylons crossing open country.`,
      `A substation humming behind a fence.`,
      `The grey cylinder on a pole outside a house.`,
      `A cooling tower or a dam with a power house at its foot.`,
      `The meter on the outside of your own house.`,
      `Lights across a whole street going out at once.`
    ],
    builder: {
      body: `The walk worth taking this week is backwards. Start at a socket in your house and work outward: to the breaker panel, then the meter, then the service cable leaving the building, then the pole or the pavement box it goes to, then the line that feeds that, and as far as you can follow before it disappears into a substation. Say what each step is doing as you pass it, out loud if nobody is about. You should be able to name every object and say which lesson explains it. Where you cannot, that is a precise question rather than a vague feeling of not understanding — and a precise question is the most valuable thing you can take into Week 4.`
    },
    ownPlaceholder: `Something on the way to my house I'd never looked at properly…`,
    synthesis: `That walk is the measure of the week, and of the course so far. Three weeks ago a pole transformer was street furniture. Now it is the last of three voltage changes, and you know what the thickness of the cables either side of it tells you.`
  },

  feynman: {
    line: `Teach it back — and today this is the week's examination.`,
    instruction: `Narrate the entire journey from a boiler to a lamp in your house, naming every stage — **without using the words "transformer" or "magnetic."**`,
    banned: ['transformer', 'magnetic'],
    bannedNote: `one of those came back — and the whole journey can be told with coils, spinning and push`,
    placeholder: `Steam pushes a wheel round, and the wheel is attached to…`,
    checks: [
      `Something turns a shaft, and a coil spinning near magnets makes the electricity.`,
      `The push is traded upward so the flow can be small, because the heat lost depends on the flow squared.`,
      `It crosses the country at enormous push, then the trade is reversed in stages on the way in.`,
      `What arrives alternates sixty times a second, and none of it was stored anywhere.`
    ],
    closing: `If you got all four, you can stand under a pylon and narrate the whole thing. That was the aim of the week, and it is now done.`
  },

  challenge: {
    voice: 'editor',
    line: `One about where your electricity was a minute ago, and one that opens Week 4.`,
    prediction: {
      question: `You switch on a 100-watt lamp. Where was that energy **one minute** before you switched it on?`,
      options: [
        {
          id: 'stored',
          text: `Stored somewhere on the grid, waiting to be used.`,
          verdict: `Almost everybody assumes this, and it is the single biggest misconception about electricity supply. The grid stores essentially nothing — there is no tank, no reservoir, no buffer of any size. The only energy actually held in the system is the kinetic energy of spinning rotors, which amounts to a few seconds of national demand, and that is a shock absorber rather than a store. Batteries and pumped hydro are being added precisely because this is a real problem, and at present they cover a small fraction of demand for a short time.`
        },
        {
          id: 'fuel',
          text: `Still in the fuel, or the river, or the wind. It was made when you asked for it.`,
          verdict: `Correct, and it is worth sitting with how strange it is. A minute before you switched the lamp on, that energy was chemical bonds in coal or gas, or water behind a dam, or wind that had not yet arrived. When you closed the switch, the generators got very slightly harder to turn, the frequency dipped by a hair, a governor opened a valve, and marginally more fuel was burned. The system is a continent-wide chain of real-time conversion, and your light switch reaches all the way back to the boiler.`
        },
        {
          id: 'wires',
          text: `In the wires themselves — they are full of electricity.`,
          verdict: `The wires are indeed full of charge, and Lesson 1 made exactly that point — the electrons are already there, which is why the lamp does not wait. But charge sitting in a wire is not energy any more than water standing level in a pipe is. What delivers energy is the **push**, and that push exists only while something upstream is actively generating it. The wire is the mechanism of delivery, not the stock.`
        }
      ]
    },
    open: {
      question: `Every stage of this week's journey depends on something **spinning**. A solar panel has no moving parts whatever — nothing turns, nothing is hot, there is no shaft. So how could it possibly feed a grid whose frequency is defined by rotation?`,
      placeholder: `It would have to produce something that looks like what the spinning makes…`,
      reveal: [
        `By imitation, and with considerable difficulty. A panel produces direct current at a steady voltage — no cycles, no frequency, nothing alternating at all. Between the panel and the grid sits an **inverter**, which chops and shapes that DC electronically into a sine wave matched to the grid's 60 Hz, and which must watch the grid continuously to stay exactly in step with it. Week 5 is largely about that device.`,
        `And it inherits a problem from yesterday. A spinning generator resists a sudden rise in demand automatically, because thousands of tonnes of steel do not slow down quickly — that inertia is physics, with nothing deciding anything. An inverter has no mass and therefore no such instinct; it only does what it is programmed to do, which is why grids with a great deal of solar need **synthetic inertia** written into the software.`,
        `So Week 4 goes right to the other end of the subject. No turbines, no coils, no rotation — just light arriving on silicon and knocking something loose, and a cleverly built one-way door that stops it falling back. That is the whole of a solar panel, and after three weeks of machinery it will feel like a different subject. It is not. The energy still has to come from somewhere, the losses are still heat, and the square still rules the wires.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop. End of the week — take a moment with this one.`,
    prompt: `The stage of the journey from the power plant to my wall that I understand best now, and the one I'd still like to see for myself:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Halfway. Fifteen lessons done, and the whole path from a boiler to a lamp is now yours.`,
    tomorrow: `Next week, Lesson 16 — and no moving parts at all. Light falls on a piece of silicon and knocks something loose, and a one-way door built into the material stops it falling back. Everything about a solar panel follows from those two sentences.`
  },

  routes: [
    { id: 'analogy', body: `A city's water supply, right up to the point where it stops working as a comparison. Reservoir, trunk mains under high pressure, local mains, a narrow pipe to each house, a tap. Same shape, same logic of trading pressure for flow. The difference is the reservoir: water systems hold days of supply, and the grid holds about five seconds. Everything difficult about running a grid comes from that one missing tank.` },
    { id: 'object', body: `Your electricity meter is the boundary marker of this whole journey. Everything on the far side of it is the grid's problem — pylons, substations, the turbine, the fuel. Everything on your side is Week 1 and 2's circuits. Stand at it and you are standing at the join between the two halves of this course, and the number ticking over is the kilowatt-hours of Lesson 6.` },
    { id: 'story', body: `The first grid, at Pearl Street in Manhattan in 1882, served about a square mile with direct current and could not have served more, because without transformers the voltage could not be raised and the losses ate everything beyond a few streets. Within fifteen years alternating current and transformers had turned that square mile into a region. The difference between those two systems is Lesson 9, and nothing else.` },
    { id: 'experiment', body: `Pick an evening and watch the lights when something heavy starts — a well pump, an air conditioner, a workshop machine. The brief dip is the stall current of Lesson 12 pulling the voltage down across your whole house. Now consider that the same event, multiplied by millions of houses, is what grid operators watch the frequency for. You can see the small version from your armchair.` },
    { id: 'smaller', body: `Forget the stages. One sentence: something spins, that makes electricity, the push is traded upward so the flow can be small enough to send a long way, and then traded back down near your house. That is the whole grid. The three voltage changes are all the same device, and the reason for all of them is that heat depends on the flow squared.` },
    { id: 'backward', body: `Start at the lamp and work out rather than in. The lamp needs 120 volts, so something nearby must supply 120 — the pole transformer. That needs a few thousand volts to work from, so something supplies that — the substation. That needs hundreds of thousands, so something supplies that — the step-up at the station. And that needs something turning. Each stage exists only because the next one down needs it.` }
  ],

  map: [
    { name: `The grid`, level: 5 },
    { name: `Induction`, level: 5 },
    { name: `Generators`, level: 5 },
    { name: `Motors`, level: 5 },
    { name: `Magnetic field`, level: 5 },
    { name: `Magnetism`, level: 5 },
    { name: `AC and DC`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
