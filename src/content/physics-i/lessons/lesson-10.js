// Physics I · Week 2 · Lesson 10 — torque. Closes the week.
// Force from Lesson 6, with *where* added. The reveal turns the idea on the
// learner's own shoulder, which is what the lesson title promises.

export default {
  id: 'lesson-10',
  number: 5,
  week: 2,
  title: `Your knees, your ladder, your bookshelf`,
  openingQuestion: `A small person with a long bar can shift a rock that a large person, bare-handed, cannot move at all. Nobody got stronger. What changed?`,
  concept: `Torque`,

  see: {
    voice: 'professor',
    line: `Move your hand further out before you push. Watch the number you need fall while you are still deciding.`,
    simulation: { id: 'lever' },
    observations: [
      { text: `The force you need drops the moment you move your hand — before you have touched the plank. Distance is doing the work, not effort.` },
      { text: `Twice as far out, half as hard. Not roughly: exactly. Pounds and feet trade one for one.` },
      { text: `And the rock is playing the same game. It is heavy *and* it sits a foot from the pivot — both of those are working against you.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Lesson 6 told you what a force is. It left out one thing.`,
    sentences: [
      `When something can turn, how hard you push is only half the story. *Where* you push is the other half — and the two multiply together rather than adding.`,
      `Force times distance from the pivot is the turning effect. Double the distance and you need half the force for exactly the same result; the trade is precise, and you can have as much of it as you have room for.`,
      `It works against you just as faithfully. Any weight held out away from a joint is multiplied by that distance before whatever is holding it has to answer.`
    ],
    comparison: {
      label: `THE DOOR`,
      body: `You have done this experiment a thousand times without calling it one. Push a door at the handle and it swings with a fingertip. Push the same door at the same speed six inches from the hinge and you have to shove. Same door, same hinges, same you, same push. The only thing that changed was your distance from the pivot — and that alone decided whether the job was easy or nearly impossible. Door handles are on the far edge for exactly this reason, and no other.`
    },
    naming: `The turning effect is **torque** — force multiplied by the distance from the pivot. The distance itself is the **lever arm**. And the ratio you get out of a long bar has a name too: **mechanical advantage**, which is a fair description of what a crowbar sells you.`,
    formalNames: {
      terms: [
        { term: `Torque`, meaning: `Force times the distance from the pivot, measured at right angles. The turning equivalent of a push. Engineers also call it a *moment*, which means the same thing.` },
        { term: `Lever arm`, meaning: `How far from the pivot the force is applied. The half of the equation that people forget, and the half you can usually change for free.` },
        { term: `Pivot`, meaning: `The point everything turns about. Also called a fulcrum. Finding it is usually the whole difficulty — in a door it is obvious, in your knee it is not.` },
        { term: `Mechanical advantage`, meaning: `How much your force is multiplied. You never get something for nothing: the long end travels much further than the short end, so you trade distance for force.` }
      ],
      note: `And again, no new law. This is Lesson 6's force with one extra question asked of it — *how far from the pivot?* — which has quietly been the answer to half the puzzles in your house.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Every one of these is a lever, whether or not it looks like one.`,
    items: [
      `A door handle, always as far from the hinge as possible.`,
      `A long wrench where a short one wouldn't shift it.`,
      `A crowbar, or a claw hammer pulling a nail.`,
      `A seesaw, and the big child sliding forward.`,
      `Carrying a ladder — where you grip decides everything.`,
      `A heavy pan held out at arm's length.`
    ],
    builder: {
      body: `Ninety seconds, one book. Hold a heavy book against your chest and count to thirty — perfectly comfortable. Now hold the same book straight out at arm's length and count again. You will not get to thirty. Nothing about the book changed, and you did not get weaker in the intervening second. The only thing that changed is how far it sits from your shoulder — and your shoulder has to answer for every inch of it.`
    },
    ownPlaceholder: `Somewhere the distance mattered more than the effort…`,
    synthesis: `Notice the pattern: in every single one, you can make the job easier without getting stronger, purely by choosing where to apply yourself.`
  },

  feynman: {
    line: `Explain it to someone standing in a garage holding the wrong wrench.`,
    instruction: `Explain why a long wrench loosens a bolt that a short one will not — **without using the words "torque" or "leverage."**`,
    banned: ['torque', 'leverag', 'lever'],
    bannedNote: `those are the names for the answer — describe what the distance is doing instead`,
    placeholder: `Your hand is pushing just as hard either way, so…`,
    checks: [
      `The bolt turns about a point, and everything is measured from that point.`,
      `How hard you push and how far out you push both matter, and they multiply.`,
      `So the same hand, further out, produces a bigger turning effect.`,
      `You do not get it free — your hand has to travel further round to turn the bolt the same amount.`
    ],
    closing: `If your explanation also covers why the door handle is not in the middle of the door, it has stopped being about wrenches and started being about the idea.`
  },

  challenge: {
    voice: 'editor',
    line: `One warm-up, and then I want to turn this on you personally.`,
    prediction: {
      question: `Two children on a seesaw. One weighs 60 pounds, the other 90. Where must the lighter one sit for it to balance?`,
      options: [
        {
          id: 'farther',
          text: `Further from the middle than the heavier one.`,
          verdict: `Correct, and you can go further than "further" — you can say how much. The heavy child brings 90 pounds; the light one brings 60. For the turning effects to match, the light one needs one and a half times the distance. If the 90-pound child sits two feet out, the 60-pound child sits three. Every child who has ever shuffled along a seesaw has solved that equation by feel, which is a fair description of most of physics.`
        },
        {
          id: 'closer',
          text: `Closer to the middle — being lighter, they need less room.`,
          verdict: `I can see the shape of the thought: less weight, less of everything, so sit in tighter. But run it to the extreme, which is always the quickest test of a guess. Put the light child right at the middle, on the pivot itself, and their distance is zero — so their turning effect is zero too, however much they weigh. They would contribute nothing at all. Being lighter is a disadvantage here, and the cure for it is more distance, not less.`
        },
        {
          id: 'never',
          text: `It can't balance — one of them is simply heavier.`,
          verdict: `If weight were all that mattered, you would be right, and that is worth taking seriously because it is exactly how a set of kitchen scales behaves. But a seesaw is not weighing the children; it is comparing two turning effects, and each one is a weight multiplied by a distance. That gives the lighter child something to play with that the scales never offered. Any two weights can be balanced on a seesaw, provided the plank is long enough — which is the cheerful discovery every small child eventually makes about a larger sibling.`
        }
      ]
    },
    open: {
      question: `Now the one in the title. Holding a full mug against your chest is effortless; holding the same mug at arm's length becomes painful in under a minute. Your arm did not get weaker, and the mug did not get heavier. So what is your shoulder actually up against?`,
      placeholder: `Where is the pivot, and where does the muscle attach…?`,
      reveal: [
        `Find the pivot first: it is your shoulder joint. The mug is about two feet from it. So your shoulder has to produce a turning effect of the mug's weight times two feet — and the muscle doing that is attached to the bone barely an inch or two from the joint itself.`,
        `That means the muscle is on the *short* end of the lever, which is the losing end. To hold up a two-pound mug at two feet, a muscle working at two inches must pull with something like twenty-four pounds. Your body is not built for mechanical advantage. It is built with the worst mechanical advantage available.`,
        `Which sounds like poor design until you notice what it buys. The short end moves a small distance; the long end moves a large one. By putting the muscle close to the joint, your body trades away force to gain range and speed — a tiny contraction becomes a wide, fast sweep of the hand. You are permanently paying a strength penalty in exchange for being able to reach, throw and catch. Your knees are making the same bargain every time you stand up.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that is Week 2 finished.`,
    prompt: `I now see leverage when…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Ten lessons in. Notice how little of this map is new arrivals and how much is old concepts climbing — which is what the course is for.`,
    tomorrow: `That is Week 2 — forces, and what they do to the things they pass through. Week 3 asks a different kind of question: a car brakes to a stop, and all that motion has to go *somewhere*. Where?`
  },

  routes: [
    { id: 'analogy', body: `Think of a revolving door. Push on the outer edge and it swings easily. Walk in close to the centre post and push there, and it feels stuck — you are shoving at a thing that barely responds. Same door, same arms. Everyone who has ever been trapped shuffling near the middle of a revolving door has felt this idea in their shoulders without ever calling it anything.` },
    { id: 'object', body: `Pick up a hammer by the very end of the handle and swing it gently. Now hold it right up under the head and swing the same way. The second one feels almost weightless and drives nothing. All the useful violence of a hammer comes from the head being a long way from your wrist — which is why nobody makes a hammer with a four-inch handle, and why you instinctively slide your hand down the shaft when the nail is stubborn.` },
    { id: 'story', body: `A man is trying to undo a wheel nut at the roadside with the little wrench that came with the car, standing on it, getting nowhere. Another driver stops, slips a length of pipe over the wrench handle, and undoes it with one hand. The man is embarrassed and assumes he was weak. He was not. He was applying his whole body weight eight inches from the nut, and the stranger applied one hand at three feet.` },
    { id: 'experiment', body: `Go to any door in the house and open it by pushing two inches from the hinge. Use one finger and really try. Then push it at the handle with the same finger. The difference is not subtle — it is the difference between "impossible" and "didn't notice". You have just run a controlled experiment where the only variable was distance, and the result was enormous.` },
    { id: 'smaller', body: `Smaller question. Forget wrenches. If you push exactly *at* the pivot — dead on the hinge, dead on the bolt's centre — how much does it turn? Not at all, no matter how hard you push. So distance from the pivot cannot be a minor detail; at zero distance it cancels your effort completely. And if it matters that much at zero, it must matter everywhere.` },
    { id: 'backward', body: `Start from a fact about your own body: you can lift a heavy suitcase off the floor, but you cannot hold that same suitcase straight out in front of you for even a moment. The suitcase is identical in both cases and so are you. So the difficulty cannot live in the weight — it must live in the geometry, in where the weight sits relative to your joints. Work backward from your own arms and you arrive at the lever without needing a plank.` }
  ],

  map: [
    { name: `Force`, level: 5 },
    { name: `Torque`, level: 4, fresh: true },
    { name: `Compression`, level: 5 },
    { name: `Tension`, level: 5 },
    { name: `Load path`, level: 4 },
    { name: `Center of mass`, level: 4 },
    { name: `Motion`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Support force`, level: 4 },
    { name: `Static friction`, level: 4 },
    { name: `Kinetic friction`, level: 4 },
    { name: `Momentum`, level: 4 },
    { name: `Mass`, level: 4 },
    { name: `Gravity`, level: 4 },
    { name: `Energy`, level: 2 }
  ]
}
