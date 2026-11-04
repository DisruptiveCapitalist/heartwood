// Navigation · Week 4 · Lesson 19 — the southern sky and other star traditions
//
// The brief (Week 4, "The Southern Sky and Other Star Traditions") asks for
// the Southern Cross and the southern celestial pole, navigation where Polaris
// is unavailable, and how different cultures interpreted and used the sky.
//
// MEASURED from src/lib/stars.js, 2026:
//
//   the long axis, Gacrux to Acrux            6.01°
//   "4.5 lengths past Acrux" lands            2.68° from the south pole
//   the best any multiple can do              2.65°, at 4.43 lengths
//   the Centaurus cross-check lands           2.86°
//
// The finding, and it is the point of the lesson: both famous methods are
// stuck on the SAME line, and that line misses the pole by 2.65° at its
// closest. So care cannot improve them — unlike Lesson 13's shadow method,
// where choosing a better hour changed the answer by a factor of thirty.
//
// And the asymmetry with Lesson 17: the northern pointers are no better (2.6°
// off) but it does not matter, because Polaris is sitting there to catch you.
// The south celestial pole has nothing on it brighter than fifth magnitude.
// The same sloppiness is harmless in one hemisphere and decisive in the other,
// which is a better lesson than either method on its own.

export default {
  id: 'lesson-19',
  number: 4,
  week: 4,
  title: `The southern sky and other star traditions`,
  openingQuestion: `What do you do when there is no pole star?`,
  concept: `The same error, with nothing there to catch it`,

  fieldGuide: {
    chapter: 7,
    title: `Navigating by the Stars`,
    exercise: `For readers in the southern hemisphere: find the Cross, step the axis out four and a half lengths past its foot, and mark the spot against a fixed object on the ground. Come back two hours later. The Cross will have swung right round, and your mark should still be pointing the same way — that is how you know you found the pole and not a star.`
  },

  see: {
    voice: 'professor',
    line: `Sydney, looking at the southern pole. The dashed line is the rule everyone quotes.`,
    simulation: { id: 'star-sky', props: { mode: 'south' } },
    observations: [
      { text: `The Cross's long axis, extended **four and a half of its own lengths past Acrux**, lands **2.7°** from the true pole — marked by the small ring, which has no star in it.` },
      { text: `There is nothing bright there to correct you. The nearest naked-eye star to the southern pole is fifth magnitude, at the very limit of unaided sight and invisible from any town.` },
      { text: `Move through the night: the whole arrangement swings round the ring, and the rule keeps working at every angle — because, as in Lesson 17, the geometry inside a pattern does not care which way up it is.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the second one is the week's real finding.`,
    sentences: [
      `**The southern sky has a pole and no pole star.** The geometry of Lesson 18 is unchanged — the south celestial pole's height above your southern horizon is your latitude, exactly — but there is no convenient bright marker sitting on it, so you have to construct the point from patterns every time.`,
      `**The famous method is as good as it gets, and that is not very good.** Extending the Cross's axis 4.5 lengths lands 2.7° from the pole; the best multiple anyone could choose lands 2.65°; the Centaurus cross-check lands 2.86°. All three are stuck on the same line, and that line misses the pole. Stepping it out more carefully does not help, because the error is not in your stepping.`,
      `And **the northern rule is no better — it is merely rescued.** Lesson 17's pointers also land about 2.6° off. The difference is that in the north your eye then falls on Polaris and the error disappears, while in the south there is nothing to fall on. Two methods of identical quality, and one of them works much better, for a reason that has nothing to do with the method.`
    ],
    comparison: {
      label: `TWO SETS OF DIRECTIONS TO A HOUSE`,
      body: `Both sets of directions get you to the right street and leave you looking at the wrong end of it. In the first village the house you want is the only one painted red, so being fifty yards out costs you nothing — you look up and there it is. In the second, every house is identical, so fifty yards out means knocking on the wrong door with complete confidence. The directions were equally good. What differed was whether the destination could confirm itself.`
    },
    naming: `There is a second method worth knowing, and it is better for a reason that is not accuracy. Take the two bright stars of Centaurus that follow the Cross, find the point midway between them, and drop a line at right angles; where it crosses the Cross's axis is the pole. It lands about as far out as the first method — but it gives you a definite **intersection** instead of asking you to judge "four and a half times" by eye. It removes the error you make, not the error the sky makes.`,
    formalNames: {
      terms: [
        { term: `Crux`, meaning: `The Southern Cross. The smallest of the 88 constellations and one of the brightest, and nothing to do with the much larger, fainter "False Cross" nearby that catches everyone out.` },
        { term: `Acrux`, meaning: `The bright star at the foot of the Cross, nearest the pole. The end you extend from.` },
        { term: `Gacrux`, meaning: `The star at the head of the Cross. The end you extend from — the line runs Gacrux to Acrux and onward.` },
        { term: `South celestial pole`, meaning: `The point the southern sky turns about. Unmarked by any useful star, which is this lesson.` },
        { term: `Sigma Octantis`, meaning: `The nearest naked-eye star to the southern pole, and about fifth magnitude — technically visible from a dark site, useless from anywhere with streetlights, and no help at all at sea in moonlight.` },
        { term: `The False Cross`, meaning: `Four stars in Vela and Carina in a similar shape, larger and dimmer. Using it instead puts your pole badly wrong; the real Cross has the two bright Centaurus stars beside it and the False Cross does not.` },
        { term: `Systematic error`, meaning: `Lesson 13's term, arriving again. The Cross method's miss is systematic: it is the same every night, so repeating the measurement cannot find it.` },
        { term: `Dark constellation`, meaning: `A pattern made from the dark dust lanes of the Milky Way rather than from stars. Used in Andean and Australian traditions, and invisible to anyone looking only for bright points.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Working without the obvious landmark is a familiar problem.`,
    items: [
      `Finding your way in a town where the big church has scaffolding on it.`,
      `A car park with no numbered rows.`,
      `Looking for a house with no number on the door.`,
      `Walking in fog where the hill you navigate by is invisible.`,
      `A supermarket reorganised overnight.`,
      `Snow covering every path you normally recognise.`
    ],
    ownPlaceholder: `A time the thing you normally navigate by wasn't there…`,
    synthesis: `The fog one is the closest. You do not get a worse method in fog — you use the same skills and lose the thing that was quietly checking them. Everything this lesson says about the southern sky is about that loss, not about the southern sky being harder to read.`,
    builder: {
      body: `You can do this one from the northern hemisphere, on paper. Draw two dots 6 cm apart for Gacrux and Acrux. Now, without measuring, step the gap off four and a half more times along the same line and mark where you land. Then measure what you actually did: most people's stepping drifts by five or ten per cent, which on the sky is one to three degrees — the same size as the method's own built-in error. The sky's error and your error are about equal, which is worth knowing before you blame either one.`
    },
    acrossCultures: {
      place: `THE PACIFIC, AT LEAST THE LAST THOUSAND YEARS`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Pacific navigators work with a **star compass**: not an instrument but a memorised arrangement of the points on the horizon where particular stars rise and set, used as a set of named directions. Because a star always rises and sets at the same two points on the horizon from a given latitude — Lesson 20's geometry — those points are as fixed as compass bearings, and a navigator steers by holding the canoe's heading against whichever star is currently near the horizon, changing star as each climbs too high.`,
        `This solves the southern problem by not having it. The method never needs the pole at all: it needs a large number of stars whose rising points you know by heart, which is a demand on memory and training rather than on geometry. Systems of this kind are documented in detail for the Caroline Islands, and the revival voyages of the Polynesian Voyaging Society from the 1970s onwards — Hōkūleʻa's 1976 passage to Tahiti navigated by Mau Piailug without instruments — demonstrated that ocean crossings on these principles are possible in practice and not only in principle.`
      ],
      uncertain: `What is well documented is the twentieth-century Micronesian practice that was recorded by ethnographers and taught to the Hawaiian revival navigators. How closely that resembles the methods used during the original settlement voyages centuries earlier is a separate question the evidence cannot settle, and reconstructions necessarily draw on later practice. *Etak*, the reference-island scheme often described alongside the star compass, is particularly argued over — whether it is a navigational calculation, a way of keeping track of elapsed voyage, or chiefly a mnemonic framework is not agreed among specialists.`,
      sources: `Gladwin, *East Is a Big Bird: Navigation and Logic on Puluwat Atoll* (1970); Lewis, *We, the Navigators* (2nd ed., 1994); Finney, *Voyage of Rediscovery* (1994).`
    }
  },

  feynman: {
    line: `Your turn. Someone who has just moved to Australia.`,
    instruction: `Explain how to find true south at night in the southern hemisphere, and be honest about how good the answer is — without using the words below.`,
    banned: ['crux', 'pole star', 'mirror'],
    bannedNote: `The first two name things rather than describing them, and the third is the lazy answer: the southern sky is not the northern one reflected, it is a different sky with a different problem, and "it's the mirror image" is how people avoid saying what is actually different.`,
    placeholder: `Find the small bright four-star pattern, and then…`,
    checks: [
      `It describes the pattern well enough to be found, and warns about the larger, dimmer one that looks similar.`,
      `It says which way to extend the line and by how much.`,
      `It gives the accuracy as a number, and says the error cannot be reduced by being more careful.`,
      `It says what is different about the southern sky — that nothing bright sits at the point you are constructing.`
    ],
    closing: `If your explanation promised a star at the end of the line, that is the mistake the lesson exists to prevent. There is a point there and nothing to see.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction, then a question about method.`,
    prediction: {
      question: `A friend says they can get the southern pole to within half a degree by stepping the Cross's axis very carefully. What do you say?`,
      options: [
        {
          id: 'floor',
          text: `Careful stepping cannot help: the line itself misses by 2.65°.`,
          verdict: `Exactly right, and this is the distinction worth carrying out of the week. There are two errors here — yours, in stepping out the distance, and the sky's, in the axis not aiming at the pole. Care fixes the first and cannot touch the second. The best any multiple achieves is 2.65°, so half a degree is not available at any price.`
        },
        {
          id: 'possible',
          text: `Possible, if they use the Centaurus cross-check as well.`,
          verdict: `The cross-check is genuinely useful but not for accuracy — it lands 2.86° out, slightly worse. What it removes is the judgement call: instead of estimating "four and a half times" you get a definite crossing point. Better repeatability, same systematic miss.`
        },
        {
          id: 'lucky',
          text: `They might be right on some nights and not others.`,
          verdict: `No — and this is what "systematic" means. The stars keep their positions relative to each other, so the axis misses the pole by the same amount every night of the year. An error that varied would average out over several nights; this one never will.`
        }
      ]
    },
    open: {
      question: `Northern navigators get a star at the pole and southern ones do not. Is that permanent?`,
      placeholder: `Given that the axis wobbles…`,
      reveal: [
        `No, and it is not even especially old. The Earth's axis precesses in a circle of about 26,000 years, so the point the sky turns about drifts through the constellations. Polaris has only been a usable pole star for the last fifteen hundred years or so; when the Egyptian pyramids were built the nearest bright star to the pole was Thuban in Draco, and in about 12,000 years the honour will fall to Vega, which is far brighter than Polaris has ever been.`,
        `So "the north has a pole star and the south does not" is a statement about this particular millennium. The southern sky will get its own turn, and the methods in this lesson — constructing a point from patterns rather than reading it off a star — are the ones that work in every millennium. Which is a reason to learn them even if you never sail south of the equator.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-17',
        label: `Navigation, Lesson 17 — finding Polaris`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `Two methods, equally accurate, and one works much better than the other. Write down what actually made the difference — and then whether you can think of something in your own work where the same thing is true.`,
    placeholder: `The methods were the same, but…`,
    mapFooter: `You can find either pole now, and say how well.`,
    tomorrow: `Tomorrow closes the week. Every star rises in the same place every night — and which stars never set at all depends entirely on where you are standing. That turns the whole sky into a compass, not just the one point in it.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `A compass in the southern hemisphere works exactly as it does in the north — the needle still settles along the field, you still apply a declination. The SKY is what changes. So if you have ever wondered why southern navigation has a reputation for being harder, it is not the instruments and not the geometry: it is that one convenient star is missing, and everything else is a workaround for that absence.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Picture the Cross's axis as a bearing line drawn on a chart from a known point. In the north, that line passes within three degrees of a lighthouse, and when you get near you simply see the lighthouse. In the south, the line passes within three degrees of an unmarked position in open water. Same line, same accuracy, completely different value — which is the difference between a line of position and a fix.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Take a ruler and lay it along two pencil dots. Extend the line past the end and mark a point four and a half gaps further on. Now ask: how would you know if you were right? In the north there is a pencil dot already on the paper near where you land, and you simply move to it. In the south there is blank paper. The instruction is identical; the feedback is not, and feedback is most of what makes a method reliable.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `In the simulation the small open ring at the centre is the true south pole. Notice that it is empty — that is not a drawing simplification, it is the lesson. The dashed line is the Cross's axis extended by the standard rule, and you can see it pass to one side of the ring rather than through it. Move through the night and both the Cross and the line swing round the ring together.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `Gacrux to Acrux is 6.01°. Four and a half of those is 27.0°, carried on past Acrux, which puts you 33.1° from Gacrux along that line. The pole is about 27.1° from Acrux but not quite in that direction — the line's closest approach to it is 2.65°. Convert that the way Lesson 18 converts angles: as a direction error it is trivial, under a hundred yards in a mile. As an attempt to mark a point on the sky, it is five full Moons' width of empty space.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Three questions. One: can I find the pattern reliably, and tell it from the bigger dimmer one that looks like it? Two: can I step a distance along a line by eye to better than ten per cent? Three: does the line I am stepping along actually point where I want to go? Most people worry about the second and should worry about the first and third — the look-alike pattern will put you twenty degrees out, and the line's own aim you cannot fix at all.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from the result: 2.68° with the usual rule, 2.65° at best, 2.86° with the cross-check. Three methods, three answers within a quarter of a degree of each other. What does that pattern tell you? That they are all limited by the same thing rather than by their own details — and the thing they share is the line through Gacrux and Acrux. Once you see that, you stop trying to refine the stepping and start looking for a method that does not use that line.`
    }
  ],

  map: [
    { name: `The southern sky`, level: 3 },
    { name: `Constructing a pole`, level: 3 },
    { name: `Systematic vs careless error`, level: 4 },
    { name: `Latitude from the pole`, level: 4 },
    { name: `Finding the pole`, level: 5 },
    { name: `Pointer patterns`, level: 5 },
    { name: `Precession`, level: 3 },
    { name: `The celestial pole`, level: 5 },
    { name: `Star declination`, level: 4 },
    { name: `Knowing a method's limits`, level: 5 },
    { name: `Line of position`, level: 5 },
    { name: `Position`, level: 5 },
    { name: `True, magnetic & grid north`, level: 5 }
  ]
}
