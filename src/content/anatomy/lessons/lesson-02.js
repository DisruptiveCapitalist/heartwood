// Anatomy & Physiology · Week 1 · Lesson 2 — a cell is a business, not a bag.
//
// The course spec is explicit that the organelles must not be taught as a
// vocabulary list, so this lesson leads with the jobs a cell cannot avoid and
// lets the structures fall out as answers to them. The SEE IT visual is built
// the same way round: tapping a part says what the cell *needs* before it says
// what the part is called.
//
// It also walks the spec's own example for this lesson — a signal arriving and
// a protein leaving — in five steps, and the thing worth noticing is that
// nothing from outside the cell ever comes in.

export default {
  id: 'lesson-02',
  number: 2,
  week: 1,
  title: `The cell: a tiny living world`,
  openingQuestion: `You are something like thirty trillion cells. Not one of them has any idea you exist. Each is just getting through its own day — holding its shape, paying its bills, doing its one job — and somehow all of that adds up to a person having a thought about it. So what does a single cell actually have to get done to stay alive?`,
  concept: `A cell is a working whole`,

  see: {
    voice: 'professor',
    line: `{name}, here is one cell, opened up. Tap any part of it — and notice that each one is the answer to something the cell can't avoid doing.`,
    simulation: { id: 'cell-scope', props: { mode: 'tour' } },
    observations: [
      { text: `Every part was answering a **need**, not just occupying space: a border, the instructions, a build line, a dispatch desk, a power supply, a recycler.` },
      { text: `Following the message through, nothing from outside ever came in. The messenger touched the outside of a receptor, and the cell wrote its own reply.` },
      { text: `And the instructions never left the nucleus. What went out was a working copy — which is why a cell can be read from millions of times without wearing out its own blueprint.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. Jobs first, names later.`,
    sentences: [
      `A cell is not a bag of parts. It is a small business with a handful of jobs that never stop: **keep the border**, hold the instructions, build what's wanted, pay for all of it, and clear away the wreckage.`,
      `Each structure inside is the answer to one of those jobs. Learning the structures as a list is exactly why cells feel like memorising; learning the jobs first makes the structures almost obvious.`,
      `Everything a cell does about the outside world, it does from **behind its membrane**. Messages are received, not admitted — a receptor changes shape, the change is relayed inward, and the cell composes its own response.`
    ],
    sequence: {
      label: `WHAT A CELL CANNOT AVOID DOING`,
      note: `and the part that answers each one`,
      steps: [
        { name: `Keep a border`, body: `Decide what crosses, in both directions. **The cell membrane.**` },
        { name: `Keep instructions`, body: `Hold the DNA safely and read from copies, never the original. **The nucleus.**` },
        { name: `Build to order`, body: `Link amino acids in the specified order. **Ribosomes.**` },
        { name: `Fold and check`, body: `Get new proteins into the right shape, and catch the ones that aren't. **The endoplasmic reticulum.**` },
        { name: `Label and send`, body: `Tag each finished thing and dispatch it where it's needed. **The Golgi apparatus.**` },
        { name: `Pay for it`, body: `Release usable energy from food, because every line above costs some. **Mitochondria.**` },
        { name: `Clear up`, body: `Break down what's worn out and reuse the pieces. **Lysosomes.**` }
      ]
    },
    comparison: {
      label: `THE RESTAURANT KITCHEN`,
      body: `An order comes in at the pass — and nobody from the dining room walks into the kitchen. The recipe book stays in the office; what reaches the cook is a copied card, so the book never gets splashed or lost. Prep happens along a line, the plate is checked before it goes out, and someone calls the table number. The pot wash salvages what can be reused. And the gas bill pays for all of it. *Where the analogy stops:* a restaurant can close for the night. A cell that stops for an hour is dead, and that relentlessness is most of what being alive costs.`
    },
    naming: `The parts inside a cell are its **organelles** — "little organs," which is a fair description of what they are. The idea that every living thing is made of cells, and that cells come only from other cells, is called **cell theory**, and it took the best part of two centuries to settle. One number is worth carrying: the working copy that leaves the nucleus is **mRNA**, and Lesson 4 is about what happens to it.`,
    formalNames: {
      terms: [
        { term: `Organelle`, meaning: `A structure inside a cell with a particular job. Most are wrapped in their own membrane, which is how a cell keeps incompatible chemistry in separate rooms.` },
        { term: `Cell membrane`, meaning: `The border: two molecules thick, made of fat, studded with protein doors, pumps and receivers. Not a wall — a crossing.` },
        { term: `DNA`, meaning: `The instructions, kept in the nucleus. Every cell in you carries the same full set; what differs is which parts it reads.` },
        { term: `Receptor`, meaning: `A protein that recognises one particular molecule and changes shape when it arrives. How a cell is spoken to without being entered.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Cells doing their jobs, or failing to, show up all over ordinary life. Tap any you've met.`,
    items: [
      `A bruise fading from purple to yellow over a week.`,
      `A cut that closes itself over, with nobody supervising.`,
      `"Cell turnover" on the back of a skin-cream box.`,
      `Yeast making bread rise — single cells, eating sugar.`,
      `A doctor taking a sample to look at the cells under a microscope.`,
      `Someone who can't drink milk because one enzyme is missing.`
    ],
    builder: {
      body: `Crack an egg into a bowl and look hard at the yolk. Almost all of it is food, stored for a chick that never came. The cell itself is the small pale disc sitting on the yolk's surface — a couple of millimetres across, and still gigantic as cells go. Tilt the bowl under a good light and you can find it. Then consider that the cells you are made of are perhaps a thousand times smaller in each direction, and you have about thirty trillion of them.`
    },
    ownPlaceholder: `Something I've seen cells doing…`,
    synthesis: `Notice how many of those are cells doing one of the seven jobs — building, clearing up, dividing, or failing to make one particular protein. That last one is the whole of Lesson 4, early.`
  },

  feynman: {
    line: `Your turn. And this one is easier than it sounds.`,
    instruction: `Explain to a friend what a single cell has to get done to stay alive — **without using the words "organelle" or "mitochondria."** Describe the jobs, not the furniture.`,
    banned: ['organelle', 'mitochondri'],
    bannedNote: `one of those slipped in — and both are names for furniture rather than for work`,
    placeholder: `It has to keep its edges, and…`,
    checks: [
      `It has to keep a border, and control what crosses it in both directions.`,
      `It keeps its instructions safe and works from copies rather than the original.`,
      `It builds things — proteins — to order, then finishes them and sends them where they're needed.`,
      `All of that costs energy, so it has to release energy from food continuously.`
    ],
    closing: `If you got the jobs out without the names, you understand cells better than someone who can label a diagram. The names are the easy half.`
  },

  challenge: {
    voice: 'editor',
    line: `One to check the idea, and one that is a genuinely good puzzle.`,
    prediction: {
      question: `Insulin arrives at a muscle cell carrying a message. Where does the insulin molecule itself end up?`,
      options: [
        {
          id: 'nucleus',
          text: `It travels in to the nucleus and delivers the message there.`,
          verdict: `A reasonable picture — if the instructions are in the nucleus, going to the nucleus sounds like the obvious route. But insulin is a peptide, and a peptide can't cross a membrane made of fat; it's the wrong kind of molecule for that trip. It never gets in. The message reaches the nucleus, but insulin doesn't carry it there — a relay of molecules inside the cell does, and insulin stays outside the whole time.`
        },
        {
          id: 'surface',
          text: `It stays outside, held by a receptor on the membrane.`,
          verdict: `Yes — and it's worth being precise about why. Insulin is a peptide, so the fatty membrane blocks it. It binds a receptor that pokes through from outside to in; the receptor changes shape, and *that* change is the message. Important caveat, though, because biology rarely has one rule: **steroid** hormones like estrogen and testosterone are built differently and do pass straight through the membrane. Week 4 comes back to that split.`
        },
        {
          id: 'consumed',
          text: `It's taken apart and used as fuel.`,
          verdict: `There's a sound instinct here: insulin is made of amino acids, and amino acids can indeed be broken down for energy. Insulin is eventually cleared and broken up, mostly in the liver and kidneys. But that's disposal after the fact, not how it works — and the amount involved is trivial as fuel. Its job is done the instant it binds, and it is doing that job from the outside.`
        }
      ]
    },
    open: {
      question: `Here's the puzzle. A mature red blood cell has **no nucleus at all** — it ejects its own DNA while it's being made. So it cannot build a single new protein, cannot repair itself, and cannot divide. Why would a cell throw away its own instructions?`,
      placeholder: `It must get something in exchange…`,
      reveal: [
        `For room, and for shape. Without a nucleus the cell is almost entirely haemoglobin — the protein that carries oxygen — so it hauls far more oxygen per cell than it otherwise could. It also becomes a flexible disc that can fold up and squeeze through capillaries narrower than itself, which a stiff cell with a nucleus in the middle could not do.`,
        `The bill comes due at the other end. With no instructions it cannot mend anything that breaks, so it simply wears out — about four months — and has to be replaced wholesale. Your bone marrow makes roughly two million of them every second, for your whole life, to hold the number steady.`,
        `This is the shape of a great deal of biology: not a design that is good at everything, but a trade accepted because it pays. Keep an eye out for that pattern — bone makes one in Lesson 12, and the immune system makes a famous one in Week 5.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about cells I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 3: the sixth job on that list — paying for everything. It turns out the bill is enormous, and you settle it about once every two minutes.`
  },

  routes: [
    { id: 'analogy', body: `A walled medieval town. The gate decides who comes in and what goes out. The charter is locked in the guildhall, and anyone who needs it works from a scribe's copy. The workshops make to order, the carters deliver, the mill grinds the grain that feeds all of it, and the rag-and-bone man reuses what breaks. No single person in the town understands the town. It works anyway, because each part only has to do its own job properly.` },
    { id: 'object', body: `Hold a soap bubble in your mind — or make one. Its skin is two layers of soap molecules with water between, and it is the same structure as a cell membrane, built on the same principle: the ends that like water face the water, the ends that don't face each other. That is genuinely why a membrane forms at all, and why it closes itself up into a sphere instead of staying a sheet.` },
    { id: 'story', body: `In 1665 Robert Hooke put a sliver of cork under a microscope and saw it divided into little empty boxes. They reminded him of the small rooms monks slept in, so he called them cells. He was looking at dead plant cell walls — the rooms really were empty — and he had no idea he had named the unit of all life. The word stuck before anyone knew what it meant.` },
    { id: 'experiment', body: `Put a stick of celery in a glass of water with a lot of salt dissolved in it, and another in plain water, and leave them an hour. The one in salt water goes limp; the one in plain water stays stiff or gets stiffer. Nothing has been added to or removed from the celery except water, which moved across the membranes of every cell in it. You have just watched membranes being selective, at a scale you can feel with your fingers.` },
    { id: 'smaller', body: `Forget the whole cell. One question: if you were a cell and you needed one particular tool made, would you send your only copy of the instructions out to the workshop? No. You'd copy the relevant page and send that. Now ask why — because the original is irreplaceable and the copy is cheap. That single decision explains the nucleus, mRNA, and most of what Lesson 4 is about.` },
    { id: 'backward', body: `Start with something that went wrong. Some people cannot digest milk, because one protein — an enzyme called lactase — stops being made in adulthood. Not a missing organ; one missing protein. Work backwards: why was it made at all, who decided to stop, where was it built, and from what instructions? Every answer is a part of the cell, and you'll have assembled the whole lesson from one glass of milk.` }
  ],

  map: [
    { name: `Levels of organization`, level: 4 },
    { name: `The cell`, level: 4 },
    { name: `Atoms and elements`, level: 3 },
    { name: `Molecules`, level: 3 },
    { name: `Water in the body`, level: 2 },
    { name: `DNA and proteins`, level: 2, fresh: true },
    { name: `Receptors and signals`, level: 1, fresh: true },
    { name: `Cellular energy`, level: 1, fresh: true },
    { name: `Homeostasis`, level: 0 },
    { name: `Circulation`, level: 0 }
  ]
}
