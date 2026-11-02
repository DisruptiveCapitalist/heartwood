// Navigation · Week 1 · Lesson 1 — what it means to know where you are.
//
// Copy is transcribed from the approved design reference, not rewritten. The
// learner used this lesson and signed it off; the handoff says to treat it as
// final, and his reaction to it is the product requirement: "It did not feel
// like school. This I can see with my mind."
//
// The SEE IT geometry is load-bearing and the handoff says to keep it:
// the ray and the tower circle meet at exactly one point, the two circles meet
// at two, and all three agree at (560, 390). ClueMap.jsx carries the check.

export default {
  id: 'lesson-01',
  number: 1,
  week: 1,
  title: `What does it mean to know where you are?`,
  openingQuestion: `A friend phones you, lost somewhere in a big park. "Don't worry," she says, "I'm walking north." Can you find her?`,
  concept: `Position needs a reference`,

  see: {
    voice: 'professor',
    line: `Here's the park. Turn on what she tells you, one clue at a time, and watch where she could be.`,
    simulation: { id: 'clue-map' },
    observations: [
      { text: `"I'm walking north" changed nothing. Which way she's **going** says nothing about where she **is**.` },
      { text: `The clues that helped all mentioned something you **both** know: the water tower, the oak.` },
      { text: `Each useful clue put her on a line or a circle. Where two of them cross, the search gets small.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. Everything in this course rests on them.`,
    sentences: [
      `"Here" means nothing on its own. A place can only be described **compared to something else** — something both people already know.`,
      `A direction tells you **which way**. A distance tells you **how far**. Either one alone leaves a whole line or circle of possibilities. Both together, from the same known thing, give you one spot.`,
      `Every navigation problem is four questions: **Where am I? Where am I going? Which way? How far?** Lose the first, and the other three can't help you.`
    ],
    comparison: {
      label: `DIRECTIONS TO YOUR HOUSE`,
      body: `You've done this a hundred times. "From the church, go two blocks north. We're the white house on the left." The church is the reference everyone knows. North is the direction. Two blocks is the distance. The white house is the check that tells them they've arrived. You were navigating for other people long before this lesson.`
    },
    naming: `This is why a compass on its own can't tell you where you are. It tells you which way north is — from **anywhere** on Earth. Direction is easy to carry. Position has to be worked out.`,
    formalNames: {
      terms: [
        { term: `Position`, meaning: `Where something is, described relative to something known.` },
        { term: `Reference point`, meaning: `The known thing you measure from — the water tower, the church. Navigators also say **landmark**; on a map it may be called a **datum**.` },
        { term: `Bearing`, meaning: `A direction given as an angle measured from north. "Straight north" is a bearing of 0°. Week 2 is all about these.` },
        { term: `Line of position`, meaning: `The line — or circle — you know you're somewhere on, after one good clue. Exactly what you saw on the map.` },
        { term: `Fix`, meaning: `Where two or more lines of position cross. Your best answer to "where am I?"` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `You do this every week. Which of these sound familiar?`,
    items: [
      `Giving someone directions to my house.`,
      `"I'm parked by the cart return, near the garden center."`,
      `Meeting someone at the airport: "Gate B12, by the coffee stand."`,
      `The "You are here" star on a mall map.`,
      `Telling a 911 operator the nearest cross street or mile marker.`,
      `"Turn left where the old gas station used to be."`
    ],
    builder: {
      body: `Stand at your front door. Say out loud, in one sentence, where your car or mailbox is — using a reference, a direction, and a distance. Now say it again from a **different** reference: the garage, a tree, the street corner. Same car, two perfectly good descriptions. Position is never one fixed sentence; it depends on what you measure from.`
    },
    acrossCultures: {
      place: `THE CAROLINE ISLANDS, MICRONESIA`,
      label: `DOCUMENTED REGIONALLY`,
      paragraphs: [
        `Traditional navigators of the central Caroline Islands — recorded on Puluwat by the anthropologist Thomas Gladwin and the navigator-physician David Lewis in the 1960s and '70s — kept track of a voyage by choosing a reference island off to one side, out of sight. As the canoe traveled, they pictured that island sliding backward along the horizon, beneath a sequence of known rising and setting stars. Each step of the reference island marked a stage of the journey. The system is called **etak**.`,
        `It's today's lesson exactly: you can't know where you are without something to measure against. They simply chose an island they couldn't see.`
      ],
      uncertain: `scholars still discuss whether etak is best understood as a calculation method or as a way of picturing the voyage, and how far beyond the central Carolines it was used.`,
      sources: `Gladwin, *East Is a Big Bird* (1970); Lewis, *We, the Navigators* (1972).`
    },
    ownPlaceholder: `A time I gave or followed directions…`,
    synthesis: `Every one of those works only because both people share the reference. The minute they don't, "by the gate" means nothing.`
  },

  feynman: {
    line: `This is the one stage that counts. Write it and the lesson is yours.`,
    instruction: `Explain to your friend in the park why "I'm walking north" didn't help you find her — **without using the words "direction" or "location."**`,
    banned: ['direction', 'location'],
    bannedNote: `one of those came back — and the explanation works without either`,
    placeholder: `You told me which way you were walking, but…`,
    checks: [
      `Which way someone is heading says nothing about where they are.`,
      `A place can only be described compared to something both people know.`,
      `You need which way and how far — from that known thing.`,
      `Each good clue narrows the possibilities; two that cross can pin down one spot.`
    ],
    closing: `If your version has "compared to what?" in it, you have the whole of this course's first idea.`
  },

  challenge: {
    voice: 'editor',
    line: `Let's see if it holds up somewhere without a park.`,
    prediction: {
      question: `A boat radios the coast guard at night: "We are ten miles from the lighthouse." The coast guard knows exactly where the lighthouse is. How many places could the boat be?`,
      options: [
        {
          id: 'one',
          text: `One place — they know the lighthouse and the distance.`,
          verdict: `It feels that way, because the lighthouse is so specific. But ten miles from the lighthouse is true of a boat to its north, south, east, west, and everywhere in between. You have a distance with no direction. The boat is somewhere on a circle ten miles around the light — on the sea side of it, anyway. The coast guard needs one more clue.`
        },
        {
          id: 'two',
          text: `Two places — one on each side of the lighthouse.`,
          verdict: `You're thinking in a straight line, along the coast. But distance doesn't care about the coast; ten miles from the lighthouse traces a full circle. The boat could be anywhere on the sea side of that circle. Two places is what you'd get if they added a second clue — say, a distance from a buoy — and the two circles crossed.`
        },
        {
          id: 'circle',
          text: `Anywhere on a circle around the lighthouse.`,
          verdict: `That's it. A distance from one known point puts you on a circle — exactly what the water-tower clue did in the park. Navigators call it a circle of position. The coast guard now knows the boat is somewhere on that ring, out on the water side. Add a direction ("the lighthouse is due east of us") and the circle shrinks to a single point.`
        }
      ]
    },
    open: {
      question: `Your friend at the county fair says, "I'm right next to the Ferris wheel." That sounds like a perfectly good position. When does it stop being good enough?`,
      placeholder: `It works until…`,
      reveal: [
        `Two ways. First, when the other person doesn't share the reference: "next to the Ferris wheel" is useless to someone who has never been to this fair and doesn't know there is one. A reference only works if both people know it.`,
        `Second, when the job needs more precision than the reference gives. It's fine for walking over to meet her. It's not enough to hand someone a lost pair of glasses, and it's far too much detail for a pilot flying overhead. A good position is as precise as the job requires — no more, no less. Navigators think about that constantly.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then you're done.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 2: the Earth beneath our feet. Why the ground looks perfectly flat, why it isn't, and why a navigator has to care about the difference.`
  },

  routes: [
    { id: 'compass', label: `Explain it with a compass`, body: `A compass works the same way in your kitchen, in Ohio, and in the middle of the Pacific. It tells you which way north is from wherever you happen to be standing. That's exactly why it can't tell you where you're standing. Direction travels with you. Position has to be measured against something that stays put.` },
    { id: 'map', label: `Explain it with a map`, body: `Think of the "You are here" star on a mall map. Cut the star out and hand it to someone, and it means nothing. It only works because the stores are printed around it. The star is your position; the stores are the reference points. Without them, the star is just a star.` },
    { id: 'object', label: `Use an everyday object`, body: `Where's the salt? "Two feet to the left of the stove." The stove is the reference, left is the direction, two feet is the distance. Now try it without the stove: "The salt is two feet to the left." Of what? That missing 'of what' is the whole lesson.` },
    { id: 'diagram', label: `Show me a diagram`, body: `Go back to SEE IT and try this order: turn on only the water-tower distance clue. A circle. Turn it off, and turn on only the 'tower is north of me' clue. A line. Now turn both on. The line crosses the circle in exactly one spot. One clue gives a shape; two clues crossing give a place.` },
    { id: 'example', label: `Walk me through an example`, body: `A pizza driver calls: "Where are you?" You say "Maple Street." That's a line — the whole street. They ask, "Near which end?" You say "By the school." Now it's a short stretch. "Third house past the school, blue door." One house. Each answer was a reference plus something more, and each one shrank the search.` },
    { id: 'smaller', label: `Break it into smaller steps`, body: `Step one: if I say "go north," can you do it? Yes — anyone can. Step two: if I say "come to me," can you? Not unless you know where I am. That's the difference between a direction and a position. Everything else in this lesson is just ways of getting from step one to step two.` },
    { id: 'backward', label: `Work backward from the answer`, body: `Start with a found person. How did the searchers know where to go? Someone gave them a place they already knew, plus which way and how far from it. Take away the known place and the other two pieces have nothing to attach to. Work backward from any rescue and you'll always find a reference point at the bottom of it.` }
  ],

  map: [
    { name: `Position`, level: 3 },
    { name: `Reference point`, level: 3 },
    { name: `Direction vs. position`, level: 4 },
    { name: `Distance`, level: 2 },
    { name: `Line of position`, level: 2 },
    { name: `Bearing`, level: 1 },
    { name: `Fix`, level: 1 },
    { name: `Latitude & longitude`, level: 0 },
    { name: `Magnetic north`, level: 0 }
  ]
}
