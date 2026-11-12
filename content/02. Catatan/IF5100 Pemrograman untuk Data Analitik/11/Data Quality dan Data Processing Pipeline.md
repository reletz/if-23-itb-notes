---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5100 Pemrograman untuk Data Analitik]]

> [!cornell] Data Quality dan Data Processing Pipeline
>
> > ## Questions/Cues
> >
> > - Mengapa kualitas data menentukan kualitas hasil mining (garbage in, garbage out)?
> > - Apa saja masalah kualitas data yang umum, dan seperti apa wujudnya?
> > - Bagaimana aturan IQR (1,5 x IQR) mendeteksi outlier? Hitung untuk contoh 19 data di slide.
> > - Apa saja tahapan proses analisis data dari dataset mentah sampai dataset siap model?
> > - Apa kaitan data analysis dengan metodologi IBM Data Science dan library Python apa yang dipakai?
> >
> > ## Reference Points
> >
> > - IF5100 — Data Processing Pipeline, EDA, Pre-processing, Feature Engineering (Pages 1-15)
>
> > ### Tujuan dan Konteks Pipeline
> >
> > Materi ini diadopsi dari modul pelatihan **Pusat AI ITB** (Saiful Akbar dan Dessi P. Lestari). Dua tujuan utamanya: mahasiswa mampu melakukan **EDA** (Exploratory Data Analysis) dengan **pandas**, dan mampu melakukan **data preprocessing** serta **feature engineering** memakai library Python.
> >
> > **Data analysis** di sini adalah analisis untuk menentukan bagaimana data perlu diproses terlebih dahulu. Menurut Han & Kamber (2011) tujuannya dua: (1) **meningkatkan kualitas data**, yang kelak meningkatkan kualitas hasil mining, dan (2) meningkatkan **efisiensi dan kemudahan** proses mining. Prinsip dasarnya: data berkualitas rendah menghasilkan hasil mining berkualitas rendah (*garbage in, garbage out*), sehingga tahap ini bukan formalitas melainkan fondasi seluruh proyek data science.
> >
> > ### Masalah Kualitas Data yang Umum
> >
> > Slide merangkum lima masalah utama:
> >
> > - **Dirty/inconsistent data (noise)**. Ada dua jenis: **class noise** (label kontradiktif atau salah label) dan **attribute noise** (nilai salah akibat kesalahan entri atau pelanggaran batasan data yang diketahui). Contoh di slide: dua baris dengan `Attr1=0.25`, `Attr2=red` tetapi kelas `positive` dan `negative` (**contradiction**), serta baris dengan nilai yang jelas salah (**wrong entry**) dan label yang keliru (**mislabeled**).
> > - **Missing values**: sel yang kosong atau diwakili penanda seperti `?` atau `NaN`.
> > - **Duplicate data**: baris yang sama muncul lebih dari sekali.
> > - **Imbalanced dataset**: distribusi kelas sangat timpang. Contoh: kelas A berjumlah 1000 (**majority class**) dan kelas B hanya 10 (**minority class**).
> > - **Outliers**: sebagian data yang jaraknya abnormal dari titik lain.
> >
> > ### Mendeteksi Outlier dengan Aturan IQR
> >
> > Aturan yang dipakai: **IQR = Q3 - Q1**; **low outlier** bila nilai `< Q1 - 1,5 x IQR`; **high outlier** bila nilai `> Q3 + 1,5 x IQR`.
> >
> > Contoh slide dengan 19 data: `5, 7, 10, 15, 19, 21, 21, 22, 22, 23, 23, 23, 23, 23, 24, 24, 24, 24, 25`.
> >
> > - Median = 23, Q1 = 19, Q3 = 24, sehingga IQR = 24 - 19 = 5.
> > - Batas bawah = 19 - 1,5 x 5 = **11,5**; batas atas = 24 + 1,5 x 5 = **31,5** (di slide ditulis sebagai Min dan Max).
> > - Nilai yang di luar rentang [11,5; 31,5] adalah **5, 7, dan 10** sehingga ketiganya outlier rendah; tidak ada outlier tinggi.
> >
> > ### Ruang Lingkup dan Alur Proses Analisis Data
> >
> > Dalam satu pandangan, **data analysis = understanding + data preparation**. Sebagian pihak memperluas cakupannya hingga identik dengan seluruh data science (semua tahap dianggap bagian analisis data). Dalam **metodologi IBM Data Science**, tahap *data analysis* menerima **initial dataset** sebagai input dan menghasilkan **final dataset to model** sebagai output.
> >
> > Prosesnya berupa pipeline berurutan:
> >
> > ```mermaid
> > graph LR
> >     A["Dataset<br/>(raw)"] --> B["Importing<br/>Dataset"]
> >     B --> C["Understanding &amp;<br/>Data Exploration"]
> >     C --> D["Data<br/>Preparation"]
> >     D --> E["Exporting<br/>Dataset"]
> >     E --> F["Dataset<br/>for modeling"]
> > ```
> >
> > Slide juga menampilkan ekosistem **Python packages for data science** (pandas, NumPy, scikit-learn, seaborn, dan sejenisnya) yang dipakai sepanjang pipeline ini.

> [!cornell] #### Summary
>
> Kualitas data menentukan kualitas hasil mining, sehingga **data analysis** (understanding + data preparation) bertujuan menaikkan kualitas dan efisiensi proses. Masalah umum: **dirty/inconsistent data** (class noise dan attribute noise), **missing values**, **duplicate**, **imbalanced dataset** (majority vs minority class), dan **outlier**, yang dideteksi antara lain dengan **aturan IQR** (di luar Q1 - 1,5 IQR atau Q3 + 1,5 IQR; pada contoh 19 data, batasnya 11,5 dan 31,5 sehingga 5, 7, 10 adalah outlier). Dalam metodologi IBM Data Science, tahap ini mengubah initial dataset menjadi final dataset untuk model lewat pipeline: **importing, understanding & exploration, data preparation, exporting**, memakai ekosistem Python (pandas, scikit-learn, seaborn).

> [!ad-libitum]- Additional Information
>
> #### Tiga Penyebab Missing Value
>
> Memahami mekanisme hilangnya data memengaruhi cara penanganannya: **MCAR** (Missing Completely At Random, hilang murni acak), **MAR** (Missing At Random, kehilangan bergantung pada variabel lain yang teramati), dan **MNAR** (Missing Not At Random, kehilangan bergantung pada nilai yang hilang itu sendiri, misalnya orang berpenghasilan tinggi enggan mengisi kolom gaji). Pada MNAR, imputasi sederhana bisa menimbulkan bias.
>
> #### Pipeline sebagai Objek Kode
>
> Di scikit-learn, langkah-langkah preprocessing bisa dirangkai menjadi `sklearn.pipeline.Pipeline` atau `ColumnTransformer` sehingga transformasi yang sama dipakai konsisten pada data latih dan data uji, sekaligus mencegah **data leakage** (statistik seperti mean atau min/max hanya dipelajari dari data latih).
>
> ```python
> from sklearn.pipeline import Pipeline
> from sklearn.impute import SimpleImputer
> from sklearn.preprocessing import StandardScaler
> pipe = Pipeline([("imp", SimpleImputer(strategy="median")),
>                  ("sc", StandardScaler())])
> ```
>
> #### Catatan Aturan IQR
>
> Faktor 1,5 adalah konvensi Tukey; faktor 3 menandai *extreme outlier*. Outlier belum tentu "salah": bisa jadi kejadian langka yang justru penting (misalnya fraud), jadi putuskan membuang, memangkas (*winsorize*), atau mempertahankannya berdasarkan konteks.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil dataset Kaggle apa pun, lalu buat tabel ringkas berisi jumlah missing, duplikat, outlier IQR, dan rasio kelas.
> 2. Bandingkan MCAR, MAR, MNAR dengan menghapus nilai secara sengaja pada dataset bersih, lalu ukur bias rata-rata setelah imputasi.
> 3. Susun `Pipeline` sklearn untuk dataset tersebut dan jelaskan bagaimana ia mencegah data leakage.
>
> #### Bacaan Lanjutan
>
> - Han, Kamber, Pei, *Data Mining: Concepts and Techniques*, Bab 3 (Data Preprocessing).
> - Dokumentasi scikit-learn, *Pipelines and composite estimators*.
> - Rubin (1976), *Inference and Missing Data* (klasifikasi MCAR/MAR/MNAR).
