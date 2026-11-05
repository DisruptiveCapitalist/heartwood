// Navigation · Field Week · Lesson 32 — water knows the way down
//
// Field Guide Chapter 18, and the one lesson in the course with a safety note
// rather than a caution. The chapter asks for it in those terms and it is
// right to: "following a stream downstream is not guaranteed to lead to
// people, roads, or safety" is the single most repeated piece of outdoor
// folklore and it has killed people.
//
// MEASURED IN src/lib/field.js, CHECKED IN src/__tests__/field.test.js.
// The sheet is six miles by four and a half, from 974 feet down to 637, and
// everything on it — the contours, the streams, the walks — comes out of one
// height function, so the picture cannot disagree with the numbers.
//
//   A WATERCOURSE HAS NO DIRECTION. The longest walk on the sheet is 8.4
//   miles and faces through 225° OF THE COMPASS before it is done — five
//   eighths of the circle, from 090 round to 315. The average of those
//   bearings is not a fact about anything.
//
//   AND IT DOES NOT ALWAYS COME OUT. One hollow in the middle of the sheet
//   takes 5,273 acres of drainage — about a third of everything — and has no
//   outlet at all. Two walks that begin 220 YARDS APART on the same hillside
//   end in different worlds: one leaves the sheet after 5.9 miles, the other
//   stops after 3.4 in standing water with the walker in the middle of it.
//
//   Closed basins are not an invention of this simulation. Glaciated country
//   is full of them, which is exactly why Ohio has so many swamps, and why
//   "follow the water" is worse advice here than almost anywhere.
//
// The chapter's other required caution — that V-shaped contours generally
// point upstream, and that not every junction or valley shape is a
// directional sign — is in the copy, and the simulation draws the contours
// from the same field as the streams so a learner can check it.

export default {
  id: 'lesson-32',
  number: 2,
  week: 7,
  title: `Water knows the way down`,
  openingQuestion: `Water is the most honest sign in the landscape. It always goes downhill, it never lies, and it will not tell you which way is north — and it does not promise to come out anywhere.`,
  concept: `Drainage describes the ground`,

  fieldGuide: {
    chapter: 18,
    title: `Water and Drainage`,
    exercise: `Take a contour map of real country and a pencil, and do this before you ever do it in the field. Pick a stream and trace it from a source to wherever the sheet stops showing it, writing down the bearing every half mile. Then look at your list: that is what "follow the stream" commits you to. Now find the V-shapes where contour lines cross the stream and satisfy yourself that they point upstream, towards higher ground — and then find somewhere on the sheet where closed contour rings mark a hollow with no stream leaving it, because that is the thing the folklore does not mention.`
  },

  see: {
    voice: 'professor',
    line: `A sheet six miles by four and a half, and a rule everybody has heard. Start on the west slope and watch the dashed line, not the numbers.`,
    simulation: { id: 'field', props: { mode: 'water' } },
    observations: [
      { text: `Following the water from the west slope is a walk of **8.4 miles** — and it faces through **225° of the compass** on the way, swinging from 090 round to 315. That is five eighths of the circle. At no point is the stream doing anything but going downhill, and at no point is it telling you anything about north.` },
      { text: `Now the two starts on the north-west ridge. They are **220 yards apart** — two minutes' walk on the same hillside. From the upper one the water runs 5.9 miles and leaves the sheet. From the lower one it runs 3.4 miles and **stops**, in a hollow with **5,273 acres** draining into it and nothing at all draining out.`, emphasis: true },
      { text: `Press SHOW WHAT DRAINS THERE and look at how much of the map is shaded. Nearly a third of this ground sends its water to a place with no exit. That is not a trick of the drawing: glaciated country is full of closed hollows, which is why Ohio has the swamps it has — and why "follow the water and you'll come out somewhere" is worse advice here than in most places.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences about the most reliable sign in the landscape and the two things it will not do.`,
    sentences: [
      `**Drainage is a description of the shape of the ground, and it is a complete one.** Water takes the steepest way down from wherever it is, so the pattern of streams on a map is the terrain's own account of itself: where the streams converge you are in a valley, where they diverge you are on a spur, where they are close together the ground is steep, where they are absent it is either flat or porous. Read that way, water is the best thing on the map. Every one of those statements is about SHAPE, and none of them is about direction.`,
      `**So the stream will tell you where you are, if you know the drainage, and never where north is.** This is worth separating carefully, because the first half is genuinely powerful: if you are lost but can find a stream, identify which stream it is, and work out whether you are above or below a confluence, you have a position — which is more than a compass alone can give you. What you cannot do is take the stream's direction for a bearing. A watercourse bends to the ground, and the ground has no opinion about the pole.`,
      `And **downhill is not a synonym for out.** The folk rule assumes every drop of water eventually reaches the sea by a route a person could walk beside, and in a great deal of real country that is false — in glaciated country, in limestone, in deserts, in any ground with closed basins, and most of all in flat country, where the stream simply spreads out and becomes a swamp with no bank to walk on. Even where the water does get out, its route is chosen for water: it will take a gorge a person cannot follow, go under a rock shelf, or run through five miles of alder thicket. The honest version of the rule is that water reliably goes downhill, and that walking downhill is often good advice for reasons that have nothing to do with the stream.`
    ],
    comparison: {
      label: `THE RAIN ON THE WINDSCREEN`,
      body: `Watch a drop of rain crossing a car windscreen. It never goes straight down. It runs into a scratch and follows it sideways, meets another drop and jumps to it, stalls on a flat patch and sits there until something arrives to push it on. Every single move it makes is downhill — and if you tried to work out which way the car was facing from the path of the drop you would get nonsense, because the path is a record of the glass. The drop that stops in the middle of the screen and never reaches the edge is the hollow, and there is one on every windscreen in the rain.`
    },
    naming: `The ground that feeds one stream is its **catchment** or **watershed** — the second word is used for the area in American usage and for the ridge dividing two areas in British, which is worth knowing before an argument. The dividing ridge is the **divide**; where two streams meet is a **confluence**; a hollow with no outlet is an **endorheic** or **closed basin**. On a contour map the diagnostic to learn is the **V rule**: where contour lines cross a watercourse they bend into a V, and the V points **upstream**, towards the higher ground — because the contour has to go up the valley, round the stream and back down the other side. The same bend round a spur makes a rounder, blunter nose pointing downhill, and telling the two apart on a crowded sheet is a genuine skill. In the field, following a stream deliberately because it keeps you honest is using it as a **handrail**, which is Lesson 27's word, and that is the one use of a stream this lesson is entirely happy with.`,
    formalNames: {
      terms: [
        { term: `Catchment`, meaning: `All the ground whose water passes through one point. Tap a stream on the simulation and the shaded area is its catchment.` },
        { term: `Divide`, meaning: `The line of high ground separating two catchments. Rain falling either side of it ends up in different rivers, and often in different seas.` },
        { term: `Confluence`, meaning: `Where two watercourses join. The most useful single feature for fixing a position in stream country, because confluences are identifiable and streams are not.` },
        { term: `The V rule`, meaning: `Contours crossing a stream bend into a V pointing UPSTREAM. Contours crossing a spur bend into a blunter nose pointing downhill. The two are the whole of reading a drainage map.` },
        { term: `Closed basin`, meaning: `A hollow whose water has no way out. Common in glaciated and in arid country, and the reason "follow it down" is not a plan.` },
        { term: `Handrail`, meaning: `A long feature followed deliberately because it cannot accumulate error — Lesson 27's term. A stream is an excellent handrail and a poor compass.` }
      ],
      note: `The safety note belongs here rather than in a footnote, because the Field Guide's chapter is explicit about it and because it is the one piece of advice in this course that gets people killed. **Following a stream downstream is not guaranteed to lead to people, roads or safety.** It may lead to a gorge, a swamp, a lake with no shore path, or a basin with no outlet, and it will often lead into the thickest vegetation and the worst footing in the area, at the end of the day, with you wet. If you are going to use water, use it as a handrail towards something you have identified on a map — and if you have no map, "downhill" and "downstream" are different pieces of advice and only the first one is reliable.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where else does something follow a perfectly simple rule and still end up somewhere you would not have predicted?`,
    items: [
      `A drop of rain finding its way down a window.`,
      `Spilt milk on a kitchen floor heading for one particular corner.`,
      `Water pooling in one dip of a path that never seems to dry.`,
      `A marble on an old wooden floor.`,
      `A gutter that overflows at the same spot every storm.`,
      `Snow melting off a roof and refreezing along one edge.`
    ],
    ownPlaceholder: `Something that follows a simple rule and still surprises me…`,
    synthesis: `The kitchen floor is the one that teaches the most, because the milk reveals something nobody in the house knew: there is a dip by the cupboard, and the floor is not level. One spill maps the whole room in a second. That is exactly what a drainage pattern does for country — it is a survey of the shape of the ground, carried out continuously by gravity and free to read. And nobody has ever looked at the puddle by the cupboard and concluded anything about which way the house faces.`,
    builder: {
      body: `Two versions, and do the indoor one first. On a contour map of country you know, find the divide: trace it as a continuous line of high ground and satisfy yourself that water either side goes to different places. You will probably find it runs somewhere surprising, like down the middle of a road you have driven for years. Then outdoors, in rain, find any slope and follow one runnel for as far as it goes, writing down each time it changes direction by more than about thirty degrees. Do not plan where you will end up. The point of the exercise is to find out that you could not have.`
    },
    acrossCultures: {
      place: `THE PORTAGE PATH, OHIO`,
      label: `DOCUMENTED REGIONALLY`,
      paragraphs: [
        `Between the Cuyahoga, which runs north into Lake Erie, and the Tuscarawas, which runs south to the Muskingum and so to the Ohio, there is a walk of about eight miles. It is the Portage Path, and it was in use long before it was written down: canoes and goods came up one river as far as they could be carried, were taken overland, and went on down the other. What a traveller gained was the two halves of the continent — the Great Lakes on one side of the walk and the Mississippi system on the other.`,
        `The point for this lesson is what the path IS. It is not a route between two places; it is a route between two **catchments**, and it exists exactly because the drainage made it necessary. Its position is set by where the divide is narrowest, which is a fact about the shape of the ground and nothing else. People who used it were reading drainage at the largest possible scale — not to find north, but to find the one place where water stopped being a road. It became a treaty boundary at Fort McIntosh in 1785, and it gave Portage County its name; a route decided by the lie of the land ended up drawn on political maps.`
      ],
      uncertain: `The accounts disagree on a good deal. Which nations used it, and when, is given differently by different sources — Seneca, Delaware, Huron, Shawnee and Ojibwe all appear — and the honest summary is that it was in use by many people over a long period rather than belonging to one. The treaty history is also reported inconsistently, with the 1785 Treaty of Fort McIntosh and the 1795 Treaty of Greenville both cited for the boundary, and the lines they drew were not the same. The exact course of the path is a reconstruction: the modern marked route through Akron is an interpretation of the historical record, not a surviving trace, and the eight-mile figure is approximate.`,
      sources: `Tanner (ed.), *Atlas of Great Lakes Indian History* (1987); Mills, *Archaeological Atlas of Ohio* (1914).`
    }
  },

  feynman: {
    line: `Somebody is about to set off downhill along a stream because they read it in a book.`,
    instruction: `Explain what a stream is genuinely good for in navigation, and what is wrong with the advice to follow one until you come out somewhere.`,
    banned: ['downstream', 'civilisation', 'sea'],
    bannedNote: `The first is the advice itself, and using it lets you argue about the word instead of the idea. The other two are the destinations the folklore quietly promises and cannot deliver — name an actual thing the water might do instead, and the problem explains itself.`,
    placeholder: `Water always goes downhill, and that tells me a lot about the ground, but…`,
    checks: [
      `It says what the pattern of watercourses tells you about the shape of the ground.`,
      `It explains why a watercourse's direction is not a bearing.`,
      `It gives at least one real reason the water might not bring you out.`,
      `It says what a stream IS safely useful for.`
    ],
    closing: `The honest test: would your explanation stop somebody at dusk, tired, at the top of a valley, from setting off down it? That is when the advice gets taken, and a version that sounds like a quibble about definitions will not stop anybody.`
  },

  challenge: {
    voice: 'editor',
    line: `A question about a rule that is true, which is the hardest kind to use.`,
    prediction: {
      question: `You find a contour map showing a V where the lines cross a watercourse. The V points north-east. What have you learned?`,
      options: [
        {
          id: 'uphill',
          text: `That the ground rises to the north-east, so the water is running south-west at that point.`,
          verdict: `Right, and the rule is worth having because it is one of very few in this week that is reliable — the contour has to run up the valley, round the stream and back, so the bend must point towards the higher ground, which is upstream. But notice exactly how much you have learned: the direction of ONE short reach of ONE watercourse. The next V half a mile down the sheet may point somewhere entirely different, and the simulation's longest stream faces through two hundred and twenty-five degrees before it finishes. The V is a local truth, correctly read.`
        },
        {
          id: 'north',
          text: `Not much on its own — but since most rivers run roughly south or east, it probably means north is behind you.`,
          verdict: `There is no "most rivers". Rivers run the way their ground falls, and the ground falls the way the geology left it: the Nile runs north, the Rhine runs north, the Ohio runs west and south-west, the Yukon runs north-west and the Amazon east. Any rule of the form "rivers generally run in direction X" is a statement about the speaker's home catchment, and that is exactly the mistake this whole week is built around — a local fact mistaken for a general one. The V told you the truth and then you added something to it that was not there.`
        },
        {
          id: 'junction',
          text: `That there is a confluence near that point, because V-shapes in contours mark junctions.`,
          verdict: `This confuses two different bends and it is a common slip. A V in the contours happens wherever a contour crosses a valley, whether or not any other stream joins there — it marks the valley, not the junction. Junctions are worth hunting for, and for a better reason than this: a confluence is an identifiable feature, so finding one and matching it to the map gives you a position, while a stretch of anonymous stream does not. But you find them by matching the pattern of the drainage to the sheet, not by looking for Vs.`
        }
      ]
    },
    open: {
      question: `If a stream is a bad compass and an unreliable way out, what would you actually do with one?`,
      placeholder: `The useful thing about a stream is…`,
      reveal: [
        `Use it as a handrail, and use the drainage as a map. Those are two different things and both are good. The handrail is Lesson 27: a stream is a long feature you cannot lose, so walking beside it holds a line without any accumulating error at all — which makes it the ideal thing to aim off towards and then follow. The drainage is better still: if you can match the pattern of streams around you to the pattern on the sheet, you have a position, and a confluence is one of the few features in rough country that is unmistakable.`,
        `And if you have no map, the stream is still telling you the truth about the ground — which way the land falls, where the valleys run, where the flat ground is. Tomorrow the signs get much weaker, because tomorrow they are alive, and living things respond to so many things at once that reading one of them for direction is close to reading tea leaves. The arithmetic for that is unkind and quite precise.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-27',
        label: `Navigation, Lesson 27 — when the instruments fail`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `Where does the rain that falls on your roof go? Trace it as far as you can — the gutter, the drain, the stream, the river — and write down where you stop being sure. Almost everybody stops within two steps.`,
    placeholder: `The water off my roof goes…`,
    mapFooter: `Field Week, two of five. The most reliable sign in the landscape, and the most dangerous piece of advice in the outdoors.`,
    tomorrow: `Tomorrow the signs are alive, and the arithmetic turns unkind. Even granting the moss its best case, the place where it grows thickest is the place where it tells you least.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Walk beside a stream for a mile with the compass in your hand and take a bearing along the water every two hundred paces. You will end with a column of numbers that have no average worth writing down, and that is the lesson in your own handwriting. Then do the useful thing with the same compass: take a bearing from where you stand to a confluence you can identify on the map, and another to a hilltop. Those two cross. The stream never will.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Put your thumb on any stream on a contour sheet and follow it with your eye, and watch what the contours do as you go. Where they bend into a V, the point of the V is upstream. Where they bunch together, the stream is steep and probably unwalkable; where they spread apart, it is flat, and flat means wet. Now look for closed rings with no stream leaving them: those are hollows, and the water that goes in stays there. A drainage map read this way stops being decoration and becomes the most information-dense thing on the sheet.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Wet a draining board and watch where the water goes. It will pick one route, and it will be the same route every time — because the board has a shape and the water is simply reporting it. Now tilt the board a little and the route changes completely. You have just learned the whole lesson: the path is a fact about the surface, it is perfectly repeatable, and it tells you nothing whatever about which way the kitchen faces.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `Ignore the contours at first and look only at the blue dots, which are where enough water has gathered to make a stream. See how they join: many small ones feeding fewer big ones, like veins. Now press the two north-west ridge starts in turn and watch the dashed line. Those two walks begin two hundred and twenty yards apart. One leaves the sheet and one stops dead in the middle of it, and nothing you could see from the starting point would tell you which you were on.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `You start on the west slope and follow the water. The first half mile runs east. Then the valley swings and you are going south-east, then south, then — three miles in, around a spur — west of south, and by the end you are walking north-west. Eight and a half miles, and the bearing has covered two hundred and twenty-five degrees. If at any point in that walk somebody had asked you which way north was, and you had answered from the stream, you would have given a different wrong answer each time.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Four questions for any watercourse. One: which way is it going right here — which you can see, and which is a fact about here. Two: what catchment am I in, which the map will tell you and which is genuinely useful. Three: where does this water go, which the map may or may not tell you and which you should not assume. Four: can I identify a confluence near me? If yes, you have a position. The fourth question is worth more than the other three together.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Work backwards from what search and rescue teams actually say, which is that following water downhill is how a surprising number of lost people end up needing to be rescued twice. Why would a true rule — water goes downhill — produce that? Because the rule answers a question nobody was asking. The lost person wants to reach people; the water is going to the lowest available place, which in settled country is often where people are, and in wild country is a swamp. The rule and the goal only coincide where somebody built a town on the river, and whether they did is not something the stream can tell you.`
    }
  ],

  map: [
    { name: `Drainage describes the ground`, level: 4, fresh: true },
    { name: `Catchment and divide`, level: 4, fresh: true },
    { name: `The V rule`, level: 4, fresh: true },
    { name: `Closed basins`, level: 3, fresh: true },
    { name: `A sign of conditions is not a sign of direction`, level: 4 },
    { name: `Wind is local`, level: 4 },
    { name: `Catching features and handrails`, level: 5 },
    { name: `Knowing a method's limits`, level: 5 }
  ]
}
