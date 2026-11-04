// Navigation · Week 1 · Lesson 3 — the language of latitude and longitude.
//
// The brief (§3, Week 1) asks for the coordinate system; degrees, minutes and
// seconds; reading and interpreting coordinates; and why lines of longitude
// meet at the poles. The lesson's real difficulty is the last one, and it is
// not a fact to be told — it is the reason the two numbers behave differently.
// So GlobeGrid puts both on screen at once and lets the longitude figure
// collapse as the learner slides north.
//
// Every figure below was measured before it was written, with the same
// arithmetic the simulation uses:
//
//   1° of latitude   69.06 mi, at every latitude   (24,860 / 360)
//   1′ of latitude    1.151 mi = one nautical mile
//   1″ of latitude      101 ft
//   1° of longitude  69.17 × cos(latitude):
//                      0° → 69.2    45° → 48.9    60° → 34.6 (exactly half)
//                     75° → 17.9    89° →  1.2    90° →  0.0
//   Columbus, Ohio   39.9612° N = 39° 57′ 40″ N; 83° W
//                    39.9612 × 69.06 = 2,760 mi north of the Equator
//                    83 × 69.17 × cos(39.96) = 4,400 mi west of Greenwich
//   Times Square     40.7580, −73.9855

export default {
  id: 'lesson-03',
  number: 3,
  week: 1,
  title: `The language of latitude and longitude`,
  openingQuestion: `Your house has an address because somebody laid out the streets and numbered them. The open ocean has no streets. So how do you give an address to a spot out there — and have a stranger find it?`,
  concept: `A coordinate is two measured angles`,

  fieldGuide: {
    chapter: 2,
    title: `Latitude and Longitude`,
    exercise: `Reading your own front door's coordinates, then walking a hundred yards north and reading them again, to feel which of the two numbers moves — the globe's two readouts, measured with your feet.`
  },

  see: {
    voice: 'professor',
    line: `Slide the marker north and watch the two distances underneath. One of them is not like the other.`,
    simulation: { id: 'globe-grid' },
    observations: [
      { text: `One degree of **latitude** is about **69 miles** — and it is the same 69 miles at the Equator, in Ohio, and out on the Arctic ice.` },
      { text: `One degree of **longitude** is 69 miles at the Equator, **49 miles** at 45° N, **35 miles** at 60° N, and **nothing at all** at the pole.` },
      { text: `So the two numbers aren't the same kind of number. Latitude is a distance wearing a disguise. Longitude is a share of a circle that keeps shrinking.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The third one is the one people get wrong.`,
    sentences: [
      `**Latitude** is how far north or south you are, measured as an angle from the Equator: 0° at the Equator, 90° at each pole. Lines of equal latitude are the **parallels** — circles that never meet, stacked up like the rungs of a ladder, evenly spaced all the way.`,
      `**Longitude** is how far east or west you are, measured as an angle around the axis, counted from a line that somebody had to choose: the **prime meridian** through Greenwich, in London. Lines of equal longitude are the **meridians** — half-circles that all run pole to pole, widest apart at the Equator and meeting at both ends.`,
      `Two angles name exactly one spot on Earth. Write them in **degrees, minutes and seconds** — a degree is 60 minutes, a minute is 60 seconds — and always say which hemisphere, or you have named two places: *39° 57′ 40″ N, 83° 00′ 00″ W*.`
    ],
    comparison: {
      label: `A LADDER AND AN ORANGE`,
      body: `Latitude is a ladder. The rungs are evenly spaced from bottom to top, so "four rungs up" is the same climb wherever you are on it. Longitude is the segments of an orange. Every segment is the same share of the whole fruit — but the strip of peel you would cut out is wide around the belly and comes to nothing at the top and the bottom. Latitude tells you which rung. Longitude tells you which segment.`
    },
    naming: `That even spacing of the rungs handed sailors a free gift. One minute of latitude — a sixtieth of a degree — is about 1.15 statute miles, and that distance was given its own name: **one nautical mile**. It is no coincidence. The nautical mile was *defined* from the Earth, which means the latitude scale printed up the side of a chart doubles as a ruler. Count the minutes up the edge and you have counted miles. A minute of longitude could never do that job, because how long it is depends on where you are standing.`,
    formalNames: {
      terms: [
        { term: `Latitude`, meaning: `The angle north or south of the Equator, from 0° to 90°. Say N or S.` },
        { term: `Longitude`, meaning: `The angle east or west of the prime meridian, from 0° to 180°. Say E or W.` },
        { term: `Parallel`, meaning: `A circle of equal latitude. They shrink as they climb but never meet, and their spacing stays even.` },
        { term: `Meridian`, meaning: `A half-circle of equal longitude, running pole to pole. Every one of them meets every other at both poles.` },
        { term: `Prime meridian`, meaning: `The meridian agreed to be 0°, through the old Royal Observatory at Greenwich. An agreement among people, not a fact about the Earth.` },
        { term: `Degrees, minutes, seconds`, meaning: `1° = 60′ = 3,600″. One second of latitude is about 101 feet — roughly the length of a tennis court.` },
        { term: `Decimal degrees`, meaning: `The same angle written 39.9612° instead of 39° 57′ 40″. Phones and computers prefer it; charts and older books use minutes and seconds.` },
        { term: `Nautical mile`, meaning: `One minute of latitude: about 1.15 statute miles, or 6,076 feet. A speed of one nautical mile an hour is one **knot**.` },
        { term: `Antimeridian`, meaning: `180°, on the far side of the world from Greenwich, where east finally meets west.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `This pair of numbers is already in your pocket. Which of these have you run into?`,
    items: [
      `Dropping a pin in a phone map and texting it to someone — that pin is a latitude and a longitude.`,
      `A weather report giving a hurricane's position out at sea, where there is nothing to name it after.`,
      `A GPS unit at a trailhead reading out coordinates to five decimal places.`,
      `A flight tracker showing a plane over the middle of the ocean, nowhere near any city.`,
      `A geocache listing that is nothing but a pair of coordinates and a hint.`,
      `A dispatcher asking where you are, and there being no street to give them.`
    ],
    builder: {
      body: `Go outside and get the coordinates of your own front door, in degrees, minutes and seconds if your phone will give them. Write them down. Now walk a hundred yards as close to due north as you can manage, and look again. Latitude will have changed by about **three seconds** — a second of latitude is about 101 feet, and you just walked three of them. Longitude will not have moved at all. You have measured the difference between the two numbers with your feet.`
    },
    acrossCultures: {
      place: `ALEXANDRIA AND BAGHDAD`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Around 150 CE, Claudius Ptolemy, a scholar working in Roman Alexandria, compiled the *Geographia*: a list of roughly eight thousand places, each one given a latitude and a longitude. The idea is exactly the one you have just used — two angles, with a chosen starting line for the second. Ptolemy's zero ran through the "Fortunate Isles," most likely the Canaries, for no better reason than that they were the westernmost land he knew of.`,
        `Latitude he could measure, from the Sun or the stars. Longitude he could not, and he said so: his east-west figures came from travellers' accounts of how far and in which direction they had gone, and they stretched the Mediterranean far too wide. Seven centuries later in Baghdad, scholars working under the caliph al-Ma'mun had the *Geographia* translated into Arabic and set about correcting it. Al-Khwārizmī's *Kitāb Ṣūrat al-Arḍ* — the Book of the Picture of the Earth, about 833 CE — re-listed the places with revised coordinates and pulled the length of the Mediterranean much closer to the truth.`
      ],
      uncertain: `Ptolemy's own manuscript is lost. Every copy we have descends from Byzantine versions made a thousand years later, and scholars still argue over which numbers are his and which are a copyist's. For most entries it is also not recorded how al-Khwārizmī's team arrived at a particular correction — fresh measurement, better travel accounts, or calculation.`,
      sources: `Ptolemy, *Geography*, trans. Berggren & Jones (2000); al-Khwārizmī, *Kitāb Ṣūrat al-Arḍ*, ed. von Mžik (1926); Sezgin, *The Contribution of the Arabic-Islamic Geographers to the Formation of the World Map* (2005).`
    },
    ownPlaceholder: `Somewhere I've seen a pair of coordinates doing real work…`,
    synthesis: `All of them are the same move: two angles, and an agreement about where to start counting the second one. The Earth hands you the first number. People had to vote on the second.`
  },

  feynman: {
    line: `This is the stage that counts. Write it and the lesson is yours.`,
    instruction: `Explain to someone why a degree of latitude is always about 69 miles but a degree of longitude isn't — **without using the words "converge," "meridian," or "cosine."**`,
    banned: ['converge', 'meridian', 'cosine'],
    bannedNote: `one of those came back — and the answer is stronger without them`,
    placeholder: `Going north or south, every degree is the same step because…`,
    checks: [
      `The east-west lines are evenly spaced circles stacked from the Equator to the poles, so one degree north is the same step anywhere.`,
      `The north-south lines are all the same length, but they are spread wide at the Equator and squeezed together towards the poles.`,
      `So one degree of east-west is a wide gap at the Equator, a narrow one in Alaska, and nothing at all at the pole.`,
      `Which is why a minute of latitude makes a usable ruler and a minute of longitude does not.`
    ],
    closing: `If your version says "the north-south lines get closer together as you go north," you have it — and you never needed the word.`
  },

  challenge: {
    voice: 'editor',
    line: `One number to guess, and one question about who gets to decide.`,
    prediction: {
      question: `Two towns sit at 60° N, one degree of longitude apart. Two more sit on the Equator, also one degree of longitude apart. How do the two gaps compare?`,
      options: [
        {
          id: 'half',
          text: `The pair at 60° N are about half as far apart.`,
          verdict: `Half, as near as makes no difference — and at 60° it is *exactly* half, which is a nice accident of that particular latitude. About 35 miles against about 69. Go back to SEE IT, slide the marker to 60° N, and read it off: 34.6 miles against 69.2 at the Equator. The width of a degree of longitude shrinks in step with how far around the axis you are measuring.`
        },
        {
          id: 'same',
          text: `The same — a degree is a degree.`,
          verdict: `A degree is the same *angle*, and that is exactly the trap. An angle does not come with a length attached; you only get a distance once you say how far out from the centre you are measuring it. At 60° N you are measuring on a circle half as wide as the Equator, so the same angle buys you half the miles: about 35 instead of about 69. This is why ships' navigators never used longitude as a ruler.`
        },
        {
          id: 'twice',
          text: `The pair at 60° N are about twice as far apart.`,
          verdict: `The other way round. Picture the orange again: the segment edges are furthest apart around the belly and squeeze together towards the top. Go north and the same one-degree gap gets narrower, never wider. At 60° N it is about 35 miles; at the Equator about 69. Keep going and it closes entirely — at the North Pole every degree of longitude is zero miles wide, because they all meet in the one spot you are standing on.`
        }
      ]
    },
    open: {
      question: `Latitude zero is the Equator, and nobody chose that — the Earth did. Longitude zero runs through one particular building in London. Why could latitude never have been put somewhere else, while longitude had to be voted on?`,
      placeholder: `Because the spinning Earth already picks out…`,
      reveal: [
        `The Earth is spinning, and the spin hands you latitude's starting line for free. The axis picks out two poles; the circle exactly halfway between them is the Equator, and anybody, anywhere, can find it without asking anyone's permission. Stand on it at an equinox and the noon Sun is straight overhead, with both poles on the horizon. There is nothing to agree about.`,
        `The spin does not pick out any **one** north-south line, because they are all alike — every one runs pole to pole, and the Earth turns past all of them equally. So the zero had to be agreed, and for a long time it wasn't: French charts counted from Paris, Spanish from Cádiz, American from Washington. In October 1884, delegates from twenty-five nations met in Washington and voted — twenty-two for Greenwich, San Domingo against, France and Brazil abstaining. Greenwich won mostly because most of the world's shipping was already buying British charts. France kept counting from Paris on its own charts for another quarter-century.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then you're done.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 4: maps. Peeling this grid off a ball and laying it flat on a sheet of paper — which cannot be done honestly. Every map in the world is somebody's decision about where to lie.`
  },

  routes: [
    { id: 'compass', label: `Explain it with a compass`, body: `A compass is no help at all here, and it is worth knowing why. The needle tells you which way north is. It has nothing to say about how far north you are, and nothing whatever about east and west. Direction and position are different questions — that was Lesson 1's whole point. Latitude and longitude are position. The compass gets its own week.` },
    { id: 'map', label: `Explain it with a map`, body: `Open any road atlas and look at the very edge of a page. Along the top and bottom there are small ticks with numbers like 83° 00′, 82° 50′, 82° 40′. Up the two sides, 40° 10′, 40° 20′. Those are your two numbers. The page is a piece of the grid and the ticks mark where the lines would cross it. Put one finger on a tick along the top and one on a tick up the side, slide them towards each other, and where they meet is a coordinate.` },
    { id: 'object', label: `Use an everyday object`, body: `Get an orange and a marker. Draw a line all the way round the middle — that is the Equator, latitude 0. Draw two more circles, one above it and one below, keeping them parallel. Those are parallels: notice they get smaller as they climb, but the gaps between them stay even. Now draw a line from the top of the orange to the bottom, over the side. That is one line of longitude. Add another, and another. They all meet at the top and the bottom, and they are furthest apart on the first line you drew.` },
    { id: 'diagram', label: `Show me a diagram`, body: `Go back to SEE IT and do one thing only. Leave longitude alone, and drag the latitude slider slowly from 0 up to 90. Watch nothing but the third readout — one degree of longitude here. It starts at 69.2 miles, passes 48.9 at 45°, 34.6 at 60°, 17.9 at 75°, and arrives at 0.0 at the pole. That one number falling away to nothing is the entire lesson. Meanwhile the readout beside it, one degree of latitude, never moves.` },
    { id: 'example', label: `Walk me through an example`, body: `Take one real address. Columbus, Ohio is at about 39.96° N, 83.00° W — in degrees, minutes and seconds, 39° 57′ 40″ N, 83° 00′ 00″ W. Read it as two instructions. First: start at the Equator and go north by 39 degrees and 57 and two-thirds minutes of angle. That is about 2,760 miles. Second: start at the line through Greenwich and go west by 83 degrees of turn — which at this latitude is about 4,400 miles, though at the Equator the same 83 degrees would be 5,741. Two angles, one spot, and not a street name anywhere.` },
    { id: 'smaller', label: `Break it into smaller steps`, body: `Four small questions. One: can you say how far north you are without mentioning east or west at all? Yes — that is latitude. Two: can you say how far east you are without mentioning north or south? Yes — that is longitude. Three: does "how far north" need a starting line that somebody chose? No. The spinning Earth hands you the Equator. Four: does "how far east" need one? Yes. And that is the only genuinely hard part of this lesson.` },
    { id: 'backward', label: `Work backward from the answer`, body: `Start with a reading off a phone: 40.7580, −73.9855. Work backward. The minus on the second number means west, so this is 40.7580° N, 73.9855° W. The second number sits between 73 and 74, which puts it on the eastern edge of North America. The first puts it a little under halfway from the Equator to the pole. Both together, and the whole Earth has narrowed to one street corner: Times Square, New York. Two numbers, no names at all.` }
  ],

  map: [
    { name: `Latitude & longitude`, level: 4 },
    { name: `Direction vs. position`, level: 4 },
    { name: `Earth's shape`, level: 4 },
    { name: `Position`, level: 4 },
    { name: `Reference point`, level: 4 },
    { name: `Poles, Equator & hemispheres`, level: 4 },
    { name: `Degrees, minutes & seconds`, level: 3 },
    { name: `The nautical mile`, level: 3 },
    { name: `A chosen zero`, level: 3 },
    { name: `Earth's rotation`, level: 3 },
    { name: `Horizon`, level: 3 },
    { name: `Map projection`, level: 1 },
    { name: `Great circle`, level: 1 },
    { name: `Magnetic north`, level: 0 }
  ]
}
