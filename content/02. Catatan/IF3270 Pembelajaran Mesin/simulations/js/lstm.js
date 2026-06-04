/* lstm.js — simulator forward propagation sel LSTM (gaya diagram "colah").
 * Menempel ke window.MLSim.LSTM (classic script, tanpa modul). */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});
  const M = MLSim.mat;
  const D = MLSim.draw;

  // vektor -> latex "[a,\,b,\,c]"
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

  // warna tema
  const COL = {
    gate: "#e8a23a", // blok gerbang
    gateText: "#1f2937",
    cell: "#2563eb", // garis cell state
    hidden: "#0891b2", // garis hidden state
    arrow: "#3b82f6",
    active: "#22d3ee", // ring blok aktif
    op: "#ffffff", // isi node operator
  };

  function init(root) {
    let state = {
      preset: "mini", // mini | acak
      hidden: 2,
      seed: 7,
      view: "detail", // detail | unfolded
      pcInput: 1,
      pcHidden: 10,
      pcOutput: 1,
    };
    let model = null;
    let steps = [];

    root.innerHTML =
      '<div class="sim-layout">' +
      '  <div class="col-controls">' +
      '    <div class="panel">' +
      "      <h3>Konfigurasi LSTM</h3>" +
      '      <div class="field"><label>Preset / Input</label>' +
      '        <select id="lstm-preset">' +
      '          <option value="mini">LSTM mini (sekuens 1, 2, 0.5)</option>' +
      '          <option value="acak">Acak (seed)</option>' +
      "        </select>" +
      '        <div class="hint" id="lstm-preset-hint"></div></div>' +
      '      <div class="field"><label>Jumlah hidden unit: <span id="lstm-hid-out">2</span></label>' +
      '        <div class="range-row"><input type="range" id="lstm-hidden" min="1" max="3" step="1" value="2"/></div></div>' +
      '      <div class="field" id="lstm-seed-field"><label>Seed bobot acak</label>' +
      '        <input type="number" id="lstm-seed" value="7" min="1" max="9999"/></div>' +
      '      <div class="field"><label>Tampilan</label>' +
      '        <div class="seg" id="lstm-view">' +
      '          <button data-v="detail" class="active">Sel detail</button>' +
      '          <button data-v="unfolded">Unfolded</button>' +
      "        </div></div>" +
      "    </div>" +
      '    <div class="panel">' +
      "      <h3>Jumlah Parameter</h3>" +
      '      <div class="field"><label>Dim input</label><input type="number" id="lstm-pc-in" value="1" min="1"/></div>' +
      '      <div class="field"><label>Hidden unit</label><input type="number" id="lstm-pc-hid" value="10" min="1"/></div>' +
      '      <div class="field"><label>Dim output</label><input type="number" id="lstm-pc-out" value="1" min="1"/></div>' +
      '      <div id="lstm-pc-result"></div>' +
      "    </div>" +
      "  </div>" +
      '  <div class="col-main">' +
      '    <div class="stepper" id="lstm-stepper"></div>' +
      '    <div class="panel formula-panel">' +
      '      <div class="step-title" id="lstm-step-title">—</div>' +
      '      <div class="step-desc" id="lstm-step-desc"></div>' +
      '      <div id="lstm-formula"></div>' +
      "    </div>" +
      '    <div class="panel">' +
      '      <h3 id="lstm-viz-title">Sel LSTM</h3>' +
      '      <div id="lstm-viz"></div>' +
      "    </div>" +
      "  </div>" +
      "</div>";

    const el = {
      preset: root.querySelector("#lstm-preset"),
      presetHint: root.querySelector("#lstm-preset-hint"),
      hidden: root.querySelector("#lstm-hidden"),
      hidOut: root.querySelector("#lstm-hid-out"),
      seedField: root.querySelector("#lstm-seed-field"),
      seed: root.querySelector("#lstm-seed"),
      view: root.querySelector("#lstm-view"),
      pcIn: root.querySelector("#lstm-pc-in"),
      pcHid: root.querySelector("#lstm-pc-hid"),
      pcOut: root.querySelector("#lstm-pc-out"),
      pcResult: root.querySelector("#lstm-pc-result"),
      stepTitle: root.querySelector("#lstm-step-title"),
      stepDesc: root.querySelector("#lstm-step-desc"),
      formula: root.querySelector("#lstm-formula"),
      vizTitle: root.querySelector("#lstm-viz-title"),
      viz: root.querySelector("#lstm-viz"),
    };

    // ---------- bangun model ----------
    function buildModel() {
      const n = state.hidden;
      let inputs, labels, inDim;
      if (state.preset === "mini") {
        const p = (MLSim.presets && MLSim.presets.lstm) || {
          inputs: [[1], [2], [0.5]],
        };
        inputs = p.inputs.map((x) => x.slice());
        labels = (p.sequenceLabels || inputs.map((x) => M.fmtVec(x))).slice();
        inDim = inputs[0].length;
      } else {
        inDim = 2;
        inputs = M.randMat(3, 2, state.seed + 5, 1);
        labels = ["x1", "x2", "x3"];
      }
      const z = n + inDim; // dimensi [h_prev ; x]
      return {
        inputs,
        labels,
        n,
        inDim,
        Wf: M.randMat(n, z, state.seed, 0.3),
        Wi: M.randMat(n, z, state.seed + 1, 0.3),
        Wc: M.randMat(n, z, state.seed + 2, 0.3),
        Wo: M.randMat(n, z, state.seed + 3, 0.3),
        bf: M.zeros(n),
        bi: M.zeros(n),
        bc: M.zeros(n),
        bo: M.zeros(n),
      };
    }

    // ---------- bangun langkah (6 sub-langkah × jumlah timestep) ----------
    function computeSteps() {
      model = buildModel();
      const m = model;
      const out = [];
      let h = M.zeros(m.n);
      let c = M.zeros(m.n);
      const hAll = []; // h tiap timestep (utk unfolded)
      const cAll = []; // C tiap timestep

      for (let t = 0; t < m.inputs.length; t++) {
        const x = m.inputs[t];
        const cat = h.concat(x); // z = [h_prev ; x]
        const xlbl = m.labels[t] || M.fmtVec(x);
        const cPrev = c.slice();
        const hPrev = h.slice();

        const ft = M.sigmoid(M.vecAdd(M.matVec(m.Wf, cat), m.bf));
        const it = M.sigmoid(M.vecAdd(M.matVec(m.Wi, cat), m.bi));
        const ctil = M.tanh(M.vecAdd(M.matVec(m.Wc, cat), m.bc));
        const cNew = M.vecAdd(M.hadamard(cPrev, ft), M.hadamard(it, ctil));
        const ot = M.sigmoid(M.vecAdd(M.matVec(m.Wo, cat), m.bo));
        const hNew = M.hadamard(ot, M.tanh(cNew));

        // snapshot kumulatif gerbang yang sudah dihitung
        function snap(stage, gates) {
          return {
            t,
            stage,
            gates: Object.assign({}, gates),
            cPrev,
            hPrev,
            x,
            xlbl,
            // C / h yang ditampilkan pada garis utama
            cLine: stage === "c" || stage === "o" || stage === "h" ? cNew : cPrev,
            hLine: stage === "h" ? hNew : hPrev,
            cAll: cAll.slice(),
            hAll: hAll.slice(),
            cNew,
            hNew,
          };
        }
        const pre = "^{(" + (t + 1) + ")}";

        out.push({
          kind: "f",
          t,
          title: "t" + (t + 1) + " · Forget gate (f)",
          desc:
            "Tentukan berapa banyak isi cell state lama yang dipertahankan " +
            "(0 = lupakan, 1 = simpan penuh).",
          latex: [
            ["Rumus", "f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)"],
            [
              "Substitusi",
              "f" + pre + " = \\sigma(W_f \\cdot " + vl(cat) + " + " + vl(m.bf) + ")",
            ],
            ["Hasil", "f" + pre + " = " + vl(ft)],
          ],
          snap: snap("f", { f: ft }),
        });

        out.push({
          kind: "i",
          t,
          title: "t" + (t + 1) + " · Input gate (i)",
          desc: "Tentukan berapa banyak informasi kandidat baru yang akan ditulis ke cell state.",
          latex: [
            ["Rumus", "i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i)"],
            [
              "Substitusi",
              "i" + pre + " = \\sigma(W_i \\cdot " + vl(cat) + " + " + vl(m.bi) + ")",
            ],
            ["Hasil", "i" + pre + " = " + vl(it)],
          ],
          snap: snap("i", { f: ft, i: it }),
        });

        out.push({
          kind: "chat",
          t,
          title: "t" + (t + 1) + " · Kandidat cell (C̃)",
          desc: "Hitung kandidat nilai baru untuk cell state lewat aktivasi tanh.",
          latex: [
            ["Rumus", "\\tilde{C}_t = \\tanh(W_C \\cdot [h_{t-1}, x_t] + b_C)"],
            [
              "Substitusi",
              "\\tilde{C}" + pre + " = \\tanh(W_C \\cdot " + vl(cat) + " + " + vl(m.bc) + ")",
            ],
            ["Hasil", "\\tilde{C}" + pre + " = " + vl(ctil)],
          ],
          snap: snap("chat", { f: ft, i: it, chat: ctil }),
        });

        out.push({
          kind: "c",
          t,
          title: "t" + (t + 1) + " · Update cell state (C)",
          desc:
            "Gabungkan memori lama yang sudah dilupakan sebagian (C_{t-1} ⊙ f) " +
            "dengan kandidat baru (i ⊙ C̃) lewat penjumlahan ⊕.",
          latex: [
            ["Rumus", "C_t = C_{t-1} \\odot f_t \\oplus i_t \\odot \\tilde{C}_t"],
            [
              "Substitusi",
              "C" +
                pre +
                " = " +
                vl(cPrev) +
                " \\odot " +
                vl(ft) +
                " \\oplus " +
                vl(it) +
                " \\odot " +
                vl(ctil),
            ],
            ["Hasil", "C" + pre + " = " + vl(cNew)],
          ],
          snap: snap("c", { f: ft, i: it, chat: ctil, c: cNew }),
        });

        out.push({
          kind: "o",
          t,
          title: "t" + (t + 1) + " · Output gate (o)",
          desc: "Tentukan bagian cell state mana yang akan dikeluarkan sebagai hidden state.",
          latex: [
            ["Rumus", "o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o)"],
            [
              "Substitusi",
              "o" + pre + " = \\sigma(W_o \\cdot " + vl(cat) + " + " + vl(m.bo) + ")",
            ],
            ["Hasil", "o" + pre + " = " + vl(ot)],
          ],
          snap: snap("o", { f: ft, i: it, chat: ctil, c: cNew, o: ot }),
        });

        out.push({
          kind: "h",
          t,
          title: "t" + (t + 1) + " · Hidden state (h)",
          desc: "Hidden state baru = output gate ⊙ tanh(cell state). Inilah keluaran timestep ini.",
          latex: [
            ["Rumus", "h_t = o_t \\odot \\tanh(C_t)"],
            [
              "Substitusi",
              "h" + pre + " = " + vl(ot) + " \\odot \\tanh(" + vl(cNew) + ")",
            ],
            ["Hasil", "h" + pre + " = " + vl(hNew)],
          ],
          snap: snap("h", { f: ft, i: it, chat: ctil, c: cNew, o: ot, h: hNew }),
        });

        h = hNew;
        c = cNew;
        hAll.push(hNew);
        cAll.push(cNew);
      }
      // simpan ringkasan akhir utk unfolded
      model.hAll = hAll;
      model.cAll = cAll;
      steps = out;
    }

    // ---------- render langkah ----------
    function renderStep(i, step) {
      if (!step) return;
      el.stepTitle.textContent = step.title;
      el.stepDesc.textContent = step.desc;
      el.formula.innerHTML = step.latex.map((p) => fbox(p[0], p[1])).join("");
      if (state.view === "unfolded") renderUnfolded(step);
      else renderCell(step);
    }

    // ============ SVG: sel detail (gaya colah) ============
    function renderCell(step) {
      const g = step.snap.gates || {};
      el.vizTitle.textContent =
        "Sel LSTM — t" + (step.t + 1) + " (x = " + step.snap.xlbl + ")";

      const W = 960,
        H = 450;
      const cellX = 60,
        cellY = 72,
        cellW = 600,
        cellH = 300;
      const cellR = cellX + cellW; // tepi kanan kotak sel (660)
      const topY = cellY + 56; // garis cell state (atas) = 128
      const botY = cellY + cellH - 56; // garis hidden (bawah) = 316
      const opR = 15;
      const cellOn = step.kind === "c" || step.kind === "o" || step.kind === "h";
      const litH = step.kind === "h";

      // --- kolom-kolom terpisah (kiri→kanan) supaya tak ada yang menumpuk ---
      const blockW = 84,
        blockH = 56,
        blockY = 210;
      const blocks = [
        { k: "f", cx: 152, label: "Forget", sym: "σ" },
        { k: "i", cx: 272, label: "Input", sym: "σ" },
        { k: "chat", cx: 380, label: "Kandidat", sym: "tanh" },
        { k: "o", cx: 520, label: "Output", sym: "σ" },
      ];
      const cx = (i) => blocks[i].cx;
      const xMulF = cx(0); // ⊗ forget tepat di atas Forget
      const xMulIC = Math.round((cx(1) + cx(2)) / 2); // ⊗ (i·C̃) di antara Input & Kandidat
      const yMulIC = blockY - 36;
      const xAdd = xMulIC; // ⊕ di garis cell, sejajar ⊗(i·C̃)
      const xOut = 600; // kolom output: tanh + ⊗o
      const tanhCY = 244; // pusat pil tanh
      const lineEndX = 772; // ujung garis C/h (panah keluar)
      const xUp = 712; // cabang h ke atas (di antara ujung garis & label)
      const labelX = 784; // label kanan (anchor start), jelas di luar sel

      function opNode(ox, oy, sym, lit) {
        return (
          D.circle(ox, oy, opR, {
            fill: COL.op,
            stroke: lit ? COL.active : "currentColor",
            strokeW: lit ? 3 : 1.5,
          }) + D.text(ox, oy + 1, sym, { size: 15, fill: "#0f172a", weight: 700 })
        );
      }

      let s = "";
      // kotak sel
      s += D.rect(cellX, cellY, cellW, cellH, {
        rx: 18,
        fill: "rgba(148,163,184,0.06)",
        stroke: "currentColor",
        strokeW: 1.5,
      });

      // ---- garis CELL STATE (atas): C(t-1) -> ⊗f -> ⊕ -> C(t) ----
      s += D.line(0, topY, xMulF - opR, topY, { color: COL.cell, width: 3, arrow: false, opacity: step.kind === "f" || cellOn ? 1 : 0.6 });
      s += D.line(xMulF + opR, topY, xAdd - opR, topY, { color: COL.cell, width: 3, arrow: false, opacity: cellOn ? 1 : 0.5 });
      s += D.line(xAdd + opR, topY, lineEndX, topY, { color: COL.cell, width: 3, arrow: true, opacity: cellOn ? 1 : 0.5 });
      s += D.text(14, topY - 14, "C(t-1)", { anchor: "start", size: 13, fill: COL.cell, weight: 700 });

      // ---- garis HIDDEN (bawah): h(t-1) masuk kiri, h(t) keluar kanan ----
      s += D.line(0, botY, xOut - opR, botY, { color: COL.hidden, width: 2.5, arrow: false, opacity: 0.85 });
      s += D.line(xOut + opR, botY, lineEndX, botY, { color: COL.hidden, width: 2.5, arrow: true, opacity: litH ? 1 : 0.85 });
      s += D.text(14, botY + 18, "h(t-1)", { anchor: "start", size: 13, fill: COL.hidden, weight: 700 });

      // ---- label hasil C(t) & h(t) di kanan (di luar sel, tidak menumpuk) ----
      s += D.text(labelX, topY - 4, "C(t)", { anchor: "start", size: 13, fill: COL.cell, weight: 700 });
      if (cellOn)
        s += D.text(labelX, topY + 14, "= " + M.fmtVec(step.snap.cNew, 2), { anchor: "start", size: 11, fill: COL.cell });
      s += D.text(labelX, botY - 6, "h(t)", { anchor: "start", size: 13, fill: COL.hidden, weight: 700 });
      if (litH)
        s += D.text(labelX, botY + 14, "= " + M.fmtVec(step.snap.hNew, 2), { anchor: "start", size: 11, fill: COL.hidden });

      // x(t) masuk dari bawah
      const xInX = cellX + 36;
      s += D.line(xInX, H - 8, xInX, botY, { color: COL.arrow, width: 2, arrow: true });
      s += D.text(xInX, H - 20, "x(t) = " + step.snap.xlbl, { anchor: "middle", size: 12, fill: COL.arrow, weight: 700 });

      // feed dari garis bawah ([h_{t-1}, x_t]) ke tiap blok gerbang
      blocks.forEach((b) => {
        const on = g[b.k] !== undefined;
        s += D.line(b.cx, botY, b.cx, blockY + blockH, { color: COL.arrow, width: 1.5, arrow: true, opacity: on ? 0.9 : 0.3 });
      });

      // blok gerbang
      blocks.forEach((b) => {
        const on = g[b.k] !== undefined;
        const current = step.kind === b.k;
        s += D.rect(b.cx - blockW / 2, blockY, blockW, blockH, {
          rx: 10,
          fill: COL.gate,
          stroke: current ? COL.active : "rgba(0,0,0,0.2)",
          strokeW: current ? 3.5 : 1,
          opacity: on ? 1 : 0.45,
        });
        s += D.text(b.cx, blockY + 20, b.label, { size: 12, fill: COL.gateText, weight: 700 });
        s += D.text(b.cx, blockY + 39, b.sym, { size: 13, fill: COL.gateText, italic: true });
        if (on)
          s += D.text(b.cx, blockY + blockH + 17, M.fmtVec(g[b.k], 2), {
            size: 11,
            fill: current ? COL.active : "currentColor",
            weight: current ? 700 : 400,
          });
      });

      // Forget -> ⊗f (lurus ke atas), ⊗f di garis cell
      s += D.line(cx(0), blockY, xMulF, topY + opR, { color: COL.gate, width: 2, arrow: true, opacity: g.f !== undefined ? 1 : 0.3 });
      s += opNode(xMulF, topY, "⊗", step.kind === "c" || step.kind === "f");

      // Input & Kandidat -> ⊗(i·C̃) -> ⊕ (di garis cell)
      s += D.line(cx(1), blockY, xMulIC - 5, yMulIC + opR, { color: COL.gate, width: 2, arrow: true, opacity: g.i !== undefined ? 1 : 0.3 });
      s += D.line(cx(2), blockY, xMulIC + 5, yMulIC + opR, { color: COL.gate, width: 2, arrow: true, opacity: g.chat !== undefined ? 1 : 0.3 });
      s += opNode(xMulIC, yMulIC, "⊗", step.kind === "c");
      s += D.line(xAdd, yMulIC - opR, xAdd, topY + opR, { color: COL.cell, width: 2, arrow: true, opacity: cellOn ? 1 : 0.4 });
      s += opNode(xAdd, topY, "⊕", cellOn);

      // ---- kolom OUTPUT: cabang C(t) turun -> tanh -> ⊗o (di garis h) ----
      // cabang turun dari garis cell (di x=xOut) ke pil tanh
      s += D.line(xOut, topY, xOut, tanhCY - 16, { color: COL.cell, width: 2, arrow: true, opacity: litH ? 1 : 0.4 });
      s += D.rect(xOut - 32, tanhCY - 16, 64, 30, { rx: 15, fill: COL.op, stroke: litH ? COL.active : "currentColor", strokeW: litH ? 3 : 1.5 });
      s += D.text(xOut, tanhCY, "tanh", { size: 12, fill: "#0f172a", weight: 700 });
      // tanh -> ⊗o
      s += D.line(xOut, tanhCY + 16, xOut, botY - opR, { color: COL.cell, width: 2, arrow: true, opacity: litH ? 1 : 0.4 });
      // Output gate -> ⊗o (diagonal dari kiri, ruang terbuka)
      s += D.line(cx(3) + blockW / 2 - 6, blockY + blockH - 10, xOut - opR - 2, botY - 8, { color: COL.gate, width: 2, arrow: true, opacity: g.o !== undefined ? 1 : 0.3 });
      s += opNode(xOut, botY, "⊗", litH);

      // ---- cabang h(t) ke atas: "ke layer / timestep berikutnya" ----
      s += D.line(xUp, botY, xUp, 38, { color: COL.hidden, width: 2.5, arrow: true, dash: "5,4", opacity: litH ? 1 : 0.45 });
      s += D.text(xUp, 22, "ke layer / timestep berikutnya", { anchor: "middle", size: 11, fill: COL.hidden, italic: true });

      el.viz.innerHTML =
        D.svg(W, H, s, "lstm-cell") +
        '<div class="note">Garis biru atas adalah <b>cell state</b> (semacam "conveyor belt"): ' +
        "ia diperbarui hanya lewat ⊗ (forget) dan ⊕ (penjumlahan), sehingga gradien dapat mengalir " +
        "jauh tanpa cepat menghilang — keunggulan LSTM atas Simple RNN.</div>";
    }

    // ============ SVG: unfolded ============
    function renderUnfolded(step) {
      const m = model;
      const T = m.inputs.length;
      el.vizTitle.textContent = "LSTM unfolded — alur C dan h antar timestep";

      const cellW = 150,
        cellH = 120,
        gap = 60,
        padX = 60,
        topPad = 50;
      const W = padX * 2 + T * cellW + (T - 1) * gap;
      const H = cellH + topPad + 130;
      const cy = topPad + cellH / 2;
      const cLineY = topPad + 20;
      const hLineY = topPad + cellH - 20;
      let s = "";

      // garis C masuk paling kiri
      s += D.text(20, cLineY - 12, "C", { anchor: "start", size: 12, fill: COL.cell, weight: 700 });
      s += D.text(20, hLineY + 16, "h", { anchor: "start", size: 12, fill: COL.hidden, weight: 700 });

      for (let t = 0; t < T; t++) {
        const x0 = padX + t * (cellW + gap);
        const active = t === step.t;
        // status nilai: sudah final bila t < step.t, atau t==step.t dan kind=='h'
        let cVal = "—",
          hVal = "—";
        if (t < step.t) {
          cVal = M.fmtVec(m.cAll[t], 2);
          hVal = M.fmtVec(m.hAll[t], 2);
        } else if (t === step.t) {
          cVal = step.snap.cLine ? M.fmtVec(step.snap.cLine, 2) : "—";
          hVal = step.kind === "h" ? M.fmtVec(step.snap.hNew, 2) : "…";
        }

        // kotak sel
        s += D.rect(x0, topPad, cellW, cellH, {
          rx: 14,
          fill: active ? "rgba(34,211,238,0.10)" : "rgba(148,163,184,0.06)",
          stroke: active ? COL.active : "currentColor",
          strokeW: active ? 3 : 1.3,
        });
        s += D.text(x0 + cellW / 2, topPad + 18, "LSTM t" + (t + 1), {
          size: 13,
          weight: 700,
          fill: active ? COL.active : "currentColor",
        });
        s += D.text(x0 + cellW / 2, topPad + cellH / 2, "x = " + (m.labels[t] || M.fmtVec(m.inputs[t])), {
          size: 12,
          fill: "currentColor",
        });

        // garis cell state melewati sel
        s += D.line(x0, cLineY, x0 + cellW, cLineY, {
          color: COL.cell,
          width: 3,
          arrow: false,
          opacity: t <= step.t ? 1 : 0.4,
        });
        // garis hidden melewati sel
        s += D.line(x0, hLineY, x0 + cellW, hLineY, {
          color: COL.hidden,
          width: 2.5,
          arrow: false,
          opacity: t <= step.t ? 1 : 0.4,
        });
        // panah antar sel
        if (t < T - 1) {
          s += D.line(x0 + cellW, cLineY, x0 + cellW + gap, cLineY, {
            color: COL.cell,
            width: 3,
            arrow: true,
            opacity: t < step.t ? 1 : 0.4,
          });
          s += D.line(x0 + cellW, hLineY, x0 + cellW + gap, hLineY, {
            color: COL.hidden,
            width: 2.5,
            arrow: true,
            opacity: t < step.t ? 1 : 0.4,
          });
        }
        // h(t) keluar ke atas (output timestep)
        s += D.line(x0 + cellW / 2, topPad, x0 + cellW / 2, 16, {
          color: COL.hidden,
          width: 2,
          arrow: true,
          dash: "4,3",
          opacity: t <= step.t ? 0.9 : 0.3,
        });

        // nilai C_t dan h_t di bawah
        s += D.text(x0 + cellW / 2, H - 46, "C" + (t + 1) + " = " + cVal, {
          size: 11,
          fill: COL.cell,
          weight: active ? 700 : 400,
        });
        s += D.text(x0 + cellW / 2, H - 26, "h" + (t + 1) + " = " + hVal, {
          size: 11,
          fill: COL.hidden,
          weight: active ? 700 : 400,
        });
      }
      // panah C/h awal masuk
      s += D.line(40, cLineY, padX, cLineY, { color: COL.cell, width: 3, arrow: true });
      s += D.line(40, hLineY, padX, hLineY, { color: COL.hidden, width: 2.5, arrow: true });

      el.viz.innerHTML =
        D.svg(W, H, s, "lstm-unfolded") +
        '<div class="note">Tiap sel berbagi bobot yang sama (W_f, W_i, W_C, W_o). ' +
        "Cell state C dan hidden state h mengalir dari kiri ke kanan; langkah aktif disorot.</div>";
    }

    // ---------- jumlah parameter ----------
    function renderParamCount() {
      const i = Math.max(1, parseInt(el.pcIn.value, 10) || 1);
      const hid = Math.max(1, parseInt(el.pcHid.value, 10) || 1);
      const o = Math.max(1, parseInt(el.pcOut.value, 10) || 1);
      const lstm = (i + hid + 1) * 4 * hid + (hid + 1) * o;
      const rnn = (i + hid + 1) * hid + (hid + 1) * o;
      const latex =
        "P = (" +
        i +
        "+" +
        hid +
        "+1)\\cdot 4\\cdot " +
        hid +
        " + (" +
        hid +
        "+1)\\cdot " +
        o +
        " = " +
        lstm;
      el.pcResult.innerHTML =
        fbox("LSTM", latex) +
        '<div class="note">Setiap LSTM punya 4 set bobot (forget, input, kandidat, output), ' +
        "jadi 4× lipat Simple RNN pada bagian rekuren. Untuk konfigurasi ini — LSTM: <b>" +
        lstm +
        "</b> · Simple RNN: <b>" +
        rnn +
        "</b> parameter.</div>" +
        '<div class="note">Contoh catatan: 1→10→1 = <b>491</b> (vs Simple RNN <b>131</b>).</div>';
    }

    // ---------- stepper ----------
    const stepper = MLSim.makeStepper({
      controlsEl: root.querySelector("#lstm-stepper"),
      getSteps: () => steps,
      onStep: renderStep,
      onReset: () => {
        computeSteps();
      },
      speedMs: 1100,
    });

    function rebuild() {
      computeSteps();
      stepper.goto(0);
    }

    // ---------- events ----------
    el.preset.addEventListener("change", () => {
      state.preset = el.preset.value;
      el.seedField.style.display = state.preset === "acak" ? "block" : "none";
      el.presetHint.textContent =
        state.preset === "acak"
          ? "Bobot & input dibangkitkan acak dari seed."
          : "Sekuens contoh skalar 1, 2, 0.5 (input 1-dim).";
      rebuild();
    });
    el.hidden.addEventListener("input", () => {
      state.hidden = parseInt(el.hidden.value, 10) || 1;
      el.hidOut.textContent = state.hidden;
      rebuild();
    });
    el.seed.addEventListener("input", () => {
      state.seed = parseInt(el.seed.value, 10) || 1;
      rebuild();
    });
    el.view.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      state.view = b.getAttribute("data-v");
      Array.prototype.forEach.call(el.view.children, (cc) =>
        cc.classList.toggle("active", cc === b)
      );
      stepper.fire(); // render ulang tampilan tanpa reset langkah
    });
    [el.pcIn, el.pcHid, el.pcOut].forEach((inp) =>
      inp.addEventListener("input", renderParamCount)
    );

    // init
    el.seedField.style.display = "none";
    el.presetHint.textContent = "Sekuens contoh skalar 1, 2, 0.5 (input 1-dim).";
    renderParamCount();
    rebuild();

    return {
      refreshFormula: () => stepper.fire(),
    };
  }

  MLSim.LSTM = { init };
})();
