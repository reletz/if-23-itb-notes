# Paket Soal Latihan UAS IF3270 — Paket 01

Topik: RNN, LSTM, Transformer, Encoder-Decoder & Attention, Reinforcement Learning
Semester II 2025-2026 · Sifat: Latihan (Buka Catatan)
Boleh menggunakan kalkulator. Total bobot: 100.
Pembulatan: gunakan 4 angka di belakang koma bila diperlukan.

KELAS: _______   NIM: _______   NAMA: _______

---

## Bagian I — Pilihan Ganda: Konsep RNN, LSTM, Transformer  (Bobot: 30, @2.5)

Beri tanda (O) pada setiap pilihan yang **tepat**, tanda (X) pada setiap pilihan yang **salah**.
Pilihan yang tidak diberi tanda tidak mendapat nilai. **Nilai per nomor diberikan hanya bila SEMUA opsi ditandai dengan benar.**

1. Tentang motivasi penggunaan RNN:
   a. ( ) RNN cocok untuk data sekuensial karena urutan/temporal antarelemen bermakna.
   b. ( ) Bobot RNN di-share antar timestep sehingga dapat memproses sekuens berpanjang variabel dengan jumlah parameter tetap.
   c. ( ) RNN memerlukan jumlah parameter yang bertambah seiring panjang sekuens input.
   d. ( ) RNN menyimpan konteks masa lalu melalui hidden state yang mengalir antar timestep.

2. Tentang perbandingan RNN dengan FFNN:
   a. ( ) FFNN tidak memiliki memori sehingga tidak menangkap urutan input meskipun layer-nya banyak.
   b. ( ) Menambah jumlah layer pada FFNN otomatis membuatnya mampu mengingat input sebelumnya seperti RNN.
   c. ( ) RNN menangkap dependensi antar timestep lewat hidden state, sedangkan FFNN memetakan input→output tanpa mengingat input sebelumnya.

3. Pemetaan arsitektur RNN ke jenis task:
   a. ( ) Sentiment analysis (klasifikasi satu label untuk satu kalimat) adalah task many-to-one.
   b. ( ) Image captioning (satu gambar → barisan kata) adalah task one-to-many.
   c. ( ) POS tagging / sequence labeling dengan panjang input = panjang output adalah many-to-many sinkron.
   d. ( ) Mesin penerjemah dengan panjang input ≠ panjang output paling tepat dimodelkan sebagai one-to-one.

4. Pada RNN many-to-one:
   a. ( ) Output diambil dari hidden state timestep terakhir.
   b. ( ) Output dihasilkan pada setiap timestep dan semuanya dipakai sebagai hasil akhir.
   c. ( ) Cocok untuk klasifikasi keseluruhan sekuens menjadi satu label.

5. Desain layer output RNN:
   a. ( ) Untuk klasifikasi multi-kelas, output memakai softmax dengan jumlah neuron = jumlah kelas.
   b. ( ) Untuk regresi, output umumnya 1 neuron dengan aktivasi linear.
   c. ( ) Untuk task translasi, jumlah neuron output = ukuran vocabulary target.
   d. ( ) Untuk regresi, output sebaiknya memakai softmax dengan banyak neuron.

6. Tentang Bidirectional RNN (Bi-RNN):
   a. ( ) Bi-RNN memakai dua RNN, satu memproses maju dan satu mundur, lalu hasilnya digabung.
   b. ( ) Bi-RNN melipatduakan jumlah timestep yang diproses.
   c. ( ) Bi-RNN cocok untuk forecasting real-time karena hanya butuh konteks masa lalu.
   d. ( ) Bi-RNN cocok untuk sequence tagging yang membutuhkan konteks seluruh kalimat.

7. Tentang gate pada LSTM:
   a. ( ) Forget gate menentukan informasi cell state lama yang dipertahankan atau dibuang.
   b. ( ) Input gate menentukan seberapa banyak informasi baru masuk ke cell state.
   c. ( ) Candidate (Ĉ) memakai aktivasi sigmoid sehingga bernilai pada rentang [0, 1].
   d. ( ) Output gate menentukan bagian cell state yang dikeluarkan menjadi hidden state.

8. Tentang cell state dan perbandingan RNN vs LSTM:
   a. ( ) Cell state LSTM merupakan jalur memori jangka panjang dengan update yang bersifat aditif.
   b. ( ) RNN biasa memiliki cell state dan tiga gate seperti LSTM.
   c. ( ) LSTM dirancang untuk meredam masalah vanishing gradient pada dependensi panjang.

9. Tentang sequence labeling memakai LSTM/RNN:
   a. ( ) Hidden state pada tiap timestep dapat dipetakan ke label kelas melalui layer softmax.
   b. ( ) Sequence labeling menghasilkan satu output saja untuk seluruh sekuens.
   c. ( ) Jumlah neuron softmax pada sequence labeling = jumlah kelas label.

10. Tentang Transformer dan paper "Attention is All You Need":
    a. ( ) Transformer adalah arsitektur berbasis attention penuh yang meniadakan rekurensi dan konvolusi.
    b. ( ) Transformer memproses token secara sekuensial, satu per satu seperti RNN.
    c. ( ) Sifat paralel Transformer menghilangkan bottleneck sekuensial dan memperkuat penangkapan relasi long-range.

11. Tentang self-attention, Q/K/V, dan multi-head:
    a. ( ) Self-attention menghitung attention antar token dalam sekuens yang sama.
    b. ( ) Query, Key, dan Value diperoleh dari proyeksi linear pada input.
    c. ( ) Multi-head attention memakai beberapa head paralel agar tiap head menangkap relasi yang berbeda.
    d. ( ) Skor attention dibagi √d_k untuk menstabilkan varians skor agar softmax tidak saturasi.

12. Tentang positional encoding, masking, dan turunan Transformer:
    a. ( ) Positional encoding diperlukan karena tanpa rekurensi self-attention memandang sekuens sebagai himpunan tanpa orde.
    b. ( ) Masked self-attention pada decoder mencegah token melihat token masa depan.
    c. ( ) Pada enc-dec attention, Query berasal dari decoder sedangkan Key/Value berasal dari encoder.
    d. ( ) BERT adalah model encoder-only, GPT adalah decoder-only, dan T5 berarsitektur encoder-decoder.

## Bagian II — RNN Sinkron Many-to-Many: Forward Propagation  (Bobot: 25)

Diberikan RNN many-to-many sinkron: 2 fitur input, 1 hidden layer berisi **2 neuron** dengan
aktivasi tanh, dan layer output berisi **2 neuron** dengan aktivasi softmax. Baris matriks
bobot menyatakan bobot menuju neuron yang sama. h0 = [0, 0]. Terdapat 2 timestep (t=1, t=2).

- W_xh (input→hidden): baris 1 = [0.1, 0.2]; baris 2 = [0.2, 0.1]
- W_hh (hidden t-1→hidden t): baris 1 = [0.1, 0.2]; baris 2 = [0.2, 0.1]
- b_xh (bias hidden): [0.1, 0.1]
- W_hy (hidden→output): baris 1 = [0.2, 0.1]; baris 2 = [0.1, 0.2]
- b_hy (bias output): [0.1, 0.1]

Input: x(1) = [0.5, 0.3], x(2) = [0.2, 0.6].
Asumsi: jika hasil kelas seimbang (seri), dipilih kelas pertama.

a. (Nilai 4) Gambarkan unfolded network lengkap dengan bias. Input boleh ditulis sebagai vektor dengan jelas banyaknya fitur; hidden layer sebagai kotak dengan jelas banyaknya neuron.
b. (Nilai 8) Forward propagation: hitung nilai kedua neuron hidden pada t=1 dan pada t=2.
c. (Nilai 8) Hitung nilai output layer pada t=1 dan t=2, termasuk kelas hasil prediksi pada masing-masing timestep.
d. (Nilai 5) Hitung jumlah parameter (trainable) model RNN tersebut.

## Bagian III — Encoder-Decoder & Attention  (Bobot: 25)

Diberikan model encoder-decoder untuk task seq2seq. Untuk perhitungan jumlah parameter,
nyatakan asumsi yang Anda pakai (khususnya dimensi input decoder).

a. (Nilai 7) Hitung jumlah parameter model jika encoder adalah 1 layer **RNN berisi 2 neuron** atas input vektor **4 fitur**, decoder adalah 1 layer **RNN berisi 2 neuron**, dan output adalah layer **fully-connected 1 neuron**.
b. (Nilai 6) Hitung jumlah parameter total jika pada model di (a) ditambahkan **1 unit attention** dengan fungsi scoring **general**. Sebutkan asumsi konvensi scoring yang dipakai.
c. (Nilai 6) Tuliskan formula tahap inferensi decoder **tanpa attention**. Gunakan f sebagai aktivasi hidden dan g sebagai aktivasi output. Sebutkan dari mana seed state awal dan token awal diperoleh.
d. (Nilai 6) Tuliskan formula tahap inferensi decoder **dengan attention**, dengan α_t menyatakan attention weights. Sertakan perhitungan context vector dan bagaimana ia masuk ke perhitungan hidden state.

## Bagian IV — Reinforcement Learning  (Bobot: 20)

1. (Nilai 6) Lengkapi tabel perbandingan supervised learning vs reinforcement learning berikut.

| Aspek | Supervised Learning | Reinforcement Learning |
| ----- | ------------------- | ---------------------- |
| Informasi yang diperlukan agen |  |  |
| Data observasi bersifat sekuensial? (Ya / Tidak / Belum tentu) |  |  |
| Apa yang dipelajari agen? |  |  |

2. Wumpus World. Agen berada pada grid dengan state = (kolom, baris). Gold berada di (3,2)
   dengan reward **+10**, wumpus di (3,1) dengan reward **−10**, dan pit di (1,3) dengan reward
   **−10** (ketiganya state terminal). Reward untuk aksi lainnya = 0. Aksi tersedia: N, E, S, W.
   Gunakan **Temporal Difference Q-Learning** dengan semua Q awal = 0, learning rate **α = 0.4**,
   dan discount **γ = 0.6**. Urutan episode:
   - Episode I: (1,1) → (2,1) → (3,1)
   - Episode II: (1,1) → (1,2) → (2,2) → (3,2)
   - Episode III: (1,1) → (1,2) → (1,3)

   (i) (Nilai 8) Tuliskan update Q(s,a) secara rinci untuk setiap transisi pada ketiga episode (urut). Sertakan formula update yang dipakai.
   (ii) (Nilai 3) Gambarkan grid yang berisi nilai Q(s,a) terakhir (boleh ASCII atau mermaid).
   (iii) (Nilai 3) Tentukan aksi terbaik untuk tiap ruang non-terminal berdasarkan Q(s,a) terakhir.
