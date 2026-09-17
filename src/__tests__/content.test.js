import { describe, it, expect } from 'vitest'
import { courses } from '../content/index.js'
import { validateLesson, ROUTE_IDS } from '../content/schema.js'
import { simulations } from '../engine/simulations/index.js'
import { fill } from '../lib/rich.jsx'

// Every lesson in every subject is checked on every run, so a content mistake
// fails here rather than in front of the learner.

describe('lesson content', () => {
  for (const course of courses) {
    for (const [id, lesson] of Object.entries(course.lessons)) {
      describe(`${course.id}/${id}`, () => {
        it('is well-formed', () => {
          expect(validateLesson(lesson)).toEqual([])
        })

        it('names a simulation that exists', () => {
          expect(Object.keys(simulations)).toContain(lesson.see.simulation.id)
        })

        it('offers six different ways in, none of them a repeat', () => {
          const bodies = lesson.routes.map((r) => r.body)
          expect(lesson.routes.map((r) => r.id).sort()).toEqual([...ROUTE_IDS].sort())
          expect(new Set(bodies).size).toBe(ROUTE_IDS.length)
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
