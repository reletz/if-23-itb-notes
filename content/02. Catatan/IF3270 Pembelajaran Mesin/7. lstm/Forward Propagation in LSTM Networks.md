---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Forward Propagation in LSTM Networks
>
> > ## Questions/Cues
> >
> > - Bagaimana urutan perhitungan forward propagation LSTM per timestep?
> > - Bagaimana mengimplementasikan LSTM many-to-one di Keras?
> > - Bagaimana menghitung jumlah parameter sebuah lapisan LSTM?
> > - Mengapa muncul faktor ×4 dalam rumus parameter LSTM?
> > - Bagaimana evolusi dari RNN ke LSTM, GRU, dan ReGU?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - LSTM (Pages 16-21)
>
> > ### Forward Propagation Antar Timestep
> >
> > Forward propagation pada LSTM berarti menerapkan **keenam persamaan gate secara berurutan** untuk setiap timestep. Pada **timestep t1**, kita mulai dengan h(0) dan C(0) (biasanya nol), lalu hitung berurutan: forget gate ft, input gate it, kandidat Ĉt, perbarui cell state C(t1), output gate ot, dan akhirnya hidden state h(t1).
> >
> > ```
> > ft = σ(Wxf·x(t) + Whf·h(t-1) + bf)
> > it = σ(Wxi·x(t) + Whi·h(t-1) + bi)
> > Ĉt = tanh(Wxc·x(t) + Whc·h(t-1) + bc)
> > C(t) = (C(t-1) ⊙ ft) ⊕ (it ⊙ Ĉt)
> > ot = σ(Wxo·x(t) + Who·h(t-1) + bo)
> > h(t) = ot ⊙ tanh(C(t))
> > ```
> >
> > Pada **timestep t2**, perhitungan diulang dengan x(t2), tetapi sekarang h(t-1) = h(t1) dan C(t-1) = C(t1) yang dihasilkan dari timestep sebelumnya. Karena cell state dan hidden state dari t1 mengalir masuk ke t2, LSTM membawa "memori" dari masa lalu. Proses ini berlanjut hingga timestep terakhir, dan untuk arsitektur many-to-one hanya hidden state terakhir h(T) yang dipakai untuk prediksi.
> >
> > ### Implementasi LSTM di Keras (Many-to-One)
> >
> > Contoh kasus: memprediksi harga penutupan saham Amazon menggunakan LSTM dengan 50 timestep. Arsitektur many-to-one menerima seluruh sekuens dan menghasilkan satu nilai output (regresi).
> >
> > ```python
> > # predict amazon stock closing prices, LSTM 50 timestep
> > from keras import Sequential
> > from keras.layers import LSTM, Dense
> >
> > model = Sequential()
> > # 10 neuron, memproses sekuens berukuran 50x1
> > model.add(LSTM(10, input_shape=(50, 1)))
> > # output linear karena ini masalah regresi
> > model.add(Dense(1, activation='linear'))
> > ```
> >
> > Lapisan `LSTM(10, input_shape=(50,1))` berarti **10 unit LSTM (n=10)** yang memproses sekuens dengan 50 timestep dan dimensi input 1 (m=1). Lapisan `Dense(1)` di atasnya menghasilkan **1 output (k=1)**.
> >
> > ### Menghitung Jumlah Parameter LSTM
> >
> > Rumus jumlah parameter untuk lapisan LSTM dengan **n unit**, input **m dimensi**, menuju output **k dimensi**:
> >
> > `Total parameter = (m + n + 1) × 4 × n + (n + 1) × k`
> >
> > Pada contoh Keras di atas (m=1, n=10, k=1):
> >
> > `Total = (1 + 10 + 1) × 4 × 10 + (10 + 1) × 1 = 12 × 40 + 11 = 480 + 11 = `**491**
> >
> > Sebagai pembanding, **Simple RNN** dengan jaringan setara hanya butuh **131 parameter**. Pada Simple RNN, bobotnya adalah Wxh (hidden × (input+1)), Whh (hidden × hidden), dan Why (output × (hidden+1)) — hanya satu set bobot rekuren.
> >
> > ### Mengapa Faktor ×4?
> >
> > Faktor **×4** muncul karena LSTM memiliki **empat set bobot terpisah**, satu untuk masing-masing dari empat lapisan interaksi: **forget gate, input gate, candidate (tanh), dan output gate**. Setiap set membutuhkan bobot untuk input (Wx*, ukuran m), bobot untuk hidden state sebelumnya (Wh*, ukuran n), dan satu bias (b*, ukuran 1). Karena itu setiap unit LSTM butuh (m + n + 1) parameter per set, dikalikan 4 set, dikalikan n unit: (m+n+1)×4×n. Inilah alasan LSTM jauh lebih "berat" parameter daripada Simple RNN yang hanya punya satu set bobot rekuren (faktor ×1).
> >
> > ### Evolusi RNN → LSTM → GRU → ReGU
> >
> > Garis perkembangan arsitektur recurrent:
> >
> > - **1985 — Recurrent nets**: jaringan rekuren dasar.
> > - **1997 — LSTM &amp; Bi-RNN**: memperkenalkan cell state dan gate, serta versi bidirectional.
> > - **2014 — GRU (Gated Recurrent Unit)**: penyederhanaan LSTM, **tidak ada cell state terpisah** dan hanya menggunakan **2 gate** (reset dan update), sehingga lebih sedikit parameter dan lebih cepat dilatih.
> > - **2017 — Residual LSTM**: menambahkan koneksi residual.
> > - **2019 — ReGU (Residual Gated Unit)**: menambahkan **shortcut connection** (koneksi langsung) untuk memperlancar aliran gradien.

> [!cornell] #### Summary
>
> **Forward propagation LSTM** dilakukan dengan menerapkan **keenam persamaan gate berurutan** tiap timestep, di mana h(t) dan C(t) dari satu timestep mengalir menjadi input timestep berikutnya (mis. t1 → t2). Di **Keras**, model many-to-one dibuat dengan `LSTM(10, input_shape=(50,1))` diikuti `Dense(1)`. Jumlah parameter LSTM dihitung dengan **(m+n+1)×4×n+(n+1)×k**, contohnya **(1+10+1)×4×10+(10+1)×1=491** dibanding **Simple RNN hanya 131**. **Faktor ×4** berasal dari **empat set bobot** untuk forget gate, input gate, candidate, dan output gate. Evolusi arsitektur berlanjut **RNN→LSTM→GRU** (tanpa cell state, 2 gate) **→ReGU** (Residual Gated Unit dengan shortcut connection).

> [!ad-libitum]- Additional Information
>
> #### GRU vs LSTM dalam Praktik
> GRU menggabungkan forget dan input gate menjadi satu **update gate**, dan menggabungkan cell state dengan hidden state. Akibatnya GRU punya jumlah parameter ≈ (m+n+1)×3×n (faktor ×3, bukan ×4). Dalam banyak benchmark GRU dan LSTM memberi akurasi serupa, namun GRU lebih cepat dilatih pada dataset kecil; LSTM kadang unggul pada sekuens sangat panjang berkat cell state eksplisitnya.
>
> #### Stateful vs Stateless LSTM di Keras
> Secara default `LSTM` di Keras bersifat **stateless**: state direset di awal tiap batch. Dengan `stateful=True`, hidden dan cell state dipertahankan antar batch, berguna untuk deret waktu sangat panjang yang dipecah jadi banleh batch berurutan, tetapi mengharuskan `batch_input_shape` tetap dan pemanggilan `model.reset_states()` manual.
>
> #### Verifikasi Hitungan Parameter
> Setelah membangun model, jalankan `model.summary()`. Untuk `LSTM(10)` dengan input dimensi 1, kolom "Param #" akan menampilkan 480 (bobot rekuren), dan `Dense(1)` menampilkan 11, total 491 — cocok dengan rumus (m+n+1)×4×n+(n+1)×k.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun model prediksi harga saham dengan LSTM lalu bandingkan jumlah parameter dan akurasi terhadap GRU setara menggunakan `model.summary()`.
> 2. Implementasikan forward pass LSTM dua timestep secara manual di NumPy dan cocokkan hasilnya dengan output Keras pada bobot yang sama.
> 3. Bereksperimen dengan jumlah unit (n) berbeda dan plot pertumbuhan jumlah parameter terhadap n untuk LSTM vs Simple RNN.
>
> #### Bacaan Lanjutan
> - Cho, K., et al. (2014). *Learning Phrase Representations using RNN Encoder-Decoder* (asal GRU).
> - Chung, J., et al. (2014). *Empirical Evaluation of Gated Recurrent Neural Networks*.
> - Raschka, S., et al. (2022). *Machine Learning with PyTorch and Scikit-Learn* (Chapter 15).
> - [A Comprehensive Guide to RNNs in Keras](https://towardsdatascience.com/a-comprehensive-guide-to-working-with-recurrent-neural-networks-in-keras-f3b2d5e2fa7f)
