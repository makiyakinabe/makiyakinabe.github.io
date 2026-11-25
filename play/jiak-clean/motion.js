/* Jiak Clean: one design language + motion for infographics */
(function () {
document.head.insertAdjacentHTML('beforeend', '<style>' +
/* accent cards: one recipe, five tints (matches the core Leftovers Hub, Rescue roulette and Quick checks cards) */
'.ps .card.acc-g{background:#E9F2EC;border:1px solid #CFE0D4}' +
'.ps .card.acc-o{background:#FCEDE4;border:1px solid #F4D6C6}' +
'.ps .card.acc-p{background:#F3EEF9;border:1px solid #DCCFEA}' +
'.ps .card.acc-a{background:#FFF8E6;border:1px solid #F0E0B4}' +
'.ps .card.acc-r{background:#FDE7DC;border:1px solid #F5C6B0}' +
'.ps .card.acc-b{background:#E3EDF9;border:1px solid #C9DAF0}' +
/* one card-title style everywhere */
'.ps .card > b:first-child,.ps .card > .between > b:first-child,.ps .card > .between > h2.h2,.ps .card > h2.h2{font-size:16px;font-weight:800;letter-spacing:-.01em;line-height:1.25}' +
/* stat tiles and source lines sit on the same surface */
'.ps .card .igt{background:rgba(255,255,255,.75);box-shadow:inset 0 0 0 1px rgba(24,32,26,.06)}' +
'.ps .acc-g .igt,.ps .acc-o .igt,.ps .acc-p .igt{background:#fff}' +
/* living garden */
'.ps .pl{transform-box:fill-box;transform-origin:50% 100%;animation:psSway 4.6s ease-in-out infinite;animation-delay:calc(var(--d) * -.55s)}' +
'@keyframes psSway{0%,100%{transform:rotate(-2.2deg)}50%{transform:rotate(2.2deg)}}' +
'.ps .bob{animation:psBob 3.2s ease-in-out infinite}@keyframes psBob{50%{transform:translate(-6px,-3px)}}' +
'.ps .flut{animation:psFlut 2.6s ease-in-out infinite}@keyframes psFlut{0%,100%{transform:translate(0,0)}33%{transform:translate(4px,-5px)}66%{transform:translate(-3px,-2px)}}' +
/* rice steam and fridge light */
'.ps .fz-led{animation:psLed 5s ease-in-out infinite}@keyframes psLed{50%{opacity:.82}}' +
'@media (prefers-reduced-motion:reduce){.ps .pl,.ps .bob,.ps .flut,.ps .fz-led,.ps .fz-it.urg svg,.ps .fz-dot{animation:none!important}}' +
'</style>');

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'cubic-bezier(.2,.8,.2,1)';
let ctx = '', vals = {};
const ctxKey = () => { const top = U.stack.length ? U.stack[U.stack.length - 1].t : ''; return [S.mode, S.tab, top, U.sheet || '', U.kt, U.ct, U.kv, S.onboarded, U.impT].join('|'); };

/* numbers that count up */
function parse(t) {
  if (/–|\d\s*-\s*\d/.test(t)) return null;
  const m = /^([^\d]*?)(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(t);
  if (!m) return null;
  const raw = m[2];
  return {pre:m[1], n:parseFloat(raw.replace(/,/g, '')), dec:(raw.split('.')[1] || '').length, comma:raw.indexOf(',') >= 0, post:m[3]};
}
const fmt = (p, v) => { let s = v.toFixed(p.dec); if (p.comma) s = Number(s).toLocaleString('en-US', {minimumFractionDigits:p.dec, maximumFractionDigits:p.dec}); return p.pre + s + p.post; };
function countUp(el, from, p, delay) {
  const t0 = performance.now() + delay, dur = 950;
  el.textContent = fmt(p, from);
  const step = now => { const k = Math.min(1, Math.max(0, (now - t0) / dur)), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(p, from + (p.n - from) * e); if (k < 1 && el.isConnected) requestAnimationFrame(step); else el.textContent = fmt(p, p.n); };
  requestAnimationFrame(step);
}
function tweenMerc(el, from, to) {
  const t0 = performance.now(), dur = 700;
  const set = f => { el.setAttribute('y', 138 - f); el.setAttribute('height', f); };
  set(from);
  const step = now => { const k = Math.min(1, Math.max(0, (now - t0) / dur)), e = 1 - Math.pow(1 - k, 3); set(Math.max(0, from + (to - from) * e)); if (k < 1 && el.isConnected) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

function run() {
  const k = ctxKey(), fresh = k !== ctx;
  if (fresh) { ctx = k; vals = {}; }
  if (reduce()) return;
  const root = document.getElementById('app');

  /* bars grow (widths) and columns rise (heights) */
  [['.hb .tr i', 'width'], ['.bar i', 'width'], ['.fz-full b', 'width'], ['.bars i', 'height'], ['.jar i', 'height']].forEach((d, si) => {
    root.querySelectorAll(d[0]).forEach((el, i) => {
      const key = 'b' + si + ':' + i, target = el.style[d[1]]; if (!target) return;
      const prev = vals[key]; vals[key] = target;
      if (prev === target) return;
      el.animate([{[d[1]]:prev !== undefined ? prev : (d[1] === 'height' ? '4px' : '0%')}, {[d[1]]:target}], {duration:prev !== undefined ? 600 : 1000, delay:prev !== undefined ? 0 : 140 + (i % 8) * 90, easing:EASE, fill:'backwards'});
    });
  });

  /* big numbers count up */
  root.querySelectorAll('.igt b, .hero b, .bars b, .hb em, .fz-panel .fz-tbtn, .mf2 + b, [data-count]').forEach((el, i) => {
    if (el.children.length) return;
    const t = el.textContent.trim(), p = parse(t); if (!p) return;
    const key = 'n:' + i, prev = vals[key]; vals[key] = t;
    if (prev === t) return;
    const pp = prev !== undefined ? parse(prev) : null;
    countUp(el, pp && pp.pre === p.pre && pp.post === p.post ? pp.n : 0, p, prev !== undefined ? 0 : 160 + (i % 6) * 90);
  });

  /* donut rings draw themselves */
  root.querySelectorAll('.igt svg circle[stroke-dasharray]').forEach((el, i) => {
    const key = 'r:' + i, t = el.getAttribute('stroke-dasharray');
    if (vals[key] === t) return; vals[key] = t;
    el.animate([{strokeDasharray:'0 100.5'}, {strokeDasharray:t}], {duration:1200, delay:220, easing:EASE, fill:'backwards'});
  });

  /* stat tiles, steps and stage cards rise in when a screen opens */
  if (fresh) root.querySelectorAll('.igt, .fz-stages > div, .steps3 > div, .lst > div, .mf2 > div, .shelfie > span, .sticker').forEach((el, i) => el.animate([{opacity:0, transform:'translateY(10px) scale(.96)'}, {opacity:1, transform:'none'}], {duration:480, delay:60 + Math.min(i, 14) * 55, easing:EASE, fill:'backwards'}));

  /* thermometer mercury slides to the new temperature */
  const m = root.querySelector('.merc');
  if (m) { const f = +m.dataset.fill, prev = vals.merc; vals.merc = f; if (prev !== f) tweenMerc(m, prev === undefined ? 0 : prev, f); }

  /* rice cups fill up */
  root.querySelectorAll('.cupfill').forEach((el, i) => {
    const key = 'c:' + i, y = +el.getAttribute('y'), prev = vals[key]; vals[key] = y;
    if (prev === y) return;
    el.animate([{transform:'translateY(' + (prev === undefined ? 34 : prev - y) + 'px)'}, {transform:'none'}], {duration:750, delay:prev === undefined ? 200 + i * 160 : 0, easing:EASE, fill:'backwards'});
  });

  /* garden: plants sprout when the garden opens, new ones pop when you rescue food */
  root.querySelectorAll('svg').forEach((sv, si) => {
    const pls = sv.querySelectorAll('.pl'); if (!pls.length) return;
    const key = 'g:' + si, prev = vals[key]; vals[key] = pls.length;
    const from = prev === undefined ? (fresh ? 0 : pls.length) : prev;
    for (let i = from; i < pls.length; i++) pls[i].animate([{transform:'scale(0)'}, {transform:'scale(1.15)', offset:.7}, {transform:'scale(1)'}], {duration:650, delay:(i - from) * 45, easing:EASE, fill:'backwards'});
  });

  /* myth or fact verdict and LST result pop */
  root.querySelectorAll('.mf .pill, .lst div.ok, .lst div.bad').forEach((el, i) => {
    const key = 'p:' + i + el.textContent, prev = vals[key]; vals[key] = 1;
    if (prev) return;
    el.animate([{transform:'scale(.6)', opacity:0}, {transform:'scale(1.08)', opacity:1, offset:.6}, {transform:'scale(1)'}], {duration:420, easing:EASE});
  });
}

const paint7 = paint;
paint = function () { paint7(); try { run(); } catch (e) { console.warn('motion', e); } };
if (S) paint();
})();
