// Navigation · Week 5 · Lesson 24 — dead reckoning
//
// Field Guide Chapter 15. The first position in the course that needs nothing
// in sight at all — and the first that gets worse while you watch.
//
// MEASURED IN src/lib/plot.js, CHECKED IN src/__tests__/plot.test.js:
//
//   THE DISTINCTION THE WHOLE LESSON RESTS ON. A steering bias accumulates
//   with DISTANCE RUN; a current accumulates with TIME ELAPSED. On the
//   simulation's 1.6-mile run:
//     four degrees of steering bias   169 yd, at every speed offered
//     0.4 mph of current              188 yd at 6 mph
//                                     375 yd at 3 mph
//                                     563 yd at 2 mph
//   Halve your speed and the current's contribution doubles while the
//   steering's does not move. Which means going slower does not reduce dead
//   reckoning error — it changes its composition, and increases the total.
//
//   Per-mile figures, for a reader with no calculator:
//     one degree of bias    31 yards a mile
//     five degrees          154 yards a mile
//   Over three miles, five degrees is 461 yards, identically at 1.5 mph and at
//   3 mph. Half a knot of current is 880 yards in one hour and 1,760 in two.
//
//   A CONVENTION TRAP, guarded by a test: a current is named for the direction
//   it flows TOWARDS (its set), a wind for the direction it comes FROM.
//   Interchanging the two reverses the correction, which is a 180° error.
//
// The simulation will carry the real track clean off the sheet if the current
// is given long enough, and says so rather than drawing the marker somewhere
// it is not. That case was kept deliberately: running off the chart happens.

export default {
  id: 'lesson-24',
  number: 4,
  week: 5,
  title: `Dead reckoning`,
  openingQuestion: `No landmark, no stars, no sun. You knew where you were an hour ago. Where are you now?`,
  concept: `Carrying a position forward`,

  fieldGuide: {
    chapter: 15,
    title: `Dead Reckoning`,
    exercise: `Walk a deliberate three-legged course in open country, with a compass bearing and a pace count for each leg, and plot it on paper as you go without looking at the map for help. At the end, mark on the paper where you think you are — then look up and find out. Write down the distance between the two, and divide it by the distance you walked: that percentage is your own dead reckoning error, and it is the number that tells you how long you can go without a fix before you have to stop trusting the plot.`
  },

  see: {
    voice: 'professor',
    line: `Three legs from your last known position, and nothing in sight. The blue dashes are what you would plot. The green line is where you actually went. Change the speed and watch which of the two error figures moves.`,
    simulation: { id: 'chart-fix', props: { mode: 'reckon' } },
    observations: [
      { text: `Every landmark has gone from the sheet, because this is the method for when there are none. From a position you knew, a course and a time and a speed give you a new position — and the plot is drawn from what you *intended*, which is the whole trouble.` },
      { text: `Now pull the speed slider. The steering error stays at **169 yards** whatever speed you go, because four degrees over 1.6 miles is four degrees over 1.6 miles. The current's share goes **188 yards at six miles an hour, 375 at three, 563 at two** — because the water does not care how fast you are going, only how long it has you for.`, emphasis: true },
      { text: `So going slower does not make dead reckoning safer. It leaves the steering error exactly as it was and gives the current twice as long to work, and the total gets worse. **Nothing you do fixes it; only arriving somewhere you can see fixes it.**` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third one is why dead reckoning is a race rather than a technique.`,
    sentences: [
      `**A position you know, plus a direction and a distance, is a new position — and it needs nothing in sight.** This is the first method in the course that works in fog, at night, in the middle of an ocean, under cloud. You take your last fix, you lay off the course you steered and the distance you ran, and the pencil's point is where you are. It is arithmetic rather than observation, which is its strength and the entire source of its weakness.`,
      `**Because it is built on your last position, every error you make stays in.** A fix from Lesson 21 starts fresh each time: a bad one is bad on its own and the next one is unaffected. A reckoned position is built on the one before it, so an error does not get averaged away, it gets carried. Four legs in, you are holding the sum of four legs' worth of mistakes, and the plot looks exactly as confident as it did at the start.`,
      `And **the two things going wrong are going wrong at different rates, which is the practical content of this lesson.** A consistent lean in your steering costs you a fixed fraction of the distance run — thirty-one yards per mile per degree, whatever your speed. A current costs you its own speed multiplied by the time, whatever your course. So the two cannot be lumped together as "dead reckoning error": one is paid in miles and the other in hours, and halving your speed doubles the second while leaving the first untouched.`
    ],
    comparison: {
      label: `A CONVERSATION RELAYED DOWN A LINE OF PEOPLE`,
      body: `Whisper a sentence to the first of twenty people and have each pass it on. Each person mishears a little, and the errors do not cancel, because nobody is listening to the original — each one is doing their faithful best with what reached them. Twenty people later the sentence is unrecognisable, and the last person is no less confident than the first. Now add a second effect: everyone in the line has the same regional habit of hearing one vowel as another. That one does not merely accumulate, it accumulates in a consistent direction, and it is the current. The only repair for either is somebody who can hear the original speaker, which is a fix.`
    },
    naming: `Carrying a position forward from a known one by course and distance is **dead reckoning** — most likely from "deduced", though the etymology is argued and no derivation is settled. The position it produces is a **DR position**, drawn on a chart with its own symbol and never confused with a fix. The direction a current flows *towards* is its **set** and its speed is its **drift**; your actual path over the ground is the **course made good** as against the **course steered**, and the difference between the two is what the current and your steering have done to you together. A wind, confusingly and immovably, is named for the direction it comes *from* — so a southerly wind blows towards the north and a current setting south flows towards the south, and mixing the two conventions puts you 180° wrong.`,
    formalNames: {
      terms: [
        { term: `Dead reckoning`, meaning: `A position deduced from a known one, plus course and distance run. Needs nothing in sight; degrades continuously.` },
        { term: `DR position`, meaning: `The reckoned position, kept visually distinct from a fix on a chart because it carries no observation in it.` },
        { term: `Set`, meaning: `The direction a current flows towards. Degrees true.` },
        { term: `Drift`, meaning: `The speed of that current. Its effect is drift times hours, and does not care what your own speed is.` },
        { term: `Course steered`, meaning: `What you aimed at and held.` },
        { term: `Course made good`, meaning: `What you actually achieved over the ground, once the current and your own steering error have had their say.` },
        { term: `Leeway`, meaning: `The sideways slip a wind pushes a boat into, distinct from the current and in a different direction. The land equivalent is a sidehill, which pushes a walker downhill without their noticing.` },
        { term: `Running fix`, meaning: `How you escape: one landmark, two bearings, and a measured run between them, which is tomorrow.` }
      ],
      note: `"Dead reckoning" is routinely explained as a contraction of "deduced reckoning", written "ded. reckoning". It is a plausible story that the Oxford English Dictionary does not support, and the honest position is that the origin is unknown.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where do you keep track of something by adding up changes, rather than by looking at it?`,
    items: [
      `Counting floors in a dark stairwell.`,
      `Keeping a running total of a bank balance in your head.`,
      `Finding the bathroom at night in an unfamiliar house.`,
      `Counting stitches in a row of knitting.`,
      `Following a recipe you've half memorised.`,
      `Knowing how much petrol is left from how far you've driven.`
    ],
    ownPlaceholder: `Something I track by adding up rather than by checking…`,
    synthesis: `The bank balance is the exact match, and most people have been caught by it. Every single transaction you remembered was right, and the running total is still forty pounds out, because one standing order slipped through and that error is now in every figure you have carried since. Checking the balance is a fix. Dead reckoning is the running total, and the reason navigators are taught to write down the time of their last fix is the same reason you remember when you last actually looked.`,
    builder: {
      body: `Try this in a building you know well, with your eyes shut. Stand in a doorway, close your eyes, and walk a deliberate route — eight paces forward, turn right, six paces, turn left, ten paces — counting as you go and holding a picture of where you have got to. Then stop, point at where you believe the front door is, and open your eyes. You have just done dead reckoning with your own body as the instrument, and the thing worth noticing is not how wrong you were but how confident you felt while being wrong. That feeling is the subject of this lesson.`
    },
    acrossCultures: {
      place: `THE CAROLINE ISLANDS, MICRONESIA`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Carolinian navigators crossed open ocean using a system recorded under the name **etak**, in which progress is tracked not against the destination but against a third island — a **reference island**, chosen somewhere off to the side of the route and typically not in sight at any point. The navigator holds in mind the sequence of star bearings under which that island successively lies as the canoe advances, and the voyage is divided into segments by those bearings. When the reference island has moved from one star's rising point to the next, a known fraction of the passage has been completed.`,
        `What makes this a dead reckoning system rather than a fix is that nothing is observed: the reference island is out of sight, and its position relative to the canoe is deduced from the course held and the distance believed to have been run, exactly as the pencil line on the chart is. The segments act as a running tally that keeps the estimate organised, which is the same job the three legs in today's simulation do, and the attraction of the method is that it converts "how far along am I" into a question about bearings — the quantity a Carolinian navigator had the most practice at judging.`
      ],
      uncertain: `The formulation found in most English-language accounts — that the canoe is thought of as stationary while the islands move past it — is an interpretation by Western ethnographers of a system described to them in Puluwatan terms, and it has been disputed; so has the derivation of the eastern cardinal direction from the rising of Altair, the "big bird" of Gladwin's title. Practice differed between islands and between navigators, the recorded material comes overwhelmingly from Puluwat and a few neighbours in the 1960s and 1970s rather than from the wider region, and the gloss of the word *etak* itself varies between sources.`,
      sources: `Gladwin, *East Is a Big Bird: Navigation and Logic on Puluwat Atoll* (1970); Lewis, *We, the Navigators: The Ancient Art of Landfinding in the Pacific* (1972).`
    }
  },

  feynman: {
    line: `Explain the method that works when nothing is visible.`,
    instruction: `Explain how someone can know where they are with nothing at all in sight, and why that knowledge gets worse the longer they go on. Then say why travelling more slowly does not help.`,
    banned: ['lost', 'luck', 'eventually'],
    bannedNote: `The first two are what the method is for avoiding, and reaching for them concedes the argument. The third is the word that hides a rate — this lesson is about how fast the error grows and what it grows with, and "eventually" says neither.`,
    placeholder: `Even with nothing in sight, if I knew where I was an hour ago…`,
    checks: [
      `It builds the new position from a known one plus a direction and a distance.`,
      `It says why the mistakes stay in rather than cancelling out.`,
      `It separates an error that grows with the miles covered from one that grows with the hours passed.`,
      `It says what actually repairs the plot, and that nothing short of that does.`
    ],
    closing: `If your explanation makes dead reckoning sound like a weaker version of finding your position, go back to it. It is a different operation with a different failure, and it is the one that crossed the Pacific.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction about going carefully, and a question about when to stop believing the plot.`,
    prediction: {
      question: `You are reckoning your way across a bay against a current, and you decide to slow down and take more care. What happens to your dead reckoning error?`,
      options: [
        {
          id: 'worse',
          text: `It gets worse — the current now has longer to work on you.`,
          verdict: `Right, and this is the result that makes dead reckoning different from every other method in the course. Your steering error is paid in miles and does not change: four degrees over 1.6 miles is 169 yards at any speed. The current is paid in hours, so halving your speed doubles it — 375 yards at three miles an hour becomes 563 at two. Slowing down buys you better steering you did not need and gives away position you did.`
        },
        {
          id: 'better',
          text: `It gets better — more care means a better course held and a better distance run.`,
          verdict: `This is true of every other method in the course and false of this one, which is exactly why it is worth asking. Care does improve the part of the error that comes from you. But the current's contribution is its speed times the time, and nothing about your care enters that product — so you have improved a term that was already the smaller one and multiplied the term that was not. The total goes up.`
        },
        {
          id: 'same',
          text: `It stays the same — the error depends on the distance, and the distance has not changed.`,
          verdict: `Half right, and the right half is the half people usually get wrong, so this is good thinking. Error from steering does depend on distance alone, and the distance has not changed, so that part is genuinely unaffected. But the current's displacement is drift times hours, and you have just increased the hours. Two error sources, two different things they scale with — and this answer has correctly identified one of them.`
        }
      ]
    },
    open: {
      question: `Your reckoned position is getting worse by the hour. What would it take to stop that?`,
      placeholder: `To stop the error growing I would need…`,
      reveal: [
        `Something observed. Not a better calculation — the calculation is fine, and a better one would still be building on your last position. You need one measurement of something outside the plot: a bearing to anything you can both see and find on the map, a latitude from the pole, a depth sounding that matches a known contour. Any one of those resets the accumulation to zero.`,
        `And the awkward case is the one you will actually meet: there is exactly one thing in sight, so Lesson 21's two bearings are not available. Tomorrow's lesson is that one landmark is enough — if you are willing to move, and if you know how far you moved, which is now a thing you can measure.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-23',
        label: `Navigation, Lesson 23 — how far is it?`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, and today's is about how a plot feels from the inside.`,
    prompt: `Write down the last time you were confidently wrong about where you were — in a building, a town, a car. Then write down what finally told you, and whether it was a calculation or something you saw.`,
    placeholder: `I was completely sure I was…`,
    mapFooter: `Week 5, day four. A position that needs nothing in sight, and gets worse while you watch.`,
    tomorrow: `Tomorrow closes the week with the way out of this: one landmark, two bearings, and a measured run between them. It is worthless until you have run far enough, and the lesson is finding out where "far enough" falls.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Dead reckoning is the one method in this course where the compass is used to *hold* a direction rather than to measure one. You set the course and keep the needle boxed for an hour, and what you have produced is not a reading but a line on the ground. That is a different use of the instrument and it fails differently: a reading that is two degrees out is wrong once, while a course held two degrees out is wrong for the entire hour, and the error is the whole hour long. One degree held costs 31 yards a mile — on a straight run. On a course that turns, part of it cancels, which is why the simulation's three legs lose 169 yards to a four-degree lean where a single straight run of the same length would lose 197.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `On a chart a fix and a reckoned position are drawn with different symbols, and that convention carries the whole lesson. A fix is a dot in a circle: it was observed, it stands on its own, and it is as good tomorrow as today. A DR position is a dot with a half-circle or a plain line, and the symbol is a warning that it was calculated from the thing before it. A plot made entirely of reckoned positions is a chain with no anchor — and the navigator's habit of writing the time against the last real fix exists so that anyone reading the chart can see how long the chain has got.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Lay a long strip of paper on the floor and walk it heel-to-toe, tearing off one foot's length at each step. Twenty steps later the pile of pieces tells you how far you went, which is reckoning. Now have somebody tug the strip gently sideways while you work. Your count is unaffected, the pieces still say twenty feet, and you are no longer where the pieces say — and nothing in your careful counting can detect it, because the tug was never part of what you counted.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `In the simulation the blue dashed track and the green solid track start from the same dot and separate as they go. Look at where they part company: not at the end, but at the first corner — and then the gap grows at every leg, because each leg starts from somewhere already wrong. Then push the current up and watch the green track bend away from the blue one in the same direction throughout, which is what a constant push looks like on paper, and is quite unlike the random scatter of Lesson 22.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `You leave a known point at three miles an hour and run 1.6 miles over three legs, thirty-two minutes in all. You steer four degrees right of each intended course the whole way without knowing it, and that costs you 169 yards. There is also a 0.4 mph current setting south, which in thirty-two minutes carries you 375 yards south of where the pencil says. Your plot is about 545 yards wrong — a third of a mile — after half an hour. Now take the same 1.6 miles at two miles an hour instead: the steering still costs 169 yards and the current costs 563, for 732 in all. You went more carefully and finished further from the truth.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Four questions in order, and the fourth is the one that is usually skipped. One: where was I last certain, and when? Two: what direction have I held since? Three: how far have I come — which is Lesson 23's pace count or the log. Four: what has been moving me that I did not choose? That last one is the current, the wind, the sidehill, and the honest answer to it is usually "I don't know exactly", which is why the answer to "where am I" has to be a region rather than a point.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from the oddity: this is the only method in the course whose answer gets worse while you do nothing. Every other method gives the same quality of answer today as tomorrow, because each one is an observation and observations do not decay. So the decay must come from the thing that makes dead reckoning different, which is that its input is its own previous output. Any process built that way accumulates rather than averages — and once you see that, the per-mile and per-hour error rates are not two facts to memorise but the only two rates there could be.`
    }
  ],

  map: [
    { name: `Dead reckoning`, level: 4, fresh: true },
    { name: `Set and drift`, level: 3, fresh: true },
    { name: `Course made good`, level: 3, fresh: true },
    { name: `Measuring distance`, level: 5 },
    { name: `Pace counting`, level: 5 },
    { name: `Along and across track`, level: 5 },
    { name: `Systematic vs careless error`, level: 5 },
    { name: `Precision and accuracy`, level: 5 },
    { name: `Resection`, level: 5 },
    { name: `Following a bearing`, level: 5 },
    { name: `Position`, level: 5 },
    { name: `Knowing a method's limits`, level: 5 }
  ]
}
