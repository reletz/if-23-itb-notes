---
name: if3270-exam-generator
description: >-
  Generate a realistic IF3270 Pembelajaran Mesin practice exam packet ("paket
  soal latihan UAS") for a given list of topics, with a Python-verified answer
  key. Produces two markdown files in the course's uas/ folder — a question sheet
  and a worked pembahasan. Every assessment follows the course invariant: exactly
  3 Bagian, built from 5 recurring formats (step-by-step bertingkat, nested
  computation, pilihan ganda, benar/salah + alasan, menggambar arsitektur), with
  composite/pipeline Bagian fusing related topics (CNN→RNN encoder-decoder,
  FFNN→RNN, Attention+LSTM). Use when the user asks to make IF3270 practice
  questions / latihan UAS (e.g. "buat paket soal IF3270 topik RNN, LSTM, CNN").
  Topics are REQUIRED — there is no default.
---

# IF3270 exam packet generator

Builds practice exam packets faithful to how IF3270 Pembelajaran Mesin assesses
(Kuis/UTS/UAS). The course invariant and every question shape are documented in
`references/format-playbook.md` — **read it before generating**. All numbers in
the answer key come from a verified pure-Python compute library
(`scripts/mlcompute.py`), never hand-arithmetic.

This is a notes vault, not a code project. The shell is fish but the Bash tool
runs bash; **paths contain spaces — always quote them**. `python3` is available;
the library uses the stdlib only (no numpy). Don't commit unless asked.

## 1. Inputs and the invariant

- **Topics are required.** If the user gives none, ask which topics (from:
  Perceptron, FFNN, CNN, RNN, LSTM, Transformer/Attention, RL, Ensemble). Do NOT
  invent a default.
- The packet has **exactly 3 Bagian**, Bobot summing to **100**, each Bagian one
  topic or a composite of two (see playbook). Each sub-question has `(Nilai n)`.

## 2. Read the references first

1. `references/format-playbook.md` — the 5 formats, per-topic question catalog +
   exact key step style, composite recipes, realism conventions.
2. `references/exam-template.md` — the soal + kunci markdown skeletons.
3. Skim the matching topic notes under
   `content/02. Catatan/IF3270 Pembelajaran Mesin/<1..9>/` for MC / benar-salah /
   essay content and correct terminology.
4. Optionally glance at `uas/Pembahasan-Solusi-UTS-IF3270-2-2025.md` and
   `uas/Solusi-Kuis-2-IF3270-2-2025.md` to anchor the style.

## 3. Map topics → 3 Bagian, choose formats, present a blueprint

- **3 topics** → one per Bagian.
- **>3 topics** → fuse related ones into a **composite/pipeline Bagian** (playbook
  recipes) so every requested topic appears. Don't drop topics.
- **<3 topics** → ask whether to repeat/expand a topic across Bagian, or add one.
- Pick formats per Bagian by topic affinity (CNN→nested+sizing+param-count+drawing;
  RNN→bertingkat table+architecture; LSTM→gate steps+symbol essay; Perceptron→SGD
  table; Transformer/RL→MC+benar-salah+small calc). Mix in the conceptual formats
  (MC, benar/salah, drawing) so the packet isn't pure arithmetic.
- Assign Bobot (e.g. 40/30/30) and per-sub-question Nilai (sum to the Bobot).
- **Present this blueprint to the user with AskUserQuestion** (topics→Bagian,
  formats, Bobot) and the one execution choice: write directly (default) vs fan out
  one subagent per Bagian. Get approval before generating.

## 4. Instantiate concrete parameters and compute the key

- Choose small, clean parameters per Bagian (integers / one-decimal weights,
  0/1 input matrices, single-digit decimals) so the arithmetic is exam-doable.
- Copy `scripts/gen_packet.py` mentally as your pattern; **edit its PARAM blocks**
  to this packet's architecture/weights/inputs (one function per Bagian, add/remove
  to match the chosen topics; composite Bagian = chain two stages, feeding A's
  output into B as in the CNN→RNN example).
- Run it and capture the trace — these numbers are the ONLY ones allowed in the key:
  ```bash
  python3 "scripts/gen_packet.py"
  ```
  (Run from the skill dir, or pass its absolute path. Re-run after any param edit.)
- Sanity: the library is self-validated against real solutions —
  `python3 "scripts/mlcompute.py"` must print `ALL PASS`.

## 5. Author the two files

Write into `content/02. Catatan/IF3270 Pembelajaran Mesin/uas/` using the
`exam-template.md` skeletons:

- `Paket-Soal-IF3270-UAS-<slug>.md` — questions only. **No answers, no
  intermediate results.** Include the header block, rounding instruction, Bagian
  headers with Bobot, and `(Nilai n)` per sub-question.
- `Pembahasan-Paket-Soal-IF3270-UAS-<slug>.md` — worked key. Each step as
  **formula → substituted numbers → bold result**, lifting every number from the
  script trace. Architecture answers as mermaid `flowchart LR` (encoder boxes by
  feature-map size, decoder boxes by neuron count, weights on edges). For
  benar/salah, give verdict + reason + the 2/1/0 rubric note.

`<slug>` = topics + a number, e.g. `cnn-rnn-lstm-01`.

**Optional fan-out:** if the user chose parallel, dispatch one `general-purpose`
subagent per Bagian. Give each the playbook excerpt for its topic(s), its PARAM
values, the captured trace for its Bagian, and ask it to **return its soal and
kunci markdown fragments** (not write files). The orchestrator concatenates the
fragments and writes the two files (avoids write conflicts).

## 6. Verify (before reporting done)

- **Numbers match the script.** Re-run `gen_packet.py`; every bold result in the
  kunci equals the trace. `mlcompute.py` prints `ALL PASS`.
- **No leaked answers** in the soal file: it must not contain the key's result
  numbers or worked sums. Grep for tell-tale tokens, e.g.:
  ```bash
  grep -nE '=\s*-?[0-9]+\.[0-9]+|ReLU|maxpool|σ\(|tanh\(' "uas/Paket-Soal-IF3270-UAS-<slug>.md"
  ```
  (Setup constants are fine; computed results are not.)
- **Structure:** exactly 3 `## Bagian` headings; Bobot values sum to 100; every
  soal `(Nilai n)` has a matching kunci entry; the Nilai inside each Bagian sum to
  its Bobot.
- **Mermaid sanity** (if diagrams used): code fences balanced (even count of
  ```` ``` ````); inside a Quartz callout, mermaid lines are `> > `-prefixed (here
  the files are plain `#` docs, so a bare fenced ```mermaid block is fine).
- Report the two file paths and that they are **uncommitted**.

## 7. Gotchas

- Quote every path (spaces). Run python from the skill directory or with absolute
  paths; `gen_packet.py` adds its own dir to `sys.path` to import `mlcompute`.
- The official UTS key has a known arithmetic slip (prints 32 for a 31-sum CNN
  param expression). Trust the formula/script, not stray key totals.
- Conv is cross-correlation (kernel not flipped) + bias; detector = ReLU; pool =
  max with given size/stride. softmax tie-break → first class. These match the course.
- Keep prose in Bahasa Indonesia; technical terms may stay English (vault style).
