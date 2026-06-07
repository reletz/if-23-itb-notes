# Paket Soal Latihan UAS IF3270 Pembelajaran Mesin

Topik: CNN, RNN, LSTM
Semester II 2025-2026 · Sifat: Latihan (Buka Catatan)
Boleh menggunakan kalkulator. Total bobot: 100.
Pembulatan: gunakan 4 angka di belakang koma bila diperlukan.

KELAS: _______   NIM: _______   NAMA: _______

---

## Bagian I — CNN (Bobot: 35)

Diberikan encoder CNN dengan input berukuran 3×3×1. Layer konvolusi **L1**: 1 kernel
berukuran 2×2, stride 1, tanpa padding; tahap detector ReLU; tahap pooling dengan
fungsi maksimum, kernel 2×2, tanpa padding, stride 1.

Kernel (bias 0.5):

```
1   0
0  -1
```

Data input x:

```
1  0  1
0  1  1
1  0  0
```

a. (Nilai 5) Tentukan ukuran feature map setelah tahap konvolusi dan setelah maxpooling pada L1.
b. (Nilai 5) Untuk receptive field pertama, berikan detail perhitungan proses konvolusi.
c. (Nilai 15) Lanjutkan forward propagation L1. Berikan output di akhir setiap tahap (konvolusi, detector, pooling) secara eksplisit, serta vektor hasil flatten.
d. (Nilai 5) Hitung jumlah parameter (trainable) layer konvolusi L1 (shared parameter = True).
e. (Nilai 5) Gambarkan arsitektur encoder CNN tersebut; hidden layer digambarkan sebagai kotak dengan menuliskan ukuran feature map.

## Bagian II — RNN (Bobot: 35)

Diberikan RNN many-to-many: 2 atribut input, 1 hidden layer berisi 3 neuron, dan 2
neuron output. Baris matriks menyatakan bobot menuju neuron yang sama. Fungsi aktivasi
hidden = tanh, output = softmax. Terdapat 2 timestep, diawali t=1, dengan h0 = [0, 0, 0].

- w_xh (input→hidden): baris 1 = [0.1, 0.2]; baris 2 = [0.3, 0.1]; baris 3 = [0.2, 0.2]
- b_xh (bias hidden): [0.1, 0.0, 0.1]
- w_hh (hidden t-1→hidden t): baris 1 = [0.2, 0.3, 0.2]; baris 2 = [0.1, 0.2, 0.1]; baris 3 = [0.2, 0.1, 0.3]
- w_hy (hidden→output): baris 1 = [0.3, 0.2, 0.1]; baris 2 = [0.1, 0.2, 0.3]
- b_hy (bias output): [0.3, 0.1]

Input: x(1) = [0.4, 0.2], x(2) = [0.7, 0.8].
Asumsi: jika hasil kelas seimbang, dipilih kelas pertama.

| No | Pertanyaan | Jawaban |
| -- | ---------- | ------- |
| 1 | (Nilai 5) Gambarkan unfolded network lengkap dengan bias. Input boleh ditulis sebagai vektor dengan jelas banyaknya fitur; hidden layer sebagai kotak dengan jelas banyaknya neuron. |  |
| 2 | (Nilai 6) Forward propagation: hitung nilai ketiga neuron hidden pada t=1. |  |
| 3 | (Nilai 6) Forward propagation: hitung nilai ketiga neuron hidden pada t=2. |  |
| 4 | (Nilai 8) Hitung nilai output layer pada t=1, termasuk kelas hasil prediksinya. |  |
| 5 | (Nilai 5) Hitung nilai output layer pada t=2, termasuk kelas hasil prediksinya. |  |
| 6 | (Nilai 5) Hitung jumlah parameter model RNN tersebut. |  |

## Bagian III — LSTM (Bobot: 30)

Diketahui LSTM dengan 1 unit hidden dan 2 input, dengan bobot:

- Wxf = [0.7, 0.5], Wxi = [0.9, 0.8], Wxc = [0.4, 0.2], Wxo = [0.6, 0.4]
- Whf = [0.1], Whi = [0.6], Whc = [0.1], Who = [0.2]
- bias: bf = 0.15, bi = 0.4, bc = 0.1, bo = 0.2

Dengan x(1) = [1, 2], h0 = [0], C0 = [0].

1. (Nilai 20) Tuliskan rumus, lengkapi, dan gunakan rumus untuk menghitung C(t) dan h(t) pada t=1; di dalamnya tuliskan isi rumus dan perhitungan f1, i1, Ĉ1, o1 terlebih dahulu.
2. (Nilai 6) Jelaskan definisi berbagai simbol pada penghitungan LSTM di nomor (1): f, i, Ĉ, o, C, h.
3. (Nilai 4) Jelaskan perbedaan antara RNN dan LSTM.
