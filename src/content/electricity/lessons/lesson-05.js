// Electricity & Energy · Week 1 · Lesson 5 — the heat goes where the resistance is.
//
// This is the week's payoff, and it only works because Lesson 4 landed: the
// learner already knows the cord and the element must carry identical current,
// so "why does only one glow" becomes a real puzzle rather than a non-question.
//
// Measured against the live simulation before this copy was written:
//   element 3.0 Ω → 3.64 A, 39.7 W, 1260 °F, cord 189 °F   (glowing)
//   element 9.0 Ω → 1.29 A, 15.0 W,  520 °F, cord  85 °F   (not glowing)
// The glow threshold falls at about 5.25 Ω, so roughly half the slider glows
// and half does not — the learner can find the transition themselves.
//
// The heat ratio is always exactly the resistance ratio (39.7:3.97 = 3.0:0.3),
// because both dissipate I²R on a shared I. The lesson says so, and it is true
// at every setting rather than at the one that was checked.

export default {
  id: 'lesson-05',
  number: 5,
  week: 1,
  title: `Resistance, and why a toaster glows`,
  openingQuestion: `Yesterday you proved that the same current passes every point in a loop. A toaster's cord and its element are points in the same loop. So identical traffic goes through both — and yet the element is glowing orange at over a thousand degrees and the cord, eighteen inches away, is cool enough to coil up and put in a drawer. Same current. What on earth is different?`,
  concept: `Heat appears where the resistance is`,

  see: {
    voice: 'professor',
    line: `{name}, the lamp is gone — in its place a thin element, and the wire feeding it is drawn fat, because today its thickness is the whole point. Make the element thinner and thicker and watch the two temperatures.`,
    simulation: { id: 'circuit-loop', props: { mode: 'resist' } },
    observations: [
      { text: `One current, through both. The readout says so and yesterday's lesson says it has to — the element and the cord are the same loop.` },
      { text: `At a three-ohm element: **1260 °F** and glowing. The fat cord beside it, carrying that identical current, sat at **189 °F** — hot, but nowhere near light.` },
      { text: `And the heats stayed in exactly the ratio of the two resistances. Ten to one in resistance, ten to one in watts. The energy comes out where the going is hard.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third one is the one nobody tells you.`,
    sentences: [
      `**Resistance** is how hard a material makes it to get charge through. The same metal resists more if you make it thinner or longer — less room, further to go — which is why an element is a long thin ribbon and a cord is a fat braid.`,
      `The current in the loop is set by the whole loop: total push divided by total resistance. So adding resistance anywhere slows the traffic **everywhere**, which is why the charges visibly crawled when you thickened the element.`,
      `But the heat is **not** shared out evenly. Each part gives up energy in proportion to its *own* resistance, so a single bottleneck collects nearly all of it. A toaster is a circuit built with one deliberate bottleneck — and the cord is deliberately not one.`
    ],
    comparison: {
      label: `THE NARROWS`,
      body: `A river carries the same cubic metres per second along its whole length; it must, or it would be piling up somewhere. Walk the wide, deep stretch and it is glassy and almost silent. Walk to where the valley pinches into a rocky gorge and it is deafening, white, churning, and the water coming out is measurably warmer than the water going in. Same river, same rate, every second. All the noise and all the heat at the narrows, because that is where the water has to fight. A toaster element is a gorge you installed on purpose, and the cord is the wide stretch upstream.`
    },
    naming: `The unit is the **ohm**, after Georg Ohm, and the relationship you have been operating all week is **Ohm's law**: push equals flow times resistance, V = I × R. Every number in every simulation this week came off that one line. The heating rule is its companion: the power turned into heat in any part of a circuit is **I² × R** — the current squared, times *that part's own* resistance. Since the current is shared, the R is the only thing that differs, and the part with ten times the resistance gets ten times the heat. That is the entire answer to the toaster, and you measured it before you were told it. The alloy in the element is usually **nichrome**, chosen because it resists handsomely and, unlike iron, will glow red-hot for years without burning away.`,
    formalNames: {
      terms: [
        { term: `Ohm`, meaning: `The unit of resistance. One ohm is the resistance that lets one amp through when pushed by one volt.` },
        { term: `Ohm's law`, meaning: `V = I × R. Push, flow, resistance — know two and the third is fixed. It is less a law of nature than a definition that happens to hold beautifully well for metals at steady temperature.` },
        { term: `I²R heating`, meaning: `The heat produced in any part of a circuit: current squared, times that part's own resistance. The reason heat collects at the bottleneck instead of spreading out.` },
        { term: `Nichrome`, meaning: `Nickel and chromium. The alloy in toasters, hair dryers and electric heaters — high resistance, and it survives being orange-hot over and over.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Half the appliances in your house are deliberate bottlenecks. Tap the ones you've noticed getting hot.`,
    items: [
      `The toaster glowing orange inside while its cord stays cool.`,
      `The coil you can see glowing behind a hair dryer's grille.`,
      `An old bulb too hot to touch, and an LED in the same lamp barely warm.`,
      `An extension cord that got genuinely hot under a space heater.`,
      `A phone charger brick that's warm while the cable isn't.`,
      `An electric blanket, which is the same trick turned right down.`
    ],
    builder: {
      body: `Find an old-fashioned incandescent bulb — a dead one is perfect, and better, because you can handle it. Hold it up to the light and find the filament. It is thinner than one of your hairs, and if you could uncoil it (it is coiled, and then that coil is coiled again) it would run to about two feet. Now look at the two fat posts holding it at either end. The same current passed through the posts and the filament, every second that bulb was lit. The posts never glowed. Somebody worked out exactly how thin to make that hair so it would sit at 4,600 °F and not quite melt, and then built it two billion times.`
    },
    ownPlaceholder: `Something electrical that gets hot in one spot…`,
    synthesis: `That's the pattern: everything on that list is a circuit with the resistance put deliberately in one place — and the ones that worry you are the ones where it turned up somewhere you didn't choose.`
  },

  feynman: {
    line: `Teach it. This is the week's real test.`,
    instruction: `Explain why a toaster's element glows while its cord stays cool — **without using the words "resistance" or "ohms."**`,
    banned: ['resist', 'ohm'],
    bannedNote: `one of those came back — and naming it is the easy part; the thin wire is the idea`,
    placeholder: `The same amount goes through both, but…`,
    checks: [
      `The same amount of charge passes through both of them every second.`,
      `The element is thin, so getting through it is hard; the cord is fat, so it's easy.`,
      `Energy gets handed over where the going is hard.`,
      `So the heat piles up at the bottleneck instead of spreading out along the whole wire.`
    ],
    closing: `If you explained it with "thin" and "hard to get through" and never reached for the word, you have it. That was the hardest of the five, and it's done.`
  },

  challenge: {
    voice: 'editor',
    line: `One practical, one that will bother you pleasantly for a day.`,
    prediction: {
      question: `Someone runs a 1,500-watt space heater through a long, thin extension cord instead of plugging it into the wall. What happens?`,
      options: [
        {
          id: 'same',
          text: `Nothing much — it's just a longer wire to the same heater.`,
          verdict: `This is what almost everyone assumes, and for a lamp or a phone charger it's a perfectly good approximation — the cord's resistance is so small next to theirs that it genuinely doesn't matter. The trouble is that a heater's resistance is deliberately low, which makes the cord's resistance no longer negligible by comparison. A thin thirty-foot cord can easily add an ohm, and an ohm is a serious fraction of a heater. The cord stops being invisible.`
        },
        {
          id: 'cordhot',
          text: `The heater runs slightly cooler, and the cord gets hot.`,
          verdict: `Exactly right, and both halves matter. The cord's resistance joins the total, so the current through everything drops a little and the heater puts out somewhat less than its 1,500 watts. Meanwhile that same current is passing through the cord's own resistance, and I²R says the cord is now dissipating real power — tens of watts, spread along a thin braid often coiled up under a rug where the heat can't escape. This is one of the commonest causes of household electrical fires, and it is this lesson, exactly.`
        },
        {
          id: 'cordfine',
          text: `The cord can't get hot — the heat belongs to the heater.`,
          verdict: `There's a sound instinct underneath this: the heater is the thing *designed* to make heat, and the cord is designed not to, so expecting the design intent to hold is reasonable. But nothing in physics knows which part you intended to be the heater. Every part of the loop dissipates I²R, using its own R. The cord's R is small, which is why it's usually fine — small is not zero, and when the current is fifteen amps, a small R is still a warm cord.`
        }
      ]
    },
    open: {
      question: `A 100-watt bulb and a 60-watt bulb, both for the same wall socket. Which one has the **thicker** filament? Think before you answer — most people get this backwards, and the reason is interesting.`,
      placeholder: `The brighter one must have…`,
      reveal: [
        `The **100-watt** bulb has the thicker filament — it has *less* resistance, not more. Both are handed the same 120 volts, so by Ohm's law the one that draws more current must be the easier one to get through. Run the numbers: at 120 volts, 100 watts needs 144 ohms and 60 watts needs 240. The brighter bulb resists less.`,
        `That feels wrong because the week's last lesson said heat goes where the resistance is — and it does, *when the current is shared*. Here it isn't shared: the voltage is what's shared, because each bulb is connected straight across the same socket. With voltage fixed, power is V²/R and less resistance means more power. With current fixed, power is I²R and more resistance means more power. Same two rules, opposite conclusions, depending on which quantity is being held still.`,
        `And here is the part worth keeping. Wire those two bulbs **in series**, one after the other, and now they are forced to share a current — so the rule flips, and the **60-watt** bulb glows brighter than the 100. Same two bulbs, opposite answer. Nothing changed but what they had in common. That is the whole of Week 1 in one observation: push, flow and resistance only mean something in relation to each other.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that's the week.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `That's Week 1. You have the four ideas the rest of the course is built from: the loop, the push, the flow, and the fight. Week 2 moves into the house — starting with what the electric bill actually counts, which turns out not to be any of the four.`
  },

  routes: [
    { id: 'analogy', body: `Let a rope run through your loosely closed hands — easy, and nothing happens. Now grip it hard and let it run again. The rope still moves at the same speed along its entire length, from the coil on the floor to the far end; nothing about the rope has changed. But your palms burn. The heat is where the grip is, because that's where the rope had to fight to get through. A toaster element is a tight grip on the charge, and a cord is a loose one.` },
    { id: 'object', body: `Pick up your phone charger while it's charging. The brick is warm; the cable going to the phone is not. The same current is passing through the cable and through the brick — it's one circuit, and yesterday settled that. The warmth is sitting in the part where the work is hard. You are holding the lesson, and if the cable is ever the warm part, something is wrong with that cable.` },
    { id: 'story', body: `Georg Ohm published the law in 1827 and it went badly. The German physical establishment thought measurement was beneath philosophy and dismissed him as a crank; he resigned his teaching post in something close to disgrace and spent years out of favour. The law was too useful to stay buried — the Royal Society gave him the Copley Medal in 1841, and his name is now on every resistor in every device you own. Fourteen years is a long time to be right in private.` },
    { id: 'experiment', body: `Switch on a table lamp with an ordinary bulb and leave it for ten minutes. Now bring the back of your hand slowly towards the shade until you can feel the heat — close, but don't touch. Then run your fingers along the cord from the plug to the base. Cold, the whole way. The identical current went down that cord and through that filament for ten solid minutes. One of them is at four thousand degrees and the other is at room temperature.` },
    { id: 'smaller', body: `Forget toasters. Two wires joined end to end, one easy to get through and one hard, with the same charge passing through both every second. One question: where does the energy get handed over — in the easy one, or the hard one? In the hard one, obviously; that's what "hard" means. And energy handed over in a wire has nowhere to go but heat. That's the lesson. The toaster is just that, with the hard part coiled up behind a grille.` },
    { id: 'backward', body: `Start from the fact that thick electrical wire costs much more than thin, and that the building code insists on it anyway for a dryer or a stove. Nobody spends that money for elegance. They spend it because a thin wire carrying a big current gets hot, and the code is written in houses that burned down. Work backwards from "thickness is bought to prevent heat" and you have resistance, and you have why it heats, and you have why the toaster's own element is as thin as they could make it.` }
  ],

  map: [
    { name: `A circuit is a loop`, level: 5 },
    { name: `Open and closed circuits`, level: 4 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Potential difference`, level: 4 },
    { name: `Resistance`, level: 4, fresh: true },
    { name: `Ohm's law`, level: 3, fresh: true },
    { name: `Charge`, level: 4 },
    { name: `Energy (from Physics I)`, level: 5 },
    { name: `Series`, level: 3 },
    { name: `Power`, level: 2 },
    { name: `Magnetism`, level: 0 },
    { name: `AC and DC`, level: 0 },
    { name: `Solar cells`, level: 0 }
  ]
}
