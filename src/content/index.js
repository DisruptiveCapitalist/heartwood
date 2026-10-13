import physicsI from './physics-i/course.js'
import electricity from './electricity/course.js'

// Every class Heartwood knows about. Adding one is a line here and a folder
// beside the others — the catalog, the class home and the lesson player all
// render whatever they are handed.
//
// The original brief (§18) said not to build a course catalog yet. The
// university handoff reverses that: the catalog is now the way in.

export const courses = [physicsI, electricity]

/** Classes that have been written and can be opened. */
export const openCourses = courses.filter((c) => c.status !== 'coming')

/**
 * What the catalog shows after the written classes. The learner's spec is clear
 * that an empty promise is worse than nothing, so this says plainly that it is
 * being written rather than pretending to be a product.
 */
export const comingClass = {
  title: `The third class`,
  blurb: `Being written. It will appear here, ready to open, as soon as Lesson 1 is built.`
}

export const defaultCourse = openCourses[0]

export function courseById(id) {
  return courses.find((c) => c.id === id) ?? null
}
