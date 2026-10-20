// Shared helpers for the Algebra Companion content files (no imports — avoids cycles)
export function fmt(n) {
  if (typeof n !== 'number' || !isFinite(n)) return String(n);
  const r = Math.round(n * 100) / 100;
  return (r < 0 ? '−' : '') + String(Math.abs(r));
}
export const COL = { accent: 'oklch(0.50 0.12 45)', blue: 'oklch(0.44 0.10 250)', green: 'oklch(0.50 0.12 155)', red: 'oklch(0.50 0.13 25)', ink: '#231e18', mute: '#8a7f70', light: '#e6ddcd', paper: '#fffdf7' };
const c = k => COL[k] || k;

// Math-space plot spec -> SVG primitives in a 480x360 viewBox
export function plot(spec) {
  const W = 480, H = 360, ml = 40, mr = 16, mt = 16, mb = 34;
  const [x0, x1] = spec.xr, [y0, y1] = spec.yr;
  const X = x => ml + (x - x0) / (x1 - x0) * (W - ml - mr);
  const Y = y => mt + (y1 - y) / (y1 - y0) * (H - mt - mb);
  const sx = spec.xstep || 1, sy = spec.ystep || 1;
  const grid = [], labels = [], paths = [], dots = [];
  const nx = Math.round((x1 - x0) / sx), ny = Math.round((y1 - y0) / sy);
  const lx = spec.xlab || (nx > 12 ? 2 : 1), ly = spec.ylab || (ny > 12 ? 2 : 1);
  const ax = (y0 <= 0 && y1 >= 0) ? Y(0) : Y(y0), ay = (x0 <= 0 && x1 >= 0) ? X(0) : X(x0);
  for (let i = 0; i <= nx; i++) {
    const x = x0 + i * sx, px = X(x);
    grid.push({ x1: px, y1: mt, x2: px, y2: H - mb, c: '#ece4d5', w: 1 });
    if (i % lx === 0 && Math.abs(x) > 1e-9) labels.push({ x: px, y: Math.min(H - mb, ax) + 15, t: fmt(x) + (spec.xunit || ''), c: '#6b6155', s: '11px', a: 'middle' });
  }
  for (let j = 0; j <= ny; j++) {
    const y = y0 + j * sy, py = Y(y);
    grid.push({ x1: ml, y1: py, x2: W - mr, y2: py, c: '#ece4d5', w: 1 });
    if (j % ly === 0 && Math.abs(y) > 1e-9) labels.push({ x: Math.max(ml, ay) - 6, y: py + 4, t: (spec.yunit === '$' ? '$' : '') + fmt(y) + (spec.yunit && spec.yunit !== '$' ? spec.yunit : ''), c: '#6b6155', s: '11px', a: 'end' });
  }
  grid.push({ x1: ml, y1: ax, x2: W - mr, y2: ax, c: '#3d362d', w: 1.5 });
  grid.push({ x1: ay, y1: mt, x2: ay, y2: H - mb, c: '#3d362d', w: 1.5 });
  if (x0 <= 0 && x1 >= 0 && y0 <= 0 && y1 >= 0) labels.push({ x: ay - 6, y: ax + 15, t: '0', c: '#6b6155', s: '11px', a: 'end' });
  if (spec.xname) labels.push({ x: W - mr, y: H - 6, t: spec.xname, c: '#3d362d', s: '12px', a: 'end' });
  if (spec.yname) labels.push({ x: ml + 6, y: mt + 12, t: spec.yname, c: '#3d362d', s: '12px', a: 'start' });
  (spec.lines || []).forEach(L => {
    const N = 160; let d = '';
    for (let i = 0; i <= N; i++) {
      const x = (L.from ?? x0) + i / N * ((L.to ?? x1) - (L.from ?? x0)); const y = L.f(x);
      if (!isFinite(y)) continue;
      const py = Math.max(-2000, Math.min(2000, Y(y)));
      d += (d ? ' L ' : 'M ') + X(x).toFixed(1) + ' ' + py.toFixed(1);
    }
    paths.push({ d, c: c(L.color || 'accent'), w: L.w || 3, dash: L.dash ? '6 5' : 'none' });
    if (L.label) { const lxv = L.labelAt ?? (x0 + (x1 - x0) * 0.82); labels.push({ x: X(lxv), y: Y(L.f(lxv)) - 10, t: L.label, c: c(L.color || 'accent'), s: '13px', a: 'middle' }); }
  });
  (spec.segs || []).forEach(s => {
    paths.push({ d: 'M ' + X(s.x1).toFixed(1) + ' ' + Y(s.y1).toFixed(1) + ' L ' + X(s.x2).toFixed(1) + ' ' + Y(s.y2).toFixed(1), c: c(s.color || 'mute'), w: s.w || 2, dash: s.dash ? '5 4' : 'none' });
    if (s.label) labels.push({ x: X((s.x1 + s.x2) / 2) + (s.dx || 0), y: Y((s.y1 + s.y2) / 2) + (s.dy || 0), t: s.label, c: c(s.color || 'mute'), s: '12px', a: 'middle' });
  });
  (spec.vlines || []).forEach(v => paths.push({ d: 'M ' + X(v.x).toFixed(1) + ' ' + mt + ' L ' + X(v.x).toFixed(1) + ' ' + (H - mb), c: c(v.color || 'accent'), w: v.w || 3, dash: v.dash ? '6 5' : 'none' }));
  (spec.points || []).forEach(p => {
    dots.push({ x: X(p.x).toFixed(1), y: Y(p.y).toFixed(1), r: p.r || 6, c: c(p.color || 'ink'), ring: p.ring ? c(p.ring) : '#fffdf7' });
    if (p.label) labels.push({ x: X(p.x) + (p.dx ?? 10), y: Y(p.y) + (p.dy ?? -10), t: p.label, c: c(p.color || 'ink'), s: '12px', a: p.anchor || 'start' });
  });
  (spec.texts || []).forEach(t => labels.push({ x: X(t.x), y: Y(t.y), t: t.t, c: c(t.color || 'ink'), s: t.s || '12px', a: t.a || 'middle' }));
  return { grid, labels, paths, dots, clip: { x: ml, y: mt, w: W - ml - mr, h: H - mt - mb } };
}

// Bars of equal cells; shaded counts
export function bar(label, d, n, color, right) {
  return { label, right: right || (n + '/' + d), cells: Array.from({ length: d }, (_, i) => ({ bg: i < n ? c(color || 'accent') : COL.paper })) };
}

const DEF_UND = { learn: 'Three sentences, then worked examples, slowly.', refresh: 'Let’s rebuild the idea, then the reasoning behind each step.', together: 'Read these aloud — one each.' };
const DEF_CON = { learn: 'Where does this show up? Tap any you’ve met.', refresh: 'You’ve probably used this for years without calling it algebra. Tap any that fit.', together: 'Each of you tap the ones you know, then explain one to the other.' };
const DEF_CHAL = { learn: 'Getting harder as you go. I’m testing whether the idea holds — not trying to catch you.', refresh: 'Skip any that feel obvious. The stretch goes further.', together: 'Take turns: one answers, the other checks the reasoning before you press Check.' };

// Fill defaults so each lesson file stays compact
export function mk(L) {
  L.hook.together = L.hook.together || 'One idea, two people. Each of you chooses how deep to go — and takes turns explaining.';
  L.hook.refresh = L.hook.refresh || L.hook.learn;
  L.see.voice = L.see.voice || 'PROFESSOR';
  L.see.prompt.refresh = L.see.prompt.refresh || L.see.prompt.learn;
  L.see.prompt.together = L.see.prompt.together || 'One of you works the controls; the other predicts out loud before each move. Swap halfway.';
  L.understand.voice = 'PROFESSOR';
  L.understand.prompt = L.understand.prompt || DEF_UND;
  L.understand.guidedTitle = L.understand.guidedTitle || 'TRY ONE WITH ME';
  L.connect.voice = 'ROOMMATE';
  L.connect.prompt = L.connect.prompt || DEF_CON;
  L.feynman.voice = 'FEYNMAN CHECK';
  L.feynman.prompt.refresh = L.feynman.prompt.refresh || L.feynman.prompt.learn;
  L.feynman.prompt.together = L.feynman.prompt.together || 'Each of you answer this: ' + L.feynman.prompt.learn + ' Student first, then adult. Then compare.';
  L.feynman.gap = L.feynman.gap || { check: 0, stage: 1, msg: 'Your explanation doesn’t yet include the first idea in the list — and it’s the heart of this lesson. Have another look at Understand It, then add a sentence.' };
  L.challenge.voice = 'EDITOR';
  L.challenge.prompt = L.challenge.prompt || DEF_CHAL;
  L.reflect.voice = 'JOURNAL';
  L.prereq = L.prereq || { label: 'Lesson ' + (L.n - 1), href: L.n - 1, body: 'This lesson builds directly on the one before it. A quick look back often makes the next step obvious.' };
  const S = L.stuck = L.stuck || {};
  const concept = L.concept || L.title.toLowerCase();
  const simple = (t) => ({ concept, ways: [{ type: 'SIMPLIFY IT', body: t }] });
  S.see = S.see || simple('Ignore the symbols for a moment. Watch only what changes when you move a control, and say it out loud in plain words.');
  S.understand = S.understand || S.see;
  S.connect = S.connect || simple('Look for one quantity that depends on another, or one unknown amount hiding in a situation. That’s where the algebra is.');
  S.feynman = S.feynman || { concept: 'explaining it in your own words', ways: [{ type: 'TRY IT TOGETHER', body: 'Start small: “The main idea is… It works because… An example is…” Three sentences is plenty.' }] };
  S.challenge = S.challenge || S.understand;
  S.reflect = S.reflect || { concept: 'reflecting', ways: [{ type: 'SIMPLIFY IT', body: 'One sentence is enough: “Before today I thought… Now I see…”' }] };
  return L;
}
