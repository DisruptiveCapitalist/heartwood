// Physics I · Week 2 · Lesson 9 — load paths and why a truss looks like that.
// Cashes in Lesson 8's neutral axis; the package asks for the path of the force
// rather than an engineering-mathematics lesson, so no numbers are required of
// the learner anywhere.

export default {
  id: 'lesson-09',
  number: 4,
  week: 2,
  title: `Why a bridge carries a truck`,
  openingQuestion: `A loaded truck can weigh forty tons. It drives onto a bridge that is mostly empty air, and the bridge does not notice. Where does forty tons go?`,
  concept: `Load path`,

  see: {
    voice: 'professor',
    line: `Drive it across slowly. Every colour you see came out of the arithmetic, not out of a paintbox.`,
    simulation: { id: 'bridge-truss' },
    observations: [
      { text: `The two numbers at the ends always add up to the truck. The bridge is not holding anything — it is handing everything on.` },
      { text: `Members swap jobs as the truck moves. Something working hard at one moment goes quiet a few feet later.` },
      { text: `Park it directly over a support and almost the whole truss stops working. The load found a shorter way down.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `The same idea as the chair, with a great deal more at stake.`,
    sentences: [
      `A bridge does not hold a truck up. It passes the truck along — into its supports, down through the foundations, into the ground. Every structure is a route, not a container.`,
      `The route is not a single line. The weight splits, travels several ways at once and recombines, with some pieces being squeezed and others stretched at the very same moment.`,
      `And the route is not fixed. Move the truck and the whole structure rearranges what it is doing, which is why a bridge must be designed for every position the load can occupy, not just the worst one.`
    ],
    comparison: {
      label: `CARRYING A SOFA`,
      body: `Two people carry a sofa up a stairwell, and there is always an argument about who has the heavy end. Both of them are right at different moments, because the share each one carries depends on where the weight sits between them — not on how strong they are. Slide a box along the sofa toward one end and you change the deal without changing anything else. A bridge is having that argument continuously with itself, in thirteen places at once.`
    },
    naming: `The route the weight takes is the **load path**. What the ground pushes back with at each end is a **reaction**. And the arrangement of straight members you are looking at — triangles meeting at joints, each one only ever pushed or pulled along its length — is a **truss**.`,
    formalNames: {
      terms: [
        { term: `Load path`, meaning: `The route a weight takes from where it lands to where it finally leaves. Every structure has one, including your chair and your legs.` },
        { term: `Reaction`, meaning: `What a support pushes back with. Add up all the reactions and you get the load — always, exactly, or something is falling down.` },
        { term: `Truss`, meaning: `A frame of straight members joined at their ends, arranged so each one is only ever squeezed or stretched along its own length and never bent. Triangles, because a triangle cannot change shape without changing the length of a side.` },
        { term: `Span`, meaning: `The distance between supports. Nearly every hard decision in bridge design comes from this one number, because a longer span means a structure that has to carry far more of its own weight before it carries anything of yours.` }
      ],
      note: `Nothing new since Lesson 8. A truss is compression and tension, arranged so that nothing has to do the difficult job of bending.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `You are surrounded by load paths. Which of these have you actually looked at?`,
    items: [
      `A bookshelf sagging in the middle.`,
      `A ladder leaning against a wall.`,
      `The roof timbers in a loft or garage.`,
      `The beam over a garage door opening.`,
      `A hammock, and what it does to the two trees.`,
      `A footbridge over a road or stream.`
    ],
    builder: {
      body: `Five minutes, two books and a sheet of paper. Lay the paper flat between two books to make a little bridge and put a coin on it — it collapses immediately. Now fold the same sheet into a concertina of narrow pleats and lay that between the books. It will hold a surprising stack of coins. You have not added any material. You have moved the material away from the middle, where it was doing nothing, and out to the top and bottom where it can be squeezed and stretched. That is the whole of the next answer, in paper.`
    },
    ownPlaceholder: `Somewhere you can follow the weight from where it lands to the ground…`,
    synthesis: `Every one of those ends in the same place. Follow any load path far enough and it arrives at the planet — there is nowhere else for weight to go.`
  },

  feynman: {
    line: `No adjectives. I want the route.`,
    instruction: `Trace the weight of a truck from its tires all the way to the ground, saying what happens at each handover — **without using the words "strong" or "strength."**`,
    banned: ['strong', 'strength'],
    bannedNote: `"strong" is a compliment, not an explanation — say what is being done to each piece`,
    placeholder: `It starts at the tires, and the first thing it meets is…`,
    checks: [
      `You say where the weight arrives and where it ends up.`,
      `You describe what happens at each handover rather than jumping from truck to ground.`,
      `You say which pieces are being squeezed and which are being stretched.`,
      `You explain why moving the truck changes the answer.`
    ],
    closing: `If you can do that for a bridge, you can do it for your bookshelf, your loft and your own knees. It is the same walk every time.`
  },

  challenge: {
    voice: 'editor',
    line: `You saw something odd in the simulation. Let me make sure you know why.`,
    prediction: {
      question: `You park the truck directly over one of the two supports. What happens to the rest of the truss?`,
      options: [
        {
          id: 'harder',
          text: `It works harder — all that weight is now concentrated in one place.`,
          verdict: `Concentration is a real worry and you are right to reach for it: a point load is generally worse for a structure than a spread one. But look at where you have put it. Directly over a support, the weight is already standing on the thing that carries it into the ground — it has arrived. The truss's job is to *move* load sideways to the supports, and you have just given it a load that does not need moving. The support itself is working extremely hard. The truss above it is not working at all.`
        },
        {
          id: 'quiet',
          text: `It goes almost completely quiet — the load has found a shorter way down.`,
          verdict: `Exactly right, and it tells you what a truss is for. Its entire purpose is to carry a load *sideways*, from wherever it happens to be to the two places where the bridge meets the ground. Put the load on top of a support and there is no sideways journey left to make, so nothing in the web has anything to do. The hardest place to put a truck is the middle of the span — furthest from both supports, longest journey, most structure involved.`
        },
        {
          id: 'same',
          text: `Nothing changes — the weight is the same wherever it is.`,
          verdict: `The weight certainly is the same, and it is worth saying clearly that the *total* going into the ground never changes no matter where you park. What changes is the route, and therefore who does the work. That distinction is the entire lesson: a structure is not tested by how much you put on it, but by how far that load has to travel through it to get out.`
        }
      ]
    },
    open: {
      question: `Then answer this, which is really a question about taste. Why are bridges shaped in ways that look so much more complicated than necessary? Why not simply a very thick slab?`,
      placeholder: `Think about Lesson 8, and the part of the plank doing nothing…`,
      reveal: [
        `Because most of a thick slab would be dead weight. Remember the neutral axis from Lesson 8 — in anything that bends, the material near the middle is neither squeezed nor stretched, so it contributes almost nothing to holding the load. It is only there because it happens to be between the two surfaces that *are* working.`,
        `A truss is a slab with the useless middle thrown away. Keep the top, which is squeezed, keep the bottom, which is stretched, and join them with the lightest web of triangles that will hold them apart and carry the load between them. What looks like ornamental complication is the exact opposite: it is what is left after every piece that was not earning its keep has been deleted.`,
        `And this is not an aesthetic preference — it is a necessity. A bridge has to carry its own weight before it carries a single truck, and for a long span that self-weight is the dominant problem. Make the slab thick enough and it collapses under itself with nothing on it. The complication is the price of the span.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. This was the bridge you asked about at the very beginning.`,
    prompt: `The most interesting thing about a bridge is…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Compression and tension have reached "use" — you used them to explain a shape rather than only to name a loading.`,
    tomorrow: `Tomorrow, Lesson 10 closes the week: why a small person with a long bar can move what a large person cannot, and why holding a full mug at arm's length is so much worse than holding it close.`
  },

  routes: [
    { id: 'analogy', body: `Think of water running off a roof. It does not soak into the tiles and stay there; it finds a route — down the slope, into the gutter, along to the downpipe, into the drain. Move the rain to a different part of the roof and it takes a different route to the same drain. Weight in a structure behaves the same way. It never stops anywhere. It only travels, and the structure's job is to give it somewhere sensible to go.` },
    { id: 'object', body: `Hold a ruler flat between two fingers and press down in the middle — it bends easily and you can feel where it objects. Now turn the ruler on edge and press again. Same ruler, same material, vastly stiffer. Nothing changed except how far apart the squeezed face and the stretched face are. That distance is worth more than material, and a bridge is an elaborate machine for making that distance as large as possible.` },
    { id: 'story', body: `Two people carry a heavy chest of drawers down a staircase. The one below carries far more than half, and both of them know it without doing any arithmetic — they can feel where the weight has decided to go. Halfway down they swap and the deal reverses. Neither of them got stronger or weaker. The load simply found a different path, because the geometry changed.` },
    { id: 'experiment', body: `Lay a sheet of paper across the gap between two mugs and put a coin on it: it falls through. Now fold the paper into narrow concertina pleats and lay it across the same gap. It will hold a small pile of coins. You added nothing — no tape, no extra paper. You only moved the material away from the useless middle and out to where it can be pushed and pulled. That is corrugated cardboard, an I-beam and a truss bridge, all discovered on your kitchen table.` },
    { id: 'smaller', body: `Smaller question. Forget the bridge. You and a friend carry a plank with a brick sitting on it. If the brick is exactly in the middle, how much does each of you hold? Half each, obviously. Now slide the brick two-thirds of the way toward your friend. Who holds more, and roughly how much? You already know. That is the whole calculation a bridge is doing, and the only difference is that the bridge has thirteen friends instead of one.` },
    { id: 'backward', body: `Start from a photograph of a railway bridge and ask a rude question: why is it full of holes? Every triangle is an absence of material, and material is what carries load. Somebody paid an engineer to take that steel *out*. They would not have done that unless the removed steel was doing nothing — and the only way to know which steel is doing nothing is to understand where the load actually travels. Work backward from the holes and you find the load path.` }
  ],

  map: [
    { name: `Force`, level: 5 },
    { name: `Compression`, level: 5 },
    { name: `Tension`, level: 5 },
    { name: `Load path`, level: 4, fresh: true },
    { name: `Motion`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Support force`, level: 4 },
    { name: `Static friction`, level: 4 },
    { name: `Kinetic friction`, level: 4 },
    { name: `Momentum`, level: 4 },
    { name: `Mass`, level: 4 },
    { name: `Gravity`, level: 4 },
    { name: `Acceleration`, level: 3 },
    { name: `Energy`, level: 2 }
  ]
}
