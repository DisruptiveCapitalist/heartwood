# The Art and Science of Navigation — Lesson 30: The Heartwood Navigation Challenge
> Week 6 of 7 · Putting It Together · lesson 5 of 5 this week  
> Concept: **Judging evidence that disagrees**  
> Lesson completes when: **the Feynman explanation is submitted**

_Opening question._ Four measurements. None of them obviously wrong, no two of them quite agreeing, and no way to look up the answer. Which one do you stop believing?

## SEE IT
*The Professor:* You left the fire tower for Beaver Pond and drifted south of the line. Three bearings, one pace count, and they disagree. Begin on TRUST ALL FOUR.

**On-screen simulation:** `voyage` ({"mode":"challenge"})

**What it shows.** The same day's plan, with the walker somewhere between the fire tower and Beaver Pond and four pieces of evidence drawn on it: three bearings as lines radiating from the fire tower, the old quarry and Beaver Pond, and a pace count from the tower as an arc. The true position and the best-fitting answer are both marked, and a magnified window shows the hundred-yard region where the whole argument happens, since that is ten pixels at plan scale.

**What the learner can change.** Which of the four measurements to throw away — or to trust all four. Five settings in all, and the evidence discarded is greyed rather than removed, so the learner can see what it was saying.

**The numbers behind it.** The three bearings carry +1.5°, −1.0° and +2.0°, which is Week 2's honest figure; the pace count is twelve per cent long, which is Lesson 23's honest figure for a stride on broken ground, and on a 1,003-yard run that is 120 yards. The five answers, in yards from the truth, with how well each set fits itself in brackets: all four 87 (30), discard the tower bearing 81 (33), discard the pond bearing 86 (32), discard the quarry bearing 123 (1), discard the pace count 58 (21). Discarding the counted measurement is measurably the best of the five, and the set that fits itself to within one yard is the worst — because two lines and a circle will always pass through a point, so a tiny residual there means there was no spare evidence left to object.

> _For the handbook:_ Exercise F is the most valuable exercise in Chapter 30 and the hardest to write, because its answer is a judgement. The two things it should teach are both measurable and both counter-intuitive. First: a measurement that is biased will disagree with ones that merely scatter, so one counted number against three sighted ones is the signature of a bias, and a bias cannot be averaged away. Second, and this is the chapter's chance to say something a reader will use for the rest of their life: a residual measures how well evidence agrees with itself and says nothing about whether it is right, and a perfect fit from barely enough evidence is the least informative result there is. The worksheet should have a column for "which measurement do you expect to let you down, and why", filled in BEFORE the plotting — the habit of predicting the weak measurement is what actually improves with practice.

> **Field Guide — Chapter 30: The Natural Navigation Laboratory.** This is Chapter 30's Exercise F, and it is the one worth doing properly. Stand somewhere you can identify three features on the map, and take a bearing to each — then also measure your distance from one of them, by pacing from a point you can identify or by any other means you have. Plot all four. They will not agree. Now do the thing the exercise asks for: write down, before you decide, which of the four you expect to be the least dependable and why. Then plot the three you trust and see where that puts you. Keep the sheet. The habit of predicting which measurement will let you down is the single most useful thing in this course, and it only develops on paper.

**What the learner should notice**
- Trusting everything puts you **87 yards** from where you actually are, and the four measurements fit each other to **30 yards** — which is what disagreement looks like when nothing is badly wrong and nothing is quite right. The arc from the fire tower is the odd one: your pace count says 1,124 yards and the truth is 1,003, so it is **120 yards long**, which is twelve per cent, which is what broken ground does to a stride.
- Now try all four ways of throwing one measurement out. Discarding a bearing changes almost nothing — 81 yards, 86 yards. **Discarding the pace count gives 58**, the best of the five. That is not an opinion: it is the smallest of five measured numbers, and the reason it wins is Lesson 22's. A bearing wobbles either way; a pace count is wrong the *same* way every time. One counted measurement against three sighted ones is the signature of a bias.
- And now the trap, which is the last thing this course has to teach you. Discard the **quarry** bearing and look at the two readouts together: the three remaining measurements fit each other to **one yard** — an immaculate, beautiful agreement — and the answer is **123 yards out**, the worst of the five. Two lines and a circle will always pass through a point. The tidiness was not accuracy. It was running out of evidence to argue with.

## UNDERSTAND IT
*The Professor:* Three sentences to close the course, and the third one is the one I would keep if I could keep only one.

**The three sentences**
1. **When measurements disagree, the disagreement is itself a measurement — and it is often the most valuable one you have.** Three bearings that cross in a tight little triangle are telling you something about your compass work; the same three leaving a sprawl are telling you that something is wrong and you should find out what before you walk anywhere. The learner's instinct is to feel bad about the sprawl. The navigator's instinct is to read it: how big is it, which measurement is furthest from the others, and is the odd one out the kind of measurement that goes wrong in one direction?
2. **A measurement that is biased will disagree with ones that merely wobble, and that is how you identify it.** Three bearings taken with the same compass in the same five minutes each carry an independent couple of degrees — they scatter round the truth. A pace count carries a bias: your stride on this ground is what it is, and the count is long by twelve per cent every single time you do it. So when one counted number disagrees with three sighted ones, the suspicion falls on the counted one, and you check it rather than average it. Averaging a bias with three unbiased numbers does not remove it; it just shares it out.
3. And **how well your evidence agrees with itself tells you nothing at all about whether it is right.** This is the hardest idea in the course and the most generally useful one. Two lines and a circle pass through a point exactly — there is no spare evidence, so there is nothing to disagree, so the residual is zero and the answer in this case is 123 yards out. You only find out that a measurement is bad because something *else* contradicts it, which means the power to detect error comes entirely from having more evidence than you strictly need. The fourth measurement is not there to make the answer more accurate. It is there to tell you when one of the other three is lying.

### THE CROSSWORD WITH NOT ENOUGH CROSSINGS
You fill in a long across clue and it feels right. Now: if none of its letters is crossed by a down clue, you will never find out that it is wrong — the grid accepts it, everything is consistent, and you will finish the puzzle happily and incorrectly. If four of its letters are checked, a wrong answer clashes almost immediately and you know to think again. The crossword's power to catch you out is not in the clues; it is in the crossings. That is exactly what the fourth bearing is, and it is why a navigator takes three when two would place them: not for a better answer, but for the chance of being told off.

The spare evidence has a name — **redundancy** — and the general principle is that error can only be detected where there is more information than the answer strictly requires. The amount of spare is the number of **degrees of freedom**: three bearings for a two-coordinate position leaves one, which is why they draw a triangle instead of meeting at a point. What is left over after the best fit is the **residual**, and the thing to engrave somewhere is that a residual measures consistency and not accuracy. A single measurement wildly out of keeping with the others is an **outlier**, and surveyors distinguish an ordinary error, which every measurement has, from a **blunder** — a wrong landmark identified, a figure written down backwards, a bearing taken from the wrong end of the needle — which no amount of care in the other measurements will fix and which only redundancy can catch. Nothing in this paragraph is special to navigation, which is rather the point: you have spent six weeks learning the general theory of trusting evidence, and it happened to be taught with a compass.

### The formal names
| Term | Meaning |
|---|---|
| **Redundancy** | Having more measurements than the answer needs. The only source of your ability to detect that something is wrong. |
| **Degrees of freedom** | How many spare measurements you have. Two bearings for a position: none, and no warning. Three: one, and a triangle that tells you something. |
| **Residual** | What is left over after the best fit — how well the evidence agrees with itself. Not a measure of accuracy, and a small one can be the worst sign of all. |
| **Outlier** | The measurement that disagrees with the rest. Worth investigating rather than deleting: it may be the only honest one. |
| **Blunder** | Not an error but a mistake — the wrong hill identified, 068 written for 086. Unlike an error it has no distribution and no average, and only redundancy finds it. |
| **Weighting** | Trusting some evidence more than the rest, on purpose and for a stated reason. A bearing to a sharp summit a mile off deserves more weight than one to the middle of a wide wood. |
| **Gross error detection** | The formal name for what this lesson does by hand: fit, look at the residuals, suspect the odd one, refit without it, and see whether the answer improves. |

## CONNECT IT
*The Roommate:* Last one. Where do you decide which of several things to believe, when they do not agree?

**Where it shows up**
- Two clocks in the house showing different times.
- The recipe's cooking time against what the thing looks like.
- Three people's accounts of the same argument.
- A review saying five stars and a review saying one.
- The bathroom scales, read twice, giving two numbers.
- A map that disagrees with the signpost in front of you.

Three accounts of the same argument is the one that teaches the most, because you already know how to read it, and what you do is not average them. You look for the thing all three agree on and treat it as settled; you notice where one of them differs and you ask *why that person* would differ there — what they could see, what they wanted. That is weighting, and it is exactly what a navigator does with a bearing to a distant hilltop and a bearing to the vague middle of a wood. And if all three accounts match perfectly, word for word, you do not conclude that you have the truth. You conclude that they have been talking to each other.

_On screen it sits here — directly under the items — and appears only once the learner has ticked two of the items above or written one of their own._

### The Builder — try it yourself
The last challenge of the course, and it takes an afternoon. Walk out to a place you can identify on the map but do NOT look at where it is on the map — have someone else choose it, or pick it from the ground. Now recover your position from scratch: three bearings to three identified features, plus one distance, measured however you like. Plot all four and look at the mess. Write down which you distrust and why, before you look anything up. Plot your best answer, mark it, and then — only then — find the place on the map and measure how far out you were. Write both numbers in your journal: how far out you were, and whether the measurement you distrusted was the one that deserved it. The second number is the one that improves with practice.

### Across cultures — THE ISLES OF SCILLY, 22 OCTOBER 1707
**Evidence label: MODERN INTERPRETATION**

The best-known navigation disaster in English history is usually told as a longitude story: a fleet returning from the Mediterranean, unable to know how far east it had come, running onto the rocks of the Scillies in the dark with the loss of four ships and Admiral Sir Cloudesley Shovell. It is the story that opens most accounts of the longitude prize, and the prize did follow within seven years. But the evidence that survives does not support a single clean cause, and the careful reconstructions of the voyage from the logs that remain read much more like this lesson than like Lesson 26.

What the surviving logs show is a fleet whose evidence disagreed. The weather had cleared enough for at least some latitude observations, so the fleet was not wholly blind; the charts and pilot books of the period placed the Scillies wrongly, by several miles in some editions; the compasses aboard were in poor condition; and after the last noon sight the position was carried forward by dead reckoning, with all of Week 5's consequences. Several ships' navigators disagreed with each other about where the fleet was, and the one that survived made a different judgement from the ones that did not. That is a lesson about weighing conflicting measurements — including the measurement printed on the chart — rather than about a missing number.

> **What remains uncertain:** A great deal here is irrecoverable and some of it is actively disputed. The log of the Association, Shovell's flagship, is lost, so what he himself believed is unknown; the death toll is given as anything from about 1,400 to over 2,000; and the degree to which latitude was or was not available that day is argued from a small number of surviving logs. The reading above — that the disaster was multi-causal and that the pure-longitude version is a simplification — is the direction modern scholarship has taken rather than a settled finding, which is why this card is labelled an interpretation. The frequently repeated figure of eight miles for the chart's misplacement of the islands comes from press reporting of a chart sale and should not be treated as a measurement. And the familiar story of a sailor hanged for warning the admiral is folklore with no contemporary support.  
> **Sources:** May, "The Last Voyage of Sir Clowdisley Shovell", *Journal of the Institute of Navigation* 13 (1960); Sobel, *Longitude* (1995).

_Do not restate this claim in the handbook without its label, its uncertainty and its sources._

## FEYNMAN IT
You have four measurements of where you are and they disagree. Explain how to decide which to stop believing — and why the set of measurements that agree most beautifully with each other is not necessarily the one to trust.

Banned words: **average**, **mistake**, **obviously**

**A good explanation contains**
- It says what disagreement between measurements tells you.
- It distinguishes a measurement that is out the same way every time from one that scatters.
- It explains why having more evidence than you need is what lets you spot a bad piece.
- It says why a very neat fit can be a warning rather than a reassurance.

## CHALLENGE IT
*The Editor:* The last question of the course, and it is the trap, straight out.

**Of the five possible answers, one fits its own evidence to within a single yard and the others to twenty or thirty. Which answer should you take?**

- _Not that one — take the one that discards the counted distance, which fits to twenty-one yards._  
  Right, and it is 58 yards from the truth against the tidy one's 123 — more than twice as good while looking half as convincing. The reasoning has two parts and both are worth keeping. First, the counted measurement is the one that can be biased, and a bias is precisely what a bearing cannot cancel. Second, and more importantly, the one-yard fit is not evidence of anything: it is what you get when two lines and a circle are left to pass through a point, with no spare measurement to object. The lesson is that a residual is a statement about your evidence and not about the ground.

- _The one that fits to a yard — a near-perfect fit is the strongest evidence available._  
  It is the natural answer, it is what the numbers appear to say, and it is 123 yards out, which is the worst of the five. Here is what went wrong. Three pieces of evidence determining two coordinates leave one piece spare, and that spare piece is the only thing capable of telling you something is amiss. Throw away one of the three bearings and you are left with two lines and a circle — three shapes, two unknowns, and in this geometry they happen to be able to meet at a single point whatever the measurements say. The residual collapsed to a yard not because the answer got better but because the evidence lost its power to complain. A perfect fit from barely enough evidence is the least informative result there is.

- _There is no way to tell from the inside — you would need to know the truth already._  
  This is the respectable sceptical position and it is wrong in a specific, useful way. You cannot measure your error from the inside, true: only the simulation can print 58 and 123, because only the simulation knows where you are. But you can absolutely reason about WHICH kind of measurement is likely to be biased, and that reasoning needs no privileged knowledge — you know that your stride shortens on broken ground, you know that your bearings scatter either way, and you know that one counted number against three sighted ones is the shape of a bias. Being unable to measure your error is not the same as being unable to judge your evidence, and the whole of this course has been about the difference.

**Thirty lessons. If you had to give someone one sentence of it, what would you give them?**

Mine is this: a position is not a point, it is a region, and the whole skill is knowing how big yours is. Everything in six weeks has been a way of making that region smaller or of finding out how big it already is — two bearings instead of one, a square cut instead of a shallow one, three landmarks spread round you instead of bunched in front, a fix placed late in the day instead of early, a catching feature instead of a point, a clock that keeps its rate, and a fourth measurement whose only job is to tell you when one of the other three is wrong.

And the second sentence, if you are allowed two: "I don't get it" was the most useful thing in this course and it is also the most useful thing in the field. The navigator who stops and says *I do not actually know where I am* is a hundred yards from safety. The one who keeps walking because it would be embarrassing to admit it is doing what the arithmetic says: adding a hundred and thirty yards to the circle with every mile. Both halves of this course — the knowing and the admitting — are the same skill.

There is a handbook that goes with this, and it has thirty-one chapters and a set of blank worksheets, and the whole of it is now within your reach. Go and stand somewhere unfamiliar. You know how to work out where you are.

_Links across to:_ Navigation, Lesson 22 — the cocked hat (`navigation/lesson-22`)

## REFLECT
Go back to what you wrote in Lesson 1, when you were asked what it means to know where you are. Read it, and then answer the same question again underneath, without looking at it while you write. Then compare the two.

_Tomorrow:_ There is no tomorrow in this course, and that is the point of it: the next lesson is a real morning, real ground, and a position you work out yourself. Take the Field Guide, take a pencil, and go.

## "I don't get it" — 7 ways in

### Explain it with a compass
Your compass gave you three of today's four measurements and your legs gave you the fourth, and that division is the whole decision. Three readings from one instrument in five minutes are three independent samples of the same small random error — they scatter, and the scatter is roughly symmetrical, so they argue with each other honestly. Your stride is not like that at all: on this ground it is what it is, and the count is long by the same twelve per cent every time you take it. The compass can be outvoted. The pace count cannot be, because it only ever casts one vote and it always casts it the same way.

### Explain it with a map
Look at the four shapes on the plan. Three are straight lines radiating from three landmarks, and one is an arc swung from the fire tower. Now notice something about how they fail: the lines all pivot on their landmarks, so a small error moves each line sideways by a little, and the three of them leave a small triangle. The arc fails differently — it moves in or out, bodily, and it is wrong by a hundred and twenty yards in one direction. The picture tells you which measurement is the odd one out before any arithmetic: three shapes are disagreeing politely among themselves and the fourth is standing apart from all three.

### Use an everyday object
Weigh yourself four times in a row. The first three readings differ by a pound either way — that is noise, and the average of them is better than any one. Now stand on the scales with your shoes on. That fourth reading is not noise: it is a pound and a half heavier *every time*, and averaging it in does not fix it, it just makes everything slightly wrong. If you had only taken the shoes-on reading you would never have known. You know because you had three others to compare it with, and that is the only reason you know.

### Show me a diagram
Use the magnified window rather than the plan — a hundred yards is ten pixels at plan scale and the whole argument happens inside it. Step through the five buttons and watch two things that move independently: the cross, which is the answer, and how neatly the shapes cross each other, which is the residual. The two are not linked in the way you expect. On the quarry setting the shapes pass through one point and the cross jumps furthest from the green dot. That is the picture of the lesson, and it is worth looking at for a moment longer than feels necessary.

### Walk me through an example
You left the fire tower for Beaver Pond, counting, and after 1,124 counted yards you stop, not quite sure you are on the line. The tower bears 054, the old quarry 142, the pond 275. You plot the three bearings and they leave a triangle about thirty yards a side — ordinary, unalarming, the Lesson 22 picture. Then you swing an arc of 1,124 yards from the tower and it passes a hundred and twenty yards outside the triangle. Three measurements are arguing about thirty yards and the fourth is a hundred and twenty away from all of them, so you distrust the arc, note that your stride has shortened on this ground, and take the triangle. You are 58 yards out instead of 87, and you have learned something about your pace that will serve you for the rest of the day.

### Break it into smaller steps
Five steps, and they are the formal procedure under a plain name. One: plot everything you have, including the measurement you suspect. Two: look at how well they agree, and at which one sits apart from the others. Three: ask of the odd one whether it is the kind of measurement that goes wrong in one direction — counted, timed, calibrated — or the kind that scatters. Four: if it is the first kind, set it aside, refit, and see whether the answer moves. Five: stop. One discard with a reason is good practice; two is a sign that you need a better measurement rather than a tidier answer.

### Work backward from the answer
Work backwards from the strangest fact in the lesson: one of the five answers fits its own evidence perfectly and is the worst of the five. For that to be possible, a perfect fit must be achievable without being right — so ask when that can happen. It can happen whenever there is just enough evidence to determine the answer and none left over, because then the answer can be chosen to satisfy everything and nothing is left to object. So a perfect fit means one of two things: either your measurements are excellent, or you have not got enough of them to find out. And you can tell which by counting: three shapes for two unknowns is one spare, two is none. The whole of the lesson falls out of that count.

## Understanding Map after this lesson
| Concept | Level (0–5) |
|---|---|
| Redundancy | 4 |
| Residual and consistency | 4 |
| Outliers and blunders | 4 |
| Weighting evidence | 3 |
| Random and systematic error | 5 |
| The cocked hat | 5 |
| Precision and accuracy | 5 |
| Error budget | 5 |
| Absolute and accumulated quantities | 5 |
| Resection | 5 |
| Pace counting | 5 |
| Dead reckoning | 5 |
| Longitude | 5 |
| Position | 5 |
| Knowing a method's limits | 5 |
