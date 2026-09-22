# Heartwood University

> Learn the heart of a subject. See it in the world.

A personal learning environment. The first course is **Physics I — Seeing the
World Through Physics**. Weeks 1 to 3 are complete — fifteen lessons, fourteen simulations.

Live at **<https://disruptivecapitalist.github.io/heartwood/>**.

It also runs entirely on this machine — no account, no server, fonts bundled, so
it works with the wifi off.

---

## Running it

```bash
cd ~/Desktop/Heartwood && npm run dev
```

Then open <http://localhost:5173>. Or double-click **Heartwood.command** in this
folder, which does the same thing and opens the browser for you.

To check everything still holds together:

```bash
cd ~/Desktop/Heartwood && npm test
```

## What the faculty call you

The Professor addresses the learner by name. That name is a setting, not a
constant in the copy:

* `learnerName` in `src/content/physics-i/course.js` is the course's default.
  It ships empty.
* The course home page has a field — **WHAT THE FACULTY CALL YOU** — that
  overrides it and remembers the answer in that browser.

Copy addresses the learner with `{name}`. With a name set, `{name}, look at
this.` reads *"Dennis, look at this."*; with none, the token and the comma
disappear and the sentence is re-capitalised to *"Look at this."* So a course
you share reads neutrally to whoever opens it, and personally to whoever sets
their name. Both forms are covered by the tests.

## Sending it to someone

Two ways, depending on what you want them to do with it.

**A link.** The course is live at <https://disruptivecapitalist.github.io/heartwood/>. It is public, needs no account and works
on any device — a tablet included, which the file below does not. Pushing to
`main` rebuilds and redeploys it; the workflow runs the tests first and will not
publish a build that fails them.

**One file they can keep.**

```bash
npm run build:single
```

That writes **Heartwood - Physics I.html** into this folder: a single 293 KB
file with the fonts, the styles and the whole app inside it. Email it, drop it in
a shared folder, double-click it. No install, no server, no network.

If it ever opens to a page headed *"This page did not get to start"*, that is
the file telling you its JavaScript was not allowed to run — almost always
because it was opened in a preview rather than in a browser. Tablets do that by
default; see below.

One caveat worth passing on: opened straight from a file, Chrome refuses the
browser storage this app saves into, so nothing a reader types is kept. It runs
fine and loses nothing else — Safari and Firefox do keep it, but keyed to that
exact file path, so moving the file loses the writing. For someone reading the
lessons rather than working through them, that is the right trade. For actually
using the course, run it here or use the link.

### Where the writing is kept

The journal, the Feynman answers and the name all live in browser storage, which
is per browser, per device and per address. Nothing syncs.

| How it is opened | Saves? |
|---|---|
| `npm run dev` here | Yes — against `http://localhost:5173` |
| The shared link | Yes |
| The single file, in Safari or Firefox | Yes, until the file is moved |
| The single file, in Chrome | No — it runs, but keeps nothing |
| The single file, on a tablet | It does not run at all — use the link |

Two consequences worth knowing. Changing the dev server's port makes it a
different address and therefore a different, empty journal. And whatever your
friend writes stays on their machine — you will not see it, and they will not
see yours.

## What is here

```
src/
  content/                  the lessons — this is where authoring happens
    schema.js               what a lesson is, and a validator that enforces it
    index.js                the list of subjects
    physics-i/
      course.js             the six-week syllabus and the course's own copy
      lessons/
        lesson-01.js        inertia — "The passenger who keeps going"
        lesson-02.js        dynamic stability — "The bicycle that is always falling over"
        lesson-03.js        friction — "Why a rolling ball eventually stops"
        lesson-04.js        mass — "Why a heavy thing is harder to get moving"
        lesson-05.js        momentum — "What momentum actually measures"
        lesson-06.js        force — "Push, pull, and the forces you never see"
        lesson-07.js        static/kinetic friction — "Friction: the force that stops everything"
        lesson-08.js        compression & tension — "Compression and tension in a chair"
        lesson-09.js        load paths — "Why a bridge carries a truck"
        lesson-10.js        torque — "Your knees, your ladder, your bookshelf"
        lesson-11.js        energy transformation — "Where the motion goes when a car stops"
        lesson-12.js        potential energy — "Stored energy: the weight, the spring, the hill"
        lesson-13.js        thermal energy — "Heat is the place energy goes to hide"
        lesson-14.js        energy conversion — "How a falling weight makes electricity"
        lesson-15.js        efficiency — "Why nothing is ever 100% efficient"

  engine/                   renders any lesson of any subject
    Lesson.jsx              the one lesson component
    stages/                 SEE IT, UNDERSTAND IT, CONNECT IT, FEYNMAN IT, CHALLENGE IT, REFLECT
    simulations/            the interactive scenes, registered by id
    StageRail, StuckPanel, UnderstandingMap, FacultyBadge

  screens/CourseHome.jsx    the page the learner lands on each day
  lib/                      storage, progress, the rAF loop and physics helpers
  tokens.css                every colour, size and typeface in one place
```

The important line: **copy is data, a simulation is code.** Writing Lesson 3's
words means editing one file in `content/`. Giving Lesson 3 a new interactive
scene means writing a React component and registering it. That asymmetry is the
real cost of the next twenty-eight lessons, and it is deliberate that it shows.

## Where the course is

| Week | Lessons | State |
|---|---|---|
| 1 · The Rules of Motion | 1–5 | **written** |
| 2 · Forces | 6–10 | **written** |
| 3 · Energy | 11–15 | **written** |
| 4 · Heat, pressure and the invisible world | 16–20 | syllabus only |
| 5 · Waves, sound and light | 21–25 | syllabus only |
| 6 · Physics is everywhere | 26–30 | syllabus only |

Lessons 16–30 are specified in the build package that came with the design
handoff. They are authored the way Lessons 3–5 were, one week at a time — the
package is explicit that they must not read like textbook chapters, and volume
is the enemy of that.

**The simulations are the real cost, and the families are paying off.** Copy is
data; a scene is code. Fifteen lessons have needed only fourteen scenes, because
two of them are built to be reused:

- `truss.js` + `BridgeTruss` — a real method-of-joints solver, so members are in
  tension or compression because the arithmetic says so rather than because
  someone picked the colours.
- `ParticleBox` — the molecular view. Lesson 13 uses it for heat; Lessons 16 and
  20 will reuse it for temperature and pressure, which is why it already counts
  wall hits it does not yet need.
- `EnergyChain` — one component, two lessons: the hydroelectric chain in 14 and
  the four-machine comparison in 15.

A wave on a medium will cover sound and the guitar string; a ray diagram will
cover refraction and lenses. That is what keeps Weeks 4–6 from being fifteen
more scenes.

**Simulations get measured, not eyeballed.** Three defects this week were found
by driving the running app and checking the numbers against what the lesson
claims: the spring's total energy drifted 2% under plain Euler (now velocity
Verlet, drift 0.000%), the particle box reported a non-monotonic wall-hit rate,
and the energy chain's rounded losses added to 101 out of 100 — in a lesson
about conservation. A caption that argues with its own simulation is the worst
failure available here.

## Adding a lesson

1. Copy the nearest existing lesson in `src/content/physics-i/lessons/` and
   rewrite the content. `src/content/schema.js` documents every field.
2. In `src/content/physics-i/course.js`, add `lessonId` to the matching syllabus
   entry. The home page picks it up: the row stops saying NOT YET WRITTEN, and
   the Today card offers it once the lesson before is done.
3. If it needs a new scene, add a component under `src/engine/simulations/` and
   a line in that folder's `index.js`. If an existing scene fits with different
   numbers, just point at it: `simulation: { id: 'braking-car', props: {…} }`.
4. `npm test`. The suite validates every lesson in every subject — six different
   "I don't get it" routes, three mental-model sentences, a real verdict on every
   wrong answer, a simulation that actually exists.

## Adding a second subject

Make a folder beside `physics-i/` with its own `course.js` and `lessons/`, and
add it to the array in `src/content/index.js`. The engine does not need to change.

While there is only one subject the app opens straight into it — the brief is
explicit (§18) that there is no course catalog yet.

---

## Deliberate deviations from the prototype

Four changes, each for a stated reason. Everything else is the design as handed
over, including all copy and all physics constants.

**1. The bicycle's wobble no longer depends on the display.**
Two decay constants were applied once per frame rather than per second, and the
road noise scaled with `dt` where a correlated process needs `√dt`. Measured over
thirty seconds of the autopilot:

| refresh | lean RMS | steer RMS |
|---|---|---|
| 30 Hz | 1.28° | 0.50 |
| **60 Hz — what the design was tuned on** | **1.03°** | **0.38** |
| 120 Hz | 0.42° | 0.19 |
| 144 Hz | 0.31° | 0.15 |

On a 120 Hz laptop the bicycle would have held itself nearly still underneath a
caption reading *"Every wiggle is a correction."* The time constants are now in
seconds (`src/lib/sim.js`) and the behaviour is flat from 30 Hz to 144 Hz —
asserted in `src/__tests__/sim.test.js`, and measured at 0.99° RMS in the running
app. The steering trace also holds three *seconds* now rather than 140 *frames*.

**2. The rider's reflexes start switched on.**
They started off, so the bicycle reached the ground about two seconds after the
page painted — before the learner had finished reading the line telling them to
ride it — and the trace under "every wiggle is a correction" was a flat line.
A hand on the bars still overrides the autopilot instantly, so "try to keep it
up" works either way, and turning the reflexes off gives the pure version.

**3. Four colours darkened, for one 73-year-old reading on a laptop.**
The prose palette was already fine (13.6:1 for body text). These were not:
the uppercase labels on the simulation readouts — SPEED, LEAN, HOW HARD THE CAR
IS SLOWING — sat at 3.9:1, the faint hint colour at 2.2:1, and textarea borders
at 1.8:1, which made the Feynman box barely read as a box. New values are in
`src/tokens.css` with the originals in comments. Decorative dividers are
untouched at `#d8cdba`.

**4. The simulation readouts stack on a narrow window.**
Two absolutely positioned blocks, one of them 230px wide, collided inside a
320px column. Below 720px they now flow above the scene.

Also added, none of it visible if nothing goes wrong: keyboard focus rings,
`prefers-reduced-motion`, text alternatives on both scenes, and `aria-live` on
the status lines so the state changes are announced rather than only drawn.

## What is deliberately not built

The handoff called these "known shortcuts." Three of them are really one
decision, and it has not been made yet.

**The brief describes an AI tutor. This is an authored one.** The brief wants the
Feynman answer evaluated (§7), the Roommate to *choose* a route (§8), and a daily
memory feeding later lessons (§10). None of that is here. The prototype tested
extremely well without it — *"It did not feel like school"* — and the brief's own
author names "too much like AI" as a failure mode alongside "too much like
school." The authored version is finite, fast and confident, and that may be why
it worked.

If the Feynman check does get a model behind it, the suggestion is an opt-in
button under the existing checklist — *"Show me what the Editor thinks"* — rather
than replacing the self-assessment. If he never presses it, that is worth knowing.

**The Understanding Map is authored per lesson, not derived.** The home page now
shows the snapshot from the furthest lesson reached, rather than a separate
hardcoded copy, so the two stay in step. Deriving real levels needs evidence the
product does not collect: levels 4 and 5 are "explain" and "use," and the Feynman
answer is ungraded while the challenge is multiple choice. That work depends on
the decision above — it is not independent of it.

**Storage is `localStorage`, with an escape hatch.** One key per lesson,
namespaced by course, all of it behind `src/lib/storage.js` — the single seam to
replace when it needs to be sturdier. The journal card has a **KEEP A COPY**
button that saves a plain text file, because a journal that a cleared cache can
erase is not really a journal.

---

## Two rules that must survive any future edit

**Never give a wrong answer a buzzer.** Every option in every prediction gets a
real, respectful verdict that credits whatever was right about it. The wrong
answers are where the learning is. The test suite fails a verdict under 80
characters, which is a crude proxy for a rule that matters.

**The bicycle must visibly wobble.** A demo that settles into serene stability
under a caption about constant correction teaches the opposite of the lesson.
That is what `sim.test.js` is guarding.

## The standard

From the brief (§20): can he **see** it, **explain** it, **connect** it to
ordinary life, **use** it, and **recognize** it later? And the tone test, which
is the prototype's own measure of success — it must not feel like a lecture he is
taking notes in.
