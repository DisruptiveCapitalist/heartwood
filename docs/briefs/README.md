# The briefs

The documents Heartwood is built from, converted to Markdown so they can be
read, searched and diffed here instead of living in a zip in someone's
Downloads folder. The Word originals are the learner's; these are faithful text
extractions of them, not edits.

Read these before writing a lesson. They are the authority on *what* a class
teaches and what it must not do — this repository is the authority on how.

| File | What it is |
| --- | --- |
| `original-brief.md` | The original Heartwood brief. Defines the six stages, the four tutor voices, the "I don't get it" routes, the Understanding Map and the Journal. Applies to every class. |
| `lesson-engine-handoff.md` | The Physics I lesson-engine handoff: the full specification of the player, the stages and the panels. Still applies to every class. |
| `university-handoff.md` | The multi-class handoff. The catalog, the class home, and how to add a class. Also records which Lesson 1 copy was approved by the learner. |
| `physics-i-lessons-3-30.md` | The build package for Physics I, Lessons 3–30. **Built: 30/30.** |
| `anatomy-course-spec.md` | The full Anatomy & Physiology course spec, all 30 lessons. **Built: 30/30.** Sections 5, 6 and 8 are what you need. |
| `navigation-handoff.md` | The Navigation design handoff. **The four decisions that override the brief** are in it: cultures spread through the course rather than gathered at the end, completion on the Feynman submission, long field exercises becoming simulations, and the Field Guide being out of scope. All four are built; this is where they came from. Its storage-key note describes the DESIGN PROTOTYPES, not this app — see below. |
| `navigation-week-7.md` | The optional Field Week, Lessons 31–35, which gives the handbook's Part V the lessons it never had. **Built: 5/5.** Optional means optional in the code as well as the copy — see `isOptionalWeek` in `schema.js` and the guards in `completion.test.js`. |
| `field-guide-spec.md` | The Heartwood Field Guide spec: the companion handbook to the Navigation class, in 31 chapters across six parts. **Every chapter now has a lesson behind it. It is the authority on chapter numbers**, which every Navigation lesson cites, and on what each chapter must contain. |

Navigation's six-week outline arrived in the chat and lives in
`src/content/navigation/course.js`, which is the record of it. **Built: 30/30.**
Its design handoff is `navigation-handoff.md`, which was missing from this
folder until the Week 7 package arrived — the repository said for five weeks
that Navigation had no build package, and it did. That outline and the Field Guide spec
disagreed about Week 5, and the spec won — see the comment on the week in
`course.js`. Check the spec's chapter list before writing a `fieldGuide` block;
Week 5 was first built pointing at Chapter 14, which is about measuring the
height of a tree.

**Every one of the Field Guide's thirty-one chapters now has a lesson behind
it.** Part V got Field Week, 31 to 35, covering chapters 17 to 22 with 19 and
20 sharing Lesson 33. Chapter 14, Measuring Height with a Compass, got Lesson
36, which sits in a second optional block of its own: it belongs beside Week
5's measuring, Week 5 was full, and it is not part of Field Week's argument
about signs — so it is shelved honestly rather than filed under a heading it
contradicts.

The paragraph below is kept as the record of why Week 6 looked as it did.

**Two parts of the Field Guide spec have no lesson anywhere in the class, and
that was a decision rather than an oversight.** Week 6's five slots went to the
outline's own five titles, and the two debts the course had already run up —
longitude, promised to the learner since Lesson 3 and named for Week 6 in
Lesson 25, and emergency navigation — took two of them. So **Chapter 14,
Measuring Height with a Compass**, appears only as a formal-names term in
Lessons 23 and 29; and the whole of **Part V, chapters 17 to 22** — wind and
weather, water and drainage, plants, animals, geology, the human landscape —
has no lesson at all. Those chapters still have to be written for the handbook
and the lessons are not there to support them. A seventh week, or a second
class, is the obvious home, and it is the learner's call.

**One thing the spec asks for that no lesson carries.** Chapter 23 wants the
Bighorn Medicine Wheel and the alignments proposed for it. Lesson 28 is the
lesson behind Chapter 23 and its one Across Cultures slot holds the Chacoan
Great North Road, which that lesson needs. So the Bighorn card was written for
the handbook alone and filed in `docs/cards/` — see the README there. It is the
only card in the course with no lesson behind it.

Electricity & Energy has no separate document: its syllabus arrived inside
`university-handoff.md` and the design references, and the built syllabus in
`src/content/electricity/course.js` is now the record of it. **Built: 30/30.**

## Two things worth knowing before you use these

**Lesson 1 of each class was written by the design step, approved by the
learner, and transcribed rather than rewritten.** Do not "improve" copy that is
already in `src/content/*/lessons/lesson-01.js` on the strength of these
documents — it was signed off as it stands.

**The anatomy spec's section 8 is load-bearing, not boilerplate.** It is why the
class home says "Understanding, not diagnosis", why Lesson 1's weight slider is
never persisted, and why the lessons explain mechanisms without diagnosing. The
same section also lists the things commonly taught wrong that the lessons are
expected to correct — not all ATP comes from mitochondria, arteries are defined
by direction rather than oxygen content, and so on. Those corrections are the
most valuable paragraphs in the document.


## One thing in the Navigation handoffs that does not describe this app

Both `navigation-handoff.md` and `navigation-week-7.md` give storage keys in the
form `heartwood.navigation.lesson1` and `heartwood.navigation.lesson31`. That is
the format the design prototypes used, and the first of them says so. This app
has always used `heartwood.v1.<course>.<lesson-NN>` — the version segment and
the hyphen both matter, `src/lib/storage.js` is the only module that builds a
key, and 150 built lessons are stored under that form. Follow the code, not the
document, and do not "fix" the keys to match it.
