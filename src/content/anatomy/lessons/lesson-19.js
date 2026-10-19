// Anatomy & Physiology · Week 4 · Lesson 19 — four organs, many signals.
//
// The spec is explicit that metabolic health must not be reduced to a single
// hormone, so the simulation carries a panel of twelve other inputs and this
// lesson treats insulin as one lever among many rather than as the story.
//
// Measured off the simulation: about 400 kcal of liver glycogen against roughly
// 100,000 in fat — a factor of 250. And muscle glycogen is private, because
// muscle lacks the enzyme to release glucose back to the blood. Both facts are
// commonly unknown and both change how the whole picture looks.

export default {
  id: 'lesson-19',
  number: 4,
  week: 4,
  title: `Metabolism, insulin and energy balance`,
  openingQuestion: `"Metabolism" gets used to mean so many things that it has stopped meaning much — a speed you were born with, a thing that slows down, something a food can boost. Underneath the word is a genuine and rather elegant problem: you eat in bursts and spend continuously, so something has to store the surplus and release it again. How is that actually arranged?`,
  concept: `Four organs, many signals`,

  see: {
    voice: 'professor',
    line: `{name}, run the clock out to a full day and compare the liver's bar with the fat one. Then read the numbers printed underneath them.`,
    simulation: { id: 'fuel-store' },
    observations: [
      { text: `The liver holds about **400 calories**. The fat store holds something like **100,000** — two hundred and fifty times as much.` },
      { text: `Muscle keeps a large store and **cannot share it**. It lacks the enzyme to put glucose back into the blood, so those calories are for its own use only.` },
      { text: `By a day without food, fat was carrying **more than four-fifths** of it — and the panel of *other* things setting that listed twelve, not one of which was insulin.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first one clears the word out of the way.`,
    sentences: [
      `**Metabolism** is simply all the chemistry keeping you alive — building, breaking down, storing, releasing. It is not a speed you possess. Most of the difference between two people's daily energy use is explained by how big they are and how much of them is muscle.`,
      `The arrangement solves two opposite problems: **put it away** when food arrives, and **get it back out** when it does not. Insulin is the main signal for the first. Glucagon and several others handle the second.`,
      `And four organs share the work — **liver, muscle, fat and pancreas** — with no one of them in charge and no single hormone setting the outcome. Genetics, food, activity, sleep, illness and medicines all move the same levers.`
    ],
    sequence: {
      label: `WHERE THE ENERGY ACTUALLY IS`,
      note: `and which of it you can reach`,
      steps: [
        { name: `In the blood`, body: `About four grams of glucose — a teaspoon, for the whole body. Enough for a few minutes, which is why it is defended so fiercely.` },
        { name: `Liver · ~400 kcal`, body: `The current account. Small, and the only store that can hand glucose back to the blood for everyone else. It carries you overnight and is largely spent within a day.` },
        { name: `Muscle · ~1,600 kcal`, body: `A locked savings account. Larger, and private — muscle can spend its own and cannot give any to the blood, because it lacks the one enzyme that would let it.` },
        { name: `Fat · ~100,000 kcal`, body: `The pension. Vast, slow to reach, and what you have been running on for most of every night of your life.` },
        { name: `Why the shape matters`, body: `A small, shareable store and an enormous, slow one. Almost everything that feels like "running out of energy" is the small one emptying, not the large one.` }
      ]
    },
    comparison: {
      label: `THREE ACCOUNTS AT THE BANK`,
      body: `A current account with a few hundred pounds that anyone in the household can draw on; a savings account in one person's name that only they can touch; and a pension worth more than the house, which you can reach but not quickly. Run the current account down and the day feels difficult, even though the pension is untouched and enormous. That is precisely the sensation of being hungry at four in the afternoon while carrying several weeks of energy on your hips. *Where the analogy stops:* you can transfer money between accounts freely. Your body can fill the muscle account and never withdraw from it to pay anyone else.`
    },
    naming: `The stored form of glucose is **glycogen**, a branching chain of it, kept in liver and muscle. The energy you would spend lying perfectly still all day is your **basal metabolic rate**, and it accounts for the majority of what most people use — which is why it is so much less adjustable than advertising suggests. When cells respond less to a given amount of insulin, that is **insulin resistance**, a real and important state with many contributors and no single cause. What any of it means for a particular person is a question for a doctor with measurements, not for a course.`,
    formalNames: {
      terms: [
        { term: `Glycogen`, meaning: `Glucose stored as a branched chain. Liver glycogen is shareable; muscle glycogen is not, for want of one enzyme.` },
        { term: `Basal metabolic rate`, meaning: `What you spend doing nothing. Mostly predicted by body size and muscle mass; it varies between similar people by rather less than people expect.` },
        { term: `Insulin resistance`, meaning: `Cells responding less to the same insulin, so more is needed for the same effect. Many contributors — not one cause and not one fix.` },
        { term: `Lipolysis`, meaning: `Releasing fat from storage for use. Driven by several signals when insulin is low, which is most of the night, every night.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've heard or felt.`,
    items: [
      `Someone explaining their weight by having "a slow metabolism".`,
      `Runners eating pasta the night before a race.`,
      `Feeling shaky and irritable when a meal is very late.`,
      `A food or drink advertised as boosting metabolism.`,
      `Being told blood sugar is higher first thing in the morning than at bedtime.`,
      `Losing several pounds in the first days of a diet, then slowing right down.`
    ],
    builder: {
      body: `Take any packaged food out of the cupboard and read the calories on the label. Now compare it with the number from this lesson: your whole liver store is about four hundred. A single substantial meal often exceeds it. That is not a reason to think anything in particular about the meal — it is a way of feeling the scale of the arrangement. The store that carries you through every night of your life is smaller than a modest dinner, which is exactly why there has to be a second, enormous one behind it.`
    },
    ownPlaceholder: `Something about energy or food I've wondered about…`,
    synthesis: `The last one is worth knowing: the first few pounds of any diet are largely glycogen and the water stored with it — each gram of glycogen holds about three of water. Which is why it goes fast and comes back fast, and tells you very little.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain why you don't run out of energy overnight, even though you ate nothing for eight hours — **without using the words "glycogen" or "metabolism."**`,
    banned: ['glycogen', 'metabolis'],
    bannedNote: `one of those came back — and the idea is two stores of very different sizes`,
    placeholder: `There's a small store that can be shared out, and…`,
    checks: [
      `There is a small store that can be handed back to the blood, in the liver.`,
      `It is enough for roughly a night, and it does run down.`,
      `Behind it is a vastly larger store, as fat, which takes over as the small one empties.`,
      `And blood sugar is held steady the whole time by signals working in both directions.`
    ],
    closing: `If your version has two stores of very different sizes in it, you understand more about this than most of what gets written about diet.`
  },

  challenge: {
    voice: 'editor',
    line: `One about a phrase everyone uses, and one about something that cannot be done.`,
    prediction: {
      question: `"I have a slow metabolism." Is there such a thing?`,
      options: [
        {
          id: 'no',
          text: `No — it's an excuse. Everyone's body works at much the same rate.`,
          verdict: `Too harsh, and wrong on the facts. People of the same size and composition genuinely do differ in what they burn at rest, by something in the order of ten to fifteen per cent in either direction, and that is a real difference that a person living in their own body would notice. Dismissing it is both unkind and inaccurate, and it is the reason the phrase gets used defensively in the first place.`
        },
        {
          id: 'modest',
          text: `Yes, but the variation is modest — size and muscle explain most of the difference between people.`,
          verdict: `This is the honest answer. Body size and how much muscle you carry predict the great majority of what someone spends at rest; the unexplained remainder is real but much smaller than the phrase implies. So two people of the same build will differ somewhat, and a larger person will almost always burn more than a smaller one — which is the opposite of how "slow metabolism" is usually pictured. Both halves of that matter: the variation exists, and it is not usually the main thing going on.`
        },
        {
          id: 'huge',
          text: `Yes, and it varies enormously — some people burn several times what others do.`,
          verdict: `Several-fold differences do exist, but between a sleeping adult and a cyclist mid-race, not between two people sitting in the same room. The confusion is understandable because total daily spending varies far more than resting rate does — activity, including the fidgeting kind nobody counts, is genuinely variable. But that is a difference in what people *do*, not in what their cells are like.`
        }
      ]
    },
    open: {
      question: `A great many exercises are sold on the promise of taking fat off one particular place — the belly, the upper arms. It does not work, and it has been tested repeatedly. Given how fat is released, **why** can't it work?`,
      placeholder: `If the signal to release fat travels in the blood, then…`,
      reveal: [
        `Because the instruction to release fat arrives by blood, and blood goes everywhere. Signals circulating when insulin is low reach every fat cell in your body at once, and each responds according to its own receptors and its own local blood supply — none of which is affected by which muscle happens to be working nearby. Working a muscle hard burns energy; it does not direct the withdrawal to the fat sitting on top of it.`,
        `Where fat comes off first is set mostly by inheritance and by hormonal pattern, and it is remarkably consistent within a person and remarkably variable between people. It is one of the clearer cases where effort and outcome are genuinely disconnected, and where a great deal of money is made from implying otherwise.`,
        `Notice that the reasoning is the same one from Lesson 5. A broadcast cannot be addressed. Whether the message is insulin telling cells to store, or the signals that tell fat to release, it reaches everything with the matching receptor and nothing else decides. Half of this course now hangs on that single property of chemical signalling.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about how my body stores and spends energy that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 20 — the last of the week, and the one the whole course has been building toward. You will take everything from the last four days and point it at a shelf full of products.`
  },

  routes: [
    { id: 'analogy', body: `A house with a log basket by the fire and a woodshed at the end of the garden. The basket holds an evening's worth and is the only wood you can actually reach without getting up; the shed holds the winter. Nobody heats a house from the basket alone, and nobody runs out to the shed for every log. Running out of basket feels like running out of wood, and it never is.` },
    { id: 'object', body: `Pick up a bag of sugar from the cupboard — a kilogram is around four thousand calories. Your entire liver store is a tenth of that bag. Now consider that an average adult carries ten to fifteen kilograms of fat, which at nine calories a gram is a hundred thousand or so. You are holding, in one hand, about two and a half times the store that gets you through every night.` },
    { id: 'story', body: `In the 1920s, surgeons removing a dog's pancreas found it developed diabetes, which is how the role of the organ was pinned down. What took much longer to accept was that the pancreas was two organs in one — a digestive gland with a scattering of hormone-making islands through it, doing something entirely unrelated. Those islands amount to about two per cent of the organ, and they are the reason the word insulin exists: from insula, an island.` },
    { id: 'experiment', body: `Notice what happens the next time a meal is unusually late. The shakiness, the irritability, the difficulty concentrating — all of it appears while you are carrying tens of thousands of calories of fat. You are not short of energy in any absolute sense. You are short of the one store your brain can draw on quickly, and the whole experience is a signal designed to make a person go and find food.` },
    { id: 'smaller', body: `Forget hormones. One question: if you eat three times a day and spend energy twenty-four hours a day, what must exist? A store, and a way to get into it. Now ask why one store would not be enough — because the shareable kind is expensive to carry and holds water with it, and the dense kind is slow to reach. Two stores of different sizes is the only arrangement that solves both problems, and that is what you have.` },
    { id: 'backward', body: `Start with the fact that the first few pounds of any diet come off fast and then it slows dramatically. Why would that be, if fat loss were steady? Because the first thing to go is not fat at all — it is the glycogen store and the water bound to it, three grams of water for every gram of glycogen. Work backwards from a fast start that always stalls and you arrive at two stores, their sizes, and what each is actually made of.` }
  ],

  map: [
    { name: `Metabolism and energy balance`, level: 4, fresh: true },
    { name: `Hormones and the endocrine system`, level: 5 },
    { name: `Cellular energy`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Evaluating health claims`, level: 4 },
    { name: `Circulation`, level: 5 },
    { name: `Muscles and movement`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `The cell`, level: 5 }
  ]
}
