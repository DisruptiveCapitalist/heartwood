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

// Heartwood's third class, and the first with no prerequisite — it does not
// stand on Physics I the way Electricity & Energy does.
//
// The course spec (§8) attaches health-safety rules to this subject that the
// other two classes never needed, and they are not decoration: the class
// explains how bodies work in general, never asks the learner about their own
// health, and never diagnoses or recommends treatment. That is why the second
// principle card below is "Understanding, not diagnosis" rather than the
// "standing on" card the other classes carry, and why no lesson stores anything
// about the learner's body — Lesson 1's weight slider is arithmetic only and is
// deliberately never persisted.

export default {
  id: 'anatomy',
  order: 3,
  status: 'open',
  title: `Anatomy & Physiology`,
  subtitle: `The Human Body, from the Cell to the Whole Person`,
  blurb: `Cells, heart, bones, hormones, immunity and medicines — how the body works as one connected system.`,
  meta: `Six weeks · 30 minutes a day · No prerequisites · Understanding over memorization`,

  weeks: [
    {
      title: `The Amazing World Inside Us`,
      idea: `From atoms to living cells.`,
      lessons: [
        { title: `What are we made of?`, lessonId: 'lesson-01' },
        { title: `The cell: a tiny living world`, lessonId: 'lesson-02' },
        { title: `Mitochondria and the energy of life`, lessonId: 'lesson-03' },
        { title: `Proteins, peptides and DNA`, lessonId: 'lesson-04' },
        { title: `How cells communicate and become tissues`, lessonId: 'lesson-05' }
      ]
    },
    {
      title: `Transport and Control`,
      idea: `Blood, heart, nerves and temperature.`,
      lessons: [
        { title: `The heart: more than a pump`, lessonId: 'lesson-06' },
        { title: `Blood, arteries, veins and capillaries`, lessonId: 'lesson-07' },
        { title: `Oxygen, the lungs and what cells need`, lessonId: 'lesson-08' },
        { title: `Why do hands and feet get cold?`, lessonId: 'lesson-09' },
        { title: `The nervous system: signals at extraordinary speed`, lessonId: 'lesson-10' }
      ]
    },
    {
      title: `Bones, Muscles and Movement`,
      idea: `The living framework of the body.`,
      lessons: [
        { title: `Bones are living tissue` },
        { title: `What are bones made of?` },
        { title: `Joints, cartilage, tendons and ligaments` },
        { title: `The major muscles and how they work` },
        { title: `Movement, recovery and aging` }
      ]
    },
    {
      title: `The Body's Chemical Messengers`,
      idea: `Hormones, receptors, metabolism and peptides.`,
      lessons: [
        { title: `The endocrine system: messages through the body` },
        { title: `Hormones and peptides: alike and different` },
        { title: `Receptors: how cells receive instructions` },
        { title: `Metabolism, insulin and energy balance` },
        { title: `Peptides in health: evidence, possibilities and risks` }
      ]
    },
    {
      title: `Defense, Repair, Disease and Cancer`,
      idea: `How the body protects itself — and what can go wrong.`,
      lessons: [
        { title: `The immune system: recognizing a threat` },
        { title: `Inflammation, fever and healing` },
        { title: `Infection, disease and the body's response` },
        { title: `Cancer: when cells stop following the rules` },
        { title: `How the body detects and responds to abnormal cells` }
      ]
    },
    {
      title: `Reproduction, Medicines and the Whole Body`,
      idea: `Seeing the body as one connected system.`,
      lessons: [
        { title: `The female reproductive system` },
        { title: `The male reproductive system and human reproduction` },
        { title: `How medicines work in the body` },
        { title: `The digestive system, liver and kidneys` },
        { title: `The whole person: connecting the systems` }
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
    'lesson-10': lesson10
  },

  nextUp: {
    title: `Week 3 is not written yet`,
    blurb: `Two weeks done — the cell and its chemistry, then the transport and control systems that supply it. Next: the frame that carries all of it, starting with the fact that bone is alive.`
  },

  journalPrompts: [
    `Today I finally understood…`,
    `I see this differently now…`,
    `I noticed this in myself…`,
    `I still don't understand…`,
    `A better question I could ask…`
  ],

  closing: [
    {
      label: `THE MEASURE OF SUCCESS`,
      body: `Not a passing grade. Feeling your own pulse, reading a medicine label, hearing a health claim on the news — and a little voice says *I know what's happening in there.*`
    },
    {
      label: `UNDERSTANDING, NOT DIAGNOSIS`,
      body: `This course explains how bodies work in general. It never asks about your own health, and it does not diagnose or recommend treatment. It helps you ask better questions of the people who can.`
    },
    {
      label: `THE ONE RULE`,
      body: `"I don't get it" is the most useful sentence here. Say it and the explanation changes direction — it is never simply repeated.`,
      tone: 'green'
    }
  ]
}
