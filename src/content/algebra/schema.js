import { CONCEPTS, STAGES } from './algebra-content.js'

// What an Algebra Companion lesson has to be, and a validator that enforces it.
//
// The other three classes share one shape, checked by content/schema.js. This
// class does not: it runs on three pathways, the learner answers questions, and
// a lesson carries worked examples, guided problems, vocabulary, a "go deeper"
// section and tiered challenge problems.
//
// The content arrived written, so this is not an authoring aid — it is a port
// check. These are the things that would break the player or quietly mislead
// the learner, and all thirty lessons are run through them on every test run.

export const VISUALS = ['balance', 'machine', 'pattern', 'numberline', 'expression', 'generic']
export const PATH_IDS = ['learn', 'refresh', 'together']
export const ERROR_TYPES = ['meaning', 'arithmetic', 'sign', 'order', 'reading', 'notation']

const CONCEPT_IDS = new Set(CONCEPTS.map((c) => c.id))

function checkProblem(p, where, problems) {
  const at = (m) => `${where}: ${m}`

  if (!p.id) problems.push(at('a problem has no id'))
  if (!p.q) problems.push(at(`problem "${p.id}" has no question`))

  if (p.kind === 'choice') {
    const options = p.options ?? []
    if (options.length < 2) problems.push(at(`"${p.id}" is a choice with fewer than two options`))
    const correct = options.filter((o) => o.correct)
    if (correct.length !== 1) {
      problems.push(at(`"${p.id}" has ${correct.length} correct options — a choice needs exactly one`))
    }
    for (const o of options) {
      // The trap the handoff names explicitly: never buzz a wrong answer.
      if (!(o.v ?? '').trim()) problems.push(at(`"${p.id}" option "${o.id}" has no verdict`))
    }
  } else if (p.kind === 'number') {
    if (p.answer === undefined || p.answer === null) {
      problems.push(at(`"${p.id}" is a number problem with no answer`))
    }
  }

  for (const d of p.diag ?? []) {
    if (!ERROR_TYPES.includes(d.type)) {
      problems.push(at(`"${p.id}" diagnoses a wrong answer as "${d.type}", which is not an error type`))
    }
    if (!(d.msg ?? '').trim()) problems.push(at(`"${p.id}" has a diagnosis with no message`))
  }
}

/**
 * @returns {string[]} problems; empty means the lesson is well-formed
 */
export function validateAlgebraLesson(lesson) {
  const problems = []
  const where = `L${lesson?.n ?? '?'}`
  const at = (m) => `${where}: ${m}`
  const need = (cond, message) => { if (!cond) problems.push(at(message)) }

  need(typeof lesson?.n === 'number', 'missing lesson number')
  need(!!lesson?.title, 'missing title')
  need(!!lesson?.goal, 'missing goal')
  need(!!lesson?.kicker, 'missing kicker')

  // Every pathway must actually say something different to arrive at.
  for (const path of PATH_IDS) {
    need(!!lesson?.hook?.[path], `no hook for the ${path} pathway`)
    need(!!lesson?.see?.prompt?.[path], `no SEE IT prompt for the ${path} pathway`)
    need(!!lesson?.feynman?.prompt?.[path], `no FEYNMAN prompt for the ${path} pathway`)
  }

  need(VISUALS.includes(lesson?.see?.visual), `SEE IT asks for visual "${lesson?.see?.visual}", which does not exist`)
  need((lesson?.see?.observations?.length ?? 0) >= 2, 'SEE IT needs at least two observations')

  need((lesson?.understand?.sentences?.length ?? 0) >= 2, 'UNDERSTAND IT needs at least two sentences')
  need((lesson?.understand?.worked?.length ?? 0) >= 1, 'UNDERSTAND IT has no worked example')
  need((lesson?.understand?.vocab?.length ?? 0) >= 1, 'UNDERSTAND IT names no vocabulary')

  need((lesson?.connect?.items?.length ?? 0) >= 3, 'CONNECT IT wants at least three situations')
  for (const item of lesson?.connect?.items ?? []) {
    need(!!item.t, 'a CONNECT IT item has no text')
    for (const p of (item.p ?? 'all').split(',')) {
      need(p === 'all' || PATH_IDS.includes(p.trim()),
        `a CONNECT IT item is tagged for "${p}", which is not a pathway`)
    }
  }

  const checks = lesson?.feynman?.checks ?? []
  need(checks.length >= 2, 'FEYNMAN IT needs at least two checks')
  for (const c of checks) {
    need(!!c.t, 'a FEYNMAN check has no description')
    // A bad pattern here would throw while the learner is typing.
    try { new RegExp(c.k, 'i') } catch { problems.push(at(`FEYNMAN check "${c.t}" has an invalid pattern`)) }
  }
  const gap = lesson?.feynman?.gap
  need(!gap || (gap.stage >= 0 && gap.stage < STAGES.length), 'FEYNMAN gap sends the learner to a stage that does not exist')

  const challengeProblems = lesson?.challenge?.problems ?? []
  need(challengeProblems.length >= 1, 'CHALLENGE IT has no problems')
  for (const p of challengeProblems) checkProblem(p, where, problems)
  for (const p of lesson?.understand?.guided ?? []) checkProblem(p, where, problems)

  const ids = [...challengeProblems, ...(lesson?.understand?.guided ?? [])].map((p) => p.id)
  need(new Set(ids).size === ids.length, 'two problems in this lesson share an id, so their answers would collide in storage')

  for (const [id, level] of Object.entries(lesson?.map ?? {})) {
    need(CONCEPT_IDS.has(id), `map names concept "${id}", which is not in CONCEPTS`)
    need(level >= 0 && level <= 5, `map level for "${id}" is outside 0–5`)
  }

  need(!!lesson?.reflect, 'no REFLECT stage')
  return problems
}
