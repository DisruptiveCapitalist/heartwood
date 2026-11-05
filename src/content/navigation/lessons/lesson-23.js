// Navigation · Week 5 · Lesson 23 — how far is it?
//
// Twenty-two lessons of angles, and no distance. Field Guide Chapter 13.
//
// MEASURED IN src/lib/plot.js, CHECKED IN src/__tests__/plot.test.js:
//
//   The simulation walks from the ford, whose legs are:
//     to Beaver Pond      1,087 yd on 017°
//     to the old quarry   1,444 yd on 120°
//     to Hollow Rock      1,890 yd on 094°
//     to the fire tower   2,091 yd on 060°
//
//   On the default leg, the ford to the old quarry at 1,444 yards:
//     a 5% distance error puts you 72 yards ALONG the line
//     a 2° bearing error puts you 50 yards ACROSS it
//     together, 89 yards from the mark
//
//   THE STRUCTURAL POINT, and the reason this lesson sits after the fix rather
//   than before it: the two errors are perpendicular. A bearing error swings
//   you off the line; a distance error slides you along it. They do not
//   combine, they box you in. And both are proportional to the range, so the
//   exchange rate is scale-free: two degrees of bearing is worth about three
//   and a half per cent of distance, at any distance. (36 yd ÷ 1,021 yd =
//   0.0349, checked in the test suite.)
//
//   One degree of bearing error is 31 yards per mile — the figure Lesson 10
//   established and the one a reader can use without a calculator.
//
//   Naismith's rule (1892): one hour per three miles, plus one hour per 2,000
//   feet of ascent. Six flat miles, two hours; six miles and 1,500 feet, two
//   and three quarters.
//
// The honest framing the copy must keep: a pace count is PRECISE AND BIASED —
// it gives nearly the same wrong answer every time, so it can be calibrated
// out. A time-and-speed estimate is the opposite. That distinction is Lesson
// 22's distinction, arriving in a second subject, and the copy should say so.

export default {
  id: 'lesson-23',
  number: 3,
  week: 5,
  title: `How far is it?`,
  openingQuestion: `Twenty-two lessons about which way. How do you know how far?`,
  concept: `Distance as a measurement`,

  fieldGuide: {
    chapter: 13,
    title: `Measuring Distance`,
    exercise: `Measure out a hundred yards on flat ground — a running track, a long pavement, a field with a tape. Walk it at your normal pace, counting only every second step, and write down the count. Do it four more times. The average is your personal pace, the one number in this whole course that is yours alone and that nobody can look up for you. Then walk the same hundred yards uphill and count again, and write that down too, because it will not be the same and the difference is the thing that will catch you out.`
  },

  see: {
    voice: 'professor',
    line: `A walk from the ford to the old quarry, fourteen hundred yards. Two sliders, two completely different kinds of mistake — watch which way each one moves you.`,
    simulation: { id: 'chart-fix', props: { mode: 'pace' } },
    observations: [
      { text: `Pull the pace slider and you slide **along** the line, overshooting or stopping short. Pull the bearing slider and you swing **across** it. The two errors are at right angles to each other, and the shaded box is where you can expect to arrive: 72 yards long and 50 yards wide, on this leg, for a 5% pace and a 2° bearing.` },
      { text: `Both grow in step with the distance. Two degrees is 31 yards a mile, five per cent is 88 yards a mile — so the exchange rate between them never changes however far you go. **Two degrees of bearing is worth about three and a half per cent of distance**, on a hundred-yard leg or a ten-mile one.`, emphasis: true },
      { text: `Now notice which slider does more damage. At every setting the simulation offers, the distance error is the bigger one — and the bearing is the measurement you can take again, to a different object, from the same spot. That asymmetry is why Lesson 21 crossed two bearings rather than pacing out one.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the second one is the reason this lesson comes after the fix rather than before it.`,
    sentences: [
      `**Distance on the ground is measured by counting something that repeats.** Paces, usually: you walk a known hundred yards, count your double-paces, and you now own a ruler made of your own legs. At sea you count the knots running out over the stern; in a car, the wheel's turns. There is no way of measuring distance that is not, underneath, counting repetitions of a known length — which is why every distance measurement inherits whatever is wrong with that length.`,
      `**A distance error and a bearing error are at right angles, which is why they cannot be traded for each other.** Get the bearing wrong and you walk off the line; get the distance wrong and you stop in the wrong place on it. You arrive somewhere in a box, and the box has one side made of your compass and the other made of your legs. This matters because a bearing can be taken twice, to two different objects, and crossed — Lesson 21 — whereas a distance can only be walked once.`,
      `And **a pace count is a precise measurement with a bias in it, which makes it the good kind of wrong.** Count the same hundred yards five times and you will get nearly the same answer five times; walk uphill and every answer will be short by nearly the same percentage. That is Lesson 22's systematic error, arriving in a new subject — and here, for once, it is good news, because an error that is always the same size can be measured once and then subtracted for ever. The useless measurement is not the biased one; it is the one that scatters.`
    ],
    comparison: {
      label: `A SHELF AND A PIECE OF STRING`,
      body: `You need to know if a shelf fits an alcove, and you have no tape measure, so you use a piece of string: you mark the alcove on the string and carry it to the shelf. It works perfectly, and it works even though you never learn a number — because the string is the same length at both ends of the journey. Now use a rubber band instead. It still gives you an answer, it gives you nearly the same answer every time you try, and the answer is wrong by however much you happened to stretch it. Your pace is the rubber band. It does not scatter; it stretches, consistently, with the slope and the ground and how tired you are, and the whole skill is knowing by how much.`
    },
    naming: `Counting repetitions of your own stride is **pace counting**, and the length you have calibrated is your **pace** — conventionally a double-pace, counted on every second footfall, because it is easier to count half as often. Working a distance out from how long you have been going and how fast is **time and speed**, and the rule of thumb for hill walking is **Naismith's rule**, published in 1892: an hour for every three miles, plus an hour for every two thousand feet of climb. At sea the same job is done by the **log**, and the unit it produced — the **knot**, one nautical mile in an hour — is still the unit ships are measured in, which is Lesson 25's story. All of them are counting something, and all of them inherit the error in the thing counted.`,
    formalNames: {
      terms: [
        { term: `Pace`, meaning: `Your own calibrated stride, usually counted as a double-pace. Measure it on a known hundred yards; it is personal and nobody else's figure helps you.` },
        { term: `Pace counting`, meaning: `Distance by counting double-paces. Precise, biased, and the bias changes with slope, ground and fatigue.` },
        { term: `Time and speed`, meaning: `Distance as speed times time. Needs an honest speed, which people are far worse at than they expect.` },
        { term: `Naismith's rule`, meaning: `1892: an hour per three miles plus an hour per 2,000 feet of ascent. Still the standard planning estimate, and still optimistic for a tired party.` },
        { term: `Along-track error`, meaning: `How far off you are in the direction of travel. This is what a distance error gives you.` },
        { term: `Across-track error`, meaning: `How far off you are to one side. This is what a bearing error gives you: range times the tangent of the error, or 31 yards per mile per degree.` },
        { term: `Map scale`, meaning: `The ratio between the sheet and the ground. 1:25,000 means four centimetres to the kilometre; this course's sheet is 380 pixels to the mile.` },
        { term: `Pacing on a slope`, meaning: `Your stride shortens going up and lengthens going down, while the map measures the flat distance underneath. Both effects are against you going uphill.` },
        { term: `Judging across open ground`, meaning: `Estimating a distance by eye, with nothing to count. The reliable trick is to halve it — pick the midpoint, judge that, and double — because people are much better over short distances. Haze, water and snow all make things look further; clear air and looking uphill make them look nearer.` },
        { term: `Height by tangent`, meaning: `The same arithmetic turned on its side: stand a measured distance from a tree, sight the top, and the height above your eye is that distance times the tangent of the angle. 20 feet away at 30° gives 11.5 feet, plus your eye height.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where do you measure something by counting repetitions of a thing you are not sure of?`,
    items: [
      `"It's about ten minutes' walk" — from someone with longer legs.`,
      `Measuring a room in shoe-lengths.`,
      `A recipe in cups, with somebody else's cup.`,
      `Counting out a bar of music by tapping your foot.`,
      `Judging a car journey by how many songs it takes.`,
      `Pouring a shot by counting to three.`
    ],
    ownPlaceholder: `Something I measure by counting…`,
    synthesis: `The shot is the honest one, because bartenders actually calibrate it: they pour into a measure, count, and find out that their three is 40 ml rather than 25. Everything in that list works the same way and only one of them is usually checked. "Ten minutes' walk" from a stranger is a pace count in somebody else's legs, and the reason it is so often wrong is not that they lied but that they never measured their own stride either.`,
    builder: {
      body: `Calibrate yourself properly, because this is the one number in the course that cannot be looked up. Find a hundred yards you can measure — an American football field is a hundred yards between the goal lines, a running-track straight is a hundred metres, or lay out a tape. Walk it five times at your real walking pace, counting every second step, and average. Then do two more things most people skip: walk it uphill and count, and walk it downhill and count. Write all three numbers on the inside cover of your notebook. You now have a ruler that works in the dark, in fog, with no instrument, and that nothing can take away from you.`
    },
    acrossCultures: {
      place: `JAPAN, 1800 ONWARD`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Inō Tadataka began surveying the coast of Japan in 1800, in his mid-fifties, having retired from running a sake and rice business and taken up astronomy. Over the following years he walked the coastline measuring distance by counting his own steps and direction by compass, building up a **traverse** — a chain of measured legs, each a bearing and a distance, carried forward from the last — and then correcting it by sighting back and forth between known points and by observing star and Sun altitudes for latitude. Every element of this week is in that description, including Lesson 21's resection, used as a check rather than as the primary method.`,
        `The resulting survey was extraordinarily good for its tools, and the reason given in the Japanese accounts is not a better instrument but sheer density and repetition: an enormous number of measured points, and the same stretches walked more than once. He died in 1818 without finishing the atlas; Takahashi Kageyasu and others completed the **Dai Nihon Enkai Yochi Zenzu** from his field books in 1821.`
      ],
      uncertain: `Sources disagree on the span of the fieldwork — 1800 to 1816 and 1800 to 1817 are both given — and on the totals, with one widely repeated figure of 3,736 days of measurement and about 34,913 km travelled sitting alongside a rounder "40,000 km" that does not match it. The specific pacing details that circulate in English, including a trained stride of about 69 cm and the practice of walking each stretch in both directions to compare, come from popular and commercial sites rather than from scholarship, and should not be relied on without checking the Geospatial Information Authority of Japan's own materials or the Inō Tadataka Memorial Museum.`,
      sources: `*Journal of Geography (Chigaku Zasshi)* 129:2 (2020), on Inō's astronomical observations; Geospatial Information Authority of Japan, Inō Tadataka survey materials; Web Japan, "Japan's First Accurate Map" (2001).`
    }
  },

  feynman: {
    line: `Explain the measurement the course has been doing without for five weeks.`,
    instruction: `Explain how to find out how far you have walked, with nothing but your own body, and why the mistake it makes is a different shape from the mistake a compass makes.`,
    banned: ['guess', 'estimate', 'roughly'],
    bannedNote: `All three are ways of not committing to a number, and this is the lesson where a number has to be committed to. If you cannot say it without them, you are describing an impression rather than a measurement.`,
    placeholder: `To know how far I've come, I count…`,
    checks: [
      `It describes counting something of a known length, and says how that length was found.`,
      `It says the mistake in the distance moves you along your line of travel, and a mistake in direction moves you sideways.`,
      `It notes that the same wrong answer every time can be corrected, and says how.`,
      `It mentions at least one thing that changes the length being counted — slope, ground, tiredness.`
    ],
    closing: `The test of this one is whether a reader could go out this afternoon and come back with their own number. If they could not, the explanation has told them about pacing rather than taught them to pace.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction about which error to worry about, and one question about what distance buys you.`,
    prediction: {
      question: `You walk a mile on a bearing. Your compass work is good to 2° and your pace count is good to 5%. Which error puts you further from where you meant to be?`,
      options: [
        {
          id: 'distance',
          text: `The pace count — 5% of a mile is 88 yards, against 61 yards for the bearing.`,
          verdict: `Right, and it is worth knowing how close the two are, because most people expect the compass to be the weak link and it is not. Two degrees at a mile is 61 yards across; five per cent of a mile is 88 yards along. The distance measurement is the weaker one at these figures — and it is also the one you cannot repeat, which matters more than the extra 27 yards.`
        },
        {
          id: 'bearing',
          text: `The bearing — degrees sound small but they open out with distance.`,
          verdict: `The instinct is sound and the arithmetic goes the other way. A bearing error does open out with distance, exactly as you say: 31 yards per mile per degree, so 61 yards at two degrees. But a percentage error in distance opens out with distance too, at the same rate, and five per cent is 88 yards. Both scale together, which means the comparison between them is the same at any range — and at these settings the pace count loses.`
        },
        {
          id: 'same',
          text: `Neither — they're at right angles, so they don't add up.`,
          verdict: `This is the most interesting wrong answer, because the premise is right and the conclusion does not follow. They are indeed perpendicular, so they do not add arithmetically: 88 and 61 give a total miss of about 107 yards rather than 149. But "do not add up" is not "do not matter" — you are still 107 yards from where you meant to be, and the question was which of the two contributes more to that, which is the 88.`
        }
      ]
    },
    open: {
      question: `You can now measure a distance. What does that let you do that two bearings could not?`,
      placeholder: `With a distance as well as a direction, I could…`,
      reveal: [
        `Find your position with only one landmark — a bearing to it and a distance from it is a fix, of a sort. It is a worse fix than two bearings, because one of its two sides is made of your legs, but it works where there is only one thing to see.`,
        `And much more importantly: find your position with no landmark at all. A direction and a distance from a place you know is a position, and it needs nothing in view whatsoever. That is dead reckoning, it is tomorrow, and it is how the open ocean was crossed for a very long time before anybody could fix a position at sea.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-09',
        label: `Navigation, Lesson 9 — following a bearing`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, and this one has homework attached.`,
    prompt: `Write down your best current belief about how many of your double-paces make a hundred yards. Then go and measure it, and write down what it actually was.`,
    placeholder: `I think my hundred yards is about… paces`,
    mapFooter: `Week 5, day three. A ruler made of your own legs.`,
    tomorrow: `Tomorrow: a direction and a distance from somewhere you knew, and no landmark at all. Dead reckoning — and the two kinds of error in it behave so differently that going slower makes one of them worse and leaves the other untouched.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Your compass answers one of the two questions a journey asks, and it answers it rather well. "Which way" it will tell you to a couple of degrees all day long, in any weather, and it will tell you again a minute later and agree with itself. "How far" it has nothing whatever to say about. That gap is why every compass worth owning has a scale printed on the edge of the baseplate: the instrument knows it is only half of the answer, and the other half has to come off the map or out of your legs.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `A map gives you distance for nothing, which is easy to forget. The sheet in the simulation is two miles across, so measuring the ford to the old quarry is a matter of laying the compass edge on the paper: 1,444 yards, no walking required. What the map cannot tell you is how far you have *got*. That is the asymmetry of this lesson — distances between known places are free, and the distance you have personally travelled has to be counted step by step as you go.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Tie a knot in a bootlace every time you pass a telegraph pole. At the end you have a count, and if you know the pole spacing you have a distance — and if you were wrong about the spacing you are wrong by that percentage, consistently, with no hint in the bootlace that anything is amiss. That is a pace count, and it is also a ship's log line, which is a rope with knots in it paid out over the stern. The device is the same device.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `In the simulation, look at the two heavy bars at the destination rather than at the dashed line. One bar points along the direction of travel and is labelled with the distance error. The other points across it and is labelled with the bearing error. They meet at a right angle, and the faint box they bound is your arrival. Pull the pace slider and only one bar changes; pull the bearing slider and only the other does. Two independent measurements, two independent sides.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `The ford to the old quarry: 1,444 yards on a bearing of 120°. Your pace is calibrated on the flat, but this leg climbs, so your real stride is five per cent shorter than the one you counted with — you count out what you believe is 1,444 yards and you have actually covered 1,372, stopping 72 yards short. Your bearing is two degrees out as well, which swings you 50 yards off the line. You finish 87 yards from the quarry, to one side of it and short of it, and from there it may well be behind a fold in the ground.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Three questions, in order. One: what am I counting, and how long is one of them? For walking, that is your double-pace, and you find it by walking a measured hundred yards. Two: what makes that length change? Slope, soft ground, undergrowth, a heavy pack, being tired at the end of the day — all of which shorten it. Three: how far off does a given error put me, and in which direction? A percentage of the distance, along the line of travel. That is all of it.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from the fact that a position needs two numbers. Lesson 21 bought both of them with bearings, which is why it needed two landmarks. If you want to buy a position with only one landmark, the second number has to come from somewhere else, and distance is the only other thing you can measure. So the existence of pacing is not an extra convenience — it is the second currency, and the reason it matters so much tomorrow is that dead reckoning buys a position using nothing but a direction and a distance, with no landmark on the invoice at all.`
    }
  ],

  map: [
    { name: `Measuring distance`, level: 4, fresh: true },
    { name: `Pace counting`, level: 4, fresh: true },
    { name: `Map scale`, level: 4 },
    { name: `Along and across track`, level: 4, fresh: true },
    { name: `Precision and accuracy`, level: 5 },
    { name: `Systematic vs careless error`, level: 5 },
    { name: `Resection`, level: 5 },
    { name: `Cut angle`, level: 5 },
    { name: `Following a bearing`, level: 5 },
    { name: `Position`, level: 5 },
    { name: `The cocked hat`, level: 5 }
  ]
}
