# Cheatsheet KONSEP + ALUR HITUNG — Encoder-Decoder · Attention · Transformer · RL

> **Bagian 1 = KONSEP** (Bagian I PG/benar-salah). **Bagian 2 = HITUNG** (tiap rumus di-trace angka).
> Semua angka **sudah diverifikasi via Python**.

---

# ★ KONSEP (Bagian I — PG / benar-salah)

## K1. Arsitektur RNN ↔ task (jebakan #1)
| Pola | input→output | Contoh | Output diambil |
|---|---|---|---|
| one-to-one | 1→1 | klasifikasi gambar tunggal | — |
| one-to-many | 1→sekuens | image captioning | tiap timestep |
| many-to-one | sekuens→1 | sentiment analysis, klasifikasi teks | **timestep TERAKHIR** |
| many-to-many **sync** | N→N (sama panjang) | **sequence labeling / POS tagging / NER** | tiap timestep |
| many-to-many **async** (seq2seq) | N→M (beda) | translasi, **video captioning**, summarization | tiap timestep |

⚠️ **Patokan**: output **kalimat/sekuens** → "...-to-**many**"; output **1 label/angka** → "...-to-**one**".
⚠️ "labeling" ≠ otomatis many-to-one. **Sequence labeling = many-to-many sync** (label tiap token). Sentiment analysis = many-to-one.
⚠️ Video captioning = many-to-**many** (video banyak frame → kalimat banyak kata), BUKAN many-to-one.

## K2. Output layer (tentukan dari "model ngeluarin apa")
| Task | #neuron | aktivasi |
|---|---|---|
| Regresi (1 angka, mis. jumlah penumpang) | 1 | linear |
| Klasifikasi biner (pos/neg) | **1 sigmoid** *atau* **2 softmax** | — |
| Multi-kelas (pilih 1) | #kelas | softmax |
| Multi-label (banyak sekaligus) | #kelas | **sigmoid** |
| Translasi/generasi | **ukuran vocab TARGET** | softmax |

⚠️ "**2 neuron sigmoid**" untuk biner = SALAH (itu multi-label). Yang benar 2 softmax / 1 sigmoid.
⚠️ Output vocab = bahasa **target**, bukan sumber (sumber dipakai di encoder/input).
⚠️ Regresi pakai **linear**, bukan softmax.

## K3. Time-series framing (jebakan timestep)
Soal "prediksi bulan depan dari 3 bulan sebelumnya, data 10 tahun":
- **timestep = 3** (panjang window input) — BUKAN 10.
- **10 tahun = banyaknya data latih** (≈120 bulan → ratusan window), bukan timestep.
- output = **1 neuron linear** (regresi), bukan sequence.
- arsitektur = **many-to-one**; one-to-many tidak cocok.

## K4. Bi-RNN
- 2 RNN: satu **maju** (konteks masa lalu), satu **mundur** (konteks masa depan); output tiap posisi = **concat** dua hidden.
- ⚠️ gabung = **concat** (vektor memanjang, info dua arah utuh), **bukan** penjumlahan.
- ⚠️ #param ≈ **2×** RNN biasa; jumlah timestep **TIDAK** dilipat dua.
- cocok **sequence tagging** (butuh kalimat lengkap: POS tagging, NER); **bukan** real-time/forecasting (perlu sekuens lengkap dulu).
- ⚠️ bukan cuma teks — bisa audio/time-series/DNA. RNN **tetap peduli urutan** (yang abaikan urutan = bag-of-words).

## K5. Encoder-Decoder & Context Vector
- **seq2seq**: encoder ringkas input → **context vector c** (= hidden encoder **TERAKHIR**); decoder bangkitkan output **autoregresif** (output t jadi input t+1).
- ⚠️ `c` punya dimensi = #neuron hidden encoder (vektor), tapi **0 parameter** (cuma di-assign ke s0).
- **Tanpa attention**: `c` 1 vektor tunggal → **bottleneck** untuk kalimat panjang; info `c` "pudar" makin jauh decoding.
- ⚠️ one-to-many & many-to-one **tidak cocok** untuk translasi → pakai many-to-many.
- **Teacher forcing** (saat TRAINING): input decoder tiap-t = **token ASLI dari dataset** (bukan tebakan model) → training stabil, error tak menumpuk. Saat **inference**: pakai output sendiri (autoregresif). → maka "tidak ada input dataset ke decoder" = **SALAH**.

## K6. Attention
- context **beda tiap timestep decoder** (`c_t`) → decoder bisa **fokus** ke bagian input berbeda → atasi bottleneck.
- ⚠️ bobot attention **DIPELAJARI saat training** dari parallel corpus (lewat backprop), tanpa anotasi alignment eksplisit.
- **Bahdanau (additive)**: `c_t` dihitung **sebelum** `s_t` → jadi input `s_t`.
- **Luong (multiplicative)**: `s_t` dihitung dulu → lalu `s̃_t=tanh(W_c[c_t;s_t])` → prediksi; lebih simpel/efisien.

## K7. Transformer
- **"Attention is All You Need"** — attention penuh, **buang rekurensi & konvolusi**.
- ⚠️ unggul vs RNN: RNN **sekuensial** (token t nunggu t−1); Transformer **paralel** → efisien, no bottleneck sekuensial, kuat long-range, dukung **scaling laws**.
- **Self-attention** = attention antar token **sekuens yang sama**.
- **Q** (dicari) / **K** (label cocok) / **V** (isi agregasi); **multi-head** = relasi beda paralel.
- ⚠️ **Positional encoding WAJIB** — tanpa rekurensi, tanpa PE self-attention buta urutan ("Budi memukul Andi" = "Andi memukul Budi").
- decoder: **masked self-attention** (cegah lihat masa depan) + enc-dec attention; tiap sublayer **residual + layer norm**.
- **BERT** = enc-only (pemahaman) · **GPT** = dec-only (generasi) · **T5/BART** = enc-dec.

## K8. Reinforcement Learning
- **MDP** = (States, Actions, transisi P(s'|s,a), reward R); **Markov property**: next state & reward hanya bergantung **state+aksi sekarang**, bukan riwayat.
- **Return** $G_t=R_{t+1}+\gamma R_{t+2}+\dots$; **γ**: jamin konvergen, wakili ketidakpastian, preferensi reward cepat. γ→0 myopic, γ→1 far-sighted.
- **π\*(s)=argmax_a q\*(s,a)**; value & policy saling terkait.
- **Exploration vs exploitation** (mis. ε-greedy).
- ⚠️ **TD vs Monte Carlo**: TD update **tiap timestep** (bootstrapping), bisa dari sequence tak lengkap; MC nunggu Return penuh.
- ⚠️ **on-policy SARSA** (pakai aksi nyata a' → policy **aman/hati-hati**) vs **off-policy Q-learning** (pakai **max** → policy **agresif/optimal**).
- **Episode** berakhir di terminal lalu reset; Q terbawa antar episode. **DQN** = Q-learning + neural net.
- ⚠️ **SL vs RL**: SL butuh (input,label); RL butuh sinyal **reward**, observasi sekuensial, belajar **policy**.

---

# ★ HITUNG (alur angka)

## A. ENCODER–DECODER (hitung parameter)

### Rumus dasar (HAFAL)
- RNN layer: $n_h\cdot(n_{in}+n_h+1)$  ← `+n_h` = bobot rekuren, `+1` = bias
- LSTM layer: $4\cdot n_h\cdot(n_{in}+n_h+1)$  ← LSTM = 4 gerbang → kali 4
- FC/Dense: $(n_{in}+1)\cdot n_{out}$

### ⚠️ Yang nentuin $n_{in}$ decoder = apa yang MASUK ke RNN tiap timestep
Tergantung asumsi arsitektur (TULIS asumsimu di lembar jawab!):

| Asumsi | input decoder tiap-t | $n_{in}$ dec |
|---|---|---|
| **c cuma init s0** (ikut PPT) | $y_{t-1}$ (= dim output FC) | **1** |
| c disertakan tiap timestep | $c$ (dim = enc_h) | **2** |
| pakai attention | $c_t$ (dim = enc_h) | **2** |

> **c (context vector) TIDAK punya parameter** — dia cuma nilai (di-assign ke s0), sama kayak h₀=0. Yang dihitung cuma W & U, dan $n_{in}$ = dimensi tensor yang dikali matriks U tiap timestep.

### Contoh soal (enc RNN-2 atas input 4-fitur; dec RNN-2; FC-1 output) — asumsi PPT
| Layer | hitung | param |
|---|---|---|
| Encoder RNN | $2\cdot(4+2+1)=2\cdot7$ | **14** |
| Decoder RNN ($n_{in}=1$) | $2\cdot(1+2+1)=2\cdot4$ | **8** |
| FC output | $(2+1)\cdot1$ | **3** |
| **Total** | | **25** |

**Versi LSTM** (enc & dec jadi LSTM): enc $4\cdot14=56$, dec $4\cdot8=32$, FC $3$ → **91**.

**Versi + attention (general)**: input decoder jadi $c_t$ (dim 2) → dec $=2\cdot(2+2+1)=10$; tambah attention general $=enc_h\cdot dec_h=2\cdot2=4$. Total $14+10+3+4=$ **31**.

---

## B. ATTENTION (alur hitung context vector)

### Inti: context $c_t$ = rata-rata BERBOBOT dari semua hidden encoder
Beda dari "tanpa attention" yang cuma pakai $e_{terakhir}$. Per timestep decoder t:

```
1. score tiap hidden encoder e_j  →  pakai s_{t-1} (state decoder)
2. α_t = softmax(semua score)     →  bobot, jumlah = 1
3. c_t = Σ_j α_{t,j} · e_j         →  weighted sum
```

### 3 cara hitung score
| Nama | Rumus | Param tambahan |
|---|---|---|
| **dot** | $s^\top e_j$ | 0 |
| **general** | $s^\top W_a e_j$ | $dec_h\cdot enc_h$ |
| **concat** (Bahdanau) | $v_a^\top\tanh(W_a[s;e_j])$ | banyak |

### Contoh trace (dot score; $e_1{=}[1,0]\,e_2{=}[0,1]\,e_3{=}[1,1]$; $s{=}[1,0]$)
```
score = [ s·e1, s·e2, s·e3 ] = [1, 0, 1]
α     = softmax([1,0,1])     = [0.4223, 0.1554, 0.4223]
        (e^1=2.718, e^0=1, e^1=2.718; /6.436)
c     = 0.4223·[1,0] + 0.1554·[0,1] + 0.4223·[1,1]
      = [0.8446, 0.5777]
```
→ context "lebih fokus" ke e1 & e3 (skor tinggi), e2 hampir diabaikan.

### Bahdanau vs Luong — ALUR per timestep decoder t (BEDA URUTAN)
Beda kunci = **kapan `c_t` dihitung relatif terhadap `s_t`**. Bahdanau: c DULU (pakai $s_{t-1}$). Luong: s DULU (pakai $s_t$).

**BAHDANAU (additive, 2015) — c_t sebelum s_t:**
```
1. score_j = vₐᵀ·tanh(Wₐ·s_{t-1} + Uₐ·e_j)      ← pakai s_{t-1} (state LAMA) + concat-style
2. α_t = softmax(score)
3. c_t = Σ_j α_{t,j}·e_j                           ← context dihitung DULU
4. s_t = f(W_s·s_{t-1} + U_s·y_{t-1} + C·c_t + b)  ← c_t jadi INPUT untuk bikin s_t
5. y_t = g(W_y·s_t + b_y)                          ← prediksi langsung dari s_t
```
Alur: `s_{t-1} → score → α → c_t → s_t → y_t` (c_t masuk SEBELUM s_t terbentuk).

**LUONG (multiplicative, 2015) — s_t sebelum c_t:**
```
1. s_t = f(W_s·s_{t-1} + U_s·y_{t-1} + b)          ← bikin s_t DULU, TANPA c
2. score_j = s_tᵀ·e_j  (dot) / s_tᵀ·Wₐ·e_j (general)  ← pakai s_t (state BARU)
3. α_t = softmax(score)
4. c_t = Σ_j α_{t,j}·e_j
5. s̃_t = tanh(W_c·[c_t ; s_t])                     ← GABUNG (concat) c_t & s_t → hidden attentional
6. y_t = g(W_y·s̃_t + b_y)                          ← prediksi dari s̃_t (BUKAN s_t)
```
Alur: `s_{t-1} → s_t → score → α → c_t → s̃_t → y_t` (s_t terbentuk DULU, baru dipakai cari c_t).

| | Bahdanau | Luong |
|---|---|---|
| score pakai state | $s_{t-1}$ (lama) | $s_t$ (baru) |
| score function | additive `vᵀtanh(W s + U e)` | dot / general (multiplicative) |
| `c_t` dihitung | **sebelum** `s_t` | **sesudah** `s_t` |
| prediksi dari | `s_t` | `s̃_t = tanh(W_c[c_t;s_t])` |
| sifat | lebih kompleks | lebih simpel/efisien |
> `[c_t ; s_t]` = **concat** dua vektor jadi satu yang lebih panjang (mis. dim 2+2=4).

### Formula inferensi decoder (buat soal "tuliskan formula")
**Tanpa attention** (c = $e_{terakhir}$, tetap):
$$s_0=c,\quad s_t=f(W_s s_{t-1}+U_s y_{t-1}+b_s),\quad y_t=g(W_y s_t+b_y)$$
**Dengan attention** (c_t beda tiap t):

$$c_t=\textstyle\sum_j \alpha_{t,j}e_j,\quad s_t=f(W_s s_{t-1}+U_s c_t+b_s),\quad y_t=g(W_y s_t+b_y)$$

---

## C. TRANSFORMER (self-attention scaled dot-product)

### Alur (5 langkah)
```
1. proyeksi: q=W_Q·x, k=W_K·x, v=W_V·x   (tiap token)
2. score(i,j) = q_i · k_j
3. scale: bagi √d_k
4. α = softmax per baris (token i ke semua j)
5. sa_i = Σ_j α_{ij} · v_j
```

### Contoh trace (2 token, $d_k{=}2$; $q_1{=}[1,0]\,q_2{=}[0,1]$; $k_1{=}[1,0]\,k_2{=}[0,1]$; $v_1{=}[1,2]\,v_2{=}[3,4]$)
```
token1: score=[q1·k1, q1·k2]=[1,0]
        /√2 = [0.7071, 0]
        α   = softmax([0.7071,0]) = [0.6698, 0.3302]
        sa1 = 0.6698·[1,2] + 0.3302·[3,4] = [1.6605, 2.6605]
token2: score=[0,1] → /√2=[0,0.7071] → α=[0.3302,0.6698]
        sa2 = [2.3395, 3.3395]
```

### Kenapa $\sqrt{d_k}$ (PG favorit)
Dot product dimensi besar → nilai membengkak → softmax saturasi (gradien ~0). Bagi $\sqrt{d_k}$ → varians skor ~1 → softmax sehat.

### Positional Encoding ($PE(pos,2i)=\sin(pos/10000^{2i/d})$, ganjil = cos)
Contoh d=4: pos=0 → [0,1,0,1]; pos=1 → [0.8415, 0.5403, 0.01, 1.0]. Dijumlahkan ke embedding (tanpa ini self-attention buta urutan).

### Konsep cepat
Q=apa yang dicari · K=label dicocokkan · V=isi diagregasi · multi-head=relasi beda paralel · BERT=enc-only · GPT=dec-only · T5/BART=enc-dec.

---

## D. REINFORCEMENT LEARNING (alur Q-update)

### Rumus update (beda Q-learning vs SARSA cuma 1 suku)
$$\textbf{Q-learning (off-policy):}\ Q(s,a)\leftarrow Q(s,a)+\alpha[R+\gamma\,\textstyle\max_{a'}Q(s',a')-Q(s,a)]$$
$$\textbf{SARSA (on-policy):}\ Q(s,a)\leftarrow Q(s,a)+\alpha[R+\gamma\,Q(s',a')-Q(s,a)]$$
- **max** = aksi greedy terbaik (Q-learning) · **$Q(s',a')$** = aksi yang BENAR-BENAR dipilih di s' (SARSA).
- ⚠️ **s' terminal → suku bootstrap = 0** (gak ada masa depan).
- Semua Q mulai **0**; nilai Q **terbawa** antar episode.

### Trace Q-LEARNING (Wumpus; α=0.4 γ=0.6; gold(3,2)=+10, wumpus(3,1)/pit(1,3)=−10)
```
Ep1 (1,1)→(2,1)→(3,1):
  (1,1)E: 0 + 0.4(0 + 0.6·0 − 0)        = 0
  (2,1)E: 0 + 0.4(−10 + 0 − 0)          = −4   [wumpus terminal → bootstrap 0]
Ep2 (1,1)→(1,2)→(2,2)→(3,2):
  (1,1)N: 0 ;  (1,2)E: 0
  (2,2)E: 0 + 0.4(+10 + 0 − 0)          = +4   [gold terminal]
Ep3 (1,1)→(1,2)→(1,3):
  (1,1)N: 0
  (1,2)N: 0 + 0.4(−10 + 0 − 0)          = −4   [pit terminal]

Q akhir: Q((2,1),E)=−4, Q((2,2),E)=+4, Q((1,2),N)=−4
Policy: argmax tiap state → dari (2,2) ambil E (menuju gold), hindari wumpus/pit.
```

### Trace SARSA (GridWorld; α=0.5 γ=0.9; (3,2)=+10, (3,1)=−10) — lihat efek bootstrap non-nol
```
Ep1 (1,1)↑→(1,2)→(2,2)→(3,2):
  (1,1)up   : 0 + 0.5(0 + 0.9·0 − 0)       = 0
  (1,2)right: 0 + 0.5(0 + 0.9·0 − 0)       = 0
  (2,2)right: 0 + 0.5(10 + 0.9·0 − 0)      = 5    [terminal → 0]
Ep2 (1,1)→(2,1)→(3,1):
  (1,1)right: 0
  (2,1)right: 0 + 0.5(−10 + 0 − 0)         = −5
Ep3 (1,1)→(2,1)↑→(2,2)→(3,2):
  (1,1)right: 0
  (2,1)up   : 0 + 0.5(0 + 0.9·Q((2,2),right) − 0)
            = 0 + 0.5(0 + 0.9·5)           = 2.25   ← pakai Q lama (5), bukan max!
  (2,2)right: 5 + 0.5(10 + 0.9·0 − 5)      = 7.5    ← update lagi (sudah 5 dari Ep1)

Q akhir: Q((2,2),right)=7.5, Q((2,1),up)=2.25, Q((2,1),right)=−5
```
> Kunci SARSA: di `(2,1)up`, targetnya pakai $Q(s',a')$ dengan a' = "right" (aksi yang benar dipilih), **bukan** max. Di contoh nol-awal sering sama dgn Q-learning; beda kelihatan saat sudah ada Q positif.

### Return $G_t$ (bukan update — beda soal)
$$G_t=R_{t+1}+\gamma R_{t+2}+\gamma^2 R_{t+3}+\dots$$
Contoh reward depan [0,0,+10], γ=0.6: $G=0+0.6\cdot0+0.6^2\cdot10=0.36\cdot10=$ **3.6**.

### Konsep cepat (PG)
- **on/off policy**: SARSA on (pakai aksi nyata → aman) · Q-learning off (pakai max → agresif/optimal).
- **TD vs MC**: TD update tiap langkah (bootstrap), gak nunggu episode selesai; MC nunggu $G_t$ penuh.
- **π\*(s)=argmax_a q\*(s,a)** · **γ**: kecil=myopic, besar=far-sighted · **DQN**=Q-learning+NN.

## Peta Wumpus 3×3

Koordinat $(kolom, baris)$, baris 1 di bawah. Agent gerak `up/down/left/right`.

```
        c1         c2          c3
	 ┌──────────┬──────────┬──────────────┐
r3 │    .     │    .     │  GOLD  +10   │  ← terminal (menang)
	 ├──────────┼──────────┼──────────────┤
r2 │    .     │   (s')   │ WUMPUS −10   │  ← terminal (mati)
	 │          │  (2,2)   │   (3,2)      │
	 ├──────────┼──────────┼──────────────┤
r1 │  START   │    .     │     .        │
	 │  (1,1)   │   (s)    │              │
	 └──────────┴──────────┴──────────────┘
```

**Jalur ke GOLD (3,3):** harus naik lewat kolom 1–2, lalu masuk gold dari $(2,3)$. **Kolom 3 berbahaya** karena $(3,2)$ = WUMPUS persis di bawah gold.

Cell kunci = **$(2,2)$**: dari sini
- `up` → menuju gold (bagus) → $Q\big((2,2),\texttt{up}\big) = 8$
- `right` → masuk WUMPUS (mati) → $Q\big((2,2),\texttt{right}\big) = -9$

---

## Update yang bikin SARSA ≠ Q-learning

Skenario: agent di $s=(2,1)$, ambil `up`, masuk $s'=(2,2)$, reward $R=0$.
Yang di-update: $Q\big((2,1),\texttt{up}\big)$, sekarang $= 3$. Pakai $\alpha=0.5,\ \gamma=0.9$.

Di $s'=(2,2)$, $\varepsilon$-greedy **kebetulan explore → pilih `right`** (ke arah wumpus).

**Q-learning** — pakai $\max$, cuek action aslinya:
$$Q \leftarrow 3 + 0.5\big[0 + 0.9\cdot\underbrace{\max(8,\,-9)}_{=8} - 3\big] = 3 + 0.5(7.2-3) = \mathbf{5.1}\ \uparrow$$

**SARSA** — pakai action yang BENERAN dipilih (`right`, $Q=-9$):
$$Q \leftarrow 3 + 0.5\big[0 + 0.9\cdot\underbrace{(-9)}_{\texttt{right}} - 3\big] = 3 + 0.5(-8.1-3) = \mathbf{-2.55}\ \downarrow$$

---

## Bacanya

|                | $Q\big((2,1),\texttt{up}\big)$ jadi | Artinya                                                                                          |
| -------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Q-learning** | $5.1$ (naik)                        | "Naik ke $(2,2)$ itu bagus — toh nanti aku main optimal (`up` ke gold)." Abaikan risiko explore. |
| **SARSA**      | $-2.55$ (turun)                     | "Naik ke $(2,2)$ bahaya — soalnya aku kadang explore dan bisa nyebur ke WUMPUS."                 |

Bedanya **murni** karena di $s'$ exploration milih `right` (bukan greedy `up`). Kalau di $s'$ dia milih `up`, dua-duanya pakai $Q=8$ → hasil identik $5.1$.

**Efek jangka panjang:** SARSA bakal belajar **mutar lewat kolom 1** (jauh dari wumpus, aman), Q-learning belajar jalur **mepet wumpus** (optimal kalau eksekusinya sempurna). Persis Cliff Walking, tapi versi wumpus. 🐍

Mau aku masukin contoh peta wumpus ini ke cheatsheet bagian RL?

---

## Checklist 30 detik sebelum ngerjain
1. **Enc-dec param**: tulis asumsi $n_{in}$ decoder (1 kalau c=init saja). c = 0 param.
2. **Attention**: score → softmax → weighted sum. Bahdanau (c dulu) vs Luong (s dulu, concat).
3. **Transformer**: jangan lupa **bagi √d_k** sebelum softmax.
4. **RL**: terminal → bootstrap 0. Q-learning=max, SARSA=aksi nyata. Q terbawa antar episode.
