import { defaultCourse, courseById } from './content/index.js'
import { LearnerProvider } from './lib/learner.jsx'
import { useRoute, go } from './lib/router.js'
import CourseHome from './screens/CourseHome.jsx'
import Lesson from './engine/Lesson.jsx'

// Tweakables from the handoff. 20 switches the stage rail to the shorter
// timings; showTimings false hides them altogether.
const SESSION_MINUTES = 30
const SHOW_TIMINGS = true

export default function App() {
  const { courseId, lessonId } = useRoute()
  const course = courseId ? courseById(courseId) : defaultCourse
  const lesson = lessonId ? course.lessons[lessonId] : null

  const screen = lesson ? (
    <Lesson
      course={course}
      lesson={lesson}
      sessionMinutes={SESSION_MINUTES}
      showTimings={SHOW_TIMINGS}
      onHome={() => go('/')}
    />
  ) : (
    <CourseHome
      course={course}
      sessionMinutes={SESSION_MINUTES}
      onOpenLesson={(id) => go(`/${course.id}/${id}`)}
    />
  )

  return (
    <LearnerProvider key={course.id} course={course}>
      {screen}
    </LearnerProvider>
  )
}
