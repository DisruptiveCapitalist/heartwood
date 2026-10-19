// Anatomy & Physiology · Week 5 · Lesson 22 — the swelling is the delivery.
//
// The spec's explicit warning for this lesson: do not imply that inflammation
// can always be judged from symptoms alone. So the simulation shows the four
// visible signs and the copy says plainly that inflammation deep inside
// produces none of them — and the open question turns that on the way the word
// is used in marketing, applying Lesson 20's method rather than making a
// blanket claim in either direction.

export default {
  id: 'lesson-22',
  number: 2,
  week: 5,
  title: `Inflammation, fever and healing`,
  openingQuestion: `A splinter goes into your finger. Within hours the area is red, hot, swollen and sore — and every one of those feels like damage being done to you. It is not. All four are the same single event, and it is the most useful thing that could possibly be happening. So what is it?`,
  concept: `The swelling is the delivery`,

  see: {
    voice: 'professor',
    line: `{name}, run the clock through four days first. Then block the response entirely and run it again — that second run is the argument.`,
    simulation: { id: 'immune', props: { mode: 'inflammation' } },
    observations: [
      { text: `All four signs are **one thing**: vessels widening, deliberately leaking, and pouring cells into the tissue. Red and hot from the blood, swollen from the leak, sore from chemicals tuning the nerve endings.` },
      { text: `With the response blocked, the bacteria **climbed** and nothing rebuilt. The swelling was never the problem.` },
      { text: `And none of those four signs appear when this is happening deep inside you. Which means inflammation cannot be judged by looking, or by how you feel.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one reverses how it feels.`,
    sentences: [
      `Inflammation is a **delivery mechanism**. Widening the vessels brings more blood; making them leaky lets fluid and cells out into the tissue where the trouble is; and the soreness makes you protect the part while the work is done. The discomfort is the cost of the delivery, not evidence of harm.`,
      `**Fever** is the same logic at the scale of a whole body, and it is not a fault — it is the set point being deliberately moved, exactly as Lesson 5 described. You shiver at 39 degrees because you are now below your new target.`,
      `Short-lived, it is one of the most useful things your body does. **Excessive, misdirected or persistent**, it does real damage — and those are different problems with different causes, none of which you can tell apart from how you feel.`
    ],
    sequence: {
      label: `FOUR DAYS AT A SPLINTER`,
      note: `and most of it you never see`,
      steps: [
        { name: `Minutes`, body: `Damaged cells and resident sentries release signals. Nearby vessels widen and loosen their junctions.` },
        { name: `Hours`, body: `The **first wave** arrives in enormous numbers — short-lived cells that engulf bacteria and then die. Pus, where it appears, is largely these.` },
        { name: `A day or two`, body: `The **second wave**: longer-lived cells that clear away debris, including the spent first wave, and begin directing repair.` },
        { name: `Days`, body: `New vessels grow in, a temporary matrix is laid down, and the edges are pulled together. Lesson 12's collagen, doing this job now.` },
        { name: `Weeks to months`, body: `The patch is remodelled and strengthened — slowly, as Lesson 15's clocks would predict, and often never quite back to the original pattern. That is a scar.` }
      ]
    },
    comparison: {
      label: `AN EMERGENCY AT THE END OF THE STREET`,
      body: `Three fire engines, an ambulance and a police car arrive, the road is closed, there is noise and disruption and nobody can get past. All of that **is** the response — and if a neighbour complained that the road closure was the problem, you would think they had misunderstood something fundamental. Inflammation is the road closure. The redness, heat, swelling and pain are the vehicles arriving. *Where the analogy stops:* emergency services go home. Inflammation that does not switch off is a real and serious category of illness, and a street permanently full of fire engines would be a problem of its own kind.`
    },
    naming: `The four classical signs are **redness, heat, swelling and pain**, described almost exactly as you felt them by a Roman writer in the first century. The first wave of cells are **neutrophils**, the second **macrophages** — Lesson 2's recyclers, out in the tissue doing the same job at a larger scale. A fever is driven by **pyrogens**, signals that reset the thermostat upward. And inflammation which persists for months or years, often with no visible sign at all, is **chronic inflammation** — a genuine area of medical research and also a phrase that has been borrowed to sell a great many things.`,
    formalNames: {
      terms: [
        { term: `Inflammation`, meaning: `A coordinated response to injury, infection or other triggers: more blood, leaky vessels, cells delivered, repair directed. Not a synonym for damage.` },
        { term: `Neutrophils`, meaning: `The first wave. Arrive within hours in huge numbers, engulf bacteria, and die quickly doing it.` },
        { term: `Macrophages`, meaning: `The second wave. Longer-lived, clear up the debris, and direct the rebuilding that follows.` },
        { term: `Chronic inflammation`, meaning: `Inflammation that persists. Real, consequential, often invisible — and not something that can be diagnosed from symptoms or from how a person feels.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `A splinter site going red and tender within a few hours.`,
      `A sprained ankle swelling up within minutes.`,
      `A sore throat that feels swollen from the inside.`,
      `Taking an anti-inflammatory for a painful joint.`,
      `Shivering under blankets while running a temperature.`,
      `Food or supplements advertised as "anti-inflammatory".`
    ],
    builder: {
      body: `The next small cut or scrape you get, look at it carefully once a day and write one line about it. Day one: a line of damage. Day two: a red margin around it, warm to a fingertip, tender. Day four: the redness pulling back, something dry over the top. Day seven: pink new skin. You are watching the sequence in this lesson happen on a timescale you can follow, and the striking part is how precisely the redness retreats as the job finishes. Nothing told it when to stop, and stopping is as organised as starting.`
    },
    ownPlaceholder: `Something I've watched heal, or not heal…`,
    synthesis: `The sprain is the odd one out — swelling with no infection at all. Inflammation answers injury as readily as invasion, which is why it turns up after an operation, a burn or a bad landing as much as after a splinter.`
  },

  feynman: {
    line: `Teach it back, and the words you want are banned.`,
    instruction: `Explain to a friend why a red, hot, swollen finger is a **good** sign — **without using the words "inflammation" or "immune."**`,
    banned: ['inflamm', 'immun'],
    bannedNote: `one of those slipped in — and the point is what is arriving, not what it is called`,
    placeholder: `The blood vessels nearby have opened up, which means…`,
    checks: [
      `The vessels nearby have widened, so far more blood is arriving.`,
      `They have also been made leaky on purpose, letting fluid and cells into the tissue.`,
      `Those cells are what clears the trouble and then starts the rebuilding.`,
      `And the soreness makes you protect the place while that work goes on.`
    ],
    closing: `If your version has "on purpose" in it somewhere, you have the lesson — and you will never again read swelling as simply damage.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a medicine cabinet decision, and one about a word that is doing too much work.`,
    prediction: {
      question: `If inflammation is this useful, should it always be left alone rather than reduced?`,
      options: [
        {
          id: 'always',
          text: `Yes — reducing it interferes with something the body is doing for a reason.`,
          verdict: `The logic is right and it is the logic this lesson has been building, so you have followed it honestly. But it proves too much. Inflammation can be excessive, can be aimed at the wrong thing entirely, and can persist for years — and in those cases it is doing real damage rather than real work. "It has a purpose" is not the same as "it is always proportionate", and your own ankle swelling to twice its size is not obviously well-judged.`
        },
        {
          id: 'depends',
          text: `It depends entirely on the situation — and that's a clinical judgement.`,
          verdict: `This is the honest answer, unsatisfying as it is. Reducing inflammation sometimes helps healing by letting a person move and sleep; sometimes it removes something useful; and in conditions where the response is misdirected, suppressing it is the whole treatment. Which applies depends on what is causing it, where it is, how long it has run and who the person is. That is a judgement with information behind it, which is why it is made by someone who can examine you rather than by a general rule.`
        },
        {
          id: 'never',
          text: `No — it's uncomfortable and unnecessary, so reduce it whenever you can.`,
          verdict: `Understandable, and it was closer to standard advice a few decades ago than it is now. The trouble is what you watched in the simulation: block the response entirely and nothing clears the bacteria and nothing rebuilds. Comfort and healing are not the same objective, and treating discomfort as the only thing worth managing can cost you the repair. The real answer is in the middle, and it varies.`
        }
      ]
    },
    open: {
      question: `"Inflammation" has become one of the most-used words in health marketing — anti-inflammatory foods, supplements, protocols. Given everything in this lesson, what is the **specific problem** with a claim of that shape?`,
      placeholder: `The word is covering several different things…`,
      reveal: [
        `That the word covers several unrelated things at once. A splinter, a sprained ankle, an autoimmune joint, and a blood marker measured in a laboratory are all called inflammation and they are not one condition. A claim to reduce "inflammation" has not said which — and because the word is doing so much work, it can be true in some trivial sense while meaning nothing for anyone's health.`,
        `The second problem is the one this lesson has been building toward: **you cannot tell from how you feel**. Inflammation deep inside produces none of the four signs. So a person has no way to check whether something made any difference, and the claim is protected from the only test they could personally apply. That is a lot of what makes it a durable marketing idea.`,
        `None of which means every such claim is false — some foods and medicines genuinely do affect measurable markers, and that research is real. It means the claim should be put through Lesson 20's questions like any other. Which molecule, doing what, measured how, in whom, with what shown about outcomes that matter. "Reduces inflammation" is an answer to none of those, and the reasonable response is the seven questions rather than either belief or dismissal.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about healing or inflammation I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 23: four kinds of trouble. A bacterium is twenty times across what a virus is — and that difference is exactly why antibiotics do nothing for a cold.`
  },

  routes: [
    { id: 'analogy', body: `Roadworks. The cones, the closed lane, the queue and the noise are not the problem with the road — they are the repair of the problem with the road, and the disruption is roughly proportional to how much needs doing. Someone who removed the cones to improve the traffic would be solving the wrong thing. The only genuinely bad case is roadworks that never finish, which is chronic inflammation and is a different complaint entirely.` },
    { id: 'object', body: `Press a fingertip firmly into the skin of your forearm for ten seconds and let go. There is a white mark, then a flush of pink as blood returns, briefly warmer than the skin around it. You have just produced two of the four signs mechanically, in miniature, with nothing wrong at all — which tells you that redness and warmth are simply what more blood arriving looks like.` },
    { id: 'story', body: `In the first century, the Roman writer Celsus set down four signs of inflammation: rubor, calor, tumor and dolor — redness, heat, swelling and pain. He had no notion of cells, vessels or bacteria, and his list is still taught, word for word, two thousand years later. What took until the nineteenth century was realising that the four were not the disease but the response to it.` },
    { id: 'experiment', body: `Stand with your hands hanging down by your sides for two full minutes without moving, then look at them. They are pinker and feel slightly fuller than usual. That is blood pooling with gravity rather than inflammation — but it gives you the sensation of a tissue holding more fluid than it normally does, which is a reasonable preview of what a swollen finger is actually experiencing.` },
    { id: 'smaller', body: `Forget inflammation. One question: if you needed to get a great many cells to one specific spot in the body, quickly, how would you do it? They travel in the blood — so bring more blood there, and then let them out, which means making the vessel walls leaky at that place. Now notice that you have just specified redness, heat and swelling, and you were only trying to solve a delivery problem.` },
    { id: 'backward', body: `Start with why a deep internal problem can go unnoticed for months while a splinter announces itself in hours. Both involve the same response. Work backwards from "one is visible and one is not" and you arrive at the fact that the four signs are properties of skin and surface tissue — you can see redness through skin and not through a liver. The response is identical; your access to it is not.` }
  ],

  map: [
    { name: `Immunity and defence`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Blood and vessels`, level: 5 },
    { name: `Joints and connective tissue`, level: 5 },
    { name: `Evaluating health claims`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Nerves and signalling`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `Receptors and signals`, level: 5 }
  ]
}
