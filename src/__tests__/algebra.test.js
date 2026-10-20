import { describe, it, expect } from 'vitest'
import { LESSONS, WEEKS, CONCEPTS, PATHS, STAGES, REFRESHER } from '../content/algebra/algebra-content.js'
import { validateAlgebraLesson, VISUALS, PATH_IDS } from '../content/algebra/schema.js'
import { allLessons } from '../lib/algebra.js'

// The Algebra Companion arrived written — thirty lessons, three pathways,
// nearly two hundred problems. These are port checks: the content is not being
// authored here, it is being moved, and a move is exactly when things go quietly
// missing.

describe('algebra companion', () => {
  it('has all six weeks of five lessons', () => {
    expect(WEEKS).toHaveLength(6)
    for (const w of WEEKS) expect(w.lessons).toHaveLength(5)
  })

  it('has all thirty lessons, numbered 1 to 30', () => {
    const ns = Object.keys(LESSONS).map(Number).sort((a, b) => a - b)
    expect(ns).toEqual(Array.from({ length: 30 }, (_, i) => i + 1))
  })

  it('fills every slot in the six-week syllabus', () => {
    for (const slot of allLessons()) expect(slot.lesson, `lesson ${slot.n}`).toBeTruthy()
  })

  it('offers three pathways', () => {
    expect(Object.keys(PATHS).sort()).toEqual([...PATH_IDS].sort())
  })

  it('has six stages and five refresher questions', () => {
    expect(STAGES).toHaveLength(6)
    expect(REFRESHER).toHaveLength(5)
  })

  for (const n of Object.keys(LESSONS).map(Number).sort((a, b) => a - b)) {
    const lesson = LESSONS[n]
    describe(`lesson ${n}`, () => {
      it('is well-formed', () => {
        expect(validateAlgebraLesson(lesson)).toEqual([])
      })
      it('asks for a visual that exists', () => {
        expect(VISUALS).toContain(lesson.see.visual)
      })
    })
  }

  it('every concept in the map is reachable from some lesson', () => {
    const mapped = new Set()
    for (const n of Object.keys(LESSONS)) {
      for (const id of Object.keys(LESSONS[n].map ?? {})) mapped.add(id)
    }
    const orphans = CONCEPTS.filter((c) => !mapped.has(c.id)).map((c) => c.id)
    expect(orphans).toEqual([])
  })
})
