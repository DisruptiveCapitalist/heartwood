# The Art and Science of Navigation — Lesson 4: Maps: turning the Earth into a picture
> Week 1 of 6 · Understanding Our Earth  
> Concept: **Every flat map trades something away**  
> Lesson completes when: **the Feynman explanation is submitted**

_Opening question._ Peel an orange and try to press the peel flat on the table. It tears. A map is somebody doing that to the whole Earth anyway — so what did they decide to give up?

## SEE IT
*The Professor:* Two tabs, two different problems. Start with the globe, then press Mercator and watch Greenland.

**On-screen simulation:** `map-maker`

**What it shows.** Two tabs. **Flatten the world** draws Greenland and Africa as latitude/longitude outlines, with a grid every 15°, through one of three projections — a globe, Mercator, or an equal-area cylindrical map. Each projection is fitted to the frame with a single scale for both axes, so the drawn areas stay comparable. The readout says how many times the size of Greenland Africa looks on the picture currently drawn, and then gives the true figure. **Read the ground** draws a topographic sheet 900 × 560, showing a round hill on the left, a longer ridge on the right, a saddle between them, a summit marker with its height, labelled index contours, a ring marking the point being read, a north arrow, a scale bar, and, when switched on, a five-entry legend beneath the sheet and a cross-section drawn under it along the dashed line A–B.

**What the learner can change.** On the first tab, three projection buttons; each prints a sentence about what that projection keeps and what it pays. On the second tab: the contour interval (20, 40 or 100 feet), a toggle for the side view, a toggle for the legend, and four buttons choosing where on the map to read the ground — the summit, the steep face, the saddle, the broad ridge top. The three readouts give the elevation there, the slope there in feet per hundred and in degrees, and how far apart the contour lines sit there as a result — except at the summit, where the ground is level and the lines ring the point rather than crossing it, so no spacing is printed.

**The numbers behind it.** Areas are measured by shoelace from the polygons actually drawn, so the readout always describes the picture. Greenland is 836,330 sq mi and Africa 11,724,000, a ratio of 14.0. The globe measures 15.3 at this viewing angle, Mercator 1.0, the equal-area map 14.0. Mercator's area stretch is 1/cos²(latitude): twice at 45°, four times at 60°, 8.5 at 70°, 33 at 80°. On the topographic sheet one pixel is 6 feet of ground, so it covers 1.02 × 0.64 miles. The summit is 1,689 ft, the saddle 1,295 ft, the lowest ground 1,200 ft. A 40-ft interval draws 12 lines, 20 ft draws 24, 100 ft draws 4. The steep face falls 47 ft per 100 (25°) and its 40-ft lines are 85 ft apart; the ridge top falls 9 ft per 100 (5°) and its lines are 433 ft apart. The A–B section is 0.92 miles: up to 1,676 ft, down to 1,286, up to 1,504, then away.

> _For the handbook:_ The projection figures are the argument, so a diagram should show the same three pictures of the same two landmasses with the measured ratio against each. For the contours, a handbook diagram should pair the map with the cross-section of the same line, because that pairing is what turns the lines back into ground. The contours come from marching squares over one height function and the cross-section is sampled from that same function, so the two drawings can be trusted to agree with each other. There is deliberately no stream: on ground this smooth the line water would take is a straight diagonal, which looks like a drawing mistake rather than a river.

> **Field Guide — Chapter 3: Maps and the Shape of the Land.** Finding a real hill on a topographic map, reading its contour interval off the legend, and counting lines from bottom to top to get the climb — what the second tab does with one invented hill.

**What the learner should notice**
- On the globe, Africa measures about **15 times** the size of Greenland. The truth is **14 times** — the small error is the globe's own edge, squashing what sits near the rim.
- On **Mercator**, Africa measures **the same size** as Greenland. Not a trick of the eye: the drawn shapes really are equal, and the map is out by a factor of fourteen.
- On the **equal-area** map, Africa measures 14 times Greenland — correct. Look what it did to Greenland's shape to get there.

## UNDERSTAND IT
*The Professor:* Three sentences, and then the second half of the lesson.

**The three sentences**
1. A ball's surface cannot be laid flat without stretching, tearing or squashing it — that is a fact of geometry, not a failure of mapmaking. So every flat map is a **projection**: a rule for turning two angles into two positions on paper, and every rule gets some things right by getting others wrong.
2. A map tells you what it kept by what it says about itself. **Mercator** keeps every compass direction as a straight line, which is why sailors have used it for four centuries, and pays for it in size — the stretch is about double at 45°, four times at 60°, thirty-three times at 80°. An **equal-area** map keeps sizes honest and pays in shape. Nothing keeps both.
3. Close to home the argument goes away, and a map can simply be a picture of the ground: a **scale** that says how many feet to the inch, a **legend** that says what the marks mean, and **contour lines** joining all the points at the same height — so that where the lines crowd together the ground is steep, and where they spread out it is gentle.

### THE SHADOW ON THE WALL
Hold your hand up in front of a lamp and look at the shadow on the wall. Turn your hand one way and you can make the shadow show the length of your fingers truly, but the width is wrong. Turn it another way and the width comes right, but now the fingers are stubs. The shadow is a flat picture of a three-dimensional thing, and you can choose which part of the truth it tells — but you cannot have all of it, and no amount of care with the lamp will change that. Every projection is a choice of how to hold the hand.

The crowding of contour lines is the part worth practising, because it turns a flat drawing back into real ground. On the sheet in SEE IT the lines are drawn every 40 feet. On the **steep face** of the hill, where the ground falls 47 feet in every 100, those lines sit only about **85 feet apart**. Up on the **broad ridge top**, where it falls 9 feet in 100, the same 40-foot lines are about **433 feet apart** — five times the gap for the same climb. Press "show it from the side" and the cross-section appears: the same ground seen edge-on, climbing to 1,676 feet, dropping into a **saddle** at 1,286, rising again to 1,504. Once you can see that shape in the lines, you can read a hill you have never walked.

### The formal names
| Term | Meaning |
|---|---|
| **Projection** | The rule a flat map uses to turn latitude and longitude into a position on paper. There are hundreds, and every one distorts something. |
| **Mercator** | The projection where every compass bearing is a straight line. Invented by Gerardus Mercator in 1569 for exactly that reason. Sizes grow without limit towards the poles. |
| **Equal-area** | Any projection that keeps relative sizes true. Shapes get squashed instead — look at Greenland on the third tab. |
| **Scale** | How much ground one length on the map stands for. Written as a ratio, 1:24,000, or as a bar you can measure against. A **large-scale** map covers a small area in detail; a small-scale map covers the world. |
| **Legend** | The panel that says what the marks mean. Never assume — symbols differ between countries and between map series. |
| **Contour line** | A line joining every point at the same height. It can never cross another contour, and it always closes on itself eventually, even if that happens off the edge of the sheet. |
| **Contour interval** | The height between one line and the next — 40 feet on the sheet in SEE IT. Stated in the legend, and the first thing to look for. |
| **Index contour** | Every fifth contour, drawn heavier and labelled with its height, so you can count without losing your place. |
| **Spot elevation** | A single height printed at a point, usually a summit, where contours alone would not tell you the top. |
| **Saddle** | The low point of the ridge between two summits — the easiest place to cross from one valley to the next, and often where a trail goes. |
| **Topographic map** | A map whose main business is the shape and height of the ground, rather than roads or boundaries. |

## CONNECT IT
*The Roommate:* You have been living with these trade-offs for years. Which ones have you noticed?

**Where it shows up**
- A classroom world map where Greenland looked as big as Africa, and nobody mentioned it.
- A phone map that stretches oddly as you scroll towards the top of the world.
- A trail map with a mile of switchbacks squeezed into an inch of paper, because the slope was too steep to go straight up.
- A hiking guide saying "2 miles, 1,800 feet of gain" — distance and height as separate numbers, because the map gives them separately.
- Looking at a topographic map and seeing the lines bunch up where the trail description said "steep section."
- Two maps of the same park, drawn at different scales, showing completely different amounts of detail.

Notice what all six have in common: the map was not wrong, it was *honest about something else*. The skill is not finding a map that doesn't lie. It is knowing which lie you have in your hand.

_On screen it sits here, and appears only once the learner has ticked two of the items above or written one of their own._

### The Builder — try it yourself
Find a hill near you on any free topographic map — the USGS *topoView* site and most hiking apps will show contours. First, read the legend and find the contour interval. Then put a finger at the bottom of the hill and a finger at the top, and count the lines you cross: each one is that many feet of climb. Multiply. Now look at where the lines are closest together and work out roughly how far apart they are on the ground, using the scale bar. That gap, against the interval, is the steepest part of your hill — and it is the part that will be in your legs tomorrow.

### Across cultures — THE MARSHALL ISLANDS, CENTRAL PACIFIC
**Evidence label: DOCUMENTED REGIONALLY**

Navigators in the Marshall Islands built lattices of wooden sticks bound with coconut fibre, with small shells marking the islands. These are usually called stick charts. What the sticks represent is not coastline: it is the behaviour of ocean swells — where a swell running in from the open sea bends around an island, and where two swell systems meet and cross. A navigator lying in the hull could feel that interference, and the chart named what to feel for.

Three kinds are described in the literature. *Mattang* were small square lattices used to teach the principles of swell refraction; *meddo* covered a group of islands; *rebbelib* covered a larger part of the chain. The charts were not carried on the voyage — they were memorised ashore. That is the opposite arrangement from a paper map, and it is worth sitting with: the picture was a teaching instrument, and the sea itself was the thing being read.

> **What remains uncertain:** Most surviving charts reached museums between the 1860s and the 1940s, often without a record of who made them or what the individual sticks meant to that maker; the three-way classification comes from European observers and may be tidier than the practice was. Reading a chart was personal knowledge, taught within families, and the detailed meaning of particular charts is in many cases no longer recoverable. Voyaging under the old system ended in the colonial period, though Marshallese communities have worked since the 1980s to document and revive the knowledge.  
> **Sources:** Davenport, "Marshall Islands Navigational Charts," *Imago Mundi* (1960); Finney, in *The History of Cartography*, vol. 2 bk 3 (1998); Genz, "Resolving Ambivalence in Marshallese Navigation," *Oceania* (2011).

_Do not restate this claim in the handbook without its label, its uncertainty and its sources._

## FEYNMAN IT
A Scout holds up a topographic map and asks: "How can you tell this hill is steep just by looking?" Answer him — **without using the words "contour," "gradient," or "interval."**

Banned words: **contour**, **gradient**, **interval**

**A good explanation contains**
- Each line joins every spot at the same height above sea level.
- The height from one line to the next is always the same — the legend says how much.
- So lines close together mean you gain that height in a short distance: steep.
- Lines far apart mean the same height gain spread over a long walk: gentle.

## CHALLENGE IT
*The Editor:* One about the ground, one about the shape of the world.

**Two trails climb the same hill. On the map, trail A crosses eight contour lines in half an inch. Trail B crosses eight lines in two inches. Which is the harder walk, and by how much?**

- _Trail A — same climb, a quarter of the distance, so about four times as steep._  
  That's it. Eight lines is eight lines: both trails gain exactly the same height, because the spacing between lines is fixed. What differs is how far you walk to earn it. A quarter of the distance for the same climb is four times the slope. This is the whole skill of reading a topographic map, and it works without knowing the scale, the interval, or where in the world you are — crowded lines, steep ground.

- _Trail B — it's four times longer, so it's more work._  
  It is a longer walk, and on a hot day that matters. But "harder" in the sense the map is telling you about is slope, and trail B is the gentle one: it spreads the same climb over four times the ground. That is exactly why trail builders put in switchbacks — stretching the distance is how you make a steep hill walkable. Look at the far side of the hill in SEE IT: 9 feet of climb in every 100, against 47 on the steep face.

- _You can't say — it depends on the contour interval and the scale._  
  You need both of those to say *how steep* either trail is in degrees. But you do not need either to compare the two, because they are on the same map: same interval, same scale. Eight lines is the same climb on both, and one does it in a quarter of the distance. Four times the slope, whatever the numbers turn out to be. The comparison is free; only the absolute figure costs you a look at the legend.

**The Mercator map has been in schoolrooms for a century and a half, and it makes countries near the poles look enormous. If it is that misleading, why has nobody simply replaced it?**

Because it is not a bad map — it is a map built for a job you are not doing. Mercator's rule makes every compass bearing come out as a straight line on the paper. For a navigator that is worth almost any price: draw a line from here to there, measure its angle, steer that angle, and you arrive. No other projection does that, and for four hundred years it was the difference between a crossing and a shipwreck. The size distortion is not a bug in the design; it is the bill.

What happened is that the map escaped its job. It is a superb chart and a poor picture of the world, and for a century and a half it has mostly been used as the second. The honest fix is not a better projection — there isn't one — but a better habit: ask what any map was built to keep. Most online maps, incidentally, still use a Mercator variant, for a reason Mercator would have recognised: it keeps shapes locally correct at every zoom, so a street corner looks like a street corner.

_Links across to:_ Lesson 2 — why a small patch of a ball looks flat (`navigation/lesson-02`)

## REFLECT
One thing I understand now that I didn't understand this morning:

_Tomorrow:_ Tomorrow, Lesson 5 closes the week: a real map, a pair of coordinates, and the question the whole week has been building to — where am I, and how would I tell somebody?

## "I don't get it" — 7 ways in

### Explain it with a compass
Here is why Mercator exists. Set a compass to 060° and walk it faithfully across a thousand miles of ocean. On the real Earth your track is a long gentle spiral, because you keep cutting the north-south lines at the same angle while they close in on each other. On almost any map that track comes out as a curve, which is useless for drawing a course. Mercator stretched the map vertically by exactly the amount needed to straighten it — so on his map, and only his map, "steer 060°" is a ruled line. The bloated Greenland is what that straightening costs.

### Explain it with a map
Put two maps of your own town side by side — a city street map and a page from a state road atlas. On the street map you can see individual buildings; on the atlas the whole town is a dot with a name. Neither is more correct. The street map threw away the rest of the state to make room for the detail; the atlas threw away the detail to make room for the state. That is the same bargain as the projection, just about how much rather than about shape.

### Use an everyday object
Take the paper label off a soup can in one piece and lay it flat — it goes down perfectly, because a can is rolled from a flat sheet. Now try the same with the foil cap from a jar of jam, the domed kind. It will not lie down: you have to crease it, stretch it, or cut slits. A can can be flattened and a dome cannot, and the Earth is a dome in every direction. Every world map is that foil cap with the cuts hidden somewhere you weren't looking.

### Show me a diagram
Go back to SEE IT, stay on the first tab, and press the three buttons in order while watching only the readout. Globe: Africa measures 15.3 times Greenland. Mercator: 1.0 times. Equal-area: 14.0 times. Those numbers are measured off the shapes actually drawn on your screen, not quoted from a book. The same two countries, the same data, three pictures, and one of them is out by a factor of fourteen.

### Walk me through an example
Walk the A–B line on the second tab. Press "show it from the side" so you can see both at once. Start at A: the lines are close together and the side view climbs hard, reaching 1,676 feet about a fifth of the way along. Then the map's lines turn around and start descending; the side view drops into a saddle at 1,286 feet, halfway. Then they climb again, more gently this time — more space between them — to 1,504 feet. The whole walk is 0.92 miles. The lines on the left told you all of that before you ever looked at the side view.

### Break it into smaller steps
Three small questions. One: can a flat sheet be wrapped around a ball with no wrinkles? No — try it with paper and you will feel the answer in your hands. Two: so when somebody draws the ball on a flat sheet, must something come out wrong? Yes, necessarily. Three: can they at least choose *which* thing comes out wrong? Yes, and that choice is what the word "projection" means. The whole first half of this lesson is those three answers.

### Work backward from the answer
Start with the answer: Africa is about fourteen times the size of Greenland. Now ask what kind of map would have let you guess that, and what kind would have stopped you. A map that keeps sizes honest would have let you read it straight off. A map that keeps bearings straight — a sea chart — could not, because the two requirements pull in opposite directions. Work backward from the thing you want to know, and you discover which map you should have picked up.

## Understanding Map after this lesson
| Concept | Level (0–5) |
|---|---|
| Earth's shape | 5 |
| Latitude & longitude | 4 |
| Map projection | 4 |
| Contour lines & relief | 4 |
| Map scale | 4 |
| Legends & symbols | 3 |
| Direction vs. position | 4 |
| Position | 4 |
| Reference point | 4 |
| Poles, Equator & hemispheres | 4 |
| Degrees, minutes & seconds | 3 |
| The nautical mile | 3 |
| A chosen zero | 3 |
| Great circle | 2 |
| Magnetic north | 0 |
