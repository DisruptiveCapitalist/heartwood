// Anatomy & Physiology · Week 5 · Lesson 25 — found, hidden, fed, spread.
//
// Two prohibitions from the spec govern this lesson. Cancer must not be
// presented as simply a failure of the immune system — so surveillance is one
// factor among several, and the copy says so repeatedly rather than once. And
// no supplement or peptide may be suggested to prevent or cure it — so none is
// named, and the open question turns directly on why "boost your immune system"
// is not what immunotherapy does and not a thing a product can sell you.

export default {
  id: 'lesson-25',
  number: 5,
  week: 5,
  title: `How the body detects and responds to abnormal cells`,
  openingQuestion: `Abnormal cells arise in you regularly, and are found and removed without your ever knowing. That is happening now. So if there is a patrol, and it works, the interesting question is not why cancer happens — yesterday answered that — but how anything ever gets past a system that is looking for exactly this.`,
  concept: `Found, hidden, fed, spread`,

  see: {
    voice: 'professor',
    line: `{name}, take the four stages in order, and then go back and read what each treatment can and cannot reach.`,
    simulation: { id: 'cancer', props: { mode: 'response' } },
    observations: [
      { text: `Patrol finds and removes most abnormal cells **quietly**. That is the usual outcome, and you never learn it happened.` },
      { text: `What gets past has usually learned to **hide** — showing fewer of the flags that mark it out, or switching off the immune cells that arrive. That is not the same as the patrol failing.` },
      { text: `Beyond about a millimetre, nothing grows without persuading **blood vessels** to grow toward it. And what changes the picture most is not size at all — it is whether it has spread.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first contains a warning.`,
    sentences: [
      `Immune surveillance is real and constant — and cancer is **not** simply a failure of it. The tissue around a growth, the blood supply it can recruit, and the signals passing between them matter just as much. Treating it as an immune failure alone gets the biology wrong and leads people somewhere unhelpful.`,
      `What gets past tends to have acquired ways of **hiding**: displaying fewer of the markers that identify it, actively switching off immune cells that arrive, or recruiting cells that suppress the response around it. These are not accidents — they are changes that were selected for, because the cells carrying them survived.`,
      `And treatment aims at **different things**. Some remove, some damage, some block a specific molecular feature, some release a brake. They are usually combined, and which combination depends on the type, how far it has gone, its molecular features and the person's own health.`
    ],
    sequence: {
      label: `WHAT HAS TO HAPPEN, AND WHAT TREATMENT AIMS AT`,
      note: `six approaches, and no two cancers call for the same mix`,
      steps: [
        { name: `Surgery`, body: `Remove the growth itself. Decisive for something local — and it reaches only what can be found and reached, and nothing that has already left.` },
        { name: `Radiation`, body: `Damage the instructions in a targeted area so those cells cannot keep dividing. Local, and healthy tissue in the path is affected too.` },
        { name: `Chemotherapy`, body: `Attack rapidly dividing cells anywhere in the body. That is why it reaches what has spread — and why your gut lining, hair and marrow suffer, since they divide fast too.` },
        { name: `Targeted therapy`, body: `Act on a specific molecular change present in **that** tumour. Which is why tumours are tested first: no change, no target, no point.` },
        { name: `Immunotherapy`, body: `Take off the brakes that cancer cells put on immune cells, so the patrol can resume. Not a general boost — a specific release, and only in some cancers.` },
        { name: `Hormone therapy`, body: `Starve a growth that depends on a hormone, by blocking the receptor or lowering the hormone. Lesson 18's blockers, put to this use.` }
      ]
    },
    comparison: {
      label: `A NEIGHBOURHOOD WATCH`,
      body: `A watch that works stops a great deal of trouble, quietly, and nobody ever hears about the burglaries that did not happen. When one does happen, it is rarely because the watch was asleep — it is because someone wore a high-vis jacket and carried a clipboard, and everyone assumed they were meant to be there. Looking legitimate beats avoiding detection. *Where the analogy stops:* a burglary is not simply the watch's failure, and neither is this. The street's lighting, who is home, where the money is — all of it matters, and a theory of crime built entirely on the watch would be a poor one. That is exactly the mistake to avoid here.`
    },
    naming: `The constant patrol is **immune surveillance**. The brakes that cancer cells exploit are **checkpoints** — normal mechanisms that stop immune cells attacking healthy tissue, borrowed and turned up — and drugs that release them are checkpoint inhibitors, which is what most **immunotherapy** currently means. Persuading vessels to grow is **angiogenesis**, and blocking it is a treatment approach of its own. How far a cancer has gone is its **stage**, and what molecular features it carries is found by testing the tissue — which is why a biopsy is sent away and why the answer takes days.`,
    formalNames: {
      terms: [
        { term: `Immune surveillance`, meaning: `The continuous finding and removal of abnormal cells. Real and constant — and one factor among several, not the whole story.` },
        { term: `Checkpoint`, meaning: `A normal brake stopping immune cells attacking healthy tissue. Some cancers exploit it; releasing it is what most immunotherapy does.` },
        { term: `Angiogenesis`, meaning: `Recruiting new blood vessels. Beyond about a millimetre nothing grows without it, which makes it a target in its own right.` },
        { term: `Staging`, meaning: `How far a cancer has gone — in particular whether it has spread. It shapes treatment more than almost anything else about it.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've come across.`,
    items: [
      `Immunotherapy in the news, described as a breakthrough.`,
      `A biopsy sent away, and a wait of days for the result.`,
      `Being told a "stage" number and not knowing what it meant.`,
      `Hair loss with chemotherapy, and wondering why that particularly.`,
      `Hormone treatment for breast or prostate cancer.`,
      `Someone offered a treatment because their tumour was tested first.`
    ],
    builder: {
      body: `Find any news story about a cancer treatment — they appear most weeks — and work out which of the six approaches it actually is. Is it removing something, damaging an area, hitting fast-dividing cells everywhere, acting on a specific molecular feature, releasing an immune brake, or starving something hormonal? Then ask the Lesson 20 questions: which cancer, in which people, at what stage, compared against what, and how many people were in it. Most coverage answers the first question and none of the rest, and noticing the gap is the skill.`
    },
    ownPlaceholder: `Something about treatment I've heard and not understood…`,
    synthesis: `The hair loss is worth having clearly: it is not a mysterious toxicity but the direct consequence of the mechanism. A treatment that attacks fast-dividing cells reaches hair follicles, gut lining and marrow because those divide fast too.`
  },

  feynman: {
    line: `The last one of the week.`,
    instruction: `Explain to a friend what it means that a cancer has **spread**, and why it changes what treatment can do — **without using the words "metastasis" or "stage."**`,
    banned: ['metasta', 'stage'],
    bannedNote: `one of those came back — and the idea is about where it is, not what it is called`,
    placeholder: `While it is in one place, you can…`,
    checks: [
      `While it is in one place, it can be removed or treated locally.`,
      `Some cells can leave, survive the journey, and start growing somewhere else.`,
      `Once that has happened there isn't one place to treat any more.`,
      `So the treatments that reach the whole body become the ones that matter.`
    ],
    closing: `If your version says "there isn't one place any more", you have the single thing that most shapes how this is treated — and the reason nobody asks first how big it is.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a word in every headline, and one that is sold to a great many people.`,
    prediction: {
      question: `**Immunotherapy.** What does it actually do?`,
      options: [
        {
          id: 'boost',
          text: `Boosts the immune system generally, so it can fight the cancer.`,
          verdict: `This is how it is almost always described in headlines, and it is wrong in a way that matters. A general boost is not the problem being solved — the immune system was not short of enthusiasm. It had been switched off locally, by cells exploiting a brake that exists to stop immune attacks on healthy tissue. The treatment releases that specific brake. The distinction is not pedantry: it is why this works in some cancers and not others, and why "boosting immunity" is not the same idea at all.`
        },
        {
          id: 'brakes',
          text: `Releases a specific brake that cancer cells were using to switch immune cells off.`,
          verdict: `Correct, and it explains both the successes and the side effects. Those brakes exist for a reason — they stop immune cells attacking you. Release them and the patrol can see the cancer again, and can also turn on healthy tissue, which is why immunotherapy's side effects look like autoimmune disease rather than like chemotherapy's. It also explains why it works only where that particular brake was being used: no brake, nothing to release.`
        },
        {
          id: 'kills',
          text: `Kills cancer cells directly, like a more precise chemotherapy.`,
          verdict: `A reasonable guess given how it is grouped with other treatments, and there are antibody-based treatments that do mark cells for destruction, so the family is broader than one idea. But what is usually meant by immunotherapy today does not kill anything itself. It changes what your own immune cells are permitted to do — which is a different kind of intervention, and why the response can continue long after the drug has stopped.`
        }
      ]
    },
    open: {
      question: `A great many products are sold on the promise of **boosting your immune system**, and the idea has obvious appeal after this week. Given everything in these two lessons, what is wrong with it — and why doesn't it follow from immunotherapy working?`,
      placeholder: `The problem wasn't that the immune system was weak…`,
      reveal: [
        `Because the problem was never a shortage of immune activity. What gets past surveillance has usually learned to hide from it or to switch it off locally — so a generally more active immune system is not the thing that was missing. Immunotherapy does not boost; it removes a specific brake in a specific situation, and it only works where that brake was being used.`,
        `And a genuinely boosted immune system is not a good thing to want. Those brakes exist to stop your immune cells attacking you, which is what autoimmune disease is. Immunotherapy's side effects are exactly that — the price of releasing the brake — and they can be serious. "More immune activity" is not a direction you would choose to move in without a specific reason and supervision.`,
        `Which leaves the plain point. Nothing sold as an immune booster has been shown to do any of this, and the week's own argument — that cancer is not simply a failure of immune surveillance — removes the premise the claim rests on. Lesson 20's questions apply here as they do everywhere, and this is a place where the consequences of a bad claim are as serious as they get. Anything that matters here is a conversation with an oncologist, not a purchase.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that's the week.`,
    prompt: `One thing about how the body handles abnormal cells that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `That's Week 5. Barriers and two speeds of defence, inflammation as delivery, four kinds of trouble with four different answers, and cancer as an accumulation rather than an event. Week 6 is the last — reproduction, how medicines travel through you, and then the whole body at once.`
  },

  routes: [
    { id: 'analogy', body: `An office with a security pass system. Most people without a pass are stopped at the door, every day, and nobody writes that down. Trouble comes from someone who has got hold of a pass, or who walks in behind somebody carrying two coffees. Catching that is not a matter of hiring more guards — it is a matter of the specific trick being used. More guards is the answer to a problem nobody had.` },
    { id: 'object', body: `Think about chemotherapy's reputation for hair loss, and then about what hair is: cells dividing exceptionally fast at the root, day and night. A treatment that targets fast division cannot tell a hair follicle from anything else dividing fast. The side effect is not a flaw in the drug — it is the drug's mechanism, arriving somewhere it was not aimed at. Which is precisely why targeted treatments were worth developing.` },
    { id: 'story', body: `In the 1890s a New York surgeon named William Coley noticed that occasional patients whose tumours became infected afterwards saw the tumour shrink. He spent decades injecting bacterial preparations into tumours, with results nobody could reproduce reliably, and the idea was largely abandoned. A century later, checkpoint inhibitors made immunotherapy work — by a mechanism Coley could not have guessed at. He was right that the immune system could be involved and wrong about almost everything else.` },
    { id: 'experiment', body: `Look at a scar you have had for years. The skin there is different — the pattern of collagen never quite returned to the original weave, as Lesson 22 described. Now consider that the body laid that down, organised it, stopped at the right moment and has maintained it since. The same controls that stop repair when repair is finished are the ones this week has been about, which is why their loss has the consequences it does.` },
    { id: 'smaller', body: `Forget cancer. One question: if a guard is looking for people without a badge, what is the easiest way past? Wear a badge. Not overpower the guard, not avoid the building — look like you belong. Now ask what more guards would achieve against that, and you have both why surveillance fails in the particular way it does and why boosting it generally is not the answer.` },
    { id: 'backward', body: `Start with why a biopsy is sent away for days rather than examined on the spot. If it were only a question of cancer or not, a microscope would often answer within the hour. The wait is for molecular testing — which specific changes this tumour carries — because that decides whether a targeted treatment exists for it. Work backwards from the delay and you arrive at treatments aimed at particular features, and at why "which cancer" matters more than "cancer".` }
  ],

  map: [
    { name: `Cancer and abnormal growth`, level: 5 },
    { name: `Immunity and defence`, level: 5 },
    { name: `Evaluating health claims`, level: 5 },
    { name: `Infection and disease`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Blood and vessels`, level: 5 },
    { name: `Homeostasis`, level: 5 }
  ]
}
