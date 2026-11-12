---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] EDA - Memahami dan Mendeskripsikan Data dengan Pandas
>
> > ## Questions/Cues
> >
> > - Apa itu EDA dan apa arti ungkapan Tukey "EDA is detective work"?
> > - Apa tujuan tahap Data Understanding dan tiga proses di dalamnya?
> > - Apa beda jenis atribut kategorikal (binary, nominal, ordinal) dan kuantitatif (diskrit, kontinu)?
> > - Apa saja informasi yang harus ada dalam deskripsi dataset (contoh Company Bankruptcy)?
> > - Fungsi pandas apa yang dipakai untuk mendeskripsikan data (shape, info, describe, value_counts, skew)?
> >
> > ## Reference Points
> >
> > - IF5100 — Data Processing Pipeline, EDA, Pre-processing, Feature Engineering (Pages 16-33)
>
> > ### Apa itu EDA?
> >
> > **Exploratory Data Analysis** dipopulerkan oleh **John Wilder Tukey** (1915-2000). Dua kutipannya di slide: *"Exploratory Data Analysis is detective work"* dan *"EDA can never be the whole story, but nothing else can serve as the foundation stone"*. Artinya EDA bukan jawaban akhir, tetapi landasan yang tak tergantikan: kita menyelidiki data layaknya detektif sebelum membangun model.
> >
> > Persiapan praktik: **Google Colab**, dataset, dan source code `.ipynb`, dengan instalasi `!pip install seaborn` dan `!pip install scikit-learn`.
> >
> > ### Data Understanding
> >
> > Tahap ini mencakup pengumpulan data awal, **membiasakan diri dengan data** (memahami isinya), **mengidentifikasi masalah kualitas**, menemukan **insight awal**, dan mendeteksi **subset menarik** yang dapat membentuk hipotesis dari informasi tersembunyi. Prosesnya tiga langkah:
> >
> > ```mermaid
> > graph LR
> >     U["Data Understanding"] --> D["1. Describe the Data"]
> >     U --> V["2. Verify Data Quality"]
> >     U --> E["3. Data Exploration"]
> >     D --> D1["Ukuran, tipe atribut,<br/>statistik dasar"]
> >     V --> V1["Missing, tipe salah, noise,<br/>outlier, imbalanced"]
> >     E --> E1["Query, visualisasi,<br/>statistik"]
> > ```
> >
> > ### 1. Describe the Data
> >
> > Deskripsi data fokus pada **kuantitas dan kualitas** data. Karakteristik utamanya:
> >
> > - **Ukuran dataset**: jumlah instance dan atribut.
> > - **Properti tiap atribut**: tipe, rentang nilai (numerik) atau himpunan nilai (kategorikal), serta makna atribut dan nilainya (adakah nama atau nilai yang tidak diketahui atau tidak jelas?).
> > - **Statistik dasar**.
> >
> > Istilah penting: dataset terdiri atas **data object**. **Kolom** adalah variabel (disebut juga *attribute, feature, dimension*) yang menggambarkan karakteristik objek, bertipe numerik atau nominal. **Baris** adalah data object (*sample, example, data point, tuple*) yang mewakili sebuah entitas.
> >
> > **Tipe variabel**:
> >
> > - **Categorical**: *binary* (dua nilai), *nominal* (tanpa urutan, misalnya kota), *ordinal* (berurutan, misalnya ukuran S/M/L).
> > - **Quantitative**: *discrete* (bilangan cacah) dan *continuous* (nilai real).
> >
> > ### Contoh: Company Bankruptcy
> >
> > Dataset dari Kaggle (*Company Bankruptcy Prediction*), format **csv** (pemisah koma), **6.819 instance** dan **96 atribut** (termasuk 1 atribut target `Bankrupt?`). Seluruh atribut bertipe numerik (atribut 0 sampai 95), tanpa atribut nominal. Deskripsinya mencakup daftar instance (baris 0 sampai 6.818), tipe atribut, dan statistik dasar:
> >
> > - Atribut numerik: `count, mean, std, min, q1..q3, max`.
> > - Atribut nominal: `count, unique, top, freq`.
> > - Komposisi atribut: nilai dan frekuensinya.
> >
> > ### Mendeskripsikan Data dengan Pandas
> >
> > Fungsi yang dirangkum slide:
> >
> > | Perintah | Fungsi |
> > | --- | --- |
> > | `df = pd.read_csv(filename)` | memuat seluruh data ke struktur DataFrame |
> > | `df.shape` | ukuran dataset (baris, atribut) |
> > | `df.head(n)` / `df.tail(n)` | n baris teratas / terbawah |
> > | `df.sample(n)` | n baris acak |
> > | `df.info()` | ukuran dan daftar tipe atribut |
> > | `df.dtypes` | tipe data tiap atribut |
> > | `df[att].describe()` | statistik dasar satu atribut |
> > | `df[att].value_counts()` | komposisi nilai suatu atribut |
> > | `df[att].skew()` | skewness suatu atribut |
> > | `df.describe()` | statistik dasar semua atribut numerik |
> >
> > Contoh pada atribut `ROA_C`: bertipe `float64` dengan rentang 0 sampai 1,0. Slide juga mengingatkan bahwa mengganti nama kolom pada salinan DataFrame tidak mengubah `df` asli kecuali memakai parameter `inplace=True`.

> [!cornell] #### Summary
>
> **EDA** (Tukey) adalah kerja detektif yang menjadi fondasi analisis. Tahap **Data Understanding** memiliki tiga proses: **describe**, **verify quality**, dan **explore**. Deskripsi data mencakup ukuran dataset, tipe dan rentang tiap atribut, serta statistik dasar; kolom disebut atribut/feature, baris disebut instance/sample, dengan tipe **categorical** (binary, nominal, ordinal) dan **quantitative** (discrete, continuous). Pada contoh Company Bankruptcy (6.819 baris, 96 atribut numerik) pandas menyediakan `read_csv`, `shape`, `head/tail/sample`, `info`, `dtypes`, `describe`, `value_counts`, dan `skew` untuk mendeskripsikan data.

> [!ad-libitum]- Additional Information
>
> #### Membaca Skewness
>
> `skew()` mengukur kemencengan distribusi: sekitar 0 berarti simetris, positif berarti ekor panjang di kanan (mean > median), negatif sebaliknya. Skewness besar (|skew| > 1 secara praktis) sering menjadi sinyal perlunya transformasi log atau Box-Cox sebelum pemodelan.
>
> #### Tipe Data Pandas vs Tipe Statistik
>
> Pandas hanya mengenal `int64`, `float64`, `object`, `bool`, `datetime64`, `category`. Atribut ordinal atau nominal yang disimpan sebagai `object` lebih hemat memori dan lebih eksplisit bila diubah ke `category` (`df[c] = df[c].astype("category")`).
>
> ```python
> df.select_dtypes(include="number").columns     # kolom numerik
> df.describe(include="object")                  # count, unique, top, freq
> df.nunique().sort_values()                     # kardinalitas tiap kolom
> ```
>
> #### Alat EDA Otomatis
>
> Library seperti `ydata-profiling` (dahulu pandas-profiling) dan `sweetviz` menghasilkan laporan EDA lengkap dengan satu baris kode, cocok sebagai titik awal sebelum penyelidikan manual.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Unduh dataset Company Bankruptcy dan buat tabel: tipe, min, max, skewness tiap atribut, lalu urutkan dari yang paling miring.
> 2. Jalankan `ydata-profiling` dan bandingkan temuannya dengan EDA manual Anda.
> 3. Tulis fungsi `describe_dataset(df)` yang mencetak ringkasan seperti Page 25.
>
> #### Bacaan Lanjutan
>
> - Tukey, *Exploratory Data Analysis* (1977).
> - McKinney, *Python for Data Analysis*, 3rd Ed., Bab 5 dan 10.
> - Dokumentasi pandas, *Essential basic functionality*.
