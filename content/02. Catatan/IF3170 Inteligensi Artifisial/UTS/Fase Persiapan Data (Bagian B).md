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
> > - Apa itu Konstruksi Data?
> >     
> > - Apa itu Reduksi Data?
> >     
> > - Apa bedanya Feature Selection dan Feature Extraction?
> >     
> > - Apa itu PCA?
> >     
> > - Apa itu Transformasi Data?
> >     
> > - Apa itu Binning?
> >     
> > - Apa itu Normalisasi?
> >     
> > - Kapan menggunakan Normalisasi?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170-Data-Understanding-and-Preparation.pdf (Slide 90-107)
> >     
> 
> > ### Konstruksi Data (Data Construction)
> > 
> > Ini adalah proses menurunkan atribut baru dari atribut yang sudah ada. Tujuannya adalah untuk membuat data lebih informatif dan mudah dipahami oleh model. Ini sering disebut sebagai **Feature Engineering**.
> > 
> > #### Reduksi Data (Data Reduction)
> > 
> > Tujuannya adalah mendapatkan representasi data yang lebih kecil volumenya tapi tetap memberikan hasil analitis yang sama.
> > 
> > 1. **Reduksi Dimensi (Dimensionality Reduction)**: Mengurangi jumlah kolom/atribut.
> >     
> >     - **Feature Selection**: Telah dibahas sebelumnya. _Memilih_ subset fitur terbaik.
> >         
> >     - **Feature Extraction**: _Menciptakan_ set fitur baru yang lebih kecil dari kombinasi fitur asli. Contoh paling populer adalah **Principal Component Analysis (PCA)**, yang mengubah fitur-fitur yang berkorelasi menjadi satu set fitur baru yang tidak berkorelasi (disebut _principal components_), lalu kita bisa membuang komponen yang paling tidak signifikan. Perbedaannya, fitur hasil PCA tidak lagi bisa diinterpretasikan seperti fitur asli.
> >         
> > 2. **Pengurangan Data (Numerosity Reduction)**: Mengurangi jumlah baris/sampel.
> >     
> >     - **Sampling**: Telah dibahas sebelumnya.
> >         
> >     - **Clustering**: Mengelompokkan data yang mirip dan mengganti semua data dalam satu klaster dengan satu titik representatif (misalnya, _centroid_).
> >         
> >     - **Model Parametrik**: Mengganti data aktual dengan parameter dari sebuah model. Contoh: sekelompok titik data yang membentuk garis lurus bisa digantikan hanya dengan parameter `slope` dan `intercept` dari model regresi.
> >         
> > 
> > ### Transformasi Data (Data Transformation)
> > 
> > Ini adalah proses mengubah format, struktur, atau nilai data.
> > 
> > 1. **Data Smoothing (Binning/Discretization)**:
> >     
> >     - Mengelompokkan nilai-nilai data kontinu ke dalam interval atau "bin" yang lebih kecil.
> >         
> >     - Contoh: Mengubah atribut `usia` (numerik) menjadi kategori `muda`, `paruh baya`, `tua` (ordinal).
> >         
> >     - Berguna untuk mengurangi _noise_ dan membuat model lebih robust, tapi mengorbankan informasi detail.
> >         
> > 2. **Attribute Construction**:
> >     
> >     - Membuat fitur baru dari fitur yang ada.
> >         
> >     - Contoh: Membuat atribut `luas_bangunan` dari `panjang` dan `lebar`. Atau membuat `rasio_utang_pendapatan` dari dua kolom terpisah.
> >         
> > 3. **Aggregation**:
> >     
> >     - Menggabungkan beberapa data menjadi satu ringkasan.
> >         
> >     - Contoh: Mengubah data `penjualan_harian` menjadi `penjualan_bulanan`.
> >         
> > 4. **Normalization (Normalisasi)**:
> >     
> >     - Teknik penskalaan untuk mengubah rentang nilai data numerik. Ini sangat penting untuk algoritma yang sensitif terhadap skala fitur, seperti SVM, k-NN, dan regresi dengan regularisasi.
> >         
> >     - **Min-Max Normalization**: Menskalakan data ke rentang [0, 1]. Formulanya: Xnorm​=(X−Xmin​)/(Xmax​−Xmin​).
> >         
> >     - **Standardization (Z-score Normalization)**: Menskalakan data sehingga memiliki `mean = 0` dan `standard deviation = 1`. Formulanya: Xstd​=(X−mean)/std_dev.
> >         

> [!cornell] #### Summary
> 
> **Setelah data dibersihkan dan dipilih, proses persiapan dilanjutkan dengan** _**Data Construction**_**, di mana fitur-fitur baru dapat dibuat (**_**feature engineering**_**) atau volume data dikurangi melalui Reduksi Dimensi (seperti PCA) dan Reduksi Jumlah (seperti clustering). Terakhir,** _**Data Transformation**_ **dilakukan untuk mengubah data ke format yang lebih sesuai untuk model, seperti** _**Binning**_ **untuk diskritisasi dan** _**Normalization**_ **(Min-Max atau Standardization) untuk menyamakan skala fitur, yang merupakan langkah wajib bagi banyak algoritma machine learning.**

> [!ad-libitum]- Additional Information
> 
> #### Matematika di Balik PCA
> 
> Principal Component Analysis (PCA) secara matematis adalah proses dekomposisi ortogonal yang mengubah data ke sistem koordinat baru. Langkah-langkahnya adalah:
> 
> 1. **Standardisasi Data**: Pastikan setiap fitur memiliki mean 0 dan standar deviasi 1.
>     
> 2. **Hitung Matriks Kovarians**: Matriks ini menunjukkan bagaimana setiap variabel berhubungan satu sama lain.
>     
> 3. **Dekomposisi Eigen**: Hitung **eigenvectors** dan **eigenvalues** dari matriks kovarians.
>     
>     - **Eigenvectors**: Merupakan arah dari sumbu-sumbu baru (Principal Components). Mereka ortogonal satu sama lain.
>         
>     - **Eigenvalues**: Menunjukkan besarnya varians data pada arah eigenvector tersebut.
>         
> 4. **Pilih Komponen Utama**: Urutkan eigenvectors berdasarkan eigenvalues dari yang terbesar hingga terkecil. Pilih _k_ eigenvectors teratas (di mana _k_ adalah jumlah dimensi baru yang diinginkan).
>     
> 5. **Transformasi Data**: Proyeksikan data asli ke sub-ruang yang dibentuk oleh _k_ eigenvectors terpilih.
>     
> 
> #### Teknik Encoding untuk Variabel Kategorikal
> 
> Algoritma ML memerlukan input numerik, jadi variabel kategorikal harus di-encode:
> 
> - **One-Hot Encoding**: Membuat kolom biner baru untuk setiap kategori. Contoh: Fitur `Warna` dengan nilai `Merah`, `Biru` akan menjadi dua kolom: `Warna_Merah` (1 atau 0) dan `Warna_Biru` (1 atau 0). Cocok untuk fitur nominal dengan kardinalitas rendah.
>     
> - **Label Encoding**: Menetapkan setiap kategori dengan sebuah integer unik (misal: `Merah=0`, `Biru=1`). Cocok untuk fitur ordinal, tetapi bisa menyesatkan model jika digunakan pada fitur nominal karena model bisa salah mengartikan adanya urutan.
>     
> - **Target Encoding**: Mengganti setiap kategori dengan nilai rata-rata dari variabel target. Sangat kuat tetapi berisiko tinggi mengalami _overfitting_ jika tidak diimplementasikan dengan hati-hati (biasanya menggunakan regularisasi atau cross-validation).
>     
> 
> #### Transformasi untuk Data Miring (Skewed Data)
> 
> Banyak model bekerja lebih baik jika fitur numerik terdistribusi secara normal. Jika histogram fitur menunjukkan kemiringan (skewness) yang tinggi:
> 
> - **Log Transformation**: Mengambil logaritma natural dari setiap nilai. Sangat efektif untuk data yang miring ke kanan (_right-skewed_).
>     
> - **Box-Cox Transformation**: Transformasi daya yang secara otomatis menemukan eksponen terbaik untuk menormalkan data. Lebih fleksibel daripada transformasi log.
>     
> 
> #### Tools dan Software
> 
> - **Python `scikit-learn`**:
>     
>     - `sklearn.decomposition.PCA`: Untuk PCA.
>         
>     - `sklearn.preprocessing`: Modul ini adalah "pisau Swiss Army" untuk persiapan data, berisi `MinMaxScaler`, `StandardScaler`, `OneHotEncoder`, `LabelEncoder`, dan `PowerTransformer` (untuk Box-Cox).
>