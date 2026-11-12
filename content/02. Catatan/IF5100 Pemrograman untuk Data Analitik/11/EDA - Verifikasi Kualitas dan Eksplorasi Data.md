---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] EDA - Verifikasi Kualitas dan Eksplorasi Data
>
> > ## Questions/Cues
> >
> > - Apa lima hal yang diperiksa saat memverifikasi kualitas data?
> > - Bagaimana mendeteksi missing value, dan mengapa tanda "?" bisa menyesatkan tipe data?
> > - Bagaimana kode deteksi outlier dengan IQR bekerja dan bagaimana pengaruh pengali (1,5 vs 3)?
> > - Apa yang dimaksud data exploration lewat query, visualisasi, dan statistik?
> > - Operasi query pandas apa saja: seleksi baris/kolom, agregasi, dan grouping?
> >
> > ## Reference Points
> >
> > - IF5100 — Data Processing Pipeline, EDA, Pre-processing, Feature Engineering (Pages 34-53)
>
> > ### 2. Verify Data Quality
> >
> > Setelah mendeskripsikan data, kita memeriksa kualitasnya lewat lima pertanyaan:
> >
> > - Adakah **missing values**?
> > - Adakah **kesalahan penetapan tipe data**?
> > - Adakah **noise atau data inkonsisten**?
> > - Adakah **outlier**?
> > - Adakah **data imbalanced**?
> >
> > **Missing values.** Pada dataset *CC* hasilnya baik: tidak ada nilai null sama sekali. Pada dataset *CarPrices* pemeriksaan menemukan kolom dengan nilai hilang (diperiksa lewat `isnull()`/`info()` dan dijumlahkan per kolom).
> >
> > **Kesalahan tipe data.** Dataset CarPrices (Automobile) memiliki 26 atribut dengan dokumentasi tipe: `symboling` (-3 sampai 3), `normalized-losses` (kontinu 65-256), `make`, `fuel-type`, `aspiration`, `num-of-doors` (four/two), `body-style`, `drive-wheels`, `engine-location`, `wheel-base`, `length`, `width`, `height`, `curb-weight`, `engine-type`, `num-of-cylinders` (eight, five, four, six, three, twelve, two), `engine-size`, `fuel-system`, `bore`, `stroke`, `compression-ratio`, `horsepower`, `peak-rpm`, `city-mpg`, `highway-mpg`, `price` (5118-45400). Dengan membandingkan dokumentasi ini dengan `df.dtypes`, kita menemukan atribut yang seharusnya numerik tetapi terbaca sebagai `object`.
> >
> > **Noise.** Slide mengajukan pertanyaan: apakah ada attribute noise (salah entri atau pelanggaran batasan data) dan apakah ada data inkonsisten? Ini diperiksa dengan membandingkan nilai terhadap rentang yang sah dan mencari kontradiksi antar baris.
> >
> > **Outlier.** Kode slide menghitung, untuk setiap atribut bertipe `int64`/`float64`, nilai `Q1`, `Q3`, `IQR = Q3 - Q1`, lalu batas `min_IQR = Q1 - 1.5*IQR` dan `max_IQR = Q3 + 1.5*IQR`. Bila `min < min_IQR` dicetak "Low outlier is found", bila `max > max_IQR` dicetak "High outlier is found".
> >
> > ```python
> > for c in df.select_dtypes(include=["int64","float64"]).columns:
> >     Q1, Q3 = df[c].quantile(0.25), df[c].quantile(0.75)
> >     IQR = Q3 - Q1
> >     lo, hi = Q1 - 1.5*IQR, Q3 + 1.5*IQR
> >     if df[c].min() < lo: print(c, "low outlier")
> >     if df[c].max() > hi: print(c, "high outlier")
> > ```
> >
> > Peringatan slide: hati-hati menentukan **ambang** pembuangan outlier. Ambang ditentukan dengan mengalikan IQR dengan sebuah angka (misalnya 1,5). **Semakin besar** pengali (misalnya 3), **semakin sedikit** outlier terdeteksi; semakin kecil pengali, semakin banyak.
> >
> > **Imbalanced data.** Distribusi kelas target diperiksa dengan `value_counts()`. Slide menandai bahwa kelasnya "heavily skewed" dan harus ditangani nanti (lihat catatan reduksi dimensi dan data imbalanced).
> >
> > ### 3. Data Exploration
> >
> > Eksplorasi memakai tiga alat: **query data**, **visualisasi**, dan **statistik**, untuk menemukan karakteristik atau subset menarik yang layak diselidiki lebih jauh.
> >
> > **Query data** di pandas mencakup:
> >
> > - **Selecting instances**: memilih baris dengan satu atau banyak filter (boolean indexing), misalnya `df[(df.price > 20000) & (df["fuel-type"] == "gas")]`.
> > - **Selecting columns**: `df["price"]` atau `df[["make","price"]]`.
> > - **Aggregating data**: ringkasan seperti `mean()`, `sum()`, `count()`, `max()`, atau beberapa fungsi sekaligus lewat `agg()`.
> > - **Grouping data**: `df.groupby("make")["price"].mean()` untuk membandingkan statistik antar kelompok.
> >
> > **Visualisasi.** Slide mengutip Tukey: *"The greatest value of a picture is when it forces us to notice what we never expected to see."* Materi visualisasi diperdalam di modul pekan berikutnya.
> >
> > ```mermaid
> > graph TD
> >     Q["Verify Data Quality"] --> M["Missing values"]
> >     Q --> T["Tipe data salah"]
> >     Q --> N["Noise / inkonsisten"]
> >     Q --> O["Outlier (IQR)"]
> >     Q --> I["Imbalanced"]
> >     M --> X["Data Exploration:<br/>query, visualisasi, statistik"]
> >     T --> X
> >     N --> X
> >     O --> X
> >     I --> X
> > ```
> >

> [!cornell] #### Summary
>
> Verifikasi kualitas data memeriksa **missing value**, **kesalahan tipe data** (bandingkan dokumentasi atribut dengan `dtypes`), **noise/inkonsistensi**, **outlier**, dan **imbalanced data**. Outlier dideteksi dengan aturan IQR per atribut numerik; pengali yang lebih besar (3 daripada 1,5) membuat lebih sedikit outlier terdeteksi sehingga ambang harus dipilih hati-hati. Tahap **data exploration** memakai **query** (seleksi instance dan kolom, agregasi, grouping), **visualisasi**, dan **statistik** untuk menemukan karakteristik dan subset menarik sebagai dasar hipotesis.

> [!ad-libitum]- Additional Information
>
> #### Pola Pandas untuk Verifikasi Cepat
>
> ```python
> df.isnull().sum()                      # missing per kolom
> (df == "?").sum()                      # missing tersembunyi
> df.duplicated().sum()                  # jumlah baris duplikat
> df["target"].value_counts(normalize=True)   # proporsi kelas
> ```
> Missing yang ditulis `?`, `-`, `N/A`, atau `0` tidak terdeteksi `isnull()`; gunakan `pd.read_csv(..., na_values=["?"])` agar langsung terbaca sebagai `NaN`.
>
> #### Metode Lain Mendeteksi Outlier
>
> Selain IQR: **z-score** (|z| > 3), **Isolation Forest**, **Local Outlier Factor**, dan inspeksi visual lewat **boxplot**. Z-score peka terhadap outlier itu sendiri (mean dan std ikut terseret), sedangkan IQR lebih **robust** karena berbasis kuartil.
>
> #### Groupby dan Agregasi Lanjut
>
> `df.groupby(["make","fuel-type"]).agg(avg_price=("price","mean"), n=("price","size"))` memakai *named aggregation*; `pivot_table` dan `crosstab` berguna untuk tabel silang antar atribut kategorikal.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Pada dataset CarPrices, temukan semua missing tersembunyi (`?`) dan laporkan proporsinya per kolom.
> 2. Bandingkan jumlah outlier dengan pengali 1,5 dan 3 untuk setiap atribut numerik; buat tabelnya.
> 3. Gunakan `groupby` untuk menjawab: merek apa yang paling mahal rata-rata dan apakah itu didorong oleh outlier?
>
> #### Bacaan Lanjutan
>
> - McKinney, *Python for Data Analysis*, Bab 10 (Data Aggregation and Group Operations).
> - Aggarwal, *Outlier Analysis*, Bab 1-2.
> - Dokumentasi pandas, *Group by: split-apply-combine*.
