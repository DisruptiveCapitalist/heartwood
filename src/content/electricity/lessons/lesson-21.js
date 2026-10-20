// Electricity & Energy · Week 5 · Lesson 21 — chasing the knee all day.
//
// Measured off the simulation. One 402 W panel, three days, against a fixed
// operating voltage the learner chooses:
//
//                 MPPT      24 V   27 V   28 V   30 V   32 V   34 V
//   summer      2.88 kWh     87%    96%    98%    96%    79%    40%
//   winter      1.38 kWh     75%    85%    88%    94%    98%    98%
//   cloudy      1.68 kWh     82%    92%    95%    98%    95%    72%
//
// The honest finding is better than the sales pitch. On any ONE day a
// well-chosen fixed voltage is very nearly as good as tracking — 28 V gets 98%
// of a summer day. The trouble is that 28 V then loses 12% in January, and the
// 32 V that wins in January throws away 21% in July.
//
// So the case for tracking is not a large gain on a particular afternoon. It is
// that the knee in July and the knee in January are not in the same place, and
// no fixed choice can be right in both. Nothing the learner can set clears 95%
// on all three days.
//
// The algorithm itself is worth naming because it is so plain: nudge the
// voltage, see whether the power went up, and if it did, nudge again the same
// way. Perturb and observe, a few times a second, for twenty-five years.

export default {
  id: 'lesson-21',
  number: 1,
  week: 5,
  title: `Finding the best point, all day long`,
  openingQuestion: `Yesterday ended with a panel sitting on one point of its curve, and a warning that the point moves. It moves more than you would think: the knee drifts from about 33 volts on a freezing morning down to 27.6 on a hot afternoon, and jumps vertically every time a cloud crosses. So could you just pick a good voltage once and leave it?`,
  concept: `Right once is wrong later`,

  see: {
    voice: 'professor',
    line: `{name}, try to find one fixed voltage that collects at least 95% on all three days. Read the row along the bottom. You will not manage it.`,
    simulation: { id: 'tracker' },
    observations: [
      { text: `On a **summer day**, holding a steady 28 V collects 98% of what tracking gets. For one day, a well-chosen fixed voltage is very nearly as good — which is not the usual sales pitch.` },
      { text: `But the **same 28 V loses 12% in January**, when the cold pushes the knee up to 33. And the 32 V that wins in January throws away 21% in July.` },
      { text: `**No fixed voltage clears 95% on all three days.** That is the case for tracking: not a big win on any one afternoon, but never being wrong in any season.`, emphasis: true }
    ]
  },

  understand: {
    voice: 'professor',
    line: `Three sentences, and the third describes an algorithm so simple you could do it by hand.`,
    sentences: [
      `The knee **moves in two directions for two different reasons**. Sunlight sets the current, so cloud slides the whole curve up and down within seconds. Temperature sets the voltage, so the knee drifts sideways across the day and across the seasons. A panel's best operating point in January is simply not where it is in July.`,
      `So anything that pins the panel to a **fixed voltage** — a battery wired straight to it, or a cheap controller that just connects the two — is right occasionally and wrong the rest of the time. The loss is not dramatic on a good day, which is exactly why it went unnoticed for years. It is dramatic across a year, and in the cold.`,
      `The fix is a converter that sits between the panel and everything else and **chooses the panel's voltage independently of the battery's**. It takes whatever the panel likes to give and converts it, trading volts for amps the way a transformer does — and then it hunts, continuously, for the point where the power is greatest.`
    ],
    sequence: {
      label: `HOW A TRACKER ACTUALLY FINDS THE KNEE`,
      note: `the common algorithm, and it is genuinely this simple`,
      steps: [
        { name: `Measure the power`, body: `Volts times amps, right now. That is the only instrument it has, and the only one it needs.` },
        { name: `Nudge the voltage`, body: `Move the operating point a fraction of a volt in some direction. It does not matter which way to begin with.` },
        { name: `Measure again`, body: `Did the power go up or down? Up means the knee is that way; down means it is the other way.` },
        { name: `Keep going, or turn round`, body: `Carry on in the direction that helped, until it stops helping. That is the top of the hill, and it has been found without knowing anything about silicon.` },
        { name: `Then never stop`, body: `Repeat a few times a second, for twenty-five years. The point is always drifting, so the hunt never finishes — it simply keeps up.` },
        { name: `The catch is partial shade`, body: `Shading can give the curve **two** humps, and a hill-climber settles on whichever it finds first. Good trackers periodically sweep the whole curve to check they are on the taller one.` }
      ]
    },
    comparison: {
      label: `TUNING AN OLD RADIO`,
      body: `Nobody tuning an analogue radio ever calculated a frequency. You turned the dial and listened: clearer means keep turning that way, worse means go back. You found the peak by walking towards it, with no theory about what a radio station is. A tracker does exactly this with wattage instead of hiss, several times a second, and finds a point it could not have computed in advance because it depends on this panel, this temperature and this cloud. *Where the analogy stops:* a radio station stays put. The knee does not, so the tuning is never finished — and if the band had two stations close together, a listener might settle on the weaker one and never know. That is precisely what happens to a tracker under partial shade, and why the better ones occasionally sweep the whole dial to check.`
    },
    naming: `Hunting the best point is **maximum power point tracking**, universally shortened to **MPPT**, and the hill-climbing method above is **perturb and observe**. The device is an **MPPT charge controller** on a battery system or part of the **inverter** on a grid-tied one. The older and cheaper sort, which simply connects the panel to the battery and chops the connection on and off to limit charging, is a **PWM controller** — it cannot choose the panel's voltage at all. The voltage range a tracker can work across is the **MPPT window** from Lesson 19, and now the name makes sense. One honest note: MPPT hardware is not free and the converter itself loses two or three per cent. On a small, warm, well-matched system a PWM controller can genuinely be the better buy, and the marketing claims of "30% more power" describe a badly matched system rather than a typical one.`,
    formalNames: {
      terms: [
        { term: `MPPT`, meaning: `Maximum power point tracking. Continuously hunting the knee of the panel's curve as light and temperature move it.` },
        { term: `Perturb and observe`, meaning: `The usual algorithm: nudge the voltage, see if power rose, keep going that way. Hill-climbing, with no model of the panel at all.` },
        { term: `PWM controller`, meaning: `The cheaper alternative, which connects the panel straight to the battery and cannot choose the panel's voltage. Fine when well matched, poor when cold.` },
        { term: `Local maximum`, meaning: `The second, smaller hump partial shading puts in the curve. A hill-climber can settle on it and sit there, which is why good trackers sweep periodically.` }
      ]
    }
  },

  connect: {
    voice: 'roommate',
    line: `Tap any of these you've come across.`,
    items: [
      `A solar charge controller with a display showing watts.`,
      `Tuning an old radio by ear rather than by number.`,
      `A thermostat that overshoots and then settles.`,
      `An app that reports yesterday's solar generation.`,
      `A cheap solar garden light, with no electronics at all.`,
      `Cruise control hunting on a long hill.`
    ],
    builder: {
      body: `If you or anyone you know has a solar system with monitoring, look at the generation graph for a cloudy day rather than a sunny one. A clear day gives a smooth arch and tells you very little. A broken-cloud day is a mountain range — spikes and troughs within minutes — and every one of those edges is the tracker rediscovering the knee from scratch. Look also for brief spikes **above** the system's rated output, which happen when a cloud edge focuses extra light onto the array while the panels are still cool. That is a tracker catching a few seconds that a fixed-voltage system would largely have missed.`
    },
    ownPlaceholder: `Something that finds its best setting by trial rather than calculation…`,
    synthesis: `Hill-climbing is one of the most useful ideas in engineering precisely because it needs no theory of the thing it is optimising. The tracker has never heard of band gaps or depletion regions. It knows only whether the last nudge helped.`
  },

  feynman: {
    line: `Teach it back.`,
    instruction: `Explain to a friend how a solar controller finds the best setting — **without using the words "maximum" or "track."**`,
    banned: ['maximum', 'track'],
    bannedNote: `one of those came back — and the hill-climbing idea needs neither`,
    placeholder: `It changes the setting slightly and sees whether it got more power…`,
    checks: [
      `It measures the power, then changes the setting slightly and measures again.`,
      `If the power rose it keeps going that way; if it fell it turns round.`,
      `It never calculates the answer — it feels its way to the top of a hill.`,
      `And since the hill keeps moving, it has to do this forever rather than once.`
    ],
    closing: `If your version has "it keeps checking because the answer changes," you have the reason the device exists — and why a one-off setting could never do the job.`
  },

  challenge: {
    voice: 'editor',
    line: `One about where tracking earns its keep, and one about the failure mode.`,
    prediction: {
      question: `On which day does an MPPT controller gain **most** over a well-chosen fixed voltage?`,
      options: [
        {
          id: 'cold',
          text: `A cold, clear winter day.`,
          verdict: `Correct, and it is the opposite of what the brochures imply. Cold raises the panel's voltage — the knee climbs to about 33 V — while a battery or a fixed setting stays exactly where it was. That is the largest mismatch of the year, and the simulation shows a 28 V setting collecting only 88% of what tracking gets, against 98% in summer. A tracker earns its money in January, not July. The irony is that January is also when the array generates least, so the absolute kilowatt-hours recovered are modest even as the percentage is at its best.`
        },
        {
          id: 'hot',
          text: `The hottest day of summer, when there is most power to lose.`,
          verdict: `There is certainly the most energy at stake, and that makes the answer tempting. But heat pulls the knee **down** towards where a typical battery or fixed setting already sits — around 27 to 28 volts — so a hot afternoon is when a fixed voltage happens to be nearly right. The simulation puts a fixed 28 V at 98% of tracking on a summer day. The mismatch is small precisely when the sunshine is strongest, which is why fixed-voltage systems went unquestioned for so long.`
        },
        {
          id: 'cloudy',
          text: `A day of broken cloud, when conditions change constantly.`,
          verdict: `This is the best of the wrong answers, and it contains something true: cloud makes the tracker work hardest, and a tracker that is slow to respond genuinely does lose on those edges. But cloud mostly moves the curve **up and down** rather than sideways, and a fixed voltage copes with vertical movement reasonably well — the simulation gives 95% for a fixed 28 V on the cloudy day. It is sideways movement that defeats a fixed setting, and that comes from temperature, not cloud.`
        }
      ]
    },
    open: {
      question: `A hill-climbing tracker nudges the voltage and keeps going whichever way the power improved. What happens to such a device when partial shade puts **two** humps in the curve — and what would you do about it?`,
      placeholder: `It might climb the wrong hill and stay there…`,
      reveal: [
        `It can settle on the smaller hump and sit there quite contentedly, reporting that every nudge in either direction makes things worse — which is true, locally, and completely misses that there is a taller peak elsewhere on the curve. This is the classic failure of every hill-climbing method, in optimisation generally and not just in solar: it finds **a** peak, not **the** peak. Lesson 18's bypass diodes are the direct cause, because each one that conducts puts another hump in the panel's curve.`,
        `The fix is to stop trusting the local view occasionally. Good trackers perform a periodic **global sweep** — every few minutes they abandon hill-climbing, run the voltage across the whole window measuring as they go, find the true highest point, and resume hunting from there. It costs a second or two of imperfect output to avoid hours of sitting on the wrong hill, which is a trade worth making whenever shade is likely.`,
        `It is worth noticing that this is the same problem Week 4 ended on, arriving from the other side. Lesson 18 asked whether to give every panel its own electronics; one of the real arguments for doing so is that a single panel under uniform light has only **one** hump, so its tracker cannot be fooled. Split the array into twenty independent trackers and the two-hump problem largely disappears. Tomorrow we turn to the other half of a solar system — what happens to all this power when the sun goes down, and why a battery is better thought of as a spring than as a tank.`
      ]
    }
  },

  reflect: {
    voice: 'journal',
    line: `Two minutes, then stop.`,
    prompt: `One thing about how a solar system is controlled that I didn't understand this morning:`,
    placeholder: `Today I finally understood…`,
    mapFooter: `Concepts move backward as well as forward. Nothing here is a grade.`,
    tomorrow: `Tomorrow, Lesson 22 — the sun goes down and the house keeps running. A battery is usually described as a tank you fill and empty, which is wrong in a way that matters. It is closer to a spring, and nothing inside it is consumed at all.`
  },

  routes: [
    { id: 'analogy', body: `Finding the warmest spot in an old house by walking around with your hand out. You do not calculate where the radiator is; you move, feel whether it got warmer, and carry on that way. It works perfectly and needs no understanding of plumbing. The catch is that if there are two radiators you may settle by the smaller one, which is exactly the trouble a tracker has under partial shade.` },
    { id: 'object', body: `A cheap solar garden light has no tracker at all — the panel is wired almost straight to a small battery, and the mismatch is enormous and nobody minds, because it only has to run one LED. Now consider a rooftop system where a few per cent is worth real money every year for twenty-five years. The hardware differs because the stakes do, not because the physics changed.` },
    { id: 'story', body: `Early solar systems wired panels directly to batteries, which pinned a panel whose best point was 17 volts to a battery sitting at 13. A quarter of the output was thrown away and nobody could see it happening, because there was nothing to compare against. Electronic tracking arrived in the 1980s and recovered it. The physics had been understood since the 1950s; what was missing was cheap enough switching electronics to act on it.` },
    { id: 'experiment', body: `If you have a small solar panel and a multimeter, you can be the tracker. Connect various resistances across the panel in sun — different resistors, a lamp, a motor — and for each one measure the voltage and current and multiply them. You will find the product rises, peaks and falls as the load changes. Then shade the panel slightly and do it again: the best load has moved. That hunt is the entire device.` },
    { id: 'smaller', body: `Forget algorithms and windows. Two sentences: the best setting for a solar panel changes with the weather and the season, so no single fixed setting is right for long. A tracker simply keeps nudging the setting and keeping whatever nudge made more power.` },
    { id: 'backward', body: `Start from a puzzle in the specifications: solar charge controllers come in two prices, and the expensive sort is sold on the promise of "up to 30% more power" from identical panels. How can the same panel in the same sun give more power? It cannot — but it can be **asked** for its power at a better voltage. Work backwards from that claim and you arrive at the knee, and at the fact that a battery has no idea where it is.` }
  ],

  map: [
    { name: `Tracking the best point`, level: 4 },
    { name: `Solar panels`, level: 5 },
    { name: `Sunlight to electricity`, level: 5 },
    { name: `Semiconductors`, level: 4 },
    { name: `The grid`, level: 5 },
    { name: `Power`, level: 5 },
    { name: `Current — the flow`, level: 5 },
    { name: `Voltage — the push`, level: 5 },
    { name: `Resistance`, level: 5 },
    { name: `Energy (from Physics I)`, level: 5 }
  ]
}
