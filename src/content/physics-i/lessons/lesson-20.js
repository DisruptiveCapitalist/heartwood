// Physics I · Week 4 · Lesson 20 — pressure. Closes the week by sending the
// learner back to Lesson 13's box of particles with a wall they can move.

export default {
  id: 'lesson-20',
  number: 5,
  week: 4,
  title: `Pressure cookers, tires, and weather`,
  openingQuestion: `Air is invisible, weighs almost nothing, and gets out of your way when you walk. So how does it hold up a two-ton truck on four tires, and how does it knock down a barn?`,
  concept: `Pressure`,

  see: {
    voice: 'professor',
    line: `The box from Lesson 13, with a wall you can push in. The particles do not change — only their room.`,
    simulation: { id: 'particle-box', props: { showVolume: true, showHistogram: false, showPressure: true, defaultCount: 140 } },
    observations: [
      { text: `Squeeze the box and the hit rate climbs, with the same particles at the same speed. They simply meet a wall sooner.` },
      { text: `Heat it without moving the wall and the rate climbs too — same number of particles, arriving harder and more often.` },
      { text: `So pressure is not a substance in the box. It is a *rate of arrival*, and there are two separate dials that change it.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Yesterday you met pressure. Today you find out what it is made of.`,
    sentences: [
      `Pressure is force spread over an area — pounds per square inch. The same push on a smaller patch is a bigger pressure, which is the entire reason a drawing pin has a point at one end and a flat top at the other.`,
      `In a gas, that force comes from nothing but collisions. Each particle is far too small to notice, but a cubic inch of air contains an unthinkable number of them, and they arrive at the walls in such numbers that the total is steady, smooth and enormous.`,
      `Which gives you two ways to raise it. Crowd them into less room so they arrive more often, or heat them so they arrive faster and hit harder — and a tire on a hot motorway is doing both.`
    ],
    comparison: {
      label: `RAIN ON A ROOF`,
      body: `A single raindrop is nothing; you would not feel one. Standing under heavy rain you feel a continuous, steady press on your shoulders — not thousands of separate taps, just weight. Nothing about any individual drop changed. There are simply so many, arriving so fast, that they stop being events and become a pressure. Air on your skin is that rain, with drops too small to ever resolve into taps.`
    },
    naming: `Force per unit area is **pressure**. The rule that squeezing a gas into less room raises its pressure is **Boyle's law**, and the rule that heating it does the same is **Gay-Lussac's**; put together with a few others they make the **gas laws**, which are what you were operating with two sliders. And note that the pressure is the same in all directions — the particles are going everywhere, so they press on everything equally.`,
    formalNames: {
      terms: [
        { term: `Pressure`, meaning: `Force divided by the area it acts on. Pounds per square inch, or bars, or pascals. The same force on a tenth of the area is ten times the pressure.` },
        { term: `Boyle's law`, meaning: `Halve a gas's room at the same temperature and you double its pressure. It is the first slider, and it was worked out in 1662.` },
        { term: `Gauge pressure`, meaning: `What a tire gauge reads: how much *above* atmospheric. A tire at "32 psi" is really at about 47, because the gauge does not count the 14.7 that was already there on both sides.` },
        { term: `Gas laws`, meaning: `The relationships between a gas's pressure, volume, temperature and amount. Not new physics — every one of them falls out of particles bouncing, which is what you just watched.` }
      ],
      note: `Nothing here is a new law either. It is Lesson 13's jiggling particles and Lesson 5's impulse: each collision is a tiny change of momentum, and pressure is what a great many of those per second feels like.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `All of these are force concentrated, or particles crowded. Which do you know?`,
    items: [
      `Tires that read higher after a long motorway drive.`,
      `A pressure cooker getting food done faster.`,
      `A drawing pin going in with thumb pressure alone.`,
      `A bicycle pump that gets hot near the bottom.`,
      `Snowshoes, or skis, keeping you on top of the snow.`,
      `The weather forecast talking about a "low".`
    ],
    builder: {
      body: `One minute, two fingers. Press the flat pad of your thumb against the edge of a table as hard as you can — uncomfortable, but you can hold it. Now press your thumbnail's edge against the same spot with the same effort. You will stop almost immediately. Identical force from the identical muscle; the only thing that changed is the area it is spread over, and it changed everything about the result.`
    },
    ownPlaceholder: `Somewhere a small area made an ordinary force into something serious…`,
    synthesis: `Notice the snowshoes are the same idea run backwards — deliberately spreading a force over more area to make the pressure small enough that the snow holds you.`
  },

  feynman: {
    line: `Explain it to someone who has just put air in a tire.`,
    instruction: `Explain what tire pressure actually is — **without saying "air is trapped inside" and without using the word "pressure."** Say what the air is doing.`,
    banned: ['pressure', 'trapped'],
    bannedNote: `"trapped inside" describes where the air is, not what it is doing`,
    placeholder: `The air inside is made of particles, and those particles are…`,
    checks: [
      `The air inside is made of particles that never stop moving.`,
      `They are constantly striking the inside of the tire from every direction.`,
      `Each strike is tiny, but there are so many per second that the total is steady and large.`,
      `Crowding them into less room, or heating them, makes them arrive more often — and that is what the gauge reads.`
    ],
    closing: `If your version also explains why the gauge reads higher after a motorway drive, you have both dials rather than just the one.`
  },

  challenge: {
    voice: 'editor',
    line: `The last question of the week, and it has a genuinely counter-intuitive answer.`,
    prediction: {
      question: `Why does a sharp nail go into wood so much more easily than the blunt end of the same nail, when you hit both equally hard?`,
      options: [
        {
          id: 'area',
          text: `The point spreads the same force over a tiny area, so the force per square inch is enormous.`,
          verdict: `Exactly right, and the numbers are worth seeing. A nail's point might be a thousandth of an inch across — an area perhaps a hundred thousand times smaller than its head. The same hammer blow, delivered through that, arrives as a hundred thousand times the pressure. Nothing about the hammer, your arm or the wood changed. All the sharpening did was reduce the area, and pressure is the quantity that cares about area.`
        },
        {
          id: 'sharp',
          text: `Sharp things cut. That is what sharpness is.`,
          verdict: `True, and it is a perfectly good answer to a question I did not quite ask. What I want is what sharpness *is*, mechanically — because "sharp things cut" leaves you unable to say why a sharp thing pressed gently does nothing, or why a blunt thing struck hard enough goes in anyway. Sharpness is not a separate property. It is a small contact area, which turns an ordinary force into an extraordinary pressure.`
        },
        {
          id: 'force',
          text: `The point concentrates the force, so more force arrives at the tip.`,
          verdict: `You are very close and the word "concentrates" is doing the right work — but look carefully at what is being concentrated. The *force* is the same in both cases; it is exactly the force of your hammer, and a nail cannot manufacture extra. What is concentrated is the area it has to pass through. Same force, less area, more force per square inch. Holding on to that distinction is what lets you use the idea on tires, snowshoes and the atmosphere.`
        }
      ]
    },
    open: {
      question: `Then one about your own house. A storm passes and a window blows *out*, not in. The wind was pushing against it from outside. So why did it go the wrong way?`,
      placeholder: `What is the pressure doing on each side of the glass…?`,
      reveal: [
        `Because fast-moving air presses *less* than still air, not more. Air flowing quickly past the outside of a window pushes on it less firmly than the calm air sitting in your living room pushes on the inside. The window then has more pressing out than pressing in, and it goes.`,
        `It is the same effect that lifts an aeroplane wing and the same one that pulls a shower curtain toward you when the water is running — and it is why hurricane advice is about pressure differences rather than about wind strength. A house with its windows sealed shut can have a pressure difference across the whole roof, and roofs come off upward far more often than they are pushed in.`,
        `And notice what has just happened to the week. You started with particles jiggling in a box. That gave you temperature, then density, then buoyancy, then the weight of the atmosphere, and now the reason a roof leaves a house. Every one of them is the same unthinkable number of tiny collisions, counted in a different way. That is what "the invisible world" was about.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that is Week 4 finished. Two weeks to go.`,
    prompt: `Pressure became real to me when…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Twenty lessons. Look how much of this map is now at "explain" or "use" — and how much of it arrived from one box of bouncing dots.`,
    tomorrow: `That is Week 4 — the world you cannot see. Week 5 is waves: what actually travels across a room when somebody speaks, why a guitar string knows what note it is, and what is going on inside your hearing aids.`
  },

  routes: [
    { id: 'analogy', body: `Think of a crowd leaving a stadium through a doorway. One person is nothing. The whole crowd pressing toward one door is a crush that can bend steel barriers — and no individual is pushing especially hard. Now narrow the door. The same crowd, the same pushing, a smaller opening, and the force on each square inch of the frame goes up enormously. Air is a crowd of unimaginable size, and area is the door.` },
    { id: 'object', body: `Take a drawing pin and lay it flat-side-down on your palm, then press with a finger. Nothing. Turn it over and press exactly as gently. You will stop at once. The force from your finger was identical both times — you can even measure it on a kitchen scale. Only the area changed, and it changed by a factor of thousands.` },
    { id: 'story', body: `A man tries to walk across fresh deep snow and sinks to his thighs with every step. He straps on a pair of snowshoes — which weigh more, and add nothing to his strength — and walks across the surface. He has not become lighter. He has spread the same weight over ten times the area, and the snow, which could not take two hundred pounds on a boot sole, takes it comfortably on a tennis racket.` },
    { id: 'experiment', body: `Put your thumb over the end of a bicycle pump and push the handle down hard. You can feel the air fighting back, and if you hold it a moment the barrel gets warm. You have not added any air — the same particles are in there. You have given them less room, so they strike your thumb more often, and you can feel the rate of arrival directly through your skin.` },
    { id: 'smaller', body: `Smaller question. A balloon is round. Why? You blew into it in one direction, through one hole. If the air inside only pushed the way you blew it, a balloon would be a sausage pointing away from your mouth. It is round because the particles inside are going in every direction equally and pressing on every part of the skin the same. Roundness is evidence about what the air is doing.` },
    { id: 'backward', body: `Start from tire gauges. Every one reads zero in open air, even though there is plainly air out there at 14.7 psi. They are built to ignore atmospheric pressure and report only the excess — because what makes a tire hold up a car is not how hard the air inside pushes, but how much harder it pushes than the air outside. Work backward from a device deliberately built to subtract, and you find that pressure only ever does anything as a difference.` }
  ],

  map: [
    { name: `Pressure`, level: 5 },
    { name: `Atmosphere`, level: 4 },
    { name: `Molecular motion`, level: 5 },
    { name: `Density`, level: 5 },
    { name: `Buoyancy`, level: 5 },
    { name: `Temperature`, level: 5 },
    { name: `Displacement`, level: 4 },
    { name: `Force`, level: 5 },
    { name: `Support force`, level: 5 },
    { name: `Thermal energy`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Momentum`, level: 4 },
    { name: `Motion`, level: 5 },
    { name: `Gravity`, level: 5 },
    { name: `Convection`, level: 4 }
  ]
}
