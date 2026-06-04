/* transformer.js — simulator Transformer: Scaled Dot-Product, Multi-Head, Arsitektur. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});
  const M = MLSim.mat;
  const D = MLSim.draw;

  // ---- helper rumus & tabel ----
  function fbox(l, x) {
    return (
      '<div class="formula-box"><div class="formula-label">' +
      l +
      '</div><div class="math">' +
      MLSim.math.toString(x) +
      "</div></div>"
    );
  }
  function matTable(mat, rowLabels, colLabels) {
    let h = '<table class="vtable"><tr><th></th>';
    h += colLabels.map((c) => "<th>" + c + "</th>").join("");
    h += "</tr>";
    mat.forEach((row, i) => {
      h += "<tr><th>" + rowLabels[i] + "</th>";
      h += row
        .map((x) => "<td>" + (x <= -1e8 ? "-∞" : M.fmt(x)) + "</td>")
        .join("");
      h += "</tr>";
    });
    return h + "</table>";
  }
  // heatmap attention 0..1 dengan D.attn
  function heatTable(mat, rowLabels, colLabels) {
    let h = '<table class="heat"><tr><th></th>';
    h += colLabels.map((c) => "<th>" + c + "</th>").join("");
    h += "</tr>";
    mat.forEach((row, i) => {
      h += "<tr><th>" + rowLabels[i] + "</th>";
      h += row
        .map((x) => '<td style="background:' + D.attn(x) + '">' + M.fmt(x, 2) + "</td>")
        .join("");
      h += "</tr>";
    });
    return h + "</table>";
  }
  function tokLabels(n, p) {
    return Array.from({ length: n }, (_, i) => (p || "x") + (i + 1));
  }

  // ---- diagram SVG Scaled Dot-Product Attention (vertikal) ----
  // blocks: array {key, label, fill, fg}; active = key yang disorot
  function blockColumn(blocks, active, w, opt) {
    opt = opt || {};
    const bw = w || 200;
    const bx = (opt.totW || bw + 80) / 2 - bw / 2;
    const bh = 40;
    const gap = 30;
    const top = 20;
    let inner = "";
    const ys = [];
    blocks.forEach((b, i) => {
      const y = top + i * (bh + gap);
      ys.push(y);
    });
    // panah dari bawah ke atas (alur naik) — gambar dulu agar di belakang box
    for (let i = 0; i < blocks.length - 1; i++) {
      const y1 = ys[i] + bh; // bawah box i (lebih atas dalam alur output)
      const y2 = ys[i + 1]; // atas box i+1
      // alur sebenarnya naik: i+1 -> i, jadi panah dari box bawah ke box atas
      inner += D.line(bx + bw / 2, ys[i + 1], bx + bw / 2, ys[i] + bh, {
        color: "#3b82f6",
        width: 2,
      });
    }
    blocks.forEach((b, i) => {
      const y = ys[i];
      const isAct = b.key === active;
      inner += D.rect(bx, y, bw, bh, {
        rx: 8,
        fill: b.fill || "#e8a23a",
        stroke: isAct ? "#22d3ee" : "#1e293b",
        strokeW: isAct ? 3.5 : 1.5,
      });
      inner += D.text(bx + bw / 2, y + bh / 2, b.label, {
        size: 13,
        fill: b.fg || "#1e293b",
        weight: "600",
      });
    });
    const h = top + blocks.length * (bh + gap);
    return { inner, h, bx, bw, bh, ys, top };
  }

  function init(root) {
    let state = { view: "sdpa", n: 3, heads: 2, seed: 11, mask: false };
    let steps = [];
    let archKey = null; // komponen arsitektur yang disorot

    root.innerHTML =
      '<div class="sim-layout">' +
      '  <div class="col-controls">' +
      '    <div class="panel">' +
      "      <h3>Tampilan</h3>" +
      '      <div class="field"><div class="seg" id="tf-view">' +
      '        <button data-v="sdpa" class="active">Scaled Dot-Product</button>' +
      '        <button data-v="multi">Multi-Head</button>' +
      '        <button data-v="arch">Arsitektur</button>' +
      "      </div></div>" +
      '      <div class="field"><label>Jumlah token: <span id="tf-n-out">3</span></label>' +
      '        <div class="range-row"><input type="range" id="tf-n" min="2" max="4" step="1" value="3"/></div></div>' +
      '      <div class="field" id="tf-heads-field" style="display:none"><label>Jumlah head: <span id="tf-heads-out">2</span></label>' +
      '        <div class="range-row"><input type="range" id="tf-heads" min="1" max="3" step="1" value="2"/></div></div>' +
      '      <div class="field" id="tf-mask-field"><label>Causal mask</label>' +
      '        <div class="seg" id="tf-mask"><button data-v="0" class="active">tanpa</button><button data-v="1">dengan</button></div></div>' +
      '      <div class="field"><label>Seed nilai</label><input type="number" id="tf-seed" value="11" min="1" max="9999"/></div>' +
      '      <div class="note" id="tf-desc"></div>' +
      "    </div>" +
      "  </div>" +
      '  <div class="col-main">' +
      '    <div class="stepper" id="tf-stepper"></div>' +
      '    <div class="panel formula-panel">' +
      '      <div class="step-title" id="tf-step-title">—</div>' +
      '      <div class="step-desc" id="tf-step-desc"></div>' +
      '      <div id="tf-formula"></div>' +
      "    </div>" +
      '    <div class="panel"><h3 id="tf-viz-title">Visualisasi</h3><div id="tf-viz"></div></div>' +
      '    <div class="comp-info" id="tf-comp">Klik komponen pada diagram untuk penjelasan.</div>' +
      "  </div>" +
      "</div>";

    const el = {
      view: root.querySelector("#tf-view"),
      n: root.querySelector("#tf-n"),
      nOut: root.querySelector("#tf-n-out"),
      headsField: root.querySelector("#tf-heads-field"),
      heads: root.querySelector("#tf-heads"),
      headsOut: root.querySelector("#tf-heads-out"),
      maskField: root.querySelector("#tf-mask-field"),
      mask: root.querySelector("#tf-mask"),
      seed: root.querySelector("#tf-seed"),
      desc: root.querySelector("#tf-desc"),
      stepper: root.querySelector("#tf-stepper"),
      stepTitle: root.querySelector("#tf-step-title"),
      stepDesc: root.querySelector("#tf-step-desc"),
      formula: root.querySelector("#tf-formula"),
      vizTitle: root.querySelector("#tf-viz-title"),
      viz: root.querySelector("#tf-viz"),
      comp: root.querySelector("#tf-comp"),
    };

    const DESC = {
      sdpa:
        "Scaled Dot-Product Attention: dari input X dibentuk Q, K, V. Skor S = QKᵀ di-scale 1/√dₖ, (opsional di-mask), softmax baris → matriks attention A, output = A·V.",
      multi:
        "Multi-Head Attention: input diproyeksikan h kali (tiap head punya Wᵠ, Wᴷ, Wⱽ sendiri). Tiap head menjalankan attention paralel, hasilnya di-Concat lalu dilewatkan Linear Wᴼ.",
      arch:
        "Arsitektur Transformer penuh (encoder–decoder). Klik tiap blok pada diagram untuk membaca penjelasan singkatnya.",
    };

    const dk = 4;
    const D_MODEL = 4;
    const SQ = Math.sqrt(dk);

    // hitung satu kepala attention dari X + bobot
    function oneHead(X, seedBase, mask) {
      const Wq = M.randMat(D_MODEL, dk, seedBase + 1, 0.5);
      const Wk = M.randMat(D_MODEL, dk, seedBase + 2, 0.5);
      const Wv = M.randMat(D_MODEL, dk, seedBase + 3, 0.5);
      const Q = M.matMul(X, Wq);
      const K = M.matMul(X, Wk);
      const V = M.matMul(X, Wv);
      let S = M.matMul(Q, M.transpose(K)); // n×n
      // mask causal: j>i -> -inf (sebelum scale & softmax)
      const Smask = S.map((row, i) =>
        row.map((x, j) => (mask && j > i ? -1e9 : x))
      );
      const Sscaled = Smask.map((row) => row.map((x) => (x <= -1e8 ? x : x / SQ)));
      const A = Sscaled.map((row) => M.softmax(row));
      const O = M.matMul(A, V);
      return { Wq, Wk, Wv, Q, K, V, S, Smask, Sscaled, A, O };
    }

    // ===================== VIEW 1: SCALED DOT-PRODUCT =====================
    function sdpaDiagram(active) {
      const blocks = [
        { key: "outmm", label: "MatMul (·, V)" },
        { key: "softmax", label: "SoftMax" },
      ];
      if (state.mask) blocks.push({ key: "mask", label: "Mask (opsional)" });
      blocks.push({ key: "scale", label: "Scale  1/√dₖ" });
      blocks.push({ key: "inmm", label: "MatMul (Q, Kᵀ)" });
      const totW = 280;
      const col = blockColumn(blocks, active, 200, { totW });
      let inner = col.inner;
      // label Q,K,V di bawah box MatMul pertama
      const last = col.ys[col.ys.length - 1];
      inner += D.text(col.bx + 40, last + col.bh + 22, "Q", { size: 13, weight: "700", fill: "#3b82f6" });
      inner += D.text(col.bx + 100, last + col.bh + 22, "K", { size: 13, weight: "700", fill: "#3b82f6" });
      inner += D.text(col.bx + 160, last + col.bh + 22, "V", { size: 13, weight: "700", fill: "#3b82f6" });
      const h = col.h + 30;
      return D.svg(totW, h, inner);
    }

    function buildSdpa() {
      const X = M.randMat(state.n, D_MODEL, state.seed, 0.8);
      const r = oneHead(X, state.seed, state.mask);
      const tok = tokLabels(state.n, "x");
      const dcol = tokLabels(dk, "d").map((_, i) => "d" + (i + 1));
      const out = [];

      out.push({
        title: "Proyeksi Q, K, V",
        desc: "Tiap token (baris X) diproyeksikan linear menjadi Query, Key, dan Value.",
        latex: [["Rumus", "Q = XW_Q,\\; K = XW_K,\\; V = XW_V"]],
        active: "inmm",
        viz: () =>
          "<h4>Q</h4>" + matTable(r.Q, tok, dcol) +
          "<h4>K</h4>" + matTable(r.K, tok, dcol) +
          "<h4>V</h4>" + matTable(r.V, tok, dcol),
      });
      out.push({
        title: "Skor S = QKᵀ",
        desc: "Dot-product setiap query dengan setiap key menghasilkan matriks skor n×n.",
        latex: [["Rumus", "S = QK^T"]],
        active: "inmm",
        viz: () => matTable(r.S, tok, tok),
      });
      out.push({
        title: "Scale 1/√dₖ",
        desc: "Skor dibagi √dₖ agar dot-product tidak terlalu besar sehingga gradien softmax stabil.",
        latex: [
          ["Rumus", "S' = \\frac{QK^T}{\\sqrt{d_k}}"],
          ["√dₖ", "\\sqrt{d_k} = \\sqrt{" + dk + "} = " + M.fmt(SQ)],
        ],
        active: "scale",
        viz: () => matTable(r.mask ? r.Smask : r.S, tok, tok),
      });
      if (state.mask) {
        out.push({
          title: "Causal Mask",
          desc: "Posisi masa depan (j > i) diisi −∞ sebelum softmax agar token i hanya melihat token ≤ i.",
          latex: [["Rumus", "S_{ij} = -\\infty \\;\\text{jika}\\; j > i"]],
          active: "mask",
          viz: () => matTable(r.Sscaled, tok, tok),
        });
      }
      out.push({
        title: "Softmax baris → A",
        desc: "Tiap baris dinormalkan dengan softmax: seberapa besar token i memperhatikan token j.",
        latex: [["Rumus", "A = \\softmax(\\frac{QK^T}{\\sqrt{d_k}})"]],
        active: "softmax",
        viz: () =>
          heatTable(r.A, tok, tok) +
          '<div class="note">Sel makin pekat = perhatian makin besar. Tiap baris berjumlah 1.</div>',
      });
      out.push({
        title: "Output = A·V",
        desc: "Representasi baru tiap token = jumlah berbobot Value seluruh token.",
        latex: [["Rumus", "\\text{Attention}(Q,K,V)=\\softmax(\\frac{QK^T}{\\sqrt{" + dk + "}})V"]],
        active: "outmm",
        viz: () => heatTable(r.A, tok, tok) + "<h4>Output</h4>" + matTable(r.O, tok, dcol),
      });
      return { steps: out, ctx: r };
    }

    // ===================== VIEW 2: MULTI-HEAD =====================
    function multiDiagram(active) {
      // Linear x3 (V,K,Q) -> SDPA (xh) -> Concat -> Linear
      const totW = 360;
      const bh = 38;
      let inner = "";
      const cx = totW / 2;
      // baris bawah: 3 Linear (V,K,Q)
      const linY = 250;
      const linW = 80;
      const lx = [40, 140, 240];
      const llabel = ["Linear V", "Linear K", "Linear Q"];
      lx.forEach((x, i) => {
        const isAct = active === "proj";
        inner += D.rect(x, linY, linW, bh, {
          fill: "#2563eb",
          stroke: isAct ? "#22d3ee" : "#1e293b",
          strokeW: isAct ? 3.5 : 1.5,
        });
        inner += D.text(x + linW / 2, linY + bh / 2, llabel[i], { size: 11, fill: "#fff", weight: "600" });
      });
      // SDPA block
      const sdpaY = 160;
      const sdpaW = 240;
      const sdpaX = cx - sdpaW / 2;
      inner += D.line(cx, sdpaY + bh, cx, linY, { color: "#3b82f6" });
      const isS = active === "attn";
      inner += D.rect(sdpaX, sdpaY, sdpaW, bh, {
        fill: "#9c4f2e",
        stroke: isS ? "#22d3ee" : "#1e293b",
        strokeW: isS ? 3.5 : 1.5,
      });
      inner += D.text(cx, sdpaY + bh / 2, "Scaled Dot-Product Attention (×" + state.heads + ")", {
        size: 11,
        fill: "#fff",
        weight: "600",
      });
      // Concat
      const concatY = 90;
      const concatW = 160;
      const concatX = cx - concatW / 2;
      inner += D.line(cx, concatY + bh, cx, sdpaY, { color: "#3b82f6" });
      const isC = active === "concat";
      inner += D.rect(concatX, concatY, concatW, bh, {
        fill: "#3b6",
        stroke: isC ? "#22d3ee" : "#1e293b",
        strokeW: isC ? 3.5 : 1.5,
      });
      inner += D.text(cx, concatY + bh / 2, "Concat", { size: 12, fill: "#06281a", weight: "700" });
      // Linear akhir
      const finY = 20;
      const finW = 160;
      const finX = cx - finW / 2;
      inner += D.line(cx, finY + bh, cx, concatY, { color: "#3b82f6" });
      const isF = active === "linear";
      inner += D.rect(finX, finY, finW, bh, {
        fill: "#2563eb",
        stroke: isF ? "#22d3ee" : "#1e293b",
        strokeW: isF ? 3.5 : 1.5,
      });
      inner += D.text(cx, finY + bh / 2, "Linear  Wᴼ", { size: 12, fill: "#fff", weight: "600" });
      return D.svg(totW, 320, inner);
    }

    function buildMulti() {
      const X = M.randMat(state.n, D_MODEL, state.seed, 0.8);
      const tok = tokLabels(state.n, "x");
      const dcol = tokLabels(dk, "d").map((_, i) => "d" + (i + 1));
      const heads = [];
      for (let hI = 0; hI < state.heads; hI++) {
        heads.push(oneHead(X, state.seed + hI * 10, false));
      }
      // Concat O sepanjang kolom
      const Concat = X.map((_, i) => {
        let row = [];
        heads.forEach((h) => (row = row.concat(h.O[i])));
        return row;
      });
      const concatCols = heads.length * dk;
      const Wo = M.randMat(concatCols, D_MODEL, state.seed + 99, 0.4);
      const O = M.matMul(Concat, Wo);
      const ccol = Array.from({ length: concatCols }, (_, i) => "c" + (i + 1));

      const out = [];
      out.push({
        title: "Proyeksi tiap head",
        desc:
          "Ada " + state.heads + " head; tiap head memproyeksikan X dengan Wᵠ, Wᴷ, Wⱽ-nya sendiri untuk mendapat Qᵢ, Kᵢ, Vᵢ.",
        latex: [["Rumus", "head_i=\\text{Attention}(QW_i^Q,KW_i^K,VW_i^V)"]],
        active: "proj",
        viz: () =>
          heads
            .map(
              (h, i) =>
                "<h4>Head " + (i + 1) + " — Q</h4>" + matTable(h.Q, tok, dcol)
            )
            .join(""),
      });
      out.push({
        title: "Attention tiap head",
        desc: "Tiap head menjalankan Scaled Dot-Product Attention secara paralel.",
        latex: [["Rumus", "\\text{Attention}(Q,K,V)=\\softmax(\\frac{QK^T}{\\sqrt{d_k}})V"]],
        active: "attn",
        viz: () =>
          '<div class="seg-row">' +
          heads
            .map(
              (h, i) =>
                '<div class="head-block"><h4>Head ' + (i + 1) + "</h4>" + heatTable(h.A, tok, tok) + "</div>"
            )
            .join("") +
          "</div>",
      });
      out.push({
        title: "Concat output head",
        desc: "Output tiap head digabung sepanjang kolom menjadi matriks n×(h·dₖ).",
        latex: [["Rumus", "\\text{Concat}(head_1,..,head_h)"]],
        active: "concat",
        viz: () => matTable(Concat, tok, ccol),
      });
      out.push({
        title: "Linear Wᴼ → output",
        desc: "Hasil concat dilewatkan proyeksi linear akhir Wᴼ menjadi output Multi-Head.",
        latex: [["Rumus", "\\text{MultiHead}=\\text{Concat}(head_1,..,head_h)W^O"]],
        active: "linear",
        viz: () => matTable(O, tok, dcol),
      });
      return { steps: out };
    }

    // ===================== VIEW 3: ARSITEKTUR =====================
    const ARCH_EXPL = {
      "input-embed":
        "Input Embedding: token masukan encoder diubah menjadi vektor berdimensi d_model.",
      "pos-enc-in":
        "Positional Encoding (encoder): menambahkan informasi urutan posisi ke embedding karena attention tidak punya notion urutan.",
      "enc-mha":
        "Multi-Head Attention (encoder): self-attention atas seluruh token input — tiap token bisa melihat semua token lain.",
      "enc-addnorm1":
        "Add & Norm: residual connection (x + Sublayer(x)) lalu Layer Normalization untuk menstabilkan pelatihan.",
      "enc-ffn":
        "Feed Forward: dua lapis linear dengan aktivasi (mis. ReLU) diterapkan posisi-per-posisi.",
      "enc-addnorm2":
        "Add & Norm setelah FFN — melengkapi satu blok encoder. Blok ini ditumpuk N× (N×).",
      "out-embed":
        "Output Embedding: token keluaran (yang sudah diprediksi, digeser ke kanan) diubah menjadi vektor.",
      "pos-enc-out":
        "Positional Encoding (decoder): menambahkan informasi posisi pada embedding keluaran.",
      "dec-mmha":
        "Masked Multi-Head Attention: self-attention decoder dengan causal mask agar posisi i hanya melihat token ≤ i (mencegah melihat masa depan).",
      "dec-addnorm1":
        "Add & Norm setelah masked self-attention decoder.",
      "dec-mha":
        "Encoder-Decoder Attention: Query dari decoder, Key & Value dari output encoder — decoder 'membaca' representasi input.",
      "dec-addnorm2":
        "Add & Norm setelah encoder-decoder attention.",
      "dec-ffn":
        "Feed Forward pada decoder, posisi-per-posisi.",
      "dec-addnorm3":
        "Add & Norm penutup blok decoder. Blok decoder ditumpuk N× (N×).",
      linear:
        "Linear: memproyeksikan output decoder ke dimensi vocabulary.",
      softmax:
        "Softmax: mengubah skor menjadi distribusi probabilitas atas seluruh token vocabulary.",
      "out-prob":
        "Output Probabilities: probabilitas token berikutnya yang diprediksi model.",
    };

    function archDiagram() {
      const W = 560,
        H = 700;
      const bw = 180,
        bh = 36,
        gap = 14;
      const encX = 30,
        decX = 350;
      let inner = "";
      function blk(x, y, key, label, fill, fg) {
        const isAct = key === archKey;
        inner += D.rect(x, y, bw, bh, {
          fill: fill,
          stroke: isAct ? "#22d3ee" : "#1e293b",
          strokeW: isAct ? 3.5 : 1.5,
          data: key,
        });
        inner += D.text(x + bw / 2, y + bh / 2, label, {
          size: 11,
          fill: fg || "#fff",
          weight: "600",
          data: key,
        });
      }
      const ATT = "#9c4f2e",
        NORM = "#3b6",
        FFN = "#2563eb",
        EMB = "#7c3aed";
      // ENCODER (kolom kiri) — dari bawah ke atas
      const encOrder = [
        ["input-embed", "Input Embedding", EMB, "#fff"],
        ["pos-enc-in", "Positional Encoding", "#0e7490", "#fff"],
        ["enc-mha", "Multi-Head Attention", ATT, "#fff"],
        ["enc-addnorm1", "Add & Norm", NORM, "#06281a"],
        ["enc-ffn", "Feed Forward", FFN, "#fff"],
        ["enc-addnorm2", "Add & Norm", NORM, "#06281a"],
      ];
      const encYs = [];
      encOrder.forEach((b, i) => {
        const y = H - 80 - i * (bh + gap);
        encYs.push(y);
      });
      for (let i = 0; i < encOrder.length - 1; i++) {
        inner += D.line(encX + bw / 2, encYs[i], encX + bw / 2, encYs[i + 1] + bh, { color: "#3b82f6" });
      }
      // bingkai N× encoder (sekitar mha..addnorm2)
      const encTop = encYs[encOrder.length - 1] - 8;
      const encBot = encYs[2] + bh + 8;
      inner += D.rect(encX - 12, encTop, bw + 24, encBot - encTop, {
        fill: "transparent",
        stroke: "#64748b",
        dash: "5 4",
        rx: 10,
      });
      inner += D.text(encX - 12, encTop - 10, "N×", { anchor: "start", size: 12, fill: "#64748b", weight: "700" });
      encOrder.forEach((b, i) => blk(encX, encYs[i], b[0], b[1], b[2], b[3]));

      // DECODER (kolom kanan) — dari bawah ke atas
      const decOrder = [
        ["out-embed", "Output Embedding", EMB, "#fff"],
        ["pos-enc-out", "Positional Encoding", "#0e7490", "#fff"],
        ["dec-mmha", "Masked Multi-Head Attn", ATT, "#fff"],
        ["dec-addnorm1", "Add & Norm", NORM, "#06281a"],
        ["dec-mha", "Multi-Head Attention", ATT, "#fff"],
        ["dec-addnorm2", "Add & Norm", NORM, "#06281a"],
        ["dec-ffn", "Feed Forward", FFN, "#fff"],
        ["dec-addnorm3", "Add & Norm", NORM, "#06281a"],
      ];
      const decYs = [];
      decOrder.forEach((b, i) => {
        const y = H - 80 - i * (bh + gap);
        decYs.push(y);
      });
      for (let i = 0; i < decOrder.length - 1; i++) {
        inner += D.line(decX + bw / 2, decYs[i], decX + bw / 2, decYs[i + 1] + bh, { color: "#3b82f6" });
      }
      const decTop = decYs[decOrder.length - 1] - 8;
      const decBot = decYs[2] + bh + 8;
      inner += D.rect(decX - 12, decTop, bw + 24, decBot - decTop, {
        fill: "transparent",
        stroke: "#64748b",
        dash: "5 4",
        rx: 10,
      });
      inner += D.text(decX - 12, decTop - 10, "N×", { anchor: "start", size: 12, fill: "#64748b", weight: "700" });
      decOrder.forEach((b, i) => blk(decX, decYs[i], b[0], b[1], b[2], b[3]));

      // Linear, Softmax, Output Probabilities (di atas decoder)
      const headOrder = [
        ["linear", "Linear", FFN, "#fff"],
        ["softmax", "Softmax", NORM, "#06281a"],
        ["out-prob", "Output Probabilities", "#0f172a", "#e2e8f0"],
      ];
      const headYs = [];
      const headTop0 = decYs[decOrder.length - 1] - 8;
      headOrder.forEach((b, i) => {
        const y = headTop0 - (bh + gap) - i * (bh + gap);
        headYs.push(y);
      });
      // sambungkan addnorm3 decoder -> linear
      inner += D.line(decX + bw / 2, decYs[decOrder.length - 1], decX + bw / 2, headYs[0] + bh, { color: "#3b82f6" });
      for (let i = 0; i < headOrder.length - 1; i++) {
        inner += D.line(decX + bw / 2, headYs[i], decX + bw / 2, headYs[i + 1] + bh, { color: "#3b82f6" });
      }
      headOrder.forEach((b, i) => blk(decX, headYs[i], b[0], b[1], b[2], b[3]));

      // panah dari atas encoder ke encoder-decoder attention (dec-mha)
      const encOutX = encX + bw,
        encOutY = encYs[encOrder.length - 1] + bh / 2;
      const decMhaX = decX,
        decMhaY = decYs[4] + bh / 2;
      inner += D.line(encOutX, encOutY, encX + bw + 30, encOutY, { color: "#16a34a", width: 2, arrow: false });
      inner += D.line(encX + bw + 30, encOutY, encX + bw + 30, decMhaY, { color: "#16a34a", width: 2, arrow: false });
      inner += D.line(encX + bw + 30, decMhaY, decMhaX, decMhaY, { color: "#16a34a", width: 2 });

      // judul kolom
      inner += D.text(encX + bw / 2, H - 30, "Encoder", { size: 13, weight: "700", fill: "#94a3b8" });
      inner += D.text(decX + bw / 2, H - 30, "Decoder", { size: 13, weight: "700", fill: "#94a3b8" });

      return D.svg(W, H, inner);
    }

    function renderArch() {
      el.stepper.style.display = "none";
      el.stepTitle.textContent = "Arsitektur Transformer";
      el.stepDesc.textContent =
        "Encoder (kiri) memproses input; decoder (kanan) menghasilkan output secara autoregresif sambil melihat encoder. Klik blok untuk penjelasan.";
      el.formula.innerHTML =
        fbox("Attention", "\\text{Attention}(Q,K,V)=\\softmax(\\frac{QK^T}{\\sqrt{d_k}})V") +
        fbox("Multi-Head", "\\text{MultiHead}=\\text{Concat}(head_1,..,head_h)W^O");
      el.vizTitle.textContent = "Visualisasi — Arsitektur";
      el.viz.innerHTML = archDiagram();
      el.comp.style.display = "";
      if (archKey) {
        el.comp.innerHTML = "<strong>" + D.esc(archKey) + "</strong>: " + D.esc(ARCH_EXPL[archKey] || "");
      } else {
        el.comp.textContent = "Klik komponen pada diagram untuk penjelasan.";
      }
    }

    // ---- render langkah (sdpa & multi) ----
    function renderStep(i, step) {
      if (!step) return;
      el.stepTitle.textContent = step.title;
      el.stepDesc.textContent = step.desc;
      const diag = state.view === "sdpa" ? sdpaDiagram(step.active) : multiDiagram(step.active);
      el.formula.innerHTML = step.latex.map((p) => fbox(p[0], p[1])).join("") + diag;
      el.vizTitle.textContent = "Visualisasi — " + step.title;
      el.viz.innerHTML = step.viz ? step.viz() : "";
      el.comp.style.display = "none";
    }

    function rebuildSteps() {
      if (state.view === "sdpa") steps = buildSdpa().steps;
      else if (state.view === "multi") steps = buildMulti().steps;
      else steps = [];
    }

    const stepper = MLSim.makeStepper({
      controlsEl: el.stepper,
      getSteps: () => steps,
      onStep: renderStep,
      onReset: rebuildSteps,
      speedMs: 1200,
    });

    function rebuild() {
      el.desc.textContent = DESC[state.view];
      el.headsField.style.display = state.view === "multi" ? "block" : "none";
      el.maskField.style.display = state.view === "sdpa" ? "block" : "none";
      if (state.view === "arch") {
        renderArch();
      } else {
        el.stepper.style.display = "";
        rebuildSteps();
        stepper.goto(0);
      }
    }

    // ---- event ----
    el.view.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      state.view = b.getAttribute("data-v");
      Array.prototype.forEach.call(el.view.children, (c) => c.classList.toggle("active", c === b));
      rebuild();
    });
    el.mask.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      state.mask = b.getAttribute("data-v") === "1";
      Array.prototype.forEach.call(el.mask.children, (c) => c.classList.toggle("active", c === b));
      rebuild();
    });
    el.n.addEventListener("input", () => {
      state.n = parseInt(el.n.value, 10);
      el.nOut.textContent = state.n;
      rebuild();
    });
    el.heads.addEventListener("input", () => {
      state.heads = parseInt(el.heads.value, 10);
      el.headsOut.textContent = state.heads;
      rebuild();
    });
    el.seed.addEventListener("input", () => {
      state.seed = parseInt(el.seed.value, 10) || 1;
      rebuild();
    });
    // event delegation klik komponen arsitektur
    el.viz.addEventListener("click", (e) => {
      if (state.view !== "arch") return;
      const node = e.target.closest("[data-comp]");
      const k = node ? node.getAttribute("data-comp") : null;
      if (!k) return;
      archKey = k;
      renderArch();
    });

    rebuild();
    return {
      refreshFormula: () => {
        if (stepper) stepper.fire();
      },
    };
  }

  MLSim.Transformer = { init };
})();
