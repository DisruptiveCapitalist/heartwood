// Anatomy & Physiology · Week 2 · Lesson 10 — signals at extraordinary speed.
//
// Numbers measured off the simulation: one metre of wrapped fibre in 11 ms, the
// same metre of bare fibre in 1.0 second, and a hormone taking about 20 seconds
// to go round by blood and then lasting minutes. The spec asks for exactly that
// comparison, and asks that it not be overstated — nerves are usually fast and
// targeted and hormones usually slow and widespread, with real exceptions.
//
// The hook is the double pain of a stubbed toe, because it is a measurement the
// learner has already made with their own body and never had explained.

export default {
  id: 'lesson-10',
  number: 5,
  week: 2,
  title: `The nervous system: signals at extraordinary speed`,
  openingQuestion: `Stub your toe hard and you feel it twice. There is a sharp, bright pain almost instantly — and then, a full second later, a deep sickening ache arrives on top of it. One injury, one moment, one toe. So why does the news reach you in two separate deliveries?`,
  concept: `Two speeds, and a third way entirely`,

  see: {
    voice: 'professor',
    line: `{name}, stub it and watch the three of them race. You already know the answer in your body — this is just the stopwatch.`,
    simulation: { id: 'nerve-signal' },
    observations: [
      { text: `The wrapped fibre covered a metre in about **11 milliseconds**. The bare one took a full **second** — roughly ninety times longer.` },
      { text: `That is the double pain, and you have felt it. Sharp first down the fast line, then the ache arriving down the slow one.` },
      { text: `And the hormone took **twenty seconds** to go round by blood — then went on acting for minutes. Nerves for fast and precise; hormones for slow and everywhere at once.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the second one explains the ninety.`,
    sentences: [
      `A nerve signal is **electrical** along the fibre and **chemical** at the junction. It runs down the cell as a travelling change in charge, then has to cross a gap to the next cell — and crossing that gap means releasing a molecule and waiting for it to be caught.`,
      `The speed comes from **wrapping**. A bare fibre has to refresh the signal continuously along its whole length, which is slow. A wrapped one is insulated in segments with bare gaps between, and the signal **jumps from gap to gap** — covering the insulated stretches in one bound.`,
      `Hormones are the other way of sending a message: into the blood, round the whole body, and found by whatever happens to carry the matching receptor. Slower, broader, longer-lasting — though not always, and adrenaline is quick enough to prove it.`
    ],
    sequence: {
      label: `FROM A TOE TO A DECISION AND BACK`,
      note: `and most of the time is not spent travelling`,
      steps: [
        { name: `Sensing`, body: `Endings in the skin detect damage and start a signal. Two sorts of fibre leave the same spot — one wrapped and fast, one bare and slow.` },
        { name: `Travelling in`, body: `Up the leg to the spinal cord. Eleven milliseconds on the fast line; a whole second on the slow one.` },
        { name: `The reflex`, body: `Some answers never go further. The spinal cord can order a withdrawal itself, before your brain has been told anything — which is why your hand is off the hot pan before you feel it.` },
        { name: `Deciding`, body: `For anything that needs judgement, the brain. This is where almost all the time goes — far more than the travelling, as the first question below shows.` },
        { name: `Travelling out`, body: `Back down a motor nerve to the muscle. Fast and wrapped, because a late instruction is no use.` }
      ]
    },
    comparison: {
      label: `A PHONE CALL AND A LETTER TO EVERY HOUSE`,
      body: `A nerve is a phone call: one line, one recipient, answered in the time it takes to lift the handset. A hormone is a letter posted to every address in town, which only the households expecting it will open. The phone call is for "move your hand, now." The letter is for "it is winter, everyone adjust accordingly." Neither could do the other's job — you cannot phone every cell in a body, and a letter would be a poor way to catch a falling plate. *Where the analogy stops:* adrenaline is a letter that arrives in seconds and reaches you whether you were expecting it or not, so the neat division is a rule of thumb rather than a law.`
    },
    naming: `A nerve cell is a **neuron**; the long fibre is its **axon**; the insulating wrap is **myelin** and the bare gaps in it are where the signal jumps. The junction between two neurons is a **synapse** and the molecule crossing it is a **neurotransmitter**. Brain and spinal cord together are the **central nervous system**; everything reaching out from them is the **peripheral**. The myelin is worth remembering as more than a detail — it is what multiple sclerosis damages, and the symptoms of that disease are, at bottom, signals that have lost their insulation.`,
    formalNames: {
      terms: [
        { term: `Neuron`, meaning: `A nerve cell. Some are a few micrometres long; one running from your spine to your big toe is a single cell over a metre long.` },
        { term: `Myelin`, meaning: `Fatty insulation wrapped in segments along a fibre. It is the whole difference between 1 metre per second and 90.` },
        { term: `Synapse`, meaning: `The junction where one neuron speaks to the next, by releasing a chemical across a gap. Slower than the electrical part — and it is where almost every drug that affects the mind does its work.` },
        { term: `Reflex`, meaning: `A response decided in the spinal cord without consulting the brain. You feel it afterwards, which is why you have already dropped the plate before you knew it was hot.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `A doctor tapping my knee with a little hammer.`,
      `A foot gone to sleep, and the pins and needles coming back.`,
      `Dental work — numb to pain but still feeling the pressure.`,
      `Snatching my hand off something hot before I felt it.`,
      `Reaction time getting slower as I've got older.`,
      `Someone I know with multiple sclerosis.`
    ],
    builder: {
      body: `Get someone to hold a ruler vertically with the zero end between your open finger and thumb, not touching. They drop it without warning and you catch it as fast as you can. Read off the number where you caught it: around 20 cm means roughly 0.20 seconds, around 15 cm about 0.17. Now do it ten times and notice that it barely improves — you are not getting faster, because almost none of that fifth of a second is nerve conduction. The signal itself took about twenty milliseconds. Everything else was deciding.`
    },
    ownPlaceholder: `A time my body acted before I did…`,
    synthesis: `The dental one is the strangest of those, and it is the second question below — numb to pain while still feeling pressure is not a half-dose, it is the anaesthetic being fussy about which fibres it silences first.`
  },

  feynman: {
    line: `Teach it. You have the evidence in your own foot.`,
    instruction: `Explain why you feel a stubbed toe twice — **without using the words "myelin" or "axon."**`,
    banned: ['myelin', 'axon'],
    bannedNote: `one of those came back — and the idea is about wrapping and speed, not vocabulary`,
    placeholder: `There is more than one kind of nerve fibre, and…`,
    checks: [
      `Two different kinds of fibre leave the same spot in the skin.`,
      `One is insulated and fast; the other is bare and much slower.`,
      `The signal on an insulated fibre jumps between gaps instead of crawling the whole way.`,
      `So the same injury arrives at your brain twice, about a second apart.`
    ],
    closing: `If you got that without either word, you can explain the single most relatable fact in neurology to anyone who has ever hit their foot on a table leg.`
  },

  challenge: {
    voice: 'editor',
    line: `One about your own reaction time, and one about the dentist.`,
    prediction: {
      question: `Catching a dropped ruler takes most people about **200 milliseconds**. The nerve signal from eye to brain to hand takes roughly **20**. Where did the other 180 go?`,
      options: [
        {
          id: 'nerves',
          text: `In the nerves — the real distances are longer than a metre.`,
          verdict: `Worth checking, and you are right that the path is not a single straight metre: eye to brain is short, brain to hand is most of an arm, and there are junctions along the way. But add generously and you are still well under 50 milliseconds. The travelling simply is not where the time goes, which is the surprising part — conduction is so fast that it is almost never the bottleneck in anything you do.`
        },
        {
          id: 'brain',
          text: `In the brain — noticing, deciding, and issuing the order.`,
          verdict: `That's it, and the proportion is the striking bit: roughly nine-tenths of your reaction time is thinking, not transmitting. The visual system has to register that something changed, decide it is the thing being waited for, and commit to a movement — and each of those steps involves many synapses, each costing a fraction of a millisecond that adds up. It is also why practice barely helps on this test: you cannot train the deciding down much below a sixth of a second.`
        },
        {
          id: 'muscle',
          text: `In the muscle — it takes time to actually contract.`,
          verdict: `A real and often forgotten delay, and you deserve credit for remembering that the order still has to be carried out. There is a genuine lag between a nerve signal arriving and a muscle developing force — tens of milliseconds for a fast movement. So this is part of the answer rather than none of it. It just is not the large part; the thinking dwarfs it.`
        }
      ]
    },
    open: {
      question: `At the dentist, a local anaesthetic leaves you unable to feel **pain** — but you can still clearly feel **pressure**, and being pushed and pulled about. If the drug simply switched the nerve off, that should be impossible. So what is it actually doing?`,
      placeholder: `It must be affecting some fibres before others…`,
      reveal: [
        `Silencing the fibres in order of size. A local anaesthetic works by blocking the channels that carry the electrical signal — and it reaches the thin, bare fibres first and easily, while the thick, heavily wrapped ones hold out much longer. Pain travels on the thin ones. Pressure and touch travel on the thick ones. So there is a window, and dentistry lives in it: the pain fibres are down and the pressure fibres are still reporting.`,
        `It also explains the order things come back in. Sensation returns roughly in reverse — the thick fibres recover first, so touch and pressure sharpen up well before the numbness properly lifts, and pain is the last thing to return. That long strange hour of a lip you can feel being touched but cannot quite locate is the two systems running at different states of recovery.`,
        `The general lesson is worth more than the dental one. "The nerve" is not a single wire that is either on or off; it is a bundle of fibres of different thicknesses carrying different kinds of news at different speeds. Nearly everything odd about sensation — the double pain, the selective numbness, the way rubbing a bump genuinely helps — comes from that bundle being a mixed one.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that's the week.`,
    prompt: `One thing about my own nerves I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `That's Week 2. You can trace a drop of blood through both loops, say what decides how much oxygen reaches a muscle, explain why your hands go cold, and describe two quite different ways a body sends a message. Week 3 goes to the frame that carries all of it — and starts by insisting that bone is alive.`
  },

  routes: [
    { id: 'analogy', body: `Two messengers leave the same village for the same city. One has a horse and the straight road; the other is on foot across country. The news is identical and it arrives twice, an hour apart, and the second arrival is not useless — it carries the detail the rider had no time for. Your fast fibres bring "something happened, there, now." The slow ones bring the ache that keeps you off the foot for a week.` },
    { id: 'object', body: `Press a fingernail into the back of your other hand, firmly, for a second, then stop and pay close attention. There is the sharp sensation while you press — and then, a beat later, a duller warmer one that outlasts it. You have just run the experiment at a scale small enough to be polite about. The gap is shorter than the toe version because the distance is shorter; the two lines are the same two lines.` },
    { id: 'story', body: `In 1850 Hermann von Helmholtz measured how fast a nerve signal travels, and the number astonished everyone — including him. The prevailing view was that it was instantaneous, or near enough, possibly not even a physical process at all. He got about 27 metres a second in a frog: fast, but emphatically finite and emphatically measurable. His own teacher had declared the measurement impossible in principle. Thought, it turned out, had a speed.` },
    { id: 'experiment', body: `Stand with your feet together and your eyes open and notice how still you are. Now close your eyes and keep noticing. Within a few seconds you begin to sway — slightly, correcting constantly. Nothing about your legs changed; you simply lost one of the three streams of information your balance runs on, and the other two are now working harder. That continuous invisible correction, going on whenever you stand, is most of what your nervous system does with its day.` },
    { id: 'smaller', body: `Forget pain and fibres. One question: if you had to send a message a metre along a wet, leaky wire, how would you make it faster? Insulate it — and if you cannot insulate the whole thing, insulate most of it and let the signal leap the covered parts. That is the entire trick, and your body found it long before anyone wrapped a telegraph cable. The ninety-fold difference is the difference between a leaky wire and a lagged one.` },
    { id: 'backward', body: `Start with the knee tap. The leg kicks, and you did not decide to kick it — you cannot even stop it reliably by trying. Why would a body be built so that part of it acts without consulting you? Because consulting you costs about a fifth of a second, and some answers are not worth the wait. Work backwards from "the spinal cord is allowed to decide some things on its own" and you arrive at a layered system, a speed limit, and a very good reason for both.` }
  ],

  map: [
    { name: `Nerves and signalling`, level: 4, fresh: true },
    { name: `Homeostasis`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Blood and vessels`, level: 5 },
    { name: `Gas exchange`, level: 4 },
    { name: `Receptors and signals`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Cellular energy`, level: 5 },
    { name: `Levels of organization`, level: 5 },
    { name: `DNA and proteins`, level: 4 }
  ]
}
