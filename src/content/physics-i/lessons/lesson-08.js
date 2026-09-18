// Physics I · Week 2 · Lesson 8 — compression and tension.
// The neutral axis introduced here is the payoff for Lesson 9's "why is a
// bridge shaped like that" reveal, so it earns its place in the formal names.

export default {
  id: 'lesson-08',
  number: 3,
  week: 2,
  title: `Compression and tension in a chair`,
  openingQuestion: `You sit down. The chair holds. Nothing visibly happens. But something is going on inside that wood — what, exactly?`,
  concept: `Compression and tension`,

  see: {
    voice: 'professor',
    line: `Slide yourself along the seat and watch where your weight decides to go.`,
    simulation: { id: 'chair-load' },
    observations: [
      { text: `Your weight splits between the two legs, and the split follows you. Sit right over one leg and the other stops working almost entirely.` },
      { text: `The two always add up to you. The chair never invents any weight and never loses any — it only decides which way to send it.` },
      { text: `And look at the seat itself: its top is being squeezed while its bottom is being stretched. One plank, both at once.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Your weight does not stop at the seat. Follow it down.`,
    sentences: [
      `Weight travels. It goes from you into the seat, from the seat into the legs, from the legs into the floor, and from the floor into the ground — and every piece it passes through is being worked on the way.`,
      `There are only two ways to work a material: squeeze it or stretch it. Almost everything is far better at one than the other, which is why materials are chosen for where they sit rather than for how strong they sound.`,
      `A plank that bends is doing both at the same time. Its upper surface is being squeezed shorter and its lower surface stretched longer — and somewhere in the middle is a line that is doing neither.`
    ],
    comparison: {
      label: `THE ROPE AND THE BROOM HANDLE`,
      body: `A rope can pull a car out of a ditch. A rope cannot push a car one inch — try it and it simply folds up. A broom handle will do a little of both. Nothing about this is surprising until you notice what it means: "strong" is not one property. The rope is enormously strong in one direction of loading and has no strength at all in the other. Ask any material which way you are loading it before you call it strong.`
    },
    naming: `Squeezing is **compression**. Stretching is **tension**. A plank being bent is in both at once, and the line through the middle doing neither has a name as well — the **neutral axis**. Hold on to that one; next lesson it explains why bridges look the way they do.`,
    formalNames: {
      terms: [
        { term: `Compression`, meaning: `Being squeezed — pushed inward from both ends. Stone, brick and concrete are superb at resisting it and poor at the other one.` },
        { term: `Tension`, meaning: `Being stretched — pulled outward from both ends. Steel cable and rope are excellent at this and useless in compression.` },
        { term: `Bending`, meaning: `Not a third thing. It is compression on one face and tension on the other, in the same piece, at the same time.` },
        { term: `Neutral axis`, meaning: `The line inside a bent beam that is neither squeezed nor stretched. It is carrying almost nothing — which sounds like a curiosity and turns out to be the most useful fact in structural engineering.` },
        { term: `Load path`, meaning: `The route weight takes from where it arrives to where it finally leaves — for you, from the seat to the planet.` }
      ],
      note: `Still Lesson 6's forces. What is new is following them *through* something rather than stopping at its surface.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Squeezed or stretched — which is each of these?`,
    items: [
      `The legs of the chair I'm sitting on.`,
      `A tow rope between two cars.`,
      `The guy-lines holding a tent up.`,
      `A shelf sagging in the middle under books.`,
      `My shin bone when I stand.`,
      `The cables hanging from a suspension bridge.`
    ],
    builder: {
      body: `Thirty seconds and a paperback. Hold it with the spine toward you and bend it into a curve. Watch the page edges: on the outside of the curve they spread apart, and on the inside they bunch together. That is tension and compression made visible, in a thing you own, and the pages near the middle barely move at all. That middle is the neutral axis, and you have just seen it do nothing.`
    },
    ownPlaceholder: `Something in the room being squeezed, or something being stretched…`,
    synthesis: `Notice that nothing in that list is doing both — except the sagging shelf, which is doing both at once and is the only one that looks like it might break.`
  },

  feynman: {
    line: `Use your hands. That is not a figure of speech — the Builder means it literally.`,
    instruction: `Explain the difference between squeezing and stretching a material, and why a chair leg and a rope are not interchangeable — **without using the words "compression" or "tension."**`,
    banned: ['compress', 'tension'],
    bannedNote: `those are the names — say what is being done to the material instead`,
    placeholder: `One of them is being pushed in from both ends…`,
    checks: [
      `One kind of loading pushes a material inward from both ends; the other pulls it outward.`,
      `Materials are usually good at one and poor at the other, so where a piece sits decides what it must be made of.`,
      `A bent plank has one face being pushed shorter and the other pulled longer.`,
      `Your weight does not stop at the surface it lands on — it travels through everything below it to the ground.`
    ],
    closing: `If you can hold up two hands and show me which is which without naming either, the Builder is satisfied and so am I.`
  },

  challenge: {
    voice: 'editor',
    line: `Two questions, and the second is the one I actually care about.`,
    prediction: {
      question: `You lay a plank between two chairs and stand in the middle of it. Which surface of the plank is being stretched?`,
      options: [
        {
          id: 'top',
          text: `The top — that's the side I'm standing on and pressing into.`,
          verdict: `The instinct is completely reasonable: that is the surface taking your weight, so surely that is the surface under strain. But think about the shape the plank takes. It sags into a curve with the middle dipping down, and the top surface is now on the *inside* of that curve — the short way round. The inside of a curve is shorter than the outside, so the top is being pushed together, not pulled apart. Your foot is pressing down, and the material directly under it is being squeezed.`
        },
        {
          id: 'bottom',
          text: `The bottom — it's on the outside of the sag.`,
          verdict: `Correct, and the reasoning is the right reasoning. The plank bows into a curve; the bottom surface is on the outside of that curve and therefore has further to travel, so it is pulled longer. The top is on the inside and is squeezed shorter. This is why a cracking floorboard splits from underneath, and why a wooden beam that has been repaired usually has the reinforcement fixed to its bottom face.`
        },
        {
          id: 'neither',
          text: `Neither — my weight is pressing down, so the whole plank is being squeezed.`,
          verdict: `You are right that everything you are doing to it is pressing downward, which makes this a very fair reading. But a plank held at both ends cannot simply squash — it has nowhere to go but to bend. And the moment it bends, the two faces are doing opposite things, because the outside of any curve is longer than the inside. Your downward press turns into a stretch on one face and a squeeze on the other. That conversion is the whole trick of a beam.`
        }
      ]
    },
    open: {
      question: `Now the one I want. A rope can pull a ton. It cannot push at all — not one pound, not one inch. What exactly is different about pushing?`,
      placeholder: `What does a rope do when you try…?`,
      reveal: [
        `When you pull a rope, every fibre lines up along the pull and shares it. Fibres are excellent at being pulled — that is essentially all they are for. When you push a rope, there is nothing holding those fibres in a straight line, so the first tiny sideways wobble gets worse rather than better, and the whole thing folds. It does not fail by breaking. It fails by *buckling*, which is a failure of shape rather than of material.`,
        `That is why compression is the harder of the two to design for. To resist a pull you only need material. To resist a push you need material *and* enough stiffness to stop it wandering sideways — which is why columns are fat, why a tent pole is rigid and a guy-line is not, and why a suspension bridge has thin cables above and thick towers underneath. The cables only ever get pulled. The towers have the hard job.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `I can now see forces traveling through a structure when…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Compression and tension arrived together today, which is appropriate — you will rarely meet one without the other.`,
    tomorrow: `Tomorrow, Lesson 9: the same idea, with a truck on it. We put a load on a bridge and watch the whole structure rearrange itself.`
  },

  routes: [
    { id: 'analogy', body: `Think of a crowd of people. To stop a crowd spreading out, you need them holding hands — that is tension, and hands are quite good at it. To stop a crowd being squashed together, holding hands is useless; you need each person to be individually solid enough not to be crushed. Ropes are a crowd holding hands. Columns are a crowd of solid people. Neither can do the other's job.` },
    { id: 'object', body: `Take a rubber band and pull it: it stretches, resists, and pulls your fingers back together. Now push the two ends toward each other: it collapses instantly and offers nothing. Now do both to a pencil. The pencil resists the squeeze easily and snaps if you bend it far. Two objects, four experiments, and you have the entire behaviour of every structural material in your hands.` },
    { id: 'story', body: `A man builds a bookshelf and puts a long span of pine between two uprights. It looks fine. A year later it has a permanent bow in it, and when he takes the books off it does not come back. What failed was not the wood's strength — nothing broke. The bottom surface spent a year being stretched and slowly gave in. A steel strip screwed along the underside would have fixed it, and along the top would have done almost nothing.` },
    { id: 'experiment', body: `Right now, with a paperback: bend it and watch the page edges. Outside of the curve, the pages fan apart. Inside, they crush together. Middle: almost unchanged. Then try bending a single sheet of paper the same way — it offers no resistance at all, because it has almost no thickness and therefore almost no distance between its squeezed face and its stretched one. Thickness is what lets a beam argue.` },
    { id: 'smaller', body: `Smaller question, no chairs. Take a strip of anything and bend it into a curve. Is the outside edge of the curve longer or shorter than the inside edge? Longer — obviously, it has further to go round. Now: if both edges were the same length before you bent it, and one is longer now, what happened to that edge? It got stretched. And the other one got squeezed. That is bending, derived from geometry, with no physics at all.` },
    { id: 'backward', body: `Start with a suspension bridge. Look at the shape: enormously thick towers, and above them cables no thicker than your arm holding up the entire deck. If thickness meant strength, that arrangement is mad. It only makes sense if the cables and the towers are doing two different jobs, and the cable's job is one that steel can do brilliantly with very little material. Work backward from that photograph and you arrive at the difference between being pulled and being pushed.` }
  ],

  map: [
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Compression`, level: 4, fresh: true },
    { name: `Tension`, level: 4, fresh: true },
    { name: `Support force`, level: 4 },
    { name: `Static friction`, level: 4 },
    { name: `Kinetic friction`, level: 4 },
    { name: `Momentum`, level: 4 },
    { name: `Mass`, level: 4 },
    { name: `Gravity`, level: 4 },
    { name: `Velocity`, level: 3 },
    { name: `Acceleration`, level: 3 },
    { name: `Energy`, level: 2 }
  ]
}
