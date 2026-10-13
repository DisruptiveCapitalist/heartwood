// Physics I · Week 5 · Lesson 23 — the learner's own hearing aids.
// The build package flags this one as personal: it is in the syllabus because
// he wears them. Treated accordingly — no condescension, no audiology course,
// and the thing explained is the device rather than the wearer.

export default {
  id: 'lesson-23',
  number: 3,
  week: 5,
  title: `What is happening inside your hearing aids`,
  openingQuestion: `A hearing aid is often described as something that makes sound louder. If that were all it did, a volume knob would have done the job eighty years ago. So what is actually going on in there?`,
  concept: `Sound processing`,

  see: {
    voice: 'professor',
    line: `Six bands of a voice. Try "turn everything up" first — then try the other one.`,
    simulation: { id: 'hearing-aid' },
    observations: [
      { text: `Unaided, the low bands arrive and the high ones do not. That is why speech sounds *mumbled* rather than merely quiet.` },
      { text: `Turning everything up equally makes the bottom end uncomfortable long before the top end becomes audible.` },
      { text: `Shaped to the loss — a lot at the top, almost nothing at the bottom — the consonants arrive without the bass shouting. That shaping is the whole device.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Yesterday: one sound is many frequencies at once. That is the fact this device is built on.`,
    sentences: [
      `Age-related hearing loss is almost never a uniform loss of volume. It is a slope — mild in the low notes, steep in the high ones — so what goes missing first is the top end.`,
      `That matters more than it sounds, because the top end is where the consonants live. Vowels are low and loud; *s*, *f*, *th* and *t* are high and quiet, and they are what separates one word from another.`,
      `So a hearing aid splits the sound into bands, turns each band up by its *own* amount, and puts it back together — a lot where the loss is deep, little where it is not. The word "amplifier" undersells it; what it is really doing is reshaping.`
    ],
    comparison: {
      label: `THE BADLY TUNED RADIO`,
      body: `Imagine a radio with all the treble missing. The voices are not quiet — they are perfectly loud, and perfectly hard to follow. "Sixty" and "sixteen", "fifty" and "fifty-five" stop being distinguishable, and you find yourself asking people to repeat themselves while insisting you can hear them perfectly well. That complaint is not a contradiction. It is the exact description of a high-frequency loss, and turning the volume up does not fix a radio with no treble either.`
    },
    naming: `Splitting a sound into bands and treating each separately is **frequency-specific amplification**, and it is the reason a hearing aid needs a computer in it rather than a knob. The bands are usually set from an **audiogram** — a chart of how much is missing at each frequency, which is what the test in the booth produces. Modern aids add **compression** as well: squeezing the loud sounds down while lifting the quiet ones, because a damaged ear usually has a narrower comfortable range than a healthy one.`,
    formalNames: {
      terms: [
        { term: `Audiogram`, meaning: `The chart from a hearing test: how many decibels are missing at each frequency. It is the shape the aid is programmed to fill in.` },
        { term: `Frequency-specific amplification`, meaning: `Different gain in different bands. The central idea of a modern aid and the reason it is not a volume control.` },
        { term: `Compression`, meaning: `Lifting quiet sounds more than loud ones, so everything fits into the range that is still comfortable. It is why a modern aid handles a restaurant better than an old one.` },
        { term: `Transducer`, meaning: `Lesson 14's word, and there are two in each aid: a microphone turning air pressure into a signal, and a tiny speaker turning it back. Energy conversion, twice, with the interesting work in between.` }
      ],
      note: `This lesson is Week 5 and Week 3 meeting. The microphone and the speaker are Lesson 14's energy converters; the bands are yesterday's frequencies; and the thing travelling in and out is Lesson 21's pressure pattern.`
    }
  },

  connect: {
    voice: 'roommate',
    line: `All of these are devices that treat frequencies separately. Which do you use?`,
    items: [
      `Bass and treble controls on a stereo.`,
      `A phone call where the voice is clear but thin.`,
      `Noise-cancelling headphones on a plane.`,
      `A room where everyone's voice blurs together.`,
      `Subtitles making television easier even with the sound on.`,
      `Someone who is easy to follow and someone who is not.`
    ],
    builder: {
      body: `Five minutes, one radio or stereo with tone controls. Put on a talk programme and turn the treble all the way down, leaving the volume where it is. It is not quieter and it is markedly harder to follow — you will catch yourself leaning in. Now turn the volume up and notice that it does not help at all. Then put the treble back. What you just did to the radio is what a sloping hearing loss does to a room, and what the aid undoes.`
    },
    ownPlaceholder: `Somewhere the trouble was clarity rather than volume…`,
    synthesis: `Notice the restaurant. Background noise is mostly low and loud, exactly where hearing usually still works — so it competes with the vowels while the consonants, already faint, lose outright. That is why a noisy room is so much harder than a quiet one, and it is a frequency problem rather than a volume one.`
  },

  feynman: {
    line: `Explain it to someone who has just been told they should get their hearing tested.`,
    instruction: `Explain how a hearing aid can change a sound before you hear it, and why that is better than simply making everything louder — **without using the words "amplify" or "volume."**`,
    banned: ['amplif', 'volume'],
    bannedNote: `both of those point at loudness, which is the thing this device is not mainly about`,
    placeholder: `A sound is really lots of different notes mixed together, and…`,
    checks: [
      `A single sound is many frequencies mixed together at once.`,
      `Hearing usually fades at the high end first, not evenly across the board.`,
      `The high end is where the consonants are, which is why speech blurs rather than fades.`,
      `The device treats each band separately — a lot where the loss is deep, little where it is not.`
    ],
    closing: `If your version explains why someone can say "I can hear you, I just can't understand you" and be making perfect sense, it has landed.`
  },

  challenge: {
    voice: 'editor',
    line: `One question, and it is the one the whole lesson turns on.`,
    prediction: {
      question: `Why wouldn't simply making every frequency equally louder improve someone's hearing?`,
      options: [
        {
          id: 'uncomfortable',
          text: `The frequencies that still work fine would become painfully loud before the missing ones became audible.`,
          verdict: `That is exactly it, and the simulation shows the squeeze. The loss at the bottom might be 10 decibels and at the top 65. Add 50 across the board and the top is only just arriving while the bottom is 40 decibels louder than it needed to be — which is not merely unpleasant, it is the thing that made people give up on hearing aids for decades. A damaged ear also tends to have a *narrower* comfortable range than a healthy one, so the ceiling comes down at the same time the floor goes up.`
        },
        {
          id: 'noise',
          text: `It would make the background noise louder too, and drown everything out.`,
          verdict: `True, and a genuinely serious problem — background noise is most of what makes a restaurant hard, and a flat boost does make it worse. But notice it is a problem you would still have if the loss were even across all frequencies, so it is not the reason *flat* boosting specifically fails. The reason is the mismatch: you are adding the same amount everywhere when what is missing varies by a factor of six across the range.`
        },
        {
          id: 'damage',
          text: `Loud sound damages hearing, so a louder aid would make the loss worse.`,
          verdict: `A reasonable worry and worth answering properly: badly fitted aids really can be set too loud, which is one reason they are programmed from a measured audiogram rather than guessed. But a well-fitted one is not operating anywhere near damaging levels. The honest reason flat boosting fails is simpler and has nothing to do with harm — it is that it gives the biggest help where the least is needed.`
        }
      ]
    },
    open: {
      question: `Then one worth knowing. Two people have exactly the same hearing test — the same loss, at the same frequencies. One gets on well with hearing aids and the other finds them nearly unusable. If the physics in the device is identical, what else is going on?`,
      placeholder: `The aid fixes what the ear no longer receives. What does it not fix…?`,
      reveal: [
        `Because an audiogram measures the ear, and understanding speech is done by the brain. The device can put the missing frequencies back into the air at the eardrum; it cannot restore the ability to pull a single voice out of four competing ones, or to fill in a half-heard word from context, and those jobs live further up.`,
        `There is also a timing problem the chart does not show. Damage to the inner hair cells smears sound slightly in time as well as losing it in volume, so two sounds close together blur into each other. Putting the energy back does not unsmear it. Two ears with identical audiograms can differ a great deal in how cleanly they are passing the signal on.`,
        `Which is worth saying plainly, because people are often told the aid will fix it and then blame themselves when it only half does. It is not a failure of effort or of the device. The physics in the box is doing its job completely; what it cannot do is anything beyond the eardrum.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes.`,
    prompt: `The most surprising thing happening inside a hearing aid is…`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Signal and frequency both moved today, and this is the lesson the syllabus was built around.`,
    tomorrow: `Tomorrow, Lesson 24: we leave sound for light. A straight straw in a glass of water, and your eyes insisting it is bent.`
  },

  routes: [
    { id: 'analogy', body: `Think of a photocopier with a blocked cyan cartridge. Every copy comes out orange, and turning up the darkness does not help — it makes a darker orange. What you need is more cyan specifically, because that is what is missing. A hearing aid is a copier that adds back the ink that has run out, in the amount it has run out by, rather than just pressing harder.` },
    { id: 'object', body: `Go to any stereo or car radio with bass and treble controls. Find a talk station, leave the volume alone, and turn the treble right down. The voices are no quieter and much harder to follow. Now turn the volume up and notice it does not help at all — you have made a muddy sound louder. That five-second demonstration is both the problem and the reason the obvious fix fails.` },
    { id: 'story', body: `A woman tells her husband he mumbles. He insists he does not and that her hearing is going. They are both right. He speaks as he always has, with the consonants at the top of the range; the top of the range is where her hearing has faded. The sound reaching her is genuinely missing the parts that tell "fifty" from "fifteen" — so from where she sits, he does mumble.` },
    { id: 'experiment', body: `Have someone read you a short list of numbers from the next room with the door open — sixteen, sixty, fifteen, fifty, five, nine. Then ask them to read it again covering their mouth with a hand. Suddenly it is far harder, and your hearing has not changed in the interval. Covering a mouth muffles the high frequencies specifically, which is exactly the part carrying the difference between those words. You have just simulated a high-frequency loss with one hand.` },
    { id: 'smaller', body: `Smaller question. When you cannot follow someone across a noisy room, is the problem that their voice is too *quiet*? Usually not — you can tell they are speaking and roughly how loudly. What is missing is which words they are. So the trouble is not the overall level. Once you accept that, a device whose only control is "louder" obviously cannot be the right tool.` },
    { id: 'backward', body: `Start from the fact that a modern hearing aid costs a great deal and contains a small computer, while a volume knob costs pennies and was available in 1930. Manufacturers are not sentimental; if a knob did the job they would sell knobs. So whatever the device is doing must be something a single control cannot do — it must be treating different parts of the sound differently. Work backward from the price list and you arrive at frequency-specific amplification.` }
  ],

  map: [
    { name: `Frequency`, level: 5 },
    { name: `Sound`, level: 5 },
    { name: `Signal`, level: 4, fresh: true },
    { name: `Waves`, level: 5 },
    { name: `Pitch`, level: 4 },
    { name: `Energy conversion`, level: 5 },
    { name: `Energy`, level: 5 },
    { name: `Pressure`, level: 5 },
    { name: `Wavelength`, level: 3 },
    { name: `Force`, level: 5 },
    { name: `Motion`, level: 5 },
    { name: `Efficiency`, level: 4 }
  ]
}
