// Physics I · Week 4 · Lesson 17 — density and buoyancy, in air.
// The package is explicit that "hot air rises" must not be allowed to stand as
// an explanation, so the Feynman and the challenge both attack it directly.

export default {
  id: 'lesson-17',
  number: 2,
  week: 4,
  title: `Why a hot-air balloon rises`,
  openingQuestion: `A balloon holds nothing but ordinary air — the same air as everywhere else, just warmer. It weighs several hundred pounds with its basket and its passengers. And it climbs. What is pushing it up?`,
  concept: `Density and buoyancy`,

  see: {
    voice: 'professor',
    line: `A parcel of air in more air. Heat it and watch, then cool it below the room and watch again.`,
    simulation: { id: 'buoyancy', props: { variant: 'balloon' } },
    observations: [
      { text: `Heating does not make the parcel lighter by removing anything. The same air spreads out, so each cubic foot of it weighs less.` },
      { text: `The moment the parcel weighs less per cubic foot than what surrounds it, up it goes — and not before.` },
      { text: `Cool it below the surrounding air and it sinks. The rule was never about being hot. It was about being *thinner than the neighbours*.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `"Hot air rises" is a description of what happens. It is not a reason, and today we want the reason.`,
    sentences: [
      `Heating air does not add or remove any air. The particles simply move faster, shove each other further apart, and the same amount of air takes up more room — so every cubic foot of it now weighs less than it did.`,
      `Any fluid pushes up on something placed in it, with a force equal to the weight of the fluid that thing has shoved out of the way. That is true of air exactly as it is of water; air is just so light that we usually ignore it.`,
      `So the balloon floats up for the same reason a cork floats in water. It has displaced several tons of cool air, and it weighs less than the air it displaced. Nothing is pushing *because it is hot*. The heat only arranged for it to be thin.`
    ],
    comparison: {
      label: `THE CORK AND THE BUCKET`,
      body: `Push a cork to the bottom of a bucket and let go. It shoots up, and nobody calls this mysterious — the cork is lighter than the water it is occupying the space of, so the water gets underneath it. Now notice that you are also sitting in a fluid. Air is a real material with real weight, about an ounce and a half per cubic foot, and a hot-air balloon is a cork in an ocean of it.`
    },
    naming: `Weight per unit of volume is **density**, and the upward push a fluid gives is the **buoyant force**. Archimedes worked out the rule over two thousand years ago and it has not needed amending since: the push equals the weight of the fluid displaced. The word **convection** describes what happens when this goes on continuously in a room — warm air rising, cooling, sinking, going round.`,
    formalNames: {
      terms: [
        { term: `Density`, meaning: `How much mass is packed into a given volume — pounds per cubic foot. Not the same as weight: a feather pillow and a bag of sand can weigh the same and have wildly different densities.` },
        { term: `Buoyant force`, meaning: `The upward push a fluid gives anything in it, equal to the weight of the fluid pushed aside. Archimedes' principle, and it applies to air.` },
        { term: `Displacement`, meaning: `The fluid that had to go somewhere else to make room. It is the amount of *this* that decides the push, not the object's shape or its material.` },
        { term: `Convection`, meaning: `A fluid circulating because warm parts are less dense and rise while cool parts sink. Your radiator heats a room this way, and it is most of the weather.` }
      ],
      note: `And this is Lesson 6's support force in a new coat. A floor pushes up on you because it is squashed; a fluid pushes up on you because there is more of it pressing from below than from above. Both are surfaces refusing to let you through.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `All of these are something thin sitting in something thicker. Which do you recognise?`,
    items: [
      `Smoke going up a chimney.`,
      `The warm layer near the ceiling and cold feet on the floor.`,
      `A hot-air balloon going up at dawn.`,
      `Steam rising off a cup.`,
      `Draughts near a cold window that run downward.`,
      `Clouds building upward on a hot afternoon.`
    ],
    builder: {
      body: `Two minutes and a lit candle, carefully. Hold a strip of tissue paper a foot above the flame: it lifts. Now hold it a foot to the side, at the same distance: nothing. The flame is not blowing in all directions — it is warming the air directly above it, and *that* air is now thinner than the room and is being pushed up by the cooler air around it, taking your tissue with it.`
    },
    ownPlaceholder: `Somewhere warm air went up, or cold air came down…`,
    synthesis: `Notice the draughty window. Cold air falling is the same phenomenon and people never think of it that way — the cold air is not being sucked down, it is being *displaced* downward by warmer, thinner air that is more buoyant than it is.`
  },

  feynman: {
    line: `The package asked for this one specifically, and it asked me not to let you off.`,
    instruction: `Explain why a hot-air balloon climbs — **without saying "hot air rises."** That is the thing to be explained, not the explanation.`,
    banned: ['hot air rises', 'heat rises', 'warm air rises'],
    bannedNote: `that is the observation, not the reason — say why the surrounding air does what it does`,
    placeholder: `Heating the air inside does something to it, and what it does is…`,
    checks: [
      `Heating spreads the same air out, so each cubic foot of it weighs less.`,
      `The balloon has pushed a large amount of cool air out of the way.`,
      `The surrounding air pushes up with the weight of what was displaced.`,
      `That push is bigger than the balloon's weight, so it climbs — and stops climbing when they match.`
    ],
    closing: `The test of your version: does it also explain why a balloon *stops* going up at some altitude, instead of leaving the atmosphere? If yes, you have the mechanism and not the slogan.`
  },

  challenge: {
    voice: 'editor',
    line: `One question, and the answer is not intuitive to anybody the first time.`,
    prediction: {
      question: `You take a hot-air balloon, fully inflated and burning, into an enormous chamber and pump all the air out. Does it rise?`,
      options: [
        {
          id: 'yes',
          text: `Yes — it's still full of hot air, and hot air rises.`,
          verdict: `This is exactly the trap the slogan sets, and it catches nearly everyone, so it is worth being precise about. The balloon is unchanged: same fabric, same burner, same hot air inside. Everything the slogan mentions is still true of it. And yet nothing happens, because the slogan left out the only thing that was ever doing the pushing — the cooler, denser air *outside*. Remove that and the balloon has nothing to float in.`
        },
        {
          id: 'no',
          text: `No — with no surrounding air, there is nothing to push it up.`,
          verdict: `Correct, and it is the cleanest possible demonstration that the buoyant force belongs to the fluid rather than to the object. Nothing about the balloon changed. What you removed was the several tons of cool air that had been pressing in from every side, more strongly from below than from above. That difference was the lift. Take the air away and the balloon simply falls, hot or not.`
        },
        {
          id: 'slowly',
          text: `It would rise, but much more slowly, with less air resistance to help.`,
          verdict: `There is a real observation tangled up in here worth separating out: air resistance genuinely does slow a rising balloon, and removing it genuinely would let anything move more freely. But you have made the air purely an obstacle, when for a balloon it is the whole engine. Take it away and there is nothing left to be slowed *by* — and nothing left to do the lifting either. The balloon is not fighting the air. It is floating in it.`
        }
      ]
    },
    open: {
      question: `Then answer the one from the Feynman check, properly. A balloon climbs. Why does it stop climbing, at a few thousand feet, instead of carrying on out of the atmosphere?`,
      placeholder: `What is changing about the air as it goes up…?`,
      reveal: [
        `Because the air it is floating in gets thinner the higher it goes. At sea level the balloon displaces cool air weighing rather more than the balloon does, and the difference lifts it. Ten thousand feet up, the same volume of surrounding air weighs about a third less — so the push it can provide has fallen, while the balloon's own weight has not changed at all.`,
        `It climbs until those two numbers meet, and there it hangs. The pilot moves up and down not by changing how much air is displaced but by changing the balloon's own density: more burner makes the inside thinner and it rises; letting it cool makes it denser and it sinks. A balloon is steered entirely by its own weight per cubic foot.`,
        `And this is why the same argument applies to the ship tomorrow. Water does not get thinner with depth in any way that matters, so a floating object finds its level at the surface instead of somewhere in the middle. Same rule, different fluid, different answer.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `The phrase "hot air rises" really means…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Density and buoyancy arrived together, and tomorrow is the same pair in water — so expect them to move again.`,
    tomorrow: `Tomorrow, Lesson 18: steel is eight times as heavy as water. Ships are made of it. We do the same arithmetic in a different fluid.`
  },

  routes: [
    { id: 'analogy', body: `Think of a beach ball held under the water in a swimming pool. Let go and it leaps out. Nobody says "air rises" to explain that — they say the water got underneath it, because the ball is lighter than the water it was taking the place of. Now imagine you could not see the water. You would be left saying "beach balls rise," which is true, useless, and exactly what "hot air rises" is.` },
    { id: 'object', body: `Take a plastic bag and hold it open above a radiator for a minute, then close it and let go. It will drift and hang rather than dropping like a stone — you are holding a pocket of thinner air in thicker air. Then open it, let it fill with room air, and try again: down it goes. Same bag, and the only thing you ever changed was the density of what was inside it.` },
    { id: 'story', body: `In 1783 the Montgolfier brothers thought they had discovered a new gas produced by burning straw and wool, which they called "Montgolfier gas" and believed had a natural tendency to go upward. They were wrong about the gas — it was ordinary air, merely hot — but the balloon flew perfectly well over Paris regardless. You can build a working aircraft on a wrong explanation. You just cannot improve it.` },
    { id: 'experiment', body: `Light a candle and hold a strip of tissue a foot above it: the tissue lifts. Hold it a foot to one side, same distance: nothing at all. If the flame were simply pushing air outward you would feel it in both places. It is not pushing. It is thinning the air directly above it, and the heavier air all around is sliding underneath and squeezing that column upward.` },
    { id: 'smaller', body: `Smaller question, no balloons. Does a cork float because cork is a floating kind of material, or because of something about the water? Put the cork in a bucket of mercury and a steel ball floats too. Put the cork in a vacuum and it falls. So the answer cannot be about the cork alone — it has to be a comparison between the cork and whatever it is sitting in. Now say the same sentence about air.` },
    { id: 'backward', body: `Start from a fact about mountaineering: above about 26,000 feet is called the death zone, because there is not enough air. The air has not run out — it is still there — but there is far less of it in each breath, because air is thinner the higher you go. Now ask what a balloon floating in that thinner air has to work with. Work backward from an oxygen bottle and you find the ceiling of a balloon.` }
  ],

  map: [
    { name: `Density`, level: 4 },
    { name: `Buoyancy`, level: 4, fresh: true },
    { name: `Convection`, level: 3, fresh: true },
    { name: `Temperature`, level: 4 },
    { name: `Molecular motion`, level: 5 },
    { name: `Thermal energy`, level: 5 },
    { name: `Force`, level: 5 },
    { name: `Support force`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Gravity`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Mass vs weight`, level: 4 },
    { name: `Pressure`, level: 1, fresh: true }
  ]
}
