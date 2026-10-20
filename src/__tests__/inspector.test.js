import { describe, it, expect } from 'vitest'
import { courses } from '../content/index.js'

// The ObjectInspector's readout panel is absolutely positioned over the stage,
// so a list longer than five items does not push the drawing down — it draws
// straight over it, and the object is hidden behind its own answer list.
//
// Found the hard way in Electricity Week 6, where a six-item list buried the
// drawing and the button underneath it. Five fits; six does not.
const MAX_IDEAS = 5

describe('object-inspector lessons', () => {
  const lessons = courses.flatMap((c) =>
    Object.values(c.lessons ?? {}).map((l) => ({ course: c.id, lesson: l }))
  )

  const inspectors = lessons.filter(
    ({ lesson }) => lesson?.see?.simulation?.id === 'object-inspector'
  )

  it('there are inspector lessons to check', () => {
    expect(inspectors.length).toBeGreaterThan(0)
  })

  for (const { course, lesson } of inspectors) {
    for (const object of lesson.see.simulation.props?.objects ?? []) {
      it(`${course}/${lesson.id}: "${object.label}" lists at most ${MAX_IDEAS} ideas`, () => {
        expect(object.physics?.length ?? 0).toBeLessThanOrEqual(MAX_IDEAS)
      })
      it(`${course}/${lesson.id}: "${object.label}" has a drawing`, () => {
        expect(object.shape).toBeTruthy()
      })
    }
  }
})
