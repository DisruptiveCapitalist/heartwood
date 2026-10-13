# Handoff: Heartwood University — Physics I lesson engine

## Overview

Heartwood University is a personal learning environment for one adult learner (Dennis, 73) who wants working, visual understanding of major subjects — not credentials, not exam preparation. The first course is **Physics I — Seeing the World Through Physics**: six weeks, five lessons per week, ~30 minutes a day.

This bundle contains **a course home page and two fully designed, working lessons** (Week 1, Lessons 1 and 2) plus the learner's own written specification. The lessons have been tested with the learner. His verdict: *"It did not feel like school. This I can see with my mind."* That reaction is the product requirement — preserve it.

**Build the lesson engine, these two lessons, and the home page. Then author Lessons 3–30 against the engine.** The format has been tested with the learner and approved — that phase is done. Lessons 3–30 are fully specified in `original-brief/Physics I - Lessons 3-30 build package.docx`; see "Lessons 3–30" below. Do not build other courses, a university-wide hub, or a faculty switcher — the learner's spec §18 still applies to those.

## About the design files

`design-references/` contains three HTML prototypes:

- `Physics I - Home.dc.html` — the course home page; **start here**
- `Physics I - Lesson 1.dc.html` — "The passenger who keeps going" (inertia)
- `Physics I - Lesson 2.dc.html` — "The bicycle that is always falling over" (dynamic stability)
- `support.js` — the runtime the three files need in order to open. Not part of the deliverable.

These are **design references, not production code.** They are single-file HTML prototypes that demonstrate the intended look, copy, interaction, and physics behavior. Open them in a browser to see and use the real thing — particularly the two interactive simulations, which are the heart of the design and are much easier to understand by playing with them than by reading about them.

Your task is to **recreate these designs in the target codebase's own environment** — React, Vue, SwiftUI, native, whatever the project uses — following its established patterns, component library, and conventions. If no codebase exists yet, choose an appropriate stack and implement there. Do not ship the prototype HTML.

## Fidelity

**High fidelity.** Colors, typography, spacing, copy, interaction states, and simulation physics constants are all final and should be reproduced faithfully. Exact values are given below and are also readable in the prototype source (all styling is inline).

Two things that are *not* final: the storage mechanism (prototype uses `localStorage`; a real build should use whatever persistence the app has) and the Understanding Map data (currently hardcoded per lesson; see "Known shortcuts").

---

## Lessons 3–30

`original-brief/Physics I - Lessons 3-30 build package.docx` specifies all 28 remaining lessons. **Read it in full before writing any of them.** It is the content authority; this README is the implementation authority. Where they appear to disagree, the build package wins on *what a lesson says* and this README wins on *how a lesson is built*.

Per lesson it gives: the concept, the opening question, what the SEE IT simulation must let the learner change, the UNDERSTAND IT substance (including the specific misconceptions to correct), CONNECT IT examples, the FEYNMAN IT instruction with its banned phrasing, the Editor's challenge and expected reasoning, the REFLECT prompt, and the Understanding Map concepts that lesson touches.

It also carries eleven implementation rules that restate and sharpen what Lessons 1 and 2 already do. The ones most likely to be violated by accident:

- **Simulations must have something to notice.** "Avoid simulations that are merely animated illustrations." Every SEE IT gives the learner a variable to change — surface, mass, force, load position, pressure, temperature, frequency, angle — and an observation that follows from changing it. If a learner can't be surprised by it, it isn't finished.
- **Equations come last, if at all.** The required order is *experience → observation → idea → relationship → equation*. `F = ma` appears in Lesson 4 only after the learner has already felt the relationship in the simulation. Never lead with notation.
- **The Editor is not a quizmaster.** It hunts memorized definitions, circular explanations, terminology used without understanding, and failures to transfer. Two sanctioned lines: *"That sounds right, but I don't think you've explained why."* and *"You used the word, but I'm not sure you understand the idea behind it."*
- **The Builder prefers household objects.** Hands, a ball, a chair, a book, a rubber band, a glass of water, a flashlight — over anything resembling lab equipment.
- **The course is a spiral.** Later lessons deliberately reactivate earlier ones: friction builds on inertia (3), mass deepens inertia (4), momentum combines mass and motion (5), force becomes torque (10), motion becomes energy (11), energy becomes electricity (14), forces explain floating (18). Each lesson should name the earlier lesson it is standing on, the way Lesson 2 names Lesson 1.
- **Week 6 is not an exam.** The Professor steps back and the learner becomes the physicist. Lesson 26–30 introduce no new major concepts; they recombine. Lesson 30 hands the learner a set of ordinary objects and lets them choose. The Editor's final three questions are *what are you certain about / what are you assuming / what would you like to understand better*, followed by one transfer question (what if gravity disappeared / friction disappeared / it were twice as massive). Grading it would defeat the entire course.
- **Lesson 23 is personal.** "What is happening inside your hearing aids" is in the syllabus because the learner wears them. Treat it with that in mind.

The build package also contains the full Physics I concept map (about 40 concepts across Motion, Forces, Energy, Matter and heat, Waves) for the Understanding Map, and the completion standard: *can you see it, explain it, connect it, use it, recognize it later?*

**This is why lesson content must be data, not markup** (see "Known shortcuts" #7). Twenty-eight lessons of hand-built pages would be unmaintainable and would drift apart in tone. One lesson component plus 30 content objects will not.

---

## The lesson format (build this as the engine)

Every lesson is the same six-stage sequence, from the learner's spec §3. The stage rail at the top of the page is the only navigation; stages are freely clickable in any order, and the learner's position is restored on return.

| # | Stage | 30-min | 20-min | Voice |
|---|-------|--------|--------|-------|
| 1 | SEE IT | 5 min | 3 min | The Professor |
| 2 | UNDERSTAND IT | 8 min | 5 min | The Professor |
| 3 | CONNECT IT | 5 min | 3 min | The Roommate (+ The Builder) |
| 4 | FEYNMAN IT | 5 min | 4 min | — (Feynman Check) |
| 5 | CHALLENGE IT | 5 min | 3 min | The Editor |
| 6 | REFLECT | 2 min | 2 min | The Journal |

**Stage anatomy** — every stage opens with a faculty badge (small caps, letterspaced, on a solid chip) followed by one line of italic serif dialogue from that faculty member. Then the stage body.

1. **SEE IT** — a real situation and a live simulation. No definitions, no terminology. The learner manipulates it and notices something before being told anything. Closes with three short observation cards.
2. **UNDERSTAND IT** — exactly three numbered sentences carrying the mental model, at 24px. Then one everyday comparison in a bordered card. Then the accent-bordered paragraph that finally names the concept. Then **"The formal names"** panel (see below).
3. **CONNECT IT** — six tappable everyday situations (multi-select, toggle), a Builder activity card (something to do with the body or household objects, no equipment), and a free-text "one of your own". After two selections or a typed answer, one italic synthesis line appears.
4. **FEYNMAN IT** — one instruction to explain the idea in the learner's own words **with a banned word** (Lesson 1: "inertia"; Lesson 2: "gyroscope", "momentum"). Large textarea, live word count, and a gentle inline flag if the banned word appears. On submit, a four-item checklist of what a good explanation contains — self-assessment, **not** machine grading.
5. **CHALLENGE IT** — two challenges from The Editor. First a multiple-choice prediction where *every* option gets a substantive, respectful verdict (the wrong answers are the interesting ones and must be honored, never buzzed). Then a harder open question with a textarea and a deliberately gated reveal button.
6. **REFLECT** — one journal prompt ("One thing I understand now that I didn't understand this morning"), autosaving; the Understanding Map; and a one-line teaser for tomorrow.

**"The formal names" panel** (end of UNDERSTAND IT) — a two-column table of term → plain-words meaning, so the learner recognizes vocabulary in the wild. It always comes *after* understanding, never before. Lesson 2's version ends with a note that the lesson introduced no new law.

**"I don't get it"** (persistent, bottom of every stage) — the most important interaction in the product, per spec §8. A dashed-border button plus the line "No shame in that sentence. It's the most useful one here." Opening it reveals six alternate explanation routes as buttons: *analogy / use something in my hand / tell me a story / let's try it right now / ask me a smaller question / start from the end*. Each route is a **different explanation of the same concept, authored per lesson** — never a rephrasing of the main text, and never a repeat. Selecting a route shows its paragraph inline; the panel stays open and other routes remain available.

**Understanding Map** (REFLECT stage) — concepts listed with a five-pip level indicator: *encountered → recognize → understand → explain → use* (spec §6). Pips are accent-colored at levels 1–3 and green at 4–5. Explicitly **not** a score: no percentages, no totals, and the footer states that concepts move backward as well as forward.

---

## Screen 1 — Course home page

**Purpose:** the place the learner lands every day. It answers one question immediately — *what am I doing today?* — and then gets out of the way. It is a journey, not a dashboard: no percentages, no streaks, no scores, no badges.

**Layout** — same 1080px content column and 28px gutters as the lessons. Top to bottom:

1. **Masthead** — brand mark left, the tagline "Learn the heart of a subject. See it in the world." right, 1px rule under.
2. **Course title block** (46px top padding) — "Physics I" at 50px/1.06/400/−.02em, the subtitle "Seeing the World Through Physics" at 26px/300 italic, then a Public Sans meta line: "Six weeks · 30 minutes a day · No prerequisites · Understanding over memorization".
3. **Today card** — the only emphasized element on the page. 1px `#cdc0ab` (a shade darker than other cards), radius 9px, paper fill. Left: an accent kicker, the lesson title at 34px/400, and the lesson's opening question at 20px. Right: a solid ink CTA (16px/30px padding, 13px/700/.12em) and a small meta line under it. **Its content is computed from saved progress** — five states:
   - nothing started → "START HERE · WEEK 1, LESSON 1" / "BEGIN LESSON 1" / "About 30 minutes"
   - Lesson 1 part-done → "CONTINUE · WEEK 1, LESSON 1" / meta "You were on CHALLENGE IT"
   - Lesson 1 done, Lesson 2 untouched → "TODAY'S LESSON · WEEK 1, LESSON 2" / "BEGIN LESSON 2"
   - Lesson 2 part-done → "CONTINUE · WEEK 1, LESSON 2" / "You were on …"
   - both done → "WEEK 1 · LESSONS 1 AND 2 COMPLETE" / "Lesson 3 is not written yet" / CTA "REVISIT LESSON 2" / meta "Nothing is ever locked. Go back any time."
   
   A footer strip on the card (`#faf6ed`, 1px top rule) shows **LAST TIME YOU WROTE** with the most recent journal entry in italic quotes — omitted entirely when there is none. This is the single warmest touch on the page: the course remembers what he said.
4. **The six-week journey** — section head at 28px/400 with the note "Heartwood does not rush. Two days for one idea is allowed." Then one row per week: `grid-template-columns: minmax(0,320px) minmax(0,1fr)`, 24px padding, 1px `#e0d6c4` divider. Left column: "WEEK n" kicker (accent for week 1, `#a89c8a` for the rest), week title at 24px, central idea at 18px italic `#6b6155`. Right column: the week's five lessons as rows — "LESSON n" (11px/700/.1em) + title (19px) + a status word right-aligned. Statuses: **COMPLETE** (green tint `oklch(0.97 0.02 155)`, green border), **IN PROGRESS** (accent), **READY** (paper, `#d8cdba`), **NOT YET WRITTEN** (transparent, `#e4dbca` border, `#bdb1a0` text). Built lessons link out; unwritten ones are inert. All 30 lesson titles for all six weeks are in the prototype — they are the syllabus from spec §4, turned into questions.
5. **Understanding Map + Journal** — two cards side by side (`repeat(auto-fit, minmax(330px,1fr))`, 26px gap, `align-self: start`). The map is the shared cross-lesson version. The journal lists entries with a "WEEK 1 · LESSON 2 · DYNAMIC STABILITY" style label; when empty it shows the five journal prompts from spec §12 instead of an empty state.
6. **Three closing cards** — THE MEASURE OF SUCCESS (the "I know what's happening here" passage from the brief), THE FACULTY (one sentence for each of the four voices), and THE ONE RULE (green tinted: "I don't get it" is the most useful sentence here).

**Deliberately absent:** progress percentages, day streaks, time-spent totals, scores, badges, any catalog of other courses. The brief is explicit (§11, §18) — this should feel like a personal study room, not a college portal.

**State** — reads both lessons' saved progress (`stage`, `visited`, `journalText`) and derives everything shown. Writes nothing.

---

## Screen 2 — Lesson 1: "The passenger who keeps going"

**Concept:** inertia / Newton's First Law. **Opening question:** "You're in a car doing 40. The driver stands on the brakes. The car stops — and your body doesn't. Why?"

### SEE IT — the braking car simulation

A 270px-tall scene, full width of the content column, inside a card (`#fffdf7`, 1px `#d8cdba`, radius 8px). Background is a two-stop linear gradient: `#fffdf7` to 62%, then `#f0e9dc` (the ground band). A 1px `#cdc0ab` horizon at 62%, and a dashed road line 26px below it (`repeating-linear-gradient(90deg, #d8cdba 0 34px, transparent 34px 64px)`, 2px tall).

**The car** — absolutely positioned, `bottom: 64px`, `left` driven by state (percentage), 210×104px, assembled from plain divs:

| Part | Position (within car box) | Size | Fill |
|---|---|---|---|
| Chassis | bottom 16, left 0 | 210×52 | `#332c24`, radius `9px 16px 8px 8px` |
| Cabin | bottom 62, left 44 | 116×44 | `#453c32`, radius `13px 13px 2px 2px` |
| Window | bottom 68, left 52 | 100×32 | `#e8f0f2`, radius `8px 8px 2px 2px`, `overflow: hidden` |
| Passenger group | bottom 0, left 34 (in window) | 30×30 | `transform-origin: 50% 100%`, `transform: rotate(<lean>deg)` |
| — torso | bottom 0, left 9 | 12×19 | `oklch(0.50 0.12 45)`, radius `5px 5px 2px 2px` |
| — head | bottom 17, left 7 | 16×16 | `oklch(0.55 0.11 45)`, circle |
| — seatbelt | bottom 2, left 6 | 20×2 | green when on, transparent when off; `rotate(-38deg)`, origin `0 50%` |
| Wheels ×2 | bottom 0, left 26 / left 148 | 34×34 | `#171310`, circle, 5px `#5c5348` border |

**Readouts** — top-left: label "SPEED" (10.5px/700/.16em, `#8a7f70`) above a 38px/600 tabular-nums number with a 14px " mph" suffix. Top-right, 230px wide: label "HOW HARD THE CAR IS SLOWING" above an 8px progress track (`#e6ddcd`, radius 4) filled `oklch(0.54 0.14 45)` at `min(100%, decel/40)`, and a 12px caption line. Bottom-left: a 13px status line that changes with state.

**Controls row** (14px/18px padding, `#faf6ed`, 1px top border): **HOLD TO BRAKE** — press-and-hold (mousedown/up/leave + touchstart/end), `oklch(0.46 0.15 25)` idle → `oklch(0.36 0.13 25)` held, 1px `#6d1f12`, text `#fff8f2`. **BACK TO 40** — resets. **Seatbelt: off / on** — toggle; on-state gets green border/tint. All buttons `min-height: 46px`.

**Physics** (per frame, `dt` clamped to 0.05s):

```
brakeRate = 26 mph/s        // prop: brakeStrength, range 10–50
if braking:  speed = max(0, speed − brakeRate·dt)
else:        speed = min(setSpeed, speed + 14·dt)     // setSpeed = 40
decel  = max(0, (prevSpeed − speed) / dt)
carX  += speed · dt · 0.42                             // percent of scene
if carX > 82: carX = −14                               // loops
leanCap    = belt ? 9° : 27°
leanTarget = min(leanCap, decel · (belt ? 0.30 : 0.92))
lean      += (leanTarget − lean) · min(1, dt·7)        // smoothing
```

The seatbelt is the pedagogical payoff: with it on, the lean is capped and the status line reads "The belt is pushing backward on you. That push is what stops you."

### Remaining stages — Lesson 1 content

- **UNDERSTAND IT:** three sentences (nothing changes its motion on its own / only a force changes motion / the brakes push the car and nothing pushes you). Comparison card: **THE PICKUP TRUCK**. Then the naming paragraph. Formal names: Newton's First Law of Motion, inertia, net force.
- **CONNECT IT:** coffee sloshing, groceries sliding, swaying when a bus pulls away, standing on a braking train, shaking a ketchup bottle, knees on a downhill stop.
- **FEYNMAN IT:** banned word "inertia".
- **CHALLENGE IT:** 10 lb vs 5 lb ball dropped together — three options, all three answered at length (the "heavier falls faster" verdict must credit the half that's true before correcting it). Then: "If nothing is pushing you forward when the car brakes — why does it feel exactly like something is?" Reveal: the seat and belt push *backward*; the sensation is real, the forward push is not.
- **REFLECT:** Motion 4, Force 3, Inertia 4, Mass vs weight 2, Acceleration 2, Gravity 1, Momentum 0, Energy 0.
- **"I don't get it" routes:** tablecloth trick / full coffee mug / man standing on a bus / book on a kitchen towel / "if you're walking and do nothing, do you stop?" / work backward from why seatbelts exist.

---

## Screen 3 — Lesson 2: "The bicycle that is always falling over"

**Concept:** dynamic stability. **Opening question:** "A bicycle stands up beautifully while it's moving and tips over the moment it stops. Nothing about the bicycle changed. So what did?"

Header carries a "← Lesson 1" link and two of five week-dots filled.

### SEE IT — the balance simulation

**This is a game the learner can lose, and losing is the lesson.** 300px scene, same card treatment. Ground band at 74%, with an animated dashed road (`translateX(0 → −64px)`, duration `2.6 / speed` seconds, paused below 0.4 mph) and a caption: "The ground is going by at *n* mph. The front wheel is the only thing that can move sideways."

**The bicycle, seen from behind** — one lean group at `bottom: 78px; left: 50%`, `transform-origin: 50% 100%`, `transform: rotate(<lean>deg)`. Three distinguishable values matter here: paper, **rider** (rust), **machine** (near-black). Children, bottom-up:

| Part | bottom / left | Size | Fill |
|---|---|---|---|
| Wheel | 0 / −21 | 42×42 | ring: 8px solid `#12100e`, inner `#faf6ed`, circle, `border-box` |
| Hub | 18 / −3 | 6×6 | `#12100e` |
| Seat tube | 38 / −4 | 8×46 | `#12100e` |
| Seat | 79 / −17 | 34×10 | `#12100e`, radius 5 |
| Legs ×2 | 30 / −20 and 30 / 10 | 10×58 | `oklch(0.44 0.11 45)`, radius 5 |
| Torso | 86 / −16 | 32×46 | `oklch(0.52 0.13 45)`, radius `9px 9px 5px 5px` |
| Head | 134 / −11 | 22×22 | `oklch(0.44 0.11 45)`, circle |
| Stem | 104 / −3 | 6×22 | `#12100e` |
| **Handlebar** | 122 / −34 | 68×8 | `#12100e`, radius 4, `box-shadow: 0 0 0 2px #fffdf7`, `transform: rotate(steer·16deg) scaleX(1 − |steer|·0.25)` |

The handlebar is intentionally wider than the rider and outlined in paper so its rotation is legible at a glance — it is the thing the copy tells the learner to watch. Do not let the rider or frame occlude it.

**Readouts** — top-left: "LEAN" + degrees, color-coded (`#231e18` under 10°, `oklch(0.52 0.13 60)` 10–24°, `oklch(0.46 0.15 25)` above), plus a status line. Top-right, 280px: "YOUR STEERING, MOMENT BY MOMENT" above a 280×60 SVG plot — `#faf6ed` ground, 1px `#ded4c2` center line, and a `polyline` of the last 140 steer samples in `oklch(0.54 0.14 45)`, 1.6px, mapped `y = 30 − steer·24`. Caption: "Every wiggle is a correction. This is what balancing actually is." **The trace must actually wiggle** — see the physics note below; a smooth line here contradicts the lesson.

**Controls** — ◀ STEER LEFT / STEER RIGHT ▶ (press-and-hold, also ArrowLeft/ArrowRight keys), a SPEED slider 0–16 mph (step 0.5, default 12), a **Rider's reflexes: on/off** toggle (the autopilot), and RESET.

**Physics** (per frame, `dt` clamped to 0.045s):

```
// sensor lag — the rider's reflexes are not instant
react   = min(1, dt·12)
sLean  += (lean    − sLean) · react
sVel   += (leanVel − sVel)  · react

// correlated road disturbance (AR(1)); white noise integrates to zero
// and a too-slow decay reads as a steady turn instead of corrections
bump    = bump·0.93 + (random − 0.5)·2700·dt,  clamped ±70

steer   = manual input, or autopilot: clamp(sLean·0.24 + sVel·0.13, −1, 1)
v       = speed / 12
power   = min(2.4, v²) · 90            // prop: steerAuthority, range 50–140
tip     = 150 · sin(lean°)             // gravity; grows with lean
leanVel = (leanVel + (tip − steer·power + bump)·dt) · 0.992
lean   += leanVel · dt
if |lean| > 44: lean = ±44, leanVel = 0, crashed = true
```

Three behaviors must survive the port, because the entire lesson rests on them:

1. **At 12 mph the learner can catch it** — steering into the lean recovers.
2. **At 0 mph nothing helps** — `power` goes to zero with `v²`, so the handlebars do nothing and the bike falls. This is the whole point.
3. **Autopilot holds up by visibly oscillating** (roughly ±1–3°, with a wandering trace showing several direction changes per window) — never by settling to a dead 0°. Balance must look like an *activity*, not a state. The disturbance's correlation time (~0.25s) and the sensor lag are what produce this; they are not decoration.

### Remaining stages — Lesson 2 content

- **UNDERSTAND IT:** three sentences (a bicycle is always falling / staying up is steering the wheels back under the fall / speed is what makes that trick work). Comparison card: **THE BROOM ON YOUR PALM**. Formal names: dynamic stability (vs static), inverted pendulum, countersteering, center of mass, plus the closing note that this is Newton's First applied to something tipping.
- **CONNECT IT:** carrying a tray, standing on one foot, moving a ladder, steadying a canoe, walking on ice, holding a camera steady. Builder card: balance on one foot, then close your eyes.
- **FEYNMAN IT:** banned words "gyroscope" and "momentum".
- **CHALLENGE IT:** "the spinning wheels act like gyroscopes" — the popular answer, and it's wrong. Three options; the gyroscope verdict cites the counter-rotating-wheel experiment, and the momentum verdict untangles forward vs sideways. Then: "I clamp the handlebars and push you at 15 mph. How long do you stay up, and why?" Reveal: a second or two — the experiment has been done.
- **REFLECT:** Motion 4, Inertia 4, Balance & correction 4 (new), Force 3, Center of mass 3 (new), Mass vs weight 2, Acceleration 2, Gravity 2, Momentum 1.
- **"I don't get it" routes:** waiter with a tray / pencil vs broom on a fingertip / child's first ride without a hand on the seat / balance on one foot with eyes closed / "which way must the bottom move to get under the fall?" / work backward from why a parked bike needs a kickstand.

---

## Interactions & behavior

- **Stage navigation** — rail buttons jump to any stage; BACK / NEXT at the bottom. NEXT reads `NEXT · <STAGE NAME>` and `FINISH FOR TODAY` on the last stage. Visited stages render in the "done" style (paper fill, `#cdc0ab` border) and the current stage in solid `#231e18`.
- **Simulation loop** — `requestAnimationFrame`, running only while the SEE IT stage is visible (pause it otherwise; don't burn cycles or let the bike fall over unattended). `dt` clamped so a backgrounded tab doesn't produce a huge step.
- **Press-and-hold controls** — must handle mouse *and* touch, and must release on mouse-leave (otherwise the brake sticks on). Keyboard arrows drive Lesson 2's steering.
- **Reveals** — every Editor reveal is a deliberate button press, never automatic and never on scroll. The learner must get the chance to be wrong first.
- **Stage transitions** — a 0.35s fade-and-6px-rise (`hwFade`) on stage bodies. Nothing else animates except the two simulations and Lesson 2's road.
- **Autosave** — journal and all text fields save as typed; the status line switches from "Saves itself as you type." to "Saved to your journal — it will be here tomorrow."
- **Tap targets** — every control is `min-height: 46px`. Body copy is 19–26px. This is non-negotiable: the learner is 73 and reads on a laptop.
- **Responsive** — content column is `max-width: 1080px` with 28px gutters; card grids are `repeat(auto-fit, minmax(240px, 1fr))`; the stage rail and control rows wrap. The two simulation scenes have fixed pixel heights (270/300) and fixed-size actors.

## State

Per lesson, all of it persisted and restored on load:

| State | Purpose |
|---|---|
| `stage` | current stage index (0–5) |
| `visited` | which stages have been seen (rail styling) |
| `connects` | selected CONNECT IT items |
| `connectOwn` | learner's own connection (text) |
| `feynmanText`, `feynmanSubmitted` | the Feynman explanation and whether the checklist is revealed |
| `predict` | chosen prediction option |
| `editorAnswer`, `editorRevealed` | the open Editor answer and whether the reveal is shown |
| `journalText` | REFLECT entry |

Simulation state (`speed`, `lean`, `leanVel`, `steer`, `input`, `carX`, `decel`, `belt`, `auto`, `crashed`, `trace`) is **ephemeral** — reset on load, never persisted.

Tweakable parameters exposed in the prototype: `sessionMinutes` (20 or 30 — switches the rail's minute labels), `showTimings` (boolean), and per-lesson `brakeStrength` / `steerAuthority`.

## Design tokens

**Color**

| Token | Value | Use |
|---|---|---|
| Canvas | `#efe8db` | page background |
| Paper | `#fffdf7` | cards, inputs, simulation scenes |
| Paper alt | `#faf6ed` | control rows, plot grounds |
| Ground band | `#f0e9dc` | below the horizon in scenes |
| Ink | `#231e18` | primary text, current-stage fill |
| Ink 2 | `#3d362d` | body copy in cards |
| Ink 3 | `#4a4238` / `#5c5348` | secondary prose, italic dialogue |
| Muted | `#6b6155` / `#8a7f70` | captions, labels |
| Faint | `#a89c8a` | hints |
| Rule | `#d8cdba` | borders, dividers |
| Rule 2 | `#e6ddcd` / `#f0e9dc` | inner dividers, empty pips |
| Input border | `#cdc0ab` | textareas, secondary buttons |
| Machine | `#12100e` | Lesson 2 bicycle, handlebar |
| **Accent (heartwood)** | `oklch(0.50 0.12 45)` | brand mark, numerals, rider, accent borders |
| Accent bright | `oklch(0.54 0.14 45)` | progress fill, steering trace |
| Accent deep | `oklch(0.44 0.11 45)` | rider head and legs |
| Accent wash | `oklch(0.96–0.97 0.015–0.02 45)` | highlighted cards |
| **Green (understood)** | `oklch(0.50 0.12 155)` | Roommate/Journal badges, selections, level 4–5 pips |
| Green wash | `oklch(0.96 0.03 155)` | selected chips, "I don't get it" open state |
| **Editor red** | `oklch(0.42 0.13 25)` | Editor badge, reveal border |
| Brake red | `oklch(0.46 0.15 25)` idle, `oklch(0.36 0.13 25)` held | brake button, warnings |
| Builder blue | `oklch(0.44 0.10 250)` | Builder badge |

All accents share lightness and chroma and vary only in hue, by design.

**Typography** — two families, both Google Fonts.

- **Newsreader** (serif) — all prose. H1 46px/1.08/400/−.02em. Opening question 23px/1.45/300 italic. Mental-model sentences 24px/1.45/300. Editor questions 24px/1.4/300. Feynman instruction 26px/1.35/300. Card body 19–21px/1.5–1.55. Course title 21px/400.
- **Public Sans** (sans) — all UI chrome. Brand mark 11px/700/.22em. Section labels 10.5–11px/700/.16–.2em. Buttons 12.5–13px/600–700/.06–.14em. Captions 12–13px/400. Numerals 38px/600 tabular-nums.

Body text never goes below 18px; UI labels never below 10.5px and always uppercase + letterspaced.

**Spacing** — 4px base. Section gaps 22–28px. Card padding 18–24px. Content gutter 28px. Header 26/18px. Stage body top padding 34px.

**Radius** — 4–5px buttons and small chips, 7px cards and inputs, 8px simulation cards, 50% circles.

**Borders and shadows** — 1px solid rules only. No drop shadows anywhere except the handlebar's 2px paper outline. The design is flat, paper-like, and quiet on purpose.

**Motion** — `hwFade` 0.35s ease on stage entry; `hwRoad` linear infinite on Lesson 2's road; simulations at `requestAnimationFrame`. Nothing else moves.

## Assets

None. No images, no icons, no SVG illustrations. Every visual — both vehicles, the wheels, the rider, the plot — is plain divs and one `<polyline>`. Fonts load from Google Fonts (Newsreader, Public Sans); self-host them if the target environment prefers.

## Known shortcuts in the prototype

Things a real build should do properly rather than copy:

1. **Understanding Map levels are hardcoded per lesson.** They should be derived from actual learner activity and shared across lessons, and must be able to move *backward* (spec §6).
2. **The Feynman check is self-assessment.** The prototype shows a checklist rather than evaluating the answer. Spec §7 asks for real evaluation of the learner's explanation — that needs a model call, and it must stay encouraging and never pedantic about wording.
3. **"I don't get it" routes are authored per lesson, six per concept.** Fine for two lessons, unsustainable for thirty. Spec §8 wants the Roommate to *choose* a route; consider generated routes with these six as the pattern and quality bar.
4. **Journal entries are per-lesson strings in `localStorage`.** Spec §12 wants a real journal the learner can browse across the course.
5. **The home page's week grid is static data.** All 30 lesson titles are hardcoded in the prototype; a real build should read them from the same content source that defines the lessons themselves (see #7). No course catalog and no faculty switcher yet — deliberately omitted per spec §18.
6. **Daily memory (spec §10) is not implemented.** The five saved items per lesson — concept, learner's explanation, analogy, misconception, open question — need real storage so later lessons can adapt.
7. **Lesson content is embedded in each lesson file.** It should be data (per-lesson content objects: copy, connections, routes, predictions, formal names, map deltas) consumed by one lesson component, so authoring Lesson 3 is writing content, not writing a page. The two built lessons are already structurally identical — the schema is sitting there waiting to be extracted.

## The standard to build to

From the learner's spec §20, and worth keeping in front of you: can he **see** it, **explain** it, **connect** it to ordinary life, **use** it, and **recognize** it later? And the tone test — the prototype's own measure of success — is that it must not feel like a lecture he's taking notes in.

Two specific traps, both learned the hard way while building these lessons:

- **Never give a wrong answer a buzzer.** Every distractor in a prediction gets a real, respectful verdict that credits whatever was right about it. The wrong answers are where the learning is.
- **Don't let a simulation quietly contradict its caption.** Lesson 2's bicycle *must* visibly wobble while upright. A demo that settles into serene stability under a caption reading "Every wiggle is a correction" teaches the opposite of the lesson.

## Files

```
design-references/
  Physics I - Home.dc.html        course home page prototype — start here
  Physics I - Lesson 1.dc.html    Lesson 1 prototype — open in a browser
  Physics I - Lesson 2.dc.html    Lesson 2 prototype — open in a browser
  support.js                      runtime needed by the three prototypes
original-brief/
  HeartWood University 9.26.docx              the learner's specification — read this first
  Physics I - Lessons 3-30 build package.docx content for all 28 remaining lessons
```

Read the original brief first. It is the product definition: philosophy, the four faculty voices (Professor, Roommate, Editor, Builder), the six-week syllabus, knowledge levels, and an explicit list of what not to build yet. This README describes how two of its lessons were realized; the brief describes why. Then read the Lessons 3–30 build package, which specifies everything still to be written.

Its closing instruction is the right note to build on: the finished course should feel as though Lessons 1–30 were written together from the beginning — conversations with the physical world, not textbook chapters.
