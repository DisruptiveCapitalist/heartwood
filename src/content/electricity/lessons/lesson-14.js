// Electricity & Energy · Week 3 · Lesson 14 — the shape of the field.
//
// Measured off the simulation. Every figure is the textbook formula for that
// geometry: the wire read 1 cm away, the loop 2 cm in radius, the coil 10 cm
// long. At the default 200 turns and 2 amps:
//
//   straight wire      0.04 mT   — 0.8x the Earth's field
//   one loop           0.06 mT
//   coil, 200 turns    5.03 mT   — 101x the Earth
//   the same, in iron  1,005 mT  — about one tesla, from a coil and a battery
//   a ferrite bar      50 mT     — no current anywhere
//
// At 400 turns and 6 amps the iron reaches the 1,500 mT cap and the simulation
// says it is saturating, which is a real limit and not a software one.
//
// The lesson's point is the shape rather than the strength: every field line
// closes on itself, including the ones that appear to stop at a magnet's pole
// and in fact continue through the magnet. There is nothing for them to end on.

export default {
  id: 'lesson-14',
  number: 4,
  week: 3,
  title: `The magnetic field that goes round in a circle`,
  openingQuestion: `Iron filings scattered round a magnet make the same picture in every school textbook — loops arcing from one end to the other. But follow one of those loops carefully and a question appears that the picture never answers. The lines leave the north pole and arrive at the south. What happens to them next? Where does a magnetic field line actually end?`,
  concept: `Nothing to end on`,

  see: {
    voice: 'professor',
    line: `{name}, step through all five shapes. Then go back and compare the last two — the coil and the bar magnet — and tell me which is which from the outside.`,
    simulation: { id: 'field-shape' },
    observations: [
      { text: `A coil of **200 turns at 2 amps** makes 5 mT — a hundred times the Earth's field, from a battery and some wire. Slide an iron core in and the same current gives about **one tesla**.` },
      { text: `**The coil and the bar magnet make the same shape.** From outside you could not tell them apart, and that is the clue: a bar magnet is doing the same thing by other means.` },
      { text: `**Every line closes on itself.** The bar magnet's lines do not stop at the south pole — they continue straight through the magnet, back to the north. The dashed line is the same field, inside.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one is a rule with no known exceptions anywhere in physics.`,
    sentences: [
      `**Magnetic field lines always form closed loops.** They never begin anywhere and never end anywhere. Electric fields can start on a positive charge and stop on a negative one, because charges come in two separable kinds — but there is no magnetic equivalent of a charge, no isolated north pole, so there is nothing for a magnetic line to start or finish on. It must come back round.`,
      `Which is why **cutting a magnet in half never gives you a north piece and a south piece**. It gives you two complete magnets, each with both poles. Keep cutting and it stays true all the way down to a single atom. The poles are not objects located at the ends; they are simply the places where the closed loops happen to leave and re-enter.`,
      `And a **coil of wire and a bar magnet make the same field because they are the same thing** — circulating current. In the coil the current goes round the turns and you supplied it. In the iron, astronomical numbers of atomic-scale currents happen to stay lined up, and nobody supplies anything. Ørsted's discovery was not that currents imitate magnets. It was that magnets were currents all along.`
    ],
    sequence: {
      label: `WHAT IRON IS ACTUALLY DOING IN AN ELECTROMAGNET`,
      note: `the coil's field is the cause — the iron's response is most of the result`,
      steps: [
        { name: `The coil makes a field`, body: `5 mT at 200 turns and 2 amps, spread along the inside of the coil. Useful, but a hundredth of what an electromagnet manages.` },
        { name: `Iron contains tiny magnets already`, body: `Every atom is a circulating current and therefore a minute magnet. In unmagnetised iron they are organised into regions pointing every which way, and cancel out.` },
        { name: `The coil's field lines them up`, body: `Those regions rotate and grow to align with the applied field. They are not being dragged along — they are adding their own fields to it.` },
        { name: `So the field multiplies`, body: `A few hundredfold. The same 2 amps now give about a tesla, which is why every crane magnet, relay, solenoid and transformer has iron in it.` },
        { name: `Until the iron runs out`, body: `Once essentially every region is aligned there is nothing left to recruit. Push the current higher and the field barely rises — **saturation**, around one and a half tesla for ordinary iron.` },
        { name: `And then it mostly lets go`, body: `Switch the coil off and soft iron loses nearly all of it, which is what a crane magnet needs. Hard materials keep it instead, and that is what a permanent magnet is.` }
      ]
    },
    comparison: {
      label: `A ROUNDABOUT, AND A ROOM FULL OF COMPASSES`,
      body: `Two pictures, for the two halves. For the closed loops: think of a one-way ring road. Ask where it begins and the question has no answer — not because nobody has found the start, but because a loop has no start to find. You can drive it forever. A magnetic field line is the same, and the only unusual part is that the road continues **through** the magnet rather than going round it. For the iron: imagine a room with ten thousand compass needles on tables, all pointing randomly, cancelling to nothing. Bring one strong magnet into the room and every needle swings to line up — and now the room's own combined magnetism is vastly greater than the magnet you brought. You supplied the instruction; the room supplied the strength. *Where the analogy stops:* the needles would need no persuading and iron's regions resist a little, which is why a magnet can be only partly magnetised, and why some materials keep the alignment after the field goes and others do not.`
    },
    naming: `A region of iron whose atomic magnets are already aligned is a **domain**, and magnetising iron is mostly a matter of growing and rotating domains. How much a material multiplies an applied field is its **permeability**; soft iron's is in the hundreds to thousands. The point at which no further alignment is available is **saturation**. The fact that there is no isolated north or south pole is the statement that there are **no magnetic monopoles**, which is one of Maxwell's four equations and has survived every experiment ever aimed at it. One honest note: nobody has proved monopoles cannot exist, and several respectable theories predict them. Decades of searching has found none, so the rule stands as the best-tested empirical fact in the subject rather than a theorem.`,
    formalNames: {
      terms: [
        { term: `Closed field lines`, meaning: `Magnetic lines always return on themselves, continuing through the magnet. They have no beginning and no end, because there is nothing to start or stop on.` },
        { term: `No magnetic monopoles`, meaning: `There is no isolated north or south pole. Cut a magnet and you get two whole magnets — one of Maxwell's equations, and never once contradicted.` },
        { term: `Domain`, meaning: `A region inside iron whose atomic magnets are already lined up. Magnetising iron means growing and turning these, not creating anything new.` },
        { term: `Permeability and saturation`, meaning: `How much a material multiplies an applied field, and the ceiling where it has no alignment left to give — about 1.5 tesla for iron.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've done or seen.`,
    items: [
      `Iron filings arranged around a magnet on paper.`,
      `Two magnets that snap together one way and push apart the other.`,
      `A scrapyard crane magnet picking up a car and dropping it.`,
      `A magnet that has lost its strength after being dropped or heated.`,
      `Fridge magnets that only stick on one face.`,
      `A door that clicks shut on a magnetic catch.`
    ],
    builder: {
      body: `Two things worth doing, both free. First, break a cheap magnet — a hard ferrite fridge magnet in a cloth, tapped with a hammer, wearing something over your eyes. Test both fragments against a third magnet. Each piece has a north and a south; neither is a single pole. You cannot produce one by cutting, however small you go. Second, wind twenty turns of thin wire round a steel bolt, touch the ends briefly to a AA battery and pick up paperclips. Pull the bolt out of the coil and try again with the coil alone — it manages far fewer. The difference between the two is what the iron was contributing, and in this lesson's simulation that difference is a factor of about two hundred.`
    },
    ownPlaceholder: `Something about magnets I've noticed…`,
    synthesis: `The flat fridge magnet is the odd one out and worth a thought. It sticks on one face only because it is magnetised in narrow alternating stripes, so its field loops are short and close to that surface. Check it with another magnet and you can feel the stripes. Closed loops, deliberately kept small.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why you cannot ever get a magnet with only a north pole — **without using the words "monopole" or "loop."**`,
    banned: ['monopole', 'loop'],
    bannedNote: `one of those came back — and the argument runs on cutting a magnet in half`,
    placeholder: `If you cut a magnet in half, you might expect…`,
    checks: [
      `Cutting a magnet in half gives two complete magnets, each with both poles.`,
      `It stays true however many times you cut, right down to a single atom.`,
      `The poles are not objects at the ends — they are where the field leaves and returns.`,
      `And the field carries on through the inside of the magnet, so it never stops anywhere.`
    ],
    closing: `If your version has the field continuing **through** the magnet, you have the picture that the textbook iron-filings photograph leaves out — and it is the part that makes the rule make sense.`
  },

  challenge: {
    voice: 'editor',
    line: `One about cutting magnets, and one about a magnet you are standing on.`,
    prediction: {
      question: `You saw a bar magnet neatly in half, across the middle. What have you got?`,
      options: [
        {
          id: 'two',
          text: `Two shorter magnets, each with a north and a south.`,
          verdict: `Correct, and it is worth being clear about why this is not merely an observed curiosity. The poles were never objects sitting at the ends — they were the places where the closed field loops left the iron and came back in. Cut the bar and the loops simply leave and re-enter at the new faces, so each piece has both. Keep cutting and it remains true down to a single atom, which is itself a circulating current with two poles. There is no scale at which a lone pole appears.`
        },
        {
          id: 'separate',
          text: `A north piece and a south piece — one of each.`,
          verdict: `This is the natural expectation, and it is wrong for a reason that is more interesting than the answer. The expectation comes from electricity, where the two kinds of charge really can be separated: rub a balloon and you genuinely have surplus negative charge in one place. Magnetism has no such pair of separable things. What looks like two poles is one circulation seen from its two ends, and you cannot cut an end off a circle. Every search ever mounted for a lone magnetic pole has come back empty.`
        },
        {
          id: 'none',
          text: `Two pieces of plain iron — the magnetism is destroyed by cutting.`,
          verdict: `Cutting does disturb a magnet somewhat, and heating or hammering one genuinely can weaken it badly by knocking its aligned regions out of order — so the instinct that violence costs magnetism is sound. But sawing a magnet does not erase the alignment through the bulk of the material; it just gives you two aligned pieces. Each one picks up paperclips and each one has a definite north and south. You can do this at home for the price of a fridge magnet, and it is worth doing once.`
        }
      ]
    },
    open: {
      question: `A compass points north because the Earth is a magnet. But magnetic field lines are closed, so the Earth's field must come back round somewhere — and the Earth has no bar magnet inside it. What is actually generating it, and what does "closed" mean for a planet?`,
      placeholder: `Something must be circulating inside the Earth…`,
      reveal: [
        `A circulating current, exactly as this lesson requires. The Earth's outer core is liquid iron, hot, convecting and electrically conducting, and it is being stirred by heat from below and the planet's rotation. Moving conducting fluid in a magnetic field generates current, and that current maintains the field that keeps it going — a self-sustaining **geodynamo**. It is a generator the size of Mars, and it has been running for several billion years.`,
        `And the field is closed, just as the simulation's bar magnet was. The lines emerge near the southern hemisphere, arc out through space, come back in near the north, and continue **through the planet** to where they started. The arc through space is not decoration — it reaches tens of thousands of miles out, and it is what deflects the solar wind and makes the aurora. You are standing inside a field line.`,
        `Two consequences worth keeping. The magnetic poles wander, because the fluid does — the north magnetic pole has moved hundreds of miles in the last century, which is why aviation charts are reissued. And the field has reversed hundreds of times in the planet's history, recorded in stripes of magnetised rock on the sea floor either side of mid-ocean ridges. A dynamo has no preference about which way it runs, and the Earth's has changed its mind repeatedly. Tomorrow we assemble the week: turbine, generator, transformer, line and socket, and nothing new.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about magnetic fields that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 15 — the last of the week, and deliberately nothing new. We follow a single watt from a turbine to your socket, and every stage on the way is something you have already learned. If you can narrate the whole journey, the week has done its job.`
  },

  routes: [
    { id: 'analogy', body: `A ring road with no junctions. Ask where it starts and the question is malformed — a closed circuit has no start. Now imagine the road passes through a tunnel under a hill, and someone photographs only the open-air part: it looks as though the road emerges from one side of the hill and disappears into the other. That photograph is the iron-filings picture, and the tunnel is the inside of the magnet.` },
    { id: 'object', body: `Hold two bar magnets end to end. They snap together one way and resist the other, and the resistance is not the magnets disliking each other — it is two sets of closed loops being asked to run in opposite directions through the same space. Turn one round and the loops agree, joining into longer loops that pass through both magnets, and they pull together hard. Attraction and repulsion are both just loops that do or do not line up.` },
    { id: 'story', body: `Maxwell's four equations of 1865 unified electricity, magnetism and light, and one of them says simply that magnetic field lines have no sources — there is nowhere for them to begin. It was written as a description of what nobody had ever observed, and it has held for a century and a half. Dirac showed in 1931 that a single monopole would elegantly explain why charge comes in fixed units, so people have looked hard. Nothing has ever been found.` },
    { id: 'experiment', body: `Put a magnet under a sheet of paper and sprinkle iron filings — or the iron powder from a hardware shop — and tap the paper. The lines appear. Now notice what the picture does not show: the filings are only on top, so you see the outside arcs and nothing of what happens inside the magnet. Then put a second magnet alongside, first attracting and then repelling, and watch the lines join up or refuse to.` },
    { id: 'smaller', body: `Forget domains, permeability and monopoles. Two sentences: a magnetic field always goes round in a circle, including the part that goes through the inside of the magnet. That is why cutting a magnet gives two magnets instead of two poles. Everything else today is detail attached to those two facts.` },
    { id: 'backward', body: `Start with something you already accept from Lesson 9: a transformer's two coils are not connected, and what passes between them is a magnetic field in an iron core that forms a closed ring. Why a ring? Because the field has to come back round, so the iron is built as a complete loop to give it an easy path the whole way. The shape of every transformer core is this lesson, in steel.` }
  ],

  map: [
    { name: `Magnetic field`, level: 5 },
    { name: `Magnetism`, level: 5 },
    { name: `Induction`, level: 4 },
    { name: `Generators`, level: 4 },
    { name: `Motors`, level: 5 },
    { name: `AC and DC`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
