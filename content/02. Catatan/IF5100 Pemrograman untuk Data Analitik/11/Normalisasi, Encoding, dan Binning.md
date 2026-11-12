---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Normalisasi, Encoding, dan Binning
>
> > ## Questions/Cues
> >
> > - Mengapa data numerik perlu dinormalisasi, dan apa beda MinMaxScaler dengan StandardScaler?
> > - Bagaimana menghitung nilai terskala dari contoh slide (0,664 dan 0,513)?
> > - Apa tiga jenis categorical encoding dan kapan masing-masing dipakai?
> > - Apa itu binning/discretization dan apa bedanya dengan encoding?
> > - Bagaimana encoding dilakukan dengan scikit-learn?
> >
> > ## Reference Points
> >
> > - IF5100 — Data Processing Pipeline, EDA, Pre-processing, Feature Engineering (Pages 64-68, 72-78)
>
> > ### Data Normalization (Scaling)
> >
> > Atribut numerik sering memiliki skala sangat berbeda (misalnya `horsepower` 48-288 vs `bore` 2,54-3,94). Algoritma yang peka jarak atau gradien (KNN, SVM, regresi dengan regularisasi, neural network, PCA) bisa didominasi atribut berskala besar. Slide menampilkan dua metode di `sklearn.preprocessing`.
> >
> > **MinMaxScaler** memetakan nilai ke rentang [0, 1]:
> >
> > `x' = (x - min) / (max - min)`
> >
> > Contoh slide pada atribut `bore` (min 2,54; max 3,94) untuk nilai 3,47: `Z = (3,47 - 2,54) / (3,94 - 2,54) = 0,93 / 1,40 = 0,664`.
> >
> > ```python
> > from sklearn.preprocessing import MinMaxScaler
> > min_max_scaler = MinMaxScaler()
> > newdf = df.select_dtypes(include=['float64'])
> > newdf_scaled = min_max_scaler.fit_transform(newdf)
> > newdf = pd.DataFrame(newdf_scaled)
> > ```
> >
> > **StandardScaler** (standardisasi) membuat rata-rata 0 dan simpangan baku 1:
> >
> > `z = (x - μ) / σ`
> >
> > Contoh slide: μ = 3,329751 dan σ = 0,273539, sehingga untuk x = 3,47 diperoleh `z = (3,47 - 3,329751) / 0,273539 = 0,513`.
> >
> > ```python
> > from sklearn.preprocessing import StandardScaler
> > sc = StandardScaler()
> > df_std = df.select_dtypes(include=['float64']).dropna()
> > df_std = pd.DataFrame(sc.fit_transform(df_std))
> > ```
> >
> > Perhatikan pada kode slide: missing value dibuang (`dropna()`) sebelum scaling karena scaler tidak menerima NaN. Output `fit_transform` berupa array NumPy sehingga dibungkus kembali menjadi DataFrame (nama kolom hilang dan perlu diberikan ulang).
> >
> > ### Data Formatting
> >
> > Ada dua arah konversi: **categorical encoding** (kategorikal menjadi numerik) dan **binning/discretization** (numerik menjadi kategorikal).
> >
> > ### Categorical Encoding
> >
> > Tiga teknik di slide:
> >
> > 1. **Direct encoding**: untuk atribut kategorikal yang sebenarnya mewakili angka. Contoh `num_doors`: `two, four` menjadi `{2, 4}`.
> > 2. **Label encoding**: untuk atribut **ordinal**. Contoh `size` `{S, M, L}` menjadi `{1, 2, 3}`; urutan numerik mencerminkan urutan kategori.
> > 3. **One-hot encoding**: untuk atribut **multivalue** (nominal). Contoh `city` `{BDO, JKT, ...}` diwakili kolom biner `city_BDO`, `city_JKT`, dan seterusnya, sehingga tidak ada urutan palsu antar kota.
> >
> > ```mermaid
> > graph TD
> >     A["Atribut kategorikal"] --> B{"Jenis nilai?"}
> >     B -->|"Mewakili angka"| C["Direct encoding<br/>two, four menjadi 2, 4"]
> >     B -->|"Ordinal"| D["Label encoding<br/>S, M, L menjadi 1, 2, 3"]
> >     B -->|"Nominal banyak nilai"| E["One-hot encoding<br/>city_BDO, city_JKT, ..."]
> > ```
> >
> > Slide kemudian mendemonstrasikan encoding dengan **scikit-learn** (misalnya `LabelEncoder`/`OrdinalEncoder` dan `OneHotEncoder`), selain cara pandas seperti `replace`/`map` dan `pd.get_dummies`.
> >
> > ### Binning/Discretization
> >
> > Kebalikan encoding: atribut numerik dipecah menjadi **rentang (bin)** yang diberi label kategori, misalnya `price` menjadi `murah/sedang/mahal` atau usia menjadi kelompok umur. Di pandas dilakukan dengan `pd.cut()` (lebar bin tetap atau batas manual) atau `pd.qcut()` (bin berisi jumlah data sama/kuantil). Binning meredam noise kecil dan membuat hubungan non-linear lebih mudah ditangkap, dengan harga kehilangan sebagian presisi.

> [!cornell] #### Summary
>
> **Normalisasi** menyamakan skala atribut numerik: **MinMaxScaler** `(x - min)/(max - min)` ke [0,1] (contoh 3,47 pada rentang 2,54-3,94 menghasilkan 0,664) dan **StandardScaler** `z = (x - μ)/σ` (contoh menghasilkan 0,513), keduanya lewat `fit_transform` dan menuntut data tanpa NaN. **Data formatting** mencakup **categorical encoding**: **direct** (kategori yang berupa angka), **label** (ordinal, S/M/L menjadi 1/2/3), dan **one-hot** (nominal banyak nilai menjadi kolom biner) termasuk implementasi scikit-learn, serta **binning/discretization** yang mengubah numerik menjadi kategorikal (`pd.cut`/`pd.qcut`).

> [!ad-libitum]- Additional Information
>
> #### Kapan Memilih Scaler Apa
>
> - **MinMaxScaler**: butuh rentang terbatas (neural network, citra), tetapi sangat peka outlier.
> - **StandardScaler**: asumsi mendekati Gaussian, umum untuk regresi linier, SVM, PCA.
> - **RobustScaler**: memakai median dan IQR sehingga tahan outlier.
> Model berbasis pohon (decision tree, random forest, gradient boosting) umumnya **tidak memerlukan** scaling.
>
> #### Hindari Data Leakage
>
> `fit` scaler hanya pada **data latih**, lalu `transform` data latih dan uji dengan parameter yang sama:
> ```python
> sc = StandardScaler().fit(X_train)
> X_train_s, X_test_s = sc.transform(X_train), sc.transform(X_test)
> ```
> Memanggil `fit_transform` pada seluruh data sebelum split membocorkan informasi data uji ke latihan.
>
> #### Encoding di scikit-learn
>
> ```python
> from sklearn.preprocessing import OrdinalEncoder, OneHotEncoder
> OrdinalEncoder(categories=[["S","M","L"]])        # urutan eksplisit
> OneHotEncoder(handle_unknown="ignore", drop="first")
> ```
> `LabelEncoder` dirancang untuk **target** (y), bukan fitur; untuk fitur ordinal gunakan `OrdinalEncoder`. One-hot menghasilkan banyak kolom bila kardinalitas tinggi; alternatifnya **target encoding** atau **hashing**. `drop="first"` menghindari *dummy variable trap* (multikolinearitas) pada model linear.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Hitung manual MinMax dan z-score untuk 5 nilai `bore`, lalu verifikasi dengan scikit-learn.
> 2. Bandingkan akurasi KNN pada data mentah, MinMax, dan Standard; amati pengaruh outlier.
> 3. Terapkan `pd.cut` vs `pd.qcut` pada `price` dan bandingkan distribusi tiap bin.
>
> #### Bacaan Lanjutan
>
> - Dokumentasi scikit-learn, *Preprocessing data* (scaling, encoding, discretization).
> - Géron, *Hands-On Machine Learning*, Bab 2 (Prepare the Data).
> - Kuhn & Johnson, *Feature Engineering and Selection*, Bab 5-6.
