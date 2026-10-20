// Heartwood Algebra Companion — content + helpers (shared by Home, Lesson player, Refresher)
//
// Ported from the design handoff's design-references/ as data, almost
// verbatim: all thirty lessons arrived written, with real content in all six
// stages and all three pathways, and the handoff says to treat them as final
// copy. The only edits are the three hrefs below, which were .dc.html files
// with query strings and are now routes.
//
// These modules are pure data and pure functions — no DOM, no storage, no
// network. The player reads them; they never reach out.
import { W2 } from './algebra-week2.js';
import { W3 } from './algebra-week3.js';
import { W4 } from './algebra-week4.js';
import { W5 } from './algebra-week5.js';
import { W6 } from './algebra-week6.js';
export { plot } from './algebra-util.js';
export const PATH_KEY = 'heartwood.algebra.path';
export const FAMILIAR_KEY = 'heartwood.algebra.familiar';
export const REFRESHER_KEY = 'heartwood.algebra.refresher';
export const lessonKey = (n, path) => 'heartwood.algebra.lesson' + n + '.' + path;
// The design reference was a folder of .dc.html files passing state in query
// strings. Heartwood is one app on a hash router, so the three hrefs become
// routes. Everything else in these content files is carried over verbatim.
export const lessonPath = (n) => 'lesson-' + String(n).padStart(2, '0');
export const lessonHref = (n, path) => '#/algebra/' + lessonPath(n) + '/' + path;
export const HOME_HREF = '#/algebra';
export const REFRESHER_HREF = '#/algebra/refresher';
export const BUILT = Array.from({ length: 30 }, (_, i) => i + 1);

export const PATHS = {
  learn: { id: 'learn', label: 'LEARN IT', title: 'Learn it', who: 'For a student meeting the idea for the first time.',
    line: 'See it first, then the words, then your own problems.' },
  refresh: { id: 'refresh', label: 'REFRESH IT', title: 'Math Refresher — Bring the ideas back to life', who: 'For an adult who studied this years ago.',
    line: 'Skip what’s still there. Rebuild the reasoning behind what isn’t.' },
  together: { id: 'together', label: 'LEARN TOGETHER', title: 'Learn together', who: 'For a student and an adult, side by side.',
    line: 'One lesson, two depths. Take turns explaining.' }
};

export const STAGES = [
  { key: 'see', label: 'SEE IT', min: 5 },
  { key: 'understand', label: 'UNDERSTAND IT', min: 8 },
  { key: 'connect', label: 'CONNECT IT', min: 5 },
  { key: 'feynman', label: 'FEYNMAN IT', min: 5 },
  { key: 'challenge', label: 'CHALLENGE IT', min: 5 },
  { key: 'reflect', label: 'REFLECT', min: 2 }
];

export const VOICES = {
  PROFESSOR: '#231e18', ROOMMATE: 'oklch(0.50 0.12 155)', BUILDER: 'oklch(0.44 0.10 250)',
  EDITOR: 'oklch(0.42 0.13 25)', 'FEYNMAN CHECK': '#231e18', JOURNAL: 'oklch(0.50 0.12 155)'
};

export const WEEKS = [
  { title: 'What Algebra Is', idea: 'Symbols for relationships — and what “=” really says.', lessons: [
    'Mathematics as a language of relationships', 'Numbers, negative numbers and the number line',
    'Variables and expressions', 'The meaning of equality', 'Review and challenge'] },
  { title: 'Solving Equations', idea: 'Undo what was done to the unknown, keeping the balance.', lessons: [
    'The unknown quantity', 'One-step equations', 'Two-step equations',
    'Equations with variables on both sides', 'Review and challenge: a practical mystery'] },
  { title: 'Fractions, Ratios and Proportions', idea: 'Comparing quantities, and scaling them fairly.', lessons: [
    'Fractions as relationships', 'Operations with fractions', 'Ratios and rates', 'Proportions',
    'Review and challenge: measure, recipe or scale drawing'] },
  { title: 'Graphs and Linear Relationships', idea: 'A picture of how one quantity changes with another.', lessons: [
    'Coordinates and the coordinate plane', 'What a graph tells us', 'Slope as change',
    'The equation of a line', 'Review and challenge: comparing two plans'] },
  { title: 'Systems and Mathematical Modeling', idea: 'Two unknowns, two facts, one answer that fits both.', lessons: [
    'Two unknowns', 'Systems of equations', 'Solving systems', 'Modeling a real situation',
    'Review and challenge: a two-variable problem'] },
  { title: 'Functions and Integration', idea: 'Input, rule, output — and algebra out in the world.', lessons: [
    'What is a function?', 'Linear functions', 'Nonlinear relationships', 'Algebra in the world',
    'Final challenge: explain, solve and apply'] }
];

export const CONCEPTS = [
  { id: 'relationship', name: 'Describing relationships', lesson: 1 },
  { id: 'numberline', name: 'Direction on the number line', lesson: 2 },
  { id: 'signed', name: 'Signed numbers', lesson: 2 },
  { id: 'variable', name: 'Variables', lesson: 3 },
  { id: 'expression', name: 'Expressions and equations', lesson: 3 },
  { id: 'equality', name: 'The meaning of equality', lesson: 4 },
  { id: 'balance', name: 'Keeping both sides balanced', lesson: 4 },
  { id: 'substitution', name: 'Substitution and checking', lesson: 3 },
  { id: 'inverse', name: 'Inverse operations', lesson: 7 },
  { id: 'onestep', name: 'One-step equations', lesson: 7 },
  { id: 'solving', name: 'What solving means', lesson: 6 },
  { id: 'twostep', name: 'Two-step equations', lesson: 8 },
  { id: 'bothsides', name: 'Unknowns on both sides', lesson: 9 },
  { id: 'fractions', name: 'Fractions', lesson: 11 },
  { id: 'ratio', name: 'Ratios and rates', lesson: 13 },
  { id: 'proportion', name: 'Proportions', lesson: 14 },
  { id: 'coordinates', name: 'Coordinates', lesson: 16 },
  { id: 'graphs', name: 'Reading graphs', lesson: 17 },
  { id: 'slope', name: 'Slope as rate of change', lesson: 18 },
  { id: 'linear', name: 'Linear equations and functions', lesson: 19 },
  { id: 'systems', name: 'Systems of equations', lesson: 22 },
  { id: 'modeling', name: 'Modeling real situations', lesson: 24 },
  { id: 'functions', name: 'Functions', lesson: 26 },
  { id: 'nonlinear', name: 'Nonlinear relationships', lesson: 28 }
];
export const LEVELS = ['Not yet', 'Encountered', 'Recognize', 'Understand', 'Explain', 'Use'];

export const ERROR_TYPES = {
  meaning: 'A MEANING MIX-UP', arithmetic: 'AN ARITHMETIC SLIP', sign: 'A SIGN SLIP',
  order: 'THE ORDER OF STEPS', reading: 'READING THE QUESTION', notation: 'HOW TO WRITE IT'
};

export function fmt(n) {
  if (typeof n !== 'number' || !isFinite(n)) return String(n);
  const r = Math.round(n * 100) / 100;
  const s = String(Math.abs(r));
  return (r < 0 ? '−' : '') + s;
}
export function parseNumber(raw) {
  if (raw == null) return NaN;
  let s = String(raw).trim().replace(/[−–]/g, '-').replace(/\s+/g, '').replace(/^x=/i, '').replace(/^\+/, '');
  if (!s) return NaN;
  const f = s.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (f) return Number(f[1]) / Number(f[2]);
  if (!/^-?\d*\.?\d+$/.test(s)) return NaN;
  return Number(s);
}
export const close = (a, b, t) => Math.abs(a - b) <= (t ?? 0.011);

// ---- school-problem reader -------------------------------------------------
function parseSide(s, v) {
  // forms: [a]v[/d][±b]  |  b±[a]v[/d]
  const N = '\\d+(?:\\.\\d+)?';
  let m = s.match(new RegExp('^([+-]?(?:' + N + ')?)\\*?' + v + '(?:/(' + N + '))?([+-]' + N + ')?$'));
  if (m) {
    const c = m[1];
    const a = c === '' || c === '+' ? 1 : c === '-' ? -1 : Number(c);
    return { a, d: m[2] ? Number(m[2]) : 1, b: m[3] ? Number(m[3]) : 0 };
  }
  m = s.match(new RegExp('^([+-]?' + N + ')([+-])((?:' + N + ')?)\\*?' + v + '(?:/(' + N + '))?$'));
  if (m) {
    const a = (m[3] ? Number(m[3]) : 1) * (m[2] === '-' ? -1 : 1);
    return { a, d: m[4] ? Number(m[4]) : 1, b: Number(m[1]) };
  }
  return null;
}
export function eqText(p) {
  const v = p.v;
  const coef = p.a === 1 ? '' : p.a === -1 ? '−' : fmt(p.a);
  let core = coef + v + (p.d !== 1 ? ' ÷ ' + fmt(p.d) : '');
  if (p.b) core += (p.b > 0 ? ' + ' : ' − ') + fmt(Math.abs(p.b));
  return core + ' = ' + fmt(p.r);
}
export function solveMoves(p) {
  const v = p.v, moves = [];
  let r = p.r;
  const coef = p.a === 1 ? '' : p.a === -1 ? '−' : fmt(p.a);
  const core = coef + v + (p.d !== 1 ? ' ÷ ' + fmt(p.d) : '');
  if (p.b) {
    r = r - p.b;
    moves.push({ undo: p.b > 0 ? 'the + ' + fmt(p.b) : 'the − ' + fmt(-p.b),
      move: p.b > 0 ? 'Subtract ' + fmt(p.b) + ' from both sides' : 'Add ' + fmt(-p.b) + ' to both sides',
      ask: 'What is ' + fmt(p.r) + (p.b > 0 ? ' − ' + fmt(p.b) : ' + ' + fmt(-p.b)) + '?', value: r, line: core + ' = ' + fmt(r) });
  }
  if (p.d !== 1) {
    const before = r; r = r * p.d;
    const c2 = coef + v;
    moves.push({ undo: 'the ÷ ' + fmt(p.d), move: 'Multiply both sides by ' + fmt(p.d),
      ask: 'What is ' + fmt(before) + ' × ' + fmt(p.d) + '?', value: r, line: c2 + ' = ' + fmt(r) });
  }
  if (p.a !== 1) {
    const before = r; r = r / p.a;
    moves.push({ undo: p.a === -1 ? 'the minus sign on ' + v : 'the × ' + fmt(p.a), move: 'Divide both sides by ' + fmt(p.a),
      ask: 'What is ' + fmt(before) + ' ÷ ' + fmt(p.a) + '?', value: r, line: v + ' = ' + fmt(r) });
  }
  return { moves, x: r };
}
export function parseProblem(text) {
  const raw = String(text || '').trim();
  if (!raw) return null;
  let s = raw.toLowerCase().replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/\s+/g, '');
  const words = /[a-z]{3,}/.test(s.replace(/slope|ratio|proportion|solve|for|find/g, ''));
  if (/slope|rise|run|graph|line/.test(s)) return { kind: 'topic', concept: 'Slope and linear relationships', lesson: 18,
    testing: 'How fast one quantity changes compared with another — rise over run.' };
  if (/ratio|proportion|rate|per/.test(s) && !/=.*[a-z]/.test(s)) return { kind: 'topic', concept: 'Ratios and proportions', lesson: 14,
    testing: 'Whether two comparisons describe the same relationship.' };
  s = s.replace(/^solve/, '').replace(/for[a-z]$/, '').replace(/[,.:;]$/, '');
  const eqs = s.split(/;|and/).filter(x => x.includes('='));
  if (eqs.length >= 2) return { kind: 'topic', concept: 'Systems of equations', lesson: 22,
    testing: 'Finding values that make two equations true at the same time.' };
  if (s.includes('=') && !words) {
    let [L, R] = s.split('=');
    const vars = (L + R).match(/[a-z]/g) || [];
    const v = vars[0];
    if (!v) return { kind: 'topic', concept: 'The meaning of equality', lesson: 4, testing: 'Whether both sides are the same amount.' };
    const inL = L.includes(v), inR = R.includes(v);
    if (inL && inR) return { kind: 'topic', concept: 'Equations with the unknown on both sides', lesson: 9,
      testing: 'Collecting the unknown on one side while keeping the balance.' };
    if (!inL) { const t = L; L = R; R = t; }
    const r = parseNumber(R);
    const side = parseSide(L, v);
    if (side && !isNaN(r) && side.a !== 0) {
      const p = { v, a: side.a, d: side.d, b: side.b, r };
      const steps = (p.b ? 1 : 0) + (p.a !== 1 ? 1 : 0) + (p.d !== 1 ? 1 : 0);
      const { moves, x } = solveMoves(p);
      const two = steps >= 2;
      return { kind: 'linear', p, moves, x, text: eqText(p),
        concept: two ? 'Two-step equations' : steps === 0 ? 'Reading an equation' : 'One-step equations',
        lesson: two ? 8 : 7,
        testing: two ? 'Undoing two operations, in reverse order, while keeping both sides equal.'
          : 'Choosing the operation that undoes what was done to ' + v + ', and doing it to both sides.' };
    }
    return { kind: 'topic', concept: 'Solving equations', lesson: 8, testing: 'Isolating the unknown by undoing operations on both sides.' };
  }
  if (/\d+\/\d+[+-]\d+\/\d+/.test(s)) return { kind: 'topic', concept: 'Operations with fractions', lesson: 12,
    testing: 'Adding or subtracting parts of different sizes — why a common denominator is needed.' };
  if (/[a-z]/.test(s) && !words) return { kind: 'topic', concept: 'Variables and expressions', lesson: 3,
    testing: 'What a letter stands for, and how to work out an expression’s value.' };
  return { kind: 'words', concept: 'A word problem', lesson: 24,
    testing: 'Turning a situation into mathematics: what’s unknown, what’s known, and how they’re related.' };
}
export function similarProblem(res) {
  const p = res.p;
  const x0 = Number.isInteger(res.x) ? res.x + (res.x >= 0 ? 3 : -2) : 4;
  const q = Object.assign({}, p);
  if (p.a !== 1) q.a = p.a + (p.a > 0 ? 1 : -1);
  if (p.b) q.b = p.b + (p.b > 0 ? 2 : -2);
  const x = p.d !== 1 ? x0 * p.d : x0;
  q.r = (q.a * x) / q.d + q.b;
  return { p: q, x, text: eqText(q), moves: solveMoves(q).moves };
}

// ---- refresher check-in ------------------------------------------------------
export const REFRESHER = [
  { id: 'signed', topic: 'Arithmetic and negative numbers', q: '−7 + 12 = ?', answer: 5, lesson: 2, concept: 'signed', built: true,
    back: 'Start at −7 on a number line and move 12 to the right. You pass zero after 7 steps and keep going 5 more.' },
  { id: 'fractions', topic: 'Fractions', q: '2/3 + 1/4 = ?', answer: 11 / 12, lesson: 12, concept: 'fractions', hint: 'A fraction like 11/12 is fine.',
    back: 'Thirds and quarters are different-sized pieces, so first cut both into twelfths: 8/12 + 3/12 = 11/12.' },
  { id: 'expressions', topic: 'Algebraic expressions', q: 'If a = 5, what is 3a − 2?', answer: 13, lesson: 3, concept: 'expression', built: true,
    back: '3a means 3 × a. With a = 5 that is 15, and 15 − 2 is 13.' },
  { id: 'equations', topic: 'Linear equations', q: 'Solve 3x + 4 = 19.  x = ?', answer: 5, lesson: 7, concept: 'twostep',
    back: 'Undo the last thing first: subtract 4 from both sides (3x = 15), then divide both sides by 3 (x = 5).' },
  { id: 'graphs', topic: 'Graphs', q: 'A line goes through (0, 2) and (4, 10). How much does it rise for each 1 step across?', answer: 2, lesson: 18, concept: 'slope',
    back: 'From x = 0 to x = 4 the line rises from 2 to 10: up 8 over 4 across, so 2 up for every 1 across.' }
];

// ---- lessons -----------------------------------------------------------------
const L4 = {
  n: 4, week: 1, index: 4,
  kicker: 'LESSON 4 · THE MEANING OF EQUALITY',
  title: 'What the equals sign is really saying',
  goal: 'Understand “=” as a statement that two quantities are the same — and that an equation stays true when you change both sides the same way.',
  hook: {
    learn: 'Most of us first meet “=” on a calculator: press it and the answer appears. In algebra it means something different — and once you see it, solving equations stops being a list of rules to memorize.',
    refresh: 'You may remember the move — “do the same to both sides.” Let’s rebuild why it works, from a picture up, and then see what it holds up.',
    together: 'One idea, two people. Each of you chooses how deep to go; the balance in front of you is the same one.'
  },
  map: { equality: 3, balance: 3, expression: 2, substitution: 2 },
  prereq: { label: 'One smaller idea first', body: 'Two amounts are equal when they are the same size — nothing more. Is 6 + 2 the same amount as 10 − 2? Work out each side separately: 8 and 8. Yes. That is all “=” has ever claimed. Now go back to the scale and look only at whether the two pans hold the same number of blocks.' },
  see: {
    voice: 'PROFESSOR', visual: 'balance', balance: { x: 4, nL: 3, nR: 7 },
    prompt: {
      learn: 'Here’s a bag with a mystery number of blocks inside. Don’t open it yet. See if you can get the scale to tell you what’s in the bag.',
      refresh: 'An old picture, worth a fresh look. Find what’s in the bag using only the scale — then open it to check.',
      together: 'Student drives the controls; adult says out loud what the scale is telling you. Swap halfway.'
    },
    observations: [
      'When the scale is level, the two sides weigh the same. That is all “=” says.',
      'Taking one block off both sides kept it level. Taking one off only one side tipped it.',
      'Once the bag was alone, the other side told you what was inside. You solved an equation — without any rules.'
    ]
  },
  understand: {
    voice: 'PROFESSOR', prompt: { learn: 'Three sentences, then two examples worked slowly.', refresh: 'Let’s rebuild the idea — three sentences, then the reasoning step by step.', together: 'Read these aloud — one each.' },
    sentences: [
      'The equals sign is a statement, not a command. “x + 3 = 7” says: the left side and the right side are the same amount.',
      'You may change an equation however you like, as long as you change both sides in the same way. They were the same amount before, so they are still the same amount after — the statement stays true.',
      'Solving means making changes like that until the unknown is alone on one side. Whatever is on the other side is its value.'
    ],
    worked: [
      { title: 'Is this statement true?', steps: [
        { m: '4 + 5 = 3 + 6', w: 'Two expressions, one on each side. The sign claims they are the same amount.' },
        { m: '9   and   9', w: 'Work out each side on its own. Neither side is “the answer” — both are quantities.' },
        { m: 'True', w: 'Both sides are 9, so the statement is true. Nothing needed to “come out” on the right.' }] },
      { title: 'Finding the mystery number', steps: [
        { m: 'x + 3 = 7', w: 'The bag and three blocks balance seven blocks.' },
        { m: 'x + 3 − 3 = 7 − 3', w: 'Take three blocks off each side. Both sides drop by the same amount, so they are still equal.' },
        { m: 'x = 4', w: 'The bag is alone. It balances four blocks.' },
        { m: 'Check:  4 + 3 = 7  ✓', w: 'Put 4 in place of x in the original. Both sides are 7, so 4 is right.' }] }
    ],
    guidedTitle: 'TRY ONE WITH ME',
    guided: [
      { id: 'g1', kind: 'number', q: 'Fill the box so the statement is true:   8 + 4 = ▢ + 5', label: '▢ =', answer: 7, stuck: 'understand',
        success: 'Yes. The left side is 12, and 7 + 5 is also 12. Both sides are the same amount — that’s what makes it true.',
        check: v => 'Put ' + fmt(v) + ' in the box: the left side is 12, the right side is ' + fmt(v + 5) + '.',
        diag: [
          { v: 12, type: 'meaning', msg: '12 is what 8 + 4 makes — a very common answer, because calculators taught us that “=” means “here comes the answer.” But the right side is ▢ + 5, and 12 + 5 is 17. The two sides have to be the same amount. What plus 5 makes 12?' },
          { v: 17, type: 'meaning', msg: 'You added everything — 8 + 4 + 5. That reads “=” as “and then.” Treat each side as its own quantity: the left side is 12. What goes in the box so the right side is 12 too?' }],
        hints: ['Work out the left side on its own first.', 'The left side is 12. The right side is ▢ + 5, and it must also be 12.'],
        worked: ['Left side: 8 + 4 = 12.', 'The right side must also be 12:  ▢ + 5 = 12.', '▢ = 7, because 7 + 5 = 12.'] }
    ],
    vocab: [
      { term: 'Equation', def: 'A statement that two expressions are equal. It has an equals sign, and it can be true or false.' },
      { term: 'Expression', def: 'A quantity written with numbers and symbols, like x + 3 or 4 + 5. No equals sign — it’s a thing, not a claim.' },
      { term: 'Side', def: 'Everything to the left, or everything to the right, of the equals sign.' },
      { term: 'Solution', def: 'A value of the unknown that makes the equation true.' }
    ],
    deeper: { title: 'Why “the same to both sides” is always safe', paras: [
      'If a and b are the same number, then anything you do to a gives the same result as doing it to b — because you did it to the same number. So if a = b, then a + c = b + c, a − c = b − c, and a × c = b × c. Nobody chose this as a convention; it follows from what “the same number” means.',
      'The caution is going backward. Multiplying both sides by zero keeps the equation true but destroys information — everything becomes 0 = 0 — and it can’t be undone, which is why dividing by zero isn’t allowed. Squaring is similar: if x = 3 then x² = 9, but x² = 9 is also true when x = −3. Moves that can be undone exactly — adding, subtracting, or multiplying or dividing by a number that isn’t zero — never gain or lose a solution.',
      'Much of what follows rests on this one idea: solving systems of equations, rearranging a formula like V = IR into I = V ÷ R, and the force balances engineers use to work out loads on a beam.'] }
  },
  connect: {
    voice: 'ROOMMATE', prompt: { learn: 'Where else does keeping two sides equal matter? Tap any you’ve run into.', refresh: 'You’ve been using this for years, probably without calling it algebra. Tap any that fit.', together: 'Each of you tap the ones you’ve met. Any surprises in what the other picked?' },
    items: [
      { t: 'A kitchen scale’s “tare” button: it subtracts the bowl’s weight so the display shows only what’s in it.', p: 'all' },
      { t: 'Splitting a bill: the shares must add up to the total, exactly.', p: 'all' },
      { t: 'A fair trade of game items or cards: both sides are worth the same.', p: 'learn,together' },
      { t: 'A see-saw: the heavier person sits nearer the middle, so weight × distance matches on both sides.', p: 'learn,together' },
      { t: 'Bookkeeping: assets = liabilities + equity. Every entry is made on both sides, so the books always balance.', p: 'refresh,together' },
      { t: 'Statics: a beam that isn’t moving has its upward and downward forces equal. Engineers write that as an equation and solve for the unknown support force.', p: 'refresh,together' }
    ],
    builder: { title: 'Let’s see it happen', body: 'Put an empty bowl on a kitchen scale and note the reading. Add some rice and note it again. The rice’s weight is the second number minus the first — you’ve just solved  bowl + rice = reading  by taking “bowl” off both sides. That is exactly what the tare button does.' },
    own: 'Somewhere you’ve had to keep two things exactly equal…',
    affirm: 'Good. In every one of those, changing one side means changing the other by the same amount — otherwise it stops being fair, balanced or true.'
  },
  feynman: {
    voice: 'FEYNMAN CHECK',
    prompt: {
      learn: 'Explain to a friend: what does the “=” in x + 3 = 7 mean, and why can you take 3 away from both sides without getting the wrong answer?',
      refresh: 'Explain why “do the same to both sides” is a valid move — and whether there’s any move where it can go wrong.',
      together: 'Each of you explain: what does “=” mean, and why is taking 3 from both sides of x + 3 = 7 allowed? Student writes first, then the adult. Then compare.'
    },
    checks: [
      { t: 'Says the two sides are the same amount — not “the answer comes next.”', k: 'same|equal|balanc|level|equivalent|match' },
      { t: 'Says the change has to happen to both sides.', k: 'both|each side|either side|other side' },
      { t: 'Says why that’s safe: the sides stay equal, so the statement stays true.', k: 'still|stay|remain|keep|true' },
      { t: 'Says what solving gets you: x alone, with its value on the other side.', k: 'alone|by itself|on its own|x =|x is|isolat|4|four' },
      { t: 'Names a move that can go wrong — multiplying or dividing by zero, or squaring.', k: 'zero|\\b0\\b|squar', paths: 'refresh' }
    ],
    gap: { check: 0, stage: 0, msg: 'Your explanation doesn’t say yet that the two sides are the same amount. That’s the heart of it, and the scale shows it best — have another look, then come back and add a sentence.' }
  },
  challenge: {
    voice: 'EDITOR', prompt: { learn: 'Four questions, getting harder. I’m testing whether the idea holds — not trying to catch you.', refresh: 'A quick climb. Skip any that feel obvious.', together: 'Take turns: one answers, the other checks the reasoning before you press Check.' },
    problems: [
      { id: 'c1', tier: '1 · START HERE', kind: 'choice', stuck: 'challenge',
        q: 'Do 2(x + 3) and 2x + 6 always stand for the same amount? Try a few values of x first.',
        table: { a: '2(x + 3)', b: '2x + 6', fa: x => 2 * (x + 3), fb: x => 2 * x + 6 },
        options: [
          { id: 'always', t: 'Always the same', correct: true, v: 'Yes. Two lots of (x + 3) is two x’s and two 3’s: 2x + 6. They’re two ways of writing one quantity — which is why you may swap one for the other inside any equation.' },
          { id: 'some', t: 'Sometimes', v: 'Worth trying more values — a negative one, a large one. Every value gives the same result on both sides, because 2(x + 3) means (x + 3) + (x + 3): two x’s and two 3’s.' },
          { id: 'never', t: 'Never', v: 'Try x = 1 on the slider: both are 8. So they match at least sometimes — and in fact always. Two lots of (x + 3) is 2x + 6.' }] },
      { id: 'c2', tier: '2 · A LITTLE HARDER', kind: 'choice', stuck: 'challenge',
        q: 'Now 2(x + 3) and 2x + 3. Same amount?',
        table: { a: '2(x + 3)', b: '2x + 3', fa: x => 2 * (x + 3), fb: x => 2 * x + 3 },
        options: [
          { id: 'always', t: 'Always the same', v: 'Look at the difference row: they’re always 3 apart. The 2 multiplies everything inside the brackets, the 3 included — so the 3 becomes 6.' },
          { id: 'some', t: 'Sometimes', v: 'See whether any value makes them match. The difference is 3 whatever x is, so there is no value where they’re equal.' },
          { id: 'never', t: 'Never', correct: true, v: 'Right — always exactly 3 apart. The 2 applies to the 3 inside the brackets too. Forgetting that is one of the most common slips in algebra, and now you can see why it matters.' }] },
      { id: 'c3', tier: '3 · CHOOSE THE MOVE', kind: 'choice', stuck: 'challenge',
        q: 'Which move keeps 5x = 20 balanced and gets x by itself?',
        options: [
          { id: 'a', t: 'Subtract 5 from both sides', v: 'That keeps it balanced — 5x − 5 = 15 is still true — but x isn’t alone. 5x means 5 times x; there’s no “+ 5” to take away.' },
          { id: 'b', t: 'Divide both sides by 5', correct: true, v: 'Yes. Both sides divided by the same non-zero number stay equal: x = 4. Check: 5 × 4 = 20 ✓. Choosing the undo move is what Lesson 7 is about.' },
          { id: 'c', t: 'Divide only the left side by 5', v: 'That gets x alone but tips the scale: x = 20 isn’t true when x is 4. Whatever happens to one side has to happen to the other.' }] },
      { id: 'c4', tier: 'STRETCH', kind: 'number', paths: 'refresh,together', label: '3a + 7 =', stuck: 'challenge',
        q: 'If 3a + 2 = 17, what does 3a + 7 equal? You don’t need to find a.', answer: 22,
        success: 'Yes. 3a + 7 is 3a + 2 with 5 more, so add 5 to both sides: 22. Treating the whole equation as a balance let you skip solving altogether.',
        diag: [{ v: 5, type: 'reading', msg: '5 is the value of a — nicely solved — but the question asks for 3a + 7. There’s a route that doesn’t need a at all.' }],
        hints: ['Compare 3a + 7 with 3a + 2. How far apart are they?', '3a + 7 is 3a + 2 with 5 more. Add 5 to both sides of the equation.'],
        worked: ['3a + 2 = 17', 'Add 5 to both sides:  3a + 2 + 5 = 17 + 5', '3a + 7 = 22'] }
    ]
  },
  reflect: { voice: 'JOURNAL', tomorrow: 'Next, Lesson 5 pulls Week 1 together — relationships, signed numbers, expressions and equality in one problem.', next: 5 },
  stuck: {
    see: { concept: 'what the scale is showing', ways: [
      { type: 'SIMPLIFY IT', body: 'Forget the bag for a moment. If both pans hold the same weight, the beam is level. If one is heavier, that side goes down. That’s the only rule the scale follows.' },
      { type: 'TRY IT TOGETHER', body: 'I’ll take the first move: press “Take 1 off both” once. The left now has the bag and 2 blocks; the right has 6. Still level.', turn: { q: 'Your turn: press it twice more. When the bag is alone, how many blocks are on the right?', a: 4 } },
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part is getting in the way?', options: [
        { l: 'Why the scale tips', b: 'The beam tips toward the heavier side, the way a see-saw drops on the side with the heavier person. Level means equal.' },
        { l: 'What the bag is', b: 'The bag is just some number of blocks we can’t see yet. Calling it x lets us talk about it before we know it.' },
        { l: 'What I’m meant to do', b: 'Try to leave the bag alone on its side while keeping the beam level. Whatever balances it is what’s inside.' }] } }] },
    understand: { concept: 'what “=” means', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part is confusing — what “=” means, why both sides have to change, or the arithmetic?', options: [
        { l: 'What “=” means', b: 'It means “is the same amount as.” Read 8 + 4 = ▢ + 5 aloud as: eight plus four is the same amount as something plus five.' },
        { l: 'Why both sides change', b: 'Take 3 from just one pan and that pan gets lighter — the beam tips. Take 3 from both and they’re still level.' },
        { l: 'The arithmetic', b: 'Do one side at a time. Left side first: 8 + 4 = 12. Then ask: what plus 5 makes 12?' }] } },
      { type: 'SHOW ME', body: 'Picture the scale. 8 + 4 = ▢ + 5 means a pan with 8 and 4 blocks balances a pan with ▢ and 5 blocks. That’s twelve on the left, so the right must hold twelve in total. Five are already there.' },
      { type: 'USE AN EXAMPLE', body: 'Smaller numbers: 3 + 1 = ▢ + 2. The left side is 4. The right side is something plus 2, and it has to make 4 as well — so ▢ is 2.', turn: { q: 'Your turn: 5 + 5 = ▢ + 6.  ▢ = ?', a: 4 } },
      { type: 'WORK BACKWARD', body: 'Start from the answer, 7. Put it in: 8 + 4 = 7 + 5. Left 12, right 12 — true. Now try 12 in the box: 8 + 4 = 12 + 5. Left 12, right 17 — not the same. That’s why 12 doesn’t work, even though it’s what 8 + 4 makes.' }] },
    connect: { concept: 'where equality shows up', ways: [
      { type: 'SIMPLIFY IT', body: 'Look for anything that has to be fair or balanced: a trade, a shared bill, a level shelf. If changing one side means changing the other to keep it fair, there’s an equation hiding in it.' }] },
    feynman: { concept: 'explaining it in your own words', ways: [
      { type: 'TRY IT TOGETHER', body: 'Finish these three sentences: “The equals sign means the two sides are…”  “If I take 3 from both sides, they are still…”  “So x by itself must be…”' },
      { type: 'SIMPLIFY IT', body: 'No maths words needed. Describe the scale: what was on each side, what you took off, and why it stayed level.' }] },
    challenge: { concept: 'testing whether two expressions are equal', ways: [
      { type: 'SHOW ME', body: 'Use the slider to try x = 0, 1, 2 and 10. Look at the two results side by side. If they’re equal every time — and you can see why from the brackets — they’re the same quantity.' },
      { type: 'FIND THE STUCK POINT', point: { q: 'Is it the brackets, how to test it, or which move to choose?', options: [
        { l: 'What brackets do', b: '2(x + 3) means “x + 3, twice.” Write it out: (x + 3) + (x + 3). Count: two x’s and two 3’s.' },
        { l: 'How to test it', b: 'Pick a number, put it in place of x in both expressions, and work out each one. Same result? Try another number.' },
        { l: 'Which move to choose', b: 'Ask what is being done to x. In 5x, x is multiplied by 5. The move that undoes multiplying is dividing.' }] } },
      { type: 'WORK BACKWARD', body: 'Start from 2x + 6. Can you take a 2 out of both parts? 2x is 2 × x and 6 is 2 × 3, so 2x + 6 = 2 × (x + 3).' }] },
    reflect: { concept: 'reflecting', ways: [
      { type: 'SIMPLIFY IT', body: 'One sentence is plenty. Finish it: “Before today I thought ‘=’ meant… Now I think it means…”' }] }
  }
};

const L7 = {
  n: 7, week: 2, index: 2,
  kicker: 'LESSON 7 · ONE-STEP EQUATIONS',
  title: 'Undoing one move',
  goal: 'Solve an equation that needs a single move by choosing the operation that undoes what was done to the unknown — then check the answer.',
  hook: {
    learn: 'If someone thinks of a number, adds 5, and tells you the result is 9, you can work out their number: take the 5 back off. That instinct is the whole of today’s lesson.',
    refresh: 'Inverse operations — the name may be familiar. Let’s see it as a machine you can run backward, rebuild the procedure from there, and then stretch to two steps.',
    together: 'Same machine, two people. One of you picks the undo move; the other says whether it really gets back to x.'
  },
  map: { inverse: 3, onestep: 3, substitution: 3, equality: 3, signed: 1, twostep: 1 },
  prereq: { label: 'Lesson 4 — The meaning of equality', href: 4, body: 'One-step equations rest on a single idea: both sides stay equal if you change them in the same way. Lesson 4 builds that with a balance scale — fifteen minutes there will make this lesson much easier.' },
  see: {
    voice: 'PROFESSOR', visual: 'machine',
    machines: [{ op: '+', k: 5, out: 9 }, { op: '−', k: 3, out: 10 }, { op: '×', k: 4, out: 28 }, { op: '÷', k: 2, out: 7 }],
    prompt: {
      learn: 'Each machine does one thing to a mystery number x, and you can see what came out. Pick the move that runs the machine backward.',
      refresh: 'Four machines, one operation each. Run each one backward — and notice what you’re doing to the output.',
      together: 'Adult picks the undo move for the first two machines, student for the last two. The other one predicts before you press.'
    },
    observations: [
      'Every operation has an opposite that undoes it: adding and subtracting undo each other; so do multiplying and dividing.',
      'You applied the undo to the output — the whole of the other side of the equation.',
      'To check, run your answer forward through the original machine. If it produces the output, it’s right.'
    ]
  },
  understand: {
    voice: 'PROFESSOR', prompt: { learn: 'Three sentences, then four examples — one for each operation.', refresh: 'Let’s rebuild the procedure from the reasoning, one operation at a time.', together: 'Read these aloud — one each.' },
    sentences: [
      'In a one-step equation, one thing has been done to the unknown: something added, subtracted, multiplied or divided.',
      'To find the unknown, do the opposite operation — the inverse — to both sides. On the unknown’s side it cancels out; on the other side it gives you the value.',
      'Then check: put the value back into the original equation. If both sides come out the same, you’re done.'
    ],
    worked: [
      { title: 'Adding:  x + 5 = 9', steps: [
        { m: 'x + 5 = 9', w: 'Five was added to x.' },
        { m: 'x + 5 − 5 = 9 − 5', w: 'Subtract 5 from both sides. Subtracting undoes adding.' },
        { m: 'x = 4', w: 'On the left, + 5 and − 5 cancel. On the right, 9 − 5 is 4.' },
        { m: 'Check:  4 + 5 = 9  ✓', w: 'Both sides match.' }] },
      { title: 'Multiplying:  4x = 28', steps: [
        { m: '4x = 28', w: '4x means 4 times x.' },
        { m: '4x ÷ 4 = 28 ÷ 4', w: 'Divide both sides by 4. Dividing undoes multiplying.' },
        { m: 'x = 7', w: 'Four lots of x, shared into 4, is one x. 28 ÷ 4 is 7.' },
        { m: 'Check:  4 × 7 = 28  ✓', w: 'Both sides match.' }] },
      { title: 'Subtracting, with a negative:  x − 8 = −3', steps: [
        { m: 'x − 8 = −3', w: 'Eight was taken from x.' },
        { m: 'x − 8 + 8 = −3 + 8', w: 'Add 8 to both sides.' },
        { m: 'x = 5', w: '−3 + 8: start at −3 on the number line and move 8 to the right. You land on 5.' },
        { m: 'Check:  5 − 8 = −3  ✓', w: 'Both sides match.' }] },
      { title: 'Dividing:  x ÷ 3 = 6', steps: [
        { m: 'x ÷ 3 = 6', w: 'x was divided into 3 equal parts, and each part is 6.' },
        { m: 'x ÷ 3 × 3 = 6 × 3', w: 'Multiply both sides by 3. Multiplying undoes dividing.' },
        { m: 'x = 18', w: 'Three parts of 6 make 18.' },
        { m: 'Check:  18 ÷ 3 = 6  ✓', w: 'Both sides match.' }] }
    ],
    guidedTitle: 'TRY IT TOGETHER — ONE STEP AT A TIME',
    guided: [
      { id: 'g1', kind: 'choice', q: 'Solve 6x = 42. First: which move gets x by itself and keeps the balance?', stuck: 'understand',
        options: [
          { id: 'sub', t: 'Subtract 6 from both sides', v: 'That keeps the balance, but 6x is 6 times x — there’s no 6 added on to remove. You’d get 6x − 6 = 36, with x still tangled up.' },
          { id: 'div', t: 'Divide both sides by 6', correct: true, v: 'Yes — dividing undoes multiplying. On the left, 6x ÷ 6 is just x.' },
          { id: 'left', t: 'Divide only the left side by 6', v: 'That isolates x but tips the balance. Whatever you do to one side, do to the other.' }] },
      { id: 'g2', kind: 'number', q: 'Now the right side: 42 ÷ 6 = ?', label: 'x =', answer: 7, stuck: 'understand',
        success: 'Yes — x = 7.',
        check: v => 'Put ' + fmt(v) + ' back in: 6 × ' + fmt(v) + ' = ' + fmt(6 * v) + ', but the right side is 42.',
        diag: [
          { v: 36, type: 'meaning', msg: '36 is 42 − 6. The move we chose was dividing both sides by 6, because 6x means 6 times x. What is 42 shared into 6 equal parts?' },
          { v: 48, type: 'meaning', msg: '48 is 42 + 6. We’re undoing a multiplication, so the move is dividing: 42 ÷ 6.' },
          { v: 252, type: 'meaning', msg: '252 is 42 × 6 — that multiplies again instead of undoing. Divide: 42 ÷ 6.' }],
        hints: ['Think of 42 shared equally among 6.', 'What times 6 makes 42? Count up in sixes: 6, 12, 18…'],
        worked: ['6x ÷ 6 = 42 ÷ 6', 'x = 7'] },
      { id: 'g3', kind: 'number', q: 'Check it: put your answer back into 6x. What is 6 × 7?', label: '6 × 7 =', answer: 42, stuck: 'understand',
        success: 'Both sides are 42, so x = 7 is right. Checking is how you know you’re right — not how the teacher knows.',
        hints: ['Six sevens. Try 5 × 7, then add one more 7.'], worked: ['6 × 7 = 42, the same as the right side.'] }
    ],
    vocab: [
      { term: 'Inverse operation', def: 'The operation that undoes another. Adding and subtracting are inverses; so are multiplying and dividing.' },
      { term: 'Isolate', def: 'Get the unknown by itself on one side of the equation.' },
      { term: 'Coefficient', def: 'The number multiplying a variable. In 4x, the coefficient is 4.' },
      { term: 'Substitution', def: 'Putting a number in place of the variable — the way you check an answer.' }
    ],
    deeper: { title: 'Why inverses work — and what grows from them', paras: [
      'An inverse operation returns you to where you started: (x + 5) − 5 = x for every x, and (4x) ÷ 4 = x for every x. Solving is applying the inverse to both sides. Lesson 4’s balance guarantees the two sides stay equal; the inverse guarantees the unknown’s side collapses to the unknown alone.',
      'Two-step equations use the same idea twice, in reverse order. In 3x + 4 = 19, x was first multiplied by 3, then had 4 added. Undo the last thing first — subtract 4 to get 3x = 15 — then divide by 3: x = 5. Like taking off shoes before socks.',
      'Later this becomes the inverse function: if f takes x to 3x + 4, its inverse takes 19 back to 5. Rearranging any formula — d = rt into t = d ÷ r, or F = ma into a = F ÷ m — is this same process.'] }
  },
  connect: {
    voice: 'ROOMMATE', prompt: { learn: 'Working backward from a total to one unknown amount — tap any you’ve done.', refresh: 'You’ve been solving one-step equations in your head for years. Tap any that fit.', together: 'Each of you tap the ones you’ve met. Then take one each and say the equation out loud.' },
    items: [
      { t: 'Unit price: 4 identical notebooks cost $18. 4p = 18, so each costs 18 ÷ 4 = $4.50.', p: 'all' },
      { t: 'A trip: 180 miles at a steady 60 mph. 60t = 180, so t = 3 hours.', p: 'all' },
      { t: 'Saving up: you have $35 and need $120. 35 + s = 120, so you still need $85.', p: 'learn,together' },
      { t: 'Sharing a pizza: 3 friends each get 4 slices. p ÷ 3 = 4, so there were 12 slices.', p: 'learn,together' },
      { t: 'Ohm’s law: 12 volts across 4 ohms of resistance. 12 = 4I, so the current is 3 amps.', p: 'refresh,together' },
      { t: 'Newton’s second law: a 6-newton push on a 3-kilogram cart. 6 = 3a, so it accelerates at 2 m/s².', p: 'refresh,together' }
    ],
    builder: { title: 'Let’s measure it', body: 'Weigh ten nickels on a kitchen scale. Ten US nickels weigh about 50 grams, so 10c = 50 and c = 5 grams each. You’ve just measured something too light for many kitchen scales to read on its own — by solving a one-step equation.' },
    own: 'A time you worked backward from a total to a single amount…',
    affirm: 'Each of those has one unknown and one thing done to it. Undo that thing on both sides and the unknown is left by itself.'
  },
  feynman: {
    voice: 'FEYNMAN CHECK',
    prompt: {
      learn: 'In 4x = 28, why do we divide by 4 rather than subtract 4? And once you’ve found x, what does that number actually tell you?',
      refresh: 'Explain why applying an inverse operation to both sides isolates x — and why checking by substitution is a real test, not a formality.',
      together: 'Each of you: in 4x = 28, why divide by 4 instead of subtracting 4 — and what does the answer tell you? Student first, then adult. Then compare.'
    },
    checks: [
      { t: 'Says 4x means 4 times x — four lots of the same number.', k: 'times|lots|groups|multipl|×|\\*' },
      { t: 'Says dividing undoes multiplying — it’s the opposite, or inverse.', k: 'undo|opposite|inverse|reverse|cancel|back' },
      { t: 'Says it’s done to both sides to keep them equal.', k: 'both|each side|balanc|equal' },
      { t: 'Says what x tells you: the number that makes 4x = 28 true — 7.', k: '\\b7\\b|seven|makes|true|value|number that|check' }
    ],
    gap: { check: 0, stage: 0, msg: 'Your explanation doesn’t yet say what 4x means — and that’s exactly why dividing, not subtracting, is the right move. The × machine shows it; have another look, then add a sentence.' }
  },
  challenge: {
    voice: 'EDITOR', prompt: { learn: 'Five problems, getting harder. The last one is an optional stretch.', refresh: 'Skip any that feel obvious. The stretch at the end is the two-step kind.', together: 'Take turns: one answers, the other checks the reasoning before you press Check.' },
    problems: [
      { id: 'c1', tier: '1 · START HERE', kind: 'number', q: 'x + 9 = 15', label: 'x =', answer: 6, stuck: 'challenge',
        success: 'Yes. Check: 6 + 9 = 15 ✓',
        check: v => 'Put ' + fmt(v) + ' back in: ' + fmt(v) + ' + 9 = ' + fmt(v + 9) + ', but the right side is 15.',
        diag: [{ v: 24, type: 'meaning', msg: 'It looks like you added 9 instead of taking it away. x + 9 means 9 was added to x — to undo that, subtract 9 from both sides.' }],
        hints: ['What was done to x?', '9 was added to x. Subtract 9 from both sides.'],
        worked: ['x + 9 = 15', 'x + 9 − 9 = 15 − 9', 'x = 6', 'Check: 6 + 9 = 15 ✓'] },
      { id: 'c2', tier: '2 · SIGNED NUMBERS', kind: 'number', q: 'x − 4 = −11', label: 'x =', answer: -7, stuck: 'challenge',
        success: 'Yes. Check: −7 − 4 = −11 ✓',
        check: v => 'Put ' + fmt(v) + ' back in: ' + fmt(v) + ' − 4 = ' + fmt(v - 4) + ', but the right side is −11.',
        diag: [
          { v: -15, type: 'meaning', msg: 'You subtracted 4 again. x − 4 means 4 was taken away, so the undo is adding 4:  −11 + 4.' },
          { v: 7, type: 'sign', msg: 'The move was right — add 4 — but −11 + 4 is still on the negative side. Start at −11 and step 4 toward zero: −10, −9, −8, −7.' },
          { v: 15, type: 'sign', msg: 'It looks like the minus sign on −11 went missing. Start from −11, not 11, and add 4.' }],
        hints: ['4 was subtracted from x. What undoes subtracting?', 'Add 4 to both sides. On a number line, start at −11 and move 4 to the right.'],
        worked: ['x − 4 = −11', 'x − 4 + 4 = −11 + 4', 'x = −7', 'Check: −7 − 4 = −11 ✓'] },
      { id: 'c3', tier: '3 · DIVISION', kind: 'number', q: 'x ÷ 3 = 8', label: 'x =', answer: 24, stuck: 'challenge',
        success: 'Yes. Check: 24 ÷ 3 = 8 ✓',
        check: v => 'Put ' + fmt(v) + ' back in: ' + fmt(v) + ' ÷ 3 = ' + fmt(v / 3) + ', but the right side is 8.',
        diag: [
          { v: 8 / 3, type: 'meaning', msg: 'You divided again. x ÷ 3 means x was divided by 3; multiplying by 3 is what undoes it.' },
          { v: 11, type: 'meaning', msg: 'You added 3. But x was divided by 3, not had 3 taken off — the undo is multiplying by 3.' },
          { v: 5, type: 'meaning', msg: 'You subtracted 3. x was divided by 3, so multiply both sides by 3.' }],
        hints: ['What was done to x — added, subtracted, multiplied or divided?', 'x was divided by 3. Multiply both sides by 3.'],
        worked: ['x ÷ 3 = 8', 'x ÷ 3 × 3 = 8 × 3', 'x = 24', 'Check: 24 ÷ 3 = 8 ✓'] },
      { id: 'c4', tier: '4 · CHOOSE YOUR METHOD', kind: 'number', q: 'A rope is cut into 5 equal pieces, each 1.8 metres long. How long was the rope?', label: 'metres:', answer: 9, stuck: 'challenge',
        success: 'Yes — 9 metres. As an equation: r ÷ 5 = 1.8, so r = 1.8 × 5 = 9. Check: 9 ÷ 5 = 1.8 ✓',
        check: v => 'If the rope were ' + fmt(v) + ' m, five equal pieces would each be ' + fmt(v / 5) + ' m — not 1.8 m.',
        diag: [
          { v: 0.36, type: 'meaning', msg: 'You divided 1.8 by 5 — but the pieces came from dividing the rope. Write it as an equation first: r ÷ 5 = 1.8. Now undo the division.' },
          { v: 6.8, type: 'meaning', msg: 'You added 5 to 1.8. The rope was cut into 5 pieces — divided by 5 — so the undo is multiplying.' }],
        hints: ['Call the rope’s length r. What was done to r to get the pieces?', 'r was divided into 5: r ÷ 5 = 1.8. Undo the division on both sides.'],
        worked: ['Let r be the rope’s length.', 'r ÷ 5 = 1.8', 'r ÷ 5 × 5 = 1.8 × 5', 'r = 9 metres'] },
      { id: 'c5', tier: 'STRETCH · TWO STEPS (OPTIONAL)', kind: 'number', q: '3x + 4 = 19', label: 'x =', answer: 5, stuck: 'twostep',
        success: 'Yes. You undid the + 4 first, then the × 3 — the reverse of the order they were done. Check: 3 × 5 + 4 = 19 ✓',
        check: v => 'Put ' + fmt(v) + ' back in: 3 × ' + fmt(v) + ' + 4 = ' + fmt(3 * v + 4) + ', but the right side is 19.',
        diag: [
          { v: 15, type: 'reading', msg: '15 is 3x — you’re one step away. 3x = 15; now divide both sides by 3.' },
          { v: 23 / 3, type: 'sign', msg: 'You added 4. The 4 was added to 3x, so subtract it from both sides: 19 − 4.' },
          { v: 19 / 3 - 4, type: 'order', msg: 'You undid the steps in the order they were done — dividing first. Undo the last one first: the + 4, then the × 3.' }],
        hints: ['Two things were done to x: multiplied by 3, then 4 added. Which happened last?', 'Undo the + 4 first: subtract 4 from both sides. Then deal with the 3.'],
        worked: ['3x + 4 = 19', '3x + 4 − 4 = 19 − 4   →   3x = 15', '3x ÷ 3 = 15 ÷ 3   →   x = 5', 'Check: 3 × 5 + 4 = 19 ✓'] }
    ]
  },
  reflect: { voice: 'JOURNAL', tomorrow: 'Next, Lesson 8 takes this to two steps — undoing in reverse order. If you tried the stretch, you’ve already started.', next: 8 },
  stuck: {
    see: { concept: 'running the machine backward', ways: [
      { type: 'SIMPLIFY IT', body: 'Ignore the symbols. Someone took a number, added 5, and got 9. What was their number? You’d take the 5 back off. That’s the undo.' },
      { type: 'SHOW ME', body: 'Picture a number line. Starting at x, “+ 5” is five steps right, landing on 9. To get back, take five steps left from 9: 8, 7, 6, 5, 4. You’re at x.' },
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part?', options: [
        { l: 'Which move undoes which', b: 'Pairs: adding and subtracting undo each other; multiplying and dividing undo each other. If the machine adds 5, the undo subtracts 5.' },
        { l: 'Why start from the output', b: 'The output is the only number we know. We walk backward from what we know to what we don’t.' },
        { l: 'What x is', b: 'x is just the number that went into the machine. We don’t know it yet — that’s why it has a letter instead of a digit.' }] } }] },
    understand: { concept: 'choosing the inverse', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part is confusing: what 4x means, why we use the opposite operation, or why it goes on both sides?', options: [
        { l: 'What 4x means', b: '4x is shorthand for 4 × x — four lots of the same number. There’s no 4 added on, so subtracting 4 doesn’t remove anything.' },
        { l: 'Why the opposite operation', b: 'Doing the opposite cancels what was done: 4 × x ÷ 4 is just x. Any other move leaves x tangled up with a number.' },
        { l: 'Why both sides', b: 'The two sides are equal amounts. Divide only one and they stop being equal — the scale from Lesson 4 tips.' }] } },
      { type: 'USE AN EXAMPLE', body: 'Smaller: 2x = 10. Two identical bags weigh 10 blocks altogether, so each bag is 10 ÷ 2 = 5.', turn: { q: 'Your turn: 3x = 21.  x = ?', a: 7 } },
      { type: 'WORK BACKWARD', body: 'Start from the answer, x = 7, and build the equation: multiply both sides by 4 and you get 4x = 28. Solving just runs that in reverse — divide both sides by 4.' }] },
    connect: { concept: 'spotting the equation in a situation', ways: [
      { type: 'SIMPLIFY IT', body: 'Look for one unknown amount and one thing done to it. “4 notebooks cost $18” — the unknown is one notebook’s price, and it’s been multiplied by 4.' }] },
    feynman: { concept: 'explaining it in your own words', ways: [
      { type: 'TRY IT TOGETHER', body: 'Finish these sentences: “4x means…”  “To undo that I…”  “I do it to both sides because…”  “x = 7 means…”' }] },
    challenge: { concept: 'solving one-step equations', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Is it the move, the arithmetic, or the negative signs?', options: [
        { l: 'Which move to make', b: 'Ask: what was done to x? Then do the opposite of that, to both sides.' },
        { l: 'The arithmetic', b: 'Put your answer back into the equation. If the sides don’t match, redo only the last calculation — the move was probably fine.' },
        { l: 'Negative numbers', b: 'On a number line, adding moves right and subtracting moves left. −11 + 4 starts at −11 and moves 4 right, to −7.' }] } },
      { type: 'TRY IT TOGETHER', body: 'Let’s do x + 12 = 20. I’ll take the first step: 12 was added to x, so subtract 12 from both sides:  x + 12 − 12 = 20 − 12.', turn: { q: 'Your turn: what is 20 − 12?', a: 8 } },
      { type: 'USE AN EXAMPLE', body: 'Same kind, gentler numbers: x − 2 = −5. Undo the − 2 by adding 2: −5 + 2 = −3. Check: −3 − 2 = −5 ✓' }] },
    twostep: { concept: 'two-step equations', ways: [
      { type: 'WORK BACKWARD', body: 'Build it forward first. Start with x = 5. Multiply by 3: 15. Add 4: 19. So 3x + 4 = 19. To go back, reverse the trip: take off the 4 (19 → 15), then divide by 3 (15 → 5).' },
      { type: 'TRY IT TOGETHER', body: 'I’ll do the first move: subtract 4 from both sides, so 3x + 4 − 4 = 19 − 4, which is 3x = 15.', turn: { q: 'Your turn: 3x = 15.  x = ?', a: 5 } },
      { type: 'SIMPLIFY IT', body: 'Treat it as two one-step equations in a row. First pretend “3x” is a single box: box + 4 = 19, so the box is 15. Then 3x = 15.' }] },
    reflect: { concept: 'reflecting', ways: [
      { type: 'SIMPLIFY IT', body: 'One sentence is enough. Finish it: “To solve an equation, I…”' }] }
  }
};

const L1 = {
  n: 1, week: 1, index: 1,
  kicker: 'LESSON 1 · MATHEMATICS AS A LANGUAGE OF RELATIONSHIPS',
  title: 'Saying how one thing depends on another',
  goal: 'See that mathematics describes relationships between quantities — and that symbols are a short, exact way to say a relationship for every case at once.',
  hook: {
    learn: 'Push café tables together in a row and count the chairs. You could count them every time. Or you could notice the pattern once and never count again. That second move — noticing and writing down the pattern — is what algebra is for.',
    refresh: 'Before any rules: algebra is a language for relationships between quantities. Let’s rebuild it from a pattern you can see, then put symbols on it.',
    together: 'A pattern you can both see. One of you finds the rule in words; the other turns it into symbols. Then swap.'
  },
  map: { relationship: 3, variable: 1, expression: 1 },
  prereq: { label: 'One smaller idea first', body: 'Forget symbols. Draw one table with a chair at each end and one on each long side: 4 chairs. Now draw two tables pushed together and count again. Then three. Just look at how the count changes each time you add a table. That change is the relationship.' },
  see: {
    voice: 'PROFESSOR', visual: 'pattern',
    prompt: {
      learn: 'Add tables to the row and watch the chairs. Then predict: how many chairs for 10 tables — and for 100 — without drawing them?',
      refresh: 'A classic growing pattern. Find the rule, then test it at 10 and 100 tables.',
      together: 'Student adds tables; adult says the chair count before it appears. Then predict 10 and 100 together.'
    },
    observations: [
      'Each extra table adds two chairs — one on each long side. The ends stay the same: one chair at each end.',
      'So the number of chairs depends on the number of tables. That dependence is a relationship.',
      'Once you saw “twice the tables, plus two,” you could answer for 100 tables without drawing anything. That is what a rule gives you.'
    ]
  },
  understand: {
    voice: 'PROFESSOR', prompt: { learn: 'Three sentences, then two examples of words turning into symbols.', refresh: 'Let’s rebuild the idea, then the notation.', together: 'Read these aloud — one each.' },
    sentences: [
      'Mathematics describes relationships: how one quantity depends on another. Chairs depend on tables; a taxi fare depends on miles; a bill depends on hours worked.',
      'Some quantities are known — you can count or measure them. Others are unknown, or change from case to case. Giving a quantity a letter lets you talk about it before you know its value.',
      'Symbols are shorthand for a sentence. “Chairs equal twice the tables, plus two” becomes c = 2t + 2. The symbols say the same thing, exactly, for every possible number of tables.'
    ],
    worked: [
      { title: 'The tables, in symbols', steps: [
        { m: 'tables → chairs', w: '1 → 4,  2 → 6,  3 → 8. Each extra table adds 2.' },
        { m: 'twice the tables, plus 2', w: 'Say the rule in words first. The 2 is the two end chairs, which never change.' },
        { m: 'c = 2t + 2', w: 'Let t be the number of tables and c the number of chairs. 2t means 2 × t.' },
        { m: 'Check: t = 3  →  2 × 3 + 2 = 8 ✓', w: 'Put a value you’ve already counted into the rule. It matches.' }] },
      { title: 'A taxi fare', steps: [
        { m: '$3 to start, $2 a mile', w: 'The words describe how the fare depends on miles.' },
        { m: 'f = 2m + 3', w: 'Let m be the miles and f the fare in dollars. Two dollars for each mile, plus the three to start.' },
        { m: 'm = 4  →  f = 2 × 4 + 3 = 11', w: 'A 4-mile ride costs $11. The rule answers any distance.' }] }
    ],
    guidedTitle: 'TRY ONE WITH ME',
    guided: [
      { id: 'g1', kind: 'number', q: 'Using c = 2t + 2, how many chairs for 15 tables?', label: 'c =', answer: 32, stuck: 'understand',
        success: 'Yes: 2 × 15 + 2 = 32. You used the relationship instead of counting.',
        check: v => 'Check: 2 × 15 = 30, and 30 + 2 = 32 — not ' + fmt(v) + '.',
        diag: [
          { v: 30, type: 'reading', msg: '30 is 2 × 15 — the long-side chairs. The rule also says “+ 2” for the two end chairs.' },
          { v: 17, type: 'meaning', msg: '17 is 15 + 2. But 2t means 2 × t: two chairs for every table. So start with 2 × 15.' },
          { v: 34, type: 'order', msg: '34 is 2 × (15 + 2). In 2t + 2, the multiplying happens first, then the adding: 2 × 15, then + 2.' }],
        hints: ['2t means 2 × t. What is 2 × 15?', '2 × 15 = 30. Now add the 2 end chairs.'],
        worked: ['c = 2t + 2', 'c = 2 × 15 + 2', 'c = 30 + 2 = 32'] }
    ],
    vocab: [
      { term: 'Quantity', def: 'Anything you can count or measure: tables, chairs, miles, dollars, degrees.' },
      { term: 'Variable', def: 'A letter standing for a quantity that can change or that you don’t know yet. In c = 2t + 2, t and c are variables.' },
      { term: 'Relationship', def: 'A rule that says how one quantity depends on another.' },
      { term: 'Formula', def: 'A relationship written in symbols, like c = 2t + 2.' }
    ],
    deeper: { title: 'Why symbols, and not just sentences', paras: [
      'A sentence describes one relationship; a formula lets you work with it. Once it is c = 2t + 2, you can ask the reverse question — how many tables for 50 chairs? — and solve it by the methods in Week 2, rather than by trial and error.',
      'A formula is also a claim about every case at once. “For every whole number t, c = 2t + 2” can be checked against cases you can count and, with a little reasoning, shown to hold for all of them: each table contributes exactly two side chairs, and the two ends contribute two more.',
      'This is the seed of the idea of a function, in Week 6: a rule that turns each input into exactly one output. Engineering and science formulas — F = ma, V = IR, d = rt — are relationships of exactly this kind.'] }
  },
  connect: {
    voice: 'ROOMMATE', prompt: { learn: 'Relationships are everywhere. Tap any you’ve noticed — one quantity depending on another.', refresh: 'You use relationships like these all the time. Tap any that fit.', together: 'Each of you tap the ones you know. Then pick one and say its rule in words.' },
    items: [
      { t: 'Pay: earnings = hourly rate × hours worked.', p: 'all' },
      { t: 'A recipe: flour needed = 2 cups × number of batches.', p: 'all' },
      { t: 'A phone plan: monthly cost = base fee + charge per extra gigabyte × gigabytes.', p: 'learn,together' },
      { t: 'A staircase: total height = number of steps × height of one step.', p: 'learn,together' },
      { t: 'Temperature: °F = 1.8 × °C + 32. The same shape as the tables — a multiplier plus a starting amount.', p: 'refresh,together' },
      { t: 'A spring: within its limits, how far it stretches is proportional to the force pulling it (Hooke’s law).', p: 'refresh,together' }
    ],
    builder: { title: 'Let’s measure it', body: 'Find a staircase. Measure the height of one step and count the steps. Multiply. Now measure the whole flight from bottom floor to top. Close? You just used height = steps × rise, and checked it against the real thing.' },
    own: 'Describe a relationship in your life in words — then try it in symbols…',
    affirm: 'Good. Each of those is one quantity depending on another. Saying how, exactly, is the first step of algebra.'
  },
  feynman: {
    voice: 'FEYNMAN CHECK',
    prompt: {
      learn: 'Pick a relationship between two quantities from your own life. Describe it in words, then write it with symbols. What does each letter stand for?',
      refresh: 'Explain what a formula like c = 2t + 2 says, why writing it in symbols is more useful than a table of examples, and how you’d check it.',
      together: 'Each of you pick a relationship from your own life. Describe it in words, then in symbols, and say what each letter stands for. Then compare.'
    },
    checks: [
      { t: 'Names two quantities and says how one depends on the other.', k: 'depend|for every|for each|per|each|times|×|\\*|and' },
      { t: 'Says what each letter stands for.', k: 'stands for|means|is the number|represents|= the|letter' },
      { t: 'Writes the relationship with symbols.', k: '[a-z]\\s*=|=\\s*\\d|\\d\\s*[a-z]' },
      { t: 'Says why symbols help: they cover every case, briefly and exactly.', k: 'any|every|all|general|short|exact|quick|without' }
    ],
    gap: { check: 0, stage: 0, msg: 'Your explanation doesn’t say yet how one quantity depends on another — that’s the relationship itself. Look at the tables again: what changes when you add one?' }
  },
  challenge: {
    voice: 'EDITOR', prompt: { learn: 'Four questions, getting harder. Find the relationship, then use it.', refresh: 'Skip any that feel obvious. The stretch is a real formula.', together: 'Take turns: one answers, the other checks the reasoning before you press Check.' },
    problems: [
      { id: 'c1', tier: '1 · START HERE', kind: 'choice', stuck: 'challenge',
        q: 'A pattern goes 1 → 5, 2 → 8, 3 → 11. Which rule fits every pair?',
        options: [
          { id: 'a', t: 'out = in + 4', v: 'It fits the first pair — 1 + 4 = 5 — but not the second: 2 + 4 is 6, not 8. A rule has to fit every pair.' },
          { id: 'b', t: 'out = 3 × in + 2', correct: true, v: 'Yes: 3 × 1 + 2 = 5, 3 × 2 + 2 = 8, 3 × 3 + 2 = 11. Each step up adds 3, which is where the 3 × comes from.' },
          { id: 'c', t: 'out = 5 × in', v: 'It fits the first pair, but 5 × 2 = 10, not 8. Look at how much the output goes up each time: 3.' }] },
      { id: 'c2', tier: '2 · FIND THE RULE', kind: 'number', label: 'matchsticks:', stuck: 'challenge',
        q: 'Squares in a row made of matchsticks: 1 square uses 4, 2 squares use 7, 3 squares use 10. How many matchsticks for 10 squares?', answer: 31,
        success: 'Yes — 31. Each new square shares a side, so it adds 3: m = 3s + 1. Check: 3 × 3 + 1 = 10 ✓',
        diag: [
          { v: 40, type: 'meaning', msg: '40 counts 4 matchsticks for every square, as if they stood apart. In a row, neighbours share a side — so each new square only adds 3.' },
          { v: 30, type: 'reading', msg: 'Close. 3 × 10 counts what each square adds, but the very first square needs one extra stick to close it: 3 × 10 + 1.' }],
        hints: ['How many matchsticks does each extra square add?', 'Each adds 3. Starting from 1 stick, that’s 3s + 1.'],
        worked: ['Each new square adds 3 sticks; one more closes the first.', 'm = 3s + 1', 'm = 3 × 10 + 1 = 31'] },
      { id: 'c3', tier: '3 · USE A RULE', kind: 'number', label: 'c =', stuck: 'challenge',
        q: 'A phone plan costs $20 a month plus $5 for each extra gigabyte: c = 5g + 20. What is c when g = 6?', answer: 50,
        success: 'Yes — $50. 5 × 6 = 30, plus 20.',
        check: v => 'Check: 5 × 6 = 30, and 30 + 20 = 50 — not ' + fmt(v) + '.',
        diag: [
          { v: 130, type: 'order', msg: '130 is 5 × (6 + 20). In 5g + 20, multiply first: 5 × 6. Then add the 20.' },
          { v: 31, type: 'meaning', msg: '31 is 5 + 6 + 20. But 5g means 5 × g — five dollars for each gigabyte.' }],
        hints: ['5g means 5 × g.', '5 × 6 = 30. Then add the $20 base fee.'],
        worked: ['c = 5g + 20', 'c = 5 × 6 + 20', 'c = 30 + 20 = 50'] },
      { id: 'c4', tier: 'STRETCH · A REAL FORMULA', kind: 'number', paths: 'refresh,together', label: '°F =', stuck: 'challenge',
        q: 'Fahrenheit from Celsius: F = 1.8C + 32. What is F when C = 25?', answer: 77,
        success: 'Yes — 77 °F, a warm day. 1.8 × 25 = 45, plus 32.',
        diag: [{ v: 102.6, type: 'order', msg: '102.6 is 1.8 × (25 + 32). Multiply first, then add: 1.8 × 25 = 45, then + 32.' }],
        hints: ['1.8 × 25 — try 2 × 25 minus 0.2 × 25.', '1.8 × 25 = 45. Now add 32.'],
        worked: ['F = 1.8 × 25 + 32', 'F = 45 + 32 = 77'] }
    ]
  },
  reflect: { voice: 'JOURNAL', tomorrow: 'Next, Lesson 2: numbers with direction — negative numbers and the number line.', next: 2 },
  stuck: {
    see: { concept: 'the tables-and-chairs pattern', ways: [
      { type: 'SHOW ME', body: 'Look at just the chairs on the long sides: one above and one below each table. That’s 2 per table. Now look at the ends: one chair on the far left, one on the far right — always 2, however many tables. So: 2 per table, plus 2.' },
      { type: 'TRY IT TOGETHER', body: 'I’ll do 4 tables: long-side chairs are 2 × 4 = 8. Plus the 2 ends: 10. Set the slider to 4 and count to check.', turn: { q: 'Your turn: how many chairs for 6 tables?', a: 14 } },
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part is in the way?', options: [
        { l: 'Why it’s not 4 per table', b: 'A single table has 4 chairs. But when two tables touch, the end chairs between them disappear — so each extra table only adds the 2 along its sides.' },
        { l: 'Where the + 2 comes from', b: 'The two end chairs. However long the row, there’s exactly one at each end.' },
        { l: 'How to get to 100', b: 'You don’t need to draw 100 tables. 2 per table is 200, plus the 2 ends: 202.' }] } }] },
    understand: { concept: 'turning words into symbols', ways: [
      { type: 'SIMPLIFY IT', body: 'A letter is just a name for a number you haven’t pinned down. “t” means “however many tables.” “2t” means “two for each of them.” Read c = 2t + 2 aloud as: chairs are two for each table, plus two.' },
      { type: 'USE AN EXAMPLE', body: 'Simpler: every bicycle has 2 wheels. Wheels = 2 × bicycles, or w = 2b. Three bicycles: 2 × 3 = 6 wheels.', turn: { q: 'Your turn: how many wheels on 7 bicycles?', a: 14 } },
      { type: 'WORK BACKWARD', body: 'Start from c = 2t + 2 and put in t = 1: 2 × 1 + 2 = 4. That’s one table with a chair on each side and each end. t = 2: 6. The formula is just the counting, written once.' }] },
    connect: { concept: 'spotting relationships', ways: [
      { type: 'SIMPLIFY IT', body: 'Ask: if I change this, what else changes? Work more hours and your pay changes. Bake more batches and you need more flour. Wherever one thing drives another, there’s a relationship.' }] },
    feynman: { concept: 'explaining it', ways: [
      { type: 'TRY IT TOGETHER', body: 'Fill in: “The more ___, the more ___. Each extra ___ adds ___. If I call them ___ and ___, then ___ = ___.”' }] },
    challenge: { concept: 'finding and using a rule', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Is it finding the rule, the order of operations, or reading the letters?', options: [
        { l: 'Finding the rule', b: 'Look at how much the output goes up each step. That’s the multiplier. Then ask what you add to make the first pair work.' },
        { l: 'Multiply or add first', b: 'In 5g + 20, multiplying comes first. Work out 5 × g, then add 20.' },
        { l: 'What 5g means', b: '5g is 5 × g. A number written right next to a letter always means multiply.' }] } },
      { type: 'USE AN EXAMPLE', body: 'Smaller: 1 → 3, 2 → 5, 3 → 7. It goes up 2 each time, so 2 × in. 2 × 1 = 2, and the output is 3, so add 1: out = 2 × in + 1.' }] },
    reflect: { concept: 'reflecting', ways: [
      { type: 'SIMPLIFY IT', body: 'One sentence is plenty: “A relationship I noticed today is…”' }] }
  }
};

const L2 = {
  n: 2, week: 1, index: 2,
  kicker: 'LESSON 2 · NUMBERS, NEGATIVE NUMBERS AND THE NUMBER LINE',
  title: 'Numbers with a direction',
  goal: 'Understand negative numbers as amounts in the opposite direction, and add and subtract them by moving along a number line.',
  hook: {
    learn: 'At dawn it’s −4°. By lunch it has warmed up 7 degrees. Most people can answer that without any rules — because they picture a thermometer. Today we keep that picture and put it to work.',
    refresh: 'Signed numbers are where many people’s confidence first slipped. Let’s rebuild them from direction and distance, so the rules stop needing to be memorized.',
    together: 'One of you moves the marker; the other says out loud where it will land before it gets there.'
  },
  map: { numberline: 3, signed: 3 },
  prereq: { label: 'One smaller idea first', body: 'Picture a thermometer. Above zero is warm; below zero is cold. “−4” just means 4 below zero. If it warms by 7, you go up 7 marks: 4 of them get you back to zero, and 3 more take you to 3 above. Every negative-number question can be pictured like that.' },
  see: {
    voice: 'PROFESSOR', visual: 'numberline',
    scenarios: [
      { label: 'Morning temperature', start: -4, answer: 3, t: 'At 6 a.m. it’s −4°. By noon it has warmed 7 degrees. Move the marker: where does the thermometer read now?', unit: '°' },
      { label: 'A diver', start: -6, answer: -11, t: 'A diver is 6 metres below the surface (−6). She rises 4 metres, then goes down 9. Where is she now?', unit: ' m' },
      { label: 'A bank balance', start: 5, answer: -3, t: 'You have $5 in an account and spend $8. Where does the balance end up?', unit: '' }
    ],
    prompt: {
      learn: 'Choose a situation, then move the marker. Watch the sum build as you go.',
      refresh: 'Three situations. Move the marker and watch the arithmetic write itself.',
      together: 'Adult reads the situation; student moves the marker. Predict out loud before each move.'
    },
    observations: [
      'A negative number is a distance in the opposite direction — below zero, below the surface, owed rather than held.',
      'Adding moves you right; subtracting moves you left. Crossing zero is just another step.',
      'You never needed a rule about signs. Direction and distance did all the work.'
    ]
  },
  understand: {
    voice: 'PROFESSOR', prompt: { learn: 'Three sentences, then three examples on the line.', refresh: 'Let’s rebuild the rules from direction, so they make sense rather than needing to be remembered.', together: 'Read these aloud — one each.' },
    sentences: [
      'Every number has a size and a direction. On a number line, positive numbers are to the right of zero and negative numbers to the left, the same distance from zero as their positive partners.',
      'Adding a positive number moves you right. Subtracting a positive number moves you left. That’s true wherever you start — even if you start on the negative side.',
      'Subtracting a negative number moves you right. Taking away a debt is the same as gaining money: 5 − (−3) = 5 + 3 = 8.'
    ],
    worked: [
      { title: '−4 + 7', steps: [
        { m: 'start at −4', w: 'Four to the left of zero.' },
        { m: 'move 7 right', w: 'Adding a positive number: move right.' },
        { m: '−4 → 0 → 3', w: 'Four steps reach zero; three more reach 3.' },
        { m: '−4 + 7 = 3', w: 'The temperature reads 3°.' }] },
      { title: '5 − 8', steps: [
        { m: 'start at 5', w: 'Five to the right of zero.' },
        { m: 'move 8 left', w: 'Subtracting a positive number: move left.' },
        { m: '5 → 0 → −3', w: 'Five steps reach zero; three more go past it.' },
        { m: '5 − 8 = −3', w: 'You’re $3 overdrawn.' }] },
      { title: '−2 − (−6)', steps: [
        { m: 'start at −2', w: 'Two to the left of zero.' },
        { m: 'take away −6', w: 'Removing a debt of 6 leaves you 6 better off. Subtracting a negative moves you right.' },
        { m: '−2 + 6 = 4', w: 'Two steps reach zero; four more reach 4.' }] }
    ],
    guidedTitle: 'TRY THESE WITH ME',
    guided: [
      { id: 'g1', kind: 'number', q: '−3 + 9 = ?', label: 'answer:', answer: 6, stuck: 'understand',
        success: 'Yes. Three steps right reach zero; six more reach 6.',
        diag: [
          { v: -12, type: 'sign', msg: '−12 is what you get by moving left 9. Adding 9 moves right, toward zero and past it.' },
          { v: 12, type: 'sign', msg: '12 treats −3 as +3. Start on the left of zero, at −3, then move right 9.' },
          { v: -6, type: 'sign', msg: 'The size is right but the direction isn’t. From −3, moving right 9 takes you past zero to the positive side.' }],
        hints: ['Start at −3. Adding 9 means moving right.', 'Three steps get you to zero. How many of the 9 are left?'],
        worked: ['Start at −3.', 'Move 3 right to reach 0.', 'Move the remaining 6 right: 6.'] },
      { id: 'g2', kind: 'number', q: '2 − 7 = ?', label: 'answer:', answer: -5, stuck: 'understand',
        success: 'Yes. Two steps left reach zero; five more go past it, to −5.',
        diag: [
          { v: 5, type: 'sign', msg: 'The size is right — 5 — but you’ve gone past zero to the left, so it’s −5.' },
          { v: 9, type: 'meaning', msg: '9 is 2 + 7. Subtracting 7 moves left, not right.' },
          { v: -9, type: 'sign', msg: 'Start at +2, not −2. From 2, seven steps left lands on −5.' }],
        hints: ['Start at 2. Subtracting 7 means moving left.', 'Two steps reach zero. Five more go past it.'],
        worked: ['Start at 2.', 'Move 2 left to reach 0.', 'Move the remaining 5 left: −5.'] }
    ],
    vocab: [
      { term: 'Negative number', def: 'A number less than zero — to the left of zero on the number line.' },
      { term: 'Opposite', def: 'The number the same distance from zero on the other side. The opposite of 4 is −4.' },
      { term: 'Absolute value', def: 'A number’s distance from zero, ignoring direction. Written |−4| = 4.' },
      { term: 'Integer', def: 'A whole number, positive, negative or zero: …, −2, −1, 0, 1, 2, …' }
    ],
    deeper: { title: 'Why subtracting a negative must be adding', paras: [
      'Subtraction can be defined as adding the opposite: a − b = a + (−b). Then 5 − (−3) = 5 + 3. That isn’t a trick; it is what keeps arithmetic consistent.',
      'Watch the pattern: 5 − 2 = 3, 5 − 1 = 4, 5 − 0 = 5. Each time you subtract one less, the answer goes up by one. Continue it: 5 − (−1) = 6, 5 − (−2) = 7. Any other answer would break the pattern.',
      'In physics this is displacement: a signed distance along a line. Velocity, charge, voltage relative to ground, and height above a reference level all use the same idea — a size plus a direction.'] }
  },
  connect: {
    voice: 'ROOMMATE', prompt: { learn: 'Where have you met numbers below zero? Tap any.', refresh: 'You’ve used signed numbers for years in disguise. Tap any that fit.', together: 'Each of you tap the ones you’ve met. Then each explain one to the other.' },
    items: [
      { t: 'Weather: a forecast of −8° means 8 degrees below zero.', p: 'all' },
      { t: 'Bank statements: a balance of −$40 means you owe $40.', p: 'all' },
      { t: 'Golf: a score of −3 means three strokes under par.', p: 'learn,together' },
      { t: 'Elevation: Badwater Basin in Death Valley is about 86 metres below sea level — an elevation of −86 m.', p: 'all' },
      { t: 'Electrical work: voltages are measured relative to ground, so a point can sit at −5 V.', p: 'refresh,together' },
      { t: 'Physics: displacement is signed. Walk 10 m east then 14 m west and your displacement is −4 m, even though you walked 24.', p: 'refresh,together' }
    ],
    builder: { title: 'Let’s see it happen', body: 'If you have an elevator in your building with a basement level, ride from floor 3 down to B2. You passed the ground floor, 0, on the way. Floors: 3 → 2 → 1 → 0 → −1 → −2. That’s 3 − 5 = −2, done with your stomach.' },
    own: 'Somewhere you’ve met a number below zero…',
    affirm: 'Good. Each of those has a zero point and two directions away from it. That’s all a negative number is.'
  },
  feynman: {
    voice: 'FEYNMAN CHECK',
    prompt: {
      learn: 'Explain why 5 − 8 is −3. Use a number line, a thermometer or money — not a rule.',
      refresh: 'Explain why subtracting a negative number is the same as adding a positive one. Use any picture or argument you find convincing.',
      together: 'Each of you explain why 5 − 8 is −3 using a picture or a real situation, not a rule. Student first. Then compare pictures.'
    },
    checks: [
      { t: 'Uses a starting point.', k: 'start|begin|from|at 5|have 5' },
      { t: 'Uses direction — left or right, up or down, gain or lose.', k: 'left|right|down|up|back|lose|spend|direction|toward' },
      { t: 'Mentions passing zero.', k: 'zero|\\b0\\b|past|cross|below' },
      { t: 'Says what the negative result means in the situation.', k: 'below|owe|debt|under|less than|overdrawn|negative' }
    ],
    gap: { check: 1, stage: 0, msg: 'Your explanation doesn’t use direction yet — and direction is what makes negative numbers make sense. Move the marker again and watch which way it goes.' }
  },
  challenge: {
    voice: 'EDITOR', prompt: { learn: 'Five questions, getting harder. Picture a number line for each.', refresh: 'Skip any that feel obvious.', together: 'Take turns: one answers, the other checks the reasoning before you press Check.' },
    problems: [
      { id: 'c1', tier: '1 · START HERE', kind: 'number', label: '°', stuck: 'challenge',
        q: 'At midnight it’s −2°. By dawn it has dropped another 5 degrees. What does the thermometer read?', answer: -7,
        success: 'Yes: −2 − 5 = −7. Colder still.',
        diag: [
          { v: 3, type: 'sign', msg: '3 is −2 + 5 — warming up. The temperature dropped, so move left: −2 − 5.' },
          { v: 7, type: 'sign', msg: 'The size is right, but it’s 7 below zero: −7.' },
          { v: -3, type: 'sign', msg: '−3 is what you’d get from 2 − 5. Start at −2, already below zero, and go down 5 more.' }],
        hints: ['Dropping means moving down — left on the number line.', 'Start at −2 and move 5 further from zero.'],
        worked: ['−2 − 5', 'Start at −2, move 5 left.', '−7'] },
      { id: 'c2', tier: '2 · A LITTLE HARDER', kind: 'number', label: 'answer:', stuck: 'challenge',
        q: '−8 + 13 = ?', answer: 5,
        success: 'Yes. Eight steps right reach zero; five more reach 5.',
        diag: [
          { v: -21, type: 'sign', msg: '−21 moves left 13. Adding 13 moves right.' },
          { v: 21, type: 'sign', msg: '21 treats −8 as +8. Start at −8.' },
          { v: -5, type: 'sign', msg: 'Right size, wrong side. From −8, thirteen steps right goes past zero by 5.' }],
        hints: ['Start at −8 and move right 13.', '8 of those steps get you to zero. How many are left?'],
        worked: ['Start at −8.', '8 steps right reach 0.', '5 more: 5.'] },
      { id: 'c3', tier: '3 · IN CONTEXT', kind: 'number', label: 'metres:', stuck: 'challenge',
        q: 'A submarine at −120 m rises 45 m. What is its new depth, as a signed number?', answer: -75,
        success: 'Yes — −75 m. Still below the surface, but 45 m closer to it.',
        diag: [
          { v: -165, type: 'sign', msg: '−165 would be diving deeper. Rising moves toward zero: −120 + 45.' },
          { v: 75, type: 'sign', msg: '75 m above the surface would be a flying submarine. It rose 45 m from −120 and is still underwater: −75.' }],
        hints: ['Rising means moving toward zero.', '−120 + 45: how far is −120 from zero, and how much of that does 45 cover?'],
        worked: ['−120 + 45', '120 − 45 = 75, still on the negative side.', '−75 m'] },
      { id: 'c4', tier: '4 · CHOOSE THE METHOD', kind: 'choice', stuck: 'challenge',
        q: 'Which calculation gives the distance between −3 and 4 on a number line?',
        options: [
          { id: 'a', t: '4 − (−3) = 7', correct: true, v: 'Yes. From −3 to 0 is 3; from 0 to 4 is 4; 7 altogether. Subtracting a negative is adding: 4 + 3.' },
          { id: 'b', t: '4 + (−3) = 1', v: 'That lands you at 1 — a position, not a distance. Count the steps from −3 to 4: there are 7.' },
          { id: 'c', t: '−3 − 4 = −7', v: 'That has the right size and the wrong sign. It describes moving from 4 to −3, going left. A distance is never negative: 7.' }] },
      { id: 'c5', tier: 'STRETCH', kind: 'number', paths: 'refresh,together', label: 'answer:', stuck: 'challenge',
        q: '−2 − (−6) = ?', answer: 4,
        success: 'Yes. Taking away a debt of 6 leaves you 6 better off: −2 + 6 = 4.',
        diag: [
          { v: -8, type: 'sign', msg: '−8 treats it as −2 − 6. But you’re subtracting −6 — removing a debt — which moves you right.' },
          { v: 8, type: 'sign', msg: 'Close: right direction, but start at −2, not +2. −2 + 6 = 4.' }],
        hints: ['Subtracting a negative is the same as adding the positive.', '−2 − (−6) = −2 + 6.'],
        worked: ['−2 − (−6)', '= −2 + 6', '= 4'] }
    ]
  },
  reflect: { voice: 'JOURNAL', tomorrow: 'Next, Lesson 3: variables and expressions — letters that stand for numbers, and how to work out their value.', next: 3 },
  stuck: {
    see: { concept: 'moving along the number line', ways: [
      { type: 'SIMPLIFY IT', body: 'Ignore the signs for a second. Right means more; left means less. Warmer, higher and richer are to the right. Colder, deeper and owing are to the left.' },
      { type: 'TRY IT TOGETHER', body: 'I’ll do the first part of the morning temperature: start at −4, press “1 →” four times. You’re at zero.', turn: { q: 'Your turn: 3 more steps right. Where are you?', a: 3 } },
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part?', options: [
        { l: 'What −4 means', b: 'Four steps to the left of zero — four degrees below freezing on a Celsius thermometer.' },
        { l: 'Which way to move', b: 'Warming, rising and earning move right. Cooling, sinking and spending move left.' },
        { l: 'Crossing zero', b: 'Zero is just a mark on the line. Count your steps to reach it, then keep counting on the other side.' }] } }] },
    understand: { concept: 'adding and subtracting signed numbers', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Is it the direction, crossing zero, or the double minus?', options: [
        { l: 'Which direction', b: 'Plus a positive: move right. Minus a positive: move left. Where you start doesn’t change the direction.' },
        { l: 'Crossing zero', b: 'Split the move in two: first get to zero, then use what’s left. −3 + 9: 3 to reach zero, 6 left over.' },
        { l: 'Minus a negative', b: 'Taking away a debt makes you richer. 5 − (−3): remove a $3 debt and you’re $3 better off: 8.' }] } },
      { type: 'SHOW ME', body: 'Draw a line with zero in the middle. Put your finger on the starting number. Plus: slide right. Minus: slide left. Count the steps out loud. Where your finger stops is the answer.' },
      { type: 'USE AN EXAMPLE', body: 'Money is often easiest: you have $2 and spend $7. You can pay $2, and you owe $5. So 2 − 7 = −5.', turn: { q: 'Your turn: you have $4 and spend $10. What’s the balance?', a: -6 } }] },
    connect: { concept: 'negative numbers in real life', ways: [
      { type: 'SIMPLIFY IT', body: 'Look for a zero point with two sides: freezing, sea level, the ground floor, an empty account. Whatever is on the “less” side is negative.' }] },
    feynman: { concept: 'explaining it', ways: [
      { type: 'TRY IT TOGETHER', body: 'Use money. “I start with $5. I spend $8. After the first $5 I have…, and I still owe…, so the balance is…”' }] },
    challenge: { concept: 'signed numbers in context', ways: [
      { type: 'SHOW ME', body: 'Turn the number line on its end and it’s a thermometer, or a depth gauge. Up is plus, down is minus. Put your finger on the start and move.' },
      { type: 'FIND THE STUCK POINT', point: { q: 'Is it the direction, the arithmetic, or the sign of the answer?', options: [
        { l: 'The direction', b: 'Rising, warming, earning: right (plus). Sinking, cooling, spending: left (minus).' },
        { l: 'The arithmetic', b: 'When you cross zero, do it in two parts: the steps to reach zero, then the steps left over.' },
        { l: 'The sign of the answer', b: 'Ask where you ended up: still below zero? Then the answer is negative.' }] } }] },
    reflect: { concept: 'reflecting', ways: [
      { type: 'SIMPLIFY IT', body: 'One sentence: “A negative number is…”' }] }
  }
};

const L3 = {
  n: 3, week: 1, index: 3,
  kicker: 'LESSON 3 · VARIABLES AND EXPRESSIONS',
  title: 'Letters that stand for numbers',
  goal: 'Understand what a variable represents, tell an expression from an equation, and work out an expression’s value by substitution.',
  hook: {
    learn: 'A taxi charges $3 to start plus $2 a mile. You can’t say what your fare is until you know the miles — but you can say exactly how to work it out. That “how” is an expression.',
    refresh: 'Variables, expressions, substitution. The words may be familiar. Let’s rebuild what each one actually means, and why the order of operations matters.',
    together: 'Same slider, two people. One moves it; the other works out the value before it appears.'
  },
  map: { variable: 3, expression: 3, substitution: 2, relationship: 2 },
  prereq: { label: 'Lesson 1 — Saying how one thing depends on another', href: 1, body: 'Expressions are relationships written in symbols. Lesson 1 builds that idea from a pattern of tables and chairs.' },
  see: {
    voice: 'PROFESSOR', visual: 'expression',
    cards: [
      { v: 'm', expr: '2m + 3', story: 'A taxi: $3 to start, plus $2 for every mile.', unit: '$', target: 11, a: 2, b: 3, max: 12 },
      { v: 'g', expr: '5g + 20', story: 'A phone plan: $20 a month, plus $5 for each extra gigabyte.', unit: '$', target: 45, a: 5, b: 20, max: 10 },
      { v: 's', expr: '4s', story: 'The perimeter of a square with sides of length s.', unit: '', target: 36, a: 4, b: 0, max: 12 }
    ],
    prompt: {
      learn: 'Move the slider to change the letter’s value. The expression gives a different amount each time. Then look at the equation underneath: when is it true?',
      refresh: 'Three expressions. Vary the letter, watch the substitution, then find when each equation is true.',
      together: 'One of you moves the slider; the other works out the value before it appears.'
    },
    observations: [
      'The letter stands for a number that can change. The expression tells you how to get an amount from it.',
      'Each time you put a number in place of the letter — substituted it — the expression gave one value.',
      'An equation was true for only one value of the letter. An expression isn’t true or false; it’s just an amount.'
    ]
  },
  understand: {
    voice: 'PROFESSOR', prompt: { learn: 'Three sentences, then three examples.', refresh: 'Let’s rebuild the vocabulary from the ideas.', together: 'Read these aloud — one each.' },
    sentences: [
      'A variable is a letter standing for a number — one that can vary, like miles driven, or one we don’t know yet.',
      'An expression is a recipe for an amount: 2m + 3 says “double the miles, then add three.” It has no equals sign; it isn’t true or false.',
      'To find an expression’s value, substitute — replace the letter with a number — and work it out, multiplying before adding. An equation, like 2m + 3 = 11, claims two amounts are equal, and it is true only for some values.'
    ],
    worked: [
      { title: 'Evaluate 2m + 3 when m = 4', steps: [
        { m: '2m + 3', w: '2m means 2 × m.' },
        { m: '2 × 4 + 3', w: 'Substitute: put 4 where m was.' },
        { m: '8 + 3', w: 'Multiply first.' },
        { m: '11', w: 'Then add. A 4-mile ride costs $11.' }] },
      { title: 'Words into an expression', steps: [
        { m: '“five more than twice a number”', w: 'Call the number n.' },
        { m: 'twice a number  →  2n', w: '“Twice” means two times.' },
        { m: 'five more than that  →  2n + 5', w: 'Add five to it.' }] },
      { title: 'Expression or equation?', steps: [
        { m: '3x + 1', w: 'An expression: an amount that depends on x.' },
        { m: '3x + 1 = 13', w: 'An equation: a claim that the amount is 13. It’s true when x = 4, false otherwise.' }] }
    ],
    guidedTitle: 'TRY THESE WITH ME',
    guided: [
      { id: 'g1', kind: 'number', q: 'Evaluate 4a − 3 when a = 5.', label: 'answer:', answer: 17, stuck: 'understand',
        success: 'Yes: 4 × 5 = 20, then 20 − 3 = 17.',
        diag: [
          { v: 42, type: 'notation', msg: 'It looks like 4a was read as the digits 4 and 5 — “45.” In algebra, a number next to a letter means multiply: 4a = 4 × a.' },
          { v: 8, type: 'order', msg: '8 is 4 × (5 − 3). Multiply first: 4 × 5 = 20. Then subtract 3.' },
          { v: 20, type: 'reading', msg: '20 is 4 × 5 — nearly there. The expression also says “− 3.”' },
          { v: 6, type: 'meaning', msg: '6 is 4 + 5 − 3. But 4a means 4 × a, not 4 + a.' }],
        hints: ['4a means 4 × a.', '4 × 5 = 20. Now subtract 3.'],
        worked: ['4a − 3', '4 × 5 − 3', '20 − 3 = 17'] },
      { id: 'g2', kind: 'choice', q: 'Which of these is an expression, not an equation?', stuck: 'understand',
        options: [
          { id: 'a', t: 'x + 7', correct: true, v: 'Yes — no equals sign. It’s an amount that depends on x, not a claim.' },
          { id: 'b', t: 'x + 7 = 12', v: 'This has an equals sign, so it’s an equation: it claims x + 7 is 12. It’s true only when x = 5.' },
          { id: 'c', t: '3 = y − 1', v: 'An equation — the sign can sit anywhere. It claims y − 1 is 3, which is true only when y = 4.' }] }
    ],
    vocab: [
      { term: 'Variable', def: 'A letter standing for a number that can change, or that isn’t known yet.' },
      { term: 'Expression', def: 'Numbers, letters and operations that describe an amount. No equals sign.' },
      { term: 'Term', def: 'One part of an expression separated by + or −. In 2m + 3, the terms are 2m and 3.' },
      { term: 'Coefficient', def: 'The number multiplying a variable. In 2m, it’s 2.' },
      { term: 'Substitution', def: 'Replacing a variable with a number to find a value.' }
    ],
    deeper: { title: 'Three jobs a letter can do', paras: [
      'A letter can be a true unknown — one specific number we are trying to find, as in 2m + 3 = 11. It can be a quantity that genuinely varies, as in “fare = 2m + 3” for any trip. Or it can be a parameter, fixed in one situation but different between situations: the $2 per mile could become a letter r if you wanted one formula for every taxi company.',
      'The order of operations is a convention, not a law of nature — but it is what makes an expression mean one thing. Without it, 2 × 4 + 3 could be 11 or 14. Multiplying before adding is the agreement every calculator and every textbook follows; brackets override it when you need something else.',
      'An expression is a function in disguise: put a number in, get a number out. Week 6 makes that explicit with notation like f(m) = 2m + 3.'] }
  },
  connect: {
    voice: 'ROOMMATE', prompt: { learn: 'Expressions hide in everyday calculations. Tap any you’ve used.', refresh: 'You’ve evaluated expressions for years. Tap any that fit.', together: 'Each of you tap the ones you know. Then work one out together with real numbers.' },
    items: [
      { t: 'A spreadsheet cell like =B2*1.08 — an expression that adds 8% tax to whatever is in B2.', p: 'all' },
      { t: 'A recipe that says “2 eggs per batch”: eggs = 2b.', p: 'all' },
      { t: 'A video game score: points = 100 × coins + 500 × stars.', p: 'learn,together' },
      { t: 'Saving: after w weeks of putting away $15, you have 15w dollars.', p: 'learn,together' },
      { t: 'The area of a circle: πr². Substitute the radius to get the area.', p: 'refresh,together' },
      { t: 'Kinetic energy: ½mv². Double the speed and the energy goes up four times — you can see why by substituting.', p: 'refresh,together' }
    ],
    builder: { title: 'Let’s work it out', body: 'Measure a rectangular room’s length and width. The floor area is the expression L × W. Substitute your two measurements. Now you know how much flooring to buy — or how many tiles, if you divide by one tile’s area.' },
    own: 'A calculation you do often that could be written as an expression…',
    affirm: 'Good. Every one of those is a recipe with a blank in it. Fill in the blank — substitute — and you get an amount.'
  },
  feynman: {
    voice: 'FEYNMAN CHECK',
    prompt: {
      learn: 'What is the difference between 2m + 3 and 2m + 3 = 11? What does m stand for in each one?',
      refresh: 'Explain the difference between an expression and an equation, and why the order of operations matters when you substitute.',
      together: 'Each of you: what’s the difference between 2m + 3 and 2m + 3 = 11, and what does m stand for in each? Student first. Then compare.'
    },
    checks: [
      { t: 'Says the expression is an amount — a recipe to work something out.', k: 'amount|value|quantity|recipe|calculat|work out|cost|number' },
      { t: 'Says the equation is a claim that can be true or false.', k: 'claim|statement|equal|true|false|says' },
      { t: 'Says m can be any number in the expression.', k: 'any|change|vary|different|whatever' },
      { t: 'Says m is one particular number in the equation.', k: 'one|specific|\\b4\\b|four|particular|only|solve' }
    ],
    gap: { check: 1, stage: 0, msg: 'Your explanation doesn’t yet say what the equals sign adds — a claim that can be true or false. Look at the equation line under the slider: it’s only true at one value.' }
  },
  challenge: {
    voice: 'EDITOR', prompt: { learn: 'Four questions, getting harder.', refresh: 'Skip any that feel obvious.', together: 'Take turns: one answers, the other checks the reasoning before you press Check.' },
    problems: [
      { id: 'c1', tier: '1 · START HERE', kind: 'number', label: 'answer:', stuck: 'challenge',
        q: 'Evaluate 6 + 3k when k = 4.', answer: 18,
        success: 'Yes: 3 × 4 = 12, then 6 + 12 = 18.',
        diag: [
          { v: 36, type: 'order', msg: '36 is (6 + 3) × 4. Multiply first: 3k = 3 × 4 = 12. Then add 6.' },
          { v: 13, type: 'meaning', msg: '13 is 6 + 3 + 4. But 3k means 3 × k.' },
          { v: 40, type: 'notation', msg: 'It looks like 3k was read as 34. In algebra, 3k means 3 × k.' }],
        hints: ['3k means 3 × k.', '3 × 4 = 12. Then add 6.'],
        worked: ['6 + 3k', '6 + 3 × 4', '6 + 12 = 18'] },
      { id: 'c2', tier: '2 · WORDS INTO SYMBOLS', kind: 'choice', stuck: 'challenge',
        q: 'Which expression means “seven less than three times a number n”?',
        options: [
          { id: 'a', t: '3n − 7', correct: true, v: 'Yes. “Three times a number” is 3n; “seven less than” it takes 7 away: 3n − 7.' },
          { id: 'b', t: '7 − 3n', v: 'That’s “seven minus three times n” — the subtraction is the wrong way round. “Seven less than X” means X − 7.' },
          { id: 'c', t: '3(n − 7)', v: 'That takes 7 away first, then triples. The words say to triple first, then take away 7.' }] },
      { id: 'c3', tier: '3 · IN CONTEXT', kind: 'number', label: '$', stuck: 'challenge',
        q: 'Boxes of chocolates cost c dollars each. You buy 3 and pay $4 delivery, so the total is 3c + 4. What’s the total when c = 12?', answer: 40,
        success: 'Yes — $40. 3 × 12 = 36, plus 4 delivery.',
        diag: [
          { v: 48, type: 'order', msg: '48 is 3 × (12 + 4) — as if each box had its own delivery charge. Multiply first: 3 × 12, then add one $4.' },
          { v: 19, type: 'meaning', msg: '19 is 3 + 12 + 4. But 3c means 3 boxes at c dollars each: 3 × 12.' }],
        hints: ['3c means 3 × c.', '3 × 12 = 36. Now add the delivery.'],
        worked: ['3c + 4', '3 × 12 + 4', '36 + 4 = 40'] },
      { id: 'c4', tier: 'STRETCH · SIGNS AND SQUARES', kind: 'number', paths: 'refresh,together', label: 'answer:', stuck: 'challenge',
        q: 'If x = −2, what is x² + 3x?', answer: -2,
        success: 'Yes: (−2)² = 4, 3 × (−2) = −6, and 4 + (−6) = −2.',
        diag: [
          { v: 10, type: 'sign', msg: '10 is 4 + 6. But 3x with x = −2 is −6, not 6.' },
          { v: -10, type: 'sign', msg: '−10 takes (−2)² to be −4. A negative times a negative is positive: (−2) × (−2) = 4.' },
          { v: 2, type: 'sign', msg: 'Check each part separately: (−2)² = 4, and 3 × (−2) = −6. What is 4 + (−6)?' }],
        hints: ['Work out each term separately: x², then 3x.', '(−2)² = (−2) × (−2) = 4, and 3 × (−2) = −6.'],
        worked: ['x² + 3x', '(−2)² + 3 × (−2)', '4 + (−6) = −2'] }
    ]
  },
  reflect: { voice: 'JOURNAL', tomorrow: 'Next, Lesson 4: what the equals sign is really saying — and why it makes solving possible.', next: 4 },
  stuck: {
    see: { concept: 'what the letter is doing', ways: [
      { type: 'SIMPLIFY IT', body: 'The letter is a blank in a recipe. “2m + 3” says: whatever the miles are, double them and add three. Move the slider and you’re choosing what goes in the blank.' },
      { type: 'TRY IT TOGETHER', body: 'Taxi, 3 miles. I’ll do the first part: 2 × 3 = 6.', turn: { q: 'Your turn: add the $3 starting charge. What’s the fare?', a: 9 } },
      { type: 'FIND THE STUCK POINT', point: { q: 'Which part?', options: [
        { l: 'What 2m means', b: 'It means 2 × m. A number written right next to a letter always means multiply.' },
        { l: 'Why the answer changes', b: 'Because m changes. The recipe stays the same; what you put into it is different each time.' },
        { l: 'When the equation is true', b: 'The equation says 2m + 3 is exactly 11. Slide m until the expression makes 11 — that’s the only place it’s true.' }] } }] },
    understand: { concept: 'substitution and the order of operations', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Is it what the letter means, the order of operations, or expressions versus equations?', options: [
        { l: 'What 4a means', b: '4a is 4 × a. It never means the two-digit number “4-something.”' },
        { l: 'Multiply or subtract first', b: 'Multiply first. In 4a − 3, find 4 × a, then take away 3. Brackets are the only thing that changes that order.' },
        { l: 'Expression or equation', b: 'Look for an equals sign. No sign: an amount (expression). A sign: a claim (equation).' }] } },
      { type: 'USE AN EXAMPLE', body: 'Gentler: 2y + 1 when y = 3. Swap y for 3: 2 × 3 + 1. Multiply: 6 + 1. Add: 7.', turn: { q: 'Your turn: 3b + 2 when b = 4.', a: 14 } },
      { type: 'SHOW ME', body: 'Write it with a box instead of a letter: 4 × ▢ − 3. Now drop a 5 into the box: 4 × 5 − 3. The letter was just a box waiting for a number.' }] },
    connect: { concept: 'expressions in everyday calculations', ways: [
      { type: 'SIMPLIFY IT', body: 'Any calculation you do the same way each time, with a different number, is an expression. Tax on a price, tips on a bill, eggs per batch.' }] },
    feynman: { concept: 'explaining it', ways: [
      { type: 'TRY IT TOGETHER', body: 'Fill in: “2m + 3 is a way to work out…  In it, m can be…  But 2m + 3 = 11 is a claim that…, so m has to be…”' }] },
    challenge: { concept: 'evaluating and writing expressions', ways: [
      { type: 'FIND THE STUCK POINT', point: { q: 'Is it the order of operations, translating words, or negative numbers?', options: [
        { l: 'Order of operations', b: 'Multiplying and powers come before adding and subtracting, unless there are brackets.' },
        { l: 'Translating words', b: '“Less than” flips the order: “7 less than X” is X − 7. Find the X first, then take the 7 from it.' },
        { l: 'Negatives and squares', b: 'Put a negative number in brackets when you substitute: (−2)². Then the square applies to the whole −2, giving 4.' }] } },
      { type: 'WORK BACKWARD', body: 'Start from an answer you know: if 3c + 4 = 40, then 3c = 36 and c = 12. Running it forward — 3 × 12 + 4 — has to land back on 40.' }] },
    reflect: { concept: 'reflecting', ways: [
      { type: 'SIMPLIFY IT', body: 'One sentence: “A variable is… and an expression is…”' }] }
  }
};

export const LESSONS = Object.assign({ 1: L1, 2: L2, 3: L3, 4: L4, 7: L7 }, W2, W3, W4, W5, W6);
export const REFLECT_PROMPTS = ['What makes more sense now?', 'What was confusing at the beginning?', 'Where might you use this idea?', 'What would you like to understand more deeply?'];
