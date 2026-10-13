import { courseById, defaultCourse } from './content/index.js'
import { LearnerProvider } from './lib/learner.jsx'
import { useRoute, go } from './lib/router.js'
import Catalog from './screens/Catalog.jsx'
import CourseHome from './screens/CourseHome.jsx'
import Lesson from './engine/Lesson.jsx'

// Tweakables from the handoff. 20 switches the stage rail to the shorter
// timings; showTimings false hides them altogether.
const SESSION_MINUTES = 30
const SHOW_TIMINGS = true

export default function App() {
  const { courseId, lessonId } = useRoute()
  const course = courseId ? courseById(courseId) : null
  const lesson = course && lessonId ? course.lessons[lessonId] : null

  // An unknown class in the address bar means the catalog, not an error page.
  const screen = !course ? (
    <Catalog onOpenCourse={(id) => go(`/${id}`)} />
  ) : lesson ? (
    <Lesson
      course={course}
      lesson={lesson}
      sessionMinutes={SESSION_MINUTES}
      showTimings={SHOW_TIMINGS}
      onHome={() => go(`/${course.id}`)}
      onCatalog={() => go('/')}
    />
  ) : (
    <CourseHome
      course={course}
      sessionMinutes={SESSION_MINUTES}
      onOpenLesson={(id) => go(`/${course.id}/${id}`)}
      onCatalog={() => go('/')}
    />
  )

  return (
    <LearnerProvider key={course?.id ?? 'catalog'} course={course ?? defaultCourse}>
      {screen}
    </LearnerProvider>
  )
}
