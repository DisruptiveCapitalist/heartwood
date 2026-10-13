// Physics I · Week 5 · Lesson 21 — sound waves. Opens the last week of new
// material, and leans on Lesson 20's particles: a sound wave is pressure,
// arriving in a pattern.

export default {
  id: 'lesson-21',
  number: 1,
  week: 5,
  title: `What happens when you hear a voice`,
  openingQuestion: `Someone speaks across the room and a moment later you hear them. Something crossed the gap. But the air in this room is not blowing toward you. So what travelled?`,
  concept: `Sound waves`,

  see: {
    voice: 'professor',
    line: `Watch the orange particle, and the dashed line marking where it lives.`,
    simulation: { id: 'wave-medium', props: { variant: 'air' } },
    observations: [
      { text: `The particles bunch up and spread out. They do not stream toward the ear — each one jiggles about one spot and stays there.` },
      { text: `The *pattern* of bunching moves steadily across. That is the only thing making the journey.` },
      { text: `Take the air away and nothing crosses at all. The wave is not a thing in its own right; it is something a material is doing.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Lesson 20 left you with a room full of particles pressing on things. Now shake them.`,
    sentences: [
      `Your vocal cords push the air next to them, which crowds the air next to that, which crowds the next — and a patch of slightly-higher pressure moves off across the room while every particle stays near home.`,
      `What arrives at your ear is not air from the speaker's mouth. It is an alternation of slightly-crowded and slightly-thin air, hundreds of times a second, pressing on your eardrum.`,
      `So a wave is not a substance. It is a pattern that a material carries — which is why sound needs air, water or a wall to travel through, and why it has nothing at all to travel through in space.`
    ],
    comparison: {
      label: `THE STADIUM WAVE`,
      body: `A wave goes round a football ground and everybody can see it travelling. Nobody runs anywhere. Each person stands up and sits down in their own seat, a moment after their neighbour, and the *shape* laps the stadium at speed. Ask which spectator travelled round the ground and the question falls apart. Sound is a stadium wave made of air, and the only reason it seems more mysterious is that you cannot see the spectators.`
    },
    naming: `A travelling disturbance in a material is a **wave**, and the material is its **medium**. Sound is a **longitudinal** wave — the particles shuffle back and forth along the same line the wave travels, which is why it moves as crowding rather than as a ripple. The crowded patches are **compressions** and the thin ones **rarefactions**.`,
    formalNames: {
      terms: [
        { term: `Wave`, meaning: `A pattern of disturbance that travels through a material while the material itself stays put.` },
        { term: `Medium`, meaning: `The stuff doing the carrying. Air, water, steel, the ground. No medium, no sound.` },
        { term: `Longitudinal`, meaning: `Particles moving back and forth along the direction of travel, as sound does. Its opposite is *transverse* — side to side, like a rope being shaken, or like light.` },
        { term: `Compression and rarefaction`, meaning: `The crowded and the thinned-out patches. What your eardrum feels is the pressure going up and down as they arrive.` },
        { term: `Speed of sound`, meaning: `About 1,100 feet a second in air — a mile in roughly five seconds, which is the old rule for counting after lightning. Four times faster in water, fifteen times in steel.` }
      ],
      note: `And this is Lesson 20's pressure, arriving in a pattern rather than steadily. A loud sound is a pressure change of a fraction of a per cent on top of the fourteen-and-a-half pounds already there.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Each of these is a material carrying a pattern. Which have you noticed?`,
    items: [
      `Feeling bass through the floor rather than hearing it.`,
      `Hearing a train through the rail before you hear it in the air.`,
      `Thunder arriving long after the lightning.`,
      `Sound carrying strangely well across water.`,
      `A neighbour's television through a wall.`,
      `My own voice sounding wrong on a recording.`
    ],
    builder: {
      body: `One minute, one table. Put your ear flat on the table top and have someone scratch the far end very lightly with a fingernail — so lightly you cannot hear it through the air at all. Through the wood it is perfectly clear. The sound did not get louder; you simply gave it a better medium. Wood carries it roughly fifteen times faster than air and loses much less of it on the way.`
    },
    ownPlaceholder: `Somewhere sound travelled through something other than air…`,
    synthesis: `Notice the thunder one. The flash and the bang leave together; the gap you count is entirely the air taking its time, at about five seconds to the mile.`
  },

  feynman: {
    line: `Explain it to someone who thinks air blows from your mouth to their ear.`,
    instruction: `Explain what travels from a speaker's mouth to your ear — **without using the words "wave" or "vibration."**`,
    banned: ['wave', 'vibrat'],
    bannedNote: `those are the names for it — say what the air is actually doing`,
    placeholder: `The air between you is already there, and what the voice does to it is…`,
    checks: [
      `The air between the two people is already there and stays there.`,
      `Each bit of air shoves the bit next to it, and springs back.`,
      `A pattern of crowded and thin air moves across the room; the air does not.`,
      `That changing pressure is what pushes on the eardrum.`
    ],
    closing: `If your explanation makes clear why none of this would work on the Moon, it is about the medium and not about the mouth.`
  },

  challenge: {
    voice: 'editor',
    line: `One question, and it is the one the simulation was built to settle.`,
    prediction: {
      question: `Does any of the air that was in the speaker's lungs actually reach your ear?`,
      options: [
        {
          id: 'yes',
          text: `Yes — that is what carries the sound to me.`,
          verdict: `It is the natural picture, and a little air genuinely does move toward you when someone speaks close by — you can feel breath on your hand. But that breath travels at walking pace and dies out within a foot or two, while the sound crosses the room in a thousandth of a second. The two are not the same event. If the sound had to wait for the breath you would hear a sentence about a minute after it was spoken, from across a room.`
        },
        {
          id: 'no',
          text: `No — the air stays put, and only the pattern of pressure travels.`,
          verdict: `Correct, and it is worth having the numbers. The particles do move — a fraction of a thousandth of an inch, back and forth, hundreds of times a second — but they go nowhere on average. What crosses the room is the pattern, at about 1,100 feet a second, through air that is exactly where it was before anybody spoke.`
        },
        {
          id: 'some',
          text: `Some of it does, and it gets passed along like a relay.`,
          verdict: `"Passed along like a relay" is very close to right and I would not want to discourage it — the shove really is handed from one bit of air to the next. The part to let go of is that anything is being *carried*. In a relay a baton moves the whole distance. Here each particle hands on a push and returns to where it started, so nothing makes the journey except the push itself. Keep the relay, drop the baton.`
        }
      ]
    },
    open: {
      question: `Then the one that ties the week to the one before it. Why can't sound travel through empty space — and what *is* actually travelling when sunlight reaches you across ninety-three million miles of nothing?`,
      placeholder: `Sound needs something. Light apparently does not…`,
      reveal: [
        `Sound cannot cross a vacuum because there is nothing there to be crowded. A wave is something a material does, and with no material there is nothing to do it. Film explosions in space are silent, and for once the physics is simple and the films are wrong.`,
        `Light is a different kind of wave, and this is the strangest fact in the week: it is a disturbance in the electric and magnetic fields themselves, which are present whether or not any matter is. Nothing needs to be shaken. That is why light crosses the emptiness between stars and sound cannot cross a room with the air pumped out.`,
        `Physicists spent most of the nineteenth century refusing to believe this and inventing a material for light to wave in — the "luminiferous ether" — which more and more careful experiments kept failing to find. The idea that a wave might not need anything to wave in was so uncomfortable that it took Einstein to settle it. You are allowed to find it uncomfortable too.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Last week of new material.`,
    prompt: `When I hear a sound, what actually reaches me is…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Waves and sound arrived today, standing on the pressure you built in Week 4.`,
    tomorrow: `Tomorrow, Lesson 22: six strings on one guitar, all the same length. So what decides the note?`
  },

  routes: [
    { id: 'analogy', body: `Think of a long line of people standing shoulder to shoulder, and you shove the one at the end. They lurch into the next, who lurches into the next, and a stagger runs down the line while everybody ends up back where they were standing. Now shove rhythmically, over and over. A pattern of staggers runs down the line continuously, and nobody has gone anywhere. That is a sound wave with people instead of air.` },
    { id: 'object', body: `Hold a slinky or a long spring and give one end a sharp shove along its length — not sideways, but a push toward the far end. You will see a bunched-up patch of coils travel the length of it and the coils themselves stay where they are. That bunched patch is a compression. Do it rhythmically and you have made sound, slowed down until you can watch it.` },
    { id: 'story', body: `A man puts his ear to the rail and hears the train long before anyone standing up can. He has not improved his hearing; he has changed which material he is listening through. Steel passes the pattern along about fifteen times faster than air and loses far less of it, so the rail delivers news the air has not finished carrying.` },
    { id: 'experiment', body: `Put your ear flat on a table and have someone scratch the far end so faintly you cannot hear it through the air. Through the wood it is loud and clear. You have proved two things in ten seconds: that sound needs a material, and that it does not much care which one — some are simply better at it than air.` },
    { id: 'smaller', body: `Smaller question. When you drop a stone in a pond, ripples spread out. Does the water travel outward with them? No — put a leaf on the surface and it bobs up and down in one place while the ripples go past. So the ripple is a shape, not a substance. Now say the same sentence about air, and you have sound.` },
    { id: 'backward', body: `Start from the ringing of a bell in a jar. Pump the air out, and the clapper is still visibly hitting the bell — you can see it happening — and you hear nothing. Nothing about the bell changed. The only thing you removed was the air. Work backward from an experiment anyone can watch and the conclusion is forced: sound is something the air does, not something the bell sends.` }
  ],

  map: [
    { name: `Waves`, level: 4, fresh: true },
    { name: `Sound`, level: 4, fresh: true },
    { name: `Pressure`, level: 5 },
    { name: `Molecular motion`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Density`, level: 5 },
    { name: `Buoyancy`, level: 5 },
    { name: `Temperature`, level: 5 },
    { name: `Thermal energy`, level: 5 },
    { name: `Atmosphere`, level: 4 },
    { name: `Frequency`, level: 1, fresh: true }
  ]
}
