import lesson01 from './lessons/lesson-01.js'
import lesson02 from './lessons/lesson-02.js'

// A course is a syllabus plus whichever of its lessons have actually been
// written. Unwritten lessons are titles only — the home page shows them as part
// of the journey and does not pretend they are ready.

export default {
  id: 'physics-i',
  title: `Physics I`,
  subtitle: `Seeing the World Through Physics`,
  meta: `Six weeks · 30 minutes a day · No prerequisites · Understanding over memorization`,

  // What the faculty call the learner. Copy addresses them with {name}; left
  // empty, those lines read neutrally, which is what anyone this course is
  // shared with will see. The learner can set it from the course home page,
  // and that choice is stored in their browser rather than here.
  learnerName: ``,

  weeks: [
    {
      title: `The Rules of Motion`,
      idea: `The world is moving — even when it looks still.`,
      lessons: [
        { title: `The passenger who keeps going`, lessonId: 'lesson-01' },
        { title: `The bicycle that is always falling over`, lessonId: 'lesson-02' },
        { title: `Why a rolling ball eventually stops` },
        { title: `Why a heavy thing is harder to get moving` },
        { title: `What momentum actually measures` }
      ]
    },
    {
      title: `Forces`,
      idea: `Everything around you is being pushed, pulled, supported, squeezed or stretched.`,
      lessons: [
        { title: `Push, pull, and the forces you never see` },
        { title: `Friction: the force that stops everything` },
        { title: `Compression and tension in a chair` },
        { title: `Why a bridge carries a truck` },
        { title: `Your knees, your ladder, your bookshelf` }
      ]
    },
    {
      title: `Energy`,
      idea: `Nothing comes for free. Energy changes form.`,
      lessons: [
        { title: `Where the motion goes when a car stops` },
        { title: `Stored energy: the weight, the spring, the hill` },
        { title: `Heat is the place energy goes to hide` },
        { title: `How a falling weight makes electricity` },
        { title: `Why nothing is ever 100% efficient` }
      ]
    },
    {
      title: `Heat, Pressure and the Invisible World`,
      idea: `Things you cannot see produce effects you can.`,
      lessons: [
        { title: `What temperature actually measures` },
        { title: `Why a hot-air balloon rises` },
        { title: `Why a steel ship floats` },
        { title: `Why you can drink through a straw` },
        { title: `Pressure cookers, tires, and weather` }
      ]
    },
    {
      title: `Waves, Sound and Light`,
      idea: `Energy and information can travel as waves.`,
      lessons: [
        { title: `What happens when you hear a voice` },
        { title: `Frequency, pitch, and a guitar string` },
        { title: `What is happening inside your hearing aids` },
        { title: `Why a straw looks bent in water` },
        { title: `Mirrors, lenses, and color` }
      ]
    },
    {
      title: `Physics Is Everywhere`,
      idea: `This week you become the physicist. I bring the objects; you explain them.`,
      lessons: [
        { title: `A bridge, a ladder, a bicycle` },
        { title: `A refrigerator and a ceiling fan` },
        { title: `A boat and an airplane` },
        { title: `A flashlight and a microwave` },
        { title: `Anything you point at` }
      ]
    }
  ],

  lessons: { 'lesson-01': lesson01, 'lesson-02': lesson02 },

  // Shown when every written lesson is finished.
  nextUp: {
    title: `Lesson 3 is not written yet`,
    blurb: `Both lessons are done, and the method works. Next up: why a rolling ball eventually stops — and where, exactly, its motion goes.`
  },

  // The five prompts from the brief (§12). The journal card shows these instead
  // of an empty state.
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
      body: `Not a passing grade. Standing beside a bridge, watching a car stop, hearing a plane overhead — and a little voice says *I know what's happening here.*`
    },
    {
      label: `THE FACULTY`,
      body: `The Professor explains it. The Roommate finds another way in. The Editor asks whether you really understand. The Builder says let's see it happen.`
    },
    {
      label: `THE ONE RULE`,
      body: `"I don't get it" is the most useful sentence here. Say it and the explanation changes direction — it is never simply repeated.`,
      tone: 'green'
    }
  ]
}
