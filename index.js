(function () {
  const badge = document.getElementById('weekBadge');
  if (!badge) return;

  function toDate(str) {
    const d = new Date(str);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day === 0) ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function getHoliday(date) {
    return HOLIDAYS.find(h => date >= h.start && date <= h.end) || null;
  }

  function isInHoliday(date) {
    return getHoliday(date) !== null;
  }

  const HOLIDAYS = [
    { name: "Autumn Half-Term Holiday", start: "2025-10-27", end: "2025-10-31" },
    { name: "Christmas Holiday", start: "2025-12-22", end: "2026-01-02" },
    { name: "Spring Half-Term Holiday", start: "2026-02-16", end: "2026-02-20" },
    { name: "Easter Holiday", start: "2026-04-06", end: "2026-04-10" },
    { name: "Summer Half-Term Holiday", start: "2026-05-25", end: "2026-05-29" },
    { name: "Summer Holiday", start: "2026-07-20", end: "2026-08-31" }
  ].map(h => ({
    ...h,
    start: toDate(h.start),
    end: toDate(h.end)
  }));

  const ANCHOR = toDate("2025-09-01");

  let count = 0;
  let current = getMonday(ANCHOR);
  const today = getMonday(new Date());
  const todayDate = new Date();

  while (current <= today) {
    if (!isInHoliday(current)) {
      count++;
    }
    current.setDate(current.getDate() + 7);
  }

  const currentHoliday = getHoliday(todayDate);
  if (currentHoliday) {
    badge.textContent = currentHoliday.name;
    return;
  }

  const week = (count % 2 === 1) ? 2 : 1;

  badge.textContent = `Week ${week}`;
})();

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