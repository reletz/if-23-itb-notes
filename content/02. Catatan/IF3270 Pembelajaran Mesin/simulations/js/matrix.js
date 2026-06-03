/* matrix.js — vektor/matriks + fungsi aktivasi + util angka.
 * Menempel ke window.MLSim.mat (classic script, tanpa modul). */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});

  // ---- format angka ----
  function fmt(x, d) {
    if (d === undefined) d = 3;
    if (typeof x !== "number" || !isFinite(x)) return String(x);
    if (Math.abs(x) < 1e-12) x = 0;
    let s = x.toFixed(d);
    // buang nol di belakang tapi sisakan minimal 0
    if (s.indexOf(".") >= 0) s = s.replace(/0+$/, "").replace(/\.$/, "");
    return s === "-0" ? "0" : s;
  }
  function fmtVec(v, d) {
    return "[" + v.map((x) => fmt(x, d)).join(", ") + "]";
  }

  // ---- operasi dasar ----
  function zeros(n) {
    return new Array(n).fill(0);
  }
  function zerosMat(r, c) {
    return Array.from({ length: r }, () => zeros(c));
  }
  function dot(a, b) {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += a[i] * b[i];
    return s;
  }
  // W (r×c) · x (c) -> (r)
  function matVec(W, x) {
    return W.map((row) => dot(row, x));
  }
  // A (r×k) · B (k×c) -> (r×c)
  function matMul(A, B) {
    const r = A.length,
      k = B.length,
      c = B[0].length;
    const out = zerosMat(r, c);
    for (let i = 0; i < r; i++)
      for (let j = 0; j < c; j++) {
        let s = 0;
        for (let t = 0; t < k; t++) s += A[i][t] * B[t][j];
        out[i][j] = s;
      }
    return out;
  }
  function transpose(A) {
    const r = A.length,
      c = A[0].length;
    const out = zerosMat(c, r);
    for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) out[j][i] = A[i][j];
    return out;
  }
  function vecAdd() {
    const vs = Array.prototype.slice.call(arguments);
    const n = vs[0].length;
    const out = zeros(n);
    for (let i = 0; i < n; i++) for (const v of vs) out[i] += v[i];
    return out;
  }
  function vecSub(a, b) {
    return a.map((x, i) => x - b[i]);
  }
  function hadamard(a, b) {
    return a.map((x, i) => x * b[i]);
  }
  function scale(v, s) {
    return v.map((x) => x * s);
  }

  // ---- aktivasi ----
  function tanh(v) {
    return v.map((x) => Math.tanh(x));
  }
  function sigmoid(v) {
    return v.map((x) => 1 / (1 + Math.exp(-x)));
  }
  function relu(v) {
    return v.map((x) => Math.max(0, x));
  }
  function linear(v) {
    return v.slice();
  }
  function softmax(v) {
    const m = Math.max.apply(null, v);
    const ex = v.map((x) => Math.exp(x - m));
    const s = ex.reduce((a, b) => a + b, 0);
    return ex.map((x) => x / s);
  }
  // softmax versi mengembalikan exp mentah (utk panel rumus yg meniru slide)
  function expVec(v) {
    return v.map((x) => Math.exp(x));
  }
  function applyActivation(name, v) {
    switch (name) {
      case "tanh":
        return tanh(v);
      case "sigmoid":
        return sigmoid(v);
      case "relu":
        return relu(v);
      case "softmax":
        return softmax(v);
      case "linear":
      default:
        return linear(v);
    }
  }

  // ---- RNG berseed (mulberry32) ----
  function makeRNG(seed) {
    let a = (seed >>> 0) || 1;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  // matriks acak nilai [-range, range], 2 desimal supaya enak dilihat
  function randMat(r, c, seed, range) {
    range = range || 0.5;
    const rng = makeRNG(seed);
    return Array.from({ length: r }, () =>
      Array.from({ length: c }, () => Math.round((rng() * 2 - 1) * range * 100) / 100)
    );
  }
  function randVec(n, seed, range) {
    return randMat(1, n, seed, range)[0];
  }

  MLSim.mat = {
    fmt,
    fmtVec,
    zeros,
    zerosMat,
    dot,
    matVec,
    matMul,
    transpose,
    vecAdd,
    vecSub,
    hadamard,
    scale,
    tanh,
    sigmoid,
    relu,
    linear,
    softmax,
    expVec,
    applyActivation,
    makeRNG,
    randMat,
    randVec,
  };
})();
