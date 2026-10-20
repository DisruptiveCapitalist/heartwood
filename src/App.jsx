import { courseById, defaultCourse } from './content/index.js'
import { LearnerProvider } from './lib/learner.jsx'
import { useRoute, go } from './lib/router.js'
import Catalog from './screens/Catalog.jsx'
import CourseHome from './screens/CourseHome.jsx'
import Lesson from './engine/Lesson.jsx'
import AlgebraHome from './engine/algebra/AlgebraHome.jsx'
import AlgebraLesson from './engine/algebra/AlgebraLesson.jsx'
import AlgebraRefresher from './engine/algebra/AlgebraRefresher.jsx'
import { PATH_IDS, readPathChoice } from './lib/algebra.js'

// Tweakables from the handoff. 20 switches the stage rail to the shorter
// timings; showTimings false hides them altogether.
const SESSION_MINUTES = 30
const SHOW_TIMINGS = true

/** `lesson-08` → 8, for the Algebra Companion's numbered lessons. */
const lessonNumber = (id) => {
  const m = /^lesson-(\d{1,2})$/.exec(id ?? '')
  const n = m ? Number(m[1]) : NaN
  return n >= 1 && n <= 30 ? n : null
}

export default function App() {
  const { courseId, lessonId, pathId, stageId, deeper } = useRoute()
  const course = courseId ? courseById(courseId) : null

  // The Algebra Companion is built on a different lesson shape and has its own
  // home and player — see src/content/algebra/course.js for why.
  if (course?.kind === 'algebra') {
    const n = lessonNumber(lessonId)
    const path = PATH_IDS.includes(pathId) ? pathId : (readPathChoice() ?? 'learn')
    const openLesson = (num, p, stage, deep) => {
      const tail = [stage, deep ? 'deeper' : null].filter(Boolean).join('/')
      go(`/${course.id}/lesson-${String(num).padStart(2, '0')}/${p ?? path}${tail ? `/${tail}` : ''}`)
    }
    const screen = lessonId === 'refresher' ? (
      <AlgebraRefresher
        onOpenLesson={openLesson}
        onHome={() => go(`/${course.id}`)}
        onCatalog={() => go('/')}
      />
    ) : n ? (
      <AlgebraLesson
        course={course}
        n={n}
        path={path}
        openStage={stageId && stageId !== 'deeper' ? stageId : null}
        openDeeper={deeper}
        onPath={(p) => openLesson(n, p)}
        onLesson={(num) => openLesson(num, path)}
        onHome={() => go(`/${course.id}`)}
        onCatalog={() => go('/')}
      />
    ) : (
      <AlgebraHome
        course={course}
        onOpenLesson={openLesson}
        onRefresher={() => go(`/${course.id}/refresher`)}
        onCatalog={() => go('/')}
      />
    )
    return (
      <LearnerProvider key={course.id} course={course}>
        {screen}
      </LearnerProvider>
    )
  }

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
