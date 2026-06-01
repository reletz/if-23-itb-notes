---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu DII?
> >     
> > - Pentingnya DII untuk DW/BI?
> >     
> > - Apa itu ETL?
> >     
> > - Tahap 1: Extract?
> >     
> > - Apa itu Staging Area?
> >     
> > - Tahap 2: Transform?
> >     
> > - Contoh Transformasi?
> >     
> > - Tahap 3: Load?
> >     
> > - Tantangan 1: Variasi Data?
> >     
> > - Solusi: Data Profiling?
> >     
> > - Tantangan 2: Unique Keys?
> >     
> > - Tantangan 3: Performa?
> >     
> > - Tips Performa Load?
> >     
> > - Tantangan 4: Paralelisme?
> >     
> > - 3 Tipe Paralelisme?
> >     
> > - Tantangan 5: Failure Recovery?
> >     
> > - Apa itu ELT?
> >     
> > - Kapan ELT digunakan?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 4-16
> >     
> 
> > ### Apa itu Data Integration & Interoperability (DII)?
> > 
> > **DII** adalah sekumpulan proses yang terkait dengan **pergerakan dan konsolidasi data**. Ini bisa terjadi di dalam satu sistem, antar aplikasi yang berbeda, atau bahkan antar organisasi.
> > 
> > DII sangat fundamental untuk fungsi dasar manajemen data, seperti:
> > 
> > - Migrasi dan konversi data (misal: pindah dari sistem lama ke baru).
> >     
> > - Berbagi data (data sharing) antar aplikasi.
> >     
> > - Distribusi data (misal: menyalin data ke data center cabang).
> >     
> > 
> > ### Pentingnya DII untuk Data Warehouse (DW) & BI
> > 
> > > DII adalah komponen **kritis** dalam arsitektur Data Warehousing (DW) dan Business Intelligence (BI).
> > 
> > Proses DII (ditandai sebagai **ETL**) adalah "lem" yang menghubungkan semua komponen:
> > 
> > 1. Memindahkan data dari **Sistem Operasional** (Marketing, Sales, ERP) dan **Data Eksternal**.
> >     
> > 2. Memasukkannya ke **Integration Layer** (misal: ODS).
> >     
> > 3. Mengonsolidasikannya ke **Data Warehouse** pusat.
> >     
> > 4. Mendistribusikannya ke **Data Marts** atau **Strategic Marts** untuk analisis.
> >     
> > 
> > ### Extract, Transform, Load (ETL)
> > 
> > ETL adalah tiga langkah esensial untuk memindahkan data. Proses ini bisa berjalan secara periodik (misal: setiap tengah malam) yang disebut **batch**, atau secara real-time (didorong oleh event).
> > 
> > #### 1. Extract (Ekstraksi)
> > 
> > - Proses memilih dan **mengambil data** yang diperlukan dari sistem sumbernya.
> >     
> > - Tantangan terbesarnya adalah data sumber memiliki format yang sangat beragam (Relational Database, NoSQL, Flat File, XML, JSON, dll).
> >     
> > - Data yang diekstrak kemudian ditempatkan di **Staging Area** (area transit, bisa di disk fisik atau memori) sebelum diolah lebih lanjut.
> >     
> > 
> > #### 2. Transform (Transformasi)
> > 
> > - Proses ini **membuat data kompatibel** dengan struktur data di sistem target.
> >     
> > - Fungsi terpenting dari Transform adalah **Data Cleansing**, yaitu memastikan hanya data yang "proper" (bersih, valid, sesuai aturan) yang lolos ke target.
> >     
> > - **Contoh Transformasi:**
> >     
> >     - `Format changes`: Konversi teknis (misal: karakter EBCDIC di mainframe ke ASCII).
> >         
> >     - `Structure changes`: Mengubah struktur (misal: data denormalisasi diubah jadi normalisasi).
> >         
> >     - `Semantic conversion`: Konversi nilai agar konsisten (misal: "Pria", "L", "Male" diubah seragam menjadi "1").
> >         
> >     - `De-duping`: Mendeteksi dan menghapus data duplikat.
> >         
> >     - `Re-ordering`: Mengubah urutan kolom.
> >         
> > 
> > #### 3. Load (Pemuatan)
> > 
> > - Proses **menyimpan atau menyajikan** data hasil transformasi ke dalam sistem target (misal: Data Warehouse).
> >     
> > - Data ini mungkin perlu diproses lebih lanjut untuk diintegrasikan dengan data lain, atau bisa jadi sudah final dan siap disajikan ke pengguna.
> >     
> > 
> > ### Tantangan Desain ETL
> > 
> > 1. **Variasi Data:**
> >     
> >     - Rentang nilai atau kualitas data di sistem sumber seringkali jauh lebih buruk (kotor) dari yang diperkirakan desainer.
> >         
> >     - **Solusi:** Melakukan **Data Profiling** (analisis statistik data sumber) di awal untuk mengidentifikasi semua kondisi anomali yang harus ditangani oleh aturan Transformasi.
> >         
> > 1. **Unique Keys (Kunci Unik):**
> >     
> >     - Kunci unik sangat krusial. Masalahnya, data yang sama bisa ada di banyak sistem dengan kunci yang berbeda.
> >         
> >     - Contoh: Data Pelanggan A di sistem Sales kuncinya `No_HP`. Di sistem Support kuncinya `Email`. Di sistem Finance kuncinya `No_KTP`. Proses Transformasi harus bisa mengonsolidasikan ketiganya menjadi satu dimensi Pelanggan yang unik di DW.
> >         
> > 1. **Performa:**
> >     
> >     - Bagian terlama dari ETL biasanya adalah fase **Load**.
> >         
> >     - Ini terjadi karena database target harus melakukan banyak pekerjaan berat: menjaga _concurrency_ (banyak proses jalan bersamaan), _integrity maintenance_ (cek foreign key), dan meng-update _indices_.
> >         
> >     - **Tips Performa Load:**
> >         
> >         - Matikan (disable) _integrity checking_ dan _triggers_ selama proses Load.
> >             
> >         - Drop (hapus) _indices_ sebelum Load, lalu buat ulang (recreate) setelah Load selesai.
> >             
> >         - Gunakan operasi **Bulk Load** (memuat data secara massal), jika mungkin jalankan secara paralel.
> >             
> > 1. **Parallel Computing (Komputasi Paralel):**
> >     
> >     - Penting untuk menangani volume data yang sangat besar. Ada 3 tipe:
> >         
> >         - `Data Parallelism`: Memecah 1 file besar menjadi 10 file kecil dan memprosesnya bersamaan.
> >             
> >         - `Pipeline Parallelism`: Menjalankan beberapa komponen di _data stream_ yang sama (misal: saat rekord 2 sedang di-lookup, rekord 1 sudah masuk proses penambahan kolom).
> >             
> >         - `Component Parallelism`: Menjalankan proses berbeda di _data stream_ berbeda (misal: Job 1 menyortir data A, sementara Job 2 melakukan de-dupe data B).
> >             
> > 1. **Failure Recovery (Pemulihan Kegagalan):**
> >     
> >     - Proses ETL besar harus bisa di-restart dari titik gagal, bukan dari awal.
> >         
> >     - **Teknik:** Gunakan `row_id` (penanda baris) dan `run_id` (penanda proses) untuk melacak. Gunakan **Checkpoints**, yaitu titik di mana proses berhenti sejenak untuk menyimpan progres, membersihkan file temp, dan mencatat status ke log.
> >         
> > 
> > ### ELT (Extract, Load, Transform)
> > 
> > ELT adalah arsitektur alternatif di mana urutannya diubah: Ekstrak, Muat, baru Transformasi.
> > 
> > - **Kapan digunakan?** Saat sistem **Target** (misal: Data Warehouse modern seperti BigQuery/Snowflake, atau Data Lake) memiliki kemampuan komputasi yang jauh lebih besar daripada sistem sumber.
> >     
> > - **Proses:**
> >     
> >     1. `Extract`: Ambil data dari sumber.
> >         
> >     2. `Load`: Langsung muat data apa adanya (**raw data**) ke dalam sistem target.
> >         
> >     3. `Transform`: Jalankan proses transformasi (cleansing, join, agregasi) _setelah_ data berada di dalam sistem target (biasanya menggunakan SQL).
> >         

> [!cornell] #### Summary
> 
> **Data Integration & Interoperability (DII) adalah proses pergerakan data yang krusial untuk Data Warehousing (DW). Mekanisme paling umum adalah ETL (Extract, Transform, Load), di mana data diambil dari berbagai sumber, dibersihkan dan disesuaikan di Staging Area (Transform), lalu dimuat (Load) ke target. Proses ini memiliki banyak tantangan, terutama terkait Performa (fase Load yang lambat), Variasi Data, dan Kunci Unik. Sebagai alternatif modern, ELT (Extract, Load, Transform) membalik prosesnya, dengan memuat data mentah (raw data) terlebih dahulu ke sistem target yang kuat (seperti Data Lake/DW modern) dan melakukan transformasi di sana.**

> [!ad-libitum]- Additional Information
> 
> #### Analogi: ETL vs ELT
> 
> Memahami perbedaan ETL dan ELT sangat penting dalam desain arsitektur data modern:
> 
> - **ETL (Koki Restoran Tradisional):**
>     
>     - Koki (ETL Engine) pergi ke gudang (Sumber) mengambil bahan (Extract).
>         
>     - Dia membersihkan, memotong, dan memasak semua bahan di dapur (Staging Area) hingga menjadi masakan jadi (Transform).
>         
>     - Dia kemudian menyajikan masakan jadi itu di piring (Load) ke meja pelanggan (Target Data Warehouse).
>         
>     - **Hasil:** Pelanggan hanya menerima masakan yang sudah jadi dan siap santap (data bersih).
>         
> - **ELT (Koki Restoran "All You Can Eat" / Dapur Terbuka):**
>     
>     - Koki (ELT) mengambil semua bahan mentah dari gudang (Extract).
>         
>     - Dia langsung menaruh SEMUA bahan mentah itu apa adanya di meja buffet (Load ke Data Lake/DW Target).
>         
>     - Pelanggan (Data Analyst/Scientist) datang ke buffet, mengambil sendiri bahan mentah yang mereka butuhkan, dan "memasak" atau meraciknya sendiri (Transform) di meja mereka (menjalankan query SQL di DW) sesuai selera.
>         
>     - **Hasil:** Fleksibilitas tinggi. Data mentah (raw data) tersimpan di target dan bisa diolah berulang kali untuk berbagai kebutuhan berbeda.
>         
> 
> #### Eksplorasi Mandiri
> 
> - Coba pikirkan proses pengisian KRS (Kartu Rencana Studi) di kampus Anda. Data apa saja yang dibutuhkan? (Data Mahasiswa, Data Mata Kuliah, Data Dosen, Data Tagihan Keuangan). Coba petakan proses ini sebagai alur ETL. Di mana proses `Extract` terjadi? Apa saja `Transformasi` yang diperlukan (misal: "CEK apakah SKS cukup", "CEK apakah tagihan lunas", "CEK prasyarat matkul")? Di mana `Load`-nya (Target: tabel KRS yang terisi)?
>