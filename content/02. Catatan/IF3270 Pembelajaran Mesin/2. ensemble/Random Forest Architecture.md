---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Random Forest Architecture
>
> > ## Questions/Cues
> >
> > - Mengapa Random Forest memerlukan diversifikasi pohon?
> > - Bagaimana Random Forest mencapai dekorrelasi pohon?
> > - Tahapan pembuatan decision tree dalam Random Forest
> > - Keuntungan arsitektur paralel Random Forest
> > - Penanganan data dengan fitur lebih banyak dari sampel
> >
> > ## Reference Points
> >
> > - Lecture Slides IF3270 (Halaman 16-22)
> > - Kunapuli, G. (2023) (Bagian Parallel Ensemble)
> > - Han, J., et al. (2022) (Bagian Random Forest)
> > - Schonlau & Zou (2020) (Analisis d > n)
> >
>
> > ### Konsep Arsitektur Dasar
> > Random Forest merupakan ensemble method yang terdiri dari kumpulan decision tree (pohon keputusan) yang dilatih secara paralel. Setiap pohon dalam ensemble dibangun dengan dua sumber acak utama: (1) bootstrap sampling untuk data training, dan (2) seleksi acak fitur pada setiap split node. Arsitektur paralel ini memungkinkan pelatihan pohon secara independen sehingga cocok untuk komputasi paralel.
> > Contoh implementasi: Pada dataset medis dengan 10.000 pasien dan 500 fitur, Random Forest akan membuat 100 pohon keputusan. Setiap pohon dilatih pada subset acak 70% data (dengan pengembalian) dan hanya menggunakan 20 fitur acak untuk menentukan split terbaik di setiap node.
> > ### Mekanisme Dekorelasi Pohon
> > Dekorelasi (pengurangan korelasi antar pohon) dicapai melalui dua teknik utama: (1) Bagging dengan bootstrap sampling yang menciptakan variasi dalam data training setiap pohon, dan (2) Random Feature Selection yang membatasi jumlah fitur yang dipertimbangkan pada setiap split node (biasanya √p untuk klasifikasi dimana p adalah jumlah fitur total).
> > Analogi: Seperti panel dokter spesialis yang masing-masing menerima laporan lab berbeda dan fokus pada parameter berbeda untuk diagnosis. Variasi pendekatan ini menghasilkan diagnosis ensemble yang lebih robust. Tanpa mekanisme ini, semua pohon cenderung membuat struktur serupa yang mengurangi efektivitas ensemble.
> > ### Proses Pembangunan Pohon
> > Setiap decision tree dalam Random Forest dibangun dengan modifikasi algoritma CART (Classification and Regression Trees):
> > 1. **Pemilihan Data**: Ambil bootstrap sample dari dataset original
> > 2. **Pemilihan Fitur**: Pada setiap split node, pilih subset acak fitur (m)
> > 3. **Kriteria Split**: Hitung Gini impurity/entropy hanya pada fitur terpilih
> > 4. **Pembagian Node**: Pilih split dengan gain maksimum
> > 5. **Penghentian**: Berhenti ketika mencapai kedalaman maksimum atau minimum sampel
> > Contoh implementasi: Scikit-learn menggunakan parameter `max_features` untuk mengontrol jumlah fitur yang dipertimbangkan per split, dan `bootstrap=True` untuk mengaktifkan sampling dengan pengembalian.
> > ### Keunggulan Arsitektur Paralel
> > Arsitektur paralel memberikan tiga keuntungan utama:
> > 1. **Skalabilitas**: Pelatihan pohon independen memungkinkan distribusi komputasi di cluster atau GPU
> > 2. **Robustness**: Error pada satu pohon tidak merusak seluruh ensemble
> > 3. **Efisiensi Memori**: Tidak perlu menyimpan seluruh dataset di memori untuk setiap pohon
> > Kasus khusus: Pada dataset dengan dimensi tinggi (d > n), Random Forest tetap berfungsi karena seleksi fitur acak mencegah overfitting. Misalnya pada data genetik dengan 50,000 gen (fitur) dan hanya 100 pasien, linear model gagal tetapi Random Forest dapat mengidentifikasi pola penting.
> > ### Mekanisme Inferensi
> > Proses prediksi menggabungkan hasil semua pohon melalui voting mayoritas (klasifikasi) atau averaging (regresi). Probabilitas kelas dihitung sebagai rata-rata probabilitas dari semua pohon, memberikan estimasi yang lebih halus dibanding hard voting.
> > Contoh: Untuk prediksi kanker dengan 100 pohon:
> > - 60 pohon prediksi "ganas" dengan confidence 0.8
> > - 40 pohon prediksi "jinak" dengan confidence 0.7
> > Probabilitas akhir = (60*0.8 + 40*0.7)/100 = 0.76 untuk kelas "ganas"

> [!cornell] #### Summary
>
> **Random Forest** merupakan ensemble method paralel yang menggabungkan multiple decision tree melalui teknik **bagging dan seleksi fitur acak** untuk mencapai diversitas model. Arsitekturnya yang paralel memungkinkan **efisiensi komputasi** dan skalabilitas untuk dataset besar. Keunggulan utamanya terletak pada kemampuan menangani **data berdimensi tinggi (d > n)** dan resistensi terhadap overfitting melalui mekanisme dekorrelasi pohon. Proses prediksi mengaggregasikan hasil seluruh pohon melalui **voting probabilistik** yang menghasilkan model akhir yang robust dan akurat.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Komputasi
> Kompleksitas waktu pelatihan Random Forest adalah O(k * n log n * m) dimana k = jumlah pohon, n = jumlah sampel, m = jumlah fitur per split. Untuk inferensi, kompleksitas O(k * depth) per sampel. Implementasi paralel dapat mengurangi waktu pelatihan secara linear dengan jumlah core prosesor.
>
> Pada dataset sangat besar (>1 juta sampel), teknik seperti Extremely Randomized Trees (ExtraTrees) dapat digunakan yang mengorbankan sedikit akurasi untuk peningkatan kecepatan signifikan dengan memilih split threshold secara acak tanpa optimisasi lengkap.
>
> #### Teknik Optimasi Hyperparameter
> Parameter kritis dalam Random Forest:
> 1. `n_estimators`: Jumlah pohon (semakin banyak biasanya lebih baik tetapi ada titik diminishing returns)
> 2. `max_features`: Jumlah fitur per split (√p untuk klasifikasi, p/3 untuk regresi)
> 3. `max_depth`: Kedalaman maksimum pohon (kontrol kompleksitas model)
> 4. `min_samples_split`: Minimum sampel untuk split node (mencegah overfitting)
>
> Optimasi dapat dilakukan via Bayesian Optimization atau Halving Grid Search yang lebih efisien dibanding Grid Search konvensional.
>
> #### Kasus Edge dan Limitasi
> 1. **Data Kategorikal High-Cardinality**: Encoding tradisional seperti one-hot dapat menurun performa karena fragmentasi fitur. Solusi: Gunakan target encoding atau metode khusus seperti CatBoost
> 2. **Data Deret Waktu**: Struktur dependensi temporal menyulitkan karena bootstrap sampling merusak struktur waktu. Solusi: Gunakan Blocked Time Series Split
> 3. **Overfitting pada Data Bising**: Meski relatif robust, Random Forest dapat overfit pada dataset dengan noise ekstrem (>40% label salah). Solusi: Batasi kedalaman pohon dan gunakan bagging fraction <1
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasi Random Forest dari scratch dengan Python untuk dataset klasifikasi sederhana (misalnya Iris). Bandingkan performa dengan versi sklearn.
> 2. Eksperimen pengaruh `max_features` terhadap akurasi dan waktu komputasi pada dataset MNIST.
> 3. Studi kasus prediksi fraud transaksi dengan teknik class weighting dan anomaly detection.
>
> #### Alat dan Implementasi Praktis
> 1. **Scikit-learn**: `RandomForestClassifier` dan `RandomForestRegressor` dengan fitur parallelisasi via `n_jobs`
> 2. **Spark MLlib**: `RandomForestClassifier` untuk data sangat besar dengan distribusi cluster
> 3. **GPU-Accelerated**: RAPIDS cuML untuk akselerasi GPU pada infrastruktur NVIDIA
> 4. **Interpretasi Model**: SHAP dan LIME untuk menjelaskan prediksi individual
>
> #### Bacaan Lanjutan
> - Breiman, L. (2001). "Random Forests". Machine Learning 45(1)
> - Proyek Open Source: Implementasi C++ Random Forest di https://github.com/opencv/opencv
> - Buku: "The Elements of Statistical Learning" (Bab 15) oleh Hastie et al.
> - Tutorial Interaktif: https://www.kaggle.com/code/ryanholbrook/random-forests