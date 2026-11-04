// Navigation · Week 3 · Lesson 11 — why the Sun appears to move
//
// The brief (Week 3, "Why the Sun Appears to Move") asks for Earth's rotation,
// the Sun's apparent movement, and east, west and the daily path. The
// misconception to kill is the one everybody is taught and nobody checks: that
// the Sun rises in the east and sets in the west. It does that twice a year.
//
// Every figure below came out of the simulation, which computes from
// src/lib/sun.js — NOAA's algorithm, checked against published sunrise, noon
// and sunset times for Columbus and Sydney in src/__tests__/sun.test.js.
// Measured at Columbus (39.96 N, 83.00 W) before any of this was written:
//
//              sunrise bearing   noon altitude   daylight
//   21 June         058°             73.5°        15.0 h
//   20 March        089°             50.1°        12.1 h
//   21 December     120°             26.6°         9.3 h
//
// So the rising point swings 62° across the year — nearly a quarter of the
// horizon — and only passes through due east on its way between the two.
//
// At Quito the same swing is 067° to 113°, symmetrical about east, with 12.1
// hours of daylight on all three dates. At Utqiagvik the Sun does not rise or
// set at all on either solstice, which is why the lesson cannot say "every
// day" about any of this.

export default {
  id: 'lesson-11',
  number: 1,
  week: 3,
  title: `Why the Sun appears to move`,
  openingQuestion: `Which way does the Sun come up?`,
  concept: `The Sun's path is a place-and-date, not a rule`,

  fieldGuide: {
    chapter: 4,
    title: `The Sun as a Compass`,
    exercise: `Watch one sunrise or sunset from a fixed spot — a window, a doorway, a gatepost — and mark where on the skyline it happens. Go back a month later and mark it again. The gap between the two marks is this lesson, at full size, on your own horizon.`
  },

  see: {
    voice: 'professor',
    line: `Everyone knows the Sun rises in the east. Set the date to December and look at where it actually comes up.`,
    simulation: { id: 'sun-path' },
    observations: [
      { text: `On 21 June at Columbus it rises on **058°** — thirty-two degrees north of east. On 21 December it rises on **120°** — thirty degrees south of east. That is a swing of sixty-two degrees, a quarter of the horizon, from the same window.` },
      { text: `It is only on the equinox that it rises within a degree of due east. Twice a year the saying is true, and the rest of the year it is a direction you have not checked.` },
      { text: `Stand in Utqiagvik on 21 June and the track never touches the rim. It does not rise, because it never set. "Every day the Sun rises" is a sentence about where you happen to live.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The first is the only one that is really about the Sun.`,
    sentences: [
      `The Sun is not going anywhere. **You are turning**, once a day, and the Sun's march across your sky is you rotating underneath it. This is why the daily motion is the same for everyone and so reliable you can set a clock by it.`,
      `But the Earth's axis is **tilted 23.4° from its orbit**, and that tilt does not swing round to follow the Sun. So through the year the Sun stands further north of the equator, then further south, by up to 23.4° either way. That number — where the Sun is standing today — is called its **declination**, and it is the one thing in this lesson that changes.`,
      `Your latitude and the Sun's declination together fix everything you can see: where it comes up, how high it gets, how long it stays. At Columbus the noon Sun is **73.5°** up in June and **26.6°** in December, because 90 − 40 + 23.4 and 90 − 40 − 23.4 are the only arithmetic involved.`
    ],
    comparison: {
      label: `A RECORD ON A TURNTABLE`,
      body: `Put a record on and watch one point on the label. It goes round once per turn, dead regular — that is the day, and it is the Earth turning. Now tip the whole turntable a little and slide it slowly round the room past a lamp. The point still goes round at the same rate, but the lamp catches it higher on some circuits and lower on others, and the part of its circle that is lit gets longer and shorter. That slow second motion is the year. Nothing about the spin changed; what changed is where the lamp is relative to the tilt.`
    },
    naming: `Two things worth having straight before the next lesson. First, **solar noon** is not twelve o'clock — it is the moment the Sun crosses your meridian and stands due south (due north, south of the equator), and at Columbus on 21 June that moment is **1:34 pm** on the clock. Second, the Sun is due south at that moment whatever the date, so the noon Sun is the most dependable direction in the sky. It is Lesson 12's whole business.`,
    formalNames: {
      terms: [
        { term: `Declination (of the Sun)`, meaning: `How far north or south of the equator the Sun is standing today: 0° at the equinoxes, +23.4° on 21 June, −23.4° on 21 December. The same word as a star's declination, and no relation at all to the magnetic declination of Lesson 7.` },
        { term: `Altitude`, meaning: `How high something is above the horizon, in degrees. 0° on the horizon, 90° straight overhead.` },
        { term: `Azimuth`, meaning: `Its direction, as a bearing clockwise from north — the same three-digit number Lesson 8 taught you to read off a compass.` },
        { term: `Zenith`, meaning: `The point straight overhead. The centre of the simulation's circle.` },
        { term: `Solar noon`, meaning: `The moment the Sun crosses your meridian and is at its highest. Also called local apparent noon, or transit.` },
        { term: `Meridian`, meaning: `The line of longitude you are standing on, carried up over your head from due north to due south.` },
        { term: `Solstice`, meaning: `The two days a year when the Sun's declination stops changing and turns back — around 21 June and 21 December. The word means "Sun stands still".` },
        { term: `Equinox`, meaning: `The two days the Sun's declination passes through zero, around 20 March and 22 September, when it rises close to due east everywhere on Earth.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `You have been living with this your whole life. Which of these have you noticed?`,
    items: [
      `The sun blinding me on the same commute only in certain months.`,
      `A room that gets sun in winter and none in summer.`,
      `Solar panels mounted facing south, at an angle.`,
      `"The sun's in my eyes" at 5pm in October but not in July.`,
      `Houseplants on a windowsill leaning a different way by season.`,
      `Sunset over the ocean in summer but over the headland in winter.`
    ],
    ownPlaceholder: `Somewhere you've noticed the sun arriving in a different place…`,
    synthesis: `Every one of those is you noticing the Sun's declination without a word for it. The commute is the giveaway: the road did not move, and neither did the Sun's daily circuit — what moved is where that circuit sits on your horizon.`,
    builder: {
      body: `Find a window you pass every day and a mark you cannot move — the corner of a building, a particular tree. Note today's date and where the Sun is relative to that mark at a fixed time, say 5pm. Write it on the window frame in pencil. Do it again in a month. You will have measured the Earth's axial tilt with a pencil, which is more or less how everyone found out.`
    },
    acrossCultures: {
      place: `ALEXANDRIA AND SYENE, ABOUT 240 BCE`,
      label: `PLAUSIBLE BUT UNCERTAIN`,
      paragraphs: [
        `Eratosthenes, the librarian at Alexandria, is said to have measured the size of the Earth from shadows. The account we have says he knew that at Syene, far to the south, the midsummer noon Sun stood directly overhead and lit the bottom of a well; at Alexandria on the same day a vertical pole still cast a shadow, about a fiftieth of a full circle. If the Sun is far enough away that its rays arrive parallel, that angle is the angle between the two places on a curved Earth, and the distance between them is a fiftieth of the way round.`,
        `The method is sound and anyone can repeat it, which is why it has survived in every textbook. What is striking for this lesson is that it works only because of the facts above: Syene sits close to the Tropic of Cancer, so the Sun stands overhead there on one particular day of the year and no other. The measurement is an application of the Sun's declination, made by someone who had no idea the Earth went round anything.`
      ],
      uncertain: `We do not have Eratosthenes' own account — the familiar version comes from Cleomedes, writing perhaps three centuries later, and he is summarising. How accurate the result was cannot be settled, because nobody knows exactly how long his stade was; estimates of his error range from under two per cent to about sixteen, depending on which stade you choose, and the well at Syene may be a storyteller's detail rather than a record of what he did.`,
      sources: `Cleomedes, *On the Circular Motions of the Celestial Bodies*, I.7, translated in Bowen and Todd, *Cleomedes' Lectures on Astronomy* (2004); Dutka, "Eratosthenes' Measurement of the Earth Reconsidered," *Archive for History of Exact Sciences* (1993).`
    }
  },

  feynman: {
    line: `Your turn. A ten-year-old, and no diagrams.`,
    instruction: `Explain to someone why the Sun does not come up in the same place every morning — and why, if they stood on the equator, they would see something different from what you see.`,
    banned: ['tilt', 'axis', 'declination'],
    bannedNote: `These three are the labels, and a label is not an explanation. "It's because of the tilt" is a sentence that can be said by someone who could not draw it. Describe what leans, what it leans relative to, and what stays the same as the Earth goes round.`,
    placeholder: `The Sun doesn't actually move much. What moves is…`,
    checks: [
      `It says clearly that the daily motion is the Earth turning, not the Sun travelling.`,
      `It explains the yearly change by the Earth leaning, and says that the lean does not swing round to follow the Sun — and not by the Earth being nearer or further away.`,
      `It gives at least one number — a bearing, an altitude or a count of hours — rather than only "higher" and "lower".`,
      `It says what would be different at another latitude, and why.`
    ],
    closing: `If you wrote that the seasons come from the Earth's distance to the Sun, go back to SEE IT and set the date to December with Quito selected. The Earth is at its closest in early January.`
  },

  challenge: {
    voice: 'editor',
    line: `One prediction, then one question I cannot answer for you.`,
    prediction: {
      question: `You are in Columbus. You want to know which way is north, and it is 1:34 pm on 21 June — solar noon. Where do you look?`,
      options: [
        {
          id: 'shadow',
          text: `At your own shadow: it is pointing nearly due north.`,
          verdict: `Right, and this is the whole of tomorrow's lesson. At solar noon the Sun is due south of you at Columbus, so anything it lights throws its shadow due north. No instrument, no declination arithmetic, and no needle to be wrong.`
        },
        {
          id: 'sun',
          text: `At the Sun: it is due south, so north is behind you.`,
          verdict: `Also right, and the same fact — but do not look at the Sun. The shadow is the same information delivered at your feet, and it is free.`
        },
        {
          id: 'east',
          text: `You cannot tell. The Sun is only a reliable direction at sunrise.`,
          verdict: `Backwards, and worth sitting with. Sunrise is the LEAST reliable moment: that is the one that moved sixty-two degrees across the year. Noon is the most reliable, because the Sun crosses your meridian every single day of the year, in every season, at every latitude.`
        }
      ]
    },
    open: {
      question: `At Quito, on all three dates in the simulation, the day is 12.1 hours long. Why 12.1 and not exactly 12?`,
      placeholder: `If the Sun were a point and the air did nothing…`,
      reveal: [
        `Two reasons, and both are about the definition rather than the astronomy. Sunrise is counted from the moment the Sun's **upper edge** appears, not its centre, which buys you a couple of minutes at each end. And the atmosphere **refracts** light over the horizon, so you see the Sun while it is still geometrically below it — worth about half a degree, which is more than the Sun's own width.`,
        `Together those add roughly six to eight minutes to the day at the equator, every day of the year. It is a good reminder that a measurement is only ever as sharp as the definition underneath it — and that "twelve hours of day and twelve of night" is a description of a geometrical idealisation, not of any day you have ever lived through.`
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
    line: `Two minutes, and then the week has started properly.`,
    prompt: `Before today, if someone had asked you which way the Sun comes up, what would you have said? Write the answer you would have given, and then write what you would add to it now.`,
    placeholder: `I would have said…`,
    mapFooter: `Week 3 is the oldest instrument there is. You have just learned to read its face.`,
    tomorrow: `Tomorrow: a stick in the ground, and the shadow it throws. It turns out that the shortest shadow of the day is a line pointing at the true pole — and you can find it without knowing the time.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Think of the horizon as the rim of a compass rose you are standing in the middle of. Sunrise is a bearing on that rose, like any other: 058 in June, 089 at the equinox, 120 in December. Nothing mystical is happening — the Sun is coming up on a different bearing, and bearings are the thing you have spent a week learning to read. The one difference from Lesson 8 is that this bearing is a TRUE bearing already. No declination to add. The sky does not care about iron.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Take a map and draw a line due east from where you live. That is the line the Sun rises on twice a year. Now draw two more lines from the same point, one 32° to the north of it and one 30° to the south: those are the midsummer and midwinter sunrises at Columbus's latitude. The wedge between them is everywhere on your horizon the Sun has ever come up. It is much wider than people expect, and that is the lesson.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Hold an orange with a knitting needle through it, tilted. The needle is the axis. Spin the orange: that is a day, and one spot on it faces the lamp and then faces away. Now, keeping the needle pointing the SAME way in the room, walk the orange in a big circle around the lamp. Half way round, the end of the needle that was leaning towards the lamp is leaning away. You have not changed the tilt once. That is the whole year.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `The simulation IS the diagram, and it is worth knowing how to read it. The outer circle is your horizon, all the way round. The centre is straight overhead. The orange curve is the Sun's whole day. Where the curve touches the rim is where it rises and sets; how close the curve gets to the centre is how high it gets at noon. Switch between the three dates and watch two things change together: the curve's ends slide along the rim, and the whole arc moves nearer or further from the centre.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `Columbus, 21 December. Your latitude is 40° north. The Sun's declination that day is −23.4°, meaning it is standing 23.4° south of the equator. The angle between you and it is 40 + 23.4 = 63.4°. Straight overhead is 90°, so at noon the Sun is 90 − 63.4 = **26.6°** above your southern horizon — about the height of your thumb at arm's length, three times over. Now do June: the Sun is 23.4° north of the equator, so the gap is 40 − 23.4 = 16.6°, and the noon Sun stands 90 − 16.6 = **73.4°** up, nearly overhead. Two subtractions, and they are the difference between summer and winter.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Three questions, in order. One: does the Earth turn? Yes, once a day — that gives you sunrise, noon and sunset in that order, every day, everywhere. Two: is the Earth's axis straight up relative to its orbit? No, it leans 23.4°, and it keeps leaning the same way all year. Three: if the axis leans the same way all year, what changes as you go round? Which side of the Sun you are on. That is the whole mechanism, and the rest is arithmetic.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from the answer: at Columbus on 21 December the Sun rises on 120°, which is well south of east, and it only gets 26.6° up. Why would it rise south of east? Because it spends that whole day south of the equator, so its circle is tilted away from you and the lit part of it sits in your southern sky. Why does it spend the day south of the equator? Because the Earth's axis leans away from the Sun in December. Why does it lean away in December and towards it in June? It does not change its lean at all — you went round to the other side.`
    }
  ],

  map: [
    { name: `The Sun's daily path`, level: 3 },
    { name: `Solar declination`, level: 2 },
    { name: `Solar noon`, level: 2 },
    { name: `Altitude and azimuth`, level: 3 },
    { name: `Map and compass together`, level: 4 },
    { name: `Converting a bearing`, level: 5 },
    { name: `Taking a bearing`, level: 5 },
    { name: `Following a bearing`, level: 4 },
    { name: `Declination`, level: 5 },
    { name: `True, magnetic & grid north`, level: 4 },
    { name: `Magnetic field`, level: 4 },
    { name: `Direction vs. position`, level: 5 },
    { name: `Position`, level: 5 }
  ]
}
