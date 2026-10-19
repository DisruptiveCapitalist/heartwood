// Anatomy & Physiology · Week 5 · Lesson 23 — four kinds of trouble.
//
// The spec's hard requirement: antibiotics act against susceptible bacteria and
// not against viruses. The reason is structural, so the simulation leads with
// size and machinery — a bacterium is a complete living cell with its own wall
// and its own ribosomes, and those are exactly what antibiotics attack. A virus
// has neither. It is not that the drug is too weak; there is nothing there.
//
// The spec also asks that the learner be taught to distinguish a general
// biological explanation from personal medical advice, so the open question is
// about where the line falls rather than being a disclaimer at the end.

export default {
  id: 'lesson-23',
  number: 3,
  week: 5,
  title: `Infection, disease and the body's response`,
  openingQuestion: `You can be infected and perfectly well. You can feel dreadful from something that has already been dealt with. And a doctor can tell you, about an illness that has flattened you for a week, that antibiotics will not help in the slightest — which sounds like being refused something. Each of those is the same confusion, and clearing it up takes four words kept apart.`,
  concept: `Infected is not the same as ill`,

  see: {
    voice: 'professor',
    line: `{name}, look at the size comparison before anything else. Then read the "what is there to attack" line for a bacterium and for a virus.`,
    simulation: { id: 'pathogens' },
    observations: [
      { text: `A bacterium is roughly **twenty times across** what a virus is. A few hundred bacteria would fit inside one of your own cells; a virus is smaller again by the same margin.` },
      { text: `A bacterium is a **complete living cell** with its own wall and its own machinery. A virus has neither — it gets inside your cells and uses yours.` },
      { text: `Which is exactly why antibiotics do nothing for a cold. They attack a bacterium's wall and its protein-building machinery. A virus has no wall and no machinery. There is nothing there to attack.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first is four words that get used as if they were one.`,
    sentences: [
      `**Infection** means something has taken up residence. **Disease** means you are unwell because of it. **Symptoms** are what you notice — and most of them are your own response rather than the intruder. A **risk factor** makes something more likely and never certain.`,
      `Four kinds of trouble, differing in how they get in, how they make more of themselves, how they spread and how they hide. A medicine that works against one has usually no effect whatever on another, because it was built for a target that the others do not have.`,
      `And three different jobs get done by three different things: **vaccines** prepare you beforehand, **antimicrobials** attack where there is something to attack, and **supportive care** keeps you going while your own defences do the work. For a great many illnesses the third is the whole of the treatment, and that is not nothing.`
    ],
    sequence: {
      label: `FOUR WORDS, KEPT APART`,
      note: `and the trouble starts when they are run together`,
      steps: [
        { name: `Infection`, body: `Something has taken up residence and is multiplying. You may be entirely well — a great many people carry bacteria that never trouble them.` },
        { name: `Disease`, body: `You are unwell because of it. Infection without disease is common; disease without infection is commoner still, since most illness is not infectious at all.` },
        { name: `Symptoms`, body: `What you notice. Fever, aches and fatigue are largely **your** response rather than the intruder's doing — which is why two people with the same infection can be so differently affected.` },
        { name: `Risk factor`, body: `Something that shifts the odds. Not a cause, not a guarantee, and never a verdict on an individual — which is the hardest of the four to hold onto.` }
      ]
    },
    comparison: {
      label: `A STOWAWAY AND A FORGED ORDER`,
      body: `A bacterium is a stowaway: a complete, independent living thing that has got aboard and is eating your supplies and multiplying in the hold. You can go after it directly, because it has its own body and its own habits, and anything that damages those damages it and not the ship. A virus is a forged work order slipped into the system — it has no body and does nothing itself. It gets your own crew to build thousands more copies of the order. There is no stowaway to find. *Where the analogy stops:* most stowaways aboard you are harmless or useful, and the ship would do badly without them. You carry several pounds of bacteria and want to keep nearly all of it.`
    },
    naming: `Anything that can cause disease is a **pathogen**. Something living on you without causing trouble is **colonisation**, not infection — and most of your bacteria are exactly that. Medicines against microbes are **antimicrobials**, of which antibiotics are the ones aimed at bacteria. When bacteria that were once susceptible stop being so, that is **antimicrobial resistance**, and it is a population of bacteria changing rather than a person changing — which is the second question below, and one of the most consequential misunderstandings in medicine.`,
    formalNames: {
      terms: [
        { term: `Pathogen`, meaning: `Any organism or agent capable of causing disease. A small minority of the microbes you meet.` },
        { term: `Colonisation`, meaning: `Living on or in you without causing disease. The normal state for most of the bacteria you carry.` },
        { term: `Antibiotic`, meaning: `A medicine attacking structures or machinery specific to bacteria. Useless against viruses, because the targets do not exist there.` },
        { term: `Supportive care`, meaning: `Fluids, rest, pain relief, oxygen — keeping a person going while their own defences work. For many infections it is the entire treatment.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've run into.`,
    items: [
      `Being told antibiotics wouldn't help, and feeling slightly fobbed off.`,
      `Being told to finish the course even though I felt better.`,
      `A hospital notice about MRSA or hand washing.`,
      `A cold lasting its week whatever I did.`,
      `Food poisoning that came on fast and went quickly.`,
      `Thrush or athlete's foot needing something entirely different.`
    ],
    builder: {
      body: `Find any antimicrobial in the house — an antibiotic, an antifungal cream, a cold sore treatment — and read what it says it is for. Notice that it names a **category**, and sometimes a specific organism, and never says "for infections". Then notice the shape of the instruction: a course of a specific length, at specific intervals. Both of those follow from this lesson. The target is particular, and the dosing is designed to keep the level high enough for long enough that the survivors do not simply repopulate.`
    },
    ownPlaceholder: `A time I was ill and wasn't sure what with…`,
    synthesis: `The "fobbed off" one is worth sitting with. Being told there is no useful medicine is not being refused treatment — supportive care *is* treatment, and for most viral illness it is the only treatment that exists.`
  },

  feynman: {
    line: `Teach it, and the obvious words are gone.`,
    instruction: `Explain to a friend why antibiotics do nothing for a cold — **without using the words "virus", "viral" or "bacteria."**`,
    banned: ['virus', 'viral', 'bacteri'],
    bannedNote: `one of those came back — and the explanation works entirely without naming either`,
    placeholder: `The medicine attacks something that one of them has and the other doesn't…`,
    checks: [
      `The medicine works by attacking particular structures and machinery.`,
      `One kind of intruder is a complete living cell and has those things.`,
      `The other is not a cell at all — it uses your own machinery to make more of itself.`,
      `So there is simply nothing for the medicine to act on. It isn't too weak; the target doesn't exist.`
    ],
    closing: `"The target doesn't exist" is the sentence to keep. It turns a frustrating answer from a doctor into an obvious one.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a phrase everyone has heard wrong, and one about why you feel so awful.`,
    prediction: {
      question: `Antibiotic resistance. When people say someone has "become resistant to antibiotics", what has actually become resistant?`,
      options: [
        {
          id: 'person',
          text: `The person — their body has got used to the medicine.`,
          verdict: `This is the commonest understanding and it is wrong in a way that matters, because it suggests resistance is something you do to yourself and could undo by taking a break. Your cells are not the target of an antibiotic and do not adapt to it. The phrase "becoming resistant" has misled a great many people, and the misunderstanding changes how seriously the problem seems to be taken.`
        },
        {
          id: 'bacteria',
          text: `The bacteria — the population has changed, not the person.`,
          verdict: `Correct, and the mechanism is plain evolution on a timescale you can watch. In any large population a few bacteria happen to carry a change that lets them survive the drug. Kill the rest and those few have the place to themselves and multiply. Nothing learned anything; the susceptible ones simply died and the survivors were already there. It also explains why resistance is shared rather than personal — these populations move between people, and bacteria can pass resistance to each other directly.`
        },
        {
          id: 'both',
          text: `Both — the body adapts and the bacteria adapt.`,
          verdict: `Half right, and the half that is right is the important half. There are genuine ways a person's response to a medicine changes over time — Lesson 18's receptors reducing in number is one. But that is not what antibiotic resistance is, because an antibiotic does not act on your receptors at all. It acts on the bacterium, and the bacterium is where the change happens.`
        }
      ]
    },
    open: {
      question: `With influenza you ache all over, run a fever, and feel wrung out — and most of that persists after your defences have already won. Given Lessons 21 and 22, how much of feeling ill is actually the **intruder**, and how much is **you**?`,
      placeholder: `Most of what I feel might be my own…`,
      reveal: [
        `Mostly you. The fever is a set point you moved deliberately. The aches are inflammatory signals circulating. The exhaustion is a reallocation — energy pulled away from everything that can wait. None of that is being done to you by the virus; it is what mounting a serious defence costs, and it is why two people with identical infections can be affected so differently.`,
        `That is also why you feel rough for a day after some vaccinations, having met no infection at all, and why the worst of flu can arrive as your response peaks rather than as the virus does. Symptoms are a poor guide to what is happening and an even poorer guide to how much is left to come.`,
        `And it marks a line worth being clear about. "Fever is a regulated change in a set point" is a general biological explanation, and this course can give you that. "Your fever means you should do X" is personal medical advice, and depends on the illness, the person, their age, what else is going on and what they take. The first is what a course is for; the second needs someone who can examine you, and the difference between them is not a formality.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about infection or medicines I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 24: cancer. Your cells divide tens of millions of times an hour, and damage happens constantly — so the real question is not why it ever goes wrong, but why it so rarely does.`
  },

  routes: [
    { id: 'analogy', body: `Weedkiller works on plants because plants have machinery animals do not — so you can spray a lawn without harming the dog. That same logic is the whole of why an antibiotic is possible: it attacks a wall and a protein factory that bacteria have and you do not. Now ask what you would spray on something that has no machinery of its own because it is using yours. There is no such spray, and that is the problem with viruses in one sentence.` },
    { id: 'object', body: `Look at a bottle of hand sanitiser and read what it claims to kill. Alcohol works by physically wrecking membranes and proteins — crude, indiscriminate, effective against a great many things, and useless as a medicine because it would do the same to you. Everything about medicine is the search for a difference between them and you. Where the difference is large you get an antibiotic. Where it is small you get an antifungal, with more side effects.` },
    { id: 'story', body: `Alexander Fleming noticed in 1928 that a mould contaminating a plate had cleared a ring in the bacteria around it. What is less often told is that he could not purify enough of it to be useful and largely moved on; it took Florey, Chain and Heatley a decade later, with the pressure of a war, to turn it into a medicine. Fleming also warned, in his Nobel lecture in 1945, that careless use would breed resistant bacteria. He was right within a few years.` },
    { id: 'experiment', body: `Leave a slice of bread out in a sealed bag for a week and look at it each day. What appears is fungus — visible threads, because fungal cells are large enough to build structures you can see without a microscope. Now consider that bacteria were growing on that bread from day one and you could see nothing, and that viruses, if present, would be invisible under most microscopes. The sizes in this lesson are the reason each of those is true.` },
    { id: 'smaller', body: `Forget pathogens. One question: how do you poison something living inside you without poisoning yourself? You find something it has that you do not. Now ask what you would do about something that has nothing of its own at all, because it has borrowed your equipment. There is nothing unique to poison, and you have just derived why antivirals are hard and antibiotics are comparatively easy.` },
    { id: 'backward', body: `Start with why you are told to finish a course of antibiotics even once you feel well. Feeling well means the population has been knocked down, not eliminated — and the ones most likely to be left are the least susceptible. Work backwards from "the survivors are the hardest to kill" and you arrive at how resistance arises, why it belongs to the bacteria rather than to you, and why stopping early is a problem for everyone rather than just for the patient.` }
  ],

  map: [
    { name: `Infection and disease`, level: 4, fresh: true },
    { name: `Immunity and defence`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Evaluating health claims`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Blood and vessels`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Molecules`, level: 5 }
  ]
}
