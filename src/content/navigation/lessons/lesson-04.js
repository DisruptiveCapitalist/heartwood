// Navigation · Week 1 · Lesson 4 — maps: turning the Earth into a picture.
//
// The brief (§3, Week 1) asks for four things in one lesson: scale, symbols
// and legends; why flattening a curved Earth distorts it; contour lines; and
// topographic elevation. That is two different subjects, so MapMaker has two
// tabs and the lesson teaches them as two halves of one bargain — a map always
// trades something away, and the only question is what.
//
// Every figure here was measured off the simulation before it was written.
//
//   FLATTEN IT — drawn areas, measured by shoelace from the actual polygons
//     true areas   Greenland 836,330 sq mi · Africa 11,724,000 sq mi → 14.0×
//     globe        Africa measures 15.3× Greenland at this viewing angle
//     Mercator     Africa measures  1.0× Greenland — the famous illusion
//     equal-area   Africa measures 14.0× Greenland
//     Mercator's area stretch is 1/cos²(latitude): ×2 at 45°, ×4 at 60°,
//     ×8.5 at 70°, ×33 at 80°.
//
//   READ THE GROUND — one height field, contoured live
//     6 ft of ground per pixel; the sheet covers 1.02 × 0.64 miles
//     summit 1,689 ft · saddle 1,295 ft · lowest ground 1,200 ft
//     40-ft interval → 12 lines; 20-ft → 24; 100-ft → 4
//     steep face   47 ft per 100 (25°) → 40-ft lines  85 ft apart
//     ridge top     9 ft per 100  (5°) → 40-ft lines 433 ft apart
//     the A–B section runs 0.92 miles: up to 1,676 ft, down to a saddle at
//     1,286 ft, up again to 1,504 ft, then away.

export default {
  id: 'lesson-04',
  number: 4,
  week: 1,
  title: `Maps: turning the Earth into a picture`,
  openingQuestion: `Peel an orange and try to press the peel flat on the table. It tears. A map is somebody doing that to the whole Earth anyway — so what did they decide to give up?`,
  concept: `Every flat map trades something away`,

  fieldGuide: {
    chapter: 3,
    title: `Maps and the Shape of the Land`,
    exercise: `Finding a real hill on a topographic map, reading its contour interval off the legend, and counting lines from bottom to top to get the climb — what the second tab does with one invented hill.`
  },

  see: {
    voice: 'professor',
    line: `Two tabs, two different problems. Start with the globe, then press Mercator and watch Greenland.`,
    simulation: { id: 'map-maker' },
    observations: [
      { text: `On the globe, Africa measures about **15 times** the size of Greenland. The truth is **14 times** — the small error is the globe's own edge, squashing what sits near the rim.` },
      { text: `On **Mercator**, Africa measures **the same size** as Greenland. Not a trick of the eye: the drawn shapes really are equal, and the map is out by a factor of fourteen.` },
      { text: `On the **equal-area** map, Africa measures 14 times Greenland — correct. Look what it did to Greenland's shape to get there.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and then the second half of the lesson.`,
    sentences: [
      `A ball's surface cannot be laid flat without stretching, tearing or squashing it — that is a fact of geometry, not a failure of mapmaking. So every flat map is a **projection**: a rule for turning two angles into two positions on paper, and every rule gets some things right by getting others wrong.`,
      `A map tells you what it kept by what it says about itself. **Mercator** keeps every compass direction as a straight line, which is why sailors have used it for four centuries, and pays for it in size — the stretch is about double at 45°, four times at 60°, thirty-three times at 80°. An **equal-area** map keeps sizes honest and pays in shape. Nothing keeps both.`,
      `Close to home the argument goes away, and a map can simply be a picture of the ground: a **scale** that says how many feet to the inch, a **legend** that says what the marks mean, and **contour lines** joining all the points at the same height — so that where the lines crowd together the ground is steep, and where they spread out it is gentle.`
    ],
    comparison: {
      label: `THE SHADOW ON THE WALL`,
      body: `Hold your hand up in front of a lamp and look at the shadow on the wall. Turn your hand one way and you can make the shadow show the length of your fingers truly, but the width is wrong. Turn it another way and the width comes right, but now the fingers are stubs. The shadow is a flat picture of a three-dimensional thing, and you can choose which part of the truth it tells — but you cannot have all of it, and no amount of care with the lamp will change that. Every projection is a choice of how to hold the hand.`
    },
    naming: `The crowding of contour lines is the part worth practising, because it turns a flat drawing back into real ground. On the sheet in SEE IT the lines are drawn every 40 feet. On the **steep face** of the hill, where the ground falls 47 feet in every 100, those lines sit only about **85 feet apart**. Up on the **broad ridge top**, where it falls 9 feet in 100, the same 40-foot lines are about **433 feet apart** — five times the gap for the same climb. Press "show it from the side" and the cross-section appears: the same ground seen edge-on, climbing to 1,676 feet, dropping into a **saddle** at 1,286, rising again to 1,504. Once you can see that shape in the lines, you can read a hill you have never walked.`,
    formalNames: {
      terms: [
        { term: `Projection`, meaning: `The rule a flat map uses to turn latitude and longitude into a position on paper. There are hundreds, and every one distorts something.` },
        { term: `Mercator`, meaning: `The projection where every compass bearing is a straight line. Invented by Gerardus Mercator in 1569 for exactly that reason. Sizes grow without limit towards the poles.` },
        { term: `Equal-area`, meaning: `Any projection that keeps relative sizes true. Shapes get squashed instead — look at Greenland on the third tab.` },
        { term: `Scale`, meaning: `How much ground one length on the map stands for. Written as a ratio, 1:24,000, or as a bar you can measure against. A **large-scale** map covers a small area in detail; a small-scale map covers the world.` },
        { term: `Legend`, meaning: `The panel that says what the marks mean. Never assume — symbols differ between countries and between map series.` },
        { term: `Contour line`, meaning: `A line joining every point at the same height. It can never cross another contour, and it always closes on itself eventually, even if that happens off the edge of the sheet.` },
        { term: `Contour interval`, meaning: `The height between one line and the next — 40 feet on the sheet in SEE IT. Stated in the legend, and the first thing to look for.` },
        { term: `Index contour`, meaning: `Every fifth contour, drawn heavier and labelled with its height, so you can count without losing your place.` },
        { term: `Spot elevation`, meaning: `A single height printed at a point, usually a summit, where contours alone would not tell you the top.` },
        { term: `Saddle`, meaning: `The low point of the ridge between two summits — the easiest place to cross from one valley to the next, and often where a trail goes.` },
        { term: `Topographic map`, meaning: `A map whose main business is the shape and height of the ground, rather than roads or boundaries.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `You have been living with these trade-offs for years. Which ones have you noticed?`,
    items: [
      `A classroom world map where Greenland looked as big as Africa, and nobody mentioned it.`,
      `A phone map that stretches oddly as you scroll towards the top of the world.`,
      `A trail map with a mile of switchbacks squeezed into an inch of paper, because the slope was too steep to go straight up.`,
      `A hiking guide saying "2 miles, 1,800 feet of gain" — distance and height as separate numbers, because the map gives them separately.`,
      `Looking at a topographic map and seeing the lines bunch up where the trail description said "steep section."`,
      `Two maps of the same park, drawn at different scales, showing completely different amounts of detail.`
    ],
    builder: {
      body: `Find a hill near you on any free topographic map — the USGS *topoView* site and most hiking apps will show contours. First, read the legend and find the contour interval. Then put a finger at the bottom of the hill and a finger at the top, and count the lines you cross: each one is that many feet of climb. Multiply. Now look at where the lines are closest together and work out roughly how far apart they are on the ground, using the scale bar. That gap, against the interval, is the steepest part of your hill — and it is the part that will be in your legs tomorrow.`
    },
    acrossCultures: {
      place: `THE MARSHALL ISLANDS, CENTRAL PACIFIC`,
      label: `DOCUMENTED REGIONALLY`,
      paragraphs: [
        `Navigators in the Marshall Islands built lattices of wooden sticks bound with coconut fibre, with small shells marking the islands. These are usually called stick charts. What the sticks represent is not coastline: it is the behaviour of ocean swells — where a swell running in from the open sea bends around an island, and where two swell systems meet and cross. A navigator lying in the hull could feel that interference, and the chart named what to feel for.`,
        `Three kinds are described in the literature. *Mattang* were small square lattices used to teach the principles of swell refraction; *meddo* covered a group of islands; *rebbelib* covered a larger part of the chain. The charts were not carried on the voyage — they were memorised ashore. That is the opposite arrangement from a paper map, and it is worth sitting with: the picture was a teaching instrument, and the sea itself was the thing being read.`
      ],
      uncertain: `Most surviving charts reached museums between the 1860s and the 1940s, often without a record of who made them or what the individual sticks meant to that maker; the three-way classification comes from European observers and may be tidier than the practice was. Reading a chart was personal knowledge, taught within families, and the detailed meaning of particular charts is in many cases no longer recoverable. Voyaging under the old system ended in the colonial period, though Marshallese communities have worked since the 1980s to document and revive the knowledge.`,
      sources: `Davenport, "Marshall Islands Navigational Charts," *Imago Mundi* (1960); Finney, in *The History of Cartography*, vol. 2 bk 3 (1998); Genz, "Resolving Ambivalence in Marshallese Navigation," *Oceania* (2011).`
    },
    ownPlaceholder: `A map that told me something, or misled me…`,
    synthesis: `Notice what all six have in common: the map was not wrong, it was *honest about something else*. The skill is not finding a map that doesn't lie. It is knowing which lie you have in your hand.`
  },

  feynman: {
    line: `This is the stage that counts. Write it and the lesson is yours.`,
    instruction: `A Scout holds up a topographic map and asks: "How can you tell this hill is steep just by looking?" Answer him — **without using the words "contour," "gradient," or "interval."**`,
    banned: ['contour', 'gradient', 'interval'],
    bannedNote: `one of those came back — and the answer is stronger without them`,
    placeholder: `Each of those thin brown lines joins up all the places that are…`,
    checks: [
      `Each line joins every spot at the same height above sea level.`,
      `The height from one line to the next is always the same — the legend says how much.`,
      `So lines close together mean you gain that height in a short distance: steep.`,
      `Lines far apart mean the same height gain spread over a long walk: gentle.`
    ],
    closing: `If your version has "same climb, shorter distance, steeper hill," the Scout will have it too.`
  },

  challenge: {
    voice: 'editor',
    line: `One about the ground, one about the shape of the world.`,
    prediction: {
      question: `Two trails climb the same hill. On the map, trail A crosses eight contour lines in half an inch. Trail B crosses eight lines in two inches. Which is the harder walk, and by how much?`,
      options: [
        {
          id: 'a',
          text: `Trail A — same climb, a quarter of the distance, so about four times as steep.`,
          verdict: `That's it. Eight lines is eight lines: both trails gain exactly the same height, because the spacing between lines is fixed. What differs is how far you walk to earn it. A quarter of the distance for the same climb is four times the slope. This is the whole skill of reading a topographic map, and it works without knowing the scale, the interval, or where in the world you are — crowded lines, steep ground.`
        },
        {
          id: 'b',
          text: `Trail B — it's four times longer, so it's more work.`,
          verdict: `It is a longer walk, and on a hot day that matters. But "harder" in the sense the map is telling you about is slope, and trail B is the gentle one: it spreads the same climb over four times the ground. That is exactly why trail builders put in switchbacks — stretching the distance is how you make a steep hill walkable. Look at the far side of the hill in SEE IT: 9 feet of climb in every 100, against 47 on the steep face.`
        },
        {
          id: 'cant',
          text: `You can't say — it depends on the contour interval and the scale.`,
          verdict: `You need both of those to say *how steep* either trail is in degrees. But you do not need either to compare the two, because they are on the same map: same interval, same scale. Eight lines is the same climb on both, and one does it in a quarter of the distance. Four times the slope, whatever the numbers turn out to be. The comparison is free; only the absolute figure costs you a look at the legend.`
        }
      ]
    },
    open: {
      question: `The Mercator map has been in schoolrooms for a century and a half, and it makes countries near the poles look enormous. If it is that misleading, why has nobody simply replaced it?`,
      placeholder: `Because the thing it gets right is…`,
      reveal: [
        `Because it is not a bad map — it is a map built for a job you are not doing. Mercator's rule makes every compass bearing come out as a straight line on the paper. For a navigator that is worth almost any price: draw a line from here to there, measure its angle, steer that angle, and you arrive. No other projection does that, and for four hundred years it was the difference between a crossing and a shipwreck. The size distortion is not a bug in the design; it is the bill.`,
        `What happened is that the map escaped its job. It is a superb chart and a poor picture of the world, and for a century and a half it has mostly been used as the second. The honest fix is not a better projection — there isn't one — but a better habit: ask what any map was built to keep. Most online maps, incidentally, still use a Mercator variant, for a reason Mercator would have recognised: it keeps shapes locally correct at every zoom, so a street corner looks like a street corner.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-02',
        label: `Lesson 2 — why a small patch of a ball looks flat`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then you're done.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 5 closes the week: a real map, a pair of coordinates, and the question the whole week has been building to — where am I, and how would I tell somebody?`
  },

  routes: [
    { id: 'compass', label: `Explain it with a compass`, body: `Here is why Mercator exists. Set a compass to 060° and walk it faithfully across a thousand miles of ocean. On the real Earth your track is a long gentle spiral, because you keep cutting the north-south lines at the same angle while they close in on each other. On almost any map that track comes out as a curve, which is useless for drawing a course. Mercator stretched the map vertically by exactly the amount needed to straighten it — so on his map, and only his map, "steer 060°" is a ruled line. The bloated Greenland is what that straightening costs.` },
    { id: 'map', label: `Explain it with a map`, body: `Put two maps of your own town side by side — a city street map and a page from a state road atlas. On the street map you can see individual buildings; on the atlas the whole town is a dot with a name. Neither is more correct. The street map threw away the rest of the state to make room for the detail; the atlas threw away the detail to make room for the state. That is the same bargain as the projection, just about how much rather than about shape.` },
    { id: 'object', label: `Use an everyday object`, body: `Take the paper label off a soup can in one piece and lay it flat — it goes down perfectly, because a can is rolled from a flat sheet. Now try the same with the foil cap from a jar of jam, the domed kind. It will not lie down: you have to crease it, stretch it, or cut slits. A can can be flattened and a dome cannot, and the Earth is a dome in every direction. Every world map is that foil cap with the cuts hidden somewhere you weren't looking.` },
    { id: 'diagram', label: `Show me a diagram`, body: `Go back to SEE IT, stay on the first tab, and press the three buttons in order while watching only the readout. Globe: Africa measures 15.3 times Greenland. Mercator: 1.0 times. Equal-area: 14.0 times. Those numbers are measured off the shapes actually drawn on your screen, not quoted from a book. The same two countries, the same data, three pictures, and one of them is out by a factor of fourteen.` },
    { id: 'example', label: `Walk me through an example`, body: `Walk the A–B line on the second tab. Press "show it from the side" so you can see both at once. Start at A: the lines are close together and the side view climbs hard, reaching 1,676 feet about a fifth of the way along. Then the map's lines turn around and start descending; the side view drops into a saddle at 1,286 feet, halfway. Then they climb again, more gently this time — more space between them — to 1,504 feet. The whole walk is 0.92 miles. The lines on the left told you all of that before you ever looked at the side view.` },
    { id: 'smaller', label: `Break it into smaller steps`, body: `Three small questions. One: can a flat sheet be wrapped around a ball with no wrinkles? No — try it with paper and you will feel the answer in your hands. Two: so when somebody draws the ball on a flat sheet, must something come out wrong? Yes, necessarily. Three: can they at least choose *which* thing comes out wrong? Yes, and that choice is what the word "projection" means. The whole first half of this lesson is those three answers.` },
    { id: 'backward', label: `Work backward from the answer`, body: `Start with the answer: Africa is about fourteen times the size of Greenland. Now ask what kind of map would have let you guess that, and what kind would have stopped you. A map that keeps sizes honest would have let you read it straight off. A map that keeps bearings straight — a sea chart — could not, because the two requirements pull in opposite directions. Work backward from the thing you want to know, and you discover which map you should have picked up.` }
  ],

  map: [
    { name: `Earth's shape`, level: 5 },
    { name: `Latitude & longitude`, level: 4 },
    { name: `Map projection`, level: 4 },
    { name: `Contour lines & relief`, level: 4 },
    { name: `Map scale`, level: 4 },
    { name: `Legends & symbols`, level: 3 },
    { name: `Direction vs. position`, level: 4 },
    { name: `Position`, level: 4 },
    { name: `Reference point`, level: 4 },
    { name: `Poles, Equator & hemispheres`, level: 4 },
    { name: `Degrees, minutes & seconds`, level: 3 },
    { name: `The nautical mile`, level: 3 },
    { name: `A chosen zero`, level: 3 },
    { name: `Great circle`, level: 2 },
    { name: `Magnetic north`, level: 0 }
  ]
}
