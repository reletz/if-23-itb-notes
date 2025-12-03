---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic: Andrew File System (AFS) - Skalabilitas Melalui Caching
> 
> > ## Questions/Cues
> >
> > - **Filosofi Skalabilitas AFS**
> >     
> > - **Whole-File Caching (Detail)**
> >     
> > - **Arsitektur Venus vs Vice**
> >     
> > - **Distribusi Proses**
> >     
> > - **Namespace (Local vs Shared)**
> >     
> > - **System Call Interception**
> >     
> > - **Implementasi Open/Read/Write/Close**
> >     
> > - **Konsistensi: Callback Mechanism**
> >     
> > - **Session Semantics**
> >     
> > - **Vice Service Interface**
> >     
> >
> > ## Reference Points
> >
> > - Slides: IF3130-16-Andrew Filesystem-2022.pdf
> >     
> > - Fokus: Skalabilitas Masif & Caching Persisten
> >     
> 
> > ### 1. Filosofi Desain: Skalabilitas di Atas Segalanya
> >
> > AFS dikembangkan di Carnegie Mellon University dengan tujuan mendukung ribuan workstation. Berbeda dengan NFS yang sederhana, AFS mengoptimalkan **kinerja untuk beban kerja umum** (_common case_) guna mencapai skalabilitas.
> >
> > - **Prinsip Utama:** _"Make the common case fast."_ Kasus umum di lingkungan akademik/teknik adalah file dibaca berulang kali, diakses secara sekuensial, dan jarang ditulis bersamaan oleh banyak user.
> >     
> > - **Solusi:** Memindahkan beban kerja dari Server ke Klien. Server hanya bertindak sebagai _custodian_ (penjaga) data, sementara pemrosesan file terjadi di klien.
> >     
> >
> > **Whole-File Caching (Caching Satu File Penuh):**
> >
> > - Saat klien mengakses file, AFS tidak mengambil blok demi blok, melainkan mendownload **SELURUH** file tersebut dari server ke **disk lokal** klien.
> >     
> > - **Cache Permanen:** Cache disimpan di _Local Disk_, bukan RAM. Ini berarti cache bertahan meskipun komputer direstart (_survives reboot_).
> >     
> > - Kapasitas cache bisa sangat besar (ratusan file), terbatas hanya oleh ukuran disk klien.
> >     
> >
> > ### 2. Arsitektur Komponen: Venus & Vice
> >
> > Distribusi proses di AFS sangat spesifik (lihat diagram slide 5):
> >
> > **A. Vice (Server Side):**
> >
> > - Berjalan di atas sistem operasi server (kernel UNIX).
> >     
> > - Menyediakan layanan penyimpanan data terpusat.
> >     
> > - Melayani request RPC dari klien.
> >     
> > - Antarmuka layanan meliputi: `Fetch` (ambil file), `Store` (simpan file), `Remove`, `Create`, `Locking`.
> >     
> >
> > **B. Venus (Client Side):**
> >
> > - Berjalan sebagai **User Program** (bukan di dalam kernel) pada setiap workstation klien.
> >     
> > - Berperan sebagai perantara antara kernel klien dan server Vice.
> >     
> > - Mengelola cache lokal di disk klien.
> >     
> > - Melakukan kontak dengan Vice hanya jika file tidak ada di cache (_cache miss_) atau saat menutup file yang berubah.
> >     
> >
> > ### 3. Namespace & Intersepsi System Call
> >
> > **Struktur Namespace:**
> > 
> > AFS membagi pandangan file system menjadi dua area (Slide 6):
> >
> > - **Local Namespace:** Direktori standar UNIX seperti `/bin`, `/tmp`, `/lib` disimpan di disk lokal workstation. Ini untuk file sistem operasi dasar agar booting cepat dan independen.
> >     
> > - **Shared Namespace:** Direktori khusus (misal `/cmu`) yang berisi file-file user dan data bersama. Sub-tree di bawah `/cmu` dikelola oleh AFS dan terlihat sama di semua workstation.
> >     
> >
> > **Mekanisme Intersepsi:**
> > 
> > Kernel UNIX dimodifikasi sedikit. Saat ada system call (seperti open), kernel mengecek:
> >
> > - Apakah file ada di Local Namespace? -> Tangani dengan File System Lokal.
> >     
> > - Apakah file ada di Shared Namespace? -> Teruskan request ke proses **Venus**.
> >     
> >
> > ### 4. Implementasi Detail System Call di AFS
> >
> > Berikut alur hidup akses file secara rinci (berdasarkan tabel Slide 8):
> >
> > **1. `open(FileName, mode)`**
> >
> > - **Kernel:** Deteksi file remote, oper ke Venus.
> >     
> > - **Venus:** Cek cache lokal.
> >     
> > 	- _Cache Hit:_ Cek apakah file valid (punya callback promise?). Jika ya, pakai file di disk lokal.
> > 			
> > 	- _Cache Miss:_ Kirim RPC `Fetch` ke Vice Server.
> >         
> > - **Vice:** Kirim kopi file + **Callback Promise** ke Venus.
> >     
> > - **Venus:** Simpan file di disk lokal, catat promise, return file descriptor lokal ke kernel.
> >     
> > - **Hasil:** Aplikasi mendapat file descriptor ke file di disk lokal.
> >     
> >
> > **2. `read(...)` dan `write(...)`**
> >
> > - **Kernel:** Melakukan operasi I/O standar UNIX pada file salinan di disk lokal.
> >     
> > - **PENTING:** Venus dan Vice **TIDAK TERLIBAT**. Tidak ada lalu lintas jaringan sama sekali selama operasi baca/tulis berlangsung. Ini kunci performa tinggi AFS.
> >     
> >
> > **3. `close(FileDescriptor)`**
> >
> > - **Kernel:** Menutup file lokal, memberitahu Venus.
> >     
> > - **Venus:**
> >     
> > 	- Jika file hanya dibaca: Tidak melakukan apa-apa.
> > 			
> > 	- Jika file dimodifikasi: Mengirim salinan file yang baru dari disk lokal ke Vice Server via RPC `Store`.
> > 			
> > - **Vice:** Menerima file baru, update database, dan mengirim **BreakCallback** ke klien lain.
> >     
> >
> > ### 5. Model Konsistensi: Callback & Session Semantics
> >
> > AFS menggunakan pendekatan **Stateful** untuk menjaga konsistensi cache.
> >
> > **Callback Promise:**
> >
> > - Saat Vice mengirim file ke Venus, Vice memberikan janji: _"Saya akan memberitahu kamu jika file ini berubah."_
> >     
> > - Vice mencatat di tabel internal: "Klien X punya file Y".
> >     
> >
> > **Mekanisme Update (BreakCallback):**
> >
> > - Jika Klien A meng-upload versi baru file Y (saat `close`), Vice melihat catatannya.
> >     
> > - Vice melihat Klien B juga punya file Y.
> >     
> > - Vice mengirim RPC `BreakCallback` ke Venus di Klien B.
> >     
> > - Venus di Klien B menghapus validitas cache file Y (membatalkan promise).
> >     
> > - Jika Klien B mencoba `open` file Y nanti, Venus sadar cache-nya tidak valid dan akan `Fetch` ulang.
> >     
> >
> > **Session Semantics:**
> > 
> > Perubahan pada file hanya terlihat oleh user lain setelah file tersebut di-CLOSE. Selama file terbuka, perubahan bersifat lokal. Ini berbeda dengan UNIX semantics (perubahan terlihat instan).

> [!cornell] #### Summary
> 
> AFS adalah sistem file terdistribusi yang memprioritaskan skalabilitas untuk mendukung ribuan klien. Kunci utamanya adalah Whole-File Caching persisten di disk klien dan pemisahan tugas yang jelas: Venus (klien) menangani sebagian besar beban kerja secara lokal, sementara Vice (server) hanya berfungsi sebagai repositori pusat dan koordinator konsistensi. Interaksi jaringan diminimalkan hanya pada saat open (jika cache miss) dan close (jika ada perubahan). Konsistensi dikelola dengan model Stateful menggunakan Callback Promise, di mana server secara aktif memberitahu klien jika data mereka usang, menerapkan Session Semantics untuk pembaruan data.

> [!ad-libitum]- Additional Information (Deep Dive Technical)
> 
> #### Interface Layanan Vice (RPC)
> 
> Slide 9 merinci fungsi-fungsi RPC yang disediakan server Vice:
> 
> - `Fetch(fid)`: Mengambil atribut dan konten file, serta merekam Callback Promise.
>     
> - `Store(fid, attr, data)`: Mengupdate konten file dan atribut ke server.
>     
> - `Create()`, `Remove()`: Manajemen file.
>     
> - `SetLock(fid, mode)`, `ReleaseLock(fid)`: Manajemen penguncian file (shared/exclusive). Lock di AFS punya waktu kadaluarsa (misal 30 menit) untuk menangani klien yang crash.
>     
> - `BreakCallback(fid)`: **Penting!** Ini adalah RPC dari **Server ke Klien** (arah sebaliknya) untuk membatalkan validitas cache.
>     
> 
> #### Analisis Skalabilitas
> 
> Dalam pengujian benchmark, AFS terbukti menghasilkan beban server yang jauh lebih rendah dibandingkan NFS. Karena operasi `read/write` tidak menghasilkan trafik jaringan, CPU server tidak sibuk melayani request I/O kecil-kecil. Server hanya sibuk saat terjadi _burst_ aktivitas pembukaan/penutupan file.
> 
> #### Sumber & Referensi:
> 
> - **Makalah Klasik:** Howard, J.H., et al. "Scale and Performance in a Distributed File System", ACM TOCS, 1988.
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa AFS bisa dikatakan lebih "Scalable" dibandingkan NFS? Jelaskan mekanisme kuncinya!</strong></summary>
> 
> AFS lebih scalable karena menggunakan strategi Whole-File Caching di disk lokal klien. Setelah file didownload, semua operasi baca/tulis dilakukan secara lokal tanpa melibatkan server atau jaringan. Ini mengurangi beban CPU server dan bandwidth jaringan secara drastis dibandingkan NFS yang melakukan RPC untuk setiap blok data yang dibaca/tulis, sehingga satu server AFS bisa melayani jauh lebih banyak klien.
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Jelaskan langkah-langkah yang terjadi pada sistem AFS saat sebuah aplikasi melakukan system call close() pada file yang telah dimodifikasi!</strong></summary>
> 
> 1. Kernel memberitahu proses Venus bahwa file ditutup. 2. Venus mengecek apakah file telah dimodifikasi (dirty). 3. Jika ya, Venus mengirimkan salinan file utuh dari disk lokal ke server Vice melalui RPC Store. 4. Server Vice menerima file, menyimpannya, dan mengirimkan notifikasi BreakCallback ke semua klien lain yang sedang menyimpan cache file tersebut agar mereka tahu data mereka sudah usang.
>     
>     </details>
>     
>
> <details>
> 
> <summary><strong>3. Apa yang dimaksud dengan "Session Semantics" pada AFS dan bagaimana bedanya dengan UNIX Semantics?</strong></summary>
> 
> Session Semantics berarti perubahan pada file baru akan efektif dan terlihat oleh pengguna lain hanya setelah file tersebut ditutup (close). Selama sesi pengeditan berlangsung (file terbuka), perubahan tidak terlihat oleh pihak luar. Sebaliknya, UNIX Semantics menuntut perubahan terlihat sesegera mungkin (real-time) oleh proses lain yang membuka file yang sama, yang jauh lebih sulit diimplementasikan secara efisien dalam sistem terdistribusi.
> 
> </details>