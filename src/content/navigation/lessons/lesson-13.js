// Navigation · Week 3 · Lesson 13 — finding direction with the Sun
//
// The brief (Week 3, "Finding Direction with the Sun") asks for shadow-tip
// observations, an approximate east–west line, finding north–south, and —
// this is the part most sources skip — seasonal and latitude limitations. The
// Field Guide's Chapter 5 asks for the two methods to be taught SEPARATELY and
// for the approximate one to be labelled approximate.
//
// So this lesson measures it. Errors against true east–west, from
// src/lib/sun.js, at Columbus, with the first mark put down at the stated time
// and a 20-minute wait:
//
//                      noon    1h before   2h before   4h from noon
//   20 March           0.1°      0.1°        0.1°         0.1°
//   1 May              0.8°      3.5°        7.7°        14.9°
//   21 June            1.0°      5.2°       11.2°        23.3°
//   21 December        2.2°     10.8°       21.1°        30.7°
//
//   equal-shadow method, same place and dates:
//     20 March 0.09° · 1 May 0.07° · 21 June 0.00° · 21 December 0.00°
//
// Two results shape the whole lesson. The first is that the crude method is
// not "roughly right" — on a December afternoon it is thirty degrees wrong,
// which at Lesson 8's rate of 31 yards per mile per degree is more than half a
// mile off after a mile of walking.
//
// The second is more interesting, and I have not seen it said plainly
// anywhere: the two methods fail under OPPOSITE conditions. The two-mark
// method is defeated by the curvature of the shadow tip's path, which is zero
// at the equinoxes and greatest at the solstices. The equal-shadow method is
// defeated only by the Sun's declination drifting between the morning mark and
// the afternoon one, which is fastest at the equinoxes and zero at the
// solstices. So on 20 March the crude method is actually the more accurate of
// the two — 0.1° against 0.09° is a dead heat — and in December it is three
// hundred times worse.
//
// Also measured, because the Field Guide's "wait 15–20 minutes" points the
// reader at the wrong knob: at Columbus on 21 June, two hours before noon, a
// 15-minute wait gives 11.4° and a 20-minute wait 11.2°. The wait is not the
// problem. The hour of the day is the problem.

export default {
  id: 'lesson-13',
  number: 3,
  week: 3,
  title: `Finding direction with the Sun`,
  openingQuestion: `How wrong is the stick-and-two-stones trick?`,
  concept: `A method is only as good as the day you use it on`,

  fieldGuide: {
    chapter: 5,
    title: `The Shadow Stick Method`,
    exercise: `Do both methods on the same afternoon, from the same stick, and draw both lines. Then wait for a clear night and check them against Polaris. The gap between your two lines is not a mistake you made — it is the thing this lesson is about, and it will be widest in December.`
  },

  see: {
    voice: 'professor',
    line: `Two methods, same stick, same afternoon. The red one is the one you will find in most survival books. Move the first mark around the day and watch what happens to it.`,
    simulation: { id: 'shadow-stick', props: { mode: 'methods' } },
    observations: [
      { text: `On 21 December, with the first mark two hours before noon, the two-mark line is **21.1° off** true east–west. Four hours before noon it is **30.7°** off. That is not a rough bearing, it is the wrong way.` },
      { text: `The equal-shadow line, drawn from the same first mark, is **0.00°** off on the same day. The difference between the two methods is not small and it is not a matter of care.` },
      { text: `Now switch to 20 March. The two-mark line is **0.1°** off — better than the careful method's 0.09°, near enough a tie. The crude method is not bad. It is bad on most days.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third is the one that will keep you found.`,
    sentences: [
      `The two-mark method draws a **chord across a curve**. Yesterday you watched the shadow tip trace a curve that bends away from the stick; a straight line between two points twenty minutes apart is a chord of it, and a chord only runs east–west where the curve itself does. At noon it nearly does. Four hours out it does not come close.`,
      `The equal-shadow method is built on **symmetry instead of straightness**. Two moments when the shadow is the same length sit at equal angles either side of the meridian, so the line joining them is square to the meridian — which is to say, east–west — and its accuracy does not depend on how curved the path is at all.`,
      `Each fails in the other's good conditions. The curve is **straight at the equinoxes and most bent at the solstices**, so the crude method is perfect in March and hopeless in December. The symmetry is broken only by the Sun's declination **drifting during the day**, which is fastest at the equinoxes and nil at the solstices. There is no day of the year on which both are bad.`
    ],
    comparison: {
      label: `TWO WAYS TO FIND THE MIDDLE OF A ROOM`,
      body: `You want the centre line of a room. Method one: stand near one wall, take two steps along it, and sight a line through those two footprints. If the wall is straight you are right; if the wall curves even slightly, you are projecting the error the whole length of the room. Method two: find two points, one on each side, that are the same distance from the far corner, and join them. You do not need to know anything about the walls. The second method is uglier, needs more walking, and is right. That is the equal-shadow method's entire argument.`
    },
    naming: `The Field Guide says to wait fifteen to twenty minutes between the marks, which makes it sound as though the wait is what you are getting wrong. It is not. At Columbus on 21 June, two hours before noon, waiting fifteen minutes gives **11.4°** of error and waiting twenty gives **11.2°**. The wait barely matters. **When you start** changes the answer by a factor of thirty, and almost nobody says so.`,
    formalNames: {
      terms: [
        { term: `Two-mark method`, meaning: `Mark the shadow tip, wait, mark it again, call that line east–west. Fast, needs no patience, and approximate in a way that depends violently on the date and the hour.` },
        { term: `Equal-shadow method`, meaning: `Mark the tip in the morning, draw a circle through it centred on the stick, and mark where the tip returns to the circle in the afternoon. The line joining the two marks is east–west.` },
        { term: `Chord`, meaning: `A straight line joining two points on a curve. The two-mark method's line is a chord, which is the whole of its problem.` },
        { term: `Hyperbola`, meaning: `The shape the shadow tip traces on any day except the equinoxes. On the equinoxes the Sun's declination is zero and the shape degenerates into a straight line.` },
        { term: `Symmetry about the meridian`, meaning: `The property the good method leans on: the Sun is as high an hour before noon as an hour after, so the shadow is as long before as after.` },
        { term: `Systematic error`, meaning: `An error that is the same every time you repeat the measurement, so repeating it does not help. The two-mark method's error is systematic — taking ten careful readings on a December morning gives you ten wrong answers that agree.` },
        { term: `Perpendicular`, meaning: `At right angles. Having found east–west, north–south is the perpendicular through the stick — and getting THAT square matters as much as the line itself.` },
        { term: `Declination drift`, meaning: `The Sun's declination changing during the day — up to about 0.4° between dawn and dusk near an equinox. It is the only thing the equal-shadow method cannot defend itself against.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `"Roughly right" is a thing people say about a lot of methods. Where have you met it?`,
    items: [
      `A recipe that says "about 20 minutes" and burns at 18.`,
      `Judging distance by eye and being badly wrong across water.`,
      `A rule of thumb at work that everyone knows the exception to.`,
      `Pacing out a room and finding the carpet doesn't fit.`,
      `"Measure twice, cut once" — and still cutting it wrong.`,
      `Weather folklore that works in one season and not another.`
    ],
    ownPlaceholder: `A rule of thumb you trusted until the day it didn't work…`,
    synthesis: `Every one of those is a method with a hidden condition attached — and the trouble is never that the method is bad, it is that the condition went unmentioned. The two-mark shadow method is a fine method in March. It is published without the month.`,
    builder: {
      body: `Try the crude method twice on the same day: once within half an hour of midday, once in the last hour before sunset. Mark both lines on the ground with string. They will not agree, and the evening one will be the wild one. You can do this in a car park. The disagreement between your two pieces of string is a measurement of the Earth's axial tilt, taken with stones.`
    },
    acrossCultures: {
      place: `THE ISLAMIC WORLD, 9TH CENTURY ONWARDS`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Muslims pray facing the Ka'ba in Mecca, which turns "which way is Mecca from here?" into a problem that had to be solved for every new town, in an era with no compass. Scholars attacked it from both ends. The mathematicians — al-Battani, al-Biruni and others — worked it as spherical trigonometry: given the latitude and longitude of both places, the direction of the great circle between them follows exactly, and al-Biruni's treatment of it is a serious piece of mathematics in its own right.`,
        `But there is also a shadow method, and it is the cleanest trick in this whole week. Twice a year the Sun passes directly over Mecca, and at those instants a vertical stick anywhere on the sunlit side of the Earth throws its shadow directly **away** from Mecca. You do not need to know your own latitude, your longitude, or any trigonometry at all — you need to know the date and the time, and then to look at the ground.`
      ],
      uncertain: `How mosques were actually oriented is a separate question from how scholars said they should be, and the two often disagree: many early mosques face the direction of a tradition, a road grid, or the Prophet's own mosque rather than a computed great circle, and some are tens of degrees off a modern calculation. Whether particular early orientations were mistakes, deliberate alternative conventions, or built to a folk-astronomical scheme is still argued over.`,
      sources: `King, "The Sacred Direction in Islam," *Interdisciplinary Science Reviews* (1985); King, *World-Maps for Finding the Direction and Distance to Mecca* (1999); al-Biruni, *Taḥdīd nihāyāt al-amākin*, translated by Ali as *The Determination of the Coordinates of Positions for the Correction of Distances between Cities* (1967).`
    }
  },

  feynman: {
    line: `Now you explain the trap.`,
    instruction: `A friend has read the stick-and-two-stones method in a survival book and is about to use it to walk out of a wood in December, at four in the afternoon. Explain what will happen and what they should do instead.`,
    banned: ['gps', 'app', 'just head'],
    bannedNote: `Banned because each is a way of not answering.`,
    placeholder: `The method they've read isn't wrong exactly, but…`,
    checks: [
      `It says the two-mark line is a chord of a curved path, and that is why it can be badly wrong.`,
      `It gives a real number for how wrong — a figure from the simulation, not "quite a lot".`,
      `It names the conditions that make it bad: far from noon, far from an equinox.`,
      `It offers the equal-shadow method, or waiting for noon, as the thing to do instead.`
    ],
    closing: `If your explanation said "it's only approximate", that is what the survival book said. Approximate by how much, on what date, at what hour?`
  },

  challenge: {
    voice: 'editor',
    line: `One prediction and one question that has caught people out.`,
    prediction: {
      question: `You are going to use the two-mark method. Which change buys you the most accuracy?`,
      options: [
        {
          id: 'noon',
          text: `Doing it within half an hour of midday instead of late afternoon.`,
          verdict: `This one, by a mile. At Columbus in December that is the difference between about 2° and about 31°. Nothing else you can change comes close, and it costs nothing but waiting.`
        },
        {
          id: 'wait',
          text: `Waiting forty minutes between marks instead of fifteen.`,
          verdict: `Almost nothing. Measured at Columbus on 21 June, two hours before noon: 11.4° with a fifteen-minute wait, 11.2° with twenty. A longer wait gives you a longer line, which is easier to draw accurately, but it does not fix the error — the error is in the shape of the path, not in your draughtsmanship.`
        },
        {
          id: 'taller',
          text: `Using a taller stick so the marks are further apart.`,
          verdict: `A taller stick genuinely helps your DRAWING — Guo Shoujing's forty-*chi* gnomon in Lesson 12 was built on exactly that reasoning. But it scales the whole picture up, error included. A 21° error drawn at twice the size is still 21°.`
        }
      ]
    },
    open: {
      question: `Both methods give you an east–west line. How would you get north–south from it, and where could that step go wrong?`,
      placeholder: `I'd construct a perpendicular by…`,
      reveal: [
        `A perpendicular through the stick's base, and the honest way to build one is the old compass-and-string construction: from two points equally spaced along your east–west line, scribe equal arcs with a loop of string and join where they cross. Stepping it off by eye is where people quietly lose five degrees after doing the hard part correctly.`,
        `There is a subtler trap too. Your east–west line was drawn between two shadow-TIP marks, but the north–south line has to pass through the **base** of the stick, not the midpoint of the marks. On a day when the two marks are not symmetrical about the meridian — which is every day you use the crude method — the midpoint is not due east or west of the base, and taking the perpendicular at the midpoint instead of at the base adds a second error on top of the first.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-08',
        label: `Navigation, Lesson 8 — learning to use a compass`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `You now know a published, widely repeated method can be thirty degrees wrong without saying so. Write down one other instruction you follow — in any part of your life — that you have never seen the conditions for.`,
    placeholder: `Something I do because I was told to, without knowing when it stops working…`,
    mapFooter: `You can find true north from the Sun, and say how far wrong you might be. That second half is the lesson.`,
    tomorrow: `Tomorrow: the Sun will tell you the time as well as the direction — but it disagrees with your watch, by up to three-quarters of an hour, for two entirely separate reasons.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Think of the two methods as two compasses. One of them has a needle that sticks: it reads correctly when you happen to be pointing one particular way and drifts further off the further you get from it. The other reads correctly everywhere but takes four hours. You would not say the sticky one is "approximate" — you would say it works at one bearing and lies at the others, and you would want to know which bearing. The two-mark method's good bearing is noon.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Picture the shadow tip's path drawn on a map as a shallow curve running roughly east–west. The two-mark method takes a ruler, lays it across two points of that curve twenty minutes apart, and declares the ruler's direction to be east–west. Whether that is true depends entirely on which part of the curve the ruler is on — near the curve's lowest point it is nearly right, out on the arms it is tilted. The equal-shadow method never uses a ruler on the curve at all; it uses a pair of compasses centred on the stick.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Take a dinner plate and lay a ruler across it near the edge, touching the rim at two points a short way apart. The ruler's direction depends on where on the rim you are — that is the two-mark method, and the plate's curve is the shadow path. Now instead tie a string to the plate's centre and find two points on the rim that the string reaches equally: the line between those two is square to the line from the centre, wherever you choose them. That is the equal-shadow method, and it does not care about the curve.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `In the simulation there are three marks, and the important one is the plain white circle: both methods start from exactly that mark. All that differs is what you do next. The red dashed line runs to a mark twenty minutes later. The green line runs to the mark where the shadow came back to the same LENGTH, which is the dotted circle round the stick. Watch the dotted circle as you drag the first mark: it is the whole method, drawn.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `Columbus, 21 December, first mark at 10:30 in the morning. Twenty minutes later you mark again and join them: your line is 21° off true east–west. You walk a mile on the north–south you build from it, and at 31 yards of error per mile per degree you finish about 680 yards from where you meant to be — well over a third of a mile, across a valley you did not intend to cross. Using the same first mark but waiting until the shadow is that length again — two hours the other side of noon, about half past two — your line is right to a hundredth of a degree, and the error after that mile is under a yard.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Ask three questions in order. One: what shape does the shadow tip trace today? A straight line at the equinox, a curve otherwise. Two: does my method assume it is straight? The two-mark method does; the equal-shadow method does not. Three: how curved is it right now, where I am standing? Most curved far from noon and near the solstices. Put those together and you can predict, before you start, whether the quick method is safe today — which is the only skill in this lesson.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from the result: in December the crude method is 21° wrong two hours before noon, and the careful one is 0.00° wrong. Why would a method be exactly right? Because it rests on a symmetry rather than on an approximation — and symmetries are either there or not. Why would the other be 21° wrong rather than 2° or 40°? Because its error is the curvature of the path across a twenty-minute chord, and in December at 40° north, that is what the curvature comes to. Both answers come from the same picture: one method reads the curve, the other refuses to.`
    }
  ],

  map: [
    { name: `Shadow direction and length`, level: 4 },
    { name: `The noon line`, level: 4 },
    { name: `Two-mark vs equal-shadow`, level: 3 },
    { name: `Knowing a method's limits`, level: 3 },
    { name: `The Sun's daily path`, level: 4 },
    { name: `Solar declination`, level: 4 },
    { name: `Solar noon`, level: 4 },
    { name: `Altitude and azimuth`, level: 4 },
    { name: `Converting a bearing`, level: 5 },
    { name: `Taking a bearing`, level: 5 },
    { name: `Declination`, level: 5 },
    { name: `True, magnetic & grid north`, level: 5 },
    { name: `Position`, level: 5 }
  ]
}
