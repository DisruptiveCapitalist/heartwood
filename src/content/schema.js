// ---------------------------------------------------------------------------
// The Heartwood lesson schema.
//
// A lesson is data. The engine in src/engine renders it. Authoring Lesson 3 is
// writing one of these objects and — if it needs a new interactive scene —
// registering a simulation component. Nothing else.
//
// The six stages come from the brief (§3) and never vary. What varies is the
// copy, the six alternate explanations, the challenge, and which simulation the
// SEE IT stage mounts.
//
// Copy strings carry two inline marks: **bold** and *italic*. Nothing else.
// ---------------------------------------------------------------------------

export const STAGES = [
  { key: 'see',        label: 'SEE IT',        m30: 5, m20: 3 },
  { key: 'understand', label: 'UNDERSTAND IT', m30: 8, m20: 5 },
  { key: 'connect',    label: 'CONNECT IT',    m30: 5, m20: 3 },
  { key: 'feynman',    label: 'FEYNMAN IT',    m30: 5, m20: 4 },
  { key: 'challenge',  label: 'CHALLENGE IT',  m30: 5, m20: 3 },
  { key: 'reflect',    label: 'REFLECT',       m30: 2, m20: 2 }
]

export const STAGE_KEYS = STAGES.map((s) => s.key)

/** The four voices from the brief (§2), plus the two unvoiced panels. */
export const FACULTY = {
  professor: { label: 'THE PROFESSOR', bg: 'var(--ink)',     fg: '#f6f1e7' },
  roommate:  { label: 'THE ROOMMATE',  bg: 'var(--green)',   fg: '#f6f1e7' },
  editor:    { label: 'THE EDITOR',    bg: 'var(--editor)',  fg: '#fff8f2' },
  builder:   { label: 'THE BUILDER',   bg: 'var(--builder)', fg: '#f6f1e7' },
  feynman:   { label: 'FEYNMAN CHECK', bg: 'var(--ink)',     fg: '#f6f1e7' },
  journal:   { label: 'THE JOURNAL',   bg: 'var(--green)',   fg: '#f6f1e7' }
}

/** Understanding levels, brief §6. Index 0 means "not yet encountered". */
export const LEVELS = ['encountered', 'recognize', 'understand', 'explain', 'use']

/**
 * The six alternate routes of the "I don't get it" panel (brief §8).
 * A lesson must author a body for every one of these ids — the whole point is
 * that the learner never gets the same explanation twice.
 */
export const ROUTE_IDS = ['analogy', 'object', 'story', 'experiment', 'smaller', 'backward']

export const ROUTE_LABELS = {
  analogy:    'Give me an analogy',
  object:     'Use something in my hand',
  story:      'Tell me a story',
  experiment: "Let's try it right now",
  smaller:    'Ask me a smaller question',
  backward:   'Start from the end'
}

/**
 * @typedef {Object} Lesson
 * @property {string}  id            'lesson-01' — also the storage key suffix
 * @property {number}  number        position within the week
 * @property {number}  week
 * @property {string}  title
 * @property {string}  openingQuestion
 * @property {string}  concept       short name, used on journal entries
 * @property {SeeStage}        see
 * @property {UnderstandStage} understand
 * @property {ConnectStage}    connect
 * @property {FeynmanStage}    feynman
 * @property {ChallengeStage}  challenge
 * @property {ReflectStage}    reflect
 * @property {Route[]}         routes  exactly six, one per ROUTE_IDS
 * @property {MapEntry[]}      map     the Understanding Map as of this lesson
 *
 * @typedef {Object} SeeStage
 * @property {string} voice        key of FACULTY
 * @property {string} line         one line of dialogue
 * @property {{id: string, props?: Object}} simulation  id registered in engine/simulations
 * @property {{text: string, emphasis?: boolean}[]} observations  three closing cards
 *
 * @typedef {Object} UnderstandStage
 * @property {string} voice
 * @property {string} line
 * @property {string[]} sentences          exactly three — the mental model
 * @property {{label: string, body: string}} comparison  one everyday comparison
 * @property {string} naming               the paragraph that finally names it
 * @property {{terms: {term: string, meaning: string}[], note?: string}} formalNames
 *
 * @typedef {Object} ConnectStage
 * @property {string} voice
 * @property {string} line
 * @property {string[]} items              six tappable everyday situations
 * @property {{body: string}} [builder]    optional Builder activity
 * @property {string} ownPlaceholder
 * @property {string} synthesis            appears after two picks or a typed answer
 *
 * @typedef {Object} FeynmanStage
 * @property {string} line
 * @property {string} instruction
 * @property {string[]} banned             word stems the explanation may not use
 * @property {string} bannedNote           what to say when one slips in
 * @property {string} placeholder
 * @property {string[]} checks             four self-assessment items
 * @property {string} closing
 *
 * @typedef {Object} ChallengeStage
 * @property {string} voice
 * @property {string} line
 * @property {{question: string, options: {id: string, text: string, verdict: string}[]}} prediction
 * @property {{question: string, placeholder: string, reveal: string[]}} open
 *
 * @typedef {Object} ReflectStage
 * @property {string} voice
 * @property {string} line
 * @property {string} prompt
 * @property {string} placeholder
 * @property {string} mapFooter
 * @property {string} tomorrow
 *
 * @typedef {Object} Route
 * @property {string} id     one of ROUTE_IDS
 * @property {string} body   a *different* explanation, never a rephrasing
 *
 * @typedef {Object} MapEntry
 * @property {string} name
 * @property {number} level  0-5, see LEVELS
 * @property {boolean} [fresh]  first appearance in this lesson
 */

/**
 * Checks a lesson against the rules the design depends on. Run by the test
 * suite over every lesson in every course, so a content mistake fails at
 * `npm test` rather than in front of the learner.
 *
 * @returns {string[]} problems; empty means the lesson is well-formed
 */
export function validateLesson(lesson) {
  const problems = []
  const need = (cond, message) => { if (!cond) problems.push(message) }
  const where = lesson?.id ?? '(no id)'
  const at = (m) => `${where}: ${m}`

  need(!!lesson?.id, at('missing id'))
  need(!!lesson?.title, at('missing title'))
  need(!!lesson?.openingQuestion, at('missing openingQuestion'))
  need(!!lesson?.concept, at('missing concept'))

  need(!!lesson?.see?.simulation?.id, at('SEE IT has no simulation id'))
  need(lesson?.see?.observations?.length === 3,
    at('SEE IT wants exactly three observation cards'))

  need(lesson?.understand?.sentences?.length === 3,
    at('UNDERSTAND IT wants exactly three sentences — the whole mental model'))
  need(!!lesson?.understand?.comparison?.body, at('UNDERSTAND IT has no comparison'))
  need(!!lesson?.understand?.naming, at('UNDERSTAND IT never names the concept'))
  need((lesson?.understand?.formalNames?.terms?.length ?? 0) > 0,
    at('UNDERSTAND IT has no formal names panel'))

  need(lesson?.connect?.items?.length === 6, at('CONNECT IT wants six situations'))
  need(!!lesson?.connect?.synthesis, at('CONNECT IT has no synthesis line'))

  need((lesson?.feynman?.banned?.length ?? 0) > 0,
    at('FEYNMAN IT needs at least one banned word — that is the exercise'))
  need(lesson?.feynman?.checks?.length === 4, at('FEYNMAN IT wants four checks'))

  const options = lesson?.challenge?.prediction?.options ?? []
  need(options.length >= 2, at('CHALLENGE IT needs at least two options'))
  for (const o of options) {
    // The trap the handoff names explicitly: never buzz a wrong answer.
    need((o.verdict ?? '').trim().length > 80,
      at(`option "${o.id}" has no substantive verdict — every wrong answer gets a real reply`))
  }
  need((lesson?.challenge?.open?.reveal?.length ?? 0) > 0,
    at('CHALLENGE IT has no reveal for the open question'))

  need(!!lesson?.reflect?.prompt, at('REFLECT has no journal prompt'))
  need(!!lesson?.reflect?.tomorrow, at('REFLECT has no teaser for tomorrow'))

  const routeIds = (lesson?.routes ?? []).map((r) => r.id)
  for (const id of ROUTE_IDS) {
    need(routeIds.includes(id), at(`"I don't get it" is missing the ${id} route`))
  }
  for (const r of lesson?.routes ?? []) {
    need((r.body ?? '').trim().length > 60,
      at(`route "${r.id}" is too short to be a different explanation`))
  }

  need((lesson?.map?.length ?? 0) > 0, at('no Understanding Map entries'))
  for (const m of lesson?.map ?? []) {
    need(m.level >= 0 && m.level <= 5, at(`map entry "${m.name}" has level outside 0-5`))
  }

  return problems
}
