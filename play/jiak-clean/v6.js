/* Jiak Clean v6: research-backed improvements (fridge map, temperature, put-away, rice planner, look-smell-taste, eat-down week, labels, feedback, community fridges) */
(function () {
const F = window.psFz;
document.head.insertAdjacentHTML('beforeend', '<style>' +
'.ps .mf2{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:8px;border-radius:18px;background:linear-gradient(180deg,#EEF2F0,#DDE4E0);box-shadow:inset 0 0 0 1.5px #C5CEC9;width:100%;max-width:280px;margin:0 auto}' +
'.ps .mf2 div{position:relative;border-radius:10px;padding:7px 8px;font-size:13px;font-weight:800;color:#18201A;display:flex;align-items:center;gap:6px;min-height:40px;transition:.3s}' +
'.ps .mf2 div.w{grid-column:1/3}.ps .mf2 div.on{outline:3px solid #18201A;outline-offset:1px;animation:mfPulse 1.2s infinite;z-index:1}' +
'@keyframes mfPulse{50%{outline-color:rgba(24,32,26,.25)}}' +
'.ps .mf2 div.dim{opacity:.35}' +
'.ps .thermo{display:flex;gap:16px;align-items:center;justify-content:center}' +
'.ps .lst{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.ps .lst div{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 4px;border-radius:14px;background:#F6F7F2;border:2px solid transparent;font-size:13px;font-weight:800;color:#4F5851}' +
'.ps .lst div.on{border-color:#1F6B45;background:#E9F2EC;color:#174F33}.ps .lst div.ok{background:#E9F2EC;color:#1F6B45}.ps .lst div.bad{background:#FDE7DC;color:#B13C0B}' +
'.ps .tape{position:relative;margin:6px auto;width:92%;max-width:300px;padding:16px 18px;background:#F1E2B8;transform:rotate(-1.5deg);box-shadow:0 4px 10px rgba(0,0,0,.15);color:#2B2A26;font-size:16px;font-weight:600;line-height:1.45;clip-path:polygon(0 4%,3% 0,6% 4%,9% 0,12% 4%,15% 0,18% 4%,21% 0,24% 4%,27% 0,30% 4%,33% 0,36% 4%,39% 0,42% 4%,45% 0,48% 4%,51% 0,54% 4%,57% 0,60% 4%,63% 0,66% 4%,69% 0,72% 4%,75% 0,78% 4%,81% 0,84% 4%,87% 0,90% 4%,93% 0,96% 4%,100% 0,100% 96%,97% 100%,94% 96%,91% 100%,88% 96%,85% 100%,82% 96%,79% 100%,76% 96%,73% 100%,70% 96%,67% 100%,64% 96%,61% 100%,58% 96%,55% 100%,52% 96%,49% 100%,46% 96%,43% 100%,40% 96%,37% 100%,34% 96%,31% 100%,28% 96%,25% 100%,22% 96%,19% 100%,16% 96%,13% 100%,10% 96%,7% 100%,4% 96%,0 100%)}' +
'.ps .bars{display:flex;align-items:flex-end;gap:14px;height:120px;padding:4px 6px 0}.ps .bars div{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;height:100%;font-size:13px;font-weight:700;color:#4F5851}.ps .bars i{display:block;width:100%;border-radius:8px 8px 3px 3px;min-height:4px}' +
'.ps .shelfie{display:flex;flex-wrap:wrap;gap:4px;padding:8px;border-radius:14px;background:linear-gradient(180deg,#FFFFFF,#E9F3F6);border:1px solid #CBD9DE}' +
'.ps .shelfie span{position:relative}.ps .shelfie span i{position:absolute;right:-2px;top:-2px;width:10px;height:10px;border-radius:5px;border:2px solid #fff}' +
'</style>');

/* ---------- state ---------- */
function add6(s) {
  if (s.v6) return s;
  s.v6 = true; s.ftemp = 7; s.fchk = false; s.back = {};
  const t = s.items.find(i => i.name === 'Tofu'), l = s.items.find(i => i.name.indexOf('Leftover') === 0);
  if (t) s.back[t.id] = 1; if (l) s.back[l.id] = 1;
  s.ed = {on:false}; s.goal = 'half'; s.lw = {n:4, val:6.8};
  s.rice = {eat:{me:true, mei:true, jun:true, maria:true}, guests:0, app:'normal', extra:false};
  return s;
}
const seed5 = seed;
seed = function () { return add6(seed5()); };
if (S) { add6(S); save(); }

/* ---------- shared bits ---------- */
const ZLIST = [['freezer', 'w'], ['top', 'w'], ['mid', 'w'], ['bottom', 'w'], ['veg', ''], ['fruit', '']];
const WHAT = {freezer:'Bread, rice, ripe bananas', top:'Leftovers, ready-to-eat', mid:'Milk, eggs, tofu', bottom:'Raw meat and seafood', veg:'Greens and veg', fruit:'Fruit'};
function miniFridge(on, notes) {
  return '<div class="mf2" aria-hidden="true">' + ZLIST.map(z => '<div class="' + z[1] + (on ? (on === z[0] ? ' on' : ' dim') : '') + '" style="background:' + F.ZCOL[z[0]] + '33;border:2px solid ' + F.ZCOL[z[0]] + '"><i class="zdot" style="background:' + F.ZCOL[z[0]] + '"></i><span>' + F.ZONES[z[0]][0] + (notes ? '<span style="display:block;font-weight:600;color:#3D4A43">' + (notes[z[0]] || WHAT[z[0]]) + '</span>' : '') + '</span></div>').join('') + '</div>';
}
const bigDraw = (it, h) => { const d = F.draw(it); return '<svg viewBox="0 ' + (d.top - 2) + ' ' + d.w + ' ' + (66 - d.top + 2) + '" height="' + h + '" width="' + Math.round(d.w * h / (66 - d.top + 2)) + '" style="max-width:100%;filter:drop-shadow(0 3px 4px rgba(0,0,0,.2))" aria-hidden="true">' + d.body + '</svg>'; };
const dayName = n => DAYS[((n % 7) + 7) % 7];
const binnedVal = () => S.log.filter(e => e.t === 'binned').reduce((a, e) => a + (e.val || 0), 0);

/* ---------- sheets ---------- */
function tempSheet() {
  const t = U.tmp, col = t <= 5 ? '#1F9D55' : t <= 7 ? '#D9A321' : '#C2410C', fill = Math.round(16 + t * 11);
  let h = '<div class="col">' + sheetHead('Fridge temperature') + '<p class="sub">Aim for 0–5°C.</p>';
  h += '<div class="thermo"><svg width="70" height="170" viewBox="0 0 70 170" aria-hidden="true"><rect x="25" y="8" width="20" height="130" rx="10" fill="#EEF2F0" stroke="#9AA59E" stroke-width="2"/><rect x="25" y="' + (8 + 130 - 25 * 130 / 150) + '" width="20" height="' + (25 * 130 / 150) + '" fill="#D9F2E2"/>' + [0, 2, 4, 6, 8, 10].map(v => '<path d="M45 ' + (138 - (16 + v * 11)) + ' h8" stroke="#6B7670" stroke-width="1.5"/><text x="56" y="' + (142 - (16 + v * 11)) + '" font-size="13" fill="#4F5851" font-family="Figtree,sans-serif">' + v + '</text>').join('') + '<rect class="merc" data-fill="' + fill + '" x="30" y="' + (138 - fill) + '" width="10" height="' + fill + '" rx="5" fill="' + col + '"/><circle cx="35" cy="148" r="16" fill="' + col + '" stroke="#9AA59E" stroke-width="2"/></svg>';
  h += '<div class="col" style="gap:8px;align-items:center"><b style="font-size:44px;color:' + col + ';line-height:1">' + t + '°C</b><span class="pill ' + (t <= 5 ? 'p-grn' : t <= 7 ? 'p-amb' : 'p-red') + '">' + (t <= 5 ? 'Just right' : t <= 7 ? 'A bit warm' : 'Too warm') + '</span><div class="row"><button class="btn ghost ib" data-a="tmpStep" data-v="-1" aria-label="Colder">−</button><button class="btn ghost ib" data-a="tmpStep" data-v="1" aria-label="Warmer">+</button></div></div></div>';
  h += '<div class="card col" style="gap:10px"><b>Colder fridge, longer life</b>' + IG.hbars([['Milk', 42, '#3B82C4', '+1.5 days'], ['Cucumber', 62, '#7DBE62', '+5 days'], ['Broccoli', 100, '#2F9E62', '2× as long']]) + '<span class="sub">At 4°C instead of 9°C</span>' + SRC('WRAP, reported by Which?, 2022') + '</div>';
  h += '<div class="ig ig2">' + IG.tile('7°C', 'average home fridge', '#C2410C') + IG.tile('0–5°C', 'where it should be', '#1F9D55') + '</div>' + SRC('WRAP / Love Food Hate Waste (UK homes)');
  h += '<b>Check it in 3 steps</b><div class="steps3"><div><svg width="56" height="56" viewBox="0 0 40 40" aria-hidden="true"><path d="M11 9h18l-2 24H13z" fill="#DDEFFB" stroke="#3B82C4" stroke-width="1.6"/><path d="M12.5 16h15" stroke="#3B82C4" stroke-width="1"/><rect x="19" y="5" width="3" height="22" rx="1.5" fill="#fff" stroke="#C2410C" stroke-width="1.2"/><circle cx="20.5" cy="28" r="3" fill="#C2410C"/></svg>Thermometer in water</div><div><svg width="56" height="56" viewBox="0 0 40 40" aria-hidden="true"><path d="M25 8a12 12 0 1 0 8 19A10 10 0 0 1 25 8z" fill="#5B3B85"/><circle cx="12" cy="10" r="1.2" fill="#D9A321"/><circle cx="31" cy="12" r="1" fill="#D9A321"/></svg>Leave overnight</div><div><svg width="56" height="56" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="13" fill="#fff" stroke="#1F6B45" stroke-width="2"/><path d="M20 20 L12 14" stroke="#1F6B45" stroke-width="2.6" stroke-linecap="round"/><path d="M9 26a13 13 0 0 1 0-12" stroke="#3B82C4" stroke-width="3" fill="none"/><path d="M31 14a13 13 0 0 1 0 12" stroke="#C2410C" stroke-width="3" fill="none"/></svg>Above 5°C? Turn colder</div></div>';
  return h + '<button class="btn pri full" data-a="tempSave">Save ' + t + '°C</button></div>';
}
function mapSheet() {
  const urg = S.items.filter(urgent).slice(0, 5);
  let h = '<div class="col">' + sheetHead('Fridge door map') + '<p class="sub">Find food before you open the door.</p>' + '<div class="ig ig2">' + IG.tile('1st', 'colour zones + door chart', '#1F6B45') + IG.tile('2nd', 'fridge camera', '#6B7670') + '</div>' + SRC('Farr-Wharton, QUT: both cut waste in real homes; colour zones cut more') + '';
  h += miniFridge(null, true);
  h += '<b>Look here first today</b>' + (urg.length ? '<div class="list">' + urg.map(it => { const z = F.zoneOf(it); return '<button class="li" data-a="item" data-v="' + it.id + '">' + icoI(it, 36) + '<span class="grow"><span class="t" style="display:block">' + esc(it.name) + '</span><span class="s"><i class="zdot" style="background:' + F.ZCOL[z] + '"></i> ' + F.ZONES[z][0] + (F.isBack(it) ? ' · at the back' : '') + '</span></span><span class="pill ' + dinfo(it).c + '">' + dinfo(it).l + '</span></button>'; }).join('') + '</div>' : '<div class="card sub">Nothing urgent today.</div>');
  return h + '<button class="btn ghost full" data-a="printMap">' + svg('receipt', 18) + 'Print the door map</button></div>';
}
function putSheet() {
  const P = U.pa; if (!P) return '';
  if (P.i >= P.ids.length) return '<div class="col" style="align-items:center;text-align:center">' + sheetHead('All put away') + '<span class="fi" style="width:72px;height:72px;border-radius:36px;background:#1F6B45;color:#fff">' + svg('check', 36, 2.6) + '</span><b style="font-size:18px">' + P.ids.length + ' items in the right place</b><p class="sub" style="font-size:15px">Older food is at the front, new food behind it. That’s how supermarkets rotate stock.</p><button class="btn pri full" data-a="closeSheet">See the fridge</button></div>';
  const it = find(P.ids[P.i]); if (!it) { P.i++; return putSheet(); }
  const z = F.zoneOf(it), older = S.items.filter(x => x.name === it.name && x.id !== it.id && !x.frozen && x.id < it.id);
  let h = '<div class="col">' + sheetHead('Put away ' + (P.i + 1) + ' of ' + P.ids.length) + '<div class="dots">' + P.ids.map((_, i) => '<i class="' + (i <= P.i ? 'on' : '') + '"></i>').join('') + '</div>';
  h += '<div class="row" style="gap:14px;align-items:center"><span style="flex:none">' + bigDraw(it, 96) + '</span><span class="col" style="gap:4px"><b style="font-size:20px">' + esc(it.name) + '</b><span class="row" style="gap:6px;font-weight:800;font-size:15px"><i class="zdot" style="background:' + F.ZCOL[z] + '"></i>' + F.ZONES[z][0] + '</span><span class="sub">' + F.ZWORD[z] + ' zone</span></span></div>';
  h += miniFridge(z);
  h += '<div class="note">' + svg('help', 18) + '<span>' + F.ZONES[z][1] + '</span></div>';
  if (info(it.name).tip) h += '<p style="margin:0;font-size:14px">' + info(it.name).tip + '</p>';
  if (older.length) h += '<div class="warn">' + svg('swap', 18) + '<span>You already have ' + (older.length > 1 ? older.length + ' older ' : 'an older ') + esc(it.name.toLowerCase()) + '. Put the new one behind it and use the older one first.</span></div>';
  return h + SRC('Stock rotation: WWF UK, Check the fridge before you shop') + '<button class="btn pri full" data-a="putNext">' + (older.length ? 'Done: new one behind' : 'Done: it’s in') + '</button></div>';
}
function riceSheet() {
  const R6 = S.rice, app = {light:.8, normal:1, hungry:1.25}[R6.app], ppl = MEMBERS.filter(m => R6.eat[m[0]]).length + R6.guests;
  const g = Math.round((ppl * 75 * app + (R6.extra ? 75 : 0)) / 5) * 5, cups = Math.max(.25, Math.round(g / 150 * 4) / 4), full = Math.floor(cups), part = cups - full;
  const cupSVG = f => '<svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><path d="M6 10 L38 10 L35 38 Q22 42 9 38Z" fill="#FFFFFF" stroke="#9AA59E" stroke-width="1.6"/><clipPath id="rc' + Math.round(f * 100) + '"><path d="M6 10 L38 10 L35 38 Q22 42 9 38Z"/></clipPath><g clip-path="url(#rc' + Math.round(f * 100) + ')"><rect class="cupfill" x="0" y="' + (40 - 30 * f) + '" width="44" height="44" fill="#F4ECD6"/></g>' + (f > 0 ? '<path d="M10 ' + (40 - 30 * f + 2) + ' h24" stroke="#E2D4AE" stroke-width="1"/>' : '') + '<path d="M9 14 L33 14" stroke="#C9D2CD" stroke-width="1" stroke-dasharray="2 2"/></svg>';
  let h = '<div class="col">' + sheetHead('Rice planner') + '<p class="sub">Measure it, don’t guess it.</p>';
  h += '<b>Who’s eating tonight?</b><div class="wrap">' + MEMBERS.map(m => '<button class="chip" data-a="riceWho" data-v="' + m[0] + '" aria-pressed="' + !!R6.eat[m[0]] + '">' + av(m[0], 22) + m[1] + '</button>').join('') + '</div>';
  h += '<div class="card between"><span><b>Guests</b><span class="sub" style="display:block">Extra people tonight</span></span><span class="row"><button class="btn ghost ib" data-a="riceGuest" data-v="-1" aria-label="Fewer guests">−</button><b style="font-size:20px;width:24px;text-align:center">' + R6.guests + '</b><button class="btn ghost ib" data-a="riceGuest" data-v="1" aria-label="More guests">+</button></span></div>';
  h += '<b>How hungry?</b>' + chips([['light', 'Light'], ['normal', 'Normal'], ['hungry', 'Very hungry']], R6.app, 'riceApp');
  h += '<button class="card between" style="text-align:left" data-a="riceExtra" aria-pressed="' + R6.extra + '"><span><b style="display:block">Cook one extra portion on purpose</b><span class="sub">For tomorrow’s fried rice lunch, planned not wasted</span></span>' + tog(R6.extra) + '</button>';
  h += '<div class="card col acc-g" style="gap:10px;align-items:center;text-align:center"><span class="sub" style="font-weight:800;color:#1F6B45">COOK THIS MUCH</span><div class="row" style="gap:4px;justify-content:center;flex-wrap:wrap">' + Array.from({length:full}, () => cupSVG(1)).join('') + (part ? cupSVG(part) : '') + '</div><b style="font-size:26px">' + (full ? full : '') + (part ? (full ? ' ' : '') + ({.25:'¼', .5:'½', .75:'¾'}[part]) : '') + ' rice-cooker cup' + (cups > 1 ? 's' : '') + '</b><span class="sub">About ' + g + ' g uncooked rice for ' + ppl + ' ' + (ppl === 1 ? 'person' : 'people') + (R6.extra ? ', plus 1 planned lunch' : '') + '</span></div>';
  h += '<div class="ig ig2">' + IG.tile('75 g', 'uncooked rice per adult', '#7A5B12') + IG.tile('≈150 g', 'one rice-cooker cup', '#7A5B12') + '</div>' + SRC('Portion: Love Food Hate Waste guide, via North London Waste Authority. Cup weight is approximate.') + SRC('Measuring + “others do it too” cut grain waste: van Geffen et al., Wageningen University');
  return h + '<button class="btn pri full" data-a="riceCook">Cook this amount</button></div>';
}
const LST = {
  'Bread':['Any fuzzy spots of mould, even tiny ones?', 'Smells musty or sour?', 'Tastes stale? That’s fine: toast it.'],
  'Bananas':['Leaking, split open or mouldy?', 'Smells fermented, like alcohol?', 'Very soft and sweet is fine; sour is not.'],
  'Tomatoes':['Mould, or leaking juice?', 'Smells sour or fermented?', 'Soft is fine for cooking; bitter or fizzy is not.'],
  'Onions':['Mouldy or mushy?', 'Smells rotten rather than oniony?', 'Small sprouts are fine. Cut them off and cook it.'],
  'Kai lan':['Slimy, black or mouldy leaves?', 'Smells sour or rotten?', 'Wilted but firm is fine to cook.'],
  'Spinach':['Slimy or dark, mushy leaves?', 'Smells sour?', 'Wilted is fine in soup or eggs.'],
  'Eggs':['Cracked, or dirty shell?', 'Crack one into a bowl: any bad smell?', 'Cook until the white is set, then taste.'],
  'Apples':['Mould or rotten patches?', 'Smells fermented?', 'Soft is perfect for baking.'],
  'Carrots':['Slimy or mouldy?', 'Smells sour?', 'Bendy is fine. Soak in cold water to crisp up.']
};
function lstSheet() {
  const L = U.lst, it = find(L.id); if (!it) return '';
  const q = LST[it.name] || ['Any mould, slime or damaged, swollen packaging?', 'Smells sour, musty or “off”?', 'Taste a little: sour, bitter or fizzy?'];
  const bad = L.ans.indexOf(true), names = ['Look', 'Smell', 'Taste'], icons = ['eye', 'help', 'pot'];
  let h = '<div class="col">' + sheetHead('Look, smell, taste') + '<div class="row" style="gap:12px">' + bigDraw(it, 70) + '<span class="col" style="gap:2px"><b style="font-size:18px">' + esc(it.name) + '</b><span class="sub">' + info(it.name).type + ' · ' + dinfo(it).l + '</span></span></div>';
  h += '<div class="lst">' + names.map((n, i) => '<div class="' + (i === L.step && bad < 0 ? 'on' : i < L.ans.length ? (L.ans[i] ? 'bad' : 'ok') : '') + '">' + svg(i < L.ans.length ? (L.ans[i] ? 'close' : 'check') : icons[i], 26) + n + '</div>').join('') + '</div>';
  if (bad >= 0) return h + '<div class="card col acc-r" style="gap:8px"><b style="font-size:18px;color:#B13C0B">Bin it</b><span style="font-size:15px">It failed the ' + names[bad].toLowerCase() + ' check. Safety first.</span></div><button class="btn full" style="background:#B13C0B;color:#fff" data-a="lstBin">Log it as binned</button><button class="btn ghost full" data-a="closeSheet">Close</button></div>';
  if (L.step >= 3) return h + '<div class="card col acc-g" style="gap:8px"><b style="font-size:18px;color:#1F6B45">Still good. Use it today.</b><span style="font-size:15px">Best before = quality, not safety.</span>' + SRC('SFA, reported in The Straits Times, Feb 2024') + '</div><button class="btn pri full" data-a="lstUse">I’ll use it now</button><button class="btn ghost full" data-a="lstFreeze">Freeze it for later</button></div>';
  return h + '<div class="card col" style="gap:10px;align-items:center;text-align:center"><span class="sub" style="font-weight:800;color:#1F6B45">' + names[L.step].toUpperCase() + '</span><b style="font-size:20px;line-height:1.3">' + q[L.step] + '</b></div><div class="g2"><button class="btn" style="min-height:56px;background:#FDE7DC;color:#B13C0B" data-a="lstAns" data-v="1">' + (L.step === 2 ? 'Tastes off' : 'Yes') + '</button><button class="btn" style="min-height:56px;background:#E9F2EC;color:#1F6B45" data-a="lstAns" data-v="0">' + (L.step === 2 ? 'Tastes fine' : 'No') + '</button></div><p class="sub">Best-before food only. Use-by food: follow the date.</p>' + SRC('Look-Smell-Taste: Too Good To Go. Germs you can’t smell: Which? / UK FSA') + '</div>';
}
function edSheet() {
  const E = S.ed;
  let h = '<div class="col">' + sheetHead('Eat-down week') + '<p class="sub">5 days of cooking from what you have.</p>';
  h += '<div class="card col" style="gap:8px"><b>We eat less than we expect</b><div class="row" style="gap:14px;font-size:13px;font-weight:700"><span class="row" style="gap:5px"><i class="zdot" style="background:#C9D2CD"></i>Expected</span><span class="row" style="gap:5px"><i class="zdot" style="background:#C2410C"></i>Actually ate</span></div>' + [['Veg', 94, 44, '44%'], ['Meat', 97, 50, '~50%'], ['Fruit', 71, 40, '40%'], ['Dairy', 84, 42, '42%']].map(p => '<div class="hb"><span>' + p[0] + '</span><span class="col" style="gap:3px"><span class="tr" style="height:8px"><i style="width:' + p[1] + '%;background:#C9D2CD"></i></span><span class="tr"><i style="width:' + p[2] + '%;background:#C2410C"></i><em>' + p[3] + '</em></span></span></div>').join('') + SRC('Roe et al., Ohio State University, 2019 (US households)') + '</div>';
  if (!E.on) return h + '<button class="btn pri full" data-a="edStart">' + svg('flame', 18) + 'Start an eat-down week</button></div>';
  const left = S.items.length, done = Math.max(0, E.n0 - left), pct = Math.round(done / Math.max(1, E.n0) * 100), d = Math.max(1, Math.min(5, (S.dn != null ? S.dn : S.day) - E.start + 1));
  h += '<div class="card col" style="gap:10px"><div class="between"><b>Day ' + d + ' of 5</b><span class="pill p-amb">' + done + ' of ' + E.n0 + ' eaten down</span></div><div class="bar" style="height:12px"><i style="width:' + pct + '%;background:#C2410C"></i></div><span class="sub">Roughly ' + money((E.val || 0)) + ' of food used up since you started.</span></div>';
  h += '<b>Allowed top-ups</b><div class="wrap">' + ['Milk', 'Eggs', 'Bread', 'Leafy greens', 'Fruit'].map(n => '<span class="pill p-grn" style="font-size:14px">' + n + '</span>').join('') + '</div>';
  return h + '<button class="btn pri full" data-a="tab" data-v="cook">Find recipes from what’s left</button><button class="btn ghost full" data-a="edEnd">End the eat-down week</button></div>';
}
function labelSheet() {
  const it = find(U.sd.lid); if (!it) return '';
  const base = it.name.replace('Leftover: ', ''), cooked = S.day - Math.max(0, 2 - it.days), eat = S.day + Math.max(0, it.days);
  return '<div class="col">' + sheetHead('Label this tub') + '<p class="sub">Everyone sees what it is and when to eat it.</p><div class="tape"><b style="font-size:20px;display:block">' + esc(base) + '</b>Cooked: ' + dayName(cooked) + ' by ' + mem(it.by)[1] + '<br>Eat by: <b>' + dayName(eat) + '</b><br>Reheat once, until steaming hot</div>' +
    '<div class="note">' + svg('help', 18) + '<span>Keeps 2 days. Freeze it if not.</span></div><button class="btn pri full" data-a="labelOn">' + (it.labeled ? 'Labelled' : 'Stick it on') + '</button><button class="btn ghost full" data-a="printMap">' + svg('receipt', 18) + 'Print labels</button></div>';
}

/* ---------- screen wraps ---------- */
const sheet6 = sheetHTML;
sheetHTML = function () {
  const m = {temp:tempSheet, fmap:mapSheet, putaway:putSheet, rice:riceSheet, lst:lstSheet, eatdown:edSheet, label:labelSheet};
  if (m[U.sheet]) return m[U.sheet]();
  let html = sheet6();
  if (U.sheet === 'item') {
    const it = find(U.sd.id), mark = '<b style="font-size:15px">What happened to it?</b>';
    if (it && html.indexOf(mark) >= 0) {
      const c = iinfo(it); let add = '';
      if (F.isBack(it)) add += '<button class="btn sec full" data-a="bringFront" data-v="' + it.id + '">' + svg('swap', 18) + 'It’s at the back: bring it to the front</button>';
      if (!it.frozen && !it.prov && c.risk !== 'high' && /Best before|Ripeness/.test(c.type)) add += '<button class="card row acc-g" style="text-align:left" data-a="lstOpen" data-v="' + it.id + '"><span class="fi" style="width:40px;height:40px;background:#1F6B45;color:#fff">' + svg('eye', 20) + '</span><span class="grow"><b style="display:block">Look, smell, taste check</b><span class="sub">Often fine after the date. Check in 3 taps.</span></span>' + svg('next', 18) + '</button>';
      else if (!it.frozen && c.risk === 'high') add += '<div class="note">' + svg('shield', 18) + '<span><b>Don’t sniff-test this one.</b> You can’t smell these germs. Follow the date.</span></div>';
      if (isLeft(it) && !it.labeled) add += '<button class="btn ghost full" data-a="labelOpen" data-v="' + it.id + '">' + svg('receipt', 18) + 'Make a dated tub label</button>';
      html = html.replace(mark, add + mark);
    }
  }
  return html;
};
const cook6 = cookHTML;
cookHTML = function () {
  let html = cook6();
  if (U.ct === 'plan') return html;
  const card = '<div class="g2"><button class="card col" style="gap:6px;padding:12px;text-align:left" data-a="riceOpen"><span class="fi" style="width:36px;height:36px;background:#F4ECD6;color:#7A5B12">' + svg('pot', 18) + '</span><b style="font-size:14px">Rice planner</b><span class="sub">How much to cook tonight</span></button><button class="card col" style="gap:6px;padding:12px;text-align:left" data-a="eatDown"><span class="fi" style="width:36px;height:36px;background:#FCEDE4;color:#C2410C">' + svg('flame', 18) + '</span><b style="font-size:14px">Eat-down week</b><span class="sub">' + (S.ed.on ? 'Day ' + Math.min(5, S.day - S.ed.start + 1) + ' of 5' : 'Cook from what you have') + '</span></button></div>';
  const i = html.indexOf('<div class="seg">');
  if (i < 0) return html;
  const j = html.indexOf('</div>', i) + 6;
  return html.slice(0, j) + card + html.slice(j);
};
const shop6 = shopHTML;
shopHTML = function () {
  const its = S.items.filter(i => !i.listed), urg = its.filter(urgent);
  const zs = ['top', 'mid', 'bottom', 'veg', 'fruit', 'freezer', 'cup', 'counter'];
  const pics = its.slice().sort((a, b) => zs.indexOf(F.zoneOf(a)) - zs.indexOf(F.zoneOf(b))).slice(0, 14).map(it => '<span>' + icoI(it, 34) + '<i style="background:' + F.ZCOL[F.zoneOf(it)] + '"></i></span>').join('');
  const card = '<div class="card col" style="gap:8px"><div class="between"><b>Fridge shelfie before you shop</b><button class="chip" style="min-height:32px" data-a="goFridge">Open live fridge</button></div><div class="shelfie">' + pics + '</div><span class="sub">' + its.length + ' items at home, ' + urg.length + ' to use first.</span></div>';
  return card + shop6();
};
const left6 = leftHTML;
leftHTML = function (lefts) {
  let html = left6(lefts);
  lefts.forEach(it => {
    const k = 'data-a="act" data-v="bin:' + it.id + '">Bin</button>';
    if (html.indexOf(k) >= 0) html = html.replace(k, k + '</div><div class="g2" style="margin-top:-4px"><button class="btn ghost sm" style="min-height:44px" data-a="labelOpen" data-v="' + it.id + '">' + svg('receipt', 16) + (it.labeled ? 'Labelled' : 'Label tub') + '</button><button class="btn ghost sm" style="min-height:44px" data-a="goFridge">' + svg('fridge', 16) + 'Find it</button>');
  });
  return html;
};
const impact6 = impactHTML;
impactHTML = function () {
  const html = impact6(), now = binnedVal(), last = S.lw.val, goal = S.goal === 'zero' ? 0 : S.goal === 'half' ? last / 2 : last * .8, mx = Math.max(now, last, goal, 1);
  const bar = (v, c, l) => '<div><b>' + money(v) + '</b><i style="height:' + Math.max(4, Math.round(v / mx * 80)) + 'px;background:' + c + '"></i>' + l + '</div>';
  const msg = now <= goal ? 'You’re on track for your goal. Keep it up.' : now < last ? 'Less than last week, ' + money(now - goal) + ' above your goal.' : 'More than last week. Check the Eat-Me-First shelf and the back of the fridge.';
  const card = '<div class="card col acc-o" style="gap:10px"><div class="between"><h2 class="h2" style="font-size:14px">The price of waste</h2><span class="pill p-red">Binned</span></div><div class="bars">' + bar(last, '#C9D2CD', 'Last week') + bar(now, now <= goal ? '#1F9D55' : '#C2410C', 'This week') + bar(goal, '#F2C94C', 'Your goal') + '</div><span style="font-size:14px">' + msg + '</span>' + chips([['less', '20% less'], ['half', 'Halve it'], ['zero', 'Zero']], S.goal, 'setGoal') + '' + SRC('NEA Say YES to Waste Less 2026: “There’s a Price to Waste”') + '</div>';
  const mark = '<div class="card col" style="gap:10px"><h2 class="h2" style="font-size:14px">In everyday terms';
  let out = html.indexOf(mark) >= 0 ? html.replace(mark, card + mark) : html;
  const rb = F.draw({id:3, name:'Jasmine rice (uncooked)', cat:'grain', qty:1, days:300, frozen:false, prov:null});
  const sg = '<div class="card col" style="gap:10px"><b>Singapore’s food waste</b><div class="ig ig3">' + IG.tile('790k', 'tonnes in 2025', '#C2410C', '<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><path d="M8 14h24l-2 22H10z" fill="#6B7670"/><rect x="6" y="10" width="28" height="5" rx="2" fill="#4F5851"/><path d="M15 19v13M20 19v13M25 19v13" stroke="#9AA59E" stroke-width="1.6"/></svg>') + IG.ring(18, '#1F9D55', 'recycled') + IG.tile('2.5 kg', 'avoidable, per home each week', '#7A5B12', '<svg viewBox="0 ' + (rb.top - 2) + ' ' + rb.w + ' ' + (66 - rb.top + 2) + '" width="34" height="40" aria-hidden="true">' + rb.body + '</svg>') + '</div>' + SRC('NEA food waste statistics, 2025; NEA household waste study, 2017') + '</div>';
  const k1 = out.indexOf('</h1></div>'), k2 = k1 >= 0 ? out.indexOf('</div>', k1 + 11) : -1;
  return k2 >= 0 ? out.slice(0, k2 + 6) + sg + out.slice(k2 + 6) : out;
};
const share6 = shareHTML;
shareHTML = function () {
  const html = share6(), k = html.lastIndexOf('</div>');
  const card = '<div class="card col" style="gap:10px"><div class="between"><h2 class="h2">Community fridges</h2><span class="pill p-grn">Free to all</span></div><div class="ig ig2">' + IG.tile('14', 'community fridges restocked', '#1F6B45') + IG.tile('40+', 'distribution points', '#1F6B45') + '</div>' + SRC('Fridge Restock Community SG, via SUTD LKYCIC report, 2025') + '' +
    '<div class="list">' + [['Bishan', 'Blk 112 Bishan Street 12'], ['Yishun', 'Blk 162 Yishun Street 11'], ['Tampines Changkat', 'Blk 117 Tampines Street 11']].map(f => '<div class="li" style="cursor:default"><span class="fi" style="width:36px;height:36px;background:#E9F2EC;color:#1F6B45">' + svg('fridge', 18) + '</span><span class="grow"><span class="t" style="display:block">' + f[0] + '</span><span class="s">' + f[1] + '</span></span></div>').join('') + '</div>' +
    '<div class="wrap">' + [['check', 'Sealed'], ['cal', 'In date'], ['leaf', 'Whole fruit & veg']].map(x => '<span class="pill p-grn" style="font-size:14px;padding:6px 10px">' + svg(x[0], 14, 2.4) + x[1] + '</span>').join('') + '</div><span class="sub">Each fridge posts its own rules.</span>' + SRC('Addresses from public listings (TheSmartLocal, 2026). Check before you go.') + '</div>';
  return html.slice(0, k) + card + html.slice(k);
};

/* ---------- actions ---------- */
const fzDemo6 = A.fzDemo;
Object.assign(A, {
  fzTemp: () => { U.tmp = S.ftemp; U.sheet = 'temp'; paint(); },
  tmpStep: v => { U.tmp = Math.max(0, Math.min(10, U.tmp + +v)); paint(); },
  tempSave: () => {
    const was = S.ftemp; S.ftemp = U.tmp; U.sheet = null;
    if (S.ftemp <= 5 && was > 5) {
      let n = 0; S.items.forEach(i => { if (!i.frozen && ['dairy', 'greens', 'veg', 'fruit'].indexOf(i.cat) >= 0) { i.days++; n++; } });
      S.fchk = true; commit(20, 'Fridge set to ' + S.ftemp + '°C. ' + n + ' fresh items got about a day longer (estimate).');
    } else { if (S.ftemp <= 5) S.fchk = true; save(); paint(); toast(S.ftemp > 5 ? 'Still above 5°C. Turn the dial a little colder.' : 'Saved. Your fridge is in the safe zone.'); }
  },
  fzRotate: () => { const n = Object.keys(S.back || {}).length; S.back = {}; S.check.move = true; commit(10, 'Moved ' + n + ' item' + (n > 1 ? 's' : '') + ' to the front where everyone can see them.'); },
  bringFront: v => { delete S.back[+v]; S.check.move = true; U.sheet = null; commit(5, 'Moved to the front.'); },
  fzMap: () => { U.sheet = 'fmap'; paint(); },
  printMap: () => toast('Printing is switched off in this preview.'),
  putAway: () => { const ids = S.items.filter(i => i.src === 'receipt' && !i.put && !i.frozen).map(i => i.id); if (!ids.length) { toast('Nothing new to put away.'); return; } U.pa = {ids:ids, i:0}; U.sheet = 'putaway'; paint(); },
  putNext: () => {
    const P = U.pa, it = find(P.ids[P.i]);
    if (it) { it.put = true; const older = S.items.filter(x => x.name === it.name && x.id !== it.id && x.id < it.id && !x.frozen); older.forEach(x => delete S.back[x.id]); if (older.length) S.back[it.id] = 1; }
    P.i++;
    if (P.i >= P.ids.length) { S.check.move = true; save(); paint(); commit(10, 'Groceries put away. Older food is in front.'); U.sheet = 'putaway'; paint(); return; }
    save(); paint();
  },
  fzDemo: () => { fzDemo6(); setTimeout(() => { if (!U.sheet) A.putAway(); }, 1200); },
  riceOpen: () => { U.sheet = 'rice'; paint(); },
  riceWho: v => { S.rice.eat[v] = !S.rice.eat[v]; save(); paint(); },
  riceGuest: v => { S.rice.guests = Math.max(0, Math.min(8, S.rice.guests + +v)); save(); paint(); },
  riceApp: v => { S.rice.app = v; save(); paint(); },
  riceExtra: () => { S.rice.extra = !S.rice.extra; save(); paint(); },
  riceCook: () => { U.sheet = null; S.tot.plan = (S.tot.plan || 0) + 1; commit(5, 'Rice measured. ' + (S.rice.extra ? 'Tomorrow’s fried rice lunch is planned.' : 'Just enough for tonight.')); },
  lstOpen: v => { U.lst = {id:+v, step:0, ans:[]}; U.sheet = 'lst'; paint(); },
  lstAns: v => { U.lst.ans.push(v === '1'); U.lst.step++; paint(); },
  lstUse: () => { const id = U.lst.id; U.sheet = null; S.tot.safety++; act('use', id); },
  lstFreeze: () => { const id = U.lst.id; U.sheet = null; act('freeze', id); },
  lstBin: () => { U.sd = {id:U.lst.id}; U.sheet = 'bin'; paint(); },
  eatDown: () => { U.sheet = 'eatdown'; paint(); },
  edStart: () => { S.ed = {on:true, start:(S.dn != null ? S.dn : S.day), n0:S.items.length, val:0}; U.sheet = null; commit(10, 'Eat-down week started. Cook from what you have for 5 days.'); },
  edEnd: () => { const done = Math.max(0, S.ed.n0 - S.items.length); S.ed = {on:false}; U.sheet = null; commit(done >= 5 ? 40 : 10, 'Eat-down week finished: ' + done + ' items eaten down.'); },
  labelOpen: v => { U.sd = {lid:+v}; U.sheet = 'label'; paint(); },
  labelOn: () => { const it = find(U.sd.lid); if (it) it.labeled = true; U.sheet = null; commit(5, 'Labelled. Everyone can see when to eat it by.'); },
  setGoal: v => { S.goal = v; save(); paint(); },
  goFridge: () => { U.sheet = null; U.kt = 'fridge'; U.kv = 'live'; U.fzAnim = true; go('kitchen'); }
});

/* ---------- guide ---------- */
document.querySelector('.guide').addEventListener('click', e => {
  const b = e.target.closest('[data-j]'); if (!b) return; const j = b.dataset.j;
  if (['putaway', 'rice', 'temp', 'lst'].indexOf(j) < 0) return;
  S.mode = 'standard'; S.role = 'owner'; U.stack = []; U.sheet = null; U.q = '';
  if (j === 'rice') { S.tab = 'cook'; U.ct = 'recipes'; save(); paint(); A.riceOpen(); return; }
  S.tab = 'kitchen'; U.kt = 'fridge'; U.kv = 'live'; U.fzAnim = true; save(); paint();
  if (j === 'temp') A.fzTemp();
  if (j === 'putaway') { fzDemo6(); setTimeout(A.putAway, 400); }
  if (j === 'lst') { const it = S.items.find(i => i.name === 'Bread') || S.items.find(i => i.name === 'Bananas'); if (it) A.lstOpen(it.id); }
});
if (S) paint();
})();
