/* Jiak Clean v9: feedback round
   - Daily Rescue Card: one next action by time of day; the rest goes in a "Later" tray
   - focus by motivation (save money / feed the family / play), starter mode on day one
   - smart receipt review with confidence, shop-to-fridge confirmation, partial use
   - recipes as rescue plans, cook rating, household missions, roles and asks
   - fridge health score, waste profile, sharing options, assistant questions, digest notifications */
(function () {
const F = window.psFz, UNDO = (snap, label) => window.psUndo && window.psUndo(snap, label);
const WHO = {me:'You', mei:'Mei', jun:'Jun', maria:'Maria'};
const whoName = k => WHO[k] || k;
const lc = s => s.replace('Leftover: ', 'leftover ').toLowerCase();
const listJoin = a => a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];

document.head.insertAdjacentHTML('beforeend', '<style>' +
'.ps .rc{position:relative;display:flex;flex-direction:column;gap:12px;padding:16px;border-radius:22px;background:#fff;border:2px solid #1F6B45;box-shadow:0 6px 18px rgba(31,107,69,.12)}' +
'.ps .rc.t-red{border-color:#B13C0B;box-shadow:0 6px 18px rgba(177,60,11,.12)}.ps .rc.t-amb{border-color:#D9A321}.ps .rc.t-blu{border-color:#1D5FA8}' +
'.ps .rc .k{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#1F6B45}' +
'.ps .rc.t-red .k{color:#B13C0B}.ps .rc.t-amb .k{color:#7A4D00}.ps .rc.t-blu .k{color:#1D5FA8}' +
'.ps .rc h2{margin:0;font-size:20px;line-height:1.25;letter-spacing:-.01em}' +
'.ps .rc .pics{display:flex;gap:4px}' +
'.ps .rc .acts{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ps .rc .acts .btn{min-height:48px}' +
'.ps .rc .foot{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px;color:#4F5851}' +
'.ps .rc .foot button{border:0;background:none;font:inherit;font-weight:800;color:#1F6B45;min-height:40px;padding:0 4px;cursor:pointer}' +
'.ps .dp{display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:12px;color:#5B645D}' +
'.ps .dp button{border:1px solid #DCE1D8;background:#F6F7F2;border-radius:999px;font:inherit;font-size:12px;font-weight:700;min-height:32px;padding:0 10px;color:#3D4A43;cursor:pointer}' +
'.ps .dp button[aria-pressed="true"]{background:#18201A;color:#fff;border-color:#18201A}' +
'.ps .later{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:52px;padding:0 16px;border-radius:16px;border:1.5px dashed #C9D2CD;background:transparent;font:inherit;font-weight:800;font-size:15px;color:#18201A;cursor:pointer}' +
'.ps .later span{font-weight:600;font-size:13px;color:#5B645D}' +
'.ps .mot{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}' +
'.ps .mot button{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 6px;border-radius:16px;border:1.5px solid #E3E6DE;background:#fff;font:inherit;font-size:13px;font-weight:800;color:#18201A;min-height:96px;cursor:pointer;text-align:center}' +
'.ps .mot button[aria-pressed="true"]{border-color:#1F6B45;background:#E9F2EC}' +
'.ps .mot button i{display:grid;place-items:center;width:40px;height:40px;border-radius:20px;font-style:normal}' +
'.ps .mis{display:grid;grid-template-columns:1fr auto;gap:4px 10px;align-items:center;font-size:14px}' +
'.ps .mis .bar{grid-column:1/3;height:8px}' +
'.ps .roles{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}' +
'.ps .roles button{display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 4px;border-radius:14px;border:1px solid #E3E6DE;background:#F6F7F2;font:inherit;font-size:12px;font-weight:700;color:#4F5851;min-height:72px;cursor:pointer}' +
'.ps .roles button b{font-size:14px;color:#18201A}' +
'.ps .av{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:14px;color:#fff;font-weight:800;font-size:13px}' +
'.ps .conf{font-size:11px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;padding:3px 8px;border-radius:999px}' +
'.ps .conf.hi{background:#E9F2EC;color:#1F6B45}.ps .conf.lo{background:#FBF0D0;color:#7A4D00}' +
'.ps .rline{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:16px;background:#fff;border:1px solid #E3E6DE}' +
'.ps .rline.lo{border-color:#F0D58A;background:#FFFBEF}' +
'.ps .rline .raw{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#5B645D}' +
'.ps .pick2{display:grid;grid-template-columns:1fr 1fr;gap:8px}' +
'.ps .pick2 button{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:14px;border:2px solid #E3E6DE;background:#fff;font:inherit;font-weight:800;font-size:14px;min-height:56px;cursor:pointer;color:#18201A}' +
'.ps .pick2 button[aria-pressed="true"]{border-color:#1F6B45;background:#E9F2EC}' +
'.ps .plan{display:flex;flex-direction:column;gap:10px;padding:14px;border-radius:18px;background:#F1F7F2;border:1px solid #CFE0D4}' +
'.ps .plan .pr{display:grid;grid-template-columns:22px 1fr;gap:8px;align-items:start;font-size:14px;color:#18201A}' +
'.ps .plan .pr svg{margin-top:1px;color:#1F6B45}' +
'.ps .hscore{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:12px 14px;border-radius:18px;background:#fff;border:1px solid #E3E6DE;font:inherit;color:#18201A;cursor:pointer}' +
'.ps .tabs-lock{opacity:.45}' +
'.ps .wprof{display:flex;align-items:flex-end;justify-content:flex-start;gap:12px;height:84px;padding:0 4px}' +
'.ps .wprof div{flex:1;max-width:72px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;height:100%;font-size:12px;font-weight:700;color:#4F5851}' +
'.ps .wprof i{display:block;width:100%;border-radius:8px 8px 4px 4px;min-height:4px}' +
'</style>');

/* ---------- state ---------- */
const fix = s => {
  if (!s) return s;
  if (!s.roles) s.roles = {shop:'mei', cook:'me', label:'jun', pick:'maria'};
  if (!s.asks) s.asks = {};
  if (!s.rate) s.rate = {};
  if (!s.notif) s.notif = 'digest';
  if (s.give == null) s.give = 'anon';
  return s;
};
const seed9 = seed;
seed = function () { return fix(seed9()); };
if (S) { fix(S); save(); }

/* ---------- helpers ---------- */
const rescuedN = () => S.log.filter(e => e.c && (e.t === 'used' || e.t === 'frozen' || e.t === 'shared')).length;
const urgItems = () => S.items.filter(i => urgent(i) && i.days >= 0 && !i.prov).sort((a, b) => a.days - b.days);
const pastHigh = () => S.items.filter(i => !i.frozen && !i.listed && i.days < 0 && iinfo(i).risk === 'high');
const staleList = () => S.items.filter(i => !i.frozen && !i.listed && i.days <= -2);
const dupShop = () => S.shop.filter(s => S.items.some(i => i.name.toLowerCase() === s.name.toLowerCase() && !i.listed && !i.frozen && i.days >= 1));
function bestRecipe(prefer) {
  const x = RECIPES.map(r => Object.assign({r:r}, resolve(r))).filter(y => y.ok && !recOK(y.r, y).hide && (S.rate[y.r.id] || 0) >= 0);
  x.sort((a, b) => (b.urg - a.urg) || ((S.rate[b.r.id] || 0) - (S.rate[a.r.id] || 0)) || (a.r.time - b.r.time));
  if (prefer) { const p = x.find(y => y.rows.some(g => g.it && prefer.indexOf(g.it.id) >= 0)); if (p) return p; }
  return x[0];
}
const clockPart = () => { const h = new Date().getHours(); return h < 11 ? 'morning' : h < 14 ? 'lunch' : 'evening'; };
const dayPart = () => U.dayp || clockPart();
const pics = its => '<span class="pics" aria-hidden="true">' + its.slice(0, 4).map(i => icoI(i, 40)).join('') + '</span>';
const rng = d => d <= 0 ? 'today' : d <= 3 ? 'about ' + Math.max(1, d - 1) + '–' + (d + 1) + ' days' : 'about ' + Math.round(d * .8) + '–' + Math.round(d * 1.2) + ' days';
const zoneName = it => { try { return F.ZONES[F.zoneOf(it)][0]; } catch (e) { return 'Fridge'; } };

/* ---------- Daily Rescue Card ---------- */
function rescueCands() {
  const dp = dayPart(), out = [];
  pastHigh().slice(0, 1).forEach(it => out.push({tone:'red', k:'Safety first', icon:'shield', title:it.name + ' is past its use-by', text:'Use-by food can’t be judged by smell. Bin it so no one eats it by mistake.', its:[it],
    acts:[['Bin it safely', 'act', 'bin:' + it.id, 'pri'], ['Why?', 'safeOpen', it.id, 'ghost']]}));
  const st = staleList();
  if (st.length >= 3) out.push({tone:'amb', k:'Quick tidy', icon:'fridge', title:st.length + ' items need a quick check', text:'Tap Eaten or Binned for each. About 20 seconds.', its:st, acts:[['Start clear-out', 'stale', '', 'pri'], ['Later', 'rcNext', '', 'ghost']]});
  const lunch = S.items.find(i => isLeft(i) && !i.frozen && i.days >= 0 && i.days <= 1);
  const dup = dupShop();
  const urg = urgItems().filter(i => !isLeft(i) || dp !== 'lunch');
  const shopCard = () => dup.length && out.push({tone:'blu', k:'Before you shop', icon:'list', title:'You already have ' + (dup.length > 2 ? dup.slice(0, 2).map(s => s.name.toLowerCase()).join(', ') + ' and ' + (dup.length - 2) + ' more' : listJoin(dup.map(s => s.name.toLowerCase()))) + '.', text:'Skip ' + (dup.length > 1 ? 'these ' + dup.length + ' items' : 'it') + ' and save about ' + money(dup.reduce((a, s) => a + info(s.name).qty * info(s.name).up, 0)) + '.', its:dup.map(s => S.items.find(i => i.name.toLowerCase() === s.name.toLowerCase())),
    acts:[['Skip ' + (dup.length > 1 ? 'all ' + dup.length : 'it'), 'rcSkipDup', '', 'pri'], ['Open list', 'rcShop', '', 'ghost']]});
  const lunchCard = () => lunch && out.push({tone:'grn', k:'Lunch', icon:'clock', title:'Your ' + lc(lunch.name) + ' is ' + (lunch.plan ? 'planned for lunch' : 'best eaten today') + '.', text:'Mark it eaten when you’re done, or freeze it for another day.', its:[lunch],
    acts:[['Mark eaten', 'act', 'use:' + lunch.id, 'pri'], ['Freeze it', 'act', 'freeze:' + lunch.id, 'sec']]});
  const mealCard = () => {
    if (!urg.length) return;
    const b = bestRecipe(urg.map(i => i.id)), names = urg.slice(0, 2).map(i => i.name.replace('Leftover: ', 'leftover ').toLowerCase()), due = urg[0].days <= 0 ? 'due today' : 'due by tomorrow';
    const N = names.length > 1 ? names[0].charAt(0).toUpperCase() + names[0].slice(1) + ' and ' + names[1] + ' are ' + due : names[0].charAt(0).toUpperCase() + names[0].slice(1) + ' is ' + due;
    if (b) {
      if (dp === 'morning') out.push({tone:'grn', k:'Plan tonight', icon:'pot', title:N + '. Make ' + b.r.name.toLowerCase() + '?', text:'You have everything you need.', its:urg, viz:{its:b.rows.filter(g => g.it && g.have && urgent(g.it)).map(g => g.it), rid:b.r.id},
        acts:[['Plan it for tonight', 'rcPlan', b.r.id, 'pri'], ['See recipe', 'recipe', b.r.id, 'ghost']]});
      else out.push({tone:'grn', k:'Tonight', icon:'pot', title:'Cook ' + b.r.name.toLowerCase() + ' tonight?', text:N + '.', its:urg, viz:{its:b.rows.filter(g => g.it && g.have && urgent(g.it)).map(g => g.it), rid:b.r.id},
        acts:[['Cook it', 'recipe', b.r.id, 'pri'], [urg.length > 1 ? 'Freeze them' : 'Freeze it', 'rcFreeze', '', 'sec']]});
    } else out.push({tone:'grn', k:'Use it today', icon:'flame', title:N + '.', text:'No full recipe matches right now. Use it in anything, or freeze it to buy time.', its:urg,
      acts:[['Used it', 'act', 'use:' + urg[0].id, 'pri'], ['Freeze it', 'act', 'freeze:' + urg[0].id, 'sec']]});
  };
  if (dp === 'shop') { shopCard(); mealCard(); }
  else if (dp === 'lunch') { lunchCard(); mealCard(); shopCard(); }
  else { mealCard(); lunchCard(); shopCard(); }
  if (st.length && st.length < 3) out.push({tone:'amb', k:'Quick tidy', icon:'fridge', title:'Is ' + st[0].name.toLowerCase() + ' still there?', text:'It’s ' + (-st[0].days) + ' days past its date. One tap keeps your list honest.', its:[st[0]], acts:[['Check it', 'stale', '', 'pri'], ['Later', 'rcNext', '', 'ghost']]});
  if (!out.length) out.push({tone:'grn', k:'All clear', icon:'check', title:'Nothing needs rescuing today.', text:'Plan the next few days so nothing sneaks up on you.', its:[], acts:[['Plan the week', 'goPlan', '', 'pri'], ['Open fridge', 'goFridge', '', 'ghost']]});
  return out;
}
function rescueCard() {
  const c = rescueCands(), i = (U.rcI || 0) % c.length, x = c[i], dp = dayPart();
  let h = '<section class="rc t-' + x.tone + '" aria-labelledby="rc-h"><span class="k">' + svg(x.icon, 15, 2.4) + 'Your next rescue' + ' · ' + x.k + '</span>';
  if (x.viz && x.viz.its.length) h += GFX.strip(x.viz.its, x.viz.rid); else if (x.its.length) h += pics(x.its.filter(Boolean));
  h += '<h2 id="rc-h">' + esc(x.title) + '</h2><span class="sub" style="font-size:14px">' + esc(x.text) + '</span>';
  h += '<div class="acts">' + x.acts.map(a => '<button class="btn ' + a[3] + '" data-a="' + a[1] + '"' + (a[2] !== '' ? ' data-v="' + a[2] + '"' : '') + '>' + a[0] + '</button>').join('') + '</div>';
  h += '<div class="foot"><span>' + (c.length > 1 ? (i + 1) + ' of ' + c.length + ' things today' : 'The one thing for today') + '</span>' + (c.length > 1 ? '<button data-a="rcNext">Not now ›</button>' : '') + '</div>';
  h += '<div class="dp" aria-label="Preview another time of day"><span>Demo time:</span>' + [['morning', 'Morning'], ['lunch', 'Lunch'], ['evening', 'Evening'], ['shop', 'Shopping']].map(p => '<button data-a="dpSet" data-v="' + p[0] + '" aria-pressed="' + (dp === p[0]) + '">' + p[1] + '</button>').join('') + '</div>';
  return h + '</section>';
}

/* ---------- motivation ---------- */
const MOT = [['save', 'Save money', 'Savings, deals and a smarter list first', '#1F6B45', '#E9F2EC', 'chart'], ['feed', 'Feed the family', 'Tonight’s dinner and family plans first', '#C2410C', '#FCEDE4', 'pot'], ['play', 'Play and win', 'Missions, games and badges first', '#5B3B85', '#F3EEF9', 'star']];
function motCard() {
  return '<div class="card col" style="gap:10px"><b style="font-size:16px">What matters most to you?</b><span class="sub">We’ll put that first on Today. Change it anytime in Settings.</span><div class="mot">' + MOT.map(m => '<button data-a="motSet" data-v="' + m[0] + '" aria-pressed="' + (S.mot === m[0]) + '"><i style="background:' + m[4] + ';color:' + m[3] + '">' + svg(m[5], 20) + '</i>' + m[1] + '</button>').join('') + '</div></div>';
}

/* ---------- household missions ---------- */
const weekUsed = pred => S.log.filter(e => e.t === 'used' && pred(e)).length;
function missions() {
  const veg = weekUsed(e => ['greens', 'veg'].indexOf(info(e.name).cat) >= 0), fro = S.log.filter(e => e.t === 'frozen').length, votes = Object.keys(S.tonight.votes || {}).length;
  return [['Use 3 vegetables before they turn', veg, 3, 'shop'], ['Cook 2 meals from what you have', S.meals, 2, 'cook'], ['Freeze 5 portions in time', fro, 5, 'label'], ['Everyone votes on tonight’s dinner', votes, 3, 'pick'], ['One shopping trip with no double buys', Math.min(1, S.tot.dup), 1, 'shop']];
}
const ROLES = [['shop', 'Shopper'], ['cook', 'Cook'], ['label', 'Labeller'], ['pick', 'Picks dinner']];
const AVC = {me:'#1F6B45', mei:'#C2410C', jun:'#1D5FA8', maria:'#8A5700'};
const av = k => '<span class="av" style="background:' + (AVC[k] || '#5B645D') + '">' + whoName(k).charAt(0) + '</span>';
function missionsCard() {
  const ms = missions(), done = ms.filter(m => m[1] >= m[2]).length;
  let h = '<div class="card col" style="gap:12px"><div class="between"><h2 class="h2">Household missions</h2><span class="pill p-grn">' + done + ' of ' + ms.length + ' done</span></div>';
  h += '<div class="col" style="gap:10px">' + ms.map(m => { const p = Math.min(1, m[1] / m[2]); return '<div class="mis"><span>' + m[0] + '</span><b style="font-size:13px">' + Math.min(m[1], m[2]) + '/' + m[2] + '</b><div class="bar" role="progressbar" aria-valuenow="' + Math.round(p * 100) + '" aria-valuemin="0" aria-valuemax="100" aria-label="' + m[0] + '"><i style="width:' + Math.round(p * 100) + '%;background:' + (p >= 1 ? '#1F9D55' : '#1F6B45') + '"></i></div></div>'; }).join('') + '</div>';
  h += '<b style="font-size:14px">This week’s roles</b><div class="roles">' + ROLES.map(r => '<button data-a="roleT" data-v="' + r[0] + '" aria-label="' + r[1] + ': ' + whoName(S.roles[r[0]]) + '. Tap to change">' + av(S.roles[r[0]]) + '<b>' + whoName(S.roles[r[0]]) + '</b>' + r[1] + '</button>').join('') + '</div>';
  const asks = Object.keys(S.asks).map(id => [find(+id), S.asks[id]]).filter(a => a[0]);
  if (asks.length) h += '<div class="col" style="gap:6px">' + asks.map(a => '<div class="row" style="gap:8px;font-size:14px">' + av(a[1]) + '<span class="grow"><b>' + whoName(a[1]) + '</b> is using the ' + esc(lc(a[0].name)) + ' ' + (a[0].days <= 0 ? 'today' : 'by ' + DAYS[(S.day + Math.max(0, a[0].days)) % 7]) + '</span></div>').join('') + '</div>';
  return h + '<span class="sub">Everyone helps differently. Tap a role to pass it on.</span></div>';
}

/* ---------- Today ---------- */
const today9 = todayHTML;
todayHTML = function () {
  const html = today9();
  if (S.mode !== 'standard') return html;
  const box = document.createElement('div'); box.innerHTML = html;
  const col = box.firstElementChild; if (!col) return html;
  const kids = [...col.children], mi = kids.findIndex(k => k.classList.contains('more-btn'));
  const top = kids[0], tail = mi >= 0 ? kids.slice(mi) : [], mid = kids.slice(1, mi >= 0 ? mi : kids.length);
  const pick = test => { const i = mid.findIndex(test); return i >= 0 ? mid.splice(i, 1)[0] : null; };
  const hero = pick(k => k.classList.contains('hero')), tonight = pick(k => /^Tonight/.test(k.textContent.trim())), shelf = pick(k => /^Eat-Me-First/.test(k.textContent.trim()));
  const learn = pick(k => k.dataset && k.dataset.a === 'openLearn'), stale = pick(k => k.dataset && k.dataset.a === 'stale'), out = pick(k => /^Eating out/.test(k.textContent.trim()));
  const starter = !!S.starter;
  const wrap = s => { const d = document.createElement('div'); d.innerHTML = s; return d.firstElementChild; };
  const mis = starter ? null : wrap(missionsCard());
  const focusBy = {save:[hero, shelf], feed:[tonight, shelf], play:[mis, shelf, learn]};
  const focus = (focusBy[S.mot] || [tonight, shelf]).filter(Boolean);
  const later = [hero, tonight, mis, learn, out].filter(x => x && focus.indexOf(x) < 0).concat(mid);
  if (starter && learn) later.splice(later.indexOf(learn), 1);
  col.innerHTML = '';
  col.appendChild(top);
  col.insertAdjacentHTML('beforeend', rescueCard());
  if (!S.mot && !starter) col.insertAdjacentHTML('beforeend', motCard());
  focus.forEach(f => col.appendChild(f));
  if (later.length) {
    col.insertAdjacentHTML('beforeend', '<button class="later" data-a="laterT" aria-expanded="' + !!U.later + '">' + (U.later ? 'Hide the rest' : 'Later today') + '<span>' + (U.later ? '' : later.length + ' more ') + (U.later ? '−' : '+') + '</span></button>');
    if (U.later) later.forEach(f => col.appendChild(f));
  }
  if (starter) col.insertAdjacentHTML('beforeend', '<div class="note" style="background:#F1F7F2;border-color:#CFE0D4;color:#174F33">' + svg('star', 18) + '<span><b>Day one: just the basics.</b> Share, Impact and games unlock after your first rescue.</span></div>');
  tail.forEach(f => col.appendChild(f));
  return box.innerHTML;
};

/* ---------- starter mode: Share and Impact unlock after the first rescue ---------- */
const finishOnb9 = A.finishOnb;
A.finishOnb = function (v) { finishOnb9(v); if (S.mode === 'standard') { S.starter = {n:rescuedN()}; U.later = false; save(); paint(); } };
const tab9 = A.tab;
A.tab = function (v, el, e) {
  if (S.starter && (v === 'share' || v === 'impact')) { toast((v === 'share' ? 'Share' : 'Impact') + ' unlocks after your first rescue. Use, freeze or cook something due soon.'); return; }
  return tab9(v, el, e);
};
function starterCheck() {
  if (!S.starter) return;
  if (rescuedN() < S.starter.n) S.starter.n = rescuedN();
  if (rescuedN() > S.starter.n) { S.starter = null; save(); setTimeout(() => banner('First rescue done!', 'Share, Impact and Learn & donate are now unlocked.', 'impact'), 900); }
}
function lockTabs() {
  if (!S.starter || S.mode !== 'standard') return;
  document.querySelectorAll('#nav [data-v="share"], #nav [data-v="impact"]').forEach(b => {
    b.classList.add('tabs-lock'); b.setAttribute('aria-label', (b.textContent.trim() || 'Tab') + ', locked until your first rescue');
  });
}

/* ---------- smart receipt review ---------- */
const RL = [['Tomatoes', 4, 2.4, 1, 'TOMATO LOCAL 4S'], ['Eggs', 10, 4.95, 1, 'FRESH EGGS 10S'], ['Spinach', 1, 1.9, 0, 'SPIN/KAI LN 250G', ['Spinach', 'Kai lan']], ['Yoghurt', 4, 3.8, 0, 'MRGLD CUP 4X135', ['Yoghurt', 'Milk']]];
function receiptReview() {
  const P = U.rc, pk = P.pick || {};
  const lo = RL.filter(l => !l[3]), open = lo.filter((l, i) => !pk[RL.indexOf(l)]).length, n = RL.filter((l, i) => l[3] || (pk[i] && pk[i] !== 'skip')).length;
  let h = '<div class="col">' + sheetHead('Receipt read') + '<div class="ig ig2">' + IG.tile(String(RL.length - lo.length), 'added as read', '#1F6B45') + IG.tile(String(lo.length), 'quick questions', '#D9A321') + '</div>';
  h += GFX.flow(RL.length - lo.length, lo.length) + '<span class="sub" style="font-size:13px">Dates are estimates. We only ask again when food is nearly due.</span>';
  h += RL.map((l, i) => {
    const ans = pk[i], nm = l[3] ? l[0] : (ans && ans !== 'skip' ? ans : null), d = info(nm || l[0]).days, it = nm ? {id:-1, name:nm, cat:info(nm).cat, loc:info(nm).loc, days:d, frozen:false, listed:false} : null;
    let r = '<div class="rline' + (l[3] ? '' : ' lo') + '"><div class="row" style="gap:10px">' + (nm ? ico(nm, 36) : '<span class="fi" style="width:36px;height:36px;background:#FBF0D0;color:#7A4D00">' + svg('help', 18) + '</span>') + '<span class="grow"><span class="raw">' + l[4] + '</span><b style="display:block">' + (nm ? nm + ' · ' + (info(nm).unit ? l[1] + ' ' + info(nm).unit : '×' + l[1]) : 'Which one is this?') + '</b></span><span class="conf ' + (l[3] ? 'hi' : 'lo') + '">' + (l[3] ? 'Sure' : ans ? (ans === 'skip' ? 'Skipped' : 'Checked') : 'Check') + '</span></div>';
    if (!l[3]) r += '<div class="pick2">' + l[5].map(o => '<button data-a="rcPick" data-v="' + i + ':' + o + '" aria-pressed="' + (ans === o) + '">' + ico(o, 32) + o + '</button>').join('') + '</div>' + (ans ? '' : '<button class="chip" style="align-self:flex-start;min-height:36px" data-a="rcPick" data-v="' + i + ':skip">Not food / skip</button>');
    if (it) r += '<span class="sub" style="font-size:13px">' + svg('fridge', 14) + ' ' + zoneName(it) + ' · ' + rng(d) + ' · ' + money(l[2]) + '</span>';
    return r + '</div>';
  }).join('');
  h += '<button class="btn pri full" data-a="addReceipt">' + (open ? 'Add ' + n + ' now, answer ' + open + ' later' : 'Add ' + n + ' items to kitchen') + '</button>';
  return h + '</div>';
}
const addR9 = A.addReceipt;
A.addReceipt = function () {
  if (!U.rc || U.rc.ph !== 'done') return addR9();
  const pk = U.rc.pick || {}, snap = JSON.stringify(S), added = [];
  RL.forEach((l, i) => {
    const nm = l[3] ? l[0] : pk[i] && pk[i] !== 'skip' ? pk[i] : null; if (!nm) return;
    S.items.push(mk(nm, {qty:l[1], up:l[2] / l[1], src:'receipt', est:true})); S.shop = S.shop.filter(s => s.name !== nm); added.push(nm);
  });
  markAdded(); U.sheet = null; U.kt = 'fridge'; U.kv = 'live';
  commit(8, 'Added ' + added.length + ' items with your real prices. Put-away tips are ready.');
  setTimeout(() => UNDO(snap, 'added ' + added.length + ' items'), 40);
};
A.rcPick = v => { const p = v.split(':'); U.rc.pick = U.rc.pick || {}; U.rc.pick[+p[0]] = p[1]; paint(); };

/* ---------- shop-to-fridge ---------- */
const buy9 = A.shopBuy;
A.shopBuy = function (v, el, e) {
  const snap = JSON.stringify(S), n0 = S.items.length;
  buy9(v, el, e);
  if (S.items.length > n0) {
    const it = S.items[S.items.length - 1];
    setTimeout(() => { toast(it.name + ' is in the fridge list · ' + zoneName(it) + ' · ' + rng(it.days) + '.'); UNDO(snap, 'bought ' + it.name); }, 40);
  }
};

/* ---------- partial use + asks (item sheet) ---------- */
const half = it => it.unit ? Math.round(it.qty / 2 * 100) / 100 : Math.max(1, Math.floor(it.qty / 2));
function partRow(it) {
  if (it.frozen || it.listed || it.prov) return '';
  const canHalf = it.unit ? it.qty > 0 : it.qty >= 2, h = canHalf ? half(it) : 0;
  let r = '';
  if (canHalf) r += '<b style="font-size:14px">Only some of it?</b><div class="g2"><button class="btn ghost" style="min-height:48px" data-a="part" data-v="use:' + it.id + '">Used ' + (it.unit ? 'half' : h) + '</button><button class="btn ghost" style="min-height:48px" data-a="part" data-v="freeze:' + it.id + '">' + svg('snow', 16) + 'Freeze ' + (it.unit ? 'half' : h) + '</button></div>';
  const who = S.asks[it.id];
  r += '<b style="font-size:14px">Ask someone to use it</b><div class="wrap">' + ['mei', 'jun', 'maria'].map(k => '<button class="chip" style="min-height:40px;gap:6px" data-a="ask" data-v="' + it.id + ':' + k + '" aria-pressed="' + (who === k) + '">' + av(k).replace('width:28px;height:28px', 'width:22px;height:22px') + whoName(k) + '</button>').join('') + '</div>';
  return r;
}
Object.assign(A, {
  part: v => {
    const p = v.split(':'), it = find(+p[1]); if (!it) return;
    const snap = JSON.stringify(S), h = half(it), u = urgent(it);
    if (p[0] === 'use') { logE('used', it, h, u); it.qty = Math.round((it.qty - h) * 100) / 100; if (it.qty <= 0) S.items = S.items.filter(i => i !== it); U.sheet = null; commit(u ? 10 : 3, 'Logged ' + (it.unit ? 'half the ' + it.name.toLowerCase() : h + ' ' + it.name.toLowerCase()) + ' as used. The rest stays on your list.' + (u ? rescueAct() : '')); }
    else { logE('frozen', it, h, true); S.tot.frozen++; it.qty = Math.round((it.qty - h) * 100) / 100; S.items.push(mk(it.name, {qty:h, up:it.up, uk:it.uk, src:it.src, frozen:true, days:60, loc:'freezer'})); if (it.qty <= 0) S.items = S.items.filter(i => i !== it); U.sheet = null; commit(8, 'Froze ' + (it.unit ? 'half the ' + it.name.toLowerCase() : h + ' ' + it.name.toLowerCase()) + '. The rest is still in the fridge.' + rescueAct()); }
    setTimeout(() => UNDO(snap, 'part of ' + it.name), 40);
  },
  ask: v => {
    const p = v.split(':'), it = find(+p[0]); if (!it) return;
    if (S.asks[it.id] === p[1]) { delete S.asks[it.id]; save(); paint(); toast('Ask cancelled.'); return; }
    S.asks[it.id] = p[1]; save(); paint(); toast('Asked ' + whoName(p[1]) + ' to use the ' + lc(it.name) + (it.days <= 0 ? ' today.' : ' by ' + DAYS[(S.day + Math.max(0, it.days)) % 7] + '.'));
  }
});

/* ---------- recipes as rescue plans ---------- */
const recipe9 = recipeHTML;
recipeHTML = function (id) {
  let html = recipe9(id);
  const r = R(id), sv = U.sd.sv || S.house, x = resolve(r, sv / 2, U.sd.swaps);
  const need = x.rows.filter(g => !g.opt), have = need.filter(g => g.have).length, miss = x.rows.filter(g => !g.have && !g.opt);
  const saves = x.rows.filter(g => g.it && g.have && urgent(g.it)).map(g => g.it.name.toLowerCase());
  const extra = Math.max(0, sv - S.house), fav = S.rate[id];
  const rest = x.rows.filter(g => g.it && g.have && urgent(g.it) && !g.it.frozen && g.it.qty - g.a >= (g.it.unit ? .25 : 1))[0];
  let p = '<div class="plan"><div class="between"><b style="font-size:16px">Rescue plan</b><span class="pill ' + (have === need.length ? 'p-grn' : 'p-amb') + '">You have ' + have + ' of ' + need.length + '</span></div>';
  p += GFX.board(x.rows) + GFX.dials(r.time, sv, extra);
  p += '<div class="wrap" style="gap:6px"><span class="pill p-gry">' + r.skill + '</span>' + (S.prefs.al.length || S.prefs.diet.length ? '<span class="pill p-grn">' + svg('check', 13, 3) + 'Fits your food needs</span>' : '') + (miss.some(g => g.subs && g.subs.length) ? '<span class="pill p-amb">Swaps below</span>' : '') + '</div>';
  p += '<div class="wrap" style="gap:6px">' + (sv > 1 ? '<button class="chip" style="min-height:40px" data-a="svSet" data-v="' + Math.max(1, Math.round(sv / 2)) + '">Cook only half</button>' : '') + (rest ? '<button class="chip" style="min-height:40px" data-a="partRest" data-v="' + rest.it.id + ':' + rest.a + '">' + svg('snow', 14) + 'Freeze the rest of the ' + rest.it.name.toLowerCase() + '</button>' : '') + (miss.length ? '<button class="chip" style="min-height:40px" data-a="addMissing" data-v="' + id + '">' + svg('plus', 14) + 'Add missing to list</button>' : '') + '</div></div>';
  if (html.indexOf('</h1><div class="wrap">') < 0) return html;
  if (fav) html = html.replace('</h1><div class="wrap">', '</h1><div class="wrap"><span class="pill ' + (fav > 0 ? 'p-grn' : 'p-gry') + '">' + (fav > 0 ? svg('thumb', 14) + 'Family favourite' : 'Not a hit last time') + '</span>');
  const e2 = html.indexOf('</div>', html.indexOf('</h1><div class="wrap">') + 6) + 6;
  return html.slice(0, e2) + p + html.slice(e2);
};
A.svSet = v => { U.sd.sv = Math.max(1, Math.min(8, +v)); paint(); };
A.partRest = v => {
  const p = v.split(':'), it = find(+p[0]), keep = +p[1]; if (!it) return;
  const fr = Math.round((it.qty - keep) * 100) / 100; if (fr <= 0) return;
  const snap = JSON.stringify(S);
  logE('frozen', it, fr, true); S.tot.frozen++; it.qty = keep;
  S.items.push(mk(it.name, {qty:fr, up:it.up, uk:it.uk, src:it.src, frozen:true, days:60, loc:'freezer'}));
  commit(8, 'Froze the rest of the ' + it.name.toLowerCase() + '. The recipe still has what it needs.' + rescueAct());
  setTimeout(() => UNDO(snap, 'froze ' + it.name), 40);
};

/* ---------- cook: rating + better reuse ---------- */
const push9 = pushHTML;
pushHTML = function (p) {
  let html = push9(p);
  if (p.t === 'cook' && U.cook && U.cook.done) {
    const r = R(U.cook.rid), v = S.rate[r.id] || 0;
    const card = '<div class="card col" style="width:100%;text-align:left;gap:10px"><b style="font-size:16px">Would you cook this again?</b><span class="sub">Your answer tunes tonight’s picks.</span><div class="g2"><button class="btn ' + (v > 0 ? 'pri' : 'ghost') + '" data-a="rateMeal" data-v="1" aria-pressed="' + (v > 0) + '">' + svg('thumb', 18) + 'Yes, again</button><button class="btn ' + (v < 0 ? 'sec' : 'ghost') + '" data-a="rateMeal" data-v="-1" aria-pressed="' + (v < 0) + '">Not really</button></div></div>';
    const k = html.lastIndexOf('</div></div>'); if (k > 0) html = html.slice(0, k) + card + html.slice(k);
  }
  if (p.t === 'chat') {
    const k = html.indexOf('data-v="summary">Weekly summary</button>');
    if (k > 0) { const e = k + 'data-v="summary">Weekly summary</button>'.length; html = html.slice(0, e) + QS.map(q => '<button class="chip" style="flex:none" data-a="chatSend" data-v="' + q[0] + '">' + q[1] + '</button>').join('') + html.slice(e); }
  }
  return html;
};
A.rateMeal = v => { const r = R(U.cook.rid); S.rate[r.id] = +v; save(); paint(); toast(+v > 0 ? 'Saved as a family favourite.' : 'Got it. We’ll suggest it less.'); };
const pickT9 = pickTonight;
pickTonight = function () { const o = pickT9(); return o.map(id => (S.rate && S.rate[id] < 0) ? (RECIPES.find(r => r.id !== o[0] && r.id !== o[1] && !(S.rate[r.id] < 0)) || R(id)).id : id); };

/* ---------- kitchen assistant questions ---------- */
const QS = [['q:safe', 'Is the yoghurt still OK?'], ['q:tofu', 'Cook with tofu, eggs, rice?'], ['q:warm', 'My fridge feels warm'], ['q:shop', 'At the shops: what to skip?'], ['q:maria', 'Ask Maria to use the chicken']];
function answer(q) {
  if (q === 'q:safe') {
    const it = findN('Yoghurt'), c = info('Yoghurt');
    if (!it) return 'No yoghurt on your list right now.';
    const strict = /Use by/.test(c.type);
    return (strict ? 'SAFETY: yoghurt is a use-by food. ' : 'QUALITY: yoghurt is a best-before food. ') + (it.days < 0 ? (strict ? 'Yours is past its date, so bin it, even if it looks fine.' : 'Yours is past its date. Look, smell and taste a little first.') : 'Yours has ' + (it.days <= 0 ? 'until today' : it.days + ' days left') + '. If the pot is swollen or mouldy, bin it.');
  }
  if (q === 'q:tofu') {
    const want = ['Tofu', 'Eggs', 'Cooked rice'], rs = RECIPES.filter(r => r.ings.some(g => want.indexOf(g.n) >= 0 || (g.slot && g.cats.some(c => ['egg', 'protein', 'grain', 'rice'].indexOf(c) >= 0)))).map(r => Object.assign({r:r}, resolve(r))).sort((a, b) => (b.ok - a.ok) || (b.urg - a.urg)).slice(0, 3);
    return rs.length ? 'Try ' + listJoin(rs.map(y => y.r.name + ' (' + y.r.time + ' min' + (y.ok ? '' : ', missing a bit') + ')')) + '. Fried rice is best with day-old rice.' : 'Nothing matches yet. Want me to add the missing bits to the list?';
  }
  if (q === 'q:warm') return 'SAFETY: your fridge reads ' + S.ftemp + '°C. ' + (S.ftemp > 5 ? 'Move milk, raw meat and leftovers to the coldest shelf at the back, check the door seal and turn the dial one step colder. Aim for 0–5°C.' : 'That’s in the safe range (0–5°C). Keep the door shut and don’t overfill it.');
  if (q === 'q:shop') {
    const d = dupShop(), u = urgItems();
    return (d.length ? 'Skip ' + listJoin(d.map(s => s.name.toLowerCase())) + ': you already have some. ' : 'Nothing on your list is a double buy. ') + (u.length ? 'Use ' + listJoin(u.slice(0, 2).map(i => i.name.toLowerCase())) + ' first, so don’t buy more of those.' : '') + ' Multi-buy deals: only if you’ll freeze or plan the extra.';
  }
  if (q === 'q:maria') {
    const it = findN('Chicken thigh') || S.items.find(i => i.cat === 'protein' && !i.frozen);
    if (!it) return 'There’s no chicken on your list right now.';
    S.asks[it.id] = 'maria';
    return 'Done. Maria will see “Use the ' + lc(it.name) + (it.days <= 0 ? ' today' : ' by ' + DAYS[(S.day + Math.max(0, it.days)) % 7]) + '” in her Helper view. SAFETY: raw chicken must be cooked or frozen by its use-by.';
  }
  return null;
}
const chat9 = A.chatSend;
A.chatSend = function (v, el, e) {
  if (v && v.indexOf('q:') === 0) {
    const q = QS.find(x => x[0] === v); S.chat.push({f:'me', t:q ? q[1] : v}); save(); paint();
    setTimeout(() => { S.chat.push({f:'bot', t:answer(v)}); S.chat = S.chat.slice(-30); save(); paint(); }, 550);
    return;
  }
  return chat9(v, el, e);
};

/* ---------- helper view: asks ---------- */
const HT = {en:['Asked of you', 'Use the {f} {d}'], tl:['Hiling sa iyo', 'Gamitin ang {f} {d}'], id:['Tugas untukmu', 'Pakai {f} {d}']};
const screen9 = screenHTML;
screenHTML = function (t) {
  let html = screen9(t);
  if (t === 'htoday') {
    const asks = Object.keys(S.asks).filter(id => S.asks[id] === 'maria').map(id => find(+id)).filter(Boolean);
    if (asks.length) {
      const L = HT[S.hlang] || HT.en;
      const card = '<div class="card col" style="gap:8px;border-color:#F0E0B4;background:#FFFBEF"><h2 class="h2">' + L[0] + '</h2>' + asks.map(it => '<div class="row">' + icoI(it, 40) + '<b class="grow">' + L[1].replace('{f}', esc(lc(it.name))).replace('{d}', it.days <= 0 ? '· today' : '· ' + DAYS[(S.day + Math.max(0, it.days)) % 7]) + '</b><button class="btn pri sm" style="min-height:44px" data-a="act" data-v="use:' + it.id + '">' + svg('check', 18, 2.6) + '</button></div>').join('') + '</div>';
      const k = html.indexOf('<div class="card col"'); if (k > 0) html = html.slice(0, k) + card + html.slice(k);
    }
  }
  return html;
};
const act9 = act;
act = function (k, id) { act9(k, id); if ((k === 'use' || k === 'freeze') && !find(id) && S.asks[id]) { delete S.asks[id]; save(); } };

/* ---------- fridge health score ---------- */
function health() {
  const t = S.ftemp, its = S.items.filter(i => !i.listed && !i.frozen);
  const past = its.filter(i => i.days < 0), back = its.filter(F.isBack), unl = its.filter(i => isLeft(i) && !i.labeled), dup = dupShop();
  const parts = [
    ['temp', 'Temperature', t > 5 ? Math.min(30, (t - 5) * 10) : t < 2 ? 5 : 0, t + '°C' + (t > 5 ? ', too warm' : t < 2 ? ', very cold' : ', just right'), 'fzTemp', 'Check it'],
    ['past', 'Past its date', Math.min(30, past.length * 6), past.length ? past.length + ' item' + (past.length > 1 ? 's' : '') : 'None', 'stale', 'Clear out'],
    ['back', 'Hidden at the back', Math.min(15, back.length * 5), back.length ? back.length + ' item' + (back.length > 1 ? 's' : '') : 'None', 'goFridge', 'Bring forward'],
    ['lab', 'Unlabelled leftovers', Math.min(15, unl.length * 5), unl.length ? unl.length + ' tub' + (unl.length > 1 ? 's' : '') : 'None', unl[0] ? 'labelOpen' : '', 'Label it', unl[0] ? unl[0].id : ''],
    ['dup', 'Double buys on the list', Math.min(10, dup.length * 5), dup.length ? dup.length + ' item' + (dup.length > 1 ? 's' : '') : 'None', 'rcShop', 'Review list']
  ];
  return {score:Math.max(0, 100 - parts.reduce((a, p) => a + p[2], 0)), parts:parts};
}
window.psHealth = health;
const ring = (v, s, col) => { const r = s / 2 - 5, c = 2 * Math.PI * r; return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '" aria-hidden="true"><circle cx="' + s / 2 + '" cy="' + s / 2 + '" r="' + r + '" fill="none" stroke="#E3E6DE" stroke-width="8"/><circle cx="' + s / 2 + '" cy="' + s / 2 + '" r="' + r + '" fill="none" stroke="' + col + '" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + (c * v / 100).toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 ' + s / 2 + ' ' + s / 2 + ')"/><text x="50%" y="54%" text-anchor="middle" font-size="' + Math.round(s / 3.4) + '" font-weight="800" fill="#18201A" dominant-baseline="middle">' + v + '</text></svg>'; };
const hcol = v => v >= 80 ? '#1F9D55' : v >= 60 ? '#D9A321' : '#C2410C';
function healthCard() {
  const H = health(), top = H.parts.filter(p => p[2] > 0).sort((a, b) => b[2] - a[2])[0];
  return '<button class="hscore" data-a="healthOpen" aria-label="Fridge health ' + H.score + ' out of 100. Tap for details">' + ring(H.score, 64, hcol(H.score)) + '<span class="grow"><b style="display:block;font-size:15px">Fridge health ' + H.score + '/100</b><span class="sub">' + (top ? 'Biggest fix: ' + top[1].toLowerCase() + ' (' + top[3] + ')' : 'Everything looks good. Nice work.') + '</span></span>' + svg('next', 18) + '</button>';
}
function healthSheet() {
  const H = health();
  let h = '<div class="col">' + sheetHead('Fridge health') + '<div class="row" style="gap:16px">' + ring(H.score, 96, hcol(H.score)) + '<span class="sub" style="font-size:14px">100 is a cold, tidy fridge with nothing hidden or forgotten. Each fix below adds points back.</span></div>';
  h += '<div class="list">' + H.parts.map(p => '<div class="li" style="cursor:default"><span class="fi" style="width:36px;height:36px;background:' + (p[2] ? '#FDE7DC' : '#E9F2EC') + ';color:' + (p[2] ? '#B13C0B' : '#1F6B45') + '">' + svg(p[2] ? 'alert' : 'check', 18, 2.4) + '</span><span class="grow"><span class="t" style="display:block;font-size:14px">' + p[1] + '</span><span class="s">' + p[3] + (p[2] ? ' · −' + p[2] : '') + '</span></span>' + (p[2] && p[4] ? '<button class="btn ghost sm" style="min-height:44px" data-a="' + p[4] + '"' + (p[6] ? ' data-v="' + p[6] + '"' : '') + '>' + p[5] + '</button>' : '') + '</div>').join('') + '</div>';
  return h + '<span class="sub" style="font-size:12px">Score is a Jiak Clean guide, not a food-safety rating.</span></div>';
}
const kitchen9 = kitchenHTML;
kitchenHTML = function () {
  const html = kitchen9();
  if (U.kt !== 'fridge' || U.kv === 'list' || S.mode !== 'standard') return html;
  const m = html.match(/<div class="fz( [^"]*)?">/); if (!m) return html;
  return html.slice(0, m.index) + healthCard() + html.slice(m.index);
};

/* ---------- impact: waste profile + fridge fortune ---------- */
const CATN = {greens:'leafy greens', veg:'vegetables', fruit:'fruit', protein:'meat and fish', dairy:'dairy', egg:'eggs', bread:'bread', grain:'rice and grains', rice:'rice and grains', meal:'leftovers', left:'leftovers'};
const CATC = {greens:'#2F9E62', veg:'#7DBE62', fruit:'#E8A33D', protein:'#C2410C', dairy:'#3B82C4', egg:'#D9A321', bread:'#B8860B', grain:'#8A5700', rice:'#8A5700', meal:'#5B3B85', left:'#5B3B85'};
const catOf = e => e.name.indexOf('Leftover') === 0 ? 'left' : info(e.name).cat;
function profileCard() {
  const bin = S.log.filter(e => e.t === 'binned'), used = S.log.filter(e => e.t === 'used' || e.t === 'frozen');
  const by = {}; bin.forEach(e => { const c = catOf(e); by[c] = (by[c] || 0) + 1; });
  const ub = {}; used.forEach(e => { const c = catOf(e); ub[c] = (ub[c] || 0) + 1; });
  const cats = Object.keys(by).sort((a, b) => by[b] - by[a]).slice(0, 4), mx = Math.max(1, ...cats.map(c => by[c]));
  const topR = Object.keys(S.reasons || {}).sort((a, b) => S.reasons[b] - S.reasons[a])[0], R0 = REASONS.find(r => r[0] === topR);
  const best = Object.keys(ub).sort((a, b) => ub[b] - ub[a])[0];
  let h = '<div class="card col" style="gap:10px"><div class="between"><h2 class="h2">Your waste profile</h2><span class="sub">this week</span></div>';
  if (cats.length) {
    h += '<div class="wprof" role="img" aria-label="Binned this week by type: ' + cats.map(c => (CATN[c] || c) + ' ' + by[c]).join(', ') + '">' + cats.map(c => '<div><b style="color:#18201A">' + by[c] + '</b><i style="height:' + Math.round(by[c] / mx * 60) + 'px;background:' + (CATC[c] || '#9AA59E') + '"></i>' + (CATN[c] || c).split(' ')[0] + '</div>').join('') + '</div>';
    h += GFX.profile(cats[0], CATN[cats[0]] || cats[0], R0 ? R0[0] : null);
  } else h += '<span style="font-size:14px">Nothing binned this week. Keep going!</span>';
  if (best) h += '<div class="note" style="background:#F3EEF9;border-color:#DCCFEF;color:#3E2A5C">' + svg('star', 18) + '<span><b>Fridge fortune:</b> you’re great at rescuing ' + (CATN[best] || best) + '. ' + (best === 'greens' || best === 'veg' ? 'Try a zero-waste stir-fry this weekend.' : best === 'left' ? 'Try a leftover night every Thursday.' : 'Try the mystery basket for a bonus.') + '</span></div>';
  return h + '</div>';
}
const impact9 = impactHTML;
impactHTML = function () {
  const html = impact9(); if (S.mode !== 'standard') return html;
  const k = html.lastIndexOf('</div>'); return k > 0 ? html.slice(0, k) + profileCard() + html.slice(k) : html;
};

/* ---------- sharing: how to give, etiquette ---------- */
const GIVE = [['anon', 'Give anonymously', 'Shown as “a neighbour in your block”'], ['named', 'As myself', 'For neighbours you already know'], ['donate', 'Donate instead', 'Community fridge or food bank']];
const list9 = listSheet;
listSheet = function () {
  let html = list9(); const L = U.list;
  if (L.step === 1) html = html.replace('<b>What are you sharing?</b>', '<details class="mset"><summary>Sharing etiquette<span>what’s OK</span></summary>' + GFX.etiq() + '</details><b>What are you sharing?</b>');
  if (L.step === 3) html = html.replace('<b>Who can see it?</b>', '<b>How do you want to give?</b><div class="list">' + GIVE.map(g => '<button class="li" data-a="giveSet" data-v="' + g[0] + '" aria-pressed="' + (S.give === g[0]) + '">' + tog(S.give === g[0]) + '<span class="grow"><span class="t" style="display:block;font-size:14px">' + g[1] + '</span><span class="s">' + g[2] + '</span></span></button>').join('') + '</div><b>Who can see it?</b>');
  if (L.step === 4 && S.give === 'anon') html = html.replace('<b>Summary</b><br>', '<b>Summary</b><br>Listed by a neighbour in your block · ');
  return html;
};
A.giveSet = v => {
  if (v === 'donate') { U.sheet = null; U.st = 'donate'; S.tab = 'share'; U.stack = []; paint(); toast('Donating instead. Pick a community fridge or drop-off point.'); return; }
  S.give = v; save(); paint();
};
const handed9 = A.handed;
A.handed = function (v, el, e) {
  const l = S.listings.find(x => x.id === +v), nm = l ? l.name : '';
  handed9(v, el, e);
  if (l) setTimeout(() => banner('Rescue accepted', 'Your ' + nm.toLowerCase() + ' was collected by a neighbour. 1 more item kept out of the bin.', 'impact'), 1200);
};

/* ---------- notifications: one useful digest ---------- */
const NOTIF = [['digest', 'One daily digest + safety alerts'], ['all', 'Every nudge'], ['off', 'Safety alerts only']];
function digest() {
  const t = S.ftemp, ph = pastHigh(), lunch = S.items.find(i => isLeft(i) && !i.frozen && i.days >= 0 && i.days <= 1), u = urgItems(), b = u.length ? bestRecipe(u.map(i => i.id)) : null, d = dupShop();
  if (t > 5) return ['Fridge is ' + t + '°C', 'Move dairy and meat to the coldest shelf and check the door seal.', 'kitchen'];
  if (ph.length) return [ph[0].name + ' is past its use-by', 'Bin it safely. Use-by food can’t be judged by smell.', 'today'];
  if (S.notif === 'off') return null;
  if (lunch) return ['Lunch is sorted', 'Your ' + lc(lunch.name) + ' is best eaten today. Mark it eaten after.', 'left'];
  if (u.length && b) return [(u.length > 1 ? u.length + ' items can become dinner' : u[0].name + ' is due'), 'Tonight’s pick: ' + b.r.name + ' (' + b.r.time + ' min). Tap to see it.', 'cook'];
  if (u.length) return [u[0].name + ' is due ' + (u[0].days <= 0 ? 'today' : 'tomorrow'), 'Use it in anything, or freeze it to buy time.', 'today'];
  if (d.length) return ['Shopping today?', 'You already have ' + listJoin(d.slice(0, 2).map(s => s.name.toLowerCase())) + '. Skip or plan a second meal?', 'kitchen'];
  return null;
}
const remind9 = remind;
remind = function () {
  if (S.notif === 'all') return remind9();
  const m = digest(); if (!m) return;
  if (m[2] === 'left') banner(m[0], m[1], 'left'); else banner(m[0], m[1], m[2]);
};
const sheetS9 = sheetHTML;
sheetHTML = function () {
  if (U.sheet === 'receipt' && U.rc && U.rc.ph === 'done') return receiptReview();
  if (U.sheet === 'fhealth') return healthSheet();
  let html = sheetS9();
  if (U.sheet === 'settings') {
    const m = digest();
    const blk = '<b>Today shows first</b>' + chips(MOT.map(x => [x[0], x[1]]), S.mot || '', 'motSet') + '<b>Notifications</b>' + chips(NOTIF, S.notif, 'notifSet') + '<div class="note" style="background:#F6F7F2;border-color:#E3E6DE;color:#3D4A43">' + svg('bell', 18) + '<span><b>Next alert:</b> ' + (m ? esc(m[0]) + '. ' + esc(m[1]) : 'Nothing to send right now.') + '</span></div>';
    const k = html.indexOf('<details class="mset">'); if (k > 0) html = html.slice(0, k) + blk + html.slice(k);
  }
  if (U.sheet === 'item') {
    const it = find(U.sd.id), mark = '<b style="font-size:15px">What happened to it?</b>';
    const i = it ? html.indexOf(mark) : -1;
    if (i >= 0) {
      const g = html.indexOf('<div class="g2">', i), e = g >= 0 ? html.indexOf('</div>', g) + 6 : -1;
      const who = S.asks[it.id], pill = who ? '<span class="pill p-blu" style="align-self:flex-start">' + whoName(who) + ' is using it</span>' : '';
      if (e > 6) html = html.slice(0, e) + pill + partRow(it) + html.slice(e);
    }
  }
  return html;
};

/* ---------- actions ---------- */
Object.assign(A, {
  rcNext: () => { U.rcI = (U.rcI || 0) + 1; paint(); },
  dpSet: v => { U.dayp = v; U.rcI = 0; paint(); },
  laterT: () => { U.later = !U.later; paint(); },
  motSet: v => { S.mot = v; save(); paint(); toast('Today now puts ' + (MOT.find(m => m[0] === v) || MOT[0])[1].toLowerCase() + ' first.'); },
  notifSet: v => { S.notif = v; save(); paint(); },
  roleT: v => { const order = ['me', 'mei', 'jun', 'maria'], cur = S.roles[v]; S.roles[v] = order[(order.indexOf(cur) + 1) % order.length]; save(); paint(); },
  rcPlan: v => { S.tonight.pick = v; S.tonight.cook = null; save(); paint(); toast(R(v).name + ' is tonight’s plan. Who’s cooking?'); },
  rcFreeze: () => {
    const its = urgItems().slice(0, 3); if (!its.length) return;
    const snap = JSON.stringify(S);
    its.forEach(it => { logE('frozen', it, it.qty, true); S.tot.frozen++; it.frozen = true; it.days = 60; it.loc = 'freezer'; });
    commit(10 + 5 * its.length, 'Froze ' + listJoin(its.map(i => i.name.toLowerCase())) + '. Kept for another day.' + rescueAct());
    setTimeout(() => UNDO(snap, 'froze ' + its.length + ' items'), 40);
  },
  rcSkipDup: () => {
    const d = dupShop(); if (!d.length) return; const snap = JSON.stringify(S);
    d.forEach(s => { S.shop = S.shop.filter(x => x.id !== s.id); S.tot.dup++; S.log.push({id:++nid, t:'avoided', name:s.name, val:info(s.name).qty * info(s.name).up, kg:0, c:true, d:S.day, src:'typical', why:'Skipped a double buy'}); });
    commit(5 * d.length, 'Skipped ' + listJoin(d.map(s => s.name.toLowerCase())) + '. No double buys this trip.');
    setTimeout(() => UNDO(snap, 'skipped ' + d.length + ' items'), 40);
  },
  rcShop: () => { U.sheet = null; U.kt = 'shop'; go('kitchen'); },
  healthOpen: () => { U.sheet = 'fhealth'; paint(); }
});
['stale', 'goFridge', 'fzTemp', 'labelOpen'].forEach(k => { const f = A[k]; if (f) A[k] = function (v, el, e) { if (U.sheet === 'fhealth') U.sheet = null; return f(v, el, e); }; });

/* ---------- paint hook ---------- */
const paint9 = paint;
paint = function () { try { if (S) starterCheck(); } catch (e) {} paint9(); try { lockTabs(); } catch (e) {} };

/* guide journeys */
const gd = document.querySelector('.guide');
if (gd) gd.addEventListener('click', e => {
  const b = e.target.closest('[data-j]'); if (!b) return;
  const j = b.dataset.j;
  if (j !== 'onb' && S.starter) { S.starter = null; save(); paint(); }
  if (j === 'rescue') { S.mode = 'standard'; S.role = 'owner'; S.tab = 'today'; U.sheet = null; U.stack = []; U.rcI = 0; U.dayp = null; S.mot = null; save(); paint(); }
  if (j === 'smartadd') { S.mode = 'standard'; S.role = 'owner'; S.tab = 'kitchen'; U.kt = 'shop'; U.stack = []; U.rc = {ph:'done', pick:{}}; U.sheet = 'receipt'; save(); paint(); }
  if (j === 'household') { S.mode = 'standard'; S.role = 'owner'; S.tab = 'today'; S.mot = 'play'; U.sheet = null; U.stack = []; save(); paint(); }
});

if (S) paint();
})();
