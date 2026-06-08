# Paket Soal Latihan UAS IF3270 — Paket 02

Topik: RNN, LSTM, Transformer/Attention, Encoder-Decoder, Reinforcement Learning
Semester II 2025-2026 · Sifat: Latihan (Buka Catatan)
Boleh menggunakan kalkulator. Total bobot: 100.
Pembulatan: gunakan 4 angka di belakang koma bila diperlukan.

KELAS: _______   NIM: _______   NAMA: _______

---

## Bagian I — Pilihan Ganda Konsep RNN/LSTM/Transformer (Bobot: 30, @2.5)

Beri tanda (O) pada setiap pilihan yang **tepat**, tanda (X) pada setiap pilihan yang **salah**.
Pilihan yang tidak diberi tanda tidak mendapat nilai. Nilai penuh per nomor hanya bila **semua** opsi diberi tanda benar.

1. Mengenai motivasi penggunaan RNN dibanding FFNN untuk data sekuensial:
   a. ( ) FFNN tidak memiliki memori antar input, sehingga tidak menangkap urutan walau ditambah banyak layer.
   b. ( ) RNN menyimpan konteks lewat hidden state yang mengalir antar timestep.
   c. ( ) Bobot RNN di-share antar timestep sehingga jumlah parameter tetap untuk panjang sekuens variabel.
   d. ( ) FFNN selalu lebih unggul dari RNN pada data teks karena lebih dalam.

2. Mengenai pemetaan arsitektur RNN ke task:
   a. ( ) many-to-one cocok untuk klasifikasi sentimen, output diambil dari timestep terakhir.
   b. ( ) many-to-many sync (panjang input = output) cocok untuk POS tagging / sequence labeling.
   c. ( ) one-to-many cocok untuk image captioning.
   d. ( ) Translasi (panjang input ≠ output) paling cocok dimodelkan one-to-one.

3. Mengenai desain output layer RNN:
   a. ( ) Klasifikasi menggunakan softmax dengan jumlah neuron = jumlah kelas.
   b. ( ) Regresi menggunakan 1 neuron linear.
   c. ( ) Untuk translasi, jumlah neuron output = ukuran vocabulary target.
   d. ( ) Jumlah neuron output selalu sama dengan jumlah neuron hidden.

4. Mengenai Bidirectional RNN (Bi-RNN):
   a. ( ) Menggabungkan satu RNN maju dan satu RNN mundur (umumnya concat).
   b. ( ) Jumlah parameter kira-kira 2× RNN satu arah.
   c. ( ) Jumlah timestep menjadi dua kali lipat akibat dua arah.
   d. ( ) Cocok untuk real-time forecasting yang hanya tahu masa lalu.

5. Mengenai cell state dan gate pada LSTM:
   a. ( ) Cell state adalah jalur memori jangka panjang dengan update bersifat aditif.
   b. ( ) Forget gate menentukan info cell lama mana yang dipertahankan atau dibuang.
   c. ( ) Input gate mengatur berapa banyak info baru masuk ke cell.
   d. ( ) Output gate menggunakan tanh agar nilainya berada di [0, 1].

6. Mengenai perbedaan RNN biasa dan LSTM:
   a. ( ) RNN biasa rawan vanishing gradient untuk dependensi panjang.
   b. ( ) LSTM menambah cell state dan 3 gate untuk mengontrol aliran info.
   c. ( ) RNN biasa memiliki gate forget, input, dan output seperti LSTM.
   d. ( ) Kandidat Ĉ menggunakan tanh sehingga nilainya di rentang [−1, 1].

7. Mengenai encoder-decoder (seq2seq) tanpa attention:
   a. ( ) Encoder meringkas seluruh input menjadi satu context vector.
   b. ( ) Context vector tanpa attention diambil dari hidden encoder terakhir.
   c. ( ) Context vector tunggal menimbulkan bottleneck untuk kalimat panjang.
   d. ( ) Decoder timestep-1 langsung memakai data latih, bukan start-token/context.

8. Mengenai attention pada encoder-decoder:
   a. ( ) Dengan attention, context berbeda tiap timestep decoder (cₜ).
   b. ( ) Bobot attention ("paying attention") dipelajari saat training lewat backprop.
   c. ( ) Attention membutuhkan anotasi alignment eksplisit pada data latih.
   d. ( ) Attention membuat decoder bisa fokus ke bagian input berbeda tiap kata.

9. Mengenai perbedaan Bahdanau vs Luong attention:
   a. ( ) Bahdanau (additive): cₜ dihitung sebelum sₜ sehingga menjadi input untuk sₜ.
   b. ( ) Luong (multiplicative): sₜ dihitung dulu, lalu s̃ₜ = tanh(W_c·[cₜ; sₜ]).
   c. ( ) Fungsi scoring dapat berupa dot (sᵀh), general (sᵀWₐh), atau concat (vₐᵀtanh(Wₐ[s; h])).
   d. ( ) Pada Luong, cₜ selalu menjadi input bagi perhitungan sₜ persis seperti Bahdanau.

10. Mengenai Transformer ("Attention is All You Need", Vaswani 2017):
    a. ( ) Arsitektur berbasis attention penuh, meniadakan rekurensi dan konvolusi.
    b. ( ) Lebih unggul dari RNN enc-dec karena dapat diproses paralel (tak menunggu token sebelumnya).
    c. ( ) Positional encoding wajib karena self-attention memandang sekuens sebagai himpunan tanpa orde.
    d. ( ) Transformer tetap memproses token secara sekuensial seperti RNN.

11. Mengenai komponen self-attention dan multi-head:
    a. ( ) Q/K/V adalah proyeksi linear: Query (apa yang dicari), Key (label dicocokkan), Value (isi diagregasi).
    b. ( ) Self-attention adalah attention antar token pada sekuens yang sama.
    c. ( ) Pembagian √d_k menstabilkan varians skor agar softmax tak saturasi.
    d. ( ) Multi-head menggunakan satu proyeksi Q/K/V yang sama untuk semua head.

12. Mengenai konsep Reinforcement Learning:
    a. ( ) TD tidak perlu menunggu episode selesai; update tiap timestep via bootstrapping.
    b. ( ) Monte Carlo menunggu Return penuh hingga episode berakhir.
    c. ( ) Q-learning (off-policy) memakai max Q' sehingga policy cenderung optimal/agresif.
    d. ( ) SARSA (on-policy) memakai max Q' juga, sama persis dengan Q-learning.

## Bagian II — RNN Sync Many-to-Many Forward (Bobot: 25)

Diberikan RNN sync many-to-many: **2 fitur input**, 1 hidden layer berisi **3 neuron** (aktivasi tanh),
dan output **2 neuron** (aktivasi softmax). Baris matriks menyatakan bobot menuju neuron yang sama.
Terdapat 2 timestep, diawali t=1, dengan h0 = [0, 0, 0].

- W_xh (input→hidden): baris 1 = [0.1, 0.2]; baris 2 = [0.3, 0.1]; baris 3 = [0.2, 0.2]
- W_hh (hidden t-1→hidden t): baris 1 = [0.2, 0.3, 0.2]; baris 2 = [0.1, 0.2, 0.1]; baris 3 = [0.2, 0.1, 0.3]
- b_xh (bias hidden): [0.1, 0.0, 0.1]
- W_hy (hidden→output): baris 1 = [0.3, 0.2, 0.1]; baris 2 = [0.1, 0.2, 0.3]
- b_hy (bias output): [0.3, 0.1]

Input: x(1) = [0.4, 0.2], x(2) = [0.7, 0.8].
Asumsi: jika hasil kelas seimbang (seri), dipilih kelas pertama.

a. (Nilai 4) Gambarkan unfolded network lengkap dengan bias. Input ditulis sebagai vektor dengan jelas banyaknya fitur; hidden layer sebagai kotak dengan jelas banyaknya neuron.
b. (Nilai 8) Forward propagation: hitung nilai ketiga neuron hidden pada t=1 dan t=2. Tuliskan rumus dan substitusinya.
c. (Nilai 8) Hitung nilai output layer pada t=1 dan t=2, termasuk kelas hasil prediksinya.
d. (Nilai 5) Hitung jumlah parameter (trainable) model RNN tersebut (shared parameter = True).

## Bagian III — Encoder-Decoder & Attention (Bobot: 25)

Tinjau sebuah arsitektur encoder-decoder seq2seq.
Asumsi: dimensi input decoder = jumlah neuron output.

a. (Nilai 7) Hitung jumlah parameter bila encoder = 1 layer **LSTM 2 neuron** di atas input **3 fitur**, decoder = 1 layer **LSTM 2 neuron**, dan output = **FC 2 neuron**. Tuliskan rincian per komponen.
b. (Nilai 6) Jika ditambahkan **1 unit attention dengan scoring general** pada arsitektur (a), hitung tambahan parameter dan total parameter baru.
c. (Nilai 6) Tuliskan formula inferensi decoder **tanpa attention** (gunakan f untuk hidden, g untuk output). Jelaskan dari mana seed s0 dan y0 berasal.
d. (Nilai 6) Tuliskan formula inferensi decoder **dengan attention** (sertakan α_t, c_t). Jelaskan perbedaan Bahdanau vs Luong dalam penempatan c_t.

## Bagian IV — Reinforcement Learning (Bobot: 20)

1. (Nilai 6) Lengkapi tabel perbandingan supervised learning vs reinforcement learning.

   | Aspek | Supervised Learning | Reinforcement Learning |
   | ----- | ------------------- | ---------------------- |
   | Informasi yang diperlukan agen |  |  |
   | Data observasi bersifat sekuensial? (Ya/Tidak/Belum tentu) |  |  |
   | Apa yang dipelajari agen? |  |  |

2. Wumpus World pada grid berikut. Gold di (3,2) dengan reward **+10**, Wumpus di (3,1) dengan reward **−10** (keduanya **terminal**), reward state lain = 0. Aksi tersedia: N/E/S/W. Gunakan **TD Q-Learning**, semua Q awal = 0, **α = 0.5**, **γ = 0.9**.

   Episode yang dijalani agen (berurutan):
   - Episode I: (1,1) → (1,2) → (2,2) → (3,2)
   - Episode II: (1,1) → (2,1) → (3,1)
   - Episode III: (1,1) → (2,1) → (2,2) → (3,2)

   (i) (Nilai 8) Tuliskan update Q(s,a) secara rinci untuk setiap transisi pada ketiga episode (rumus → substitusi → hasil). Ingat: jika s' terminal maka maxQ' = 0, dan nilai Q terbawa antar episode.
   (ii) (Nilai 3) Gambarkan grid berisi nilai Q(s,a) terakhir (ASCII atau mermaid).
   (iii) (Nilai 3) Tentukan policy argmax_a Q(s,a) untuk tiap ruang non-terminal yang sudah memiliki nilai.
