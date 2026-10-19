// Electricity & Energy · Week 2 · Lesson 10 — one loop, or many.
//
// Measured off the simulation: three 60 W bulbs on 120 V. In one loop they get
// 40 V each and produce 6.7 W each — about a ninth of their rated light, from
// the same bulbs and the same supply, because power goes as the square of the
// voltage across them. On separate branches each gets the full 120 V and its
// full 60 W, and the currents add to 1.5 A.
//
// This closes the week by joining Lesson 2's broken loop to Lesson 6's bill: a
// house is wired in parallel so everything works independently, and the price
// of that is a total current, which is what the breaker counts.

export default {
  id: 'lesson-10',
  number: 5,
  week: 2,
  title: `Why one dead bulb used to darken the whole string`,
  openingQuestion: `Anybody who put up Christmas lights before about 1990 remembers the ritual: the whole string dark, and no way to find the one dead bulb except to try every single one. Modern strings do not do this. Nothing about a bulb changed — what changed was how they were joined to each other, and the same choice is made differently in every circuit in your house.`,
  concept: `One loop, or many`,

  see: {
    voice: 'professor',
    line: `{name}, break one bulb while they are in a single loop. Then wire them separately and break one again.`,
    simulation: { id: 'series-parallel' },
    observations: [
      { text: `In **one loop**, three bulbs shared the 120 volts — 40 each — and produced about **6.7 watts** apiece. A ninth of their rated light, from the same bulbs on the same supply.` },
      { text: `Break one and **all** of them went out. Week 1's Lesson 2, now with a practical cost attached: a gap anywhere is a gap everywhere.` },
      { text: `On **separate branches** each bulb got the full 120 volts and its full 60 watts — and breaking one left the others burning. Which is how your house is wired.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the second explains the ninth.`,
    sentences: [
      `**In one loop** — in series — there is a single path, so the same current passes through everything, and the supply voltage is shared out between them. **On separate branches** — in parallel — each branch is its own complete loop, so each gets the full voltage and they are independent of each other.`,
      `Sharing the voltage costs far more than it sounds. Three bulbs each get a third of the voltage, and power goes as the **square** of the voltage across a thing — so a third of the voltage gives about a ninth of the light. That is why an old string was dim as well as fragile.`,
      `A house is wired in **parallel**, so every outlet gets the full 120 volts and everything works whether or not anything else is switched on. The price is that the currents **add** — and that total is exactly what a circuit breaker is counting.`
    ],
    sequence: {
      label: `THE TWO ARRANGEMENTS, SIDE BY SIDE`,
      note: `with three 60-watt bulbs on a 120-volt supply`,
      steps: [
        { name: `In one loop · voltage`, body: `Shared: 40 volts across each bulb. Nobody gets what they were designed for.` },
        { name: `In one loop · light`, body: `About 6.7 watts each — a ninth of rated, because the square of a third is a ninth. Total light from all three: a third of one proper bulb.` },
        { name: `In one loop · a failure`, body: `One break opens the only path. Everything stops, and nothing tells you which bulb it was.` },
        { name: `On branches · voltage`, body: `The full 120 across every one of them. Each runs exactly as designed.` },
        { name: `On branches · current`, body: `Each draws 0.5 amps and they add: 1.5 amps in total. More things means more current, always.` },
        { name: `On branches · a failure`, body: `One branch opens and the others never notice. Which is why you can switch off a lamp without the kettle stopping.` }
      ]
    },
    comparison: {
      label: `A BUCKET CHAIN, OR A ROW OF TAPS`,
      body: `A line of people passing buckets is a single loop: everyone handles every bucket, one person stepping out halts the lot, and if the supply is limited then everybody gets a share of it rather than a full load. A row of taps off one main is the other arrangement: each runs at full pressure, each can be turned off alone, and the only shared consequence is the total draw on the main. *Where the analogy stops:* turning on too many taps gives everyone weaker flow. Plug in too much at home and nothing weakens — the breaker simply opens, because the limit is about the wire getting hot rather than the supply running short.`
    },
    naming: `One path is **in series**; separate branches are **in parallel**. In series the current is the same everywhere and the voltages add up to the supply; in parallel the voltage is the same across everything and the currents add up. A **circuit breaker** is rated in amps — fifteen or twenty for a household circuit — and at 120 volts a 15-amp circuit will carry about **1,800 watts** in total before it opens. That is the number behind nearly every tripped breaker: a heater at 1,500 and a kettle at 2,000 on the same circuit comes to 3,500, which is nearly twice what the wiring is rated for.`,
    formalNames: {
      terms: [
        { term: `In series`, meaning: `One path through everything. Same current, shared voltage, and one break stops it all. Week 1's loop, with more than one thing in it.` },
        { term: `In parallel`, meaning: `Separate branches off the same supply. Full voltage each, currents add, independent failures. How every house is wired.` },
        { term: `Breaker rating`, meaning: `The current at which it opens. At 120 V a 15-amp circuit carries about 1,800 watts before tripping — the real limit on what can share an outlet.` },
        { term: `Shunt`, meaning: `A small bypass across a bulb that conducts when its filament fails, keeping a series string alight. The reason modern Christmas lights survive a dead bulb.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've lived through.`,
    items: [
      `A whole string of lights dark because of one bulb.`,
      `A breaker tripping when the kettle went on with the heater.`,
      `An extension strip with far too much plugged into it.`,
      `Switching off one lamp and nothing else noticing.`,
      `Christmas lights where a few have gone and the rest still work.`,
      `A spare bulb taped to the lead of a light string.`
    ],
    builder: {
      body: `Work out what is on one circuit in your house and add up the watts. The kitchen is usually the interesting one: kettle, toaster, microwave, perhaps a heater. Each is labelled, and at 120 volts a fifteen-amp circuit gives you about 1,800 watts before the breaker opens. You will probably find that any two of the big ones together exceed it — which is precisely why it trips when somebody puts the kettle on while the toaster is going, and why the fix is to move one of them to a different circuit rather than to reset the breaker and hope.`
    },
    ownPlaceholder: `A time something tripped, or a string went dark…`,
    synthesis: `The kitchen sum is the practical payoff of the whole week: Lesson 6 gave you the watts, Lesson 8 gave you what the breaker is protecting, and this lesson explains why the currents add up in the first place.`
  },

  feynman: {
    line: `The last one of the week.`,
    instruction: `Explain to a friend why one failed bulb used to darken an entire string — **without using the words "series" or "parallel."**`,
    banned: ['series', 'parallel'],
    bannedNote: `one of those came back — and the idea is about how they are joined, not what it is called`,
    placeholder: `They were all joined into a single path, so…`,
    checks: [
      `They were all strung into one single path, one after another.`,
      `Everything in one path must carry the same current.`,
      `A break anywhere in that path stops everything in it.`,
      `Joining them so each has its own route to the supply makes them independent.`
    ],
    closing: `If your version says "one path" against "its own route", you have the distinction that explains both the old strings and every socket in your house.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a breaker, and one about how the modern strings were fixed.`,
    prediction: {
      question: `A breaker trips when you switch on one more appliance. What has it actually detected?`,
      options: [
        {
          id: 'voltage',
          text: `A drop in voltage, as the supply is shared out further.`,
          verdict: `This would be the right answer if the house were wired as one loop — in series, adding something really does share the voltage out. But a house is wired in branches, which is the whole point of this lesson: every outlet keeps its full 120 volts however many things are plugged in. The voltage is not what moved, and a breaker has no interest in voltage anyway.`
        },
        {
          id: 'current',
          text: `Too much total current — the branches add up past its rating.`,
          verdict: `Correct. Each appliance is its own branch drawing its own current, and those currents sum in the single wire feeding the whole circuit. Fifteen amps at 120 volts is about 1,800 watts in total. A 1,500-watt heater and a 2,000-watt kettle come to 3,500 — nearly twice the rating — so it opens. And what it is protecting is Lesson 8's answer: the wiring in your walls, from Lesson 5's heat.`
        },
        {
          id: 'surge',
          text: `The sudden surge as the appliance starts up.`,
          verdict: `Genuinely a real phenomenon and sometimes genuinely the cause — motors in particular draw a large gulp of current for a fraction of a second on starting, and breakers are deliberately designed to tolerate a brief surge without opening. But for a kettle or a heater there is no motor and no meaningful surge. The current they draw is simply what they draw, steadily, and the problem is the total rather than the moment.`
        }
      ]
    },
    open: {
      question: `Modern Christmas light strings are **still** wired as one loop — and a failed bulb no longer puts the whole string out. Given that a break in one loop stops everything, how is that possible?`,
      placeholder: `Something must be bridging the gap when a bulb fails…`,
      reveal: [
        `Each bulb carries a tiny second path across it — a **shunt**: a little coil of wire in the base, coated so that it does not conduct while the filament is intact. When the filament burns out, the full supply voltage appears across that gap, which is enough to break down the coating and let the shunt conduct. The gap is bridged from the inside, within a moment of the failure, and the loop closes again.`,
        `But the bargain has a sting in it, and it explains something people notice without understanding. With one bulb shunted, the remaining bulbs now share the supply between fewer of them — so each one gets slightly **more** voltage, runs slightly hotter and fails slightly sooner. Each failure makes the next a little more likely. A string that has lost a few bulbs is genuinely living on borrowed time, which is why they tend to fail slowly and then all at once.`,
        `It is a nice closing note for the week, because it is three lessons at once. Lesson 2 said a gap stops everything — so the fix had to be bridging the gap. This lesson said the voltage shares out — so bridging it loads the survivors. And Lesson 5 said heat goes as the square — so a slightly higher voltage shortens a filament's life by more than you would guess. Three ideas from three separate days, all visible in a box of lights in the attic.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that's the week.`,
    prompt: `One thing about the wiring around me I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `That's Week 2. You can read your bill, say what the wall is actually doing, explain the third hole, work out why the grid runs at four hundred thousand volts, and add up a kitchen. Week 3 goes to the thing underneath transformers — magnetism, and the discovery that electricity and magnetism are one subject.`
  },

  routes: [
    { id: 'analogy', body: `A corridor of rooms with one door at each end, against a corridor with its own door into each room. In the first, everyone walks through everybody else's room and a locked door anywhere stops the lot. In the second, each room is reached independently and locking one affects nobody. Nothing about the rooms changed — only how they were connected, which is the whole of this lesson.` },
    { id: 'object', body: `Look at a string of Christmas lights and count the bulbs, then look at the label for the voltage. If there are fifty bulbs on a 120-volt string, each bulb is running at about 2.4 volts — which is why they are tiny and why a single one held in your hand looks nothing like a bulb that could light a room. The design follows directly from how many are sharing.` },
    { id: 'story', body: `Early houses were sometimes wired in series, and the results were as awkward as you would expect — adding a lamp dimmed every other lamp in the building. Parallel wiring made each outlet independent and made the modern house possible, at the cost of needing thicker supply wires and something to limit the total. The fuse, and later the breaker, exists because of that choice.` },
    { id: 'experiment', body: `Switch on every light in one room and notice that none of them dims. Now imagine the same in a house wired as a single loop: each new lamp would steal voltage from all the others, and a bright room would require turning everything else off. The ordinary fact that lights do not interfere with each other is the parallel arrangement, working so well that nobody ever remarks on it.` },
    { id: 'smaller', body: `Forget wiring. One question: if three things share a push of 120 equally, how much does each get? Forty. Now ask what Lesson 5 said about heat — that it goes as the square of the voltage across something. A third of the voltage therefore gives a ninth of the heat and a ninth of the light. The dimness of an old string falls straight out of a square you already knew.` },
    { id: 'backward', body: `Start with why extension strips carry a maximum wattage printed on them, usually around 1,800. Why would a lead care? Because everything plugged into it shares one cable back to the wall, and that cable carries the sum of all the branch currents. Work backwards from a number printed on a plastic strip and you arrive at parallel branches, adding currents, and a wire that gets hot.` }
  ],

  map: [
    { name: `Series`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `A circuit is a loop`, level: 5 },
    { name: `Open and closed circuits`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Ohm's law`, level: 5 },
    { name: `AC and DC`, level: 5 },
    { name: `Magnetism`, level: 3 }
  ]
}
