// Navigation · Week 1 · Lesson 5 — putting it together: where am I?
//
// The brief (§3, Week 1) asks for three things: locate a known place from
// coordinates, read a simple map, and a weekly challenge to describe a
// location using coordinates, direction and recognizable landmarks. So the
// Feynman stage IS the weekly challenge, and it asks for all three forms of
// the same answer.
//
// Locate.jsx draws a real quarter-degree of Ohio to true scale. Measured
// before any of this copy was written:
//
//   sheet       40° 10′–16′ N, 83° 00′–10′ W → 6.91 × 8.80 miles
//   1′ latitude  1.151 mi (117.7 px) · 1′ longitude here 0.880 mi (90.0 px)
//               both work out to 102.2 px per mile, so the cells come out
//               taller than wide — longitude is 76% of latitude at 40° N
//   from Camp Heartwood (40° 10′ 30″ N, 83° 04′ 30″ W):
//               Hollow Rock     2.17 mi, bearing 037
//               the stone bridge 3.84 mi, bearing 283
//               the trail junction 4.35 mi, bearing 037
//               Beaver Pond     4.82 mi, bearing 327
//               the fire tower  5.20 mi, bearing 355
//   the camp, Hollow Rock and the trail junction fall on one straight line,
//   which is why two of those bearings are identical — and why the trail runs
//   the way it does
//   sliders step 5″ (169 yards of latitude); a fix counts inside 0.15 mi

export default {
  id: 'lesson-05',
  number: 5,
  week: 1,
  title: `Putting it together: where am I?`,
  openingQuestion: `Four lessons of groundwork, and now the real test. Somebody hands you a map and asks the oldest question in navigation. Where are you — and could you tell another person so that they could find you?`,
  concept: `A position described three ways`,

  see: {
    voice: 'professor',
    line: `Six places, a grid in minutes, and two sliders. Take the tasks in order — find one, then plot one.`,
    simulation: { id: 'locate' },
    observations: [
      { text: `The grid cells are one minute each way — and they are visibly **taller than they are wide**. At 40° N a minute of longitude is 0.88 miles against latitude's 1.15, and the sheet is drawn to true scale.` },
      { text: `Every position came out as **two numbers and a direction**: the fire tower is 5.20 miles from camp on a bearing of 355°, and also 40° 15′ 00″ N, 83° 05′ 00″ W.` },
      { text: `Camp, Hollow Rock and the trail junction share a bearing of 037° — because all three sit on one straight line. That is why the trail runs where it does.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the week is yours.`,
    sentences: [
      `A **position** is a spot; a **direction** is a way of facing; and Lesson 1's lesson was that neither one implies the other. A coordinate is a position and nothing else. A bearing is a direction and nothing else. You need both before you can get anywhere.`,
      `Reading a coordinate off a map is two separate readings: slide along the top edge until you are level with the thing, read the longitude; slide up the side edge, read the latitude. Plotting one is the same two readings run backwards. Nothing more clever than that is happening, and it works on any map with a grid.`,
      `Describing a position to another person means choosing a form they can actually use. **Coordinates** work for anyone holding a map or an instrument. **Bearing and distance** work for anyone holding a compass. **Landmarks** work for anyone with eyes. A navigator carries all three, because the one that fails is never the one you expected.`
    ],
    comparison: {
      label: `GIVING SOMEBODY DIRECTIONS`,
      body: `Think about how you actually tell a stranger where the hardware store is. You almost never give one description — you give three, layered. "It's on Fourth, about half a mile north of here" — that's bearing and distance. "Number 212" — that's a coordinate, in a system of streets and numbers you both agree on. "The brick building with the green awning, opposite the fire station" — those are landmarks. You have been doing all three your whole life without naming them. A map and a compass do not change the method; they only extend its reach past the end of the street.`
    },
    naming: `The three forms are worth holding apart, because they fail differently. A **coordinate** is exact and transferable and completely useless to somebody with no map — hand "40° 12′ N, 83° 03′ W" to a person standing in a field and you have told them nothing they can act on. A **bearing and distance** need a starting point you both agree on, and they accumulate error as you walk. **Landmarks** need daylight, visibility, and a thing that is still there. The practice of navigation is not picking the best one. It is carrying all three and knowing which has just let you down.`,
    formalNames: {
      terms: [
        { term: `Position`, meaning: `Where something is. Two numbers on a grid, or a named place everyone agrees on.` },
        { term: `Bearing`, meaning: `A direction given as degrees clockwise from north, always three digits: 005°, 037°, 355°. Three digits so that nobody reads 37 for 370 or 005 for 50.` },
        { term: `Range`, meaning: `The distance to something. A bearing and a range together give a position, measured from somewhere already known.` },
        { term: `Fix`, meaning: `A position you have established by measurement rather than by guessing. Week 5 does this properly, with bearings to two or three landmarks.` },
        { term: `Grid reference`, meaning: `A position read off the squares printed on a map. Latitude and longitude is one such system; many national map series print a second, simpler one beside it.` },
        { term: `Landmark`, meaning: `Something you can see and identify, and that is still where the map says. A water tower is a good one. A lone tree is not.` },
        { term: `Relative and absolute`, meaning: `"Four miles north of camp" is relative — it needs camp. "40° 15′ N" is absolute — it needs only the Earth. Both are positions; only one survives losing the other party.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Describing where something is, so that somebody else can get there. Which of these have you done?`,
    items: [
      `Telling a driver on the phone which exit to take and what to look for when they get off it.`,
      `Marking a spot on a trail map before setting out, so somebody at home knows the plan.`,
      `Giving a campsite number and a direction from the ranger station, rather than a street address.`,
      `Describing where you left the car in a parking garage — level, row, and the thing you parked beside.`,
      `Reading a tide chart or a fishing report that names a spot by coordinates and by a local name.`,
      `Reporting a hazard — a downed tree, a washed-out trail — to somebody who has to go find it.`
    ],
    builder: {
      body: `This week's field exercise, and it should take twenty minutes. Pick somewhere within a mile of your front door that you can see from a path — a bridge, a bench, a particular tree, the corner of a field. Go there. Write its position down three times: once as coordinates in degrees, minutes and seconds; once as a direction and a distance from your own front door; and once as landmarks only, in a way somebody who has never been to your town could follow. Then hand all three to somebody and watch which one they actually use. Keep this somewhere — you will want it again in Week 2, when the compass turns that middle description into something you can walk.`
    },
    acrossCultures: {
      place: `NORWAY, ICELAND AND GREENLAND`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `The Icelandic *Landnámabók*, in the version preserved in the manuscript *Hauksbók*, contains a set of sailing directions for crossing from Norway to Greenland. They are worth reading as an answer to this lesson's question. The course is given as due west from a named headland in Norway to a named cape in Greenland — a direction and two reference points — and then the writer does something more interesting: he describes what you should see on the way, and how much of it.`,
        `Keep Shetland just barely in sight to the north in clear weather. Pass south of the Faroes so that the sea cuts the mountains halfway up their slopes. Pass far enough south of Iceland to get its seabirds and whales, but not the land. Each of those is a crude latitude measurement dressed as a landmark: how much of an island shows above the horizon tells you how far from it you are, and which birds are about tells you roughly where their colony is. No instrument, no coordinate, and a usable position all the same — the third of this lesson's three descriptions, done by people who had only that one.`
      ],
      uncertain: `*Hauksbók* was written around 1302–10, describing a route sailed some three centuries earlier, so we cannot tell how far the directions reflect ordinary practice at the time of the voyages, one navigator's summary, or a later scholar tidying up. Whether Norse sailors also used instruments is a much weaker question: the "sun-stone" of the sagas and the single wooden fragment sometimes called a bearing-dial are both heavily argued over, and neither is included here.`,
        sources: `*Hauksbók*, ed. Finnur Jónsson (1892–96); Taylor, *The Haven-Finding Art* (1956); Marcus, *The Conquest of the North Atlantic* (1980).`
    },
    ownPlaceholder: `A time I had to tell somebody exactly where something was…`,
    synthesis: `Look at what every one of those has in common: you did not give the position, you gave the position *in a form that person could use*. That choice is the skill. The numbers are the easy part.`
  },

  feynman: {
    line: `This is the week's challenge, and it is the stage that counts. Write it and the week is yours.`,
    instruction: `Pick a real place you can see from somewhere near your home. Describe where it is **three times**: as a coordinate, as a direction and a distance from your front door, and as landmarks only. Write it **without the words "GPS," "phone," or "app"** — the point is the description, not the instrument.`,
    banned: ['gps', 'phone', 'app'],
    bannedNote: `one of those came back — and the description is stronger without it`,
    placeholder: `The place is the old stone bridge on Mill Road. As a coordinate it is…`,
    checks: [
      `The coordinate has both numbers, and each one says which hemisphere — N or S, E or W.`,
      `The direction is a compass direction or a bearing, and the distance carries a unit.`,
      `The landmarks are things a stranger could see and identify, not things only you would recognise.`,
      `Someone who had never been there could use any **one** of the three on its own and still arrive.`
    ],
    closing: `If all three of yours would work on their own, you have finished Week 1 — and you have done the thing every navigator in this course was doing, in whatever words they had.`
  },

  challenge: {
    voice: 'editor',
    line: `One about the map you just read, and one about what a coordinate is really worth.`,
    prediction: {
      question: `On the map in SEE IT, the grid cells are one minute of latitude tall and one minute of longitude wide — and they come out clearly taller than they are wide. Why?`,
      options: [
        {
          id: 'scale',
          text: `Because at this latitude a minute of longitude really is shorter than a minute of latitude, and the map is drawn to true scale.`,
          verdict: `Exactly right, and it is Lesson 3 standing on a map. Here at 40° N a minute of latitude is 1.151 miles and a minute of longitude is 0.880 — about 76% as much. The sheet is drawn at 102 pixels to the mile in both directions, so the cells have to come out taller than wide. If they were square, the map would be lying about east-west distance.`
        },
        {
          id: 'fit',
          text: `Because the mapmaker stretched the sheet to fit the page.`,
          verdict: `That does happen, and it is worth being suspicious of — but not here. Check it against the scale bar: a mile measures the same whether you lay it across the sheet or up it. If the sheet had been stretched to fit, one of those two measurements would have come out wrong. The cells are taller than wide because the ground is that way, not because the paper is.`
        },
        {
          id: 'units',
          text: `Because a minute of longitude is a smaller unit than a minute of latitude.`,
          verdict: `Both are a sixtieth of a degree, so as *angles* they are identical — and that is the thing this week keeps coming back to. What differs is the distance each one buys you, and it differs by where you are standing. On the Equator these cells would be very nearly square: 1.151 miles against 1.152. Here at 40° N the longitude side has shrunk to 0.880. At 60° N it would be half. At the pole, nothing.`
        }
      ]
    },
    open: {
      question: `You tell a friend, "I'm at 40° 12′ N, 83° 03′ W." They are standing right next to you, with no map and nothing in their pocket. Have you told them anything at all?`,
      placeholder: `Not really, because those two numbers only mean something if…`,
      reveal: [
        `Almost nothing — and that is the whole week in one sentence. A coordinate is not a place. It is an *instruction for finding* a place, and it only works for somebody who already has the rest of the apparatus: the Equator to count north from, Greenwich to count west from, and a map or an instrument to count with. Hand those two numbers to a person with a chart and you have told them everything there is to know. Hand them to a person standing in a field and you have told them a riddle.`,
        `This is Lesson 1 arriving where it was always going. A position only means something measured against something else, and a coordinate is the most precise, most transferable, most useless-without-its-system description there is. Which is why the challenge above asks for three. The coordinate is for the person with the map. The bearing and distance are for the person with a compass. The landmarks are for the person with nothing but their eyes — and in the Norse sailing directions you just read, that person crossed the North Atlantic.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-01',
        label: `Lesson 1 — the friend lost in the park`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, and that is Week 1 finished.`,
    prompt: `One thing I understand now that I didn't understand on Monday:`,
    placeholder: `This week I finally understood…`,
    mapFooter: `Five lessons in. Concepts move backward as well as forward — nothing here is a grade.`,
    tomorrow: `Next week: direction. A needle that points north, except it doesn't point at the North Pole, and the amount it is wrong by depends on where you are standing and changes from year to year. Week 2 is about taking that seriously.`
  },

  routes: [
    { id: 'compass', label: `Explain it with a compass`, body: `Next week's tool solves exactly one of this week's three descriptions, and it is worth knowing which. A compass turns "bearing 037° and 2.17 miles" from a sentence into a thing you can walk: face the needle's north, turn until 037 is under the index, and go. It does nothing for the coordinate — it cannot tell you where you started. And it does nothing for the landmarks. One of three, which is why the course does not stop at Week 2.` },
    { id: 'map', label: `Explain it with a map`, body: `Lay a map on the table and put your finger anywhere. Now describe that spot to somebody on the phone who has the same map open. You will find yourself doing it in exactly the three ways: "about two-thirds of the way up, a little left of the middle" — relative; "grid square 83° 03′ by 40° 12′" — coordinate; "where the stream crosses the road" — landmark. The map carries all three at once. That is most of what a map is for.` },
    { id: 'object', label: `Use an everyday object`, body: `Take two pencils and a sheet of squared paper. Lay one pencil along the bottom edge and one up the side, and slide them until they cross at some square. Read off how many squares along the bottom pencil is, and how many up the side one is. That is a coordinate, and the two pencils are what your eye does when it reads a grid off a map. Now, without moving the pencils, describe the same square to somebody as "three to the right and two up from the corner" — that is bearing and distance. Same square, two languages.` },
    { id: 'diagram', label: `Show me a diagram`, body: `Go back to SEE IT and do one thing: press FIND 1 and move only the longitude slider, watching the crosshair. It sweeps across the sheet without going up or down at all, and the longitude readout runs while the latitude readout sits perfectly still. Then move only latitude. Two numbers, two independent movements, and together they can reach every spot on the sheet and no spot twice. That independence is the entire reason the system works.` },
    { id: 'example', label: `Walk me through an example`, body: `Walk one answer all the way through. The fire tower. Coordinate: slide to 40° 15′ 00″ N, 83° 05′ 00″ W — read the latitude off the side of the sheet, the longitude off the top. Bearing and distance: the readout says 5.20 miles from Camp Heartwood on a bearing of 355°, which is five degrees west of due north — so from camp, walk almost straight north for five and a bit miles. Landmarks: it is on the high ground north of Beaver Pond, at the far end of the trail that runs up from the junction. Three descriptions, one tower, and a stranger could use any of them.` },
    { id: 'smaller', label: `Break it into smaller steps`, body: `Three small questions, and the week is in them. One: can you say where something is without saying which way it is from you? Yes — a coordinate does that. Two: can you say which way it is from you without knowing where either of you is? Yes — that is a bearing. Three: does either of those work for somebody with nothing in their hands? No. That is why the third description exists, and why it is the oldest of the three by several thousand years.` },
    { id: 'backward', label: `Work backward from the answer`, body: `Start at the far end: somebody has found the place you described. What did they have to have? If they used your coordinate, they had a map or an instrument, and they trusted that your two numbers came from the same system as theirs. If they used your bearing and distance, they had a compass, and they started from the same door you did. If they used your landmarks, they had daylight and the things were still standing. Work backward from success and you find out what each description quietly assumed — which is how you learn to carry all three.` }
  ],

  map: [
    { name: `Position`, level: 5 },
    { name: `Direction vs. position`, level: 5 },
    { name: `Latitude & longitude`, level: 5 },
    { name: `Reading & plotting a coordinate`, level: 4 },
    { name: `Describing a position`, level: 4 },
    { name: `Bearing & distance`, level: 3 },
    { name: `Reference point`, level: 5 },
    { name: `Map scale`, level: 4 },
    { name: `Contour lines & relief`, level: 4 },
    { name: `Map projection`, level: 4 },
    { name: `Earth's shape`, level: 5 },
    { name: `Degrees, minutes & seconds`, level: 4 },
    { name: `The nautical mile`, level: 3 },
    { name: `A chosen zero`, level: 4 },
    { name: `Legends & symbols`, level: 3 },
    { name: `Great circle`, level: 2 },
    { name: `Magnetic north`, level: 1 }
  ]
}
