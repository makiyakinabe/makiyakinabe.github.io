/* Jiak Clean: live fridge view with detailed food drawings */
(function () {
document.head.insertAdjacentHTML('beforeend', '<style>' +
'.ps .fz{display:flex;flex-direction:column;gap:12px}' +
'.ps .fz-live{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:14px;background:#F1F7F2;border:1px solid #CFE0D4;font-size:13px}' +
'.ps .fz-dot{width:10px;height:10px;border-radius:5px;background:#1F9D55;flex:none;box-shadow:0 0 0 0 rgba(31,157,85,.6);animation:fzPulse 1.8s infinite}' +
'@keyframes fzPulse{70%{box-shadow:0 0 0 8px rgba(31,157,85,0)}100%{box-shadow:0 0 0 0 rgba(31,157,85,0)}}' +
'.ps .fz-unit{position:relative;background:linear-gradient(180deg,#EEF2F0,#DDE4E0);border-radius:26px;padding:8px 10px 14px;box-shadow:inset 0 0 0 1.5px #C5CEC9,0 12px 26px rgba(24,32,26,.14)}' +
'.ps .fz-panel{display:flex;justify-content:space-between;align-items:center;padding:2px 8px 8px;font-size:13px;font-weight:800;color:#4F5851}' +
'.ps .fz-panel i{font-style:normal;display:inline-flex;align-items:center;gap:5px;background:#1E2723;color:#7FE0A8;border-radius:8px;padding:2px 8px;font-family:ui-monospace,Menlo,monospace}' +
'.ps .fz-comp{position:relative;border-radius:16px;overflow:hidden;background:linear-gradient(180deg,#FFFFFF 0%,#F1F8FA 55%,#E4F0F4 100%);box-shadow:inset 0 3px 12px rgba(0,30,40,.08),inset 0 0 0 1.5px #CBD9DE}' +
'.ps .fz-frz{background:linear-gradient(180deg,#F4FAFE,#DCEBF6);margin-bottom:8px;box-shadow:inset 0 0 0 1.5px #BFD5E5,inset 0 0 18px rgba(255,255,255,.9)}' +
'.ps .fz-frz::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 6% 10%,rgba(255,255,255,.95) 0 10px,transparent 26px),radial-gradient(circle at 96% 92%,rgba(255,255,255,.9) 0 8px,transparent 24px),radial-gradient(circle at 92% 8%,rgba(255,255,255,.8) 0 6px,transparent 18px)}' +
'.ps .fz-led{height:6px;margin:0 22%;border-radius:0 0 6px 6px;background:#FFFFFF;box-shadow:0 0 18px 8px rgba(255,255,255,.95),0 0 40px 14px rgba(220,240,255,.7)}' +
'.ps .fz-shelf{position:relative;display:flex;flex-wrap:wrap;align-items:flex-end;gap:4px 6px;padding:8px 10px 16px;min-height:118px}' +
'.ps .fz-shelf.gl::after{content:"";position:absolute;left:4px;right:4px;bottom:4px;height:8px;border-radius:3px;background:linear-gradient(180deg,rgba(236,248,252,.95),rgba(176,212,224,.95));box-shadow:0 3px 5px rgba(50,90,105,.2),inset 0 1px 0 #fff}' +
'.ps .fz-bottom{background:linear-gradient(180deg,transparent 30%,rgba(214,232,238,.55))}' +
'.ps .fz-lab{flex-basis:100%;display:flex;justify-content:space-between;align-items:center;margin-bottom:2px}' +
'.ps .fz-lab button{display:inline-flex;align-items:center;gap:5px;border:0;background:rgba(255,255,255,.82);border-radius:9px;padding:3px 8px;font-size:13px;font-weight:800;color:#3D4A43;min-height:40px;box-shadow:0 1px 2px rgba(0,0,0,.08)}' +
'.ps .fz-lab span{font-size:13px;font-weight:700;color:#5B6B64}' +
'.ps .fz-empty{font-size:13px;color:#6B7670;padding:6px 2px 14px;font-style:italic}' +
'.ps .fz-drawers{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:4px 8px 8px}' +
'.ps .fz-drawer{position:relative;border-radius:14px;min-height:150px;overflow:hidden;background:linear-gradient(180deg,rgba(226,242,233,.5),rgba(188,221,204,.8));border:1.5px solid #AFCDBD;display:flex;flex-direction:column}' +
'.ps .fz-drawer.fruit{background:linear-gradient(180deg,rgba(250,240,224,.5),rgba(240,214,190,.8));border-color:#DDBE9C}' +
'.ps .fz-drawer .fz-shelf{flex:1;min-height:0;padding:6px 6px 26px;justify-content:center}' +
'.ps .fz-drawer::after{content:"";position:absolute;left:0;right:0;bottom:0;height:22px;background:linear-gradient(180deg,rgba(255,255,255,.25),rgba(255,255,255,.55));border-top:1.5px solid rgba(255,255,255,.8)}' +
'.ps .fz-drawer::before{content:"";position:absolute;left:32%;right:32%;bottom:8px;height:6px;border-radius:3px;background:rgba(80,110,95,.45);z-index:1}' +
'.ps .fz-door{position:absolute;right:-7px;top:46px;bottom:22px;width:12px;border-radius:0 10px 10px 0;background:linear-gradient(90deg,#C9D2CD,#EEF2F0 60%,#BFC9C3);box-shadow:2px 0 6px rgba(0,0,0,.12)}' +
'.ps .fz-feet{position:absolute;left:18px;right:18px;bottom:-6px;height:6px;display:flex;justify-content:space-between}' +
'.ps .fz-feet::before,.ps .fz-feet::after{content:"";width:22px;height:6px;border-radius:0 0 4px 4px;background:#8F9A94}' +
'.ps .fz-pan{border-radius:22px;padding:10px;background:linear-gradient(180deg,#C89458,#B47E44);box-shadow:inset 0 0 0 1.5px #96652F,0 10px 22px rgba(60,35,10,.16);display:flex;flex-direction:column;gap:10px}' +
'.ps .fz-pan .fz-lab button{background:rgba(255,250,240,.92)}' +
'.ps .fz-cup{border-radius:14px;background:linear-gradient(180deg,#FBF4E8,#EFE0C6);box-shadow:inset 0 3px 10px rgba(80,50,10,.12)}' +
'.ps .fz-cup .fz-shelf::after{content:"";position:absolute;left:0;right:0;bottom:0;height:10px;background:linear-gradient(180deg,#C08A4E,#9C6B35);border-radius:0 0 14px 14px}' +
'.ps .fz-ctr{border-radius:14px;background:repeating-linear-gradient(90deg,#F5F1EA 0 22px,#E9E3D9 22px 23px),#F5F1EA;box-shadow:inset 0 3px 10px rgba(80,50,10,.1)}' +
'.ps .fz-ctr .fz-shelf::after{content:"";position:absolute;left:0;right:0;bottom:0;height:12px;background:linear-gradient(180deg,#5E6B66,#47524D);border-radius:0 0 14px 14px}' +
'.ps .fz-it{position:relative;border:0;background:none;padding:0 1px;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;transition:transform .15s,opacity .25s,filter .25s;max-width:150px}' +
'.ps .fz-it:active{transform:scale(.93)}' +
'.ps .fz-it svg{display:block;overflow:visible;filter:drop-shadow(0 2px 2px rgba(0,0,0,.18))}' +
'.ps .fz-it.urg svg{animation:fzGlow 1.8s ease-in-out infinite}' +
'@keyframes fzGlow{50%{filter:drop-shadow(0 0 7px rgba(226,69,47,.9))}}' +
'.ps .fz-nm{font-size:13px;font-weight:700;line-height:1.15;color:#18201A;max-width:128px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
'.ps .fz-tag{font-size:13px;font-weight:800;line-height:1.1;padding:2px 7px;border-radius:8px;background:#fff;color:#1F6B45;box-shadow:0 1px 2px rgba(0,0,0,.14);white-space:nowrap}' +
'.ps .fz-tag.t2{background:#B13C0B;color:#fff}.ps .fz-tag.t1{background:#FBF0D0;color:#5C3A00}.ps .fz-tag.tf{background:#E3EDF9;color:#174A85}.ps .fz-tag.tl{background:#ECE8F3;color:#4A3C70}' +
'.ps .fz.spot .fz-it:not(.urg),.ps .fz-it.dim{opacity:.28;filter:grayscale(.7)}' +
'.ps .fz-it.listed svg{opacity:.55}' +
'.ps .fz-it.new{animation:fzIn .7s cubic-bezier(.2,1.5,.4,1)}' +
'@keyframes fzIn{0%{transform:translateY(-26px) scale(.5);opacity:0}100%{transform:none;opacity:1}}' +
'.ps .fz.fz-open .fz-comp{animation:fzLight 1s ease-out}' +
'@keyframes fzLight{0%{filter:brightness(.55)}35%{filter:brightness(1.12)}100%{filter:none}}' +
'.ps .fz-legend{display:flex;flex-wrap:wrap;gap:6px 10px;font-size:13px;color:#4F5851;align-items:center}' +
'.ps .fz-legend .fz-tag{box-shadow:none;border:1px solid #E3E6DE}' +
'.ps .fz-hero{display:flex;gap:14px;align-items:center;border-radius:18px;padding:12px;border:1px solid #CBD9DE;background:linear-gradient(180deg,#FFFFFF,#E9F3F6)}' +
'.ps .fz-hero.frz{background:linear-gradient(180deg,#F4FAFE,#D9E9F5);border-color:#BFD5E5}.ps .fz-hero.pan{background:linear-gradient(180deg,#FBF4E8,#EFE0C6);border-color:#DCC39C}' +
'.ps .fz-hero svg{flex:none;filter:drop-shadow(0 3px 4px rgba(0,0,0,.2))}' +
'.ps .fz-stages{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}' +
'.ps .fz-stages div{display:flex;flex-direction:column;align-items:center;gap:3px;border-radius:12px;padding:6px 4px;background:#F6F7F2;border:1.5px solid transparent;font-size:13px;font-weight:700;color:#4F5851;text-align:center}' +
'.ps .fz-stages div.on{border-color:#1F6B45;background:#E9F2EC;color:#174F33}' +
'.ps .zdot{display:inline-block;width:10px;height:10px;border-radius:5px;box-shadow:0 0 0 2px #fff}.ps .fz-shelf.gl::before{content:"";position:absolute;left:6px;right:6px;bottom:10px;height:16px;border-radius:6px;background:var(--zc);opacity:.2}.ps .fz-drawer .fz-shelf::before,.ps .fz-frz .fz-shelf::before{content:"";position:absolute;inset:6px;border-radius:10px;border:2px dashed var(--zc);opacity:.35;pointer-events:none}.ps .fz-it.back{opacity:.62;transform:translateY(-6px)}.ps .fz-it.back svg{filter:blur(.3px) drop-shadow(0 1px 1px rgba(0,0,0,.15))}.ps .fz-tag.tb{background:#ECEFEC;color:#4F5851;border:1px dashed #9AA59E}.ps .fz-it.hit svg{filter:drop-shadow(0 0 6px rgba(31,157,85,.9))}.ps .fz-full{display:block;width:120px;height:7px;border-radius:4px;background:#C9D2CD;overflow:hidden}.ps .fz-full b{display:block;height:100%;border-radius:4px}.ps .fz-tbtn{border:0;font:inherit;font-family:ui-monospace,Menlo,monospace;font-weight:800;font-size:13px;background:#1E2723;color:#7FE0A8;border-radius:8px;padding:2px 8px;min-height:40px;box-shadow:0 0 0 2px #7FE0A8 inset}.ps .fz-tbtn.hot{color:#FFB199;box-shadow:0 0 0 2px #FFB199 inset;animation:fzBlink 1.4s infinite}@keyframes fzBlink{50%{opacity:.6}}.ps .fz-note{font-size:13px;color:#3D4A43;padding:0 8px 8px;line-height:1.35}.ps .fz-unit.warm .fz-comp:not(.fz-frz){box-shadow:inset 0 0 0 1.5px #E7B9A3,inset 0 0 36px rgba(232,120,80,.28)}' +
'.ps .fz-fi svg{display:block}.ps .fz-seg button{display:inline-flex;align-items:center;justify-content:center;gap:6px}.ps .fz-drawer .fz-lab span{display:none}.ps .fz-drawer .fz-lab{justify-content:center}' +
'</style>');

/* ---------- helpers ---------- */
const rnd = seed => { let s = (Math.abs(seed) % 233280) + 17; return () => (s = (s * 9301 + 49297) % 233280) / 233280; };
const stg = it => it.frozen ? 0 : it.days <= 0 ? 2 : it.days <= 2 ? 1 : 0;
const cnt = (q, m) => Math.max(1, Math.min(m, Math.round(q || 1)));
const f1 = n => Math.round(n * 10) / 10;
if (!CAT['Fish fillet']) CAT['Fish fillet'] = {cat:'protein', loc:'fridge', qty:1, unit:'pack', days:2, up:5.5, uk:.3, per:.5, type:'Use by', risk:'high', share:false, al:[], tip:'Keep sealed on the bottom shelf. Cook within a day or two, or freeze it.', safe:'Raw fish must be cooked or frozen by its use-by date. A strong fishy or sour smell, or slimy flesh, means bin it.'};

/* shared parts */
const tray = w => '<path d="M3 36 L' + (w - 3) + ' 36 L' + (w - 7) + ' 60 L7 60Z" fill="#F3F1EC" stroke="#CEC9BF" stroke-width=".9"/><rect x="2" y="33" width="' + (w - 4) + '" height="5" rx="2.5" fill="#FCFBF8" stroke="#CEC9BF" stroke-width=".8"/><rect x="10" y="41" width="' + (w - 20) + '" height="14" rx="2" fill="#FFFFFF" stroke="#E6E2DA" stroke-width=".6"/>';
const film = w => '<path d="M3 34 Q' + (w / 2) + ' 22 ' + (w - 3) + ' 34Z" fill="#FFFFFF" opacity=".3"/><path d="M9 31 L17 27 M' + (w - 24) + ' 27.5 L' + (w - 14) + ' 31.5 M24 46 L30 43" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" opacity=".9"/>';
const price = (x, y, red) => '<rect x="' + x + '" y="' + y + '" width="18" height="10" rx="1.5" fill="#FFF7D6" stroke="#D9C27A" stroke-width=".6"/><rect x="' + x + '" y="' + y + '" width="18" height="3" rx="1" fill="' + (red ? '#D8412F' : '#3E8E5B') + '"/><path d="M' + (x + 3) + ' ' + (y + 6) + 'h12M' + (x + 3) + ' ' + (y + 8.3) + 'h7" stroke="#8A7A4A" stroke-width=".7"/>';
const boxBack = () => '<rect x="5" y="26" width="46" height="32" rx="6" fill="#F6FAFC" stroke="#B7CBD6" stroke-width="1.1"/>';
const boxFront = lid => '<rect x="5" y="26" width="46" height="32" rx="6" fill="none" stroke="#B7CBD6" stroke-width="1.1"/><path d="M9 31 L9 53" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" opacity=".85"/><rect x="3" y="21" width="50" height="7" rx="3" fill="' + lid + '"/><rect x="5" y="21.6" width="46" height="2" rx="1" fill="#FFFFFF" opacity=".35"/><rect x="1.5" y="25" width="4" height="7" rx="1.2" fill="' + lid + '"/><rect x="50.5" y="25" width="4" height="7" rx="1.2" fill="' + lid + '"/>';
const grains = (seed, n, x0, x1, y0, y1, fill, edge) => { const r = rnd(seed); let o = ''; for (let i = 0; i < n; i++) { const x = f1(x0 + r() * (x1 - x0)), y = f1(y0 + r() * (y1 - y0)); o += '<ellipse cx="' + x + '" cy="' + y + '" rx="1.7" ry=".8" transform="rotate(' + Math.round(r() * 180) + ' ' + x + ' ' + y + ')" fill="' + fill + '" stroke="' + edge + '" stroke-width=".35"/>'; } return o; };

/* ---------- foods: each returns [width, top, svg body] for a 64-high box ---------- */
function kailan(it, s) {
  const L = s === 2 ? ['#7E9642', '#99AD55'] : s === 1 ? ['#3B7A43', '#579858'] : ['#2B6838', '#4A8A53'], dr = s === 2 ? 20 : 0;
  let o = '';
  [[15, -14], [21, -6], [28, 0], [35, 7], [41, 14]].forEach((p, i) => { const b = 24 + i * 2.2; o += '<path d="M' + b + ' 62 Q' + (p[0] + 2) + ' 46 ' + p[0] + ' 31" stroke="#B3D69A" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M' + (b - .6) + ' 61 Q' + (p[0] + 1.2) + ' 46 ' + (p[0] - .5) + ' 32" stroke="#86B771" stroke-width=".9" fill="none"/>'; });
  [[15, -30], [21, -12], [28, 3], [35, 17], [41, 32], [23, -44], [33, 40]].forEach((p, i) => {
    const a = p[1] + (p[1] < 0 ? -dr : dr);
    o += '<g transform="translate(' + p[0] + ' 32) rotate(' + a + ')"><path d="M0 0 C-10 -6 -11 -22 0 -27 C11 -22 10 -6 0 0Z" fill="url(#psKL' + s + (i % 2) + ')" stroke="' + (s === 2 ? '#C8B444' : '#1E4D29') + '" stroke-width="' + (s === 2 ? 1 : .6) + '"/><path d="M0 -1 L0 -24 M0 -7 L-5 -11 M0 -7 L5 -11 M0 -14 L-5 -18.5 M0 -14 L5 -18.5 M0 -20 L-3 -23 M0 -20 L3 -23" stroke="#A7D59A" stroke-width=".75" fill="none"/></g>';
  });
  if (s === 0) o += '<circle cx="28" cy="7" r="1.5" fill="#F2D23A"/><circle cx="30.5" cy="5.5" r="1.3" fill="#F2D23A"/><circle cx="26" cy="5" r="1.2" fill="#E9C82E"/>';
  o += '<rect x="20" y="49" width="18" height="4.2" rx="1.6" fill="#D9473A"/><rect x="20" y="49" width="18" height="1.3" rx=".6" fill="#F08A7E"/>';
  return [58, 4, o];
}
function spinach(it, s) {
  const c = s === 2 ? ['#5E7F3A', '#7D9746'] : s === 1 ? ['#2F7040', '#468B50'] : ['#24603A', '#3D8550'];
  const leaf = (x, y, r, k) => '<g transform="translate(' + x + ' ' + y + ') rotate(' + r + ')"><path d="M0 9 C-8 3 -8 -7 0 -10 C8 -7 8 3 0 9Z" fill="url(#psKL' + s + k + ')" stroke="#1D4B2B" stroke-width=".5"/><path d="M0 8 L0 -8 M0 -1 L-4 -4 M0 -1 L4 -4 M0 4 L-3.5 1.5 M0 4 L3.5 1.5" stroke="#9FD195" stroke-width=".6"/></g>';
  let o = '<path d="M6 12 L40 12 L42 60 Q23 63 4 60Z" fill="#E6F4EA" fill-opacity=".9" stroke="#A8C4B0" stroke-width="1"/>';
  o += [[14, 24, -20, 0], [29, 22, 18, 1], [20, 33, 8, 1], [34, 36, -12, 0], [12, 46, 25, 0], [26, 49, -6, 1], [36, 52, 14, 0], [18, 56, -30, 1]].map(p => leaf(p[0], p[1] + (s === 2 ? 2 : 0), p[2] + (s === 2 ? 25 : 0), p[3])).join('');
  o += '<path d="M6 12 l3 -4 3 4 3 -4 3 4 3 -4 3 4 3 -4 3 4 3 -4 3 4 3 -4 2 4Z" fill="#D7ECDE" stroke="#A8C4B0" stroke-width=".8"/>';
  o += '<rect x="11" y="31" width="24" height="14" rx="2.5" fill="#FFFFFF" stroke="#3E8E5B" stroke-width=".8"/><path d="M15 38 C15 34 19 33 21 34 C20 37 18 39 15 38Z" fill="#3E8E5B"/><path d="M24 35.5h8M24 38.5h6M24 41.5h7" stroke="#3E8E5B" stroke-width=".9"/>';
  o += '<path d="M9 15 L11 57" stroke="#FFFFFF" stroke-width="2" opacity=".75"/>';
  return [46, 7, o];
}
function thigh(x, y, flip, s) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + (flip ? -1 : 1) + ' 1)"><path d="M-12 3 C-15 -7 -5 -14 6 -12 C15 -10 17 0 11 6 C5 11 -10 11 -12 3Z" fill="url(#psThigh)" stroke="#D98576" stroke-width=".6"/><path d="M-9 1 C-9 -7 -1 -10 6 -9 C11 -7 12 -2 8 2 C3 5 -6 5 -9 1Z" fill="#F8CABC"/><path d="M-6 6 C-2 8 4 7 9 3" stroke="#FCE6CB" stroke-width="2.2" fill="none" stroke-linecap="round"/>' + [[-3, -4], [2, -6], [5, -2], [-1, 0], [-6, -2], [3, 1]].map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".65" fill="#E58E7C"/>').join('') + '</g>';
}
function chicken(it, s) { return [62, 22, tray(62) + thigh(19, 46, 0, s) + thigh(42, 45, 1, s) + film(62) + price(39, 47, true)]; }
function prawn(x, y, r) {
  return '<g transform="translate(' + x + ' ' + y + ') rotate(' + r + ')"><path d="M-8 2 C-9 -6 -2 -11 5 -9 C10 -7 11 -2 8 2 C6 -2 1 -3 -1 1 C-2 3 -3 5 -5 5Z" fill="url(#psPrawn)" stroke="#8A989F" stroke-width=".6"/><path d="M-4.5 -6 C-3.5 -3 -3.5 0 -4.5 3 M-.5 -8.4 C.5 -5 .5 -2 -.5 0 M3.6 -8.2 C4.6 -5 4.6 -3 4.4 -1" stroke="#97A6AD" stroke-width=".6" fill="none"/><path d="M-5 5 L-10.5 8.5 L-9 2.5Z" fill="#6F8089"/><path d="M-7 4 l-2.5 -1" stroke="#8A989F" stroke-width=".4"/><circle cx="8.6" cy="-1.2" r=".95" fill="#22272B"/><path d="M9 -2 C13 -6 16 -6.5 19.5 -4.5 M9 -1 C13 -3 16 -2.5 18 -1" stroke="#8A989F" stroke-width=".45" fill="none"/><path d="M-6 3 l-1 3 M-3 3.5 l-.5 3 M0 2.5 l0 3" stroke="#9AA8AE" stroke-width=".5"/></g>';
}
function prawns(it) {
  let o = tray(62); const r = rnd(it.id + 3);
  for (let i = 0; i < 9; i++) { const x = f1(12 + r() * 36), y = f1(42 + r() * 10); o += '<rect x="' + x + '" y="' + y + '" width="5" height="4" rx="1.2" fill="#E2F3FA" stroke="#B5D8E8" stroke-width=".5" transform="rotate(' + Math.round(r() * 40) + ' ' + x + ' ' + y + ')"/>'; }
  o += prawn(15, 46, -10) + prawn(28, 44, 8) + prawn(41, 47, -6) + prawn(50, 44, 14) + prawn(24, 53, 4) + prawn(38, 54, -12);
  return [62, 22, o + film(62) + price(40, 48, true)];
}
function fish(it) {
  let o = tray(62) + '<path d="M8 50 C12 40 30 37 46 41 C52 42.5 56 45.5 56 48 C50 52 30 56 14 54 C10 53 8 52 8 50Z" fill="#F7DDD2" stroke="#E2B7A8" stroke-width=".6"/>';
  for (let i = 0; i < 6; i++) o += '<path d="M' + (16 + i * 6.5) + ' 42.5 Q' + (19 + i * 6.5) + ' 48 ' + (16 + i * 6.5) + ' 53.5" stroke="#EDC1B1" stroke-width=".9" fill="none"/>';
  o += '<path d="M8 50 C20 56 40 54.5 56 48" stroke="#A9A1A0" stroke-width="1.5" fill="none"/><path d="M14 44 C24 41 34 40 44 42" stroke="#FFF1EA" stroke-width="1.4" fill="none" opacity=".8"/>';
  return [62, 22, o + film(62) + price(40, 47, true)];
}
function riceBox(it) {
  let o = boxBack() + '<path d="M8 40 Q28 29 48 40 L48 54 Q28 57 8 54Z" fill="url(#psRice)"/>';
  o += grains(it.id + 11, 42, 9, 47, 34, 55, '#FFFFFF', '#E0D6BE').replace(/rx="1.7" ry=".8"/g, 'rx="2.3" ry="1.1"');
  return [56, 21, o + boxFront('#4F8FD0')];
}
function dish(name, id) {
  const n = name.toLowerCase(), r = rnd(id + 5);
  const base = c => '<path d="M8 38 Q28 32 48 38 L48 54 Q28 57 8 54Z" fill="' + c + '"/>';
  const wav = (y, c, w) => '<path d="M9 ' + y + ' q2.5 -2.4 5 0 t5 0 t5 0 t5 0 t5 0 t5 0 t5 0" stroke="' + c + '" stroke-width="' + w + '" fill="none" stroke-linecap="round"/>';
  const cuc = (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="3.2" fill="#6FA85C"/><circle cx="' + x + '" cy="' + y + '" r="2.2" fill="#DDF0CF"/><path d="M' + (x - 1) + ' ' + y + 'h2" stroke="#B9D9A3" stroke-width=".6"/>';
  if (/curry|rendang/.test(n)) return base('#C9702A') + '<ellipse cx="22" cy="40" rx="9" ry="1.6" fill="#E89A44" opacity=".8"/>' + [[12, 42, 8], [24, 45, -12], [35, 41, 18], [40, 48, -6], [18, 50, 10]].map(p => '<rect x="' + p[0] + '" y="' + p[1] + '" width="7.5" height="5.5" rx="2" fill="#EBC28C" stroke="#C98F52" stroke-width=".5" transform="rotate(' + p[2] + ' ' + p[0] + ' ' + p[1] + ')"/>').join('') + '<circle cx="31" cy="50" r="3.2" fill="#F1CE6A"/><circle cx="14" cy="47" r="2.6" fill="#F1CE6A"/><path d="M28 43 c2 -1.5 4 -1.5 5 0 c-1 1.5 -3 1.5 -5 0Z M43 45 c1.5 -1.2 3.5 -1 4 .5 c-1.5 1 -3 1 -4 -.5Z" fill="#3E7D3A"/>';
  if (/kway|ckt|char/.test(n)) return base('#6B411F') + wav(40, '#A66B32', 2.3) + wav(44, '#B57A3C', 2.3) + wav(48, '#9C6230', 2.3) + wav(52, '#A66B32', 2.3) + [[12, 41], [20, 46], [30, 43], [38, 50], [44, 42], [25, 51]].map(p => '<path d="M' + p[0] + ' ' + p[1] + ' l4 1.5" stroke="#F4F0E2" stroke-width="1.3" stroke-linecap="round"/>').join('') + '<path d="M15 47 l6 -2 M33 47 l6 -1.5" stroke="#4E9A3A" stroke-width="1.2"/><ellipse cx="27" cy="47" rx="3" ry="2" fill="#F2D06A"/><ellipse cx="41" cy="46" rx="1.6" ry="1.1" fill="#4A3A2E"/><ellipse cx="18" cy="43" rx="1.6" ry="1.1" fill="#4A3A2E"/>';
  if (/nasi lemak/.test(n)) return base('#FFFFFF') + grains(id, 22, 9, 26, 38, 54, '#FFFFFF', '#D8CFB8') + '<path d="M29 41 C33 37 42 38 44 42 C46 46 40 48 35 47 C31 47 28 45 29 41Z" fill="#B8322A"/><path d="M31 42 c3 -1 7 -1 10 0" stroke="#D9543F" stroke-width="1" fill="none"/><ellipse cx="38" cy="51" rx="6" ry="4.2" fill="#FFFFFF" stroke="#E7E1D4" stroke-width=".5"/><circle cx="38" cy="51" r="2.5" fill="#F2A71C"/>' + cuc(15, 51) + cuc(21, 53) + [[26, 50], [28, 52], [27, 54]].map(p => '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="1.4" ry="1" fill="#C88A4A"/>').join('') + '<path d="M44 46 l3 1 M45 49 l2.5 .8" stroke="#B49C74" stroke-width="1" stroke-linecap="round"/>';
  if (/chicken rice/.test(n)) return base('#F4E6BE') + grains(id, 26, 9, 47, 39, 55, '#FBF2D8', '#D9C79A') + [0, 1, 2, 3].map(i => '<g transform="translate(' + (16 + i * 7) + ' ' + (43 + (i % 2)) + ') rotate(' + (-10 + i * 6) + ')"><rect x="-3.5" y="-3" width="7" height="9" rx="1.5" fill="#F6E7C9" stroke="#E2C38E" stroke-width=".5"/><rect x="-3.5" y="-3" width="7" height="2.2" rx="1" fill="#E9C07E"/></g>').join('') + cuc(44, 49) + '<path d="M40 42 c1 -2 3 -2 4 0" stroke="#4E9A3A" stroke-width="1.2" fill="none"/>';
  if (/economy|mixed|cai fan/.test(n)) return base('#FFFFFF') + grains(id, 18, 9, 25, 38, 54, '#FFFFFF', '#D8CFB8') + [[31, 41, -20], [38, 44, 15], [33, 47, 30], [42, 40, -10]].map(p => '<path transform="translate(' + p[0] + ' ' + p[1] + ') rotate(' + p[2] + ')" d="M0 4 C-4 1 -4 -3 0 -4 C4 -3 4 1 0 4Z" fill="#3E7D45"/>').join('') + [[30, 51], [37, 52], [43, 49]].map(p => '<rect x="' + p[0] + '" y="' + p[1] + '" width="5.5" height="4.5" rx="1.5" fill="#7A3E1E" stroke="#5A2B13" stroke-width=".4"/>').join('');
  if (/mee goreng|maggi/.test(n)) return base('#A8401C') + wav(40, '#DE6A2E', 2.6) + wav(44.5, '#D45E24', 2.6) + wav(49, '#E27438', 2.6) + wav(53, '#D45E24', 2.2) + '<ellipse cx="34" cy="45" rx="4" ry="2.6" fill="#F2D06A"/><path d="M15 46 l5 -1.5 M38 51 l5 -1" stroke="#4E9A3A" stroke-width="1.3"/><circle cx="24" cy="49" r="2" fill="#E4473A"/><circle cx="42" cy="43" r="1.8" fill="#E4473A"/>';
  if (/bee hoon|vermicelli/.test(n)) { let o = base('#E6D3A0'); for (let i = 0; i < 14; i++) o += '<path d="M' + f1(9 + r() * 8) + ' ' + f1(38 + r() * 16) + ' q10 ' + f1(-3 + r() * 6) + ' 20 0 t' + f1(8 + r() * 6) + ' 0" stroke="#F4E8C6" stroke-width=".8" fill="none"/>'; return o + '<path d="M14 44 l6 1 M30 50 l7 -1 M38 42 l5 2" stroke="#EF7B22" stroke-width="1.2"/><path d="M22 41 c3 -2 6 -1 7 1 M33 46 c2 -2 5 -1 6 1" stroke="#7DB35E" stroke-width="1.6" fill="none"/>'; }
  return base('#9A5B2E') + [[13, 42, '#E3A247'], [22, 47, '#6FA85C'], [32, 41, '#E3A247'], [40, 48, '#C4472F'], [28, 52, '#6FA85C'], [17, 51, '#D8B27A']].map(p => '<rect x="' + p[0] + '" y="' + p[1] + '" width="5" height="4.5" rx="1.4" fill="' + p[2] + '"/>').join('') + '<ellipse cx="30" cy="39.5" rx="10" ry="1.4" fill="#B97440" opacity=".7"/>';
}
function leftover(it) {
  const nm = it.name.replace('Leftover: ', '');
  const lid = ['#D9534F', '#3E8E5B', '#E2A23A', '#4F8FD0'][it.id % 4];
  return [56, 19, boxBack() + dish(nm, it.id) + boxFront(lid) + '<g transform="rotate(-4 28 24)"><rect x="16" y="20.2" width="24" height="8" fill="#F1E2B8" opacity=".97"/><path d="M16 20.2 l1 1 -1 1 1 1 -1 1 1 1 -1 1 1 1 M40 20.2 l-1 1 1 1 -1 1 1 1 -1 1 1 1 -1 1" stroke="#E2CE97" stroke-width=".5" fill="none"/><path d="M19 24.6 c2 -2 3 2 5 0 s3 -2 4 0 s3 2 5 -1 s2 1 4 0" stroke="#33302A" stroke-width=".8" fill="none"/></g>'];
}
function bread(it, s) {
  const half = it.qty <= .6, L = half ? 30 : 48, top = s === 2 ? '#9E5A22' : '#B86E2C', body = s === 2 ? '#D39550' : '#E2A15A', W = L + 12;
  let o = '<path d="M4 26 Q4 17 12 17 L' + (L + 3) + ' 17 Q' + W + ' 17 ' + W + ' 26 L' + W + ' 58 L4 58Z" fill="#EEF4F8" fill-opacity=".75" stroke="#BFCAD2" stroke-width=".9"/>';
  o += '<path d="M7 56 L7 31 Q7 22 18 22 L' + (L - 1) + ' 22 Q' + (L + 9) + ' 22 ' + (L + 9) + ' 31 L' + (L + 9) + ' 56Z" fill="url(#psCrust' + (s === 2 ? 2 : 0) + ')"/>';
  o += '<path d="M7 31 Q7 22 18 22 L' + (L - 1) + ' 22 Q' + (L + 9) + ' 22 ' + (L + 9) + ' 31 Q' + ((L + 16) / 2) + ' 26.5 7 31Z" fill="' + top + '"/><path d="M12 25.5 Q' + ((L + 16) / 2) + ' 22.5 ' + (L + 3) + ' 25.5" stroke="#D98E48" stroke-width="1" fill="none" opacity=".8"/>';
  for (let x = 13; x < L + 6; x += 5.5) o += '<path d="M' + x + ' 30 L' + x + ' 55" stroke="#C47F3E" stroke-width=".7" opacity=".7"/>';
  if (half) o += '<path d="M' + (L + 6) + ' 23 Q' + (L + 11) + ' 25 ' + (L + 11) + ' 32 L' + (L + 11) + ' 56 L' + (L + 7) + ' 56Z" fill="#F3DDAE" stroke="#D9B57A" stroke-width=".6"/>';
  o += '<rect x="4" y="45" width="' + (W - 4) + '" height="8" fill="#2F6FB5" opacity=".9"/><path d="M20 49 h' + (W - 26) + '" stroke="#F2C94C" stroke-width="1.2" stroke-dasharray="3 2"/>';
  o += '<g transform="translate(12 49)"><path d="M0 3.5 L0 -3.5" stroke="#F2C94C" stroke-width=".9"/><ellipse cx="-1.4" cy="-.6" rx=".9" ry="1.6" fill="#F2C94C"/><ellipse cx="1.4" cy="-.6" rx=".9" ry="1.6" fill="#F2C94C"/><ellipse cx="0" cy="-3.2" rx=".9" ry="1.6" fill="#F2C94C"/></g>';
  o += '<path d="M' + W + ' 30 L' + (W + 4) + ' 25 L' + (W + 6) + ' 41 L' + W + ' 36Z" fill="#E3EBF1" stroke="#BFCAD2" stroke-width=".7"/><rect x="' + (W - 1) + '" y="29" width="3" height="8" rx="1" fill="#E5443A"/>';
  o += '<path d="M8 20 Q6 40 8 56" stroke="#FFFFFF" stroke-width="2" opacity=".6" fill="none"/>';
  return [W + 7, 16, o];
}
function bananas(it, s, n) {
  const body = s === 2 ? '#E5B938' : s === 1 ? '#F3D445' : '#E8DC5C';
  const sp = s === 2 ? [[9, 13, 1.3], [13, 18, 1.8], [19, 20, 1.2], [23, 23, 2], [29, 22, 1.4], [33, 26, 1.6], [38, 23, 1.9], [43, 24, 1.2], [16, 16, .9], [27, 25.5, .9], [36, 21, 1]] : s === 1 ? [[19, 21.5, 1], [31, 24, 1.2], [40, 23.5, .8]] : [];
  let o = '';
  for (let i = n - 1; i >= 0; i--) {
    o += '<g transform="translate(10 14) rotate(' + (-14 + i * (n <= 3 ? 12 : 7)) + ')"><path d="M0 0 C4 14 30 22 50 20 C52 19.5 53.5 22 51.5 24.5 C30 36 3 27 -2 3Z" fill="url(#psBan' + s + ')" stroke="#A88620" stroke-width=".7"/><path d="M1 2.5 C6 16 30 24 50 21" stroke="#D3B22E" stroke-width=".8" fill="none"/><path d="M4 7 C10 15 26 20 44 20" stroke="#FFF6C0" stroke-width="1.4" fill="none" opacity=".55"/>' +
      (s === 0 ? '<path d="M-2 3 C-1 8 1 12 4 15 L8 12 C5 9 3 5 0 0Z" fill="#94B043" opacity=".95"/>' : '') +
      sp.map(p => '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="' + p[2] + '" ry="' + f1(p[2] * .72) + '" fill="#5E3F17" opacity=".82"/>').join('') +
      '<path d="M50.5 20.5 l3.3 1.2 -1.2 3 -2.8 -.9Z" fill="#3F2C14"/></g>';
  }
  o += '<path d="M10 14 L4 5 L8 3 L13 12Z" fill="#7A6328" stroke="#5A4718" stroke-width=".6"/><path d="M4 5 L8 3" stroke="#3F2C14" stroke-width="1.6"/>';
  return [64, 3, o];
}
function bananaSet(it, s) { return bananas(it, s, cnt(it.qty, 6)); }
function tofu() {
  let o = '<path d="M5 30 L45 30 L42 58 L8 58Z" fill="#F4FAFD" stroke="#B9CBD5" stroke-width=".9"/><path d="M6.4 36 L43.6 36 L42 57 L8 57Z" fill="#CFE7F4" opacity=".85"/>';
  o += '<rect x="11" y="35" width="28" height="19" rx="2" fill="url(#psTofu)" stroke="#E4DCC4" stroke-width=".6"/><path d="M11 35 L39 35 L36.5 32 L13.5 32Z" fill="#FFFDF6" stroke="#E4DCC4" stroke-width=".5"/>';
  o += [[16, 40], [22, 44], [29, 39], [33, 47], [19, 49], [27, 50], [35, 42]].map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".6" fill="#E5D9B8"/>').join('');
  o += '<circle cx="9" cy="44" r="1.2" fill="#FFFFFF" opacity=".8"/><circle cx="41" cy="50" r="1" fill="#FFFFFF" opacity=".8"/><circle cx="10" cy="52" r=".8" fill="#FFFFFF" opacity=".8"/>';
  o += '<rect x="4" y="27" width="42" height="4.2" rx="1.6" fill="#FFFFFF" stroke="#B9CBD5" stroke-width=".7"/><rect x="14" y="27.6" width="22" height="3" rx="1" fill="#3E8E5B"/><path d="M17 29.1 h16" stroke="#FFFFFF" stroke-width=".7" stroke-dasharray="2 1.5"/>';
  return [50, 27, o];
}
function tomato(x, y, r, s) {
  const c = s === 2 ? '#C53B2B' : s === 1 ? '#DE4330' : '#E2452F', d = s === 2 ? '#9E2A1D' : '#B8321F';
  return '<g transform="translate(' + x + ' ' + y + ')"><ellipse cx="0" cy="0" rx="' + r + '" ry="' + f1(r * .88) + '" fill="url(#psTom' + s + ')" stroke="' + d + '" stroke-width=".7"/><path d="M' + f1(-r * .5) + ' ' + f1(-r * .75) + ' Q0 0 ' + f1(-r * .55) + ' ' + f1(r * .7) + ' M' + f1(r * .5) + ' ' + f1(-r * .75) + ' Q0 0 ' + f1(r * .55) + ' ' + f1(r * .7) + '" stroke="' + d + '" stroke-width=".6" fill="none" opacity=".55"/><ellipse cx="' + f1(-r * .38) + '" cy="' + f1(-r * .35) + '" rx="' + f1(r * .28) + '" ry="' + f1(r * .17) + '" fill="#FFFFFF" opacity=".5" transform="rotate(-30 ' + f1(-r * .38) + ' ' + f1(-r * .35) + ')"/>' +
    (s === 2 ? '<path d="M' + f1(r * .1) + ' ' + f1(r * .35) + ' q2 1 4 0 M' + f1(-r * .65) + ' ' + f1(r * .15) + ' q2 1.4 4 .4 M' + f1(r * .3) + ' ' + f1(-r * .1) + ' q1.6 .9 3 0" stroke="' + d + '" stroke-width=".6" fill="none"/>' : '') +
    '<path d="M0 ' + f1(-r * .8) + ' l-4.2 -.8 3 -.7 -1.6 -3 3 2.3 2.5 -2.8 -.3 3.4 3.7 .4 -3.4 1.4 1.5 2.6 -3.1 -1.7Z" fill="#3E8E3A" stroke="#2E6E2B" stroke-width=".4"/><path d="M0 ' + f1(-r * .9) + ' l.5 -3.2" stroke="#2E6E2B" stroke-width="1.3" stroke-linecap="round"/></g>';
}
function cluster(n, sp, fn) {
  const bot = n <= 3 ? n : Math.ceil(n * .6), topN = n - bot, w = 22 + (bot - 1) * sp;
  let o = '';
  for (let i = 0; i < topN; i++) o += fn(11 + sp / 2 + i * sp, 40, i + 10);
  for (let i = 0; i < bot; i++) o += fn(11 + i * sp, 52, i);
  return [w, topN ? 26 : 38, o];
}
function tomatoes(it, s) { return cluster(cnt(it.qty, 6), 18, (x, y) => tomato(x, y, 9.5, s)); }
function onion(x, y) {
  return '<g transform="translate(' + x + ' ' + y + ')"><path d="M0 -10 C-3 -8 -11.5 -4 -11 3 C-10.5 9 -5 11 0 11 C5 11 10.5 9 11 3 C11.5 -4 3 -8 0 -10Z" fill="url(#psOnion)" stroke="#8B5220" stroke-width=".7"/><path d="M0 -9 C-4 -4 -5 4 -3 10.5 M0 -9 C4 -4 5 4 3 10.5 M0 -9 C-8 -3 -9 5 -6.5 9.5 M0 -9 C8 -3 9 5 6.5 9.5" stroke="#8B5220" stroke-width=".5" fill="none" opacity=".7"/><path d="M-4 -3 C-5 0 -5 3 -4 5" stroke="#E2B070" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".85"/><path d="M0 -11 L-1.2 -16.5 L1.4 -16.2Z" fill="#8B5220"/><path d="M-3 10.4 l-1 2.2 M0 11 l0 2.3 M3 10.4 l1 2.2 M-1.5 10.8 l-.4 2" stroke="#D8C49A" stroke-width=".6"/></g>';
}
function onions(it) { return cluster(cnt(it.qty, 4), 20, (x, y) => onion(x, y - 1)); }
function carrot(x, y, L, rot) {
  return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')"><path d="M0 -4.6 Q' + (L * .5) + ' -4 ' + L + ' 0 Q' + (L * .5) + ' 4 0 4.6 Q-1.6 0 0 -4.6Z" fill="url(#psCarrot)" stroke="#C95D12" stroke-width=".6"/>' +
    [.18, .36, .54, .72].map(f => '<path d="M' + f1(L * f) + ' ' + f1(-4.2 * (1 - f * .8)) + ' l1.2 2.1" stroke="#C95D12" stroke-width=".55"/>').join('') +
    '<path d="M3 -2.2 L' + f1(L * .7) + ' -1.1" stroke="#F8A35A" stroke-width="1" opacity=".75"/><path d="M0 -1 C-6 -6 -10 -8 -13 -7 M0 0 C-7 -2 -11 -1 -14 1 M0 1 C-6 4 -9 7 -12 8" stroke="#4E9A3A" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M-6 -4 l-2 -2.6 M-8.5 -1.2 l-2.6 -1.6 M-7 4 l-2 2.2 M-10 -6.5 l-1 -2" stroke="#6DB24F" stroke-width=".9"/></g>';
}
function carrots(it) { const n = cnt(it.qty, 5); let o = ''; for (let i = 0; i < n; i++) o += carrot(16, 57 - i * 7.5, 40, -3 + i * 1.5); return [58, 57 - (n - 1) * 7.5 - 10, o]; }
function cup(x, y) {
  return '<g transform="translate(' + x + ' ' + y + ')"><path d="M-8 -12 L8 -12 L6.5 10 L-6.5 10Z" fill="#FFFFFF" stroke="#CDD3DA" stroke-width=".7"/><path d="M-7.6 -5 L7.6 -5 L7.2 1 L-7.2 1Z" fill="#E86A92"/><path d="M-2.2 -3.6 C-3.2 -2 -2.2 .3 0 .3 C2.2 .3 3.2 -2 2.2 -3.6 C1 -4.2 -1 -4.2 -2.2 -3.6Z" fill="#D7263D"/><circle cx="-.8" cy="-2" r=".3" fill="#F6E27A"/><circle cx=".9" cy="-1.4" r=".3" fill="#F6E27A"/><path d="M-1.4 -3.9 l1.4 -1.2 1.4 1.2" fill="#3E8E3A"/><path d="M-6.8 4 L6.8 4" stroke="#E86A92" stroke-width=".8"/><path d="M-8 -12 L8 -12 L6.5 10 L-6.5 10Z" fill="url(#psCyl)"/><ellipse cx="0" cy="-12" rx="8.6" ry="2.2" fill="#C8CED6" stroke="#A2AAB4" stroke-width=".5"/><path d="M-5 -12.6 Q0 -13.8 5 -12.6" stroke="#FFFFFF" stroke-width=".8" fill="none"/><path d="M7.6 -12.3 l3.2 -1.6 .5 1.9Z" fill="#C8CED6" stroke="#A2AAB4" stroke-width=".4"/><path d="M-5.2 -9 L-4.2 7" stroke="#FFFFFF" stroke-width="1.2" opacity=".75"/></g>';
}
function yoghurt(it) { const n = cnt(it.qty, 4); let o = ''; for (let i = 0; i < n; i++) o += cup(11 + i * 17, 48); return [22 + (n - 1) * 17, 33, o]; }
function apple(x, y, s) {
  return '<g transform="translate(' + x + ' ' + y + ')"><path d="M0 -7 C-6 -11 -11 -6 -10 0 C-9 7 -4 10 0 8.5 C4 10 9 7 10 0 C11 -6 6 -11 0 -7Z" fill="url(#psApple' + (s === 2 ? 2 : 0) + ')" stroke="#8E1F1B" stroke-width=".6"/><path d="M2 -6 C6 -8 9 -4 8 1 C7 5 4 7 2 7 C5 3 5 -2 2 -6Z" fill="#E9A33A" opacity=".42"/><ellipse cx="-5" cy="-3" rx="2" ry="3.2" fill="#FFFFFF" opacity=".42" transform="rotate(20 -5 -3)"/>' + [[-3, 3], [4, -1], [1, 5], [-6, 1]].map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".35" fill="#F3C46A"/>').join('') + '<path d="M0 -7 C0 -10 1 -12 2.5 -13" stroke="#6B4423" stroke-width="1.1" fill="none" stroke-linecap="round"/><path d="M1.5 -11 C4 -14 8 -13 9 -11 C6 -9 3 -9.5 1.5 -11Z" fill="#4E9A3A"/><path d="M2 -11 L8 -11.4" stroke="#7DBE62" stroke-width=".4"/></g>';
}
function apples(it, s) { return cluster(cnt(it.qty, 5), 20, (x, y) => apple(x, y - 2, s)); }
function milk() {
  return [36, 2, '<path d="M24 18 L32 14 L32 56 L24 60Z" fill="#E1E9F1" stroke="#C3D0DD" stroke-width=".8"/><rect x="4" y="18" width="20" height="42" fill="url(#psCarton)" stroke="#C3D0DD" stroke-width=".8"/><path d="M4 18 L14 8 L24 18Z" fill="#F4F7FA" stroke="#C3D0DD" stroke-width=".8"/><path d="M24 18 L14 8 L22 4 L32 14Z" fill="#D6E0EA" stroke="#C3D0DD" stroke-width=".8"/><path d="M14 8 L22 4 L22 2 L14 6Z" fill="#EEF2F6" stroke="#C3D0DD" stroke-width=".6"/><rect x="16" y="10.5" width="6" height="3.5" rx="1" fill="#2A6FD6"/><ellipse cx="19" cy="10.5" rx="3" ry="1.2" fill="#5A93E6"/>' +
    '<path d="M4 40 Q9 36 14 40 T24 40 L24 52 L4 52Z" fill="#2A6FD6"/><path d="M24 40 L32 36 L32 48 L24 52Z" fill="#1F58AD"/><path d="M14 23 C11 27.5 11 30.5 14 30.5 C17 30.5 17 27.5 14 23Z" fill="#2A6FD6"/><path d="M7 33 h14 M9 35.5 h10" stroke="#9DB3CB" stroke-width=".9"/><path d="M8 44 l3 0 M8 47 h8" stroke="#FFFFFF" stroke-width="1" opacity=".85"/><path d="M6.5 20 L6.5 38" stroke="#FFFFFF" stroke-width="1.6" opacity=".9"/>'];
}
function eggs(it) {
  const n = Math.max(0, Math.min(10, Math.round(it.qty)));
  const egg = (x, y) => '<ellipse cx="' + x + '" cy="' + y + '" rx="5" ry="6.3" fill="url(#psEgg)" stroke="#C49464" stroke-width=".6"/><ellipse cx="' + (x - 1.7) + '" cy="' + (y - 2.4) + '" rx="1.5" ry="2.3" fill="#F5DCBC"/><circle cx="' + (x + 1.6) + '" cy="' + (y + 1.5) + '" r=".35" fill="#B88555"/>';
  const scal = (Y, h) => { let p = 'M3 ' + Y; for (let i = 0; i < 6; i++) p += ' Q' + (3 + i * 11.6 + 5.8) + ' ' + (Y + 4.5) + ' ' + (3 + (i + 1) * 11.6) + ' ' + Y; return p + ' L' + (73 - h * .2) + ' ' + (Y + h) + ' L' + (3 + h * .2) + ' ' + (Y + h) + 'Z'; };
  let o = '<path d="M6 30 L70 30 L66 13 L10 13Z" fill="#CFC7B8" stroke="#ADA592" stroke-width=".8"/>' + [0, 1, 2, 3, 4].map(i => '<ellipse cx="' + (17.5 + i * 10.3) + '" cy="21.5" rx="4" ry="3.2" fill="#BEB5A3"/>').join('');
  const front = Math.min(n, 5), back = Math.max(0, n - 5);
  for (let i = 0; i < 5; i++) o += i < back ? egg(14 + i * 12, 32) : '<ellipse cx="' + (14 + i * 12) + '" cy="35" rx="4.4" ry="2.2" fill="#B5AC9A"/>';
  o += '<path d="' + scal(35, 8) + '" fill="#D6CEBF" stroke="#ADA592" stroke-width=".7"/>';
  for (let i = 0; i < 5; i++) o += i < front ? egg(14 + i * 12, 44) : '<ellipse cx="' + (14 + i * 12) + '" cy="47" rx="4.4" ry="2.2" fill="#B5AC9A"/>';
  o += '<path d="' + scal(47, 13) + '" fill="#DCD4C5" stroke="#ADA592" stroke-width=".7"/><path d="M10 54 h56" stroke="#C7BEAE" stroke-width=".7"/>';
  return [76, 13, o];
}
function soy() {
  return [22, 1, '<path d="M8 7 L14 7 L14 16 Q19 20 19 26 L19 60 Q11 62 3 60 L3 26 Q3 20 8 16Z" fill="#2B1A10" stroke="#160C06" stroke-width=".6"/><path d="M8 7 L14 7 L14 16 Q19 20 19 26 L19 60 Q11 62 3 60 L3 26 Q3 20 8 16Z" fill="url(#psCyl)"/><path d="M5.5 27 L5.5 57" stroke="#FFFFFF" stroke-width="1.4" opacity=".28"/><path d="M15 22 Q17 25 17 30" stroke="#7A4A2A" stroke-width="1" fill="none" opacity=".7"/><rect x="6.5" y="1.5" width="9" height="6.5" rx="1.6" fill="#C8302A"/><path d="M7.5 3.5 h7 M7.5 5.5 h7" stroke="#9E2420" stroke-width=".5"/><rect x="3" y="33" width="16" height="17" fill="#F2E6C9"/><circle cx="11" cy="38.5" r="3.4" fill="#C8302A"/><path d="M9.6 37.2 h2.8 M11 36 v5" stroke="#F2E6C9" stroke-width=".8"/><path d="M6 44 v4 M8.5 44 v4 M13.5 44 v4 M16 44 v4" stroke="#7A4A2A" stroke-width=".7"/>'];
}
function can(x) {
  return '<g transform="translate(' + x + ' 0)"><rect x="0" y="27" width="18" height="31" fill="#F2C94C"/><rect x="0" y="49" width="18" height="6" fill="#2E7D4F"/>' + [[5, 36], [10, 34], [14, 38.5], [7, 41.5], [12, 43.5], [4, 45.5]].map(c => '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="2.5" fill="#E9D2A0" stroke="#C49F5E" stroke-width=".5"/>').join('') +
    '<rect x="0" y="27" width="18" height="31" fill="none" stroke="#B8902C" stroke-width=".6"/><path d="M0 30 h18 M0 55.5 h18" stroke="#B8902C" stroke-width=".5"/><ellipse cx="9" cy="58" rx="9" ry="2.2" fill="#BFC5CB" stroke="#9AA1A8" stroke-width=".5"/><ellipse cx="9" cy="27" rx="9" ry="2.6" fill="#D5DADF" stroke="#9AA1A8" stroke-width=".6"/><ellipse cx="9" cy="27" rx="6" ry="1.6" fill="none" stroke="#AEB5BC" stroke-width=".5"/><rect x="0" y="27" width="18" height="31" fill="url(#psCyl)"/></g>';
}
function cans(it) { const n = cnt(it.qty, 3); let o = ''; for (let i = 0; i < n; i++) o += can(3 + i * 20); return [4 + n * 20, 24, o]; }
function noodles(it) {
  const n = cnt(it.qty, 5), cols = ['#D8382E', '#E2702A', '#2F6FB5', '#D8382E', '#3E8E5B'];
  let o = '';
  for (let i = 0; i < n; i++) {
    const y = 50 - i * 9.5, x = 5 + (i % 2 ? 1.5 : -1), c = cols[i];
    o += '<path d="M' + x + ' ' + y + ' l-2.4 1.5 2.4 1.5 -2.4 1.5 2.4 1.5 -2.4 1.5 2.4 1.5 L' + (x + 44) + ' ' + (y + 9) + ' l2.4 -1.5 -2.4 -1.5 2.4 -1.5 -2.4 -1.5 2.4 -1.5 -2.4 -1.5Z" fill="' + c + '" stroke="#7A2A1E" stroke-width=".5"/>' +
      '<path d="M' + (x + 16) + ' ' + (y + 4.5) + ' q2 -2.4 4 0 t4 0 t4 0 t4 0 t4 0" stroke="#F7D046" stroke-width="1.2" fill="none"/><circle cx="' + (x + 9) + '" cy="' + (y + 4.5) + '" r="3" fill="#FFFFFF"/><path d="M' + (x + 7.5) + ' ' + (y + 4.5) + ' q1.5 -1.5 3 0" stroke="' + c + '" stroke-width=".8" fill="none"/><path d="M' + (x + 2) + ' ' + (y + 1.2) + ' h40" stroke="#FFFFFF" stroke-width=".7" opacity=".5"/>';
  }
  return [54, 50 - (n - 1) * 9.5, o];
}
function sack() {
  let o = '<path d="M8 22 Q6 16 12 14 L38 14 Q44 16 42 22 L46 58 Q25 62 4 58Z" fill="#EFE3C4" stroke="#C8B78E" stroke-width=".9"/>';
  for (let y = 20; y < 58; y += 3) o += '<path d="M7 ' + y + ' h36" stroke="#E2D4AE" stroke-width=".4"/>';
  o += '<path d="M12 14 Q16 5 25 8 Q34 5 38 14" fill="#E6D7B2" stroke="#C8B78E" stroke-width=".8"/><path d="M17 12 l2 -5 M25 11 v-4 M32 12 l-2 -5" stroke="#C8B78E" stroke-width=".6"/><rect x="19" y="11" width="12" height="3.4" rx="1" fill="#C0392B"/>';
  o += '<rect x="6" y="29" width="38" height="15" fill="#2E7D4F"/>' + grains(9, 14, 9, 41, 31, 42, '#FFFFFF', '#CFE3D5') + '<rect x="6" y="46" width="38" height="3" fill="#C0392B"/><path d="M10 52 h30 M14 55 h22" stroke="#B7A57C" stroke-width=".8"/><path d="M9 20 L8 56" stroke="#FFFFFF" stroke-width="1.6" opacity=".5"/>';
  return [50, 5, o];
}
function cafe() {
  return [46, 12, '<path d="M6 26 L38 26 L41 60 L3 60Z" fill="#C89B62" stroke="#9E7543" stroke-width=".8"/>' +
    '<path d="M11 28 C11 18 19 14 24 18 C27 13 35 15 34 22 C37 23 37 28 33 29Z" fill="#E0A044" stroke="#B57A26" stroke-width=".6"/><path d="M16 21 C18 23 18 26 17 28 M22 18 C24 21 24 25 23 28 M29 19 C30 22 30 25 29 28" stroke="#B57A26" stroke-width=".7" fill="none"/><path d="M14 20 C17 18 21 17 24 18" stroke="#F4C77A" stroke-width="1" fill="none"/>' +
    '<circle cx="34" cy="25" r="6.5" fill="#D8933C" stroke="#A86A22" stroke-width=".6"/>' + [[32, 22], [35, 21.5], [37, 24], [33, 25], [35.5, 27]].map(p => '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx=".8" ry=".45" fill="#FFF3D6"/>').join('') +
    '<path d="M5 30 L39 30" stroke="#9E7543" stroke-width=".7"/><path d="M5 30 l3 -3 3 3 3 -3 3 3 3 -3 3 3 3 -3 3 3 3 -3 3 3 3 -3 2 3" fill="none" stroke="#9E7543" stroke-width=".6"/>' +
    '<path d="M8 36 h28 M7 42 h30 M6 48 h32 M5 54 h34" stroke="#B58A52" stroke-width=".4"/><circle cx="22" cy="45" r="6" fill="#F7E9CF" stroke="#9E7543" stroke-width=".6"/><path d="M19 45 C19 42 25 42 25 45 C25 48 19 48 19 45Z" fill="#C0392B"/><path d="M7 33 L5 58" stroke="#FFFFFF" stroke-width="1.4" opacity=".35"/>'];
}
function capsicum() {
  return [36, 18, '<path d="M14 26 C6 26 4 36 6 46 C8 56 14 59 18 56 C22 59 28 56 30 46 C32 36 30 26 22 26 C20 24 16 24 14 26Z" fill="url(#psCap)" stroke="#2C7433" stroke-width=".7"/><path d="M18 27 C16 38 16 48 18 56 M12 30 C9 40 10 50 13 56 M24 30 C27 40 26 50 23 56" stroke="#2C7433" stroke-width=".6" fill="none" opacity=".7"/><path d="M10 32 C9 38 9 44 10 48" stroke="#9AD38E" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/><path d="M14 26 C16 23 20 23 22 26 C20 27 16 27 14 26Z" fill="#2C7433"/><path d="M18 24 C18 20 20 18 23 18" stroke="#3F6E2A" stroke-width="2" fill="none" stroke-linecap="round"/>'];
}
function jar() {
  return [30, 17, '<rect x="4" y="24" width="22" height="35" rx="5" fill="#EAF2F5" fill-opacity=".85" stroke="#B5C6CE" stroke-width=".9"/><rect x="6" y="33" width="18" height="24" rx="3.5" fill="#D9B676"/>' + grains(4, 12, 7, 23, 35, 55, '#E8CF98', '#B9965A') + '<rect x="3" y="17" width="24" height="8" rx="2" fill="#7A8791"/><path d="M4 19.5 h22 M4 22 h22" stroke="#5E6A73" stroke-width=".5"/><rect x="7" y="38" width="16" height="10" rx="1.5" fill="#FFFFFF" opacity=".92"/><path d="M9 41.5 h12 M9 44.5 h8" stroke="#7A8791" stroke-width=".8"/><path d="M7 27 L7 55" stroke="#FFFFFF" stroke-width="1.6" opacity=".7"/>'];
}
function genericMeat() { return [62, 22, tray(62) + '<path d="M12 50 C12 41 24 38 34 40 C44 38 52 43 50 50 C48 55 30 56 18 55 C14 54 12 53 12 50Z" fill="#D9645A" stroke="#B8463E" stroke-width=".6"/><path d="M17 47 C25 44 35 45 45 47 M20 51 C28 49 36 50 44 51" stroke="#F3C9B8" stroke-width="1.4" fill="none"/>' + film(62) + price(40, 47, true)]; }
function mystery() {
  return [56, 19, boxBack() + '<path d="M8 40 Q28 33 48 40 L48 54 Q28 57 8 54Z" fill="#BDB3A6"/><path d="M8 34 L48 34 L48 56 L8 56Z" fill="#FFFFFF" opacity=".55"/>' + boxFront('#9AA4AD') + '<circle cx="28" cy="43" r="7.5" fill="#F2C94C" stroke="#C79A1E" stroke-width=".7"/><path d="M25.2 40.6 Q25.2 37.6 28.2 37.6 Q31.2 37.6 31.2 40.4 Q31.2 42.4 28.2 43.4 L28.2 45" stroke="#5C3A00" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="28.2" cy="47.6" r="1.1" fill="#5C3A00"/>'];
}

const DRAW = {'Kai lan':kailan, 'Spinach':spinach, 'Chicken thigh':chicken, 'Prawns':prawns, 'Fish fillet':fish, 'Cooked rice':riceBox, 'Bread':bread, 'Bananas':bananaSet, 'Tofu':tofu, 'Tomatoes':tomatoes, 'Milk':milk, 'Eggs':eggs, 'Onions':onions, 'Carrots':carrots, 'Yoghurt':yoghurt, 'Apples':apples, 'Soy sauce':soy, 'Canned chickpeas':cans, 'Instant noodles':noodles, 'Jasmine rice (uncooked)':sack, 'Café surplus bag':cafe};
const BYCAT = {greens:kailan, veg:capsicum, fruit:apples, protein:genericMeat, dairy:milk, egg:eggs, bread:bread, grain:riceBox, pantry:jar, meal:leftover};
function frostBag(w, top, seed) {
  const r = rnd(seed + 41); let o = '<rect x="1" y="' + (top - 5) + '" width="' + (w - 2) + '" height="' + (66 - top) + '" rx="5" fill="#DCEFFB" fill-opacity=".45" stroke="#9CC8E6" stroke-width="1"/><rect x="1" y="' + (top - 5) + '" width="' + (w - 2) + '" height="3.5" rx="1.5" fill="#3F8FD0"/><rect x="5" y="' + (top + 1) + '" width="' + Math.min(22, w - 12) + '" height="7" rx="1.5" fill="#FFFFFF" opacity=".9"/><path d="M8 ' + (top + 4.5) + ' h' + Math.min(14, w - 18) + '" stroke="#3F8FD0" stroke-width=".9"/>';
  for (let i = 0; i < 16; i++) o += '<circle cx="' + f1(4 + r() * (w - 8)) + '" cy="' + f1(top + r() * (58 - top)) + '" r="' + f1(.5 + r() * 1.1) + '" fill="#FFFFFF" opacity=".9"/>';
  return o + '<g transform="translate(' + (w - 9) + ' ' + (top + 5) + ')" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round"><path d="M0 -4.5v9M-3.9 -2.25l7.8 4.5M-3.9 2.25l7.8 -4.5"/></g>';
}
function drawItem(it) {
  const s = stg(it);
  const f = it.prov ? mystery : isLeft(it) ? leftover : (DRAW[it.name] || BYCAT[it.cat] || jar);
  const d = f(it, s);
  let w = d[0], top = d[1], body = d[2];
  if (it.frozen) { body += frostBag(w, top, it.id); top -= 6; }
  return {w:w, top:Math.max(-6, top), body:body};
}
window.psDraw = drawItem;

/* ---------- icons everywhere ---------- */
const tileIcon = (it, s) => {
  s = s || 44;
  const d = drawItem(it), c = COL[it.prov ? PROV[it.prov].cat : it.cat] || COL.meal, y0 = d.top - 2, h = 66 - y0, k = Math.round(s * .84);
  return '<span class="fi fz-fi" style="width:' + s + 'px;height:' + s + 'px;background:' + c[0] + '"><svg viewBox="0 ' + y0 + ' ' + d.w + ' ' + h + '" width="' + k + '" height="' + k + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + d.body + '</svg></span>';
};
icoI = (it, s) => tileIcon(Object.assign({}, it, {qty:it.name === 'Eggs' ? it.qty : Math.min(it.qty, 3)}), s);
ico = (n, s) => { const c = info(n); return tileIcon({id:String(n).length * 7, name:n, cat:c.cat, qty:Math.min(c.qty, 3), days:6, frozen:false, listed:false, prov:null}, s); };

/* ---------- zones ---------- */
const ZONES = {
  freezer:['Freezer', 'Freezer: pauses food. Keep it at −18°C.'],
  top:['Top shelf', 'Top shelf: leftovers and ready-to-eat food.'],
  mid:['Middle shelf', 'Middle shelf: dairy, eggs, tofu. Milk at the back.'],
  bottom:['Bottom shelf', 'Bottom shelf: raw meat and fish, sealed.'],
  veg:['Veg drawer', 'Veg drawer: keeps greens crisp.'],
  fruit:['Fruit drawer', 'Fruit drawer: keep apples away from greens.'],
  cup:['Cupboard', 'Cupboard: rice, cans, noodles, sauces.'],
  counter:['Counter', 'Counter: bananas, tomatoes, onions.']
};
const EMPTY = {freezer:'Empty. Freeze bread or rice before it turns.', top:'No leftovers or cooked food.', mid:'Nothing here.', bottom:'No raw meat or seafood.', veg:'Empty.', fruit:'Empty.', cup:'Empty.', counter:'Nothing on the counter.'};
function zoneOf(it) {
  if (it.frozen || it.loc === 'freezer') return 'freezer';
  const c = it.prov ? PROV[it.prov].cat : it.cat;
  if (it.loc === 'pantry') return (c === 'fruit' || c === 'veg' || c === 'bread') ? 'counter' : 'cup';
  if (isLeft(it) || c === 'meal' || c === 'grain') return 'top';
  if (c === 'protein' && it.name !== 'Tofu') return 'bottom';
  if (c === 'dairy' || c === 'egg' || it.name === 'Tofu') return 'mid';
  if (c === 'fruit') return 'fruit';
  if (c === 'greens' || c === 'veg') return 'veg';
  return 'mid';
}
const shortN = n => n.replace('Leftover: ', '').replace(' (uncooked)', '').replace('Canned chickpeas', 'Chickpeas');
const tagOf = it => it.listed ? ['tl', 'Sharing'] : it.frozen ? ['tf', 'Frozen'] : it.days < 0 ? ['t2', 'Past date'] : it.days === 0 ? ['t2', 'Use today'] : it.days === 1 ? ['t1', 'Tomorrow'] : [it.days <= 2 ? 't1' : 't0', (it.est ? '~' : '') + it.days + ' days'];

const ZCOL = {freezer:'#6FA3DB', top:'#2F9E62', mid:'#3B82C4', bottom:'#D2483A', veg:'#7DBE62', fruit:'#E8923A', cup:'#8A6BB8', counter:'#D9A321'};
const ZWORD = {freezer:'ice blue', top:'green', mid:'blue', bottom:'red', veg:'light green', fruit:'orange', cup:'purple', counter:'yellow'};
const FRIDGE_Z = ['top', 'mid', 'bottom', 'veg', 'fruit'], SLOTS = 17;
const isBack = it => !!(S.back && S.back[it.id]) && !it.frozen;
function tileHTML(it, k, fresh) {
  const d = drawItem(it), back = isBack(it), t = back ? ['tb', 'At the back'] : tagOf(it), kk = back ? k * .84 : k, W = Math.round(d.w * kk);
  const match = !U.q || it.name.toLowerCase().indexOf(U.q.toLowerCase()) >= 0;
  return '<button class="fz-it' + (urgent(it) ? ' urg' : '') + (match ? (U.q ? ' hit' : '') : ' dim') + (fresh ? ' new' : '') + (it.listed ? ' listed' : '') + (back ? ' back' : '') + '" data-a="item" data-v="' + it.id + '" aria-label="' + esc(it.name) + ', ' + esc(qtyL(it)) + ', ' + t[1] + (back ? ', ' + tagOf(it)[1] : '') + '"><svg viewBox="0 -6 ' + d.w + ' 72" width="' + W + '" height="' + Math.round(72 * kk) + '" aria-hidden="true">' + d.body + '</svg><span class="fz-nm">' + esc(shortN(it.name)) + '</span><span class="fz-tag ' + t[0] + '">' + t[1] + '</span></button>';
}
function shelfHTML(z, its, k, glass, seen) {
  its = its.slice().sort((a, b) => (isBack(b) - isBack(a)) || (rank(a) - rank(b)));
  return '<div class="fz-shelf' + (glass ? ' gl' : '') + ' fz-' + z + '" style="--zc:' + ZCOL[z] + '"><div class="fz-lab"><button data-a="fzTip" data-v="' + z + '"><i class="zdot" style="background:' + ZCOL[z] + '"></i>' + ZONES[z][0] + '</button><span>' + (its.length ? its.length + ' item' + (its.length > 1 ? 's' : '') : '') + '</span></div>' +
    (its.length ? its.map(it => tileHTML(it, k, seen && seen[it.id] !== z)).join('') : '<span class="fz-empty">' + EMPTY[z] + '</span>') + '</div>';
}
function liveHTML() {
  let items = S.items.slice();
  if (S.htype === 'flat' && U.shelf && U.shelf !== 'all') items = items.filter(i => U.shelf === 'shared' ? S.shared[i.id] : !S.shared[i.id]);
  const by = {}; Object.keys(ZONES).forEach(z => by[z] = []);
  items.forEach(it => by[zoneOf(it)].push(it));
  const seen = U.fzSeen, now = {}; items.forEach(it => now[it.id] = zoneOf(it));
  const urg = items.filter(urgent).length, newest = items.slice().sort((a, b) => b.id - a.id)[0];
  const inFridge = FRIDGE_Z.reduce((n, z) => n + by[z].length, 0), full = Math.min(100, Math.round(inFridge / SLOTS * 100));
  const backN = items.filter(isBack).length, toPut = items.filter(i => i.src === 'receipt' && !i.put && !i.frozen), t = S.ftemp, warm = t > 5;
  let h = '<div class="fz' + (U.fzSpot ? ' spot' : '') + (U.fzAnim ? ' fz-open' : '') + '">';
  h += '<div class="fz-live"><span class="fz-dot"></span><span class="grow"><b>Live</b> <span style="color:#4F5851">· ' + (newest ? 'Latest: ' + esc(shortN(newest.name)) + ', added by ' + (newest.by === 'me' ? 'you' : mem(newest.by)[1]) : 'Updates as anyone at home logs food') + '</span></span></div>';
  if (U.q) { const m = items.filter(i => i.name.toLowerCase().indexOf(U.q.toLowerCase()) >= 0).slice(0, 3); h += '<div class="note" style="background:#F1F7F2;border-color:#CFE0D4;color:#174F33">' + svg('search', 18) + '<span>' + (m.length ? m.map(i => { const z = zoneOf(i); return '<b>' + esc(shortN(i.name)) + '</b>: ' + ZONES[z][0].toLowerCase() + ' (' + ZWORD[z] + ' zone)' + (isBack(i) ? ', hidden at the back' : ''); }).join('<br>') : 'Not in your kitchen.</span><button class="chip" style="min-height:40px;margin-left:auto" data-a="qShop">' + svg('plus', 16) + 'Add to list</button><span>') + '</span></div>'; }
  if (toPut.length) h += '<button class="card row acc-g" style="text-align:left" data-a="putAway"><span class="fi" style="width:44px;height:44px;background:#1F6B45;color:#fff">' + svg('bag', 22) + '</span><span class="grow"><b style="display:block">' + toPut.length + ' new item' + (toPut.length > 1 ? 's' : '') + ' to put away</b><span class="sub">We’ll show where each goes, with older food moved to the front</span></span>' + svg('next', 20) + '</button>';
  if (S.ed && S.ed.on) h += '<button class="card row acc-o" style="text-align:left" data-a="eatDown"><span class="fi" style="width:44px;height:44px;background:#C2410C;color:#fff">' + svg('flame', 22) + '</span><span class="grow"><b style="display:block">Eat-down week · day ' + Math.max(1, Math.min(5, (S.dn != null ? S.dn : S.day) - S.ed.start + 1)) + ' of 5</b><span class="sub">' + Math.max(0, S.ed.n0 - S.items.length) + ' of ' + S.ed.n0 + ' items eaten down. Only top up fresh essentials.</span></span></button>';
  h += '<div class="wrap"><button class="chip" data-a="fzSpot" aria-pressed="' + !!U.fzSpot + '">' + svg('alert', 14) + 'Eat-first · ' + urg + '</button>' + (backN ? '<button class="chip" data-a="fzRotate">' + svg('swap', 14) + 'Bring ' + backN + ' to the front</button>' : '') + '<button class="chip" data-a="fzMap">' + svg('fridge', 14) + 'Door map</button><button class="chip" data-a="fzDemo">' + svg('bag', 14) + 'Demo: new groceries</button></div>';
  h += '<div class="fz-unit' + (warm ? ' warm' : '') + '"><div class="fz-door"></div><div class="fz-panel"><span class="col" style="gap:3px"><span>Jiak Clean fridge</span><span class="fz-full" title="How full the fridge is"><b style="width:' + full + '%;background:' + (full > 80 ? '#C2410C' : full > 60 ? '#D9A321' : '#1F9D55') + '"></b></span></span><span class="row" style="gap:6px"><i>' + svg('snow', 12) + '−18°C</i><button class="fz-tbtn' + (warm ? ' hot' : '') + '" data-a="fzTemp" aria-label="Fridge temperature ' + t + ' degrees. Tap to check">' + t + '°C</button></span></div>';
  h += '<div class="fz-note">' + (warm ? '<b style="color:#B13C0B">' + t + '°C is too warm.</b> Tap it to fix. Aim below 5°C.' : full > 80 ? '<b style="color:#B13C0B">' + full + '% full.</b> Crowded fridges hide food at the back. Eat down before a big shop.' : full + '% full · ' + (S.fchk ? 'temperature checked' : 'tap the temperature to check it')) + '</div>';
  h += '<div class="fz-comp fz-frz">' + shelfHTML('freezer', by.freezer, 1.3, false, seen) + '</div>';
  h += '<div class="fz-comp"><div class="fz-led"></div>' + shelfHTML('top', by.top, 1.45, true, seen) + shelfHTML('mid', by.mid, 1.45, true, seen) + shelfHTML('bottom', by.bottom, 1.45, true, seen);
  h += '<div class="fz-drawers"><div class="fz-drawer">' + shelfHTML('veg', by.veg, 1.12, false, seen) + '</div><div class="fz-drawer fruit">' + shelfHTML('fruit', by.fruit, 1.12, false, seen) + '</div></div></div><div class="fz-feet"></div></div>';
  h += '<div class="fz-pan"><div class="fz-cup">' + shelfHTML('cup', by.cup, 1.3, false, seen) + '</div><div class="fz-ctr">' + shelfHTML('counter', by.counter, 1.3, false, seen) + '</div></div>';
  h += '<div class="fz-legend"><span class="fz-tag t2">Use today</span><span class="fz-tag t1">Soon</span><span class="fz-tag t0">Fine</span><span class="fz-tag tf">Frozen</span><span class="fz-tag tb">At the back</span><span>Tap any food for details.</span></div>' + (window.SRC ? SRC('Colour zones: Farr-Wharton, QUT; fridge placement: Linköping University') : '');
  U.fzSeen = now; U.fzAnim = false;
  return h + '</div>';
}
window.psFz = {zoneOf:zoneOf, ZONES:ZONES, ZCOL:ZCOL, ZWORD:ZWORD, draw:drawItem, isBack:isBack};

/* ---------- kitchen screen ---------- */
const MARK = '<div class="row" style="position:relative">';
const toggle = () => '<div class="seg fz-seg" style="--n:2"><button data-a="kv" data-v="live" aria-pressed="' + (U.kv !== 'list') + '">' + svg('fridge', 16) + 'Live fridge</button><button data-a="kv" data-v="list" aria-pressed="' + (U.kv === 'list') + '">' + svg('list', 16) + 'List</button></div>';
const kitchen4 = kitchenHTML;
kitchenHTML = function () {
  const html = kitchen4();
  if (U.kt !== 'fridge') return html;
  const i = html.indexOf(MARK); if (i < 0) return html;
  if (U.kv === 'list') return html.slice(0, i) + toggle() + html.slice(i);
  const search = '<div class="row" style="position:relative"><span style="position:absolute;left:14px;color:#5B645D">' + svg('search', 18) + '</span><label for="ksearch" style="position:absolute;left:-9999px">Find food in your kitchen</label><input id="ksearch" class="input" style="padding-left:42px" placeholder="Find food in the fridge" value="' + esc(U.q) + '" data-in="q"></div>';
  const prov = S.items.filter(x => x.prov);
  const note = prov.length ? '<button class="note" style="border:1px solid #F0E0B4;text-align:left;width:100%" data-a="openConfirm">' + svg('help', 18) + '<span><b>' + prov.length + ' rough guess' + (prov.length > 1 ? 'es' : '') + ' to confirm.</b> Shown as yellow “?” tubs. Tap to name them.</span></button>' : '';
  return html.slice(0, i) + toggle() + search + note + liveHTML() + '</div>';
};

/* ---------- item sheet hero ---------- */
const NOTES = {
  'Bananas':['Yellow with green tips: still ripening', 'A few brown spots: ripe and sweet', 'Lots of spots: perfect for pancakes, smoothies or the freezer'],
  'Kai lan':['Crisp, glossy leaves', 'Cook the leaves first; stems keep longer', 'Leaves drooping: stir-fry it today'],
  'Spinach':['Fresh and perky', 'Use soon in eggs or soup', 'Wilting: fine cooked, bin it if slimy'],
  'Tomatoes':['Firm and bright', 'Softening: great for sauces', 'Wrinkly: cook into fried rice or sauce today'],
  'Bread':['Fresh loaf', 'Toast it, or freeze some slices', 'Going stale: make French toast today'],
  'Apples':['Crisp', 'Still good for snacks', 'Soft: bake or stew them'],
  'Chicken thigh':['Well before its use-by date', 'Cook or freeze in the next day or two', 'Use-by day: cook or freeze it today']
};
function heroHTML(it) {
  const z = zoneOf(it), k = 1.9, d = drawItem(it), s = stg(it), nm = NOTES[it.name] || (isLeft(it) ? ['Freshly cooked', 'Eat by tomorrow', 'Eat today, or bin it after 2 days'] : ['Fresh: no rush', 'Use in the next day or two', 'Use today']);
  const cls = z === 'freezer' ? ' frz' : (z === 'cup' || z === 'counter') ? ' pan' : '';
  let h = '<div class="fz-hero' + cls + '"><svg viewBox="0 ' + (d.top - 2) + ' ' + d.w + ' ' + (66 - d.top + 2) + '" width="' + Math.round(Math.min(d.w * k, 150)) + '" height="' + Math.round((66 - d.top + 2) * k * Math.min(1, 150 / (d.w * k))) + '" aria-hidden="true">' + d.body + '</svg><span class="col" style="gap:4px"><span class="sub" style="font-weight:800;color:#1F6B45">' + ZONES[z][0].toUpperCase() + '</span><b style="font-size:15px;line-height:1.3">' + (it.frozen ? 'Frozen and paused. Thaw it in the fridge, then use it within a day.' : nm[s]) + '</b><span class="sub">' + ZONES[z][1].split(': ').slice(1).join(': ') + '</span></span></div>';
  if (!it.frozen && !it.prov) {
    const ex = [5, 2, 0].map(dd => Object.assign({}, it, {days:dd, frozen:false}));
    h += '<b style="font-size:14px">How it changes</b><div class="fz-stages">' + ex.map((e, i) => { const x = drawItem(Object.assign(e, {qty:Math.min(e.qty, 3)})); return '<div class="' + (i === s ? 'on' : '') + '"><svg viewBox="0 ' + (x.top - 2) + ' ' + x.w + ' ' + (66 - x.top + 2) + '" width="60" height="46" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + x.body + '</svg>' + ['Fresh', 'Soon', 'Use today'][i] + '</div>'; }).join('') + '</div>';
  }
  return h;
}
const sheet5 = sheetHTML;
sheetHTML = function () {
  let html = sheet5();
  if (U.sheet === 'item') {
    const it = find(U.sd.id), close = iconBtn('closeSheet', 'close', 'Close') + '</div>', i = html.indexOf(close);
    if (it && i >= 0) html = html.slice(0, i + close.length) + heroHTML(it) + html.slice(i + close.length);
  }
  return html;
};

/* ---------- actions ---------- */
const GROC = [['Yoghurt', {qty:4}], ['Apples', {qty:4}], ['Fish fillet', {}], ['Carrots', {qty:5}], ['Prawns', {}], ['Spinach', {}]];
const tab5 = A.tab, kt5 = A.kt;
Object.assign(A, {
  kv: v => { U.kv = v; U.fzAnim = v === 'live'; paint(); },
  fzSpot: () => { U.fzSpot = !U.fzSpot; paint(); },
  fzTip: z => toast(ZONES[z][1]),
  fzDemo: () => {
    const k = S.fzG || 0, pick = [GROC[(k * 2) % GROC.length], GROC[(k * 2 + 1) % GROC.length]];
    S.fzG = k + 1;
    pick.forEach(p => S.items.push(mk(p[0], Object.assign({by:'mei', est:true, src:'receipt'}, p[1]))));
    save(); paint();
    toast('Mei just added ' + pick.map(p => p[0].toLowerCase()).join(' and ') + '. They appear on the right shelves.');
  },
  tab: v => { if (v === 'kitchen') U.fzAnim = true; tab5(v); },
  kt: v => { if (v === 'fridge') U.fzAnim = true; kt5(v); }
});
document.querySelector('.guide').addEventListener('click', e => {
  const b = e.target.closest('[data-j]'); if (!b || b.dataset.j !== 'fridge') return;
  S.mode = 'standard'; S.role = 'owner'; S.tab = 'kitchen'; U.kt = 'fridge'; U.kv = 'live'; U.loc = 'all'; U.q = ''; U.fzAnim = true; U.fzSeen = null; U.stack = []; U.sheet = null;
  save(); paint();
});
if (S) paint();
})();
