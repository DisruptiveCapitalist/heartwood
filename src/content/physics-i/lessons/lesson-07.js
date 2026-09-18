// Physics I · Week 2 · Lesson 7 — static and kinetic friction.
// Stands on Lesson 3, which named friction; this one finds it has two settings.

export default {
  id: 'lesson-07',
  number: 2,
  week: 2,
  title: `Friction: the force that stops everything`,
  openingQuestion: `A heavy box will not budge, and will not budge, and will not budge — and then it goes, and suddenly slides more easily than you were braced for. Why is starting it harder than keeping it going?`,
  concept: `Static and kinetic friction`,

  see: {
    voice: 'professor',
    line: `Lean on it and keep leaning. Watch the second number while nothing is happening.`,
    simulation: { id: 'box-push' },
    observations: [
      { text: `While it is still, the floor pushes back with *exactly* your push. Ten pounds, ten back. Forty, forty back. It is matching you.` },
      { text: `It can only do that up to a limit — the red mark. Past that, the surfaces let go.` },
      { text: `And the moment they do, the resistance *drops*. Your push is suddenly bigger than what is fighting it, and the box lurches away from you.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Lesson 3 gave you friction. It turns out to have two settings, and the change between them is the lesson.`,
    sentences: [
      `While two surfaces are not sliding, friction is not a fixed amount at all — it is whatever your push is, pointing the other way. It does not resist by a set amount; it resists by *exactly enough*.`,
      `That obliging behaviour has a ceiling. Push past it and the surfaces break loose and begin to slide across one another.`,
      `Once they are sliding, the resistance settles at a lower value than the ceiling was. So the instant it breaks free, you are pushing harder than necessary — and the box jumps.`
    ],
    comparison: {
      label: `THE JAR LID`,
      body: `You strain at a jar until your hand hurts, and then it gives — and spins off freely with two fingers. Nothing about the jar changed in that instant. You did not suddenly get stronger. What happened is that the lid stopped being stuck and started being merely tight, and those are governed by two different numbers. Every stiff drawer, every stuck window and every heavy box in your life has done this to you.`
    },
    naming: `The obliging, matching version is **static friction** — static meaning "not sliding". The lower, steady one is **kinetic friction** — kinetic meaning "sliding". The ceiling on the static one is what you are straining against, and crossing it is the lurch.`,
    formalNames: {
      terms: [
        { term: `Static friction`, meaning: `The resistance between surfaces that are not sliding. Not a fixed value — it matches whatever is applied, up to a maximum.` },
        { term: `Kinetic friction`, meaning: `The resistance once they are sliding. Roughly constant, and for most pairs of materials noticeably smaller than the static maximum.` },
        { term: `Breakaway`, meaning: `The moment the applied force exceeds the static maximum and the surfaces let go. The lurch you feel is not the box speeding up so much as the resistance falling away.` },
        { term: `Coefficient of friction`, meaning: `From Lesson 3, and now there are two of them for every pair of surfaces — one static, one kinetic. Rubber on dry road: about 0.9 and 0.7.` }
      ],
      note: `Nothing new in the laws here. This is Lesson 3's friction, looked at closely enough to see that it behaves differently before and after the surfaces let go.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `The jump from stuck to sliding — where have you felt it?`,
    items: [
      `A jar lid that suddenly gives.`,
      `A drawer that sticks and then flies open.`,
      `Shoving furniture that lurches once it goes.`,
      `A car tire that grips, then skids.`,
      `A ladder's feet holding — until they don't.`,
      `Pulling a tablecloth slowly versus quickly.`
    ],
    builder: {
      body: `One minute, one book, one finger. Put a book on a table and push it sideways with one finger, increasing the pressure very slowly. Pay attention to your finger, not the book. You will feel the resistance build and build, then let go — and for a moment the book moves faster than you meant. Do it again and try to push so gently that it slides steadily. It is genuinely hard, and now you know why.`
    },
    ownPlaceholder: `Something that was stuck, and then was suddenly too easy…`,
    synthesis: `Every one of those has the same shape: a struggle, a moment of letting go, and then an unexpected ease. That shape is the gap between the two numbers.`
  },

  feynman: {
    line: `Teach it to someone who has just shoved a wardrobe into a wall.`,
    instruction: `Explain why getting something moving is harder than keeping it moving — **without using the words "static" or "kinetic."**`,
    banned: ['static', 'kinetic'],
    bannedNote: `both of those are labels — the idea does not need them`,
    placeholder: `While it isn't moving, the floor is doing something particular…`,
    checks: [
      `While it is still, the floor pushes back with exactly as much as you push, not a fixed amount.`,
      `There is a limit to how much it can match. Past that, the surfaces let go.`,
      `Once they are sliding, the resistance is lower than the limit was.`,
      `So at the moment it breaks free you are pushing harder than you now need to — hence the lurch.`
    ],
    closing: `If your version also explains a jar lid, you have it. It is the same two numbers wearing a different hat.`
  },

  challenge: {
    voice: 'editor',
    line: `Here is a question that cost the car industry about forty years to get right.`,
    prediction: {
      question: `You brake hard to avoid something. Which stops you in a shorter distance — the wheels locked solid and skidding, or the wheels right at the edge of gripping but still turning?`,
      options: [
        {
          id: 'locked',
          text: `Locked and skidding — the tire is dragging with its whole surface.`,
          verdict: `This is what almost everyone believed, and driving instructors taught it, until anti-lock brakes proved otherwise. The instinct about contact is worth examining: friction barely depends on how much surface is touching, which is surprising on its own. But the real problem is the sliding. A locked wheel is *sliding* on the road, and sliding is the lower of the two numbers. You have chosen the weaker grip, and given up steering as well — a skidding tire cannot point you anywhere.`
        },
        {
          id: 'edge',
          text: `Right at the edge of gripping, still turning.`,
          verdict: `Correct, and it is the entire reason anti-lock brakes exist. A rolling tire is not sliding on the road — the patch touching the ground is momentarily still against it, so you have the higher, static number available. Cross the line into a skid and the grip drops to the lower one. ABS does one thing: it senses a wheel about to lock and eases off, dozens of times a second, keeping you just below the ceiling. It is your finger on the box, trying not to break it free.`
        },
        {
          id: 'same',
          text: `No difference — same rubber, same road, same weight.`,
          verdict: `Everything you have listed is identical, which is exactly what makes the answer interesting. The materials are not what changed. What changed is whether the two surfaces are gripping or sliding, and those are governed by two different numbers for the very same pair of materials. That is the whole lesson: friction is not one property of rubber-on-asphalt. It is two, and you choose which one you get.`
        }
      ]
    },
    open: {
      question: `Now one that ought to feel contradictory. Friction is how you walk, how you drive, how you hold a cup and how you stop. So why do engineers spend enormous effort *reducing* it — oil, bearings, polished surfaces, graphite?`,
      placeholder: `Is all friction the same kind of friction…?`,
      reveal: [
        `Because there are two kinds, and they are not distinguished by physics — they are distinguished by whether you wanted them. Friction at the tire, the brake pad and the sole of your shoe is doing a job you chose: it is the only reason any of those work. Friction inside the wheel bearing, the engine and the hinge is doing no job at all. It is the same phenomenon in the wrong place.`,
        `And unwanted friction is not merely wasteful — it is destructive. Every bit of it turns motion into heat and takes a little material with it, which is what wear is. So an engineer's real aim is not less friction. It is friction exactly where it is useful and nowhere else, which is why a car has both the grippiest rubber they can buy and the slipperiest bearings they can afford, forty inches apart.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes and you're done.`,
    prompt: `Friction is both a problem and a solution because…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Friction has reached "use": you predicted a braking distance with it, and got there ahead of several decades of car design.`,
    tomorrow: `Tomorrow, Lesson 8: you sit down on a chair and your weight goes somewhere. We follow it into the wood.`
  },

  routes: [
    { id: 'analogy', body: `Think of two hook-and-loop strips pressed together — velcro. Pull gently and nothing happens; the hooks flex and hold. Pull harder and they hold harder. Pull past what they can take and they let go all at once, with that ripping sound, and from then on the two strips slide over each other easily. Surfaces do the same thing with roughness far too small to see: grip, grip, grip, let go, slide.` },
    { id: 'object', body: `Find a jar with a tight lid. Put your hand on it and turn, slowly increasing the effort. Stop just before it gives and hold there — right now the lid is pushing back against you with precisely your effort, and if you ease off it eases off too. That obliging quality is the thing to notice. Then turn a little more and feel it give, and feel how little effort it takes after that.` },
    { id: 'story', body: `A woman is pushing a chest of drawers across a bedroom. She braces, strains, gets nowhere, braces harder — and then it goes, all at once, and slams into the skirting board and takes a chip out of the paint. She blames herself for pushing too hard. She did not push too hard. She pushed exactly as hard as was needed right up until the instant when it stopped being needed.` },
    { id: 'experiment', body: `Put a coin on a book and tilt the book very slowly. For a long while nothing happens — the coin is being held by a force that grows as the tilt grows, matching it. Then at some angle it lets go and slides all the way down, accelerating. That angle is where the matching ran out. Tilt it again and see how repeatable it is; that repeatability is why friction can be given a number.` },
    { id: 'smaller', body: `Smaller question. While the box is sitting still and you are pushing it with ten pounds and it is not moving — what is the total force on the box? It must be zero, because nothing is changing, and Lesson 1 says so. So something is supplying ten pounds in the other direction. Where else could it come from but the floor? And if you pushed with forty instead, the answer would still have to be zero. Now you know the floor's push is not a fixed number.` },
    { id: 'backward', body: `Start from anti-lock brakes. Car makers spend real money on a system whose only function is to *stop the wheels locking* during emergency braking. If a locked, skidding wheel stopped you faster, that system would be a very expensive way of making cars worse. It is not — it measurably shortens stopping distances. So a sliding tire must grip less well than a rolling one, and you have just derived the two numbers from the existence of a warning light on your dashboard.` }
  ],

  map: [
    { name: `Motion`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Force`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Static friction`, level: 4, fresh: true },
    { name: `Kinetic friction`, level: 4, fresh: true },
    { name: `Support force`, level: 4 },
    { name: `Momentum`, level: 4 },
    { name: `Mass`, level: 4 },
    { name: `Gravity`, level: 4 },
    { name: `Velocity`, level: 3 },
    { name: `Acceleration`, level: 3 },
    { name: `Mass vs weight`, level: 3 },
    { name: `Energy`, level: 2 }
  ]
}
