// Navigation · Week 1 · Lesson 2 — the Earth beneath our feet.
//
// Copy transcribed from the approved design reference. The SEE IT zoom-out is
// drawn to TRUE SCALE and the handoff calls that non-negotiable: the bend must
// stay invisible until about the size of a state, because that is the argument.
// Exaggerating the curvature to make it visible would destroy the lesson while
// appearing to illustrate it. ZoomOut.jsx carries the figures.
//
// The Editor's answer reaches across to Physics I, Lesson 1 — "this is Physics,
// Lesson 1, wearing hiking boots". The handoff asks for that to be a real link
// once both courses exist. They do, so `crossLink` makes it one.

export default {
  id: 'lesson-02',
  number: 2,
  week: 1,
  title: `The Earth beneath our feet`,
  openingQuestion: `Stand in a parking lot and the ground is perfectly flat. Look out an airplane window and it still looks flat. So how do we know it's round — and why should a navigator care?`,
  concept: `A small patch of a ball looks flat`,

  see: {
    voice: 'professor',
    line: `Start in your backyard and zoom out, one step at a time. Tell me when the ground stops looking flat.`,
    simulation: { id: 'zoom-out' },
    observations: [
      { text: `Across a whole neighborhood, the ground drops about **2 inches** below a flat line. Less than a curb.` },
      { text: `You had to zoom out to the size of a **state** before the bend was even visible on the screen.` },
      { text: `So the ground isn't lying to you. It **is** flat — for the tiny patch you can see.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and you'll never be confused by this again.`,
    sentences: [
      `The Earth is a ball about **7,900 miles across**. Everything you can see from where you stand is a tiny patch of it — and a small enough patch of any ball looks flat.`,
      `The ball turns toward the east once a day, around a line through the North and South Poles. That turning is why the Sun and stars rise in the east and set in the west. The Equator circles the middle, halfway between the poles, and splits the world into a northern and a southern half.`,
      `For a walk, a flat picture of the ground is good enough. For a long journey it isn't: distant things sink below the horizon, the shortest route between far-apart places isn't a straight line on a flat map, and the stars overhead change as you travel north or south.`
    ],
    comparison: {
      label: `A STAMP ON A BASKETBALL`,
      body: `Stick a postage stamp on a basketball. It lies down almost perfectly flat; you'd have trouble sliding a sheet of paper under its edges. Shrink the Earth to the size of that basketball and the stamp would cover an area about the size of Texas. Everything you will ever see from the ground fits inside that stamp, many times over.`
    },
    naming: `One refinement for later: the Earth is very slightly wider around the Equator than from pole to pole — by about 27 miles out of 7,900. You'll never see it. Mapmakers and satellite systems have to account for it.`,
    formalNames: {
      terms: [
        { term: `Axis of rotation`, meaning: `The imaginary line the Earth spins around, running through both poles.` },
        { term: `Geographic poles`, meaning: `Where the axis meets the surface: the true North and South Poles. Not the same as **magnetic** north — that's Week 2.` },
        { term: `Equator`, meaning: `The circle around the middle, equally distant from both poles.` },
        { term: `Hemisphere`, meaning: `Half the globe. The Equator divides Northern from Southern; Lesson 3 shows how East and West are divided.` },
        { term: `Tropics`, meaning: `The Tropic of Cancer and Tropic of Capricorn, about 23.4° north and south of the Equator: the farthest north and south the Sun is ever directly overhead.` },
        { term: `Horizon`, meaning: `Where the Earth's surface bends out of your sight. The higher you stand, the farther it is.` },
        { term: `Great circle`, meaning: `The shortest path between two points on a ball. On a flat world map it usually looks curved — which is why flights to Europe arc up past Canada and Greenland.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `You've already seen the evidence. Which of these have you noticed?`,
    items: [
      `Watching a ship sink hull-first over the horizon while its top is still showing.`,
      `Seeing much farther from a hilltop or fire tower than from the valley.`,
      `The seatback map showing a flight to Europe arcing up past Greenland.`,
      `Calling family in another time zone, where it's already dark.`,
      `A round shadow creeping across the Moon during a lunar eclipse.`,
      `Different stars overhead on a trip far north or far south.`
    ],
    builder: {
      body: `Tonight, in a dark room: one lamp with the shade off is the Sun. An orange is the Earth — push a toothpick through it top to bottom for the axis, and stick a pin about halfway between the top and the middle. That pin is you. Hold the orange so the pin faces away from the lamp (midnight), then slowly turn it toward the east — counterclockwise, looking down on the top. Watch the pin come around the edge into the light. From the pin's point of view, the lamp just "rose" — in the east.`
    },
    acrossCultures: {
      place: `ANCIENT GREECE AND EGYPT`,
      label: `WELL DOCUMENTED`,
      paragraphs: [
        `Around 350 BCE, Aristotle pointed to two everyday proofs that the Earth is round: the Earth's shadow on the Moon during an eclipse is always curved, and travelers going north or south see different stars overhead.`,
        `About a century later, Eratosthenes, a scholar in Alexandria, measured it — with shadows. At midsummer noon, the Sun stood straight overhead at Syene in southern Egypt. At the same moment in Alexandria, to the north, a vertical stick cast a shadow showing the Sun was about one-fiftieth of a circle away from overhead. So the distance between the two cities had to be one-fiftieth of the Earth's circumference. One shadow, one known distance, and the size of the world.`
      ],
      uncertain: `Eratosthenes' own book is lost; his method comes to us through later writers, chiefly Cleomedes. And we don't know exactly how long his unit of distance, the stadion, was — so his result was somewhere between remarkably close and within about 15% of today's figure.`,
      sources: `Aristotle, *On the Heavens*, Book II, ch. 14; Cleomedes, *Lectures on Astronomy*, trans. Bowen and Todd (2004).`
    },
    ownPlaceholder: `Something I've seen that only works on a round Earth…`,
    synthesis: `Notice that none of these needed a spaceship. People with sharp eyes and a little patience worked it out from the ground.`
  },

  feynman: {
    line: `This is the stage that counts. Write it and the lesson is yours.`,
    instruction: `A Scout asks you: "If the Earth is round, why is the ground flat?" Answer him — **without using the words "curve," "curvature," or "sphere."**`,
    banned: ['curve', 'curvature', 'sphere'],
    bannedNote: `one of those came back — and the answer is stronger without them`,
    placeholder: `The Earth is enormous, and you can only see…`,
    checks: [
      `The Earth is enormous compared with anything you can see at once.`,
      `A small enough piece of any ball looks flat.`,
      `Over a few miles the ground bends by only inches or feet — far too little to notice.`,
      `Over long distances it adds up: the horizon, ships sinking from view, long routes.`
    ],
    closing: `If your version has "a small enough piece of anything round looks flat," the Scout will have it too.`
  },

  challenge: {
    voice: 'editor',
    line: `One number to guess, and one question that reaches back to Physics.`,
    prediction: {
      question: `You stand at the edge of the ocean, eyes about six feet above the water. On a perfectly clear day, how far away is the horizon?`,
      options: [
        {
          id: 'three',
          text: `About 3 miles.`,
          verdict: `That's it — about three miles. A simple rule gives it: the horizon in miles is roughly 1.2 times the square root of your eye height in feet. Six feet gives about 3. Climb a 100-foot lighthouse and it's about 12 miles. This is exactly why ships' lookouts sat up the mast, and why lighthouses are tall.`
        },
        {
          id: 'thirty',
          text: `About 30 miles.`,
          verdict: `It feels that far, because the sea looks endless. But the water bulges up between you and the distance, and from six feet up it hides everything beyond about three miles. What you sometimes see farther away — distant mountains, a tall ship's sails — is standing up above that bulge. You'd need to be roughly 600 feet up to see 30 miles of open water.`
        },
        {
          id: 'clear',
          text: `As far as your eyes can see — it depends on how clear the air is.`,
          verdict: `Clear air helps you see detail, but it can't help you see through the Earth. The horizon is a hard limit set by the shape of the ground, not by haze. From six feet up it's about three miles away on the clearest day there is. Climb higher and it moves out; wait for better weather and it doesn't.`
        }
      ]
    },
    open: {
      question: `Where you live, the ground under you is carried around by the Earth's turning at roughly 800 miles an hour. Why don't you feel it?`,
      placeholder: `Because you only notice motion when…`,
      reveal: [
        `This is Physics, Lesson 1, wearing hiking boots. You never feel motion itself — you feel **changes** in motion. The passenger felt the car brake, not the car cruising at 40. The Earth's turning is the smoothest cruise there is: the same speed, all day, every day, with you, the air, the trees and the ground all moving together.`,
        `Strictly, you are always turning a corner — a corner 25,000 miles around. That's such a gentle turn that the push it takes is well under one percent of your weight. Far too small to notice; just big enough that careful instruments can measure it.`
      ],
      crossLink: {
        courseId: 'physics-i',
        lessonId: 'lesson-01',
        label: `Physics I, Lesson 1 — the passenger who keeps going`
      }
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then you're done.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 3: latitude and longitude — how to give an exact address to any spot on a ball that has no edges, no corners, and no obvious place to start counting.`
  },

  routes: [
    { id: 'map', label: `Explain it with a map`, body: `A street map of your town works perfectly, and nobody worries that it's flat. A flat map of the whole world is a different story: Greenland looks as big as Africa, when Africa is really about fourteen times larger. Same flat paper, two very different results. Small patch — flat is fine. Whole ball — flat breaks. Lesson 4 is all about that.` },
    { id: 'object', label: `Use an everyday object`, body: `Peel an orange in one piece and try to press the peel flat on the table. It tears. Now take a piece the size of your thumbnail and press it flat. It lies down with hardly a wrinkle. The Earth is the orange; everything you can see from the ground is the thumbnail-sized piece.` },
    { id: 'diagram', label: `Show me a diagram`, body: `Go back to SEE IT and step through the buttons slowly. Watch the dashed flat line and the solid ground line. For the first three steps they sit on top of each other — you can't tell them apart. They only begin to separate at the size of a state. That gap you finally see is the whole lesson.` },
    { id: 'example', label: `Walk me through an example`, body: `Stand on a beach and watch a sailboat head out to sea. As it gets farther away it doesn't just get smaller — the hull disappears first, then the bottom of the sail, and the top of the mast goes last. On a flat sea it would simply shrink to a dot. It sinks because the water between you bulges up, a little more every mile.` },
    { id: 'smaller', label: `Break it into smaller steps`, body: `Step one: the Earth is huge — 7,900 miles across. Step two: you can only see a few miles at a time. Step three: a few miles out of 7,900 is a tiny sliver. Step four: a tiny sliver of anything round looks flat. That's all. Four small steps, and the puzzle is gone.` },
    { id: 'backward', label: `Work backward from the answer`, body: `Start with time zones. When it's noon in Ohio, it's already evening in London and the middle of the night in Tokyo. If the Earth were a flat table under one Sun, everyone would see sunrise at the same moment. They don't — the Sun lights one side of a ball at a time, and the ball turns. Work backward from any phone call across the world and you arrive at a round, turning Earth.` },
    { id: 'compass', label: `Explain it with a compass`, body: `Here's a preview. A compass points north because the Earth behaves like a giant magnet, with one end near the North Pole. Walk far enough north and the needle eventually points at a spot on the ground near you — the magnetic pole. That only makes sense on a ball with a top. You'll meet this properly in Week 2.` }
  ],

  map: [
    { name: `Direction vs. position`, level: 4 },
    { name: `Earth's shape`, level: 4 },
    { name: `Position`, level: 3 },
    { name: `Reference point`, level: 3 },
    { name: `Earth's rotation`, level: 3 },
    { name: `Poles, Equator & hemispheres`, level: 3 },
    { name: `Horizon`, level: 3 },
    { name: `Great circle`, level: 1 },
    { name: `Latitude & longitude`, level: 1 },
    { name: `Magnetic north`, level: 0 }
  ]
}
