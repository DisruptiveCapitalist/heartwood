// Anatomy & Physiology · Week 6 · Lesson 29 — everything goes to the liver first.
//
// Measured off the simulation: roughly 30 m² of absorbing surface, 180 litres
// filtered by the kidneys daily with over 99% returned, and the hepatic portal
// arrangement that sends everything absorbed to the liver before anywhere else.
//
// That last fact is the hinge with Lesson 28 and the reason these share a
// component. The spec also asks for the organs' interdependence — a problem in
// one affecting others — which the open question takes directly.

export default {
  id: 'lesson-29',
  number: 4,
  week: 6,
  title: `The digestive system, liver and kidneys`,
  openingQuestion: `Your kidneys filter about a hundred and eighty litres of fluid out of your blood every day — roughly a bathtub — and then put more than ninety-nine per cent of it straight back. That is an extraordinary amount of work to end up almost exactly where you started. Why would anything be built that way?`,
  concept: `Throw it all out, then reclaim`,

  see: {
    voice: 'professor',
    line: `{name}, tap the liver and read where everything absorbed goes first. That one arrangement explains most of yesterday's lesson.`,
    simulation: { id: 'processing', props: { mode: 'digestion' } },
    observations: [
      { text: `Essentially all absorption happens in the **small intestine** — folded and fringed into roughly thirty square metres, about half a badminton court, packed into your abdomen.` },
      { text: `And everything absorbed goes to the **liver first**, before reaching the rest of you. Not as one stop among many — as the first stop, by design.` },
      { text: `The kidneys filter about **180 litres a day** and give back over 99%. They are not removing waste so much as deciding, continuously, what is worth keeping.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third reframes an organ most people have backwards.`,
    sentences: [
      `Digestion is **three separate jobs** in three places: breaking food down (mouth and stomach), absorbing what results (small intestine), and reclaiming water from what is left (large intestine). Almost nothing is absorbed before the small intestine — the earlier stages are preparation.`,
      `The **liver** sits downstream of all of it, and everything absorbed arrives there before anywhere else. It stores, it builds, it transforms, and it is where most medicines are dealt with — which is why "first pass" was yesterday's whole explanation for why a swallowed dose is not an injected one.`,
      `And the **kidneys** are better understood as reclaimers than as removers. Rather than picking out what is unwanted, they push nearly everything out of the blood and then take back what is wanted — water, salts, sugar, in exactly the amounts needed. What is left over is urine, and it is a remainder rather than a product.`
    ],
    sequence: {
      label: `FROM A MOUTHFUL TO A BLOODSTREAM`,
      note: `and then what the two chemical works do with it`,
      steps: [
        { name: `Mouth and stomach`, body: `Broken up mechanically, then by acid and enzymes. Hardly anything is absorbed here — this stage is making things small enough to be worth absorbing.` },
        { name: `Small intestine`, body: `Where it all happens. Thirty square metres of surface, and the blood vessels behind it collect everything that crosses.` },
        { name: `Straight to the liver`, body: `Those vessels do not join the general circulation. They run together into one vein that goes **directly to the liver** — so the liver sees everything you absorb before your heart or your brain does.` },
        { name: `The liver sorts it`, body: `Sugar stored as Lesson 19's glycogen, amino acids built into proteins, toxins and medicines transformed. Only then does what remains join the rest of the circulation.` },
        { name: `The kidneys adjust it`, body: `Blood passes through continuously. Almost everything small is pushed out, then water, salts and sugar are reclaimed to whatever degree the body needs today.` },
        { name: `Large intestine`, body: `Meanwhile what was never absorbed moves on, water is reclaimed from it, and the bacteria living there — several pounds of them — work on what we cannot digest ourselves.` }
      ]
    },
    comparison: {
      label: `GOODS IN, AND A QUALITY INSPECTOR`,
      body: `Nothing arriving at a well-run warehouse goes straight to the shelves. It goes to goods-in first, where it is checked, sorted, repackaged and some of it rejected — and only then released into the building. The liver is goods-in, and the arrangement is deliberate: anything swallowed, helpful or harmful, meets it before it meets your heart. The kidneys are a different kind of inspector, standing on the main corridor and checking everything that passes, over and over, all day. *Where the analogy stops:* goods-in handles things once. Your kidneys process the same blood dozens of times a day, which is why they can adjust its composition so finely.`
    },
    naming: `The vein carrying absorbed material to the liver is the **hepatic portal vein**, and the loss on the way through is yesterday's **first-pass effect**. Each kidney contains about a million filtering units called **nephrons**, and the rate at which they filter — the **glomerular filtration rate** — is the number on a blood test that stands for kidney function. Worth holding onto: these two organs are downstream of everything else, which is why their condition affects medicines, hormones, energy and fluid balance all at once, and why they are tested before a great many treatments are given.`,
    formalNames: {
      terms: [
        { term: `Hepatic portal vein`, meaning: `Carries everything absorbed from the gut directly to the liver before the general circulation. The anatomical reason for the first-pass effect.` },
        { term: `Nephron`, meaning: `One of about a million filtering units per kidney. Pushes fluid out of the blood, then reclaims what is wanted along its length.` },
        { term: `Filtration rate`, meaning: `How fast the kidneys filter, and the standard measure of their function. It falls gradually with age in most people.` },
        { term: `Gut bacteria`, meaning: `Several pounds of them in the large intestine, breaking down what you cannot and producing vitamins and other compounds you absorb.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `Liver function tests on a blood form.`,
      `Kidney function checked before a scan or a new medicine.`,
      `Someone on dialysis, and what it is replacing.`,
      `Being told to drink more water, without being told why.`,
      `Jaundice — the yellow that means the liver is struggling.`,
      `Antibiotics upsetting digestion for a week afterwards.`
    ],
    builder: {
      body: `Keep a rough tally of everything you drink in one day — cups, glasses, whatever it comes in — and add it up in litres. Most people land somewhere between one and a half and three. Now set that against a hundred and eighty, which is what your kidneys filtered out of your blood on that same day and then almost entirely reclaimed. The gap between those two numbers is the point. Your kidneys are not processing what you drank; they are going over the whole of your blood again and again, and what you drink only changes how much of the reclaimed water they bother to keep.`
    },
    ownPlaceholder: `Something about these organs I've heard and not understood…`,
    synthesis: `The antibiotic one is worth noticing: a medicine aimed at an infection somewhere else also reaches the bacteria you depend on in the large intestine, because the blood goes everywhere. Lesson 5's broadcast problem, with a side effect attached.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why a problem with someone's liver or kidneys changes how their **medicines** are prescribed — **without using the words "filter" or "first pass."**`,
    banned: ['filter', 'first pass', 'first-pass'],
    bannedNote: `one of those came back — and the chain can be told without either`,
    placeholder: `Everything swallowed goes through one of them before…`,
    checks: [
      `Everything absorbed from the gut reaches the liver before the rest of the body.`,
      `The liver chemically changes a great deal of it, including most medicines.`,
      `The kidneys are what remove most of it afterwards.`,
      `So if either is working less well, the same dose reaches a different level and stays for a different length of time.`
    ],
    closing: `If your version has "the same dose is not the same dose" in it, you have joined this lesson to yesterday's — which is the whole reason they sit next to each other.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a design that looks wasteful, and one about why these two organs matter so much.`,
    prediction: {
      question: `The kidneys push 180 litres a day out of the blood and reclaim over 99%. Why not simply pick out the unwanted things and leave the rest alone?`,
      options: [
        {
          id: 'simpler',
          text: `Because throwing everything out and reclaiming is actually simpler to build.`,
          verdict: `There is real insight here and it is close to right. Recognising every individual unwanted substance would require a specific mechanism for each one — including things the body has never encountered, like a new medicine. Pushing everything small out indiscriminately and then reclaiming the short list of things you want is a far simpler rule, and it handles novel substances automatically. What it is not is cheap, which is the other half of the answer.`
        },
        {
          id: 'control',
          text: `Because it gives fine control over what's kept — including water and salts, minute by minute.`,
          verdict: `Right, and it is the deeper reason. Reclaiming lets the body decide, continuously, exactly how much water and how much of each salt to keep, in response to how much you drank and how hot it is and what your blood pressure is doing. A system that only removed named waste could not adjust anything. This arrangement makes the kidney the body's main instrument for regulating the blood's composition — which is a far bigger job than removing waste, and Lesson 5's homeostasis at its most literal.`
        },
        {
          id: 'speed',
          text: `Because it's faster to process everything than to sort through it.`,
          verdict: `Speed is a reasonable thing to reach for, and in a sense the bulk approach does avoid a slow sorting step. But the kidneys are not under time pressure — they have all day and they use it, passing the same blood through dozens of times. What the arrangement buys is not speed but adjustability, and the enormous volume is the price paid for being able to fine-tune the result.`
        }
      ]
    },
    open: {
      question: `The spec for this course says that a problem in one organ can affect others. Why is that **particularly** true of the liver and kidneys — more so than, say, a problem in a knee?`,
      placeholder: `They're downstream of everything, so…`,
      reveal: [
        `Because they are downstream of everything else. A knee is a local arrangement: it does one job in one place, and trouble there stays largely there. The liver and kidneys process what every other organ produces and everything you take in — so anything wrong with them propagates outward into systems that have nothing wrong with them at all.`,
        `Follow one chain. Reduced kidney function means medicines clear more slowly, so ordinary doses accumulate — Lesson 28. It means fluid and salt balance drifts, which affects blood pressure, which affects the heart from Lesson 6. The kidneys also signal for red cell production, so output falls and oxygen delivery suffers, which is Lesson 8's chain with a new weak link. And they are part of activating vitamin D, so bone remodelling is affected too, which is Lesson 11. One organ, four systems, none of them diseased.`,
        `That is the shape of a great deal of medicine, and it is the honest reason "a problem in one system affects others" is more than a slogan. It is also why these organs are tested so routinely before anything else is started — not because they are likely to be the complaint, but because what they are doing determines what everything else will do. Tomorrow's lesson is about exactly this: the body as one connected thing rather than six weeks of separate chapters.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about digestion, the liver or the kidneys that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow is the last one. No new material — just everything at once, and a question about what you can explain now that you could not have explained six weeks ago.`
  },

  routes: [
    { id: 'analogy', body: `A sorting office that opens every envelope, takes out what the town wants and sends the rest on. It would be madness for parcels, and it is exactly right when you cannot know in advance what might arrive — including things nobody has ever posted before. Your kidneys handle a medicine invented last year with no special arrangement, because the rule is "push out everything small and take back the list of things we want".` },
    { id: 'object', body: `Unfold a bath towel and look at the loops on its surface. The towel is far more absorbent than a flat sheet of the same size because the loops multiply its area enormously — and your small intestine does the same trick three times over, with folds, then projections on the folds, then microscopic fringes on those. A flat tube of the same length would absorb a tiny fraction of what you need.` },
    { id: 'story', body: `In 1822 a trapper named Alexis St. Martin survived a gunshot that left a permanent opening into his stomach. The army surgeon who treated him, William Beaumont, spent years lowering food in on strings and observing what happened — eventually publishing the first real account of digestion as a chemical process rather than a mechanical grinding. The ethics of the arrangement were questionable at best, and nearly everything known about gastric digestion for the following century came from it.` },
    { id: 'experiment', body: `Chew a piece of plain bread for a full minute without swallowing, and pay attention to the taste. It turns noticeably sweet. An enzyme in your saliva is cutting starch into sugars while you chew, and you are tasting the first step of digestion happening in your mouth, seconds after it began. Most people have never waited long enough to notice.` },
    { id: 'smaller', body: `Forget organs. One question: if you had to remove unwanted things from a liquid, but you did not know in advance what the unwanted things would be, what would you do? Take out everything small enough to take out, then put back the short list of things you recognise and want. It is the only approach that works against the unexpected, and it is why your kidneys handle a brand-new medicine without any new machinery.` },
    { id: 'backward', body: `Start with why a doctor checks kidney function before prescribing a great many things, even when the kidneys are not the problem. What are they actually asking? Not "is something wrong here" but "how fast will this person clear what I am about to give them". Work backwards from a test ordered about an unrelated organ and you arrive at removal, at dose, and at why these two organs sit underneath all of medicine.` }
  ],

  map: [
    { name: `Digestion and processing`, level: 4, fresh: true },
    { name: `Medicines in the body`, level: 5 },
    { name: `Metabolism and energy balance`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Blood and vessels`, level: 5 },
    { name: `Cellular energy`, level: 5 },
    { name: `Evaluating health claims`, level: 5 },
    { name: `Hormones and the endocrine system`, level: 5 },
    { name: `The cell`, level: 5 }
  ]
}
