/* terminal.js — efek ketik ala terminal untuk hero. Satu fungsi. */
function initTerminal() {
  var body = document.getElementById("term-hero");
  if (!body) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    paintTerminalStatic(body);
    return;
  }
  body.classList.add("typing");
  var kids = Array.prototype.slice.call(body.children);
  var i = 0;
  function next() {
    if (i >= kids.length) {
      body.classList.remove("typing");
      body.insertAdjacentHTML("beforeend",
        '<div class="t-line"><span class="t-prompt">$</span> <span class="t-cursor"></span></div>');
      return;
    }
    var el = kids[i];
    if (el.classList.contains("t-line") && el.dataset.type) {
      el.classList.add("typed");
      el.innerHTML = '<span class="t-prompt">$</span> <span class="t-cmd"></span><span class="t-cursor"></span>';
      var cmd = el.querySelector(".t-cmd");
      var txt = el.dataset.type;
      var c = 0;
      (function tick() {
        if (c <= txt.length) {
          cmd.textContent = txt.slice(0, c++);
          setTimeout(tick, 36);
        } else {
          var cur = el.querySelector(".t-cursor");
          if (cur) cur.remove();
          i++;
          setTimeout(next, 240);
        }
      })();
    } else {
      el.classList.add("shown");
      i++;
      setTimeout(next, 300);
    }
  }
  next();
}

function paintTerminalStatic(body) {
  var kids = body.children;
  for (var k = 0; k < kids.length; k++) {
    var el = kids[k];
    if (el.classList.contains("t-line") && el.dataset.type) {
      el.innerHTML = '<span class="t-prompt">$</span> <span class="t-cmd"></span>';
      el.querySelector(".t-cmd").textContent = el.dataset.type;
    }
  }
}
