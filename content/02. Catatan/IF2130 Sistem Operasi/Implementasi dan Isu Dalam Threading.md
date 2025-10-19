---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Implementasi dan Isu dalam Threading
> 
> > ## Questions/Cues
> > 
> > - Apa itu _Thread Library_?
> >     
> > - Apa itu Pthreads?
> >     
> > - Apa isu `fork()` & `exec()` pada multithreading?
> >     
> > - Apa itu _Thread Cancellation_?
> >     
> > - Apa beda _asynchronous_ vs _deferred cancellation_?
> >     
> > - Bagaimana penanganan sinyal (_signal handling_)?
> >     
> > - Apa itu _Thread Pool_?
> >     
> > - Apa itu _Thread-Local Storage_ (TLS)?
> >     
> > 
> > ## Reference Points
> > 
> > - PDF: 3. IF2130-04-2025-Threads.pdf
> >     
> > - Slides: 24-47
>  
> > 
> > ### Thread Libraries
> > 
> > **Thread Library** menyediakan API bagi programmer untuk membuat dan mengelola thread. Implementasinya bisa dua cara:
> > 
> > 1. **User-level library**: Seluruh kode dan struktur data berada di _user space_.
> >     
> > 2. **Kernel-level library**: Didukung langsung oleh OS, di mana pemanggilan API akan memicu _system call_.
> >     
> > 
> > Tiga library utama yang umum digunakan:
> > 
> > - **Pthreads**: Standar POSIX (IEEE 1003.1c) yang mendefinisikan API. Ini adalah spesifikasi, bukan implementasi. Umum di UNIX, Linux, dan macOS.
> >     
> > - **Windows Threads**: Library level kernel yang disediakan oleh Windows API.
> >     
> > - **Java Threads**: Dikelola oleh Java Virtual Machine (JVM). JVM biasanya akan memetakan Java thread ke thread yang disediakan oleh OS di bawahnya.
> >     
> > 
> > ### Isu-Isu dalam Pemrograman Thread
> > 
> > **1. Semantik `fork()` dan `exec()`**
> > 
> > - **`fork()`**: Saat `fork()` dipanggil dalam proses multithreaded, apakah OS harus menduplikasi **semua thread** atau **hanya thread yang memanggil `fork()`**? Beberapa sistem UNIX menyediakan dua versi `fork()` untuk menangani kedua kasus ini.
> >     
> > - **`exec()`**: Jika sebuah thread memanggil `exec()`, seluruh proses (termasuk semua thread di dalamnya) akan digantikan oleh program yang baru.
> >     
> > 
> > **2. Thread Cancellation**
> > 
> > - Proses menghentikan sebuah thread sebelum ia selesai. Thread yang akan dihentikan disebut _target thread_.
> >     
> > - **Asynchronous Cancellation**: Menghentikan _target thread_ secara paksa dan segera. Berisiko karena thread bisa dihentikan saat sedang memegang _lock_ atau memperbarui data penting.
> >     
> > - **Deferred Cancellation**: _Target thread_ secara periodik memeriksa sebuah flag untuk melihat apakah ia harus berhenti. Ini memungkinkan thread untuk berhenti di titik yang aman (_cancellation point_). Ini adalah pendekatan default dan yang lebih aman.
> >     
> > 
> > **3. Signal Handling**
> > 
> > - Sinyal (_signal_) di UNIX digunakan untuk memberitahu proses tentang suatu event. Dalam lingkungan multithreaded, pertanyaan yang muncul adalah: sinyal harus dikirim ke mana?
> >     
> > - Opsi pengiriman sinyal:
> >     
> >     - Ke thread spesifik yang menjadi tujuan sinyal.
> >         
> >     - Ke semua thread dalam proses.
> >         
> >     - Ke thread tertentu yang ditugaskan untuk menangani semua sinyal.
> >         
> > 
> > **4. Thread Pools**
> > 
> > - Daripada membuat thread baru untuk setiap tugas (yang memakan waktu), aplikasi bisa membuat sejumlah thread di awal dan menyimpannya di sebuah **pool**.
> >     
> > - Ketika ada tugas baru, tugas tersebut akan diserahkan ke salah satu thread yang sedang menganggur di pool. Setelah selesai, thread tersebut kembali ke pool untuk menunggu tugas berikutnya.
> >     
> > - **Keuntungan**: Lebih cepat dan membatasi jumlah total thread yang berjalan di sistem.
> >     
> > 
> > **5. Thread-Local Storage (TLS)**
> > 
> > - Meskipun thread berbagi data, terkadang setiap thread memerlukan salinan datanya sendiri yang bersifat persisten (tidak hilang antar pemanggilan fungsi).
> >     
> > - TLS memungkinkan setiap thread untuk memiliki area penyimpanan pribadinya sendiri. Ini mirip dengan variabel statis, tetapi unik untuk setiap thread.
> >     
> > 
> > **6. Scheduler Activations**
> > 
> > - Mekanisme komunikasi antara _thread library_ dan kernel dalam model Many-to-Many.
> >     
> > - Kernel dapat memberitahu library (melalui _upcall_) tentang event tertentu (misalnya, sebuah thread akan diblokir), sehingga library dapat membuat keputusan penjadwalan yang lebih baik di _user level_.
> >     

> [!cornell] #### Summary
> 
> Implementasi threading dilakukan melalui thread libraries seperti Pthreads dan Java Threads, yang menyediakan API untuk manajemen thread. Pemrograman multithreaded membawa beberapa tantangan unik, termasuk mendefinisikan perilaku fork(), mengelola thread cancellation dengan aman (lebih baik secara deferred), menentukan target pengiriman sinyal, dan mengelola sumber daya secara efisien menggunakan Thread Pools. Untuk data yang spesifik per-thread, mekanisme Thread-Local Storage (TLS) menyediakan penyimpanan yang persisten dan unik untuk setiap thread.