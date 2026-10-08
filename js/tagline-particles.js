/* tagline-particles.js — partikel terbang membentuk tagline hero. Satu fungsi. */
function initTaglineParticles() {
  var el = document.getElementById("term-sub-canvas");
  if (!el) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.outerHTML = '<p class="term-sub">Studio independen &mdash; kernel, modul root, aplikasi &amp; jasa digital</p>';
    return;
  }
  var text = "Studio independen \u2014 kernel, modul root, aplikasi & jasa digital";
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = el.parentElement.clientWidth;
  var H = 44;
  el.width = W * dpr;
  el.height = H * dpr;
  el.style.width = W + "px";
  el.style.height = H + "px";
  var ctx = el.getContext("2d");
  ctx.scale(dpr, dpr);

  var off = document.createElement("canvas");
  off.width = W * dpr;
  off.height = H * dpr;
  var octx = off.getContext("2d");
  octx.scale(dpr, dpr);
  octx.font = "13px 'JetBrains Mono', monospace";
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.fillStyle = "#fff";
  octx.fillText(text, W / 2, H / 2);
  var data = octx.getImageData(0, 0, W, H).data;
  var targets = [];
  for (var y = 0; y < H; y += 3) {
    for (var x = 0; x < W; x += 3) {
      if (data[(y * W + x) * 4 + 3] > 128) {
        targets.push({ x: x, y: y });
      }
    }
  }
  var max = 900;
  if (targets.length > max) {
    targets = targets.filter(function (_, i) { return i % Math.ceil(targets.length / max) === 0; });
  }
  var parts = targets.map(function (t) {
    return {
      x: Math.random() * W, y: Math.random() * H,
      tx: t.x, ty: t.y,
      vx: 0, vy: 0,
      delay: Math.random() * 60,
      size: 1 + Math.random() * 1.4
    };
  });
  var frame = 0;
  var done = false;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    var settled = 0;
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (frame > p.delay) {
        p.vx += (p.tx - p.x) * 0.02;
        p.vy += (p.ty - p.y) * 0.02;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.tx - p.x) < 0.6 && Math.abs(p.ty - p.y) < 0.6) settled++;
      }
      ctx.fillStyle = "rgba(0,255,136,.75)";
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    frame++;
    if (settled < parts.length) {
      requestAnimationFrame(draw);
    } else if (!done) {
      done = true;
      setTimeout(function () {
        el.outerHTML = '<p class="term-sub term-sub-final">' + text.replace(/&/g, "&amp;").replace(/\u2014/g, "&mdash;") + "</p>";
      }, 1200);
    }
  }
  setTimeout(function () { requestAnimationFrame(draw); }, 2500);
}
