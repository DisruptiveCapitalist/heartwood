// Physics I · Week 4 · Lesson 18 — buoyancy and displacement, in water.
// Same rule as Lesson 17, second fluid. The package asks it to explain why
// adding cargo sinks a ship lower rather than sinking it.

export default {
  id: 'lesson-18',
  number: 3,
  week: 4,
  title: `Why a steel ship floats`,
  openingQuestion: `Steel is about eight times as heavy as water. Drop a steel bar in a pond and it is gone. And yet we build ships out of it — a hundred thousand tons of it — and they sit on the surface. How?`,
  concept: `Buoyancy and displacement`,

  see: {
    voice: 'professor',
    line: `The same steel both ways. Then load it until the arithmetic stops working.`,
    simulation: { id: 'buoyancy', props: { variant: 'ship' } },
    observations: [
      { text: `Solid steel: even fully under, the water it pushes aside weighs less than it does. There is no depth where the books balance.` },
      { text: `Hollow, with the identical steel: now the hull encloses a great deal of air, so the *whole object* weighs less per cubic foot than water does.` },
      { text: `Add cargo and it does not sink — it settles deeper, pushing more water aside, until the two numbers match again.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Yesterday's rule, unchanged, in a fluid eight hundred times thicker.`,
    sentences: [
      `What floats is never the material. It is the whole object, including every bit of air it has enclosed — and a ship is mostly air with a thin steel skin holding the water off it.`,
      `The water pushes up with the weight of the water shoved out of the way, exactly as the air did yesterday. A floating object sinks until it has pushed aside its own weight in water, and then it stops.`,
      `That "and then it stops" is the whole of how a ship handles cargo. Put another thousand tons aboard and it settles lower, displaces another thousand tons of water, and floats again — until there is no hull left above the surface to settle into.`
    ],
    comparison: {
      label: `THE FOIL AND THE BALL`,
      body: `Take a sheet of kitchen foil and lay it flat on water: it floats easily. Screw the same sheet into a tight ball and drop it in: it sinks. The foil did not change, its weight did not change, and nothing was added or taken away. All you altered is how much water it makes room for — and that, not the material, is what the water was ever responding to.`
    },
    naming: `The water pushed out of the way is the **displacement**, and for a ship it is not a metaphor — it is the unit ships are measured in. A vessel "of 50,000 tons displacement" is one that pushes 50,000 tons of water aside, which is another way of saying it weighs 50,000 tons. The line where the water sits on the hull is the **waterline**, and the marks painted there are a **Plimsoll line**, showing how deep she may legally be loaded.`,
    formalNames: {
      terms: [
        { term: `Displacement`, meaning: `The fluid an object has pushed out of the way. For a floating object it always weighs exactly what the object weighs — that is what floating means.` },
        { term: `Average density`, meaning: `The whole object's weight divided by its whole volume, air pockets included. Less than the fluid's and it floats; more and it sinks. Steel's own density never enters into it.` },
        { term: `Waterline`, meaning: `Where the surface meets the hull. It moves up the hull as cargo goes in, which is why you can read a ship's load from the dockside.` },
        { term: `Plimsoll line`, meaning: `The marks that say how deep she may be loaded, in different waters — sea water is denser than fresh, so a ship rides higher in it, and the marks say so.` }
      ],
      note: `The same principle as Lesson 17, the same as Archimedes in about 250 BC, and — as the naming panel keeps saying — no new law anywhere. Only a different fluid and a much larger object.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Every one of these is about making room rather than about material. Which have you done?`,
    items: [
      `A life jacket, which is mostly trapped foam.`,
      `Floating more easily in the sea than in a pool.`,
      `A cargo ship riding low, and an empty one riding high.`,
      `Taking a deep breath and floating; breathing out and sinking.`,
      `An ice cube sitting mostly below the surface of a drink.`,
      `A stone boat or concrete canoe that somehow works.`
    ],
    builder: {
      body: `Three minutes, one sink, one sheet of kitchen foil. Float the flat sheet — it holds easily, and you can even load it with coins. Count how many it takes before it goes under. Then screw the same sheet into a ball and drop it: straight to the bottom. Same foil, same weight, same water. The only thing you changed was how much room it takes up, and it was decisive.`
    },
    ownPlaceholder: `Something that floats which has no business floating…`,
    synthesis: `The breathing one is the most personal. Your average density with full lungs is just under water's, and with empty lungs just over — which is why most people float and why swimming instructors tell you to breathe.`
  },

  feynman: {
    line: `Explain it to someone who thinks it is a trick.`,
    instruction: `Explain why a solid steel block sinks but a ship made of the same steel floats — **without using the words "buoyancy" or "displacement."**`,
    banned: ['buoyan', 'displac'],
    bannedNote: `those are the names for it — say what the water is actually doing`,
    placeholder: `The block and the ship are the same steel, but they are not the same…`,
    checks: [
      `What matters is the whole object, air pockets included — not what it is made of.`,
      `The ship takes up far more room than the same steel squashed solid.`,
      `The water pushes up with the weight of the water shoved aside.`,
      `It settles until that weight matches the ship's, and then it stops.`
    ],
    closing: `If your explanation also covers the ball of kitchen foil, it is about shape and room rather than about ships.`
  },

  challenge: {
    voice: 'editor',
    line: `Two, and the second one is a genuine puzzle that has caught professional engineers.`,
    prediction: {
      question: `A ship is loaded with another thousand tons of cargo. Why does it sink *lower* rather than simply sinking?`,
      options: [
        {
          id: 'deeper',
          text: `Going lower pushes more water aside, so the upward push grows to match.`,
          verdict: `Exactly right, and notice what an unusual kind of force this is. It is self-adjusting, like the floor in Lesson 6: the ship sinks until the water it has shoved aside weighs what the ship weighs, and there it stops. Add cargo and it finds a new, deeper answer to the same equation. It only stops working when the hull runs out of height — and that is precisely what the Plimsoll line is there to prevent.`
        },
        {
          id: 'spread',
          text: `The cargo is spread out, so the weight is shared across the whole hull.`,
          verdict: `Spreading load does matter enormously for a ship, and a badly distributed cargo will break a hull's back or capsize it — so this is not an idle thought. But it is answering a different question. However you arrange a thousand tons, the total is a thousand tons, and the water responds to the total. The ship would settle by the same amount whether the cargo were in one hold or spread through six.`
        },
        {
          id: 'water',
          text: `The water gets compressed underneath and pushes back harder.`,
          verdict: `This is the right shape of idea aimed at the wrong material — it is a precise description of how the *floor* held you up in Lesson 6, and you have transplanted it sensibly. But water is very nearly incompressible; squeeze it and essentially nothing happens. The push does not grow because the water is squashed harder. It grows because there is more water being held out of the way.`
        }
      ]
    },
    open: {
      question: `Now one to actually think about. You are in a small boat on a pond, holding a heavy iron anchor. You drop the anchor overboard and it sinks to the bottom. Does the water level in the pond go up, go down, or stay the same?`,
      placeholder: `Work out what the anchor displaces in each case…`,
      reveal: [
        `It goes **down**, and almost nobody gets this first time. While the anchor is in the boat, the boat has to float it — so the boat sits deeper and pushes aside a volume of water weighing *as much as the anchor*. Iron being about eight times water's density, that is roughly eight times the anchor's own volume.`,
        `Once the anchor is on the bottom, it is not being floated by anything. It pushes aside only its own physical volume of water — one eighth of what it was displacing before. The boat rises, the pond's level drops, and the difference is seven-eighths of the anchor's volume.`,
        `The rule underneath it is worth keeping: a *floating* object displaces its own weight, and a *sunken* one displaces its own volume. Everything that floats obeys the first, and everything on the bottom obeys the second, and the puzzle is what happens when something moves from one category to the other.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `I now understand floating as…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Buoyancy reached "use" — you predicted a pond's level, which is not a question anyone can answer by recognising a word.`,
    tomorrow: `Tomorrow, Lesson 19: you put a straw in a drink and suck. We are going to find out that you are not pulling anything.`
  },

  routes: [
    { id: 'analogy', body: `Think of a crowded train carriage. Whether you can get on has nothing to do with what you are made of and everything to do with how much room you take up and how much room there is. A thin person with an enormous rucksack takes up more space than a large person without one. Water asks an object exactly one question: how much of me do you want me to get out of the way of?` },
    { id: 'object', body: `Take a sheet of kitchen foil to the sink. Flat, it floats and will carry a small heap of coins. Screwed into a tight ball, it sinks immediately. Identical foil, identical weight. You have changed nothing about the material and everything about how much water it asks to move, and the water's answer changed completely.` },
    { id: 'story', body: `In 1628 the Swedish warship *Vasa* sailed a thousand metres on her maiden voyage and sank in Stockholm harbour in front of a crowd. She was beautifully built and very heavily armed, with two gun decks where the design had allowed for one. She had not stopped obeying the rule; she had simply been loaded until her waterline rose above the open gunports, and once water came in through those the hull's enclosed air — the only reason she floated — went out.` },
    { id: 'experiment', body: `Put a plastic tub in a full sink and load it with coins one at a time. It sinks a little lower with every coin, finds a new level and sits there, over and over — and then at some point one more coin takes the rim under the surface and it goes down in a second. That sudden change is not the rule breaking. It is the rule continuing to work on an object that no longer has any air inside it.` },
    { id: 'smaller', body: `Smaller question. Does an empty sealed bottle float? Yes. Does it float once it has filled with water? No. Nothing about the plastic has changed — same bottle, same weight of plastic. What changed is what is inside it. So what floats cannot be "the bottle". It must be the bottle *and its contents*, taken together, which is the whole idea.` },
    { id: 'backward', body: `Start from the marks painted on the side of every cargo ship — a circle with a line through it and a ladder of letters beside it: TF, F, T, S, W, WNA. They mean tropical fresh water, fresh, tropical, summer, winter, winter North Atlantic. Somebody thought it was worth painting six different legal loading depths on a hull. Work backward from that and you find that how deep a ship sits depends on the density of what she is floating in — and therefore that density was always what the rule was about.` }
  ],

  map: [
    { name: `Buoyancy`, level: 5 },
    { name: `Density`, level: 5 },
    { name: `Displacement`, level: 4, fresh: true },
    { name: `Convection`, level: 3 },
    { name: `Force`, level: 5 },
    { name: `Support force`, level: 5 },
    { name: `Temperature`, level: 4 },
    { name: `Molecular motion`, level: 5 },
    { name: `Thermal energy`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Gravity`, level: 5 },
    { name: `Mass vs weight`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Pressure`, level: 2 }
  ]
}
