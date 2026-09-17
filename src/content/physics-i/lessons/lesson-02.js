// Physics I · Week 1 · Lesson 2 — dynamic stability.
// Copy is the tested prototype's, unchanged. Markup: **bold**, *italic*.

export default {
  id: 'lesson-02',
  number: 2,
  week: 1,
  title: `The bicycle that is always falling over`,
  openingQuestion: `A bicycle stands up beautifully while it's moving and tips over the moment it stops. Nothing about the bicycle changed. So what did?`,
  concept: `Dynamic stability`,

  see: {
    voice: 'professor',
    line: `You're riding it. Try to keep it up — first at 12 mph, then drag the speed to zero.`,
    simulation: { id: 'bicycle-balance', props: { steerAuthority: 90 } },
    observations: [
      { text: `At **12 mph** you can catch it. Steer toward whichever way it's tipping and it comes back under you.` },
      { text: `At **2 mph** the same steering barely helps. You saw over-corrections and a wobble.` },
      { text: `At **0 mph** nothing you do with the handlebars matters at all. Down it goes.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Here's the part that surprises most people.`,
    sentences: [
      `A bicycle is never balanced. It is *always* falling — a little left, then a little right. Gravity pulls on your weight up high, and the two thin wheels underneath are a terrible place to hold it.`,
      `Staying up isn't resisting the fall. It's **steering the wheels back underneath the fall**, over and over, a dozen times a second, so small you never notice you're doing it.`,
      `Speed is what makes that trick work. Turn the bars while rolling fast and the bike swings sideways hard and immediately. Turn them while stopped and the bike goes nowhere — so there's nothing to catch yourself with.`
    ],
    comparison: {
      label: `THE BROOM ON YOUR PALM`,
      body: `Stand a broom upright on your open palm. You don't hold it still — you can't. You shuffle your hand under it constantly, chasing the tip. Freeze your hand and the broom is on the floor in a second. Your hand is the bicycle's front wheel, and the shuffling is the steering. The bicycle is a broom you're riding.`
    },
    naming: `So "learning to ride a bike" was never learning to balance. It was your body learning to make corrections faster than you can think about them. That's why you can't forget how — and why you couldn't explain it even when you could do it.`,
    formalNames: {
      terms: [
        { term: `Dynamic stability`, meaning: `Staying up by being constantly corrected. Its opposite is *static stability* — a tripod, a kickstand, a parked car, steady with nobody doing anything.` },
        { term: `Inverted pendulum`, meaning: `The engineer's name for the object itself: a weight held *above* its support instead of hanging below it. A bicycle, a broom on your palm, a standing person, a rocket landing on its tail — all the same problem.` },
        { term: `Countersteering`, meaning: `The rider's trick: turn the wheel *into* the lean to bring the base back under the weight.` },
        { term: `Center of mass`, meaning: `The single point where a thing's weight effectively acts. Balance is the business of keeping it over the base.` }
      ],
      note: `Note that none of these is a new law. This whole lesson is Lesson 1's law — Newton's First — applied to something that is tipping over.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Same trick, different object. Which of these have you done?`,
    items: [
      `Carrying a full tray across a room.`,
      `Standing on one foot to put a sock on.`,
      `Balancing a ladder while I move it.`,
      `Steadying a canoe by shifting my weight.`,
      `Walking on ice in little quick steps.`,
      `Holding a camera steady without a tripod.`
    ],
    builder: {
      body: `Two minutes, no equipment. Stand up and balance on one foot. Now look down at that foot — you'll see the ankle and toes working constantly. Now close your eyes and it gets much harder, because the corrections depend on information arriving fast. Same system, no bicycle required.`
    },
    ownPlaceholder: `Something you keep upright by constantly correcting it…`,
    synthesis: `Notice the pattern: in every one of them, "steady" is not a state. It's an activity.`
  },

  feynman: {
    line: `Teach it to a ten-year-old who has just fallen off.`,
    instruction: `Explain why a bicycle stays up when it's moving and falls when it stops — **without using the words "gyroscope" or "momentum."**`,
    banned: ['gyroscop', 'momentum'],
    bannedNote: `one of the two words slipped in — try without it`,
    placeholder: `In your own words…`,
    checks: [
      `The bicycle is always tipping — gravity never stops pulling.`,
      `Turning the front wheel moves the bottom of the bike sideways.`,
      `So you keep putting the wheels back under your weight, constantly.`,
      `Rolling fast makes that correction strong and quick; stopped, it does nothing.`
    ],
    closing: `If your explanation says "the wheels hold it up," it will fail the next question. Go on to the Editor.`
  },

  challenge: {
    voice: 'editor',
    line: `The popular answer to this one is wrong, and I want to take it away from you carefully.`,
    prediction: {
      question: `Most people say a moving bicycle stays up because the spinning wheels act like gyroscopes and resist tipping. True?`,
      options: [
        {
          id: 'yes',
          text: `Yes — the spinning wheels resist tipping. That's what holds it up.`,
          verdict: `It's the answer in a lot of textbooks, and it's still mostly wrong. The gyroscope effect from a bicycle wheel is real but tiny — far too weak to hold up a person. Researchers built a bicycle with extra wheels spinning backward to cancel the effect completely, and it rode perfectly well. Something else is doing the work.`
        },
        {
          id: 'steer',
          text: `No — you're steering constantly, mostly without noticing it.`,
          verdict: `That's it, and you've now got something most cyclists don't. Balancing a bicycle is a continuous act of steering the wheels back under your falling weight. The gyroscope effect contributes a little — it helps the front wheel flop toward a lean on its own, which makes the bike easier to ride — but it isn't what holds you up. Steering is.`
        },
        {
          id: 'momentum',
          text: `It's the forward momentum that keeps it from tipping sideways.`,
          verdict: `Careful — this mixes up two directions. Forward momentum is about going forward; tipping happens sideways, and momentum in one direction doesn't resist motion in another. What speed genuinely does is make steering effective: turn the bars at 15 mph and the bike swings sideways hard and instantly. At 0 mph the same turn does nothing at all. Speed doesn't resist the fall — it gives you the tool to catch it.`
        }
      ]
    },
    open: {
      question: `So here's my test of your understanding. I clamp the handlebars so they cannot turn, then push you along at 15 mph. How long do you stay up — and why?`,
      placeholder: `Your prediction first…`,
      reveal: [
        `A second or two, and over. This experiment has actually been done. Lock the steering and even an expert rider goes down almost immediately, at any speed — because the one tool that keeps a bicycle upright has been taken away. Meanwhile, engineers have built bicycles with a second set of wheels spinning backward, cancelling the gyroscope effect entirely, and those bikes still ride fine. Between those two experiments, the popular answer has nowhere left to stand.`,
        `Gravity is doing the tipping. Steering is doing the saving. Speed is what makes steering powerful enough to win.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes and you're done.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `"Balance" arrived today and went straight past recognize — you can now explain it.`,
    tomorrow: `Tomorrow, Lesson 3: why a rolling ball eventually stops — and where, exactly, its motion goes. You'll need Lesson 1 for it.`
  },

  routes: [
    { id: 'analogy', body: `A waiter with a tray on his fingertips. The tray is never balanced — it's always starting to tip. He keeps sliding his hand under the heavy side. Ask him how he balances it and he'll say "you just do it." He's steering, exactly like a bicycle, just with a hand instead of a front wheel.` },
    { id: 'object', body: `Take a pencil and stand it upright on one fingertip. Watch what your finger does — it never stops moving. Now try it with a broom instead: much easier, because it falls slowly and gives you time to react. A bicycle is closer to the broom than the pencil, which is the only reason humans can ride one at all.` },
    { id: 'story', body: `Think of the first time a child rides without a hand on the seat. The parent lets go and the bike immediately wanders — left, right, left — a drunken line down the sidewalk. Those wide swerves are corrections that are far too big. A year later the child rides a straight line, and the corrections are still there. They've just gotten small.` },
    { id: 'experiment', body: `Stand up and balance on one foot for thirty seconds. Feel the ankle working. Now close your eyes — most people last only a few seconds. Nothing changed about your leg or your weight. What changed is how fast the corrections could be made. That's the whole bicycle, standing in your hallway.` },
    { id: 'smaller', body: `Smaller question: if a bicycle is leaning to the right and about to fall, which way would you have to move the bottom of it to get back under your weight — left or right? To the right, under the fall. Now: what's the only control on a bicycle that moves the bottom of it sideways? The handlebars. You've just derived the answer.` },
    { id: 'backward', body: `Start with a fact: a parked bicycle needs a kickstand, and a moving one doesn't. A kickstand does exactly one thing — it widens the base. So a moving bicycle must be getting the same service some other way: something is repeatedly putting the base back under the weight. The only candidate is the front wheel, and the only thing that aims it is the handlebars.` }
  ],

  map: [
    { name: `Motion`, level: 4 },
    { name: `Inertia`, level: 4 },
    { name: `Balance & correction`, level: 4, fresh: true },
    { name: `Force`, level: 3 },
    { name: `Center of mass`, level: 3, fresh: true },
    { name: `Mass vs weight`, level: 2 },
    { name: `Acceleration`, level: 2 },
    { name: `Gravity`, level: 2 },
    { name: `Momentum`, level: 1 }
  ]
}
