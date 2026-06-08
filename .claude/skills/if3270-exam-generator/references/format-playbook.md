# IF3270 exam format playbook

Distilled from the real assessments (`uas/Pembahasan-Solusi-UTS-IF3270-2-2025.md`,
`uas/Solusi-Kuis-2-IF3270-2-2025.md`) and the course notes under
`content/02. Catatan/IF3270 Pembelajaran Mesin/<1..9>/`. This is the "how the
course writes questions and keys" reference. The generator must reproduce these
shapes and, in the key, this exact step style.

## The invariant: 3–4 Bagian, mixed formats, Bobot sums to 100

An assessment has **3 or 4 Bagian**. Kuis/UTS use **3**; the real **UAS
2024-2025 used 4**. Each Bagian = one topic, a composite of two, or a mixed
conceptual block + one or more of the **5 question formats** below. Bobot across
the Bagian total **100**. Each sub-question carries its own `(Nilai n)` and the
n's inside a Bagian sum to that Bagian's Bobot.

**Reference UAS 2024-2025 structure** (replicate this shape for a faithful UAS):

| Bagian | Topik | Format | Bobot |
| ------ | ----- | ------ | ----- |
| I | RNN / LSTM / enc-dec / Bi-RNN (campuran) | **Pilihan ganda** (12 soal @2.5), varian tandai-tiap-opsi O/X | 30 |
| II | LSTM | **Bertingkat**: forward pass + **BPTT** backward + update bobot | 20 |
| III | Encoder-Decoder (+ attention) | **Beranak**: hitung jumlah parameter + **formula inferensi** | 25 |
| IV | Reinforcement Learning | Tabel supervised-vs-RL + **Wumpus TD Q-learning** (update Q, grid, policy) | 25 |

For a 3-Bagian (Kuis/UTS-style) packet, use the older shape (e.g. CNN nested /
RNN bertingkat / LSTM gate-steps, Bobot 40/30/30).

## The 5 question formats

1. **Step-by-step bertingkat (tiered)** — chained sub-questions, often a TABLE.
   - Perceptron SGD/BGD: an iteration table with columns `iter | i | w0..wn | Σ | o | Δw0..Δwn | E | Terminate?`. One row per sample per epoch; SSE accumulates; terminate when SSE < threshold or max_iter.
   - RNN forward: per-timestep `h_t` then `y_t`; ask for a specific neuron at a specific t, then the next t (which depends on the previous), then the output + predicted class.
   - FFNN: forward (net → activation) → total cost → error terms δ → one weight update. Each step consumes the previous.
2. **Nested computation (beranak)** — sub-questions a, b, c, … each computing one
   layer/stage explicitly. CNN is the canonical case (see CNN recipe).
3. **Pilihan ganda (MC)** — a block of ~7–12 items, conceptual or short-calc,
   4–5 options each, pulled from the notes' definitions/comparisons. Two sub-forms:
   - **single-answer** — pick one correct option; key = letter + one-line reason.
   - **mark-each-option O/X** (the UAS 2024-2025 Bagian I form, `@2.5` per item):
     the student marks **every** option as correct (O) or wrong (X); unmarked =
     no credit. In the KEY, give the O/X verdict for **each** option with a short
     reason. Items can include figure-ID questions (e.g. "which unfolded-network
     drawing matches a many-to-one RNN with 4 neurons, 5 timesteps?") and small
     forward-calc questions — pre-compute any numbers with `mlcompute`.
4. **Benar/Salah + alasan** — a statement; student answers BENAR/SALAH **and**
   gives the reason. Graded **2** (answer + reason correct) / **1** (answer right,
   reason wrong) / **0** (answer wrong). Build these from common misconceptions
   (e.g. "konektivitas FFNN bersifat lokal" → SALAH, fully connected → global;
   "total cost dihitung pada backward propagation" → SALAH, dihitung saat forward).
5. **Menggambar arsitektur** — student draws; in the KEY render the answer as a
   mermaid `flowchart LR` or ASCII. Conventions from the course:
   - Encoder CNN hidden layer = a box labelled with the **feature-map size** (e.g. `2*2*2`).
   - Decoder/RNN hidden layer = a box labelled with the **number of neurons**.
   - Unfolded RNN: one box per timestep, arrows `h(t-1)→h(t)`, inputs as vectors
     with feature count, outputs per timestep, **bias shown**.
   - Label weights on edges: kernels (A,B,C…) on conv edges; `Wxh, Whh, Why` on RNN edges.

## Per-topic question catalog + exact key step sequence

Use `scripts/mlcompute.py` for every number. The key writes
**formula → substituted numbers → result**, exactly like the solutions.

### Perceptron (notes folder 3)
- Shapes: fill the SGD/BGD iteration table; "lengkapi algoritma" pseudo-code
  fill-in (variables `Δw_k, w_k, E, x_i, y_i, o_i, η`); BENAR/SALAH on GD concepts.
- Activation is **linear** here (`o = wᵀx`), threshold on SSE. `mlcompute.perceptron_sgd/bgd`
  return per-row and per-epoch traces. Round to 3 decimals (UTS used 3).
- Key style per row: `o = w·x = …`; `Δw_k = η(y-o)x_k = …`; `w_k ← w_k + Δw_k`; `E += (y-o)²/2`.

### FFNN (notes folder 4)
- Shapes: param count `[(n_in+1)*n_h1] + [(n_h1+1)*n_out]`; forward to a hidden/output
  neuron; total cost; δ at output and hidden; one weight update; plus BENAR/SALAH conceptuals.
- Sigmoid hidden+output, squared error, lr often 0.5. Use `ffnn_forward`,
  `squared_error_cost`, `output_delta_sigmoid`, `hidden_delta_sigmoid`, `update_weight`.
- Key style: `net_h = b + Σ v·x = …`; `h = 1/(1+e^{-net}) = …`; `J = ½Σ(t-y)² = …`;
  `δY = y(1-y)(t-y) = …`; `δH = h(1-h)·Σ(w·δY) = …`; `w ← w + η·δ·input = …`.
  Write the activation **formula in full**, not just its name (the rubric requires it).

### CNN (notes folder 5) — the nested recipe
For each conv layer, in order, show:
1. **Padding** the input (display the padded matrix) if P>0.
2. **Convolution (cross-correlation)** — for *every* output position write the
   explicit sum of products + bias = value (use `conv2d(..., trace=True)`).
3. **Detector (ReLU)** — display the matrix after ReLU.
4. **Pooling (max)** — display the pooled matrix.
Repeat per kernel and per layer (multi-channel: sum the per-channel convolutions,
`conv2d_multi`). Then **flatten**, then the dense/sigmoid output if present.
- Sizing question: `V = 1 + (W-F+2P)/S` per stage (`feature_map_size`), report each as `H*W*C`.
- Param count: `Σ_layers n_kernels*(kh*kw*in_ch + 1) + dense (n_in+1)*n_out`
  (`count_params_conv_layer`, `count_params_dense`). Note: the UTS key has an arithmetic
  slip (prints 32 for an expression that sums to 31) — trust the formula/script.
- Rounding: UTS/Kuis-2 CNN used **4 decimals**.

### RNN (notes folder 6)
- Shapes: fill weight matrices from "setiap baris bobot…" descriptions; per-timestep
  forward (bertingkat); output + predicted class (softmax; tie-break → first class);
  param count `(n_in+n_h+1)*n_h + (n_h+1)*n_out`; unfolded architecture drawing.
- tanh hidden, softmax (or sigmoid) output. Use `rnn_forward`.
- Key style: `h_t = tanh(Wxh·x_t + Whh·h_{t-1} + bxh) = …`; show the dot products;
  `y_t = softmax(Why·h_t + bhy) = …`.

### LSTM (notes folder 7)
- Shapes: compute one step gate-by-gate; define each symbol (essay, Nilai ~6);
  RNN-vs-LSTM differences (essay, from notes: cell state, gates).
- Order in key: `f, i, Ĉ, o` (each `σ`/`tanh` of `Wx·x + Wh·h_{t-1} + b`), then
  `C_t = C_{t-1}⊙f + i⊙Ĉ`, then `h_t = o⊙tanh(C_t)`. Use `lstm_step`.
- Key style mirrors the Kuis-2 LSTM solution: write the full substituted vector
  expression then the scalar result, e.g.
  `f₁ = σ(Wxf·x₁ + Whf·h₀ + bf) = σ([0.7,0.5]·[1,2] + [0.1]·[0] + 0.15) = σ(1.85) = 0.864`.

#### LSTM BPTT (UAS Bagian II — forward + backward + update)
- Shape (from UAS 2024-2025): a single hidden unit, 2-feature input, 2 timesteps;
  the table's **U\* = input→gate weights** (per feature) and **W\* = recurrent
  hidden→gate weight** (scalar); target is on the **hidden unit**. (a) forward
  pass over both timesteps + **error total** `½Σ(h−target)²`; (b) one **BPTT
  backward pass** with `lr` (UAS used 0.5) → updated weight matrices. 3 desimal.
- Use `lstm_bptt(xs, targets, W, b, lr)` — returns the forward cache, per-gate
  deltas, accumulated gradients, and `newW`/`newb`. **Its gradients are verified
  by finite-difference checking in the self-test**, so the numbers are trustworthy.
  Map the exam's `Uf,Ui,Uc,Uo` → `Wxf,Wxi,Wxc,Wxo` and `Wf,Wi,Wc,Wo` → `Whf,Whi,Whc,Who`.
- Key style: per gate write the gradient as δ·input, e.g.
  `∂L/∂Uc = Σ_t δc(t)·x(t)`, then `Wc_baru = Wc_lama − λ·∂L/∂Wc = …`. Show the
  backward order: `δh(t) → δo, δC → δf, δi, δĈ`, with the recurrent term
  `δh(t-1) += δf·Wf + δi·Wi + δĈ·Wc + δo·Wo` and cell carry `δC(t-1) += δC(t)·f(t)`.

### Encoder-Decoder (notes folder 7-8) — UAS Bagian III
- Shapes: **(1) parameter counting** of an encoder-decoder (RNN enc-dec, LSTM
  enc-dec, and a variant **with one attention unit**); **(2) inference-formula
  derivation** for the decoder (use `f` for hidden activation, `g` for output
  activation, `αt` for attention weights). Mostly symbolic — few or no numbers.
- Param counting (state assumptions explicitly in the key):
  - Encoder = one recurrent layer over the input vector dim:
    `count_params_rnn_layer(input_dim, enc_h)` (or `count_params_lstm_layer`).
  - Decoder = one recurrent layer; **assume decoder input dim = previous-output
    dim** (= output-layer neuron count) unless told otherwise; + the output
    `count_params_dense(dec_h, n_out)`.
  - Attention adds `count_params_attention(variant, dec_h, enc_h, attn_dim)` —
    the course doesn't fix one convention, so **name the scoring variant** (dot=0,
    general=dec_h·enc_h, concat=attn_dim·(dec_h+enc_h)+attn_dim) in the key.
- Inference-formula style (no attention):
  `s_t = f(W_s·s_{t-1} + U_s·y_{t-1} + b_s)`; `y_t = g(W_y·s_t + b_y)`;
  the **context vector c (encoder last hidden state) seeds s_0**, `y_0 = <start>`.
  With attention: `c_t = Σ_j α_{t,j}·h_j`, `s_t = f(…, c_t)`, `y_t = g(W_y·s_t + b_y)`.

### RL (notes folder 9) — UAS Bagian IV
- Shapes: **(1)** fill a **supervised-learning vs reinforcement-learning** table
  (info needed by the agent, sequential data?, what the agent learns); **(2)
  Wumpus-World Temporal-Difference Q-learning** — given episodes (state paths),
  step (lr) α and discount γ, do explicit `Q(s,a)` updates, draw the grid with Q
  values per episode, and give the **best action per non-terminal state**.
- TD update: `Q(s,a) ← Q(s,a) + α[r + γ·max_a' Q(s',a') − Q(s,a)]`, all Q init 0.
  Reward convention (UAS): entering the **gold** room = +10, entering a **wumpus/
  pit** room = −10 (terminal, no bootstrap), every other move = 0. Actions N/E/S/W;
  state = (col,row). Use `q_learning_td(episodes, reward, terminals, α, γ)` — it
  returns a per-transition trace (`old → new`, with `r` and `max_a' Q'`) and the
  final Q-table. Best action = `argmax_a Q(s,a)` (tie-break → first / state notes).
- Key style: one line per transition, e.g.
  `(2,1)→(3,1) [E]: Q = 0 + 0.4·(−10 + 0.6·0 − 0) = −4.000`; then the policy arrows.

### Transformer / Attention (notes folder 8)
- Shapes: conceptual MC / BENAR-SALAH (self-attention, multi-head, positional
  encoding, Q/K/V); small attention-score computation (`softmax(QKᵀ/√d)·V`) if asked;
  architecture sketch (encoder/decoder stack, attention edges). Compute scores with
  `matvec`/`softmax`. Keep numbers small. (For attention inside an encoder-decoder
  parameter/inference question, see the Encoder-Decoder recipe above.)

## Composite / pipeline Bagian (how related topics share one Bagian)

When the user asks for more topics than 3 Bagian, **fuse related topics into one
Bagian** as a single problem with a shared input that flows A → B. Don't drop topics.

- **CNN → RNN (encoder–decoder, one-to-many)** — the Kuis-2 Bagian I pattern.
  CNN encoder forward-props the image; its **flattened feature map seeds the RNN
  decoder** (start-token = zero vector, then each output token feeds the next step).
  Sub-questions walk: conv/pool of the encoder → flatten → unfolded architecture →
  total param count of the *whole* model → the recurrence formula for `y(1)y(2)y(3)`.
- **FFNN → RNN** — FFNN produces a feature/embedding vector that becomes the RNN
  input at t=1; chain forward props.
- **Attention + LSTM** — LSTM encoder produces hidden states; an attention step
  computes a context vector over them; combine for the decoder.

Param count for a composite = sum of both sub-models' counts (see Kuis-2: encoder
19 + decoder 56 = 75).

## Realism conventions (so it reads like a real IF3270 paper)

- **Header block** per the template: course title, semester, `Sifat`, date/time,
  then `KELAS / NIM / NAMA` blanks. (Keep it; the user wants realism. Page-repeat
  headers from the OCR can be dropped — one header at top is enough.)
- **Small, clean parameters**: integers or one-decimal weights, small inputs
  (0/1 matrices for CNN, single-digit decimals for RNN/LSTM) so the arithmetic is
  hand-doable in an exam.
- **Rounding instruction** stated in the soal: "gunakan n angka di belakang koma"
  (3 for perceptron-style, 4 for CNN/RNN/LSTM forward). Match `R` in `gen_packet.py`.
- **Bobot/Nilai** visible: Bagian Bobot in the header line; each sub-question `(Nilai n)`.
- **Architecture answers**: mermaid `flowchart LR` in the key, following the
  box-labelling convention above.
- Prose in **Bahasa Indonesia**, technical terms may stay English (matches the vault).
