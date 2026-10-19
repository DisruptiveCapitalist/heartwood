// Anatomy & Physiology · Week 5 · Lesson 21 — fast and general, then slow and specific.
//
// Measured off the simulation: a first meeting takes about twelve days to clear
// and the specific response does not begin until day five; a second meeting is
// over in three with antibody around seven times higher, beginning on day one.
//
// The spec warns against presenting innate and adaptive defences as separate
// systems, so the lesson's hinge is that the fast defences are what tell the
// slow ones what to build. They are one defence with two speeds.

export default {
  id: 'lesson-21',
  number: 1,
  week: 5,
  title: `The immune system: recognizing a threat`,
  openingQuestion: `You are covered, inside and out, in bacteria — several pounds of them, mostly harmless and many useful. You breathe in mould spores all day and swallow things that would happily live in you. And yet you are ill perhaps a few times a year. What is doing the sorting, and how does it tell a friend from an intruder?`,
  concept: `Fast and general, then slow and specific`,

  see: {
    voice: 'professor',
    line: `{name}, run the first meeting out to the end. Then meet the same thing again, and look at day three in both.`,
    simulation: { id: 'immune', props: { mode: 'defence' } },
    observations: [
      { text: `A **first** meeting took about twelve days to clear — and the specific response did not even begin until **day five**.` },
      { text: `A **second** meeting was over in three days, with antibody about **seven times higher**, climbing from day one.` },
      { text: `And the fast defences were not idle in that five-day gap. They were holding the line *and* carrying samples back, so the slow ones knew what to build.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third one is the correction most accounts need.`,
    sentences: [
      `Most things never get in at all. **Skin, mucus, stomach acid, tears and the sheer crowding of the bacteria already living on you** turn away the overwhelming majority of what you meet, and none of it counts as an immune response.`,
      `What gets past meets two kinds of answer. The **innate** response is fast, general and born with you — it recognises patterns common to whole classes of intruder. The **adaptive** response is slow, exact and learned, building a tool for one specific shape.`,
      `They are not two systems. The innate response is what **tells the adaptive one what to make** — carrying fragments back and presenting them — and the adaptive one's antibodies make the innate cells far better at their job. Neither works properly alone.`
    ],
    sequence: {
      label: `WHAT HAPPENS, IN ORDER`,
      note: `and most intrusions never get past step one`,
      steps: [
        { name: `Barriers`, body: `Skin, mucus, acid, tears, and the harmless crowd already in residence. Not glamorous and enormously effective.` },
        { name: `Recognised`, body: `Cells on patrol spot patterns found on bacteria and viruses but not on you. No learning required — this recognition is inherited.` },
        { name: `Held`, body: `The fast response arrives within hours and contains things while the slow one gets ready. This is most of what you feel as being ill.` },
        { name: `Presented`, body: `Fragments of the intruder are carried to where the specific cells wait, and shown to them. This is the handover between the two halves.` },
        { name: `Built`, body: `Cells matching that exact shape multiply and produce **antibodies** — molecules that stick to that one intruder and nothing else. Five days, the first time.` },
        { name: `Remembered`, body: `A few cells stay behind for years. Next time, the five days become one, and you may never notice you met it.` }
      ]
    },
    comparison: {
      label: `A TOWN WITH WALLS AND A MILITIA`,
      body: `The wall turns away almost everyone with no decision needed. The night watch is on duty permanently, knows trouble when it sees it, and can hold a gate — but it is not a trained army and it does not get better at any particular enemy. The militia must be raised, and raising it takes days: the watch has to bring word of exactly who is attacking, weapons have to be made to suit, and by the time they arrive the fight has been going on for a week. Once raised, though, the town never has to raise it again for that enemy. *Where the analogy stops:* the watch and the militia in a real town barely speak. Yours are in constant conversation, and the handover between them is the step the whole thing depends on.`
    },
    naming: `The fast, inherited half is **innate immunity**; the slow, learned half is **adaptive**. The specific molecule built to match an intruder is an **antibody**, and the shape it matches is an **antigen** — which is simply any shape your body can recognise and respond to. The cells kept back afterwards are **memory cells**, and they are what a **vaccine** creates without you having to be ill to get them. All of this is carried out by white blood cells, of which there are many kinds doing quite different jobs.`,
    formalNames: {
      terms: [
        { term: `Innate immunity`, meaning: `Fast, general, present from birth. Recognises patterns shared by whole classes of intruder, and is what holds the line for the first several days.` },
        { term: `Adaptive immunity`, meaning: `Slow, exact, learned. Builds a tool for one specific shape — and keeps the plans afterwards.` },
        { term: `Antibody`, meaning: `A protein built to stick to one particular shape. It marks an intruder for destruction rather than destroying it itself.` },
        { term: `Memory cells`, meaning: `Cells held back after an infection, ready for that exact intruder. They are why a second meeting is so different from a first.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `Having chickenpox once, and never again.`,
      `A flu jab every single year, unlike the others.`,
      `A cut going red and tender around the edges.`,
      `A vaccination record card from childhood.`,
      `Feeling rough for a day after a jab.`,
      `Being told a cold "has to run its course".`
    ],
    builder: {
      body: `Make a list of the infectious illnesses you have had **once** — chickenpox, measles, mumps, whatever applies — and the ones you have had **many times**, which will mostly be colds and stomach upsets. The two lists are not about how serious the illness was or how well you were looked after. They are about whether the intruder stays the same shape. Anything that holds still gets remembered and never troubles you again. Anything that changes its coat has to be met fresh each time, and the five-day wait starts over.`
    },
    ownPlaceholder: `Something I've had once, or over and over…`,
    synthesis: `That split is the whole lesson in a list you can write from memory. Memory is exact, and exactness is both its strength and its only weakness.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why you get chickenpox once but colds forever — **without using the words "immune" or "antibody."**`,
    banned: ['immun', 'antibod'],
    bannedNote: `one of those slipped in — and the idea is about remembering a shape`,
    placeholder: `Your body builds something that matches one particular…`,
    checks: [
      `The body builds a specific tool matched to one particular intruder.`,
      `Building it the first time takes several days, which is why a first illness drags on.`,
      `It keeps the plans afterwards, so a second meeting is dealt with before you notice.`,
      `But the match is exact — so something that changes its shape is met as a stranger every time.`
    ],
    closing: `If you got the exactness in, you have explained both halves at once: why memory is so good, and why it only ever works on something that stays still.`
  },

  challenge: {
    voice: 'editor',
    line: `One about two very different vaccines, and one about how a vaccine can work at all.`,
    prediction: {
      question: `Measles vaccination gives protection lasting decades. Flu vaccination is offered **every year**. Both are vaccines. Why the difference?`,
      options: [
        {
          id: 'weaker',
          text: `The flu vaccine is weaker, so the protection wears off.`,
          verdict: `Waning protection is a real phenomenon with some vaccines, so this is not a foolish thought. But it is not what is happening here. Memory for a given flu strain lasts perfectly well — people who met the 1918 strain were found to still have cells recognising it ninety years later. The problem is not that your memory faded. It is that the thing you remember has changed.`
        },
        {
          id: 'changes',
          text: `Flu changes its shape from year to year; measles essentially doesn't.`,
          verdict: `Exactly, and it follows directly from how exact the match is. Influenza alters the proteins on its surface constantly, so last year's memory recognises less and less of this year's virus — and occasionally a strain appears that it does not recognise at all. Measles is remarkably stable, so a match made in childhood still fits perfectly in your seventies. The vaccine schedule is a direct read-out of how fast each virus moves.`
        },
        {
          id: 'serious',
          text: `Measles is more serious, so they make the vaccine stronger.`,
          verdict: `There is a reasonable assumption here — that effort is matched to severity — and in some ways it is true of how vaccines are prioritised and deployed. But it has the causation backwards for this question. How long protection lasts is set by the biology of the virus, not by how much anyone wants the protection to last. If flu held still, a single dose would do.`
        }
      ]
    },
    open: {
      question: `A vaccine gives you the memory without the illness. But memory is built **during** an infection, by cells that have had days to respond to something real. So how can you end up with the memory when you were never ill at all?`,
      placeholder: `Perhaps what gets remembered isn't the illness itself…`,
      reveal: [
        `Because what gets remembered is a **shape**, not an experience. The specific half of your defences never meets the illness as such — it is handed fragments and builds a match for them. It has no way of telling whether those fragments came from a live intruder multiplying in your lungs or from a preparation containing the shape and nothing else.`,
        `That is all a vaccine is: the recognisable part, presented safely, without the part that makes you ill. The five days still happen, which is why some people feel briefly rough afterwards — that is the real response happening on schedule. What does not happen is the infection the response was built for.`,
        `And it explains the one thing that confuses people most about vaccines: that protection is not immediate. The plans still have to be drawn up the slow way the first time. What you are buying is that the slow week happens *before* you meet the thing, rather than during.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about my own defences I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 22: the red, hot, swollen, painful part. All four of those turn out to be one thing happening, and it is a delivery rather than damage.`
  },

  routes: [
    { id: 'analogy', body: `A hospital with a triage nurse and a specialist. The nurse sees everyone within minutes, recognises the general shape of trouble, and starts something useful immediately — but treats a hundred different problems with much the same opening move. The specialist is exactly right and takes a week to get hold of. The clever part of the arrangement is that the nurse is who calls the specialist and tells them what to bring.` },
    { id: 'object', body: `Look at the inside of your wrist and then at your palm. The skin on the palm is thicker, and both are an unbroken sheet of dead cells, oiled and slightly acidic. Nothing alive gets through that intact — which is why a cut matters so much more than a touch. Most of your defence against the world is a layer you shed and replace without ever thinking about it.` },
    { id: 'story', body: `In 1796 Edward Jenner noticed that milkmaids who had caught cowpox did not get smallpox, and took the considerable step of putting cowpox material into a boy's arm and then exposing him to smallpox. The boy did not get ill. Jenner had no idea why it worked — nobody would for another century — and the word vaccine comes from vacca, the Latin for cow. Smallpox was declared eradicated in 1980, the only human disease ever driven out.` },
    { id: 'experiment', body: `Next time you have a small cut, look at it each day for a week. Day one it is just a cut. By day two there is redness around it and it is tender. By day four the redness is receding and there is a scab. By day seven there is new pink skin underneath. Nobody organised any of that and you could not have stopped it. You are watching the first few days of this lesson, at a scale you can see.` },
    { id: 'smaller', body: `Forget the body. One question: if you had to defend against enemies you had never seen, what two things would you build? Something that works immediately against anything roughly enemy-shaped, and something that can be made to measure once you know what you are facing. The first is fast and crude by necessity, the second is slow and exact by necessity, and you need both because neither can be the other.` },
    { id: 'backward', body: `Start with why a second bout of a stomach bug can floor you just as badly as the first, while chickenpox never returns. Both were infections, both were met, both were cleared. Work backwards from "memory clearly worked for one and not the other" and you arrive at how exact the match is, and from there at why a virus that changes is so much harder to be finished with.` }
  ],

  map: [
    { name: `Immunity and defence`, level: 4, fresh: true },
    { name: `Blood and vessels`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `Evaluating health claims`, level: 5 },
    { name: `Hormones and the endocrine system`, level: 5 },
    { name: `Levels of organization`, level: 5 }
  ]
}
