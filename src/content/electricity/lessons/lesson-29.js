// Electricity & Energy · Week 6 · Lesson 29 — your house, from the meter inward.
//
// The misconception this lesson exists to break is the commonest one in all of
// domestic electricity: that a circuit breaker protects the appliance, or
// protects you. It does neither. It protects the CABLE BEHIND THE WALL, and
// its number is chosen from the gauge of that cable so the cable can never be
// made hot enough to start a fire.
//
// That is why fitting a bigger breaker because the old one "kept tripping" is
// the single most dangerous thing an amateur can do at a panel: the wire does
// not get any thicker, and the only thing that was stopping it overheating has
// just been removed.
//
// Measured off the simulation. Real North American figures, 240 V split-phase
// service with a 200 A main:
//
//   15 A  14 AWG  120 V   1,800 W   lighting, general outlets
//   20 A  12 AWG  120 V   2,400 W   kitchen and bathroom outlets
//   30 A  10 AWG  240 V   7,200 W   clothes dryer
//   40 A   8 AWG  240 V   9,600 W   electric range
//   50 A   6 AWG  240 V  12,000 W   car charger
//
// The everyday scenario: kettle 1,500 W, toaster 1,200 W and microwave 1,200 W
// together draw 3,900 W, which at 120 V is 32.5 A — more than the 20 A kitchen
// circuit is rated for, so it opens. The whole house meanwhile is nowhere near
// its 200 A service, which is the point: one circuit always trips long before
// the house runs out.

export default {
  id: 'lesson-29',
  number: 4,
  week: 6,
  title: `Your house, from the meter inward`,
  openingQuestion: `There is a grey box on a wall in your home with a row of switches in it, and almost everyone believes the same wrong thing about what those switches are for. Here is the question that sorts it out: when a breaker trips because you ran the kettle and the toaster together, what exactly was it protecting?`,
  concept: `It protects the wire`,

  see: {
    voice: 'professor',
    line: `{name}, go to the kitchen circuit and switch on the kettle, the toaster and the microwave together. Then read what it says about what was being protected.`,
    simulation: { id: 'house-panel' },
    observations: [
      { text: `Kettle, toaster and microwave together draw **3,900 W — 32.5 amps** on a circuit rated for 20. The breaker opens in a second or two.` },
      { text: `What it protected was **the 12-gauge cable behind the wall**, not the kettle and not you. Every breaker's number is chosen from the thickness of the wire it feeds.` },
      { text: `And the **whole house was nowhere near its limit** — about 48 amps of a 200 amp service. One circuit always trips long before the house runs out.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first is the one to take away from the whole lesson.`,
    sentences: [
      `A circuit breaker **protects the cable behind the wall**. Its rating is chosen from the gauge of that cable — 15 amps for 14-gauge wire, 20 for 12-gauge, 30 for 10 — so that no combination of things you plug in can push enough current through that wire to set the building alight. It is not protecting your kettle, which has its own fuse or thermal cut-out, and it is emphatically not protecting you.`,
      `Which is why **fitting a bigger breaker is the most dangerous thing an amateur can do at a panel**. The wire in the wall does not get thicker because you changed a switch. You have removed the one device that was stopping it from overheating, and the circuit will now happily run at a current the cable was never rated to carry, inside a wall, where nobody will notice until there is smoke.`,
      `What protects **you** is a different device entirely: the **GFCI** from Lesson 8, which compares the current going out with the current coming back and opens in milliseconds if a few thousandths of an amp are going somewhere else — such as through a person. A breaker needs fifteen amps to notice. A GFCI needs five thousandths. They are solving completely different problems.`
    ],
    sequence: {
      label: `FROM THE STREET TO A SOCKET, IN YOUR OWN HOUSE`,
      note: `and all of it was Week 2 — you have simply never opened the box`,
      steps: [
        { name: `The pole transformer`, body: `The grey cylinder outside, stepping a few thousand volts down to 240 — and tapped in the middle, which is where the two 120 V halves come from.` },
        { name: `The meter`, body: `Counting kilowatt-hours, exactly as Lesson 6 described. Everything on its far side is the utility’s problem; everything inside is yours.` },
        { name: `The main breaker`, body: `Usually 100 or 200 amps, protecting the service cable into the building. At 240 V, a 200 A service is 48 kW — far more than almost any house ever draws.` },
        { name: `Two busbars`, body: `The two halves of the split phase run down the panel, 120 V each to neutral and 240 V across. Breakers clip onto one bar for a 120 V circuit, or across both for 240.` },
        { name: `The branch circuits`, body: `Each one a breaker sized to its cable, feeding one part of the house. The kitchen gets heavier wire because everything in a kitchen makes heat.` },
        { name: `And the 80% rule`, body: `A circuit may only be loaded to four fifths of its number for hours at a time — which is why a 50 A car charger is only ever allowed to draw 40.` }
      ]
    },
    comparison: {
      label: `A FUSE IN A PLUG, AND A WEAK LINK IN A CHAIN`,
      body: `A crane's lifting chain is sometimes fitted with one link deliberately made weaker than the rest. It seems perverse to build in a weakness until you realise what it is for: if the load is ever too great, you want to know exactly where the chain will fail, and you want it to be a cheap link you can replace rather than the hook, the jib or the thing being lifted. A breaker is that link, chosen to give way before the cable in your wall does. *Where the analogy stops:* a weak link protects the chain from a load that is too heavy, and you would simply use a smaller load next time. A breaker is protecting something you cannot see, cannot inspect and cannot easily replace — the wiring inside a finished wall — which is precisely why the temptation to "fix" repeated tripping by fitting a larger one has to be resisted so firmly. Replacing the weak link with a strong one does not make the chain stronger. It just moves where it breaks.`
    },
    naming: `The row of switches is a **consumer unit** or **breaker panel**, fed through a **main breaker** from the **service** entrance and the **meter**. Each switch is a **branch circuit breaker**, sized to the **wire gauge** it feeds — measured in **AWG**, where the number counts **down** as the wire gets thicker, so 14 AWG is thinner than 10. The two vertical conductors are the **busbars**. The requirement to stay at 80% for long loads is the **continuous load rule**. One honest note: the device protecting you from shock is the **GFCI** — sometimes called an RCD elsewhere — and it is a legal requirement near water for exactly that reason. A standard breaker will quite happily watch you be electrocuted, because the current through a person is nowhere near enough to interest it.`,
    formalNames: {
      terms: [
        { term: `Branch circuit breaker`, meaning: `Protects the cable behind the wall, nothing else. Its rating comes from the wire gauge, never from what you plan to plug in.` },
        { term: `Wire gauge (AWG)`, meaning: `Thickness of the conductor, numbered downward: 14 AWG takes 15 A, 12 AWG takes 20, 10 AWG takes 30. The breaker follows the wire.` },
        { term: `GFCI`, meaning: `Compares current out against current back and opens in milliseconds if a few milliamps go missing. This is the one that protects people.` },
        { term: `Continuous load rule`, meaning: `Only 80% of a breaker's rating may be drawn for hours at a stretch — which is why a 50 A charger circuit delivers 40 A.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `A breaker that trips whenever two kitchen appliances run together.`,
      `A socket with TEST and RESET buttons on it.`,
      `A thicker cable going to a cooker or a dryer.`,
      `An extension lead that got warm under a heater.`,
      `An old house with far fewer sockets than you need.`,
      `A meter outside with a disc or a digital display.`
    ],
    builder: {
      body: `Go and look at your own panel — not to touch anything, just to read it. The number is printed on every breaker. Find the 15s, the 20s, and the wide double ones that span both busbars for the 240 V circuits. Now check whether the labels beside them are accurate, because in most houses some of them are wrong or missing. Working out which breaker actually controls which room is a genuinely useful afternoon: switch one off and walk round the house. Write it on the door. The one occasion you will want that list is an emergency, which is precisely when nobody feels like experimenting.`
    },
    ownPlaceholder: `Something about my own wiring I'd never looked at…`,
    synthesis: `The warm extension lead is the one worth taking seriously. A breaker protects the cable **in the wall**, and it has no idea that you have added a thinner cable on the end of it. A 15 A circuit will happily push 14 amps through a flimsy lead rated for 5, and the breaker will never notice — because from its point of view nothing is wrong at all.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend what a circuit breaker is actually protecting, and why fitting a bigger one is dangerous. **Use any words you like.**`,
    unrestricted: true,
    bannedNote: `no banned words — this one is about getting the reasoning right`,
    placeholder: `It isn't protecting the kettle. The thing it's worried about is…`,
    checks: [
      `The breaker is matched to the thickness of the cable hidden in the wall.`,
      `Too much current in that cable makes it hot, and hot wires inside walls start fires.`,
      `Fitting a larger breaker does not make the cable any thicker.`,
      `And a different device, comparing what goes out with what comes back, is what protects people.`
    ],
    closing: `If you got the third one, you have the reason this is a safety lesson and not a trivia lesson — and it is the single most useful thing in this course to have firmly in your head.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a tempting fix, and one about an old house.`,
    prediction: {
      question: `A 15 A breaker keeps tripping when you run a space heater in the living room. Somebody suggests fitting a 20 A breaker. What is wrong with that?`,
      options: [
        {
          id: 'wire',
          text: `The wire in the wall is still only rated for 15 A.`,
          verdict: `Correct, and it is the whole lesson. That circuit is wired in 14-gauge cable, which is rated to carry 15 amps without getting dangerously warm. The breaker's number was chosen to match it. Fit a 20 A breaker and the cable has not changed at all — you have simply authorised 20 amps through a wire rated for 15, inside a wall, continuously, with nothing left to object. The cable will run hot where it passes through insulation or a joist, and the first sign of a problem is likely to be smoke. This is a genuine and well-documented cause of house fires, not a theoretical risk.`
        },
        {
          id: 'heater',
          text: `The heater would draw more current and get damaged.`,
          verdict: `The heater is fine, and that is worth understanding because it reveals the misconception. A resistive heater draws whatever its own resistance and the 120 V supply dictate — about 12.5 amps for a 1,500 W model — and nothing about the breaker changes that. Breakers do not push current; they only permit it. The heater will behave identically on a 15, 20 or 100 amp breaker. What changes is how much current the installation will tolerate before disconnecting, and that number was supposed to be about the wire.`
        },
        {
          id: 'fine',
          text: `Nothing, as long as the heater is less than 20 A.`,
          verdict: `This sounds like careful reasoning and it gets the wrong thing right. You have checked the appliance against the new breaker, when the number that matters is the **cable**, which you cannot see and which has not changed. And the heater is not the only thing on that circuit — it is a general-purpose outlet circuit, so a vacuum cleaner, a television and a couple of lamps may be on it too. The breaker exists precisely because nobody can predict what will be plugged in. Sizing it to today's appliance defeats its entire purpose.`
        }
      ]
    },
    open: {
      question: `An older house often has far fewer sockets, no GFCIs, and a panel with fuses rather than breakers — and it was legal and considered safe when it was built. What changed?`,
      placeholder: `Probably what people plug in changed more than the wiring did…`,
      reveal: [
        `The load changed, and the understanding of shock changed. A house wired in 1955 was built for lighting, a radio, a refrigerator and perhaps a television — a few amps in each room, and nobody imagined a kitchen containing a kettle, a microwave, a toaster, a dishwasher and an air fryer, or a bedroom with six chargers in it. The wiring was adequate for the house as it was used, and the use outgrew it.`,
        `And the **GFCI did not exist**. It was invented in the 1960s and spread through the codes over the following decades, as it became clear that most domestic electrocutions involve a small current through a person rather than a large one through a wire — which no fuse or breaker can detect. That is why the requirement appears first near water, where the body's resistance is lowest, and has steadily widened since.`,
        `Which is a decent note to end a practical lesson on, because it says something about codes that is easy to miss: they are not arbitrary bureaucracy, and they are not fixed. Nearly every rule in them is the written-down form of an accident that happened to somebody. The reason you now know what the grey box is for is so that you can tell when something is beyond you — and "this needs an electrician" is a conclusion arrived at with understanding, which is a very different thing from not knowing. Tomorrow is the last lesson, and the objects are yours.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `Something about my own home's wiring I now understand:`,
    placeholder: `I'd always wondered why…`,
    mapFooter: `Twenty-nine lessons. One left.`,
    tomorrow: `Tomorrow is the last one — the Heartwood Energy Challenge. Four objects, each needing most of this course at once, and no help until you ask for it. Nothing new, and nothing held back.`
  },

  routes: [
    { id: 'analogy', body: `A lifting chain with one link deliberately made weaker than the others. It seems like a flaw until you realise you want to know exactly where the chain will fail, and you want it to be the cheap, visible, replaceable link rather than the hook. A breaker is that link, chosen to give way before the wire in your wall does.` },
    { id: 'object', body: `Compare the cable going to a cooker with the cable going to a bedroom light. The cooker's is enormously thicker, and that thickness is the whole of this lesson in physical form — Lesson 5's heating, Lesson 19's current, and a breaker chosen to suit. Thick cable is not better quality. It is a different rating, for a different amount of current.` },
    { id: 'story', body: `The GFCI was developed in the 1960s by Charles Dalziel, who had spent years measuring what currents actually do to the human body. His key finding was that the dangerous current is far smaller than anyone had assumed — a few tens of milliamps across the chest can stop a heart, which is a thousandth of what a breaker would notice. Every socket with TEST and RESET on it exists because of that research.` },
    { id: 'experiment', body: `Press the TEST button on a GFCI socket — it is there to be used, and the manufacturers recommend doing it monthly. It should snap off immediately. That button deliberately leaks a tiny current to earth, which is exactly what would happen if the path went through a person, and the device cannot tell the difference. If it does not trip, it has failed and needs replacing.` },
    { id: 'smaller', body: `Forget gauges and rules. Two sentences: the breaker is there to stop the hidden cable in your wall from getting hot enough to start a fire. Fitting a bigger one does not make the cable thicker — it just stops anything from objecting.` },
    { id: 'backward', body: `Start from the puzzle of why breakers come in such specific sizes — 15, 20, 30, 40, 50 — rather than being matched to appliances. If they were protecting what you plug in, they would come in hundreds of sizes. They come in a handful because there are only a handful of standard cable thicknesses, and the breaker follows the cable. Work backwards from that list and the whole logic appears.` }
  ],

  map: [
    { name: `Your own house`, level: 4 },
    { name: `Seeing it in the world`, level: 4 },
    { name: `Resistance`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Three-phase`, level: 5 },
    { name: `A circuit is a loop`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `The grid`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
