/* rl.js — gridworld: robot navigasi dengan SARSA / Q-Learning. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});
  const M = MLSim.mat;
  const ACTIONS = ["up", "down", "left", "right"];
  const DELTA = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
  const ARROW = { up: "↑", down: "↓", left: "←", right: "→" };

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

  function init(root) {
    const P = MLSim.presets.rl;
    let state = {
      algo: "sarsa",
      mode: "catatan",
      alpha: P.alpha,
      gamma: P.gamma,
      epsilon: P.epsilon,
      episodes: 8,
      seed: 3,
    };
    let cfg = P;
    let steps = [];

    root.innerHTML =
      '<div class="sim-layout">' +
      '  <div class="col-controls">' +
      '    <div class="panel">' +
      "      <h3>Algoritma & Mode</h3>" +
      '      <div class="field"><label>Algoritma</label><div class="seg" id="rl-algo">' +
      '        <button data-v="sarsa" class="active">SARSA (on-policy)</button>' +
      '        <button data-v="qlearning">Q-Learning (off)</button></div></div>' +
      '      <div class="field"><label>Mode</label><div class="seg" id="rl-mode">' +
      '        <button data-v="catatan" class="active">Contoh catatan</button>' +
      '        <button data-v="free">ε-greedy</button></div></div>' +
      '      <div class="field"><label>α (learning rate): <span id="rl-a-out">0.5</span></label>' +
      '        <div class="range-row"><input type="range" id="rl-alpha" min="0.1" max="1" step="0.1" value="0.5"/></div></div>' +
      '      <div class="field"><label>γ (discount): <span id="rl-g-out">0.9</span></label>' +
      '        <div class="range-row"><input type="range" id="rl-gamma" min="0" max="0.99" step="0.05" value="0.9"/></div></div>' +
      '      <div class="field" id="rl-eps-field" style="display:none"><label>ε (eksplorasi): <span id="rl-e-out">0.1</span></label>' +
      '        <div class="range-row"><input type="range" id="rl-eps" min="0" max="1" step="0.05" value="0.1"/></div></div>' +
      '      <div class="field" id="rl-ep-field" style="display:none"><label>Jumlah episode</label><input type="number" id="rl-episodes" value="8" min="1" max="40"/></div>' +
      '      <div class="field" id="rl-seed-field" style="display:none"><label>Seed</label><input type="number" id="rl-seed" value="3" min="1" max="9999"/></div>' +
      '      <div class="note" id="rl-note"></div>' +
      "    </div>" +
      "  </div>" +
      '  <div class="col-main">' +
      '    <div class="stepper" id="rl-stepper"></div>' +
      '    <div class="panel formula-panel">' +
      '      <div class="step-title" id="rl-step-title">—</div>' +
      '      <div class="step-desc" id="rl-step-desc"></div>' +
      '      <div id="rl-formula"></div>' +
      "    </div>" +
      '    <div class="panel"><h3>Gridworld</h3><div id="rl-grid"></div>' +
      '      <div class="legend">' +
      '        <span><span class="sw" style="background:rgba(46,125,50,0.3)"></span>Goal (+10)</span>' +
      '        <span><span class="sw" style="background:rgba(198,40,40,0.3)"></span>Trap (−10)</span>' +
      "        <span>🤖 posisi agen</span><span>↑↓←→ Q per aksi (biru = terbaik)</span>" +
      "      </div></div>" +
      "  </div>" +
      "</div>";

    const el = {
      algo: root.querySelector("#rl-algo"),
      mode: root.querySelector("#rl-mode"),
      alpha: root.querySelector("#rl-alpha"),
      aOut: root.querySelector("#rl-a-out"),
      gamma: root.querySelector("#rl-gamma"),
      gOut: root.querySelector("#rl-g-out"),
      epsField: root.querySelector("#rl-eps-field"),
      eps: root.querySelector("#rl-eps"),
      eOut: root.querySelector("#rl-e-out"),
      epField: root.querySelector("#rl-ep-field"),
      episodes: root.querySelector("#rl-episodes"),
      seedField: root.querySelector("#rl-seed-field"),
      seed: root.querySelector("#rl-seed"),
      note: root.querySelector("#rl-note"),
      stepTitle: root.querySelector("#rl-step-title"),
      stepDesc: root.querySelector("#rl-step-desc"),
      formula: root.querySelector("#rl-formula"),
      grid: root.querySelector("#rl-grid"),
    };

    // ---- helper grid ----
    function isGoal(r, c) {
      return r === cfg.goal.r && c === cfg.goal.c;
    }
    function isTrap(r, c) {
      return r === cfg.trap.r && c === cfg.trap.c;
    }
    function isWall(r, c) {
      return cfg.walls.some((w) => w.r === r && w.c === c);
    }
    function inBounds(r, c) {
      return r >= 0 && r < cfg.rows && c >= 0 && c < cfg.cols;
    }
    function move(r, c, a) {
      const d = DELTA[a];
      const nr = r + d[0],
        nc = c + d[1];
      if (!inBounds(nr, nc) || isWall(nr, nc)) return [r, c]; // tetap
      return [nr, nc];
    }
    function reward(r, c) {
      if (isGoal(r, c)) return cfg.goal.reward;
      if (isTrap(r, c)) return cfg.trap.reward;
      return cfg.stepReward;
    }
    function newQ() {
      const Q = {};
      for (let r = 0; r < cfg.rows; r++)
        for (let c = 0; c < cfg.cols; c++) Q[key(r, c)] = { up: 0, down: 0, left: 0, right: 0 };
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
      return bv === 0 && q.up === 0 && q.down === 0 && q.left === 0 && q.right === 0
        ? null
        : best;
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
            "Q(" +
            cfg.cellLabel(s[0], s[1]) +
            "," +
            act +
            ") = " +
            M.fmt(old) +
            " + " +
            M.fmt(a) +
            "(" +
            M.fmt(r) +
            " + " +
            M.fmt(g) +
            "\\cdot " +
            M.fmt(qn) +
            " - " +
            M.fmt(old) +
            ")";
        } else {
          const qn = terminal ? 0 : maxQ(Q, sp[0], sp[1]);
          target = r + g * qn;
          ruleLatex = "Q(s,a) \\leftarrow Q(s,a) + \\alpha[R + \\gamma \\max_{a'} Q(s',a') - Q(s,a)]";
          targetLatex =
            "Q(" +
            cfg.cellLabel(s[0], s[1]) +
            "," +
            act +
            ") = " +
            M.fmt(old) +
            " + " +
            M.fmt(a) +
            "(" +
            M.fmt(r) +
            " + " +
            M.fmt(g) +
            "\\cdot " +
            M.fmt(qn) +
            " - " +
            M.fmt(old) +
            ")";
        }
        const nv = old + a * (target - old);
        Q[key(s[0], s[1])][act] = nv;
        out.push({
          title:
            "Episode " +
            (epIdx + 1) +
            " · langkah " +
            (kIdx + 1) +
            " : " +
            cfg.cellLabel(s[0], s[1]) +
            " " +
            ARROW[act] +
            " " +
            cfg.cellLabel(sp[0], sp[1]),
          desc:
            (state.algo === "sarsa" ? "SARSA" : "Q-Learning") +
            " — perbarui nilai Q untuk aksi yang diambil. R = " +
            M.fmt(r) +
            (terminal ? " (state terminal)." : "."),
          latex: [
            ["Aturan", ruleLatex],
            ["Substitusi", targetLatex + " = " + M.fmt(nv)],
          ],
          snap: {
            Q: cloneQ(Q),
            s: s.slice(),
            sp: sp.slice(),
            act,
            terminal,
          },
        });
      }

      if (state.mode === "catatan") {
        cfg.scriptedEpisodes.forEach((acts, epIdx) => {
          let cur = [cfg.start.r, cfg.start.c];
          for (let k = 0; k < acts.length; k++) {
            const act = acts[k];
            const sp = move(cur[0], cur[1], act);
            const r = reward(sp[0], sp[1]);
            const terminal = isGoal(sp[0], sp[1]) || isTrap(sp[0], sp[1]);
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
        const maxSteps = 40;
        for (let epIdx = 0; epIdx < state.episodes; epIdx++) {
          let cur = [cfg.start.r, cfg.start.c];
          let act = epsGreedy(cur[0], cur[1]);
          let k = 0;
          while (k < maxSteps) {
            const sp = move(cur[0], cur[1], act);
            const r = reward(sp[0], sp[1]);
            const terminal = isGoal(sp[0], sp[1]) || isTrap(sp[0], sp[1]);
            const aNext = terminal ? null : epsGreedy(sp[0], sp[1]);
            applyUpdate(cur, act, r, sp, terminal, aNext, epIdx, k);
            if (terminal) break;
            cur = sp;
            act = state.algo === "sarsa" ? aNext : null; // q-learning pilih ulang di awal loop
            if (state.algo === "qlearning") act = epsGreedy(cur[0], cur[1]);
            k++;
          }
        }
      }
      return out;
    }

    function rebuildSteps() {
      steps = generate();
    }

    // ---- render ----
    function renderStep(i, step) {
      if (!step) {
        el.stepTitle.textContent = "—";
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
      // rentang V untuk heat
      let vmin = Infinity,
        vmax = -Infinity;
      for (let r = 0; r < cfg.rows; r++)
        for (let c = 0; c < cfg.cols; c++) {
          const v = maxQ(Q, r, c);
          if (v < vmin) vmin = v;
          if (v > vmax) vmax = v;
        }
      const span = vmax - vmin || 1;

      let html =
        '<div class="grid-wrap"><div class="grid" style="grid-template-columns:repeat(' +
        cfg.cols +
        ",96px)\">";
      for (let r = 0; r < cfg.rows; r++) {
        for (let c = 0; c < cfg.cols; c++) {
          const q = Q[key(r, c)];
          const goal = isGoal(r, c),
            trap = isTrap(r, c),
            wall = isWall(r, c);
          const cls = ["gcell"];
          if (goal) cls.push("goal");
          if (trap) cls.push("trap");
          if (wall) cls.push("wall");
          if (snap && snap.s[0] === r && snap.s[1] === c) cls.push("curr");
          if (snap && snap.sp[0] === r && snap.sp[1] === c) cls.push("next");
          // heat hijau utk V positif, merah utk negatif
          let bg = "";
          if (!goal && !trap && !wall) {
            const v = maxQ(Q, r, c);
            if (v > 0) bg = "background:rgba(46,125,50," + (0.08 + (v / (vmax || 1)) * 0.35).toFixed(2) + ")";
            else if (v < 0)
              bg = "background:rgba(198,40,40," + (0.08 + (v / (vmin || -1)) * 0.35).toFixed(2) + ")";
          }
          const best = bestAction(Q, r, c);
          let inner = "";
          if (!wall) {
            ACTIONS.forEach((act) => {
              const isBest = best === act && !goal && !trap;
              inner +=
                '<span class="q ' +
                act +
                (isBest ? " best" : "") +
                '">' +
                ARROW[act] +
                M.fmt(q[act], 1) +
                "</span>";
            });
          }
          let center = "";
          if (goal) center = '<span class="policy">🏁</span>';
          else if (trap) center = '<span class="policy">💀</span>';
          else if (best) center = '<span class="policy">' + ARROW[best] + "</span>";
          const robot =
            snap && snap.sp[0] === r && snap.sp[1] === c ? '<span class="robot">🤖</span>' : "";
          html +=
            '<div class="' +
            cls.join(" ") +
            '" style="' +
            bg +
            '">' +
            inner +
            center +
            robot +
            '<span class="vlabel">' +
            cfg.cellLabel(r, c) +
            "</span></div>";
        }
      }
      html += "</div></div>";
      el.grid.innerHTML = html;
    }

    // ---- stepper ----
    const stepper = MLSim.makeStepper({
      controlsEl: root.querySelector("#rl-stepper"),
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
          ? "Mode contoh catatan memutar ulang 3 episode dari slide. Dengan α=0.5, γ=0.9 hasil akhir: Q(2,2→) = 7.5, Q(2,1↑) = 2.25, Q(2,1→) = −5."
          : "Mode ε-greedy: agen menjelajah sendiri. Naikkan jumlah episode agar nilai Q makin konvergen ke policy optimal.";
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
    return { refreshFormula: () => stepper.fire() };
  }

  MLSim.RL = { init };
})();
