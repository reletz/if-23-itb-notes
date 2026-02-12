---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3270 Pembelajaran Mesin]]

> [!cornell] Gradient Boosting Optimization Framework
>
> > ## Questions/Cues
> >
> > - Mengapa residual digunakan dalam Gradient Boosting?
> > - Bagaimana hubungan Gradient Boosting dengan Gradient Descent?
> > - Peran learning rate dalam optimasi model
> > - Implementasi XGBoost untuk prediksi numerik
> > - Keunggulan Gradient Boosting pada data terstruktur
> >
> > ## Reference Points
> >
> > - Kunapuli, G. (2023) (Halaman 39-46)
> > - Han et al. (2022) (Halaman 42-47)
> > - Materi Tambahan (Halaman 47-48, 50-56)
> >
>
> > ### Konsep Dasar Gradient Boosting
> > Gradient Boosting adalah metode ensemble sekuensial yang membangun model secara bertahap dengan memperbaiki kesalahan prediksi model sebelumnya. Berbeda dengan metode paralel seperti Random Forest, Gradient Boosting melatih model baru yang secara spesifik difokuskan untuk memperbaiki residu (kesalahan prediksi) dari model sebelumnya.
> > 
> > Analogi sederhana: Bayangkan seorang siswa yang belajar matematika. Pertama, ia mempelajari konsep dasar (model awal). Kemudian guru mengoreksi kesalahannya (residu), dan siswa tersebut fokus mempelajari bagian yang salah tersebut pada sesi belajar berikutnya (model berikutnya). Proses ini diulang hingga kesalahan minimum tercapai.
> > 
> > Secara matematis, pada iterasi ke-t, model mencari fungsi $h_t(x)$ yang meminimalkan loss function $$L(y, F_{t-1}(x) + h_t(x))$$, dimana $F_{t-1}(x)$ adalah prediksi model sebelumnya. Untuk regression task dengan squared loss, \( h_t(x) \) langsung memodelkan residual $y - F_{t-1}(x)$.
> > ### Mekanisme Residual dan Gradient
> > Residual dalam Gradient Boosting memiliki hubungan langsung dengan konsep gradien dalam optimisasi. Untuk loss function squared error \( L = \frac{1}{2}(y - \hat{y})^2 \), gradien terhadap prediksi adalah \( \frac{\partial L}{\partial \hat{y}} = -(y - \hat{y}) \). Dengan demikian, residual \( (y - \hat{y}) \) sama dengan negatif gradien.
> > Contoh konkret: Misalkan kita memiliki dataset dengan nilai sebenarnya [10, 20, 30]. Model pertama memprediksi [8, 18, 25]. Residualnya adalah [2, 2, 5]. Model berikutnya akan dilatih untuk memprediksi residual ini. Jika model kedua memprediksi [1.8, 1.9, 4.8], maka prediksi gabungan menjadi [8+1.8=9.8, 18+1.9=19.9, 25+4.8=29.8], yang lebih mendekati nilai sebenarnya.
> > Proses ini merupakan implementasi dari Gradient Descent dalam ruang fungsi, dimana setiap model baru mewakili "langkah" dalam arah negatif gradien untuk meminimalkan fungsi kerugian.
> > ### Algoritma Dasar Gradient Boosting
> > Algoritma standar Gradient Boosting terdiri dari langkah-langkah berikut:
> > 1. Inisialisasi model dengan nilai konstan: \( F_0(x) = \arg\min_\gamma \sum_{i=1}^n L(y_i, \gamma) \)
> > 2. Untuk t=1 sampai T:
> > a. Hitung residual \( r_{it} = -\left[\frac{\partial L(y_i, F(x_i))}{\partial F(x_i)}\right]_{F=F_{t-1}} \)
> > b. Latih model \( h_t(x) \) pada data \((x_i, r_{it})\)
> > c. Tentukan weight optimal \( \gamma_t = \arg\min_\gamma \sum_{i=1}^n L(y_i, F_{t-1}(x_i) + \gamma h_t(x_i)) \)
> > d. Update model \( F_t(x) = F_{t-1}(x) + \nu \gamma_t h_t(x) \), dengan \( \nu \) = learning rate
> > Parameter kritis:
> > - Jumlah iterasi (T): Mengontrol kompleksitas model
> > - Learning rate (\( \nu \)): Mengurangi overfitting dengan membatasi kontribusi setiap model
> > - Kedalaman pohon: Biasanya menggunakan decision stump (pohon kedalaman 1) atau pohon dangkal
> > ### Implementasi Praktis dengan XGBoost
> > XGBoost (Extreme Gradient Boosting) adalah implementasi populer yang menambahkan regularisasi dan optimasi lainnya. Berikut contoh implementasi prediksi usia:
> > 1. Inisialisasi dengan prediksi rata-rata: Misal rata-rata usia 40 tahun
> > 2. Hitung residual: Selisih antara usia aktual dan prediksi awal
> > 3. Bangun pohon keputusan pertama untuk memprediksi residual berdasarkan fitur seperti "SukaBerkebun" dan "MainGame"
> > 4. Kombinasikan prediksi: \( F_1(x) = F_0(x) + \eta \times \text{prediksi pohon pertama} \)
> > 5. Ulangi proses untuk pohon berikutnya hingga residual minimal
> > Keunggulan XGBoost:
> > - Penanganan missing value otomatis
> > - Regularisasi L1/L2 untuk menghindari overfitting
> > - Parallel processing untuk percepatan training
> > - Dukungan untuk berbagai fungsi loss (regresi, klasifikasi, ranking)
> > ### Aplikasi dan Keunggulan
> > Gradient Boosting sangat efektif untuk data terstruktur/tabular. Studi menunjukkan performanya sering mengungguli metode lain pada kompetisi data science seperti Kaggle. Keunggulan utama:
> > - Fleksibilitas: Mendukung berbagai fungsi loss dan metrik evaluasi
> > - Robust terhadap outlier melalui fungsi loss yang customizab
> > - Kemampuan menangkap hubungan non-linear dalam data
> > - Feature importance otomatis untuk interpretasi model
> > Contoh aplikasi nyata:
> > - Prediksi harga properti berdasarkan karakteristik rumah
> > - Klasifikasi risiko kredit dengan data historis nasabah
> > - Sistem rekomendasi produk berdasarkan riwayat pembelian

> [!cornell] #### Summary
>
> **Gradient Boosting** adalah metode ensemble sekuensial yang mengkombinasikan model lemah secara aditif untuk meminimalkan fungsi kerugian melalui pendekatan gradien. Algoritma ini bekerja dengan **memodelkan residual** dari prediksi sebelumnya, dimana setiap model baru berkontribusi untuk memperbaiki kesalahan kumulatif. Implementasi praktis seperti **XGBoost** menambahkan teknik regularisasi dan optimasi komputasi, membuatnya sangat efektif untuk data terstruktur. **Learning rate** dan jumlah iterasi merupakan hyperparameter kritis yang mengontrol trade-off antara akurasi dan overfitting. Metode ini unggul dalam menangkap hubungan non-linear kompleks namun membutuhkan tuning yang hati-hati.
>

> [!ad-libitum]- Additional Information
>
> #### Analisis Matematis Fungsi Loss
> Untuk regression task dengan loss function \( L(y, \hat{y}) = \frac{1}{2}(y - \hat{y})^2 \), gradien terhadap prediksi adalah \( -\nabla_{\hat{y}} L = y - \hat{y} \). Pada binary classification dengan log loss:
> \[
> L(y, \hat{y}) = y \ln(1 + e^{-\hat{y}}) + (1 - y) \ln(1 + e^{\hat{y}})
> \]
> Gradiennya menjadi \( \nabla_{\hat{y}} L = \sigma(\hat{y}) - y \) dimana \( \sigma \) adalah fungsi sigmoid. Penurunan ini menjelaskan mengapa Gradient Boosting juga efektif untuk tugas klasifikasi.
>
> #### Optimasi Lanjutan pada XGBoost
> XGBoost memperkenalkan beberapa inovasi:
> - **Approximate Algorithm**: Menggunakan histogram-based split finding untuk percepatan
> - **Sparsity-aware Split**: Penanganan optimal untuk missing values
> - **Weighted Quantile Sketch**: Efisiensi dalam menentukan titik split
> - **Regularisasi Term**: \( \Omega(h_t) = \gamma T + \frac{1}{2}\lambda ||w||^2 \) (T = jumlah leaf, w = output leaf)
>
> #### Edge Cases dan Batasan
> 1. **Data High-Dimensional**: Performa bisa menurun ketika jumlah fitur sangat besar (>10,000) tanpa seleksi fitur
> 2. **Data Temporal**: Memerlukan teknik khusus seperti time-based validation untuk menghindari data leakage
> 3. **Kebutuhan Resource**: Training model besar membutuhkan memori tinggi dan komputasi paralel
> 4. **Interpretabilitas**: Meskipun menyediakan feature importance, model akhir tetap kompleks untuk diinterpretasi
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan Gradient Boosting manual dengan Decision Stump pada dataset diabetes untuk memprediksi progresi penyakit
> 2. Bandingkan performa XGBoost vs LightGBM pada dataset imbalanced menggunakan teknik SMOTE
> 3. Eksperimen dengan berbagai fungsi loss (Huber loss, Quantile loss) untuk robust regression
>
> #### Tools dan Resources
> - **Library**: XGBoost (Python/R), LightGBM (Microsoft), CatBoost (Yandex)
> - **Visualisasi**: SHAP (SHapley Additive exPlanations), PDP (Partial Dependence Plots)
> - **Cloud Service**: AWS SageMaker, Google AI Platform, Databricks ML Runtime
>
> #### Bacaan Lanjutan
> - Friedman, J. H. (2001). Greedy Function Approximation: A Gradient Boosting Machine
> - Chen, T., & Guestrin, C. (2016). XGBoost: A Scalable Tree Boosting System
> - Dokumentasi Resmi XGBoost: https://xgboost.readthedocs.io
> - Kursus Lanjutan: "Winning with XGBoost" di Kaggle Learn