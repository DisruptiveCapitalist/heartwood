// Anatomy & Physiology · Week 4 · Lesson 18 — binding is not benefit.
//
// The spec's requirement: explain why a molecule's ability to bind a receptor
// does not by itself prove a meaningful clinical benefit, and introduce dose,
// route, target tissue, duration and biological context.
//
// Measured off the simulation: a blocker at full dose occupies 95% of the
// receptors and produces 0% of the response. Those two numbers side by side are
// the argument, and the learner makes them happen themselves before any of this
// copy tells them anything.

export default {
  id: 'lesson-18',
  number: 3,
  week: 4,
  title: `Receptors: how cells receive instructions`,
  openingQuestion: `"It binds to the receptor." It is the most persuasive sentence in health marketing, and it has the great advantage of frequently being true. It sounds like a mechanism, which sounds like an explanation, which sounds like evidence. So here is the awkward question: if a molecule really does bind to a receptor, what exactly have you been told?`,
  concept: `Binding is not benefit`,

  see: {
    voice: 'professor',
    line: `{name}, choose the blocker and then turn the dose right up. Put the two numbers on the right side by side and stay with them.`,
    simulation: { id: 'receptor', props: { mode: 'binding' } },
    observations: [
      { text: `The blocker occupied **95% of the receptors** — and produced **0% of the response**. It fitted better than the real thing and did nothing at all.` },
      { text: `The weak imitation fitted perfectly and gave about a third of the response, and no amount of extra dose moved it further.` },
      { text: `So "it binds to the receptor" tells you a molecule arrived. It says nothing whatever about what happened next — and that gap is where a great deal of marketing lives.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the second is the one to carry out of the room.`,
    sentences: [
      `A receptor recognises a **shape** and changes its own shape in response. That change is the message — not the molecule, which often never goes anywhere. Lesson 2 showed this and Lesson 17 explained why peptides have no choice about it.`,
      `**Binding and triggering are separate events.** A molecule can fit and set the response off, fit and do nothing while blocking everything else, or fit and produce a fraction of the effect however much you give. All three are real, all three are useful, and only the first is what people mean when they say "it works".`,
      `And even triggering is not benefit. What happens in a person depends on **dose, route, which tissue, how long, and what else is going on** — any of which can turn a perfect mechanism into nothing at all.`
    ],
    sequence: {
      label: `SIX GATES BETWEEN A MECHANISM AND A BENEFIT`,
      note: `and every one of them is a place for the chain to stop`,
      steps: [
        { name: `Does it bind?`, body: `Does the shape hold? Most molecules, to most receptors, never get this far.` },
        { name: `Does it trigger?`, body: `Having bound, does it change the receptor's shape? A blocker binds and does not — and that is a whole class of medicine.` },
        { name: `Does it reach the tissue?`, body: `Swallowed, does it survive digestion? Injected, does it get past the liver, into the right organ, across the right barrier?` },
        { name: `At a dose that matters?`, body: `Enough to do something, and not so much as to do harm. The gap between those is sometimes wide, and sometimes there is no gap at all.` },
        { name: `For long enough?`, body: `A few minutes of effect may be useless; weeks of it may be dangerous. Timing is part of whether a thing works.` },
        { name: `And does it help the person?`, body: `A number improving is not the same as a person being better off. This is the gate most claims never reach, and the only one that matters in the end.` }
      ]
    },
    comparison: {
      label: `A KEY IN A LOCK`,
      body: `The comparison everyone reaches for, and it earns its place — but only if you take it seriously. A key can fit and turn. A key can also fit and jam, and now nobody else's key works either, which is precisely what a blocker is. A key can be the right shape and the wrong size. And a key that turns the lock perfectly is still no use if you cannot get to the door, or you arrive after everyone has gone. *Where the analogy stops:* real receptors and molecules are soft and mobile, and the fit is a matter of degree rather than a yes or no. The lock-and-key picture is a simplification that gets the logic right and the physics wrong.`
    },
    naming: `A molecule that binds and triggers is an **agonist**; one that binds and blocks is an **antagonist**; one that binds and triggers partially is a **partial agonist**. How tightly a molecule binds is its **affinity**; how much response it produces once bound is its **efficacy** — and the whole lesson is that these are two independent numbers. The range between a dose that does something useful and a dose that does harm is the **therapeutic window**, and for some medicines it is comfortably wide and for others alarmingly narrow.`,
    formalNames: {
      terms: [
        { term: `Agonist`, meaning: `Binds and sets off the response. What the body's own hormone does, and what a drug imitating it aims to do.` },
        { term: `Antagonist`, meaning: `Binds and produces nothing, while keeping everything else out. Beta blockers and antihistamines work this way — the blocking *is* the treatment.` },
        { term: `Affinity and efficacy`, meaning: `How well it sticks, and how much it does once stuck. Two separate properties — a blocker has high affinity and zero efficacy.` },
        { term: `Therapeutic window`, meaning: `The gap between a dose that helps and a dose that harms. Where it is narrow, dosing has to be exact and monitored.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Blockers are everywhere in a medicine cabinet. Tap any you've met.`,
    items: [
      `Beta blockers, for blood pressure or a racing heart.`,
      `An antihistamine for hay fever.`,
      `A nicotine patch — the same receptor, a steadier supply.`,
      `Something described as an "inhibitor" on a prescription.`,
      `A medicine that worked beautifully at first and then less so.`,
      `Being told two medicines shouldn't be taken together.`
    ],
    builder: {
      body: `Open whatever medicine is in the house and read the small print on the leaflet for the words **blocker, antagonist, inhibitor, agonist** or **receptor**. You will find at least one in most cabinets, and often several. Notice what the word is doing: it is telling you that the medicine's entire action is to occupy something, or to occupy it and set it off. Then notice the dose on the box, and that it is a specific number rather than a range — because where on the curve you sit is the difference between an effect and no effect, and between an effect and a harm.`
    },
    ownPlaceholder: `Something I take, or have taken, that blocks something…`,
    synthesis: `The one that worked and then stopped is the second question below — and it is the receptor's side of the conversation, which is easy to forget when thinking only about molecules.`
  },

  feynman: {
    line: `This is the one that matters most this week.`,
    instruction: `Explain to a friend why "it binds to the receptor" is not, on its own, evidence that a product does anything — **without using the word "agonist" (which also rules out "antagonist").**`,
    banned: ['agonist'],
    bannedNote: `that word came back — and it is a label for the distinction rather than the distinction itself`,
    placeholder: `Binding and actually doing something are two different…`,
    checks: [
      `Binding and setting off a response are two separate things.`,
      `Something can bind tightly and produce no effect at all — and block the real thing while it's there.`,
      `Even a real effect in a dish has to survive getting into a person, at a dose, in the right place.`,
      `And a thing happening is not the same as a person being better off.`
    ],
    closing: `If your version separates "it arrived" from "something happened", you have the tool this whole week was building toward. Lesson 20 will hand you something to use it on.`
  },

  challenge: {
    voice: 'editor',
    line: `One that catches careful people, and one about a medicine losing its grip.`,
    prediction: {
      question: `A molecule is found that binds the receptor for a hormone you would like **more** of. Does giving that molecule produce the hormone's effect?`,
      options: [
        {
          id: 'yes',
          text: `Yes — it's at the right receptor, so it should do the hormone's job.`,
          verdict: `This is the inference the whole lesson exists to interrupt, and it is a completely natural one: the receptor is the hormone's receptor, so occupying it ought to mean the hormone's effect. But you watched the blocker occupy 95% of them and produce nothing. Binding is about shape; triggering is about whether the shape **changes** the receptor. A molecule can satisfy the first condition and fail the second entirely — and then it is not doing the hormone's job, it is preventing it.`
        },
        {
          id: 'maybe',
          text: `Not necessarily — it might trigger, might block, or might do a bit.`,
          verdict: `Correct, and the honest answer is that binding alone cannot tell you which. All three outcomes are common, all three are found in real medicines, and distinguishing them requires actually measuring the response rather than the binding. This is why drug development does not stop at "it binds" — that result is the beginning of the work, not a finding worth announcing.`
        },
        {
          id: 'depends',
          text: `It depends entirely on the dose.`,
          verdict: `Dose is genuinely one of the six gates and you are right to reach for it — a real effect at an unreachable dose is no effect. But it is not what settles this particular question. A blocker is a blocker at every dose; turning it up only blocks more thoroughly, as you saw when the response stayed at zero all the way to the top of the slider. Dose decides how much of whatever it does; it does not decide what it does.`
        }
      ]
    },
    open: {
      question: `Someone takes a medicine that works well, and after some months the same dose does noticeably less. Nothing about the medicine has changed, and they are taking it exactly as before. What might the **cell** have done?`,
      placeholder: `If it kept being over-stimulated, maybe it would…`,
      reveal: [
        `Reduced its receptors. A cell constantly shouted at will pull receptors in off its surface and make fewer new ones — so the same amount of molecule arrives and finds fewer places to act. Lesson 5 established that having the receptor is what puts a cell on the distribution list; this is a cell quietly taking itself off it.`,
        `It is not a fault. It is the same self-correcting instinct as every loop in this course: a system that is being pushed hard pushes back toward where it was. It is why some medicines are taken in cycles, why tolerance develops to many substances, and why coming off some things abruptly produces a rebound — the receptors are still reduced, and the body's own signal now lands on too few of them.`,
        `And it adds a seventh consideration to the six gates. Whether something works is not only a question about the molecule — it is a question about how the body **responds to being given it**, over time. A mechanism that holds for a week may not hold for a year, and only watching people for a year can tell you which.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about how molecules act on cells that I understand now and didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 19: metabolism — a word that gets used to mean everything and therefore means almost nothing. You carry about four hundred calories in one store and a hundred thousand in another.`
  },

  routes: [
    { id: 'analogy', body: `A doorbell. Press it and the house hears a sound — but the button did not make the sound, and the button never came inside. Now imagine chewing gum pressed into the button: it fits the recess perfectly, nothing rings, and nobody else can press it either. That is a blocker, and it is worth noticing that the gum "binds to the doorbell" is a completely true sentence that tells you nothing about whether anyone is coming to the door.` },
    { id: 'object', body: `Find two keys on your keyring and try each in a lock they do not belong to. One will refuse to go in at all. The other may slide in and simply not turn — and while it is in there, the right key cannot be used. That second key is the interesting one, and the whole of this lesson is about taking it seriously rather than calling it a failed fit.` },
    { id: 'story', body: `In the 1960s James Black reasoned that if adrenaline sped the heart by acting at a receptor, a molecule that occupied that receptor without triggering it would slow a heart under strain. The idea that a drug could work by **doing nothing** at a receptor was genuinely strange at the time. The result was the first beta blocker, one of the most widely used classes of medicine ever made, and a Nobel Prize. Blocking is not a lesser kind of action; it was a new idea about what an action could be.` },
    { id: 'experiment', body: `Next time you have a cold drink, notice that a few mouthfuls make your mouth feel cold and that the sensation fades long before the drink is finished. Nothing about the drink changed. The nerve endings reporting it have simply adjusted to a steady signal and stopped bothering. Almost every receiving system you have does this, which is why a constant signal is a poor way to tell a body anything for long.` },
    { id: 'smaller', body: `Forget receptors. One question: if you put a coin in a vending machine and nothing comes out, did the coin fit? Obviously it did — it went in. Fitting was never the question; the question was whether the machine did anything. Now ask which of those two things a sentence like "it binds to the receptor" is actually reporting, and you have the lesson.` },
    { id: 'backward', body: `Start with antihistamines. They are among the most-used medicines in the world and their entire action is to occupy a receptor and refuse to trigger it — histamine arrives and finds nowhere to act. Work backwards from a medicine whose whole value is in **not** producing an effect, and the separation between binding and triggering stops being a technicality and becomes the obvious thing it is.` }
  ],

  map: [
    { name: `Receptors and signals`, level: 5 },
    { name: `Evaluating health claims`, level: 4, fresh: true },
    { name: `Hormones and the endocrine system`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Molecules`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Nerves and signalling`, level: 5 },
    { name: `Cellular energy`, level: 5 }
  ]
}
