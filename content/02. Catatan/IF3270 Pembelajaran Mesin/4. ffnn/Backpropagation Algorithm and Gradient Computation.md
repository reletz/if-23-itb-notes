---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Backpropagation Algorithm and Gradient Computation
>
> > ## Questions/Cues
> >
> > - Mengapa backpropagation diperlukan di ANN?
> > - Bagaimana menghitung gradien untuk unit output?
> > - Bagaimana menghitung gradien untuk unit tersembunyi?
> > - Apa fungsi learning rate pada update bobot?
> > - Bagaimana hubungan forward-backward propagation?
> >
> > ## Reference Points
> >
> > - Lecture_ANN_IF3270.pptx (Slides 26-41)
> > - Machine Learning by Mitchell (1997)
> > - Deep Learning by Goodfellow et al. (2016)
> >
>
> > ### Konsep Dasar Backpropagation
> > Backpropagation adalah algoritma pembelajaran untuk jaringan saraf tiruan yang bertujuan meminimalkan error dengan menyesuaikan bobot secara iteratif. Algoritma ini terdiri dari dua fase utama: **forward propagation** (menghitung output) dan **backward propagation** (menghitung gradien error).
> > Analogi: Bayangkan sedang melatih tim pemain bola. Forward propagation seperti pertandingan uji coba untuk melihat performa, sementara backpropagation adalah analisis video pertandingan untuk mengidentifikasi kesalahan dan memperbaiki strategi latihan (bobot jaringan).
> > ### Mekanisme Perhitungan Gradien
> > **Untuk unit output:**
> > Gradien error (δ) dihitung sebagai selisih antara output aktual dan target, dikalikan turunan fungsi aktivasi:
> > ```
> > δ_output = (y_pred - y_true) * f'(net_output)
> > ```
> > **Untuk unit tersembunyi:**
> > Gradien merupakan akumulasi error dari unit downstream yang terhubung, dikalikan turunan fungsi aktivasi:
> > ```
> > δ_hidden = Σ(δ_next * w_next) * f'(net_hidden)
> > ```
> > Contoh: Pada jaringan dengan 1 hidden layer, error dari unit output akan "dipropagasikan" ke unit tersembunyi menggunakan bobot antara keduanya.
> > ### Prosedur Pembelajaran
> > 1. **Inisialisasi bobot** secara acak
> > 2. **Forward pass:** Hitung output semua layer
> > 3. **Hitung error** di output layer
> > 4. **Backward pass:** Hitung δ untuk tiap layer
> > 5. **Update bobot** dengan aturan:
> > ```
> > w_baru = w_lama - α * (δ * output_layer_sebelumnya)
> > ```
> > α (learning rate) mengontrol besar update bobot. Nilai α terlalu besar menyebabkan overshooting, terlalu kecil memperlambat konvergensi.
> > ### Implementasi Algoritma
> > Backpropagation menggunakan **gradient descent** untuk menurunkan error surface. Proses berulang sampai memenuhi kriteria berhenti:
> > - Jumlah iterasi maksimum tercapai
> > - Error training di bawah threshold
> > - Error validation tidak membaik
> > Contoh nyata: Pengenalan digit tulisan tangan menggunakan arsitektur dengan 784 input (28x28 piksel), hidden layer, dan 10 output (digit 0-9). Setiap digit diklasifikasikan dengan menghitung probabilitas di output layer.

> [!cornell] #### Summary
> **Backpropagation** adalah algoritma fundamental pelatihan ANN yang meminimalkan error melalui penyesuaian bobot berbasis gradien. Prosesnya melibatkan **dua fase**: forward propagation untuk komputasi output dan backward propagation untuk distribusi error. **Gradien error** dihitung secara rekursif mulai dari output layer ke hidden layer menggunakan aturan rantai. Efektivitas algoritma bergantung pada **learning rate** yang tepat dan kriteria penghentian yang terdefinisi dengan baik.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas
> Kompleksitas waktu backpropagation adalah O(n * m * epochs) dimana n adalah jumlah sampel training, m jumlah bobot. Kompleksitas ruang O(w) untuk menyimpan bobot dan gradien. Pada jaringan dalam, terjadi **vanishing gradient** ketika gradien menjadi sangat kecil di layer awal, menghambat pembelajaran.
>
> #### Teknik Optimasi Lanjut
> 1. **Momentum:** Menambahkan komponen kecepatan untuk menghindari osilasi
> ```
> Δw(t) = α * δ * x + β * Δw(t-1)
> ```
> 2. **Adaptive Learning Rate:** Adam optimizer menyesuaikan learning rate per parameter
> 3. **Regularisasi L2:** Menambahkan penalty term untuk mencegah overfitting
>
> #### Batasan Aplikasi
> - Tidak menjamin konvergensi ke minimum global
> - Sensitif terhadap inisialisasi bobot awal
> - Membutuhkan komputasi intensif untuk dataset besar
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan backpropagation dari scratch dengan Python menggunakan NumPy
> 2. Bandingkan konvergensi dengan berbagai optimizer (SGD, Adam, RMSprop)
> 3. Visualisasi perubahan bobot selama training menggunakan TensorBoard
>
> #### Bacaan Lanjutan
> - "Neural Networks and Deep Learning" oleh Michael Nielsen (Chapter 2)
> - "Pattern Recognition and Machine Learning" oleh Bishop (Section 5.3)
> - Paper: "Efficient BackProp" oleh Yann LeCun et al.
> - Tutorial interaktif: https://google.github.io/deep-learning-scaling/