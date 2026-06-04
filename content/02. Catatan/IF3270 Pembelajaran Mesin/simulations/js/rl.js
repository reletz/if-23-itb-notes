/* rl.js — RL simulator dua mode:
 *   1) "Navigasi & Nilai"  : Value Iteration di gudang 5×5 (presets.rl5) + panel istilah RL + Markov property.
 *   2) "Belajar TD"        : SARSA / Q-Learning step-by-step (contoh catatan 2×3 & eksplorasi 5×5).
 * Vanilla JS, namespace window.MLSim. Teks UI Bahasa Indonesia. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});
  const M = MLSim.mat;
  const D = MLSim.draw;
  const ACTIONS = ["up", "down", "left", "right"];
  const ACT_ID = ["Atas", "Bawah", "Kiri", "Kanan"];
  const DELTA = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
  const ARROW = { up: "↑", down: "↓", left: "←", right: "→" };
  const NAMA = { up: "Atas", down: "Bawah", left: "Kiri", right: "Kanan" };

  function fbox(label, latex) {
    return (
      '<div class="formula-box"><div class="formula-label">' +
      label +
      '</div><div class="math">' +
      MLSim.math.toString(latex) +
      "</div></div>"
    );
  }
  function key(r, c) {
    return r + "," + c;
  }
  function cloneQ(Q) {
    const o = {};
    for (const k in Q) o[k] = Object.assign({}, Q[k]);
    return o;
  }

  // ====================================================================
  //  INIT — mode selector + dua kontainer (toggle)
  // ====================================================================
  function init(root) {
    let tdStepper = null; // dipakai oleh refreshFormula

    root.innerHTML =
      '<div class="seg" id="rl-mode">' +
      '  <button data-v="vi" class="active">Navigasi &amp; Nilai</button>' +
      '  <button data-v="td">Belajar TD</button>' +
      "</div>" +
      '<div id="rl-pane-vi"></div>' +
      '<div id="rl-pane-td" style="display:none"></div>';

    const paneVI = root.querySelector("#rl-pane-vi");
    const paneTD = root.querySelector("#rl-pane-td");

    buildValueMode(paneVI);
    tdStepper = buildTDMode(paneTD);

    // ---- toggle mode ----
    const modeSeg = root.querySelector("#rl-mode");
    modeSeg.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      Array.prototype.forEach.call(modeSeg.children, (c) =>
        c.classList.toggle("active", c === b)
      );
      const v = b.getAttribute("data-v");
      paneVI.style.display = v === "vi" ? "" : "none";
      paneTD.style.display = v === "td" ? "" : "none";
    });

    return {
      refreshFormula: () => {
        if (tdStepper) tdStepper.fire();
      },
    };
  }

  // ====================================================================
  //  MODE 1 — VALUE ITERATION (gudang 5×5)
  // ====================================================================
  function buildValueMode(host) {
    const P = MLSim.presets.rl5;
    const ROWS = P.rows,
      COLS = P.cols;
    const GR = P.goal[0],
      GC = P.goal[1];

    function isObstacle(r, c) {
      return P.obstacles.some((o) => o[0] === r && o[1] === c);
    }
    function isGoal(r, c) {
      return r === GR && c === GC;
    }
    function isStart(r, c) {
      return r === P.start[0] && c === P.start[1];
    }
    function inBounds(r, c) {
      return r >= 0 && r < ROWS && c >= 0 && c < COLS;
    }
    function nextCell(r, c, a) {
      const d = DELTA[a];
      const nr = r + d[0],
        nc = c + d[1];
      if (!inBounds(nr, nc) || isObstacle(nr, nc)) return [r, c]; // tetap
      return [nr, nc];
    }

    // ---- value iteration ----
    function solve() {
      const V = M.zerosMat(ROWS, COLS);
      V[GR][GC] = P.goalReward;
      for (let it = 0; it < 300; it++) {
        for (let r = 0; r < ROWS; r++)
          for (let c = 0; c < COLS; c++) {
            if (isObstacle(r, c) || isGoal(r, c)) continue;
            let best = -Infinity;
            for (const a of ACTIONS) {
              const n = nextCell(r, c, a);
              const v = P.stepReward + P.gamma * V[n[0]][n[1]];
              if (v > best) best = v;
            }
            V[r][c] = best;
          }
      }
      const PI = {};
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) {
          if (isObstacle(r, c) || isGoal(r, c)) continue;
          let best = -Infinity,
            ba = "up";
          for (const a of ACTIONS) {
            const n = nextCell(r, c, a);
            const v = P.stepReward + P.gamma * V[n[0]][n[1]];
            if (v > best) {
              best = v;
              ba = a;
            }
          }
          PI[key(r, c)] = ba;
        }
      return { V: V, PI: PI };
    }
    const sol = solve();
    const V = sol.V,
      PI = sol.PI;

    // rentang V (untuk heat) — kecuali obstacle
    let vmin = Infinity,
      vmax = -Infinity;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        if (isObstacle(r, c)) continue;
        if (V[r][c] < vmin) vmin = V[r][c];
        if (V[r][c] > vmax) vmax = V[r][c];
      }
    const vspan = vmax - vmin || 1;

    // ---- state navigasi robot ----
    let pos = P.start.slice();
    let steps = 0;
    let total = 0;
    let done = false;
    let view = "normal";
    let epsilon = 0.1;
    let speedMs = 700;
    let timer = null;
    const rng = M.makeRNG(7);

    // ---- markup ----
    host.innerHTML =
      '<div class="sim-layout">' +
      '  <div class="col-controls">' +
      '    <div class="panel">' +
      "      <h3>Kendali Robot</h3>" +
      '      <div class="field"><label>ε (Eksplorasi): <span id="vi-e-out">0.1</span></label>' +
      '        <div class="range-row"><input type="range" id="vi-eps" min="0" max="1" step="0.05" value="0.1"/></div></div>' +
      '      <div class="field"><label>Kecepatan: <span id="vi-s-out">700</span> ms</label>' +
      '        <div class="range-row"><input type="range" id="vi-speed" min="120" max="1400" step="40" value="700"/></div></div>' +
      '      <div class="field" style="display:flex;gap:8px;flex-wrap:wrap">' +
      '        <button class="btn" id="vi-step">Langkah</button>' +
      '        <button class="btn btn-primary" id="vi-auto">▶ Auto</button>' +
      '        <button class="btn" id="vi-reset">⏮ Reset</button>' +
      "      </div>" +
      '      <div class="field"><label>Statistik</label>' +
      '        <div class="note" id="vi-stats"></div></div>' +
      '      <div class="note">Lingkungan: gudang 5×5. Robot 🤖 mulai di pojok kiri-atas, tujuan 🏁 di pojok kanan-bawah. ' +
      "Setiap langkah −1, mencapai tujuan +10. Policy diturunkan dari Value Iteration.</div>" +
      "    </div>" +
      "  </div>" +
      '  <div class="col-main">' +
      '    <div class="panel">' +
      '      <div class="rl-views" id="vi-views">' +
      '        <button class="btn btn-primary" data-v="normal">Normal</button>' +
      '        <button class="btn" data-v="value">Value</button>' +
      '        <button class="btn" data-v="policy">Policy</button>' +
      "      </div>" +
      '      <div id="vi-grid"></div>' +
      '      <div id="vi-legend"></div>' +
      '      <div class="commentary" id="vi-comment">Tekan <strong>Langkah</strong> atau <strong>Auto</strong> untuk menggerakkan robot.</div>' +
      "    </div>" +
      '    <div class="panel">' +
      "      <h3>Istilah RL untuk posisi sekarang</h3>" +
      '      <div class="terms-panel" id="vi-terms"></div>' +
      "    </div>" +
      '    <div class="panel">' +
      "      <h3>Markov Property</h3>" +
      '      <p class="step-desc">Dua jalur berbeda menuju sel (2,2). Aksi optimal di (2,2) sama saja, ' +
      "berapa pun riwayat jalur — itulah sifat Markov: masa depan hanya bergantung pada state saat ini.</p>" +
      '      <div class="markov-grids"><div id="vi-mkA"></div><div id="vi-mkB"></div></div>' +
      '      <div class="verdict" id="vi-verdict"></div>' +
      '      <div id="vi-formulas"></div>' +
      "    </div>" +
      "  </div>" +
      "</div>";

    const el = {
      eps: host.querySelector("#vi-eps"),
      eOut: host.querySelector("#vi-e-out"),
      speed: host.querySelector("#vi-speed"),
      sOut: host.querySelector("#vi-s-out"),
      step: host.querySelector("#vi-step"),
      auto: host.querySelector("#vi-auto"),
      reset: host.querySelector("#vi-reset"),
      stats: host.querySelector("#vi-stats"),
      views: host.querySelector("#vi-views"),
      grid: host.querySelector("#vi-grid"),
      legend: host.querySelector("#vi-legend"),
      comment: host.querySelector("#vi-comment"),
      terms: host.querySelector("#vi-terms"),
      verdict: host.querySelector("#vi-verdict"),
    };

    // ---- render grid utama ----
    function renderGrid() {
      let html =
        '<div class="grid-wrap"><div class="grid" style="grid-template-columns:repeat(' +
        COLS +
        ',96px)">';
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const obstacle = isObstacle(r, c),
            goal = isGoal(r, c),
            start = isStart(r, c);
          const cls = ["gcell"];
          if (goal) cls.push("goal");
          if (obstacle) cls.push("wall");
          if (pos[0] === r && pos[1] === c) cls.push("curr");
          let style = "";
          let center = "";

          if (view === "value" && !obstacle) {
            const t = (V[r][c] - vmin) / vspan;
            const h = D.heat(t);
            style = "background:" + h.bg + ";color:" + h.fg + ";";
            center =
              '<span class="policy" style="opacity:1;color:' +
              h.fg +
              ';font-size:0.9rem;font-weight:700">' +
              M.fmt(V[r][c], 1) +
              "</span>";
          } else if (view === "policy" && !obstacle && !goal) {
            center = '<span class="policy" style="opacity:0.8">' + ARROW[PI[key(r, c)]] + "</span>";
          } else {
            // normal
            if (start && !goal) style = "background:rgba(29,78,216,0.12);";
            if (goal) center = '<span class="policy" style="opacity:1">🏁</span>';
            else if (obstacle) center = '<span class="policy" style="opacity:0.6">▪</span>';
          }

          const robot =
            pos[0] === r && pos[1] === c ? '<span class="robot">🤖</span>' : "";
          html +=
            '<div class="' +
            cls.join(" ") +
            '" style="' +
            style +
            '">' +
            center +
            robot +
            '<span class="vlabel">(' +
            r +
            "," +
            c +
            ")</span></div>";
        }
      }
      html += "</div></div>";
      el.grid.innerHTML = html;

      // legend per view
      let leg = "";
      if (view === "value") {
        leg =
          '<div class="legend"><span>V rendah</span><span class="val-gradient"></span>' +
          "<span>tinggi</span>" +
          "<span>angka = nilai V(s) hasil Value Iteration</span></div>";
      } else if (view === "policy") {
        leg = '<div class="legend"><span>↑↓←→ = aksi greedy π(s) menuju tujuan</span></div>';
      } else {
        leg =
          '<div class="legend">' +
          '<span><span class="sw" style="background:rgba(46,125,50,0.3)"></span>Tujuan (+10)</span>' +
          '<span><span class="sw" style="background:var(--muted)"></span>Rintangan</span>' +
          '<span><span class="sw" style="background:rgba(29,78,216,0.2)"></span>Start</span>' +
          "<span>🤖 posisi robot</span></div>";
      }
      el.legend.innerHTML = leg;
    }

    // ---- panel istilah RL (live) ----
    function renderTerms() {
      const r = pos[0],
        c = pos[1];
      const a = PI[key(r, c)] ? NAMA[PI[key(r, c)]] : "—";
      const cards = [
        [
          "Environment (Lingkungan)",
          "Gudang 5×5 dengan rintangan",
          "Dunia tempat agen bertindak; menentukan transisi & reward.",
        ],
        ["Agent (Agen)", "Robot 🤖", "Pengambil keputusan yang belajar memaksimalkan reward."],
        [
          "Observation (Observasi)",
          "Posisi (" + r + "," + c + ")",
          "Apa yang diketahui agen tentang state saat ini.",
        ],
        [
          "Action (Aksi)",
          "Atas / Bawah / Kiri / Kanan",
          "Pilihan gerak; greedy di sini: " + a + ".",
        ],
        [
          "Reward (Imbalan)",
          (isGoal(r, c) ? "+" + P.goalReward + " (tujuan)" : P.stepReward + " per langkah"),
          "Sinyal numerik atas hasil aksi.",
        ],
        [
          "Value (Nilai)",
          "V(" + r + "," + c + ") = " + M.fmt(V[r][c], 2),
          "Ekspektasi total reward (diskon) mulai dari state ini.",
        ],
        [
          "Policy (Kebijakan)",
          "π(" + r + "," + c + ") = " + a,
          "Pemetaan state → aksi yang dipilih agen.",
        ],
        [
          "Model",
          "Transisi deterministik P(s'|s,a)",
          "Pengetahuan agen tentang dinamika lingkungan (di sini diketahui penuh).",
        ],
      ];
      el.terms.innerHTML = cards
        .map(
          (t) =>
            '<div class="term-card"><div class="term-name">' +
            t[0] +
            '</div><div class="term-val">' +
            t[1] +
            '</div><div class="term-desc">' +
            t[2] +
            "</div></div>"
        )
        .join("");
    }

    function renderStats() {
      el.stats.innerHTML =
        "Langkah: <strong>" +
        steps +
        "</strong> · Total Reward: <strong>" +
        M.fmt(total, 0) +
        "</strong> · V(posisi): <strong>" +
        M.fmt(V[pos[0]][pos[1]], 2) +
        "</strong>";
    }

    // ---- satu langkah robot (ε-greedy atas policy) ----
    function takeStep() {
      if (done) return;
      let act, eksplorasi;
      if (rng() < epsilon) {
        act = ACTIONS[Math.floor(rng() * 4)];
        eksplorasi = true;
      } else {
        act = PI[key(pos[0], pos[1])] || ACTIONS[Math.floor(rng() * 4)];
        eksplorasi = false;
      }
      const n = nextCell(pos[0], pos[1], act);
      const blocked = n[0] === pos[0] && n[1] === pos[1];
      pos = n;
      steps++;
      let rew = P.stepReward;
      if (isGoal(pos[0], pos[1])) {
        rew = P.goalReward;
        done = true;
      }
      total += rew;

      let msg =
        (epsilon > 0
          ? "<strong>[" + (eksplorasi ? "Eksplorasi" : "Eksploitasi") + "]</strong> "
          : "") +
        "Aksi: <strong>" +
        NAMA[act] +
        "</strong> → " +
        (blocked ? "terhalang, tetap di " : "pindah ke ") +
        "(" +
        pos[0] +
        "," +
        pos[1] +
        "). Reward " +
        M.fmt(rew, 0) +
        ". V = " +
        M.fmt(V[pos[0]][pos[1]], 2) +
        ".";
      if (done) {
        msg += " <strong>🏁 Tujuan tercapai!</strong> Episode selesai.";
        stopAuto();
      }
      el.comment.innerHTML = msg;

      renderGrid();
      renderTerms();
      renderStats();
    }

    function startAuto() {
      if (timer || done) return;
      el.auto.textContent = "⏸ Pause";
      el.auto.classList.add("playing");
      timer = setInterval(() => {
        takeStep();
        if (done) stopAuto();
      }, speedMs);
    }
    function stopAuto() {
      if (timer) clearInterval(timer);
      timer = null;
      el.auto.textContent = "▶ Auto";
      el.auto.classList.remove("playing");
    }
    function resetNav() {
      stopAuto();
      pos = P.start.slice();
      steps = 0;
      total = 0;
      done = false;
      el.comment.innerHTML =
        "Tekan <strong>Langkah</strong> atau <strong>Auto</strong> untuk menggerakkan robot.";
      renderGrid();
      renderTerms();
      renderStats();
    }

    // ---- Markov mini-grids ----
    function renderMiniGrid(targetEl, pathPoints, color, label) {
      const onPath = {};
      pathPoints.forEach((p, i) => (onPath[key(p[0], p[1])] = i));
      let html =
        '<div style="font-size:0.8rem;color:var(--muted);margin-bottom:6px">' +
        label +
        '</div><div class="grid-wrap"><div class="grid" style="grid-template-columns:repeat(' +
        COLS +
        ',40px)">';
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const obstacle = isObstacle(r, c);
          let style = "width:40px;height:40px;font-size:0.55rem;";
          let inner = "";
          if (obstacle) style += "background:var(--muted);";
          if (key(r, c) in onPath) {
            style += "background:" + color + ";color:#fff;font-weight:700;";
            inner = "" + (onPath[key(r, c)] + 1);
          }
          if (r === P.markov.meet[0] && c === P.markov.meet[1]) {
            style += "outline:3px solid var(--accent);outline-offset:-3px;";
          }
          html +=
            '<div class="gcell" style="' +
            style +
            '">' +
            inner +
            '<span class="vlabel" style="font-size:0.45rem">(' +
            r +
            "," +
            c +
            ")</span></div>";
        }
      }
      html += "</div></div>";
      targetEl.innerHTML = html;
    }

    function renderMarkov() {
      renderMiniGrid(host.querySelector("#vi-mkA"), P.markov.pathA, "#1d4ed8", "Jalur A (biru)");
      renderMiniGrid(host.querySelector("#vi-mkB"), P.markov.pathB, "#ea580c", "Jalur B (oranye)");
      const meet = P.markov.meet;
      const aMeet = PI[key(meet[0], meet[1])];
      el.verdict.innerHTML =
        "Di sel (" +
        meet[0] +
        "," +
        meet[1] +
        "), aksi optimal lewat Jalur A maupun Jalur B sama: <strong>" +
        (aMeet ? NAMA[aMeet] + " " + ARROW[aMeet] : "—") +
        "</strong>. Riwayat jalur tidak berpengaruh — inilah <strong>Markov Property</strong>.";
      host.querySelector("#vi-formulas").innerHTML =
        fbox("Persamaan Bellman (optimal)", "V(s)=\\max_a[R(s,a)+\\gamma V(s')]") +
        fbox(
          "Sifat Markov",
          "P(s_{t+1}|s_t,a_t)=P(s_{t+1}|s_0,a_0,...,s_t,a_t)"
        );
    }

    // ---- events ----
    el.eps.addEventListener("input", () => {
      epsilon = parseFloat(el.eps.value);
      el.eOut.textContent = epsilon;
    });
    el.speed.addEventListener("input", () => {
      speedMs = parseInt(el.speed.value, 10);
      el.sOut.textContent = speedMs;
      if (timer) {
        stopAuto();
        startAuto();
      }
    });
    el.step.addEventListener("click", () => {
      stopAuto();
      takeStep();
    });
    el.auto.addEventListener("click", () => {
      if (timer) stopAuto();
      else startAuto();
    });
    el.reset.addEventListener("click", resetNav);
    el.views.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      view = b.getAttribute("data-v");
      Array.prototype.forEach.call(el.views.children, (c) =>
        c.classList.toggle("btn-primary", c === b)
      );
      renderGrid();
    });

    // ---- render awal ----
    renderGrid();
    renderTerms();
    renderStats();
    renderMarkov();
  }

  // ====================================================================
  //  MODE 2 — TD (SARSA / Q-LEARNING) step-by-step
  //  (dipertahankan dari rl.js lama; mode catatan 2×3 reproduksi 7.5/2.25/−5)
  // ====================================================================
  function buildTDMode(host) {
    const PNote = MLSim.presets.rl; // contoh catatan 2×3
    const P5 = MLSim.presets.rl5; // eksplorasi 5×5

    let state = {
      algo: "sarsa",
      mode: "catatan",
      alpha: PNote.alpha,
      gamma: PNote.gamma,
      epsilon: PNote.epsilon,
      episodes: 8,
      seed: 3,
    };
    let steps = [];

    host.innerHTML =
      '<div class="sim-layout">' +
      '  <div class="col-controls">' +
      '    <div class="panel">' +
      "      <h3>Algoritma & Mode</h3>" +
      '      <div class="field"><label>Algoritma</label><div class="seg" id="td-algo">' +
      '        <button data-v="sarsa" class="active">SARSA (on-policy)</button>' +
      '        <button data-v="qlearning">Q-Learning (off)</button></div></div>' +
      '      <div class="field"><label>Mode</label><div class="seg" id="td-mode">' +
      '        <button data-v="catatan" class="active">Contoh catatan</button>' +
      '        <button data-v="free">ε-greedy 5×5</button></div></div>' +
      '      <div class="field"><label>α (learning rate): <span id="td-a-out">0.5</span></label>' +
      '        <div class="range-row"><input type="range" id="td-alpha" min="0.1" max="1" step="0.1" value="0.5"/></div></div>' +
      '      <div class="field"><label>γ (discount): <span id="td-g-out">0.9</span></label>' +
      '        <div class="range-row"><input type="range" id="td-gamma" min="0" max="0.99" step="0.05" value="0.9"/></div></div>' +
      '      <div class="field" id="td-eps-field" style="display:none"><label>ε (eksplorasi): <span id="td-e-out">0.1</span></label>' +
      '        <div class="range-row"><input type="range" id="td-eps" min="0" max="1" step="0.05" value="0.1"/></div></div>' +
      '      <div class="field" id="td-ep-field" style="display:none"><label>Jumlah episode</label><input type="number" id="td-episodes" value="8" min="1" max="40"/></div>' +
      '      <div class="field" id="td-seed-field" style="display:none"><label>Seed</label><input type="number" id="td-seed" value="3" min="1" max="9999"/></div>' +
      '      <div class="note" id="td-note"></div>' +
      "    </div>" +
      "  </div>" +
      '  <div class="col-main">' +
      '    <div class="stepper" id="td-stepper"></div>' +
      '    <div class="panel formula-panel">' +
      '      <div class="step-title" id="td-step-title">—</div>' +
      '      <div class="step-desc" id="td-step-desc"></div>' +
      '      <div id="td-formula"></div>' +
      "    </div>" +
      '    <div class="panel"><h3>Gridworld</h3><div id="td-grid"></div>' +
      '      <div class="legend" id="td-legend"></div></div>' +
      "  </div>" +
      "</div>";

    const el = {
      algo: host.querySelector("#td-algo"),
      mode: host.querySelector("#td-mode"),
      alpha: host.querySelector("#td-alpha"),
      aOut: host.querySelector("#td-a-out"),
      gamma: host.querySelector("#td-gamma"),
      gOut: host.querySelector("#td-g-out"),
      epsField: host.querySelector("#td-eps-field"),
      eps: host.querySelector("#td-eps"),
      eOut: host.querySelector("#td-e-out"),
      epField: host.querySelector("#td-ep-field"),
      episodes: host.querySelector("#td-episodes"),
      seedField: host.querySelector("#td-seed-field"),
      seed: host.querySelector("#td-seed"),
      note: host.querySelector("#td-note"),
      stepTitle: host.querySelector("#td-step-title"),
      stepDesc: host.querySelector("#td-step-desc"),
      formula: host.querySelector("#td-formula"),
      grid: host.querySelector("#td-grid"),
      legend: host.querySelector("#td-legend"),
    };

    // ---- geometri aktif (catatan vs 5×5) ----
    function geom() {
      if (state.mode === "catatan") {
        return {
          rows: PNote.rows,
          cols: PNote.cols,
          start: [PNote.start.r, PNote.start.c],
          isGoal: (r, c) => r === PNote.goal.r && c === PNote.goal.c,
          isTrap: (r, c) => r === PNote.trap.r && c === PNote.trap.c,
          isWall: () => false,
          goalReward: PNote.goal.reward,
          trapReward: PNote.trap.reward,
          stepReward: PNote.stepReward,
          cellLabel: PNote.cellLabel,
        };
      }
      // 5×5: pakai goal/obstacle rl5; tidak ada trap; step penalty −1
      return {
        rows: P5.rows,
        cols: P5.cols,
        start: P5.start.slice(),
        isGoal: (r, c) => r === P5.goal[0] && c === P5.goal[1],
        isTrap: () => false,
        isWall: (r, c) => P5.obstacles.some((o) => o[0] === r && o[1] === c),
        goalReward: P5.goalReward,
        trapReward: 0,
        stepReward: -1,
        cellLabel: (r, c) => "(" + r + "," + c + ")",
      };
    }
    let cfg = geom();

    function inBounds(r, c) {
      return r >= 0 && r < cfg.rows && c >= 0 && c < cfg.cols;
    }
    function move(r, c, a) {
      const d = DELTA[a];
      const nr = r + d[0],
        nc = c + d[1];
      if (!inBounds(nr, nc) || cfg.isWall(nr, nc)) return [r, c];
      return [nr, nc];
    }
    function reward(r, c) {
      if (cfg.isGoal(r, c)) return cfg.goalReward;
      if (cfg.isTrap(r, c)) return cfg.trapReward;
      return cfg.stepReward;
    }
    function newQ() {
      const Q = {};
      for (let r = 0; r < cfg.rows; r++)
        for (let c = 0; c < cfg.cols; c++)
          Q[key(r, c)] = { up: 0, down: 0, left: 0, right: 0 };
      return Q;
    }
    function maxQ(Q, r, c) {
      const q = Q[key(r, c)];
      return Math.max(q.up, q.down, q.left, q.right);
    }
    function bestAction(Q, r, c) {
      const q = Q[key(r, c)];
      let best = null,
        bv = -Infinity;
      ACTIONS.forEach((a) => {
        if (q[a] > bv) {
          bv = q[a];
          best = a;
        }
      });
      return q.up === 0 && q.down === 0 && q.left === 0 && q.right === 0 ? null : best;
    }

    // ---- generate langkah ----
    function generate() {
      const Q = newQ();
      const out = [];
      const a = state.alpha,
        g = state.gamma;

      function applyUpdate(s, act, r, sp, terminal, aNext, epIdx, kIdx) {
        const old = Q[key(s[0], s[1])][act];
        let target, targetLatex, ruleLatex;
        if (state.algo === "sarsa") {
          const qn = terminal ? 0 : Q[key(sp[0], sp[1])][aNext];
          target = r + g * qn;
          ruleLatex = "Q(s,a) \\leftarrow Q(s,a) + \\alpha[R + \\gamma Q(s',a') - Q(s,a)]";
          targetLatex =
            "Q(" + cfg.cellLabel(s[0], s[1]) + "," + NAMA[act] + ") = " + M.fmt(old) + " + " +
            M.fmt(a) + "(" + M.fmt(r) + " + " + M.fmt(g) + "\\cdot " + M.fmt(qn) + " - " + M.fmt(old) + ")";
        } else {
          const qn = terminal ? 0 : maxQ(Q, sp[0], sp[1]);
          target = r + g * qn;
          ruleLatex =
            "Q(s,a) \\leftarrow Q(s,a) + \\alpha[R + \\gamma \\max_{a'} Q(s',a') - Q(s,a)]";
          targetLatex =
            "Q(" + cfg.cellLabel(s[0], s[1]) + "," + NAMA[act] + ") = " + M.fmt(old) + " + " +
            M.fmt(a) + "(" + M.fmt(r) + " + " + M.fmt(g) + "\\cdot " + M.fmt(qn) + " - " + M.fmt(old) + ")";
        }
        const nv = old + a * (target - old);
        Q[key(s[0], s[1])][act] = nv;
        out.push({
          title:
            "Episode " + (epIdx + 1) + " · langkah " + (kIdx + 1) + " : " +
            cfg.cellLabel(s[0], s[1]) + " " + ARROW[act] + " " + cfg.cellLabel(sp[0], sp[1]),
          desc:
            (state.algo === "sarsa" ? "SARSA" : "Q-Learning") +
            " — perbarui nilai Q untuk aksi yang diambil. R = " + M.fmt(r) +
            (terminal ? " (state terminal)." : "."),
          latex: [
            ["Aturan", ruleLatex],
            ["Substitusi", targetLatex + " = " + M.fmt(nv)],
          ],
          snap: { Q: cloneQ(Q), s: s.slice(), sp: sp.slice(), act: act, terminal: terminal },
        });
      }

      if (state.mode === "catatan") {
        PNote.scriptedEpisodes.forEach((acts, epIdx) => {
          let cur = [PNote.start.r, PNote.start.c];
          for (let k = 0; k < acts.length; k++) {
            const act = acts[k];
            const sp = move(cur[0], cur[1], act);
            const r = reward(sp[0], sp[1]);
            const terminal = cfg.isGoal(sp[0], sp[1]) || cfg.isTrap(sp[0], sp[1]);
            const aNext = k + 1 < acts.length ? acts[k + 1] : null;
            applyUpdate(cur, act, r, sp, terminal, aNext, epIdx, k);
            cur = sp;
            if (terminal) break;
          }
        });
      } else {
        const rng = M.makeRNG(state.seed);
        const eps = state.epsilon;
        function epsGreedy(r, c) {
          if (rng() < eps) return ACTIONS[Math.floor(rng() * 4)];
          const b = bestAction(Q, r, c);
          return b || ACTIONS[Math.floor(rng() * 4)];
        }
        const maxSteps = 60;
        for (let epIdx = 0; epIdx < state.episodes; epIdx++) {
          let cur = cfg.start.slice();
          let act = epsGreedy(cur[0], cur[1]);
          let k = 0;
          while (k < maxSteps) {
            const sp = move(cur[0], cur[1], act);
            const r = reward(sp[0], sp[1]);
            const terminal = cfg.isGoal(sp[0], sp[1]) || cfg.isTrap(sp[0], sp[1]);
            const aNext = terminal ? null : epsGreedy(sp[0], sp[1]);
            applyUpdate(cur, act, r, sp, terminal, aNext, epIdx, k);
            if (terminal) break;
            cur = sp;
            act = state.algo === "sarsa" ? aNext : epsGreedy(cur[0], cur[1]);
            k++;
          }
        }
      }
      return out;
    }

    function rebuildSteps() {
      cfg = geom();
      steps = generate();
    }

    // ---- render ----
    function renderStep(i, step) {
      if (!step) {
        el.stepTitle.textContent = "—";
        el.stepDesc.textContent = "";
        el.formula.innerHTML = "";
        renderGrid(newQ(), null);
        return;
      }
      el.stepTitle.textContent = step.title;
      el.stepDesc.textContent = step.desc;
      el.formula.innerHTML = step.latex.map((p) => fbox(p[0], p[1])).join("");
      renderGrid(step.snap.Q, step.snap);
    }

    function renderGrid(Q, snap) {
      let vmin = Infinity,
        vmax = -Infinity;
      for (let r = 0; r < cfg.rows; r++)
        for (let c = 0; c < cfg.cols; c++) {
          if (cfg.isWall(r, c)) continue;
          const v = maxQ(Q, r, c);
          if (v < vmin) vmin = v;
          if (v > vmax) vmax = v;
        }
      const cellW = cfg.cols <= 3 ? 96 : 78;

      let html =
        '<div class="grid-wrap"><div class="grid" style="grid-template-columns:repeat(' +
        cfg.cols +
        "," +
        cellW +
        'px)">';
      for (let r = 0; r < cfg.rows; r++) {
        for (let c = 0; c < cfg.cols; c++) {
          const q = Q[key(r, c)];
          const goal = cfg.isGoal(r, c),
            trap = cfg.isTrap(r, c),
            wall = cfg.isWall(r, c);
          const cls = ["gcell"];
          if (goal) cls.push("goal");
          if (trap) cls.push("trap");
          if (wall) cls.push("wall");
          if (snap && snap.s[0] === r && snap.s[1] === c) cls.push("curr");
          if (snap && snap.sp[0] === r && snap.sp[1] === c) cls.push("next");
          let bg = "";
          if (!goal && !trap && !wall) {
            const v = maxQ(Q, r, c);
            if (v > 0)
              bg = "background:rgba(46,125,50," + (0.08 + (v / (vmax || 1)) * 0.35).toFixed(2) + ")";
            else if (v < 0)
              bg = "background:rgba(198,40,40," + (0.08 + (v / (vmin || -1)) * 0.35).toFixed(2) + ")";
          }
          const best = bestAction(Q, r, c);
          let inner = "";
          if (!wall) {
            ACTIONS.forEach((act) => {
              const isBest = best === act && !goal && !trap;
              inner +=
                '<span class="q ' + act + (isBest ? " best" : "") + '" style="font-size:' +
                (cfg.cols <= 3 ? "0.66rem" : "0.52rem") + '">' +
                ARROW[act] + M.fmt(q[act], 1) + "</span>";
            });
          }
          let center = "";
          if (goal) center = '<span class="policy">🏁</span>';
          else if (trap) center = '<span class="policy">💀</span>';
          else if (best) center = '<span class="policy">' + ARROW[best] + "</span>";
          const robot =
            snap && snap.sp[0] === r && snap.sp[1] === c ? '<span class="robot">🤖</span>' : "";
          html +=
            '<div class="' + cls.join(" ") + '" style="width:' + cellW + "px;height:" + cellW +
            "px;" + bg + '">' + inner + center + robot +
            '<span class="vlabel">' + cfg.cellLabel(r, c) + "</span></div>";
        }
      }
      html += "</div></div>";
      el.grid.innerHTML = html;

      el.legend.innerHTML =
        '<span><span class="sw" style="background:rgba(46,125,50,0.3)"></span>Goal</span>' +
        (state.mode === "catatan"
          ? '<span><span class="sw" style="background:rgba(198,40,40,0.3)"></span>Trap (−10)</span>'
          : '<span><span class="sw" style="background:var(--muted)"></span>Rintangan</span>') +
        "<span>🤖 posisi agen</span><span>↑↓←→ Q per aksi (biru = terbaik)</span>";
    }

    // ---- stepper ----
    const stepper = MLSim.makeStepper({
      controlsEl: host.querySelector("#td-stepper"),
      getSteps: () => steps,
      onStep: renderStep,
      onReset: rebuildSteps,
      speedMs: 1100,
    });

    function rebuild() {
      const free = state.mode === "free";
      el.epsField.style.display = free ? "block" : "none";
      el.epField.style.display = free ? "block" : "none";
      el.seedField.style.display = free ? "block" : "none";
      el.note.textContent =
        state.mode === "catatan"
          ? "Mode contoh catatan memutar ulang 3 episode dari slide. Dengan α=0.5, γ=0.9 hasil akhir: Q((3,2)→Kanan) = 7.5, Q((2,2)→Atas) = 2.25, Q((2,1)→Kanan) = −5."
          : "Mode ε-greedy 5×5: agen menjelajah gudang sendiri (step −1, goal +10). Naikkan jumlah episode agar Q makin konvergen ke policy optimal.";
      rebuildSteps();
      stepper.goto(0);
    }

    // ---- events ----
    function segHandler(container, fn) {
      container.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        Array.prototype.forEach.call(container.children, (c) =>
          c.classList.toggle("active", c === b)
        );
        fn(b.getAttribute("data-v"));
      });
    }
    segHandler(el.algo, (v) => {
      state.algo = v;
      rebuild();
    });
    segHandler(el.mode, (v) => {
      state.mode = v;
      rebuild();
    });
    el.alpha.addEventListener("input", () => {
      state.alpha = parseFloat(el.alpha.value);
      el.aOut.textContent = state.alpha;
      rebuild();
    });
    el.gamma.addEventListener("input", () => {
      state.gamma = parseFloat(el.gamma.value);
      el.gOut.textContent = state.gamma;
      rebuild();
    });
    el.eps.addEventListener("input", () => {
      state.epsilon = parseFloat(el.eps.value);
      el.eOut.textContent = state.epsilon;
      rebuild();
    });
    el.episodes.addEventListener("input", () => {
      state.episodes = Math.max(1, parseInt(el.episodes.value, 10) || 1);
      rebuild();
    });
    el.seed.addEventListener("input", () => {
      state.seed = parseInt(el.seed.value, 10) || 1;
      rebuild();
    });

    rebuild();
    return stepper;
  }

  MLSim.RL = { init };
})();
