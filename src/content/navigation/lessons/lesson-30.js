// Navigation · Week 6 · Lesson 30 — the Heartwood Navigation Challenge
//
// The last lesson of the fifth class, and Field Guide Chapter 30's Exercise F:
// "use multiple observations, identify conflicting evidence, explain which
// clues are more dependable and why". That exercise is the right closer,
// because it is the only one in the chapter whose answer is a judgement.
//
// The problem is on the plan Lesson 29 walked. You set off from the fire tower
// for Beaver Pond, drifted south of the line, and you have four measurements:
// three bearings, carrying a couple of degrees each, and a pace count from the
// tower that is twelve per cent long. Four pieces of evidence, no two of which
// quite agree, and nothing on the ground to tell you which to believe.
//
// MEASURED IN src/lib/voyage.js, CHECKED IN src/__tests__/voyage.test.js. The
// best-fitting position from each of the five possible sets:
//
//   all four together                 87 yards out    fits itself to 30 yd
//   discard the tower bearing         81 yards out                   33 yd
//   discard the pond bearing          86 yards out                   32 yd
//   discard the quarry bearing       123 yards out                    1 yd
//   discard the pace count            58 yards out                   21 yd
//
//   THE RIGHT ANSWER IS MEASURABLY RIGHT. Discarding the counted distance is
//   better than discarding any of the sighted bearings and better than
//   trusting everything, which is what makes this a problem with an answer
//   rather than an opinion. The reason is Lesson 22's: a pace count is BIASED
//   and a bearing WOBBLES, so one counted measurement disagreeing with three
//   sighted ones is the signature of a bias, and a bias cannot be averaged out.
//
//   AND THE TRAP IS THE COURSE'S LAST AND BEST IDEA. The set that fits itself
//   to within one yard is the set that is 123 yards out — the worst of the
//   five. Two lines and a circle will always pass through a point, so a tiny
//   residual there means there was not enough evidence to argue with, not that
//   the answer is good. A residual measures CONSISTENCY, not accuracy. That is
//   the cocked hat of Lesson 22 generalised, and it is the right last thing for
//   this course to say.

export default {
  id: 'lesson-30',
  number: 5,
  week: 6,
  title: `The Heartwood Navigation Challenge`,
  openingQuestion: `Four measurements. None of them obviously wrong, no two of them quite agreeing, and no way to look up the answer. Which one do you stop believing?`,
  concept: `Judging evidence that disagrees`,

  fieldGuide: {
    chapter: 30,
    title: `The Natural Navigation Laboratory`,
    exercise: `This is Chapter 30's Exercise F, and it is the one worth doing properly. Stand somewhere you can identify three features on the map, and take a bearing to each — then also measure your distance from one of them, by pacing from a point you can identify or by any other means you have. Plot all four. They will not agree. Now do the thing the exercise asks for: write down, before you decide, which of the four you expect to be the least dependable and why. Then plot the three you trust and see where that puts you. Keep the sheet. The habit of predicting which measurement will let you down is the single most useful thing in this course, and it only develops on paper.`
  },

  see: {
    voice: 'professor',
    line: `You left the fire tower for Beaver Pond and drifted south of the line. Three bearings, one pace count, and they disagree. Begin on TRUST ALL FOUR.`,
    simulation: { id: 'voyage', props: { mode: 'challenge' } },
    observations: [
      { text: `Trusting everything puts you **87 yards** from where you actually are, and the four measurements fit each other to **30 yards** — which is what disagreement looks like when nothing is badly wrong and nothing is quite right. The arc from the fire tower is the odd one: your pace count says 1,124 yards and the truth is 1,003, so it is **120 yards long**, which is twelve per cent, which is what broken ground does to a stride.` },
      { text: `Now try all four ways of throwing one measurement out. Discarding a bearing changes almost nothing — 81 yards, 86 yards. **Discarding the pace count gives 58**, the best of the five. That is not an opinion: it is the smallest of five measured numbers, and the reason it wins is Lesson 22's. A bearing wobbles either way; a pace count is wrong the *same* way every time. One counted measurement against three sighted ones is the signature of a bias.`, emphasis: true },
      { text: `And now the trap, which is the last thing this course has to teach you. Discard the **quarry** bearing and look at the two readouts together: the three remaining measurements fit each other to **one yard** — an immaculate, beautiful agreement — and the answer is **123 yards out**, the worst of the five. Two lines and a circle will always pass through a point. The tidiness was not accuracy. It was running out of evidence to argue with.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences to close the course, and the third one is the one I would keep if I could keep only one.`,
    sentences: [
      `**When measurements disagree, the disagreement is itself a measurement — and it is often the most valuable one you have.** Three bearings that cross in a tight little triangle are telling you something about your compass work; the same three leaving a sprawl are telling you that something is wrong and you should find out what before you walk anywhere. The learner's instinct is to feel bad about the sprawl. The navigator's instinct is to read it: how big is it, which measurement is furthest from the others, and is the odd one out the kind of measurement that goes wrong in one direction?`,
      `**A measurement that is biased will disagree with ones that merely wobble, and that is how you identify it.** Three bearings taken with the same compass in the same five minutes each carry an independent couple of degrees — they scatter round the truth. A pace count carries a bias: your stride on this ground is what it is, and the count is long by twelve per cent every single time you do it. So when one counted number disagrees with three sighted ones, the suspicion falls on the counted one, and you check it rather than average it. Averaging a bias with three unbiased numbers does not remove it; it just shares it out.`,
      `And **how well your evidence agrees with itself tells you nothing at all about whether it is right.** This is the hardest idea in the course and the most generally useful one. Two lines and a circle pass through a point exactly — there is no spare evidence, so there is nothing to disagree, so the residual is zero and the answer in this case is 123 yards out. You only find out that a measurement is bad because something *else* contradicts it, which means the power to detect error comes entirely from having more evidence than you strictly need. The fourth measurement is not there to make the answer more accurate. It is there to tell you when one of the other three is lying.`
    ],
    comparison: {
      label: `THE CROSSWORD WITH NOT ENOUGH CROSSINGS`,
      body: `You fill in a long across clue and it feels right. Now: if none of its letters is crossed by a down clue, you will never find out that it is wrong — the grid accepts it, everything is consistent, and you will finish the puzzle happily and incorrectly. If four of its letters are checked, a wrong answer clashes almost immediately and you know to think again. The crossword's power to catch you out is not in the clues; it is in the crossings. That is exactly what the fourth bearing is, and it is why a navigator takes three when two would place them: not for a better answer, but for the chance of being told off.`
    },
    naming: `The spare evidence has a name — **redundancy** — and the general principle is that error can only be detected where there is more information than the answer strictly requires. The amount of spare is the number of **degrees of freedom**: three bearings for a two-coordinate position leaves one, which is why they draw a triangle instead of meeting at a point. What is left over after the best fit is the **residual**, and the thing to engrave somewhere is that a residual measures consistency and not accuracy. A single measurement wildly out of keeping with the others is an **outlier**, and surveyors distinguish an ordinary error, which every measurement has, from a **blunder** — a wrong landmark identified, a figure written down backwards, a bearing taken from the wrong end of the needle — which no amount of care in the other measurements will fix and which only redundancy can catch. Nothing in this paragraph is special to navigation, which is rather the point: you have spent six weeks learning the general theory of trusting evidence, and it happened to be taught with a compass.`,
    formalNames: {
      terms: [
        { term: `Redundancy`, meaning: `Having more measurements than the answer needs. The only source of your ability to detect that something is wrong.` },
        { term: `Degrees of freedom`, meaning: `How many spare measurements you have. Two bearings for a position: none, and no warning. Three: one, and a triangle that tells you something.` },
        { term: `Residual`, meaning: `What is left over after the best fit — how well the evidence agrees with itself. Not a measure of accuracy, and a small one can be the worst sign of all.` },
        { term: `Outlier`, meaning: `The measurement that disagrees with the rest. Worth investigating rather than deleting: it may be the only honest one.` },
        { term: `Blunder`, meaning: `Not an error but a mistake — the wrong hill identified, 068 written for 086. Unlike an error it has no distribution and no average, and only redundancy finds it.` },
        { term: `Weighting`, meaning: `Trusting some evidence more than the rest, on purpose and for a stated reason. A bearing to a sharp summit a mile off deserves more weight than one to the middle of a wide wood.` },
        { term: `Gross error detection`, meaning: `The formal name for what this lesson does by hand: fit, look at the residuals, suspect the odd one, refit without it, and see whether the answer improves.` }
      ],
      note: `One warning about the method, since this is the last panel in the course. Discarding the measurement that disagrees is a powerful technique and a dangerous habit. Do it once, for a reason you can state, and refit. Do it repeatedly until the numbers look pretty and you will end up with two measurements agreeing beautifully about nothing — which is this lesson's trap, reached by a different road. If you find yourself throwing out a second piece of evidence, the honest conclusion is usually that you do not know where you are and should go and get a better measurement rather than a tidier one.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Last one. Where do you decide which of several things to believe, when they do not agree?`,
    items: [
      `Two clocks in the house showing different times.`,
      `The recipe's cooking time against what the thing looks like.`,
      `Three people's accounts of the same argument.`,
      `A review saying five stars and a review saying one.`,
      `The bathroom scales, read twice, giving two numbers.`,
      `A map that disagrees with the signpost in front of you.`
    ],
    ownPlaceholder: `Something I had to decide which version of to believe…`,
    synthesis: `Three accounts of the same argument is the one that teaches the most, because you already know how to read it, and what you do is not average them. You look for the thing all three agree on and treat it as settled; you notice where one of them differs and you ask *why that person* would differ there — what they could see, what they wanted. That is weighting, and it is exactly what a navigator does with a bearing to a distant hilltop and a bearing to the vague middle of a wood. And if all three accounts match perfectly, word for word, you do not conclude that you have the truth. You conclude that they have been talking to each other.`,
    builder: {
      body: `The last challenge of the course, and it takes an afternoon. Walk out to a place you can identify on the map but do NOT look at where it is on the map — have someone else choose it, or pick it from the ground. Now recover your position from scratch: three bearings to three identified features, plus one distance, measured however you like. Plot all four and look at the mess. Write down which you distrust and why, before you look anything up. Plot your best answer, mark it, and then — only then — find the place on the map and measure how far out you were. Write both numbers in your journal: how far out you were, and whether the measurement you distrusted was the one that deserved it. The second number is the one that improves with practice.`
    },
    acrossCultures: {
      place: `THE ISLES OF SCILLY, 22 OCTOBER 1707`,
      label: `MODERN INTERPRETATION`,
      paragraphs: [
        `The best-known navigation disaster in English history is usually told as a longitude story: a fleet returning from the Mediterranean, unable to know how far east it had come, running onto the rocks of the Scillies in the dark with the loss of four ships and Admiral Sir Cloudesley Shovell. It is the story that opens most accounts of the longitude prize, and the prize did follow within seven years. But the evidence that survives does not support a single clean cause, and the careful reconstructions of the voyage from the logs that remain read much more like this lesson than like Lesson 26.`,
        `What the surviving logs show is a fleet whose evidence disagreed. The weather had cleared enough for at least some latitude observations, so the fleet was not wholly blind; the charts and pilot books of the period placed the Scillies wrongly, by several miles in some editions; the compasses aboard were in poor condition; and after the last noon sight the position was carried forward by dead reckoning, with all of Week 5's consequences. Several ships' navigators disagreed with each other about where the fleet was, and the one that survived made a different judgement from the ones that did not. That is a lesson about weighing conflicting measurements — including the measurement printed on the chart — rather than about a missing number.`
      ],
      uncertain: `A great deal here is irrecoverable and some of it is actively disputed. The log of the Association, Shovell's flagship, is lost, so what he himself believed is unknown; the death toll is given as anything from about 1,400 to over 2,000; and the degree to which latitude was or was not available that day is argued from a small number of surviving logs. The reading above — that the disaster was multi-causal and that the pure-longitude version is a simplification — is the direction modern scholarship has taken rather than a settled finding, which is why this card is labelled an interpretation. The frequently repeated figure of eight miles for the chart's misplacement of the islands comes from press reporting of a chart sale and should not be treated as a measurement. And the familiar story of a sailor hanged for warning the admiral is folklore with no contemporary support.`,
      sources: `May, "The Last Voyage of Sir Clowdisley Shovell", *Journal of the Institute of Navigation* 13 (1960); Sobel, *Longitude* (1995).`
    }
  },

  feynman: {
    line: `The last explanation. Make it the one you would give a friend who is about to set off.`,
    instruction: `You have four measurements of where you are and they disagree. Explain how to decide which to stop believing — and why the set of measurements that agree most beautifully with each other is not necessarily the one to trust.`,
    banned: ['average', 'mistake', 'obviously'],
    bannedNote: `"Average" is banned because it is the wrong answer dressed as the obvious one — averaging a biased measurement with three good ones spreads the bias around rather than removing it. "Obviously" is banned because nothing here is, and "mistake" because the interesting cases are not mistakes: every measurement in this problem was taken correctly.`,
    placeholder: `The four measurements point at four slightly different places, so first I…`,
    checks: [
      `It says what disagreement between measurements tells you.`,
      `It distinguishes a measurement that is out the same way every time from one that scatters.`,
      `It explains why having more evidence than you need is what lets you spot a bad piece.`,
      `It says why a very neat fit can be a warning rather than a reassurance.`
    ],
    closing: `Six weeks ago the first lesson asked what it means to know where you are. This is the answer it was heading for: knowing where you are means knowing how wrong you might be, and knowing that requires more evidence than the answer needs. If your explanation says that, the course is finished and you are the navigator.`
  },

  challenge: {
    voice: 'editor',
    line: `The last question of the course, and it is the trap, straight out.`,
    prediction: {
      question: `Of the five possible answers, one fits its own evidence to within a single yard and the others to twenty or thirty. Which answer should you take?`,
      options: [
        {
          id: 'pace',
          text: `Not that one — take the one that discards the counted distance, which fits to twenty-one yards.`,
          verdict: `Right, and it is 58 yards from the truth against the tidy one's 123 — more than twice as good while looking half as convincing. The reasoning has two parts and both are worth keeping. First, the counted measurement is the one that can be biased, and a bias is precisely what a bearing cannot cancel. Second, and more importantly, the one-yard fit is not evidence of anything: it is what you get when two lines and a circle are left to pass through a point, with no spare measurement to object. The lesson is that a residual is a statement about your evidence and not about the ground.`
        },
        {
          id: 'tidy',
          text: `The one that fits to a yard — a near-perfect fit is the strongest evidence available.`,
          verdict: `It is the natural answer, it is what the numbers appear to say, and it is 123 yards out, which is the worst of the five. Here is what went wrong. Three pieces of evidence determining two coordinates leave one piece spare, and that spare piece is the only thing capable of telling you something is amiss. Throw away one of the three bearings and you are left with two lines and a circle — three shapes, two unknowns, and in this geometry they happen to be able to meet at a single point whatever the measurements say. The residual collapsed to a yard not because the answer got better but because the evidence lost its power to complain. A perfect fit from barely enough evidence is the least informative result there is.`
        },
        {
          id: 'unknowable',
          text: `There is no way to tell from the inside — you would need to know the truth already.`,
          verdict: `This is the respectable sceptical position and it is wrong in a specific, useful way. You cannot measure your error from the inside, true: only the simulation can print 58 and 123, because only the simulation knows where you are. But you can absolutely reason about WHICH kind of measurement is likely to be biased, and that reasoning needs no privileged knowledge — you know that your stride shortens on broken ground, you know that your bearings scatter either way, and you know that one counted number against three sighted ones is the shape of a bias. Being unable to measure your error is not the same as being unable to judge your evidence, and the whole of this course has been about the difference.`
        }
      ]
    },
    open: {
      question: `Thirty lessons. If you had to give someone one sentence of it, what would you give them?`,
      placeholder: `The thing I would want them to know is…`,
      reveal: [
        `Mine is this: a position is not a point, it is a region, and the whole skill is knowing how big yours is. Everything in six weeks has been a way of making that region smaller or of finding out how big it already is — two bearings instead of one, a square cut instead of a shallow one, three landmarks spread round you instead of bunched in front, a fix placed late in the day instead of early, a catching feature instead of a point, a clock that keeps its rate, and a fourth measurement whose only job is to tell you when one of the other three is wrong.`,
        `And the second sentence, if you are allowed two: "I don't get it" was the most useful thing in this course and it is also the most useful thing in the field. The navigator who stops and says *I do not actually know where I am* is a hundred yards from safety. The one who keeps walking because it would be embarrassing to admit it is doing what the arithmetic says: adding a hundred and thirty yards to the circle with every mile. Both halves of this course — the knowing and the admitting — are the same skill.`,
        `There is a handbook that goes with this, and it has thirty-one chapters and a set of blank worksheets, and the whole of it is now within your reach. Go and stand somewhere unfamiliar. You know how to work out where you are.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-22',
        label: `Navigation, Lesson 22 — the cocked hat`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `The last two minutes of the course.`,
    prompt: `Go back to what you wrote in Lesson 1, when you were asked what it means to know where you are. Read it, and then answer the same question again underneath, without looking at it while you write. Then compare the two.`,
    placeholder: `To know where I am means…`,
    mapFooter: `Thirty lessons. The Earth, a compass, the Sun, the stars, a map, a clock — and the judgement to know which of them is lying to you.`,
    tomorrow: `There is no tomorrow in this course, and that is the point of it: the next lesson is a real morning, real ground, and a position you work out yourself. Take the Field Guide, take a pencil, and go.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Your compass gave you three of today's four measurements and your legs gave you the fourth, and that division is the whole decision. Three readings from one instrument in five minutes are three independent samples of the same small random error — they scatter, and the scatter is roughly symmetrical, so they argue with each other honestly. Your stride is not like that at all: on this ground it is what it is, and the count is long by the same twelve per cent every time you take it. The compass can be outvoted. The pace count cannot be, because it only ever casts one vote and it always casts it the same way.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Look at the four shapes on the plan. Three are straight lines radiating from three landmarks, and one is an arc swung from the fire tower. Now notice something about how they fail: the lines all pivot on their landmarks, so a small error moves each line sideways by a little, and the three of them leave a small triangle. The arc fails differently — it moves in or out, bodily, and it is wrong by a hundred and twenty yards in one direction. The picture tells you which measurement is the odd one out before any arithmetic: three shapes are disagreeing politely among themselves and the fourth is standing apart from all three.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Weigh yourself four times in a row. The first three readings differ by a pound either way — that is noise, and the average of them is better than any one. Now stand on the scales with your shoes on. That fourth reading is not noise: it is a pound and a half heavier *every time*, and averaging it in does not fix it, it just makes everything slightly wrong. If you had only taken the shoes-on reading you would never have known. You know because you had three others to compare it with, and that is the only reason you know.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `Use the magnified window rather than the plan — a hundred yards is ten pixels at plan scale and the whole argument happens inside it. Step through the five buttons and watch two things that move independently: the cross, which is the answer, and how neatly the shapes cross each other, which is the residual. The two are not linked in the way you expect. On the quarry setting the shapes pass through one point and the cross jumps furthest from the green dot. That is the picture of the lesson, and it is worth looking at for a moment longer than feels necessary.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `You left the fire tower for Beaver Pond, counting, and after 1,124 counted yards you stop, not quite sure you are on the line. The tower bears 054, the old quarry 142, the pond 275. You plot the three bearings and they leave a triangle about thirty yards a side — ordinary, unalarming, the Lesson 22 picture. Then you swing an arc of 1,124 yards from the tower and it passes a hundred and twenty yards outside the triangle. Three measurements are arguing about thirty yards and the fourth is a hundred and twenty away from all of them, so you distrust the arc, note that your stride has shortened on this ground, and take the triangle. You are 58 yards out instead of 87, and you have learned something about your pace that will serve you for the rest of the day.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Five steps, and they are the formal procedure under a plain name. One: plot everything you have, including the measurement you suspect. Two: look at how well they agree, and at which one sits apart from the others. Three: ask of the odd one whether it is the kind of measurement that goes wrong in one direction — counted, timed, calibrated — or the kind that scatters. Four: if it is the first kind, set it aside, refit, and see whether the answer moves. Five: stop. One discard with a reason is good practice; two is a sign that you need a better measurement rather than a tidier answer.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Work backwards from the strangest fact in the lesson: one of the five answers fits its own evidence perfectly and is the worst of the five. For that to be possible, a perfect fit must be achievable without being right — so ask when that can happen. It can happen whenever there is just enough evidence to determine the answer and none left over, because then the answer can be chosen to satisfy everything and nothing is left to object. So a perfect fit means one of two things: either your measurements are excellent, or you have not got enough of them to find out. And you can tell which by counting: three shapes for two unknowns is one spare, two is none. The whole of the lesson falls out of that count.`
    }
  ],

  map: [
    { name: `Redundancy`, level: 4, fresh: true },
    { name: `Residual and consistency`, level: 4, fresh: true },
    { name: `Outliers and blunders`, level: 4, fresh: true },
    { name: `Weighting evidence`, level: 3, fresh: true },
    { name: `Random and systematic error`, level: 5 },
    { name: `The cocked hat`, level: 5 },
    { name: `Precision and accuracy`, level: 5 },
    { name: `Error budget`, level: 5 },
    { name: `Absolute and accumulated quantities`, level: 5 },
    { name: `Resection`, level: 5 },
    { name: `Pace counting`, level: 5 },
    { name: `Dead reckoning`, level: 5 },
    { name: `Longitude`, level: 5 },
    { name: `Position`, level: 5 },
    { name: `Knowing a method's limits`, level: 5 }
  ]
}
