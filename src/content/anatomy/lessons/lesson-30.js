// Anatomy & Physiology · Week 6 · Lesson 30 — the whole person.
//
// The last lesson of the course, and deliberately not a summary. The spec asks
// for scenarios the learner traces themselves across cells, tissues, organs and
// systems, for the closing reflection in its own words, and for an invitation to
// choose a subject to go further into. All three are here.
//
// Nothing in this lesson is new material. The sequence panel lists shapes rather
// than facts — the half-dozen patterns that kept recurring across subjects that
// look unrelated — because those are what a learner can carry out of a course
// and use on something it never covered.

export default {
  id: 'lesson-30',
  number: 5,
  week: 6,
  title: `The whole person: connecting the systems`,
  openingQuestion: `Six weeks ago, a cell was an abstract shape in a diagram, mitochondria were a phrase from school, bones were scaffolding and hormones were something advertised in a clinic. Today, one last thing — and there is nothing new in it. Only the joining up.`,
  concept: `One connected thing`,

  see: {
    voice: 'professor',
    line: `{name}, choose any of the seven and say it out loud **before** you press anything. That is the whole exercise — the uncovering is just marking your own work.`,
    simulation: { id: 'whole-body' },
    observations: [
      { text: `Every chain jumped **between levels** rather than running neatly down them. A molecule changes, and three sentences later you are talking about a whole person on a hill.` },
      { text: `Each one drew on lessons from across all six weeks. The hormone chain alone touched five of them, from Lesson 4 to Lesson 18.` },
      { text: `And nothing in any of them was new. Every link had already been earned. The only new thing was seeing them joined — which is the difference between knowing a subject and knowing a body.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and then the only part of this course worth memorising.`,
    sentences: [
      `The body is not organised the way a course is. There is no cell week and no bone week — the chapters are **ours**, for teaching, and every one of those chains crossed several of them without noticing.`,
      `Almost everything you have met is a **loop**: something senses a departure, something signals, something responds, and the response quietens the signal that caused it. Blood sugar, temperature, breathing, bone, the thyroid, the menstrual cycle. Once you see the shape, the content becomes much easier to hold.`,
      `And a handful of **patterns** keep recurring in places that look unrelated. Those are what you can take to a subject this course never covered — which is, in the end, the only thing a six-week course can honestly give anybody.`
    ],
    sequence: {
      label: `SIX SHAPES THAT KEPT COMING BACK`,
      note: `these are what to carry out of the room`,
      steps: [
        { name: `Shout everywhere, listen selectively`, body: `The address is on the receiving end. A hormone reaches every cell and only those with the receptor answer — which is why fat cannot be removed from one chosen place, and why one hormone does different things in different tissues. *Lessons 5, 16, 19.*` },
        { name: `A small shareable store, and a huge slow one`, body: `400 calories in the liver against 100,000 in fat; a skeleton that keeps what it uses and loses it six times faster than it gains. Running low on the quick one feels like running out entirely. *Lessons 11, 19.*` },
        { name: `Repair that overshoots`, body: `Damage, repair, and a little more than was there before. It is how muscle strengthens, how bone thickens at a break, and why the second time is easier than the first. *Lessons 12, 15, 22.*` },
        { name: `Several safeguards, all of which must fail`, body: `One fault is almost never anything. It takes repair *and* checkpoints *and* programmed death to be got past, several times over, which is why decades usually pass first. *Lesson 24.*` },
        { name: `Supply it from outside and the body stops making it`, body: `Steroid tablets quieten the adrenals; the pill quietens the ovarian instruction; testosterone quietens both of the testes' jobs. The same loop, three times, in places that look unconnected. *Lessons 16, 26, 27.*` },
        { name: `A mechanism is not a benefit`, body: `Binding is not triggering, triggering is not reaching the tissue, and none of it is a person being better off. The most useful single sentence in the course. *Lessons 18, 20.*` }
      ]
    },
    comparison: {
      label: `A CITY, NOT A MACHINE`,
      body: `A machine has a designer, a parts list and a right way to work. A city has none of those — it has water and power and traffic and waste, grown over centuries, each depending on the others in ways nobody planned and no single person understands. Cut the water and the hospitals fail; close a road and the deliveries stop. That is nearer what you have been studying: not a device with a manual, but an arrangement that works because each part's output happens to be what another part needs. *Where the analogy stops:* a city can be redesigned. Your body is stuck with every bargain its ancestors made — the mitochondria that used to be bacteria, the testes kept outside for want of a cooler solution, the eye's blind spot. A great deal of it is history rather than design, and that is often the real answer to "why on earth is it like that?"`
    },
    naming: `The word for all of this together is **integration**, and the single idea underneath it is the one from Lesson 5: **homeostasis**, the continuous holding of conditions inside workable ranges by loops that nobody is running. One honest closing note. This has been a beginner's course, and every lesson simplified something — the lock-and-key that is really a soft and shifting fit, the tidy three-way split of hormones that has exceptions, the multi-hit model of cancer that differs between cancers. Those simplifications were chosen to be the kind you can build on rather than the kind you have to unlearn. But they are simplifications, and knowing that is part of understanding the subject rather than a disclaimer about it.`,
    formalNames: {
      terms: [
        { term: `Homeostasis`, meaning: `Holding internal conditions within workable ranges, by loops that correct themselves. The single unifying idea of the whole course.` },
        { term: `Integration`, meaning: `Systems depending on each other's output. Why a kidney problem shows up in bone, blood and medicines all at once.` },
        { term: `Negative feedback`, meaning: `A response that opposes the change that caused it. The commonest control arrangement in you, and the reason nothing needs to be in charge.` },
        { term: `Evolutionary history`, meaning: `Why a great deal of the body is odd rather than optimal. The answer to many "why is it built like that?" questions is "it wasn't built".` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Six weeks in. Tap anything here you now see differently than you did.`,
    items: [
      `A blood test result, and what the numbers are actually measuring.`,
      `A medicine label, and why it says what it says.`,
      `A health claim in an advert or a podcast.`,
      `Being out of breath, or cold, or sore the day after.`,
      `A conversation with a doctor you'd now ask more in.`,
      `Something about your own body you had always just accepted.`
    ],
    builder: {
      body: `Find someone — anyone — and explain one thing from these thirty lessons to them. Not a list of facts: one idea, with a reason attached. Why the lamp doesn't wait, why your hands go cold, why bone is alive, why binding a receptor proves nothing. You will find out in about ninety seconds whether you understand it, because explaining is the only honest test there is, and it is the test this course has used on you thirty times. If you get stuck halfway, that is not a failure — it is the exact spot to go back to, and now you know where it is.`
    },
    ownPlaceholder: `Something I see differently now…`,
    synthesis: `That last one is worth sitting with. Most people carry a few facts about their own body that they have never examined, and a course like this is mostly useful for the ones it made you notice.`
  },

  feynman: {
    line: `The last one. No restrictions at all.`,
    instruction: `Explain to an intelligent adult who has never studied biology how a human body keeps itself going. Not every system — pick the thread you find most convincing and follow it properly. **Use any words you like.**`,
    unrestricted: true,
    banned: [],
    bannedNote: ``,
    placeholder: `The thing I'd want someone to understand is…`,
    checks: [
      `You chose one thread and followed it, rather than listing everything.`,
      `You explained at least one loop — something that senses, signals, and corrects itself.`,
      `You crossed at least two levels: a molecule or a cell, and something whole-body.`,
      `You left them able to notice something about their own body they hadn't before.`
    ],
    closing: `That last check is the whole measure of this course, and it is the same one Physics I ended on. Not what you can recite — what somebody else can now see.`
  },

  challenge: {
    voice: 'editor',
    line: `One last pair. The first joins four lessons; the second is yours to answer.`,
    prediction: {
      question: `Someone is low on **haemoglobin**. Their lungs are healthy, their heart is healthy, and they are breathing normally. What would you expect — and why?`,
      options: [
        {
          id: 'fine',
          text: `They'd be largely fine — healthy lungs and heart can make up for it.`,
          verdict: `The compensation is real and worth crediting: the heart does raise its output, and that genuinely helps, which is why mild cases can go unnoticed for a long time. But Lesson 8's chain had four links — breathing, crossing, **carrying**, delivering — and healthy lungs and heart cannot repair a weak third link. They can move the blood faster; they cannot make it carry more per litre.`
        },
        {
          id: 'breathless',
          text: `Breathless and tired on exertion — the carrying link in the chain is weak.`,
          verdict: `Exactly, and it is a good demonstration of why that chain was worth learning. Saturation can read a perfectly normal 98% — the haemoglobin present is full — while there is simply less of it, so each litre of blood delivers less oxygen. At rest the heart covers the gap. On a flight of stairs it cannot, and the person is breathless with lungs that are working perfectly. It is also why "breathless" sends a doctor looking at blood as readily as at lungs.`
        },
        {
          id: 'altitude',
          text: `Only a problem at altitude, where oxygen is already short.`,
          verdict: `Altitude would certainly make it worse, and you are right that the two problems compound — both reduce how much oxygen arrives at the tissue, by different links in the same chain. But it is not only a problem up a mountain. The shortfall is present at sea level in the kitchen; it is just that a healthy heart can mask it until something is asked of the body.`
        }
      ]
    },
    open: {
      question: `Last question of the course, and it is yours rather than mine. **Which of these would you want to go further into** — and what would you hope to be able to explain at the end of it?`,
      placeholder: `The one I keep coming back to is…`,
      reveal: [
        `There is no wrong answer here, so here is what each one opens onto. **Cellular energy** goes down into the chemistry of how a gradient across a membrane turns into usable energy — one of the most beautiful mechanisms in biology, and the reason you breathe. **Bone biology** goes into how a tissue senses force and rebuilds itself, which is as close as the body comes to engineering. **Hormones and receptors** goes into signalling: how one molecule arriving outside a cell changes which genes are read inside it.`,
        `**Immune function** is the deepest rabbit hole of the lot — how a system builds a tool for a shape it has never encountered, and how it learns not to attack you. **Pharmacology** joins Lesson 18 to Lesson 28 and becomes how medicines are actually designed and tested. And **peptides and evidence** is less biology than a way of thinking: the Lesson 20 questions, applied to whatever arrives next.`,
        `Whichever you pick, you now have the thing that makes further reading possible — not a stock of facts, but a set of shapes to hang new ones on. A loop. A broadcast with selective listening. A small store and a large one. Several safeguards. Repair that overshoots. And a mechanism that is never, on its own, a benefit. That is what thirty lessons were for, and it is enough to start almost anywhere.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `The last two minutes of the course. Take them properly.`,
    prompt: `What do I understand about the human body now that I could not have explained six weeks ago?`,
    placeholder: `Six weeks ago I couldn't have told you…`,
    mapFooter: `Thirty lessons. Concepts still move backward as well as forward, and none of this was ever a grade.`,
    tomorrow: `That's the course. Nothing is scheduled for tomorrow — and the Understanding Map below is worth a long look, because the difference between its first row and its last is six weeks of your own work. The measure of it was never a test. It is standing somewhere ordinary — a pharmacy, a consulting room, a conversation about something somebody is selling — and finding that a quiet voice says *I know what's happening here.*`
  },

  routes: [
    { id: 'analogy', body: `An orchestra with no conductor. Each player listens to the ones around them and adjusts, and what emerges is a piece of music that no individual is producing and none could produce alone. Remove the oboes and the whole balance shifts. Nobody is in charge of the tempo and yet there is a tempo. That is as close as any comparison gets to what thirty lessons have actually described.` },
    { id: 'object', body: `Put two fingers on your wrist and find your pulse, and just sit with it for a minute. Every beat is Lesson 6: both sides squeezing together, about 70 millilitres each time, pushing blood to lungs that will load it, to muscle that will extract from it, past kidneys adjusting it and a liver sorting it, carrying heat out to skin that is deciding how much to lose. You have felt that pulse your whole life. You can now say what it is doing.` },
    { id: 'story', body: `Claude Bernard, in the 1860s, noticed something nobody had thought remarkable: the inside of an animal stays astonishingly constant while the world outside does not. He argued that the whole machinery of a body exists to hold that inner environment steady — a strange idea at the time, when physiology was a collection of separate organs. Everything in these thirty lessons is a footnote to that observation, and it took the next century for the rest of biology to catch up with it.` },
    { id: 'experiment', body: `Stand up from sitting, quickly, and pay attention to the first three seconds. Almost nothing happens — and that is the achievement. Pressure sensors in your neck caught the drop within one beat, your heart rate rose, your vessels tightened, and blood that gravity had pulled toward your feet was brought back. You did not notice because it worked. Nearly everything in this course is like that: visible only when it fails.` },
    { id: 'smaller', body: `Forget all thirty lessons. One question: what does a body have to do, continuously, to stay a body? Keep conditions inside a range that its chemistry can work in — temperature, water, salt, sugar, acidity, oxygen — while the world outside does whatever it likes. Everything else is how. That is the course in a sentence, and if you remember nothing else, it is enough to reason from.` },
    { id: 'backward', body: `Start at the end: a person, standing, warm, thinking. Work backwards and ask what has to be true for that. Systems cooperating. Organs built from tissues. Tissues from cells. Cells from molecules. Molecules from six ordinary elements that you could also find in air and seawater. You have arrived at Lesson 1 — the jars — and the whole course is the distance between a jar of oxygen and a person wondering about it.` }
  ],

  map: [
    { name: `Levels of organization`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Cellular energy`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Immunity and defence`, level: 5 },
    { name: `Hormones and the endocrine system`, level: 5 },
    { name: `Evaluating health claims`, level: 5 }
  ]
}
