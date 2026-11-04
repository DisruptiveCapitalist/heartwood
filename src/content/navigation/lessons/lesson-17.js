// Navigation · Week 4 · Lesson 17 — finding Polaris
//
// The brief (Week 4, "Finding Polaris") asks for the Big Dipper's pointer
// stars, Cassiopeia as an alternative, Polaris and the north celestial pole,
// and why Polaris is close to but not exactly at true celestial north. The
// Field Guide spec repeats that last point explicitly for Chapter 7.
//
// MEASURED from src/lib/stars.js before any copy was written, for 2026:
//
//   Merak to Dubhe                  5.37°
//   Dubhe to Polaris               28.71°  (so Merak to Polaris is 6.34 gaps)
//   "five lengths past Dubhe"      lands 2.62° from Polaris
//   the best any multiple can do   1.92°, at 5.33 lengths past Dubhe
//   Polaris from the true pole     37.7 arcminutes, and shrinking
//
// Two things worth the lesson's time. The famous rule is as good as that rule
// gets — stepping it out more carefully buys you less than a degree, because
// the three stars are not quite in line. And 2.6° of error does not matter in
// the north, because Polaris is the only bright thing anywhere near there and
// you will see it the moment you look. That is the difference between this
// lesson and Lesson 19, where the same sloppiness is fatal.

export default {
  id: 'lesson-17',
  number: 2,
  week: 4,
  title: `Finding Polaris`,
  openingQuestion: `Which one is it?`,
  concept: `Patterns point; the pole is a place, not a star`,

  fieldGuide: {
    chapter: 7,
    title: `Navigating by the Stars`,
    exercise: `Find it once from your own doorstep, and then find it again from the same spot six hours later, when the Big Dipper has swung to the other side. The second time is the one that teaches you something: the pointers work from any angle, because they turn with the star they are pointing at.`
  },

  see: {
    voice: 'professor',
    line: `This is the view centred on the pole itself. Move through the night and watch what stays and what swings.`,
    simulation: { id: 'star-sky', props: { mode: 'pointers' } },
    observations: [
      { text: `The two stars at the end of the Dipper's bowl — Merak and Dubhe — line up on Polaris. The dashed line is that rule drawn out: **five times the gap between them, carried on past Dubhe**.` },
      { text: `It does not land exactly on Polaris. It lands **2.6°** away, and no multiple you choose does better than 1.9°, because the three stars are not quite in a straight line. It does not matter: at that range Polaris is the only bright star there.` },
      { text: `Move through the night and the Dipper swings right round the pole — and the pointers keep pointing. Cassiopeia, the W on the opposite side, swings too. When one is low behind trees, the other is high.` }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third is the one the Field Guide insists on.`,
    sentences: [
      `**The patterns rotate; their internal geometry does not.** Merak and Dubhe point at Polaris at nine in the evening and at four in the morning, upside down and the right way up, in June and in December. That is what makes a pointer rule worth learning — it is a fact about the stars, not about the hour.`,
      `**Cassiopeia is the backup, and the reason you need one.** It sits on the opposite side of the pole from the Dipper at roughly the same distance, so when one is scraping the horizon the other is high and clear. In autumn at mid-northern latitudes the Dipper is low in the north; that is exactly when the W is overhead.`,
      `And **Polaris is not at the pole.** It is **37.7 arcminutes** away in 2026 — about a fifth the width of the full Moon's disc from the point everything actually turns around. It circles that point once a day like everything else, on a very small circle, and tomorrow's lesson is about what that costs you.`
    ],
    comparison: {
      label: `THE HANDLE OF A SPINNING PAN`,
      body: `Put a frying pan on a lazy Susan and spin it. The handle swings all the way round, but it never stops pointing at the centre of the pan — the relationship between the handle and the pan's middle is fixed, and the spinning cannot touch it. The pointers are the handle. You do not need to know which way round the pan happens to be at the moment you look; you need to know that the handle points inward.`
    },
    naming: `The name is a modern luxury. Polaris has only been a usable pole star for about the last fifteen hundred years, and it is still closing in — it will be nearest the pole around the year 2100, about 27.5 arcminutes out, and then begin to drift away again. The Greeks used the whole of Ursa Minor as a pointer to an empty spot. Nothing in this lesson depends on there being a star there; everything depends on there being a point.`,
    formalNames: {
      terms: [
        { term: `Pointer stars`, meaning: `Merak and Dubhe, the two stars forming the outer edge of the Big Dipper's bowl. The line through them, extended, finds Polaris.` },
        { term: `Dubhe`, meaning: `The upper of the two, and the one nearer Polaris. "Extend the line" means extend it from Merak through Dubhe and onward.` },
        { term: `Big Dipper / the Plough`, meaning: `The same seven stars, named differently either side of the Atlantic. An asterism within Ursa Major, not a constellation in its own right.` },
        { term: `Cassiopeia`, meaning: `Five bright stars in a W or M, on the opposite side of the pole from the Dipper and about as far from it. Your alternative when the Dipper is down.` },
        { term: `Ursa Minor`, meaning: `The Little Dipper, with Polaris at the end of its handle. Fainter than its neighbour and harder to pick out from a town.` },
        { term: `North celestial pole`, meaning: `The point, not the star. Where the Earth's axis crosses the sky, and the centre of every trail in last night's lesson.` },
        { term: `Precession`, meaning: `The slow wobble of the Earth's axis, a full circuit in about 26,000 years. It is why Polaris is arriving, why Thuban was the pole star when the pyramids were built, and why a star atlas has a date on it.` },
        { term: `Epoch`, meaning: `The date a set of star positions is quoted for — almost always J2000 now. Positions without an epoch are positions you cannot use carefully.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Finding a thing by its neighbours is an everyday skill.`,
    items: [
      `Finding your car by the lamppost rather than by the row number.`,
      `"Third door past the big tree."`,
      `Spotting one face in a crowd by the person standing next to them.`,
      `Finding a shop by the one opposite that you actually remember.`,
      `Giving directions by landmarks because street names don't stick.`,
      `Locating a key on a keyboard by the F and J bumps.`
    ],
    ownPlaceholder: `Something you find by what's next to it rather than directly…`,
    synthesis: `All six work the same way: you cannot identify the target on its own, so you identify something unmistakable nearby and step from it. Polaris is a perfectly ordinary-looking star. The Dipper is unmistakable. That asymmetry is the whole method.`,
    builder: {
      body: `Go out on the next clear night and do it with your hand. Hold your arm straight out: your fist across the knuckles is about ten degrees of sky, and your outstretched hand from thumb to little finger is about twenty. Find the Dipper's bowl, measure the gap between the two end stars — roughly half a fist — and step that distance off five more times in the same direction. Check your answer against the fact that nothing else bright is near it.`
    },
    acrossCultures: {
      place: `THE MEDITERRANEAN, ABOUT 300 BCE`,
      label: `PLAUSIBLE BUT UNCERTAIN`,
      paragraphs: [
        `Greek sources report that Greek sailors steered by the Great Bear while Phoenician sailors used the smaller, fainter group we call Ursa Minor — which the Greeks reportedly knew as Phoenice for that reason. The smaller group is harder to see but sits closer to the pole, so steering by it is the better technique, and the attribution is usually read as a Greek acknowledgement that Phoenician navigators were ahead of them.`,
        `What makes the episode useful here is what neither group had. In 300 BCE the pole had no bright star near it at all — Polaris was more than ten degrees away, far enough that circling it was obvious to the naked eye in a single night's watch. So these navigators were doing what the third sentence above describes: using a pattern to find an empty point, and accepting that the point was empty.`
      ],
      uncertain: `The attribution comes to us at several removes. The usual citation is Callimachus by way of later writers such as Strabo, Hyginus and Diogenes Laertius, who are reporting a tradition about the previous century's practice and have their own reasons for crediting or discrediting Phoenicians. No Phoenician sailing directions survive at all — essentially everything we have about Phoenician navigation is reported by Greek and Roman authors — so "the Phoenicians used Ursa Minor" is a claim about what Greeks said about Phoenicians, which is not the same thing.`,
      sources: `Taylor, *The Haven-Finding Art: A History of Navigation from Odysseus to Captain Cook*, revised edition (1971); Aubet, *The Phoenicians and the West*, second edition (2001); Strabo, *Geography* I.1.6, in the Loeb translation by Jones (1917).`
    }
  },

  feynman: {
    line: `Explain it to someone standing outside with you, in the dark.`,
    instruction: `Talk someone through finding the north celestial pole on a clear night — with a backup for when the first pattern is hidden — without using the words below.`,
    banned: ['pointer', 'plough', 'dipper'],
    bannedNote: `Naming a pattern is not describing one, and the names differ by country anyway — "the Plough" means nothing to half your readers and "the Dipper" means nothing to the other half. Describe the shape in the sky so a stranger can find it.`,
    placeholder: `First find the seven bright stars shaped like…`,
    checks: [
      `It describes a shape well enough that someone who has never seen it could pick it out.`,
      `It says which two stars to use and which direction to extend the line, not just "extend it".`,
      `It gives a distance — a number of gaps, or a measure in hands — rather than "a long way".`,
      `It offers a second pattern for when the first is hidden, and says where to look for it.`
    ],
    closing: `If your explanation says the star is at the pole, add the sentence that fixes it. It is two-thirds of a degree away, and tomorrow that costs you forty miles.`
  },

  challenge: {
    voice: 'editor',
    line: `A prediction, then a question about time.`,
    prediction: {
      question: `It is October and the Big Dipper is low behind a hill to the north. What do you do?`,
      options: [
        {
          id: 'cass',
          text: `Look high overhead for the W of Cassiopeia and work back from it.`,
          verdict: `Right, and this is exactly why you learn two patterns. They sit on opposite sides of the pole, so one is always reasonably placed. In autumn evenings at mid-northern latitudes the Dipper scrapes the northern horizon and Cassiopeia is nearly overhead.`
        },
        {
          id: 'wait',
          text: `Wait a few hours for the Dipper to rise clear of the hill.`,
          verdict: `It will — the sky turns fifteen degrees an hour and the Dipper is circumpolar from mid-northern latitudes, so it never actually sets. But you would be standing in a field until two in the morning for information available immediately from the other side of the sky.`
        },
        {
          id: 'bright',
          text: `Find the brightest star in the north; that will be Polaris.`,
          verdict: `This is the commonest mistake about Polaris and it is worth saying plainly: it is not especially bright. It is around second magnitude, dimmer than about forty other stars. What makes it findable is its position relative to patterns, not its brilliance.`
        }
      ]
    },
    open: {
      question: `The pointers aim 2.6° off Polaris and nobody minds. When would that same error matter?`,
      placeholder: `It wouldn't matter if there's something obvious to land on, but…`,
      reveal: [
        `It matters the moment there is nothing at the target to correct you. In the north the rule gets you within three degrees and Polaris does the rest — it is the only bright star in that patch of sky, so your eye snaps to it and the pointing error vanishes. The rule is a search instruction, not a measurement.`,
        `In the southern sky there is no such rescue. The south celestial pole has no bright star anywhere near it — the nearest naked-eye candidate is a fifth-magnitude star at the very edge of what an unaided eye can see from a dark site, and invisible from anywhere with streetlights. There, the pointing error IS the answer, because nothing is waiting at the end of the line to tidy it up. That is Lesson 19, and it is a different problem wearing the same clothes.`
      ],
      crossLink: {
        courseId: 'navigation',
        lessonId: 'lesson-16',
        label: `Navigation, Lesson 16 — the night sky is a clock and a compass`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `You have now learned a rule that is 2.6° wrong and perfectly good. Write down why that is acceptable here, in a way you could say to someone who thinks precision is always the point.`,
    placeholder: `Being a bit off is fine when…`,
    mapFooter: `You can find the pole from two different patterns, and you know the star near it is not on it.`,
    tomorrow: `Tomorrow: the height of that star above your horizon is your latitude. Nearly. The gap between "nearly" and "exactly" is forty miles, and there is a way to close it.`
  },

  routes: [
    {
      id: 'compass',
      label: `Explain it with a compass`,
      body: `A compass gives you magnetic north and you then apply a correction to get true north, as Lesson 7 taught. Polaris gives you true north directly, with no correction for where you stand — it is Week 3's Sun compass, available at night and without waiting for noon. The only correction it needs is for its own small circle round the pole, which is tomorrow.`
    },
    {
      id: 'map',
      label: `Explain it with a map`,
      body: `Think of the Dipper and Cassiopeia as two landmarks on opposite banks of a river, and the pole as a spot in the water between them. You cannot mark the spot itself, so you take a bearing from each bank. The Dipper's pointers are one bearing. Cassiopeia is the other. Where they agree is where the pole is — and because the whole arrangement turns together, the bearings stay good all night.`
    },
    {
      id: 'object',
      label: `Use an everyday object`,
      body: `Hold your fist out at arm's length: about ten degrees of sky across the knuckles. The gap between the two pointer stars is a bit over five degrees — half a fist. You need five more of those gaps to reach Polaris, so about two and a half fists past the bowl of the Dipper. Everyone's hand scales with their arm, so this works for a child as well as an adult.`
    },
    {
      id: 'diagram',
      label: `Show me a diagram`,
      body: `The simulation is centred on the pole rather than on your horizon, which makes the night's motion a plain rotation about the middle of the picture. Watch three things as you drag through the night: the Dipper swings round, Cassiopeia swings round on the opposite side, and the dashed pointer line swings with them while still reaching the same place. The rings are every fifteen degrees out from the pole.`
    },
    {
      id: 'example',
      label: `Walk me through an example`,
      body: `The gap from Merak to Dubhe is 5.37°. Five of those is 26.9°, carried on from Dubhe. Dubhe is actually 28.7° from Polaris, so the rule falls about 1.8° short along the line — and because the three are not exactly in line, the total miss comes to 2.6°. For comparison the full Moon is half a degree across, so you land about five Moon-widths from Polaris. Then you look, and there is one obvious star.`
    },
    {
      id: 'smaller',
      label: `Break it into smaller steps`,
      body: `Four steps. One: find seven bright stars in a long-handled saucepan shape. Two: identify the two that form the end of the pan, away from the handle. Three: imagine the line through them, running out of the top of the pan. Four: follow that line about five pan-widths and stop at the first reasonably bright star. If a step fails, the usual culprit is step one — try the W-shaped group on the other side of the sky instead.`
    },
    {
      id: 'backward',
      label: `Work backward from the answer`,
      body: `Start from Polaris and work out. Why is it useful? Because it is near the pole, so it barely moves. Why can we not just look for the star that barely moves? Because telling that takes hours of watching, and you want an answer now. So you need a way to find it from things you can recognise instantly — and the brightest, most recognisable pattern in the northern sky happens to have two stars that aim nearly at it. The method exists because the direct test is too slow.`
    }
  ],

  map: [
    { name: `Finding the pole`, level: 3 },
    { name: `Pointer patterns`, level: 3 },
    { name: `Precession`, level: 2 },
    { name: `The turning sky`, level: 4 },
    { name: `The celestial pole`, level: 4 },
    { name: `Star declination`, level: 3 },
    { name: `The sidereal day`, level: 3 },
    { name: `Knowing a method's limits`, level: 4 },
    { name: `The noon line`, level: 5 },
    { name: `Solar noon`, level: 5 },
    { name: `Declination`, level: 5 },
    { name: `True, magnetic & grid north`, level: 5 },
    { name: `Position`, level: 5 }
  ]
}
