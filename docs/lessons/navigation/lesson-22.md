# The Art and Science of Navigation — Lesson 22: The cocked hat
> Week 5 of 7 · Measuring, Plotting, and Finding Position · lesson 2 of 5 this week  
> Concept: **What three disagreeing lines tell you**  
> Lesson completes when: **the Feynman explanation is submitted**

_Opening question._ You take a third bearing to check the first two. The three lines do not meet. Now what?

## SEE IT
*The Professor:* Three bearings now, and three lines that will not meet. Press TAKE ANOTHER SET a dozen times and keep an eye on the tally in the right-hand readout before you read on.

**On-screen simulation:** `chart-fix` ({"mode":"hat"})

**What it shows.** Three bearings plotted back from a chosen trio of landmarks, leaving the small triangle navigators call the cocked hat. The triangle is shaded green when it contains the true position and red when it does not, the middle of it is marked as the fix, the gap to the truth is labelled in yards, and a running tally counts how many of the last sets of bearings put the truth inside.

**What the learner can change.** Which three landmarks — all in front of the observer, or spread round them — how good the bearings are, from half a degree to four, a button for a fresh random set, and a toggle that makes all three bearings wrong by the same amount in the same direction instead of randomly.

**The numbers behind it.** The truth falls inside the cocked hat one time in four: exactly two of the eight ways three errors can fall, confirmed by sampling at 25.2% for every error size from 0.5° to 4° and for every trio on the sheet. The correlation between the triangle's size and how wrong the fix actually is, is 0.30 — the simulation will produce a 31-yard triangle whose fix is 82 yards out, and a 120-yard triangle whose fix is 45 yards out. A constant two degrees on all three bearings is a different animal: with the landmarks spread round the observer the fix is 11 yards out from a 108-yard triangle, and with all three in front of them it is 81 yards out from a 57-yard one.

> _For the handbook:_ Chapter 12's section on the cocked hat should lead with the one-in-four figure and the counting argument behind it, which fits in three sentences and is the only version a reader will remember. It must not repeat the folklore that a small triangle means a good fix; the measured correlation is 0.30, and the chapter can say so. The practical instruction that follows is about where to point the compass, not how carefully to read it: three objects spread round the observer survive a mis-set declination almost intact, and three in front of them do not survive it at all.

> **Field Guide — Chapter 12: Triangulation and Resection.** Take three bearings instead of two, from the same spot, to three features well spread around you, and plot all three. They will not meet at a point — they never do. Measure the triangle they leave, in yards on the ground, and write that number in your notebook beside the fix. Then do the whole thing again from the same spot an hour later, and compare the two triangles. The exercise is not to make the triangle small; it is to find out how much your own bearings disagree with each other, which is a number nobody can tell you and which you will use for the rest of your life.

**What the learner should notice**
- The three lines leave a small triangle. Navigators have called it a **cocked hat** for two centuries, and the instinct it produces is universal: a small one feels like a good fix. Watch what the simulation opens on — a triangle **fifteen yards** a side, and the true position **forty-two yards** away and outside it.
- Keep pressing. The truth lands inside the triangle about **one time in four** — and this is not a quirk of this sheet or this error size. Make the bearings four times better and the triangle shrinks fourfold while the fraction stays at one in four. It is counting, not navigation: three lines, each on one side of you or the other, is eight equally likely arrangements, and only two of them close round you.
- Now press ALL THREE WRONG THE SAME WAY, which is what a mis-set declination does. With the landmarks spread around you the fix is **11 yards** out; switch to the three in front of you and the same error puts it **81 yards** out — from a triangle barely half the size. **The tidy triangle is the bad fix.**

## UNDERSTAND IT
*The Professor:* Three sentences. The first is arithmetic, the second is the one that will annoy you, and the third is the one you can act on.

**The three sentences**
1. **Three lines never meet, and that is information rather than failure.** Two measurements were exactly enough to buy a position, with nothing left over. A third buys you something new: the three lines disagree by an amount that is a direct measurement of how much your own bearings disagree with each other. The size of the triangle is a reading off your own instrument and your own eyesight, and it is worth more than the fix is.
2. **But the triangle does not contain you, most of the time.** One time in four, and no oftener however good your bearings are. The reason is a count rather than a subtlety: each line misses you on one side or the other, so three lines have eight equally likely arrangements, and in only two of them do the three lines close around you. The other six leave you outside, sometimes well outside, with a perfectly tidy little triangle sitting next to you looking authoritative.
3. And **the size of the triangle hardly tells you how wrong the fix is.** Measured over twenty thousand sets of bearings on this sheet, the relation between the triangle's size and the actual miss is weak — strong enough that a huge triangle does mean something went wrong, nowhere near strong enough to read one off the other. A fifteen-yard triangle can sit forty yards from the truth and a hundred-and-twenty-yard one can sit forty-five from it. The useful distinction is not big or small: it is whether your error is random or always the same way.

### THREE CLOCKS IN A HOUSE
You have three clocks and they read 9:58, 10:01 and 10:04. They disagree by six minutes, and that six minutes is genuinely useful: it tells you not to trust any of them to better than a few minutes. What it does not tell you is whether the real time is 10:01. If all three were set from the same slow radio signal, they could agree to within six minutes of each other and all be twenty minutes behind — tight spread, large error. Tightness between your measurements is a measure of their *consistency*, and consistency is not correctness. Three clocks wound from the same wrong source are the mis-set declination, and the only cure is a clock that got its time from somewhere else entirely.

The six-minute spread between the clocks is **precision**; being twenty minutes behind is a failure of **accuracy**, and the two are different quantities that English usually treats as synonyms. An error that falls differently every time is **random** and shows up as the size of the cocked hat. An error that falls the same way every time is **systematic** — a bias — and it does not show up in the cocked hat at all, which is exactly why it is dangerous. The remedy for random error is to measure more and average. The remedy for systematic error is to spread your landmarks around you so the bias has to cancel itself, and that is a decision about geometry rather than about care.

### The formal names
| Term | Meaning |
|---|---|
| **Cocked hat** | The triangle left by three lines of position. Named for the three-cornered hat; in use among British naval navigators since at least the early nineteenth century. |
| **Precision** | How closely repeated measurements agree with each other. The size of the cocked hat measures this, and only this. |
| **Accuracy** | How close a measurement is to the truth. The cocked hat says almost nothing about it. |
| **Random error** | Falls differently each time, averages out, and makes the cocked hat bigger. The honest kind. |
| **Systematic error** | Falls the same way each time. A mis-set declination, a compass with a bent needle, a consistent habit of reading the dial high. Averaging does not touch it. |
| **Most probable position** | The point a navigator settles on inside or near the hat. For bearings of equal quality and landmarks spread round you, the middle of the triangle is a reasonable choice; when they are all on one side, it is not. |
| **Redundancy** | Having more measurements than the answer needs. Two bearings give a position; a third gives a position AND a comment on it. |
| **Spread** | How well the landmarks surround you. Three bearings within half the horizon leave a bias uncancelled; three spaced round you mostly cancel it. |

## CONNECT IT
*The Roommate:* Where have you seen things agree closely with each other and all be wrong together?

**Where it shows up**
- Three bathroom scales that agree, all set wrong.
- Everyone in the group remembering the same detail incorrectly.
- A recipe followed exactly, in an oven that runs cool.
- Four reviews that all quote the same press release.
- A tape measure that starts at the wrong end of the hook.
- Two watches both set from the same fast kitchen clock.

The oven is the exact shape of this lesson. The recipe is precise, your following of it is precise, every batch comes out the same — and they all come out underdone, and nothing inside the process can tell you, because everything inside the process shares the fault. The cocked hat is a check made entirely out of your own bearings, so it can only catch the faults your bearings do not share. An oven thermometer is a bearing to a landmark on the other side of you.

_On screen it sits here — directly under the items — and appears only once the learner has ticked two of the items above or written one of their own._

### The Builder — try it yourself
Here is a half-hour experiment that will teach you more about your compass than any amount of reading. Stand on a fixed spot you can find again. Take a bearing to one definite, distant object — a mast, a spire, the corner of a far building. Write it down. Walk ten paces away, come back, and take it again. Write it down. Do that twenty times. You now have twenty readings of one unchanging quantity, and the spread of them is your personal bearing error — the number everything in this week depends on and that every book quotes as "two or three degrees" without knowing anything about you. Most people are surprised, in both directions.

### Across cultures — NUNAVUT, INUIT WAYFINDING
**Evidence label: WELL DOCUMENTED**

Across the Canadian Arctic, travellers have long steered by **uqalurait** — the tongue-shaped snowdrifts that a prevailing wind carves into hard snow, lying in a consistent orientation over large distances. The elder Mariano Aupilarjuk described them simply as the snowdrifts that tell you which direction to go. The knowledge is not merely "the drifts point that way": it includes reading the *shape* of a drift to tell which of two prevailing winds built it, and so whether the drift under your feet is a current statement about direction or a stale one.

That last part is what belongs in this lesson. A drift is a position line of the very best kind — free, everywhere, readable in a whiteout when nothing else is — and it is also a line that can be systematically wrong while looking perfectly convincing, because the wind that made it has shifted since. Igloolik hunters have reported exactly this in recent decades, that the drifts are now being built by a different wind, and have adjusted by crossing them at a different angle: a correction applied to a trusted instrument from outside the instrument, which is the only kind of correction that catches a bias.

> **What remains uncertain:** The terminology is local and varies — *uqalurait* in some regions, *kalutoqaniq* for the wind-carved ridges in others — and treating "Inuit navigation" as one system misrepresents knowledge that differs by community as much as by subject. The reports of a changed prevailing wind come from oral testimony and from the press coverage of it rather than from a published meteorological series, and the explanations offered for the change differ sharply between elders' accounts and climatological ones; the fact of the hunters' adjustment is better evidenced than any account of its cause.  
> **Sources:** Bennett and Rowley, eds., *Uqalurait: An Oral History of Nunavut* (2004); MacDonald, *The Arctic Sky* (1998); Aporta, "The Trail as Home: Inuit and Their Pan-Arctic Network of Routes," *Human Ecology* 37 (2009).

_Do not restate this claim in the handbook without its label, its uncertainty and its sources._

## FEYNMAN IT
Three lines of position leave a small gap between them rather than meeting. Explain what that gap does and does not tell the navigator, and what they should do about an error that falls the same way every time.

Banned words: **average**, **accurate**, **triangle**

**A good explanation contains**
- It says the gap measures how well the bearings agree with each other, not how right they are.
- It does not claim that a small gap means a good position.
- It distinguishes an error that falls differently each time from one that falls the same way.
- It gives a remedy for the second kind that is about where the landmarks are, not about taking more care.

## CHALLENGE IT
*The Editor:* A prediction, and a question about what honest doubt is worth.

**Two navigators fix their position from three bearings at the same spot. One gets a tight little triangle twenty yards a side; the other gets a sprawling one a hundred yards a side. Whose fix is closer to the truth?**

- _You cannot tell — and the second one has been told more about their own uncertainty._  
  Right on both counts, and the second clause is the useful one. Over twenty thousand simulated sets on this sheet the relation between the size of the triangle and the actual miss is weak: a fifteen-yard triangle forty yards out, a hundred-and-twenty-yard triangle forty-five yards out. What the sprawling triangle does give its owner is an honest warning, which the tight one withholds — and if the tight triangle came from three landmarks all in one direction, it is actively misleading.

- _The tight one — less disagreement between the lines means a better position._  
  This is what almost everyone says, and it is what a good many handbooks print, and it confuses two different quantities. Agreement between your own measurements is precision; closeness to the truth is accuracy. Three bearings taken with a compass whose declination is set wrong will agree beautifully with each other and be wrong together — a 57-yard triangle sitting 81 yards from the truth, which the simulation will show you on demand.

- _The sprawling one — a big triangle means they took bearings to objects well spread around them._  
  There is something in this and it is not reliable. A well-spread set of landmarks does tend to produce a larger triangle for the same quality of bearings, and it is also the arrangement that cancels a systematic error — on this sheet, 11 yards out instead of 81. So a big triangle is weak evidence of a good arrangement. But a big triangle can equally mean one badly mis-sighted bearing, which is a different thing entirely and much worse.

**A third bearing costs almost nothing. Why does anybody take only two?**

Because two is enough to get an answer, and an answer that comes with no comment attached is more comfortable than one that comes with a measured warning. That is not laziness so much as a preference, and it is worth naming in yourself: a third bearing cannot make your position better, it can only tell you how bad it might be. Many people would rather not know.

There is also a real reason. On a moving boat the three bearings are taken at three different times from three different places, so the triangle contains your own movement as well as your error, and separating the two needs the transferred line of Lesson 25. On land, standing still, there is no excuse.

_Links across to:_ Navigation, Lesson 7 — true north and magnetic north (`navigation/lesson-07`)

## REFLECT
Think of something you are confident about because your sources agree with each other. Write down where those sources got their information, and whether it was the same place.

_Tomorrow: distance. Five weeks of angles, and you have still never measured how far you walked — which turns out to be the weaker of the two measurements and the one you cannot take twice._

## "I don't get it" — 7 ways in

### Explain it with a compass
Your compass has two quite separate ways of lying to you. It can wobble — you read 047 and then 044 on the same mast, because your hand moved and your eye estimated. And it can lean — every reading two degrees high, because the declination is set for the wrong year or there is iron in your pocket. The cocked hat is built entirely out of three readings from that one compass, so it can see the wobble and is blind to the lean. Nothing a single instrument tells you about itself can catch a fault the instrument has consistently.

### Explain it with a map
Draw the three lines and shade, in your mind, the little triangle. Now shade the three regions just outside it, each one tucked against a side. You are in the triangle in two of the eight ways the three errors can fall, and in those outer regions the rest of the time — and the outer regions have no boundary on their far side. That asymmetry is the whole result: the triangle is a small bounded thing, and the place you actually are is drawn from a much larger unbounded one.

### Use an everyday object
Lay three drinking straws on a table so they make a small triangle, and put a coin where you believe the centre is. Now slide any one straw sideways, keeping it parallel — the triangle changes shape and the coin is suddenly outside it. Try to slide the straws so that the triangle is tiny AND the coin is well outside: it is easy, which is the lesson. Then try to slide them so the triangle is tiny and the coin is guaranteed inside: you cannot, without already knowing where the coin is.

### Show me a diagram
The simulation shades the triangle green when it holds the true position and red when it does not, and keeps a tally. Watch the tally rather than the triangle. Then take the error slider down to half a degree: the triangle becomes a dot, the fix is good to a few yards, and the tally goes on reading about one in four. That stubborn fraction, unmoved by the thing you would expect to move it, is the clearest evidence that the triangle is not a container for your position.

### Walk me through an example
Three bearings, each exactly two degrees high because the declination was applied the wrong way round. To the fire tower, Beaver Pond and Hollow Rock — all in front of you, spread over about 155° of the horizon. The three lines leave a triangle 57 yards a side, which looks like good work, and the middle of it is 81 yards from where you stand. Now take the same bearings, with the same error, to Beaver Pond, Hollow Rock and the old quarry, which surround you more nearly. The triangle doubles to 108 yards — and the fix is 11 yards out. Worse-looking, seven times better.

### Break it into smaller steps
Ask three separate questions and do not let them run together. First: how much do my three lines disagree? That is the size of the hat, and it is a real measurement of my own precision. Second: does that tell me how far I am from the truth? Only weakly — the measured relation is loose. Third: is there an error all three of my bearings share? The hat cannot answer this one at all, and the only thing that helps is having taken the bearings to objects on opposite sides of me.

### Work backward from the answer
Suppose the triangle did reliably contain your position. Then its size would be an upper bound on your error, and you could shrink the bound by working more carefully — error as something you could buy your way out of. Now notice that the only information in the triangle came from three readings of one instrument. For the triangle to bound your error, the instrument would have to be able to detect its own consistent faults, which nothing can. So the triangle cannot be a bound, and the one-in-four is not a surprise: it is what had to be true.

## Understanding Map after this lesson
| Concept | Level (0–5) |
|---|---|
| The cocked hat | 4 |
| Precision and accuracy | 4 |
| Systematic vs careless error | 5 |
| Resection | 5 |
| Line of position | 5 |
| Cut angle | 5 |
| Magnetic and true | 5 |
| Knowing a method's limits | 5 |
| Position | 5 |
| Plotting on a map | 4 |
| Declination | 5 |
