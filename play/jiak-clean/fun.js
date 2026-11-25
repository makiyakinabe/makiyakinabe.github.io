/* Jiak Clean v10: fun pack
   - Bao the fridge buddy (mood follows fridge health), daily lucky spin after a rescue
   - weekly rescue bingo, secret badges, surprise double-XP days, family cookbook of snapped dishes */
(function () {
document.head.insertAdjacentHTML('beforeend', '<style>' +
'.ps .buddy{display:flex;gap:12px;align-items:center;padding:12px 14px;border-radius:20px;background:#FFF8EC;border:1px solid #F0E0B4}' +
'.ps .buddy .bao{border:0;background:none;padding:0;cursor:pointer;flex:none;animation:baoBob 2.4s ease-in-out infinite;min-width:72px;min-height:64px}' +
'.ps .buddy .bao:active{transform:scale(.92)}' +
'@keyframes baoBob{50%{transform:translateY(-4px)}}' +
'.ps .buddy .say{position:relative;background:#fff;border:1px solid #F0E0B4;border-radius:14px;padding:8px 10px;font-size:14px;font-weight:600;color:#3D3520}' +
'.ps .buddy .say:before{content:"";position:absolute;left:-6px;top:16px;width:10px;height:10px;background:#fff;border-left:1px solid #F0E0B4;border-bottom:1px solid #F0E0B4;transform:rotate(45deg)}' +
'.ps .buddy .chip{min-height:40px;gap:6px}' +
'.ps .buddy .chip.go{background:#C2410C;color:#fff;border-color:#C2410C;animation:spinPulse 1.4s infinite}' +
'@keyframes spinPulse{50%{box-shadow:0 0 0 5px rgba(194,65,12,.18)}}' +
'.ps .dbl{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#5B3B85,#C2410C);color:#fff;font-weight:800;font-size:14px}' +
'.ps .wheelbox{position:relative;width:240px;height:240px;margin:6px auto 0}' +
'.ps .wheelbox svg.wh{width:240px;height:240px;border-radius:50%;box-shadow:0 8px 22px rgba(0,0,0,.18)}' +
'.ps .wheelbox .ptr{position:absolute;left:50%;top:-10px;transform:translateX(-50%);width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-top:24px solid #18201A;z-index:2}' +
'.ps .bingo{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}' +
'.ps .bingo div{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;aspect-ratio:1;padding:6px;border-radius:16px;background:#F6F7F2;border:1.5px solid #E3E6DE;font-size:12px;font-weight:700;color:#4F5851;line-height:1.2}' +
'.ps .bingo div.on{background:#1F6B45;border-color:#1F6B45;color:#fff}' +
'.ps .bingo div.ln{box-shadow:0 0 0 3px #F2B632}' +
'.ps .secg{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}' +
'.ps .secg div{display:flex;flex-direction:column;gap:4px;padding:12px;border-radius:16px;background:#F6F7F2;border:1.5px dashed #C9D2CD;font-size:13px;color:#4F5851;min-height:92px}' +
'.ps .secg div.on{background:#F3EEF9;border:1.5px solid #B9A3DB;color:#3E2A5C}' +
'.ps .secg b{font-size:15px;color:#18201A}' +
'.ps .pola{display:flex;flex-direction:column;gap:6px;padding:8px 8px 10px;background:#fff;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,.14);font-size:13px;font-weight:700;color:#18201A}' +
'.ps .pola .ph{border-radius:3px;overflow:hidden;line-height:0}' +
'.ps .pola span{font-weight:600;font-size:12px;color:#5B645D}' +
'.ps .bookg{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:6px}' +
'.ps .bookg .pola:nth-child(odd){transform:rotate(-2deg)}.ps .bookg .pola:nth-child(even){transform:rotate(1.5deg)}' +
'@media (prefers-reduced-motion:reduce){.ps .buddy .bao,.ps .buddy .chip.go{animation:none}}' +
'</style>');

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const fix = s => {
  if (!s) return s;
  if (!s.fun) s.fun = {pats:0, spins:0, half:false, undo:false, snaps:0};
  if (!s.secrets) s.secrets = {};
  if (!s.bingo) s.bingo = {wk:null, done:{}, lines:0};
  if (!s.book) s.book = [{rid:'r2', day:1, by:'mei'}, {rid:'c1', day:2, by:'me'}];
  return s;
};
if (S) { fix(S); save(); }

/* ---------- double rescue day ---------- */
const dbl = () => !!S.game && S.mode === 'standard' && (S.dn != null ? S.dn : S.day) % 4 === 3;
const commit10 = commit;
commit = function (xp, msg) {
  if (xp > 0 && dbl()) { xp *= 2; if (msg) msg += ' Double Rescue Day: 2× XP!'; }
  return commit10(xp, msg);
};

/* ---------- Bao the fridge buddy ---------- */
function mood() {
  if (dbl() && S.acted) return 'party';
  const H = window.psHealth ? window.psHealth().score : 80;
  return H >= 80 ? 'happy' : H >= 60 ? 'ok' : 'worried';
}
const SAY = {
  happy:['Fridge looks great. I’m one happy bao!', 'Nothing hiding at the back. Shiok!', 'You rescue, I cheer. Deal?'],
  ok:['A few things need eating. We’ve got this!', 'Psst… peek at the Eat-Me-First shelf.', 'One rescue today and I’ll do a little dance.'],
  worried:['It’s getting warm in here…', 'Something at the back needs help!', 'Tap Fridge health in Kitchen and fix me up?'],
  party:['Double Rescue Day! Everything counts twice!', 'Wheee! Keep the rescues coming!', 'Best. Day. Ever.']
};
function bao(m, w) {
  const eye = m === 'happy' || m === 'party' ? '<path d="M26 40q4-5 8 0M46 40q4-5 8 0" fill="none" stroke="#3D3520" stroke-width="2.6" stroke-linecap="round"/>' : '<circle cx="30" cy="40" r="3" fill="#3D3520"/><circle cx="50" cy="40" r="3" fill="#3D3520"/>';
  const mouth = m === 'worried' ? '<path d="M34 51q3-3 6 0t6 0" fill="none" stroke="#3D3520" stroke-width="2.2" stroke-linecap="round"/>' : m === 'ok' ? '<path d="M35 50q5 3 10 0" fill="none" stroke="#3D3520" stroke-width="2.2" stroke-linecap="round"/>' : '<path d="M33 48q7 9 14 0z" fill="#C2410C" stroke="#3D3520" stroke-width="1.8" stroke-linejoin="round"/>';
  const extra = m === 'worried' ? '<path d="M24 33l8 3M56 33l-8 3" stroke="#3D3520" stroke-width="2.2" stroke-linecap="round"/><path d="M63 30q4 6 0 9q-4-3 0-9z" fill="#7EC3EA"/>' : m === 'party' ? '<path d="M10 18l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1zM68 12l1.5 4 4 .6-3 2.6.8 4-3.3-2.2-3.3 2.2.8-4-3-2.6 4-.6z" fill="#F2B632"/>' : '';
  return '<svg viewBox="0 0 80 72" width="' + w + '" height="' + Math.round(w * .9) + '" aria-hidden="true"><ellipse cx="40" cy="66" rx="24" ry="4" fill="#000" opacity=".1"/><path d="M8 50C8 27 24 13 40 13s32 14 32 37c0 10-12 14-32 14S8 60 8 50z" fill="#FFFDF7" stroke="#E2CDA8" stroke-width="2"/><path d="M40 13q-2 7-9 9M40 13q2 7 9 9M40 13v10" fill="none" stroke="#DCC59B" stroke-width="1.8" stroke-linecap="round"/><path d="M40 13q1-8 9-9q-1 8-9 9z" fill="#2F9E62"/><circle cx="22" cy="48" r="5" fill="#F7B5A3" opacity=".7"/><circle cx="58" cy="48" r="5" fill="#F7B5A3" opacity=".7"/>' + eye + mouth + extra + '</svg>';
}
const spinReady = () => S.game && S.acted && S.spinDn !== S.dn;
function buddyCard() {
  const m = mood(), line = SAY[m][(S.fun.pats || 0) % 3], nb = Object.keys(S.bingo.done).length, ns = Object.keys(S.secrets).length;
  let h = '';
  if (dbl()) h += '<div class="dbl">' + svg('star', 18) + '<span class="grow">Surprise! Double Rescue Day</span><span>2× XP</span></div>';
  h += '<div class="buddy"><button class="bao" data-a="pat" aria-label="Bao the fridge buddy. Tap to pat">' + bao(m, 72) + '</button><div class="grow col" style="gap:8px"><div class="say" aria-live="polite"><b>Bao:</b> ' + line + '</div>';
  if (S.game) h += '<div class="wrap" style="gap:6px"><button class="chip' + (spinReady() ? ' go' : '') + '" data-a="spinOpen">' + svg('dice', 15) + (spinReady() ? 'Lucky spin!' : S.spinDn === S.dn ? 'Spun today' : 'Spin') + '</button><button class="chip" data-a="funOpen" data-v="bingo">' + svg('flag', 15) + 'Bingo ' + nb + '/9</button><button class="chip" data-a="funOpen" data-v="secrets">' + svg('lock', 15) + ns + '/' + SECRETS.length + '</button></div>';
  else h += '<div class="wrap"><button class="chip" data-a="funOpen" data-v="book">' + svg('pot', 15) + 'Family cookbook</button></div>';
  return h + '</div></div>';
}
const today10 = todayHTML;
todayHTML = function () {
  const html = today10(); if (S.mode !== 'standard') return html;
  const k = html.indexOf('</section>'); if (k < 0) return html;
  return html.slice(0, k + 10) + buddyCard() + html.slice(k + 10);
};

/* ---------- lucky spin ---------- */
const PRIZES = [['+10 XP', 'xp', 10, '#1F6B45'], ['+1 freeze', 'fz', 1, '#1D5FA8'], ['+20 XP', 'xp', 20, '#C2410C'], ['+10 meal pts', 'lp', 10, '#5B3B85'], ['+30 XP', 'xp', 30, '#D9A321'], ['+5 meal pts', 'lp', 5, '#2F9E62']];
function wheel(rot) {
  const P = (a, r) => (100 + r * Math.sin(a * Math.PI / 180)).toFixed(1) + ' ' + (100 - r * Math.cos(a * Math.PI / 180)).toFixed(1);
  return '<svg class="wh" id="wheel" viewBox="0 0 200 200" style="transform:rotate(' + rot + 'deg)" aria-hidden="true">' + PRIZES.map((p, i) => { const a = i * 60; return '<path d="M100 100L' + P(a - 30, 100) + 'A100 100 0 0 1 ' + P(a + 30, 100) + 'z" fill="' + p[3] + '" stroke="#fff" stroke-width="2"/><text x="100" y="34" text-anchor="middle" font-size="12" font-weight="800" fill="#fff" transform="rotate(' + a + ' 100 100)">' + p[0] + '</text>'; }).join('') + '<circle cx="100" cy="100" r="16" fill="#fff"/><circle cx="100" cy="100" r="7" fill="#18201A"/></svg>';
}
function spinSheet() {
  const sp = U.spin || {}, done = sp.done, used = S.spinDn === S.dn && !done;
  let h = '<div class="col" style="align-items:stretch">' + sheetHead('Lucky spin') + '<p class="sub">One spin a day, unlocked by your first rescue.</p>';
  h += '<div class="wheelbox"><span class="ptr"></span>' + wheel(done ? -sp.i * 60 : 0) + '</div>';
  if (done) h += '<div class="card col" style="align-items:center;gap:6px;text-align:center"><b style="font-size:22px">' + (PRIZES[sp.i][1] === 'fz' ? 'Streak freeze' : PRIZES[sp.i][0]) + '</b><span class="sub">' + (PRIZES[sp.i][1] === 'lp' ? 'Added to your donation jar.' : PRIZES[sp.i][1] === 'fz' ? 'Protects your streak on a busy day.' : 'Added to your level.') + ' Come back tomorrow!</span></div><button class="btn pri full" data-a="closeSheet">Nice!</button>';
  else if (used) h += '<div class="note">' + svg('clock', 18) + '<span>You’ve spun today. A new spin unlocks with tomorrow’s first rescue.</span></div>';
  else if (!S.acted) h += '<div class="note">' + svg('lock', 18) + '<span><b>Locked.</b> Use, freeze, cook or share one thing that’s due, then come back to spin.</span></div><button class="btn sec full" data-a="closeSheet">Find something to rescue</button>';
  else h += '<button class="btn pri full" data-a="spinGo">' + svg('dice', 18) + 'Spin the wheel</button>';
  return h + '</div>';
}

/* ---------- bingo ---------- */
const usedW = f => S.log.some(e => e.t === 'used' && f(e));
const CELLS = [
  ['Freeze something', 'snow', () => S.log.some(e => e.t === 'frozen')],
  ['Cook from the fridge', 'pot', () => S.meals >= 1],
  ['Eat a leftover', 'box', () => usedW(e => e.name.indexOf('Leftover') === 0)],
  ['Skip a double buy', 'list', () => S.log.some(e => e.t === 'avoided')],
  ['Play a learning game', 'star', () => !!(S.learn && S.learn.today > 0)],
  ['Bring food to the front', 'swap', () => !!(S.check && S.check.move)],
  ['Rescue 3 items', 'flame', () => S.log.filter(e => e.c && e.t !== 'avoided').length >= 3],
  ['Vote on dinner', 'users', () => !!(S.tonight && S.tonight.votes && S.tonight.votes.me)],
  ['Use up a vegetable', 'check', () => usedW(e => ['greens', 'veg'].indexOf(info(e.name).cat) >= 0)]
];
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const linesDone = () => LINES.filter(l => l.every(i => S.bingo.done[i]));

/* ---------- secret badges ---------- */
const SECRETS = [
  ['ice', 'Ice Age', 'Froze 3 things in one week', () => S.log.filter(e => e.t === 'frozen').length >= 3],
  ['deja', 'Déjà Food', 'Skipped a double buy', () => S.log.some(e => e.t === 'avoided')],
  ['half', 'Halfsies', 'Used or froze just half', () => S.fun.half],
  ['oops', 'Oops!', 'Took something back with Undo', () => S.fun.undo],
  ['pal', 'Best Buds', 'Patted Bao 5 times', () => S.fun.pats >= 5],
  ['lucky', 'Lucky Streak', 'Spun the wheel 3 times', () => S.fun.spins >= 3],
  ['snap', 'Food Paparazzi', 'Snapped a dish for the cookbook', () => S.fun.snaps >= 1],
  ['tidy', 'Spotless', 'Fridge health of 90 or more', () => !!window.psHealth && window.psHealth().score >= 90]
];
let checking = false;
function check() {
  if (checking || !S) return; fix(S); if (!S.onboarded) return; checking = true;
  try {
    const wk = (S.dn != null ? S.dn : 0) - S.day, silent = !S.bingo.init || S.bingo.wk !== wk;
    if (S.bingo.wk !== wk) S.bingo = {wk:wk, done:{}, lines:0, init:S.bingo.init};
    let ch = false; const msgs = [];
    CELLS.forEach((c, i) => { if (!S.bingo.done[i]) { let ok = false; try { ok = c[2](); } catch (e) {} if (ok) { S.bingo.done[i] = true; ch = true; } } });
    const ln = linesDone().length;
    if (ln > S.bingo.lines) {
      if (!silent && S.game) { const n = ln - S.bingo.lines; S.xp += 20 * n; S.weekXp += 20 * n; if (Object.keys(S.bingo.done).length === 9) { S.freezes++; msgs.push('Full bingo card! +1 streak freeze.'); } else msgs.push('Bingo! A line is complete. +' + 20 * n + ' XP.'); }
      S.bingo.lines = ln; ch = true;
    }
    SECRETS.forEach(s => { if (!S.secrets[s[0]]) { let ok = false; try { ok = s[3](); } catch (e) {} if (ok) { S.secrets[s[0]] = 1; ch = true; if (!silent && S.game) { S.xp += 15; S.weekXp += 15; msgs.push('Secret badge found: ' + s[1] + '! +15 XP.'); } } } });
    if (!S.bingo.init) { S.bingo.init = true; ch = true; }
    if (ch) save();
    if (msgs.length && S.mode === 'standard') setTimeout(() => { toast(msgs[0]); if (!reduce()) confetti(); }, 2600);
  } finally { checking = false; }
}

/* ---------- fun sheet ---------- */
const pola = (b, h) => { const r = R(b.rid); return '<div class="pola"><div class="ph">' + recipeArt(r, h) + '</div>' + esc(r.name) + '<span>' + DAYS[b.day % 7] + ' · ' + (b.by === 'me' ? 'you' : mem(b.by)[1]) + ' cooked' + (S.rate && S.rate[b.rid] > 0 ? ' · family favourite' : '') + '</span></div>'; };
function funSheet() {
  const t = U.funT || 'bingo';
  let h = '<div class="col">' + sheetHead('Fun & games') + '<div class="seg" style="--n:3">' + [['bingo', 'Bingo'], ['secrets', 'Secrets'], ['book', 'Cookbook']].map(x => '<button data-a="funOpen" data-v="' + x[0] + '" aria-pressed="' + (t === x[0]) + '">' + x[1] + '</button>').join('') + '</div>';
  if (t === 'bingo') {
    const ld = linesDone(), inL = {}; ld.forEach(l => l.forEach(i => inL[i] = 1));
    h += '<p class="sub">This week’s card. Each line of 3 earns +20 XP; the full card earns a streak freeze.</p><div class="bingo">' + CELLS.map((c, i) => '<div class="' + (S.bingo.done[i] ? 'on' : '') + (inL[i] ? ' ln' : '') + '">' + svg(S.bingo.done[i] ? 'check' : c[1], 22, 2.2) + c[0] + '</div>').join('') + '</div><span class="sub">' + Object.keys(S.bingo.done).length + ' of 9 squares · ' + ld.length + ' line' + (ld.length === 1 ? '' : 's') + ' · resets Monday</span>';
  } else if (t === 'secrets') {
    h += '<p class="sub">Hidden badges. Find them by playing; each is worth +15 XP.</p><div class="secg">' + SECRETS.map(s => S.secrets[s[0]] ? '<div class="on">' + svg('star', 20) + '<b>' + s[1] + '</b>' + s[2] + '</div>' : '<div>' + svg('lock', 20) + '<b>???</b>Still a secret</div>').join('') + '</div>';
  } else {
    h += '<p class="sub">Dishes your family rescued. Snap one after cooking to add it.</p>' + (S.book.length ? '<div class="bookg">' + S.book.slice().reverse().map(b => pola(b, 90)).join('') + '</div>' : '<div class="card sub" style="border-style:dashed">No dishes yet. Cook a meal and snap it.</div>');
  }
  return h + '</div>';
}
const sheet10 = sheetHTML;
sheetHTML = function () { return U.sheet === 'fun' ? funSheet() : U.sheet === 'spin' ? spinSheet() : sheet10(); };

/* ---------- cookbook snap on the cook-done screen ---------- */
const push10 = pushHTML;
pushHTML = function (p) {
  let html = push10(p);
  if (p.t === 'cook' && U.cook && U.cook.done) {
    const r = R(U.cook.rid);
    const card = U.cook.snapped ? '<div style="width:70%;transform:rotate(-2deg);margin:6px 0">' + pola(S.book[S.book.length - 1], 110) + '</div>' : '<button class="btn sec full" data-a="snapDish">' + svg('cam', 18) + 'Snap it for the family cookbook</button>';
    const k = html.lastIndexOf('</div></div>'); if (k > 0) html = html.slice(0, k) + card + html.slice(k);
  }
  return html;
};

/* ---------- actions ---------- */
const part10 = A.part, undo10 = A.undo;
if (part10) A.part = function (v, el, e) { part10(v, el, e); fix(S); S.fun.half = true; save(); };
if (undo10) A.undo = function () { const had = !!U.undo; undo10(); if (had) { fix(S); S.fun.undo = true; save(); } };
Object.assign(A, {
  pat: () => { S.fun.pats++; save(); paint(); },
  funOpen: v => { U.funT = v || 'bingo'; U.sheet = 'fun'; paint(); },
  spinOpen: () => { U.spin = {}; U.sheet = 'spin'; paint(); },
  spinGo: () => {
    if (!spinReady() || (U.spin && U.spin.busy)) return;
    const i = Math.floor(Math.random() * PRIZES.length), el = document.getElementById('wheel');
    U.spin = {busy:true, i:i};
    if (el && !reduce()) { el.style.transition = 'transform 3.2s cubic-bezier(.12,.75,.15,1)'; el.style.transform = 'rotate(' + (1800 - i * 60) + 'deg)'; }
    setTimeout(() => {
      if (!U.spin || !U.spin.busy) return;
      const p = PRIZES[i]; fix(S);
      if (p[1] === 'xp') { S.xp += p[2]; S.weekXp += p[2]; } else if (p[1] === 'fz') S.freezes += 1; else if (window.LP) window.LP.award('spin', p[2]);
      S.spinDn = S.dn; S.fun.spins++; U.spin = {done:true, i:i}; save(); paint();
      if (!reduce()) confetti(); toast('You won ' + p[0] + '!');
    }, reduce() ? 150 : 3350);
  },
  snapDish: () => {
    if (!U.cook || U.cook.snapped) return;
    S.book.push({rid:U.cook.rid, day:S.day, by:(S.tonight && S.tonight.cook) || 'me'}); S.book = S.book.slice(-12);
    U.cook.snapped = true; S.fun.snaps++; if (S.game) { S.xp += 5; S.weekXp += 5; } save(); paint(); toast('Snapped! Added to your family cookbook.' + (S.game ? ' +5 XP' : ''));
  }
});

const paint10 = paint;
paint = function () { try { check(); } catch (e) {} paint10(); };

const gd = document.querySelector('.guide');
if (gd) gd.addEventListener('click', e => {
  const b = e.target.closest('[data-j]'); if (!b || b.dataset.j !== 'fun') return;
  S.mode = 'standard'; S.role = 'owner'; S.tab = 'today'; S.game = true; S.starter = null; S.acted = true; S.spinDn = null; U.sheet = null; U.stack = []; save(); paint();
});
if (S) paint();
})();
