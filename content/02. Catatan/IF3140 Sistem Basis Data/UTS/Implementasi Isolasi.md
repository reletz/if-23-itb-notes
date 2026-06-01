---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Implementasi Isolasi
> 
> > ## Questions/Cues
> > 
> > - Apa saja 3 teknik utama implementasi isolasi?
> >     
> > - Bagaimana cara kerja _Locking_?
> >     
> > - Apa beda _Shared Lock_ vs _Exclusive Lock_?
> >     
> > - Bagaimana cara kerja _Timestamps_?
> >     
> > - Apa itu _Read/Write Timestamp_?
> >     
> > - Bagaimana cara kerja _Multiple Versions_ (MVCC)?
> >     
> > - Apa itu _Predicate Locking_?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 39-40
> >     
>
> > ### Implementasi Level Isolasi
> > 
> > Untuk menegakkan level isolasi dan menjamin serializability, sistem basis data menggunakan **protokol kontrol konkurensi**. Tiga pendekatan utama yang digunakan adalah:
> > 
> > 1. **Locking (Penguncian)**
> >     
> > 2. **Timestamps (Pemberian Cap Waktu)**
> >     
> > 3. **Multiple Versions (Penyimpanan Versi Ganda)**
> >     
> > 
> > ### 1. Protokol Berbasis Locking
> > 
> > Ini adalah pendekatan yang paling intuitif dan umum digunakan.
> > 
> > - **Konsep:** Sebuah transaksi harus meminta dan mendapatkan "kunci" (_lock_) pada sebuah item data sebelum diizinkan melakukan operasi (baca/tulis). Transaksi lain yang ingin mengakses data tersebut dengan cara yang berkonflik harus menunggu hingga kunci dilepaskan.
> >     
> > - **Jenis Lock:**
> >     
> >     - **Shared Lock (S-lock):** Diperlukan untuk operasi `read`. Beberapa transaksi dapat memegang S-lock pada item yang sama secara bersamaan.
> >         
> >     - **Exclusive Lock (X-lock):** Diperlukan untuk operasi `write`. Jika satu transaksi memegang X-lock, tidak ada transaksi lain yang bisa mendapatkan lock jenis apa pun (baik S-lock maupun X-lock) pada item tersebut.
> >         
> > - **Aspek Penting Lainnya:**
> >     
> >     - **Granularity:** Seberapa besar unit data yang dikunci? (Misalnya, satu baris, satu halaman memori, atau seluruh tabel).
> >         
> >     - **Duration:** Berapa lama kunci dipegang? (Biasanya hingga transaksi selesai dengan `COMMIT` atau `ROLLBACK`).
> >         
> > 
> > ### 2. Protokol Berbasis Timestamps
> > 
> > - **Konsep:** Setiap transaksi diberi cap waktu (_timestamp_) unik saat dimulai. Sistem menggunakan cap waktu ini untuk mengurutkan eksekusi transaksi. Jika ada operasi yang melanggar urutan waktu ini, maka operasi tersebut akan ditolak.
> >     
> > - **Mekanisme:**
> >     
> >     - Setiap item data di basis data menyimpan `Write-timestamp` (cap waktu dari transaksi terakhir yang menulisnya) dan `Read-timestamp` (cap waktu dari transaksi terakhir yang membacanya).
> >         
> >     - Ketika sebuah transaksi mencoba mengakses data, sistem membandingkan cap waktu transaksi tersebut dengan cap waktu pada data untuk memastikan urutan serial tetap terjaga. Jika terdeteksi konflik (misalnya, transaksi yang lebih "muda" mencoba menimpa data yang sudah dibaca oleh transaksi yang lebih "tua"), transaksi yang melanggar akan dibatalkan (_rolled back_).
> >         
> > 
> > ### 3. Protokol Berbasis Multiple Versions (MVCC)
> > 
> > MVCC (Multi-Version Concurrency Control) adalah pendekatan canggih yang meningkatkan performa secara signifikan.
> > 
> > - **Konsep:** Alih-alih satu data ditimpa oleh perubahan, sistem menyimpan beberapa versi dari sebuah item data. Setiap versi memiliki informasi tentang transaksi yang menciptakannya.
> >     
> > - **Mekanisme:**
> >     
> >     - **Operasi Read:** Ketika sebuah transaksi ingin membaca data, sistem akan memberikannya "snapshot" atau versi data yang konsisten pada saat transaksi tersebut dimulai.
> >         
> >     - **Operasi Write:** Ketika sebuah transaksi ingin menulis data, ia akan membuat versi baru dari data tersebut, tanpa mengganggu transaksi lain yang mungkin sedang membaca versi lama.
> >         
> > - **Keuntungan Utama:** Pembaca tidak memblokir penulis, dan penulis tidak memblokir pembaca. Ini mengurangi waktu tunggu dan meningkatkan konkurensi.
> >     

> [!cornell] #### Summary
> 
> **Untuk mengelola eksekusi konkuren, sistem basis data mengandalkan protokol utama seperti** _**Locking**_**, yang mengunci data untuk mencegah konflik;** _**Timestamping**_**, yang mengurutkan transaksi berdasarkan cap waktu untuk mendeteksi pelanggaran urutan; dan** _**Multi-Version Concurrency Control (MVCC)**_**, yang menyimpan beberapa versi data untuk memungkinkan operasi baca dan tulis berjalan bersamaan tanpa saling memblokir. Setiap metode menawarkan trade-off antara kompleksitas implementasi, performa, dan tingkat konkurensi.**

> [!ad-libitum]- Additional Information
> 
> #### Predicate Locking untuk Mencegah Phantom Reads
> 
> _Phantom Read_ terjadi ketika sebuah transaksi melihat baris data baru yang disisipkan oleh transaksi lain di tengah-tengah eksekusinya. Mengunci baris-baris yang sudah ada saja tidak cukup. **Predicate Locking** adalah solusinya.
> 
> Alih-alih mengunci baris data individual, mekanisme ini mengunci sebuah _predikat_ (kondisi dalam klausa `WHERE`). Misalnya, jika Transaksi 1 menjalankan `SELECT * FROM instructor WHERE salary > 90000`, sistem tidak hanya mengunci instruktur yang gajinya di atas 90rb saat ini, tetapi juga mengunci "kondisi `salary > 90000`" itu sendiri. Hal ini akan mencegah Transaksi 2 untuk menyisipkan instruktur baru dengan gaji 100rb hingga Transaksi 1 selesai.
> 
> #### Implementasi Populer di Dunia Nyata
> 
> - **MySQL (InnoDB):** Secara default menggunakan _locking_ (khususnya protokol Two-Phase Locking) dan juga mengimplementasikan MVCC untuk level isolasi `REPEATABLE READ`.
>     
> - **PostgreSQL & Oracle:** Keduanya adalah pengguna utama MVCC (dengan varian bernama _Snapshot Isolation_). Inilah sebabnya kedua basis data ini dikenal memiliki performa konkurensi yang sangat baik.
>     
> 
> #### Two-Phase Locking (2PL)
> 
> Ini adalah protokol locking yang paling umum untuk menjamin _conflict serializability_. Aturannya sederhana: sebuah transaksi dibagi menjadi dua fase:
> 
> 1. **Growing Phase:** Transaksi boleh meminta dan mendapatkan _lock_, tetapi tidak boleh melepas _lock_ apa pun.
>     
> 2. **Shrinking Phase:** Transaksi boleh melepas _lock_, tetapi setelah melepas satu _lock_, ia tidak boleh meminta _lock_ baru lagi.
>     
> 
> Protokol ini efektif, namun memiliki kelemahan: dapat menyebabkan _deadlock_ (situasi di mana dua atau lebih transaksi saling menunggu untuk melepaskan _lock_).