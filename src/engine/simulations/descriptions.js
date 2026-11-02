// What each simulation shows, and what the learner can change.
//
// Written for the companion handbook: its diagrams should picture the same
// thing the simulation does, so this says what is on screen, what moves, and
// which numbers matter. `npm run lesson:export` puts it in the lesson export.
//
// Plain data with no JSX, so the export script can read it in node — and kept
// beside the simulations so it is edited when they are. A Navigation lesson
// whose simulation has no entry here fails the test suite.

export const descriptions = {
  'clue-map': {
    shows: `A park seen from above, 900 × 520. Two footpaths, a pond at the upper left, a cluster of woods at the right, a north arrow in the top corner and a scale bar reading 100 steps. Two reference points are marked and labelled: a water tower as an open ink circle at the upper right, and an old oak as a green disc near the centre.`,
    changes: `Five clue buttons, each toggling independently. Two of them — "I'm walking north" and "I can see the water tower" — draw nothing at all, which is the point. The other three each draw a shape: a solid line running due south from the tower, a dashed circle 300 steps around the tower, and a dotted circle 200 steps around the oak. A status line above the map names how many places she could be.`,
    numbers: `The tower sits 160 steps east and 180 steps north of the oak. The three shapes are chosen so the line meets the tower's circle at exactly one point, the two circles cross at two, and all three agree at a single spot 300 steps due south of the tower — which is also exactly 200 from the oak.`,
    handbook: `A diagram should show the same three shapes over the same two reference points, and the single crossing. The two useless clues are worth drawing too — as a map with nothing on it.`
  },

  'zoom-out': {
    shows: `A side-on slice of the ground, 900 px wide, with a dashed straight line across it labelled "a perfectly flat line" and the ground drawn beneath. A marker reads "You" at the centre. When the drop is big enough to see, a vertical bar at the right edge measures it. A caption always reads "Drawn to true scale — nothing exaggerated".`,
    changes: `Seven zoom stops: a backyard (100 feet), a neighborhood (1 mile), a county (25 miles), a state (about 280 miles), half a country (1,000 miles), coast to coast (about 2,800 miles), and the whole Earth. The view eases between them. The last stop cross-fades to a globe showing the axis, both poles, the Equator, the two hemispheres, an arrow reading "turns toward the east, once a day", and a marker at about 40° N.`,
    numbers: `Earth's radius is taken as 3,959 miles, and the drop across a span is R − √(R² − (span/2)²). That gives less than a thousandth of an inch across a backyard, about 2 inches across a mile, about 104 feet across a county, about 2.5 miles across a state, about 32 miles across a thousand, and about 256 miles coast to coast.`,
    handbook: `The curvature must not be exaggerated — that is the whole argument of the lesson. On a 900 px width the bend is under one pixel at county size and about eight pixels at state size. A handbook diagram that makes the bend obvious at small scales would illustrate the opposite of what the lesson says.`
  }
}

export const describe = (id) => descriptions[id] ?? null
