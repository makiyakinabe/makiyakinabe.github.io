/* Jiak Clean: realistic dish illustrations and shared shading for food drawings */
(function () {
/* ---------- shared gradients, used by dishes and fridge foods ---------- */
const G = (id, type, stops, attrs) => '<' + type + 'Gradient id="' + id + '" ' + (attrs || '') + '>' + stops.map(s => '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"' + (s[2] !== undefined ? ' stop-opacity="' + s[2] + '"' : '') + '/>').join('') + '</' + type + 'Gradient>';
const RAD = 'cx="35%" cy="30%" r="80%"', VER = 'x1="0" y1="0" x2="0" y2="1"', HOR = 'x1="0" y1="0" x2="1" y2="0"';
const DEFS = [
  G('psTom0', 'radial', [[0, '#FF8D6B'], [.45, '#E8452E'], [1, '#A9271A']], RAD), G('psTom1', 'radial', [[0, '#FF8062'], [.45, '#DE3F2B'], [1, '#A3261A']], RAD), G('psTom2', 'radial', [[0, '#E06A55'], [.5, '#BF3527'], [1, '#7E1E14']], RAD),
  G('psApple0', 'radial', [[0, '#F58A7C'], [.45, '#CC322C'], [1, '#7E1A17']], RAD), G('psApple2', 'radial', [[0, '#D8665A'], [.5, '#A62824'], [1, '#6A1512']], RAD),
  G('psOnion', 'radial', [[0, '#EBB873'], [.5, '#BA7832'], [1, '#7C4518']], RAD), G('psEgg', 'radial', [[0, '#FBE6C9'], [.5, '#E4BB8C'], [1, '#BE8F5D']], RAD),
  G('psCarrot', 'linear', [[0, '#FBAE62'], [.5, '#EF7B22'], [1, '#BD520F']], VER),
  G('psBan0', 'linear', [[0, '#F6EE8E'], [.55, '#E3D24E'], [1, '#B6A02C']], VER), G('psBan1', 'linear', [[0, '#FFEB86'], [.55, '#F1CF3E'], [1, '#C29C1C']], VER), G('psBan2', 'linear', [[0, '#F7D673'], [.55, '#E2B53A'], [1, '#A2791C']], VER),
  G('psCrust0', 'linear', [[0, '#F0B872'], [.6, '#DE9B52'], [1, '#BE7A38']], VER), G('psCrust2', 'linear', [[0, '#DFA563'], [.6, '#CF8C47'], [1, '#A2662A']], VER),
  G('psThigh', 'radial', [[0, '#FBD8CD'], [.5, '#EFA898'], [1, '#CF7B69']], RAD), G('psPrawn', 'linear', [[0, '#DCE4E7'], [.5, '#BAC6CB'], [1, '#93A3AA']], VER),
  G('psKL00', 'linear', [[0, '#4C9A60'], [.5, '#2B6838'], [1, '#1B4728']], VER), G('psKL01', 'linear', [[0, '#62A86B'], [.5, '#468753'], [1, '#2F6A3B']], VER),
  G('psKL10', 'linear', [[0, '#4D9459'], [.5, '#3B7A43'], [1, '#295A31']], VER), G('psKL11', 'linear', [[0, '#68A56C'], [.5, '#559757'], [1, '#3D7741']], VER),
  G('psKL20', 'linear', [[0, '#A6B661'], [.5, '#7E9642'], [1, '#5A702E']], VER), G('psKL21', 'linear', [[0, '#B9C46E'], [.5, '#99AD55'], [1, '#738A3A']], VER),
  G('psCyl', 'linear', [[0, '#000', .14], [.2, '#fff', .5], [.45, '#fff', 0], [1, '#000', .24]], HOR),
  G('psTofu', 'linear', [[0, '#FFFEF8'], [1, '#EFE5CB']], VER), G('psCarton', 'linear', [[0, '#FFFFFF'], [1, '#E9EEF3']], HOR), G('psCap', 'radial', [[0, '#7ACB7C'], [.5, '#3E9B45'], [1, '#22642A']], RAD),
  /* dishes */
  G('psShadow', 'radial', [[0, '#3A2A1A', .32], [.6, '#3A2A1A', .12], [1, '#3A2A1A', 0]]),
  G('psVig', 'radial', [[.55, '#000', 0], [1, '#000', .12]], 'cx="50%" cy="50%" r="75%"'),
  G('psPlate', 'radial', [[0, '#FFFFFF'], [.75, '#F6F4EF'], [1, '#E8E4DB']], 'cx="50%" cy="42%" r="60%"'), G('psRim', 'linear', [[0, '#FFFFFF'], [1, '#E3DFD6']], VER),
  G('psBowl', 'linear', [[0, '#FFFFFF'], [.6, '#EEF1F3'], [1, '#C9D1D7']], VER), G('psBowlIn', 'radial', [[0, '#000', 0], [.8, '#000', .04], [1, '#000', .16]], 'cx="50%" cy="40%" r="60%"'),
  G('psCongee', 'radial', [[0, '#FFFEF8'], [.7, '#F4ECD8'], [1, '#E2D5B6']], 'cx="45%" cy="40%" r="65%"'),
  G('psBroth', 'radial', [[0, '#F8E3A6'], [.7, '#E7BF68'], [1, '#C99846']], 'cx="45%" cy="40%" r="65%"'),
  G('psCurry', 'radial', [[0, '#F4A45A'], [.6, '#D96C2C'], [1, '#A8441A']], 'cx="45%" cy="38%" r="70%"'),
  G('psSambal', 'radial', [[0, '#F07651'], [.6, '#C83E22'], [1, '#8E2412']], 'cx="45%" cy="40%" r="70%"'),
  G('psRice', 'radial', [[0, '#FFFFFF'], [.7, '#F6F1E4'], [1, '#E2D8C0']], 'cx="45%" cy="35%" r="70%"'),
  G('psFried', 'radial', [[0, '#FCEFC6'], [.6, '#EFD48C'], [1, '#D6AE5C']], 'cx="45%" cy="35%" r="70%"'),
  G('psGold', 'radial', [[0, '#F7CB79'], [.55, '#E2A04A'], [1, '#B8702A']], 'cx="50%" cy="45%" r="60%"'),
  G('psToast', 'radial', [[0, '#F2C072'], [.6, '#D69444'], [1, '#A2652A']], 'cx="50%" cy="45%" r="65%"'),
  G('psTofuF', 'linear', [[0, '#FADB97'], [1, '#E2A856']], VER), G('psTofuS', 'linear', [[0, '#D99A48'], [1, '#B37430']], VER),
  G('psClay', 'radial', [[0, '#7A5238'], [.7, '#4A2E1E'], [1, '#2B1A10']], 'cx="50%" cy="40%" r="60%"'),
  G('psGlaze', 'radial', [[0, '#C07A3C'], [.6, '#7E421B'], [1, '#4E2810']], RAD),
  G('psSmoothie', 'linear', [[0, '#FEF2C8'], [1, '#EFCB6A']], VER), G('psGlass', 'linear', [[0, '#fff', .55], [.18, '#fff', .08], [.8, '#fff', 0], [1, '#fff', .35]], HOR),
  G('psMetal', 'linear', [[0, '#F5F7F9'], [.5, '#C5CBD1'], [1, '#EEF1F3']], HOR), G('psStick', 'linear', [[0, '#C08E5C'], [1, '#6E4826']], HOR),
  G('psLime', 'radial', [[0, '#E3F2A8'], [.7, '#B7D96A'], [1, '#8FB843']], 'cx="50%" cy="50%" r="55%"'),
  G('psSyrup', 'linear', [[0, '#E39A3A'], [1, '#9E5512']], VER), G('psOmelette', 'radial', [[0, '#FDE07C'], [.6, '#F2BC3E'], [1, '#D4952A']], 'cx="45%" cy="35%" r="70%"'),
  G('psChick', 'radial', [[0, '#FFF6E6'], [1, '#E9D2AE']], RAD), G('psChickpea', 'radial', [[0, '#F6E2B5'], [1, '#C99E58']], RAD)
].join('');
document.body.insertAdjacentHTML('afterbegin', '<svg id="psDefs" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>' + DEFS + '</defs></svg>');
document.head.insertAdjacentHTML('beforeend', '<style>.ps .stm path{animation:psSteam 3.4s ease-in-out infinite;opacity:0}.ps .stm path:nth-child(2){animation-delay:1.1s}.ps .stm path:nth-child(3){animation-delay:2.2s}@keyframes psSteam{0%{opacity:0;transform:translateY(8px)}30%{opacity:.55}100%{opacity:0;transform:translateY(-14px)}}@media (prefers-reduced-motion:reduce){.ps .stm path{animation:none;opacity:.35}}</style>');

/* ---------- drawing helpers ---------- */
const rnd = seed => { let s = (Math.abs(seed) % 233280) + 11; return () => (s = (s * 9301 + 49297) % 233280) / 233280; };
const f = n => Math.round(n * 10) / 10;
const inE = (r, cx, cy, rx, ry) => { const a = r() * Math.PI * 2, d = Math.sqrt(r()); return [cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d]; };
function blob(r, x, y, s, n, squash) {
  n = n || 7; squash = squash || .8; const p = [];
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + r() * .5, d = s * (.7 + r() * .45); p.push([x + Math.cos(a) * d, y + Math.sin(a) * d * squash]); }
  let d = 'M' + f((p[n - 1][0] + p[0][0]) / 2) + ' ' + f((p[n - 1][1] + p[0][1]) / 2);
  for (let i = 0; i < n; i++) { const a = p[i], b = p[(i + 1) % n]; d += ' Q' + f(a[0]) + ' ' + f(a[1]) + ' ' + f((a[0] + b[0]) / 2) + ' ' + f((a[1] + b[1]) / 2); }
  return d + 'Z';
}
const shadow = (cx, cy, rx, ry) => '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="url(#psShadow)"/>';
const plate = (cx, cy, rx, ry) => shadow(cx + 5, cy + 9, rx * 1.06, ry * 1.06) +
  '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="url(#psRim)" stroke="#D9D4CA" stroke-width="1"/>' +
  '<ellipse cx="' + cx + '" cy="' + (cy + 2) + '" rx="' + f(rx * .76) + '" ry="' + f(ry * .74) + '" fill="url(#psPlate)" stroke="#E2DED4" stroke-width="1"/>' +
  '<path d="M' + f(cx - rx * .92) + ' ' + f(cy - ry * .15) + ' A' + rx + ' ' + ry + ' 0 0 1 ' + f(cx + rx * .2) + ' ' + f(cy - ry * .99) + '" stroke="#FFFFFF" stroke-width="2.2" fill="none" opacity=".95"/>';
function bowl(cx, cy, rx, ry, fill, id, inner) {
  return shadow(cx + 4, cy + ry * 1.4, rx * 1.05, ry * .7) +
    '<path d="M' + (cx - rx) + ' ' + cy + ' C' + (cx - rx) + ' ' + f(cy + ry * 1.9) + ' ' + (cx + rx) + ' ' + f(cy + ry * 1.9) + ' ' + (cx + rx) + ' ' + cy + 'Z" fill="url(#psBowl)" stroke="#C3CBD1" stroke-width="1"/>' +
    '<path d="M' + f(cx - rx * .93) + ' ' + f(cy + ry * .55) + ' C' + f(cx - rx * .6) + ' ' + f(cy + ry * 1.05) + ' ' + f(cx + rx * .6) + ' ' + f(cy + ry * 1.05) + ' ' + f(cx + rx * .93) + ' ' + f(cy + ry * .55) + '" stroke="#3E6FA8" stroke-width="2.2" fill="none" opacity=".75"/>' +
    '<path d="M' + f(cx - rx * .88) + ' ' + f(cy + ry * .72) + ' C' + f(cx - rx * .55) + ' ' + f(cy + ry * 1.2) + ' ' + f(cx + rx * .55) + ' ' + f(cy + ry * 1.2) + ' ' + f(cx + rx * .88) + ' ' + f(cy + ry * .72) + '" stroke="#3E6FA8" stroke-width="1" fill="none" opacity=".55"/>' +
    '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="#FFFFFF" stroke="#C3CBD1" stroke-width="1"/>' +
    '<clipPath id="' + id + '"><ellipse cx="' + cx + '" cy="' + f(cy + 1) + '" rx="' + f(rx * .9) + '" ry="' + f(ry * .84) + '"/></clipPath>' +
    '<g clip-path="url(#' + id + ')"><ellipse cx="' + cx + '" cy="' + f(cy + 1) + '" rx="' + f(rx * .9) + '" ry="' + f(ry * .84) + '" fill="' + fill + '"/>' + inner + '<ellipse cx="' + cx + '" cy="' + f(cy + 1) + '" rx="' + f(rx * .9) + '" ry="' + f(ry * .84) + '" fill="url(#psBowlIn)"/></g>' +
    '<path d="M' + f(cx - rx * .96) + ' ' + f(cy - ry * .1) + ' A' + rx + ' ' + ry + ' 0 0 1 ' + f(cx + rx * .1) + ' ' + f(cy - ry * .99) + '" stroke="#FFFFFF" stroke-width="2" fill="none"/>';
}
const grains = (r, cx, cy, rx, ry, n, fill, edge, sz) => { let o = ''; sz = sz || 1; for (let i = 0; i < n; i++) { const p = inE(r, cx, cy, rx, ry), a = Math.round(r() * 180); o += '<ellipse cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" rx="' + f(2.3 * sz) + '" ry="' + f(1.1 * sz) + '" transform="rotate(' + a + ' ' + f(p[0]) + ' ' + f(p[1]) + ')" fill="' + fill + '" stroke="' + edge + '" stroke-width=".4"/>'; } return o; };
const curd = (r, x, y, s) => '<path d="' + blob(r, x, y, s, 7, .75) + '" fill="#F5C640" stroke="#E0A32C" stroke-width=".6"/><path d="' + blob(r, x - s * .2, y - s * .2, s * .5, 6, .7) + '" fill="#FCE597"/>' + (r() > .5 ? '<circle cx="' + f(x + s * .5) + '" cy="' + f(y + s * .2) + '" r="' + f(s * .16) + '" fill="#D49A3A" opacity=".7"/>' : '');
const wedge = (x, y, s, rot) => '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + rot + ')"><path d="M' + (-s) + ' 0 Q0 ' + f(-s * 1.05) + ' ' + s + ' 0 Q0 ' + f(s * .42) + ' ' + (-s) + ' 0Z" fill="#D63A2B"/><path d="M' + f(-s * .78) + ' ' + f(-s * .06) + ' Q0 ' + f(-s * .78) + ' ' + f(s * .78) + ' ' + f(-s * .06) + ' Q0 ' + f(s * .3) + ' ' + f(-s * .78) + ' ' + f(-s * .06) + 'Z" fill="#F2785C"/><ellipse cx="' + f(-s * .3) + '" cy="' + f(-s * .2) + '" rx="' + f(s * .16) + '" ry="' + f(s * .1) + '" fill="#F9D7A0"/><ellipse cx="' + f(s * .25) + '" cy="' + f(-s * .24) + '" rx="' + f(s * .16) + '" ry="' + f(s * .1) + '" fill="#F9D7A0"/><path d="M' + f(-s * .6) + ' ' + f(-s * .45) + ' Q0 ' + f(-s * .95) + ' ' + f(s * .55) + ' ' + f(-s * .5) + '" stroke="#FF9A85" stroke-width="1" fill="none" opacity=".8"/></g>';
const onionRing = (x, y, s) => '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + s + '" fill="#E6F6D3" stroke="#5DAE4C" stroke-width="' + f(s * .45) + '"/>';
const greenBits = (r, cx, cy, rx, ry, n) => { let o = ''; for (let i = 0; i < n; i++) { const p = inE(r, cx, cy, rx, ry); o += r() > .5 ? onionRing(p[0], p[1], f(1.6 + r() * 1)) : '<rect x="' + f(p[0]) + '" y="' + f(p[1]) + '" width="' + f(3 + r() * 3) + '" height="1.8" rx=".9" fill="#5DAE4C" transform="rotate(' + Math.round(r() * 180) + ' ' + f(p[0]) + ' ' + f(p[1]) + ')"/>'; } return o; };
const chopsticks = (x, y) => '<g transform="translate(' + x + ' ' + y + ') rotate(-62)"><ellipse cx="54" cy="10" rx="7" ry="4" fill="#E9EEF2" stroke="#C3CBD1"/><path d="M0 0 L112 4 L112 7 L0 4Z" fill="url(#psStick)"/><path d="M2 9 L112 11 L112 14 L2 13Z" fill="url(#psStick)"/><path d="M0 0 L22 1 L22 4 L0 4Z M2 9 L24 9.4 L24 13 L2 13Z" fill="#E8D8C0" opacity=".65"/></g>';
const spoonC = (x, y, rot) => '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')">' + shadow(3, 6, 30, 10) + '<path d="M0 0 C-4 -12 18 -16 26 -8 C30 -4 30 4 26 7 C18 14 -4 12 0 0Z" fill="#FFFFFF" stroke="#C3CBD1"/><path d="M4 -2 C4 -8 16 -10 22 -5 C25 -2 25 3 22 5 C16 9 4 7 4 -2Z" fill="#EEF1F3"/><path d="M26 0 L70 -6 L71 -2 L27 4Z" fill="#FFFFFF" stroke="#C3CBD1"/></g>';
const spoonM = (x, y, rot) => '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')"><ellipse cx="0" cy="0" rx="12" ry="8" fill="url(#psMetal)" stroke="#AEB6BD"/><ellipse cx="-2" cy="-2" rx="6" ry="3" fill="#FFFFFF" opacity=".75"/><path d="M11 -2 L74 -5 L75 -1 L11 3Z" fill="url(#psMetal)" stroke="#AEB6BD" stroke-width=".7"/></g>';
const fork = (x, y, rot) => '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')"><path d="M0 -7 L16 -6 L16 6 L0 7Z" fill="url(#psMetal)" stroke="#AEB6BD" stroke-width=".7"/><path d="M-14 -6 L0 -6 M-14 -2 L0 -2 M-14 2 L0 2 M-14 6 L0 6" stroke="#B9C0C6" stroke-width="2" stroke-linecap="round"/><path d="M16 -2 L80 -4 L80 0 L16 2Z" fill="url(#psMetal)" stroke="#AEB6BD" stroke-width=".7"/></g>';
const steam = (x, y) => '<g class="stm" stroke="#FFFFFF" stroke-width="3.2" fill="none" stroke-linecap="round"><path d="M' + (x - 16) + ' ' + y + ' c-7 -8 7 -13 0 -22 c-6 -7 6 -12 0 -20"/><path d="M' + x + ' ' + (y - 4) + ' c-7 -8 7 -13 0 -22 c-6 -7 6 -12 0 -20"/><path d="M' + (x + 16) + ' ' + y + ' c-7 -8 7 -13 0 -22 c-6 -7 6 -12 0 -20"/></g>';
const napkin = (x, y, rot, c) => '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')" opacity=".75"><rect x="0" y="0" width="70" height="120" rx="4" fill="' + c + '"/><path d="M8 0 V120 M62 0 V120" stroke="#fff" stroke-width="1.4" opacity=".55"/><path d="M0 60 H70" stroke="#000" stroke-width="1" opacity=".06"/></g>';
const bg = (r, h) => '<rect width="300" height="' + h + '" fill="' + r.bg + '"/>' + Array.from({length:14}, (_, i) => '<path d="M' + (i * 26 - 40) + ' 0 L' + (i * 26 + 40) + ' ' + h + '" stroke="#FFFFFF" stroke-width="5" opacity=".14"/>').join('');

/* ---------- ingredients ---------- */
function tofuCube(x, y, s) { return '<g transform="translate(' + f(x) + ' ' + f(y) + ')"><path d="M0 0 L' + s + ' ' + f(-s * .3) + ' L' + f(s * 1.6) + ' ' + f(s * .1) + ' L' + f(s * .6) + ' ' + f(s * .42) + 'Z" fill="url(#psTofuF)"/><path d="M0 0 L' + f(s * .6) + ' ' + f(s * .42) + ' L' + f(s * .6) + ' ' + f(s * 1.2) + ' L0 ' + f(s * .78) + 'Z" fill="url(#psTofuS)"/><path d="M' + f(s * .6) + ' ' + f(s * .42) + ' L' + f(s * 1.6) + ' ' + f(s * .1) + ' L' + f(s * 1.6) + ' ' + f(s * .88) + ' L' + f(s * .6) + ' ' + f(s * 1.2) + 'Z" fill="#C88838"/><path d="M' + f(s * .3) + ' ' + f(s * .05) + ' l' + f(s * .5) + ' ' + f(-s * .12) + '" stroke="#FFF2CC" stroke-width="1.2" opacity=".8"/><circle cx="' + f(s * .25) + '" cy="' + f(s * .55) + '" r=".7" fill="#9E6224"/><circle cx="' + f(s * 1.1) + '" cy="' + f(s * .6) + '" r=".7" fill="#9E6224"/></g>'; }
function stalk(x, y, ang, len, k) {
  return '<g transform="translate(' + x + ' ' + y + ') rotate(' + ang + ')"><path d="M0 -3 Q' + f(len * .5) + ' -4.5 ' + len + ' -2.5 L' + len + ' 2.5 Q' + f(len * .5) + ' 4.5 0 3Z" fill="#BFE0A2" stroke="#8DBB72" stroke-width=".6"/><path d="M2 -1 Q' + f(len * .5) + ' -2.4 ' + (len - 2) + ' -1" stroke="#E6F5D6" stroke-width="1.2" fill="none"/>' +
    '<path d="M' + (len - 4) + ' 0 C' + (len + 4) + ' -18 ' + (len + 30) + ' -20 ' + (len + 40) + ' -4 C' + (len + 44) + ' 8 ' + (len + 22) + ' 20 ' + (len - 4) + ' 0Z" fill="url(#psKL0' + (k % 2) + ')" stroke="#1B4728" stroke-width=".6"/><path d="M' + (len - 2) + ' 0 C' + (len + 14) + ' -4 ' + (len + 28) + ' -4 ' + (len + 38) + ' -4" stroke="#A7D59A" stroke-width="1" fill="none"/><path d="M' + (len + 10) + ' -3 l-3 -6 M' + (len + 20) + ' -4 l-2 -7 M' + (len + 12) + ' -2 l-2 6 M' + (len + 24) + ' -3 l-1 6" stroke="#8CC384" stroke-width=".7"/><path d="M' + (len + 6) + ' -9 C' + (len + 16) + ' -15 ' + (len + 28) + ' -14 ' + (len + 34) + ' -9" stroke="#FFFFFF" stroke-width="1.4" fill="none" opacity=".35"/></g>';
}
function prawnC(x, y, s, rot) {
  let o = '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + rot + ') scale(' + s + ')">';
  const seg = [[0, 0, 7.5], [6, -4, 7], [11.5, -2, 6.4], [14, 4, 5.8], [12, 9.5, 5], [7.5, 12, 4.2]];
  seg.forEach((p, i) => { o += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + p[2] + '" ry="' + f(p[2] * .82) + '" fill="' + (i % 2 ? '#F38552' : '#F06A3D') + '" stroke="#C84A22" stroke-width=".5"/><path d="M' + f(p[0] - p[2] * .6) + ' ' + f(p[1] - p[2] * .3) + ' q' + f(p[2] * .6) + ' ' + f(-p[2] * .5) + ' ' + f(p[2] * 1.2) + ' 0" stroke="#FFD2B8" stroke-width="1.1" fill="none" opacity=".8"/>'; });
  o += '<path d="M5 13 L-2 18 L4 20 L8 16Z" fill="#D9452B"/><path d="M-6 -2 C-12 -10 -20 -10 -26 -6 M-6 0 C-14 -4 -22 -2 -26 2" stroke="#D9452B" stroke-width=".7" fill="none"/><circle cx="-5" cy="-3" r="1.1" fill="#2B1A10"/></g>';
  return o;
}
const chickpea = (x, y, r) => '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + r + '" fill="url(#psChickpea)" stroke="#B28A48" stroke-width=".5"/><path d="M' + f(x - r * .2) + ' ' + f(y - r * .9) + ' q' + f(r * .3) + ' ' + f(r * .4) + ' ' + f(r * .1) + ' ' + f(r * .8) + '" stroke="#B28A48" stroke-width=".6" fill="none"/>';
const banSlice = (x, y, r) => '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + r + '" ry="' + f(r * .78) + '" fill="#FFF4CC" stroke="#E4CF86" stroke-width="1"/><ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + f(r * .45) + '" ry="' + f(r * .35) + '" fill="none" stroke="#F0DB98" stroke-width="1"/>' + [0, 1, 2, 3].map(i => '<circle cx="' + f(x + Math.cos(i * 1.57) * r * .3) + '" cy="' + f(y + Math.sin(i * 1.57) * r * .24) + '" r=".7" fill="#8A6A3A"/>').join('');
const coriander = (x, y, s, rot) => '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + rot + ') scale(' + s + ')"><path d="M0 0 C-4 -3 -4 -8 0 -9 C2 -11 6 -10 6 -6 C9 -6 10 -2 7 0 C5 2 2 2 0 0Z" fill="#3E9B45" stroke="#2C7433" stroke-width=".4"/><path d="M0 0 L5 -5 M3 -2 L1 -7 M4 -3 L8 -3" stroke="#8ED07F" stroke-width=".5"/></g>';
const shred = (r, x, y) => { const a = Math.round(r() * 180), l = 7 + r() * 6; return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + a + ')"><path d="M0 -2 Q' + f(l / 2) + ' -3.2 ' + f(l) + ' -1 L' + f(l) + ' 1.4 Q' + f(l / 2) + ' 3 0 2Z" fill="url(#psChick)" stroke="#D7BC90" stroke-width=".4"/><path d="M1 0 H' + f(l - 1) + '" stroke="#E4CDA6" stroke-width=".5"/></g>'; };
const ginger = (r, x, y) => '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(6 + r() * 5) + '" height="1.6" rx=".8" fill="#F4D27A" transform="rotate(' + Math.round(r() * 180) + ' ' + f(x) + ' ' + f(y) + ')"/>';
const shallot = (r, x, y) => '<path d="M' + f(x) + ' ' + f(y) + ' q2 -2 4 0 q-1 2 -3 2" stroke="#A8642A" stroke-width="1.4" fill="none" stroke-linecap="round"/>';

/* ---------- dishes (300 x 160 canvas) ---------- */
const D = {};
D.r1 = (r, k) => { let o = plate(140, 88, 100, 60); const R = rnd(11);
  o += '<path d="' + blob(R, 140, 92, 58, 9, .55) + '" fill="#7A4A20" opacity=".45"/>';
  [[78, 98, -14, 30, 0], [84, 82, -24, 34, 1], [92, 110, -6, 32, 0], [100, 70, -30, 30, 1], [96, 92, -18, 36, 0]].forEach(p => o += stalk(p[0], p[1], p[2], p[3], p[4]));
  [[150, 86], [170, 96], [160, 108], [184, 82], [142, 104], [178, 112]].forEach(p => o += tofuCube(p[0], p[1], 13));
  for (let i = 0; i < 10; i++) { const p = inE(R, 150, 96, 44, 22); o += '<rect x="' + f(p[0]) + '" y="' + f(p[1]) + '" width="2.6" height="2" rx=".6" fill="#F3E3B4" opacity=".9"/>'; }
  o += '<path d="M120 80 q14 -6 30 -2 M160 100 q10 -4 22 0" stroke="#FFFFFF" stroke-width="1.6" opacity=".45" fill="none"/>';
  return o + steam(140, 34) + chopsticks(236, 132); };
D.r2 = (r, k) => { let o = plate(140, 88, 100, 60); const R = rnd(22);
  o += '<path d="' + blob(R, 140, 90, 68, 11, .6) + '" fill="url(#psFried)"/>' + grains(R, 140, 90, 62, 36, 360, '#FFF7DC', '#D8BE7E', 1.1);
  for (let i = 0; i < 11; i++) { const p = inE(R, 140, 88, 54, 28); o += curd(R, p[0], p[1], 5.5 + R() * 3); }
  [[104, 84, 20], [160, 72, -30], [152, 106, 10], [118, 104, 60], [184, 92, -10], [138, 80, 40]].forEach(p => o += wedge(p[0], p[1], 8, p[2]));
  o += greenBits(R, 140, 86, 56, 28, 24);
  return o + steam(140, 34) + chopsticks(236, 132); };
D.r3 = (r, k) => { const R = rnd(33); let inner = '<path d="M108 86 q20 -10 40 0 t40 0" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".7"/><path d="M114 100 q22 -8 44 0" stroke="#E6DAC0" stroke-width="2" fill="none" opacity=".7"/>';
  for (let i = 0; i < 12; i++) { const p = inE(R, 146, 90, 42, 20); inner += shred(R, p[0], p[1]); }
  for (let i = 0; i < 12; i++) { const p = inE(R, 146, 88, 40, 18); inner += ginger(R, p[0], p[1]); }
  for (let i = 0; i < 10; i++) { const p = inE(R, 140, 84, 30, 14); inner += shallot(R, p[0], p[1]); }
  inner += greenBits(R, 150, 84, 30, 14, 14) + '<path d="M128 94 q10 4 20 -2" stroke="#6B3A16" stroke-width="2" fill="none" opacity=".55"/>';
  for (let i = 0; i < 26; i++) { const p = inE(R, 146, 90, 46, 22); inner += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r=".55" fill="#4F4639" opacity=".7"/>'; }
  return bowl(146, 86, 68, 36, 'url(#psCongee)', 'bc3' + k, inner) + steam(146, 40) + spoonC(214, 124, -18); };
D.r4 = (r, k) => { const R = rnd(44); let o = shadow(146, 112, 80, 24) + '<ellipse cx="146" cy="90" rx="74" ry="44" fill="url(#psClay)"/><ellipse cx="70" cy="92" rx="9" ry="6" fill="#3A2416"/><ellipse cx="222" cy="92" rx="9" ry="6" fill="#3A2416"/><ellipse cx="146" cy="88" rx="62" ry="35" fill="#2E1C12"/><ellipse cx="146" cy="89" rx="58" ry="32" fill="#C89A5C"/>';
  o += '<clipPath id="cp4' + k + '"><ellipse cx="146" cy="89" rx="58" ry="32"/></clipPath><g clip-path="url(#cp4' + k + ')">' + grains(R, 146, 92, 56, 30, 150, '#FBF2DC', '#C9A66A', 1.05) + '<ellipse cx="146" cy="89" rx="58" ry="32" fill="none" stroke="#8A5A2A" stroke-width="5" opacity=".55"/>';
  [[122, 82], [142, 76], [162, 84], [132, 98], [156, 100], [174, 94], [116, 94]].forEach((p, i) => { o += '<path d="' + blob(R, p[0], p[1], 9, 7, .7) + '" fill="url(#psGlaze)" stroke="#3E1E0A" stroke-width=".6"/><path d="M' + (p[0] - 4) + ' ' + (p[1] - 3) + ' q4 -3 7 -1" stroke="#F2C48A" stroke-width="1.4" fill="none" opacity=".8"/>'; });
  [[138, 88], [166, 78], [150, 106]].forEach(p => o += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="5" ry="3.6" fill="#F6E1A8" stroke="#D8B868" stroke-width=".6"/><path d="M' + (p[0] - 3) + ' ' + p[1] + ' h6" stroke="#E2C67E" stroke-width=".5"/>');
  o += greenBits(R, 146, 88, 46, 22, 16) + '</g><path d="M90 70 A62 35 0 0 1 180 58" stroke="#8E6446" stroke-width="2" fill="none" opacity=".7"/>';
  return o + steam(146, 40) + spoonC(222, 126, -24); };
D.r5 = (r, k) => { const R = rnd(55); let o = plate(146, 104, 92, 44);
  for (let i = 2; i >= 0; i--) { const y = 96 - i * 11; o += '<ellipse cx="146" cy="' + (y + 6) + '" rx="62" ry="22" fill="#E6C08A"/><path d="M84 ' + y + ' L84 ' + (y + 6) + ' A62 22 0 0 0 208 ' + (y + 6) + ' L208 ' + y + '" fill="#F1D3A2"/><ellipse cx="146" cy="' + y + '" rx="62" ry="22" fill="url(#psGold)"/>'; for (let j = 0; j < 8; j++) { const p = inE(R, 146, y, 50, 16); o += '<ellipse cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" rx="' + f(1.5 + R() * 2) + '" ry="' + f(1 + R()) + '" fill="#B8702A" opacity=".35"/>'; } }
  const ty = 74;
  [[128, ty - 2], [146, ty - 6], [164, ty - 1], [138, ty + 8], [158, ty + 7]].forEach(p => o += banSlice(p[0], p[1], 8));
  o += '<path d="M104 ' + (ty + 4) + ' C120 ' + (ty + 18) + ' 170 ' + (ty + 20) + ' 190 ' + (ty + 2) + ' L194 ' + (ty + 26) + ' Q196 ' + (ty + 36) + ' 192 ' + (ty + 38) + ' Q188 ' + (ty + 34) + ' 190 ' + (ty + 24) + ' C170 ' + (ty + 30) + ' 120 ' + (ty + 28) + ' 104 ' + (ty + 14) + 'Z" fill="url(#psSyrup)" opacity=".8"/><rect x="140" y="' + (ty - 22) + '" width="16" height="11" rx="3" fill="#FFF2B3" stroke="#E8D27C"/><path d="M142 ' + (ty - 20) + ' h8" stroke="#FFFFFF" stroke-width="1.4"/>';
  return o + fork(232, 122, -30); };
D.r6 = (r, k) => { const R = rnd(66); let o = plate(140, 92, 100, 56);
  const slice = (x, y, rot) => { let s = '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')"><path d="M-34 26 L-34 -12 C-34 -32 -18 -36 0 -36 C18 -36 34 -32 34 -12 L34 26Z" fill="#9E5E26"/><path d="M-30 22 L-30 -10 C-30 -28 -16 -31 0 -31 C16 -31 30 -28 30 -10 L30 22Z" fill="url(#psToast)"/>'; for (let i = 0; i < 9; i++) { const p = inE(R, 0, -4, 22, 20); s += '<ellipse cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" rx="' + f(2 + R() * 3) + '" ry="' + f(1.4 + R() * 2) + '" fill="#8E5520" opacity=".35"/>'; } for (let i = 0; i < 14; i++) { const p = inE(R, 0, -6, 24, 22); s += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r=".8" fill="#FFFFFF" opacity=".85"/>'; } return s + '</g>'; };
  o += slice(118, 96, -14) + slice(164, 88, 12) + '<rect x="150" y="70" width="18" height="12" rx="3" fill="#FFF2B3" stroke="#E8D27C"/>';
  o += '<ellipse cx="236" cy="54" rx="22" ry="12" fill="#FFFFFF" stroke="#C3CBD1"/><ellipse cx="236" cy="54" rx="17" ry="8.5" fill="#6E8A2E"/><ellipse cx="231" cy="52" rx="7" ry="3" fill="#9DB653" opacity=".8"/>';
  return o + fork(232, 128, -30); };
D.r7 = (r, k) => { const R = rnd(77); let inner = '';
  for (let i = 0; i < 9; i++) { const p = inE(R, 146, 88, 44, 18); inner += '<path d="' + blob(R, p[0], p[1], 7 + R() * 4, 8, .5) + '" fill="#FFF3C4" opacity=".85" stroke="#F3D57E" stroke-width=".5"/>'; }
  [[118, 84, -20], [168, 80, 30], [150, 98, 70], [130, 100, -60], [176, 96, 10]].forEach((p, i) => inner += '<g transform="translate(' + p[0] + ' ' + p[1] + ') rotate(' + p[2] + ')"><path d="M0 0 C-6 -6 -4 -16 6 -16 C14 -14 14 -4 0 0Z" fill="url(#psKL0' + (i % 2) + ')"/><path d="M0 0 L6 -13" stroke="#8ED07F" stroke-width=".7"/></g>');
  for (let i = 0; i < 16; i++) { const p = inE(R, 146, 86, 46, 20); inner += '<ellipse cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" rx="' + f(1 + R() * 2) + '" ry="' + f(.8 + R()) + '" fill="#FFFFFF" opacity=".5"/>'; }
  return bowl(146, 86, 68, 36, 'url(#psBroth)', 'bc7' + k, inner) + steam(146, 40) + spoonC(214, 124, -18); };
D.r8 = (r, k) => { let o = shadow(140, 142, 40, 9) + '<ellipse cx="140" cy="140" rx="34" ry="7" fill="#C9A87C"/>';
  o += '<path d="M112 34 L168 34 L160 138 Q140 144 120 138Z" fill="url(#psSmoothie)"/><ellipse cx="140" cy="38" rx="27" ry="6" fill="#FFF8E2"/>' + [[126, 37], [134, 35], [146, 36], [154, 38], [140, 39]].map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.4" fill="#FFFDF4" stroke="#F0E2B6" stroke-width=".5"/>').join('');
  o += '<path d="M110 30 L170 30 L161 140 Q140 146 119 140Z" fill="url(#psGlass)" stroke="#C9D3DA" stroke-width="1.2"/><path d="M118 40 L124 132" stroke="#FFFFFF" stroke-width="3" opacity=".6"/>' + [[160, 60], [158, 82], [162, 104], [156, 120], [152, 70]].map(p => '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="1.4" ry="2" fill="#FFFFFF" opacity=".8"/>').join('');
  o += '<path d="M150 36 L172 -2 L177 0 L155 38Z" fill="#F7F7F7"/><path d="M153 31 L157 24 M158 22 L162 15 M163 13 L167 6 M168 4 L172 -3" stroke="#E2554A" stroke-width="3"/>';
  o += '<g transform="translate(108 30) rotate(-20)">' + banSlice(0, 0, 11) + '</g>';
  o += '<g transform="translate(216 118) rotate(-24)">' + shadow(4, 8, 40, 9) + '<path d="M-36 0 C-24 16 22 16 40 -4 C42 -6 44 -3 42 -1 C22 22 -26 22 -40 2Z" fill="url(#psBan1)" stroke="#A88620" stroke-width=".7"/><path d="M-34 1 C-22 13 22 13 40 -3" stroke="#D3B22E" stroke-width=".8" fill="none"/><path d="M-36 0 L-44 -4 L-42 -8 L-34 -3Z" fill="#7A6328"/><circle cx="2" cy="10" r="1.2" fill="#6B4A1E"/><circle cx="16" cy="8" r="1" fill="#6B4A1E"/></g>';
  return o; };
D.r9 = (r, k) => { const R = rnd(99); let o = plate(140, 88, 100, 60) + '<path d="' + blob(R, 140, 90, 60, 10, .55) + '" fill="url(#psSambal)"/><path d="M110 80 q20 -8 40 -2 M150 102 q14 -4 26 0" stroke="#FFB08F" stroke-width="2" opacity=".55" fill="none"/>';
  for (let i = 0; i < 10; i++) { const p = inE(R, 140, 90, 46, 24); o += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="' + f(1 + R() * 1.6) + '" fill="#F7A14A" opacity=".7"/>'; }
  [[104, 92, 1.7, 15], [142, 70, 1.7, -25], [176, 92, 1.7, 70], [132, 110, 1.6, 150]].forEach(p => o += prawnC(p[0], p[1], p[2], p[3]));
  [[154, 96, 30], [112, 70, -40], [190, 74, 10]].forEach(p => o += wedge(p[0], p[1], 8, p[2]));
  [[126, 92], [158, 108], [178, 96]].forEach(p => o += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="7" ry="4" fill="none" stroke="#B57BB0" stroke-width="1.6" opacity=".9"/>');
  o += '<g transform="translate(206 62)"><circle r="13" fill="#6FA83A"/><circle r="11" fill="url(#psLime)"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map(i => '<path d="M0 0 L' + f(Math.cos(i * .785) * 10) + ' ' + f(Math.sin(i * .785) * 10) + '" stroke="#F1F9D8" stroke-width="1"/>').join('') + '<circle r="2" fill="#F1F9D8"/></g>' + coriander(116, 66, 1.2, 20) + coriander(170, 70, 1.1, -30);
  return o + steam(140, 34) + spoonM(244, 126, -54); };
D.r10 = (r, k) => { const R = rnd(110); let inner = '<path d="M112 84 q16 -8 30 -2 q14 6 28 -2" stroke="#FFE6C2" stroke-width="3" fill="none" opacity=".75"/>';
  for (let i = 0; i < 22; i++) { const p = inE(R, 146, 90, 48, 22); inner += chickpea(p[0], p[1], f(3.6 + R())); }
  for (let i = 0; i < 6; i++) { const p = inE(R, 146, 88, 40, 18); inner += '<path d="' + blob(R, p[0], p[1], 4, 6, .8) + '" fill="#D8442E"/>'; }
  inner += coriander(130, 80, 1.1, 10) + coriander(160, 86, 1, -40) + coriander(146, 98, 1.1, 70);
  return bowl(146, 86, 68, 36, 'url(#psCurry)', 'bc10' + k, inner) + '<g transform="translate(236 70)">' + shadow(0, 30, 30, 10) + '<ellipse cx="0" cy="8" rx="30" ry="18" fill="#C99A52"/><ellipse cx="0" cy="6" rx="30" ry="18" fill="#EBCB8E" stroke="#C99A52"/><ellipse cx="-10" cy="2" rx="5" ry="3" fill="#A8642A" opacity=".55"/><ellipse cx="12" cy="10" rx="4" ry="2.4" fill="#A8642A" opacity=".55"/><ellipse cx="6" cy="-4" rx="3" ry="2" fill="#A8642A" opacity=".5"/><ellipse cx="-14" cy="12" rx="3" ry="1.8" fill="#A8642A" opacity=".5"/></g>' + steam(146, 40); };
D.c1 = (r, k) => { let o = plate(140, 88, 100, 60); const R = rnd(121);
  o += '<path d="' + blob(R, 140, 90, 68, 11, .6) + '" fill="url(#psFried)"/>' + grains(R, 140, 90, 62, 36, 340, '#FFF7DC', '#D8BE7E', 1.1);
  for (let i = 0; i < 14; i++) { const p = inE(R, 140, 88, 46, 24); o += '<rect x="' + f(p[0]) + '" y="' + f(p[1]) + '" width="4.4" height="4.4" rx="1" fill="#F0842E" stroke="#C95D12" stroke-width=".4"/>'; }
  for (let i = 0; i < 14; i++) { const p = inE(R, 140, 88, 46, 24); o += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2.4" fill="#6CB34B" stroke="#3E8A2E" stroke-width=".4"/>'; }
  for (let i = 0; i < 10; i++) { const p = inE(R, 140, 88, 46, 24); o += '<rect x="' + f(p[0]) + '" y="' + f(p[1]) + '" width="3.4" height="3" rx="1.2" fill="#F6D24A"/>'; }
  for (let i = 0; i < 6; i++) { const p = inE(R, 140, 88, 40, 20); o += curd(R, p[0], p[1], 5); }
  return o + steam(140, 34) + spoonM(240, 128, -50); };
D.c2 = (r, k) => { const R = rnd(132); let o = plate(140, 92, 100, 56);
  o += '<path d="M66 96 C66 60 110 50 150 52 C192 54 218 70 214 96 Z" fill="url(#psOmelette)" stroke="#C88A22" stroke-width="1"/><path d="M66 96 C100 104 180 104 214 96 C200 112 90 114 66 96Z" fill="#E9AE38"/>';
  for (let i = 0; i < 12; i++) { const p = inE(R, 140, 74, 52, 14); o += '<ellipse cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" rx="' + f(2 + R() * 4) + '" ry="' + f(1.2 + R() * 2) + '" fill="#C27F24" opacity=".35"/>'; }
  for (let i = 0; i < 9; i++) { const x = 80 + i * 15 + R() * 6; o += i % 3 === 0 ? wedge(x, 98, 5, 180) : '<path d="' + blob(R, x, 99, 4, 6, .7) + '" fill="' + (i % 3 === 1 ? '#3E8E3A' : '#F2D06A') + '"/>'; }
  o += '<path d="M90 64 C120 58 170 58 196 70" stroke="#FFF1B8" stroke-width="2" fill="none" opacity=".8"/>' + greenBits(R, 140, 72, 50, 12, 14);
  return o + fork(234, 126, -30); };
D.c3 = (r, k) => { const R = rnd(143); let inner = '';
  for (let i = 0; i < 9; i++) { const p = inE(R, 146, 88, 44, 18); inner += '<ellipse cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" rx="5.4" ry="4" fill="#F0842E" stroke="#C95D12" stroke-width=".5"/><ellipse cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" rx="2.6" ry="1.8" fill="#F7B26E"/>'; }
  for (let i = 0; i < 6; i++) { const p = inE(R, 146, 88, 42, 16); inner += '<rect x="' + f(p[0]) + '" y="' + f(p[1]) + '" width="9" height="7" rx="1.4" fill="url(#psTofu)" stroke="#E2D6B6" stroke-width=".5"/>'; }
  [[120, 84, -20], [170, 82, 30], [150, 100, 70], [128, 98, -60]].forEach((p, i) => inner += '<g transform="translate(' + p[0] + ' ' + p[1] + ') rotate(' + p[2] + ')"><path d="M0 0 C-6 -6 -4 -16 6 -16 C14 -14 14 -4 0 0Z" fill="url(#psKL0' + (i % 2) + ')"/></g>');
  for (let i = 0; i < 14; i++) { const p = inE(R, 146, 86, 46, 20); inner += '<ellipse cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" rx="' + f(1 + R() * 2) + '" ry="' + f(.8 + R()) + '" fill="#FFFFFF" opacity=".45"/>'; }
  return bowl(146, 86, 68, 36, 'url(#psBroth)', 'bc11' + k, inner) + steam(146, 40) + spoonC(214, 124, -18); };

let seq = 0;
recipeArt = function (r, h) {
  const fn = D[r.id] || D.c1, k = (++seq) % 997;
  return '<svg viewBox="0 0 300 160" width="100%" height="' + h + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + bg(r, 160) + (/r5|r6|r8|c2/.test(r.id) ? napkin(214, 20, 18, '#FFFFFF') : napkin(214, 24, 16, '#FFFFFF')) + fn(r, k) + '<rect width="300" height="160" fill="url(#psVig)"/></svg>';
};

/* onboarding welcome uses a real dish */
const onb8 = onbHTML;
onbHTML = function () {
  const html = onb8();
  if (U.onb !== 0) return html;
  const a = html.indexOf('<svg viewBox="0 0 342 200"'), b = html.indexOf('</svg>', a);
  return a < 0 ? html : html.slice(0, a) + '<div style="border-radius:24px;overflow:hidden;box-shadow:0 10px 24px rgba(24,32,26,.12)">' + recipeArt(R('r2'), 200) + '</div>' + html.slice(b + 6);
};
window.psDish = recipeArt;
if (S) paint();
})();
