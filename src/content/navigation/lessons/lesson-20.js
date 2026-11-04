// Navigation · Week 4 · Lesson 20 — a night-sky navigation exercise
//
// The brief (Week 4, "A Night-Sky Navigation Exercise") asks the learner to
// identify useful stars, estimate direction, and understand how star paths
// depend on latitude and season. The weekly challenge is to explain how a
// navigator could use the night sky without a GPS.
//
// The Field Guide spec attaches an explicit instruction to Chapter 7:
//
//   "Do not teach that the highest point of any star's path universally
//    indicates south. Star paths depend on the star's declination, observer's
//    latitude, and direction of observation."
//
// So this lesson is built around that, and measures it. From src/lib/stars.js:
//
//   VEGA, declination 38.8°, on one night:
//     from Miami     (25.8° N)  crosses the meridian to the NORTH, 77.0° up
//     from Columbus  (40.0° N)  crosses to the SOUTH, 88.8° up — near zenith
//     from Anchorage (61.2° N)  crosses to the south, 67.6° up, never sets
//
//   The rule: a star crosses to the north if its declination is greater than
//   your latitude. At Columbus that is every star above declination 40°,
//   which is the whole Big Dipper and all of Cassiopeia.
//
//   Circumpolar limit — never sets if declination ≥ 90 − latitude:
//     Miami 64.2°, Columbus 50.0°, Anchorage 28.8°
//
//   And the rising point is fixed for a given star and latitude, which is the
//   whole basis of the star compass in Lesson 19. Sirius rises on 109° from
//   Miami, 112° from Columbus, 127° from Anchorage.
//
// Note a subtlety the copy has to respect: a circumpolar star crosses the
// meridian TWICE in a night, once above the pole and once below it. "Highest"
// is unambiguous; "crosses the meridian" is not.

export default {
  id: 'lesson-20',
  number: 5,
  week: 4,
  title: `A night-sky navigation exercise`,
  openingQuestion: `Is the highest point of a star's path south?`,
  concept: `Every star is a compass, if you know your own latitude`,

  fieldGuide: {
    chapter: 7,
    title: `Navigating by the Stars`,
    exercise: `Pick a bright star you can identify and watch it from the same spot on three clear nights, noting where on your skyline it rises. It will rise in the same place every time — four minutes earlier each night, but in the same place. That fixed rising point is a bearing you now own, and it is the foundation of every star compass in the world.`
  },

  see: {
    voice: 'professor',
    line: `The dashed line down the middle is your meridian — due north to due south. Change where you are standing and watch which stars cross it on which side.`,
    simulation: { id: 'star-sky', props: { mode: 'meridian' } },
    observations: [
      { text: `From Columbus, **thirteen** of these stars cross the meridian to the NORTH, not the south. That is the entire Big Dipper and all of Cassiopeia — the brightest, most recognisable things in the northern sky.` },
      { text: `Switch to Miami and **Vega** joins them. Switch to Anchorage and it leaves again. Same star, same night: north from one place, south from another, because the only thing that changed is where you stand.` },
      { text: `The rule is one comparison. A star crosses to the **north** if its declination is greater than your latitude, and to the **south** if it is less. Nothing else enters into it.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences to close the week. The first one contradicts something you have probably been told.`,
    sentences: [
      `**"Highest means south" is not a rule, it is a special case.** A star reaches its highest point when it crosses your meridian — that part is always true — but the meridian runs from due north to due south, and the star may cross it on either side of overhead. It crosses to the north whenever its declination is greater than your latitude. At Columbus that is every star above 40° of declination, which is most of the famous ones.`,
      `**A star's rising point is fixed by its declination and your latitude, and by nothing else.** Not the season, not the hour, not the year. Sirius rises on 109° from Miami and 127° from Anchorage, every single night, for a lifetime. That is why a horizon full of named rising points works as a compass, and why Pacific navigators could carry a compass in their memory.`,
      `And **which stars never set at all is your latitude in disguise.** A star stays up all night if its declination is at least 90° minus your latitude: 64° and above at Miami, 50° at Columbus, 29° at Anchorage. Go far enough north and half the sky never sets; stand on the equator and nothing is circumpolar and everything rises.`
    ],
    comparison: {
      label: `A ROOM WITH ONE HIGH WINDOW`,
      body: `Someone walks past a high window in a corridor, left to right, every day at the same time. From the bottom of the stairs you see them pass above the window frame; from the landing you see them pass below it. They walk the same route each day — what changed is your eye level, and with it which side of the frame they appear on. Your latitude is your eye level and the star's declination is the height of the walkway, and "do they pass above or below" is the whole of the first sentence.`
    },
    naming: `One more trap, and it is in the word "crosses". A star that never sets crosses your meridian **twice** a night — once above the pole, high up, and once below it, down near the horizon on the opposite side. At Anchorage, Alkaid crosses high to the south and low to the north on the same night. "Highest" is unambiguous and safe; "crosses the meridian" is not, and the difference has walked people the wrong way.`,
    formalNames: {
      terms: [
        { term: `Culmination`, meaning: `The moment a star crosses your meridian and is at its highest. Also called transit or meridian passage.` },
        { term: `Upper and lower culmination`, meaning: `The two meridian crossings a circumpolar star makes — above the pole and below it. Only the upper one is its highest point.` },
        { term: `Amplitude`, meaning: `How far from due east a star rises, or from due west it sets. Fixed by declination and latitude: cos(amplitude) = sin(declination) ÷ cos(latitude).` },
        { term: `Circumpolar`, meaning: `Never sets, from your latitude. The cut-off is declination ≥ 90° − latitude, and it is different for everyone.` },
        { term: `Star compass`, meaning: `A set of named horizon points where particular stars rise and set, used as directions. Lesson 19's Pacific method, and ibn Mājid's thirty-two rukhs from Lesson 8.` },
        { term: `Meridian`, meaning: `Your own north–south line, carried up over your head. Lesson 12 found it with a shadow; tonight you can find it with any star you can identify.` },
        { term: `Zenith star`, meaning: `One that passes directly overhead from a given latitude — its declination equals your latitude. Useful because overhead is an easy thing to judge without an instrument.` },
        { term: `Heliacal rising`, meaning: `The first morning of the year a star is visible before dawn, from Lesson 16. The sky's calendar, as against its clock and its compass.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Last one of the week. Where have you met a rule that only worked where you learned it?`,
    items: [
      `Advice about which side of the road to look first, abroad.`,
      `A recipe timing that only works at sea level.`,
      `"Moss grows on the north side of trees."`,
      `Sun-exposure advice written for a different latitude.`,
      `A plant care label for the wrong hemisphere's seasons.`,
      `Directions that assume you're coming from the usual way.`
    ],
    ownPlaceholder: `A rule you learned somewhere that didn't travel…`,
    synthesis: `The moss one is the real relative — a rule with a grain of truth, repeated as if it were universal, that depends on sun, shade, wind and rain in ways nobody mentions. "The highest point of a star's path is south" is the same shape of claim, and this week you have the measurements to say where it holds.`,
    builder: {
      body: `The week's challenge, and it takes one clear night. Go out without any instrument. Find the pole from the patterns, and mark true north on the ground with two stones. Then estimate your latitude from the pole's height using your fist. Then pick one bright star, note where it rises against your skyline, and write that bearing down. You now have a direction, a position line, and the first entry in a star compass of your own — and you did it with your hands.`
    },
    acrossCultures: {
      place: `ABORIGINAL AUSTRALIA`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Aboriginal Australian astronomical traditions include something most star lore does not: constellations made of **darkness**. The best known is the Emu in the Sky, formed not from stars but from the dark dust lanes of the Milky Way — the head at the Coalsack beside the Southern Cross, the neck and body stretching through Scorpius and beyond. Its changing orientation through the year is tied in several traditions to the breeding and egg-collecting season of the emu itself.`,
        `There is also direct navigational use. Recorded accounts describe star maps used to hold a route across country — sequences of stars whose rising points correspond to the directions of successive legs of a journey between waterholes and meeting places, which is the star compass of Lesson 19 applied to land rather than sea. These are not a single system: Aboriginal Australia comprises hundreds of language groups with distinct traditions, and the sky knowledge differs between them as much as the languages do.`
      ],
      uncertain: `Much of what is published in English comes through nineteenth and twentieth-century ethnographers whose recording was uneven and often extractive, and some sky traditions are restricted knowledge that is not public and should not be reconstructed from fragments. Specific claims — that a particular star map encodes a particular route, or that a given tradition is of a given antiquity — vary enormously in how well they are evidenced, and treating "Aboriginal astronomy" as one body of knowledge misrepresents several hundred distinct ones.`,
      sources: `Norris and Harney, "Songlines and Navigation in Wardaman and other Aboriginal Cultures," *Journal of Astronomical History and Heritage* (2014); Clarke, "The Aboriginal Australian Cosmic Landscape," *Journal of Astronomical History and Heritage* (2015); Hamacher, *The First Astronomers* (2022, with Elders as co-authors).`
    }
  },

  feynman: {
    line: `The last explanation of the week, and the week's challenge.`,
    instruction: `Explain how someone could find their way at night with no instruments at all — direction and rough position — using the sky. Then say one thing that is commonly taught about stars and direction that is not reliably true, and why.`,
    banned: ['polaris', 'north star', 'compass'],
    bannedNote: `The first two let you lean on the one lucky star the northern hemisphere happens to have, and the third is the instrument this whole week has been doing without. Explain it so that it would work for someone standing in Sydney.`,
    placeholder: `Even with nothing in your pockets, the sky gives you…`,
    checks: [
      `It gets a direction from the sky — from the still point, or from a known rising place on the horizon.`,
      `It gets a rough position as well as a direction, and says which one is which.`,
      `It names a commonly repeated claim that does not hold everywhere, and says what it depends on.`,
      `It would work for a reader in the southern hemisphere, or says plainly where it would not.`
    ],
    closing: `If your explanation works only from where you happen to live, it is the moss rule. The test of everything this week is whether it survives being carried to another latitude.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction, and one last question.`,
    prediction: {
      question: `You are in Miami. Vega passes almost overhead and you want to use it to find south. What happens?`,
      options: [
        {
          id: 'north',
          text: `You face the wrong way — from Miami, Vega crosses the meridian to the NORTH.`,
          verdict: `Right, and this is the Field Guide's warning made concrete. Vega's declination is 38.8° and Miami's latitude is 25.8°, so the star is further north than you are and crosses north of your zenith. Take its highest point as south and you have turned yourself around completely.`
        },
        {
          id: 'south',
          text: `It works — the highest point of any star's path is due south.`,
          verdict: `This is the claim the spec asks this course not to teach, and Miami and Vega are exactly why. It holds only when the star's declination is less than your latitude. Drive the same star north to Columbus and it becomes true again, which is what makes the rule so persuasive and so dangerous.`
        },
        {
          id: 'overhead',
          text: `Nothing useful — a star near the zenith is hopeless for direction.`,
          verdict: `There is something real in this: a star within a few degrees of overhead gives you a poor direction however correctly you reason about it, because its bearing changes very fast and judging "overhead" by eye is hard. The honest answer is both — the rule is wrong here AND the geometry is unfavourable here.`
        }
      ]
    },
    open: {
      question: `Four weeks in. You can find direction from a needle, a shadow and a star. What can you still not do?`,
      placeholder: `I can get direction four different ways now, but…`,
      reveal: [
        `Fix your position. You have half of it — latitude, from the pole's height, twice over now — and you have no way at all of knowing how far east or west you are. Every method in four weeks gives you a direction or a line, and a line is not a place.`,
        `Which is the shape of the rest of the course. Week 5 takes the lines you can already draw and crosses them, so that two bearings become a point. Week 6 goes after longitude, which needs a clock you can trust more than the one in your head — and you already know the exchange rate from Lesson 14: fifteen degrees to the hour, four minutes to the degree. Everything you need is now in your notebook except a way to carry the time.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-18',
        label: `Navigation, Lesson 18 — the stars and latitude`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `The last two minutes of the week.`,
    prompt: `Four weeks ago, "north" was wherever a needle pointed. Write down how many different ways you could now find it, and which one you would actually trust on a bad night.`,
    placeholder: `I could find north by…`,
    mapFooter: `Week 4 complete. The sky is a clock, a compass and half a position fix.`,
    tomorrow: `Next: crossing the lines. One bearing tells you where you are not; two bearings that cross tell you where you are, and the whole business of fixing a position turns out to be the geometry you already have, used twice.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `A star compass is a compass rose you build out of the horizon. Instead of 360 degrees on a dial, you have perhaps thirty named points — "where Sirius comes up", "where Vega goes down" — and you steer by holding your course against whichever is currently near the horizon. The dial is the skyline, the markings are stars, and the whole thing is carried in memory. It is not a metaphor: it is a working instrument with no moving parts.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Think of declination as a star's latitude on the sky. A star whose sky-latitude matches your Earth-latitude passes directly overhead; one further north than you passes north of overhead; one further south passes south. That single comparison — the star's number against yours — decides which side of your zenith it crosses, and therefore whether "highest" means south for you tonight.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Hold a hula hoop tilted and spin it: a point on the rim traces a circle tilted relative to your floor. Whether that point passes over your head to the left or right of centre depends on how far you are standing from the hoop's axis. Move yourself, and the same point on the same hoop passes on the other side. You have changed nothing about the hoop, which is the lesson about latitude.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `The dashed vertical line in the simulation is your meridian: north at the top, south at the bottom, and every star crosses it at its highest. Watch the readout count how many stars cross it on the north side, then change place. At Anchorage the number drops; at Miami it climbs. Nothing about the stars changed between those two clicks.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `Vega's declination is 38.8°. In Miami you are at 25.8°, so the star is 13° further north than you are: it crosses the meridian north of your zenith, 77° up, and its highest point points NORTH. In Columbus you are at 40.0°, just north of Vega, so it crosses south of your zenith — but only by 1.2°, which means it passes 88.8° up, within a couple of degrees of straight overhead. Technically south, practically useless, and a good reminder that a rule can be true and worthless at the same time.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Three numbers decide everything a star does for you. One: its declination, which you look up once and which never changes. Two: your latitude, which you measured in Lesson 18. Three: the comparison between them. If declination is bigger, it crosses north. If 90 minus your latitude is smaller than its declination, it never sets. Everything else — rising points, maximum height, how long it is up — follows from those two numbers in the same way.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from the oddity: Vega crosses north from Miami and south from Columbus, and those cities are only 14° apart. Why should a small change in where you stand flip an answer? Because the answer is not about the star at all — it is about whether the star is north or south of YOU, and Vega sits between the two cities in sky-latitude. Any rule that compares two quantities will flip when you cross the point where they are equal, and "highest means south" is such a rule wearing a disguise.`
    }
  ],

  map: [
    { name: `Star paths by latitude`, level: 4 },
    { name: `Rising and setting points`, level: 4 },
    { name: `Circumpolar stars`, level: 4 },
    { name: `Star compass`, level: 3 },
    { name: `The southern sky`, level: 4 },
    { name: `Latitude from the pole`, level: 5 },
    { name: `Finding the pole`, level: 5 },
    { name: `Systematic vs careless error`, level: 4 },
    { name: `Knowing a method's limits`, level: 5 },
    { name: `Star declination`, level: 5 },
    { name: `Line of position`, level: 5 },
    { name: `Position`, level: 5 },
    { name: `The turning sky`, level: 5 }
  ]
}
