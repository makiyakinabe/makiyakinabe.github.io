/* Jiak Clean: calmer screens. Impact split into tabs; extra settings folded away. */
(function () {
document.head.insertAdjacentHTML('beforeend', '<style>' +
'.ps details.mset{border-radius:16px;background:#F6F7F2;border:1px solid #E3E6DE;padding:0 14px}' +
'.ps details.mset summary{list-style:none;display:flex;align-items:center;justify-content:space-between;min-height:52px;font-weight:800;font-size:15px;cursor:pointer}' +
'.ps details.mset summary::-webkit-details-marker{display:none}' +
'.ps details.mset summary::after{content:"+";font-size:22px;font-weight:600;color:#1F6B45}' +
'.ps details.mset[open] summary::after{content:"−"}' +
'.ps details.mset[open]{padding-bottom:14px}' +
'.ps details.mset summary span{font-weight:600;font-size:13px;color:#5B645D;margin-left:8px}' +
'.ps .imp-tabs{position:sticky;top:0;z-index:3;background:inherit;padding:4px 0}' +
'</style>');

/* ---------- Impact tabs ---------- */
const TABS3 = [['week', 'This week'], ['progress', 'Progress'], ['community', 'Community']];
const RULES = [
  [/^Singapore’s food waste|^Learn & donate|^Your block/, 'community'],
  [/^Rescue streak|^Weekly badge|^Household goal|^Skills you’ve earned|^Kitchen garden/, 'progress'],
  [/./, 'week']
];
const ORDER = {progress:['Rescue streak', 'Weekly badge', 'Household goal', 'Kitchen garden', 'Skills']};
function impactTabs() {
  if (S.mode !== 'standard' || S.tab !== 'impact' || U.stack.length) return;
  const sc = document.querySelector('#app .scroll'); if (!sc) return;
  let col = sc; while (col.children.length === 1) col = col.children[0];
  const kids = [...col.children]; if (kids.length < 4) return;
  const cur = U.impT || 'week';
  const seg = document.createElement('div');
  seg.className = 'imp-tabs';
  seg.innerHTML = '<div class="seg" style="--n:3">' + TABS3.map(t => '<button data-a="impT" data-v="' + t[0] + '" aria-pressed="' + (cur === t[0]) + '">' + t[1] + '</button>').join('') + '</div>';
  kids[0].after(seg);
  const groups = {week:[], progress:[], community:[]};
  kids.slice(1).forEach(ch => {
    const t = ch.textContent.trim();
    const g = RULES.find(r => r[0].test(t))[1];
    groups[g].push(ch);
    ch.style.display = g === cur ? '' : 'none';
  });
  if (cur === 'progress') {
    const sorted = groups.progress.slice().sort((a, b) => ORDER.progress.findIndex(p => a.textContent.trim().indexOf(p) === 0) - ORDER.progress.findIndex(p => b.textContent.trim().indexOf(p) === 0));
    sorted.forEach(el => col.appendChild(el));
  }
}
A.impT = v => { U.impT = v; paint(); const sc = document.querySelector('#app .scroll'); if (sc) sc.scrollTop = 0; };

const paint9 = paint;
paint = function () { paint9(); try { impactTabs(); } catch (e) { console.warn('impact tabs', e); } };
if (S) paint();
})();
