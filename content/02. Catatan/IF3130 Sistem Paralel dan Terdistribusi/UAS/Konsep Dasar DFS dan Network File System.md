---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Fondasi Distributed File System & Network File System (NFS)
> 
> > ## Questions/Cues
> >
> > - **Abstraksi File System (6 Modul)**
> >     
> > - **Operasi File System Linux (System Calls)**
> >     
> > - **Tantangan Utama DFS**
> >     
> > - **Arsitektur Client-Server NFS**
> >     
> > - **NFS Server Operations (Detail)**
> >     
> > - **Statelessness pada NFS**
> >     
> > - **Mekanisme Mounting (Hard vs Soft)**
> >     
> > - **Automounter (Autofs)**
> >     
> > - **Strategi Caching (Client vs Server)**
> >     
> > - **Masalah Konsistensi Cache**
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3130-15-Distributed Filesystem-2022.pdf
> >     
> > - Fokus: Protokol, Operasi, dan Arsitektur
> >     
> 
> > ### 1. Abstraksi & Karakteristik File System
> >
> > Sebelum masuk ke sistem terdistribusi, kita perlu memahami bagaimana **File System** dibangun secara lokal. Implementasi umumnya menggunakan model berlapis (layered model) yang terdiri dari modul-modul berikut:
> >
> > 1. **Modul Direktori:** Bertanggung jawab memetakan nama file (teks) ke _file ID_ unik (seperti Inode pada Unix).
> >     
> > 2. **Modul File:** Memetakan _file ID_ ke data file fisik tertentu.
> >     
> > 3. **Modul Access Control:** Memeriksa izin (permission) user sebelum operasi dilakukan (Read/Write/Exec).
> >     
> > 4. **Modul File Access:** Menangani operasi baca/tulis data atau atribut file.
> >     
> > 5. **Modul Blok:** Mengelola akses dan alokasi blok-blok penyimpanan di disk.
> >     
> > 6. **Modul Device:** Menangani operasi I/O disk fisik dan _buffering_.
> >     
> >
> > **Atribut File:**
> > 
> > File system tidak hanya menyimpan data, tapi juga metadata vital: Panjang file, Timestamp (Creation, Read, Write, Attribute change), Reference count, Owner, File type, dan Access Control List (ACL).
> >
> > ### 2. Operasi File System Standar (Linux)
> >
> > Sistem operasi menyediakan antarmuka (System Calls) untuk manipulasi file. Dalam DFS, operasi ini harus ditiru atau diteruskan ke jaringan.
> >
> > - `open(name, mode)`: Membuka file, mengembalikan _file descriptor_.
> >     
> > - `create(name, mode)`: Membuat file baru.
> >     
> > - `read(fd, buffer, n)` & `write(fd, buffer, n)`: Transfer data dari/ke buffer memori.
> >     
> > - `lseek(fd, offset, whence)`: Memindahkan pointer baca/tulis (random access).
> >     
> > - `close(fd)`: Menutup file & melepas resource.
> >     
> > - `unlink(name)`: Menghapus nama file dari direktori (delete).
> >     
> > - `link(name1, name2)`: Membuat nama alias (hard link).
> >     
> > - `stat(name, buffer)`: Mengambil atribut file.
> >     
> >
> > ### 3. Distributed File System (DFS): Motivasi & Tantangan
> >
> > **Mengapa DFS?**
> >
> > - **Sharing:** Memungkinkan kolaborasi data antar user tanpa duplikasi manual.
> >     
> > - **Mobility:** User tidak terikat pada satu mesin fisik; lingkungan kerja bisa berpindah.
> >     
> > - **Scalability:** Kemampuan menangani pertumbuhan data dan beban akses yang besar.
> >     
> >
> > **Tantangan Desain:**
> >
> > - **Performance:** Akses jaringan jauh lebih lambat dari disk lokal. Bagaimana membuatnya terasa cepat?
> >     
> > - **Availability:** Server bisa mati. Bagaimana agar klien tetap bisa bekerja?
> >     
> > - **Consistency:** Jika dua orang mengedit file sama, siapa yang menang?
> >     
> > - **Transparency:** User tidak boleh sadar bahwa file ada di seberang lautan (Access, Location, Mobility, Scaling Transparency).
> >     
> >
> > ### 4. Network File System (NFS) - Arsitektur
> >
> > NFS (Sun Microsystems) adalah standar industri untuk DFS berbasis UNIX.
> >
> > **Komponen Arsitektur:**
> >
> > - **Virtual File System (VFS):** Layer abstraksi di kernel klien. Ini memisahkan operasi file generik dari implementasi spesifik.
> >     
> > 	- Jika file lokal $\rightarrow$ diteruskan ke _UNIX File System_.
> > 			
> > 	- Jika file remote $\rightarrow$ diteruskan ke _NFS Client_.
> >         
> > - **NFS Client:** Stub yang membungkus operasi file menjadi request **RPC (Remote Procedure Call)** via jaringan.
> >     
> > - **NFS Server:** Menerima request RPC, melakukan operasi fisik di disk server melalui VFS lokal server, dan mengembalikan hasil.
> >     
> >
> > Protokol & Operasi RPC NFS:
> > 
> > Protokol NFS mendefinisikan prosedur RPC yang mirip dengan system call lokal, namun disesuaikan untuk jaringan:
> >
> > - `lookup(dirfh, name)`: Mencari file dalam direktori, mengembalikan _File Handle_ (fh).
> >     
> > - `create`, `remove`, `rename`: Manipulasi file/direktori.
> >     
> > - `read(fh, offset, count)`: Membaca data. Perhatikan parameter `offset` (stateless).
> >     
> > - `write(fh, offset, count, data)`: Menulis data.
> >     
> > - `getattr`, `setattr`: Manipulasi metadata.
> >     
> > - `symlink`, `readlink`: Dukungan untuk symbolic link.
> >     
> > - `mkdir`, `rmdir`, `readdir`: Operasi direktori. `readdir` menggunakan _cookie_ untuk enumerasi stateless.
> >     
> >
> > ### 5. Stateless Server & Konsekuensinya
> >
> > Salah satu filosofi desain terpenting NFS adalah **Stateless Server**.
> >
> > - **Definisi:** Server tidak menyimpan informasi tentang keadaan klien antara request satu dengan lainnya. Server tidak tahu file apa yang sedang "terbuka" oleh klien.
> >     
> > - **Implikasi:** Setiap request RPC harus **self-contained** (lengkap).
> >     
> >     - Request `read` harus menyertakan `offset` absolut, karena server tidak menyimpan "read pointer".
> >         
> >     - Request harus menyertakan kredensial autentikasi setiap saat.
> >         
> > - **Keuntungan (Fault Tolerance):** Jika server crash dan restart, tidak ada state yang hilang. Klien cukup mengirim ulang request (retry) dan server akan memprosesnya seolah tidak terjadi apa-apa. Tidak perlu prosedur _recovery_ yang rumit.
> >     
> >
> > ### 6. Mekanisme Mounting & Automounter
> >
> > Agar file remote terlihat, ia harus di-**Mount** ke pohon direktori lokal.
> >
> > - **Mount Service:** Proses user-level di server yang mengecek `/etc/exports` untuk mengizinkan akses.
> >     
> > - **Hard Mount:** Jika server mati, aplikasi klien yang mengakses file akan **terblokir (hang)** selamanya sampai server hidup. Ini menjamin integritas data (tidak ada error "file not found" palsu).
> >     
> > - **Soft Mount:** Jika server mati, setelah beberapa kali _retry_, klien menyerah (timeout) dan mengembalikan error ke aplikasi. Berisiko data korup tapi aplikasi tidak hang.
> >     
> > - **Automounter (autofs):** Solusi cerdas di mana direktori remote hanya di-mount **saat diakses** dan di-unmount otomatis setelah periode tidak aktif. Ini meningkatkan efisiensi dan ketahanan terhadap server yang down sementara.
> >     
> >
> > ### 7. Performa & Caching (Kunci Kecepatan NFS)
> >
> > Tanpa caching, NFS akan sangat lambat karena setiap akses byte butuh RPC.
> >
> > **A. Client Caching:**
> >
> > - **Read-ahead:** Klien meminta blok data berikutnya sebelum aplikasi memintanya, mengantisipasi pembacaan sekuensial.
> >     
> > - **Delayed-write:** Saat aplikasi menulis, data disimpan di buffer memori klien dulu. Data baru dikirim ke server secara _batch_ atau saat file ditutup (`close`).
> >     
> > - **Masalah Konsistensi:** Klien A menulis di cache, Klien B membaca file yang sama dari server (stale data).
> >     
> > - **Validasi Cache:** Klien mengecek validitas data cache dengan membandingkan timestamp modifikasi (`Tm`) file di cache (`Tc`) dengan di server (`Ts`).
> >     
> > 	- Valid jika: $(T_{now} - T_{checked} < interval) \lor (Tm_{client} == Tm_{server})$.
> > 			
> >
> > **B. Server Caching:**
> >
> > - Server menggunakan RAM untuk buffer data sebelum ke disk.
> >     
> > - **Risiko:** Jika server crash sebelum _write_ di RAM turun ke disk, data hilang padahal klien mengira sukses.
> >     
> > - **Solusi:** NFS v2 mewajibkan _synchronous write_ (tulis ke disk dulu baru balas OK), yang lambat. NFS v3 memperkenalkan _commit operation_ untuk performa lebih baik.
> >     

> [!cornell] #### Summary
> 
> NFS menyediakan abstraksi Distributed File System yang transparan melalui mekanisme Virtual File System (VFS) dan komunikasi RPC. Desain utamanya berfokus pada Stateless Server untuk menyederhanakan penanganan kegagalan (crash recovery), di mana setiap operasi bersifat mandiri (idempotent). Namun, pendekatan ini menuntut mekanisme Caching yang agresif di sisi klien (untuk performa) dan manajemen konsistensi yang hati-hati (validasi timestamp) serta opsi Mounting (Hard/Soft/Auto) untuk menyeimbangkan antara reliabilitas dan responsivitas aplikasi.

> [!ad-libitum]- Additional Information (Deep Dive Technical)
> 
> #### File Handle (fh) secara Detail
> 
> Dalam operasi `open()` lokal, kita dapat _File Descriptor_ (integer kecil). Dalam NFS, `lookup()` mengembalikan **File Handle**. File Handle adalah struktur data _opaque_ (biasanya 32 atau 64 byte) yang berisi:
> 
> - **Filesystem ID:** Identifikasi partisi disk di server.
>     
> - **Inode Number:** Identifikasi unik file dalam partisi tersebut.
>     
> - **Generation Number:** Angka acak yang berubah setiap kali inode digunakan ulang (untuk mendeteksi jika file lama dihapus dan file baru dibuat dengan inode yang sama).
>     
> 
> #### Idempotency dalam Konteks NFS
> 
> Operasi disebut _Idempotent_ jika dijalankan berulang kali hasilnya sama.
> 
> - `Read` di offset 0 selalu mengembalikan data awal (Aman).
>     
> - `Write` di offset 100 dengan data "ABC" selalu menulis "ABC" di posisi 100 (Aman).
>     
> - `Mkdir` "FolderA". Jika request pertama sukses tapi reply hilang, klien retry. Server melihat "FolderA" sudah ada dan mungkin return error "Already Exists". Ini **bukan** idempotent murni, tapi NFS Client menanganinya agar transparan.
>     
> - `Remove` file. Jika retry, server return "Not Found".
>     
> 
> #### Sumber & Referensi:
> 
> - **RFC 1813 (NFSv3) & RFC 7530 (NFSv4):** Dokumentasi standar protokol.
>     
> - **Man Pages:** `man 5 exports`, `man 8 mount`.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Jelaskan secara rinci mengapa desain "Stateless Server" pada NFS memudahkan Crash Recovery!</strong></summary>
> 
> Karena server tidak menyimpan status (seperti daftar file terbuka atau posisi pointer baca/tulis) dari klien, server tidak perlu melakukan prosedur pemulihan status yang rumit saat reboot. Setelah hidup kembali, server bisa langsung memproses request RPC apa pun dari klien seolah-olah tidak pernah mati, karena setiap request klien sudah membawa informasi lengkap (File Handle, Offset, Auth) yang dibutuhkan untuk mengeksekusi operasi tersebut.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Apa perbedaan dampak antara "Hard Mount" dan "Soft Mount" dari perspektif aplikasi pengguna saat server NFS down?</strong></summary>
> 
> Pada Hard Mount, aplikasi pengguna akan berhenti total (freeze/hang) dan tidak bisa di-interrupt sampai server kembali online; ini menjamin data tidak rusak tetapi membuat aplikasi tidak responsif. Pada Soft Mount, aplikasi akan menerima pesan kesalahan (I/O Error) setelah timeout; ini membuat aplikasi tetap responsif (bisa exit), tetapi berisiko menyebabkan korupsi data atau perilaku aplikasi yang tidak terduga karena kegagalan operasi file.
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Bagaimana mekanisme validasi cache sisi klien bekerja untuk menjaga konsistensi data di NFS?</strong></summary>
> 
> Klien NFS memvalidasi data di cache-nya dengan mengirim request getattr ke server untuk mengambil waktu modifikasi file (mtime). Klien membandingkan mtime server dengan mtime file yang ada di cache-nya. Jika sama, cache dianggap valid (fresh). Validasi ini biasanya dilakukan jika umur data di cache sudah melewati batas waktu tertentu (timeout) atau saat file dibuka.
> 
> </details>