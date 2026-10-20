// Electricity & Energy · Week 4 · Lesson 17 — the one-way door.
//
// Lesson 16 ended with a problem it could not solve: a photon frees an
// electron, and the electron falls straight back a few billionths of a second
// later. A slab of pure silicon in full sun gets warm and does nothing else.
//
// This lesson is the missing half. Silicon has four outer electrons; phosphorus
// has five, so one is spare (N-type), and boron has three, so one is missing
// (P-type, and the gap behaves as a positive carrier). Join the two and
// electrons near the boundary fall into holes, leaving charged atoms behind and
// building a permanent field of about 0.7 V across a zone a fraction of a
// micron thick.
//
// That field is the one-way door. It sweeps the freed electron to the N side
// before it can fall back, and the hole to the P side, and they cannot return
// across it. A real silicon cell gives about 0.69 V — which is why Lesson 19
// needs 54 of them in series to reach 37 volts.
//
// The simulation's last control takes the doping away and shines the same light
// on undoped silicon. Nothing comes out but heat, which is the proof.

export default {
  id: 'lesson-17',
  number: 2,
  week: 4,
  title: `P-type and N-type silicon: the one-way door`,
  openingQuestion: `Yesterday a photon freed an electron inside silicon — and then nothing happened, because the electron fell back into the gap it came from a few billionths of a second later. A pure silicon wafer in blazing sun produces no electricity at all. So what turns a warm piece of sand into a power station?`,
  concept: `A field nobody switched on`,

  see: {
    voice: 'professor',
    line: `{name}, step through to the end so the light is on. Then take the doping away and watch the same photon arrive at undoped silicon.`,
    simulation: { id: 'junction' },
    observations: [
      { text: `Two deliberate impurities, about **one atom in a million**. Phosphorus has one electron too many for the crystal; boron has one too few. Neither alone does anything interesting.` },
      { text: `Join them and electrons near the boundary fall into holes, leaving charged atoms behind. That builds a permanent **0.7 volt field** across a zone thinner than a micron — and nothing switched it on.` },
      { text: `**Take the doping away and the same light produces nothing but heat.** The electron is freed exactly as before and falls straight back. The field is the entire difference.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The second is the one to hold on to — the field builds itself.`,
    sentences: [
      `Silicon has **four outer electrons** and in a perfect crystal every one is shared with a neighbour, so nothing is free to move. Replace a few atoms with **phosphorus**, which has five, and the spare electrons wander freely — N-type. Replace a few with **boron**, which has three, and there are unfilled bonds that neighbouring electrons hop into, so the **gap** travels instead — P-type.`,
      `Put the two kinds together and the boundary does something **by itself**. Spare electrons from the N side fall into nearby holes on the P side, and both disappear. What is left is a thin zone with no free carriers but with charged atoms stranded on either side — and those charges make an electric field. Nobody applied it, nobody connected a battery; it is a consequence of the junction existing.`,
      `That field is a **one-way door**. When a photon frees an electron near the junction, the field sweeps it to the N side and the hole to the P side before they can recombine, and they cannot get back. Charge piled up on two sides with no path between them is exactly what a voltage is — about 0.69 volts for a silicon cell — and a wire gives it somewhere to go.`
    ],
    sequence: {
      label: `WHY A SOLAR CELL IS A DIODE WITH A WINDOW`,
      note: `the same junction, doing the same thing, in two different devices`,
      steps: [
        { name: `A diode is this junction`, body: `P-type on one side, N-type on the other. The built-in field lets current pass one way and blocks it the other, which is all a diode is.` },
        { name: `In the dark they are identical`, body: `Cover a solar cell completely and measure it with a meter: it behaves as an ordinary diode. The two devices are not similar. They are the same component.` },
        { name: `Light adds a current`, body: `Photons free pairs, the field separates them, and a current appears that was not there before — flowing in the direction the diode normally blocks.` },
        { name: `So the cell is built flat and wide`, body: `A diode wants to be small and cheap; a cell wants to catch photons, so it is a thin wafer the size of your hand with a window instead of a black plastic case.` },
        { name: `And the junction sits near the top`, body: `Within a micron of the lit surface, because a pair freed deep in the wafer recombines before it reaches the field. Depth is the enemy.` },
        { name: `The fine lines are the collectors`, body: `Those silver fingers on every cell carry the freed electrons away. They shade a little of the cell, which is a real cost — so they are made as thin as can be managed.` }
      ]
    },
    comparison: {
      label: `A FISH LADDER, AND A WEIR`,
      body: `Picture a weir across a river with a fish ladder that only works upstream — fish can climb it, but the current over the weir is far too strong for them to come back down that way. Over time, fish accumulate on the upstream side, not because anything is herding them but because the geometry allows one direction and forbids the other. Nobody is pumping; the arrangement does it. The junction's field is that weir, the freed electrons are the fish, and the piling-up on one side is the voltage. *Where the analogy stops:* fish swim deliberately and electrons do not — they are shoved by the field, with no preference of their own. And there is a harder limit the analogy hides: the pile cannot grow indefinitely. As charge accumulates it opposes the very field that is separating it, which is why a silicon cell stops at about 0.69 volts and no illumination, however fierce, pushes one cell much past it.`
    },
    naming: `Adding deliberate impurities is **doping**, and the impurities are **dopants** — phosphorus for N-type, boron for P-type, at roughly one atom in a million. The carrier-free zone at the boundary is the **depletion region**, and the voltage across it is the **built-in potential**, about 0.7 V in silicon. The junction itself is a **PN junction**, and a component built as nothing but a PN junction is a **diode**. A material that can be made to conduct in this controlled way is a **semiconductor**, and this junction is the foundation of every transistor, chip and LED as well as every solar cell. One honest note: the hole is a bookkeeping device. Nothing positive is actually travelling — what moves is a succession of electrons hopping into a vacancy, which shifts the vacancy the other way. Treating the absence as a positive particle gives exactly the right answers, and physicists use it without embarrassment.`,
    formalNames: {
      terms: [
        { term: `Doping`, meaning: `Adding about one impurity atom per million to give silicon spare electrons (N-type, phosphorus) or spare vacancies (P-type, boron).` },
        { term: `Hole`, meaning: `A missing electron, which behaves exactly like a positive carrier. Nothing positive moves — the vacancy travels as electrons hop into it.` },
        { term: `Depletion region`, meaning: `The thin zone at the junction with no free carriers, holding the built-in field of about 0.7 V. Thinner than a micron.` },
        { term: `PN junction`, meaning: `P-type and N-type silicon joined. A one-way door for current, and the foundation of the diode, the transistor, the LED and the solar cell alike.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `An LED indicator that only lights when plugged in one way round.`,
      `The silver lines printed across every solar cell.`,
      `A phone charger block that gets slightly warm.`,
      `Silicon chips described as being made from sand.`,
      `A solar cell that looks dark blue or almost black.`,
      `A clean room where workers wear full-body suits.`
    ],
    builder: {
      body: `Look closely at any solar panel you can get near and find the fine silver lines running across each cell, with one or two thicker bars crossing them. Those are the collectors, and this lesson explains a tension you can see: they must be numerous enough that a freed electron does not have far to travel through thin silicon to reach one, and thin enough that they do not shade the cell they serve. Every manufacturer is solving the same optimisation, and you can watch the answer change over the years — older panels have thick white-looking bars, newer ones have many more much finer lines, and the newest hide the wiring on the back entirely.`
    },
    ownPlaceholder: `Something with a semiconductor in it that I'd never thought about…`,
    synthesis: `The near-black colour is worth a thought too. Bare polished silicon is a shiny grey and reflects about a third of the light that hits it — which would be a third of the output thrown away. The dark blue is an anti-reflection coating, and the newest cells add a textured surface so light that does bounce gets a second chance.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why pure silicon in sunlight does nothing but get warm, while doped silicon makes electricity — **without using the words "field" or "junction."**`,
    banned: ['field', 'junction'],
    bannedNote: `one of those came back — and the story works with spare electrons and gaps`,
    placeholder: `In pure silicon the freed electron just drops back, but if you add…`,
    checks: [
      `In pure silicon a freed electron falls straight back where it came from.`,
      `Adding two different impurities gives one side spare electrons and the other side gaps.`,
      `Where the two meet, charges separate and build a permanent one-way push.`,
      `That push drags freed electrons to one side before they can fall back, and that is a voltage.`
    ],
    closing: `If your version has "it can't get back," you have the whole of it — and you now know what the inside of every chip in your house is doing as well.`
  },

  challenge: {
    voice: 'editor',
    line: `One about how much a cell can give, and one about why this took so long.`,
    prediction: {
      question: `One silicon cell gives about 0.69 volts. What happens to that voltage if you make the cell **four times bigger**?`,
      options: [
        {
          id: 'same',
          text: `Nothing — it still gives about 0.69 volts.`,
          verdict: `Correct, and it is the most useful fact in the whole of panel design. The voltage is set by the energy step an electron takes crossing the junction, which is a property of the **material**, not the area. A cell the size of a postage stamp and a cell the size of a dinner plate both sit at about 0.69 volts. What area buys you is **current** — four times the area catches four times the photons and frees four times the electrons. Area gives amps; only stacking cells in series gives volts, which is exactly why Lesson 19 wires 54 of them together to reach 37 V.`
        },
        {
          id: 'four',
          text: `It quadruples — four times the cell, four times the voltage.`,
          verdict: `Reasonable, and wrong in a way worth understanding. Making something bigger usually gives more of whatever it produces, so quadrupling feels safe. But voltage is a measure of how much energy each individual charge carries, not how many charges there are — and every electron crossing this junction takes the same single step, set by silicon's band gap. A bigger cell has more electrons each taking that same step. More of them is current; a bigger step would need a different material.`
        },
        {
          id: 'double',
          text: `It doubles — the voltage goes with the width rather than the area.`,
          verdict: `This at least recognises that area and voltage need not scale together, which is the right instinct. But neither dimension affects it. The step an electron takes across the junction is identical whether the cell is a centimetre or a metre across, because it depends on silicon's band gap and the doping levels and nothing else. Widen the cell as much as you like and every electron still falls through the same 0.69 volts — there are just more of them doing it, which is current.`
        }
      ]
    },
    open: {
      question: `The photovoltaic effect was discovered in 1839 and silicon is the second most abundant element in the Earth's crust. Why did practical solar cells not appear until 1954, and why were they ruinously expensive for decades after?`,
      placeholder: `Perhaps the difficulty is not the physics but the material…`,
      reveal: [
        `Because this lesson needs something extraordinarily difficult: silicon pure enough that your deliberate one-in-a-million impurity is the **only** impurity. Ordinary industrial silicon is riddled with contaminants at far higher concentrations than the dopant you want. Any stray atom becomes a place where a freed electron and a hole can meet and recombine, undoing the separation the junction just achieved. The wafer must be a single crystal, grown slowly from a melt as one continuous lattice, with impurities measured in parts per billion.`,
        `None of that existed in 1839, or in 1900. It arrived as a by-product of the transistor, which needs the same material for the same reason, and Bell Labs built the first useful silicon solar cell in 1954 at about 6% efficiency. It cost roughly 300 dollars per watt — about 3,000 dollars in today's money for enough to run one light bulb. The only customer who did not care was the space programme, where the alternative was carrying batteries up.`,
        `What happened next is one of the steepest cost declines ever recorded for a manufactured product. Panels have fallen by more than 99.9% per watt since 1975, and by about 90% in the last fifteen years alone. The physics in this lesson has not changed at all since 1954; the entire story is manufacturing scale, purity and yield. Tomorrow we look at what happens when one cell in a panel is shaded — and discover that the answer is far worse than you would guess, for a reason you already met with Christmas lights in Week 2.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about how a solar cell works that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 18 — a single leaf. One cell of fifty-four is shaded, and the panel's output does not drop by a fifty-fourth. It can drop to nothing at all, and the reason is an old friend from Week 2.`
  },

  routes: [
    { id: 'analogy', body: `A turnstile at the top of a one-way escalator. People arrive, go through, and cannot come back — not because anyone is stopping them but because the arrangement only permits one direction. Over an afternoon the far side fills up. The junction's built-in field is that escalator, freed electrons are the people, and the crowd on the far side is the voltage. Nobody is pushing; the geometry does it.` },
    { id: 'object', body: `An LED is this lesson running backwards. It is a PN junction too, and instead of light freeing charges to make a current, a current pushes charges across the junction and they give up their energy as light. The colour of the LED tells you the band gap of its material directly — blue LEDs were a Nobel Prize in 2014 precisely because a wide enough gap in a material you could actually grow took thirty years to find.` },
    { id: 'story', body: `Bell Labs built the first practical silicon solar cell in 1954, almost by accident, while testing silicon for transistors. They noticed a sample producing current when the laboratory lights were on. The New York Times called it the beginning of a new era, which it was, although at 300 dollars a watt the only buyer for twenty years was the space programme, where carrying batteries up was the only alternative.` },
    { id: 'experiment', body: `Find any small solar cell — a garden light, a cheap toy — and put a multimeter across it. In full sun you will read something close to 0.6 volts per cell, and the reading barely changes if you shade half of it. Then measure the current instead: that drops immediately and roughly in proportion to how much you covered. Voltage comes from the material, current comes from the area, and you can prove both in a minute.` },
    { id: 'smaller', body: `Forget doping, depletion and holes. Two sentences: light knocks an electron loose, and in plain silicon it falls straight back. Mixing two slightly different kinds of silicon builds a permanent one-way push at the boundary, which drags the electron away before it can fall back — and charge held apart is a voltage.` },
    { id: 'backward', body: `Start from a fact you can check with a meter: a solar cell in the dark behaves exactly like an ordinary diode, passing current one way and blocking the other. So whatever makes it a solar cell is not an extra component — it is the same one-way structure, with a window cut in the packaging. Work backwards from the diode and you arrive at a junction that was always asymmetric, and light simply gives it something to separate.` }
  ],

  map: [
    { name: `Semiconductors`, level: 4 },
    { name: `Sunlight to electricity`, level: 4 },
    { name: `The grid`, level: 5 },
    { name: `Induction`, level: 5 },
    { name: `Generators`, level: 5 },
    { name: `Magnetism`, level: 5 },
    { name: `AC and DC`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
