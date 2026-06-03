/* app.js — orkestrasi: tab, tema, inisialisasi tiga simulator. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});

  function qs(s, r) {
    return (r || document).querySelector(s);
  }
  function qsa(s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  }

  // ---- tab ----
  function setupTabs() {
    qsa(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const name = tab.getAttribute("data-tab");
        qsa(".tab").forEach((t) => t.classList.toggle("active", t === tab));
        qsa(".tab-panel").forEach((p) =>
          p.classList.toggle("active", p.id === "tab-" + name)
        );
      });
    });
  }

  // ---- tema ----
  function setupTheme() {
    const btn = qs("#theme-toggle");
    const saved = (function () {
      try {
        return localStorage.getItem("mlsim-theme");
      } catch (e) {
        return null;
      }
    })();
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    let theme = saved || (prefersDark ? "dark" : "light");
    apply(theme);
    btn.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      apply(theme);
      try {
        localStorage.setItem("mlsim-theme", theme);
      } catch (e) {}
    });
    function apply(t) {
      document.documentElement.setAttribute("data-theme", t);
      btn.textContent = t === "dark" ? "☀️" : "🌙";
    }
  }

  // ---- status KaTeX (re-render bila KaTeX baru selesai load) ----
  function setupKatexStatus(onReady) {
    const el = qs("#katex-status");
    function check(attempt) {
      if (MLSim.math.hasKatex()) {
        el.textContent = "✓ KaTeX aktif";
        if (onReady) onReady();
      } else if (window.__KATEX_FAILED || attempt > 20) {
        el.textContent = "⚠ Mode offline: rumus dirender tanpa KaTeX";
      } else {
        setTimeout(() => check(attempt + 1), 150);
      }
    }
    check(0);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupTabs();
    setupTheme();

    const sims = [];
    if (MLSim.RNN) sims.push(MLSim.RNN.init(qs("#rnn-root")));
    if (MLSim.Attention) sims.push(MLSim.Attention.init(qs("#attention-root")));
    if (MLSim.RL) sims.push(MLSim.RL.init(qs("#rl-root")));

    // bila KaTeX selesai load setelah render awal, minta tiap sim render ulang rumus
    setupKatexStatus(() => {
      sims.forEach((s) => s && s.refreshFormula && s.refreshFormula());
    });
  });
})();
