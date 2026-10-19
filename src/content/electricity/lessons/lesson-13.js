// Electricity & Energy · Week 3 · Lesson 13 — spin into electricity.
//
// Measured off the simulation, the same machine as yesterday run the other way:
//
//     600 rpm →  10 Hz, peak  3 V
//   3,600 rpm →  60 Hz, peak 19 V   ← the grid
//   6,000 rpm → 100 Hz, peak 31 V
//
// Voltage and frequency rise together, strictly in proportion, because both
// come from the same rotation. That is the lesson's sting: a grid must hold its
// frequency to a fraction of a hertz, and the only way to hold the frequency is
// to hold the speed — so every large turbine in North America turns at 3,600
// revolutions a minute, or 1,800 for a four-pole machine. The rpm slider steps
// by 300, so all three figures above are reachable.
//
// It also closes a loop opened in Week 2: a rotating loop produces a sine wave
// naturally. AC is not a design choice. It is what a spinning machine does, and
// direct current is the version that needs extra hardware.

export default {
  id: 'lesson-13',
  number: 3,
  week: 3,
  title: `How a generator turns spin into electricity`,
  openingQuestion: `Almost every watt in your house began as something turning — a turbine pushed by steam, by falling water, or by wind. Even the solar panels on a roof feed a grid whose frequency is set by spinning machines. So what does spinning actually do, and why does the entire continent agree on sixty cycles a second rather than fifty, or a hundred?`,
  concept: `Spin is the source`,

  see: {
    voice: 'professor',
    line: `{name}, take the speed to 3,600 rpm and read the frequency. Then try to change the frequency without changing the speed. You can't — and that is the lesson.`,
    simulation: { id: 'machine', props: { mode: 'generator' } },
    observations: [
      { text: `**At 3,600 rpm the output is exactly 60 Hz.** Sixty revolutions a second, one cycle per revolution. The grid's frequency is not a setting — it is a rotation speed.` },
      { text: `What comes out is a **sine wave**, unprompted. Nothing was added to make it alternate; a loop turning in a field simply produces this. AC is what spinning machines naturally do.` },
      { text: `Speed up and **both** the voltage and the frequency rise together — 19 V at 60 Hz, 31 V at 100 Hz. They cannot be separated, which is why a grid's speed must be held exactly.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first is Lesson 12 read right to left.`,
    sentences: [
      `**Move a wire through a magnetic field and a voltage appears across it** — no battery, no chemistry, nothing but motion and magnetism. This is yesterday's back-EMF with the supply taken away. A motor generates while it runs; a generator is the same machine with nobody supplying the electricity, so the voltage it makes is all there is.`,
      `What matters is **change**. A loop sitting still in a field makes nothing, however strong the field; it is the rate at which the field through the loop changes that sets the voltage. Turn it faster and the change is faster, so the voltage is higher — and the cycles come more often, so the frequency is higher too. One rotation, two consequences, inseparably linked.`,
      `And because the loop passes the magnets in one direction and then the other, the voltage **reverses twice per revolution**. That is alternating current, arriving unbidden. The grid is AC not because anyone chose it but because this is what the machinery does, and Week 2's transformer then made that accident extremely convenient.`
    ],
    sequence: {
      label: `WHY THE WHOLE CONTINENT TURNS AT ONE SPEED`,
      note: `each step forces the next — there is no slack anywhere in this chain`,
      steps: [
        { name: `The frequency is the speed`, body: `A two-pole generator makes one cycle per revolution. 3,600 rpm is 60 revolutions a second, which is 60 Hz. Change one and you have changed the other.` },
        { name: `Clocks and motors depend on it`, body: `Mains-timed clocks count cycles, and every AC motor's speed is set by the frequency. A grid that drifted would make every synchronous clock in the country wrong.` },
        { name: `Generators must agree exactly`, body: `Thousands of machines feed one grid. They must turn in step — in **synchronism** — or they fight each other. A generator even slightly out of step is pulled violently back in or disconnected.` },
        { name: `Demand fights the speed`, body: `Switch on more load and the extra torque slows every turbine very slightly. The frequency dips — measurably, within a second, across the whole grid.` },
        { name: `So the frequency is the signal`, body: `Grid operators watch the frequency as the measure of whether supply matches demand. Below 60 means too much load; above means too much generation. It is the continent's single most-watched number.` },
        { name: `And it is corrected in seconds`, body: `Steam valves open slightly, reserve plant comes on, and the frequency is pulled back. It is held within about 0.05 Hz, all day, by machines spinning in agreement hundreds of miles apart.` }
      ]
    },
    comparison: {
      label: `A BICYCLE DYNAMO, AND A CHOIR`,
      body: `Two halves to this one. The first: an old bicycle dynamo rubbing on the tyre makes a dim lamp at walking pace and a bright one at speed, and anyone who rode such a bike knows the light dies at a standstill. You are not storing anything; you are converting your legs directly into light, and the brightness is your speed. The second half is what makes a grid different from one bicycle. Imagine not one dynamo but ten thousand, all wired together and all required to turn in exact step — a choir where every singer must hold the same note to a hundredth of a semitone, or be thrown out. If the hall gets heavier to sing against, everyone flattens slightly together, and that shared flattening is the signal to sing harder. *Where the analogy stops:* singers can hear each other and deliberately adjust, while generators are physically dragged into step by the grid itself, whether they intend it or not.`
    },
    naming: `Producing a voltage by changing the magnetic field through a loop is **electromagnetic induction**, discovered by Faraday in 1831, and the rule connecting them is **Faraday's law**: the voltage follows the **rate of change** of the field through the circuit. A machine making AC this way is an **alternator**, which is what is under a car bonnet and what sits in every power station; a **dynamo** is the older DC version with a commutator. Generators turning in exact step are **in synchronism**, and the grid's frequency is its most closely watched quantity. One honest note: real station alternators are not two-pole and 3,600 rpm universally — a four-pole machine makes 60 Hz at 1,800 rpm, and slow hydro machines use dozens of poles to make 60 Hz at a few hundred rpm. The pole count and the speed multiply to the same frequency.`,
    formalNames: {
      terms: [
        { term: `Electromagnetic induction`, meaning: `A changing magnetic field through a loop produces a voltage. Faraday, 1831 — the single most economically consequential discovery in this course.` },
        { term: `Faraday's law`, meaning: `The voltage depends on the rate of change of the field through the circuit. No change, no voltage, however strong the field.` },
        { term: `Alternator`, meaning: `A generator producing AC, which is the natural output of a rotating machine. In your car, and in every power station.` },
        { term: `Synchronism`, meaning: `Thousands of generators turning in exact step on one grid. The frequency they share is the measure of whether supply matches demand.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've seen or used.`,
    items: [
      `A wind-up or shake-to-charge torch.`,
      `A bicycle light that dims when you slow down.`,
      `A car's alternator, and the warning light when the belt goes.`,
      `A portable generator on a building site changing note under load.`,
      `A wind turbine turning slowly on a hillside.`,
      `A hybrid or electric car slowing without using its brakes.`
    ],
    builder: {
      body: `If you can safely watch a petrol generator on a site or at an event, listen to it rather than looking at it. Idling with nothing plugged in, it runs at a steady note. The moment somebody connects a heavy tool, the note **drops** audibly for a second and then climbs back. What you heard was the chain in reverse: the extra load demanded torque, the torque slowed the engine, the governor felt the speed fall and opened the throttle to bring it back. That generator must hold its speed because its speed is its output frequency — and the whole continental grid does the same thing, with the same physics, except that its note is held to within about 0.05 Hz and you cannot hear it.`
    },
    ownPlaceholder: `Something I've seen turn motion into electricity…`,
    synthesis: `The generator's dropping note and yesterday's drill losing pitch are the same event from opposite ends. In both cases, load demands torque and torque costs speed. One is paid for in electricity and the other in fuel.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend where the electricity in their wall comes from — **without using the words "generator" or "induction."**`,
    banned: ['generator', 'induction'],
    bannedNote: `one of those came back — and the story works with coils, magnets and spinning`,
    placeholder: `Something is turning, and it has coils of wire and magnets in it…`,
    checks: [
      `Moving a coil of wire past a magnet makes a voltage appear in the coil.`,
      `It is the change that matters — a coil sitting still makes nothing at all.`,
      `Spinning it faster makes both a bigger voltage and more cycles a second.`,
      `Because the coil passes the magnets one way and then the other, the output alternates.`
    ],
    closing: `If your version has "it only works while it's changing," you have Faraday's law — and you know why the grid is AC rather than anyone having decided it.`
  },

  challenge: {
    voice: 'editor',
    line: `One about whether electricity is free, and one about where the grid's steadiness actually comes from.`,
    prediction: {
      question: `A generator turns spin into electricity. Does it become **harder to turn** when you connect more load to its output?`,
      options: [
        {
          id: 'harder',
          text: `Yes — the more electricity it makes, the harder it is to turn.`,
          verdict: `Correct, and it is the single most important sentence about generators. The current you draw flows in the coil, the coil sits in a magnetic field, and a field pushes on a current — yesterday's motor effect, now working against the rotation. Draw more current and the opposing torque rises in proportion, so the engine must work harder or slow down. This is why a generator burns more fuel under load and why the site generator's note drops. Energy is conserved: the electricity is not appearing from nowhere, it is the fuel, converted, and you can feel the conversion in the shaft.`
        },
        {
          id: 'same',
          text: `No — it takes the same effort to spin whatever is connected.`,
          verdict: `This is the intuition to dismantle, because if it were true the generator would be producing energy from nothing. Spin a small motor with its terminals unconnected and it turns freely; short those terminals together and it suddenly fights you, harder the faster you go. Nothing changed but the circuit. The resistance you feel is the field pushing back on the current you are now making — and that resistance is precisely how the fuel gets turned into watts. A generator with no load connected costs almost nothing to turn, which is why a car's alternator is barely felt until the headlights go on.`
        },
        {
          id: 'easier',
          text: `Easier — once current is flowing, the machine is doing its job.`,
          verdict: `The phrasing is appealing, as though a machine in its proper state should run more sweetly. But the test is energy, not comfort. Every watt leaving the terminals has to arrive from somewhere, and the only thing coming in is mechanical work through the shaft. If drawing current made the shaft easier to turn, you could draw more and more while spending less and less, and Physics I spent a whole week ruling that out. The resistance must rise with the current, and it does, in exact proportion.`
        }
      ]
    },
    open: {
      question: `The grid holds 60 Hz within about a twentieth of a hertz, all day, while millions of appliances switch on and off unpredictably. Nobody can anticipate those switches. So what is keeping it so steady in the first second, before any operator or control system can react?`,
      placeholder: `Perhaps something physically resists the change…`,
      reveal: [
        `Weight. Thousands of tonnes of steel rotor spinning at 3,600 rpm carry an enormous amount of **rotational kinetic energy** — which Physics I called exactly that. When load suddenly rises, the first thing that happens is not a control action; it is that the extra torque is paid for out of the stored energy of the spinning mass, and the whole grid slows very slightly. That slowing is the dip in frequency, and the mass is what makes it a slight dip rather than a collapse.`,
        `This is called **inertia**, and it buys the system a few seconds — enough time for governors to open steam valves and for reserve plant to respond. The grid is, in effect, a continent-sized flywheel, and its frequency is a readout of how much energy is currently stored in it. A frequency of 59.95 Hz is not merely a number slightly below target; it is a statement that the flywheel has been drawn down.`,
        `Which raises the genuinely open question of the next decade, and it is worth knowing before Week 4. Solar panels and batteries have no spinning mass at all. A grid supplied largely by electronics has very little inertia, so the same imbalance makes a much faster frequency change and there is less time to react. Engineers are now building **synthetic inertia** — inverters programmed to respond in milliseconds and imitate a flywheel that is not there. Week 4 starts with the sunlight itself, and this is the problem waiting at the end of it.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about where electricity comes from that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 14 — the shape of the thing itself. Why magnetic field lines always come back round on themselves, why a coil of wire and a bar magnet are indistinguishable from the outside, and what iron is actually doing when it makes an electromagnet strong.`
  },

  routes: [
    { id: 'analogy', body: `A hand-cranked water pump run backwards. Pour water in at the top and the handle turns by itself — the same machine, and which end you supply decides whether it is a pump or a turbine. Nothing inside needs changing. A motor and a generator are related in exactly this way, and that is not a loose comparison but literally the same device.` },
    { id: 'object', body: `A car's alternator is the clearest example you can get near. The engine turns it by a belt; it charges the battery and runs the lights. Switch on headlights, heater and demister at idle and a small engine's note drops slightly — you have just made the alternator harder to turn, and the engine had to pay for it in fuel. The warning light on the dashboard means precisely that this machine has stopped being turned.` },
    { id: 'story', body: `Faraday spent ten years after Ørsted trying to produce the reverse effect, and the breakthrough in 1831 was realising that a steady field does nothing — only a changing one works. He got his result by moving a magnet in and out of a coil rather than leaving it there. Asked by a politician what use it was, he is supposed to have said that one day the government would tax it. The story is probably apocryphal, but the tax is not.` },
    { id: 'experiment', body: `Take a strong magnet and a coil of wire with its ends connected to an LED or a sensitive meter. Hold the magnet inside the coil and nothing happens, however long you wait. Move it — in, out, quickly — and you get a flick each time, in opposite directions for in and out. There is the whole of Faraday's law in one object: it is not the field that generates, it is the changing of it.` },
    { id: 'smaller', body: `Forget frequency, synchronism and the grid. One sentence: wave a magnet past a coil of wire and electricity comes out of the coil, and the faster you wave it the more you get. That is a generator. Everything else today is the consequence of doing it with a very large machine that many people are depending on at once.` },
    { id: 'backward', body: `Start from something you already know: the clock on an old oven kept good time for years without a battery. How? It counted mains cycles — which only works if the number of cycles per second is reliable to a tiny fraction over months. Work backwards from that reliability and you arrive at thousands of turbines held at exactly 3,600 rpm, because the frequency and the speed are one quantity.` }
  ],

  map: [
    { name: `Generators`, level: 4 },
    { name: `Induction`, level: 4 },
    { name: `Motors`, level: 5 },
    { name: `Magnetic field`, level: 4 },
    { name: `Magnetism`, level: 4 },
    { name: `AC and DC`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
