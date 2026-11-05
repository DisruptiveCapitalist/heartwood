// Navigation · Field Week · Lesson 33 — living signs
//
// Field Guide Chapters 19 and 20 together, because plants and animals fail as
// compasses for the same reason and succeed as evidence in the same way. The
// chapter's required cautions are the lesson: "moss always grows on the north
// side" is unreliable, and the lesson has to explain WHY rather than simply
// denying it; and animal behaviour is an environmental clue, not a dependable
// compass.
//
// HOW THIS LESSON IS HONEST, which matters more here than anywhere else in
// the course. It does not claim to have measured moss. It grants the folklore
// its premise — that the shaded side really is favoured — makes the premise
// explicit and adjustable on screen, and then computes what follows. The
// answer is about the INFERENCE, not about any wood, and it is devastating
// without needing a single field observation.
//
// COMPUTED IN src/lib/field.js, CHECKED IN src/__tests__/field.test.js. The
// screen shows a SAMPLE of forty and the readout also gives the ODDS behind
// it; the copy below quotes whichever the learner is looking at, and says
// which. Granting that moss is 55% likely on the shaded side of a trunk and
// 25% on the sunny side out on an open slope, the odds are:
//
//   53% of trees carry moss on one side only and so say anything at all
//   79% of those point the right way
//
// And in the damp, shaded ravine — where moss is thickest and where everybody
// goes to look for it — the same model with 85% and 80%:
//
//   68% of trees have moss ALL ROUND and say nothing
//   29% say anything at all
//   59% of those are right, which is barely better than a coin
//
// The forty trees the lesson opens on, in the ravine, come out 30 with moss
// all round, none bare, 7 north-only and 3 south-only — so 10 of 40 say
// anything and 7 of those 10 are right, against odds of 59%.
//
// THE PLACE WHERE THE SIGN IS MOST ABUNDANT IS THE PLACE WHERE IT IS LEAST
// INFORMATIVE, and that is not a quirk of these numbers: it follows whenever
// conditions are good enough for moss on every side, which is what "damp and
// shaded" means.

export default {
  id: 'lesson-33',
  number: 3,
  week: 7,
  title: `Living signs`,
  openingQuestion: `Grant the old rule everything it asks for. Suppose moss really does prefer the shaded side. Now count the trees — because the place it grows thickest is the place it tells you least.`,
  concept: `A clue to conditions is not a clue to north`,

  fieldGuide: {
    chapter: 19,
    title: `Plants and Vegetation`,
    exercise: `This is the one exercise in the course that is a piece of fieldwork proper, and it takes an hour. Choose forty trees, in order, along a line through a damp shaded place — a ravine, the north side of a wood — without choosing them for their moss, which is the part people get wrong. For each one write down: moss on the north side, the south side, both, or neither. Then do forty more along an open slope. Compare your two tallies against what this lesson predicts, and keep the sheet: you will have done something almost nobody who repeats the rule has ever done, which is count.`
  },

  see: {
    voice: 'professor',
    line: `Forty trees in a damp ravine, seen from above, with the moss marked. The premise is printed along the bottom and you can change it; read the tallies first.`,
    simulation: { id: 'field', props: { mode: 'living' } },
    observations: [
      { text: `We have granted the rule its point: in this ravine moss is 85% likely on the shaded side and 80% on the sunny one — genuinely favoured, just as the folklore says. And look at the result. **Thirty of these forty trees have moss all the way round**, and not one is bare. Three in four say nothing at all, because a ring of moss has no side.` },
      { text: `That leaves **ten trees** carrying moss on one side only — and of those ten, **seven** have it on the north. The odds behind this wood, printed under the readout, say 59%. So in the place where moss is thickest, where anybody looking for moss would go, you must first find a one-sided tree and then win a slightly loaded coin toss.`, emphasis: true },
      { text: `Now switch to the open slope, where moss is scarcer. The odds get *better*: **24 of the 40 say something** and **19 of those are right**. That is the shape of the whole lesson and it is the opposite of the intuition — **the sign is most informative where it is least abundant**, because what carries the information is the difference between the two sides, not the moss.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first is why this lesson does not simply say the rule is wrong.`,
    sentences: [
      `**Moss grows where it is damp and shaded, and on a trunk in the open northern hemisphere the shaded side happens to be the north side — so the rule is not nonsense, it is a correlation with a cause.** That is exactly what makes it dangerous. A rule with no basis gets discarded the first time it fails; a rule with a real cause behind it survives every failure, because the failure can always be explained away. The honest objection is not "that's a myth" but "how much is it worth?", and the only way to answer that is to count.`,
      `**What carries the information is the DIFFERENCE between the two sides, and the difference vanishes exactly where the moss is thickest.** In a damp shaded ravine both sides are good enough, so most trunks are mossy all round and tell you nothing. Out on an exposed slope the sunny side dries and the difference shows — but there is less moss, so you must look harder, and the trees you notice are the mossiest ones, which are the ones where both sides are good. People sample the clue in precisely the way that destroys it.`,
      `And **the same argument runs through everything alive, which is why plants and animals share a lesson.** A game trail is a real sign and it leads to water, forage or cover, so its direction is a statement about where those are — in valley country the trails converge on a stream, which is a direction that changes with where you stand. Birds flying to roost at dusk are going to a roost. Flowers turning to the sun are tracking the sun, which Week 3 taught you moves. Every one of these is excellent evidence about conditions and none of them has any directional content until you supply the missing half yourself — and the half you supply is usually an assumption about where you already think you are.`
    ],
    comparison: {
      label: `THE DAMP PATCH ON THE WALL`,
      body: `There is a damp corner in a lot of old houses, and it is almost always the north-facing outside wall, because that is the one the sun never dries. Anybody who has lived with it knows this. Now imagine using it to navigate: you walk into a stranger's house, find the damp wall, and announce which way the house faces. Sometimes you will be right. In a house with a leaking gutter you will be wrong, and in a cellar — cold and dark on every wall — you will find damp everywhere and learn nothing, which is the ravine. The damp is caused by the shade. It is not a record of the shade, and it is certainly not a record of the compass.`
    },
    naming: `Which way a slope or a trunk faces is its **aspect**, and aspect is the real variable here: a north-facing slope in the northern hemisphere gets less sun, stays damper and colder, and grows different things from the south-facing slope on the other side of the same hill — a difference big enough that foresters, farmers and ecologists plan around it. Where two very different communities meet along such a line the boundary is an **ecotone**. What this lesson is doing to the moss rule is asking for its **base rate** — of all the trees, not just the memorable ones — and the trap in only noticing the trees that fit is **confirmation bias**; the trap in only examining the mossy ones is **selection bias**, and it is the more serious of the two here, because it is built into how people look. The general shape — a sign that is real, has a genuine cause, and is still nearly worthless for the question asked of it — has a name worth borrowing from medicine: a test with a real effect but a **low predictive value**.`,
    formalNames: {
      terms: [
        { term: `Aspect`, meaning: `The direction a slope or a surface faces. The thing that actually drives the difference, and a real and useful property of ground.` },
        { term: `Base rate`, meaning: `What happens across ALL cases, not the ones you noticed. A rule can only be judged against it, and almost no folk rule ever has been.` },
        { term: `Selection bias`, meaning: `Looking only at the mossy trees, which are the ones with moss on both sides. The reason the rule survives being used.` },
        { term: `Predictive value`, meaning: `Given that the sign says north, how often is it north? Different from "does shade favour moss", which is the question everyone answers instead.` },
        { term: `Ecotone`, meaning: `The boundary where one plant community gives way to another. Often follows aspect, moisture or soil, and is a genuinely readable feature of the ground.` },
        { term: `Game trail`, meaning: `A path worn by animals. Real evidence about where water, forage and cover are; no evidence about direction, and in valley country it converges on the stream.` }
      ],
      note: `Both of the chapter's cautions belong in plain words. **"Moss always grows on the north side" is unreliable**, and the reason is in this lesson: moss follows damp and shade, which follow many things besides aspect — a leaning trunk, a nearby boulder, a stream, a roof, prevailing rain — and in the places with most moss the sign cancels itself. **Animal behaviour is an environmental clue, not a dependable compass**: trails, flight lines and feeding patterns are genuine evidence about where resources are, and they move with the season, the weather and the time of day.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where else is something true, obvious, and still no use for the thing people use it for?`,
    items: [
      `"Red sky at night" — and the morning you got soaked anyway.`,
      `A cat sitting in the warmest spot, which is not always the sunniest.`,
      `The side of the house the washing dries fastest on.`,
      `A squeaky floorboard you use to know who is coming upstairs.`,
      `The supermarket queue that looks shortest.`,
      `A dog that barks at the postman and also at nothing.`
    ],
    ownPlaceholder: `Something true that I rely on more than it deserves…`,
    synthesis: `The queue is the one with the arithmetic in it, and everybody has run the experiment hundreds of times without ever counting. You pick the shortest queue; sometimes it is faster and sometimes the person at the front has a problem; and because you remember the times you chose wrong far more vividly than the times you chose right, you have no idea what your actual success rate is. That is the moss rule exactly. The sign is real, the reasoning is sound, nobody has ever tallied it, and the tallying is the only thing that would tell you what it is worth.`,
    builder: {
      body: `Count forty trees, and count them honestly, which is harder than it sounds. Walk a line through a wood and take every tree you pass over a certain size — not the mossy ones, every one — and for each write N, S, both or neither. The temptation to skip the bare ones is enormous and it is the entire reason this rule has survived. Then do the second forty somewhere more open. Two tallies on one page is a real result about your own wood, and whatever it says, you will know something that the person repeating the rule does not.`
    },
    acrossCultures: {
      place: `SÁPMI — THE SÁMI HOMELANDS`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Sámi reindeer herding runs on a question that sounds narrow and is not: can the reindeer get through the snow to the lichen beneath it? The word for the answer is **guohtun**, and it has no clean English equivalent — "pasture" misses it, because guohtun is about the snow and the lichen and the animals together, not about a plant community. Supporting that one question is a vocabulary that researchers working with herders put at some two to three hundred analytical terms for snow: *seaŋáš* for the granular depth hoar that reindeer dig through easily, *čearga* for snow the wind has packed hard, and many more, each distinguishing conditions that decide whether an animal eats.`,
        `What is striking, for this lesson, is what the vocabulary is NOT. It is not a system of directions. Several hundred precise terms, built over a very long time by people whose lives depend on reading the natural world correctly, and they are all about **conditions** — hardness, layering, the history of thaw and refreeze, what the forest canopy did to the snow beneath it. That is what deep environmental knowledge actually looks like when it is real: narrow, specific, relentlessly practical, and pointed at the question that matters rather than at the compass.`
      ],
      uncertain: `Counts of "words for snow" are a notorious trap, and the two-to-three-hundred figure should be read as a compilation across dialects and herding districts by researchers using a particular definition of a term, not as a fixed number — the comparison with Inuit snow-word claims, many of them exaggerated, is a cautionary one. The terminology varies by region and by family, is actively changing as the climate does, and much of the published work involves a small number of herding communities in a few districts. The characterisation above of what the vocabulary is for is drawn from that research rather than from any claim by this course about Sámi navigation, about which it says nothing.`,
      sources: `Eira et al., "Traditional Sámi snow terminology and physical snow classification — two ways of knowing", *Cold Regions Science and Technology* (2013); Roturier and Roué, "Of forest, snow and lichen: Sámi reindeer herders' knowledge of winter pastures in northern Sweden", *Forest Ecology and Management* (2009).`
    }
  },

  feynman: {
    line: `The hardest ban of Field Week, and it is the right one.`,
    instruction: `Explain to somebody who trusts the old rule why it lets them down — and do it without denying that the thing it is based on is true.`,
    banned: ['moss', 'north side', 'myth'],
    bannedNote: `Banning the word for the plant forces you to talk about the mechanism instead of the slogan, which is where the answer is. "Myth" is banned because it is not one — the cause is real, and an explanation that calls it a myth will lose the argument to the first mossy north-facing tree anybody points at.`,
    placeholder: `The growth really does prefer the damp, shaded side, but…`,
    checks: [
      `It accepts that the underlying cause is real.`,
      `It explains why the sign disappears where conditions are good on every side.`,
      `It says something about only noticing the cases that fit.`,
      `It distinguishes evidence about conditions from evidence about direction.`
    ],
    closing: `The test: would your explanation survive somebody walking you to a tree and showing you that, on this one, the growth is exactly where the rule says? It should — because your explanation was never that the rule always fails. It was that being right most of the time on the trees that speak, and silent on the rest, is not the same as being a compass.`
  },

  challenge: {
    voice: 'editor',
    line: `A question about where you look, which turns out to matter more than what you see.`,
    prediction: {
      question: `You want to test the old rule properly. You walk into a wood and examine the first fifty trees with clearly visible growth on them. What is wrong with the method?`,
      options: [
        {
          id: 'selected',
          text: `Choosing the trees with visible growth selects the dampest ones, which are the ones with growth all round.`,
          verdict: `Exactly, and it is the single reason the rule survives. Conditions good enough to make the growth conspicuous are usually good enough for both sides of the trunk, so the trees that catch your eye are disproportionately the uninformative ones — and the trees that would have told you something, with a thin patch on one side only, are the ones you walked past. The fix is unglamorous and complete: take every tree over a given size along a line, including the bare ones, and record the bare ones as data rather than as misses.`
        },
        {
          id: 'fifty',
          text: `Fifty is too small a sample to conclude anything.`,
          verdict: `Fifty is a perfectly workable sample for an effect this size — if the sign were worth anything you would see it clearly in fifty, and the simulation's forty is enough to show the shape. Reaching for sample size is the standard way of dismissing a result without engaging with it, and here it would let the method off far too lightly. The method's problem is not how many trees were looked at; it is which trees, and no number of selected trees fixes a selected sample. A thousand would be wrong in exactly the same direction.`
        },
        {
          id: 'wood',
          text: `One wood is not enough — you would need to repeat it in several different places.`,
          verdict: `Worth doing, and it would tell you something real: the effect genuinely does differ between an open slope and a damp ravine, which is most of this lesson. But it does not touch the fault in the method. Repeating a biased sample in twelve woods gives you twelve biased samples, and because the bias runs the same way every time it will look reassuringly consistent — which is systematic error, Lesson 22's distinction, turning up in fieldwork. Consistency across sites is not evidence of correctness when every site was sampled the same wrong way.`
        }
      ]
    },
    open: {
      question: `Is there anything alive that IS worth navigating by?`,
      placeholder: `The living thing I would actually trust is…`,
      reveal: [
        `Plenty, once you ask it the right question. Vegetation is superb for recognising WHERE you are: a change of community along a line is an ecotone, and it usually marks something real — a change of soil, a wetness, an aspect, the edge of an old field — which means it is a feature you can find on a map and use for a position. The same goes for a line of willows marking a watercourse you cannot see, or a band of different trees along a limestone outcrop. All of those are evidence about the ground, and the ground is on the map.`,
        `And at sea, birds genuinely do carry directional information, because some species fly out from land in the morning and back at dusk by a known distance — which Lesson 28's reveal mentioned and which Pacific navigators used in earnest. Note what makes that work: it is a tally with a known range and a known daily rhythm, not a static sign on a trunk. Tomorrow the signs stop being alive and start being geological, which ought to make them more reliable, and does not.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-22',
        label: `Navigation, Lesson 22 — the cocked hat`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, and this prompt is about you rather than about trees.`,
    prompt: `Write down a rule of thumb you trust — about weather, people, traffic, anything — and then write down honestly how you would find out what it is actually worth. Most of them could be tested in a week and almost none of them ever are.`,
    placeholder: `A rule of thumb I trust is…`,
    mapFooter: `Field Week, three of five. A real cause, a real effect, and a sign that is weakest exactly where it is most abundant.`,
    tomorrow: `Tomorrow the signs are cut into rock, which sounds like an improvement. The same ice sheet scratched two sites sixty miles apart in directions nine degrees apart, and for forty years the best geologists alive read those scratches two completely different ways.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Take the compass to the exercise rather than to the tree. The one thing you need and cannot guess is which side of each trunk is actually north, and eyes are terrible at it under a canopy — people routinely call a trunk's north side thirty or forty degrees wrong, which is enough to turn a south-side patch into a north-side one. So the honest survey is: compass out, north established once, then forty trees recorded against it. Half the published confidence in this rule comes from people who never checked which way they were facing.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `A map will not show you the growth, but it will show you aspect, and aspect is the thing actually doing the work. Find a hill on a contour sheet and identify its north-facing and south-facing flanks; then look at where the woodland symbols, the marsh symbols and the field boundaries fall. Very often the vegetation is drawn differently on the two sides, and you are looking at the real effect — large, reliable, and about the slope rather than about any one trunk. The usable version of this lesson is a map-scale one.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Look at the outside walls of any old building for the dark staining of damp and algae. You will usually find it on one side, and usually the sunless one — the same cause as in the wood. Now walk round until you find a building where it is on the wrong side, which will not take long: a tree shading the south wall, a broken downpipe, a neighbouring building, a prevailing wet wind. Every one of those is a confounder, and the wood has all of them and more.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `Count the marks rather than reading the numbers. In the ravine most circles are green the whole way round and carry no tick or cross at all — those trees were asked a question and said nothing. Among the few that are marked, the crosses are nearly as common as the ticks. Now switch to the open slope: fewer green rings, more marks, and the ticks pull clearly ahead. The picture goes from "lots of moss, no information" to "less moss, more information", which is the sentence the lesson is built on.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `Forty trees in a damp ravine, granting the rule its best case. Thirty have growth all the way round and tell you nothing; none is bare. That leaves ten that say something — and of those ten, seven have it on the north side and three on the south. So you walk into the ravine, pick a tree, and three times in four it says nothing at all; when it does speak you are right about seven times in ten, against underlying odds of about six. Out on the open slope the same forty trees give you twenty-four that speak and nineteen of those are right.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Four questions to ask of any living sign. One: what does this organism actually respond to — light, water, temperature, grazing, shelter? Two: does that thing line up with direction HERE, or with something local like a boulder or a stream? Three: of all the individuals around me, how many show the sign at all, and how many show it ambiguously? Four: am I only looking at the ones that show it? The fourth question is the one that does the damage, and it is the one nobody asks.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from a fact that ought to be strange: this is probably the single most widely known piece of outdoor lore in the English-speaking world, and no outdoor professional uses it. Mountain rescue does not use it, orienteers do not, foresters certainly do not. If it worked even moderately well, people whose lives depend on direction would have adopted it, because it is free and requires no equipment. The fact that the people with the strongest incentive ignore it tells you the answer before any arithmetic does — and the arithmetic, when you do it, says exactly why.`
    }
  ],

  map: [
    { name: `A clue to conditions is not a clue to north`, level: 5 },
    { name: `Aspect`, level: 4, fresh: true },
    { name: `Base rates and selection`, level: 4, fresh: true },
    { name: `Predictive value`, level: 3, fresh: true },
    { name: `Ecotones`, level: 3, fresh: true },
    { name: `Random and systematic error`, level: 5 },
    { name: `Weighting evidence`, level: 4 },
    { name: `Wind is local`, level: 4 },
    { name: `Drainage describes the ground`, level: 4 },
    { name: `Knowing a method's limits`, level: 5 }
  ]
}
