import physicsI from './physics-i/course.js'

// Every subject Heartwood knows about. Adding one is adding a line here and a
// folder beside physics-i/ — no change to the engine.
//
// The brief (§18) is explicit that there is no course catalog yet, so while
// this list has one entry the app opens straight into it.

export const courses = [physicsI]

export const defaultCourse = courses[0]

export function courseById(id) {
  return courses.find((c) => c.id === id) ?? defaultCourse
}
