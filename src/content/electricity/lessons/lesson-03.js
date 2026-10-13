// Electricity & Energy · Week 1 · Lesson 3 — voltage is a difference, not a quantity.
//
// The misconception this lesson exists to kill: that a battery is a tank and
// voltage says how full it is. The simulation is built to make that untenable —
// the learner stacks eight cells and the "charges in the loop" readout sits at
// forty-four the entire time, refusing to move.
//
// Voltage as electrical height is the honest picture (electric potential is
// defined only up to a constant, which is exactly why "how high is it?" has no
// answer until you say "above what"). The comparison panel and the temperature
// route both lean on that, deliberately — they are the same mathematics.

export default {
  id: 'lesson-03',
  number: 3,
  week: 1,
  title: `Voltage: the push, not the stuff`,
  openingQuestion: `A 9-volt battery is "stronger" than a 1.5-volt AA. Stronger how, though? It isn't bigger — a D cell is enormous and still says 1.5. It isn't fuller, because Lesson 1 settled that the wire is already full and the battery supplies nothing but a shove. So what is the number on a battery actually counting?`,
  concept: `Voltage is a difference`,

  see: {
    voice: 'professor',
    line: `{name}, same loop. This time you can stack cells. Add them one at a time and watch which numbers move — but more importantly, watch the one that doesn't.`,
    simulation: { id: 'circuit-loop', props: { mode: 'push' } },
    observations: [
      { text: `Every cell you added raised the push, and the flow rose in exact step with it. One cell, 0.13 amps. Eight cells, 1.00 amps. Nothing clever — a straight line.` },
      { text: `The number of charges in the loop never moved. Forty-four before you touched anything, forty-four at twelve volts. Adding batteries did not add electricity to the wire.` },
      { text: `So the number on a battery is not how much it holds. It is how hard it shoves what is already there — and the wire was already full in Lesson 1.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `This is the lesson where a word you've been using loosely gets sharp.`,
    sentences: [
      `Voltage is a **difference between two places**, never a property of one place. "Twelve volts" is always shorthand for "twelve volts more than somewhere else" — which is exactly why a battery has two terminals, and why one terminal on its own can't do anything to you.`,
      `Put cells end to end and their differences add up, like flights of stairs: each one lifts the charge a little further from where it started. Eight lifts of 1.5 is a lift of 12, and the charge arrives at the lamp with eight times the energy it had with one cell.`,
      `What the push supplies is **energy**, not charge. More voltage means every charge that files past the lamp carries more energy into it — the same traffic, each one delivering a heavier parcel.`
    ],
    comparison: {
      label: `HOW HIGH IS THE PENCIL ON YOUR DESK?`,
      body: `You can't answer that without being asked "above what." Above the desk, half an inch. Above the floor, two and a half feet. Above the sea, maybe four hundred feet. All three are correct and none is *the* answer, because height is a difference and always was. Now roll the pencil off the edge: what makes it fall is the difference between desk and floor. Its four hundred feet above the sea is still there, and does nothing whatsoever. Voltage is electrical height. Your wall socket is 120 volts above the ground wire, and it is that difference — not any absolute number — that boils your kettle.`
    },
    naming: `The unit is the **volt**, after Alessandro Volta, who in 1800 stacked discs of zinc and silver with brine-soaked cardboard between them and found that twenty of them pushed twenty times as hard as one. He had built the first battery, and he had built it in **series** — end to end, differences adding — which is precisely what you just did with the cells. The proper name for the quantity is **potential difference**, and that phrase is worth keeping even though it's clumsy, because the word *difference* is sitting right there in it, doing the work. "Voltage" is the everyday name for the same thing.`,
    formalNames: {
      terms: [
        { term: `Volt`, meaning: `The unit of push. One volt means each unit of charge picks up one joule of energy on its way through — so volts are really joules per charge. Energy per customer, not number of customers.` },
        { term: `Potential difference`, meaning: `The formal name, and the honest one. Always between two points. Ask "a difference between where and where?" and the picture snaps into focus every time.` },
        { term: `In series`, meaning: `Components end to end, one path through all of them. Cells in series add their pushes: that's Volta's stack, and the four AAs in a big flashlight.` },
        { term: `Ground`, meaning: `The agreed zero of electrical height — exactly as sea level is the agreed zero of altitude. Nothing physically special about it. Everyone just needs to measure from the same place.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Voltages are printed on half the objects in your house. Tap the ones you've actually looked at.`,
    items: [
      `The fat 9-volt block in the smoke alarm, next to the little 1.5s in the remote.`,
      `My car battery says 12 volts; the wall says 120.`,
      `Two batteries in the flashlight instead of one, and it's visibly brighter.`,
      `The phone charger brick that says 5V — and also says something in amps.`,
      `Europe runs at 230 volts, so my charger needed an adapter but my hairdryer died.`,
      `A static shock off the car door — thousands of volts, and it only stings.`
    ],
    builder: {
      body: `Go round the house and write down the voltage printed on every battery you can find. You'll notice something that ought to be impossible if voltage meant "how much it holds": a AAA, a AA, a C and a great heavy D cell all say **1.5 volts**, and the D is perhaps fifty times the size of the AAA. Then find a watch battery the size of a lentil and read it: **3 volts**. Twice the push of the D cell, a hundredth of the bulk. Size has nothing to do with voltage. Size is about how *long* it can keep pushing — which is a different question, and tomorrow's.`
    },
    ownPlaceholder: `Somewhere I've seen a voltage printed…`,
    synthesis: `Notice that every one of those numbers is quietly a comparison — 1.5 volts between one end of the cell and the other, 120 between the live slot and the ground. The second half of the sentence is always left off, which is how the word started feeling like a quantity.`
  },

  feynman: {
    line: `Say it back, and the hard way.`,
    instruction: `Explain what the number printed on a battery means — **without using the word "volts" (or "voltage"), and without the word "power."**`,
    banned: ['volt', 'power'],
    bannedNote: `one of those crept back in — and both are the words that let you avoid explaining`,
    placeholder: `The number says how hard it…`,
    checks: [
      `The number is a difference between the two ends, not an amount sitting inside.`,
      `A bigger number means every charge that passes carries more energy.`,
      `It doesn't change how much charge is in the wire — that never changes.`,
      `Cells end to end add their numbers together, like stacked steps.`
    ],
    closing: `If you got through that without either word, you understand voltage better than most people who use the word daily. The word was never the idea.`
  },

  challenge: {
    voice: 'editor',
    line: `One question to test the idea, and one to show you what it doesn't cover.`,
    prediction: {
      question: `Scuffing across a carpet and touching a doorknob can put **20,000 volts** between your finger and the metal. A wall socket is 120. Which is more dangerous?`,
      options: [
        {
          id: 'static',
          text: `The doorknob — 20,000 is enormously more than 120.`,
          verdict: `If voltage were the whole story this would be right, and it's the honest conclusion from everything we've said so far, so it deserves credit rather than a buzzer. But watch what actually happens: the shock is over in a millionth of a second and then it's finished, because the few billionths of a coulomb you picked up off the carpet have all gone. Enormous push, almost nothing to push. The energy in that spark is about what it takes to lift a grain of rice an inch.`
        },
        {
          id: 'wall',
          text: `The wall — because it can keep pushing, indefinitely.`,
          verdict: `Yes, and this is the distinction the lesson has been circling. The carpet gave you a huge difference and a vanishing amount of charge; the socket gives you a modest difference and a power station behind it, perfectly willing to maintain that 120 volts all day while current pours through whatever is connecting the two slots. Danger is about how much flows and for how long. Voltage only tells you how hard something is being shoved — and that is exactly half the story.`
        },
        {
          id: 'same',
          text: `About the same — voltage is voltage.`,
          verdict: `There's a real and defensible thought in here: the *same* quantity is being measured in both cases, and you're right to resist the idea that volts somehow mean different things in different places. They don't. But quantity of push and quantity of charge available are two independent numbers, and the two cases are at opposite extremes of the second one. Same units, wildly different situations.`
        }
      ]
    },
    open: {
      question: `Here's the thing voltage can't tell you. A fresh AA says 1.5 volts; a car battery says 12. Yet that AA will run a wall clock for a year, and the car battery will be flat by morning if you leave the headlights on. If 12 beats 1.5, what is the AA winning at?`,
      placeholder: `The AA must have more of something else…`,
      reveal: [
        `At being asked for almost nothing. Voltage is energy *per charge*; it says nothing at all about how many charges go past per second, or how long the battery can keep it up. Those are two further numbers — the flow, and the total store — and a clock asks for a whisper of flow while headlights ask for a torrent. The car battery holds vastly more energy than the AA. It is simply spending it about ten thousand times faster.`,
        `So a battery really needs three numbers to describe it, and the label only prints one. The push, in volts. The flow it can supply, in amps. And the total it holds, usually in amp-hours — the number that actually decides whether you get through the night. You have the first one now. Tomorrow is the second.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 4: current. Three meters round the same loop, one before the lamp and one after — and the question is whether the lamp uses any of it up.`
  },

  routes: [
    { id: 'analogy', body: `Temperature. Heat flows from hot to cold, and only the *difference* decides how fast — a cup at 80° in a 20° room cools at the same rate as a cup at 60° in a 0° room, because both are 60° apart. And a single object's temperature, on its own, drives nothing at all; it needs something cooler to be next to. Voltage works the same way, with the same mathematics underneath. A battery terminal is "hot" only relative to the other one.` },
    { id: 'object', body: `Pick up a book and put it on the first shelf. Now take it down and put it on the fifth. Same book, same weight, same number of books — but the fifth shelf took five times the effort, and a book dropped from there arrives with five times the energy. Voltage is the shelf number. Stacking cells is choosing a higher shelf. The number of books you're moving is a completely separate question, and it's the one called current.` },
    { id: 'story', body: `In 1800 Alessandro Volta was arguing with Luigi Galvani about frogs' legs. Galvani thought the twitch came from the animal; Volta thought it came from the two different metals touching it. To prove it, Volta left the frog out entirely: a disc of zinc, a disc of silver, a bit of cardboard soaked in brine, and then that again, and again, thirty times over. The stack pushed thirty times as hard as one layer. No animal involved, and the pile is still the reason we say "volt."` },
    { id: 'experiment', body: `Rub a balloon briskly on your hair and hold it an inch from your forearm. You will see the hairs lift and feel almost nothing. There are several thousand volts between that balloon and your skin — more than forty wall sockets — and it is completely harmless, because there is scarcely any charge there to move. That is as plainly as it can be shown: push and quantity are two different things, and this is a great deal of the first with almost none of the second.` },
    { id: 'smaller', body: `Forget batteries entirely. Answer only this: can a single point, all by itself, have a height? No — not until you say what you're measuring from. Height needs two places. So does voltage. Now ask the follow-up: if one terminal of a battery can't have a voltage on its own, what could the number 1.5 possibly be describing? Only the gap between the two ends. That's it. That's the lesson, and everything else is consequence.` },
    { id: 'backward', body: `Start with the charger brick for your phone and read the small print: "Output 5V 2A." Two numbers, not one. If voltage told you everything, why would the second number be there — and why would a laptop charger say 20V 3A while a phone's says 5V 2A? Work backwards from the fact that manufacturers have to print two numbers and you'll arrive where this lesson does: one says how hard, the other says how much, and you need both.` }
  ],

  map: [
    { name: `A circuit is a loop`, level: 5 },
    { name: `Open and closed circuits`, level: 4 },
    { name: `Voltage — the push`, level: 4 },
    { name: `Potential difference`, level: 4 },
    { name: `Charge`, level: 3 },
    { name: `Energy (from Physics I)`, level: 4 },
    { name: `Current — the flow`, level: 2 },
    { name: `Series`, level: 2, fresh: true },
    { name: `Resistance`, level: 1 },
    { name: `Power`, level: 1, fresh: true },
    { name: `Magnetism`, level: 0 },
    { name: `AC and DC`, level: 0 },
    { name: `Solar cells`, level: 0 }
  ]
}
