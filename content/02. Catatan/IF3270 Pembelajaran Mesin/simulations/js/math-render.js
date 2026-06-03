/* math-render.js — render rumus LaTeX.
 * Pakai KaTeX bila tersedia (CDN). Bila offline / gagal load,
 * fallback ke konverter LaTeX→HTML buatan sendiri (subset). */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});

  const GREEK = {
    "\\alpha": "α", "\\beta": "β", "\\gamma": "γ", "\\delta": "δ",
    "\\epsilon": "ε", "\\zeta": "ζ", "\\eta": "η", "\\theta": "θ",
    "\\lambda": "λ", "\\mu": "μ", "\\pi": "π", "\\sigma": "σ",
    "\\tau": "τ", "\\phi": "φ", "\\psi": "ψ", "\\omega": "ω",
    "\\Sigma": "Σ", "\\Delta": "Δ",
  };
  const OPS = {
    "\\cdot": "·", "\\times": "×", "\\odot": "⊙", "\\oplus": "⊕",
    "\\approx": "≈", "\\leftarrow": "←", "\\rightarrow": "→",
    "\\Rightarrow": "⇒", "\\ge": "≥", "\\geq": "≥", "\\le": "≤",
    "\\leq": "≤", "\\neq": "≠", "\\pm": "±", "\\in": "∈", "\\max": "max",
    "\\min": "min", "\\exp": "exp", "\\tanh": "tanh", "\\ln": "ln",
    "\\log": "log", "\\softmax": "softmax", "\\sum": "Σ", "\\mathbb{R}": "ℝ",
  };
  const ACCENT = { "\\hat": "̂", "\\tilde": "̃", "\\bar": "̄" };

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function latexToHtml(src) {
    let s = " " + src + " ";
    // \text{...} dan \mathrm{...} -> isi apa adanya
    s = repl(s, /\\(?:text|mathrm|operatorname)\{([^{}]*)\}/g, (m, a) => a);
    // \sqrt{a} (sebelum \frac, supaya argumen frac bebas-kurung)
    s = loop(s, /\\sqrt\{([^{}]*)\}/g, (m, a) => "√<span class=\"msqrt\">" + a + "</span>");
    // aksen \hat{x} \tilde{x} \bar{x}
    s = loop(s, /\\(hat|tilde|bar)\{([^{}]*)\}/g, (m, k, a) => a + ACCENT["\\" + k]);
    // \frac{a}{b}
    s = loop(s, /\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (m, a, b) =>
      '<span class="mfrac"><span class="mnum">' + a + '</span><span class="mden">' + b + "</span></span>"
    );
    // operator & yunani
    for (const k in OPS) s = s.split(k).join(OPS[k]);
    for (const k in GREEK) s = s.split(k).join(GREEK[k]);
    // superscript / subscript dengan kurung
    s = loop(s, /\^\{([^{}]*)\}/g, (m, a) => "<sup>" + a + "</sup>");
    s = loop(s, /_\{([^{}]*)\}/g, (m, a) => "<sub>" + a + "</sub>");
    // satu karakter
    s = s.replace(/\^(\\?[A-Za-z0-9])/g, (m, a) => "<sup>" + a + "</sup>");
    s = s.replace(/_(\\?[A-Za-z0-9])/g, (m, a) => "<sub>" + a + "</sub>");
    // pembersihan — penting: hapus command sebelum kurung agar \cmd tidak
    // menyatu dengan huruf berikutnya saat kurung dibuang
    s = s.replace(/\\left|\\right/g, "");
    s = s.replace(/\\,|\\;|\\:|\\ /g, " ").replace(/\\!/g, "");
    s = s.replace(/\\\\/g, "<br/>");
    s = s.replace(/\\[a-zA-Z]+/g, ""); // sisa command tak dikenal
    s = s.replace(/[{}]/g, "");
    return '<span class="mfallback">' + s.trim() + "</span>";
  }

  // apply regex sekali
  function repl(s, re, fn) {
    return s.replace(re, fn);
  }
  // apply regex berulang sampai tidak ada match (utk nested innermost-first)
  function loop(s, re, fn) {
    let prev;
    do {
      prev = s;
      s = s.replace(re, fn);
    } while (s !== prev);
    return s;
  }

  function hasKatex() {
    return typeof window.katex !== "undefined" && window.katex && window.katex.renderToString;
  }

  function render(el, latex, displayMode) {
    if (!el) return;
    if (hasKatex()) {
      try {
        el.innerHTML = window.katex.renderToString(latex, {
          displayMode: !!displayMode,
          throwOnError: false,
          output: "html",
        });
        el.classList.remove("fallback-math");
        return;
      } catch (e) {
        /* jatuh ke fallback */
      }
    }
    el.innerHTML = latexToHtml(latex);
    el.classList.add("fallback-math");
  }

  // render ke string (utk disisipkan dalam HTML lain)
  function toString(latex, displayMode) {
    if (hasKatex()) {
      try {
        return window.katex.renderToString(latex, {
          displayMode: !!displayMode,
          throwOnError: false,
          output: "html",
        });
      } catch (e) {}
    }
    return latexToHtml(latex);
  }

  MLSim.math = { render, toString, latexToHtml, hasKatex };
})();
