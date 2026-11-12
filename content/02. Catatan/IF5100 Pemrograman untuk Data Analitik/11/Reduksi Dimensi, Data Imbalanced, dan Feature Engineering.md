---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Reduksi Dimensi, Data Imbalanced, dan Feature Engineering
>
> > ## Questions/Cues
> >
> > - Mengapa dimensionality reduction diperlukan dan apa itu PCA?
> > - Mengapa dataset imbalanced bermasalah, dan apa beda random under/oversampling dengan SMOTE?
> > - Apa itu feature engineering dan apa beda feature transformation dengan feature selection?
> > - Apa beda metode filter, wrapper, dan embedded pada feature selection?
> > - Bagaimana correlation coefficient, variance threshold, dan chi-square dipakai memilih fitur?
> >
> > ## Reference Points
> >
> > - IF5100 — Data Processing Pipeline, EDA, Pre-processing, Feature Engineering (Pages 79-96)
>
> > ### Dimensionality Reduction (PCA)
> >
> > **Dimensionality reduction** adalah teknik mengurangi jumlah fitur/variabel, yaitu mengubah ruang berdimensi tinggi menjadi ruang berdimensi lebih rendah. Terlalu banyak fitur (ratusan bahkan ribuan) menambah kompleksitas dan waktu pembangunan model. Pendekatannya: **feature selection**, **matrix factorization** (misalnya **PCA**), dan lain-lain. Slide menampilkan contoh PCA yang memproyeksikan atribut-atribut asli ke beberapa komponen utama (principal components) yang menangkap sebagian besar variansi data.
> >
> > ### Handling Imbalanced Dataset
> >
> > Dataset imbalanced membuat model berkinerja buruk pada **kelas minoritas**, padahal biasanya kelas minoritas itulah yang paling penting (fraud, penyakit langka, kebangkrutan). Penanganannya:
> >
> > - **Oversampling** kelas minoritas: **random oversampling** (menduplikasi sampel minoritas) dan **SMOTE** (*Synthetic Minority Oversampling Technique*) yang membuat sampel sintetis baru.
> > - **Random undersampling** kelas mayoritas: membuang sebagian sampel mayoritas.
> >
> > SMOTE membuat titik baru di antara sampel minoritas dan tetangga terdekatnya, sehingga tidak sekadar menduplikasi data. Undersampling cepat tetapi membuang informasi; oversampling mempertahankan informasi tetapi berisiko overfitting (random oversampling).
> >
> > ### Feature Engineering
> >
> > **Feature engineering** menyiapkan dataset input yang sesuai dengan persyaratan algoritma machine learning, meningkatkan performa model, dan berurusan dengan pembangkitan serta pemilihan **representasi berbasis feature-vector** yang efektif. Slide mengutip survei Forbes bahwa persiapan data adalah tugas data science yang paling memakan waktu. Dua komponennya:
> >
> > ```mermaid
> > graph TD
> >     FE["Feature Engineering"] --> FT["Feature Transformation / Generation"]
> >     FE --> FS["Feature Selection"]
> >     FS --> F["Filter"]
> >     FS --> W["Wrapper"]
> >     FS --> EM["Embedded &amp; Hybrid"]
> >     F --> F1["Info gain, Chi-square, Korelasi,<br/>Variance threshold, Fisher"]
> >     W --> W1["Forward, Backward,<br/>Exhaustive, Recursive FS"]
> > ```
> >
> > ### Feature Transformation
> >
> > Beririsan dengan banyak operasi preprocessing sebelumnya. **Feature transformation** mengubah nilai atau representasi data menjadi nilai atau representasi lain, atau menghasilkan fitur baru dari fitur yang ada. Contoh: menangani missing value, mengubah tanggal (DDMMYY) menjadi **hari dalam seminggu**, mengubah nilai numerik menjadi kategori.
> >
> > ### Feature Selection
> >
> > **Mengapa**: tidak semua fitur baik untuk membangun model, dan sebagian fitur saling berkaitan. **Tujuan**: menemukan himpunan fitur terbaik yang menghasilkan model berguna.
> >
> > Metode:
> >
> > - **Filter**: memilih berdasarkan properti intrinsik fitur lewat statistik univariat, bukan performa cross-validation. Contoh: information gain, chi-square test, correlation coefficient, variance threshold, Fisher's score, dispersion ratio, mean absolute difference.
> > - **Wrapper**: menelusuri ruang semua subset fitur dan menilai kualitasnya dengan melatih dan mengevaluasi classifier pada subset itu. Contoh: forward FS, backward FS, exhaustive FS, recursive FS.
> > - **Embedded** dan **Hybrid**: seleksi terjadi di dalam proses pelatihan model (atau gabungan metode).
> >
> > **Correlation coefficient.** Mengukur hubungan antar dua variabel a dan b. Korelasi tinggi berarti a dapat diprediksi dari b (dan sebaliknya), sehingga **keduanya tidak perlu dipakai bersamaan**. Fitur yang "baik" berkorelasi tinggi dengan **target** tetapi **tidak** berkorelasi dengan fitur lain.
> >
> > **Variance threshold.** Fitur yang bernilai sama (atau sangat seragam, variansi mendekati 0) pada semua sampel hampir tidak berkontribusi pada prediksi target, sehingga dibuang.
> >
> > **Chi-square test.** Fitur kategorikal diuji hubungannya dengan kelas target; fitur dengan nilai chi-square tinggi (hubungan kuat) dipertahankan.
> >
> > **Information gain.** Mengukur pengurangan entropi akibat sebuah fitur; akan dijelaskan rinci pada modul berikutnya (decision tree).

> [!cornell] #### Summary
>
> **Dimensionality reduction** (misalnya **PCA**) mengurangi jumlah fitur untuk menekan kompleksitas dan waktu model. **Imbalanced dataset** merugikan kelas minoritas dan ditangani dengan **oversampling** (random, **SMOTE**) atau **random undersampling** kelas mayoritas. **Feature engineering** terdiri dari **feature transformation/generation** (mengubah representasi atau membuat fitur baru, mis. tanggal menjadi hari dalam seminggu) dan **feature selection** untuk menemukan himpunan fitur terbaik, dengan metode **filter** (info gain, chi-square, korelasi, variance threshold), **wrapper** (forward, backward, exhaustive, recursive) serta **embedded/hybrid**; fitur ideal berkorelasi tinggi dengan target namun tidak dengan fitur lain.

> [!ad-libitum]- Additional Information
>
> #### PCA Secara Singkat
>
> PCA mencari sumbu ortogonal (principal components) dengan variansi maksimum lewat dekomposisi eigen matriks kovarians atau SVD. Data harus **di-standardisasi** lebih dulu karena PCA peka skala. Jumlah komponen dipilih dari `explained_variance_ratio_` kumulatif (misalnya 95%).
> ```python
> from sklearn.decomposition import PCA
> pca = PCA(n_components=0.95)
> Z = pca.fit_transform(X_scaled)
> pca.explained_variance_ratio_.cumsum()
> ```
> Kelemahan: komponen sulit ditafsirkan karena merupakan kombinasi linear semua fitur asli, dan PCA hanya menangkap struktur linear (alternatif non-linear: t-SNE, UMAP).
>
> #### SMOTE dan Imbalanced-learn
>
> ```python
> from imblearn.over_sampling import SMOTE
> from imblearn.under_sampling import RandomUnderSampler
> X_res, y_res = SMOTE(random_state=0).fit_resample(X_train, y_train)
> ```
> Lakukan resampling **hanya pada data latih**, jangan pada data uji. Untuk evaluasi, jangan andalkan akurasi; pakai precision, recall, F1, PR-AUC. Alternatif lain: `class_weight="balanced"` pada model.
>
> #### Contoh Kode Feature Selection
>
> ```python
> from sklearn.feature_selection import VarianceThreshold, SelectKBest, chi2, RFE
> VarianceThreshold(threshold=0.01)                 # filter
> SelectKBest(chi2, k=10)                           # filter (fitur non-negatif)
> RFE(estimator, n_features_to_select=10)           # wrapper
> ```
> Contoh embedded: koefisien **Lasso (L1)** yang menyusut ke nol, atau `feature_importances_` pada random forest. Korelasi antar fitur dapat dilihat dengan `df.corr()` dan heatmap seaborn.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Terapkan PCA pada dataset Company Bankruptcy (96 fitur), cari jumlah komponen untuk 95% variansi, dan bandingkan performa model sebelum/sesudah.
> 2. Bandingkan SMOTE, random under/oversampling, dan `class_weight` pada dataset yang sama dengan metrik F1 kelas minoritas.
> 3. Bandingkan filter (correlation), wrapper (RFE), dan embedded (Lasso) dalam memilih 10 fitur terbaik.
>
> #### Bacaan Lanjutan
>
> - Chawla et al. (2002), *SMOTE: Synthetic Minority Over-sampling Technique*.
> - Guyon & Elisseeff (2003), *An Introduction to Variable and Feature Selection*.
> - Kuhn & Johnson, *Feature Engineering and Selection: A Practical Approach for Predictive Models*.
