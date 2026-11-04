# The Art and Science of Navigation — Lesson 14: Solar time and the compass
> Week 3 of 6 · The Sun, Shadows, and Time · lesson 4 of 5 this week  
> Concept: **Clock time is an agreement; solar time is a measurement**  
> Lesson completes when: **the Feynman explanation is submitted**

_Opening question._ Is the Sun highest at twelve o'clock?

## SEE IT
*The Professor:* The blue curve is the same for everyone alive. The number on the left is not. Move through the year, and change where you are standing.

**On-screen simulation:** `solar-clock`

**What it shows.** The equation of time across a whole year as a blue curve — minutes the Sun runs fast or slow — with a dashed marker on the chosen date and the value named on the curve. Readouts give the clock time at which the Sun is actually highest for the chosen town, and then break the gap from twelve o'clock into its separate causes, one line each.

**What the learner can change.** Four places chosen to make the longitude term obvious — Boston east of its meridian, Columbus west of it, Quito which keeps one offset all year, Anchorage nearly an hour west of its — and a slider through all 365 days.

**The numbers behind it.** The gap has three independent parts: four minutes per degree from the meridian the zone is named for, the equation of time, and an hour of daylight saving where it is kept. Columbus on 1 November (standard time): +32 for 8.0° west of the 75th meridian, −16 for the orbit, so the Sun is highest at 12:16 pm. Boston the same day: −16 and −16, giving 11:28 am. Columbus on 21 June: +32, +2 and +60, giving 1:34 pm. Anchorage on 21 June: +60, +2 and +60, giving 2:01 pm. The curve's extremes are about −14 minutes in mid-February, +4 in mid-May, −6 in late July and +16 in early November, and it crosses zero exactly four times a year; those are checked against published values in src/__tests__/sun.test.js.

> _For the handbook:_ Chapter 6 should keep the three causes on three separate lines and never present them as one correction, because a reader who merges them cannot tell which part changes with the date and which does not. The longitude part is the one to teach first: it is constant, it is arithmetic, and it is the reader's own longitude, which Chapter 2 already gave them. The chapter must also carry the brief's instruction plainly — a compass cannot tell the time. The Sun provides the hour and the compass only provides a direction to measure the shadow against.

> **Field Guide — Chapter 6: Finding Solar Time.** Find your own solar noon: mark the shadow tip every five minutes from about half past eleven to half past one, note the clock time against the shortest mark, and write it down with the date. Do it again two months later. The gap between the Sun and your watch will have changed, and you did not move.

**What the learner should notice**
- In Columbus on 1 November the Sun is highest at **12:16 pm**, and that is made of two unrelated numbers: **+32 minutes** for standing 8° west of the meridian your clocks are set by, and **−16 minutes** because of where the Earth is in its orbit.
- Switch to Anchorage on the same date and the longitude term alone is an hour. Alaska keeps the 135th meridian's time and Anchorage sits nearly 15° west of it, so its Sun runs an hour behind its clocks before anything else is counted.
- The blue curve crosses zero exactly four times a year. On those four days a good clock and a good sundial agree; on every other day of the year, one of them is "wrong", and it is never obvious which.

## UNDERSTAND IT
*The Professor:* Three sentences. The first two are the two halves of the gap, and the third is the one the Field Guide asks me to say out loud.

**The three sentences**
1. **Your longitude** sets your solar noon, and your time zone ignores it. A time zone is a strip of the Earth, often fifteen degrees wide or more, that agrees to pretend it is all at the same meridian. Four minutes a degree is the exchange rate, so the far edges of a zone can be an hour apart in Sun while reading the same on the clock.
2. **The equation of time** is the Sun's own irregularity. The Earth's orbit is an ellipse, so it travels faster when it is nearer the Sun, and its axis is tilted, so the Sun's apparent motion along the equator is not uniform even when its motion along the ecliptic is. Together those make the Sun run up to about sixteen minutes fast and fourteen minutes slow across the year — the blue curve.
3. And **a compass cannot tell you the time**. It is worth being blunt: the needle answers to the Earth's magnetic field, which does not know what hour it is. What tells you the time is the Sun, through its height or its shadow. The compass's job in this chapter is only to give you a direction to measure the shadow against.

### A TRAIN TIMETABLE AND A TRAIN
The timetable says the 9:04. The train arrives when it arrives. For most purposes the timetable is the more useful object — you can plan with it, everyone else is using it, and it does not vary with the weather. But if you want to know whether you can cross the track, the timetable is worthless and the train is the only authority. Clock time is the timetable: an agreement, imposed on a wide strip of country, deliberately uniform. Solar time is the train. Navigation is one of the few things left that needs the train.

Daylight saving is a third, separate thing, and it is the biggest of the three where it is kept — a flat hour, by statute. On 21 June in Columbus the Sun is highest at **1:34 pm**: thirty-two minutes for the longitude, two minutes more because the Sun is running slightly slow in late June, and a whole hour because the clocks went forward in March. None of that is astronomy. Two-thirds of it is.

### The formal names
| Term | Meaning |
|---|---|
| **Apparent solar time** | What a sundial reads. Noon is the moment the Sun actually crosses your meridian. Irregular, because the Sun is. |
| **Mean solar time** | What a clock would read if it kept the average day, at your longitude. The fiction that makes clocks possible. |
| **Equation of time** | Apparent minus mean — how far ahead or behind the real Sun runs. "Equation" in the old sense of a correction to be applied, not an algebraic statement. |
| **Standard time** | Mean solar time at an agreed meridian, kept across a whole zone. Eastern time is the 75th meridian's; Alaska time is the 135th's. |
| **Analemma** | The figure-of-eight you get if you photograph the Sun at the same clock time all year. It is the equation of time crossed with the changing declination, drawn in the sky. |
| **Local apparent noon** | Your own solar noon — the shortest shadow. The only noon a navigator without a radio can actually observe. |
| **Meridian passage** | The same event named from the Sun's side: the Sun transiting your meridian. |
| **Longitude in time** | Degrees converted to hours at 15° per hour, 4 minutes per degree. The conversion the whole of Week 6's longitude problem turns on. |

## CONNECT IT
*The Roommate:* The clock and the Sun disagreeing is something you have noticed without naming it.

**Where it shows up**
- Sunset at 4:15 in December and feeling cheated.
- Being in the west of a time zone and eating dinner in daylight.
- A sundial in a garden that is "half an hour slow".
- Jet lag that isn't about the flight, just the clock.
- Arguments about whether to keep changing the clocks.
- Realising the earliest sunset isn't on the shortest day.

The sundial one is the test. Before today the natural response was that the sundial is badly made; now you can say which of three separate things is responsible, and roughly how many minutes each is worth. The last item on that list is the strangest, and it is the open question below.

_On screen it sits here — directly under the items — and appears only once the learner has ticked two of the items above or written one of their own._

### The Builder — try it yourself
Look up your own longitude — a phone map will give it to you — and work out how far you are from your zone's meridian. Multiply by four. That is how many minutes your Sun runs behind (if you are west of it) or ahead (if you are east). Then go outside near midday and find the shortest shadow. The clock time you get should be your answer, plus or minus the equation of time for today, plus an hour if the clocks are forward. If it is, you have just measured your own longitude with a stick.

### Across cultures — JAIPUR AND DELHI, 1724–1735
**Evidence label: WELL DOCUMENTED**

Sawai Jai Singh II, the ruler of Amber and Jaipur, built five masonry observatories across northern India in the 1720s and 1730s. They contain no lenses and no moving parts — the instruments ARE the buildings. The largest, the Samrat Yantra at Jaipur, is a right-angled triangle of stone some 27 metres high whose hypotenuse is a gnomon laid parallel to the Earth's axis, with curved marble scales on either side to catch its shadow.

Because the gnomon is parallel to the axis, its shadow sweeps the scales at a steady fifteen degrees an hour all year round, and at that size the graduations can be cut fine enough to read local apparent time to a couple of seconds. It is a sundial that beats most mechanical clocks of its century — and it reads solar time, so using it with a modern watch means applying both of this lesson's corrections.

> **What remains uncertain:** What Jai Singh was trying to achieve is debated. He had access to European telescopic astronomy and to Islamic zij tables, and chose to build enormous naked-eye masonry instruments anyway; whether that was scientific conservatism, a judgement that large scales beat small optics for the measurements he wanted, or a deliberately public and monumental statement is argued either way. Several of the instruments have also been restored more than once, so present-day accuracy is not straightforward evidence of original accuracy.  
> **Sources:** Sharma, *Sawai Jai Singh and His Astronomy* (1995); Volwahsen, *Cosmic Architecture in India* (2001); Sarma, *The Archaic and the Exotic: Studies in the History of Indian Astronomical Instruments* (2008).

_Do not restate this claim in the handbook without its label, its uncertainty and its sources._

## FEYNMAN IT
Explain to someone why their garden sundial reads a different time from their phone — and why the difference is not the same in February as it is in June.

Banned words: **equation**, **zone**, **average**

**A good explanation contains**
- It separates the cause that comes from where you stand from the cause that comes from the Earth's orbit, rather than running them together as "the clock is off".
- It says the longitude part never changes through the year and the orbit part does.
- It gives at least one real number — minutes, for a named place or date.
- It mentions daylight saving as a third thing, if the reader's country keeps it.

## CHALLENGE IT
*The Editor:* A prediction, and then the question that catches almost everyone.

**Two towns in the same time zone, one on the eastern edge and one on the western edge, 15° apart. On the same day, how far apart are their solar noons?**

- _An hour — and their clocks say the same thing._  
  Right, and that is the deal a time zone strikes. Fifteen degrees is four minutes a degree is sixty minutes. Both towns call it noon at the same instant and the Sun obliges one of them an hour before the other. Spain, kept on central European time while sitting mostly west of Greenwich, is the famous example.

- _No difference — that is what a time zone is for._  
  A time zone makes their CLOCKS agree. It has no power at all over the Sun. The whole point of this lesson is that the agreement is a human convenience laid on top of a physical fact that carries on regardless.

- _It depends on the date, because of the equation of time._  
  The equation of time is the same for both towns on any given date — it is a property of the Earth's orbit, not of where you stand — so it cancels exactly when you compare them. The difference between the two towns is pure longitude, and it is an hour on every day of the year.

**The shortest day in the northern hemisphere is around 21 December. So why is the earliest sunset in early December, and the latest sunrise in early January?**

Because solar noon itself is sliding. Through late autumn the equation of time is falling steeply — the Sun's noon drifts later by a bit under half a minute a day — so the whole day, sunrise and sunset together, is being dragged later on the clock at the same time as it is getting shorter. Sunset is the difference between two moving quantities: the day shortening, pulling it earlier, and noon sliding later, pushing it later.

Early in December the second effect is winning at the sunset end, so sunsets stop getting earlier a couple of weeks before the solstice and start creeping back. At the sunrise end both effects push the same way until well into January, which is why the latest sunrise comes after the solstice rather than before it. The shortest DAY really is the 21st; it is just not the day with the earliest sunset, and those were never the same claim.

_Links across to:_ Navigation, Lesson 3 — the language of latitude and longitude (`navigation/lesson-03`)

## REFLECT
Clock time is an agreement and solar time is a measurement. Write down one other thing in your life that you have been treating as a measurement when it is really an agreement.

_Tomorrow closes the week: you build the instrument. A stick, a circle, a morning — and then you check your compass against it, which is the only way to measure your own declination without looking anything up._

## "I don't get it" — 7 ways in

### Explain it with a compass
A compass answers one question — which way is magnetic north — and it answers it identically at breakfast and at midnight. That is exactly why it cannot tell the time: a clock must have a hand that moves, and the needle does not. The Sun has a hand that moves, which is why it can tell you both. If you ever find yourself trying to get a time out of a compass, you have confused the instrument that gives you a direction with the one that gives you an hour.

### Explain it with a map
Look at a map of time zones and then at a map of meridians. The meridians are straight and evenly spaced; the zone boundaries wander round state lines, borders and islands. That picture is the lesson. Solar time belongs to the meridians, clock time belongs to the boundaries, and the gap between them is how far your town has been dragged from its own meridian by politics.

### Use an everyday object
Think of a class where everybody sets their watch by the teacher's. The teacher's watch is the zone's meridian. If you sit at the back, your watch agrees with the teacher's exactly — but the sound of her voice reaches you a fraction later, every single lesson, by the same amount. That constant lag is your longitude. Now suppose the teacher herself speeds up and slows down through the term in a regular pattern: that is the equation of time, and it affects the front row and the back row identically.

### Show me a diagram
The blue curve in the simulation is the one to study. Its horizontal axis is the whole year and its vertical axis is minutes. Notice it has two humps of different sizes, not one — a small one in spring and a big one in autumn. That is because two separate things are adding: the ellipse of the orbit gives one yearly cycle, the tilt of the axis gives a twice-yearly one, and the sum is lopsided. Notice too that it crosses zero four times, which is why there are exactly four days a year when a sundial and a clock agree.

### Walk me through an example
Columbus, 1 November. The clocks have gone back, so Eastern Standard Time, the 75th meridian. Columbus is at 83.0° west, which is 8.0° west of 75: multiply by four, add **32 minutes**. The equation of time on 1 November is about +16.5, meaning the Sun is running fast, so noon comes early: subtract **16 minutes**. Total +16, so the Sun is highest at **12:16 pm** — and the simulation says 12:16 pm, because it is doing exactly this arithmetic.

### Break it into smaller steps
Ask three questions and add the answers. One: how far am I, in degrees, from the meridian my zone is named for? Multiply by four, west is later. Two: what is the equation of time today? Read it off the curve; fast Sun means earlier noon. Three: are the clocks forward? Add sixty. The sum is how far from twelve o'clock your Sun is highest. Each step can be done on its own and checked on its own, which is the only reason the whole thing is manageable.

### Work backward from the answer
Start from a fact: in Anchorage in June the Sun is highest at 2:01 pm. Two hours after noon — why? Pull it apart. Sixty of those minutes are the clocks being forward, which is a law and not a fact about the sky. Sixty more are Anchorage sitting nearly fifteen degrees west of the meridian Alaska keeps time by. And a minute or two either way is the equation of time, which in late June is nearly nothing. Take away the two human decisions and almost the whole two hours disappears.

## Understanding Map after this lesson
| Concept | Level (0–5) |
|---|---|
| Solar time vs clock time | 3 |
| The equation of time | 3 |
| Time zones and longitude | 3 |
| Solar noon | 5 |
| The noon line | 4 |
| Shadow direction and length | 4 |
| The Sun's daily path | 4 |
| Solar declination | 4 |
| Knowing a method's limits | 4 |
| Converting a bearing | 5 |
| Declination | 5 |
| True, magnetic & grid north | 5 |
| Position | 5 |
