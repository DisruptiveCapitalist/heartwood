# Heartwood University

> Learn the heart of a subject. See it in the world.

A personal learning environment holding several **classes**, each six weeks of
five lessons. A catalog is the way in.

| Class | | |
|---|---|---|
| **Physics I** — Seeing the World Through Physics | **30 of 30 written** | **complete** |
| **Electricity & Energy** — The Power You Never See | **30 of 30 written** | **complete** |
| **Anatomy & Physiology** — The Human Body, from the Cell to the Whole Person | **30 of 30 written** | **complete** |
| **Algebra Companion** — Understand what it means. Use it. Explain why it works. | **30 of 30 playable** | engine done |

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

That writes **Heartwood University.html** into this folder: a single 293 KB
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
    index.js                the class registry the catalog renders
    electricity/            the second class
      course.js
      lessons/lesson-01.js  "The lamp that doesn't wait"
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
        lesson-16.js        temperature — "What temperature actually measures"
        lesson-17.js        density & buoyancy — "Why a hot-air balloon rises"
        lesson-18.js        displacement — "Why a steel ship floats"
        lesson-19.js        atmospheric pressure — "Why you can drink through a straw"
        lesson-20.js        pressure — "Pressure cookers, tires, and weather"
        lesson-21.js        sound waves — "What happens when you hear a voice"
        lesson-22.js        frequency — "Frequency, pitch, and a guitar string"
        lesson-23.js        sound processing — "What is happening inside your hearing aids"
        lesson-24.js        refraction — "Why a straw looks bent in water"
        lesson-25.js        reflection & colour — "Mirrors, lenses, and color"
        lesson-26.js        transfer — "A bridge, a ladder, a bicycle"
        lesson-27.js        machines — "A refrigerator and a ceiling fan"
        lesson-28.js        fluids — "A boat and an airplane"
        lesson-29.js        the spectrum — "A flashlight and a microwave"
        lesson-30.js        the last one — "Anything you point at"

  engine/                   renders any lesson of any subject
    Lesson.jsx              the one lesson component
    stages/                 SEE IT, UNDERSTAND IT, CONNECT IT, FEYNMAN IT, CHALLENGE IT, REFLECT
    simulations/            the interactive scenes, registered by id
    StageRail, StuckPanel, UnderstandingMap, FacultyBadge

  screens/
    Catalog.jsx             the way in: one card per class
    CourseHome.jsx          a class home — one component renders any class
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
| 4 · Heat, pressure and the invisible world | 16–20 | **written** |
| 5 · Waves, sound and light | 21–25 | **written** |
| 6 · Physics is everywhere | 26–30 | **written** |

Physics I, Electricity & Energy and Anatomy & Physiology are all finished —
ninety lessons. The Algebra Companion is the fourth class and the first that
does not share their shape; see "The Algebra Companion" below.

**The simulations are the real cost, and the families are paying off.** Copy is
data; a scene is code. Twenty lessons have needed only sixteen scenes, because
several are built to be reused:

- `truss.js` + `BridgeTruss` — a real method-of-joints solver, so members are in
  tension or compression because the arithmetic says so rather than because
  someone picked the colours.
- `ParticleBox` — the molecular view, now serving three lessons from one
  component: heat (13), temperature (16, with the amount of gas made adjustable
  so the average and the total separate), and pressure (20, with a wall the
  learner can push in). Squeezing the box to half its room raises the reading by
  1.97×, against Boyle's 2 — the law emerging from collisions rather than being
  asserted.
- `Buoyancy` — one component, two fluids: the hot-air parcel in Lesson 17 and
  the steel hull in Lesson 18.
- `EnergyChain` — three lessons: the hydroelectric chain (14), the four-machine
  comparison (15) and the fridge against the fan (27).
- `WaveMedium` — sound in air (21) and a string under tension (22). Measured:
  halving the length doubles the frequency, doubling the tension multiplies it
  by √2, doubling the thickness divides it by √2.
- `RayOptics` — the straw at a water surface (24) and mirrors and lenses (25).
  Angles come from Snell's law, so straight-on really does pass through
  undeviated, which is what the challenge turns on.
- `ObjectInspector` — Weeks 6's three object lessons (26, 28, 30). It withholds
  every answer until asked, one at a time, because that week is the learner's.

Thirty lessons needed twenty-one scenes rather than thirty, and the last ten
lessons needed only five new ones.

**Simulations get measured, not eyeballed.** Three defects this week were found
by driving the running app and checking the numbers against what the lesson
claims: the spring's total energy drifted 2% under plain Euler (now velocity
Verlet, drift 0.000%), the particle box reported a non-monotonic wall-hit rate,
and the energy chain's rounded losses added to 101 out of 100 — in a lesson
about conservation. A caption that argues with its own simulation is the worst
failure available here.

## The Algebra Companion

Class 4 breaks the rule that a new class needs no new UI code, and the handoff
it came from breaks it too — it ships a separate generic lesson player for this
class alone. The reasons are structural rather than cosmetic:

- **Three pathways.** LEARN IT, REFRESH IT and LEARN TOGETHER. The content
  differs at every stage, not just in tone, and each keeps its own progress
  record — the same lesson worked as a student and as an adult are two passes.
- **The learner answers questions.** 145 challenge problems and 52 guided ones,
  each carrying the wrong answers people actually give and what each one means:
  a meaning mix-up, a sign slip, the order of steps. A wrong answer is diagnosed
  and met, never buzzed.
- **It is a companion, not a track.** Enter at any concept; nothing is locked.

So it has `kind: 'algebra'`, its own home (`engine/algebra/AlgebraHome.jsx`),
its own player (`AlgebraLesson.jsx`), its own validator
(`content/algebra/schema.js`) and its own test file. Anything that assumes the
standard lesson shape should walk `standardCourses` from `content/index.js`
rather than `courses`.

All thirty lessons arrived written and are ported as data, nearly verbatim —
the only edits are three hrefs that were `.dc.html` query strings and are now
routes. `npm test` runs every one of them through the port checks, and drives
every generic lesson's render function at its defaults, on every tab and after
every button, because a bad plot spec would otherwise throw while the learner
is moving a slider.

Six See It visuals cover all thirty lessons, and `generic` alone covers
twenty-one: the content supplies the controls and a pure `render(values)`, and
the component supplies the mechanics. That is the same economy the other
classes got from simulation families.

The class home also carries the two pieces that make it a companion rather
than a course:

- **The refresher** at `#/algebra/refresher`. Five optional questions, none of
  them scored. Every one has an "I know this — skip it" button beside it,
  because letting an adult skip what is still there is the entire point; a
  wrong answer gets the explanation rather than a cross. It ends with one
  suggested lesson and a list to override it with.
- **"Bring a problem from school."** The parser classifies what a problem is
  testing and points at the lesson that covers it, then offers a similar
  problem to try first or a walk through the learner's own — and in the walk,
  the learner does every calculation. It never just hands over the answer.

Both are reachable by deep link, which is how the adult questions on the class
home open Lesson 4 at Understand It with the "go deeper" section already
expanded: `#/algebra/lesson-04/refresh/understand/deeper`.

**One thing the handoff asks for that this build cannot do.** It says the
Feynman stage should "in production, replace [the keyword checks] with an LLM
call". Heartwood has no server, no account and runs with the wifi off, so there
is nowhere to put one. The keyword self-check stays, and the stage says plainly
on screen that it is a crude check and the learner's own judgement is the one
that counts.

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

## Adding a class

1. Make a folder beside `physics-i/` with its own `course.js` and `lessons/`.
2. Add it to the array in `src/content/index.js`.

That is the whole procedure — no UI code. The catalog, the class home and the
lesson player all render whatever they are handed. Electricity & Energy was
added this way and needed one new file outside its own folder: the circuit
simulation.

A class record carries `order`, `status` (`open` or `coming`), a one-line
`blurb` for its catalog card and an optional `after` for the prerequisite
kicker. `comingClass` in the registry is the dashed placeholder card.

**Do not change a class's `id`.** Progress is stored under
`heartwood.v1.<courseId>.<lessonId>`, so renaming a class orphans everything the
learner has written in it.

*(The original brief said at §18 to build no catalog until the method was
proven. The university handoff reverses that, and this is the catalog it asks
for. The rest of §18 — no grades, no streaks, no badges — still stands.)*

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
