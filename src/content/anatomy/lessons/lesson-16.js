// Anatomy & Physiology · Week 4 · Lesson 16 — glands, and a loop with three storeys.
//
// The clinically useful payoff: a thyroid blood test measures the pituitary's
// instruction rather than the thyroid's output, because the instruction moves
// first and moves further. The learner can watch that happen before being told
// it, which turns a confusing test result into an obvious one.

export default {
  id: 'lesson-16',
  number: 1,
  week: 4,
  title: `The endocrine system: messages through the body`,
  openingQuestion: `Your nervous system has a shape — a brain, a cord, branches reaching everywhere. The hormone system has no shape at all. It is a scattered handful of organs in the neck, the belly and the pelvis with nothing in common except their method, and no wiring between them whatsoever. So how does a gland in your throat give an instruction to a cell in your foot?`,
  concept: `Shout everywhere, let the right cells listen`,

  see: {
    voice: 'professor',
    line: `{name}, tap your way round the glands first. Then give thyroid hormone from outside and watch which number moves — it will not be the one you expect.`,
    simulation: { id: 'endocrine' },
    observations: [
      { text: `Six organs scattered the length of you, with nothing in common but the **method**: put a molecule into the blood, and let the cells that can hear it answer.` },
      { text: `Giving thyroid hormone from outside made the **pituitary stop asking**. Nobody decided that. The loop did it, within hours.` },
      { text: `Which is why a thyroid blood test measures the pituitary's instruction rather than the thyroid's output. The instruction moves first, and it moves further.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first is Lesson 5's rule with a map attached.`,
    sentences: [
      `A gland makes a molecule and puts it into the **blood**, where it goes absolutely everywhere. The address is written on the receiving end — only cells carrying the matching receptor can answer, and the rest never know it passed.`,
      `Most of what the **pituitary** releases is not an action but an **instruction to another gland** — and the product of that gland is what switches the instruction off. Three storeys, each watching the one below, with no one in charge of any of it.`,
      `And no hormone acts alone. Several usually push the same quantity in different directions at once, which is how a body can hold something steady and also move it deliberately when the situation calls for it.`
    ],
    sequence: {
      label: `THE THREE STOREYS, USING THE THYROID`,
      note: `and the same shape governs the adrenals and the gonads`,
      steps: [
        { name: `Hypothalamus`, body: `A patch of brain just above the pituitary. It watches the body's state and nudges the floor below it.` },
        { name: `Pituitary`, body: `Releases an instruction into the blood — in this case **TSH**, which means nothing to any cell except a thyroid cell.` },
        { name: `Thyroid`, body: `Receives the instruction and makes thyroid hormone, which goes out to essentially every cell you have.` },
        { name: `The loop closes`, body: `Thyroid hormone is itself detected by the two floors above, and tells them to ease off. More hormone, less instruction — automatically.` },
        { name: `Why the test works`, body: `Give hormone from outside and the instruction collapses, as you saw. So the **instruction** is the sensitive early signal, and that is what gets measured.` }
      ]
    },
    comparison: {
      label: `A RADIO STATION`,
      body: `A transmitter does not choose who hears it. It broadcasts across a whole region, and every radio in that region is bathed in the signal — but only the sets tuned to that frequency turn it into sound. Nobody addresses anything, nobody routes anything, and adding a listener requires no change at the transmitter at all. A gland broadcasts into your bloodstream and your cells are the radios, each tuned by which receptors it happens to have built. *Where the analogy stops:* a radio cannot tell the station to stop. Your tissues can, and do — the product of the broadcast is what silences the broadcaster.`
    },
    naming: `A gland that releases into the blood is **endocrine**; one that releases down a duct onto a surface, like a sweat or salivary gland, is **exocrine** — and your pancreas is both, which is why Lesson 5's insulin came from a mostly-digestive organ. A hormone whose job is to command another gland is a **tropic** hormone, and the pituitary's are the main ones. The whole three-storey arrangement is called an **axis**, so you will hear of the thyroid axis and the adrenal axis, and they work the same way.`,
    formalNames: {
      terms: [
        { term: `Endocrine gland`, meaning: `Releases its product into the bloodstream rather than down a duct. Thyroid, adrenals, pituitary, and the hormone-making islands in the pancreas.` },
        { term: `Hormone`, meaning: `A molecule released into the blood that changes the behaviour of cells elsewhere — those carrying the receptor for it.` },
        { term: `Tropic hormone`, meaning: `A hormone whose target is another gland. Most of the pituitary's output is this: instructions rather than actions.` },
        { term: `Axis`, meaning: `A chain of glands each regulating the next, with the final product feeding back to quieten the start. The commonest arrangement in the whole system.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Hormones show up on prescriptions and test results more than almost anything else. Tap any you've met.`,
    items: [
      `A thyroid blood test, and a number nobody really explained.`,
      `A steroid injection for a painful joint or a flare-up.`,
      `Insulin, in a pen or a pump.`,
      `Hormone replacement, in a patch or a tablet.`,
      `An adrenaline pen carried for a severe allergy.`,
      `Being told cortisol was the reason for something.`
    ],
    builder: {
      body: `Put two fingers lightly on the front of your throat, just below the hard ridge of your voice box, and swallow. You will feel something firm slide up under your fingers and settle back. Some of that is cartilage — and sitting across it, in a shape like a bow tie, is your thyroid, usually too soft to feel distinctly. It weighs about an ounce. Everything about the pace at which your body runs is being set by that, in response to an instruction broadcast from a pea-sized gland under your brain, and neither of them has any idea the other exists except through the blood.`
    },
    ownPlaceholder: `Somewhere a hormone has come up in my life…`,
    synthesis: `Notice how many are given *as* medicines. A great deal of endocrine treatment is simply supplying a hormone that has become scarce, or blocking one that has become too plentiful — which only works because the receptor cannot tell where the molecule came from.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain how one organ gives an instruction to another with no wiring between them — **without using the words "hormone" or "bloodstream."**`,
    banned: ['hormon', 'bloodstream'],
    bannedNote: `one of those slipped in — and the idea is broadcasting and tuning, not vocabulary`,
    placeholder: `It releases something that travels everywhere, and…`,
    checks: [
      `It releases a molecule that travels everywhere in the body.`,
      `Only cells able to recognise that particular molecule respond to it.`,
      `So the message is not addressed — the listening is what's selective.`,
      `And what the target produces travels back and tells the sender to ease off.`
    ],
    closing: `If your version has "the listening is selective" in it, you have the whole system — and the same sentence covers Lesson 5, this lesson, and most of what Week 4 has left.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a test you may have had, and one about a medicine many people take.`,
    prediction: {
      question: `Someone is being checked for an **underactive thyroid**. Which does the first blood test measure — the thyroid's hormone, or the pituitary's instruction?`,
      options: [
        {
          id: 'thyroid',
          text: `The thyroid's hormone — that's the thing in question.`,
          verdict: `Entirely logical, and it is measured too, usually as a second step. The trouble is sensitivity. Thyroid hormone can sit within the normal range while the pituitary is shouting itself hoarse to keep it there — the loop is compensating, and the output looks fine precisely because the instruction has gone up. Measure only the output and you will miss the early trouble completely.`
        },
        {
          id: 'pituitary',
          text: `The pituitary's instruction — because that moves first.`,
          verdict: `Correct, and it is the reason a thyroid test result is confusing to read: a **high** instruction means an **under**active thyroid, which feels backwards until you have seen the loop. The pituitary is sensing a shortfall and asking louder. It is the body's own amplifier for a change too small to see yet, and medicine simply reads the amplifier. You watched exactly this in reverse when you gave hormone from outside and the instruction collapsed.`
        },
        {
          id: 'both',
          text: `Both at once — you'd need the pair to interpret anything.`,
          verdict: `This is good thinking and it is what happens when the first result is abnormal or the picture is odd — the pair together separate a thyroid problem from a pituitary problem, which matters enormously. But as a first test it would be a waste, because the instruction alone catches almost everything. Worth noticing that the two-test logic you reached for is exactly right, just applied one step later.`
        }
      ]
    },
    open: {
      question: `Someone who has taken a steroid tablet daily for several months is told to **come off it gradually** rather than simply stopping. Given the three storeys, why would stopping suddenly be a problem?`,
      placeholder: `If the gland hasn't been asked to work for months…`,
      reveal: [
        `Because the loop has been doing exactly what it should. Steroid arriving from outside is detected by the floors above, which quite correctly stop asking for any — so the adrenal glands have had no instruction for months, and a gland that is not asked to work shrinks and slows, the same way Lesson 11's bone did. Stop the tablet suddenly and there is no outside supply and no inside one either, and it takes weeks for the glands to wake up.`,
        `Tapering is simply giving the loop its instructions back slowly enough to follow. The dose comes down in steps, the pituitary starts asking again, the adrenals rouse themselves, and at no point is there a gap.`,
        `It is a general shape worth carrying: supplying something from outside tends to switch off the making of it inside, in proportion and automatically. That is not a flaw in the loop — it is the loop working. And it is why changing the dose of anything hormonal is a conversation with the prescriber rather than a decision to make alone, however well you understand the mechanism.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about hormones I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 17: the word "peptide". It is doing two completely different jobs in ordinary conversation, and separating them is most of what you need to read a label honestly.`
  },

  routes: [
    { id: 'analogy', body: `A town crier in a market square. He does not know who needs to hear the news and he does not try to find out — he simply says it loudly in the middle of everything, and the people it concerns act on it. The baker ignores the notice about fishing licences. Nobody addressed an envelope, nobody kept a list, and adding a new fisherman to the town required no change to the crier's routine at all.` },
    { id: 'object', body: `Look at the back of any packet of hormone medication — a thyroid tablet, a steroid, a contraceptive pill. The dose will be in micrograms or small milligrams, which is a fantastically small amount of material to swallow with the expectation that it will change how your whole body behaves for a day. That tiny number is only possible because the molecule is not doing the work. It is only carrying an instruction to something that will.` },
    { id: 'story', body: `In 1902 two physiologists found that a signal still reached the pancreas from the gut after every nerve between them had been cut. Something was travelling in the blood instead — and the idea that a chemical could carry a message round the body was new enough to need a word. A Cambridge classicist supplied one from the Greek for "I arouse": hormone. Until that afternoon, every known message in the body ran down a nerve.` },
    { id: 'experiment', body: `Think back to the last time something startled you badly — a near miss in a car, a shout behind you. The pounding heart arrived within a second or two, and then took several minutes to settle back down, long after you knew you were safe. That is both systems in one event: a nerve signal in milliseconds, and then adrenaline in the blood, which arrives in seconds and has to be cleared before you feel normal. You cannot call a broadcast back.` },
    { id: 'smaller', body: `Forget glands. One question: if you wanted to get a message to a few specific houses in a city, but you were not allowed to know which ones, how would you do it? Say it everywhere and arrange for only the right houses to be able to understand it. Now ask what has to be true of those houses — they need something the others lack. That is a receptor, and you have derived the entire system from a delivery problem.` },
    { id: 'backward', body: `Start with the oddity that a high result on a thyroid test means an underactive thyroid. That reads as a misprint until you ask what is actually being measured. Work backwards from "the number is high because something is asking harder" and you will arrive at an instruction, a gland that is failing to answer it, and a loop that turns up the volume automatically. The confusing result is the loop telling you plainly what is wrong.` }
  ],

  map: [
    { name: `Hormones and the endocrine system`, level: 4, fresh: true },
    { name: `Receptors and signals`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Nerves and signalling`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Bone and the skeleton`, level: 5 },
    { name: `Muscles and movement`, level: 5 },
    { name: `Cellular energy`, level: 5 }
  ]
}
