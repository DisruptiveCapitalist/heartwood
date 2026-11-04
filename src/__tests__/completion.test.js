import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { courses } from '../content/index.js'
import { isDone, emptyProgress } from '../lib/progress.js'
import { COMPLETION, NAVIGATION_ROUTE_IDS, SYNTHESIS_CLOSES_ITEMS, closesItems } from '../content/schema.js'
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
