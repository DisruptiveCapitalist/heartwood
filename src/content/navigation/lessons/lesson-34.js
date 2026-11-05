// Navigation · Field Week · Lesson 34 — reading rock and snow
//
// Field Guide Chapter 21. The chapter's required caution is unusually
// specific and unusually easy to get wrong: glacial markings reveal LOCAL ice
// movement, not necessarily north–south, and interpreting them requires
// regional geological context.
//
// The lesson turns that caution into geometry. An ice sheet does not march
// south from the pole like an army; it spreads outward from wherever it is
// thickest, the way syrup spreads on a plate, and it splits around high
// ground into lobes. So the direction it scratches into a rock is the bearing
// from the dome to THAT rock — which is a different bearing at the next site
// along, and a very different one on the other side of a divide.
//
// MEASURED IN src/lib/field.js, CHECKED IN src/__tests__/field.test.js:
//
//   TWO SITES UNDER THE SAME LOBE, eighty-five miles apart, are scratched
//   7.9° apart. Two sites under different lobes, split by high ground and a
//   hundred and ninety miles apart, are scratched 42.8° apart. Same ice
//   sheet, same winter, three answers.
//
//   And with the geometry alone: sites sixty miles apart and four hundred
//   miles from the dome differ by 8.6°; at a hundred and twenty miles apart,
//   17.1°. The spread is the angle the dome sees them at, and nothing else.
//
// WHAT IS MODEL AND WHAT IS NOT. The radial flow is a model, labelled on
// screen: real ice is steered by the ground beneath it, surges, and changes
// over thousands of years, which is exactly why the chapter demands regional
// context. That the Ohio ice split into a Miami and a Scioto sublobe around
// the high ground of the Bellefontaine Outlier is documented, and is why the
// sublobes have names at all.
//
// The snow half of the lesson needs no new arithmetic: a drift or a cornice
// builds on the LEE of whatever broke the wind, so it records the local wind
// — which Lesson 31 has already shown is not the prevailing wind. Two
// inferences deep, and each one loses something.

export default {
  id: 'lesson-34',
  number: 4,
  week: 7,
  title: `Reading rock and snow`,
  openingQuestion: `Ice does not come from the north. It comes from wherever it was thickest, and spreads — so a scratch in a rock is a bearing to somewhere, and that somewhere is not the pole.`,
  concept: `Marks record local forces`,

  fieldGuide: {
    chapter: 21,
    title: `Geological and Topographical Clues`,
    exercise: `Find glacial striations if your country has them — scoured rock faces, quarry floors, roadside outcrops — and take a bearing along them with the compass. Write it down with the location. Then find the published ice-flow map for your region, which most geological surveys put online, and compare. The exercise is not to check whether you measured correctly; it is to see how much the published direction varies across the map, and to find the nearest place where it differs from yours by more than ten degrees. In Ohio that will not be far.`
  },

  see: {
    voice: 'professor',
    line: `Two lobes of one ice sheet and four sites with striations in the rock. Read the two bearings in the readouts before you think about what they mean.`,
    simulation: { id: 'field', props: { mode: 'ice' } },
    observations: [
      { text: `Site A and Site C are under the same ice sheet in the same age, and their scratches run **42.8° apart**. Neither rock is lying and neither reading is careless. They were scoured by different lobes of the same ice, split by the high ground between — in Ohio, the Bellefontaine Outlier, which is why the Miami and Scioto sublobes have separate names.` },
      { text: `Now take two sites on the *same* lobe. Site A and Site B are eighty-five miles apart with nothing between them, and they still disagree by **7.9°** — because ice spreads outward from where it is thickest, like syrup on a plate, so the direction at any rock is the bearing from the dome to that rock. Move along the edge and the bearing swings.`, emphasis: true },
      { text: `So the scratch is real, permanent and precisely measurable, and it is a bearing **to a place that no longer exists**. Reading it as north is not slightly wrong; on these sites it is between eight and fifty-one degrees wrong, and you would have no way to know which. The chapter's caution is exactly right: these marks need the regional map, and without it they are a direction to nowhere.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one dismantles a picture almost everybody carries.`,
    sentences: [
      `**An ice sheet does not advance from the pole; it spreads from its own middle, in every direction at once.** Snow accumulates over thousands of years until the ice is thick enough to deform under its own weight, and then it flows outward from the thickest point — north as readily as south. A site on the southern edge is scoured from the north because that is where the dome happened to be, and a site on the northern edge of the same sheet is scoured from the south. The scratch records a bearing to the centre of mass of a thing that melted ten thousand years ago, and the only reason it so often looks southward in North America is that most of the continent's exposed rock is south of where the ice was thickest.`,
      `**And the ice splits, so neighbouring regions get different answers.** High ground divides a spreading sheet into lobes the way a rock divides a stream, and each lobe then spreads from its own centre. That is why Ohio's ice flow is described as sublobes with names: the Miami and the Scioto, parted by the Bellefontaine high ground. Two outcrops a county apart can sit under different lobes and be scratched in directions tens of degrees apart, and there is nothing local you could observe that would tell you which side of the divide you were on. This is what the chapter means by regional context: the mark is a local measurement that only becomes information when it is placed on a map somebody else made.`,
      `And **the snow half of the lesson is the same argument, two steps worse.** A drift or a cornice builds on the lee of whatever broke the wind, so it faithfully records the wind of the storm that made it. But Lesson 31 has already shown that the wind of the storm is a fact about the valley, not about the weather — so a drift is a record of a local wind, which was a record of local ground. Each inference is sound and each one loses something, and after two of them there is nothing left that bears on north. What a drift IS good for is the same thing everything in this week is good for: telling you about the place you are standing.`
    ],
    comparison: {
      label: `THE SCRATCH ON THE CAR DOOR`,
      body: `There is a long scrape along the side of a car, and it is an excellent record. You can tell which way the other object was moving relative to the door, roughly how hard, and often what it was — a gatepost leaves a different mark from a wall. A careful person could reconstruct the whole incident from it. What you cannot do is work out which way the car was facing when it happened, because the scrape records the motion of the two objects relative to each other and nothing about the street. The rock is the door. The ice is the gatepost. Ten thousand years later somebody is trying to use the scrape to find north.`
    },
    naming: `The scratches are **striations** or **striae**, and the deeper, larger versions, which can be metres across, are **grooves**; both are cut by stones carried in the base of the ice, so they run along the direction of flow. The high ground that splits a sheet is a **divide** or, where it is a resistant block the ice went around, an **outlier**; the tongues that result are **lobes** and **sublobes**. The unsorted rubble an ice sheet leaves is still called **drift**, which is a fossil of the argument in today's card — the word comes from the theory that it had drifted there on icebergs. A boulder carried far from its home rock is an **erratic**, and erratics are the best directional evidence in the whole of this field, because unlike a striation an erratic can be traced to a source outcrop and therefore gives a line with a known end. On snow: the sculpted, wind-carved ridges on open ground are **sastrugi**, and the overhanging lip that builds on the lee of a ridge is a **cornice**, which is a mountaineering hazard long before it is a navigational sign.`,
    formalNames: {
      terms: [
        { term: `Striation`, meaning: `A scratch cut in bedrock by a stone carried in moving ice. Records the direction of flow at that spot, which is a bearing from the ice dome and not from the pole.` },
        { term: `Lobe`, meaning: `A tongue of a spreading ice sheet, split off by high ground. Each has its own centre and so its own flow directions.` },
        { term: `Erratic`, meaning: `A boulder carried and dropped far from the rock it came from. Traceable to a source, so it gives a line with two ends — the strongest directional evidence in glacial geology.` },
        { term: `Drift`, meaning: `The unsorted material an ice sheet leaves. The name survives from the theory that it was dropped by drifting icebergs, which lost.` },
        { term: `Sastrugi`, meaning: `Wind-carved ridges on open snow, aligned with the wind that cut them. A local wind, so a local sign — and Lesson 31's caution applies in full.` },
        { term: `Cornice`, meaning: `The overhanging lip of snow built on the lee of a ridge. A hazard first: it is unsupported, and it breaks further back than people expect.` }
      ],
      note: `The chapter's caution deserves to be stated as a positive instruction rather than a warning. **Glacial markings show local ice movement, not necessarily north–south, and reading them requires regional geological context** — which means that the way to use them is to carry, or remember, the published flow map for the region you are in. With that map a striation is genuinely useful, because it tells you which part of the map you are on. Without it, it is a precise measurement of nothing you can name.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where else does something leave a perfectly clear record that only means something if you already know the story?`,
    items: [
      `Tree rings — wide and narrow, and useless without a calendar.`,
      `A worn step, which tells you where people walk but not where they are going.`,
      `Scuff marks on a floor where furniture used to be.`,
      `The tideline on a beach after a storm.`,
      `A watermark on a ceiling, days after the leak was fixed.`,
      `Scratches on a pair of old spectacles.`
    ],
    ownPlaceholder: `A clear record that needs a story to mean anything…`,
    synthesis: `The scuff marks are the closest, and they behave exactly like striations. The marks are sharp, permanent and easy to measure; they record the direction something was dragged with complete fidelity; and on their own they do not tell you what was dragged, or where it went, or which way the room was arranged at the time. Give somebody the floor plan and the marks become evidence. Take the plan away and all they have is a direction with nothing on either end of it.`,
    builder: {
      body: `Two things, and the second is the one worth doing. First, find striations near you — a geological survey map will mark them, and quarry floors, river-scoured outcrops and roadcuts are the usual places — and take a bearing. Second, and better: find the published ice-flow map for your region, put your site on it, and then find the nearest mapped site whose flow direction differs by more than ten degrees. Measure the distance between them. That number, in your own country, is the one this lesson is really about, and it is usually much smaller than people expect.`
    },
    acrossCultures: {
      place: `THE NORTH ATLANTIC WORLD, 1840–1875`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `The same scratches have been read two ways, by people who were not fools. When Louis Agassiz argued in 1840 that northern Europe and North America had been buried under land ice, the leading alternative — held by Charles Lyell, the most authoritative geologist alive — was that the unsorted rubble and the scoured rock were the work of **icebergs**, floating across a drowned landscape and grounding as they went. That theory is why the deposits are still called **drift**: the word is a fossil of a hypothesis that lost.`,
        `Crucially, the striations were evidence for BOTH sides. Lyell's supporters pointed out that an iceberg dragging its keel across a valley floor would scratch the rock exactly as a glacier would, and they were right about that. What eventually settled it was not a better reading of any single scratch; it was regional context — the pattern of marks across whole countries, the continuity of deposits, and work such as Archibald Geikie's on Scottish drift in 1863, after which land ice was broadly accepted within about a decade. Forty years of disagreement among the best geologists in the world, and the thing that resolved it was exactly what the Field Guide's chapter demands of a walker: do not read the mark alone, read the map it sits on.`
      ],
      uncertain: `Histories of this debate differ on almost all of its dates, and it did not resolve in one moment or in one place: acceptance came at different times in Britain, continental Europe and North America, and Lyell's own position shifted more than once rather than being abandoned cleanly. Attributing the turn to any single paper, Geikie's included, is a simplification that the historical literature itself argues about. The characterisation of the North American debate as turning partly on Lyell's personal authority is one historian's reading and is contested. What is not in doubt is the shape of the episode: the same marks, two mechanisms, and a resolution that came from regional patterns rather than from local evidence.`,
      sources: `Agassiz, *Études sur les glaciers* (1840); Geikie, "On the Phenomena of the Glacial Drift of Scotland" (1863); Schneer et al., "Agassiz vs. Lyell: Authority in the Assessment of the Diluvium-Drift Problem by North American Geologists", *Earth Sciences History* (1994).`
    }
  },

  feynman: {
    line: `Explain a sign that is permanent, precise, and still not a compass.`,
    instruction: `Explain why a scratch cut in solid rock by ice is a reliable measurement and an unreliable direction — and what you would need in order to use it.`,
    banned: ['glacier', 'scratches', 'ice age'],
    bannedNote: `The first two let you describe the picture instead of the mechanism, and the third invites the cartoon of a wall of ice advancing from the top of the map, which is the misconception the lesson is about. Say what the ice was doing and why that decides the direction.`,
    placeholder: `The mark really does record the direction something moved, but what moved was…`,
    checks: [
      `It says the ice spread outward from somewhere rather than coming from the pole.`,
      `It explains why two nearby places can record different directions.`,
      `It says what the mark IS reliable evidence about.`,
      `It names what you would need in order to make use of it.`
    ],
    closing: `The test: does your explanation also cover why the mark is worth measuring at all? A version that only debunks has thrown away a genuinely excellent piece of evidence — these marks are how the ice sheets were mapped in the first place.`
  },

  challenge: {
    voice: 'editor',
    line: `A question where the right answer and the wrong answer agree about the facts.`,
    prediction: {
      question: `You find striations running 170°–350° and you know your region was glaciated from the north. A friend says this nearly gives you a north–south line. What is the problem?`,
      options: [
        {
          id: 'nearly',
          text: `"Nearly" is doing all the work — you have no idea whether this site is ten degrees off the regional flow or forty.`,
          verdict: `Right, and the structure of the error is the thing to carry away. Your friend has an unquantified belief — "from the north" — and is treating a precise measurement as if it inherited that precision. But the uncertainty in the answer is the uncertainty in the PREMISE, and the premise is a vague regional impression. On the simulation, two sites on the same lobe differ by eight degrees and two on different lobes by forty-three, and nothing visible at either site distinguishes the cases. A precise measurement of a vague quantity is still vague.`
        },
        {
          id: 'sense',
          text: `You cannot tell which end is which — a line is not an arrow, so it might be 170° or 350°.`,
          verdict: `True, important, and not the main problem — though it is a real trap and worth knowing. A striation is a line and does not by itself say which way the stone was travelling along it; you need something else to resolve it, such as crescentic chatter marks, the lee of a plucked face, or a trail of erratics. But that ambiguity is only 180°, and it can often be settled on the spot. The deeper problem survives even when you have settled it: the line is a bearing to a vanished dome, and you do not know where that was without a map.`
        },
        {
          id: 'fine',
          text: `Nothing much — the ice did come from the north, so the line really is roughly north–south.`,
          verdict: `This is how the mistake actually gets made, and it is circular in a way that is hard to see. You know the ice "came from the north" because somebody mapped the striations and worked out where the domes were. Using the regional conclusion to interpret a local mark, and then offering the local mark as independent evidence of direction, is borrowing an answer from the map and presenting it as a measurement. If you have the map, use the map: it is better than the scratch. If you do not have it, the scratch is not a substitute for it.`
        }
      ]
    },
    open: {
      question: `Is there any geological sign that genuinely gives a direction?`,
      placeholder: `The one I would trust is…`,
      reveal: [
        `Erratics, and the reason is instructive. A striation gives you a line with nothing on either end. An erratic is a boulder of a rock type that does not belong where it sits, and if its parent outcrop can be identified — a distinctive granite, a fossil-bearing limestone — then you have a line with a known END, and that is a completely different kind of evidence. It is a bearing to a place you can name and find on a map, which is what every usable thing in this course turns out to be.`,
        `Which is the shape of the whole week, nearly finished. Wind, water, moss, rock: every one is a faithful record of a local force, and every one becomes useful at the moment you can attach it to something named. Tomorrow the signs are made by people, and people, unlike ice, sometimes survey.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-31',
        label: `Navigation, Lesson 31 — the wind has a shape`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `Write down something you believe about the deep history of the ground where you live — where the stone came from, what shaped the valley, why the soil is what it is. Then write down where you learned it. Most of us hold these as facts and cannot say where they came from.`,
    placeholder: `The ground where I live was shaped by…`,
    mapFooter: `Field Week, four of five. A mark cut in solid rock, measurable to a degree, pointing at something that melted ten thousand years ago.`,
    tomorrow: `The last one, and it is the only sign in this week that can be better than your compass. Somebody surveyed it to true north and left it lying on the ground — but only in some places, and in Ohio you can walk from one kind of country into the other in an afternoon.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Put the compass on the striation and you will get a reading good to a degree, because the mark is sharp and straight and long. That precision is genuine and it is the trap: the number is far more precise than anything you can do with it. Write it down by all means — the reading is the easy half and the useful half, if you ever get it onto a published flow map. What the compass cannot supply is the thing that turns a bearing into information, which is knowing what is at the other end of it.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `A geological map is the one that matters here, not a topographic one, and most surveys publish an ice-flow map showing measured striation directions as little arrows across the region. Look at one for a glaciated area and the point makes itself: the arrows fan. They swing round high ground, converge into valleys, and change direction across a lobe boundary. That fanning is the thing the chapter means by regional context, and it is visible at a glance on a map and invisible at the outcrop.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Pour a spoonful of honey onto a plate and watch it spread. It goes outward in every direction from where it landed — not in one direction — and when it meets a crumb it divides and goes round, and the two halves then spread from their own fronts. Drag a fingertip through it anywhere along the edge and the direction of flow at that point is away from where the honey landed. An ice sheet is honey with a longer timescale, and the crumb is the Bellefontaine Outlier.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `Look at the pale lines radiating from each dome before you look at the sites. They fan outward, which is the whole mechanism; the red arrows at the sites are simply whichever pale line happens to pass through that spot. Now switch the second site between C and D, both on the same lobe, and watch the readout: the two bearings stay within a dozen degrees. Then switch to a site on the other lobe and watch it jump past forty. One ice sheet, one picture.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `Site A reads 160° and Site C reads 203° — forty-three degrees apart, with a hundred and ninety miles between them. Suppose you knew only Site A and took its 160° for south. You are twenty degrees out, which over a single mile is six hundred and forty yards, and over a day's walk is most of a mile. Now suppose you had happened to measure at Site C instead and done the same thing: you are twenty-three degrees out the other way. The two mistakes together span forty-three degrees, and nothing visible at either rock would have warned you.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Four questions for any mark in rock or snow. One: what physical process made it, and what direction did that process have? Two: was that process regional or local — the whole sheet, or this valley, or this boulder? Three: has anything since then moved, tilted or weathered the surface it is on? Four: do I have a regional map that tells me what the process was doing here? If the answer to four is no, record the measurement and do not act on it.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Work backwards from how the ice sheets were actually mapped, because it is the reverse of what people try to do with them. Geologists did not know where the ice came from and then predict the marks. They measured thousands of striations across whole countries, plotted them, and the fanning pattern revealed where the domes had been. The direction at any one site was an input to that, not an output of it — which is why a single reading cannot be inverted to give you north. You would be asking one data point to tell you the conclusion that ten thousand of them were needed to establish.`
    }
  ],

  map: [
    { name: `Marks record local forces`, level: 4, fresh: true },
    { name: `Striations and erratics`, level: 4, fresh: true },
    { name: `Regional context`, level: 4, fresh: true },
    { name: `A clue to conditions is not a clue to north`, level: 5 },
    { name: `Wind is local`, level: 5 },
    { name: `Base rates and selection`, level: 4 },
    { name: `Weighting evidence`, level: 4 },
    { name: `Knowing a method's limits`, level: 5 }
  ]
}
