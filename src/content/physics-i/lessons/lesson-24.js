// Physics I · Week 5 · Lesson 24 — refraction.
// The package asks specifically that the learner be told light bends when it
// enters at an angle, and that straight-on travel continues undeviated — so the
// simulation lets the angle go to zero and the challenge turns on it.

export default {
  id: 'lesson-24',
  number: 4,
  week: 5,
  title: `Why a straw looks bent in water`,
  openingQuestion: `The straw is straight. You can lift it out and check. Put it back in the glass and your eyes insist, flatly and without embarrassment, that it is bent. Which one of them is wrong?`,
  concept: `Refraction`,

  see: {
    voice: 'professor',
    line: `Move around the glass and watch the gap between where it is and where you see it.`,
    simulation: { id: 'ray-optics', props: { variant: 'straw' } },
    observations: [
      { text: `The light changes direction at the surface. Nothing else in the picture moves — not the object, not the water, not the glass.` },
      { text: `Your eye traces the light straight back, because it has no way of knowing anything happened on the way. So the object appears somewhere it is not.` },
      { text: `Set the angle to zero — looking straight down — and the bend disappears entirely. Crossing the boundary is not what bends light. Crossing it *at a slant* is.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Both your eyes and the straw are telling the truth. The light is the liar.`,
    sentences: [
      `Light travels more slowly through water and glass than through air — about a third slower in water. Not because anything is blocking it, but because of how it interacts with the material on the way.`,
      `When a beam arrives at a slant, one edge of it reaches the slower material before the other edge does. That edge is held back while the other is still going full speed, and the whole beam swings round — the way a trolley veers when one wheel drops onto grass.`,
      `Your eye assumes light travels in straight lines, because for everything it evolved to deal with, it does. So it traces the ray back along the direction it finally arrived from, and places the object there.`
    ],
    comparison: {
      label: `THE MARCHING BAND ON WET GRASS`,
      body: `A band marches in rows across a car park toward a patch of soft grass, approaching it at an angle. The marchers who reach the grass first are slowed while the rest are still on tarmac — so each row pivots, and the whole band ends up marching in a new direction. Nobody decided to turn and nobody is confused. The turn is a consequence of one end being slowed before the other, and it is exactly, mechanically, what light does at the surface of your glass.`
    },
    naming: `Light changing direction on entering a new material is **refraction**. How much a material slows light down is its **refractive index** — about 1.33 for water, 1.5 for glass, 1.0 for air. And when the light reaching your eye has been bent on the way, what you see is a **virtual image**: a perfectly real experience of an object in a place where there is nothing at all.`,
    formalNames: {
      terms: [
        { term: `Refraction`, meaning: `Light changing direction when it passes into a material where its speed is different. Only ever happens at a boundary, and only when it arrives at an angle.` },
        { term: `Refractive index`, meaning: `How much slower light goes in a material. Water 1.33, glass about 1.5, diamond 2.4 — which is why a diamond does such dramatic things with light.` },
        { term: `Virtual image`, meaning: `Where your eye places something, based on the direction the light finally arrived from. Not a hallucination and not a trick; it is the honest output of a system that assumes straight lines.` },
        { term: `Total internal reflection`, meaning: `At a shallow enough angle, light trying to leave water cannot get out at all and is reflected back down. It is how fibre optics carry a telephone call under an ocean, and you can see it by looking up from underwater.` }
      ],
      note: `This is the first thing in the course that light does and sound does not. Both are waves; only one of them needs no medium — and this bending is a consequence of the speed changing, which is a wave property both of them share.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Every one of these is light arriving from somewhere other than it seems. Which have you seen?`,
    items: [
      `A spoon looking broken in a glass of water.`,
      `A swimming pool looking shallower than it is.`,
      `My glasses, which only work one way round.`,
      `A magnifying glass over newsprint.`,
      `A rainbow after rain.`,
      `The shimmer above a hot road in summer.`
    ],
    builder: {
      body: `Two minutes, one coin, one bowl. Put a coin in the bottom of an opaque bowl and back away until the rim just hides it. Hold still. Now have someone slowly pour water into the bowl without moving it. The coin rises into view. Nothing moved — not the coin, not you, not the bowl. The water bent the light coming off the coin so that it now clears the rim and reaches your eye, and your eye reports the coin as being higher up than it is.`
    },
    ownPlaceholder: `Somewhere something looked like it was in the wrong place…`,
    synthesis: `The hot road is the odd one out and the best of them: there is no boundary at all, just air that gets steadily thinner near the hot surface — so the light bends gradually instead of at a line, and you see sky where you expected tarmac.`
  },

  feynman: {
    line: `Explain it to someone holding a spoon in a glass.`,
    instruction: `Explain why an object under water appears somewhere it isn't — **without using the words "refraction" or "bend."**`,
    banned: ['refract', 'bend'],
    bannedNote: `those are the name and the summary — say what happens to the light and what your eye then does`,
    placeholder: `Light travels at different speeds in different things, and…`,
    checks: [
      `Light travels more slowly in water than in air.`,
      `Arriving at a slant, one side of the beam is slowed first, so its direction changes at the surface.`,
      `Your eye assumes light came in a straight line all the way.`,
      `So it traces the ray back and places the object along that line, which is not where it is.`
    ],
    closing: `If your explanation makes clear why looking straight down produces no effect at all, it is about the angle and not about the water.`
  },

  challenge: {
    voice: 'editor',
    line: `A question that sounds like a technicality and is not.`,
    prediction: {
      question: `Does light always change direction when it crosses from air into water?`,
      options: [
        {
          id: 'always',
          text: `Yes — that is what happens at a boundary between two materials.`,
          verdict: `It is what the lesson looks like it says, so this is a fair reading. But try it in the simulation: set the angle to zero, looking straight down, and the ray goes through dead straight. The light does slow down — that part is unconditional — but slowing down is not the same as turning. The turn needs one side of the beam to be slowed before the other, and arriving square-on means both sides arrive together.`
        },
        {
          id: 'angle',
          text: `Only when it arrives at an angle. Straight-on, it slows but carries straight.`,
          verdict: `Correct, and it is the detail that separates understanding this from reciting it. The speed change is what *allows* the turn; the slant is what *causes* it. Square-on, every part of the wavefront crosses at the same instant, nothing is held back relative to anything else, and the direction survives. It is also why looking straight down into a pond shows the bottom in the right place horizontally — and still too shallow, because the depth is judged a different way.`
        },
        {
          id: 'depends',
          text: `It depends on the material — some bend light and some don't.`,
          verdict: `Materials genuinely do differ, and by a lot: water turns light noticeably, diamond dramatically, and a material with the same index as air would do nothing at all. So the instinct that the material matters is sound. What it sets is *how much*. Whether there is any turn at all is set by the angle — and even diamond, entered square-on, passes light straight through.`
        }
      ]
    },
    open: {
      question: `Then the one that has been sitting under this whole lesson. Why does light go slower in water? It is not being blocked — the water is clear, and the light gets through. So what is slowing it down?`,
      placeholder: `Something is happening to it on the way, over and over…`,
      reveal: [
        `Not friction, and nothing is absorbed — clear water lets essentially all of it through. What happens is that the light's electric field jiggles the electrons in each molecule it passes, and those jiggling electrons radiate light of their own. What continues onward is the original wave plus all the little re-radiated ones, added together, and that sum peaks slightly later than the original would have.`,
        `Do that through an inch of water, molecule after molecule, and the accumulated delay comes out as a speed about a third lower. Between the molecules the light is going at its full speed the whole time. The slowdown is an average over an enormous number of small negotiations.`,
        `Which is why the effect depends so completely on the material: a material with more electrons, held more loosely, negotiates harder and slows light more. Diamond is dense and stiff with them, and slows light to under half its speed in air — which is the whole reason a cut diamond does what it does with a candle.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `My eyes are not seeing the object directly. They are receiving…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Light and refraction arrived today. Tomorrow finishes the week by turning them into mirrors, lenses and colour.`,
    tomorrow: `Tomorrow, Lesson 25 closes the week: why a mirror shows you something that is not behind it, and why a red shirt is red.`
  },

  routes: [
    { id: 'analogy', body: `Think of pushing a shopping trolley at an angle off smooth tarmac onto gravel. The wheel that reaches the gravel first slows, the other carries on, and the trolley veers — you have fought this in a car park. Nobody steered. One side was slowed before the other and the direction changed as a consequence. Light arriving at the surface of a glass of water is a trolley meeting gravel at a slant.` },
    { id: 'object', body: `Put a pencil in a half-full glass of water and look from the side, at eye level with the surface. The pencil has a kink exactly at the waterline — not a curve, a kink, which is the clue. A curve would suggest something happening throughout the water. A kink says everything happened at one line, which is where the two materials meet.` },
    { id: 'story', body: `A heron stands motionless in the shallows and strikes at a fish. It does not aim where the fish appears to be — young herons do, and miss, and learn. The light from the fish bends on its way out of the water, so the fish is deeper and further out than it looks. The bird is making a correction for refraction without having the first idea that it is, which is a fair description of most expertise.` },
    { id: 'experiment', body: `Put a coin in an opaque bowl and sit back until the rim just hides it. Hold still and have someone pour water in. The coin appears. Nothing moved. The water changed the path of the light coming off the coin so that it now clears the rim, and your eye — assuming straight lines all the way — puts the coin somewhere higher than the bottom of the bowl.` },
    { id: 'smaller', body: `Smaller question, no water. Your eye receives light arriving from some direction. Does it have any way of telling whether that light came straight from the object, or came round a corner on the way? No — all it gets is the final direction. So if anything turns the light en route, your eye must place the object along the *final* direction. Everything else in this lesson is about what does the turning.` },
    { id: 'backward', body: `Start from spectacles. A curved piece of glass, held an inch in front of someone's eye, makes the difference between a blur and a page of readable print. It has no moving parts and nothing is lit up. All it can possibly be doing is changing the direction of the light passing through it — and if a shaped piece of glass can be ground precisely enough to fix a specific eye, the turning must be lawful and predictable. Work backward from your own glasses and you arrive at refraction with a number attached.` }
  ],

  map: [
    { name: `Light`, level: 4, fresh: true },
    { name: `Refraction`, level: 4, fresh: true },
    { name: `Waves`, level: 5 },
    { name: `Frequency`, level: 5 },
    { name: `Sound`, level: 5 },
    { name: `Signal`, level: 4 },
    { name: `Energy`, level: 5 },
    { name: `Density`, level: 5 },
    { name: `Molecular motion`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Force`, level: 5 },
    { name: `Wavelength`, level: 3 }
  ]
}
