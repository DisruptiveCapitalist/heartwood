// Physics I · Week 4 · Lesson 19 — atmospheric pressure.
// The package's instruction is that the atmosphere is doing the pushing, so the
// simulation's vacuum switch and the challenge both turn on that single point.

export default {
  id: 'lesson-19',
  number: 4,
  week: 4,
  title: `Why you can drink through a straw`,
  openingQuestion: `You put a straw in a drink and suck, and the drink comes up. Obviously you are pulling it. Except that nothing in physics can pull at a distance through a tube — so what is really happening?`,
  concept: `Atmospheric pressure`,

  see: {
    voice: 'professor',
    line: `Draw the air out slowly and watch the arrows. Then take the atmosphere away and try again.`,
    simulation: { id: 'straw-pressure' },
    observations: [
      { text: `The arrows are all on the *outside*, pressing down on the surface of the drink. There is not one inside the straw.` },
      { text: `You never pull. You reduce what is pressing down inside the tube, and the outside push — which was always there — wins.` },
      { text: `Take the atmosphere away and nothing happens at any setting. A perfect vacuum in the straw lifts nothing at all.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `You have been standing under about a ton of air all your life. Today we notice it.`,
    sentences: [
      `The atmosphere is not empty space. It is a real material with real weight, piled fifty miles deep, and the column of it above every square inch of the world presses down with about fifteen pounds.`,
      `That press is on everything, including the surface of your drink. It is trying to push the drink up the straw already — and failing, because the air inside the straw is pressing down on the column with exactly the same fifteen pounds.`,
      `Sucking does not pull. It removes some of the air inside the straw, so the inside press becomes less than the outside press — and the atmosphere, which has been waiting, pushes the drink up the tube for you.`
    ],
    comparison: {
      label: `THE TUG OF WAR`,
      body: `Two teams pulling on a rope, dead level, nothing moving. Now half of one team lets go. The rope shoots one way — and the team that moved it did not pull any harder than a moment before. They were always pulling that hard; what changed is that the opposition stopped. Your lungs are the half team letting go. The atmosphere does all the work and always did.`
    },
    naming: `Force spread over an area is **pressure**, and the weight of the air overhead is **atmospheric pressure** — about 14.7 pounds on every square inch at sea level, which is the number the simulation is using. It is also called *one atmosphere*, and physicists measure it with a **barometer**, which is nothing but a very tall straw that nobody is sucking on.`,
    formalNames: {
      terms: [
        { term: `Pressure`, meaning: `Force divided by the area it is spread over. Pounds per square inch, or psi. Tomorrow is entirely about this.` },
        { term: `Atmospheric pressure`, meaning: `The weight of the air column above you: 14.7 psi at sea level, less on a mountain, and it is why a sealed packet of crisps puffs up when you fly.` },
        { term: `Vacuum`, meaning: `The absence of the stuff that was doing the pressing. Note what this lesson shows: a vacuum does not suck. Nothing about emptiness pulls on anything.` },
        { term: `Barometer`, meaning: `A tube of mercury, closed at the top, that the atmosphere holds up. The height of the column *is* the pressure, which is why weather forecasts talk in inches or millimetres of mercury.` }
      ],
      note: `And this is Lesson 17's buoyancy from underneath. A fluid pushes harder from below than above because there is more of it piled up below — that difference lifted the balloon, and this same piling-up is what presses on your drink.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Every one of these is the atmosphere doing something. Which have you used?`,
    items: [
      `A suction cup stuck to a window.`,
      `A syringe drawing liquid up.`,
      `Ears popping on a plane or up a hill.`,
      `A sealed packet swelling at altitude.`,
      `A vacuum cleaner, which pushes air rather than pulling dirt.`,
      `Getting the last of a drink and the cup crumpling.`
    ],
    builder: {
      body: `Two minutes, one glass, one postcard. Fill a glass to the brim with water, lay a postcard flat over the top, hold it with one hand and turn the whole thing upside down over the sink. Let go of the card. It stays, and so does the water. Nothing is holding the card up except the air pressing on it from below — fifteen pounds per square inch, on a card the size of your palm, which is far more than a glassful of water weighs.`
    },
    ownPlaceholder: `Something you thought was sucking, that was actually being pushed…`,
    synthesis: `Notice how many of those have "suck" or "vacuum" in the name. Every one of them is a device for reducing pressure somewhere and letting the atmosphere do the pushing — the names are all backwards.`
  },

  feynman: {
    line: `Explain it to someone with a drink in front of them.`,
    instruction: `Explain what actually happens when you drink through a straw — **without using the words "suck," "pull" or "vacuum."**`,
    banned: ['suck', 'pull', 'vacuum'],
    bannedNote: `all three suggest something reaching down the tube — nothing does`,
    placeholder: `There is air pressing on the drink in the glass, and…`,
    checks: [
      `The air presses down on the surface of the drink in the glass, hard.`,
      `Normally the air inside the straw presses down on the column just as hard, so nothing moves.`,
      `Your mouth removes some of the air inside the straw, lowering the press in there.`,
      `The outside press — unchanged throughout — now wins, and pushes the drink up.`
    ],
    closing: `If your version makes it obvious that this would not work on the Moon, it is about the atmosphere and not about your mouth.`
  },

  challenge: {
    voice: 'editor',
    line: `A question that stumped the best engineers in Florence, and got Galileo interested.`,
    prediction: {
      question: `Suppose you had a perfect pump and a straw as tall as you liked. How high could you lift water?`,
      options: [
        {
          id: 'any',
          text: `As high as you like — a better pump gives a stronger pull.`,
          verdict: `This is exactly what the Grand Duke of Tuscany's engineers assumed in the 1630s, and they were badly caught out: their pumps refused to lift water from a deep well past about thirty-four feet, no matter how well made. The mistake is in the word "pull". A pump does not pull water. It removes air above it, and the atmosphere pushes the water up — so a better pump can only ever approach doing nothing at all inside the pipe. Perfection is a floor, not an infinity.`
        },
        {
          id: 'thirty',
          text: `About thirty-four feet, and no further, however good the pump.`,
          verdict: `Correct, and it is one of the most satisfying numbers in physics. The atmosphere presses with 14.7 psi, and a column of water thirty-four feet tall presses down with exactly that. Beyond that height the water weighs more than the air can hold up, and no pump can help because the pump was never the thing doing the lifting. Torricelli realised this, swapped water for mercury — fourteen times denser, so a column only thirty inches tall — and in doing so invented the barometer.`
        },
        {
          id: 'depends',
          text: `It depends on the diameter — a wider straw lifts more, so it lifts higher.`,
          verdict: `A wider straw does lift more water, and you are right about that: double the area and you get double the weight of water up there. But the atmosphere is also pressing on double the area, so the push doubles too. Both sides of the ledger scale together and the *height* comes out identical. A drinking straw and a six-inch pipe both stop at thirty-four feet, which is a good sign that the answer is about pressure rather than about force.`
        }
      ]
    },
    open: {
      question: `Then the one that makes it personal. Fourteen and a half pounds is pressing on every square inch of you, right now. Your chest is roughly 150 square inches, so that is about a ton on your front alone. Why are you not crushed?`,
      placeholder: `What is on the other side of your skin…?`,
      reveal: [
        `Because there is the same pressure inside you, pushing out. Your lungs, your gut, your blood, the fluid in every cell — all of it is at atmospheric pressure too, because all of it grew up in this. The ton on your chest is matched by a ton pushing back, and the net effect on you is nothing at all.`,
        `Which is Lesson 6 again, exactly: two forces of the same size in opposite directions leave the motion unchanged, and the result looks identical to nothing happening. You do not feel the atmosphere for the same reason you had never noticed the floor pushing on you.`,
        `And it is why the *difference* is what hurts. A plane cabin loses pressure and your eardrum has the old pressure on one side and the new on the other, so a fraction of a pound per square inch across a small membrane becomes agony. A diver comes up too fast. A sealed can in a vacuum chamber collapses. Nobody is ever crushed by pressure. They are crushed by a mismatch.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `The atmosphere is not empty space. It…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Pressure has arrived properly. Tomorrow it gets the whole lesson, and the particle box comes back to explain where it comes from.`,
    tomorrow: `Tomorrow closes the week: air holds up a truck's tires and drives a storm across a continent. We go back to the box of particles and find out what pressure actually is.`
  },

  routes: [
    { id: 'analogy', body: `Think of a revolving door with people pressing on both sides, evenly, so it does not move. Someone on your side steps back. The door swings toward you — pushed by the people on the *other* side, who have not changed what they were doing at all. That is a straw. You do not pull the drink up; you stop pressing down on it, and the atmosphere carries on as it always was.` },
    { id: 'object', body: `Find a suction cup — a bathroom hook, a phone mount. Press it to a window and notice you are *squeezing the air out* from behind it. Nothing in the cup is gripping. Once the air is out, the atmosphere on the outside is pressing it against the glass with fifteen pounds on every square inch of it, and that is the entire mechanism. Wet the rim and it works better, because the water seals the gap and stops air creeping back in.` },
    { id: 'story', body: `In 1654 the mayor of Magdeburg had two copper hemispheres made, put them together, pumped the air out, and harnessed two teams of eight horses to pull them apart. They could not. There was no glue and no catch — only the atmosphere pressing in from all sides on a sphere with nothing inside pressing back. Sixteen horses lost a tug of war against an absence.` },
    { id: 'experiment', body: `Fill a glass to the brim, lay a postcard over it, hold the card, invert the glass over the sink, and let go of the card. It holds. The water stays up. Nothing is doing that but air pressing upward on the card — and it is holding a glassful of water without apparent effort, which tells you how much pressure there is and how thoroughly you have stopped noticing it.` },
    { id: 'smaller', body: `Smaller question. When you drink through a straw, could it work on the Moon? No air outside, so nothing pressing on the drink. So — nothing would come up the straw, however hard you tried. Now: if the outside air is what makes the difference between working and not working, then the outside air must have been doing the job all along. Your mouth is identical in both places.` },
    { id: 'backward', body: `Start with a puzzle from the 1600s: Florentine well-diggers could not lift water more than about thirty-four feet with a suction pump, no matter how well built. If pumps *pulled*, a better pump would go deeper — and better pumps did not. The wall was always in the same place. A limit that does not care how good your equipment is has to come from somewhere other than the equipment, and the only other thing in the story is the air.` }
  ],

  map: [
    { name: `Pressure`, level: 4 },
    { name: `Atmosphere`, level: 4, fresh: true },
    { name: `Buoyancy`, level: 5 },
    { name: `Density`, level: 5 },
    { name: `Displacement`, level: 4 },
    { name: `Force`, level: 5 },
    { name: `Support force`, level: 5 },
    { name: `Molecular motion`, level: 5 },
    { name: `Temperature`, level: 4 },
    { name: `Thermal energy`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Gravity`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Convection`, level: 3 }
  ]
}
