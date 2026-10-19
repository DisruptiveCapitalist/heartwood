// Anatomy & Physiology · Week 2 · Lesson 9 — cold hands, and what they are for.
//
// The spec attaches its most specific health-safety instruction to this lesson:
// explain the physiology and the possible contributing factors, distinguish
// normal regulation from conditions that affect circulation or sensation, say
// plainly that persistent, painful, asymmetric or discoloured symptoms can
// warrant evaluation — and do not diagnose the learner from a single symptom.
//
// So this lesson explains why a healthy body makes hands cold on purpose, names
// the things that can also be involved without attributing any of them to the
// reader, and sends anything that sounds like a symptom to a doctor rather than
// offering a verdict. The simulation's override is the teaching device: hold the
// hands warm at 20°F and the core falls to 92.6°F, which is why the body won't.

export default {
  id: 'lesson-09',
  number: 4,
  week: 2,
  title: `Why do hands and feet get cold?`,
  openingQuestion: `You are sitting in a perfectly warm room and your hands are cold. The rest of you is fine. Nothing is wrong with the room and nothing feels wrong with you — and yet the two ends of you are at noticeably different temperatures. Why would a body do that to itself?`,
  concept: `A defended middle, and an expendable edge`,

  see: {
    voice: 'professor',
    line: `{name}, turn the air cold and watch the two temperatures separate. Then — and this is the part that matters — insist on warm hands, and look at what it costs.`,
    simulation: { id: 'body-heat' },
    observations: [
      { text: `As the air cooled, the vessels near the surface narrowed and the hand went cold — while the middle of you stayed at **98.6**, unmoved.` },
      { text: `So the hands did not fail. They were **allowed** to go cold, deliberately, by a body that had decided what to protect.` },
      { text: `And when you insisted on warm hands at 20°F, the core fell to about **92.6°F**. That is why it does not do it: warm hands, at that price, are not worth having.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one changes how you think about your own body.`,
    sentences: [
      `You are not one temperature. You are a **core** that is defended within a fraction of a degree — brain, heart, liver, the organs that fail fast — and a **shell** of skin and limbs that is allowed to drift a long way, because it can.`,
      `Skin is where your heat escapes, so the way to keep heat is to send less blood there. The small vessels near the surface narrow, flow drops, and your hands become something closer to room temperature. The radiator has been turned down, on purpose.`,
      `Which means cold hands are usually a sign of a system **working**. Usually — not always, and the difference between "usually" and "always" is the part of this lesson worth carrying out of the room.`
    ],
    sequence: {
      label: `WHAT ELSE CAN BE IN THE MIX`,
      note: `all of these are ordinary, and none of them is a conclusion about you`,
      steps: [
        { name: `The air`, body: `Temperature, draught and damp. Still the commonest answer by a wide margin, and the one people discount because the room "feels fine" to the rest of them.` },
        { name: `Who you are`, body: `People differ enormously and consistently. Body size and shape, how much insulating tissue sits where, age, and plain inheritance all shift where the thermostat settles.` },
        { name: `What you have taken`, body: `Caffeine and nicotine narrow small vessels; alcohol opens them, which is why a drink feels warming while actually losing you heat. Some prescribed medicines affect them too.` },
        { name: `What you are feeling`, body: `Fear, stress and pain narrow those vessels through the nerves, with no change in temperature at all. "Cold hands" before an interview is the same mechanism doing a different job.` },
        { name: `The vessels and nerves`, body: `Conditions affecting blood vessels or the nerves that control them can change how the skin responds. Whether any of that applies to a particular person is a medical question, and a course cannot answer it.` }
      ]
    },
    comparison: {
      label: `SHUTTING THE DOORS TO THE BACK ROOMS`,
      body: `A big old house on a cold night with not quite enough heating. The sensible move is to shut the doors to the spare rooms and the hall and heat the one room you are sitting in. By morning those back rooms are freezing — and that is not a failure of the heating, it is the plan working. Someone who insisted on keeping every room warm would find the whole house cool and the bill ruinous. *Where the analogy stops:* a house does not mind being cold. Your fingers do, and they will tell you about it — the discomfort is itself part of the system, nudging a whole person toward gloves and a warmer room.`
    },
    naming: `The narrowing is **vasoconstriction**, and its opposite, opening up to shed heat, is **vasodilation** — the flush you get in a hot bath or at the end of a run. The split between the defended middle and the drifting outside is the **core and shell**. There is a named pattern in which fingers turn sharply white, then blue, then red on rewarming, often with pain, called **Raynaud's phenomenon** — it is common, frequently harmless, sometimes not, and the only sensible thing a course can do with that name is hand it to you so you have a word to use with a doctor.`,
    formalNames: {
      terms: [
        { term: `Vasoconstriction`, meaning: `Small vessels narrowing so less blood reaches the skin. Driven by nerves, and it happens within seconds.` },
        { term: `Vasodilation`, meaning: `The same vessels opening to shed heat. Why you go pink when hot and why a fever breaking makes you sweat.` },
        { term: `Core and shell`, meaning: `The defended inner temperature and the outer layer permitted to drift. The shell can be several degrees cooler without anything being wrong.` },
        { term: `Raynaud's phenomenon`, meaning: `A pattern of sharp colour change in the fingers on cold or stress. Named here so you have the word — not so you can decide whether you have it.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've noticed in yourself or someone else.`,
    items: [
      `Cold hands in a room everyone else says is warm.`,
      `Putting a hat on and finding my hands warm up.`,
      `Feet that stay cold in bed long after the rest of me is warm.`,
      `Hands going cold before something I was nervous about.`,
      `Going bright pink in a hot bath or at the end of a walk.`,
      `A drink feeling warming on a cold night.`
    ],
    builder: {
      body: `If you have a kitchen thermometer — the kind for meat or jam — hold the tip inside a closed fist for two full minutes and read it. Then go and stand somewhere cooler, a porch or by an open window, for five minutes, and do it again. Most people find a difference of several degrees, which they would never have guessed at, because the hand reports "cold" long before the number does. If you have no thermometer, the back of a hand against each cheek does the same job less precisely: your face is defended and your hands are not, and you can feel the gap.`
    },
    ownPlaceholder: `When my hands go cold…`,
    synthesis: `Notice that two of those have nothing to do with temperature — the nervous one, and the drink. Those same small vessels take orders from more than one department, which is exactly where Lesson 10 picks up.`
  },

  feynman: {
    line: `Teach it back, in plain words.`,
    instruction: `Explain to a friend why hands and feet get cold before the rest of you does — **without using the words "vasoconstriction" or "circulation."**`,
    banned: ['vasoconstrict', 'circulat'],
    bannedNote: `one of those crept back — and both are names for the mechanism rather than reasons for it`,
    placeholder: `The body is protecting something, so…`,
    checks: [
      `The middle of you has to stay at almost exactly one temperature; the outside doesn't.`,
      `Heat escapes through the skin, so sending less blood there keeps heat in.`,
      `The hands go cold because the body chose that, not because anything failed.`,
      `There's a real cost to the alternative — keeping the hands warm would cool the middle.`
    ],
    closing: `If your version has the word "chose" in it somewhere, you have the lesson. Most of what feels like the body going wrong is the body deciding.`
  },

  challenge: {
    voice: 'editor',
    line: `One piece of folk advice to test, and one question about a warm room.`,
    prediction: {
      question: `Your hands are cold. Someone tells you to put a **hat** on. Does that actually help your hands?`,
      options: [
        {
          id: 'no',
          text: `No — the problem is at the hands, so warming the head is beside the point.`,
          verdict: `Logical, and it correctly rejects the old myth that most of your heat is lost through your head — that one came from a badly run army study and is simply false. But it misses how the system is wired. Your hands are not cold because of anything local; they are cold because of a decision made about your whole heat budget. Change the budget and you change the decision.`
        },
        {
          id: 'yes',
          text: `Yes — less heat lost overall means the body can afford to open the hands again.`,
          verdict: `Right, and the mechanism is worth having clearly. Your head and neck are poorly insulated and always exposed, so covering them cuts real losses. With less heat going out, the core sits a touch higher, and the system responds by permitting more blood back out to the skin. Your hands warm up because the body relaxed a restriction, not because any heat travelled from your hat to your fingers. The same works for a warm drink or a blanket over your knees.`
        },
        {
          id: 'wool',
          text: `Only if it's wool — the material is what matters.`,
          verdict: `Materials genuinely do differ, and wool is excellent precisely because it insulates even when damp. But that is a question of how much, not whether. Any reasonable covering cuts the loss enough to shift the balance, and the effect you are testing here is about the heat budget rather than the fabric. A cotton hat works; a wool one works better.`
        }
      ]
    },
    open: {
      question: `Here is the one that does not fit the temperature story at all. Your hands go cold in a **perfectly warm room**, in the minutes before something you are dreading. Nothing about the heat has changed. So what is narrowing those vessels?`,
      placeholder: `Something other than cold must be able to…`,
      reveal: [
        `Your nerves, acting on an entirely different agenda. The same small vessels that respond to cold also take orders from the part of your nervous system that prepares you for sudden effort — and that system's priorities are blunt: blood to the big muscles and the heart, blood away from the skin and the gut. Cold hands, a dry mouth and a hollow stomach are one instruction being carried out in three places.`,
        `The skin bit has an old logic behind it. Narrowed surface vessels mean less bleeding from a surface wound, which was once a sensible precaution before anything strenuous. Your body cannot tell the difference between a predator and a difficult conversation, so you get the full preparation for a fight you are not going to have.`,
        `What matters for this course is the general shape of it: one set of vessels, more than one department issuing orders. Temperature is only sometimes the explanation. And if your hands change colour sharply — white, then blue, then red — or if it happens on one side only, or hurts, or does not settle, that is worth describing to a doctor. This course can tell you how the mechanism works. It genuinely cannot tell you what is happening in your hands, and it would be doing you a disservice to pretend otherwise.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about my own temperature I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 10 — the last of the week, and the department that has been giving those orders. Nerves, and why you feel a stubbed toe twice.`
  },

  routes: [
    { id: 'analogy', body: `A ship taking on water. The captain seals the forward compartments and lets them flood, because keeping the engine room dry is what decides whether anyone gets home. From inside a sealed compartment it looks like catastrophic neglect; from the bridge it is the only decision available. Your fingers are the forward compartments, and nobody asked them.` },
    { id: 'object', body: `Hold a mug of tea with both hands for a minute, then put it down and feel your palms against your cheeks. They are warm — warmer than your face. Now wait three or four minutes in a cool room and try again; they have given it all back. Your hands are extremely good at losing heat, which is exactly why the body stops sending it to them. They are the radiator, and a radiator is the last thing you want running when you are trying to stay warm.` },
    { id: 'story', body: `Mountaineers describe a specific and dangerous pleasure in the late stages of hypothermia: a sudden sensation of being too warm, often leading people to remove their clothing. The mechanism is the one from this lesson, failing — the exhausted vessels give up their grip and let the held-back blood flood out to the skin all at once. For a few minutes it feels wonderful. It is the shell being abandoned, and it is why the rule is to warm the middle of a cold person first and not their hands.` },
    { id: 'experiment', body: `Put one hand in a bowl of cool tap water for thirty seconds and leave the other in the air. Dry both and hold them palm to palm. The difference is startling for something that took half a minute. Now keep them pressed together and count slowly to sixty — the cold one comes back up, and it does so from the inside, fed by blood your body has just decided it can spare. You can feel the decision being reversed.` },
    { id: 'smaller', body: `Forget hands. One question: if you had to keep one part of a building above freezing and could not heat all of it, what would you do? Shut off the rest. Now ask which part of you would be chosen, and why — the parts that stop working within minutes rather than hours. Brain, heart, liver. Everything else is negotiable, and your fingers are the most negotiable of all.` },
    { id: 'backward', body: `Start with the first-aid rule for someone who has got badly cold: warm the trunk, not the limbs. It sounds backwards — the hands are the cold bit. But rewarming the limbs first opens those vessels and sends cold blood from the arms and legs flooding back into a core that cannot afford it. Work backwards from that instruction and you will arrive at the whole architecture: a defended middle, a sacrificed outside, and a deliberate barrier between the two.` }
  ],

  map: [
    { name: `Homeostasis`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Blood and vessels`, level: 5 },
    { name: `Gas exchange`, level: 4 },
    { name: `Nerves and signalling`, level: 2, fresh: true },
    { name: `The cell`, level: 5 },
    { name: `Levels of organization`, level: 5 },
    { name: `Cellular energy`, level: 5 },
    { name: `Receptors and signals`, level: 4 },
    { name: `DNA and proteins`, level: 4 }
  ]
}
