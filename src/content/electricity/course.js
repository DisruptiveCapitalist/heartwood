import lesson01 from './lessons/lesson-01.js'
import lesson02 from './lessons/lesson-02.js'
import lesson03 from './lessons/lesson-03.js'
import lesson04 from './lessons/lesson-04.js'
import lesson05 from './lessons/lesson-05.js'
import lesson06 from './lessons/lesson-06.js'
import lesson07 from './lessons/lesson-07.js'
import lesson08 from './lessons/lesson-08.js'
import lesson09 from './lessons/lesson-09.js'
import lesson10 from './lessons/lesson-10.js'
import lesson11 from './lessons/lesson-11.js'
import lesson12 from './lessons/lesson-12.js'
import lesson13 from './lessons/lesson-13.js'
import lesson14 from './lessons/lesson-14.js'
import lesson15 from './lessons/lesson-15.js'
import lesson16 from './lessons/lesson-16.js'
import lesson17 from './lessons/lesson-17.js'
import lesson18 from './lessons/lesson-18.js'
import lesson19 from './lessons/lesson-19.js'
import lesson20 from './lessons/lesson-20.js'
import lesson21 from './lessons/lesson-21.js'
import lesson22 from './lessons/lesson-22.js'
import lesson23 from './lessons/lesson-23.js'
import lesson24 from './lessons/lesson-24.js'
import lesson25 from './lessons/lesson-25.js'

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
        { title: `Why a switch has to complete a circle`, lessonId: 'lesson-02' },
        { title: `Voltage: the push, not the stuff`, lessonId: 'lesson-03' },
        { title: `Current: how much goes by, not how fast`, lessonId: 'lesson-04' },
        { title: `Resistance, and why a toaster glows`, lessonId: 'lesson-05' }
      ]
    },
    {
      title: `Power in the House`,
      idea: `Watts, AC and DC, and what the wall is actually doing.`,
      lessons: [
        { title: `What the electric bill actually counts`, lessonId: 'lesson-06' },
        { title: `DC and AC: one way, or back and forth`, lessonId: 'lesson-07' },
        { title: `Why the outlet has three holes`, lessonId: 'lesson-08' },
        { title: `Transformers: trading push for flow`, lessonId: 'lesson-09' },
        { title: `Why one dead bulb used to darken the whole string`, lessonId: 'lesson-10' }
      ]
    },
    {
      title: `Magnets and Motion`,
      idea: `Electricity and magnetism are one thing seen from two sides.`,
      lessons: [
        { title: `The compass needle that flinches near a wire`, lessonId: 'lesson-11' },
        { title: `How a motor turns electricity into spin`, lessonId: 'lesson-12' },
        { title: `How a generator turns spin into electricity`, lessonId: 'lesson-13' },
        { title: `The magnetic field that goes round in a circle`, lessonId: 'lesson-14' },
        { title: `From the power plant to your wall`, lessonId: 'lesson-15' }
      ]
    },
    {
      title: `Electricity From Sunlight`,
      idea: `Light knocks something loose, and a one-way door does the rest.`,
      lessons: [
        { title: `From sunlight to electricity`, lessonId: 'lesson-16' },
        { title: `P-type and N-type silicon: the one-way door`, lessonId: 'lesson-17' },
        { title: `Why a shaded corner hurts the whole panel`, lessonId: 'lesson-18' },
        { title: `Panels in a row, panels side by side`, lessonId: 'lesson-19' },
        { title: `The panel's best moment`, lessonId: 'lesson-20' }
      ]
    },
    {
      title: `Storing and Shaping Power`,
      idea: `Batteries hold it. Electronics reshape it for the house.`,
      lessons: [
        { title: `Finding the best point, all day long`, lessonId: 'lesson-21' },
        { title: `A battery is a chemical spring`, lessonId: 'lesson-22' },
        { title: `Why batteries wear out`, lessonId: 'lesson-23' },
        { title: `The inverter and the pure sine wave`, lessonId: 'lesson-24' },
        { title: `Single-phase and three-phase`, lessonId: 'lesson-25' }
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

  lessons: {
    'lesson-01': lesson01,
    'lesson-02': lesson02,
    'lesson-03': lesson03,
    'lesson-04': lesson04,
    'lesson-05': lesson05,
    'lesson-06': lesson06,
    'lesson-07': lesson07,
    'lesson-08': lesson08,
    'lesson-09': lesson09,
    'lesson-10': lesson10,
    'lesson-11': lesson11,
    'lesson-12': lesson12,
    'lesson-13': lesson13,
    'lesson-14': lesson14,
    'lesson-15': lesson15,
    'lesson-16': lesson16,
    'lesson-17': lesson17,
    'lesson-18': lesson18,
    'lesson-19': lesson19,
    'lesson-20': lesson20,
    'lesson-21': lesson21,
    'lesson-22': lesson22,
    'lesson-23': lesson23,
    'lesson-24': lesson24,
    'lesson-25': lesson25
  },

  nextUp: {
    title: `Week 6 is not written yet`,
    blurb: `Twenty-five lessons. One week left — and in it you do the explaining. I bring the objects; you tell me what is happening inside them.`
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
