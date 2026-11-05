# Cards written for the handbook

Across Cultures cards that the Field Guide spec asks a chapter for and that no
lesson has a slot for. There are four files here, and there should not be many: a card
normally belongs to a lesson, is approved as part of it, and reaches the
handbook through `scripts/export-lesson.mjs`. A card in this folder has been
through no lesson and no learner, so it carries its own label, uncertainty and
sources for the same reason the exported ones do — and it says at the top why it
is here.

| File | Chapter | Why it has no lesson |
| --- | --- | --- |
| `chapter-23-bighorn-medicine-wheel.md` | 23, Indigenous Peoples of North America | Lesson 28 is the lesson behind Chapter 23, and its one card is the Chacoan Great North Road, which the lesson's argument about holding a line needs. The spec asks Chapter 23 for the Bighorn Medicine Wheel as well. |
| `chapter-25-land-signs.md` | 25, Polynesian and Pacific Island Navigation | Chapter 25's Pacific material reaches the course through the cards in Lessons 19 and 24, and those two slots hold the star compass and *etak*. The signs of land are in no lesson. |
| `chapter-25-how-navigators-were-taught.md` | 25, Polynesian and Pacific Island Navigation | Same reason. The section was drafted from *We, the Navigators* with no card behind it, so it had no labels. |
| `chapter-26-mesoamerica.md` | 26, Maya and Mesoamerican Navigation | No lesson anywhere in the course carries a Mesoamerican card. Holds four cards and a note, not one card. |

If a card here ever acquires a lesson, move it into that lesson's
`acrossCultures` block and delete the row.
