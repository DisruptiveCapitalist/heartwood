# The Art and Science of Navigation — Lesson 7: True north and magnetic north
> Week 2 of 7 · The Compass and Earth's Magnetic Field · lesson 2 of 5 this week  
> Concept: **The needle and the map disagree**  
> Lesson completes when: **the Feynman explanation is submitted**

_Opening question._ Yesterday the needle settled, and settled the same way every time. Here is the awkward part: the way it settles is not north. It is a few degrees off — and how many degrees depends on where you are standing, and on what year it is.

## SEE IT
*The Professor:* Two norths on one rose. Slide the declination and watch what happens to the same compass reading.

**On-screen simulation:** `declination`

**What it shows.** Two tabs. **The two norths** draws a compass rose 236 px across with a degree scale, a black arrow to true north, a red half-arrow to magnetic north set at the declination, a dashed arc marking the angle between them with its value, and a thick accent ray showing the direction actually being walked. **Where, and when** plots the United States as a plain latitude/longitude graticule, 760 × 420, with the agonic line drawn down it, the ground shaded green to the west and warm to the east, and four places marked with their published declinations.

**What the learner can change.** First tab: a declination slider from 20° W to 20° E, a compass-reading slider through the full circle, and four town buttons that jump the declination to a real value. Readouts give the reading, the true bearing it converts to, and how many yards off two miles of walking would put you. Second tab: the same four towns, and a slider that lets the declination drift forward up to fifty years at that place's published annual rate.

**The numbers behind it.** Nothing is modelled. A centred dipole predicts about 2.5° east for Columbus, Ohio; the published figure is 7.2° west — wrong by ten degrees and by its sign — so every value was looked up. NOAA NCEI, World Magnetic Model WMM2025, evaluated 1 January 2026: Seattle +14.97° and −0.124°/yr; Denver +7.56° and −0.080°/yr; Columbus −7.22° and −0.018°/yr; Boston −13.98° and +0.071°/yr. The agonic line runs close to 93° W, from four probes of the same model: 30 N 88.0 W → −2.87, 30 N 91.5 W → −0.62, 40 N 93.0 W → −0.05, 45 N 94.0 W → +0.46. Declination counts positive east, true = magnetic + declination, and an error of A degrees costs 1,760 × tan(A) yards per mile — about 31 yards a mile per degree, so 7.2° is 446 yards over two miles.

> _For the handbook:_ A diagram should show the two norths as two arrows from one point with the angle between them named and lettered — *7.2° W*, never a bare number, because the letter is the half people lose. Worth drawing twice, once leaning each way, because a reader who has only seen the westerly case tends to assume it is the rule. Print the model and the date beside any value, and say that the reader should look up their own: the Field Guide spec asks for exactly this, and Chapter 9 should not carry a fixed figure as if it were universal.

> **Field Guide — Chapter 9: True North, Magnetic North, and Declination.** Looking up your own declination on NOAA's calculator and writing it in your notebook with the date, then comparing it with the declination diagram in the margin of a paper map of the same area — the two norths, for your own town rather than the four in the simulation.

**What the learner should notice**
- In Columbus the needle sits **7.2° west** of true north; in Seattle it sits **15.0° east**. Same instrument, same sky, opposite directions.
- There is a line where the two agree — close to **93° west** in 2026, straight up the middle of the country. West of it the needle leans east; east of it, west.
- Ignore 7.2° for two miles and you finish **446 yards** from where you meant to be. A single degree costs about **31 yards a mile**.

## UNDERSTAND IT
*The Professor:* Three sentences, and then one piece of arithmetic worth learning properly.

**The three sentences**
1. **True north** is where the Earth's axis comes out of the ground. It is fixed, it is what every map is drawn to, and it is what the stars turn around. **Magnetic north** is wherever your needle happens to settle, which depends on the whole lumpy field of a planet made of moving iron — and it is not the same direction.
2. The angle between them, at the spot you are standing on, is the **declination**. It is a local number, not a global one: it runs from about 15° east on the Pacific coast to about 14° west in New England, passing through zero somewhere up the middle of the country. Your map prints it; so does the government's calculator; it is not something you can work out from first principles.
3. It also **drifts**, because the field itself is moving. A tenth of a degree a year is typical in the United States, which is small enough to ignore on a weekend and large enough to matter on a map printed in 1985. The magnetic pole has crossed about 1,560 miles since it was first located in 1831, and most of that movement has been recent.

### A CLOCK THAT RUNS FAST BY A DIFFERENT AMOUNT IN EVERY ROOM
Imagine a watch that gains time — but not a fixed amount. In the kitchen it runs seven minutes fast, in the garden fifteen minutes slow, and on the far side of town it is exactly right. The watch is not broken and it is not useless; it is perfectly steady and perfectly readable. You just have to know which room you are in and apply the correction, every single time, before you tell anybody what time it is. A compass is that watch, and declination is the correction.

Here is the arithmetic, and it is worth getting right once rather than half-remembering a rhyme. Declination counts **positive east**. A compass measures from magnetic north, a map is drawn from true north, so **true = magnetic + declination**, and going the other way, **magnetic = true − declination**. Work one through in Columbus, where the declination is 7.2° west, which is −7.2. Your compass reads 049. True bearing: 49 + (−7.2) = **042**, and that is the line to draw on the map. Now reverse it: the map says walk 042 true, so set 42 − (−7.2) = **049** on the compass. In Seattle, with +15.0, the same compass reading of 049 would be 064 true instead. Same needle, same number on the dial, twenty-two degrees apart on the ground.

### The formal names
| Term | Meaning |
|---|---|
| **True north** | Where the axis of rotation comes out. What maps are drawn to, and what the stars circle. It does not move. |
| **Magnetic north** | Whichever way your needle settles, here, today. A local answer from a global field. |
| **Declination** | The angle between the two, at your spot. Positive east. Also called magnetic variation at sea. |
| **Agonic line** | The line along which declination is zero and the two norths agree. In 2026 it runs close to 93° west across the United States. |
| **Isogonic line** | A line joining places with the same declination. Printed on aeronautical and marine charts. |
| **Secular variation** | The slow drift of the field, and therefore of your declination — around a tenth of a degree a year in the United States. |
| **Grid north** | A third north: the direction the vertical grid lines run on a mapping system that has flattened the Earth. Usually within a degree of true north, and stated in the map margin alongside the other two. |
| **Declination diagram** | The little fan of arrows in a topographic map's margin showing all three norths — and, importantly, the year it was drawn for. |
| **World Magnetic Model** | The published model, reissued every five years, that calculators and phones use. The current one is WMM2025. |

## CONNECT IT
*The Roommate:* This gap shows up in more places than you'd think. Which of these have you run into?

**Where it shows up**
- The little fan of arrows in the corner of a topographic map, with a year printed next to it.
- An airport runway numbered 09 or 27 — those are magnetic bearings, not true ones.
- A phone compass offering "true north" and "magnetic north" in its settings, and you not knowing which to pick.
- A hiking app that quietly corrects for declination, so its bearings don't match your compass.
- An old map found in a drawer, with a declination figure from decades ago.
- A news story about the magnetic pole racing towards Siberia.

What all six have in common is a number that somebody had to look up rather than work out. The Earth's field is not tidy enough to be calculated from a picture — which is why every one of those things comes with a date on it.

_On screen it sits here — directly under the items — and appears only once the learner has ticked two of the items above or written one of their own._

### The Builder — try it yourself
Fifteen minutes, indoors, and you will know your own number. Look up your declination on NOAA's calculator — search for "NOAA magnetic declination calculator" and give it your town. Write the figure and today's date in the front of your notebook, in the form *7.2° W* or *15.0° E*, not as a bare number, because the letter is the half people lose. Then find any paper map of your area and hunt for the declination diagram in the margin. Compare its figure with today's. The difference is how far the Earth's field has drifted since that sheet was printed — and if the map is old enough, it is more than the width of the trail you were planning to walk.

### Across cultures — THE MEDITERRANEAN, 13TH TO 16TH CENTURY
**Evidence label: PLAUSIBLE BUT UNCERTAIN**

From the late 1200s, Mediterranean sailors used portolan charts: coastal charts covered with a web of straight rhumb lines radiating from compass roses, drawn to be worked with a compass, dividers and a straight edge rather than with latitude. They are strikingly accurate about the shape of the Mediterranean — accurate enough that scholars still argue about how they were made, since no surviving document describes the surveying behind them.

Laid over a modern map, these charts sit rotated anticlockwise, usually by something between about 8 and 10 degrees. The long-standing explanation is that they were drawn to magnetic north rather than true north, and that the rotation is simply the Mediterranean's declination at the time, frozen into the paper. If that is right, these are the oldest recorded measurements of declination in Europe — made by people who were not trying to measure it, and may not have known there was anything to measure.

> **What remains uncertain:** The rotation is real and measurable; the explanation is not settled. The charts' rotation does not change over the centuries in the way a magnetic explanation predicts it should, since declination in the Mediterranean was itself drifting, and some scholars argue the rotation comes from the underlying survey or from the chart-making method instead. Who drew the first portolan, where, and from what, is also unknown — the earliest surviving example, the Carte Pisane, is usually dated to the late thirteenth century, and even that is disputed.  
> **Sources:** Campbell, "Portolan Charts from the Late Thirteenth Century to 1500," in *The History of Cartography*, vol. 1 (1987); Nicolai, *The Enigma of the Origin of Portolan Charts: A Geodetic Analysis of the Hypothesis of a Medieval Origin*, Brill (2016).

_Do not restate this claim in the handbook without its label, its uncertainty and its sources._

## FEYNMAN IT
A Scout says: "My compass points north. The map points north. Why would I need to correct anything?" Answer him — **without using the words "declination," "variation," or "correction."**

Banned words: **declination**, **variation**, **correction**

**A good explanation contains**
- The map is drawn to the spot the Earth spins around.
- The needle answers to the Earth's iron instead, which is somewhere else entirely.
- So the two norths sit a few degrees apart — a different few degrees in every town, and a different few again in fifty years.
- Walk far enough on the uncorrected one and the error turns into real distance on the ground.

## CHALLENGE IT
*The Editor:* One piece of arithmetic, and one question about why nobody can just fix this.

**You are in Columbus, where the declination is **7.2° west**. The map tells you to walk a bearing of **110° true**. What do you set on the compass?**

- _117 — you add the 7.2._  
  Right, and here is why, so it stays right. West declination counts as negative, and magnetic = true − declination, so 110 − (−7.2) = 117.2, which you set as 117. The picture says the same thing: magnetic north is sitting 7.2° to the west of true north, so every direction measured from it comes out with a bigger number. Check it the other way round — 117.2 + (−7.2) = 110 true. It closes.

- _103 — you take the 7.2 off._  
  That is the right arithmetic in the wrong direction, and it is the single most common mistake in this whole subject. You would be 7.2° off, which over two miles leaves you 446 yards from where you meant to be — and worse, 890 yards from where you would have been if you had subtracted when you should have added. The safe habit is never to trust the rhyme. Draw the two norths, see which side the needle sits on, and read the answer off the picture.

- _110 — the compass doesn't know about the map._  
  The compass certainly doesn't know, which is exactly why you have to. It will happily point you along 110 measured from its own north, and its north is 7.2° west of the map's. The two numbers look identical and mean different directions on the ground. This is the one the brief insists on saying out loud: a compass bearing is not automatically a true-north bearing, and nothing about the instrument will warn you.

**We have known about this gap since the eleventh century, and we have known its size precisely for two hundred years. So why has nobody simply built a compass that corrects itself?**

Because there is no single amount to build in. The correction depends on where the compass is, and a compass does not know where it is — that was Lesson 1's whole distinction, and here it is again with consequences. A needle reports a direction; it has no idea of position. Build in Seattle's 15° east and the instrument becomes wrong by 22° in Columbus. The only way to make it self-correcting is to tell it where it is, which means a second instrument entirely.

In practice people do the next best thing. Many baseplate compasses have an **adjustable declination scale**: a small screw turns the orienting arrow away from the housing's north by however many degrees you set, so once you have dialled in your local figure, every bearing you read is already true. It is a good tool and it carries its own hazard — the setting is invisible once made, so a borrowed compass may be quietly carrying somebody else's town. Check the screw before you trust the needle.

_Links across to:_ Lesson 1 — a direction is not a position (`navigation/lesson-01`)

## REFLECT
One thing I understand now that I didn't understand this morning:

_Tomorrow, Lesson 8: the instrument itself. Every part of a baseplate compass, what each one is for, and the two movements that turn a direction you can see into a number you can carry._

## "I don't get it" — 7 ways in

### Explain it with a compass
Lay your compass on a map of your own area, with the baseplate's edge along a north-south grid line and the direction-of-travel arrow pointing up the sheet. The needle will not line up with it. The angle you can see between the needle and the printed line is your declination, in the flesh — not a number from a table but a gap you are looking at. Everything in this lesson is about what to do with that gap.

### Explain it with a map
Find a topographic map and look in the bottom margin for a small diagram of two or three arrows fanning apart, one marked with a star and one with half an arrowhead. The star is true north; the half-arrow is magnetic. The angle drawn between them is the declination for that sheet — and crucially, there is a year printed beside it. The mapmaker could not give you a permanent number, so they gave you a dated one.

### Use an everyday object
Think about the rear-view mirror in a car. It is a perfectly good mirror and it shows you a perfectly accurate image — but everything in it is reversed, and you have learned to correct for that so automatically that you no longer notice. Nobody proposes building self-unreversing mirrors. You just know what the instrument does to the truth, and you read it accordingly. A compass is the same kind of honest, slightly misleading instrument.

### Show me a diagram
Go back to SEE IT and do one thing. Leave the compass reading alone, somewhere around 045, and drag only the declination slider from one end to the other. The orange line — the direction you are actually walking — sweeps right across the rose while the number on the dial never changes. That is the whole lesson: the same reading means a different direction depending on where you are standing. Then press the four town buttons and watch it jump between real places.

### Walk me through an example
Two hikers set off on the same morning with the same compass bearing of 000, one from Seattle and one from Boston. The Seattle hiker is actually walking 015 true — fifteen degrees east of north. The Boston hiker is walking 346 true — fourteen degrees west of it. After ten miles they are heading in directions nearly thirty degrees apart, and both of them have followed their instrument exactly. Neither compass is faulty. Neither hiker made an error of reading. The instrument was simply answering a different question from the one the map asked.

### Break it into smaller steps
Four small questions. One: does the Earth spin around the place your needle points to? No — it spins around true north. Two: are those two places in the same spot? No, and they are not even close. Three: so does the direction between them change depending on where you stand? Yes, necessarily — look at a globe and you will see why. Four: so is there one correction that works everywhere? No. And that is the whole of today.

### Work backward from the answer
Start from an oddity: runway numbers. A runway marked 27 points at 270 degrees — but magnetic, not true. And every few decades, airports repaint them. Tampa International renumbered all three of its runways in January 2011 — 18R/36L became 19R/1L, and so on down the list — because the field had drifted far enough that the old numbers were no longer the nearest ten degrees. Palm Beach International had done the same in 2009. Work backward from "why would anyone repaint a runway?" and you arrive at exactly this lesson: the needle's north is not the map's north, and the gap between them will not hold still.

## Understanding Map after this lesson
| Concept | Level (0–5) |
|---|---|
| Declination | 4 |
| Magnetic vs. geographic poles | 4 |
| True, magnetic & grid north | 4 |
| Magnetic field | 4 |
| Why a needle points | 4 |
| Earth as a magnet | 4 |
| Converting a bearing | 3 |
| Dip, or inclination | 3 |
| Bearing & distance | 3 |
| Magnetic interference | 2 |
| Direction vs. position | 5 |
| Latitude & longitude | 5 |
| Map projection | 4 |
| Taking a bearing | 1 |
