// Anatomy & Physiology · Week 6 · Lesson 26 — a loop that runs itself, monthly.
//
// The spec asks for this to be respectful, scientifically accurate and pitched
// at an adult, to explain normal variation, and to separate general education
// from individual assessment. So the ranges are given as typical rather than
// normative, variation is stated as ordinary rather than as a problem, and
// anything that sounds like a personal question goes to a clinician.
//
// The payoff is Lesson 16's, arriving somewhere new: after menopause the
// instruction stays high while the output stays low, which is why a raised FSH
// is read the same way a raised TSH is. One shape, two places.

export default {
  id: 'lesson-26',
  number: 1,
  week: 6,
  title: `The female reproductive system`,
  openingQuestion: `The cycle is usually described as a calendar — this happens on day five, that on day fourteen. But nothing inside anybody is reading a calendar. Four hormones are shaping each other in a loop, and the dates are the result rather than the cause. So what is actually driving the timing?`,
  concept: `A loop that runs itself, monthly`,

  see: {
    voice: 'professor',
    line: `{name}, slide through a cycle slowly and stop at day thirteen. Something happens there that happens nowhere else in the body.`,
    simulation: { id: 'reproduction', props: { mode: 'cycle' } },
    observations: [
      { text: `Four hormones, each shaping the next. The instruction rises, the ovary answers with oestrogen, and the lining builds — none of it on a schedule, all of it in sequence.` },
      { text: `At day thirteen, rising oestrogen tells the pituitary to push **harder** rather than ease off. That burst of LH releases the egg, and it is the one routine place in the body where feedback runs positive.` },
      { text: `And after menopause the instruction stays **high** while the output stays low — exactly the reading an underactive thyroid gives in Lesson 16, for exactly the same reason.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the first says this is not a new system.`,
    sentences: [
      `The ovary is a **gland**, and the same three-storey axis from Lesson 16 runs it: hypothalamus, pituitary, ovary, with the ovary's own hormones feeding back to quieten the instruction. Nothing here is a special mechanism for reproduction.`,
      `The month has **two halves**. Before ovulation, the instruction grows a follicle and oestrogen builds the uterine lining. After it, the remains of that follicle produce **progesterone**, which maintains the lining. If no pregnancy follows, both fall away and the lining is shed.`,
      `And once per cycle the loop **inverts**. High oestrogen, sustained for a day or so, flips the pituitary from "ease off" to "push harder" — the LH surge. Negative feedback holds things steady; this is the body's one routine use of positive feedback, and it exists to produce a single decisive event at a single moment.`
    ],
    sequence: {
      label: `ONE CYCLE, IN ORDER`,
      note: `and about 28 days is an average, not a rule`,
      steps: [
        { name: `Days 1–5`, body: `The lining of the uterus is shed — a period. At the same time FSH is already rising and the next follicle is beginning to grow.` },
        { name: `Days 6–12`, body: `One follicle takes the lead. **Oestrogen** climbs steeply, rebuilding the lining and, as it rises, beginning to change what the pituitary does.` },
        { name: `Day 13–14`, body: `The **LH surge**. Sustained high oestrogen flips the feedback positive, LH spikes, and the follicle releases its egg into the fallopian tube.` },
        { name: `Days 15–22`, body: `What is left of the follicle becomes a temporary gland producing **progesterone**, which holds the lining ready. The egg, fertilised or not, travels down the tube.` },
        { name: `Days 23–28`, body: `With no pregnancy, that temporary gland winds down. Progesterone and oestrogen fall, the lining can no longer be maintained, and the next cycle begins.` },
        { name: `Later in life`, body: `The ovaries gradually stop answering. Output falls, the instruction rises and stays risen, and cycles become irregular and then stop — **menopause**, which is a transition over years rather than an event.` }
      ]
    },
    comparison: {
      label: `A RELAY, NOT A TIMETABLE`,
      body: `In a relay nobody runs to the clock. Each runner goes when the baton arrives, and the race takes however long the handovers take — which is why two races over the same distance finish at different times without anything being wrong. The cycle works this way: each hormone rises because the previous one did, and the "dates" are simply where the handovers usually fall. *Where the analogy stops:* a relay has a fixed order of runners and a finish line. This loop has no finish; it hands back to the start, and it will run several hundred times in a life.`
    },
    naming: `The instruction hormones are **FSH** and **LH**, from the pituitary. The ovary produces **oestrogen** and, after ovulation, **progesterone** — the latter from the **corpus luteum**, the temporary gland left behind by the released follicle. The transition at the end is **menopause**, defined after twelve months without a period, and the often lengthy run-up to it is **perimenopause**. One point of fact worth stating plainly: cycles of roughly 21 to 35 days are all ordinary, cycles vary within the same person from month to month, and variation is not in itself a problem. Whether any particular pattern needs looking at is a question for a doctor, not for a chart.`,
    formalNames: {
      terms: [
        { term: `FSH and LH`, meaning: `The pituitary's instructions. FSH grows the follicle; the LH surge releases the egg. Both rise and stay high when the ovaries stop answering.` },
        { term: `Oestrogen`, meaning: `Made by the growing follicle. Rebuilds the uterine lining — and acts well beyond reproduction, on bone, blood vessels and much else.` },
        { term: `Progesterone`, meaning: `Made after ovulation by the corpus luteum. Maintains the lining. Its fall is what ends the cycle.` },
        { term: `Menopause`, meaning: `The point after twelve months without a period, reached through a transition of several years. Ovarian output falls; the pituitary's instruction rises and remains high.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've come across.`,
    items: [
      `An app for tracking periods, predicting a date.`,
      `An ovulation predictor kit from a chemist.`,
      `The contraceptive pill, and how it is taken.`,
      `Hot flushes, and the years leading up to them.`,
      `A blood test said to "confirm menopause".`,
      `Hormone replacement, and the long argument about it.`
    ],
    builder: {
      body: `Look up how an ovulation predictor kit says it works — the box or the leaflet will tell you. It detects a surge of **LH** in urine, and tells the user that ovulation is likely within a day or so. Now put that against the chart you just watched. The kit is not measuring the egg, or oestrogen, or anything about the uterus. It is watching for the single sharpest spike on that graph — the one moment when the loop runs positive — because that spike is the only unambiguous signal the whole month produces. A shop product, reading one line off this lesson.`
    },
    ownPlaceholder: `Something about this I've wondered or been told…`,
    synthesis: `The pill is the other one worth noticing. Supplying hormones from outside quietens the instruction — the same mechanism as the steroid taper in Lesson 16 and as tomorrow's lesson — and without the instruction, no follicle is grown to release.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend why a period happens — **without using the words "hormone" or "cycle."**`,
    banned: ['hormon', 'cycle'],
    bannedNote: `one of those came back — and the explanation works entirely without either`,
    placeholder: `The lining of the uterus is built up, and it is held there by…`,
    checks: [
      `The lining of the uterus is built up over a couple of weeks.`,
      `After the egg is released, something is produced that holds that lining in place.`,
      `If no pregnancy follows, the thing producing it winds down.`,
      `With nothing maintaining it, the lining can't be held and is shed.`
    ],
    closing: `If your version has "nothing is maintaining it any more", you have the mechanism rather than the calendar — which is the difference this lesson is about.`
  },

  challenge: {
    voice: 'editor',
    line: `One about something sold in a chemist, and one about a blood test.`,
    prediction: {
      question: `An **ovulation predictor kit** tells someone that ovulation is likely in the next day or so. What is it actually detecting?`,
      options: [
        {
          id: 'oestrogen',
          text: `Oestrogen — it's the hormone that's been climbing all week.`,
          verdict: `Reasonable, and oestrogen is indeed the hormone doing most of the work in the first half. But it is a poor signal to detect, because it rises gradually over many days — there is no sharp moment in it to pick out, and a slow rise cannot tell you that today is the day. The kit needs something that spikes, and oestrogen's job here is to cause the spike rather than be it.`
        },
        {
          id: 'lh',
          text: `The LH surge — the sharp spike just before the egg is released.`,
          verdict: `Exactly. The surge is brief, large and unambiguous, which makes it the one thing in the whole month worth building a test around. And it is the one event this lesson singled out as unusual — the moment feedback runs positive. A device in a chemist's shop is reading the body's only routine positive-feedback event, which is a rather lovely thing to know while looking at the packaging.`
        },
        {
          id: 'progesterone',
          text: `Progesterone — that's what rises once the egg has gone.`,
          verdict: `Right about progesterone's timing, and that is exactly the problem: it rises **after** ovulation. A test for it would tell someone that ovulation has already happened, which is useful for confirming a cycle afterwards and no use at all for predicting. Blood progesterone is in fact measured for precisely that confirming purpose, a week or so later.`
        }
      ]
    },
    open: {
      question: `A blood test said to "confirm menopause" measures **FSH** — the pituitary's instruction — and a **high** result is the one that indicates it. Why would the instruction be high when the ovaries are doing less?`,
      placeholder: `If the ovary has stopped answering, then the loop…`,
      reveal: [
        `For precisely the reason an underactive thyroid gives a high TSH. The pituitary senses that the hormones it was expecting are not arriving, and does the only thing it can: ask louder, and keep asking. The instruction rises and stays risen because nothing is coming back to quieten it. A high FSH is not a sign of extra activity — it is the sound of an unanswered call.`,
        `Which is why Lesson 16 was worth doing before this one. The axis is the same, the logic is the same, and once you have seen it in one gland you can read it in any of them. Something similar is true at the other end of life: certain conditions affecting the ovaries produce the same pattern in a much younger person, and it is read the same way.`,
        `One caution, and it matters. FSH fluctuates considerably during the years of transition, so a single result can be misleading in either direction, and menopause is usually recognised from the pattern over time rather than from a number. What any individual result means for a particular person — and whether it needs acting on at all — is a conversation with a doctor. This course can tell you what the number *is*. It cannot tell you what yours means.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes. Then you're done for today.`,
    prompt: `One thing about this I understand now that I didn't this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 27: the same three-storey axis again, running an organ with two separate jobs — and what happens to both of them when the hormone is supplied from outside.`
  },

  routes: [
    { id: 'analogy', body: `A kitchen preparing for a guest who may or may not arrive. For two weeks everything is got ready — the room made up, the table laid. Then there is a moment of commitment, and for another two weeks it is all held in readiness at some expense. If nobody comes, it is cleared away and the whole preparation begins again. Nothing about the clearing-away is a failure; it is simply the end of a preparation that was not needed this time.` },
    { id: 'object', body: `Look at a period-tracking app, if you or someone near you uses one, and notice that it predicts by averaging past months rather than by measuring anything. That is an honest admission about this lesson: the dates are an outcome of a chain of handovers, and the handovers vary. The app is doing the only thing possible from outside — guessing from history — which is why its predictions drift.` },
    { id: 'story', body: `The hormones of this cycle were worked out piece by piece across the first half of the twentieth century, and the last piece was the surge. For years it was assumed that rising oestrogen must suppress the pituitary, because that is what hormones do in every other axis. The finding that it does the opposite, briefly and only above a threshold, took a long time to be accepted — it looked like a mistake in the data rather than the exception that it is.` },
    { id: 'experiment', body: `Take any of the four lines on that chart and cover the other three with a finger. Each one alone is almost meaningless — a hump, a spike, a slow rise. Uncover them together and the sequence appears: this rose because that did, and that fell because this one peaked. Very little in the body makes sense one measurement at a time, and this is as clear a demonstration of it as you will find.` },
    { id: 'smaller', body: `Forget the whole month. One question: if an egg is to be released at a particular moment, what has to tell it to go? Something sharp and unmistakable, because a slow signal cannot mark a moment. Now ask what could produce a sharp signal in a system built entirely on gradual ones — a threshold, crossed, flipping a loop the other way. That is the surge, derived from the requirement for a moment.` },
    { id: 'backward', body: `Start with the fact that the contraceptive pill works by supplying hormones rather than by blocking anything in the uterus. Why would adding hormones prevent a release? Because the pituitary reads them as the ovary's own output and stops asking — and an ovary that is not asked does not grow a follicle to release. Work backwards from that and you arrive at the axis, the feedback, and what the instruction is actually for.` }
  ],

  map: [
    { name: `Reproduction`, level: 4, fresh: true },
    { name: `Hormones and the endocrine system`, level: 5 },
    { name: `Homeostasis`, level: 5 },
    { name: `Receptors and signals`, level: 5 },
    { name: `Bone and the skeleton`, level: 5 },
    { name: `Circulation`, level: 5 },
    { name: `The cell`, level: 5 },
    { name: `DNA and proteins`, level: 5 },
    { name: `Evaluating health claims`, level: 5 },
    { name: `Levels of organization`, level: 5 }
  ]
}
