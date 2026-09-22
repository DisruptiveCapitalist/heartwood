// Physics I · Week 3 · Lesson 11 — energy transformation. Opens the week by
// returning to Lesson 1's braking car and opening the books on it.

export default {
  id: 'lesson-11',
  number: 1,
  week: 3,
  title: `Where the motion goes when a car stops`,
  openingQuestion: `In Lesson 1 a car braked and you kept going. We never asked the other question. The car was moving, and then it wasn't. Where did all that motion go?`,
  concept: `Energy transformation`,

  see: {
    voice: 'professor',
    line: `The same car as Lesson 1, with the books opened. Watch the left-hand bar empty into the right.`,
    simulation: { id: 'braking-energy' },
    observations: [
      { text: `Nothing vanishes. Every joule that leaves the car arrives somewhere, and the two sides always match.` },
      { text: `Braking gently does not reduce the total by anything at all. It only takes longer — which is Lesson 5's bargain again.` },
      { text: `Now set it to 30, then to 60. Twice the speed is not twice the energy. It is *four times*.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `This is the most important idea in the course, and it starts with a bookkeeping habit.`,
    sentences: [
      `Motion can be counted. A moving thing carries an amount that depends on how much of it there is and how fast it is going — and unlike momentum from Lesson 5, the speed counts twice over.`,
      `When the car stops, that amount is not destroyed. It is moved: into hot brake discs, into warm tires and road, into stirred-up air, into the noise. Add up what arrives and you get back exactly what left.`,
      `This is what "energy" means, and this is the only reason the word is useful. It is not a substance and not a fuel. It is a quantity that stays the same while everything about its form changes.`
    ],
    comparison: {
      label: `THE BANK TRANSFER`,
      body: `Money leaves your account and arrives in someone else's. At no point is there more or less money in the world, and at no point is the money itself travelling down a wire — what moves is an entitlement, recorded in two places. Energy behaves the same way. "The car lost its energy" is exactly as loose as "the money disappeared". It went somewhere, and if you are willing to go and look, you can find every penny.`
    },
    naming: `The motion-counted-up is **kinetic energy**, and the whole rule is the **conservation of energy**: the total never changes, only its form. Note what the simulation showed you about speed. Momentum was mass times speed. Kinetic energy is mass times speed *times speed again* — which is why doubling your speed quadruples what your brakes have to get rid of.`,
    formalNames: {
      terms: [
        { term: `Energy`, meaning: `A quantity that can move between things and change form, and whose total never changes. Measured in joules, or in calories if you are talking about food.` },
        { term: `Kinetic energy`, meaning: `The energy of motion: half the mass times the speed squared. The squared is the important part and the part everyone forgets.` },
        { term: `Conservation of energy`, meaning: `The total is the same before and after, always, with no known exception. When it looks otherwise you have not looked in enough places.` },
        { term: `Thermal energy`, meaning: `The commonest place for it to end up — the disorganised jiggling of the material itself. Lesson 13 is entirely about this.` },
        { term: `Joule`, meaning: `The unit. Lifting an apple a metre takes about one; stopping a car at 60 takes about five hundred and seventy thousand.` }
      ],
      note: `And here is the spiral: Lesson 5 said momentum goes *into the Earth* when you stop something. Energy does not. The two quantities are settled in completely different ways by the same collision, which is why physics keeps both sets of books.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Energy arriving somewhere is usually something getting warm. Where have you felt it?`,
    items: [
      `Brakes that smell hot after a long hill.`,
      `Rubbing my hands together on a cold day.`,
      `A nail that's warm after you've hammered it.`,
      `A bicycle rim hot from braking.`,
      `A phone that heats up while it charges.`,
      `The way a dropped ball never quite bounces back to my hand.`
    ],
    builder: {
      body: `Two minutes, one coat hanger or paperclip. Straighten a section of wire, then bend it back and forth at one spot, thirty or forty times, quickly. Then touch that spot to your lip — not your finger, your lip, which is far more sensitive. It is hot. You did not apply any heat. You applied motion, over and over, and the metal has been keeping it.`
    },
    ownPlaceholder: `Somewhere motion turned into warmth…`,
    synthesis: `Notice that every one of those is the same event: something organised and moving became something disorganised and warm. That direction is not an accident, and by Lesson 15 you will see why it almost never runs backwards.`
  },

  feynman: {
    line: `Follow it. Do not summarise it.`,
    instruction: `A car brakes from 60 to a standstill. Say where its motion went — **without using the words "lost" or "used up."**`,
    banned: ['lost', 'used up', 'uses up'],
    bannedNote: `nothing was lost — say where it arrived instead`,
    placeholder: `The car had something, and afterwards four other things had it…`,
    checks: [
      `The car carried an amount that depended on its mass and its speed.`,
      `Braking moved that amount somewhere rather than deleting it.`,
      `You can name where it went — chiefly the brake discs, as heat.`,
      `Adding up what arrived gives back what the car started with.`
    ],
    closing: `If your explanation makes a listener want to go and touch a brake disc, it has done its job.`
  },

  challenge: {
    voice: 'editor',
    line: `You spotted something in the simulation. Let me find out whether you know what it costs.`,
    prediction: {
      question: `You double your speed from 30 to 60 mph. Roughly how much further does it take you to stop, assuming you brake just as hard?`,
      options: [
        {
          id: 'twice',
          text: `About twice as far — twice the speed, twice the distance.`,
          verdict: `The most natural answer in the world, and it is the one that kills people. Twice the speed does mean twice as much *momentum* to remove, so if you were thinking in Lesson 5 terms you were being consistent. But stopping distance is settled by energy, not momentum, and energy goes with the speed squared. Twice the speed is four times the energy, and with the same brakes that is four times the distance. Not two. Four.`
        },
        {
          id: 'four',
          text: `About four times as far.`,
          verdict: `Correct, and it is the single most useful number anyone takes out of a physics course. Energy goes as the speed squared, so doubling the speed quadruples what the brakes must dispose of — and with the same braking force that means four times the distance. It is why the difference between 30 and 60 in a residential street is not a doubling of risk but something far worse, and why the same difference feels so mild from inside the car.`
        },
        {
          id: 'same',
          text: `About the same — the brakes are just as strong either way.`,
          verdict: `The brakes really are just as strong, and that is exactly the assumption the question gave you, so this is not a careless answer. But strength is a force, and force tells you how fast you shed energy per *foot travelled*, not how much there is to shed. At 60 there is four times as much in the car. The same force, working on four times the energy, needs four times the distance to finish the job.`
        }
      ]
    },
    open: {
      question: `Now the question that ought to bother you about the whole idea. If energy is never destroyed — if every joule that ever existed is still out there somewhere — why does a car run out of fuel? Why does anything ever run out of energy?`,
      placeholder: `The energy is still around. So what has actually run out…?`,
      reveal: [
        `Nothing ran out. The energy in a tank of petrol is still in the world after you have driven on it — it is in the warm air behind the car, the hot exhaust, the heated road, the noise that spread out and faded. Every joule is accounted for. What you no longer have is any way of *collecting* it.`,
        `That is the distinction the word "energy" hides: there is a difference between how much energy there is and how *gathered up* it is. Petrol is energy concentrated into a liquid you can pour. Warm air spread thinly over a mile of road is the identical amount, arranged so that no engine in the world can get hold of it again.`,
        `So "running out of energy" always means running out of concentration, never running out of quantity. Hold on to that, because it is the whole of Lesson 15 and, further off, most of why the universe has a direction at all.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Week 3 has started, and it is the one the brief called the most important.`,
    prompt: `The phrase "energy was lost" really means…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Energy jumped three levels today. It had been sitting at "heard of it" since Lesson 3, waiting for this.`,
    tomorrow: `Tomorrow, Lesson 12: a rock on a high shelf is not moving and not doing anything. So how can it have energy at all?`
  },

  routes: [
    { id: 'analogy', body: `Think of a removal van. Your furniture leaves the old house and arrives at the new one, and at no point does anything cease to exist — but if you only ever looked at the old house you would conclude that a great deal of stuff had simply vanished. That is what watching only the car does. The energy left the house. It did not leave the world, and the brake discs are the new address.` },
    { id: 'object', body: `Find a rubber band and stretch it hard, holding it near your lip. Now let it relax slowly and hold it there again — it is cooler. Stretch it once more and it warms. Nobody is heating anything. You are putting work in and the rubber is handing some of it straight back as warmth, in a thing you can hold between two fingers.` },
    { id: 'story', body: `A lorry driver comes down a long mountain pass riding the brakes, and at the bottom there is smoke coming off the wheels and a smell like burnt iron. He did not set fire to anything. He took a very large amount of motion out of forty tons of vehicle over six miles, and all of it had to go somewhere. It went into eight brake drums, and there was more of it than they could comfortably hold.` },
    { id: 'experiment', body: `Take a coat hanger and bend a single spot back and forth thirty times, fast. Touch the bend to your lip. It is hot — noticeably, surprisingly hot. You applied no heat whatsoever; you applied bending. The metal has converted your muscle movements into the jiggling of its own atoms, which is the whole of this lesson performed with a coat hanger.` },
    { id: 'smaller', body: `Smaller question. Forget cars. You slide a book across a table and it stops. Put your hand flat where it slid. Warm, slightly. Now: before you slid it, was that patch of table warm? No. So something arrived. Where did the book's motion go? Into the table and the book, as warmth. You have just done the whole lesson at a smaller scale, and the only difference with a car is the size of the numbers.` },
    { id: 'backward', body: `Start from a detail of racing cars: their brake discs glow orange, visibly, on television. Glowing means very hot, and very hot means a great deal of energy has arrived in a small piece of metal in a very short time. Nobody applied a flame. The only thing that happened is that the car went slower. Work backward from a glowing disc and you are forced to conclude that slowing down is a transfer, not a disappearance.` }
  ],

  map: [
    { name: `Energy`, level: 4 },
    { name: `Kinetic energy`, level: 4, fresh: true },
    { name: `Conservation of energy`, level: 3, fresh: true },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Compression`, level: 5 },
    { name: `Tension`, level: 5 },
    { name: `Momentum`, level: 4 },
    { name: `Torque`, level: 4 },
    { name: `Load path`, level: 4 },
    { name: `Mass`, level: 4 },
    { name: `Gravity`, level: 4 },
    { name: `Thermal energy`, level: 1, fresh: true }
  ]
}
