// Anatomy & Physiology · Week 1 · Lesson 4 — instructions, and what gets built.
//
// This lesson exists to make Week 4 possible. The spec's peptide lessons ask the
// learner to evaluate claims about peptide products, and that is impossible
// without first knowing what a peptide is — and knowing, specifically, that the
// word covers insulin and a tripeptide and has no agreed lower or upper bound.
// So the boundary is taught as a convention, out loud, rather than as a rule.
//
// Every length in the simulation is a real one. Insulin's 51 amino acids are
// the interesting place to stop, because insulin is routinely called both a
// peptide hormone and a protein by different people on the same day.

export default {
  id: 'lesson-04',
  number: 4,
  week: 1,
  title: `Proteins, peptides and DNA`,
  openingQuestion: `The word "peptide" is on supplement bottles, in face creams, and in the news. It is also the word for insulin, which has kept millions of people alive since 1922. Those cannot possibly be the same kind of claim. Telling them apart starts with knowing what a peptide actually is — and the answer turns out to be a question about length, with no agreed answer.`,
  concept: `Instructions, and what gets built`,

  see: {
    voice: 'professor',
    line: `{name}, pick a molecule and walk it through. Start with insulin — it is the one that makes the whole argument visible.`,
    simulation: { id: 'protein-chain' },
    observations: [
      { text: `Three letters of DNA name **one** amino acid. Insulin's 51 amino acids need 153 letters of instruction, and not one of them is spare.` },
      { text: `The chain is built in one exact order and then **folds**. The folded shape is what does the job — an unfolded chain is useless.` },
      { text: `And insulin, at 51, is called a peptide hormone *and* a protein, by different people, on the same day. There is no agreed length where one becomes the other. It is a convention, not a rule.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and then the words get pinned down properly.`,
    sentences: [
      `DNA is a very long sequence written in four letters. A **gene** is a stretch of it that specifies one product. Every cell in you carries the same complete set — what makes a liver cell different from a nerve cell is which stretches it reads and which it leaves alone.`,
      `Reading it takes two moves. First a working copy of the gene is made and sent out of the nucleus. Then a ribosome reads that copy **three letters at a time**, and each triplet names one of twenty amino acids, which it links on in that exact order.`,
      `Amino acids are the building blocks. A short chain is usually called a **peptide**; a long one, folded into a working shape, a **protein**. Nobody can tell you the length at which one becomes the other, because no such length was ever agreed — and it is the folded shape, not the length, that does the work.`
    ],
    sequence: {
      label: `FOUR WORDS, IN ORDER OF SIZE`,
      note: `and the boundary between the last two is a habit, not a law`,
      steps: [
        { name: `Amino acid`, body: `One building block. Twenty kinds are used to build everything you are made of.` },
        { name: `Peptide`, body: `A short chain of them. Oxytocin is 9; glucagon is 29. "Short" is not defined anywhere.` },
        { name: `Protein`, body: `A long chain, folded into a working shape. Myoglobin is 153; a collagen chain is about a thousand.` },
        { name: `Insulin, at 51`, body: `Called both, freely, by people who know exactly what they are talking about. This is the honest state of the words.` }
      ]
    },
    comparison: {
      label: `LETTERS, WORDS AND SENTENCES`,
      body: `A letter isn't a word. A word isn't a sentence. And if you ask how many words it takes before a phrase becomes a sentence, there's no number — there's usage. Amino acids are the letters, peptides are short phrases, proteins are sentences, and the boundary in the middle is exactly as fuzzy as the one in grammar. *Where the analogy stops:* a sentence means what its words say, in order. A protein's meaning comes from the shape it folds into, and you cannot read that shape off the sequence by eye — working it out is one of the hardest problems in biology, and only in the last few years has it begun to be solved.`
    },
    naming: `The two reading steps have names worth knowing because you will meet them constantly: making the working copy is **transcription**, and building the chain from it is **translation**. The three-letter groups are **codons**. And the single most useful word in this lesson is **enzyme** — a protein whose job is to make one particular chemical reaction happen fast enough to be useful. Almost everything your body "does" chemically, it does with enzymes, and every one of them was built by the process you just watched.`,
    formalNames: {
      terms: [
        { term: `Amino acid`, meaning: `One of twenty building blocks. Nine of them your body cannot make and must get from food — those are the "essential" ones on a nutrition label.` },
        { term: `Peptide`, meaning: `A short chain of amino acids. Used loosely, and that looseness is why the word on a supplement bottle tells you almost nothing on its own.` },
        { term: `Protein`, meaning: `One or more chains folded into a working shape. Enzymes, structural proteins like collagen, transport proteins like haemoglobin, and signalling molecules are all proteins.` },
        { term: `Enzyme`, meaning: `A protein that speeds up one specific reaction. Lose one enzyme and you lose one ability — which is the whole story of being unable to digest milk.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `These words are printed on things in your house. Tap any you've read.`,
    items: [
      `"Protein 12 g" on the side of a cereal box.`,
      `Collagen in a face cream, or in a tub of powder.`,
      `Insulin kept in the fridge, in a pen or a vial.`,
      `Someone who can't drink milk — one missing enzyme.`,
      `"Peptides" on a supplement bottle, with no molecule named.`,
      `Egg white turning from clear to solid white in a hot pan.`
    ],
    builder: {
      body: `You can see DNA with your own eyes, at the kitchen sink, in about ten minutes. Mash two or three strawberries in a freezer bag. Stir half a cup of water with a teaspoon of washing-up liquid and a pinch of salt, add two tablespoons of it to the bag, and squash it well — the detergent breaks the membranes open and the salt makes the DNA clump. Strain it through a coffee filter into a tall glass. Now tilt the glass and pour cold rubbing alcohol gently down the side so it floats on top, and watch the boundary between the two layers. White, stringy threads gather there within a minute. That is DNA — not a model of it, the real thing, out of real cells, in your kitchen.`
    },
    ownPlaceholder: `Somewhere I've seen one of these words…`,
    synthesis: `The egg white is the one to keep. Heat didn't destroy the protein's chain — it unfolded it, and an unfolded protein can't do its job and won't fold back. That is how fragile "the shape is the job" really is.`
  },

  feynman: {
    line: `Teach it. This is the one that pays off in Week 4.`,
    instruction: `Explain how one stretch of DNA ends up as a working molecule — **without using the words "transcription" or "translation."**`,
    banned: ['transcrip', 'translat'],
    bannedNote: `one of those reappeared — and they are labels for the two steps, not explanations of them`,
    placeholder: `A gene is a section of the instructions, and…`,
    checks: [
      `A gene is a stretch of DNA that specifies one particular product.`,
      `A working copy of it is made and leaves the nucleus; the original stays put.`,
      `A ribosome reads the copy three letters at a time and links amino acids in that order.`,
      `The finished chain folds up, and the folded shape is what actually does the job.`
    ],
    closing: `If you got all four without the two words, you can read the next four weeks of this course without taking anyone's word for anything.`
  },

  challenge: {
    voice: 'editor',
    line: `One practical question, and one of the best puzzles in biology.`,
    prediction: {
      question: `Insulin has to be injected. It cannot simply be swallowed as a tablet. Why not?`,
      options: [
        {
          id: 'acid',
          text: `Stomach acid would destroy it.`,
          verdict: `Partly true, and a good instinct — stomach acid is harsh, and it does begin to unfold insulin. But acid alone isn't the decisive problem; drugs that would be damaged only by acid can be given a coating that survives the stomach. What finishes insulin off is the next thing it meets, and that is a much more specific problem than acidity.`
        },
        {
          id: 'digested',
          text: `Your gut would digest it — taking peptides apart is exactly what a gut does.`,
          verdict: `That's it precisely, and it is worth sitting with. Your digestive system is a dedicated machine for cutting peptides and proteins into their individual amino acids, because that is how you absorb food. Insulin is a peptide. Swallowed, it is simply breakfast — snipped into amino acids and absorbed as building material, with its shape and therefore its message destroyed. Hold onto this: a peptide you swallow is usually just food, and Week 4 will ask you to apply that to a shelf full of products.`
        },
        {
          id: 'big',
          text: `The molecule is too big to cross the gut wall.`,
          verdict: `There is real substance here — size genuinely does limit absorption, and insulin is far too large to slip through easily, so even undigested very little would get across. Both things are true. But digestion gets to it first and more completely, which is why the problem is not solved by any clever coating: the enzymes that would destroy it are the same ones you need in order to eat.`
        }
      ]
    },
    open: {
      question: `Any two people's DNA differs in only about one letter in a thousand. Yet changing a **single letter** in one gene causes sickle-cell disease. How can one letter out of three billion matter that much — while all the other differences matter so little?`,
      placeholder: `It must depend on which letter…`,
      reveal: [
        `Because position is everything. A great many differences fall in stretches that don't specify a product at all, or land on the third letter of a codon where the amino acid often comes out the same regardless, or swap one amino acid for a chemically similar one that folds much the same way. None of those changes the shape, so none of them changes the job.`,
        `The sickle-cell change is a single letter that swaps one amino acid in haemoglobin for one with quite different chemistry, at a spot on the outside of the folded molecule. That one substitution lets haemoglobin molecules stick to each other when oxygen is low. They stack into fibres, the fibres deform the red blood cell into a stiff crescent, and a stiff crescent cannot fold itself through a narrow capillary the way Lesson 2's flexible disc could.`,
        `And the part that makes it unforgettable: carrying one changed copy and one ordinary copy gives substantial protection against malaria. That is why the change is common in populations with a long history of malaria rather than having died out — the same letter is a serious illness in two copies and an advantage in one. Biology is full of bargains like that, and almost none of them were designed.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done.`,
    prompt: `One thing about DNA, proteins or peptides I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 5 — the last of the week. Cells don't work alone, and the way they talk to each other turns out to be the whole basis of keeping you steady. You'll meet insulin again, doing its actual job.`
  },

  routes: [
    { id: 'analogy', body: `Think of a knitting pattern. The pattern is the gene; you don't take the original book to the armchair, you copy out the rows you need. The copy tells you which stitch comes next, one at a time, in a fixed order. And the finished thing is useful because of the shape it takes when you're done — a flat strip of the same stitches, unassembled, keeps nobody warm. Where it stops: you can see from the pattern what you're making. Nobody can look at a gene and see the shape.` },
    { id: 'object', body: `Take a long shoelace and knot it loosely in two or three places, then let it go. It settles into a particular tangle, and it settles into roughly the same tangle every time, because the knots decide it. A protein chain does that but far more precisely: the amino acids along it attract and repel each other in a fixed pattern, so the chain falls into one specific shape. Change one amino acid and you have changed one of the knots.` },
    { id: 'story', body: `In 1922 a fourteen-year-old boy named Leonard Thompson was dying in a Toronto hospital, as everyone with type 1 diabetes then did. He was given an extract from cattle pancreas — crude, impure, and the first dose caused an abscess. The second batch, better purified, worked. He lived another thirteen years. The molecule in that syringe was a peptide 51 amino acids long, and it is the single most important reason the word "peptide" deserves to be taken seriously — and also the reason it gets borrowed by products that have earned nothing.` },
    { id: 'experiment', body: `Crack an egg into a cold pan and watch the white as it heats. It goes from clear and runny to opaque and solid, and it will never go back however long you leave it to cool. You have not broken the protein chains — they are all still exactly as long as they were. You unfolded them, and they tangled with each other instead of refolding. That irreversible change from clear to white is "the shape is the job," demonstrated in a frying pan.` },
    { id: 'smaller', body: `Forget DNA and proteins. One question: if you had one priceless handwritten recipe and a hundred cooks who each needed one line of it, what would you do? Copy out the lines. Keep the original somewhere safe. That is the entire architecture — nucleus, gene, working copy — and it follows from the value of the original rather than from any biology. Now ask what a cook does with the line, and you have the ribosome.` },
    { id: 'backward', body: `Start at the pharmacy. Insulin is refrigerated, injected, and useless as a pill. Why those three things? Refrigerated because it unfolds when warm and an unfolded one does nothing. Injected because the gut digests peptides into amino acids. Useless as a pill for the same reason. Work backwards from three ordinary facts on a label and you arrive at what a peptide is, why shape matters, and what digestion actually does.` }
  ],

  map: [
    { name: `DNA and proteins`, level: 4, fresh: true },
    { name: `Cellular energy`, level: 4 },
    { name: `The cell`, level: 4 },
    { name: `Levels of organization`, level: 4 },
    { name: `Molecules`, level: 4 },
    { name: `Atoms and elements`, level: 3 },
    { name: `Water in the body`, level: 2 },
    { name: `Receptors and signals`, level: 2 },
    { name: `Circulation`, level: 1 },
    { name: `Homeostasis`, level: 0 }
  ]
}
