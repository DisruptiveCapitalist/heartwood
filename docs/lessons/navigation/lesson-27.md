# The Art and Science of Navigation — Lesson 27: When the instruments fail
> Week 6 of 8 · Putting It Together · lesson 2 of 5 this week  
> Concept: **Aiming off, and keeping the sign**  
> Lesson completes when: **the Feynman explanation is submitted**

_Opening question._ The battery is flat and the cloud is down. You have a map, a compass and your legs — and the most useful thing you know is how to aim at the wrong place on purpose.

## SEE IT
*The Professor:* A footbridge twelve hundred yards away across open moor, and a course you can hold to about three degrees — which is a realistic figure for walking, not for reading a compass on a table. Start with AIM STRAIGHT AT IT.

**On-screen simulation:** `voyage` ({"mode":"aim"})

**What it shows.** A walk across open ground to a footbridge on a stream. The stream runs across the top of the picture, the start point is at the bottom, the intended line to the bridge is dotted and the line actually aimed along is solid, and the cone of possible arrivals is shaded between them. A hundred and sixty walks are drawn as dots along the stream, coloured by whether they landed on the side that was chosen or the other one.

**What the learner can change.** The deliberate offset from −16° to +16°, how well a course can be held from 1° to 6°, and how far away the stream is from 400 to 2,000 yards. Two presets: aim straight at the bridge, and aim off by the amount that makes the side 99 per cent certain for the current error.

**The numbers behind it.** Walking 1,200 yards with three degrees of course-holding error: aiming straight gives a mean miss of 50 yards and 104 yards at the ninety-fifth percentile, on a side that is a coin toss, with 208 yards of stream to search if the first guess is wrong. Aiming off seven degrees makes the side certain 99.0 per cent of the time, asks for a mean walk of 148 yards along the bank — and costs eleven yards of extra walking on the leg itself, because the hypotenuse of a long thin triangle is barely longer than its long side. Seven degrees is 2.33 sigma, which is where the normal table puts 99 per cent, and it is the arithmetic behind the rule of thumb "aim off by about two and a half times your error". The technique does not save walking: at every error size the aimed-off walk along the stream is longer than the straight-ahead miss, and the test suite asserts that rather than hoping nobody checks.

> _For the handbook:_ Chapter 31 should give aiming off a number rather than a recommendation, and the number is the eleven yards — a reader who knows the detour is nearly free will use the technique, and a reader who merely knows it is wise will not. The figure wants the dots, two-coloured, rather than a single arrow: the point is not that the arrivals move but that they all become the same colour. The chapter should state plainly what the technique does not do, which is reduce the distance walked, and name the condition it needs, which is a catching feature that runs well beyond the offset — the commonest failure is aiming off past the end of a wall. The emergency sequence in the chapter should keep its first item: at three degrees and a five per cent pace, every mile walked while unsure adds about 130 yards to the circle you could be in, so stopping is not caution but arithmetic.

> **Field Guide — Chapter 31: Emergency Navigation.** Pick a footbridge, gate or stile on a stream, track or wall that you can find on the map, and a starting point some distance away with open ground between. First walk at it directly, and when you reach the feature stop and note which way you have to turn and how far — and be honest about whether you could have known that without looking. Then go back and do it again, this time aiming deliberately ten degrees to one side. When you meet the feature you will not need to wonder: turn the way you aimed off and walk until you arrive. Note how much further you actually walked. It will be less than you expect.

**What the learner should notice**
- Aim at the bridge and you do not do badly: a mean miss of **50 yards**, and **104 yards** nineteen times in twenty. But every dot is red, and that is the whole trouble. They straddle the bridge, half to one side and half to the other, and not one of them knows which half it is in — so when you are standing on that bank in the rain, neither do you. The stretch of stream you may have to search is **208 yards**.
- Now press the other preset — **aim off seven degrees**. The dots move bodily to one side and turn green: **99.0%** of them, which is what two and a third standard deviations buys you. The spread has not changed by a hair. What has changed is that all of it is now on one side of the bridge, so you arrive knowing without question which way to turn, walk a mean **148 yards** along the bank, and meet it.
- And now the number that makes it worth teaching. Watch the third readout: aiming seven degrees off a twelve-hundred-yard leg costs **eleven yards** of extra walking. Eleven. The long way round a very long thin triangle is almost exactly as long as the short way, so certainty of which side you are on is nearly free — and it is the only thing in this course that is.

## UNDERSTAND IT
*The Professor:* Three sentences about being lost, and the first one is about arithmetic rather than courage.

**The three sentences**
1. **An error has a size and a sign, and it is losing the sign that leaves you helpless.** Fifty yards from the bridge is nothing; fifty yards from the bridge on an unknown side is a search. If you know you are short of it you walk on; if you know you are left of it you turn right. You can act on a large error whose direction you know and you cannot act on a small one whose direction you do not, which is why the practical question in the field is never "how accurate am I?" but "which way am I wrong?".
2. **So aim at something you cannot miss, and aim deliberately to one side of the thing you want.** The stream, the wall, the track, the ridge — anything long and unmistakable is a **catching feature**, and a course aimed at it cannot fail, because the feature is a line and your error is a point on it. Aim at the bridge itself and you are aiming at a point, which you will miss by a coin toss. Aim ten degrees upstream of it and you arrive on the bank certain of your direction, with a known walk ahead of you — and the extra ground is a handful of yards, because the detour is along the hypotenuse of a triangle so thin it hardly exists.
3. And **when you are genuinely unsure where you are, stop, because walking makes it worse at a measurable rate.** At three degrees of course-holding and a five per cent pace, every mile you walk adds about a hundred and thirty yards to the circle you could be in — and a mile takes twenty minutes, so uncertainty grows faster than daylight disappears. The instruction is not "stay calm", which nobody can act on. It is: sit down, write down the last place you were certain of and the time, work out what you have done since, and then choose one catching feature and aim off for it.

### THE DARK LANDING AND THE LIGHT SWITCH
You come home late and the hall is black, and you want the light switch. Walk at where you think it is, hand out, and you touch cold wall somewhere near it with no idea whether to feel left or right — so you pat about, and sometimes you find the switch and sometimes you find a picture frame. What you actually do, and have always done, is put your hand on the door frame first, because the door frame is a thing you cannot miss and the switch is a known distance from it in a known direction. You aim at the big unmistakable thing and walk along to the small one. That is the whole of this lesson, performed nightly, in the dark, without instruction.

The orienteering world has had names for these for a century, and they are worth having because they turn a vague intention into a plan. A **handrail** is a long feature you walk *along* because it keeps you honest — a wall, a stream, a forest edge, a contour. A **catching feature** is a long feature you walk *at*, placed beyond your target, so that meeting it tells you you have gone far enough. An **attack point** is a small thing you can positively identify close to your objective, from which the last short leg can be taken precisely. And **aiming off** is today's trick: steering deliberately to one side of the objective so that the side on which you meet the catching feature is known rather than guessed. The emergency version of all of this has its own name — the Field Guide's Chapter 31 is blunt about the first step and so is every mountain rescue team: **stop**. Sit down, eat something, and do not spend the next mile making the circle bigger.

### The formal names
| Term | Meaning |
|---|---|
| **Aiming off** | Steering deliberately to one side of your objective, by more than the error you expect, so that the side you arrive on is certain. Costs a few yards and removes a coin toss. |
| **Catching feature** | A long, unmistakable feature beyond or beside the objective. You cannot miss a line, and it converts "where am I?" into "how far along am I?". |
| **Handrail** | A long feature you follow instead of holding a bearing. Slower and often longer, and it cannot accumulate error. |
| **Attack point** | The last positively identified feature before the objective. Navigate carelessly to it and carefully from it — the leg that must be accurate should be the shortest one. |
| **Deliberate offset** | The same idea at sea, where it is also called making a landfall to one side and then running down the latitude. See the card below. |
| **Relocation** | The procedure for when you have lost your position: stop, fix the last certain point and time, reconstruct what you have done since, and choose a catching feature. Not a synonym for walking about looking for a signpost. |

## CONNECT IT
*The Roommate:* Where else do you deliberately go to the wrong place because it is easier to finish from there?

**Where it shows up**
- Finding the light switch by starting at the door frame.
- Overfilling the kettle rather than risk it boiling dry.
- Parking at the far end of the car park, where you know there are spaces.
- Arriving at the station twenty minutes early.
- Cutting a shelf long, then trimming it to fit.
- Throwing a ball to where someone is going to be.

The shelf is the exact relative, and any joiner will tell you the rule: cut it long, because you can take wood off and you cannot put it back. That is aiming off. A short shelf and a long shelf are both the wrong length, and only one of them can be fixed — so you choose which way to be wrong before you start, and you make sure you are wrong in the direction that still has a move in it. Arriving early at the station is the same bargain measured in minutes, and the twenty minutes is the eleven yards.

_On screen it sits here — directly under the items — and appears only once the learner has ticked two of the items above or written one of their own._

### The Builder — try it yourself
Go and do it twice, and the second time will feel like cheating. Choose a bridge or gate on a stream or track that you can find on the map, and a start point six or eight hundred paces away with open ground between. Walk at the gate directly. When you meet the stream, before you look around, write down which way you think you must turn — then look. Now go back and walk it again, this time aiming ten degrees to one side, and notice that there is nothing to decide when you arrive. Count your paces both times. The second walk is longer by a number so small you will suspect you miscounted.

### Across cultures — THE ATLANTIC AND THE INDIAN OCEAN, 15TH CENTURY ONWARD
**Evidence label: WELL DOCUMENTED**

Aiming off is older and larger than the moor. For three centuries every ocean navigator faced Lesson 26's asymmetry — latitude knowable, longitude not — and the standard answer was to turn the unknown quantity into a known walk. You did not steer for your destination. You steered for its **parallel**, deliberately well to one side of it in longitude, and when your noon sight told you that you were on the right latitude you turned and ran along it until land appeared. The practice is called **latitude sailing**, or running down the latitude, and the East–West leg was called running down a westing or an easting.

Columbus sailed this way in 1492 and da Gama in 1498, and the method persisted until chronometers made it unnecessary. It has exactly the shape of the footbridge: the parallel is the catching feature, the deliberate error in longitude is the offset, and the price is paid in extra sea miles rather than in doubt. The price could be heavy — the latitude line is rarely the shortest or the best-winded route, and voyages were lengthened by days or weeks, with scurvy waiting at the end of the extra time. That is the same trade as the eleven yards, scaled up until it kills people, and navigators went on making it because the alternative was not knowing which way to turn.

> **What remains uncertain:** The European practice is well documented; the same technique is often asserted with equal confidence for Norse and for Pacific voyaging, and the evidence there is thinner and of a different kind — inference from sailing directions and from oral tradition rather than from logs. The specific courses Columbus steered are reconstructed from a transcribed abstract of his journal and are argued over in detail. And the generalisation that *every* tradition aimed off deliberately should be resisted: it is a sensible response to an unknown longitude, which makes it easy to assume and hard to demonstrate.  
> **Sources:** Taylor, *The Haven-Finding Art: A History of Navigation from Odysseus to Captain Cook* (1956); Morison, *Admiral of the Ocean Sea* (1942); Lewis, *We, the Navigators* (1972).

_Do not restate this claim in the handbook without its label, its uncertainty and its sources._

## FEYNMAN IT
Explain why walking towards the wrong place can get you to the right place faster than walking towards the right place — and what the ground has to look like for it to work at all.

Banned words: **offset**, **deliberately**, **sideways**

**A good explanation contains**
- It says what goes wrong when you walk at a small target and miss.
- It names the kind of feature the method needs, and why a line is different from a point.
- It explains what you know on arrival that you would not have known otherwise.
- It says, at least roughly, how far to one side is enough.

## CHALLENGE IT
*The Editor:* A question designed to catch the version of this that people half-remember.

**You are heading for a gate in a long stone wall, a mile off, in mist. You can hold a course to about four degrees. Someone suggests aiming twelve degrees to the left of the gate. What is wrong with that suggestion?**

- _Nothing much — twelve degrees is about three times four, which is what you want._  
  Right, and the arithmetic is worth having explicitly. You want the offset to exceed your likely error by enough that landing on the wrong side is rare, and the normal table says two and a third times gets you to ninety-nine per cent — so for four degrees of error, nine or ten degrees is plenty and twelve is comfortable. The cost of the extra is almost nothing on the leg itself: twelve degrees on a mile is about thirty-nine yards of extra walking. What it does cost is the walk along the wall, which at twelve degrees on a mile is around three hundred and seventy yards — so the sensible objection to twelve is not that it is wrong but that eight would have done and saved you a hundred yards of wall.

- _Twelve degrees will take you so far along the wall that you will not know whether you are left of the gate or past the end of the wall._  
  This is the right worry about the wrong number, and it is the question the method actually turns on: how long is your catching feature? Aiming off only works while the feature extends well beyond your offset, and a wall with an end — or a stream that bends away, or a track that forks — can be overshot, at which point you have arrived nowhere and know nothing. Twelve degrees on a mile puts you about three hundred and seventy yards along the wall, so the test is whether the wall runs that far in that direction. If it does not, aim off less, or pick a longer feature.

- _You should aim off to the side the gate is nearest, so you have less distance to walk._  
  This reverses the logic, and it is the commonest way the technique gets ruined. The point of aiming off is that the side is certain, and the side is only certain if the offset is bigger than the error. Choosing the near side means choosing a small offset, which means a real chance of landing on the far side after all — and then you walk away from the gate, confident and wrong. Choose the side for a reason, by all means: pick the one where the feature runs further, or the ground is easier, or the walk is downhill. But choose it and then commit to an offset big enough to guarantee it.

**Aiming off needs a line you cannot miss. What do you do in country that has not got one?**

You build the day out of the lines that do exist, which is tomorrow's lesson. Most country has more of them than it looks: a stream, a track, a forest edge, a ridge, a wall, a power line, a change of vegetation, a contour you can follow. The planning skill is to see a route not as a line from A to B but as a chain of features you can aim at, with the short careful legs placed where they matter and the long careless ones where they do not.

And where there is genuinely nothing — open desert, snowfield, sea — then you are back to Lesson 24 and the plot, and the honest thing to do is accept that the circle is growing and decide in advance how big you will let it get before you stop. That decision, made with a pencil before you set out, is what Lesson 29 calls an error budget, and it is the difference between a plan and a hope.

_Links across to:_ Navigation, Lesson 24 — dead reckoning (`navigation/lesson-24`)

## REFLECT
Write about a time you were lost — properly unsure, not briefly confused. What did you do first? And knowing what you know now, what would you have done instead?

_Tomorrow there are no instruments at all, and there never were. Twenty-six lessons have had one tradition each in the margin; tomorrow they come together, and the thing they all have in common is the thing Lesson 26 measured._

## "I don't get it" — 7 ways in

### Explain it with a compass
Set your compass to the bearing of the gate and then, before you start walking, turn the dial ten degrees. That is the whole technique, and it is one movement of your thumb. What matters is which way you turn it, and that you write down which way, because in forty minutes' time in the mist you will have to remember. The compass is doing exactly what it did in Lesson 9 — holding one direction — and all that has changed is that the direction you have asked it for is deliberately not the direction of the thing you want.

### Explain it with a map
Look at the map and stop looking for your destination. Look instead for the longest unmistakable line anywhere near it — a stream, a wall, a forest edge, a track, a steep break in the contours — and find the one that lies across your path beyond the thing you want. Now draw your course not to the gate but to a point on that line a good way to one side of it. You have converted a problem with two unknowns, how far and how far off, into a problem with one: how far along. A map read this way stops being a picture of where things are and becomes a list of things you cannot miss.

### Use an everyday object
Stand in a doorway, shut your eyes, and try to put a finger on the light switch. You will touch the wall somewhere near it and have to feel about, and sometimes you will be left and sometimes right. Now do it again but put your hand on the door frame first and slide along. You arrive every time, and you arrive without deciding anything. The door frame is the catching feature and the slide is the walk along the stream. Everyone already does this in the dark and nobody does it with a compass in daylight, which is odd, because the compass case is the one where you cannot feel about.

### Show me a diagram
The picture to read is the dots. With the offset at zero every one of them is red — they straddle the bridge, and the straddling is the problem rather than the spread. Push the offset slider up and watch two things happen at once: the dots move bodily to one side, and they turn green as they cross over. Nothing about the spread has changed; it is exactly as wide as it was. What has changed is that the whole of it has been slid clear of the target, so no part of it is on the wrong side. And look at the third readout while you do it: the cost of sliding it is a number of yards you could walk in ten seconds.

### Walk me through an example
The footbridge bears 047° and the map says it is twelve hundred yards. You know from experience that over that distance in rough going you hold a course to about three degrees. Three times two and a third is seven, so you set 040° — seven degrees to the left, which puts you upstream of the bridge — and you write "LEFT, 7" on your hand. You walk eleven hundred paces and meet the stream. You do not look around, you do not deliberate: you turn right and walk downstream, and in about a hundred and fifty yards there is the bridge. Had you set 047° you would have arrived within fifty yards of it and spent ten minutes finding out which fifty.

### Break it into smaller steps
Five steps, and the first is the one people skip. One: find the line you cannot miss, beyond or beside your objective. Two: decide how well you can hold a course today — in rough ground, tired, three or four degrees, not one. Three: multiply by about two and a half and turn your bearing that much to one side, choosing the side where the feature runs furthest. Four: write down which side. Five: walk, and when you meet the feature, turn the way you wrote down and keep walking until the objective appears.

### Work backward from the answer
Start at the end: you are standing on the bank of the stream and you want to be at the bridge. There are only two possible situations. Either you know which way the bridge is, in which case you simply walk there and the job is done; or you do not, in which case you must search, and a search is the expensive thing — it can cost you twice the distance and all of your confidence. So the entire question is how to arrive in the first situation rather than the second. And the only way to be sure which side of something you are on is to have aimed far enough to one side of it that your error could not have crossed over. Everything else in the lesson is that sentence with numbers on it.

## Understanding Map after this lesson
| Concept | Level (0–5) |
|---|---|
| Aiming off | 4 |
| Catching features and handrails | 4 |
| Attack point | 3 |
| Relocation | 3 |
| Random and systematic error | 5 |
| Dead reckoning | 5 |
| Pace counting | 5 |
| Following a bearing | 5 |
| Longitude | 5 |
| Carrying the time | 4 |
| Knowing a method's limits | 5 |
