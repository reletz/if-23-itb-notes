---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Supervised Learning Techniques: Regression and Classification
>
> > ## Questions/Cues
> >
> > - Apa perbedaan utama regresi dan klasifikasi?
> > - Bagaimana proses induktif supervised learning bekerja?
> > - Komponen utama dalam dataset supervised learning?
> > - Alur umum desain sistem machine learning?
> > - Contoh aplikasi regresi dan klasifikasi?
> >
> > ## Reference Points
> >
> > - Course Slides (Slides 19-25, 28)
> > - Raschka et al. (2022) (Pages referenced in Slides 18,23,28)
> >
>
> > ### Regresi vs Klasifikasi
> > Regresi dan klasifikasi merupakan dua jenis tugas utama dalam *supervised learning*. Regresi bertujuan memprediksi nilai numerik kontinu (misalnya harga rumah, suhu harian), sementara klasifikasi memprediksi label kategori diskrit (misalnya spam/bukan spam, jenis penyakit). Perbedaan mendasar terletak pada jenis output yang dihasilkan: **regresi menghasilkan nilai kontinu, klasifikasi menghasilkan label kategori tertentu.**
> > 
> > **Contoh aplikasi regresi:** prediksi harga saham berdasarkan faktor ekonomi, estimasi waktu perjalanan berdasarkan kondisi lalu lintas. 
> > **Contoh klasifikasi:** deteksi fraud transaksi, diagnosis penyakit berdasarkan gejala. Visualisasi sederhana dapat membantu: regresi biasanya digambarkan dengan garis/gradien, sedangkan klasifikasi dengan batas keputusan (*decision boundary*) yang memisahkan kategori berbeda.
> > 
> > ### Proses Supervised Learning
> > Supervised learning melibatkan pembelajaran fungsi target (*target function*) `f` yang memetakan data input ke label output. Proses ini diawali dengan kumpulan data latih (*training set*) berisi pasangan `<data, label>`. Melalui pembelajaran induktif, algoritma menghasilkan hipotesis `h` yang mendekati fungsi target `f`.
> > 
> > Tahapan kunci meliputi: (1) Penyiapan dataset berfitur dan label, (2) Pemilihan model algoritma, (3) Proses pelatihan untuk menemukan pola, (4) Inferensi menggunakan model untuk prediksi data baru. Contoh sederhana: sistem rekomendasi film yang mempelajari preferensi user dari riwayat rating untuk memprediksi rating film baru.
> > 
> > ### Terminologi Dasar
> > - **Fitur (*Feature*):** Atribut atau karakteristik data yang digunakan untuk membuat prediksi (misalnya usia, pendapatan dalam prediksi kredit). 
> > - **Label (*Target*):** Variabel yang ingin diprediksi (misalnya status layak/tidak layak kredit). **Contoh Latih (*Training Example*):** Satu instansi data lengkap dengan fitur dan labelnya.
> > - **Fungsi Kerugian (*Loss Function*):** Mengukur kesalahan antara prediksi model dan nilai sebenarnya. Pada regresi sering digunakan Mean Squared Error (MSE), sementara klasifikasi menggunakan Cross-Entropy Loss. 
> > - **Pola (*Pattern*):** Hubungan statistik yang dipelajari model antara fitur dan label.
> > 
> > ### Alur Desain Sistem ML
> > Meskipun detail implementasi spesifik dikecualikan, alur umum desain sistem ML mencakup: 
> > (1) Pemahaman masalah bisnis/riset, 
> > (2) Pengumpulan dan pembersihan data, 
> > (3) Pemilihan dan pelatihan model, 
> > (4) Validasi kinerja model, 
> > (5) Deployment ke lingkungan produksi.
> > 
> > Proses ini bersifat iteratif - model mungkin perlu disesuaikan berkali-kali berdasarkan evaluasi kinerja. Misalnya dalam sistem klasifikasi teks, setelah deployment mungkin diperlukan pembaruan model ketika muncul kosakata baru atau perubahan konteks penggunaan.

> [!cornell] #### Summary
> **Regresi dan klasifikasi** merupakan dua pendekatan utama dalam supervised learning yang dibedakan berdasarkan jenis output (kontinu vs diskrit). Proses pembelajaran melibatkan **pembentukan hipotesis** dari contoh latih untuk mengaproksimasi fungsi target. Desain sistem ML yang efektif memerlukan **pemahaman menyeluruh** terhadap masalah, data, dan algoritma yang sesuai, dengan proses iteratif untuk **meningkatkan kinerja** model secara berkelanjutan.
>

> [!ad-libitum]- Additional Information
>
> #### Formulasi Matematis Dasar
> Untuk regresi linier sederhana: `y = β₀ + β₁x + ε` dimana β₀ adalah intercept, β₁ koefisien kemiringan, dan ε error term. Fungsi kerugiannya: `MSE = (1/n)Σ(yᵢ - ŷᵢ)²`. Pada klasifikasi biner, fungsi logistik: `p(y=1|x) = 1/(1 + e^(-z))` dimana z = β₀ + β₁x.
>
> Optimasi parameter biasanya menggunakan gradient descent: `βₜ₊₁ = βₜ - η∇J(β)` dengan η sebagai learning rate dan ∇J gradien fungsi kerugian. Implementasi praktis sering melibatkan regularisasi (L1/L2) untuk mencegah overfitting.
>
> #### Implementasi Dasar dengan Scikit-Learn
> ```python
> # Contoh regresi
> from sklearn.linear_model import LinearRegression
> model_reg = LinearRegression()
> model_reg.fit(X_train, y_train)
>
> # Contoh klasifikasi
> from sklearn.ensemble import RandomForestClassifier
> model_clf = RandomForestClassifier()
> model_clf.fit(X_train, y_train)
> ```
> Library seperti Scikit-Learn menyediakan API konsisten untuk berbagai algoritma. Praktik terbaik meliputi pembagian data (train-test split), normalisasi fitur, dan validasi silang.
>
> #### Kasus Edge dan Pertimbangan Praktis
> 1. **Data Tidak Seimbang:** Pada klasifikasi dengan perbandingan kelas 1:1000, akurasi bisa menyesatkan. Solusi: sampling ulang atau metrik presisi-recall.
> 2. **Multikolinearitas:** Pada regresi, korelasi tinggi antar fitur mengganggu stabilitas model. Deteksi dengan VIF (Variance Inflation Factor).
> 3. **Leakage Data:** Ketika informasi target secara tidak sengaja masuk ke fitur, menyebabkan kinerja over-optimistik.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan regresi linier dari nol menggunakan NumPy pada dataset Boston Housing
> 2. Bandingkan kinerja 3 algoritma klasifikasi berbeda (SVM, Random Forest, Logistic Regression) pada dataset MNIST
> 3. Eksplorasi teknik feature engineering untuk prediksi harga mobil bekas
>
> #### Bacaan Lanjutan
> - James, G., et al. (2021). *An Introduction to Statistical Learning* (Bab 3-4)
> - Geron, A. (2022). *Hands-On Machine Learning with Scikit-Learn, Keras and TensorFlow* (Bab 1-4)
> - Dokumentasi Scikit-Learn: https://scikit-learn.org/stable/
> - Kursus Online: "Supervised Machine Learning" di Coursera oleh Andrew Ng