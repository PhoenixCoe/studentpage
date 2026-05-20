// ── Week counter ──
(function() {
  const badge = document.getElementById('weekBadge');
  if (!badge) return;

  function getMondayOf(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0) ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  const anchor     = new Date('2025-09-01');
  const anchorMon  = getMondayOf(anchor);
  const thisMon    = getMondayOf(new Date());
  const weeksDiff  = Math.round((thisMon - anchorMon) / (7 * 24 * 60 * 60 * 1000));
  const weekNum    = ((weeksDiff % 2) + 2) % 2 === 0 ? 1 : 2;
  badge.textContent = `Week ${weekNum}`;
})();

// ── Dyslexia-friendly font toggle ──
(function() {
  const btn = document.getElementById('dyslexiaToggle');
  if (!btn) return;

  const KEY = 'ia-dyslexic-font';

  const apply = (on) => {
    document.body.classList.toggle('dyslexic', on);
    btn.classList.toggle('active', on);
    btn.title = on ? 'Switch to standard font' : 'Switch to dyslexia-friendly font';
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch(e) {}
  };

  try { if (localStorage.getItem(KEY) === '1') apply(true); } catch(e) {}
  btn.addEventListener('click', () => apply(!document.body.classList.contains('dyslexic')));
})();

// ── School Map modal ──
(function() {
  const btn      = document.getElementById('mapBtn');
  const modal    = document.getElementById('mapModal');
  const backdrop = document.getElementById('mapBackdrop');
  const closeBtn = document.getElementById('mapClose');
  if (!btn || !modal) return;

  const open  = () => { modal.classList.add('open');  document.body.style.overflow = 'hidden'; };
  const close = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };

  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();