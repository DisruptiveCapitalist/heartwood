import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { courses } from '../content/index.js'
import { isDone, emptyProgress } from '../lib/progress.js'
import {
  COMPLETION, NAVIGATION_ROUTE_IDS, SYNTHESIS_CLOSES_ITEMS, closesItems,
  isOptionalWeek, requiredWeeks
} from '../content/schema.js'
import {
  totalLessons, bonusTotal, courseProgress, weekRows, todayCard, courseMap,
  requiredLessons, optionalLessons, mergeMap, emptyProgress as empty
} from '../lib/progress.js'
import { MODES as COMPASS_MODES } from '../engine/simulations/Compass.jsx'
import { describe as describeSim } from '../engine/simulations/descriptions.js'

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

  // The companion handbook's diagrams are meant to picture the same thing the
  // simulation does, so every Navigation simulation has to say what it shows
  // and what the learner can change. Without this a lesson could ship with a
  // blank where the handbook writer needs a description.
  it('every simulation it uses is described for the handbook', () => {
    const seen = new Set()
    for (const lesson of Object.values(navigation.lessons)) {
      const { id, props } = lesson.see.simulation
      const key = props?.mode ? `${id}:${props.mode}` : id
      const d = describeSim(id, props?.mode)
      expect(d, `no description for "${key}" (lesson ${lesson.number})`).toBeTruthy()
      expect(d.shows, `${key}: what it shows`).toBeTruthy()
      expect(d.changes, `${key}: what the learner can change`).toBeTruthy()
      expect(d.numbers, `${key}: the numbers behind it`).toBeTruthy()
      // A family that serves several lessons needs a different description per
      // mode — "the compass" is three different pictures, and handing the
      // handbook writer the same paragraph three times would be a quiet lie.
      expect(seen.has(d.shows), `${key} reuses another lesson's description`).toBe(false)
      seen.add(d.shows)
    }
  })

  // A family picks its scene from a prop. Misspell it and the component falls
  // back to its default, so Lesson 10's map copy would sit above Lesson 8's
  // field of landmarks and nothing would throw.
  it('asks the compass for a mode the compass has', () => {
    for (const lesson of Object.values(navigation.lessons)) {
      const { id, props } = lesson.see.simulation
      if (id === 'compass') {
        expect(props?.mode, `lesson ${lesson.number} uses the compass with no mode`).toBeTruthy()
        expect(COMPASS_MODES, `lesson ${lesson.number}`).toContain(props.mode)
      }
    }
  })

  // The handoff asks every export to name the real-world exercise the
  // simulation stands in for, with its Field Guide chapter, so the book and
  // the screen describe the same thing.
  it('points every lesson at its Field Guide chapter', () => {
    for (const lesson of Object.values(navigation.lessons)) {
      const fg = lesson.fieldGuide
      expect(fg, `lesson ${lesson.number} has no Field Guide pointer`).toBeTruthy()
      expect(Number.isInteger(fg.chapter) && fg.chapter >= 1 && fg.chapter <= 31,
        `lesson ${lesson.number}: chapter ${fg.chapter} is not one of the Field Guide's 31`).toBe(true)
      expect(fg.title, `lesson ${lesson.number}: chapter title`).toBeTruthy()
      expect((fg.exercise ?? '').length, `lesson ${lesson.number}: the exercise it stands in for`).toBeGreaterThan(40)
    }
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

// In Navigation the CONNECT IT synthesis line closes the six items — "every one
// of those is the same sentence wearing different clothes" — so it has to sit
// directly under them. It shipped at the foot of the stage, below the Builder
// card and below the Across Cultures card, and Design caught it by reading the
// exports rather than the screen.
//
// The other three courses have no Across Cultures card and keep the engine
// handoff's order, with the line last. That is a deliberate split, so it is
// guarded both ways: the Navigation placement must not drift down, and the
// others must not be swept along if Navigation changes again.
//
// There is no DOM in this suite, so this guards the source order instead. That
// is a blunt instrument, but the alternative is adding a renderer for one
// assertion, and this failure mode is "the line is in the wrong place", which
// source order catches exactly.
describe('CONNECT IT layout', () => {
  const src = readFileSync(new URL('../engine/stages/ConnectIt.jsx', import.meta.url), 'utf8')

  const at = {
    items: src.indexOf('c.items.map'),
    markup: src.indexOf('<Rich text={c.synthesis} />'),
    underItems: src.indexOf('{underItems && synthesis}'),
    builder: src.indexOf('{c.builder && ('),
    cultures: src.indexOf('{c.acrossCultures &&'),
    atFoot: src.indexOf('{!underItems && synthesis}'),
    own: src.indexOf('hw-connect-own')
  }

  it('has one synthesis block, rendered in one of two places', () => {
    for (const [name, i] of Object.entries(at)) {
      expect(i, `${name} not found in ConnectIt.jsx`).toBeGreaterThan(-1)
    }
    // One block, not two copies that can drift apart.
    expect(src.split('<Rich text={c.synthesis} />').length - 1).toBe(1)
  })

  it('closes the six items where a course asks for that', () => {
    expect(at.underItems, 'must come after the items').toBeGreaterThan(at.items)
    expect(at.underItems, 'must come before the Builder card').toBeLessThan(at.builder)
    expect(at.underItems, 'must come before the Across Cultures card').toBeLessThan(at.cultures)
  })

  it('otherwise sits at the foot, as the engine handoff describes', () => {
    expect(at.atFoot, 'must come after the Across Cultures card').toBeGreaterThan(at.cultures)
    expect(at.atFoot, 'must come before "one of your own"').toBeLessThan(at.own)
  })

  it('closes the items in Navigation and only in Navigation', () => {
    expect(SYNTHESIS_CLOSES_ITEMS).toEqual(['navigation'])
    expect(closesItems('navigation')).toBe(true)
    for (const course of courses.filter((c) => c.id !== 'navigation')) {
      expect(closesItems(course.id), `${course.id} should keep the foot placement`).toBe(false)
    }
    // Every id named has to be a real course, or the placement silently
    // falls back to the foot of the stage.
    for (const id of SYNTHESIS_CLOSES_ITEMS) {
      expect(courses.some((c) => c.id === id), `no course "${id}"`).toBe(true)
    }
    // The stage reads the rule rather than keeping its own copy, and so does
    // the exporter — otherwise the handbook can describe a placement the
    // screen does not use.
    expect(src).toContain('closesItems(course?.id)')
    const exporter = readFileSync(new URL('../../scripts/export-lesson.mjs', import.meta.url), 'utf8')
    expect(exporter).toContain('closesItems(course.id)')
  })

  it('still waits until the learner has engaged', () => {
    expect(src).toContain('selected >= 2')
    expect(src).toMatch(/const synthesis = enough \?/)
  })
})

// Lessons 11 to 15 all shipped with Lesson 10's banned words — "gps, app,
// just head" — because the first of them was written from the last of those
// as a template and the list came along with it. Design caught it by reading
// five exports in a row; nothing in the suite would have.
//
// Scoped to Navigation on purpose. Physics I has two lessons that share a
// banned list legitimately (26 and 04 are both about inertia) and four later
// ones with none at all, and those are approved work; this is a rule this
// course keeps, not one to impose on finished courses from here.
describe('Navigation banned words', () => {
  const lessons = Object.entries(navigation.lessons)

  it('gives every lesson its own, and no lesson an empty list', () => {
    for (const [id, lesson] of lessons) {
      expect(lesson.feynman.banned?.length, `${id} has no banned words`).toBeGreaterThan(0)
    }
  })

  it('never repeats another lesson\'s list', () => {
    const seen = new Map()
    for (const [id, lesson] of lessons) {
      const key = lesson.feynman.banned.map((w) => w.toLowerCase()).sort().join('|')
      expect(seen.has(key), `${id} has the same banned words as ${seen.get(key)}`).toBe(false)
      seen.set(key, id)
    }
  })

  // The instruction names the banned words on purpose — "explain it without
  // saying X" is the whole device, and every course does it. The checks are
  // different: they tell the learner what a good answer contains, so a check
  // that asks for a word the lesson forbids is asking for the impossible.
  it('never asks a check for a word the lesson forbids', () => {
    for (const [id, lesson] of lessons) {
      for (const word of lesson.feynman.banned) {
        for (const [i, check] of lesson.feynman.checks.entries()) {
          expect(check.toLowerCase().includes(word.toLowerCase()),
            `${id} check ${i + 1} requires the banned word "${word}"`).toBe(false)
        }
      }
    }
  })

  it('says why they are banned, in words about this lesson', () => {
    for (const [id, lesson] of lessons) {
      expect((lesson.feynman.bannedNote ?? '').length, `${id} bannedNote`).toBeGreaterThan(40)
    }
  })
})


// Navigation's Field Week is the first optional week in the product, and the
// machinery that keeps it out of the count is shared by all five courses. The
// failure these guard against is silent and ugly: Physics quietly reading
// "30 of 35", or a class that will not say COMPLETE because of five lessons
// nobody was asked to do.
describe('the optional Field Week', () => {
  const done = { ...empty(), feynmanSubmitted: true, visited: { see: true, reflect: true } }
  const none = empty()
  const finished = (ids) => (id) => (ids.includes(id) ? done : none)

  const required = requiredLessons(navigation).map((l) => l.lesson.id)
  const optional = optionalLessons(navigation).map((l) => l.lesson.id)

  it('is the only optional week anywhere in the product', () => {
    for (const course of courses) {
      const extra = (course.weeks ?? []).filter(isOptionalWeek)
      if (course.id === 'navigation') expect(extra).toHaveLength(1)
      else expect(extra, `${course.id} has an optional week`).toHaveLength(0)
    }
  })

  it('leaves every class thirty lessons long, Navigation included', () => {
    for (const course of courses.filter((c) => c.kind !== 'algebra')) {
      expect(totalLessons(course), course.id).toBe(30)
    }
    expect(bonusTotal(navigation)).toBe(5)
    for (const course of courses.filter((c) => c.id !== 'navigation')) {
      expect(bonusTotal(course), course.id).toBe(0)
    }
  })

  it('splits the lessons into thirty required and five extra', () => {
    expect(required).toHaveLength(30)
    expect(optional).toEqual(['lesson-31', 'lesson-32', 'lesson-33', 'lesson-34', 'lesson-35'])
    expect(requiredWeeks(navigation)).toHaveLength(6)
    expect(navigation.weeks).toHaveLength(7)
  })

  // The rule the learner asked for: finishing Lesson 30 finishes the class.
  it('reads COMPLETE after the thirtieth lesson, with Field Week untouched', () => {
    const p = courseProgress(navigation, finished(required))
    expect(p.done).toBe(30)
    expect(p.total).toBe(30)
    expect(p.status).toBe('COMPLETE')
    expect(p.bonus).toEqual({ total: 5, built: 5, done: 0 })
  })

  it('counts Field Week separately and never adds it in', () => {
    const p = courseProgress(navigation, finished([...required, 'lesson-31', 'lesson-33']))
    expect(p.done).toBe(30)
    expect(p.total).toBe(30)
    expect(p.bonus.done).toBe(2)
    expect(p.status).toBe('COMPLETE')
  })

  // And the other way about: Field Week alone must not make the class look
  // started-and-stalled at nothing, nor complete.
  it('does not let Field Week alone complete the class', () => {
    const p = courseProgress(navigation, finished(optional))
    expect(p.done).toBe(0)
    expect(p.bonus.done).toBe(5)
    expect(p.status).toBe('IN PROGRESS')
    expect(p.started).toBe(true)
  })

  it('never sends the Today card into Field Week', () => {
    // Part-way through the course proper.
    const mid = todayCard(navigation, finished(required.slice(0, 12)))
    expect(optional).not.toContain(mid.lessonId)
    // And with the whole course finished, it offers the course's own nextUp
    // rather than the first optional lesson.
    const after = todayCard(navigation, finished(required))
    expect(optional).not.toContain(after.lessonId)
    expect(after.title).toBe(navigation.nextUp.title)
  })

  it('gives the optional week a label instead of a number', () => {
    const rows = weekRows(navigation, () => none)
    expect(rows).toHaveLength(7)
    expect(rows.slice(0, 6).map((r) => r.number)).toEqual([1, 2, 3, 4, 5, 6])
    const field = rows[6]
    expect(field.optional).toBe(true)
    expect(field.number).toBe(null)
    expect(field.label).toBe('FIELD WEEK · OPTIONAL')
    expect(field.blurb).toBeTruthy()
    expect(field.lessons).toHaveLength(5)
    // Every other course keeps plain numbered weeks and no label.
    for (const course of courses.filter((c) => c.id !== 'navigation' && c.kind !== 'algebra')) {
      for (const row of weekRows(course, () => none)) {
        expect(row.optional, course.id).toBe(false)
        expect(row.number, course.id).toBeGreaterThan(0)
      }
    }
  })

  // Field Week can be taken in any order, including before the course proper
  // is finished, so its map must not replace the snapshot — a learner who
  // does it early would otherwise watch the course roll backwards.
  it('merges the Field Week map instead of replacing it', () => {
    const early = courseMap(navigation, finished(['lesson-05', 'lesson-31']))
    const names = early.map((e) => e.name)
    // Everything Lesson 5 had, still there.
    for (const entry of navigation.lessons['lesson-05'].map) {
      expect(names, entry.name).toContain(entry.name)
    }
    // And Lesson 31's own concepts added.
    expect(names).toContain('Wind is local')
  })

  it('takes the better level for a concept in both maps', () => {
    const merged = mergeMap(
      [{ name: 'Position', level: 3 }, { name: 'Longitude', level: 5 }],
      [{ name: 'Position', level: 5 }, { name: 'Aspect', level: 4 }]
    )
    expect(merged).toEqual([
      { name: 'Position', level: 5 },
      { name: 'Longitude', level: 5 },
      { name: 'Aspect', level: 4 }
    ])
  })

  it('numbers the Field Week lessons one to five of week seven', () => {
    for (const [i, id] of optional.entries()) {
      const lesson = navigation.lessons[id]
      expect(lesson.week, id).toBe(7)
      expect(lesson.number, id).toBe(i + 1)
    }
  })
})
