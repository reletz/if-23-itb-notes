# Paket Soal Latihan UAS IF3270 — Paket 03

Topik: RNN, LSTM, Transformer/Attention, Encoder-Decoder, Reinforcement Learning
Semester II 2025-2026 · Sifat: Latihan (Buka Catatan)
Boleh menggunakan kalkulator. Total bobot: 100.
Pembulatan: gunakan 4 angka di belakang koma bila diperlukan.

KELAS: _______   NIM: _______   NAMA: _______

---

## Bagian I — Pilihan Ganda Konsep RNN/LSTM/Transformer (Bobot: 30, @2.5)

Beri tanda (O) pada setiap pilihan yang **tepat**, tanda (X) pada yang **salah**.
Pilihan yang tidak diberi tanda tidak mendapat nilai. Nilai penuh per nomor hanya
bila **semua** opsi pada nomor itu ditandai dengan benar.

1. Tentang pemetaan arsitektur RNN ke task:
   a. ( ) **many-to-one** cocok untuk klasifikasi sentimen sebuah kalimat.
   b. ( ) Pada many-to-one, output diambil dari hidden state timestep **pertama**.
   c. ( ) **many-to-many sync** (panjang input = output) cocok untuk POS tagging.
   d. ( ) **one-to-many** cocok untuk image captioning.

2. Tentang many-to-one:
   a. ( ) Output prediksi diambil dari output timestep **terakhir**.
   b. ( ) Seluruh timestep antara tetap dihitung untuk membangun konteks akhir.
   c. ( ) Hidden state timestep awal langsung dipakai sebagai keputusan akhir.

3. Tentang Bidirectional RNN (Bi-RNN):
   a. ( ) Terdiri dari dua RNN: satu memproses maju, satu mundur, lalu digabung.
   b. ( ) Jumlah parameter kira-kira **2×** RNN satu arah.
   c. ( ) Jumlah timestep ikut **dilipat dua** menjadi 2× panjang sekuens.
   d. ( ) Cocok untuk forecasting real-time yang hanya punya konteks masa lalu.

4. Tentang desain output layer RNN:
   a. ( ) Klasifikasi multi-kelas → **softmax** dengan #neuron = #kelas.
   b. ( ) Regresi → **1 neuron linear**.
   c. ( ) Translasi mesin → #neuron = ukuran **vocabulary** target.
   d. ( ) Klasifikasi biner cukup memakai output linear tanpa aktivasi apa pun.

5. Tentang RNN vs FFNN:
   a. ( ) FFNN tidak punya memori antar input sehingga tak menangkap urutan.
   b. ( ) RNN menyimpan konteks lewat hidden state yang mengalir antar timestep.
   c. ( ) Menambah banyak layer pada FFNN otomatis memberinya memori sekuensial.

6. Tentang LSTM:
   a. ( ) Cell state menyediakan jalur memori jangka panjang dengan update aditif.
   b. ( ) Gate **forget** mengatur info cell lama mana yang dipertahankan/dibuang.
   c. ( ) RNN biasa juga memiliki cell state dan tiga gate seperti LSTM.
   d. ( ) Gate **input** mengatur seberapa banyak info baru masuk ke cell.

7. Tentang encoder-decoder tanpa attention:
   a. ( ) Context vector = hidden state encoder **terakhir** (satu vektor tunggal).
   b. ( ) Untuk kalimat panjang, satu context vektor menimbulkan **bottleneck**.
   c. ( ) Decoder pada timestep-1 memakai data latih target secara langsung.

8. Tentang attention:
   a. ( ) Context vector berbeda pada tiap timestep decoder (cₜ).
   b. ( ) Bobot attention dipelajari saat training lewat backprop, tanpa anotasi alignment eksplisit.
   c. ( ) Attention membuat decoder bisa fokus ke bagian input berbeda tiap kata.
   d. ( ) Attention mengharuskan panjang input dan output selalu sama persis.

9. Tentang positional encoding pada Transformer:
   a. ( ) Diperlukan karena self-attention memandang sekuens sebagai himpunan tanpa orde.
   b. ( ) Informasi posisi **dijumlahkan** ke embedding token.
   c. ( ) Tanpa positional encoding, urutan kata tidak dapat dibedakan model.

10. Tentang scaled dot-product attention:
    a. ( ) Skor dibagi **√dₖ** untuk menstabilkan varians sebelum softmax.
    b. ( ) Pembagian √dₖ mencegah softmax saturasi sehingga gradien tetap sehat.
    c. ( ) Pembagian √dₖ bertujuan menormalkan agar jumlah skor menjadi 1.

11. Tentang Transformer secara umum:
    a. ( ) Meniadakan rekurensi dan konvolusi, sepenuhnya berbasis attention.
    b. ( ) Komputasi antar token dapat **diparalelkan** (tak menunggu token sebelumnya).
    c. ( ) Self-attention adalah attention antar token pada sekuens yang sama.
    d. ( ) Encoder-only menghasilkan keluarga model **GPT**.

12. Tentang Reinforcement Learning:
    a. ( ) Episode berakhir di sebuah **terminal state** lalu lingkungan direset.
    b. ( ) Optimal policy memenuhi **π*(s) = argmaxₐ q*(s,a)**.
    c. ( ) TD learning harus menunggu seluruh episode selesai sebelum melakukan update.
    d. ( ) Q-learning bersifat off-policy karena memakai **max** atas aksi berikutnya.

## Bagian II — RNN Sync Many-to-Many Forward (Bobot: 25)

Diberikan RNN dengan **2 fitur input**, **1 hidden layer berisi 2 neuron** (aktivasi
**tanh**), dan **output 3 neuron** (aktivasi **softmax**). Konvensi: **baris matriks
bobot = bobot menuju neuron yang sama**. Hidden awal h(0) = [0, 0]. Diproses
**2 timestep** secara sync many-to-many (ada output di tiap timestep).

Bobot input → hidden:

```
W_xh = [[0.2, 0.1],
        [0.1, 0.3]]      b_xh = [0.0, 0.1]
```

Bobot hidden → hidden (rekuren):

```
W_hh = [[0.2, 0.1],
        [0.1, 0.2]]
```

Bobot hidden → output:

```
W_hy = [[0.1, 0.2],
        [0.3, 0.1],
        [0.2, 0.2]]      b_hy = [0.1, 0.0, 0.1]
```

Input: x(1) = [0.6, 0.4] ; x(2) = [0.3, 0.5].

a. (Nilai 4) Gambarkan **unfolded network** untuk kedua timestep: tunjukkan kotak
   hidden (beserta jumlah neuron), input (jumlah fitur), output, panah rekuren
   W_hh dan panah W_hy ke output tiap timestep, serta sebutkan letak **bias**.
b. (Nilai 8) Hitung nilai **kedua neuron hidden** pada t = 1 dan t = 2. Sertakan
   formula tiap neuron.
c. (Nilai 8) Hitung **output** (softmax) pada t = 1 dan t = 2, lalu tentukan
   **kelas prediksi** tiap timestep (jika seri, ambil kelas pertama).
d. (Nilai 5) Hitung **jumlah parameter** total jaringan ini. Tuliskan rincian
   rumusnya.

## Bagian III — Encoder-Decoder & Attention (Bobot: 25)

Asumsi yang berlaku untuk seluruh bagian: **dimensi input decoder = jumlah neuron
output**.

a. (Nilai 7) Hitung **jumlah parameter** sebuah model encoder-decoder dengan:
   encoder = 1 layer **RNN 3 neuron** atas input **4 fitur**; decoder = 1 layer
   **RNN 3 neuron**; output = **FC 1 neuron**. Tuliskan rincian per komponen.
b. (Nilai 6) Jika model pada (a) ditambah **1 attention unit dengan scoring
   "general"** (`sᵀ Wₐ h`), berapa tambahan parameter dan berapa total parameter
   baru? Tuliskan rumusnya.
c. (Nilai 6) Tuliskan **formula inferensi decoder TANPA attention** (gunakan f untuk
   fungsi hidden dan g untuk fungsi output). Sebutkan dari mana seed s₀ dan y₀
   berasal.
d. (Nilai 6) Tuliskan **formula inferensi decoder DENGAN attention**. Sertakan
   perhitungan bobot attention dan context vektor. Sebutkan tiga varian scoring
   Luong (dot / general / concat).

## Bagian IV — Reinforcement Learning (Bobot: 20)

1. (Nilai 6) Lengkapi tabel perbandingan **Supervised Learning vs Reinforcement
   Learning** berikut.

   | Aspek | Supervised Learning | Reinforcement Learning |
   | ----- | ------------------- | ---------------------- |
   | Informasi/sinyal yang diperlukan agen |  |  |
   | Observasi bersifat sekuensial? |  |  |
   | Apa yang dipelajari agen? |  |  |

2. **Wumpus World** pada grid. Sel **gold (3,2) = +10**, **wumpus (3,1) = −10**,
   **pit (2,3) = −10** (ketiganya **terminal**), reward sel lain = 0. Aksi tersedia:
   N, E, S, W. Gunakan **TD Q-Learning** dengan semua Q awal = 0, **α = 0.3**,
   **γ = 0.5**. Reward yang dipakai saat transisi `s → s'` adalah reward **masuk**
   ke s'. Jika s' terminal, maka maxQ' = 0. Episode dijalankan berurutan (nilai Q
   terbawa antar episode):

   - Episode I: (1,1) → (2,1) → (3,1)
   - Episode II: (1,1) → (1,2) → (1,3) → (2,3)
   - Episode III: (1,1) → (1,2) → (2,2) → (3,2)

   (i) (Nilai 8) Tuliskan **update Q(s,a) rinci** untuk setiap transisi pada ketiga
       episode. Sertakan rumus update.

   (ii) (Nilai 3) Gambarkan **grid berisi nilai Q(s,a) terakhir** (boleh ASCII atau
        mermaid).

   (iii) (Nilai 3) Tentukan **policy** (argmaxₐ Q(s,a)) untuk ruang non-terminal yang
         sudah memiliki nilai Q, khususnya dari sel (2,2).
