// Physics I · Week 6 · Lesson 27 — machines, reusing the energy chain.
// The package's instruction: a refrigerator does not make cold, it moves heat.

export default {
  id: 'lesson-27',
  number: 2,
  week: 6,
  title: `A refrigerator and a ceiling fan`,
  openingQuestion: `Both are plugged into the wall. Both are running. One of them is making your kitchen colder and one of them is not — and it is not the one most people would say.`,
  concept: `Machines and energy`,

  see: {
    voice: 'professor',
    line: `Two machines, the same electricity going in. Watch where it leaves.`,
    simulation: {
      id: 'energy-chain',
      props: {
        unit: 'units',
        amountLabel: 'Electricity going in',
        amountMin: 50, amountMax: 250, amountDefault: 100,
        caption: 'Neither of these makes any cold. Follow what each one does with the energy.',
        chains: [
          {
            id: 'fridge',
            label: 'A refrigerator',
            inputLabel: 'Electricity',
            steps: [
              { label: 'Motor', efficiency: 0.85, lossLabel: 'motor heat' },
              { label: 'Compressor', efficiency: 0.70, lossLabel: 'friction' },
              { label: 'Moving heat out', efficiency: 0.95, lossLabel: 'pipework' }
            ]
          },
          {
            id: 'fan',
            label: 'A ceiling fan',
            inputLabel: 'Electricity',
            steps: [
              { label: 'Motor', efficiency: 0.80, lossLabel: 'motor heat' },
              { label: 'Blades', efficiency: 0.45, lossLabel: 'turbulence' }
            ]
          }
        ]
      }
    },
    observations: [
      { text: `Neither machine produces any cold. There is no such thing to produce — only heat, and places to put it.` },
      { text: `Every unit of electricity ends up as warmth in the room, in both machines. Nothing else can happen to it.` },
      { text: `So the fridge warms your kitchen. It only cools the box inside it, by moving heat out and adding its own on top.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Nothing new. This is Week 3, pointed at two appliances.`,
    sentences: [
      `A refrigerator is a heat *pump*. It does not destroy warmth; it collects it from inside the box and dumps it out of the back, using the wall socket to push it the wrong way — from a cold place to a warm one.`,
      `That pushing costs energy, and every unit of it also ends up as heat in the room. So a running fridge makes your kitchen warmer overall, while making one box inside it colder. Leave the door open and you will heat the room.`,
      `A fan does not cool the air at all. It stirs it, and in fact warms it very slightly. It cools *you*, by moving sweat off your skin faster — which is why a fan in an empty room is doing nothing but costing money.`
    ],
    comparison: {
      label: `BAILING A BOAT`,
      body: `You do not remove water from a boat by making water disappear. You pick it up and throw it over the side — the water still exists, it is simply somewhere else, and the effort of throwing it makes you hot. A refrigerator is a bailing machine for heat, the back of it is over the side, and the warmth coming off those pipes is the machine getting hot from the work.`
    },
    naming: `A machine that moves heat against its natural direction is a **heat pump**, and a refrigerator and an air conditioner are the same device pointed different ways. The pipes at the back are the **condenser**, where the collected heat is handed to your kitchen. And a fan's effect on you is **evaporative cooling** — the same reason you feel cold getting out of a bath.`,
    formalNames: {
      terms: [
        { term: `Heat pump`, meaning: `A machine that moves thermal energy from a cooler place to a warmer one. It cannot happen on its own — Lesson 13 — so it has to be driven, and the driving costs energy that also ends up as heat.` },
        { term: `Condenser`, meaning: `The warm coils at the back or underneath. Where everything taken out of the box, plus everything the motor used, is handed to the room.` },
        { term: `Evaporative cooling`, meaning: `Losing heat as liquid turns to vapour, because the fastest molecules leave first and the ones left behind are slower. How sweat works, and the entire effect of a fan on a person.` },
        { term: `Coefficient of performance`, meaning: `How many units of heat a pump moves per unit of electricity. Often three or four — which looks like breaking Lesson 15 and does not, because moving heat is not the same as creating it.` }
      ],
      note: `Lesson 13 said energy scatters by itself and will not gather back. A heat pump is what it costs to push against that, and the price is exactly why it needs plugging in.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Which of these have you noticed?`,
    items: [
      `The back of the fridge being warm all the time.`,
      `An air conditioner with a hot box outside the window.`,
      `A fan that helps when I'm in the room and not otherwise.`,
      `Feeling cold stepping out of a bath.`,
      `A freezer working harder in a hot kitchen.`,
      `The kitchen being the warmest room in the house.`
    ],
    builder: {
      body: `Five minutes. Put a hand behind or underneath your fridge, near the coils, and hold it there. Warm — continuously, all day, every day. Now open the fridge door and feel the cold air spill out. Both are true at once and that is the lesson: the cold inside and the warmth behind are the same machine doing the same single job. Now work out which of the two is larger, and you will know what a fridge does to a kitchen.`
    },
    ownPlaceholder: `Something that seemed to make cold, and where its heat actually went…`,
    synthesis: `Notice the freezer in a hot kitchen. It works harder because it has to push heat into a room that is already warm — pushing uphill is harder the steeper the hill, and that is as true of heat as of anything else.`
  },

  feynman: {
    line: `Explain it to someone standing in front of an open fridge door, cooling off.`,
    instruction: `Explain where the heat from inside your refrigerator actually goes — **and why standing in front of it with the door open will, over an evening, make you warmer rather than cooler.** Use any words you like.`,
    unrestricted: true,
    banned: [],
    bannedNote: ``,
    placeholder: `The heat inside the box does not disappear. It goes…`,
    checks: [
      `The fridge collects heat from inside the box and releases it at the back.`,
      `The motor's own energy is added to that, so more heat leaves than was taken out.`,
      `All of it ends up in the kitchen.`,
      `With the door open the machine simply cycles room heat back into the room, plus its own.`
    ],
    closing: `If your version makes clear that "making cold" is not a thing that can be done, it has the week's habit in it.`
  },

  challenge: {
    voice: 'editor',
    line: `A question people argue about, usually on a hot evening.`,
    prediction: {
      question: `It is a hot day. You leave the refrigerator door wide open all afternoon. What happens to the kitchen?`,
      options: [
        {
          id: 'warmer',
          text: `It gets warmer.`,
          verdict: `Correct, and it catches almost everybody. The fridge takes heat from the air in front of it and dumps it out of the back — into the same kitchen — so that part is a wash, moving warmth from one side of the room to the other. What is not a wash is the motor, running flat out and never satisfied, turning electricity into heat all afternoon. That is pure addition. A fridge with its door open is an electric heater with extra steps.`
        },
        {
          id: 'cooler',
          text: `It gets cooler — cold air is coming out of it.`,
          verdict: `Cold air genuinely is coming out, so this is a fair reading of the evidence in front of you. The trouble is that it is only part of the evidence. Put your other hand behind the machine and you will find warm air coming out there, and more of it than the cold. The fridge is not a source of cold; it is a mover of heat, and with the door open it is moving the room's heat into the room while adding its own motor's worth on top.`
        },
        {
          id: 'same',
          text: `Nothing — the cold out of the front and the heat out of the back cancel.`,
          verdict: `This is the best wrong answer on the page because it has the right structure: you have spotted that the two must be compared rather than counted separately, which is most of the way there. What it leaves out is the electricity. Those units have to end up somewhere, and the only place available is the kitchen. Cold front plus hot back cancels; the motor does not, and that is the whole of the difference.`
        }
      ]
    },
    open: {
      question: `Now the transfer question. What would change about your refrigerator if friction disappeared completely — everywhere inside it?`,
      placeholder: `What is friction currently costing it…?`,
      reveal: [
        `It would get noticeably cheaper to run and no colder. Look at the chain: the motor loses energy to friction in its bearings, the compressor loses more to friction in the gas and the pistons. Take all that away and the same electricity would move more heat, so it would reach temperature faster and switch off sooner.`,
        `What would *not* change is the direction. Even with no friction anywhere, you would still have to pay to move heat from the cold box to the warm room, because Lesson 13's rule is not about friction — it is about organisation, and pushing heat uphill costs energy regardless of how smooth the machinery is.`,
        `Which is a good thing to have noticed, because it separates two kinds of cost that are easy to confuse. Friction is a practical loss that better engineering reduces. Having to pay at all is a law, and no engineering reduces it. Every real machine is fighting both, and only one of those fights can be won.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `I now see a refrigerator as…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Nothing new on this map today. Energy and thermal energy simply got used on two appliances in your kitchen.`,
    tomorrow: `Tomorrow, Lesson 28: a boat and an aeroplane. Both are held up by a fluid, and not in the same way at all.`
  },

  routes: [
    { id: 'analogy', body: `Think of a man shovelling snow off a driveway. He does not destroy the snow — he moves it to the edge, and the pile at the edge is exactly what came off the drive. He also gets hot doing it. A refrigerator is that man: the box is the driveway, the coils at the back are the pile, and the warmth coming off the machine is the shoveller sweating.` },
    { id: 'object', body: `Put one hand inside the fridge and one hand behind it, at the same time. Cold in one, warm in the other, continuously. Nothing is being destroyed anywhere in that machine; something is being carried from the hand that feels cold to the hand that feels warm, and the carrying is what you are paying for.` },
    { id: 'story', body: `A woman buys a portable air conditioner, the sort with one hose, and props the hose inside the room because the window is awkward. She cannot understand why the room never gets cool. The machine is working perfectly — pulling heat out of the air and blowing it straight back in through the hose, along with its own motor's worth. That hose has to go out of the window, and now you can say exactly why.` },
    { id: 'experiment', body: `On a warm day, sit in front of a fan and then put a slightly damp cloth on your forearm and sit in front of it again. The second one is dramatically colder, and the air has not changed temperature between the two. The fan was never cooling the air; it was helping moisture leave your skin, and you have just turned that effect up.` },
    { id: 'smaller', body: `Smaller question. Is there such a thing as cold, or only less heat? Only less heat — there is no substance of coldness and nothing to make. So a machine that "makes cold" cannot be doing that; it can only be taking heat out and putting it somewhere. Once you accept there is nothing to make, the question becomes "where did it go", and the answer is behind the fridge.` },
    { id: 'backward', body: `Start from the warm coils. Somebody designed a food-cooling appliance and deliberately put a hot radiator on the back of it, where it heats the kitchen. That is a strange choice unless the heat had to go somewhere — and it would not have to go anywhere if the machine were destroying it. Work backward from a design nobody would otherwise choose, and you find that a fridge can only ever move heat.` }
  ],

  map: [
    { name: `Transfer`, level: 4 },
    { name: `Energy`, level: 5 },
    { name: `Thermal energy`, level: 5 },
    { name: `Conservation of energy`, level: 5 },
    { name: `Efficiency`, level: 5 },
    { name: `Energy conversion`, level: 5 },
    { name: `Temperature`, level: 5 },
    { name: `Molecular motion`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Pressure`, level: 5 }
  ]
}
