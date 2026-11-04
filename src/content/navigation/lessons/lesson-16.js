// Navigation · Week 4 · Lesson 16 — the night sky is a clock and a compass
//
// The brief (Week 4, "The Night Sky Is a Clock and a Compass") asks why stars
// appear to move, the Earth's rotation and the celestial sphere, and
// constellations as recognisable patterns.
//
// The point to land is that the night sky's motion is the SAME motion as the
// day's — one rotation — and that the stars are better at showing it than the
// Sun is, because there are thousands of them and they leave trails.
//
// Measured off the simulation, which computes from src/lib/stars.js (J2000
// catalogue positions precessed to 2026; the precession is checked against
// published Polaris figures in src/__tests__/stars.test.js):
//
//   at Columbus the Big Dipper and Cassiopeia sit on opposite sides of
//   Polaris and swap places over twelve hours
//   a star returns to the same spot 3 minutes 56 seconds earlier each night,
//   which is four minutes a day and two hours a month
//
// The sidereal day is the quiet idea of the lesson: the sky keeps a different
// clock from the Sun, and the difference is one whole turn per year.

export default {
  id: 'lesson-16',
  number: 1,
  week: 4,
  title: `The night sky is a clock and a compass`,
  openingQuestion: `What is the night sky doing while you sleep?`,
  concept: `One turn, seen from the dark side`,

  fieldGuide: {
    chapter: 7,
    title: `Navigating by the Stars`,
    exercise: `Go out twice in one night — once early, once three hours later — and both times note where one bright star sits relative to a fixed object: a chimney, a telephone pole, the corner of a roof. You will have measured the Earth's rotation with a chimney.`
  },

  see: {
    voice: 'professor',
    line: `Same sky, one night. Turn the trails on and move through the hours.`,
    simulation: { id: 'star-sky', props: { mode: 'turning' } },
    observations: [
      { text: `Every trail is an arc, and every arc is centred on the same point. Nothing is drifting in its own direction — the whole sky is one rigid thing turning.` },
      { text: `The arcs get smaller nearer that centre and bigger further away. A star close to it barely moves all night; one near the horizon sweeps right across.` },
      { text: `At the centre sits **Polaris**, almost still. It is the only star in the picture that is nearly where it was six hours ago, and that is the entire reason it matters.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The first is Lesson 11's sentence, said again at night.`,
    sentences: [
      `The stars are not moving. **You are turning**, once a day, and everything you can see turns with the sky because none of it is attached to you. The night sky's wheel and the Sun's daily arc are the same rotation; the only difference is that at night there are thousands of markers instead of one.`,
      `The axis you are turning on points at a fixed spot in the sky — the **celestial pole** — and that is why every trail is a circle centred on it. The pole is not a thing, it is a direction: where the Earth's axis, extended, happens to cross the sky.`,
      `And the sky runs **fast on the Sun** by about four minutes a day. After a year's worth of four minutes the stars have gained a full twenty-four hours, which is exactly the one extra turn the Earth makes by going round the Sun. That is why the constellations belong to seasons.`
    ],
    comparison: {
      label: `A CEILING PAINTED WITH STARS`,
      body: `Imagine lying on a slowly spinning carousel floor, looking up at a painted ceiling that does not move. The painted stars appear to wheel over you, all at the same rate, all in circles around one point — the spot directly above the spindle. Someone who has never seen the spindle can still find it, because it is the only part of the ceiling that stays put. You do not have to believe the floor is moving to use the trick. You only have to notice that one point does not go anywhere.`
    },
    naming: `A warning this course will keep returning to: the pole is a **direction**, not a star. There happens to be a reasonably bright star near it now, which is a piece of luck lasting a few thousand years. The Greeks had no bright pole star worth the name and navigated anyway. Tomorrow's lesson is about how to find the point, and Polaris is only the current convenience.`,
    formalNames: {
      terms: [
        { term: `Celestial sphere`, meaning: `The convenient fiction that the sky is a ball with us at the centre. Nobody believes it; everybody calculates with it, because for direction-finding the distances do not matter.` },
        { term: `Celestial pole`, meaning: `Where the Earth's axis, extended, meets that sphere. The point every star circles. There are two, one north and one south.` },
        { term: `Celestial equator`, meaning: `The Earth's equator, extended outward. A star on it rises due east and sets due west, from anywhere.` },
        { term: `Declination (of a star)`, meaning: `How far north or south of the celestial equator a star sits. Its latitude on the sky, and it does not change through the night or the year.` },
        { term: `Right ascension`, meaning: `The sky's longitude, measured eastward, usually in hours rather than degrees. With declination it fixes a star for good.` },
        { term: `Circumpolar`, meaning: `Close enough to the pole that it never sets — it circles all night. Which stars qualify depends entirely on your latitude, and Lesson 20 makes that the whole exercise.` },
        { term: `Sidereal day`, meaning: `One turn of the Earth relative to the stars: 23 hours 56 minutes 4 seconds. Shorter than a solar day, and the four-minute difference is this lesson's third sentence.` },
        { term: `Asterism`, meaning: `A recognisable pattern that is not one of the official constellations. The Big Dipper is an asterism inside the constellation Ursa Major; the Summer Triangle is one spanning three.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `The sky moving is something you have half-noticed for years.`,
    items: [
      `A long-exposure photo with star trails curving round one point.`,
      `Orion being a winter thing and not a summer thing.`,
      `Noticing a bright star has moved after being inside for an hour.`,
      `The Moon seeming to follow the car.`,
      `Someone saying "that's the North Star" and pointing at the wrong one.`,
      `A planetarium show speeding up the night.`
    ],
    ownPlaceholder: `A time you noticed the sky had moved…`,
    synthesis: `The photograph is the one to keep: that is this lesson, already taken, by someone who left a shutter open. Every arc in it is a star, every arc has the same centre, and the length of the arcs tells you how long the shutter was open.`,
    builder: {
      body: `Pick a bright star low in the east and line it up with something fixed — the edge of a window frame works if you mark where your head goes. Come back in an hour. It will have moved about fifteen degrees, which is a hand's breadth at arm's length, and it will have moved UP and to the right. Do the same with a star in the west and it will have gone down. You have just established which way the sky turns, which is the one fact tomorrow needs.`
    },
    acrossCultures: {
      place: `EGYPT, THIRD MILLENNIUM BCE ONWARDS`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Egyptian astronomers tracked the **heliacal rising** of Sirius — the first morning of the year the star is visible in the dawn before the Sun drowns it. Through most of the year Sirius rises in daylight and cannot be seen at all; for about seventy days it is entirely absent; then one morning it reappears just above the eastern horizon in the twilight. That morning fell close to the start of the Nile's annual flood, and the event is recorded in Egyptian texts as the rising of Sopdet.`,
        `What makes this a navigation lesson rather than a calendar one is the reason it works. A heliacal rising is the sidereal day and the solar day drifting apart at four minutes a day, read off a single star — the same four minutes as the third sentence above, accumulated until the star has climbed clear of the Sun's glare. Egypt was using the sky as a clock whose unit was the year, long before anyone had a clock whose unit was the hour.`
      ],
      uncertain: `The flood and the rising coincide only loosely and only at particular latitudes and periods, and a civil calendar of 365 days with no leap day drifts against the seasons by a day every four years — so the relationship between the Egyptian civil year, the agricultural year and Sirius changes across three millennia. Attempts to use recorded Sothic risings to pin absolute dates for Egyptian chronology have been argued over for more than a century and remain contested, because the observing latitude, the exact visibility criterion and the authorship of the surviving records are all uncertain.`,
      sources: `Parker, *The Calendars of Ancient Egypt* (1950); Depuydt, "The Function of the Ebers Calendar Concordance," *Orientalia* (1996); Clagett, *Ancient Egyptian Science, Volume II: Calendars, Clocks, and Astronomy* (1995).`
    }
  },

  feynman: {
    line: `Your turn. Someone who has never looked up on purpose.`,
    instruction: `Explain why the stars appear to move across the sky at night, and why one of them appears not to. Do it without the words below — describe what is happening, do not name it.`,
    banned: ['constellation', 'celestial', 'sphere'],
    bannedNote: `All three let you gesture at a category instead of describing a motion. "The celestial sphere rotates" is a sentence that explains nothing to someone who does not already know; say what turns, around what, and how fast.`,
    placeholder: `The stars aren't really going anywhere. What's happening is…`,
    checks: [
      `It says the movement is the Earth turning, and that all the stars move together as one piece.`,
      `It explains the still point as the direction the Earth's axis points, not as a special star.`,
      `It gives a rate — a full turn in a day, or fifteen degrees in an hour — rather than only "slowly".`,
      `It is clear that the same turning makes the Sun cross the sky by day.`
    ],
    closing: `If your explanation made the still point special because a star is there, read it again. The point would be there with no star on it at all, and for most of history there was not much of one.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction, then a question with a long answer.`,
    prediction: {
      question: `You photograph the northern sky for two hours with the shutter open. How long are the arcs?`,
      options: [
        {
          id: 'thirty',
          text: `Each arc covers 30° of its circle.`,
          verdict: `Right. The sky turns 360° in roughly 24 hours, so 15° an hour, so 30° in two. Every arc covers the same ANGLE — which is why trails near the pole are short lines and trails far from it are long sweeps, despite taking exactly as long.`
        },
        {
          id: 'depends',
          text: `It depends on the star — some move faster than others.`,
          verdict: `They all turn through the same angle in the same time; what differs is the radius of the circle they are turning on. A star near the pole has a tiny circle, so 30° of it is a short stroke. A star near the celestial equator has the biggest circle there is.`
        },
        {
          id: 'hour',
          text: `About 2° — the stars barely move in two hours.`,
          verdict: `Have a look at the simulation's trails, which are drawn over six hours. The sky moves a great deal faster than people expect: fifteen degrees an hour is a fist at arm's length every sixty minutes, which is easy to see against a chimney in a single cup of tea.`
        }
      ]
    },
    open: {
      question: `A star rises four minutes earlier each night. What does that add up to over a year, and why that number?`,
      placeholder: `Four minutes a day for a year is about…`,
      reveal: [
        `Four minutes a day for 365 days is 1,460 minutes — twenty-four hours and twenty minutes, near enough one whole day. So after a year a star rises at the same clock time it did when you started, having gained exactly one full turn on the Sun.`,
        `And that extra turn is the year itself. The Earth spins about 366.25 times relative to the stars while going once round the Sun, but we only count 365.25 **days**, because one of those turns is used up by the orbit — going round the Sun once means facing it one fewer time. The four minutes a night is the year, paid for in nightly instalments.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-11',
        label: `Navigation, Lesson 11 — why the Sun appears to move`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `Write down the last time you looked at the night sky on purpose, and what you were looking for. Then write what you would look for now.`,
    placeholder: `The last time I actually looked up…`,
    mapFooter: `The sky turns, and one point does not. Everything this week hangs off that.`,
    tomorrow: `Tomorrow: finding that point. There is a star near it, two others that point at it, and a W-shaped pattern on the far side that works when the first two are behind a hill.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `A compass needle settles along a field and stays there. The sky does the opposite: everything in it moves, all night, at a steady fifteen degrees an hour. But the CENTRE of that movement is as fixed as any needle — more so, since no belt buckle can pull it. Think of the night sky as a compass whose needle is the only thing standing still while the dial spins.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `The sky has latitude and longitude of its own: declination and right ascension. A star's declination is as fixed as a town's latitude, which is why the same stars are overhead from the same places year after year. Take the sky as a map pinned at one point — the pole — and turned slowly round that pin, and everything in this week follows.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Open an umbrella and spin it slowly by the handle while looking up into it. Every point on the fabric goes round; the ones near the middle shuffle, the ones near the rim swing. Nothing moves relative to anything else — the umbrella is rigid, and so, for our purposes, is the sky. The point where the handle meets the fabric is the celestial pole.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `Turn the trails on in the simulation. Each faint arc is where one star has been over the past six hours. Look at three things in order: the arcs are all concentric, so the sky is one rigid thing; they are all the same angular length, so everything turns at one rate; and the arcs shrink to nothing at one spot. That spot is not drawn. It is where Polaris nearly is.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `At nine o'clock a star sits one hand's breadth above a chimney — about ten degrees. The sky turns fifteen degrees an hour. By ten o'clock it will have gone through fifteen degrees of its circle; if it is rising in the east it will be roughly two hands up instead of one. By one in the morning it will be about sixty degrees round from where it was. Nothing about the star changed; you turned sixty degrees away from where you were standing.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Three claims, each checkable by yourself in one night. One: the stars keep their positions relative to each other — the Big Dipper is the same shape at midnight as at dusk. Two: the whole pattern changes its position relative to your horizon. Three: it does so by turning about one point rather than sliding. If you accept all three, the sky is a rigid thing rotating, which is the lesson.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from the end: the still point is where the Earth's axis points. Why would any point be still? Because you are turning on an axis, and the direction that axis points does not change as you spin — the sky in that direction stays put while everything else sweeps past. Why is it the axis and not something else? Because the trails are circles centred on it, and a rotation is the only motion that makes concentric circles with one fixed centre.`
    }
  ],

  map: [
    { name: `The turning sky`, level: 3 },
    { name: `The celestial pole`, level: 3 },
    { name: `Star declination`, level: 2 },
    { name: `The sidereal day`, level: 2 },
    { name: `The Sun's daily path`, level: 5 },
    { name: `Solar noon`, level: 5 },
    { name: `The noon line`, level: 5 },
    { name: `Shadow direction and length`, level: 5 },
    { name: `Knowing a method's limits`, level: 4 },
    { name: `Converting a bearing`, level: 5 },
    { name: `Declination`, level: 5 },
    { name: `True, magnetic & grid north`, level: 5 },
    { name: `Position`, level: 5 }
  ]
}
