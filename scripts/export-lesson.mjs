#!/usr/bin/env node
// Export a finished lesson as Markdown, for the handbook writer.
//
// The Navigation handoff puts a companion Field Guide outside this build but
// asks that its wording and diagrams stay consistent with the lessons. That
// only works if whoever writes it can read the finished lesson — all of it,
// in order, including the things a reader of the screen would miss:
//
//   - the formal names, because the handbook defines the same terms
//   - the Across Cultures card WITH its evidence label, uncertainty and
//     sources, so a claim is never restated without them
//   - what the simulation stands in for, because decision 3 in NAVIGATION.md
//     turns long field exercises into simulations and leaves the real exercise
//     to the handbook
//   - all seven "I don't get it" routes, which are the alternative explanations
//
// Usage:
//   node scripts/export-lesson.mjs                      every written lesson
//   node scripts/export-lesson.mjs navigation           one course
//   node scripts/export-lesson.mjs navigation lesson-01 one lesson
//
// Writes docs/lessons/<course>/<lesson>.md and prints what it wrote.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { courses } from '../src/content/index.js'
import { describe as describeSim } from '../src/engine/simulations/descriptions.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'docs', 'lessons')

// A small copy of lib/rich.jsx's name handling. That module is JSX and pulls in
// React, which this script has no use for; the rule is one line and is tested
// there.
const strip = (text) =>
  String(text ?? '')
    .replace(/\{name\}\s*,\s*/g, '')
    .replaceAll('{name}', '')
    .replace(/ {2,}/g, ' ')
    .replace(/^(\s*)([a-z])/, (_, sp, c) => sp + c.toUpperCase())
    .trim()

const H = (level, text) => `${'#'.repeat(level)} ${text}\n`
const P = (text) => `${strip(text)}\n`
const LIST = (items) => items.map((i) => `- ${strip(i)}`).join('\n') + '\n'

function render(course, lesson) {
  const week = course.weeks[lesson.week - 1]
  const out = []

  out.push(H(1, `${course.title} — Lesson ${lesson.number}: ${strip(lesson.title)}`))
  out.push(
    `> Week ${lesson.week} of ${course.weeks.length} · ${week.title}  \n` +
    `> Concept: **${strip(lesson.concept)}**  \n` +
    `> Lesson completes when: **${course.completeOn === 'feynman' ? 'the Feynman explanation is submitted' : 'REFLECT is reached'}**\n`
  )
  out.push(`\n_Opening question._ ${P(lesson.openingQuestion)}`)

  // SEE IT
  out.push(`\n${H(2, 'SEE IT')}`)
  out.push(`*The Professor:* ${P(lesson.see.line)}`)
  const sim = describeSim(lesson.see.simulation.id)
  out.push(
    `\n**On-screen simulation:** \`${lesson.see.simulation.id}\`` +
    (lesson.see.simulation.props ? ` (${JSON.stringify(lesson.see.simulation.props)})` : '') + '\n'
  )
  if (sim) {
    out.push(`\n**What it shows.** ${strip(sim.shows)}\n`)
    out.push(`\n**What the learner can change.** ${strip(sim.changes)}\n`)
    if (sim.numbers) out.push(`\n**The numbers behind it.** ${strip(sim.numbers)}\n`)
    if (sim.handbook) out.push(`\n> _For the handbook:_ ${strip(sim.handbook)}\n`)
  } else {
    out.push(`\n> _No description recorded for this simulation yet._\n`)
  }
  out.push(`\n> _This is the lesson's hands-on moment. Where it stands in for a real field exercise, that exercise belongs in the Field Guide._\n`)
  out.push(`\n**What the learner should notice**\n`)
  out.push(LIST(lesson.see.observations.map((o) => o.text)))

  // UNDERSTAND IT
  out.push(`\n${H(2, 'UNDERSTAND IT')}`)
  out.push(`*The Professor:* ${P(lesson.understand.line)}`)
  out.push(`\n**The three sentences**\n`)
  out.push(lesson.understand.sentences.map((s, i) => `${i + 1}. ${strip(s)}`).join('\n') + '\n')
  if (lesson.understand.comparison) {
    out.push(`\n${H(3, lesson.understand.comparison.label)}`)
    out.push(P(lesson.understand.comparison.body))
  }
  if (lesson.understand.naming) out.push(`\n${P(lesson.understand.naming)}`)
  if (lesson.understand.formalNames?.terms?.length) {
    out.push(`\n${H(3, 'The formal names')}`)
    out.push(`| Term | Meaning |\n|---|---|\n` +
      lesson.understand.formalNames.terms
        .map((t) => `| **${strip(t.term)}** | ${strip(t.meaning).replace(/\|/g, '\\|')} |`)
        .join('\n') + '\n')
  }
  if (lesson.understand.sequence) {
    out.push(`\n${H(3, lesson.understand.sequence.label)}`)
    out.push(lesson.understand.sequence.steps
      .map((s, i) => `${i + 1}. **${strip(s.name)}** — ${strip(s.body)}`).join('\n') + '\n')
  }

  // CONNECT IT
  out.push(`\n${H(2, 'CONNECT IT')}`)
  out.push(`*The Roommate:* ${P(lesson.connect.line)}`)
  out.push(`\n**Where it shows up**\n`)
  out.push(LIST(lesson.connect.items.map((i) => (typeof i === 'string' ? i : i.t))))
  if (lesson.connect.synthesis) {
    // It answers the list directly — "every one of those…" — so it reads with
    // the list rather than at the end of the stage. On screen it is withheld
    // until the learner has ticked two, or written one of their own.
    out.push(`\n${P(lesson.connect.synthesis)}`)
    out.push(`\n_Shown on screen only once the learner has ticked two of the items above, or written one of their own._\n`)
  }
  if (lesson.connect.builder) {
    out.push(`\n${H(3, 'The Builder — try it yourself')}`)
    out.push(P(lesson.connect.builder.body))
  }
  const ac = lesson.connect.acrossCultures
  if (ac) {
    out.push(`\n${H(3, `Across cultures — ${ac.place}`)}`)
    out.push(`**Evidence label: ${ac.label}**\n`)
    for (const para of ac.paragraphs) out.push(`\n${P(para)}`)
    out.push(`\n> **What remains uncertain:** ${strip(ac.uncertain)}  \n> **Sources:** ${strip(ac.sources)}\n`)
    out.push(`\n_Do not restate this claim in the handbook without its label, its uncertainty and its sources._\n`)
  }

  // FEYNMAN IT
  out.push(`\n${H(2, 'FEYNMAN IT')}`)
  out.push(P(lesson.feynman.instruction))
  if (lesson.feynman.banned?.length) {
    out.push(`\nBanned words: ${lesson.feynman.banned.map((b) => `**${b}**`).join(', ')}\n`)
  }
  out.push(`\n**A good explanation contains**\n`)
  out.push(LIST(lesson.feynman.checks))

  // CHALLENGE IT
  out.push(`\n${H(2, 'CHALLENGE IT')}`)
  out.push(`*The Editor:* ${P(lesson.challenge.line)}`)
  out.push(`\n**${strip(lesson.challenge.prediction.question)}**\n`)
  for (const o of lesson.challenge.prediction.options) {
    out.push(`\n- _${strip(o.text)}_  \n  ${strip(o.verdict)}\n`)
  }
  out.push(`\n**${strip(lesson.challenge.open.question)}**\n`)
  for (const para of lesson.challenge.open.reveal) out.push(`\n${P(para)}`)
  if (lesson.challenge.open.crossLink) {
    const l = lesson.challenge.open.crossLink
    out.push(`\n_Links across to:_ ${strip(l.label)} (\`${l.courseId}/${l.lessonId}\`)\n`)
  }

  // REFLECT
  out.push(`\n${H(2, 'REFLECT')}`)
  out.push(P(lesson.reflect.prompt))
  out.push(`\n_Tomorrow:_ ${P(lesson.reflect.tomorrow)}`)

  // Routes and map — the alternative explanations, and where the course stands.
  out.push(`\n${H(2, `"I don't get it" — ${lesson.routes.length} ways in`)}`)
  for (const r of lesson.routes) {
    out.push(`\n${H(3, strip(r.label ?? r.id))}`)
    out.push(P(r.body))
  }

  out.push(`\n${H(2, 'Understanding Map after this lesson')}`)
  out.push(`| Concept | Level (0–5) |\n|---|---|\n` +
    lesson.map.map((m) => `| ${strip(m.name)} | ${m.level} |`).join('\n') + '\n')

  return out.join('')
}

const [courseArg, lessonArg] = process.argv.slice(2)
const chosen = courses.filter((c) => (courseArg ? c.id === courseArg : true))

if (courseArg && chosen.length === 0) {
  console.error(`No course "${courseArg}". Try: ${courses.map((c) => c.id).join(', ')}`)
  process.exit(1)
}

let written = 0
for (const course of chosen) {
  if (course.kind === 'algebra') {
    // The Algebra Companion is a different lesson shape with three pathways and
    // its own player; exporting it needs its own renderer, not this one.
    if (courseArg) console.error(`The Algebra Companion has a different lesson shape — not exported.`)
    continue
  }
  for (const [id, lesson] of Object.entries(course.lessons)) {
    if (lessonArg && id !== lessonArg) continue
    const dir = join(OUT, course.id)
    await mkdir(dir, { recursive: true })
    const file = join(dir, `${id}.md`)
    await writeFile(file, render(course, lesson), 'utf8')
    console.log(`${course.id}/${id}  →  docs/lessons/${course.id}/${id}.md`)
    written += 1
  }
}

if (written === 0) {
  console.error(lessonArg ? `No lesson "${lessonArg}" in that course.` : 'Nothing to export.')
  process.exit(1)
}
console.log(`\n${written} lesson${written === 1 ? '' : 's'} exported.`)
