---

type: Note
cssclasses:
- cornell-notes
---


_Back to_ [[IF3170 Inteligensi Artifisial]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa tujuan dari fase Persiapan Data?
> >     
> > - Apa saja 4 proses utama dalam persiapan data?
> >     
> > - Bagaimana prioritas penanganan missing values?
> >     
> > - Apa itu Record Selection (Sampling)?
> >     
> > - Apa itu Feature Selection?
> >     
> > - Mengapa Feature Selection penting?
> >     
> > - Apa itu metode Filter dalam feature selection?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170-Data-Understanding-and-Preparation.pdf (Slide 58-72, 75-88)
> >     
> 
> > ### Gambaran Umum Fase Persiapan Data
> > 
> > Ini adalah fase yang seringkali memakan waktu paling banyak dalam proyek data science (sering disebut 50-80% dari total waktu). Tujuannya adalah mengubah data mentah hasil dari fase sebelumnya menjadi data final yang bersih dan terformat baik, yang siap untuk dimasukkan ke dalam algoritma pemodelan. "Garbage in, garbage out" adalah prinsip utamanya.
> > 
> > Proses utamanya meliputi:
> > 
> > 1. **Pemilihan Data (Select Data)**: Memilih baris dan kolom yang relevan.
> >     
> > 2. **Pembersihan Data (Clean Data)**: Menangani masalah kualitas.
> >     
> > 3. **Konstruksi Data (Construct Data)**: Membuat fitur baru atau transformasi.
> >     
> > 4. **Integrasi Data (Integrate Data)**: Menggabungkan beberapa sumber data.
> >     
> > 
> > ### Pembersihan Data (Data Cleaning)
> > 
> > Ini adalah proses memperbaiki atau menghapus data yang salah, korup, tidak diformat dengan benar, duplikat, atau tidak lengkap.
> > 
> > Penanganan Missing Values (Nilai Hilang)
> > 
> > Ada urutan prioritas dalam menanganinya:
> > 
> > 1. **Isi dengan Nilai Sebenarnya**: Jika memungkinkan, lakukan validasi manual atau programatik untuk menemukan nilai aslinya. Contoh: jika usia kosong, hitung dari tanggal lahir.
> >     
> > 2. **Imputasi (Isi dengan Nilai Paling Mungkin)**: Jika nilai asli tidak bisa ditemukan, isi dengan nilai statistik.
> >     
> >     - **Data Numerik**: Gunakan **mean** (jika tidak ada outlier) atau **median** (jika ada outlier).
> >         
> >     - **Data Kategorikal**: Gunakan **modus**.
> >         
> >     - Imputasi bisa dilakukan berdasarkan keseluruhan data atau kelompok data yang lebih spesifik (misal: isi `gaji` kosong berdasarkan `gaji` rata-rata untuk `level pekerjaan` yang sama).
> >         
> > 3. **Hapus**: Jika tidak bisa diperbaiki dan jumlah data masih sangat banyak, baris (atau kolom) yang memiliki nilai hilang dapat dihapus. Ini adalah pilihan terakhir.
> >     
> > 
> > **Penanganan Outlier & Error**:
> > 
> > - Sama seperti missing values, prioritasnya adalah memperbaiki jika itu adalah kesalahan entri.
> >     
> > - Jika outlier itu valid, keputusannya bisa jadi mempertahankannya, mentransformasinya (misal: log-transform), atau menghapusnya jika sangat ekstrem dan mengganggu model.
> >     
> > 
> > ### Pemilihan Data (Data Selection)
> > 
> > 1. **Record Selection (Pemilihan Baris / Sampling)**:
> >     
> >     - Proses memilih subset representatif dari populasi data yang besar. Ini dilakukan jika data terlalu besar untuk diproses.
> >         
> >     - **Metode**: _Probability Sampling_ (setiap sampel punya peluang sama untuk dipilih, misal: acak sederhana) dan _Non-Probability Sampling_ (berdasarkan penilaian subjektif).
> >         
> > 2. **Feature Selection (Pemilihan Kolom / Atribut)**:
> >     
> >     - Proses mengurangi jumlah variabel input untuk model.
> >         
> >     - **Tujuan**:
> >         
> >         - Mengurangi biaya komputasi dan kompleksitas model.
> >             
> >         - Mencegah _overfitting_ dan terkadang meningkatkan performa model dengan menghapus fitur yang tidak relevan atau redundan.
> >             
> >     - **Teknik Filter**: Menggunakan ukuran statistik untuk memberi skor pada setiap fitur dan memilih fitur dengan skor tertinggi. Penilaian dilakukan **secara independen** dari model machine learning.
> >         
> >         - **Numerik vs. Numerik**: Korelasi Pearson (linear), Spearman (non-linear).
> >             
> >         - **Numerik vs. Kategorikal**: ANOVA.
> >             
> >         - **Kategorikal vs. Kategorikal**: Chi-Squared Test, Mutual Information.
> >             

> [!cornell] #### Summary
> 
> **Fase Persiapan Data adalah proses krusial untuk mengubah data mentah menjadi dataset yang siap dimodelkan, dimulai dengan** _**Data Cleaning**_ **untuk menangani masalah seperti** _**missing values**_ **(dengan prioritas: perbaiki, imputasi, atau hapus) dan** _**outlier**_**. Selanjutnya,** _**Data Selection**_ **dilakukan untuk memilih subset data yang paling relevan, baik melalui** _**record sampling**_ **untuk mengurangi jumlah baris maupun melalui** _**feature selection**_ **dengan metode Filter untuk memilih kolom/fitur yang paling informatif berdasarkan korelasi statistik dengan target.**

> [!ad-libitum]- Additional Information
> 
> #### Metode Imputasi Tingkat Lanjut
> 
> Selain imputasi sederhana (mean/median/modus), ada teknik yang lebih canggih:
> 
> - **Multivariate Imputation by Chained Equations (MICE)**: Metode ini memodelkan setiap fitur yang memiliki nilai hilang sebagai fungsi dari fitur-fitur lainnya, lalu menggunakan model tersebut untuk melakukan imputasi. Proses ini diulang beberapa kali hingga nilai-nilai yang diimputasi konvergen.
>     
> - **k-Nearest Neighbors (k-NN) Imputation**: Untuk mengisi nilai hilang pada sebuah sampel, metode ini mencari k sampel terdekat (tetangga) yang tidak memiliki nilai hilang pada fitur tersebut, lalu mengimputasi nilai berdasarkan rata-rata atau modus dari tetangga-tetangga tersebut.
>     
> 
> #### Teknik Feature Selection (Lanjutan)
> 
> Selain metode Filter, ada dua kategori utama lainnya:
> 
> - **Metode Wrapper**: Metode ini "membungkus" sebuah model machine learning. Ia menggunakan performa model tersebut sebagai kriteria untuk memilih subset fitur. Prosesnya adalah dengan mencoba berbagai kombinasi fitur, melatih model pada setiap kombinasi, dan memilih kombinasi yang memberikan performa terbaik. Contoh:
>     
>     - **Recursive Feature Elimination (RFE)**: Awalnya model dilatih dengan semua fitur. Kemudian, fitur yang paling tidak penting (misalnya, yang memiliki koefisien terkecil) dihapus. Proses ini diulang secara rekursif hingga jumlah fitur yang diinginkan tercapai.
>         
> - **Metode Embedded**: Metode ini mengintegrasikan proses pemilihan fitur sebagai bagian dari proses training model itu sendiri. Model secara inheren melakukan pemilihan fitur selama proses belajar. Contoh:
>     
>     - **LASSO Regression (L1 Regularization)**: Sebuah varian dari regresi linear yang menambahkan "penalty" setara dengan nilai absolut dari besarnya koefisien. Penalty ini memaksa koefisien dari fitur yang tidak penting untuk menjadi nol, sehingga secara efektif menghapusnya dari model.
>         
> 
> #### Penanganan Data Tidak Berimbang (Imbalanced Data)
> 
> - **Resampling**:
>     
>     - **Oversampling**: Menambah jumlah sampel dari kelas minoritas. Cara paling populer adalah **SMOTE (Synthetic Minority Over-sampling Technique)**, yang menciptakan sampel sintetis baru alih-alih hanya menduplikasi sampel yang ada.
>         
>     - **Undersampling**: Mengurangi jumlah sampel dari kelas mayoritas. Berisiko kehilangan informasi penting.
>         
> - **Cost-Sensitive Learning**: Memodifikasi algoritma pembelajaran untuk memberikan "bobot" atau "biaya" yang lebih besar pada kesalahan klasifikasi kelas minoritas.
>     
> 
> #### Tools dan Software
> 
> - **Python Libraries**:
>     
>     - `scikit-learn`: Menyediakan berbagai alat untuk imputasi (`SimpleImputer`, `KNNImputer`), feature selection (`SelectKBest`, `RFE`), dan regularisasi (`Lasso`).
>         
>     - `imbalanced-learn`: Pustaka khusus untuk menangani data tidak berimbang, menyediakan implementasi SMOTE dan berbagai teknik undersampling.
>         
>     - `feature-engine`: Pustaka yang didedikasikan untuk feature engineering dan imputasi.
>