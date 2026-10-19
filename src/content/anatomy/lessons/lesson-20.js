// Anatomy & Physiology · Week 4 · Lesson 20 — where does this sit?
//
// This is the lesson the course was commissioned for. The spec's mission
// section asks that the learner finish able to evaluate claims about peptides,
// supplements and treatments, and §5 sets out the five categories and the seven
// questions verbatim. §8 adds the hard constraints: no recommending unapproved
// use, no dosing, no injection instructions, no treatment changes, and current
// approval status verified against authoritative sources rather than memory.
//
// Regulatory statements here were checked against FDA material in October 2026
// and are date-stamped on screen and in the copy, because they will age and a
// learner who does not know that has been given false confidence. The method is
// what the lesson teaches; the examples are illustrations of the method.

export default {
  id: 'lesson-20',
  number: 5,
  week: 4,
  title: `Peptides in health: evidence, possibilities and risks`,
  openingQuestion: `You now know what a peptide is, what a hormone is, what a receptor does, and why binding one proves nothing. Today you point all of that at a shelf. Someone offers you a molecule and a story about what it does. The story may be entirely true and still be no reason to take it. How do you tell the difference?`,
  concept: `Where does this sit?`,

  see: {
    voice: 'professor',
    line: `{name}, take each one in turn and watch where it lands. The distance between where something sits and how confidently it is sold is the thing to notice.`,
    simulation: { id: 'evidence-ladder' },
    observations: [
      { text: `Insulin, semaglutide and teriparatide all sat at the **top** — approved for named uses, in named groups, at stated doses, after large trials in people.` },
      { text: `BPC-157 sat down at **animals**, with no approved human use anywhere — and a volume of marketing entirely unrelated to that position.` },
      { text: `The gap between "it does something in a dish" and "it helps a person" is enormous, and almost every disputed health claim you will ever meet lives inside it.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and then the only tool you actually need.`,
    sentences: [
      `**Five different things** get called peptides, and they are not interchangeable: molecules your body makes, medicines approved for specific uses, substances being studied in trials, preparations compounded by a pharmacy, and products sold "for research use only" that are not for people at all.`,
      `A **mechanism is a reason to investigate, not a finding**. Lesson 18 showed why: binding is not triggering, triggering is not reaching the tissue, and none of it is a person being better off. A plausible story about how something could work is the beginning of the question.`,
      `So the useful move is never "is this good?" but **"where does this sit, and how would I know?"** — which is a question you can ask about anything, including things nobody has thought to lie about.`
    ],
    sequence: {
      label: `FIVE THINGS CALLED PEPTIDES`,
      note: `the word covers all of these, and they could hardly differ more`,
      steps: [
        { name: `Ones your body makes`, body: `Insulin, glucagon, oxytocin. Known molecules, known targets, made in the right place at the right moment in the right amount — none of which is true of a vial.` },
        { name: `Approved medicines`, body: `Peptides judged by a regulator to have shown benefit for a named use: insulin, semaglutide for type 2 diabetes and for weight management, teriparatide for osteoporosis. Specific indication, specific dose, known harms.` },
        { name: `Under study`, body: `Molecules in trials right now. Some will work and most will not — that is what a trial is for. "In clinical trials" describes a process, not a result.` },
        { name: `Compounded preparations`, body: `Made up by a pharmacy rather than manufactured under an approved application. A real and regulated practice with real uses — and not the same as an approved product, and regulators have warned sellers offering copies of approved medicines this way.` },
        { name: `"For research use only"`, body: `Not assessed for people, and not permitted to be sold for use in them. The phrase is not a formality or a legal shrug. It is the most informative sentence on the label.` }
      ]
    },
    comparison: {
      label: `A CV AND A REFERENCE`,
      body: `A job applicant's CV is what they say about themselves — plausible, well-organised, and written entirely by the interested party. A reference is what someone else says about what actually happened when they did the job. A mechanism is a CV: "this molecule binds this receptor, which is involved in healing." A trial is a reference: "we gave it to four hundred people and compared them with four hundred who got nothing." Nobody hires on a CV alone, and the better the CV reads, the more the reference matters. *Where the analogy stops:* a candidate with no references might simply be young. A molecule with no human evidence and a decade of marketing behind it is telling you something rather different.`
    },
    naming: `Work before people is **preclinical** — cells and animals. Work in people is **clinical**, and the strongest form is the **randomised controlled trial**, where people are assigned by chance so that the groups differ only in what they were given. The reason chance matters is that without it the healthier, richer, more motivated people end up in the treatment group and make anything look effective. When many trials are gathered and weighed together that is a **systematic review**, and it is the best evidence there is about almost anything.`,
    formalNames: {
      terms: [
        { term: `Preclinical`, meaning: `Cells and animals. Necessary, and a poor predictor — the great majority of things that work here never work in people.` },
        { term: `Randomised controlled trial`, meaning: `People assigned by chance to treatment or comparison. The only design that reliably separates the treatment from everything else about the people taking it.` },
        { term: `Indication`, meaning: `The specific use a medicine is approved for, in a specific group. Approval is never approval of a molecule in general.` },
        { term: `Compounding`, meaning: `A pharmacy preparing a medicine for a particular need. Legitimate and regulated — and distinct from an approved manufactured product, with different assurances.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `These claims find everybody eventually. Tap any you've met.`,
    items: [
      `An advert for "peptide therapy" at a clinic.`,
      `A podcast guest describing a molecule they take.`,
      `A friend who is certain something transformed their energy.`,
      `A supplement aisle with the word on half the boxes.`,
      `A website selling vials "for research purposes".`,
      `A news story about a trial, with no mention of how many people were in it.`
    ],
    builder: {
      body: `Pick one product — any product, including one you already use and like — and run the seven questions on it. Write each question down and try to answer it from what the seller actually tells you. Which molecule, how much, acting on what, what evidence in people, what harms, approved for this, and how reliable is the source. The point is not to catch anyone out. The point is to notice **how many you cannot answer**, and that this is itself the answer. Then take the ones that matter to a pharmacist, who is free, expert in exactly this, and almost never asked.`
    },
    ownPlaceholder: `Something I've been curious about, or sceptical of…`,
    synthesis: `The pharmacist is the undervalued one on that list. They know the molecules, the interactions and the manufacturing, they have no stake in selling you anything, and most people have never asked them a question in their lives.`
  },

  feynman: {
    line: `The last one of the week, and the most useful thing in it.`,
    instruction: `Explain to a friend why "your body already makes it, so it must be safe" isn't a reason to take something — **without using the words "evidence" or "study."**`,
    banned: ['evidence', 'study', 'studies'],
    bannedNote: `one of those came back — and the argument works without ever appealing to them`,
    placeholder: `Your body makes it in a particular place and amount, but…`,
    checks: [
      `Your body makes it in a particular place, at a particular time, in a particular amount.`,
      `None of that is true of something taken from a vial or a bottle.`,
      `Being a thing the body makes says nothing about whether more of it helps.`,
      `And without a reliable maker, you don't actually know what is in there.`
    ],
    closing: `That argument lands with almost anyone, because it never calls them foolish — it just separates "your body makes this" from "so take this", which were never the same claim.`
  },

  challenge: {
    voice: 'editor',
    line: `One about four words on a label, and one about a conversation you will certainly have.`,
    prediction: {
      question: `A vial is sold online marked **"for research use only."** What does that phrase actually mean?`,
      options: [
        {
          id: 'legal',
          text: `It's legal boilerplate — a formality to keep the seller out of trouble.`,
          verdict: `It does protect the seller, so the instinct is not silly. But reading it as *only* a formality gets the meaning backwards. The phrase is there because the product has not been assessed for use in people and is not permitted to be sold for that purpose — and the seller is telling you so in the plainest terms the law provides. It is the most informative sentence on the label, and it is written to be skimmed past.`
        },
        {
          id: 'notassessed',
          text: `That it hasn't been assessed for use in people, and isn't meant to be used in them.`,
          verdict: `Correct, and it carries a second consequence worth as much as the first. No approved manufacturer means no assurance about what is actually in the vial — identity, purity, dose, sterility, all unverified. So there are two separate unknowns: whether the molecule would help anyone, and whether the molecule is even in there. Regulators have issued warnings to sellers over precisely this, including over products offered as copies of approved medicines.`
        },
        {
          id: 'quality',
          text: `That it's a research-grade product — purer than consumer versions.`,
          verdict: `This reading is actively encouraged by how such products are presented, and it has things exactly reversed. "Research grade" is not a quality standard above medical grade; the phrase means the material was not made to the standards required for human use, because it was never intended for it. The word "research" is doing a great deal of work here that it has not earned.`
        }
      ]
    },
    open: {
      question: `Someone you like tells you, with real conviction, that a peptide transformed their energy. They are not lying and they are not foolish. What is the **strongest true thing** you can say about their experience?`,
      placeholder: `Their experience is real, but it can't separate…`,
      reveal: [
        `That it happened, and that it cannot tell either of you why. A single person's experience cannot separate the molecule from everything else that changed: the hope of starting something, the attention paid to sleep and food once they were paying attention to anything, the season, the fact that people most often start something when they feel worst and would have drifted back up anyway. None of those makes them wrong. All of them make the question unanswerable from one person.`,
        `That is the entire reason trials exist, and it is worth saying out loud that the comparison group is not bureaucracy — it is the only way to find out what would have happened anyway. The honest position is not "you are mistaken". It is "neither of us can tell from this, and that is not a failing of yours."`,
        `And the kind response is a question rather than a correction. What is the molecule? Where did it come from? Has anyone looked at it in people? What does your doctor say, and what does a pharmacist say about what else you take? Those questions respect the person and interrogate the claim, which is the right way round. Nothing in this course can tell anybody what to take, and it would be a poor course if it tried — what it can do is make you harder to sell to, and better company for a friend who is being sold to.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that is the week, and the half-way point of the course.`,
    prompt: `One thing about judging a health claim that I understand now and didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `That's Week 4. Glands that broadcast, a word that describes construction rather than function, receptors where binding proves nothing, four organs sharing the fuel, and a ladder for anything anyone ever tries to sell you. Week 5 turns to defence — the immune system, inflammation, infection, and what cancer actually is.`
  },

  routes: [
    { id: 'analogy', body: `A horse with an extraordinary pedigree, in a field. The breeding is real and it is genuinely a reason to be interested — but nobody who has been near racing would put money on it before it has run. The pedigree is the mechanism; the form book is the trial. And the louder a seller talks about breeding, the more carefully you want to look for the races.` },
    { id: 'object', body: `Take any prescription box and look at what is printed on it: the molecule, the strength, the number, the maker, a batch, an expiry. Now look at a supplement jar with "peptides" on the front. The difference is not that one is natural and one is not. It is that one has been required to tell you what is inside and the other has not, and everything downstream of that follows.` },
    { id: 'story', body: `In the 1990s, hormone replacement after menopause was widely believed to protect against heart disease. The mechanism was sound and the observational data supported it — until a large randomised trial in the early 2000s found the picture was considerably more complicated and in some groups ran the other way. Nobody had been dishonest. A plausible mechanism and a real-looking pattern had simply not been the same thing as a tested result, and it took a trial with a comparison group to find out.` },
    { id: 'experiment', body: `Find any product making a health claim and try to trace it to a human trial. Search the molecule's name with the word "randomised". Count how many clicks it takes to reach either an actual study in people or a dead end. For a well-evidenced medicine it usually takes two. For most of what is sold, the trail runs out in press releases and cell work, and running out is the finding.` },
    { id: 'smaller', body: `Forget peptides entirely. One question: if someone tells you a thing works, what would have to be true for them to know that? Someone must have given it to a group of people, not given it to a similar group, and compared. Nothing else can separate the thing from everything else going on in a life. Now ask, of any claim in front of you, whether that has happened — and you have the whole lesson in one question.` },
    { id: 'backward', body: `Start with why medicines are expensive to develop. Most of the cost is not finding the molecule — it is the years of trials in people, most of which fail. Work backwards from "the expensive part is proving it helps someone" and you arrive at why a mechanism is cheap, why a mechanism is what gets advertised, and why the absence of the expensive part is exactly what you are looking for on a label.` }
  ],

  map: [
    { name: `Evaluating health claims`, level: 5, fresh: true },
    { name: `Hormones and the endocrine system`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Metabolism and energy balance`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Muscles and movement`, level: 5 },
    { name: `Bone and the skeleton`, level: 5 }
  ]
}
