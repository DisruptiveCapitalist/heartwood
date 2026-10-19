// Electricity & Energy · Week 2 · Lesson 8 — a path that isn't you.
//
// Measured off the simulation: a fault with no ground leaves the metal case at
// 120 V with 80 mA through whoever touches it, and the breaker sees nothing
// unusual at all. With a ground, the same fault trips it. A GFCI catches a 4 mA
// leak the breaker could never notice.
//
// That last contrast is the lesson's real payoff and it is widely
// misunderstood: a breaker protects wires from overheating, a GFCI protects
// people — and the numbers they act on differ by three orders of magnitude.
// This lesson explains how the protection is meant to work; it is not
// instruction for working on anything, and says so.

export default {
  id: 'lesson-08',
  number: 3,
  week: 2,
  title: `Why the outlet has three holes`,
  openingQuestion: `Two holes are enough to make a loop, and Week 1 established that a loop is all a circuit is. So the third hole is carrying nothing — not now, not yesterday, not for years at a time. Why would anybody run a third wire through every room in the house for something that does nothing?`,
  concept: `A path that isn't you`,

  see: {
    voice: 'professor',
    line: `{name}, start at normal. Then take the fault with no ground, and then the same fault with one — that pair is the whole lesson.`,
    simulation: { id: 'mains', props: { mode: 'outlet' } },
    observations: [
      { text: `Normally, current goes out on **live** and back on **neutral**, and the ground wire carries nothing whatever. That is its usual state, and why it is so easy to forget.` },
      { text: `A fault with **no** ground left the metal case sitting at 120 volts — and the breaker saw nothing wrong, because from its point of view nothing was. The person who touched it became the path.` },
      { text: `The same fault **with** a ground sent a huge current to earth, and the breaker opened instantly. The third wire is not a backup. It is a path deliberately better than you.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third is a distinction almost nobody has straight.`,
    sentences: [
      `**Live** and **neutral** do all the work: out and back, the loop from Week 1. **Ground** is connected to the earth and to any exposed metal, and in normal use it carries nothing at all.`,
      `A fault means the live wire has touched something it should not — typically a metal case. Without a ground, that case simply becomes live and waits. The circuit is not complete until somebody standing on a floor touches it, and then **they** are the missing piece of the loop.`,
      `A breaker and a GFCI protect **different things**. A breaker watches for too much current — fifteen or twenty amps — and its job is to stop wires overheating. A person is in serious danger at about **thirty thousandths** of an amp, which a breaker would never notice. The GFCI watches for something else entirely.`
    ],
    sequence: {
      label: `THREE WIRES, AND TWO KINDS OF PROTECTION`,
      note: `and they are not doing the same job`,
      steps: [
        { name: `Live`, body: `At around 120 volts relative to the earth. This is the one that will hurt you, and the one every switch is supposed to interrupt.` },
        { name: `Neutral`, body: `The return path, held near the earth's voltage. Current flows in it exactly as much as in the live wire — it is not "the safe one", it is simply the way back.` },
        { name: `Ground`, body: `Connected to exposed metal and to the earth. Carries nothing until a fault occurs, and then carries a great deal very briefly.` },
        { name: `The breaker`, body: `Opens at fifteen or twenty amps. It is protecting the **wiring in your walls** from overheating, which is a fire risk rather than a shock risk.` },
        { name: `The GFCI`, body: `Compares what leaves on live with what returns on neutral. A mismatch of about five thousandths of an amp means current is going somewhere else — and it opens in around a fortieth of a second.` },
        { name: `Why both`, body: `One guards the house, the other guards the person. The amounts they act on differ by a factor of around three thousand.` }
      ]
    },
    comparison: {
      label: `A SPILLWAY ON A DAM`,
      body: `A spillway sits dry for years. It carries nothing, it earns nothing, and an accountant looking at a dam might reasonably ask what it is for. It is for the one week in thirty years when the water rises — and on that week it is the difference between a controlled overflow and a catastrophe. The ground wire is a spillway: an expensive, idle, deliberately provided path for something you hope never happens. *Where the analogy stops:* a spillway handles water that was going somewhere regardless. The ground wire's job is to be so much more attractive than you that the current never considers the alternative.`
    },
    naming: `The three are **live** (or hot), **neutral**, and **ground** (or earth). A device that opens the circuit on excess current is a **circuit breaker**, and one that opens on a mismatch between live and neutral is a **GFCI** in North America or an **RCD** in Britain and much of Europe. Some appliances have only two pins and are perfectly safe: these are **double-insulated**, meaning there is no exposed metal that could ever become live, so there is nothing for a ground wire to protect. The symbol for that is a small square inside a square.`,
    formalNames: {
      terms: [
        { term: `Live and neutral`, meaning: `The working pair — out and back. Both carry the full current; the neutral is not a safe wire, only a returning one.` },
        { term: `Ground`, meaning: `A deliberate low-resistance path from exposed metal to the earth. Idle in normal use, and the reason a fault trips something instead of waiting for a person.` },
        { term: `Circuit breaker`, meaning: `Opens on too much current, around 15–20 A. Protects the wiring from overheating — a fire measure, not a shock measure.` },
        { term: `GFCI / RCD`, meaning: `Opens on a mismatch between outgoing and returning current, around 5 mA. Protects a person, and is required where water is nearby.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `Three-pin plugs, and adapters that quietly leave one out.`,
      `An outlet by the sink with TEST and RESET buttons.`,
      `A faint tingle off a metal appliance or a tap.`,
      `A breaker that trips when too much is plugged in.`,
      `A power tool with only two pins and a square-in-a-square symbol.`,
      `An electrician insisting on earthing something during work.`
    ],
    builder: {
      body: `Find a GFCI outlet — bathroom, kitchen, garage, outdoors — and look at the two small buttons. Manufacturers recommend pressing **TEST** about once a month: it deliberately creates a tiny mismatch between the two wires, and the outlet should click off immediately, cutting power to it. Press RESET and it comes back. That is the whole mechanism demonstrating itself on demand, and it is worth doing because a GFCI that has failed gives no sign at all until the day it is needed. If it does not click off, that is something for an electrician.`
    },
    ownPlaceholder: `Somewhere I've met the third wire, or wished I had…`,
    synthesis: `The tingle is the one to take seriously. A small current through you means something is already leaking where it should not — a fault that has not yet become a big one, and precisely what a ground or a GFCI exists to catch before it does.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend what the third hole in an outlet is for — **without using the words "ground" or "earth."**`,
    banned: ['ground', 'earth'],
    bannedNote: `one of those came back — and the idea is about offering a better path, not about a name`,
    placeholder: `If the live wire ever touches the metal case, then…`,
    checks: [
      `Two of the holes carry the current out and back, and that is the working circuit.`,
      `If something breaks inside, the live wire can touch the metal outside of the appliance.`,
      `Without a third wire, the only path for that current is through whoever touches it.`,
      `The third wire gives it a much easier path, so a lot of current flows and the protection switches off.`
    ],
    closing: `"A much easier path than a person" is the whole idea, and it explains why the wire has to be thick and well-connected rather than merely present.`
  },

  challenge: {
    voice: 'editor',
    line: `One about an appliance with two pins, and one about two devices that look similar and are not.`,
    prediction: {
      question: `A power drill or a hairdryer with only **two** pins and no ground. Is it unsafe?`,
      options: [
        {
          id: 'unsafe',
          text: `Yes — everything should be grounded, and two pins means a corner was cut.`,
          verdict: `A reasonable suspicion, and there certainly are badly made two-pin things in the world. But a properly made double-insulated appliance is not one of them. The reasoning you have been following is sound: a fault needs exposed metal to make live. The design answer is to make sure there **is** no exposed metal — a plastic body, and two independent layers of insulation around everything inside.`
        },
        {
          id: 'safe',
          text: `No — if nothing metal is exposed, there is nothing a ground wire could protect.`,
          verdict: `Correct, and it is a genuinely different approach to the same problem rather than a cheaper one. Instead of providing a path for a fault, double insulation makes the fault unable to reach you: two separate layers, so that both would have to fail at once. The square-inside-a-square symbol means exactly this, and such appliances are deliberately not grounded — adding a ground wire would achieve nothing.`
        },
        {
          id: 'depends',
          text: `It depends on what it is — fine for small things, not for anything powerful.`,
          verdict: `Power is a sensible thing to worry about and it does matter for the wiring and the breaker. But it is not what decides this. What decides it is whether there is exposed metal that could become live — which is about the construction, not the wattage. Plenty of powerful tools are double-insulated and plenty of small metal-bodied appliances are grounded.`
        }
      ]
    },
    open: {
      question: `A circuit breaker trips at around **fifteen amps**. A current of about **thirty thousandths** of an amp through a person can be fatal. Those differ by a factor of five hundred. So what is a breaker actually protecting — and what does that leave unprotected?`,
      placeholder: `If it can't notice a person, it must be watching for something else…`,
      reveal: [
        `Your **walls**. A breaker's job is to stop the wiring overheating and setting fire to the house — which is a real and common danger, and exactly Week 1's I²R from Lesson 5 at the scale of a building. Fifteen amps is chosen for the cable, not for you. A person being electrocuted draws a current a breaker could not detect if it tried.`,
        `Which leaves shock entirely unprotected, and is why a second device had to be invented doing something cleverer. A GFCI does not measure how much; it measures **whether out equals back**. In a healthy circuit those are identical to within a hair. If five thousandths of an amp is leaving and not returning, it is going somewhere it should not — down a ground wire, through damp, or through a person — and the device opens in about twenty-five thousandths of a second, which is fast enough to matter.`,
        `It is a nice illustration of a general engineering idea: when the thing you care about is too small to see directly, find something it makes **unequal**. The GFCI never detects a person. It detects a discrepancy, and lets the discrepancy do the arguing. That is also exactly what the medical device in Week 1's Lesson 4 story was doing, and it is the same invention.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about the wiring in my house I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 9: how power crosses a country. Two coils and some iron, no moving parts — and the reason the grid runs at hundreds of thousands of volts rather than the 120 that comes out of your wall.`
  },

  routes: [
    { id: 'analogy', body: `A lightning rod on a church. It does nothing for a century, and on the night it matters it offers the strike a path so much easier than the stonework that the stonework is never considered. Nobody thinks a lightning rod attracts lightning; it offers an alternative. The third wire in your wall is the same idea at a smaller scale and with the same logic — be the easier route, and the dangerous route is never taken.` },
    { id: 'object', body: `Look closely at a three-pin plug. The earth pin is usually **longer** than the other two, which is not decoration: it means that when you push the plug in, the ground connects first, and when you pull it out, it disconnects last. The protection is present before any power is, and still present after the power has gone. Somebody thought carefully about the order of events.` },
    { id: 'story', body: `Grounding was not standard in houses for a long time, and plenty of older homes still have two-wire circuits. The change came gradually through the mid-twentieth century, driven by electrocutions from washing machines, refrigerators and tools — metal-bodied appliances in damp rooms. The pattern of accidents wrote the regulation, which is how most electrical safety rules came to exist.` },
    { id: 'experiment', body: `Look at where GFCI outlets are installed in a house: bathrooms, kitchens, garages, outdoors, near sinks. Then notice where they are not: bedrooms, hallways, living rooms. The map of them is a map of where water and people meet, because damp skin and a wet floor lower the resistance through a person enormously — the same voltage, a much larger current.` },
    { id: 'smaller', body: `Forget wiring. One question: if a current can reach the earth either through a thick copper wire or through a person, which will it take? Overwhelmingly the copper — Lesson 5 said heat and flow follow the easy path, and a wire is thousands of times easier than a body. Now ask what happens if the copper is simply not there, and you have both the fault and the reason for the wire.` },
    { id: 'backward', body: `Start with the fact that bathrooms have different electrical rules from bedrooms in essentially every country. Why would a room change the rules? Because water lowers the resistance of the path through a person by a large factor, so the same voltage drives far more current. Work backwards from "the room matters" and you arrive at resistance, at Ohm's law, and at why the extra protection is required precisely where it is.` }
  ],

  map: [
    { name: `AC and DC`, level: 4 },
    { name: `Power`, level: 4 },
    { name: `A circuit is a loop`, level: 5 },
    { name: `Open and closed circuits`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Potential difference`, level: 5 },
    { name: `Ohm's law`, level: 4 },
    { name: `Magnetism`, level: 1 }
  ]
}
