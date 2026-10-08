function mockupHtml(mock) {
  if (!mock) return "";
  const inner = mock.html || "";
  if (mock.type === "phone") {
    return `<div class="mk mk-phone"><div class="mk-notch"></div><div class="mk-screen">${inner}</div></div>`;
  }
  if (mock.type === "terminal") {
    return `<div class="mk mk-term"><div class="mk-bar"><i></i><i></i><i></i><span>${mock.title || "terminal"}</span></div><div class="mk-termbody">${inner}</div></div>`;
  }
  if (mock.type === "api") {
    return `<div class="mk mk-code"><div class="mk-bar"><i></i><i></i><i></i><span>${mock.title || "api.json"}</span></div><pre class="mk-pre">${inner}</pre></div>`;
  }
  return `<div class="mk mk-doc"><div class="mk-bar"><i></i><i></i><i></i><span>${mock.title || "dokumen"}</span></div><div class="mk-docbody">${inner}</div></div>`;
}
