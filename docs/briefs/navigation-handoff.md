# The Art and Science of Navigation — course handoff

> Part of the Heartwood University handoff. Read `README.md` first. This file covers only what is **new or different** in Navigation; everything not mentioned here works exactly as in `PHYSICS.md` (six-stage engine, faculty voices, "I don't get it", Understanding Map, formal-names panel, tokens, typography, accessibility rules).

## Overview

Six weeks, five lessons a week, ~30 minutes a day: how to know where you are and which way to go using the Earth, the Sun, the stars, a compass, a map, and the land itself — and how people in many cultures solved the same problems.

**Content authority:** `original-brief/The Art and Science of Navigation.docx` — the syllabus, all 30 lesson outlines, evidence labels, and the corrections to popular myths. **Implementation authority:** this file. Where they disagree, the brief wins on *what a lesson says*; this file wins on *how it's built* — and on the four decisions below, which the learner made after the brief was written.

**Built so far:** Lesson 1 (*What does it mean to know where you are?*) and Lesson 2 (*The Earth beneath our feet*). Both tested with the learner and approved. Lessons 3–30 are to be authored from the brief against the engine.

## Four decisions that override the brief

1. **Cultures are spread through the course, not gathered into one lesson.** Each tradition appears as an "Across Cultures" card in the CONNECT IT stage of the lesson whose skill it illustrates. Lesson 1 already does this (Caroline Islands *etak* → reference points); Lesson 2 does it (Aristotle and Eratosthenes → Earth's shape). Intended placements for the rest:
   - Arab navigators' *kamal* → Polaris and latitude
   - Polynesian star compass → Week 4, star navigation
   - Indian Ocean monsoon sailing → wind and weather
   - Harrison's chronometer → longitude
   - Other traditions in the brief → beside the nearest matching skill
   The lesson the brief devoted to cultures becomes a synthesis lesson that looks back across them.
2. **Completion rule — the "middle path".** Every stage stays open and freely navigable (Heartwood's "nothing is ever locked"). But a Navigation lesson **counts as complete only once the Feynman explanation is submitted**, with a minimum of 15 words. Details under "Interactions".
3. **Long field exercises become simulations in the lesson.** Anything that can't happen inside 30 minutes indoors (the equal-shadow method takes hours; star lessons need dark skies) is taught with an on-screen simulation, and the real exercise is referenced as a weekend task in the companion handbook.
4. **The companion handbook is not part of this build.** The *Heartwood Field Guide* is a print book being designed and written separately, for publication. Do not build it. Its spec is included in `original-brief/` for context only — so lesson wording and diagrams can stay consistent with it. Where a lesson refers to a field exercise, say "see the Field Guide, Chapter N" as plain text.

## What's new in the engine

### Completion

| Behavior | Detail |
|---|---|
| Complete when | `feynmanSubmitted === true` |
| Submit guard | Under 15 words → inline message in brake red: "A little more, please — at least two or three sentences, so it's a real explanation." No submit. |
| On submit | Checklist appears, plus a green line: "Lesson N now counts as complete." |
| Stage rail | FEYNMAN IT's meta line changes from "5 min" to "✓ written". |
| REFLECT banner | Full-width bar under the journal. Incomplete: paper fill, copy "Everything here is open, but the lesson counts as done once you've written your explanation in FEYNMAN IT." plus a GO TO FEYNMAN IT button. Complete: green wash `oklch(0.97 0.02 155)`, "Lesson N is complete. Your explanation is saved with it." |
| NEXT on REFLECT | Incomplete: label "WRITE YOUR EXPLANATION FIRST", jumps to FEYNMAN IT. Complete: "FINISH FOR TODAY". |
| Persisted | `complete` boolean saved alongside the other lesson state. |
| Stage change | Scrolls the window to top (smooth). |

Physics doesn't use this gate — its lessons complete on reaching REFLECT. Keep the rule **per course**, configurable, so later courses can choose.

### "Across Cultures" card

Sits in CONNECT IT, after the Builder card. Paper card, 1px `#d8cdba`, radius 7px.
- **Header row** — "ACROSS CULTURES · <PLACE OR PEOPLE>" (11px/700/.18em, `#8a7f70`), with an **evidence-label pill** on the right.
- **Body** — two or three paragraphs at 20px. The final paragraph always links the tradition back to the lesson's idea in one sentence.
- **Footer** — 13px Public Sans, `#6b6155`: **"What remains uncertain:"** followed by an honest note, then "Sources:" with author, title, and year.

Evidence labels (from the brief), as pills — 11px/700/.1em, 4px 9px, radius 4px:

| Label | Fill / text / border |
|---|---|
| WELL DOCUMENTED | `oklch(0.95 0.03 155)` / `oklch(0.38 0.10 155)` / `oklch(0.85 0.05 155)` |
| DOCUMENTED REGIONALLY | `oklch(0.95 0.03 45)` / `oklch(0.42 0.11 45)` / `oklch(0.85 0.05 45)` |
| PLAUSIBLE BUT UNCERTAIN | suggested: `oklch(0.95 0.03 85)` / `oklch(0.42 0.09 85)` / dashed `oklch(0.82 0.06 85)` |
| MODERN INTERPRETATION | suggested: `#f3ede2` / `#4a4238` / dotted `#b8ab98` |

**Never** put a cultural claim on screen without a label, an uncertainty note, and a real source. If a source can't be found, the claim doesn't go in.

### "I don't get it" — seven routes

Navigation uses the brief's seven doors: *explain it with a compass / explain it with a map / use an everyday object / show me a diagram / walk me through an example / break it into smaller steps / work backward from the answer*. Same panel and behavior as Physics; one more button. "Show me a diagram" may tell the learner what to try in the SEE IT simulation.

## Lesson 1 — "What does it mean to know where you are?"

**Opening:** a friend, lost in a big park, phones and says "I'm walking north." Can you find her?

### SEE IT — the clue map

A 900×520 SVG park map (`viewBox`, scales to width), `#f4eee2` ground. Fixed scenery: two paths (`#e6dac4`), a pond (ellipse, `oklch(0.90 0.035 230)`), a cluster of woods (circles, `oklch(0.86 0.05 145)`), north arrow top-right, a "100 steps" scale bar bottom-left. Two reference points:
- **Water tower** at (560, 90) — paper circle r15, ink stroke 3, ink dot r5, 16px/600 label
- **Old oak** at (400, 270) — green circle r16, `oklch(0.62 0.10 145)`

Above the map, a status bar — "WHERE SHE COULD BE" with a 30px/500 answer and a 13px note. Below, five **clue buttons** in an auto-fit grid (min 190px), each a quotation in italic serif plus a 12px effect line that appears once toggled:

| Clue | Draws | Effect line |
|---|---|---|
| "I'm walking north." | nothing | Which way she's going. Says nothing about where she is. |
| "I can see the water tower." | nothing | It's visible from almost the whole park. Still nothing. |
| "The water tower is straight north of me." | **ray** from tower straight down (accent, 5px) | A direction from something you both know. Now she's on a line. |
| "I'm about 300 steps from the water tower." | **circle** r300 around tower (accent, dashed 12/8) | A distance from a known point. Now she's on a circle. |
| "The old oak is about 200 steps away." | **circle** r200 around oak (blue `oklch(0.48 0.10 250)`, dotted) | A second reference point. A second circle. |

Clues toggle independently. Active shaped clues are intersected live (ray–circle and circle–circle, analytic), filtered so every point lies on every active shape:

| Active shapes | Status | Note |
|---|---|---|
| none (useless clues only) | Anywhere in the park — map gets a faint accent wash | "Those clues sound helpful. Look at the map — they didn't narrow anything." |
| one | Anywhere along this line / on this circle | One good clue gives you a shape, not a place. |
| two, crossing twice | Two places — two ink markers | Two shapes can cross twice… |
| crossing once | **One place. Found her.** in green, with a green marker and "She's here" label | Clues that each meant little on their own, crossing at one spot. |
| no common point | Nowhere | These clues disagree. Turn one off. |

The geometry is chosen so ray + tower circle meet once, the two circles meet twice, and all three meet at a single point. Keep it that way.

**Formal names:** position, reference point, bearing, line of position, fix.
**Feynman:** banned words "direction", "location". **Editor:** the boat ten miles from a lighthouse (answer: a circle), then "When is 'next to the Ferris wheel' not good enough?"

## Lesson 2 — "The Earth beneath our feet"

**Opening:** the ground looks flat in a parking lot and from a plane. How do we know it's round, and why should a navigator care?

### SEE IT — the zoom-out

A 900×320 SVG, drawn **to true scale**. Seven stop buttons zoom the view width:

| Stop | Width shown | Drop readout |
|---|---|---|
| Your backyard | 100 ft | less than 1/1000 of an inch |
| A neighborhood | 1 mile | ~2 inches |
| A county | 25 miles | ~104 feet |
| A state | ~280 miles | ~2.5 miles |
| Half a country | 1,000 miles | ~32 miles |
| Coast to coast | ~2,800 miles | ~250 miles |
| The whole Earth | — | switches to a globe diagram |

Math: R = 3,959 mi. Sag at half-width h is `R − √(R² − h²)`; drop is shown at the right edge. The ground line is 81 sampled points; a dashed accent "perfectly flat line" sits at y=100; an accent vertical bar shows the drop. Zoom eases in **log space** (`logW += (log target − logW) × 0.12` per frame) so every step feels the same size. Captions per stop are in the prototype. The line "Drawn to true scale — nothing exaggerated" is non-negotiable: the whole point is that the bend is invisible until about state size. **Do not exaggerate the curvature for visibility.**

The final stop cross-fades to a globe: axis, both poles, Equator, hemisphere labels, a "turns toward the east" arrow, and a "You (about 40° N)" marker.

**Formal names:** axis, geographic poles, Equator, hemisphere, tropics, horizon, great circle.
**Across Cultures:** Aristotle (curved eclipse shadow, changing stars) and Eratosthenes (shadow at Syene vs Alexandria), labeled WELL DOCUMENTED, with the honest uncertainty about the stadion.
**Feynman:** banned "curve", "curvature", "sphere". **Editor:** horizon distance from 6 ft (about 3 miles — 1.22 × √feet), then "why don't you feel 800 mph?", answered by explicit reference to **Physics Lesson 1**.

## Next batch — Week 2, Lessons 6–10

Lessons 1–5 are built and approved, and handbook Chapters 1–3 have been written to match them. Next, build **Lessons 6–10** from the brief.

**Fix first (Lessons 1–5):** the CONNECT IT synthesis line ("Every one of those works only because…", "Notice that none of these needed a spaceship…", and so on) must sit directly after the six "where it shows up" items, and must appear only after the learner has ticked two. It must not come after the Across Cultures card.

**For each finished lesson, export a markdown file** (`lesson-06.md` … `lesson-10.md`) in the same format as the Lessons 1–5 exports, and include:
- **Simulation description:** what it shows, what the learner can change, and the exact numbers, formulas and constants it uses. The handbook's diagrams must agree with the simulations.
- **Field Guide pointer:** the real-world exercise the simulation stands in for, with its chapter number.
- **Every Across Cultures card in full,** with its evidence label, uncertainty note and sources.

Stop after Lesson 10 for review. The learner brings the exports back so the matching handbook chapters can be written.

## Cross-course links

Lesson 2's Editor answer begins "This is Physics, Lesson 1, wearing hiking boots." Heartwood courses refer to each other on purpose. When both courses exist, make that reference a real link to the Physics lesson.

## State

Same per-lesson fields as Physics, plus `complete` and `updatedAt` (see `README.md`). Storage keys in the prototypes: `heartwood.navigation.lesson1`, `heartwood.navigation.lesson2`. Simulation state (active clues, zoom stop) is ephemeral.

## Files

```
design-references/Navigation - Lesson 1.dc.html
design-references/Navigation - Lesson 2.dc.html
original-brief/The Art and Science of Navigation.docx                  content authority
original-brief/Heartwood Field Guide spec (context only).docx          do not build
```
