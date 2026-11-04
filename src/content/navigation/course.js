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
import { COMPLETION, NAVIGATION_ROUTE_IDS } from '../schema.js'

// Heartwood's fifth class, and the first to change two of the engine's rules.
//
// `completeOn: COMPLETION.FEYNMAN` — a Navigation lesson counts as done when
// the explanation has been written, not when REFLECT has been reached. The
// learner asked for this after using the other courses: on this subject the
// explanation IS the lesson, so arriving at the end without writing one should
// not read as finished. Nothing is locked either way; every stage stays open
// and freely navigable, and the REFLECT banner says plainly what is missing.
//
// `routeIds` — seven doors rather than six, and three of the shared ones are
// named differently. A compass and a map are the subject's own tools, so they
// get their own ways in.
//
// The other difference is in the content: each tradition appears as an ACROSS
// CULTURES card in the CONNECT IT stage of the lesson whose skill it
// illustrates, rather than being gathered into one lesson at the end. Every
// such card carries an evidence label, an honest note on what is still
// uncertain, and a real source — and the component will not render without all
// three.

export default {
  id: 'navigation',
  order: 5,
  status: 'open',
  completeOn: COMPLETION.FEYNMAN,
  routeIds: NAVIGATION_ROUTE_IDS,
  title: `The Art and Science of Navigation`,
  subtitle: `Knowing where you are, and which way to go`,
  blurb: `The Earth, the Sun, the stars, a compass and a map — and how people everywhere solved the same problems.`,
  meta: `Six weeks · 30 minutes a day · No prerequisites · Understanding over memorization`,

  weeks: [
    {
      title: `Understanding Our Earth`,
      idea: `Where you are only means something measured against something else.`,
      lessons: [
        { title: `What does it mean to know where you are?`, lessonId: 'lesson-01' },
        { title: `The Earth beneath our feet`, lessonId: 'lesson-02' },
        { title: `The language of latitude and longitude`, lessonId: 'lesson-03' },
        { title: `Maps: turning the Earth into a picture`, lessonId: 'lesson-04' },
        { title: `Putting it together: where am I?`, lessonId: 'lesson-05' }
      ]
    },
    {
      title: `The Compass and Earth's Magnetic Field`,
      idea: `North is not one thing, and a compass does not know where you are.`,
      lessons: [
        { title: `What is magnetism?`, lessonId: 'lesson-06' },
        { title: `True north and magnetic north`, lessonId: 'lesson-07' },
        { title: `Learning to use a compass`, lessonId: 'lesson-08' },
        { title: `Following a bearing`, lessonId: 'lesson-09' },
        { title: `The map and compass work together`, lessonId: 'lesson-10' }
      ]
    },
    {
      title: `The Sun, Shadows, and Time`,
      idea: `The oldest clock and the oldest compass are the same object.`,
      lessons: [
        { title: `Why the Sun appears to move`, lessonId: 'lesson-11' },
        { title: `The shadow knows`, lessonId: 'lesson-12' },
        { title: `Finding direction with the Sun`, lessonId: 'lesson-13' },
        { title: `Solar time and the compass`, lessonId: 'lesson-14' },
        { title: `Building a simple Sun compass`, lessonId: 'lesson-15' }
      ]
    },
    {
      title: `The Stars`,
      idea: `A turning sky, and the one star that stays put.`,
      lessons: [
        { title: `Polaris and finding latitude` },
        { title: `The turning sky` },
        { title: `Star compasses and rising points` },
        { title: `The southern sky` },
        { title: `Review: a night under the stars` }
      ]
    },
    {
      title: `Reading the Land and Sea`,
      idea: `The ground, the water and the weather are instruments too.`,
      lessons: [
        { title: `Terrain, contours and handrails` },
        { title: `Wind, weather and the monsoon` },
        { title: `Swells, birds and signs of land` },
        { title: `Dead reckoning` },
        { title: `Review: finding the way back` }
      ]
    },
    {
      title: `Putting It Together`,
      idea: `Instruments, judgement, and the traditions that got there first.`,
      lessons: [
        { title: `Modern instruments and what they assume` },
        { title: `When the instruments fail` },
        { title: `Looking back across the traditions` },
        { title: `Planning a real journey` },
        { title: `The Heartwood Navigation Challenge` }
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
    'lesson-15': lesson15
  },

  nextUp: {
    title: `Week 4 is not written yet`,
    blurb: `Fifteen lessons in. The compass is in hand and now so is the Sun: where it actually comes up, what a stick in the ground will tell you, how wrong the famous shortcut is and on which days, why your watch and the sky disagree by up to three-quarters of an hour, and how to check a compass against something no fence post can deflect. Next: the same trick after dark — a turning sky, one star that stays put, and the height of it turning out to be your latitude.`
  },

  journalPrompts: [
    `Today I finally understood…`,
    `I see this differently now…`,
    `I noticed this outdoors…`,
    `I still don't understand…`,
    `Something I want to try in the field…`
  ],

  closing: [
    {
      label: `THE MEASURE OF SUCCESS`,
      body: `Not a passing grade. Standing somewhere unfamiliar — a trailhead, a strange town, a boat at dusk — and a little voice says *I know how to work out where I am.*`
    },
    {
      label: `ACROSS CULTURES`,
      body: `Traditions appear beside the skill they illustrate, not gathered into one lesson at the end. Every claim carries its evidence label, what is still uncertain, and a real source. Where a source could not be found, the claim is not here.`
    },
    {
      label: `THE ONE RULE`,
      body: `"I don't get it" is the most useful sentence here. Say it and the explanation changes direction — seven different doors, and it is never simply repeated.`,
      tone: 'green'
    }
  ]
}
