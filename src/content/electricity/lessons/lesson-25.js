// Electricity & Energy · Week 5 · Lesson 25 — one phase, or three.
//
// Measured off the simulation:
//
//   single phase, 120 V and 10 A → 1,200 W average, 2,400 W peak, and 0 W
//                                  twice per cycle — 120 times a second
//   three phase,  120 V and 10 A → 3,600 W, constant, never zero
//   line-to-line voltage          → 208 V, which is sqrt(3) x 120
//
// Two things carry this lesson, and the first is one almost nobody is told:
// single-phase power PULSATES. Voltage and current cross zero together, so the
// instantaneous power is zero twice per cycle and twice the average in between.
// Your house is supplied by something that delivers nothing at all, 120 times
// a second, and only the thermal inertia of filaments and the mechanical
// inertia of motors hides it.
//
// The second is that sin²(x) + sin²(x−120°) + sin²(x−240°) = 3/2 exactly, for
// every x. The three-phase total does not wobble. That is an identity, not an
// engineering achievement — and it is why the field below rotates on its own.
//
// Which closes a loop opened in Lesson 12. A DC motor needed a commutator to
// keep reversing its current, and the commutator is the part that wears out.
// A three-phase motor needs nothing of the kind: the supply itself provides a
// rotating field, so the machine can be a lump of iron with no contacts at all.

export default {
  id: 'lesson-25',
  number: 5,
  week: 5,
  title: `Single-phase and three-phase`,
  openingQuestion: `Your house has one live wire. A workshop, a farm or a factory has three, and the motors there start on their own with no capacitor and no commutator — machines that run for decades with nothing to wear out but bearings. The difference is not simply "more power." It is something about single-phase electricity that nobody mentions.`,
  concept: `Three that never rest`,

  see: {
    voice: 'professor',
    line: `{name}, watch the lower trace first with one phase, then add the other two. The upper traces are interesting; the lower one is the lesson.`,
    simulation: { id: 'phases' },
    observations: [
      { text: `**Single-phase power falls to zero 120 times a second.** Voltage and current cross zero together, so the power does too — and it peaks at twice the average in between. Nothing hides this but inertia.` },
      { text: `Add two more phases **120° apart** and the total is dead flat. Where one is passing through zero the other two are carrying, and the three sum to exactly three halves at every instant.` },
      { text: `And three coils fed that way make a magnetic field that **rotates on its own**. A motor needs nothing else to start — no commutator, no capacitor, nothing to wear out.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The first is the fact about your own house that nobody mentions.`,
    sentences: [
      `In a single-phase supply the voltage and the current **pass through zero together**, so the power delivered is zero at that instant and twice the average a quarter-cycle later. Your lights, your kettle and your fridge are being supplied by something that stops a hundred and twenty times a second. You never notice because a filament cannot cool that fast and a motor cannot slow that fast.`,
      `Run **three supplies a third of a cycle apart** and the gaps fill each other in. When one is at zero the other two are carrying between them, and the three add to a constant — not approximately, but exactly, because the squares of three sines spaced 120° apart sum to three halves for every angle. The total power does not ripple at all.`,
      `And because the three reach their peaks **in rotation**, three coils arranged around a circle and fed from them produce a magnetic field that **turns by itself** at the supply frequency. That is the whole reason heavy machinery is three-phase: the supply hands the motor a rotating field for nothing, so there is no need for the commutator that Lesson 12 showed wearing out.`
    ],
    sequence: {
      label: `WHAT THREE PHASES BUY, BESIDES MORE POWER`,
      note: `each one follows from the constant total or the rotation`,
      steps: [
        { name: `A motor that starts itself`, body: `The rotating field drags the rotor round from standstill. A single-phase motor has no preferred direction and needs a capacitor or a shaded pole to fake one — extra parts that fail.` },
        { name: `No commutator`, body: `The supply does the reversing that Lesson 12's brushes did mechanically. An induction motor has no sliding contacts at all, which is why a factory motor can run for thirty years.` },
        { name: `Smooth torque`, body: `Constant power means constant turning force rather than a pulse twice a cycle. Less vibration, less noise, and far kinder to whatever it is driving.` },
        { name: `Less copper for the same power`, body: `Three wires carry three phases; the returns cancel one another out, so a balanced three-phase system needs no substantial neutral at all. More power per kilogram of cable.` },
        { name: `A free higher voltage`, body: `Between any two of the three you get √3 times the phase voltage — 208 V from 120 V phases, or 400 V from 230 V ones. Heavy equipment uses it without any extra supply.` },
        { name: `And it is how it was generated`, body: `The alternator in Lesson 13 has three sets of windings spaced round it. Three-phase is not something done to the electricity later — it is the shape it was made in.` }
      ]
    },
    comparison: {
      label: `ONE CYLINDER, OR THREE`,
      body: `A single-cylinder engine delivers power in distinct thumps — one push per cycle and nothing in between — and you can feel it shaking even when it is running perfectly. Everything attached to it has to absorb that unevenness, and a heavy flywheel is fitted for no other reason. Add two more cylinders timed a third of a turn apart and the gaps fill in: one is always pushing, the delivery is smooth, and the flywheel can shrink. Single-phase electricity is a one-cylinder supply, and the inertia of your filaments is its flywheel. Three-phase is the three-cylinder version, and its smoothness is why it is used wherever anything substantial has to be driven. *Where the analogy stops:* three cylinders still produce a slight ripple, since each push rises and falls. Three phases do not ripple at all — the sum is mathematically exact, not merely well-blended, and that is a sharper result than any engine can manage.`
    },
    naming: `Three supplies a third of a cycle apart are **three-phase**, and the spacing is **120 degrees** or a third of a cycle. The voltage between any two of them is the **line voltage**, √3 times the **phase voltage**. A motor using the rotating field is an **induction motor**, and the field's rotation speed is the **synchronous speed**. When the three loads are equal the system is **balanced**, and the neutral carries essentially nothing. One honest note: a North American house is not quite plain single-phase. It receives **split-phase** — two 120 V halves of one phase, opposite in sign, giving 240 V between them for a cooker or dryer. That is still a single phase; it is one waveform tapped in the middle, and it does not fill in the gaps or produce a rotating field.`,
    formalNames: {
      terms: [
        { term: `Three-phase`, meaning: `Three supplies a third of a cycle apart. Their powers sum to a constant, exactly, and their peaks arrive in rotation.` },
        { term: `Line and phase voltage`, meaning: `Between two of the three, or between one and neutral. The line voltage is √3 times the phase voltage — 208 V from 120 V.` },
        { term: `Induction motor`, meaning: `A motor driven by the supply's own rotating field. No brushes, no commutator, no starting capacitor — the workhorse of every factory.` },
        { term: `Split-phase`, meaning: `What a North American house actually gets: one phase tapped in the middle, giving two 120 V halves and 240 V across them. Still one phase.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've seen.`,
    items: [
      `A workshop machine with a chunky four-pin plug.`,
      `An electric cooker or dryer on a bigger, different socket.`,
      `A factory motor that has run for decades untouched.`,
      `Three wires strung along a pole rather than one.`,
      `A hum from a transformer or a fluorescent fitting.`,
      `A single-phase motor that needs a shove to start.`
    ],
    builder: {
      body: `Look up at the poles along a road and count the wires above the house connections. A distribution line usually carries three, sometimes with a thinner neutral below, and each house along the street is connected to **one** of those three — the next house along quite possibly to a different one. The electricity company balances the load that way, so that all three phases carry roughly the same current and the neutral carries almost nothing. You have been living on one third of a three-phase system your whole life. If you can see where a line enters a farm or a workshop rather than a house, look for three connections going in instead of one.`
    },
    ownPlaceholder: `Somewhere I've seen three wires where I expected one…`,
    synthesis: `That balancing is the hidden job. Every house pulls unpredictably on its own phase, and the utility's problem is to spread thousands of them across three so the totals stay even — because the moment they are even, the neutral has nothing to carry and the system is at its most efficient.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why factories use three-phase power — **without using the words "phase" or "rotating."**`,
    banned: ['phase', 'rotating'],
    bannedNote: `one of those came back — and three supplies out of step will carry it`,
    placeholder: `With one supply, the power drops to nothing briefly, but with three…`,
    checks: [
      `With one supply the power drops to nothing briefly, over and over.`,
      `Three supplies timed a third of a cycle apart fill in each other's gaps.`,
      `So the total delivered never falls, and the push on a machine is smooth.`,
      `And three coils fed that way drag a motor round with no extra parts at all.`
    ],
    closing: `If your version has "they fill in each other's gaps," you have it — and you can now explain why a factory motor has nothing inside it to wear out.`
  },

  challenge: {
    voice: 'editor',
    line: `One about your own supply, and one about why houses were left out.`,
    prediction: {
      question: `A 240 V cooker circuit in a North American house uses two 120 V wires. Is that two phases?`,
      options: [
        {
          id: 'one',
          text: `No — it is one phase, tapped in the middle.`,
          verdict: `Correct, and the distinction matters more than it sounds. What arrives is a single waveform from one winding of the pole transformer, with a connection taken to the centre of that winding and called neutral. Each half gives 120 V, and because they are opposite ends of the same wave they give 240 V between them. But they are not independent supplies spaced a third of a cycle apart — they rise and fall together, as one thing. They do not fill in each other's gaps, and they cannot produce a rotating field. The proper name is **split-phase**, and it gives you a higher voltage without giving you any of the advantages of this lesson.`
        },
        {
          id: 'two',
          text: `Yes — two separate 120 V supplies, so two phases.`,
          verdict: `This is the natural reading and it is the reason the term split-phase exists. There genuinely are two live wires, each at 120 V to neutral, and electricians sometimes loosely call them two legs. But a phase means a supply with its own timing, and these two share one. Measure them against neutral and they are mirror images of a single wave, always peaking at the same instant in opposite directions — which is exactly what gives 240 V between them, and exactly what means the power still falls to zero 120 times a second.`
        },
        {
          id: 'three',
          text: `It is part of three-phase, with one of the three unused.`,
          verdict: `There is a real connection buried here, because the street outside genuinely does carry three phases and your house is connected to one of them. But what reaches the house is that single phase passed through a transformer whose secondary winding has a centre tap — so the splitting happens at the pole, after one phase has been selected. Nothing of the other two comes into the building, and no arrangement of the wires inside could recover them.`
        }
      ]
    },
    open: {
      question: `Three-phase is better in almost every way — smoother, more efficient, and it runs motors with no parts to wear out. So why was it never given to ordinary houses?`,
      placeholder: `Perhaps houses do not need what it offers…`,
      reveal: [
        `Because a house has almost nothing that benefits. The advantages are overwhelmingly about **motors** and about moving large amounts of power, and a house's load is mostly heating, lighting and electronics — none of which care in the slightest whether the supply pulsates, because a kettle element and an LED driver are perfectly happy with a stuttering supply. The few motors in a house are small enough that a cheap capacitor solves the starting problem for a pound or two.`,
        `And the cost is real: three times the conductors into every building, a larger and more expensive meter, three-pole breakers throughout, and an electrician's job that is meaningfully more complex and more dangerous. Multiply by every house in a country and you have spent an enormous sum to deliver smoothness that nothing in the building would notice. Much of continental Europe does in fact give houses three phases, and the result is mainly that their cookers and heat pumps are wired more conveniently.`,
        `It is a good place for the week to end, because it is the same judgement the whole of Week 5 has been making. The tracker, the battery buffer, the pure sine wave and the choice of phases are all engineering compromises rather than physical necessities — each one is somebody deciding how much hardware a particular benefit is worth. Next week the course hands itself over to you: I bring the objects, and you explain them. A flashlight and a toaster first, and by the end of the week your own house, from the meter inward.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop. End of the week — take a moment with this one.`,
    prompt: `The part of a solar and battery system I understand best now, and the one I'd still like to see for myself:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Twenty-five lessons. One week left, and next week you do the explaining.`,
    tomorrow: `Next week is yours. I bring the objects and you tell me what is happening inside them — a flashlight and a toaster, a fridge and a ceiling fan, a car's alternator and a hybrid's brakes, and then your own house from the meter inward. The last lesson is the Heartwood Energy Challenge.`
  },

  routes: [
    { id: 'analogy', body: `Three people turning a heavy wheel with cranks spaced evenly round it. One person alone pushes hard, then coasts through the dead spot at the top and bottom, and the wheel lurches. Three people spaced a third of a turn apart mean somebody is always in their strongest position, and the wheel turns smoothly. That is three-phase, and the smoothness is exact rather than approximate.` },
    { id: 'object', body: `A cheap bathroom extractor fan is single-phase and contains a capacitor whose only job is to fake a second phase so the motor knows which way to start. When such a fan hums but does not turn, that capacitor has usually failed. A three-phase motor needs no such part, because the supply hands it a direction for free — which is why industrial motors so rarely fail.` },
    { id: 'story', body: `Nikola Tesla patented the three-phase induction motor in 1888, and its significance was that it had no commutator — the part that limited every motor before it. Westinghouse bought the patents, and the AC system that won the argument with Edison was three-phase from the start. The generators in Lesson 13 were built with three sets of windings for this reason, and have been ever since.` },
    { id: 'experiment', body: `Point a phone camera at a cheap LED bulb and record a slow-motion video. Many will flicker visibly at 120 times a second — twice the mains frequency — because the driver is not smoothing the supply and the lamp genuinely goes out twice per cycle. You are seeing the pulsation of single-phase power directly. A better bulb with proper smoothing will not do this, which is much of the difference in price.` },
    { id: 'smaller', body: `Forget identities and line voltages. Two sentences: one supply delivers its power in pulses that drop to nothing briefly, over and over. Three supplies, timed to fill each other's gaps, deliver a total that never drops at all — and three coils fed that way drag a motor round without any help.` },
    { id: 'backward', body: `Start from a factory motor that has run since the 1970s with nothing replaced but bearings, and compare it with a cordless drill whose brushes wear out in a few years. Both are motors. What does the factory one not have? A commutator — and it does not need one because something else is reversing its field. Work backwards from the absent part and you arrive at a supply that rotates on its own.` }
  ],

  map: [
    { name: `Three-phase`, level: 4 },
    { name: `Inverters`, level: 5 },
    { name: `Batteries`, level: 5 },
    { name: `Motors`, level: 5 },
    { name: `AC and DC`, level: 5 },
    { name: `Solar panels`, level: 5 },
    { name: `The grid`, level: 5 },
    { name: `Induction`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
