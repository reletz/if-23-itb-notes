/* rnn.js — simulator forward propagation Simple RNN & LSTM. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});
  const M = MLSim.mat;

  function vl(v) {
    // vektor -> latex "[a,\,b,\,c]"
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

  function init(root) {
    let state = {
      mode: "rnn", // rnn | lstm
      preset: "catatan",
      hidden: 3,
      seed: 7,
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
      "      <h3>Model</h3>" +
      '      <div class="field"><label>Tipe jaringan</label>' +
      '        <div class="seg" id="rnn-mode">' +
      '          <button data-v="rnn" class="active">Simple RNN</button>' +
      '          <button data-v="lstm">LSTM</button>' +
      "        </div></div>" +
      '      <div class="field"><label>Preset / Input</label>' +
      '        <select id="rnn-preset"></select>' +
      '        <div class="hint" id="rnn-preset-hint"></div></div>' +
      '      <div class="field"><label>Jumlah hidden unit: <span id="rnn-hid-out">3</span></label>' +
      '        <div class="range-row"><input type="range" id="rnn-hidden" min="1" max="6" step="1" value="3"/></div></div>' +
      '      <div class="field" id="rnn-seed-field"><label>Seed bobot acak</label>' +
      '        <input type="number" id="rnn-seed" value="7" min="1" max="9999"/></div>' +
      "    </div>" +
      '    <div class="panel">' +
      "      <h3>Hitung Jumlah Parameter</h3>" +
      '      <div class="field"><label>Dim input</label><input type="number" id="pc-in" value="1" min="1"/></div>' +
      '      <div class="field"><label>Hidden unit</label><input type="number" id="pc-hid" value="10" min="1"/></div>' +
      '      <div class="field"><label>Dim output</label><input type="number" id="pc-out" value="1" min="1"/></div>' +
      '      <div id="pc-result"></div>' +
      "    </div>" +
      "  </div>" +
      '  <div class="col-main">' +
      '    <div class="stepper" id="rnn-stepper"></div>' +
      '    <div class="panel formula-panel">' +
      '      <div class="step-title" id="rnn-step-title">—</div>' +
      '      <div class="step-desc" id="rnn-step-desc"></div>' +
      '      <div id="rnn-formula"></div>' +
      "    </div>" +
      '    <div class="panel">' +
      '      <h3 id="rnn-viz-title">Visualisasi</h3>' +
      '      <div id="rnn-viz"></div>' +
      "    </div>" +
      "  </div>" +
      "</div>";

    const el = {
      mode: root.querySelector("#rnn-mode"),
      preset: root.querySelector("#rnn-preset"),
      presetHint: root.querySelector("#rnn-preset-hint"),
      hidden: root.querySelector("#rnn-hidden"),
      hidOut: root.querySelector("#rnn-hid-out"),
      seedField: root.querySelector("#rnn-seed-field"),
      seed: root.querySelector("#rnn-seed"),
      pcIn: root.querySelector("#pc-in"),
      pcHid: root.querySelector("#pc-hid"),
      pcOut: root.querySelector("#pc-out"),
      pcResult: root.querySelector("#pc-result"),
      stepTitle: root.querySelector("#rnn-step-title"),
      stepDesc: root.querySelector("#rnn-step-desc"),
      formula: root.querySelector("#rnn-formula"),
      vizTitle: root.querySelector("#rnn-viz-title"),
      viz: root.querySelector("#rnn-viz"),
    };

    const PRESETS = {
      rnn: [
        { id: "catatan", label: "Contoh catatan (ABCC, one-hot)" },
        { id: "timeseries", label: "Time-series (112,118,132,129)" },
        { id: "acak", label: "Acak (seed)" },
      ],
      lstm: [
        { id: "mini", label: "LSTM mini (sekuens 1,2,0.5)" },
        { id: "acak", label: "Acak (seed)" },
      ],
    };

    function fillPresetOptions() {
      const list = PRESETS[state.mode];
      el.preset.innerHTML = list
        .map((p) => '<option value="' + p.id + '">' + p.label + "</option>")
        .join("");
      state.preset = list[0].id;
      el.preset.value = state.preset;
    }

    // ---------- bangun model ----------
    function buildModel() {
      const n = state.hidden;
      if (state.mode === "rnn") return buildRNN(n);
      return buildLSTM(n);
    }

    function buildRNN(n) {
      let inputs, labels, outAct, Wxh, Whh, Why, bh, by, outDim, inDim;
      if (state.preset === "catatan") {
        const p = MLSim.presets.rnn;
        inputs = p.inputs.map((x) => x.slice());
        labels = p.sequenceLabels.slice();
        inDim = inputs[0].length;
        // hidden tetap 3 utk preset agar cocok angka catatan; kalau user ubah, pakai random
        if (n === p.hidden) {
          Wxh = p.Wxh.map((r) => r.slice());
          Whh = p.Whh.map((r) => r.slice());
          Why = p.Why.map((r) => r.slice());
          bh = p.bh.slice();
          by = p.by.slice();
        } else {
          Wxh = M.randMat(n, inDim, state.seed, 0.4);
          Whh = M.randMat(n, n, state.seed + 1, 0.4);
          Why = M.randMat(inDim, n, state.seed + 2, 0.4);
          bh = M.zeros(n).map(() => 0.1);
          by = M.zeros(inDim).map(() => 0.1);
        }
        outDim = inDim;
        outAct = "softmax";
      } else if (state.preset === "timeseries") {
        inputs = [[1.12], [1.18], [1.32], [1.29]];
        labels = ["112", "118", "132", "129"];
        inDim = 1;
        outDim = 1;
        Wxh = M.randMat(n, 1, state.seed, 0.5);
        Whh = M.randMat(n, n, state.seed + 1, 0.5);
        Why = M.randMat(1, n, state.seed + 2, 0.5);
        bh = M.zeros(n);
        by = M.zeros(1);
        outAct = "linear";
      } else {
        inDim = 2;
        inputs = M.randMat(4, 2, state.seed + 9, 1).map((r) => r);
        labels = ["x1", "x2", "x3", "x4"];
        outDim = 1;
        Wxh = M.randMat(n, 2, state.seed, 0.5);
        Whh = M.randMat(n, n, state.seed + 1, 0.5);
        Why = M.randMat(1, n, state.seed + 2, 0.5);
        bh = M.zeros(n);
        by = M.zeros(1);
        outAct = "linear";
      }
      return { type: "rnn", inputs, labels, Wxh, Whh, Why, bh, by, n, inDim, outDim, outAct };
    }

    function buildLSTM(n) {
      let inputs, labels, inDim;
      if (state.preset === "mini") {
        inputs = [[1], [2], [0.5]];
        labels = ["1", "2", "0.5"];
        inDim = 1;
      } else {
        inDim = 2;
        inputs = M.randMat(3, 2, state.seed + 5, 1);
        labels = ["x1", "x2", "x3"];
      }
      const z = n + inDim; // dimensi [h;x]
      const W = (s) => M.randMat(n, z, s, 0.3);
      return {
        type: "lstm",
        inputs,
        labels,
        n,
        inDim,
        Wf: W(state.seed),
        Wi: W(state.seed + 1),
        Wc: W(state.seed + 2),
        Wo: W(state.seed + 3),
        bf: M.zeros(n),
        bi: M.zeros(n),
        bc: M.zeros(n),
        bo: M.zeros(n),
      };
    }

    // ---------- bangun langkah ----------
    function computeSteps() {
      model = buildModel();
      steps = model.type === "rnn" ? stepsRNN(model) : stepsLSTM(model);
    }

    function stepsRNN(m) {
      const out = [];
      let h = M.zeros(m.n);
      const hAll = []; // simpan h tiap t utk viz
      for (let t = 0; t < m.inputs.length; t++) {
        const x = m.inputs[t];
        const wx = M.matVec(m.Wxh, x);
        const wh = M.matVec(m.Whh, h);
        const z = M.vecAdd(wx, wh, m.bh);
        const hPrev = h.slice();
        const hNew = M.tanh(z);
        out.push({
          kind: "neth",
          t,
          title: "t" + (t + 1) + " · net hidden",
          desc:
            "Hitung pra-aktivasi hidden: gabungan kontribusi input x^(" +
            (t + 1) +
            ") dan memori sebelumnya h^(" +
            t +
            ").",
          latex: [
            ["Rumus", "net_h^{(t)} = W_{xh}x^{(t)} + W_{hh}h^{(t-1)} + b_h"],
            [
              "Substitusi",
              "net_h^{(" + (t + 1) + ")} = " + vl(wx) + " + " + vl(wh) + " + " + vl(m.bh),
            ],
            ["Hasil", "net_h^{(" + (t + 1) + ")} = " + vl(z)],
          ],
          snap: { t, hAll: hAll.slice(), h: hPrev, z, stage: "neth" },
        });
        out.push({
          kind: "h",
          t,
          title: "t" + (t + 1) + " · hidden state",
          desc: "Terapkan aktivasi " + m.outAct + "/tanh untuk memperoleh hidden state baru.",
          latex: [
            ["Rumus", "h^{(t)} = \\tanh(net_h^{(t)})"],
            ["Hasil", "h^{(" + (t + 1) + ")} = \\tanh(" + vl(z) + ") = " + vl(hNew)],
          ],
          snap: { t, hAll: hAll.concat([hNew]), h: hNew, z, stage: "h" },
        });
        h = hNew;
        hAll.push(hNew);
        // output
        const ny = M.vecAdd(M.matVec(m.Why, h), m.by);
        const y = M.applyActivation(m.outAct, ny);
        const yLatex =
          m.outAct === "softmax"
            ? [
                ["Rumus", "y^{(t)} = \\softmax(W_{hy}h^{(t)} + b_{hy})"],
                ["net output", "net_y^{(" + (t + 1) + ")} = " + vl(ny)],
                ["Hasil", "y^{(" + (t + 1) + ")} = " + vl(y)],
              ]
            : [
                ["Rumus", "y^{(t)} = W_{hy}h^{(t)} + b_{hy}"],
                ["Hasil", "y^{(" + (t + 1) + ")} = " + vl(y)],
              ];
        out.push({
          kind: "y",
          t,
          title: "t" + (t + 1) + " · output",
          desc:
            m.outAct === "softmax"
              ? "Proyeksikan hidden state ke ruang output lalu softmax → distribusi kelas/token berikutnya."
              : "Proyeksikan hidden state ke output (regresi linear).",
          latex: yLatex,
          snap: { t, hAll: hAll.slice(), h, y, stage: "y" },
        });
      }
      return out;
    }

    function stepsLSTM(m) {
      const out = [];
      let h = M.zeros(m.n);
      let c = M.zeros(m.n);
      for (let t = 0; t < m.inputs.length; t++) {
        const x = m.inputs[t];
        const cat = h.concat(x); // [h_prev; x]
        const ft = M.sigmoid(M.vecAdd(M.matVec(m.Wf, cat), m.bf));
        const it = M.sigmoid(M.vecAdd(M.matVec(m.Wi, cat), m.bi));
        const ct_hat = M.tanh(M.vecAdd(M.matVec(m.Wc, cat), m.bc));
        const cNew = M.vecAdd(M.hadamard(c, ft), M.hadamard(it, ct_hat));
        const ot = M.sigmoid(M.vecAdd(M.matVec(m.Wo, cat), m.bo));
        const hNew = M.hadamard(ot, M.tanh(cNew));
        const cPrev = c.slice();
        const base = { t, gates: {} };
        const G = base.gates;
        function gstep(kind, name, sub, latex, gateVals, currentVal) {
          out.push({
            kind,
            t,
            title: "t" + (t + 1) + " · " + name,
            desc: sub,
            latex,
            snap: {
              t,
              stage: kind,
              gates: Object.assign({}, gateVals),
              c: kind === "c" || kind === "o" || kind === "h" ? cNew : cPrev,
              h: kind === "h" ? hNew : h,
            },
          });
        }
        gstep(
          "f",
          "Forget gate",
          "Berapa banyak isi cell state lama yang dipertahankan (0=lupakan, 1=simpan).",
          [
            ["Rumus", "f_t = \\sigma(W_f[h_{t-1},x_t] + b_f)"],
            ["Hasil", "f_{" + (t + 1) + "} = " + vl(ft)],
          ],
          { f: ft }
        );
        gstep(
          "i",
          "Input gate",
          "Berapa banyak kandidat informasi baru yang akan ditulis ke cell state.",
          [
            ["Rumus", "i_t = \\sigma(W_i[h_{t-1},x_t] + b_i)"],
            ["Hasil", "i_{" + (t + 1) + "} = " + vl(it)],
          ],
          { f: ft, i: it }
        );
        gstep(
          "chat",
          "Kandidat Ĉ",
          "Kandidat nilai baru untuk cell state (lewat tanh).",
          [
            ["Rumus", "\\tilde{C}_t = \\tanh(W_C[h_{t-1},x_t] + b_C)"],
            ["Hasil", "\\tilde{C}_{" + (t + 1) + "} = " + vl(ct_hat)],
          ],
          { f: ft, i: it, chat: ct_hat }
        );
        gstep(
          "c",
          "Update cell state",
          "Gabungkan memori lama (dilupakan sebagian) dengan kandidat baru.",
          [
            ["Rumus", "C_t = C_{t-1}\\odot f_t \\oplus i_t\\odot \\tilde{C}_t"],
            [
              "Substitusi",
              "C_{" +
                (t + 1) +
                "} = " +
                vl(cPrev) +
                "\\odot " +
                vl(ft) +
                " \\oplus " +
                vl(it) +
                "\\odot " +
                vl(ct_hat),
            ],
            ["Hasil", "C_{" + (t + 1) + "} = " + vl(cNew)],
          ],
          { f: ft, i: it, chat: ct_hat, c: cNew }
        );
        gstep(
          "o",
          "Output gate",
          "Bagian cell state mana yang akan dikeluarkan sebagai hidden state.",
          [
            ["Rumus", "o_t = \\sigma(W_o[h_{t-1},x_t] + b_o)"],
            ["Hasil", "o_{" + (t + 1) + "} = " + vl(ot)],
          ],
          { f: ft, i: it, chat: ct_hat, c: cNew, o: ot }
        );
        gstep(
          "h",
          "Hidden state",
          "Hidden state baru = output gate × tanh(cell state).",
          [
            ["Rumus", "h_t = o_t \\odot \\tanh(C_t)"],
            ["Hasil", "h_{" + (t + 1) + "} = " + vl(ot) + "\\odot \\tanh(" + vl(cNew) + ") = " + vl(hNew)],
          ],
          { f: ft, i: it, chat: ct_hat, c: cNew, o: ot, h: hNew }
        );
        h = hNew;
        c = cNew;
      }
      return out;
    }

    // ---------- render ----------
    function renderStep(i, step) {
      if (!step) return;
      el.stepTitle.textContent = step.title;
      el.stepDesc.textContent = step.desc;
      el.formula.innerHTML = step.latex.map((p) => fbox(p[0], p[1])).join("");
      if (model.type === "rnn") renderVizRNN(step);
      else renderVizLSTM(step);
    }

    function renderVizRNN(step) {
      el.vizTitle.textContent = "RNN unfolded — hidden state per timestep";
      const m = model;
      const cells = m.inputs
        .map((x, t) => {
          const active = t === step.t;
          const done = step.snap.hAll[t];
          const hstr = done ? M.fmtVec(done) : "—";
          return (
            '<div class="tcell' +
            (active ? " active" : "") +
            '"><div class="t-label">t' +
            (t + 1) +
            " · x=" +
            (m.labels[t] || M.fmtVec(x)) +
            '</div><div class="t-val">h=' +
            hstr +
            "</div></div>"
          );
        })
        .join('<div style="align-self:center">→</div>');
      el.viz.innerHTML = '<div class="cell-track">' + cells + "</div>";
    }

    function renderVizLSTM(step) {
      el.vizTitle.textContent =
        "LSTM cell — t" + (step.t + 1) + " (gerbang menyala saat dihitung)";
      const g = step.snap.gates || {};
      const order = ["f", "i", "chat", "c", "o", "h"];
      const meta = {
        f: ["Forget f", "σ"],
        i: ["Input i", "σ"],
        chat: ["Kandidat Ĉ", "tanh"],
        c: ["Cell state C", "⊙ ⊕"],
        o: ["Output o", "σ"],
        h: ["Hidden h", "o⊙tanh(C)"],
      };
      const html = order
        .map((k) => {
          const on = g[k] !== undefined;
          const current = step.kind === k;
          return (
            '<div class="gate' +
            (on ? " on" : "") +
            (current ? " current" : "") +
            '"><div class="g-name">' +
            meta[k][0] +
            '</div><div class="g-sub">' +
            meta[k][1] +
            '</div><div class="g-val">' +
            (on ? M.fmtVec(g[k]) : "—") +
            "</div></div>"
          );
        })
        .join("");
      el.viz.innerHTML =
        '<div class="gate-grid">' + html + "</div>" +
        '<div class="note">Cell state mengalir seperti "conveyor belt": C diperbarui lewat penjumlahan (⊕), itulah yang membuat LSTM lebih tahan terhadap vanishing gradient dibanding Simple RNN.</div>';
    }

    // ---------- param count ----------
    function renderParamCount() {
      const i = Math.max(1, parseInt(el.pcIn.value, 10) || 1);
      const hid = Math.max(1, parseInt(el.pcHid.value, 10) || 1);
      const o = Math.max(1, parseInt(el.pcOut.value, 10) || 1);
      const rnn = (i + hid + 1) * hid + (hid + 1) * o;
      const lstm = (i + hid + 1) * 4 * hid + (hid + 1) * o;
      const current = state.mode === "rnn" ? rnn : lstm;
      const latex =
        state.mode === "rnn"
          ? "P = (" +
            i +
            "+" +
            hid +
            "+1)\\times" +
            hid +
            " + (" +
            hid +
            "+1)\\times" +
            o +
            " = " +
            rnn
          : "P = (" +
            i +
            "+" +
            hid +
            "+1)\\times 4\\times" +
            hid +
            " + (" +
            hid +
            "+1)\\times" +
            o +
            " = " +
            lstm;
      el.pcResult.innerHTML =
        fbox(state.mode === "rnn" ? "Simple RNN" : "LSTM", latex) +
        '<div class="note">Perbandingan untuk konfigurasi ini — Simple RNN: <b>' +
        rnn +
        "</b> · LSTM: <b>" +
        lstm +
        "</b> parameter. (Catatan: 1→10→1 menghasilkan 131 vs 491.)</div>";
    }

    // ---------- stepper ----------
    const stepper = MLSim.makeStepper({
      controlsEl: root.querySelector("#rnn-stepper"),
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
    el.mode.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      state.mode = b.getAttribute("data-v");
      Array.prototype.forEach.call(el.mode.children, (c) =>
        c.classList.toggle("active", c === b)
      );
      fillPresetOptions();
      renderParamCount();
      rebuild();
    });
    el.preset.addEventListener("change", () => {
      state.preset = el.preset.value;
      el.seedField.style.display = state.preset === "acak" ? "" : "block";
      rebuild();
    });
    el.hidden.addEventListener("input", () => {
      state.hidden = parseInt(el.hidden.value, 10);
      el.hidOut.textContent = state.hidden;
      rebuild();
    });
    el.seed.addEventListener("input", () => {
      state.seed = parseInt(el.seed.value, 10) || 1;
      rebuild();
    });
    [el.pcIn, el.pcHid, el.pcOut].forEach((inp) =>
      inp.addEventListener("input", renderParamCount)
    );

    // init
    fillPresetOptions();
    renderParamCount();
    rebuild();

    return {
      refreshFormula: () => stepper.fire(),
    };
  }

  MLSim.RNN = { init };
})();
