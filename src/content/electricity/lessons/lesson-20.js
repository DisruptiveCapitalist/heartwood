// Electricity & Energy · Week 4 · Lesson 20 — the panel's best moment.
//
// Measured off the simulation, one 402 W panel:
//
//   short circuit   13.7 A at  0.0 V  =   0 W
//   open circuit     0.0 A at 37.4 V  =   0 W
//   the knee        13.1 A at 30.8 V  = 402 W      fill factor 78%
//
// Both ends of the curve are worth precisely nothing, which is the observation
// the lesson is built on. A panel does not have an output; it has a curve, and
// every point on it is a different bargain between volts and amps.
//
// The two controls move the curve in two different directions, and that is the
// part worth seeing:
//
//   1,000 W/m² at 25 °C →  402 W     the label on the back
//   1,000 W/m² at 65 °C →  339 W     a real roof in summer, 16% down
//     600 W/m² at 40 °C →  234 W
//     200 W/m² at 30 °C →   84 W
//
// Light raises the curve — current follows the sun almost exactly. Heat narrows
// it — voltage falls 0.29% per degree. So the best day for a panel is bright
// and COLD, and the rating on the back is measured at 25 °C, which a roof in
// sunshine essentially never is.
//
// All of this sets up Lesson 21: the knee moves all day, so something has to
// keep finding it.

export default {
  id: 'lesson-20',
  number: 5,
  week: 4,
  title: `The panel's best moment`,
  openingQuestion: `Short-circuit a solar panel in full sun and it delivers 13.7 amps — its absolute maximum current — at zero volts, which is zero watts. Leave it open-circuited and it sits at 37.4 volts, its absolute maximum, with no current at all, which is also zero watts. Both extremes are worthless. So what, exactly, is a panel's output?`,
  concept: `One point on a curve`,

  see: {
    voice: 'professor',
    line: `{name}, slide the working voltage from one end to the other and watch the wattage. Then press FIND THE KNEE, and then warm the panel up to 65°.`,
    simulation: { id: 'iv-curve' },
    observations: [
      { text: `**Both ends of the curve are worth nothing.** 13.7 A at 0 V is zero watts; 37.4 V at 0 A is zero watts. Everything useful happens between them.` },
      { text: `The best point is the **knee** — 30.8 V at 13.1 A, which is 402 watts. Drift away from it and the power falls off on both sides, fast.` },
      { text: `**Light and heat move the curve in different directions.** More sun raises the current; more heat shrinks the voltage. A 65° roof costs 16% — a 402 W panel makes 339.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one changes what you think a panel is.`,
    sentences: [
      `A panel has **no single output**. It has a curve of every possible combination of volts and amps it could deliver, and what you actually get depends entirely on what is connected to it. Demand too much current and the voltage collapses; demand too much voltage and the current vanishes. The load is not a passive recipient — it chooses the operating point.`,
      `Somewhere on that curve is the **knee**, the one point where volts times amps is largest. It is not in the middle, and it is not obvious from looking at the panel. For this one it is 30.8 V and 13.1 A, and working anywhere else means leaving watts on the roof that the sunlight already paid for.`,
      `And the knee **moves**. Sunlight sets the current, so a passing cloud drops the whole curve; temperature sets the voltage, so a hot roof squeezes it sideways. The knee at nine in the morning is not the knee at two in the afternoon, which means finding it once is useless. It has to be found continuously — and that is tomorrow.`
    ],
    sequence: {
      label: `WHY THE NUMBER ON THE BACK IS NOT WHAT YOU GET`,
      note: `start from the label and subtract the real world`,
      steps: [
        { name: `The label says 402 W`, body: `Measured at **standard test conditions**: 1,000 W/m², cell at 25 °C, a defined spectrum. Every panel on earth is rated this way so they can be compared.` },
        { name: `A real roof is not 25 °C`, body: `A panel in full sun runs 25 to 35 degrees above the air around it. On a warm day the cells are at 60 or 65, and at 65 the same panel makes 339 W.` },
        { name: `That is 16% gone`, body: `Not a defect and not degradation — simply the temperature coefficient doing what it always does. It is why the same array makes more on a cold bright April day than in a July heatwave.` },
        { name: `The sun is rarely at 1,000`, body: `That figure is clear midday overhead sun. Morning, evening, haze and angle all reduce it, and irradiance drives current almost proportionally.` },
        { name: `Then dirt, wiring and the inverter`, body: `A few per cent for soiling, about one per cent in the cable from Lesson 19, and two or three per cent in the inverter converting to AC.` },
        { name: `So panels are also rated at NOCT`, body: `A second figure measured at a realistic 45 °C cell temperature, which is the honest number — and it is printed on the back beside the headline one, in smaller type.` }
      ]
    },
    comparison: {
      label: `CYCLING UP A HILL IN THE WRONG GEAR`,
      body: `Your legs have a speed at which they deliver the most power — not spinning frantically against no resistance, and not straining at almost a standstill, but somewhere in between. On a hill in too high a gear you are pushing enormously hard and barely moving: all force, no speed, very little power, and you will hurt yourself. In too low a gear your legs whirl uselessly: all speed, no force, also very little power. The gear is what matches your legs to the hill, and the right one puts you at your own knee. A solar panel has exactly this curve, and whatever is connected to it is choosing its gear. *Where the analogy stops:* a cyclist feels immediately when the gear is wrong and changes it. A panel feels nothing, complains about nothing, and will sit at a terrible operating point all day in full sunshine, producing a fraction of what it could, with no outward sign that anything is wrong at all.`
    },
    naming: `The curve itself is the **I-V curve**, and the best point on it is the **maximum power point**, usually written **MPP**. Its coordinates have names on every datasheet: **Vmp** and **Imp**, alongside the two extremes **Voc** (open-circuit voltage) and **Isc** (short-circuit current). How square the curve is — how close Vmp × Imp gets to Voc × Isc — is the **fill factor**, and 75 to 80% is normal for a good panel. The rating conditions are **STC**, standard test conditions, and the more realistic second rating is **NOCT**. One honest note: a short-circuited panel is not being damaged, which surprises people. It simply sits at its maximum current, which it is built to carry, and gets slightly warm. A panel is one of the few power sources you can safely short — unlike the battery in tomorrow's week.`,
    formalNames: {
      terms: [
        { term: `I-V curve`, meaning: `Every combination of current and voltage a panel could deliver. What you actually get depends on what is connected to it.` },
        { term: `Maximum power point`, meaning: `The knee — the one point where volts times amps is greatest. 30.8 V and 13.1 A for this panel, and it moves all day.` },
        { term: `Fill factor`, meaning: `How square the curve is: the knee's power divided by Voc × Isc. 75–80% for a good panel, and a direct measure of quality.` },
        { term: `STC and NOCT`, meaning: `The headline rating at an unrealistic 25 °C, and the honest one at 45 °C. Both are printed on the back of every panel.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've noticed.`,
    items: [
      `A solar array producing more on a cold bright day than a hot one.`,
      `Gears on a bicycle, and the feeling of being in the wrong one.`,
      `A phone that charges slower when it is hot.`,
      `A panel's specification sticker with a dozen numbers on it.`,
      `An inverter display showing watts rising and falling with cloud.`,
      `Panels mounted on a frame with a gap beneath them.`
    ],
    builder: {
      body: `The gap under the panels is this lesson built into the hardware, and you can see it from the ground on almost any roof. Panels are mounted on rails standing a few inches proud of the tiles, and that gap is not for the fixings — it is to let air move underneath and carry heat away. A panel laid flat against a roof, or built into one, runs considerably hotter and makes measurably less, which is why building-integrated solar roof tiles have always had to accept a yield penalty for looking better. If you ever see two arrays on the same street, one on rails and one flush, you are looking at a few per cent of output traded for appearance.`
    },
    ownPlaceholder: `Something where performance depended on the conditions, not the equipment…`,
    synthesis: `That gap is a nice reminder of where this week has got to. Three weeks ago a roof array was a flat blue rectangle. Now the mounting height, the seam across the middle, the silver lines, the junction box and the string length are all legible — and each one is an answer to a specific problem in a specific lesson.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why a solar panel short-circuited in full sun produces no power at all — **without using the words "curve" or "voltage."**`,
    banned: ['curve', 'voltage'],
    bannedNote: `one of those came back — and push and flow will carry it`,
    placeholder: `If you join the two wires together, a lot flows, but there's no…`,
    checks: [
      `Joining the two wires lets the most possible flow, but there is no push left across them.`,
      `Leaving the wires unjoined gives the most push, but nothing is flowing.`,
      `Power needs both at once, so both extremes deliver nothing.`,
      `There is one setting in between where the two multiply to the most, and that is the best a panel can do.`
    ],
    closing: `If your version has "you need both at once," you have the whole of it — and you also know why a panel needs something clever connected to it rather than just a wire.`
  },

  challenge: {
    voice: 'editor',
    line: `One about the best weather for solar, and one about a design decision that looks like a mistake.`,
    prediction: {
      question: `Your array's single best hour of the year — most watts, not most hours of sun. What weather is it?`,
      options: [
        {
          id: 'coldbright',
          text: `Clear, bright, and cold.`,
          verdict: `Correct, and it is why solar works far better in cold climates than people assume. Irradiance sets the current and temperature sets the voltage, so you want all the light you can get and none of the heat that normally comes with it. A crisp, clear winter or early-spring day with snow on the ground reflecting extra light upward is close to ideal — arrays genuinely do produce above their rated output in those conditions. Germany and Britain have far more solar than their reputation for sunshine suggests, and this is part of the reason.`
        },
        {
          id: 'hotsunny',
          text: `The hottest, sunniest day of summer.`,
          verdict: `This is the intuitive answer and it is wrong by about 16%. The sunlight is certainly at its strongest, and that genuinely does give you the current. But the same sun has the cells at 60 or 65 °C, and every degree above 25 costs about 0.29% of the voltage — so the 402 W panel is making 339 W. A July heatwave is good for your total **annual** output because the days are long, but the single best **hour** is cold and bright, not hot and bright.`
        },
        {
          id: 'brightcloud',
          text: `Bright overcast, so light comes from the whole sky at once.`,
          verdict: `There is something real in this: diffuse light from the whole sky hits a tilted panel more evenly than a low sun does, and panels do keep working under cloud — which is why they are worth fitting in cloudy countries at all. But bright overcast still delivers only 200 to 400 W/m² against the 1,000 of clear sun, and current follows irradiance almost proportionally. You gain a little on geometry and lose far more on quantity. The one exception is the brief edge-of-cloud effect, when a panel can momentarily exceed its rating.`
        }
      ]
    },
    open: {
      question: `Many solar installations are deliberately fitted with **more** panel capacity than the inverter can handle — say 6 kW of panels on a 5 kW inverter, so that on the brightest days some output is deliberately thrown away. Why would anyone design a system that way on purpose?`,
      placeholder: `Perhaps the panels rarely reach their rating anyway…`,
      reveal: [
        `Because everything in this lesson says those 6 kW of panels will almost never deliver 6 kW. The rating is measured at 25 °C in perfect overhead sun; a real roof is hot, the sun is at an angle for most of the day, and there is haze, dirt and cloud. An array rated at 6 kW might reach 4.5 on a good day and touch its rating for a few hours a year. Sizing the inverter for a peak that essentially never arrives means paying for capacity that sits idle every single day.`,
        `So installers **oversize the array** — the ratio is called the DC-to-AC ratio, and 1.2 to 1.3 is routine. The inverter runs closer to its best efficiency for far more of the day, mornings and evenings and cloudy afternoons all produce more, and on the handful of hours when the panels genuinely could exceed the inverter, it simply holds them at its limit. That deliberate waste is called **clipping**, and the energy lost to it over a year is usually smaller than the energy gained everywhere else.`,
        `It is a good note to end the week on, because it is an engineering judgement rather than a physical law — a decision about the shape of a whole year rather than the best case. And it hands straight over to Week 5. The knee moves every few seconds as cloud passes, so something must hunt for it continuously; the sun sets, so something must store what was made; and the house runs on alternating current, so the panel's direct current must be rebuilt into a sine wave. Those three devices are the next week, and you now know exactly what problem each of them was built to solve.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop. End of the week — take a moment with this one.`,
    prompt: `The thing about solar panels I understand best now, and the one I'd still like to see for myself:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Twenty lessons. Two thirds of the way, and a roof array is no longer a blue rectangle.`,
    tomorrow: `Next week, Lesson 21 — the knee moves every few seconds as cloud crosses the roof, and something has to chase it. Then the battery, why batteries wear out, the inverter that rebuilds a sine wave from nothing, and the three-phase supply that runs a workshop.`
  },

  routes: [
    { id: 'analogy', body: `Pushing a child on a swing. Push too early and you fight the swing coming back; push too late and you have missed it. There is one moment in each cycle when your effort does the most good, and the same push delivered at the wrong moment achieves almost nothing. A panel has the electrical version of that moment, except it lasts all day and quietly moves.` },
    { id: 'object', body: `A bicycle with gears is the closest everyday object. The hill is the load, your legs are the panel, and the gear decides where on your own power curve you are working. Too high and you strain and crawl; too low and you spin and go nowhere. A panel connected straight to a battery is a bicycle with one fixed gear, which is why nobody does that any more — the gear is right twice a day and wrong the rest of the time.` },
    { id: 'story', body: `The I-V curve is why early solar installations wasted so much. Panels were often wired directly to a battery, which pinned the panel to the battery's voltage — typically around 13 volts for a 12 V system — regardless of where the knee actually was. A panel whose best point was 17 volts spent its whole life working at 13, losing a quarter or more of its output. Electronic tracking arrived in the 1980s and recovered it, which is tomorrow's lesson.` },
    { id: 'experiment', body: `Put a multimeter across a small solar panel in sun with nothing connected: you will read its open-circuit voltage. Now set the meter to measure current and put it straight across the terminals — that is a short circuit, and you will read the short-circuit current. Both readings are impressive and both represent zero watts. Then connect a small motor or lamp and measure both at once; the product is what you are actually getting, and it will be well under the product of the two extremes.` },
    { id: 'smaller', body: `Forget fill factors and ratings. Two sentences: a panel can give you lots of flow with no push, or lots of push with no flow, and neither is any use. Somewhere in between is one setting where the two multiply to the biggest number, and all the cleverness in a solar system is about sitting on that setting.` },
    { id: 'backward', body: `Start from a fact on the back of every panel: two different power ratings are printed there, one at 25 °C and a lower one at 45 °C. Why would a manufacturer advertise two figures, one of which undercuts their own headline? Because the honest one depends on conditions they cannot control, and the comparable one depends on conditions that never occur. Work backwards from those two numbers and you arrive at a device whose output is a curve rather than a value.` }
  ],

  map: [
    { name: `Solar panels`, level: 5 },
    { name: `Sunlight to electricity`, level: 5 },
    { name: `Semiconductors`, level: 4 },
    { name: `Series`, level: 5 },
    { name: `The grid`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
