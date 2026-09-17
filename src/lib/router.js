import { useEffect, useState } from 'react'

// A hash route, because Heartwood is opened from a folder on one machine and
// should not need a server that knows how to rewrite paths.
//   #/                        the course
//   #/physics-i/lesson-01     a lesson

export function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  return { courseId: parts[0] ?? null, lessonId: parts[1] ?? null }
}

export function go(path) {
  window.location.hash = path
  window.scrollTo(0, 0)
}
