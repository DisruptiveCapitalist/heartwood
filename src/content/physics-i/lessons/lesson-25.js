// Physics I · Week 5 · Lesson 25 — reflection, lenses and colour. Closes the
// last week of new material. The package asks that "is the shirt itself red
// light?" be answered as an interaction between light, material and observer.

export default {
  id: 'lesson-25',
  number: 5,
  week: 5,
  title: `Mirrors, lenses, and color`,
  openingQuestion: `You look in a mirror and see a room stretching away behind it. There is a wall back there. Why can a flat piece of glass show you something that is not there?`,
  concept: `Reflection and colour`,

  see: {
    voice: 'professor',
    line: `Three pieces of glass, the same rays arriving. Watch what each one does with them.`,
    simulation: { id: 'ray-optics', props: { variant: 'lens' } },
    observations: [
      { text: `A mirror sends every ray back at the angle it arrived, on the other side of the line. Nothing is absorbed and nothing is invented.` },
      { text: `A curved lens gathers parallel rays to a single point. That is a camera, a magnifying glass, and the lens in your own eye.` },
      { text: `A spreading lens pushes them apart — and your eye traces them back to a point behind the glass where nothing is. Same business as yesterday's straw.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Yesterday light bent going through. Today it bounces, and we find out where colour lives.`,
    sentences: [
      `A mirror reflects every ray at the same angle it arrived, flipped about the line square to the surface. Your eye traces them back and builds a complete room behind the glass — accurate, consistent, and entirely virtual.`,
      `A lens is yesterday's bending, shaped on purpose. Curve the glass so rays at the edges are turned more than rays in the middle, and you can gather them to a point or spread them from one.`,
      `And colour is not a property of an object at all. White light contains every colour; a red shirt absorbs most of them and reflects the red. The shirt does not contain red. It contains an arrangement that disposes of everything else.`
    ],
    comparison: {
      label: `THE DOORMAN`,
      body: `A doorman turns almost everyone away and lets a few through. You stand outside, see only the people coming out, and conclude the club is full of exactly those people. The shirt is a doorman for light: sunlight arrives carrying every colour, the dye absorbs almost all of them, and the only ones that come back out are the reds. Call the shirt red if you like, but what you are naming is what it *rejects*.`
    },
    naming: `Bouncing is **reflection**, and the rule is simple enough to state in one line: the angle it leaves at equals the angle it arrived at. A smooth surface reflects an image; a rough one reflects everything in all directions, which is called **diffuse** reflection and is the only reason you can see this page. Which colours a material sends back is its **absorption spectrum**, and the colours themselves are **wavelengths** — the long ones red, the short ones blue.`,
    formalNames: {
      terms: [
        { term: `Reflection`, meaning: `Light bouncing off a surface at the same angle it struck. Mirrors do it neatly; walls do it in every direction at once, which is why a wall is visible and a mirror is not.` },
        { term: `Lens`, meaning: `Shaped glass that turns rays by different amounts depending where they pass through, so they can be gathered or spread. Yesterday's refraction, used on purpose.` },
        { term: `Focal point`, meaning: `Where a converging lens brings parallel rays together. Your eye's lens puts it on the retina, and glasses exist to move it there when it has drifted.` },
        { term: `Wavelength`, meaning: `What distinguishes one colour from another. Red is about twice the wavelength of violet, and everything your eye can see fits in that one octave.` },
        { term: `Absorption`, meaning: `Light being taken up by a material rather than passed on or sent back. Where the energy goes is Lesson 13's answer: it becomes heat, which is why a black car is hot.` }
      ],
      note: `And this closes Week 5 back onto Week 3. Light carries energy; a surface either passes it, returns it, or keeps it as warmth — and the books balance, as they have since Lesson 11.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Each of these is light being sent somewhere. Which have you noticed?`,
    items: [
      `A black car far hotter than a white one.`,
      `Clothes that look a different colour under a shop's lights.`,
      `A wing mirror saying objects are closer than they appear.`,
      `A magnifying glass setting paper alight.`,
      `My own glasses, and which way round they work.`,
      `A rainbow, or oil on a puddle.`
    ],
    builder: {
      body: `Three minutes, one mirror. Stand well back and look at your reflection, then walk toward the mirror and watch how much of yourself you can see. It does not change. Now, with a bit of soap or a finger mark, trace on the glass the outline of your head as you see it. Step back and look at the mark: it is exactly half the size of your head, at any distance you try. A mirror only ever needs to be half your height to show all of you — which follows from the one rule about equal angles, and surprises almost everyone.`
    },
    ownPlaceholder: `Somewhere a colour or a reflection behaved unexpectedly…`,
    synthesis: `The shop lighting is the one worth keeping. If a colour can change with the light, it was never only in the fabric — it was always the fabric *and* what was shining on it.`
  },

  feynman: {
    line: `Explain it to someone pointing at a red shirt.`,
    instruction: `Explain why a red shirt looks red — **without using the words "reflect" or "absorb."**`,
    banned: ['reflect', 'absorb'],
    bannedNote: `those are the two technical verbs — say what happens to each colour instead`,
    placeholder: `The light arriving at the shirt is not just one colour…`,
    checks: [
      `Ordinary white light is all the colours together.`,
      `The shirt takes up most of them and sends the red ones back.`,
      `What reaches your eye is only the part that came back.`,
      `So the colour depends on the shirt, on the light shining on it, and on the eye receiving it.`
    ],
    closing: `If your explanation predicts what a red shirt looks like under pure blue light, it is about the interaction and not about the shirt.`
  },

  challenge: {
    voice: 'editor',
    line: `The last question of the week, and it is really about where a property lives.`,
    prediction: {
      question: `Is a red shirt made of red light?`,
      options: [
        {
          id: 'no',
          text: `No — it sends back the red part of whatever light falls on it, and keeps the rest.`,
          verdict: `Correct, and here is the test that settles it: take that shirt into a room lit only by pure blue light. There is no red arriving, so there is none to send back, and the shirt looks black. It has not changed. Nothing about the dye is different. "Red" turns out to be a fact about three things at once — the shirt, the light falling on it, and the eye receiving what comes back — and it is not stored in any of them alone.`
        },
        {
          id: 'yes',
          text: `Yes — the redness is in the dye. That is what dye is.`,
          verdict: `Something true is in here and worth keeping: the dye really is where the difference between a red shirt and a blue one lives, and it is a permanent property of the fabric. What the dye holds, though, is not redness — it is a particular arrangement of molecules that happens to take up the greens and blues. Put it under blue light and you get black, which is a strange thing for a store of redness to do.`
        },
        {
          id: 'both',
          text: `It makes red light when sunlight hits it.`,
          verdict: `This is the most interesting answer because it is almost true of a few special materials. Something fluorescent — a high-visibility jacket, a laundry whitener — really does take in light of one colour and give out another, and that is why it looks oddly bright. An ordinary red shirt does not. It makes nothing. It is a filter rather than a source, and the difference shows up the moment you take away the colour it needs.`
        }
      ]
    },
    open: {
      question: `Then the last of the new material. Everything you have met this week has been a wave — sound, light, colour. So what, exactly, is waving when light crosses the empty space between the sun and your window?`,
      placeholder: `Sound needed air. This needs nothing…`,
      reveal: [
        `Electric and magnetic fields. They are present everywhere, including in a vacuum, and they are not made of anything — they are a property of space itself. A changing electric field creates a magnetic one, a changing magnetic field creates an electric one, and the pair of them can roll forward through nothing at all, each one continually generating the other.`,
        `Which means light needs no medium, and there is no "ether" for it to wave in. Maxwell worked this out in the 1860s from the equations of electricity and magnetism, calculated the speed such a wave would have to travel at, and found it came out at the already-measured speed of light. That is one of the great moments in the subject: light turned out to be a consequence of electricity, discovered on paper.`,
        `And it is where Physics I quietly runs out. Why those fields exist, what light does when you look at a single particle of it, why nothing can catch up with it — those belong to another course. What you have is enough to walk around a house and explain nearly everything in it, which is what the six weeks were for.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that is the last of the new material.`,
    prompt: `Light became more understandable when I realised…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Twenty-five lessons. Almost every concept on this map is now at "explain" or "use", and nothing new is being added after today.`,
    tomorrow: `That is Week 5, and the last of the teaching. Week 6 is different: the Professor steps back and you become the physicist. I bring the objects; you tell me what is happening.`
  },

  routes: [
    { id: 'analogy', body: `Think of a sieve over a bowl of mixed grain. What comes through is not something the sieve made — it was in the mix all along, and the sieve only decided what to keep. White light is the mixed grain and a coloured object is a sieve. Change what you pour in and what comes through changes, without the sieve altering at all.` },
    { id: 'object', body: `Find a mirror and a torch. Shine the torch at the mirror at a steep slant and watch where the spot lands on the wall — then change the angle and watch the spot move by the same amount the other way. The rule really is that simple, and once you have seen it you can predict where any reflection goes, including why you can see a person round a corner in a shop mirror and they can see you.` },
    { id: 'story', body: `A man buys a jacket under a shop's lights, pleased with the colour, and gets it outside and finds it is quite a different one. He assumes the shop was dishonest. The shop was not. Fluorescent lighting is short of some wavelengths and heavy in others, so the jacket had fewer of certain colours available to send back. The jacket's colour was never only in the jacket.` },
    { id: 'experiment', body: `Take a red object into a room lit only by a blue or green light — a Christmas bulb will do. It goes nearly black. Then bring it back into daylight and it is red again. Nothing was done to the object. You removed the colour it had been sending you, and with none arriving there was none to return. That is the whole of colour, demonstrated with one bulb.` },
    { id: 'smaller', body: `Smaller question, no mirrors. Why can you see this page? It is not lit up and not glowing. Light from a lamp or a window hits it and comes back off in all directions, some of it into your eye. So everything you have ever seen that was not itself a light was something sending light back at you. Once that is clear, "what colour is it?" becomes "which parts does it send back?" and the lesson is done.` },
    { id: 'backward', body: `Start from a very ordinary fact: a black car is much hotter inside than a white one on the same day. Black means almost nothing is coming back to your eye — so almost all of it went in. White means most of it came back out. If colour were just a label we attach to surfaces, it could not possibly change the temperature of a car. Work backward from a hot door handle and you find that colour is a statement about where the light went.` }
  ],

  map: [
    { name: `Light`, level: 5 },
    { name: `Reflection`, level: 4, fresh: true },
    { name: `Refraction`, level: 5 },
    { name: `Color`, level: 4, fresh: true },
    { name: `Wavelength`, level: 4 },
    { name: `Waves`, level: 5 },
    { name: `Frequency`, level: 5 },
    { name: `Sound`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Thermal energy`, level: 5 },
    { name: `Signal`, level: 4 },
    { name: `Motion`, level: 5 },
    { name: `Force`, level: 5 }
  ]
}
