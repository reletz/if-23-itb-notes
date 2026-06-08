"""gen_packet — per-packet answer-key computer for one IF3270 exam packet.

This is a TEMPLATE. For each packet the skill generates, edit the PARAM blocks
below (the concrete weights / inputs / architecture chosen for that packet),
then run:

    python3 scripts/gen_packet.py

It prints a structured, per-Bagian, per-sub-question trace. EVERY number that
appears in the answer key (Pembahasan) must come from this output — never
hand-arithmetic. The compute logic lives in mlcompute.py and is fixed; you only
change the parameters here.

The example below is a complete, runnable 3-Bagian packet
(Bagian I = CNN nested, Bagian II = RNN bertingkat, Bagian III = LSTM) so you
have a working pattern to copy. Replace per packet.
"""

from __future__ import annotations

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import mlcompute as ml  # noqa: E402

R = 4  # rounding digits for this packet (matches the "n desimal" instruction)


def hr(title: str) -> None:
    print("\n" + "=" * 70)
    print(title)
    print("=" * 70)


# ========================================================================== #
# BAGIAN I — CNN (nested computation: conv -> ReLU -> maxpool -> flatten)     #
# ========================================================================== #
def bagian1_cnn():
    hr("BAGIAN I — CNN forward propagation")

    # --- PARAM BLOCK (edit per packet) ---
    x = [[1, 0, 1],
         [0, 1, 1],
         [1, 0, 0]]                 # input 3x3x1
    kernel = [[1, 0],
              [0, -1]]              # L1 single 2x2 kernel
    bias = 0.5
    stride, padding = 1, 0
    pool_size, pool_stride = 2, 1
    # --- end PARAM BLOCK ---

    print(f"input 3x3, kernel 2x2 bias={bias}, stride={stride}, pad={padding}")
    conv, steps = ml.conv2d(x, kernel, bias=bias, stride=stride,
                            padding=padding, trace=True)
    print("\n[conv] explicit sums per receptive field:")
    for s in steps:
        print(s)
    print("conv feature map:", [[ml.fmt(v, R) for v in row] for row in conv])

    det = ml.apply_relu(conv)
    print("[detector ReLU]:", [[ml.fmt(v, R) for v in row] for row in det])

    pool = ml.maxpool(det, size=pool_size, stride=pool_stride)
    print(f"[maxpool {pool_size}x{pool_size} s{pool_stride}]:",
          [[ml.fmt(v, R) for v in row] for row in pool])

    flat = ml.flatten([pool])
    print("flatten:", [ml.fmt(v, R) for v in flat])

    n_params = ml.count_params_conv_layer(1, 2, 2, 1)
    print(f"# trainable params (L1 conv): 1*(2*2*1+1) = {n_params}")
    return flat


# ========================================================================== #
# BAGIAN II — RNN (bertingkat: per-timestep h_t then output)                 #
# ========================================================================== #
def bagian2_rnn():
    hr("BAGIAN II — RNN forward propagation (many-to-many)")

    # --- PARAM BLOCK (edit per packet) ---
    Wxh = [[0.1, 0.2], [0.3, 0.1], [0.2, 0.2]]   # 2 inputs -> 3 hidden (row = neuron)
    Whh = [[0.2, 0.3, 0.2], [0.1, 0.2, 0.1], [0.2, 0.1, 0.3]]
    bxh = [0.1, 0.0, 0.1]
    Why = [[0.3, 0.2, 0.1], [0.1, 0.2, 0.3]]     # 3 hidden -> 2 outputs
    bhy = [0.3, 0.1]
    h0 = [0.0, 0.0, 0.0]
    xs = [[0.4, 0.2], [0.7, 0.8]]                # 2 timesteps
    out_act = "softmax"
    # --- end PARAM BLOCK ---

    res = ml.rnn_forward(xs, Wxh, Whh, bxh, Why, bhy, h0, out_act=out_act)
    for t, (h, y) in enumerate(zip(res["hs"], res["ys"]), start=1):
        print(f"t={t}: h = {[ml.fmt(v, R) for v in h]}  "
              f"y = {[ml.fmt(v, R) for v in y]}  "
              f"pred class = {y.index(max(y))}")

    n_in, n_h, n_out = 2, 3, 2
    print(f"# params = (2+3+1)*3 + (3+1)*2 = {ml.count_params_rnn(n_in, n_h, n_out)}")
    return res


# ========================================================================== #
# BAGIAN III — LSTM (gate-by-gate single step)                               #
# ========================================================================== #
def bagian3_lstm():
    hr("BAGIAN III — LSTM single timestep")

    # --- PARAM BLOCK (edit per packet) ---
    W = {"Wxf": [0.7, 0.5], "Wxi": [0.9, 0.8], "Wxc": [0.4, 0.2], "Wxo": [0.6, 0.4],
         "Whf": [0.1], "Whi": [0.6], "Whc": [0.1], "Who": [0.2]}
    b = {"bf": 0.15, "bi": 0.4, "bc": 0.1, "bo": 0.2}
    x1 = [1, 2]
    h0, c0 = [0.0], [0.0]
    # --- end PARAM BLOCK ---

    r = ml.lstm_step(x1, h0, c0, W, b)
    for k in ["f", "i", "c_tilde", "o", "c", "h"]:
        print(f"{k:8s} = {ml.fmt(r[k], R)}")

    print(f"# params (1 hidden unit, 2 inputs) = 4*((2+1+1)*1) = "
          f"{ml.count_params_lstm(2, 1)}")
    return r


# ========================================================================== #
# BAGIAN (UAS) — LSTM BPTT: forward + 1 backward pass + weight update          #
# ========================================================================== #
def bagian_lstm_bptt():
    hr("BAGIAN (UAS) — LSTM forward + BPTT backward")

    # --- PARAM BLOCK (edit per packet). Wx* = input→gate (per feature),
    #     Wh* = recurrent hidden→gate (scalar). Target is on the hidden unit. ---
    W = {"Wxf": [0.7, 0.5], "Wxi": [0.9, 0.8], "Wxc": [0.4, 0.2], "Wxo": [0.6, 0.4],
         "Whf": [0.1], "Whi": [0.6], "Whc": [0.1], "Who": [0.2]}
    b = {"bf": 0.15, "bi": 0.4, "bc": 0.1, "bo": 0.2}
    xs = [[1.0, 2.0], [0.5, 3.0]]      # 2 timesteps, 2 features
    targets = [0.5, 0.75]              # target h(t) per timestep
    lr = 0.5
    # --- end PARAM BLOCK ---

    out = ml.lstm_bptt(xs, targets, W, b, lr)
    for t, st in enumerate(out["cache"], start=1):
        print(f"t={t}: f={ml.fmt(st['f'],R)} i={ml.fmt(st['i'],R)} "
              f"Ĉ={ml.fmt(st['ctil'],R)} o={ml.fmt(st['o'],R)} "
              f"C={ml.fmt(st['C'],R)} h={ml.fmt(st['h'],R)}")
    print("error total (½Σ(h-target)²) =", ml.fmt(out["loss"], R))
    print("gradients:", {k: [ml.fmt(v, R) for v in out["grads"][k]] for k in out["grads"]})
    print("grad bias:", {k: ml.fmt(out["gb"][k], R) for k in out["gb"]})
    print("updated Wx*/Wh*:", {k: [ml.fmt(v, R) for v in out["newW"][k]] for k in out["newW"]})
    print("updated bias:", {k: ml.fmt(out["newb"][k], R) for k in out["newb"]})
    return out


# ========================================================================== #
# BAGIAN (UAS) — Reinforcement Learning: TD Q-learning on a gridworld          #
# ========================================================================== #
def bagian_rl():
    hr("BAGIAN (UAS) — Temporal-Difference Q-learning (Wumpus World)")

    # --- PARAM BLOCK (edit per packet). State = (col, row). ---
    reward = {(3, 2): 10.0, (3, 1): -10.0, (1, 3): -10.0}   # reward for ENTERING
    terminals = {(3, 2), (3, 1), (1, 3)}
    episodes = [[(1, 1), (2, 1), (3, 1)],
                [(1, 1), (1, 2), (2, 2), (3, 2)],
                [(1, 1), (1, 2), (1, 3)]]
    alpha, gamma = 0.4, 0.6
    # --- end PARAM BLOCK ---

    res = ml.q_learning_td(episodes, reward, terminals, alpha, gamma)
    for s in res["steps"]:
        print(f"ep{s['episode']} {s['s']}-{s['a']}->{s['s_next']}: "
              f"r={s['r']}, maxQ'={ml.fmt(s['max_next'],R)}, "
              f"Q: {ml.fmt(s['old'],R)} -> {ml.fmt(s['new'],R)}")
    print("final non-zero Q(s,a):",
          {f"{k[0]},{k[1]}": ml.fmt(v, R) for k, v in res["Q"].items() if v != 0})
    return res


if __name__ == "__main__":
    flat = bagian1_cnn()
    rnn = bagian2_rnn()
    lstm = bagian3_lstm()
    bptt = bagian_lstm_bptt()
    rl = bagian_rl()
    hr("DONE — copy the numbers above into the Pembahasan file")
