import physicsI from './physics-i/course.js'
import electricity from './electricity/course.js'
import anatomy from './anatomy/course.js'
import algebra from './algebra/course.js'

// Every class Heartwood knows about. Adding one is a line here and a folder
// beside the others — the catalog, the class home and the lesson player all
// render whatever they are handed.
//
// The original brief (§18) said not to build a course catalog yet. The
// university handoff reverses that: the catalog is now the way in.

export const courses = [physicsI, electricity, anatomy, algebra]

/**
 * The classes built on the standard six-stage lesson shape.
 *
 * The Algebra Companion is not one of them: it runs on three pathways, the
 * learner answers questions, and it has its own player and its own validator.
 * Anything that assumes `course.lessons[id]` holds a standard lesson object —
 * the content tests, the generic player — should walk this list rather than
 * `courses`.
 */
export const standardCourses = courses.filter((c) => c.kind !== 'algebra')

/** Classes that have been written and can be opened. */
export const openCourses = courses.filter((c) => c.status !== 'coming')

/**
 * What the catalog shows after the written classes, or null for nothing at all.
 *
 * The learner's spec is clear that an empty promise is worse than nothing. With
 * Anatomy & Physiology open there is no fourth class announced, so the card is
 * off — the university handoff asks for exactly that. Put an object back here,
 * shaped like the one in the history of this file, when Class 4 is named.
 */
export const comingClass = null

export const defaultCourse = openCourses[0]

export function courseById(id) {
  return courses.find((c) => c.id === id) ?? null
}
