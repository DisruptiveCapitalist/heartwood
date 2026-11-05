# The Art and Science of Navigation — Lesson 26: Modern instruments and what they assume
> Week 6 of 8 · Putting It Together · lesson 1 of 5 this week  
> Concept: **Longitude is a clock**  
> Lesson completes when: **the Feynman explanation is submitted**

_Opening question._ Your latitude is an angle you can look up at. Your longitude is an hour you have to carry — and every instrument that ever found it, including the one in your pocket, is a clock.

## SEE IT
*The Professor:* A ship twenty days out from the Canaries, bound for Barbados. Her latitude is measured every clear noon and is right. Her longitude is whatever her clock says it is.

**On-screen simulation:** `voyage` ({"mode":"clock"})

**What it shows.** Two tabs. **A clock at sea** draws a chart of the Atlantic from 10° to 70° west with meridians every five degrees, the parallel being sailed drawn across it as a dashed line, the Canaries and Barbados marked on that parallel, the ship's true position as a green disc, the position the plot gives as a red cross, and the longitude the clock error has bought as a shaded band between them. A warning panel appears when the plot still puts the island ahead and the ship has already passed it. **The same sum, with light** draws three ranging stations with a circle of position round each, at twenty metres to the pixel, which do not meet; a button solves for the clock error and draws the corrected circles meeting at a point.

**What the learner can change.** First tab: the clock's rate from 0 to 30 seconds a day, the days out from 1 to 40, and the latitude of the parallel from 0 to 60 — plus four preset rates, Harrison's H4 at 0.06 s a day, a good chronometer at 3, a house clock at 10 and a pocket watch at 30. Second tab: the receiver's clock error from −1,500 to +1,500 nanoseconds, and a toggle between taking the ranges at their word and solving for the clock.

**The numbers behind it.** Four minutes of clock error is one degree of longitude at every latitude; one second is a quarter of a nautical mile at the Equator and 0.19 at 40° N. On the parallel of 20°, where a degree of longitude is 56.4 miles, a thirty-day run gives 0.4 miles of error for H4's rate, 21 for a good chronometer, 70 for a house clock and 211 for a pocket watch. Harrison's H4 was 5.1 seconds slow after the 1761–62 Jamaica passage, which this arithmetic makes 1.275 minutes of longitude against the contemporary account's 1.25. Light goes 0.2998 m in a nanosecond, so a microsecond is 300 m of range: on the second tab's geometry the three circles then miss each other by 525 m and a two-circle fix is 508 m out, which is more than the range error because the geometry multiplies it. The solver recovers the planted clock error exactly. Relativity figures are published, not modelled: +45 µs a day gravitational, −7 velocity, net +38, which is 11.4 km a day of range.

> _For the handbook:_ Chapter 16's diagram should show the time difference and the longitude difference as the same quantity in two units, and it should show the ERROR as a band along the parallel rather than a circle — the one thing a reader must take away is that a clock error has no north-south component at all. The chapter should also give the sign explicitly and say which way is dangerous: a losing clock puts the plot east of the truth, so land appears before the plot expects it. Worth including as a second figure: three circles of position that do not meet, with the caption that the one correction bringing them together is the receiver's own clock error. And the chapter should carry the datum and the geoid, because they are what actually catches a modern reader out — NAD27 against WGS84 is tens to a couple of hundred metres across the lower 48, and an Ohio reference station's geoid sits 34.4 m below the ellipsoid, which is 113 feet between a receiver's height and a map's elevation.

> **Field Guide — Chapter 16: How Sailors Found Longitude.** This one you can do indoors, and then on a journey. Note the exact moment the Sun is highest where you are — Lesson 12 gave you the shadow method for finding it, and a stick and a patient hour is all it takes. Then work out what time it was in Greenwich at that moment, which your phone will tell you if you ask it for UTC. Every four minutes of difference is one degree of longitude; divide by four and you have your own, worked out from a shadow and a clock. Then do it again somewhere a few hundred miles east or west, and watch the number move.

**What the learner should notice**
- A clock losing ten seconds a day — a perfectly good house clock of the period — has lost **200 seconds** in twenty days. That is **0.8 of a degree**, which is **47 nautical miles** on this parallel. Nothing aboard can detect it. The latitude line through both marks has not moved at all, and never will, because it is measured afresh every noon.
- Now take the four presets in turn. **A pocket watch at thirty seconds a day is 211 miles out by day thirty. A good chronometer at three seconds a day is 21. Harrison's H4, which lost 5.1 seconds in eighty-one days, is less than half a mile.** That is the whole three-century problem, and it is a problem in clockmaking, not in navigation.
- Then the second tab, which is the same sum done with light. A receiver's clock is out by a microsecond, so every range it measures is **300 metres long**, so the three circles of position miss each other by **525 metres** and there is no place on Earth that is all three of those distances away. Take two of them at their word and the fix is **508 metres out** — more than the range error, because the geometry multiplies it. Press SOLVE FOR THE CLOCK and they close on a point.

## UNDERSTAND IT
*The Professor:* Three sentences, and the first one has been waiting since Lesson 3.

**The three sentences**
1. **Longitude is the difference between your time and somewhere else's, and nothing else.** The Earth turns fifteen degrees an hour, so if it is noon where you stand and four in the afternoon at Greenwich, you are four hours — sixty degrees — west of Greenwich. Finding the local hour is easy and you did it in Week 3 with a stick. The hard half, the half that took until the 1760s, is knowing what time it is somewhere else *at the same moment*, in a place you cannot see and cannot signal, and the only way to know that is to have brought the other place's time with you.
2. **Latitude is a thing you measure and longitude is a thing you carry, and that is why one of them is easy.** A measurement can be taken again tomorrow: if your latitude is twenty miles out tonight it is still twenty miles out tomorrow and no worse, because tomorrow's observation does not inherit tonight's mistake. A carried quantity has no such mercy — every second your clock loses stays lost and the next day's loss is added to it. Four minutes to the degree is a fixed rate, but what a degree is worth in miles depends on where you are: sixty nautical miles at the Equator, thirty at latitude sixty, nothing at all at the pole.
3. And **the instrument in your pocket is the same idea with the clock turned inside out.** A satellite says, in effect, "this signal left me at exactly this moment"; your receiver notes when it arrived, multiplies by the speed of light, and has a range. Light covers almost exactly a foot in a nanosecond, so the clock has to be good to billionths of a second — and yours is not, not remotely. So it does not use its clock. It treats the time as a fourth unknown alongside the three coordinates, and asks which single correction makes all the measurements agree: and that is why it needs four satellites to find three coordinates, and why the answer it gives you includes the exact time as a free gift.

### THE WATCH YOU FORGOT TO CHANGE
You fly a long way west and forget to reset your watch. The next day you wait until the Sun is as high as it is going to get — straight overhead, shortest shadow, local noon wherever you now are — and you look at your wrist. The watch says four o'clock. You have just measured your longitude: you are four hours, which is sixty degrees, west of where you set it. Everything else in this lesson is a detail of engineering. A chronometer is that watch built well enough to survive six months at sea; a satellite receiver is that watch, admitting it is wrong, and working out by how much.

The clock built to be carried is a **chronometer**, and the problem it solved was called **the longitude** so often, and for so long, that the word alone meant the problem. Before Harrison there was a working alternative that needed no clock at all: **lunar distances**, which used the Moon as the hand of a clock everybody could see. The Moon moves against the stars at about half a degree an hour, so measuring the angle between the Moon and a star, and looking the answer up in a book, tells you the hour at Greenwich. The book is the **Nautical Almanac**, published annually from 1767 and still published; the method works, and it charges a terrible price in error, which is Lesson 28's business. Greenwich's own hour, as kept by everyone for navigation, used to be **GMT** and is now **UT** or **UTC** — and the reason your satellite receiver has a settings page full of **datums** is that it answers in coordinates on a mathematical Earth, and your map may have been drawn on a different one.

### The formal names
| Term | Meaning |
|---|---|
| **Chronometer** | A clock built to keep its rate at sea — in motion, in damp, and through changes of temperature. Rated rather than trusted: you record how much it gains or loses a day and correct for it. |
| **Rate** | How much a clock gains or loses per day. A clock with a large but KNOWN rate is useful; a clock with a small unknown one is not. |
| **Lunar distance** | The angle between the Moon and a star or the Sun, measured to get the time at Greenwich out of an almanac. The clock nobody had to carry, and the method is in Chapter 16. |
| **Nautical Almanac** | The annual book of predicted positions, from 1767, that made lunar distances practical. The method is useless without it. |
| **Prime meridian** | The line longitude is counted from. A convention, not a fact — Greenwich won by 1884, and charts before that may count from Paris, Cadiz or Ferro. |
| **Pseudorange** | What a satellite receiver actually measures: a range that is wrong by the speed of light times its own clock error. "Pseudo" because it is not a distance until the clock is solved for. |
| **Clock bias** | That error, treated as the fourth unknown. Solving for it is why four satellites are needed rather than three, and why the receiver also gives you the time to a few billionths of a second. |
| **Datum** | The model of the Earth's shape a coordinate is quoted on. The same ground has different coordinates on different datums — NAD27 and WGS84 differ by tens to a couple of hundred metres across the United States, which is enough to put you in the wrong field. |
| **Ellipsoid height** | The height a receiver computes, measured from that mathematical Earth rather than from sea level. In Ohio the sea-level surface sits about 34 metres BELOW the ellipsoid, so the two heights differ by some 113 feet. |

## CONNECT IT
*The Roommate:* Last week of the course, and today's idea is everywhere once you see it. Where do you find something out from a difference between two times?

**Where it shows up**
- Counting the seconds between the lightning and the thunder.
- The echo coming back across a valley.
- A radio phone-in where the caller's own radio is a beat behind.
- Finding out the kitchen clock is slow when the news comes on.
- Jet lag — your body still keeping the hour of the place you left.
- A race photo-finish, separating two runners by thousandths.

Jet lag is the closest, and it is not a metaphor. Your body is a clock that was set somewhere else and has not been reset, and the gap between what it expects and what the Sun is doing is exactly, to the hour, your change of longitude. Fly six hours' worth west and you will be hungry at eleven in the morning, because your internal chronometer is still keeping the time of a place sixty degrees away. The lightning and the thunder are the satellite's version: one timing, multiplied by a speed, giving a distance.

_On screen it sits here — directly under the items — and appears only once the learner has ticked two of the items above or written one of their own._

### The Builder — try it yourself
Find your own longitude from scratch, with a stick and a phone used only as a clock. Plant the stick and mark the tip of its shadow every few minutes through the middle of the day; the shortest shadow is local noon, and you will want to bracket it rather than catch it, so mark from well before to well after and take the lowest point of the curve. Note that moment in UTC. Subtract from twelve hundred, divide by four, and you have your longitude in degrees, west if your noon came later. Then look up what it actually is. The difference will be mostly the equation of time from Lesson 14, which is the correction you already own.

### Across cultures — KATH AND BAGHDAD, 997
**Evidence label: DOCUMENTED REGIONALLY**

Carrying the time was one way to know the hour somewhere else. Watching a single event that everyone could see at once was the other, and it was understood a long time before any clock could have done the job. In 997 **al-Bīrūnī**, then a young man in Kath in Khwarezm, and **Abu'l-Wafā'** in Baghdad each timed the same lunar eclipse. An eclipse happens at one instant for every observer; the difference between the two local times at which they recorded it is, directly and without any instrument, the difference in longitude between Kath and Baghdad.

Al-Bīrūnī went on to write the method up in the *Qānūn al-Mas'ūdī* and to use it where he could, including a comparison between Gurgan and Ghazna. Where he could not, he fell back on what travellers reported — for the Baghdad–Ghazna difference he worked from road distances along two separate routes, with an allowance for the crookedness of the roads. The eclipse method is exact in principle and almost unusable at sea, because it requires two observers, an eclipse, and a way of comparing notes afterwards; the ship cannot wait for the Moon to be eclipsed, and a navigator alone in the Atlantic has nobody in Baghdad to compare with.

> **What remains uncertain:** How accurate the 997 result was is not something the accessible sources quantify, and the figures that circulate for it should not be trusted without going to the Arabic text. The description of the two observations as arranged in advance between the two men is how the episode is usually told and is an inference about their intentions rather than something either of them states. The distinction drawn above — eclipse where possible, road distances where not — is al-Bīrūnī's own practice as his commentators describe it, but the boundary between the two in any given entry of his tables is often unclear.  
> **Sources:** Kennedy, *A Commentary upon Bīrūnī's Kitāb Taḥdīd al-Amākin* (1973); Berggren, *Episodes in the Mathematics of Medieval Islam* (1986); Said and Khan, *Al-Bīrūnī: His Times, Life and Works* (1981).

_Do not restate this claim in the handbook without its label, its uncertainty and its sources._

## FEYNMAN IT
Explain how a person in the middle of an ocean can work out how far east or west they are — and then say what the thing they rely on has to do in order to be trusted.

Banned words: **clock**, **watch**, **satellite**

**A good explanation contains**
- It says longitude is a difference between the hour in two places.
- It explains where the local hour comes from — something observable.
- It explains how the other place's hour gets to the middle of the ocean.
- It says what goes wrong as the voyage gets longer, and why latitude does not suffer the same way.

## CHALLENGE IT
*The Editor:* A question about a sign, which is where this subject does its real damage.

**Your chronometer has been losing two seconds a day for sixty days, and nobody has noticed. You are running west towards an island. Compared with where you really are, where does your plot put you?**

- _Too far east — so the island is nearer than you think._  
  Right, and it is the dangerous answer. A clock that loses reads an earlier hour than the true one, so the gap between your local noon and the hour it shows comes out too small, so your longitude comes out too small — too far east. Two seconds a day for sixty days is two minutes, which is half a degree, which is about thirty miles on a tropical parallel. You believe you have thirty miles still to run when you have none, and you are looking for a light that is already behind you. This is the error that wrecks ships, and the reason it wrecks them is the sign rather than the size.

- _Too far west — so you will look for land that is not there yet._  
  That is what a clock running FAST does, and it is the merciful version. If the plot puts you west of the truth you think you have arrived before you have: you shorten sail, post a lookout, find nothing, and feel foolish. Nobody drowns. Work the sign through carefully — a losing clock shows an hour earlier than the truth, which makes the difference between local noon and the shown hour smaller, which makes the longitude smaller, which is eastward. Slow clock, position too far east, land nearer than the plot says.

- _It depends which way the error pushes the latitude as well._  
  It does not touch the latitude, and that independence is worth being certain about. Latitude comes from an angle measured against the horizon or the pole — a sextant altitude, Polaris, the noon Sun. No clock enters that measurement at all, which is exactly why Week 4 could teach latitude without ever mentioning time. A clock error moves your plot due east or due west and not one yard north or south, so the error lies along the parallel, and that is why the chart shows a band rather than a circle.

**You can now find your longitude, which was the last thing missing. So what is left to learn?**

What every one of these instruments assumes. A chronometer assumes somebody rated it and wound it. An almanac assumes this year's edition is aboard. A satellite receiver assumes four satellites in view, a battery, a datum that matches your map, and that you understand its height is measured from a mathematical ellipsoid and not from the sea — in Ohio those two differ by a hundred and thirteen feet. None of those assumptions is unreasonable and every one of them fails sometimes.

So the rest of the week is the other half of the subject: what to do when the assumption fails, which is Lesson 27; how people managed for several thousand years without any of it, which is Lesson 28; and then planning and doing a real journey with what you have, which is Lessons 29 and 30. You have the instruments now. The remaining question is judgement, and it is the only part of this course that cannot be given to you.

_Links across to:_ Navigation, Lesson 3 — the language of latitude and longitude (`navigation/lesson-03`)

## REFLECT
Lesson 3 told you longitude was the hard one and did not say why. Now you know. Write the reason in your own words — and then write what you would want with you, and why, if you had to know your longitude with no electricity at all.

_Tomorrow the instruments fail. The battery is flat, the cloud is down, and everything you have learned in five weeks is what you have left — which turns out to be a great deal, and to depend on one trick that works by deliberately making an error bigger._

## "I don't get it" — 7 ways in

### Explain it with a compass
Your compass has nothing to say about longitude, and noticing that is the lesson. It gives you a direction, and a direction plus a distance gives you dead reckoning, and dead reckoning is exactly what the chronometer replaced — the thing people did for three hundred years because they had nothing better. The compass cannot help because longitude is not a direction problem: two places on the same parallel look identical to a compass, identical to a sextant at noon, and identical to the stars at the same hour of their own night. The only thing that distinguishes them is what time it is somewhere else, and no magnet knows that.

### Explain it with a map
Take your map and look at the two sets of lines. The parallels — the ones across the page — you can place yourself on by measurement: an angle to Polaris, an altitude of the noon Sun, and the line is yours. Now look at the meridians, running up and down. There is nothing in the sky that tells you which of them you are on, because the sky looks the same along a parallel; it just happens *earlier* further east. So the up-and-down lines are a clock's lines, and the across lines are a protractor's lines, and the grid you learned in Lesson 3 is two completely different kinds of knowledge printed in the same ink.

### Use an everyday object
Take your phone and turn off its clock sync — or simply set a second alarm clock to the time somewhere you have been. Now carry it about for a week and do nothing to it. That object is a chronometer and the question of this lesson is how much you would be prepared to bet on it. A second a day of drift sounds like nothing; it is a quarter of a mile at the Equator, and in a month it is seven miles, and in six months forty-five. Harrison's problem was not accuracy on the bench. It was that the bench rolls.

### Show me a diagram
On the first tab the picture is two marks and a band. The green mark is where the ship is; the red cross is where the plot says; the shaded band between them is the longitude the clock error has bought, and it is a band rather than a blob because a clock error has no northerly component at all. Drag the latitude slider and watch the band change width while the degrees readout does not move: the same error, the same degrees, fewer miles. Then push the days out to twenty-five and the clock to twenty seconds a day, and a red panel appears on the chart: you have sailed past Barbados, and the plot still says it is ahead of you. On the second tab the picture is three circles that do not meet. Nothing is wrong with any one of them. What is wrong is the same thing in all three, and the one number that fixes all three at once is the clock.

### Walk me through an example
You plant a stick and watch the shadow. The shortest shadow — local noon — comes at 16:12 UTC by the time signal. Local noon is twelve, so you are 4 hours 12 minutes, which is 252 minutes, behind Greenwich. Divide by four: 63 degrees. You are at longitude 63° W, which is somewhere off the Lesser Antilles. Now suppose the clock giving you UTC is four minutes slow and you do not know it. You compute 248 minutes, which is 62 degrees, and you place yourself a whole degree east of the truth — some fifty miles, at that latitude. Four minutes. The equation of time from Lesson 14 is bigger than that for most of the year, which is why it has to be applied before any of this means anything.

### Break it into smaller steps
Four steps, and the third is the whole history of the subject. One: find the moment of local noon where you are, by the shadow or the Sun's altitude. Two: correct it for the equation of time, because the Sun is not a punctual clock and Lesson 14 explained why. Three: find out what time it is at Greenwich at that same moment — this is the step that needs a carried clock, or the Moon, or a satellite, and there is no fourth way. Four: take the difference, and allow fifteen degrees for every hour of it. If step three is missing, nothing in the other three steps can replace it.

### Work backward from the answer
Start with what a satellite receiver prints: a latitude, a longitude, and a time good to a few billionths of a second. Ask why the time is there at all — nobody asked for it. The answer is that it is not a bonus, it is the thing the receiver had to work out first. It cannot measure a range without knowing when the signal left and when it arrived, its own clock is nothing like good enough to say when it arrived, and so the only way to get a distance is to solve for its own error at the same time as solving for the position. The time on the screen is the working shown. And that is the same confession Harrison's rate was: the clock is wrong, here is by how much, now the arithmetic can proceed.

## Understanding Map after this lesson
| Concept | Level (0–5) |
|---|---|
| Longitude | 5 |
| Carrying the time | 4 |
| The chronometer and its rate | 4 |
| Lunar distance | 2 |
| Pseudorange and clock bias | 3 |
| Map datum | 3 |
| Latitude | 5 |
| Solar time | 5 |
| The equation of time | 5 |
| Position | 5 |
| Dead reckoning | 5 |
| Knowing a method's limits | 5 |
