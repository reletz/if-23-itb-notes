# Cheatsheet + Panduan Tracing UAS IF3270 — RNN · LSTM · Attention · Transformer · RL

> Forward only (tanpa BPTT/backprop). Tiap topik: **Konsep** (teori PG/benar-salah) → **Langkah** (resep) → **Contoh** (angka di-trace) → **Param**.
> Semua angka contoh sudah diverifikasi lewat skrip. ⚠️ = jebakan langganan. Lengkap sengaja — nanti kamu pilah ke A4.

## 0. Dasar
- $\sigma(z)=1/(1+e^{-z})$ · $\tanh(z)$ (kalkulator) · $\text{softmax}(z_i)=e^{z_i}/\sum_j e^{z_j}$.
  - Contoh softmax $[0.4029, 0.2106]$: e^0.4029=1.496, e^0.2106=1.234 → /2.730 → **[0.5479, 0.4521]**.
  - ⚠️ softmax aman: kurangi nilai max dulu sebelum eksponen (hasil sama, tak overflow).
- Dot $[a,b]\cdot[x,y]=ax+by$. ⊙ = elementwise.
- ⚠️ **Baris matriks bobot = bobot MENUJU neuron yang sama** (baris ke-j = neuron j). Salah baca baris/kolom = fatal.
- **Param (shared=True)**: dense $(n_{in}+1)\cdot n_{out}$ · RNN layer $n_h\cdot(n_{in}+n_h+1)$ · LSTM layer $4\cdot n_h\cdot(n_{in}+n_h+1)$. Total = jumlah semua layer (+ output dense).

---

## 1. RNN (Recurrent Neural Network)

### Konsep
- **Kenapa RNN**: data **sekuensial** (urutan/temporal penting); bobot **di-share** antar timestep → bisa proses panjang **variabel**, jumlah parameter tetap.
- ⚠️ **RNN vs FFNN**: FFNN **tidak punya memori** — memetakan input→output tanpa mengingat input sebelumnya, tak menangkap urutan walau banyak layer. RNN menyimpan konteks lewat **hidden state** yang mengalir antar timestep.
- **Pemetaan arsitektur ↔ task** (sering PG):
  - **one-to-one**: 1 input → 1 output (biasa).
  - **one-to-many**: 1 input → sekuens (image captioning).
  - **many-to-one**: sekuens → 1 output (sentiment/klasifikasi teks). ⚠️ output diambil dari **timestep TERAKHIR**.
  - **many-to-many sync** (input=output panjang): **sequence labeling / POS tagging** — output tiap timestep.
  - **many-to-many async / seq2seq** (panjang beda): translasi → butuh **encoder-decoder**.
- **Desain output layer**: klasifikasi → **softmax**, #neuron = #kelas; regresi → **1 neuron (linear)**; translasi → #neuron = **ukuran vocabulary** target.
- **Bidirectional RNN (Bi-RNN)**: dua RNN, satu maju satu mundur, lalu **digabung** (umumnya concat) → tiap posisi punya konteks masa lalu **dan** depan. ⚠️ #parameter ≈ **2×** RNN; **jumlah timestep TIDAK dilipat dua**; cocok **sequence tagging** (butuh seluruh kalimat), **bukan** real-time/forecasting; tidak mengabaikan urutan.

### Langkah forward (per timestep t, mulai h₀ = 0)
1. Untuk tiap neuron hidden j: $pre_j = (W_{xh}\,\text{baris }j)\cdot x_t + (W_{hh}\,\text{baris }j)\cdot h_{t-1} + b_{xh}[j]$.
2. $h_t[j] = \tanh(pre_j)$.
3. Output: untuk tiap neuron output o: $net_o = (W_{hy}\,\text{baris }o)\cdot h_t + b_{hy}[o]$.
4. $y_t = \text{softmax}(net)$ (atau sigmoid). **Kelas prediksi** = $\arg\max(y_t)$; ⚠️ seri → **kelas pertama**.
5. Bawa $h_t$ ke timestep berikutnya. Ulangi.

### Contoh lengkap (2 input, 3 hidden tanh, 2 output softmax; 2 timestep)
Bobot (baris = neuron tujuan): $W_{xh}=[[.1,.2],[.3,.1],[.2,.2]]$, $W_{hh}=[[.2,.3,.2],[.1,.2,.1],[.2,.1,.3]]$,
$b_{xh}=[.1,0,.1]$, $W_{hy}=[[.3,.2,.1],[.1,.2,.3]]$, $b_{hy}=[.3,.1]$, $h_0=[0,0,0]$. Input $x_1=[.4,.2]$, $x_2=[.7,.8]$.

**t=1** (h₀=0, jadi suku W_hh=0):
- neuron1: $\tanh(.1\cdot.4+.2\cdot.2+.1)=\tanh(.18)=$ **0.1781**
- neuron2: $\tanh(.3\cdot.4+.1\cdot.2+0)=\tanh(.14)=$ **0.1391**
- neuron3: $\tanh(.2\cdot.4+.2\cdot.2+.1)=\tanh(.22)=$ **0.2165** → h₁=[0.1781,0.1391,0.2165]
- output: $net_1=.3\cdot.1781+.2\cdot.1391+.1\cdot.2165+.3=0.4029$; $net_2=.1\cdot.1781+.2\cdot.1391+.3\cdot.2165+.1=0.2106$
- $y_1=\text{softmax}([0.4029,0.2106])=$ **[0.5479,0.4521]** → kelas **0** (neuron-1)

**t=2** (pakai h₁):
- neuron1: $\tanh(.1\cdot.7+.2\cdot.8 + (.2\cdot.1781+.3\cdot.1391+.2\cdot.2165) + .1)=\tanh(.4506)=$ **0.4224**
- neuron2: $\tanh(.3\cdot.7+.1\cdot.8 + (.1\cdot.1781+.2\cdot.1391+.1\cdot.2165) + 0)=\tanh(.3573)=$ **0.3428**
- neuron3: $\tanh(.2\cdot.7+.2\cdot.8 + (.2\cdot.1781+.1\cdot.1391+.3\cdot.2165) + .1)=\tanh(.5145)=$ **0.4734** → h₂=[0.4224,0.3428,0.4734]
- output: $net=[0.5426,0.3528]$ → $y_2=$ **[0.5473,0.4527]** → kelas **0**

### Param & gambar
- Param = $(n_{in}+n_h+1)\cdot n_h + (n_h+1)\cdot n_{out}$ = $(2+3+1)\cdot3+(3+1)\cdot2 = 18+8 =$ **26**.
- **Unfolded network**: satu kotak hidden per timestep (tulis **#neuron**), input vektor (tulis **#fitur**), panah $W_{hh}$ dari h_{t-1}→h_t, panah $W_{hy}$ ke output tiap t (untuk m2m), sertakan **bias**.


---

## 2. LSTM

### Konsep
- **Kenapa LSTM**: RNN biasa kena **vanishing gradient** → lupa dependensi panjang. LSTM tambah **cell state C** (jalur memori jangka panjang, update aditif) + **gate**.
- **Makna gate** (σ∈[0,1]: 0=buang, 1=pertahankan):
  - **forget f** — info cell lama mana yang dipertahankan/dibuang.
  - **input i** — berapa banyak info baru masuk ke cell.
  - **kandidat Ĉ** (tanh∈[−1,1]) — isi info baru calon.
  - **output o** — berapa banyak cell keluar jadi hidden.
- ⚠️ **RNN vs LSTM**: RNN cuma hidden state, tanpa gate; LSTM punya **cell state + 3 gate** → kontrol aliran info, tahan dependensi panjang.
- **Sequence labeling dgn LSTM**: ubah hidden state → label kelas pakai **softmax layer** setelah hidden state.

### Langkah forward (1 unit hidden; h₀=C₀=0; W_x*=bobot input, W_h*=bobot rekuren)
1. $f = \sigma(W_{xf}\cdot x + W_{hf}\cdot h_{t-1} + b_f)$
2. $i = \sigma(W_{xi}\cdot x + W_{hi}\cdot h_{t-1} + b_i)$
3. $\hat{C} = \tanh(W_{xc}\cdot x + W_{hc}\cdot h_{t-1} + b_c)$
4. $o = \sigma(W_{xo}\cdot x + W_{ho}\cdot h_{t-1} + b_o)$
5. $C_t = f\odot C_{t-1} + i\odot\hat{C}$
6. $h_t = o\odot\tanh(C_t)$ → bawa h_t, C_t ke timestep berikutnya.

### Contoh lengkap (1 unit, 2 fitur; bobot Kuis-2)
$W_{xf}=[.7,.5]\;W_{xi}=[.9,.8]\;W_{xc}=[.4,.2]\;W_{xo}=[.6,.4]$; $W_{hf}=.1\;W_{hi}=.6\;W_{hc}=.1\;W_{ho}=.2$; $b=.15/.4/.1/.2$.

**t=1**, $x=[1,2]$, h₀=C₀=0:
- $f=\sigma([.7,.5]\cdot[1,2]+.1\cdot0+.15)=\sigma(1.7+.15)=\sigma(1.85)=$ **0.8641**
- $i=\sigma([.9,.8]\cdot[1,2]+.6\cdot0+.4)=\sigma(2.5+.4)=\sigma(2.9)=$ **0.9478**
- $\hat{C}=\tanh([.4,.2]\cdot[1,2]+.1\cdot0+.1)=\tanh(.8+.1)=\tanh(.9)=$ **0.7163**
- $o=\sigma([.6,.4]\cdot[1,2]+.2\cdot0+.2)=\sigma(1.4+.2)=\sigma(1.6)=$ **0.8320**
- $C_1=0\cdot.8641+.9478\cdot.7163=$ **0.6789**; $h_1=.8320\cdot\tanh(.6789)=.8320\cdot.5908=$ **0.4916**

**t=2**, $x=[.5,3]$, h₁=0.4916, C₁=0.6789 (suku W_h* tak lagi nol):
- $f=\sigma([.7,.5]\cdot[.5,3]+.1\cdot.4916+.15)=\sigma(2.0492)=$ **0.8859** · $i=$ **0.9719** · $\hat{C}=$ **0.7394** · $o=$ **0.8579**
- $C_2=.8859\cdot.6789+.9719\cdot.7394=$ **1.3201**; $h_2=.8579\cdot\tanh(1.3201)=$ **0.7437**

### Param
- $4\cdot(n_{in}+n_h+1)\cdot n_h$ = $4\cdot(2+1+1)\cdot1 =$ **16**.

---

## 3. Encoder–Decoder & Attention

### Konsep
- **Encoder-decoder (seq2seq)**: encoder ringkas input → **context vector**; decoder bangkitkan output **autoregresif** (output timestep t jadi input t+1). ⚠️ decoder timestep-1 pakai **start-token / context**, **bukan** data latih langsung.
- **Tanpa attention**: context = **1 vektor tunggal** = hidden encoder **terakhir**; $p(y_t)=g(y_{t-1}, s_t, c)$. ⚠️ **bottleneck** untuk kalimat panjang.
- **Dengan attention**: context **beda tiap timestep decoder** (cₜ) → decoder bisa **fokus ke bagian input berbeda** tiap kata. $p(y_t)=g(y_{t-1}, s_t, c_t)$, $s_t=f(s_{t-1},y_{t-1},c_t)$.
- ⚠️ **"Paying attention" DIPELAJARI saat training** dari **parallel corpus**, tanpa anotasi alignment eksplisit (bobot attention belajar lewat backprop).
- **Bahdanau** (additive): cₜ dihitung **sebelum** sₜ → jadi **input** untuk sₜ. **Luong** (multiplicative): sₜ dihitung dulu, lalu $\tilde{s}_t=\tanh(W_c\cdot[c_t;s_t])$; lebih sederhana/efisien.
- ⚠️ Task panjang-input ≠ panjang-output (translasi) → one-to-many / many-to-one **tidak cocok**, pakai **many-to-many (enc-dec)**; #neuron output = ukuran vocabulary.

### Langkah attention (per timestep decoder t)
1. Skor tiap hidden encoder hⱼ: $score(s_t,h_j)$ (dot $s^\top h$ / general $s^\top W_a h$ / concat $v_a^\top\tanh(W_a[s;h])$).
2. $\alpha_{t,j} = \text{softmax}_j(score)$.
3. $c_t = \sum_j \alpha_{t,j}\cdot h_j$ (weighted sum hidden encoder).
4. $s_t = f(W_s\cdot s_{t-1} + U_s\cdot y_{t-1} (+c_t) + b_s)$; $y_t = g(W_y\cdot s_t + b_y)$.

### Langkah hitung parameter enc-dec
1. Encoder = satu layer rekuren atas dim input: RNN $n_h\cdot(n_{in}+n_h+1)$ atau LSTM $4\cdot n_h\cdot(...)$.
2. Decoder = satu layer rekuren; ⚠️ **asumsikan dim input decoder = dim output sebelumnya** (sebut asumsi!).
3. Output = dense $(dec_h+1)\cdot n_{out}$.
4. \+ attention: dot=0, general=$dec_h\cdot enc_h$, concat=$a\cdot(dec_h+enc_h)+a$.

### Contoh param (encoder RNN 2 neuron atas input 4-fitur; decoder RNN 2 neuron; output FC 1; input decoder dim 1)
$enc = 2\cdot(4+2+1)=$ **14**; $dec = 2\cdot(1+2+1)=$ **8**; $out = (2+1)\cdot1=$ **3** → total **25**.
+ attention general(dec_h=2,enc_h=2)=$2\cdot2=$ **4** → total **29**.

---

## 4. Transformer

### Konsep
- **"Attention is All You Need" (Vaswani 2017)**: arsitektur **berbasis attention penuh**, **meniadakan rekurensi & konvolusi total**.
- ⚠️ **Kenapa unggul vs RNN enc-dec**: RNN **sekuensial** (token t nunggu t−1); Transformer **paralel** → efisien, hapus bottleneck sekuensial, kuat **long-range**, mendukung **scaling laws** (model+data lebih besar → hasil lebih baik).
- **Self-attention** = attention **antar token sekuens yang sama** (beda dgn attention RNN: decoder→encoder).
- **Q/K/V**: tiap input diproyeksi linear → **Query** (apa yang dicari), **Key** (label dicocokkan), **Value** (isi yang diagregasi).
- **Multi-head**: beberapa head paralel, proyeksi Q/K/V sendiri → tiap head tangkap **relasi berbeda**; output di-concat lalu linear.
- ⚠️ **Positional encoding** wajib: tanpa rekurensi, self-attention memandang sekuens sebagai **himpunan tanpa orde**; info posisi **dijumlahkan** ke embedding. (tanpa PE, "Budi memukul Andi" = "Andi memukul Budi").
- **Decoder**: **masked self-attention** (cegah lihat token masa depan) + **enc-dec attention** (Q dari decoder, K/V dari encoder); tiap sublayer dibungkus **residual + layer norm**.
- Turunan: **encoder-only = BERT** (pemahaman), **decoder-only = GPT** (generasi), **enc-dec = T5/BART** (seq2seq).

### Langkah self-attention (scaled dot-product)
1. Proyeksi: $q=W_Q\cdot x$, $k=W_K\cdot x$, $v=W_V\cdot x$ tiap token.
2. Skor tiap pasang: $score(i,j)=q_i\cdot k_j$.
3. Skala: bagi $\sqrt{d_k}$.
4. $\alpha = \text{softmax}$ per baris (token i atas semua j).
5. $sa_i = \sum_j \alpha_{ij}\cdot v_j$.

### Contoh lengkap (2 token, d_k=2; misal hasil proyeksi:)
$q_1=[1,0]\;q_2=[0,1]$, $k_1=[1,0]\;k_2=[0,1]$, $v_1=[1,2]\;v_2=[3,4]$.
- **token1**: skor $[q_1\cdot k_1, q_1\cdot k_2]=[1,0]$; /√2 → $[0.7071,0]$; softmax → $\alpha=[0.6698,0.3302]$;
  $sa_1=0.6698\cdot[1,2]+0.3302\cdot[3,4]=$ **[1.6605, 2.6605]**
- **token2**: skor $[0,1]$; /√2 → $[0,0.7071]$; $\alpha=[0.3302,0.6698]$; $sa_2=$ **[2.3395, 3.3395]**
- **Positional encoding**: $PE(pos,2i)=\sin(pos/10000^{2i/d})$, $PE(pos,2i+1)=\cos(pos/10000^{2i/d})$.
- ⚠️ **√d_k** menstabilkan varians skor agar softmax tak saturasi (gradien sehat). Output: Linear→logits seukuran vocab→softmax→argmax kata.

---

## 5. Reinforcement Learning

### Konsep
- **MDP** = (States, Actions, transisi P(s'|s,a), reward R). **Markov property**: next state & reward hanya bergantung **state+aksi sekarang**, bukan riwayat.
- **Return** $G_t = R_{t+1}+\gamma R_{t+2}+\gamma^2 R_{t+3}+\dots = R_{t+1}+\gamma G_{t+1}$. **Discount γ** (0≤γ≤1): jamin **konvergen** (γ<1), wakili **ketidakpastian** masa depan, **preferensi reward cepat**. γ→0 myopic, γ→1 far-sighted.
- **Value vs Policy**: $v_\pi(s)$, $q_\pi(s,a)$ = ekspektasi Return. **Optimal policy** $\pi^*(s)=\arg\max_a q^*(s,a)$.
- **Exploration vs exploitation**: coba aksi baru vs manfaatkan yang terbaik diketahui (mis. **ε-greedy**).
- **Model-free**, **TD vs Monte Carlo**: ⚠️ TD **tak perlu menunggu episode selesai**, update **tiap timestep** via **bootstrapping**, bisa dari **sequence tak lengkap**; MC nunggu Return penuh.
- ⚠️ **On-policy SARSA** (pakai aksi nyata a' → policy **aman/hati-hati**) vs **off-policy Q-learning** (pakai **max** → policy **optimal/agresif**).
- **Episode** berakhir di **terminal state** lalu reset. **DQN** = Q-learning + **neural net** (state space besar).
- ⚠️ **Supervised vs RL**: SL butuh **pasangan (input,label)**, RL butuh **sinyal reward**; observasi RL **sekuensial**; SL belajar **pemetaan input→output**, RL belajar **policy** (aksi yang memaksimalkan return).

### Langkah TD Q-Learning
1. Inisialisasi semua $Q(s,a)=0$.
2. Untuk tiap transisi $(s \to s')$ dalam episode (urut): aksi a = arah s→s'; reward R = reward **masuk** s'.
3. $maxQ' = \max_{a'} Q(s',a')$; ⚠️ jika **s' terminal → maxQ' = 0**.
4. $Q(s,a) \leftarrow Q(s,a) + \alpha\cdot[R + \gamma\cdot maxQ' - Q(s,a)]$.
5. Lanjut transisi/episode berikutnya (nilai Q terbawa antar episode).
6. **Policy** akhir = $\arg\max_a Q(s,a)$ tiap ruang non-terminal (gambar panah).
- **SARSA**: langkah 3 diganti $Q(s',a')$ dengan a' = aksi yang **benar-benar dipilih** policy di s'.

### Contoh lengkap (Wumpus; α=0.4, γ=0.6; gold(3,2)=+10, wumpus(3,1)/pit(1,3)=−10, terminal; lainnya 0)
Episode I $(1,1)\to(2,1)\to(3,1)$:
- $(1,1)\to(2,1)$ [E]: R=0, maxQ'=0 → $Q=0+0.4(0+0.6\cdot0-0)=$ **0**
- $(2,1)\to(3,1)$ [E, wumpus terminal]: R=−10 → $Q=0+0.4(-10+0-0)=$ **−4**

Episode II $(1,1)\to(1,2)\to(2,2)\to(3,2)$:
- $(1,1)\to(1,2)$ [N]: **0** · $(1,2)\to(2,2)$ [E]: **0**
- $(2,2)\to(3,2)$ [E, gold terminal]: R=+10 → $Q=0+0.4(10)=$ **+4**

Episode III $(1,1)\to(1,2)\to(1,3)$:
- $(1,1)\to(1,2)$ [N]: **0** · $(1,2)\to(1,3)$ [N, pit terminal]: R=−10 → $Q=$ **−4**

**Q akhir** (selain 0): $Q((2,1),E)=-4$, $Q((2,2),E)=+4$, $Q((1,2),N)=-4$.
**Policy**: dari (2,2) panah **E** (menuju gold); hindari aksi ke wumpus/pit.

### Contoh Return Gₜ
Reward future $[0, 0, +10]$, γ=0.6 → $G = 0 + 0.6\cdot0 + 0.6^2\cdot10 = 0.36\cdot10 =$ **3.6**.

---

## Lampiran: hitung parameter cepat
- RNN bertumpuk (UAS): in=10 → RNN6 → RNN5 → RNN4 → dense3 → out2:
  $6\cdot(10+6+1)=102$ + $5\cdot(6+5+1)=60$ + $4\cdot(5+4+1)=40$ + $(4+1)\cdot3=15$ + $(3+1)\cdot2=8$ = **225**.
- CNN conv layer: $n_{kernel}\cdot(k_h\cdot k_w\cdot in_{ch} + 1)$. Dense: $(n_{in}+1)\cdot n_{out}$.
