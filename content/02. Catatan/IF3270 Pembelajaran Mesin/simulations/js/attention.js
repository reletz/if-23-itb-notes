/* attention.js — simulator Bahdanau / Luong / Self-Attention. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});
  const M = MLSim.mat;

  function vl(v) {
    return "[" + v.map((x) => M.fmt(x)).join(",\\,") + "]";
  }
  function fbox(label, latex) {
    return (
      '<div class="formula-box"><div class="formula-label">' +
      label +
      '</div><div class="math">' +
      MLSim.math.toString(latex) +
      "</div></div>"
    );
  }
  function matTable(mat, rowLabels, colLabels) {
    let h = '<table class="vtable"><tr><th></th>';
    h += colLabels.map((c) => "<th>" + c + "</th>").join("");
    h += "</tr>";
    mat.forEach((row, i) => {
      h += "<tr><th>" + rowLabels[i] + "</th>";
      h += row.map((x) => "<td>" + M.fmt(x) + "</td>").join("");
      h += "</tr>";
    });
    return h + "</table>";
  }
  function heatTable(mat, rowLabels, colLabels) {
    let h = '<table class="heat"><tr><th></th>';
    h += colLabels.map((c) => "<th>" + c + "</th>").join("");
    h += "</tr>";
    mat.forEach((row, i) => {
      h += "<tr><th>" + rowLabels[i] + "</th>";
      h += row
        .map((x) => {
          const a = Math.max(0, Math.min(1, x));
          return (
            '<td style="background:rgba(40,110,150,' +
            (0.12 + a * 0.8).toFixed(2) +
            ')">' +
            M.fmt(x, 2) +
            "</td>"
          );
        })
        .join("");
      h += "</tr>";
    });
    return h + "</table>";
  }
  function bars(weights, labels) {
    return (
      '<div class="bars">' +
      weights
        .map(
          (w, i) =>
            '<div class="bar-row"><span class="bar-label">' +
            labels[i] +
            '</span><span class="bar-track"><span class="bar-fill" style="width:' +
            (w * 100).toFixed(1) +
            '%"></span></span><span class="bar-val">' +
            M.fmt(w) +
            "</span></div>"
        )
        .join("") +
      "</div>"
    );
  }

  function init(root) {
    let state = { mech: "bahdanau", luongScore: "dot", n: 3, seed: 11, scaled: true };
    let steps = [];
    let ctx = {};

    root.innerHTML =
      '<div class="sim-layout">' +
      '  <div class="col-controls">' +
      '    <div class="panel">' +
      "      <h3>Mekanisme</h3>" +
      '      <div class="field"><div class="seg" id="att-mech">' +
      '        <button data-v="bahdanau" class="active">Bahdanau</button>' +
      '        <button data-v="luong">Luong</button>' +
      '        <button data-v="self">Self-Attn</button>' +
      "      </div></div>" +
      '      <div class="field" id="att-luong-field" style="display:none"><label>Fungsi skor (Luong)</label>' +
      '        <select id="att-luong"><option value="dot">dot</option><option value="general">general</option><option value="concat">concat</option></select></div>' +
      '      <div class="field" id="att-scaled-field" style="display:none"><label>Scaling 1/√d_k</label>' +
      '        <div class="seg" id="att-scaled"><button data-v="1" class="active">Aktif</button><button data-v="0">Nonaktif</button></div></div>' +
      '      <div class="field"><label><span id="att-n-label">Jumlah encoder state</span>: <span id="att-n-out">3</span></label>' +
      '        <div class="range-row"><input type="range" id="att-n" min="2" max="4" step="1" value="3"/></div></div>' +
      '      <div class="field"><label>Seed nilai</label><input type="number" id="att-seed" value="11" min="1" max="9999"/></div>' +
      '      <div class="note" id="att-desc"></div>' +
      "    </div>" +
      "  </div>" +
      '  <div class="col-main">' +
      '    <div class="stepper" id="att-stepper"></div>' +
      '    <div class="panel formula-panel">' +
      '      <div class="step-title" id="att-step-title">—</div>' +
      '      <div class="step-desc" id="att-step-desc"></div>' +
      '      <div id="att-formula"></div>' +
      "    </div>" +
      '    <div class="panel"><h3 id="att-viz-title">Visualisasi</h3><div id="att-viz"></div></div>' +
      "  </div>" +
      "</div>";

    const el = {
      mech: root.querySelector("#att-mech"),
      luongField: root.querySelector("#att-luong-field"),
      luong: root.querySelector("#att-luong"),
      scaledField: root.querySelector("#att-scaled-field"),
      scaled: root.querySelector("#att-scaled"),
      n: root.querySelector("#att-n"),
      nOut: root.querySelector("#att-n-out"),
      nLabel: root.querySelector("#att-n-label"),
      seed: root.querySelector("#att-seed"),
      desc: root.querySelector("#att-desc"),
      stepTitle: root.querySelector("#att-step-title"),
      stepDesc: root.querySelector("#att-step-desc"),
      formula: root.querySelector("#att-formula"),
      vizTitle: root.querySelector("#att-viz-title"),
      viz: root.querySelector("#att-viz"),
    };

    const DESC = {
      bahdanau:
        "Bahdanau (additive): skor keselarasan dihitung dengan jaringan kecil eᵢⱼ = vᵀtanh(W₁hⱼ + W₂s), lalu softmax → bobot → context vector.",
      luong:
        "Luong (multiplicative): skor lewat dot / general / concat, softmax → bobot, context, lalu state gabungan s̃ = tanh(Wc[c;s]).",
      self:
        "Self-attention Transformer: dari satu input dihitung Q, K, V; skor QKᵀ (di-scale 1/√dₖ), softmax baris → matriks attention, output = A·V. Diproses paralel, bukan sekuensial.",
    };

    function buildBahdanau() {
      const d = 2;
      const enc = M.randMat(state.n, d, state.seed, 0.8);
      const s = M.randVec(d, state.seed + 7, 0.8);
      const W1 = M.randMat(d, d, state.seed + 1, 0.6);
      const W2 = M.randMat(d, d, state.seed + 2, 0.6);
      const v = M.randVec(d, state.seed + 3, 0.6);
      const e = enc.map((h) => M.dot(v, M.tanh(M.vecAdd(M.matVec(W1, h), M.matVec(W2, s)))));
      const alpha = M.softmax(e);
      const c = enc[0].map((_, k) => enc.reduce((acc, h, j) => acc + alpha[j] * h[k], 0));
      const labels = enc.map((_, j) => "h" + (j + 1));
      const out = [];
      out.push({
        title: "Skor alignment eⱼ",
        desc: "Untuk tiap encoder state hⱼ, hitung kecocokan dengan state decoder s.",
        latex: [
          ["Rumus", "e_j = v^T\\tanh(W_1 h_j + W_2 s)"],
          ["Hasil", "e = " + vl(e)],
        ],
        viz: () => matTable([e], ["e"], labels),
      });
      out.push({
        title: "Bobot attention αⱼ",
        desc: "Normalisasi skor dengan softmax → seberapa besar perhatian ke tiap posisi.",
        latex: [
          ["Rumus", "\\alpha_j = \\softmax(e)_j"],
          ["Hasil", "\\alpha = " + vl(alpha)],
        ],
        viz: () => bars(alpha, labels),
      });
      out.push({
        title: "Context vector c",
        desc: "Jumlah berbobot seluruh encoder state — inilah inti attention: tidak membuang state perantara.",
        latex: [
          ["Rumus", "c = \\sum_j \\alpha_j h_j"],
          ["Hasil", "c = " + vl(c)],
        ],
        viz: () => bars(alpha, labels) + matTable([c], ["c"], ["d1", "d2"]),
      });
      el.nLabel.textContent = "Jumlah encoder state";
      return out;
    }

    function buildLuong() {
      const d = 2;
      const enc = M.randMat(state.n, d, state.seed, 0.8);
      const s = M.randVec(d, state.seed + 7, 0.8);
      const Wa = M.randMat(d, state.luongScore === "concat" ? 2 * d : d, state.seed + 1, 0.6);
      const va = M.randVec(d, state.seed + 3, 0.6);
      let e, scoreRule;
      if (state.luongScore === "dot") {
        e = enc.map((h) => M.dot(s, h));
        scoreRule = "score(s,h_j) = s^T h_j";
      } else if (state.luongScore === "general") {
        e = enc.map((h) => M.dot(s, M.matVec(Wa, h)));
        scoreRule = "score(s,h_j) = s^T W_a h_j";
      } else {
        e = enc.map((h) => M.dot(va, M.tanh(M.matVec(Wa, s.concat(h)))));
        scoreRule = "score(s,h_j) = v_a^T\\tanh(W_a[s;h_j])";
      }
      const alpha = M.softmax(e);
      const c = enc[0].map((_, k) => enc.reduce((acc, h, j) => acc + alpha[j] * h[k], 0));
      const stilde = M.tanh(M.matVec(M.randMat(d, 2 * d, state.seed + 5, 0.6), c.concat(s)));
      const labels = enc.map((_, j) => "h" + (j + 1));
      const out = [];
      out.push({
        title: "Skor (" + state.luongScore + ")",
        desc: "Luong menghitung skor lewat perkalian — varian " + state.luongScore + ".",
        latex: [
          ["Rumus", scoreRule],
          ["Hasil", "e = " + vl(e)],
        ],
        viz: () => matTable([e], ["e"], labels),
      });
      out.push({
        title: "Bobot attention αⱼ",
        desc: "Softmax atas skor.",
        latex: [["Rumus", "\\alpha_j = \\softmax(e)_j"], ["Hasil", "\\alpha = " + vl(alpha)]],
        viz: () => bars(alpha, labels),
      });
      out.push({
        title: "Context vector c",
        desc: "Jumlah berbobot encoder state.",
        latex: [["Rumus", "c_t = \\sum_j \\alpha_j h_j"], ["Hasil", "c = " + vl(c)]],
        viz: () => bars(alpha, labels) + matTable([c], ["c"], ["d1", "d2"]),
      });
      out.push({
        title: "State gabungan s̃",
        desc: "Luong menggabungkan context dengan state decoder sebelum prediksi.",
        latex: [
          ["Rumus", "\\tilde{s}_t = \\tanh(W_c[c_t; s_t])"],
          ["Hasil", "\\tilde{s} = " + vl(stilde)],
        ],
        viz: () => matTable([stilde], ["s̃"], ["d1", "d2"]),
      });
      el.nLabel.textContent = "Jumlah encoder state";
      return out;
    }

    function buildSelf() {
      const d = 2,
        dk = 2;
      const X = M.randMat(state.n, d, state.seed, 0.9);
      const Wq = M.randMat(d, dk, state.seed + 1, 0.6);
      const Wk = M.randMat(d, dk, state.seed + 2, 0.6);
      const Wv = M.randMat(d, dk, state.seed + 3, 0.6);
      const Q = M.matMul(X, Wq);
      const K = M.matMul(X, Wk);
      const V = M.matMul(X, Wv);
      const Sraw = M.matMul(Q, M.transpose(K));
      const scale = state.scaled ? 1 / Math.sqrt(dk) : 1;
      const S = Sraw.map((row) => row.map((x) => x * scale));
      const A = S.map((row) => M.softmax(row));
      const O = M.matMul(A, V);
      const tok = X.map((_, i) => "x" + (i + 1));
      const out = [];
      out.push({
        title: "Proyeksi Q, K, V",
        desc: "Setiap token diproyeksikan linear menjadi Query, Key, dan Value.",
        latex: [["Rumus", "Q = XW_Q,\\; K = XW_K,\\; V = XW_V"]],
        viz: () =>
          "<h4>Q</h4>" +
          matTable(Q, tok, ["q1", "q2"]) +
          "<h4>K</h4>" +
          matTable(K, tok, ["k1", "k2"]) +
          "<h4>V</h4>" +
          matTable(V, tok, ["v1", "v2"]),
      });
      out.push({
        title: "Skor QKᵀ" + (state.scaled ? " (di-scale)" : ""),
        desc: state.scaled
          ? "Dot-product setiap query dengan setiap key, dibagi √dₖ agar gradien stabil."
          : "Dot-product setiap query dengan setiap key (tanpa scaling).",
        latex: [
          ["Rumus", state.scaled ? "S = \\frac{QK^T}{\\sqrt{d_k}}" : "S = QK^T"],
          ["√dₖ", state.scaled ? "\\sqrt{d_k} = \\sqrt{" + dk + "} \\approx " + M.fmt(Math.sqrt(dk)) : "—"],
        ],
        viz: () => matTable(S, tok, tok),
      });
      out.push({
        title: "Softmax baris → matriks attention A",
        desc: "Tiap baris dinormalkan: seberapa besar token i memperhatikan token j.",
        latex: [["Rumus", "A = \\softmax_{baris}(S)"]],
        viz: () =>
          heatTable(A, tok, tok) +
          '<div class="note">Sel makin gelap = perhatian makin besar. Inilah peta "token i melihat token j" (mis. kata "it" yang menyorot "the animal" / "tired").</div>',
      });
      out.push({
        title: "Output = A·V",
        desc: "Representasi baru tiap token = jumlah berbobot Value seluruh token.",
        latex: [["Rumus", "\\text{Output} = A\\,V"]],
        viz: () => heatTable(A, tok, tok) + "<h4>Output</h4>" + matTable(O, tok, ["o1", "o2"]),
      });
      el.nLabel.textContent = "Jumlah token";
      return out;
    }

    function rebuildSteps() {
      if (state.mech === "bahdanau") steps = buildBahdanau();
      else if (state.mech === "luong") steps = buildLuong();
      else steps = buildSelf();
    }

    function renderStep(i, step) {
      if (!step) return;
      el.stepTitle.textContent = step.title;
      el.stepDesc.textContent = step.desc;
      el.formula.innerHTML = step.latex.map((p) => fbox(p[0], p[1])).join("");
      el.vizTitle.textContent = "Visualisasi — " + step.title;
      el.viz.innerHTML = step.viz ? step.viz() : "";
    }

    const stepper = MLSim.makeStepper({
      controlsEl: root.querySelector("#att-stepper"),
      getSteps: () => steps,
      onStep: renderStep,
      onReset: rebuildSteps,
      speedMs: 1200,
    });

    function rebuild() {
      el.desc.textContent = DESC[state.mech];
      el.luongField.style.display = state.mech === "luong" ? "block" : "none";
      el.scaledField.style.display = state.mech === "self" ? "block" : "none";
      rebuildSteps();
      stepper.goto(0);
    }

    el.mech.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      state.mech = b.getAttribute("data-v");
      Array.prototype.forEach.call(el.mech.children, (c) =>
        c.classList.toggle("active", c === b)
      );
      rebuild();
    });
    el.scaled.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      state.scaled = b.getAttribute("data-v") === "1";
      Array.prototype.forEach.call(el.scaled.children, (c) =>
        c.classList.toggle("active", c === b)
      );
      rebuild();
    });
    el.luong.addEventListener("change", () => {
      state.luongScore = el.luong.value;
      rebuild();
    });
    el.n.addEventListener("input", () => {
      state.n = parseInt(el.n.value, 10);
      el.nOut.textContent = state.n;
      rebuild();
    });
    el.seed.addEventListener("input", () => {
      state.seed = parseInt(el.seed.value, 10) || 1;
      rebuild();
    });

    rebuild();
    return { refreshFormula: () => stepper.fire() };
  }

  MLSim.Attention = { init };
})();
