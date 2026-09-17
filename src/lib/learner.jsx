import { createContext, useContext, useMemo, useState } from 'react'
import { read, write } from './storage.js'

// Who the faculty are talking to.
//
// The course authors a default; the learner can change it from the course home
// page, which stores it for this browser only. Left empty, every line reads
// neutrally — which is what someone the course is shared with should see.

const KEY = 'heartwood.v1.settings'
const LearnerContext = createContext({ name: '', setName: () => {} })

export function LearnerProvider({ course, children }) {
  const [name, setNameState] = useState(() => {
    const saved = read(KEY)
    return saved && typeof saved.learnerName === 'string'
      ? saved.learnerName
      : (course?.learnerName ?? '')
  })

  const value = useMemo(() => ({
    name: name.trim(),
    setName: (next) => {
      setNameState(next)
      write(KEY, { ...(read(KEY) ?? {}), learnerName: next })
    }
  }), [name])

  return <LearnerContext.Provider value={value}>{children}</LearnerContext.Provider>
}

export function useLearner() {
  return useContext(LearnerContext)
}
