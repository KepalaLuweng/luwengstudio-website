function initStatsAnim() {
  const els = document.querySelectorAll("#statistik [data-count]");
  if (!els.length) return;
  const fmt = n => n.toLocaleString("id-ID");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function startLive(el, base) {
    let val = base;
    const bump = () => {
      val += 1 + Math.floor(Math.random() * 3);
      el.textContent = fmt(val);
      setTimeout(bump, 4000 + Math.random() * 6000);
    };
    setTimeout(bump, 3000 + Math.random() * 4000);
  }

  function animate(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    if (reduceMotion) {
      el.textContent = fmt(target);
      if (el.dataset.live) startLive(el, target);
      return;
    }
    const dur = 1400;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) {
        requestAnimationFrame(tick);
      } else if (el.dataset.live) {
        startLive(el, target);
      }
    };
    requestAnimationFrame(tick);
  }

  if (!("IntersectionObserver" in window)) {
    els.forEach(el => {
      const target = parseInt(el.dataset.count, 10) || 0;
      el.textContent = fmt(target);
    });
    return;
  }
  const seen = new WeakSet();
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !seen.has(e.target)) {
        seen.add(e.target);
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  els.forEach(el => io.observe(el));
}
