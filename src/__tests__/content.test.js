import { describe, it, expect } from 'vitest'
import { standardCourses as courses } from '../content/index.js'
import { validateLesson, ROUTE_IDS } from '../content/schema.js'
import { simulations } from '../engine/simulations/index.js'
import { MODES as CIRCUIT_MODES } from '../engine/simulations/CircuitLoop.jsx'
import { PLATE_IDS } from '../engine/plates.jsx'
import { fill } from '../lib/rich.jsx'

// Every lesson in every subject is checked on every run, so a content mistake
// fails here rather than in front of the learner.
//
// The Algebra Companion is deliberately not in this loop. It is built on a
// different lesson shape — three pathways, answered problems, its own player —
// so it gets its own validator and its own file, algebra.test.js. Walking
// `standardCourses` rather than `courses` is what keeps the two apart.

describe('lesson content', () => {
  for (const course of courses) {
    for (const [id, lesson] of Object.entries(course.lessons)) {
      describe(`${course.id}/${id}`, () => {
        it('is well-formed', () => {
          expect(validateLesson(lesson, course)).toEqual([])
        })

        it('names a simulation that exists', () => {
          expect(Object.keys(simulations)).toContain(lesson.see.simulation.id)
        })

        // A simulation family takes a prop to choose which lesson it is serving.
        // Misspell it and the component silently falls back to its default — so
        // Lesson 5's copy about a glowing element would sit above Lesson 1's
        // lamp, and nothing would throw. Check the prop against the component.
        it('asks its simulation for a mode the simulation has', () => {
          const { id, props } = lesson.see.simulation
          if (id === 'circuit-loop' && props?.mode !== undefined) {
            expect(CIRCUIT_MODES).toContain(props.mode)
          }
        })

        // A plate renders nothing at all when its id doesn't match a drawing, so
        // a typo would quietly leave the step as text — which is the thing the
        // drawings were added to fix.
        it('asks only for detail drawings that exist', () => {
          for (const step of lesson.understand.sequence?.steps ?? []) {
            if (step.plate) expect(PLATE_IDS).toContain(step.plate)
          }
        })

        // Six ways in for most courses; Navigation uses seven, and names three
        // of the shared ones differently. The course decides.
        it('offers a different way in for every door, none of them a repeat', () => {
          const expected = course.routeIds ?? ROUTE_IDS
          const bodies = lesson.routes.map((r) => r.body)
          expect(lesson.routes.map((r) => r.id).sort()).toEqual([...expected].sort())
          expect(new Set(bodies).size).toBe(expected.length)
        })

        // Navigation's doors carry their own labels, because "break it into
        // smaller steps" is not the same invitation as "ask me a smaller
        // question". Where a course names its own set, every route must say so.
        it('labels its doors when the course names its own set', () => {
          if (!course.routeIds) return
          for (const r of lesson.routes) expect(r.label, `route ${r.id}`).toBeTruthy()
        })

        // A cross-course reference that points at a lesson which does not exist
        // would be a dead link in the middle of an answer.
        it('only links across to a lesson that exists', () => {
          const link = lesson.challenge.open.crossLink
          if (!link) return
          const target = courses.find((c) => c.id === link.courseId)
          expect(target, `no course "${link.courseId}"`).toBeTruthy()
          expect(target.lessons[link.lessonId], `no lesson "${link.lessonId}"`).toBeTruthy()
          expect(link.label).toBeTruthy()
        })

        it('answers every wrong prediction instead of buzzing it', () => {
          for (const o of lesson.challenge.prediction.options) {
            expect(o.verdict.length).toBeGreaterThan(80)
          }
        })
      })
    }

    it(`${course.id}: every syllabus entry that claims a lesson has one`, () => {
      for (const week of course.weeks) {
        for (const entry of week.lessons) {
          if (entry.lessonId) expect(course.lessons[entry.lessonId]).toBeDefined()
        }
      }
    })
  }
})

describe('addressing the learner', () => {
  it('uses the name when there is one', () => {
    expect(fill('{name}, look at this.', 'Dennis')).toBe('Dennis, look at this.')
  })

  it('reads neutrally when there is not', () => {
    expect(fill('{name}, look at this.', '')).toBe('Look at this.')
    expect(fill('{name}, look at this.', undefined)).toBe('Look at this.')
  })

  it('leaves copy without the token alone', () => {
    const line = 'Three sentences. That is the whole idea.'
    expect(fill(line, 'Dennis')).toBe(line)
    expect(fill(line, '')).toBe(line)
  })

  it('does not leave a gap behind a name used outside a vocative', () => {
    expect(fill('So, {name} — why?', 'Dennis')).toBe('So, Dennis — why?')
    expect(fill('So, {name} — why?', '')).toBe('So, — why?')
  })
})
