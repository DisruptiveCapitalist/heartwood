// Electricity & Energy · Week 4 · Lesson 18 — one cell of fifty-four.
//
// Measured off the simulation, one 402 W panel at standard conditions:
//
//   shaded   no diodes   with diodes            heat in that one cell
//      0%      402 W       402 W                      0 W
//     20%      322 W       322 W                     80 W
//     50%      201 W       268 W  (bypassing)       125 W   ← the worst case
//     80%       80 W       268 W  (bypassing)        80 W
//    100%        0 W       268 W  (bypassing)         0 W
//
// Two things here are worth the whole lesson. The first is that one fully
// shaded cell out of fifty-four takes the panel to ZERO without bypass diodes,
// which is Week 2's Lesson 10 — the Christmas lights — at a scale that costs
// money.
//
// The second is the hot-spot column, and it is genuinely counterintuitive: the
// worst case is not full shade but HALF shade. The heat forced into the shaded
// cell is current times reverse voltage, and full shade leaves no current to
// force. The product peaks at 50%, at about 125 W concentrated in one
// six-inch square of silicon.

export default {
  id: 'lesson-18',
  number: 3,
  week: 4,
  title: `Why a shaded corner hurts the whole panel`,
  openingQuestion: `A panel has fifty-four cells. A leaf blows onto it and covers one of them completely — about two per cent of the surface. Common sense says you lose about two per cent of the output. Common sense is wrong here by a margin that has ruined people's installations, and you already met the reason in Week 2.`,
  concept: `The worst cell sets the current`,

  see: {
    voice: 'professor',
    line: `{name}, take the bypass diodes out first. Then cover one cell completely and read the output. Then put the diodes back.`,
    simulation: { id: 'panel-array', props: { mode: 'shading' } },
    observations: [
      { text: `**One cell of fifty-four, fully shaded, with no bypass diodes: the panel makes nothing at all.** Not 98%. Zero. The cells are in series, so they must all carry the same current.` },
      { text: `Put the **bypass diodes** back and the same leaf costs you one third — 268 W of 402. The diode opens a path around the ruined third and the other two keep working.` },
      { text: `And the heat forced into the shaded cell is worst at **half shade, not full** — about 125 W into one six-inch square. Full shade passes no current, so there is nothing left to force.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first is Lesson 10 returning with a bill attached.`,
    sentences: [
      `Cells in a panel are wired **in series**, and a series circuit has one current that passes through every element. So every cell must carry the same amps as every other, and a cell that cannot supply that current **limits all of them**. Fifty-three cells in full sun are throttled to whatever the one in shadow can manage, exactly as one dead bulb used to take out a whole string of Christmas lights.`,
      `A shaded cell is worse than a dead one, because the others **push current backwards through it**. It stops being a source and becomes a resistor with the rest of the panel's voltage across it, turning that power into heat in one small square. That is a **hot spot**, and it can crack glass, melt the backsheet and start fires — which is why this is a safety matter and not only a yield one.`,
      `The fix is a **bypass diode** across each third of the panel — a one-way door, which is yesterday's junction doing a different job. When a section is dragging the string down, the diode opens a path around it. You lose that third's voltage and keep the current, which turns a total loss into a partial one.`
    ],
    sequence: {
      label: `WHAT ACTUALLY HAPPENS WHEN THE LEAF LANDS`,
      note: `follow it through — the diode changes the ending entirely`,
      steps: [
        { name: `One cell goes dark`, body: `It can no longer free as many electrons, so the most current it can pass falls in proportion to how much of it is covered.` },
        { name: `The whole string is throttled`, body: `Series means one current. Fifty-three healthy cells are held to what the shaded one allows, and the panel's output falls off a cliff rather than by two per cent.` },
        { name: `The others push back through it`, body: `The healthy cells still have their voltage and now drive current the wrong way through the shaded one. It is being reverse-biased by its own panel.` },
        { name: `That power becomes heat`, body: `Up to about 125 W in one six-inch square — comparable to a soldering iron. Worst at partial shade, because full shade leaves no current to push.` },
        { name: `The bypass diode opens`, body: `Once the voltage across that third reverses by about half a volt, the diode conducts and current flows round the outside of the problem.` },
        { name: `You lose a third, not everything`, body: `268 W instead of 0 W, and the shaded cell is protected because almost nothing now passes through it. One cheap component, two problems solved.` }
      ]
    },
    comparison: {
      label: `A ROPE OF CLIMBERS, AND A BUCKET CHAIN`,
      body: `A line of climbers roped together can move only as fast as the slowest one — it does not matter how fit the other fifty-three are, because they are physically coupled and the rope has no slack. That is series current, and it explains the throttling. But the second half of the lesson needs the other image. Think of a bucket chain where everyone is passing water at speed and one person stops and holds their bucket still: the people behind keep shoving, and everything they push arrives in one place with nowhere to go. The force does not vanish because one link stopped — it concentrates there. A bypass diode is a side passage: when one link jams, the water goes round rather than piling up on them. *Where the analogy stops:* a person would simply let go, and a solar cell cannot. It has no way to disconnect itself, which is precisely why the diode has to be fitted in advance.`
    },
    naming: `A string of cells is limited by its worst member — in the trade this is **current mismatch**, and the concentration of heat in the throttled cell is a **hot spot**. The protective component is a **bypass diode**, normally three per panel, one across each third, hidden in the **junction box** on the back. Not to be confused with a **blocking diode**, which stops current flowing backwards into a panel from elsewhere — a different job, different place. One honest note: the half-cell panels now standard split every cell in two and wire the halves as two parallel strings, specifically so a shadow across the bottom edge takes out half the panel rather than all of it. If you look at a modern panel you can see the seam straight across the middle, and now you know what it is for.`,
    formalNames: {
      terms: [
        { term: `Current mismatch`, meaning: `Cells in series must all carry the same current, so the weakest one limits every other. One shaded cell throttles fifty-three healthy ones.` },
        { term: `Hot spot`, meaning: `A shaded cell reverse-biased by the rest of the panel, turning their power into heat in one small square. Worst at partial shade, and a genuine fire risk.` },
        { term: `Bypass diode`, meaning: `A one-way door across each third of a panel that opens a path around a dragging section. Turns a total loss into the loss of one third.` },
        { term: `Half-cell panel`, meaning: `Every cell cut in two and wired as two parallel strings, so shade along one edge costs half the panel instead of all of it. The visible seam across the middle.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've seen.`,
    items: [
      `A rooftop array with a chimney or vent pipe beside it.`,
      `An old string of Christmas lights where one bulb killed them all.`,
      `A tree that has grown taller than it was when the panels went up.`,
      `A solar garden light that has gone dim under a shrub.`,
      `A panel with a visible seam straight across the middle.`,
      `Birds, leaves or snow sitting on a panel.`
    ],
    builder: {
      body: `If you can see a rooftop array from the ground, look at what casts a shadow on it and at what time. A chimney, a vent pipe, a satellite dish, an aerial — anything that sticks up will draw a moving line across the panels for part of the day, and a narrow shadow lying **across** the cells is far more damaging than the same area lying along one. A shadow that covers a strip of every cell throttles the whole panel; the same shadow turned ninety degrees might take out one third and leave the rest working. Installers lay panels out around this, and a tree that was a sapling when the system went in is one of the commonest reasons an array quietly stops earning its keep.`
    },
    ownPlaceholder: `Something that casts a shadow I'd never thought about…`,
    synthesis: `The orientation point is the whole lesson in practice. It is not how much area is shaded that matters — it is how many **separate series strings** the shadow touches. The same leaf costs you nothing or a third depending entirely on where it lands.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why one shaded cell can stop a whole panel — **without using the words "series" or "current."**`,
    banned: ['series', 'current'],
    bannedNote: `one of those came back — and the chain idea carries it without either`,
    placeholder: `All the cells are joined in one chain, so whatever flows through one…`,
    checks: [
      `The cells are joined in one chain, and whatever passes through one must pass through all.`,
      `A shaded cell can pass less, so it holds back every healthy cell in the chain.`,
      `The others push against it, and that wasted power turns into heat in one small square.`,
      `A one-way door fitted across each section lets the flow go round the problem.`
    ],
    closing: `If your version has "they're all in one chain," you have it — and you have also just re-explained the Christmas lights from Week 2 without noticing.`
  },

  challenge: {
    voice: 'editor',
    line: `One about where shade does most damage, and one about the obvious alternative.`,
    prediction: {
      question: `A thin shadow falls across your array. Which does **more** damage — a narrow shadow lying across **one** panel, or the same shadow spread thinly across **six** panels?`,
      options: [
        {
          id: 'six',
          text: `Across six — it is touching six panels instead of one.`,
          verdict: `Correct, and it is the opposite of what most people expect. Damage is not measured by shaded area but by how many independent strings the shadow reaches. A shadow confined to one panel costs you at most that panel's three thirds; the same shadow spread across six panels throttles **six** panels, each of which then drags down the string it sits in. One per cent of the array's area can cost you a third of its output or more. This is exactly why installers would rather see a dense shadow on one panel than a thin one creeping across a whole row.`
        },
        {
          id: 'one',
          text: `Across one — concentrated shade must be worse than spread-out shade.`,
          verdict: `The instinct that concentration is worse holds for many things, and for the hot-spot risk specifically it is partly right. But for output it gets the geometry backwards. A panel is already a chain, and the chain is only as good as its worst link — so once a panel has been throttled, shading it further costs comparatively little. Spreading the same shadow creates six separate throttled chains instead of one, and six bad links in six places is far more expensive than six in the same place.`
        },
        {
          id: 'same',
          text: `The same — equal area shaded means equal loss.`,
          verdict: `This is the assumption the whole lesson exists to break. If panels responded to shaded area, two per cent of a panel covered would cost two per cent of its output and this lesson would be unnecessary. Because the cells are chained, what matters is how many chains the shadow touches, not how much of each. The simulation makes the point at its limit: one cell of fifty-four, which is under two per cent of the area, can take the output to zero.`
        }
      ]
    },
    open: {
      question: `All of this trouble comes from wiring cells and panels in long series chains. The obvious alternative is to give every panel its own small electronics so that nothing is chained to anything. Why is that not simply how it is always done?`,
      placeholder: `Perhaps there's a reason the chain is worth keeping…`,
      reveal: [
        `It is increasingly how it is done, and the products exist: **microinverters**, one per panel, and **power optimisers**, which keep a string but let each panel work at its own best point. Either way a shaded panel stops dragging its neighbours down, and you also get per-panel monitoring, so you learn which panel is dirty rather than noticing the whole array is down a bit.`,
        `What you pay is cost and complexity. One inverter for twenty panels becomes twenty devices bolted to a roof, each with its own electronics and its own failure modes, in the hottest and least accessible place on the building — and a replacement means going back up. A central inverter sits in a garage at head height. The economics turn on how much shade there actually is: on a clean unshaded south-facing roof the chain costs you nothing and the extra hardware earns nothing.`,
        `And there is a reason the chain is worth keeping at all, which tomorrow is entirely about. Those long series strings are not an accident or an oversight — they exist because high voltage and low current is the only affordable way to move power along a wire, which is Week 2's Lesson 9 all over again. Give every panel its own electronics and you still have to get the power off the roof, and you will still do it at high voltage. Tomorrow: panels in a row, panels side by side, and a number that makes the case very bluntly.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about solar panels and shade that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 19 — the same eight panels, wired two different ways, making exactly the same watts. One arrangement loses 29 of them in the cable. The other loses 1,838.`
  },

  routes: [
    { id: 'analogy', body: `A single-lane road with no overtaking. One slow lorry sets the speed of everyone behind it, however powerful their cars — and the queue does not move at the average speed, it moves at the lorry's speed. A shaded cell is that lorry. The bypass diode is a slip road that lets everyone leave the carriageway, skip that stretch, and rejoin further along.` },
    { id: 'object', body: `An old string of Christmas lights is this lesson for a few pounds. One bulb removed and the whole string goes dark, because they are chained and the chain is broken. Modern strings survive a dead bulb because each one has a tiny shunt that conducts when the filament fails — which is exactly a bypass diode, doing exactly this job, on a budget of pennies.` },
    { id: 'story', body: `Hot spots were learned the hard way. Early arrays in the 1970s and 1980s suffered cracked cells, scorched backsheets and occasional fires, and the cause was traced to partially shaded cells being reverse-biased by their own panels. Bypass diodes became standard as a safety requirement before anyone thought of them mainly as a yield improvement, and the certification standards every panel now carries include a deliberate hot-spot endurance test.` },
    { id: 'experiment', body: `Take a small solar panel — a garden light or a toy — and put a meter across it in full sun. Note the current. Now cover a single cell with your fingertip, perhaps a twentieth of the area, and watch the current collapse by far more than a twentieth. Then slide your finger so it covers a thin strip of every cell instead: the collapse is worse still, for the same area covered. That is the whole lesson in two minutes.` },
    { id: 'smaller', body: `Forget diodes, hot spots and geometry. Two sentences: the cells are joined in one chain, so the worst cell decides what all of them can do. Shade one badly and you lose the lot — unless somebody has fitted a way for the electricity to go round that section.` },
    { id: 'backward', body: `Start from something you can observe: panels have a junction box glued to the back, and if you could open one you would find three diodes in it and nothing else of interest. Why would a device that generates electricity need one-way doors fitted inside it? Work backwards from that box and you arrive at the chain, the throttling and the fire risk — three components that exist entirely to limit the damage from a leaf.` }
  ],

  map: [
    { name: `Solar panels`, level: 3 },
    { name: `Semiconductors`, level: 4 },
    { name: `Sunlight to electricity`, level: 4 },
    { name: `Series`, level: 5 },
    { name: `The grid`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
