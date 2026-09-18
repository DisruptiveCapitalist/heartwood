// Physics I · Week 1 · Lesson 4 — mass, and the first equation of the course.
// Stands on Lesson 1: this is inertia with a number on it. The equation appears
// only in the formal names, after the learner has already felt the relationship.

export default {
  id: 'lesson-04',
  number: 4,
  week: 1,
  title: `Why a heavy thing is harder to get moving`,
  openingQuestion: `An empty shopping cart almost gets away from you. Load it with 200 pounds and the same shove barely moves it. Your arm didn't change. What did?`,
  concept: `Mass`,

  see: {
    voice: 'professor',
    line: `Two carts, one hand, one push, both at once. Hold the button down and watch the gap.`,
    simulation: { id: 'two-carts' },
    observations: [
      { text: `The same push does not give the two carts the same speed. It gives them the same *thing added per second* — and that is a different statement.` },
      { text: `Four times the mass, a quarter of the pickup. Try 2 pounds, then 8, and watch the ratio follow you.` },
      { text: `Double the push and the heavy cart does better — but the light one doubles too. You cannot catch up by pushing harder; you only move both.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and then one equation — in that order, deliberately.`,
    sentences: [
      `A push does not give a thing a speed. It *changes* the speed the thing already has, and it keeps changing it for as long as you keep pushing. Stop pushing and the speed stops changing — it does not go back to zero, as Lesson 1 told you.`,
      `How quickly the speed changes depends on how much stuff you are pushing. The same push on twice as much stuff produces half as much change, every time, exactly.`,
      `That is all "mass" means. Not how heavy a thing feels in your hand — how stubbornly it refuses to have its motion changed. It is Lesson 1's inertia, finally with a number attached.`
    ],
    comparison: {
      label: `THE SHOPPING CART`,
      body: `You know this already, in your arms. The empty cart lurches away from you and you have to chase it. The full one needs a long, leaning shove to get going — and then, out in the aisle, it needs an equally long lean to stop it again. Both halves of that are the same fact. The loaded cart resists being sped up and resists being slowed down, by precisely the same amount, because they are the same property.`
    },
    naming: `The stubbornness is **mass**. The change-per-second it resists is **acceleration**. And the relationship between them — which you have just spent five minutes discovering with two sliders — has a name too, and we can now write it down without it being a trick: a given push produces an acceleration that gets smaller as the mass gets bigger.`,
    formalNames: {
      terms: [
        { term: `Mass`, meaning: `How much a thing resists having its motion changed. Measured in kilograms or slugs; felt in the shoulders.` },
        { term: `Acceleration`, meaning: `How fast the speed is changing. Not "going fast" — *changing* how fast. A car at a steady 60 has none at all.` },
        { term: `Newton's Second Law`, meaning: `Written *F = ma*: force equals mass times acceleration. That is the whole of what the two sliders were doing. Read it as a sentence rather than a formula — "the push you apply is spent on the stuff you're pushing, times how briskly it picks up."` },
        { term: `Weight`, meaning: `Not the same as mass, and worth keeping separate. Mass is how much stuff there is. Weight is how hard gravity pulls on it. Take your loaded cart to the Moon and its weight drops to a sixth — but it would be exactly as hard to get rolling.` }
      ],
      note: `This is the first equation in the course, and it arrives fourth, after the carts, the cart-in-the-supermarket and the naming. That order is the point. You are not learning *F = ma*; you are learning that you already knew it.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Your arms have been collecting evidence for seventy years. Which of these do you recognise?`,
    items: [
      `An empty wheelbarrow versus a full one.`,
      `Picking up a light bag and nearly throwing it over my shoulder.`,
      `Swinging a baseball bat versus swinging a sledgehammer.`,
      `Pushing a door versus pushing a refrigerator.`,
      `A loaded suitcase that won't change direction when I want it to.`,
      `How long a truck takes to pull away from the lights.`
    ],
    builder: {
      body: `Two minutes, one book and one heavier book. Hold a paperback out in front of you and shake it quickly left and right. Easy. Now do it with the biggest book you own. What is stopping you is not its weight — you are not lifting it, you are holding it up either way. What is stopping you is that you are reversing its direction twice a second, and there is more of it to reverse. That is mass, felt directly, with gravity taken out of the argument.`
    },
    ownPlaceholder: `Somewhere the loaded version of a thing behaved like a different machine…`,
    synthesis: `Every one of those is the same sentence: the amount of stuff decides how much your push buys you. Notice that half of them are about stopping rather than starting. Mass does not care which direction you want the change to go.`
  },

  feynman: {
    line: `A sharp twelve-year-old, no equations allowed.`,
    instruction: `Explain why pushing twice as hard does not make a heavy cart behave like a light one — **without using the word "inertia," and without writing any equation.**`,
    banned: ['inerti'],
    bannedNote: `you used the word — the idea is better without it`,
    placeholder: `Think about what the push actually buys you…`,
    checks: [
      `A push changes how fast something is going; it does not set a speed.`,
      `The same push spread over more stuff produces less change per second.`,
      `Doubling the push does double what the heavy cart gets — but it doubles what the light cart gets too, so the gap stays.`,
      `Mass is the name for how much a thing resists that change, whichever direction you want it to go.`
    ],
    closing: `If your explanation works just as well for *stopping* the cart as for starting it, you have understood mass rather than memorised it.`
  },

  challenge: {
    voice: 'editor',
    line: `Lesson 1 left something unfinished, and you now have the tools to finish it. I want to see you do it.`,
    prediction: {
      question: `You give a 1-pound cart and a 4-pound cart the same 8-pound shove; the light one picks up speed four times faster. Then you carry both to the edge of a table and drop them. When does the heavy one behave differently from the light one?`,
      options: [
        {
          id: 'both',
          text: `In both cases — heavier is always harder to move.`,
          verdict: `You are right about the shove and wrong about the drop, and the reason is the best thing in this lesson. Your hand delivers a fixed push — eight pounds, whatever it is pushing. Spread over four times the mass, it buys a quarter of the acceleration. But gravity is not a fixed push. It pulls four times as hard on four times the mass. The extra pull is spent exactly on the extra stubbornness, nothing is left over, and both carts fall at the same rate. Gravity is the one force that scales itself to whatever it finds.`
        },
        {
          id: 'push',
          text: `Only when you push it. Dropped, they fall together.`,
          verdict: `That is it, and it closes the loop from Lesson 1. Your hand gives a fixed push, so more mass means less acceleration — that is what the carts showed you. Gravity gives a *pull proportional to mass*, so more mass buys exactly enough extra force to cover its own extra stubbornness. Same acceleration, every time. The two balls in Lesson 1 landed together for this reason and no other.`
        },
        {
          id: 'drop',
          text: `Only when it falls. Pushed by hand, they behave the same.`,
          verdict: `The two halves have swapped places, but you have spotted the thing that matters most: that these are two genuinely different situations and something changes between them. That instinct is right. It is the pushing where mass shows up — the same shove, less acceleration. It is the falling where mass hides, because gravity scales its pull to the mass and the difference cancels out before it can appear.`
        }
      ]
    },
    open: {
      question: `Say it back to me directly, because this is the sentence that matters. If more mass always means less acceleration for a given force — why doesn't a heavy thing fall more slowly than a light one?`,
      placeholder: `What is different about gravity compared with your hand…`,
      reveal: [
        `Because gravity is the one force that is not a fixed amount. Every other push you will meet — your hand, a spring, a rope, an engine — delivers so many pounds and doesn't care what it is pushing. Gravity delivers so many pounds *per pound of mass*.`,
        `So when you double the mass you double the stubbornness, and gravity doubles its pull to match. The extra force is entirely consumed by the extra mass, the books balance exactly, and what is left over is the same acceleration for everything. A feather and an anvil, in a tube with the air pumped out, land together — and now you can say why in one sentence instead of finding it surprising.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. You've just met the first equation of the course.`,
    prompt: `Mass is not simply "how heavy something is." It is also…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Inertia has moved to "use" — you predicted something with it today rather than only recognising it. That is the whole ladder, and it is the only concept up there so far.`,
    tomorrow: `Tomorrow, Lesson 5: a bicycle and a truck are both moving slowly. One of them you could stop with your hands. We put mass and speed together.`
  },

  routes: [
    { id: 'analogy', body: `Think of pushing two children on swings — a small child and a very large adult. You give each one the same shove. The child swings away immediately; the adult barely moves. Now try to fix it by shoving twice as hard. The adult does move more — but so does the child, if you shove them twice as hard too. You have not closed the gap, you have only made a bigger version of the same picture. The gap is not about how hard you push. It is about who you are pushing.` },
    { id: 'object', body: `Get an empty mug and a full one, on a smooth table. Flick each with one finger, the same flick. The empty one skitters away; the full one shuffles. Same finger, same table, same friction — the only thing that changed is how much stuff is in the mug. Now the useful half: try to *stop* each one with the same finger as it slides past. The full one fights you exactly as hard as it did when you started it.` },
    { id: 'story', body: `A man loads a wheelbarrow with wet sand, tips it up, and starts down a slope. He gets it moving with real effort, and then discovers the more interesting problem: he cannot stop it. He is now running. The barrow has not become heavier going downhill, and gravity is not the difficulty — he could hold the same weight standing still. The difficulty is that a lot of stuff is now moving and only his arms are available to change that.` },
    { id: 'experiment', body: `Stand up. Push against a wall as hard as you like: nothing moves, and you learn nothing. Now push a kitchen chair across the floor with one finger and note the effort. Then sit a heavy bag of books on the chair and do it again with the same one finger. You have kept the pusher, the floor and the chair identical and changed only the amount of stuff. Whatever made that harder is what this lesson is about.` },
    { id: 'smaller', body: `Smaller question, no carts. Out in space, with nothing to slow anything down, you push a crate with one steady finger and never stop pushing. Does the crate reach some top speed and stay there? No — it just keeps getting faster, forever, as long as you keep pushing. So a push does not *buy* a speed. It buys a rate of change. Once you see that, "why does more mass mean less speed gained" answers itself: the same rate of change has more stuff to spread itself over.` },
    { id: 'backward', body: `Start with a fact about trucks: a loaded eighteen-wheeler needs a braking distance several times longer than a car, on the same road, from the same speed, with far bigger brakes. Bigger brakes and it still takes longer. So the difficulty cannot be about how good the brakes are. It must be about how much there is to stop. Work backward from that and you arrive at mass — not as a definition, but as the only thing left that could be responsible.` }
  ],

  map: [
    { name: `Motion`, level: 4 },
    { name: `Inertia`, level: 5 },
    { name: `Mass`, level: 4, fresh: true },
    { name: `Force`, level: 4 },
    { name: `Friction`, level: 4 },
    { name: `Acceleration`, level: 3 },
    { name: `Balance & correction`, level: 4 },
    { name: `Center of mass`, level: 3 },
    { name: `Mass vs weight`, level: 3 },
    { name: `Gravity`, level: 3 },
    { name: `Energy`, level: 1 },
    { name: `Momentum`, level: 1 }
  ]
}
