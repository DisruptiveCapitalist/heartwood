// Physics I · Week 1 · Lesson 1 — inertia.
// Copy is the tested prototype's, unchanged. Markup: **bold**, *italic*.

export default {
  id: 'lesson-01',
  number: 1,
  week: 1,
  title: `The passenger who keeps going`,
  openingQuestion: `You're in a car doing 40. The driver stands on the brakes. The car stops — and your body doesn't. Why?`,
  concept: `Inertia`,

  see: {
    voice: 'professor',
    line: `{name}, look at this. Don't read yet — press the brake.`,
    simulation: { id: 'braking-car', props: { brakeStrength: 26 } },
    observations: [
      { text: `The brakes are attached to the *car*. They grab the wheels, the wheels grab the road, and the car slows down.` },
      { text: `Nothing is attached to *you*. Nothing reached in and told your body about the brakes.` },
      { text: `So the car is now doing 0. And you are still doing 40 — until something stops you too.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. That's the whole idea.`,
    sentences: [
      `Things don't change their motion on their own. A thing that's still stays still. A thing that's moving keeps moving, in the same direction, at the same speed.`,
      `The only thing that changes motion is a push or a pull — a **force**. No force, no change.`,
      `The brakes push on the car. Nothing pushes on you. So the car's motion changes and yours doesn't — and the gap between the two is what you feel.`
    ],
    comparison: {
      label: `THE PICKUP TRUCK`,
      body: `You're standing in the bed of a pickup truck. The driver accelerates — you fall toward the tailgate. He brakes — you stumble toward the cab. You didn't get pushed either time. The *truck* moved out from under you, and your body kept doing what it was already doing.`
    },
    naming: `Physics has a name for this stubbornness: **inertia**. But notice — you understood it before you had the word. That's the right order, and it's the only order we'll use here.`,
    formalNames: {
      terms: [
        { term: `Newton's First Law of Motion`, meaning: `The law you just used. Also called *the law of inertia*. A thing keeps doing what it's doing unless a force acts on it.` },
        { term: `Inertia`, meaning: `The stubbornness itself — a thing's resistance to any change in its motion. Heavier means more of it.` },
        { term: `Net force`, meaning: `All the pushes and pulls added together. If they cancel out, the motion doesn't change — which is why "no net force" is not the same as "nothing happening."` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Okay — where else have you felt this? Tap any you've noticed.`,
    items: [
      `Coffee sloshes forward when I stop the car.`,
      `Groceries slide off the seat.`,
      `I sway backward when a bus pulls away.`,
      `Standing on a train that brakes.`,
      `Shaking a ketchup bottle to get it moving.`,
      `My knees keep going when I stop walking downhill.`
    ],
    ownPlaceholder: `Somewhere you've felt your body keep going after something stopped…`,
    synthesis: `Good. Every one of those is the same sentence wearing different clothes: something stopped, and what was inside it didn't.`
  },

  feynman: {
    line: `Your turn to teach it.`,
    instruction: `Explain why your body moves forward when a car suddenly stops — **without using the word "inertia."**`,
    banned: ['inerti'],
    bannedNote: `you used the word — try saying it without`,
    placeholder: `Say it the way you'd say it to a sharp 12-year-old…`,
    checks: [
      `The car was made to slow down by something real — the brakes.`,
      `Nothing did that job on your body.`,
      `A moving thing keeps moving unless something acts on it.`,
      `So you keep going — and the seat and belt are what finally stop you.`
    ],
    closing: `If your version has all four in plain words, you don't need the technical term at all. That's the test.`
  },

  challenge: {
    voice: 'editor',
    line: `Two questions. I'm not trying to catch you — I'm testing whether the idea holds.`,
    prediction: {
      question: `Drop a 10-pound ball and a 5-pound ball from the same height, at the same moment. What happens?`,
      options: [
        {
          id: 'heavy',
          text: `The 10-pound ball lands first — gravity pulls harder on it.`,
          verdict: `That's the answer almost everyone gives, and the first half is true: gravity does pull harder on the heavier ball. But the heavier ball is also harder to get moving — twice the pull, twice the stubbornness. The two cancel. They land together. Galileo's point, and it's genuinely strange.`
        },
        {
          id: 'together',
          text: `They land at the same moment.`,
          verdict: `Correct — and here's why it belongs in today's lesson. Gravity pulls twice as hard on the 10-pound ball, but that ball is also twice as stubborn about being moved. The extra pull is spent overcoming the extra stubbornness. Same mass doing both jobs, so it cancels exactly. (Drop a feather and you'll see air, not gravity, doing the talking.)`
        },
        {
          id: 'light',
          text: `The 5-pound ball lands first — it's easier to move.`,
          verdict: `Good instinct, wrong direction — and it's the mirror image of the usual mistake. Yes, the lighter ball is easier to move. But gravity also pulls on it less, in exactly the same proportion. Easier to move, pulled less: cancels. They land together.`
        }
      ]
    },
    open: {
      question: `Now the hard one. If nothing is pushing you forward when the car brakes — why does it feel *exactly* like something is?`,
      placeholder: `Have a go before you read mine…`,
      reveal: [
        `Because something *is* pushing — just not forward, and not on the part of you that you're noticing. The seat and the belt push *backward* on you to slow you down. Your chest gets that message first; your stomach gets it a fraction later. What you call "being thrown forward" is really the feeling of being stopped unevenly. The sensation is real. The forward push is not.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 2: why a bicycle stays up while it's moving and falls over when it isn't. Same stubbornness, wearing a different hat.`
  },

  routes: [
    { id: 'analogy', body: `Think of a tablecloth trick. Yank the cloth off the table and the plates stay put — they were never told to move. The cloth is the car. The plates are you. Pulling the cloth out fast doesn't move the plates; it just removes what was underneath them. Braking is the same trick, played in reverse.` },
    { id: 'object', body: `Pick up a full mug of coffee and walk. Now stop walking, abruptly. The coffee climbs the far side of the mug. You stopped the mug; nobody stopped the coffee. Your body in a car is the coffee. The car is the mug.` },
    { id: 'story', body: `A man is standing in the aisle of a bus, holding nothing, reading his phone. The driver brakes for a dog. The man walks four fast steps up the aisle without deciding to — then apologizes to a stranger. He didn't get pushed. He was simply the only thing on that bus the brakes weren't connected to.` },
    { id: 'experiment', body: `Put a book on a kitchen towel on the counter. Slide the towel slowly — the book comes along. Now yank the towel fast — the book barely moves. Same towel, same book. The only difference is how fast you changed the towel's motion. That's the whole lesson, in your kitchen, in ten seconds.` },
    { id: 'smaller', body: `Forget the car. Just this: if you're walking at a steady pace and you don't do anything at all — no muscles, no decision — do you keep walking or do you stop? Keep going, of course. Now: what would have to happen to stop you? Something would have to push against you. Hold that, and the car answers itself.` },
    { id: 'backward', body: `Start with the bruise. Seatbelts exist because people used to hit windshields. Why would you hit a windshield if the car was stopping? Work backward from that fact and you're forced to conclude that the car stopping and you stopping are two separate events — and only one of them had brakes.` }
  ],

  map: [
    { name: `Motion`, level: 4 },
    { name: `Force`, level: 3 },
    { name: `Inertia`, level: 4 },
    { name: `Mass vs weight`, level: 2 },
    { name: `Acceleration`, level: 2 },
    { name: `Gravity`, level: 1 },
    { name: `Momentum`, level: 0 },
    { name: `Energy`, level: 0 }
  ]
}
