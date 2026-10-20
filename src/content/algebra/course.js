import { WEEKS, CONCEPTS, PATHS, LESSONS } from './algebra-content.js'

// Class 4. The Algebra Companion is the first class in Heartwood that does not
// fit the shape of the other three, and the handoff is explicit about why:
//
//   - It runs on THREE PATHWAYS — a student meeting the idea, an adult
//     rebuilding it, and the two of them working together — and the content
//     differs at every stage, not just in tone.
//   - The learner answers questions. 145 challenge problems and 52 guided ones,
//     each with its own diagnosis of the wrong answers people actually give.
//   - It is a companion to a school course rather than a path through one, so
//     it can be entered at any concept, and nothing is ever locked.
//
// Because of that it has its own home, its own lesson player and its own
// progress keys. The README's promise that "adding a class must not need new UI
// code" holds for a class shaped like Physics I; this one is shaped differently,
// and the handoff ships a separate generic player for it for the same reason.
//
// `kind: 'algebra'` is what the catalog, the router and the test suite branch
// on. Everything under this folder is data ported from the handoff.

export default {
  id: 'algebra',
  kind: 'algebra',
  order: 4,
  status: 'open',
  title: `Algebra Companion`,
  subtitle: `Understand what it means. Use it. Explain why it works.`,
  blurb: `A companion to a school algebra course — for a student, for an adult refreshing it, or for both together.`,
  kicker: `A COMPANION TO YOUR SCHOOL COURSE`,
  meta: `Six weeks · about 30 minutes a lesson · For students, adults refreshing, and both together · Enter at any concept`,

  weeks: WEEKS,
  concepts: CONCEPTS,
  paths: PATHS,
  lessons: LESSONS,

  journalPrompts: [
    `What makes more sense now?`,
    `What was confusing at the beginning?`,
    `Where might you use this idea?`,
    `What would you like to understand more deeply?`
  ],

  closing: [
    {
      label: `THE MEASURE OF SUCCESS`,
      body: `Not a grade. Sitting down with a page of homework, or a problem someone brings you, and finding you know where to start — and can say why the first step is the right one.`
    },
    {
      label: `ENTER ANYWHERE`,
      body: `This is a companion, not a track. Nothing is locked, nothing is scored, and the right lesson is whichever one your course reached this week. The refresher will suggest a starting point if you would rather be told.`
    },
    {
      label: `THE ONE RULE`,
      body: `"I don't get it" is the most useful sentence here. Say it and the explanation changes direction — it is never simply repeated, and after three it offers you the smaller idea underneath.`,
      tone: 'green'
    }
  ]
}
