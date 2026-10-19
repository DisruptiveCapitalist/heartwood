// Anatomy & Physiology · Week 6 · Lesson 27 — the same axis, two jobs.
//
// The spec asks for the structures, sperm production, testosterone, hormonal
// regulation, how both systems contribute to fertilisation, and — the part most
// accounts leave out — that reproductive hormones act well beyond reproduction,
// on bone, muscle and blood production.
//
// The simulation's payoff is Lesson 16's steroid taper in a new place: supply
// testosterone from outside and the instruction stops, and sperm production
// falls with it. That is mechanism, not advice, and the lesson says so.

export default {
  id: 'lesson-27',
  number: 2,
  week: 6,
  title: `The male reproductive system and human reproduction`,
  openingQuestion: `The testes hang outside the body in a thin bag with almost no protection — which, for organs this important, looks like remarkably poor design. Nothing else essential is left out there. So either it is a mistake, or something about the job requires it. It is the second, and the reason is a matter of two or three degrees.`,
  concept: `The same axis, two jobs`,

  see: {
    voice: 'professor',
    line: `{name}, look at the axis first and see whether you recognise its shape. Then supply testosterone from outside, and watch the **third** number rather than the second.`,
    simulation: { id: 'reproduction', props: { mode: 'male' } },
    observations: [
      { text: `Two jobs from one organ, separately instructed: LH drives **testosterone**, FSH drives **sperm production**. The same three storeys you met in Lesson 16.` },
      { text: `Supplying testosterone from outside sent the instruction to almost nothing — and sperm production fell with it, to a fraction.` },
      { text: `Which is the steroid taper from Lesson 16 appearing somewhere quite different. Supply a hormone from outside and the body stops being asked to make it — along with whatever else that instruction was doing.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the second contains the answer to the opening question.`,
    sentences: [
      `One organ, **two separate jobs**, separately regulated. LH tells the testes to make testosterone; FSH, working alongside it, drives sperm production. They can and do come apart, which is why fertility and testosterone are different questions.`,
      `Sperm production needs to run **two or three degrees below** core temperature — which is the whole reason the testes are outside, and why the bag holding them contracts in the cold and relaxes in the warmth. It is a thermostat, and that is its job.`,
      `And testosterone does a great deal that has nothing to do with reproduction: **bone density, muscle mass, red blood cell production**, among others. Lesson 11's remodelling and Lesson 14's muscle are both partly answerable to it, which is why hormonal change at any age shows up in places nobody expects.`
    ],
    sequence: {
      label: `WHAT HAPPENS, AND HOW LONG IT TAKES`,
      note: `the timescales are the surprising part`,
      steps: [
        { name: `Made`, body: `About **1,500 sperm a second**, continuously, in coiled tubes inside the testes. The scale is difficult to take in and it is not an exaggeration.` },
        { name: `Seventy-four days`, body: `That is how long one takes from start to finish. Anything that affects production shows up about two and a half months later — and recovery takes about the same again.` },
        { name: `Matured`, body: `They spend further days in the **epididymis**, a tube six metres long coiled onto the back of each testis, gaining the ability to swim.` },
        { name: `Carried`, body: `Up the **vas deferens** — the tube cut in a vasectomy, which is why that procedure leaves testosterone entirely untouched.` },
        { name: `Mixed`, body: `The **seminal vesicles** and **prostate** add most of the fluid: sugar for fuel, buffers against acidity. Sperm are a very small part of the volume.` },
        { name: `And then`, body: `Of those that enter, a few hundred reach the fallopian tube — where, as Lesson 26 described, an egg may be waiting for about a day. Fertilisation happens there, not in the uterus.` }
      ]
    },
    comparison: {
      label: `A FACTORY WITH TWO PRODUCTION LINES`,
      body: `One site, one manager, two lines making quite different things on different schedules — one turning out product continuously and at enormous volume, the other producing a chemical that is piped out to the whole company and affects departments that have no idea where it comes from. Head office sends two separate instructions, and the chemical line's output is what head office reads to decide how loudly to ask. *Where the analogy stops:* a factory manager can be told to keep one line running when head office goes quiet. These cannot. Silence the instruction and both lines slow, which is exactly what you watched.`
    },
    naming: `The instructions are **LH** and **FSH** — the same two hormones as Lesson 26, from the same gland, doing a different job here. The tubes are the **epididymis** and the **vas deferens**; the fluid comes mostly from the **seminal vesicles** and the **prostate**. Testosterone is a **steroid** hormone, so as Lesson 17 would predict it crosses straight into cells and acts on genes — slow to start, slow to stop, and effective as a tablet, patch or injection rather than needing to be protected from digestion.`,
    formalNames: {
      terms: [
        { term: `Testes`, meaning: `Make sperm and testosterone — two jobs, separately instructed. Kept outside the body because the first job needs a lower temperature.` },
        { term: `Epididymis`, meaning: `A six-metre coiled tube on each testis where sperm mature over several days and gain the ability to swim.` },
        { term: `Vas deferens`, meaning: `The tube carrying sperm onward. Cut in a vasectomy — which affects fertility and leaves testosterone production alone.` },
        { term: `Prostate`, meaning: `A gland below the bladder adding fluid. It surrounds the tube carrying urine, which is why its enlargement with age affects urination.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `A prostate check, or a PSA blood test.`,
      `A vasectomy, and the question of what it does and doesn't change.`,
      `Testosterone prescribed, or advertised in a clinic.`,
      `Fertility testing, and a wait of months to see a change.`,
      `Voice breaking and growth at puberty.`,
      `Being told a hormone affects bone and muscle as well.`
    ],
    builder: {
      body: `Take the seventy-four-day figure and work backwards on a calendar. Anything produced today was started roughly two and a half months ago — so a fever, an illness, a change in medication or a period of real stress shows up in a measurement months after the event, and improvement takes just as long to appear. This is why fertility assessments are repeated after an interval rather than acted on from one result, and it is a good illustration of something this course has met several times: the body's slow processes make cause and effect very hard to see from inside.`
    },
    ownPlaceholder: `Something about this I've wondered about…`,
    synthesis: `The vasectomy one is worth having straight, because it is widely misunderstood: cutting the tube stops the delivery and leaves the gland making testosterone exactly as before.`
  },

  feynman: {
    line: `Teach it back — and this is the most useful thing in the lesson.`,
    instruction: `Explain to a friend why taking testosterone from outside can **reduce** fertility — **without using the words "feedback" or "pituitary."**`,
    banned: ['feedback', 'pituitar'],
    bannedNote: `one of those came back — and the chain can be described without either`,
    placeholder: `Something upstairs is watching the level, and when it's high…`,
    checks: [
      `Something upstream senses how much of the hormone is in the blood.`,
      `When plenty arrives from outside, it stops sending the instruction.`,
      `That same instruction was also driving sperm production.`,
      `So switching it off reduces both — even though only one was being supplied.`
    ],
    closing: `That chain surprises almost everybody, and it is the clearest example in the course of why supplying one thing can change something that looks unrelated.`
  },

  challenge: {
    voice: 'editor',
    line: `One widely misunderstood, and one about a timescale.`,
    prediction: {
      question: `A **vasectomy** cuts the vas deferens. Does it reduce testosterone?`,
      options: [
        {
          id: 'yes',
          text: `Yes — it's a procedure on the reproductive organs, so hormones must be affected.`,
          verdict: `A very common assumption, and it puts a good many people off. But it treats the system as one thing when this lesson's whole point is that it is two. The cut is made on a **tube**, some distance from the testis, and it interrupts delivery. The part of the testis making testosterone is untouched, is still being instructed, and puts its product straight into the bloodstream rather than down that tube.`
        },
        {
          id: 'no',
          text: `No — it interrupts the tube carrying sperm, not the gland making testosterone.`,
          verdict: `Correct, and the reason is worth having clearly. Testosterone was never travelling down that tube — it goes into the blood directly, as every hormone in Lesson 16 does. The instruction from above continues, the testis continues to answer it, and the level is unchanged. What is interrupted is one of the organ's two jobs, which is exactly what you would expect once you know they are separately handled.`
        },
        {
          id: 'temporarily',
          text: `Temporarily — it would fall and then recover.`,
          verdict: `A sensible hedge and it describes what genuinely happens in some surgical situations, so the instinct about adjustment is not misplaced. But nothing here disturbs the hormone-making part even briefly: no instruction changes, no cells are removed, no route into the blood is interrupted. There is nothing to recover from on that side of the organ's work.`
        }
      ]
    },
    open: {
      question: `It takes about **seventy-four days** to produce one sperm, and another handful of days to mature it. What does that mean for anybody trying to work out what has affected production — or whether something has helped?`,
      placeholder: `Anything that happened would only show up…`,
      reveal: [
        `That you are always looking at the past. A measurement taken today reflects conditions of two and a half to three months ago — an illness, a fever, a medication, a period of real strain. And the reverse holds: if something changes for the better today, the measurement will not show it for a similar stretch. Cause and effect are separated by a season.`,
        `Which has a practical consequence that comes up constantly. Anything claimed to improve this, tested over a few weeks, has not had time to be measuring what it says it is measuring. A trial would have to run for months to see a full production cycle, and then longer to see it stably. That is Lesson 20's question — what evidence, over what period — with a specific and unusually long answer attached.`,
        `More generally, this is the hardest thing about judging anything in your own body. Bone takes months, as Lesson 11 showed. Tendon takes months, as Lesson 15 showed. This takes months. People draw confident conclusions from a few weeks because a few weeks is how long patience lasts, and the body's slow processes are simply not visible on that timescale — which is why controlled trials over proper periods exist, and why personal experience is such an unreliable instrument for exactly these questions.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about this I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 28: what happens to a tablet. Four things, in order — and the same dose swallowed or injected turns out not to be the same dose at all.`
  },

  routes: [
    { id: 'analogy', body: `A wine cellar kept a few degrees below the rest of the house. It is not neglect that it is colder down there; it is the requirement. Move the bottles up into the warm kitchen for convenience and you lose the thing the cellar was for. The testes are outside for precisely that reason, and the bag they sit in pulls them closer in the cold and lets them down in the heat — a thermostat with one setting.` },
    { id: 'object', body: `Hold a hand near a radiator and then in front of an open window, and notice how quickly skin changes temperature. Now consider that a process in your body has been arranged so that it happens at a temperature a couple of degrees lower than everything else, permanently, for decades — and that the arrangement is simply "keep it outside and adjust the distance". It is an unglamorous solution to a real constraint.` },
    { id: 'story', body: `The link between the testes and the rest of the body was shown in 1849 by Arnold Berthold, who transplanted testes into castrated cockerels and found that their combs, behaviour and voices returned — despite no nerve connection to the transplanted tissue. Something had to be travelling in the blood. It was more than fifty years before the word hormone existed, and this experiment is usually counted as the first demonstration of one.` },
    { id: 'experiment', body: `Think about the last time you were ill with a fever for a few days. Nothing about your reproductive system felt any different at the time, and nothing would have. But production in those tubes is temperature-sensitive, and a measurement taken ten weeks later would carry the mark of that week. You cannot feel it, you would not connect it, and it is nonetheless the kind of thing a clinician asks about when a result is unexpected.` },
    { id: 'smaller', body: `Forget the anatomy. One question: if one organ does two jobs and you want to be able to change one without the other, what do you need? Two separate instructions. Now ask what happens if you interfere with the thing that silences both instructions at once — you change both jobs, including the one you were not thinking about. That is the whole of this lesson's surprise.` },
    { id: 'backward', body: `Start with the fact that a doctor considering testosterone for someone will ask whether they want children. Why would that question arise, when testosterone is not contraception and nobody has mentioned fertility? Work backwards from a question that seems off-topic and you arrive at the shared instruction, the two jobs, and why supplying one product quietens both lines.` }
  ],

  map: [
    { name: `Reproduction`, level: 5 },
    { name: `Hormones and the endocrine system`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Bone and the skeleton`, level: 5 },
    { name: `Muscles and movement`, level: 5 },
    { name: `Evaluating health claims`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Blood and vessels`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `DNA and proteins`, level: 5 }
  ]
}
