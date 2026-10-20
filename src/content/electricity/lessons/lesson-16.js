// Electricity & Energy · Week 4 · Lesson 16 — light knocks something loose.
//
// Measured off the simulation. Silicon's band gap is 1.12 eV, and a photon's
// energy is 1239.84 / wavelength in nanometres:
//
//    350 nm  3.54 eV   32% of the photon used, the rest becomes heat
//    550 nm  2.25 eV   50%
//    900 nm  1.38 eV   81%
//   1107 nm  1.12 eV   100% — the one wavelength silicon uses perfectly
//   1500 nm  0.83 eV   nothing at all; it passes straight through
//
// The brightness control is in the simulation to be disappointing. It
// multiplies the current and changes the per-photon verdict not at all, and at
// 1,500 nm it can be taken to 100% with no effect whatever. That is the
// quantum point, and it is the whole lesson.
//
// The energy budget shown as a bar is the standard accounting for silicon
// under the AM1.5 spectrum: 19% too red to be absorbed, 33% lost as heat from
// photons with energy to spare, about 15% lost inside the cell, leaving the
// 33% Shockley-Queisser ceiling. Real panels reach 20-23%.

export default {
  id: 'lesson-16',
  number: 1,
  week: 4,
  title: `From sunlight to electricity`,
  openingQuestion: `Three weeks of this course have been machinery — coils, magnets, shafts, steam. A solar panel has none of it. Nothing turns, nothing is hot, nothing moves at all, and yet electricity comes out of a sheet of glass lying still on a roof. What is light actually doing to the silicon?`,
  concept: `Colour, not brightness`,

  see: {
    voice: 'professor',
    line: `{name}, take the wavelength out to far infrared — 1,500 nm. Now turn the brightness up to 100%. Watch what happens, which is nothing.`,
    simulation: { id: 'photon' },
    observations: [
      { text: `Silicon needs **1.12 eV** to free an electron. A photon at 1,500 nm carries 0.83 eV and passes straight through the cell as if it were glass — and **no amount of brightness changes that**.` },
      { text: `An ultraviolet photon at 350 nm carries 3.54 eV, more than three times what is needed. It still frees **exactly one electron**, and the surplus 2.42 eV becomes heat.` },
      { text: `So the best wavelength for silicon is **1,107 nm** — just barely enough, with almost nothing wasted. Violet light is not better than red. It is more wasteful.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The first one is the thing Einstein got his Nobel Prize for, and it is not relativity.`,
    sentences: [
      `Light arrives in **lumps**. A beam of light is not a continuous flow that can be turned up and down smoothly; it is a stream of individual photons, each carrying a fixed amount of energy set entirely by its **colour**. Red photons are weak ones, blue photons are strong ones, and that is true no matter how bright or dim the light is.`,
      `To free an electron in silicon, **one photon must carry enough on its own** — 1.12 electronvolts, the band gap. Two photons that each carry half will not do it between them; they are not working together, and each either succeeds alone or fails alone. This is why brightness changes how **many** electrons you get and never changes **whether** you get any.`,
      `And a photon with more than enough does not do more. It frees one electron, and **the surplus becomes heat**. So the sun's energy is lost at both ends: the red end passes through unused, and the blue end is partly wasted warming the panel up. Those two losses alone account for about half of all the sunlight that lands on a cell.`
    ],
    sequence: {
      label: `WHERE A THOUSAND WATTS OF SUNLIGHT ACTUALLY GOES`,
      note: `per square metre of silicon, in full sun — follow the subtractions`,
      steps: [
        { name: `1,000 W arrives`, body: `Full midday sun on a clear day, which is the standard figure everything about panels is quoted against.` },
        { name: `190 W is too red`, body: `Every photon beyond 1,107 nm carries less than 1.12 eV and cannot free anything. It passes through the cell entirely unused. About 19% of the sunlight, gone before the cell has done anything wrong.` },
        { name: `330 W becomes heat`, body: `The surplus carried by every photon that **was** energetic enough. A green photon gives up half of itself this way. This is why panels get hot in sun — the heat is not a side effect, it is a loss mechanism.` },
        { name: `About 150 W is lost inside`, body: `The cell cannot deliver the full band-gap voltage, and the curve it works on is not square. Lesson 20 is entirely about this part.` },
        { name: `330 W is the ceiling`, body: `Roughly a third, and it is a hard theoretical limit for single-junction silicon called the **Shockley-Queisser limit**. No manufacturing improvement gets past it.` },
        { name: `200 to 230 W is real`, body: `What a good commercial panel actually delivers — 20 to 23% efficiency. Closer to the theoretical ceiling than most people assume, and the gap left is small.` }
      ]
    },
    comparison: {
      label: `A COIN-OPERATED TURNSTILE`,
      body: `Imagine a turnstile that opens for one pound and has no change mechanism and no slot for anything smaller. Feed it a fifty-pence piece and nothing happens. Feed it a thousand fifty-pence pieces, one after another, and still nothing happens — they do not accumulate, because the machine rejects each one individually. Now feed it a twenty-pound note: the turnstile opens once, and keeps the change. One person through, nineteen pounds gone. The band gap is the one-pound price, the coins are photons, and the fact that the machine keeps the change is why panels get hot. *Where the analogy stops:* a real turnstile could easily be built to give change or to count up small coins, and we would call a machine that behaved this way broken. Nature does not offer the option. Energy in light genuinely only comes in these indivisible amounts, and the whole of quantum mechanics grew out of noticing it.`
    },
    naming: `The minimum energy needed to free an electron in a material is its **band gap**, measured in **electronvolts** — one eV being the energy an electron gains falling through one volt. For silicon it is 1.12 eV. Light producing current this way is the **photovoltaic effect**; the closely related business of light knocking electrons clean out of a metal is the **photoelectric effect**, and explaining it is what Einstein received the Nobel Prize for in 1921. The surplus energy lost as heat is **thermalisation**, and the roughly 33% theoretical ceiling for one-junction silicon is the **Shockley-Queisser limit**. One honest note: that ceiling applies to a single junction. Stacking materials with different band gaps — a **tandem** or **multi-junction** cell — catches the red light that silicon misses and the blue light it wastes, and such cells have passed 47% in laboratories.`,
    formalNames: {
      terms: [
        { term: `Band gap`, meaning: `The minimum energy one photon must carry to free an electron. 1.12 eV for silicon, which corresponds to a wavelength of 1,107 nm.` },
        { term: `Photon`, meaning: `One indivisible lump of light. Its energy is set by its colour alone, and it either succeeds on its own or does nothing.` },
        { term: `Photovoltaic effect`, meaning: `Light freeing charge inside a material and producing a voltage. Discovered in 1839 and unexplained for sixty-six years.` },
        { term: `Shockley-Queisser limit`, meaning: `About 33% for single-junction silicon — a ceiling set by physics, not by manufacturing. Good panels reach 20-23%.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've noticed.`,
    items: [
      `A solar panel that is hot to the touch on a sunny day.`,
      `A calculator with a little solar strip that works in a lit room.`,
      `A garden light that charges all day and dies by midnight.`,
      `Sunburn on a cloudy day, when it did not feel hot.`,
      `A phone that charges more slowly when it gets warm.`,
      `Automatic doors or taps that sense you without touching.`
    ],
    builder: {
      body: `The sunburn one is the best because it is this lesson in your own skin. You can sit in front of a roaring fire and never burn, however hot you get — infrared photons simply do not carry enough energy to damage DNA, and there is no quantity of them that will. But you can burn badly on a cool, overcast day, because ultraviolet photons each carry enough on their own and some get through the cloud. Heat and damage turn out to be completely unrelated. Your skin has a band gap too, and it is in the ultraviolet.`
    },
    ownPlaceholder: `Something where the colour of the light mattered, not the amount…`,
    synthesis: `That is the whole lesson transferred to another material. A threshold set by the energy of a single photon, below which nothing happens at any intensity, and above which each one acts alone. Silicon's threshold is in the infrared, and your skin's is in the ultraviolet.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why a very bright infrared lamp produces nothing from a solar panel — **without using the words "photon" or "band gap."**`,
    banned: ['photon', 'band gap'],
    bannedNote: `one of those came back — and the argument works with lumps and a threshold`,
    placeholder: `Light arrives in separate little packets, and each one…`,
    checks: [
      `Light arrives in separate lumps, and each lump's energy is set by its colour.`,
      `Silicon needs a single lump to carry enough on its own to free an electron.`,
      `Weak red lumps cannot do it, and piling up more of them never helps.`,
      `A lump with energy to spare still frees only one, and the surplus becomes heat.`
    ],
    closing: `If your version has "more of them doesn't help," you have the part that broke classical physics — and the reason panels are rated by the light that falls on them rather than by how hot they feel.`
  },

  challenge: {
    voice: 'editor',
    line: `One about what makes a good day for a panel, and one about the obvious fix.`,
    prediction: {
      question: `Would a solar panel produce **more** electricity if you lit it with pure violet light instead of pure red light, at the same number of watts per square metre?`,
      options: [
        {
          id: 'less',
          text: `Less — violet photons waste most of their energy as heat.`,
          verdict: `Correct, and it catches almost everyone out. At the same watts per square metre, violet light at 400 nm arrives as far **fewer**, individually stronger lumps than red light at 700 nm. Each one still frees exactly one electron, so fewer lumps means fewer electrons means less current — and each violet photon throws away about 64% of itself as heat where the red one throws away 37%. Same energy in, less electricity out, and a hotter panel. Silicon's ideal illumination is deep red, just above the threshold.`
        },
        {
          id: 'more',
          text: `More — violet light is more energetic, so it must do more.`,
          verdict: `The instinct is reasonable: violet photons genuinely are more energetic, and in almost any other context more energy per unit means more effect. But the cell counts **electrons**, not energy, and each photon frees exactly one regardless of how much it brought. Fixing the watts per square metre fixes the total energy, so stronger photons necessarily means fewer of them — and fewer freed electrons. The extra energy does not vanish; it becomes heat, which makes things worse again.`
        },
        {
          id: 'same',
          text: `The same — the same watts went in either way.`,
          verdict: `This would be right for almost any other energy conversion, and it is exactly the classical expectation that the photoelectric effect demolished in 1905. A boiler does not care what colour the heat arrives as. But a solar cell is not responding to energy in bulk — it is responding to individual arrivals, one at a time, each judged against a threshold. Once a process works photon by photon, the division of energy into lumps matters enormously, and equal watts stop being equal.`
        }
      ]
    },
    open: {
      question: `Silicon wastes the light at both ends — infrared passes through, and the surplus from blue light becomes heat. Both losses come from having **one** band gap. Can you see the obvious fix, and why it is not on every roof?`,
      placeholder: `If one threshold wastes both ends, perhaps more than one…`,
      reveal: [
        `Stack them. Put a wide-gap material on top that absorbs the blue and violet efficiently and lets everything redder pass through, and a narrow-gap material underneath to catch what comes through. Each layer handles the part of the spectrum it suits, and the thermalisation loss collapses because no photon is being handled by a material far too greedy for it. These are **tandem** or **multi-junction** cells.`,
        `They work extremely well. Laboratory multi-junction cells have passed 47%, far beyond the 33% ceiling for single-junction silicon, and they are standard on satellites where launch weight is worth far more than the cell costs. The physics has been settled for decades.`,
        `What stops them is money and lifespan. Each layer must be grown with its crystal structure matched to the next, and the materials are expensive and sometimes scarce. For a satellite that is irrelevant; for a roof, ordinary silicon at a fifth of the price and 22% efficiency wins easily — you simply fit more of it. The real contender now is **perovskite on silicon**, a cheap tandem that has reached about 34% in the laboratory. Its difficulty is not efficiency but durability: panels are sold with twenty-five-year warranties, and perovskites have historically degraded in months. That, rather than physics, is what the field is working on. Tomorrow, though, we go back to something Lesson 16 quietly left unexplained — the freed electron, and why it does not simply fall straight back.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about light or solar panels that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 17 — the part today left out. A photon frees an electron, and then the electron falls straight back where it came from a few billionths of a second later. A plain slab of silicon in full sun produces nothing at all. Something has to catch the electron first.`
  },

  routes: [
    { id: 'analogy', body: `A vending machine that takes only one-pound coins and gives no change. Fifty-pence pieces do nothing, and a bucket of them still does nothing, because the machine judges each coin separately and rejects it. A twenty-pound note buys one item and the machine keeps the rest. The band gap is the price, photons are the coins, and the kept change is the heat in your panel.` },
    { id: 'object', body: `A pocket calculator with a solar strip works indoors under a lamp and stops in a dim corridor — it needs very little current but it does need photons of the right sort. Now think of a TV remote control, which floods the room with infrared every time you press it. Point one at a solar garden light all night and it will not charge by a measurable amount, because every one of those photons is below the threshold.` },
    { id: 'story', body: `Edmond Becquerel found the photovoltaic effect in 1839, aged nineteen, and nobody could explain it for sixty-six years. The problem was that classical physics insisted brighter light should free more energetic electrons, and experiments stubbornly said brightness changed only the number while colour changed the energy. Einstein's 1905 paper resolved it by proposing that light itself comes in lumps — and that paper, not relativity, is what his Nobel Prize cites.` },
    { id: 'experiment', body: `You cannot easily do this one at home, but you can see its shadow. Compare how fast a solar garden light charges on a bright overcast day against a dim but clear evening. Cloud scatters light without changing its colour much, so output follows brightness. Then notice that the same light sitting behind ordinary window glass still charges, while one behind a window with a strong infrared-blocking coating does noticeably worse — the glass is removing a part of the spectrum silicon was using.` },
    { id: 'smaller', body: `Forget efficiency, limits and spectra. Two sentences: light comes in separate lumps, and each lump must carry enough energy on its own to free one electron. Too weak and nothing happens however many arrive; too strong and the extra is simply wasted as heat. Everything else in this lesson is arithmetic attached to those two facts.` },
    { id: 'backward', body: `Start from a fact you can check: solar panels get hot in the sun, and a hot panel is a less efficient panel. Where does the heat come from? Not friction — nothing moves. Not resistance alone — it happens even with nothing connected. It must be arriving with the light and failing to leave as electricity. Work backwards from the heat and you arrive at photons carrying more than silicon can use.` }
  ],

  map: [
    { name: `Sunlight to electricity`, level: 3 },
    { name: `Semiconductors`, level: 2 },
    { name: `The grid`, level: 5 },
    { name: `Induction`, level: 5 },
    { name: `Generators`, level: 5 },
    { name: `Magnetism`, level: 5 },
    { name: `AC and DC`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
