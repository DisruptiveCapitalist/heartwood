// Navigation · Week 6 · Lesson 28 — looking back across the traditions
//
// Part VI of the Field Guide is seven chapters of cultural profiles, and the
// handoff was firm that they must not be reduced to a paragraph each. This
// course has taken the opposite approach from the start: a tradition appears
// beside the skill it illustrates, in the CONNECT IT stage of the lesson where
// it belongs, with its evidence label and its uncertainty. Twenty-seven of
// them have gone past.
//
// So this lesson is not a parade and must not become one. It is the one
// question worth asking of all of them at once, and Lesson 26 supplied it:
// every tradition in this course was good at latitude and helpless at
// longitude, and that is not a coincidence or a failing. It is a property of
// the two quantities.
//
// MEASURED IN src/lib/voyage.js, CHECKED IN src/__tests__/voyage.test.js.
// Thirty days at a hundred miles a day, on the parallel of 20°:
//
//                              latitude    longitude, best available
//   by eye and a log line        60 nm        150 nm   (reckoning only)
//   a kamal, no clock            30 nm        150 nm   (reckoning only)
//   a sextant and the Moon        2 nm         51 nm   (lunar distances)
//   a sextant and a chronometer   2 nm         21 nm
//
//   THE SHAPE OF THE TABLE IS THE LESSON. The latitude column is flat in the
//   length of the voyage — it is a measurement, retaken every clear night, and
//   tonight's does not inherit yesterday's mistake. The longitude column grows,
//   because longitude is carried and every day's error is added to the last.
//
//   A chronometer is the only thing in the history of the subject that changed
//   that: 0.7 miles a day instead of 3. Not better arithmetic, not better
//   seamanship — a better clock.
//
//   AND THE MOON'S PRICE, which is why lunar distances never displaced the
//   reckoning for ordinary voyages: the Moon moves against the stars at 32.9
//   arcminutes an hour, so an arcminute of measured angle is 1.8 minutes of
//   time and 27.3 arcminutes of longitude. The penalty factor is 27. The same
//   sextant that gives latitude to two miles gives longitude to fifty-one, and
//   it only beats the dead reckoning after seventeen days at sea.
//
// The Chaco figures in the card are computed from published alignment
// measurements rather than asserted: 50 km at 3.1° off north ends 2.7 km to the
// side of a true north line, and at 1.5° it ends 1.3 km to the side. That
// arithmetic is this course's contribution to reading the debate, and the
// debate itself is reported rather than settled.

export default {
  id: 'lesson-28',
  number: 3,
  week: 6,
  title: `Looking back across the traditions`,
  openingQuestion: `Twenty-seven lessons, twenty-five traditions in the margin. Every one of them could find north, and not one of them could find east.`,
  concept: `Why longitude was everybody's problem`,

  fieldGuide: {
    chapter: 23,
    title: `Indigenous Peoples of North America`,
    exercise: `This one is reading rather than walking, and it is the one piece of fieldwork in the course that happens in a library. Take any tradition from Part VI — chapters 23 to 29 — and work out two things about it that the chapter may not say in so many words. First: what did it treat as the thing that stays still? The sky, the land, the water, or an instrument? Second: what happened to it when that thing was unavailable — cloud, open ocean, unfamiliar country, a broken instrument? Write the answers down for two traditions side by side, and you will have done the comparison this lesson is about, which no single chapter can do for you.`
  },

  see: {
    voice: 'professor',
    line: `The same ocean passage, thirty days and three thousand miles, done four times with four different kits. Start on BY EYE AND A LOG LINE, which is most of human history.`,
    simulation: { id: 'voyage', props: { mode: 'assay' } },
    observations: [
      { text: `With nothing but your eye and a log line, after thirty days your **latitude is 60 miles out and your longitude is 150**. But look at the shape of the two lines rather than the numbers. The green one is flat. It was 60 miles out on the first day and it is 60 miles out on the thirtieth, because you measure it again every clear night and tonight's measurement does not care what last night's said.` },
      { text: `The red one climbs, and it will go on climbing for as long as you are at sea, because longitude is not measured — it is **carried**, and every day's error is added to all the days before it. Now step through the four kits. A better instrument pulls the flat line down: **60 miles, then 30, then 2.** It does almost nothing to the climbing one.`, emphasis: true },
      { text: `Only the last kit changes the climb, and it changes it by having a clock in it: **0.7 miles a day instead of 3**. And note the Moon's line on the two middle kits — flat, like latitude, because it is an observation rather than a tally, and sitting up at **51 miles**, because the Moon is a slow hand on a vast clock. It takes seventeen days at sea before lunar distances beat simply counting.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences about every navigator who ever lived, and the first one is the only one that matters.`,
    sentences: [
      `**A quantity you can measure behaves completely differently from a quantity you have to carry, and north-south is the first kind while east-west is the second.** Latitude is an angle between your horizon and something in the sky, and the sky will be there again tomorrow: a bad measurement tonight costs you nothing beyond tonight. Longitude is a tally — of how far you have gone, or of how much time has passed somewhere else — and a tally can only be added to. That is why the honest picture of any pre-chronometer voyage is a long thin box on the chart: narrow north and south, and spreading east and west for as long as the voyage lasts.`,
      `**So every tradition in this course is built around the thing it could measure, and each one chose a different thing to treat as fixed.** The Pacific navigators trusted the sky and the swell; the Inuit trusted the land, down to the shape the wind leaves in old snow; the Mediterranean pilots trusted a written sailing direction and a lead line; the Chinese and then everybody trusted a magnetised needle; the Europeans of the seventeenth century trusted an instrument. Those are not stages on a ladder. They are different answers to "what around here stays still?", and each one is excellent in the country that produced it and useless a thousand miles away — which is a far better way to compare traditions than asking which was more advanced.`,
      `And **the reason none of them solved the east-west problem is that it was not a navigation problem.** It was a clockmaking problem, and it was solved by a clockmaker. Sextants were already magnificent — two arcminutes, which is two miles of latitude — and the Moon method wrings longitude out of one by a chain of inference that multiplies the error by twenty-seven, so those same two arcminutes become fifty-one miles. No amount of skill in observing, plotting or seamanship could close that gap, because the gap was not in any of those things. That is worth sitting with before judging anybody's navigation.`
    ],
    comparison: {
      label: `THE THERMOMETER AND THE ELECTRICITY METER`,
      body: `There is a thermometer in your hall and a meter under your stairs, and they are two completely different kinds of knowledge. If you misread the thermometer this morning, this afternoon's reading is still correct — the number is a fact about now, freshly available whenever you look. If you misread the meter, every bill from now until someone checks it is wrong, because the meter is a running total and a total remembers. Latitude is the thermometer. Longitude is the meter. And that is why, for three thousand years, people knew roughly which parallel they were on and had no idea at all how far along it they had got.`
    },
    naming: `The comparison the lesson is making has a name in measurement: latitude is an **absolute** quantity, obtained fresh from an external reference, and longitude before chronometers was an **accumulated** or **integrated** one, obtained by adding up increments. An absolute measurement has an error; an accumulated one has a **drift**. All of Week 5's dead reckoning was integration, and all of Week 4's star work was absolute, which is why the two chapters felt so different to learn. The practical bridge between them, in every tradition and still today, is to use the accumulated quantity for as long as you dare and then **reset** it against an absolute one — a landfall, a star sight, a known bearing, a satellite. Navigators call that resetting a fix; an engineer would recognise it instantly as the correction of an integrator against a reference, and a walker does it every time they recognise a gate.`,
    formalNames: {
      terms: [
        { term: `Absolute measurement`, meaning: `One taken fresh from an outside reference — a star's altitude, a bearing to a known peak. Has an error, but no memory. This is what latitude always was.` },
        { term: `Accumulated quantity`, meaning: `One built up by adding increments — courses and distances run, seconds ticked. Has a drift, which grows without limit. This is what longitude was until 1760.` },
        { term: `Drift`, meaning: `The growth of error in an accumulated quantity. The word is used of a clock's rate, a gyroscope's wander and a dead-reckoning plot, and it means the same thing in all three.` },
        { term: `Reset`, meaning: `Replacing the accumulated value with an absolute one. A fix, a landfall, a recognised gate. Every tradition's real skill is knowing when it is time.` },
        { term: `Lunar distance penalty`, meaning: `The factor of 27 by which the method multiplies an angular error, because the Moon moves only half a degree an hour. The reason a superb instrument still gave poor longitude.` },
        { term: `Latitude sailing`, meaning: `The universal response to the asymmetry: steer for the parallel, which you can measure, and run along it. Lesson 27's aiming off, done at the scale of an ocean.` }
      ],
      note: `This panel is the course's own vocabulary rather than any tradition's, and that is worth saying out loud. Naming what several traditions have in common is a useful thing for a student to be able to do and a dangerous thing to mistake for what those traditions thought they were doing. A Caroline Islands navigator was not integrating an accumulated quantity. He was holding an island in his mind and moving the sea past it, and the fact that our arithmetic can describe the result is a fact about our arithmetic.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where in your own life do you have one of each — something you can check fresh any time, and something that is only ever a running total?`,
    items: [
      `Your weight on the scales, against the calories you think you ate.`,
      `The clock on the wall, against how long you think you have been working.`,
      `The fuel gauge, against the miles since you filled up.`,
      `The bank balance, against what you remember spending.`,
      `A photograph of the garden last spring, against your memory of it.`,
      `The thermometer outside, against how cold you think it has got.`
    ],
    ownPlaceholder: `Something in my life that is only ever a running total…`,
    synthesis: `The fuel gauge and the trip meter are the same pair of instruments as the sextant and the log, bolted to the same dashboard, and everyone trusts them in exactly the right proportion without being taught. The gauge can be read fresh at any moment and it is crude; the trip meter is precise and it has been wrong since the last time anybody reset it. So you use the trip meter to plan and the gauge to decide, and when the two disagree you believe the gauge. Every navigator in this course did the same thing with a tally and the sky.`,
    builder: {
      body: `A reading exercise, and the only one in the course. Pick two traditions from this course that you found most unlike each other — the Caroline Islands and the Arctic, say, or Jaipur and the Marshall Islands — and for each one write down three things: what it treated as fixed; what quantity it could actually measure; and what it did when the thing it treated as fixed was unavailable. Then look at the two answer sheets side by side. What you will find is that the third answer is nearly always the same, and nearly always some version of "wait, hold the course, and keep the tally" — which is to say, dead reckoning, everywhere, for everyone, as the universal fallback.`
    },
    acrossCultures: {
      place: `CHACO CANYON AND KUTZ CANYON, NEW MEXICO, ABOUT 1050–1125`,
      label: `DOCUMENTED REGIONALLY`,
      paragraphs: [
        `Running north out of Chaco Canyon is a constructed road some fifty kilometres long, engineered wide, with stairways cut where it meets cliffs, and it is remarkably straight. That much is agreed. What it was for is not: the road connects Chaco to the badlands at Kutz Canyon and does not obviously go anywhere that needed a road, which has led to a long argument between readings of it as a route and readings of it as a deliberate expression of direction — a road built to *be* north rather than to get somewhere.`,
        `The navigational interest is the straightness, and it is worth putting a number on. Published measurements of the alignment disagree: a deviation of about 1.5° from astronomic north is reported where the road turns towards the steepest edge of Kutz Canyon, and a sceptical re-analysis reports the longer stretch running consistently about 3.1° east of north. On a fifty-kilometre road those are 1.3 and 2.7 kilometres of displacement from a true north line respectively — so the two readings are not a quibble, and 3.1° is not a near miss at north. But both figures describe a line held to within a few degrees over thirty miles of broken country, by people with no magnetic compass, which is better than most people manage today with one.`
      ],
      uncertain: `Almost everything beyond the road's existence and approximate straightness is contested. Whether it was a single continuous road, several deliberate alignments made in one episode and not maintained, or a route that continued down Kutz Canyon to the San Juan, are all live positions. The 1.5° and 3.1° figures come from different studies measuring different stretches by different methods and should not be averaged or treated as one disagreement. The inference that a celestial reference was used to hold the line — Polaris was not at the pole in 1100, so this would mean a circumpolar star or a solar method — is the obvious reading and is not demonstrated by anything in the ground. And the broader claim that Chacoan roads in general were astronomically aligned is argued well and disputed well, and is not something a reader should take from a single source.`,
      sources: `Nials, Stein and Roney, *Chacoan Roads in the Southern Periphery* (1987); Sofaer, Marshall and Sinclair, "The Great North Road: A Cosmographic Expression of the Chaco Culture of New Mexico", in *World Archaeoastronomy* (1989); Lekson, *The Chaco Meridian* (1999).`
    }
  },

  feynman: {
    line: `A harder kind of explanation than usual, and the banned words are the whole exercise.`,
    instruction: `Explain to someone why navigators everywhere, for thousands of years, could tell you which parallel they were on and could not tell you how far east or west they had come.`,
    banned: ['primitive', 'advanced', 'instruments'],
    bannedNote: `The first two are the words that turn a comparison into a ranking, and they will carry you straight past the actual answer. The third is banned because reaching for it lets you say "they did not have the equipment", which is not true — a 1750 sextant was superb — and hides the fact that the obstacle was a clock.`,
    placeholder: `North and south can be checked again any time, because…`,
    checks: [
      `It says what north-south position is measured against, and that the reference comes back every day.`,
      `It explains why east-west position had to be totted up instead.`,
      `It says what happens to a running total over a long voyage, and why a fresh measurement does not suffer the same way.`,
      `It avoids making anybody's tradition sound like a worse version of ours.`
    ],
    closing: `The test for this one is unusual: read your explanation back and ask whether it would be fair to the navigator you admire most in this course. If it reads as a list of things they could not do, it has missed the point — the asymmetry was in the quantities, and they were working on the hard side of it with everything they had.`
  },

  challenge: {
    voice: 'editor',
    line: `A question about rankings, which is where this material usually goes wrong.`,
    prediction: {
      question: `Someone says: "Polynesian navigators found tiny islands across thousands of miles of ocean without instruments, so their methods must have been more accurate than European ones." What is wrong with the sentence?`,
      options: [
        {
          id: 'quantity',
          text: `It compares two things that were not being measured to the same standard — finding an island is not the same as knowing a position.`,
          verdict: `Yes, and the distinction is the most useful thing in this lesson. A European navigator wanted a latitude and a longitude: two numbers, on a chart, to a stated accuracy. A Pacific navigator wanted to arrive, and had a set of techniques for widening the target until arrival was certain — a screen of islands, the birds that fly out eighty miles and back, the swell refracting round a shore, the clouds that stand over land. Those are not a more accurate way of getting a position; they are a way of not needing one. Both are superb and they are answers to different questions, and the Pacific answer is in some ways the harder and better engineering, because it degrades gracefully and a chronometer does not.`
        },
        {
          id: 'instruments',
          text: `Nothing much — they did find the islands, after all, and that is the test that matters.`,
          verdict: `They did, and it is a real achievement that was doubted for a long time on bad grounds, so the instinct to defend it is sound. But notice what the sentence smuggles in: the word "accurate". Accuracy is a number against a standard, and arriving at an island is not a number — it is a yes. If you press the comparison into numbers, the Pacific system's position error at mid-passage was certainly large, in the hundreds of miles of longitude like everybody else's, because it was integrating a tally like everybody else's. What it had instead was a landfall technique that did not need the number to be small, and that is a different and arguably better kind of answer.`
        },
        {
          id: 'both',
          text: `It is unfair to Europeans, who also found islands without instruments for centuries.`,
          verdict: `True, and worth saying — the Norse reached Greenland and Vinland by holding a latitude, Mediterranean pilots worked by written sailing directions and lead lines long before anyone had a usable instrument, and the whole of the fifteenth century is dead reckoning. But it is a tu quoque rather than an answer: it corrects the comparison's facts while accepting its frame, which is that traditions can be ranked on one scale. The useful move is to ask what each tradition was trying to produce. One wanted a position; the other wanted an arrival; and the second need not be smaller than the first.`
        }
      ]
    },
    open: {
      question: `If the east-west problem was genuinely unsolvable for everyone, how did anybody get anywhere at all?`,
      placeholder: `If you cannot know how far east you are, then…`,
      reveal: [
        `By refusing to need it. Every tradition in this course arranged its voyages so that the unknown quantity did not have to be known — which is yesterday's lesson at the scale of an ocean. You steer for the parallel rather than the port. You aim for a screen of islands rather than one island. You use the birds, which fly out a known distance in the morning and back at dusk, to turn "somewhere within a hundred miles" into "that way". You read the swell, which bends round land you cannot see. You use the smell of smoke and the colour of the water. None of that gives you a longitude, and all of it gives you an arrival.`,
        `And when it failed, it failed the way Lesson 24 said it would. Fleets were lost on coasts they thought were still ahead of them; the Pacific has islands that were settled once and never found again. The honest summary of three thousand years of navigation is that people got extremely good at the half of the problem that could be observed, extremely resourceful about not needing the other half, and paid for the remainder in ships. Then somebody built a clock.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-18',
        label: `Navigation, Lesson 18 — the stars and latitude`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, and this one is about how you think rather than what you know.`,
    prompt: `Which tradition in this course has stayed with you, and why that one? And has anything in the last twenty-eight lessons changed what you assume when you meet an unfamiliar way of doing something?`,
    placeholder: `The one I keep thinking about is…`,
    mapFooter: `Twenty-eight lessons. One asymmetry, explaining three thousand years of other people's work.`,
    tomorrow: `Tomorrow it is your journey. Eight and a half miles, a thousand feet of climb, and a pencil — and the question of where in the day to spend one minute taking a fix, which turns out to be worth nine times as much at one end of the walk as at the other.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Your compass is an absolute instrument and your pace count is an accumulated one, and you have been feeling the difference since Week 2 without naming it. Read the compass badly once and the next reading is unaffected; count your paces badly once and the mistake is in the total for the rest of the day. That is exactly the latitude-and-longitude asymmetry in your two hands. And notice which one you check more often: nobody re-reads a bearing they have just taken, and everybody who is any good re-counts.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Draw, on any chart, the honest uncertainty of a ship twenty days out before 1760. You cannot draw a circle. You must draw a long thin box: a few miles tall, because every clear night re-establishes the parallel, and a hundred miles wide, because nothing re-establishes the meridian. Now draw the same box for a ship with a chronometer and it becomes nearly square. That change of shape — from a stripe to a blob — is the entire difference the eighteenth century made, and it is visible on the chart before any number is quoted.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Go and look at the fuel gauge and the trip meter on a car. One of them tells you something true about now and tells it crudely; the other tells you something precise about a total that nobody has checked since the last reset. You already know, without being taught, that you plan with the trip meter and decide with the gauge, and that when they disagree you believe the gauge. Every navigator in this course ran that same pair of instruments: a tally they trusted for precision and a sight they trusted for truth.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `Ignore the numbers on the graph and look only at the slopes. One line is flat and the others climb. That is the whole lesson in one picture, and it is the reason the four preset kits do such different things: the first three presets pull the flat line downward and leave the slopes alone, and only the last one changes a slope. If you remember nothing else from this lesson, remember that a better instrument moves a level and only a clock changes a gradient.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `A ship leaves the Canaries on the first of the month with a good sextant and no clock. On the third she measures the noon Sun and is on the parallel of 20° N, within two miles. On the thirtieth she measures it again and is on the parallel of 20° N, within two miles — the same two miles, not twenty-eight days' worth. Meanwhile her longitude has come entirely from the log line and the compass: three per cent of three thousand miles is ninety miles of accumulated error, and she has no way whatever of checking it. The captain's answer is Lesson 27's: do not steer for Barbados, steer for its parallel, then turn west and run until something appears.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Four questions you can ask of any tradition in this course, and they will take you further than remembering its name. One: what did it treat as the thing that stays still? Two: what could it actually measure against that thing? Three: what did it have to tot up instead, and what did that cost it over a long journey? Four: what did it do when the fixed thing was unavailable? Nearly every tradition answers the fourth the same way, and the answer is dead reckoning, which is why Week 5 is the universal week of this course.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start with the fact that needs explaining: the longitude problem was solved by a Yorkshire joiner who made clocks, and not by any navigator, cartographer, admiral or astronomer. Work backwards from that and the shape of the whole subject falls out. If the obstacle had been observation, an astronomer would have cleared it. If it had been plotting or seamanship, a navigator would have. If it had been the shape of the Earth, a cartographer. It was none of those, because it was the problem of keeping one number steady for six months on a moving deck — and that is a craft problem about brass and oil and friction. The history is the proof of the diagnosis.`
    }
  ],

  map: [
    { name: `Absolute and accumulated quantities`, level: 4, fresh: true },
    { name: `Drift`, level: 4, fresh: true },
    { name: `The lunar distance penalty`, level: 3, fresh: true },
    { name: `Latitude sailing`, level: 4 },
    { name: `Longitude`, level: 5 },
    { name: `Latitude`, level: 5 },
    { name: `Carrying the time`, level: 5 },
    { name: `Dead reckoning`, level: 5 },
    { name: `Aiming off`, level: 4 },
    { name: `The stars and latitude`, level: 5 },
    { name: `Random and systematic error`, level: 5 },
    { name: `Knowing a method's limits`, level: 5 }
  ]
}
