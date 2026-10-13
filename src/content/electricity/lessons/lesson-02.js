// Electricity & Energy · Week 1 · Lesson 2 — break it anywhere, it stops everywhere.
//
// Lesson 1 established that the wire is already full and the battery only
// pushes. This lesson spends that: if the push only works on a complete chain,
// then a gap anywhere is a gap everywhere, and a switch is nothing more
// sophisticated than a gap you can make on purpose.
//
// The same circuit as Lesson 1, in `break` mode: eight places the learner can
// cut it, including the far side of the lamp — which is exactly the case
// Lesson 1's prediction question turned on, now put in their hands.

export default {
  id: 'lesson-02',
  number: 2,
  week: 1,
  title: `Why a switch has to complete a circle`,
  openingQuestion: `The switch on your wall is nowhere near the bulb. It isn't between you and the light, it isn't holding anything back — and yet it decides. So what is a switch actually doing? And while we're here: how does a bird sit on a bare power line all day and feel nothing?`,
  concept: `Break it anywhere, it stops everywhere`,

  see: {
    voice: 'professor',
    line: `{name}, the loop is already running. Cut it wherever you like — and try the far side of the lamp first, because that's the one that surprises people.`,
    simulation: { id: 'circuit-loop', props: { mode: 'break' } },
    observations: [
      { text: `It didn't matter **where** you cut. The far side of the lamp killed the light exactly as fast as the near side.` },
      { text: `One gap, in one place — and all forty-four charges stopped. Including the ones sitting inside the lamp, on the other side of the break.` },
      { text: `So a switch isn't a gate that holds charge back. It is a gap you can open and close on purpose, and it works from anywhere in the loop.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and they're really one idea looked at from three sides.`,
    sentences: [
      `Charge can't pile up anywhere in a wire and it can't leak out the end. So either all of it moves together, or none of it moves at all — there is no middle option.`,
      `That is why the path has to come back to where it started. The battery is not sending charge somewhere; it is **turning** a full ring of it. A ring with a gap doesn't turn, however hard you push.`,
      `A switch, then, is the simplest invention in the house: a gap you can make and unmake with your finger. Everything else about it — the plate, the click, the position on the wall — is convenience.`
    ],
    comparison: {
      label: `THE CHAIRLIFT`,
      body: `A ski lift is one long cable spliced into a loop, running up the mountain and back down. The motor is at the bottom. Now put a single cut in that cable — anywhere, top station, halfway, doesn't matter — and every chair on the mountain stops at the same instant, the ones at the summit included. Nobody would say the chairs at the top stopped because the cut was *near* them. They stopped because a loop with a gap is not a loop.`
    },
    naming: `Physics has words for both states, and you have just seen them both. An unbroken ring is a **closed circuit**; one with a gap is an **open circuit**. "Open" is the confusing one, because in plain English open means things can get through — here it means the opposite, and you can see why: the ring itself is open, so nothing goes round. A switch flips you between the two. And the bird on the wire needs one more word, which is the one Lesson 3 is about: **potential difference**. The push isn't a property of a wire; it exists *between two points*. Both of the bird's feet are on the same wire, a couple of inches apart, so between them there is almost no difference at all — and almost no difference means almost no push.`,
    formalNames: {
      terms: [
        { term: `Closed circuit`, meaning: `The ring is unbroken, so charge goes round and the lamp is lit. "Closed" means closed like a closed ring, not closed like a closed door.` },
        { term: `Open circuit`, meaning: `There is a gap somewhere. Nothing moves anywhere. A switch, a blown fuse, a dead filament, a plug half out of the wall — all the same thing wearing different clothes.` },
        { term: `Short circuit`, meaning: `A second path that skips the lamp and goes straight back to the battery. The push takes the easy road, the flow shoots up, and something gets hot enough to matter. This is what a fuse exists to interrupt.` },
        { term: `Potential difference`, meaning: `Push measured *between two points*. A single wire, however fierce, offers nothing by itself — you have to be touching two places that differ.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Open circuits are most of what goes wrong with anything electrical. Tap the ones you've met.`,
    items: [
      `A lamp that only works if you wiggle the plug a certain way.`,
      `One dead bulb, and the whole string of lights goes dark.`,
      `A flashlight that came back to life after I scraped the battery ends.`,
      `The hair dryer that cuts out when the cord bends near the handle.`,
      `The fridge light coming on the moment the door opens.`,
      `A car that wouldn't start until someone jiggled the battery clamp.`
    ],
    builder: {
      body: `Take a battery out of a TV remote. Lay one piece of sticky tape across the flat end of it — just one, thinner than a sheet of paper — and put it back in the right way round. Press every button. Nothing. The tape isn't blocking much of anything; it is simply not metal, so the ring is broken, and a broken ring is a broken ring whether the gap is a mile wide or a tenth of a millimetre. Now peel the tape off. You've just built a switch and then thrown it away.`
    },
    ownPlaceholder: `Something that stopped working because a ring came apart…`,
    synthesis: `Every one of those is the same fault: a ring with a gap in it. Which is why "wiggle it and see" is such good advice — you're hunting for the one place that isn't touching.`
  },

  feynman: {
    line: `Teach it back to me.`,
    instruction: `Explain why a switch across the room can turn off a lamp — **without using the words "circuit" or "loop."**`,
    banned: ['circuit', 'loop'],
    bannedNote: `one of the two words slipped in — and the idea is clearer without either`,
    placeholder: `The charges can only move if…`,
    checks: [
      `The charges can only move if they all move together.`,
      `They can only all move if the path comes back to where it started.`,
      `A gap anywhere stops everything — not just a gap near the lamp.`,
      `A switch is just a gap you can make and unmake whenever you like.`
    ],
    closing: `If all four of those are in your version in ordinary words, you have the lesson. The two forbidden words were only ever shorthand for what you just said.`
  },

  challenge: {
    voice: 'editor',
    line: `Two questions. The first one you can reason out; the second one is genuinely hard, and worth sitting with.`,
    prediction: {
      question: `A crow lands with both feet on a bare power line carrying 25,000 volts. It sits there, preens, and flies off unharmed. Why?`,
      options: [
        {
          id: 'insulated',
          text: `Its feet are insulated — scales and feathers don't conduct.`,
          verdict: `This is the answer almost everyone gives first, and it's a sensible instinct: insulation is genuinely how we protect ourselves, so looking for insulation is the right *kind* of thinking. But it isn't what saves the crow. Bird feet are ordinary flesh and blood and conduct perfectly well; a crow standing with one foot on the wire and one on a grounded pole would be killed instantly, scales and all. The protection isn't in the bird. It's in where the bird is touching.`
        },
        {
          id: 'nodiff',
          text: `Both feet are on the same wire, so there's hardly any push between them.`,
          verdict: `That's it exactly. Twenty-five thousand volts is a difference between that wire and the ground — not a quality the wire possesses on its own. The crow's two feet are three inches apart on the *same* wire, and across those three inches the difference is a tiny fraction of a volt. No difference, no push; no push, no flow; no flow, no harm. The crow is not insulated from the danger. It is simply never touching two places that disagree.`
        },
        {
          id: 'small',
          text: `It's too small for that much current to hurt it.`,
          verdict: `Worth taking seriously, because size really does matter in some electrical injuries — and your instinct that the *amount* of flow is what harms you is correct, and better physics than most people's. But it points the wrong way here: a smaller body offers less to flow through, so the same push drives a *more* concentrated current through it, not less. Squirrels and crows are routinely killed on power lines when they bridge two conductors. Size isn't the shield.`
        }
      ]
    },
    open: {
      question: `Now the hard one, and it's a real rule, not a riddle. Electricians who work on live equipment are trained to keep one hand in their pocket. Why on earth would that help?`,
      placeholder: `If one hand is away, then there's no…`,
      reveal: [
        `Because a person is only in danger when they are part of a ring. One hand on a live terminal is a single point of contact — the same position as the crow, and not by itself dangerous. Reach in with the second hand and touch anything grounded, and you have just closed the loop: in one arm, across the chest, out the other. That path runs straight through the heart, which is the one organ that can be stopped by a very small current.`,
        `So the hand in the pocket is not superstition and it is not about being careful. It is a refusal to be the second contact point. The electrician has understood exactly what you worked out in the simulation — that the dangerous thing was never the wire, it was completing the circle — and has decided to stay an open circuit on purpose.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 3: voltage. You've met it twice now as "the push" — tomorrow you find out what it's a difference *between*, and why stacking batteries end to end does what it does.`
  },

  routes: [
    { id: 'analogy', body: `Think of a revolving door — the big round kind with four panels. You push one panel and all four turn, together, instantly. Now jam a doorstop under any one of them. Push as hard as you like: nothing turns, not the panel you're pushing, not the one on the far side. You haven't blocked *your* panel. You've stopped the whole thing from being able to go round. A switch is a doorstop you can kick in and out with your foot.` },
    { id: 'object', body: `Tie a shoelace into a closed loop and hang it over two fingers held apart. Now pull the lace round with your thumb — the whole loop slides, both sides at once, and you can feel that it has to. Snip it anywhere with scissors and try again: your thumb moves lace, and the far side does nothing, because there's nowhere for it to come from. That is the difference between a closed and an open circuit, in your hands.` },
    { id: 'story', body: `A line of people passing buckets from a well to a fire, and the empties handed back along the same line — a ring of people. Now one of them steps out to tie a shoe. Within seconds everybody is standing still holding a bucket, including the people at the fire who still have full ones. They didn't stop because they ran out of water. They stopped because the ring stopped being a ring, and no amount of enthusiasm at the well end changes that.` },
    { id: 'experiment', body: `Find a flashlight that unscrews at the back. Switch it on, then turn the cap slowly anticlockwise. At some point — and it's a surprisingly small turn — the light goes out. Go back a hair: on. Forward a hair: off. You are not adding or removing anything. You are moving one piece of metal a fraction of a millimetre away from another, and that fraction is the whole difference between a ring and a not-ring.` },
    { id: 'smaller', body: `Forget the switch and the lamp. Just answer this: if a wire simply *ended* — stopped in mid-air — where would the charge at the end of it go? Nowhere. It can't pour out into the room and it can't stack up. And if the charge at the end can't move, the charge behind it can't either, and so on all the way back to the battery. That's the entire lesson. A ring is the only shape where nothing has to go nowhere.` },
    { id: 'backward', body: `Start at your fuse box. Its whole job is to break the ring on purpose when too much starts flowing — and notice that a tripped breaker in the basement darkens a lamp two floors up, instantly. Nobody finds that mysterious. Work backwards from that and you've got it: if a gap in the basement can stop a lamp upstairs, then position in the ring was never the point. Being part of an unbroken ring was.` }
  ],

  map: [
    { name: `A circuit is a loop`, level: 5 },
    { name: `Open and closed circuits`, level: 4, fresh: true },
    { name: `Charge`, level: 3 },
    { name: `Energy (from Physics I)`, level: 3 },
    { name: `Voltage — the push`, level: 2 },
    { name: `Potential difference`, level: 1, fresh: true },
    { name: `Current — the flow`, level: 2 },
    { name: `Resistance`, level: 1 },
    { name: `Power`, level: 0 },
    { name: `Magnetism`, level: 0 },
    { name: `AC and DC`, level: 0 },
    { name: `Solar cells`, level: 0 }
  ]
}
