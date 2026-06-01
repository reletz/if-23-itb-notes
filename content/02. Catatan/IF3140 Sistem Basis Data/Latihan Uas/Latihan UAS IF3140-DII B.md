_Back to_ [[Latihan UAS IF3140]]

# Problem Set: Data Integration and Interoperability - Paket B

**Mata Pelajaran:** Sistem Basis Data

**Topik:** Advanced ETL/ELT, CDC Mechanisms, MDM, and Integration Middleware

**Estimasi Waktu:** 120 menit

**Total Nilai:** 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal B ini, mahasiswa diharapkan dapat:

1. Menganalisis perbedaan teknis antara _Log-based_ dan _Query-based_ Change Data Capture (CDC).
    
2. Mengevaluasi strategi resolusi entitas dalam Master Data Management (MDM).
    
3. Merancang alur integrasi menggunakan pola _Publish/Subscribe_ (Pub-Sub).
    
4. Memahami dampak teknis dari pemilihan _Push_ vs _Pull_ dalam latensi data.
    
5. Mengidentifikasi teknik pemetaan (mapping) tingkat lanjut untuk data semi-terstruktur (JSON/XML).
    

## BAGIAN I: Tabel Matrix - Klasifikasi Komponen DII (Format A) [10 Poin]

**Instruksi:** Tentukan kategori yang paling tepat untuk setiap pernyataan/komponen berikut.

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|**No**|**Pernyataan / Komponen**|**Middleware**|**Data Source**|**Target System**|**Logic Engine**|
|1|Database transaksional (OLTP) yang menghasilkan log perubahan.|||||
|2|Enterprise Service Bus (ESB) yang mengatur perutean pesan antar aplikasi.|||||
|3|Komponen pembersihan data (_Data Cleansing_) dalam alur ETL.|||||
|4|Cloud Data Warehouse (misal: Snowflake) tempat data akhir disimpan.|||||
|5|API Gateway yang mengelola antarmuka akses data eksternal.|||||

## BAGIAN II: Benar/Salah - Mekanisme & Latensi (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|_Log-based CDC_ lebih efisien daripada _Query-based CDC_ karena tidak menambah beban query pada database sumber.|||
|2|Dalam pola _ELT_, kualitas data ditingkatkan (cleansing) di area staging sebelum masuk ke database target.|||
|3|_Message Queuing_ (MQ) menjamin bahwa data dikirim secara asinkron tanpa harus menunggu sistem target siap.|||
|4|MDM (Master Data Management) hanya fokus pada data transaksional seperti jumlah penjualan harian.|||
|5|_Semantic Interoperability_ tercapai bila dua sistem menggunakan format file yang sama (misal: CSV) terlepas dari maknanya.|||

## BAGIAN III: Tabel Analisis Komparatif - CDC & Middleware (Format C) [15 Poin]

**Instruksi:** Bandingkan konsep integrasi berikut untuk memahami detail implementasinya.

|   |   |   |   |
|---|---|---|---|
|**Aspek Komparasi**|**Log-based CDC**|**Query-based CDC**|**Justifikasi Efisiensi**|
|**Dampak Performa Sumber**||||
|**Kemampuan Deteksi Delete**||||
|**Kebutuhan Hak Akses**||||

## BAGIAN IV: Step-by-Step Scaffolding - Implementasi CDC (Format D) [15 Poin]

**Instruksi:** Lengkapi alur proses **Log-based Change Data Capture (CDC)** secara teknis.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi**|**Deskripsi Aksi Utama**|
|a.|Log Mining|Membaca berkas log transaksi (redo/binlog) untuk mencari ...|
|b.|Parsing|Mengubah entri log mentah menjadi format yang dapat dibaca seperti ...|
|c.|Filtering|Memilih hanya tabel atau kolom tertentu yang menjadi ...|
|d.|Transformation|Melakukan pengayaan (_enrichment_) atau penyesuaian skema ke ...|
|e.|Dispatching|Mengirimkan perubahan tersebut ke target (misal via Kafka) dengan latensi ...|

## BAGIAN V: Studi Kasus Multi-Bagian - MDM & Integrasi (Format E) [20 Poin]

Kasus:

Sebuah Bank memiliki tiga sistem: (1) Sistem Tabungan, (2) Sistem Kartu Kredit, dan (3) Sistem Kredit Pemilikan Rumah (KPR). Nama nasabah "Budi Santoso" tercatat sebagai "Budi S." di kartu kredit dan "Budi Santoso" di KPR dengan nomor HP yang berbeda. Bank ingin menerapkan Master Data Management (MDM) untuk mendapatkan profil nasabah tunggal (Single Customer View).

Pertanyaan:

a. Sebutkan teknik Entity Resolution yang digunakan untuk menyimpulkan bahwa "Budi S." dan "Budi Santoso" adalah orang yang sama.

b. Identifikasi satu tantangan Data Conflict yang muncul jika kedua sistem memiliki nomor HP nasabah yang berbeda dan belum diperbarui selama satu tahun.

c. Antara strategi Registry (hanya menyimpan index) dan Centralized (menyimpan seluruh data master di satu tempat), mana yang lebih menjamin konsistensi data di seluruh sistem?

d. Tuliskan satu aturan Survivorship sederhana untuk menentukan nomor HP mana yang akan menjadi "Golden Record".

e. Bagaimana integrasi Real-time melalui API dapat membantu petugas Bank saat nasabah tersebut ingin memperbarui alamat di satu cabang agar otomatis berubah di sistem lainnya?

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Terkait **Arsitektur Middleware**, pilih karakteristik yang tepat:
    
    - **ESB (Enterprise Service Bus):** a) Point-to-point b) Hubungan terpusat & cerdas c) Tanpa transformasi d) Hanya satu arah
        
    - **Message Broker:** a) Antrean pesan (Queue) b) Hapus data otomatis c) Tidak butuh network d) Hanya untuk backup
        
2. Mengenai **Data Mapping Semi-Terstruktur**, pilih tekniknya:
    
    - **JSON Mapping:** a) Menggunakan JSONPath/XPath b) Menggunakan SQL Join c) Menggunakan Delete d) Tanpa skema
        
    - **Nesting/Unnesting:** a) Membongkar array menjadi baris b) Menambah warna c) Menghapus index d) Restart server
        
3. Terkait **Latensi & Mekanisme**, pilih pasangan yang benar:
    
    - **Near Real-time:** a) Jeda beberapa detik/menit b) Jeda 24 jam c) Jeda 1 minggu d) Tanpa jeda
        
    - **Streaming:** a) Aliran data terus-menerus b) Data dikirim per bulan c) Data dihapus d) Data di-enkripsi
        
4. Dalam **Interoperability Standards**, pilih standar yang sesuai:
    
    - **Syntactic:** a) Format data (XML/JSON) b) Makna data c) Kecepatan CPU d) Jarak server
        
    - **Semantic:** a) Kesepahaman arti/konteks b) Jumlah kabel c) Merk disk d) Resolusi layar
        
5. Mengenai **Master Data**, pilih entitas yang tepat:
    
    - **Entitas Inti:** a) Customer, Product, Supplier b) Total gaji bulan lalu c) Log akses d) Suhu ruangan
        
    - **Karakteristik:** a) Lambat berubah (Slowly Changing) b) Sangat dinamis (Transactional) c) Data sampah d) Metadata
        
6. Terkait **Teknik Integrasi Modern**, pilih perannya:
    
    - **Data Virtualization:** a) Akses tanpa pindah fisik b) Pindah data ke disk c) Hapus log d) Backup tape
        
    - **Data Orchestration:** a) Mengatur urutan workflow b) Membeli hardware c) Menulis email d) Desain brosur
        
7. Mengenai **ETL Staging Area**, pilih fungsinya:
    
    - **Tujuan:** a) Tempat pembersihan data b) Database operasional c) Terminal user d) Backup listrik
        
    - **Sifat:** a) Penyimpanan sementara b) Penyimpanan permanen c) Tanpa disk d) Hanya RAM
        
8. Dalam **Change Data Capture (CDC)**, pilih keunggulan Log-based:
    
    - **Performa:** a) Bebas beban query ke tabel b) Sangat lambat c) Menghapus data d) Tanpa lisensi
        
    - **Integritas:** a) Menangkap semua transaksi (termasuk rollback) b) Hanya tangkap commit c) Tanpa log d) Manual
        
9. Terkait **Data Integration Roles**, pilih tanggung jawabnya:
    
    - **Integration Architect:** a) Desain pola & alur integrasi b) Data entry c) Marketing d) Jaga gudang
        
    - **ETL Developer:** a) Membangun pipa (pipeline) data b) Membayar tagihan c) Desain logo d) HR Manager
        
10. Mengenai **API-led Connectivity**, pilih level layanannya:
    
    - **System API:** a) Akses langsung ke core system b) Interface ke user c) Logika bisnis d) Tanpa security
        
    - **Process API:** a) Agregasi & Logika bisnis b) Tampilan grafik c) Kabel fisik d) Listrik server
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen atau terminologi dalam Arsitektur Integrasi berikut:**

- **Data Lineage in DII:** ______________________________________________
    
- **Golden Record (Single Version of Truth):** __________________________
    
- **Schema-on-Read vs Schema-on-Write:** _______________________________
    
- **Canonical Data Model:** ____________________________________________
    
- **Data Latency (T0 vs T1):** __________________________________________
    

# Kunci Jawaban & Rubrik Penilaian (Paket B)

### Bagian I (Matrix)

1. Data Source | 2. Middleware | 3. Logic Engine | 4. Target System | 5. Middleware
    
    Skor: 2 poin per nomor.
    

### Bagian II (Benar/Salah)

1. Benar | 2. Salah (ELT melakukan cleansing di database target/warehouse) | 3. Benar | 4. Salah (MDM fokus pada data referensi/master) | 5. Salah (Itu Syntactic Interoperability)
    
    Skor: 2 poin per nomor.
    

### Bagian III (Komparatif)

- Log-based: Performa: Rendah (hanya baca file log); Delete: Terdeteksi; Hak: Perlu akses level sistem ke file log.
    
- Query-based: Performa: Tinggi (beban pada tabel aktif); Delete: Sulit terdeteksi (kecuali ada soft delete); Hak: Hanya perlu hak SELECT.
    
- Justifikasi: Log-based lebih efisien untuk sistem dengan beban transaksi sangat tinggi.
    
    Skor: 5 poin per baris.
    

### Bagian IV (Scaffolding)

a. Insert/Update/Delete | b. JSON/Avro/SQL | c. Metadata target | d. Format target | e. Real-time/Near real-time.

Skor: 3 poin per langkah.

### Bagian V (Studi Kasus)

a. Fuzzy Matching atau Probabilistic Matching.

b. Data Staleness (Data usang) atau Ambiguity (Ketidakjelasan mana yang valid).

c. Centralized (Hub-based).

d. Aturan "Recency" (ambil data yang memiliki timestamp pembaruan paling baru).

e. API memungkinkan "Push" update sehingga saat satu sistem diperbarui, sistem lain menerima notifikasi dan melakukan pembaruan seketika.

Skor: 4 poin per sub-pertanyaan.

### Bagian VI (Pilihan Ganda)

1. b, a | 2. a, a | 3. a, a | 4. a, a | 5. a, a
    
2. a, a | 7. a, a | 8. a, a | 9. a, a | 10. a, a
    
    Skor: 2 poin per nomor.
    

### Bagian VII (Isian)

- Data Lineage: Pelacakan asal-usul dan riwayat perubahan data dari sumber ke target.
    
- Golden Record: Satu versi data master yang paling akurat dan disepakati bersama.
    
- Schema-on-Read: Struktur data ditentukan saat dibaca (Big Data/Lake). Schema-on-Write: Struktur ditentukan saat data dimasukkan (RDBMS/Warehouse).
    
- Canonical Model: Format data standar yang digunakan untuk komunikasi antar sistem yang berbeda.
    
- Latency: Jeda waktu antara kejadian di sumber (T0) hingga data siap digunakan di target (T1).
    
    Skor: 2 poin per poin.
    

## Tips Strategi UAS DII

1. **Pahami Arsitektur Target:** Jika targetnya Cloud Warehouse (BigQuery/Snowflake), pilihlah **ELT** karena mereka dirancang untuk transformasi massal.
    
2. **Bedakan CDC:** Ingat bahwa **Log-based** adalah "silent observer" yang tidak mengganggu performa aplikasi, sedangkan **Query-based** bisa memperlambat aplikasi karena melakukan pemindaian tabel.
    
3. **MDM adalah Strategi Bisnis:** Fokuskan pada bagaimana mendapatkan satu versi kebenaran dari entitas seperti "Nasabah" atau "Produk" yang tersebar di banyak departemen.