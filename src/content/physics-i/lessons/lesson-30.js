// Physics I · Week 6 · Lesson 30 — the last one, and the learner's.
// The package specifies this lesson closely: a table of objects to choose from,
// the Editor's three questions, one transfer question, and a closing message
// that is reproduced here as written.

export default {
  id: 'lesson-30',
  number: 5,
  week: 6,
  title: `Anything you point at`,
  openingQuestion: `Look around you. Pick anything at all. What physics is happening?`,
  concept: `Seeing physics everywhere`,

  see: {
    voice: 'professor',
    line: `Six ordinary things. Choose one — and this time I am genuinely not going first.`,
    simulation: {
      id: 'object-inspector',
      props: {
        prompt: 'Your object. What is happening in it?',
        objects: [
          {
            id: 'cup', label: 'A cup of coffee', shape: 'cup',
            physics: [
              { concept: 'Thermal energy', lesson: 13, note: 'It is losing warmth to the room continuously, and will not stop until it matches it.' },
              { concept: 'Convection', lesson: 17, note: 'The steam, and the circulation inside the cup as the surface cools and sinks.' },
              { concept: 'Support force', lesson: 6, note: 'The table pushing up with exactly the weight of cup and coffee together.' },
              { concept: 'Inertia', lesson: 1, note: 'Why it slops when you set it down sharply, and why a full one is harder to carry.' },
              { concept: 'Pressure', lesson: 19, note: 'The atmosphere pressing on the surface — and why a sealed lid makes it hard to drink from.' }
            ]
          },
          {
            id: 'door', label: 'A door', shape: 'door',
            physics: [
              { concept: 'Torque', lesson: 10, note: 'The handle is as far from the hinge as it can be, and that is not a style decision.' },
              { concept: 'Friction', lesson: 7, note: 'In the hinge, where it is unwanted, and in the latch, where it is the whole point.' },
              { concept: 'Momentum', lesson: 5, note: 'A heavy door swinging shut carries a great deal, which is why a closer exists.' },
              { concept: 'Pressure', lesson: 20, note: 'Why a door can slam in a draught, and why one in a sealed room is hard to open.' }
            ]
          },
          {
            id: 'shoe', label: 'A shoe', shape: 'shoe',
            physics: [
              { concept: 'Static friction', lesson: 7, note: 'The entire purpose of the sole. Walking is a controlled use of grip, as Lesson 3 showed.' },
              { concept: 'Pressure', lesson: 20, note: 'Your weight spread over the sole. A stiletto and a snowshoe are the same idea at two extremes.' },
              { concept: 'Impulse', lesson: 5, note: 'The cushioning stretches each footfall over more time, which is why a heel strike hurts less in a running shoe.' },
              { concept: 'Energy', lesson: 12, note: 'A springy sole stores a little on landing and returns it on push-off.' }
            ]
          },
          {
            id: 'bulb', label: 'A light bulb', shape: 'bulb',
            physics: [
              { concept: 'Efficiency', lesson: 15, note: 'A filament bulb manages about 5% light. The rest you could cook on.' },
              { concept: 'Energy conversion', lesson: 14, note: 'Electricity to heat to light, and a long chain behind it back to a power station.' },
              { concept: 'Electromagnetic waves', lesson: 29, note: 'It emits across a range; your eyes use the thin slice they were issued with.' },
              { concept: 'Thermal energy', lesson: 13, note: 'The filament is at about 2,500°C, which is why it glows at all.' }
            ]
          },
          {
            id: 'kettle', label: 'A kettle', shape: 'kettle',
            physics: [
              { concept: 'Thermal energy', lesson: 13, note: 'Electricity straight into molecular motion, at essentially 100% — one of the few machines that can say that.' },
              { concept: 'Convection', lesson: 17, note: 'The circulation you can hear building before it boils.' },
              { concept: 'Pressure', lesson: 20, note: 'Why it boils at a lower temperature up a mountain, and why a lid rattles.' },
              { concept: 'Energy', lesson: 11, note: 'About 80 kilojoules a mug — the same as stopping a car from 20 mph.' }
            ]
          },
          {
            id: 'fan', label: 'A ceiling fan', shape: 'fan',
            physics: [
              { concept: 'Torque', lesson: 10, note: 'The motor applies it at the hub; the blades meet air resistance far out, where it counts for more.' },
              { concept: 'Lift', lesson: 28, note: 'Each blade is a wing, tilted, throwing air downward. The same mechanism as an aeroplane.' },
              { concept: 'Evaporative cooling', lesson: 27, note: 'It does not cool the room. It cools you, and only while you are in it.' },
              { concept: 'Inertia', lesson: 1, note: 'Why it keeps turning for half a minute after you switch it off.' }
            ]
          }
        ]
      }
    },
    observations: [
      { text: `Every object on that table is four or five ideas at once, and not one of them is from this week.` },
      { text: `Six weeks ago, every one of these was just a thing. The object has not changed.` },
      { text: `What you are doing now — looking at an ordinary thing and finding the physics in it — is the whole of what the course was for.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `There is no new chapter today. There is a reminder, and then you take over.`,
    sentences: [
      `Everything you have learned falls under a handful of headings: motion, forces, energy, matter and heat, pressure, waves and light. Nothing in an ordinary house falls outside them.`,
      `You are not expected to remember every term. Terms can be looked up, and they will come back whenever you use them. What cannot be looked up is the habit of asking the question in the first place.`,
      `So the course does not end with knowing physics. It ends with you being someone who notices it — and that is a permanent change, because you cannot go back to not seeing it.`
    ],
    comparison: {
      label: `THE BIRDWATCHER`,
      body: `Someone who learns twenty birds does not acquire twenty facts. They acquire a garden that has birds in it — and from then on they cannot walk down a lane without noticing movement in a hedge. The lane did not change and the birds were always there. What changed is that the noticing now happens by itself, whether or not they intended it. That is what six weeks of this does to a house.`
    },
    naming: `There is no new name for today. The best description of what you now have is the one you were given in the very first week: standing beside a bridge, watching a car stop, hearing a plane overhead — and a small voice saying *I know what's happening here*.`,
    formalNames: {
      terms: [
        { term: `Motion and forces`, meaning: `Weeks 1 and 2. Inertia, mass, momentum, friction, compression and tension, load paths, torque.` },
        { term: `Energy`, meaning: `Week 3. Kinetic, potential, thermal; conservation, conversion, efficiency — and the one law with a direction in it.` },
        { term: `Matter and heat`, meaning: `Week 4. Temperature, density, buoyancy, pressure, and the enormous number of particles underneath all of it.` },
        { term: `Waves and light`, meaning: `Week 5. Sound, frequency, refraction, reflection, colour, and the spectrum your eyes see a sliver of.` }
      ],
      note: `Thirty lessons, and almost everything after Lesson 1 turned out to be Newton's First Law wearing a different hat. That was not a coincidence in the writing. It is what physics is like.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Last time. Where will you notice it first?`,
    items: [
      `In the kitchen, which turns out to be full of it.`,
      `In the car — braking, cornering, the heater.`,
      `Outside: bridges, roofs, ladders, weather.`,
      `In my own body — knees, balance, hearing.`,
      `In the things that go wrong and need fixing.`,
      `In whatever the next class turns out to be about.`
    ],
    builder: {
      body: `The last Builder task, and it has no end. Pick one object a day — any object — and spend one minute on it. Say one sentence beginning "what is happening here is…". That is all. Do it for a fortnight and it stops being a task; after that it happens without being asked for, which is the only outcome this course was ever aiming at.`
    },
    ownPlaceholder: `The first place you expect to notice physics tomorrow…`,
    synthesis: `Every one of those is somewhere you already were. Nothing on the list requires going anywhere or buying anything, which is rather the point.`
  },

  feynman: {
    line: `The last one, and the biggest.`,
    instruction: `Pick your object and explain it to an intelligent twelve-year-old who has never taken a physics class. Don't tell them what physics is — **show them the physics happening in the thing.** Use any words you like.`,
    unrestricted: true,
    banned: [],
    bannedNote: ``,
    placeholder: `The thing I have chosen is… and here is what is going on in it…`,
    checks: [
      `You started with the object rather than with a concept.`,
      `You explained at least three things happening in it.`,
      `You said what each one is doing, in ordinary words a twelve-year-old would follow.`,
      `You left them able to look at the same object and see it differently.`
    ],
    closing: `That last one is the whole test, and it is the same test the course has been applying to itself for thirty lessons.`
  },

  challenge: {
    voice: 'editor',
    line: `My last three questions, and none of them has a right answer. I want to know what you think.`,
    prediction: {
      question: `Of the explanation you have just given — which of these is the honest description?`,
      options: [
        {
          id: 'certain',
          text: `There are parts I am genuinely certain about now.`,
          verdict: `Good — and name them to yourself, because that list is the real result of six weeks. Certainty that has been tested is worth a great deal more than certainty that has not, and yours has been tested: you have predicted braking distances, pond levels, bridge members going quiet and a balloon in a vacuum. Those were not recited. Being able to say which parts you are sure of, and why, is itself a skill, and most people never develop it.`
        },
        {
          id: 'assuming',
          text: `There are things I am assuming without really knowing.`,
          verdict: `That is the most valuable answer of the three, and noticing it is harder than it sounds — assumptions are invisible precisely because they feel like knowledge. Every explanation rests on some; the physicist's version is called a model, and knowing which parts of yours are load-bearing is what separates understanding from recital. You have found the edge of what you know, which is the only place learning ever happens.`
        },
        {
          id: 'curious',
          text: `There are things I would now like to understand better.`,
          verdict: `Then the course has done what it set out to do. The brief said at the start that the goal was not finishing six weeks but understanding physics better than before — and a list of things you now want to know is a far better outcome than a feeling of completion. Completion would mean the questions had stopped, and they have not. That is not an unfinished course; it is a working one.`
        }
      ]
    },
    open: {
      question: `One last question, and it is the kind I have been asking all along. Take the object you chose. What would change about it if gravity disappeared? Or if friction disappeared? Or if it were suddenly twice as massive? Pick whichever is most interesting for your object, and follow it.`,
      placeholder: `My object is… and if I take away…`,
      reveal: [
        `There is no answer for me to give you here, because the answer depends on what you chose — and that is deliberate. What I can tell you is what a good one looks like. It names what the removed thing had been quietly doing, and then follows the consequence more than one step.`,
        `Take the cup of coffee. Remove gravity and it does not merely float: the coffee leaves the cup, the convection stops because nothing sinks or rises, the steam stops rising, and it cools far more slowly because the warm air around it will not move away. One removal, four consequences, and the last one is the interesting one.`,
        `That technique — take one thing away and follow what collapses — is the most portable thing in this entire course. It works on any object, it needs no equipment, and it tells you what something had been doing all along by showing you what happens when it stops. You will not need me for it.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, and then you are done. Not for today — done.`,
    prompt: `When I started Physics I, I thought physics was… Now I see physics as…`,
    placeholder: `And: the first place I expect to notice physics tomorrow is… Something I still want to understand is…`,
    mapFooter: `Thirty lessons. Look at how much of this is at "explain" and "use" — and remember it started with a car braking and a passenger who kept going.`,
    tomorrow: `You don't have to remember everything you learned. You have learned something more useful: you have begun to see. The next time a bridge carries a truck, a bicycle stays upright, a refrigerator runs, a plane passes overhead, or a ball rolls across the floor, you may find yourself wondering — *what's happening here?* That's physics. And now you know where to begin.`
  },

  routes: [
    { id: 'analogy', body: `Think of learning to drive. For weeks it is mirror, signal, manoeuvre, said out loud, exhausting. Then one day you arrive somewhere and cannot remember the junctions. Nothing was taught on that day; the pieces stopped needing to be held separately. Looking at a kettle and seeing convection, pressure and thermal energy at once is the same transition, and it arrives the same way — quietly, after enough practice, without announcing itself.` },
    { id: 'object', body: `Put your hand flat on the table in front of you. The table is pushing up on you with exactly the weight of your hand, because it is very slightly compressed and squashed things push back. There is a thin film of air between your skin and the wood at fourteen and a half pounds per square inch. Your hand is warmer than the table and is losing heat into it. Light is bouncing off both and into your eye. Nothing unusual is happening. That is the point.` },
    { id: 'story', body: `A man finishes a six-week course and goes to put the kettle on. Halfway through filling it he stops, because he has noticed that the water coming out of the tap is being pushed by the weight of a reservoir two miles away, and that he knows exactly how that works now. He stands there for a moment feeling slightly foolish, and then gets on with the tea. That is what the end of this looks like. It is not dramatic. It just does not switch off.` },
    { id: 'experiment', body: `Walk into the room you know best and find three things you have never once thought about — a hinge, a radiator, a window. Give each one a minute. You will find you have something to say about all three, which you would not have had six weeks ago, and nobody taught you about hinges or radiators or windows specifically. That gap between what you were taught and what you can now explain is the thing worth noticing today.` },
    { id: 'smaller', body: `Smaller question, and the last one. Forget physics entirely. Pick up anything near you and ask two things: what is touching it, and what is it doing? That is all this ever was. Every one of the thirty lessons is a long answer to one of those two questions, and you can ask them about anything, for the rest of your life, without ever needing a book.` },
    { id: 'backward', body: `Start at the very beginning. Lesson 1 asked why your body keeps going when a car stops, and the answer was that nothing had pushed on you. Thirty lessons later you can explain a bridge, a hearing aid, a refrigerator and the colour of a shirt — and nearly every one of them came back, at some point, to something keeping on doing what it was doing until a force changed it. Work backward from here and the whole course is one idea, patiently followed.` }
  ],

  map: [
    { name: `Transfer`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Force`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Conservation of energy`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Pressure`, level: 5 },
    { name: `Thermal energy`, level: 5 },
    { name: `Waves`, level: 5 },
    { name: `Light`, level: 5 },
    { name: `Buoyancy`, level: 5 },
    { name: `Torque`, level: 5 },
    { name: `Momentum`, level: 5 }
  ]
}
