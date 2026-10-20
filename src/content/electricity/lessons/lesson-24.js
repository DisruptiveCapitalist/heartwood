// Electricity & Energy · Week 5 · Lesson 24 — building a sine out of switches.
//
// Measured off the simulation, harmonic distortion over the first forty
// harmonics, computed from the exact waveform drawn on screen:
//
//   square wave        47%     two switches per cycle, and hard on anything with a coil
//   modified sine      30%     four switches, the old car-accessory inverter
//   PWM, unfiltered   0.9%     267 switches — in this band only
//   PWM, filtered        0%     an inductor averages the chopping into a real sine
//
// The PWM row needs its caveat stated rather than hidden, and an earlier draft
// of this file got it wrong. Measured at 2,048 samples the reading came out at
// 4.3%, but that is an artefact: a 267x carrier sampled 2,048 times gives only
// 7.7 points per switching period, so the edges land on the wrong samples and
// manufacture low-order harmonics that are not there. Resolved properly, ideal
// PWM has almost no low-order content at all — 0.9% and still falling with
// resolution. Its real content is up at the carrier, off the chart, and that
// is precisely what the filter exists to remove.
//
// The central idea is that an inverter never produces a smoothly varying
// voltage, because it cannot. It has a DC rail and transistors, and a
// transistor is either on or off. It switches the full rail on and off 267
// times per mains cycle, varying how long it stays on each time so the AVERAGE
// follows a sine. Chopping, not shaping.
//
// 120 V RMS needs a 170 V peak, and the eight-panel string from Lesson 19 sits
// at 246 V. The numbers across this course join up.

export default {
  id: 'lesson-24',
  number: 4,
  week: 5,
  title: `The inverter and the pure sine wave`,
  openingQuestion: `The panel on the roof makes direct current. The battery in the garage makes direct current. Your house wants a smooth sine wave that reverses sixty times a second. Between them sits a box containing a DC rail and some transistors — and a transistor can only be fully on or fully off. How do you build a smooth curve out of a thing with two positions?`,
  concept: `Chopping, not shaping`,

  see: {
    voice: 'professor',
    line: `{name}, step through all four. Watch the red bars at the bottom — those are frequencies nobody asked for.`,
    simulation: { id: 'inverter' },
    observations: [
      { text: `A **square wave** has the right average and the wrong shape: 47% distortion. All those extra frequencies become heat in anything with a coil in it — a motor, a transformer, a fan.` },
      { text: `**Switching 267 times per cycle** and varying the width of each pulse makes the *average* follow a sine. The voltage is still slamming between the rails — nothing smooth has happened yet.` },
      { text: `Then an **inductor averages the chopping out**, and a real sine comes out. The inverter never drew a curve; it chopped a straight line fast enough that the curve emerged.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The first is the one that makes the whole device make sense.`,
    sentences: [
      `A transistor has **two positions**, and no amount of cleverness gives it a third. So an inverter cannot draw a sine wave — it can only connect the DC rail or disconnect it. What it varies is not the voltage but the **timing**: how long it stays on in each tiny slice of time, which near the peak of the wanted sine is almost all of it and near the zero-crossing is almost none.`,
      `That gives a voltage which is wrong at every instant and **right on average**, and averaging is exactly what an inductor does — it resists sudden changes in current, so it smooths a chopped square into the curve those chops were describing. The switching noise left over sits at the chopping frequency, sixteen thousand times a second, far away from the sixty you want and easy to filter out.`,
      `And this matters because **the shape is not cosmetic**. A wave that is not a sine contains extra frequencies, and anything with a coil in it — motors, transformers, fluorescent ballasts — turns those extra frequencies into heat rather than work. A cheap square-wave inverter will run a kettle perfectly and cook a fan motor slowly.`
    ],
    sequence: {
      label: `WHY SWITCHING BEATS ANY OTHER METHOD`,
      note: `the alternative was tried, and the arithmetic is brutal`,
      steps: [
        { name: `You could do it with a resistor`, body: `Vary a resistance continuously and you genuinely get a smooth output. This is how old linear power supplies worked, and it is honest and simple.` },
        { name: `But a resistor burns the difference`, body: `To drop 246 V down to 100 V at 10 amps, the resistance must absorb 1,460 watts as heat. The load gets 1,000 W and you have wasted more than you delivered.` },
        { name: `A switch wastes almost nothing`, body: `Fully on, there is almost no voltage across it, so almost no power. Fully off, there is no current, so again almost none. Waste happens only while changing over.` },
        { name: `So switch fast and average`, body: `Chop at 16 kHz, let an inductor smooth it, and you get the smooth output of the resistor method at 97% efficiency instead of 40%.` },
        { name: `The cost is noise`, body: `Fast switching radiates interference, which is why inverters are in metal boxes with filters on every lead — and why a cheap one makes a radio buzz.` },
        { name: `And a faint whine`, body: `Some switching components move very slightly at the switching frequency. If you can hear an inverter singing, you are hearing its transistors change state thousands of times a second.` }
      ]
    },
    comparison: {
      label: `DIMMING A LAMP BY BLINKING IT`,
      body: `To dim a lamp to half brightness you could put a resistor in series, which works and gets hot — you are paying for the full brightness and throwing half away as heat. Or you could switch the lamp fully on and fully off a thousand times a second, on for half of each cycle. Your eye cannot follow that and reports a lamp at half brightness; the lamp is never actually half lit at any instant. Nothing is wasted, because a switch that is fully on or fully off absorbs almost nothing. This is exactly how an LED dimmer works, and exactly what an inverter does with a sine instead of a constant. *Where the analogy stops:* your eye does the averaging for the lamp, and nothing in the house would do it for a mains supply. The inverter has to supply its own averaging in the form of an inductor, and the quality of that filter is much of the difference between a cheap inverter and a good one.`
    },
    naming: `Varying the width of switching pulses to set an average is **pulse-width modulation**, universally **PWM**, and the rate of chopping is the **switching** or **carrier frequency**. The measure of how much of a waveform is not the wanted frequency is **total harmonic distortion**, or **THD**. An inverter claiming a **pure sine wave** output means a filtered PWM one, typically under 3% THD; **modified sine** means the cheap stepped approximation. An inverter that feeds the grid rather than a standalone load is **grid-tied**, and it must match the grid's frequency and phase exactly — which is Lesson 13's synchronism, now done in software. One honest note: a grid-tied inverter is also required to shut down within seconds if the grid fails, even in bright sunshine. That is **anti-islanding**, and it exists so that a lineman working on a supposedly dead cable is not killed by somebody's roof.`,
    formalNames: {
      terms: [
        { term: `PWM`, meaning: `Pulse-width modulation. Switching fully on and off very fast, varying how long each pulse lasts so the average traces the shape you want.` },
        { term: `Total harmonic distortion`, meaning: `How much of the output is frequencies you did not ask for. 47% for a square wave, under 3% for a filtered PWM one.` },
        { term: `Carrier frequency`, meaning: `How fast the chopping happens — typically 16 kHz, so 267 switches per mains cycle. Far from 60 Hz, and therefore easy to filter away.` },
        { term: `Anti-islanding`, meaning: `A grid-tied inverter shutting down when the grid fails, so it cannot energise a cable someone is working on. A safety requirement, not a feature.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `A cheap car inverter that makes a fan sound wrong.`,
      `An inverter or charger that whines faintly.`,
      `LED lights that flicker on camera but not to your eye.`,
      `A dimmer switch that buzzes slightly.`,
      `A laptop charger that interferes with AM radio.`,
      `A solar system that shuts down during a power cut.`
    ],
    builder: {
      body: `The power-cut one surprises almost everyone who has solar, and it is worth knowing before it happens. A standard grid-tied system produces nothing during a blackout, even at noon in July, because its inverter is required to disconnect — and the reason is that a lineman repairing the fault must be able to trust that a dead cable is dead. Your roof could otherwise back-feed the street through the pole transformer at several thousand volts. Systems that **do** run through a blackout have extra hardware: a transfer switch that physically isolates the house from the street first, and usually a battery. If you have solar, find out which sort you have while the sun is shining rather than during the next storm.`
    },
    ownPlaceholder: `Something electrical that behaved oddly on a cheap power supply…`,
    synthesis: `Almost everything on that list is the same mechanism heard, seen or received. Fast switching is how modern electronics avoids wasting power, and the whine, the buzz, the camera flicker and the radio interference are all that switching leaking out where it was not wanted.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend how a box with only on-off switches makes a smooth wave — **without using the words "average" or "sine."**`,
    banned: ['average', 'sine'],
    bannedNote: `one of those came back — and the blinking-lamp idea carries it without either`,
    placeholder: `It switches fully on and fully off very fast, and changes how long…`,
    checks: [
      `It can only connect the supply or disconnect it — there is no in-between setting.`,
      `So it switches very fast and varies how long it stays on each time.`,
      `Longer pulses where the output should be high, shorter where it should be low.`,
      `Then something that resists sudden change smooths the chopping into a real curve.`
    ],
    closing: `If your version has "it changes the timing, not the voltage," you have the trick — and it is the same trick in every LED dimmer, motor controller and phone charger you own.`
  },

  challenge: {
    voice: 'editor',
    line: `One about why anyone switches at all, and one about a decision that has caught people out.`,
    prediction: {
      question: `Why do inverters chop the supply thousands of times a second instead of simply varying the voltage smoothly with something adjustable?`,
      options: [
        {
          id: 'heat',
          text: `Because anything that varies voltage smoothly has to burn the difference as heat.`,
          verdict: `Correct, and the arithmetic is brutal enough to settle the question by itself. To drop 246 V to 100 V at 10 amps, a variable resistance must absorb 146 V across it — 1,460 watts of heat, while delivering 1,000 watts to the load. You would waste more than you supplied, and need a serious cooling system to do it. A switch avoids this entirely because it is never in between: fully on it has almost no voltage across it, fully off it passes no current, and power is the product of the two. That is how switching reaches 97% where the smooth method manages 40%.`
        },
        {
          id: 'cheap',
          text: `Because transistors are cheaper than the alternative.`,
          verdict: `They are cheap, and that helped the technique spread — but cost is a consequence here rather than the cause. The smooth method was perfectly affordable and genuinely used for decades in linear power supplies; what killed it was not the price of the parts but the energy wasted and the heat produced. A linear supply big enough to run a house would need a heatsink the size of a radiator and would waste more than it delivered, and no reduction in component prices fixes that.`
        },
        {
          id: 'shape',
          text: `Because switching produces a cleaner waveform than a smooth method could.`,
          verdict: `This has it backwards, which is worth noticing. A smoothly varying method produces an inherently **clean** output — that is its one great virtue, and why linear supplies are still used in sensitive laboratory equipment today. Switching produces a filthy one full of harmonics, and then spends effort and components filtering it back to respectability. The simulation shows exactly that: the unfiltered PWM trace is a mess. We accept the mess because the alternative wastes more than half the energy.`
        }
      ]
    },
    open: {
      question: `A grid-tied inverter must shut down within seconds if the grid fails — so a house with solar panels goes dark in a blackout, at noon, in full sun. That looks absurd. Why is it the rule?`,
      placeholder: `Perhaps it is about who else is working on the wires…`,
      reveal: [
        `Because of the pole transformer from Week 2. It works in both directions: a roof pushing 240 volts into the house side appears on the street side as several thousand volts. A lineman repairing a storm-damaged cable has switched off the supply, tested the line and is working on it in the belief that it is dead — and one unnoticed solar system a few streets away could re-energise it. The rule exists to make "switched off" mean switched off.`,
        `The condition is called **islanding** — a piece of the grid left alive and isolated, an electrical island — and it is dangerous for a second reason too. An island's frequency and voltage are set by whatever happens to be generating, with none of Lesson 13's continent-sized inertia behind them, so it wanders. When the utility reconnects a wandering island to the main grid out of phase, the result is violent enough to destroy equipment at both ends.`,
        `What you can have instead is a system that **islands deliberately and safely**. A transfer switch physically disconnects the house from the street, and only once that separation is proved does the inverter restart, now feeding an island with a defined edge. That requires extra hardware and usually a battery, because a bare panel cannot hold a steady supply through a passing cloud. It is worth knowing which sort you have — and the answer is usually that a standard installation does not have it. Tomorrow is the last of the week: everything so far has had one live wire, and a workshop or a factory has three.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about how electricity is reshaped that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 25 — the last of the week. Your house has one live wire, and a workshop has three. The reason is a fact about single-phase power that nobody mentions: it falls to nothing, 120 times a second, and only inertia hides it.`
  },

  routes: [
    { id: 'analogy', body: `Dimming a lamp by blinking it a thousand times a second rather than by putting a resistor in series. The resistor method gets hot because it absorbs what it withholds; the blinking method wastes nothing because the switch is never partly on. Your eye does the averaging. An inverter does the same thing and supplies its own averaging in the form of a coil.` },
    { id: 'object', body: `A phone charger is this lesson in your pocket: it takes mains, rectifies it to DC, chops that at tens of kilohertz, and smooths the result to 5 or 20 volts. The reason it is the size of a matchbox rather than a brick is entirely that it switches instead of dropping voltage smoothly. Compare the weight of an old plug-in transformer from the 1990s with a modern charger of the same power.` },
    { id: 'story', body: `Early inverters produced square waves because that was all cheap switching could do, and a generation of equipment was designed to tolerate them. The arrival of fast, efficient power transistors made high-frequency switching practical, and pure-sine inverters went from laboratory expense to commodity in about fifteen years. Nothing about the principle changed — the components simply became fast enough to chop finely.` },
    { id: 'experiment', body: `Point a phone camera at an LED lamp or a car's rear lights and wave the phone sideways. Many will break into a dotted line rather than a smooth streak, because they are being switched on and off rapidly rather than lit continuously. Your eye averages it; the camera's rolling shutter does not. You are seeing PWM directly, with no instruments at all.` },
    { id: 'smaller', body: `Forget harmonics and filters. Two sentences: the box can only switch the supply fully on or fully off, so it switches very fast and varies how long it stays on. A coil smooths that chopping into the smooth wave the chopping was describing.` },
    { id: 'backward', body: `Start from the fact that a modern phone charger is the size of a matchbox and barely warm, while a 1990s plug-in adaptor of the same power was a heavy brick that got hot. Nothing about the power changed. What changed is that the brick dropped voltage smoothly and absorbed the difference, and the matchbox chops and averages. Work backwards from the weight and the heat and you arrive at why switching won.` }
  ],

  map: [
    { name: `Inverters`, level: 4 },
    { name: `Batteries`, level: 5 },
    { name: `Tracking the best point`, level: 4 },
    { name: `AC and DC`, level: 5 },
    { name: `Solar panels`, level: 5 },
    { name: `The grid`, level: 5 },
    { name: `Induction`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
