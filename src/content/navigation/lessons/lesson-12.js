// Navigation · Week 3 · Lesson 12 — the shadow knows
//
// The brief (Week 3, "The Shadow Knows") asks why shadows change direction and
// length, and what a vertical stick shows. This lesson does NOT teach the two
// finding-direction methods — that is Lesson 13, and the Field Guide's Chapter
// 5 asks for them to be taught separately. Here the learner only watches.
//
// The one fact to land: the shortest shadow of the day points at the true
// pole. Not approximately, and not only in summer — the Sun crosses your
// meridian every day of the year, so the shortest shadow is a true north–south
// line on every one of them.
//
// Measured off the simulation before writing, at Columbus. Lengths are in
// stick-heights, bearings are where the shadow points:
//
//                      4h before      2h before    noon     2h after
//   21 June          1.31L / 269°   0.58L / 294°  0.30L/360°  0.58L / 066°
//   21 December      —              2.65L / 331°  2.00L/360°  2.64L / 029°
//   20 March (3h)    1.55L / 303°                 0.84L/360°  1.55L / 057°
//
// Two things in that table are worth the lesson's time. The bearing at noon is
// 360 in every row — that is the claim, and it is exact. And the length at
// noon changes by a factor of nearly seven between June and December, which is
// the same tilt from Lesson 11 seen from underneath.

export default {
  id: 'lesson-12',
  number: 2,
  week: 3,
  title: `The shadow knows`,
  openingQuestion: `What is the shortest your shadow gets today?`,
  concept: `The shortest shadow is a true north line`,

  fieldGuide: {
    chapter: 5,
    title: `The Shadow Stick Method`,
    exercise: `Push a straight stick into level ground, upright. Every twenty minutes for two hours either side of midday, put a pebble at the very tip of its shadow. You will end the afternoon with a curved line of pebbles and one of them closest to the stick. That one is on your true north–south line.`
  },

  see: {
    voice: 'professor',
    line: `A stick in the ground, and nothing else. Move through the day and watch two things at once — which way the shadow lies, and how long it is.`,
    simulation: { id: 'shadow-stick', props: { mode: 'watch' } },
    observations: [
      { text: `The shadow swings from west, through north, to east — the opposite way round from the Sun, because a shadow is thrown away from the light. In the morning it is behind you to the west; by evening it has crossed to the east.` },
      { text: `It is shortest at solar noon, and at that moment it points **360°** — true north — on every date in the simulation. That is not a coincidence or an approximation. The Sun crosses your meridian once a day, every day.` },
      { text: `The length is a different story entirely. At noon on 21 June it is **0.30** times the height of the stick; on 21 December it is **2.00**. Same stick, same ground, nearly seven times the shadow.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The third one is the one worth money.`,
    sentences: [
      `A shadow points **exactly opposite the Sun**. That is the whole mechanism: if you know where the shadow is, you know where the Sun is, and you did not have to look at it. It is also the only measurement in this course you can take with your eyes shut, by feeling for where the warmth is not.`,
      `Its **length depends only on how high the Sun is** — a stick one unit tall throws a shadow 1/tan(altitude) long. At 73.5° that is 0.30; at 26.6° it is 2.00; at 10° it is 5.7, and at sunset it is the length of the county. This is why the method stops working at the ends of the day.`,
      `And because the Sun crosses your meridian at solar noon, the **shortest shadow of the day lies along true north–south**. You have been handed a true bearing by a stick. No needle, no declination, nothing to go wrong except your patience.`
    ],
    comparison: {
      label: `A TORCH AND A PENCIL`,
      body: `Stand a pencil on a table and walk round it with a torch held low. The shadow sweeps round the table opposite you — that is the day. Now, without moving your feet, lift the torch higher: the shadow shortens, and it shortens fastest when the torch is already high. Drop the torch towards the tabletop and the shadow stretches off the edge of the table. Nothing about the pencil changed. You have just done the whole of the second sentence with a kitchen torch.`
    },
    naming: `A warning the Field Guide asks for in this chapter and the next, and it belongs here. This method gives you **true** north, because the Sun is not magnetic. Your compass gives you **magnetic** north, because it is. At Columbus those two differ by 7.2°, which Lesson 7 measured and Lesson 15 will use. Do not reconcile them by assuming one is broken.`,
    formalNames: {
      terms: [
        { term: `Gnomon`, meaning: `The thing that casts the shadow — the stick, the pin on a sundial, the obelisk. From the Greek for "one that knows".` },
        { term: `Shadow plane`, meaning: `The upright plane containing the Sun and the gnomon. The shadow is where it meets the ground, which is why a shadow is straight on flat ground and bent on a hill.` },
        { term: `Noon line`, meaning: `The true north–south line through the gnomon's base, found by the shortest shadow. Also called the meridian line.` },
        { term: `Shadow length ratio`, meaning: `The shadow divided by the height of what cast it. 1/tan(altitude), and it is the same for a stick, a tree or a church, so you can take the Sun's height off any of them.` },
        { term: `Shadow tip`, meaning: `The end of the shadow — the part you actually mark, because the base never moves.` },
        { term: `Culmination`, meaning: `The moment something crosses your meridian and is at its highest. Solar noon is the Sun's culmination.` },
        { term: `Equal shadows`, meaning: `Two moments, one before noon and one after, at which the shadow is the same length. The basis of tomorrow's good method.` },
        { term: `Vertical`, meaning: `Not "upright-looking". Use a plumb line — a weight on a string. A stick leaning two degrees puts two degrees into every reading you take off it.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Shadows are doing this everywhere you look. Which of these have you actually seen?`,
    items: [
      `My shadow being absurdly long walking home in winter.`,
      `A sundial in a park or a garden.`,
      `Working out where to sit so a parasol still covers the table in an hour.`,
      `Buildings casting shade across a street at some hours and not others.`,
      `A photographer waiting for "golden hour" — long shadows, low sun.`,
      `Choosing which side of the car to park on so it isn't an oven at 3pm.`
    ],
    ownPlaceholder: `A time a shadow told you something you needed to know…`,
    synthesis: `Every one of those is you reading the Sun's altitude off a shadow without saying so. The parasol one is the sharpest: you were not predicting the shadow's length, you were predicting its direction two hours ahead, which means you already know the Sun goes one way round and not the other.`,
    builder: {
      body: `You need twenty minutes and a sunny day. Stand a stick upright in level ground — check it with a plumb line, a key on a shoelace will do. Mark the tip of its shadow with a stone, wait, mark it again. Keep going for an hour. Now look at the line of stones: it curves, and it has a closest point. Everything in tomorrow's lesson is about what you are allowed to conclude from those stones.`
    },
    acrossCultures: {
      place: `DENGFENG, CHINA, 1276`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Under Kublai Khan, the astronomer Guo Shoujing built an observatory at Dengfeng in Henan whose central instrument is a gnomon and a long stone scale laid out flat on the ground to catch its noon shadow. The point of it was precision: a typical Chinese gnomon of the period stood about 8 *chi* tall, and Guo's stands **40 *chi***, five times the height, because a taller gnomon throws a longer shadow and a longer shadow can be divided more finely.`,
        `A tall gnomon has a problem, though — the edge of a long shadow is blurred, because the Sun is a disc and not a point. The answer at Dengfeng was a sighting device with a pinhole that projected a sharp image of the Sun onto the scale rather than relying on the fuzzy edge of the shade. The observations fed the *Shoushi* calendar of 1281, which put the length of the year at 365.2425 days — the same figure Europe adopted in the Gregorian reform three centuries later.`
      ],
      uncertain: `The building survives and so does the scale, but published figures for its dimensions differ — the stone scale is variously given as about 31 metres long, and secondary accounts sometimes convert *chi* to feet and quietly change the instrument's size by a third. How much of the design was Guo Shoujing's own, rather than inherited from a long Chinese gnomon tradition or informed by the Persian and Arabic astronomy circulating in the Yuan court, is genuinely hard to apportion.`,
      sources: `Needham, *Science and Civilisation in China*, vol. 3 (1959); Sivin, *Granting the Seasons: The Chinese Astronomical Reform of 1280* (2009).`
    }
  },

  feynman: {
    line: `Explain it to someone holding a stick.`,
    instruction: `Tell someone how to find true north with a stick, a sunny afternoon and no instruments — and tell them why it is the SHORTEST shadow that matters rather than the first one or the longest.`,
    banned: ['sundial', 'gnomon', 'compass'],
    bannedNote: `The first two let you point at an object instead of explaining one, and the third is the instrument this method exists to do without. If your explanation needs a compass in it, it is not this method.`,
    placeholder: `Push the stick in the ground, and then…`,
    checks: [
      `It says the shadow falls opposite the Sun, so the shadow is a measurement of where the Sun is.`,
      `It connects "shortest shadow" to "Sun at its highest" and then to "Sun due south".`,
      `It mentions that the stick must be vertical, and says how to check.`,
      `It is honest that this gives true north, not magnetic north.`
    ],
    closing: `If your explanation needed a watch, read it again. Nothing above requires knowing what time it is — the shadow tells you when noon was.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction, and then something the simulation will not tell you.`,
    prediction: {
      question: `You mark the shadow tip every twenty minutes all afternoon on 21 December in Columbus. What shape is the line of marks?`,
      options: [
        {
          id: 'curve',
          text: `A curve, bending away from the stick.`,
          verdict: `Right. The tip traces a conic section — a hyperbola, on any day but the equinoxes — and it bends away from the stick because the shadow is shortest at noon and lengthens in both directions. That curvature is not a detail: it is exactly what defeats the crude method in tomorrow's lesson.`
        },
        {
          id: 'straight',
          text: `A straight line running roughly east–west.`,
          verdict: `That is the answer the folklore gives, and it is true on exactly two days a year. At the equinoxes the Sun's declination is zero and the tip really does run dead straight. On 21 December it does not, and tomorrow you will measure how much it does not.`
        },
        {
          id: 'circle',
          text: `An arc of a circle centred on the stick.`,
          verdict: `No — a circle would mean the shadow stays the same length all afternoon, which would mean the Sun stays at the same altitude all afternoon. Two marks the same distance from the stick is the basis of a good method precisely because it happens only twice in a day.`
        }
      ]
    },
    open: {
      question: `The shortest shadow points true north at Columbus. Would it do the same thing in Quito, on the equator?`,
      placeholder: `At noon in Quito the Sun would be…`,
      reveal: [
        `It points along the true north–south line in Quito as well, but which END of that line it points at depends on the date. Quito sits just south of the equator, so from March to September the noon Sun stands north of it and the noon shadow falls **south**; from September to March the Sun is south and the shadow falls **north**. Twice a year, when the Sun passes overhead, there is no noon shadow at all.`,
        `So the rule that survives everywhere is the weaker and more useful one: the shortest shadow lies **along** your meridian. Whether it points to the north pole or the south one is a question about your latitude and today's date, and the answer flips. A method that tells you a line is worth more than a method that tells you a direction, because the line is true for everyone.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-11',
        label: `Navigation, Lesson 11 — why the Sun appears to move`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `A stick in the ground gave you a true bearing, and a compass cannot. Write down what the compass is still better at — there is more than one answer, and tomorrow goes badly if you think the stick has replaced it.`,
    placeholder: `The compass is still better when…`,
    mapFooter: `You can now get true north out of a stick. Tomorrow: how wrong the usual shortcut is.`,
    tomorrow: `Tomorrow: the Field Guide gives two ways to turn those marks into an east–west line. One of them is thirty degrees wrong on a December afternoon, and we are going to measure exactly when it fails.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Your compass needle is an arrow lying along a field. The shadow is an arrow lying along a beam of light. Both are instruments in the sense that matters: something in the world lines them up and you read them. The difference is what they answer to. The needle answers to the Earth's iron core and to the belt buckle in your pocket. The shadow answers to the Sun, which no magnet has ever disturbed — so where they disagree, you have learned something about your compass rather than about the sky.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `A map's north–south grid lines are meridians, more or less — lines running to the pole. Solar noon is the moment the Sun crosses YOUR meridian, the one through your own feet. So at that instant the Sun, your stick, its shadow and the map's north line are all in the same vertical plane. Mark the shadow and you have drawn one of the map's lines on the actual ground. That is why the noon shadow is worth waiting for: it is the map's own geometry, delivered to your boots.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Use a pen and a desk lamp. Stand the pen in a lump of putty. Hold the lamp low and to one side: long shadow. Raise the lamp towards the ceiling, keeping it on the same side: the shadow shortens but keeps its direction. Now swing the lamp round in an arc that rises, peaks, and falls — the shadow swings round the other way, pulling in to its shortest just as the lamp passes its highest point. That moment is solar noon, and the shadow at that instant is your noon line.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `In the simulation, the black dot is the stick seen from above and the grey curve is where the tip goes all day. Look at the curve, not the shadow. It comes in from the west, bends round, reaches its closest approach to the stick, and goes out to the east. The closest point of the curve is noon, and the straight line from the stick to that point is true north. Everything else in this week is an argument about how to find that closest point without standing there all day.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `21 December, Columbus, a stick one metre tall. At noon the Sun is 26.6° up, so the shadow is 1/tan(26.6°) = **2.00 m** long, pointing due north. Two hours later the Sun has dropped to 20.7°, so the shadow is 1/tan(20.7°) = **2.65 m**, and it has swung round to 029°. Two hours is 30° of the Earth's rotation, but the shadow only moved 29.4° — because the Sun's circle is tilted relative to your horizon, those two angles are not the same, and that mismatch is the subject of tomorrow.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Four steps, each true on its own. One: a shadow falls directly away from the light. Two: the Sun is highest at solar noon. Three: when the Sun is highest, it is crossing your meridian, which is the north–south line through you. Four: therefore at that moment the shadow lies along your north–south line. If you believe all four, you believe the lesson; if one of them is doing the heavy lifting for you, it is probably the third.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `The answer is: the shortest shadow points true north. Work back. Why would a shadow point north? Because the Sun is due south. When is the Sun due south? When it crosses your meridian. What else is true at that moment? It is as high as it will get all day — it has been climbing and is about to descend. And what does a high Sun do to a shadow? Shortens it. So "shortest" and "due north" are the same instant described twice, which is why you can find a direction by measuring a length.`
    }
  ],

  map: [
    { name: `Shadow direction and length`, level: 3 },
    { name: `The noon line`, level: 3 },
    { name: `The Sun's daily path`, level: 4 },
    { name: `Solar declination`, level: 3 },
    { name: `Solar noon`, level: 4 },
    { name: `Altitude and azimuth`, level: 3 },
    { name: `Converting a bearing`, level: 5 },
    { name: `Taking a bearing`, level: 5 },
    { name: `Declination`, level: 5 },
    { name: `True, magnetic & grid north`, level: 5 },
    { name: `Map and compass together`, level: 4 },
    { name: `Direction vs. position`, level: 5 },
    { name: `Position`, level: 5 }
  ]
}
