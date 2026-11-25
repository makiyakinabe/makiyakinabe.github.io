/* Jiak Clean: Learn & donate. Flashcards and quick games; correct answers earn points a sponsor turns into meals (demo). */
(function () {
const F = window.psFz;
document.head.insertAdjacentHTML('beforeend', '<style>' +
'.ps .jar{position:relative;width:96px;height:116px;flex:none;border-radius:18px 18px 26px 26px;background:linear-gradient(90deg,rgba(255,255,255,.75),rgba(230,242,246,.6));box-shadow:inset 0 0 0 2.5px #B7CBD6,0 6px 14px rgba(0,0,0,.08);overflow:hidden}' +
'.ps .jar::before{content:"";position:absolute;left:-4px;right:-4px;top:-2px;height:14px;border-radius:6px;background:#9AA4AD;box-shadow:inset 0 -3px 0 #7A8791;z-index:2}' +
'.ps .jar i{position:absolute;left:0;right:0;bottom:0;background:radial-gradient(circle at 20% 30%,#fff 0 1.6px,transparent 2px) 0 0/9px 7px,radial-gradient(circle at 70% 70%,#fff 0 1.6px,transparent 2px) 0 0/11px 8px,linear-gradient(#F4ECD6,#E9DCB8);border-top:2px solid #E2D4AE}' +
'.ps .jar::after{content:"";position:absolute;left:12px;top:20px;bottom:14px;width:7px;border-radius:4px;background:rgba(255,255,255,.85);z-index:2}' +
'.ps .gtile{display:flex;flex-direction:column;gap:6px;padding:12px;text-align:left}' +
'.ps .gtile .fi{width:44px;height:44px}' +
'.ps .fc{perspective:1200px}' +
'.ps .fc-in{position:relative;min-height:300px;transform-style:preserve-3d;transition:transform .6s}' +
'.ps .fc.flipped .fc-in{transform:rotateY(180deg);animation:fcFlip .6s cubic-bezier(.2,.8,.2,1)}' +
'@keyframes fcFlip{from{transform:rotateY(0)}to{transform:rotateY(180deg)}}' +
'.ps .fc-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:22px;padding:18px;display:flex;flex-direction:column;gap:12px;background:#fff;box-shadow:0 8px 24px rgba(24,32,26,.12),inset 0 0 0 1px #E3E6DE}' +
'.ps .fc-back{transform:rotateY(180deg)}' +
'.ps .fc-back.ok{background:linear-gradient(180deg,#F1F7F2,#fff)}.ps .fc-back.no{background:linear-gradient(180deg,#FFF6F1,#fff)}' +
'.ps .opt{display:flex;align-items:center;gap:10px;width:100%;min-height:52px;border-radius:14px;border:1.5px solid #E3E6DE;background:#F6F7F2;padding:10px 14px;font:inherit;font-size:16px;font-weight:700;color:#18201A;text-align:left}' +
'.ps .opt:active{transform:scale(.98)}' +
'.ps .zgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}' +
'.ps .zbtn{display:flex;align-items:center;gap:8px;min-height:48px;border-radius:12px;padding:8px 10px;font:inherit;font-size:14px;font-weight:800;color:#18201A;text-align:left;border:2px solid transparent}' +
'.ps .zbtn.ok{outline:3px solid #1F9D55;outline-offset:1px}.ps .zbtn.no{outline:3px solid #B13C0B;outline-offset:1px}' +
'.ps .gstage{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px;border-radius:22px;background:linear-gradient(180deg,#FFFFFF,#EEF5F1);box-shadow:inset 0 0 0 1px #DCE6DF;min-height:170px;justify-content:center}' +
'.ps .gstage .pts{position:absolute;right:14px;top:10px;font-weight:800;font-size:20px;color:#1F9D55}' +
'.ps .tbar{height:8px;border-radius:4px;background:#E3E6DE;overflow:hidden}.ps .tbar i{display:block;height:100%;background:#1F6B45;transition:width 1s linear}' +
'.ps .combo{display:inline-flex;align-items:center;gap:4px;font-weight:800;color:#C2410C}' +
'.ps .org{display:flex;gap:12px;align-items:flex-start;text-align:left;padding:12px}' +
'.ps .org[aria-pressed="true"]{border:1.5px solid #1F6B45;background:#F1F7F2}' +
'</style>');

/* ---------- content ---------- */
const PT_CENTS = 1, CAP = 150;
const ORGS = [
  {id:'wh', name:'Willing Hearts', what:'Soup kitchen cooking meals every day', unit:'meal', cost:0.60, stat:'About 8,500 meals cooked a day', src:'Cost per meal packet: RICE Media; meals a day: Willing Hearts profile on Benevity'},
  {id:'ffth', name:'Food from the Heart', what:'Monthly grocery packs for families', unit:'food pack', cost:40, stat:'S$480 feeds a family for a year', src:'Food from the Heart: S$40 sponsors one Community Food Pack'}
];
const SRC_SFA = 'SFA, reported in The Straits Times, Feb 2024', SRC_NEA25 = 'NEA food waste statistics, 2025', SRC_NEA17 = 'NEA household waste study, 2017';
const CARDS = [
  ['c1', 'Labels', '“Best before” on a pack is about…', ['Safety', 'Quality', 'When the shop sells it'], 1, 'Best before is about quality. Use by is about safety.', SRC_SFA],
  ['c2', 'Labels', 'Which date means “don’t eat it after”?', ['Best before', 'Use by', 'Display until'], 1, 'Use-by food can be unsafe after the date even if it looks fine.', SRC_SFA],
  ['c3', 'Labels', 'Milk and yoghurt usually carry a…', ['Use-by date', 'Best-before date', 'No date at all'], 0, 'Highly perishable food gets a use-by date.', SRC_SFA],
  ['c4', 'Singapore', 'Food waste Singapore generated in 2025:', ['79,000 tonnes', '790,000 tonnes', '7.9 million tonnes'], 1, 'About 11% of all waste generated in Singapore.', SRC_NEA25],
  ['c5', 'Singapore', 'How much of it was recycled?', ['8%', '18%', '48%'], 1, 'The other 82% was disposed of and incinerated.', SRC_NEA25],
  ['c6', 'Singapore', 'Which foods do Singapore homes waste most?', ['Fruit and yoghurt', 'Rice, noodles and bread', 'Meat and fish'], 1, 'Measure grains and freeze spare bread.', SRC_NEA17],
  ['c7', 'Singapore', 'Avoidable waste per home each week is like binning…', ['A 2.5 kg bag of rice', 'A carton of eggs', 'One apple'], 0, 'About half of household food waste could be avoided.', SRC_NEA17],
  ['c8', 'Storage', 'Where does raw meat go in the fridge?', ['Top shelf', 'In the door', 'Bottom shelf'], 2, 'So drips can’t reach ready-to-eat food.', 'NHS food storage advice'],
  ['c9', 'Storage', 'What temperature should a fridge be?', ['0–5°C', '6–9°C', '10–12°C'], 0, 'Many home fridges run warmer, at about 7°C.', 'WRAP / Love Food Hate Waste; Which?'],
  ['c10', 'Storage', 'Cooling a fridge from 9°C to 4°C keeps milk fresh for…', ['About 1.5 days longer', 'A week longer', 'No longer'], 0, 'Broccoli lasts about twice as long too.', 'WRAP, reported by Which?, 2022'],
  ['c11', 'Safety', 'Chill cooked rice within about…', ['1 hour', '4 hours', 'Overnight'], 0, 'Warm rice can grow bacteria whose toxins survive reheating.', 'Food Standards Scotland, rice safety'],
  ['c12', 'Safety', 'Rice in the fridge should be eaten within…', ['24 hours', '3 days', 'A week'], 0, 'And reheat it only once, until steaming hot.', 'Food Standards Scotland, rice safety'],
  ['c13', 'Safety', 'What does freezing do to germs?', ['Kills them', 'Pauses them', 'Makes them grow'], 1, 'They can grow again once food thaws.', 'USDA FSIS, Freezing and Food Safety'],
  ['c14', 'Safety', 'Mould on soft bread. What now?', ['Cut it off', 'Toast it', 'Bin the whole loaf'], 2, 'Mould spreads further than you can see in soft food.', 'USDA FSIS, Molds on Food'],
  ['c15', 'Habits', 'People expected to eat 94% of their fridge veg. They ate…', ['44%', '74%', '94%'], 0, 'A full fridge hides food. Eat down before you shop.', 'Roe et al., Ohio State University, 2019'],
  ['c16', 'Habits', 'Households using yellow Use It Up tape binned…', ['20–40% less food', '5% less', 'The same'], 0, 'A visual cue in the fridge works.', 'OzHarvest Use It Up Tape trial, via Monash Lens'],
  ['c17', 'Charity', 'How many meals does Willing Hearts cook a day?', ['About 850', 'About 8,500', 'About 85,000'], 1, 'Cooked in one kitchen, every day of the year.', 'Willing Hearts profile on Benevity']
];
const SORT = [['Milk', ['mid']], ['Chicken thigh', ['bottom']], ['Prawns', ['bottom']], ['Leftover: Chicken curry', ['top']], ['Cooked rice', ['top']], ['Kai lan', ['veg']], ['Carrots', ['veg']], ['Apples', ['fruit']], ['Bananas', ['counter']], ['Onions', ['counter', 'cup']], ['Bread', ['counter', 'freezer']], ['Instant noodles', ['cup']], ['Soy sauce', ['cup']], ['Eggs', ['mid']], ['Yoghurt', ['mid']], ['Tomatoes', ['counter', 'veg']], ['Fish fillet', ['bottom']], ['Spinach', ['veg']]];
const ZB = [['freezer', 'Freezer'], ['top', 'Top shelf'], ['mid', 'Middle shelf'], ['bottom', 'Bottom shelf'], ['veg', 'Veg drawer'], ['fruit', 'Fruit drawer'], ['cup', 'Cupboard'], ['counter', 'Counter']];
const LABELS = [['Milk', 'ub'], ['Yoghurt', 'ub'], ['Chicken thigh', 'ub'], ['Prawns', 'ub'], ['Fish fillet', 'ub'], ['Tofu', 'ub'], ['Bread', 'bb'], ['Instant noodles', 'bb'], ['Canned chickpeas', 'bb'], ['Jasmine rice (uncooked)', 'bb'], ['Soy sauce', 'bb'], ['Eggs', 'bb']];

/* ---------- state ---------- */
const DN = () => (S.dn != null ? S.dn : S.day);
const fresh = () => ({bal:0, earned:0, day:-1, today:0, cards:{}, done:{}, best:{sort:0, label:0}, org:'wh', given:{wh:0, ffth:0}});
const seed7 = seed;
seed = function () { const s = seed7(); s.learn = fresh(); s.learn.bal = 35; s.learn.earned = 35; return s; };
if (S && !S.learn) { S.learn = fresh(); S.learn.bal = 35; S.learn.earned = 35; save(); }
const L = () => { if (!S.learn) S.learn = fresh(); if (S.learn.day !== DN()) { S.learn.day = DN(); S.learn.today = 0; } return S.learn; };
const org = () => ORGS.find(o => o.id === L().org) || ORGS[0];
const money2 = c => 'S$' + (c / 100).toFixed(2);
const unitPts = o => Math.round(o.cost * 100 / PT_CENTS);
const mealsGiven = () => Math.floor(L().given.wh / (ORGS[0].cost * 100) + 1e-9);
const fakeItem = n => { const c = info(n); return {id:n.length * 13, name:n, cat:c.cat, qty:Math.min(c.qty, 3), unit:c.unit, days:5, frozen:false, listed:false, prov:null, est:false}; };
const bigDraw = (n, h) => { const d = F.draw(fakeItem(n)); return '<svg viewBox="0 ' + (d.top - 2) + ' ' + d.w + ' ' + (66 - d.top + 2) + '" height="' + h + '" width="' + Math.round(d.w * h / (66 - d.top + 2)) + '" style="max-width:100%;filter:drop-shadow(0 4px 5px rgba(0,0,0,.18))" aria-hidden="true">' + d.body + '</svg>'; };

window.LP = {
  award: (key, pts) => {
    const l = L();
    if (l.done[key] === DN()) return 0;
    const room = Math.max(0, CAP - l.today), g = Math.min(pts, room);
    l.done[key] = DN();
    if (!g) { toast('Daily learning limit reached. Come back tomorrow for more points.'); return 0; }
    l.today += g; l.bal += g; l.earned += g; save();
    return g;
  },
  impactCard: () => { const l = L(); return '<button class="card col acc-p" style="gap:8px;text-align:left" data-a="openLearn"><div class="between"><h2 class="h2" style="font-size:14px">Learn & donate</h2><span class="pill p-pur">' + mealsGiven() + ' meals funded</span></div><div class="row" style="gap:12px">' + jar(Math.min(1, l.bal / unitPts(org())), 64) + '<span class="col" style="gap:2px"><b style="font-size:22px" data-count>' + money2(l.bal * PT_CENTS) + '</b><span class="sub">ready to give. Tap to play.</span></span></div></button>'; }
};
function jar(f, h) {
  const w = Math.round(h * .83);
  return '<span class="jar" style="width:' + w + 'px;height:' + h + 'px" aria-hidden="true"><i style="height:' + Math.round(Math.max(.04, f) * 82) + '%"></i></span>';
}

/* ---------- hub ---------- */
function hubHTML(back) {
  const l = L(), o = org(), up = unitPts(o), f = Math.min(1, l.bal / up), mastered = CARDS.filter(c => (l.cards[c[0]] || 0) >= 3).length;
  let h = back ? backBar('Learn & donate') : head('Learn & donate', 'Correct answers fund meals');
  h += '<div class="card col acc-g" style="gap:12px"><div class="row" style="gap:14px;align-items:center">' + jar(f, 116) + '<span class="col" style="gap:4px"><span class="sub" style="font-weight:800;color:#1F6B45">READY TO GIVE</span><b style="font-size:34px;line-height:1" data-count>' + money2(l.bal * PT_CENTS) + '</b><span style="font-size:14px;font-weight:600">' + (o.id === 'wh' ? (l.bal >= up ? 'Enough for ' + Math.floor(l.bal / up) + ' meal' + (l.bal >= up * 2 ? 's' : '') : (up - l.bal) + ' points to the next meal') : Math.round(f * 100) + '% of a food pack') + '</span><span class="sub">' + l.earned + ' points earned so far</span></span></div>';
  h += '<button class="btn pri full"' + (l.bal >= (o.id === 'wh' ? up : 60) ? '' : ' style="opacity:.55"') + ' data-a="lpGive">' + svg('heart', 18) + 'Give to ' + o.name + '</button></div>';
  h += '<div class="card col" style="gap:8px"><div class="between"><b>Today’s points</b><span class="sub">' + l.today + ' / ' + CAP + '</span></div><div class="bar" style="height:10px"><i style="width:' + Math.round(l.today / CAP * 100) + '%"></i></div><span class="sub">1 point = 1¢ from a sponsor. First right answers only.</span></div>';
  h += '<h2 class="h2">Play and learn</h2><div class="g2">' + [
    ['openFlash', 'book', 'Flashcards', mastered + ' of ' + CARDS.length + ' mastered', '#E9F2EC', '#1F6B45'],
    ['openSort', 'fridge', 'Fridge sort', 'Best: ' + l.best.sort + ' pts', '#E3EDF9', '#1D5FA8'],
    ['openLabel', 'receipt', 'Use by or best before?', 'Best: ' + l.best.label + ' pts', '#FCEDE4', '#C2410C'],
    ['openMyth', 'help', 'Myth or fact', '5 quick cards', '#F3EEF9', '#5B3B85']
  ].map(t => '<button class="card gtile" data-a="' + t[0] + '"><span class="fi" style="background:' + t[4] + ';color:' + t[5] + '">' + svg(t[1], 22) + '</span><b style="font-size:15px">' + t[2] + '</b><span class="sub">' + t[3] + '</span></button>').join('') + '</div>';
  h += '<h2 class="h2">Where your points go</h2>' + ORGS.map(x => '<button class="card org" data-a="lpOrg" data-v="' + x.id + '" aria-pressed="' + (l.org === x.id) + '">' + tog(l.org === x.id) + '<span class="col grow" style="gap:3px"><b style="font-size:15px">' + x.name + '</b><span class="sub">' + x.what + '</span><span class="row" style="gap:6px;flex-wrap:wrap"><span class="pill p-grn">S$' + x.cost.toFixed(2) + ' per ' + x.unit + '</span><span class="pill p-gry">' + x.stat + '</span></span>' + SRC(x.src) + '</span></button>').join('');
  h += '<div class="card col" style="gap:8px"><b>Your household’s giving</b><div class="ig ig3">' + IG.tile(String(mealsGiven()), 'meals at Willing Hearts', '#1F6B45') + IG.tile(money2(l.given.wh + l.given.ffth), 'given in total', '#5B3B85') + IG.tile(String(Math.round(l.given.ffth / 4000 * 100)) + '%', 'of a food pack', '#C2410C') + '</div></div>';
  h += '<p class="sub" style="margin:0">Demo: no real money moves. Charities shown as examples.</p>';
  return '<div class="col">' + h + '</div>';
}

/* ---------- flashcards ---------- */
function flashHTML() {
  const l = L(), Fc = U.fc;
  if (!Fc) return '';
  let h = backBar('Flashcards');
  if (Fc.i >= Fc.ids.length) {
    const right = Fc.log.filter(Boolean).length;
    return '<div class="scroll"><div class="col">' + h + '<div class="card col" style="gap:12px;align-items:center;text-align:center;padding:24px"><span class="fi" style="width:72px;height:72px;border-radius:36px;background:#1F6B45;color:#fff">' + svg('star', 36) + '</span><b style="font-size:26px">' + right + ' of ' + Fc.ids.length + ' right</b><div class="ig ig2" style="width:100%">' + IG.tile('+' + Fc.earned, 'points earned', '#1F6B45') + IG.tile(money2(Fc.earned * PT_CENTS), 'towards meals', '#5B3B85') + '</div><span class="sub">Missed cards come back sooner.</span></div><button class="btn pri full" data-a="openFlash">Another 6 cards</button><button class="btn ghost full" data-a="back">Back to Learn & donate</button></div></div>';
  }
  const c = CARDS.find(x => x[0] === Fc.ids[Fc.i]), box = l.cards[c[0]] || 0, a = Fc.ans;
  h += '<div class="dots">' + Fc.ids.map((_, i) => '<i class="' + (i <= Fc.i ? 'on' : '') + '"></i>').join('') + '</div>';
  h += '<div class="row" style="gap:6px"><span class="pill p-grn">' + c[1] + '</span><span class="pill p-gry">Box ' + (box + 1) + ' of 4</span><span class="grow"></span><span class="sub">' + (Fc.i + 1) + ' / ' + Fc.ids.length + '</span></div>';
  const ok = a !== null && a === c[4];
  h += '<div class="fc' + (a !== null ? ' flipped' : '') + '"><div class="fc-in">';
  h += '<div class="fc-face"><span class="sub" style="font-weight:800;color:#1F6B45">QUESTION</span><b style="font-size:21px;line-height:1.3">' + c[2] + '</b><div class="col" style="gap:8px;margin-top:auto">' + c[3].map((o, i) => '<button class="opt" data-a="fcAns" data-v="' + i + '"><span class="fi" style="width:28px;height:28px;background:#fff;font-weight:800;color:#1F6B45">' + 'ABC'[i] + '</span>' + o + '</button>').join('') + '</div></div>';
  h += '<div class="fc-face fc-back ' + (ok ? 'ok' : 'no') + '"><span class="row" style="gap:8px;font-weight:800;font-size:18px;color:' + (ok ? '#1F6B45' : '#B13C0B') + '"><span class="fi" style="width:36px;height:36px;background:' + (ok ? '#1F6B45' : '#B13C0B') + ';color:#fff">' + svg(ok ? 'check' : 'close', 20, 2.6) + '</span>' + (ok ? 'Correct' + (Fc.last ? ' · +' + Fc.last + ' points' : '') : 'Not quite') + '</span><span class="sub" style="font-weight:800">ANSWER</span><b style="font-size:24px;line-height:1.25">' + c[3][c[4]] + '</b><span style="font-size:15px;line-height:1.45">' + c[5] + '</span><span style="margin-top:auto">' + SRC(c[6]) + '</span></div>';
  h += '</div></div>';
  if (a !== null) h += '<button class="btn pri full" data-a="fcNext">' + (Fc.i === Fc.ids.length - 1 ? 'See my score' : 'Next card') + '</button>';
  else h += '<p class="sub" style="text-align:center;margin:0">Tap an answer to flip.</p>';
  return '<div class="scroll"><div class="col">' + h + '</div></div>';
}

/* ---------- fridge sort ---------- */
function sortHTML() {
  const G = U.gs; if (!G) return '';
  let h = backBar('Fridge sort');
  if (G.state === 'end') return endHTML(h, G, 'sort', 'Fridge sort');
  const it = G.items[G.i], fb = G.fb;
  h += '<div class="between"><span class="combo">' + svg('flame', 18) + '×' + mult(G) + ' combo</span><b style="font-size:18px" id="gscore">' + G.score + ' pts</b></div><div class="tbar"><i id="gtimer" style="width:' + Math.round(G.left / G.total * 100) + '%"></i></div>';
  h += '<div class="gstage">' + (fb && fb.ok ? '<span class="pts">+' + fb.pts + '</span>' : '') + bigDraw(it[0], 110) + '<b style="font-size:20px">' + esc(it[0].replace('Leftover: ', 'Leftover ')) + '</b><span class="sub">' + (fb ? (fb.ok ? 'Right! ' : 'It goes in the ' + ZB.find(z => z[0] === it[1][0])[1].toLowerCase() + '. ') + F.ZONES[it[1][0]][1].split(': ').slice(1).join(': ') : 'Where does it belong?') + '</span></div>';
  h += '<div class="zgrid">' + ZB.map(z => { const c = F.ZCOL[z[0]], cls = fb ? (it[1].indexOf(z[0]) >= 0 ? ' ok' : fb.pick === z[0] ? ' no' : '') : ''; return '<button class="zbtn' + cls + '" style="background:' + c + '26;border-color:' + c + '" data-a="gsAns" data-v="' + z[0] + '"' + (fb ? ' disabled' : '') + '><i class="zdot" style="background:' + c + '"></i>' + z[1] + '</button>'; }).join('') + '</div>';
  h += '<p class="sub" style="margin:0;text-align:center">' + (G.i + 1) + ' of ' + G.items.length + ' · 3 in a row = double points</p>' + SRC('Fridge zones: NHS food storage advice; Linköping University fridge study');
  return '<div class="scroll"><div class="col">' + h + '</div></div>';
}
/* ---------- label sort ---------- */
function labelHTML() {
  const G = U.gl; if (!G) return '';
  let h = backBar('Use by or best before?');
  if (G.state === 'end') return endHTML(h, G, 'label', 'Use by or best before?');
  const it = G.items[G.i], fb = G.fb, isUB = it[1] === 'ub';
  h += '<div class="between"><span class="combo">' + svg('flame', 18) + '×' + mult(G) + ' combo</span><b style="font-size:18px">' + G.score + ' pts</b></div><div class="dots">' + G.items.map((_, i) => '<i class="' + (i <= G.i ? 'on' : '') + '"></i>').join('') + '</div>';
  h += '<div class="gstage">' + (fb && fb.ok ? '<span class="pts">+' + fb.pts + '</span>' : '') + bigDraw(it[0], 110) + '<b style="font-size:20px">' + esc(it[0].replace(' (uncooked)', '')) + '</b><span class="sub" style="text-align:center">' + (fb ? (fb.ok ? 'Right! ' : 'It’s ' + (isUB ? 'use by' : 'best before') + '. ') + (isUB ? 'Perishable: a safety date. Don’t eat it after.' : 'Longer-lasting: a quality date. Look, smell and taste.') : 'Which date does it carry?') + '</span></div>';
  h += '<div class="g2"><button class="btn' + (fb ? (isUB ? ' pri' : fb.pick === 'ub' ? '' : ' ghost') : '') + '" style="min-height:72px;flex-direction:column;gap:2px;' + (fb ? '' : 'background:#FDE7DC;color:#B13C0B') + (fb && fb.pick === 'ub' && !isUB ? ';background:#B13C0B;color:#fff' : '') + '" data-a="glAns" data-v="ub"' + (fb ? ' disabled' : '') + '><span style="font-size:17px">Use by</span><span style="font-size:13px;font-weight:600">Safety</span></button><button class="btn' + (fb ? (!isUB ? ' pri' : fb.pick === 'bb' ? '' : ' ghost') : '') + '" style="min-height:72px;flex-direction:column;gap:2px;' + (fb ? '' : 'background:#E9F2EC;color:#1F6B45') + (fb && fb.pick === 'bb' && isUB ? ';background:#B13C0B;color:#fff' : '') + '" data-a="glAns" data-v="bb"' + (fb ? ' disabled' : '') + '><span style="font-size:17px">Best before</span><span style="font-size:13px;font-weight:600">Quality</span></button></div>';
  h += SRC(SRC_SFA + '. Typical labels; always check the pack.');
  return '<div class="scroll"><div class="col">' + h + '</div></div>';
}
function endHTML(h, G, key, title) {
  const l = L(), best = l.best[key], right = G.log.filter(Boolean).length;
  return '<div class="scroll"><div class="col">' + h + '<div class="card col" style="gap:12px;align-items:center;text-align:center;padding:24px"><span class="fi" style="width:72px;height:72px;border-radius:36px;background:#1F6B45;color:#fff">' + svg('star', 36) + '</span><b style="font-size:26px">' + G.score + ' points</b><span class="sub">' + right + ' of ' + G.items.length + ' right' + (G.score >= best && G.score > 0 ? ' · new best!' : '') + '</span><div class="ig ig2" style="width:100%">' + IG.tile('+' + G.earned, 'points kept today', '#1F6B45') + IG.tile(money2(G.earned * PT_CENTS), 'towards meals', '#5B3B85') + '</div><span class="sub">Points once per item per day.</span></div><button class="btn pri full" data-a="' + (key === 'sort' ? 'openSort' : 'openLabel') + '">Play again</button><button class="btn ghost full" data-a="back">Back to Learn & donate</button></div></div>';
}
const mult = G => G.combo >= 3 ? 2 : 1;
const shuffle = (a, seed) => { const r = a.slice(); let s = seed; for (let i = r.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

/* ---------- timer ---------- */
function startTimer() {
  clearInterval(U.gsT);
  U.gsT = setInterval(() => {
    const G = U.gs; if (!G || G.state !== 'play') { clearInterval(U.gsT); return; }
    G.left = Math.max(0, G.left - 1);
    const el = document.getElementById('gtimer'); if (el) el.style.width = Math.round(G.left / G.total * 100) + '%';
    if (!G.left) { finish(G, 'sort'); paint(); }
  }, 1000);
}
function finish(G, key) { G.state = 'end'; clearInterval(U.gsT); const l = L(); if (G.score > l.best[key]) l.best[key] = G.score; save(); if (G.earned) confetti(); }

/* ---------- wiring ---------- */
const push7 = pushHTML;
pushHTML = function (p) { return p.t === 'learn' ? '<div class="scroll"><div class="col">' + hubHTML(true) + '</div></div>' : p.t === 'flash' ? flashHTML() : p.t === 'gsort' ? sortHTML() : p.t === 'glabel' ? labelHTML() : push7(p); };
const screen7 = screenHTML;
screenHTML = function (t) { return t === 'tlearn' ? hubHTML(false) : screen7(t); };
const back7 = A.back;
Object.assign(A, {
  openLearn: () => { U.sheet = null; U.stack.push({t:'learn'}); paint(); },
  lpOrg: v => { L().org = v; save(); paint(); },
  lpGive: () => {
    const l = L(), o = org(), min = o.id === 'wh' ? unitPts(o) : 60;
    if (l.bal < min) { toast('Answer a few more questions first: ' + (min - l.bal) + ' points to go.'); return; }
    const cents = l.bal * PT_CENTS; l.given[o.id] += cents; l.bal = 0; save(); paint(); confetti();
    toast(o.id === 'wh' ? 'Thank you! ' + money2(cents) + ' to Willing Hearts: about ' + Math.floor(cents / 60) + ' meal' + (cents >= 120 ? 's' : '') + ' (demo).' : 'Thank you! ' + money2(cents) + ' towards a Food from the Heart pack (demo).');
  },
  openFlash: () => {
    const l = L(), ids = CARDS.map(c => c[0]).sort((a, b) => ((l.cards[a] || 0) - (l.cards[b] || 0)) || ((l.done['fc:' + a] === DN()) - (l.done['fc:' + b] === DN()))).slice(0, 6);
    U.fc = {ids:shuffle(ids, DN() * 7 + l.earned + 1), i:0, ans:null, log:[], earned:0, last:0};
    if (U.stack.length && U.stack[U.stack.length - 1].t === 'flash') paint(); else { U.sheet = null; U.stack.push({t:'flash'}); paint(); }
  },
  fcAns: v => {
    const Fc = U.fc; if (Fc.ans !== null) return; const c = CARDS.find(x => x[0] === Fc.ids[Fc.i]), l = L(), ok = +v === c[4];
    Fc.ans = +v; Fc.log.push(ok);
    l.cards[c[0]] = ok ? Math.min(3, (l.cards[c[0]] || 0) + 1) : 0;
    Fc.last = ok ? LP.award('fc:' + c[0], 10) : 0; Fc.earned += Fc.last; save(); paint();
  },
  fcNext: () => { U.fc.i++; U.fc.ans = null; U.fc.last = 0; if (U.fc.i >= U.fc.ids.length && U.fc.earned) confetti(); paint(); },
  openSort: () => {
    const items = shuffle(SORT, DN() * 13 + L().earned + 3).slice(0, 8);
    U.gs = {items:items, i:0, score:0, combo:0, left:45, total:45, state:'play', fb:null, log:[], earned:0};
    if (!(U.stack.length && U.stack[U.stack.length - 1].t === 'gsort')) { U.sheet = null; U.stack.push({t:'gsort'}); }
    paint(); startTimer();
  },
  gsAns: z => {
    const G = U.gs; if (!G || G.fb || G.state !== 'play') return; const it = G.items[G.i], ok = it[1].indexOf(z) >= 0;
    let pts = 0;
    if (ok) { G.combo++; pts = 5 * mult(G); G.score += pts; G.earned += LP.award('fs:' + it[0], pts); } else G.combo = 0;
    G.log.push(ok); G.fb = {ok:ok, pick:z, pts:pts}; paint();
    setTimeout(() => { if (U.gs !== G || G.state !== 'play') return; G.i++; G.fb = null; if (G.i >= G.items.length) finish(G, 'sort'); paint(); }, ok ? 800 : 1700);
  },
  openLabel: () => {
    const items = shuffle(LABELS, DN() * 17 + L().earned + 5).slice(0, 8);
    U.gl = {items:items, i:0, score:0, combo:0, state:'play', fb:null, log:[], earned:0};
    if (!(U.stack.length && U.stack[U.stack.length - 1].t === 'glabel')) { U.sheet = null; U.stack.push({t:'glabel'}); }
    paint();
  },
  glAns: v => {
    const G = U.gl; if (!G || G.fb) return; const it = G.items[G.i], ok = it[1] === v;
    let pts = 0;
    if (ok) { G.combo++; pts = 5 * mult(G); G.score += pts; G.earned += LP.award('lb:' + it[0], pts); } else G.combo = 0;
    G.log.push(ok); G.fb = {ok:ok, pick:v, pts:pts}; paint();
    setTimeout(() => { if (U.gl !== G) return; G.i++; G.fb = null; if (G.i >= G.items.length) finish(G, 'label'); paint(); }, ok ? 800 : 1700);
  },
  back: () => { if (U.stack.length && U.stack[U.stack.length - 1].t === 'gsort') clearInterval(U.gsT); back7(); }
});
const myth7 = A.openMyth;
A.openMyth = () => { if (U.stack.length && U.stack[U.stack.length - 1].t === 'learn') { U.mf = {i:0, ans:null, score:0}; U.sheet = 'myth'; paint(); return; } myth7(); };

/* small motion for answers */
const paint8 = paint;
paint = function () {
  paint8();
  const st = document.querySelector('#app .gstage');
  if (st) {
    const G = U.gs && U.stack.length && U.stack[U.stack.length - 1].t === 'gsort' ? U.gs : U.gl, k = G ? G.i + ':' + (G.fb ? (G.fb.ok ? 'ok' : 'no') : 'q') : '';
    if (k && k !== paint8.k) {
      paint8.k = k;
      if (G.fb && G.fb.ok) st.animate([{transform:'scale(1)'}, {transform:'scale(1.04)'}, {transform:'scale(1)'}], {duration:380});
      else if (G.fb) st.animate([{transform:'translateX(0)'}, {transform:'translateX(-10px)'}, {transform:'translateX(10px)'}, {transform:'translateX(-6px)'}, {transform:'translateX(0)'}], {duration:420});
      else { const sv = st.querySelector('svg'); if (sv) sv.animate([{transform:'translateY(-30px) scale(.6)', opacity:0}, {transform:'none', opacity:1}], {duration:420, easing:'cubic-bezier(.2,1.4,.4,1)'}); }
    }
  }
};

/* Today entry */
const today7 = todayHTML;
todayHTML = function () {
  const html = today7(), l = L(), k = html.indexOf('<button class="more-btn"');
  const card = '<button class="card row acc-p" style="text-align:left;gap:12px" data-a="openLearn">' + jar(Math.min(1, l.bal / unitPts(org())), 52) + '<span class="grow"><b style="display:block;font-size:15px">Learn & donate</b><span class="sub">' + (l.today < CAP ? '2-minute games. Right answers fund meals.' : 'Done for today. Thank you!') + '</span></span><span class="col" style="align-items:flex-end;gap:2px"><b style="font-size:17px" data-count>' + money2(l.bal * PT_CENTS) + '</b><span class="sub">' + mealsGiven() + ' meals given</span></span></button>';
  return k >= 0 ? html.slice(0, k) + card + html.slice(k) : html;
};

/* guide */
document.querySelector('.guide').addEventListener('click', e => {
  const b = e.target.closest('[data-j]'); if (!b || b.dataset.j !== 'learn') return;
  S.mode = 'standard'; S.role = 'owner'; S.tab = 'today'; U.sheet = null; U.stack = [{t:'learn'}]; save(); paint();
});
if (S) paint();
})();
