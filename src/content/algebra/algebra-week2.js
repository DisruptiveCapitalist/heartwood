import { fmt, mk } from './algebra-util.js';

const L5 = mk({
  n: 5, week: 1, index: 5, concept: 'putting Week 1 together',
  kicker: 'LESSON 5 · REVIEW AND CHALLENGE',
  title: 'Four ideas, one picture',
  goal: 'Use relationships, signed numbers, expressions and equality together — and explain how they connect.',
  hook: { learn: 'This week you met four ideas. On their own, each is useful. Together they let you describe a situation in symbols and find something you didn’t know. Today you use all four at once.',
    refresh: 'A quick integration pass. If it all holds together, move straight on to Week 2.' },
  map: { relationship: 3, signed: 3, expression: 3, equality: 3 },
  prereq: { label: 'Lesson 4 — The meaning of equality', href: 4, body: 'Most of today leans on Lesson 4’s balance. If the equals sign still feels like “the answer comes next,” spend ten minutes there first.' },
  see: { visual: 'balance', balance: { x: 6, nL: 4, nR: 10 },
    prompt: { learn: 'A new bag, a new mystery. Use only the scale to find what’s in it — then open it to check.' },
    observations: [
      'You wrote the scale as an equation before you solved it: that’s Lesson 1’s idea — describing a relationship in symbols.',
      'Every move kept both sides equal. That’s Lesson 4.',
      'When the bag was alone, you could substitute its value back in to check — Lesson 3.'] },
  understand: {
    sentences: [
      'A relationship says how one quantity depends on another; writing it in symbols turns it into an expression or an equation.',
      'Expressions can include negative numbers, and the number line tells you which way each operation moves you.',
      'An equation is a balance. Change both sides the same way and it stays true — which is how you find an unknown.'],
    worked: [
      { title: 'A temperature that changes', steps: [
        { m: 'starts at −3°, rises 2° an hour', w: 'A relationship between temperature and hours.' },
        { m: 'T = −3 + 2h', w: 'Let h be hours and T the temperature.' },
        { m: 'h = 4  →  T = −3 + 8 = 5', w: 'Substitute 4 hours. On the number line: start at −3, move 8 right.' },
        { m: 'When is it 7°?  −3 + 2h = 7', w: 'Now it’s an equation: a claim to make true.' },
        { m: '2h = 10  →  h = 5', w: 'Add 3 to both sides, then halve both sides. Check: −3 + 10 = 7 ✓' }] }],
    guided: [
      { id: 'g1', kind: 'number', q: 'T = −3 + 2h. What is T after 6 hours?', label: 'T =', answer: 9, stuck: 'understand',
        success: 'Yes: 2 × 6 = 12, and −3 + 12 = 9.',
        diag: [{ v: 15, type: 'sign', msg: '15 is 3 + 12. The starting temperature was −3, so start at −3 and move 12 right.' },
               { v: 6, type: 'order', msg: '6 is (−3 + 2) × 6. Multiply first: 2 × 6 = 12, then add to −3.' }],
        hints: ['2h means 2 × h.', '2 × 6 = 12. Start at −3 and move 12 right.'], worked: ['T = −3 + 2 × 6', 'T = −3 + 12 = 9'] }],
    vocab: [
      { term: 'Model', def: 'An expression or equation that describes a real situation.' },
      { term: 'Evaluate', def: 'Find an expression’s value by substituting numbers for its letters.' },
      { term: 'Solve', def: 'Find the value of the unknown that makes an equation true.' }],
    deeper: { title: 'Why these four come first', paras: [
      'Every later topic — solving, proportions, graphs, systems, functions — uses all four of this week’s ideas. A graph is a picture of a relationship; its points are found by evaluating expressions; its crossings are found by solving equations; and its axes run both ways from zero.',
      'If one of the four feels shaky, the later work will feel like rules to memorize. If all four make sense, most of the later rules can be worked out rather than remembered.'] } },
  connect: {
    items: [
      { t: 'A plumber’s bill: $45 call-out plus $30 an hour is the expression 45 + 30h.', p: 'all' },
      { t: 'A freezer warming up after a power cut: −18° plus 3° an hour.', p: 'all' },
      { t: 'Saving for something: you need the amount saved to equal the price — an equation.', p: 'learn,together' },
      { t: 'Elevation on a hike that starts below sea level and climbs at a steady rate.', p: 'refresh,together' }],
    builder: { title: 'Let’s see it happen', body: 'Put a glass of water with ice in it on the counter with a kitchen thermometer, if you have one. Read it every 10 minutes. The temperature climbs roughly steadily for a while — a relationship you could write as start + rate × time, at least until the ice is gone.' },
    own: 'A situation from this week where all four ideas showed up…',
    affirm: 'Good. Describing it, working out values, handling direction and keeping things equal — that’s the whole toolkit for Week 2.' },
  feynman: { prompt: { learn: 'Explain how this week’s four ideas fit together: relationships, negative numbers, expressions, and the meaning of equality. Use one example.' },
    checks: [
      { t: 'Says a relationship can be written as an expression with a letter.', k: 'relationship|depend|letter|variable|express' },
      { t: 'Mentions negative numbers or direction.', k: 'negative|below|minus|left|direction|−|-\\d' },
      { t: 'Says an equation means both sides are the same amount.', k: 'same|equal|balanc|both sides' },
      { t: 'Gives an example.', k: '\\d' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · EVALUATE', kind: 'number', label: 'answer:', q: 'If n = −3, what is 4n + 15?', answer: 3, stuck: 'challenge',
      success: 'Yes: 4 × (−3) = −12, and −12 + 15 = 3.',
      diag: [{ v: 27, type: 'sign', msg: '27 uses +3 instead of −3. 4 × (−3) is −12.' }, { v: -27, type: 'sign', msg: 'You subtracted 15. The expression adds 15 to −12: move 15 right from −12.' }],
      hints: ['4n with n = −3 is 4 × (−3).', '4 × (−3) = −12. Now −12 + 15.'], worked: ['4 × (−3) + 15', '−12 + 15 = 3'] },
    { id: 'c2', tier: '2 · EQUALITY', kind: 'choice', stuck: 'challenge', q: 'Is  −2 + 9 = 10 − 3  true?',
      options: [{ id: 't', t: 'True', correct: true, v: 'Yes. Left: −2 + 9 = 7. Right: 10 − 3 = 7. Same amount, so the statement is true.' },
                { id: 'f', t: 'False', v: 'Work out each side on its own: −2 + 9 is 7, and 10 − 3 is 7. Both are 7, so it’s true.' }] },
    { id: 'c3', tier: '3 · MODEL IT', kind: 'number', label: '$', stuck: 'challenge', q: 'A plumber charges $45 to come out plus $30 an hour. What does a 3-hour job cost?', answer: 135,
      success: 'Yes: 45 + 30 × 3 = 135.',
      diag: [{ v: 225, type: 'order', msg: '225 is (45 + 30) × 3 — as if the call-out were charged every hour. The $45 is charged once: 45 + 30 × 3.' }, { v: 78, type: 'meaning', msg: '78 is 45 + 30 + 3. The $30 is per hour: 30 × 3.' }],
      hints: ['Write it as 45 + 30h.', '30 × 3 = 90. Then add 45.'], worked: ['45 + 30h', '45 + 30 × 3', '45 + 90 = 135'] },
    { id: 'c4', tier: '4 · SOLVE IT', kind: 'number', label: 'h =', stuck: 'challenge', q: 'The same plumber’s bill came to $165. How many hours?  45 + 30h = 165', answer: 4,
      success: 'Yes — 4 hours. Check: 45 + 30 × 4 = 165 ✓',
      check: v => 'Check: 45 + 30 × ' + fmt(v) + ' = ' + fmt(45 + 30 * v) + ', not 165.',
      diag: [{ v: 7, type: 'order', msg: '7 is 210 ÷ 30 — you added 45 instead of subtracting it. Take the call-out off both sides first: 165 − 45.' }],
      hints: ['Undo the + 45 first.', '30h = 120. Now divide both sides by 30.'], worked: ['45 + 30h = 165', '30h = 120', 'h = 4'] },
    { id: 'c5', tier: 'STRETCH', kind: 'choice', paths: 'refresh,together', stuck: 'challenge', q: 'For which values of t is  2t + 2 = 2(t + 1)  true?',
      options: [{ id: 'a', t: 'Only t = 1', v: 'It’s true at t = 1 — but try t = 5: 12 and 12. Try t = −3: −4 and −4. It holds every time.' },
                { id: 'b', t: 'Every value of t', correct: true, v: 'Yes. 2(t + 1) is two t’s and two 1’s: 2t + 2. The two sides are the same expression written two ways, so the equation is true for every t.' },
                { id: 'c', t: 'No value', v: 'Try t = 0: 2 and 2. True. In fact both sides are the same expression, so it’s true for every t.' }] }] },
  reflect: { tomorrow: 'Next, Week 2 begins with Lesson 6: what it really means to solve for an unknown.', next: 6 },
  stuck: {
    see: { concept: 'the balance', ways: [
      { type: 'SIMPLIFY IT', body: 'Only one rule: level means both sides weigh the same. Take the same number of blocks off both sides until the bag is alone.' },
      { type: 'TRY IT TOGETHER', body: 'I’ll press “Take 1 off both” twice: now the bag and 2 blocks balance 8.', turn: { q: 'Your turn: two more presses. What does the bag balance?', a: 6 } }] },
    understand: { concept: 'how the four ideas combine', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part: writing the expression, the negative number, or solving?', options: [
        { l: 'Writing it', b: 'Say it in words first: “start at −3, add 2 for each hour.” Then swap the words for symbols: −3 + 2h.' },
        { l: 'The negative', b: 'Picture a thermometer: start 3 below zero, and each hour climb 2.' },
        { l: 'Solving', b: 'Undo what was done to h, on both sides: first the −3 (add 3), then the × 2 (halve).' }] } },
      { type: 'USE AN EXAMPLE', body: 'Simpler numbers: start at 0°, rise 3° an hour. T = 3h. After 4 hours: 12°.', turn: { q: 'Your turn: T = 3h. After 5 hours?', a: 15 } }] },
    challenge: { concept: 'combining the week’s ideas', ways: [
      { type: 'WORK BACKWARD', body: 'Take the answer to the plumber question — 4 hours — and run it forward: 30 × 4 = 120, plus 45 = 165. Solving is that trip in reverse.' },
      { type: 'FIND THE STUCK POINT', point: { q: 'Is it the signs, the order of operations, or setting up the equation?', options: [
        { l: 'The signs', b: 'Put negative numbers in brackets when you substitute: 4 × (−3). A positive times a negative is negative.' },
        { l: 'Order of operations', b: 'Multiply before adding: in 45 + 30h, work out 30h first.' },
        { l: 'Setting it up', b: 'Name the unknown, then write what you know about it: “call-out plus 30 per hour equals the bill.”' }] } }] }
  }
});

const L6 = mk({
  n: 6, week: 2, index: 1, concept: 'what it means to solve',
  kicker: 'LESSON 6 · THE UNKNOWN QUANTITY',
  title: 'What “solve for x” really asks',
  goal: 'Understand solving as finding the value that makes an equation true, tell solving apart from simplifying, and check an answer by substitution.',
  hook: { learn: '“I’m thinking of a number. I multiply it by 3 and add 2, and I get 17.” You can find it by guessing — and that’s a perfectly good start. Today we see what “solving” is really after, and why checking matters as much as finding.',
    refresh: 'Before methods: what is a solution? Rebuild it from guess-and-check, then see what simplifying is — and isn’t.' },
  map: { solving: 3, substitution: 3, expression: 3 },
  see: { visual: 'generic',
    generic: {
      sliders: [{ id: 'g', label: 'GUESS', min: 0, max: 10, step: 1, def: 2 }],
      init: { tried: [] },
      buttons: [{ label: 'Try this guess', primary: true, act: v => ({ tried: (v.tried || []).includes(v.g) ? v.tried : (v.tried || []).concat([v.g]) }) },
                { label: 'Clear my tries', act: () => ({ tried: [] }) }],
      render: v => {
        const tried = v.tried || [], hit = tried.includes(5);
        return {
          story: '“I’m thinking of a number. I multiply it by 3, then add 2. I get 17.”   As an equation:  3x + 2 = 17.',
          big: '3 × ' + v.g + ' + 2 = ' + (3 * v.g + 2) + (3 * v.g + 2 === 17 ? '   ✓ true' : (3 * v.g + 2 < 17 ? '   — too small' : '   — too big')),
          table: tried.length ? { head: ['GUESS'].concat(tried.map(String)), rows: [['3x + 2'].concat(tried.map(t => 3 * t + 2)), ['vs 17'].concat(tried.map(t => 3 * t + 2 === 17 ? '✓' : 3 * t + 2 < 17 ? 'low' : 'high'))],
            hl: (r, c) => c > 0 && tried[c - 1] === 5 } : null,
          msg: hit ? 'Found it: x = 5 is the solution — the one value that makes 3x + 2 = 17 true. Every “Try” was a check by substitution.' : tried.length ? 'Each try is a substitution: put the guess in for x and see whether the claim comes out true.' : 'Move the slider, then press “Try this guess.”',
          ok: hit, goal: hit };
      } },
    prompt: { learn: 'Guess the number. Each try puts your guess in for x and checks whether the equation is true.' },
    observations: [
      'A solution is a value that makes the equation true. 5 works; nothing else does.',
      'Each guess was a substitution — and substitution is also how you check an answer, however you found it.',
      'Low, low, high… the results told you which way to adjust. That’s reasoning, not luck — and Lesson 7 makes it exact.'] },
  understand: {
    sentences: [
      'To solve an equation is to find the value — or values — of the unknown that make it true. That value is called a solution.',
      'Simplifying is different. It rewrites an expression in a shorter, equivalent form, like 4x + 3x = 7x. Nothing is found; no equals-sign claim is being tested.',
      'However you find an answer — guessing, reasoning or a method — you check it the same way: substitute it into the original equation and see whether both sides match.'],
    worked: [
      { title: 'Solving: 3x + 2 = 17', steps: [
        { m: 'try x = 4:  3 × 4 + 2 = 14', w: '14 is less than 17, so x is bigger than 4.' },
        { m: 'try x = 5:  3 × 5 + 2 = 17 ✓', w: 'Both sides match. 5 is the solution.' }] },
      { title: 'Simplifying: 4x + 3x − 2', steps: [
        { m: '4x + 3x − 2', w: 'Four x’s and three more x’s, minus 2.' },
        { m: '7x − 2', w: 'Combine the like terms. That’s it — there’s no value to find, because nothing was claimed equal to anything.' }] }],
    guided: [
      { id: 'g1', kind: 'choice', q: 'Which of these asks you to find a value?', stuck: 'understand',
        options: [{ id: 'a', t: 'Simplify 2a + 5a', v: 'That asks you to rewrite it: 7a. There’s no equals sign, so no value to find.' },
                  { id: 'b', t: 'Solve 2a + 5 = 19', correct: true, v: 'Yes — it’s an equation, a claim, and solving finds the value that makes it true: a = 7.' },
                  { id: 'c', t: 'Evaluate 2a + 5 when a = 3', v: 'That gives you the value of a and asks for the expression’s value: 11. You’re not finding a.' }] },
      { id: 'g2', kind: 'choice', q: 'Is x = 4 a solution of 5x − 3 = 17?', stuck: 'understand',
        options: [{ id: 'y', t: 'Yes', correct: true, v: 'Yes: 5 × 4 − 3 = 20 − 3 = 17. Both sides match.' },
                  { id: 'n', t: 'No', v: 'Substitute and check: 5 × 4 = 20, and 20 − 3 = 17. Both sides are 17, so it is a solution.' }] }],
    vocab: [
      { term: 'Solution', def: 'A value of the unknown that makes an equation true.' },
      { term: 'Solve', def: 'Find the solution or solutions of an equation.' },
      { term: 'Simplify', def: 'Rewrite an expression in a simpler, equivalent form. No value is found.' },
      { term: 'Like terms', def: 'Terms with the same letter part, like 4x and 3x, which can be combined.' }],
    deeper: { title: 'Solutions can be one, none, or every value', paras: [
      'Most equations you meet early have exactly one solution. But x + 1 = x + 2 has none — no number is one more than itself and also two more than itself. And 2(x + 1) = 2x + 2 is true for every x; it is really an identity, two ways of writing the same expression.',
      'This is why checking by substitution matters: it is the definition of a solution, not a formality. A method can be applied wrongly; substitution tells you whether the claim is actually true.',
      'Guess-and-check is not cheating. It is the oldest method there is, and with a calculator and some reasoning about “too high / too low,” it is the idea behind numerical methods used to solve equations that have no tidy formula.'] } },
  connect: {
    items: [
      { t: 'Working out a missing price: three coffees and a $4 muffin came to $13.', p: 'all' },
      { t: 'Checking change: you add up what you bought and compare it to what you paid.', p: 'all' },
      { t: 'A puzzle: “I’m thinking of a number…” games are equations in disguise.', p: 'learn,together' },
      { t: 'Spreadsheet “Goal Seek”: it tries values until a formula gives the target you want — guess-and-check, automated.', p: 'refresh,together' }],
    builder: { title: 'Let’s check it', body: 'Take a recent receipt with several items. Pick one price and cover it with your thumb. Using the total and the other prices, work out the hidden one. Then lift your thumb. That uncovering is your check by substitution.' },
    own: 'A time you worked out a missing number from a total…',
    affirm: 'Good. In each, there was one unknown and a claim about it — and a value that made the claim true.' },
  feynman: { prompt: { learn: 'Explain the difference between solving 3x + 2 = 17 and simplifying 3x + 2x. What does “a solution” mean, and how do you know you have one?' },
    checks: [
      { t: 'Says a solution is a value that makes the equation true.', k: 'true|makes|works|satisf' },
      { t: 'Says simplifying rewrites without finding a value.', k: 'rewrite|shorter|combine|simpler|same thing|5x|no value|nothing to find' },
      { t: 'Mentions checking by putting the value back in.', k: 'check|substitut|put .* back|plug|replace' },
      { t: 'Mentions the equals sign as the difference.', k: 'equal|=|claim|equation' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · FIND THE VALUE', kind: 'number', label: 'n =', stuck: 'challenge', q: 'Which whole number makes 4n − 1 = 23 true?', answer: 6,
      success: 'Yes: 4 × 6 − 1 = 23 ✓', check: v => 'Check: 4 × ' + fmt(v) + ' − 1 = ' + fmt(4 * v - 1) + ', not 23.',
      hints: ['Try a guess and substitute it.', '4 × 5 − 1 = 19 is too small. Try one more.'], worked: ['Try 5: 19, too small.', 'Try 6: 4 × 6 − 1 = 23 ✓'] },
    { id: 'c2', tier: '2 · SOLVE OR SIMPLIFY?', kind: 'choice', stuck: 'challenge', q: 'Simplify  6y − 2y.',
      options: [{ id: 'a', t: '4y', correct: true, v: 'Yes. Six y’s take away two y’s leaves four y’s. Nothing to solve — it’s an expression.' },
                { id: 'b', t: '4', v: 'The y’s don’t disappear: six y’s minus two y’s is four y’s, 4y.' },
                { id: 'c', t: 'y = 4', v: 'There’s no equation here, so no value of y to find. Simplifying gives 4y.' }] },
    { id: 'c3', tier: '3 · CHECK SOMEONE’S WORK', kind: 'number', label: 'x =', stuck: 'challenge', q: 'Sam says x = 3 solves 2x + 7 = 11. Check it. If Sam is wrong, enter the correct value.', answer: 2,
      success: 'Right — Sam’s 3 gives 13, not 11. The solution is 2: 2 × 2 + 7 = 11 ✓',
      diag: [{ v: 3, type: 'reading', msg: 'Substitute Sam’s answer: 2 × 3 + 7 = 13. That isn’t 11, so 3 isn’t the solution.' }, { v: 9, type: 'sign', msg: '9 comes from adding 7 to 11. The 7 was added to 2x, so subtract it: 11 − 7 = 4, then halve.' }],
      hints: ['Put 3 in for x. Is the left side 11?', 'It’s 13 — too big by 2. Try a smaller value.'], worked: ['Sam: 2 × 3 + 7 = 13 ✗', 'Try 2: 2 × 2 + 7 = 11 ✓'] },
    { id: 'c4', tier: 'STRETCH', kind: 'choice', paths: 'refresh,together', stuck: 'challenge', q: 'How many solutions does  x + 1 = x + 2  have?',
      options: [{ id: 'a', t: 'One', v: 'Try any value: the right side is always one more than the left. No value can make them equal.' },
                { id: 'b', t: 'None', correct: true, v: 'Yes. Take x off both sides and you’re left claiming 1 = 2, which is never true.' },
                { id: 'c', t: 'Every value', v: 'Try x = 0: 1 and 2. Not equal. It’s never true — taking x off both sides leaves 1 = 2.' }] }] },
  reflect: { tomorrow: 'Next, Lesson 7: instead of guessing, undo what was done to x — one move at a time.', next: 7 },
  stuck: {
    see: { concept: 'guess and check', ways: [
      { type: 'TRY IT TOGETHER', body: 'I’ll try 4: 3 × 4 + 2 = 14. That’s 3 short of 17.', turn: { q: 'Your turn: what do you get with 5?', a: 17 } },
      { type: 'SIMPLIFY IT', body: 'Each guess is a question: “If the number were this, would I get 17?” If you get less, guess higher. If more, guess lower.' }] },
    understand: { concept: 'solving versus simplifying', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part: what a solution is, simplifying, or checking?', options: [
        { l: 'What a solution is', b: 'The number you can put in for x that makes the equation’s two sides come out the same.' },
        { l: 'Simplifying', b: 'Tidying up an expression — collecting the x’s together. There’s no equals sign, so nothing to find.' },
        { l: 'Checking', b: 'Put your number in place of x in the original, and work out both sides. Same? It’s a solution.' }] } },
      { type: 'USE AN EXAMPLE', body: 'Solve x + 4 = 10: the value is 6. Simplify x + 4x: it becomes 5x, and that’s the end.', turn: { q: 'Your turn: solve x + 9 = 15.  x = ?', a: 6 } }] }
  }
});

const L8 = mk({
  n: 8, week: 2, index: 3, concept: 'two-step equations',
  kicker: 'LESSON 8 · TWO-STEP EQUATIONS',
  title: 'Undoing two moves, last one first',
  goal: 'Solve equations that need two inverse operations by undoing them in reverse order, writing each step, and checking the result.',
  hook: { learn: 'Getting dressed: socks, then shoes. Getting undressed: shoes, then socks. Two-step equations work the same way — you undo the steps in the reverse of the order they were done.',
    refresh: 'If you remember the moves but not the order, this is the lesson. The order falls out of one idea: undo the last thing first.' },
  map: { twostep: 3, inverse: 3, substitution: 3 },
  prereq: { label: 'Lesson 7 — Undoing one move', href: 7, body: 'A two-step equation is two one-step equations in a row. If choosing a single undo move feels shaky, Lesson 7 is the place to firm it up.' },
  see: { visual: 'machine', machines: [
      { ops: [['×', 3], ['+', 4]], out: 19 }, { ops: [['×', 2], ['−', 5]], out: 9 },
      { ops: [['÷', 2], ['+', 3]], out: 8 }, { ops: [['×', 4], ['+', 1]], out: 29 }],
    prompt: { learn: 'Each machine does two things to x. Run it backward — and notice which step you have to undo first.' },
    observations: [
      'To get back to x you had to undo the last step first. The step nearest the output comes off first.',
      'Each undo is a one-step equation. A two-step equation is just two of those in a row.',
      'Checking runs the machine forward again: if your x gives the original output, you’re right.'] },
  understand: {
    sentences: [
      'In a two-step equation, two operations have been done to the unknown — usually a multiplication or division, then an addition or subtraction.',
      'Undo them in reverse order: the operation done last comes off first. In 3x + 4, the + 4 happened after the × 3, so subtract 4 first.',
      'Write every step, doing each move to both sides, and check the answer in the original equation.'],
    worked: [
      { title: '3x + 4 = 19', steps: [
        { m: '3x + 4 = 19', w: 'x was multiplied by 3, then 4 was added.' },
        { m: '3x + 4 − 4 = 19 − 4', w: 'Undo the last step first: subtract 4 from both sides.' },
        { m: '3x = 15', w: 'Now it’s a one-step equation.' },
        { m: '3x ÷ 3 = 15 ÷ 3', w: 'Undo the multiplication: divide both sides by 3.' },
        { m: 'x = 5   Check: 3 × 5 + 4 = 19 ✓', w: 'Both sides match.' }] },
      { title: 'x ÷ 2 − 3 = 5', steps: [
        { m: 'x ÷ 2 − 3 = 5', w: 'x was halved, then 3 was taken away.' },
        { m: 'x ÷ 2 = 8', w: 'Add 3 to both sides.' },
        { m: 'x = 16', w: 'Multiply both sides by 2.' },
        { m: 'Check: 16 ÷ 2 − 3 = 5 ✓', w: 'Both sides match.' }] }],
    guidedTitle: 'TRY IT TOGETHER — ONE STEP AT A TIME',
    guided: [
      { id: 'g1', kind: 'choice', q: 'Solve 5x − 7 = 18. Which move comes first?', stuck: 'understand',
        options: [{ id: 'a', t: 'Divide both sides by 5', v: 'That’s allowed, but it leaves x − 7/5 = 18/5 — messy. The − 7 was done last, so undo it first.' },
                  { id: 'b', t: 'Add 7 to both sides', correct: true, v: 'Yes — the − 7 was the last thing done to x, so it comes off first: 5x = 25.' },
                  { id: 'c', t: 'Subtract 7 from both sides', v: 'Subtracting 7 again makes it 5x − 14 = 11 — further away. The opposite of − 7 is + 7.' }] },
      { id: 'g2', kind: 'number', q: 'Now 5x = 25. What is x?', label: 'x =', answer: 5, stuck: 'understand', success: 'Yes — x = 5.',
        diag: [{ v: 20, type: 'meaning', msg: '20 is 25 − 5. 5x means 5 times x, so divide both sides by 5.' }], hints: ['5x means 5 × x. What undoes multiplying by 5?'], worked: ['5x ÷ 5 = 25 ÷ 5', 'x = 5'] },
      { id: 'g3', kind: 'number', q: 'Check: what is 5 × 5 − 7?', label: '=', answer: 18, stuck: 'understand', success: '18 — the same as the right side. x = 5 is right.', hints: ['5 × 5 = 25. Then take away 7.'], worked: ['25 − 7 = 18 ✓'] }],
    vocab: [
      { term: 'Two-step equation', def: 'An equation that needs two inverse operations to isolate the unknown.' },
      { term: 'Reverse order', def: 'Undoing operations starting from the one done last.' },
      { term: 'Isolate', def: 'Get the unknown alone on one side.' }],
    deeper: { title: 'Why reverse order — and when the order doesn’t matter', paras: [
      'Think of the expression as a sequence of functions: first “times 3,” then “plus 4.” To invert a sequence you invert each function and apply them in the opposite order — the same reason you take off shoes before socks.',
      'You can divide first if you are careful: 3x + 4 = 19 becomes x + 4/3 = 19/3, which is correct but awkward. The reverse-order rule isn’t the only valid path; it’s the cleanest.',
      'Brackets change what “last” means. In 3(x + 4) = 27, the + 4 happened first and the × 3 last, so divide first: x + 4 = 9, then x = 5.'] } },
  connect: {
    items: [
      { t: 'A taxi: $3 to start plus $2 a mile, and the fare was $15. 3 + 2m = 15, so m = 6 miles.', p: 'all' },
      { t: 'A gym: $25 to join plus $15 a month. You’ve paid $100 in total: 25 + 15m = 100, so 5 months.', p: 'all' },
      { t: 'Phone plan: $20 base plus $5 per extra gigabyte; the bill was $45. How many gigabytes?', p: 'learn,together' },
      { t: 'Temperature: 86 °F in Celsius. 1.8C + 32 = 86, so 1.8C = 54 and C = 30.', p: 'refresh,together' }],
    builder: { title: 'Let’s work it out', body: 'Look at a utility bill: most have a fixed monthly charge plus a rate per unit (kilowatt-hour, gallon, therm). Subtract the fixed charge from the total, then divide by the rate. You should get the usage printed on the bill — two steps, undone in reverse.' },
    own: 'A bill or price with a fixed part and a per-item part…',
    affirm: 'Good. Fixed part plus rate times amount is the most common two-step equation in everyday life.' },
  feynman: { prompt: { learn: 'Why do we undo the + 4 before the × 3 when solving 3x + 4 = 19? Explain it to someone who’s never seen it.' },
    checks: [
      { t: 'Says the + 4 was done last (or the × 3 first).', k: 'last|first|order|after|before' },
      { t: 'Says you undo in reverse / opposite order.', k: 'reverse|backward|opposite|undo' },
      { t: 'Says each move is done to both sides.', k: 'both|each side|balanc' },
      { t: 'Mentions checking the answer.', k: 'check|substitut|put .* back|plug' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · START HERE', kind: 'number', label: 'x =', stuck: 'challenge', q: '2x + 5 = 17', answer: 6,
      success: 'Yes. Check: 2 × 6 + 5 = 17 ✓', check: v => 'Check: 2 × ' + fmt(v) + ' + 5 = ' + fmt(2 * v + 5) + ', not 17.',
      diag: [{ v: 11, type: 'sign', msg: '11 is (17 + 5) ÷ 2. The 5 was added, so subtract it: 17 − 5 = 12.' }, { v: 12, type: 'reading', msg: '12 is 2x — one step to go. Divide both sides by 2.' }, { v: 3.5, type: 'order', msg: 'You divided first, then subtracted. Undo the last step first: subtract 5, then divide by 2.' }],
      hints: ['What was done last to x?', 'Subtract 5 from both sides first: 2x = 12.'], worked: ['2x + 5 = 17', '2x = 12', 'x = 6'] },
    { id: 'c2', tier: '2 · WITH DIVISION', kind: 'number', label: 'x =', stuck: 'challenge', q: 'x ÷ 4 + 3 = 7', answer: 16,
      success: 'Yes. Check: 16 ÷ 4 + 3 = 7 ✓', check: v => 'Check: ' + fmt(v) + ' ÷ 4 + 3 = ' + fmt(v / 4 + 3) + ', not 7.',
      diag: [{ v: 1, type: 'meaning', msg: '1 is 4 ÷ 4. After subtracting 3 you have x ÷ 4 = 4 — undo the division by multiplying by 4.' }, { v: 4, type: 'reading', msg: '4 is x ÷ 4. One more step: multiply both sides by 4.' }],
      hints: ['Undo the + 3 first.', 'x ÷ 4 = 4. Multiply both sides by 4.'], worked: ['x ÷ 4 + 3 = 7', 'x ÷ 4 = 4', 'x = 16'] },
    { id: 'c3', tier: '3 · A NEGATIVE COEFFICIENT', kind: 'number', label: 'x =', stuck: 'challenge', q: '−2x + 5 = 13', answer: -4,
      success: 'Yes. Check: −2 × (−4) + 5 = 8 + 5 = 13 ✓', check: v => 'Check: −2 × ' + fmt(v) + ' + 5 = ' + fmt(-2 * v + 5) + ', not 13.',
      diag: [{ v: 4, type: 'sign', msg: 'Nearly. After subtracting 5, −2x = 8. Dividing by −2 gives −4, not 4.' }, { v: -9, type: 'sign', msg: '−9 is (13 + 5) ÷ −2. The + 5 comes off by subtracting: 13 − 5 = 8.' }],
      hints: ['Subtract 5 from both sides.', '−2x = 8. Divide both sides by −2.'], worked: ['−2x + 5 = 13', '−2x = 8', 'x = −4'] },
    { id: 'c4', tier: '4 · CHOOSE YOUR METHOD', kind: 'number', label: 'miles:', stuck: 'challenge', q: 'A taxi charges $3.50 plus $2.25 per mile. The ride cost $21.50. How many miles?', answer: 8,
      success: 'Yes — 8 miles. 3.50 + 2.25m = 21.50, so 2.25m = 18 and m = 8. Check: 3.50 + 18 = 21.50 ✓',
      diag: [{ v: 9.56, type: 'order', msg: 'That’s 21.50 ÷ 2.25 — the $3.50 starting fee was left in. Take it off first.' }],
      hints: ['Write it: 3.50 + 2.25m = 21.50.', 'Subtract 3.50: 2.25m = 18. Then divide.'], worked: ['3.50 + 2.25m = 21.50', '2.25m = 18', 'm = 8'] },
    { id: 'c5', tier: 'STRETCH · BRACKETS', kind: 'number', paths: 'refresh,together', label: 'x =', stuck: 'challenge', q: '3(x + 4) = 27', answer: 5,
      success: 'Yes. Here the × 3 was done last, so it comes off first: x + 4 = 9, x = 5.',
      diag: [{ v: 7.67, type: 'order', msg: 'You subtracted 4 first. With brackets, the + 4 happened first and the × 3 last — so divide by 3 first.' }],
      hints: ['What happened last: adding 4, or multiplying by 3?', 'The × 3 is last. Divide both sides by 3: x + 4 = 9.'], worked: ['3(x + 4) = 27', 'x + 4 = 9', 'x = 5'] }] },
  reflect: { tomorrow: 'Next, Lesson 9: equations with the unknown on both sides — and what it means when there’s no solution at all.', next: 9 },
  stuck: {
    see: { concept: 'undoing two steps', ways: [
      { type: 'WORK BACKWARD', body: 'Build it forward first: take x = 5. Times 3 is 15. Plus 4 is 19. To go back from 19, you meet the + 4 first: 19 − 4 = 15. Then the × 3: 15 ÷ 3 = 5.' },
      { type: 'SIMPLIFY IT', body: 'Look at the machine from the output end. Which box is nearest the output? Undo that one first.' }] },
    understand: { concept: 'the order of the steps', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part: which step comes first, the inverse operation, or the arithmetic?', options: [
        { l: 'Which step first', b: 'Undo the last thing done. In 5x − 7, the − 7 happened after the × 5, so add 7 first.' },
        { l: 'The inverse', b: 'Each operation has an opposite: + and −, × and ÷. Use the opposite, on both sides.' },
        { l: 'The arithmetic', b: 'Do one step, write the new equation, and only then do the next. Then check by substituting.' }] } },
      { type: 'TRY IT TOGETHER', body: 'Solve 4x + 2 = 14. I’ll do step one: subtract 2 from both sides. 4x = 12.', turn: { q: 'Your turn: 4x = 12.  x = ?', a: 3 } }] }
  }
});

const L9 = mk({
  n: 9, week: 2, index: 4, concept: 'unknowns on both sides',
  kicker: 'LESSON 9 · EQUATIONS WITH VARIABLES ON BOTH SIDES',
  title: 'When the unknown is on both sides',
  goal: 'Collect the unknown onto one side by valid moves, combine like terms, and recognize equations with one solution, no solution, or every value as a solution.',
  hook: { learn: 'Two gyms. One costs more to join but less each month. When do they cost the same? The unknown — the number of months — shows up on both sides of the equation. The balance still works; it just has bags on both pans.',
    refresh: 'Unknowns on both sides — and the odd cases with no solution or infinitely many. The balance makes all three make sense.' },
  map: { bothsides: 3, balance: 3, twostep: 3 },
  prereq: { label: 'Lesson 8 — Two-step equations', href: 8, body: 'Once the x’s are on one side, what’s left is a two-step equation. If that feels shaky, Lesson 8 first.' },
  see: { visual: 'balance', balance: { x: 3, bL: 3, nL: 2, bR: 1, nR: 8 },
    prompt: { learn: 'Bags on both sides now. Every bag holds the same number of blocks. Get one bag alone — without opening any.' },
    observations: [
      'Taking a bag off both sides kept the balance — exactly like taking off blocks. A bag is just an unknown number of blocks.',
      'Once the bags were all on one side, it was a two-step equation you already know how to solve.',
      'Collecting the unknown on one side is the only new move. Everything else is Lessons 7 and 8.'] },
  understand: {
    sentences: [
      'When the unknown is on both sides, use the balance: subtract (or add) the same number of x’s from both sides until the x’s are on one side only.',
      'Then combine like terms and solve the two-step equation that’s left.',
      'Sometimes the x’s cancel completely. If what’s left is true — like 6 = 6 — every value is a solution. If it’s false — like 5 = 2 — there is no solution.'],
    worked: [
      { title: '3x + 2 = x + 8', steps: [
        { m: '3x + 2 = x + 8', w: 'Three bags and 2 blocks balance one bag and 8 blocks.' },
        { m: '3x − x + 2 = x − x + 8', w: 'Take one bag (x) off both sides.' },
        { m: '2x + 2 = 8', w: 'Now the unknown is only on the left.' },
        { m: '2x = 6  →  x = 3', w: 'Subtract 2, then divide by 2. Check: 3 × 3 + 2 = 11 and 3 + 8 = 11 ✓' }] },
      { title: 'Two special cases', steps: [
        { m: 'x + 5 = x + 2', w: 'Take x off both sides: 5 = 2. Never true — no solution.' },
        { m: '2(x + 3) = 2x + 6', w: 'Expand: 2x + 6 = 2x + 6. Take 2x off both: 6 = 6. Always true — every value of x is a solution.' }] }],
    guided: [
      { id: 'g1', kind: 'choice', q: 'Solve 5x + 1 = 2x + 13. What’s a good first move?', stuck: 'understand',
        options: [{ id: 'a', t: 'Subtract 2x from both sides', correct: true, v: 'Yes — that collects the x’s on the left: 3x + 1 = 13.' },
                  { id: 'b', t: 'Subtract 5x from the left only', v: 'That tips the balance. Whatever you take from one side, take from the other.' },
                  { id: 'c', t: 'Divide both sides by x', v: 'Dividing by the unknown is risky — it could be zero. Move the x terms with addition or subtraction instead.' }] },
      { id: 'g2', kind: 'number', q: 'Now 3x + 1 = 13. What is x?', label: 'x =', answer: 4, stuck: 'understand',
        success: 'Yes. Check in the original: 5 × 4 + 1 = 21 and 2 × 4 + 13 = 21 ✓',
        diag: [{ v: 14 / 3, type: 'sign', msg: 'You added 1. It was added to 3x, so subtract it: 3x = 12.' }],
        hints: ['Subtract 1 from both sides.', '3x = 12. Divide both sides by 3.'], worked: ['3x + 1 = 13', '3x = 12', 'x = 4'] }],
    vocab: [
      { term: 'Like terms', def: 'Terms with the same variable part, which can be added or subtracted: 3x and x.' },
      { term: 'Collect terms', def: 'Move all the terms with the unknown onto one side using valid moves.' },
      { term: 'No solution', def: 'An equation that is false for every value — it reduces to something like 5 = 2.' },
      { term: 'Identity', def: 'An equation true for every value — it reduces to something like 6 = 6.' }],
    deeper: { title: 'Why “moving a term to the other side” changes its sign', paras: [
      'People often say “move 2x to the other side and change its sign.” That’s a shortcut for subtracting 2x from both sides: it disappears from one side and appears, subtracted, on the other. Knowing the real move lets you check the shortcut.',
      'Graphically, each side is a line: y = 3x + 2 and y = x + 8. The solution is where they cross. No solution means parallel lines that never meet; every value means the same line twice. Week 5 returns to this picture.'] } },
  connect: {
    items: [
      { t: 'Gym A: $40 to join plus $10 a month. Gym B: $20 to join plus $15 a month. They cost the same when 40 + 10m = 20 + 15m.', p: 'all' },
      { t: 'Two people saving: one starts with more, the other saves faster. When do they have the same?', p: 'all' },
      { t: 'Two phone plans with different base fees and rates.', p: 'learn,together' },
      { t: 'Break-even: when a machine that costs more up front but less to run catches up with a cheaper one.', p: 'refresh,together' }],
    builder: { title: 'Let’s compare', body: 'Compare an LED bulb with an old incandescent one. The LED costs more to buy but uses far less power. Write each as purchase price + cost per hour × hours, set them equal, and solve: that’s the number of hours after which the LED is cheaper. For typical prices it’s a few hundred hours.' },
    own: 'Two options where one is cheaper at first and the other later…',
    affirm: 'Good. Whenever two quantities grow at different rates from different starts, “when are they equal?” has the unknown on both sides.' },
  feynman: { prompt: { learn: 'In 3x + 2 = x + 8, why is it allowed to take x away from both sides? And what does it mean if all the x’s cancel out?' },
    checks: [
      { t: 'Says x is just an amount, so taking it from both sides keeps the balance.', k: 'same|balanc|both sides|equal|amount' },
      { t: 'Says the goal is to get the x’s on one side.', k: 'one side|collect|together|by itself|alone' },
      { t: 'Explains no solution: a false statement is left.', k: 'no solution|never|false|impossible' },
      { t: 'Explains every value: a true statement is left.', k: 'always|every|any|infinite|all' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · START HERE', kind: 'number', label: 'x =', stuck: 'challenge', q: '4x − 3 = 2x + 9', answer: 6,
      success: 'Yes. Check: 4 × 6 − 3 = 21 and 2 × 6 + 9 = 21 ✓', check: v => 'Check: left = ' + fmt(4 * v - 3) + ', right = ' + fmt(2 * v + 9) + '.',
      diag: [{ v: 2, type: 'sign', msg: 'It looks like 9 − 3 was used. After taking 2x off both sides you have 2x − 3 = 9: add 3, giving 2x = 12.' }, { v: 12, type: 'reading', msg: '12 is 2x. Divide by 2.' }],
      hints: ['Subtract 2x from both sides.', '2x − 3 = 9. Add 3, then divide by 2.'], worked: ['4x − 3 = 2x + 9', '2x − 3 = 9', '2x = 12', 'x = 6'] },
    { id: 'c2', tier: '2 · NEGATIVES', kind: 'number', label: 'x =', stuck: 'challenge', q: '7x + 2 = 3x − 10', answer: -3,
      success: 'Yes. Check: 7 × (−3) + 2 = −19 and 3 × (−3) − 10 = −19 ✓', check: v => 'Check: left = ' + fmt(7 * v + 2) + ', right = ' + fmt(3 * v - 10) + '.',
      diag: [{ v: 3, type: 'sign', msg: 'Close: 4x = −12, so x is −3, not 3.' }, { v: -2, type: 'sign', msg: 'After taking 3x from both sides: 4x + 2 = −10. Subtract 2: 4x = −12.' }],
      hints: ['Subtract 3x from both sides.', '4x + 2 = −10. Subtract 2: 4x = −12.'], worked: ['7x + 2 = 3x − 10', '4x + 2 = −10', '4x = −12', 'x = −3'] },
    { id: 'c3', tier: '3 · HOW MANY SOLUTIONS?', kind: 'choice', stuck: 'challenge', q: 'How many solutions does  3(x + 2) = 3x + 6  have?',
      options: [{ id: 'a', t: 'One', v: 'Expand the left: 3x + 6. Both sides are the same expression, so every x works.' },
                { id: 'b', t: 'None', v: 'Try x = 0: 6 and 6. True. In fact both sides are identical, so it’s always true.' },
                { id: 'c', t: 'Every value of x', correct: true, v: 'Yes. 3(x + 2) = 3x + 6, so both sides are the same — taking 3x off leaves 6 = 6.' }] },
    { id: 'c4', tier: '4 · AND THIS ONE?', kind: 'choice', stuck: 'challenge', q: 'How many solutions does  2x + 4 = 2x + 7  have?',
      options: [{ id: 'a', t: 'One', v: 'Take 2x from both sides and you’re left with 4 = 7. No value can make that true.' },
                { id: 'b', t: 'None', correct: true, v: 'Yes. The left side is always 3 less than the right, whatever x is.' },
                { id: 'c', t: 'Every value of x', v: 'Try x = 0: 4 and 7. Not equal — and taking 2x off leaves 4 = 7, which is never true.' }] },
    { id: 'c5', tier: 'STRETCH · IN CONTEXT', kind: 'number', label: 'months:', stuck: 'challenge', q: 'Gym A: $40 to join plus $10 a month. Gym B: $20 plus $15 a month. After how many months have you paid the same?', answer: 4,
      success: 'Yes — 4 months, $80 each. 40 + 10m = 20 + 15m → 20 = 5m → m = 4.',
      check: v => 'At ' + fmt(v) + ' months: A costs $' + fmt(40 + 10 * v) + ', B costs $' + fmt(20 + 15 * v) + '.',
      hints: ['Write each total: 40 + 10m and 20 + 15m. Set them equal.', 'Subtract 10m from both sides: 40 = 20 + 5m.'], worked: ['40 + 10m = 20 + 15m', '40 = 20 + 5m', '20 = 5m', 'm = 4'] }] },
  reflect: { tomorrow: 'Next, Lesson 10: a practical mystery that pulls the whole week together.', next: 10 },
  stuck: {
    see: { concept: 'bags on both sides', ways: [
      { type: 'SIMPLIFY IT', body: 'A bag is just some number of blocks. Taking one bag from each side is like taking the same number of blocks from each side — still level.' },
      { type: 'TRY IT TOGETHER', body: 'I’ll press “Take a bag off both”: now 2 bags and 2 blocks balance 8 blocks.', turn: { q: 'Your turn: take 2 blocks off both. Two bags balance how many blocks?', a: 6 } }] },
    understand: { concept: 'collecting the unknown', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Is it moving the x’s, the arithmetic, or the special cases?', options: [
        { l: 'Moving the x’s', b: 'Subtract the smaller number of x’s from both sides. 5x and 2x: take 2x from both.' },
        { l: 'The arithmetic', b: 'Once the x’s are on one side, it’s a two-step equation. Undo the + or − first, then the ×.' },
        { l: 'No solution / every value', b: 'If the x’s vanish completely, look at what’s left. A true statement means every value works; a false one means none does.' }] } },
      { type: 'USE AN EXAMPLE', body: 'Smaller: 2x + 1 = x + 4. Take x off both: x + 1 = 4. So x = 3.', turn: { q: 'Your turn: 3x = x + 10.  x = ?', a: 5 } }] }
  }
});

const L10 = mk({
  n: 10, week: 2, index: 5, concept: 'turning a situation into an equation',
  kicker: 'LESSON 10 · REVIEW AND CHALLENGE',
  title: 'A practical mystery',
  goal: 'Turn a situation into the right equation, solve it, and explain why the answer makes sense in the story.',
  hook: { learn: 'Every equation this week came ready-made. Real problems don’t. Today the hard part isn’t solving — it’s reading a situation and deciding which equation it is.',
    refresh: 'The integration step: from words to equation to answer to sense-check.' },
  map: { solving: 4, twostep: 4, bothsides: 3, modeling: 2 },
  see: { visual: 'machine', machines: [
      { ops: [['×', 2], ['+', 6]], out: 20 }, { ops: [['+', 3], ['×', 4]], out: 36 }, { ops: [['×', 5], ['−', 8]], out: 27 }],
    prompt: { learn: '“Think of a number” puzzles. Each one is an equation in disguise. Undo them — and notice the second one’s order.' },
    observations: [
      'Each puzzle was a sentence that became an equation: the unknown, what was done to it, and the result.',
      'In the second one, the + 3 happened first, so the × 4 came off first. Reading the order from the story is part of the work.',
      'Checking forward told you whether the answer fit the story — not just the arithmetic.'] },
  understand: {
    sentences: [
      'Read: what is the problem asking for? Identify: what’s given? Represent: name the unknown with a letter and write how it’s related to what you know.',
      'Choose and solve: the equation tells you which moves to undo, and in which order.',
      'Check and explain: substitute into the original situation, not just the equation, and ask whether the answer makes sense — a negative number of tickets would be a warning sign.'],
    worked: [
      { title: 'A theater’s takings', steps: [
        { m: 'Tickets are $12. After paying $150 rent, the theater made $210.', w: 'Read: how many tickets were sold?' },
        { m: 'Let t = tickets sold', w: 'Represent the unknown.' },
        { m: '12t − 150 = 210', w: 'Money from tickets, minus rent, equals what was made.' },
        { m: '12t = 360  →  t = 30', w: 'Add 150 to both sides, then divide by 12.' },
        { m: 'Check: 30 × $12 = $360; $360 − $150 = $210 ✓', w: 'A whole number of tickets, and it fits the story.' }] }],
    guided: [
      { id: 'g1', kind: 'choice', q: 'A phone plan is $25 a month plus $0.10 per text. Last month’s bill was $31. Which equation fits?', stuck: 'understand',
        options: [{ id: 'a', t: '25 + 0.10t = 31', correct: true, v: 'Yes: the fixed $25, plus 10 cents for each text, equals the bill.' },
                  { id: 'b', t: '25t + 0.10 = 31', v: 'That charges $25 per text. The $25 is the monthly fee; the per-text charge is $0.10.' },
                  { id: 'c', t: '0.10(25 + t) = 31', v: 'That charges 10 cents on the monthly fee too. Only the texts cost 10 cents each.' }] },
      { id: 'g2', kind: 'number', q: 'Solve 25 + 0.10t = 31. How many texts?', label: 't =', answer: 60, stuck: 'understand',
        success: 'Yes — 60 texts. Check: 25 + 0.10 × 60 = 25 + 6 = 31 ✓',
        diag: [{ v: 6, type: 'reading', msg: '6 is the dollars spent on texts. At $0.10 each, how many texts is that?' }, { v: 560, type: 'sign', msg: 'You added 25. Subtract it: 31 − 25 = 6.' }],
        hints: ['Subtract 25 from both sides.', '0.10t = 6. Divide both sides by 0.10.'], worked: ['0.10t = 6', 't = 6 ÷ 0.10 = 60'] }],
    vocab: [
      { term: 'Model', def: 'An equation that represents a situation.' },
      { term: 'Interpret', def: 'Say what the answer means in the situation, with units.' },
      { term: 'Reasonable', def: 'An answer that fits the situation: the right size, the right sign, a whole number if it has to be.' }],
    deeper: { title: 'When the model and the world disagree', paras: [
      'A model is a simplification. If the equation says 30.4 tickets, the arithmetic may be right and the model incomplete — maybe there was a discount, or the rent wasn’t exactly $150. Checking against the situation catches this; checking against the equation can’t.',
      'Engineers call this validation: does the model predict what actually happens? It’s separate from verification — did I solve the model correctly? Both matter.'] } },
  connect: {
    items: [
      { t: 'Working out how many hours a contractor charged from the bill.', p: 'all' },
      { t: 'Finding how many weeks of saving you need for something.', p: 'all' },
      { t: 'Ages: “Ava is 3 years older than twice her brother’s age.”', p: 'learn,together' },
      { t: 'Back-calculating usage from a utility bill with a fixed charge.', p: 'refresh,together' }],
    builder: { title: 'Let’s model it', body: 'Measure the perimeter of a rectangular table with a tape measure, and then just its width. Write: 2 × (length + width) = perimeter, and solve for the length. Now measure the length. Close? Your model matches the table.' },
    own: 'A real situation where you could write an equation to find something…',
    affirm: 'Good. Naming the unknown, writing what you know about it, and checking the answer against reality — that’s modeling.' },
  feynman: { prompt: { learn: 'For one of today’s problems, explain how you decided which equation to write — and how you know your answer makes sense in the story, not just in the equation.' },
    checks: [
      { t: 'Names the unknown.', k: 'let|unknown|stands for|call it|represents|number of' },
      { t: 'Explains where each part of the equation came from.', k: 'because|each|per|plus|times|fixed|total' },
      { t: 'Checks the answer by substituting.', k: 'check|substitut|put .* back|plug' },
      { t: 'Says why it makes sense in the situation.', k: 'sense|reasonable|whole|realistic|fits|story|real' }] },
  challenge: { problems: [
    { id: 'c1', tier: '1 · AGES', kind: 'number', label: 'age:', stuck: 'challenge', q: 'Ava is 3 years older than twice her brother’s age. Ava is 17. How old is her brother?', answer: 7,
      success: 'Yes — 7. 2b + 3 = 17, so 2b = 14 and b = 7. Check: twice 7 is 14, plus 3 is 17 ✓',
      diag: [{ v: 10, type: 'sign', msg: '10 is (17 + 3) ÷ 2. Ava is 3 older than twice his age, so subtract the 3.' }, { v: 14, type: 'reading', msg: '14 is twice his age. Halve it.' }],
      hints: ['Let b be his age. Twice b, plus 3, is 17.', '2b + 3 = 17.'], worked: ['2b + 3 = 17', '2b = 14', 'b = 7'] },
    { id: 'c2', tier: '2 · A RECTANGLE', kind: 'number', label: 'width:', stuck: 'challenge', q: 'A rectangle’s length is 3 cm more than its width. Its perimeter is 38 cm. What is the width?', answer: 8,
      success: 'Yes — 8 cm (length 11). 2(w + w + 3) = 38 → 4w + 6 = 38 → w = 8. Check: 2 × (8 + 11) = 38 ✓',
      diag: [{ v: 9.5, type: 'meaning', msg: '9.5 is 38 ÷ 4 — as if all four sides were equal. Two sides are 3 cm longer.' }, { v: 11, type: 'reading', msg: '11 is the length. The question asks for the width — 3 less.' }],
      hints: ['Let w be the width. The length is w + 3.', 'Perimeter = 2 × (w + w + 3) = 4w + 6.'], worked: ['2(w + w + 3) = 38', '4w + 6 = 38', '4w = 32', 'w = 8'] },
    { id: 'c3', tier: '3 · CONSECUTIVE NUMBERS', kind: 'number', label: 'smaller:', stuck: 'challenge', q: 'Two consecutive whole numbers add to 47. What is the smaller one?', answer: 23,
      success: 'Yes — 23 and 24. n + (n + 1) = 47 → 2n = 46 → n = 23.',
      diag: [{ v: 23.5, type: 'meaning', msg: '23.5 is half of 47 — but consecutive whole numbers differ by 1. Write n + (n + 1) = 47.' }, { v: 24, type: 'reading', msg: '24 is the larger one.' }],
      hints: ['Call the smaller n. The next is n + 1.', 'n + n + 1 = 47, so 2n + 1 = 47.'], worked: ['n + (n + 1) = 47', '2n + 1 = 47', '2n = 46', 'n = 23'] },
    { id: 'c4', tier: 'STRETCH · IS IT REASONABLE?', kind: 'choice', paths: 'refresh,together', stuck: 'challenge', q: 'A bake sale charged $2 a cookie and had $15 in costs. Someone’s equation says they sold 12.5 cookies. What’s the most likely explanation?',
      options: [{ id: 'a', t: 'The arithmetic is wrong', v: 'Possibly — but check it first. If 2c − 15 = 10, then c = 12.5 is correct arithmetic. The model is the problem.' },
                { id: 'b', t: 'The model is missing something', correct: true, v: 'Yes. You can’t sell half a cookie, so the story isn’t fully captured — maybe there was a discount, a donation, or a different total. Checking against the situation is what caught it.' },
                { id: 'c', t: 'They sold 12 and a half cookies', v: 'Half a cookie isn’t usually for sale. When a model gives an impossible answer, question the model.' }] }] },
  reflect: { tomorrow: 'Next, Week 3 begins with Lesson 11: fractions as relationships between quantities.', next: 11 },
  stuck: {
    see: { concept: 'think-of-a-number puzzles', ways: [
      { type: 'WORK BACKWARD', body: 'Read the puzzle backward: “I got 20. Before that I added 6, so I had 14. Before that I doubled, so I started with 7.”' },
      { type: 'SIMPLIFY IT', body: 'Look at the order in the puzzle. In “add 3, then multiply by 4,” the multiplying happened last — so it comes off first.' }] },
    understand: { concept: 'writing the equation', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part: naming the unknown, building the equation, or checking?', options: [
        { l: 'Naming the unknown', b: 'Find the question’s “how many” or “what is.” That quantity gets the letter.' },
        { l: 'Building the equation', b: 'Say it in words first: “fixed fee plus rate times amount is the total.” Then replace each phrase with numbers and the letter.' },
        { l: 'Checking', b: 'Put your answer back into the story, not just the equation. Does it make sense — the right sign, a whole number if needed?' }] } },
      { type: 'USE AN EXAMPLE', body: 'Simpler: tickets cost $5. You paid $35. 5t = 35, so t = 7 tickets.', turn: { q: 'Your turn: tickets cost $8 and you paid $56. How many?', a: 7 } }] }
  }
});

export const W2 = { 5: L5, 6: L6, 8: L8, 9: L9, 10: L10 };
