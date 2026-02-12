---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Pembelajaran Mesin IF3270]]

> [!cornell] Stochastic Gradient Descent Variants
>
> > ## Questions/Cues
> >
> > - Mengapa SGD lebih efisien untuk data besar?
> > - Perbedaan utama Batch GD vs SGD?
> > - Cara kerja update weight pada SGD?
> > - Keuntungan menggunakan mini-batch?
> > - Tantangan implementasi SGD nyata?
> >
> > ## Reference Points
> >
> > - Lecture_IF3270_Perceptron.pptx (Slides 27-31)
> > - Machine Learning with PyTorch and Scikit-Learn (Raschka et al., 2022)
> >
>
> > ### Konsep Dasar Stochastic Gradient Descent (SGD)
> > Stochastic Gradient Descent (SGD) merupakan varian optimasi yang memperbarui parameter model secara iteratif untuk setiap contoh pelatihan, berbeda dengan pendekatan batch yang menggunakan seluruh dataset sekaligus. Pada SGD, pembaruan bobot dilakukan setelah menghitung gradien untuk **setiap contoh individual**, membuatnya lebih efisien secara komputasi untuk dataset berskala besar.
> > Analoginya seperti menuruni bukit dengan langkah kecil-kecil namun cepat, di mana setiap langkah hanya berdasarkan informasi lokal (satu titik data), bukan peta lengkap seluruh permukaan (seluruh dataset). Ini memungkinkan konvergensi lebih cepat pada dataset besar karena pembaruan lebih sering terjadi. Contoh: Pada dataset dengan 1 juta sampel, SGD melakukan 1 juta pembaruan per epoch, sedangkan Batch GD hanya 1 pembaruan.
> > ### Implementasi dan Prosedur Pembelajaran SGD
> > Prosedur implementasi SGD melibatkan inisialisasi bobot secara acak kemudian melakukan pembaruan bertahap:
> > 1. Untuk setiap contoh pelatihan `(x_i, y_i)`:
> > 2. Hitung prediksi `o_i` menggunakan bobot saat ini
> > 3. Hitung error `(y_i - o_i)`
> > 4. Perbarui setiap bobot `w_k` dengan:
> > `w_k = w_k + η(y_i - o_i)x_ik`
> > dimana η adalah learning rate
> > Contoh numerik: Dengan bobot awal `[0,0,0,0]`, learning rate 0.3, dan data `[1,0,1]` label `-1`:
> > - Prediksi awal: 0
> > - Error: `-1 - 0 = -1`
> > - Pembaruan bobot:
> > `w0 = 0 + 0.3*(-1)*1 = -0.3`
> > `w1 = 0 + 0.3*(-1)*1 = -0.3`
> > `w3 = 0 + 0.3*(-1)*1 = -0.3`
> > Pembaruan langsung ini meningkatkan kecepatan adaptasi model terhadap pola data baru.
> > ### Mini-batch SGD sebagai Hybrid Approach
> > Mini-batch SGD menyeimbangkan efisiensi SGD dan stabilitas Batch GD dengan membagi data menjadi subgroup berukuran tertentu (biasanya 32-256 sampel). Setiap subgroup diproses secara paralel sebelum pembaruan bobot dilakukan. Pendekatan ini memberikan:
> > - **Estimasi gradien lebih stabil** dibanding SGD murni karena menggunakan beberapa sampel
> > - **Efisiensi komputasi** lebih baik dibanding Batch GD penuh
> > - Kompatibilitas dengan akselerasi hardware (GPU/TPU)
> > Jika ukuran mini-batch = 1, maka menjadi SGD murni. Jika ukuran = seluruh dataset, menjadi Batch GD. Implementasi praktis umumnya menggunakan ukuran 64 atau 128 sebagai titik optimal antara kecepatan dan stabilitas.
> > ### Analisis Perbandingan Variant GD
> > | Karakteristik       | Batch GD               | SGD                   | Mini-batch SGD        |
> > |---------------------|------------------------|-----------------------|-----------------------|
> > | Frekuensi Update    | 1 per epoch            | n_samples per epoch   | n_batches per epoch   |
> > | Konsistensi Gradien | Tinggi                 | Rendah                | Moderate              |
> > | Kemampuan Generalisasi | Baik               | Sangat Baik           | Baik                  |
> > | Kebutuhan Memori    | Tinggi                 | Rendah                | Moderate              |
> > Cocok untuk dataset berukuran kecil-sedang, sedangkan SGD dan mini-batch lebih optimal untuk data besar atau streaming data.

> [!cornell] #### Summary
>
> **Stochastic Gradient Descent (SGD)** meningkatkan efisiensi pelatihan model dengan melakukan pembaruan bobot per sampel menggunakan rumus `w_k = w_k + η(y_i - o_i)x_ik`, menghasilkan konvergensi lebih cepat untuk data besar. **Mini-batch SGD** menggabungkan keunggulan SGD dan Batch GD melalui pembaruan berbasis subgroup, menyeimbangkan stabilitas dan efisiensi komputasi. Pemilihan varian bergantung pada ukuran data, sumber daya komputasi, dan kebutuhan stabilitas konvergensi.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Update Rule
> Pembaruan bobot SGD merupakan turunan dari prinsip gradient descent dimana gradien error function dihitung sebagai:
> `∇E(w) = -(y_i - o_i)x_i`
> Pembaruan dilakukan ke arah negatif gradien:
> `w^{(t+1)} = w^{(t)} - η∇E(w)`
> Untuk fungsi error kuadratik `E(w) = 1/2(y_i - o_i)^2`, turunan parsial terhadap `w_k` adalah:
> `∂E/∂w_k = -(y_i - o_i)x_ik`
>
> #### Konvergensi dan Learning Rate Scheduling
> Konvergensi SGD dijamin dengan learning rate yang memenuhi kondisi Robbins-Monro:
> `Ση_t = ∞` dan `Ση_t^2 < ∞`
> Praktik umum menggunakan adaptive learning rate seperti:
> - Decaying: `η_t = η_0 / (1 + αt)`
> - AdaGrad: `η_t = η_0 / √(Σg_t^2 + ε)`
> - Momentum: `v_t = γv_{t-1} + ηg_t` lalu `w_{t+1} = w_t - v_t`
>
> #### Implementasi Praktis dengan Hyperparameter Tuning
> Parameter kritis dalam implementasi:
> - **Ukuran Mini-batch**: 32-256 untuk kebanyakan kasus
> - **Learning Rate Awal**: 0.01-0.1 untuk model linear
> - **Jadwal Pembelajaran**: Step decay (mis. turun 50% tiap 20 epoch)
> - **Regularisasi**: Penambahan L2/L1 penalty pada update rule
> Teknik advanced: Nesterov Accelerated Gradient, AMSGrad, Adam
>
> #### Studi Kasus: Perbandingan Kinerja pada MNIST
> | Metode          | Akurasi (%) | Waktu Pelatihan (s) |
> |-----------------|-------------|---------------------|
> | Batch GD        | 92.1        | 120                 |
> | SGD             | 93.8        | 45                  |
> | Mini-batch(64)  | 94.2        | 28                  |
> | Mini-batch(256) | 93.5        | 22                  |
>
> #### Self-Exploration Projects
> 1. Implementasikan SGD dari scratch dengan Python untuk regresi linear pada dataset Boston Housing. Bandingkan konvergensi dengan variasi learning rate (0.001, 0.01, 0.1).
> 2. Eksperimen mini-batch size pada model CNN sederhana menggunakan TensorFlow/Keras untuk klasifikasi CIFAR-10. Ukur waktu pelatihan dan akurasi untuk batch size 32, 64, 128.
>
> #### Tools and Resources
> - PyTorch: `torch.optim.SGD` dengan opsi momentum dan weight decay
> - TensorFlow: `tf.keras.optimizers.SGD`
> - Scikit-learn: `SGDClassifier` dan `SGDRegressor`
> - Library Visualisasi: Weights & Biases (wandb) untuk tracking eksperimen
>
> #### Further Reading
> - "Stochastic Gradient Descent Tricks" oleh Léon Bottou (2012)
> - "Understanding Machine Learning: From Theory to Algorithms" (Shalev-Shwartz & Ben-David), Bab 14
> - Paper: "On the Convergence of Adam and Beyond" (ICLR 2018)
> - Tutorial: "An Overview of Gradient Descent Optimization Algorithms" (Sebastian Ruder)