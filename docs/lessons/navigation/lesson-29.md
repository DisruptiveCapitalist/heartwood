# The Art and Science of Navigation — Lesson 29: Planning a real journey
> Week 6 of 8 · Putting It Together · lesson 4 of 5 this week  
> Concept: **A plan is an error budget**  
> Lesson completes when: **the Feynman explanation is submitted**

_Opening question._ A plan is not a line on a map. It is a list of legs, each with an hour and a width — and one decision about where in the day to spend a minute.

## SEE IT
*The Professor:* A day's circuit from camp: the stone bridge, the ford, the old quarry, Hollow Rock, the fire tower, Beaver Pond, and home. Eight and a half miles. Look at the circles before you touch anything.

**On-screen simulation:** `voyage` ({"mode":"route"})

**What it shows.** A plan of a day's circuit from Camp Heartwood — the stone bridge, the ford, the old quarry, Hollow Rock, the fire tower, Beaver Pond and home — at 180 pixels to the mile, with each leg labelled in miles, a true north arrow and a one-mile scale bar. A circle is drawn at every waypoint showing how wide the walker's position could be by then; the circles grow along the route and turn green and small wherever a fix is taken.

**What the learner can change.** Which waypoints to stop and fix a position at, by tapping any of the six landmarks; how well a course is held, from 1° to 6°; how good the pace count is, from 2 to 15 per cent; and a toggle between errors that wobble independently each leg and errors that lean the same way all day.

**The numbers behind it.** The route's leg lengths are measured off its waypoint positions rather than asserted beside them, so the picture and the table cannot disagree: 1.05, 0.75, 1.14, 1.04, 1.10, 1.43 and 1.93 miles, 8.44 in all, with 1,000 feet of climb, which Naismith calls 3 hours 19 — of which the climb is exactly half an hour. At three degrees and a five per cent pace the two error sources are almost identical in size, since tan 3° is 0.0524 and five per cent is 0.0500. With no fix all day the final circle is 423 yards for wobbling errors and 1,076 for leaning ones, a factor of 2.5, which is near enough the square root of seven legs. One fix at the stone bridge, the first landmark, takes 18 yards off the end of the day; the same fix at Beaver Pond, the last, takes 172 — nine times the value for identical work. Two fixes are worth no more at the end than the later of the two alone, because only the last fix bounds where the day finishes. A fix on every leg never lets the circle exceed 50 yards.

> _For the handbook:_ Chapter 30's exercises need a planning sheet, and the sheet needs a fifth column: bearing, distance, climb, time, and how wide your position could be by the end of the leg. About 130 yards per mile at three degrees and five per cent is the figure a reader can use without a calculator. The figure should draw the growing circles rather than the route, because the route is the part everybody already draws. The chapter should give the rule that a fix is worth what comes after it — and should say, with the numbers, that a fix at the first landmark is nearly worthless to where the day ends, since taking one early is the universal instinct. Worth adding beside Naismith: the rule is 1892 and famously optimistic, and the honest correction is one day of your own planned-against-actual times.

> **Field Guide — Chapter 30: The Natural Navigation Laboratory.** Chapter 30's exercises A to E are a day out, and this is how to plan it. Choose a circuit of six or eight miles over ground you can get a map of, with four or five features you could positively identify if you stood on them. Write the legs down in a table: bearing, distance, climb, and the time Naismith gives for each. Then add a fifth column, the one nobody writes: how wide your position could be by the end of that leg. Decide, before you go, which single feature you will stop at and fix your position from — and choose it by asking where in the day you most need the width to be small, which is almost never the beginning.

**What the learner should notice**
- With no fix taken all day, the circle you could be in when you get back to camp is **423 yards** across the radius — and it grew at every waypoint, because each leg adds its own bearing error and its own pace error to everything before it. Naismith says the day is **3.3 hours**, of which exactly half an hour is the thousand feet of climb.
- Now press ERRORS THAT LEAN THE SAME WAY ALL DAY. The same compass, the same stride, the same route: **1,076 yards**. Nothing has changed except the assumption that the mistakes agree with each other instead of cancelling — which is what a declination left unset, or a pace calibrated on a road and used on a hillside, actually does.
- Then take one fix, and take it twice. Tap the **stone bridge** — the first landmark, a mile out — and the end of the day improves by **18 yards**. Now untap it and tap **Beaver Pond** instead, the last landmark before camp: the same single minute's work, and the day ends **172 yards** better. Nine times the value, for identical effort, because of *when* you did it.

## UNDERSTAND IT
*The Professor:* Three sentences, and the first one is the only definition of planning this course offers.

**The three sentences**
1. **A plan is a table with five columns, and the fifth is the one nobody writes.** Bearing, distance, climb, time — everybody writes those, and they are the easy four. The fifth is how wide your position could be by the end of that leg, and writing it down converts a route into something you can make decisions about: whether this leg needs a catching feature, whether that one can be walked carelessly, where the daylight runs out, and whether the circle will still be smaller than the thing you are trying to find. A route tells you what you intend to do. A budget tells you what you can afford to get wrong.
2. **The circle grows at every step and only an identified feature resets it — and it matters enormously where in the day that happens.** The cone is wide at the end of the day for the same reason a bank balance is wrong at the end of the month: it is a running total, and Lesson 28 named that. So the one fix you take should be the last one you can get before the part of the day that has to be right. Taken at the first landmark it is almost worthless, because six legs of growth follow it; taken at the last, it carries almost all the way home. And two fixes are worth no more at the end than the later of the two on its own, because the earlier one is overwritten — its job was to protect the legs in between, which is real and smaller.
3. And **you must plan as though your errors lean, because you cannot tell whether they do.** Seven legs of error that wobble independently come to 423 yards; the same seven leaning the same way come to 1,076. The difference is a factor of two and a half, which is the square root of seven, and it is exactly the Lesson 22 distinction between a shaky hand and a mis-set declination. Here is the hard part: from inside the day, those two look identical. Nothing you can observe tells you which you have got, so the honest budget is the leaning one, and every fix you take is partly an experiment to find out.

### MEASURING A LONG WALL WITH A SHORT RULE
You want the length of a wall and you have a one-foot rule. So you lay it down, mark the end, lay it down again, and again, forty times. Every placement is a tiny bit off and the errors add up, and by the far end you genuinely do not know whether you are an inch out or six — and here is the thing: if you tend to overlap slightly each time, every single one of the forty errors is in the same direction, and the total is forty times one small mistake rather than the square root of forty. Now suppose there is a doorway partway along whose position you already know. Measuring to the doorway, checking, and starting again from there halves the problem. The doorway is a fix. And it matters which end of the wall it is nearer.

The fifth column is an **error budget**, which is a term from engineering rather than from walking, and the shape it draws on a map is an **error cone** — or, when the legs turn, a chain of circles that only ever gets bigger between fixes. The planning vocabulary around it is mostly Lesson 27's: **legs** between **waypoints**, with **handrails** to follow, **catching features** to stop you, and **attack points** for the legs that must be accurate. Two more belong to the clock rather than the map. **Naismith's rule** of 1892 — an hour for three miles plus an hour for two thousand feet — gives the time, and it is famously optimistic for a tired party, so experienced walkers add a half or use one of several published corrections. And **last light** is the hard constraint that makes the whole budget mean something: a plan whose final leg is in the dark is a different plan, because the width of your cone has to be smaller than the thing you are looking for, and in the dark everything you are looking for is smaller.

### The formal names
| Term | Meaning |
|---|---|
| **Error budget** | The width of your possible position at the end of every leg, written down in advance. The difference between a plan and an intention. |
| **Error cone** | That width drawn on the map. Grows with distance travelled, collapses to the quality of a fix wherever one is taken. |
| **Naismith's rule** | An hour for every three miles plus an hour for every 2,000 feet of ascent (1892). Add half again for a heavy pack, rough ground or a tired party. |
| **Leg** | One bearing held for one distance. The unit a plan is made of, and the unit error accumulates in. |
| **Escape route** | The way off, written down for each leg, with its own bearing and distance. Planned when you are warm and dry, because that is the only time it gets planned well. |
| **Clinometer** | The tilt scale on a good compass. Sight the top of a slope or a tree, read the angle, pace the base distance, and height = distance × tan(angle) — which is how you get Naismith's climb when you have no map. Field Guide Chapter 14. |
| **Last light** | Sunset is not it. Useful light ends well after sunset and well before full dark, and the plan needs a number, not an impression. |

## CONNECT IT
*The Roommate:* Where else do you plan by asking how wrong you can afford to be, rather than how it ought to go?

**Where it shows up**
- Leaving for the airport, and deciding how early is early enough.
- Cooking a big meal backwards from when people arrive.
- Deciding how much cash to take somewhere with no card machines.
- Charging your phone before a day out, and judging what it will survive.
- Cutting the first piece of a flat-pack and finding the rest depends on it.
- Sending a long email and knowing where it could be misread.

The airport is the pure case and everybody does the arithmetic without writing it down. You do not estimate the journey time and leave then; you estimate it, think about what could go wrong, and decide how much of a cushion the consequence deserves — because the cost of being early is boredom and the cost of being late is the whole trip. That asymmetry is the budget. And notice what you do with your one check: you look at the departure board when you arrive, not at home, because a fix is worth most at the point where the next decision hangs on it.

_On screen it sits here — directly under the items — and appears only once the learner has ticked two of the items above or written one of their own._

### The Builder — try it yourself
Plan a real day before you walk a real day, and keep the sheet afterwards. Choose a circuit of six to eight miles with four or five positively identifiable features on it. Make the table: for each leg, the bearing, the distance, the climb, the Naismith time, and — the column that matters — how wide your position could be by the end of it, which you can take as about a hundred and thirty yards for every mile walked if you hold a course to three degrees and count to five per cent. Mark the one feature where you will stop and fix, and write down why you chose that one. Then walk it, and at every waypoint write the actual time beside the planned time. The gap between the two columns, by the end, will teach you more about Naismith than any correction factor.

### Across cultures — THE ANDES, 15TH CENTURY
**Evidence label: DOCUMENTED REGIONALLY**

The Inca state ran a road network — the **Qhapaq Ñan** — of tens of thousands of kilometres across some of the hardest walking country on Earth, and it was built around exactly the unit this lesson is about: a day's travel. Lodgings called **tampu** were placed along the main roads at intervals that the sources put at roughly twenty to thirty kilometres, which is to say one day apart; relay stations for the **chasqui** runners who carried messages were far closer together, a few kilometres, so that each runner could sprint rather than pace.

Run Naismith over that spacing and the choice stops looking arbitrary. Twenty-five kilometres is fifteen and a half miles, which is five hours ten by the distance alone; add a thousand metres of Andean ascent, which is modest for that country, and it is six hours fifty. That is a full day's walk with a load, arriving with light to spare — and the infrastructure encodes the arithmetic. The planning unit of a journey is not a distance or a time but a day, and an empire that had to move messages and armies through mountains laid its buildings out on that unit and nothing else.

> **What remains uncertain:** The figures here vary a great deal between sources and most of the accessible ones are secondary. The network's length is given as anything from 30,000 to 60,000 km and the true extent is still being surveyed; tampu spacing is reported as a day's walk rather than measured systematically, and the regularity implied by a round "20 to 30 km" is almost certainly tidier than the ground; chasqui station spacing appears in modern accounts as 2.5, 4 to 6, 6 to 7 and 7.5 km, which should be read as "a few kilometres, disputed". The Naismith calculation above is this course's inference and not any source's: Naismith's rule is a Scottish rule of 1892, and whether it describes a loaded Andean porter at three thousand metres is an open question — altitude alone would be expected to make it optimistic.  
> **Sources:** Hyslop, *The Inka Road System* (1984); D'Altroy, *The Incas* (2002).

_Do not restate this claim in the handbook without its label, its uncertainty and its sources._

## FEYNMAN IT
Explain to an experienced walker who plans by distance and time why their plan is missing something, and how they should decide where to stop and check their position.

Banned words: **budget**, **cone**, **accumulate**

**A good explanation contains**
- It says what grows as you walk, and what makes it grow.
- It says what makes it small again, and what that costs.
- It gives a reason for choosing one place over another to stop and check.
- It says why planning for the worse of the two cases is the honest thing to do.

## CHALLENGE IT
*The Editor:* One question, and it is the practical decision of the whole lesson.

**You will stop and fix your position exactly once on today's circuit, and it costs you a minute. The route passes six identifiable features. Which do you choose, and why?**

- _The last one before the final leg, because everything after the fix is what the fix has to cover._  
  Right, and the measurement is startling: the same minute is worth 172 yards at Beaver Pond and 18 yards at the stone bridge — nine times the value for identical effort. The reasoning is simple once stated. A fix sets your uncertainty to the quality of the fix, and then it grows again on every leg that follows; so the question is not "where can I get a good fix?" but "how much walking will follow it?". The corollary is worth having too: if the part of the day that has to be right is in the middle — a river crossing, a col in cloud — then the last fix before THAT is the one to plan for, and the end of the day can look after itself.

- _The first one, to make sure the day starts from a known position._  
  This is the instinct and it is almost exactly wrong, which is why the lesson is built on it. Starting from a known position is excellent and you already have one: you set off from camp, which you can identify perfectly. A fix at the first landmark therefore replaces one mile of accumulated error with a 50-yard fix and then lets six more miles accumulate on top — worth eighteen yards at the end of the day, against a hundred and seventy-two for the same work done later. There is a case for an early fix, but it is not this one: it is to find out whether your pace calibration and your declination are behaving, early enough to do something about it.

- _The middle one, to split the day's error in half._  
  A reasonable-sounding compromise that gets about half the benefit, and the arithmetic says why there is no prize for symmetry. Error accumulates along the route, so a fix at the midpoint discards the first half's growth and permits the second half's — and the second half is the one that determines where you end up. On this circuit the middle fix lands between the two extremes, exactly as you would expect, and the useful insight is that the value of a fix depends only on what comes AFTER it. If you genuinely need the whole day to be tight, the answer is not one well-placed fix; it is several, and the simulation will show you that a fix on every leg never lets the cone grow at all.

**You have a plan, a table, and a fix in the right place. What will actually go wrong tomorrow?**

Your measurements will disagree with each other. Not one of them will be obviously wrong — that would be easy. You will stand somewhere, take three bearings and a pace count, and the four of them will point at four slightly different places, and you will have to decide which one to stop believing. That is the last lesson of the course, and it is the only one where the right answer is a judgement rather than a procedure.

And the second thing: the plan will be optimistic about time. Naismith gives three hours and twenty minutes for tomorrow's circuit, and the fifth column is honest while the fourth one is hopeful — nobody has ever added a correction factor to an error budget and then been surprised by it, and everybody has been late. Write the actual times beside the planned ones as you go. One day out, honestly recorded, is worth more than any published correction.

_Links across to:_ Navigation, Lesson 23 — how far is it? (`navigation/lesson-23`)

## REFLECT
Write tomorrow's plan — a real one, for real ground you could reach this month. Five legs will do. Put the fifth column in, and put a ring round the feature where you will stop and fix.

_Tomorrow:_ The last lesson. You will stand somewhere unknown with four measurements that do not agree, and you will have to throw one of them away — and the set that fits itself most beautifully turns out to be the one that is furthest wrong.

## "I don't get it" — 7 ways in

### Explain it with a compass
Your compass contributes one half of every leg's width and your legs contribute the other, and at three degrees and five per cent the two halves are almost exactly equal: the tangent of three degrees is 0.052 and five per cent is 0.050. So there is no point buying a better compass while your pace count is uncalibrated, and no point calibrating your pace while you are holding courses to five degrees. That symmetry is the practical reading of Lesson 23, and it tells you where to spend your attention: on whichever of the two you have not looked at recently.

### Explain it with a map
Take a pencil compass — the drawing kind — and draw your plan properly. At each waypoint put a circle whose radius is how wide you could be, and let it grow: about five millimetres per mile on a 1:25,000 sheet, if you are holding three degrees and counting to five per cent. Now look at what the circles cover. Where a circle is smaller than the thing you need to find, the leg is fine. Where the circle has got bigger than the gate, the col, or the bridge, the plan needs either a catching feature or a fix — and you can see which legs those are before you leave the kitchen table.

### Use an everyday object
Find a short ruler and measure something long with it — a hallway, a table, a bookshelf — by laying it end over end and counting. Then measure the same thing with a tape in one go. The difference between your two answers is the whole lesson, and the interesting part is that you will not be able to say which direction your end-over-end answer is wrong in, because you cannot remember whether you tended to overlap or to leave gaps. That not-knowing is the reason to budget for the leaning case: the errors may all have been in the same direction, and nothing in your memory of the measuring will tell you.

### Show me a diagram
Watch only the circles and ignore the readouts. Starting from camp there is no circle at all, because you know where you are; by the bridge there is a small one, and it gets bigger at every waypoint, never smaller. Now tap a landmark. That circle alone goes green and small — and every circle after it is smaller than it was, while every circle before it is untouched. That picture is the argument: a fix works forwards only. Tap the last landmark instead of the first and watch where the saving appears.

### Walk me through an example
Camp to the stone bridge is 1.05 miles, climbing 120 feet: Naismith gives 25 minutes, and the leg's own width is about 134 yards. Bridge to the ford, three quarters of a mile and flat: 15 minutes, 96 yards of its own, and the running total is 165. By Hollow Rock you are four miles out, an hour and forty minutes gone, and 257 yards wide. By the pond, six and a half miles, two hours thirty-eight, 345 yards. And home at eight and a half miles, three hours nineteen, 423 yards — which is a quarter of a mile, and more than enough to walk past a camp in poor light. Stop at the pond, fix your position in a minute, and you come home 251 yards wide instead.

### Break it into smaller steps
Six steps at the kitchen table. One: break the route into legs that each end at something you could identify. Two: write the bearing, the distance and the climb for each. Three: add the Naismith time, and then add a half again if the party is heavy, tired or new. Four: add the fifth column — roughly 130 yards of width for every mile, at three degrees and five per cent. Five: find the legs where the width has got bigger than the thing you are aiming at, and give each of them a catching feature. Six: choose the one place you will stop and fix, by asking which part of the day has to be right.

### Work backward from the answer
Start from the end of the day: you want to arrive at camp in the dark and find it. Camp is perhaps fifty yards across as a thing you can recognise. So the question that governs the entire plan is how wide your position can be on the final leg, and that is set by the last fix and the distance after it — nothing else in the day touches it. Work backwards from fifty yards and you discover you need a fix within a mile or two of home, and you discover it before you have planned a single leg. Every good plan in this subject is built backwards from the moment that has to work.

## Understanding Map after this lesson
| Concept | Level (0–5) |
|---|---|
| Error budget | 4 |
| The error cone | 4 |
| Naismith's rule | 4 |
| Measuring height with a compass | 2 |
| Escape routes | 3 |
| Catching features and handrails | 5 |
| Aiming off | 5 |
| Random and systematic error | 5 |
| Absolute and accumulated quantities | 5 |
| Dead reckoning | 5 |
| Pace counting | 5 |
| Resection | 5 |
| Knowing a method's limits | 5 |
