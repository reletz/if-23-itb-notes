---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Pengantar Threads dan Model Multithreading
> 
> > ## Questions/Cues
> >
> > - Apa itu _Thread_?
> >     
> > - Beda Proses vs Thread?
> >     
> > - Apa saja komponen yang di-_share_ vs tidak di-_share_ oleh thread?
> >     
> > - Apa keuntungan _multithreading_?
> >     
> > - Beda Konkurensi vs Paralelisme?
> >     
> > - Beda _User Threads_ vs _Kernel Threads_?
> >     
> > - Apa itu model _Many-to-One_?
> >     
> > - Apa itu model _One-to-One_?
> >     
> > - Apa itu model _Many-to-Many_?
> >     
> >
> > ## Reference Points
> >
> > - PDF: 3. IF2130-04-2025-Threads.pdf
> >     
> > - Slides: 3-23
> >     
> 
> > ### Apa itu Thread?
> >
> > **Thread** adalah unit dasar dari utilisasi CPU. Ia adalah sebuah alur eksekusi (_flow of control_) **di dalam sebuah proses**. Sebuah proses tradisional hanya memiliki satu thread, sedangkan proses modern bisa memiliki beberapa thread yang berjalan secara bersamaan. Thread sering disebut sebagai _lightweight process_.
> >
> > ### Proses vs. Thread
> >
> > - **Proses** adalah unit kepemilikan sumber daya dan proteksi. Ia memiliki ruang alamat, file, dan sumber daya lainnya.
> >     
> > - **Thread** adalah unit untuk penjadwalan. Semua thread di dalam satu proses **berbagi** sumber daya yang sama.
> >     
> >
> > Komponen yang di-_share_ oleh thread dalam satu proses:
> >
> > - **Code Section**
> >     
> > - **Data Section**
> >     
> > - **Heap**
> >     
> > - Daftar file yang dibuka
> >     
> >
> > Komponen yang unik untuk setiap thread:
> >
> > - **Thread ID**
> >     
> > - **Program Counter (PC)**
> >     
> > - **Register Set**
> >     
> > - **Stack**
> >     
> >
> > ### Keuntungan Multithreading
> >
> > 1. **Responsiveness**: Memungkinkan aplikasi tetap responsif (misalnya, UI tidak macet) saat melakukan tugas yang panjang di latar belakang.
> >     
> > 2. **Berbagi Sumber Daya**: Thread berbagi memori dan sumber daya secara default, membuatnya lebih efisien daripada IPC antar proses.
> >     
> > 3. **Ekonomis**: Membuat thread jauh lebih "murah" (lebih cepat dan butuh lebih sedikit memori) daripada membuat proses baru. _Context switch_ antar thread juga lebih cepat.
> >     
> > 4. **Skalabilitas**: Memungkinkan pemanfaatan arsitektur _multicore_ secara penuh dengan menjalankan thread secara paralel di core yang berbeda.
> >     
> >
> > ### Konkurensi vs. Paralelisme
> >
> > - **Konkurensi (Concurrency)**: Sistem mendukung lebih dari satu tugas dengan mengizinkan semua tugas untuk membuat kemajuan. Pada sistem _single-core_, ini dicapai dengan _context switching_ yang cepat (ilusi berjalan bersamaan).
> >     
> > - **Paralelisme (Parallelism)**: Sistem dapat melakukan lebih dari satu tugas secara harfiah pada saat yang bersamaan. Ini memerlukan perangkat keras _multi-core_ atau _multi-processor_.
> >     
> >
> > ### User Threads vs. Kernel Threads
> >
> > - **User Threads**: Dikelola sepenuhnya di _user space_ oleh _thread library_ (seperti Pthreads, Java Threads) tanpa dukungan langsung dari kernel. Cepat dibuat dan dikelola.
> >     
> > - **Kernel Threads**: Dikelola langsung oleh sistem operasi. Kernel mengetahui keberadaan setiap thread dan menjadwalkannya secara individual.
> >     
> >
> > ### Model Multithreading
> >
> > Model ini menggambarkan bagaimana _user threads_ dipetakan ke _kernel threads_.
> >
> > 1. **Many-to-One**
> >     
> > 	- Banyak *user threads* dipetakan ke **satu** *kernel thread*.
> > 	- **Kelemahan**: Jika satu *user thread* melakukan *blocking system call*, seluruh proses akan berhenti. Tidak bisa memanfaatkan *multicore*.
> > 	- Contoh: Solaris Green Threads.
> >  
> > 2. **One-to-One**
> >     
> >   - Setiap *user thread* dipetakan ke **satu** *kernel thread*.
> >   - **Keuntungan**: Mengatasi masalah *blocking* dan memungkinkan paralelisme sejati.
> >   - **Kelemahan**: Membuat *user thread* menjadi operasi yang "mahal" karena harus membuat *kernel thread* juga. Bisa ada batasan jumlah thread.
> >   - Contoh: Windows, Linux, Solaris 9+.
> >
> > 3. **Many-to-Many**
> >     
> >   - Memetakan banyak *user threads* ke sejumlah *kernel threads* yang lebih kecil atau sama.
> >   - **Keuntungan**: Fleksibel. Menggabungkan keuntungan dari dua model sebelumnya.
> >   - **Kelemahan**: Implementasi yang kompleks.

> [!cornell] #### Summary
> 
> Thread adalah unit eksekusi ringan di dalam sebuah proses, di mana semua thread dalam satu proses berbagi kode, data, dan sumber daya tetapi memiliki stack dan registernya sendiri. Multithreading memberikan keuntungan responsivitas dan skalabilitas, memungkinkan konkurensi pada single-core dan paralelisme sejati pada multi-core. Hubungan antara user threads (dikelola oleh library) dan kernel threads (dikelola oleh OS) didefinisikan oleh model pemetaan: Many-to-One (efisien tapi terbatas), One-to-One (paralel tapi mahal), dan Many-to-Many (fleksibel tapi kompleks).