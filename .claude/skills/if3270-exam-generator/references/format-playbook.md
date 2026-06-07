# IF3270 exam format playbook

Distilled from the real assessments (`uas/Pembahasan-Solusi-UTS-IF3270-2-2025.md`,
`uas/Solusi-Kuis-2-IF3270-2-2025.md`) and the course notes under
`content/02. Catatan/IF3270 Pembelajaran Mesin/<1..9>/`. This is the "how the
course writes questions and keys" reference. The generator must reproduce these
shapes and, in the key, this exact step style.

## The invariant: 3 Bagian, mixed formats, Bobot sums to 100

Every assessment has **exactly 3 Bagian**. Each Bagian = one topic (or a
composite of two) + one or more of the **5 question formats** below. Bobot
(weights) across the 3 Bagian total **100** (e.g. 40 / 30 / 30, or 20+10 / ... ).
Each sub-question carries its own `(Nilai n)` and the n's inside a Bagian sum to
that Bagian's Bobot.

## The 5 question formats

1. **Step-by-step bertingkat (tiered)** — chained sub-questions, often a TABLE.
   - Perceptron SGD/BGD: an iteration table with columns `iter | i | w0..wn | Σ | o | Δw0..Δwn | E | Terminate?`. One row per sample per epoch; SSE accumulates; terminate when SSE < threshold or max_iter.
   - RNN forward: per-timestep `h_t` then `y_t`; ask for a specific neuron at a specific t, then the next t (which depends on the previous), then the output + predicted class.
   - FFNN: forward (net → activation) → total cost → error terms δ → one weight update. Each step consumes the previous.
2. **Nested computation (beranak)** — sub-questions a, b, c, … each computing one
   layer/stage explicitly. CNN is the canonical case (see CNN recipe).
3. **Pilihan ganda (MC)** — ~7 items, conceptual or short-calc, 4–5 options each.
   Pulled from the notes' definitions/comparisons (e.g. why CNN over FFNN, what a
   gate does, attention vs RNN). Key = letter + one-line justification.
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

### Transformer / Attention (notes folder 8)
- Shapes: conceptual MC / BENAR-SALAH (self-attention, multi-head, positional
  encoding, Q/K/V); small attention-score computation (`softmax(QKᵀ/√d)·V`) if asked;
  architecture sketch (encoder/decoder stack, attention edges). Compute scores with
  `matvec`/`softmax`. Keep numbers small.

### RL (notes folder 9)
- Shapes: conceptual MC / essay (agent components, policy/value, exploration vs
  exploitation, DQN); small value-iteration / Q-update arithmetic
  (`Q(s,a) ← Q + α[r + γ max Q' − Q]`). Mostly conceptual — lean on the notes.

## Composite / pipeline Bagian (how >3 topics fit into 3 Bagian)

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
