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
> > - Apa 4 tugas di fase Data Understanding?
> >     
> > - Apa itu data terstruktur vs. tidak terstruktur?
> >     
> > - Apa saja sumber & metode pengumpulan data?
> >     
> > - Apa pentingnya pelabelan data?
> >     
> > - Apa itu data berlabel?
> >     
> > - Apa saja 4 tipe data/skala pengukuran?
> >     
> > - Apa itu statistik deskriptif?
> >     
> > 
> > ## Reference Points
> > 
> > - IF3170-Data-Understanding-and-Preparation.pdf (Slide 3-39)
> >     
> 
> > ### Gambaran Umum Fase Pemahaman Data
> > 
> > Fase _Data Understanding_ dimulai setelah tujuan bisnis ditetapkan. Tujuannya adalah untuk mengakuisisi data, membiasakan diri dengannya, mengidentifikasi masalah kualitas, dan menemukan wawasan awal. Fase ini sangat iteratif.
> > 
> > Empat tugas utamanya adalah:
> > 
> > 1. **Mengumpulkan Data Awal (Collect Initial Data)**
> >     
> > 2. **Mendeskripsikan Data (Describe Data)**
> >     
> > 3. **Mengeksplorasi Data (Explore Data)**
> >     
> > 4. **Memverifikasi Kualitas Data (Verify Data Quality)**
> >     
> > 
> > ### Mengumpulkan Data Awal
> > 
> > Proses ini melibatkan identifikasi kebutuhan data dan cara memperolehnya. Kebutuhan data sangat bergantung pada **task pemodelan** yang ditentukan di fase sebelumnya.
> > 
> > - **Klasifikasi**: Butuh data berlabel dengan kelas diskrit (misal: 'lancar', 'macet').
> >     
> > - **Regresi**: Butuh data berlabel dengan nilai kontinu (misal: harga rumah).
> >     
> > - **Clustering**: Tidak butuh data berlabel.
> >     
> > 
> > **Sumber Data** bisa berasal dari:
> > 
> > - Dataset publik (misal: Kaggle, UCI Machine Learning Repository).
> >     
> > - Data observasi internal (misal: log aktivitas, rekap transaksi).
> >     
> > - Pelabelan manual oleh manusia (_annotator_).
> >     
> > 
> > ### Pelabelan Data (Data Labeling)
> > 
> > **Label** (atau target) adalah atribut yang ingin kita prediksi. **Data berlabel** adalah data yang sudah memiliki nilai target ini. Proses pelabelan bisa dilakukan secara **manual** oleh pakar (hasilnya _strong label_) atau **otomatis** oleh mesin/program (hasilnya _weak label_), yang masing-masing memiliki implikasi pada biaya, waktu, dan akurasi.
> > 
> > ### Mendeskripsikan Data
> > 
> > Ini adalah proses untuk memahami properti dasar dari data yang telah dikumpulkan.
> > 
> > 1. **Struktur Data**:
> >     
> >     - **Data Terstruktur**: Data tabular yang rapi, terdiri dari baris (objek data/sampel) dan kolom (atribut/fitur). Contoh: tabel penjualan di database.
> >         
> >     - **Data Tidak Terstruktur**: Data yang tidak memiliki format yang jelas. Contoh: teks dari email, gambar, audio.
> >         
> > 2. **Tipe Data Atribut (Skala Pengukuran Stevens)**:
> >     
> >     - **Nominal**: Kategori tanpa urutan. Contoh: `jenis kelamin` (Pria, Wanita), `warna` (Merah, Biru).
> >         
> >     - **Ordinal**: Kategori dengan urutan, tapi jarak antar kategori tidak bermakna. Contoh: `tingkat pendidikan` (SD, SMP, SMA), `skala Likert` (Sangat Setuju, Setuju, ...).
> >         
> >     - **Interval**: Numerik dengan urutan dan jarak yang bermakna, tapi tidak memiliki titik nol mutlak. Contoh: `suhu` dalam Celcius, `skor IQ`.
> >         
> >     - **Rasio**: Numerik dengan semua properti interval dan memiliki titik nol mutlak. Contoh: `tinggi badan`, `berat badan`, `harga`.
> >         
> > 3. **Statistik Deskriptif**:
> >     
> >     - Merupakan rangkuman numerik dari karakteristik data.
> >         
> >     - **Ukuran Pemusatan**: Menjelaskan titik pusat data.
> >         
> >         - _Mean_ (rata-rata): Untuk data interval/rasio.
> >             
> >         - _Median_ (nilai tengah): Untuk data ordinal, interval, rasio. Tahan terhadap outlier.
> >             
> >         - _Mode_ (modus): Nilai yang paling sering muncul. Untuk semua tipe data.
> >             
> >     - **Ukuran Variabilitas**: Menjelaskan sebaran data.
> >         
> >         - _Range_ (kisaran): `max - min`.
> >             
> >         - _Variance_ & _Standard Deviation_: Seberapa jauh data tersebar dari mean.
> >             
> >         - _Quartiles_ & _Interquartile Range (IQR)_: Membagi data menjadi empat bagian.
> >             

> [!cornell] #### Summary
> 
> **Fase Pemahaman Data dimulai dengan mengumpulkan data yang relevan sesuai task pemodelan, termasuk proses pelabelan jika diperlukan untuk supervised learning. Langkah selanjutnya adalah mendeskripsikan data secara fundamental, yaitu dengan mengidentifikasi strukturnya (terstruktur/tidak), memahami tipe setiap atribut (nominal, ordinal, interval, rasio), dan menghitung statistik deskriptif untuk mendapatkan rangkuman numerik awal tentang pemusatan dan sebaran data.**

> [!ad-libitum]- Additional Information
> 
> #### Metadata dan Data Dictionary
> 
> Saat mendeskripsikan data, praktik terbaik adalah membuat **Data Dictionary**. Ini adalah dokumen terpusat yang berisi metadata (data tentang data). Isinya mencakup:
> 
> - **Nama Atribut**: Nama kolom yang digunakan di dataset.
>     
> - **Tipe Data**: Tipe teknis (misal: `INTEGER`, `VARCHAR`, `FLOAT`) dan tipe skala pengukuran (Nominal, Ordinal, dll.).
>     
> - **Deskripsi**: Penjelasan dalam bahasa manusia tentang arti atribut tersebut. Contoh: `cust_id` - "ID unik untuk setiap pelanggan yang terdaftar".
>     
> - **Contoh Nilai**: Beberapa contoh nilai valid, misal: `status_order` - ("pending", "shipped", "delivered").
>     
> - **Keterangan**: Informasi tambahan seperti sumber data, apakah nilai bisa null, atau batasan lainnya.
>     
> 
> Data dictionary sangat krusial untuk kolaborasi tim dan memastikan semua orang memiliki pemahaman yang sama tentang data.
> 
> #### Metode Pengumpulan Data Teknis
> 
> - **Akses Database Langsung**: Menggunakan kueri SQL (`SELECT ... FROM ... WHERE ...`) untuk menarik data dari basis data relasional (misal: PostgreSQL, MySQL).
>     
> - **API (Application Programming Interface)**: Banyak layanan web (seperti Twitter, Kaggle) menyediakan API yang memungkinkan kita mengambil data secara terprogram. Biasanya data dikembalikan dalam format JSON.
>     
> - **Web Scraping**: Teknik mengekstrak data dari halaman web ketika API tidak tersedia. Ini dilakukan dengan membuat program (scraper) yang "membaca" kode HTML halaman web dan mengambil informasi yang relevan.
>     
> 
> #### Tools dan Software
> 
> - **SQL Clients**: DBeaver, pgAdmin, MySQL Workbench untuk berinteraksi dengan database.
>     
> - **Python Libraries**:
>     
>     - `pandas`: Pustaka fundamental untuk manipulasi dan analisis data terstruktur. Fungsi `df.describe()` dan `df.info()` sangat berguna di fase ini.
>         
>     - `requests`: Untuk berinteraksi dengan API.
>         
>     - `BeautifulSoup`, `Scrapy`: Untuk web scraping.
>         
> - **Platform Pelabelan Data**: Amazon SageMaker Ground Truth, Labelbox, V7 Labs. Platform ini menyediakan antarmuka untuk mempermudah proses pelabelan data (terutama gambar dan teks) oleh manusia.
>