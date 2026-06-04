/* draw.js — helper SVG (mengembalikan STRING markup, dipakai via innerHTML).
 * Marker panah didefinisikan global sekali di index.htm (#arrowBlue / #arrowGray).
 * Warna netral pakai currentColor agar adaptif tema; fill node tetap. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});
  const fmt = (x, d) => (MLSim.mat ? MLSim.mat.fmt(x, d) : String(x));

  function attrs(o) {
    o = o || {};
    let s = "";
    for (const k in o) {
      if (o[k] === undefined || o[k] === null || o[k] === false) continue;
      const name = k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
      s += " " + name + '="' + o[k] + '"';
    }
    return s;
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // bungkus svg dengan ukuran intrinsik + kontainer scroll horizontal
  function svg(w, h, inner, cls) {
    return (
      '<div class="svg-wrap ' + (cls || "") + '"><svg width="' + w + '" height="' + h +
      '" viewBox="0 0 ' + w + " " + h + '" class="diagram">' + inner + "</svg></div>"
    );
  }

  function line(x1, y1, x2, y2, o) {
    o = o || {};
    const color = o.color || "#3b82f6";
    const marker = o.arrow === false ? "" : ' marker-end="url(#' + (o.gray ? "arrowGray" : "arrowBlue") + ')"';
    return (
      '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 +
      '" stroke="' + color + '" stroke-width="' + (o.width || 2) + '"' +
      (o.dash ? ' stroke-dasharray="' + o.dash + '"' : "") +
      (o.opacity ? ' opacity="' + o.opacity + '"' : "") +
      marker + "/>"
    );
  }
  function path(d, o) {
    o = o || {};
    return (
      '<path d="' + d + '" fill="' + (o.fill || "none") + '" stroke="' +
      (o.stroke || "#3b82f6") + '" stroke-width="' + (o.width || 2) + '"' +
      (o.dash ? ' stroke-dasharray="' + o.dash + '"' : "") +
      (o.arrow ? ' marker-end="url(#' + (o.gray ? "arrowGray" : "arrowBlue") + ')"' : "") + "/>"
    );
  }
  function ellipse(cx, cy, rx, ry, o) {
    o = o || {};
    return (
      '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry +
      '" fill="' + (o.fill || "transparent") + '" stroke="' + (o.stroke || "currentColor") +
      '" stroke-width="' + (o.strokeW || 1.5) + '"' +
      (o.dash ? ' stroke-dasharray="' + o.dash + '"' : "") +
      (o.opacity ? ' opacity="' + o.opacity + '"' : "") +
      (o.cls ? ' class="' + o.cls + '"' : "") +
      (o.data ? ' data-comp="' + o.data + '"' : "") + "/>"
    );
  }
  function circle(cx, cy, r, o) {
    return ellipse(cx, cy, r, r, o);
  }
  function rect(x, y, w, h, o) {
    o = o || {};
    return (
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
      '" rx="' + (o.rx === undefined ? 8 : o.rx) + '" fill="' + (o.fill || "transparent") +
      '" stroke="' + (o.stroke || "currentColor") + '" stroke-width="' + (o.strokeW || 1.5) + '"' +
      (o.dash ? ' stroke-dasharray="' + o.dash + '"' : "") +
      (o.opacity ? ' opacity="' + o.opacity + '"' : "") +
      (o.cls ? ' class="' + o.cls + '"' : "") +
      (o.data ? ' data-comp="' + o.data + '" style="cursor:pointer"' : "") + "/>"
    );
  }
  function text(x, y, s, o) {
    o = o || {};
    return (
      '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.anchor || "middle") +
      '" dominant-baseline="' + (o.baseline || "middle") + '" font-size="' + (o.size || 12) +
      '" fill="' + (o.fill || "currentColor") + '"' +
      (o.weight ? ' font-weight="' + o.weight + '"' : "") +
      (o.cls ? ' class="' + o.cls + '"' : "") +
      (o.italic ? ' font-style="italic"' : "") +
      (o.data ? ' data-comp="' + o.data + '" style="cursor:pointer"' : "") +
      ">" + esc(s) + "</text>"
    );
  }

  // vektor angka bertumpuk, terpusat di (cx,cy)
  // o.colors: {idx: warna}, o.bold: {idx:true}, o.bracket:true, o.fill default
  function vec(cx, cy, arr, o) {
    o = o || {};
    const size = o.size || 11,
      lh = size + 3,
      n = arr.length;
    const top = cy - ((n - 1) * lh) / 2;
    const fill = o.fill || "currentColor";
    let tspans = "";
    arr.forEach((v, i) => {
      const c = (o.colors && o.colors[i]) || fill;
      const fw = o.bold && o.bold[i] ? "700" : "400";
      tspans +=
        '<tspan x="' + cx + '" ' + (i === 0 ? 'y="' + top + '"' : 'dy="' + lh + '"') +
        ' fill="' + c + '" font-weight="' + fw + '">' + fmt(v) + "</tspan>";
    });
    let br = "";
    if (o.bracket) {
      const bw = (o.bracketW || 20),
        h2 = (n * lh) / 2 + 2,
        x1 = cx - bw,
        x2 = cx + bw,
        col = o.bracketColor || "currentColor";
      br =
        '<path d="M' + (x1 + 4) + "," + (cy - h2) + " L" + x1 + "," + (cy - h2) + " L" + x1 + "," + (cy + h2) +
        " L" + (x1 + 4) + "," + (cy + h2) + '" fill="none" stroke="' + col + '" stroke-width="1"/>' +
        '<path d="M' + (x2 - 4) + "," + (cy - h2) + " L" + x2 + "," + (cy - h2) + " L" + x2 + "," + (cy + h2) +
        " L" + (x2 - 4) + "," + (cy + h2) + '" fill="none" stroke="' + col + '" stroke-width="1"/>';
    }
    return (
      '<text text-anchor="middle" font-family="ui-monospace,Consolas,monospace" font-size="' +
      size + '" fill="' + fill + '">' + tspans + "</text>" + br
    );
  }

  // gradien value (indigo -> biru -> cyan -> hijau), t in [0,1] -> {bg,fg}
  function heat(t) {
    t = Math.max(0, Math.min(1, t));
    const stops = [
      [49, 46, 129],
      [29, 78, 216],
      [8, 145, 178],
      [5, 150, 105],
      [22, 163, 74],
    ];
    const idx = t * (stops.length - 1),
      lo = Math.floor(idx),
      hi = Math.min(lo + 1, stops.length - 1),
      f = idx - lo;
    const c = stops[lo].map((v, k) => Math.round(v + (stops[hi][k] - v) * f));
    const bright = (c[0] * 299 + c[1] * 587 + c[2] * 114) / 1000;
    return { bg: "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")", fg: bright > 110 ? "#0f172a" : "#e2e8f0" };
  }
  // warna attention 0..1 (biru transparan)
  function attn(a) {
    a = Math.max(0, Math.min(1, a));
    return "rgba(40,110,150," + (0.1 + a * 0.85).toFixed(2) + ")";
  }

  MLSim.draw = { svg, line, path, ellipse, circle, rect, text, vec, heat, attn, esc, attrs };
})();
