// Physics I · Week 3 · Lesson 14 — energy conversion, end to end.
// The brief wanted a course that eventually makes electricity its own subject;
// this is the lesson that plants it.

export default {
  id: 'lesson-14',
  number: 4,
  week: 3,
  title: `How a falling weight makes electricity`,
  openingQuestion: `Water falls through a dam in the mountains. Fifty miles away a lamp comes on in a living room. Nothing travelled from the reservoir to the lamp — no water, no fuel, nothing you could put in a bucket. So what got there?`,
  concept: `Energy conversion`,

  see: {
    voice: 'professor',
    line: `One chain, five handovers. Follow the wide band and watch where the red stubs peel off.`,
    simulation: {
      id: 'energy-chain',
      props: {
        unit: 'kJ',
        amountLabel: 'Energy in the falling water',
        amountMin: 50, amountMax: 400, amountDefault: 200,
        caption: 'Four handovers between the reservoir and the lamp. Nothing anywhere makes any of it.',
        chains: [{
          id: 'hydro',
          label: 'Reservoir to lamp',
          inputLabel: 'Water, high up',
          steps: [
            { label: 'Falling', efficiency: 0.92, lossLabel: 'turbulence' },
            { label: 'Turbine', efficiency: 0.94, lossLabel: 'bearings' },
            { label: 'Generator', efficiency: 0.97, lossLabel: 'coil heat' },
            { label: 'Wires', efficiency: 0.94, lossLabel: 'warm cables' },
            { label: 'Lamp', efficiency: 0.40, lossLabel: 'warmth' }
          ]
        }]
      }
    },
    observations: [
      { text: `The band never widens. Not once, anywhere along the chain — no stage gives out more than it was handed.` },
      { text: `Every handover costs something, and every cost is drawn to the same scale as the thing it came out of.` },
      { text: `Turn the input up and the whole picture grows in proportion. The *shares* never change — they belong to the machinery, not to how much you feed it.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Lesson 12 stored it. Today we spend it, through five different forms, and count all the way.`,
    sentences: [
      `A power station is not a source of energy. It is a chain of converters, each one taking energy in one form and handing most of it on in another — and the reservoir at the top is where all of it came from.`,
      `Height becomes motion as the water falls. Motion becomes spinning in the turbine. Spinning becomes electricity in the generator. Electricity becomes light and warmth in your lamp. Four handovers, one quantity.`,
      `And nothing anywhere in that chain creates any of it. A generator is no more a source of electricity than a tap is a source of water — both are just the last thing it passed through on the way to you.`
    ],
    comparison: {
      label: `THE BUCKET CHAIN`,
      body: `A line of people passing buckets from a well to a fire. Nobody in the chain makes any water. Each person receives a bucket and hands it on, and a little slops over the side at every handover. Ask which person is the source of the water and the question is plainly silly — the well is. A generator is a person in the middle of the line, and the reservoir is the well.`
    },
    naming: `Each step is an **energy conversion**, and the machine that performs one is a **transducer** — a word worth having, because it names the pattern rather than the example. A turbine, a generator, a lamp, a loudspeaker, a microphone and the hearing aid you wear are all the same kind of device: something that takes energy in one form and hands it over in another.`,
    formalNames: {
      terms: [
        { term: `Energy conversion`, meaning: `Energy changing form while its total stays the same. Everything a machine does is one of these, or a chain of them.` },
        { term: `Generator`, meaning: `Spins a coil of wire near a magnet, and that motion pushes electrons along the wire. It converts motion into electricity and creates nothing.` },
        { term: `Turbine`, meaning: `Whatever catches the moving stuff and spins. Water, steam, wind, hot exhaust — the working fluid differs, the job does not.` },
        { term: `Electrical energy`, meaning: `Energy carried by electric charge being pushed along. Extraordinarily convenient, because it travels down a wire at near the speed of light and can become almost anything at the far end.` },
        { term: `Power`, meaning: `Not the same as energy — power is energy *per second*. A dam's reservoir holds energy; its output rating is power. Your electricity bill is charged in kilowatt-hours, which is power multiplied by time, which is energy.` }
      ],
      note: `Every stage of this chain obeys Lesson 11. What is new is only the number of handovers, and that everything lost at each one goes exactly where Lesson 13 said it would.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `All of these are converters. Which ones have you got?`,
    items: [
      `A bicycle dynamo powering a headlamp.`,
      `Wind turbines on a hillside.`,
      `A car alternator charging the battery.`,
      `Solar panels on a roof.`,
      `A loudspeaker turning a signal into sound.`,
      `A hand-cranked torch or radio.`
    ],
    builder: {
      body: `Five minutes, if you have a bicycle with a dynamo or a wind-up torch. Crank it slowly and the lamp is dim; crank it hard and it brightens — and you can *feel* the handle get stiffer as it does. That stiffness is the point. The light is not free; you are paying for it through the handle, in real time, and the brighter you want it the harder you have to push. Every power station on Earth works exactly like this, with your arm replaced by a river.`
    },
    ownPlaceholder: `Something in your house that turns one kind of energy into another…`,
    synthesis: `Notice that several of those run in both directions. A loudspeaker pushed by hand generates a signal; a motor spun by hand generates electricity. Converters rarely care which way round you use them.`
  },

  feynman: {
    line: `Follow one piece of it, the whole way.`,
    instruction: `Follow the energy from the top of the dam to the light in the room, naming what it is at each stage — **without saying that anything "produces" or "creates" energy.**`,
    banned: ['produce', 'creates', 'create', 'generates energy'],
    bannedNote: `nothing in the chain makes any — say what each stage hands on instead`,
    placeholder: `At the top of the dam the water is high up, which means…`,
    checks: [
      `You start with the water being high up, and say why that counts as energy.`,
      `You name what it becomes at each handover, in order.`,
      `You say what the generator actually does, without it being a source.`,
      `You account for what leaves the chain along the way.`
    ],
    closing: `If your version makes it obvious that the reservoir is the only well in the story, it is correct in the way that matters.`
  },

  challenge: {
    voice: 'editor',
    line: `The word "generator" has misled about four generations of people. Let us see whether it got you.`,
    prediction: {
      question: `Does a generator create energy?`,
      options: [
        {
          id: 'yes',
          text: `Yes — that is what "generate" means. Electricity comes out that wasn't there before.`,
          verdict: `The word really does say that, and it is a genuinely bad name that has confused people for a century. Something true is hiding in your answer: electricity comes out that was not there before, and that is worth saying. But it was not made from nothing — it was made from the spinning, which was made from the falling water. Here is the test that settles it: disconnect the lamp and the turbine becomes noticeably *easier* to turn. If the generator were creating energy out of nothing, the load at the far end could not possibly be felt at the near end.`
        },
        {
          id: 'no',
          text: `No — it converts motion into electricity and makes nothing.`,
          verdict: `Correct, and the way to be sure is the resistance you feel in the handle. Switch on more lamps and the generator gets harder to turn, immediately and in proportion. That is energy being drawn through, not conjured. A better name would have been "converter", and every physicist wishes it had stuck.`
        },
        {
          id: 'some',
          text: `It converts most of it, but adds a bit of its own from the magnets.`,
          verdict: `This is the most interesting wrong answer on the page, because the magnets genuinely do look like they are contributing — they are essential, they are doing something, and nobody has to keep feeding them. But a magnet is more like a shape than a supply. It provides the arrangement that lets motion push electrons along; it is not consumed and it does not empty. Leave a generator sitting still with its magnets in place, forever, and not one joule comes out. No spinning, no electricity.`
        }
      ]
    },
    open: {
      question: `Then here is the one that shows you understand it. A cyclist with a dynamo switches the headlamp on, and pedalling immediately becomes harder. The lamp is six inches away and connected only by two thin wires. How does turning on a light make a bicycle harder to pedal?`,
      placeholder: `Something has to be crossing the gap…`,
      reveal: [
        `Because the energy the lamp is spending has to come from somewhere at the very moment it is spent — there is nowhere in a dynamo to keep a reserve. Switch on the lamp and current begins to flow, and a current flowing through the dynamo's coil makes the coil itself magnetic, in the direction that opposes the way it is being turned. The harder you draw, the harder it pushes back.`,
        `So the stiffness in the pedals is not a side effect or a design flaw. It *is* the transaction. You are feeling, through your legs, the exact amount of energy leaving as light six inches away — with the whole path, pedal to filament, having no place to store anything in between.`,
        `And this is precisely how the grid works, at an absurd scale. When millions of people boil kettles at once, generating stations across the country immediately become fractionally harder to turn, and their operators have to feed them more. Electricity is not stored in the wires. Every lamp you switch on is felt, that instant, at a power station.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `I can now see electricity generation as…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Energy conversion arrived today, and the brief always intended electricity to become a course of its own. This is where it starts.`,
    tomorrow: `Tomorrow closes the week: every stage in today's chain leaked. Why can't we build one that doesn't?`
  },

  routes: [
    { id: 'analogy', body: `Think of a currency exchange at an airport. You hand over pounds and receive euros; nobody has created any wealth, and they take a cut at the counter. Change euros to dollars and dollars back to pounds and you will have noticeably less than you started with, having created nothing and destroyed nothing — merely paid four commissions. A power station is a series of exchange counters, and the commission is always paid in warmth.` },
    { id: 'object', body: `Find a small electric motor — out of a toy, a fan, anything — and spin its shaft with your fingers while touching its two wires together. It is noticeably harder to spin than with the wires apart. You have just used a motor as a generator and felt the cost of the current you are making. The same device, unmodified, running in reverse.` },
    { id: 'story', body: `A woman on a winter evening in 1950 switches on a lamp. Eighty miles north, in a valley she has never visited, water that fell as rain two months earlier drops four hundred feet through a steel pipe and turns a wheel the size of a room. She thinks she has turned on a light. What she has actually done is ask a river for a small share of the height it was going to lose anyway.` },
    { id: 'experiment', body: `If you have a hand-cranked torch or radio, crank it and watch the lamp while feeling the handle. Slow: dim, easy. Fast: bright, stiff. Then stop cranking and watch how quickly it fades — there is almost nothing held in reserve. The brightness is not coming from inside the torch. It is coming from your arm, live, and the handle is the bill.` },
    { id: 'smaller', body: `Smaller question. Forget dams. If you stand at the top of a hill holding a rock and drop it, could you use its fall to do a job on the way down — turn a wheel, lift something else? Yes, obviously. Now: does it matter whether the rock is a rock or a ton of water? No. And does it matter whether the wheel is connected to a millstone or a coil of wire? Also no. You have just built a hydroelectric station out of a rock and a hill.` },
    { id: 'backward', body: `Start from your electricity bill, which charges you for kilowatt-*hours* — a rate multiplied by a time, which is a quantity. Somebody is counting something and selling it to you by the amount. Now ask what they are counting, given that the copper in your walls weighs exactly the same at the end of the month as at the start. Nothing material arrived. What they sold you is energy, and the meter proves it was a finite supply that came from somewhere.` }
  ],

  map: [
    { name: `Energy`, level: 5 },
    { name: `Energy conversion`, level: 4, fresh: true },
    { name: `Conservation of energy`, level: 5 },
    { name: `Potential energy`, level: 5 },
    { name: `Kinetic energy`, level: 4 },
    { name: `Thermal energy`, level: 4 },
    { name: `Electricity`, level: 3, fresh: true },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Gravity`, level: 5 },
    { name: `Molecular motion`, level: 4 },
    { name: `Torque`, level: 4 },
    { name: `Temperature`, level: 3 }
  ]
}
