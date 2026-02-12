---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Sistem Informasi ITB]]

> [!cornell] Data Design: Normalization and Storage Architectures
>
> > ## Questions/Cues
> >
> > - Mengapa normalisasi diperlukan untuk integritas data?
> > - Kriteria desain kode yang baik dalam basis data
> > - Perbedaan model basis data hierarkis vs relasional
> > - Keuntungan organisasi file indeks-sequential
> > - Hubungan normalisasi dengan struktur penyimpanan
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Design Slides (Halaman 28-42)
> > - Materi Sistem Informasi ITB 2024/2025
>
> > ### Tujuan dan Proses Desain Data
> >
> > Desain data bertujuan menciptakan struktur data fleksibel yang mendukung kebutuhan fungsional sistem. Proses dimulai dengan model data konseptual (seperti diagram entitas-relasi) yang kemudian dinormalisasi untuk menghilangkan redundansi dan meningkatkan integritas data. Normalisasi memastikan setiap fakta disimpan tepat satu kali dan data selalu konsisten.
> >
> > Contoh analogi: Seperti mengatur dokumen arsip - surat harus disimpan dalam map tepat sesuai klasifikasi subjeknya, tidak ada duplikat, dan mudah ditemukan melalui sistem kode referensi.
> >
> > Langkah kritis dalam desain data:
> >
> > 1. Analisis kebutuhan dari spesifikasi fungsional
> > 2. Pembuatan model data konseptual
> > 3. Normalisasi model ke bentuk normal ketiga (3NF)
> > 4. Pemilihan teknologi penyimpanan sesuai kebutuhan
> >
> > ### Teknik Normalisasi Data
> >
> > Normalisasi adalah proses sistematis untuk mengorganisasi data menjadi tabel-tabel yang meminimalkan redundansi melalui serangkaian bentuk normal. Bentuk normal pertama (1NF) menghilangkan grup berulang, bentuk kedua (2NF) menghapus ketergantungan parsial, dan bentuk ketiga (3NF) menghilangkan ketergantungan transitif.
> >
> > Contoh praktis: Tabel penjualan awal yang menyimpan data pelanggan dan produk dalam satu tabel akan dipisah menjadi tabel terpisah untuk pelanggan, produk, dan transaksi penjualan. Ini mencegah anomali update saat data pelanggan berubah.
> >
> > Manfaat normalisasi:
> >
> > - Konsistensi data terjamin
> > - Optimasi penggunaan ruang penyimpanan
> > - Mempermudah proses maintenance
> > - Mencegah inkonsistensi saat update/delete
> >
> > ### Desain Kode dan Identifikasi Unik
> >
> > Kode unik diperlukan sebagai kunci utama untuk mengidentifikasi record secara unik. Desain kode yang baik harus memenuhi kriteria:
> >
> > - **Unik**: Setiap entitas memiliki kode berbeda
> > - **Stabil**: Format konsisten sepanjang waktu
> > - **Ekspansif**: Memungkinkan penambahan entitas baru
> > - **Efisien**: Panjang optimal tidak berlebihan
> >
> > Jenis-jenis kode umum:
> >
> > 1. Sequential number: 0001, 0002, ...
> > 2. Faceted code: Gabungan beberapa segmen (contoh: PROD-2024-IT-001)
> > 3. Self-checking code: Mengandung digit verifikasi (contoh: ISBN buku)
> >
> > Contoh implementasi: Kode barang "ELEC-050-ASUS-22" terdiri dari segmen kategori (ELEC), departemen (050), merek (ASUS), dan nomor urut (22).
> >
> > ### Arsitektur Penyimpanan Database
> >
> > Terdapat empat model utama sistem manajemen basis data (DBMS):
> >
> > 1. **Hierarkis**: Data diatur seperti pohon dengan relasi parent-child (contoh: XML, Windows Registry)
> > 2. **Jaringan**: Memungkinkan multiple parents (contoh: IDMS)
> > 3. **Relasional**: Data dalam tabel terhubung via kunci (contoh: MySQL, PostgreSQL)
> > 4. **Berorientasi objek**: Menyimpan objek lengkap dengan method (contoh: MongoDB)
> >
> > Perbandingan performa:
> >
> > - Relasional: Optimal untuk query kompleks dan transaksi ACID
> > - Berorientasi objek: Lebih cepat untuk data semi-terstruktur
> > - Hierarkis: Efisien untuk data dengan relasi stabil
> >
> > ### Organisasi File Fisik
> >
> > Teknik penyimpanan data di media fisik meliputi:
> >
> > 1. **Serial**: Record disimpan berurutan tanpa pengurutan
> > 2. **Sequential**: Record diurutkan berdasarkan kunci tertentu
> > 3. **Indexed-Sequential**: Menggabungkan file data serial dengan indeks sequential
> >
> > Mekanisme akses:
> >
> > - **Sequential access**: Membaca record secara berurutan
> > - **Direct access**: Melompat langsung ke record tertentu menggunakan indeks
> >
> > Contoh implementasi: Sistem perpustakaan menggunakan file indeks untuk kode buku (ISBN) yang mengarah ke lokasi fisik buku di rak penyimpanan. Sistem ini memungkinkan pencarian cepat baik secara berurutan maupun langsung.

> [!cornell] #### Summary
>
> **Normalisasi data** merupakan proses kritis dalam desain basis data untuk mencapai integritas data melalui eliminasi redundansi dan anomali update. Pemilihan **arsitektur penyimpanan** (hierarkis, jaringan, relasional, atau OO) harus mempertimbangkan pola akses data dan kebutuhan transaksional. **Organisasi file fisik** dengan teknik indexed-sequential memberikan optimasi antara kecepatan akses acak dan efisiensi penyimpanan sequential. **Desain kode** yang baik menjadi fondasi sistem identifikasi unik yang stabil dan ekspansif.

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Normalisasi
>
> Proses normalisasi ke 3NF memiliki kompleksitas waktu O(n²) terhadap jumlah atribut karena perlu memeriksa semua ketergantungan fungsional. Pada dataset besar dengan ratusan atribut, teknik hybrid seperti BigTable dari Google menggabungkan prinsip normalisasi dengan denormalisasi terkontrol untuk optimasi performa baca. Penelitian Stonebraker (2010) menunjukkan bahwa aplikasi OLAP (Online Analytical Processing) sering sengaja menggunakan bentuk denormalized schema untuk kecepatan query agregasi.
>
> #### Implementasi Database Spesifik
>
> Database relasional modern seperti PostgreSQL mendukung berbagai indeks khusus:
>
> - B-tree untuk rentang nilai
> - Hash untuk pencarian eksak
> - GiST untuk data geospasial
> - BRIN untuk data berurutan besar
>
> Pemilihan indeks mempengaruhi performa organisasi penyimpanan secara signifikan. Untuk transaksi tinggi, teknik partitioning horizontal dengan sharding dapat meningkatkan throughput.
>
> #### Edge Cases dan Anomali
>
> Kasus khusus yang perlu dipertimbangkan:
>
> 1. **Insertion anomaly**: Ketidakmampuan menyimpan data karena atribut wajib belum tersedia
> 2. **Update anomaly**: Inkonsistensi saat mengupdate data redundan
> 3. **Deletion anomaly**: Kehilangan informasi penting saat menghapus record
>
> Contoh nyata: Sistem inventory yang menghapus data supplier akan kehilangan history produk terkait jika tidak menggunakan foreign key constraint dengan opsi cascade delete.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun database normalisasi 3NF untuk sistem perpustakaan dengan entitas: Anggota, Buku, Peminjaman, Penerbit. Bandingkan performa query dengan versi denormalized.
> 2. Implementasikan sistem kode faceted dengan validasi otomatis menggunakan regex di PostgreSQL.
> 3. Eksperimen dengan berbagai organisasi file (heap, indexed, partitioned) pada dataset 1 juta record dan ukur waktu query.
>
> #### Alat dan Referensi
>
> - DBML: Bahasa markup untuk desain database (https://dbml.dbdiagram.io)
> - pgAdmin: Tools administrasi PostgreSQL
> - "Database System Concepts" karya Silberschatz (Buku teks komprehensif)
> - "Designing Data-Intensive Applications" oleh Martin Kleppmann
>
> #### Bacaan Lanjutan
>
> - Penelitian: "A Relational Model of Data for Large Shared Data Banks" (E.F. Codd, 1970)
> - Buku: "SQL Antipatterns" oleh Bill Karwin
> - Tutorial: Normalisasi Database oleh Oracle Academy
> - Kursus: "Database Systems" edX (MIT)