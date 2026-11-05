// Navigation · Week 6 · Lesson 27 — when the instruments fail
//
// Field Guide Chapter 31, and the only lesson in the course whose central
// technique works by making an error deliberately bigger.
//
// The chapter's own list is good and cautious — stop, assess, establish a
// position if you can, record what you do, avoid unnecessary movement, know
// when to stay put — and it is a list of instructions rather than a mental
// model. The model the lesson supplies is that an error has two parts, a size
// and a sign, and that losing the sign is what makes you helpless. Aiming off
// throws away a little size to be certain of the sign, and that trade is the
// whole of practical navigation without instruments.
//
// MEASURED IN src/lib/voyage.js, CHECKED IN src/__tests__/voyage.test.js.
// Walking 1,200 yards to a footbridge, holding a course to three degrees:
//
//   AIMING STRAIGHT AT IT      you arrive a mean 50 yards from the bridge,
//                              104 yards nineteen times in twenty — and on a
//                              side that is a coin toss. The stretch of stream
//                              you may have to search, not knowing which way
//                              to start, is 208 yards.
//
//   AIMING OFF 7°              the side is certain 99.0% of the time, you walk
//                              a mean 148 yards along the stream to the bridge
//                              — and the detour costs ELEVEN YARDS on the leg
//                              itself, because the hypotenuse of a long thin
//                              triangle is barely longer than its long side.
//
//   Seven degrees is 2.33 sigma, which is where the normal table puts 99%, and
//   it is the arithmetic behind the orienteer's rule of thumb: aim off by about
//   two and a half times the error you expect.
//
//   WHAT IT DOES NOT DO is save walking. At every error size the walk along the
//   stream is longer than the straight-ahead miss would have been, and the
//   test asserts that rather than hoping nobody checks. What it buys is the
//   sign, and the sign is worth more than the distance.
//
//   AND WHY YOU STOP MOVING. At three degrees and a five per cent pace, every
//   mile walked adds about 127 yards to the circle you could be in — Lesson
//   29's error cone, arriving a lesson early because this is where it matters.
//   Walking while unsure is not neutral; it is expensive.
//
// The paragraph about natural clues is arithmetic under a stated assumption
// rather than a measurement, and says so in the copy: two clues each wrong one
// time in three are both wrong one time in nine IF they are independent, and
// the clues people reach for in woodland are not independent, because they all
// answer to the same prevailing weather. That is Lesson 22's systematic error
// wearing a different coat.

export default {
  id: 'lesson-27',
  number: 2,
  week: 6,
  title: `When the instruments fail`,
  openingQuestion: `The battery is flat and the cloud is down. You have a map, a compass and your legs — and the most useful thing you know is how to aim at the wrong place on purpose.`,
  concept: `Aiming off, and keeping the sign`,

  fieldGuide: {
    chapter: 31,
    title: `Emergency Navigation`,
    exercise: `Pick a footbridge, gate or stile on a stream, track or wall that you can find on the map, and a starting point some distance away with open ground between. First walk at it directly, and when you reach the feature stop and note which way you have to turn and how far — and be honest about whether you could have known that without looking. Then go back and do it again, this time aiming deliberately ten degrees to one side. When you meet the feature you will not need to wonder: turn the way you aimed off and walk until you arrive. Note how much further you actually walked. It will be less than you expect.`
  },

  see: {
    voice: 'professor',
    line: `A footbridge twelve hundred yards away across open moor, and a course you can hold to about three degrees — which is a realistic figure for walking, not for reading a compass on a table. Start with AIM STRAIGHT AT IT.`,
    simulation: { id: 'voyage', props: { mode: 'aim' } },
    observations: [
      { text: `Aim at the bridge and you do not do badly: a mean miss of **50 yards**, and **104 yards** nineteen times in twenty. But every dot is red, and that is the whole trouble. They straddle the bridge, half to one side and half to the other, and not one of them knows which half it is in — so when you are standing on that bank in the rain, neither do you. The stretch of stream you may have to search is **208 yards**.` },
      { text: `Now press the other preset — **aim off seven degrees**. The dots move bodily to one side and turn green: **99.0%** of them, which is what two and a third standard deviations buys you. The spread has not changed by a hair. What has changed is that all of it is now on one side of the bridge, so you arrive knowing without question which way to turn, walk a mean **148 yards** along the bank, and meet it.`, emphasis: true },
      { text: `And now the number that makes it worth teaching. Watch the third readout: aiming seven degrees off a twelve-hundred-yard leg costs **eleven yards** of extra walking. Eleven. The long way round a very long thin triangle is almost exactly as long as the short way, so certainty of which side you are on is nearly free — and it is the only thing in this course that is.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences about being lost, and the first one is about arithmetic rather than courage.`,
    sentences: [
      `**An error has a size and a sign, and it is losing the sign that leaves you helpless.** Fifty yards from the bridge is nothing; fifty yards from the bridge on an unknown side is a search. If you know you are short of it you walk on; if you know you are left of it you turn right. You can act on a large error whose direction you know and you cannot act on a small one whose direction you do not, which is why the practical question in the field is never "how accurate am I?" but "which way am I wrong?".`,
      `**So aim at something you cannot miss, and aim deliberately to one side of the thing you want.** The stream, the wall, the track, the ridge — anything long and unmistakable is a **catching feature**, and a course aimed at it cannot fail, because the feature is a line and your error is a point on it. Aim at the bridge itself and you are aiming at a point, which you will miss by a coin toss. Aim ten degrees upstream of it and you arrive on the bank certain of your direction, with a known walk ahead of you — and the extra ground is a handful of yards, because the detour is along the hypotenuse of a triangle so thin it hardly exists.`,
      `And **when you are genuinely unsure where you are, stop, because walking makes it worse at a measurable rate.** At three degrees of course-holding and a five per cent pace, every mile you walk adds about a hundred and thirty yards to the circle you could be in — and a mile takes twenty minutes, so uncertainty grows faster than daylight disappears. The instruction is not "stay calm", which nobody can act on. It is: sit down, write down the last place you were certain of and the time, work out what you have done since, and then choose one catching feature and aim off for it.`
    ],
    comparison: {
      label: `THE DARK LANDING AND THE LIGHT SWITCH`,
      body: `You come home late and the hall is black, and you want the light switch. Walk at where you think it is, hand out, and you touch cold wall somewhere near it with no idea whether to feel left or right — so you pat about, and sometimes you find the switch and sometimes you find a picture frame. What you actually do, and have always done, is put your hand on the door frame first, because the door frame is a thing you cannot miss and the switch is a known distance from it in a known direction. You aim at the big unmistakable thing and walk along to the small one. That is the whole of this lesson, performed nightly, in the dark, without instruction.`
    },
    naming: `The orienteering world has had names for these for a century, and they are worth having because they turn a vague intention into a plan. A **handrail** is a long feature you walk *along* because it keeps you honest — a wall, a stream, a forest edge, a contour. A **catching feature** is a long feature you walk *at*, placed beyond your target, so that meeting it tells you you have gone far enough. An **attack point** is a small thing you can positively identify close to your objective, from which the last short leg can be taken precisely. And **aiming off** is today's trick: steering deliberately to one side of the objective so that the side on which you meet the catching feature is known rather than guessed. The emergency version of all of this has its own name — the Field Guide's Chapter 31 is blunt about the first step and so is every mountain rescue team: **stop**. Sit down, eat something, and do not spend the next mile making the circle bigger.`,
    formalNames: {
      terms: [
        { term: `Aiming off`, meaning: `Steering deliberately to one side of your objective, by more than the error you expect, so that the side you arrive on is certain. Costs a few yards and removes a coin toss.` },
        { term: `Catching feature`, meaning: `A long, unmistakable feature beyond or beside the objective. You cannot miss a line, and it converts "where am I?" into "how far along am I?".` },
        { term: `Handrail`, meaning: `A long feature you follow instead of holding a bearing. Slower and often longer, and it cannot accumulate error.` },
        { term: `Attack point`, meaning: `The last positively identified feature before the objective. Navigate carelessly to it and carefully from it — the leg that must be accurate should be the shortest one.` },
        { term: `Deliberate offset`, meaning: `The same idea at sea, where it is also called making a landfall to one side and then running down the latitude. See the card below.` },
        { term: `Relocation`, meaning: `The procedure for when you have lost your position: stop, fix the last certain point and time, reconstruct what you have done since, and choose a catching feature. Not a synonym for walking about looking for a signpost.` }
      ],
      note: `Notice what aiming off has in common with Lesson 7's declination and Lesson 23's pace calibration. In each case the honest response to an error is not to try harder but to arrange matters so that the error is predictable, and then allow for it. A navigator's skill is mostly the conversion of unknown errors into known ones.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where else do you deliberately go to the wrong place because it is easier to finish from there?`,
    items: [
      `Finding the light switch by starting at the door frame.`,
      `Overfilling the kettle rather than risk it boiling dry.`,
      `Parking at the far end of the car park, where you know there are spaces.`,
      `Arriving at the station twenty minutes early.`,
      `Cutting a shelf long, then trimming it to fit.`,
      `Throwing a ball to where someone is going to be.`
    ],
    ownPlaceholder: `Something I deliberately overdo to make the end easier…`,
    synthesis: `The shelf is the exact relative, and any joiner will tell you the rule: cut it long, because you can take wood off and you cannot put it back. That is aiming off. A short shelf and a long shelf are both the wrong length, and only one of them can be fixed — so you choose which way to be wrong before you start, and you make sure you are wrong in the direction that still has a move in it. Arriving early at the station is the same bargain measured in minutes, and the twenty minutes is the eleven yards.`,
    builder: {
      body: `Go and do it twice, and the second time will feel like cheating. Choose a bridge or gate on a stream or track that you can find on the map, and a start point six or eight hundred paces away with open ground between. Walk at the gate directly. When you meet the stream, before you look around, write down which way you think you must turn — then look. Now go back and walk it again, this time aiming ten degrees to one side, and notice that there is nothing to decide when you arrive. Count your paces both times. The second walk is longer by a number so small you will suspect you miscounted.`
    },
    acrossCultures: {
      place: `THE ATLANTIC AND THE INDIAN OCEAN, 15TH CENTURY ONWARD`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Aiming off is older and larger than the moor. For three centuries every ocean navigator faced Lesson 26's asymmetry — latitude knowable, longitude not — and the standard answer was to turn the unknown quantity into a known walk. You did not steer for your destination. You steered for its **parallel**, deliberately well to one side of it in longitude, and when your noon sight told you that you were on the right latitude you turned and ran along it until land appeared. The practice is called **latitude sailing**, or running down the latitude, and the East–West leg was called running down a westing or an easting.`,
        `Columbus sailed this way in 1492 and da Gama in 1498, and the method persisted until chronometers made it unnecessary. It has exactly the shape of the footbridge: the parallel is the catching feature, the deliberate error in longitude is the offset, and the price is paid in extra sea miles rather than in doubt. The price could be heavy — the latitude line is rarely the shortest or the best-winded route, and voyages were lengthened by days or weeks, with scurvy waiting at the end of the extra time. That is the same trade as the eleven yards, scaled up until it kills people, and navigators went on making it because the alternative was not knowing which way to turn.`
      ],
      uncertain: `The European practice is well documented; the same technique is often asserted with equal confidence for Norse and for Pacific voyaging, and the evidence there is thinner and of a different kind — inference from sailing directions and from oral tradition rather than from logs. The specific courses Columbus steered are reconstructed from a transcribed abstract of his journal and are argued over in detail. And the generalisation that *every* tradition aimed off deliberately should be resisted: it is a sensible response to an unknown longitude, which makes it easy to assume and hard to demonstrate.`,
      sources: `Taylor, *The Haven-Finding Art: A History of Navigation from Odysseus to Captain Cook* (1956); Morison, *Admiral of the Ocean Sea* (1942); Lewis, *We, the Navigators* (1972).`
    }
  },

  feynman: {
    line: `Explain the trick to someone who thinks it sounds like giving up.`,
    instruction: `Explain why walking towards the wrong place can get you to the right place faster than walking towards the right place — and what the ground has to look like for it to work at all.`,
    banned: ['offset', 'deliberately', 'sideways'],
    bannedNote: `"Offset" and "deliberately" are the words that let you name the technique without explaining it, and "sideways" lets you gesture at the geometry instead of saying what it does for you. Say what you know when you arrive that you would not otherwise have known, and the rest follows.`,
    placeholder: `If I walk straight at the gate I might end up on either side of it, and then…`,
    checks: [
      `It says what goes wrong when you walk at a small target and miss.`,
      `It names the kind of feature the method needs, and why a line is different from a point.`,
      `It explains what you know on arrival that you would not have known otherwise.`,
      `It says, at least roughly, how far to one side is enough.`
    ],
    closing: `The real test: would your explanation stop someone proudly aiming straight at the gate and calling it precision? That is the instinct this lesson has to overcome, and it feels like competence while it is happening.`
  },

  challenge: {
    voice: 'editor',
    line: `A question designed to catch the version of this that people half-remember.`,
    prediction: {
      question: `You are heading for a gate in a long stone wall, a mile off, in mist. You can hold a course to about four degrees. Someone suggests aiming twelve degrees to the left of the gate. What is wrong with that suggestion?`,
      options: [
        {
          id: 'nothing',
          text: `Nothing much — twelve degrees is about three times four, which is what you want.`,
          verdict: `Right, and the arithmetic is worth having explicitly. You want the offset to exceed your likely error by enough that landing on the wrong side is rare, and the normal table says two and a third times gets you to ninety-nine per cent — so for four degrees of error, nine or ten degrees is plenty and twelve is comfortable. The cost of the extra is almost nothing on the leg itself: twelve degrees on a mile is about thirty-nine yards of extra walking. What it does cost is the walk along the wall, which at twelve degrees on a mile is around three hundred and seventy yards — so the sensible objection to twelve is not that it is wrong but that eight would have done and saved you a hundred yards of wall.`
        },
        {
          id: 'toofar',
          text: `Twelve degrees will take you so far along the wall that you will not know whether you are left of the gate or past the end of the wall.`,
          verdict: `This is the right worry about the wrong number, and it is the question the method actually turns on: how long is your catching feature? Aiming off only works while the feature extends well beyond your offset, and a wall with an end — or a stream that bends away, or a track that forks — can be overshot, at which point you have arrived nowhere and know nothing. Twelve degrees on a mile puts you about three hundred and seventy yards along the wall, so the test is whether the wall runs that far in that direction. If it does not, aim off less, or pick a longer feature.`
        },
        {
          id: 'wrongside',
          text: `You should aim off to the side the gate is nearest, so you have less distance to walk.`,
          verdict: `This reverses the logic, and it is the commonest way the technique gets ruined. The point of aiming off is that the side is certain, and the side is only certain if the offset is bigger than the error. Choosing the near side means choosing a small offset, which means a real chance of landing on the far side after all — and then you walk away from the gate, confident and wrong. Choose the side for a reason, by all means: pick the one where the feature runs further, or the ground is easier, or the walk is downhill. But choose it and then commit to an offset big enough to guarantee it.`
        }
      ]
    },
    open: {
      question: `Aiming off needs a line you cannot miss. What do you do in country that has not got one?`,
      placeholder: `If there is nothing long enough to aim at, then…`,
      reveal: [
        `You build the day out of the lines that do exist, which is tomorrow's lesson. Most country has more of them than it looks: a stream, a track, a forest edge, a ridge, a wall, a power line, a change of vegetation, a contour you can follow. The planning skill is to see a route not as a line from A to B but as a chain of features you can aim at, with the short careful legs placed where they matter and the long careless ones where they do not.`,
        `And where there is genuinely nothing — open desert, snowfield, sea — then you are back to Lesson 24 and the plot, and the honest thing to do is accept that the circle is growing and decide in advance how big you will let it get before you stop. That decision, made with a pencil before you set out, is what Lesson 29 calls an error budget, and it is the difference between a plan and a hope.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-24',
        label: `Navigation, Lesson 24 — dead reckoning`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes on an uncomfortable idea.`,
    prompt: `Write about a time you were lost — properly unsure, not briefly confused. What did you do first? And knowing what you know now, what would you have done instead?`,
    placeholder: `The time I was properly lost, I…`,
    mapFooter: `Twenty-seven lessons. And the most useful thing in the last five weeks turns out to be a deliberate mistake.`,
    tomorrow: `Tomorrow there are no instruments at all, and there never were. Twenty-six lessons have had one tradition each in the margin; tomorrow they come together, and the thing they all have in common is the thing Lesson 26 measured.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Set your compass to the bearing of the gate and then, before you start walking, turn the dial ten degrees. That is the whole technique, and it is one movement of your thumb. What matters is which way you turn it, and that you write down which way, because in forty minutes' time in the mist you will have to remember. The compass is doing exactly what it did in Lesson 9 — holding one direction — and all that has changed is that the direction you have asked it for is deliberately not the direction of the thing you want.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Look at the map and stop looking for your destination. Look instead for the longest unmistakable line anywhere near it — a stream, a wall, a forest edge, a track, a steep break in the contours — and find the one that lies across your path beyond the thing you want. Now draw your course not to the gate but to a point on that line a good way to one side of it. You have converted a problem with two unknowns, how far and how far off, into a problem with one: how far along. A map read this way stops being a picture of where things are and becomes a list of things you cannot miss.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Stand in a doorway, shut your eyes, and try to put a finger on the light switch. You will touch the wall somewhere near it and have to feel about, and sometimes you will be left and sometimes right. Now do it again but put your hand on the door frame first and slide along. You arrive every time, and you arrive without deciding anything. The door frame is the catching feature and the slide is the walk along the stream. Everyone already does this in the dark and nobody does it with a compass in daylight, which is odd, because the compass case is the one where you cannot feel about.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `The picture to read is the dots. With the offset at zero every one of them is red — they straddle the bridge, and the straddling is the problem rather than the spread. Push the offset slider up and watch two things happen at once: the dots move bodily to one side, and they turn green as they cross over. Nothing about the spread has changed; it is exactly as wide as it was. What has changed is that the whole of it has been slid clear of the target, so no part of it is on the wrong side. And look at the third readout while you do it: the cost of sliding it is a number of yards you could walk in ten seconds.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `The footbridge bears 047° and the map says it is twelve hundred yards. You know from experience that over that distance in rough going you hold a course to about three degrees. Three times two and a third is seven, so you set 040° — seven degrees to the left, which puts you upstream of the bridge — and you write "LEFT, 7" on your hand. You walk eleven hundred paces and meet the stream. You do not look around, you do not deliberate: you turn right and walk downstream, and in about a hundred and fifty yards there is the bridge. Had you set 047° you would have arrived within fifty yards of it and spent ten minutes finding out which fifty.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Five steps, and the first is the one people skip. One: find the line you cannot miss, beyond or beside your objective. Two: decide how well you can hold a course today — in rough ground, tired, three or four degrees, not one. Three: multiply by about two and a half and turn your bearing that much to one side, choosing the side where the feature runs furthest. Four: write down which side. Five: walk, and when you meet the feature, turn the way you wrote down and keep walking until the objective appears.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start at the end: you are standing on the bank of the stream and you want to be at the bridge. There are only two possible situations. Either you know which way the bridge is, in which case you simply walk there and the job is done; or you do not, in which case you must search, and a search is the expensive thing — it can cost you twice the distance and all of your confidence. So the entire question is how to arrive in the first situation rather than the second. And the only way to be sure which side of something you are on is to have aimed far enough to one side of it that your error could not have crossed over. Everything else in the lesson is that sentence with numbers on it.`
    }
  ],

  map: [
    { name: `Aiming off`, level: 4, fresh: true },
    { name: `Catching features and handrails`, level: 4, fresh: true },
    { name: `Attack point`, level: 3, fresh: true },
    { name: `Relocation`, level: 3, fresh: true },
    { name: `Random and systematic error`, level: 5 },
    { name: `Dead reckoning`, level: 5 },
    { name: `Pace counting`, level: 5 },
    { name: `Following a bearing`, level: 5 },
    { name: `Longitude`, level: 5 },
    { name: `Carrying the time`, level: 4 },
    { name: `Knowing a method's limits`, level: 5 }
  ]
}
