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
> > - Apa itu Eksplorasi Data (EDA)?
> >     
> > - Apa saja contoh grafik univariat?
> >     
> > - Apa saja contoh grafik bi/multivariat?
> >     
> > - Apa tujuan verifikasi kualitas data?
> >     
> > - Apa saja masalah kualitas data yang umum?
> >     
> > - Apa itu _outlier_?
> >     
> > - Bagaimana cara mendeteksi outlier?
> >     
> > - Apa itu data tidak berimbang?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170-Data-Understanding-and-Preparation.pdf (Slide 40-57)
> >     
> 
> > ### Mengeksplorasi Data (Exploratory Data Analysis - EDA)
> > 
> > **Eksplorasi Data** adalah proses menggunakan visualisasi dan ringkasan statistik untuk menemukan pola, anomali, menguji hipotesis, dan memeriksa asumsi. Tujuannya adalah untuk mendapatkan "feel" terhadap data sebelum melakukan pemodelan formal.
> > 
> > **Grafik Univariat (Analisis Satu Variabel)**:
> > 
> > - **Pie Chart & Bar Chart**: Berguna untuk menampilkan distribusi frekuensi data **nominal** atau **ordinal**. Bar chart umumnya lebih disukai karena lebih mudah membandingkan panjang bar daripada luas area pie.
> >     
> > - **Histogram**: Mirip bar chart, tetapi untuk data **interval** atau **rasio**. Menampilkan distribusi frekuensi data numerik dengan mengelompokkannya ke dalam interval (_bins_).
> >     
> > 
> > **Grafik Bi/Multivariat (Analisis Hubungan Antar Variabel)**:
> > 
> > - **Box Plot (Whisker Plot)**: Menampilkan ringkasan lima angka (minimum, Q1, median, Q3, maksimum) dari data numerik. Sangat efektif untuk membandingkan distribusi antar kategori dan **mengidentifikasi outlier**.
> >     
> > - **Scatter Plot**: Menampilkan hubungan antara dua variabel **numerik**. Berguna untuk melihat pola korelasi (positif, negatif, tidak ada), klaster, dan outlier.
> >     
> > - **Heatmap**: Menggunakan warna untuk merepresentasikan nilai dalam matriks. Sangat berguna untuk memvisualisasikan matriks korelasi antar banyak variabel.
> >     
> > 
> > ### Memverifikasi Kualitas Data
> > 
> > Tujuan dari langkah ini adalah untuk memeriksa apakah data "cukup baik" untuk pemodelan. Ini melibatkan identifikasi berbagai masalah yang dapat merusak kinerja model.
> > 
> > **Masalah Kualitas Data yang Umum:**
> > 
> > 1. **Missing Values**: Adanya data yang hilang atau kosong.
> >     
> > 2. **Inconsistent Data**: Data yang mengandung kontradiksi. Contoh: `Usia: 18`, `Tanggal Lahir: 30 Juni 2020` atau nilai rating yang menggunakan skala berbeda ('A', 'B', '1', '3.5').
> >     
> > 3. **Noisy Data & Errors**: Kesalahan entri (salah ketik), pelanggaran _constraint_ (misal: usia negatif), atau format yang salah.
> >     
> > 4. **Duplicate Data**: Adanya baris data yang sama persis.
> >     
> > 5. **Outliers (Pencilan)**: Nilai data yang sangat berbeda dari sebagian besar data lainnya. Outlier bisa jadi merupakan error, tetapi bisa juga merupakan data yang valid dan menarik.
> >     
> > 6. **Imbalanced Data (Data Tidak Berimbang)**: Distribusi kelas pada label sangat tidak merata. Contoh: dalam deteksi fraud, 99.9% transaksi adalah 'tidak fraud' dan hanya 0.1% yang 'fraud'. Ini bisa membuat model cenderung memprediksi kelas mayoritas saja.
> >     
> > 
> > ### Deteksi Outlier
> > 
> > Ada dua metode umum untuk mendeteksi outlier secara statistik:
> > 
> > 1. **Menggunakan Interquartile Range (IQR)**:
> >     
> >     - Hitung `IQR = Q3 - Q1`.
> >         
> >     - Sebuah nilai dianggap outlier jika:
> >         
> >         - `Nilai < Q1 - 1.5 * IQR` (Low Outlier)
> >             
> >         - `Nilai > Q3 + 1.5 * IQR` (High Outlier)
> >             
> >     - Metode ini divisualisasikan dengan baik oleh **Box Plot**.
> >         
> > 2. **Menggunakan Standard Deviation (STD)**:
> >     
> >     - Untuk data yang terdistribusi normal, sebuah nilai dianggap outlier jika berada di luar 3 standar deviasi dari mean.
> >         
> >     - `x < (mean - 3 * STD)` atau `x > (mean + 3 * STD)`
> >         

> [!cornell] #### Summary
> 
> **Setelah data dideskripsikan, eksplorasi data (EDA) dilakukan menggunakan visualisasi seperti histogram dan scatter plot untuk menemukan pola dan hubungan awal. Secara paralel, kualitas data diverifikasi dengan memeriksa masalah umum seperti nilai yang hilang, inkonsistensi, duplikasi, dan terutama** _**outlier**_ **(yang dapat dideteksi menggunakan aturan IQR atau standar deviasi) serta data yang tidak berimbang, yang semuanya dapat berdampak negatif pada pemodelan.**

> [!ad-libitum]- Additional Information
> 
> #### Uji Statistik dalam EDA
> 
> Selain visualisasi, uji statistik formal dapat digunakan untuk memvalidasi hipotesis awal:
> 
> - **Uji Normalitas**: Untuk memeriksa apakah suatu variabel numerik mengikuti distribusi normal. Contoh: **Shapiro-Wilk Test** atau **Kolmogorov-Smirnov Test**. Ini penting karena banyak model statistik (seperti regresi linear) memiliki asumsi normalitas.
>     
> - **Uji Korelasi**: Memberikan nilai numerik untuk kekuatan hubungan.
>     
>     - **Pearson Correlation Coefficient**: Mengukur kekuatan hubungan **linear** antara dua variabel numerik. Nilainya antara -1 dan 1.
>         
>     - **Spearman's Rank Correlation**: Mengukur kekuatan hubungan **monotonik** (tidak harus linear) antara dua variabel. Bekerja pada ranking data, sehingga lebih tahan terhadap outlier.
>         
> - **Uji Hipotesis Perbandingan Grup**:
>     
>     - **T-test**: Membandingkan mean dari dua grup (misal: apakah rata-rata pembelian antara pelanggan pria dan wanita berbeda secara signifikan?).
>         
>     - **ANOVA (Analysis of Variance)**: Membandingkan mean dari lebih dari dua grup.
>         
> 
> #### Algoritma Deteksi Outlier Tingkat Lanjut
> 
> Selain metode statistik sederhana, ada algoritma yang lebih canggih:
> 
> - **Isolation Forest**: Bekerja dengan cara "mengisolasi" observasi. Outlier, yang sedikit dan berbeda, cenderung lebih mudah diisolasi daripada titik data normal.
>     
> - **Local Outlier Factor (LOF)**: Mengukur kepadatan lokal suatu titik data relatif terhadap tetangganya. Titik di daerah yang jauh lebih renggang dari tetangganya dianggap outlier.
>     
> - **DBSCAN (Density-Based Spatial Clustering of Applications with Noise)**: Algoritma clustering yang secara alami dapat mengidentifikasi titik-titik yang tidak termasuk dalam klaster mana pun sebagai _noise_ atau outlier.
>     
> 
> #### Tools dan Software
> 
> - **Python Libraries**:
>     
>     - `matplotlib`: Pustaka dasar untuk visualisasi. Memberikan kontrol penuh atas setiap elemen plot.
>         
>     - `seaborn`: Dibangun di atas matplotlib, menyediakan antarmuka tingkat tinggi untuk membuat plot statistik yang menarik dan informatif (misal: `heatmap`, `boxplot`, `violinplot`).
>         
>     - `plotly`: Untuk membuat plot interaktif yang bisa di-zoom atau di-hover untuk melihat detail, sangat berguna untuk EDA.
>         
>     - `scipy.stats`: Menyediakan implementasi untuk berbagai macam uji statistik.
>         
>     - `scikit-learn`: Menyediakan implementasi untuk algoritma deteksi outlier seperti Isolation Forest dan LOF.
>