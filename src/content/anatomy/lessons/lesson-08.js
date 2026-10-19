// Anatomy & Physiology · Week 2 · Lesson 8 — oxygen, and the four things that decide it.
//
// The spec's requirement for this lesson is the one most teaching skips:
// adequate oxygen delivery depends on more than breathing. The simulation is
// built so the learner can watch that directly — breaths rise from 12 to 33
// while oxygen used rises from 227 to 1,649 mL a minute, a sevenfold change
// against a not-quite-threefold one. The lungs never change their answer: blood
// leaves them 98% loaded at every setting. What changes is everything else.

export default {
  id: 'lesson-08',
  number: 3,
  week: 2,
  title: `Oxygen, the lungs and what cells need`,
  openingQuestion: `Breathing feels like the whole story — you breathe harder, you get more oxygen. But you can hold your breathing almost steady and still halve or double what actually reaches a muscle. So if breathing is not the whole story, what are the other parts of it?`,
  concept: `Breathing is one of four things`,

  see: {
    voice: 'professor',
    line: `{name}, push the work up and keep one eye on the breathing figure. It moves — but nothing like as much as the number beside it.`,
    simulation: { id: 'circulation', props: { mode: 'lungs' } },
    observations: [
      { text: `Blood leaves the lungs **98% loaded** at every single setting. The lungs do not work harder or less hard; they simply fill it up.` },
      { text: `What changed was the blood **coming back** — 75% loaded at rest, and down to 46% working hard. The tissues took far more out of it.` },
      { text: `Oxygen used went from 227 to **1,649 mL a minute** — seven times over — while breaths only went from 12 to 33. Breathing was the smallest part of the change.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first will sound like a trick.`,
    sentences: [
      `**Nothing pushes oxygen into your blood.** There is no pump and no active step. There is simply more oxygen in the air sac than in the blood arriving, so it drifts across until the difference is gone — and the same thing happens in reverse for carbon dioxide, in the same place, at the same moment.`,
      `That works only because the barrier is almost nothing: one cell of air sac and one cell of capillary, with the two pressed together. Laid flat, the whole exchange surface would cover most of a tennis court, folded into your chest.`,
      `And how much oxygen reaches a muscle depends on **four** things, not one: how much air you move, how much blood your heart moves, how much the blood can carry, and how hard the tissue is pulling. Breathing is the one you can feel, which is why it gets all the credit.`
    ],
    sequence: {
      label: `WHAT HAS TO GO RIGHT`,
      note: `and any one of them can be the limit`,
      steps: [
        { name: `Breathing`, body: `Air in and out, often enough, deeply enough. The part you notice.` },
        { name: `Crossing over`, body: `Oxygen drifting from the air sac into the blood. Needs the barrier to stay thin and the sacs to stay open.` },
        { name: `Carrying`, body: `**Haemoglobin** inside the red cells. Plasma alone could carry only a fraction of what you need — this is why the amount of haemoglobin matters so much.` },
        { name: `Delivering`, body: `The heart moving the loaded blood to where it is wanted — Lesson 6's cardiac output, now doing its real job.` },
        { name: `Taking it up`, body: `The tissue pulling oxygen out. A working muscle extracts far more from the same blood than a resting one does, which is what you watched.` }
      ]
    },
    comparison: {
      label: `THE LOADING DOCK`,
      body: `A warehouse with a loading bay and a fleet of vans. Ask why fewer goods are arriving at the shops and there are several possible answers: not enough stock coming into the bay, not enough vans, vans that are half the size they should be, or shops that have simply stopped ordering. "Load the bay faster" only helps if the bay was the bottleneck. Breathing is the loading bay; the heart is the fleet; haemoglobin is the size of each van; and the tissue's demand is the order book. *Where the analogy stops:* nobody loads the vans. Oxygen gets aboard because there is more of it outside than inside, and it would do so with the warehouse entirely unstaffed.`
    },
    naming: `The air sacs are **alveoli** — about 300 million of them — and the drifting is **diffusion**, which needs no energy and no machinery, only a difference. The carrier is **haemoglobin**, four iron-holding sites per molecule, and how full those sites are is the **saturation** — the number a clip on your finger reads out as 97 or 98. Carbon dioxide leaves by the same route in the opposite direction, and it is worth knowing that the urge to breathe is driven mostly by **rising carbon dioxide**, not by falling oxygen. Your body watches the waste, not the fuel.`,
    formalNames: {
      terms: [
        { term: `Alveolus`, meaning: `One air sac, one cell thick, with a capillary pressed against it. Around 300 million of them, giving a surface of roughly seventy square metres.` },
        { term: `Diffusion`, meaning: `Things spreading from where there is more of them to where there is less. No energy required. This is the whole mechanism of gas exchange.` },
        { term: `Haemoglobin`, meaning: `The protein in red cells that holds oxygen — and the reason blood carries roughly seventy times more than plain plasma could.` },
        { term: `Saturation`, meaning: `How full the haemoglobin is, as a percentage. Normally 95–100% in arterial blood. The number a finger clip shows.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've seen or felt.`,
    items: [
      `A clip on my finger with a number on it at the doctor's.`,
      `Being short of breath higher up a mountain, or stepping off a plane in Denver.`,
      `Someone told they were tired because their iron was low.`,
      `A carbon monoxide alarm on the wall or ceiling.`,
      `Breathing hard for a while *after* stopping, not during.`,
      `Oxygen tubing under someone's nose.`
    ],
    builder: {
      body: `Breathe out slowly and fully onto a cold window or a mirror. The fog that appears is water you have just lost — you lose roughly a cup of it a day simply by breathing, because the air coming back out has been warmed to body temperature and fully moistened on the way. Now notice something else: you cannot make the fog by holding your breath and thinking about it. The exchange happens because air moved, and that is the only part of the chain you control directly.`
    },
    ownPlaceholder: `Somewhere I've met oxygen as a number…`,
    synthesis: `Notice that most of those are about the *carrying* and the *delivering* rather than the breathing — iron, altitude, a finger clip. Medicine spends far more time on the other three links than on the one you can feel.`
  },

  feynman: {
    line: `Teach it, and the two forbidden words are the two that let you skip the reasoning.`,
    instruction: `Explain why breathing harder does not always get more oxygen to a muscle — **without using the words "haemoglobin" or "diffusion."**`,
    banned: ['haemoglobin', 'hemoglobin', 'diffus'],
    bannedNote: `one of those reappeared — and naming the carrier is not the same as explaining the chain`,
    placeholder: `Getting air in is only the first step, because…`,
    checks: [
      `Getting air into the lungs is only the first link in a chain.`,
      `Oxygen has to cross into the blood, and then be carried by something.`,
      `The heart has to move that blood to where it is needed.`,
      `And the muscle has to pull the oxygen out — a working one takes far more than a resting one.`
    ],
    closing: `If your version has a chain in it with more than one weak link, you understand why someone can be breathless with perfectly healthy lungs.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a mountain, and one about a device on your ceiling.`,
    prediction: {
      question: `At the top of a high mountain the air is still **21% oxygen** — exactly the same share as at sea level. So why is it hard to breathe up there?`,
      options: [
        {
          id: 'thin',
          text: `There's less air altogether, so each breath holds fewer oxygen molecules.`,
          verdict: `Exactly right. The proportion is unchanged but the pressure is not — at 12,000 feet the air is around 60% as dense, so the same lungful contains around 60% as much of everything, oxygen included. Less oxygen pressing on the air sacs means a smaller difference driving it across into the blood, and saturation falls. Your body's response is to breathe more and, over days to weeks, to make more red cells.`
        },
        {
          id: 'cold',
          text: `The air is colder and drier, which makes it harder to take in.`,
          verdict: `Both those things are true of mountain air and both are genuinely unpleasant — cold dry air irritates the airways and is a real trigger for some people. But they would make breathing uncomfortable rather than insufficient, and the breathlessness at altitude happens just as much on a warm, still day. The problem is in how much is in each breath, not in how the breath feels.`
        },
        {
          id: 'used',
          text: `The oxygen has been used up by everything lower down.`,
          verdict: `A reasonable picture of a finite resource being consumed from the bottom up, and it's the kind of thinking that serves well elsewhere. But the atmosphere mixes thoroughly, and the 21% holds from sea level to well above any mountain. What falls with height is not the share of oxygen but the total amount of air — the whole atmosphere is simply thinner up there because there is less of it stacked above pressing down.`
        }
      ]
    },
    open: {
      question: `Carbon monoxide is dangerous at concentrations far too low to displace the air in a room — and someone poisoned by it can have a finger-clip reading of **98%**, looking perfectly fine on the monitor, while suffocating. How can both of those be true?`,
      placeholder: `It must be doing something to the carrying…`,
      reveal: [
        `Because it attacks the third link in the chain rather than the first. Carbon monoxide binds to the very same sites on haemoglobin that oxygen uses, and it binds there **more than two hundred times more tightly**. A trace in the air is enough to occupy a large share of your carrying capacity, and once it is on, it does not readily come off. The lungs are fine, the breathing is fine, the heart is fine — the vans are simply full of the wrong cargo.`,
        `And the finger clip is fooled because of how it works: it shines light through and judges saturation by colour. Haemoglobin carrying carbon monoxide is bright red — redder than normal, in fact — so the device reads it as loaded. It is answering "how full is it?" when the question needed is "full of what?"`,
        `That gap between a reassuring number and a dangerous reality is exactly why carbon monoxide alarms exist and why they are worth having. No symptom and no ordinary monitor reliably catches it; the detector is doing a job your body genuinely cannot do for itself. If one ever sounds, the advice is the same everywhere — get everyone out into fresh air first and ask questions afterwards.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done.`,
    prompt: `One thing about oxygen in my body I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 9 — and it is a question you have probably asked in your own kitchen. Why do hands and feet get cold, when the middle of you is perfectly warm?`
  },

  routes: [
    { id: 'analogy', body: `Two rooms with a door between them, one crowded and one empty. Open the door and people spread through — not because anyone organised it, but because there was nowhere else for the crowding to go. Nobody pushes. Now put a thin curtain in the doorway instead of a door and they still spread, a little slower. Your air sac and your capillary are those two rooms, and the curtain between them is two cells thick.` },
    { id: 'object', body: `Take a deep breath and hold a hand flat on your chest and the other on your belly. The belly one moves more, which surprises most people — the diaphragm does the great majority of the work and the chest is largely along for the ride. Now breathe out as far as you possibly can, and keep going past where you want to stop. There is still well over a litre of air in there that you cannot shift. Your lungs never empty, and that is deliberate: the sacs would stick shut if they did.` },
    { id: 'story', body: `In 1875 three French balloonists rose above 26,000 feet in an open basket. They had oxygen bags and all the warning signs — and the particular cruelty of oxygen lack is that it takes your judgement first, cheerfully. Only one came down alive, and his account describes feeling perfectly well and simply not reaching for the tube. It is the reason modern aircraft drop the masks automatically rather than relying on anyone to notice.` },
    { id: 'experiment', body: `Sit still and count your breaths for a minute — most people get somewhere between twelve and sixteen. Now walk briskly up a flight of stairs, sit down and count again straight away, then again a minute later. The second count is high and the third is already falling. What you have measured is a control loop: your body noticed the carbon dioxide rising, raised the rate until it was cleared, then let it settle. Nobody decided any of it.` },
    { id: 'smaller', body: `Forget lungs entirely. One question: if you open a bottle of perfume in the corner of a room, how does it reach the other side? It spreads — from where there is a lot of it to where there is none, with nothing pushing. Now ask what would make that faster: a bigger difference, a shorter distance, a wider opening. Those are precisely the three things your lungs are built to maximise, and there is no fourth mechanism hiding anywhere.` },
    { id: 'backward', body: `Start with the finger clip and the number 98. Why would a hospital care about that particular figure, measured at a fingertip, rather than about how fast you are breathing? Because the fingertip is downstream of the whole chain — air, crossing, carrying, delivering. A good number there means every link held. Work backwards from "they measure the end of the chain, not the start" and you will find all four links without being told any of them.` }
  ],

  map: [
    { name: `Gas exchange`, level: 4, fresh: true },
    { name: `Circulation`, level: 5 },
    { name: `Blood and vessels`, level: 4 },
    { name: `Cellular energy`, level: 5 },
    { name: `Homeostasis`, level: 4 },
    { name: `The cell`, level: 5 },
    { name: `Levels of organization`, level: 5 },
    { name: `DNA and proteins`, level: 4 },
    { name: `Receptors and signals`, level: 4 },
    { name: `Molecules`, level: 4 }
  ]
}
