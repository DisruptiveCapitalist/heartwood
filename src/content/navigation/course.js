import lesson01 from './lessons/lesson-01.js'
import lesson02 from './lessons/lesson-02.js'
import lesson03 from './lessons/lesson-03.js'
import lesson04 from './lessons/lesson-04.js'
import lesson05 from './lessons/lesson-05.js'
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
      title: `Direction`,
      idea: `North is not one thing, and a compass does not know where you are.`,
      lessons: [
        { title: `The compass and magnetic north` },
        { title: `True north, grid north, and declination` },
        { title: `Taking and following a bearing` },
        { title: `Finding direction without a compass` },
        { title: `Review: crossing unfamiliar ground` }
      ]
    },
    {
      title: `The Sun`,
      idea: `The oldest clock and the oldest compass are the same object.`,
      lessons: [
        { title: `The Sun's daily path` },
        { title: `Shadows, noon and the equal-shadow method` },
        { title: `The seasons and why the path moves` },
        { title: `Time, longitude and the problem of the sea` },
        { title: `Review: a day without instruments` }
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
    'lesson-05': lesson05
  },

  nextUp: {
    title: `Week 2 is not written yet`,
    blurb: `Week 1 is complete. A position needs something to measure from; the ground is flat only for the patch you can see; two angles give an exact address; every flat map trades something away; and a position is worth only as much as the form you describe it in. Next: the compass — a needle that points north, except not at the North Pole, and wrong by an amount that depends on where you stand.`
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
