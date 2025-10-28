---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Arsitektur Server Mendalam: Transaction vs. Data Server
> 
> > ## Questions/Cues
> >
> > - Apa **2 jenis server** utama?
> >     
> > - Apa itu **Transaction Server**? (Query Server)
> >     
> > - Bagaimana alur request di Transaction Server?
> >     
> > - Apa itu **RPC** (Remote Procedure Call)?
> >     
> > - Apa fungsi **Server Process**? (Multithreaded?)
> >     
> > - Apa fungsi **Shared Memory**? (Buffer Pool, Log Buffer, Lock Table)
> >     
> > - Apa fungsi **Log Writer Process**?
> >     
> > - Apa fungsi **Database Writer (DB Writer)**?
> >     
> > - Apa fungsi **Checkpoint Process**?
> >     
> > - Apa fungsi **Lock Manager** & **Process Monitor**?
> >     
> > - Apa itu **Data Server**? Kapan digunakan?
> >     
> > - Apa beda **Page-Shipping** vs **Item-Shipping**?
> >     
> > - Apa itu **Data Caching** & **Lock Caching**?
> >     
> >
> > ## Reference Points
> >
> > - Slides "13 - Database System Architectures.pdf" (Slide 8-21)
> >     
> 
> > ### 1. Transaction Servers (Query Servers)
> >
> > Ini adalah jenis arsitektur server yang **paling umum** digunakan, terutama oleh sistem database relasional (SQL Server, PostgreSQL, dll).
> >
> > - **Nama Lain**: Query Server, SQL Server.
> >     
> > - **Alur Kerja**:
> >     
> >     1. Klien mengirim _request_ (permintaan) dalam bentuk SQL.
> >         
> >     2. _Request_ dikirim ke server melalui **Remote Procedure Call (RPC)**. RPC adalah mekanisme yang memungkinkan klien memanggil sebuah fungsi yang sebetulnya dieksekusi di server.
> >         
> >     3. **Server mengeksekusi** seluruh transaksi (query, update, dll).
> >         
> >     4. Server mengirim **hasilnya** (misal: tabel data atau pesan sukses) kembali ke klien.
> >         
> >
> > ### Arsitektur Proses Transaction Server (Slide 10)
> >
> > Server modern tidak berjalan sebagai satu program besar, tapi sebagai kumpulan proses/thread yang bekerja sama menggunakan **Shared Memory**.
> >
> > - **User Process & Koneksi (ODBC/JDBC)**: Klien terhubung ke server menggunakan driver standar seperti **ODBC** (untuk C) atau **JDBC** (untuk Java).
> >     
> >
> > - **Server Process (Server Threads)**:
> >     
> > 	- Ada satu (atau lebih) *server process* untuk setiap klien yang terhubung.
> > 	- Tugasnya: Menerima query SQL dari klien, mengeksekusinya, dan mengirim hasil kembali.
> > 	- Biasanya *multithreaded*, artinya satu proses bisa menangani beberapa query klien secara bersamaan.
> >
> >
> > - **Shared Memory (RAM)**: Area memori utama yang digunakan bersama oleh semua proses server.
> >     
> > 	- **Buffer Pool**: Cache utama. Menyimpan salinan blok data dari disk. (Mirip buffer di *Recovery System*).
> > 	- **Log Buffer**: Cache untuk log record. *Server process* menulis log ke sini (cepat), sebelum dipindahkan ke disk.
> > 	- **Lock Table**: Tabel yang melacak semua *lock* (kunci) yang sedang dipegang oleh transaksi (untuk *Concurrency Control*).
> > 	- **Query Plan Cache**: Menyimpan *query plan* yang sudah dioptimasi agar bisa dipakai lagi.
> > 
> >
> > - **Proses Latar Belakang (Background Processes)**:
> >     
> > 	- **Log Writer Process**: Satu-satunya proses yang menulis dari **Log Buffer** (RAM) ke **Log Disks** (Stable Storage). Ini memastikan WAL.
> > 	- **Database Writer (DB Writer)**: Proses yang secara periodik menulis blok data "kotor" (dimodifikasi) dari **Buffer Pool** ke **Data Disks**.
> > 	- **Checkpoint Process**: Proses yang memicu *checkpoint* (memaksa Log Writer & DB Writer bekerja) untuk mempercepat recovery.
> > 	- **Lock Manager Process**: Proses yang mengelola *Lock Table*, memberi/melepas *lock*, dan mendeteksi *deadlock*.
> > 	- **Process Monitor**: "Pengawas" yang memonitor proses lain. Jika ada *server process* yang *crash*, ia akan membersihkan, membatalkan transaksinya, dan me-restart-nya.
> > 
> >
> > ### 2. Data Servers
> >
> > Ini adalah arsitektur alternatif, sering digunakan oleh **Object-Oriented Database Systems (OODBMS)**, terutama di LAN berkecepatan tinggi.
> >
> > - **Asumsi**: Klien _cukup pintar/kuat_ untuk melakukan pemrosesan data sendiri.
> >     
> >
> > - **Alur Kerja**:
> >     
> > 	1.  Klien meminta data (misal: "beri saya objek X").
> > 	2.  Server **mengirim data mentah** (seluruh *page* atau *item* data) ke klien.
> > 	3.  **Klien mengeksekusi** logika/transaksi pada data tersebut di *memory*-nya sendiri.
> > 	4.  Klien mengirim data yang sudah diubah kembali ke server.
> > 
> >
> > - **Isu (Tantangan) di Data Server**:
> >     
> > 	- **Page-Shipping vs Item-Shipping**: Lebih efisien mana, mengirim seluruh *page* (blok) atau hanya *item* yang diminta? Mengirim *page* = *prefetching*, tapi boros jaringan.
> > 	- **Data Caching**: Klien bisa menyimpan data di cache-nya (bahkan antar transaksi). Tapi bagaimana jika data itu diubah oleh klien lain? (Masalah *cache coherency*).
> > 	- **Locking**: Minta *lock* ke server sangat lambat (karena latensi jaringan).
> > 	- **Lock Caching**: Klien "memegang" *lock* bahkan setelah transaksi selesai, untuk dipakai lagi. Server bisa "memanggil kembali" (*callback*) *lock* itu jika ada klien lain yang butuh.
> > 

> [!cornell] #### Summary
> 
> **Arsitektur server terbagi dua: Transaction Server (paling umum, untuk SQL) bekerja dengan menerima** _**query**_ **(SQL), memprosesnya di server, dan mengirim** _**hasil**_ **kembali ke klien. Arsitektur ini menggunakan banyak proses (Server, Log Writer, DB Writer) yang berbagi memori (Buffer Pool, Log Buffer, Lock Table). Sebaliknya, Data Server (umum di OODBMS) bekerja dengan mengirim** _**data mentah**_ **(page/item) ke klien yang "pintar", di mana pemrosesan terjadi. Model Data Server ini menimbulkan tantangan besar dalam hal** _**caching**_ **(data & lock) dan** _**cache coherency**_**.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Lifecycle Kueri Sederhana (Transaction Server)
> 
> 1. **User Process**: Anda (klien) menjalankan `UPDATE Karyawan SET gaji = 5000 WHERE id = 101;`
>     
> 2. **Koneksi (JDBC)**: Driver JDBC membungkus SQL Anda ke format RPC dan mengirimkannya ke `Server Process` yang ditugaskan untuk Anda.
>     
> 3. Server Process:
>     
>     a. Menerima RPC.
>     
>     b. Mem-parsing query dan mengecek Query Plan Cache.
>     
>     c. Meminta Exclusive Lock (X-lock) untuk id = 101 ke Lock Manager.
>     
>     d. Lock Manager mengecek Lock Table. Jika tersedia, lock diberikan.
>     
>     e. Server Process meminta data untuk id = 101 dari Buffer Pool.
>     
>     f. Buffer Pool mengecek. Jika tidak ada, ia akan memerintahkan I/O untuk mengambil blok data dari Data Disks.
>     
>     g. Blok data disalin ke Buffer Pool.
>     
>     h. Server Process memodifikasi data (gaji=5000) di dalam Buffer Pool. Blok ini ditandai "kotor" (dirty).
>     
>     i. Server Process membuat log record (<T1, Karyawan.101, 4000, 5000>) dan menuliskannya ke Log Buffer.
>     
> 4. **Latar Belakang (Asinkron)**:
>     
>     - **Log Writer** melihat ada data baru di **Log Buffer**, lalu menuliskannya ke **Log Disks**.
>         
>     - **DB Writer** (mungkin nanti) melihat blok "kotor" di **Buffer Pool** dan menuliskannya ke **Data Disks**.
>         
> 5. **User Process**: Jika Anda mengetik `COMMIT;`
>     
> 6. Server Process:
>     
>     a. Menulis `<T1 commit>` ke Log Buffer.
>     
>     b. Melakukan Log Force: Memerintahkan Log Writer untuk segera menulis semua log T1 (termasuk record commit) ke Log Disks.
>     
>     c. Setelah Log Writer selesai, Server Process mengirim pesan "Commit Sukses" ke klien.
>     
>     d. Meminta Lock Manager untuk melepaskan lock T1.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: Silberschatz, Korth, Sudarshan, "Database System Concepts", 7th Ed, Chapter 20.2.
>     
> - **Konsep**: "PostgreSQL Process Architecture" (Contoh nyata dari diagram di slide 10).
>