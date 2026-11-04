// Navigation · Week 2 · Lesson 9 — following a bearing.
//
// The brief (§3, Week 2) asks for orienting the compass, selecting a landmark,
// walking a bearing and checking progress, and avoiding magnetic interference
// — and the safety section (§6) insists that interference gets said out loud.
// So the simulation walks a mile of ground two ways and parks a truck on the
// route.
//
// The wobble is a FIXED sequence, not random, so the lesson can quote what
// happens and the learner can reproduce it: 3.5, −2.1, 4.4, −1.2, 5.3, −3.6,
// 2.8, 4.1 degrees, one per leg, eight legs of 220 yards. Watching the needle,
// each wobble is added to the heading you are already carrying, so the errors
// accumulate. Sighting on a landmark, each leg starts from the bearing again,
// so they do not — the leg error is also smaller, because a tree a few hundred
// yards off is an easier thing to walk at than a needle is to hold steady.
//
// Measured, and the same for every bearing because the whole thing is just
// rotated:
//
//   watching the needle                206 yards off after one mile
//   watching the needle, truck parked   492 yards
//   sighting on a landmark               11 yards
//   sighting on a landmark, truck        84 yards
//
// The truck swings the needle 19° on the leg it sits beside. An error of A
// degrees costs 1,760 × tan(A) yards a mile — about 31 yards per degree.

export default {
  id: 'lesson-09',
  number: 4,
  week: 2,
  title: `Following a bearing`,
  openingQuestion: `You have the number. Now you have to walk it, through a mile of woods where you cannot see the far end. Here is the surprising part: the worst possible way to do that is to keep your eyes on the compass.`,
  concept: `Walk at a thing, not at a needle`,

  fieldGuide: {
    chapter: 10,
    title: `Taking and Following a Bearing`,
    exercise: `Walking a bearing in four legs across open, familiar ground, choosing a landmark for each leg, counting paces, and checking the back bearing at every stop — the mile the simulation walks twice.`
  },

  see: {
    voice: 'professor',
    line: `One mile, eight legs, the same bearing both times. Switch between the two methods and watch the end of the line move.`,
    simulation: { id: 'compass', props: { mode: 'follow' } },
    observations: [
      { text: `Eyes on the needle the whole way: you finish **206 yards** from where that bearing should have put you. Every small wobble was added to the last one.` },
      { text: `Sighting on a landmark each leg: **11 yards**. The path still zig-zags — but each new sighting starts from the bearing again, so nothing accumulates.` },
      { text: `Park a truck beside one leg and the needle swings **19°**. The needle method finishes **492 yards** out; the landmark method, **84**.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the middle one is the whole technique.`,
    sentences: [
      `To set off on a bearing you work the instrument backwards from yesterday. Put the number on the dial at the index line first. Then hold the compass flat in front of you and turn your **whole body** until the needle drops into the orienting arrow. The direction-of-travel arrow is now pointing along your bearing, and you are facing it.`,
      `Then stop looking at the compass. Look up along the arrow and find something on that line you can still identify from a distance — a particular tree, a boulder, a gap in a ridge. Walk to it, not watching anything but your feet. When you reach it, take the compass out and do the whole thing again. The instrument sets the direction; **your eyes walk it**.`,
      `This works because of how the two kinds of error behave. Staring at the needle, every small drift is added onto the direction you were already drifting in, so the mistakes compound. Walking landmark to landmark, each sighting starts again from the bearing itself, so the mistakes stay the size of one leg and never grow.`
    ],
    comparison: {
      label: `CARRYING A FULL CUP ACROSS A ROOM`,
      body: `Everyone knows this one. Watch the cup and you will slop it everywhere — every tiny correction makes the next wobble bigger, and the harder you stare the worse it gets. Look at the doorway you are heading for instead, and the cup travels across the room perfectly steadily, with your hand doing the work beneath your attention. A compass needle is the surface of the coffee. Fix your eyes on it and you will hunt it all the way across the field; pick the far tree and go, and the walking looks after itself.`
    },
    naming: `A bearing you cannot see the end of is a straight line you are drawing blind, so give yourself ways to check it. Take a **back bearing** now and then: turn round, sight on the landmark you just left, and the reading should be your bearing plus or minus 180 — if it is not, you have drifted. Count your paces, so distance is a number and not a feeling. And when an obstacle forces you off the line — a pond, a thicket, a cliff you should not be near — **box around it** deliberately: ninety degrees off, a counted number of paces, your original bearing for a while, then ninety degrees back and the same counted number. You rejoin your line exactly where you would have been. The temptation is always to drift round the obstacle and pick the bearing up on the other side by eye, and that is the single most reliable way to lose a route.`,
    formalNames: {
      terms: [
        { term: `Setting a bearing`, meaning: `Putting the number at the index line and then turning your body until the needle sits in the orienting arrow.` },
        { term: `Aiming-off point`, meaning: `The landmark on your line that you actually walk to. Needs to be identifiable from close up as well as from far away — "a tree" is not one; "the dead tree with the split top" is.` },
        { term: `Back bearing`, meaning: `The reverse of your bearing, ±180. Sighting back at where you came from is the cheapest check there is.` },
        { term: `Pace counting`, meaning: `Counting double-steps to measure distance. Week 5 does this properly, including how to calibrate your own pace.` },
        { term: `Boxing an obstacle`, meaning: `Going round something in counted right angles so you rejoin your line exactly. Also called offsetting.` },
        { term: `Deliberate offset`, meaning: `Aiming a few degrees to one side of a target you cannot miss sideways — a road, a river, a lake shore — so that when you hit it you know which way to turn. Also called aiming off.` },
        { term: `Magnetic interference`, meaning: `Anything ferrous or electrical near the compass deflecting the needle. Steel, iron, DC power lines, car bodies, some rock.` },
        { term: `Deviation`, meaning: `The sailor's word for interference caused by the vessel itself, as opposed to declination, which is caused by the Earth.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Pick a far thing and go. Which of these have you done without thinking about it?`,
    items: [
      `Carrying a full mug across a room by looking at the doorway instead of the mug.`,
      `Driving a straight line down a snowy lane by watching the far end, not the hood.`,
      `Mowing a straight stripe by fixing on a fence post at the far side.`,
      `Walking a plank or a log by looking at the end of it rather than your feet.`,
      `Casting towards a spot on the far bank instead of watching the rod tip.`,
      `Riding a bicycle through a narrow gate by looking through it, not at the posts.`
    ],
    builder: {
      body: `Thirty minutes in an open, familiar place — a park, a large field, somewhere you can see across. Pick any bearing and set it on the compass. Walk it in four legs, choosing a landmark each time, and count your paces. At the end, take the back bearing and have a look at where you started: it should be lined up behind you. Now walk the same bearing back, and see how close you come to your own starting point. Do this where you can always see a road or a building you know. The point of the exercise is the technique, not the wilderness — never practise navigation by going somewhere you would need navigation to get out of.`
    },
    acrossCultures: {
      place: `THE ROYAL NAVY, EARLY 1800s`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `As warships and merchantmen took on more iron — guns, fittings, fastenings, and eventually iron hulls — their compasses started lying in a way that had nothing to do with the Earth. The error changed as the ship turned, which made it maddening to pin down: a vessel could be several degrees out on one heading and correct on another, and crews variously blamed the instrument, the weather and each other.`,
        `Matthew Flinders, surveying the Australian coast in the *Investigator*, worked the problem systematically. He compared compass readings taken on different headings at the same place, showed that the error followed the ship's own iron rather than anything outside it, and published the result in 1805. His remedy was a vertical soft-iron bar mounted near the binnacle to cancel the ship's vertical magnetism — still called a **Flinders bar**, and still fitted to magnetic compasses at sea. The general theory of correcting ships' compasses was worked out over the following decades, with George Airy's 1839 paper the usual landmark.`
      ],
      uncertain: `Flinders was not the first to notice that iron moved the needle — the effect had been reported for decades, and others were working on it at the same time — so "who discovered deviation" is the wrong question to ask. How widely his correction was actually adopted at sea in the first years after 1805, as against being read about, is not well recorded.`,
      sources: `Flinders, "Concerning the Differences in the Magnetic Needle, on Board the Investigator," *Philosophical Transactions of the Royal Society* (1805); Airy, "On the Correction of the Compass in Iron Built Ships," *Phil. Trans.* (1839); May, *A History of Marine Navigation* (1973).`
    },
    ownPlaceholder: `A time I steered better by looking further ahead…`,
    synthesis: `Every one of those works the same way: you stop correcting against the thing that twitches, and start aiming at the thing that holds still. A compass needle twitches. A tree does not.`
  },

  feynman: {
    line: `This is the stage that counts. Write it and the lesson is yours.`,
    instruction: `Explain why walking landmark-to-landmark beats staring at the needle — **without using the words "accumulate," "error," or "drift."** Say what actually happens to a person doing each one.`,
    banned: ['accumulate', 'error', 'drift'],
    bannedNote: `one of those came back — and the explanation is plainer without it`,
    placeholder: `If you watch the needle, every little wobble gets added to the one before, so…`,
    checks: [
      `Watching the needle, each small wobble is added to the way you were already going.`,
      `So by the end of a mile you are curving, and nothing ever told you.`,
      `Walking to a landmark, you set out fresh from the bearing every single time.`,
      `So a bad leg stays one bad leg instead of bending the whole walk.`
    ],
    closing: `If your version has "you start again from the bearing each time," you have it — and you have also just described why the method survives a truck parked on your route.`
  },

  challenge: {
    voice: 'editor',
    line: `One about the ground, and one about a thing the brief insists we say out loud.`,
    prediction: {
      question: `You need to reach a cabin that sits on a long east-west road, a mile north of you. Your bearing to it is 000. What should you actually walk?`,
      options: [
        {
          id: 'offset',
          text: `About 005 — deliberately a little to the right, so you know which way to turn when you hit the road.`,
          verdict: `That is the trick, and it has a name: aiming off. Walk 000 and you will arrive at the road a bit left or a bit right of the cabin, with no way of knowing which, and a coin-flip decision in front of you. Walk 005 and you will arrive perhaps 150 yards to the right of it, certainly to the right, and you simply turn left and follow the road until the cabin appears. You trade a tiny bit of extra walking for the removal of a 50-50 guess, which is an excellent trade in poor light.`
        },
        {
          id: 'exact',
          text: `000, as accurately as possible — the whole point is to be precise.`,
          verdict: `Precision is good, but no amount of it removes the real problem, which is that you cannot tell *which side* of perfect you landed on. Even a one-degree slip over a mile puts you 31 yards off, and at the road you would be looking left and right at identical stretches of empty tarmac. The experienced move is to stop trying to hit the point and start guaranteeing the side — a target you cannot miss, with a known direction to walk along it.`
        },
        {
          id: 'road',
          text: `Just head north roughly and follow the road when you reach it.`,
          verdict: `You will reach the road, which is something — a mile-long east-west target is hard to miss going north. But you will reach it not knowing whether the cabin is left or right, which is the same coin flip, and "roughly north" can be fifteen degrees out, which is a quarter-mile along the road. Aiming off costs you nothing extra and converts "somewhere on this road" into "to the right of the cabin," which is an answer rather than a question.`
        }
      ]
    },
    open: {
      question: `You take a bearing standing next to your parked car and it reads 062. You walk thirty yards clear and take it again: 041. Which one is right, and what do you do now?`,
      placeholder: `The second one, because…`,
      reveal: [
        `The second one. The car is a large steel object a few feet from a very weak instrument, and it bent the needle twenty-one degrees without the slightest hint that anything was wrong — no flicker, no hesitation, just a confident wrong number. Twenty-one degrees is 680 yards a mile. This is why the brief insists the point be said plainly: **magnetic interference distorts compass readings**, and it does it silently.`,
        `The working habit is to get clear and then check. Step at least thirty feet from a vehicle, ten from a wire fence or a steel gate, and take your phone, your knife and anything steel out of your hands. Then take the bearing twice, a few paces apart. If the two agree, trust them. If they do not, something nearby is lying to you — move further and try again. In some places it is the ground itself: ironstone and volcanic rock can shift a needle several degrees, which is why a few maps carry a magnetic anomaly warning in the margin.`
      ],
      crossLink: {
        courseId: 'electricity',
        lessonId: 'lesson-11',
        label: `Electricity, Lesson 11 — the compass needle that flinches near a wire`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then you're done.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 10 closes the week: the map and the compass in the same two hands. A bearing taken on the ground, carried back to the paper, and drawn as a line that tells you something new.`
  },

  routes: [
    { id: 'compass', label: `Explain it with a compass`, body: `Set any bearing on your dial and turn your body until the needle sits in the kennel. Now hold that position and try to walk twenty steps across a room without letting the needle leave the kennel. You will find yourself shuffling, correcting, over-correcting, and arriving somewhere you did not intend — in twenty steps. The instrument is not built to be watched while you move. It is built to be consulted, put away, and consulted again.` },
    { id: 'map', label: `Explain it with a map`, body: `On the map your route is a straight ruled line between two points. On the ground it never is: you go round the wet patch, round the bramble, up the easier side of the bank. What the landmark method does is turn one impossible straight mile into eight short straight legs, each of which you really can walk straight, strung between things you can see. The line on the map stays straight; the walking becomes a series of achievable pieces.` },
    { id: 'object', label: `Use an everyday object`, body: `Try threading a needle while staring at the eye from two inches away, hand trembling. Now try it with your elbows resting on a table. Same hands, same needle, completely different result — because in the second case you removed the feedback loop between the wobble and your correction of it. Walking a bearing with your eyes on a landmark does the same thing: it takes your twitching hand out of the circuit.` },
    { id: 'diagram', label: `Show me a diagram`, body: `Go back to SEE IT and flip between the two methods while watching only the shape of the orange line. On **watching the needle** it is a smooth curve bending away from the dashed line — every leg points slightly further off than the last. On **sighting on a landmark** it is a zig-zag that keeps crossing the dashed line and never gets far from it. Same number of legs, same wobbles, two completely different shapes. The curve is what accumulating looks like.` },
    { id: 'example', label: `Walk me through an example`, body: `Follow one leg right through. Your bearing is 040. You hold the compass flat, turn until the needle parks in the kennel, and look up along the arrow. On that line, about two hundred yards out, there is a dead tree with a split top — not just "a tree," because there are forty of those, but one you will still recognise standing underneath it. You put the compass in your pocket and walk to the tree, watching the ground. At the tree you take the compass out, box the needle again, and find the next thing. The compass was in your hand for perhaps fifteen seconds of a four-minute leg.` },
    { id: 'smaller', label: `Break it into smaller steps`, body: `Three small questions. One: can you hold a compass perfectly steady while walking over rough ground? No, nobody can. Two: when you correct a wobble, do you correct back to the bearing or back to roughly where you were? Roughly where you were — which is already slightly off. Three: so what happens to all those small roughlys over a mile? They add up in one direction, because each correction starts from the last mistake instead of from the bearing. The landmark fixes exactly that.` },
    { id: 'backward', label: `Work backward from the answer`, body: `Start from the finishing positions and work back. Eleven yards out, versus two hundred and six. Both walkers had the same compass, the same bearing, the same wobbles, and walked the same distance over the same ground. Nothing differed except where their eyes were. If a technique produces a nineteen-fold difference with everything else held constant, the technique is not a refinement — it is the method, and the instrument is just the thing that starts each leg.` }
  ],

  map: [
    { name: `Following a bearing`, level: 4 },
    { name: `Magnetic interference`, level: 4 },
    { name: `Back bearing`, level: 3 },
    { name: `Aiming off`, level: 3 },
    { name: `Taking a bearing`, level: 4 },
    { name: `Compass parts`, level: 4 },
    { name: `Converting a bearing`, level: 4 },
    { name: `Declination`, level: 4 },
    { name: `Pace counting`, level: 1 },
    { name: `Bearing & distance`, level: 4 },
    { name: `Direction vs. position`, level: 5 },
    { name: `Map scale`, level: 4 },
    { name: `Map and compass together`, level: 1 }
  ]
}
