import { fmt, mk, bar, COL } from './algebra-util.js';

const FR = [[3, 4], [2, 3], [1, 2]];
const ADD = [[[1, 3], [1, 4]], [[1, 2], [1, 6]], [[2, 5], [1, 10]]];

const L11 = mk({
  n: 11, week: 3, index: 1, concept: 'fractions as relationships',
  kicker: 'LESSON 11 · FRACTIONS AS RELATIONSHIPS',
  title: 'A fraction is a relationship',
  goal: 'Understand a fraction as parts of a whole, as division, and as a point on the number line — and see why different fractions can name the same amount.',
  hook: { learn: 'Three-quarters of a pizza and six-eighths of a pizza are the same amount of pizza. They just come from different cuts. Today: what the top and bottom of a fraction actually say, and why fractions that look different can be equal.',
    refresh: 'Fractions are where many adults’ confidence slipped. Let’s rebuild them as one idea — a relationship between two numbers — and the rules follow.' },
  map: { fractions: 3, equality: 3 },
  prereq: { label: 'One smaller idea first', body: 'Take a sheet of paper. Fold it in half: two equal pieces, each one half. Fold it again: four pieces, each a quarter. Two of those quarters cover exactly the same area as one half. That is all equivalent fractions are.' },
  see: { visual: 'generic', generic: {
      tabs: ['3/4', '2/3', '1/2'],
      sliders: [{ id: 'd', label: 'CUT INTO', min: 1, max: 12, def: 8, unit: ' pieces' }, { id: 'n', label: 'SHADE', min: 0, max: 12, def: 3 }],
      onTab: () => ({ d: 8, n: 3 }),
      render: v => {
        const [a, b] = FR[v.tab]; const n = Math.min(v.n, v.d), d = v.d;
        const eq = n * b === a * d;
        return { story: 'The top bar shows ' + a + '/' + b + '. Cut the bottom bar into a different number of pieces and shade the same amount.',
          big: a + '/' + b + '   ' + (eq ? '=' : '≠') + '   ' + n + '/' + d,
          bars: [bar('TARGET', b, a, 'accent', a + '/' + b), bar('YOURS', d, n, 'blue', n + '/' + d)],
          note: 'As a decimal: ' + a + ' ÷ ' + b + ' = ' + fmt(a / b) + (d ? '   ·   ' + n + ' ÷ ' + d + ' = ' + fmt(n / d) : ''),
          msg: eq && d !== b ? 'Same amount, different cut: ' + a + '/' + b + ' = ' + n + '/' + d + '. Each of the ' + b + ' pieces was cut into ' + (d / b) + ', so the top and bottom both multiplied by ' + (d / b) + '.'
            : eq ? 'That’s the same fraction, cut the same way. Try a different number of pieces.' : 'Not the same amount yet — compare the shaded lengths.',
          ok: eq && d !== b, goal: eq && d !== b };
      } },
    prompt: { learn: 'Make your bar show the same amount as the target — using a different number of pieces.' },
    observations: [
      'The bottom number says how many equal pieces the whole is cut into. The top number counts how many you have.',
      'Cutting every piece into the same number of smaller pieces multiplies top and bottom by the same number — and the amount doesn’t change.',
      'A fraction is also a division: 3/4 is 3 ÷ 4, which is 0.75 — a point on the number line between 0 and 1.'] },
  understand: {
    sentences: [
      'A fraction a/b is a relationship between two numbers: the whole is cut into b equal parts, and you have a of them.',
      'It is also a division — a/b means a ÷ b — so every fraction is a number with a place on the number line. 3/4 sits three-quarters of the way from 0 to 1.',
      'Multiplying the top and bottom by the same number gives an equivalent fraction: the same amount, cut into more pieces. Dividing both by a common factor simplifies it.'],
    worked: [
      { title: '3/4 = 6/8', steps: [
        { m: '3/4', w: 'Three of four equal pieces.' },
        { m: '(3 × 2)/(4 × 2)', w: 'Cut every quarter in half. Twice as many pieces, each half the size.' },
        { m: '6/8', w: 'Six of eight pieces — the same amount.' }] },
      { title: 'Simplifying 12/16', steps: [
        { m: '12/16', w: 'Both 12 and 16 can be divided by 4.' },
        { m: '(12 ÷ 4)/(16 ÷ 4) = 3/4', w: 'Divide top and bottom by the same number. Same amount, fewer, bigger pieces.' }] },
      { title: 'As a division', steps: [
        { m: '3/4 = 3 ÷ 4', w: 'Three pizzas shared among four people.' },
        { m: '= 0.75', w: 'Each person gets three-quarters of a pizza.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'Fill the box:  2/3 = ▢/12', label: '▢ =', answer: 8, stuck: 'understand',
        success: 'Yes. 3 became 12 by multiplying by 4, so 2 becomes 8. 2/3 = 8/12.',
        diag: [{ v: 11, type: 'meaning', msg: '11 adds 9 to the top because 9 was added to the bottom. Equivalent fractions scale by multiplying: 3 × 4 = 12, so 2 × 4.' }],
        hints: ['What do you multiply 3 by to get 12?', '× 4. Do the same to the top.'], worked: ['3 × 4 = 12', '2 × 4 = 8', '2/3 = 8/12'] },
      { id: 'g2', kind: 'choice', q: 'Which is bigger: 3/5 or 2/3?', stuck: 'understand',
        options: [{ id: 'a', t: '3/5', v: 'Compare with the same-size pieces: 3/5 = 9/15 and 2/3 = 10/15. 2/3 is a little bigger.' },
                  { id: 'b', t: '2/3', correct: true, v: 'Yes. In fifteenths: 9/15 versus 10/15. Or as decimals: 0.6 versus about 0.667.' },
                  { id: 'c', t: 'They’re equal', v: 'Cut both into fifteenths: 9/15 and 10/15. Close, but 2/3 is bigger.' }] }],
    vocab: [
      { term: 'Numerator', def: 'The top number: how many pieces you have.' },
      { term: 'Denominator', def: 'The bottom number: how many equal pieces the whole is cut into.' },
      { term: 'Equivalent fractions', def: 'Fractions that name the same amount, like 3/4 and 6/8.' },
      { term: 'Simplest form', def: 'A fraction whose top and bottom share no common factor except 1.' }],
    deeper: { title: 'Why multiplying top and bottom is always safe', paras: [
      'Multiplying top and bottom by the same number k is multiplying the fraction by k/k, which is 1. Multiplying by 1 never changes a value — the same reason the balance never tips when you do the same thing to both sides.',
      'This is also why you can’t add the same number to top and bottom: 1/2 and 2/3 are not equal. Adding isn’t multiplying by 1.',
      'Every fraction is a rational number — a ratio of two whole numbers. Its decimal either stops (3/4 = 0.75) or repeats forever (1/3 = 0.333…). Numbers like √2 and π are not fractions of whole numbers at all.'] } },
  connect: {
    items: [
      { t: 'Recipes: ¾ cup of sugar, or a ½ teaspoon of salt.', p: 'all' },
      { t: 'Time: 15 minutes is ¼ of an hour; 45 minutes is ¾.', p: 'all' },
      { t: 'Sharing: 3 pizzas among 4 friends is ¾ of a pizza each.', p: 'learn,together' },
      { t: 'Music: a quarter note lasts ¼ of a whole note.', p: 'learn,together' },
      { t: 'Wrench sizes: 9/16 inch sits between ½ (8/16) and 5/8 (10/16).', p: 'refresh,together' },
      { t: 'Gear and pulley ratios: a fraction of a turn on one gear for each turn of another.', p: 'refresh,together' }],
    builder: { title: 'Let’s measure it', body: 'Find a tape measure marked in inches. Look between 0 and 1: the marks are halves, quarters, eighths and sixteenths. Find ¾ and 12/16 — they’re the same mark. A ruler is a number line of equivalent fractions.' },
    own: 'Somewhere you use fractions without thinking…',
    affirm: 'Good. Every one of those is a whole cut into equal parts, and a count of how many parts you have.' },
  feynman: { prompt: { learn: 'Explain why 3/4 and 6/8 are the same amount. Use a picture, a pizza or a ruler — not just the rule.' },
    checks: [
      { t: 'Says the bottom number is how many equal pieces.', k: 'piece|part|cut|slice|equal|bottom|denominator' },
      { t: 'Says each piece is cut into smaller pieces (or the pieces are smaller).', k: 'cut|half|smaller|split|twice as many|double' },
      { t: 'Says the amount stays the same.', k: 'same|equal|amount|still' },
      { t: 'Mentions multiplying top and bottom by the same number.', k: 'multipl|times|×|both|top and bottom' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · AS A DECIMAL', kind: 'number', label: '=', stuck: 'challenge', q: 'Write 5/8 as a decimal.', answer: 0.625,
      success: 'Yes: 5 ÷ 8 = 0.625.', diag: [{ v: 1.6, type: 'meaning', msg: '1.6 is 8 ÷ 5. The fraction 5/8 means 5 ÷ 8.' }],
      hints: ['5/8 means 5 ÷ 8.', 'Half of 5/4 … or 1/8 = 0.125, so 5/8 = 5 × 0.125.'], worked: ['1/8 = 0.125', '5/8 = 5 × 0.125 = 0.625'] },
    { id: 'c2', tier: '2 · EQUIVALENT', kind: 'number', label: '▢ =', stuck: 'challenge', q: '▢/20 = 3/4', answer: 15,
      success: 'Yes: 4 × 5 = 20, so 3 × 5 = 15.', diag: [{ v: 19, type: 'meaning', msg: 'Adding 16 to both doesn’t keep the amount. Multiply: 4 × 5 = 20, so 3 × 5.' }],
      hints: ['What times 4 gives 20?'], worked: ['4 × 5 = 20', '3 × 5 = 15'] },
    { id: 'c3', tier: '3 · ON THE NUMBER LINE', kind: 'choice', stuck: 'challenge', q: 'Which fraction is between 1/2 and 1?',
      options: [{ id: 'a', t: '2/5', v: '2/5 is 0.4, less than a half.' }, { id: 'b', t: '3/4', correct: true, v: 'Yes: 0.75, between 0.5 and 1.' }, { id: 'c', t: '9/8', v: '9/8 is more than 1 — nine eighths is one whole and an eighth.' }] },
    { id: 'c4', tier: '4 · FRACTIONS AS DIVISION', kind: 'number', label: 'each:', stuck: 'challenge', q: '3 pizzas are shared equally among 4 people. How much pizza does each person get? (A fraction or a decimal.)', answer: 0.75,
      success: 'Yes — ¾ of a pizza each. 3 ÷ 4 = 3/4.', diag: [{ v: 4 / 3, type: 'meaning', msg: 'That’s 4 ÷ 3 — the pizzas per person the other way round. Each person gets 3 ÷ 4.' }],
      hints: ['Shared among means divided by.'], worked: ['3 ÷ 4 = 3/4 = 0.75'] },
    { id: 'c5', tier: 'STRETCH', kind: 'choice', paths: 'refresh,together', stuck: 'challenge', q: 'Is 6/8 = 9/12?',
      options: [{ id: 'y', t: 'Yes', correct: true, v: 'Yes. Both simplify to 3/4: 6/8 ÷ 2/2, and 9/12 ÷ 3/3. Or check: 6 × 12 = 72 and 8 × 9 = 72.' },
                { id: 'n', t: 'No', v: 'Simplify both: 6/8 = 3/4 and 9/12 = 3/4. They’re equal.' }] }] },
  reflect: { tomorrow: 'Next, Lesson 12: adding, subtracting, multiplying and dividing fractions — and why adding needs a common denominator.', next: 12 },
  stuck: {
    see: { concept: 'equivalent fractions', ways: [
      { type: 'TRY IT TOGETHER', body: 'For 3/4, set the pieces to 8. Each quarter is now two eighths.', turn: { q: 'Your turn: how many eighths make 3/4?', a: 6 } },
      { type: 'SIMPLIFY IT', body: 'Ignore the numbers. Just make the shaded part of your bar the same length as the shaded part of the target.' }] },
    understand: { concept: 'what a fraction means', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part: top and bottom, equivalent fractions, or fractions as division?', options: [
        { l: 'Top and bottom', b: 'Bottom: how many equal pieces the whole is cut into. Top: how many of those pieces you have.' },
        { l: 'Equivalent fractions', b: 'Cut every piece into the same number of smaller pieces. You get more pieces, each smaller — and the same amount.' },
        { l: 'As a division', b: '3/4 means 3 shared among 4. On a calculator: 3 ÷ 4 = 0.75.' }] } },
      { type: 'SHOW ME', body: 'Fold a strip of paper into 4 equal parts and shade 3. Now fold it once more: 8 parts, and 6 of them are shaded. Same shaded strip.' }] }
  }
});

const L12 = mk({
  n: 12, week: 3, index: 2, concept: 'operations with fractions',
  kicker: 'LESSON 12 · OPERATIONS WITH FRACTIONS',
  title: 'Adding pieces of different sizes',
  goal: 'Add, subtract, multiply and divide fractions — and understand why adding needs a common denominator while multiplying doesn’t.',
  hook: { learn: 'A third of a cake plus a quarter of a cake. You can’t just add the pieces — they’re different sizes. Today you see how to cut them into pieces of the same size first, and why multiplying works differently.',
    refresh: 'The four fraction operations, rebuilt from pictures, so “find a common denominator” and “flip and multiply” stop being mysteries.' },
  map: { fractions: 4 },
  see: { visual: 'generic', generic: {
      tabs: ['1/3 + 1/4', '1/2 + 1/6', '2/5 + 1/10'],
      sliders: [{ id: 'd', label: 'CUT BOTH INTO', min: 1, max: 24, def: 1, unit: ' pieces' }],
      onTab: () => ({ d: 1 }),
      render: v => {
        const [[a1, b1], [a2, b2]] = ADD[v.tab], d = v.d;
        const common = d % b1 === 0 && d % b2 === 0;
        const n1 = common ? a1 * d / b1 : 0, n2 = common ? a2 * d / b2 : 0;
        const bars = common
          ? [bar(a1 + '/' + b1, d, n1, 'accent', n1 + '/' + d), bar(a2 + '/' + b2, d, n2, 'blue', n2 + '/' + d),
             { label: 'TOGETHER', right: (n1 + n2) + '/' + d, cells: Array.from({ length: d }, (_, i) => ({ bg: i < n1 ? COL.accent : i < n1 + n2 ? COL.blue : COL.paper })) }]
          : [bar(a1 + '/' + b1, b1, a1, 'accent'), bar(a2 + '/' + b2, b2, a2, 'blue')];
        return { story: 'Can you add ' + a1 + '/' + b1 + ' and ' + a2 + '/' + b2 + '? Only once both are cut into pieces of the same size.',
          big: common ? a1 + '/' + b1 + ' + ' + a2 + '/' + b2 + '  =  ' + n1 + '/' + d + ' + ' + n2 + '/' + d + '  =  ' + (n1 + n2) + '/' + d : a1 + '/' + b1 + ' + ' + a2 + '/' + b2 + '  =  ?',
          bars,
          msg: common ? 'Same-size pieces now: ' + d + 'ths. ' + n1 + ' of them plus ' + n2 + ' of them is ' + (n1 + n2) + '/' + d + '. ' + d + ' is a common denominator — both ' + b1 + ' and ' + b2 + ' divide into it.'
            : 'Pieces of different sizes can’t be counted together. Cut both into a number of pieces that ' + b1 + ' and ' + b2 + ' both divide into.',
          ok: common, goal: common };
      } },
    prompt: { learn: 'Slide until both fractions are cut into same-size pieces. Then you can add them by counting.' },
    observations: [
      'You can only add pieces once they are the same size. That size is the common denominator.',
      'Once the pieces matched, adding was just counting: the denominator stayed, the numerators added.',
      'The smallest number that worked was the smallest common multiple of the two denominators — but any common multiple works.'] },
  understand: {
    sentences: [
      'To add or subtract fractions, first rewrite them with the same denominator — the same-size pieces — then add or subtract the numerators. The denominator names the piece size, so it doesn’t change.',
      'To multiply, take a fraction of a fraction: multiply the tops and multiply the bottoms. Half of three-quarters is 3/8. No common denominator is needed.',
      'To divide, ask how many of the second fit into the first. Dividing by a fraction is the same as multiplying by its reciprocal — it flipped upside down.'],
    worked: [
      { title: 'Adding: 1/3 + 1/4', steps: [
        { m: '1/3 + 1/4', w: 'Thirds and quarters are different sizes.' },
        { m: '4/12 + 3/12', w: 'Twelfths fit both: each third is 4 twelfths, each quarter is 3.' },
        { m: '7/12', w: 'Now count: 4 + 3 = 7 twelfths.' }] },
      { title: 'Multiplying: 2/3 × 3/4', steps: [
        { m: '2/3 × 3/4', w: 'Two-thirds of three-quarters.' },
        { m: '(2 × 3)/(3 × 4) = 6/12', w: 'Multiply tops, multiply bottoms.' },
        { m: '= 1/2', w: 'Simplify by dividing top and bottom by 6.' }] },
      { title: 'Dividing: 3 ÷ 1/4', steps: [
        { m: '3 ÷ 1/4', w: 'How many quarters fit into 3?' },
        { m: '3 × 4 = 12', w: 'Four quarters in each whole, three wholes: 12. Dividing by 1/4 is multiplying by 4/1.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: '1/2 + 1/6 = ▢/6', label: '▢ =', answer: 4, stuck: 'understand',
        success: 'Yes: 1/2 = 3/6, and 3/6 + 1/6 = 4/6 (which simplifies to 2/3).',
        diag: [{ v: 2, type: 'meaning', msg: '2 adds the numerators without matching the pieces. First write 1/2 in sixths: 3/6.' }],
        hints: ['How many sixths is one half?'], worked: ['1/2 = 3/6', '3/6 + 1/6 = 4/6'] },
      { id: 'g2', kind: 'number', q: '2/5 × 1/2 = ?  (fraction or decimal)', label: '=', answer: 0.2, stuck: 'understand',
        success: 'Yes: (2 × 1)/(5 × 2) = 2/10 = 1/5 = 0.2. Half of two-fifths is one-fifth.',
        diag: [{ v: 0.9, type: 'meaning', msg: '0.9 is 2/5 + 1/2. Multiplying means “of”: half of 2/5.' }],
        hints: ['Multiply the tops and multiply the bottoms.'], worked: ['(2 × 1)/(5 × 2) = 2/10 = 1/5'] }],
    vocab: [
      { term: 'Common denominator', def: 'A denominator shared by two fractions, so their pieces are the same size.' },
      { term: 'Least common multiple', def: 'The smallest number two denominators both divide into.' },
      { term: 'Reciprocal', def: 'A fraction flipped upside down. The reciprocal of 3/4 is 4/3.' },
      { term: 'Mixed number', def: 'A whole number and a fraction together, like 2¼.' }],
    deeper: { title: 'Why division flips and multiplies', paras: [
      'Dividing by a number is multiplying by its reciprocal, because a ÷ b is defined as the number that, multiplied by b, gives a. And (a × 1/b) × b = a. For fractions, the reciprocal of c/d is d/c, so a ÷ (c/d) = a × d/c.',
      'Why no common denominator for multiplication? Multiplying fractions scales one by the other; it isn’t combining pieces of the same whole. The area model shows it: a 2/3-by-3/4 rectangle inside a unit square covers 6 of its 12 small cells.'] } },
  connect: {
    items: [
      { t: 'Recipes: ½ cup + ⅓ cup of milk is ⅚ cup.', p: 'all' },
      { t: 'Halving a recipe that calls for ¾ cup of flour: ½ × ¾ = ⅜ cup.', p: 'all' },
      { t: 'How many ¼-hour practice sessions fit in 2 hours? 2 ÷ ¼ = 8.', p: 'learn,together' },
      { t: 'Cutting a 6-foot board into ¾-foot pieces: 6 ÷ ¾ = 8 pieces.', p: 'refresh,together' },
      { t: 'Resistors in parallel: 1/R = 1/R₁ + 1/R₂ — adding fractions in electronics.', p: 'refresh,together' }],
    builder: { title: 'Let’s measure it', body: 'Measure ⅓ cup and ¼ cup of water into a measuring jug. The total reads a little over half a cup — 7/12 cup is about 0.58. Pour in another ¼: now 10/12, or ⅚.' },
    own: 'A time you combined or split fractional amounts…',
    affirm: 'Good. Adding needed same-size pieces; scaling and sharing didn’t.' },
  feynman: { prompt: { learn: 'Why can’t you add 1/3 + 1/4 by adding the tops and the bottoms to get 2/7? Explain with a picture or a real situation.' },
    checks: [
      { t: 'Says the pieces are different sizes.', k: 'size|different|bigger|smaller|not the same' },
      { t: 'Says they must be cut into the same-size pieces first.', k: 'same|common|twelfth|both into|match' },
      { t: 'Says 2/7 is too small (less than either half-ish amount).', k: 'small|less|than a half|2/7|wrong|bigger than' },
      { t: 'Gets 7/12.', k: '7/12|seven twelfths|7 twelfths' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · ADD', kind: 'number', label: '=', stuck: 'challenge', q: '1/2 + 1/3 = ?', answer: 5 / 6,
      success: 'Yes: 3/6 + 2/6 = 5/6.', diag: [{ v: 0.4, type: 'meaning', msg: '2/5 adds tops and bottoms. Cut both into sixths first: 3/6 + 2/6.' }],
      hints: ['Both 2 and 3 divide into 6.', '1/2 = 3/6 and 1/3 = 2/6.'], worked: ['3/6 + 2/6 = 5/6'] },
    { id: 'c2', tier: '2 · SUBTRACT', kind: 'number', label: '=', stuck: 'challenge', q: '3/4 − 1/8 = ?', answer: 5 / 8,
      success: 'Yes: 6/8 − 1/8 = 5/8.', diag: [{ v: 0.5, type: 'meaning', msg: '2/4 subtracts tops and bottoms. Write 3/4 in eighths first: 6/8.' }],
      hints: ['Write 3/4 in eighths.'], worked: ['3/4 = 6/8', '6/8 − 1/8 = 5/8'] },
    { id: 'c3', tier: '3 · MULTIPLY', kind: 'number', label: '=', stuck: 'challenge', q: '2/3 × 9 = ?', answer: 6,
      success: 'Yes: two-thirds of 9 is 6.', diag: [{ v: 27 / 2, type: 'meaning', msg: 'That divides by 2/3. Multiplying by 2/3 means “two-thirds of”: 9 ÷ 3 × 2.' }],
      hints: ['A third of 9 is 3.'], worked: ['9 ÷ 3 = 3', '3 × 2 = 6'] },
    { id: 'c4', tier: '4 · DIVIDE', kind: 'number', label: '=', stuck: 'challenge', q: '2 ÷ 1/3 = ?', answer: 6,
      success: 'Yes: three thirds in each whole, two wholes — 6.', diag: [{ v: 2 / 3, type: 'meaning', msg: '2/3 multiplies by 1/3. Dividing asks how many thirds fit into 2.' }],
      hints: ['How many thirds are in 1?'], worked: ['3 thirds in 1, so 6 in 2', '2 × 3 = 6'] },
    { id: 'c5', tier: 'STRETCH · IN THE KITCHEN', kind: 'number', paths: 'refresh,together', label: 'cups:', stuck: 'challenge', q: 'A recipe needs 1½ cups of flour per batch. How much for 2½ batches?', answer: 3.75,
      success: 'Yes: 3/2 × 5/2 = 15/4 = 3¾ cups.', diag: [{ v: 4, type: 'meaning', msg: '4 adds 1½ and 2½. You need 1½ cups, 2½ times: multiply.' }, { v: 2.5, type: 'arithmetic', msg: '2.5 is 1 × 2½ — the half cup per batch also needs multiplying. 1½ × 2½.' }],
      hints: ['Write both as fractions: 3/2 and 5/2.'], worked: ['3/2 × 5/2 = 15/4', '15/4 = 3¾'] }] },
  reflect: { tomorrow: 'Next, Lesson 13: ratios and rates — comparing quantities, and what “per” really means.', next: 13 },
  stuck: {
    see: { concept: 'same-size pieces', ways: [
      { type: 'TRY IT TOGETHER', body: 'For 1/3 + 1/4: try 12 pieces. 12 ÷ 3 = 4, so a third is 4 pieces.', turn: { q: 'Your turn: how many twelfths is a quarter?', a: 3 } },
      { type: 'SIMPLIFY IT', body: 'Look for a number of pieces that both bottom numbers divide into evenly — try multiplying them together.' }] },
    understand: { concept: 'the four operations', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which operation?', options: [
        { l: 'Adding or subtracting', b: 'Same-size pieces first: rewrite both with a common denominator. Then add or subtract the tops only.' },
        { l: 'Multiplying', b: 'Read × as “of”: 2/3 × 3/4 is two-thirds of three-quarters. Multiply tops, multiply bottoms.' },
        { l: 'Dividing', b: 'Ask “how many of these fit into that?” 3 ÷ 1/4: how many quarters in 3? Twelve.' }] } },
      { type: 'USE AN EXAMPLE', body: 'Money helps: a quarter plus a dime is 25 + 10 cents — same-size units first. 1/4 + 1/10 = 25/100 + 10/100 = 35/100.' }] }
  }
});

const L13 = mk({
  n: 13, week: 3, index: 3, concept: 'ratios and rates',
  kicker: 'LESSON 13 · RATIOS AND RATES',
  title: 'Comparing quantities',
  goal: 'Use ratios to compare quantities, scale them correctly, and find unit rates for everyday decisions.',
  hook: { learn: 'Lemonade made with 2 lemons for every 3 cups of water tastes the same whether you make one jug or six. The amounts change; the relationship doesn’t. That relationship is a ratio.',
    refresh: 'Ratios, rates, unit prices. Rebuild them as one idea — a fixed relationship between two quantities — and they’ll carry you into proportions and slope.' },
  map: { ratio: 3, fractions: 3 },
  see: { visual: 'generic', generic: {
      tabs: ['A recipe ratio', 'Unit price'],
      sliders: [{ id: 'k', label: 'BATCHES', min: 1, max: 6, def: 1, show: v => v.tab === 0 }, { id: 'q', label: 'ITEMS', min: 1, max: 12, def: 6, show: v => v.tab === 1 }],
      render: v => {
        if (v.tab === 0) {
          const L = 2 * v.k, W = 3 * v.k;
          return { story: 'Lemonade: 2 lemons for every 3 cups of water.',
            big: L + ' lemons : ' + W + ' cups   =   2 : 3',
            bars: [bar('LEMONS', 12, L, 'accent', String(L)), bar('WATER (CUPS)', 18, W, 'blue', String(W))],
            table: { head: ['BATCHES', '1', '2', '3', '4', '5', '6'], rows: [['lemons', 2, 4, 6, 8, 10, 12], ['cups', 3, 6, 9, 12, 15, 18]], hl: (r, c) => c === v.k },
            msg: 'Both amounts multiply by ' + v.k + '. The taste stays the same because the ratio stays 2 : 3.', ok: v.k > 2, goal: false };
        }
        const a = 0.75 * v.q, b = 0.70 * v.q;
        return { story: 'Store A sells 6 for $4.50. Store B sells 10 for $7.00. Which is cheaper per item?',
          big: 'A: $0.75 each     B: $0.70 each',
          table: { head: ['ITEMS', '1', '2', '4', '6', '10', String(v.q)], rows: [['Store A', '$0.75', '$1.50', '$3.00', '$4.50', '$7.50', '$' + a.toFixed(2)], ['Store B', '$0.70', '$1.40', '$2.80', '$4.20', '$7.00', '$' + b.toFixed(2)]], hl: (r, c) => c === 6 },
          msg: 'Dividing each price by its count gives the unit rate — the price for one. B is cheaper per item, even though its pack costs more. For ' + v.q + ' items you’d save $' + (a - b).toFixed(2) + '.', ok: true, goal: true };
      } },
    prompt: { learn: 'Scale the recipe, then switch to the unit-price tab and compare the two stores.' },
    observations: [
      'Scaling a ratio means multiplying both quantities by the same number. Adding the same amount to both would change the taste.',
      'A rate compares quantities with different units — dollars per item, miles per hour.',
      'The unit rate — the amount for one — makes different-sized offers easy to compare.'] },
  understand: {
    sentences: [
      'A ratio compares two quantities: 2 lemons to 3 cups, written 2 : 3 or 2/3. It describes a relationship, not particular amounts.',
      'Equivalent ratios come from multiplying (or dividing) both quantities by the same number: 2 : 3 = 4 : 6 = 10 : 15. Adding the same amount to both does not keep the ratio.',
      'A rate is a ratio of quantities with different units. A unit rate is the amount per one: $0.75 per item, 50 miles per hour.'],
    worked: [
      { title: 'Scaling a ratio', steps: [
        { m: '2 : 3', w: 'Two lemons for every three cups.' },
        { m: '× 4  →  8 : 12', w: 'Four batches: both numbers × 4.' }] },
      { title: 'A unit price', steps: [
        { m: '$4.50 for 6', w: 'A rate: dollars per item.' },
        { m: '4.50 ÷ 6 = 0.75', w: 'Divide by the count to get the price for one.' }] },
      { title: 'A speed', steps: [
        { m: '150 miles in 3 hours', w: 'Distance per time.' },
        { m: '150 ÷ 3 = 50 mph', w: 'The unit rate: miles in one hour.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'Lemonade is 2 lemons : 3 cups. How many cups of water for 8 lemons?', label: 'cups:', answer: 12, stuck: 'understand',
        success: 'Yes: 8 is 2 × 4, so the water is 3 × 4 = 12.',
        diag: [{ v: 9, type: 'meaning', msg: '9 adds 6 to both — 2 + 6 = 8, so 3 + 6 = 9. But ratios scale by multiplying: 2 × 4 = 8, so 3 × 4.' }],
        hints: ['What do you multiply 2 by to get 8?'], worked: ['2 × 4 = 8', '3 × 4 = 12'] }],
    vocab: [
      { term: 'Ratio', def: 'A comparison of two quantities, written a : b or a/b.' },
      { term: 'Equivalent ratios', def: 'Ratios that describe the same relationship, like 2 : 3 and 8 : 12.' },
      { term: 'Rate', def: 'A ratio of quantities with different units: miles per hour, dollars per pound.' },
      { term: 'Unit rate', def: 'A rate per one unit: $0.75 per item.' }],
    deeper: { title: 'Additive versus multiplicative thinking', paras: [
      'The most common ratio mistake is additive: “2 lemons became 8, that’s 6 more, so 3 cups become 9.” But a ratio is multiplicative — each lemon goes with 1.5 cups. Ask “how many times bigger?” rather than “how many more?”',
      'A ratio a : b corresponds to a straight line through the origin with slope b/a. Lesson 14 shows that line; Week 4 calls its steepness the slope.'] } },
  connect: {
    items: [
      { t: 'Unit prices on supermarket shelf labels: price per ounce or per 100 g.', p: 'all' },
      { t: 'Speed: miles per hour, or minutes per mile for a runner.', p: 'all' },
      { t: 'Mixing paint or concrete: 1 part cement to 2 parts sand to 3 parts gravel.', p: 'all' },
      { t: 'Fuel economy: miles per gallon.', p: 'learn,together' },
      { t: 'Gear ratios on a bicycle or in a gearbox.', p: 'refresh,together' },
      { t: 'Map and drawing scales: 1 : 50 means 1 cm on paper is 50 cm in reality.', p: 'refresh,together' }],
    builder: { title: 'Let’s compare it', body: 'On your next shop, find two sizes of the same product. Divide each price by its weight or volume. The shelf label often does it for you — check its “unit price” against your own division.' },
    own: 'A time you compared two offers or mixed something in proportion…',
    affirm: 'Good. Each of those depends on a relationship between two quantities staying fixed.' },
  feynman: { prompt: { learn: 'Explain why 2 lemons : 3 cups is the same ratio as 8 : 12 but not 8 : 9.' },
    checks: [
      { t: 'Says both quantities are multiplied by the same number.', k: 'multipl|times|×|scale|4' },
      { t: 'Says adding the same amount changes the relationship.', k: 'add|plus|more water|weaker|not the same|change' },
      { t: 'Mentions the taste or the relationship staying the same.', k: 'taste|same|relationship|strength|each lemon' },
      { t: 'Uses “per” or a unit rate idea.', k: 'per|each|1\\.5|one lemon' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · UNIT PRICE', kind: 'number', label: '$ per lb:', stuck: 'challenge', q: '5 lb of potatoes costs $12. What is the price per pound?', answer: 2.4,
      success: 'Yes: 12 ÷ 5 = $2.40 per pound.', diag: [{ v: 0.42, type: 'meaning', msg: 'That’s pounds per dollar (5 ÷ 12). Price per pound is dollars ÷ pounds.' }],
      hints: ['Price per pound = dollars ÷ pounds.'], worked: ['12 ÷ 5 = 2.40'] },
    { id: 'c2', tier: '2 · A RATE', kind: 'number', label: 'mpg:', stuck: 'challenge', q: 'A car goes 210 miles on 6 gallons. How many miles per gallon?', answer: 35,
      success: 'Yes: 210 ÷ 6 = 35 mpg.', hints: ['Miles per gallon = miles ÷ gallons.'], worked: ['210 ÷ 6 = 35'] },
    { id: 'c3', tier: '3 · CHOOSE', kind: 'choice', stuck: 'challenge', q: 'Which is the better deal: 12 oz for $3.00, or 20 oz for $4.40?',
      options: [{ id: 'a', t: '12 oz for $3.00', v: '3.00 ÷ 12 = $0.25 per ounce; 4.40 ÷ 20 = $0.22. The larger pack is cheaper per ounce.' },
                { id: 'b', t: '20 oz for $4.40', correct: true, v: 'Yes: $0.22 an ounce versus $0.25.' }, { id: 'c', t: 'They’re the same', v: 'Work out each unit price: $0.25 and $0.22 per ounce.' }] },
    { id: 'c4', tier: '4 · PARTS OF A WHOLE', kind: 'number', label: 'litres blue:', stuck: 'challenge', q: 'Paint is mixed 3 parts blue to 2 parts white. You need 15 litres altogether. How much blue?', answer: 9,
      success: 'Yes. 5 parts in all, so each part is 3 litres; blue is 3 parts: 9 litres.',
      diag: [{ v: 7.5, type: 'meaning', msg: '7.5 splits it in half. The mix is 3 parts to 2, so blue is 3 of every 5 parts.' }, { v: 5, type: 'reading', msg: '5 is 15 ÷ 3. There are 3 + 2 = 5 parts altogether: 15 ÷ 5 = 3 litres per part.' }],
      hints: ['How many parts in total?', '5 parts make 15 litres, so 1 part is 3 litres.'], worked: ['3 + 2 = 5 parts', '15 ÷ 5 = 3 L per part', 'blue = 3 × 3 = 9 L'] },
    { id: 'c5', tier: 'STRETCH · GEARS', kind: 'number', paths: 'refresh,together', label: 'rpm:', stuck: 'challenge', q: 'A gearbox has a 3 : 1 reduction: the motor turns 3 times for each turn of the output. The motor runs at 1800 rpm. How fast is the output?', answer: 600,
      success: 'Yes: 1800 ÷ 3 = 600 rpm — slower, with about three times the torque, less friction losses.', diag: [{ v: 5400, type: 'meaning', msg: 'A reduction slows the output: 3 motor turns for every 1 output turn.' }],
      hints: ['3 motor turns per output turn.'], worked: ['1800 ÷ 3 = 600'] }] },
  reflect: { tomorrow: 'Next, Lesson 14: proportions — two equal ratios, and why cross-multiplying works.', next: 14 },
  stuck: {
    see: { concept: 'scaling a ratio', ways: [
      { type: 'SIMPLIFY IT', body: 'Each batch is 2 lemons and 3 cups. Three batches is three lots of each: 6 lemons and 9 cups.' },
      { type: 'TRY IT TOGETHER', body: 'Two batches: 4 lemons, 6 cups.', turn: { q: 'Your turn: how many cups for 5 batches?', a: 15 } }] },
    understand: { concept: 'ratios and unit rates', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part: scaling, unit rates, or which number to divide by?', options: [
        { l: 'Scaling', b: 'Multiply both quantities by the same number. Never add the same amount to both.' },
        { l: 'Unit rates', b: 'Find the amount for one: divide by the count. $4.50 for 6 is $0.75 for 1.' },
        { l: 'Which way to divide', b: 'The word after “per” goes on the bottom. Dollars per pound: dollars ÷ pounds.' }] } },
      { type: 'USE AN EXAMPLE', body: '1 cup of rice to 2 cups of water. For 3 cups of rice: 3 × 2 = 6 cups of water.', turn: { q: 'Your turn: water for 4 cups of rice?', a: 8 } }] }
  }
});

const L14 = mk({
  n: 14, week: 3, index: 4, concept: 'proportions',
  kicker: 'LESSON 14 · PROPORTIONS',
  title: 'Two ratios that are equal',
  goal: 'Solve proportions by scaling or by multiplying both sides — and understand cross-multiplication as a consequence of equality, not a rule to memorize.',
  hook: { learn: 'On a map, 2 cm stands for 5 km. The two towns you care about are 7 cm apart. How far is that really? You’re asking for a missing number in two equal ratios. That’s a proportion.',
    refresh: 'Cross-multiplication is usually taught as a trick. Let’s derive it from the balance, so you can trust it — and know when it applies.' },
  map: { proportion: 3, ratio: 4, equality: 4 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 'cm', label: 'ON THE MAP', min: 0, max: 14, def: 2, unit: ' cm' }],
      render: v => {
        const km = v.cm * 2.5, hit = v.cm === 7;
        return { story: 'The map’s scale: 2 cm stands for 5 km. The two towns are 7 cm apart on the map.',
          big: v.cm + ' cm  →  ' + fmt(km) + ' km',
          plot: { xr: [0, 14], yr: [0, 35], xstep: 1, ystep: 5, xlab: 2, xname: 'map (cm)', yname: 'real distance (km)',
            lines: [{ f: x => 2.5 * x, color: 'blue', w: 2.5 }], points: [{ x: 2, y: 5, color: 'mute', r: 5, label: '2 cm → 5 km' }, { x: v.cm, y: km, color: 'accent', r: 8, label: fmt(km) + ' km' }],
            segs: [{ x1: v.cm, y1: 0, x2: v.cm, y2: km, dash: true }, { x1: 0, y1: km, x2: v.cm, y2: km, dash: true }] },
          alt: 'A straight line through the origin: real distance is 2.5 times the map distance.',
          table: { head: ['MAP (cm)', '2', '4', '6', '7', '10'], rows: [['REAL (km)', 5, 10, 15, 17.5, 25]], hl: (r, c) => c === 4 && hit },
          msg: hit ? '7 cm is 17.5 km. 2/5 = 7/x — every map distance and real distance are in the same ratio, so the points all lie on one straight line through zero.' : 'Every point lies on the same straight line through zero — that’s what a proportional relationship looks like.',
          ok: hit, goal: hit };
      } },
    prompt: { learn: 'Slide to 7 cm. Watch the point move along the line, and look at the table.' },
    observations: [
      'Every map distance and real distance are in the same ratio, 2 : 5. Two equal ratios make a proportion.',
      'The points all lie on one straight line through zero — the picture of a proportional relationship.',
      'You can find any missing value by scaling: 7 cm is 3.5 times 2 cm, so the real distance is 3.5 × 5 km.'] },
  understand: {
    sentences: [
      'A proportion says two ratios are equal: 2/5 = 7/x. It’s an equation, so the balance rules apply.',
      'You can solve it by scaling — 2 became 7 by multiplying by 3.5, so 5 becomes 17.5 — or by multiplying both sides of the equation by both denominators.',
      'Multiplying both sides of a/b = c/d by b and by d gives ad = bc. That is cross-multiplication: not a separate rule, just two balance moves done at once.'],
    worked: [
      { title: 'Solving 2/5 = 7/x', steps: [
        { m: '2/5 = 7/x', w: 'Two equal ratios.' },
        { m: '2/5 × 5x = 7/x × 5x', w: 'Multiply both sides by 5x — the same thing to both sides.' },
        { m: '2x = 35', w: 'The 5s cancel on the left; the x’s cancel on the right. That’s “cross-multiplying.”' },
        { m: 'x = 17.5', w: 'Divide both sides by 2. Check: 2/5 = 0.4 and 7/17.5 = 0.4 ✓' }] },
      { title: 'By scaling', steps: [
        { m: '2 → 7 is × 3.5', w: 'How many times bigger?' },
        { m: '5 × 3.5 = 17.5', w: 'Do the same to the other quantity.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: '3/4 = x/20', label: 'x =', answer: 15, stuck: 'understand',
        success: 'Yes. 4 × 5 = 20, so 3 × 5 = 15. Or cross-multiply: 4x = 60.', diag: [{ v: 19, type: 'meaning', msg: '19 adds 16 to both. Proportions scale by multiplying: 4 → 20 is × 5.' }],
        hints: ['4 × ? = 20'], worked: ['4 × 5 = 20', 'x = 3 × 5 = 15'] },
      { id: 'g2', kind: 'choice', q: 'Why is it valid to “cross-multiply” 3/4 = x/20 into 3 × 20 = 4 × x?', stuck: 'understand',
        options: [{ id: 'a', t: 'It’s multiplying both sides by 4 and by 20 — same to both sides', correct: true, v: 'Yes. Multiply both sides by 80 (4 × 20): the left becomes 60, the right becomes 4x. It keeps the balance.' },
                  { id: 'b', t: 'It’s a rule for fractions that you have to remember', v: 'You can remember it, but it isn’t separate from anything: it’s multiplying both sides by both denominators.' },
                  { id: 'c', t: 'Because x is in the numerator', v: 'Where x sits doesn’t matter. It works because both sides are multiplied by the same number.' }] }],
    vocab: [
      { term: 'Proportion', def: 'An equation saying two ratios are equal.' },
      { term: 'Cross-multiplication', def: 'Turning a/b = c/d into ad = bc by multiplying both sides by b and d.' },
      { term: 'Proportional', def: 'Two quantities whose ratio is always the same; their graph is a line through zero.' },
      { term: 'Constant of proportionality', def: 'The fixed ratio between them — here, 2.5 km per cm.' }],
    deeper: { title: 'When cross-multiplying doesn’t apply', paras: [
      'Cross-multiplication only works when each side is a single fraction. In 1/2 + x/3 = 4/5 you can’t cross-multiply directly; you’d multiply every term by 30.',
      'Not every straight-line relationship is proportional. A taxi fare of $3 + $2 a mile is a line, but it doesn’t pass through zero — 2 miles costs $7 and 4 miles costs $11, and 7/2 ≠ 11/4. Proportional means the ratio is constant, which means a line through the origin.'] } },
  connect: {
    items: [
      { t: 'Map scales and scale drawings.', p: 'all' },
      { t: 'Recipes: if 3 cups of flour serves 4, how much for 10?', p: 'all' },
      { t: 'Currency exchange: dollars to euros at a fixed rate.', p: 'all' },
      { t: 'Shadows: a person and a tree cast shadows in the same ratio to their heights at the same time of day.', p: 'learn,together' },
      { t: 'Hooke’s law: within its limits, a spring’s stretch is proportional to the load.', p: 'refresh,together' },
      { t: 'Dosages by body weight — clinicians use proportions (and you should never adjust a medicine dose without them).', p: 'refresh,together' }],
    builder: { title: 'Let’s measure it', body: 'On a sunny day, measure your own height and your shadow. Then measure the shadow of a lamppost or a tree. Height/shadow is the same ratio for both, so you can solve for the tree’s height without climbing it.' },
    own: 'A time you scaled something up or down in proportion…',
    affirm: 'Good. Each one is two equal ratios with one number missing.' },
  feynman: { prompt: { learn: 'Explain why cross-multiplying 2/5 = 7/x is allowed. What are you really doing to both sides?' },
    checks: [
      { t: 'Says you multiply both sides by the same thing.', k: 'both sides|same|balanc' },
      { t: 'Mentions the denominators (5 and x).', k: 'denominator|bottom|5x|5 and x|by 5|by x' },
      { t: 'Says the fractions cancel.', k: 'cancel|clear|get rid|disappear' },
      { t: 'Calls the two ratios equal.', k: 'equal|same ratio|proportion' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · START HERE', kind: 'number', label: 'x =', stuck: 'challenge', q: '5/8 = x/40', answer: 25,
      success: 'Yes: 8 × 5 = 40, so 5 × 5 = 25.', diag: [{ v: 37, type: 'meaning', msg: 'Adding 32 to both doesn’t keep the ratio. 8 → 40 is × 5.' }],
      hints: ['8 × ? = 40'], worked: ['8 × 5 = 40', 'x = 5 × 5 = 25'] },
    { id: 'c2', tier: '2 · IN THE SHOP', kind: 'number', label: '$', stuck: 'challenge', q: '4 notebooks cost $10. What do 10 notebooks cost?', answer: 25,
      success: 'Yes. $2.50 each, so $25. Or 4/10 = 10/x → 4x = 100.', diag: [{ v: 16, type: 'meaning', msg: '16 adds 6 to both numbers. Each notebook costs $2.50; ten cost 10 × 2.50.' }],
      hints: ['Find the cost of one first.'], worked: ['10 ÷ 4 = 2.50', '10 × 2.50 = 25'] },
    { id: 'c3', tier: '3 · ENLARGING A PHOTO', kind: 'number', label: 'inches:', stuck: 'challenge', q: 'A 4 × 6 inch photo is enlarged so its width is 10 inches. What is the new height?', answer: 15,
      success: 'Yes: 4 → 10 is × 2.5, so 6 → 15.', diag: [{ v: 12, type: 'meaning', msg: '12 adds 6 to both sides. Enlarging scales: 4/6 = 10/h.' }],
      hints: ['4/6 = 10/h'], worked: ['10 ÷ 4 = 2.5', '6 × 2.5 = 15'] },
    { id: 'c4', tier: '4 · IS IT PROPORTIONAL?', kind: 'choice', stuck: 'challenge', q: 'Which relationship is NOT proportional?',
      options: [{ id: 'a', t: 'Apples at $2 a pound: cost and weight', v: 'This one is proportional: 0 lb costs $0, and the ratio cost/weight is always 2.' },
                { id: 'b', t: 'A taxi at $3 plus $2 a mile: fare and miles', correct: true, v: 'Yes. A 0-mile ride costs $3, not $0, so fare/miles isn’t constant: 2 miles is $7, 4 miles is $11. It’s a line, but not through zero.' },
                { id: 'c', t: 'Driving at a steady 50 mph: distance and time', v: 'This is proportional: distance/time is always 50, and 0 hours means 0 miles.' }] },
    { id: 'c5', tier: 'STRETCH · SHADOWS', kind: 'number', paths: 'refresh,together', label: 'feet:', stuck: 'challenge', q: 'A 6-foot person casts a 4-foot shadow. At the same moment, a tree casts a 22-foot shadow. How tall is the tree?', answer: 33,
      success: 'Yes: 6/4 = h/22, so 4h = 132 and h = 33 feet.', diag: [{ v: 24, type: 'meaning', msg: '24 adds 2 feet. Heights and shadows are in the same ratio: 6/4 = h/22.' }, { v: 14.67, type: 'order', msg: 'That uses 4/6 on one side and h/22 on the other — the ratios must be in the same order: height/shadow = height/shadow.' }],
      hints: ['height/shadow = height/shadow'], worked: ['6/4 = h/22', '4h = 132', 'h = 33'] }] },
  reflect: { tomorrow: 'Next, Lesson 15: a measurement, recipe or scale-drawing problem that pulls Week 3 together.', next: 15 },
  stuck: {
    see: { concept: 'a proportional relationship', ways: [
      { type: 'SIMPLIFY IT', body: 'Each 1 cm on the map is 2.5 km. So 7 cm is 7 × 2.5 km.' },
      { type: 'TRY IT TOGETHER', body: '4 cm is double 2 cm, so it’s double 5 km: 10 km.', turn: { q: 'Your turn: how many km is 6 cm?', a: 15 } }] },
    understand: { concept: 'solving proportions', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part: setting it up, scaling, or cross-multiplying?', options: [
        { l: 'Setting it up', b: 'Keep the same order on both sides: map/real = map/real. 2/5 = 7/x.' },
        { l: 'Scaling', b: 'Ask: how many times bigger is 7 than 2? Then make 5 that many times bigger.' },
        { l: 'Cross-multiplying', b: 'Multiply both sides by both bottoms. 2/5 = 7/x becomes 2x = 35. Then solve.' }] } },
      { type: 'USE AN EXAMPLE', body: '1/2 = x/10. 2 × 5 = 10, so x = 5.', turn: { q: 'Your turn: 1/3 = x/12.  x = ?', a: 4 } }] }
  }
});

const L15 = mk({
  n: 15, week: 3, index: 5, concept: 'scaling in context',
  kicker: 'LESSON 15 · REVIEW AND CHALLENGE',
  title: 'Recipes, scale drawings and models',
  goal: 'Use fractions, ratios and proportions together to scale a real recipe or drawing — and explain how the proportion represents the situation.',
  hook: { learn: 'A recipe serves 4. Ten people are coming. Every ingredient has to change, by the same factor. Today Week 3’s ideas — fractions, ratios and proportions — work together on one real task.',
    refresh: 'An integration pass on Week 3: scale factors, unit conversions, proportions in context.' },
  map: { proportion: 4, ratio: 4, fractions: 4, modeling: 2 },
  see: { visual: 'generic', generic: {
      sliders: [{ id: 's', label: 'SERVINGS', min: 1, max: 12, def: 4 }],
      render: v => {
        const k = v.s / 4;
        return { story: 'Pancakes for 4: 300 g flour, 2 eggs, 250 ml milk, 1½ tbsp sugar.',
          big: 'Scale factor: ' + v.s + ' ÷ 4 = ' + fmt(k),
          table: { head: ['', 'FOR 4', 'FOR ' + v.s], rows: [['flour (g)', 300, fmt(300 * k)], ['eggs', 2, fmt(2 * k)], ['milk (ml)', 250, fmt(250 * k)], ['sugar (tbsp)', 1.5, fmt(1.5 * k)]], hl: (r, c) => c === 2 },
          msg: v.s === 10 ? 'For 10: × 2.5. Flour 750 g, eggs 5, milk 625 ml, sugar 3¾ tbsp. Every amount scaled by the same factor — a proportion for each ingredient.'
            : (2 * k) % 1 ? 'Every ingredient multiplies by ' + fmt(k) + '. Some amounts — like ' + fmt(2 * k) + ' eggs — need rounding in a real kitchen. The maths is exact; the cook decides.' : 'Every ingredient multiplies by the same scale factor, ' + fmt(k) + '.',
          ok: v.s === 10, goal: v.s === 10 };
      } },
    prompt: { learn: 'Scale the recipe for 10 people. Watch every ingredient change by the same factor.' },
    observations: [
      'One scale factor — new servings ÷ old servings — applies to every ingredient.',
      'Each ingredient is a proportion: 300/4 = flour/10.',
      'Sometimes the exact answer isn’t practical (2.5 eggs). Interpreting the answer is part of the problem.'] },
  understand: {
    sentences: [
      'A scale factor is the number you multiply by to go from the original to the new size: new ÷ old.',
      'Each quantity forms a proportion with the original: 300 g is to 4 servings as f grams is to 10.',
      'Check the units, and check the answer in context: a scale drawing’s real lengths should be realistic; a recipe’s amounts should be cookable.'],
    worked: [
      { title: 'A scale drawing 1 : 50', steps: [
        { m: '1 : 50', w: '1 cm on paper is 50 cm in reality.' },
        { m: 'wall drawn 8 cm  →  8 × 50 = 400 cm', w: 'Multiply by the scale.' },
        { m: '400 cm = 4 m', w: 'Convert to a sensible unit.' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'Scale the pancakes to 6 servings. How much flour?', label: 'g:', answer: 450, stuck: 'understand',
        success: 'Yes: scale factor 6 ÷ 4 = 1.5, and 300 × 1.5 = 450 g.', diag: [{ v: 302, type: 'meaning', msg: '302 adds 2 grams because 2 servings were added. Scale by multiplying: 6 ÷ 4 = 1.5.' }],
        hints: ['Scale factor = 6 ÷ 4.'], worked: ['6 ÷ 4 = 1.5', '300 × 1.5 = 450'] }],
    vocab: [
      { term: 'Scale factor', def: 'The multiplier from the original to the new size.' },
      { term: 'Scale', def: 'A ratio like 1 : 50 linking a drawing or model to reality.' },
      { term: 'Unit conversion', def: 'Changing units with a known ratio: 100 cm = 1 m.' }],
    deeper: { title: 'Area and volume scale differently', paras: [
      'Double every length of a drawing and the area becomes four times as big; the volume of a model becomes eight times. Lengths scale by k, areas by k², volumes by k³.',
      'That’s why a cake pan twice as wide needs about four times the batter, not twice — and why giant insects in films couldn’t exist: their weight would grow faster than the strength of their legs.'] } },
  connect: {
    items: [
      { t: 'Scaling a recipe up or down.', p: 'all' },
      { t: 'Reading a floor plan or a map.', p: 'all' },
      { t: 'Model kits: 1 : 24 cars, 1 : 87 railways.', p: 'learn,together' },
      { t: 'Construction drawings at 1 : 50 or ¼ inch to the foot.', p: 'refresh,together' }],
    builder: { title: 'Let’s draw it', body: 'Draw a plan of one room at 1 : 50 — 2 cm on paper for each metre. Measure the room, convert every length, and draw it. Then measure a piece of furniture and draw it to the same scale to see whether it fits.' },
    own: 'A time you scaled something up or down…',
    affirm: 'Good. One factor, applied to everything — and then a check that the result is sensible.' },
  feynman: { prompt: { learn: 'Explain how one proportion — 300 g for 4 servings, f grams for 10 — represents the recipe problem, and how you’d check that your answer makes sense.' },
    checks: [
      { t: 'Says the ratio of flour to servings stays the same.', k: 'same|ratio|per serving|each|proportion' },
      { t: 'Uses the scale factor or divides to get the amount per serving.', k: 'factor|2\\.5|÷|divide|per' },
      { t: 'Gets 750 g (or shows the method to it).', k: '750' },
      { t: 'Checks it makes sense.', k: 'sense|check|reasonable|more than|about' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · A SCALE DRAWING', kind: 'number', label: 'cm:', stuck: 'challenge', q: 'A floor plan is drawn at 1 : 50. A wall measures 8 cm on the plan. How long is the real wall, in centimetres?', answer: 400,
      success: 'Yes: 8 × 50 = 400 cm.', diag: [{ v: 58, type: 'meaning', msg: '58 adds 50. The scale means multiply: each cm stands for 50 cm.' }, { v: 0.16, type: 'meaning', msg: 'That divides by 50. Real lengths are bigger than the drawing: multiply.' }],
      hints: ['Each 1 cm on paper is 50 cm real.'], worked: ['8 × 50 = 400 cm'] },
    { id: 'c2', tier: '2 · CONVERT', kind: 'number', label: 'm:', stuck: 'challenge', q: 'And in metres?', answer: 4, success: 'Yes: 400 ÷ 100 = 4 m.', hints: ['100 cm = 1 m.'], worked: ['400 ÷ 100 = 4'] },
    { id: 'c3', tier: '3 · SET IT UP', kind: 'choice', stuck: 'challenge', q: '3 cups of rice feeds 4 people. Which proportion finds the rice for 10?',
      options: [{ id: 'a', t: '3/4 = x/10', correct: true, v: 'Yes — cups per person on both sides, in the same order.' },
                { id: 'b', t: '4/3 = x/10', v: 'That mixes the order: people/cups on the left but cups/people on the right.' },
                { id: 'c', t: '3/10 = x/4', v: 'That would give the rice for 4 if 3 cups fed 10 — the other way round.' }] },
    { id: 'c4', tier: '4 · SOLVE IT', kind: 'number', label: 'cups:', stuck: 'challenge', q: 'Solve 3/4 = x/10.', answer: 7.5,
      success: 'Yes: 4x = 30, x = 7.5 cups.', diag: [{ v: 9, type: 'meaning', msg: '9 adds 6. Cross-multiply: 4x = 30.' }], hints: ['Multiply both sides by 40, or cross-multiply.'], worked: ['4x = 30', 'x = 7.5'] },
    { id: 'c5', tier: 'STRETCH · A MODEL CAR', kind: 'number', paths: 'refresh,together', label: 'm:', stuck: 'challenge', q: 'A 1 : 24 model car is 18 cm long. How long is the real car, in metres?', answer: 4.32,
      success: 'Yes: 18 × 24 = 432 cm = 4.32 m — a typical car length, so the answer is sensible.', diag: [{ v: 432, type: 'reading', msg: '432 is in centimetres. The question asks for metres.' }],
      hints: ['Multiply by 24, then convert.'], worked: ['18 × 24 = 432 cm', '4.32 m'] }] },
  reflect: { tomorrow: 'Next, Week 4 begins with Lesson 16: the coordinate plane — turning pairs of numbers into points.', next: 16 },
  stuck: {
    see: { concept: 'one scale factor for everything', ways: [
      { type: 'SIMPLIFY IT', body: 'Find how many times bigger the new batch is — 10 ÷ 4 = 2.5 — then multiply every ingredient by that number.' },
      { type: 'TRY IT TOGETHER', body: 'For 8 servings the factor is 8 ÷ 4 = 2.', turn: { q: 'Your turn: how many eggs for 8 servings?', a: 4 } }] },
    understand: { concept: 'scale factors and units', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part: the scale factor, setting up the proportion, or units?', options: [
        { l: 'The scale factor', b: 'New ÷ old. From 4 servings to 10: 10 ÷ 4 = 2.5.' },
        { l: 'Setting it up', b: 'Same order on both sides: amount/servings = amount/servings.' },
        { l: 'Units', b: 'Work in one unit, then convert at the end: 400 cm = 4 m.' }] } }] }
  }
});

export const W3 = { 11: L11, 12: L12, 13: L13, 14: L14, 15: L15 };
