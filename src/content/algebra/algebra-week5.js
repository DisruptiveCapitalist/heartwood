import { fmt, mk } from './algebra-util.js';

const L21 = mk({
  n: 21, week: 5, index: 1, concept: 'two unknowns',
  kicker: 'LESSON 21 · TWO UNKNOWNS',
  title: 'When one letter isn’t enough',
  goal: 'Represent a situation with two unknown quantities, write an equation linking them, and see why one equation usually allows many answers.',
  hook: { learn: 'A family pays $46 for movie tickets: $8 for adults, $5 for children. How many of each? You can’t tell yet — several combinations might work. Two unknowns need two facts.',
    refresh: 'Two variables, one equation — and why that’s a line of possibilities rather than one answer.' },
  map: { systems: 2, linear: 4, modeling: 3 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 'a', label: 'ADULTS', min: 0, max: 5, def: 0 }],
      render: v => {
        const c = (46 - 8 * v.a) / 5, whole = Number.isInteger(c) && c >= 0;
        return { story: 'Adult tickets $8, child tickets $5. The family paid $46.   8a + 5c = 46',
          big: v.a + ' adults → $' + 8 * v.a + ',  so children = (46 − ' + 8 * v.a + ') ÷ 5 = ' + fmt(c) + (whole ? '  ✓ a whole number' : '  ✗ not possible'),
          plot: { xr: [0, 6], yr: [0, 10], xname: 'adults (a)', yname: 'children (c)', lines: [{ f: a => (46 - 8 * a) / 5, color: 'blue', w: 2.5, from: 0, to: 5.75 }],
            points: [{ x: 2, y: 6, color: whole && v.a === 2 ? 'green' : '#fffdf7', ring: 'green', r: 7, label: '(2, 6)' }, { x: v.a, y: c, color: 'accent', r: 6 }] },
          alt: 'The line 8a + 5c = 46: every point on it costs $46, but only (2, 6) is whole numbers.',
          table: { head: ['ADULTS', '0', '1', '2', '3', '4', '5'], rows: [['children', '9.2', '7.6', '6', '4.4', '2.8', '1.2']], hl: (r, c) => c === 3 },
          msg: v.a === 2 ? 'Only 2 adults and 6 children works with whole people. Every point on the line costs $46; the real-world fact “you can’t buy part of a ticket” picked one out. Usually you’ll need a second equation instead — for instance, “8 tickets in all.”'
            : 'Every point on the line costs exactly $46. But you can’t buy ' + fmt(c) + ' child tickets. Find the whole-number pair.',
          ok: v.a === 2, goal: v.a === 2 };
      } },
    prompt: { learn: 'Try different numbers of adults. Which combination is actually possible?' },
    observations: [
      'One equation with two unknowns has many solutions — every point on a line.',
      'Here, a real-world fact (whole tickets) narrowed it to one. Usually you need a second equation.',
      'With two letters, each one stands for a different quantity — and the equation links them.'] },
  understand: {
    sentences: [
      'When a situation has two unknown quantities, give each its own letter, like a for adults and c for children.',
      'One equation linking them, like 8a + 5c = 46, has many solution pairs. Graphed, they form a line.',
      'To pin down one pair, you need a second, independent fact — a second equation. Two equations together are a system, which is the next lesson.'],
    worked: [
      { title: 'Building the equations', steps: [
        { m: 'let a = adults, c = children', w: 'Two quantities, two letters.' },
        { m: '8a + 5c = 46', w: 'The money fact.' },
        { m: 'a + c = 8', w: 'A second fact: they bought 8 tickets.' },
        { m: 'a = 2, c = 6', w: 'The only pair that makes both true. Check: 16 + 30 = 46 and 2 + 6 = 8 ✓' }] }],
    guided: [
      { id: 'g1', kind: 'choice', q: 'Pens cost $2 and notebooks $3. You spent $17. Which equation fits?', stuck: 'understand',
        options: [{ id: 'a', t: '2p + 3n = 17', correct: true, v: 'Yes: $2 for each pen plus $3 for each notebook.' }, { id: 'b', t: 'p + n = 17', v: 'That counts items, not dollars.' }, { id: 'c', t: '5(p + n) = 17', v: 'That charges $5 for every item.' }] },
      { id: 'g2', kind: 'number', q: 'If you bought 4 pens, how many notebooks?', label: 'n =', answer: 3, stuck: 'understand', success: 'Yes: 2 × 4 = 8, and 17 − 8 = 9 = 3 × 3.',
        hints: ['2 × 4 + 3n = 17'], worked: ['8 + 3n = 17', '3n = 9', 'n = 3'] }],
    vocab: [
      { term: 'Two-variable equation', def: 'An equation with two unknowns, like 8a + 5c = 46.' },
      { term: 'Solution pair', def: 'Values for both unknowns that make the equation true, written (a, c).' },
      { term: 'Constraint', def: 'A condition the answer must meet — whole numbers, or a second equation.' }],
    deeper: { title: 'Counting equations and unknowns', paras: [
      'As a rule of thumb, you need as many independent equations as unknowns. Engineers count “degrees of freedom” this way: each independent condition removes one.',
      '“Independent” matters: 8a + 5c = 46 and 16a + 10c = 92 are the same fact doubled, so they don’t pin anything down. Lesson 22 shows this as two lines that are really one.'] } },
  connect: {
    items: [
      { t: 'Tickets at two prices.', p: 'all' },
      { t: 'Coins: a jar of dimes and quarters with a known total value.', p: 'all' },
      { t: 'Mixing two drinks to get a total volume.', p: 'learn,together' },
      { t: 'Mixtures: blending two concentrations to get a target strength.', p: 'refresh,together' }],
    builder: { title: 'Let’s count it', body: 'Grab a handful of coins of two kinds. Count how many coins and total their value. Now give the totals to someone else and ask them to work out how many of each — they’ll need both facts.' },
    own: 'A situation with two unknown amounts…',
    affirm: 'Good. Two unknowns, two letters — and you’ll need two facts to find both.' },
  feynman: { prompt: { learn: 'Why can’t 8a + 5c = 46 alone tell you exactly how many adults and children there were? What extra information would?' },
    checks: [
      { t: 'Says many combinations satisfy it.', k: 'many|several|more than one|lots|different combinations|line' },
      { t: 'Says you need a second fact or equation.', k: 'second|another|more information|two equations|total tickets' },
      { t: 'Names a possible extra fact.', k: 'how many tickets|total number|a \\+ c|people' },
      { t: 'Mentions whole numbers as a constraint.', k: 'whole|can’t buy|half|fraction|integer' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · BUILD IT', kind: 'choice', stuck: 'challenge', q: 'Adult tickets $12, child tickets $7, total $64. Which equation fits?',
      options: [{ id: 'a', t: '12a + 7c = 64', correct: true, v: 'Yes.' }, { id: 'b', t: 'a + c = 64', v: 'That counts tickets, not dollars.' }, { id: 'c', t: '12c + 7a = 64', v: 'That swaps the prices.' }] },
    { id: 'c2', tier: '2 · USE IT', kind: 'number', label: 'children:', stuck: 'challenge', q: 'In that situation, if 3 adults went, how many children?', answer: 4, success: 'Yes: 36 + 7c = 64 → 7c = 28 → c = 4.', hints: ['12 × 3 + 7c = 64'], worked: ['7c = 28', 'c = 4'] },
    { id: 'c3', tier: '3 · CHECK A PAIR', kind: 'choice', stuck: 'challenge', q: 'Which pair makes both x + y = 10 and x − y = 2 true?',
      options: [{ id: 'a', t: '(5, 5)', v: 'x + y = 10 ✓, but x − y = 0, not 2.' }, { id: 'b', t: '(6, 4)', correct: true, v: 'Yes: 6 + 4 = 10 and 6 − 4 = 2.' }, { id: 'c', t: '(8, 2)', v: '8 + 2 = 10 ✓, but 8 − 2 = 6.' }] },
    { id: 'c4', tier: '4 · ONE LETTER WILL DO', kind: 'number', label: 'smaller:', stuck: 'challenge', q: 'Two numbers add to 20, and one is 4 more than the other. What is the smaller?', answer: 8,
      success: 'Yes: n + (n + 4) = 20 → 2n = 16 → n = 8. The second fact let you write one in terms of the other.', diag: [{ v: 10, type: 'meaning', msg: '10 + 10 = 20, but they must differ by 4.' }], hints: ['Call the smaller n; the other is n + 4.'], worked: ['2n + 4 = 20', 'n = 8'] },
    { id: 'c5', tier: 'STRETCH', kind: 'choice', paths: 'refresh,together', stuck: 'challenge', q: 'Do 8a + 5c = 46 and 16a + 10c = 92 together give one answer?',
      options: [{ id: 'a', t: 'Yes', v: 'The second is just the first doubled. It adds no new information.' }, { id: 'b', t: 'No — they’re the same fact', correct: true, v: 'Right. Doubling every term doesn’t change the relationship: the two lines are identical.' }] }] },
  reflect: { tomorrow: 'Next, Lesson 22: systems of equations — two facts true at once, seen as two lines crossing.', next: 22 },
  stuck: { see: { concept: 'two unknowns', ways: [
    { type: 'TRY IT TOGETHER', body: 'With 1 adult: $8 spent, $38 left for children. 38 ÷ 5 = 7.6 — not whole.', turn: { q: 'Your turn: with 2 adults, how many children?', a: 6 } },
    { type: 'SIMPLIFY IT', body: 'Pick a number of adults, subtract their cost from $46, and see if what’s left divides evenly by 5.' }] } }
});

const L22 = mk({
  n: 22, week: 5, index: 2, concept: 'systems of equations',
  kicker: 'LESSON 22 · SYSTEMS OF EQUATIONS',
  title: 'Two facts true at once',
  goal: 'Understand a system’s solution as the pair that makes both equations true, find it on a graph as the intersection, and recognize systems with no solution or infinitely many.',
  hook: { learn: 'Each equation alone is a line of possibilities. Two equations together are two lines — and the answer is the one point on both.',
    refresh: 'Systems as intersections: the picture that makes elimination and substitution make sense.' },
  map: { systems: 3, linear: 4, graphs: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 'x', label: 'x', min: -1, max: 5, step: 0.5, def: 0 }],
      render: v => {
        const f = x => 2 * x - 1, g = x => -x + 5, hit = v.x === 2;
        return { story: 'Line 1: y = 2x − 1.   Line 2: y = −x + 5.   Find the x where both give the same y.',
          big: 'x = ' + fmt(v.x) + ':   line 1 gives ' + fmt(f(v.x)) + ',  line 2 gives ' + fmt(g(v.x)) + (hit ? '   — the same!' : ''),
          plot: { xr: [-1, 5], yr: [-3, 7], lines: [{ f, color: 'accent', label: 'y = 2x − 1', labelAt: 4.2 }, { f: g, color: 'blue', label: 'y = −x + 5', labelAt: 4.3 }],
            points: [{ x: v.x, y: f(v.x), color: 'accent', r: 6 }, { x: v.x, y: g(v.x), color: 'blue', r: 6 }].concat(hit ? [{ x: 2, y: 3, color: 'green', r: 8, label: '(2, 3)' }] : []),
            segs: [{ x1: v.x, y1: Math.min(f(v.x), g(v.x)), x2: v.x, y2: Math.max(f(v.x), g(v.x)), dash: true }] },
          alt: 'Two lines crossing at (2, 3).',
          msg: hit ? '(2, 3) is on both lines: 2 × 2 − 1 = 3 and −2 + 5 = 3. That point is the solution of the system.' : 'The dashed gap is how far apart the two y-values are. Close it.',
          ok: hit, goal: hit };
      } },
    prompt: { learn: 'Slide x until both lines give the same y. That’s where they cross.' },
    observations: [
      'Each line is every solution of its own equation. The crossing point is the only solution of both.',
      'At the crossing, the gap between the two y-values is zero.',
      'Lines that never cross (parallel) would mean no solution; the same line twice would mean every point works.'] },
  understand: {
    sentences: [
      'A system of equations is two (or more) equations about the same unknowns. Its solution is the pair that makes all of them true at once.',
      'On a graph, each equation is a line, and the solution is where the lines intersect.',
      'Two lines can cross once (one solution), be parallel (no solution), or be the same line (infinitely many solutions).'],
    worked: [
      { title: 'Checking (2, 3)', steps: [
        { m: 'y = 2x − 1:  2 × 2 − 1 = 3 ✓', w: 'True for line 1.' },
        { m: 'y = −x + 5:  −2 + 5 = 3 ✓', w: 'True for line 2.' },
        { m: 'solution (2, 3)', w: 'Both equations hold.' }] },
      { title: 'Finding it by algebra', steps: [
        { m: '2x − 1 = −x + 5', w: 'At the crossing, both y’s are equal.' },
        { m: '3x = 6  →  x = 2', w: 'Add x and 1 to both sides, then divide by 3.' },
        { m: 'y = 2 × 2 − 1 = 3', w: 'Substitute back to get y.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'y = x + 1 and y = 3x − 3 cross where x = ?', label: 'x =', answer: 2, stuck: 'understand', success: 'Yes: x + 1 = 3x − 3 → 4 = 2x → x = 2 (and y = 3).',
        hints: ['Set them equal: x + 1 = 3x − 3.'], worked: ['x + 1 = 3x − 3', '4 = 2x', 'x = 2'] },
      { id: 'g2', kind: 'choice', q: 'Two lines have the same slope but different intercepts. How many solutions?', stuck: 'understand',
        options: [{ id: 'a', t: 'One', v: 'Same slope means parallel — they never meet.' }, { id: 'b', t: 'None', correct: true, v: 'Yes: parallel lines never cross.' }, { id: 'c', t: 'Infinitely many', v: 'That would need the same intercept too — the same line.' }] }],
    vocab: [
      { term: 'System of equations', def: 'Two or more equations with the same unknowns, considered together.' },
      { term: 'Solution of a system', def: 'Values that make every equation true.' },
      { term: 'Intersection', def: 'The point where two lines cross.' },
      { term: 'Inconsistent', def: 'A system with no solution — parallel lines.' }],
    deeper: { title: 'Why graphs aren’t enough', paras: [
      'A graph shows roughly where lines cross, but reading (2.17, 3.41) off a sketch is hard. That’s why Lesson 23’s algebraic methods matter: they give exact answers.',
      'Real engineering systems can have hundreds of unknowns — currents in a circuit, forces in a bridge. The same idea scales up: matrices and computers solve them, using elimination at heart.'] } },
  connect: {
    items: [
      { t: 'Two phone plans — where they cost the same is a system.', p: 'all' },
      { t: 'A meeting point: two people walking toward each other.', p: 'all' },
      { t: 'Supply and demand: the price where the two curves meet.', p: 'refresh,together' },
      { t: 'Circuits: currents must satisfy several rules at once.', p: 'refresh,together' }],
    builder: { title: 'Let’s meet in the middle', body: 'Two people stand 20 steps apart and walk toward each other, one taking 1 step per second and one 3. Write each position as an equation of time; solve to predict where they meet. Then try it.' },
    own: 'A time two conditions had to be true at once…',
    affirm: 'Good. Each condition is a line of possibilities; the answer is where they agree.' },
  feynman: { prompt: { learn: 'Explain what the crossing point of two lines means for the two equations — and what it means if the lines are parallel.' },
    checks: [
      { t: 'Says the point is on both lines.', k: 'both|each|same point|on the two' },
      { t: 'Says it makes both equations true.', k: 'true|works|satisf|solution' },
      { t: 'Says parallel lines never cross.', k: 'parallel|never|don’t cross|do not cross' },
      { t: 'Says that means no solution.', k: 'no solution|none|impossible' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · CHECK A POINT', kind: 'choice', stuck: 'challenge', q: 'Is (1, 4) a solution of y = 3x + 1 and y = −x + 5?',
      options: [{ id: 'y', t: 'Yes', correct: true, v: 'Yes: 3 + 1 = 4 and −1 + 5 = 4. True for both.' }, { id: 'n', t: 'No', v: 'Substitute into each: 3 × 1 + 1 = 4 and −1 + 5 = 4. Both true.' }] },
    { id: 'c2', tier: '2 · FIND x', kind: 'number', label: 'x =', stuck: 'challenge', q: 'y = 2x and y = x + 3. Where do they cross? x = ?', answer: 3, success: 'Yes: 2x = x + 3 → x = 3.', hints: ['2x = x + 3'], worked: ['x = 3'] },
    { id: 'c3', tier: '3 · FIND y', kind: 'number', label: 'y =', stuck: 'challenge', q: 'And y at that point?', answer: 6, success: 'Yes: y = 2 × 3 = 6. Check in the other: 3 + 3 = 6 ✓', hints: ['Substitute x = 3 into either equation.'], worked: ['y = 6'] },
    { id: 'c4', tier: '4 · HOW MANY?', kind: 'choice', stuck: 'challenge', q: 'y = 2x + 1 and y = 2x − 3. How many solutions?',
      options: [{ id: 'a', t: 'One', v: 'Same slope (2), different intercepts: parallel.' }, { id: 'b', t: 'None', correct: true, v: 'Yes: the lines are parallel, always 4 apart.' }, { id: 'c', t: 'Infinitely many', v: 'Different intercepts, so they’re different lines.' }] },
    { id: 'c5', tier: 'STRETCH · IN CONTEXT', kind: 'number', paths: 'refresh,together', label: 'x =', stuck: 'challenge', q: '10 drinks were sold: juices at $3 and smoothies at $5, for $38. x + y = 10 and 3x + 5y = 38. How many juices (x)?', answer: 6,
      success: 'Yes: y = 10 − x, so 3x + 50 − 5x = 38 → −2x = −12 → x = 6 juices, 4 smoothies.', hints: ['From the first, y = 10 − x.'], worked: ['3x + 5(10 − x) = 38', '−2x + 50 = 38', 'x = 6'] }] },
  reflect: { tomorrow: 'Next, Lesson 23: substitution and elimination — exact methods, and why each works.', next: 23 },
  stuck: { see: { concept: 'where two lines cross', ways: [
    { type: 'SIMPLIFY IT', body: 'Look at the two dots on the dashed line. Slide x until they land on top of each other.' },
    { type: 'TRY IT TOGETHER', body: 'At x = 1: line 1 gives 1, line 2 gives 4. Gap of 3.', turn: { q: 'Your turn: at x = 2, what does line 1 give?', a: 3 } }] } }
});

const L23 = mk({
  n: 23, week: 5, index: 3, concept: 'solving systems',
  kicker: 'LESSON 23 · SOLVING SYSTEMS',
  title: 'Elimination and substitution',
  goal: 'Solve systems exactly by elimination and by substitution, understand why each is valid, and choose the quicker method.',
  hook: { learn: 'Two receipts. One says 2 coffees and a muffin cost $9. The other says 1 coffee and a muffin cost $6. Compare them, and the difference is one coffee: $3. You just solved a system by elimination.',
    refresh: 'Elimination and substitution, rebuilt from receipts and the balance, so you know why each works and when to use which.' },
  map: { systems: 4, balance: 4, substitution: 4 },
  see: { visual: 'generic', generic: {
      init: { step: 0 },
      buttons: [
        { label: 'Subtract receipt 2 from receipt 1', primary: true, show: v => v.step === 0, act: () => ({ step: 1 }) },
        { label: 'Put coffee = $3 into receipt 2', primary: true, show: v => v.step === 1, act: () => ({ step: 2 }) },
        { label: 'Start again', show: v => v.step > 0, act: () => ({ step: 0 }) }],
      render: v => {
        const rows = [['Receipt 1', '2 coffees', '1 muffin', '$9'], ['Receipt 2', '1 coffee', '1 muffin', '$6']];
        if (v.step >= 1) rows.push(['Difference', '1 coffee', '0 muffins', '$3']);
        if (v.step >= 2) rows.push(['Receipt 2 again', '$3', '1 muffin', '$6  →  muffin $3']);
        return { story: 'Two receipts from the same café.   2c + m = 9   and   c + m = 6',
          big: v.step === 0 ? 'What does one coffee cost?' : v.step === 1 ? '(2c + m) − (c + m) = 9 − 6   →   c = 3' : 'c = 3,  m = 3',
          table: { head: ['', 'COFFEE', 'MUFFIN', 'TOTAL'], rows, hl: (r) => r >= 2 },
          msg: v.step === 0 ? 'Both receipts include exactly one muffin. What happens if you compare them?'
            : v.step === 1 ? 'The muffin cancelled out — elimination. Subtracting equal amounts from equal amounts keeps the result equal, so c = 3.'
            : 'Then substitution: put c = 3 into either receipt to find m. Check in receipt 1: 2 × 3 + 3 = 9 ✓',
          ok: v.step === 2, goal: v.step === 2 };
      } },
    prompt: { learn: 'Compare the receipts. Press the buttons in order and watch what disappears.' },
    observations: [
      'Subtracting one receipt from the other removed the muffin entirely. That’s elimination.',
      'It’s valid because you subtracted equal amounts from equal amounts — the balance again.',
      'Once you knew one price, putting it back into an equation gave the other. That’s substitution.'] },
  understand: {
    sentences: [
      'Elimination: add or subtract the equations (or multiples of them) so that one unknown cancels. It works because if A = B and C = D, then A − C = B − D.',
      'Substitution: solve one equation for one unknown, then replace that unknown in the other equation. It works because equal things can stand in for each other.',
      'Choose the quicker one: substitution when an equation already says “y = …”; elimination when an unknown has matching (or easily matched) coefficients.'],
    worked: [
      { title: 'Elimination', steps: [
        { m: 'x + y = 7  and  x − y = 1', w: 'The y’s have opposite signs.' },
        { m: 'add: 2x = 8', w: 'The y’s cancel.' },
        { m: 'x = 4,  y = 3', w: 'Substitute x into the first. Check: 4 − 3 = 1 ✓' }] },
      { title: 'Substitution', steps: [
        { m: 'y = x + 1  and  2x + y = 10', w: 'The first already says what y is.' },
        { m: '2x + (x + 1) = 10', w: 'Replace y in the second.' },
        { m: '3x = 9  →  x = 3,  y = 4', w: 'Check: 2 × 3 + 4 = 10 ✓' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'x + y = 7 and x − y = 1. Add the equations: 2x = 8. So x = ?', label: 'x =', answer: 4, stuck: 'understand', success: 'Yes.', hints: ['2x = 8'], worked: ['x = 4'] },
      { id: 'g2', kind: 'number', q: 'Now y = ?', label: 'y =', answer: 3, stuck: 'understand', success: 'Yes: 4 + y = 7. Check: 4 − 3 = 1 ✓', hints: ['Put x = 4 into x + y = 7.'], worked: ['y = 3'] }],
    vocab: [
      { term: 'Elimination', def: 'Adding or subtracting equations to cancel an unknown.' },
      { term: 'Substitution', def: 'Replacing an unknown with an equal expression from another equation.' },
      { term: 'Coefficient', def: 'The number multiplying a variable — the thing you match in elimination.' }],
    deeper: { title: 'Scaling before eliminating', paras: [
      'If no coefficients match, multiply an equation first. For 2x + 3y = 12 and 5x − y = 13, multiply the second by 3 to get 15x − 3y = 39, then add: 17x = 51. Multiplying both sides of an equation keeps it true, so the system is unchanged.',
      'Gaussian elimination — the algorithm computers use for huge systems — is exactly this, done methodically: scale, subtract, repeat.'] } },
  connect: {
    items: [
      { t: 'Comparing two receipts or two orders to work out prices.', p: 'all' },
      { t: 'Mixing two solutions to make a target strength.', p: 'refresh,together' },
      { t: 'Ages puzzles: “In 5 years she’ll be twice his age…”', p: 'learn,together' },
      { t: 'Balancing forces at a joint in a structure.', p: 'refresh,together' }],
    builder: { title: 'Let’s work it out', body: 'Keep two receipts from the same shop with overlapping items. Write each as an equation and solve for the prices. Then check them against the shelf labels next visit.' },
    own: 'A time you compared two totals to find a price…',
    affirm: 'Good. Comparing two equal amounts — that’s the whole of elimination.' },
  feynman: { prompt: { learn: 'Why is it allowed to subtract one equation from another? Explain using the two café receipts.' },
    checks: [
      { t: 'Says both sides of each equation are equal amounts.', k: 'equal|same|balanc|both sides' },
      { t: 'Says subtracting equal from equal keeps it equal.', k: 'subtract|take away|difference' },
      { t: 'Says the muffin cancels.', k: 'muffin|cancel|disappear|eliminat' },
      { t: 'Gets coffee = $3.', k: '\\$?3|three' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · ELIMINATE', kind: 'number', label: 'a =', stuck: 'challenge', q: '3a + b = 14 and a + b = 6. What is a?', answer: 4, success: 'Yes: subtract: 2a = 8, a = 4 (and b = 2).', hints: ['Subtract the second from the first.'], worked: ['2a = 8', 'a = 4'] },
    { id: 'c2', tier: '2 · SUBSTITUTE', kind: 'number', label: 'x =', stuck: 'challenge', q: 'y = 2x and x + y = 12. What is x?', answer: 4, success: 'Yes: x + 2x = 12 → x = 4, y = 8.', diag: [{ v: 6, type: 'meaning', msg: '6 + 6 = 12, but y has to be twice x.' }], hints: ['Replace y with 2x.'], worked: ['3x = 12', 'x = 4'] },
    { id: 'c3', tier: '3 · CHOOSE A METHOD', kind: 'choice', stuck: 'challenge', q: 'y = 3x − 2 and 4x + y = 12. Which method is quickest?',
      options: [{ id: 'a', t: 'Substitution', correct: true, v: 'Yes: the first equation already gives y. 4x + 3x − 2 = 12 → x = 2, y = 4.' }, { id: 'b', t: 'Elimination', v: 'It works, but you’d rearrange first. Substitution is ready to go.' }, { id: 'c', t: 'Graphing', v: 'A graph shows roughly where; algebra gives the exact point.' }] },
    { id: 'c4', tier: '4 · MATCHED COEFFICIENTS', kind: 'number', label: 'y =', stuck: 'challenge', q: '2x + 3y = 13 and 2x − y = 1. What is y?', answer: 3, success: 'Yes: subtract: 4y = 12, y = 3 (x = 2).', diag: [{ v: 6, type: 'sign', msg: '3y − (−y) is 4y, not 2y.' }], hints: ['Subtract to remove 2x.'], worked: ['4y = 12', 'y = 3'] },
    { id: 'c5', tier: 'STRETCH · IN THE SHOP', kind: 'number', paths: 'refresh,together', label: '$', stuck: 'challenge', q: '5 pens and 2 pads cost $11; 3 pens and 2 pads cost $9. What does one pen cost?', answer: 1,
      success: 'Yes: subtract: 2 pens = $2, so a pen is $1 (and a pad $3).', hints: ['Subtract the second from the first.'], worked: ['2p = 2', 'p = 1'] }] },
  reflect: { tomorrow: 'Next, Lesson 24: modeling a real situation from scratch.', next: 24 },
  stuck: {
    see: { concept: 'comparing the receipts', ways: [{ type: 'SIMPLIFY IT', body: 'Receipt 1 has everything receipt 2 has, plus one more coffee — and costs $3 more. So that extra coffee costs $3.' }] },
    understand: { concept: 'elimination and substitution', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part: why subtracting works, which to cancel, or substitution?', options: [
        { l: 'Why subtracting works', b: 'Each side of an equation is the same amount. Take equal amounts from equal amounts and the results are equal.' },
        { l: 'Which unknown to cancel', b: 'Look for one with the same number in front in both equations — or opposite signs, then add.' },
        { l: 'Substitution', b: 'If one equation says y = something, write that something wherever y appears in the other.' }] } }] }
  }
});

const L24 = mk({
  n: 24, week: 5, index: 4, concept: 'modeling',
  kicker: 'LESSON 24 · MODELING A REAL SITUATION',
  title: 'From a situation to a model and back',
  goal: 'Identify known and unknown quantities, build a model, solve it, and check whether the result makes sense in the real situation.',
  hook: { learn: 'A rain barrel holds 180 litres and leaks 12 litres an hour. When will it be empty? When will a third be left? A model answers these — but only if you build it from the situation, and test its answers against the situation too.',
    refresh: 'Modeling is the point of all of this. Rebuild the cycle: describe, model, solve, interpret, check.' },
  map: { modeling: 3, linear: 4, functions: 2 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 't', label: 'HOURS', min: 0, max: 18, def: 0 }],
      render: v => {
        const W = 180 - 12 * v.t;
        return { story: 'A rain barrel holds 180 L and leaks 12 L an hour.   W = 180 − 12t',
          big: v.t + ' h:   W = 180 − 12 × ' + v.t + ' = ' + fmt(W) + ' L' + (W < 0 ? '   (impossible)' : W === 0 ? '   — empty' : ''),
          plot: { xr: [0, 18], yr: [-40, 200], xstep: 1, ystep: 20, xlab: 2, ylab: 2, xname: 'hours', yname: 'litres',
            lines: [{ f: t => 180 - 12 * t, color: 'blue', w: 2.5, from: 0, to: 15 }, { f: t => 180 - 12 * t, color: 'mute', w: 1.5, dash: true, from: 15, to: 18 }],
            points: [{ x: v.t, y: W, color: W < 0 ? 'red' : 'accent', r: 7 }, { x: 15, y: 0, color: '#fffdf7', ring: 'ink', r: 5, label: 'empty at 15 h', dy: -14 }] },
          alt: 'A falling line from 180 litres to 0 at 15 hours; beyond that the model gives negative water, shown dashed.',
          msg: W < 0 ? 'The model says ' + fmt(W) + ' litres — impossible. The formula only applies while there’s water: 0 ≤ t ≤ 15. Checking against reality matters.' : W === 0 ? 'Empty at 15 hours: 180 − 12t = 0 → t = 15.' : 'The slope −12 is the leak rate; the intercept 180 is the starting amount.',
          ok: v.t >= 15, goal: v.t > 15 };
      } },
    prompt: { learn: 'Slide through the hours. When is it empty? What does the model say after that — and should you believe it?' },
    observations: [
      'The model came straight from the story: starting amount, minus rate × time.',
      'Solving 180 − 12t = 0 answered a real question: empty at 15 hours.',
      'After 15 hours the model gives negative water. A model has limits; part of modeling is knowing them.'] },
  understand: {
    sentences: [
      'Identify what you know (180 L, 12 L/h) and what you want (time until empty). Name the unknowns and their units.',
      'Build a model that links them — here W = 180 − 12t — and solve the equation the question asks for.',
      'Interpret and check: does the answer have sensible units and size? Does it make sense in the situation? Every model has a range where it applies.'],
    worked: [
      { title: 'When are 60 litres left?', steps: [
        { m: '180 − 12t = 60', w: 'The question, as an equation.' },
        { m: '120 = 12t', w: 'Add 12t, subtract 60.' },
        { m: 't = 10 hours', w: 'Check: 180 − 120 = 60 ✓. Ten hours: plausible.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'When is the barrel empty?  180 − 12t = 0', label: 'hours:', answer: 15, stuck: 'understand', success: 'Yes: 12t = 180, t = 15.', hints: ['Add 12t to both sides.'], worked: ['12t = 180', 't = 15'] }],
    vocab: [
      { term: 'Model', def: 'A mathematical description of a situation.' },
      { term: 'Assumption', def: 'Something taken as true to build the model — like a steady leak rate.' },
      { term: 'Domain', def: 'The input values where the model makes sense.' },
      { term: 'Interpret', def: 'Translate the answer back into the situation, with units.' }],
    deeper: { title: 'All models are simplifications', paras: [
      'A real barrel leaks faster when full — the water pressure is higher — so a curve would fit better than a line. The linear model is a first approximation, good enough for many decisions.',
      'The statistician George Box put it memorably: all models are wrong, but some are useful. Knowing your assumptions tells you when yours stops being useful.'] } },
  connect: {
    items: [
      { t: 'A phone battery draining at roughly a steady rate.', p: 'all' },
      { t: 'Fuel in a tank on a long drive.', p: 'all' },
      { t: 'A candle burning down.', p: 'learn,together' },
      { t: 'Loan repayments: balance falls by a fixed amount each month (ignoring interest).', p: 'refresh,together' },
      { t: 'Engineering estimates: “if it keeps cooling at this rate, when does it reach safe temperature?”', p: 'refresh,together' }],
    builder: { title: 'Let’s model it', body: 'Note your phone’s battery percentage now and again in an hour of normal use. Build a model: percent = start − rate × hours. Predict when it hits 20%. Check whether you were right — and if not, what assumption failed.' },
    own: 'Something that changes at a roughly steady rate…',
    affirm: 'Good. Build it, solve it, then ask reality whether the answer holds.' },
  feynman: { prompt: { learn: 'Explain how you built the barrel model, what each number in it means, and why the answer for 18 hours shouldn’t be trusted.' },
    checks: [
      { t: 'Says 180 is the starting amount.', k: '180|start|full|begin' },
      { t: 'Says 12 is the leak rate per hour.', k: '12|per hour|each hour|rate|leak' },
      { t: 'Says the model gives negative water after 15 hours.', k: 'negative|below zero|less than zero|minus' },
      { t: 'Says the model only applies while there’s water.', k: 'empty|only|until|limit|can’t|cannot|doesn’t apply|stops' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · BUILD THE MODEL', kind: 'choice', stuck: 'challenge', q: 'A car rental is $40 a day plus $0.25 a mile. A 3-day rental cost $165. Which equation finds the miles?',
      options: [{ id: 'a', t: '120 + 0.25m = 165', correct: true, v: 'Yes: 3 days × $40 = $120, plus 25 cents a mile.' }, { id: 'b', t: '40 + 0.25m = 165', v: 'That’s one day. It was rented for three.' }, { id: 'c', t: '0.25(40 + m) = 165', v: 'That charges 25 cents on the daily rate too.' }] },
    { id: 'c2', tier: '2 · SOLVE IT', kind: 'number', label: 'miles:', stuck: 'challenge', q: 'Solve 120 + 0.25m = 165.', answer: 180, success: 'Yes: 0.25m = 45, m = 180 miles. Plausible for 3 days.', diag: [{ v: 11.25, type: 'meaning', msg: 'That multiplies 45 by 0.25. Divide instead.' }], hints: ['0.25m = 45'], worked: ['m = 45 ÷ 0.25 = 180'] },
    { id: 'c3', tier: '3 · SENSE CHECK', kind: 'choice', stuck: 'challenge', q: 'A model for when a pool is full gives t = −2 hours. What does that tell you?',
      options: [{ id: 'a', t: 'It was full 2 hours ago', v: 'Possible only if the model ran backward correctly — but more likely the model or the setup has a sign error.' },
                { id: 'b', t: 'Check the model’s setup — the answer doesn’t fit the situation', correct: true, v: 'Yes. A negative time for a future event means something in the model is wrong: a sign, a rate, or a starting value.' },
                { id: 'c', t: 'Round it to 0', v: 'Rounding hides the problem. Go back and check the setup.' }] },
    { id: 'c4', tier: '4 · A CANDLE', kind: 'number', label: 'hours:', stuck: 'challenge', q: 'A 30 cm candle burns 2.5 cm an hour. After how many hours is 10 cm left?', answer: 8, success: 'Yes: 30 − 2.5t = 10 → 2.5t = 20 → t = 8.', diag: [{ v: 12, type: 'reading', msg: '12 hours is when it burns out completely. The question asks when 10 cm is left.' }], hints: ['30 − 2.5t = 10'], worked: ['2.5t = 20', 't = 8'] },
    { id: 'c5', tier: 'STRETCH · TWO UNKNOWNS', kind: 'number', paths: 'refresh,together', label: 'quarters:', stuck: 'challenge', q: '20 coins, all dimes and quarters, are worth $3.80. How many quarters?', answer: 12,
      success: 'Yes: d + q = 20 and 10d + 25q = 380. Substitute d = 20 − q: 200 + 15q = 380 → q = 12 (8 dimes). Check: $0.80 + $3.00 = $3.80 ✓', hints: ['Work in cents: 10d + 25q = 380.', 'd = 20 − q'], worked: ['10(20 − q) + 25q = 380', '15q = 180', 'q = 12'] }] },
  reflect: { tomorrow: 'Next, Lesson 25: a two-variable practical problem — choose your method.', next: 25 },
  stuck: { see: { concept: 'a model and its limits', ways: [
    { type: 'SIMPLIFY IT', body: 'Each hour takes 12 litres away. Count down from 180 in twelves: 168, 156, 144… How many steps to reach 0?' },
    { type: 'TRY IT TOGETHER', body: 'After 5 hours: 180 − 60 = 120 L.', turn: { q: 'Your turn: after 10 hours?', a: 60 } }] } }
});

const L25 = mk({
  n: 25, week: 5, index: 5, concept: 'two-variable problems',
  kicker: 'LESSON 25 · REVIEW AND CHALLENGE',
  title: 'A two-variable problem, your way',
  goal: 'Solve a practical two-variable problem by choosing a method — graph, substitution or elimination — and explain why it works.',
  hook: { learn: 'Chickens and cows: 30 heads and 74 legs. How many of each? You have three methods now. Today you choose — and explain why your choice works.',
    refresh: 'Week 5 together: set up a system from a situation, solve it by the method you prefer, and interpret it.' },
  map: { systems: 4, modeling: 4, linear: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 'c', label: 'COWS', min: 0, max: 30, def: 0 }],
      render: v => {
        const h = 30 - v.c, legs = 4 * v.c + 2 * h, hit = legs === 74;
        return { story: 'A farm has chickens and cows: 30 heads and 74 legs altogether.',
          big: v.c + ' cows + ' + h + ' chickens  →  ' + legs + ' legs' + (hit ? '  ✓' : legs < 74 ? '  (too few)' : '  (too many)'),
          plot: { xr: [0, 30], yr: [0, 40], xstep: 2, ystep: 5, xlab: 2, xname: 'cows (c)', yname: 'chickens (h)',
            lines: [{ f: c => 30 - c, color: 'accent', label: 'heads: c + h = 30', labelAt: 20 }, { f: c => (74 - 4 * c) / 2, color: 'blue', label: 'legs: 4c + 2h = 74', labelAt: 15 }],
            points: [{ x: v.c, y: h, color: hit ? 'green' : 'accent', r: 7 }].concat(hit ? [{ x: 7, y: 23, color: 'green', r: 8, label: '(7, 23)' }] : []) },
          alt: 'Two lines: c + h = 30 and 4c + 2h = 74, crossing at 7 cows and 23 chickens.',
          msg: hit ? '7 cows and 23 chickens: 28 + 46 = 74 legs. The point is on both lines — the solution of the system.' : 'Every choice keeps 30 heads (you’re moving along the orange line). Each cow swapped for a chicken adds 2 legs.',
          ok: hit, goal: hit };
      } },
    prompt: { learn: 'Swap chickens for cows and watch the leg count. Where does it hit 74?' },
    observations: [
      'The heads fact and the legs fact are two equations — two lines.',
      'Each cow instead of a chicken adds 2 legs: that’s the reasoning behind elimination.',
      'The answer sits where both facts are true at once.'] },
  understand: {
    sentences: [
      'Set up: name both unknowns and write one equation for each fact.',
      'Choose: graph for a picture, substitution when one variable is easy to isolate, elimination when coefficients line up.',
      'Interpret and check: does the pair satisfy both facts, and does it make sense — whole animals, positive numbers?'],
    worked: [
      { title: 'By elimination', steps: [
        { m: 'c + h = 30  and  4c + 2h = 74', w: 'Heads and legs.' },
        { m: '× 2:  2c + 2h = 60', w: 'Double the heads equation so the h’s match.' },
        { m: 'subtract: 2c = 14  →  c = 7', w: 'Each cow has 2 more legs than a chicken: 14 extra legs, 7 cows.' },
        { m: 'h = 23', w: 'Check: 28 + 46 = 74 ✓' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'Juices $3 and smoothies $5: 10 drinks sold for $38. Using x + y = 10 and 3x + 5y = 38, how many smoothies (y)?', label: 'y =', answer: 4, stuck: 'understand',
        success: 'Yes: x = 10 − y, so 30 − 3y + 5y = 38 → y = 4.', hints: ['x = 10 − y'], worked: ['3(10 − y) + 5y = 38', '2y = 8', 'y = 4'] }],
    vocab: [
      { term: 'System', def: 'Two equations about the same two unknowns.' },
      { term: 'Method', def: 'Graphing, substitution or elimination — any valid route to the solution.' },
      { term: 'Check', def: 'Substitute into both original equations and the story.' }],
    deeper: { title: 'The same answer, three ways', paras: [
      'Graphing, substitution and elimination are different views of one fact: there is exactly one pair satisfying both conditions. Solving the same problem two ways is a strong check.',
      'The chickens-and-cows puzzle appears in a Chinese text from around 1,500 years ago, as pheasants and rabbits in a cage — algebraic thinking long before modern notation.'] } },
  connect: {
    items: [
      { t: 'Two kinds of ticket, total people and total money.', p: 'all' },
      { t: 'Two kinds of coin, total count and total value.', p: 'all' },
      { t: 'Wheels on a car park full of cars and motorbikes.', p: 'learn,together' },
      { t: 'Blending two coffee beans to hit a target price per pound.', p: 'refresh,together' }],
    builder: { title: 'Let’s count it', body: 'Count the wheels and the vehicles in a car park section — cars and motorbikes only. Give someone just the two totals and ask them to work out how many of each.' },
    own: 'Another puzzle with two kinds of thing and two totals…',
    affirm: 'Good. Two kinds, two facts, one answer.' },
  feynman: { prompt: { learn: 'Explain how you solved the chickens-and-cows problem and why your method works.' },
    checks: [
      { t: 'Names the two unknowns.', k: 'cow|chicken|c and h|two unknowns' },
      { t: 'Writes or describes two equations.', k: 'heads|legs|30|74|two equations' },
      { t: 'Explains the method’s reasoning.', k: 'subtract|substitut|eliminat|extra legs|swap|graph|cross' },
      { t: 'Checks the answer.', k: 'check|74|both' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · SUM AND DIFFERENCE', kind: 'number', label: 'larger:', stuck: 'challenge', q: 'Two numbers add to 15 and differ by 3. What is the larger?', answer: 9, success: 'Yes: add the equations: 2x = 18, x = 9 (and 6).', hints: ['x + y = 15, x − y = 3'], worked: ['2x = 18', 'x = 9'] },
    { id: 'c2', tier: '2 · THE FARM', kind: 'number', label: 'cows:', stuck: 'challenge', q: 'Back to the farm: 30 heads, 74 legs. How many cows?', answer: 7, success: 'Yes — 7 cows and 23 chickens.', diag: [{ v: 23, type: 'reading', msg: '23 is the chickens.' }], hints: ['If all 30 were chickens: 60 legs. Each cow adds 2.'], worked: ['74 − 60 = 14 extra legs', '14 ÷ 2 = 7 cows'] },
    { id: 'c3', tier: '3 · CHOOSE', kind: 'choice', stuck: 'challenge', q: 'x = 2y + 1 and 3x − 4y = 11. Which method is quickest?',
      options: [{ id: 'a', t: 'Substitution', correct: true, v: 'Yes: x is already isolated. 3(2y + 1) − 4y = 11 → 2y = 8 → y = 4, x = 9.' }, { id: 'b', t: 'Elimination', v: 'Possible, but you’d rearrange first.' }] },
    { id: 'c4', tier: '4 · A CAFÉ', kind: 'number', label: '$', stuck: 'challenge', q: '3 lattes and 2 teas cost $19; 1 latte and 2 teas cost $11. What does a latte cost?', answer: 4, success: 'Yes: subtract: 2 lattes = $8.', hints: ['Subtract the second from the first.'], worked: ['2L = 8', 'L = 4'] },
    { id: 'c5', tier: 'STRETCH', kind: 'number', paths: 'refresh,together', label: '$', stuck: 'challenge', q: 'And a tea?', answer: 3.5, success: 'Yes: 4 + 2t = 11 → t = 3.50. Check: 12 + 7 = 19 ✓', hints: ['Put L = 4 into 1L + 2t = 11.'], worked: ['2t = 7', 't = 3.5'] }] },
  reflect: { tomorrow: 'Next, Week 6 begins with Lesson 26: what a function is.', next: 26 },
  stuck: { see: { concept: 'chickens and cows', ways: [
    { type: 'SIMPLIFY IT', body: 'Pretend every animal is a chicken: 30 × 2 = 60 legs. You need 74. Each time you swap a chicken for a cow you add 2 legs.' }] } }
});

export const W5 = { 21: L21, 22: L22, 23: L23, 24: L24, 25: L25 };
