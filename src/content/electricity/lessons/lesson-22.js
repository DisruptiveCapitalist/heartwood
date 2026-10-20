// Electricity & Energy · Week 5 · Lesson 22 — a battery is a chemical spring.
//
// The misconception this lesson exists to break is the tank. People picture a
// battery as a container of electricity that fills and empties, and almost
// every consequence of that picture is wrong.
//
// A lithium cell holds a fixed number of lithium ions, and charging moves them
// from the metal-oxide side to the graphite side, where they slot in between
// the carbon layers — intercalation. Discharging lets them back. Nothing is
// consumed, nothing is created, and the cell weighs exactly the same charged or
// flat. It is a spring that has been wound, not a tank that has been filled.
//
// Measured off the simulation. One 18650: 3,000 mAh, 3.6 V nominal, 10.8 Wh.
// The voltage curve is interpolated from real NMC cells:
//
//     0%  3.00 V      the cliff at the bottom
//    10%  3.50 V
//    50%  3.75 V      the flat middle, where a phone seems to sit for hours
//    90%  4.08 V
//   100%  4.20 V      the climb at the top, and the hardest on the cell
//
// Useful energy per kilogram, after the conversion losses that actually apply:
//
//   lead-acid      32 Wh/kg        lithium NMC   230 Wh/kg
//   LFP lithium   147 Wh/kg        petrol      3,175 Wh/kg
//
// Petrol still beats the best battery by about fourteen times even after an
// engine throws away three quarters of it. That is the honest number, and the
// lesson says so rather than pretending otherwise.

export default {
  id: 'lesson-22',
  number: 2,
  week: 5,
  title: `A battery is a chemical spring`,
  openingQuestion: `Everyone describes a battery as a container you fill with electricity and then empty. It is a comfortable picture and it is wrong — wrong enough that it makes batteries seem more mysterious than they are. A fully charged battery and a flat one weigh exactly the same. So what actually changed inside?`,
  concept: `Wound, not filled`,

  see: {
    voice: 'professor',
    line: `{name}, run the charge from empty to full and watch two things: where the ions go, and how little the voltage moves across the middle.`,
    simulation: { id: 'battery', props: { mode: 'spring' } },
    observations: [
      { text: `**Nothing is consumed.** The same lithium ions are there at every state of charge — charging moves them to the graphite side, discharging lets them back. A charged cell and a flat one weigh the same.` },
      { text: `The voltage curve is **steep at both ends and flat in the middle**: 3.00 V empty, 3.75 V at half, 4.20 V full. That flat middle is why a phone seems stuck at 60% for hours, then falls off a cliff.` },
      { text: `**Petrol still wins on weight, by about fourteen times** — even after an engine wastes three quarters of it. 3,175 useful Wh per kilo against 230 for the best lithium cell.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one is the whole correction.`,
    sentences: [
      `A battery does not store **electricity**; it stores a **chemical arrangement** that is willing to change back. In a lithium cell the same ions are present whether it is full or flat — charging pushes them to one electrode and they slot in between layers of graphite like cards into a deck. Discharging lets them return. You have wound a spring, not filled a tank.`,
      `The **voltage comes from the chemistry, not the amount**. Each lithium ion crossing gives up a fixed step of energy set by the two materials, so a tiny cell and an enormous one both sit near 3.6 volts. Size changes how **many** ions can move — the capacity — and never how hard each one pushes, which is exactly the point Lesson 17 made about solar cells and area.`,
      `And because the ions only move rather than being used up, the process **runs both ways** — which is what makes it rechargeable at all. A non-rechargeable battery is one where the reaction genuinely consumes its materials or changes their physical form irreversibly, and that is a difference of chemistry rather than of quality.`
    ],
    sequence: {
      label: `WHAT HAPPENS WHEN YOU PLUG THE PHONE IN`,
      note: `follow one lithium ion, there and back`,
      steps: [
        { name: `The charger pushes`, body: `It supplies a voltage slightly higher than the cell's own, which is the only way to drive the reaction backwards. Nothing is being poured in.` },
        { name: `An ion leaves the oxide`, body: `A lithium ion is pulled out of the metal-oxide lattice on the positive side and sets off across the electrolyte. Its electron goes the long way round, through the wire.` },
        { name: `It slots into graphite`, body: `On the negative side it settles between layers of carbon. The graphite is not changed into something else — it is a car park, and the ion has parked.` },
        { name: `The cell's voltage rises`, body: `More ions parked means a bigger imbalance, so the voltage climbs — gently through the middle, steeply at the top where the good spaces are taken.` },
        { name: `Unplug, and it holds`, body: `The ions stay parked because returning means crossing the electrolyte, and nothing is asking them to. The spring stays wound.` },
        { name: `Connect a load and it unwinds`, body: `Now the electrons have a path, the ions come back, and the energy they give up on the way is the power running your phone. The cell weighs the same throughout.` }
      ]
    },
    comparison: {
      label: `A WOUND CLOCK SPRING, AND A WATER TANK`,
      body: `The picture people carry is a water tank: fill it, and the level tells you what is left. The trouble is that a tank's **pressure** falls steadily as it empties, and a battery's voltage does not — it sits almost unchanged from 20% to 80% and then collapses, which is why phone battery indicators have always been slightly dishonest guesses rather than measurements. A wound spring is the better picture. Winding it stores energy by rearranging something physical, nothing is added or removed, the whole thing weighs the same wound or unwound, and it pushes back with a force set by the spring's own nature rather than by how much you put in. *Where the analogy stops:* a clock spring gives most force when fully wound and tails off smoothly, so you could read its state from its force. A lithium cell's flat middle means you cannot — and the gauge in your phone is actually counting the charge that has gone in and out and keeping a running tally, which is why it occasionally drifts and needs recalibrating.`
    },
    naming: `Ions slotting reversibly into a host material without changing it is **intercalation**, and it is what makes lithium cells rechargeable. The two electrodes are the **anode** (graphite) and **cathode** (a metal oxide), with the **electrolyte** between them carrying ions but not electrons — which is what forces the electrons through your circuit. Capacity is quoted in **amp-hours**, energy in **watt-hours**, and energy per kilogram is **specific energy**. A full charge and discharge is a **cycle**. One honest note: not every battery works this way. A lead-acid cell genuinely does convert its plates into lead sulphate and back, a real chemical transformation rather than parking — which is part of why it is so much heavier for the same energy and why treating it badly damages it differently.`,
    formalNames: {
      terms: [
        { term: `Intercalation`, meaning: `Ions slotting reversibly between the layers of a host material without changing it. Why lithium cells recharge, and why nothing is consumed.` },
        { term: `Anode, cathode, electrolyte`, meaning: `The two electrodes and the medium between them. The electrolyte passes ions but blocks electrons, which is what forces them through your circuit.` },
        { term: `Amp-hours and watt-hours`, meaning: `How much charge, and how much energy. Multiply amp-hours by voltage to get watt-hours — the figure that actually matters.` },
        { term: `Specific energy`, meaning: `Watt-hours per kilogram. About 250 for a good lithium cell, 35 for lead-acid, and 12,700 for petrol before its engine wastes most of it.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've noticed.`,
    items: [
      `A phone that sits at 60% for ages then drops fast.`,
      `A battery percentage that jumps when you restart the device.`,
      `A cordless tool that stops abruptly rather than fading.`,
      `A car battery that is enormously heavy for what it does.`,
      `A torch with old batteries that glows dimly for hours.`,
      `An electric car's weight compared with a petrol one.`
    ],
    builder: {
      body: `The torch comparison is worth doing deliberately, because it shows the difference between two chemistries in a way no specification sheet does. An old alkaline torch fades gradually — the light dims over hours, because an alkaline cell's voltage falls steadily as its materials are genuinely consumed. A lithium-powered torch or tool runs at nearly full brightness and then stops almost without warning, because the voltage barely moves until the ions have nearly all gone. Neither is a fault. The fade and the cliff are the two voltage curves made visible, and once you have seen both you can tell which chemistry a device uses without opening it.`
    },
    ownPlaceholder: `Something whose battery behaved in a way I didn't expect…`,
    synthesis: `That cliff is also why battery gauges are harder than they look. With no usable relationship between voltage and remaining charge across the middle, the device has to count what went in and out and keep a tally — which is an estimate that slowly drifts, and the reason a restart sometimes changes the number.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend what is different inside a charged battery and a flat one — **without using the words "store" or "energy."**`,
    banned: ['store', 'energy'],
    bannedNote: `one of those came back — and the arrangement idea carries it without either`,
    placeholder: `The same stuff is inside either way, but it has been moved to…`,
    checks: [
      `The same materials are inside whether it is charged or flat — nothing is added or removed.`,
      `Charging moves particles from one side to the other, where they slot into place.`,
      `They stay there until you give them a path back through a circuit.`,
      `Letting them return is what drives the device, and the battery weighs the same throughout.`
    ],
    closing: `If your version has "the same stuff, rearranged," you have the correction — and the tank picture should now feel as wrong as it actually is.`
  },

  challenge: {
    voice: 'editor',
    line: `One about size and voltage, and one about the comparison nobody in the industry enjoys.`,
    prediction: {
      question: `A AAA cell and an enormous D cell of the same chemistry both read about 1.5 volts. Why doesn't the bigger one give more voltage?`,
      options: [
        {
          id: 'chemistry',
          text: `Voltage comes from the chemistry, and both have the same chemistry.`,
          verdict: `Correct, and it is the same principle as Lesson 17's solar cell, which also gave 0.69 volts whatever its area. The voltage is the energy step one charge takes in that particular reaction, and that step is a property of the two materials — identical in a AAA and a D cell. What the bigger cell has is more **material**, so more charges can take that step before it is exhausted: more amp-hours, more watt-hours, more current available at once. Size buys quantity and duration, never push. To get more voltage you must stack cells in series, which is what a 9 V battery is — six little cells inside one case.`
        },
        {
          id: 'regulated',
          text: `Both are regulated down to 1.5 V by something inside.`,
          verdict: `There is no regulator in an ordinary cell — open one and you find chemicals, a case and two contacts, with nothing electronic anywhere. Some lithium packs genuinely do contain protection circuits, but those cut off at dangerous limits rather than trimming the voltage to a standard figure. The 1.5 volts is not a chosen target that engineering achieves; it is simply what zinc and manganese dioxide give, and a cell of that chemistry could not be made to give 2 V by any amount of design.`
        },
        {
          id: 'same-charge',
          text: `They hold the same amount of charge, just in different-sized cases.`,
          verdict: `They very much do not — a D cell holds something like ten times the charge of a AAA, which is the entire reason anyone tolerates its weight. The mistake here is a natural one: it assumes that because the voltages match, the contents must match too. In fact the two quantities are independent. Voltage is how hard each charge is pushed, capacity is how many charges there are, and the big cell wins decisively on the second while tying exactly on the first.`
        }
      ]
    },
    open: {
      question: `Petrol holds about fourteen times more useful energy per kilogram than the best lithium battery, even after an engine throws away three quarters of it. Given a gap that large, how do electric cars work at all?`,
      placeholder: `The battery must be making it up somewhere else…`,
      reveal: [
        `Partly because the comparison above already includes the engine's losses and is still unflattering — so the rest has to come from elsewhere. It comes from the **whole vehicle**. A petrol car needs a heavy engine, a gearbox, an exhaust system, a cooling system and a fuel tank; an electric car needs a motor the size of a watermelon and a single-speed reduction. A great deal of the battery's weight penalty is paid back by deleting everything the engine required.`,
        `And from **regenerative braking**, which is Lesson 13 doing useful work. A petrol car turns all its kinetic energy into brake heat at every stop; an electric car runs its motor backwards as a generator and puts a good share back. In town, where stopping is constant, this recovers a substantial fraction and is why electric cars are at their best in exactly the conditions that suit petrol worst.`,
        `But the honest conclusion is that the gap is real and has not been closed. A long-range electric car carries roughly half a tonne of battery to do what fifty kilograms of petrol would, and that is why aviation and shipping remain stubbornly difficult to electrify while cars have become straightforward. The people working on it are not expecting to beat petrol on weight; they are expecting the gap to stop mattering wherever the rest of the vehicle, the cost per mile and the absence of a tailpipe already win. Tomorrow we look at the other half of the bargain — a battery does not last forever, and what wears it out is largely under your control.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about batteries that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 23 — why the spring gets weaker. A battery wears out, and the rate depends almost entirely on how you treat it. Running it flat every time gets you 500 cycles; using the middle half gets you three times as much total energy from the same cell.`
  },

  routes: [
    { id: 'analogy', body: `A wind-up clock. Winding it does not add anything to the clock — it rearranges a spring that was always there, and the clock weighs the same wound or run down. The force it gives back comes from the spring's own nature, not from how much you wound it. A battery is this, with chemistry instead of steel, and the ions are what get rearranged.` },
    { id: 'object', body: `A car battery is enormously heavy for the energy it holds — about 35 watt-hours per kilogram against 250 for a phone cell. The reason is that lead-acid genuinely converts its plates into lead sulphate and back, a real transformation of heavy materials, rather than parking light lithium ions between carbon layers. You can feel the difference between the two chemistries by lifting them.` },
    { id: 'story', body: `The lithium-ion cell took twenty years and three people on three continents, and the 2019 Nobel Prize in Chemistry went to all of them: Whittingham found that ions could slot into a layered material, Goodenough found a far better oxide to do it with, and Yoshino made it safe by using graphite instead of lithium metal. Sony sold the first commercial cell in 1991, and almost nothing about the principle has changed since.` },
    { id: 'experiment', body: `Put a multimeter across a battery you believe is flat. An alkaline AA that no longer runs a toy will still read 1.2 or 1.3 volts — not far off the 1.5 of a fresh one. The voltage was never the thing that ran out. What has gone is the cell's ability to supply **current** without its voltage collapsing, which you can see by measuring again while it is actually driving something.` },
    { id: 'smaller', body: `Forget chemistry and curves. Two sentences: charging moves particles inside the battery from one side to the other, and they stay there until you give them a way back. Letting them come back is what powers the device, and nothing is used up or added in either direction.` },
    { id: 'backward', body: `Start from a fact you can verify on a kitchen scale, at least in principle: a charged phone and a flat phone weigh exactly the same. If electricity were being poured in and used up, something would have to change mass. Nothing does. Work backwards from that and the tank picture collapses, leaving only the possibility that something inside was rearranged rather than consumed.` }
  ],

  map: [
    { name: `Batteries`, level: 3 },
    { name: `Tracking the best point`, level: 4 },
    { name: `Solar panels`, level: 5 },
    { name: `Semiconductors`, level: 4 },
    { name: `The grid`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `AC and DC`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
