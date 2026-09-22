// Physics I · Week 3 · Lesson 15 — efficiency. Closes the week by cashing in
// Lesson 13's arrow of time: waste is not carelessness, it is direction.

export default {
  id: 'lesson-15',
  number: 5,
  week: 3,
  title: `Why nothing is ever 100% efficient`,
  openingQuestion: `An electric motor is given electricity and produces motion. Nothing is spilled, nothing leaks out, nobody is careless. So why doesn't every bit of the electricity become motion?`,
  concept: `Efficiency`,

  see: {
    voice: 'professor',
    line: `Four machines, the same energy going into each, drawn to the same scale. No flattering angles.`,
    simulation: {
      id: 'energy-chain',
      props: {
        unit: 'units',
        amountLabel: 'Energy going in',
        amountMin: 50, amountMax: 250, amountDefault: 100,
        caption: 'Same energy into each. The green block on the right is what you actually asked for.',
        chains: [
          {
            id: 'filament',
            label: 'An old filament bulb',
            inputLabel: 'Electricity',
            steps: [{ label: 'Filament', efficiency: 0.05, lossLabel: 'warmth' }]
          },
          {
            id: 'led',
            label: 'An LED bulb',
            inputLabel: 'Electricity',
            steps: [{ label: 'LED', efficiency: 0.40, lossLabel: 'warmth' }]
          },
          {
            id: 'car',
            label: 'A petrol car',
            inputLabel: 'Petrol',
            steps: [
              { label: 'Burning', efficiency: 0.75, lossLabel: 'exhaust' },
              { label: 'Engine', efficiency: 0.35, lossLabel: 'radiator' },
              { label: 'Gearbox', efficiency: 0.85, lossLabel: 'friction' }
            ]
          },
          {
            id: 'heater',
            label: 'An electric heater',
            inputLabel: 'Electricity',
            steps: [{ label: 'Element', efficiency: 1.0, lossLabel: '' }]
          }
        ]
      }
    },
    observations: [
      { text: `The same energy in, wildly different amounts of it coming out the far end as the thing you actually wanted.` },
      { text: `Nothing goes missing in any of them. Every red stub adds back exactly to what the machine was handed.` },
      { text: `And the old light bulb is the joke of the group: most of what it was given comes out as warmth, which is why you could never touch one.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Here is the sentence the whole week has been building to.`,
    sentences: [
      `Efficiency is not a measure of how much energy a machine keeps. It keeps none. Efficiency is the share of what went in that came out as the form you actually wanted.`,
      `The rest did not go missing and was not destroyed — it came out as something else, almost always warmth, and warmth is what Lesson 13 told you energy turns into when it stops being organised.`,
      `And that is why no machine reaches a hundred per cent. Not sloppiness, not engineering that has not caught up yet: every moving part rubs, every wire resists, and each of those quietly converts some of your organised energy into disorganised jiggling that nothing can gather back up.`
    ],
    comparison: {
      label: `MOVING HOUSE`,
      body: `You hire a van and pay for the whole day. Some of that day genuinely moves your furniture. The rest goes on driving to the depot, queuing at lights, the tea break, the wrong turn, the second trip for the thing that did not fit. None of that time was stolen and none of it vanished — it was spent, just not on the part you were paying for. An efficient move is not one where less time passes. It is one where more of the time was furniture.`
    },
    naming: `The share that comes out as what you wanted is the **efficiency**. The rest is called **waste**, which is a misleading word — it is not destroyed, and calling it waste says more about your intentions than about the energy. A car heater is the only device in the world that runs at very nearly a hundred per cent, and it does so by *wanting* the warmth everything else is throwing away.`,
    formalNames: {
      terms: [
        { term: `Efficiency`, meaning: `Useful output divided by total input, as a percentage. Always less than a hundred, and the shortfall always shows up somewhere as heat.` },
        { term: `Waste heat`, meaning: `Energy that left as warmth rather than as what you wanted. Not lost, not destroyed — merely spread too thin across too many particles to be worth collecting.` },
        { term: `Second law of thermodynamics`, meaning: `The rule underneath all of this. Organised energy scatters into disorganised energy by itself; the reverse never happens on its own. It is why efficiency has a ceiling nobody will ever engineer their way past.` },
        { term: `Perpetual motion`, meaning: `A machine that runs forever with no input, or puts out more than it takes in. Patent offices worldwide refuse to examine them, on the grounds that the century of failures is evidence enough.` }
      ],
      note: `And now Week 3 closes on itself. Lesson 11: the total never changes. Lesson 13: it scatters and will not gather back. Put those two together and efficiency below a hundred per cent stops being a disappointment and becomes a theorem.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Every one of these gets warm doing its job. Which have you noticed?`,
    items: [
      `A laptop or phone charger that's warm to the touch.`,
      `The back of the fridge, warm all the time.`,
      `An old-style bulb too hot to unscrew.`,
      `A car bonnet after a drive.`,
      `A vacuum cleaner blowing warm air out.`,
      `Me, getting hot walking uphill.`
    ],
    builder: {
      body: `Three minutes, around the house. Touch six things that are switched on — the charger, the router, the fridge's back panel, the television, a lamp, the underside of the laptop. Every single one is warmer than the room. None of them is *for* making heat. You have just taken a census of the second law of thermodynamics in your own home, using nothing but the back of your hand.`
    },
    ownPlaceholder: `Something that gets warm while doing a job that has nothing to do with heat…`,
    synthesis: `Notice the last one on the list. You are a machine too, and a fairly ordinary one: about a quarter of the energy in your food becomes movement, and the rest is why a crowded room gets warm.`
  },

  feynman: {
    line: `Explain it to someone who suspects the manufacturers are just not trying hard enough.`,
    instruction: `Explain why every real machine gets warm, and why no amount of better engineering will stop it — **without using the words "efficiency" or "waste."**`,
    banned: ['efficien', 'waste'],
    bannedNote: `those are the accounting words — say what is actually happening to the energy`,
    placeholder: `The energy that didn't do the job is still somewhere…`,
    checks: [
      `All of the energy that goes in comes out; none of it is destroyed.`,
      `Some of it comes out as something other than what you wanted.`,
      `That something is nearly always warmth — scattered motion in the material.`,
      `Rubbing and electrical resistance are unavoidable, so the scattering cannot be designed away.`
    ],
    closing: `If your explanation makes clear that a perfect machine is impossible rather than merely difficult, you have understood the week.`
  },

  challenge: {
    voice: 'editor',
    line: `The last question of the week, and it is really a question about language.`,
    prediction: {
      question: `An electric heater turns essentially 100% of its electricity into heat. A modern LED bulb manages about 40% into light. Which is the more efficient machine?`,
      options: [
        {
          id: 'heater',
          text: `The heater — a hundred per cent beats forty per cent.`,
          verdict: `Arithmetically unarguable, and this is exactly why the question is worth asking. The heater really does convert essentially everything into the form you asked for, and it genuinely is a hundred per cent efficient *at being a heater*. But notice what has quietly happened: the heater is only scoring perfectly because its goal is the thing everything else is trying not to produce. It is winning by being the one machine whose waste product is its product. Efficiency is never a property of a device alone — it is a property of a device and a purpose.`
        },
        {
          id: 'depends',
          text: `It depends entirely on what you wanted. As a heater the heater wins; as a lamp it scores zero.`,
          verdict: `That is the answer, and it is the useful one. Efficiency is a ratio with *your intention* in the denominator. Ask the heater for light and it is a terrible lamp — a hundred per cent of what it was given comes out as something you did not want. And here is the sting: an old filament bulb in winter, in a heated room, is not really wasting anything at all. Its heat is warming the room you were going to warm regardless. The same bulb in summer, with the air conditioning running, is making you pay twice.`
        },
        {
          id: 'led',
          text: `The LED — it's the newer technology and it's obviously the better machine.`,
          verdict: `Better for lighting a room, certainly, and by an enormous margin — that instinct is sound and it is why they replaced everything else. But look at how you got there: you assumed the purpose was light. Make the purpose warmth and the LED is the worse device of the two. There is no measurement you can take of a machine sitting on a bench that tells you its efficiency. You have to be told what it is for.`
        }
      ]
    },
    open: {
      question: `Then the one people have been failing at for four hundred years. If energy is never destroyed, why can't I build a machine that catches its own waste heat and feeds it back in, and so runs forever?`,
      placeholder: `The energy is right there. What's wrong with collecting it…?`,
      reveal: [
        `Because you would be trying to un-shuffle a deck. The energy is genuinely still there — that part of your reasoning is completely sound and it is where every perpetual motion inventor starts. What is gone is not the quantity but the *organisation*. It has been spread across billions of particles moving in every direction, and to feed it back in you would need them to agree to move the same way again.`,
        `Nothing forbids that. There is no law of physics that says a warm room cannot spontaneously gather its jiggling into a breeze. It is simply that there are unimaginably more ways for energy to be scattered than gathered — so overwhelmingly more that "never" is an entirely safe word. You can extract some work from heat, and engines do, but only by letting it flow from something hot to something cooler, and only ever a fraction of it.`,
        `The patent offices of Britain and the United States both refuse to examine perpetual motion machines at all. Not because the officials have checked every design, but because after a few centuries of failures it became clear that the mistake is always the same one: the inventor found some energy that was still present, and assumed that meant it was still available. Those are different things, and the whole of Week 3 has been the difference between them.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that is Week 3, the big one, finished.`,
    prompt: `"Waste" in physics often means…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Fifteen lessons. Energy, conservation and efficiency are all at "use" now — you can take a machine you have never seen and say where its energy goes.`,
    tomorrow: `That is Week 3. Week 4 goes somewhere you cannot look: the particles from Lesson 13, and what enormous numbers of them do when you heat them, squeeze them or ask them to hold up a ship.`
  },

  routes: [
    { id: 'analogy', body: `Think of pouring water between two jugs, over and over. Nothing evaporates and you never spill deliberately — but every pour leaves a film of droplets on the inside of the jug you left. After fifty pours you have noticeably less. Nobody stole any water; it is all still in the room, spread as a thin film over a lot of glass. Try to collect it back and you will see the problem immediately.` },
    { id: 'object', body: `Put your hand on the back of your fridge. It is warm, permanently, and the fridge's entire job is to make something cold. It is not failing — it is moving heat out of the inside and dumping it there, and adding its own motor's warmth on top. Your fridge is a machine that makes your kitchen hotter overall, in order to make one box in it colder.` },
    { id: 'story', body: `In 1812 a man named Redheffer exhibited a perpetual motion machine in Philadelphia and took money from crowds to see it. An engineer called Robert Fulton noticed the machine ran with a slight wobble, in time with something. He pulled away a board and found a cord running to the next room, where an old man sat turning a crank while eating bread. Two hundred years later, every such machine has had a man with a crank somewhere, even when the inventor did not know it.` },
    { id: 'experiment', body: `Right now: go and touch six things in your home that are switched on. Charger, router, television, lamp, laptop, the back of the fridge. Every one is warmer than the room, and not one of them is a heater. You are conducting a census of a law of physics with the back of your hand, and it has no exceptions anywhere in the house.` },
    { id: 'smaller', body: `Smaller question. If you push a heavy box across the floor for ten minutes, where is the energy you spent? Not in the box — it is sitting still again at the end. It went into warming the floor, the box's underside and you. Now: could you scoop that warmth up and use it to push the box back? You know you could not, and you knew it before I asked. Efficiency is just that intuition, written down carefully.` },
    { id: 'backward', body: `Start from the fact that the British and American patent offices both refuse, as policy, to consider perpetual motion machines — a standing exception to their duty to examine what they are sent. That is a remarkable thing for a patent office to do. They did not arrive at it from theory; they arrived at it from several centuries of applications that all failed in the same way. Work backward from a bureaucratic rule and you find one of the deepest laws in physics.` }
  ],

  map: [
    { name: `Energy`, level: 5 },
    { name: `Conservation of energy`, level: 5 },
    { name: `Efficiency`, level: 4, fresh: true },
    { name: `Energy transfer`, level: 4, fresh: true },
    { name: `Energy conversion`, level: 4 },
    { name: `Thermal energy`, level: 5 },
    { name: `Potential energy`, level: 5 },
    { name: `Kinetic energy`, level: 4 },
    { name: `Molecular motion`, level: 4 },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Gravity`, level: 5 },
    { name: `Electricity`, level: 3 },
    { name: `Temperature`, level: 3 }
  ]
}
