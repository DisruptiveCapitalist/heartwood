// Electricity & Energy · Week 6 · Lesson 30 — the Heartwood Energy Challenge.
//
// The last lesson of the course, and it introduces nothing whatever. Four
// objects, each one needing most of the six weeks at once, and the simulation
// holds every answer back until it is asked for.
//
// The four are chosen so that between them they touch every week:
//
//   a car on charge   L5 heat, L9 transformers, L17 junctions, L22 and L23
//                     batteries, L24 inverters, L25 three-phase
//   a wind turbine    L13 generators, L14 fields, L9 transformers, L15 the
//                     grid, L25 three-phase
//   a phone charging  L24 switching supplies, L17 junctions, L22 batteries,
//                     L23 wear, L6 power against energy
//   a roof array      L16 photons, L17 the junction, L18 shading, L19 strings,
//                     L20 the curve, L21 tracking
//
// The closing copy does not congratulate and does not test. The measure of
// this course was never a score; it is standing in front of something ordinary
// and finding that a quiet voice says what is happening in there.

export default {
  id: 'lesson-30',
  number: 5,
  week: 6,
  title: `The Heartwood Energy Challenge`,
  openingQuestion: `Thirty lessons ago you asked how a lamp could light instantly when the electrons in the wire crawl slower than a snail. Here are four objects. Each one needs most of this course at the same time, and there is no help on this page until you ask for it. What is happening inside them?`,
  concept: `Anything with a plug`,

  see: {
    voice: 'professor',
    line: `The last time I will say it: your list first, out loud, before you ask me for a single one. Take all four.`,
    simulation: {
      id: 'object-inspector',
      props: {
        prompt: 'Everything you can see. Take your time.',
        objects: [
          {
            id: 'charger', label: 'An electric car on charge', shape: 'charger',
            physics: [
              { concept: 'Why the cable is so thick', lesson: 29, note: 'Forty amps for hours, because a 50 A circuit may only supply 40 continuously. Heat goes as the square of the current, so the copper is heavy and the breaker matches it.' },
              { concept: 'AC in, DC out', lesson: 17, note: 'The battery takes only direct current, so something has to rectify — junctions again, for the fourth time in this course.' },
              { concept: 'The car decides the rate', lesson: 23, note: 'Fast at first, slowing above 80%, because charging hard into a nearly full cell plates lithium as metal and destroys it.' },
              { concept: 'It is a wound spring', lesson: 22, note: 'Nothing is being poured in. Ions are being pushed back across to the graphite, and the car weighs the same when it is full.' },
              { concept: 'And it can run backwards', lesson: 13, note: 'The same pack and the same machine will push power back into a house, or a grid, because a motor and a generator were never two devices.' }
            ]
          },
          {
            id: 'turbine', label: 'A wind turbine', shape: 'turbine',
            physics: [
              { concept: 'Spin into electricity', lesson: 13, note: 'Coils moving past a magnetic field. The wind is doing what steam does at a power station, and the machine cannot tell the difference.' },
              { concept: 'It is three-phase', lesson: 25, note: 'Three sets of windings, as every serious generator has been since Tesla. Smooth, compact, and no commutator to wear out.' },
              { concept: 'Harder to turn when loaded', lesson: 13, note: 'Draw more current and the blades are harder to push round. On a gusty day that resistance is adjusted continuously.' },
              { concept: 'Stepped up at the base', lesson: 9, note: 'A transformer inside the tower, because the cable to the substation is long and the square on the current is unforgiving.' },
              { concept: 'It must match the grid exactly', lesson: 15, note: 'Sixty cycles a second, in phase with a continent — done electronically, so the blades turn at whatever speed the wind allows. Which also decouples their mass from the grid, and that is the inertia problem Lesson 13 ended on.' }
            ]
          },
          {
            id: 'phone', label: 'A phone charging', shape: 'phone',
            physics: [
              { concept: 'A switching supply', lesson: 24, note: 'The little block chops the mains tens of thousands of times a second. It is a matchbox rather than a brick because it switches instead of dropping voltage.' },
              { concept: 'Rectified first', lesson: 17, note: 'Mains AC becomes DC, then gets chopped and transformed and rectified again. Junctions at both ends of the process.' },
              { concept: 'Five watts, not fifty', lesson: 6, note: 'A phone charger is one of the smallest loads in the house. Leaving it plugged in costs a few pence a year — the myth is much larger than the number.' },
              { concept: 'It stops at 80% overnight', lesson: 23, note: 'Sitting full and warm for six hours is the worst thing you can do to a cell, so it waits and finishes before your alarm.' },
              { concept: 'The gauge is a guess', lesson: 22, note: 'The voltage barely moves across the middle of the curve, so the percentage is a running tally rather than a measurement. That is why it sometimes jumps.' }
            ]
          },
          {
            id: 'solar', label: 'A roof array', shape: 'solar',
            physics: [
              { concept: 'One photon, one electron', lesson: 16, note: 'Light arrives in lumps, and each must carry 1.12 eV on its own. Nineteen per cent of the sunlight is too red to be used at all.' },
              { concept: 'A one-way door', lesson: 17, note: 'Without the junction the freed electron falls straight back and all you get is a warm roof. The field does the whole job.' },
              { concept: 'Everything is in series', lesson: 19, note: 'Voltage adds and current does not, for the same reason the pylons do it. But one current shared means the worst cell throttles the rest, which is why bypass diodes exist.' },
              { concept: 'Hot roofs make less', lesson: 20, note: 'Voltage falls 0.29% per degree, so a 402 W panel on a 65° roof gives 339. The best day is bright and cold.' },
              { concept: 'Something hunts the knee', lesson: 21, note: 'The best operating point drifts all day and across the seasons, so a tracker nudges and measures, a few times a second, for twenty-five years.' }
            ]
          }
        ]
      }
    },
    observations: [
      { text: `Four objects, and between them they need **every week of this course** — the loop, the square on the current, the junction, the field, the battery, the switching supply and the grid.` },
      { text: `None of it is new. The last thing on this page you had not met before was in **Lesson 25**, five days ago.` },
      { text: `If you can get most of the way through all four without asking, **the course has done what it was for.** That was always the only test there was.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences to finish on, and none of them is about electricity.`,
    sentences: [
      `What you have is **not a collection of facts about appliances**. It is a small set of ideas — a loop, a push, a flow, a resistance, a field, a junction, a store — that recombine endlessly. Thirty lessons produced perhaps a dozen genuinely separate concepts, and every object in this week was those same dozen arranged differently.`,
      `Which means the right response to an unfamiliar device is **not to look it up but to interrogate it**. Where is the loop; what is the push; where does the energy end up; is anything deliberately resisting, turning, or being changed in form. You will not always finish, and finishing was never the standard — getting a long way in, and being precise about where you stopped, is what competence actually looks like.`,
      `And the honest last word is that **this course has been simplifying throughout**. Every lesson had a paragraph beginning "one honest note", and each of those was a door left ajar. Semiconductors, power electronics, grid engineering and electrochemistry are all deep fields with people spending careers in them. You now have enough to ask them a real question, which is exactly what you did not have thirty lessons ago.`
    ],
    sequence: {
      label: `WHAT YOU COULD NOT DO THIRTY LESSONS AGO`,
      note: `one from each week, and none of them are facts`,
      steps: [
        { name: `Trace a loop`, body: `Week 1. You look at a device and find the path out and back, and you notice when you cannot — which is itself information.` },
        { name: `Read a cable`, body: `Week 2. Thickness, spacing and insulation tell you the current and the voltage it was built for, from the other side of a street.` },
        { name: `Recognise one machine`, body: `Week 3. A motor and a generator are the same object, so you ask which way it is being used today rather than what it is called.` },
        { name: `Reason about light`, body: `Week 4. Colour sets what a photon can do and brightness sets how many. It explains a solar panel and your own sunburn.` },
        { name: `Mistrust a badge`, body: `Week 5. A wattage is a rate; a bill is a total. You now ask "for how many hours?" before forming any opinion at all.` },
        { name: `Know where you stop`, body: `Week 6. The most useful of the lot. "This part is not electrical" and "this needs an electrician" are conclusions, not failures.` }
      ]
    },
    comparison: {
      label: `A LANGUAGE, NOT A PHRASEBOOK`,
      body: `A phrasebook gets you through the situations somebody anticipated and abandons you in every other one. You can ask where the station is and you cannot say that the heating in your room has stopped working, because nobody printed that page. A language is different in kind rather than in size: a few hundred words and some grammar, recombined, handle situations the teacher never imagined — including the ones that had not happened yet. This course was trying to be the second thing. The objects in Week 6 were never covered in Weeks 1 to 5, and that is exactly why they were chosen. *Where the analogy stops:* a language takes years and this took six weeks, which should tell you how small the grammar of electricity actually is. A dozen ideas is not many for a subject that built the modern world, and the fact that so few ideas go so far is itself the most remarkable thing about it.`
    },
    naming: `There is nothing to name. The last new term in this course was **split-phase**, five days ago, and everything since has been recombination. If you want names for where to go next, the fields that open from here are **power electronics** — the inverters and converters of Week 5, and the fastest-moving of them; **semiconductor physics**, which is Week 4 taken properly; **power systems engineering**, which is Week 2 and Week 3 at continental scale; and **electrochemistry**, which is Week 5's batteries. One honest note to close on: every one of those has textbooks that would have been unreadable to you thirty lessons ago and are now merely difficult. That change is the whole of what happened here.`,
    formalNames: {
      terms: [
        { term: `The dozen ideas`, meaning: `A loop, a push, a flow, a resistance, a field, a junction, a store, and the square on the current. Everything in this course was these, rearranged.` },
        { term: `Interrogating an object`, meaning: `Asking which known ideas apply, rather than looking up what it is called. The skill this week practised and the one that lasts.` },
        { term: `Knowing where you stop`, meaning: `Being precise about the edge of your understanding. More useful than a fluent account that papers over the gap.` },
        { term: `Where this goes next`, meaning: `Power electronics, semiconductor physics, power systems, electrochemistry. All four are now merely difficult rather than impenetrable.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Last one. Tap anything here you could now make a decent attempt at.`,
    items: [
      `An induction hob that heats a pan but not the counter.`,
      `A substation humming behind a fence.`,
      `An electric toothbrush charging through solid plastic.`,
      `A wind farm with one turbine stopped while the others turn.`,
      `A plug-in timer that costs almost nothing to run.`,
      `The flickering of a cheap LED bulb on a phone camera.`
    ],
    builder: {
      body: `One last walk, and it is the one from Lesson 15 done backwards and completed. Start at a socket in your house. Go out to the panel, the meter, the service cable, the pole or the pavement box, the line along the street, and as far toward the substation as you can follow. Then keep going in your head: the transmission line, the step-up transformer, the generator turning at 3,600 revolutions a minute, and the turbine being pushed by steam or water or wind. You can now name every stage and say what it is for. Thirty lessons ago that route was a series of grey boxes you had walked past for years without seeing.`
    },
    ownPlaceholder: `The thing I most want to work out next…`,
    synthesis: `That walk is the measure of the course, and it is worth noticing what kind of measure it is. Nothing was memorised. You simply cannot look at those objects any more without seeing what they are doing, and that change is not the sort that wears off.`
  },

  feynman: {
    line: `The last one. Choose your own ground.`,
    instruction: `Explain to someone who has never studied any of this how electricity gets from somewhere far away into something in their hand. Pick the thread you find most convincing and follow it properly — the whole journey, or one object in depth. **Use any words you like.**`,
    unrestricted: true,
    bannedNote: `no banned words. There never really were any — they were a way of making you find your own.`,
    placeholder: `I'd start with the fact that the wire is already full…`,
    checks: [
      `You started somewhere concrete rather than with a definition.`,
      `You used at least one idea from a week you were not consciously thinking about.`,
      `You said where the energy came from and where it ends up.`,
      `And somewhere in it, you told them something that genuinely surprised you six weeks ago.`
    ],
    closing: `That last check is the course in one line. You are now able to surprise somebody with something that surprised you — which is the only real evidence that it ever landed.`
  },

  challenge: {
    voice: 'editor',
    line: `One last pair. The first is the question this course opened with.`,
    prediction: {
      question: `Lesson 1 asked why a lamp lights instantly when the electrons in the wire move slower than a snail. What is the answer?`,
      options: [
        {
          id: 'already',
          text: `The wire is already full of electrons, and all of them start moving almost at once.`,
          verdict: `Correct, and it is worth seeing how much of the course is folded into that sentence now. The wire was always full — the switch does not admit electricity, it completes a loop, and the push propagates along that loop at close to the speed of light while the electrons themselves drift at a fraction of a millimetre per second. Thirty lessons ago you would have accepted that as a fact to be remembered. Now you can connect it to the circuit being a loop, to voltage being a push rather than a substance, and to current being how much goes by rather than how fast. The same answer, standing on far more.`
        },
        {
          id: 'fast',
          text: `The electrons actually travel very fast — the snail figure is a myth.`,
          verdict: `The drift figure is genuinely tiny and genuinely true: in ordinary house wiring under load it is a fraction of a millimetre per second, so an individual electron takes hours to cross a room. What travels quickly is the **electromagnetic field** that carries the push, at close to the speed of light. Confusing the two is the most natural mistake in the subject, and dissolving it was the entire job of Lessons 1 to 4. Nothing moves from the switch to the lamp; the whole loop simply starts moving at once.`
        },
        {
          id: 'energy',
          text: `The energy travels through the wire at the speed of light.`,
          verdict: `Very close, and the correction is a genuinely interesting one to end on. The energy does arrive at nearly light speed, but it does not travel *inside* the copper — it travels in the electromagnetic field in the space **around** the conductors, and the wire's job is to guide it. This is why a coaxial cable has a gap full of insulation that matters enormously, and why high-frequency signals behave so strangely near conductors rather than in them. Your instinct about the speed was right; the location is the part worth knowing, and it is where this subject starts getting properly deep.`
        }
      ]
    },
    open: {
      question: `Last question of the course, and it has no answer key. Of everything in these thirty lessons, which single idea do you expect to still be using in five years — and what will you be using it on?`,
      placeholder: `The one I keep coming back to is…`,
      reveal: [
        `There is no right answer, but there is a common one, and it is worth knowing how often people land on it: **the square on the current**. Heat goes as I²R, and that one fact explains the pylons across the fields, the thickness of jump leads, why panels are wired in long strings, why a stalled motor burns out, why a breaker is sized to a cable, and why the grid looks the way it does. Six weeks of apparently separate subjects kept arriving back at the same equation, and it was never pointed out as a theme because it is better noticed than announced.`,
        `The second most common is **a motor and a generator are the same machine**. It is the idea that turns a car's alternator, a hybrid's brakes, a wind turbine and a power station into one object seen four ways, and people report it changing how they look at machinery generally — not only electrical machinery.`,
        `And whichever you chose, the useful part is that you chose it rather than being told. A course that handed you thirty facts would have left you with whichever ones you happened to retain. This one was trying to leave you with a way of looking, and the evidence that it worked is not that you can recite anything — it is that you are standing in your own kitchen, looking at the toaster, and finding that you already know. That was always the whole of it.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `The last two minutes of the course. Take them properly.`,
    prompt: `When I started this course I thought electricity was… Now I see it as…`,
    placeholder: `And: the first place I expect to notice it tomorrow is…`,
    mapFooter: `Thirty lessons. Look at the distance between the first row and the last — all of that is six weeks of your own attention, and none of it was ever a grade.`,
    tomorrow: `That's the course. Nothing is scheduled for tomorrow. You do not have to remember all of it, and you will not — but something more useful has happened, which is that you have started to see. The next time you pass a substation, lean on a drill, watch a panel on a roof or hear a fridge start up, you may find a quiet voice saying *I know what's happening here.* That was the measure of success from the first page, and it is yours now.`
  },

  routes: [
    { id: 'analogy', body: `A phrasebook versus a language. The phrasebook covers what somebody anticipated and strands you everywhere else; a language is a few hundred words and some grammar that handle situations nobody foresaw. The objects this week were never in Weeks 1 to 5 — that is precisely why they were chosen, and why getting anywhere with them means something.` },
    { id: 'object', body: `Pick up anything with a plug and run the six questions from Lesson 26. Where is the loop, what is the push, where does the energy end up, is anything deliberately resisting, is anything turning, is the current being changed in form. You will not always finish, and you will always get further than a shrug — which is the only comparison that matters.` },
    { id: 'story', body: `In 1831 Faraday showed a changing magnetic field making a current, and could not say what it was for. Within seventy years it had electrified cities, and within a hundred and fifty it was in every object in your house. The gap between a principle and its consequences is often enormous, which is worth remembering whenever something in a laboratory looks like a curiosity.` },
    { id: 'experiment', body: `The best experiment left is the walk in CONNECT IT: socket, panel, meter, service cable, pole, street, substation, and then onward in your head to the turbine. Do it once properly. It takes twenty minutes and it converts thirty lessons of separate pieces into one continuous object that runs from a boiler two hundred miles away to the lamp beside you.` },
    { id: 'smaller', body: `Forget all four objects. One question, for the rest of your life: where does the electricity go in, and where does it come back out? Everything else in this course was what you notice on the way between those two points — and you can start that question on anything, today, knowing nothing else.` },
    { id: 'backward', body: `Start from where you are now and look back at Lesson 1. The question was how a lamp lights instantly when electrons crawl. You could not answer it then. You can answer it now in one sentence, and connect that sentence to five other lessons without effort. Nothing was memorised to make that happen — which tells you what kind of change it was.` }
  ],

  map: [
    { name: `Seeing it in the world`, level: 5 },
    { name: `Your own house`, level: 5 },
    { name: `Solar panels`, level: 5 },
    { name: `Batteries`, level: 5 },
    { name: `Motors`, level: 5 },
    { name: `Generators`, level: 5 },
    { name: `The grid`, level: 5 },
    { name: `Inverters`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
