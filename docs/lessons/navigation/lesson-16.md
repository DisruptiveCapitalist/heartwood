# The Art and Science of Navigation — Lesson 16: The night sky is a clock and a compass
> Week 4 of 7 · Navigating by the Night Sky · lesson 1 of 5 this week  
> Concept: **One turn, seen from the dark side**  
> Lesson completes when: **the Feynman explanation is submitted**

_Opening question._ What is the night sky doing while you sleep?

## SEE IT
*The Professor:* Same sky, one night. Turn the trails on and move through the hours.

**On-screen simulation:** `star-sky` ({"mode":"turning"})

**What it shows.** The night sky from one spot, drawn as a disc: the rim is the horizon, the centre is straight overhead, north up and east right — the same orientation as Week 3's sky and shadow plots. The named navigation stars are drawn in their patterns with the lines joined up, over a fixed scattering of fainter ones, and each named star trails a faint arc showing where it has been over the past six hours.

**What the learner can change.** Four places to stand (Miami, Columbus, Anchorage, Sydney), four months, a slider across the night from six in the evening to six in the morning, and a toggle for the trails.

**The numbers behind it.** Positions come from src/lib/stars.js — J2000 catalogue entries precessed to 2026 by the rigorous rotation, checked against published Polaris figures in src/__tests__/stars.test.js. Every trail is an arc of the same angular length, because the sky turns 15° an hour whatever the star; what differs is the radius. The sky runs fast on the Sun by 3 minutes 56 seconds a day, which is one whole extra turn across a year.

> _For the handbook:_ Chapter 7's opening figure should be a long-exposure star-trail photograph if one can be licensed, because it is this simulation taken with a camera and no reader doubts a photograph. If it must be drawn, draw the arcs concentric and equal in angle but different in radius — the commonest error in textbook versions is drawing them all the same length, which quietly says the stars move at different rates.

> **Field Guide — Chapter 7: Navigating by the Stars.** Go out twice in one night — once early, once three hours later — and both times note where one bright star sits relative to a fixed object: a chimney, a telephone pole, the corner of a roof. You will have measured the Earth's rotation with a chimney.

**What the learner should notice**
- Every trail is an arc, and every arc is centred on the same point. Nothing is drifting in its own direction — the whole sky is one rigid thing turning.
- The arcs get smaller nearer that centre and bigger further away. A star close to it barely moves all night; one near the horizon sweeps right across.
- At the centre sits **Polaris**, almost still. It is the only star in the picture that is nearly where it was six hours ago, and that is the entire reason it matters.

## UNDERSTAND IT
*The Professor:* Three sentences. The first is Lesson 11's sentence, said again at night.

**The three sentences**
1. The stars are not moving. **You are turning**, once a day, and everything you can see turns with the sky because none of it is attached to you. The night sky's wheel and the Sun's daily arc are the same rotation; the only difference is that at night there are thousands of markers instead of one.
2. The axis you are turning on points at a fixed spot in the sky — the **celestial pole** — and that is why every trail is a circle centred on it. The pole is not a thing, it is a direction: where the Earth's axis, extended, happens to cross the sky.
3. And the sky runs **fast on the Sun** by about four minutes a day. After a year's worth of four minutes the stars have gained a full twenty-four hours, which is exactly the one extra turn the Earth makes by going round the Sun. That is why the constellations belong to seasons.

### A CEILING PAINTED WITH STARS
Imagine lying on a slowly spinning carousel floor, looking up at a painted ceiling that does not move. The painted stars appear to wheel over you, all at the same rate, all in circles around one point — the spot directly above the spindle. Someone who has never seen the spindle can still find it, because it is the only part of the ceiling that stays put. You do not have to believe the floor is moving to use the trick. You only have to notice that one point does not go anywhere.

A warning this course will keep returning to: the pole is a **direction**, not a star. There happens to be a reasonably bright star near it now, which is a piece of luck lasting a few thousand years. The Greeks had no bright pole star worth the name and navigated anyway. Tomorrow's lesson is about how to find the point, and Polaris is only the current convenience.

### The formal names
| Term | Meaning |
|---|---|
| **Celestial sphere** | The convenient fiction that the sky is a ball with us at the centre. Nobody believes it; everybody calculates with it, because for direction-finding the distances do not matter. |
| **Celestial pole** | Where the Earth's axis, extended, meets that sphere. The point every star circles. There are two, one north and one south. |
| **Celestial equator** | The Earth's equator, extended outward. A star on it rises due east and sets due west, from anywhere. |
| **Declination (of a star)** | How far north or south of the celestial equator a star sits. Its latitude on the sky, and it does not change through the night or the year. |
| **Right ascension** | The sky's longitude, measured eastward, usually in hours rather than degrees. With declination it fixes a star for good. |
| **Circumpolar** | Close enough to the pole that it never sets — it circles all night. Which stars qualify depends entirely on your latitude, and Lesson 20 makes that the whole exercise. |
| **Sidereal day** | One turn of the Earth relative to the stars: 23 hours 56 minutes 4 seconds. Shorter than a solar day, and the four-minute difference is this lesson's third sentence. |
| **Asterism** | A recognisable pattern that is not one of the official constellations. The Big Dipper is an asterism inside the constellation Ursa Major; the Summer Triangle is one spanning three. |

## CONNECT IT
*The Roommate:* The sky moving is something you have half-noticed for years.

**Where it shows up**
- A long-exposure photo with star trails curving round one point.
- Orion being a winter thing and not a summer thing.
- Noticing a bright star has moved after being inside for an hour.
- The Moon seeming to follow the car.
- Someone saying "that's the North Star" and pointing at the wrong one.
- A planetarium show speeding up the night.

The photograph is the one to keep: that is this lesson, already taken, by someone who left a shutter open. Every arc in it is a star, every arc has the same centre, and the length of the arcs tells you how long the shutter was open.

_On screen it sits here — directly under the items — and appears only once the learner has ticked two of the items above or written one of their own._

### The Builder — try it yourself
Pick a bright star low in the east and line it up with something fixed — the edge of a window frame works if you mark where your head goes. Come back in an hour. It will have moved about fifteen degrees, which is a hand's breadth at arm's length, and it will have moved UP and to the right. Do the same with a star in the west and it will have gone down. You have just established which way the sky turns, which is the one fact tomorrow needs.

### Across cultures — EGYPT, THIRD MILLENNIUM BCE ONWARDS
**Evidence label: WELL DOCUMENTED**

Egyptian astronomers tracked the **heliacal rising** of Sirius — the first morning of the year the star is visible in the dawn before the Sun drowns it. Through most of the year Sirius rises in daylight and cannot be seen at all; for about seventy days it is entirely absent; then one morning it reappears just above the eastern horizon in the twilight. That morning fell close to the start of the Nile's annual flood, and the event is recorded in Egyptian texts as the rising of Sopdet.

What makes this a navigation lesson rather than a calendar one is the reason it works. A heliacal rising is the sidereal day and the solar day drifting apart at four minutes a day, read off a single star — the same four minutes as the third sentence above, accumulated until the star has climbed clear of the Sun's glare. Egypt was using the sky as a clock whose unit was the year, long before anyone had a clock whose unit was the hour.

> **What remains uncertain:** The flood and the rising coincide only loosely and only at particular latitudes and periods, and a civil calendar of 365 days with no leap day drifts against the seasons by a day every four years — so the relationship between the Egyptian civil year, the agricultural year and Sirius changes across three millennia. Attempts to use recorded Sothic risings to pin absolute dates for Egyptian chronology have been argued over for more than a century and remain contested, because the observing latitude, the exact visibility criterion and the authorship of the surviving records are all uncertain.  
> **Sources:** Parker, *The Calendars of Ancient Egypt* (1950); Depuydt, "The Function of the Ebers Calendar Concordance," *Orientalia* (1996); Clagett, *Ancient Egyptian Science, Volume II: Calendars, Clocks, and Astronomy* (1995).

_Do not restate this claim in the handbook without its label, its uncertainty and its sources._

## FEYNMAN IT
Explain why the stars appear to move across the sky at night, and why one of them appears not to. Do it without the words below — describe what is happening, do not name it.

Banned words: **constellation**, **celestial**, **sphere**

**A good explanation contains**
- It says the movement is the Earth turning, and that all the stars move together as one piece.
- It explains the still point as the direction the Earth's axis points, not as a special star.
- It gives a rate — a full turn in a day, or fifteen degrees in an hour — rather than only "slowly".
- It is clear that the same turning makes the Sun cross the sky by day.

## CHALLENGE IT
*The Editor:* A prediction, then a question with a long answer.

**You photograph the northern sky for two hours with the shutter open. How long are the arcs?**

- _Each arc covers 30° of its circle._  
  Right. The sky turns 360° in roughly 24 hours, so 15° an hour, so 30° in two. Every arc covers the same ANGLE — which is why trails near the pole are short lines and trails far from it are long sweeps, despite taking exactly as long.

- _It depends on the star — some move faster than others._  
  They all turn through the same angle in the same time; what differs is the radius of the circle they are turning on. A star near the pole has a tiny circle, so 30° of it is a short stroke. A star near the celestial equator has the biggest circle there is.

- _About 2° — the stars barely move in two hours._  
  Have a look at the simulation's trails, which are drawn over six hours. The sky moves a great deal faster than people expect: fifteen degrees an hour is a fist at arm's length every sixty minutes, which is easy to see against a chimney in a single cup of tea.

**A star rises four minutes earlier each night. What does that add up to over a year, and why that number?**

Four minutes a day for 365 days is 1,460 minutes — twenty-four hours and twenty minutes, near enough one whole day. So after a year a star rises at the same clock time it did when you started, having gained exactly one full turn on the Sun.

And that extra turn is the year itself. The Earth spins about 366.25 times relative to the stars while going once round the Sun, but we only count 365.25 **days**, because one of those turns is used up by the orbit — going round the Sun once means facing it one fewer time. The four minutes a night is the year, paid for in nightly instalments.

_Links across to:_ Navigation, Lesson 11 — why the Sun appears to move (`navigation/lesson-11`)

## REFLECT
Write down the last time you looked at the night sky on purpose, and what you were looking for. Then write what you would look for now.

_Tomorrow: finding that point. There is a star near it, two others that point at it, and a W-shaped pattern on the far side that works when the first two are behind a hill._

## "I don't get it" — 7 ways in

### Explain it with a compass
A compass needle settles along a field and stays there. The sky does the opposite: everything in it moves, all night, at a steady fifteen degrees an hour. But the CENTRE of that movement is as fixed as any needle — more so, since no belt buckle can pull it. Think of the night sky as a compass whose needle is the only thing standing still while the dial spins.

### Explain it with a map
The sky has latitude and longitude of its own: declination and right ascension. A star's declination is as fixed as a town's latitude, which is why the same stars are overhead from the same places year after year. Take the sky as a map pinned at one point — the pole — and turned slowly round that pin, and everything in this week follows.

### Use an everyday object
Open an umbrella and spin it slowly by the handle while looking up into it. Every point on the fabric goes round; the ones near the middle shuffle, the ones near the rim swing. Nothing moves relative to anything else — the umbrella is rigid, and so, for our purposes, is the sky. The point where the handle meets the fabric is the celestial pole.

### Show me a diagram
Turn the trails on in the simulation. Each faint arc is where one star has been over the past six hours. Look at three things in order: the arcs are all concentric, so the sky is one rigid thing; they are all the same angular length, so everything turns at one rate; and the arcs shrink to nothing at one spot. That spot is not drawn. It is where Polaris nearly is.

### Walk me through an example
At nine o'clock a star sits one hand's breadth above a chimney — about ten degrees. The sky turns fifteen degrees an hour. By ten o'clock it will have gone through fifteen degrees of its circle; if it is rising in the east it will be roughly two hands up instead of one. By one in the morning it will be about sixty degrees round from where it was. Nothing about the star changed; you turned sixty degrees away from where you were standing.

### Break it into smaller steps
Three claims, each checkable by yourself in one night. One: the stars keep their positions relative to each other — the Big Dipper is the same shape at midnight as at dusk. Two: the whole pattern changes its position relative to your horizon. Three: it does so by turning about one point rather than sliding. If you accept all three, the sky is a rigid thing rotating, which is the lesson.

### Work backward from the answer
Start from the end: the still point is where the Earth's axis points. Why would any point be still? Because you are turning on an axis, and the direction that axis points does not change as you spin — the sky in that direction stays put while everything else sweeps past. Why is it the axis and not something else? Because the trails are circles centred on it, and a rotation is the only motion that makes concentric circles with one fixed centre.

## Understanding Map after this lesson
| Concept | Level (0–5) |
|---|---|
| The turning sky | 3 |
| The celestial pole | 3 |
| Star declination | 2 |
| The sidereal day | 2 |
| The Sun's daily path | 5 |
| Solar noon | 5 |
| The noon line | 5 |
| Shadow direction and length | 5 |
| Knowing a method's limits | 4 |
| Converting a bearing | 5 |
| Declination | 5 |
| True, magnetic & grid north | 5 |
| Position | 5 |
