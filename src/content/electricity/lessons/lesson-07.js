// Electricity & Energy · Week 2 · Lesson 7 — back and forth, and why it won.
//
// Measured off the simulation: the wall swings to about ±170 volts, sixty times
// a second, and is nonetheless correctly called 120. That 120 is the RMS — the
// steady voltage that would heat a filament by the same amount — and meeting it
// as "the honest single number for something never still" is far better than
// meeting it as a formula.
//
// The lesson deliberately leaves "why AC won" pointing at tomorrow, because the
// answer is transformers and transformers need a lesson of their own.

export default {
  id: 'lesson-07',
  number: 2,
  week: 2,
  title: `DC and AC: one way, or back and forth`,
  openingQuestion: `The electricity in your wall does not flow. It reverses — a hundred and twenty times every second — so the charges in your lamp are shuffling back and forth a few thousandths of a millimetre and getting nowhere at all. And yet the lamp is lit. How does something that never goes anywhere do any work?`,
  concept: `Back and forth, and why it won`,

  see: {
    voice: 'professor',
    line: `{name}, watch the red line against the dashed green ones. Then switch to a battery and see what a steady voltage looks like.`,
    simulation: { id: 'mains', props: { mode: 'waveform' } },
    observations: [
      { text: `A battery holds **one value**, one way round. The wall swings between about **+170 and −170**, sixty complete times a second.` },
      { text: `And it is still correctly called **120 volts**. That number is the steady voltage that would heat a filament by exactly the same amount — the only honest single figure for something that is never still.` },
      { text: `A filament cannot cool fast enough to follow, so the light looks perfectly steady. The reversal is real and your eyes have never once seen it.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the second one answers the opening question.`,
    sentences: [
      `**Direct current** goes one way at one value. **Alternating current** reverses continuously — in most of the Americas sixty times a second, in most of the rest of the world fifty.`,
      `Work does not require going anywhere. Lesson 1 settled that the charges only ever creep, and Lesson 5 settled that heat comes from charges being **pushed through resistance**. Pushing them back and forth through a filament heats it exactly as well as pushing them one way — the filament has no opinion about direction.`,
      `And the number on the wall is a **root-mean-square** value: the equivalent steady voltage, about 70% of the peak. Quoting the peak would overstate what it does; quoting the average over a cycle would give zero, since it spends as long negative as positive. The RMS is the figure that behaves honestly.`
    ],
    sequence: {
      label: `WHY THE WALL SAYS 120 AND REACHES 170`,
      note: `three candidate numbers, and only one is useful`,
      steps: [
        { name: `The peak`, body: `About 170 volts, twice per cycle. True, and it overstates what the supply actually achieves — it is only there for an instant.` },
        { name: `The plain average`, body: `Exactly **zero**. It is above the line as long as it is below it. True, and completely useless.` },
        { name: `The RMS`, body: `120 volts. Square the voltage at every instant, take the mean, take the square root. Awkward to describe and exactly the right answer.` },
        { name: `Why squaring`, body: `Because heating depends on the **square** of the voltage, and squaring makes the negative half count as much as the positive — which is what the filament experiences.` },
        { name: `And the useful consequence`, body: `A 120 V AC supply heats a kettle exactly as a 120 V battery would. The number means what you want it to mean.` }
      ]
    },
    comparison: {
      label: `A HAND SAW`,
      body: `A saw cuts on the push and on the pull. The blade travels a few inches forward and a few inches back and ends the job exactly where it started — having gone nowhere whatever, while the plank is in two pieces. Nobody looks at a saw and asks how the blade got to the other side of the wood. Alternating current is that: the charges go back and forth, arriving nowhere, and the work is done by the pushing rather than by the travel. *Where the analogy stops:* a saw only cuts because its teeth are angled, so the two strokes are not identical. In a wire they genuinely are — the heating is the same in both directions, which is why a reversing supply is not half as useful as a steady one but exactly as useful.`
    },
    naming: `How many complete cycles happen each second is the **frequency**, measured in **hertz** — 60 Hz in North America, 50 Hz across most of Europe and Asia. The quoted voltage is the **RMS**, and the highest it reaches is the **peak**, larger by a factor of the square root of two. Anything with a battery in it runs on **DC**, and anything plugged into a wall is handed **AC** — which is why laptops, phones and televisions all need a block somewhere converting one to the other.`,
    formalNames: {
      terms: [
        { term: `Alternating current`, meaning: `Current that reverses direction regularly. What comes out of every wall socket, and what the entire grid runs on.` },
        { term: `Direct current`, meaning: `Current in one direction at a steady value. Batteries, solar panels, and the inside of nearly every electronic device.` },
        { term: `Frequency`, meaning: `Complete cycles per second, in hertz. 60 Hz means the supply reverses 120 times a second — twice per cycle.` },
        { term: `RMS`, meaning: `The equivalent steady voltage for heating. 120 V RMS swings to about ±170, and heats exactly as 120 V of battery would.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've met.`,
    items: [
      `A heavy block on a laptop lead, warm to the touch.`,
      `A low hum from a transformer or a fluorescent fitting.`,
      `A car battery, and everything in a car running off it.`,
      `Solar panels needing an "inverter" before they can be used.`,
      `An old fluorescent tube flickering visibly as it warms up.`,
      `Travel adapters, and a warning about 110 against 230 volts.`
    ],
    builder: {
      body: `Find the label on a laptop charger or any power block and read it carefully. It will say something like **INPUT: 100–240V ~ 50/60Hz** and then **OUTPUT: 19V ⎓ 3.4A**. That squiggle after the input is the symbol for alternating; the line with dots under it on the output means direct. You are holding a device whose entire purpose is to turn one into the other — and the fact that it accepts anything from 100 to 240 volts at either frequency is why the same laptop works in any country with nothing but a plug adapter.`
    },
    ownPlaceholder: `Somewhere I've met one or the other…`,
    synthesis: `Notice how many of those are conversions. Almost everything electronic in your house actually wants DC, and the wall insists on giving it AC — which raises an obvious question about why the wall does that, and tomorrow is the answer.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend what "120 volts" means, when the voltage is almost never 120 — **without using the words "RMS" or "average."**`,
    banned: ['rms', 'average'],
    bannedNote: `one of those came back — and the idea can be said in plain words, which is the point`,
    placeholder: `It's the steady voltage that would do the same…`,
    checks: [
      `The voltage is constantly changing and reaches about 170 at its highest.`,
      `It spends as long negative as positive, so you cannot just take a middle value.`,
      `The number quoted is the steady voltage that would heat something by the same amount.`,
      `So a 120-volt supply heats a kettle exactly as a 120-volt battery would.`
    ],
    closing: `"The steady one that would do the same job" is the whole definition, and it is far more useful than the formula it comes from.`
  },

  challenge: {
    voice: 'editor',
    line: `One about something on your desk, and one about a famous argument.`,
    prediction: {
      question: `A laptop needs a heavy block on its lead and a torch does not. What is the block mainly for?`,
      options: [
        {
          id: 'lower',
          text: `Lowering the voltage — a laptop needs much less than 120.`,
          verdict: `Half right, and it is the half everyone sees. It certainly does lower the voltage, usually to around 19 volts. But a simple transformer could do that and would still hand the laptop something reversing sixty times a second. The electronics inside cannot work with that at all, and the lowering is the easier of the two jobs the block is doing.`
        },
        {
          id: 'convert',
          text: `Converting alternating to direct — the laptop needs steady current.`,
          verdict: `Right, and it is the job that matters. Every chip in that machine needs a steady voltage held within a narrow range; handed something swinging between +170 and −170 it would do nothing at all. The block lowers the voltage, rectifies it so it only goes one way, smooths what is left, and regulates it steady. The weight and the warmth are both that work being done.`
        },
        {
          id: 'safety',
          text: `Safety — it isolates you from the mains.`,
          verdict: `A real function and genuinely important: the block does separate you from the supply, which is why it is safe to handle the low-voltage end. But isolation alone would not make the supply usable. If that were all it did, your laptop would be receiving isolated alternating current and would still be dead.`
        }
      ]
    },
    open: {
      question: `In the 1880s there was a genuine fight over whether to build the world on direct current or alternating current, and AC won decisively. Given everything you have seen, **why** would a supply that reverses a hundred and twenty times a second beat one that simply holds still?`,
      placeholder: `There must be something you can do with a changing current that you can't with a steady one…`,
      reveal: [
        `Because you can **change its voltage**, cheaply, with no moving parts — and you cannot do that with a steady current. A device of two coils and some iron will take alternating current in at one voltage and give it out at another, losing only a per cent or two. Nothing of the kind works on direct current, for a reason that is tomorrow's lesson.`,
        `And that matters because of Lesson 5. Heat lost in a wire is the current squared times the resistance, so sending power any distance means sending it at low current, which means high voltage. With AC you can raise the voltage at the power station, send it across a country, and lower it again at the end of your street. With the direct current of the 1880s you could not, which meant a generating station every mile or so.`,
        `It was not a close argument once that was understood, though it was fought bitterly and not always honourably. Worth a footnote, though: high-voltage direct current is now used for some very long links, because modern electronics can do the voltage conversion that nineteenth-century equipment could not. The reason AC won was a limitation of the technology of the time, and engineering has quietly revisited it.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about the electricity in my wall I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 8: the third hole. Two of them make a circuit and the third carries nothing at all, almost always — and the "almost" is the entire reason it is there.`
  },

  routes: [
    { id: 'analogy', body: `A bicycle pump. You push down and pull up, and the handle ends the job where it started — and the tyre is full. The air moved; the handle did not go anywhere. Now imagine asking how the handle got to the other end of the hose. It did not, and it never needed to, because the work was in the pushing.` },
    { id: 'object', body: `Look at any mains-powered clock with hands. Many of them keep time off the frequency of the supply itself, counting cycles rather than using a quartz crystal — and they are extremely accurate, because the grid is held to its frequency within very tight limits. The thing on your wall telling the time is, in effect, counting to sixty over and over.` },
    { id: 'story', body: `The sixty in sixty hertz is not a law of nature. Early systems ran at everything from 25 to 133 Hz, and the choice was a compromise: too low and lamps flicker visibly, too high and losses rise. Sixty was settled on in America and fifty in Europe, and once a country had built its grid there was no changing it. Some places lived with both for decades, and a few still have boundaries where the two meet and must be converted.` },
    { id: 'experiment', body: `Wave your hand quickly back and forth under an old-style filament bulb and look at the blur. It is smooth. Do the same under some LED lights and you may see a stuttering edge instead — because an LED has no thermal inertia and some cheap ones follow the supply exactly. You are seeing, with your own eyes, the difference between a thing too hot to flicker and a thing that cannot help it.` },
    { id: 'smaller', body: `Forget direction. One question: does a filament care which way the charges are moving through it? No — it gets hot because charges are being driven through resistance, and resistance is the same both ways. Now ask what that means for a supply that reverses. Nothing at all for the lamp, which is exactly why reversing is allowed and why the question of "where does it go" never needed answering.` },
    { id: 'backward', body: `Start with the fact that a phone charger works in any country with just a plug adapter, while a hairdryer bought abroad may burn out. Why the difference? The charger converts whatever it is given into the steady low voltage it actually wants, and can accept a wide range. The hairdryer is a resistance heater with no electronics at all, and feeding one designed for 120 volts with 230 roughly quadruples its heat. Work backwards from that and you find both the conversion and why the supply voltage matters so much to some things and so little to others.` }
  ],

  map: [
    { name: `AC and DC`, level: 4, fresh: true },
    { name: `Power`, level: 4 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `A circuit is a loop`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 },
    { name: `Ohm's law`, level: 4 },
    { name: `Magnetism`, level: 1, fresh: true },
    { name: `Solar cells`, level: 0 }
  ]
}
