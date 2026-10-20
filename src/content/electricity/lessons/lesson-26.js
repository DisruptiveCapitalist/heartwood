// Electricity & Energy · Week 6 · Lesson 26 — the learner becomes the electrician.
//
// Week 6 introduces nothing. Every idea in these lists arrived in the first
// five weeks, and the whole exercise is noticing that the object on the table
// is an instance of them. The simulation withholds its answers until asked, so
// the learner has somewhere to put their own first.
//
// The three objects are chosen to climb: a flashlight is a loop and a switch
// and almost nothing else; a toaster is one equation, I²R, made visible and
// hot; an LED bulb is a junction, a band gap and a switching supply, which is
// three weeks of this course hidden inside something that costs two pounds.
//
// Physics I's Week 6 used some of these same objects through a different lens.
// That is deliberate and worth saying out loud in the copy — the learner has
// met a flashlight before, and this time the questions are different ones.

export default {
  id: 'lesson-26',
  number: 1,
  week: 6,
  title: `A flashlight and a toaster`,
  openingQuestion: `For five weeks I have explained things to you. This week we swap over. Here are three ordinary objects, and between them they contain most of this course. What do you see happening inside them?`,
  concept: `Nothing here is new`,

  see: {
    voice: 'professor',
    line: `No labels. Say yours out loud first — then ask me, one at a time, and see whether I had the same list.`,
    simulation: {
      id: 'object-inspector',
      props: {
        prompt: 'What is the electricity doing in here?',
        objects: [
          {
            id: 'flashlight', label: 'A flashlight', shape: 'flashlight',
            physics: [
              { concept: 'A circuit is a loop', lesson: 2, note: 'The switch does not let electricity out. It completes a circle, and until it does, nothing anywhere can move.' },
              { concept: 'Cells in series', lesson: 19, note: 'Two or three batteries end to end, because one gives 1.5 V and the lamp needs more. Push adds; flow does not.' },
              { concept: 'A battery is a spring', lesson: 22, note: 'Nothing is being poured out. Ions move from one side to the other, and the flat one weighs exactly the same.' },
              { concept: 'The electrons were already there', lesson: 1, note: 'The light does not wait for anything to arrive. The wire was full before you touched the switch.' },
              { concept: 'An LED is a junction', lesson: 17, note: 'If it is modern, the lamp is a PN junction run the other way — a solar cell in reverse, giving out light instead of taking it in.' }
            ]
          },
          {
            id: 'toaster', label: 'A toaster', shape: 'toaster',
            physics: [
              { concept: 'Resistance makes heat', lesson: 5, note: 'The wire is chosen to be bad at its job. Everything a toaster does is one equation being obeyed on purpose.' },
              { concept: 'Heat goes as I²R', lesson: 5, note: 'Doubling the current would quadruple the heat. The element glows and the cord does not, because they carry the same amps through very different resistances.' },
              { concept: 'Power is volts times amps', lesson: 6, note: 'About 1,200 watts, which at 120 V means 10 amps — most of what a 15 A circuit can give you.' },
              { concept: 'The bill counts kilowatt-hours', lesson: 6, note: 'Two minutes of toast is 0.04 kWh. The thing that draws the most is rarely the thing that costs the most.' },
              { concept: 'Why the kitchen has thicker wire', lesson: 29, note: 'Toaster, kettle and microwave together would be 32 amps. That is tomorrow, and the answer is in the wall.' }
            ]
          },
          {
            id: 'ledbulb', label: 'An LED bulb', shape: 'bulb',
            physics: [
              { concept: 'A junction again', lesson: 17, note: 'The same P-type and N-type silicon as a solar cell, running backwards: push current across and it gives out light.' },
              { concept: 'The band gap sets the colour', lesson: 16, note: 'Each photon carries exactly the gap’s worth of energy, so the material decides the colour. Blue took thirty years to find.' },
              { concept: 'There is a power supply inside', lesson: 24, note: 'It needs a few volts of DC from 120 V of AC, so the base contains a tiny switching supply — which is what fails, long before the LED does.' },
              { concept: 'Ten watts, not sixty', lesson: 6, note: 'Same light, a sixth of the power, because almost nothing is being wasted as heat. A filament was a resistance heater that happened to glow.' },
              { concept: 'Why some of them flicker', lesson: 25, note: 'Single-phase power falls to zero 120 times a second. A cheap driver does not smooth it, and a phone camera will show you.' }
            ]
          }
        ]
      }
    },
    observations: [
      { text: `**Nothing on this page is new.** Every idea in those lists arrived in the first five weeks, and most of them in the first two.` },
      { text: `The hard part was never recalling the words. It is **noticing that the thing in front of you is an instance of them** — that a toaster is Lesson 5 with a plug on it.` },
      { text: `**That noticing is what the course was for.** This week practises it and teaches nothing else.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences about this week rather than about the objects.`,
    sentences: [
      `An expert is not someone who knows more facts than you about toasters. They are someone who, on meeting an unfamiliar object, **reaches for a small number of ideas they already trust** and asks which of them apply. You now have those ideas: a loop, a push, a flow, a resistance, a field, a junction. There are not many, and they cover an enormous amount of ground.`,
      `Most ordinary objects turn out to be **two or three of them combined**, and the combination is usually visible. A toaster is resistance plus a timer. A flashlight is a loop plus a chemical spring. The difficulty of a device is rarely in its principles; it is in the engineering that makes those principles cheap, safe and reliable.`,
      `So the question to ask of anything from now on is not "how does this work?" — which invites a shrug — but **"which of the things I know are happening in here?"** That question has an answer you can actually begin, and beginning is the whole difference.`
    ],
    sequence: {
      label: `THE SIX QUESTIONS THAT CRACK ALMOST ANYTHING`,
      note: `in this order — they get further in than you expect`,
      steps: [
        { name: `Where is the loop?`, body: `Trace it. Two wires to everything, out and back, or it does not work at all. If you cannot find the return path, you have not understood the device yet.` },
        { name: `What is the push, and where from?`, body: `Mains, a battery, a panel? And what voltage — because the voltage tells you what the insulation, the spacing and the hazard are for.` },
        { name: `Where does the energy end up?`, body: `Heat, light, motion or sound. Almost always heat in the end, and usually sooner than the manufacturer would like.` },
        { name: `Is anything deliberately resisting?`, body: `An element, a filament, a dropper resistor. If something is meant to get hot, that is not a fault, it is the design.` },
        { name: `Is anything turning, or being turned?`, body: `A motor or a generator — and remember they are one machine, so ask which way round it is being used today.` },
        { name: `Is the current being changed in form?`, body: `A transformer, a rectifier, a switching supply. Anything with a brick on its cable or a warm patch on its case is reshaping the supply.` }
      ]
    },
    comparison: {
      label: `READING, RATHER THAN RECITING`,
      body: `A child who has learned to read does not know what is in the books they have not opened yet, and that is not a gap in their education — it is the point of it. They have acquired something general that applies to pages they have never seen. Somebody who has memorised one book is in a much weaker position, however fluently they can recite it. Five weeks of this course were the alphabet and the grammar; this week is picking up an unfamiliar book and finding that you can read it. *Where the analogy stops:* reading is nearly all or nothing, and this is not. You will meet objects where you get three of the six questions answered and stall on the rest, and that is a perfectly good result — far better than the shrug you would have given six weeks ago, and it tells you exactly which question to go and ask.`
    },
    naming: `There is no new terminology this week, which is the point of it. What is being practised has a name in the teaching literature — **transfer**, the ability to apply an idea in a setting other than the one it was learned in — and it is the thing that most courses measure least and that matters most. One honest note on how this week works: the lists in the simulation are not complete, and they are not meant to be. If you find something in a toaster that I did not list, you are right and the list is short. Noticing something I missed is a better result than matching my list exactly, and it is worth writing down when it happens.`,
    formalNames: {
      terms: [
        { term: `Transfer`, meaning: `Using an idea in a situation other than the one you learned it in. The real test of understanding, and what this entire week practises.` },
        { term: `The loop`, meaning: `The first question to ask of any device. Out and back, always — and if you cannot trace the return, you have not finished looking.` },
        { term: `Deliberate resistance`, meaning: `Something built to be bad at conducting, so that it gets hot on purpose. An element, a filament, a dropper. Not a fault.` },
        { term: `Changing the form`, meaning: `Transformers, rectifiers and switching supplies. Any brick, any warm case, any faint whine — the supply is being reshaped in there.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you could now have a decent go at explaining.`,
    items: [
      `A hairdryer with two heat settings and two speeds.`,
      `An electric blanket.`,
      `A doorbell that chimes rather than buzzes.`,
      `A dimmer switch that only works with some bulbs.`,
      `An electric toothbrush that charges without contacts.`,
      `A bathroom heater with a pull cord instead of a switch.`
    ],
    builder: {
      body: `Pick one object in the room you are in — any object with a plug — and run the six questions on it out loud. Do not look anything up. The aim is not to be right; it is to notice how far you get before you stop, and to be precise about where you stopped. "I do not know whether that is a motor or a heater" is a question you can answer in ten seconds with your hand. "I do not know how it works" is not a question at all. The whole of this week is converting the second kind of sentence into the first kind, and you will find you can do it more often than you expect.`
    },
    ownPlaceholder: `An object I'd like to work out this week…`,
    synthesis: `The toothbrush is the interesting one on that list, because it charges through solid plastic with no contacts at all. That is a transformer with an air gap — Lesson 9, split in half, with one coil in the base and the other in the handle. Nothing else could get power across that join.`
  },

  feynman: {
    line: `Teach it back — and this week, you choose the subject.`,
    instruction: `Pick **one** of the three objects and explain everything you can see happening inside it, to someone who has not taken this course. **Use any words you like** — the test this week is how far you get, not which words you avoid.`,
    unrestricted: true,
    bannedNote: `no banned words this week — the restriction was training wheels, and they are off`,
    placeholder: `I'll take the toaster. When you push the lever down…`,
    checks: [
      `You traced a complete loop, out and back, without being prompted.`,
      `You said where the energy comes from and what form it leaves in.`,
      `You named at least one thing as deliberate rather than accidental.`,
      `You reached a point where you were precise about what you did not know.`
    ],
    closing: `That last one is the real check. Being exactly clear about where your understanding stops is worth more than a fluent account that papers over it.`
  },

  challenge: {
    voice: 'editor',
    line: `One about two things that look alike, and one about a question worth carrying.`,
    prediction: {
      question: `A 1,200 W toaster and a 1,200 W microwave draw the same current from the same socket. Are they doing the same thing to the electricity?`,
      options: [
        {
          id: 'different',
          text: `No — the toaster turns it into heat directly, the microwave does something else first.`,
          verdict: `Correct, and the difference is worth being precise about. A toaster is pure resistance: electrical energy becomes heat in the element, immediately and entirely, which is Lesson 5 with nothing added. A microwave converts the supply into a radio-frequency field at about 2.45 GHz, and that field heats water molecules **inside** the food rather than heating the air and the surface first. The electricity bill cannot tell them apart — both are 1,200 W for the minutes they run — but one is a heater and the other is a transmitter, and that is why one browns the bread and the other does not.`
        },
        {
          id: 'same',
          text: `Yes — the same watts for the same time is the same energy.`,
          verdict: `The energy accounting is exactly right, and that part should not be abandoned: 1,200 W for two minutes is the same 0.04 kWh either way, and the meter outside genuinely cannot distinguish them. But the question was what they do to the electricity, and there the paths diverge completely. One dumps it into a resistance; the other feeds a magnetron that produces a radio-frequency field, which then deposits its energy in water inside the food. Same energy, same cost, entirely different mechanism — and the different mechanism is why the results on the plate are nothing alike.`
        },
        {
          id: 'microwave',
          text: `The microwave must use less, since it cooks faster.`,
          verdict: `Cooking faster is real and worth explaining, but it does not come from drawing less. Both take about 1,200 watts while running. The microwave finishes sooner because it deposits energy throughout the food at once rather than heating the outside and waiting for conduction inward, and because it wastes very little warming the oven cavity, the shelf and the kitchen. So it uses less energy **per meal** by running for less time, while drawing just as hard. Power and energy are different quantities, and Lesson 6 exists because that distinction catches almost everyone.`
        }
      ]
    },
    open: {
      question: `Look at the three objects again. One of them contains something you have **not** been taught in this course. Which, and what do you think it is?`,
      placeholder: `Something in one of those is not covered by anything we did…`,
      reveal: [
        `The toaster, and it is the thing that makes it pop up. Everything electrical in a toaster is Lesson 5, but the timing is usually done by a **bimetallic strip** — two metals bonded together that expand by different amounts when warmed, so the strip bends as it heats and eventually trips a catch. That is thermal expansion and mechanics, not electricity, and it belongs to Physics I rather than here.`,
        `This is worth dwelling on, because it is the commonest shape of a real object: a device is rarely one subject. A toaster is electricity for the heat and mechanics for the timing. A fridge is electricity for the motor and thermodynamics for the cooling. A car is all of it at once. The boundaries between subjects are features of how we teach, and the objects have never heard of them.`,
        `Which is also why admitting you have hit the edge of a subject is a skill rather than a failure. "That part is not electrical" is a genuinely useful sentence, and it is far better than inventing an electrical explanation for a strip of metal that is simply getting hot and bending. Tomorrow: two motors, and two completely different ways of solving the same problem — how to make a single-phase motor start turning when a single phase, as Lesson 25 showed, gives it no reason to prefer either direction.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `An object I looked at differently today:`,
    placeholder: `I used to think this was just a… and now I can see…`,
    mapFooter: `Nothing new this week. Look at how much is already at the top.`,
    tomorrow: `Tomorrow, Lesson 27 — a refrigerator and a ceiling fan. Two motors, and the reason the fridge makes your lights dip when it starts while the fan does not. Then the harder question: a single phase gives a motor no reason to turn one way rather than the other, so how does either of them ever get going?`
  },

  routes: [
    { id: 'analogy', body: `A cook who knows six techniques can approach an unfamiliar vegetable with confidence — not because they have met it, but because they can ask whether it wants roasting, boiling, frying or raw. They will get it roughly right first time and exactly right second time. You now have six questions that do the same job for anything with a plug on it.` },
    { id: 'object', body: `Take the cheapest object on the list — the flashlight — and notice how much of this course is in it. A loop, a switch, cells in series, a chemical spring, a semiconductor junction. Five weeks of material in something that costs a few pounds and that you would have called simple six weeks ago. It was always this complicated; you simply could not see it.` },
    { id: 'story', body: `Richard Feynman's father used to ask him what a bird was doing rather than what it was called, on the grounds that knowing the name in four languages tells you nothing about the bird. This week is built on the same distinction. You are not being asked to name the parts of a toaster. You are being asked what the electricity is doing in there, which is a question with an answer you can check.` },
    { id: 'experiment', body: `Unplug a table lamp and look at the plug, the cable and the socket on the lamp. Two conductors, maybe three. Trace where each one goes — through the switch, through the holder, to the bulb, back. That trace is the loop of Lesson 2 in your own hands, and once you have done it on one object you will find you do it automatically on every object afterwards.` },
    { id: 'smaller', body: `Forget the lists entirely. One question, asked of anything: where does the electricity go in, and where does it come back out? Everything else in this week is what you notice on the way between those two points, and you can start without knowing any of it.` },
    { id: 'backward', body: `Start from the fact that you can now look at a cable and guess what it carries, from its thickness, its insulation and how far it is held from its neighbours. Six weeks ago a cable was a cable. Work backwards from that one change in perception and you will find it rests on Lesson 5, Lesson 9 and Lesson 19 — three ideas that you now apply without consulting them.` }
  ],

  map: [
    { name: `Seeing it in the world`, level: 3 },
    { name: `A circuit is a loop`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Semiconductors`, level: 4 },
    { name: `Batteries`, level: 5 },
    { name: `Inverters`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
