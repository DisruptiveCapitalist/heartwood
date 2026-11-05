// Navigation · Week 5 · Lesson 22 — the cocked hat
//
// The lesson that contradicts the folklore, so every number in it was measured
// first. From src/lib/plot.js, checked in src/__tests__/plot.test.js:
//
//   THE ONE-IN-FOUR RESULT. Three lines of position, each with an independent
//   symmetric error, leave a triangle. The true position is inside it exactly
//   one time in four. The derivation is counting, not navigation: each line
//   falls on one side of the truth or the other, that is 2³ = 8 equally likely
//   combinations, and exactly 2 of them wrap the truth in a triangle. Verified
//   by enumeration (2 of 8, for every trio on the sheet) and by sampling
//   (25.2% at σ = 0.5°, 1°, 2° and 4°). The fraction does not improve when the
//   bearings do, which is the part that catches people out.
//
//   THE TRIANGLE'S SIZE BARELY PREDICTS THE ERROR. Correlation between the
//   square root of the triangle's area and the actual miss: 0.30. Two samples
//   the simulation will reproduce — errors of +3.0, +0.8, +2.2 give a 31-yard
//   triangle whose fix is 82 yards out; errors of −6.6, +1.1, +2.0 give a
//   120-yard triangle whose fix is 45 yards out. The small triangle is the
//   worse fix. "Small cocked hat, good fix" is not a rule.
//
//   A CONSTANT ERROR IS NOT A RANDOM ONE, AND THE REMEDY IS GEOMETRIC. Two
//   degrees the same way on all three bearings:
//     Beaver Pond + Hollow Rock + the old quarry  (spread round you)
//        108-yard triangle, fix 11 yards out, truth INSIDE
//     the fire tower + Beaver Pond + Hollow Rock  (all in front of you)
//        57-yard triangle, fix 81 yards out, truth OUTSIDE — for every bias
//        from −5° to +5°, without exception
//   The tidier triangle is seven times further out. The remedy for a mis-set
//   declination is where you point the compass, not how carefully you read it.

export default {
  id: 'lesson-22',
  number: 2,
  week: 5,
  title: `The cocked hat`,
  openingQuestion: `You take a third bearing to check the first two. The three lines do not meet. Now what?`,
  concept: `What three disagreeing lines tell you`,

  fieldGuide: {
    chapter: 12,
    title: `Triangulation and Resection`,
    exercise: `Take three bearings instead of two, from the same spot, to three features well spread around you, and plot all three. They will not meet at a point — they never do. Measure the triangle they leave, in yards on the ground, and write that number in your notebook beside the fix. Then do the whole thing again from the same spot an hour later, and compare the two triangles. The exercise is not to make the triangle small; it is to find out how much your own bearings disagree with each other, which is a number nobody can tell you and which you will use for the rest of your life.`
  },

  see: {
    voice: 'professor',
    line: `Three bearings now, and three lines that will not meet. Press TAKE ANOTHER SET a dozen times and keep an eye on the tally in the right-hand readout before you read on.`,
    simulation: { id: 'chart-fix', props: { mode: 'hat' } },
    observations: [
      { text: `The three lines leave a small triangle. Navigators have called it a **cocked hat** for two centuries, and the instinct it produces is universal: a small one feels like a good fix. Watch what the simulation opens on — a triangle **fifteen yards** a side, and the true position **forty-two yards** away and outside it.` },
      { text: `Keep pressing. The truth lands inside the triangle about **one time in four** — and this is not a quirk of this sheet or this error size. Make the bearings four times better and the triangle shrinks fourfold while the fraction stays at one in four. It is counting, not navigation: three lines, each on one side of you or the other, is eight equally likely arrangements, and only two of them close round you.`, emphasis: true },
      { text: `Now press ALL THREE WRONG THE SAME WAY, which is what a mis-set declination does. With the landmarks spread around you the fix is **11 yards** out; switch to the three in front of you and the same error puts it **81 yards** out — from a triangle barely half the size. **The tidy triangle is the bad fix.**` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The first is arithmetic, the second is the one that will annoy you, and the third is the one you can act on.`,
    sentences: [
      `**Three lines never meet, and that is information rather than failure.** Two measurements were exactly enough to buy a position, with nothing left over. A third buys you something new: the three lines disagree by an amount that is a direct measurement of how much your own bearings disagree with each other. The size of the triangle is a reading off your own instrument and your own eyesight, and it is worth more than the fix is.`,
      `**But the triangle does not contain you, most of the time.** One time in four, and no oftener however good your bearings are. The reason is a count rather than a subtlety: each line misses you on one side or the other, so three lines have eight equally likely arrangements, and in only two of them do the three lines close around you. The other six leave you outside, sometimes well outside, with a perfectly tidy little triangle sitting next to you looking authoritative.`,
      `And **the size of the triangle hardly tells you how wrong the fix is.** Measured over twenty thousand sets of bearings on this sheet, the relation between the triangle's size and the actual miss is weak — strong enough that a huge triangle does mean something went wrong, nowhere near strong enough to read one off the other. A fifteen-yard triangle can sit forty yards from the truth and a hundred-and-twenty-yard one can sit forty-five from it. The useful distinction is not big or small: it is whether your error is random or always the same way.`
    ],
    comparison: {
      label: `THREE CLOCKS IN A HOUSE`,
      body: `You have three clocks and they read 9:58, 10:01 and 10:04. They disagree by six minutes, and that six minutes is genuinely useful: it tells you not to trust any of them to better than a few minutes. What it does not tell you is whether the real time is 10:01. If all three were set from the same slow radio signal, they could agree to within six minutes of each other and all be twenty minutes behind — tight spread, large error. Tightness between your measurements is a measure of their *consistency*, and consistency is not correctness. Three clocks wound from the same wrong source are the mis-set declination, and the only cure is a clock that got its time from somewhere else entirely.`
    },
    naming: `The six-minute spread between the clocks is **precision**; being twenty minutes behind is a failure of **accuracy**, and the two are different quantities that English usually treats as synonyms. An error that falls differently every time is **random** and shows up as the size of the cocked hat. An error that falls the same way every time is **systematic** — a bias — and it does not show up in the cocked hat at all, which is exactly why it is dangerous. The remedy for random error is to measure more and average. The remedy for systematic error is to spread your landmarks around you so the bias has to cancel itself, and that is a decision about geometry rather than about care.`,
    formalNames: {
      terms: [
        { term: `Cocked hat`, meaning: `The triangle left by three lines of position. Named for the three-cornered hat; in use among British naval navigators since at least the early nineteenth century.` },
        { term: `Precision`, meaning: `How closely repeated measurements agree with each other. The size of the cocked hat measures this, and only this.` },
        { term: `Accuracy`, meaning: `How close a measurement is to the truth. The cocked hat says almost nothing about it.` },
        { term: `Random error`, meaning: `Falls differently each time, averages out, and makes the cocked hat bigger. The honest kind.` },
        { term: `Systematic error`, meaning: `Falls the same way each time. A mis-set declination, a compass with a bent needle, a consistent habit of reading the dial high. Averaging does not touch it.` },
        { term: `Most probable position`, meaning: `The point a navigator settles on inside or near the hat. For bearings of equal quality and landmarks spread round you, the middle of the triangle is a reasonable choice; when they are all on one side, it is not.` },
        { term: `Redundancy`, meaning: `Having more measurements than the answer needs. Two bearings give a position; a third gives a position AND a comment on it.` },
        { term: `Spread`, meaning: `How well the landmarks surround you. Three bearings within half the horizon leave a bias uncancelled; three spaced round you mostly cancel it.` }
      ],
      note: `The lesson taught in many handbooks — that a small cocked hat means a good fix — is a confusion of precision with accuracy, and this course does not teach it.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where have you seen things agree closely with each other and all be wrong together?`,
    items: [
      `Three bathroom scales that agree, all set wrong.`,
      `Everyone in the group remembering the same detail incorrectly.`,
      `A recipe followed exactly, in an oven that runs cool.`,
      `Four reviews that all quote the same press release.`,
      `A tape measure that starts at the wrong end of the hook.`,
      `Two watches both set from the same fast kitchen clock.`
    ],
    ownPlaceholder: `Something consistent and wrong…`,
    synthesis: `The oven is the exact shape of this lesson. The recipe is precise, your following of it is precise, every batch comes out the same — and they all come out underdone, and nothing inside the process can tell you, because everything inside the process shares the fault. The cocked hat is a check made entirely out of your own bearings, so it can only catch the faults your bearings do not share. An oven thermometer is a bearing to a landmark on the other side of you.`,
    builder: {
      body: `Here is a half-hour experiment that will teach you more about your compass than any amount of reading. Stand on a fixed spot you can find again. Take a bearing to one definite, distant object — a mast, a spire, the corner of a far building. Write it down. Walk ten paces away, come back, and take it again. Write it down. Do that twenty times. You now have twenty readings of one unchanging quantity, and the spread of them is your personal bearing error — the number everything in this week depends on and that every book quotes as "two or three degrees" without knowing anything about you. Most people are surprised, in both directions.`
    },
    acrossCultures: {
      place: `NUNAVUT, INUIT WAYFINDING`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Across the Canadian Arctic, travellers have long steered by **uqalurait** — the tongue-shaped snowdrifts that a prevailing wind carves into hard snow, lying in a consistent orientation over large distances. The elder Mariano Aupilarjuk described them simply as the snowdrifts that tell you which direction to go. The knowledge is not merely "the drifts point that way": it includes reading the *shape* of a drift to tell which of two prevailing winds built it, and so whether the drift under your feet is a current statement about direction or a stale one.`,
        `That last part is what belongs in this lesson. A drift is a position line of the very best kind — free, everywhere, readable in a whiteout when nothing else is — and it is also a line that can be systematically wrong while looking perfectly convincing, because the wind that made it has shifted since. Igloolik hunters have reported exactly this in recent decades, that the drifts are now being built by a different wind, and have adjusted by crossing them at a different angle: a correction applied to a trusted instrument from outside the instrument, which is the only kind of correction that catches a bias.`
      ],
      uncertain: `The terminology is local and varies — *uqalurait* in some regions, *kalutoqaniq* for the wind-carved ridges in others — and treating "Inuit navigation" as one system misrepresents knowledge that differs by community as much as by subject. The reports of a changed prevailing wind come from oral testimony and from the press coverage of it rather than from a published meteorological series, and the explanations offered for the change differ sharply between elders' accounts and climatological ones; the fact of the hunters' adjustment is better evidenced than any account of its cause.`,
      sources: `Bennett and Rowley, eds., *Uqalurait: An Oral History of Nunavut* (2004); MacDonald, *The Arctic Sky* (1998); Aporta, "The Trail as Home: Inuit and Their Pan-Arctic Network of Routes," *Human Ecology* 37 (2009).`
    }
  },

  feynman: {
    line: `Explain the thing most handbooks get wrong.`,
    instruction: `Three lines of position leave a small gap between them rather than meeting. Explain what that gap does and does not tell the navigator, and what they should do about an error that falls the same way every time.`,
    banned: ['average', 'accurate', 'triangle'],
    bannedNote: `The first is the thing people do instead of thinking — averaging cures one kind of error and not the other, and saying it skips the distinction. The second is the word that gets used for two different things in this lesson. The third you will have to describe instead of name, which is the point.`,
    placeholder: `The three lines leave a small gap, and what that gap actually measures is…`,
    checks: [
      `It says the gap measures how well the bearings agree with each other, not how right they are.`,
      `It does not claim that a small gap means a good position.`,
      `It distinguishes an error that falls differently each time from one that falls the same way.`,
      `It gives a remedy for the second kind that is about where the landmarks are, not about taking more care.`
    ],
    closing: `If your explanation ends with "so take more bearings", it has only dealt with half the problem — and the half it has left out is the half that walks people off cliffs.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction, and a question about what honest doubt is worth.`,
    prediction: {
      question: `Two navigators fix their position from three bearings at the same spot. One gets a tight little triangle twenty yards a side; the other gets a sprawling one a hundred yards a side. Whose fix is closer to the truth?`,
      options: [
        {
          id: 'cannot',
          text: `You cannot tell — and the second one has been told more about their own uncertainty.`,
          verdict: `Right on both counts, and the second clause is the useful one. Over twenty thousand simulated sets on this sheet the relation between the size of the triangle and the actual miss is weak: a fifteen-yard triangle forty yards out, a hundred-and-twenty-yard triangle forty-five yards out. What the sprawling triangle does give its owner is an honest warning, which the tight one withholds — and if the tight triangle came from three landmarks all in one direction, it is actively misleading.`
        },
        {
          id: 'tight',
          text: `The tight one — less disagreement between the lines means a better position.`,
          verdict: `This is what almost everyone says, and it is what a good many handbooks print, and it confuses two different quantities. Agreement between your own measurements is precision; closeness to the truth is accuracy. Three bearings taken with a compass whose declination is set wrong will agree beautifully with each other and be wrong together — a 57-yard triangle sitting 81 yards from the truth, which the simulation will show you on demand.`
        },
        {
          id: 'sprawling',
          text: `The sprawling one — a big triangle means they took bearings to objects well spread around them.`,
          verdict: `There is something in this and it is not reliable. A well-spread set of landmarks does tend to produce a larger triangle for the same quality of bearings, and it is also the arrangement that cancels a systematic error — on this sheet, 11 yards out instead of 81. So a big triangle is weak evidence of a good arrangement. But a big triangle can equally mean one badly mis-sighted bearing, which is a different thing entirely and much worse.`
        }
      ]
    },
    open: {
      question: `A third bearing costs almost nothing. Why does anybody take only two?`,
      placeholder: `I'd skip the third one because…`,
      reveal: [
        `Because two is enough to get an answer, and an answer that comes with no comment attached is more comfortable than one that comes with a measured warning. That is not laziness so much as a preference, and it is worth naming in yourself: a third bearing cannot make your position better, it can only tell you how bad it might be. Many people would rather not know.`,
        `There is also a real reason. On a moving boat the three bearings are taken at three different times from three different places, so the triangle contains your own movement as well as your error, and separating the two needs the transferred line of Lesson 25. On land, standing still, there is no excuse.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-07',
        label: `Navigation, Lesson 7 — true north and magnetic north`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, and today's is about a habit rather than a fact.`,
    prompt: `Think of something you are confident about because your sources agree with each other. Write down where those sources got their information, and whether it was the same place.`,
    placeholder: `I'm confident about this, and all my reasons for it came from…`,
    mapFooter: `Week 5, day two. A fix, and an honest measure of how little it promises.`,
    tomorrow: `Tomorrow: distance. Five weeks of angles, and you have still never measured how far you walked — which turns out to be the weaker of the two measurements and the one you cannot take twice.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Your compass has two quite separate ways of lying to you. It can wobble — you read 047 and then 044 on the same mast, because your hand moved and your eye estimated. And it can lean — every reading two degrees high, because the declination is set for the wrong year or there is iron in your pocket. The cocked hat is built entirely out of three readings from that one compass, so it can see the wobble and is blind to the lean. Nothing a single instrument tells you about itself can catch a fault the instrument has consistently.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Draw the three lines and shade, in your mind, the little triangle. Now shade the three regions just outside it, each one tucked against a side. You are in the triangle in two of the eight ways the three errors can fall, and in those outer regions the rest of the time — and the outer regions have no boundary on their far side. That asymmetry is the whole result: the triangle is a small bounded thing, and the place you actually are is drawn from a much larger unbounded one.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Lay three drinking straws on a table so they make a small triangle, and put a coin where you believe the centre is. Now slide any one straw sideways, keeping it parallel — the triangle changes shape and the coin is suddenly outside it. Try to slide the straws so that the triangle is tiny AND the coin is well outside: it is easy, which is the lesson. Then try to slide them so the triangle is tiny and the coin is guaranteed inside: you cannot, without already knowing where the coin is.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `The simulation shades the triangle green when it holds the true position and red when it does not, and keeps a tally. Watch the tally rather than the triangle. Then take the error slider down to half a degree: the triangle becomes a dot, the fix is good to a few yards, and the tally goes on reading about one in four. That stubborn fraction, unmoved by the thing you would expect to move it, is the clearest evidence that the triangle is not a container for your position.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `Three bearings, each exactly two degrees high because the declination was applied the wrong way round. To the fire tower, Beaver Pond and Hollow Rock — all in front of you, spread over about 155° of the horizon. The three lines leave a triangle 57 yards a side, which looks like good work, and the middle of it is 81 yards from where you stand. Now take the same bearings, with the same error, to Beaver Pond, Hollow Rock and the old quarry, which surround you more nearly. The triangle doubles to 108 yards — and the fix is 11 yards out. Worse-looking, seven times better.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Ask three separate questions and do not let them run together. First: how much do my three lines disagree? That is the size of the hat, and it is a real measurement of my own precision. Second: does that tell me how far I am from the truth? Only weakly — the measured relation is loose. Third: is there an error all three of my bearings share? The hat cannot answer this one at all, and the only thing that helps is having taken the bearings to objects on opposite sides of me.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Suppose the triangle did reliably contain your position. Then its size would be an upper bound on your error, and you could shrink the bound by working more carefully — error as something you could buy your way out of. Now notice that the only information in the triangle came from three readings of one instrument. For the triangle to bound your error, the instrument would have to be able to detect its own consistent faults, which nothing can. So the triangle cannot be a bound, and the one-in-four is not a surprise: it is what had to be true.`
    }
  ],

  map: [
    { name: `The cocked hat`, level: 4, fresh: true },
    { name: `Precision and accuracy`, level: 4, fresh: true },
    { name: `Systematic vs careless error`, level: 5 },
    { name: `Resection`, level: 5 },
    { name: `Line of position`, level: 5 },
    { name: `Cut angle`, level: 5 },
    { name: `Magnetic and true`, level: 5 },
    { name: `Knowing a method's limits`, level: 5 },
    { name: `Position`, level: 5 },
    { name: `Plotting on a map`, level: 4 },
    { name: `Declination`, level: 5 }
  ]
}
