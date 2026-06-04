/* attention.js — simulator mekanisme Attention (Bahdanau vs Luong).
 * Encoder-decoder dengan/ tanpa attention, many-to-one & many-to-many.
 * Vanilla JS, namespace window.MLSim. Semua teks UI Bahasa Indonesia. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});
  const M = MLSim.mat;
  const D = MLSim.draw;

  // vektor -> latex "[a,\,b]"
  function vl(v) {
    return "[" + v.map((x) => M.fmt(x)).join(",\\,") + "]";
  }
  function fbox(l, x) {
    return (
      '<div class="formula-box"><div class="formula-label">' +
      l +
      '</div><div class="math">' +
      MLSim.math.toString(x) +
      "</div></div>"
    );
  }

  function init(root) {
    const state = {
      arch: "many-to-one", // many-to-one | many-to-many
      mech: "bahdanau", // bahdanau | luong
      luongScore: "dot", // dot | general | concat
      attn: "with", // with | without
      N: 3, // jumlah encoder state (2..4)
      seed: 11,
    };

    let model = null; // hasil compute
    let steps = []; // langkah stepper

    root.innerHTML =
      '<div class="sim-layout">' +
      '  <div class="col-controls">' +
      '    <div class="panel">' +
      "      <h3>Konfigurasi Attention</h3>" +
      '      <div class="field"><label>Arsitektur</label>' +
      '        <div class="seg" id="att-arch">' +
      '          <button data-v="many-to-one" class="active">many-to-one</button>' +
      '          <button data-v="many-to-many">many-to-many</button>' +
      "        </div></div>" +
      '      <div class="field"><label>Mekanisme</label>' +
      '        <div class="seg" id="att-mech">' +
      '          <button data-v="bahdanau" class="active">Bahdanau</button>' +
      '          <button data-v="luong">Luong</button>' +
      "        </div></div>" +
      '      <div class="field" id="att-luong-field" style="display:none"><label>Skor Luong</label>' +
      '        <select id="att-luong-score">' +
      '          <option value="dot">dot</option>' +
      '          <option value="general">general</option>' +
      '          <option value="concat">concat</option>' +
      "        </select></div>" +
      '      <div class="field"><label>Attention</label>' +
      '        <div class="seg" id="att-toggle">' +
      '          <button data-v="with" class="active">dengan attention</button>' +
      '          <button data-v="without">tanpa attention</button>' +
      "        </div></div>" +
      '      <div class="field"><label>Jumlah encoder state: <span id="att-n-out">3</span></label>' +
      '        <div class="range-row"><input type="range" id="att-n" min="2" max="4" step="1" value="3"/></div></div>' +
      '      <div class="field"><label>Seed bobot acak</label>' +
      '        <input type="number" id="att-seed" value="11" min="1" max="9999"/></div>' +
      '      <div class="note" id="att-note"></div>' +
      "    </div>" +
      "  </div>" +
      '  <div class="col-main">' +
      '    <div class="stepper" id="att-stepper"></div>' +
      '    <div class="panel formula-panel">' +
      '      <div class="step-title" id="att-step-title">—</div>' +
      '      <div class="step-desc" id="att-step-desc"></div>' +
      '      <div id="att-formula"></div>' +
      "    </div>" +
      '    <div class="panel">' +
      '      <h3 id="att-viz-title">Visualisasi</h3>' +
      '      <div id="att-viz"></div>' +
      "    </div>" +
      "  </div>" +
      "</div>";

    const el = {
      arch: root.querySelector("#att-arch"),
      mech: root.querySelector("#att-mech"),
      luongField: root.querySelector("#att-luong-field"),
      luongScore: root.querySelector("#att-luong-score"),
      toggle: root.querySelector("#att-toggle"),
      n: root.querySelector("#att-n"),
      nOut: root.querySelector("#att-n-out"),
      seed: root.querySelector("#att-seed"),
      note: root.querySelector("#att-note"),
      stepTitle: root.querySelector("#att-step-title"),
      stepDesc: root.querySelector("#att-step-desc"),
      formula: root.querySelector("#att-formula"),
      vizTitle: root.querySelector("#att-viz-title"),
      viz: root.querySelector("#att-viz"),
    };

    // ---------- rumus skor (latex) per mekanisme ----------
    function scoreRuleLatex() {
      if (state.mech === "bahdanau")
        return "e_{tj}=v_a^T\\tanh(W_a s_{t-1}+U_a h_j)";
      if (state.luongScore === "dot") return "e_{tj}=s_t^T h_j";
      if (state.luongScore === "general") return "e_{tj}=s_t^T W_a h_j";
      return "e_{tj}=v_a^T\\tanh(W_a[s_t;h_j])";
    }

    // ---------- teks .note ----------
    function noteText() {
      if (state.attn === "without") {
        return (
          "<b>Tanpa attention</b>: decoder hanya menerima <b>hidden state terakhir</b> encoder " +
          "(h<sub>" +
          state.N +
          "</sub>) sebagai satu-satunya ringkasan seluruh sekuens. " +
          "Inilah <b>bottleneck</b> — informasi posisi awal mudah hilang untuk sekuens panjang."
        );
      }
      if (state.mech === "bahdanau") {
        return (
          "<b>Bahdanau (additive)</b>: skor keselarasan dihitung dari state decoder " +
          "<i>sebelumnya</i> s<sub>t-1</sub> dan tiap hidden encoder h<sub>j</sub> lewat " +
          "MLP kecil (W<sub>a</sub>, U<sub>a</sub>, v<sub>a</sub>). Context c<sub>t</sub> " +
          "ikut menentukan state decoder s<sub>t</sub>."
        );
      }
      const sc =
        state.luongScore === "dot"
          ? "dot: e=s<sub>t</sub>·h<sub>j</sub> (tanpa bobot tambahan)"
          : state.luongScore === "general"
          ? "general: e=s<sub>t</sub>·(W<sub>a</sub>h<sub>j</sub>)"
          : "concat: e=v<sub>a</sub>·tanh(W<sub>a</sub>[s<sub>t</sub>;h<sub>j</sub>])";
      return (
        "<b>Luong (multiplicative)</b>: skor dihitung dari state decoder " +
        "<i>saat ini</i> s<sub>t</sub>. Skor terpilih → " +
        sc +
        ". Context c<sub>t</sub> digabung dengan s<sub>t</sub> menjadi " +
        "s&#771;<sub>t</sub>=tanh(W<sub>c</sub>[c<sub>t</sub>;s<sub>t</sub>])."
      );
    }

    // ---------- bangun bobot & hitung satu langkah decoder ----------
    function buildWeights() {
      const s = state.seed;
      return {
        Wa: M.randMat(2, 2, s + 1, 0.8),
        Ua: M.randMat(2, 2, s + 2, 0.8),
        va: M.randVec(2, s + 3, 0.8),
        WaGen: M.randMat(2, 2, s + 4, 0.8), // Luong general
        WaCat: M.randMat(2, 4, s + 5, 0.8), // Luong/Bahdanau concat (2×4)
        vaCat: M.randVec(2, s + 6, 0.8),
        Wc: M.randMat(2, 4, s + 8, 0.8), // Luong combine (2×4)
      };
    }

    // hitung skor e_j untuk decoder state s terhadap semua encoder state H
    function computeScores(H, s, W) {
      return H.map((h) => {
        if (state.mech === "bahdanau") {
          const inner = M.tanh(M.vecAdd(M.matVec(W.Wa, s), M.matVec(W.Ua, h)));
          return M.dot(W.va, inner);
        }
        if (state.luongScore === "dot") return M.dot(s, h);
        if (state.luongScore === "general") return M.dot(s, M.matVec(W.WaGen, h));
        // concat
        const inner = M.tanh(M.matVec(W.WaCat, s.concat(h)));
        return M.dot(W.vaCat, inner);
      });
    }

    // context = Σ α_j h_j
    function contextOf(H, alpha) {
      let c = M.zeros(H[0].length);
      H.forEach((h, j) => {
        c = M.vecAdd(c, M.scale(h, alpha[j]));
      });
      return c;
    }

    // hitung satu timestep decoder lengkap -> objek hasil
    function decodeStep(H, sPrev, W, tIdx) {
      const e = computeScores(H, sPrev, W);
      const alpha = M.softmax(e);
      const c = contextOf(H, alpha);
      let sNew, sTilde;
      if (state.mech === "bahdanau") {
        // s_t = tanh(Wa s_{t-1} + Ua c)  (demonstrasi: context masuk ke state)
        sNew = M.tanh(M.vecAdd(M.matVec(W.Wa, sPrev), M.matVec(W.Ua, c)));
      } else {
        // s_t (RNN ringkas) lalu s̃ = tanh(Wc[c;s_t])
        sNew = M.tanh(M.matVec(W.Wa, sPrev)); // state decoder ringkas
        sTilde = M.tanh(M.matVec(W.Wc, c.concat(sNew)));
      }
      const sOut = sTilde || sNew;
      // output y (softmax 2-dim demo) — proyeksi sederhana
      const y = M.softmax(sOut);
      return { tIdx, e, alpha, c, sPrev, sNew, sTilde, sOut, y };
    }

    // ---------- bangun model penuh ----------
    function buildModel() {
      const N = state.N;
      // encoder states N×2
      let H = M.randMat(N, 2, state.seed, 0.8);
      // ambil preset bila cocok (N=3) untuk angka "catatan"
      const preset = MLSim.presets && MLSim.presets.attnRNN;
      if (preset && N === 3) {
        H = preset.encStates.map((r) => r.slice());
      }
      let s0 =
        preset && N === 3 ? preset.decState.slice() : M.randVec(2, state.seed + 7, 0.8);
      const W = buildWeights();

      const decN = state.arch === "many-to-many" ? Math.min(3, Math.max(2, N - 1)) : 1;
      const decoders = [];
      let sPrev = s0;
      for (let t = 0; t < decN; t++) {
        const r = decodeStep(H, sPrev, W, t);
        decoders.push(r);
        // shift state decoder untuk timestep berikut (many-to-many)
        sPrev = r.sOut;
      }
      return { N, H, s0, W, decN, decoders };
    }

    // ---------- bangun langkah stepper ----------
    function computeSteps() {
      model = buildModel();
      steps = state.attn === "without" ? stepsWithout() : stepsWith();
    }

    // langkah untuk mode TANPA attention
    function stepsWithout() {
      const m = model;
      const hLast = m.H[m.N - 1];
      // decoder ringkas pakai hanya hidden terakhir
      const sDec = M.tanh(M.matVec(m.W.Wa, hLast));
      const y = M.softmax(sDec);
      const out = [];
      out.push({
        stage: "bottleneck",
        decT: 0,
        title: "Bottleneck — hanya hidden terakhir",
        desc:
          "Tanpa attention, seluruh sekuens diringkas menjadi satu vektor: hidden state terakhir h_" +
          m.N +
          ". Decoder tidak melihat h_1..h_" +
          (m.N - 1) +
          ".",
        latex: [
          ["Rumus", "c = h_N \\quad (\\text{tanpa bobot } \\alpha)"],
          ["Hidden terakhir", "h_{" + m.N + "} = " + vl(hLast)],
        ],
      });
      out.push({
        stage: "dec",
        decT: 0,
        title: "Decoder pakai h_N",
        desc: "State decoder dihitung hanya dari hidden terakhir.",
        latex: [
          ["Rumus", "s = \\tanh(W_a h_N)"],
          ["Hasil", "s = " + vl(sDec)],
        ],
      });
      out.push({
        stage: "out",
        decT: 0,
        title: "Output y",
        desc: "Output decoder. Informasi posisi awal sekuens sudah berpotensi hilang.",
        latex: [
          ["Rumus", "y = \\softmax(s)"],
          ["Hasil", "y = " + vl(y)],
        ],
        ySnap: y,
        sSnap: sDec,
      });
      return out;
    }

    // langkah untuk mode DENGAN attention (per timestep decoder)
    function stepsWith() {
      const m = model;
      const out = [];
      m.decoders.forEach((dec, t) => {
        const tag = m.decN > 1 ? " (dec t" + (t + 1) + ")" : "";
        // (1) skor alignment
        out.push({
          stage: "score",
          decT: t,
          title: "Skor alignment e_j" + tag,
          desc:
            "Hitung skor keselarasan tiap hidden encoder h_j terhadap state decoder " +
            (state.mech === "bahdanau" ? "s_{t-1}" : "s_t") +
            " memakai aturan " +
            (state.mech === "bahdanau"
              ? "Bahdanau (additive)."
              : "Luong " + state.luongScore + "."),
          latex: [
            ["Rumus", scoreRuleLatex()],
            ["Skor e", "e = " + vl(dec.e)],
          ],
        });
        // (2) bobot softmax
        out.push({
          stage: "alpha",
          decT: t,
          title: "Bobot α via softmax" + tag,
          desc:
            "Normalisasi skor menjadi bobot perhatian (jumlah = 1). Bar yang makin gelap = bobot makin besar.",
          latex: [
            ["Rumus", "\\alpha_{tj}=\\softmax(e)_j"],
            ["Bobot α", "\\alpha = " + vl(dec.alpha)],
          ],
        });
        // (3) context vector
        out.push({
          stage: "context",
          decT: t,
          title: "Context vector c" + tag,
          desc: "Jumlah berbobot seluruh hidden encoder — fokus pada posisi dengan α besar.",
          latex: [
            ["Rumus", "c_t=\\sum_j \\alpha_{tj} h_j"],
            ["Substitusi", contextSubLatex(m.H, dec.alpha)],
            ["Hasil", "c_t = " + vl(dec.c)],
          ],
        });
        // (4) decoder pakai context
        out.push({
          stage: "dec",
          decT: t,
          title: "Decoder pakai context" + tag,
          desc:
            state.mech === "bahdanau"
              ? "Context masuk ke perhitungan state decoder s_t."
              : "Luong: gabungkan context dengan state decoder menjadi s̃_t.",
          latex:
            state.mech === "bahdanau"
              ? [
                  ["Rumus", "s_t = \\tanh(W_a s_{t-1}+U_a c_t)"],
                  ["Hasil", "s_t = " + vl(dec.sNew)],
                ]
              : [
                  ["Rumus", "\\tilde{s}_t=\\tanh(W_c[c_t;s_t])"],
                  ["Substitusi", "[c_t;s_t] = " + vl(dec.c.concat(dec.sNew))],
                  ["Hasil", "\\tilde{s}_t = " + vl(dec.sTilde)],
                ],
        });
        // (5) output
        out.push({
          stage: "out",
          decT: t,
          title: "Output y" + tag,
          desc: "Output decoder pada timestep ini.",
          latex: [
            ["Rumus", "y_t = \\softmax(" + (state.mech === "bahdanau" ? "s_t" : "\\tilde{s}_t") + ")"],
            ["Hasil", "y_t = " + vl(dec.y)],
          ],
        });
      });
      return out;
    }

    function contextSubLatex(H, alpha) {
      return (
        "c_t = " +
        H.map((h, j) => M.fmt(alpha[j]) + "\\cdot " + vl(h)).join(" + ")
      );
    }

    // ---------- render rumus + viz ----------
    function renderStep(i, step) {
      if (!step) {
        el.viz.innerHTML = "";
        return;
      }
      el.stepTitle.textContent = step.title;
      el.stepDesc.textContent = step.desc;
      el.formula.innerHTML = step.latex.map((p) => fbox(p[0], p[1])).join("");
      if (state.attn === "without") renderVizWithout(step);
      else renderVizWith(step);
    }

    // ===================== SVG VISUALISASI =====================
    const COL = {
      enc: "#2563eb",
      ctx: "#9c4f2e",
      dec: "#0891b2",
      arrow: "#3b82f6",
      ring: "#22d3ee",
      white: "#ffffff",
    };

    function renderVizWith(step) {
      const m = model;
      const dec = m.decoders[step.decT] || m.decoders[0];
      const reached = (s) => stageOrder(step.stage) >= stageOrder(s);
      el.vizTitle.textContent =
        "Encoder–Attention–Decoder" +
        (m.decN > 1 ? " · dec t" + (step.decT + 1) + "/" + m.decN : "");

      // ---- tata letak vertikal: encoder (bawah) -> α bars -> context -> decoder ----
      const N = m.N;
      const encW = 84,
        encH = 46,
        gap = 70;
      const W = Math.max(560, 130 + N * (encW + gap));
      const H = 420;
      const x0 = (W - (N * encW + (N - 1) * gap)) / 2; // baris encoder di tengah
      const encX = (j) => x0 + j * (encW + gap);
      const encCx = (j) => encX(j) + encW / 2;
      const encY = 322; // baris encoder (paling bawah)
      const barBase = encY - 8, // dasar α bar tepat di atas encoder
        barMaxH = 64,
        barW = 36;
      const bandTop = barBase - barMaxH - 20, // pita attention membungkus bar
        bandBot = encY + 2;
      const ctxX = x0 + (N * encW + (N - 1) * gap) / 2, // context di tengah-atas
        ctxY = 78,
        ctxR = 30;
      const decW = 128,
        decH = 56,
        decCx = W - 84,
        decY = 50; // decoder (kanan-atas)
      const showAlpha = reached("alpha"),
        showCtx = reached("context"),
        showDec = reached("dec");

      let g = "";

      // --- pita attention (membungkus α bars) ---
      g += D.rect(20, bandTop, W - 40, bandBot - bandTop, {
        rx: 8,
        fill: "transparent",
        stroke: showAlpha ? COL.ring : "currentColor",
        dash: "4 3",
        opacity: 0.7,
      });
      g += D.text(28, bandTop + 12, "Attention Layer", {
        anchor: "start",
        size: 11,
        fill: "currentColor",
      });

      // --- encoder boxes (bawah) + α bars di atasnya ---
      const maxA = Math.max.apply(null, dec.alpha) || 1;
      const barTopY = []; // simpan puncak tiap bar utk fan-in ke context
      for (let j = 0; j < N; j++) {
        const cx = encCx(j),
          a = dec.alpha[j];
        // encoder box
        g += D.rect(encX(j), encY, encW, encH, { rx: 8, fill: COL.enc, stroke: COL.enc });
        g += D.text(cx, encY + 17, "h" + (j + 1), { fill: COL.white, size: 12, weight: 700 });
        g += D.text(cx, encY + 34, vl0(m.H[j]), { fill: COL.white, size: 10 });
        // α bar (muncul setelah softmax)
        if (showAlpha) {
          const bh = 10 + (a / maxA) * (barMaxH - 10);
          const by = barBase - bh;
          barTopY[j] = by;
          g += D.rect(cx - barW / 2, by, barW, bh, {
            rx: 3,
            fill: D.attn(a),
            stroke: COL.arrow,
            strokeW: 1,
          });
          g += D.text(cx, by - 8, "α=" + M.fmt(a, 2), { size: 10, fill: "currentColor" });
        } else {
          // sebelum softmax: panah polos encoder -> pita attention
          g += D.line(cx, encY, cx, bandBot - 4, { color: COL.arrow, width: 1.5, opacity: 0.5 });
        }
      }
      g += D.text(x0, encY + encH + 18, "Encoder hidden states", {
        anchor: "start",
        size: 11,
        fill: "currentColor",
      });

      // --- context node + fan-in: tiap α bar menyatu ke c  (c = Σ αⱼhⱼ) ---
      if (showCtx) {
        for (let j = 0; j < N; j++) {
          const cx = encCx(j),
            a = dec.alpha[j];
          const fromY = barTopY[j] !== undefined ? barTopY[j] : barBase - 12;
          g += D.line(cx, fromY, ctxX, ctxY + ctxR, {
            color: COL.arrow,
            width: 1 + (a / maxA) * 3,
            opacity: 0.3 + (a / maxA) * 0.6,
          });
        }
        g += D.circle(ctxX, ctxY, ctxR, {
          fill: COL.ctx,
          stroke: step.stage === "context" ? COL.ring : COL.ctx,
          strokeW: step.stage === "context" ? 3 : 1.5,
        });
        g += D.text(ctxX, ctxY - 5, "c", { fill: COL.white, size: 13, weight: 700 });
        g += D.text(ctxX, ctxY + 11, vl0(dec.c), { fill: COL.white, size: 9 });
      }

      // --- decoder box (kanan-atas) ---
      if (showDec) {
        g += D.line(ctxX + ctxR, ctxY, decCx - decW / 2, decY + decH / 2, { color: COL.arrow, width: 2 });
        g += D.rect(decCx - decW / 2, decY, decW, decH, {
          rx: 8,
          fill: COL.dec,
          stroke: step.stage === "dec" ? COL.ring : COL.dec,
          strokeW: step.stage === "dec" ? 3 : 1.5,
        });
        const sShow = dec.sTilde || dec.sNew;
        g += D.text(decCx, decY + 19, state.mech === "luong" ? "s̃ (decoder)" : "s (decoder)", {
          fill: COL.white,
          size: 11,
          weight: 700,
        });
        g += D.text(decCx, decY + 38, vl0(sShow), { fill: COL.white, size: 10 });
      }

      // --- output ---
      if (reached("out")) {
        g += D.line(decCx, decY, decCx, 24, { color: COL.arrow, width: 2 });
        g += D.text(decCx, 13, "y = " + vl0(dec.y), { size: 12, weight: 700, fill: "currentColor" });
      }

      el.viz.innerHTML =
        D.svg(W, H, g) +
        '<div class="note">α menyoroti hidden encoder mana yang paling diperhatikan untuk timestep decoder ini. ' +
        "Context c = Σ α<sub>j</sub> h<sub>j</sub> meringkas seluruh sekuens secara dinamis.</div>";
    }

    function renderVizWithout(step) {
      const m = model;
      el.vizTitle.textContent = "Tanpa attention — bottleneck hidden terakhir";
      const N = m.N;
      const W = 120 + N * 110;
      const H = 300;
      const encY = 210;
      const encW = 76,
        encH = 46;
      const gap = (W - 80 - N * encW) / Math.max(1, N - 1);
      const x0 = 40;
      const encX = (j) => x0 + j * (encW + gap);
      const decX = W - 110,
        decY = 60;
      const hLast = m.H[N - 1];
      const sDec = step.sSnap || M.tanh(M.matVec(m.W.Wa, hLast));

      let g = "";
      for (let j = 0; j < N; j++) {
        const x = encX(j),
          cx = x + encW / 2;
        const isLast = j === N - 1;
        g += D.rect(x, encY, encW, encH, {
          rx: 8,
          fill: COL.enc,
          stroke: isLast ? COL.ring : COL.enc,
          strokeW: isLast ? 3 : 1.5,
          opacity: isLast ? 1 : 0.45,
        });
        g += D.text(cx, encY + 16, "h" + (j + 1), { fill: COL.white, size: 12, weight: 700 });
        g += D.text(cx, encY + 33, vl0(m.H[j]), { fill: COL.white, size: 10 });
        if (isLast) {
          // satu panah dari hidden terakhir ke decoder
          g += D.line(cx, encY, decX - 30, decY + 50, { color: COL.arrow, width: 2.5 });
        }
      }
      g += D.text(x0, encY + encH + 18, "Hanya h" + N + " yang dipakai (sisanya pudar)", {
        anchor: "start",
        size: 11,
        fill: "currentColor",
      });

      // decoder
      const dboxW = 92,
        dboxH = 50;
      const showDec = step.stage === "dec" || step.stage === "out";
      g += D.rect(decX - dboxW / 2, decY, dboxW, dboxH, {
        rx: 8,
        fill: COL.dec,
        stroke: step.stage === "dec" ? COL.ring : COL.dec,
        strokeW: step.stage === "dec" ? 3 : 1.5,
        opacity: showDec ? 1 : 0.5,
      });
      g += D.text(decX, decY + 16, "s (decoder)", { fill: COL.white, size: 11, weight: 700 });
      g += D.text(decX, decY + 34, showDec ? vl0(sDec) : "…", { fill: COL.white, size: 10 });

      if (step.stage === "out") {
        g += D.line(decX, decY, decX, 24, { color: COL.arrow, width: 2 });
        g += D.text(decX, 14, "y = " + vl0(step.ySnap), {
          size: 12,
          weight: 700,
          fill: "currentColor",
        });
      }

      el.viz.innerHTML =
        D.svg(W, H, g) +
        '<div class="note"><b>Bottleneck:</b> tidak ada bobot α — decoder hanya menerima ' +
        "hidden state terakhir. Untuk sekuens panjang, informasi di awal cenderung hilang. " +
        "Bandingkan dengan mode <i>dengan attention</i>.</div>";
    }

    // vektor pendek utk label SVG: "0.2,0.4"
    function vl0(v) {
      return v.map((x) => M.fmt(x, 2)).join(", ");
    }

    // urutan stage utk "reveal" progresif
    function stageOrder(s) {
      const o = { score: 1, alpha: 2, context: 3, dec: 4, out: 5 };
      return o[s] || 0;
    }

    // ---------- stepper ----------
    const stepper = MLSim.makeStepper({
      controlsEl: root.querySelector("#att-stepper"),
      getSteps: () => steps,
      onStep: renderStep,
      onReset: () => {
        computeSteps();
      },
      speedMs: 1100,
    });

    function rebuild() {
      // tampil/sembunyikan select skor Luong
      el.luongField.style.display = state.mech === "luong" ? "block" : "none";
      el.note.innerHTML = noteText();
      computeSteps();
      stepper.goto(0);
    }

    // ---------- events ----------
    function segHandler(container, key, after) {
      container.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        state[key] = b.getAttribute("data-v");
        Array.prototype.forEach.call(container.children, (c) =>
          c.classList.toggle("active", c === b)
        );
        if (after) after();
        rebuild();
      });
    }
    segHandler(el.arch, "arch");
    segHandler(el.mech, "mech");
    segHandler(el.toggle, "attn");

    el.luongScore.addEventListener("change", () => {
      state.luongScore = el.luongScore.value;
      rebuild();
    });
    el.n.addEventListener("input", () => {
      state.N = parseInt(el.n.value, 10) || 3;
      el.nOut.textContent = state.N;
      rebuild();
    });
    el.seed.addEventListener("input", () => {
      state.seed = parseInt(el.seed.value, 10) || 1;
      rebuild();
    });

    // init
    rebuild();

    return {
      refreshFormula: () => stepper.fire(),
    };
  }

  MLSim.Attention = { init };
})();
