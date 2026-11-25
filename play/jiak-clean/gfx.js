/* Jiak Clean v11: pictures instead of paragraphs
   ingredient-to-dish strip, ingredient board, recipe dials, receipt flow, sharing pictograms, pickup scene, sense drawings */
(function () {
document.head.insertAdjacentHTML('beforeend', '<style>' +
'.ps .rstrip{display:flex;align-items:center;gap:8px}' +
'.ps .rstrip .ing{display:flex;align-items:flex-start;gap:4px;flex:1;min-width:0}' +
'.ps .rstrip .ig1{display:flex;flex-direction:column;align-items:center;gap:2px;width:54px;position:relative}' +
'.ps .rstrip .ig1 em{font-style:normal;font-size:12px;font-weight:700;color:#4F5851;max-width:54px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
'.ps .rstrip .ig1 u{position:absolute;top:-3px;right:1px;width:16px;height:16px;border-radius:8px;background:#C2410C;border:2px solid #fff;display:grid;place-items:center;color:#fff;text-decoration:none}' +
'.ps .rstrip .pl{font-weight:800;color:#9AA59E;margin-top:12px}' +
'.ps .rstrip .dsh{position:relative;flex:none;width:112px;height:84px;border-radius:16px;overflow:hidden;line-height:0;box-shadow:0 3px 10px rgba(0,0,0,.14)}' +
'.ps .rstrip .dsh i{position:absolute;left:6px;bottom:6px;display:flex;align-items:center;gap:3px;font-style:normal;font-size:12px;font-weight:800;line-height:1;color:#18201A;background:rgba(255,255,255,.94);border-radius:999px;padding:4px 7px}' +
'.ps .board{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}' +
'.ps .board .bt{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 2px 6px;border-radius:14px;background:#fff;border:1.5px solid #CFE0D4;font-size:12px;font-weight:700;color:#18201A;text-align:center;line-height:1.15;min-width:0}' +
'.ps .board .bt span{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 2px}' +
'.ps .board .bt.due{border-color:#C2410C;background:#FFF6F1}' +
'.ps .board .bt.miss{border-style:dashed;border-color:#B9C2BB;background:transparent;color:#5B645D}.ps .board .bt .dr{display:grid;place-items:end center;height:44px;max-width:90%}.ps .board .bt.miss .dr{opacity:.4;filter:grayscale(1)}' +
'.ps .board .bt u{position:absolute;top:-5px;right:-3px;width:20px;height:20px;border-radius:10px;border:2px solid #F1F7F2;display:grid;place-items:center;color:#fff;text-decoration:none;background:#1F6B45}' +
'.ps .board .bt.due u{background:#C2410C}.ps .board .bt.miss u{background:#7B857E}' +
'.ps .legend{display:flex;gap:12px;flex-wrap:wrap;font-size:12px;color:#4F5851;font-weight:600}' +
'.ps .legend i{display:inline-block;width:10px;height:10px;border-radius:5px;margin-right:4px;vertical-align:-1px}' +
'.ps .dials{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}' +
'.ps .dials div{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;padding:8px 4px;border-radius:14px;background:#fff;border:1px solid #DCE6DE;font-size:12px;font-weight:700;color:#4F5851;min-height:86px;text-align:center}' +
'.ps .etq{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}' +
'.ps .etq div{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 4px 8px;border-radius:14px;background:#F1F7F2;font-size:12px;font-weight:800;color:#174F33;text-align:center;line-height:1.15}' +
'.ps .etq div.no{background:#FDEEE7;color:#8A2E08}' +
'.ps .etq u{position:absolute;top:-5px;right:-3px;width:22px;height:22px;border-radius:11px;border:2px solid #fff;display:grid;place-items:center;color:#fff;text-decoration:none;background:#1F9D55}.ps .etq .no u{background:#C2410C}' +
'.ps .chain{display:grid;grid-template-columns:1fr 18px 1fr 18px 1fr;align-items:stretch;gap:2px}' +
'.ps .chain .ct{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;padding:10px 4px 8px;border-radius:14px;font-size:12px;font-weight:800;text-align:center;line-height:1.15;min-height:96px}' +
'.ps .chain .ct small{font-size:12px;font-weight:600;opacity:.8}' +
'.ps .chain .ar{display:grid;place-items:center;color:#9AA59E}' +
'.ps .gcap{display:grid;grid-template-columns:repeat(3,1fr);font-size:12px;font-weight:700;color:#3D4A43;text-align:center;margin-top:-4px}' +
'</style>');

const safeIco = (n, s) => { try { return ico(n, s); } catch (e) { return '<span class="fi" style="width:' + s + 'px;height:' + s + 'px;background:#EEF1EC;color:#5B645D">' + svg('box', s / 2) + '</span>'; } };
const sIco = (it, s) => { try { return icoI(it, s); } catch (e) { return safeIco(it.name, s); } };
const fake = n => { const c = info(n); return {id:-1, name:n, cat:c.cat, loc:c.loc, days:c.days, qty:c.qty || 1, unit:c.unit, frozen:false, listed:false}; };
function draw(x, h) {
  try {
    const it = typeof x === 'string' ? fake(x) : x, d = window.psFz.draw(it), vh = 66 - d.top + 2;
    return '<svg viewBox="0 ' + (d.top - 2) + ' ' + d.w + ' ' + vh + '" height="' + h + '" width="' + Math.round(d.w * h / vh) + '" style="max-width:100%;filter:drop-shadow(0 2px 2px rgba(0,0,0,.14))" aria-hidden="true">' + d.body + '</svg>';
  } catch (e) { return typeof x === 'string' ? safeIco(x, h) : sIco(x, h); }
}
const short = n => n.replace('Leftover: ', '').replace('Cooked ', '').replace('Chicken thigh', 'Chicken');
const X = '<svg width="11" height="11" viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';

/* ingredients -> dish */
function strip(its, rid) {
  const r = R(rid);
  return '<div class="rstrip" role="img" aria-label="' + esc(its.map(i => i.name).join(' plus ')) + ' become ' + esc(r.name) + ' in ' + r.time + ' minutes"><span class="ing">' + its.slice(0, 3).map(i => '<span class="ig1">' + sIco(i, 46) + (urgent(i) ? '<u>' + svg('flame', 9, 2.6) + '</u>' : '') + '<em>' + esc(short(i.name)) + '</em></span>').join('<b class="pl">+</b>') + '</span><svg width="26" height="20" viewBox="0 0 26 20" aria-hidden="true"><path d="M2 10h19M15 4l7 6-7 6" fill="none" stroke="#1F6B45" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="dsh">' + recipeArt(r, 84) + '<i>' + svg('clock', 12, 2.4) + r.time + ' min</i></span></div>';
}

/* ingredient board */
function board(rows) {
  const need = rows.filter(g => !g.opt);
  return '<div class="board">' + need.map(g => {
    const cls = !g.have ? 'miss' : g.u ? 'due' : 'have', nm = g.n || g.label;
    return '<div class="bt ' + cls + '" aria-label="' + esc(nm) + ': ' + (cls === 'miss' ? 'missing' : cls === 'due' ? 'you have it, due soon' : 'you have it') + '">' + '<span class="dr">' + (g.it && g.have ? draw(g.it, 42) : draw(nm, 42)) + '</span>' + '<u>' + (cls === 'miss' ? svg('plus', 11, 3) : cls === 'due' ? svg('flame', 11, 2.6) : svg('check', 11, 3.2)) + '</u><span>' + esc(short(nm)) + '</span></div>';
  }).join('') + '</div><div class="legend"><span><i style="background:#1F6B45"></i>Have</span><span><i style="background:#C2410C"></i>Due soon, gets saved</span><span><i style="background:#7B857E"></i>Missing</span></div>';
}

/* time dial, people, leftover tubs */
function dials(time, sv, extra) {
  const c = 2 * Math.PI * 20, f = Math.min(1, time / 60);
  const dial = '<svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="20" fill="#fff" stroke="#E3E6DE" stroke-width="6"/><circle cx="26" cy="26" r="20" fill="none" stroke="#1F6B45" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + (c * f).toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 26 26)"/><text x="26" y="31" text-anchor="middle" font-size="15" font-weight="800" fill="#18201A">' + time + '</text></svg>';
  const person = (x, col) => '<circle cx="' + (x + 8) + '" cy="9" r="6" fill="' + col + '"/><path d="M' + x + ' 34v-8a8 8 0 0 1 16 0v8z" fill="' + col + '"/>';
  const cols = ['#1F6B45', '#C2410C', '#1D5FA8', '#8A5700', '#5B3B85', '#2F9E62'], n = Math.min(6, sv);
  const ppl = '<svg width="' + (n * 13 + 6) + '" height="36" viewBox="0 0 ' + (n * 13 + 6) + ' 36" aria-hidden="true">' + Array.from({length:n}, (_, i) => person(1 + i * 13, cols[i])).join('') + '</svg>';
  const tub = (x, on) => '<g transform="translate(' + x + ' 0)" opacity="' + (on ? 1 : .35) + '"><path d="M2 12h22l-2 16a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" fill="' + (on ? '#F2B632' : '#D5DAD4') + '"/><rect x="0" y="7" width="26" height="6" rx="3" fill="' + (on ? '#1D5FA8' : '#B9C2BB') + '"/><rect x="8" y="17" width="10" height="6" rx="1.5" fill="#fff" opacity=".85"/></g>';
  const k = Math.min(3, Math.max(1, extra));
  const tubs = '<svg width="' + (k * 30) + '" height="34" viewBox="0 0 ' + (k * 30) + ' 34" aria-hidden="true">' + Array.from({length:k}, (_, i) => tub(2 + i * 30, extra > 0)).join('') + '</svg>';
  return '<div class="dials"><div aria-label="' + time + ' minutes">' + dial + 'minutes</div><div aria-label="For ' + sv + '">' + ppl + 'for ' + sv + '</div><div aria-label="' + (extra ? extra + ' extra portions for tomorrow' : 'No leftovers') + '">' + tubs + (extra ? extra + ' for tomorrow' : 'no leftovers') + '</div></div>';
}

/* receipt -> sure / ask -> fridge */
function flow(sure, ask) {
  return '<svg viewBox="0 0 320 104" width="100%" role="img" aria-label="' + sure + ' receipt lines go straight into your kitchen. ' + ask + ' need one tap from you first." style="display:block">' +
    '<path d="M10 8h54v84l-6.75-5-6.75 5-6.75-5-6.75 5-6.75-5-6.75 5-6.75-5-6.75 5z" fill="#fff" stroke="#C9D2CD" stroke-width="1.5"/><rect x="18" y="18" width="30" height="5" rx="2.5" fill="#18201A"/>' + [32, 43, 54, 65].map((y, i) => '<rect x="18" y="' + y + '" width="' + (26 + (i % 2) * 8) + '" height="4" rx="2" fill="' + (i < 2 ? '#9FD4B2' : '#F0D58A') + '"/><rect x="50" y="' + y + '" width="8" height="4" rx="2" fill="#C9D2CD"/>').join('') +
    '<path d="M72 36C92 36 92 26 110 26" fill="none" stroke="#1F6B45" stroke-width="2.4" stroke-linecap="round"/><path d="M72 62C92 62 92 78 110 78" fill="none" stroke="#D9A321" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 6"/>' +
    '<rect x="112" y="10" width="118" height="34" rx="17" fill="#E9F2EC"/><circle cx="130" cy="27" r="10" fill="#1F6B45"/><path d="M125 27l3.5 3.5 6.5-7" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><text x="146" y="31.5" font-size="13" font-weight="800" fill="#174F33">' + sure + ' straight in</text>' +
    '<rect x="112" y="60" width="118" height="34" rx="17" fill="#FBF0D0"/><circle cx="130" cy="77" r="10" fill="#D9A321"/><text x="130" y="82" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">?</text><text x="146" y="81.5" font-size="13" font-weight="800" fill="#7A4D00">' + ask + ' need a tap</text>' +
    '<path d="M234 27C252 27 250 46 264 48" fill="none" stroke="#1F6B45" stroke-width="2.4" stroke-linecap="round"/><path d="M234 77C252 77 250 60 264 58" fill="none" stroke="#D9A321" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 6"/>' +
    '<rect x="268" y="8" width="44" height="88" rx="8" fill="#EEF3F6" stroke="#9FB2BD" stroke-width="1.5"/><path d="M268 36h44" stroke="#9FB2BD" stroke-width="1.5"/><rect x="274" y="17" width="4" height="12" rx="2" fill="#7E95A3"/><rect x="274" y="44" width="4" height="20" rx="2" fill="#7E95A3"/><circle cx="296" cy="58" r="6" fill="#E04B35"/><path d="M296 52q1-3 4-3" fill="none" stroke="#2F9E62" stroke-width="2" stroke-linecap="round"/><rect x="286" y="72" width="18" height="14" rx="3" fill="#F2B632"/><path d="M290 22l6 6M296 22l-6 6M293 20.500v9M288.500 25h9" stroke="#7EC3EA" stroke-width="1.4" stroke-linecap="round"/></svg>';
}

/* sharing do / don't pictograms */
function etiq() {
  const bag = '<svg width="44" height="44" viewBox="0 0 44 44"><path d="M9 12h26l-2 26a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3z" fill="#F2B632"/><rect x="7" y="6" width="30" height="8" rx="3" fill="#C98A12"/><path d="M11 10h22" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 2"/><rect x="15" y="20" width="14" height="12" rx="2" fill="#fff" opacity=".9"/><path d="M18 26h8M18 29h5" stroke="#C98A12" stroke-width="1.6" stroke-linecap="round"/></svg>';
  const cal = '<svg width="44" height="44" viewBox="0 0 44 44"><rect x="6" y="8" width="32" height="30" rx="5" fill="#fff" stroke="#9FB2BD" stroke-width="1.5"/><path d="M6 13a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v5H6z" fill="#1D5FA8"/><rect x="13" y="4" width="3.500" height="8" rx="1.750" fill="#18201A"/><rect x="27.500" y="4" width="3.500" height="8" rx="1.750" fill="#18201A"/><path d="M15 28l5 5 9-10" fill="none" stroke="#1F9D55" stroke-width="3.200" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const pot = '<svg width="44" height="44" viewBox="0 0 44 44"><path d="M15 12q-3-3 0-6M22 12q-3-3 0-6M29 12q-3-3 0-6" fill="none" stroke="#B9836A" stroke-width="1.8" stroke-linecap="round"/><path d="M6 20h32a16 16 0 0 1-32 0z" fill="#E7C6B6"/><ellipse cx="22" cy="20" rx="16" ry="4" fill="#C2410C"/><ellipse cx="22" cy="20" rx="12" ry="2.500" fill="#E8833A"/><rect x="15" y="35" width="14" height="4" rx="2" fill="#C9A493"/></svg>';
  const home = '<svg width="44" height="44" viewBox="0 0 44 44"><path d="M5 22L22 7l17 15" fill="none" stroke="#8A2E08" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 21v16h24V21L22 10.500z" fill="#F4D3C4"/><rect x="18.500" y="26" width="7" height="11" rx="1.500" fill="#8A2E08"/><rect x="27.500" y="23.500" width="4.500" height="4.500" fill="#fff"/></svg>';
  const T = [[bag, 'Sealed packs', 1], [cal, 'In date', 1], [safeIco('Apples', 44), 'Whole produce', 1], [pot, 'Home-cooked', 0], [home, 'Your address', 0], ['<svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="15" fill="#fff" stroke="#9FB2BD" stroke-width="1.5"/><path d="M22 12v10l7 5" fill="none" stroke="#1D5FA8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>', 'Clear pickup time', 1]];
  return '<div class="etq" style="padding-top:6px">' + T.map(t => '<div class="' + (t[2] ? '' : 'no') + '" aria-label="' + t[1] + (t[2] ? ': OK' : ': not allowed') + '">' + t[0] + '<u>' + (t[2] ? svg('check', 12, 3.2) : X) + '</u>' + t[1] + '</div>').join('') + '</div>';
}

/* pickup scene: you -> locker -> neighbour */
function scene() {
  const person = (x, col, bag) => '<circle cx="' + x + '" cy="52" r="9" fill="#F1C9A5"/><path d="M' + (x - 9) + ' 49a9 9 0 0 1 18 0q-9-5-18 0z" fill="#3D3520"/><path d="M' + (x - 13) + ' 98V76a13 13 0 0 1 26 0v22z" fill="' + col + '"/>' + (bag ? '<path d="M' + (x + 12) + ' 78h14l-1.500 16h-11z" fill="#F2B632"/><path d="M' + (x + 15) + ' 78q4-8 8 0" fill="none" stroke="#C98A12" stroke-width="1.8"/>' : '');
  return '<svg viewBox="0 0 320 108" width="100%" role="img" aria-label="You drop food at a pickup locker and a verified neighbour collects it. Your home address is never shared." style="display:block">' +
    '<rect x="0" y="98" width="320" height="6" rx="3" fill="#DCE6DE"/>' +
    '<rect x="112" y="6" width="96" height="14" rx="3" fill="#C9D2CD"/><rect x="118" y="20" width="6" height="78" fill="#DCE1D8"/><rect x="196" y="20" width="6" height="78" fill="#DCE1D8"/>' +
    '<rect x="130" y="30" width="60" height="68" rx="5" fill="#2E6C8E"/>' + [0, 1, 2].map(r => [0, 1].map(c => { const open = r === 1 && c === 0, x = 134 + c * 27, y = 34 + r * 21; return '<rect x="' + x + '" y="' + y + '" width="25" height="19" rx="2.500" fill="' + (open ? '#12384D' : '#4E90B5') + '"/>' + (open ? '<path d="M' + (x + 6) + ' ' + (y + 6) + 'h13l-1.500 11h-10z" fill="#F2B632"/>' : '<circle cx="' + (x + 20) + '" cy="' + (y + 9.500) + '" r="1.800" fill="#D7EAF4"/>'); }).join('')).join('') +
    person(40, '#1F6B45', true) + person(280, '#C2410C', false) +
    '<path d="M74 70h44" fill="none" stroke="#1F6B45" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 7"/><path d="M112 64l7 6-7 6" fill="none" stroke="#1F6B45" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M204 70h44" fill="none" stroke="#C2410C" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1 7"/><path d="M242 64l7 6-7 6" fill="none" stroke="#C2410C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<g transform="translate(228 4)"><path d="M3 16L16 5l13 11" fill="none" stroke="#7B857E" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 15v12h18V15L16 7.500z" fill="#E3E6DE"/><circle cx="16" cy="17" r="16" fill="none" stroke="#C2410C" stroke-width="2.600"/><path d="M5 6l22 22" stroke="#C2410C" stroke-width="2.600"/></g></svg>' +
    '<div class="gcap"><span>You drop off</span><span>Pickup locker</span><span>Neighbour collects</span></div>';
}

/* look / smell / taste drawings */
function sense(i) {
  const art = [
    '<path d="M14 40Q60 2 106 40Q60 78 14 40z" fill="#fff" stroke="#3D3520" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="40" r="19" fill="#7A4B21"/><circle cx="60" cy="40" r="19" fill="none" stroke="#5A3413" stroke-width="2"/><circle cx="60" cy="40" r="9" fill="#18201A"/><circle cx="66" cy="33" r="4.500" fill="#fff"/><path d="M26 22l-5-8M42 13l-3-9M60 10V0M78 13l3-9M94 22l5-8" stroke="#3D3520" stroke-width="3" stroke-linecap="round"/>',
    '<path d="M50 6C48 30 30 44 28 56c-1 9 9 13 18 12 4 6 16 6 20 0 9 1 17-5 14-14C76 44 66 30 66 6" fill="#F1C9A5" stroke="#B9836A" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="44" cy="60" rx="5" ry="3" fill="#8A5A44"/><ellipse cx="66" cy="60" rx="5" ry="3" fill="#8A5A44"/><path d="M92 30q8 6 0 12t0 12M104 24q10 9 0 18t0 18" fill="none" stroke="#2F9E62" stroke-width="3" stroke-linecap="round"/>',
    '<path d="M18 30Q40 12 60 22Q80 12 102 30Q84 62 60 62Q36 62 18 30z" fill="#D9534F" stroke="#9E2F2B" stroke-width="3" stroke-linejoin="round"/><path d="M26 31Q60 40 94 31Q80 50 60 50Q40 50 26 31z" fill="#5A1F1C"/><path d="M46 44q14-8 28 0v18a14 14 0 0 1-28 0z" fill="#F08A93" stroke="#C25964" stroke-width="2.500"/><path d="M60 46v18" stroke="#C25964" stroke-width="2" stroke-linecap="round"/><path d="M34 31.500h52" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9"/>'
  ][i] || '';
  return '<svg width="132" height="88" viewBox="0 0 120 80" aria-hidden="true">' + art + '</svg>';
}

/* waste profile: what -> why -> fix */
const CATFOOD = {greens:'Kai lan', veg:'Tomatoes', fruit:'Bananas', protein:'Chicken thigh', dairy:'Milk', egg:'Eggs', bread:'Bread', grain:'Cooked rice', rice:'Cooked rice', meal:'Cooked rice', left:'Cooked rice'};
const WHY = {
  off:['Went off', '<svg width="48" height="48" viewBox="0 0 48 48"><path d="M14 12q-3-4 0-8M24 12q-3-4 0-8M34 12q-3-4 0-8" fill="none" stroke="#8A9A3B" stroke-width="2.4" stroke-linecap="round"/><path d="M24 18c10 0 16 6 16 14s-7 12-16 12S8 40 8 32s6-14 16-14z" fill="#B58A4C"/><circle cx="18" cy="30" r="3" fill="#6E8B3D"/><circle cx="29" cy="36" r="4" fill="#6E8B3D"/><circle cx="31" cy="26" r="2" fill="#7A5A2A"/></svg>', 'Store it right', 'fridge'],
  forgot:['Forgotten', '<svg width="48" height="48" viewBox="0 0 48 48"><rect x="9" y="4" width="30" height="40" rx="6" fill="#EEF3F6" stroke="#9FB2BD" stroke-width="1.5"/><path d="M9 18h30" stroke="#9FB2BD" stroke-width="1.5"/><rect x="13" y="8" width="3" height="7" rx="1.5" fill="#7E95A3"/><rect x="13" y="22" width="3" height="10" rx="1.5" fill="#7E95A3"/><circle cx="29" cy="31" r="9" fill="#D9A321"/><text x="29" y="36" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">?</text></svg>', 'Check Eat first daily', 'eye'],
  toomuch:['Bought too much', '<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="16" cy="13" r="7" fill="#E04B35"/><circle cx="29" cy="10" r="7" fill="#F2B632"/><circle cx="35" cy="18" r="6" fill="#2F9E62"/><path d="M8 18h32l-3 24a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3z" fill="#C9A26B"/><path d="M8 18h32l-1 6H9z" fill="#A9824D"/></svg>', 'Plan before you shop', 'list'],
  dislike:['Not liked', '<svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" fill="#F6D68A"/><circle cx="17" cy="20" r="2.600" fill="#3D3520"/><circle cx="31" cy="20" r="2.600" fill="#3D3520"/><path d="M15 34q9-9 18 0" fill="none" stroke="#3D3520" stroke-width="2.600" stroke-linecap="round"/><path d="M12 14l8 2M36 14l-8 2" stroke="#3D3520" stroke-width="2.200" stroke-linecap="round"/></svg>', 'Off your list', 'close']
};
function profile(cat, catName, why) {
  const W = WHY[why], ar = '<span class="ar">' + svg('next', 16, 2.6) + '</span>';
  let h = '<div class="chain" role="img" aria-label="Most of your waste is ' + catName + (W ? ', mostly because it was ' + W[0].toLowerCase() + '. Fix: ' + W[2].toLowerCase() : '') + '."><div class="ct" style="background:#FDEEE7;color:#8A2E08">' + draw(CATFOOD[cat] || 'Tomatoes', 46) + '<span>' + catName.charAt(0).toUpperCase() + catName.slice(1) + '<br><small>binned most</small></span></div>';
  if (W) h += ar + '<div class="ct" style="background:#FBF0D0;color:#7A4D00">' + W[1] + '<span>' + W[0] + '<br><small>main reason</small></span></div>' + ar + '<div class="ct" style="background:#E9F2EC;color:#174F33"><span class="fi" style="width:46px;height:46px;background:#1F6B45;color:#fff">' + svg(W[3], 24, 2.2) + '</span><span>' + W[2] + '<br><small>try this</small></span></div>';
  return h + '</div>';
}

/* verify once: letter code -> confirm -> private */
function verify() {
  return '<svg viewBox="0 0 320 78" width="100%" role="img" aria-label="In the real app you confirm your address once with a letter code. It is never shown to anyone." style="display:block">' +
    '<rect x="18" y="18" width="68" height="46" rx="6" fill="#fff" stroke="#9FB2BD" stroke-width="1.5"/><path d="M18 24l34 24 34-24" fill="none" stroke="#9FB2BD" stroke-width="1.5"/><rect x="34" y="8" width="36" height="26" rx="4" fill="#FBF0D0" stroke="#D9A321" stroke-width="1.5"/><text x="52" y="26" text-anchor="middle" font-size="12" font-weight="800" fill="#7A4D00" font-family="ui-monospace,Menlo,monospace">4827</text>' +
    '<path d="M98 40h26M118 34l7 6-7 6" fill="none" stroke="#9AA59E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<rect x="140" y="6" width="40" height="66" rx="8" fill="#18201A"/><rect x="144" y="12" width="32" height="52" rx="4" fill="#fff"/><circle cx="160" cy="38" r="11" fill="#1F9D55"/><path d="M154.500 38l4 4 7-8" fill="none" stroke="#fff" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M194 40h26M214 34l7 6-7 6" fill="none" stroke="#9AA59E" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M250 34v-8a14 14 0 0 1 28 0v8" fill="none" stroke="#1F6B45" stroke-width="5" stroke-linecap="round"/><rect x="240" y="32" width="48" height="38" rx="8" fill="#1F6B45"/><path d="M252 46L264 36l12 10v12h-24z" fill="#fff"/><rect x="261" y="50" width="6" height="8" rx="1" fill="#1F6B45"/></svg>' +
    '<div class="gcap" style="margin-top:0"><span>Letter code</span><span>Confirm once</span><span>Address stays private</span></div>';
}

window.GFX = {draw:draw, profile:profile, verify:verify, strip:strip, board:board, dials:dials, flow:flow, etiq:etiq, scene:scene, sense:sense};

/* swap in where the copy lives in older modules */
const share11 = shareHTML;
shareHTML = function () {
  return share11().replace('<p class="sub">In the real app you’d confirm your address once with a letter code or your building manager. It’s never shown to anyone.</p>', verify()).replace('<p class="sub">Jiak Clean has no open public marketplace. You share inside verified circles, and food changes hands at pickup points, never your home address.</p>', scene());
};
const sheet11 = sheetHTML;
sheetHTML = function () {
  let html = sheet11();
  if (U.sheet === 'lst') ['LOOK', 'SMELL', 'TASTE'].forEach((n, i) => { html = html.replace('<span class="sub" style="font-weight:800;color:#1F6B45">' + n + '</span>', sense(i) + '<span class="sub" style="font-weight:800;color:#1F6B45">' + n + '</span>'); });
  return html;
};
})();
