---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Fondasi Recovery: Klasifikasi Kegagalan & Struktur Penyimpanan
> 
> > ## Questions/Cues
> >
> > - Apa tujuan utama **Recovery System**?
> >     
> > - Apa saja **3 jenis kegagalan** (failure)?
> >     
> > - Apa perbedaan **Transaction** vs **System** vs **Disk Failure**?
> >     
> > - Apa **3 level hirarki penyimpanan**?
> >     
> > - Apa itu **Volatile** vs **Nonvolatile**?
> >     
> > - Apa itu **Stable Storage**?
> >     
> > - Bagaimana cara **mengaproksimasi** Stable Storage?
> >     
> > - Bagaimana alur **akses data** (Disk vs Buffer)?
> >     
> > - Mengapa **buffer** jadi inti masalah recovery?
> >     
> >
> > ## Reference Points
> >
> > - Slides "12 - Recovery System - 1.pdf" (Slide 5-11)
> >     
> 
> > ### Apa itu Recovery System?
> >
> > **Recovery System** adalah sebuah mekanisme dalam DBMS (Database Management System) yang bertugas untuk memastikan database kembali ke _state_ (kondisi) terakhir yang konsisten setelah terjadinya kegagalan.
> >
> > Tujuan utamanya adalah untuk menjamin dua properti ACID:
> >
> > 1. **Atomicity**: Transaksi harus dieksekusi secara utuh (semua operasinya) atau tidak sama sekali. Jika transaksi gagal di tengah jalan, efeknya harus dibatalkan total (seperti tidak pernah terjadi).
> >     
> > 2. **Durability**: Jika sebuah transaksi telah berhasil di-commit (diselesaikan), perubahannya harus bersifat permanen dan tidak boleh hilang, bahkan jika terjadi kegagalan sistem setelahnya.
> >     
> >
> > Algoritma recovery memiliki dua bagian:
> >
> > - **Tindakan selama operasi normal**: Mencatat informasi yang cukup (misalnya dalam sebuah _log_) untuk memungkinkan pemulihan nanti.
> >     
> > - **Tindakan setelah kegagalan**: Menggunakan informasi yang dicatat tadi untuk mengembalikan database ke state yang konsisten.
> >     
> >
> > ### Tiga Jenis Klasifikasi Kegagalan
> >
> > Kegagalan yang dapat terjadi pada sistem database dikategorikan menjadi tiga:
> >
> > 1. **Transaction Failure (Kegagalan Transaksi)**
> > 	- Transaksi gagal menyelesaikan eksekusinya.
> > 	- **Logical Errors**: Kesalahan internal dalam logika transaksi. Contoh: data yang dicari tidak ditemukan, pembagian dengan nol, input tidak valid.
> > 	- **System Errors**: Sistem database menghentikan transaksi secara eksternal. Contoh: sistem mendeteksi *deadlock* dan memilih satu transaksi untuk "dikorbankan" (di-abort).
> >
> > 2. **System Crash (Kegagalan Sistem)**
> >     
> > 	- Perangkat keras (CPU, RAM) atau perangkat lunak (OS, bug di DBMS) mengalami kegagalan, menyebabkan sistem berhenti beroperasi.
> > 	- **Asumsi "Fail-Stop"**: Kita mengasumsikan bahwa isi dari *non-volatile storage* (disk) **aman** dan tidak korup akibat *crash* ini.
> > 	- Konsekuensi: Isi dari *volatile storage* (main memory/RAM) **hilang** seluruhnya.
> >
> >
> > 3. **Disk Failure (Kegagalan Disk)**
> >     
> > 	- Kerusakan pada media penyimpanan disk (misal: *head crash*, kerusakan permukaan).
> > 	- Menyebabkan sebagian atau seluruh isi disk hilang atau korup.
> > 	- **Asumsi "Detectable"**: Kita mengasumsikan kegagalan ini dapat dideteksi. Sistem modern menggunakan *checksums* untuk memverifikasi integritas data saat dibaca.
> > 
> >
> > ### Hirarki Struktur Penyimpanan
> >
> > Untuk memahami recovery, kita harus paham di mana data disimpan. Ada tiga level penyimpanan berdasarkan kecepatan dan ketahanannya:
> >
> > 1. **Volatile Storage (Penyimpanan Volatil)**
> >     
> > 	- Data akan **hilang** jika terjadi kegagalan sistem (misal: listrik mati).
> > 	- Sangat cepat (biasanya diakses dalam nanodetik).
> > 	- Contoh: **Main Memory (RAM)**, Cache CPU.
> > 
> >
> > 2. **Nonvolatile Storage (Penyimpanan Non-Volatil)**
> >     
> > 	- Data akan **bertahan** (survive) meskipun terjadi kegagalan sistem.
> > 	- Lebih lambat daripada volatile storage (diakses dalam milidetik atau mikrodetik).
> > 	- Contoh: **Hard Disk Drive (HDD)**, **Solid-State Drive (SSD)**, Flash memory.
> > 	- *Penting*: Meskipun datanya *bertahan* dari *system crash*, media ini *sendiri* bisa gagal (menjadi *disk failure*).
> >
> >
> > 3. **Stable Storage (Penyimpanan Stabil)**
> > 
> >   - Ini adalah bentuk penyimpanan **teoritis** atau "mitos" yang diasumsikan **tidak akan pernah gagal** atau kehilangan data dalam kondisi apa pun.
> >   - Di dunia nyata, tidak ada penyimpanan yang 100% stabil.
> >   - Kita hanya bisa **mengaproksimasi** (mendekati) stable storage, biasanya dengan **redundansi**.
> >
> >
> > ### Aproksimasi Stable Storage
> >
> > Karena stable storage ideal tidak ada, kita membuatnya dengan cara menyimpan beberapa salinan (copies) data di media _nonvolatile_ yang terpisah secara fisik.
> >
> > - **Implementasi**: Menyimpan data yang sama di beberapa disk yang berbeda (bahkan bisa di lokasi geografis yang berbeda untuk _disaster recovery_).
> >     
> > - **Tantangan**: Proses penulisan ke disk itu sendiri bisa gagal (berhasil, gagal sebagian, atau gagal total).
> >     
> > - **Prosedur Tulis yang Aman**:
> >     
> > 	1. Tulis informasi ke blok fisik pertama.
> > 			
> > 	2. Setelah dipastikan berhasil, tulis informasi yang **sama** ke blok fisik kedua.
> > 			
> > 	3. Operasi penulisan (output) baru dianggap **selesai** (sukses) setelah penulisan kedua berhasil.
> >         
> > - **Recovery**: Jika saat pengecekan ditemukan salah satu copy rusak (via checksum), data bisa dipulihkan dari copy yang masih bagus.
> >     
> >
> > ### Alur Akses Data (Disk vs Buffer)
> >
> > Ini adalah konsep kunci **mengapa** recovery sangat penting. Modifikasi data tidak langsung terjadi di disk.
> >
> > 1. **Disk (Physical Blocks)**: Tempat data disimpan secara permanen (nonvolatile).
> >     
> > 2. **Memory (Buffer)**: Area di RAM (volatile) yang berfungsi sebagai "meja kerja" atau cache. Blok data dari disk disalin ke sini sebelum bisa dibaca atau dimodifikasi.
> >     
> > 3. **Working Area (Per Transaksi)**: Area kecil di RAM untuk menyimpan data yang sedang diolah oleh satu transaksi.
> >     
> >
> > **Alur Proses:**
> >
> > 1. Transaksi ingin membaca data `X` (`Read(X)`).
> >     
> > 2. Sistem mengecek apakah blok `X` ada di **Buffer** (memory).
> >     
> > 3. Jika tidak ada, sistem melakukan `Input(X)`: Menyalin blok `X` dari **Disk** ke **Buffer**.
> >     
> > 4. Data `X` disalin dari **Buffer** ke **Working Area** transaksi.
> >     
> > 5. Transaksi memodifikasi `X` di **Working Area**-nya, lalu menuliskannya kembali ke `X` di **Buffer** (`Write(X)`).
> >     
> >
> > **Masalah Inti Recovery:**
> > 
> > - Pada titik ini, data X yang baru sudah ada di Buffer (di RAM/volatile), tapi BELUM tentu ada di Disk (nonvolatile).
> >
> > - Jika terjadi **System Crash** _sekarang_, semua perubahan pada `X` yang ada di Buffer akan **HILANG**. Ini melanggar prinsip **Durability**.
> >
> > - Di sisi lain, _output_ (penulisan dari buffer ke disk) bisa terjadi kapan saja. Jika `Output(X)` terjadi _sebelum_ transaksi commit, dan transaksi itu kemudian _gagal_ (abort), maka data `X` yang "kotor" sudah terlanjur ada di disk. Ini melanggar prinsip **Atomicity**.

> [!cornell] #### Summary
> 
> **Sistem recovery database dirancang untuk menjamin Atomicity dan Durability dalam menghadapi berbagai jenis kegagalan (transaksi, sistem, atau disk). Fondasinya terletak pada pengelolaan hirarki penyimpanan—mulai dari** _**volatile storage**_ **(RAM) yang cepat tapi rentan,** _**nonvolatile storage**_ **(Disk) yang bertahan dari crash, hingga konsep ideal** _**stable storage**_ **(yang diaproksimasi dengan redundansi). Masalah utama recovery muncul karena modifikasi data terjadi di** _**buffer**_ **(volatile) dan mungkin belum ditulis ke** _**disk**_ **(nonvolatile) saat kegagalan terjadi, sehingga memerlukan mekanisme untuk memulihkan data ke state yang konsisten.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: RAID sebagai Aproksimasi Stable Storage
> 
> Konsep "menyimpan beberapa salinan di disk terpisah" (slide 8) adalah implementasi praktis yang dikenal sebagai **RAID (Redundant Array of Independent Disks)**.
> 
> - **RAID 1 (Mirroring)**: Ini adalah bentuk paling murni dari aproksimasi di slide. Setiap data yang ditulis ke Disk 1 akan disalin persis (di-mirror) ke Disk 2.
>     
>     - **Kelebihan**: Jika satu disk gagal total, data utuh ada di disk lainnya. Kecepatan baca bisa meningkat.
>         
>     - **Kekurangan**: Kapasitas penyimpanan terbuang 50% (misal: 2 buah disk 1TB hanya memberikan kapasitas 1TB).
>         
> - **RAID 5 (Parity)**: Menggunakan "parity" (data matematis yang bisa merekonstruksi data hilang) yang disebar ke semua disk. Ini lebih hemat kapasitas daripada RAID 1 dan bisa mentolerir kegagalan 1 disk.
>     
> - **RAID 6 (Double Parity)**: Mirip RAID 5 tapi dengan dua blok parity. Ini bisa mentolerir kegagalan 2 disk secara bersamaan, memberikan redundansi yang lebih tinggi lagi.
>     
> 
> Dalam konteks database enterprise, penggunaan RAID (terutama RAID 1, 10, 5, atau 6) adalah standar untuk mengimplementasikan "nonvolatile storage" yang andal, yang merupakan langkah pertama menuju "stable storage".
> 
> #### Pendalaman Teknis: Checksums dan Silent Data Corruption
> 
> Slide 5 menyebutkan bahwa _Disk Failure_ diasumsikan "detectable". Salah satu mekanisme deteksi terpenting adalah **Checksum**.
> 
> - **Bagaimana cara kerjanya?**: Saat database menulis sebuah blok data (misal: 8KB) ke disk, ia juga menghitung sebuah "checksum" (seperti sidik jari digital, misal: menggunakan algoritma CRC32) dari data tersebut. Nilai checksum ini disimpan bersama data di disk.
>     
> - **Saat Membaca**: Ketika blok data itu dibaca kembali, sistem akan:
>     
>     1. Membaca blok data 8KB tersebut.
>         
>     2. Menghitung ulang checksum dari data yang baru dibaca menggunakan algoritma yang sama.
>         
>     3. Membandingkan checksum yang baru dihitung dengan checksum yang tersimpan di disk.
>         
> - **Deteksi Kegagalan**: Jika kedua checksum **berbeda**, itu berarti data telah mengalami **korupsi** saat berada di disk (disebut _silent data corruption_). DBMS akan tahu bahwa blok ini rusak dan harus memulihkannya (misal: mengambil dari salinan RAID).
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: Silberschatz, Korth, Sudarshan, "Database System Concepts", 7th Ed, Chapter 19.1 - 19.3.
>     
> - **Artikel**: "RAID Levels Explained" (banyak sumber online, misal: dari Wikipedia atau situs storage seperti SNIA).
>     
> - **Konsep**: "Volatile vs. Non-Volatile Memory" dan "Persistent Memory (PMEM)" (sebagai teknologi baru yang menjembatani keduanya).
>