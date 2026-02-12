---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin IF3270]]

> [!cornell] Perceptron Applications in Logic Functions
>
> > ## Questions/Cues
> >
> > - Bagaimana perceptron merepresentasikan fungsi logika dasar?
> > - Apa itu fungsi m-of-n dalam konteks perceptron?
> > - Mengapa bobot identik digunakan untuk fungsi m-of-n?
> > - Bagaimana menentukan nilai ambang (threshold) untuk operasi AND?
> > - Contoh implementasi perceptron untuk fungsi OR
> >
> > ## Reference Points
> >
> > - Lecture_01_DFS.pptx (Slides 9-12)
> > - Machine Learning Mitchell (Chapter 4.4)
> > - Raschka (2022) Machine Learning with PyTorch and Scikit-Learn
> >
>
> > ### Representasi Fungsi Logika dengan Perceptron
> > Perceptron merupakan model linear yang mampu merepresentasikan berbagai fungsi logika dasar melalui konfigurasi bobot dan nilai ambang (threshold) yang tepat. Strukturnya terdiri dari unit input, bobot, fungsi aktivasi tangga (step function), dan output biner (±1 atau 0/1). **Fungsi logika dasar** seperti AND, OR, NAND dapat diimplementasikan dengan menentukan kombinasi bobot (w) dan bias (w₀) yang sesuai.
> > Contoh implementasi fungsi OR:
> > - Input: x₁, x₂ ∈ {0,1} atau {-1,1}
> > - Bobot: w₁ = 2, w₂ = 2
> > - Bias: w₀ = -1
> > - Fungsi aktivasi: sign(2x₁ + 2x₂ - 1)
> > - Output akan bernilai +1 jika minimal satu input bernilai 1
> > ### Konsep Fungsi m-of-n
> > Fungsi m-of-n merupakan kelas khusus fungsi logika dimana output bernilai benar (+1) jika minimal m dari n input bernilai benar. **Kekuatan perceptron** terletak pada kemampuannya merepresentasikan fungsi ini secara efisien melalui konfigurasi parameter terstandarisasi:
> > 1. Setiap bobot input diatur ke nilai identik (biasanya 0.5 atau 1)
> > 2. Nilai ambang (threshold) dihitung berdasarkan rumus: w₀ = -(m - 0.5)
> > Contoh kasus AND (m = n = 2):
> > - Bobot: w₁ = w₂ = 0.5
> > - Bias: w₀ = -0.8
> > - Perhitungan: sign(0.5x₁ + 0.5x₂ - 0.8)
> > - Sistem akan mengaktifkan output (+1) hanya jika kedua input bernilai 1
> > ### Implementasi Praktis Fungsi AND
> > Implementasi fungsi AND menggunakan perceptron menunjukkan bagaimana model linear membentuk **bidang keputusan** (decision boundary) di ruang fitur:
> > | x₁ | x₂ | Σ (0.5x₁ + 0.5x₂ - 0.8) | Output |
> > |----|----|--------------------------|--------|
> > | 1  | 1  | 0.2                      | +1     |
> > | 1  | -1 | -0.8                     | -1     |
> > | -1 | 1  | -0.8                     | -1     |
> > | -1 | -1 | -1.8                     | -1     |
> > Representasi visual menunjukkan garis pemisah 0.5x₁ + 0.5x₂ = 0.8 yang membatasi daerah positif dan negatif secara sempurna.
> > ### Desain Bobot untuk Fungsi Logika
> > Strategi umum dalam mendesain perceptron untuk fungsi logika:
> > 1. **Identifikasi pola input-output** dari tabel kebenaran
> > 2. **Tentukan persamaan linear** yang memisahkan kelas positif-negatif
> > 3. **Konversi ke bentuk bobot** dengan memperhatikan skala input
> > 4. **Uji coba** terhadap semua kombinasi input
> > Untuk fungsi OR dengan input biner (±1):
> > - Persamaan: sign(2x₁ + 2x₂ - 1)
> > - Rasional: Output positif jika minimal satu input = +1
> > - Verifikasi:
> > - (1,1): 2(1) + 2(1) -1 = 3 → +1
> > - (1,-1): 2(1) + 2(-1) -1 = -1 → -1
> > - (-1,1): 2(-1) + 2(1) -1 = -1 → -1
> > - (-1,-1): 2(-1) + 2(-1) -1 = -5 → -1

> [!cornell] #### Summary
>
> **Perceptron** mampu merepresentasikan berbagai **fungsi logika** melalui konfigurasi bobot dan bias yang tepat, khususnya untuk fungsi **m-of-n** yang mengaktifkan output ketika minimal m dari n input bernilai benar. Implementasi fungsi AND menunjukkan bagaimana **bobot identik** (0.5) dan **bias spesifik** (-0.8) membentuk bidang keputusan linear yang efektif. Konsep ini menjadi fondasi untuk memahami kapabilitas dan **batasan perceptron** dalam menyelesaikan masalah yang secara linear terpisah.
>

> [!ad-libitum]- Additional Information
>
> #### Problem XOR dan Batasan Perceptron
> Meskipun efektif untuk fungsi AND dan OR, perceptron tunggal **tidak dapat** merepresentasikan fungsi XOR karena memerlukan pemisahan non-linear. Solusi memerlukan jaringan multi-layer dengan hidden layer yang mengkombinasikan beberapa perceptron. Contoh representasi XOR:
> - Layer 1: Implementasi NAND dan OR
> - Layer 2: Kombinasi AND dari output layer sebelumnya
>
> #### Implementasi dengan Python
> ```python
> import numpy as np
>
> class LogicPerceptron:
> def __init__(self, weights, bias):
> self.weights = np.array(weights)
> self.bias = bias
>
> def predict(self, inputs):
> summation = np.dot(inputs, self.weights) + self.bias
> return 1 if summation >= 0 else -1
>
> # AND Perceptron
> and_perceptron = LogicPerceptron(weights=[0.5, 0.5], bias=-0.8)
> print(and_perceptron.predict([1, 1]))   # Output: 1
> print(and_perceptron.predict([1, -1]))  # Output: -1
> ```
>
> #### Fungsi Logika Lainnya
> 1. **NAND**: Bobot negatif (contoh: w₁=-0.5, w₂=-0.5, w₀=0.8)
> 2. **NOR**: Kombinasi bobot negatif dan threshold tinggi (contoh: w₁=-1, w₂=-1, w₀=0.5)
> 3. **Fungsi Mayoritas**: m-of-n dimana m > n/2 (contoh: 2-of-3 dengan w₁=w₂=w₃=1, w₀=-1.5)
>
> #### Bacaan Lanjut
> - "Neural Networks and Deep Learning" Chapter 1 oleh Michael Nielsen
> - Paper asli: Rosenblatt, F. (1958). The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain
> - Tutorial interaktif: https://playground.tensorflow.org
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun perceptron untuk fungsi logika 3-input: (x1 AND x2) OR x3
> 2. Visualisasi bidang keputusan 3D menggunakan Matplotlib
> 3. Eksperimen dengan representasi biner {0,1} vs bipolar {-1,1}
> 4. Implementasi gerbang logika kombinasi (mis. Half-Adder) dengan jaringan perceptron