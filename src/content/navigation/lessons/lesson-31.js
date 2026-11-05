// Navigation · Field Week · Lesson 31 — the wind has a shape
//
// Field Guide Chapter 17, and the opening of the week that gives Part V its
// lessons. The chapter's own required caution is the lesson's thesis rather
// than a footnote on it: wind direction is not a universal compass.
//
// MEASURED IN src/lib/field.js, CHECKED IN src/__tests__/field.test.js:
//
//   CHANNELLING, which is a MODEL and says so on screen. A valley will not
//   let air cross it, so the across-valley part of the wind is shed and the
//   along-valley part survives. A west wind over a valley running north-west
//   is felt in that valley as a wind from 330° — SIXTY DEGREES away — at half
//   its speed. On the same picture, at the same moment, two other valleys
//   report two other winds.
//
//   WHAT SIXTY DEGREES COSTS. Walk a mile on it and you finish 1,760 yards —
//   a whole mile — from where you meant to be, because the two walks and the
//   start make an equilateral triangle.
//
//   This lesson first said 3,048 yards, which is d·tan θ. Design caught it.
//   The tangent is the right function for a small compass error, where the
//   forward distance is what is fixed, and the wrong one here: a mile walked
//   on a bearing sixty degrees off is a mile walked, not two. The 31-yards-a-
//   mile-per-degree rule this course has used since Lesson 7 is the small-
//   angle limit of the honest formula and is safe only while the angle is
//   small — the two agree to better than one per cent below ten degrees.
//
//   THE SHORE, which is not a model at all. Land heats faster than water by
//   day and cools faster by night, so a shore breeze blows onshore in the
//   afternoon and offshore before dawn — a reversal of exactly 180°, twice a
//   day, every day. The same beach answers "which way is west?" both ways.
//
//   AND THE FLAG POINTS DOWNWIND. A wind-flagged tree has its branches swept
//   to the lee, so the flag shows where the wind is GOING. Read it the other
//   way and you have made the largest single error available in this course.

export default {
  id: 'lesson-31',
  number: 1,
  week: 7,
  title: `The wind has a shape`,
  openingQuestion: `There is no such thing as the wind. There is the wind in this valley, which is a fact about this valley.`,
  concept: `Wind is local`,

  fieldGuide: {
    chapter: 17,
    title: `Wind and Weather`,
    exercise: `Find a wind-flagged tree — an exposed one, with its branches noticeably longer on one side — and before you do anything else write down which way the flag points, because that is the way the wind that shaped it was going. Then look at the ground the tree is standing on. Is it in a valley, on a saddle, at the lip of a ridge, by water? Walk half a mile to somewhere with different ground and find another flagged tree. If the two disagree, you have learned more in an hour than the phrase "the prevailing wind is westerly" will ever teach you.`
  },

  see: {
    voice: 'professor',
    line: `One forecast, one afternoon, three valleys. Start in the north valley and read the three labels on the picture before you touch a slider.`,
    simulation: { id: 'field', props: { mode: 'wind' } },
    observations: [
      { text: `The forecast says the wind is from the west, 270°, at twelve miles an hour. In the north valley it is from **330°** at **six**. In the middle valley it is from somewhere else again. Nobody is wrong and nothing has changed about the weather — a valley will not let air cross it, so what blows along it is whatever was already going that way.` },
      { text: `That tree is flagged by the wind that actually reaches it, so it is a record of **its own valley**, not of the weather. Read it as the prevailing wind and you are **60° out** — and walking a mile on that leaves you **1,760 yards from where you meant to be**, which is a whole mile. At sixty degrees you and the person who went the right way are as far apart as either of you walked.`, emphasis: true },
      { text: `Now the second picture, and this one is not a model of anything. Stand on a lake shore at three in the afternoon and the breeze comes off the water. Stand in the same footprints at four in the morning and it comes off the land — **the same beach, reversed by exactly 180°**, twice a day, every day, because land heats and cools faster than water does.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one is the whole of Field Week in disguise.`,
    sentences: [
      `**Wind is not a direction the sky has. It is what the air is doing here, and "here" is doing most of the work.** The weather map's arrow is a regional average several thousand feet up. By the time that air reaches you it has been round a hill, down a valley, over a town and across a lake, and each of those has had its say. What you feel, and what the trees around you record, is the result — and the result is a fact about the ground you are standing on. That is why this week exists: every sign in it is a reading of local conditions, and every folk rule in it mistakes that for a reading of direction.`,
      `**The commonest shaping is channelling, and it works like water in a gutter.** Air arriving at an angle to a valley cannot climb out sideways, so the part of its motion across the valley is lost and the part along it survives. The wind that comes out is therefore aligned with the valley, blowing whichever way down it the original wind already favoured, and slowed by however oblique it arrived. A wind square to a valley produces almost nothing at all in it, which is its own kind of answer — a still, swirling valley on a windy day tells you the valley lies across the weather.`,
      `And **a shore is worse than a valley, because it is wrong in both directions on the same day.** Land warms quickly in sunshine and the air above it rises, so air flows in off the water to replace it: an onshore breeze all afternoon. After dark the land loses its heat quickly and the water does not, so the flow reverses and runs out over the water before dawn. Any rule of the form "the wind here comes from the such-and-such" is therefore true for twelve hours and exactly backwards for the other twelve, and a tree on a shore is flagged by whichever of the two blows harder where it happens to stand.`
    ],
    comparison: {
      label: `THE DRAUGHT UNDER THE DOOR`,
      body: `Open a window at one end of a house on a breezy day and go and stand in the hallway. The draught in the hall does not come from the direction the wind outside is coming from; it comes along the hall, because that is the only way air can get from the open window to wherever it is going. Move into a side room and the draught changes direction again. Nobody finds this mysterious indoors. You would not dream of working out which way the house faces by feeling the draught in the hall — and a valley is a hallway with weather in it.`
    },
    naming: `Air steered along a valley is **channelled**, and the deflection is called **terrain channelling** or valley flow; the still, confused air in a valley lying across the weather is said to be **sheltered** or in the **lee**. Winds that a place makes for itself rather than receiving are **local winds**, and the two commonest are the **sea breeze** or **lake breeze**, which blows onshore by day, and the **land breeze**, which reverses it at night; in hill country the same daily reversal appears as **anabatic** flow up warming slopes by day and **katabatic** flow draining down cold slopes at night, which is why valley bottoms are frosty. A tree permanently bent by wind is **flagged**, and the deformation is **krummholz** where it is severe enough to crush the tree into a mat. The one piece of vocabulary worth being pedantic about is the convention: a wind is named for where it comes FROM, and a current for where it goes TO — which the course met in Lesson 24, and which turns a flagged tree 180° if you get it the wrong way round.`,
    formalNames: {
      terms: [
        { term: `Channelling`, meaning: `A valley shedding the across-valley part of the wind and keeping the along-valley part. The commonest reason the wind you feel is not the wind on the forecast.` },
        { term: `Local wind`, meaning: `One a place generates itself from its own heating and cooling, rather than receiving from the weather system. Reliable, repeating, and specific to that place.` },
        { term: `Sea or lake breeze`, meaning: `Onshore by day, because the land warms faster. Strongest in the afternoon, and absent on a cloudy day.` },
        { term: `Land breeze`, meaning: `The same thing reversed before dawn, because the land has cooled faster. 180° from the afternoon's wind, on the same beach.` },
        { term: `Flagging`, meaning: `A tree's branches swept to the lee by persistent wind. The flag points the way the wind GOES, not the way it comes from.` },
        { term: `Krummholz`, meaning: `Wind-crushed trees at the limit of their range, flattened into mats. The severe end of flagging, and a record of decades rather than a season.` },
        { term: `Lee and windward`, meaning: `The sheltered side and the exposed side. Where snow drifts, where soil collects, where the stunted trees are — and Lesson 34's second half.` }
      ],
      note: `The thing to carry out of this panel is the asymmetry of what a flagged tree is evidence FOR. It is strong evidence about the wind at that spot over many years — much better than your own memory, and the reason foresters and wind engineers read them. It is weak evidence about the regional wind, and no evidence at all about north. A sign can be excellent at one job and useless at the next one along.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where else does the shape of a place decide what you experience, so that what you feel tells you about the room rather than the world?`,
    items: [
      `A draughty hallway with a window open at the far end.`,
      `The one corner of a café where you cannot hear the person opposite.`,
      `The wind that funnels between two tall buildings on an otherwise still day.`,
      `A valley where the phone signal dies, three miles from the mast.`,
      `The warm step by the back door that the frost never reaches.`,
      `The way a bonfire's smoke follows you round it.`
    ],
    ownPlaceholder: `Somewhere the shape of the place decides what I feel…`,
    synthesis: `The smoke is the best of them, because everybody has been baffled by it and the explanation is exactly today's. The smoke is not following you. You are a body standing in a moving fluid, and you have made a low-pressure pocket on your downwind side that the smoke is filling — so the smoke is reporting the shape of the air around YOU, not the wind across the field. Move three feet and the report changes. A valley is a bigger version of standing in the way, and the wind in it is a report about the valley.`,
    builder: {
      body: `The experiment needs a blustery day and two places with different ground, ten minutes apart. At the first, work out the wind direction properly: stand with the wind in your face and turn until it is even in both ears, then take a bearing over your shoulder for where it is coming from, and write it down with the time. Now walk to the second — the other side of a ridge, the mouth of a valley, the lee of a wood — and do it again. Finally, and this is the part worth the walk, look up the forecast wind for your area at that hour. You will now have three numbers, at most one of which is the one on the forecast.`
    },
    acrossCultures: {
      place: `HAWAIʻI`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `If the wind were one thing, one name would do. Hawaiian tradition gives it hundreds. Winds are named individually and **by place** — a particular wind belongs to a particular ahupuaʻa, the land division running from the uplands to the sea, and is usually that district's best-known wind. Compilations drawn from chants and moʻolelo run to well over three hundred names across the islands; the dictionary notes that some are known only in one small area, with six distinct winds recorded for Honolulu alone and two for a single valley at Hālawa.`,
        `The names are carried in a story. The moʻolelo of Pākaʻa and his son Kūapākaʻa — published in Hawaiian as a newspaper serial in 1861 and later as *The Wind Gourd of Laʻamaomao* — turns on a gourd holding the winds of the islands, which can be called out by chanting their names, and the chants work round an island in order, naming the wind of each district as they go. Whatever else that is, it is a cataloguing system: a way of holding several hundred local facts about air and ground in a form a person can carry and recite. A culture that had found wind to be one thing would have had no use for it.`
      ],
      uncertain: `The moʻolelo is literature as well as record, and the wind lists in different sources do not agree: names appear in one chant and not another, spellings and districts vary, and compilations differ on how many names there are, so the "over three hundred" figure is a count of a compilation rather than a census of anything. Whether a given name denotes a direction, a season, a quality of air, or a place's wind in general is often unclear from the chant alone, and reading them as a system of directions would be exactly the mistake this lesson is about. The 1861 serial is the earliest published form; how old the material is, and how much the published version shaped later lists, is not settled.`,
      sources: `Nakuina, *The Wind Gourd of Laʻamaomao*, trans. Mookini and Nākoa (1990); Pukui and Elbert, *Hawaiian Dictionary* (1986).`
    }
  },

  feynman: {
    line: `Explain it to somebody who has just told you which way the wind is blowing.`,
    instruction: `Explain why the wind you can feel on your face is a poor guide to direction, and what it IS good evidence about.`,
    banned: ['prevailing', 'forecast', 'prediction'],
    bannedNote: `The first two let you blame the weather report instead of explaining what the ground does to the air, and the third is the same dodge wearing a coat. Say what happens to moving air when it meets a valley, a hill, or a shore.`,
    placeholder: `The air has to get from where it is to where it is going, and on the way…`,
    checks: [
      `It says what the ground does to moving air.`,
      `It explains why two places close together can have different winds at the same moment.`,
      `It says what a wind-bent tree is good evidence about.`,
      `It mentions at least one wind a place makes for itself, and when it changes.`
    ],
    closing: `The test for this one: would your explanation stop somebody using a flagged tree as a compass without also telling them the tree is worthless? It is not worthless. It is an excellent record of one thing and no record at all of another, and a good explanation keeps both halves.`
  },

  challenge: {
    voice: 'editor',
    line: `A question with a trap in the arithmetic rather than the meteorology.`,
    prediction: {
      question: `You are in a valley running north-west to south-east. You can feel the wind clearly, from the north-west, and you know the weather here is westerly most of the year. Which way is north?`,
      options: [
        {
          id: 'cannot',
          text: `You cannot tell. The valley has given that wind its direction, so it says nothing about the weather.`,
          verdict: `Right, and notice how little the strength of your feeling has to do with it. The wind in a valley is often clearer and steadier than the wind on open ground, because the valley has organised it — so the sign feels MORE trustworthy exactly where it is least informative. What the valley has told you is what the valley does, which you could have read off the map in half a second. The thing to do with the feeling is to recognise it: a clean, steady wind straight along a valley is evidence that you are in a valley, and that is all.`
        },
        {
          id: 'southwest',
          text: `The wind is really westerly, so the valley has turned it 45°; north is 45° round from where the wind seems to come from.`,
          verdict: `This is the clever wrong answer, and it fails because it needs the thing it is trying to find. To correct the deflection you must know the valley's axis in true terms — and if you knew that, you would already have north and would not need the wind. There is a second failure underneath: channelling does not turn a wind by a fixed amount, it ALIGNS it with the valley, so the deflection is whatever the difference happened to be. A wind from any direction with a westerly component produces the same reading in this valley, which means the reading cannot be inverted to recover what came in.`
        },
        {
          id: 'behind',
          text: `North-west is where the wind is from, so north is 45° clockwise from that — behind your right shoulder.`,
          verdict: `This is the move the lesson exists to stop, and it is worth seeing exactly where it goes wrong. The arithmetic is fine: if a wind really were from the north-west, north would indeed be 45° clockwise of it. What has failed is the premise. You have taken a measurement of the valley and used it as a measurement of the sky, and no amount of correct trigonometry afterwards can repair that. Had the real wind been from the west, this answer puts you 45° out; had the valley lain differently, more.`
        }
      ]
    },
    open: {
      question: `If the wind is a fact about the ground, is it any use to a traveller at all?`,
      placeholder: `It still tells me something, because…`,
      reveal: [
        `A great deal, once you stop asking it for north. A steady wind is the best short-term course-holder in the world: set off with it on your left cheek and you will walk a far straighter line than you will by staring at a compass every thirty paces, because you feel a change of two or three degrees immediately and continuously. It will drift over hours, so you check it against something absolute when you can — and that is exactly Lesson 28's pairing of an accumulated quantity with an absolute one, arriving in your face.`,
        `And it tells you about the ground, which is the whole of this week. A steady clean wind means an open line; a swirling one means you are in the lee of something; a sudden cold draught downhill at dusk means you are in a valley bottom and should camp higher. Tomorrow the same argument runs through water, which is even more useful and even more often misread.`
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
    line: `Two minutes, and this week has no homework you cannot do on a walk.`,
    prompt: `Write down the wind you believe is usual where you live, and then write down where you got that belief. A forecast? A flag? A tree? The side of the house the rain hits? Then go and check one of them.`,
    placeholder: `I think the wind here usually comes from…`,
    mapFooter: `Field Week, one of five. The first sign, and the first demonstration that a sign can be excellent evidence about the wrong question.`,
    tomorrow: `Water next, and water is the most reliable sign in this week and the most dangerous. It always goes downhill. What it does not always do is come out anywhere.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `Take a bearing on the wind properly, which almost nobody does: face into it and turn until it feels even in both ears, then read the bearing over your shoulder. Write it down with the time and the place. Do that four times in a day's walk and you will have four different numbers, and the differences will line up with the ground you crossed, not with the hours. The compass is doing its job perfectly throughout. What it is measuring is a different thing in each of the four places.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Before you read the wind, read the contours around you, and ask one question: which way could air get through here? A valley has two answers and a col has two; an open plateau has all of them. Then look at your map's scale and notice how little ground you need to cross to change the answer — half a mile over a ridge is a different wind. On a map, the wind is not a property of the sheet. It is a property of each square inch of it.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Run a tap gently and hold a spoon, back outwards, in the stream. The water does not bounce off in the direction it arrived from; it wraps round the spoon and leaves along the spoon's shape, and it will even pull the spoon towards the stream. Air does the same thing to a hill. What leaves the far side of an obstacle is going the obstacle's way, not its own, and if you measured the flow behind the spoon you would be measuring the spoon.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `Look at the grey arrows across the top of the picture and then at the blue ones in the valleys, and ignore everything else. The grey ones are all identical — one weather system, one direction. The blue ones are three different directions on one sheet of paper at one moment. Now drag the wind slider slowly: the grey arrows swing smoothly round, and the blue ones mostly do not move at all, until the wind passes square to a valley and that valley's arrow flips end for end. That flip is the whole mechanism on display.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `The forecast says west, 270°, twelve miles an hour. You are in a valley running north-west to south-east, so its axis is 330°–150°. The air arriving from the west is going east; the part of that going south-east survives and the part going north-east does not, so what you feel is a wind out of the north-west — from 330° — at twelve times the cosine of sixty degrees, which is six miles an hour. Everything about it is honest. If you now use it to find north you will be sixty degrees wrong, and a mile walked on that finishes a mile away from where you wanted to be.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Three questions, in order, and the third is the only one most people ask. One: what is the air doing in the region — from the forecast, from cloud movement, from a distant ridge's cap cloud. Two: what is the ground between there and me — a valley, a shore, a city, a wood, a slope in sunshine. Three: therefore what should I expect to feel here, and does what I actually feel agree? When the answer to three is no, you have learned something about the ground, which was always the more useful thing.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from the fact that needs explaining: wind-flagged trees are used seriously — by foresters, by people siting turbines, by ecologists — and they are not used as compasses by any of them. Why would a sign be good enough for an engineer and not for a walker? Because the engineer is asking what the wind does HERE, which is what the tree records, and the walker is asking where north is, which the tree has never been asked. Same tree, same evidence, two questions, and only one of them has an answer in the branches.`
    }
  ],

  map: [
    { name: `Wind is local`, level: 4, fresh: true },
    { name: `Channelling`, level: 4, fresh: true },
    { name: `Local winds and the daily reversal`, level: 4, fresh: true },
    { name: `Wind flagging`, level: 3, fresh: true },
    { name: `A sign of conditions is not a sign of direction`, level: 3, fresh: true },
    { name: `Knowing a method's limits`, level: 5 },
    { name: `Random and systematic error`, level: 5 }
  ]
}
