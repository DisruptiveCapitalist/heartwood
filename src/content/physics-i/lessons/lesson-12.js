// Physics I · Week 3 · Lesson 12 — potential energy.
// The simulation is deliberately lossless so conservation is exactly visible;
// Lesson 13 then explains why the real one stops.

export default {
  id: 'lesson-12',
  number: 2,
  week: 3,
  title: `Stored energy: the weight, the spring, the hill`,
  openingQuestion: `A rock sits on a high shelf. It is not moving, not warm, not doing anything at all. In what sense can it possibly have energy?`,
  concept: `Potential energy`,

  see: {
    voice: 'professor',
    line: `Lift it, let go, and watch the three bars trade with each other. Then watch the total.`,
    simulation: { id: 'spring-drop' },
    observations: [
      { text: `Height becomes motion on the way down. Motion becomes squeeze at the bottom. Squeeze becomes motion again, and motion becomes height.` },
      { text: `Every bar changes constantly. The total at the top never moves — not by a tenth of a joule.` },
      { text: `And it never stops, because nothing here rubs on anything. A real one stops, which is tomorrow's lesson entirely.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Yesterday energy was something a moving thing had. Today it is something an *arrangement* has.`,
    sentences: [
      `Energy can be held in a situation rather than in a motion. A raised weight, a squeezed spring, a stretched rubber band: nothing is moving, and something is nonetheless owed.`,
      `What makes it energy and not just a claim is that you can get it back. Let go and it reappears as motion, on demand, in full.`,
      `Notice where it is actually stored, which is the part that catches everyone. It is not inside the rock. It is in the *relationship between the rock and the Earth* — in the gap. Take the Earth away and the rock on the shelf has nothing owing to it at all.`
    ],
    comparison: {
      label: `THE DRAWN BOW`,
      body: `An archer holds a drawn bow perfectly still. Nothing is moving. Everything about the situation is quiet and nothing at all is happening — and every person watching knows, with complete certainty, that something is about to. That knowledge is what stored energy is. It is not a feeling about the bow; it is a fact about it, and you could write down the number.`
    },
    naming: `Energy held in an arrangement is **potential energy** — potential in the old sense of *latent*, waiting, not in the modern sense of promising. Raised things have **gravitational** potential energy; squeezed and stretched things have **elastic** potential energy; and a tank of petrol has **chemical** potential energy, which is the same idea at the scale of atoms.`,
    formalNames: {
      terms: [
        { term: `Potential energy`, meaning: `Energy held in an arrangement rather than a motion. Retrievable, in full, by letting the arrangement go.` },
        { term: `Gravitational potential energy`, meaning: `Weight times height. Belongs to the object *and the planet together*, which is why it disappears if you remove either one.` },
        { term: `Elastic potential energy`, meaning: `Held in something squeezed or stretched. A spring, a rubber band, a bent diving board, the tendons in your legs.` },
        { term: `Chemical energy`, meaning: `Potential energy in the arrangement of atoms. Petrol, food, a battery. Same idea, smaller scale, far more of it per pound.` },
        { term: `System`, meaning: `The set of things you are keeping books on. Potential energy always belongs to a system rather than an object — the rock *and* the Earth, the two ends of the spring.` }
      ],
      note: `Lesson 11 gave you a total that never changes. Today gives you the second account it can sit in. Everything for the rest of the week is these two trading back and forth.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `All of these are holding something back. Which do you have in the house?`,
    items: [
      `A raised hammer, just before it comes down.`,
      `A wound-up clock or a pull-back toy.`,
      `Water held behind a dam.`,
      `A stretched rubber band between my fingers.`,
      `A rollercoaster car at the top of the first hill.`,
      `The food in the fridge.`
    ],
    builder: {
      body: `One minute and a ruler. Hold a ruler flat on the table with one end sticking over the edge, press that end down and let it go — it flings itself up and rattles. You put energy in by bending it and the ruler gave it back as motion the instant you stopped holding. Now press it down and just hold it there, indefinitely. Nothing is happening and something is owed, and you can feel exactly how much through your fingertip.`
    },
    ownPlaceholder: `Something in your house that is holding energy right now…`,
    synthesis: `Every one of those is a loaded arrangement waiting for permission. And notice the last one: food is stored energy too, which is why the same word turns up on the side of a cereal packet.`
  },

  feynman: {
    line: `Explain it to someone who thinks "stored energy" sounds like a dodge.`,
    instruction: `Explain how something that is not moving can cause something else to move later — **without using the words "potential" or "stored."**`,
    banned: ['potential', 'stored', 'storing'],
    bannedNote: `those are the labels — say what the arrangement actually is instead`,
    placeholder: `The rock is up there, and the floor is down there, and…`,
    checks: [
      `The energy is in the arrangement, not sitting inside the object.`,
      `Releasing the arrangement turns it into motion.`,
      `You get back exactly what was put in — nothing is created by letting go.`,
      `It took work to set it up in the first place, and that is where it came from.`
    ],
    closing: `If your explanation makes clear that putting the rock on the shelf is when you *paid* for what happens later, you have it.`
  },

  challenge: {
    voice: 'editor',
    line: `This one divides people, and both sides think it is obvious.`,
    prediction: {
      question: `A rock sits on a shelf two metres up. Where is the energy?`,
      options: [
        {
          id: 'in-rock',
          text: `Inside the rock. You put it there by lifting it.`,
          verdict: `It is the natural picture and it was the textbook picture for a long time, so you are in respectable company. But test it. Saw the rock in half and weigh the halves — nothing is different about the material. Take the same rock out into deep space with no planet nearby, hold it two metres from nothing in particular, and let go: nothing happens at all. If the energy were in the rock it would have come with it. It did not, because it was never in the rock.`
        },
        {
          id: 'in-system',
          text: `In the arrangement — the rock and the Earth being two metres apart.`,
          verdict: `That is the careful answer and the one that survives every test. The energy belongs to the pair, not to either member. It is why the same rock at the same height on the Moon owes you about a sixth as much, and why "how high up is it?" is a meaningless question without saying what it is high *above*. Physicists say the energy belongs to the system, and this is exactly what they mean by it.`
        },
        {
          id: 'nowhere',
          text: `Nowhere yet — there is no energy until it actually falls.`,
          verdict: `I like this one, because it is properly sceptical and it is asking the right question: what does it even mean to say energy is present when nothing is happening? Here is the answer. You can say in advance, exactly, how fast the rock will be moving when it lands, and you can say it from the height alone. A quantity you can measure before the event and that predicts the event is not a bookkeeping fiction — it is as real as the speed it predicts.`
        }
      ]
    },
    open: {
      question: `Then push on it. If lifting the rock puts energy into the arrangement — where did *that* come from? Follow it back as far as you can.`,
      placeholder: `You lifted it. So it came from you. And before that…?`,
      reveal: [
        `From you, and specifically from your breakfast. Your muscles released chemical energy held in the arrangement of atoms in the food, and some of it went into the rock-and-Earth arrangement while the rest, as always, went to warming you up.`,
        `Before that it was in a plant, which built those arrangements out of sunlight. Before that it was in the sun, released by hydrogen nuclei rearranging into helium. And before that it was in the arrangement of matter left over from the formation of the solar system.`,
        `Which is a rather large answer for a rock on a shelf, but it is the honest one, and it is only possible because the total never changes. Conservation is what lets you ask "where did this come from?" and keep getting an answer. That chain has no gaps in it anywhere.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `Something I now recognise as stored energy is…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Two kinds of energy on the map now, and everything else this week is these two trading with each other.`,
    tomorrow: `Tomorrow, Lesson 13: the bouncing weight never stopped because nothing rubbed. Real things stop. We go and find where the energy actually hides.`
  },

  routes: [
    { id: 'analogy', body: `Think of a cheque in your pocket. It is a piece of paper and does nothing; it has no value as paper. And yet everyone agrees, exactly, what it is worth — because of a relationship between you and a bank, not because of anything about the paper. Take away the bank and you have a bookmark. A rock on a shelf is a cheque drawn on the Earth.` },
    { id: 'object', body: `Pull a rubber band back over your thumb and hold it. Feel the effort in your fingers — that is you, continuously paying to maintain an arrangement. Now let go and it flies across the room. You did not push it as you released; you stopped holding. Everything it does afterwards was already paid for while you were standing still.` },
    { id: 'story', body: `A grandfather clock runs for eight days on nothing but a raised weight. Once a week someone winds it, which means hauling that weight back to the top, and for the next eight days the clock has everything it needs. Nobody thinks of a clock as having a fuel tank, but it does, and the fuel is a height.` },
    { id: 'experiment', body: `Right now: hold a book out at arm's length and keep it there. You are getting tired, and the book is doing nothing at all — it is not rising, so you are not giving it any energy. Now lift it slowly a foot higher. That climb is when you actually paid. Drop it on the sofa and you get that foot back as a thump, and not one inch more.` },
    { id: 'smaller', body: `Smaller question. Which does more damage, a brick dropped from a chair or the same brick dropped from a roof? The roof, obviously. Same brick, same gravity, same everything — the only difference is the height it started at. So height must be worth something, in a way you can count. That is the whole idea, and you knew it before I said it.` },
    { id: 'backward', body: `Start from a hydroelectric dam. It generates power for a city and it has no fuel deliveries, no chimney and no moving supply of anything except water that was going to flow downhill regardless. The only thing the dam does is hold water *up*. If height alone were worth nothing, the dam would be a very expensive wall. Work backward from the electricity bill and you arrive at gravitational potential energy.` }
  ],

  map: [
    { name: `Energy`, level: 4 },
    { name: `Kinetic energy`, level: 4 },
    { name: `Potential energy`, level: 4, fresh: true },
    { name: `Conservation of energy`, level: 4 },
    { name: `Elastic energy`, level: 3, fresh: true },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Compression`, level: 5 },
    { name: `Tension`, level: 5 },
    { name: `Gravity`, level: 5 },
    { name: `Momentum`, level: 4 },
    { name: `Torque`, level: 4 },
    { name: `Thermal energy`, level: 1 }
  ]
}
