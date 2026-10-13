# Handoff: Heartwood University — multi-class app

## Overview
Heartwood University is a personal learning environment for one adult learner (Dennis, 73). It teaches working, visual understanding of a subject, not credentials. It holds several **classes** (courses). Each class runs six weeks at five lessons a week, so 30 lessons. Every lesson follows the same six-stage structure.

This bundle adds a **university layer** on top of the Physics I lesson engine that was handed off earlier:

- **Heartwood University (catalog)**: lists every class. Tapping a card opens that class.
- **Physics I**: the first class. The class home and Lessons 1–2 are built and tested.
- **Electricity & Energy — The Power You Never See**: the second class. The class home and Lesson 1 are built and tested by the learner, with no changes requested.
- **Anatomy & Physiology — The Human Body, from the Cell to the Whole Person**: the third class. The class home and Lesson 1 ("What are we made of?") are built and approved by the learner. **The full course spec is `original-brief/Physiology - Anatomy & Physiology course spec.docx`**, written for Claude Code; follow it, including its health and safety rules. See "Class 3" below.
- The "coming soon" placeholder card is now off by default (`showNextClass: false`). Turn it on when Class 4 is announced.

The lesson engine itself (the six stages, the tutor personalities, "I don't get it" routes, the Understanding Map and the Journal) is documented in full in **`physics-lesson-engine-README.md`**. That document still applies to every class. This README covers what is new, and how to add classes.

## Class 3: Anatomy & Physiology (do this next)
The built app already has a course registry (`id`, `order`, `status`, `title`, `subtitle`, `blurb`, `meta`, `weeks`…). Add one record to it:
- `id: 'anatomy'`, `order: 3`, `status: 'open'`
- `title: 'Anatomy & Physiology'`
- `subtitle: 'The Human Body, from the Cell to the Whole Person'`
- `blurb: 'Cells, heart, bones, hormones, immunity and medicines — how the body works as one connected system.'`
- No `after` (no prerequisites).
- `meta: 'Six weeks · 30 minutes a day · No prerequisites · Understanding over memorization'`
- Weeks, lesson titles and the Understanding Map rows are in the `WEEKS` and `MAP` constants of `Anatomy & Physiology - Home.dc.html`.

The class home is identical to the other two in layout. Only these differ:
- The second principle card is titled **"Understanding, not diagnosis"**. It replaces "Standing on Physics I".
- The success card reads: "Feeling your own pulse, reading a medicine label, hearing a health claim on the news — and a little voice says *I know what's happening in there.*"

### Lesson 1, "What are we made of?"
All of its copy is final. It lives in the `EL`, `GUESSES`, `LADDER`, `CONNECTS`, `ROUTES`, `PREDICTS` and `MAP` constants, plus the template.

The **See It** visual is new:
- **Guess first.** "Which jar is heaviest?" has four buttons: Carbon, Calcium, Oxygen, Iron. Every option gets a respectful reply.
- **Grid.** Until the learner guesses, the 10×10 grid is grey. It then fills with element colors, one square per 1%.
  - By weight: O 65, C 18, H 10, N 3, Ca 2 (true 1.5), P 1, other 1.
  - Toggled to **By number of atoms**: H 62, O 24, C 12, N 1, other 1. Ca and P are too few for a square.
- **Legend.** Each row is a button showing the percentage and pounds; in count mode it shows "about N in 100". Tapping a row fades the other squares to 18% opacity and shows what that element does in the body.
- **Weight slider.** 90–260 lb, default 150. It is used **only for arithmetic and is never saved**. This is required by the spec's "no sensitive health information" rule.
- **Colors.**
  - O `oklch(0.52 0.11 235)`
  - C `#3d362d`
  - H `oklch(0.80 0.07 235)`
  - N `oklch(0.52 0.12 155)`
  - Ca `oklch(0.84 0.07 85)`
  - P `oklch(0.60 0.13 45)`
  - Other `#b9ab94`

The other stages:
- **Understand It** adds a static seven-rung "ladder" panel: atom → molecule → cell → tissue → organ → organ system → organism.
- **Feynman It** has no banned words; it says that plain words are enough.
- Progress is stored under the key `heartwood.anatomy.lesson1`. The record has the same fields as the other lessons, plus `guess`.

### Lessons 2–30
Write these from the spec, section 5. It requires real content in all six stages of every lesson: no placeholders, and Feynman It must respond to what the learner actually wrote. Sections 6 and 8 cover visuals and health safety. Lesson 1 sets the voice and the level of detail.

## About the design files
The files in `design-references/` are **design references built in HTML**. They are working prototypes that show the intended look and behavior; they are not production code to copy directly. Recreate them in the target environment. If there is no codebase yet, pick a suitable stack; a small React or Next app with local persistence fits well. Each `.dc.html` opens directly in a browser, with `support.js` beside it, for live reference.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy and interactions are final. Recreate them pixel-for-pixel.

## Architecture: build it data-driven
The central requirement is that **adding a class must not need new UI code.** Build these pieces:

1. **Course registry**: an array of course records, which the catalog renders.
2. **Generic class home**: one component that renders any course from its data.
3. **Generic lesson player**: one component that renders any lesson's six stages from content data. Each lesson can supply its own interactive "See It" visual, plugged in by id.

Suggested shapes:

```ts
type Course = {
  id: string;              // 'physics1', 'electricity'
  order: number;           // shown as "CLASS 1", "CLASS 2"…
  title: string;           // 'Electricity & Energy'
  subtitle: string;        // 'The Power You Never See'
  blurb: string;           // one sentence for the catalog card
  after?: string;          // prerequisite label, e.g. 'Physics I' → "CLASS 2 · AFTER PHYSICS I"
  status: 'open' | 'coming';
  weeks: Week[];           // 6
  conceptMap: { id: string; name: string }[];   // Understanding Map rows
};
type Week = { title: string; idea: string; lessons: LessonRef[] }; // 5 lessons each
type LessonRef = { id: string; title: string; built: boolean };

type Lesson = {
  id: string; courseId: string; week: number; index: number;
  kicker: string; title: string; hook: string;      // header
  see: { visualId: string; profPrompt: string; observations: string[] };
  understand: { sentences: string[]; analogy: {title: string; body: string}; bridge: string; terms: {term: string; def: string}[] };
  connect: { prompt: string; items: string[]; builderTask: string; ownPrompt: string; affirm: string };
  feynman: { prompt: string; bannedWords: string[]; checklist: string[] };
  challenge: { predict: { q: string; options: {text: string; verdict: string; correct?: boolean}[] }; open: { q: string; answer: string } };
  reflect: { prompt: string; tomorrow: string; mapUpdates: Record<string, 0|1|2|3|4|5> };
  stuckRoutes: { analogy: string; object: string; story: string; experiment: string; smaller: string; backward: string };
};
```

The content in `Electricity & Energy - Lesson 1.dc.html` (the `STAGES`, `CONNECTS`, `ROUTES`, `PREDICTS` and `MAP` constants, plus the template copy) maps onto this shape one-to-one. Use it as the first content file.

### Adding a new class (the workflow going forward)
1. Add the course record and its 30 lesson titles to the registry, with `status: 'coming'` until Lesson 1 is written.
2. Write the lesson content files.
3. Build any new See It visuals.
4. Set `status: 'open'`. The catalog card switches from the dashed "coming" card to a live card automatically.

## Screens

### 1. Heartwood University: catalog (`Heartwood University.dc.html`)
- **Purpose:** this is the app's entry point. It lists the classes and opens one.
- **Layout:** the page background is `#efe8db`. The column is `max-width:1080px`, centered, with `padding:0 28px`.
  - **Top bar:** "HEARTWOOD UNIVERSITY" on the left (Public Sans 11px/700, letter-spacing .22em, accent color) and the tagline "Learn the heart of a subject. See it in the world." on the right (Public Sans 12.5px, `#6b6155`). Padding is `26px 0 18px`, with a bottom border `1px #d8cdba`.
  - **Greeting:** an h1 that changes with the time of day: "Good morning / afternoon / evening, Dennis." (Newsreader 52px/400, line-height 1.05, letter-spacing −.02em). Below it is an italic sub-line, "Your classes. Pick one up where you left it, or start something new." (Newsreader 24px/300 italic, `#4a4238`). The block padding is `52px 0 38px`.
  - **Section header:** "Classes" (Newsreader 28px) on the left; on the right a count such as "2 open · 1 on the way" (Public Sans 12.5px `#6b6155`). It has a bottom border.
  - **Card grid:** `repeat(auto-fill, minmax(310px,1fr))`, gap 22px.
- **Open class card:** the whole card is a link. Background `#fffdf7`, border `1px #cdc0ab`, radius 9px, min-height 320px.
  - Top section (padding `24px 26px 0`, gap 10px):
    - Kicker "CLASS 2 · AFTER PHYSICS I" (Public Sans 11px/700, .2em, accent).
    - Status on the right: "NOT STARTED" `#8a7f70`, "IN PROGRESS" in accent, or "COMPLETE" `oklch(0.40 0.10 155)`. Public Sans 11px/600, .1em.
    - Title (Newsreader 32px/400, line-height 1.1).
    - Subtitle (Newsreader 20px italic, `#4a4238`).
    - Blurb (18px, line-height 1.5, `#5c5348`).
  - Footer section (padding `20px 26px 22px`):
    - A progress strip of 30 equal segments, 6px high with a 3px gap: green = completed lesson, `#cdc0ab` = built but not done, `#ebe3d4` = not yet written.
    - Below it, "N of 30 lessons · 6 weeks" (Public Sans 12.5px) and a dark pill CTA reading "OPEN CLASS" or "CONTINUE" (Public Sans 12.5px/700, .12em, padding 12×18, bg `#231e18`, text `#f6f1e7`, radius 5).
  - **Hover:** the border turns `#231e18`, with `box-shadow: 0 2px 0 #231e18`.
- **Coming card:** transparent background, `1px dashed #b9ab94`, radius 9, the same min-height. Kicker "CLASS 3 · COMING" (`#6b6155`), title in `#5c5348`, and the line "Being written. It will appear here, ready to open, as soon as Lesson 1 is built." It is not clickable.

### 2. Class home (Physics I or Electricity & Energy): `… - Home.dc.html`
The two files have the same layout and differ only in data. Physics I's version is specified in `physics-lesson-engine-README.md`. Summary:
- **Top bar:** "HEARTWOOD UNIVERSITY" is now a **link back to the catalog**, with no underline. This applies on every class page.
- **Title block:** title (Newsreader 50px), italic subtitle (26px/300), and a meta line, for example "Six weeks · 30 minutes a day · Builds on Physics I · Understanding over memorization".
- **"Today" card:** shows Begin, Continue or Complete, depending on stored progress. When the learner has written a journal entry, a "LAST TIME YOU WROTE" quote appears below.
- **"The six-week journey":** six rows, each with the week kicker, title and italic one-line idea on the left and five lesson rows on the right. A built lesson is a link (white card) with a status of READY, IN PROGRESS or COMPLETE. An unbuilt lesson is a plain outlined row marked "NOT YET WRITTEN".
- **Bottom of the page:** the Understanding Map, the Journal, and three principle cards ("The measure of success", "Standing on Physics I", "The one rule").

### 3. Lesson player: `… - Lesson N.dc.html`
The six-stage structure (See It → Understand It → Connect It → Feynman It → Challenge It → Reflect), the tutor badges, the "I don't get it" panel with six routes, and the Back/Next footer are all specified in `physics-lesson-engine-README.md`. Notes for **Electricity & Energy Lesson 1**:
- **See It visual:** a rectangular wire loop containing a battery (left), a lamp (top center) and a switch (bottom center). 44 charge dots sit evenly around the loop, and one of them is marked orange.
  - Closing the switch moves every dot at once, slowly, and lights the lamp instantly. Lamp brightness follows the battery slider (1.5–12 V in steps of 1.5).
  - Three readouts: lamp state (Off / Dim / On / Bright), seconds since the loop closed, and how far the marked charge has moved in millimeters, at its true drift speed (≈ volts × 0.012 mm/s).
  - "Mark a new charge" moves the orange marker to a dot that isn't hidden behind the lamp, battery or switch.
  - When `prefers-reduced-motion` is set, slow the motion to 30%.
- **Feynman It:** the banned words are "electricity" and "current". Flag either live, in red `oklch(0.46 0.15 25)`.
- **Challenge It:** a three-option prediction (cutting the wire on the far side of the lamp; the correct answer is "it goes out immediately"). Every option gets a respectful verdict. This is followed by an open question ("what does a dead battery run out of?") with a reveal.
- **Reflect:** the journal entry autosaves, and the Understanding Map shows these levels: circuit 4, charge 3, energy 3, voltage 2, current 2, resistance 1, everything else 0.

## State and persistence
- There is one progress record per lesson. The prototype stores these in localStorage under the keys `heartwood.physics1.lesson1`, `heartwood.physics1.lesson2` and `heartwood.electricity.lesson1`.
- Each record holds `{ stage, visited:{see,understand,…}, connects, connectOwn, feynmanText, feynmanSubmitted, predict, editorAnswer, editorRevealed, journalText }`. In production, move this to a real store keyed `courseId/lessonId`.
- A lesson counts as **complete** once its `visited.reflect` is true. Class progress is the number of completed lessons out of 30.
- The class status shown in the catalog (Not started, In progress, Complete) is derived from those lesson records.
- The journal is per class and lists the Reflect entries, newest first.
- Understanding Map levels run 0–5 (none, encountered, recognize, understand, explain, use). Each lesson sets levels on finish. They can move down as well as up, and must never be shown as a grade.

## Design tokens
- **Colors:**
  - Page `#efe8db`; card `#fffdf7`; card-alt `#faf6ed`.
  - Ink `#231e18`; body `#3d362d` and `#4a4238`; muted `#5c5348` and `#6b6155`; faint `#8a7f70`.
  - Borders `#d8cdba`, `#cdc0ab`, `#e6ddcd`, `#f0e9dc`, `#b9ab94` (dashed).
  - **Accent (copper):** `oklch(0.50 0.12 45)`, hover `oklch(0.40 0.12 45)`.
  - **Green (Roommate, Journal, complete):** `oklch(0.50 0.12 155)`.
  - **Blue (Builder, charge dots):** `oklch(0.44 0.10 250)`.
  - **Red (Editor):** `oklch(0.42 0.13 25)`.
  - Lamp glow `oklch(0.93 0.11 85)`.
- **Type:** Newsreader for reading text and headings (300/400/500/600, plus italic). Public Sans for UI labels, kickers and buttons (400–700). Both come from Google Fonts. Kickers are always uppercase, 11px/700, letter-spacing .18–.22em. Body reading text is never smaller than 18px.
- **Radii:** buttons 5px; panels 7px; cards 9px.
- **Touch targets:** at least 46px tall.
- **Shadows:** none, except the 2px solid hover shadow on catalog cards.
- **Motion:** `hwFade` (opacity 0→1, translateY 6px→0, .35s ease) when a stage is entered.

## Content still to write
- **Physics I, Lessons 3–30:** the full content is in `original-brief/Physics I - Lessons 3-30 build package.docx`.
- **Electricity & Energy, Lessons 2–30:** only the titles and the week ideas exist (they are in the class home's `WEEKS` constant). Write each lesson to the six-stage template, in the same voice as Lesson 1. Each lesson needs a concrete See It object, a banned-words Feynman prompt, a prediction with respectful verdicts, and six stuck routes. The learner's preference, stated in the brief, is to build and test lessons in small batches rather than all 29 at once.
- **Class 3:** not yet specified. Add it to the registry as `coming` when it arrives.

## Files
- `design-references/Heartwood University.dc.html`: the catalog (new).
- `design-references/Physics I - Home.dc.html`, `Physics I - Lesson 1.dc.html`, `Physics I - Lesson 2.dc.html`
- `design-references/Electricity & Energy - Home.dc.html`, `Electricity & Energy - Lesson 1.dc.html`
- `design-references/support.js`: the runtime needed to open the prototypes in a browser. It is not part of the product.
- `physics-lesson-engine-README.md`: the full lesson-engine specification from the Physics I handoff.
- `original-brief/`: the learner's specification and the Physics I build package.
- `design-references/Anatomy & Physiology - Home.dc.html`, `Anatomy & Physiology - Lesson 1.dc.html`
- `original-brief/Physiology - Anatomy & Physiology course spec.docx`: the complete Class 3 specification.
- `screenshots/`: reference captures of the catalog (01), the Anatomy home (05a), each stage of Anatomy Lesson 1 (06a–g), the Electricity & Energy home (02a–c), each stage of Electricity Lesson 1 plus the "I don't get it" panel (03a–h), and the Physics I home (04). They were captured at about 924px wide. The HTML files remain the source of truth.
