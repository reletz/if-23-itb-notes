---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] RNN Architecture and Parameter Sharing
>
> > ## Questions/Cues
> >
> > - Apa perbedaan dataflow feedforward dengan recurrent NN?
> > - Bagaimana single-layer RNN di-unfold sepanjang waktu?
> > - Apa peran bobot Wxh, Whh, dan Why?
> > - Apa itu parameter sharing pada RNN?
> > - Bagaimana persamaan forward propagation RNN?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - RNN Pt. 1 (Pages 16-22)
>
> > ### Dataflow: Feedforward vs Recurrent
> > Pada **feedforward neural network**, hanya ada **forward link**: informasi mengalir dari input layer ke hidden layer, lalu dari hidden layer ke output layer. Tidak ada konsep **urutan waktu** antar data. Sebaliknya, **recurrent (feedback) NN** memiliki **forward dan backward link**: **hidden layer menerima input dari dua sumber** — yaitu input layer pada **timestep saat ini** dan hidden layer dari **timestep sebelumnya**. Topologi ini berguna ketika urutan data penting (data sekuensial) dan memungkinkan **sharing parameter sepanjang sekuens/timestep**.
> >
> > ### Single-layer RNN dan Unfolding
> > Untuk memeriksa arsitektur RNN dan aliran informasi, representasi ringkas dengan **recurrent edge** dapat **di-unfold (dibentangkan)** sepanjang waktu. Setiap hidden unit menerima **dua set input berbeda**: preaktivasi dari input layer dan aktivasi hidden layer yang sama dari timestep sebelumnya, t-1.
> >
> > - Pada **timestep pertama (t = 0)**, hidden units **diinisialisasi dengan nol atau nilai acak kecil**.
> > - Pada timestep **t > 0**, hidden units menerima input dari data point saat ini, **x(t)**, dan nilai hidden units sebelumnya, **h(t-1)**.
> >
> > ### Multi-layer RNN
> > Pada **multi-layer RNN**, layer disusun bertingkat. **Layer 1**: hidden layer **h¹(t)** menerima input dari data point **x(t)** dan nilai hidden di layer yang sama pada timestep sebelumnya **h¹(t-1)**. **Layer 2**: hidden layer kedua **h²(t)** menerima input dari **output layer di bawahnya pada timestep saat ini (o¹(t))** dan nilai hidden-nya sendiri dari timestep sebelumnya **h²(t-1)**. Setiap recurrent layer harus menerima sekuens sebagai input, dan semua recurrent layer kecuali yang terakhir harus mengembalikan sekuens sebagai output (nantinya diatur dengan `return_sequences=True`).
> >
> > ### Bobot dan Parameter Sharing
> > Setiap directed edge (koneksi antar kotak) dalam representasi RNN dikaitkan dengan sebuah **matriks bobot**:
> >
> > - **Wxh**: matriks bobot antara input **x(t)** dan hidden layer **h**.
> > - **Whh**: matriks bobot yang terkait dengan **recurrent edge** (hidden ke hidden antar waktu).
> > - **Why**: matriks bobot antara hidden layer **h** dan output layer **o**.
> >
> > Kuncinya: **bobot-bobot ini tidak bergantung pada waktu t**, sehingga **dibagi (shared) sepanjang sumbu waktu** — inilah **parameter sharing**. Konsekuensinya, jumlah parameter tetap konstan tidak peduli berapa panjang sekuens, dan model dapat menggeneralisasi pola yang muncul di posisi waktu mana pun.
> >
> > ### Dimensi Matriks Bobot
> > Mengikuti persamaan **h(t) = fh(Wxh·x(t) + Whh·h(t-1) + bh)**, dimensi matriks adalah:
> >
> > - **Wxh**: (hidden neurons) × (dimensi input x(t))
> > - **Bias bh**: (hidden neurons) × 1
> > - **Whh**: (hidden neurons) × (hidden neurons)
> > - **Why**: (output neurons) × (hidden neurons)
> > - **Bias by**: (output neurons) × 1
> >
> > ### Persamaan Forward Propagation
> > Hidden state dan output dihitung sebagai:
> >
> > ```
> > h(t) = fh(Wxh·x(t) + Whh·h(t-1) + bh)
> > y(t) = fy(Why·h(t) + bhy)
> > ```
> >
> > Di sini **fh(.)** dan **fy(.)** adalah fungsi aktivasi (mis. tanh dan softmax). Persamaan hidden dapat ditulis dalam **bentuk gabungan** dengan menggabungkan x(t) dan h(t-1) menjadi satu vektor dan Wxh dengan Whh menjadi satu matriks **Wh**:
> >
> > ```
> > h(t) = fh(Wh·[x(t); h(t-1)]ᵀ + bh)
> > ```
> >
> > ```mermaid
> > flowchart LR
> >     x0["x(0)"] --> h0["h(0)"]
> >     x1["x(1)"] --> h1["h(1)"]
> >     x2["x(2)"] --> h2["h(2)"]
> >     h0 -- "Whh" --> h1
> >     h1 -- "Whh" --> h2
> >     x0 -- "Wxh" --> h0
> >     x1 -- "Wxh" --> h1
> >     x2 -- "Wxh" --> h2
> >     h0 -- "Why" --> y0["y(0)"]
> >     h1 -- "Why" --> y1["y(1)"]
> >     h2 -- "Why" --> y2["y(2)"]
> > ```

> [!cornell] #### Summary
>
> **RNN** berbeda dari feedforward karena **hidden layer menerima input dari input timestep saat ini DAN hidden layer timestep sebelumnya** melalui **recurrent edge**. Representasi rekuren dapat **di-unfold** sepanjang waktu dengan **h(0) diinisialisasi nol/acak**. Tiga matriks bobot — **Wxh** (hidden×input), **Whh** (hidden×hidden), **Why** (output×hidden) — beserta bias **di-share sepanjang waktu (parameter sharing)** karena tidak bergantung pada t. Forward propagation: **h(t) = fh(Wxh·x(t) + Whh·h(t-1) + bh)** dan **y(t) = fy(Why·h(t) + bhy)**, yang dapat diringkas menjadi bentuk gabungan **h(t) = fh(Wh·[x(t); h(t-1)] + bh)**.

> [!ad-libitum]- Additional Information
>
> #### Mengapa Parameter Sharing Krusial
> Tanpa parameter sharing, RNN dengan sekuens panjang 100 timestep akan memerlukan 100 set bobot terpisah, membuat jumlah parameter membengkak dan mustahil dilatih. Parameter sharing juga memungkinkan model menggeneralisasi pola ke panjang sekuens yang belum pernah dilihat saat training — sebuah bentuk bias induktif yang serupa dengan weight sharing pada CNN (lihat [[Motivation and Fundamental Concepts of CNNs]]).
>
> #### Folded vs Unfolded Representation
> Bentuk **folded** (terlipat) menampilkan satu sel dengan loop ke dirinya sendiri — ringkas tapi abstrak. Bentuk **unfolded** membentangkan sel yang sama untuk tiap timestep, memperjelas bahwa backpropagation harus mengalir mundur menembus seluruh timestep (Backpropagation Through Time / BPTT).
>
> #### Implementasi dengan Framework
> - **PyTorch**: `torch.nn.RNN(input_size, hidden_size, num_layers)` menangani Wxh, Whh, dan unfolding secara otomatis.
> - **Keras/TensorFlow**: `SimpleRNN` dengan argumen `return_sequences` mengontrol apakah seluruh sekuens hidden dikembalikan atau hanya state terakhir.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan single-layer RNN dari nol dengan NumPy, lakukan unfolding manual untuk 3 timestep, dan verifikasi h(t) dengan hasil PyTorch.
> 2. Hitung jumlah parameter RNN secara manual untuk beberapa konfigurasi (input, hidden, output) dan bandingkan dengan ukuran model di Keras.
>
> #### Bacaan Lanjutan
> - Raschka, S., et al. (2022). *Machine Learning with PyTorch and Scikit-Learn* (Chapter 15). Packt Publishing.
> - Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning* (Bab 10: Sequence Modeling).
