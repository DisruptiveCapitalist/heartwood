// Anatomy & Physiology · Week 3 · Lesson 12 — two materials, neither enough.
//
// Measured off the simulation: resistance to breaking peaks at 62% mineral,
// which on the learner's 5-step slider reads as a flat best between 60 and 65 —
// so the observation card says 60 to 65, which is what they can actually land on.
// Real bone is around 65%. That is not a coincidence arranged for
// the lesson — it is the finding, and the learner is sent looking for the best
// point before being told where bone actually sits.
//
// The spec says to discuss osteoporosis conceptually and to prescribe nothing.
// So this lesson distinguishes "too little bone" from "badly made bone" —
// which is a genuinely clarifying distinction and a medically real one — and
// names no supplement, dose or treatment anywhere.

export default {
  id: 'lesson-12',
  number: 2,
  week: 3,
  title: `What are bones made of?`,
  openingQuestion: `Leave a clean bone in vinegar for a week and you can tie it in a knot like a bootlace. Bake the same bone in a hot oven and it crumbles between your fingers. Neither treatment added anything — each took one thing away. So what are the two things, and why does a bone need both?`,
  concept: `Two materials, neither enough`,

  see: {
    voice: 'professor',
    line: `{name}, go to both ends before you settle anywhere. Then hunt for the best point — and only then read what real bone actually is.`,
    simulation: { id: 'bone', props: { mode: 'material' } },
    observations: [
      { text: `With little mineral it **folds**. Not weak, exactly — floppy. It bends and keeps bending, and will not hold anything up.` },
      { text: `With almost all mineral it is stiffer than real bone and it **shatters**, like a stick of chalk, with no warning at all.` },
      { text: `Resistance to breaking peaked between **60 and 65% mineral** — and real bone is around 65%. That was not arranged for the demonstration. It is where the best point happens to be.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third one matters more than the first two.`,
    sentences: [
      `Roughly two-thirds of a bone's weight is **mineral** — crystals of calcium and phosphate — and that is where stiffness and the ability to take compression come from. It is the part the vinegar dissolves.`,
      `Most of the rest is **collagen**, the same protein that makes up tendon and much of your skin, laid in fibres through the mineral. It is what gives bone some give, and it is the part the oven burns away.`,
      `So bone is a **composite**, and that is the whole of it: a stiff material that would shatter, held together by a flexible one that would fold, each covering the other's failure. Neither is the important one.`
    ],
    sequence: {
      label: `WHAT A BONE IS, BY WEIGHT`,
      note: `roughly, and it shifts with age`,
      steps: [
        { name: `Mineral · about 65%`, body: `Calcium and phosphate, as crystals packed around and along the fibres. Stiffness, and your body's store of calcium — which it will take back when it needs it elsewhere.` },
        { name: `Collagen · about 20%`, body: `Protein fibres, laid in layers at angles to each other like plywood. Give, toughness, and the scaffold the mineral forms on.` },
        { name: `Water · about 10%`, body: `Easy to forget and not optional. Dried bone is measurably more brittle than living bone, which is part of why a museum skeleton misleads.` },
        { name: `Living cells · a few %`, body: `The crews from yesterday, and the only part that can change any of the above.` }
      ]
    },
    comparison: {
      label: `REINFORCED CONCRETE`,
      body: `Concrete takes compression superbly and tension not at all — pull on it and it cracks. Steel is the reverse. Cast them together and you get a material that does both, which is why almost every building you have ever stood in is made of it. Bone made the same bargain first: mineral for the compression, collagen fibres for the tension, and a structure that neither could manage alone. *Where the analogy stops:* a concrete beam cannot notice a crack or do anything about one. Bone finds its own microscopic cracks and replaces the material around them, continuously, which is why bone lasts decades under loads that would eventually fatigue any beam.`
    },
    naming: `The mineral is **hydroxyapatite**, a calcium phosphate crystal, and the protein is **type I collagen** — the commonest protein in your body. When there is too little bone overall, with its composition broadly normal, that is **osteoporosis**: the material is fine and there is not enough of it, and the strut-work from Lesson 11 has thinned and lost connections. That is a different thing from bone which is *badly made* — where mineralisation itself has gone wrong, as in rickets. Both make bones break more easily; they are not the same problem and they do not have the same answer, which is a matter for a doctor and not for a course.`,
    formalNames: {
      terms: [
        { term: `Hydroxyapatite`, meaning: `The calcium phosphate crystal that makes up bone mineral. Your skeleton holds about 99% of your body's calcium as this.` },
        { term: `Collagen`, meaning: `The protein giving bone its give. Also tendon, ligament, cartilage and most of your skin — about a third of all the protein in you.` },
        { term: `Composite`, meaning: `A material made of two or more others whose weaknesses cancel. Bone, reinforced concrete, fibreglass and carbon fibre are all this idea.` },
        { term: `Osteoporosis`, meaning: `Too little bone, of broadly normal composition, with the internal strut-work thinned. A clinical diagnosis made with measurement, not something to conclude from a course.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `"Builds strong bones" on a milk carton, or a tub of calcium tablets.`,
      `A bone-density scan, and a score that needed explaining.`,
      `Someone told their vitamin D was low.`,
      `Gelatin setting in the fridge — that is collagen, boiled out of bone.`,
      `A child's greenstick fracture, bent rather than snapped.`,
      `A dog working away at a bone for an hour.`
    ],
    builder: {
      body: `This one takes a week and is worth it. Clean a chicken drumstick bone thoroughly, boil it a few minutes, dry it, and bend it — it will not bend. Now put it in a jar, cover it with ordinary white vinegar, lid on, and leave it on a shelf. Change the vinegar after three days. At around day five, take it out and rinse it. It bends. By the end of a week most people can bend it into a loop, and some can tie it. Nothing was added; the acid simply dissolved the mineral out and left the collagen behind. You are holding the other half of the bone.`
    },
    ownPlaceholder: `Somewhere I've met what bones are made of…`,
    synthesis: `The greenstick fracture is the most telling of those. A child's bone has proportionally more collagen and less mineral than an adult's, so it behaves like the left-hand end of your slider — it bends and splinters on one side rather than snapping clean through.`
  },

  feynman: {
    line: `Teach it, and the two banned words are the two you most want.`,
    instruction: `Explain why a bone needs **two** different materials rather than one — **without using the words "collagen" or "mineral."**`,
    banned: ['collagen', 'mineral'],
    bannedNote: `one of those came back — and the idea is about stiff and bendy, not about names`,
    placeholder: `One of them is stiff, and on its own it would…`,
    checks: [
      `One part is stiff and hard, and that's where the strength to stand on it comes from.`,
      `On its own that stiff part would shatter, like chalk or glass.`,
      `The other part is flexible and holds it together, giving it some give.`,
      `On its own the flexible part would just bend and hold nothing up.`
    ],
    closing: `If your version says each one covers the other's weakness, you have it — and you also have why reinforced concrete exists, which is the same idea in a different century.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a word you've heard a hundred times, and one about healing.`,
    prediction: {
      question: `In **osteoporosis**, bones break more easily. Is that because the bone is made of the wrong stuff — or because there is less of it?`,
      options: [
        {
          id: 'composition',
          text: `The composition is wrong — the balance of the two materials has shifted.`,
          verdict: `This is a perfectly sensible guess and it describes a real condition — just not this one. In **rickets** and in adult osteomalacia the mineralisation itself goes wrong, and the bone that results is soft and poorly formed; that is a disorder of composition and it has a different cause and a different answer. Osteoporosis is not that. Which is exactly why the distinction is worth having.`
        },
        {
          id: 'less',
          text: `There is less of it, but what's there is made normally.`,
          verdict: `Correct, and it is the clarifying fact about the condition. The material is broadly normal; there is simply not enough of it, and the internal strut-work from yesterday's lesson has thinned and lost its cross-connections — so the structure fails at loads the same material in a fuller arrangement would carry easily. Remodelling has tipped toward the demolition crew and stayed there. What tips it, and what to do about it, varies between people and is a question for a doctor with a measurement in hand.`
        },
        {
          id: 'both',
          text: `Both — less bone, and what's left is lower quality too.`,
          verdict: `This is the most sophisticated of the three and it is not simply wrong — bone quality is a genuine research subject, and things like the arrangement of the fibres and the accumulation of microdamage do matter beyond the raw quantity. But the dominant, measurable, treatable factor is quantity and architecture, which is what a density scan is measuring and what the whole clinical picture turns on. Quality is a real footnote rather than the headline.`
        }
      ]
    },
    open: {
      question: `People often say a broken bone heals back **stronger than it was**. Is that true? And if it is, why wouldn't a body simply build bone that strong in the first place?`,
      placeholder: `It must put down more than was there, at least for a while…`,
      reveal: [
        `It is true, and only temporarily. Healing goes through a stage where a lump of new bone called a **callus** is thrown up around the break — considerably more material than was ever there, laid down fast and roughly, like a splint built from the inside. For some months the repaired spot genuinely is bulkier and harder to break than the bone next to it.`,
        `Then the crews from Lesson 11 get to work on the callus, and over a year or two they carve it back down to very nearly the original shape, guided by the loads actually passing through. The permanent result is a bone about as strong as before, often with a faint thickening that shows on an X-ray for life. So the saying is half right: stronger for a while, the same in the end.`,
        `And the second half of your question has a good answer. Bone that bulky costs material and costs weight, and weight costs energy with every step you take for the rest of your life. Your skeleton is built to be **just strong enough** for the loads it actually meets, with a margin — not as strong as it could possibly be. That is why it adapts rather than overbuilding, and it is why taking the load away loses it so quickly.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about what my bones are made of that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 13: where two bones meet. Your shoulder can reach almost anywhere and dislocates more easily than any other joint you own — and those two facts are the same fact.`
  },

  routes: [
    { id: 'analogy', body: `Think of a fibreglass fishing rod. The glass fibres are strong but would shatter alone; the resin holding them is tough but floppy alone. Together you get something that bends a long way and springs back and does not break. Every composite in engineering is this bargain, and bone got there a very long time before fibreglass did — with the added trick of rebuilding itself when a fibre fails.` },
    { id: 'object', body: `Find a piece of chalk and a rubber band. Press on the chalk end-on and it takes a surprising amount before it goes — then it goes all at once, into pieces. Pull the rubber band and it stretches enormously and comes back, but it will hold nothing up. Now imagine a material that is chalk threaded through with rubber bands. The chalk cannot shatter because something is holding the pieces together, and the rubber cannot fold because something stiff is in the way.` },
    { id: 'story', body: `Rickets was once so common in the smoky industrial cities of northern Europe that bowed legs were unremarkable on any street. The cause took decades to pin down, and the answer turned out to be sunlight — without enough vitamin D the mineral cannot be laid into the collagen properly, and the bone that results is soft and bends under a child's own weight. It is a disease of composition rather than quantity, and a reminder that two very different faults can both end in a broken bone.` },
    { id: 'experiment', body: `Next time you have a chicken carcass, boil it for a long while and let the liquid cool in the fridge. It sets to a jelly. That jelly is collagen — boiled out of the bones and connective tissue and nothing else. You have just extracted one of the two materials from this lesson with a saucepan, and what is left in the pot is the other.` },
    { id: 'smaller', body: `Forget bone. One question: what would go wrong with a skeleton made entirely of something as stiff as glass? It would shatter the first time you jumped off a step. Now the other end: what about one made entirely of something as bendy as rubber? You would fold up. Hold both failures in mind and you have already worked out that the answer is neither, and must be both.` },
    { id: 'backward', body: `Start with why hospitals X-ray a suspected fracture rather than simply feeling for one. X-rays pass through soft material and are stopped by dense material, so what the picture actually shows is the mineral — the collagen is nearly invisible on it. Work backwards from "the image only shows half of what a bone is made of" and you have both components, which is which, and a reason why a scan can tell you how much bone there is but far less about how good it is.` }
  ],

  map: [
    { name: `Bone and the skeleton`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `Molecules`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Atoms and elements`, level: 4 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Nerves and signalling`, level: 4 },
    { name: `Blood and vessels`, level: 5 }
  ]
}
