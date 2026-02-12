---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Perceptron Learning Rule Algorithm
>
> > ## Questions/Cues
> >
> > - Mengapa perceptron memerlukan aturan pembelajaran spesifik?
> > - Bagaimana langkah pembaruan bobot bekerja per-contoh?
> > - Apa perbedaan esensial batch vs stochastic update?
> > - Kriteria penghentian pelatihan perceptron?
> > - Bagaimana learning rate memengaruhi konvergensi?
> >
> > ## Reference Points
> >
> > - IF3270 Pembelajaran Mesin - Perceptron (Slides 14-18, 27-31)
> > - Raschka, Liu, & Mirjalili (2022) - Machine Learning with PyTorch and Scikit-Learn (Slide 3)
> >
>
> > ### Mekanisme Pembelajaran Perceptron
> > Algoritma pembelajaran perceptron bertujuan menemukan vektor bobot optimal yang memisahkan kelas positif dan negatif secara linear. Proses dimulai dengan inisialisasi bobot awal secara acak (biasanya nilai kecil mendekati nol). Untuk setiap contoh pelatihan, model membuat prediksi menggunakan fungsi aktivasi signum yang menghasilkan output +1 atau -1.
> > Jika prediksi salah, dilakukan penyesuaian bobot dengan rumus:
> > **$$w_j = w_j + Δw_j$$** dimana **$Δw_j = η(y_i - o_i)x_ij$**.
> > η (learning rate) mengontrol besarnya penyesuaian, y_i adalah label sebenarnya, o_i prediksi model, dan x_ij nilai fitur. Contoh: Jika fitur x_ij bernilai tinggi dan terjadi kesalahan klasifikasi, penyesuaian bobot akan lebih signifikan dibandingkan fitur dengan nilai rendah.
> > 
> > ### Proses Pembaruan Incremental
> > 
> > Berbeda dengan metode batch yang menghitung gradien seluruh dataset, perceptron umumnya menggunakan pembaruan *stochastic* per-contoh. Setiap kesalahan klasifikasi langsung memicu penyesuaian bobot, membuat algoritma lebih responsif terhadap pola data baru. Pendekatan ini efisien untuk dataset besar karena tidak perlu menyimpan seluruh gradien dalam memori.
> > 
> > Implementasi tipikal menggunakan loop berulang (epoch) melalui dataset sampai tidak ada kesalahan klasifikasi atau mencapai batas iterasi maksimum. Pada setiap epoch, contoh diacak untuk mencegah pola pembelajaran berurutan yang bias.
> > 
> > ### Pengaruh Learning Rate
> > Learning rate (η) menentukan kecepatan pembelajaran: nilai terlalu tinggi menyebabkan overshooting minimum global, sementara nilai terlalu rendah memperlambat konvergensi. Nilai optimal biasanya di range 0.1 sampai 0.0001. Contoh praktis: Untuk dataset dengan fitur ternormalisasi, η=0.1 umumnya efektif. Pada slide 16 ditunjukkan contoh nyata dengan η=0.1 yang berhasil mengkonvergensikan bobot dalam dua epoch untuk fungsi AND sederhana.
> > ### Kriteria Penghentian
> > Pelatihan berhenti ketika: (1) Semua contoh terklasifikasi benar (error=0), (2) Mencapai batas maksimum epoch, atau (3) Error rate stabil meskipun iterasi berlanjut. Penting untuk memasukkan batas iterasi maksimum karena perceptron tidak konvergen untuk data tidak terpisahkan linear (non-linearly separable). Contoh pada slide 18 menunjukkan terminasi ketika error mencapai nol setelah beberapa iterasi.

> [!cornell] #### Summary
> **Aturan pembelajaran perceptron** menggunakan pendekatan pembaruan bobot incremental berdasarkan kesalahan klasifikasi per-contoh dengan rumus Δw_j = η(y_i - o_i)x_ij. Algoritma ini **efisien untuk data terpisah linear** namun memerlukan penanganan khusus untuk kasus non-linear. **Learning rate** menentukan kecepatan dan stabilitas konvergensi, sementara kriteria penghentian harus mempertimbangkan **kemungkinan non-konvergensi**. Implementasi praktis memanfaatkan pembaruan stokastik dan pengacakan data tiap epoch.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Konvergensi
> Teori konvergensi perceptron menjamin solusi dalam waktu terbatas jika data linearly separable. Untuk dimensi d dan margin γ, maksimum iterasi yang dibutuhkan dibatasi oleh (R/γ)^2 dimana R adalah radius bola mencakup semua titik data. Bukti formal menggunakan pertidaksamaan Cauchy-Schwarz menunjukkan penurunan bound kesalahan kuadratik setiap iterasi.
>
> #### Perbandingan Batch vs Stochastic
> Pembaruan batch (slide 23) menghitung gradien rata-rata seluruh dataset sebelum update bobot, menjamin penurunan error monoton tapi komputasinya berat. Stochastic update (slide 29) lebih cepat per iterasi tapi berosilasi mendekati minimum. Komprominya: mini-batch (slide 31) menggabungkan kelebihan kedua pendekatan dengan ukuran batch tipikal 32-512 contoh.
>
> #### Eksperimen Parameter Learning Rate
> Lakukan simulasi dengan η berbeda (0.001, 0.01, 0.1, 1) pada dataset XOR (non-linear) dan AND (linear). Amati: (1) Jumlah epoch sampai konvergen (jika mungkin), (2) Perilaku error function, (3) Pemisahan decision boundary yang dihasilkan. Hasil akan menunjukkan ketidakmampuan perceptron menangani XOR dan sensitivitas terhadap pemilihan η.
>
> #### Implementasi dengan Python
> ```python
> import numpy as np
> class Perceptron:
> def __init__(self, lr=0.01, epochs=1000):
> self.lr = lr
> self.epochs = epochs
> def fit(self, X, y):
> self.weights = np.zeros(X.shape[1])
> for _ in range(self.epochs):
> for xi, yi in zip(X, y):
> pred = np.sign(np.dot(xi, self.weights))
> if pred != yi:
> update = self.lr * (yi - pred)
> self.weights += update * xi
> ```
>
> #### Further Reading
> - "Perceptron-Based Learning Algorithms" (IEEE Transactions on Neural Networks, 1990)
> - "The Convergence Proof for the Perceptron Algorithm" (Block & Novikoff, 1962)
> - Scikit-learn Documentation: Perceptron Implementation
> - Interactive Visualization: https://playground.tensorflow.org
> - Coursera: "Neural Networks and Deep Learning" (Week 1)