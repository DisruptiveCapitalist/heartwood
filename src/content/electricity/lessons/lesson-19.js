// Electricity & Energy · Week 4 · Lesson 19 — in a row, or side by side.
//
// Measured off the simulation. Eight 402 W panels, 3.22 kW either way, on a
// 20 m run of 4 mm² copper there and back — 0.168 ohms:
//
//   in series    246 V at 13.1 A    29 W lost in the cable   (0.9%)
//   in parallel   31 V at 104.6 A   1,838 W lost             (57.1%)
//
// Identical panels, identical sunlight, identical watts generated, and one
// arrangement throws away more than half of it before it reaches the house.
// This is Lesson 5 and Lesson 9 for the third time: the heat is I²R, so the
// penalty falls on the square of the current.
//
// The second number worth having is the one that sets string length, and it is
// not the hot day — it is the cold one. Voc rises as the cell gets colder, by
// 0.29% per degree, so at -10 °C each panel gives 41.2 V instead of 37.4:
//
//   14 in series → 577 V on a freezing morning   — inside a 600 V inverter
//   15 in series → 618 V                          — over the limit, in January
//
// A string sized on a summer afternoon will destroy the inverter on the first
// clear winter morning, which is a real and common failure.

export default {
  id: 'lesson-19',
  number: 4,
  week: 4,
  title: `Panels in a row, panels side by side`,
  openingQuestion: `Eight panels on a roof, each making 402 watts. You can wire them in one long chain or all side by side, and either way they generate exactly 3.22 kilowatts — the sunlight does not care how you connected them. But by the time that power reaches the house, one arrangement has delivered almost all of it and the other has lost more than half. Why?`,
  concept: `Same watts, different current`,

  see: {
    voice: 'professor',
    line: `{name}, eight panels, in series. Read the cable loss. Now switch to parallel and read it again.`,
    simulation: { id: 'panel-array', props: { mode: 'wiring' } },
    observations: [
      { text: `**In series: 246 volts at 13.1 amps.** Voltage adds, current does not. Twenty metres of ordinary cable loses 29 watts of the 3,218 — under one per cent.` },
      { text: `**In parallel: 31 volts at 104.6 amps.** The same 3.22 kW, and the same cable now loses **1,838 watts** — 57% of everything the roof made.` },
      { text: `Push the string past about **fourteen panels** and a freezing morning takes it over the inverter's 600 V limit. The length of a string is set by the **coldest** day, not the hottest.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and you have met the first two before — in Week 1 and again in Week 2.`,
    sentences: [
      `Wire sources **in series** and their voltages add while the current stays as one panel's. Wire them **in parallel** and the currents add while the voltage stays as one panel's. Either way the power is the same, because power is the product — this is the transformer's trade from Lesson 9, made with wiring instead of coils.`,
      `But the **loss in the cable is not the same**, because heat in a wire is the current squared times the resistance. Eight times the current is sixty-four times the loss. That single square decided the layout of the national grid in Week 2, and it decides the wiring of a domestic roof in exactly the same way and for exactly the same reason.`,
      `So panels go in long series strings — and the limit on how long is **cold weather**. A cell's voltage rises as it gets colder, about 0.29% per degree, so a string sized comfortably on a summer afternoon can exceed the inverter's maximum on a clear January morning. The string is designed for the coldest hour of the year, not the sunniest.`
    ],
    sequence: {
      label: `HOW AN INSTALLER ACTUALLY PICKS A STRING LENGTH`,
      note: `two limits, from opposite ends of the year`,
      steps: [
        { name: `Find the inverter's window`, body: `A typical one works between about 200 and 600 volts, and will not start below the bottom of that range or survive above the top of it.` },
        { name: `The cold limit comes first`, body: `On the coldest expected morning each panel gives 41.2 V rather than 37.4. Divide 600 by 41.2 and you get 14 panels — the absolute maximum in one string.` },
        { name: `Check the hot limit`, body: `On a 65 °C roof each panel works at about 26 V, so 14 panels give 370 V. Comfortably inside the window, so the string still produces on the worst summer day.` },
        { name: `Check the string will start`, body: `Too few panels and a winter afternoon never reaches 200 V, so the inverter sits idle while the sun is shining. Two panels would give 62 V and never wake it up.` },
        { name: `Make the strings equal`, body: `Two strings into one input must match in length and ideally in orientation, or the shorter one drags the pair to a compromise voltage that suits neither.` },
        { name: `Then size the cable`, body: `At 13 amps the loss is under one per cent on ordinary cable. Having chosen high voltage, the wiring becomes the easy part — which was the entire point.` }
      ]
    },
    comparison: {
      label: `A BUCKET BRIGADE, OR A VERY TALL LADDER`,
      body: `Moving water to the top of a building, you could have a hundred people each carrying one bucket up a shallow ramp, or one pump pushing a thin column up a tall pipe. The same water arrives either way. But a hundred people need a hundred-person-wide ramp, and the thin pipe needs very little — the width of what you must build depends on how many things are moving at once, not on how much work is being done. Cable is the ramp. Current is the number of carriers. Choosing high voltage is choosing to send the same energy as fewer, harder-working units, so the path they travel can be slim and cheap. *Where the analogy stops:* widening a ramp costs money and no more, while the penalty in a cable is a **square** — double the current and you do not double the waste, you quadruple it. Nothing about carrying buckets punishes you that steeply, and it is why the real answer is so lopsided.`
    },
    naming: `A run of panels in series is a **string**, and the voltage range an inverter can work across is its **MPPT window** — the name will make sense after Lesson 21. The highest voltage it can survive is its **maximum system voltage**, usually 600 V on domestic equipment in North America and 1,000 or 1,500 V on commercial systems. The rise of voltage in the cold is the **temperature coefficient of Voc**, and the calculation installers do with it is **string sizing**. One honest note: the real sum uses the record low temperature for the site, not the typical winter minimum, because the inverter has to survive the worst morning in its twenty-five-year life and not the average one. Get it wrong and the failure arrives years later, on one unusually cold, bright day.`,
    formalNames: {
      terms: [
        { term: `String`, meaning: `Panels wired in series so their voltages add. The standard arrangement, because high voltage means low current means thin cable.` },
        { term: `MPPT window`, meaning: `The voltage range an inverter can work across, typically 200–600 V domestically. Too low and it will not start; too high and it is destroyed.` },
        { term: `String sizing`, meaning: `Choosing how many panels go in a string. Set by the coldest expected morning, when panel voltage is at its highest.` },
        { term: `Temperature coefficient`, meaning: `How much voltage changes with cell temperature — about −0.29% per °C. Negative, so cold panels make more volts and hot ones make fewer.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've seen.`,
    items: [
      `Batteries end to end in a torch, rather than side by side.`,
      `Thick heavy cables on a car battery and thin ones on the lights.`,
      `Warning labels on a roof array about high DC voltage.`,
      `An inverter box on a garage wall with a big isolator switch.`,
      `Jump leads that are noticeably thick for only 12 volts.`,
      `A solar array that produces nothing on a dull winter afternoon.`
    ],
    builder: {
      body: `The jump leads are the best object here and they are probably in a car near you. They are enormously thick — far thicker than the house wiring that carries the same power at 120 volts — and the reason is on this page. A car's starter motor needs a lot of power from only 12 volts, and low voltage with high power means an enormous current, several hundred amps. At that current even a few milliohms of cable matters, so the copper has to be huge. Compare them with the thin cable feeding a 1,500 W hairdryer at 120 V. Same sort of power, a tenth of the current, a fraction of the copper. Thickness is a readout of current, and current is a readout of the voltage somebody chose.`
    },
    ownPlaceholder: `Somewhere I've noticed surprisingly thick or thin cable…`,
    synthesis: `That comparison is the whole week's economics in two objects. Nobody chooses a voltage because it is convenient; they choose it because the cable it implies is affordable. Roofs, cars and the national grid all made the same calculation at wildly different scales.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why solar panels are wired in long chains rather than side by side — **without using the words "series" or "squared."**`,
    banned: ['series', 'squared'],
    bannedNote: `one of those came back — and the argument runs on push, flow and heat`,
    placeholder: `Wiring them one after another makes the push bigger, and then…`,
    checks: [
      `Wiring them one after another adds up the push, while the flow stays as one panel's.`,
      `Wiring them side by side adds up the flow instead, and the push stays small.`,
      `The same power arrives either way, but a big flow heats the cable badly.`,
      `And the heating rises far faster than the flow does, so a small flow is worth a lot.`
    ],
    closing: `If your version has "the heating gets much worse much faster," you have the reason — and it is the third week running that one fact has decided how something is built.`
  },

  challenge: {
    voice: 'editor',
    line: `One about when a string fails, and one about why anything is ever wired in parallel.`,
    prediction: {
      question: `A string of fourteen panels is sized to stay under the inverter's 600 V limit. On which day is it **most** likely to exceed it?`,
      options: [
        {
          id: 'cold',
          text: `A freezing, bright winter morning.`,
          verdict: `Correct, and it is the one that catches people out because it feels backwards. Panel voltage rises as the cell gets colder — about 0.29% per degree — so the dangerous condition is cold **and** sunny, not hot and sunny. At −10 °C each panel gives 41.2 V instead of 37.4, and fourteen of them make 577 V where the same string made 524 V at room temperature. The worst moment of all is a clear, freezing morning just as the sun hits panels that have been radiating heat to the night sky all night, because they are briefly colder than the air around them.`
        },
        {
          id: 'hot',
          text: `The hottest, sunniest day of summer.`,
          verdict: `This is what almost everyone says, and it is the reverse of the truth. Heat is certainly when a panel is working hardest in the sense of absorbing the most energy, but it is when its **voltage is lowest** — on a 65 °C roof the same fourteen panels manage only about 370 V. The summer risk is to output, not to the inverter; you lose roughly 16% of the power and nothing is endangered. The voltage risk belongs entirely to winter.`
        },
        {
          id: 'cloudy',
          text: `A bright but cloudy day, when light comes from the whole sky.`,
          verdict: `There is a real effect hiding in this answer — edge-of-cloud brightening can briefly push irradiance above 1,000 W/m², and arrays do occasionally produce more than their rated output for a few minutes. But irradiance mostly drives **current**, not voltage. A panel reaches almost its full open-circuit voltage in quite modest light, and then brightening adds amps rather than volts. To push the voltage up you must cool the cells, not light them harder.`
        }
      ]
    },
    open: {
      question: `If series wiring is so clearly better, why is anything in a solar array ever wired in parallel — and why does a large roof have several strings rather than one enormous one?`,
      placeholder: `Perhaps there's a limit to how long a string can be…`,
      reveal: [
        `Because the series argument runs into the ceiling from today's third sentence. You cannot keep adding panels to raise the voltage, because the inverter has a maximum it will survive — 600 V domestically, and the cold-morning calculation caps a string at about fourteen panels. A twenty-four panel roof therefore **must** be more than one string, and those strings are joined in parallel. Parallel is not avoided; it is used once the voltage is already as high as it is allowed to be.`,
        `There is a second reason, which is yesterday's lesson. Strings are independent, so a shadow that ruins one string leaves the others working. Splitting a roof into several strings by orientation — one facing south-east, another south-west — also lets each work at its own best voltage, since a string that mixes orientations is permanently compromised to a value that suits neither half.`,
        `So the real rule is not "series is better" but something more useful: **raise the voltage until you hit a limit, then widen.** The limit is set by insulation and safety, not by physics — the grid does exactly the same thing at 400,000 volts, and a car does it at 12 because the hazard of anything higher around untrained hands is not worth the copper saved. Tomorrow is the last of the week, and it asks a question we have been avoiding: a panel does not have an output at all. It has a curve, and only one point on that curve is worth having.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about how panels are wired together that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 20 — the last of the week. A panel short-circuited makes 13.7 amps and zero watts. Open-circuited it makes 37.4 volts and zero watts. Everything useful happens at one point in between, and finding it is worth a quarter of the output.`
  },

  routes: [
    { id: 'analogy', body: `Moving a tonne of bricks up a hill. You can send a thousand people each carrying one, or ten people each carrying a hundred. The same tonne arrives — but the thousand need a road wide enough for a thousand, and the road is what you have to pay for. Current is how many are walking; voltage is how much each carries. The cable is the road, and its cost rises far faster than the traffic does.` },
    { id: 'object', body: `Look at a torch that takes two or three batteries end to end. They are in series, and the reason is that the bulb needs more push than one cell can give — 1.5 volts would barely glow. Now notice that nobody builds a torch with its batteries side by side, because that would give the same 1.5 volts and merely last longer. Series for push, parallel for endurance, and a roof wants push.` },
    { id: 'story', body: `The limit of 600 volts on domestic arrays in North America is not a physics boundary — it is an electrical-code decision about what is safe around a building and the people who maintain it. Commercial installations are permitted 1,000 and now 1,500 volts, which is why utility-scale solar farms use far longer strings and proportionately less copper. The same panels, the same physics, and a different answer because the rules about who might touch it are different.` },
    { id: 'experiment', body: `Take two identical batteries and a multimeter. Measure one: about 1.5 volts. Now hold them end to end, positive to negative, and measure across the pair: about 3 volts. Now hold them side by side, both positives together, and measure: back to 1.5 volts. You have just done the whole of today's first sentence with two AAs, and the panels on a roof are doing precisely this fifty-four times inside each panel and fourteen times along the row.` },
    { id: 'smaller', body: `Forget strings, windows and coefficients. Two sentences: joining panels end to end makes the push bigger while the flow stays small, and a small flow barely heats the cable. Joining them side by side makes the flow enormous, and the cable gets hot enough to waste more than half of what the roof made.` },
    { id: 'backward', body: `Start from the warning labels on a roof array, which talk about hundreds of volts of direct current and tell firefighters that switching off the inverter does not make the roof safe. Why would anyone put that hazard on a house? Nobody wanted to — they wanted thin cable. Work backwards from the label and you arrive at the square on the current, and the fact that the alternative was throwing away half the output.` }
  ],

  map: [
    { name: `Solar panels`, level: 4 },
    { name: `Series`, level: 5 },
    { name: `Semiconductors`, level: 4 },
    { name: `Sunlight to electricity`, level: 4 },
    { name: `Resistance`, level: 5 },
    { name: `The grid`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
