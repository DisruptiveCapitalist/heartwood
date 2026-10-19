// Electricity & Energy · Week 2 · Lesson 6 — a rate, and an amount.
//
// Measured off the simulation before the copy: a 2,000 W kettle for three
// minutes is 0.100 kWh; a 9 W bulb left on all evening is 0.090. Almost the
// same, from the appliance everybody worries about and the one nobody thinks
// about. The old 60 W bulb over that evening is 0.600 — six times the kettle.
//
// Week 1 established power as volts times amps. This lesson is what happens
// when you multiply that by time, which is the only quantity anyone is billed
// for and the one most people have never separated from the rating on the box.

export default {
  id: 'lesson-06',
  number: 1,
  week: 2,
  title: `What the electric bill actually counts`,
  openingQuestion: `The kettle is the thing people worry about — two thousand watts, an alarming number, boiling away in the corner. The lamp in the hall is nine. So the kettle must be the expensive one. Except that your bill has never once counted watts, and the number it does count makes those two things almost identical.`,
  concept: `A rate, and an amount`,

  see: {
    voice: 'professor',
    line: `{name}, tap the kettle. Then tap the LED bulb left on all evening, and put the two bars side by side.`,
    simulation: { id: 'power-use' },
    observations: [
      { text: `The kettle for three minutes: **0.100**. The LED bulb left on all evening: **0.090**. Near enough the same, and nobody would have guessed it.` },
      { text: `The old-style bulb over that same evening: **0.600** — six times the kettle, from a thing rated at one-thirtieth of its power.` },
      { text: `So the bill does not count watts. It counts watts **multiplied by hours** — and a large number used briefly can cost less than a small one left on.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first is a distinction that is doing all the work.`,
    sentences: [
      `**Power** is a rate — how fast energy is being used, this second. That is what watts measure, and it is what is printed on the appliance. **Energy** is the amount that actually got used, and it is the only thing anyone charges for.`,
      `Energy is power **times time**. A kilowatt-hour is a thousand watts kept up for one hour, and it is the unit on every bill — the "unit" that the price per unit refers to.`,
      `So two things set a cost: **how hard, and how long**. People watch the first because it is printed on the box, and are caught by the second because nothing announces it.`
    ],
    sequence: {
      label: `FROM A LABEL TO A BILL`,
      note: `and the arithmetic is genuinely this simple`,
      steps: [
        { name: `Watts`, body: `The rate, printed on the appliance. 2,000 W means two thousand joules of energy every second it is running.` },
        { name: `× hours`, body: `How long it actually ran — not how long you own it. This is the number nothing tells you and that you have to know yourself.` },
        { name: `= watt-hours`, body: `The amount used. 2,000 W for 3 minutes is 2,000 × 0.05 = 100 watt-hours.` },
        { name: `÷ 1,000 = kWh`, body: `A kilowatt-hour is simply a thousand watt-hours. The kettle's three minutes come to 0.1 of one.` },
        { name: `× the price`, body: `At around 17 cents a unit, that is under two cents. The heater running three hours, at 4.5 units, is about seventy-five.` }
      ]
    },
    comparison: {
      label: `THE TAP AND THE WATER BILL`,
      body: `A tap has a flow rate — litres a minute — and the water company has never once charged anybody for it. They charge for litres. A powerful tap opened for ten seconds delivers less than a dribbling one left running overnight, and nobody finds that confusing when it is water. Watts are the flow rate. Kilowatt-hours are the litres. *Where the analogy stops:* you can see a bath filling. Nothing in your house shows you energy accumulating, which is exactly why the rating on the box ends up standing in for a cost it does not determine.`
    },
    naming: `The rate is measured in **watts**, and one watt is one **joule** of energy every second — so a watt already has a "per second" hidden inside it, which is the source of most of the confusion. The amount is measured in **kilowatt-hours**, and one of those is 3.6 million joules. On a bill, a **unit** means a kilowatt-hour. And Week 1's arithmetic still holds underneath all of it: power is volts times amps, so a 2,000 W kettle on a 120-volt supply is pulling nearly 17 amps — which is why kettles and heaters are the appliances that trip things.`,
    formalNames: {
      terms: [
        { term: `Watt`, meaning: `A rate: one joule of energy per second. What is printed on an appliance, and never what you are charged for.` },
        { term: `Kilowatt-hour`, meaning: `A thousand watts kept up for an hour. The unit on your bill, and the only quantity that costs money.` },
        { term: `Power and energy`, meaning: `Power is how fast; energy is how much. Confusing them is why a kettle feels expensive and a forgotten light feels free.` },
        { term: `Duty cycle`, meaning: `The share of time something actually runs. A fridge rated at 150 W runs about a third of the time — so the rating alone overstates it threefold.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've thought about.`,
    items: [
      `Unplugging chargers and devices to save money.`,
      `A bill that climbed in winter and nobody could say why.`,
      `A smart meter showing a number that jumps when the kettle goes on.`,
      `Being told to switch lights off in empty rooms.`,
      `Changing to LED bulbs and wondering if it was worth it.`,
      `An electric heater used in one cold room.`
    ],
    builder: {
      body: `Go around the house and write down the wattage printed on five things — it is on a label, often underneath or on the back. Then write beside each one how many hours a day it really runs. Multiply, divide by a thousand, and you have that appliance's daily units. Do the kettle, a lamp, the television and a heater if you have one, and the ranking will almost certainly surprise you. The thing worth noticing is not any individual answer but which column mattered: in most households the ranking is set by the hours, not by the watts.`
    },
    ownPlaceholder: `Something I've wondered about on my bill…`,
    synthesis: `The LED question has a clean answer now. Nine watts against sixty, over the same hours, is a saving of about 85% on that bulb's share — and the share itself depends entirely on how long it is on, which is why the kitchen matters and the attic does not.`
  },

  feynman: {
    line: `Your turn to teach it.`,
    instruction: `Explain to a friend why boiling a kettle can cost less than leaving a lamp on all evening — **without using the words "watt" or "kilowatt."**`,
    banned: ['watt'],
    bannedNote: `that word came back — and the idea is about rate against total, not about units`,
    placeholder: `One of them uses energy fast but only for a moment…`,
    checks: [
      `The number on an appliance is how fast it uses energy, not how much.`,
      `What gets charged for is the total amount used.`,
      `The total is how fast, multiplied by how long.`,
      `So something fast for a moment can total less than something slow left running.`
    ],
    closing: `If your version has "multiplied by how long" in it, you can read any appliance label and estimate what it costs you — which is more than most people can do with their own bill.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a habit, and one about a strange unit.`,
    prediction: {
      question: `Unplugging phone chargers and small devices when they are not in use. Does it save a meaningful amount?`,
      options: [
        {
          id: 'yes',
          text: `Yes — things left plugged in draw power constantly, and it adds up.`,
          verdict: `The premise is true, which is why the advice persists: a charger left in the wall does draw a trickle. But run the numbers, because that is what this lesson is for. A modern charger idles at well under half a watt. Left plugged in all year that is perhaps four units — under a dollar. It is not nothing, and it is nothing like the heating.`
        },
        {
          id: 'tiny',
          text: `A real saving, but a tiny one — and far smaller than people assume.`,
          verdict: `Right, and worth being precise about rather than dismissive. Standby draw was genuinely significant twenty years ago, when a television could idle at ten or fifteen watts; regulations and better design have cut it enormously. What has not changed is where household energy actually goes, which is overwhelmingly heating — of rooms, of water, of food. A habit that saves a dollar a year is fine; it is just not the lever anyone thinks it is.`
        },
        {
          id: 'no',
          text: `No — devices that are switched off draw nothing at all.`,
          verdict: `Not quite, and the exception is interesting. Anything with a remote control, a clock, a standby light or a charger block is drawing something, because it has to stay awake enough to notice you. What it draws is now very small. A device with a genuine mechanical switch, on the other hand, really does draw nothing — which is why old appliances with a hard click are in a different category from modern ones.`
        }
      ]
    },
    open: {
      question: `A **kilowatt-hour** is a very odd-looking unit — a rate multiplied by a time. Why would anybody measure energy that way, rather than in a straightforward unit of energy?`,
      placeholder: `Maybe because of what you actually have to hand…`,
      reveal: [
        `Because it is energy — just written in the form you can actually compute. The proper unit is the **joule**, and a kilowatt-hour is 3,600,000 of them. Nobody wants to read a bill in millions, and more importantly nobody has a joule meter in their hand. What you have is a label saying 2,000 W and a clock saying three minutes, and multiplying those two is the only route from what you know to what you pay.`,
        `So the unit is shaped by the measurement rather than by the physics. The same thing happens elsewhere: a light-year is a time multiplied by a speed, and it is a distance. Units often record how a quantity was arrived at rather than what it fundamentally is.`,
        `There is a practical consequence worth keeping. Because the unit is a product, you can always work backwards. Given any two of rate, time and total, the third follows — so a bill, a meter reading and an appliance label can be checked against each other. Energy is one of the few household quantities where the arithmetic is genuinely within reach, and this lesson's whole purpose is that you can now do it.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 7: what the wall is actually doing. The voltage there reverses a hundred and twenty times a second and reaches about 170 volts — and it is nonetheless correct to call it 120.`
  },

  routes: [
    { id: 'analogy', body: `A car's speedometer and its odometer. One tells you how fast you are going right now; the other tells you how far you have been. Nobody confuses them, and nobody thinks a car that can do 150 has therefore travelled further than one that has been driven every day for ten years. Watts are the speedometer, kilowatt-hours are the odometer, and your bill reads the odometer.` },
    { id: 'object', body: `Turn over almost anything electrical in your house and find the small printed panel: volts, amps or watts, sometimes a frequency. That number is a maximum rate, assumed to be running flat out. Now notice it tells you nothing whatever about how long you use it — which is the other half of every cost, and the half that is nowhere on the label.` },
    { id: 'story', body: `When electricity was first sold, nobody knew how to charge for it. Early schemes billed per lamp, per month — which meant customers left lamps burning, since more hours cost nothing. Metering by energy used arrived within a few years and changed behaviour overnight. The unit of sale shapes what people do, which is why a bill in units rather than watts was itself an invention worth making.` },
    { id: 'experiment', body: `If you have a smart meter or an in-home display, watch it while you put the kettle on. The number leaps — two thousand-odd — and three minutes later it drops back. Now switch on every light in the house and watch it barely move. You have just seen the rate, in real time, for two things whose totals are nothing like their appearances.` },
    { id: 'smaller', body: `Forget electricity. One question: if a tap runs at ten litres a minute and another at one, which has used more water? You cannot answer. You need to know how long each ran, because flow rate alone is not an amount. Now ask which number an appliance's label gives you, and you have the entire lesson.` },
    { id: 'backward', body: `Start with the fact that heating is nearly always the largest item on a household bill, everywhere, regardless of what else people own. Why would that be? Not because heaters are unusually powerful — a kettle beats most of them. Because heating runs for hours on end, every day, for months. Work backwards from "the big item is the long one" and you arrive at time as the dominant factor.` }
  ],

  map: [
    { name: `Power`, level: 4, fresh: true },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Resistance`, level: 4 },
    { name: `Energy (from Physics I)`, level: 5 },
    { name: `A circuit is a loop`, level: 5 },
    { name: `Open and closed circuits`, level: 4 },
    { name: `Ohm's law`, level: 3 },
    { name: `AC and DC`, level: 1, fresh: true },
    { name: `Magnetism`, level: 0 }
  ]
}
