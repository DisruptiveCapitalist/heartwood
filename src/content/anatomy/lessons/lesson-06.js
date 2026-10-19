// Anatomy & Physiology · Week 2 · Lesson 6 — two pumps, side by side.
//
// Numbers measured off the simulation before this copy was written, and they
// come out of real physiology rather than being chosen to look good:
//   70 bpm → 70 mL a beat → 4.9 L/min   (a resting adult)
//  150 bpm → 106 mL a beat → 15.9 L/min
// Stroke volume rises with rate and then plateaus, which is the whole of the
// open question: a trained heart at 45 beats still moves about 5 litres.

export default {
  id: 'lesson-06',
  number: 1,
  week: 2,
  title: `The heart: more than a pump`,
  openingQuestion: `Everyone calls the heart a pump. But a pump moves something from one place to another, and your blood isn't going anywhere — it goes round and comes back to where it started. So what is the heart actually doing? And why does it need four rooms to do it, when a pump needs one?`,
  concept: `Two pumps, side by side`,

  see: {
    voice: 'professor',
    line: `{name}, watch the two sides rather than the whole thing. Then push the work up and see which number moves.`,
    simulation: { id: 'circulation', props: { mode: 'heart' } },
    observations: [
      { text: `Both sides squeezed at the **same instant**. The right sends blood to the lungs, the left sends it to the rest of you — and they never take turns.` },
      { text: `At rest, about 70 mL a beat, 70 times a minute: **4.9 litres a minute**. That is very nearly your entire blood volume, every minute, lying still.` },
      { text: `Working hard it reached **15.9 litres** — and not mainly by beating faster. The amount pushed out per beat rose too, from 70 mL to 106.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one dissolves most of the confusion.`,
    sentences: [
      `There are **two loops**, not one. A short one to the lungs and back, and a long one to everywhere else and back. The heart is simply the junction where the two loops meet — which is why it looks complicated.`,
      `Four chambers because each loop needs a room to **receive** into and a room to **push** from. Valves between them make the whole thing one-way; the thumping you can hear through a stethoscope is those valves shutting, not muscle squeezing.`,
      `What leaves the heart each minute is beats per minute **times** the amount per beat. Both can change, and that second one is the half most people have never heard of.`
    ],
    sequence: {
      label: `ONE DROP, ALL THE WAY ROUND`,
      note: `it passes through the heart twice`,
      steps: [
        { name: `Right top`, body: `Blood arrives from the body with its oxygen spent, and collects here.` },
        { name: `Right pump`, body: `Pushed out to the **lungs** — a short trip, at low pressure, which is why this side's wall is thin.` },
        { name: `The lungs`, body: `Oxygen gets on, carbon dioxide gets off. Lesson 8 is about that exchange.` },
        { name: `Left top`, body: `The loaded blood comes back from the lungs and collects here.` },
        { name: `Left pump`, body: `Pushed out to **everywhere else** — head, gut, legs, and the heart's own muscle. A long trip at high pressure, and a thick wall to manage it.` },
        { name: `Back again`, body: `It returns to the right top, spent, and the whole thing begins again. About once a minute, all day.` }
      ]
    },
    comparison: {
      label: `TWO PUMPS BOLTED TOGETHER`,
      body: `Picture two separate pumps, each with its own tank and its own loop of pipe — one running a short circuit, one running a long one. Now bolt them side by side and drive them off a single motor so they always stroke together. You have a heart. The reason this matters is that the two loops are in **series**, not side by side: every drop that goes round the body must then go round the lungs before it can go round the body again. *Where the analogy stops:* no engineer would build it from one piece of muscle that must never stop for eighty years, and no engineer would have to.`
    },
    naming: `The receiving rooms are the **atria** and the pushing rooms the **ventricles**. The short loop is the **pulmonary circulation** and the long one the **systemic**. The amount pushed out per beat is the **stroke volume**, and rate times stroke volume is the **cardiac output** — the single most useful number in cardiology. And nothing tells the heart to beat: a patch of cells in the right atrium, the **sinoatrial node**, fires on its own and the rest follow. A heart removed from the body goes on beating until it runs out of fuel.`,
    formalNames: {
      terms: [
        { term: `Atrium`, meaning: `A receiving chamber at the top. Thin-walled, because it only has to move blood a few centimetres into the ventricle below it.` },
        { term: `Ventricle`, meaning: `A pushing chamber below. The left one's wall is roughly three times the thickness of the right one's, and the reason is the length of the trip.` },
        { term: `Stroke volume`, meaning: `How much is pushed out per beat — about 70 mL at rest, and over 100 when you are working. Training raises it; this is most of what "a fit heart" means.` },
        { term: `Cardiac output`, meaning: `Rate × stroke volume. About 5 litres a minute at rest and up to 20 or more in hard exercise.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `You have measured bits of this without knowing it. Tap any you recognise.`,
    items: [
      `Feeling my pulse in my wrist or my neck.`,
      `A cuff on the arm and two numbers read out.`,
      `An athlete with a resting heart rate in the forties.`,
      `Sticky pads and a printout of spikes — an ECG.`,
      `Someone I know with a pacemaker.`,
      `A doctor listening to my chest and saying nothing is leaking.`
    ],
    builder: {
      body: `Find your pulse — two fingers on the thumb side of your wrist, or just beside your windpipe, pressing gently. Count the beats for fifteen seconds and multiply by four. Now sit quietly for a minute and do it again; most people get a slightly lower number the second time, because the first count included the small effort of finding it. Then, if you're comfortable doing so, stand up, walk the length of the hall and back at an ordinary pace, sit down and count again straight away. The difference between those two numbers is your heart adjusting its output to a demand that lasted about thirty seconds.`
    },
    ownPlaceholder: `Somewhere I've met my own heart…`,
    synthesis: `Notice that every one of those measures the *rate* and none of them measures the volume per beat — which is half the output. That's why two people with identical pulses can be in very different shape.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain why the heart needs four chambers rather than one — **without using the words "atrium" or "ventricle."**`,
    banned: ['atri', 'ventricl'],
    bannedNote: `one of those slipped in — and they are room names, not reasons`,
    placeholder: `There are two separate journeys, and…`,
    checks: [
      `There are two loops: a short one to the lungs and a long one to the rest of the body.`,
      `Each loop needs somewhere to collect blood and somewhere to push it from.`,
      `Valves keep everything going one way round.`,
      `Both sides squeeze together, so the same amount goes to each loop.`
    ],
    closing: `If your version has "two loops" in it, the four rooms stop being a list to memorise and become the only sensible arrangement.`
  },

  challenge: {
    voice: 'editor',
    line: `One to check the picture, and one that is really about arithmetic.`,
    prediction: {
      question: `One side of the heart has a much thicker muscle wall than the other. Which, and why?`,
      options: [
        {
          id: 'right',
          text: `The right — the lungs are big, so it has more to fill.`,
          verdict: `Size is a reasonable thing to reach for, and the lungs are indeed large. But what a pump works against is resistance and distance, not volume, and the lungs sit a few inches away in the same chest at very low pressure. The right side has the easiest job in the body: push this blood about six inches and let it spread out. Its wall is correspondingly thin.`
        },
        {
          id: 'left',
          text: `The left — it has to push blood round the whole body.`,
          verdict: `Yes, and the numbers are striking: the left wall is roughly three times the thickness of the right. It has to drive blood up to your head against gravity, down to your toes, through the gut and the kidneys and back again, at a pressure around five times what the right side generates. Same amount of blood per beat, both sides, every beat — but wildly different work. The thickness is the job written into the tissue.`
        },
        {
          id: 'same',
          text: `They're the same — they move the same amount of blood.`,
          verdict: `The premise is exactly right and it's the part people usually get wrong: the two sides *must* move the same amount per beat, or blood would pile up in one loop within a minute or two. But moving the same amount is not the same as doing the same work. One pushes six inches at low pressure, the other pushes several feet at high pressure, and muscle thickens to match what it is asked to do.`
        }
      ]
    },
    open: {
      question: `A trained runner's resting heart rate is about **45**. Someone who never exercises sits at about **75**. Both are perfectly well, and both need roughly the same five litres a minute while sitting still. So how does the runner manage it with thirty fewer beats?`,
      placeholder: `There must be something else that differs…`,
      reveal: [
        `By moving more with each beat. Output is rate times stroke volume, so if the stroke volume goes up the rate can come down and the product stays the same. Run the arithmetic: 45 beats at about 110 mL is 4.95 litres a minute. 75 beats at about 66 mL is 4.95 litres a minute. Identical output, achieved two completely different ways.`,
        `What training does is make the heart fill better and empty more completely — a larger, more compliant left ventricle that takes in more between beats and squeezes out a greater share of it. That is most of what "a fit heart" actually means, and it is why resting pulse is a rough proxy for fitness rather than a measure of it.`,
        `It also explains the runner's real advantage, which isn't at rest at all. Starting from a bigger stroke volume, they have far more room to climb when they ask for it — which is the ceiling you were sliding into in Lesson 3, now seen from the supply side.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about my own heart I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 7: the pipes. An artery is not "the one with the red blood" — one of your biggest arteries carries blood with its oxygen already spent, and the reason is worth a whole lesson.`
  },

  routes: [
    { id: 'analogy', body: `Think of a model railway with two loops that share one station. A short loop runs out to a siding and back; a long loop runs all the way round the layout. Every carriage must do the short loop, then the long loop, then the short one again — it cannot do two long loops in a row. The station is where it gets handed from one loop to the other, and it needs a platform and an engine for each. That is four rooms, and now it is obvious why.` },
    { id: 'object', body: `Make a fist. That is roughly the size of your own heart — rather smaller than most people picture, and it is sitting more or less in the middle of your chest rather than on the left. Now clench and release it about once a second. That is the rate. Keep going for a minute and your forearm will start complaining; your heart has been doing it since before you were born and will not stop to rest.` },
    { id: 'story', body: `For centuries it was taught that blood was made in the liver and consumed by the body, flowing outward and being used up. William Harvey destroyed that in 1628 with arithmetic rather than dissection: he measured how much the heart held, multiplied by the pulse, and showed it moved more blood in half an hour than the whole body contained. It could not be being made and consumed at that rate. It had to be going round. He was mocked for years.` },
    { id: 'experiment', body: `Let one arm hang straight down by your side for a minute while the other rests on your head. Then hold them side by side and look at the backs of both hands. The veins on the hanging one stand up; on the raised one they have emptied and flattened. Nothing changed but height. You have just seen how little pressure the returning side runs at — gravity alone is enough to move it about.` },
    { id: 'smaller', body: `Forget chambers. One question: if blood has to visit the lungs *and* the body, and it cannot do both at once, how many trips does one drop make through the heart per full circuit? Two. Once on the way to the lungs, once on the way to the body. Now ask what each trip needs — somewhere to arrive and somewhere to be pushed from — and you have counted to four without being told anything.` },
    { id: 'backward', body: `Start with a blood-pressure reading, say 120 over 80. That is pressure in an artery of your arm, which is on the body loop, driven by the left side. Nobody ever quotes you a pressure for the lung loop — and if they did it would be about 25 over 10. Work backwards from the fact that one loop runs at five times the pressure of the other and you will arrive at two pumps, two circuits, and a very good reason for one wall to be thicker.` }
  ],

  map: [
    { name: `Circulation`, level: 4, fresh: true },
    { name: `Homeostasis`, level: 4 },
    { name: `Levels of organization`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Cellular energy`, level: 4 },
    { name: `DNA and proteins`, level: 4 },
    { name: `Receptors and signals`, level: 4 },
    { name: `Molecules`, level: 4 },
    { name: `Water in the body`, level: 3 },
    { name: `Atoms and elements`, level: 3 }
  ]
}
