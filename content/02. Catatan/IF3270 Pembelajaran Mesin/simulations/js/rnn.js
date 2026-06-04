/* rnn.js — simulator forward-propagation RNN dengan graf unfolded.
 * Arsitektur: one-to-one / one-to-many / many-to-one / many-to-many.
 * 1 atau 2 hidden layer. Preset: catatan (ABCC), timeseries, acak. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});
  const M = MLSim.mat;
  const D = MLSim.draw;

  // vektor -> latex teks "[a,\,b,\,c]"
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

  function init(root) {
    let state = {
      arch: "many-to-many",
      layers: 1,
      preset: "catatan",
      hidden: 3,
      seed: 42,
    };
    let model = null;
    let steps = [];

    root.innerHTML =
      '<div class="sim-layout">' +
      '  <div class="col-controls">' +
      '    <div class="panel">' +
      "      <h3>Arsitektur</h3>" +
      '      <div class="field"><div class="seg" id="rnn-arch">' +
      '        <button data-v="one-to-one">one-to-one</button>' +
      '        <button data-v="one-to-many">one-to-many</button>' +
      '        <button data-v="many-to-one">many-to-one</button>' +
      '        <button data-v="many-to-many" class="active">many-to-many</button>' +
      "      </div></div>" +
      '      <div class="field"><label>Hidden layer</label>' +
      '        <div class="seg" id="rnn-layers"><button data-v="1" class="active">1</button><button data-v="2">2</button></div></div>' +
      '      <div class="field"><label>Preset / Input</label>' +
      '        <select id="rnn-preset">' +
      '          <option value="catatan">catatan (ABCC one-hot)</option>' +
      '          <option value="timeseries">timeseries</option>' +
      '          <option value="acak">acak</option>' +
      "        </select></div>" +
      '      <div class="field"><label>Hidden unit: <span id="rnn-hu-out">3</span></label>' +
      '        <div class="range-row"><input type="range" id="rnn-hu" min="1" max="5" step="1" value="3"/></div></div>' +
      '      <div class="field" id="rnn-seed-field" style="display:none"><label>Seed</label>' +
      '        <input type="number" id="rnn-seed" value="42" min="1" max="9999"/></div>' +
      '      <div class="note" id="rnn-desc"></div>' +
      "    </div>" +
      '    <div class="panel">' +
      "      <h3>Hitung Jumlah Parameter</h3>" +
      '      <div class="field"><label>Dim input</label><input type="number" id="rnn-p-in" value="1" min="1" max="999"/></div>' +
      '      <div class="field"><label>Hidden unit</label><input type="number" id="rnn-p-hid" value="10" min="1" max="999"/></div>' +
      '      <div class="field"><label>Dim output</label><input type="number" id="rnn-p-out" value="1" min="1" max="999"/></div>' +
      '      <div class="field"><label>Hidden layer</label>' +
      '        <div class="seg" id="rnn-p-layers"><button data-v="1" class="active">1</button><button data-v="2">2</button></div></div>' +
      '      <div id="rnn-param-formula"></div>' +
      '      <div class="note">RNN: P = (in+hid+1)·hid + (hid+1)·out. Contoh 1→10→1 = 131.</div>' +
      "    </div>" +
      "  </div>" +
      '  <div class="col-main">' +
      '    <div class="stepper" id="rnn-stepper"></div>' +
      '    <div class="panel formula-panel">' +
      '      <div class="step-title" id="rnn-step-title">—</div>' +
      '      <div class="step-desc" id="rnn-step-desc"></div>' +
      '      <div id="rnn-formula"></div>' +
      "    </div>" +
      '    <div class="panel"><h3 id="rnn-viz-title">Visualisasi</h3><div id="rnn-viz"></div></div>' +
      "  </div>" +
      "</div>";

    const el = {
      arch: root.querySelector("#rnn-arch"),
      layers: root.querySelector("#rnn-layers"),
      preset: root.querySelector("#rnn-preset"),
      hu: root.querySelector("#rnn-hu"),
      huOut: root.querySelector("#rnn-hu-out"),
      seedField: root.querySelector("#rnn-seed-field"),
      seed: root.querySelector("#rnn-seed"),
      desc: root.querySelector("#rnn-desc"),
      stepTitle: root.querySelector("#rnn-step-title"),
      stepDesc: root.querySelector("#rnn-step-desc"),
      formula: root.querySelector("#rnn-formula"),
      vizTitle: root.querySelector("#rnn-viz-title"),
      viz: root.querySelector("#rnn-viz"),
      pIn: root.querySelector("#rnn-p-in"),
      pHid: root.querySelector("#rnn-p-hid"),
      pOut: root.querySelector("#rnn-p-out"),
      pLayers: root.querySelector("#rnn-p-layers"),
      paramFormula: root.querySelector("#rnn-param-formula"),
    };

    const DESC = {
      "one-to-one":
        "one-to-one: satu input → satu output (mis. klasifikasi citra). Hanya 1 timestep.",
      "one-to-many":
        "one-to-many: satu input → barisan output (mis. image captioning). Input hanya di t1, timestep berikut memakai vektor kosong ∅.",
      "many-to-one":
        "many-to-one: barisan input → satu output (mis. klasifikasi sentimen). Output hanya di timestep terakhir.",
      "many-to-many":
        "many-to-many: barisan input → barisan output (mis. prediksi simbol berikut / tagging). Input & output di tiap timestep.",
    };

    // ---- bangun model + forward pass ----
    function buildModel() {
      const arch = state.arch;
      const nLayers = state.layers;
      const T = arch === "one-to-one" ? 1 : 4;
      const seed = state.seed;

      let inputs, hiddenAct, outAct, outDim, seqLabels, targets, targetLabels;
      let inDim;
      const hid = state.hidden;

      if (state.preset === "catatan") {
        const p = MLSim.presets.rnn;
        inDim = 4;
        seqLabels = p.sequenceLabels.slice();
        targets = p.targets.map((r) => r.slice());
        targetLabels = p.targetLabels.slice();
        hiddenAct = p.hiddenAct;
        outAct = p.outAct;
        outDim = 4;
        inputs = p.inputs.map((r) => r.slice());
      } else if (state.preset === "timeseries") {
        inDim = 1;
        inputs = [[1.12], [1.18], [1.32], [1.29]];
        seqLabels = ["112", "118", "132", "129"];
        hiddenAct = "tanh";
        outAct = "linear";
        outDim = 1;
        targets = null;
        targetLabels = null;
      } else {
        inDim = 2;
        inputs = M.randMat(4, inDim, seed + 100, 1.0);
        seqLabels = inputs.map((_, i) => "x" + (i + 1));
        hiddenAct = "tanh";
        outAct = "linear";
        outDim = 1;
        targets = null;
        targetLabels = null;
      }

      // susun deret input per timestep sesuai arsitektur
      const zeroVec = M.zeros(inDim);
      const xs = [];
      for (let t = 0; t < T; t++) {
        if (arch === "one-to-many") {
          xs.push(t === 0 ? (inputs[0] || zeroVec).slice() : zeroVec.slice());
        } else if (arch === "one-to-one") {
          xs.push((inputs[0] || zeroVec).slice());
        } else {
          xs.push((inputs[t] || zeroVec).slice());
        }
      }

      function hasOutput(t) {
        if (arch === "one-to-one") return t === 0;
        if (arch === "one-to-many") return true;
        if (arch === "many-to-one") return t === T - 1;
        return true; // many-to-many
      }

      // ---- bobot ----
      const p = MLSim.presets.rnn;
      const useCatatanWeights =
        state.preset === "catatan" && hid === 3 && nLayers === 1;
      let Wxh, Whh, bh, Why, by;
      let Wxh2, Whh2, b2;

      if (useCatatanWeights) {
        Wxh = M.cloneMat(p.Wxh);
        Whh = M.cloneMat(p.Whh);
        bh = p.bh.slice();
        Why = M.cloneMat(p.Why);
        by = p.by.slice();
      } else {
        Wxh = M.randMat(hid, inDim, seed + 1, 0.4);
        Whh = M.randMat(hid, hid, seed + 2, 0.4);
        bh = M.randVec(hid, seed + 3, 0.2);
        Why = M.randMat(outDim, hid, seed + 4, 0.4);
        by = M.randVec(outDim, seed + 5, 0.2);
      }

      if (nLayers === 2) {
        Wxh2 = M.randMat(hid, hid, seed + 11, 0.4); // h1 -> h2
        Whh2 = M.randMat(hid, hid, seed + 12, 0.4); // recurrent layer-2
        b2 = M.randVec(hid, seed + 13, 0.2);
        Why = M.randMat(outDim, hid, seed + 14, 0.4);
        by = M.randVec(outDim, seed + 15, 0.2);
      }

      // ---- forward pass ----
      const H = [];
      const NET = [];
      for (let L = 0; L < nLayers; L++) {
        H.push([]);
        NET.push([]);
      }
      const Y = [];
      const NETY = [];
      const h0 = M.zeros(hid);

      for (let t = 0; t < T; t++) {
        for (let L = 0; L < nLayers; L++) {
          const hPrev = t === 0 ? h0 : H[L][t - 1];
          let net;
          if (L === 0) {
            net = M.vecAdd(M.matVec(Wxh, xs[t]), M.matVec(Whh, hPrev), bh);
          } else {
            const below = H[L - 1][t];
            net = M.vecAdd(M.matVec(Wxh2, below), M.matVec(Whh2, hPrev), b2);
          }
          const h = M.applyActivation(hiddenAct, net);
          NET[L].push(net);
          H[L].push(h);
        }
        if (hasOutput(t)) {
          const top = H[nLayers - 1][t];
          const nety = M.vecAdd(M.matVec(Why, top), by);
          Y[t] = M.applyActivation(outAct, nety);
          NETY[t] = nety;
        } else {
          Y[t] = null;
          NETY[t] = null;
        }
      }

      return {
        arch,
        nLayers,
        T,
        inDim,
        hid,
        outDim,
        xs,
        seqLabels,
        targets,
        targetLabels,
        hiddenAct,
        outAct,
        Wxh,
        Whh,
        bh,
        Wxh2,
        Whh2,
        b2,
        Why,
        by,
        H,
        NET,
        Y,
        NETY,
        h0,
        hasOutput,
      };
    }

    function argmaxLabel(y) {
      const idx = M.argmax(y);
      const labs = ["A", "B", "C", "D"];
      return labs[idx] || "k" + idx;
    }

    // ---- bangun langkah ----
    function buildSteps() {
      const m = model;
      const out = [];
      for (let t = 0; t < m.T; t++) {
        for (let L = 0; L < m.nLayers; L++) {
          const layerTag = m.nLayers === 1 ? "" : " (layer " + (L + 1) + ")";
          const hPrev = t === 0 ? m.h0 : m.H[L][t - 1];
          const net = m.NET[L][t];
          const h = m.H[L][t];
          const prevIdx = t === 0 ? "0" : String(t);

          let netLatex;
          if (L === 0) {
            const a = M.matVec(m.Wxh, m.xs[t]);
            const b = M.matVec(m.Whh, hPrev);
            netLatex =
              "net_h = W_{xh}\\cdot x_{" +
              (t + 1) +
              "} + W_{hh}\\cdot h_{" +
              prevIdx +
              "} + b_h = " +
              vl(a) +
              " + " +
              vl(b) +
              " + " +
              vl(m.bh) +
              " = " +
              vl(net);
          } else {
            const below = m.H[L - 1][t];
            const a = M.matVec(m.Wxh2, below);
            const b = M.matVec(m.Whh2, hPrev);
            netLatex =
              "net_h^{(2)} = W_{xh2}\\cdot h^{(1)}_{" +
              (t + 1) +
              "} + W_{hh2}\\cdot h^{(2)}_{" +
              prevIdx +
              "} + b_2 = " +
              vl(a) +
              " + " +
              vl(b) +
              " + " +
              vl(m.b2) +
              " = " +
              vl(net);
          }

          out.push({
            kind: "net",
            t: t,
            layer: L,
            title: "Timestep " + (t + 1) + layerTag + ": pra-aktivasi net_h",
            desc:
              "Hitung kombinasi linear input saat ini, state tersembunyi sebelumnya, dan bias.",
            latex: [["net_h" + (m.nLayers === 1 ? "" : "^{(" + (L + 1) + ")}"), netLatex]],
            reveal: { active: { row: "hidden", t: t, layer: L } },
          });

          out.push({
            kind: "h",
            t: t,
            layer: L,
            title: "Timestep " + (t + 1) + layerTag + ": state tersembunyi h",
            desc: "Terapkan aktivasi " + m.hiddenAct + " elemen-per-elemen pada net_h.",
            latex: [
              [
                "h" + (m.nLayers === 1 ? "" : "^{(" + (L + 1) + ")}"),
                "h_{" +
                  (t + 1) +
                  "} = \\tanh(net_h) = \\tanh(" +
                  vl(net) +
                  ") = " +
                  vl(h),
              ],
            ],
            reveal: {
              hiddenDone: true,
              active: { row: "hidden", t: t, layer: L },
            },
          });
        }

        if (m.hasOutput(t)) {
          const top = m.H[m.nLayers - 1][t];
          const a = M.matVec(m.Why, top);
          const nety = m.NETY[t];
          const y = m.Y[t];
          const actName = m.outAct === "softmax" ? "\\softmax" : m.outAct;
          const lx = [
            [
              "net_y",
              "net_y = W_{hy}\\cdot h_{" +
                (t + 1) +
                "} + b_y = " +
                vl(a) +
                " + " +
                vl(m.by) +
                " = " +
                vl(nety),
            ],
            [
              "y_{" + (t + 1) + "}",
              "y_{" + (t + 1) + "} = " + actName + "(net_y) = " + vl(y),
            ],
          ];
          if (m.targets && m.targetLabels) {
            lx.push([
              "Prediksi",
              "\\hat{y}_{" +
                (t + 1) +
                "} = " +
                argmaxLabel(y) +
                " ,\\; target = " +
                m.targetLabels[t],
            ]);
          }
          out.push({
            kind: "y",
            t: t,
            layer: m.nLayers - 1,
            title: "Timestep " + (t + 1) + ": output y",
            desc:
              m.outAct === "softmax"
                ? "Proyeksikan h ke ruang output lalu softmax → distribusi probabilitas."
                : "Proyeksikan state tersembunyi ke output (aktivasi " + m.outAct + ").",
            latex: lx,
            reveal: {
              hiddenDone: true,
              outputDone: true,
              active: { row: "output", t: t, layer: m.nLayers - 1 },
            },
          });
        }
      }
      return out;
    }

    // ---- gambar graf unfolded ----
    function drawGraph(uptoIndex) {
      const m = model;
      const T = m.T;
      const nLayers = m.nLayers;

      const step = steps[uptoIndex] || null;
      const hiddenDone = [];
      const outDone = [];
      for (let t = 0; t < T; t++) {
        hiddenDone.push(new Array(nLayers).fill(false));
        outDone.push(false);
      }
      for (let i = 0; i <= uptoIndex && i < steps.length; i++) {
        const s = steps[i];
        if (s.kind === "h") hiddenDone[s.t][s.layer] = true;
        if (s.kind === "y") outDone[s.t] = true;
      }
      const active = step ? step.reveal.active : null;

      const colW = 150;
      const leftPad = 95;
      const xCol = (t) => leftPad + t * colW;
      const hasTargets = !!(m.targets && m.targetLabels);

      const rowOutput = 60;
      const layerGap = 95;
      const rowHiddenTop = rowOutput + 95;
      const rowHidden = (L) => rowHiddenTop + (nLayers - 1 - L) * layerGap;
      const rowInput = rowHidden(0) + 115;

      const width = leftPad + (T - 1) * colW + (hasTargets ? 170 : 110);
      const height = rowInput + 70;

      let svg = "";

      // panah Whh horizontal + h0
      for (let L = 0; L < nLayers; L++) {
        const y = rowHidden(L);
        const firstDone = hiddenDone[0][L];
        svg += D.line(xCol(0) - 60, y, xCol(0) - 26, y, {
          color: firstDone ? "#3b82f6" : "#94a3b8",
          opacity: firstDone ? 1 : 0.45,
          dash: firstDone ? null : "4 4",
        });
        svg += D.text(xCol(0) - 72, y, "h0", { size: 11, anchor: "end" });
        for (let t = 1; t < T; t++) {
          const done = hiddenDone[t][L] && hiddenDone[t - 1][L];
          svg += D.line(xCol(t - 1) + 26, y, xCol(t) - 26, y, {
            color: done ? "#3b82f6" : "#94a3b8",
            opacity: done ? 1 : 0.4,
            dash: done ? null : "4 4",
          });
        }
      }

      // panah antar-layer vertikal (layer L-1 -> L)
      for (let t = 0; t < T; t++) {
        for (let L = 1; L < nLayers; L++) {
          const x = xCol(t);
          const done = hiddenDone[t][L];
          svg += D.line(x, rowHidden(L - 1) - 26, x, rowHidden(L) + 26, {
            color: done ? "#3b82f6" : "#94a3b8",
            opacity: done ? 1 : 0.4,
            dash: done ? null : "4 4",
          });
        }
      }

      // input bracket + panah Wxh UP
      for (let t = 0; t < T; t++) {
        const x = xCol(t);
        const xv = m.xs[t];
        const isEmpty = xv.every((v) => v === 0);
        svg += D.vec(x, rowInput, xv, { size: 10, bracket: true, bracketW: 22 });
        svg += D.text(
          x,
          rowInput + 42,
          isEmpty
            ? "∅ (x" + (t + 1) + ")"
            : "x" + (t + 1) + (m.seqLabels[t] ? " (" + m.seqLabels[t] + ")" : ""),
          { size: 10 }
        );
        const done = hiddenDone[t][0];
        svg += D.line(x, rowInput - 30, x, rowHidden(0) + 26, {
          color: done ? "#3b82f6" : "#94a3b8",
          opacity: done ? 1 : 0.45,
          dash: done ? null : "4 4",
        });
      }

      // hidden circles
      for (let t = 0; t < T; t++) {
        for (let L = 0; L < nLayers; L++) {
          const x = xCol(t);
          const y = rowHidden(L);
          const done = hiddenDone[t][L];
          const isActive =
            active && active.row === "hidden" && active.t === t && active.layer === L;
          svg += D.circle(x, y, 24, {
            fill: done ? "#e8a23a" : "transparent",
            stroke: isActive ? "#22d3ee" : "#e8a23a",
            strokeW: isActive ? 3 : 1.5,
            opacity: done ? 1 : 0.5,
            dash: done ? null : "4 4",
          });
          if (done) {
            svg += D.vec(x, y, m.H[L][t], { size: 9, fill: "#1f2937" });
          } else {
            svg += D.text(
              x,
              y,
              "h" + (t + 1) + (nLayers > 1 ? "·" + (L + 1) : ""),
              { size: 10, opacity: 0.7 }
            );
          }
        }
      }

      // output ovals + panah Why UP + target one-hot
      for (let t = 0; t < T; t++) {
        if (!m.hasOutput(t)) continue;
        const x = xCol(t);
        const yTop = rowHidden(nLayers - 1);
        const done = outDone[t];
        svg += D.line(x, yTop - 26, x, rowOutput + 22, {
          color: done ? "#3b82f6" : "#94a3b8",
          opacity: done ? 1 : 0.45,
          dash: done ? null : "4 4",
        });
        const isActive = active && active.row === "output" && active.t === t;
        svg += D.ellipse(x, rowOutput, 30, 20, {
          fill: done ? "#9c4f2e" : "transparent",
          stroke: isActive ? "#22d3ee" : "#9c4f2e",
          strokeW: isActive ? 3 : 1.5,
          opacity: done ? 1 : 0.5,
          dash: done ? null : "4 4",
        });
        if (done) {
          svg += D.vec(x, rowOutput, m.Y[t], { size: 8, fill: "#ffffff" });
        } else {
          svg += D.text(x, rowOutput, "y" + (t + 1), { size: 10, opacity: 0.7 });
        }

        if (m.targets && m.targetLabels) {
          const tg = m.targets[t];
          const tgIdx = M.argmax(tg);
          const predIdx = done ? M.argmax(m.Y[t]) : -1;
          const colors = {};
          const bold = {};
          if (predIdx >= 0) colors[predIdx] = "#6ca8ff";
          colors[tgIdx] = "#ffd24a";
          bold[tgIdx] = true;
          svg += D.vec(x + 55, rowOutput, tg, {
            size: 8,
            bracket: true,
            bracketW: 14,
            colors: colors,
            bold: bold,
          });
          svg += D.text(x + 55, rowOutput + 26, "t=" + m.targetLabels[t], {
            size: 9,
            opacity: 0.8,
          });
        }
      }

      // label bobot Wxh / Whh / Why / Wxh2 dekat kolom pertama
      svg += D.text(xCol(0) + 30, (rowInput + rowHidden(0)) / 2, "Wxh", {
        size: 11,
        anchor: "start",
        fill: "#3b82f6",
        weight: 600,
      });
      if (T > 1) {
        svg += D.text((xCol(0) + xCol(1)) / 2, rowHidden(0) - 10, "Whh", {
          size: 11,
          fill: "#3b82f6",
          weight: 600,
        });
      }
      if (m.hasOutput(0)) {
        svg += D.text(
          xCol(0) + 32,
          (rowOutput + rowHidden(nLayers - 1)) / 2,
          "Why",
          { size: 11, anchor: "start", fill: "#3b82f6", weight: 600 }
        );
      }
      if (nLayers > 1) {
        svg += D.text(xCol(0) + 32, (rowHidden(0) + rowHidden(1)) / 2, "Wxh2", {
          size: 10,
          anchor: "start",
          fill: "#3b82f6",
          weight: 600,
        });
      }

      return D.svg(width, height, svg);
    }

    // ---- panel hitung parameter ----
    function renderParamPanel() {
      const inN = parseInt(el.pIn.value, 10) || 0;
      const hid = parseInt(el.pHid.value, 10) || 0;
      const outN = parseInt(el.pOut.value, 10) || 0;
      const L =
        el.pLayers.querySelector(".active").getAttribute("data-v") === "2"
          ? 2
          : 1;

      const term1 = (inN + hid + 1) * hid;
      const extra = L === 2 ? (hid + hid + 1) * hid : 0;
      const term2 = (hid + 1) * outN;
      const total = term1 + extra + term2;

      let latex;
      if (L === 1) {
        latex =
          "P = (in+hid+1)\\cdot hid + (hid+1)\\cdot out = (" +
          inN +
          "+" +
          hid +
          "+1)\\cdot " +
          hid +
          " + (" +
          hid +
          "+1)\\cdot " +
          outN +
          " = " +
          term1 +
          " + " +
          term2 +
          " = " +
          total;
      } else {
        latex =
          "P = (in+hid+1)\\cdot hid + (hid+hid+1)\\cdot hid + (hid+1)\\cdot out = " +
          term1 +
          " + " +
          extra +
          " + " +
          term2 +
          " = " +
          total;
      }
      el.paramFormula.innerHTML = fbox("Jumlah parameter", latex);
    }

    // ---- render step ----
    function renderStep(i, step) {
      if (!step) {
        el.viz.innerHTML = "";
        return;
      }
      el.stepTitle.textContent = step.title;
      el.stepDesc.textContent = step.desc;
      el.formula.innerHTML = step.latex.map((p) => fbox(p[0], p[1])).join("");
      el.vizTitle.textContent = "Visualisasi — " + step.title;
      el.viz.innerHTML = drawGraph(i);
    }

    const stepper = MLSim.makeStepper({
      controlsEl: root.querySelector("#rnn-stepper"),
      getSteps: () => steps,
      onStep: renderStep,
      onReset: function () {
        model = buildModel();
        steps = buildSteps();
      },
      speedMs: 1100,
    });

    function rebuild() {
      el.desc.textContent = DESC[state.arch];
      el.seedField.style.display = state.preset === "acak" ? "block" : "none";
      model = buildModel();
      steps = buildSteps();
      stepper.goto(0);
    }

    // ---- event handlers ----
    function segHandler(container, key, isInt) {
      container.addEventListener("click", function (e) {
        const b = e.target.closest("button");
        if (!b) return;
        const v = b.getAttribute("data-v");
        state[key] = isInt ? parseInt(v, 10) : v;
        Array.prototype.forEach.call(container.children, function (c) {
          c.classList.toggle("active", c === b);
        });
        rebuild();
      });
    }
    segHandler(el.arch, "arch", false);
    segHandler(el.layers, "layers", true);

    el.preset.addEventListener("change", function () {
      state.preset = el.preset.value;
      if (state.preset === "catatan") {
        state.hidden = 3;
        el.hu.value = 3;
        el.huOut.textContent = "3";
      }
      rebuild();
    });
    el.hu.addEventListener("input", function () {
      state.hidden = parseInt(el.hu.value, 10);
      el.huOut.textContent = String(state.hidden);
      rebuild();
    });
    el.seed.addEventListener("input", function () {
      state.seed = parseInt(el.seed.value, 10) || 1;
      rebuild();
    });

    // panel parameter
    el.pIn.addEventListener("input", renderParamPanel);
    el.pHid.addEventListener("input", renderParamPanel);
    el.pOut.addEventListener("input", renderParamPanel);
    el.pLayers.addEventListener("click", function (e) {
      const b = e.target.closest("button");
      if (!b) return;
      Array.prototype.forEach.call(el.pLayers.children, function (c) {
        c.classList.toggle("active", c === b);
      });
      renderParamPanel();
    });

    renderParamPanel();
    rebuild();
    return { refreshFormula: () => stepper.fire() };
  }

  MLSim.RNN = { init };
})();
