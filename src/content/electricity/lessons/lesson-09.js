// Electricity & Energy · Week 2 · Lesson 9 — trade push for flow.
//
// Measured off the simulation: 100 MW down a line of about 10 ohms. At 10 kV
// the loss is 1,000 MW — ten times what is being sent, which is not expensive
// but impossible. At 140 kV it is 5.1%. At 400 kV it is 0.6%.
//
// The whole lesson is Week 1's Lesson 5 scaled up: heat is I²R, so the penalty
// is on the square of the current. Forty times the voltage is a fortieth of the
// current and a sixteen-hundredth of the loss. Nothing else explains why the
// countryside is full of pylons at a voltage nobody's house ever sees.

export default {
  id: 'lesson-09',
  number: 4,
  week: 2,
  title: `Transformers: trading push for flow`,
  openingQuestion: `The power station is perhaps two hundred miles away, and what arrives at your wall is 120 volts. What left the station was nothing of the kind — it crossed the country at hundreds of thousands of volts, through wires no thicker than your thumb. Why go to all that trouble, and how is the voltage changed back without anything moving?`,
  concept: `Trade push for flow`,

  see: {
    voice: 'professor',
    line: `{name}, pull the line voltage all the way down to 10 kV and read the loss. That number is not a bad result — it is an impossible one.`,
    simulation: { id: 'transformer' },
    observations: [
      { text: `A transformer trades voltage for current and **keeps the product**: 120 volts at 2 amps in, a higher voltage at a proportionally smaller current out, and the same watts.` },
      { text: `At **10 kV** the line lost 1,000 MW while carrying 100 — ten times more than was being sent. Not costly. Impossible.` },
      { text: `At **400 kV** it lost 0.6%. Raising the voltage forty times cut the loss sixteen hundred times, because heat in a wire goes as the current **squared**.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third is Lesson 5 doing the heavy lifting again.`,
    sentences: [
      `A **transformer** is two coils of wire around a shared iron core, with nothing moving and nothing touching. A changing current in one coil makes a changing magnetic field, and a changing magnetic field makes a current in the other. That is why it needs alternating current, and it is the whole answer to yesterday's question about why AC won.`,
      `What it does is **trade**: more turns on the output coil means a higher voltage and a proportionally smaller current. Power in equals power out, less a per cent or two. You cannot get more out than you put in, and nothing here pretends otherwise.`,
      `And the reason that trade is worth making is **I²R**. Heat lost in a wire goes as the square of the current — so cutting the current tenfold cuts the loss a hundredfold. Everything about the appearance of the electrical grid follows from that single square.`
    ],
    sequence: {
      label: `FROM A STATION TO A SOCKET`,
      note: `the voltage is changed several times on the way`,
      steps: [
        { name: `Generated`, body: `At the station, typically around 20,000 volts. High, but nowhere near high enough to travel.` },
        { name: `Stepped up`, body: `A transformer at the station takes it to hundreds of thousands of volts. The current falls by the same factor, and the loss by its square.` },
        { name: `Carried`, body: `Across the country on pylons, at a voltage that would arc several feet through air — which is why the wires are bare, far apart and very high up.` },
        { name: `Stepped down`, body: `At a substation, to a few thousand volts for local distribution. Lower voltage, shorter distances, acceptable losses.` },
        { name: `Stepped down again`, body: `By the grey cylinder on a pole or the green box on the street, to the 120 volts that reaches your house.` },
        { name: `And once more`, body: `Inside your laptop's block, down to 19 — and from alternating to direct. The same trick, five times, at five scales.` }
      ]
    },
    comparison: {
      label: `A TOLL CHARGED ON THE SQUARE`,
      body: `Imagine a haulier moving a fixed tonnage across a country, charged not per lorry but per lorry **squared** — two lorries cost four units, ten cost a hundred. Nobody would send ten small lorries; they would send one large one and pay a single unit. Current is the number of lorries and voltage is how much each one carries, and the heat lost in a wire really is charged on the square. Send the same power at ten times the voltage and you have a tenth the lorries and a hundredth the toll. *Where the analogy stops:* no haulier is charged that way, and the whole thing would sound like an absurd invention. In a wire it is simply what happens, and it has shaped every grid ever built.`
    },
    naming: `The ratio of turns on the two coils is the **turns ratio**, and it sets the voltage ratio exactly. Raising voltage is **stepping up**, lowering it **stepping down**. The principle underneath — a changing magnetic field producing a current — is **induction**, and it is the subject of the whole of Week 3. One honest note: transformers are not perfect. A large one is around 99% efficient, and the heat it does lose is why substations hum and why the cylinder on the pole is full of oil to carry heat away.`,
    formalNames: {
      terms: [
        { term: `Transformer`, meaning: `Two coils on an iron core. Changes voltage with no moving parts — and only works on a changing current, which is why the grid is AC.` },
        { term: `Turns ratio`, meaning: `The ratio of coil windings, which is the voltage ratio. Twice the turns, twice the voltage, half the current.` },
        { term: `Step up and step down`, meaning: `Raising voltage for transmission and lowering it for use. A typical supply is transformed three or four times between the station and a socket.` },
        { term: `I²R loss`, meaning: `Heat lost in a wire: current squared, times resistance. The reason transmission voltage is high, and the single most consequential equation in the grid.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've seen.`,
    items: [
      `Pylons marching across fields, wires held far apart.`,
      `A grey cylinder on a pole, or a green box on the pavement.`,
      `A substation behind a fence, humming.`,
      `Signs warning of very high voltage on a fenced compound.`,
      `A doorbell transformer tucked inside a cupboard.`,
      `A phone charger that gets warm while charging.`
    ],
    builder: {
      body: `Go and find your nearest transformer. In most suburbs it is a grey cylinder strapped near the top of a utility pole, or a green metal cabinet at the end of a street; in a town it may be a small brick building with ventilation louvres. Look at how thick the cables going **in** are compared with the ones coming **out**. The incoming ones are thin and the outgoing ones are noticeably fatter — because the voltage has been lowered and the current has risen in proportion, and Week 1's Lesson 5 says that thicker wire is exactly what more current needs.`
    },
    ownPlaceholder: `Somewhere I've seen the voltage being changed…`,
    synthesis: `That thickness comparison is the lesson in physical form. Everything about how a cable looks — how thick, how far from its neighbours, how well insulated — is a readout of the voltage and current it was built for.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why electricity is sent across a country at enormous voltage — **without using the words "transformer" or "resistance."**`,
    banned: ['transformer', 'resistance'],
    bannedNote: `one of those came back — and the argument runs on heat and current alone`,
    placeholder: `The wire gets hot, and how hot depends on…`,
    checks: [
      `Pushing current through a long wire heats the wire, and that heat is lost energy.`,
      `How much heat depends on the current squared — so twice the current is four times the loss.`,
      `The same power can be sent as a high push with a small flow, or a low push with a big flow.`,
      `So choosing the high push makes the flow small and the loss collapses.`
    ],
    closing: `If your version has "squared" in it, you have the reason — and you can look at a pylon and know exactly what it is for.`
  },

  challenge: {
    voice: 'editor',
    line: `One about whether this is too good to be true, and one about why it only works on AC.`,
    prediction: {
      question: `A transformer gives you a higher voltage than you put in. Does it give you more **power** out than in?`,
      options: [
        {
          id: 'yes',
          text: `It must — the voltage went up, and power depends on voltage.`,
          verdict: `The instinct follows from Lesson 3, where more push meant more flow and more power, so it is an honest mistake rather than a careless one. But that was with a fixed load on a fixed supply. Here the current falls by exactly the factor the voltage rose, and power is the **product** of the two. Ten times the voltage with a tenth the current is the same power — and if it were not, you would have a machine making energy from nothing, which Physics I spent a week ruling out.`
        },
        {
          id: 'same',
          text: `No — the current falls by the same factor, so the power is the same.`,
          verdict: `Correct, and it is worth saying plainly that this is not a disappointment. A transformer is not a source of anything; it is a converter, and its value is entirely in the form it delivers. Raising the voltage is useful precisely because the current drops — that drop is the point, and the thing being bought. In practice a large transformer returns about 99% of what it is given, with the missing per cent coming out as the heat you can hear as a hum.`
        },
        {
          id: 'less',
          text: `Less — some is always lost, so stepping up must cost you.`,
          verdict: `True in the small print and misleading as a headline. A transformer does lose a per cent or so, so the output is genuinely a little less than the input. But framing that as the cost of stepping up gets the accounting backwards: you are paying one per cent to avoid losing forty per cent in the line. It is the best trade in the whole system, and it is made several times over on the way to your house.`
        }
      ]
    },
    open: {
      question: `A transformer does nothing whatever on **direct current** — connect a battery to one and the output is nothing at all, except briefly at the moment you connect it. Why would a steady current produce nothing, when a changing one produces so much?`,
      placeholder: `It must be the changing that matters, rather than the current…`,
      reveal: [
        `Because what passes between the two coils is not current but a **changing magnetic field**. Current in the first coil makes a magnetic field; a magnetic field that is changing induces a current in the second coil. A steady current makes a steady field, and a steady field induces nothing at all. The coils are not connected and never were — the only thing crossing the gap is change.`,
        `Which is why the output appears for an instant when you first connect a battery, and again when you disconnect it. Those are the two moments when the field is changing. In between, nothing. Alternating current is, from a transformer's point of view, a supply that is obligingly changing all the time and therefore always working.`,
        `And that single fact decided the shape of the twentieth century. The argument over AC and DC was not really about which current was better — it was about the fact that one of them could have its voltage changed cheaply and the other could not. The square in Lesson 5 made high-voltage transmission necessary; induction made it possible; and only alternating current could use it. Week 3 is about induction itself, which is where motors and generators come from as well.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about how power reaches my house that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 10 — the last of the week, and an old frustration explained. One dead bulb used to put out a whole string of Christmas lights, and the reason is a choice every circuit in your house makes differently.`
  },

  routes: [
    { id: 'analogy', body: `Posting a hundred letters. You can send a hundred separate envelopes or one parcel containing all of them, and the postage is not proportional — it punishes the number of items far more than the weight. Anyone would send the parcel. Current is the number of envelopes, voltage is how much each carries, and the postage in a wire rises with the square of the count.` },
    { id: 'object', body: `Look at a phone charger and a laptop block side by side. Both are transformers plus electronics; the laptop's is heavier because it handles more power and needs more iron and copper. Now consider that the transformer on a pole outside handles perhaps fifty houses, and weighs several hundred pounds. The scaling is visible all the way from your pocket to the street.` },
    { id: 'story', body: `In 1884 a Hungarian team patented the modern transformer with a closed iron core, and the economics of electricity changed within a decade. Before it, a generating station served the streets immediately around it; after it, one station could serve a region. The argument between Edison's direct current and Westinghouse's alternating current was bitter and occasionally disgraceful, and the transformer settled it on arithmetic.` },
    { id: 'experiment', body: `Stand near a substation or a pole transformer on a quiet day and listen. The hum is at twice the supply frequency — a hundred and twenty times a second in America, a hundred in Europe — because the iron core physically flexes slightly each time the field reverses, twice per cycle. You are hearing the magnetic field change direction, which is the mechanism of this lesson made audible.` },
    { id: 'smaller', body: `Forget the grid. One question: if you must deliver a fixed amount of power, and the loss depends on the current squared, what would you do to the current? Make it as small as you possibly can. Now ask what has to happen to the voltage if the power is to stay the same — it must rise by the same factor. You have just derived high-voltage transmission from one sentence about squares.` },
    { id: 'backward', body: `Start with why pylon wires are bare metal, held a long way apart, on enormous insulators, far above the ground. House wiring is sheathed in plastic a millimetre thick. Why the difference? Because at four hundred thousand volts, air itself is the insulator and a plastic coating would be irrelevant — the distance is the insulation. Work backwards from how the hardware looks and you arrive at the voltage it was built for.` }
  ],

  map: [
    { name: `AC and DC`, level: 5 },
    { name: `Magnetism`, level: 3 },
    { name: `Power`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Ohm's law`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 },
    { name: `A circuit is a loop`, level: 5 },
    { name: `Series`, level: 3 }
  ]
}
