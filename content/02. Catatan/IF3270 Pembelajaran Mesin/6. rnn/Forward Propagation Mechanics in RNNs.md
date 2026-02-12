---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin]]

> [!cornell] Forward Propagation Mechanics in RNNs
>
> > ## Questions/Cues
> >
> > - Mengapa RNN memiliki loop dalam strukturnya?
> > - Bagaimana proses unrolling pada RNN?
> > - Apa fungsi parameter sharing dalam RNN?
> > - Langkah-langkah menghitung hidden state (h_t)
> > - Perbedaan perhitungan y_t dan h_t
> > - Contoh numerik forward propagation
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin Slides (Halaman 11-23)
> > - Goodfellow et al. Deep Learning (Chapter 10)
> >
>
> > ### Mekanisme Dasar Propagasi Maju RNN
> > Recurrent Neural Networks (RNN) memiliki mekanisme propagasi maju yang unik karena sifat rekursifnya. Berbeda dengan jaringan feedforward, RNN memproses data sekuensial dengan mempertahankan *hidden state* (h_t) yang membawa informasi dari langkah waktu sebelumnya.
> > Proses ini dijelaskan dengan persamaan:
> > **h_t = tanh(Ux_t + Wh_{t-1} + b_xh)**
> > dimana:
> > - U: Matriks bobot input ke hidden layer
> > - W: Matriks bobot hidden state sebelumnya
> > - b_xh: Bias untuk hidden layer
> > Sebagai analogi, bayangkan membaca sebuah novel: otak kita (h_t) tidak hanya memproses halaman saat ini (x_t), tetapi juga mengingat konteks dari halaman sebelumnya (h_{t-1}).
> > ### Konstruksi Dataset Sekuensial
> > Dataset untuk RNN dibangun dengan memperhatikan urutan temporal. Misal untuk data penumpang maskapai:
> > ```
> > 3 Feature Dataset:
> > X1=t-2, X2=t-1, X3=t, Y=t+1
> > 112, 118, 132 → 129
> > 118, 132, 129 → 121
> > ```
> > Representasi ini memungkinkan RNN mempelajari pola temporal. Pada contoh klasifikasi teks, setiap karakter di-encode sebagai vektor one-hot:
> > ```
> > A = [1,0,0,0], B = [0,1,0,0]
> > Sequence "AB" → [[1,0,0,0], [0,1,0,0]]
> > ```
> > ### Perhitungan Langkah-demi-Langkah
> > **Contoh numerik timestep t1:**
> > ```
> > Input: x_t = [1,0,0,0] (karakter 'A')
> > Bobot: U = [[0.1,0.15,0.2,0.3], ...], W = [[0.5,0.5,0.5], ...]
> > h_t = tanh(Ux_t + Wh_{t-1} + b_xh)
> > = tanh([0.1, 0.15, 0.2] + [0,0,0] + [0.1,0.1,0.1])
> > = tanh([0.2, 0.25, 0.3])
> > = [0.197, 0.245, 0.291] (nilai aktual)
> > y_t = softmax(Vh_t + b_hy)
> > = softmax([0.256, 0.242, 0.242, 0.173])
> > = [0.257, 0.253, 0.253, 0.236]
> > ```
> > Output terprediksi 'B' (indeks 1: 0.253) sementara target sebenarnya 'B' ([0,1,0,0]).
> > ### Ketergantungan Hidden State
> > Nilai hidden state saat ini (h_t) bergantung secara rekursif pada:
> > 1. Input saat ini (x_t)
> > 2. Hidden state sebelumnya (h_{t-1})
> > 3. Bobot U dan W yang dishare antar timestep
> > Pada timestep t2:
> > ```
> > x_t = [0,1,0,0] (karakter 'B')
> > h_{t-1} = [0.197, 0.245, 0.291]
> > h_t = tanh(Ux_t + Wh_{t-1} + b_xh)
> > = tanh([0.15,0.2,0.3] + [0.467,0.467,0.467] + [0.1,0.1,0.1])
> > = [0.549, 0.583, 0.645]
> > ```
> > Perhatikan bagaimana informasi dari 'A' (t1) memengaruhi perhitungan 'B' (t2).

> [!cornell] #### Summary
> **Forward propagation di RNN** melibatkan perhitungan rekursif hidden state (**h_t**) yang mengkombinasikan input saat ini (**x_t**) dengan konteks sebelumnya (**h_{t-1}**). Parameter **U dan W dishare** di semua timestep, memungkinkan model memproses sekuens panjang. Output (**y_t**) dihasilkan melalui transformasi linear dan softmax. Contoh numerik menunjukkan bagaimana informasi mengalir melalui empat timestep dengan *hidden state* yang berkembang secara bertahap.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Propagasi Maju
> Representasi formal RNN untuk sekuens panjang T:
> ```
> h_t = σ(Ux_t + Wh_{t-1} + b_h)
> y_t = softmax(Vh_t + b_y)
> ```
> Dengan:
> - σ: Fungsi aktivasi (biasanya tanh atau ReLU)
> - Dimensi: U ∈ ℝ^{d×d_x}, W ∈ ℝ^{d×d}, V ∈ ℝ^{d_y×d}
>
> Kompleksitas komputasi untuk sekuens panjang T adalah O(Td²) karena perkalian matriks W*h_{t-1}.
>
> #### Implementasi Numerik Optimal
> Optimasi penting dalam implementasi RNN:
> 1. **Initialisasi Bobot**: Bobot harus diinisialisasi dengan skala tepat (mis. Xavier initialization) untuk menghindari vanishing/exploding gradients
> 2. **Batching Sekuensial**: Mengelompokkan sekuens dengan panjang sama untuk efisiensi GPU
> 3. **Masking Zero-Pad**: Mengabaikan padding dalam sekuens tidak rata
>
> Contoh kode pseudo:
> ```python
> def forward_rnn(x_seq, h0):
> h = h0
> for t in range(len(x_seq)):
> h = tanh(np.dot(U, x_seq[t]) + np.dot(W, h) + b_h)
> y[t] = softmax(np.dot(V, h) + b_y)
> return y, h
> ```
>
> #### Tantangan Praktis
> 1. **Vanishing Gradients**: Untuk sekuens panjang (>50 timestep), gradien bisa mengeksponensial kecil
> 2. **Presisi Numerik**: Perhitungan softmax untuk kelas besar (mis. 10000 kata) memerlukan trik stabilitas numerik
> 3. **Parallelisasi**: Perhitungan RNN sulit diparalelkan karena ketergantungan serial antar timestep
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan RNN dari scratch dengan Numpy untuk prediksi deret waktu:
> - Gunakan data saham harian (contoh: dataset AAPL 10 tahun)
> - Bandingkan hasil dengan ARIMA dan LSTM
>
> 2. Eksperimen dengan initialisasi bobot:
> - Uji initialisasi acak vs Xavier vs orthogonal
> - Ukur kecepatan konvergensi dan loss akhir
>
> 3. Visualisasi aliran hidden state:
> - Gunakan PCA untuk proyeksi 2D hidden state
> - Animasi evolusi hidden state selama training
>
> #### Bacaan Lanjutan
> - "On the Difficulty of Training Recurrent Neural Networks" (Pascanu et al., 2013)
> - "An Empirical Exploration of Recurrent Network Architectures" (Jozefowicz et al., 2015)
> - "Visualizing and Understanding Recurrent Networks" (Karpathy et al., 2015)
> - Tutorial interaktif: https://distill.pub/2019/memorization-in-rnns/