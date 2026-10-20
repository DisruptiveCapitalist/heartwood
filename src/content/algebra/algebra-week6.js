import { fmt, mk } from './algebra-util.js';

const RULES = [
  { name: 'f(x) = 2x + 3', f: x => 2 * x + 3, sub: x => '2 × ' + fmt(x) + ' + 3' },
  { name: 'g(x) = x²', f: x => x * x, sub: x => fmt(x) + ' × ' + fmt(x) },
  { name: 'h(x) = 10 − x', f: x => 10 - x, sub: x => '10 − ' + (x < 0 ? '(' + fmt(x) + ')' : fmt(x)) }];
const FORMULAS = [
  { tab: 'Temperature', s: 'c', expr: 'F = 1.8C + 32', f: c => 1.8 * c + 32, inLab: 'C', unit: ' °F', kind: 'EXACT — this is how the two scales are defined.' },
  { tab: 'Distance', s: 'h', expr: 'd = r × t   (r = 60 km/h)', f: t => 60 * t, inLab: 't', unit: ' km', kind: 'EXACT for a steady speed — real trips speed up and slow down, so for them it’s an estimate.' },
  { tab: 'Ohm’s law', s: 'i', expr: 'V = I × R   (R = 6 Ω)', f: i => 6 * i, inLab: 'I (amps)', unit: ' V', kind: 'A MODEL — very accurate for ordinary resistors at steady temperature; it fails for things like LEDs.' },
  { tab: 'Simple interest', s: 'y', expr: 'I = P × r × t   ($500 at 4%)', f: t => 500 * 0.04 * t, inLab: 't (years)', unit: '', pre: '$', kind: 'EXACT for simple interest — most savings accounts compound instead, which grows faster.' }];

const L26 = mk({
  n: 26, week: 6, index: 1, concept: 'functions',
  kicker: 'LESSON 26 · WHAT IS A FUNCTION?',
  title: 'Input, rule, output',
  goal: 'Understand a function as a rule giving exactly one output for each input, use function notation, and see the same function as a table, a graph and an equation.',
  hook: { learn: 'A vending machine: press B4, get crisps — every time. Press B4 and sometimes get crisps and sometimes a drink, and the machine is broken. A function is a rule that never does that: one input, one output.',
    refresh: 'Functions and f(x) notation — the language most of later mathematics is written in. It’s mostly ideas you already have, with a new name.' },
  map: { functions: 3, expression: 4, graphs: 4 },
  see: { visual: 'generic', generic: {
      tabs: RULES.map(r => r.name),
      sliders: [{ id: 'x', label: 'INPUT  x', min: -4, max: 6, def: 2 }],
      render: v => {
        const R = RULES[v.tab], y = R.f(v.x);
        return { big: R.name.split('=')[0].replace('x', fmt(v.x)) + '= ' + R.sub(v.x) + ' = ' + fmt(y),
          note: 'Input ' + fmt(v.x) + '  →  rule  →  output ' + fmt(y),
          plot: { xr: [-4, 6], yr: [-6, 20], ystep: 2, ylab: 2, lines: [{ f: R.f, color: 'accent' }], points: [{ x: v.x, y, color: 'accent', r: 7, label: '(' + fmt(v.x) + ', ' + fmt(y) + ')' }] },
          alt: 'Graph of ' + R.name,
          table: { head: ['x', '−2', '0', '1', '2', '3', '4'], rows: [['output'].concat([-2, 0, 1, 2, 3, 4].map(x => fmt(R.f(x))))] },
          msg: v.tab === 1 ? 'Every input still gives exactly one output — though 2 and −2 give the same one, 4. That’s allowed: one output per input, not one input per output.' : 'One input, one output. The graph is every (input, output) pair at once.',
          ok: v.tab === 1, goal: v.tab === 1 };
      } },
    prompt: { learn: 'Try each rule. Change the input and watch the output — in the equation, the table and the graph.' },
    observations: [
      'Each input gave exactly one output. That’s what makes a rule a function.',
      'f(3) is just a short way to say “the output when the input is 3.”',
      'The equation, the table and the graph are three views of the same function.'] },
  understand: {
    sentences: [
      'A function is a rule that assigns exactly one output to each input. Different inputs may share an output; one input may never have two.',
      'Function notation names the rule: f(x) = 2x + 3. Then f(4) means “put 4 in”: f(4) = 2 × 4 + 3 = 11. The brackets don’t mean multiply.',
      'A function can be shown as an equation, a table or a graph. On a graph, a vertical line never meets a function’s curve more than once.'],
    worked: [
      { title: 'Evaluating f(x) = 2x + 3', steps: [
        { m: 'f(4)', w: 'The output when the input is 4.' },
        { m: '= 2 × 4 + 3', w: 'Replace x with 4.' },
        { m: '= 11', w: 'So the point (4, 11) is on the graph.' }] },
      { title: 'Is it a function?', steps: [
        { m: 'person → birthday', w: 'Each person has exactly one birthday: a function.' },
        { m: 'birthday → person', w: 'One birthday can belong to many people: not a function.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'f(x) = 2x + 3. What is f(4)?', label: 'f(4) =', answer: 11, stuck: 'understand', success: 'Yes.', diag: [{ v: 24, type: 'notation', msg: 'f(4) doesn’t mean f × 4. It means: put 4 into the rule.' }], hints: ['Replace x with 4.'], worked: ['2 × 4 + 3 = 11'] },
      { id: 'g2', kind: 'choice', q: 'Which of these is NOT a function?', stuck: 'understand',
        options: [{ id: 'a', t: 'A table where input 2 gives 5, and input 3 gives 5', v: 'That’s fine — two inputs may share an output.' }, { id: 'b', t: 'A table where input 2 gives 5, and input 2 also gives 7', correct: true, v: 'Yes: one input with two outputs breaks the rule.' }, { id: 'c', t: 'y = x²', v: 'Each x gives one value of x². It’s a function.' }] }],
    vocab: [
      { term: 'Function', def: 'A rule giving exactly one output for each input.' },
      { term: 'Input / output', def: 'What goes in (often x) and what comes out (often y or f(x)).' },
      { term: 'Function notation', def: 'f(x): the output of function f for input x.' },
      { term: 'Domain', def: 'The inputs a function accepts.' }],
    deeper: { title: 'Composing and inverting', paras: [
      'Functions can be chained: if g(x) = x² and f(x) = 2x + 1, then f(g(3)) = f(9) = 19. Composition is how complex models are built from simple parts.',
      'An inverse function undoes another: the inverse of f(x) = 2x + 3 is x = (y − 3) ÷ 2. Solving an equation, from Lesson 7 onward, has been finding inverses all along.'] } },
  connect: {
    items: [
      { t: 'A vending machine: each button gives one item.', p: 'all' },
      { t: 'A spreadsheet formula: each input cell gives one result.', p: 'all' },
      { t: 'A temperature conversion: each °C has exactly one °F.', p: 'all' },
      { t: 'Postage: each weight band has one price.', p: 'learn,together' },
      { t: 'A sensor’s calibration curve: reading → physical value.', p: 'refresh,together' }],
    builder: { title: 'Let’s test it', body: 'Pick any recipe-style rule from your life — “cooking time = 20 minutes per pound plus 20” for a roast is a common one. Write it as f(w). Work out f(3) and f(5). Is it a function? What inputs make sense?' },
    own: 'A rule in your life with one output for each input…',
    affirm: 'Good. One input in, exactly one output out — every time.' },
  feynman: { prompt: { learn: 'Explain what makes a rule a function, and what f(3) means, to someone who has never seen the notation.' },
    checks: [
      { t: 'Says each input gives exactly one output.', k: 'one output|exactly one|only one|each input|single' },
      { t: 'Says f(3) is the output for input 3.', k: 'put 3|input 3|when x is 3|x = 3|output' },
      { t: 'Says the brackets don’t mean multiply.', k: 'not multipl|doesn’t mean times|not times|isn’t times' },
      { t: 'Gives an example.', k: 'example|like|machine|\\d' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · EVALUATE', kind: 'number', label: 'g(3) =', stuck: 'challenge', q: 'g(x) = x² − 1. What is g(3)?', answer: 8, success: 'Yes: 9 − 1.', diag: [{ v: 4, type: 'meaning', msg: '4 uses 3 × 2 − 1… x² means 3 × 3.' }], hints: ['3² = 9'], worked: ['9 − 1 = 8'] },
    { id: 'c2', tier: '2 · NEGATIVE INPUT', kind: 'number', label: 'f(−1) =', stuck: 'challenge', q: 'f(x) = 5x − 2. What is f(−1)?', answer: -7, success: 'Yes: −5 − 2 = −7.', diag: [{ v: 3, type: 'sign', msg: '5 × (−1) is −5, not 5.' }], hints: ['5 × (−1) = −5'], worked: ['−5 − 2 = −7'] },
    { id: 'c3', tier: '3 · WORK BACKWARD', kind: 'number', label: 'a =', stuck: 'challenge', q: 'f(x) = 3x − 12. For what input a is f(a) = 0?', answer: 4, success: 'Yes: 3a − 12 = 0 → a = 4.', hints: ['Solve 3a − 12 = 0.'], worked: ['3a = 12', 'a = 4'] },
    { id: 'c4', tier: '4 · IS IT A FUNCTION?', kind: 'choice', stuck: 'challenge', q: 'Which is a function?',
      options: [{ id: 'a', t: 'Each person → their birthday', correct: true, v: 'Yes: everyone has exactly one birthday.' }, { id: 'b', t: 'Each birthday → a person born that day', v: 'Many people share a birthday, so one input has many outputs.' }] },
    { id: 'c5', tier: 'STRETCH · COMPOSING', kind: 'number', paths: 'refresh,together', label: '=', stuck: 'challenge', q: 'f(x) = 2x + 1 and g(x) = x². What is f(g(3))?', answer: 19, success: 'Yes: g(3) = 9, then f(9) = 19.', diag: [{ v: 49, type: 'order', msg: '49 is g(f(3)) — the other order. Do the inside first: g(3).' }], hints: ['Inside first: g(3).'], worked: ['g(3) = 9', 'f(9) = 19'] }] },
  reflect: { tomorrow: 'Next, Lesson 27: linear functions — constant rate of change.', next: 27 },
  stuck: { see: { concept: 'inputs and outputs', ways: [
    { type: 'SIMPLIFY IT', body: 'Read f(x) = 2x + 3 as a machine: double what goes in, then add 3.' },
    { type: 'TRY IT TOGETHER', body: 'Put in 1: double it (2), add 3 (5). So f(1) = 5.', turn: { q: 'Your turn: f(5) = ?', a: 13 } }] } }
});

const L27 = mk({
  n: 27, week: 6, index: 2, concept: 'linear functions',
  kicker: 'LESSON 27 · LINEAR FUNCTIONS',
  title: 'A constant rate of change',
  goal: 'Recognize a linear function by its constant rate of change, read its starting value and slope in context, and interpret them.',
  hook: { learn: 'Every taxi company charges a starting fee and a rate per mile. Change the two numbers and you change the whole function. Today you see why constant change always makes a straight line.',
    refresh: 'Linear functions as f(x) = mx + b, with m and b read as rate and starting value — the bridge from Week 4 to modeling.' },
  map: { linear: 4, functions: 4, slope: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 's', label: 'START FEE', min: 0, max: 8, step: 0.5, def: 3, pre: '$' }, { id: 'r', label: 'PER MILE', min: 0.5, max: 4, step: 0.5, def: 2, pre: '$' }],
      render: v => {
        const f = m => v.s + v.r * m, hit = v.s === 5 && v.r === 1.5;
        return { story: 'Company B charges $5 to start and $1.50 a mile. Set the sliders to make f match Company B.',
          big: 'f(m) = ' + fmt(v.s) + ' + ' + fmt(v.r) + 'm      f(10) = $' + fmt(f(10)),
          plot: { xr: [0, 10], yr: [0, 45], ystep: 5, yunit: '$', xname: 'miles', yname: 'fare', lines: [{ f: m => 5 + 1.5 * m, color: 'mute', w: 2, dash: true, label: 'B', labelAt: 9 }, { f, color: 'accent' }], points: [{ x: 0, y: v.s, color: 'accent', r: 6 }] },
          alt: 'Your fare line and Company B’s dashed line.',
          table: { head: ['miles', '0', '1', '2', '3', '4'], rows: [['fare'].concat([0, 1, 2, 3, 4].map(m => '$' + fmt(f(m)))), ['change', '', '+' + fmt(v.r), '+' + fmt(v.r), '+' + fmt(v.r), '+' + fmt(v.r)]] },
          msg: hit ? 'Matched. The start fee is the intercept; the rate per mile is the slope — and the table goes up by the same $1.50 every mile.' : 'Notice the “change” row: the fare goes up by the same amount every mile. That constant change is what makes it linear.',
          ok: hit, goal: hit };
      } },
    prompt: { learn: 'Adjust the two sliders to match Company B. Watch the “change” row in the table.' },
    observations: [
      'Equal steps in input gave equal steps in output — a constant rate of change.',
      'The starting value is the intercept; the rate is the slope.',
      'Changing the rate changes the steepness; changing the start moves the line up or down.'] },
  understand: {
    sentences: [
      'A linear function changes by the same amount for every equal step in its input. That constant rate of change is its slope.',
      'It can always be written f(x) = mx + b: m is the rate of change, b is the starting value — the output when x = 0.',
      'To test a table: look at the differences between outputs for equal input steps. If they’re all the same, it’s linear.'],
    worked: [
      { title: 'Reading a linear function', steps: [
        { m: 'f(m) = 3 + 2m', w: 'Starts at $3, rises $2 a mile.' },
        { m: 'm: 0, 1, 2, 3  →  3, 5, 7, 9', w: 'Differences: 2, 2, 2. Constant.' },
        { m: 'f(10) = 3 + 20 = 23', w: 'A 10-mile ride costs $23.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'f(m) = 5 + 1.5m. What is f(10)?', label: '$', answer: 20, stuck: 'understand', success: 'Yes: 5 + 15 = 20.', diag: [{ v: 65, type: 'order', msg: '65 is (5 + 1.5) × 10. Multiply first: 1.5 × 10.' }], hints: ['1.5 × 10 = 15'], worked: ['5 + 15 = 20'] },
      { id: 'g2', kind: 'choice', q: 'Which table is linear?', stuck: 'understand',
        options: [{ id: 'a', t: 'x: 0, 1, 2, 3   y: 1, 4, 7, 10', correct: true, v: 'Yes: it goes up 3 each time.' }, { id: 'b', t: 'x: 0, 1, 2, 3   y: 1, 2, 4, 8', v: 'The differences are 1, 2, 4 — not constant. That’s doubling.' }, { id: 'c', t: 'x: 0, 1, 2, 3   y: 0, 1, 4, 9', v: 'Differences 1, 3, 5 — not constant. That’s x².' }] }],
    vocab: [
      { term: 'Linear function', def: 'A function with a constant rate of change: f(x) = mx + b.' },
      { term: 'Rate of change', def: 'How much the output changes per 1 unit of input.' },
      { term: 'Initial value', def: 'The output when the input is 0 — the intercept.' }],
    deeper: { title: 'Why constant change makes a straight line', paras: [
      'If every step right of 1 unit raises the output by m, then the triangle between any two points has rise m × run. All those triangles are similar, so every pair of points has the same slope — and that’s exactly a straight line.',
      'Many physical laws are linear over a range: Hooke’s law for springs, Ohm’s law for resistors, thermal expansion. Engineers often linearize a curve near the point they care about, because linear models are easy to reason with.'] } },
  connect: {
    items: [
      { t: 'Taxi fares and delivery charges.', p: 'all' },
      { t: 'Hourly pay plus a fixed bonus.', p: 'all' },
      { t: 'A plant growing a steady amount each week.', p: 'learn,together' },
      { t: 'Thermal expansion: a steel rail lengthens by about 0.012 mm per metre per °C.', p: 'refresh,together' }],
    builder: { title: 'Let’s measure it', body: 'Fill a glass with water in equal pours from a small cup, measuring the height after each. If the glass has straight sides, the height rises the same amount each pour: a linear function. In a tapered glass it won’t — try both.' },
    own: 'Something that grows or shrinks by the same amount each step…',
    affirm: 'Good. Same change, every step: linear.' },
  feynman: { prompt: { learn: 'How can you tell from a table whether a function is linear? And what do m and b mean in f(x) = mx + b for a taxi fare?' },
    checks: [
      { t: 'Says check whether outputs change by the same amount.', k: 'same amount|constant|differences|goes up by|each time' },
      { t: 'Says m is the rate (per mile).', k: 'rate|per mile|slope|each mile' },
      { t: 'Says b is the starting value (the fee).', k: 'start|fee|intercept|fixed|beginning' },
      { t: 'Gives an example.', k: '\\d' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · EVALUATE', kind: 'number', label: 'cm:', stuck: 'challenge', q: 'A plant is 4 cm tall and grows 1.5 cm a week: h(w) = 4 + 1.5w. What is h(6)?', answer: 13, success: 'Yes: 4 + 9 = 13 cm.', hints: ['1.5 × 6 = 9'], worked: ['4 + 9 = 13'] },
    { id: 'c2', tier: '2 · INTERPRET', kind: 'choice', stuck: 'challenge', q: 'In h(w) = 4 + 1.5w, what does 1.5 mean?',
      options: [{ id: 'a', t: 'The height at the start', v: 'That’s the 4.' }, { id: 'b', t: 'Centimetres of growth per week', correct: true, v: 'Yes: the rate of change.' }, { id: 'c', t: 'The number of weeks', v: 'Weeks are the input, w.' }] },
    { id: 'c3', tier: '3 · WORK BACKWARD', kind: 'number', label: 'weeks:', stuck: 'challenge', q: 'When will the plant be 19 cm tall?', answer: 10, success: 'Yes: 4 + 1.5w = 19 → w = 10.', hints: ['Solve 4 + 1.5w = 19.'], worked: ['1.5w = 15', 'w = 10'] },
    { id: 'c4', tier: '4 · LINEAR OR NOT?', kind: 'choice', stuck: 'challenge', q: 'x: 0, 1, 2, 3 and y: 1, 4, 9, 16. Linear?',
      options: [{ id: 'a', t: 'Yes', v: 'Differences are 3, 5, 7 — not constant.' }, { id: 'b', t: 'No', correct: true, v: 'Right: differences 3, 5, 7. It’s (x + 1)², a curve — Lesson 28.' }] },
    { id: 'c5', tier: 'STRETCH', kind: 'number', paths: 'refresh,together', label: 'x =', stuck: 'challenge', q: 'f(x) = 3x + 2 and g(x) = 5x − 6. For what x are they equal?', answer: 4, success: 'Yes: 3x + 2 = 5x − 6 → 8 = 2x → x = 4 (both give 14).', hints: ['Set them equal.'], worked: ['8 = 2x', 'x = 4'] }] },
  reflect: { tomorrow: 'Next, Lesson 28: relationships that aren’t straight lines.', next: 28 },
  stuck: { see: { concept: 'constant rate of change', ways: [
    { type: 'SIMPLIFY IT', body: 'Set the start fee first — where the line begins on the left. Then set the rate — how steeply it climbs.' }] } }
});

const L28 = mk({
  n: 28, week: 6, index: 3, concept: 'nonlinear relationships',
  kicker: 'LESSON 28 · NONLINEAR RELATIONSHIPS',
  title: 'When the line bends',
  goal: 'Recognize that not all relationships are straight lines, and meet the quadratic pattern — through area, falling objects and changing differences.',
  hook: { learn: 'Double the side of a square and its perimeter doubles. Its area doesn’t — it goes up four times. Some relationships curve, and the curve has a pattern you can see in a table.',
    refresh: 'An introduction to quadratics through pictures and tables, with very little symbol work.' },
  map: { nonlinear: 3, functions: 4, linear: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 's', label: 'SIDE', min: 0, max: 8, step: 0.5, def: 2, unit: ' cm' }],
      render: v => {
        const A = v.s * v.s, P = 4 * v.s;
        return { story: 'A square with side s. Perimeter P = 4s grows in a straight line. Area A = s² curves.',
          big: 's = ' + fmt(v.s) + ':   P = ' + fmt(P) + ' cm,   A = ' + fmt(A) + ' cm²',
          plot: { xr: [0, 8], yr: [0, 64], ystep: 8, xname: 'side (cm)', lines: [{ f: s => 4 * s, color: 'blue', label: 'P = 4s', labelAt: 7.2 }, { f: s => s * s, color: 'accent', label: 'A = s²', labelAt: 6.6 }],
            points: [{ x: v.s, y: P, color: 'blue', r: 6 }, { x: v.s, y: A, color: 'accent', r: 6 }, { x: 4, y: 16, color: '#fffdf7', ring: 'ink', r: 5, label: 'equal at s = 4', dx: -10, dy: -12, anchor: 'end' }] },
          alt: 'A straight line P = 4s and a curve A = s², crossing at s = 4.',
          table: { head: ['s', '1', '2', '3', '4', '5', '6'], rows: [['A = s²', 1, 4, 9, 16, 25, 36], ['change', '', '+3', '+5', '+7', '+9', '+11']] },
          msg: v.s > 4 ? 'Past s = 4 the area overtakes the perimeter and pulls away. Look at the “change” row: it grows by 2 each time — the fingerprint of a quadratic.' : 'For small squares the perimeter number is bigger. Keep going.',
          ok: v.s >= 6, goal: v.s >= 6 };
      } },
    prompt: { learn: 'Grow the square. Compare the straight line and the curve, and look at the “change” row in the table.' },
    observations: [
      'Perimeter rose by the same amount each step — linear. Area rose by more each time — nonlinear.',
      'Area’s changes went 3, 5, 7, 9: they themselves change by a constant 2. That’s the quadratic pattern.',
      'Doubling the side quadrupled the area. Squaring makes things grow faster and faster.'] },
  understand: {
    sentences: [
      'A relationship is nonlinear when its rate of change isn’t constant: equal steps in the input give unequal steps in the output, and the graph curves.',
      'Quadratic relationships involve a square, like A = s² or d = 4.9t². In a table, the first differences change but the second differences are constant.',
      'Many real things are quadratic: area, the distance a dropped object falls, a car’s stopping distance as speed rises.'],
    worked: [
      { title: 'Spotting a quadratic', steps: [
        { m: 's: 1, 2, 3, 4  →  A: 1, 4, 9, 16', w: 'The outputs.' },
        { m: 'first differences: 3, 5, 7', w: 'Not constant — not linear.' },
        { m: 'second differences: 2, 2', w: 'Constant — quadratic.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'A square 6 cm on a side: what is its area?', label: 'cm²:', answer: 36, stuck: 'understand', success: 'Yes: 6 × 6.', diag: [{ v: 24, type: 'meaning', msg: '24 is the perimeter. Area is s × s.' }, { v: 12, type: 'meaning', msg: '12 is 6 × 2. s² means 6 × 6.' }], hints: ['s² = s × s'], worked: ['6 × 6 = 36'] },
      { id: 'g2', kind: 'choice', q: 'If you double a square’s side, its area becomes…', stuck: 'understand',
        options: [{ id: 'a', t: 'twice as big', v: 'Try it: side 3 → area 9; side 6 → area 36. Four times.' }, { id: 'b', t: 'four times as big', correct: true, v: 'Yes: (2s)² = 4s².' }, { id: 'c', t: 'the same', v: 'Side 3 → 9, side 6 → 36.' }] }],
    vocab: [
      { term: 'Nonlinear', def: 'A relationship whose graph isn’t a straight line.' },
      { term: 'Quadratic', def: 'A relationship involving a square, like y = x²; its graph is a parabola.' },
      { term: 'Parabola', def: 'The U-shaped (or upside-down U) curve of a quadratic.' },
      { term: 'Second differences', def: 'The differences between the differences — constant for a quadratic.' }],
    deeper: { title: 'Other shapes of growth', paras: [
      'Exponential growth multiplies by the same factor each step — 1, 2, 4, 8 — and eventually outgrows any quadratic. Compound interest and unchecked populations grow this way.',
      'Stopping distance has a reaction part that’s linear in speed and a braking part that’s roughly quadratic: double your speed and braking distance roughly quadruples. That’s why speed limits near schools matter so much.'] } },
  connect: {
    items: [
      { t: 'Pizza sizes: a 16-inch pizza has four times the area of an 8-inch one.', p: 'all' },
      { t: 'A dropped ball falls about 4.9t² metres in t seconds (ignoring air resistance).', p: 'all' },
      { t: 'The arc of a thrown ball is close to a parabola.', p: 'learn,together' },
      { t: 'Braking distance grows roughly with the square of speed.', p: 'refresh,together' },
      { t: 'Satellite dishes and headlights use parabolic shapes to focus signals and light.', p: 'refresh,together' }],
    builder: { title: 'Let’s compare it', body: 'Compare menu prices: an 8-inch pizza versus a 16-inch. The bigger one has four times the area. Is its price four times as much? Usually not — divide price by area to see which is better value.' },
    own: 'Something that grows faster and faster…',
    affirm: 'Good. When doubling the input more than doubles the output, look for a square.' },
  feynman: { prompt: { learn: 'Explain why doubling a square’s side quadruples its area, and how you’d tell from a table that a relationship isn’t linear.' },
    checks: [
      { t: 'Says area is side times side.', k: 'side times side|s × s|s\\*s|squared|s²' },
      { t: 'Explains the four (2 × 2).', k: 'four|4|2 × 2|twice.*twice|both' },
      { t: 'Says linear means equal changes.', k: 'same change|equal|constant|differences' },
      { t: 'Says the changes here aren’t equal.', k: 'not the same|growing|bigger each|not constant|3, 5, 7' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · AREA', kind: 'number', label: 'cm²:', stuck: 'challenge', q: 'Area of a square with side 10 cm?', answer: 100, success: 'Yes.', diag: [{ v: 40, type: 'meaning', msg: '40 is the perimeter.' }], hints: ['10 × 10'], worked: ['100'] },
    { id: 'c2', tier: '2 · LINEAR OR NOT?', kind: 'choice', stuck: 'challenge', q: 'x: 0, 1, 2, 3 and y: 0, 2, 8, 18. Linear?',
      options: [{ id: 'a', t: 'Linear', v: 'Differences 2, 6, 10 — not constant.' }, { id: 'b', t: 'Not linear', correct: true, v: 'Right. Second differences are 4, 4: quadratic (it’s y = 2x²).' }] },
    { id: 'c3', tier: '3 · A FALLING BALL', kind: 'number', label: 'm:', stuck: 'challenge', q: 'A dropped ball falls about d = 4.9t² metres after t seconds. How far after 2 seconds?', answer: 19.6, success: 'Yes: 4.9 × 4 = 19.6 m.', diag: [{ v: 9.8, type: 'meaning', msg: '9.8 is 4.9 × 2. t² means 2 × 2 = 4.' }, { v: 96.04, type: 'order', msg: 'Only t is squared, not 4.9t.' }], hints: ['t² = 4'], worked: ['4.9 × 4 = 19.6'] },
    { id: 'c4', tier: '4 · WHICH WINS?', kind: 'choice', stuck: 'challenge', q: 'For large x, which is bigger: 100x or x²?',
      options: [{ id: 'a', t: '100x', v: 'At first, yes — but at x = 200, 100x is 20,000 and x² is 40,000.' }, { id: 'b', t: 'x²', correct: true, v: 'Yes: once x passes 100, x² is always bigger, and pulls away.' }] },
    { id: 'c5', tier: 'STRETCH', kind: 'choice', paths: 'refresh,together', stuck: 'challenge', q: 'Braking distance roughly quadruples when speed…',
      options: [{ id: 'a', t: 'doubles', correct: true, v: 'Yes: braking distance is roughly proportional to speed squared, and 2² = 4.' }, { id: 'b', t: 'quadruples', v: 'That would make it about 16 times as long.' }] }] },
  reflect: { tomorrow: 'Next, Lesson 29: algebra in the world — real formulas, and how exact they are.', next: 29 },
  stuck: { see: { concept: 'curves', ways: [
    { type: 'SIMPLIFY IT', body: 'Ignore the graph. Look at the table: perimeter adds 4 every step. Area adds 3, then 5, then 7 — more each time.' }] } }
});

const L29 = mk({
  n: 29, week: 6, index: 4, concept: 'formulas in the world',
  kicker: 'LESSON 29 · ALGEBRA IN THE WORLD',
  title: 'Real formulas, and how far to trust them',
  goal: 'Use real formulas from science, engineering and finance — and distinguish exact definitions from useful models and rough illustrations.',
  hook: { learn: 'You’ve met many formulas in this course. Some are exact by definition. Some are excellent models with limits. Some are rough rules of thumb. Today you use real ones — and learn to ask which kind each is.',
    refresh: 'Formulas from engineering, science and finance, with a habit worth keeping: always ask what assumptions a formula carries.' },
  map: { modeling: 4, functions: 4, linear: 4 },
  see: { visual: 'generic', generic: {
      tabs: FORMULAS.map(f => f.tab),
      sliders: [{ id: 'c', label: '°C', min: -20, max: 40, def: 20, show: v => v.tab === 0 }, { id: 'h', label: 'HOURS', min: 0, max: 5, step: 0.5, def: 2, show: v => v.tab === 1 },
                { id: 'i', label: 'AMPS', min: 0, max: 5, step: 0.5, def: 2, show: v => v.tab === 2 }, { id: 'y', label: 'YEARS', min: 0, max: 10, def: 3, show: v => v.tab === 3 }],
      init: { seen: [0] },
      onTab: i => ({}),
      render: v => {
        const F = FORMULAS[v.tab], x = v[F.s], y = F.f(x);
        return { story: F.expr, big: F.inLab + ' = ' + fmt(x) + '   →   ' + (F.pre || '') + fmt(y) + F.unit,
          note: F.kind,
          plot: { xr: v.tab === 0 ? [-20, 40] : v.tab === 3 ? [0, 10] : [0, 5], yr: v.tab === 0 ? [-10, 110] : v.tab === 1 ? [0, 300] : v.tab === 2 ? [0, 30] : [0, 200],
            xstep: v.tab === 0 ? 10 : 1, ystep: v.tab === 0 ? 10 : v.tab === 1 ? 50 : v.tab === 2 ? 5 : 20, ylab: v.tab === 0 || v.tab === 3 ? 2 : 1,
            lines: [{ f: F.f, color: 'accent' }], points: [{ x, y, color: 'accent', r: 7 }] },
          alt: 'Graph of ' + F.expr,
          msg: 'Every one of these is a linear function — but only some are exact. Knowing which is part of using them well.', ok: v.tab === 3, goal: v.tab === 3 };
      } },
    prompt: { learn: 'Try each formula. Read the note under it: is it exact, a model, or an estimate?' },
    observations: [
      'Temperature conversion is exact — it’s how the scales are defined.',
      'Distance = rate × time and Ohm’s law are models: accurate under assumptions (steady speed, ordinary resistors).',
      'Simple interest is exact for what it describes — but most real accounts compound, which is a different formula.'] },
  understand: {
    sentences: [
      'A formula is a relationship written in symbols. Some are definitions and exact; others are models that fit reality under certain conditions.',
      'Check the units: in V = IR, volts = amps × ohms. If the units don’t work, the formula has been misused.',
      'Ask what assumptions a formula carries — steady speed, constant temperature, no compounding — and whether they hold in your situation.'],
    worked: [
      { title: 'Ohm’s law', steps: [
        { m: 'V = IR', w: 'Voltage = current × resistance.' },
        { m: 'I = 2 A,  R = 6 Ω', w: 'Substitute.' },
        { m: 'V = 12 V', w: 'Accurate for a resistor at steady temperature.' }] },
      { title: 'Simple interest', steps: [
        { m: 'I = P × r × t', w: 'Principal × rate × time.' },
        { m: '500 × 0.04 × 3 = 60', w: '$60 of interest after 3 years.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'V = IR. If I = 2 amps and R = 6 ohms, what is V?', label: 'volts:', answer: 12, stuck: 'understand', success: 'Yes: 2 × 6.', hints: ['Multiply.'], worked: ['2 × 6 = 12'] }],
    vocab: [
      { term: 'Formula', def: 'A relationship between quantities written in symbols.' },
      { term: 'Definition', def: 'An exact relationship by agreement, like °F and °C.' },
      { term: 'Model', def: 'A formula that fits reality under stated assumptions.' },
      { term: 'Units', def: 'What each quantity is measured in; they must balance like the numbers do.' }],
    deeper: { title: 'Dimensional analysis', paras: [
      'Engineers check formulas by units alone. Distance = rate × time works because (km/h) × h = km. If a calculation gives km/h², something is wrong before you look at a single number.',
      'Compound interest, A = P(1 + r)ᵗ, is exponential rather than linear. Over long periods the difference from simple interest is large — which is why it matters which formula a lender or a savings account is actually using.'] } },
  connect: {
    items: [
      { t: 'Converting oven temperatures between °C and °F.', p: 'all' },
      { t: 'Estimating travel time from distance and average speed.', p: 'all' },
      { t: 'Working out paint from wall area and coverage per litre.', p: 'all' },
      { t: 'Sizing a fuse or a cable from current and voltage.', p: 'refresh,together' },
      { t: 'Comparing simple and compound interest on a loan offer.', p: 'refresh,together' }],
    builder: { title: 'Let’s estimate it', body: 'Measure a wall and multiply length × height for its area. Check a paint tin for its coverage — often around 10 m² per litre per coat. Divide. Then ask: is coverage exact, or an estimate that depends on the surface?' },
    own: 'A formula you use, and how exact you think it is…',
    affirm: 'Good. Using a formula well means knowing when to trust it.' },
  feynman: { prompt: { learn: 'Pick one formula from today. Explain what each letter means, give its units, and say whether it’s exact or a model — and why.' },
    checks: [
      { t: 'Names what each letter stands for.', k: 'stands for|means|is the|represents' },
      { t: 'Gives units.', k: 'volt|amp|ohm|km|hour|degree|dollar|\\$|°|metre|unit' },
      { t: 'Says whether it’s exact or a model.', k: 'exact|model|approximat|estimate|definition' },
      { t: 'Gives a reason or assumption.', k: 'because|assum|steady|constant|depends|only when|defined' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · INTEREST', kind: 'number', label: '$', stuck: 'challenge', q: 'Simple interest on $500 at 4% a year for 3 years?', answer: 60, success: 'Yes: 500 × 0.04 × 3 = 60.', diag: [{ v: 6000, type: 'notation', msg: '4% is 0.04, not 4.' }], hints: ['4% = 0.04'], worked: ['500 × 0.04 × 3 = 60'] },
    { id: 'c2', tier: '2 · TEMPERATURE', kind: 'number', label: '°F:', stuck: 'challenge', q: 'What is −10 °C in °F?  F = 1.8C + 32', answer: 14, success: 'Yes: −18 + 32 = 14 °F.', diag: [{ v: 50, type: 'sign', msg: '1.8 × (−10) is −18, not +18.' }], hints: ['1.8 × (−10) = −18'], worked: ['−18 + 32 = 14'] },
    { id: 'c3', tier: '3 · EXACT OR MODEL?', kind: 'choice', stuck: 'challenge', q: 'Which relationship is exact by definition, not an approximation?',
      options: [{ id: 'a', t: 'F = 1.8C + 32', correct: true, v: 'Yes: the two scales are defined so this holds exactly.' }, { id: 'b', t: 'Travel time = distance ÷ average speed', v: 'Exact for the average, but real speeds vary, so predictions are estimates.' }, { id: 'c', t: 'Paint needed = area ÷ 10', v: '10 m² per litre is a typical coverage figure; it depends on the surface.' }] },
    { id: 'c4', tier: '4 · PAINT', kind: 'number', label: 'litres:', stuck: 'challenge', q: 'Paint covers about 10 m² per litre. A wall is 3 m by 4.5 m. How many litres for one coat?', answer: 1.35, success: 'Yes: 13.5 m² ÷ 10 = 1.35 L — so buy a bit more.', diag: [{ v: 13.5, type: 'reading', msg: '13.5 is the area in m². Divide by the coverage.' }], hints: ['Area = 3 × 4.5'], worked: ['13.5 ÷ 10 = 1.35'] },
    { id: 'c5', tier: 'STRETCH · TRAVEL', kind: 'number', paths: 'refresh,together', label: 'hours:', stuck: 'challenge', q: 'd = rt. How long to drive 150 km at a steady 60 km/h?', answer: 2.5, success: 'Yes: t = d ÷ r = 2.5 hours. In real traffic, treat it as a minimum.', hints: ['t = d ÷ r'], worked: ['150 ÷ 60 = 2.5'] }] },
  reflect: { tomorrow: 'Next, Lesson 30: the final challenge — explain, solve and apply.', next: 30 },
  stuck: { see: { concept: 'using a formula', ways: [
    { type: 'SIMPLIFY IT', body: 'A formula is a recipe with blanks. Put your number in place of the letter and do the arithmetic.' }] } }
});

const L30 = mk({
  n: 30, week: 6, index: 5, concept: 'putting it all together',
  kicker: 'LESSON 30 · FINAL CHALLENGE',
  title: 'Explain, solve and apply',
  goal: 'Solve a practical problem by identifying the unknown, choosing a representation, solving, checking — and explaining why the method works.',
  hook: { learn: 'A club is selling T-shirts to raise money. Every idea in this course has a part to play: relationships, expressions, equations, proportions, graphs, systems and functions. There’s more than one good way through.',
    refresh: 'The capstone. Use whichever methods you prefer — and explain them.' },
  map: { modeling: 5, linear: 5, systems: 4, functions: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 'n', label: 'SHIRTS SOLD', min: 0, max: 60, def: 10 }],
      render: v => {
        const R = 15 * v.n, Cst = 6 * v.n + 180, P = R - Cst;
        return { story: 'Shirts sell for $15 each. Each costs $6 to print, plus a $180 setup fee. The club wants $270 profit.',
          big: v.n + ' shirts:  revenue $' + R + ',  cost $' + Cst + ',  profit ' + (P < 0 ? '−$' + (-P) : '$' + P),
          plot: { xr: [0, 60], yr: [0, 900], xstep: 5, ystep: 100, xlab: 2, ylab: 2, yunit: '$', xname: 'shirts', lines: [{ f: n => 15 * n, color: 'green', label: 'revenue 15n', labelAt: 52 }, { f: n => 6 * n + 180, color: 'red', label: 'cost 6n + 180', labelAt: 54 }],
            points: [{ x: v.n, y: R, color: 'green', r: 6 }, { x: v.n, y: Cst, color: 'red', r: 6 }, { x: 20, y: 300, color: '#fffdf7', ring: 'ink', r: 5, label: 'break even', dx: -10, anchor: 'end' }],
            segs: [{ x1: v.n, y1: Math.min(R, Cst), x2: v.n, y2: Math.max(R, Cst), color: P >= 0 ? 'green' : 'red', dash: true }] },
          alt: 'Revenue and cost lines crossing at 20 shirts.',
          msg: v.n === 50 ? '50 shirts gives exactly $270 profit: 9n − 180 = 270. The gap between the lines is the profit; it grows $9 for each shirt.' : v.n === 20 ? 'Break-even: revenue equals cost at 20 shirts. Every shirt after that adds $9 of profit.' : 'The gap between the two lines is the profit (or loss). Find the goal.',
          ok: v.n === 50, goal: v.n === 50 };
      } },
    prompt: { learn: 'Find the break-even point, then the number of shirts that reaches the $270 goal. Use the graph, the numbers, or both.' },
    observations: [
      'Revenue and cost are both linear functions; profit is the gap between them, 9n − 180.',
      'Where the lines cross, the club breaks even — the solution of a system.',
      'The goal is an equation: 9n − 180 = 270. The graph, a table and the equation all give n = 50.'] },
  understand: {
    sentences: [
      'Identify: the unknown is the number of shirts, n. Represent: revenue = 15n; cost = 6n + 180; profit = 15n − (6n + 180) = 9n − 180.',
      'Solve: the goal is 9n − 180 = 270, so 9n = 450 and n = 50. A graph or a table gets the same answer — choose the one that suits you.',
      'Check and explain: 50 shirts bring in $750 and cost $480, a $270 profit ✓. It works because each shirt adds $9 more than it costs, and the first 20 only cover the setup fee.'],
    worked: [
      { title: 'Three routes to the same answer', steps: [
        { m: 'Equation: 9n − 180 = 270  →  n = 50', w: 'Add 180, divide by 9.' },
        { m: 'Reasoning: 180 ÷ 9 = 20 to break even; 270 ÷ 9 = 30 more', w: 'Each shirt nets $9.' },
        { m: 'Graph: where the gap between the lines is $270', w: 'At n = 50.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'How many shirts to break even?', label: 'shirts:', answer: 20, stuck: 'understand', success: 'Yes: 15n = 6n + 180 → 9n = 180 → n = 20.', diag: [{ v: 12, type: 'meaning', msg: '12 is 180 ÷ 15 — it ignores the $6 printing cost per shirt.' }], hints: ['Revenue = cost: 15n = 6n + 180.'], worked: ['9n = 180', 'n = 20'] }],
    vocab: [
      { term: 'Revenue', def: 'Money coming in.' },
      { term: 'Profit', def: 'Revenue minus cost.' },
      { term: 'Break-even', def: 'Where profit is zero — revenue equals cost.' }],
    deeper: { title: 'Where this goes next', paras: [
      'If raising the price sells fewer shirts, revenue becomes price × (a number that depends on price) — a quadratic, with a best price at the top of the curve. Finding that maximum is a classic problem in Algebra II and calculus.',
      'Everything you did here — naming unknowns, writing relationships, solving, checking against the situation — is the same process engineers, scientists and analysts use on much larger problems.'] } },
  connect: {
    items: [
      { t: 'A bake sale, a car wash, any fundraiser with setup costs.', p: 'all' },
      { t: 'Pricing a small business product.', p: 'all' },
      { t: 'Deciding whether a side project is worth it.', p: 'refresh,together' },
      { t: 'Planning a school event budget.', p: 'learn,together' }],
    builder: { title: 'Let’s plan it', body: 'Plan a small real sale: lemonade, cookies, or something you make. Write down a setup cost, a cost per item and a price. Find the break-even number and the number for a goal you choose — then sanity-check whether you could sell that many.' },
    own: 'A project of your own you could plan this way…',
    affirm: 'Good. That’s the whole course, working on something real.' },
  feynman: { prompt: { learn: 'Explain your solution to the T-shirt problem from start to finish: the unknown, how you represented it, how you solved it, how you checked it, and why the method works.' },
    checks: [
      { t: 'Names the unknown.', k: 'unknown|let|n is|number of shirts' },
      { t: 'Gives the profit relationship or equation.', k: '9n|15n|6n|profit =|180' },
      { t: 'Reaches 50 shirts.', k: '\\b50\\b|fifty' },
      { t: 'Checks it.', k: 'check|750|480|270' },
      { t: 'Explains why: each shirt adds $9.', k: '\\$?9|nine|each shirt|per shirt|setup' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · EVALUATE', kind: 'number', label: '$', stuck: 'challenge', q: 'What is the profit if 30 shirts are sold?', answer: 90, success: 'Yes: 9 × 30 − 180 = 90.', diag: [{ v: 270, type: 'reading', msg: '270 is 9 × 30 before the setup fee.' }], hints: ['9n − 180'], worked: ['270 − 180 = 90'] },
    { id: 'c2', tier: '2 · REPRESENT', kind: 'choice', stuck: 'challenge', q: 'Which representation shows the break-even point most directly?',
      options: [{ id: 'a', t: 'Where the revenue and cost lines cross on the graph', correct: true, v: 'Yes — you can see it at a glance. The equation gives it exactly.' }, { id: 'b', t: 'The price of one shirt', v: 'That alone doesn’t include costs.' }, { id: 'c', t: 'The setup fee', v: 'That’s one piece; break-even needs revenue and cost together.' }] },
    { id: 'c3', tier: '3 · CHANGE THE PRICE', kind: 'number', label: 'shirts:', stuck: 'challenge', q: 'If the price rises to $18, how many shirts to break even?', answer: 15, success: 'Yes: 12n = 180 → n = 15.', diag: [{ v: 10, type: 'meaning', msg: '10 is 180 ÷ 18 — the $6 cost per shirt still applies. Each shirt nets $12.' }], hints: ['Each shirt now nets 18 − 6.'], worked: ['12n = 180', 'n = 15'] },
    { id: 'c4', tier: '4 · INTERPRET', kind: 'choice', stuck: 'challenge', q: 'For a $300 profit at $15, 9n − 180 = 300 gives n = 53.3… What should the club do?',
      options: [{ id: 'a', t: 'Sell 53 shirts', v: '53 shirts gives $297 — just short.' }, { id: 'b', t: 'Sell 54 shirts', correct: true, v: 'Yes: round up, since you can’t sell a third of a shirt and 53 falls short. 54 gives $306.' }, { id: 'c', t: 'Sell 53.3 shirts', v: 'Shirts come whole. Interpret the answer in the situation.' }] },
    { id: 'c5', tier: 'STRETCH · TWO PRICES', kind: 'number', paths: 'refresh,together', label: 'at $15:', stuck: 'challenge', q: 'They sold 50 shirts in all, some at $15 and some at a $12 member price, for $690. How many at $15?', answer: 30,
      success: 'Yes: x + y = 50 and 15x + 12y = 690. Substitute y = 50 − x: 3x + 600 = 690 → x = 30 (and 20 at $12).', hints: ['x + y = 50', '15x + 12(50 − x) = 690'], worked: ['3x + 600 = 690', 'x = 30'] }] },
  reflect: { tomorrow: 'That’s the whole of Algebra Foundations. Come back to any lesson whenever your school course needs it — or bring a problem from school to the Companion home.', next: null },
  stuck: { see: { concept: 'profit and break-even', ways: [
    { type: 'SIMPLIFY IT', body: 'Each shirt brings in $15 and costs $6, so it adds $9. The first job is paying off the $180 setup: 180 ÷ 9 = 20 shirts.' },
    { type: 'TRY IT TOGETHER', body: 'At 20 shirts the setup is paid off. Each extra shirt adds $9.', turn: { q: 'Your turn: how many extra shirts make $270?', a: 30 } }] } }
});

export const W6 = { 26: L26, 27: L27, 28: L28, 29: L29, 30: L30 };
