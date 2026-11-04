// Navigation · Week 3 · Lesson 15 — building a simple Sun compass
//
// The brief (Week 3, "Building a Simple Sun Compass") asks the learner to
// construct a shadow instrument, record observations, and compare the result
// with a compass. It is the week's review, and the comparison is the point.
//
// The idea the whole lesson turns on: the Sun gives TRUE north directly, and a
// compass gives MAGNETIC north. Lesson 7 had to look declination up from the
// published model, because a dipole picture gets it wrong by ten degrees and
// by its sign. This lesson shows the other way round — with a stick and a
// morning you can MEASURE your own declination, on your own ground, today, and
// check the published figure rather than taking it on trust.
//
// Figures, from the simulation (shadow-stick, mode 'compare') and from Lesson
// 7's looked-up values — NOAA NCEI, World Magnetic Model 2025 at 2026.0:
//
//   Columbus, OH   7.2° west     a needle points 7.2° right of the noon shadow
//   Miami, FL      6.6° west
//   Anchorage, AK 15.5° east     a needle points 15.5° left of it
//
// Sign convention, carried from Lesson 7 and not restated differently here:
//   declination is positive EAST · true = magnetic + declination

export default {
  id: 'lesson-15',
  number: 5,
  week: 3,
  title: `Building a simple Sun compass`,
  openingQuestion: `Can you check your compass without another compass?`,
  concept: `The Sun is the standard your instrument is measured against`,

  fieldGuide: {
    chapter: 4,
    title: `The Sun as a Compass`,
    exercise: `Build the instrument: a board, a vertical pin, a circle drawn round its base, and a morning. Mark where the shadow tip touches the circle, mark where it returns in the afternoon, bisect, and you have true north on a board you can carry. Then lay your compass on it and read off the angle. That angle is your declination, measured rather than looked up.`
  },

  see: {
    voice: 'professor',
    line: `Here is the week's instrument, and here is what happens when you put a compass on top of it.`,
    simulation: { id: 'shadow-stick', props: { mode: 'compare' } },
    observations: [
      { text: `The green line is true north, found from the shadow. The red line is where a compass needle points. In Columbus they differ by **7.2°** — and nothing has gone wrong with either instrument.` },
      { text: `Switch to Anchorage and the needle swings to the other side: **15.5° east**, more than twice as far off and in the opposite direction. The difference is not a property of the compass. It is a property of the ground you are standing on.` },
      { text: `The shadow line is the same in all three places. That is what makes it a standard — the Sun does not have a local value.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences to close the week.`,
    sentences: [
      `A Sun compass is **a record of a measurement, not a sensor**. A magnetic compass senses something continuously and tells you a direction at any instant. A Sun compass is a line you established once, carefully, and then carried with you — on a board, or scratched in the ground, or remembered as "the shed is north of the oak". It is only as good as the moment you made it, and it does not drift.`,
      `Because the Sun is not magnetic, that line is **true north**, not magnetic north. So laying a compass on it measures the angle between them, and that angle is your **magnetic declination** — the quantity Lesson 7 had to go to a published model for. Here you can get it with a stick, which is also how the published model's ground truth was gathered in the first place.`,
      `Which makes the two instruments **a pair rather than rivals**. The compass works at night, in fog, under trees and while you are walking, and the Sun does none of those. The Sun gives you a true bearing with no local correction and nothing to go wrong, and the compass cannot. Use each for what it is good at and check one against the other when you get the chance.`
    ],
    comparison: {
      label: `A TAPE MEASURE AND A SURVEY MARK`,
      body: `A tape measure is quick, portable, and works in the dark; you use it fifty times a day without thinking. A survey mark is a brass disc cemented into the ground by someone who spent a long morning getting it exactly right, and it does not move. You would not carry a survey mark around, and you would not build a bridge off a tape you had never checked against one. The compass is your tape. The noon shadow is your survey mark, and the good news is that you can make a new one any sunny day you like.`
    },
    naming: `One honest limitation, because this course does not sell methods without their conditions. The equal-shadow construction needs the Sun from morning to afternoon — several hours, and a clear sky for the two moments that matter. That is a serious cost in bad weather and under a forest canopy, and it is why nobody is suggesting you throw the compass away. It is why the Field Guide's exercise is written for a clear day on open ground.`,
    formalNames: {
      terms: [
        { term: `Sun compass`, meaning: `Any instrument that gets direction from the Sun. The shadow board here is the simplest; the Second World War desert versions and the Viking disc of the Across Cultures card are the same idea with a dial.` },
        { term: `Declination (magnetic)`, meaning: `The angle between true north and magnetic north where you stand. Positive east. Measured here rather than looked up — the same quantity as Lesson 7's.` },
        { term: `Bisection`, meaning: `Splitting the angle between the two equal-shadow marks in half, which gives the noon line without having to be there at noon.` },
        { term: `Calibration`, meaning: `Checking an instrument against a standard you trust more. That is exactly what laying the compass on the shadow board is.` },
        { term: `Standard`, meaning: `The thing you calibrate against. A standard has to be something that does not vary with where you are — which rules the magnetic field out and rules the Sun in.` },
        { term: `Local attraction`, meaning: `Iron near enough to deflect your needle — a car, a fence, a rifle, a belt buckle. A shadow board will expose it immediately, because the Sun cannot be deflected by a gatepost.` },
        { term: `Secular variation`, meaning: `Declination changing over years. Columbus's is moving about 0.018° a year, so a shadow-board measurement stays good for a long time — but a chart's printed value does not.` },
        { term: `Index error`, meaning: `A constant offset in an instrument — a compass whose needle sits a degree off, or a board whose pin leans. Constant errors are the ones a calibration finds and repeated readings never will.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Checking one instrument against a better one is something you do more than you think.`,
    items: [
      `Setting the oven thermostat by an oven thermometer.`,
      `Checking the bathroom scale by standing on it twice.`,
      `Comparing a watch against the phone, which is on network time.`,
      `Weighing out flour on a scale you know reads a bit heavy.`,
      `A tyre pressure gauge at the garage reading different from your own.`,
      `Measuring a room with a tape and then with a laser.`
    ],
    ownPlaceholder: `Something you check against something else you trust more…`,
    synthesis: `Notice which of those actually works. Standing on the scale twice tells you nothing — repeating a measurement only finds the errors that change. The oven thermometer and the network time work because they bring in something independent, and that is precisely what the shadow does for your compass.`,
    builder: {
      body: `Make the board. A piece of plywood, a nail hammered in upright, a circle drawn round it with string and a pencil. Put it out on level ground mid-morning — check the nail is vertical with a weight on a thread — and mark where the shadow tip crosses the circle. Go back in the afternoon and mark where it crosses again. The line between the marks is east–west; bisect it to the nail and you have true north on a board. Now lay your compass on the board, read the angle between the needle and your line, and compare it with the published declination for your town. If they agree within a degree or two, you have just checked a global geophysical model in your garden.`
    },
    acrossCultures: {
      place: `UUNARTOQ, GREENLAND — AN OBJECT FOUND IN 1948`,
      label: `PLAUSIBLE BUT UNCERTAIN`,
      paragraphs: [
        `In 1948 the archaeologist C. L. Vebæk excavated a fragment of a notched wooden disc at a Benedictine convent site at Uunartoq in Norse Greenland. Roughly half of it survives. It has a central hole, a ring of evenly spaced notches round its rim, and some incised curved lines, and it has been interpreted since the 1950s as a sun compass: a pin in the central hole, the curves being the path the shadow tip takes on particular dates, and the navigator steering so that the shadow tip stays on its line.`,
        `If that reading is right it is the same instrument as the board in the Builder above, at sea, five hundred years before the compass reached northern Europe — and that is exactly why it deserves care. The interpretation is widely repeated with a confidence the evidence does not support.`
      ],
      uncertain: `It is one broken object and the reading of it is contested. A 2013 paper by Bernáth and colleagues argued the incised lines fit a different instrument better — one for finding latitude and local noon rather than for holding a course — partly because the lines stop short of the rim instead of running to it, and the same group later proposed a "twilight board" reading for use with the Sun near the horizon. No gnomon pin was found with the disc, and no second example has turned up. The sun-compass reading remains the common one; it is not the only one, and the artefact cannot settle it.`,
      sources: `Thirslund, *Viking Navigation* (1997); Bernáth, Farkas, Száz, Blahó, Egri, Barta, Åkesson and Horváth, "An alternative interpretation of the Viking sundial artefact," *Proceedings of the Royal Society A* (2013); Vebæk's excavation report in *Meddelelser om Grønland* (1958).`
    }
  },

  feynman: {
    line: `The last explanation of the week.`,
    instruction: `Explain how you would check whether a compass is telling you the truth, using nothing but a stick, a piece of string and a sunny day — and say what result would mean the compass is faulty rather than simply being a compass.`,
    banned: ['gps', 'app', 'just head'],
    bannedNote: `Banned because each one is a way of not answering.`,
    placeholder: `I'd start by finding true north without the compass at all, like this…`,
    checks: [
      `It describes a way of getting true north from the Sun, with enough detail to actually follow.`,
      `It says that a disagreement with the compass is expected, and names it: magnetic declination.`,
      `It gives a figure — the declination where the reader lives, or one from the simulation.`,
      `It says what WOULD indicate a fault: a disagreement much bigger than the local declination, or one that changes when you move the compass near metal.`
    ],
    closing: `That last check is the one that separates this week from a party trick. Knowing the expected disagreement is what lets you recognise an unexpected one.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction, and a question to end the week on.`,
    prediction: {
      question: `You build the board in Columbus and your compass needle sits 19° to the right of your true north line. What is the most likely explanation?`,
      options: [
        {
          id: 'iron',
          text: `There is iron near the compass.`,
          verdict: `Almost certainly. Columbus's declination is 7.2° west, so a needle 19° off is about twelve degrees unaccounted for. Declination does not vary that much over a town. Move twenty paces from the car, take the keys out of your pocket, and read it again — this is exactly the check Lesson 9 warned you would one day need.`
        },
        {
          id: 'declination',
          text: `That is just the declination at Columbus.`,
          verdict: `It is not — the published figure is 7.2° west and it changes by about two hundredths of a degree a year. If your measurement says 19°, the discrepancy is in your surroundings or your construction, and the value of the method is that it tells you so.`
        },
        {
          id: 'board',
          text: `The board was built wrong.`,
          verdict: `Possible and worth checking — a leaning pin or a sloping board will both do it, and so will bisecting by eye. But check for iron first: it is commoner, it is quicker to test, and it is the only one of the two that will follow you to the next reading.`
        }
      ]
    },
    open: {
      question: `This week you have found true north from the Sun, and told the time from a shadow. What have you still not found — and what would you need to find it?`,
      placeholder: `I can get direction and I can get time, but I still can't get…`,
      reveal: [
        `Your position. Direction and time are not a location, and Week 1 made exactly this point about the compass: a bearing tells you which way, never where. The shadow board is a better compass, not a different kind of instrument.`,
        `The way out is in the two things you measured today. The height of the noon Sun, with the date, gives you your **latitude** — that is Week 4, with Polaris standing in for the Sun at night. And the clock time of your local solar noon, compared with the time at a meridian you know, gives you your **longitude** — which is the problem that defeated Europe for two centuries and is Week 6. You already have both measurements in your notebook. What you are missing is a clock you can trust and a reference you can carry.`
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
    line: `The last two minutes of the week.`,
    prompt: `Three weeks ago a compass was an instrument that told you where north was. Write down what you would say it does now, in one sentence, to someone who has never thought about it.`,
    placeholder: `A compass is an instrument that…`,
    mapFooter: `Week 3 complete. You can find true north without any instrument at all — and check the one you own against it.`,
    tomorrow: `Week 4 is not written yet. It takes the same trick into the dark: a turning sky, one star that stays put, and the height of it above your horizon turning out to be your latitude.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Put the two instruments side by side and ask what each one actually knows. The compass knows about the Earth's magnetic field at the point where it sits — including the part of that field contributed by the fence post next to it. The shadow board knows about the Sun, which is 93 million miles away and indifferent to fence posts. That is the entire difference, and it explains both the compass's advantage (it works instantly, anywhere, in any weather) and its weakness (anything magnetic between it and the core is included in the answer).`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Your map's north is true north — grid north, strictly, which Lesson 10 separated out. Your compass's north is magnetic. Every time you move a bearing between the map and the ground you apply a correction between them, and until today you have been taking that correction from a printed value you had no way to check. The shadow board closes the loop: it puts the map's own north on the actual ground in front of you, so you can measure the correction instead of trusting it.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `A kitchen scale and a bag of sugar. The scale is convenient and you use it constantly; the sealed kilogram of sugar is slow and useless for weighing anything except itself, but you know what it weighs. Put the sugar on the scale and you learn the scale's error — once, properly, and the knowledge keeps. You have not replaced the scale with the sugar. You have made the scale worth trusting. The Sun is the bag of sugar.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `In the simulation there are two lines from one point. The green one is where the shadow said north was. The red one is where the needle says north is. The angle between them, labelled in the readout, is the declination — and when you switch place, watch which SIDE the red line moves to. In Columbus the needle sits to the west of true north; in Anchorage it sits to the east. Same instrument, opposite error, and the only thing that changed is the ground beneath it.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `You build the board in Columbus. Mid-morning the shadow tip crosses your circle at one point; mid-afternoon it crosses at another. You join them and bisect to the pin: that bisector is true north, give or take the hundredth of a degree the equal-shadow method costs you. You lay the compass on the board and the needle does not sit on your line: it points **7.2° to the left of it**, which is to say west of true north. By Lesson 7's convention — true equals magnetic plus declination, positive east — magnetic north lying west of true north is a declination of 7.2° **west**, written −7.2°, and that is exactly the published value for Columbus. Take the sign slowly: the needle being west of true north is what "west declination" means, and getting it backwards costs you double, because you then apply the correction the wrong way as well.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Four things, each doable on its own. One: get the pin vertical — a weight on a thread. Two: draw a circle round it. Three: mark the two crossings and join them; that is east–west. Four: bisect to the pin; that is true north. Only after all four is the compass allowed anywhere near the board, and that order matters — if you use the compass to set the board up, you have measured the compass with itself.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from what you want: a number for the declination where you live, that you worked out rather than read. To get it you need the angle between two norths. You have one of them already, from the needle. So the whole problem is getting the other one without using a magnet — which is what the Sun is for. And to get true north from the Sun you need a moment when you know exactly where it is, which is the meridian crossing, which is the shortest shadow, which you can find without a watch by the symmetry of two equal shadows. Each step exists because the one after it needed something.`
    }
  ],

  map: [
    { name: `The Sun compass`, level: 3 },
    { name: `Calibrating an instrument`, level: 3 },
    { name: `Solar time vs clock time`, level: 4 },
    { name: `The equation of time`, level: 3 },
    { name: `The noon line`, level: 5 },
    { name: `Shadow direction and length`, level: 5 },
    { name: `Knowing a method's limits`, level: 4 },
    { name: `The Sun's daily path`, level: 5 },
    { name: `Solar declination`, level: 4 },
    { name: `Declination`, level: 5 },
    { name: `True, magnetic & grid north`, level: 5 },
    { name: `Magnetic interference`, level: 5 },
    { name: `Position`, level: 5 }
  ]
}
