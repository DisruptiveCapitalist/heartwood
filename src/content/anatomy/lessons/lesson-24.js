// Anatomy & Physiology · Week 5 · Lesson 24 — several failures, and time.
//
// Measured off the simulation: with all three safeguards intact, 1.1 of the six
// needed changes accumulate by age ninety — it never gets there. With two off it
// reaches six at year 74; with three, at year 28.
//
// The spec's requirements, all load-bearing here: cancer is a group of diseases;
// it arises from combinations of biological change, environmental exposure,
// inherited susceptibility, age AND chance; causes differ between cancers; not
// every tumour is cancerous; not every cancer behaves alike; and localised
// disease is different from disease that has spread.

export default {
  id: 'lesson-24',
  number: 4,
  week: 5,
  title: `Cancer: when cells stop following the rules`,
  openingQuestion: `Your body replaces old cells with new ones continuously — tens of millions of divisions an hour, every hour, for a lifetime. Each one copies three billion letters of instruction, and the copying is not perfect. Damage happens constantly. So the honest question is not why this ever goes wrong. It is why it goes wrong so rarely.`,
  concept: `Several failures, and time`,

  see: {
    voice: 'professor',
    line: `{name}, leave all three safeguards on and run the years out to ninety first. That result is the one worth sitting with.`,
    simulation: { id: 'cancer', props: { mode: 'rules' } },
    observations: [
      { text: `With all three safeguards working, the needed changes **never accumulated** — about 1 of the 6 by age ninety, in a lifetime of constant division and constant damage.` },
      { text: `With two safeguards gone it took until year **74**. With all three gone, year **28**. Each loss shortens it sharply.` },
      { text: `So this is not one thing going wrong. It is several particular things, in **one cell line**, each getting past a check that catches almost everything — which is why age matters so much, and why chance is genuinely part of it.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the last one is the most important sentence in the lesson.`,
    sentences: [
      `Division is tightly controlled. A cell divides when it is told to, stops when it is told to, and checks its own work before and after — and damage, which is constant, is almost always found and mended before it is ever passed on.`,
      `Two kinds of failure matter, and you need **both**. An **oncogene** is an accelerator jammed down: something that says "divide" is stuck on. A **tumour suppressor** is a brake removed: something that says "stop" has been lost. One alone is almost never enough, which is what you watched.`,
      `And **"cancer" is not one disease**. It names a couple of hundred, which differ in where they start, what drove them, how they behave and what helps. The causes differ between them, the risk factors differ, and so does almost everything else — which is why a sentence beginning "cancer is caused by" is almost always wrong before it finishes.`
    ],
    sequence: {
      label: `WHAT HAS TO GET PAST WHAT`,
      note: `and almost everything is caught at one of these`,
      steps: [
        { name: `Damage happens`, body: `Constantly — from copying errors, from ordinary chemistry inside the cell, from sunlight, from smoke. Most of it is harmless even unrepaired.` },
        { name: `Repair finds it`, body: `Dedicated machinery patrols and mends. Inheriting a weaker version of this is one of the real inherited susceptibilities.` },
        { name: `Checkpoints hold`, body: `A damaged cell is stopped before it divides and given time. The genes doing this are the tumour suppressors — the brakes.` },
        { name: `Or it kills itself`, body: `A cell too damaged to mend switches itself off and is cleared away. Dying on cue is a normal, necessary part of being a cell.` },
        { name: `Several times over`, body: `To get anywhere, one cell line must get past all of that, repeatedly, accumulating several particular changes. That is a tall order, and it is why decades usually pass first.` },
        { name: `And then the question of spread`, body: `Growing where it started is one thing. Acquiring the ability to leave, survive the journey and start again elsewhere is a further set of changes — and the one that matters most.` }
      ]
    },
    comparison: {
      label: `A CAR THAT NEEDS EVERYTHING TO FAIL AT ONCE`,
      body: `For a car to run away down a hill you need more than one fault. The accelerator has to be jammed down **and** the brakes have to fail **and** the handbrake **and** nobody in the driver's seat. Any one of those alone and nothing happens — the car sits there with a stuck throttle and the brakes hold it. That is why a single fault in a cell is almost never anything, and why the thing requires time: faults have to accumulate in the same place, by chance, faster than they are repaired. *Where the analogy stops:* a car has one of each. You have these safeguards in every cell, tens of trillions of times over, which is why it is so rare per cell and still happens to people.`
    },
    naming: `A change in the instructions is a **mutation** — and the overwhelming majority are harmless or are caught. A gene whose damaged form pushes division is an **oncogene**; a gene whose loss removes a restraint is a **tumour suppressor**. A growth that stays where it is and pushes its neighbours aside is **benign**; one that invades and can spread is **malignant** — and that distinction matters far more than size, which is the second question below. Spread to a distant site is **metastasis**, and it is the single thing that changes the picture most.`,
    formalNames: {
      terms: [
        { term: `Mutation`, meaning: `A change in the cell's instructions. Constant, usually harmless, usually repaired — and occasionally, in a particular place, consequential.` },
        { term: `Oncogene`, meaning: `A gene whose altered form pushes a cell to divide. The accelerator jammed down. One is not enough on its own.` },
        { term: `Tumour suppressor`, meaning: `A gene that restrains division or triggers self-destruction. Losing it is the brake failing. Inheriting one weak copy is a real susceptibility.` },
        { term: `Benign and malignant`, meaning: `Benign grows where it is. Malignant invades, and may spread. Most lumps people find are benign, and the difference is not one of size.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `This touches nearly everyone eventually. Tap any that are familiar.`,
    items: [
      `A screening letter arriving in the post.`,
      `Being told a lump was benign, and not quite believing it.`,
      `Someone who smoked for fifty years and was entirely fine.`,
      `Someone who never smoked at all and wasn't.`,
      `Sunscreen, and being told about damage decades later.`,
      `A family history, and wondering what it means.`
    ],
    builder: {
      body: `Hold your forearm out and compare the skin on the **back** of it with the skin on the **inside**, near the elbow. On most people over fifty the difference is plain: the outer side is coarser, more mottled, less even in colour. Same person, same age, same genes, same diet. The only difference is decades of sunlight on one side and not the other, and you are looking directly at accumulated damage. It is the clearest demonstration most of us can make that exposure and time are things that add up in tissue.`
    },
    ownPlaceholder: `Something about this I've wondered or worried about…`,
    synthesis: `The two smoking examples together are the honest shape of it. Risk changes the odds a great deal and settles nothing for any individual, and both of those are true at once.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why cancer becomes more common as people get older — **without using the words "mutation" or "DNA."**`,
    banned: ['mutat', 'dna'],
    bannedNote: `one of those came back — and the idea is about accumulation, not about the molecule`,
    placeholder: `Damage happens all the time, and most of it is caught, but…`,
    checks: [
      `Damage to a cell's instructions happens constantly, and nearly all of it is caught and mended.`,
      `Several separate safeguards have to be got past, not just one.`,
      `It takes several particular changes building up in the same cell line.`,
      `Accumulating that much takes time — so the longer you live, the more chances there have been.`
    ],
    closing: `If your version has "several, in the same place, over time" in it, you understand why this is a disease of accumulation rather than a single event.`
  },

  challenge: {
    voice: 'editor',
    line: `One that comes up at every family gathering, and one about a word people fear more than they need to.`,
    prediction: {
      question: `Someone smoked forty a day for fifty years and never developed lung cancer. Does that show the link between smoking and lung cancer is weaker than claimed?`,
      options: [
        {
          id: 'yes',
          text: `Yes — if it really caused it, it would cause it reliably.`,
          verdict: `This is a reasonable thing to think if "cause" means what it means in everyday speech, where causes produce their effects. But almost nothing in biology works that way, and this lesson shows why: several independent changes have to accumulate in the same cell line, and whether they do is partly chance. Smoking loads the dice very heavily indeed — roughly fifteen to thirty times the risk — and loaded dice still sometimes come up the other way.`
        },
        {
          id: 'risk',
          text: `No — it changes the odds enormously without being a guarantee for anyone.`,
          verdict: `Right, and holding both halves at once is the hard part. The risk is among the strongest known for any cancer, and most lifelong heavy smokers still do not develop lung cancer — both of those are true, and neither cancels the other. What a risk factor does is shift a probability across a population. It never issues a verdict on an individual, in either direction, which is also why someone who never smoked can develop it and be told nobody can say why.`
        },
        {
          id: 'genes',
          text: `No — it just means that person had unusually good genes protecting them.`,
          verdict: `Inherited differences in repair capacity are real and do affect risk, so this is not invented. But reaching for it as the explanation smuggles determinism back in by another door — as though there must be a reason, and if not the smoking then the genes. Sometimes the honest answer is chance. Several specific things had to happen in one cell line and, in that person, they did not.`
        }
      ]
    },
    open: {
      question: `Most lumps people find turn out to be **benign** — and a large benign growth can be far less dangerous than a small malignant one. What is the actual difference, and why does it matter more than size?`,
      placeholder: `It must be about what it does rather than how big it is…`,
      reveal: [
        `Behaviour, not size. A benign growth divides more than it should but stays where it is — it pushes its neighbours aside rather than growing into them, it has a boundary, and it does not travel. It can still cause real trouble by pressing on something important, and it may well be removed for that reason. But it stays a local problem.`,
        `A malignant growth has acquired further abilities: it **invades** the tissue around it rather than displacing it, and some of its cells can leave, survive in the bloodstream, and establish themselves somewhere else entirely. That last ability is the one that changes everything, because a problem in one place can be removed and a problem in several cannot be removed the same way.`,
        `Which is why the first questions asked about any growth are what kind it is and whether it has spread — not how big it is. A small cancer that has travelled is a more serious situation than a large benign lump, and this is the single most useful thing to understand before anyone has to sit in a consulting room and listen to an explanation. Tomorrow's lesson is about what the body does about all this, and what treatment is actually aiming at.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about cancer I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 25 — the last of the week. Your body finds and removes abnormal cells constantly, so the question becomes how any of them ever get past, and what treatment is actually aiming at when it does.`
  },

  routes: [
    { id: 'analogy', body: `A bank with four separate controls on a large transfer: two signatures, a daily limit, an automatic flag, and an auditor. To get money out improperly you need all four to fail, in the same transaction. Any one holding and nothing happens. That is why fraud is rare rather than impossible, and why it tends to be found in institutions where several controls had quietly stopped working at once. Your cells are run on exactly this principle.` },
    { id: 'object', body: `Look at a photocopy of a photocopy of a photocopy. Each generation is slightly worse, and the errors are inherited by everything copied from it afterwards. Now imagine the copier had a proofreader, and a supervisor who stops a bad copy being used, and a shredder for anything too poor to fix. With all three the pile stays good indefinitely. Lose them one at a time and watch what happens to the fortieth copy.` },
    { id: 'story', body: `In 1775 Percivall Pott noticed that chimney sweeps, who had climbed flues since childhood covered in soot, developed a cancer almost nobody else got. It was the first time anyone had connected a cancer to an exposure, and it eventually led to the first occupational health legislation in Britain. It also contains the shape of everything since: a substance, a long exposure, decades of delay, and a disease that was common in one group and rare in everyone else.` },
    { id: 'experiment', body: `Take any printed page and read a paragraph backwards, word by word, looking for a typo. It is far easier to find errors this way than reading normally, because reading normally lets your brain repair the text without telling you. Your cells have the same problem — damage that still "reads" correctly gets missed — and they solve it with dedicated machinery that does nothing but check, which is one of the three safeguards you were switching off.` },
    { id: 'smaller', body: `Forget cancer. One question: if something had to go wrong in one specific cell, and the chance of each failure was one in a million, what is the chance of four independent failures happening in that same cell? Vanishingly small. Now ask what changes if you have tens of trillions of cells and eighty years. Rare per cell, per year, still adds up — and you have derived both why it is uncommon and why it is not impossible.` },
    { id: 'backward', body: `Start with why screening programmes are offered by age band rather than to everybody. Why would anyone wait? Because the thing being looked for is an accumulation, and before enough time has passed there is usually nothing to find — while testing everyone constantly causes its own harms through false alarms and unnecessary procedures. Work backwards from the age bands and you arrive at accumulation, time, and probability rather than certainty.` }
  ],

  map: [
    { name: `Cancer and abnormal growth`, level: 4, fresh: true },
    { name: `DNA and proteins`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Immunity and defence`, level: 5 },
    { name: `Infection and disease`, level: 4 },
    { name: `Evaluating health claims`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Levels of organization`, level: 5 },
    { name: `Molecules`, level: 5 }
  ]
}
