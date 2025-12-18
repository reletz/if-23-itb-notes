_Back to_ [[Latihan UAS IF3140]]
# Problem Set: Recovery System (Sistem Basis Data)

Mata Pelajaran: Sistem Basis Data

Topik: Recovery System (Log-Based, Shadow Paging, Disaster Recovery)

Estimasi Waktu: 120 menit

Total Nilai: 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan problem set ini, mahasiswa diharapkan dapat:

1. Mengklasifikasikan jenis kegagalan dan hirarki penyimpanan data.
    
2. Menganalisis mekanisme _Log-Based Recovery_ menggunakan aturan _Write-Ahead Logging_ (WAL).
    
3. Melakukan _tracing_ fase _Redo_ dan _Undo_ pada algoritma recovery.
    
4. Mengevaluasi kelebihan dan kekurangan metode _Shadow Paging_ dibandingkan _Log-Based_.
    
5. Merancang strategi _Disaster Recovery_ berdasarkan parameter RPO dan RTO.
    

## BAGIAN I: Klasifikasi & Matching (Format A) [10 Poin]

**Instruksi:** Tentukan kategori yang paling tepat untuk setiap pernyataan/kondisi di bawah ini dengan memberikan tanda (X) pada kolom yang sesuai.

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Pernyataan/Kondisi**|**Transaksi**|**Sistem (Crash)**|**Disk**|
|1|Kegagalan akibat pembagian dengan nol atau input tidak valid.||||
|2|Hilangnya seluruh isi _volatile storage_ (RAM) namun disk tetap aman.||||
|3|Terjadi _head crash_ yang menyebabkan sebagian blok fisik tidak terbaca.||||
|4|Sistem mendeteksi _deadlock_ dan memilih satu transaksi untuk di-abort.||||
|5|Terjadi kesalahan logika yang menyebabkan data yang dicari tidak ditemukan.||||

## BAGIAN II: Benar/Salah (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S) terkait prinsip dasar recovery.

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|Aturan WAL mengharuskan log record ditulis ke _stable storage_ setelah data di disk diperbarui.|||
|2|Dalam kebijakan _No-Force_, sistem tidak wajib menulis data ke disk tepat saat transaksi commit.|||
|3|Fase _Redo_ pada algoritma recovery memindai log secara mundur dari akhir ke checkpoint.|||
|4|_Stable Storage_ adalah penyimpanan teoritis yang diasumsikan tidak akan pernah gagal.|||
|5|_Compensation Log Record_ (CLR) digunakan untuk mencatat aksi yang dilakukan selama proses _Undo_.|||

## BAGIAN III: Tabel Analisis Komparatif (Format C) [15 Poin]

**Instruksi:** Lengkapi tabel komparatif mengenai kebijakan buffering dan durabilitas berikut.

|   |   |   |   |   |
|---|---|---|---|---|
|**Metode/Konsep**|**Fokus Utama**|**Kelebihan**|**Kekurangan**|**Justifikasi Penggunaan**|
|**Steal Policy**|Penulisan data uncommitted||||
|**Two-Very-Safe**|Replikasi Sinkron||||

## BAGIAN IV: Step-by-Step Scaffolding (Format D) [15 Poin]

**Instruksi:** Lengkapi langkah-langkah prosedur _Checkpoint_ sederhana berikut.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi**|**Jawaban/Deskripsi**|
|a.|Status Transaksi|Menghentikan sementara semua operasi ...|
|b.|Penulisan Log|Menulis semua log record di buffer ke ...|
|c.|Penulisan Data|Menulis semua blok data "kotor" ke ...|
|d.|Record Khusus|Menulis log record `<checkpoint L>` di mana L adalah ...|
|e.|Finalisasi|Melanjutkan kembali ...|

## BAGIAN V: Studi Kasus Multi-Bagian (Format E) [20 Poin]

Kasus:

Sebuah DBMS menggunakan Immediate Modification dengan aturan WAL. Terdapat jadwal eksekusi berikut:

S: <T1, start>; <T1, A, 100, 150>; <T2, start>; <T2, B, 200, 250>; <T1, commit>; <T3, start>; <T3, C, 300, 350>; [CRASH]

**Data yang diberikan:**

- Nilai awal: A=100, B=200, C=300.
    
- Checkpoint terakhir terjadi tepat sebelum `<T3, start>`. Daftar transaksi aktif saat itu adalah `{T2}`.
    

Pertanyaan:

a. Tuliskan daftar undo-list yang terbentuk tepat setelah fase Redo selesai.

b. Jelaskan mengapa transaksi T1 tidak perlu dilakukan Undo meskipun perubahannya mungkin sudah ada di disk.

c. Berdasarkan data di atas, sebutkan nilai A, B, dan C di disk tepat setelah fase Redo (sebelum Undo).

d. Identifikasi transaksi mana yang akan memicu penulisan Compensation Log Record (CLR) dan tuliskan format CLR-nya.

e. Berikan rekomendasi: Jika sistem ini membutuhkan RTO < 5 detik, apakah metode Shadow Paging lebih baik digunakan? Jelaskan.

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Dalam konteks **Shadow Paging**, pilih karakteristik yang tepat:
    
    - **Mekanisme Update:** a) Overwrite data asli b) Copy-on-Write (CoW) c) Log-append d) In-place update
        
    - **Recovery:** a) Membutuhkan Redo/Undo log b) Instan via pointer switch c) Bergantung pada checkpoint d) Rollback via CLR
        
2. Mengenai **Remote Backup System**, pilih konfigurasi yang tepat:
    
    - **Durabilitas One-Safe:** a) Log di-commit di primary saja b) Log di-commit di kedua site c) Log di-commit di backup saja d) Tanpa log
        
    - **Ketersediaan (HA):** a) Menggunakan Hot-Spare b) Menggunakan Cold Backup c) Snapshot harian d) Tape archival
        
3. Berdasarkan kebijakan **Buffering & Recovery**, pilih pasangan yang benar:
    
    - **Steal Policy:** a) Data uncommitted boleh ke disk b) Data uncommitted dilarang ke disk c) Hanya data metadata d) Data dibuang saat crash
        
    - **No-Force Policy:** a) Wajib tulis saat commit b) Tidak wajib tulis saat commit c) Tulis per menit d) Tulis manual oleh user
        
4. Terkait **Metrik Kinerja Paralel**, pilih definisi yang sesuai:
    
    - **Speedup:** a) Waktu tetap, data tambah b) Data tetap, hardware tambah c) Hardware tetap, data tambah d) Melambat seiring user
        
    - **Scaleup:** a) Ukuran masalah tetap b) Masalah bertambah seiring hardware c) Latensi meningkat d) Throughput menurun
        
5. Untuk **Arsitektur Hardware Paralel**, pilih sifat utamanya:
    
    - **Shared Nothing:** a) Paling skalabel b) Paling murah c) Latensi memori rendah d) Berbagi RAM
        
    - **Shared Disk:** a) Tiap node punya disk sendiri b) Berbagi satu set disk c) Tanpa memori lokal d) Skalabilitas ekstrim
        
6. Dalam **Transaksi Terdistribusi (Distributed Systems)**, pilih komponen kunci:
    
    - **Protokol Atomicity:** a) 2-Phase Locking b) 2-Phase Commit (2PC) c) Snapshot Isolation d) Checkpointing
        
    - **Fase 1 2PC:** a) Commit b) Prepare/Voting c) Abort d) Garbage Collection
        
7. Mengenai **Kematangan Tata Kelola (Data Governance Maturity)**, pilih level/dimensi yang tepat:
    
    - **Level 3 IBM:** a) Reaktif b) Terdefinisi & Proaktif c) Optimasi Otomatis d) Tanpa pengelolaan
        
    - **Dimensi Stanford:** a) Hanya Teknologi b) People, Policies, Capabilities c) Profit/Loss d) CPU & RAM
        
8. Dalam **Pola Integrasi Data**, pilih mekanisme yang tepat:
    
    - **ETL (Extract-Transform-Load):** a) Transformasi di target b) Transformasi di staging c) Tanpa ekstraksi d) Hanya untuk NoSQL
        
    - **ELT (Extract-Load-Transform):** a) Cocok untuk Data Lake/Big Data b) Sangat lambat c) Menghapus data sumber d) Arsitektur jadul
        
9. Terkait **Peran Data Stewardship**, pilih tanggung jawab utama:
    
    - **Data Owner:** a) Akuntabilitas & Otoritas b) Menulis kode backend c) Hardware maintenance d) Data entry
        
    - **Data Custodian:** a) Menentukan strategi bisnis b) Implementasi teknis & keamanan c) Persetujuan budget d) Mencari klien
        
10. Mengenai **Arsitektur Interaksi Integrasi**, pilih konsekuensi desain:
    
    - **Point-to-Point:** a) s^2 interface (Spaghetti) b) s interface (Konsisten) c) Tanpa latensi d) Menggunakan Middleware
        
    - **Hub-and-Spoke:** a) Konsolidasi terpusat b) Desentralisasi total c) Sangat lambat d) Tidak butuh mapping
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen Framework ARIES untuk Skenario Kegagalan Sistem:**

- **Analysis Phase:** _________________________________________________
    
- **Redo Phase:** _________________________________________________
    
- **Undo Phase:** _________________________________________________
    

# Kunci Jawaban & Rubrik Penilaian

### Bagian I (Klasifikasi)

1. Transaksi (Logical Error)
    
2. Sistem (System Crash)
    
3. Disk (Disk Failure)
    
4. Transaksi (System Error/Deadlock)
    
5. Transaksi (Logical Error)
    
    Skor: 2 poin per jawaban benar.
    

### Bagian II (Benar/Salah)

1. Salah (WAL: Log harus ditulis SEBELUM data)
    
2. Benar
    
3. Salah (Redo memindai MAJU)
    
4. Benar
    
5. Benar
    
    Skor: 2 poin per jawaban benar.
    

### Bagian III (Tabel Komparatif)

- **Steal:** Kelebihan (Memori buffer lebih lega), Kekurangan (Butuh Undo jika crash), Justifikasi (Sistem dengan transaksi besar).
    
- Two-Very-Safe: Kelebihan (Zero Data Loss), Kekurangan (Latensi tinggi/lambat), Justifikasi (Sistem perbankan/finansial kritikal).
    
    Skor: 7.5 poin per baris (analisis ketepatan).
    

### Bagian IV (Scaffolding)

a. Update Transaksi

b. Stable Storage (Disk)

c. Disk (Non-volatile)

d. Daftar transaksi aktif saat checkpoint

e. Eksekusi transaksi

Skor: 3 poin per langkah.

### Bagian V (Studi Kasus)

a. undo-list = {T2, T3}.

b. Karena T1 sudah <T1 commit>, maka perubahannya harus dijamin durabilitasnya (REDO), bukan dibatalkan.

c. A=150, B=250, C=350 (Redo mengulang SEMUA perubahan di log).

d. T2 dan T3. Contoh CLR T2: <T2, B, 200>.

e. Ya, Shadow Paging menawarkan recovery hampir instan (RTO sangat rendah) karena tidak ada scan log, namun sulit menangani konkurensi tinggi.

Skor: 4 poin per sub-pertanyaan.

### Bagian VI (Pilihan Ganda)

1. b, b | 2. a, a | 3. a, b | 4. b, b | 5. a, b
    
2. b, b | 7. b, b | 8. b, a | 9. a, b | 10. a, a
    
    Skor: 2 poin per nomor (benar kedua kategori).
    

### Bagian VII (Isian Terstruktur)

- **Analysis:** Menentukan transaksi aktif/kotor saat crash.
    
- **Redo:** Mengulang aksi dari titik tertentu untuk Durability.
    
- Undo: Membatalkan transaksi yang gagal untuk Atomicity.
    
    Skor: 3.3 poin per poin.
    

## Tips Pengerjaan untuk Peserta

1. **Pahami Arah Scan Log:** Ingat bahwa **REDO = Maju** (mengulang sejarah) dan **UNDO = Mundur** (membersihkan kekacauan).
    
2. **Prinsip WAL:** Jangan pernah terkecoh, log (info undo) WAJIB sampai ke disk sebelum data aslinya.
    
3. **Manajemen Waktu:** - Bagian I-IV: 40 menit
    
    - Bagian V: 30 menit
        
    - Bagian VI-VII: 40 menit
        
    - Review: 10 menit
        

## Sumber Belajar yang Direkomendasikan

- Silberschatz, Database System Concepts, 7th Ed, Chapter 19 (Recovery System).
    
- Modul Kuliah "Recovery System - 1 & 2".
    
- Paper ARIES (Mohan et al.) untuk pemahaman mendalam tentang CLR.