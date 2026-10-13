// Anatomy & Physiology · Week 1 · Lesson 5 — steadiness without a manager.
//
// The spec wants four things here: receptors, chemical messengers, tissue
// formation, and homeostasis with a worked example. Blood sugar carries all
// four at once — a peptide released by one organ, heard only by cells with the
// matching receptor, and a level that returns to range because of it.
//
// The simulation lets the learner open the loop, which is the clearest way to
// show that the regulating is done by the loop rather than by the molecule. It
// is a simplified model with the clock sped up and says so on screen, and this
// lesson does not invite the learner to compare it with anything of their own.
// Per the course spec this class explains how bodies work in general; it does
// not diagnose, and nothing here is a measurement of anybody.

export default {
  id: 'lesson-05',
  number: 5,
  week: 1,
  title: `How cells communicate and become tissues`,
  openingQuestion: `Nothing in you is in charge. There is no supervisor cell keeping an eye on your blood sugar, no department that signs off on your temperature. And yet both sit inside a fairly narrow band all day — whether you eat a slice of cake or skip lunch altogether. How does something with no manager keep itself steady?`,
  concept: `Keeping steady, with no one in charge`,

  see: {
    voice: 'professor',
    line: `{name}, eat something and watch it come back. Then stop the message being received, and eat again — that second run is the one that matters.`,
    simulation: { id: 'feedback-loop', props: { mode: 'glucose' } },
    observations: [
      { text: `Eating pushed it up. Nobody gave an order — the pancreas simply **noticed**, released insulin, and the level came back down on its own.` },
      { text: `Only cells with the matching **receptor** responded. The signal went everywhere the blood goes, and most of your cells ignored it completely.` },
      { text: `With the message sent but not received, it barely came down at all. So the regulating isn't done by the molecule. It's done by the **loop**.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the second one is one of the most useful ideas in all of biology.`,
    sentences: [
      `A cell can only answer a signal it has a **receptor** for. Hormones travel everywhere the blood goes, and that is perfectly efficient, because the address is written on the receiving end rather than on the envelope.`,
      `Steadiness comes from **loops**, not from managers. Something senses a drift out of the usual range; a signal is released; cells that can hear it act; and what they do reduces the very drift that triggered the signal — so the signal eases off by itself. No decision is made anywhere.`,
      `And cells that carry the same receptors and do the same job together are a **tissue**. Four broad kinds build every organ you have, which is a surprisingly short list for a whole body.`
    ],
    sequence: {
      label: `THE FOUR KINDS OF TISSUE`,
      note: `every organ in you is built from these`,
      steps: [
        { name: `Epithelial`, body: `Sheets that line and cover — the surface of your skin, the inside of your gut, the lining of every blood vessel. Wherever the body meets something that isn't it.` },
        { name: `Connective`, body: `Holds things together and apart: bone, cartilage, tendon, ligament, fat — and, surprisingly, **blood**, which counts as connective tissue.` },
        { name: `Muscle`, body: `Shortens when told to. Three sorts: skeletal, which you command; cardiac, in the heart; and smooth, in vessels, gut and airways, which you don't.` },
        { name: `Nervous`, body: `Carries signals fast and far — brain, spinal cord and nerves. The alternative to sending a molecule and waiting.` }
      ]
    },
    comparison: {
      label: `THE THERMOSTAT IN THE HALL`,
      body: `A thermostat holds a house at a temperature without understanding houses, weather or comfort. It senses, compares against a set point, switches the boiler on, and the warming it causes is what eventually switches it off again. Nobody is managing the house. The steadiness is a property of the arrangement, not of anyone's attention. *Where the analogy stops:* a thermostat has one sensor, one switch and one set point. You have thousands of overlapping loops, several different signals for the same variable, and set points that themselves move — which is exactly what makes a fever so strange, and it's the second question below.`
    },
    naming: `The whole business of holding internal conditions inside workable ranges is **homeostasis**, and the kind of loop you just watched is **negative feedback** — "negative" because the response opposes the change that caused it. The level the loop aims at is its **set point**. Two cautions worth carrying out of this lesson: the ranges differ between people and shift with age, illness and the time of day, and a real variable is usually managed by several signals pulling in different directions rather than by one. Insulin has an opposite number, **glucagon**, which you saw take over at the bottom of the range.`,
    formalNames: {
      terms: [
        { term: `Homeostasis`, meaning: `Keeping internal conditions within ranges the body can work in. Not holding a constant — the levels move all day; the point is that they come back.` },
        { term: `Negative feedback`, meaning: `A loop whose response opposes the change that triggered it. The commonest control arrangement in the body, and the reason nothing needs to be in charge.` },
        { term: `Receptor`, meaning: `A protein that recognises one particular signal. Which receptors a cell has is what decides which of the body's messages it is listening to at all.` },
        { term: `Tissue`, meaning: `A group of cells of similar kind doing a job together. Organs are built from several tissues — which is why Lesson 2's heart was muscle, nerve, connective tissue and a lining all at once.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `You run dozens of these loops every hour without noticing. Tap any you've felt.`,
    items: [
      `Sweating on a hot day, and shivering on a cold one.`,
      `Feeling shaky and short-tempered when a meal is very late.`,
      `The thermostat in the hall clicking on and off.`,
      `Goosebumps, which are a loop that stopped working when we lost our fur.`,
      `Being thirsty — a loop about water, not about your mouth.`,
      `A blood test with a "reference range" printed beside every number.`
    ],
    builder: {
      body: `Run cold water over one hand for about half a minute — comfortably cold, not painful. Dry it, then hold both palms side by side under a good light and compare them. The cold one is noticeably paler. Nobody instructed your hand to do that, and you couldn't have done it deliberately if you'd tried: a drop in skin temperature was sensed, blood vessels near the surface narrowed, and less blood went where heat would be lost. Wait a minute or two and the colour comes back. That is a loop, running in your hand, and Lesson 9 is about nothing else.`
    },
    ownPlaceholder: `Something my body does that I never asked it to…`,
    synthesis: `Notice how many of those you experience as a *feeling* — thirst, hunger, shivering, irritability. The feeling is often the loop's way of getting a whole person to do something a cell can't do alone.`
  },

  feynman: {
    line: `Teach it, and this one is genuinely hard without the jargon.`,
    instruction: `Explain how your body keeps something steady when nothing in it is in charge — **without using the words "homeostasis" or "feedback."**`,
    banned: ['homeostas', 'feedback'],
    bannedNote: `one of those crept in — and both are names for the answer rather than the answer`,
    placeholder: `Something notices when a level has drifted, and then…`,
    checks: [
      `Something senses when a level has drifted out of its usual range.`,
      `A signal gets released and carried, usually to the whole body at once.`,
      `Only cells with the matching receptor can respond to it; the rest ignore it.`,
      `What those cells do reduces the drift that caused the signal — so the signal eases off by itself.`
    ],
    closing: `If your version ends with the signal switching itself off, you have the idea. That self-cancelling is the entire trick, and it is why no decision has to be made anywhere.`
  },

  challenge: {
    voice: 'editor',
    line: `One to test the receptor idea, and one that will change how a fever feels.`,
    prediction: {
      question: `A hormone released into the blood reaches essentially every cell in your body within a minute or two. So why doesn't every cell respond to it?`,
      options: [
        {
          id: 'amount',
          text: `Too little of it reaches any one cell to have an effect.`,
          verdict: `A fair thought, and dilution is real — hormones circulate at genuinely tiny concentrations, sometimes a few molecules per cell's worth of blood. But that cuts the wrong way: the cells that *do* respond are responding to those same tiny amounts, which tells you receptors are extraordinarily sensitive. Amount isn't what separates the responders from the rest.`
        },
        {
          id: 'receptor',
          text: `Only cells carrying the matching receptor can respond at all.`,
          verdict: `Exactly right, and it is worth seeing how economical this is. The body doesn't need to address messages, route them, or keep a directory. It simply shouts everywhere and lets the listening be selective — which means a cell can be added to or removed from a conversation just by making more or fewer receptors, without anything else in the body being told. That is also why the same hormone can do different things in different tissues: the receptor decides what the response *is*, not just whether there is one.`
        },
        {
          id: 'close',
          text: `Only cells near where it was released get enough of it.`,
          verdict: `This is true of a different and real kind of signalling — plenty of messages are deliberately local, released and consumed within a fraction of an inch, and inflammation in Week 5 runs largely on those. But a hormone in the bloodstream is specifically the long-range kind: insulin from the pancreas acts on muscle and fat all over the body. Distance isn't the filter here.`
        }
      ]
    },
    open: {
      question: `Now a strange one. With an infection, your temperature rises — and your body **defends** the higher temperature. At 102°F you shiver, you feel cold, you want a blanket. If the loop is supposed to hold you near 98.6, why is it working so hard to keep you hot?`,
      placeholder: `Maybe the loop isn't broken, maybe the…`,
      reveal: [
        `Because the loop isn't failing. The **set point** moved. During certain illnesses, signals from the immune system reset the thermostat upward — and from that moment the loop is doing precisely its job, just aiming somewhere new. At 99°F you are now *below* your set point, so you shiver and seek warmth, exactly as you would in the cold. Feeling freezing while running a temperature isn't a contradiction; it's the loop working correctly toward a target that has been changed.`,
        `It explains the other half, too. When a fever breaks, the set point drops back first, and suddenly you are far above it — so you sweat heavily and throw the blankets off. Same loop, same person, opposite behaviour, because the number it was aiming at moved twice.`,
        `This is a genuinely useful habit of mind: when a control system seems to be behaving perversely, the interesting question is often "what is it aiming at now?" rather than "what has broken?" Week 5 comes back to fever properly. Whether a given fever should be treated is a clinical question that depends on the person and the illness, and that is a conversation for a doctor rather than for a course.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes — and that's the week.`,
    prompt: `One thing about how the body keeps itself steady that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `That's Week 1. You have the ladder from atoms to a whole person, what a cell has to get done, where the energy comes from, how the instructions become working molecules, and how all of it stays steady. Week 2 moves out of the cell and into the body that supplies it — starting with the heart, which turns out not to be a pump so much as two pumps that were bolted together.`
  },

  routes: [
    { id: 'analogy', body: `A toilet cistern. The float drops as the tank empties, which opens the valve; water comes in, the float rises, and rising is what shuts the valve off. No one decides anything, there's no sensor reporting to a controller, and the thing holds a steady level for decades. Your blood sugar runs on the same logic and so does your temperature. Where it stops: a cistern aims at one level forever. Your set points move — deliberately, as a fever shows.` },
    { id: 'object', body: `Find a lock and a key that don't match and try them. The key goes in a little way, perhaps, and nothing happens — no amount of pushing helps, because the shape is wrong. Now the right key, and it turns with almost no effort. A receptor is the lock and a hormone is the key, and this is why a cell can sit in blood full of a dozen different signals and respond to exactly one of them. Having the lock is what puts you on the distribution list.` },
    { id: 'story', body: `In the 1860s Claude Bernard noticed something that should have been obvious and wasn't: the inside of an animal stays remarkably constant while the world outside it does not. He called it the milieu intérieur — the internal environment — and argued that all the machinery of a body exists to hold it steady. Seventy years later Walter Cannon gave it the name homeostasis. It is one of the few ideas in biology that got more important the longer people looked at it.` },
    { id: 'experiment', body: `Stand up quickly from sitting and pay attention to the first two seconds. Most times you feel nothing at all — and yet gravity just pulled a good deal of your blood toward your feet, and your brain is now a foot higher than it was. Sensors in your neck caught the pressure drop within a heartbeat, your heart rate rose and your vessels tightened before you noticed anything. The fact that standing up is usually uneventful is the loop's whole achievement.` },
    { id: 'smaller', body: `Forget bodies. One question: if you wanted a room to stay warm and you were not allowed to be in the room, what would you build? Something that senses the temperature and turns the heat on when it's low. Now ask the key follow-up: how does the heat get turned off? By the warming itself reaching the sensor. That self-cancelling is the whole of this lesson — and once you see that the answer switches itself off, no manager is needed anywhere.` },
    { id: 'backward', body: `Start with a blood-test printout, the kind with a reference range beside every line. Ask why any of those numbers has a range at all rather than a single value. Because each one is held by a loop, and a loop corrects rather than freezes — it lets the level wander and pulls it back, so the honest description is a band. Work backwards from "why a range and not a number" and you arrive at sensing, signalling, receptors and correction.` }
  ],

  map: [
    { name: `Homeostasis`, level: 4, fresh: true },
    { name: `Receptors and signals`, level: 4 },
    { name: `DNA and proteins`, level: 4 },
    { name: `Cellular energy`, level: 4 },
    { name: `The cell`, level: 5 },
    { name: `Levels of organization`, level: 5 },
    { name: `Molecules`, level: 4 },
    { name: `Atoms and elements`, level: 3 },
    { name: `Water in the body`, level: 3 },
    { name: `Circulation`, level: 2 }
  ]
}
