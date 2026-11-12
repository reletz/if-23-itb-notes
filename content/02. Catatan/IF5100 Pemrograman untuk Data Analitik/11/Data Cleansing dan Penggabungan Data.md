---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Data Cleansing dan Penggabungan Data
>
> > ## Questions/Cues
> >
> > - Apa saja kegiatan yang tercakup dalam data preprocessing?
> > - Mengapa missing value berupa "?" harus ditangani sebelum konversi tipe dengan astype()?
> > - Bagaimana dropna() bekerja dengan parameter axis, how, thresh, dan subset?
> > - Bagaimana fillna() menggantikan missing value, dan kapan memilih drop vs fill?
> > - Apa yang perlu diperhatikan saat menggabungkan data dengan DataFrame.merge()?
> >
> > ## Reference Points
> >
> > - IF5100 — Data Processing Pipeline, EDA, Pre-processing, Feature Engineering (Pages 54-63, 69-71)
>
> > ### Cakupan Data Preprocessing
> >
> > **Data preprocessing** adalah seluruh aktivitas menyiapkan dataset hingga siap dimodelkan. Komponennya:
> >
> > - **Cleaning**: memperbaiki tipe data, menangani missing values, mengeluarkan outlier.
> > - **Formatting data**: encoding data kategorikal (juga binning).
> > - **Combining data** dari banyak sumber.
> > - **Dimensionality reduction**.
> > - **Handling imbalanced data**: undersampling dan oversampling.
> > - **Engineering features**: generation/extraction/transformation dan feature selection.
> >
> > ```mermaid
> > graph TD
> >     P["Data Preprocessing"] --> C["Cleansing"]
> >     P --> F["Formatting"]
> >     P --> M["Combining sources"]
> >     P --> R["Dimensionality reduction"]
> >     P --> B["Imbalanced handling"]
> >     P --> E["Feature engineering"]
> >     C --> C1["Tipe data"]
> >     C --> C2["Missing values"]
> >     C --> C3["Outlier"]
> > ```
> >
> > ### Data Cleansing
> >
> > Tiga langkah pembersihan dengan pandas:
> >
> > 1. **Menetapkan tipe yang benar** untuk atribut yang salah tipe: `df[col] = df[col].astype(types)`.
> > 2. **Menangani missing values** (hapus atau ganti): `df[col].fillna()` atau `df.dropna()`.
> > 3. **Mengeluarkan outlier** dengan filtering: `df[kondisi filter outlier]`.
> >
> > ### Menentukan Tipe yang Benar
> >
> > `astype()` mengubah tipe kolom. Jebakan penting dari slide: bila missing value diwakili oleh `"?"`, atribut numerik akan terbaca sebagai `object` (karena ada string di dalamnya). Maka **missing values harus ditangani terlebih dahulu** (misalnya `"?"` diganti `NaN`), baru tipe dikonversi ke `int`/`float`. Urutan sebaliknya akan memunculkan error konversi.
> >
> > ```python
> > df["price"] = df["price"].replace("?", np.nan)
> > df["price"] = df["price"].astype("float64")
> > ```
> >
> > ### Investigasi dan Penanganan Missing Values
> >
> > Investigasi dilakukan lebih dulu: kolom mana yang punya missing dan berapa banyak. Ada dua strategi, **drop** atau **replace**.
> >
> > **Drop** dengan `DataFrame.dropna(axis=0, how='any', thresh=None, subset=None, inplace=False)`:
> >
> > | Perintah | Efek |
> > | --- | --- |
> > | `df.dropna()` | buang baris yang punya minimal satu nilai hilang |
> > | `df.dropna(inplace=True)` | simpan hasil pada variabel yang sama |
> > | `df.dropna(axis='columns')` | buang kolom yang punya minimal satu nilai hilang |
> > | `df.dropna(how='all')` | buang baris yang seluruh elemennya hilang |
> > | `df.dropna(thresh=2)` | pertahankan baris dengan minimal 2 nilai non-NA |
> > | `df.dropna(subset=[col1, col2])` | tentukan kolom yang dicek |
> >
> > **Replace** dengan `DataFrame.fillna(value=None, method=None, axis=None, inplace=False, limit=None, ...)`:
> >
> > - `df[col].fillna(value, inplace=True)` mengganti null dengan suatu nilai.
> > - `df.fillna(0)` mengganti seluruh NaN dengan 0.
> > - `df.fillna(value={'A':0,'B':1,'C':2,'D':3})` mengganti NaN per kolom dengan nilai berbeda.
> > - `df.fillna(value=values, limit=1)` hanya mengganti NaN pertama.
> >
> > Pilihan praktis: drop cocok bila baris yang hilang sedikit dan acak; fill (misalnya dengan mean/median untuk numerik atau modus untuk kategorikal) menjaga jumlah data bila missing cukup banyak.
> >
> > ### Menggabungkan Data dari Banyak Sumber
> >
> > Data dari sumber berbeda perlu digabung. Dalam join/merge, perhatikan **kunci penggabungan (key)** dan **metode penggabungan** (`how`). Sintaks: `DataFrame.merge(right, how='inner', on=None, left_on=None, right_on=None, left_index=False, right_index=False, sort=False, suffixes=('_x','_y'), copy=True, indicator=False, validate=None)`. Pilihan `how` menentukan hasil: `inner` (hanya key yang ada di kedua tabel), `left`, `right`, `outer` (gabungan semuanya). Parameter `suffixes` membedakan kolom bernama sama, dan `indicator=True` menandai asal tiap baris.

> [!cornell] #### Summary
>
> **Data preprocessing** mencakup cleaning, formatting, combining, dimensionality reduction, handling imbalanced data, dan feature engineering. **Cleansing** terdiri dari memperbaiki tipe dengan `astype()` (missing berupa "?" harus ditangani dulu karena membuat kolom numerik menjadi `object`), menangani missing lewat **`dropna()`** (parameter axis, how, thresh, subset) atau **`fillna()`** (nilai tunggal, per kolom, atau dengan limit), dan menyaring outlier. Data dari banyak sumber digabung dengan **`DataFrame.merge()`**, dengan perhatian pada key dan jenis join (`inner`, `left`, `right`, `outer`).

> [!ad-libitum]- Additional Information
>
> #### Imputasi yang Lebih Cerdas
>
> `SimpleImputer(strategy="mean"|"median"|"most_frequent"|"constant")` memasukkan imputasi ke dalam pipeline. `KNNImputer` mengisi nilai dari tetangga terdekat, dan `IterativeImputer` memodelkan tiap kolom dari kolom lain. Untuk data deret waktu gunakan `ffill`/`bfill` atau interpolasi (`df.interpolate()`).
>
> #### Kolom Indikator Missing
>
> Menambahkan kolom biner `is_missing_x` (atau `SimpleImputer(add_indicator=True)`) menjaga informasi bahwa nilai tersebut dahulu hilang, yang kadang prediktif sendiri.
>
> #### Duplikat
>
> Walau tidak dirinci di slide, duplikat termasuk masalah kualitas: `df.duplicated().sum()` untuk menghitung dan `df.drop_duplicates()` untuk membuang.
>
> #### Jenis Join pada `merge`
>
> ```python
> pd.merge(a, b, on="id", how="inner")   # irisan
> pd.merge(a, b, on="id", how="left")    # semua baris a
> pd.merge(a, b, on="id", how="outer", indicator=True)
> ```
> Gunakan `validate="one_to_one"` atau `"one_to_many"` agar pandas menggugurkan merge bila asumsi kardinalitas dilanggar (mencegah baris membengkak tanpa sadar).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Pada CarPrices, ganti `?` dengan `NaN`, konversi tipe, lalu bandingkan model sederhana dengan strategi drop vs median vs `KNNImputer`.
> 2. Buat dua tabel kecil dengan key tak sepenuhnya beririsan dan tampilkan hasil keempat jenis `how`.
> 3. Tulis fungsi pembersih yang mengembalikan laporan sebelum/sesudah (jumlah baris, missing, tipe).
>
> #### Bacaan Lanjutan
>
> - Dokumentasi pandas: `DataFrame.dropna`, `DataFrame.fillna`, `DataFrame.merge`.
> - Dokumentasi scikit-learn, *Imputation of missing values*.
> - Little & Rubin, *Statistical Analysis with Missing Data*.
