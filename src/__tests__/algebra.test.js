import { describe, it, expect } from 'vitest'
import {
  LESSONS, WEEKS, CONCEPTS, PATHS, STAGES, REFRESHER,
  parseProblem, similarProblem, solveMoves, parseNumber, close
} from '../content/algebra/algebra-content.js'
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

  // "Bring a problem from school" rests entirely on this parser, and it is the
  // most branch-heavy thing in the port. Each case below is a shape the handoff
  // says it must recognise.
  describe('the school-problem parser', () => {
    const cases = [
      ['2x + 7 = 19', 'linear', 8],
      ['3x+4=19', 'linear', 8],
      ['x − 8 = −3', 'linear', 7],
      ['x/4 = 6', 'linear', 7],
      ['-x+5=2', 'linear', 8],
      ['12 = 2y + 4', 'linear', 8],          // the unknown on the right
      ['5x = 3x + 12', 'topic', 9],          // unknowns on both sides
      ['x + y = 10; x - y = 2', 'topic', 22],
      ['2/3 + 1/4', 'topic', 12],
      ['what is the slope of a line through (0,2) and (4,10)', 'topic', 18],
      ['5:3 ratio of boys to girls', 'topic', 14],
      ['3a - 2', 'topic', 3],
      ['A train leaves at 3pm travelling 60 mph. How far in 4 hours?', 'words', 24]
    ]

    for (const [input, kind, lesson] of cases) {
      it(`reads "${input}" as ${kind}, lesson ${lesson}`, () => {
        const P = parseProblem(input)
        expect(P, 'parsed nothing').toBeTruthy()
        expect(P.kind).toBe(kind)
        expect(P.lesson).toBe(lesson)
        expect(P.testing, 'no explanation of what it is testing').toBeTruthy()
        expect(LESSONS[P.lesson], `points at lesson ${P.lesson}, which does not exist`).toBeTruthy()
      })
    }

    it('returns nothing for an empty problem', () => {
      expect(parseProblem('')).toBeNull()
      expect(parseProblem('   ')).toBeNull()
    })

    it('solves a two-step equation in the right order, undoing the last move first', () => {
      const P = parseProblem('3x + 4 = 19')
      expect(P.x).toBe(5)
      expect(P.moves.map((m) => m.move)).toEqual([
        'Subtract 4 from both sides',
        'Divide both sides by 3'
      ])
      // Every move asks the learner for the arithmetic rather than stating it.
      for (const m of P.moves) {
        expect(m.ask).toMatch(/^What is /)
        expect(typeof m.value).toBe('number')
      }
    })

    it('offers a similar problem of the same shape with a different answer', () => {
      const P = parseProblem('3x + 4 = 19')
      const S = similarProblem(P)
      expect(S.x).not.toBe(P.x)
      expect(S.moves).toHaveLength(P.moves.length)
      // It must actually be true: a·x/d + b should equal r.
      expect(close((S.p.a * S.x) / S.p.d + S.p.b, S.p.r)).toBe(true)
    })

    it('every solved linear example checks out when substituted back', () => {
      for (const [input, kind] of cases) {
        if (kind !== 'linear') continue
        const P = parseProblem(input)
        const { p, x } = P
        expect(close((p.a * x) / p.d + p.b, p.r), `${input} does not check out`).toBe(true)
      }
    })
  })

  describe('answer parsing', () => {
    it('accepts whole numbers, decimals, fractions and negatives', () => {
      expect(parseNumber('5')).toBe(5)
      expect(parseNumber('2.5')).toBe(2.5)
      expect(parseNumber('11/12')).toBeCloseTo(11 / 12, 6)
      expect(parseNumber('−3')).toBe(-3)      // the typographic minus
      expect(parseNumber('x = 8')).toBe(8)
      expect(parseNumber('')).toBeNaN()
      expect(parseNumber('banana')).toBeNaN()
    })
  })

  describe('the refresher', () => {
    it('every question names a concept and a lesson that exist', () => {
      const ids = new Set(CONCEPTS.map((c) => c.id))
      for (const q of REFRESHER) {
        expect(ids, `${q.id} names concept ${q.concept}`).toContain(q.concept)
        expect(LESSONS[q.lesson], `${q.id} points at lesson ${q.lesson}`).toBeTruthy()
        expect(q.back, `${q.id} has no explanation to give back`).toBeTruthy()
      }
    })

    it('every question can be answered correctly', () => {
      for (const q of REFRESHER) {
        expect(close(q.answer, q.answer, 0.01), q.id).toBe(true)
        expect(typeof q.answer).toBe('number')
      }
    })
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
