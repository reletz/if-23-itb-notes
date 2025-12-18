_Back to_ [[Latihan UAS IF3140]]

# Problem Set: Recovery System - Paket C (Sistem Basis Data)

Mata Pelajaran: Sistem Basis Data

Topik: Advanced Recovery (ARIES, CLR, Buffering & Disaster Recovery)

Estimasi Waktu: 120 menit

Total Nilai: 100 poin

## Tujuan Pembelajaran

Setelah menyelesaikan paket soal C ini, mahasiswa diharapkan dapat:

1. Menganalisis peran _Compensation Log Record_ (CLR) dalam menjamin pemulihan yang _restartable_.
    
2. Membedakan kebijakan manajemen buffer (_Steal/No-Steal_ dan _Force/No-Force_).
    
3. Memahami proses _Failover_ dan tingkat durabilitas pada _Remote Backup System_.
    
4. Menganalisis perbedaan prosedur pemulihan antara _Log-Based_ dan _Shadow Paging_.
    
5. Mengevaluasi penggunaan _Latch_ untuk proteksi blok fisik selama operasi I/O.
    

## BAGIAN I: Tabel Matrix - Karakteristik Protokol (Format A) [10 Poin]

**Instruksi:** Tandai protokol mana yang sesuai dengan pernyataan di bawah ini.

|   |   |   |   |   |
|---|---|---|---|---|
|**No**|**Pernyataan Mekanisme**|**Log-Based (ARIES)**|**Shadow Paging**|**Remote Backup**|
|1|Memulihkan data dengan cara memindai log record.||||
|2|Menyediakan _High Availability_ via _Backup Site_ geografis.||||
|3|Menggunakan tabel halaman (Current & Shadow) di disk.||||
|4|Mendukung mekanisme _restartable undo_ menggunakan CLR.||||
|5|Menggunakan operasi _Atomic Switch_ pada pointer disk saat commit.||||

## BAGIAN II: Benar/Salah (Format B) [10 Poin]

**Instruksi:** Tentukan apakah pernyataan berikut Benar (B) atau Salah (S).

|   |   |   |   |
|---|---|---|---|
|**No**|**Pernyataan**|**Benar**|**Salah**|
|1|Kebijakan _Steal_ membolehkan blok data yang belum commit ditulis ke disk.|||
|2|Operasi _Undo_ pada algoritma recovery tidak menghasilkan log record baru.|||
|3|_Two-Very-Safe_ adalah mode replikasi sinkron yang menjamin nol kehilangan data.|||
|4|_Shadow Paging_ sangat efisien dalam menangani banyak transaksi konkuren.|||
|5|_Latching_ adalah kunci jangka panjang untuk menjaga isolasi transaksi.|||

## BAGIAN III: Tabel Analisis Komparatif (Format C) [15 Poin]

**Instruksi:** Bandingkan kebijakan manajemen buffer berikut.

|   |   |   |   |   |
|---|---|---|---|---|
|**Kebijakan**|**Fokus Utama**|**Kebutuhan UNDO**|**Kebutuhan REDO**|**Analisis Performa**|
|**Steal**|Izinkan flush data uncommitted||||
|**No-Steal**|Data uncommitted tetap di RAM||||
|**Force**|Paksa tulis disk saat commit||||
|**No-Force**|Izinkan data commit di RAM||||

## BAGIAN IV: Step-by-Step Scaffolding (Format D) [15 Poin]

**Instruksi:** Lengkapi alur proses _Failover_ pada sistem Remote Backup.

|   |   |   |
|---|---|---|
|**Langkah**|**Instruksi**|**Jawaban / Aksi Sistem**|
|a.|Monitoring|Backup site terus memantau primary melalui pesan ...|
|b.|Deteksi|Jika pesan berhenti, backup site mengasumsikan primary ...|
|c.|Recovery|Backup site menjalankan proses recovery menggunakan arsip ...|
|d.|Takeover|Backup site mengubah statusnya menjadi server ...|
|e.|Re-routing|Sistem mengarahkan semua koneksi pengguna ke ...|

## BAGIAN V: Studi Kasus Multi-Bagian (Format E) [20 Poin]

Kasus:

DBMS menerapkan algoritma ARIES dengan CLR. Berikut adalah isi log saat sistem restart:

1. `<T1, start>`
    
2. `<T1, X, 10, 20>`
    
3. `<T2, start>`
    
4. `<T2, Y, 50, 60>`
    
5. `<checkpoint {T1, T2}>`
    
6. `<T1, abort>`
    
7. `<T1, X, 10>` (CLR ditulis)
    
8. `<T2, commit>`
    
9. `[CRASH]`
    

**Data yang diberikan:**

- Sistem menggunakan kebijakan _Steal/No-Force_.
    
- Tidak ada crash selama penulisan CLR di langkah 7.
    

Pertanyaan:

a. Selama fase Redo, langkah nomor berapa saja yang diulang?

b. Sebutkan isi undo-list tepat setelah fase Redo selesai.

c. Mengapa T1 tidak masuk ke undo-list meskipun ia gagal (abort)?

d. Jika crash terjadi lagi tepat SETELAH langkah 7, apakah sistem akan melakukan undo lagi pada X? Mengapa?

e. Apa peran CLR dalam memastikan operasi recovery bersifat idempotent?

## BAGIAN VI: Pilihan Ganda Multi-Kategori (Format F) [20 Poin]

1. Terkait **Optimasi Buffering**, pilih kebijakan yang paling umum di DBMS modern:
    
    - **Kebijakan Buffering:** a) Steal / No-Force b) No-Steal / Force c) Steal / Force d) No-Steal / No-Force
        
    - **Alasan:** a) Performa I/O tinggi b) RAM tak terbatas c) Tanpa log d) Data selalu aman di disk
        
2. Mengenai **Shadow Paging**, pilih konsekuensi teknisnya:
    
    - **Masalah Data:** a) Fragmentasi disk b) Data hilang saat crash c) Log terlalu besar d) Checkpoint lambat
        
    - **Kebutuhan Sistem:** a) Garbage Collection b) Backup site c) Redo log d) Undo-list
        
3. Terkait **Remote Backup System**, pilih tingkat durabilitasnya:
    
    - **One-Safe:** a) Latensi rendah, risiko data hilang b) Latensi tinggi, aman c) Tanpa jaringan d) Hanya untuk RAM
        
    - **Two-Safe:** a) Kompromi antara ketersediaan & durabilitas b) Selalu lambat c) Sangat tidak aman d) Tanpa failover
        
4. Mengenai **Konfigurasi Backup**, pilih model operasionalnya:
    
    - **Hot-Spare:** a) Backup site aktif proses redo log b) Backup site mati c) Backup site hanya simpan dump d) Backup site di lokasi sama
        
    - **Warm-Spare:** a) Backup site hanya terima log tanpa apply b) Backup site lebih cepat dari hot c) Backup site tanpa disk d) Tanpa heartbeat
        
5. Terkait **Proses Restart Recovery**, pilih urutan fasenya:
    
    - **Fase Pertama:** a) Analysis Phase b) Undo Phase c) Redo Phase d) Checkpoint Phase
        
    - **Fase Terakhir:** a) Analysis Phase b) Undo Phase c) Redo Phase d) Commit Phase
        
6. Mengenai **Latching**, pilih perbedaan dengan Locking:
    
    - **Durasi Latch:** a) Sangat singkat (mikrodetik) b) Sepanjang transaksi c) Selamanya d) Hanya saat start
        
    - **Tujuan Latch:** a) Proteksi fisik blok RAM b) Isolasi logika data c) Cegah deadlock d) Logging
        
7. Terkait **Database Dump**, pilih metodenya:
    
    - **Fuzzy Dump:** a) Dump saat transaksi berjalan b) Dump saat sistem mati c) Dump tanpa data d) Dump log saja
        
    - **Roll Forward:** a) Apply log setelah restore dump b) Hapus data c) Restart OS d) Buat tabel baru
        
8. Mengenai **Log-Based Recovery**, pilih keunggulannya atas Shadow Paging:
    
    - **Konkurensi:** a) Sangat mendukung banyak user b) Sulit untuk banyak user c) Tanpa user d) Hanya satu user
        
    - **Lokasi Data:** a) In-place update b) Copy-on-write c) Data di RAM saja d) Tanpa disk
        
9. Terkait **Recovery from Disaster**, pilih tindakan yang tepat:
    
    - **Disk Failure:** a) Restore dari Dump + Roll Forward b) Cukup Undo/Redo c) Ganti RAM d) Hapus log
        
    - **Stable Storage:** a) Gunakan redundansi RAID b) Gunakan satu disk murah c) Tanpa backup d) Simpan di RAM
        
10. Mengenai **Two-Phase Commit (2PC)**, pilih isu utamanya:
    
    - **Sifat Protokol:** a) Blocking jika koordinator fail b) Non-blocking c) Tanpa koordinator d) Sangat cepat
        
    - **Tujuan:** a) Global Atomicity b) Local Isolation c) Disk Backup d) Query Optimization
        

## BAGIAN VII: Isian Terstruktur (Format G) [10 Poin]

**Jelaskan komponen algoritma ARIES berikut:**

- **Analysis Phase:** _________________________________________________
    
- **Redo Phase (Repeating History):** __________________________________
    
- **Undo Phase:** _____________________________________________________
    
- **Compensation Log Record (CLR):** ___________________________________
    
- **Log Sequence Number (LSN):** _______________________________________
    

# Kunci Jawaban (Paket C)

I: 1.Log, 2.Rem, 3.Sha, 4.Log, 5.Sha

II: 1.B, 2.S (CLR adalah log baru), 3.B, 4.S, 5.S

III: Steal(Ya, Ya), No-Steal(Tdk, Ya), Force(Ya, Tdk), No-Force(Ya, Ya)

V: a.1-8; b. {T2}; c.T1 sudah punya abort record & CLR (dianggap sudah tertangani); d.Tidak, CLR menandakan undo sudah dilakukan; e.Idempotensi (undo tidak diulang).

VI: 1.a,a | 2.a,a | 3.a,a | 4.a,a | 5.a,b | 6.a,a | 7.a,a | 8.a,a | 9.a,a | 10.a,a