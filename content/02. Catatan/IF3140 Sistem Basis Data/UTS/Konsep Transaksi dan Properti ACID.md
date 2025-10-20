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
> > - Apa itu Transaksi?
> >     
> > - Apa saja masalah utama dalam eksekusi transaksi?
> >     
> > - Apa itu properti ACID?
> >     
> > - Mengapa **Atomicity** penting?
> >     
> > - Bagaimana **Consistency** dijaga?
> >     
> > - Apa tujuan dari **Isolation**?
> >     
> > - Apa jaminan dari **Durability**?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 5-9
> >     
> 
> > ### Apa itu Transaksi?
> > 
> > Sebuah **transaksi** adalah satu unit eksekusi program yang mengakses dan berpotensi memodifikasi berbagai item data dalam sebuah basis data.
> > 
> > Sederhananya, transaksi adalah serangkaian operasi (seperti membaca, menulis, memperbarui data) yang diperlakukan sebagai **satu kesatuan kerja logis yang tunggal dan tidak dapat dipisah**. Jika salah satu operasi dalam unit tersebut gagal, maka seluruh rangkaian operasi harus dibatalkan.
> > 
> > **Contoh Praktis:** Transfer uang antar rekening bank.
> > 
> > 1. `read(A)`: Baca saldo rekening A.
> >     
> > 2. `A := A - 50`: Kurangi saldo A sebesar 50 (di memori).
> >     
> > 3. `write(A)`: Simpan saldo baru A ke basis data.
> >     
> > 4. `read(B)`: Baca saldo rekening B.
> >     
> > 5. `B := B + 50`: Tambah saldo B sebesar 50 (di memori).
> >     
> > 6. `write(B)`: Simpan saldo baru B ke basis data.
> >     
> > 
> > Keenam langkah ini merupakan satu transaksi tunggal.
> > 
> > ### Masalah Utama dalam Eksekusi Transaksi
> > 
> > Ada dua tantangan utama yang harus ditangani oleh sistem basis data saat menjalankan transaksi:
> > 
> > 1. **Kegagalan (Failures):** Berbagai jenis kegagalan bisa terjadi, seperti kegagalan perangkat keras (misalnya, mati listrik) atau kegagalan perangkat lunak (misalnya, program crash). Sistem harus mampu memastikan basis data tetap dalam keadaan konsisten meskipun terjadi kegagalan di tengah-tengah eksekusi transaksi.
> >     
> > 2. **Eksekusi Konkuren (Concurrent Execution):** Dalam sistem nyata, banyak transaksi dari pengguna yang berbeda bisa berjalan secara bersamaan. Sistem harus mengatur eksekusi ini agar transaksi-transaksi tersebut tidak saling mengganggu dan menyebabkan data menjadi tidak konsisten.
> >     
> > 
> > ### Properti ACID
> > 
> > Untuk menjamin integritas data dalam menghadapi dua masalah di atas, sistem basis data harus memastikan setiap transaksi memenuhi empat properti yang dikenal sebagai **ACID**.
> > 
> > #### 1. Atomicity (Atomisitas)
> > 
> > Prinsip "semua atau tidak sama sekali" (_all or nothing_). Sebuah transaksi harus dieksekusi secara keseluruhan atau tidak sama sekali. Tidak boleh ada kondisi di mana hanya sebagian dari operasi transaksi yang berhasil diterapkan ke basis data.
> > 
> > - **Analogi:** Dalam contoh transfer uang, jika sistem gagal setelah `write(A)` (langkah 3) tetapi sebelum `write(B)` (langkah 6), maka uang sebesar $50 akan "hilang". Atomicity memastikan bahwa jika transaksi tidak selesai, maka perubahan pada rekening A akan dibatalkan (_rollback_), seolah-olah transaksi tidak pernah terjadi.
> >     
> > 
> > #### 2. Consistency (Konsistensi)
> > 
> > Eksekusi sebuah transaksi secara terisolasi (tanpa gangguan dari transaksi lain) harus menjaga konsistensi basis data. Artinya, transaksi akan membawa basis data dari satu keadaan konsisten ke keadaan konsisten lainnya.
> > 
> > - **Analogi:** Misalkan ada aturan bahwa total saldo dari rekening A dan B harus selalu tetap. Sebelum transaksi transfer, `A + B = C`. Setelah transaksi selesai, `(A-50) + (B+50)` harus tetap sama dengan `C`. Selama transaksi berjalan, totalnya mungkin sementara tidak konsisten (misalnya setelah uang ditarik dari A tetapi belum masuk ke B), tetapi setelah transaksi selesai, konsistensi harus pulih. Konsistensi juga mencakup aturan integritas lain seperti _primary key_ dan _foreign key_.
> >     
> > 
> > #### 3. Isolation (Isolasi)
> > 
> > Meskipun beberapa transaksi dapat berjalan secara konkuren, setiap transaksi harus seolah-olah berjalan sendiri tanpa menyadari adanya transaksi lain. Hasil antara dari sebuah transaksi tidak boleh terlihat oleh transaksi lain yang berjalan bersamaan.
> > 
> > - **Analogi:** Jika transaksi T1 (transfer $50 dari A ke B) sedang berjalan, dan pada saat yang sama transaksi T2 (menghitung total saldo A dan B) dieksekusi, T2 tidak boleh diizinkan membaca data di antara langkah 3 dan 6 dari T1. Jika T2 membaca pada saat itu, ia akan mendapatkan total saldo yang salah (berkurang $50). Isolasi memastikan T2 akan melihat keadaan data seolah-olah T1 sudah selesai sepenuhnya atau belum dimulai sama sekali.
> >     
> > 
> > #### 4. Durability (Daya Tahan)
> > 
> > Setelah sebuah transaksi berhasil diselesaikan (_commit_), perubahan yang dibuatnya pada basis data harus bersifat permanen dan bertahan. Perubahan tersebut tidak boleh hilang bahkan jika terjadi kegagalan sistem (misalnya, mati listrik atau sistem crash) setelahnya.
> > 
> > - **Analogi:** Setelah bank memberitahu Anda bahwa transfer berhasil, Anda harus yakin bahwa uang tersebut benar-benar sudah berpindah. Durability menjamin bahwa perubahan saldo A dan B yang sudah di-_commit_ akan tetap tersimpan di disk dan tidak akan hilang.
> >     

> [!cornell] #### Summary
> 
>  Sebuah transaksi adalah unit kerja logis yang terdiri dari serangkaian operasi, yang harus mematuhi properti ACID untuk menjamin integritas data. _**Atomicity**_ memastikan operasi dieksekusi sepenuhnya atau tidak sama sekali. _**Consistency**_ menjaga basis data tetap valid sesuai aturan yang ditetapkan. _**Isolation**_ membuat transaksi konkuren seolah-olah berjalan secara serial. Dan _**Durability**_ menjamin bahwa hasil transaksi yang berhasil bersifat permanen, bahkan jika terjadi kegagalan sistem.

> [!ad-libitum]- Additional Information
> 
> #### Bagaimana ACID Diterapkan Secara Teknis?
> 
> - **Atomicity & Durability:** Biasanya diimplementasikan menggunakan mekanisme _logging_ dan _recovery_. Sistem basis data mencatat semua perubahan dalam sebuah file log (misalnya, _Write-Ahead Log_ atau WAL) sebelum perubahan tersebut ditulis ke disk. Jika terjadi kegagalan, sistem dapat menggunakan log ini untuk membatalkan transaksi yang belum selesai (_undo_ untuk Atomicity) atau menerapkan kembali perubahan dari transaksi yang sudah _commit_ tetapi belum tersimpan permanen (_redo_ untuk Durability).
>     
> - **Isolation:** Diimplementasikan melalui mekanisme _concurrency control_, yang paling umum adalah _locking_. Sebuah transaksi akan "mengunci" data yang sedang diaksesnya untuk mencegah transaksi lain memodifikasinya secara bersamaan. Protokol penguncian yang canggih (seperti _Two-Phase Locking_) digunakan untuk memastikan serializability.
>     
> - **Consistency:** Sebagian besar ditegakkan melalui _integrity constraints_ (seperti `NOT NULL`, `UNIQUE`, `FOREIGN KEY`, `CHECK`) yang didefinisikan dalam skema basis data. Sistem basis data akan memeriksa batasan ini setiap kali data dimodifikasi untuk memastikan transaksi tidak melanggar aturan bisnis yang telah ditetapkan.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba pikirkan contoh transaksi lain dalam kehidupan sehari-hari (misalnya, pemesanan tiket bioskop, checkout keranjang belanja online) dan analisis bagaimana setiap properti ACID berlaku pada contoh tersebut. Apa yang akan terjadi jika salah satu properti gagal?
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku:** "Database System Concepts" oleh Silberschatz, Korth, and Sudarshan (buku sumber materi ini). Bab 17 memberikan penjelasan yang sangat mendalam.
>     
> - **Artikel:** Cari artikel tentang "Write-Ahead Logging (WAL)" dan "Two-Phase Locking (2PL)" untuk memahami implementasi teknis dari properti ACID.
>