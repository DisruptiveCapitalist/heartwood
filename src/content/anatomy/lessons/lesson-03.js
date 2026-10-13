// Anatomy & Physiology · Week 1 · Lesson 3 — energy has to be made spendable.
//
// Numbers taken off the simulation before this copy was written, and they come
// straight from the two real yields, about 30 ATP per glucose with oxygen and 2
// without:
//
//   work 1×  → fuel   1×, 100% from the mitochondria
//   work 12× → fuel  12×, 100%   (the last point oxygen keeps up with)
//   work 13× → fuel  27×,  92%
//   work 20× → fuel 132×,  60%
//
// That jump from 12 to 132 is the lesson. The spec also insists on two
// corrections that most teaching skips: not all ATP is made in mitochondria,
// and not every cell depends on them equally — red blood cells have none.

export default {
  id: 'lesson-03',
  number: 3,
  week: 1,
  title: `Mitochondria and the energy of life`,
  openingQuestion: `You are not spending this morning's breakfast directly. Something has to turn food into a form a muscle can actually spend, and it has to keep doing it continuously, because you only ever carry a few seconds' worth. So what does the converting — and why does it need you to keep breathing?`,
  concept: `Energy has to be made spendable`,

  see: {
    voice: 'professor',
    line: `{name}, the same cell, and today only the mitochondria matter. Slide the work up slowly — and watch the fuel number rather than the energy number.`,
    simulation: { id: 'cell-scope', props: { mode: 'energy' } },
    observations: [
      { text: `At rest, all of it came from the mitochondria, using oxygen — about **30 units of energy from one glucose molecule**.` },
      { text: `Push past the point where oxygen can keep up and the shortfall gets made the quick way instead, which gets **2** out of the same glucose.` },
      { text: `So going from 12× the work to 20× — not even double — took the fuel from 12× to **132×**. Oxygen isn't a detail. It's the difference between efficient and desperate.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one is the one that makes the rest make sense.`,
    sentences: [
      `Food is not spendable. What cells actually spend is **ATP**, a small molecule that carries energy to wherever it's wanted and is recharged the moment it's been used. You hold only seconds' worth — it is a currency in constant circulation, not a store.`,
      `Most of your ATP is made inside **mitochondria**, by finishing off what's left of food using **oxygen**. That is what breathing is for: the oxygen is needed at the very last step, and without it the efficient route simply stops.`,
      `There is a second route that needs no oxygen at all and yields about a fifteenth as much from the same glucose. Cells fall back on it when demand outruns oxygen delivery — and a few cells, red blood cells among them, have no mitochondria and use nothing else.`
    ],
    comparison: {
      label: `THE RECHARGEABLE BATTERY`,
      body: `You don't own many batteries and you never buy more. You own a modest set and recharge them, over and over, all day. Spend one and it becomes a flat battery; the mitochondria charge it back up and it goes round again. At any instant you are carrying only about a quarter of a pound of ATP — yet so much of it is recharged and spent each day that the total passing through you is comparable to your own body weight. *Where the analogy stops:* a battery in a drawer keeps its charge for months. Your ATP is recharged within about a minute of being spent, continuously, and if the charging stopped you would have seconds, not hours.`
    },
    naming: `The whole business of releasing energy from food using oxygen is **cellular respiration** — a confusing name, because it has nothing to do with breathing except that breathing is what delivers the oxygen. The first stage, **glycolysis**, happens out in the cell's fluid, needs no oxygen, and is the quick route you found by pushing the slider. The efficient stages happen inside the mitochondria. And the mitochondria do not make *all* your ATP: that is a line most of us were taught and it isn't quite true.`,
    formalNames: {
      terms: [
        { term: `ATP`, meaning: `Adenosine triphosphate — the cell's spendable energy. Spend it and it becomes ADP; recharge it and it is ATP again. Essentially every process in your body is paid for in this one currency.` },
        { term: `Cellular respiration`, meaning: `Releasing energy from food using oxygen, ending inside the mitochondria. Named badly: it is not breathing.` },
        { term: `Glycolysis`, meaning: `The first stage, out in the cell's fluid. No oxygen needed, and only about 2 ATP per glucose — fast to start, expensive to run.` },
        { term: `Lactate`, meaning: `What accumulates when the quick route runs hard. Worth correcting a common belief: it is not what makes you ache two days later. That soreness is a different matter, and still argued about.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `This one you have felt, many times. Tap any that land.`,
    items: [
      `Out of breath at the top of the stairs — and still breathing hard after stopping.`,
      `A sprinter can't hold that pace for a mile; a marathon runner can go for hours.`,
      `"Mitochondria are the powerhouse of the cell," from school, with no explanation attached.`,
      `Shivering when cold — muscles working purely to make heat.`,
      `Yeast turning sugar into alcohol: the same oxygen-free shortcut, in a barrel.`,
      `Feeling wrung out the day after heavy physical work.`
    ],
    builder: {
      body: `Make a fist and squeeze as hard as you comfortably can. Keep squeezing. Somewhere around thirty or forty seconds the forearm starts to burn and the grip starts to fail — your muscle has outrun what the blood can deliver and is running on the quick route. Now let go. Within half a minute it eases off completely. That easing is oxygen catching up and the efficient route taking over again. Stop at once if it is uncomfortable; the point is made in well under a minute.`
    },
    ownPlaceholder: `A time I felt myself run out of something…`,
    synthesis: `Every one of those is the same ceiling: oxygen can only arrive so fast. Notice that you kept breathing hard *after* stopping — that was the bill for the quick route being settled late.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why a sprinter cannot sprint for ten minutes — **without using the words "ATP" or "lactic."**`,
    banned: ['atp', 'lactic'],
    bannedNote: `one of those came back — and neither is needed to explain it`,
    placeholder: `Food can't be spent directly, so…`,
    checks: [
      `Food can't be spent directly; it has to be turned into something the cell can use immediately.`,
      `The efficient way of doing that needs oxygen, and happens in the mitochondria.`,
      `Oxygen can only be delivered so fast, so past some pace the cell uses a much more wasteful shortcut.`,
      `That shortcut burns fuel far too quickly to keep up, so the pace has to come down.`
    ],
    closing: `If your version has the ceiling on oxygen in it, you have the lesson — that ceiling is why endurance is a real and separate thing from strength.`
  },

  challenge: {
    voice: 'editor',
    line: `One that catches almost everybody, and one that is just a pleasure.`,
    prediction: {
      question: `Sitting quietly, doing nothing in particular: which is using more oxygen per minute — your **brain**, or both your **legs**?`,
      options: [
        {
          id: 'legs',
          text: `The legs — they're far bigger and full of muscle.`,
          verdict: `The reasoning is good and the arithmetic of size is on your side: your legs are a large fraction of your body and muscle is demanding tissue. The catch is the phrase "sitting quietly." Resting muscle is remarkably cheap to run — it is doing almost nothing. The brain, meanwhile, never gets to rest, and that is what settles it.`
        },
        {
          id: 'brain',
          text: `The brain — by a wide margin.`,
          verdict: `Correct, and the numbers are startling. Your brain is about 2% of your body weight and takes roughly 20% of your oxygen at rest — it is the single most expensive organ you own, per ounce. Nerve cells spend most of that simply maintaining the electrical difference across their membranes, pumping ions back where they belong, every second, asleep or awake. Lesson 10 shows what that pumping buys.`
        },
        {
          id: 'equal',
          text: `About the same.`,
          verdict: `A sensible hedge, and in some sense a sophisticated instinct — the body does tend to balance supply against demand. But these two are genuinely far apart at rest. The gap closes dramatically once you stand up and walk: working legs can take a very large share of your oxygen, which is exactly the ceiling you were sliding into in the simulation.`
        }
      ]
    },
    open: {
      question: `Mitochondria have **their own DNA**, separate from the set in the nucleus. And you inherited every bit of it from your mother — none at all from your father. Why would one part of your cells keep a private set of instructions?`,
      placeholder: `It's as if they used to be something else…`,
      reveal: [
        `Because they used to be something else. The best-supported explanation is that mitochondria descend from free-living bacteria that were taken up by a larger cell perhaps a billion and a half years ago, and the arrangement worked so well for both that it never ended. They kept a small remnant of their own genome, they have a double membrane like a cell within a cell, and they divide on their own schedule rather than when their host does. The idea has a name — **endosymbiosis** — and it was argued for, against considerable resistance, by Lynn Margulis in 1967.`,
        `The maternal part is simpler: an egg cell is enormous and brings its mitochondria with it, while a sperm contributes essentially only nuclear DNA. So mitochondrial DNA passes down the female line unbroken, which is why it is the tool of choice for tracing deep maternal ancestry — the thing those ancestry tests are reading.`,
        `Worth holding onto as a habit of mind: "why is this part built so oddly?" is often answered by history rather than by design. Bone does the same thing in Week 3, and so does the immune system in Week 5.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about energy in the body I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 4: the instructions themselves — DNA, and what gets built from them. This is where the words "peptide" and "protein" finally get pinned down, and you'll see why nobody quite agrees where one ends and the other begins.`
  },

  routes: [
    { id: 'analogy', body: `Think of cash and a savings account. Food is the account — a great deal of value, and completely useless at the counter. ATP is the notes in your pocket, and you carry surprisingly few. Every purchase comes out of your pocket, and a cashier behind you is refilling it from the account continuously. Stop the refilling and you don't have an hour's grace; you have about the length of a sprint.` },
    { id: 'object', body: `Pick up anything in the room and set it down again. That took a specific, countable number of molecules being spent and recharged in your arm — and the fuel for it was something you ate hours ago, routed through your blood, handed to your muscle cells and finished off with oxygen you breathed in about a minute ago. The ordinariness of lifting a cup is the remarkable part.` },
    { id: 'story', body: `For years the standard figure was 36 to 38 ATP per glucose, and it is in a great many textbooks. Better measurements brought it down to about 30, because some of the energy is spent on the transport steps themselves rather than ending up in ATP. Nobody was lying; the accounting got more honest. It is a small, useful reminder that a number in a textbook is a measurement, not a fact handed down.` },
    { id: 'experiment', body: `Walk up one flight of stairs at a comfortable pace and notice your breathing at the top. Then sit for two minutes and walk up the same flight again, briskly. Same flight, same you, minutes apart — and the second one costs noticeably more breathing. Nothing about the stairs changed. What changed was the rate you asked for the energy, and oxygen delivery is what has to keep up.` },
    { id: 'smaller', body: `Forget mitochondria entirely. One question: why can you hold your breath for a minute but not for an hour? Because something in you is consuming oxygen continuously and cannot stop. Now ask the next one: consuming it for what? Not for breathing — for making the one molecule your cells can actually spend. That's the lesson, arrived at from the other end.` },
    { id: 'backward', body: `Start with a fact you already accept: people with heart failure get breathless walking across a room. The lungs are usually fine. What has failed is delivery — blood isn't reaching the muscles fast enough, so oxygen isn't either, so the muscles fall back on the shortcut within a few steps and cannot continue. Work backwards from that and you have the oxygen ceiling, the two routes, and why the efficient one is worth so much.` }
  ],

  map: [
    { name: `Cellular energy`, level: 4, fresh: true },
    { name: `The cell`, level: 4 },
    { name: `Levels of organization`, level: 4 },
    { name: `Molecules`, level: 3 },
    { name: `Atoms and elements`, level: 3 },
    { name: `DNA and proteins`, level: 2 },
    { name: `Water in the body`, level: 2 },
    { name: `Receptors and signals`, level: 1 },
    { name: `Circulation`, level: 1, fresh: true },
    { name: `Homeostasis`, level: 0 }
  ]
}
