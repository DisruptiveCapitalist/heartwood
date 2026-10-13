// Physics I · Week 5 · Lesson 22 — frequency. Sets up Lesson 23, where
// frequency stops being an abstraction and becomes the learner's own hearing.

export default {
  id: 'lesson-22',
  number: 2,
  week: 5,
  title: `Frequency, pitch, and a guitar string`,
  openingQuestion: `A guitar has six strings, all the same length, stretched across the same neck at roughly the same tightness. They produce six completely different notes. What is different about them?`,
  concept: `Frequency`,

  see: {
    voice: 'professor',
    line: `Three dials. Change one at a time and watch the number, not the string.`,
    simulation: { id: 'wave-medium', props: { variant: 'string' } },
    observations: [
      { text: `Shorter, tighter or thinner — each one on its own raises the note. Those are the only three things a string has.` },
      { text: `A guitar's six strings share a length and a rough tension. The thickness is what is left, and it is doing all the work.` },
      { text: `Touch it lightly and it jumps to two loops, then three — never to one and a half. Both ends are clamped, so only whole numbers fit.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Yesterday a wave crossed a room. Today one is trapped between two fixed points.`,
    sentences: [
      `Frequency is simply how many times a second something repeats. Five hundred back-and-forths a second is 500 hertz, and your ear reports that number to you as a pitch.`,
      `A string fixed at both ends can only vibrate in ways that hold still at the ends. That means whole numbers of loops and nothing in between — which is why a string gives you a note rather than a smear.`,
      `Three things set how fast it goes: how long it is, how tight it is, and how heavy the string itself is. Short, tight and light are all fast; long, slack and thick are all slow.`
    ],
    comparison: {
      label: `THE CHILD ON A SWING`,
      body: `A swing takes the same time per swing whether it is going barely at all or in a great arc — you can count it. Shorten the ropes and it swings faster; lengthen them and it slows. Nobody decides the rate; the swing has one, set by how it is built. A guitar string is a swing that has been built very short and very tight, so its rate is hundreds of times a second instead of once every two seconds, and your ear hears that rate as a note.`
    },
    naming: `How many times a second is the **frequency**, measured in **hertz**. What you hear it as is the **pitch**. The lowest pattern a string will hold is its **fundamental**, and the two-loop, three-loop and four-loop versions are its **harmonics** — which is why a guitar and a piano playing the same note still sound nothing alike.`,
    formalNames: {
      terms: [
        { term: `Frequency`, meaning: `Repeats per second, in hertz. A440 — the note orchestras tune to — is 440 back-and-forths every second.` },
        { term: `Pitch`, meaning: `What your ear makes of the frequency. High frequency, high note. The two are not quite the same thing: pitch is the experience, frequency the measurement.` },
        { term: `Amplitude`, meaning: `How big the swing is, which your ear reports as *loudness*. Entirely separate from frequency — you can play the same note quietly or loudly without changing its pitch.` },
        { term: `Harmonic`, meaning: `A whole-number multiple of the fundamental, fitting two or three or four loops between the fixed ends. The mixture of harmonics is what makes an instrument sound like itself.` },
        { term: `Wavelength`, meaning: `The length of one full repeat. On a string it is set by the length; in air, wavelength times frequency always gives the speed of sound.` }
      ],
      note: `Nothing new since yesterday. A wave in a room travels away; a wave on a clamped string has nowhere to go, so it bounces back and forth and settles into whichever patterns fit.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `All of these are something with a natural rate. Which do you know?`,
    items: [
      `Tuning a guitar by tightening the peg.`,
      `A thick bass string against a thin treble one.`,
      `Fretting a string shorter to raise the note.`,
      `Blowing across bottles with different amounts of water.`,
      `A big church bell against a small handbell.`,
      `How a voice goes up when someone is nervous.`
    ],
    builder: {
      body: `Three minutes, one rubber band. Stretch it between two fingers and pluck: a note. Pull your fingers further apart — tighter — and pluck again: higher. Now, keeping the same tension, pinch the middle with your other hand so only half of it can vibrate: higher again. You have just demonstrated two of the three dials with no equipment at all. For the third, find a thicker band and compare.`
    },
    ownPlaceholder: `Something whose note you can change, and what you change…`,
    synthesis: `The bottles are the odd one out and worth a second thought: there it is the *air* in the bottle vibrating, not the glass — and more water means less air, which means a higher note.`
  },

  feynman: {
    line: `Explain it to a child who has just been handed a guitar.`,
    instruction: `Explain frequency using a swing — **without using the words "frequency" or "pitch."**`,
    banned: ['frequenc', 'pitch'],
    bannedNote: `those are the technical names — a swing does not need them`,
    placeholder: `A swing takes the same time every time, and what decides that time is…`,
    checks: [
      `Something is repeating, and you can count how many times a second.`,
      `How fast it repeats is set by how the thing is built, not by how hard you start it.`,
      `Shorter, tighter and lighter all make it repeat faster.`,
      `Your ear turns that rate into how high the note sounds.`
    ],
    closing: `If your explanation makes clear that hitting a string harder does *not* raise the note, you have separated loudness from pitch — which is exactly what tomorrow needs.`
  },

  challenge: {
    voice: 'editor',
    line: `Three words that get used interchangeably and shouldn't be. Let us sort them out.`,
    prediction: {
      question: `You pluck a guitar string much harder than before. What changes?`,
      options: [
        {
          id: 'louder',
          text: `It gets louder, and the note stays the same.`,
          verdict: `Correct, and it is the cleanest demonstration that loudness and pitch are separate quantities. Plucking harder makes the string swing further — a bigger amplitude — but it still completes the same number of back-and-forths each second, because that rate is set by the length, tension and thickness and by nothing else. More energy arrives at your ear per second; the same number of pressure pulses do.`
        },
        {
          id: 'higher',
          text: `It gets louder and the note goes up a little.`,
          verdict: `You have been caught by something real, which is why this is a good wrong answer. Pluck a string very hard indeed and the note does rise slightly, because stretching it further briefly increases the tension — guitarists know this and it is why a heavy-handed first chord can sound sharp. But it is a small side effect of overstretching, not the rule. The rate is set by the string, and a harder pluck is louder.`
        },
        {
          id: 'faster',
          text: `The string vibrates faster, which is what "louder" means.`,
          verdict: `This is the confusion the lesson exists to clear up, and it is extremely common. Louder and faster are two different measurements of the same motion: *how far* it swings, and *how often*. A string can swing a long way slowly — a loud low note — or a short way quickly — a quiet high one. Plucking harder changes the distance. Nothing about plucking changes how many times a second.`
        }
      ]
    },
    open: {
      question: `Then the one that leads into tomorrow. Two different instruments play exactly the same note — the same frequency, the same loudness. You can still tell a guitar from a piano instantly. If the frequency is identical, what is your ear hearing?`,
      placeholder: `There is more going on than one rate…`,
      reveal: [
        `A string never vibrates in only one pattern. Along with the fundamental it is quietly running the two-loop, three-loop and four-loop versions at the same time, all layered together. Which harmonics are strong and which are faint depends on how the string was set going, what it is attached to, and what that body does with the sound.`,
        `A plucked string starts with a sharp corner in it, which demands a lot of high harmonics; a hammered one starts with a rounded push and demands fewer. The wooden body then reinforces some and swallows others. The mixture is as individual as a face, and recognising it is something your ear does without being asked.`,
        `That mixture has a name — **timbre** — and it is why "the same note" can be two completely different experiences. Hold on to it: tomorrow's lesson is about an instrument that has to decide, band by band, which parts of a sound to make louder. Knowing that a single sound is really many frequencies at once is the thing that makes a hearing aid make sense.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `Frequency is essentially a measure of…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Frequency went from "heard of it" to "can explain it" in one sitting. Tomorrow it stops being an abstraction.`,
    tomorrow: `Tomorrow, Lesson 23: what is actually happening inside your hearing aids. Not "making sound louder" — something considerably more interesting than that.`
  },

  routes: [
    { id: 'analogy', body: `Think of a skipping rope held by two children. Turn it slowly and you get one big loop. Turn it faster and at a certain speed it snaps into two loops with a still point in the middle — and in between those two speeds it just thrashes about and will not settle. A rope with both ends held has particular rates it likes and nothing in between. A guitar string is the same rope, much shorter and much tighter, liking rates in the hundreds per second.` },
    { id: 'object', body: `Take a rubber band and stretch it between your thumbs. Pluck it. Now pull your thumbs further apart and pluck again — higher. Now keep that tension and have a finger touch the middle so only half can move — higher again. Two of the three dials, demonstrated with something from a drawer, in about twenty seconds.` },
    { id: 'story', body: `A piano tuner arrives with no electronic device at all. He tightens one string until it matches his fork, then tunes everything else against it by listening for a slow throbbing between two notes and tightening until the throb slows and disappears. He is not hearing notes; he is hearing the *difference* between two rates, which gets slower as they converge. His whole trade is built on frequency being a real countable number.` },
    { id: 'experiment', body: `Line up four glasses and put different amounts of water in each, then tap them with a spoon. You will get four notes, and the pattern surprises people: more water gives a *lower* note, because the water is part of what has to be shifted. Then blow across the tops instead of tapping. Now more water gives a *higher* note, because you are shaking the air above it and there is less of it. Same glasses, opposite rules, because you changed what is doing the vibrating.` },
    { id: 'smaller', body: `Smaller question. Forget strings. If something goes back and forth 100 times a second, and something else goes back and forth 200 times a second, which one do you think sounds higher? You already know. Now: is there anything else "higher" could possibly mean? That is the whole of pitch, and everything after it is about what sets the number.` },
    { id: 'backward', body: `Start by looking at a guitar's six strings. They are all the same length, pulled across the same neck, tightened to roughly similar tension — the neck would warp otherwise. And they sound completely different. So the difference cannot be length and cannot really be tension. Look at them: the low ones are visibly fat, wound with wire, and the high ones are thin as a hair. Work backward from what you can see and thickness has to be the answer.` }
  ],

  map: [
    { name: `Frequency`, level: 4 },
    { name: `Waves`, level: 5 },
    { name: `Sound`, level: 4 },
    { name: `Pitch`, level: 4, fresh: true },
    { name: `Wavelength`, level: 3, fresh: true },
    { name: `Energy`, level: 5 },
    { name: `Pressure`, level: 5 },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Molecular motion`, level: 5 },
    { name: `Temperature`, level: 5 },
    { name: `Density`, level: 5 },
    { name: `Buoyancy`, level: 5 }
  ]
}
