// Physics I · Week 2 · Lesson 6 — force, and the push you have been standing on
// your whole life. Opens the week; stands on Lesson 1 (net force) and Lesson 4
// (the lift readings are F = ma, read backwards).

export default {
  id: 'lesson-06',
  number: 1,
  week: 2,
  title: `Push, pull, and the forces you never see`,
  openingQuestion: `You are sitting in a chair. Nothing about you is moving. Are there any forces acting on you?`,
  concept: `Force`,

  see: {
    voice: 'professor',
    line: `Stand on a scale, and then put the scale in a lift. Watch which arrow changes.`,
    simulation: { id: 'elevator-scale' },
    observations: [
      { text: `Standing still, the two arrows are exactly equal. That is not the same as there being no arrows — and from the outside the two look identical.` },
      { text: `Gravity's arrow never changes length. Not once. The only thing that ever moves is the floor's.` },
      { text: `Cut the cable and the floor stops pushing altogether. The scale reads zero. You have not lost any weight — you have lost the floor.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `The answer to the opening question is yes, and there are more of them than you would guess.`,
    sentences: [
      `A force is not a thing an object has. It is an *interaction* — one thing acting on another. Nothing "contains" force, the way nothing contains a conversation.`,
      `Most of them are invisible, and the most important one in the room is the floor. It is pushing up on you right now, with your entire weight, and it has been doing it all day.`,
      `When two forces are equal and opposite, the motion does not change — and unchanged motion looks exactly like no forces at all. That is why you have gone seventy years without noticing the floor.`
    ],
    comparison: {
      label: `THE TABLE AND THE MATTRESS`,
      body: `Press your hand down into a mattress. You can see it push back — the dent, the resistance, the way it returns when you lift off. Nobody is puzzled by a mattress pushing. Now press your hand down on the table. It also pushes back; you can feel it in your palm. The only difference is that the table's dent is far too small to see. A table is a mattress with extremely high standards.`
    },
    naming: `The push from a surface has a name: the **support force**, or in physics books the *normal force* — where "normal" means "at right angles", not "the usual one". And notice what Lesson 1 already told you: it is the **net** force, everything added together, that decides whether motion changes. Two forces cancelling is a busy, active kind of nothing.`,
    formalNames: {
      terms: [
        { term: `Force`, meaning: `An interaction that can change motion. Measured in pounds, or in newtons if you prefer the metric side of the aisle.` },
        { term: `Support force`, meaning: `The push a surface gives, at right angles to itself. It adjusts to whatever is needed — which is the strangest and most useful thing about it.` },
        { term: `Weight`, meaning: `Gravity's pull on you, in pounds. Not the same as mass, as Lesson 4 insisted: mass is how much of you there is, weight is how hard the planet pulls on it.` },
        { term: `Net force`, meaning: `Everything added together, directions included. Zero net force means nothing changes — not that nothing is happening.` }
      ],
      note: `The lift readings are Lesson 4 read backwards. You knew *F = ma*; in the lift you can see the *a*, so the scale is showing you the *F*.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Every one of these is a force you stopped noticing. Which are in the room with you now?`,
    items: [
      `The chair pushing up on me while I sit here.`,
      `A magnet holding a note on the fridge door.`,
      `A light fitting hanging from the ceiling.`,
      `Tires gripping the road on a bend.`,
      `The wind pushing against me on a walk.`,
      `A parachute, or an umbrella turning inside out.`
    ],
    builder: {
      body: `Two minutes and a bathroom scale. Stand on it and let it settle — that number is gravity's pull on you, and the scale's push back. Now, without stepping off, bend your knees quickly and watch the needle. It dips. Then stand up quickly and watch it jump above your weight. You did not change how much of you there is. You changed how hard the floor had to push, and for one second you could read it.`
    },
    ownPlaceholder: `A push or pull you had never counted as one…`,
    synthesis: `Notice that half of those never touch anything — the magnet, gravity, the wind. A force does not need a hand on it. It only needs two things interacting.`
  },

  feynman: {
    line: `This is the question the lesson opened with. Now answer it properly.`,
    instruction: `Explain how something can have forces acting on it and still not move — **without using the words "balanced" or "cancel."** Describe what each thing is actually doing.`,
    banned: ['balanc', 'cancel'],
    bannedNote: `that word is the summary, not the explanation — say what each one is doing`,
    placeholder: `Gravity is doing one thing. The chair is doing another…`,
    checks: [
      `Gravity is pulling down on you the whole time, and never stops.`,
      `The chair is pushing up on you by exactly as much, at the same moment.`,
      `Two pushes of the same size in opposite directions leave the motion exactly as it was.`,
      `Not moving is a result, not a sign that nothing is going on.`
    ],
    closing: `If your version explains why the scale reading changes in a lift, it is doing real work — because that is the same two forces, with one of them changed.`
  },

  challenge: {
    voice: 'editor',
    line: `I am going to ask you something that sounds childish, and then not accept a childish answer.`,
    prediction: {
      question: `The floor pushes up on you with exactly your weight — no more, no less. How does a floor know how hard to push?`,
      options: [
        {
          id: 'max',
          text: `It doesn't. It just pushes as hard as it can, which is more than enough.`,
          verdict: `A fair guess, and it is testing a real idea: floors are strong and you are not very heavy. But follow it through. If the floor were pushing as hard as it could, you would not be sitting down — you would be on the ceiling. It pushes exactly enough to stop you sinking and not one pound more, and a heavier person on the same floor gets a harder push. Something about it is responsive rather than fixed.`
        },
        {
          id: 'squash',
          text: `It is being squashed very slightly, and squashed things push back — the more you squash them, the harder.`,
          verdict: `That is the mechanism, and it is the reason the support force is able to be exactly right without anyone arranging it. You sink into the floor a little; the material resists being compressed; you sink until its resistance equals your weight, and there you stop. A heavier person sinks a hair further and gets a harder push. Nothing decided anything. The floor is simply a very stiff spring, and you have been standing on springs your whole life.`
        },
        {
          id: 'law',
          text: `It's a law of physics that the forces balance out, so it just does.`,
          verdict: `I want to push back on this one, gently, because it is the kind of answer that feels finished and isn't. You are right that the balance is real and utterly reliable. But "it's a law" describes what happens; it does not say how. Laws of physics are summaries of behaviour, not instructions the floor receives. If you can also say *what the floor is doing* to produce the balance, you have something you can use on a mattress, a trampoline and a bridge. If you can only name the law, you have a sentence.`
        }
      ]
    },
    open: {
      question: `Then take it one step further. You are standing still, and then you jump. For a moment the floor must have pushed *harder* than your weight — otherwise you would still be standing there. The floor is not alive and did not decide to help. Where did the extra push come from?`,
      placeholder: `Something had to change first. What did you do…?`,
      reveal: [
        `You pushed down harder. Your legs drove your feet into the floor with more than your weight, the floor compressed further than it had, and — being a very stiff spring — it pushed back harder in proportion. The extra push upward was *caused by* your extra push downward. You got yourself off the ground by shoving the planet.`,
        `This is the honest version of "the floor pushes back": it is not a rule the floor obeys, it is what squashed material does. And it is why the lift simulation works. In a lift starting upward, the floor is driven into your feet; it squashes more; it pushes harder; the scale reports the difference. Gravity never moved.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Week 2 has begun.`,
    prompt: `One force I had not noticed before was…`,
    placeholder: `It had been there the whole time…`,
    mapFooter: `Force has reached "use" — you can now predict what a scale will read before you look at it. Support force arrived today.`,
    tomorrow: `Tomorrow, Lesson 7: why a heavy box refuses to move at all, and then suddenly moves too easily. We go back to Lesson 3's friction and find it has two settings.`
  },

  routes: [
    { id: 'analogy', body: `Think of two people arm-wrestling, dead level, neither hand moving an inch. Nothing is happening — and both of them are shaking with effort. You would never look at that and say there were no forces involved. A book on a table is the same photograph with the shaking removed: gravity pulling down, the table pushing up, deadlocked. Stillness is what a tie looks like.` },
    { id: 'object', body: `Put a book on your open palm and hold it there. Feel your hand working. Now imagine the book on the table instead — nothing about the book has changed; it still needs holding up by exactly the same amount. Your hand was doing what the table does. The only reason the table seems different is that it never gets tired and never complains.` },
    { id: 'story', body: `A man goes up in a fast lift carrying a briefcase and feels it get heavier as the lift starts. He mentions it to an engineer, who tells him the case did not get heavier. What happened is that his hand had to push up harder for a few seconds in order to bring the case up to speed along with him. The weight was constant all along. His hand's share of the work was not.` },
    { id: 'experiment', body: `Stand on a bathroom scale and hold still until the number settles. Now bend your knees sharply and watch it dip below your weight, then stand up sharply and watch it jump above. You have just measured the floor's push changing in real time, in your bathroom, with no equipment. Gravity did not participate in any of that.` },
    { id: 'smaller', body: `Smaller question. Forget the chair. Push your two hands together, palm to palm, as hard as you can. Do your hands move? No. Are you doing anything? Obviously. Now: what would happen if your left hand suddenly pushed harder than your right? That is the whole idea, and you have just done it with your own arms.` },
    { id: 'backward', body: `Start from a fact: on a bathroom scale in a lift, the number changes. It goes up as the lift starts rising and down as it starts dropping. You have not gained or lost any of yourself in those four seconds. So the number cannot be measuring how much of you there is. It must be measuring something between you and the floor — and once you accept that, you have discovered the support force by being unable to explain the reading any other way.` }
  ],

  map: [
    { name: `Motion`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Force`, level: 5 },
    { name: `Support force`, level: 4, fresh: true },
    { name: `Momentum`, level: 4 },
    { name: `Mass`, level: 4 },
    { name: `Friction`, level: 4 },
    { name: `Balance & correction`, level: 4 },
    { name: `Gravity`, level: 4 },
    { name: `Velocity`, level: 3 },
    { name: `Acceleration`, level: 3 },
    { name: `Center of mass`, level: 3 },
    { name: `Mass vs weight`, level: 3 },
    { name: `Energy`, level: 2 }
  ]
}
