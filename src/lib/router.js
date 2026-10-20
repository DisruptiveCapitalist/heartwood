import { useEffect, useState } from 'react'

// A hash route, because Heartwood is opened from a folder on one machine and
// should not need a server that knows how to rewrite paths.
//   #/                        the catalog of classes
//   #/electricity             a class home
//   #/physics-i/lesson-01     a lesson
//   #/algebra/lesson-08/learn the Algebra Companion, which picks a pathway
//   #/algebra/refresher       its optional five-question refresher
//   #/algebra/lesson-04/refresh/understand/deeper
//                             a deep link, used by the refresher's
//                             "or choose your own" list and the adult
//                             questions on the class home

export function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  return {
    courseId: parts[0] ?? null,
    lessonId: parts[1] ?? null,
    pathId: parts[2] ?? null,
    stageId: parts[3] ?? null,
    deeper: parts[4] === 'deeper' || parts[3] === 'deeper'
  }
}

export function go(path) {
  window.location.hash = path
  window.scrollTo(0, 0)
}
