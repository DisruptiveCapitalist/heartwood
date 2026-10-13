import lesson01 from './lessons/lesson-01.js'

// Heartwood's second class. The learner's original brief said electricity
// deserved a course of its own eventually; this is it, and it deliberately
// stands on Physics I rather than starting over — Lesson 14 of that course
// ended with a falling weight becoming electricity, and this one picks the
// story up at the other end.

export default {
  id: 'electricity',
  order: 2,
  status: 'open',
  title: `Electricity & Energy`,
  subtitle: `The Power You Never See`,
  blurb: `From a lamp switch to rooftop solar — where the power in your house comes from, and how it gets there.`,
  after: `Physics I`,
  meta: `Six weeks · 30 minutes a day · Builds on Physics I · Understanding over memorization`,

  weeks: [
    {
      title: `What Electricity Is`,
      idea: `It's already in the wire. All you ever supply is the push.`,
      lessons: [
        { title: `The lamp that doesn't wait`, lessonId: 'lesson-01' },
        { title: `Why a switch has to complete a circle` },
        { title: `Voltage: the push, not the stuff` },
        { title: `Current: how much goes by, not how fast` },
        { title: `Resistance, and why a toaster glows` }
      ]
    },
    {
      title: `Power in the House`,
      idea: `Watts, AC and DC, and what the wall is actually doing.`,
      lessons: [
        { title: `What the electric bill actually counts` },
        { title: `DC and AC: one way, or back and forth` },
        { title: `Why the outlet has three holes` },
        { title: `Transformers: trading push for flow` },
        { title: `Why one dead bulb used to darken the whole string` }
      ]
    },
    {
      title: `Magnets and Motion`,
      idea: `Electricity and magnetism are one thing seen from two sides.`,
      lessons: [
        { title: `The compass needle that flinches near a wire` },
        { title: `How a motor turns electricity into spin` },
        { title: `How a generator turns spin into electricity` },
        { title: `The magnetic field that goes round in a circle` },
        { title: `From the power plant to your wall` }
      ]
    },
    {
      title: `Electricity From Sunlight`,
      idea: `Light knocks something loose, and a one-way door does the rest.`,
      lessons: [
        { title: `From sunlight to electricity` },
        { title: `P-type and N-type silicon: the one-way door` },
        { title: `Why a shaded corner hurts the whole panel` },
        { title: `Panels in a row, panels side by side` },
        { title: `The panel's best moment` }
      ]
    },
    {
      title: `Storing and Shaping Power`,
      idea: `Batteries hold it. Electronics reshape it for the house.`,
      lessons: [
        { title: `Finding the best point, all day long` },
        { title: `A battery is a chemical spring` },
        { title: `Why batteries wear out` },
        { title: `The inverter and the pure sine wave` },
        { title: `Single-phase and three-phase` }
      ]
    },
    {
      title: `Energy Is Everywhere`,
      idea: `This week you become the electrician. I bring the objects; you explain them.`,
      lessons: [
        { title: `A flashlight and a toaster` },
        { title: `A refrigerator and a ceiling fan` },
        { title: `A car's alternator and a hybrid's brakes` },
        { title: `Your house, from the meter inward` },
        { title: `The Heartwood Energy Challenge` }
      ]
    }
  ],

  lessons: { 'lesson-01': lesson01 },

  nextUp: {
    title: `Lesson 2 is not written yet`,
    blurb: `Lesson 1 is done and the format holds. Next: why a switch has to complete a circle — and why a bird can sit on a power line and feel nothing at all.`
  },

  journalPrompts: [
    `Today I finally understood…`,
    `I see this differently now…`,
    `I noticed this in real life…`,
    `I still don't understand…`,
    `Something I want to explore…`
  ],

  closing: [
    {
      label: `THE MEASURE OF SUCCESS`,
      body: `Not a passing grade. Standing at a fuse box, a solar panel or a charging car — and a little voice says *I know what's happening here.*`
    },
    {
      label: `STANDING ON PHYSICS I`,
      body: `Energy, conservation and efficiency were settled in Physics I. This class does not re-teach them; it spends them. Lesson 14 of that course ended with a falling weight becoming electricity, and this one begins where it arrives.`
    },
    {
      label: `THE ONE RULE`,
      body: `"I don't get it" is the most useful sentence here. Say it and the explanation changes direction — it is never simply repeated.`,
      tone: 'green'
    }
  ]
}
