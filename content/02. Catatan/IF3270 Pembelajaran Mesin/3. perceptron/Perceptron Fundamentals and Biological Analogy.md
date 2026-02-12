---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin IF3270]]

> [!cornell] Perceptron Fundamentals and Biological Analogy
>
> > ## Questions/Cues
> >
> > - Mengapa perceptron menggunakan fungsi aktivasi tangga?
> > - Bagaimana struktur perceptron meniru neuron biologis?
> > - Apa perbedaan input biner vs kontinu pada perceptron?
> > - Mengapa perceptron hanya bekerja untuk data linearly separable?
> > - Bagaimana merepresentasikan fungsi logika AND/OR dengan perceptron?
> >
> > ## Reference Points
> >
> > - Lecture_01_Perceptron.pptx (Slides 5-12, 17)
> > - Machine_Learning_Raschka_2022 (Hal 32-35)
> >
>
> > ### Konsep Biologis Neuron
> > Perceptron terinspirasi dari model biologis neuron yang diusulkan McCulloch dan Pitts (1942). Neuron biologis menerima sinyal kimia dan elektrik melalui dendrit, mengintegrasikannya di badan sel, dan menghasilkan sinyal output melalui akson jika ambang batas tertentu terlampaui.
> > Analogi dengan perceptron:
> > 1. **Input (x₁, x₂,...xₙ)** ≡ Sinyal dendrit
> > 2. **Bobot (w₁, w₂,...wₙ)** ≡ Kekuatan sinapsis
> > 3. **Fungsi Aktivasi** ≡ Proses integrasi badan sel
> > 4. **Output (y)** ≡ Sinyal akson
> > Contoh konkret: Saat menerima input penting (bobot tinggi) dan input sekunder (bobot rendah), perceptron mengkombinasikannya secara linear sebelum menerapkan fungsi aktivasi tangga.
> > ### Definisi Formal Perceptron
> > Perceptron adalah model jaringan saraf tiruan paling sederhana untuk klasifikasi biner. Secara matematis didefinisikan sebagai:
> > ```
> > y = sign(∑ wᵢxᵢ + b)
> > = sign(wᵀx + b)
> > ```
> > - **x**: Vektor input fitur (x₁, x₂,...xₙ)
> > - **w**: Vektor bobot (parameter yang dipelajari)
> > - **b**: Bias (threshold)
> > - **sign**: Fungsi aktivasi tangga (output +1 atau -1)
> > Model ini membentuk **hyperplane keputusan** di ruang n-dimensi. Untuk kasus 2D, ini berupa garis lurus yang memisahkan dua kelas. Contoh visual: Pada slide 8, garis 0.5x₁ + 0.5x₂ = 0.8 memisahkan titik AND (+1) dari lainnya (-1).
> > ### Representasi Fungsi Logika
> > Perceptron dapat merepresentasikan fungsi logika dasar dengan konfigurasi bobot spesifik:
> > **Fungsi AND**:
> > - Bobot: w₀ = -0.8, w₁ = 0.5, w₂ = 0.5
> > - Persamaan: 0.5x₁ + 0.5x₂ ≥ 0.8 → y=+1
> > **Fungsi OR**:
> > - Bobot: w₀ = -0.5, w₁ = 1.0, w₂ = 1.0
> > - Persamaan: 1.0x₁ + 1.0x₂ ≥ 0.5 → y=+1
> > Pola umum untuk **fungsi m-of-n**:
> > 1. Set semua bobot input sama (misal 0.5)
> > 2. Atur bias (w₀) sesuai kebutuhan m
> > Contoh: Fungsi 2-of-3 memerlukan w₀ = -1.0 dengan bobot input seragam 0.5.
> > ### Batasan dan Linear Separability
> > Perceptron hanya berfungsi optimal untuk data **linearly separable**—kelas dapat dipisahkan oleh hyperplane linier. Keterbatasan utama:
> > 1. Tidak bisa menyelesaikan masalah non-linear seperti XOR
> > 2. Sensitif terhadap noise dan outlier
> > 3. Membutuhkan learning rate tepat untuk konvergensi
> > Contoh kasus gagal: Data XOR (Slide 10) tidak linearly separable dalam ruang 2D. Solusi memerlukan transformasi fitur atau model lebih kompleks (misal multilayer perceptron).

> [!cornell] #### Summary
>
> **Perceptron** adalah model jaringan saraf tiruan paling dasar yang terinspirasi dari neuron biologis, menggunakan **fungsi aktivasi tangga** untuk klasifikasi biner. Model ini efektif untuk masalah **linearly separable** seperti implementasi fungsi logika AND/OR melalui konfigurasi bobot spesifik. **Batasan utama** terletak pada ketidakmampuan menangani hubungan non-linear antar fitur, memerlukan teknik lanjutan untuk kasus lebih kompleks.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Fungsi Aktivasi
> Fungsi signum (sign) dapat dinyatakan secara formal sebagai:
> ```
> sign(z) = { +1 jika z ≥ 0, -1 jika z < 0 }
> ```
> Derivatif fungsi ini adalah nol di semua titik kecuali z=0 (tidak terdiferensiasi), membatasi penggunaan metode berbasis gradien. Pada implementasi praktis, sering digunakan aproksimasi seperti fungsi sigmoid atau ReLU untuk keperluan diferensiasi.
>
> #### Implementasi Praktis dengan Python
> ```python
> import numpy as np
>
> class Perceptron:
> def __init__(self, input_size):
> self.weights = np.zeros(input_size+1)  # +1 untuk bias
>
> def predict(self, x):
> z = np.dot(x, self.weights[1:]) + self.weights[0]
> return 1 if z >= 0 else -1
> ```
>
> #### Aplikasi dalam Computer Vision Modern
> Meskipun sederhana, arsitektur perceptron menjadi dasar untuk:
> - Convolutional Neural Networks (CNN) melalui konsep operasi konvolusi linier
> - Attention mechanisms dalam transformer dengan proyeksi linier
> - Embedding layers yang memetakan input ke ruang vektor
>
> #### Bacaan Lanjutan
> - McCulloch, W.S. & Pitts, W. (1943). "A Logical Calculus of Ideas Immanent in Nervous Activity". *Bulletin of Mathematical Biophysics*
> - Rosenblatt, F. (1958). "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain". *Psychological Review*
> - Nielsen, M. (2019). "Neural Networks and Deep Learning". *Chapter 1: Using Neural Nets to Recognize Handwriting*
>
> #### Eksperimen Mandiri
> 1. Implementasikan perceptron dari nol untuk dataset iris (klasifikasi setosa vs non-setosa)
> 2. Visualisasi decision boundary menggunakan matplotlib untuk berbagai konfigurasi bobot
> 3. Eksplorasi efek learning rate terhadap kecepatan konvergensi
>
> #### Tools Rekomendasi
> - `sklearn.linear_model.Perceptron`: Implementasi optimisasi perceptron
> - TensorFlow Playground: Visualisasi interaktif (https://playground.tensorflow.org)
> - Google Colab: Platform eksperimen berbasis cloud