import { read, write, lessonKey } from './storage.js'
import { STAGES } from '../content/schema.js'

// Everything the screens need about where the learner has got to, derived from
// storage in one place. The engine writes; the home page only reads.

export function emptyProgress() {
  return {
    stage: 0,
    visited: { see: true },
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
    journalText: progress.journalText
  })
}

/** Touched at all — moved off SEE IT, or wrote something. */
export function isStarted(p) {
  return !!p && ((p.stage ?? 0) > 0 || (p.journalText ?? '').trim().length > 0)
}

/** Reached REFLECT. Nothing is ever locked, so this is a fact, not a gate. */
export function isDone(p) {
  return !!p && !!(p.visited ?? {}).reflect
}

/** The lessons of a course that have actually been written, in order. */
export function writtenLessons(course) {
  const out = []
  course.weeks.forEach((week, wi) => {
    week.lessons.forEach((entry, li) => {
      const lesson = entry.lessonId ? course.lessons[entry.lessonId] : null
      if (lesson) out.push({ lesson, week: wi + 1, number: li + 1, title: entry.title })
    })
  })
  return out
}

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
  const written = writtenLessons(course)
  let map = written[0]?.lesson.map ?? []
  for (const item of written) {
    if (isStarted(progressOf(item.lesson.id)) || isDone(progressOf(item.lesson.id))) {
      map = item.lesson.map
    }
  }
  return map
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
  const written = writtenLessons(course)
  const anyStarted = written.some(({ lesson }) => isStarted(progressOf(lesson.id)))

  for (const { lesson, week, number } of written) {
    const p = progressOf(lesson.id)
    if (isDone(p)) continue

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
  return course.weeks.map((week, wi) => ({
    number: wi + 1,
    title: week.title,
    idea: week.idea,
    active: wi === 0,
    lessons: week.lessons.map((entry, li) => {
      const lesson = entry.lessonId ? course.lessons[entry.lessonId] : null
      const p = lesson ? progressOf(lesson.id) : null
      const complete = !!lesson && isDone(p)
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
