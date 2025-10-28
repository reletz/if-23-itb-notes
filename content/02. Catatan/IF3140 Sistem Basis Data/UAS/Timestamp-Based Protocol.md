---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] 3.1: Timestamp-Based Protocol
> 
> > ## Questions/Cues
> >
> > - Apa ide dasar _Timestamp Protocol_?
> >     
> > - Apa bedanya dengan _Locking_?
> >     
> > - Apa itu _Timestamp_ (TS)?
> >     
> > - TS apa saja yang disimpan?
> >     
> > - Apa itu `TS(Ti)`?
> >     
> > - Apa itu `W-TS(Q)`?
> >     
> > - Apa itu `R-TS(Q)`?
> >     
> > - Bagaimana Aturan _Read_?
> >     
> > - Bagaimana Aturan _Write_?
> >     
> > - Apakah menjamin _serializability_?
> >     
> > - Apakah bebas _deadlock_?
> >     
> > - Apakah bebas _cascading rollback_?
> >     
> > - Apa itu _Thomas's Write Rule_?
> >     
> >
> > ## Reference Points
> >
> > - Slides "11 - Concurrency Control - 2.pdf" (Hal 25-28)
> >     
> 
> > ### Ide Dasar: Timestamp-Based Protocol
> >
> > Berbeda dengan _Lock-Based Protocol_ yang bersifat "pesimis" (minta izin dulu sebelum bekerja), _Timestamp-Based Protocol_ menggunakan urutan _serializability_ yang ditentukan **di awal**.
> >
> > - Setiap transaksi (Ti) diberi **Timestamp** unik (`TS(Ti)`) saat ia dimulai.
> >     
> > - Sistem menjamin bahwa setiap eksekusi yang konkuren akan setara dengan eksekusi serial dalam urutan _timestamp_ tersebut.
> >     
> > - Jika ada operasi yang "melanggar" urutan _timestamp_, operasi itu akan ditolak dan transaksinya di-_rollback_ (Abort).
> >     
> >
> > ### Jenis-Jenis Timestamp
> >
> > 1. **`TS(Ti)` (Timestamp Transaksi):** Sebuah nilai unik (biasanya waktu sistem atau _counter_) yang diberikan saat transaksi Ti **dimulai**. Jika `TS(Ti) < TS(Tj)`, maka Ti dianggap **lebih tua** dari Tj.
> >     
> > 2. **`W-TS(Q)` (Write-Timestamp):** Disimpan untuk setiap item data Q. Ini mencatat _timestamp_ dari transaksi **terbaru** yang **berhasil** melakukan `write(Q)`.
> >     
> > 3. **`R-TS(Q)` (Read-Timestamp):** Disimpan untuk setiap item data Q. Ini mencatat _timestamp_ dari transaksi **terbaru** yang **berhasil** melakukan `read(Q)`.
> >     
> >
> > ### Aturan Protokol Timestamp-Ordering
> >
> > Protokol ini mengecek dua aturan berikut pada _setiap_ operasi `read` dan `write`:
> >
> > #### 1. Aturan `read(Q)` oleh Transaksi Ti
> >
> > - **Kasus 1: `TS(Ti) < W-TS(Q)`**
> >     
> > 	- **Logika:** Ti (yang lebih tua) mencoba `read(Q)`, TAPI data Q *sudah* ditulis oleh transaksi lain (Tj) yang *lebih muda*.
> > 	- **Masalah:** Nilai Q yang akan dibaca Ti adalah nilai yang "terlalu baru" (seharusnya belum ada di dunia Ti). Ini melanggar urutan serial.
> > 	- **Tindakan:** `read` ditolak. Transaksi **Ti di-ABORT** (rollback).
> >
> >
> > - **Kasus 2: `TS(Ti) >= W-TS(Q)`**
> >     
> > 	- **Logika:** Ti (yang lebih tua) mencoba `read(Q)`, dan data Q ditulis oleh transaksi yang setara atau lebih tua.
> > 	- **Tindakan:** `read` **DIIZINKAN**.
> > 	- **Update:** Sistem meng-update `R-TS(Q) = max(R-TS(Q), TS(Ti))`.
> > 
> > #### 2. Aturan `write(Q)` oleh Transaksi Ti
> >
> > - **Kasus 1: `TS(Ti) < R-TS(Q)`**
> > 
> > 	- **Logika:** Ti (yang lebih tua) mencoba `write(Q)`, TAPI data Q *sudah* dibaca oleh transaksi lain (Tj) yang *lebih muda*.
> > 	- **Masalah:** Tulisan Ti akan membuat nilai yang *sudah dibaca* Tj menjadi tidak valid (usang). Ini melanggar urutan serial.
> > 	- **Tindakan:** `write` ditolak. Transaksi **Ti di-ABORT** (rollback).
> >  
> >
> > - **Kasus 2: `TS(Ti) < W-TS(Q)`**
> >     
> > 	- **Logika:** Ti (yang lebih tua) mencoba `write(Q)`, TAPI data Q *sudah* ditulis oleh transaksi lain (Tj) yang *lebih muda*.
> > 	- **Masalah:** Tulisan Ti adalah tulisan yang "usang".
> > 	- **Tindakan (Normal):** `write` ditolak. Transaksi **Ti di-ABORT**.
> > 	- **Tindakan (Thomas's Write Rule):** Lihat di bawah.
> >
> >
> > - **Kasus 3: (Aman, `TS(Ti) >= R-TS(Q)` dan `TS(Ti) >= W-TS(Q)`)**
> >     
> > 	- **Tindakan:** `write` **DIIZINKAN**.
> > 	- **Update:** Sistem meng-update `W-TS(Q) = TS(Ti)`.
> >
> >
> > ### Jaminan dan Masalah
> >
> > - **Menjamin** _**Conflict Serializability**_**:** Ya, karena protokol ini secara eksplisit memaksakan urutan konflik sesuai urutan _timestamp_.
> >     
> > - **Bebas** _**Deadlock**_**:** **YA**. Ini keunggulan utamanya. Tidak ada mekanisme "tunggu" (wait) seperti di _locking_. Jika terjadi konflik, salah satu transaksi langsung di-_rollback_. Tidak ada siklus tunggu.
> >     
> > - **Bisa terjadi** _**Cascading Rollback**_**:** **YA**. (Misal: T1 `write(Q)`. T2 (TS lebih besar) `read(Q)`. Lalu T1 _abort_. T2 yang sudah membaca data T1 juga harus _abort_).
> >     
> >
> > ### Modifikasi: Thomas's Write Rule
> >
> > Ini adalah modifikasi untuk Aturan `write(Q)` Kasus 2 (`TS(Ti) < W-TS(Q)`).
> >
> > - **Aturan Asli:** `write` ditolak dan Ti di-_rollback_.
> >     
> > - **Aturan Thomas:** `write` dari Ti **DIABAIKAN (IGNORED)**, dan Ti boleh lanjut (tidak _abort_).
> >     
> > - **Logika:** Transaksi Tj (yang lebih muda) sudah `write(Q)`. Tulisan Ti (yang lebih tua) sudah "usang" (_obsolete_). Tidak ada gunanya menulisnya, toh akan ditimpa lagi oleh Tj. Jadi, abaikan saja seolah-olah tidak pernah terjadi.
> >     
> > - **Hasil:** Mengizinkan lebih banyak konkurensi. Hasilnya adalah jadwal yang _View Serializable_, meskipun tidak _Conflict Serializable_.
> >     

> [!cornell] #### Summary
> 
> _**Timestamp-Based Protocol**_ **adalah protokol non-locking yang menentukan urutan** _**serializability**_ **di awal menggunakan** _**Timestamp**_ **(`TS`) unik untuk setiap transaksi. Setiap item data Q menyimpan `W-TS(Q)` (TS** _**write**_ **terbaru) dan `R-TS(Q)` (TS** _**read**_ **terbaru). Protokol ini menjamin** _**serializability**_ **dengan me-**_**rollback**_ **(abort) transaksi (Ti) jika ia mencoba `read` data yang** _**sudah ditulis**_ **oleh transaksi lebih muda (`TS(Ti) < W-TS(Q)`) atau mencoba `write` data yang** _**sudah dibaca**_ **oleh transaksi lebih muda (`TS(Ti) < R-TS(Q)`). Keunggulan utamanya adalah bebas** _**deadlock**_ **(karena tidak ada** _**wait**_**), namun masih bisa terjadi** _**cascading rollback**_**.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Mengapa Timestamp-Based Protocol Bebas Deadlock?
> 
> _Deadlock_ terjadi karena adanya _Circular Wait_ (saling tunggu).
> 
> 1. Dalam _Locking_, T1 bisa memegang A dan menunggu B, sementara T2 memegang B dan menunggu A. Ini adalah _Circular Wait_.
>     
> 2. Dalam _Timestamp Protocol_, mekanisme "tunggu" tidak ada.
>     
> 3. Jika T1 (lebih tua) konflik dengan T2 (lebih muda) yang memegang _resource_... T1 tidak menunggu. T1 akan memaksa T2 untuk _rollback_ (jika T2 melanggar _read/write_ T1) atau T1 sendiri yang _rollback_ (jika T1 melanggar _read/write_ T2).
>     
> 4. Karena tidak ada status "menunggu" yang saling bergantung, _deadlock_ secara definisi tidak mungkin terjadi.
>     
> 
> #### Kekurangan Timestamp-Based Protocol
> 
> 1. **Biaya Rollback Tinggi:** Protokol ini bisa menghasilkan _rollback_ yang sebenarnya tidak perlu. Banyak jadwal non-serializable yang aman, tetapi tetap di-_rollback_ oleh protokol ini karena kaku.
>     
> 2. **Overhead Komunikasi:** Setiap operasi `read` dan `write` sekarang menjadi lebih mahal. Mereka tidak hanya mengakses data, tetapi juga harus mengakses (dan mungkin meng-update) _timestamp_ `R-TS` dan `W-TS`, yang memerlukan _lock_ internal level-rendah (_latch_).
>     
> 3. **Potensi Starvation:** Transaksi yang "tua" (TS kecil) yang di-_rollback_ akan dimulai ulang dengan _timestamp_ yang **sama** (tua). Jika ia terus-menerus konflik dengan transaksi baru (yang lebih muda), ia bisa di-_rollback_ berulang kali.
>