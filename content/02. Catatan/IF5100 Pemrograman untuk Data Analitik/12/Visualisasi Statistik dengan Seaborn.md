---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Visualisasi Statistik dengan Seaborn
>
> > ## Questions/Cues
> >
> > - Apa peran pandas, matplotlib, dan seaborn dalam visualisasi data Python?
> > - Apa beda histogram (numerik) dan countplot (kategorikal), dan apa fungsi parameter KDE?
> > - Bagaimana membaca boxplot (Q1, median, Q3, outlier) dan membuatnya per kelompok?
> > - Kapan memakai scatter plot dan bagaimana korelasi diukur?
> > - Bagaimana heatmap dan heatmap koefisien korelasi dibuat serta dibaca?
> >
> > ## Reference Points
> >
> > - IF5100 — Dataviz (Pages 72-88)
>
> > ### Tiga Library Utama
> >
> > | Library | Peran |
> > | --- | --- |
> > | **pandas** | Menyediakan plotting dasar langsung dari DataFrame (`df.plot(...)`) |
> > | **matplotlib** | Library plotting 2-D yang meniru grafik MATLAB; fondasi hampir semua plot Python |
> > | **seaborn** | Dibangun di atas matplotlib; antarmuka tingkat tinggi untuk grafik statistik yang menarik dan informatif |
> >
> > Dengan seaborn kita tidak perlu menerjemahkan variabel menjadi parameter visual (warna atau marker per kategori) secara manual; cukup menyebut kolom pada `x`, `y`, `hue`, dan `data`.
> >
> > ### Taksonomi DataViz (Kirk, 2012)
> >
> > Metode visualisasi dikelompokkan menurut tugasnya:
> >
> > - **Categorical**: membandingkan ukuran relatif dan absolut nilai kategorikal (bar chart, dot plot).
> > - **Hierarchical**: memecah nilai kategorikal dalam relasinya dengan keseluruhan atau struktur hierarki (donut chart).
> > - **Relational**: menilai asosiasi, distribusi, dan pola pada data multivariat (scatterplot, sankey).
> > - **Temporal**: menunjukkan tren dan pola nilai pada rentang waktu kontinu (line chart, stream graph).
> > - **Spatial**: memetakan data berproperti geospasial (choropleth, cartogram).
> >
> > Taksonomi ini dirinci lagi pada catatan [[Taksonomi Metode Visualisasi - Kategorikal dan Hierarkis]] dan [[Visualisasi Temporal dan Relasional]].
> >
> > ```mermaid
> > graph TD
> >     Q["Apa yang ingin dilihat?"] --> D["Distribusi satu variabel"]
> >     Q --> R["Hubungan dua variabel"]
> >     Q --> M["Banyak variabel numerik"]
> >     D --> DN["Numerik: histogram / KDE / boxplot"]
> >     D --> DC["Kategorik: countplot"]
> >     R --> RS["Scatter plot (+ hue)"]
> >     M --> MH["Heatmap korelasi"]
> > ```
> >
> > ### Histogram untuk Data Numerik
> >
> > Histogram menggambarkan **distribusi** data: rentang nilai dibagi menjadi **bin**, lalu batang menunjukkan jumlah observasi di tiap bin. Dengan seaborn:
> >
> > ```python
> > import seaborn as sns
> > sns.histplot(data=df, x="age", bins=20, kde=True)
> > ```
> >
> > Slide memakai `distplot` (kini deprecated, digantikan `histplot` dan `displot`). Parameter **KDE** (*kernel density estimate*) menambahkan kurva densitas halus di atas histogram; `kde=False` menghapusnya sehingga hanya tersisa hitungan per bin. Jumlah bin sangat memengaruhi bentuk: terlalu sedikit menyembunyikan struktur, terlalu banyak menampakkan noise.
> >
> > ### Countplot untuk Data Kategorikal
> >
> > **Countplot** adalah histogram untuk variabel kategorikal: menghitung observasi per kategori dan menampilkannya sebagai batang.
> >
> > ```python
> > sns.countplot(data=df, x="kategori", hue="kelompok", order=df["kategori"].value_counts().index)
> > ```
> >
> > Parameter berguna: `hue` (pemisah sub-kategori), `order` (urutan batang), `orient`, `palette`.
> >
> > ### Boxplot
> >
> > Boxplot meringkas distribusi dengan **lima angka**: minimum, **Q1** (kuartil pertama), **median**, **Q3** (kuartil ketiga), dan maksimum. Kotak menunjukkan rentang **IQR = Q3 - Q1**; whisker biasanya sampai 1,5 x IQR dari kotak, dan titik di luar itu digambar sebagai **outlier**. Boxplot sangat baik untuk membandingkan distribusi antar kelompok dan mendeteksi outlier.
> >
> > ```python
> > sns.boxplot(data=df, x="kelas", y="nilai", hue="gender")  # dikelompokkan 2 kategori
> > ```
> >
> > ### Scatter Plot dan Koefisien Korelasi
> >
> > **Scatter plot** menunjukkan hubungan antara x dan y; pola naik, turun, atau menyebar menandakan korelasi positif, negatif, atau lemah. Koefisien korelasi (Pearson, `df.corr()`) bernilai -1 sampai 1: mendekati 1 berarti hubungan linier positif kuat, mendekati -1 negatif kuat, dan mendekati 0 berarti tidak ada hubungan linier. Korelasi bukan kausalitas, dan hubungan non-linier bisa menghasilkan koefisien kecil.
> >
> > ### Heatmap
> >
> > **Heatmap** merepresentasikan **pivot table** atau matriks: grid persegi panjang tempat tiap sel diberi **intensitas warna** sesuai nilainya. Penggunaan paling umum adalah **heatmap koefisien korelasi** antar kolom numerik:
> >
> > ```python
> > sns.heatmap(df.corr(numeric_only=True), annot=True, cmap="coolwarm", vmin=-1, vmax=1, center=0)
> > ```
> >
> > Dengan `annot=True` nilai tampil di tiap sel, dan skala divergen berpusat di 0 memudahkan membedakan korelasi positif dan negatif.
>
> [!cornell] #### Summary
> Python menyediakan pandas (plot dasar dari DataFrame), matplotlib (fondasi plotting 2-D), dan seaborn (antarmuka tingkat tinggi untuk grafik statistik). Taksonomi Kirk membagi metode menjadi categorical, hierarchical, relational, temporal, dan spatial. Untuk eksplorasi statistik: histogram dan KDE untuk distribusi numerik, countplot untuk hitungan kategori, boxplot (min, Q1, median, Q3, max, outlier) untuk membandingkan distribusi antar grup, scatter plot dengan koefisien korelasi untuk hubungan dua variabel, serta heatmap untuk menampilkan pivot table atau matriks korelasi dengan intensitas warna.

> [!ad-libitum]- Additional Information
>
> #### API Seaborn Modern
> Seaborn >= 0.11 membagi fungsi menjadi tingkat **figure-level** (`displot`, `catplot`, `relplot`, `pairplot`, `lmplot`; mengelola figure sendiri dan mendukung `col=`/`row=`) dan **axes-level** (`histplot`, `kdeplot`, `boxplot`, `scatterplot`, `heatmap`; menggambar pada `ax` tertentu). Fungsi `distplot` dan argumen `normed` di `plt.hist` (diganti `density=True`) sudah dihapus atau deprecated, sehingga kode slide perlu disesuaikan saat dijalankan di Colab terbaru.
>
> #### Variasi Berguna
> - `sns.violinplot` menggabungkan boxplot dan KDE; `sns.stripplot`/`swarmplot` menampilkan semua titik.
> - `sns.pairplot(df, hue="target")` membuat scatter matrix beserta histogram diagonal.
> - Korelasi Spearman (`df.corr(method="spearman")`) lebih tahan terhadap outlier dan hubungan monoton non-linier.
> - Segitiga atas heatmap korelasi redundan; sembunyikan dengan `mask=np.triu(np.ones_like(corr, dtype=bool))`.
>
> #### Proyek Eksplorasi Mandiri
> - Muat dataset `tips` atau `penguins` dari seaborn, buat satu histogram+KDE, satu countplot, satu boxplot per grup, satu scatter dengan `hue`, dan satu heatmap korelasi; tulis satu temuan dari tiap plot.
> - Eksperimen jumlah bin (5, 20, 100) dan catat bagaimana kesimpulan tentang bentuk distribusi berubah.
>
> #### Bacaan Lanjutan
> - Dokumentasi seaborn: https://seaborn.pydata.org (tutorial "Choosing plot types").
> - Dokumentasi matplotlib: https://matplotlib.org/stable/tutorials/
> - Jake VanderPlas, *Python Data Science Handbook*, bab Visualization with Matplotlib.
