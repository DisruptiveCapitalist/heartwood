import { fmt, mk } from './algebra-util.js';

const TARGETS = [[3, 2], [-4, 1], [0, -3], [-2, -5]];
const walk = t => t <= 10 ? 0.08 * t : t <= 20 ? 0.8 : t <= 26 ? 0.8 - (t - 20) * (0.8 / 6) : 0;
const planA = m => 60 + 10 * m, planB = m => 25 * m;

const L16 = mk({
  n: 16, week: 4, index: 1, concept: 'coordinates',
  kicker: 'LESSON 16 · COORDINATES AND THE COORDINATE PLANE',
  title: 'Every point has an address',
  goal: 'Use two number lines at right angles to locate any point with an ordered pair, and read points from a graph.',
  hook: { learn: 'A city grid: “3 blocks east, 2 blocks north.” Two numbers, in a fixed order, find one exact spot. Put two number lines at right angles and you can give every point on a page an address like that.',
    refresh: 'Coordinates are quick to recover. Rebuild them as two number lines, and Week 4’s graphs follow.' },
  map: { coordinates: 3, numberline: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 'x', label: 'ACROSS  x', min: -6, max: 6, def: 0 }, { id: 'y', label: 'UP  y', min: -6, max: 6, def: 0 }],
      init: { hit: [] },
      buttons: [{ label: 'Plot a point here', primary: true, act: v => { const i = TARGETS.findIndex(([a, b]) => a === v.x && b === v.y); return { hit: i >= 0 && !(v.hit || []).includes(i) ? (v.hit || []).concat([i]) : (v.hit || []), last: i } } }],
      render: v => {
        const hit = v.hit || [], all = hit.length === TARGETS.length;
        const next = TARGETS.find((_, i) => !hit.includes(i));
        return { story: 'Plot each target: move across first (x), then up or down (y), and press “Plot a point here.”',
          big: '(' + fmt(v.x) + ', ' + fmt(v.y) + ')' + (next ? '      next target: (' + fmt(next[0]) + ', ' + fmt(next[1]) + ')' : '      all four plotted'),
          plot: { xr: [-6, 6], yr: [-6, 6], xname: 'x', yname: 'y',
            points: TARGETS.map(([a, b], i) => ({ x: a, y: b, r: 7, color: hit.includes(i) ? 'green' : '#fffdf7', ring: hit.includes(i) ? '#fffdf7' : 'mute', label: '(' + fmt(a) + ', ' + fmt(b) + ')' }))
              .concat([{ x: v.x, y: v.y, r: 6, color: 'accent' }]),
            segs: [{ x1: 0, y1: 0, x2: v.x, y2: 0, color: 'accent', dash: true }, { x1: v.x, y1: 0, x2: v.x, y2: v.y, color: 'accent', dash: true }] },
          alt: 'A coordinate plane from −6 to 6 on both axes, with four target points.',
          msg: all ? 'All four plotted. Notice (0, −3) sits on the y-axis — zero across — and the signs of x and y tell you which quarter of the plane you’re in.'
            : v.last === -1 ? 'Not a target. Check the order: across first (x), then up or down (y).' : hit.length ? hit.length + ' of 4 plotted.' : 'The dashed path shows the route: along the x-axis, then up or down.',
          ok: all, goal: all };
      } },
    prompt: { learn: 'Use the two sliders to move the orange point, and plot each target.' },
    observations: [
      'An ordered pair (x, y) means: x across from zero, then y up (or down if negative).',
      'Order matters: (3, 2) and (2, 3) are different points.',
      'The axes split the plane into four quarters. The signs of x and y tell you which one a point is in.'] },
  understand: {
    sentences: [
      'The coordinate plane is two number lines crossing at zero: the horizontal x-axis and the vertical y-axis. They meet at the origin, (0, 0).',
      'An ordered pair (x, y) locates a point: move x along the horizontal axis, then y along the vertical. Negative means left or down.',
      'Graphs use this to show relationships: each point pairs an input with an output, like (hours, cost) or (time, distance).'],
    worked: [
      { title: 'Plotting (3, 2)', steps: [
        { m: 'start at (0, 0)', w: 'The origin.' },
        { m: '3 → right 3', w: 'x first: across.' },
        { m: '2 → up 2', w: 'Then y: up.' }] },
      { title: 'Plotting (−4, 1)', steps: [
        { m: '−4 → left 4', w: 'Negative x goes left.' },
        { m: '1 → up 1', w: 'Positive y goes up.' }] }],
    guided: [
      { id: 'g1', kind: 'choice', q: 'Which point is 2 to the left of the origin and 5 up?', stuck: 'understand',
        options: [{ id: 'a', t: '(2, 5)', v: 'That’s 2 to the right. Left is negative.' }, { id: 'b', t: '(−2, 5)', correct: true, v: 'Yes: x = −2 (left 2), y = 5 (up 5).' }, { id: 'c', t: '(5, −2)', v: 'That swaps the order. x comes first.' }] },
      { id: 'g2', kind: 'number', q: 'What is the y-coordinate of the point (7, −3)?', label: 'y =', answer: -3, stuck: 'understand', success: 'Yes. The second number is y: 3 below the x-axis.',
        diag: [{ v: 7, type: 'reading', msg: '7 is the x-coordinate. The second number is y.' }], hints: ['(x, y): which comes second?'], worked: ['y = −3'] }],
    vocab: [
      { term: 'Axes', def: 'The two number lines: x horizontal, y vertical.' },
      { term: 'Origin', def: 'Where the axes cross: (0, 0).' },
      { term: 'Ordered pair', def: '(x, y) — two coordinates, in that order.' },
      { term: 'Quadrant', def: 'One of the four regions the axes make.' }],
    deeper: { title: 'Descartes’ big idea', paras: [
      'Coordinates let geometry become algebra: a circle becomes x² + y² = r², a line becomes y = mx + b. Shapes turn into equations, and equations into shapes. The idea is usually credited to René Descartes, which is why they’re called Cartesian coordinates.',
      'Distance comes straight from Pythagoras: between (x₁, y₁) and (x₂, y₂) it is √((x₂ − x₁)² + (y₂ − y₁)²). GPS, computer graphics and engineering drawings all work this way.'] } },
  connect: {
    items: [
      { t: 'A city street grid: “3rd Avenue and 2nd Street.”', p: 'all' },
      { t: 'Maps with grid references, like “B4.”', p: 'all' },
      { t: 'Seats in a theater: row and seat number.', p: 'learn,together' },
      { t: 'Spreadsheets: cell C7 is column C, row 7.', p: 'all' },
      { t: 'Latitude and longitude — coordinates on a sphere.', p: 'refresh,together' },
      { t: 'CNC machines and 3D printers move to (x, y, z) coordinates.', p: 'refresh,together' }],
    builder: { title: 'Let’s locate it', body: 'Put a piece of tape on the floor in one corner of a room as your origin. Measure how far a chair is along one wall (x) and out from it (y). Write the chair’s coordinates. Give them to someone else and see whether they can find the spot.' },
    own: 'Somewhere you find things with two numbers…',
    affirm: 'Good. Two numbers, a fixed order, and a starting point — that’s a coordinate system.' },
  feynman: { prompt: { learn: 'Explain to a friend how to find the point (−3, 4). Why does the order of the two numbers matter?' },
    checks: [
      { t: 'Starts from the origin or zero.', k: 'origin|zero|\\b0\\b|middle|centre|center' },
      { t: 'Says x is across (left for negative).', k: 'left|across|horizontal|x' },
      { t: 'Says y is up or down.', k: 'up|down|vertical|y' },
      { t: 'Says swapping the numbers gives a different point.', k: 'order|swap|different|switch|first' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · QUADRANTS', kind: 'choice', stuck: 'challenge', q: 'Where is the point (−3, −4)?',
      options: [{ id: 'a', t: 'Top right', v: 'Top right has both coordinates positive.' }, { id: 'b', t: 'Top left', v: 'Top left has x negative but y positive.' },
                { id: 'c', t: 'Bottom left', correct: true, v: 'Yes: left 3, down 4 — both negative.' }, { id: 'd', t: 'Bottom right', v: 'Bottom right has x positive.' }] },
    { id: 'c2', tier: '2 · DISTANCE ON A LINE', kind: 'number', label: 'units:', stuck: 'challenge', q: 'How far apart are (2, 3) and (2, 9)?', answer: 6,
      success: 'Yes. Same x, so they’re on a vertical line; 9 − 3 = 6.', hints: ['They have the same x. Compare the y’s.'], worked: ['9 − 3 = 6'] },
    { id: 'c3', tier: '3 · ON AN AXIS', kind: 'choice', stuck: 'challenge', q: 'Which point lies on the x-axis?',
      options: [{ id: 'a', t: '(5, 0)', correct: true, v: 'Yes: y = 0 means no distance up or down.' }, { id: 'b', t: '(0, 5)', v: 'That’s on the y-axis: zero across.' }, { id: 'c', t: '(5, 5)', v: 'That’s 5 up from the x-axis.' }] },
    { id: 'c4', tier: '4 · A SHAPE', kind: 'number', label: 'area:', stuck: 'challenge', q: 'A rectangle has corners (1, 1), (5, 1), (5, 4) and (1, 4). What is its area?', answer: 12,
      success: 'Yes: width 5 − 1 = 4, height 4 − 1 = 3, area 12.', diag: [{ v: 20, type: 'reading', msg: '20 uses 5 × 4 — the coordinates, not the side lengths. Width is 5 − 1.' }, { v: 14, type: 'meaning', msg: '14 is the perimeter. Area is width × height.' }],
      hints: ['Width: from x = 1 to x = 5. Height: from y = 1 to y = 4.'], worked: ['width 4, height 3', 'area 12'] },
    { id: 'c5', tier: 'STRETCH · MIDPOINT', kind: 'number', paths: 'refresh,together', label: 'x =', stuck: 'challenge', q: 'What is the x-coordinate of the midpoint of (−2, 3) and (6, 7)?', answer: 2,
      success: 'Yes: (−2 + 6) ÷ 2 = 2. The midpoint is (2, 5).', diag: [{ v: 4, type: 'arithmetic', msg: '4 is −2 + 6. Halve it: the midpoint is the average.' }], hints: ['Average the x-coordinates.'], worked: ['(−2 + 6) ÷ 2 = 2'] }] },
  reflect: { tomorrow: 'Next, Lesson 17: what a graph tells you — reading a relationship from its shape.', next: 17 },
  stuck: {
    see: { concept: 'plotting points', ways: [
      { type: 'SIMPLIFY IT', body: 'Ignore y. Set the x slider to the first number — the dashed line shows how far across. Only then set y.' },
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part?', options: [
        { l: 'Which number first', b: 'x first, always: across before up. “Along the corridor, then up the stairs.”' },
        { l: 'Negatives', b: 'Negative x is left of the y-axis; negative y is below the x-axis.' },
        { l: 'Zero', b: 'A zero coordinate means you don’t move in that direction. (0, −3) stays on the y-axis.' }] } }] }
  }
});

const L17 = mk({
  n: 17, week: 4, index: 2, concept: 'reading graphs',
  kicker: 'LESSON 17 · WHAT A GRAPH TELLS US',
  title: 'Reading a story from a shape',
  goal: 'Read values from a graph, identify the independent and dependent variables, and describe what the shape says about the relationship.',
  hook: { learn: 'A graph is a story told in one picture. Rising, flat, falling; steep or gentle. Today you learn to read it — before ever writing an equation for it.',
    refresh: 'Reading graphs qualitatively — what rising, flat and steep mean — is the bridge to slope in Lesson 18.' },
  map: { graphs: 3, coordinates: 4, relationship: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 't', label: 'TIME', min: 0, max: 30, def: 0, unit: ' min' }],
      render: v => {
        const d = walk(v.t);
        const phase = v.t <= 10 ? 'Walking away from home at a steady pace.' : v.t <= 20 ? 'Not moving — the distance from home isn’t changing. (At the shop?)' : v.t <= 26 ? 'Heading home — and faster: the line is steeper.' : 'Home again.';
        return { story: 'Someone walks to the shop and back. The graph shows their distance from home over time.',
          big: v.t + ' min:  ' + fmt(d) + ' km from home',
          plot: { xr: [0, 30], yr: [0, 1], xstep: 2, ystep: 0.1, xlab: 5, ylab: 2, xname: 'time (min)', yname: 'distance from home (km)',
            lines: [{ f: walk, color: 'blue', w: 3 }], points: [{ x: v.t, y: d, color: 'accent', r: 7 }],
            segs: [{ x1: v.t, y1: 0, x2: v.t, y2: d, dash: true }, { x1: 0, y1: d, x2: v.t, y2: d, dash: true }] },
          alt: 'A distance–time graph: rising for 10 minutes, flat for 10, then falling more steeply back to zero by 26 minutes.',
          msg: phase, ok: v.t >= 24, goal: v.t >= 24 };
      } },
    prompt: { learn: 'Slide the time along and read the distance. What is the person doing in each part?' },
    observations: [
      'Time is the independent variable — it runs along the bottom. Distance depends on it, so it goes up the side.',
      'Rising means moving away, flat means not moving, falling means coming back.',
      'Steeper means faster: the walk home covered the same distance in less time.'] },
  understand: {
    sentences: [
      'The independent variable is the one you choose or that just passes, like time; it goes on the horizontal axis. The dependent variable depends on it, and goes on the vertical axis.',
      'To read a value, go up from the input to the line, then across to the output axis.',
      'The shape tells the story: rising or falling shows the direction of change, flat shows no change, and steepness shows how fast the change is happening.'],
    worked: [
      { title: 'Reading the walk', steps: [
        { m: 't = 5', w: 'Go up from 5 minutes to the line.' },
        { m: 'd = 0.4 km', w: 'Then across to the distance axis.' },
        { m: '10 → 20 min: flat', w: 'Distance doesn’t change: they’re standing still.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'At 5 minutes, how far from home were they?', label: 'km:', answer: 0.4, stuck: 'understand', success: 'Yes: 0.4 km.',
        hints: ['Move the slider to 5.'], worked: ['Up from 5 min, across: 0.4 km'] },
      { id: 'g2', kind: 'choice', q: 'What does the flat part from 10 to 20 minutes mean?', stuck: 'understand',
        options: [{ id: 'a', t: 'They walked at a steady speed', v: 'A steady walk would make the distance change steadily — a sloped line. Flat means no change.' },
                  { id: 'b', t: 'They stayed in one place', correct: true, v: 'Yes. The distance from home stayed at 0.8 km for 10 minutes.' },
                  { id: 'c', t: 'They were home', v: 'Home would be distance 0. They were 0.8 km away.' }] }],
    vocab: [
      { term: 'Independent variable', def: 'The input — on the horizontal axis.' },
      { term: 'Dependent variable', def: 'The output that depends on it — on the vertical axis.' },
      { term: 'Increasing / decreasing', def: 'Rising or falling as you read left to right.' },
      { term: 'Rate of change', def: 'How fast the output changes as the input changes — shown by steepness.' }],
    deeper: { title: 'A graph is not a picture of the path', paras: [
      'A common misreading is to see a distance–time graph as a map of the route — as if the person climbed a hill. The vertical axis is distance from home, not height; the horizontal is time, not position.',
      'Engineers read graphs this way constantly: a flat region on a temperature–time graph during heating can mean a phase change (ice melting), where energy goes in but temperature doesn’t rise.'] } },
  connect: {
    items: [
      { t: 'A fitness app’s heart-rate graph during a workout.', p: 'all' },
      { t: 'A stock or savings balance over time.', p: 'all' },
      { t: 'A growth chart at the doctor’s office.', p: 'learn,together' },
      { t: 'Weather forecasts: temperature through the day.', p: 'all' },
      { t: 'A heating curve with a flat stretch while ice melts.', p: 'refresh,together' },
      { t: 'Electricity usage graphs on a smart meter.', p: 'refresh,together' }],
    builder: { title: 'Let’s graph it', body: 'Fill a bathtub or a sink and time it: note the water depth every 30 seconds while filling, then while it sits, then while it drains. Sketch depth against time. You’ll see rising, flat and falling — and whether draining is faster than filling.' },
    own: 'A graph you’ve seen recently and what it was saying…',
    affirm: 'Good. Rising, flat, falling, steep or gentle — that vocabulary reads almost any graph.' },
  feynman: { prompt: { learn: 'Tell the story of the walk graph in your own words. How do you know when they were fastest?' },
    checks: [
      { t: 'Describes going out (rising).', k: 'away|out|rising|went|walk(ed)? to' },
      { t: 'Describes the stop (flat).', k: 'stop|flat|stay|still|shop|wait' },
      { t: 'Describes coming back (falling).', k: 'back|home|return|falling|down' },
      { t: 'Says steeper means faster.', k: 'steep|faster|quick|less time' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · READ A VALUE', kind: 'number', label: 'km:', stuck: 'challenge', q: 'From the walk graph: how far from home at 15 minutes?', answer: 0.8, success: 'Yes — they were at the shop, 0.8 km away.', hints: ['Slide to 15.'], worked: ['0.8 km'] },
    { id: 'c2', tier: '2 · COMPARE', kind: 'choice', stuck: 'challenge', q: 'Were they faster walking out or walking back?',
      options: [{ id: 'a', t: 'Walking out', v: 'Out took 10 minutes for 0.8 km; back took 6. The steeper part is the return.' }, { id: 'b', t: 'Walking back', correct: true, v: 'Yes: the same 0.8 km in 6 minutes instead of 10 — a steeper line.' }, { id: 'c', t: 'The same', v: 'Compare the times: 10 minutes out, 6 back.' }] },
    { id: 'c3', tier: '3 · WHICH VARIABLE?', kind: 'choice', stuck: 'challenge', q: 'A graph shows a plant’s height over 8 weeks. Which is the dependent variable?',
      options: [{ id: 'a', t: 'Weeks', v: 'Weeks pass regardless — that’s the independent variable, on the horizontal axis.' }, { id: 'b', t: 'Height', correct: true, v: 'Yes: height depends on how much time has passed.' }] },
    { id: 'c4', tier: '4 · MATCH THE STORY', kind: 'choice', stuck: 'challenge', q: 'A graph of a bathtub’s water level rises, stays flat, then drops quickly to zero. Which story fits?',
      options: [{ id: 'a', t: 'It fills, someone bathes, then it drains', correct: true, v: 'Yes: rising while filling, flat while in use, a quick fall as it drains.' },
                { id: 'b', t: 'It drains, then fills', v: 'That would fall first, then rise.' }, { id: 'c', t: 'It fills slowly all the time', v: 'That would be a single rising line, with no flat or falling part.' }] },
    { id: 'c5', tier: 'STRETCH · A RATE', kind: 'number', paths: 'refresh,together', label: 'km/h:', stuck: 'challenge', q: 'The walk home covered 0.8 km in 6 minutes. What was the speed in km per hour?', answer: 8,
      success: 'Yes: 0.8 ÷ 6 × 60 = 8 km/h — a brisk walk or a slow jog.', diag: [{ v: 0.13, type: 'reading', msg: 'That’s km per minute. Multiply by 60 for km per hour.' }], hints: ['Find km per minute, then × 60.'], worked: ['0.8 ÷ 6 ≈ 0.133 km/min', '× 60 = 8 km/h'] }] },
  reflect: { tomorrow: 'Next, Lesson 18: putting a number on steepness — slope as rate of change.', next: 18 },
  stuck: {
    see: { concept: 'reading a graph', ways: [
      { type: 'SIMPLIFY IT', body: 'Ask one question of each part: is the distance from home getting bigger, staying the same, or getting smaller?' },
      { type: 'TRY IT TOGETHER', body: 'At 10 minutes the line is at 0.8 km.', turn: { q: 'Your turn: at 20 minutes, how far from home?', a: 0.8 } }] }
  }
});

const L18 = mk({
  n: 18, week: 4, index: 3, concept: 'slope',
  kicker: 'LESSON 18 · SLOPE AS CHANGE',
  title: 'How steep, as a number',
  goal: 'Measure slope as rise over run, recognize positive, negative, zero and undefined slope, and read slope as a practical rate.',
  hook: { learn: '“Steep” is a feeling. Slope turns it into a number: how far up you go for each step across. A wheelchair ramp, a roof and a pay rate all have one.',
    refresh: 'Slope is rate of change. Rebuild it from rise over run and it will connect straight to the rates in Week 3.' },
  map: { slope: 3, graphs: 4, ratio: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 'm', label: 'SLOPE', min: -3, max: 3, step: 0.5, def: 1, show: v => !v.vert }],
      init: { vert: false },
      buttons: [{ label: v => v.vert ? 'Back to a sloped line' : 'Make it vertical', act: v => ({ vert: !v.vert }) }],
      render: v => {
        if (v.vert) return { big: 'Vertical line:  slope undefined', note: 'Rise without any run: the rise ÷ run would divide by zero.',
          plot: { xr: [-5, 5], yr: [-5, 5], vlines: [{ x: 1, color: 'accent' }] }, alt: 'A vertical line at x = 1.', msg: 'A vertical line has no run at all, so rise ÷ run is undefined.', ok: true, goal: true };
        const m = v.m, f = x => m * x + 1;
        const kind = m > 0 ? 'positive — rises left to right' : m < 0 ? 'negative — falls left to right' : 'zero — perfectly flat';
        return { big: 'slope  =  rise ÷ run  =  ' + fmt(m) + ' ÷ 1  =  ' + fmt(m), note: 'Line: y = ' + (m === 0 ? '' : (m === 1 ? '' : m === -1 ? '−' : fmt(m)) + 'x + ') + '1',
          plot: { xr: [-5, 5], yr: [-5, 5], lines: [{ f, color: 'accent' }],
            segs: [{ x1: 1, y1: f(1), x2: 2, y2: f(1), color: 'blue', w: 2.5, label: 'run 1', dy: m >= 0 ? 16 : -8 }, { x1: 2, y1: f(1), x2: 2, y2: f(2), color: 'green', w: 2.5, label: 'rise ' + fmt(m), dx: 28 }],
            points: [{ x: 1, y: f(1), r: 5 }, { x: 2, y: f(2), r: 5 }] },
          alt: 'A line with slope ' + fmt(m) + ' and a rise-over-run triangle.',
          msg: 'Slope ' + fmt(m) + ': ' + kind + '. For every 1 step right, the line goes ' + (m >= 0 ? 'up ' : 'down ') + fmt(Math.abs(m)) + '.', ok: m < 0, goal: m < 0 };
      } },
    prompt: { learn: 'Change the slope. Watch the triangle: one step across, and the rise that goes with it. Try a negative, zero, then vertical.' },
    observations: [
      'Slope is the rise for each 1 of run. It’s the same anywhere on a straight line.',
      'Positive slopes rise left to right, negative slopes fall, and zero is flat.',
      'A vertical line has rise but no run — its slope is undefined.'] },
  understand: {
    sentences: [
      'Slope measures steepness: slope = rise ÷ run, the change in y divided by the change in x between any two points on the line.',
      'On a straight line the slope is the same everywhere — that’s what makes it straight. Positive means rising, negative falling, zero flat; a vertical line’s slope is undefined.',
      'Slope is a rate of change. On a cost-versus-hours graph, the slope is dollars per hour — exactly the unit rate from Lesson 13.'],
    worked: [
      { title: 'Slope through (1, 3) and (4, 9)', steps: [
        { m: 'rise = 9 − 3 = 6', w: 'Change in y.' },
        { m: 'run = 4 − 1 = 3', w: 'Change in x, in the same order.' },
        { m: 'slope = 6 ÷ 3 = 2', w: 'Up 2 for every 1 across.' }] },
      { title: 'A falling line: (0, 8) and (4, 0)', steps: [
        { m: 'rise = 0 − 8 = −8', w: 'y goes down.' },
        { m: 'run = 4 − 0 = 4', w: 'x goes right.' },
        { m: 'slope = −8 ÷ 4 = −2', w: 'Down 2 for every 1 across.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'What is the slope of the line through (0, 1) and (2, 7)?', label: 'slope:', answer: 3, stuck: 'understand', success: 'Yes: rise 6, run 2, slope 3.',
        diag: [{ v: 1 / 3, type: 'order', msg: 'That’s run ÷ rise. Slope is rise ÷ run: 6 ÷ 2.' }, { v: 6, type: 'reading', msg: '6 is the rise. Divide by the run, 2.' }], hints: ['Rise: 7 − 1. Run: 2 − 0.'], worked: ['rise 6, run 2', '6 ÷ 2 = 3'] },
      { id: 'g2', kind: 'choice', q: 'A horizontal line has slope…', stuck: 'understand',
        options: [{ id: 'a', t: '0', correct: true, v: 'Yes: no rise at all, so 0 ÷ run = 0.' }, { id: 'b', t: 'Undefined', v: 'Undefined is a vertical line — no run. A horizontal line has no rise: slope 0.' }, { id: 'c', t: '1', v: 'Slope 1 rises 1 for each 1 across. Horizontal doesn’t rise.' }] }],
    vocab: [
      { term: 'Slope', def: 'Rise ÷ run: the change in y per 1 change in x.' },
      { term: 'Rise', def: 'The vertical change between two points.' },
      { term: 'Run', def: 'The horizontal change between the same two points.' },
      { term: 'Rate of change', def: 'Slope with units: dollars per hour, metres per second.' }],
    deeper: { title: 'Slope in the real world', paras: [
      'Roads use percent grade: a 6% grade rises 6 feet per 100 feet of run, a slope of 0.06. US accessibility guidelines limit wheelchair ramps to 1 : 12 — a slope of about 0.083.',
      'In physics, the slope of a distance–time graph is speed; the slope of a speed–time graph is acceleration. Calculus generalizes slope to curves, where it changes from point to point.'] } },
  connect: {
    items: [
      { t: 'A road sign warning of a 7% grade.', p: 'all' },
      { t: 'Pay: the slope of earnings versus hours is the hourly rate.', p: 'all' },
      { t: 'A skateboard ramp or a slide: steeper is faster.', p: 'learn,together' },
      { t: 'Roof pitch: “6 in 12” means 6 inches of rise per 12 of run.', p: 'refresh,together' },
      { t: 'Wheelchair ramps: no steeper than 1 : 12 under US accessibility guidelines.', p: 'refresh,together' }],
    builder: { title: 'Let’s measure it', body: 'Find a ramp or a sloping driveway. Hold a level (or a straight board) horizontally from the high point, measure its length (run), and measure down to the slope (rise). Rise ÷ run is the slope. Compare with 1/12 ≈ 0.083.' },
    own: 'Something with a slope you see every day…',
    affirm: 'Good. Every one of those is “how much up for how much across” — or “how much change per unit.”' },
  feynman: { prompt: { learn: 'Explain what a slope of −2 means on a graph, and what it would mean if the graph showed money in a bank account over weeks.' },
    checks: [
      { t: 'Says for each 1 across, it goes down 2.', k: 'down 2|falls 2|decrease|goes down|drops' },
      { t: 'Mentions rise over run or change per step.', k: 'rise|run|per|each|for every' },
      { t: 'Says negative means falling.', k: 'negative|falling|downhill|decreas|less' },
      { t: 'Interprets it as losing $2 per week.', k: 'lose|losing|spend|\\$2|2 dollars|per week|each week' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · START HERE', kind: 'number', label: 'slope:', stuck: 'challenge', q: 'Slope through (2, 5) and (6, 13)?', answer: 2, success: 'Yes: rise 8, run 4, slope 2.',
      diag: [{ v: 0.5, type: 'order', msg: 'That’s run ÷ rise. Slope is rise ÷ run.' }], hints: ['Rise: 13 − 5. Run: 6 − 2.'], worked: ['8 ÷ 4 = 2'] },
    { id: 'c2', tier: '2 · FALLING', kind: 'number', label: 'slope:', stuck: 'challenge', q: 'Slope through (0, 8) and (4, 0)?', answer: -2, success: 'Yes: down 8 over 4 across, slope −2.',
      diag: [{ v: 2, type: 'sign', msg: 'The line falls from 8 to 0, so the rise is −8. Slope −2.' }], hints: ['Rise: 0 − 8.'], worked: ['−8 ÷ 4 = −2'] },
    { id: 'c3', tier: '3 · AS A RATE', kind: 'choice', stuck: 'challenge', q: 'A plumber charges $45 plus $30 an hour. On a graph of cost against hours, what is the slope?',
      options: [{ id: 'a', t: '45', v: '45 is where the line starts — the cost at 0 hours. That’s the intercept.' }, { id: 'b', t: '30', correct: true, v: 'Yes: cost rises $30 for each hour. Slope = rate.' }, { id: 'c', t: '75', v: '75 is the cost of one hour. The slope is the change per hour: $30.' }] },
    { id: 'c4', tier: '4 · SPECIAL CASES', kind: 'choice', stuck: 'challenge', q: 'What is the slope of the vertical line x = 3?',
      options: [{ id: 'a', t: '0', v: '0 is a horizontal line. A vertical line has no run.' }, { id: 'b', t: '3', v: '3 is where it crosses the x-axis, not its slope.' }, { id: 'c', t: 'Undefined', correct: true, v: 'Yes: run is 0, and rise ÷ 0 isn’t a number.' }] },
    { id: 'c5', tier: 'STRETCH · A RAMP', kind: 'number', paths: 'refresh,together', label: 'slope:', stuck: 'challenge', q: 'A ramp rises 1.5 feet over a run of 18 feet. What is its slope, as a decimal?', answer: 1.5 / 18,
      success: 'Yes: about 0.083 — exactly 1 : 12, the steepest US accessibility guidelines allow for a ramp.', diag: [{ v: 12, type: 'order', msg: '12 is run ÷ rise. Slope is rise ÷ run.' }], hints: ['1.5 ÷ 18'], worked: ['1.5 ÷ 18 ≈ 0.083'] }] },
  reflect: { tomorrow: 'Next, Lesson 19: the equation of a line — slope and starting point together.', next: 19 },
  stuck: {
    see: { concept: 'slope', ways: [
      { type: 'SIMPLIFY IT', body: 'Look only at the triangle: one step right (blue), then how far up or down (green). That up-or-down amount is the slope.' },
      { type: 'TRY IT TOGETHER', body: 'Set slope to 2: one step right, two up.', turn: { q: 'Your turn: with slope 2, how far up for 3 steps right?', a: 6 } }] },
    understand: { concept: 'rise over run', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part: which is rise, the sign, or the order of subtraction?', options: [
        { l: 'Rise vs run', b: 'Rise is up-down (y). Run is across (x). Slope = rise ÷ run.' },
        { l: 'The sign', b: 'If y goes down as you go right, the rise is negative, so the slope is negative.' },
        { l: 'Order of subtraction', b: 'Subtract in the same order for both: (y₂ − y₁) ÷ (x₂ − x₁).' }] } }] }
  }
});

const L19 = mk({
  n: 19, week: 4, index: 4, concept: 'the equation of a line',
  kicker: 'LESSON 19 · THE EQUATION OF A LINE',
  title: 'y = mx + b: a slope and a starting point',
  goal: 'Understand y = mx + b, find slope and intercept from a graph, table or two points, and move between equation, table and graph.',
  hook: { learn: 'Any straight line is fixed by two facts: where it starts and how steeply it climbs. A taxi: $3 to start, $2 a mile. That’s y = 2x + 3. Today you see how equation, table and graph are one idea in three forms.',
    refresh: 'y = mx + b — the most used equation in algebra. Rebuild what m and b mean, and how to find them from any form.' },
  map: { linear: 3, slope: 4, graphs: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 'm', label: 'SLOPE  m', min: -3, max: 3, step: 0.5, def: 1 }, { id: 'b', label: 'INTERCEPT  b', min: -5, max: 5, def: 0 }],
      render: v => {
        const f = x => v.m * x + v.b, hit = v.m === 2 && v.b === -2;
        return { story: 'Make your line pass through both target points: (0, −2) and (3, 4).',
          big: 'y = ' + (v.m === 0 ? '' : (v.m === 1 ? '' : v.m === -1 ? '−' : fmt(v.m)) + 'x ') + (v.m === 0 ? fmt(v.b) : (v.b >= 0 ? '+ ' : '− ') + fmt(Math.abs(v.b))),
          plot: { xr: [-5, 5], yr: [-6, 6], lines: [{ f, color: 'accent' }],
            points: [{ x: 0, y: -2, r: 7, color: hit ? 'green' : '#fffdf7', ring: hit ? '#fffdf7' : 'mute', label: '(0, −2)' }, { x: 3, y: 4, r: 7, color: hit ? 'green' : '#fffdf7', ring: hit ? '#fffdf7' : 'mute', label: '(3, 4)' }, { x: 0, y: v.b, r: 5, color: 'accent' }] },
          alt: 'A line y = ' + v.m + 'x + ' + v.b + ' and two target points.',
          table: { head: ['x', '0', '1', '2', '3'], rows: [['y', fmt(f(0)), fmt(f(1)), fmt(f(2)), fmt(f(3))]] },
          msg: hit ? 'Through both: y = 2x − 2. The intercept −2 is where it crosses the y-axis; the slope 2 is the rise from (0, −2) to (3, 4) — 6 up over 3 across.'
            : v.b === -2 ? 'The intercept is right: the line crosses the y-axis at −2. Now adjust the slope.' : 'Start with b: where must the line cross the y-axis?',
          ok: hit, goal: hit };
      } },
    prompt: { learn: 'Use the two sliders to make the line pass through both targets. Watch the table change too.' },
    observations: [
      'b is where the line crosses the y-axis — the value of y when x is 0. It’s the starting value.',
      'm is the slope — how much y changes for each 1 increase in x. Look at the table: each step adds m.',
      'Equation, table and graph are the same relationship. Change one and the others follow.'] },
  understand: {
    sentences: [
      'A linear equation y = mx + b describes a straight line. m is the slope, the constant rate of change; b is the y-intercept, the value of y when x = 0.',
      'In a table, b is the y-value next to x = 0, and m is how much y goes up each time x goes up by 1.',
      'From two points: find m = rise ÷ run, then put one point into y = mx + b and solve for b.'],
    worked: [
      { title: 'Through (0, −2) and (3, 4)', steps: [
        { m: 'b = −2', w: 'The point with x = 0 gives the intercept directly.' },
        { m: 'm = (4 − (−2)) ÷ (3 − 0) = 6 ÷ 3 = 2', w: 'Rise over run.' },
        { m: 'y = 2x − 2', w: 'Check with (3, 4): 2 × 3 − 2 = 4 ✓' }] },
      { title: 'From a table', steps: [
        { m: 'x: 0, 1, 2   y: 3, 5, 7', w: 'y goes up 2 each time x goes up 1: m = 2.' },
        { m: 'x = 0 → y = 3', w: 'b = 3.' },
        { m: 'y = 2x + 3', w: 'The taxi: $3 to start, $2 a mile.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'For y = 3x − 1, what is y when x = 4?', label: 'y =', answer: 11, stuck: 'understand', success: 'Yes: 3 × 4 − 1 = 11.',
        diag: [{ v: 8, type: 'order', msg: '8 is 3 × (4 − 1). Multiply first: 3 × 4, then subtract 1.' }], hints: ['Substitute x = 4.'], worked: ['3 × 4 − 1 = 11'] },
      { id: 'g2', kind: 'choice', q: 'Which line has slope −2 and y-intercept 5?', stuck: 'understand',
        options: [{ id: 'a', t: 'y = 5x − 2', v: 'That swaps them: slope 5, intercept −2.' }, { id: 'b', t: 'y = −2x + 5', correct: true, v: 'Yes: m = −2 multiplies x; b = 5 is added.' }, { id: 'c', t: 'y = −2 + 5', v: 'That has no x — it’s just the number 3.' }] }],
    vocab: [
      { term: 'Linear equation', def: 'An equation whose graph is a straight line, like y = mx + b.' },
      { term: 'Slope (m)', def: 'The constant rate of change.' },
      { term: 'y-intercept (b)', def: 'Where the line crosses the y-axis; the value of y at x = 0.' },
      { term: 'Slope–intercept form', def: 'Writing a line as y = mx + b.' }],
    deeper: { title: 'Other forms of the same line', paras: [
      'Point–slope form, y − y₁ = m(x − x₁), builds the line from one point and the slope; it’s often quicker when you don’t know b. Standard form, Ax + By = C, is handy for systems of equations in Week 5.',
      'In science, the intercept is often an offset — a reading when the input is zero — and the slope is a sensitivity or a material property, such as a spring’s stiffness or a wire’s resistance.'] } },
  connect: {
    items: [
      { t: 'A taxi fare: y = 2x + 3 — $3 to start, $2 a mile.', p: 'all' },
      { t: 'A phone plan: base fee plus a rate per gigabyte.', p: 'all' },
      { t: 'Saving: start with $50 and add $20 a week: y = 20x + 50.', p: 'learn,together' },
      { t: 'Celsius to Fahrenheit: F = 1.8C + 32 — slope 1.8, intercept 32.', p: 'refresh,together' },
      { t: 'Calibrating a sensor: reading = sensitivity × input + offset.', p: 'refresh,together' }],
    builder: { title: 'Let’s measure it', body: 'Hang a small bag from a rubber band and measure the band’s length. Add coins one at a time, measuring after each. Plot length against coins. Within a reasonable range it’s close to a line: the intercept is the band’s unloaded length; the slope is the stretch per coin.' },
    own: 'Something with a starting amount and a steady rate…',
    affirm: 'Good. Start plus rate times amount — that’s y = mx + b every time.' },
  feynman: { prompt: { learn: 'In y = 2x + 3, what do the 2 and the 3 each tell you — on the graph, and in the taxi story?' },
    checks: [
      { t: 'Says 2 is the slope — up 2 for each 1 across.', k: 'slope|steep|up 2|each|per|rate' },
      { t: 'Says 3 is where the line crosses the y-axis, or the starting value.', k: 'intercept|cross|start|x = 0|beginning|y-axis' },
      { t: 'Connects 2 to $2 a mile.', k: '\\$2|2 dollars|per mile|each mile|a mile' },
      { t: 'Connects 3 to the $3 starting fee.', k: '\\$3|3 dollars|start|fixed|flag|before' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · READ THE SLOPE', kind: 'number', label: 'm =', stuck: 'challenge', q: 'What is the slope of y = 4x + 7?', answer: 4, success: 'Yes: the number multiplying x.', diag: [{ v: 7, type: 'reading', msg: '7 is the intercept. The slope multiplies x.' }], hints: ['Which number is with x?'], worked: ['m = 4'] },
    { id: 'c2', tier: '2 · READ THE INTERCEPT', kind: 'number', label: 'b =', stuck: 'challenge', q: 'What is the y-intercept of y = −x + 3?', answer: 3, success: 'Yes: the line crosses the y-axis at 3.', diag: [{ v: -1, type: 'reading', msg: '−1 is the slope (−x means −1 × x). The intercept is the constant.' }], hints: ['What is y when x = 0?'], worked: ['b = 3'] },
    { id: 'c3', tier: '3 · USE IT', kind: 'number', label: 'y =', stuck: 'challenge', q: 'A line has y-intercept 5 and slope −2. What is y when x = 3?', answer: -1, success: 'Yes: y = −2 × 3 + 5 = −1.',
      diag: [{ v: 11, type: 'sign', msg: '11 uses slope +2. With −2: −6 + 5.' }], hints: ['y = −2x + 5'], worked: ['−2 × 3 + 5 = −1'] },
    { id: 'c4', tier: '4 · FROM A TABLE', kind: 'choice', stuck: 'challenge', q: 'x: 0, 1, 2 and y: 3, 5, 7. Which equation fits?',
      options: [{ id: 'a', t: 'y = 3x + 2', v: 'At x = 0 that gives 2, not 3.' }, { id: 'b', t: 'y = 2x + 3', correct: true, v: 'Yes: starts at 3, goes up 2 each step.' }, { id: 'c', t: 'y = x + 3', v: 'At x = 1 that gives 4, not 5.' }] },
    { id: 'c5', tier: 'STRETCH · FROM TWO POINTS', kind: 'number', paths: 'refresh,together', label: 'b =', stuck: 'challenge', q: 'A line passes through (1, 4) and (3, 10). What is its y-intercept?', answer: 1,
      success: 'Yes: m = 6 ÷ 2 = 3, then 4 = 3 × 1 + b, so b = 1. The line is y = 3x + 1.', diag: [{ v: 3, type: 'reading', msg: '3 is the slope. Now use a point to find b: 4 = 3 × 1 + b.' }], hints: ['Find m first: rise ÷ run.', 'Then 4 = 3(1) + b.'], worked: ['m = 3', '4 = 3 + b', 'b = 1'] }] },
  reflect: { tomorrow: 'Next, Lesson 20: comparing two payment plans with graphs and equations.', next: 20 },
  stuck: {
    see: { concept: 'slope and intercept', ways: [
      { type: 'SIMPLIFY IT', body: 'Do one slider at a time. First move b until the line crosses the y-axis at −2. Then change m until it reaches (3, 4).' },
      { type: 'TRY IT TOGETHER', body: 'Set b to −2. From (0, −2) to (3, 4) is 6 up and 3 across.', turn: { q: 'Your turn: 6 ÷ 3 — what slope?', a: 2 } }] }
  }
});

const L20 = mk({
  n: 20, week: 4, index: 5, concept: 'comparing linear relationships',
  kicker: 'LESSON 20 · REVIEW AND CHALLENGE',
  title: 'Two payment plans',
  goal: 'Compare two linear relationships with graphs and equations, find where they’re equal, and explain what the graph reveals.',
  hook: { learn: 'Plan A: $60 up front, then $10 a month. Plan B: nothing up front, $25 a month. Which is cheaper? It depends on how long you keep it — and the graph shows exactly when the answer changes.',
    refresh: 'Week 4 in one problem: two lines, two equations, one crossing point that means something.' },
  map: { linear: 4, slope: 4, graphs: 4, bothsides: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 'mo', label: 'MONTHS', min: 0, max: 10, def: 1 }],
      render: v => {
        const a = planA(v.mo), b = planB(v.mo);
        return { story: 'Plan A: $60 to start + $10 a month.   Plan B: $0 to start + $25 a month.',
          big: v.mo + ' months:   A $' + a + '   ·   B $' + b + (a === b ? '   — equal' : a < b ? '   — A cheaper' : '   — B cheaper'),
          plot: { xr: [0, 10], yr: [0, 260], ystep: 20, ylab: 2, yunit: '$', xname: 'months', yname: 'total cost',
            lines: [{ f: planA, color: 'accent', label: 'A', labelAt: 9 }, { f: planB, color: 'blue', label: 'B', labelAt: 8.5 }],
            points: [{ x: v.mo, y: a, color: 'accent', r: 6 }, { x: v.mo, y: b, color: 'blue', r: 6 }, { x: 4, y: 100, color: '#fffdf7', ring: 'ink', r: 5, label: '(4, $100)', dx: -12, dy: -12, anchor: 'end' }],
            segs: [{ x1: v.mo, y1: 0, x2: v.mo, y2: Math.max(a, b), dash: true }] },
          alt: 'Two lines: A starts at $60 with slope 10, B starts at $0 with slope 25. They cross at 4 months, $100.',
          msg: v.mo === 4 ? 'They cross at 4 months, both $100. Before that B is cheaper; after it, A is. The crossing is the solution of 60 + 10m = 25m.' : 'The lines cross somewhere. Find the month where both cost the same.',
          ok: v.mo === 4, goal: v.mo === 4 };
      } },
    prompt: { learn: 'Slide through the months. Where do the plans cost the same? Which is cheaper before and after?' },
    observations: [
      'Each plan is a line: the intercept is the up-front cost, the slope is the monthly cost.',
      'Where the lines cross, both plans cost the same — the solution of 60 + 10m = 25m.',
      'Before the crossing the line with the lower start is cheaper; after it, the one with the gentler slope wins.'] },
  understand: {
    sentences: [
      'Each plan is a linear relationship: total = start + rate × months. On the graph, start is the intercept and rate is the slope.',
      'The plans cost the same where their lines cross. Algebraically: set the two expressions equal and solve — an equation with the unknown on both sides, from Lesson 9.',
      'The answer is a decision: which plan is cheaper depends on which side of the crossing you’re on.'],
    worked: [
      { title: 'When are they equal?', steps: [
        { m: '60 + 10m = 25m', w: 'Plan A’s total equals Plan B’s.' },
        { m: '60 = 15m', w: 'Subtract 10m from both sides.' },
        { m: 'm = 4', w: 'Divide by 15. Check: 60 + 40 = 100 and 25 × 4 = 100 ✓' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'What does Plan A cost for 6 months?', label: '$', answer: 120, stuck: 'understand', success: 'Yes: 60 + 10 × 6 = 120.',
        diag: [{ v: 420, type: 'order', msg: '420 is (60 + 10) × 6. The $60 is charged once.' }], hints: ['60 + 10m with m = 6'], worked: ['60 + 60 = 120'] }],
    vocab: [
      { term: 'Break-even point', def: 'Where two options cost the same — where their lines cross.' },
      { term: 'Fixed cost', def: 'A one-off amount — the intercept.' },
      { term: 'Variable cost', def: 'A cost per unit — the slope.' }],
    deeper: { title: 'Parallel plans and the limits of the model', paras: [
      'If two plans had the same monthly rate, their lines would be parallel: one would always be cheaper, and the equation would have no solution — Lesson 9’s special case, seen as a picture.',
      'Real contracts have cancellation fees, price rises and discounts. The linear model tells you the shape of the decision; reading the small print tells you whether the model applies.'] } },
  connect: {
    items: [
      { t: 'Phone contracts: a cheap phone with a higher monthly fee, or the reverse.', p: 'all' },
      { t: 'Renting versus buying equipment.', p: 'all' },
      { t: 'Gym memberships with different joining fees.', p: 'learn,together' },
      { t: 'An efficient appliance that costs more but saves on running costs.', p: 'refresh,together' }],
    builder: { title: 'Let’s decide it', body: 'Pick two real options you’ve compared — two phone plans, two streaming bundles, two cars’ fuel costs. Write each as start + rate × time and find where they cross. Is the crossing sooner or later than you’d have guessed?' },
    own: 'A choice you made between a cheaper start and a cheaper rate…',
    affirm: 'Good. The crossing point turns “it depends” into a specific answer.' },
  feynman: { prompt: { learn: 'Explain what the crossing point of the two plan lines means, and how you’d decide which plan to choose.' },
    checks: [
      { t: 'Says the crossing is where both cost the same.', k: 'same|equal|both cost|cross' },
      { t: 'Gives the crossing: 4 months or $100.', k: '\\b4\\b|four|\\$?100' },
      { t: 'Says which is cheaper before and after.', k: 'before|after|less than|more than|shorter|longer' },
      { t: 'Ties the decision to how long you’ll keep it.', k: 'how long|months|keep|depend' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · EVALUATE', kind: 'number', label: '$', stuck: 'challenge', q: 'What does Plan B cost for 6 months?', answer: 150, success: 'Yes: 25 × 6 = 150.', hints: ['25m with m = 6'], worked: ['25 × 6 = 150'] },
    { id: 'c2', tier: '2 · DECIDE', kind: 'choice', stuck: 'challenge', q: 'You expect to keep the plan for 8 months. Which is cheaper?',
      options: [{ id: 'a', t: 'Plan A', correct: true, v: 'Yes: A costs $140, B costs $200. After 4 months A is always cheaper.' }, { id: 'b', t: 'Plan B', v: 'At 8 months B is $200 and A is $140.' }, { id: 'c', t: 'The same', v: 'They’re only equal at 4 months.' }] },
    { id: 'c3', tier: '3 · A NEW PAIR', kind: 'number', label: 'visits:', stuck: 'challenge', q: 'Gym X: $30 plus $8 a visit. Gym Y: $50 plus $4 a visit. After how many visits do they cost the same?', answer: 5,
      success: 'Yes: 30 + 8v = 50 + 4v → 4v = 20 → v = 5, both $70.', check: v => 'At ' + fmt(v) + ' visits: X $' + fmt(30 + 8 * v) + ', Y $' + fmt(50 + 4 * v) + '.',
      hints: ['30 + 8v = 50 + 4v'], worked: ['30 + 8v = 50 + 4v', '4v = 20', 'v = 5'] },
    { id: 'c4', tier: '4 · MEANING OF SLOPE', kind: 'choice', stuck: 'challenge', q: 'What does the slope of Plan B’s line mean?',
      options: [{ id: 'a', t: '$25 per month', correct: true, v: 'Yes: the cost rises $25 for each month.' }, { id: 'b', t: 'The starting cost', v: 'The starting cost is the intercept — $0 for B.' }, { id: 'c', t: 'The total cost', v: 'The total depends on the months. Slope is the change per month.' }] },
    { id: 'c5', tier: 'STRETCH · A THIRD PLAN', kind: 'number', paths: 'refresh,together', label: 'months:', stuck: 'challenge', q: 'Plan C: $100 up front, $5 a month. After how many months does C cost the same as A?', answer: 8,
      success: 'Yes: 100 + 5m = 60 + 10m → 40 = 5m → m = 8. After that, C is the cheapest of the three.', hints: ['100 + 5m = 60 + 10m'], worked: ['40 = 5m', 'm = 8'] }] },
  reflect: { tomorrow: 'Next, Week 5 begins with Lesson 21: problems with two unknowns.', next: 21 },
  stuck: {
    see: { concept: 'comparing two lines', ways: [
      { type: 'SIMPLIFY IT', body: 'At each month, compare the two dots. The lower dot is the cheaper plan. Find the month where they’re at the same height.' },
      { type: 'TRY IT TOGETHER', body: 'At 3 months: A is 60 + 30 = $90, B is 75.', turn: { q: 'Your turn: at 5 months, what does B cost?', a: 125 } }] }
  }
});

export const W4 = { 16: L16, 17: L17, 18: L18, 19: L19, 20: L20 };
