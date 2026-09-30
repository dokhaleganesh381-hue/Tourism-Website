var cats = ["All", "Heritage", "Caves", "Temples", "Gardens"], cur = "All";

function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.textContent = h; return e; }

// Drawn pictures shown until a real photo is found in the images folder
var ART = {
  Caves: '<path opacity=".35" d="M30 200V100a40 40 0 0 1 80 0V200z"/><path opacity=".75" d="M110 200V90a50 50 0 0 1 100 0V200z"/><path opacity=".35" d="M215 200V100a40 40 0 0 1 80 0V200z"/>',
  Heritage: '<rect opacity=".35" x="78" y="90" width="12" height="110"/><rect opacity=".35" x="230" y="90" width="12" height="110"/><rect opacity=".75" x="110" y="110" width="100" height="90"/><path opacity=".75" d="M120 110a40 45 0 0 1 80 0z"/><rect x="158" y="48" width="4" height="18"/>',
  Temples: '<path opacity=".75" d="M100 200l10-80 50-80 50 80 10 80z"/><rect opacity=".35" x="70" y="150" width="180" height="50"/><rect x="159" y="18" width="3" height="24"/>',
  Gardens: '<rect opacity=".35" x="0" y="188" width="320" height="12"/><circle opacity=".55" cx="90" cy="110" r="40"/><rect x="86" y="140" width="8" height="52"/><circle opacity=".8" cx="170" cy="92" r="55"/><rect x="165" y="145" width="10" height="47"/><circle opacity=".55" cx="252" cy="120" r="35"/><rect x="248" y="150" width="8" height="42"/>',
  Travel: '<rect opacity=".8" x="50" y="80" width="220" height="75" rx="14"/><g fill="var(--card)"><rect x="66" y="96" width="36" height="26" rx="4"/><rect x="112" y="96" width="36" height="26" rx="4"/><rect x="158" y="96" width="36" height="26" rx="4"/><rect x="204" y="96" width="48" height="26" rx="4"/></g><circle cx="95" cy="165" r="10"/><circle cx="225" cy="165" r="10"/><rect opacity=".35" x="0" y="178" width="320" height="6"/>',
  Air: '<ellipse opacity=".85" cx="160" cy="100" rx="95" ry="15"/><polygon opacity=".6" points="150,100 195,100 155,165 130,165"/><polygon opacity=".6" points="150,100 195,100 155,35 130,35"/><polygon opacity=".6" points="75,98 100,98 78,62 62,62"/><circle opacity=".25" cx="265" cy="45" r="22"/>',
  Road: '<circle opacity=".3" cx="250" cy="55" r="24"/><polygon opacity=".6" points="110,200 210,200 178,70 142,70"/><g fill="var(--card)"><rect x="157" y="170" width="6" height="22"/><rect x="158" y="130" width="4" height="16"/><rect x="159" y="100" width="3" height="10"/></g>',
  Hotel: '<rect opacity=".8" x="90" y="55" width="140" height="145"/><g fill="var(--card)"><rect x="105" y="75" width="25" height="22"/><rect x="148" y="75" width="25" height="22"/><rect x="191" y="75" width="25" height="22"/><rect x="105" y="112" width="25" height="22"/><rect x="148" y="112" width="25" height="22"/><rect x="191" y="112" width="25" height="22"/><rect x="148" y="160" width="25" height="40"/></g>'
};

// Shows a drawn picture, then swaps in your photo if the file exists
function photo(base, kind, alt) {
  var wrap = el("div", "ph");
  wrap.innerHTML = '<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMax slice" fill="currentColor" aria-hidden="true">' + (ART[kind] || ART.Heritage) + '</svg>';
  if (!base) return wrap;
  var exts = ["jpg", "jpeg", "png", "webp"], n = 0;
  (function tryNext() {
    if (n >= exts.length) return;
    var img = new Image();
    img.alt = alt;
    img.onload = function () { wrap.textContent = ""; wrap.appendChild(img); };
    img.onerror = tryNext;
    img.src = base + "." + exts[n++];
  })();
  return wrap;
}

function drawPlaces() {
  var g = document.getElementById("placeGrid"); g.innerHTML = "";
  PLACES.filter(function (p) { return cur === "All" || p.c === cur; }).forEach(function (p) {
    var a = el("article", "card"); a.dataset.c = p.c;
    a.appendChild(photo(p.i, p.c, p.n));
    a.appendChild(el("h3", 0, p.n)); a.appendChild(el("div", "tag", p.c));
    var m = el("div", "meta"); m.appendChild(el("span", 0, p.d + " away")); m.appendChild(el("span", 0, p.t));
    a.appendChild(m); a.appendChild(el("p", 0, p.x)); g.appendChild(a);
    makeClickable(a, function () { openModal(p, p.c); });
  });
}

var chips = document.getElementById("chips");
cats.forEach(function (c) {
  var b = el("button", "chip", c); b.type = "button"; b.setAttribute("aria-pressed", c === cur);
  b.onclick = function () {
    cur = c;
    [].forEach.call(chips.children, function (x) { x.setAttribute("aria-pressed", x.textContent === c); });
    drawPlaces();
  };
  chips.appendChild(b);
});
drawPlaces();

var hg = document.getElementById("hotelGrid");
HOTELS.forEach(function (h) {
  var a = el("article", "card"); a.dataset.c = "Hotel";
  a.appendChild(photo(h.i, "Hotel", h.n));
  a.appendChild(el("h3", 0, h.n)); a.appendChild(el("div", "tag", h.c));
  var m = el("div", "meta"); m.appendChild(el("span", 0, h.p)); a.appendChild(m);
  a.appendChild(el("p", 0, h.x)); hg.appendChild(a);
  makeClickable(a, function () { openModal(h, "Hotel"); });
});

document.getElementById("wa").href = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent("Hello, I want to plan a trip to Chhatrapati Sambhajinagar.");
document.getElementById("call").href = "tel:+" + PHONE;

var tg = document.getElementById("travelGrid");
TRAVEL.forEach(function (t) {
  var a = el("article", "card"); a.dataset.c = t.k;
  a.appendChild(photo(t.i, t.k, t.n));
  a.appendChild(el("h3", 0, t.n)); a.appendChild(el("div", "tag", t.c));
  var m = el("div", "meta"); t.m.forEach(function (s) { m.appendChild(el("span", 0, s)); });
  a.appendChild(m); a.appendChild(el("p", 0, t.x)); tg.appendChild(a);
  makeClickable(a, function () { openModal(t, t.k); });
});

// ---- Detail modal: opens when a place, hotel or travel card is clicked ----
function makeClickable(card, onOpen) {
  card.tabIndex = 0; card.setAttribute("role", "button");
  card.addEventListener("click", onOpen);
  card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } });
}

var modalBack = document.getElementById("modalBack"), lastFocus = null;
function openModal(item, kind) {
  lastFocus = document.activeElement;
  document.getElementById("modalPh").innerHTML = "";
  document.getElementById("modalPh").appendChild(photo(item.i, kind, item.n));
  document.getElementById("modalTag").textContent = item.c || kind;
  document.getElementById("modalTitle").textContent = item.n;
  var meta = document.getElementById("modalMeta"); meta.innerHTML = "";
  (item.m || [item.d, item.t].filter(Boolean).map(function (v) { return v; })).forEach(function (s) {
    if (s) meta.appendChild(el("span", 0, s));
  });
  if (item.p) meta.appendChild(el("span", 0, item.p));
  document.getElementById("modalText").textContent = item.x || "";
  var facts = document.getElementById("modalFacts"); facts.innerHTML = "";
  function fact(label, val) { if (!val) return; facts.appendChild(el("dt", 0, label)); facts.appendChild(el("dd", 0, val)); }
  fact("Entry fee", item.e);
  fact("Timings", item.ti);
  fact("Good to know", item.w);
  document.getElementById("modalWa").href = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent("Hello, I would like more information about " + item.n + ".");
  modalBack.hidden = false;
  document.getElementById("modalClose").focus();
}
function closeModal() {
  modalBack.hidden = true;
  if (lastFocus) lastFocus.focus();
}
document.getElementById("modalClose").addEventListener("click", closeModal);
modalBack.addEventListener("click", function (e) { if (e.target === modalBack) closeModal(); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modalBack.hidden) closeModal(); });

var bl = document.getElementById("blogList");
POSTS.forEach(function (p) {
  var d = el("details", "post"), s = el("summary");
  s.appendChild(el("h3", 0, p.t)); s.appendChild(el("div", "tag", p.d + "  |  " + p.g));
  d.appendChild(s); d.appendChild(el("p", "body", p.x)); bl.appendChild(d);
});

document.getElementById("mail").href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Trip enquiry: Chhatrapati Sambhajinagar");
document.getElementById("contact").textContent = "Phone and WhatsApp: +" + PHONE.slice(0, 2) + " " + PHONE.slice(2) + "   Email: " + EMAIL;
