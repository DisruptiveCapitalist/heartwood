// Physics I · Week 6 · Lesson 29 — electromagnetic radiation.
// The package asks that this not become quantum mechanics; the purpose is to
// recognise that "light" is a much larger family than the visible part.

export default {
  id: 'lesson-29',
  number: 4,
  week: 6,
  title: `A flashlight and a microwave`,
  openingQuestion: `One of them lets you see in the dark. The other heats soup through a closed door. They have nothing whatever in common — except that they are the same thing.`,
  concept: `Electromagnetic radiation`,

  see: {
    voice: 'professor',
    line: `One scale, drawn honestly. Find the part your eyes can use.`,
    simulation: { id: 'spectrum' },
    observations: [
      { text: `Radio, microwave, infrared, visible, ultraviolet, X-ray — one continuous family, with no joins. The names are ours, not nature's.` },
      { text: `Everything you have ever seen is the thin striped sliver in the middle. Your eyes work over about one octave of a range spanning twenty.` },
      { text: `The energy in one packet rises as the ripple gets shorter — and crosses a line, around ultraviolet, where light stops warming things and starts changing them.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Lesson 25 ended with what light is. Today we find out how much of it there is.`,
    sentences: [
      `Light, radio, microwaves, X-rays and the warmth off a radiator are all the same phenomenon: a ripple in the electric and magnetic fields, travelling at the same speed, differing only in how long the ripple is.`,
      `Your eyes respond to a very narrow slice of that range, and call it colour. A fraction longer and it is invisible warmth; a fraction shorter and it is invisible sunburn. The slice is not special — it is simply the part the sun delivers most of and the part water does not absorb.`,
      `What a given ripple can *do* depends on the energy it carries in each packet, and that rises as the ripple shortens. Long ripples can only shake things, which means warm them. Short ones carry enough in a single packet to break a molecule apart, and that is a different kind of effect altogether.`
    ],
    comparison: {
      label: `THE PIANO YOU CAN ONLY HEAR THE MIDDLE OF`,
      body: `Imagine a piano with twenty octaves, of which you can hear exactly one. The other nineteen are being played all the time — you simply have no ear for them. You would have no reason to suspect they existed until someone built a machine that responded to them, and then you would discover that most of the music had always been going on. That is what radio, infrared and X-rays were: the rest of the keyboard, found one octave at a time between 1800 and 1900.`
    },
    naming: `The whole family is **electromagnetic radiation**, and the full range is the **spectrum**. The length of one ripple is the **wavelength**; how many go by each second is the **frequency**; and the energy in one packet — one **photon** — rises with the frequency. The line where photons start carrying enough to knock electrons loose is the line between **non-ionising** and **ionising** radiation, and it sits just past violet.`,
    formalNames: {
      terms: [
        { term: `Electromagnetic spectrum`, meaning: `The whole family, from radio waves kilometres long to gamma rays smaller than an atom. All travelling at the same speed in a vacuum.` },
        { term: `Photon`, meaning: `The smallest possible packet of light. Energy comes in these rather than in a continuous stream, which is the one piece of quantum mechanics this lesson needs.` },
        { term: `Ionising`, meaning: `Carrying enough energy per photon to knock an electron off an atom, which is how chemical damage happens. Ultraviolet and beyond. Everything longer is non-ionising.` },
        { term: `Microwave`, meaning: `Ripples a few centimetres long, which happen to be very good at shaking water molecules. That is the entire principle of the oven, and the reason a dry plate stays cool.` }
      ],
      note: `And this closes the course back onto Lesson 13. A microwave oven heats food by making its water molecules jiggle harder — which is the definition of hot you were given in Week 3.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `All of these are the same family. Which are in your house?`,
    items: [
      `A television remote, which uses infrared.`,
      `Wi-Fi and a mobile phone.`,
      `The warmth you feel standing near a fire.`,
      `Sunburn on a cloudy day.`,
      `A dental X-ray.`,
      `A microwave oven, and the door you can see through.`
    ],
    builder: {
      body: `Two minutes and a phone camera. Point a television remote at your phone's camera — the front one usually works best — and press a button while watching the screen. You will see the little bulb flashing, bright purple-white, though your eyes see nothing at all. The camera's sensor responds slightly further into the infrared than your retina does. You have just looked at a part of the spectrum you were not issued with.`
    },
    ownPlaceholder: `Something in your house using a part of the spectrum you cannot see…`,
    synthesis: `Notice the microwave door. Those holes in the metal mesh are far smaller than the microwaves, which cannot get through — and far bigger than visible light, which can. One piece of metal, two completely different answers, because the only thing that differs is the size of the ripple.`
  },

  feynman: {
    line: `Explain it to someone standing between a lamp and a microwave oven.`,
    instruction: `Explain how a flashlight and a microwave oven are the same kind of thing, and what makes them behave so differently. Use any words you like.`,
    unrestricted: true,
    banned: [],
    bannedNote: ``,
    placeholder: `Both of them send out the same kind of ripple, and the difference is…`,
    checks: [
      `Both emit ripples in the electric and magnetic fields, travelling at the same speed.`,
      `They differ only in how long the ripple is.`,
      `Your eyes respond to one narrow band and are blind to the rest.`,
      `What a ripple can do — warm something, be seen, cause damage — follows from its length.`
    ],
    closing: `If your version explains why the mesh in the oven door is see-through to you and solid to the microwaves, it has the idea rather than the list.`
  },

  challenge: {
    voice: 'editor',
    line: `A question that sounds like wordplay and is not.`,
    prediction: {
      question: `Microwaves are invisible. Does that mean they are not light?`,
      options: [
        {
          id: 'arelight',
          text: `They are light — just a wavelength our eyes can't detect.`,
          verdict: `That is the physicist's answer and it is the useful one. There is nothing physically special about the visible band: no change of mechanism, no boundary in nature, nothing that happens at 400 nanometres except that human retinas stop responding. "Visible" is a fact about us. If our eyes had evolved for infrared, as some snakes' sensing organs effectively have, we would call that light and find the current arrangement arbitrary.`
        },
        {
          id: 'notlight',
          text: `No — "light" means what you can see. Otherwise the word means nothing.`,
          verdict: `This is a perfectly respectable position and worth taking seriously rather than dismissing, because it is about what words are for. In ordinary speech you are plainly right: nobody describes a dark room as full of light because the radiator is on. The reason physics went the other way is that drawing the line at human eyesight would put a boundary in the middle of a phenomenon that has none — the equations do not change, the speed does not change, the behaviour shades continuously. Both usages are defensible; they are just answering different questions.`
        },
        {
          id: 'related',
          text: `They are related to light but a different thing — like cousins.`,
          verdict: `The instinct that there is a family here is exactly right, and "cousins" is nearly the correct picture. The part to let go of is "different thing". Cousins are separate people; these are the same person at different ages. You can slide continuously from a microwave to visible red without ever crossing anything — the simulation lets you do it with one finger — and nothing changes along the way except the length of the ripple.`
        }
      ]
    },
    open: {
      question: `Then the one that makes it practical. A microwave oven and a sunbeam both deliver energy. Why does a sunbeam give you sunburn and a microwave oven, which is vastly more powerful, cannot?`,
      placeholder: `Think about what arrives in one packet, not how much arrives in total…`,
      reveal: [
        `Because damage depends on the energy in each individual packet, not on how many packets arrive. A microwave photon carries about a millionth of an electron-volt — enough to make a water molecule jiggle, which is heat, and nothing more. An ultraviolet photon carries three or four electron-volts, which is enough to break a chemical bond in your skin.`,
        `And you cannot make up the difference with quantity. A million weak photons do not add up to one strong one, any more than a million people pushing a door one at a time will break a lock that one person could force. Each arrives separately and does what it can do, alone.`,
        `Which is why a microwave oven can cook you and never give you sunburn, and why the sun can burn you through a cold February sky. It is also the single most useful thing in this lesson: when someone tells you something is "radiation", the question worth asking is not how much, but what wavelength — because that one number decides whether it warms you or alters you.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. One lesson to go.`,
    prompt: `I now think of light as…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `The last new concepts of the course, and they arrived as a widening of something you already had rather than as a new subject.`,
    tomorrow: `Tomorrow is the last lesson, and it is yours. I bring a table of ordinary objects. You pick one, and you do the explaining.`
  },

  routes: [
    { id: 'analogy', body: `Think of ocean waves. A ripple a foot across laps at your ankles; a swell a hundred yards long lifts a ship; a wave a hundred miles long is a tsunami. Nobody would call these three different substances — it is water, at different sizes, doing wildly different things. Radio, light and X-rays are one phenomenon at different sizes, and the only reason it feels stranger is that you cannot see the medium, because there isn't one.` },
    { id: 'object', body: `Point a TV remote at your phone's camera and press a button while watching the screen. A bright flashing light appears that your eyes cannot see at all. The remote has not changed; the sensor simply reaches a little further than your retina. Hold the remote up to your own eye and there is nothing there — the most direct possible demonstration that "invisible" is a statement about the observer.` },
    { id: 'story', body: `In 1800 William Herschel split sunlight with a prism and put thermometers in each colour to see which was warmest. The reds were warmer than the blues — and then, as a control, he put a thermometer just past the red where there was no colour at all. It was the warmest of the lot. He had found infrared by measuring an empty space, and discovered that the spectrum carried on past the end of his eyes.` },
    { id: 'experiment', body: `Look at the door of your microwave oven. There is a metal sheet with small holes in it, and you can see your food perfectly well through it. The holes are a few millimetres across — far smaller than the twelve-centimetre microwaves, which cannot get through, and far larger than the half-micron ripples of visible light, which sail through unimpeded. One piece of metal, two opposite answers, decided entirely by size.` },
    { id: 'smaller', body: `Smaller question. You can feel the warmth of a fire from across the room without touching it and without any air blowing on you. Something crossed the gap. It is not sound and it is not air. Now ask: is it the same sort of thing as the light you can also see coming off the fire? They arrive together, from the same flame, at the same speed. It would take some explaining for them to be two unrelated phenomena.` },
    { id: 'backward', body: `Start from a radio telescope and an optical one, pointed at the same patch of sky. Both are dishes that gather something, bring it to a focus, and build a picture. The engineering is nearly identical and only the scale differs — one has a mirror polished to a millionth of an inch, the other a mesh with centimetre holes, because each is made to match the size of its ripple. Two instruments that are obviously the same idea must be collecting the same kind of thing.` }
  ],

  map: [
    { name: `Electromagnetic waves`, level: 4, fresh: true },
    { name: `Wavelength`, level: 5 },
    { name: `Light`, level: 5 },
    { name: `Frequency`, level: 5 },
    { name: `Waves`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Thermal energy`, level: 5 },
    { name: `Molecular motion`, level: 5 },
    { name: `Reflection`, level: 4 },
    { name: `Color`, level: 4 },
    { name: `Transfer`, level: 4 },
    { name: `Sound`, level: 5 }
  ]
}
