import { read, write } from './storage.js'
import { LESSONS, WEEKS, CONCEPTS, STAGES, PATHS } from '../content/algebra/algebra-content.js'

// The Algebra Companion keeps more per lesson than the other three classes,
// because it is the only one where the learner answers questions. It also keeps
// one record PER PATHWAY: the same lesson worked through as a student and as an
// adult refreshing are two different passes, and neither should overwrite the
// other.
//
// The handoff specifies keys of the form `heartwood.algebra.lesson8.refresh`.
// They are namespaced under this app's `heartwood.v1.` prefix instead, so that
// the journal export and `readAll` — which look for that prefix — can see them.
// Everything else about the shape is as specified.

const PREFIX = 'heartwood.v1.algebra'

export const PATH_IDS = ['learn', 'refresh', 'together']
export const isPath = (p) => PATH_IDS.includes(p)

const lessonKey = (n, path) => `${PREFIX}.lesson${n}.${path}`
const PATH_CHOICE_KEY = `${PREFIX}.path`
const FAMILIAR_KEY = `${PREFIX}.familiar`
const REFRESHER_KEY = `${PREFIX}.refresher`

export function emptyAlgebraProgress() {
  return {
    stage: 0,
    visited: { see: true },
    connects: {},
    connectOwn: '',
    feynmanText: '',
    feynmanSubmitted: false,
    // Per problem id, so a lesson can be left and resumed without losing work.
    answers: {},
    solved: {},
    tries: {},
    hints: {},
    worked: {},
    deeper: false,
    journalText: '',
    journalTextB: ''      // the second box, used only on the TOGETHER path
  }
}

export function readAlgebra(n, path) {
  const saved = read(lessonKey(n, path))
  return saved ? { ...emptyAlgebraProgress(), ...saved } : emptyAlgebraProgress()
}

export function writeAlgebra(n, path, p) {
  // Named explicitly, as in lib/progress.js: this writes a known list of
  // fields rather than whatever the player is holding, so nothing reaches
  // storage by accident.
  return write(lessonKey(n, path), {
    stage: p.stage,
    visited: p.visited,
    connects: p.connects,
    connectOwn: p.connectOwn,
    feynmanText: p.feynmanText,
    feynmanSubmitted: p.feynmanSubmitted,
    answers: p.answers,
    solved: p.solved,
    tries: p.tries,
    hints: p.hints,
    worked: p.worked,
    deeper: p.deeper,
    journalText: p.journalText,
    journalTextB: p.journalTextB
  })
}

export const readPathChoice = () => {
  const v = read(PATH_CHOICE_KEY)
  return isPath(v) ? v : null
}
export const writePathChoice = (path) => isPath(path) && write(PATH_CHOICE_KEY, path)

export const readFamiliar = () => read(FAMILIAR_KEY) ?? {}
export const writeFamiliar = (map) => write(FAMILIAR_KEY, map)

export const readRefresher = () => read(REFRESHER_KEY) ?? null
export const writeRefresher = (result) => write(REFRESHER_KEY, result)

export const isStarted = (p) =>
  !!p && ((p.stage ?? 0) > 0 || (p.journalText ?? '').trim().length > 0)

/** Reached REFLECT. Nothing is ever locked, so this is a fact, not a gate. */
export const isDone = (p) => !!p && !!(p.visited ?? {}).reflect

/** Every lesson slot, 1–30, with its week and position. All thirty are written. */
export function allLessons() {
  const out = []
  WEEKS.forEach((week, wi) => {
    week.lessons.forEach((title, li) => {
      const n = wi * 5 + li + 1
      out.push({ n, week: wi + 1, number: li + 1, title, lesson: LESSONS[n] ?? null })
    })
  })
  return out
}

/**
 * Concept levels for the progress map.
 *
 * The handoff is explicit that a concept's level is the HIGHEST reached across
 * the three pathways — working a lesson again as an adult must not pull a
 * student's level back down. Levels come from each lesson's own `map`, and are
 * counted only once the learner has actually opened that lesson.
 */
export function conceptLevels(progressOf) {
  const levels = {}
  for (const { n, lesson } of allLessons()) {
    if (!lesson?.map) continue
    const touched = PATH_IDS.some((path) => {
      const p = progressOf(n, path)
      return isStarted(p) || isDone(p)
    })
    if (!touched) continue
    for (const [id, level] of Object.entries(lesson.map)) {
      levels[id] = Math.max(levels[id] ?? 0, level)
    }
  }
  return CONCEPTS.map((c) => ({ ...c, level: levels[c.id] ?? 0 }))
}

/** One row per week, with each lesson's status on the chosen pathway. */
export function weekRows(path, progressOf) {
  return WEEKS.map((week, wi) => ({
    number: wi + 1,
    title: week.title,
    idea: week.idea,
    lessons: week.lessons.map((title, li) => {
      const n = wi * 5 + li + 1
      const p = progressOf(n, path)
      const complete = isDone(p)
      const inProgress = !complete && isStarted(p)
      return {
        n,
        number: li + 1,
        title,
        status: complete ? 'COMPLETE' : inProgress ? 'IN PROGRESS' : 'READY'
      }
    })
  }))
}

/** How far through the class the learner is, on one pathway. */
export function algebraProgress(path, progressOf) {
  let done = 0
  let started = false
  for (const { n } of allLessons()) {
    const p = progressOf(n, path)
    if (isDone(p)) done += 1
    if (isStarted(p)) started = true
  }
  return {
    total: 30,
    built: 30,
    done,
    started: started || done > 0,
    status: done >= 30 ? 'COMPLETE' : (started || done > 0) ? 'IN PROGRESS' : 'NOT STARTED'
  }
}

/** The Continue card: one question, answered on arrival — what am I doing today? */
export function todayCard(path, progressOf) {
  const all = allLessons()
  const anyStarted = all.some(({ n }) => isStarted(progressOf(n, path)))

  for (const { n, week, number, title, lesson } of all) {
    const p = progressOf(n, path)
    if (isDone(p)) continue
    const place = `WEEK ${week}, LESSON ${number}`
    if (isStarted(p)) {
      return {
        kicker: `CONTINUE · ${place}`,
        title,
        blurb: `You were on ${STAGES[p.stage ?? 0].label}. Everything you wrote is still there.`,
        n,
        cta: `CONTINUE LESSON ${n}`,
        meta: 'About 30 minutes. Pause whenever you like.'
      }
    }
    return {
      kicker: `${anyStarted ? 'NEXT' : 'START HERE'} · ${place}`,
      title,
      blurb: lesson?.goal ?? '',
      n,
      cta: `BEGIN LESSON ${n}`,
      meta: 'About 30 minutes. Pause whenever you like.'
    }
  }

  return {
    kicker: 'ALL 30 LESSONS COMPLETE',
    title: 'Algebra Foundations, done',
    blurb: 'Revisit any lesson when your school course needs it, or bring a problem from school below.',
    n: 30,
    cta: 'REVISIT LESSON 30',
    meta: 'Nothing is ever locked.'
  }
}

export const pathLabel = (path) => PATHS[path]?.label ?? PATHS.learn.label
