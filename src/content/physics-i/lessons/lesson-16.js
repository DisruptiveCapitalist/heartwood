// Physics I · Week 4 · Lesson 16 — temperature.
// Reuses Lesson 13's particle box with the amount of stuff made adjustable, so
// the average and the total can finally be separated by hand.

export default {
  id: 'lesson-16',
  number: 1,
  week: 4,
  title: `What temperature actually measures`,
  openingQuestion: `A thermometer reads 70°F. It is a sealed glass tube with some liquid in it, and it has never been told anything. What does a thermometer actually know about the world?`,
  concept: `Temperature`,

  see: {
    voice: 'professor',
    line: `The same box as Lesson 13, with one new dial: how much stuff is in it.`,
    simulation: { id: 'particle-box', props: { showAmount: true, showTotals: true, showHistogram: false, showPressure: false } },
    observations: [
      { text: `Add particles and the top number does not move. More stuff does not make anything hotter.` },
      { text: `Add particles and the bottom number climbs steadily. There is more jiggling in the box, and no more jiggling per particle.` },
      { text: `Two dials, two different answers. One of them is what a thermometer reads, and it is not the one about how much there is.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Lesson 13 told you warmth is motion. Today we get precise about *whose*.`,
    sentences: [
      `A thermometer does not measure how much energy is in something. It measures the average energy of one particle — how briskly the typical one is moving, however many of them there happen to be.`,
      `That is why it works at all. Push a thermometer into anything and its own particles get knocked about by the ones around it until the two sides are trading equally; then it stops changing, and the reading is the average it has settled into.`,
      `So temperature is an *intensive* quantity — a per-particle average. Total thermal energy is an *extensive* one — it depends on how much there is. Confusing the two is the commonest mistake in this whole subject.`
    ],
    comparison: {
      label: `AVERAGE INCOME`,
      body: `The average income in a town tells you nothing about how big the town is. A village of forty people can have a higher average income than a city of a million, and the city still has vastly more money in it. Nobody finds this confusing when it is money. Temperature is the average; thermal energy is the total; and a cup of boiling water is a rich village.`
    },
    naming: `The average is **temperature**. The total is **thermal energy**. And the scale that makes the relationship clean is the **absolute** one — Kelvin or Rankine — which starts where the jiggling would stop rather than at some convenient property of water. On that scale, double the temperature really does mean double the average energy, which is not true of Fahrenheit at all.`,
    formalNames: {
      terms: [
        { term: `Temperature`, meaning: `The average energy of the particles, not the total. Measured by letting something come to equilibrium with the thing you are curious about.` },
        { term: `Absolute zero`, meaning: `−459.67°F, or 0 on the Kelvin and Rankine scales. Where the jiggling would be as small as it can be. Never reached, only approached.` },
        { term: `Thermal equilibrium`, meaning: `Two things in contact settle at the same temperature, because the faster particles keep losing to the slower ones on average until the two averages match. This is why thermometers work.` },
        { term: `Heat capacity`, meaning: `How much energy something needs to raise its temperature by one degree. Water's is famously large, which is why the sea is cold in June and warm in October.` }
      ],
      note: `Nothing here contradicts Lesson 13; it sharpens it. Warmth is motion, and today you learned which statistic of that motion your thermometer is reporting.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Each of these is the difference between an average and a total. Which have you met?`,
    items: [
      `A hot cup that cools long before the radiator does.`,
      `The sea still being cold in June on a hot day.`,
      `A cake tin you can touch while the cake burns you.`,
      `Sand hot underfoot while the water is freezing.`,
      `A sparkler throwing sparks that land on my hand harmlessly.`,
      `Putting a small hot pan into a big cold sink.`
    ],
    builder: {
      body: `Five minutes, one kitchen. Run the hot tap into a mug and into the sink, both from the same tap, so both start at the same temperature. Come back in twenty minutes. The mug is cool; the sinkful is still noticeably warm. Identical starting temperature, identical room. The only difference is how much there was — and the total is what takes time to leak away, not the average.`
    },
    ownPlaceholder: `Somewhere hot and small behaved differently from warm and large…`,
    synthesis: `The sparkler is the best of these. Those sparks are at something like 1,500°F and they land on your skin without harm, because each one is a speck with almost nothing in it. Blisteringly hot, and hardly any heat.`
  },

  feynman: {
    line: `Explain it to someone holding a thermometer and looking unconvinced.`,
    instruction: `Explain what a thermometer measures — **without saying "how hot something is."** That phrase is the thing being explained.`,
    banned: ['how hot'],
    bannedNote: `that is the question, not the answer — say what is being averaged`,
    placeholder: `Everything is made of particles, and the thermometer is too…`,
    checks: [
      `Everything is made of particles that are moving, and warmer means faster.`,
      `A thermometer reads the *average* per particle, not the total amount.`,
      `It works by being knocked about until it is trading energy equally with its surroundings.`,
      `So a small hot thing and a large warm thing can hold very different amounts while reading what they read.`
    ],
    closing: `If your explanation makes it obvious why a sparkler's sparks are harmless, it has separated the two quantities properly.`
  },

  challenge: {
    voice: 'editor',
    line: `Lesson 13 asked you this and you have had a fortnight to think about it. Let me ask it harder.`,
    prediction: {
      question: `You want to warm a cold room. You may have either a cup of water at 200°F or a bathtub of water at 100°F. Which warms the room more?`,
      options: [
        {
          id: 'cup',
          text: `The cup — it's twice as hot, so it has twice as much to give.`,
          verdict: `The arithmetic on the temperatures is right, and the instinct that hotter things give out more is right in most everyday situations. But "twice as hot" is about the average particle, and warming the room is about the total. The bath has perhaps four hundred times as much water. Even giving up a smaller temperature difference each, four hundred times as many particles hand over vastly more. The cup will cool to room temperature in twenty minutes and the room will not notice.`
        },
        {
          id: 'bath',
          text: `The bath — cooler, but there is enormously more of it.`,
          verdict: `Correct, and this is the whole reason the two words exist. The cup wins on temperature and loses on quantity by a factor of hundreds. Leave a bath of hot water in a cold bathroom overnight and the room is noticeably warmer by morning; leave a cup and you will find cold tea. It is also why storage heaters are full of dense bricks and why coastal towns have milder winters than inland ones.`
        },
        {
          id: 'neither',
          text: `Neither — they'll both end up at room temperature, so it comes out the same.`,
          verdict: `Both will indeed end at room temperature, and I like that you followed it to the end state rather than stopping at the start. But the question is what happens to the *room* on the way. Everything the water gives up has to arrive somewhere, and it arrives in the air and the walls. The two objects give up wildly different amounts in getting to the same destination, and the room keeps the difference.`
        }
      ]
    },
    open: {
      question: `Then here is the one that shows whether the idea has landed. Absolute zero is the temperature at which the jiggling stops. We can get within a few billionths of a degree of it, and we have never reached it. Why not? What is so hard about the last little bit?`,
      placeholder: `How do you make something colder, in the first place…?`,
      reveal: [
        `Because of *how* you make things cold. There is no such thing as a supply of cold you can pour in. Cooling is always removing energy, and the only way to remove it is to put your object next to something colder and let the faster particles lose to the slower ones — which means you need something colder to start with.`,
        `So every method of cooling is a way of making something else the colder thing, and each one gets harder as you go down. Near absolute zero there is so little energy left to remove, and each removal takes so much more effort, that you are in a race whose steps keep shrinking. You can always take another step. There is no step that finishes.`,
        `And note what this is not: it is not that our equipment is not good enough yet. It is a consequence of what temperature *is*. If it is the average energy of the particles, then reaching zero means every last particle having exactly none, all at once — and every method available works by averages and probabilities. Absolute zero is not a place that is hard to reach. It is a place that can be approached and not arrived at.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Week 4 has started — the one you cannot see.`,
    prompt: `Temperature is different from total thermal energy because…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Temperature moved up three levels today, mostly because Lesson 13 had already built the floor under it.`,
    tomorrow: `Tomorrow, Lesson 17: a balloon full of nothing but air climbs into the sky. Something has to be pushing it up, and it is not the hot air.`
  },

  routes: [
    { id: 'analogy', body: `Think of a crowd at a football ground and a crowd in a pub. The pub crowd might be noisier *per person* — that is temperature. The football ground is far louder in total, with everybody talking more quietly — that is thermal energy. Nobody would say the pub is a louder place than a stadium, and nobody should say a cup of tea holds more heat than a bath.` },
    { id: 'object', body: `Open your oven at 400°F and put your hand in the air inside it, briefly. You can do this; people do it every day. Now touch the metal shelf. You cannot. Both are at 400°F — the same temperature, exactly. The shelf has vastly more material per cubic inch, and hands over far more energy to your skin in the same instant. Same reading, different consequence.` },
    { id: 'story', body: `A woman takes a tray of biscuits from the oven and the baking paper is fine to touch within seconds while the tray still hurts ten minutes later. She assumes the paper was somehow cooler. It was not — it came out at exactly the oven temperature. It is simply a gram of paper, holding almost nothing, while the tray is half a kilogram of steel holding a great deal.` },
    { id: 'experiment', body: `Fill a mug and a washing-up bowl from the same hot tap, at the same moment. Check both with a finger after twenty minutes. The mug is cool and the bowl is still warm. Same starting temperature, same room, same water. The only difference is how much there was, and that difference is the entire distinction between the two words.` },
    { id: 'smaller', body: `Smaller question. If you pour two identical cups of tea at 180°F into one pot, what is the temperature of the pot of tea? Still 180°F — not 360. Now: is there more heat in the pot than in one cup? Obviously, twice as much. So you have just found a quantity that doubled and one that did not, in the same act of pouring. Those are the two words.` },
    { id: 'backward', body: `Start from something odd about coastal weather. Towns by the sea have milder winters and cooler summers than towns fifty miles inland at the same latitude. The sea is not warmer in January — often it is colder than the land. What the sea has is an enormous amount of water, which takes a very long time to give up its heat and a very long time to take any on. Work backward from a weather map and you find the difference between a temperature and a quantity.` }
  ],

  map: [
    { name: `Temperature`, level: 4 },
    { name: `Thermal energy`, level: 5 },
    { name: `Molecular motion`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Conservation of energy`, level: 5 },
    { name: `Efficiency`, level: 4 },
    { name: `Energy conversion`, level: 4 },
    { name: `Potential energy`, level: 5 },
    { name: `Kinetic energy`, level: 4 },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Gravity`, level: 5 },
    { name: `Density`, level: 1, fresh: true }
  ]
}
