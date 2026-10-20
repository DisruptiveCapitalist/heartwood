// Electricity & Energy · Week 5 · Lesson 23 — why the spring gets weaker.
//
// Measured off the simulation. One 18650 cell, 10.8 Wh, with cycles to 80%
// capacity as 500·(100/DoD)^1.6 and life roughly halving per 12 °C above 25:
//
//   depth used   cycles at 25 °C   total kWh      at 40 °C   total kWh
//        100%           500           5.4            210        2.3
//         80%           715           6.2            300        2.6
//         50%         1,516           8.2            637        3.4
//         20%         6,566          14.2          2,761        6.0
//
// Two findings carry the lesson. The first is that using LESS of the battery
// each time gets MORE out of it in total — 20% cycling delivers 14.2 kWh over
// the cell's life against 5.4 kWh for running it flat, two and a half times as
// much. Each cycle gives less and there are thirteen times as many of them.
//
// The second is heat. The same cell cycled the same way at 40 °C instead of
// 25 lasts well under half as long. Nothing the user does to a battery matters
// as much as where they leave it.
//
// Both of those are why an electric car hides a buffer at each end of its pack
// and cools it actively, and why a phone offers to stop charging at 80%.

export default {
  id: 'lesson-23',
  number: 3,
  week: 5,
  title: `Why batteries wear out`,
  openingQuestion: `Yesterday's cell was a spring that can be wound and unwound indefinitely, with nothing consumed. So why does a three-year-old phone last half a day, and why does an electric car come with a warranty measured in years and miles rather than a simple promise that it will keep working?`,
  concept: `Use less, get more`,

  see: {
    voice: 'professor',
    line: `{name}, take the depth of discharge down to 20% and read the total. Then put it back to 100% and push the temperature to 45.`,
    simulation: { id: 'battery', props: { mode: 'wear' } },
    observations: [
      { text: `Run it **flat to full every time**: 500 cycles, and 5.4 kWh out of the cell in its whole life. That is the hardest possible treatment and the usual one.` },
      { text: `Use only the **middle 20%** instead and each cycle gives a fifth as much — but you get 6,566 of them. Total: **14.2 kWh**, two and a half times more from the same cell.` },
      { text: `**Heat is worse than anything you do with it.** The same cell cycled the same way at 45° instead of 25° gives well under half. Where you leave it matters more than how you use it.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first names the thing that is actually being lost.`,
    sentences: [
      `The ions are not what wears out — the **places they park** are. Every charge grows a microscopic film on the graphite that permanently traps a few lithium ions, the electrodes swell and shrink slightly each cycle and eventually crack, and both effects take parking spaces out of service for good. Capacity does not leak away; it is demolished, slowly, a little per cycle.`,
      `And the damage is **worst at the extremes**. A nearly full cell is crowded and strained, a nearly empty one is strained the other way, and both ends are where the voltage curve from yesterday goes steep. Cycling through the comfortable middle does far less harm per cycle — so much less that using a fifth of the battery each time delivers more than twice the total energy over its life.`,
      `**Heat accelerates all of it**, because every one of these processes is a chemical reaction and reactions go faster when hot. A cell is damaged by sitting in a hot car doing nothing at all, which is why ageing has two separate parts: the **cycle** ageing you cause by using it, and the **calendar** ageing that happens anyway.`
    ],
    sequence: {
      label: `THE THREE THINGS THAT ACTUALLY DESTROY A CELL`,
      note: `and what each one is provoked by`,
      steps: [
        { name: `The film that keeps growing`, body: `A protective layer forms on the graphite on the very first charge, which is necessary — but it keeps thickening slowly forever, and every bit of growth permanently traps lithium. Heat makes it grow faster.` },
        { name: `Electrodes that crack`, body: `Graphite swells about 10% as ions park in it and shrinks again as they leave. Thousands of cycles of that fatigues the material until pieces break off and lose contact. Deep cycles flex it hardest.` },
        { name: `Metal plating out`, body: `Charge too fast, or charge when very cold, and lithium plates onto the surface as metal instead of slotting in. That lithium is gone from service — and the spikes it forms can eventually pierce the separator, which is the dangerous failure.` },
        { name: `So: avoid the ends`, body: `Both extremes strain the electrodes most. The middle is gentle, and a shallow cycle does far less than a fifth of the damage of a full one even though it delivers a fifth of the energy.` },
        { name: `Avoid heat above all`, body: `Every process above is a reaction, and reactions roughly double in rate per ten or twelve degrees. A battery left hot ages fast whether or not it is being used.` },
        { name: `And avoid sitting full`, body: `Calendar ageing is worst at a high state of charge, because a full cell is a strained cell. Stored for months, a cell is happiest around half charge and cool.` }
      ]
    },
    comparison: {
      label: `A PAPERCLIP, AND A HOUSE LEFT EMPTY`,
      body: `Bend a paperclip gently back and forth and it will take an enormous number of bends. Bend it all the way, hard, to its limits each time, and it snaps in a handful. The metal has not been used up and no material has gone anywhere — it has been **fatigued**, and the damage per bend depends almost entirely on how far you bent it. That is depth of discharge, and it is why shallow cycling wins so decisively. But fatigue is only half of it, because a battery also deteriorates while nothing is happening to it, the way a house left empty still rots. *Where the analogy stops:* a paperclip left in a drawer is unchanged in ten years, and a cell is not — it is quietly growing that film the whole time, faster if it is warm and faster if it is full. A battery you never use still ages, which is why the date of manufacture matters when you buy one.`
    },
    naming: `How much of the battery you use each time is the **depth of discharge**, and the amount left in it is the **state of charge**. Wear from using it is **cycle ageing**; wear that happens regardless is **calendar ageing**. The film on the graphite is the **solid-electrolyte interphase**, universally the **SEI**, and metal forming on the surface instead of slotting in is **lithium plating**. The industry calls a cell worn out at **80% of original capacity**, which is a convention rather than a failure — a pack at 70% is perfectly usable, just smaller. One honest note: chemistry matters enormously here. **LFP** cells hold less per kilogram than the NMC modelled above but commonly manage three to five times the cycles, which is why home storage batteries and standard-range cars increasingly use them while long-range cars still do not.`,
    formalNames: {
      terms: [
        { term: `Depth of discharge`, meaning: `How much of the battery each cycle uses. The single biggest thing under your control — shallow cycles deliver far more total energy.` },
        { term: `Cycle and calendar ageing`, meaning: `Wear from using it, and wear that happens anyway. A battery left hot and full ages fast while doing nothing.` },
        { term: `SEI`, meaning: `The film that forms on the graphite. Necessary on the first charge, and it keeps thickening forever, trapping lithium as it goes.` },
        { term: `Lithium plating`, meaning: `Lithium depositing as metal instead of slotting in — caused by charging too fast or too cold. Permanently lost, and the route to the dangerous failure.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `A phone offering to finish charging just before you wake.`,
      `An electric car that recommends charging to 80% day to day.`,
      `A laptop left plugged in permanently, with a swollen battery.`,
      `A phone that shuts down suddenly in cold weather.`,
      `A power tool battery that died after a winter in the shed.`,
      `A rapid charger that slows down as the battery fills.`
    ],
    builder: {
      body: `The overnight charging feature is this lesson implemented by your phone, and it is worth understanding rather than dismissing. Left alone, a phone plugged in at eleven would reach 100% by one in the morning and then sit there, full and slightly warm, for six hours — which is the worst combination for calendar ageing. So it charges to 80%, waits, and finishes just before your alarm. Check whether yours has it switched on. The same reasoning explains why rapid chargers slow dramatically after about 80%: those last few per cent are where plating risk is highest, so the charger backs off deliberately rather than because it has run out of capability.`
    },
    ownPlaceholder: `Something I've done to a battery that I'd now do differently…`,
    synthesis: `Notice that every one of those behaviours is the device protecting itself from its owner's convenience. None of them make the battery better; they make the treatment gentler, which this lesson says is nearly the whole game.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why charging to only 80% makes a battery last longer — **without using the words "cycle" or "degrade."**`,
    banned: ['cycle', 'degrade'],
    bannedNote: `one of those came back — and the strain idea carries it without either`,
    placeholder: `The battery is most strained when it is nearly full or nearly empty…`,
    checks: [
      `A battery is most strained at its two extremes, nearly full and nearly empty.`,
      `Each charge does a little permanent damage, and more of it near the ends.`,
      `Staying in the middle does far less harm each time, so it survives far more charges.`,
      `And heat speeds all of the damage up, whether or not the battery is being used.`
    ],
    closing: `If your version has "the damage is worse at the ends," you have the whole practical lesson — and the reason your phone offers to stop at 80%.`
  },

  challenge: {
    voice: 'editor',
    line: `One about getting the most out of a battery, and one about what happens to it afterwards.`,
    prediction: {
      question: `You want the **most total energy** out of a cell over its whole life. Do you use all of it each time, or only part?`,
      options: [
        {
          id: 'part',
          text: `Only part — shallow cycles deliver more in total.`,
          verdict: `Correct, and the margin is larger than almost anyone expects. Using the middle 20% gives you a fifth of the energy per cycle but thirteen times as many cycles, which works out at 14.2 kWh over the cell's life against 5.4 kWh for running it flat every time — two and a half times as much. The damage per cycle falls much faster than the energy per cycle does, and that mismatch is the whole opportunity. It is why grid storage batteries are deliberately oversized and cycled gently: the extra cells cost money once, and the extra life pays for them repeatedly.`
        },
        {
          id: 'all',
          text: `All of it — you paid for the whole capacity, so use it.`,
          verdict: `Intuitive, and it would be right if damage were proportional to energy delivered. It is not. Full cycling drives the cell through the strained extremes at both ends twice a day, and the damage there is disproportionately high — so you get the most out of each individual cycle and far fewer of them. 500 cycles at full depth yields 5.4 kWh in total; shallow cycling yields 14.2. You did pay for the whole capacity, and the best way to spend it is as headroom rather than as range.`
        },
        {
          id: 'same',
          text: `It makes no difference — the total energy is fixed either way.`,
          verdict: `This would hold if a cell had a fixed budget of watt-hours to deliver, like a tank with a known volume. But wear is mechanical and chemical fatigue, not consumption, so the budget depends entirely on how roughly you spend it. The simulation makes the point at its extremes: the same cell delivers 5.4 kWh if run flat every time and 14.2 kWh if nibbled at. Nothing about the cell changed — only the treatment.`
        }
      ]
    },
    open: {
      question: `An electric car's battery is called worn out at 80% of its original capacity, and then the car is often scrapped or the pack replaced. But 80% of a very large battery is still an enormous amount of storage. What should happen to it?`,
      placeholder: `It is only useless for the job it was doing…`,
      reveal: [
        `It should stop being a car battery and become a building's battery. A pack at 70 or 80% has lost range, which matters enormously in a vehicle where weight and space are fixed — but a battery sitting in a warehouse or beside a substation does not care how much it weighs or how big it is. **Second-life** storage takes retired vehicle packs and uses them for grid balancing and solar storage, where another ten years of gentle shallow cycling is entirely realistic.`,
        `And after that, recycling, which is where the economics are genuinely moving. Lithium, cobalt and nickel are valuable and a used pack is a far richer ore than anything dug out of the ground — a tonne of cells contains more cobalt than a tonne of almost any mine's rock. Modern processes recover well over 90% of those metals, and the material goes straight back into new cells.`,
        `Which puts this week's two halves together rather neatly. Yesterday said a battery is a spring in which nothing is consumed; today said the spring itself fatigues. Both are true, and between them they say that the materials outlast the device by a long way — the lithium in a worn-out pack has not been used up, it has merely lost its parking spaces, and in a new cell it works exactly as well as it ever did. Tomorrow we turn to the last device in the chain: the panel gives direct current, the battery gives direct current, and your house wants a sine wave sixty times a second. Something has to build one.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about how batteries age that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 24 — the panel makes direct current and so does the battery, but your house runs on a sine wave that reverses sixty times a second. An inverter has only a DC rail and some switches, and a switch is either on or off. So how do you build a smooth curve out of that?`
  },

  routes: [
    { id: 'analogy', body: `Bending a paperclip. Gentle bends, and it takes thousands; bend it hard to its limit each time and it snaps in five. No metal has been consumed — it has been fatigued, and how far you bent it is almost the whole story. Depth of discharge is how far you bend the cell, and the middle of the range is the gentle bend.` },
    { id: 'object', body: `A laptop left permanently plugged in on a desk is this lesson's worst case: held at 100% for years, warmed by the machine underneath it. That is maximum calendar ageing, which is why swollen laptop batteries are so common and why modern laptops quietly hold the charge near 80% when they notice you never unplug. The swelling itself is gas from the electrolyte breaking down, which is the same reactions running too long.` },
    { id: 'story', body: `Early electric cars took the obvious approach of using the whole battery, and their packs aged alarmingly. Modern ones hide a buffer at both ends — what the car shows as 0% is perhaps 8% real, and 100% may be 92% — so the user never reaches the damaging extremes at all. You are being protected from a tempting mistake by a number that is quietly lying to you, and the warranty depends on it.` },
    { id: 'experiment', body: `Watch the charging rate on a phone or car. From 20 to 80% it charges fast; above that it slows dramatically, and the last few per cent can take as long as the first half. Nothing has run out of power — the charger is deliberately backing off because fast charging into a nearly full cell is exactly the condition that plates lithium as metal. You are watching damage limitation in real time.` },
    { id: 'smaller', body: `Forget mechanisms. Two sentences: a battery is damaged most when it is nearly full or nearly empty, so staying in the middle makes it last far longer. And heat damages it whether or not you are using it, which is why a hot car is the worst place to leave anything with a battery in it.` },
    { id: 'backward', body: `Start from the warranty on an electric car: so many years **or** so many miles, whichever comes first. Why would a battery need a time limit at all if it is only wearing out from use? Because it is not only wearing out from use. Work backwards from that "or" and you arrive at calendar ageing, and at the fact that a parked car's battery is quietly getting older too.` }
  ],

  map: [
    { name: `Batteries`, level: 5 },
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
