// Navigation · Week 5 · Lesson 21 — two lines that cross
//
// Lesson 10 made a promise four separate times and sent it to Week 5: "Finding
// your own position from bearings to things you can see is a different
// operation — you need two or three of them, crossing — and it is called
// resection." This is that lesson, and the Field Guide note attached to Lesson
// 10 says it belongs with Chapter 12.
//
// MEASURED IN src/lib/plot.js, CHECKED IN src/__tests__/plot.test.js, BEFORE
// ANY OF THIS COPY WAS WRITTEN:
//
//   The sheet is Lesson 10's, 380 px to the mile, with the ford and the old
//   quarry added behind the observer. The five landmarks lie 983 to 1,140
//   yards away — close to equal on purpose, so the cut angle is the only thing
//   that changes when the pair changes.
//
//   With two degrees of error on each bearing, the worst the fix can be:
//     the old quarry + the ford      cut 90°    52 yd
//     the fire tower + Beaver Pond   cut 87°    57 yd
//     the fire tower + Hollow Rock   cut 68°    70 yd
//     Hollow Rock + the ford         cut 39°   105 yd
//     Beaver Pond + Hollow Rock      cut 25°   162 yd
//
//   A three-fold spread on one sheet, from the same compass and the same care.
//   The closed form is √(a² + b² + 2ab·cos θ) ÷ sin θ, and it agrees with the
//   drawn geometry to 0.1% at the shallow cuts — which is where it matters,
//   because that is where the number is large.
//
// A thing the copy must not do: call the crossing point the answer. It is the
// centre of a region, and at a shallow cut that region is a long thin sliver
// the two drawn lines do not show. Hence the shading in the simulation.

export default {
  id: 'lesson-21',
  number: 1,
  week: 5,
  title: `Two lines that cross`,
  openingQuestion: `One bearing tells you where you are not. What does a second one tell you?`,
  concept: `A position from two bearings`,

  fieldGuide: {
    chapter: 12,
    title: `Triangulation and Resection`,
    exercise: `Stand somewhere you can see two features that are both on your map and are well apart in direction — ideally about a right angle apart. Take a bearing to each, convert both to true, and draw each one backwards from its feature across the map. Where the two lines cross is where you are standing, and the first time it works it is genuinely startling: you have found yourself on a sheet of paper using nothing but a needle and two things on a hillside.`
  },

  see: {
    voice: 'professor',
    line: `Same sheet as Lesson 10, with two more landmarks on it. The difference is that this time nobody has told you where you are standing — and the shaded patch, not the crossing, is the answer.`,
    simulation: { id: 'chart-fix', props: { mode: 'fix' } },
    observations: [
      { text: `Two lines, drawn backwards from two landmarks, cross in one place — and that place is **you**. Lesson 10 drew a line from a position you knew to find a landmark's direction. This is the same line read the other way round, and it is a far more useful thing to be able to do.` },
      { text: `Now change nothing but which two landmarks you use. Both bearings are still two degrees out, the same way. The old quarry and the ford put you **50 yards** from the truth; Beaver Pond and Hollow Rock put you **162 yards** out. Same compass, same care, same sheet, three times the error.`, emphasis: true },
      { text: `What changed is the angle the lines cross at — 90° in the first pair, 25° in the second. The shaded patch is every position the fix could occupy, and at a shallow cut it stretches into a sliver. **The two lines look equally decisive in both cases.** The region they bound does not.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third is the one that will actually change where you point your compass.`,
    sentences: [
      `**One bearing is a line, and a line is a place you might be anywhere along.** Take a bearing to the fire tower and you have learned something real and badly incomplete: you are somewhere on a line a mile and a half long. Nothing about taking that bearing more carefully makes it a point. The limitation is not in the measurement, it is in what one measurement can mean.`,
      `**Two lines that cross make a point, and the point is where you are.** This is the whole trick, and it needs no new instrument, no new skill and no arithmetic beyond the declination conversion you already do. Two bearings, two lines drawn backwards from two known things, one crossing. You have gone from a direction to a position, which is the step the first four weeks could not take.`,
      `And **the angle the two lines cross at decides how good the answer is, more than your care does.** Call it the cut. Near a right angle, each line pins the other down and the fix is tight. Near a straight line, the two lines lie almost along each other, and a tiny error in either slides the crossing a long way. On one sheet, with one compass and two degrees of error, the best pair of landmarks is three times better than the worst — and that is a choice you make before you measure anything.`
    ],
    comparison: {
      label: `TWO PEOPLE POINTING AT YOU`,
      body: `Stand in a field and have two friends point at you from the edge. If they are standing at right angles to each other — one to your north, one to your east — then even if each of them is a bit sloppy, the two directions pin you down: his sloppiness moves you sideways, hers moves you forwards, and the two mistakes do not pile up. Now move them both to the same corner of the field, a few feet apart. They are both still pointing straight at you, both still a bit sloppy, and now you could be anywhere along a long stretch of the line between them and you — because their two mistakes are now mistakes in the *same* direction. Nothing about them changed. Only where they were standing.`
    },
    naming: `The operation has a name, and so does the thing that limits it. Finding *your own* position from bearings to known objects is **resection**. Each drawn line is a **line of position** — a set of all the places you could be, given that one measurement. Where two of them cross is a **fix**. And the angle between them is the **cut** or **cut angle**, and it is the one quantity in this lesson that a navigator can choose rather than merely suffer: you decide which two landmarks to use, and in doing so you decide most of your own accuracy before the compass comes out of the pocket.`,
    formalNames: {
      terms: [
        { term: `Resection`, meaning: `Finding where YOU are, from bearings to two or more known objects. The reverse of Lesson 10's operation, which found where an object was from a position you knew.` },
        { term: `Intersection`, meaning: `Lesson 10's operation, named: bearings taken from two known positions to fix an unknown object. The same triangle, solved for a different corner.` },
        { term: `Line of position`, meaning: `Everywhere you could be, consistent with one measurement. A bearing gives a straight one; Lesson 18's pole height gave a curved one.` },
        { term: `Fix`, meaning: `A position from two or more crossing lines of position. "Fix" carries no promise of accuracy — a fix can be badly wrong and still be a fix.` },
        { term: `Cut angle`, meaning: `The angle at which two lines of position cross. The fix's error goes roughly as 1 ÷ sin(cut), so it doubles as the cut halves.` },
        { term: `Back bearing`, meaning: `The reciprocal — your bearing to the tower plus or minus 180°. It is what you actually draw on the paper, running from the tower back towards you.` },
        { term: `Error ellipse`, meaning: `The region a fix could really occupy. The shaded patch in the simulation is a plain-sided version of it; the real thing has curved sides and the same shape.` }
      ],
      note: `"Resection" and "intersection" get swapped constantly, including in print. The way to keep them straight is to ask what you did not know before you started: if it was your own position, it was resection.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where else do two bits of information pin something down that neither of them could pin down alone?`,
    items: [
      `Working out which flat is making the noise, from two windows.`,
      `"It's behind the sofa" plus "it's on the left" — now you can reach it.`,
      `Two witnesses who saw the same car from different streets.`,
      `Finding a leak from where the stain is upstairs and downstairs.`,
      `Two photos of the same mountain, taken miles apart.`,
      `Smelling smoke from two rooms and knowing which way to run.`
    ],
    ownPlaceholder: `Two clues that only meant something together…`,
    synthesis: `Every one of those has the same shape, and the sofa one has it most plainly: "behind the sofa" is a line and "on the left" is another line, and neither is a place until you have both. The useful part is the bit none of them says out loud — that two clues from nearly the same direction are worth much less than two from different directions, which is why you walk round the room rather than lean further over.`,
    builder: {
      body: `Do this indoors first, where you cannot get it wrong. Sit at a table with a sheet of paper, mark two dots on it a hand's width apart, and label them with two things you can see out of the window — a chimney, a mast, a particular tree. Now stand up, take a real bearing to each, convert both to true, and draw the two lines back from the dots. The crossing is where your table is. It will not be in the right place, because the two dots are not really where the chimney and the tree are relative to each other — and working out *why* the answer is wrong is better practice than getting it right. Then do it outdoors with a real map.`
    },
    acrossCultures: {
      place: `CHINA, THIRD CENTURY`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `The *Haidao Suanjing*, the **Sea Island Mathematical Manual**, is a set of nine surveying problems attached to Liu Hui's commentary on the *Nine Chapters on the Mathematical Art*, conventionally dated to 263 CE and circulating as a book in its own right from the early Tang. The first problem — the one that gave the collection its name — asks for the height of an island and the distance to it, seen from a shore you cannot leave. The method, called **chong cha**, "double differences", sets up two poles of equal height a measured distance apart along a straight line towards the island, sights the peak past each one, and works with the *difference* between the two offsets.`,
        `That is the geometry of this lesson, solved for the other corner of the same triangle. Here you know two landmarks and want yourself; Liu Hui knows two stations and wants the island. What makes the text remarkable is not that the problem was posed but that it was reduced to a procedure with proofs behind it, resting on similar triangles and on rectangles inscribed in right triangles — and it then furnished the standard methods for surveying across much of East Asia for something like a thousand years afterwards.`
      ],
      uncertain: `The date rests on the attribution to Liu Hui rather than on a dated manuscript, and the nine problems' history before they were separated out under the Tang is not clear. The step-and-*li* units in the worked answers cannot be converted into modern distances with any confidence, so the often-repeated figures for "how far the island was" are not reliable; and the widely available online versions of the text have garbled notation, so the procedure should be read in Swetz's annotated translation rather than from a summary.`,
      sources: `Swetz, *The Sea Island Mathematical Manual: Surveying and Mathematics in Ancient China* (1992); Mikami's English translation of the nine problems (1912); Guo Shuchun's French translation.`
    }
  },

  feynman: {
    line: `The first explanation of the week, and the first one where you can say where you are.`,
    instruction: `Explain how someone with a compass and a map, who does not know where they are, can work it out from two things they can see. Then explain why the choice of which two things matters as much as the care taken.`,
    banned: ['resection', 'triangulate', 'intersect'],
    bannedNote: `The first is the name of the method, and naming it is not explaining it. The other two are the words people reach for to avoid describing the geometry — say what the two lines do instead.`,
    placeholder: `I don't know where I am, but I can see two things that are on the map, so…`,
    checks: [
      `It is clear that one bearing gives a line and not a place, and says why.`,
      `The lines are drawn backwards from the known objects, not forwards from the unknown position.`,
      `It says that the angle between the two lines changes how good the answer is.`,
      `It gives some advice on choosing the two objects that a reader could actually follow.`
    ],
    closing: `If your explanation would work just as well with the two objects side by side as at right angles, something is missing — and it is the part that does the most good in the field.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction about a bad habit, and one question about what is still missing.`,
    prediction: {
      question: `You take bearings to two landmarks that happen to be almost in the same direction from you — about 10° apart. You work very carefully, to half a degree. How good is your fix?`,
      options: [
        {
          id: 'poor',
          text: `Still poor — a shallow cut spoils a fix no matter how carefully it was measured.`,
          verdict: `Right, and this is the lesson's whole practical content. The error goes roughly as 1 ÷ sin(cut), so a 10° cut multiplies your bearing error by about six where a 90° cut barely multiplies it at all. Half a degree carefully measured at a 10° cut is worse than two degrees carelessly measured at a right angle — which is a deeply unfair-feeling result and the reason choosing your landmarks is the skill.`
        },
        {
          id: 'good',
          text: `Good — half a degree is four times better than two degrees, so the fix is four times better.`,
          verdict: `The arithmetic is right and it is being applied to the wrong quantity. Halving your bearing error does halve how far each LINE moves. But the fix is where two lines cross, and how far a crossing moves when a line moves depends on the angle between them — divide by sin(10°) and you have multiplied your careful half-degree by nearly six. Both things are true: care helps, and it cannot rescue a bad cut.`
        },
        {
          id: 'depends',
          text: `It depends how far away the landmarks are.`,
          verdict: `This is a real effect and it is the smaller of the two. Range does matter: a bearing error moves the line sideways by the range times the tangent of the error, so a degree at two miles costs twice what it costs at one. But in the simulation every landmark is about a thousand yards away on purpose, precisely so that range is held still and the cut can be seen doing its work alone. Both matter; the cut matters more, and the cut is the one you choose.`
        }
      ]
    },
    open: {
      question: `You can now find your position from two bearings. What has this not given you?`,
      placeholder: `I can get a position now, but I still can't…`,
      reveal: [
        `A way of knowing how wrong it is. You have a crossing and a shaded region, and in the field nobody draws the shaded region — you get a neat little X on paper that looks exactly as confident when it is 52 yards out as when it is 162. The fix does not come with its own error attached, and the next lesson is about what happens when you take a third bearing and the three lines refuse to agree.`,
        `There is also the whole business of having no landmarks at all, which is most of the sea and a good deal of the land in fog. That needs Lesson 24. And there is distance — everything so far this week is angles, and you have still never measured how far you have walked.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-10',
        label: `Navigation, Lesson 10 — the map and compass work together`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. The week has started with the thing the course has been promising since Lesson 1.`,
    prompt: `Lesson 1 asked what it means to know where you are. You can now answer it with a procedure. Write the procedure down in your own words, in as few steps as you can manage.`,
    placeholder: `To find out where I am: first…`,
    mapFooter: `Week 5, day one. A direction has become a position.`,
    tomorrow: `Tomorrow: a third bearing, which ought to confirm the first two and instead leaves a small triangle. What that triangle means is not what navigators have been told for two hundred years.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Everything you did in Lesson 8 and Lesson 9, you now do twice and then put the compass away. Sight the tower, box the needle, read the dial, add the declination: one number. Sight the pond, box, read, add: a second number. The compass has no further part in it. From here on it is two lines on paper and a pencil, and the interesting question is not how to take the bearings but which two things to take them to — a question the instrument cannot help you with at all.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Think of each bearing as crossing a whole region of the map off. Take a bearing of 045° to the fire tower, and every place on the sheet that is not on the line running south-west from the tower is now impossible: you have eliminated almost the entire map with one measurement. The second bearing eliminates almost everything that is left. Two sweeping eliminations, one survivor — and the reason a shallow cut is poor is that the second elimination overlaps the first instead of crossing it, so it throws away much less.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Take two pencils and lay them on a table so they cross. Hold one still and nudge the other sideways by a few millimetres, keeping it parallel: watch where the crossing goes. With the pencils nearly perpendicular, the crossing moves about as far as you nudged. Now lay them so they cross at a narrow angle and nudge again by exactly the same few millimetres — the crossing shoots off down the table. You have just demonstrated 1 ÷ sin(θ) with two pencils, and you will not forget it.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `In the simulation, stop looking at where the two dashed lines meet and look at the shaded patch instead. That patch is the answer: it is every position consistent with both bearings being wrong by up to the amount set. With the quarry and the ford it is a tidy little square. Switch to Beaver Pond and Hollow Rock and it becomes a long thin splinter pointing off across the sheet — and the two dashed lines look exactly as crisp as they did before. That is the whole lesson in one toggle.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `You are somewhere on a hillside. You sight the old quarry and the dial reads 172° magnetic; the declination here is 7.2° west, which subtracts, so 165° true. Draw the line from the quarry running back the other way, on 345°. You sight the ford: 262° magnetic, 255° true; draw the line from the ford running back on 075°. The two lines cross at a right angle, about a thousand yards from each landmark, and that crossing is within about fifty yards of where you are standing even if both bearings were two degrees out. Had you picked Beaver Pond and Hollow Rock instead, those same two errors would have put you a hundred and sixty yards out.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Four steps, and only the fourth is new. One: look at the map and pick two things you can see that are well apart in direction — not the two nearest, and not two in the same quarter of the view. Two: take a bearing to each. Three: convert each from magnetic to true, the way Lesson 7 taught you. Four: from each landmark, draw the line running back towards you, and mark where the lines cross. That is you. Step one is the one people skip and the one that decides the answer.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from the result and ask what would have had to be true. The answer is a point on the map. A point needs two numbers to specify it. You have taken two measurements. So the measurements must be, between them, exactly enough — no spare information, no redundancy, nothing to check the answer against. That is why the fix comes with no error attached: you spent both measurements buying the position and had nothing left over to buy confidence with. Which tells you what a third bearing is for, and that is tomorrow.`
    }
  ],

  map: [
    { name: `Resection`, level: 4, fresh: true },
    { name: `Line of position`, level: 5 },
    { name: `Cut angle`, level: 4, fresh: true },
    { name: `Position`, level: 5 },
    { name: `Taking a bearing`, level: 5 },
    { name: `Magnetic and true`, level: 5 },
    { name: `Plotting on a map`, level: 4 },
    { name: `Systematic vs careless error`, level: 4 },
    { name: `Knowing a method's limits`, level: 5 },
    { name: `Map scale`, level: 3 },
    { name: `Latitude from the pole`, level: 5 },
    { name: `Finding direction with the Sun`, level: 5 }
  ]
}
