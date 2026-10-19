// Anatomy & Physiology · Week 3 · Lesson 15 — three tissues, three clocks.
//
// Measured off the simulation: at fourteen days the muscle is 75% adapted, the
// tendon 22%, the bone 10%. At thirty days, 95 / 41 / 21. That spread is the
// lesson and it is why progressive loading exists as an idea.
//
// The spec forbids individualised exercise prescriptions and forbids implying
// that one routine suits everyone. So this lesson explains why the clocks differ
// and what the mismatch causes, and it names no programme, no frequency, no
// schedule and no routine. Where a decision is involved, it goes to a clinician.

export default {
  id: 'lesson-15',
  number: 5,
  week: 3,
  title: `Movement, recovery and aging`,
  openingQuestion: `You did something unaccustomed on Saturday — a long walk, a day in the garden, helping someone move house. By Tuesday the ache has gone and you feel entirely ready to do it again. Your muscles agree with you. Your tendons do not, and your bones have barely begun to respond. So which of them should you be listening to?`,
  concept: `Three tissues, three clocks`,

  see: {
    voice: 'professor',
    line: `{name}, one session, then let it run. Note the day the muscle looks finished — and then look at the two bars underneath it.`,
    simulation: { id: 'recovery' },
    observations: [
      { text: `At **two weeks** the muscle was about 75% of the way there. The tendon was at 22%, and the bone at 10%.` },
      { text: `At a **month**: muscle 95%, tendon 41%, bone 21%. The muscle had essentially finished before the others were properly started.` },
      { text: `And only one of the three ever told you anything. Soreness came and went in the first few days; the tendon and the bone said nothing at all, for months.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the last one is the practical half of the week.`,
    sentences: [
      `Adaptation is **repair that overshoots**. Work disturbs a tissue, the repair machinery responds, and it rebuilds a little more than was there — which is why the second time is easier than the first, in every tissue you own.`,
      `How fast that happens depends almost entirely on **blood supply and cell turnover**. Muscle is richly supplied and busy; tendon and ligament are poorly supplied and slow; bone is slower still, as Lesson 11 showed from the other direction.`,
      `So "I feel ready" is a report from the **fastest** tissue, delivered weeks before the slowest has caught up. Building up gradually is not caution for its own sake — it is the only way to let the silent tissues keep pace with the one that talks.`
    ],
    sequence: {
      label: `EVERYTHING THIS WEEK, IN ONE MOVEMENT`,
      note: `standing up out of a chair`,
      steps: [
        { name: `The nerve fires`, body: `A signal leaves your spinal cord and arrives at the muscle in a few thousandths of a second — Lesson 10's wrapped fibre doing its job.` },
        { name: `Units switch on`, body: `Enough bundles are recruited for the load, smallest first, and more join as the effort rises. Lesson 14.` },
        { name: `Tendon transmits`, body: `The pull travels through tendon to bone — a cord of collagen, stretching slightly and giving some of it back.` },
        { name: `The joint allows it`, body: `Knee and hip permit the movement in the directions they were built for, and refuse every other direction. Lesson 13.` },
        { name: `Bone carries it`, body: `The load passes through the strut-work, and the cells inside register the strain and file a report. Lesson 11.` },
        { name: `Blood keeps up`, body: `Heart rate and skin flow adjust before you have noticed anything. Lessons 6 and 9.` }
      ]
    },
    comparison: {
      label: `A CONVOY WITH ONE RADIO`,
      body: `Vehicles travelling together can only go as fast as the slowest, which is why convoys are planned around the lorry rather than the car. Now imagine that only the fastest vehicle has a radio — so the one voice you ever hear is the one least likely to be holding things up, cheerfully reporting that it is fine and ready to go. That is your body after unaccustomed work: the muscle has the radio, and it is not the one you need to hear from. *Where the analogy stops:* a convoy's lorry is slow for good and will never be quicker. Your tendons and bones do get stronger — they simply need the months rather than the fortnight.`
    },
    naming: `Increasing demand in steps the slow tissues can follow is **progressive loading**, and it is the reason any sensible build-up is gradual. Next-day ache is **delayed-onset muscle soreness**; persistent tendon trouble from load outrunning repair is **tendinopathy**; and the loss of muscle with age is **sarcopenia**, which begins earlier than most people expect and accelerates later. The important finding about all of it is a hopeful one: the machinery that responds to loading **does not switch off with age**. It is slower, and it is still there, well into the nineties. What any particular person should do about that is a question for them and a clinician, and it genuinely does differ between people.`,
    formalNames: {
      terms: [
        { term: `Progressive loading`, meaning: `Increasing demand in steps slow enough for the slowest tissue to keep up. A principle, not a programme — the right steps differ enormously between people.` },
        { term: `Delayed-onset soreness`, meaning: `Ache peaking a day or two after unaccustomed work, from microscopic damage and the repair response. Not lactate, which cleared within the hour.` },
        { term: `Tendinopathy`, meaning: `A tendon where load has persistently outrun repair. Common, slow to settle, and the usual consequence of the mismatch this lesson is about.` },
        { term: `Sarcopenia`, meaning: `Age-related loss of muscle mass and strength. Begins in middle age and quickens later — and it responds to loading at every age studied.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've seen happen.`,
    items: [
      `A new runner with shin pain in week three, having felt fine in week two.`,
      `Someone fit in January and injured by February.`,
      `An older relative getting visibly steadier after a course of physiotherapy.`,
      `Needing more days between efforts than I used to.`,
      `A gardening weekend that cost me most of the following week.`,
      `Being told to keep moving after an injury rather than rest completely.`
    ],
    builder: {
      body: `This one is a notebook rather than an activity. The next time you do something physically unaccustomed — a long walk, a day of decorating, carrying boxes — write down what it was and the date. Then note each day whether you ache, where, and how much, until it stops. Most people are surprised twice: by the ache arriving on day two rather than day one, and by how precisely it maps onto the muscles that did the lengthening work rather than the lifting. You are not training anything here. You are reading the one tissue that reports, and noticing the shape of what it says.`
    },
    ownPlaceholder: `A time my body took longer than I expected…`,
    synthesis: `The January one is this whole lesson in a single familiar story: enthusiasm, a muscle that adapts in a fortnight, and a tendon that was still at a fifth of the job when the load went up again.`
  },

  feynman: {
    line: `The last one of the week.`,
    instruction: `Explain how someone can feel completely recovered and still get injured by doing the same thing again — **without using the words "tendon" or "adapt."**`,
    banned: ['tendon', 'adapt'],
    bannedNote: `one of those came back — and the idea is about different speeds, not about one tissue`,
    placeholder: `Different parts of the body mend at different speeds, so…`,
    checks: [
      `Different tissues recover and get stronger at very different speeds.`,
      `Muscle is quick — days to a couple of weeks — because it has a good blood supply.`,
      `The connecting tissues and the bone are far slower, taking months.`,
      `Only the muscle gives you any feedback, so "feeling fine" is a report from the fastest part.`
    ],
    closing: `If your version has "only one of them tells you" in it, you have the practical half of this week — and you know why building up slowly is about the silent parts.`
  },

  challenge: {
    voice: 'editor',
    line: `One about age, and one about why recovery slows.`,
    prediction: {
      question: `Someone of **eighty**, who has never done any resistance training, begins. Can they actually build muscle — or only slow the loss?`,
      options: [
        {
          id: 'no',
          text: `Not really — past a certain age the body has stopped being able to build.`,
          verdict: `This was the standard assumption for a long time, and it was wrong in a way that mattered, because it shaped how older people were treated and what was offered to them. The machinery that responds to loading does slow with age, but it does not switch off. Assuming otherwise cost a great many people function they could have kept — which is why this particular belief is worth pulling up by the roots.`
        },
        {
          id: 'yes',
          text: `Yes — genuinely build, not just maintain.`,
          verdict: `Correct, and the evidence is striking. The study that changed minds was done in 1990 with nursing-home residents whose average age was ninety, several of whom used walking frames. After eight weeks of supervised resistance work their leg strength had roughly tripled, muscle size had measurably increased, and some no longer needed the frame. The response is slower than a twenty-year-old's and it is unmistakably there. What any individual should do, and with what supervision, is a matter for them and a clinician.`
        },
        {
          id: 'maintain',
          text: `Only maintain — you can hold onto what's left but not add to it.`,
          verdict: `A reasonable middle position, and maintenance alone would be worth having. But it understates what has been measured repeatedly: real gains in both strength and muscle size, in people well into their nineties, including people who were frail at the start. The caution that belongs here is about *how* rather than *whether* — the slower clocks in this lesson are even slower with age, so the build-up matters more, not less.`
        }
      ]
    },
    open: {
      question: `Recovery takes longer as you get older — almost everyone notices it, and it is real. Given everything this week, what would you expect to be **slowing down**? And does it change what the slow clocks mean?`,
      placeholder: `If repair is what adaptation is, then…`,
      reveal: [
        `All the things repair depends on. The pool of reserve cells that muscle calls on to rebuild gets smaller and slower to respond. Building new protein from a given stimulus is less brisk. The blood supply to connective tissue — never generous — is less generous still. And the remodelling balance in bone, as Lesson 11 showed, tips toward the demolition crew with age and with hormonal change. Nothing new has gone wrong; everything already described simply runs slower.`,
        `What it changes is the **spacing**, not the possibility. If the fast clock is slower and the slow clocks are slower again, the gap between "the muscle feels ready" and "everything else is ready" gets wider rather than narrower. The mismatch this lesson is about becomes more pronounced with age, not less — which is the opposite of what most people assume when they think about getting older and exercise.`,
        `There is one more thing worth saying plainly, because this course has spent three weeks earning the right to say it. Of everything in these fifteen lessons, loading is the single intervention that shows up again and again: bone keeps what is used, muscle responds at every age tested, joints feed their cartilage by moving, and the heart's stroke volume answers to demand. What that means for any particular person — with their history, their joints, their medicines and their circumstances — is a conversation with a doctor or a physiotherapist. The biology is general. The decision is not.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that's the week.`,
    prompt: `One thing about how my body repairs itself that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `That's Week 3. Bone that is alive and keeps what it uses, two materials that need each other, joints that trade reach for steadiness, muscle that counts rather than strains, and three clocks that run at different speeds. Week 4 goes back to molecules — hormones, receptors, metabolism, and the word "peptide" finally held up to the light.`
  },

  routes: [
    { id: 'analogy', body: `A road being resurfaced while the traffic keeps running. The top layer can be patched overnight; the foundations underneath take a season; the bridge it crosses takes years. Open the road to heavier lorries as soon as the surface looks good and it is not the surface that fails. Everyone can see the tarmac. Nobody inspects the footings unless they are made to.` },
    { id: 'object', body: `Find a shoe you have had for years and look at the sole. The wear is not even — it is deep in one or two places and barely touched elsewhere, and it is a record of exactly how you walk. Your tissues keep the same kind of record, except that they respond as well as wear: thickening where the load falls, thinning where it does not. The shoe only has the first half of the story.` },
    { id: 'story', body: `In 1990 a research team ran an eight-week resistance programme with nursing-home residents whose average age was ninety. The expectation, more or less universal at the time, was that nothing much would happen. Leg strength roughly tripled, thigh muscle measurably grew, walking speed improved, and two participants stopped needing their walking frames. The paper is one of the most cited in the field, and it changed what people of that age are offered.` },
    { id: 'experiment', body: `Walk down a long flight of stairs at a brisk pace, then note how your thighs feel the following day compared with walking up the same stairs. Going down almost always costs more soreness, which surprises people, because it feels easier at the time. The muscle is lengthening under load on the way down — resisting rather than pulling — and that is the kind of work that disturbs fibres most. The easy direction is the expensive one.` },
    { id: 'smaller', body: `Forget training. One question: if four parts of a machine wear at different rates and only one of them has a warning light, which part fails first? One of the three without a light — and you will have no notice at all. Now ask how you would run such a machine sensibly. Slowly, with increases small enough that the unlit parts are never far behind. That is progressive loading, derived without any biology.` },
    { id: 'backward', body: `Start with the advice physiotherapists give after an injury: keep moving, within limits, rather than resting completely. For a century the advice was the opposite. Work backwards from why it changed and you find everything in this week — cartilage fed by movement, bone kept by loading, muscle lost within days of disuse, and blood supply as the thing that decides how fast anything mends. Complete rest turned out to be its own injury.` }
  ],

  map: [
    { name: `Muscles and movement`, level: 5 },
    { name: `Joints and connective tissue`, level: 5 },
    { name: `Bone and the skeleton`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Nerves and signalling`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Blood and vessels`, level: 5 },
    { name: `Cellular energy`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `Gas exchange`, level: 4 }
  ]
}
