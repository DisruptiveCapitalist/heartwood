// Anatomy & Physiology · Week 3 · Lesson 11 — bone is alive.
//
// Measured off the simulation before the copy: unloaded, density falls 1.5% a
// month; worked, it climbs 0.25% a month. That six-to-one asymmetry is the
// lesson, and it is the real one — the figure from bed-rest and spaceflight
// studies. A symmetric model would teach the opposite of the truth.

export default {
  id: 'lesson-11',
  number: 1,
  week: 3,
  title: `Bones are living tissue`,
  openingQuestion: `A skeleton in a museum case looks like the one part of a person that was never really alive — dry, mineral, more like stone than flesh. And yet a broken bone heals itself, which stone has never managed. So what is going on inside one while you are sitting here?`,
  concept: `Bone is alive, and being rebuilt`,

  see: {
    voice: 'professor',
    line: `{name}, take the load off it and then watch the clock rather than the bar. The speed is the thing worth noticing.`,
    simulation: { id: 'bone', props: { mode: 'remodel' } },
    observations: [
      { text: `With nothing pulling on it, the bone was losing about **1.5% a month**. Not over years — months.` },
      { text: `Worked hard, it gained about **0.25% a month**. Six times slower. Losing is the fast direction and building is the slow one.` },
      { text: `And none of that is unusual. Your whole skeleton is taken apart and rebuilt roughly **every ten years** — the bones you have now are not the ones you had then.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first is the one the museum case hides.`,
    sentences: [
      `A bone is an **organ**, not a material. It has its own blood supply, its own nerves, cells living inside the hard part, and a factory in the middle of it turning out blood cells by the billion every day.`,
      `Two crews work on it continuously: one **dissolving** old bone away, one **laying down** new. When the two run at the same rate you call it "no change" — but nothing is still. It is a building site that never closes.`,
      `What tips the balance is, above everything, **mechanical load**. Bone is laid down where it is being used and taken away where it is not — along with hormones, age and nutrition, which is why the simulation's slider is only part of a longer story.`
    ],
    sequence: {
      label: `WHO IS WORKING IN THERE`,
      note: `and the parts they are working on`,
      steps: [
        { name: `Osteoclasts`, body: `The demolition crew. They attach to a patch of old bone and dissolve it away, mineral and all, leaving a pit behind.` },
        { name: `Osteoblasts`, body: `The builders. They follow behind and fill the pit with new material, which then hardens. Slower than the demolition, always.` },
        { name: `Osteocytes`, body: `Former builders, walled into the bone they made, still alive and connected to each other. They **feel the strain** on the bone and report it — the sensors that tell the other two where to work.` },
        { name: `Compact bone`, body: `The dense outer shell that gives a bone its strength and its shape. Heavy, and only used where it earns its weight.` },
        { name: `Spongy bone`, body: `The open strut-work inside the ends. Far lighter, and the struts line up along the directions the force actually travels — which is the second question below.` },
        { name: `Marrow`, body: `The soft middle. In the big bones it is making red cells at something like two million a second, which is where Lesson 2's nucleus-free cell came from.` }
      ]
    },
    comparison: {
      label: `A CATHEDRAL UNDER PERMANENT RESTORATION`,
      body: `Some cathedrals have had scaffolding somewhere on them for centuries. Masons cut out a weathered block and set a fresh one; the building is never finished and never falls down, and after four hundred years scarcely a stone is original. Nobody would say it is a different cathedral. Your skeleton is run exactly this way, on a ten-year cycle, and the reason is the same: a structure that cannot replace its damaged parts accumulates cracks until one day it does not hold. *Where the analogy stops:* the masons work from a plan. Your bone has no plan — it responds to where the load actually falls, which is why a tennis player's serving arm ends up measurably denser than the other one.`
    },
    naming: `The continuous tearing down and building up is **remodelling**, and the principle that bone adapts to the loads placed on it is **Wolff's law**, after the surgeon who set it out in 1892. It is worth holding onto the word *organ* for bone, because almost everything surprising follows from it: bone bleeds, bone hurts, bone heals, bone gets infections, and bone wastes away when it is not used — none of which a mineral does.`,
    formalNames: {
      terms: [
        { term: `Osteoclast`, meaning: `The cell that dissolves old bone. Large, many-nucleused, and the fast half of the pair — which is why loss outruns gain.` },
        { term: `Osteoblast`, meaning: `The cell that builds new bone. Some get buried in their own work and become osteocytes.` },
        { term: `Osteocyte`, meaning: `A living cell inside the hard bone, sensing strain and signalling. There are tens of thousands in a sugar-cube's worth.` },
        { term: `Remodelling`, meaning: `The continuous replacement of old bone with new. About 10% of your skeleton is being worked on at any moment.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've seen.`,
    items: [
      `A plaster cast coming off, and the limb inside being visibly thinner.`,
      `Astronauts coming back from months in orbit and needing help to stand.`,
      `An older relative breaking a hip after what looked like a small fall.`,
      `A healed break showing up as a thickened lump on an X-ray.`,
      `Being told to keep walking after an operation, as early as possible.`,
      `A tennis player's serving arm being measurably stronger-boned than the other.`
    ],
    builder: {
      body: `Ask a butcher to saw a beef or lamb leg bone across — most will do it without blinking, and a sawn marrow bone is sold for stock in any case. Look at the cut face. There is a dense pale ring around the outside, perhaps a quarter of an inch thick, and inside it an open honeycomb, and in the very middle something soft and dark. That is the whole lesson in one slice: the hard shell where the strength is needed, the light strut-work where it is not, and the marrow factory in the middle. Hold it and notice how light it is for its size.`
    },
    ownPlaceholder: `Somewhere I've met bone doing something living…`,
    synthesis: `The cast and the astronaut are the same observation at different scales, and both are the simulation's fast direction: take the load away and bone goes within weeks, because keeping it costs something and your body does not pay for what it is not using.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why bone counts as living tissue rather than as a mineral — **without using the words "osteoblast" or "osteoclast."**`,
    banned: ['osteobla', 'osteocla'],
    bannedNote: `one of those slipped in — and they are the names of the workers, not an account of the work`,
    placeholder: `There are cells inside it that…`,
    checks: [
      `There are living cells inside bone, with a blood supply reaching them.`,
      `Some of them dissolve old bone away and others lay down new.`,
      `It is being rebuilt continuously, not just when something breaks.`,
      `It responds to how much it is used — more where it is loaded, less where it is not.`
    ],
    closing: `If your version has "it responds" in it, you have the lesson. A material does not respond to anything.`
  },

  challenge: {
    voice: 'editor',
    line: `One about orbit, and one about the inside of a bone.`,
    prediction: {
      question: `Astronauts on the space station exercise for **more than two hours a day**, on resistance machines designed for the job. Do they still lose bone?`,
      options: [
        {
          id: 'no',
          text: `No — that's the whole point of the exercise programme.`,
          verdict: `It would be a reasonable conclusion from how seriously they take it, and the programme genuinely works: it has cut losses enormously compared with the early missions, when people came back in a frightening state. But "cut" is not "stopped". The trouble is that the strain signal comes from loading bone against gravity, all day, in every ordinary movement — and two hours of machine work cannot stand in for twenty-four hours of simply having weight.`
        },
        {
          id: 'some',
          text: `Yes — less than they would without it, but still some.`,
          verdict: `Correct, and the figures are sobering: roughly 1% a month at the hip even with a full exercise programme, which is close to what the simulation showed you for an unloaded bone. Recovery on the ground takes far longer than the loss did — often years, and not always completely. It is the clearest demonstration anywhere that bone is maintained by use, because these are fit, young, carefully monitored people doing everything right.`
        },
        {
          id: 'more',
          text: `No — weightlessness means no strain at all, so they'd lose it faster than someone on bed rest.`,
          verdict: `The reasoning about strain is exactly right, and weightlessness really is a more complete unloading than lying down, where your bones still press against each other and the bed. But it points the wrong way because it ignores what the exercise is doing: the resistance machines put real load through the skeleton, which is why losses are a fraction of what they were before the programme existed. The unloading is more complete; the countermeasures are better.`
        }
      ]
    },
    open: {
      question: `Cut a bone across and the struts inside are not random. They **line up** along the directions the force actually travels through that bone — a pattern an engineer would recognise. Nobody designed it and no plan exists. So how do the struts know where to be?`,
      placeholder: `Something must be able to feel where the force…`,
      reveal: [
        `The osteocytes feel it. Walled into the hard bone, connected to each other by fine processes through tiny channels, they sit in fluid that is squeezed back and forth whenever the bone is loaded. That squeezing is a signal, and a cell under strain says so — calling the builders to where load is being carried and leaving the demolition crew unopposed where it is not.`,
        `Which means the strut pattern is not a design but a **record**. It is the accumulated answer to every load that bone has actually carried, written in material and revised continuously. Change how someone moves — a limp, a new job, a sport taken up at fifty — and over months the inside of their bones quietly rearranges to match.`,
        `In 1867 an anatomist showed a drawing of the strut pattern in the top of a human femur to a Swiss engineer, who recognised it at once: it was the same pattern of lines he would have drawn for a loaded crane arm. Neither of them could explain how bone had worked it out. It took another century to find the cells doing the feeling.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about my own bones I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 12: what bone is actually made of. Soak one in vinegar for a week and you can tie it in a knot — bake it and it crumbles in your hand. Same bone, two things taken out of it.`
  },

  routes: [
    { id: 'analogy', body: `A path across a field. Nobody designs it: people walk where it is convenient, the grass dies where they walk, and within a season there is a path exactly where the traffic was. Stop walking it and the grass comes back within a few more. Bone does this with material instead of grass, at about a ten-year turnover, and the result is the same — a structure that is a record of its own use.` },
    { id: 'object', body: `Pick up a chicken bone from a roast, cleaned off. It is extraordinarily light for something that held a bird up, and if you snap it you will see it is hollow with a honeycomb inside rather than solid. Now consider what a solid bone of that size would weigh and how much energy a bird would spend carrying it. Hollow where it can be, dense where it must be — and the decision about which is which is made locally, patch by patch.` },
    { id: 'story', body: `In the 1960s, astronauts came back from relatively short flights with bone losses that alarmed everyone — and the same thing was being found in patients kept on long bed rest. The two findings met in the middle and settled an old argument: it was not weightlessness as such, nor illness, but the plain absence of load. Hospitals changed as a result. Getting people up and walking the day after surgery is now routine, and it came partly from the space programme.` },
    { id: 'experiment', body: `Stand on one leg for thirty seconds, then the other, and pay attention to how much small continuous adjustment is going on in the loaded leg — the ankle working, the hip shifting. Every one of those adjustments puts a slightly different strain through the bone, and the cells inside are registering all of it. Now imagine that signal simply stopping for six weeks in a cast. The simulation's fast direction is what you are imagining.` },
    { id: 'smaller', body: `Forget bones. One question: if something living is going to last eighty years under daily stress, what has to be true of it? It must be able to replace its own damaged parts, because cracks accumulate and nothing survives that forever. Now ask what replacing a part of a solid structure requires — something to remove the old and something to add the new — and you have both crews without being told either name.` },
    { id: 'backward', body: `Start with the fact that an older person's broken hip is treated as a serious event while a child's broken arm is barely a drama. Why the difference? Not the force involved — often it is far less. Work backwards from "the same fall does different things to different bone" and you arrive at bone as something that varies, that can be lost, and that is maintained by processes which can fall out of balance. Which is to say, at something alive.` }
  ],

  map: [
    { name: `Bone and the skeleton`, level: 4, fresh: true },
    { name: `Homeostasis`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Nerves and signalling`, level: 4 },
    { name: `Blood and vessels`, level: 5 },
    { name: `DNA and proteins`, level: 4 },
    { name: `Cellular energy`, level: 5 },
    { name: `Levels of organization`, level: 5 }
  ]
}
