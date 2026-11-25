/* Jiak Clean v8: playtest fixes + UX upgrades
   - absolute day counter (learn cap, eat-down) and last-week rollover
   - Undo on use / freeze / bin
   - "Still there?" quick clear-out for items well past their date (lapse & re-entry)
   - search "Add to list", deal check on the shopping list, buy-rescued-food card
   - very-cold fridge warning, banner focus fix, bigger tap targets */
(function () {
document.head.insertAdjacentHTML('beforeend', '<style>' +
'.ps .banner:not(.show){visibility:hidden;transition:transform .35s,visibility 0s .35s}' +
'.ps .banner.show{visibility:visible;transition:transform .35s,visibility 0s}' +
'.ps .toast .undo{pointer-events:auto;margin-left:auto;border:0;border-radius:10px;background:#2F3A33;color:#9FD4B2;font:inherit;font-weight:800;font-size:14px;padding:0 14px;min-height:40px;cursor:pointer;flex-shrink:0}' +
'.ps .toast .undo:focus-visible{outline:2px solid #9FD4B2;outline-offset:2px}' +
'.ps .stl{display:flex;flex-direction:column;gap:8px;padding:10px 12px;border-radius:16px;background:#fff;border:1.5px solid #E7E2D6}' +
'.ps .stl .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.ps .stl .g2{display:grid;grid-template-columns:1fr 1fr;gap:6px}' +
'.ps .stl .btn{min-height:44px;padding:0 6px;font-size:14px}' +
'.ps .deal{padding:8px 10px;border-radius:12px;font-size:13px;font-weight:700;display:flex;gap:8px;align-items:flex-start}' +
'.ps .deal.ok{background:#E9F2EC;color:#174F33}.ps .deal.no{background:#FDE7DC;color:#8A2E08}' +
'.ps .resc{display:grid;grid-template-columns:44px 1fr;gap:10px;align-items:center;padding:10px;border-radius:14px;background:#F6F7F2}' +
'.ps .resc .lg{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;font-weight:900;color:#fff;font-size:18px}' +
'</style>');

/* ---------- absolute day counter ---------- */
const fix = s => { if (s && s.dn == null) s.dn = s.day || 0; if (s && !s.lw) s.lw = {n:0, val:0}; return s; };
const seed8 = seed;
seed = function () { return fix(seed8()); };
if (S) { fix(S); save(); }

const binnedNow = () => S.log.filter(e => e.t === 'binned');
const nextDay8 = nextDay;
nextDay = function () {
  fix(S);
  if (S.day === 6) { const b = binnedNow(); S.lw = {n:b.length, val:Math.round(b.reduce((a, e) => a + (e.val || 0), 0) * 100) / 100}; }
  S.dn++;
  U.undo = null;
  nextDay8();
};

/* eat-down saving counter survives the weekly log reset */
const logE8 = logE;
logE = function (t, it, a, c, extra) {
  const e = logE8(t, it, a, c, extra);
  if (t === 'used' && S.ed && S.ed.on) S.ed.val = (S.ed.val || 0) + (e.val || 0);
  return e;
};

/* ---------- undo ---------- */
let undoT;
function offerUndo(snap, label) {
  U.undo = {snap:snap, label:label};
  const t = document.getElementById('toast');
  if (!t || !t.classList.contains('show') || t.querySelector('.undo')) return;
  t.insertAdjacentHTML('beforeend', '<button class="undo" data-a="undo" aria-label="Undo: ' + esc(label) + '">Undo</button>');
  clearTimeout(tT); tT = setTimeout(() => t.classList.remove('show'), 5600);
  clearTimeout(undoT); undoT = setTimeout(() => { U.undo = null; }, 6000);
}
const act8 = act;
act = function (kind, id) {
  const it = find(id), snap = it && (kind === 'use' || kind === 'freeze') ? JSON.stringify(S) : null, n0 = S.items.length, fz0 = it && it.frozen;
  act8(kind, id);
  if (!snap) return;
  const changed = kind === 'use' ? S.items.length < n0 : (find(id) && find(id).frozen && !fz0);
  if (changed) { U.undo = {snap:snap}; setTimeout(() => offerUndo(snap, (kind === 'use' ? 'used ' : 'froze ') + it.name), 30); }
};
const binR8 = A.binReason;
A.binReason = function (v, el, e) {
  const p = (v || '').split(':'), it = find(p[0]), snap = it ? JSON.stringify(S) : null;
  binR8(v, el, e);
  if (snap && !find(p[0])) setTimeout(() => offerUndo(snap, 'binned ' + it.name), 30);
};
window.psUndo = offerUndo;
A.undo = () => {
  if (!U.undo) { toast('Nothing to undo.'); return; }
  S = JSON.parse(U.undo.snap); nid = S.nid || nid; U.undo = null; U.sheet = null;
  save(); paint(); toast('Undone. Back as it was.');
};

/* ---------- stale items: "Still there?" ---------- */
const stale = () => S.items.filter(i => !i.frozen && !i.listed && i.days <= -2);
function staleSheet() {
  const st = stale();
  let h = '<div class="col">' + sheetHead('Still there?') + '<p class="sub">These are well past their date. A quick tap keeps your fridge honest.</p>';
  if (!st.length) return h + '<div class="card col" style="align-items:center;gap:8px;text-align:center">' + svg('check', 34, 2.6) + '<b>All clear</b><span class="sub">Your list matches your fridge.</span></div><button class="btn pri full" data-a="closeSheet">Done</button></div>';
  h += st.map(it => {
    const c = iinfo(it), hi = c.risk === 'high';
    return '<div class="stl"><div class="row" style="gap:10px">' + icoI(it, 40) + '<span class="grow"><b style="display:block">' + esc(it.name) + '</b><span class="sub">' + (-it.days) + ' days past · ' + esc(c.type || 'Date') + '</span></span>' + (hi ? '<span class="pill p-red">Don’t eat</span>' : '') + '</div>' +
      '<div class="' + (hi ? 'g2' : 'g3') + '"><button class="btn ghost" data-a="stGone" data-v="eaten:' + it.id + '">Eaten</button><button class="btn ' + (hi ? 'sec' : 'ghost') + '" data-a="stGone" data-v="binned:' + it.id + '">' + (hi ? 'Bin it now' : 'Binned') + '</button>' +
      (hi ? '' : '<button class="btn ghost" data-a="stCheck" data-v="' + it.id + '">Check it</button>') + '</div></div>';
  }).join('');
  h += '<div class="g2"><button class="btn sec" data-a="stAll" data-v="eaten">All eaten</button><button class="btn sec" data-a="stAll" data-v="binned">All binned</button></div>';
  h += '<p class="sub" style="font-size:13px">Use-by meat, fish and leftovers past their date should be binned, not tasted.</p>';
  return h + '</div>';
}
function clearOne(kind, it) {
  if (kind === 'eaten') logE('used', it, it.qty, false);
  else { logE('binned', it, it.qty, false, {why:'I forgot about it'}); S.reasons.forgot = (S.reasons.forgot || 0) + 1; }
  S.items = S.items.filter(i => i !== it);
}
Object.assign(A, {
  stale: () => { U.sheet = 'stale'; paint(); },
  stGone: v => {
    const p = v.split(':'), it = find(p[1]); if (!it) return;
    const snap = JSON.stringify(S);
    clearOne(p[0] === 'eaten' ? 'eaten' : 'binned', it);
    if (!stale().length) U.sheet = null;
    save(); paint(); toast(p[0] === 'eaten' ? it.name + ' marked as eaten.' : it.name + ' cleared. Logged as forgotten.');
    setTimeout(() => offerUndo(snap, 'cleared ' + it.name), 30);
  },
  stAll: v => {
    const st = stale(); if (!st.length) return;
    const snap = JSON.stringify(S);
    st.forEach(it => clearOne(v, it));
    U.sheet = null; save(); paint(); toast(st.length + ' items cleared. Your kitchen list is up to date.');
    setTimeout(() => offerUndo(snap, 'cleared ' + st.length + ' items'), 30);
  },
  stCheck: v => { U.sheet = 'item'; U.sd = {id:+v}; paint(); },
  qShop: () => {
    const n = (U.q || '').trim(); if (!n) return;
    const had = S.shop.length; A.shopAdd(n);
    if (S.shop.length > had) toast(S.shop[S.shop.length - 1].name + ' added to the shopping list.');
  },
  dealT: v => { const s = S.shop.find(x => x.id === +v); if (!s) return; s.deal = !s.deal; save(); paint(); }
});

function staleCard() {
  const st = stale(); if (!st.length) return '';
  const many = st.length >= 3;
  return '<button class="card row acc-o" style="text-align:left;gap:12px" data-a="stale"><span class="fi" style="width:44px;height:44px;background:#FBF0D0;color:#8A5A00">' + svg('fridge', 22) + '</span><span class="grow"><b style="display:block;font-size:15px">' + (many ? 'Welcome back! Quick fridge check' : 'Still in the fridge?') + '</b><span class="sub">' + st.length + ' item' + (st.length > 1 ? 's' : '') + ' well past date · 20-second clear-out</span></span>' + svg('next', 18) + '</button>';
}
const today8 = todayHTML;
todayHTML = function () {
  const html = today8(), c = staleCard(); if (!c) return html;
  const k = html.indexOf('<button class="more-btn"');
  return k >= 0 ? html.slice(0, k) + c + html.slice(k) : html + c;
};

/* ---------- shopping list: deal check ---------- */
const NOFRZ = ['Eggs', 'Tomatoes', 'Cucumber', 'Lettuce', 'Yoghurt', 'Kai lan', 'Spinach'];
function dealNote(s) {
  const c = info(s.name), d = c.days || 3, fr = NOFRZ.indexOf(s.name) < 0, ok = fr || d >= 7;
  const plan = fr ? 'Freeze the extra on the day you buy it.' : 'It keeps about ' + d + ' days. Plan a meal for it this week.';
  return '<div class="deal ' + (ok ? 'ok' : 'no') + '">' + svg(ok ? 'check' : 'alert', 16, 2.4) + '<span>' + (ok ? 'Deal OK if you plan it. ' + plan : 'Skip the deal: keeps ~' + d + ' days and doesn’t freeze well.') + '</span></div>';
}
const shop8 = shopHTML;
shopHTML = function () {
  let html = shop8();
  S.shop.forEach(s => {
    const k = 'data-a="shopBuy" data-v="' + s.id + '"', i = html.indexOf(k); if (i < 0) return;
    const end = html.indexOf('</div></div>', html.indexOf('<span class="grow">', i)); if (end < 0) return;
    const chip = '<button class="chip" style="min-height:36px;align-self:flex-start" data-a="dealT" data-v="' + s.id + '"' + (s.deal ? ' aria-pressed="true"' : '') + '>' + svg('list', 14) + (s.deal ? 'Multi-buy deal' : 'On a multi-buy deal?') + '</button>' + (s.deal ? dealNote(s) : '');
    const cardEnd = html.indexOf('<div class="card col"', i);
    const stop = cardEnd > 0 ? html.lastIndexOf('</div>', cardEnd) : html.lastIndexOf('</div>', html.indexOf('<p class="sub">Shared list', i));
    if (stop > i) html = html.slice(0, stop) + chip + html.slice(stop);
  });
  if (S.shop.length) html = html.replace('<p class="sub">Shared list. Claim items to avoid double buys.</p>', '<p class="sub">Shared list. Claim items to avoid double buys.</p>' + SRC('Multi-buy deals: Gravert & Mormann 2025; van Lin et al. 2023'));
  return html;
};

/* ---------- share: buy rescued food ---------- */
const share8 = shareHTML;
shareHTML = function () {
  const html = share8(), k = html.lastIndexOf('</div>');
  const apps = [['Y', '#E2572B', 'Yindii', 'Surprise bags from bakeries and cafés at closing time.'], ['T', '#1F6B45', 'Treatsure', 'Unsold hotel buffet food and grocery surplus.']];
  const card = '<div class="card col" style="gap:10px"><div class="between"><h2 class="h2">Buy rescued food</h2><span class="pill p-amb">Up to 50–80% off</span></div>' +
    apps.map(a => '<div class="resc"><span class="lg" style="background:' + a[1] + '">' + a[0] + '</span><span><b style="display:block">' + a[2] + '</b><span class="sub">' + a[3] + '</span></span></div>').join('') +
    '<span class="sub">Examples, not partners. Only buy what you’ll eat today.</span>' + SRC('Yindii; Treatsure (app listings, 2026)') + '</div>';
  return html.slice(0, k) + card + html.slice(k);
};

/* ---------- sheets ---------- */
const sheet8 = sheetHTML;
sheetHTML = function () {
  if (U.sheet === 'stale') return staleSheet();
  let html = sheet8();
  if (U.sheet === 'temp' && U.tmp <= 1) {
    html = html.replace('<span class="pill p-grn">Just right</span>', '<span class="pill p-amb">Very cold</span>').replace('font-size:44px;color:#1F9D55', 'font-size:44px;color:#3B82C4');
    const k = html.indexOf('<div class="card col"');
    const warn = '<div class="note" style="background:#E3EDF9;border-color:#BFD3EE;color:#174A85">' + svg('snow', 18) + '<span>Below 2°C, salad, milk and eggs can freeze. 3–4°C is the sweet spot.</span></div>';
    if (k >= 0) html = html.slice(0, k) + warn + html.slice(k);
  }
  return html;
};

/* ---------- guide journey ---------- */
const g = document.querySelector('.guide');
if (g) g.addEventListener('click', e => {
  const b = e.target.closest('[data-j]'); if (!b || b.dataset.j !== 'stale') return;
  S.mode = 'standard'; S.role = 'owner'; S.tab = 'today'; U.stack = [];
  const it = S.items.filter(i => !i.frozen && !i.listed).slice(0, 3); it.forEach((i, n) => { i.days = -3 - n; });
  U.sheet = 'stale'; save(); paint();
});

if (S) paint();
})();
