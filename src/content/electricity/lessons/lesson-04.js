// Electricity & Energy · Week 1 · Lesson 4 — current is traffic past a point.
//
// The misconception: that a lamp "uses up electricity," so less comes out than
// goes in. The simulation refuses to support it — a meter either side of the
// lamp reads the same figure to the last digit, and the running counts of
// charges past each point never drift apart by more than one.
//
// That "never more than one" is measured, not asserted: the counts come off the
// dot positions, and whichever charge happens to be mid-gate accounts for the
// difference. The observation card says exactly that, because a card claiming
// they are *always* identical would be a small lie the learner could catch.

export default {
  id: 'lesson-04',
  number: 4,
  week: 1,
  title: `Current: how much goes by, not how fast`,
  openingQuestion: `Everyone says a lamp *uses* electricity. If that's true there must be less of it coming out of the lamp than going in — and that is a measurable claim, not a matter of opinion. So let's put a meter on both sides and settle it.`,
  concept: `Current is the same all the way round`,

  see: {
    voice: 'professor',
    line: `{name}, three meters on the same loop: one before the lamp, one after it, one round the far side. Read the first two against each other before you read anything else.`,
    simulation: { id: 'circuit-loop', props: { mode: 'flow' } },
    observations: [
      { text: `The meter **before** the lamp and the meter **after** it read the same figure — 0.50 and 0.50 — and they stay equal at every setting you tried.` },
      { text: `The running counts of charges gone by never drift apart by more than one. That one is simply whichever charge happens to be halfway through a meter as you look.` },
      { text: `So nothing is consumed in the lamp. The same charges leave the far side at the same rate. What the lamp takes from them is energy — not the charges themselves.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one is a definition worth getting exactly right.`,
    sentences: [
      `Current is **how much charge passes a point each second**. Not how fast any individual charge is moving — you measured that in Lesson 1 and it was a fraction of a millimetre a second. How *many* go by.`,
      `In a single loop the current has to be the same everywhere, and the reason is the one from Lesson 2: charge cannot pile up and cannot vanish. If more went into the lamp than came out, charge would be accumulating inside it — and after a few seconds there would be a visible, measurable, impossible amount of it in there.`,
      `What the lamp takes is **energy**, levied from each charge as it passes through. Count the charges leaving and you get the same number as went in. Measure the energy they carry and you emphatically do not.`
    ],
    comparison: {
      label: `THE MILL WHEEL`,
      body: `Stand upstream of a water mill with a bucket and a watch, and measure litres per second going in. Walk downstream and measure again. You will get the same number, and it couldn't be otherwise — if the wheel were swallowing water the river would be piling up behind it and running dry in front. The wheel consumed no water at all. What it took was the water's *height*: it came in at the top and left at the bottom, and the difference turned the millstone. A lamp is a mill wheel for charge. Same charge in, same charge out, all of its energy left behind in the filament.`
    },
    naming: `The unit is the **ampere** — amp — after André-Marie Ampère, and one amp means one coulomb of charge going past each second. A **coulomb** is just a quantity of charge, about six and a quarter billion billion electrons, which tells you how absurdly small one electron is. The rule you discovered with the two meters is **Kirchhoff's current law**: whatever flows into any junction flows out of it, always, with no exceptions anywhere in electrical engineering. In a plain loop with no junctions, that reduces to the thing you saw — the current is the same at every point on the ring. And the creeping of a single charge, the thing that was so embarrassingly slow in Lesson 1, has its own name: **drift velocity**. It is a completely different number from the current, and confusing the two is the single most common muddle in this subject.`,
    formalNames: {
      terms: [
        { term: `Ampere (amp)`, meaning: `One coulomb of charge past a point each second. The unit of traffic, not of speed.` },
        { term: `Coulomb`, meaning: `A quantity of charge — roughly 6,240,000,000,000,000,000 electrons. Large numbers of absurdly small things.` },
        { term: `Kirchhoff's current law`, meaning: `Everything that arrives at a junction leaves it. Nothing accumulates. This is the formal version of "charge can't pile up," and the whole of circuit analysis rests on it.` },
        { term: `Drift velocity`, meaning: `How fast one charge actually creeps along — millimetres per second, often less. Unrelated to how much current is flowing, and not what you measure with an ammeter.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Amps are the number that decides how thick a wire has to be. Tap any of these you've run into.`,
    items: [
      `The breakers in my panel say 15 and 20, and one big one says 50.`,
      `My old charger says 1A and the fast one says 3A — same 5 volts.`,
      `"Don't run the heater and the kettle off the same outlet."`,
      `An extension cord that got warm under a space heater.`,
      `Jumper cables are absurdly thick for something only carrying 12 volts.`,
      `To measure amps the meter has to go *in* the circuit, not just touch it.`
    ],
    builder: {
      body: `Go and look at your breaker panel — just read it, no need to open anything beyond the door. Every breaker has a number on the switch: mostly 15 and 20, with bigger ones for the oven, the dryer, the air conditioner. Those are all amps. Not one of them is labelled in volts, because every circuit in the house is at the same 120 and so the voltage would tell you nothing. Then notice, if you can see the cables, that the 50-amp circuit is fed by visibly fatter wire than the 15. Thickness tracks amps, because amps are traffic and traffic is what makes a wire hot.`
    },
    ownPlaceholder: `Somewhere I've seen a rating in amps…`,
    synthesis: `Every one of those is about traffic rather than push. That's the tell: when someone is worried about a wire catching fire they quote amps, and when they're worried about a shock they quote volts.`
  },

  feynman: {
    line: `Your turn, and this one has a trap in it.`,
    instruction: `Explain why exactly as much electricity comes out of a lamp as goes into it — **without using the words "current" or "amps."**`,
    banned: ['current', 'amp'],
    bannedNote: `one of those slipped in — and naming the quantity is not the same as explaining it`,
    placeholder: `Charge can't pile up, so…`,
    checks: [
      `Charge can't collect anywhere and can't disappear.`,
      `So however much passes one point each second passes every point each second.`,
      `What the lamp takes is the energy each charge carries, not the charge.`,
      `Count them leaving and you get the same number; weigh their energy and you don't.`
    ],
    closing: `If your explanation leans on "it can't pile up," you've got the real argument. Everything else in this lesson is bookkeeping on top of that one fact.`
  },

  challenge: {
    voice: 'editor',
    line: `One to test it, one to show you something lovely.`,
    prediction: {
      question: `Two identical lamps, wired one after the other in a single loop. Does the one nearer the battery shine brighter, since it "gets the electricity first"?`,
      options: [
        {
          id: 'first',
          text: `Yes — the first lamp takes its share, so the second gets what's left.`,
          verdict: `This is the most natural guess in the world and it comes from somewhere respectable: that is genuinely how a row of sprinklers on one hose behaves, and how a queue of people sharing a pot of coffee behaves. But those things are being *consumed*. Charge isn't. Both lamps have the identical traffic passing through them each second — they must, or charge would be heaping up between them — so both convert the same energy per second and both are exactly as bright.`
        },
        {
          id: 'same',
          text: `No — both exactly the same brightness.`,
          verdict: `Correct, and the reason is worth saying out loud: it isn't that the lamps share fairly, it's that there is nothing to share. The same current passes through both because it has nowhere else to go, so each one levies the same energy per second and each glows the same. Both will be dimmer than one lamp alone would have been, because together they resist more and the current through the whole loop drops — but dimmer *equally*. There is no first and second in a ring.`
        },
        {
          id: 'second',
          text: `The second one is brighter — it's been pushed through the first already.`,
          verdict: `An interesting instinct, and not a lazy one — you're imagining the push building up, the way pressure builds along a line of dominoes. It's wrong here, but it's wrong in a productive direction, because something *does* drop as you go round: the voltage. Each lamp uses up part of the total push, so the charges arrive at the second lamp having already spent half their energy. But they arrive at the same *rate*, which is what sets the brightness. Equal.`
        }
      ]
    },
    open: {
      question: `Here's a quiet clue that's been sitting in plain sight. To measure voltage you just touch a meter's two probes to two points. To measure current you have to cut the wire and insert the meter into the gap, so that everything goes through it. Why does one instrument demand to be put *inside* the circuit and the other doesn't?`,
      placeholder: `Because current is something that happens at a…`,
      reveal: [
        `Because current is traffic past a point — so to count it, the meter has to **be** that point. Everything must file through it, the way a toll booth has to sit across the road rather than beside it. Voltage is a difference between two places, so a voltmeter only has to sample both places and compare; it can stand off to the side and never be in the way.`,
        `Which means the way you are forced to connect each instrument is telling you what kind of quantity you're measuring. An ammeter goes in series, because it is counting. A voltmeter goes across, because it is comparing. If you ever lose track of which quantity is which, picture the two meters and it comes straight back.`,
        `There's a famous consequence, too. Because an ammeter must carry everything, it is built to be almost a plain piece of wire — and connecting one across a battery instead of in series puts a near-perfect short circuit on it. Every electronics student destroys exactly one meter learning this.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then put it down.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 5 — the last of the week. The cord and the element of a toaster carry exactly the same current, which you now know they must. So why does only one of them glow?`
  },

  routes: [
    { id: 'analogy', body: `A ring road with toll booths on it. Each booth counts cars per minute going past. On a closed ring, in steady traffic, every booth reports the same number — and if one reported fewer, cars would be stacking up somewhere between them, which you would notice. The booths don't consume cars. A booth that collects a fee from each car passing is a lamp: same cars through, every one of them a little poorer.` },
    { id: 'object', body: `Find a necklace, a bead chain or a bike chain and lay it out in a loop on the table. Put a fingertip of each hand at two different places on it, and have someone draw the loop slowly round. Count beads past your left finger for ten seconds, then your right. The same number, necessarily — the beads between your fingers are not multiplying or evaporating. You can feel why the answer has to be equal before you've counted anything.` },
    { id: 'story', body: `There is a device in your bathroom built entirely on this lesson. A GFCI outlet — the one with TEST and RESET buttons — does nothing but compare the current going out on one wire with the current coming back on the other. Today's lesson says those must be equal. If they differ by even five thousandths of an amp, something is wrong: some of the charge is going round by another route, and the most likely other route is a person. It trips in about a fortieth of a second. The whole invention is "these two numbers must match, and if they don't, somebody is being electrocuted."` },
    { id: 'experiment', body: `Get someone to turn a bicycle upside down and pedal it slowly by hand. Pick a spot on the chain where it meets the front sprocket and count links going past in ten seconds. Then count at the back sprocket for ten seconds at the same pedalling rate. The same number of links. The back wheel is doing work — it is driving the wheel round — and it still isn't eating links. Work gets taken out; the chain comes through intact.` },
    { id: 'smaller', body: `Forget the lamp. One question: if ten charges a second go into one end of a plain wire, how many come out the other end? Ten. It has to be ten — any other answer means charge is collecting inside the wire or leaking out of it, and neither happens. Now put a lamp in the middle of that wire and ask again. The lamp doesn't change the answer. It only changes how much *energy* each of those ten is carrying when it leaves.` },
    { id: 'backward', body: `Start with the breakers in your panel and ask why they're rated in amps. Nobody sells a 120-volt breaker, because every circuit in the house is already at 120 and the number would be useless. What a breaker is guarding against is a wire getting hot, and what heats a wire is traffic through it. Work backwards from "the safety device counts traffic, not push" and you arrive at what current is and why it's the number that matters for wire thickness.` }
  ],

  map: [
    { name: `A circuit is a loop`, level: 5 },
    { name: `Open and closed circuits`, level: 4 },
    { name: `Current — the flow`, level: 4 },
    { name: `Voltage — the push`, level: 4 },
    { name: `Potential difference`, level: 4 },
    { name: `Charge`, level: 4 },
    { name: `Energy (from Physics I)`, level: 4 },
    { name: `Series`, level: 3 },
    { name: `Resistance`, level: 2 },
    { name: `Power`, level: 1 },
    { name: `Magnetism`, level: 0 },
    { name: `AC and DC`, level: 0 },
    { name: `Solar cells`, level: 0 }
  ]
}
