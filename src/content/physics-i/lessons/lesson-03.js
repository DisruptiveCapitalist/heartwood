// Physics I · Week 1 · Lesson 3 — friction.
// Stands on Lesson 1: inertia says it keeps going; this is one of the things
// that changes its mind.

export default {
  id: 'lesson-03',
  number: 3,
  week: 1,
  title: `Why a rolling ball eventually stops`,
  openingQuestion: `You roll a ball across the floor. Nobody touches it. Nothing appears to stop it. Yet it eventually stops. Where did the motion go?`,
  concept: `Friction`,

  see: {
    voice: 'professor',
    line: `Don't worry about the word for it yet. Roll it on ice, then on grass, and watch.`,
    simulation: { id: 'rolling-ball' },
    observations: [
      { text: `Both balls left your hand at the same speed. The floor is the only thing that was different.` },
      { text: `It doesn't stop all at once at the end. It is being slowed the whole way, gently, by something it is touching.` },
      { text: `Now the strange one: the heavy ball and the light ball stopped in the *same place*. Whatever is doing this grows with the ball.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Lesson 1 said a moving thing keeps moving unless a force acts on it. Here is the force.`,
    sentences: [
      `Nothing decided to stop the ball. Two surfaces are touching, and touching surfaces resist sliding past one another. That resistance is a push — backwards, along the whole journey.`,
      `Up close, neither surface is smooth. They are rough and slightly soft, and they catch, squash and let go of each other thousands of times a second. Every one of those costs a little motion.`,
      `The motion is not destroyed. It is handed over — to the floor and the ball as a tiny amount of warmth, and to the air as the faint sound of rolling.`
    ],
    comparison: {
      label: `YOUR TWO HANDS`,
      body: `Press your palms together and rub them hard, twenty times. Two things happen, and they are the same thing. Your hands resist being slid across each other — you can feel the push working against you. And they get warm. You just spent motion and were paid back in heat. That is the entire mechanism, in your lap, without a ball.`
    },
    naming: `The name for that resistance is **friction**. Notice what it is not: it is not the ball running out of something, and it is not the universe preferring things to be still. It is a force, exactly the kind Lesson 1 was talking about — and a rolling ball keeps rolling right up until this one gets the better of it.`,
    formalNames: {
      terms: [
        { term: `Friction`, meaning: `The force that appears when two surfaces touch and resist sliding across each other. It always pushes against the *relative* motion of the two surfaces — remember that word "relative"; the Editor will want it later.` },
        { term: `Rolling resistance`, meaning: `Friction's much gentler cousin, for a wheel or a ball. A rolling surface is being squashed and released rather than scraped, which costs far less. It is the entire reason wheels exist.` },
        { term: `Coefficient of friction`, meaning: `One number for a pair of surfaces: how much resisting force you get per pound of weight pressing them together. Ice has a small one. Grass has a large one.` },
        { term: `Thermal energy`, meaning: `Where the motion went. We will spend all of Week 3 on this, so for now: warmth is motion, just very small and very disorganised.` }
      ],
      note: `Again, no new law. This is Newton's First from Lesson 1, with the force finally named — and the reason the heavy ball and the light ball stopped together is the same cancellation that made the two dropped balls land together.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `It is everywhere, and it is usually doing you a favour. Which of these have you noticed?`,
    items: [
      `My shoes grip the kitchen floor — until it's wet.`,
      `Car tires holding the road on a bend.`,
      `Squeezing a bicycle brake.`,
      `Rubbing my hands together when they're cold.`,
      `Shoving furniture across a carpet.`,
      `How far a skater glides without doing anything.`
    ],
    builder: {
      body: `Thirty seconds, at your desk. Put a book on the table and push it with one finger — note how hard you have to press to get it going. Now slide a sheet of paper or a tea towel underneath and push again. Same book, same finger, completely different job. You did not change the book. You changed what it was touching.`
    },
    ownPlaceholder: `Somewhere friction helped you, or got in your way…`,
    synthesis: `Notice how many of those are friction being useful. We mostly notice it when it fails — on ice, on a wet floor, on a worn tire. The rest of the time it is quietly holding the world still for us.`
  },

  feynman: {
    line: `Ten-year-old. No jargon, and two words are off the table.`,
    instruction: `Explain why a rolling ball slows down and stops — **without using the words "friction" or "momentum."**`,
    banned: ['friction', 'momentum'],
    bannedNote: `one of the two words slipped in — the idea works without either`,
    placeholder: `The ball is touching something the whole way…`,
    checks: [
      `The ball is touching the floor the entire time it is rolling.`,
      `Touching surfaces push back against sliding — that push is what slows it.`,
      `The push acts the whole way, not just at the end. That is why it slows gradually.`,
      `The motion isn't gone: the ball, the floor and the air are all very slightly warmer and noisier for it.`
    ],
    closing: `If a child can hear your version and then predict that the ball goes farther on ice, you have it. That prediction is the whole test.`
  },

  challenge: {
    voice: 'editor',
    line: `You saw something in the simulation that most people refuse to believe. Let me make sure you believe it.`,
    prediction: {
      question: `You roll a 1-pound ball and a 5-pound ball along the same carpet, both leaving your hand at the same speed. Which one travels farther?`,
      options: [
        {
          id: 'heavy',
          text: `The heavy one — it has more push behind it.`,
          verdict: `The instinct is sound and you are half right: the heavy ball does carry five times as much motion, and it would take five times as much to stop it. But look at the other side of the ledger. It also presses into the carpet five times as hard, so the carpet resists it five times as strongly. Five times the motion, five times the resistance — they cancel, and the two balls stop in the same place. If that sounds familiar, it should: it is exactly the cancellation that made the 10-pound and 5-pound balls land together in Lesson 1.`
        },
        {
          id: 'same',
          text: `Neither — they stop in about the same place.`,
          verdict: `Correct, and it is worth knowing why rather than just that. The heavy ball carries five times the motion, which argues for going farther. It also presses five times harder into the carpet, so the resisting force is five times bigger, which argues for stopping sooner. The same number appears on both sides and cancels out. Mass drops out of the answer entirely — which is why the surface is the only thing that mattered in the simulation.`
        },
        {
          id: 'light',
          text: `The light one — there's less of it to drag along.`,
          verdict: `Good instinct, aimed the wrong way — and it is the exact mirror of the usual mistake. Yes, there is less of it to drag. But there is also less of it pressing down, so the carpet grips it more gently in precisely the same proportion. Less to stop, less stopping it: the two cancel and the balls finish together.`
        }
      ]
    },
    open: {
      question: `Now the one that should bother you. Friction always pushes *against* motion. So how, exactly, do you walk forward?`,
      placeholder: `Think about what your back foot is doing to the ground…`,
      reveal: [
        `Your foot is not trying to move forward. It is trying to slide *backward* against the ground — that is what pushing off means. And friction opposes that attempted slide, so it pushes your foot **forward**. The force that carries you down the street is friction, pointing the way you want to go.`,
        `That word "relative" in the formal names was doing real work. Friction opposes the sliding the two surfaces are trying to do against each other, not the travel of the person on top. Take it away and you get the proof: on smooth ice your foot slides backward freely, nothing pushes it forward, and you go nowhere at all.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then you're done.`,
    prompt: `Today I noticed friction when…`,
    placeholder: `Somewhere today it was working, and I hadn't thought about it…`,
    mapFooter: `Friction arrived today and went a long way in one sitting — you can already use it to predict. Energy has only been mentioned; Week 3 is where it earns its place.`,
    tomorrow: `Tomorrow, Lesson 4: why an empty cart and a loaded one feel like completely different machines. We put a number on the stubbornness from Lesson 1.`
  },

  routes: [
    { id: 'analogy', body: `Think of two hairbrushes laid bristle to bristle. Slide one across the other and the bristles catch, bend, spring past and catch again — you can feel it as a gritty resistance, and if you do it fast enough the bristles get warm. Every surface is like that, just with bristles far too small to see. Glass, steel, ice: all bristles, all the way down. The ball is rolling over a brush.` },
    { id: 'object', body: `Take a coin and flick it across a table. Now flick it just as hard across a bath towel. You already know what happens — the point is that you *knew*. You have a lifetime of evidence that what a thing is sliding on decides how far it gets. The physics here is not telling you something new; it is telling you what the thing you already knew is called, and why it works.` },
    { id: 'story', body: `Two men are moving a heavy couch across a living room and getting nowhere. One of them goes to the kitchen and comes back with two dinner plates, tips the couch, and slides a plate under each front foot. Now it moves. They have not made the couch lighter and they have not got stronger. They have changed what it is touching the floor with — and that alone was the whole problem.` },
    { id: 'experiment', body: `Right now: press your palms together hard and rub them back and forth for ten seconds. Two things are happening and they are not two things. You can feel the resistance fighting your hands, and you can feel the heat arriving. That is the motion you are spending, turning up as warmth. A ball on a carpet is doing exactly this, quietly, all the way across the room.` },
    { id: 'smaller', body: `Smaller question, and forget the ball. If something is moving and absolutely nothing touches it — no floor, no air, nothing — does it slow down? No. Lesson 1 settled that. So when a ball on your floor slows down, you do not need to ask what stopped it. You only need to ask: what was it touching?` },
    { id: 'backward', body: `Start at a curling rink. Grown adults sweep the ice frantically in front of a sliding stone, and the stone goes farther. Nobody is touching the stone. So the sweeping must be changing the only other thing in the story — the surface. And if polishing the surface makes the stone travel farther, then the surface must have been taking motion away from it the whole time. That is friction, worked out backward from a very odd sport.` }
  ],

  map: [
    { name: `Motion`, level: 4 },
    { name: `Inertia`, level: 4 },
    { name: `Friction`, level: 4, fresh: true },
    { name: `Force`, level: 4 },
    { name: `Balance & correction`, level: 4 },
    { name: `Center of mass`, level: 3 },
    { name: `Mass vs weight`, level: 2 },
    { name: `Acceleration`, level: 2 },
    { name: `Gravity`, level: 2 },
    { name: `Energy`, level: 1, fresh: true },
    { name: `Momentum`, level: 1 }
  ]
}
