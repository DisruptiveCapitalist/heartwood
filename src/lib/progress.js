import { read, write, lessonKey } from './storage.js'
import { STAGES, COMPLETION, isOptionalWeek, requiredWeeks } from '../content/schema.js'

// Everything the screens need about where the learner has got to, derived from
// storage in one place. The engine writes; the home page only reads.

export function emptyProgress() {
  return {
    stage: 0,
    visited: { see: true },
    // Whatever the SEE IT visual wants to remember between sessions. Most
    // simulations want nothing: a switch position is not worth preserving.
    // Anatomy Lesson 1 keeps the learner's first guess here, because the whole
    // visual is built around having committed to one. It must never hold
    // anything about the learner's body — that lesson's weight slider is
    // arithmetic only, and the course spec forbids storing it.
    seeState: {},
    connects: {},
    connectOwn: '',
    feynmanText: '',
    feynmanSubmitted: false,
    predict: null,
    editorAnswer: '',
    editorRevealed: false,
    journalText: ''
  }
}

export function readProgress(courseId, lessonId) {
  const saved = read(lessonKey(courseId, lessonId))
  return saved ? { ...emptyProgress(), ...saved } : emptyProgress()
}

export function writeProgress(courseId, lessonId, progress) {
  return write(lessonKey(courseId, lessonId), {
    stage: progress.stage,
    visited: progress.visited,
    connects: progress.connects,
    connectOwn: progress.connectOwn,
    feynmanText: progress.feynmanText,
    feynmanSubmitted: progress.feynmanSubmitted,
    predict: progress.predict,
    editorAnswer: progress.editorAnswer,
    editorRevealed: progress.editorRevealed,
    journalText: progress.journalText,
    // Named explicitly, like everything else here: this function writes a known
    // list of fields rather than whatever the engine happens to be holding, so
    // nothing reaches storage by accident. A simulation that wants to remember
    // something has to put it in seeState deliberately — and must not put
    // anything about the learner's body there, which the course spec forbids.
    seeState: progress.seeState
  })
}

/** Touched at all — moved off SEE IT, or wrote something. */
export function isStarted(p) {
  return !!p && ((p.stage ?? 0) > 0 || (p.journalText ?? '').trim().length > 0)
}

/**
 * Finished. Nothing is ever locked, so this is a fact, not a gate.
 *
 * Most courses count a lesson done on reaching REFLECT. Navigation counts it
 * done when the Feynman explanation has been submitted, because for that course
 * the explanation IS the lesson — see schema.js COMPLETION.
 */
export function isDone(p, course) {
  if (!p) return false
  return course?.completeOn === COMPLETION.FEYNMAN
    ? !!p.feynmanSubmitted
    : !!(p.visited ?? {}).reflect
}

/**
 * The lessons of a course that have actually been written, in order.
 *
 * `optional` says the lesson belongs to a bonus week. Everything that counts
 * the course — the catalog's figures, the Today card, whether the class reads
 * COMPLETE — filters those out. Everything that records what the learner has
 * DONE — the journal, the Understanding Map — keeps them, because the learner
 * wrote them and they are not less real for being optional.
 */
export function writtenLessons(course) {
  const out = []
  course.weeks.forEach((week, wi) => {
    week.lessons.forEach((entry, li) => {
      const lesson = entry.lessonId ? course.lessons[entry.lessonId] : null
      if (lesson) {
        out.push({ lesson, week: wi + 1, number: li + 1, title: entry.title, optional: isOptionalWeek(week) })
      }
    })
  })
  return out
}

/** The written lessons the course proper is made of. */
export const requiredLessons = (course) => writtenLessons(course).filter((l) => !l.optional)
/** The written lessons of a bonus week, if there is one. */
export const optionalLessons = (course) => writtenLessons(course).filter((l) => l.optional)

/**
 * The Understanding Map to show on the home page.
 *
 * Each lesson authors the map as it stands when that lesson ends, so the course
 * map is simply the snapshot from the furthest lesson the learner has opened.
 * (The handoff hardcoded a copy on the home page; this at least keeps the two
 * in step. Deriving levels from what the learner actually did needs evidence the
 * product does not yet collect — see README, "What is deliberately not built".)
 */
export function courseMap(course, progressOf) {
  const written = requiredLessons(course)
  const touched = (item) => isStarted(progressOf(item.lesson.id)) || isDone(progressOf(item.lesson.id), course)
  let map = written[0]?.lesson.map ?? []
  for (const item of written) {
    if (touched(item)) map = item.lesson.map
  }

  // A bonus week can be taken in any order, including before the course proper
  // is finished, so its map must not REPLACE the snapshot — a learner who does
  // Field Week early would otherwise see the course roll backwards. Its own
  // concepts are merged in at the higher of the two levels instead.
  for (const item of optionalLessons(course)) {
    if (touched(item)) map = mergeMap(map, item.lesson.map)
  }
  return map
}

/** Two Understanding Map snapshots, taking the better level for each concept. */
export function mergeMap(base, extra) {
  const out = base.map((e) => ({ ...e }))
  for (const entry of extra ?? []) {
    const found = out.find((e) => e.name === entry.name)
    if (!found) out.push({ ...entry })
    else if (entry.level > found.level) found.level = entry.level
  }
  return out
}

export function journalEntries(course, progressOf) {
  const entries = []
  for (const { lesson, week, number } of writtenLessons(course)) {
    const text = (progressOf(lesson.id).journalText ?? '').trim()
    if (text) {
      entries.push({
        lessonId: lesson.id,
        label: `WEEK ${week} · LESSON ${number} · ${lesson.concept.toUpperCase()}`,
        text
      })
    }
  }
  return entries
}

/**
 * The Today card. One question, answered on arrival: what am I doing today?
 */
export function todayCard(course, progressOf, sessionMinutes = 30) {
  // The course proper. A bonus week is never anybody's next thing to do.
  const written = requiredLessons(course)
  const anyStarted = written.some(({ lesson }) => isStarted(progressOf(lesson.id)))

  for (const { lesson, week, number } of written) {
    const p = progressOf(lesson.id)
    if (isDone(p, course)) continue

    const started = isStarted(p)
    const place = `WEEK ${week}, LESSON ${number}`
    if (started) {
      return {
        kicker: `CONTINUE · ${place}`,
        title: lesson.title,
        blurb: `You left off part-way through. Everything you wrote is still there.`,
        lessonId: lesson.id,
        cta: `CONTINUE LESSON ${number}`,
        meta: `You were on ${STAGES[p.stage ?? 0].label}`
      }
    }
    return {
      kicker: `${anyStarted ? "TODAY'S LESSON" : 'START HERE'} · ${place}`,
      title: lesson.title,
      blurb: lesson.openingQuestion,
      lessonId: lesson.id,
      cta: `BEGIN LESSON ${number}`,
      meta: `About ${sessionMinutes} minutes`
    }
  }

  const last = written[written.length - 1]
  return {
    kicker: `WEEK 1 · ${written.length === 2 ? 'LESSONS 1 AND 2 COMPLETE' : 'ALL WRITTEN LESSONS COMPLETE'}`,
    title: course.nextUp?.title ?? 'The next lesson is not written yet',
    blurb: course.nextUp?.blurb ?? '',
    lessonId: last?.lesson.id,
    cta: `REVISIT LESSON ${last?.number ?? 1}`,
    meta: `Nothing is ever locked. Go back any time.`
  }
}

/** One row per week, with each lesson's status. */
export function weekRows(course, progressOf) {
  let counted = 0
  return course.weeks.map((week, wi) => ({
    // An optional week is not "week 7": it announces itself with its own
    // label, and the numbering of the course proper stops before it.
    number: isOptionalWeek(week) ? null : (counted += 1),
    optional: isOptionalWeek(week),
    label: week.label ?? null,
    blurb: week.blurb ?? null,
    title: week.title,
    idea: week.idea,
    active: wi === 0,
    lessons: week.lessons.map((entry, li) => {
      const lesson = entry.lessonId ? course.lessons[entry.lessonId] : null
      const p = lesson ? progressOf(lesson.id) : null
      const complete = !!lesson && isDone(p, course)
      const inProgress = !!lesson && !complete && isStarted(p)
      return {
        number: li + 1,
        title: entry.title,
        lessonId: lesson?.id ?? null,
        built: !!lesson,
        status: complete ? 'COMPLETE' : inProgress ? 'IN PROGRESS' : lesson ? 'READY' : 'NOT YET WRITTEN'
      }
    })
  }))
}

/**
 * Every lesson slot in the course PROPER, written or not. Six weeks of five.
 * A bonus week is deliberately not in this number: the class is thirty
 * lessons whether or not Field Week exists, and `bonusTotal` counts that
 * separately.
 */
export function totalLessons(course) {
  return requiredWeeks(course).reduce((n, w) => n + w.lessons.length, 0)
}

export function bonusTotal(course) {
  return (course?.weeks ?? []).filter(isOptionalWeek).reduce((n, w) => n + w.lessons.length, 0)
}

/**
 * What the catalog card needs to know about a class: how much is written, how
 * much is finished, and whether the learner has started.
 */
export function courseProgress(course, progressOf) {
  const total = totalLessons(course)
  const written = requiredLessons(course)
  let done = 0
  let started = false

  for (const { lesson } of written) {
    const p = progressOf(lesson.id)
    if (isDone(p, course)) done += 1
    if (isStarted(p)) started = true
  }

  // Counted, shown, and never allowed to hold the class open. A learner who
  // has finished the thirty has finished the class, whatever Field Week says.
  const extra = optionalLessons(course)
  let bonusDone = 0
  for (const { lesson } of extra) {
    const p = progressOf(lesson.id)
    if (isDone(p, course)) bonusDone += 1
    if (isStarted(p)) started = true
  }

  // `bonusDone > 0` belongs in here and was missing: a lesson can be finished
  // without `isStarted` ever being true of it, because that reads the stage
  // index and the journal, so a learner who had done nothing but Field Week
  // read NOT STARTED. Caught by the guard in completion.test.js rather than by
  // anybody looking at the catalog.
  const touched = started || done > 0 || bonusDone > 0
  return {
    total,
    built: written.length,
    done,
    bonus: { total: bonusTotal(course), built: extra.length, done: bonusDone },
    started: touched,
    status: done >= total ? 'COMPLETE' : touched ? 'IN PROGRESS' : 'NOT STARTED'
  }
}
