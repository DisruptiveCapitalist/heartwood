import { describe, it, expect } from 'vitest'
import { LESSONS, WEEKS, CONCEPTS, PATHS, STAGES, REFRESHER } from '../content/algebra/algebra-content.js'
import { validateAlgebraLesson, VISUALS, PATH_IDS } from '../content/algebra/schema.js'
import { plot } from '../content/algebra/algebra-util.js'
import { visuals } from '../engine/algebra/visuals/index.js'
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
      // Checked against the component registry, not a list of names: a visual
      // that is specified but not built would otherwise pass here and show the
      // learner a placeholder.
      it('asks for a visual that is actually built', () => {
        expect(VISUALS).toContain(lesson.see.visual)
        expect(Object.keys(visuals)).toContain(lesson.see.visual)
      })
    })
  }

  // Twenty-one lessons hand the generic visual a render function and a plot
  // spec. A bad one throws while the learner is moving a slider, which is the
  // worst possible moment, so every one is driven here instead — at its
  // defaults, on every tab, and after every button.
  describe('generic visuals render', () => {
    const generic = Object.values(LESSONS).filter((l) => l.see.visual === 'generic')

    it('there are generic lessons to check', () => {
      expect(generic.length).toBeGreaterThan(15)
    })

    for (const lesson of generic) {
      it(`lesson ${lesson.n} renders at its defaults, on every tab and after every button`, () => {
        const g = lesson.see.generic
        expect(g, `lesson ${lesson.n} has no generic config`).toBeTruthy()

        const base = {}
        for (const s of g.sliders ?? []) base[s.id] = s.def
        if (g.tabs) base.tab = 0
        Object.assign(base, g.init ?? {})

        const draw = (v) => {
          const out = g.render(v)
          expect(out).toBeTruthy()
          if (out.plot) expect(() => plot(out.plot)).not.toThrow()
          return out
        }

        draw(base)
        ;(g.tabs ?? []).forEach((_, i) => draw({ ...base, tab: i, ...((g.onTab && g.onTab(i)) || {}) }))
        for (const b of g.buttons ?? []) draw({ ...base, ...(b.act(base) || {}) })
      })
    }
  })

  it('every concept in the map is reachable from some lesson', () => {
    const mapped = new Set()
    for (const n of Object.keys(LESSONS)) {
      for (const id of Object.keys(LESSONS[n].map ?? {})) mapped.add(id)
    }
    const orphans = CONCEPTS.filter((c) => !mapped.has(c.id)).map((c) => c.id)
    expect(orphans).toEqual([])
  })
})
