// Physics I · Week 3 · Lesson 13 — thermal energy.
// Answers the question Lesson 12's frictionless simulation deliberately left
// hanging, and introduces the particle box that Weeks 4 will lean on.

export default {
  id: 'lesson-13',
  number: 3,
  week: 3,
  title: `Heat is the place energy goes to hide`,
  openingQuestion: `Rub your hands together and they get warm. You did not apply any heat — there was no flame, no hot object, nothing warm anywhere. So where did the warmth come from?`,
  concept: `Thermal energy`,

  see: {
    voice: 'professor',
    line: `This is what the inside of anything looks like. Turn the temperature up and watch what changes.`,
    simulation: { id: 'particle-box' },
    observations: [
      { text: `Compare ice with a warm room: barely any difference. Then drag the slider all the way down. *That* is what it takes to genuinely slow them, and nothing is still even there.` },
      { text: `Heating does not give everything one new speed. It widens a spread: there are always slow ones and fast ones.` },
      { text: `And the wall hits speed up as it warms. Hold on to that — in Week 4 that rate turns out to be pressure.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Yesterday's weight bounced forever because nothing rubbed. Here is where the real one's energy went.`,
    sentences: [
      `Everything is made of particles that are permanently moving — jiggling, colliding, rebounding — and they never stop, at any temperature you will ever meet.`,
      `Warmth is that motion. Not something added to the material, not a fluid soaking into it: it *is* the material's own particles moving faster. Hot and cold are descriptions of speed.`,
      `So when a sliding book stops, its motion did not end. It was broken up — taken from one large organised movement and scattered into the tiny disorganised movements of billions of particles in the book and the table.`
    ],
    comparison: {
      label: `THE MARCHING BAND`,
      body: `A hundred people march down a street in step: that is a book sliding across a table. Now the parade ends and everyone wanders off to find their car, chatting, in every direction. Exactly the same hundred people are moving exactly as much as before. What has been destroyed is not their motion — it is their *agreement*. Heat is a crowd that has stopped marching.`
    },
    naming: `The scattered jiggling is **thermal energy**, and the amount of it in something depends on how much material there is as well as how fast the jiggling is. Getting energy there is easy and it happens by itself. Getting it back out, gathered up and marching again, is the hardest problem in engineering — which is Friday's lesson.`,
    formalNames: {
      terms: [
        { term: `Thermal energy`, meaning: `The total energy of all the microscopic jiggling in something. A bathtub of warm water has far more of it than a cup of boiling water, which is the distinction Week 4 opens with.` },
        { term: `Temperature`, meaning: `Not the total — the *average* energy per particle. How fast the typical one is going, regardless of how many there are.` },
        { term: `Heat`, meaning: `Strictly, thermal energy in the act of moving from a warmer thing to a cooler one. Physicists are fussy about this: an object contains thermal energy; heat is what crosses the boundary.` },
        { term: `Absolute zero`, meaning: `The temperature at which the jiggling would be as small as it can get — about −460°F. Nothing has ever reached it, and the slider in the simulation stops well short.` }
      ],
      note: `This is Lesson 11's conservation with a destination attached. Energy is never destroyed, and the place it nearly always ends up is here, spread thin across an enormous number of particles.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Every one of these is organised motion being scattered. Which have you noticed?`,
    items: [
      `Palms warm from rubbing them together.`,
      `A drill bit too hot to touch.`,
      `A bicycle pump that heats up as I use it.`,
      `Brakes smelling hot after a long descent.`,
      `The warm patch under a laptop.`,
      `A hammered nail that's warm to the touch.`
    ],
    builder: {
      body: `Two minutes and a bicycle pump, if you have one. Block the outlet with your thumb and push the handle down hard a few times, then feel the barrel near the bottom. Warm — sometimes properly hot. You have not rubbed anything and there is no flame. You have squeezed the air, which means you have been shoving its particles with a moving wall, and a particle bounced off an advancing wall comes away faster. You have made air hot by hitting it.`
    },
    ownPlaceholder: `Somewhere organised motion became warmth…`,
    synthesis: `Notice the direction. Every one of those went from motion to warmth, and not one of them has ever run backwards on its own. Nobody's hands have spontaneously cooled and started rubbing.`
  },

  feynman: {
    line: `The question the lesson opened with. Answer it properly now.`,
    instruction: `Explain why rubbing your hands together makes them warm — **without using the words "friction" or "heat."**`,
    banned: ['friction', 'heat'],
    bannedNote: `both of those are names for the thing being explained — go one level down`,
    placeholder: `Your hands are made of something, and that something is…`,
    checks: [
      `Everything is made of particles that are always moving.`,
      `Warm means those particles are moving faster on average.`,
      `Rubbing takes the large organised motion of your hands and breaks it up into that tiny motion.`,
      `Nothing was created — the motion you supplied is the warmth you got.`
    ],
    closing: `If your version explains the bicycle pump as well as the hands, you have the general idea rather than the special case.`
  },

  challenge: {
    voice: 'editor',
    line: `One question, and it separates two words that most people use interchangeably.`,
    prediction: {
      question: `A cup of boiling water at 212°F, and a bathtub of warm water at 100°F. Which contains more thermal energy?`,
      options: [
        {
          id: 'cup',
          text: `The cup — it's more than twice as hot.`,
          verdict: `And it *is* more than twice as hot, so the reading is fair. But hotness tells you how fast the typical particle is moving, not how many of them there are. The bath holds perhaps four hundred times as much water. Four hundred times as many particles, each moving about half as fast, still adds up to vastly more jiggling in total. Which is why you can put a hand in a warm bath and not in a cup of boiling water — and also why the bath will keep a room warm all evening and the cup will not.`
        },
        {
          id: 'bath',
          text: `The bath — there's far more of it, even though it's cooler.`,
          verdict: `Correct, and it is the whole reason physics keeps two words where everyday speech has one. Temperature is the average per particle. Thermal energy is the total across all of them. The cup wins on the first and loses enormously on the second. Put both into a cold room and see which one warms it: the bath, every time, despite being the cooler of the two.`
        },
        {
          id: 'same',
          text: `About the same — heat is heat.`,
          verdict: `I want to be careful with this one, because "heat is heat" is doing something reasonable: it is refusing to be tricked by a difference that might not matter. But the two quantities here differ by a factor of hundreds, and they differ in a way you can feel. A word that cannot tell a bath from a teacup is not earning its keep, which is exactly why the two got separated.`
        }
      ]
    },
    open: {
      question: `Now the deep one, and it is the question Lesson 12's bouncing weight was silently asking. Energy is never destroyed. So why does everything stop? Why does the bouncing ball get lower, the pendulum settle, the spinning coin lie down — if none of them lost anything?`,
      placeholder: `Nothing is lost. But something has changed about it…`,
      reveal: [
        `Because the energy stopped being organised. A bouncing ball has all its energy pointing the same way at once — every atom in it moving together, up. Each bounce hands a slice of that to the floor and the air as jiggling, scattered among countless particles in countless directions. The ball does not have less energy in the world. It has less energy *going the same way*.`,
        `And there is no way back. Not because it is forbidden, but because of the arithmetic of chance. There are astronomically more ways for energy to be spread out among billions of particles than there are ways for all of them to agree to move the same direction at the same moment. Every collision shuffles the deck, and a shuffled deck does not sort itself.`,
        `This is the only law in this course with a *direction* built into it. Everything else you have learned runs equally well backwards — a film of the bicycle or the bridge looks fine in reverse. A film of a puddle of warm water gathering itself into a bouncing ball does not, and the reason is entirely this. You have just met the second law of thermodynamics, which is what Friday is really about.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. That was a big one.`,
    prompt: `Heat became more understandable when I realised…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Thermal energy went from "heard of it" to "can explain it" in one sitting, because Lessons 11 and 12 had already done most of the work.`,
    tomorrow: `Tomorrow, Lesson 14: water falls through a dam and the lights come on in a house fifty miles away. We follow one piece of energy the whole way.`
  },

  routes: [
    { id: 'analogy', body: `Think of a hundred coins on a tray, all lying heads up, and then someone shakes it. Now they are a mixture. Nothing was taken away — the same hundred coins are there — but the *order* is gone, and shaking it again will not bring it back. You would have to go in by hand, coin by coin. Heat is what motion looks like after the tray has been shaken.` },
    { id: 'object', body: `Take a paperclip and bend it back and forth, fast, at one point. Then touch that point to your lip. It is hot. You have done nothing but move metal, and the metal has turned your movement into its own internal jiggling. Now try to reverse it: hold a warm paperclip and wait for it to start bending itself. It will not, and knowing why not is the whole second half of this lesson.` },
    { id: 'story', body: `A blacksmith has no matches and needs a piece of iron hot. He does not light a fire under it — he hammers it, hard, over and over, and it glows. Every hammer blow is a large organised movement arriving and being scattered into the metal's atoms. He is heating the iron with nothing but his arm, and the iron is keeping every bit of what he gives it.` },
    { id: 'experiment', body: `Fill a small bottle two-thirds with water, cap it tightly, and shake it hard for two solid minutes — really hard. Then feel the water. It is measurably warmer. This is famously how Joule worked out the relationship between motion and heat in the 1840s, with a paddle wheel and a falling weight, and you can do the crude version in your kitchen in the time it takes to boil a kettle.` },
    { id: 'smaller', body: `Smaller question. Is a cold thing empty of motion, or just slow? Put a block of ice in a warm room and it melts — something is going on in there. And a cold thing can always be made colder, and colder again, and you never reach a floor at ordinary temperatures. So cold is not nothing. It is less. And if cold is "less motion", then warm can only be "more motion", which is the whole lesson.` },
    { id: 'backward', body: `Start from the fact that a spinning coin always lies down. Always — never once in history has a coin lying flat on a table spontaneously stood up and begun spinning. Yet nothing in Newton's laws forbids it; run the film backwards and every collision in it is perfectly legal. So the prohibition cannot come from the laws of motion. It must come from something about organisation being easy to lose and impossible to stumble back into. Work backward from a coin and you find the arrow of time.` }
  ],

  map: [
    { name: `Energy`, level: 5 },
    { name: `Thermal energy`, level: 4 },
    { name: `Kinetic energy`, level: 4 },
    { name: `Potential energy`, level: 4 },
    { name: `Conservation of energy`, level: 4 },
    { name: `Temperature`, level: 3, fresh: true },
    { name: `Molecular motion`, level: 4, fresh: true },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Compression`, level: 5 },
    { name: `Tension`, level: 5 },
    { name: `Gravity`, level: 5 },
    { name: `Elastic energy`, level: 3 }
  ]
}
