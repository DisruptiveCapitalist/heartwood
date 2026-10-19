// Electricity & Energy · Week 3 · Lesson 11 — the compass that flinches.
//
// Measured off the simulation. The Earth's field is taken as 50 microtesla and
// the wire's as mu0*I / 2*pi*d:
//
//   10 A at  1 cm → 200 uT, four times the Earth → 76 degrees
//   10 A at  5 cm →  40 uT                       → 39 degrees
//   10 A at 30 cm →   6.7 uT                     →  8 degrees  (the slider's limit)
//    1 A at 20 cm →   1 uT                       →  1 degree
//
// Reversing the current reverses the deflection, and so does moving the compass
// from above the wire to below it. Both of those are the lesson: the field has a
// handedness, which no amount of pushing and pulling could produce.

export default {
  id: 'lesson-11',
  number: 1,
  week: 3,
  title: `The compass needle that flinches near a wire`,
  openingQuestion: `For two hundred years, electricity and magnetism were separate subjects — studied by different people, taught in different chapters, with no suspected connection. Then in 1820 a Danish lecturer closed a circuit near a compass and the needle moved. Not towards the wire, and not away from it. Why did that one observation collapse two subjects into one?`,
  concept: `One thing, two faces`,

  see: {
    voice: 'professor',
    line: `{name}, put the compass 1 cm from the wire and switch on 10 amps. Then reverse the current and watch what the needle does. That reversal is the whole discovery.`,
    simulation: { id: 'oersted' },
    observations: [
      { text: `At **1 cm with 10 amps** the wire's field is 200 µT — four times the Earth's — and the needle swings **76°**. Pull back to 30 cm and the same current manages only 8°.` },
      { text: `The needle does not point **at** the wire or **away** from it. It sets itself **across** it, at right angles — which is not how anything attracted or repelled has ever behaved.` },
      { text: `**Reverse the current and the needle swings the other way.** Move the compass from above the wire to below it and it reverses again. The field circles the wire, and it has a direction.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The second one is the strangest sentence in the course so far.`,
    sentences: [
      `A current does not merely carry energy along a wire — it **creates a magnetic field in the space around the wire**. The field is there whenever current flows, it vanishes when the current stops, and it needs no magnet of any kind. Magnetism is not a separate substance that some rocks happen to have; it is something that moving charge does.`,
      `That field does not point towards the wire or away from it. It wraps **around** the wire in circles, which is why the needle sits across it rather than facing it. Every force studied before this one pulled along the line between two objects — gravity, electrostatic attraction, a hand on a rope. This one acts sideways, and that was genuinely shocking.`,
      `And it is **reciprocal**. A current makes a magnetic field, and a magnetic field pushes on a current. Those two facts, taken together, are the entire remainder of this week: a motor is the second one, a generator is the first one run backwards, and a transformer was the second one all along.`
    ],
    sequence: {
      label: `WHAT ØRSTED COULD HAVE CONCLUDED, AND WHAT HE DID`,
      note: `the needle's angle rules out one explanation after another`,
      steps: [
        { name: `The wire attracts iron`, body: `Ruled out immediately. If it did, the needle would point **at** the wire, and it does not — it sits across it. Attraction cannot produce a sideways alignment.` },
        { name: `The wire is charged`, body: `Ruled out. A charged rod attracts light objects regardless of which way the charge flows, and here reversing the current reverses the needle. Charge alone has no handedness.` },
        { name: `Heat is moving the air`, body: `Ruled out by distance and by direction. A draught would push the needle any way the air went, not reliably to one consistent angle that flips when the current does.` },
        { name: `Something circles the wire`, body: `The only survivor. A field in rings around the wire puts the needle across it, reverses when the current reverses, and reverses again when you cross to the other side — because you have moved to the other side of the ring.` },
        { name: `So magnetism comes from motion`, body: `Not from iron. Iron is simply a material in which countless atomic-scale currents happen to stay lined up, which is why Lesson 14 can show a coil and a bar magnet making the same shape.` },
        { name: `And the subjects are one`, body: `Within twelve years Faraday had run the effect backwards and the subject had a name — electromagnetism. The compass needle in 1820 is the reason anything in this week exists.` }
      ]
    },
    comparison: {
      label: `WATER GOING DOWN A DRAIN`,
      body: `Water leaving a bath does not simply fall straight down the hole — it sets up a rotation, and everything floating nearby gets carried **around** rather than straight in. Drop a matchstick in and it does not point at the plughole; it lies across the swirl and travels in a circle. Change which way the water spins and the matchstick turns the other way. The compass needle near a wire is doing exactly that: lying across a circulation, and flipping when the circulation flips. *Where the analogy stops:* the water is actually going somewhere, and nothing about the magnetic field is flowing or travelling. Nothing moves outward from the wire at all. The field is a condition of the space — a statement about which way a compass placed there would turn — and it exists in the same instant as the current, not after a journey.`
    },
    naming: `The space around the wire, with its property of turning a compass, is a **magnetic field**. Its strength is measured in **tesla** — and a tesla is enormous, so the Earth's field is quoted as 50 **microtesla**. The circling direction is given by the **right-hand rule**: point your right thumb along the current and your fingers curl the way the field goes. The discovery itself is **Ørsted's experiment**, 1820, and it is the moment two subjects became one. One honest note: he was not quite the first to see it, and he spent three months checking before publishing, because he knew how unlikely a sideways force would sound.`,
    formalNames: {
      terms: [
        { term: `Magnetic field`, meaning: `The condition of the space around a current or a magnet, defined by which way a compass would turn in it. Measured in tesla.` },
        { term: `Tesla and microtesla`, meaning: `The unit of field strength. One tesla is huge — an MRI scanner is about 3. The Earth manages 0.00005, written 50 µT.` },
        { term: `Right-hand rule`, meaning: `Thumb along the current, fingers curl with the field. The handedness that reversing the current reverses, and the reason the needle flips when you cross the wire.` },
        { term: `Electromagnetism`, meaning: `The single subject that electricity and magnetism turned out to be. Named after this experiment, not before it.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've come across.`,
    items: [
      `A compass that misbehaves indoors or in a car.`,
      `A phone's compass app asking you to wave it in a figure of eight.`,
      `A fridge magnet holding a note to the door.`,
      `An electromagnet on a crane, lifting scrap and then dropping it.`,
      `A speaker that thumps when you first plug it in.`,
      `A magnetic catch on a cupboard door.`
    ],
    builder: {
      body: `This is the easiest experiment in the whole course to do for real, and worth doing. Take a compass — a phone's compass app works — and hold it close to a lamp cord or an extension lead while something substantial is running on it, a kettle or a heater rather than a phone charger. Watch the needle as you switch the appliance on and off. Then turn the cord over and try again. Two warnings worth taking seriously: a two-core cord has its live and neutral conductors running side by side carrying equal current in opposite directions, so their fields very nearly cancel and the effect is small. You will see more from a single conductor, which indoors you should not go looking for. Keep to the outside of intact insulation.`
    },
    ownPlaceholder: `Somewhere I've seen a compass or a magnet behave oddly…`,
    synthesis: `The near-cancellation in a two-core cord is not a disappointment — it is the lesson again. The field depends on the current's direction, so two equal currents going opposite ways produce opposing fields that nearly annihilate each other. That is also, incidentally, how a residual-current device decides your house is safe.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend what Ørsted saw and why it mattered — **without using the words "magnetic" or "field."**`,
    banned: ['magnetic', 'field'],
    bannedNote: `one of those came back — and the observation itself needs neither word`,
    placeholder: `He put a compass next to a wire, and when he switched the current on…`,
    checks: [
      `A compass needle moves when current flows in a nearby wire, and stops when it stops.`,
      `It does not point at the wire — it sits across it, which attraction cannot explain.`,
      `Reversing the current reverses the needle, so whatever is happening has a direction.`,
      `So a current does something to the space around it, and electricity and magnetism are one subject.`
    ],
    closing: `If your version has the needle sitting **across** the wire rather than pointing at it, you have the part that took two hundred years to notice.`
  },

  challenge: {
    voice: 'editor',
    line: `One about what the needle is really telling you, and one about why nobody noticed for two centuries.`,
    prediction: {
      question: `You double the current in the wire and the needle swings further. What happens if instead you keep the current the same and move the compass **twice as far away**?`,
      options: [
        {
          id: 'quarter',
          text: `The field falls to a quarter — things usually weaken with the square of distance.`,
          verdict: `A very well-educated wrong answer, and the instinct is sound: gravity and electrostatic force both fall off as the square, so the guess has real precedent behind it. But those come from **points** — a mass, a charge — radiating in every direction, so the same influence spreads over a sphere that grows as the square. A long straight wire is not a point. Its influence spreads over a cylinder, whose surface grows in proportion to the radius and not its square. So the field falls as 1/d, plainly: at 1 cm, 10 amps gives 200 µT; at 2 cm, 100 µT. Halved, not quartered. The shape of the source sets the falloff.`
        },
        {
          id: 'half',
          text: `The field halves — it falls off in proportion to the distance.`,
          verdict: `Correct, and for a reason worth holding on to: a straight wire is a line rather than a point, so its field spreads over a cylinder rather than a sphere. The simulation agrees — 200 µT at 1 cm, 100 at 2 cm, 40 at 5 cm, and only 6.7 µT at 30 cm. Notice, though, that the **needle's angle** does not halve when the field does, because the angle depends on the ratio of the wire's field to the Earth's, through a tangent. At 1 cm the swing is 76°; doubling the distance leaves 63°, not 38°. The field is linear in 1/d and the angle is not linear in anything.`
        },
        {
          id: 'same',
          text: `No change — the current is the same, so the field is the same.`,
          verdict: `The field is certainly caused by the current, and with the current unchanged it is tempting to say the cause is unchanged and so is the effect. But a field is not a single quantity a wire possesses; it has a different value at every point in the space around it, and distance is part of the question. Drive the simulation out to 30 cm at the same 10 amps and the deflection falls from 76° to 8°. The current sets how much field there is to distribute; the geometry decides how much of it is where you are standing.`
        }
      ]
    },
    open: {
      question: `Compasses had been in use for something like eight hundred years before 1820, and electrical apparatus for decades. Why did it take until 1820 for somebody to notice that one affected the other?`,
      placeholder: `Perhaps the effect is too small to see unless…`,
      reveal: [
        `Partly because the effect is weak unless you are close and the current is substantial. At 1 amp and 20 cm the deflection is about 1° — a wobble you would dismiss as the table being bumped. The early electrical machines made impressive sparks at enormous voltage but passed very little steady current, so there was often nothing much there to see.`,
        `But mostly because a **steady** current was a new thing. Before Volta's battery in 1800, electricity meant a stored charge that discharged in an instant — a spark, a jolt, and over. You cannot watch a compass settle to a new angle during a spark. Ørsted had what nobody before 1800 had: a current he could leave running while he looked at something else and moved it about.`,
        `And partly nobody was looking, because the expected answer was already known. Everyone understood that forces act along the line between two objects. A sideways force was not an unlikely result; it was a category error, the sort of thing you assume you misread. That is why Ørsted checked for three months before publishing — and why, when he did, the whole of European physics changed direction within a decade. Tomorrow we use the other half of the discovery: if a current makes a field, a field pushes on a current, and that is a motor.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about magnets and electricity that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 12 — the other half of Ørsted's discovery. If a current makes a magnetic field, then a magnetic field must push on a current. Put that push on a shaft that can turn and you have built every motor in your house.`
  },

  routes: [
    { id: 'analogy', body: `Think of a fast river and a boat moored in it. The boat does not get pulled towards the middle of the river or pushed to the bank; it swings until it lies along the flow. The flow is sideways to everything, and reversing the river swings the boat the other way round. The compass needle is a moored boat in a circulation around the wire, and what it reports is which way the circulation goes.` },
    { id: 'object', body: `Hold a fridge magnet and a length of lamp cord. The magnet works without electricity and the cord does nothing until current flows — and yet Ørsted's claim is that these are the same phenomenon. The magnet contains astronomical numbers of atomic currents that stay lined up permanently; the cord has one large current you can switch. Same effect, two sources, and Lesson 14 will put them side by side and show they make the same shape.` },
    { id: 'story', body: `Hans Christian Ørsted was lecturing in Copenhagen in April 1820 when he noticed a compass twitch as he closed a circuit. Accounts differ on whether a student spotted it first. What is not in doubt is what he did next: three months of checking before publishing four pages in Latin, which were translated and repeated across Europe within weeks. Ampère had a mathematical theory of it inside three months, and Faraday ran the effect backwards eleven years later.` },
    { id: 'experiment', body: `Get a compass and a battery — a single AA and a short piece of wire will do, though the wire gets warm so do it in brief touches. Lay the compass flat, run the wire straight over the top of it pointing north-south, and touch the ends to the battery. The needle swings. Now run the wire underneath the compass instead and touch again: it swings the other way. You have just measured the handedness of a magnetic field with two household objects.` },
    { id: 'smaller', body: `Forget fields, rules and history. One sentence: when current flows in a wire, a nearby compass turns, and it turns the opposite way if you reverse the current. That is the entire observation. Everything else in this lesson is an attempt to say what sort of thing could possibly behave that way, and the answer is a circulation around the wire.` },
    { id: 'backward', body: `Start from a result you already accept — a transformer works, and Lesson 9 said that what crosses between its two coils is a changing magnetic field rather than a current. For that to be true, a current in the first coil must be making a magnetic field in the first place. You have already been relying on Ørsted's discovery for two lessons. Today is where it is actually demonstrated.` }
  ],

  map: [
    { name: `Magnetism`, level: 4 },
    { name: `Magnetic field`, level: 3 },
    { name: `AC and DC`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Ohm's law`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 },
    { name: `A circuit is a loop`, level: 5 }
  ]
}
