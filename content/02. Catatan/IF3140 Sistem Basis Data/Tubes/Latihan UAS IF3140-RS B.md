_Back to_ [[Latihan UAS IF3140]]

# Problem Set: Recovery System - Paket B (Sistem Basis Data)

Mata Pelajaran: Sistem Basis Data

Topik: Recovery System (Storage Hierarchy, Failure Classification, & Log Logic)

Estimasi Waktu: 120 menit

Total Nilai: 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal B ini, mahasiswa diharapkan dapat:

1. Membedakan karakteristik penyimpanan fisik (Volatile, Non-volatile, Stable).
    
2. Mengklasifikasikan jenis kegagalan sistem (Transaction, System, Disk).
    
3. Menganalisis alur akses data antara Disk, Buffer, dan Working Area.
    
4. Menentukan nasib transaksi (Undo/Redo) berdasarkan status log.
    
5. Memahami mekanisme redundansi untuk mencapai Stable Storage.
    

## BAGIAN I: Klasifikasi & Matching (Format A) [10 Poin]

**Instruksi:** Cocokkan setiap karakteristik di bawah ini dengan tipe penyimpanan yang tepat.

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Karakteristik / Sifat**|**Volatile**|**Non-Volatile**|**Stable Storage**|
|1|Data hilang jika listrik mati (misal: RAM).||||
|2|Diaproksimasi menggunakan redundansi blok fisik di beberapa disk.||||
|3|Bertahan saat crash, namun bisa gagal karena kerusakan fisik media.||||
|4|Contoh utamanya adalah Hard Disk (HDD) dan Solid State Drive (SSD).||||
|5|Secara teoritis diasumsikan kebal terhadap segala jenis kegagalan.||||

## BAGIAN II: Benar/Salah (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|Kegagalan sistem (System Crash) menyebabkan seluruh isi RAM hilang secara permanen.|||
|2|Dalam skema redundansi, penulisan ke blok fisik kedua dilakukan sebelum blok pertama selesai.|||
|3|Log record `<Ti, X, V1, V2>` mencatat nilai lama (V1) dan nilai baru (V2) dari item X.|||
|4|Durability menjamin bahwa perubahan transaksi yang sudah commit tidak akan hilang meski sistem crash.|||
|5|Input(X) adalah operasi menyalin blok data X dari buffer memory kembali ke disk.|||

## BAGIAN III: Tabel Analisis Komparatif (Format C) [15 Poin]

**Instruksi:** Analisislah klasifikasi kegagalan berikut.

|   |   |   |   |   |
|---|---|---|---|---|
|**Jenis Kegagalan**|**Penyebab Utama**|**Dampak pada Data**|**Strategi Pemulihan Utama**|**Justifikasi**|
|**Transaction Failure**|Logical Error / Deadlock||||
|**System Crash**|Hardware / OS Failure||||
|**Disk Failure**|Head Crash / Korupsi Fisik||||

## BAGIAN IV: Step-by-Step Scaffolding (Format D) [15 Poin]

**Instruksi:** Lengkapi alur akses data transaksi saat memodifikasi item data X.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi**|**Jawaban / Aksi Sistem**|
|a.|Pencarian|Mencari apakah blok X ada di ...|
|b.|Pemindahan (Input)|Jika tidak ada, salin blok X dari disk ke ...|
|c.|Working Area|Salin data X dari buffer ke area privat transaksi yang disebut ...|
|d.|Modifikasi|Lakukan operasi write(X) yang merubah nilai X di dalam ...|
|e.|Output|Secara asinkron atau paksa, blok X yang "kotor" disalin kembali ke ...|

## BAGIAN V: Studi Kasus Multi-Bagian (Format E) [20 Poin]

Kasus:

Sistem menggunakan Immediate Database Modification. Terjadi crash dan log record terakhir adalah:

1. `<T1, start>`
    
2. `<T1, A, 100, 150>`
    
3. `<T2, start>`
    
4. `<T2, B, 50, 100>`
    
5. `<T1, commit>`
    
6. `<T3, start>`
    
7. `<T3, C, 200, 250>`
    
8. `[CRASH]`
    

**Data yang diberikan:**

- Nilai awal: A=100, B=50, C=200.
    
- Tidak ada checkpoint dalam log ini.
    

Pertanyaan:

a. Transaksi mana saja yang berstatus active saat kegagalan terjadi?

b. Transaksi mana yang masuk ke daftar REDO? Jelaskan syaratnya.

c. Transaksi mana yang masuk ke daftar UNDO? Jelaskan syaratnya.

d. Berapa nilai akhir item data A dan B di disk setelah recovery selesai?

e. Berapa nilai akhir item data C di disk? Mengapa nilainya kembali ke awal?

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Terkait **Jenis Log Record**, pilih pasangan fungsi yang tepat:
    
    - **`<Ti start>`:** a) Inisialisasi transaksi b) Finalisasi transaksi c) Hapus data d) Abort otomatis
        
    - **`<Ti commit>`:** a) Menandakan atomicity b) Menandakan durability sukses c) Mulai undo d) Hapus log buffer
        
2. Dalam konteks **Penyimpanan Stabil (Stable Storage)**, pilih metode aproksimasi:
    
    - **Teknik Redundansi:** a) RAID 1 (Mirroring) b) Tanpa Backup c) Cache RAM d) Working Area
        
    - **Prosedur Tulis:** a) Tulis simultan b) Tulis berurutan (Sequential) c) Abaikan error d) Hanya satu copy
        
3. Mengenai **Logika Undo**, pilih kondisi dan aksi yang sesuai:
    
    - **Kondisi Undo:** a) Ada start, ada commit b) Ada start, tanpa commit c) Tanpa start d) Ada checkpoint
        
    - **Arah Pemindaian:** a) Scan maju b) Scan mundur c) Scan acak d) Scan log buffer saja
        
4. Mengenai **Logika Redo**, pilih kondisi dan aksi yang sesuai:
    
    - **Kondisi Redo:** a) Ada start & commit b) Hanya ada start c) Ada abort d) Data masih di RAM
        
    - **Arah Pemindaian:** a) Scan maju b) Scan mundur c) Scan melompat d) Hanya scan checkpoint
        
5. Terkait **Hirarki Penyimpanan**, pilih perbandingan kecepatan dan kapasitas:
    
    - **Volatile (RAM):** a) Sangat cepat, kapasitas kecil b) Lambat, kapasitas besar c) Sangat lambat, persisten d) Tercepat, kapasitas tak terhingga
        
    - **Non-volatile (Disk):** a) Lebih lambat dari RAM b) Lebih cepat dari RAM c) Kapasitas kecil d) Data hilang saat crash
        
6. Mengenai **Operasi Buffer**, pilih definisi aksi yang tepat:
    
    - **Output(B):** a) Blok dari disk ke RAM b) Blok dari RAM ke disk c) Blok dihapus d) Transaksi dimulai
        
    - **Input(B):** a) Blok dari disk ke RAM b) Blok dari RAM ke disk c) Blok dimodifikasi d) Log ditulis
        
7. Terkait **Transaction Failure**, pilih penyebab kegagalannya:
    
    - **Logical Error:** a) Listrik mati b) Pembagian nol c) Head crash d) OS bug
        
    - **System Error:** a) Deadlock detection b) Query salah c) Disk korup d) Kabel putus
        
8. Dalam **Aproksimasi Stable Storage**, pilih mekanisme pemulihan blok:
    
    - **Checksum:** a) Deteksi korupsi data b) Tambah kapasitas c) Percepat write d) Hapus log
        
    - **Copy Recovery:** a) Pakai copy yang bagus b) Format ulang disk c) Restart transaksi d) Abaikan data
        
9. Mengenai **Immediate Modification**, pilih aturan utamanya:
    
    - **Aturan WAL:** a) Log sebelum data b) Data sebelum log c) Tanpa log d) Log di RAM saja
        
    - **Waktu Commit:** a) Saat log commit di disk b) Saat data di disk c) Saat transaksi start d) Saat user logout
        
10. Mengenai **Checkpoint Sederhana**, pilih langkah krusialnya:
    
    - **Flush Buffer:** a) Tulis data kotor ke disk b) Hapus RAM c) Restart OS d) Batalkan transaksi
        
    - **Record Checkpoint:** a) Catat list transaksi aktif b) Catat semua password c) Catat jumlah user d) Hapus file log
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen struktur penyimpanan data berikut:**

- **Volatile Storage:** _________________________________________________
    
- **Non-volatile Storage:** _____________________________________________
    
- **Stable Storage:** ___________________________________________________
    
- **Buffer Pool:** ______________________________________________________
    
- **Log Buffer:** _______________________________________________________
    

# Kunci Jawaban (Paket B)

(Disederhanakan untuk ringkasan)

I: 1.V, 2.SS, 3.NV, 4.NV, 5.SS

II: 1.B, 2.S, 3.B, 4.B, 5.S

III: Trans-Fail (Logic/System, Atomicity, Abort), Crash (Hardware, RAM Loss, Undo/Redo), Disk (Physical, Data Loss, Restore/Dump)

V: a.T2, T3; b.T1 (Commit ada); c.T2, T3 (No commit); d.A=150, B=50; e.C=200 (Undo membalik ke V1).

VI: 1.a,b | 2.a,b | 3.b,b | 4.a,a | 5.a,a | 6.b,a | 7.b,a | 8.a,a | 9.a,a | 10.a,a