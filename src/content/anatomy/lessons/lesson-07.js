// Anatomy & Physiology · Week 2 · Lesson 7 — the pipes, and why blood slows down.
//
// The spec insists on one correction here and it is the spine of the lesson:
// arteries and veins are defined by direction, not by oxygen content. The
// pulmonary artery is the counter-example that settles it, so it is the
// prediction question rather than a footnote.
//
// Measured off the simulation: artery 33 cm/s, capillary 0.04 cm/s at rest —
// about eight hundred times slower — because all the capillaries together come
// to roughly 4,500 cm² against the aorta's 4.5. That slowness is not a flaw in
// the plumbing; it is the only reason exchange has time to happen.

export default {
  id: 'lesson-07',
  number: 2,
  week: 2,
  title: `Blood, arteries, veins and capillaries`,
  openingQuestion: `Everyone knows an artery is the one with the bright red blood. Except that one of your largest arteries carries blood with its oxygen already spent — and a vein, in the same chest, carries blood freshly loaded. So what actually makes a vessel an artery? And why does the blood almost stop halfway round its journey?`,
  concept: `Direction, not colour`,

  see: {
    voice: 'professor',
    line: `{name}, tap each of the three in turn. Then put the artery's speed next to the capillary's and stay with it a moment — the gap is not a rounding error.`,
    simulation: { id: 'circulation', props: { mode: 'vessels' } },
    observations: [
      { text: `The same litres per minute pass through all three. They have to — it is one loop, and nothing is stored anywhere along it.` },
      { text: `And yet an artery runs at about **33 cm/s** while a capillary creeps at **0.04** — something like eight hundred times slower.` },
      { text: `Because all your capillaries **together** come to roughly 4,500 cm² of cross-section against the aorta's 4.5. The blood slows because the road widened — and that slowness is the entire point of them.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. The first one is the correction that makes the rest work.`,
    sentences: [
      `An **artery** carries blood *away* from the heart and a **vein** carries it *back*. That is the whole definition — direction, not colour and not oxygen. The artery to your lungs carries spent blood; the veins from your lungs carry loaded blood; both are named correctly.`,
      `Three jobs, three builds. An artery is thick, muscular and elastic because it meets the full force of every beat. A capillary is **one cell thick**, because things have to cross it. A vein is roomy and low-pressure, with valves inside to stop blood sliding back down your legs.`,
      `And blood is not a liquid so much as a **crowd**: red cells carrying oxygen, white cells on patrol, platelets ready to plug a leak, all suspended in plasma — and the plasma is doing its own quiet work, carrying nutrients, hormones, waste and heat.`
    ],
    sequence: {
      label: `WHAT IS ACTUALLY IN THE RED LIQUID`,
      note: `by volume, roughly`,
      steps: [
        { name: `Plasma`, body: `A little over half of it, and mostly water. Everything dissolved travels here: sugar, salts, hormones, waste on its way to the kidneys, and the heat being carried out to your skin.` },
        { name: `Red cells`, body: `Almost all the rest. No nucleus, packed with haemoglobin, flexible enough to fold through a capillary narrower than they are. About 25 trillion of them.` },
        { name: `White cells`, body: `Under 1% — you would need a careful look to find one. They are mostly not in the blood at all; the blood is how they get to where the trouble is. Week 5 is theirs.` },
        { name: `Platelets`, body: `Fragments rather than whole cells, waiting to clump at a tear. The reason a small cut stops on its own.` }
      ]
    },
    comparison: {
      label: `MOTORWAY, SIDE STREET, FOOTPATH`,
      body: `Traffic leaves a city on a six-lane motorway, moving fast. It spreads into main roads, then side streets, then the lane outside a particular house — where it is barely moving at all. The same number of cars per hour passes every stage; what changed is how many routes they are spread across. And notice that nobody delivers anything from the motorway. Deliveries happen in the lane, precisely because that is where you are going slowly enough to stop. *Where the analogy stops:* cars choose their route. Blood goes wherever the vessels have been widened or narrowed for it, which is a decision made by your body and not by the blood.`
    },
    naming: `The liquid part is **plasma**; the share of blood that is red cells is the **haematocrit**, around 40–45%, and it is one of the first numbers on any blood test. The two numbers in a blood pressure reading are the **systolic** — the pressure while the left ventricle is squeezing — and the **diastolic**, the pressure left between beats. That there is a diastolic number at all is the interesting part, and it is the second question below.`,
    formalNames: {
      terms: [
        { term: `Artery`, meaning: `Carries blood away from the heart, at whatever oxygen content. Thick, elastic, muscular; it can narrow or widen to send blood where it is wanted.` },
        { term: `Capillary`, meaning: `One cell thick, and the only place where anything crosses in or out. Everything else in the circulation exists to get blood to and from these.` },
        { term: `Vein`, meaning: `Carries blood back toward the heart. Low pressure, roomy, with one-way valves — and it depends on your muscles squeezing it along.` },
        { term: `Blood pressure`, meaning: `The pressure in a systemic artery, written as squeezing over resting — 120 over 80 being the familiar shorthand. It is a property of the vessels as much as of the heart.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've come across.`,
    items: [
      `Two numbers from a blood pressure cuff, and nobody explaining what the second one is.`,
      `Giving blood, and being asked about iron levels first.`,
      `Varicose veins, and being told to keep moving.`,
      `A bruise — blood that has leaked out and is being cleared up.`,
      `A small cut that stops bleeding by itself within a couple of minutes.`,
      `Feet going cold and numb after sitting too long in one position.`
    ],
    builder: {
      body: `Press hard on the pad of your thumb with another fingertip for about five seconds, then take it away and watch closely. The skin is pale where you pressed, and the colour floods back within a second or two. You have just squeezed the blood out of the capillaries in that patch of skin and watched them refill. Clinicians do exactly this, on a fingernail, and call it capillary refill — a two-second answer to "is blood getting to the far end of this person?" that needs no equipment at all.`
    },
    ownPlaceholder: `Somewhere I've met my own plumbing…`,
    synthesis: `Notice how many of those are about the *returning* side — bruises, varicose veins, cold feet from sitting. The low-pressure half of the circuit is the one that struggles, and it is the one that needs you to move.`
  },

  feynman: {
    line: `Your turn, and the forbidden words are the ones that mislead.`,
    instruction: `Explain the difference between an artery and a vein — **without using the words "oxygen" or "red."**`,
    banned: ['oxygen', 'red'],
    bannedNote: `one of those came back — and both are exactly what sends people wrong here`,
    placeholder: `It's about which way the blood is going…`,
    checks: [
      `An artery carries blood away from the heart; a vein carries it back.`,
      `The difference is direction, not what the blood happens to be carrying.`,
      `Arteries are thick and elastic because they take the force of each beat.`,
      `Veins are low-pressure and have valves, and rely on your muscles to help.`
    ],
    closing: `If you explained it without either word, you will never again be caught out by the vessels going to and from the lungs — which is the one place the colour rule fails completely.`
  },

  challenge: {
    voice: 'editor',
    line: `The first one catches nearly everybody. The second is about a number you have been read many times.`,
    prediction: {
      question: `The **pulmonary artery** runs from the heart to the lungs. Does it carry blood rich in oxygen, or poor in it?`,
      options: [
        {
          id: 'rich',
          text: `Rich — it's an artery, and arteries carry oxygenated blood.`,
          verdict: `This is the rule almost everyone is taught, and for every other artery in your body it gives the right answer, which is exactly why it survives. But think about where this vessel is going: to the lungs. Blood on its way *to* the lungs is blood that has not been there yet — it has just come back from the body with its oxygen spent. The rule isn't slightly wrong here; it is backwards.`
        },
        {
          id: 'poor',
          text: `Poor — it's carrying blood to the lungs to be loaded.`,
          verdict: `Correct, and this one vessel is why the definition has to be about direction. The pulmonary artery carries the most oxygen-poor blood in your body, and the pulmonary veins carry the richest. They are still named correctly, because "artery" has never meant anything but away-from-the-heart. Hold onto this pair and the colour rule can never mislead you again.`
        },
        {
          id: 'neither',
          text: `Neither — it's a mixture, since it comes from everywhere.`,
          verdict: `There is something genuinely true buried here: the blood arriving at the right side of the heart really is a mixture, pooled from a brain that extracted a lot and a resting arm that extracted very little. Mixed venous blood is a real measurement and clinicians use it. But mixed does not mean middling — the pooled result is still distinctly oxygen-poor, around 75% loaded at rest, which is what you watched in the simulation.`
        }
      ]
    },
    open: {
      question: `A blood pressure reading has two numbers, say 120 over 80. The first is the pressure while the heart squeezes. So why isn't the second one **zero**? Between beats, nothing is pushing at all.`,
      placeholder: `Something must be holding the pressure up…`,
      reveal: [
        `The arteries are. A large artery is not a rigid pipe — it is elastic, and every beat stretches it. When the heart stops pushing, the stretched wall recoils and goes on squeezing the blood forward. The 80 is the pressure left over from the last beat, maintained by the vessel itself rather than by the heart.`,
        `Which means your arteries are not plumbing; they are part of the pump. If they were rigid tubes, flow through your capillaries would stop dead between beats and resume with a slam — your tissues would receive blood in pulses with nothing in between. The elastic recoil turns an intermittent push into a near-continuous flow, which is what a capillary needs in order to be useful.`,
        `This is also why that second number is watched so carefully as people age. Arteries stiffen over a lifetime, and a stiffer artery stores less of each beat — so the first number tends to climb while the second stays flat or falls. The gap between them is itself a measurement, and what it is measuring is the springiness of the pipe.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about blood or blood vessels I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 8: the oxygen itself. You can hold your breathing completely steady and still halve or double what reaches your muscles — so breathing turns out to be only one of four things that matter.`
  },

  routes: [
    { id: 'analogy', body: `A river running into a delta. Up in the gorge it is fast and narrow and dangerous; spread across a thousand channels at the mouth it is barely moving, and that is where the silt settles and the reeds grow and everything lives. Same water, same amount per second. All the life is in the slow part, and the slow part is slow precisely because it is spread so wide. Your capillaries are the delta, and all the exchange happens there for the same reason.` },
    { id: 'object', body: `Look at the back of your hand under a good light and find the blue-green lines. Those are veins, and the blood inside them is dark red, not blue — the colour you see is what is left after your skin has scattered away the rest of the light. Press one gently and slide your finger along it toward your wrist; it empties and stays flat until you lift off. Try sliding the other way and it refills at once. You have just found a valve.` },
    { id: 'story', body: `Capillaries were the missing piece in Harvey's argument. He had proved blood must go round, but he could not show how it got from the arteries into the veins — no instrument of his time could see a vessel that small, and he died with the gap unfilled. Four years later Marcello Malpighi put frog lung under one of the new microscopes and saw them: a fine mesh joining the two. The whole circuit closed, thirty-two years after it was first argued for.` },
    { id: 'experiment', body: `Hold both hands up above your head for thirty seconds, then drop one to your side and keep the other up. Now look at them together. The lowered hand is pinker and its veins are standing; the raised one is paler and flat. Nothing has changed except height, and gravity alone was enough to do it — which tells you how gentle the pressures are once you are past the arteries.` },
    { id: 'smaller', body: `Forget arteries and veins. One question: if the same amount of blood per minute has to pass a wide place and a narrow place, where does it move faster? The narrow place — the same as water from a hose when you squeeze the end. Now turn it round: your capillaries are individually microscopic, but there are billions of them, so *together* they are the widest part of the whole circuit by far. That is why the blood crawls there, and crawling is exactly what was wanted.` },
    { id: 'backward', body: `Start with the fact that a doctor presses your fingernail and watches the colour return. Why would that tell them anything? Because it tests the very end of the line — the smallest vessels, farthest from the heart, the first place to suffer if pressure or flow is failing anywhere upstream. Work backwards from "the far end is the honest test" and you have the whole architecture: a pressurised supply, a slow exchange zone, and a low-pressure return.` }
  ],

  map: [
    { name: `Circulation`, level: 5 },
    { name: `Homeostasis`, level: 4 },
    { name: `The cell`, level: 5 },
    { name: `Levels of organization`, level: 5 },
    { name: `Blood and vessels`, level: 4, fresh: true },
    { name: `Cellular energy`, level: 4 },
    { name: `DNA and proteins`, level: 4 },
    { name: `Receptors and signals`, level: 4 },
    { name: `Gas exchange`, level: 1, fresh: true },
    { name: `Molecules`, level: 4 }
  ]
}
