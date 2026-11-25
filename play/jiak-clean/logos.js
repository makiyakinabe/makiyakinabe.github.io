/* Jiak Clean logo set: four marks in the app's style, switchable from the guide panel */
(function () {
const G = '#1F6B45', P = '#F6F7F2', O = '#E8642C', Y = '#F2B632';
const wrap = (s, inv, body, label) => '<svg width="' + s + '" height="' + s + '" viewBox="0 0 64 64" fill="none" ' + (label ? 'role="img" aria-label="' + label + '"' : 'aria-hidden="true"') + '><rect width="64" height="64" rx="18" fill="' + (inv ? G : P) + '"/>' + body + '</svg>';
const MARKS = {
  grain: ['Last Grain', 'An empty bowl and the one last grain of rice. Finish every grain.', (s, inv, l) => { const f = inv ? P : G; return wrap(s, inv,
    '<path d="M10 30h44a22 22 0 0 1-44 0z" fill="' + f + '"/><rect x="24" y="50" width="16" height="5" rx="2.5" fill="' + f + '"/><path d="M16 36a17 17 0 0 0 9 11" stroke="' + (inv ? G : P) + '" stroke-width="2.6" stroke-linecap="round" opacity=".55"/>' +
    '<ellipse cx="32" cy="17" rx="4.6" ry="7.6" transform="rotate(28 32 17)" fill="' + Y + '"/><path d="M30.500 13.500q2.500 1 3 5" stroke="#fff" stroke-width="1.600" stroke-linecap="round" opacity=".8"/>' +
    '<path d="M44 9v6M41 12h6M19 12v4M17 14h4" stroke="' + O + '" stroke-width="2.4" stroke-linecap="round"/>', l); }],
  plate: ['Clean Plate', 'A spotless plate, with chopsticks crossing into a tick.', (s, inv, l) => { const f = inv ? P : G; return wrap(s, inv,
    '<circle cx="32" cy="33" r="21" stroke="' + f + '" stroke-width="4"/><circle cx="32" cy="33" r="12.500" stroke="' + f + '" stroke-width="2" opacity=".4"/>' +
    '<path d="M22 32l8 9" stroke="' + O + '" stroke-width="5" stroke-linecap="round"/><path d="M30 41L52 11" stroke="' + O + '" stroke-width="5" stroke-linecap="round"/><path d="M34 41L56 15" stroke="' + Y + '" stroke-width="3.4" stroke-linecap="round"/>', l); }],
  bao: ['Happy Bao', 'Bao the fridge buddy, full and happy after a clean plate.', (s, inv, l) => wrap(s, inv,
    '<path d="M9 40C9 23 20 13 32 13s23 10 23 27c0 9-9 12-23 12S9 49 9 40z" fill="#FFFDF7" stroke="' + (inv ? '#FFFDF7' : G) + '" stroke-width="' + (inv ? 0 : 3) + '"/>' +
    '<path d="M32 13q-1.500 6-7 8M32 13q1.500 6 7 8M32 13v9" stroke="#DCC59B" stroke-width="2" stroke-linecap="round"/><path d="M32 13q1-8 9-9q-1 8-9 9z" fill="' + (inv ? '#9FD4B2' : '#2F9E62') + '"/>' +
    '<path d="M20 34q3.500-4.500 7 0M37 34q3.500-4.500 7 0" stroke="#3D3520" stroke-width="2.800" stroke-linecap="round"/><path d="M26 40q6 7 12 0z" fill="' + O + '" stroke="#3D3520" stroke-width="2" stroke-linejoin="round"/><circle cx="17" cy="40" r="3.500" fill="#F7B5A3"/><circle cx="47" cy="40" r="3.500" fill="#F7B5A3"/>', l)],
  jspoon: ['J Spoon', 'A “J” made from a spoon, scooping up the very last bite.', (s, inv, l) => { const f = inv ? P : G; return wrap(s, inv,
    '<path d="M38 26v14a11 11 0 0 1-22 0" stroke="' + f + '" stroke-width="7" stroke-linecap="round"/><ellipse cx="38" cy="18" rx="8" ry="10" fill="' + f + '"/><ellipse cx="36" cy="15" rx="2.600" ry="4" fill="' + (inv ? G : P) + '" opacity=".35"/>' +
    '<path d="M48 44c0-6 3.500-9.500 9-10-.500 6-4 10-9 10z" fill="' + Y + '"/><circle cx="16" cy="28" r="3.400" fill="' + O + '"/>', l); }]
};
let cur = 'grain';
/* Last Grain chosen as the brand mark; picker hidden unless ?logos is in the URL */
const PICK = /[?&]logos\b/.test(location.search);
if (PICK) try { const v = localStorage.getItem('jc_logo'); if (v && MARKS[v]) cur = v; } catch (e) {}
logo = (s, inv) => MARKS[cur][2](s, inv);
window.psLogo = {marks:MARKS, get:() => cur};

document.head.insertAdjacentHTML('beforeend', '<style>' +
'.guide .lockup{display:flex;align-items:center;gap:12px;margin:0 0 10px}' +
'.guide .lockup b{font-size:34px;font-weight:800;letter-spacing:-.02em;color:#18201A;line-height:1}.guide .lockup b i{font-style:normal;color:#1F6B45}' +
'.guide .lg4{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0 6px}' +
'.guide .lg4 button{display:flex;flex-direction:column;gap:6px;align-items:flex-start;text-align:left;padding:10px;border-radius:16px;border:2px solid #E3E6DE;background:#fff;font:inherit;color:#18201A;cursor:pointer}' +
'.guide .lg4 button[aria-pressed="true"]{border-color:#1F6B45;background:#F1F7F2}' +
'.guide .lg4 button:focus-visible{outline:3px solid #1F6B45;outline-offset:2px}' +
'.guide .lg4 .pair{display:flex;gap:6px}' +
'.guide .lg4 b{font-size:14px}.guide .lg4 small{font-size:12px;color:#4F5851;line-height:1.3}' +
'</style>');

function draw() {
  const g = document.querySelector('.guide'); if (!g) return;
  const h1 = g.querySelector('h1'); if (h1) { h1.outerHTML = '<div class="lockup" id="lockup"></div>'; }
  const lk = g.querySelector('#lockup'); if (lk) lk.innerHTML = MARKS[cur][2](52, true, 'Jiak Clean logo') + '<b>Jiak <i>Clean</i></b>';
  if (!PICK) return;
  let box = g.querySelector('#logoPick');
  if (!box) { const p = g.querySelector('p'); if (!p) return; p.insertAdjacentHTML('afterend', '<h2>Pick a logo</h2><div class="lg4" id="logoPick"></div>'); box = g.querySelector('#logoPick'); }
  box.innerHTML = Object.keys(MARKS).map(k => '<button data-logo="' + k + '" aria-pressed="' + (k === cur) + '"><span class="pair">' + MARKS[k][2](52, true) + MARKS[k][2](52, false) + '</span><b>' + MARKS[k][0] + '</b><small>' + MARKS[k][1] + '</small></button>').join('');
}
document.addEventListener('click', e => {
  const b = e.target.closest && e.target.closest('[data-logo]'); if (!b) return;
  cur = b.dataset.logo; try { localStorage.setItem('jc_logo', cur); } catch (err) {}
  draw(); if (typeof paint === 'function' && S) paint();
});
draw();
})();
