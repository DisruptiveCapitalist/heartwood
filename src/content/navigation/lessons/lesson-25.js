// Navigation · Week 5 · Lesson 25 — finding the way back
//
// The week's closer, and Field Guide Chapter 15's last item, "correcting
// position with known landmarks". Lesson 21 needed
// two landmarks; Lesson 24 had none and watched the plot rot. This is the case
// in between, which is the one you actually meet: exactly one thing in sight.
//
// MEASURED IN src/lib/plot.js, CHECKED IN src/__tests__/plot.test.js:
//
//   THE RUNNING FIX, running due east with two degrees on each bearing:
//     run      sight line swings      worst the fix can be
//     300 yd         7°                 2,492 yd  — further than the tower is
//     600 yd        16°                   616 yd
//     900 yd        26°                   317 yd
//   1,200 yd        37°                   204 yd
//
//   So the method is not merely imprecise at short runs, it is meaningless:
//   at 300 yards the fix can be further out than the distance to the object
//   it was taken from. The governing quantity is the cut angle from Lesson 21,
//   and the run is how you buy it.
//
//   RUNNING STRAIGHT AT THE OBJECT GIVES NOTHING, from any distance: the sight
//   line does not swing, so there is no second line to cross. Guarded by a
//   test, because it is the one case where everything is done correctly and no
//   fix exists.
//
//   AND IT INHERITS LESSON 23'S DISTANCE ERROR, amplified: a 900-yard run
//   assumed ten per cent long puts the fix 148 yards out from that alone.
//
// THE LOG LINE ARITHMETIC, verified: 47 ft 3 in per knot on a 28-second glass
// implies a nautical mile of 6,075 ft, against the modern 6,076.12 — right to
// about one part in five thousand. The earlier 42 ft on a 30-second glass
// implies 5,040 ft, which is 17% short, so the correction of the knot spacing
// followed the correction of the length of a degree. That last inference is
// mine and is labelled as such in the card.

export default {
  id: 'lesson-25',
  number: 5,
  week: 5,
  title: `Finding the way back`,
  openingQuestion: `There is exactly one thing in sight. Two bearings to it need two places to stand — so go and stand somewhere else.`,
  concept: `A fix from one landmark and a run`,

  fieldGuide: {
    chapter: 15,
    title: `Dead Reckoning`,
    exercise: `Pick one feature you can see and identify on the map, and stand where it is well off to one side of your line of travel rather than ahead of you. Take a bearing to it. Walk a counted distance — make it a good long one, a thousand paces rather than three hundred — on a held course, and take a second bearing to the same feature. Now slide the first line forward across the map by the distance and direction you walked, and cut it with the second. That crossing is where you are standing, and you got there with one feature, two bearings and your own legs.`
  },

  see: {
    voice: 'professor',
    line: `One landmark, two bearings, and a walk in between. Start with the run slider right down at 200 yards and read the right-hand readout before you touch anything else.`,
    simulation: { id: 'chart-fix', props: { mode: 'running' } },
    observations: [
      { text: `At 200 yards of run the readout says **meaningless**, and it means it: the fix can land further away than the tower is. Two bearings were taken, both good to two degrees, both plotted correctly — and the answer is worthless, because the sight line barely moved.` },
      { text: `Push the run out and watch the sight line swing. **300 yards swings it 7° and the fix could be 2,492 yards out. 600 yards swings it 16°, for 616. 900 swings it 26°, for 317. 1,200 swings it 37°, for 204.** The quantity doing all the work is the cut angle from Lesson 21, and the run is how you buy it.`, emphasis: true },
      { text: `Now a case worth meeting once in safety. Aim the run **at** the landmark instead of across it and the sight line does not swing at all — the second bearing is the same as the first, there is no second line, and there is no fix from any distance whatever. Everything done correctly, nothing produced.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences to close the week, and the first one is the whole technique.`,
    sentences: [
      `**Two bearings to one object are useless from one place and sufficient from two.** Take a bearing, walk a known distance on a known course, take another. Then slide the first line across the map by exactly the distance and direction you walked, and cut it with the second: that crossing is where you now are. The first bearing is still telling you something true — it just needed carrying forward to where you had got to, and the carrying forward is Lesson 24's dead reckoning doing one honest leg of work.`,
      `**It is the whole week in one procedure, and it fails if any part of the week is missing.** It needs a bearing taken properly, from Week 2. It needs a distance measured, from Lesson 23, and a course held, from Lesson 24. And what it produces is a crossing of two lines whose quality is set by the cut angle, from Lesson 21. Nothing new has been introduced today except the idea of moving the line, and that one idea converts the whole of dead reckoning from a liability into an instrument.`,
      `And **it is worth nothing at all until the run is long enough.** Three hundred yards of running swings the sight line seven degrees and gives a fix that can be two thousand yards wrong. Twelve hundred yards swings it thirty-seven and gives two hundred. The useful instruction is therefore not "take a running fix" but "run until the bearing has changed by at least twenty or thirty degrees, and until then do not pretend you have a position".`
    ],
    comparison: {
      label: `LOOKING ROUND A DOORFRAME`,
      body: `You are in a corridor and want to know how far along a room the far wall's picture is. Look through the doorway from one side of the frame, and you see the picture and have learned something incomplete. Shuffle two inches sideways and look again: the picture has barely moved against the frame, and you have learned nothing new. Walk right across to the other side of the corridor and look again — now the picture has shifted a long way against the frame, and the two views together place it. It is the same picture and the same eyes both times. What made the second pair of looks useful was the width of your shuffle, and that is the run.`
    },
    naming: `Sliding a line of position forward to the time and place you have reached is **transferring** it, and the line is a **transferred line of position**. Crossing it with a later bearing to the same object gives a **running fix**, which is the proper name for today's method and the standard way of fixing a position from a single object. The run between the two bearings is supplied by dead reckoning, so a running fix is only as good as the course held and the distance measured — it is a hybrid, half observation and half arithmetic, and it carries the weaknesses of both. At sea the distance came from the **log**: a weighted board on a knotted line, paid out over the stern for the run of a sandglass, with the speed read off by counting the knots that passed. That is where the unit comes from.`,
    formalNames: {
      terms: [
        { term: `Running fix`, meaning: `A position from two bearings to ONE object, taken from two places, with the run between them known.` },
        { term: `Transferred line of position`, meaning: `An earlier line slid across the chart by the distance and direction run since it was taken. Drawn with the time of the original observation beside it.` },
        { term: `The run`, meaning: `The course and distance between the two bearings. Supplied by dead reckoning, and the weak member of the partnership.` },
        { term: `Log`, meaning: `The instrument for the distance run at sea. The chip log is a board on a knotted line and a sandglass; a modern one is an impeller or a satellite.` },
        { term: `Knot`, meaning: `One nautical mile in an hour, named for the knots in the log line. A "knot per hour" is a mistake, and a common one.` },
        { term: `Doubling the angle on the bow`, meaning: `A shortcut for the same geometry: when the bearing to an object has swung to twice its original angle off your course, your distance from it equals the distance run.` },
        { term: `Bow and beam bearings`, meaning: `The 45°-and-90° version of that shortcut, worked without plotting anything — when the object is abeam, you are as far from it as you ran.` }
      ],
      note: `A running fix is conventionally plotted with a distinct symbol, because it depends on a reckoned run and so is not as good as a fix from two objects observed at once. Where you can have two objects, have two objects.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Last one of the week. Where do you learn something by moving yourself rather than by looking harder?`,
    items: [
      `Working out which of two trees a bird is in, by stepping sideways.`,
      `Judging how far off a thunderstorm is as it crosses.`,
      `Finding the one angle where the scratch on the screen disappears.`,
      `Leaning left and right to see past the person in front.`,
      `Walking round a sculpture to see what shape it actually is.`,
      `Closing one eye, then the other, to place something near your face.`
    ],
    ownPlaceholder: `Something I only worked out by moving…`,
    synthesis: `The two eyes are the closest relative, and they are a running fix that happens continuously: two views of the same object from two places, and a brain that knows the distance between them. The reason distant things look flat is exactly the reason a 300-yard run gives nothing — your eyes are two and a half inches apart, which is a tiny run, and beyond about twenty feet the sight lines have stopped swinging enough to be worth crossing.`,
    builder: {
      body: `The week's challenge, and it needs one landmark and a thousand paces. Pick something you can see and find on a map, with the whole of it well off to one side of where you intend to walk — not ahead of you, which is the mistake this lesson exists to prevent. Take a bearing. Walk a thousand counted double-paces on a held course, writing the course down. Take a second bearing to the same thing. Then plot it: slide the first line forward by your run, cut it with the second, and mark the crossing. Finally, and this is the part that makes it worth doing, work out from the swing of the bearing whether your run was long enough to have believed the answer.`
    },
    acrossCultures: {
      place: `THE ATLANTIC, SIXTEENTH CENTURY ONWARD`,
      label: `DOCUMENTED REGIONALLY`,
      paragraphs: [
        `A running fix needs the run measured, and at sea the instrument for that was the **log**: a weighted wooden quadrant on a long line, thrown over the stern so that it stayed where it was dropped while the ship sailed away from it. The line was knotted at regular intervals, and a sandglass was turned as the first mark went over. When the glass ran out the line was nipped and the knots that had passed were counted — and the count *was* the speed, which is why a ship's speed is still given in **knots** and why "knots per hour" is a confusion of the unit with its definition.`,
        `The arithmetic is quietly elegant. The usual figures are a spacing of 47 feet 3 inches and a 28-second glass, and those two numbers stand in the same ratio to each other as a nautical mile does to an hour: 47 ft 3 in over 28 seconds works out at a nautical mile of 6,075 feet, against the modern value of 6,076. The spacing was not chosen for convenience; it was chosen so that the count needed no arithmetic at all, which on a wet deck at night is worth more than precision.`
      ],
      uncertain: `The figures varied, and the commonly quoted ones should not be treated as a standard. An earlier practice of 42 feet with a 30-second glass is reported, and the nautical mile itself appears as 6,080 feet in some sources and 6,076 in others. The sandglass was the weak link, since its rate changed with damp and with wear on the aperture, and crews are described as checking and adjusting glasses against each other. The widely repeated date of 1574 for the first description of the hand log comes from reference works and enthusiast sources rather than from an identified primary text; and the inference below is mine rather than any source's — that 42 feet on a 30-second glass implies a nautical mile of only 5,040 feet, 17% short, so the knot spacing was probably corrected in step with the improving estimates of the length of a degree.`,
      sources: `Taylor, *The Haven-Finding Art: A History of Navigation from Odysseus to Captain Cook* (1956); Waters, *The Art of Navigation in England in Elizabethan and Early Stuart Times* (1958); May, *A History of Marine Navigation* (1973).`
    }
  },

  feynman: {
    line: `The last explanation of the week, and it has to use the whole week.`,
    instruction: `There is only one thing in sight that you can find on your map. Explain how to get a position from it anyway, and how to tell whether the position you got is worth having.`,
    banned: ['landmarks', 'stand still', 'guesswork'],
    bannedNote: `The plural is banned because the whole point is that you have exactly one thing to look at — reach for a second and you have answered Lesson 21's question instead of today's. The other two are what the method is for replacing.`,
    placeholder: `There's only one thing I can identify, so first I take a bearing to it, and then…`,
    checks: [
      `It takes two bearings to the same feature from two different places.`,
      `It carries the first line forward by the distance and direction travelled in between.`,
      `It says how to judge whether enough ground was covered, in terms a reader could apply.`,
      `It names what the answer depends on besides the two bearings.`
    ],
    closing: `The honest test: would your explanation have stopped someone taking two bearings two hundred yards apart and believing the answer? That is the failure this lesson exists to prevent, and it feels like success while it is happening.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction about the commonest way to waste a running fix, and one last question.`,
    prediction: {
      question: `You are walking directly towards a church tower, the only thing you can identify. You take a bearing, walk a thousand carefully counted paces towards it, and take another. What do you have?`,
      options: [
        {
          id: 'nothing',
          text: `Nothing — the bearing has not changed, so there is no second line to cross.`,
          verdict: `Right, and it is worth sitting with how strange this is. Every individual step was done correctly: two good bearings, a carefully measured run, a properly transferred line. And the method yields nothing at all, from any distance, because walking straight at an object does not swing the sight line to it. A running fix is bought with the sideways component of your run, and walking at the tower spends none of it.`
        },
        {
          id: 'distance',
          text: `You know how far you are from the tower now, which is something.`,
          verdict: `You know how much closer you are, which is not the same thing and is genuinely useful — if you knew your distance before, you know it now. But that was already true from the pace count alone and owes nothing to the bearings. What you do not have is a position: you are somewhere on the line to the tower, at an unknown distance along it unless you knew your distance to start with, and the second bearing has added not one thing to the first.`
        },
        {
          id: 'fix',
          text: `A running fix — two bearings and a known run is the method, and you have all three.`,
          verdict: `You have the three ingredients and they will not combine, which is the trap. Transferring the first line forward along your course slides it *along itself*, because your course and the line are the same direction — so the transferred line lands exactly on top of the second bearing, and two coincident lines cross nowhere. The ingredients are necessary and not sufficient; what is also needed is that the run have a component across the sight line.`
        }
      ]
    },
    open: {
      question: `Five weeks. You can find direction four ways, and position three ways. What is still missing?`,
      placeholder: `I can fix a position now, but…`,
      reveal: [
        `Longitude, and it has been missing since Lesson 3. Everything you can now do that gives a position needs either a map with known landmarks on it, or a position you already had. Out of sight of land, with no landmark to resect from, you can still get your latitude from the pole or from the noon Sun — Week 4 gave you that — and you have no way whatever of knowing how far east or west you are. Dead reckoning is the only answer anyone had for three hundred years, and this week showed you how fast it decays.`,
        `The exchange rate has been in your notebook since Lesson 14: fifteen degrees to the hour, four minutes to the degree. Longitude is a clock problem, and it needs a clock that keeps the time of somewhere else while you travel — which is Chapter 16, and the last week of this course.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-14',
        label: `Navigation, Lesson 14 — solar time and the compass`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `The last two minutes of the week.`,
    prompt: `Five weeks ago you could not say where you were. List the ways you could now work it out, and beside each one write what it needs to be in sight.`,
    placeholder: `I could find my position by…`,
    mapFooter: `Week 5 complete. A line, two lines, a measured distance, a plot carried forward, and a way out of it with one landmark.`,
    tomorrow: `Next week is the last, and it has one piece of unfinished business: longitude. You have had the exchange rate since Lesson 14 and never been able to use it, because using it needs a clock you can carry.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `The compass does two different jobs in a running fix and it is worth keeping them apart. Twice it measures — a bearing to the tower, then a bearing to the tower again. In between it holds — you steer a course by it for the whole run. The measuring is good to a couple of degrees and forgives a wobble, because a wobble on one reading is a wobble on one line. The holding does not forgive, because a lean held for the whole run is built into the transfer, and the transferred line goes down in the wrong place.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Draw the first bearing from the tower as usual. Now take that line and, keeping it exactly parallel, slide the whole thing across the sheet by your run — same direction you walked, same distance to the map's scale. You are not redrawing it; you are moving it, and if you are plotting on paper the proper way to do it is to walk a pair of parallel rules across. Where the slid line cuts the second bearing is you. The reason the first line still means something after being moved is that it was true about where you *were*, and you know exactly how far you have come since.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Hold a finger up at arm's length and line it up with something across the room. Close one eye, then the other: the finger jumps against the background, and the size of the jump tells you something about how far away your finger is. That is a running fix with a run of two and a half inches, performed about twenty times a second, and it is why you can catch a ball. Now line your finger up with something a street away and swap eyes again — no jump, no information. Same two eyes, and the run has become too small for the distance.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `In the simulation the faint dotted line through the tower is the first bearing where you took it. The solid line parallel to it is that same line after being transferred forward by the run. The second bearing goes straight to the tower, and the two solid lines cross at your position. Now drag the run slider from 200 up to 1,300 and watch the two solid lines go from nearly parallel to properly crossed — the picture of the cut angle opening, which is exactly the Lesson 21 picture arriving by a different route.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `The fire tower bears 044° from where you are standing. You walk due east, counting, for 900 yards. The tower now bears 019° — it has slid 25° round to your left, which is what walking across its line of sight does. Transfer the first line 900 yards east and cut it with the 019°, and the crossing is where you are: good to about 300 yards, worst case, with two degrees of error on each bearing. Had you stopped after 300 yards, the bearing would have moved only 7° and the same two degrees of error could have put you 2,492 yards out — further than the tower itself.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Five steps, and step two is the one people get wrong. One: take a bearing to the one thing you can identify. Two: choose a course to walk that goes *across* its line of sight rather than along it, and commit to walking it far enough. Three: walk, counting, holding the course. Four: take the bearing again, and check it has moved by at least twenty degrees — if it has not, keep walking. Five: slide the first line forward by your run and cut it with the second.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `The answer is a crossing of two lines, and Lesson 21 told you a crossing is only as good as the angle between them. So ask where the angle comes from. Both lines run to the same tower, so the angle between them is entirely the angle the tower has moved through as seen from you — which is set by how far you went sideways relative to how far away the tower is. That single ratio governs the whole method: it explains why a long run is good, why a near object is better than a far one, and why walking straight at the thing gives nothing. Everything else in the lesson follows from it.`
    }
  ],

  map: [
    { name: `Running fix`, level: 4, fresh: true },
    { name: `Transferred line of position`, level: 4, fresh: true },
    { name: `Dead reckoning`, level: 5 },
    { name: `Cut angle`, level: 5 },
    { name: `Measuring distance`, level: 5 },
    { name: `Pace counting`, level: 5 },
    { name: `Resection`, level: 5 },
    { name: `Line of position`, level: 5 },
    { name: `The cocked hat`, level: 5 },
    { name: `Precision and accuracy`, level: 5 },
    { name: `Set and drift`, level: 4 },
    { name: `Position`, level: 5 },
    { name: `Longitude`, level: 2 },
    { name: `Knowing a method's limits`, level: 5 }
  ]
}
