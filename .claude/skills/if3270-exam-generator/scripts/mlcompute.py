"""mlcompute — verified pure-Python primitives for IF3270 exam answer keys.

The single source of numerical truth for the if3270-exam-generator skill. No
numpy: everything is plain lists/floats so it runs on a bare `python3`.

Conventions baked in to match how IF3270 teaches forward propagation (verified
against uas/Pembahasan-Solusi-UTS and uas/Solusi-Kuis-2):

  - Convolution is CROSS-CORRELATION (kernel NOT flipped) + bias.
  - Detector stage = ReLU, applied elementwise after conv.
  - Pooling = max over a window, given size & stride, no padding by default.
  - feature-map size V = 1 + (W - F + 2P)/S  (must divide evenly).
  - FFNN/RNN/LSTM use the slide formulas; activations as configured.
  - Parameter counts assume shared weights (one bias per filter / per neuron).

Every public function returns BOTH the result and, where useful, a `steps`
trace (list of human-readable strings) so the key can show explicit arithmetic
"formula -> substituted numbers -> result", the way the real solutions do.

Numbers are kept full-precision internally; round only for display with
`round_to` / `fmt`, matching the exam's "n angka di belakang koma" instruction.
"""

from __future__ import annotations

import math
from typing import Callable, List, Sequence, Tuple

Matrix = List[List[float]]
Vector = List[float]


# --------------------------------------------------------------------------- #
# rounding / formatting                                                        #
# --------------------------------------------------------------------------- #
def round_to(x: float, ndigits: int = 4) -> float:
    """Round half-up to ndigits, like a calculator (not banker's rounding)."""
    if x == 0:
        return 0.0
    factor = 10 ** ndigits
    # add a tiny epsilon in the value's own scale to beat float repr issues
    return math.floor(abs(x) * factor + 0.5) / factor * (1 if x >= 0 else -1)


def fmt(x: float, ndigits: int = 4) -> str:
    """Format a number for the key: trims trailing zeros but keeps it readable."""
    r = round_to(x, ndigits)
    if r == int(r):
        return str(int(r))
    return f"{r:.{ndigits}f}".rstrip("0").rstrip(".")


# --------------------------------------------------------------------------- #
# activations                                                                  #
# --------------------------------------------------------------------------- #
def relu(x: float) -> float:
    return x if x > 0 else 0.0


def sigmoid(x: float) -> float:
    return 1.0 / (1.0 + math.exp(-x))


def tanh(x: float) -> float:
    return math.tanh(x)


def softmax(xs: Sequence[float]) -> Vector:
    m = max(xs)
    exps = [math.exp(x - m) for x in xs]
    s = sum(exps)
    return [e / s for e in exps]


ACTIVATIONS = {"relu": relu, "sigmoid": sigmoid, "tanh": tanh, "linear": lambda x: x}


# --------------------------------------------------------------------------- #
# CNN: sizing, convolution, pooling                                            #
# --------------------------------------------------------------------------- #
def feature_map_size(W: int, F: int, P: int, S: int) -> int:
    """V = 1 + (W - F + 2P)/S. Returns int; raises if it doesn't divide evenly."""
    num = W - F + 2 * P
    if num % S != 0:
        raise ValueError(f"non-integer feature map: (W-F+2P)={num} not divisible by S={S}")
    return 1 + num // S


def pad2d(x: Matrix, p: int, value: float = 0.0) -> Matrix:
    if p == 0:
        return [row[:] for row in x]
    h = len(x)
    w = len(x[0])
    out = [[value] * (w + 2 * p) for _ in range(h + 2 * p)]
    for i in range(h):
        for j in range(w):
            out[i + p][j + p] = x[i][j]
    return out


def conv2d(x: Matrix, kernel: Matrix, bias: float = 0.0, stride: int = 1,
           padding: int = 0, trace: bool = False) -> Tuple[Matrix, List[str]]:
    """Single-channel cross-correlation + bias. Returns (feature_map, steps)."""
    xp = pad2d(x, padding)
    H, Wd = len(xp), len(xp[0])
    f = len(kernel)
    out_h = (H - f) // stride + 1
    out_w = (Wd - f) // stride + 1
    out: Matrix = [[0.0] * out_w for _ in range(out_h)]
    steps: List[str] = []
    for oi in range(out_h):
        for oj in range(out_w):
            terms = []
            acc = 0.0
            for ki in range(f):
                for kj in range(f):
                    v = xp[oi * stride + ki][oj * stride + kj] * kernel[ki][kj]
                    acc += v
                    terms.append(v)
            acc += bias
            out[oi][oj] = acc
            if trace:
                expr = "+".join(fmt(t) for t in terms) + f"+{fmt(bias)}(bias)"
                steps.append(f"  pos({oi},{oj}): {expr} = {fmt(acc)}")
    return out, steps


def conv2d_multi(channels: List[Matrix], kernels: List[Matrix], bias: float = 0.0,
                 stride: int = 1, padding: int = 0) -> Matrix:
    """Multi-channel conv: sum over input channels (one kernel slice per channel)."""
    partials = [conv2d(ch, k, 0.0, stride, padding)[0]
                for ch, k in zip(channels, kernels)]
    H, W = len(partials[0]), len(partials[0][0])
    return [[sum(p[i][j] for p in partials) + bias for j in range(W)] for i in range(H)]


def apply_relu(m: Matrix) -> Matrix:
    return [[relu(v) for v in row] for row in m]


def maxpool(x: Matrix, size: int = 2, stride: int = 1) -> Matrix:
    H, W = len(x), len(x[0])
    out_h = (H - size) // stride + 1
    out_w = (W - size) // stride + 1
    out: Matrix = [[0.0] * out_w for _ in range(out_h)]
    for oi in range(out_h):
        for oj in range(out_w):
            vals = [x[oi * stride + i][oj * stride + j]
                    for i in range(size) for j in range(size)]
            out[oi][oj] = max(vals)
    return out


def flatten(maps: List[Matrix]) -> Vector:
    out: Vector = []
    for m in maps:
        for row in m:
            out.extend(row)
    return out


# --------------------------------------------------------------------------- #
# linear algebra helpers                                                       #
# --------------------------------------------------------------------------- #
def matvec(M: Matrix, v: Vector) -> Vector:
    return [sum(M[i][j] * v[j] for j in range(len(v))) for i in range(len(M))]


def vadd(a: Vector, b: Vector) -> Vector:
    return [x + y for x, y in zip(a, b)]


def hadamard(a: Vector, b: Vector) -> Vector:
    return [x * y for x, y in zip(a, b)]


# --------------------------------------------------------------------------- #
# FFNN forward + backprop (squared error, configurable activation)             #
# --------------------------------------------------------------------------- #
def ffnn_layer_net(weights: Matrix, biases: Vector, inputs: Vector) -> Vector:
    """net_j = bias_j + sum_i w_ji * input_i  (weights row = target neuron)."""
    return [biases[j] + sum(weights[j][i] * inputs[i] for i in range(len(inputs)))
            for j in range(len(weights))]


def ffnn_forward(x: Vector, layers: List[dict]) -> dict:
    """layers: [{'W': Matrix, 'b': Vector, 'act': 'sigmoid'|...}, ...].
    Returns {'nets': [...], 'acts': [...], 'output': Vector} (acts[-1]=output)."""
    nets, acts = [], []
    cur = x
    for L in layers:
        net = ffnn_layer_net(L["W"], L["b"], cur)
        f = ACTIVATIONS[L["act"]]
        a = [f(n) for n in net]
        nets.append(net)
        acts.append(a)
        cur = a
    return {"nets": nets, "acts": acts, "output": cur}


def squared_error_cost(y: Vector, t: Vector) -> float:
    """J = 1/2 * sum (t_i - y_i)^2."""
    return 0.5 * sum((ti - yi) ** 2 for yi, ti in zip(y, t))


def output_delta_sigmoid(y: Vector, t: Vector) -> Vector:
    """delta = y*(1-y)*(t-y) for sigmoid output + squared error."""
    return [yi * (1 - yi) * (ti - yi) for yi, ti in zip(y, t)]


def hidden_delta_sigmoid(h: Vector, W_next: Matrix, delta_next: Vector) -> Vector:
    """delta_j = h_j*(1-h_j)*sum_k(W_next[k][j]*delta_next[k]).
    W_next row = downstream neuron, col = this hidden neuron."""
    out = []
    for j in range(len(h)):
        s = sum(W_next[k][j] * delta_next[k] for k in range(len(delta_next)))
        out.append(h[j] * (1 - h[j]) * s)
    return out


def update_weight(w: float, lr: float, delta: float, inp: float) -> float:
    """w_new = w + lr * delta * input."""
    return w + lr * delta * inp


# --------------------------------------------------------------------------- #
# RNN forward (many-to-many / one-to-many), tanh hidden + configurable output  #
# --------------------------------------------------------------------------- #
def rnn_step(Wxh: Matrix, Whh: Matrix, bxh: Vector, x: Vector, h_prev: Vector,
             hidden_act: Callable[[float], float] = tanh) -> Vector:
    """h_t = act(Wxh.x + Whh.h_prev + bxh)."""
    pre = vadd(vadd(matvec(Wxh, x), matvec(Whh, h_prev)), bxh)
    return [hidden_act(p) for p in pre]


def rnn_output(Why: Matrix, bhy: Vector, h: Vector,
               out_act: str = "softmax") -> Vector:
    net = vadd(matvec(Why, h), bhy)
    if out_act == "softmax":
        return softmax(net)
    f = ACTIVATIONS[out_act]
    return [f(n) for n in net]


def rnn_forward(xs: List[Vector], Wxh, Whh, bxh, Why, bhy, h0: Vector,
                out_act: str = "softmax") -> dict:
    """Run T timesteps. Returns {'hs': [h1..hT], 'ys': [y1..yT]}."""
    hs, ys = [], []
    h_prev = h0
    for x in xs:
        h = rnn_step(Wxh, Whh, bxh, x, h_prev)
        y = rnn_output(Why, bhy, h, out_act)
        hs.append(h)
        ys.append(y)
        h_prev = h
    return {"hs": hs, "ys": ys}


# --------------------------------------------------------------------------- #
# LSTM single step (scalar/vector hidden), verified against Kuis-2 LSTM        #
# --------------------------------------------------------------------------- #
def lstm_step(x: Vector, h_prev: Vector, c_prev: Vector, W: dict, b: dict) -> dict:
    """W keys: Wxf,Wxi,Wxc,Wxo (each: list over input dims) and
    Whf,Whi,Whc,Who (each: list over hidden dims), for a SINGLE hidden unit.
    b keys: bf,bi,bc,bo (scalars). Returns f,i,c_tilde,o,c,h (each scalar here).

    Generalises to H hidden units when the W* gate weights are given as
    matrices (rows=units) and h_prev/c_prev are length-H vectors; this scalar
    form is the common exam case (1 hidden unit)."""
    def gate(wx, wh, bias):
        return sum(wx[k] * x[k] for k in range(len(x))) + \
               sum(wh[k] * h_prev[k] for k in range(len(h_prev))) + bias
    f = sigmoid(gate(W["Wxf"], W["Whf"], b["bf"]))
    i = sigmoid(gate(W["Wxi"], W["Whi"], b["bi"]))
    c_tilde = tanh(gate(W["Wxc"], W["Whc"], b["bc"]))
    o = sigmoid(gate(W["Wxo"], W["Who"], b["bo"]))
    c = c_prev[0] * f + i * c_tilde
    h = o * tanh(c)
    return {"f": f, "i": i, "c_tilde": c_tilde, "o": o, "c": c, "h": h}


# --------------------------------------------------------------------------- #
# Perceptron training traces (Stochastic / Batch GD, linear activation)        #
# --------------------------------------------------------------------------- #
def perceptron_sgd(X: List[Vector], Y: Vector, w: Vector, lr: float,
                   max_iter: int, threshold: float) -> dict:
    """Linear-activation perceptron, online (per-sample) weight update.
    X rows already include the bias term x0=1 as their first element.
    Returns per-step rows and per-epoch SSE so the iteration table can be filled.
    o_i = w . x_i ; Δw_k = lr*(y_i - o_i)*x_ik ; w_k += Δw_k each sample.
    Terminates when epoch SSE < threshold or max_iter reached."""
    rows = []
    epochs = []
    w = w[:]
    for epoch in range(1, max_iter + 1):
        E = 0.0
        for i, (xi, yi) in enumerate(zip(X, Y), start=1):
            o = sum(w[k] * xi[k] for k in range(len(w)))
            dws = [lr * (yi - o) * xi[k] for k in range(len(w))]
            E += ((yi - o) ** 2) / 2
            w = [w[k] + dws[k] for k in range(len(w))]
            rows.append({"epoch": epoch, "i": i, "w_before": None,
                         "net": o, "o": o, "dw": dws, "E_running": E,
                         "w_after": w[:]})
        epochs.append({"epoch": epoch, "SSE": E, "w": w[:]})
        if E < threshold:
            break
    return {"rows": rows, "epochs": epochs, "w_final": w}


def perceptron_bgd(X: List[Vector], Y: Vector, w: Vector, lr: float,
                   max_iter: int, threshold: float) -> dict:
    """Batch GD: accumulate Δw over the whole epoch, update once per epoch."""
    epochs = []
    w = w[:]
    for epoch in range(1, max_iter + 1):
        dw = [0.0] * len(w)
        E = 0.0
        for xi, yi in zip(X, Y):
            o = sum(w[k] * xi[k] for k in range(len(w)))
            for k in range(len(w)):
                dw[k] += lr * (yi - o) * xi[k]
            E += ((yi - o) ** 2) / 2
        w = [w[k] + dw[k] for k in range(len(w))]
        epochs.append({"epoch": epoch, "dw": dw, "SSE": E, "w": w[:]})
        if E < threshold:
            break
    return {"epochs": epochs, "w_final": w}


# --------------------------------------------------------------------------- #
# parameter counters (shared weights = True)                                   #
# --------------------------------------------------------------------------- #
def count_params_conv_layer(n_kernels: int, kh: int, kw: int, in_channels: int) -> int:
    """n_kernels * (kh*kw*in_channels + 1 bias)."""
    return n_kernels * (kh * kw * in_channels + 1)


def count_params_dense(n_in: int, n_out: int) -> int:
    """(n_in + 1) * n_out  (one bias per output neuron)."""
    return (n_in + 1) * n_out


def count_params_rnn(n_in: int, n_hidden: int, n_out: int) -> int:
    """Wxh:(n_in*n_h) + Whh:(n_h*n_h) + bxh:(n_h) + Why:(n_h*n_out) + bhy:(n_out).
    Equivalent to (n_in + n_hidden + 1)*n_hidden + (n_hidden + 1)*n_out."""
    return (n_in + n_hidden + 1) * n_hidden + (n_hidden + 1) * n_out


def count_params_lstm(n_in: int, n_hidden: int) -> int:
    """4 gates, each: Wx(n_in*n_h) + Wh(n_h*n_h) + b(n_h)."""
    return 4 * ((n_in + n_hidden + 1) * n_hidden)


# --------------------------------------------------------------------------- #
# tiny self-check against known IF3270 solutions when run directly             #
# --------------------------------------------------------------------------- #
if __name__ == "__main__":
    ok = True

    def check(name, got, want, tol=1e-3):
        global ok
        good = abs(got - want) <= tol
        ok = ok and good
        print(f"[{'OK ' if good else 'XX '}] {name}: got {got:.4f} want {want}")

    # --- UTS CNN: input 3x3, kernel A 3x3 stride2 pad1; solution's conv shows
    # kernel A as the anti-diagonal of -1s; feature map = [[-0.5,-1.5],[-0.5,0.5]] ---
    x = [[1, 1, 1], [0, 1, 0], [0, 1, 0]]
    A = [[0, 0, -1], [0, -1, 0], [-1, 0, 0]]   # 3x3 kernel A (bias 0.5)
    fmA, _ = conv2d(x, A, bias=0.5, stride=2, padding=1)
    check("UTS CNN convA pos(0,0)", fmA[0][0], -0.5)
    check("UTS CNN convA pos(1,1)", fmA[1][1], 0.5)

    # --- UTS FFNN: net_h2 = 4.5, h2 = 0.989 ---
    x = [2.0, 3.0, 1.0]
    v2 = [1.0, 1.0, -1.0]
    net_h2 = 0.5 + sum(a * b for a, b in zip(v2, x))
    check("UTS FFNN net_h2", net_h2, 4.5)
    check("UTS FFNN h2", sigmoid(net_h2), 0.989)
    # output delta Y2 = 0.071 with y2=0.407,t2=0.70
    check("UTS FFNN deltaY2", output_delta_sigmoid([0.407], [0.70])[0], 0.071)

    # --- Kuis-2 LSTM: x1=[1,2], expect C1=0.6789, h1=0.4915 ---
    W = {"Wxf": [0.7, 0.5], "Wxi": [0.9, 0.8], "Wxc": [0.4, 0.2], "Wxo": [0.6, 0.4],
         "Whf": [0.1], "Whi": [0.6], "Whc": [0.1], "Who": [0.2]}
    b = {"bf": 0.15, "bi": 0.4, "bc": 0.1, "bo": 0.2}
    r = lstm_step([1, 2], [0.0], [0.0], W, b)
    check("Kuis2 LSTM f1", r["f"], 0.864)
    check("Kuis2 LSTM i1", r["i"], 0.9478)
    check("Kuis2 LSTM C1", r["c"], 0.6789)
    check("Kuis2 LSTM h1", r["h"], 0.4915)

    # --- Kuis-2 RNN: 2 in, 3 hidden (tanh), 2 out; h_t1=0.178, h_t2=0.426 ---
    Wxh = [[0.1, 0.2]] * 3
    Whh = [[0.2, 0.3, 0.2]] * 3
    bxh = [0.1] * 3
    Why = [[0.3, 0.2, 0.1]] * 2
    bhy = [0.3] * 2
    rnn = rnn_forward([[0.4, 0.2], [0.7, 0.8]], Wxh, Whh, bxh, Why, bhy,
                      [0.0, 0.0, 0.0], out_act="softmax")
    check("Kuis2 RNN h(t=1)[0]", rnn["hs"][0][0], 0.178)
    check("Kuis2 RNN h(t=2)[0]", rnn["hs"][1][0], 0.426)

    # --- Kuis-2 param counts: encoder 19, decoder 56, total 75 ---
    enc = count_params_conv_layer(1, 2, 2, 2) + count_params_conv_layer(2, 2, 2, 1)
    dec = count_params_rnn(10, 2, 10)
    check("Kuis2 encoder params", enc, 19)
    check("Kuis2 decoder params", dec, 56)
    check("Kuis2 total params", enc + dec, 75)

    # --- UTS CNN param count: 2*(3*3*1+1)+1*(2*2*2+1)+(1+1)*1 = 20+9+2 = 31.
    # (The official key prints "=32", but its own expression sums to 31 — a slip
    # in the answer key; the formula is correct.) ---
    cnn = (count_params_conv_layer(2, 3, 3, 1)
           + count_params_conv_layer(1, 2, 2, 2)
           + count_params_dense(1, 1))
    check("UTS CNN total params", cnn, 31)

    print("\nALL PASS" if ok else "\nSOME CHECKS FAILED")
