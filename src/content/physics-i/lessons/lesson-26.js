// Physics I · Week 6 · Lesson 26 — the learner becomes the physicist.
// The package is explicit that this week introduces no new major concept and
// must not feel like a test. The simulation withholds its answers until asked.

export default {
  id: 'lesson-26',
  number: 1,
  week: 6,
  title: `A bridge, a ladder, a bicycle`,
  openingQuestion: `For five weeks I have explained things to you. This week we swap over. Here are three ordinary objects. What physics do you see?`,
  concept: `Seeing it in the world`,

  see: {
    voice: 'professor',
    line: `No labels on these. Say what you see out loud, then ask me — not the other way round.`,
    simulation: {
      id: 'object-inspector',
      props: {
        prompt: 'What is holding it up, and what is it doing?',
        objects: [
          {
            id: 'bridge', label: 'A bridge', shape: 'bridge',
            physics: [
              { concept: 'Load path', lesson: 9, note: 'The weight goes through the members to the supports and into the ground. Nothing holds it; everything passes it on.' },
              { concept: 'Compression and tension', lesson: 8, note: 'The top members squeezed, the bottom ones stretched — and triangles so nothing has to bend.' },
              { concept: 'Support force', lesson: 6, note: 'The ground pushes up with exactly as much as arrives. It always has.' },
              { concept: 'Mass and weight', lesson: 4, note: 'It carries its own weight before it carries a truck, which is why the span is the hard part.' }
            ]
          },
          {
            id: 'ladder', label: 'A ladder', shape: 'ladder',
            physics: [
              { concept: 'Friction', lesson: 7, note: 'The feet must not slide. Static friction is holding you up, and it has a limit you cannot see.' },
              { concept: 'Torque', lesson: 10, note: 'Your weight high up, far from the feet, is a turning effect trying to swing the whole thing out.' },
              { concept: 'Center of mass', lesson: 2, note: 'Lean too far sideways and your combined centre leaves the base. After that nothing can be done.' },
              { concept: 'Support force', lesson: 6, note: 'Two pushes: the ground up at the feet, the wall horizontally at the top.' }
            ]
          },
          {
            id: 'bicycle', label: 'A bicycle', shape: 'bicycle',
            physics: [
              { concept: 'Dynamic stability', lesson: 2, note: 'Always falling, always being steered back under the fall. Steady is an activity.' },
              { concept: 'Friction', lesson: 7, note: 'Grip at the tyres to go and to turn; the brakes using it on purpose; the bearings trying to avoid it.' },
              { concept: 'Energy conversion', lesson: 11, note: 'Your legs to motion, and the brakes turning all of it back into warmth.' },
              { concept: 'Torque', lesson: 10, note: 'The pedals are levers, and the gears trade turning effect against speed.' },
              { concept: 'Inertia', lesson: 1, note: 'Once rolling it keeps rolling. Everything about stopping is arranging for that not to be true.' }
            ]
          }
        ]
      }
    },
    observations: [
      { text: `Nothing on this page is new. Every idea in those lists arrived in the first five weeks.` },
      { text: `The hard part is not recalling the words. It is noticing that the object in front of you is an instance of them.` },
      { text: `That noticing is the whole point of the course, and it is the only thing Week 6 is practising.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `There is nothing to learn today. There is something to do.`,
    sentences: [
      `You now have about forty ideas, and the useful question has changed. It is no longer "what does physics say about bridges" — it is "what can I see in this thing in front of me".`,
      `Any ordinary object is several ideas at once. A ladder is friction, torque, centre of mass and support forces all at the same moment, and none of them is the whole answer.`,
      `The skill worth having is not completeness. It is being able to start: pick one thing you can see, name what is happening, and follow it until it runs out.`
    ],
    comparison: {
      label: `LEARNING TO READ`,
      body: `There is a moment when a child stops sounding out letters and starts simply reading — the words arrive whole, without effort, and after that they cannot look at a shop sign without reading it. Nothing new was taught on that day. What changed is that the pieces stopped needing assembly. Looking at a ladder and seeing torque is the same transition, and like reading, it arrives without announcing itself.`
    },
    naming: `Physics has no special word for this, which is telling. The nearest is **transfer** — being able to use an idea in a situation it was not taught in — and it is the only honest test of whether somebody understood something or memorised it. It is also what the Editor has been probing for since Lesson 1.`,
    formalNames: {
      terms: [
        { term: `Transfer`, meaning: `Using an idea somewhere it was not taught. The real measure of understanding, and the reason every lesson ended with "where else have you seen this?"` },
        { term: `Model`, meaning: `The deliberately simplified picture you work with. A ladder as two forces and a pivot is a model; it leaves out the wood, and that is a feature.` },
        { term: `Idealisation`, meaning: `Ignoring what does not matter — air resistance on a falling brick, the weight of a rope. Knowing what is safe to ignore *is* the physics.` }
      ],
      note: `No formal names worth adding this week. You have them all. What is left is the practice of reaching for them unprompted.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `Pick something in the room you are sitting in. Which of these is nearest?`,
    items: [
      `Something holding weight up — a shelf, a chair, a table.`,
      `Something that turns — a handle, a hinge, a tap.`,
      `Something warm that should not be — a charger, a lamp.`,
      `Something that was moving and stopped.`,
      `Something making or carrying a sound.`,
      `Something to do with light — a window, a mirror, a screen.`
    ],
    builder: {
      body: `Ten minutes, no equipment, and the most useful thing you will do this week. Walk through one room of your house and find three objects. For each one, say out loud — actually out loud — one sentence beginning "what is happening here is…". Do not look anything up and do not worry about being complete. If you get stuck on one, move on. The point is the reaching, not the answer.`
    },
    ownPlaceholder: `One object near you, and one sentence about what is happening in it…`,
    synthesis: `Notice how often two of those are the same object. The chair holding you up is also the chair your weight is travelling through to the floor — one object, two lessons, and the second one is only visible once you look for it.`
  },

  feynman: {
    line: `This is the Feynman check the whole course has been building toward.`,
    instruction: `Pick one object — in this room or from the three above — and explain everything you can see happening in it. **No banned words this time.** Use any of them you like; the test is how far you get, not which words you avoid.`,
    unrestricted: true,
    banned: [],
    bannedNote: ``,
    placeholder: `The object I have chosen is… and what is happening in it is…`,
    checks: [
      `You named the object and started somewhere concrete.`,
      `You used at least three ideas from different weeks.`,
      `You said what each one is *doing*, not just what it is called.`,
      `You got to something you were not sure about — which is the right place to stop.`
    ],
    closing: `Reaching the edge of what you can explain is the goal, not a failure. Finding that edge is how you know where you actually are.`
  },

  challenge: {
    voice: 'editor',
    line: `My job changes this week too. I am not testing you — I am asking what you think.`,
    prediction: {
      question: `Which part of your own explanation just now are you least certain about?`,
      options: [
        {
          id: 'named',
          text: `There was a part I named but could not really explain.`,
          verdict: `That is the most useful possible answer, and recognising it is a skill most people never acquire. Knowing a word and knowing a mechanism feel identical from the inside, which is exactly why I have spent five weeks taking words away from you in the Feynman checks. If you can point at a gap, you have the one thing needed to close it — and you will close it by asking "but why", not by rereading.`
        },
        {
          id: 'confident',
          text: `I was fairly solid on all of it.`,
          verdict: `Then here is how to test that honestly, because confidence is not evidence either way. Take the thing you were most solid on and push it one step further: say *why* it works rather than that it does. If friction held the ladder — why does friction exist, and what sets its limit? If you can keep going for two or three steps you were right to feel solid. If you stop at the first "why", you have found the edge, and that is a good outcome rather than an embarrassing one.`
        },
        {
          id: 'start',
          text: `I struggled to start at all.`,
          verdict: `Worth saying clearly: that is the hardest part and it is a separate skill from knowing the content. A blank object is a much harder prompt than a question, and five weeks of lessons have all begun by handing you the question. Try this instead of looking for the physics: ask "what is touching it?" and "what is it doing?" Those two have a specific answer for every object there has ever been, and both lead straight into something you already know.`
        }
      ]
    },
    open: {
      question: `Now the kind of question the rest of this week will keep asking. Take your ladder against the wall. What would change if friction disappeared completely — just at the feet, just for a moment?`,
      placeholder: `Work out what friction was holding, then take it away…`,
      reveal: [
        `The feet slide outward instantly and the ladder comes down. Nothing else about the situation changes — the same weight, the same wall, the same angle — but friction at the base was the only thing opposing the outward push, and the wall's horizontal shove at the top has nothing left resisting it.`,
        `Which exposes something the diagram hides: the ladder was never being held up by being leant. It was being held by a *sideways* force at the feet that you cannot see, that you never think about, and whose limit you have been unconsciously judging every time you have set a ladder down.`,
        `That is the shape of a good Week 6 question, and the point of removing something rather than adding it. Take one thing away and whatever collapses tells you what that thing had been quietly doing all along. It works on anything: take friction from a bicycle, gravity from a bridge, air from a balloon.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. No new material from here to the end.`,
    prompt: `I was surprised how much physics was hiding inside…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Nothing moved up today by being taught. Things move now by being used.`,
    tomorrow: `Tomorrow, Lesson 27: a refrigerator and a ceiling fan. One of them makes a room colder. The other does not, and people are often surprised which.`
  },

  routes: [
    { id: 'analogy', body: `Think of learning a language and the day you stop translating. For months you hear a sentence, convert it word by word, work out the meaning, and reply slowly. Then one day someone speaks and you simply understand, with no step in between. Nobody taught you anything new that morning. The pieces stopped needing assembly — and that is precisely what this week is practising with objects instead of sentences.` },
    { id: 'object', body: `Pick up any object within reach — a spoon, a pen, your glasses — and ask two questions about it. What is touching it? And what is it doing? Every object has a specific answer to both, and both lead directly into something you learned in the last five weeks. If you are stuck for where to start, you are never stuck for long with those two.` },
    { id: 'story', body: `A retired engineer walks past a building site and stops to watch a crane. His companion sees a crane. He sees a counterweight balancing a load about a pivot, a cable in tension, a mast in compression, and a base wide enough that the whole centre of mass stays over it. He is not cleverer; he has simply spent years looking. The only difference between the two of them is practice at noticing, which is a thing anybody can start on a Tuesday.` },
    { id: 'experiment', body: `Walk into your kitchen and pick three objects at random — the kettle, a chair, the tap. For each, say one sentence out loud beginning "what is happening here is…". Saying it aloud matters: thinking it feels complete in a way that saying it does not, and the gaps show up the instant you have to produce a sentence.` },
    { id: 'smaller', body: `Smaller question. Forget physics entirely. Look at the ladder and answer two things: what is touching it, and what would happen if that thing let go? That is all. You will find you have described friction, support forces and torque without reaching for a single term — and naming them afterwards is the easy half.` },
    { id: 'backward', body: `Start from the measure of success you were given in the very first week: standing beside a bridge, watching a car stop, hearing a plane overhead, and a voice saying *I know what's happening here*. That was never a test you would sit. It was a description of a habit. This week is the habit, practised deliberately for five days, which is the only way habits have ever been acquired.` }
  ],

  map: [
    { name: `Transfer`, level: 3, fresh: true },
    { name: `Load path`, level: 5 },
    { name: `Torque`, level: 5 },
    { name: `Friction`, level: 5 },
    { name: `Compression`, level: 5 },
    { name: `Tension`, level: 5 },
    { name: `Center of mass`, level: 5 },
    { name: `Support force`, level: 5 },
    { name: `Inertia`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 }
  ]
}
