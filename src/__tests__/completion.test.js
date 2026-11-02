import { describe, it, expect } from 'vitest'
import { courses } from '../content/index.js'
import { isDone, emptyProgress } from '../lib/progress.js'
import { COMPLETION, NAVIGATION_ROUTE_IDS } from '../content/schema.js'

// Navigation is the first class to change when a lesson counts as finished.
// Everything else still completes on reaching REFLECT, and that must keep
// working — this rule is easy to regress by accident.

const navigation = courses.find((c) => c.id === 'navigation')
const physics = courses.find((c) => c.id === 'physics-i')

describe('per-course completion', () => {
  it('Navigation completes on the explanation, not on reaching REFLECT', () => {
    expect(navigation.completeOn).toBe(COMPLETION.FEYNMAN)

    const reachedReflect = { ...emptyProgress(), visited: { see: true, reflect: true } }
    expect(isDone(reachedReflect, navigation)).toBe(false)

    const wrote = { ...emptyProgress(), feynmanSubmitted: true }
    expect(isDone(wrote, navigation)).toBe(true)
  })

  it('every other class still completes on reaching REFLECT', () => {
    for (const course of courses.filter((c) => c.id !== 'navigation' && c.kind !== 'algebra')) {
      const reachedReflect = { ...emptyProgress(), visited: { see: true, reflect: true } }
      expect(isDone(reachedReflect, course), course.id).toBe(true)

      const wroteOnly = { ...emptyProgress(), feynmanSubmitted: true }
      expect(isDone(wroteOnly, course), course.id).toBe(false)
    }
  })

  it('nothing is complete before it is started', () => {
    for (const course of courses) expect(isDone(emptyProgress(), course), course.id).toBe(false)
  })
})

describe('navigation course shape', () => {
  it('names its own seven doors', () => {
    expect(navigation.routeIds).toEqual(NAVIGATION_ROUTE_IDS)
    expect(navigation.routeIds).toHaveLength(7)
  })

  it('keeps Physics on the default six', () => {
    expect(physics.routeIds).toBeUndefined()
  })

  // The handoff is firm: never a cultural claim without all three.
  it('every Across Cultures card carries a label, an uncertainty and a source', () => {
    const LABELS = ['WELL DOCUMENTED', 'DOCUMENTED REGIONALLY', 'PLAUSIBLE BUT UNCERTAIN', 'MODERN INTERPRETATION']
    let found = 0
    for (const lesson of Object.values(navigation.lessons)) {
      const card = lesson.connect.acrossCultures
      if (!card) continue
      found += 1
      expect(LABELS, `lesson ${lesson.number} label`).toContain(card.label)
      expect(card.place, `lesson ${lesson.number} place`).toBeTruthy()
      expect(card.paragraphs?.length, `lesson ${lesson.number} paragraphs`).toBeGreaterThanOrEqual(2)
      expect((card.uncertain ?? '').length, `lesson ${lesson.number} uncertainty`).toBeGreaterThan(20)
      expect((card.sources ?? '').length, `lesson ${lesson.number} sources`).toBeGreaterThan(10)
      // A source without a year is not a source anyone can follow up.
      expect(card.sources, `lesson ${lesson.number} sources need a year`).toMatch(/\(\d{4}\)/)
    }
    expect(found, 'no Across Cultures cards found at all').toBeGreaterThan(0)
  })
})
