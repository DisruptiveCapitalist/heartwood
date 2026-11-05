// Navigation · One more · Lesson 36 — how tall is that?
//
// Field Guide Chapter 14, which was the last chapter of the thirty-one with
// no lesson behind it. It belongs with Week 5's measuring — it is Lesson 23's
// sibling, distance turned on its side — and Week 5 was full by the time
// anybody noticed, so it sits on its own at the end as an optional extra.
// That is a shelf, not a theme, and the course says so rather than pretending
// it fits Field Week's argument about signs.
//
// MEASURED IN src/lib/field.js, CHECKED IN src/__tests__/field.test.js:
//
//   THE CHAPTER'S OWN WORKED EXAMPLE, which the spec asks for by name: a
//   vertical angle of 30° at a horizontal distance of 20 feet gives 11.55
//   feet above eye level, and 17.05 feet all told. Note what that means — on
//   an object that size the observer's own eye is 32% OF THE ANSWER, which is
//   why the chapter says to add it.
//
//   AND THE FINDING THE LESSON IS BUILT ON. Differentiate d·tan θ and divide
//   by the height and you get 2δθ / sin 2θ, which has a minimum at FORTY-FIVE
//   DEGREES: 3.5% per degree of sighting error there, 5.4% at 20° or 70°,
//   10.2% at 10° or 80°, 20.1% at 5° or 85°. Symmetric about 45, and steep at
//   both ends.
//
//   The practical consequence is the whole lesson, and it is a gift: at
//   forty-five degrees the height above your eye EQUALS the distance you
//   walked. The best place to stand is the one place where there is no
//   arithmetic to do.
//
//   WHICH MAKES THE INSTINCT WRONG. Standing well back from a sixty-foot tree
//   — 240 feet, where you can see the top comfortably — the answer is worth
//   ±5.2 feet. Walking IN to 55 feet, where the top is at 45°, makes it ±3.3.
//   Walking away from a thing to measure it feels careful and costs you half
//   as much again.
//
//   THE THIRD ERROR IS A BIAS. On sloping ground the base is not at eye
//   level, and ignoring the down-angle to a base below you understates the
//   height every single time: 30° up and 8° down at 100 feet is 71.8 feet,
//   and the up-angle alone gives 57.7 — 19.6% short, in the same direction,
//   always.

export default {
  id: 'lesson-36',
  number: 1,
  week: 8,
  title: `How tall is that?`,
  openingQuestion: `Every other measurement in this course gets better the more care you take. This one gets better if you stand in the right place — and in the right place there is nothing left to work out.`,
  concept: `Height by angle, and the best angle`,

  fieldGuide: {
    chapter: 14,
    title: `Measuring Height with a Compass`,
    exercise: `Take a compass with a clinometer and find a tree you can walk round. Pace a measured distance from the trunk, sight the top, read the angle, and work out the height — then add your eye height, because the chapter is right that everybody forgets. Now do the thing this lesson is about: walk in or out until the top sits at exactly 45°, and pace the distance again. That distance, plus your eye height, IS the height, and you have done no arithmetic at all. Write both answers down and see how far apart they are.`
  },

  see: {
    voice: 'professor',
    line: `A sixty-foot oak, and you have walked well back to see the top properly. Read the third readout before you move anything.`,
    simulation: { id: 'field', props: { mode: 'height' } },
    observations: [
      { text: `From 240 feet the top of the tree is at **12.8°**, and your answer is worth **±5.2 feet** — about one part in ten. You walked back so you could see the top comfortably, which felt like the careful thing to do, and the curve underneath shows what it cost.` },
      { text: `Now press **WALK UNTIL THE TOP IS AT 45°** and watch two things at once. The error drops to **±3.3 feet**, because that is where the curve bottoms out — and the distance you walked, **55 feet**, is now the height above your eye. No tangent, no table, no arithmetic.`, emphasis: true },
      { text: `Then drag the distance slider right in to twenty-five feet, where the top is at 65°, and watch the error climb again to ±3.7. The curve is **symmetric about 45°** and steep at both ends: a degree of sighting error costs 3.5% at forty-five, 10.2% at ten degrees, and 20.1% at five.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences about the only measurement in this course with a sweet spot.`,
    sentences: [
      `**The sum itself is one line: the height above your eye is the distance to the trunk multiplied by the tangent of the angle you sight the top at.** Measure the distance along the ground, not along your line of sight; read the vertical angle off the clinometer on the back of a good compass; multiply; and then add your own eye height, because the thing is taller than the part you measured by exactly however high your eye is. On the Field Guide's own example — thirty degrees at twenty feet — that last step is a third of the answer.`,
      `**What is unusual is that the error depends on where you choose to stand, and it has a minimum.** A degree of sighting error moves the answer by a fraction of it that works out as two δθ over the sine of twice the angle, and that expression is smallest at forty-five degrees. At forty-five, one degree of error costs three and a half per cent; at ten degrees or eighty it costs ten; at five or eighty-five, twenty. So the instruction is not "be careful" but "go and stand in the right place", and the right place is wherever the top of the thing sits at forty-five degrees.`,
      `And **at that spot the arithmetic disappears, because the tangent of forty-five is one.** The height above your eye is simply the distance you walked — pace back until the top is at forty-five, count your paces, add your eye height, and you have the answer with no table and no calculation. That is a rare and lovely thing: the most accurate way to do it is also the easiest, and the two coincide for the same reason. It is worth noticing that the instinct runs the other way — walking well back to see the top feels like the careful thing and makes the answer worse.`
    ],
    comparison: {
      label: `THE SHADOW THAT IS AS LONG AS YOU ARE`,
      body: `Go outside on a sunny afternoon and watch your own shadow. Some time in the middle of the morning, and again in the afternoon, it will be exactly as long as you are tall — and at that moment every shadow on the street is as long as the thing casting it. You can measure the height of a house, a lamp post or a tree by pacing its shadow, with no instrument whatever and no sum. You are not doing something different from the clinometer; you are letting the Sun hold it for you, and waiting for the one angle where the answer reads itself off the ground.`
    },
    naming: `The scale on a good baseplate compass that reads vertical angles is a **clinometer**, and the angle itself is the **vertical angle** or the **angle of elevation**; sighting both up to the top and down to the base, which sloping ground forces on you, gives the two angles whose tangents are added. The distance to measure is the **horizontal** distance, not the slope distance along your eye-line — on level ground they are the same and on a hillside they are not. The whole method is **similar triangles**, which is why it is older than any instrument: the triangle from your eye to the top of the tree has the same shape as any other triangle with that angle in it, including the one you can draw on paper. Foresters still do this for a living and call the result a **hypsometer** reading; the modern tool is a laser that measures the distance for you, and leaves the geometry exactly as it is here.`,
    formalNames: {
      terms: [
        { term: `Clinometer`, meaning: `The vertical-angle scale on a compass. The only instrument in this course that measures anything vertical, and the reason Naismith's climb figure is obtainable without a map.` },
        { term: `Angle of elevation`, meaning: `The vertical angle from your eye to the top of the thing. Measured from the horizontal, not from the ground.` },
        { term: `Horizontal distance`, meaning: `The distance to measure. Pacing up a slope towards the trunk gives slope distance, which is longer, and makes the answer too big.` },
        { term: `The forty-five degree point`, meaning: `Where the sighting error costs least and the tangent is one. Walk until the top is there and the height above your eye is the distance you walked.` },
        { term: `Similar triangles`, meaning: `Why any of it works. Shape without size — the same reason a shadow as long as you are tall makes every shadow as long as its object.` },
        { term: `Hypsometer`, meaning: `The forester's name for an instrument that does this. A laser one measures the distance too, and changes nothing about the geometry.` }
      ],
      note: `The chapter names three sources of error and they are three different shapes, which is worth keeping apart. **Forgetting your eye height is a constant** — about five and a half feet, whatever you are measuring, so it is negligible on a church spire and a third of the answer on a shed. **A mis-paced distance is proportional**, so it stays the same percentage wherever you stand. **A mis-read angle is proportional too, but depends on where you stood**, which is the only one of the three you can do anything about after the fact. And a fourth the chapter mentions in passing is the worst of the lot, because it is a bias: on sloping ground, ignoring the down-angle to a base below you understates the height every single time.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where else does moving to the right spot do more for you than being careful where you are?`,
    items: [
      `Standing back from a picture to see whether it hangs straight.`,
      `Finding the one place in the kitchen where the phone gets a signal.`,
      `Looking along a shelf edge to see if it is level.`,
      `Moving your head until a reflection stops hiding the screen.`,
      `Stepping to the side to judge whether a post is upright.`,
      `Waiting for low sun to show up every bump in a lawn.`,
    ],
    ownPlaceholder: `Somewhere moving beats trying harder…`,
    synthesis: `Looking along the shelf edge is the same trick exactly. From the front you are judging a small difference between two large numbers and your eye is poor at it; from the end, with your eye on the plane, a quarter-inch of droop is enormous. You have not become more careful — you have moved to where the thing you care about is biggest compared with the error you cannot help making. That is the whole of the forty-five degree rule, and of the cut angle back in Lesson 21: geometry does the work that effort cannot.`,
    builder: {
      body: `Measure the same tree three ways in half an hour and write all three down. First, the Field Guide's method: pace a distance, sight the top, do the sum, add your eye height. Second, the forty-five degree method: walk until the top sits at forty-five, pace back to the trunk, add your eye height, no sum. Third, on a sunny day, wait until your own shadow is exactly as long as you are tall and then pace the tree's shadow. Three answers, three methods, one tree. The spread between them is the honest size of what you can do with a compass and your legs, and it will be smaller than you expect.`
    },
    acrossCultures: {
      place: `EGYPT, AS TOLD IN GREECE`,
      label: `PLAUSIBLE BUT UNCERTAIN`,
      paragraphs: [
        `The oldest story about measuring a height this way is told of **Thales of Miletus** and the Great Pyramid. In the version most often repeated, he waited until the moment when his own shadow was exactly as long as he was tall, and then measured the pyramid's shadow — because at that instant every shadow in Egypt was the length of the thing that cast it. No instrument, no arithmetic, and the answer paced off the sand.`,
        `Whether or not he did it, the story is told because the idea is beautiful, and it is the same idea as this lesson. Waiting for the Sun to reach forty-five degrees is waiting for the one angle at which the tangent is one; walking until the top of a tree is at forty-five degrees is going and finding that angle yourself instead of waiting for it. In both the geometry is doing the work, and in both the reward is the same: the measurement reads itself off the ground.`
      ],
      uncertain: `The evidence is thin and late. Nothing survives from Thales himself; the story reaches us through writers of the Roman period, several centuries after the event, and they do not agree on the method. One version has the shadow-equals-height trick described above; another has him comparing the pyramid's shadow with a staff's at an arbitrary time of day, which needs a proportion and is a different piece of mathematics. Which if either is historical is not recoverable, and some scholars treat the whole episode as a later anecdote attached to a famous name. It is repeated here as a story about an idea, which is what it reliably is.`,
      sources: `Diogenes Laërtius, *Lives of the Eminent Philosophers* (3rd century CE); Heath, *A History of Greek Mathematics* (1921).`
    }
  },

  feynman: {
    line: `Explain it without the words that let you skip the explanation.`,
    instruction: `Explain how to find the height of a tree with a compass and your legs, and why where you stand matters more than how carefully you sight.`,
    banned: ['tangent', 'trigonometry', 'calculate'],
    bannedNote: `All three let you name the mathematics instead of saying what is going on, and the lesson's whole point is that at the right spot the mathematics is not needed. Say what you do with your feet and your eye.`,
    placeholder: `I pace out from the trunk, and then I look up at the top and…`,
    checks: [
      `It says what two things you measure, and that one of them is along the ground.`,
      `It says to add your own eye height, and why.`,
      `It explains why one particular place to stand is the best one.`,
      `It says what happens to the answer when you stand too far away or too close.`
    ],
    closing: `The test: does your explanation let somebody do it with no equipment but a compass and no writing at all? If it does, you have found the forty-five degree version. If it still needs a sum at the end, you have explained the chapter and not the lesson.`
  },

  challenge: {
    voice: 'editor',
    line: `One question, and the wrong answer is the one everybody's feet give them.`,
    prediction: {
      question: `You want the height of a tall tree and the ground is open, so you can stand wherever you like. Where do you go?`,
      options: [
        {
          id: 'fortyfive',
          text: `In, until the top of the tree is at about forty-five degrees.`,
          verdict: `Right, and for two reasons that happen to coincide. The sighting error costs least there — three and a half per cent per degree, against ten per cent at ten degrees — because the sensitivity works out as two δθ over sin 2θ, which bottoms out at forty-five. And at forty-five the height above your eye is simply the distance you paced, so there is nothing left to work out. On the simulation that is the difference between ±5.2 feet and ±3.3 on a sixty-foot oak. The sweet spot is not a coincidence of the arithmetic; it is the same symmetry showing up twice.`
        },
        {
          id: 'back',
          text: `Well back, so you can see the whole tree comfortably and sight the top without craning.`,
          verdict: `This is what almost everybody does and it is the wrong way round, which is why the lesson exists. Standing back feels careful: the whole tree is in view, your neck is comfortable, the sighting feels steady. But the angle is small, and at a small angle the tangent changes very slowly — so a degree of error that you would hardly notice moves the answer a long way. At 240 feet from a sixty-foot tree the top is at 12.8° and your answer is worth about one part in ten; walking IN to 55 feet makes it one part in sixteen. Comfort and accuracy point in opposite directions here.`
        },
        {
          id: 'anywhere',
          text: `Anywhere with a clear view — the geometry is the same wherever you stand, so it cannot matter.`,
          verdict: `The geometry IS the same, and that is exactly why it matters. Because the relationship is a tangent rather than a straight line, the same error in the angle produces different errors in the answer depending on where you are on the curve — shallow and forgiving near forty-five degrees, steep and punishing at the ends. This is the same observation as Lesson 21's cut angle, where two position lines crossing at twenty degrees give a far worse fix than two crossing at ninety, with identical compass work. The instrument's accuracy is fixed. What the geometry does with it is yours to choose.`
        }
      ]
    },
    open: {
      question: `What else is this instrument good for, now you have it in your hand?`,
      placeholder: `If I already knew the height, then…`,
      reveal: [
        `Turn it round. If you know the height — a church tower on the map, a cliff with a spot height, a pylon of a standard type — then the same sum gives you the DISTANCE to it, which is a rangefinder made of a compass. The sensitivity is the same expression, so it is good close to and poor far off: a hundred-foot tower at twenty degrees is 275 feet away and good to five per cent, and the same tower at five degrees is 1,143 feet away and good to twenty. Which is Lesson 25's warning about shallow geometry arriving by a third route.`,
        `And it gives you the one number Lesson 29's plan could not get without a map: feet of climb. Naismith's rule wants an hour for every two thousand feet of ascent, and a clinometer plus a paced base distance will tell you how high that ridge is before you commit the afternoon to it. That is the quiet usefulness of this chapter — not measuring trees, but knowing what a day is going to cost.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-29',
        label: `Navigation, Lesson 29 — planning a real journey`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, and then genuinely nothing left.`,
    prompt: `Guess the height of the tallest tree or building you can see from where you are, and write the guess down. Then go and measure it. Keep both numbers — the gap between them is the thing this chapter is really about.`,
    placeholder: `I think it is about…`,
    mapFooter: `The last chapter of the thirty-one, and the only measurement in the course with a right place to stand.`,
    tomorrow: `That is all of it: thirty lessons, five in the field, and this one. The Field Guide has nothing left without a lesson behind it. Go and measure something.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Turn your compass on its side and look for the scale that reads vertical angles — most good baseplate compasses have one, and most people have never used it. Hold the compass edge-on, sight along it at the top of something, and read the number. That is the one new skill in this lesson, and it takes about a minute to learn. Everything else is pacing, which you have been doing since Lesson 23, and adding your own height, which you can measure once and never again.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `A map gives you heights for free, in contour lines and spot heights, which is why this lesson is about the things a map does not have: a tree, a building, a cliff face, a pylon. But the map is still useful here, in reverse. Find a hill with a spot height on it, measure the angle to the top from a known distance away, and check your answer against the sheet. That is a calibration of your own sighting, and it is the only way to find out what your personal degree of error actually is.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Hold a pencil at arm's length, line the top of it up with the top of a doorframe and your thumb with the bottom, and keep your thumb there. Now you have the doorframe's height as a length on a pencil, and if you walk until the pencil exactly covers something else, that thing is the same height — scaled by how far away it is. It is clumsy and it is the same geometry: a shape held constant while the sizes change. A clinometer is the tidy version, and the Sun at forty-five degrees is the free one.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `Look at the curve underneath the tree rather than the tree. It is the cost of a degree of sighting error, plotted against where you stand, and the shape is a valley with a flat bottom at forty-five degrees and steep walls. The blue dot is you. Drag the distance slider and watch the dot run up one wall and down into the valley and up the other — and notice that near the bottom it hardly moves at all, which is what "forgiving" means. Anywhere between about thirty and sixty degrees is nearly as good as the best.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `The Field Guide's own worked example first: you stand twenty feet from something, sight the top at thirty degrees, and twenty times the tangent of thirty is 11.5 feet above your eye. Add five and a half and it is seventeen feet — and notice that your own eye was a third of that answer. Now the oak. You walk in until the top sits at forty-five degrees and pace back to the trunk: twenty-two paces, about 55 feet. So the height above your eye is 55 feet and the tree is a shade over sixty. You did the second one in your head while walking.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Five steps, and the first is the one this lesson adds. One: walk in or out until the top of the thing sits at about forty-five degrees on the clinometer — anywhere from thirty to sixty will do. Two: pace back to the base, along the ground, counting. Three: if the base is below or above you, take the second angle to it as well. Four: add your eye height. Five: write it down with the distance and the angle, so that if it turns out to be wrong you can find out which of the three was to blame.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Work backwards from the strange fact that the best place to stand is also the place with no sum in it. That cannot be a coincidence, and it is not. The sum is a multiplication by the tangent, and the error in the answer depends on how fast the tangent is changing compared with how big it is — which is smallest exactly where the tangent passes through one. So "the tangent is one" and "the error is least" are two ways of saying the same thing about the same point on the same curve. Find one of them and you have found the other.`
    }
  ],

  map: [
    { name: `Measuring height with a compass`, level: 5 },
    { name: `The best angle`, level: 4, fresh: true },
    { name: `Similar triangles`, level: 4, fresh: true },
    { name: `Clinometer`, level: 4, fresh: true },
    { name: `Measuring distance`, level: 5 },
    { name: `Pace counting`, level: 5 },
    { name: `Cut angle`, level: 5 },
    { name: `Naismith's rule`, level: 5 },
    { name: `Random and systematic error`, level: 5 },
    { name: `Knowing a method's limits`, level: 5 }
  ]
}
