// Electricity & Energy · Week 1 · Lesson 1 — a circuit is a loop.
// Copy is the tested prototype's. It picks up where Physics I's Lesson 14 left
// off: a falling weight became electricity there; here it arrives at a lamp.

export default {
  id: 'lesson-01',
  number: 1,
  week: 1,
  title: `The lamp that doesn't wait`,
  openingQuestion: `Flip a switch and the lamp across the room is on — instantly. But the particles moving in that wire crawl slower than a snail. So what got there so fast?`,
  concept: `A circuit is a loop`,

  see: {
    voice: 'professor',
    line: `{name}, look at this. Don't read yet — close the switch.`,
    simulation: { id: 'circuit-loop' },
    observations: [
      { text: `The lamp lit the instant the loop closed — not after anything travelled from the battery to reach it.` },
      { text: `Every charge in the loop started moving at the **same moment** — including the ones already sitting inside the lamp.` },
      { text: `Your marked charge has barely moved. So the thing that travelled fast wasn't the charges. It was the push.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences. That's the whole idea.`,
    sentences: [
      `A wire isn't an empty pipe waiting to be filled. It is already packed, end to end, with tiny charged particles — before you touch anything.`,
      `A battery doesn't send anything down the wire. It **pushes** on all of them at once, the way a pedal moves a whole bicycle chain — and it can only do that if the loop is unbroken.`,
      `The lamp lights because the charges *already inside it* start moving, and the thin filament turns that motion into heat and light. The energy came from the push; the charges are just the chain that carries it.`
    ],
    comparison: {
      label: `THE GARDEN HOSE THAT'S ALREADY FULL`,
      body: `Leave a hose full of water and turn the tap. Water comes out the far end at once — but it isn't the water that just left the tap. That water is still near your hand. The tap pushed on what was already in the hose, and the push got to the end long before any water from the tap did.`
    },
    naming: `This is where Physics I left off. In Lesson 14 a falling weight turned into electricity; here is the other end of that story — energy arriving at a lamp, carried by a push. Physics calls the closed loop a **circuit**, the push **voltage**, and the moving charges **current**. You understood all three before you had the words.`,
    formalNames: {
      terms: [
        { term: `Circuit`, meaning: `A complete loop. Break it anywhere — a switch, a loose plug, a dead bulb — and the push stops everywhere at once.` },
        { term: `Electron`, meaning: `The charged particle that does the moving in an ordinary metal wire. There are more of them in an inch of copper than there are grains of sand on every beach.` },
        { term: `Voltage`, meaning: `How hard the push is. A flashlight battery is 1.5 volts; a car battery, 12; the outlet in your wall, about 120.` },
        { term: `Current`, meaning: `How much charge moves past a point each second. Not how *fast* any one charge goes — how *many* go by.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Where else is a push travelling faster than the stuff it pushes? Tap any you've noticed.`,
    items: [
      `Water comes out of the faucet the moment I turn it.`,
      `Pedalling a bicycle — the back wheel turns the same instant.`,
      `A string of holiday lights where one bad bulb darkens the row.`,
      `The car wouldn't start until someone cleaned the battery terminal.`,
      `A lamp that flickers when its plug is half out of the wall.`,
      `Shuffling down a church pew — everyone moves at once.`
    ],
    builder: {
      body: `Find a flashlight. Turn it on, then slowly unscrew the back cap until the light goes out. Screw it back a hair — on. Back a hair — off. Somewhere in that quarter turn, one piece of metal stopped touching another. You just opened and closed a circuit with your fingers. Look inside and find the exact spot.`
    },
    ownPlaceholder: `Somewhere a push arrived long before the stuff did…`,
    synthesis: `Good. Every one of those is the same picture: a full line of something that moves all at once — or, if there's a gap anywhere, doesn't move at all.`
  },

  feynman: {
    line: `Your turn to teach it.`,
    instruction: `Explain why the lamp comes on the instant you flip the switch — **without using the words "electricity" or "current."**`,
    banned: ['electricit', 'current'],
    bannedNote: `one of the two words slipped in — the idea works without either`,
    placeholder: `The wire already has something in it, and the switch…`,
    checks: [
      `The wire is already full of tiny charged bits before you flip anything.`,
      `The switch closes the loop, so the battery can push on all of them at once.`,
      `The push travels fast; the bits themselves only creep.`,
      `The lamp lights because the bits already inside it start moving.`
    ],
    closing: `If your version has all four in plain words, you don't need either of the forbidden words. That's the test.`
  },

  challenge: {
    voice: 'editor',
    line: `Two questions. I'm not trying to catch you — I'm testing whether the idea holds.`,
    prediction: {
      question: `A lamp is on. You cut the wire on the far side of it — the side the charges have *already passed through*. What happens to the lamp?`,
      options: [
        {
          id: 'stays',
          text: `It stays on — the charges have already been through it.`,
          verdict: `That's a very reasonable picture if you imagine the charges as a delivery that has already been made. It's the "water through a pipe" instinct, and it's half right: something does flow. But the lamp doesn't run on charges that have passed — it runs on charges that are moving through it right now. Cut the loop anywhere, behind or ahead, and the whole chain stops at once. The lamp goes dark.`
        },
        {
          id: 'out',
          text: `It goes out immediately.`,
          verdict: `Yes — and the "far side" detail is exactly what makes it a good test. There is no near side and far side in a loop. The push only works while the whole chain is connected; break it anywhere and every charge in the circuit stops together, including the ones inside the lamp. This is why one switch can be on any part of the loop and still control the light.`
        },
        {
          id: 'fades',
          text: `It fades out slowly, as the last charges leave.`,
          verdict: `That instinct deserves credit — it treats the wire like a pipe draining, which is how a lot of things in life work. And something like it happens with a hose. But a wire isn't draining anywhere; nothing is leaving. The push stops the instant the loop is broken, so the charges in the lamp stop at the same instant. (An old bulb's filament does glow for a split second as it cools — that's heat leaving, not charges.)`
        }
      ]
    },
    open: {
      question: `Now the hard one. The charges aren't used up in the lamp — the same ones come back around to the battery. So when a battery goes dead, what has it run out of?`,
      placeholder: `Not charges. So what…?`,
      reveal: [
        `It has run out of **push** — not of charges. Inside the battery is a chemical reaction that keeps shoving charges around the loop, and when the chemicals are spent the shove gets weaker until it stops. Every charge is still there, in the wire and in the lamp, exactly as many as before. Think of a bicycle chain again: when you've ridden all afternoon, the chain hasn't worn away. Your legs are tired. The battery is the legs.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing I understand now that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 2: why a switch has to complete a circle — and why a bird can sit on a power line and feel nothing at all.`
  },

  routes: [
    { id: 'analogy', body: `Think of a bicycle chain. Push the pedal and the back wheel turns at that exact instant — but no single link raced from the pedal to the wheel. Every link moved a little, together. The battery is your foot on the pedal. The wire is the chain. The lamp is the wheel. And a chain with one link missing does nothing at all, however hard you push.` },
    { id: 'object', body: `Line up five coins on the table, edges touching. Hold the last one still with a finger and flick the first one into the row. The coin at the far end shoots away immediately — and the coin you flicked has hardly moved. Nothing travelled down the row except the shove. That's a wire.` },
    { id: 'story', body: `A crowded church pew. Someone arrives late at the aisle end and the whole row slides along to make room. The woman at the wall end moves the same moment as the man nearest the aisle — nobody walked from one end to the other. Now picture the pew as a circle, so there's no wall end, and the late arrival keeps nudging. That is a lamp staying lit.` },
    { id: 'experiment', body: `Go to the kitchen sink and turn the tap. Water comes out at once. But the water from the street main didn't sprint to your sink in that instant — the pipe was already full, all the way. Turning the tap let the push through. Your house wiring is the same: always full, waiting for a switch to close the loop.` },
    { id: 'smaller', body: `Forget the lamp. Just this: before you flip the switch, is the wire empty? No — it's metal, and metal is full of loose charges, everywhere, all the time. So when the switch closes, does anything need to arrive at the lamp? No. The charges are already there. They only need to be pushed. Hold that, and the rest follows.` },
    { id: 'backward', body: `Start with your electric bill. The power company doesn't send you charges, and you never send any back — the same ones have sat in your walls since the house was wired. So what are you paying for? Only the push, and the work it does in your lamps and your kettle. Work backward from that and the lesson falls out.` }
  ],

  map: [
    { name: `A circuit is a loop`, level: 4, fresh: true },
    { name: `Charge`, level: 3, fresh: true },
    { name: `Energy (from Physics I)`, level: 3 },
    { name: `Voltage — the push`, level: 2, fresh: true },
    { name: `Current — the flow`, level: 2, fresh: true },
    { name: `Resistance`, level: 1, fresh: true },
    { name: `Power`, level: 0 },
    { name: `Magnetism`, level: 0 },
    { name: `AC and DC`, level: 0 },
    { name: `Solar cells`, level: 0 }
  ]
}
