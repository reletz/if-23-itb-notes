/* presets-loader.js — data preset (angka contoh dari catatan IF3270).
 * Dipakai sebagai .js (bukan fetch .json) supaya jalan di file:// maupun saat di-host. */
(function () {
  "use strict";
  const MLSim = (window.MLSim = window.MLSim || {});

  MLSim.presets = {
    // ---- RNN: contoh forward propagation dari slide (ABCC one-hot) ----
    // h(t1) ≈ [0.197, 0.245, 0.291] sesuai catatan
    rnn: {
      label: "Klasifikasi sekuens ABCC (catatan)",
      sequenceLabels: ["A", "B", "C", "C"],
      // one-hot dim 4: A,B,C,D
      inputs: [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
      hidden: 3,
      Wxh: [
        [0.1, 0.15, 0.2, 0.3],
        [0.15, 0.2, 0.3, 0.1],
        [0.2, 0.3, 0.1, 0.15],
      ],
      Whh: [
        [0.5, 0.5, 0.5],
        [0.5, 0.5, 0.5],
        [0.5, 0.5, 0.5],
      ],
      bh: [0.1, 0.1, 0.1],
      Why: [
        [0.1, 0.2, 0.3],
        [0.2, 0.3, 0.1],
        [0.3, 0.1, 0.2],
        [0.1, 0.1, 0.1],
      ],
      by: [0.1, 0.1, 0.1, 0.1],
      hiddenAct: "tanh",
      outAct: "softmax",
    },

    // ---- LSTM: default sederhana (input skalar, 2 hidden) ----
    lstm: {
      label: "LSTM mini (2 unit)",
      sequenceLabels: ["x1", "x2", "x3"],
      inputs: [[1], [2], [0.5]],
      hidden: 2,
      seed: 7,
    },

    // ---- Param-count contoh catatan: RNN=131, LSTM=491 ----
    paramCount: { input: 1, hidden: 10, output: 1 },

    // ---- Attention: contoh self-attention dot-product dari slide ----
    selfAttention: {
      label: "Self-attention dot-product (catatan)",
      tokens: ["x1", "x2", "x3"],
      // skor attention a[xi,xj] persis slide 17
      // baris i = query, kolom j = key
      attn: [
        [0.1, 0.5, 0.1],
        [0.3, 0.2, 0.2],
        [0.6, 0.3, 0.7],
      ],
      values: [
        [1, 0],
        [0, 1],
        [1, 1],
      ],
    },

    // ---- Attention RNN (Bahdanau/Luong) default ----
    attnRNN: {
      encStates: [
        [0.2, 0.4],
        [0.6, 0.1],
        [0.3, 0.5],
      ],
      decState: [0.5, 0.2],
      seed: 11,
    },

    // ---- RL gridworld: layout 2 baris × 3 kolom (sesuai contoh catatan) ----
    // tampilan:  baris atas (b=2):  (1,2) (2,2) (3,2=GOAL +10)
    //            baris bawah (b=1): (1,1) (2,1) (3,1=TRAP -10)
    rl: {
      rows: 2,
      cols: 3,
      start: { r: 1, c: 0 },
      goal: { r: 0, c: 2, reward: 10 },
      trap: { r: 1, c: 2, reward: -10 },
      walls: [],
      alpha: 0.5,
      gamma: 0.9,
      epsilon: 0.1,
      stepReward: 0,
      // sel diberi label gaya catatan (a,b): a=kolom+1, b=2 utk baris atas, 1 utk bawah
      cellLabel: function (r, c) {
        const a = c + 1;
        const b = r === 0 ? 2 : 1;
        return "(" + a + "," + b + ")";
      },
      // tiga episode contoh catatan (urutan aksi dari start)
      scriptedEpisodes: [
        ["up", "right", "right"], // (1,1)->(1,2)->(2,2)->(3,2) goal
        ["right", "right"], // (1,1)->(2,1)->(3,1) trap
        ["right", "up", "right"], // (1,1)->(2,1)->(2,2)->(3,2) goal
      ],
    },
  };
})();
