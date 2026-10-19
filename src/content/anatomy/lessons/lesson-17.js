// Anatomy & Physiology · Week 4 · Lesson 17 — one word, two questions.
//
// The spec's requirement, stated plainly: not every peptide is a hormone, not
// every hormone is a peptide, and not every peptide sold as a health product
// has a proven effect. The way to make that stick is to show that "peptide" and
// "hormone" answer different questions — composition and job — so that neither
// word can be used to imply the other.
//
// The builder sends the learner to a shelf to find the molecule named on a
// product. Usually none is, and noticing that is worth more than any argument.

export default {
  id: 'lesson-17',
  number: 2,
  week: 4,
  title: `Hormones and peptides: alike and different`,
  openingQuestion: `The word "peptide" is doing two completely different jobs. On a hospital shelf it means insulin, which has kept people alive for a century. On a shop shelf it means something in a face cream, or a tub of powder, or a vial sold online. Both uses are correct, which is exactly the problem. So what does the word actually tell you — and what does it not?`,
  concept: `What it's made of, not what it does`,

  see: {
    voice: 'professor',
    line: `{name}, take all three in turn — and spend longest on the third, because it is the one that spoils the tidy version.`,
    simulation: { id: 'receptor', props: { mode: 'classes' } },
    observations: [
      { text: `A **peptide** hormone cannot cross a membrane made of fat. It knocks, and the receptor passes the message in without it. A **steroid** walks straight through as if the membrane were not there.` },
      { text: `And the speeds are nothing alike: adrenaline acting in **seconds**, thyroid hormone taking **days** — from the same chemical family.` },
      { text: `So "peptide" says what a molecule is **made of**. "Hormone" says what it **does**. They answer different questions, and a molecule can be either, both, or neither.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third one is the whole week in miniature.`,
    sentences: [
      `A **peptide** is a short chain of amino acids — a description of construction, like calling something "wooden". A **hormone** is a molecule released into the blood to change other cells' behaviour — a description of employment, like calling something "a tool".`,
      `So the categories cut across each other. Insulin is a peptide **and** a hormone. Oestrogen is a hormone and not a peptide. The fragments in a collagen drink are peptides and not hormones. Nothing follows from one about the other.`,
      `And neither word tells you whether something **works**. Insulin is a peptide that transformed medicine; a peptide in a supplement may do nothing whatever. Same category, nothing else in common.`
    ],
    sequence: {
      label: `THREE KINDS OF HORMONE, BY WHAT THEY ARE MADE OF`,
      note: `and the practical difference is whether they can get in`,
      steps: [
        { name: `Peptide hormones`, body: `Chains of amino acids: insulin, glucagon, growth hormone. Too large and too water-loving to cross a membrane, so they act at the surface. Fast to start, and digested if swallowed.` },
        { name: `Steroid hormones`, body: `Built from cholesterol: oestrogen, testosterone, cortisol. Fat-soluble, so they pass straight in and act on the genes. Slow to start, slow to stop, and they survive being swallowed.` },
        { name: `Built from one amino acid`, body: `Adrenaline and thyroid hormone. The untidy category — adrenaline acts at the surface in seconds, thyroid hormone goes inside and takes days. Same family, opposite behaviour.` },
        { name: `What this decides`, body: `Whether it can be a tablet, how fast it acts, how long it lasts, and where its receptor has to be. Four practical consequences, all following from construction.` }
      ]
    },
    comparison: {
      label: `"METAL"`,
      body: `A scalpel, a paperclip and a bridge are all metal. The word is perfectly accurate about all three and tells you nothing about what any of them is for, whether it works, or whether you should let someone near you with it. If a product described itself as "containing metal" you would not treat that as a recommendation — you would ask which metal, shaped how, for what. "Contains peptides" is exactly that sentence, and it deserves exactly those questions. *Where the analogy stops:* metals are a few dozen elements. There are more possible peptides than there are atoms in the observable universe, which makes the word even emptier than "metal", not less.`
    },
    naming: `The three groups are **peptide**, **steroid** and **amine** hormones, and how long one lasts in the blood is its **half-life** — minutes for adrenaline, about a week for thyroid hormone, which is why a thyroid tablet is daily and steady while adrenaline is an emergency. Worth keeping from this lesson: a peptide hormone your body makes is a well-characterised molecule with a known target and a known half-life. A product labelled "peptides" is a claim about construction, by someone who has chosen not to name the molecule.`,
    formalNames: {
      terms: [
        { term: `Peptide hormone`, meaning: `A hormone made of amino acids — insulin, glucagon, oxytocin, growth hormone. Acts at the cell surface; destroyed by digestion.` },
        { term: `Steroid hormone`, meaning: `A hormone built from cholesterol — oestrogen, testosterone, cortisol. Crosses into the cell and acts on genes; survives swallowing.` },
        { term: `Half-life`, meaning: `How long until half of it has gone from the blood. Adrenaline: a couple of minutes. Thyroid hormone: about a week.` },
        { term: `Receptor location`, meaning: `Surface for peptides, inside for steroids. This single fact decides speed, duration, and whether a tablet is even possible.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `The word is on a lot of shelves. Tap any you've seen.`,
    items: [
      `"Peptides" on a face cream, with no molecule named.`,
      `A collagen powder promising skin or joints.`,
      `Insulin in the fridge, and a thyroid tablet in the cupboard.`,
      `A hormone patch rather than a pill, and wondering why.`,
      `A clinic advertising "peptide therapy".`,
      `A podcast describing something as "a natural peptide your body already makes".`
    ],
    builder: {
      body: `Go and find three products — a shop, a bathroom cabinet, a search online — that use the word "peptide" or "collagen" on the front. Now read the back and try to write down, for each one, the **name of the actual molecule** and **how much of it is in there**. For most products you will not be able to. That inability is the finding. A medicine names its molecule and its dose on the box because it is required to and because those are the facts that matter; a product that does neither has told you only that it is made of amino acids, which is also true of a chicken.`
    },
    ownPlaceholder: `Somewhere I've seen the word used…`,
    synthesis: `The last one is the sentence to watch for: "a natural peptide your body already makes". Every word of that can be true while telling you nothing — your body also makes adrenaline, and you would not want a jar of it.`
  },

  feynman: {
    line: `Teach it, and the forbidden words are the easy exits.`,
    instruction: `Explain to a friend the difference between calling something a "peptide" and calling it a "hormone" — **without using the words "amino acid" or "gland."**`,
    banned: ['amino', 'gland'],
    bannedNote: `one of those came back — and the idea is two different questions, not two definitions`,
    placeholder: `One of them describes what it's built from, and…`,
    checks: [
      `One word describes what the molecule is built from.`,
      `The other describes the job it does in the body.`,
      `A molecule can be one, or both, or neither — the words don't imply each other.`,
      `And neither word says anything about whether a product containing it works.`
    ],
    closing: `If you can say "those are answers to different questions", you can read a supplement label without being moved by it, which is the practical skill this week is for.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a label, and one about two medicines in the same house.`,
    prediction: {
      question: `A product's packaging says, accurately, **"contains peptides."** How much does that tell you about what it will do?`,
      options: [
        {
          id: 'alot',
          text: `Quite a lot — peptides are biologically active molecules.`,
          verdict: `The premise is true and that is what makes the claim effective: peptides genuinely are active molecules, and some of them are among the most powerful substances in medicine. But "peptides" is a category of almost unlimited size, and knowing something belongs to it narrows the possibilities hardly at all. Insulin is a peptide. So is the fragment of beef left on a plate. The word is doing emotional work rather than informational work.`
        },
        {
          id: 'nothing',
          text: `Almost nothing — it describes the construction, not the molecule or the effect.`,
          verdict: `Right, and worth holding firmly, because this is the single most common move in health marketing. "Contains peptides" is accurate, unfalsifiable and empty. The questions it is standing in for are: which peptide, how much, acting on what, with what evidence in people. A product that could answer those would answer them, because specific claims sell better than vague ones — when there is something specific to say.`
        },
        {
          id: 'natural',
          text: `It tells me it's natural, and therefore unlikely to do harm.`,
          verdict: `This deserves a serious answer rather than a brush-off, because the instinct is widespread and sometimes reasonable — familiar substances often are better tolerated. But "natural" and "safe" are genuinely unrelated. Botulinum toxin is natural and is the most poisonous substance known. Your own adrenaline is natural and would be dangerous in a jar. And a peptide made in an unregulated facility is not natural in any useful sense whatever its sequence.`
        }
      ]
    },
    open: {
      question: `In the same house: a thyroid hormone taken as a **tablet** every morning, and insulin that must be **injected**. Both are hormones. Why can one be swallowed and the other not?`,
      placeholder: `It must be something about what each is made of…`,
      reveal: [
        `Construction, and nothing else. Insulin is a peptide, and your digestive system is a dedicated machine for cutting peptides into amino acids — swallow it and it becomes breakfast, exactly as Lesson 4 showed. Thyroid hormone is built from a single amino acid with iodine attached, small and chemically tough, and it passes through the gut and into the blood essentially intact.`,
        `So the route of administration is not a medical preference or a matter of convenience — it is dictated by what the molecule is made of, several steps before anybody decides anything. The same rule explains why steroid hormones can be tablets and why growth hormone cannot.`,
        `And it gives you a useful test for any product sold to be **swallowed** on the strength of being a peptide. If the molecule is a true peptide of any size, the default expectation is that digestion will take it apart, and the burden is on the seller to show otherwise in people rather than in a dish. Some very small fragments are absorbed intact; whether that produces any benefit is a separate question and a much harder one, and it is not answered by the fact that the fragment exists.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about the word "peptide" I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 18: receptors — and the most convincing sentence in all of health marketing, which turns out to prove nothing at all.`
  },

  routes: [
    { id: 'analogy', body: `"Wooden" is a fair description of a violin, a fence post and a matchstick. Nobody would buy a thing on the grounds that it contained wood, and nobody would conclude anything about a violin from the fact that matchsticks are also wooden. Yet "it's a peptide, and insulin is a peptide" is that argument exactly, and it works on people, because the word sounds technical enough to be a specification rather than a material.` },
    { id: 'object', body: `Take an egg out of the fridge. It is full of peptides and proteins, some of them with genuine biological activity. You could truthfully advertise it as a rich natural source of bioactive peptides. You could not truthfully claim it will do anything in particular to your skin, and the reason is the same in both cases: the category is enormous and belonging to it predicts nothing.` },
    { id: 'story', body: `When insulin was first purified in 1922 it was a peptide of entirely unknown structure, and it worked — dramatically, visibly, in dying children. Its sequence was not worked out until 1955, more than thirty years later. The order was: show it helps people, then find out what it is. A great deal of modern selling runs that order backwards, offering the structure as though it were the evidence.` },
    { id: 'experiment', body: `Search online for any named peptide product and count how many sentences you read before a specific molecule is named, with a dose. Then do the same with the prescribing information for an approved medicine — the molecule and dose are generally in the first line. The contrast is not about honesty exactly. It is about what each party has available to say.` },
    { id: 'smaller', body: `Forget peptides. One question: does knowing what something is made of tell you what it does? A knife and a spoon are the same steel. A wedding ring and a wire are the same gold. Construction constrains what is possible and decides almost nothing about function. Now ask which question a product label is answering when it tells you only the material.` },
    { id: 'backward', body: `Start from the fact that insulin is kept in the fridge and injected, while a thyroid tablet sits in a cupboard. Two hormones, two completely different handling requirements. Work backwards from why and you arrive at what each is made of — large and fragile against small and tough — and from there at the whole three-way division, without having to memorise it.` }
  ],

  map: [
    { name: `Hormones and the endocrine system`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Evaluating health claims`, level: 2, fresh: true },
    { name: `Molecules`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Cellular energy`, level: 5 },
    { name: `Nerves and signalling`, level: 5 }
  ]
}
