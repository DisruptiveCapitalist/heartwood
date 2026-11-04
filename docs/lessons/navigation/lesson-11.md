# The Art and Science of Navigation — Lesson 11: Why the Sun appears to move
> Week 3 of 6 · The Sun, Shadows, and Time · lesson 1 of 5 this week  
> Concept: **The Sun's path is a place-and-date, not a rule**  
> Lesson completes when: **the Feynman explanation is submitted**

_Opening question._ Which way does the Sun come up?

## SEE IT
*The Professor:* Everyone knows the Sun rises in the east. Set the date to December and look at where it actually comes up.

**On-screen simulation:** `sun-path`

**What it shows.** A bearing-and-height plot of the Sun's whole day: a circle whose rim is the horizon and whose centre is straight overhead, with north up and east to the RIGHT — the map's orientation, not a star chart's. The Sun's track for the chosen day is an orange curve across it, with open circles where it meets the rim at sunrise and sunset, dashed rings at 30° and 60° of altitude, and dotted spokes marking due east and due west to measure the rising point against. A sun disc moves along the track as the learner scrubs through the day. Readouts give the sunrise bearing in three digits, how far that is from due east, the noon altitude, and the hours of daylight.

**What the learner can change.** Four places to stand — Quito on the equator, Columbus at 40° north, Anchorage at 61°, Utqiagvik inside the Arctic circle — three dates (21 June, 20 March, 21 December), and a slider that moves the Sun through seven hours either side of solar noon.

**The numbers behind it.** Everything is computed from src/lib/sun.js, NOAA's algorithm, checked against published sunrise, noon and sunset times for Columbus and Sydney in src/__tests__/sun.test.js. At Columbus: 21 June rises 058°, noon altitude 73.5°, 15.0 hours of daylight, solar noon 1:34 pm; 20 March rises 089°, 50.1°, 12.1 hours; 21 December rises 120°, 26.6°, 9.3 hours. The rising point therefore swings 62° across the year. At Quito the swing is 067° to 113° and the day is 12.1 hours on all three dates. At Utqiagvik the Sun neither rises nor sets on either solstice, and the readout says so rather than inventing a bearing.

> _For the handbook:_ Chapter 4's diagram should show the three tracks on ONE set of horizon directions, not three separate pictures, because the thing to see is the rising point sliding along the horizon while the arc rises and falls together with it. Label the sunrise points with bearings, not with "north-east" — the course has taught three-digit bearings since Chapter 10 and this is the first place they can be used on something that is not a compass. Do not write that the Sun rises in the east without the qualification: it is true on two days a year, and the chapter should give the local midsummer and midwinter bearings for the reader's own latitude instead.

> **Field Guide — Chapter 4: The Sun as a Compass.** Watch one sunrise or sunset from a fixed spot — a window, a doorway, a gatepost — and mark where on the skyline it happens. Go back a month later and mark it again. The gap between the two marks is this lesson, at full size, on your own horizon.

**What the learner should notice**
- On 21 June at Columbus it rises on **058°** — thirty-two degrees north of east. On 21 December it rises on **120°** — thirty degrees south of east. That is a swing of sixty-two degrees, a quarter of the horizon, from the same window.
- It is only on the equinox that it rises within a degree of due east. Twice a year the saying is true, and the rest of the year it is a direction you have not checked.
- Stand in Utqiagvik on 21 June and the track never touches the rim. It does not rise, because it never set. "Every day the Sun rises" is a sentence about where you happen to live.

## UNDERSTAND IT
*The Professor:* Three sentences. The first is the only one that is really about the Sun.

**The three sentences**
1. The Sun is not going anywhere. **You are turning**, once a day, and the Sun's march across your sky is you rotating underneath it. This is why the daily motion is the same for everyone and so reliable you can set a clock by it.
2. But the Earth's axis is **tilted 23.4° from its orbit**, and that tilt does not swing round to follow the Sun. So through the year the Sun stands further north of the equator, then further south, by up to 23.4° either way. That number — where the Sun is standing today — is called its **declination**, and it is the one thing in this lesson that changes.
3. Your latitude and the Sun's declination together fix everything you can see: where it comes up, how high it gets, how long it stays. At Columbus the noon Sun is **73.5°** up in June and **26.6°** in December, because 90 − 40 + 23.4 and 90 − 40 − 23.4 are the only arithmetic involved.

### A RECORD ON A TURNTABLE
Put a record on and watch one point on the label. It goes round once per turn, dead regular — that is the day, and it is the Earth turning. Now tip the whole turntable a little and slide it slowly round the room past a lamp. The point still goes round at the same rate, but the lamp catches it higher on some circuits and lower on others, and the part of its circle that is lit gets longer and shorter. That slow second motion is the year. Nothing about the spin changed; what changed is where the lamp is relative to the tilt.

Two things worth having straight before the next lesson. First, **solar noon** is not twelve o'clock — it is the moment the Sun crosses your meridian and stands due south (due north, south of the equator), and at Columbus on 21 June that moment is **1:34 pm** on the clock. Second, the Sun is due south at that moment whatever the date, so the noon Sun is the most dependable direction in the sky. It is Lesson 12's whole business.

### The formal names
| Term | Meaning |
|---|---|
| **Declination (of the Sun)** | How far north or south of the equator the Sun is standing today: 0° at the equinoxes, +23.4° on 21 June, −23.4° on 21 December. The same word as a star's declination, and no relation at all to the magnetic declination of Lesson 7. |
| **Altitude** | How high something is above the horizon, in degrees. 0° on the horizon, 90° straight overhead. |
| **Azimuth** | Its direction, as a bearing clockwise from north — the same three-digit number Lesson 8 taught you to read off a compass. |
| **Zenith** | The point straight overhead. The centre of the simulation's circle. |
| **Solar noon** | The moment the Sun crosses your meridian and is at its highest. Also called local apparent noon, or transit. |
| **Meridian** | The line of longitude you are standing on, carried up over your head from due north to due south. |
| **Solstice** | The two days a year when the Sun's declination stops changing and turns back — around 21 June and 21 December. The word means "Sun stands still". |
| **Equinox** | The two days the Sun's declination passes through zero, around 20 March and 22 September, when it rises close to due east everywhere on Earth. |

## CONNECT IT
*The Roommate:* You have been living with this your whole life. Which of these have you noticed?

**Where it shows up**
- The sun blinding me on the same commute only in certain months.
- A room that gets sun in winter and none in summer.
- Solar panels mounted facing south, at an angle.
- "The sun's in my eyes" at 5pm in October but not in July.
- Houseplants on a windowsill leaning a different way by season.
- Sunset over the ocean in summer but over the headland in winter.

Every one of those is you noticing the Sun's declination without a word for it. The commute is the giveaway: the road did not move, and neither did the Sun's daily circuit — what moved is where that circuit sits on your horizon.

_On screen it sits here — directly under the items — and appears only once the learner has ticked two of the items above or written one of their own._

### The Builder — try it yourself
Find a window you pass every day and a mark you cannot move — the corner of a building, a particular tree. Note today's date and where the Sun is relative to that mark at a fixed time, say 5pm. Write it on the window frame in pencil. Do it again in a month. You will have measured the Earth's axial tilt with a pencil, which is more or less how everyone found out.

### Across cultures — ALEXANDRIA AND SYENE, ABOUT 240 BCE
**Evidence label: PLAUSIBLE BUT UNCERTAIN**

Eratosthenes, the librarian at Alexandria, is said to have measured the size of the Earth from shadows. The account we have says he knew that at Syene, far to the south, the midsummer noon Sun stood directly overhead and lit the bottom of a well; at Alexandria on the same day a vertical pole still cast a shadow, about a fiftieth of a full circle. If the Sun is far enough away that its rays arrive parallel, that angle is the angle between the two places on a curved Earth, and the distance between them is a fiftieth of the way round.

The method is sound and anyone can repeat it, which is why it has survived in every textbook. What is striking for this lesson is that it works only because of the facts above: Syene sits close to the Tropic of Cancer, so the Sun stands overhead there on one particular day of the year and no other. The measurement is an application of the Sun's declination, made by someone who had no idea the Earth went round anything.

> **What remains uncertain:** We do not have Eratosthenes' own account — the familiar version comes from Cleomedes, writing perhaps three centuries later, and he is summarising. How accurate the result was cannot be settled, because nobody knows exactly how long his stade was; estimates of his error range from under two per cent to about sixteen, depending on which stade you choose, and the well at Syene may be a storyteller's detail rather than a record of what he did.  
> **Sources:** Cleomedes, *On the Circular Motions of the Celestial Bodies*, I.7, translated in Bowen and Todd, *Cleomedes' Lectures on Astronomy* (2004); Dutka, "Eratosthenes' Measurement of the Earth Reconsidered," *Archive for History of Exact Sciences* (1993).

_Do not restate this claim in the handbook without its label, its uncertainty and its sources._

## FEYNMAN IT
Explain to someone why the Sun does not come up in the same place every morning — and why, if they stood on the equator, they would see something different from what you see.

Banned words: **gps**, **app**, **just head**

**A good explanation contains**
- It says clearly that the daily motion is the Earth turning, not the Sun travelling.
- It explains the yearly change by the tilt of the axis, not by the Earth being nearer or further from the Sun.
- It gives at least one number — a bearing, an altitude or a count of hours — rather than only "higher" and "lower".
- It says what would be different at another latitude, and why.

## CHALLENGE IT
*The Editor:* One prediction, then one question I cannot answer for you.

**You are in Columbus. You want to know which way is north, and it is 1:34 pm on 21 June — solar noon. Where do you look?**

- _At your own shadow: it is pointing nearly due north._  
  Right, and this is the whole of tomorrow's lesson. At solar noon the Sun is due south of you at Columbus, so anything it lights throws its shadow due north. No instrument, no declination arithmetic, and no needle to be wrong.

- _At the Sun: it is due south, so north is behind you._  
  Also right, and the same fact — but do not look at the Sun. The shadow is the same information delivered at your feet, and it is free.

- _You cannot tell. The Sun is only a reliable direction at sunrise._  
  Backwards, and worth sitting with. Sunrise is the LEAST reliable moment: that is the one that moved sixty-two degrees across the year. Noon is the most reliable, because the Sun crosses your meridian every single day of the year, in every season, at every latitude.

**At Quito, on all three dates in the simulation, the day is 12.1 hours long. Why 12.1 and not exactly 12?**

Two reasons, and both are about the definition rather than the astronomy. Sunrise is counted from the moment the Sun's **upper edge** appears, not its centre, which buys you a couple of minutes at each end. And the atmosphere **refracts** light over the horizon, so you see the Sun while it is still geometrically below it — worth about half a degree, which is more than the Sun's own width.

Together those add roughly six to eight minutes to the day at the equator, every day of the year. It is a good reminder that a measurement is only ever as sharp as the definition underneath it — and that "twelve hours of day and twelve of night" is a description of a geometrical idealisation, not of any day you have ever lived through.

_Links across to:_ Navigation, Lesson 7 — true north and magnetic north (`navigation/lesson-07`)

## REFLECT
Before today, if someone had asked you which way the Sun comes up, what would you have said? Write the answer you would have given, and then write what you would add to it now.

_Tomorrow:_ Tomorrow: a stick in the ground, and the shadow it throws. It turns out that the shortest shadow of the day is a line pointing at the true pole — and you can find it without knowing the time.

## "I don't get it" — 7 ways in

### Explain it with a compass
Think of the horizon as the rim of a compass rose you are standing in the middle of. Sunrise is a bearing on that rose, like any other: 058 in June, 089 at the equinox, 120 in December. Nothing mystical is happening — the Sun is coming up on a different bearing, and bearings are the thing you have spent a week learning to read. The one difference from Lesson 8 is that this bearing is a TRUE bearing already. No declination to add. The sky does not care about iron.

### Explain it with a map
Take a map and draw a line due east from where you live. That is the line the Sun rises on twice a year. Now draw two more lines from the same point, one 32° to the north of it and one 30° to the south: those are the midsummer and midwinter sunrises at Columbus's latitude. The wedge between them is everywhere on your horizon the Sun has ever come up. It is much wider than people expect, and that is the lesson.

### Use an everyday object
Hold an orange with a knitting needle through it, tilted. The needle is the axis. Spin the orange: that is a day, and one spot on it faces the lamp and then faces away. Now, keeping the needle pointing the SAME way in the room, walk the orange in a big circle around the lamp. Half way round, the end of the needle that was leaning towards the lamp is leaning away. You have not changed the tilt once. That is the whole year.

### Show me a diagram
The simulation IS the diagram, and it is worth knowing how to read it. The outer circle is your horizon, all the way round. The centre is straight overhead. The orange curve is the Sun's whole day. Where the curve touches the rim is where it rises and sets; how close the curve gets to the centre is how high it gets at noon. Switch between the three dates and watch two things change together: the curve's ends slide along the rim, and the whole arc moves nearer or further from the centre.

### Walk me through an example
Columbus, 21 December. Your latitude is 40° north. The Sun's declination that day is −23.4°, meaning it is standing 23.4° south of the equator. The angle between you and it is 40 + 23.4 = 63.4°. Straight overhead is 90°, so at noon the Sun is 90 − 63.4 = **26.6°** above your southern horizon — about the height of your thumb at arm's length, three times over. Now do June: the Sun is 23.4° north of the equator, so the gap is 40 − 23.4 = 16.6°, and the noon Sun stands 90 − 16.6 = **73.4°** up, nearly overhead. Two subtractions, and they are the difference between summer and winter.

### Break it into smaller steps
Three questions, in order. One: does the Earth turn? Yes, once a day — that gives you sunrise, noon and sunset in that order, every day, everywhere. Two: is the Earth's axis straight up relative to its orbit? No, it leans 23.4°, and it keeps leaning the same way all year. Three: if the axis leans the same way all year, what changes as you go round? Which side of the Sun you are on. That is the whole mechanism, and the rest is arithmetic.

### Work backward from the answer
Start from the answer: at Columbus on 21 December the Sun rises on 120°, which is well south of east, and it only gets 26.6° up. Why would it rise south of east? Because it spends that whole day south of the equator, so its circle is tilted away from you and the lit part of it sits in your southern sky. Why does it spend the day south of the equator? Because the Earth's axis leans away from the Sun in December. Why does it lean away in December and towards it in June? It does not change its lean at all — you went round to the other side.

## Understanding Map after this lesson
| Concept | Level (0–5) |
|---|---|
| The Sun's daily path | 3 |
| Solar declination | 2 |
| Solar noon | 2 |
| Altitude and azimuth | 3 |
| Map and compass together | 4 |
| Converting a bearing | 5 |
| Taking a bearing | 5 |
| Following a bearing | 4 |
| Declination | 5 |
| True, magnetic & grid north | 4 |
| Magnetic field | 4 |
| Direction vs. position | 5 |
| Position | 5 |
