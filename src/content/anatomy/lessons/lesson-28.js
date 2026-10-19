// Anatomy & Physiology · Week 6 · Lesson 28 — absorbed, distributed, transformed, removed.
//
// Measured off the simulation: swallowed, a dose of 100 peaks at 33 after about
// two hours, because less than half survives the first pass through the liver.
// Injected, the same dose peaks at 100 immediately — straight past the ceiling.
// Halving the clearance takes the half-life from 5 hours to 10 and doubles the
// time in the useful band from 6.2 hours to 12.1.
//
// The spec's final requirement for this lesson is the one Week 4 spent itself
// on: distinguish a medicine's mechanism of action from evidence that it
// improves a meaningful outcome. It is restated here rather than assumed.

export default {
  id: 'lesson-28',
  number: 3,
  week: 6,
  title: `How medicines work in the body`,
  openingQuestion: `Two people take the same tablet, at the same dose, for the same thing. One is helped, one feels nothing, and a third would be harmed by it. Nothing about the tablet differed. So what is it about a body that decides which of those three happens — and why is a dose a number at all, rather than just "enough"?`,
  concept: `Absorbed, distributed, transformed, removed`,

  see: {
    voice: 'professor',
    line: `{name}, look at the swallowed curve first. Then inject the same dose and watch what happens to the peak.`,
    simulation: { id: 'processing', props: { mode: 'medicine' } },
    observations: [
      { text: `**Swallowed**, a dose of 100 reached only about 33 — less than half survived the first pass through the liver — and it got there gradually, over about two hours.` },
      { text: `**Injected**, the same dose reached 100 straight away, sailing past the top of the useful band. Same molecule, same number, completely different event.` },
      { text: `And halving the clearance took the half-life from 5 hours to 10, and the time in the useful band from 6 hours to 12. Which is why "the same dose" is not the same thing in two different people.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. Four things happen, and then the two numbers that matter.`,
    sentences: [
      `Four things happen to anything you take, in order: it is **absorbed** into the blood, **distributed** around the body, chemically **transformed** — mostly by the liver — and **removed**, mostly by the kidneys. Everything else about a medicine is detail on top of those four.`,
      `The useful range has **two edges**. Below the lower one nothing happens; above the upper one harm begins. That band is the therapeutic window, and for some medicines it is comfortably wide and for others alarmingly narrow — which is the difference between a tablet you take casually and one that needs blood tests.`,
      `And where you land in that band depends on **route, age, kidney and liver function, other medicines and inherited differences**. None of those is about the molecule. All of them are about the body it entered, which is why doses are adjusted rather than universal.`
    ],
    sequence: {
      label: `WHAT HAPPENS TO A TABLET`,
      note: `and where each step can go differently`,
      steps: [
        { name: `Absorbed`, body: `Across the small intestine, into the blood. Food, acid and the tablet's own coating all affect how fast — which is what "take with food" or "on an empty stomach" is about.` },
        { name: `First pass`, body: `Straight to the **liver**, before anywhere else. A good deal is transformed on the way through, which is why a swallowed dose has to be larger than an injected one to achieve the same thing.` },
        { name: `Distributed`, body: `Carried everywhere by the blood within a minute or two. Some tissues it reaches easily; some, like the brain, are guarded and harder to enter.` },
        { name: `Acting`, body: `At its target it binds something — and whether it triggers, blocks or does nothing is Lesson 18's question, separate from whether it fits.` },
        { name: `Transformed`, body: `The liver keeps working on it, usually making it more water-soluble so the kidneys can deal with it. This is where most drug **interactions** happen — two medicines competing for the same enzyme.` },
        { name: `Removed`, body: `Mostly by the kidneys, into urine. Half gone in about five hours for our example — or ten, if clearance is reduced, which is when the next dose starts arriving on top of the last.` }
      ]
    },
    comparison: {
      label: `A BATH WITH THE TAP AND THE PLUG BOTH OPEN`,
      body: `The level in the bath is not set by the tap alone. Run the tap steadily with the plug out and the water finds a level where it drains as fast as it arrives. Narrow the drain and the same tap fills the bath much higher; widen it and the same tap barely covers the bottom. Dosing is this exactly: the dose and interval are the tap, your clearance is the drain, and the level that results is what actually acts on you. *Where the analogy stops:* a bath overflows visibly. A medicine accumulating above its window may produce nothing you notice until something goes quite wrong, which is why some are monitored with blood tests rather than by how the person feels.`
    },
    naming: `The four steps are **absorption, distribution, metabolism and excretion** — often shortened to ADME, and the whole of basic pharmacology hangs on them. The loss on the way through the liver is the **first-pass effect**. **Half-life** is the time for half of it to be gone, and it is what sets how often a dose is repeated. The band between useful and harmful is the **therapeutic window**. And one thing deserves repeating from Week 4: knowing a medicine's **mechanism** — what it binds and what that does — is a different claim from knowing that it improves something that matters to a person. The first is pharmacology. The second takes a trial.`,
    formalNames: {
      terms: [
        { term: `First-pass effect`, meaning: `Loss as a swallowed drug passes through the liver before reaching the rest of the body. Why oral doses are larger, and why some drugs cannot be given orally at all.` },
        { term: `Half-life`, meaning: `Time for half the amount to be eliminated. Sets the dosing interval — and doubles when clearance halves, so the same schedule accumulates.` },
        { term: `Therapeutic window`, meaning: `The range between a dose that does too little and one that does harm. Narrow windows mean monitoring.` },
        { term: `Interaction`, meaning: `One medicine changing what the body does to another — commonly by competing for the same liver enzyme, so one of them is cleared more slowly.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've been told or wondered about.`,
    items: [
      `"Take with food" — or firmly without it.`,
      `A warning about grapefruit juice on a leaflet.`,
      `An older relative on a lower dose of the same medicine.`,
      `A blood test before or during a course of something.`,
      `A pharmacist asking what else you take.`,
      `Something given by injection because a tablet "wouldn't work".`
    ],
    builder: {
      body: `Take the leaflet from any medicine in the house and find the section on how to take it. Every instruction there is one of this lesson's four steps. "With food" or "without" is **absorption**. "Do not take with X" is almost always **transformation** — two things competing for the same liver enzyme. "Every eight hours" is **half-life**, and nothing else. "A lower dose if you have kidney problems" is **removal**. The leaflet is a pharmacology lesson written as instructions, and once you can see which step each line is about, it stops being a list to obey and becomes something you understand.`
    },
    ownPlaceholder: `An instruction on a medicine I never understood…`,
    synthesis: `The pharmacist's question is the one most worth answering carefully. Interactions are the commonest avoidable problem in all of this, and they are invisible from inside — nothing about taking two tablets feels different from taking one.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why the same dose of the same medicine can affect two people quite differently — **without using the words "metabolism" or "half-life."**`,
    banned: ['metabolis', 'half-life'],
    bannedNote: `one of those came back — and the explanation works from the four steps alone`,
    placeholder: `How much ends up in the blood depends on more than how much was swallowed…`,
    checks: [
      `How much gets into the blood at all depends on how it was taken and on the gut.`,
      `The liver changes a lot of it before it ever reaches the rest of the body.`,
      `How fast it is cleared decides how high the level climbs and how long it stays.`,
      `And clearing differs with age, with how well the liver and kidneys work, and with what else someone is taking.`
    ],
    closing: `If your version separates "how much was taken" from "how much is actually there", you have the lesson — and most of why a dose is a number rather than a guess.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a warning on a leaflet, and one about a routine adjustment.`,
    prediction: {
      question: `Some medicines carry a warning against **grapefruit juice**. What is the juice actually doing?`,
      options: [
        {
          id: 'absorb',
          text: `Stopping the medicine being absorbed, so less gets in.`,
          verdict: `A reasonable guess, and some foods genuinely do bind drugs in the gut and reduce absorption — calcium and certain antibiotics, for instance. But that would make the warning "it won't work so well", which is a nuisance rather than a danger. The warning on these leaflets is usually stern, which tells you the risk runs the other way: the problem is too much, not too little.`
        },
        {
          id: 'enzyme',
          text: `Blocking a liver enzyme, so more of the drug survives — effectively a bigger dose.`,
          verdict: `Exactly, and it is a startling effect for a glass of juice. Grapefruit contains compounds that inhibit an enzyme the liver and gut use to transform a long list of medicines. With that enzyme blocked, far more of the swallowed dose survives the first pass, and the level climbs well above what the prescribed number intended. The person has taken the right dose and received a larger one, which is precisely why it warrants a warning.`
        },
        {
          id: 'acid',
          text: `Making the stomach too acidic for the tablet to survive.`,
          verdict: `Grapefruit juice is certainly acidic, so the instinct is sound, and stomach acidity does affect some medicines — which is why certain tablets have coatings designed to survive it. But acidity is not what is happening here, and you can tell from the pattern: the warning applies to specific drugs regardless of their coating, and it persists for many hours after the juice, long after any acidity has passed.`
        }
      ]
    },
    open: {
      question: `Older people are very often prescribed **lower doses** of the same medicines. Given the four steps, what has usually changed — and why does it matter more when someone takes several things?`,
      placeholder: `If removal slows down, then the same dose…`,
      reveal: [
        `Mostly the last step. Kidney function declines gradually with age in most people — the filtering rate falls — and liver blood flow falls too. Neither is illness; it is the ordinary trajectory. But a drug cleared more slowly reaches a higher level from the same dose and stays there longer, so a schedule that was right at forty may be delivering considerably more at eighty, with nothing having changed except the body around it.`,
        `Body composition shifts as well — proportionally less water, often more fat — which changes how some drugs distribute. And the one that compounds everything: older people are far more likely to take several medicines at once, and each addition is a new chance that two of them compete for the same liver enzyme. Risk from interactions rises faster than the number of medicines does.`,
        `Which is why reviewing someone's whole list periodically is real medicine rather than paperwork, and why a pharmacist is worth the question. None of this is a reason for anybody to adjust anything themselves — the four steps explain *why* a dose is personal, and the person who can work out what yours should be is the one with your test results in front of them.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about medicines I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 29: the organs doing all that work. Your kidneys filter about a hundred and eighty litres a day and give back more than ninety-nine per cent of it.`
  },

  routes: [
    { id: 'analogy', body: `A letter posted to someone in a large building. Whether it arrives depends on the post office, the mail room, how many people open things on the way, and whether anyone throws it out before it reaches the right desk. The sender controls what was written and almost nothing else. A dose is what was written; what acts on you is what arrives at the desk.` },
    { id: 'object', body: `Read the dosing line on any packet: "one tablet every eight hours". That eight is not a convenience or a tradition — it is derived from how long the stuff lasts in a body, chosen so that the next dose arrives as the previous one is fading. Take them closer together and you are filling faster than you empty. The number is the whole of this lesson, compressed into an instruction.` },
    { id: 'story', body: `In the 1950s the sedative thalidomide was given to pregnant women for morning sickness, with terrible consequences. One of the many things it changed was how drugs are assessed — but it also sharpened a scientific point: the molecule exists in two mirror-image forms, and they behave differently in the body. It is now known that the body converts between them, so separating them would not have helped. The episode is a hard lesson in how much more there is to a medicine than its intended action.` },
    { id: 'experiment', body: `Notice how long it takes for a cup of strong coffee to affect you, and roughly how long before you stop noticing it. For most people it is twenty to forty minutes to arrive and several hours to fade — caffeine's half-life is around five hours, which is why an afternoon cup can still be measurably present at bedtime. You have been running this lesson's curve on yourself for years.` },
    { id: 'smaller', body: `Forget medicines. One question: if you pour water into a leaky bucket at a steady rate, what decides the level? Both the pouring and the leaking. Now ask what happens if the leak halves and the pouring does not — the level climbs until the smaller leak keeps up, which may be far higher than before. You have just worked out why reduced clearance matters and why the dose is adjusted rather than the schedule.` },
    { id: 'backward', body: `Start with why some medicines require regular blood tests and most do not. What is being measured is the level, and it is only worth measuring when being slightly wrong matters — which means the gap between useful and harmful is narrow. Work backwards from "some drugs need watching" and you arrive at the therapeutic window, at why it differs between drugs, and at why clearance is the thing that moves you within it.` }
  ],

  map: [
    { name: `Medicines in the body`, level: 4, fresh: true },
    { name: `Evaluating health claims`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Metabolism and energy balance`, level: 5 },
    { name: `Blood and vessels`, level: 5 },
    { name: `Hormones and the endocrine system`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `DNA and proteins`, level: 5 }
  ]
}
