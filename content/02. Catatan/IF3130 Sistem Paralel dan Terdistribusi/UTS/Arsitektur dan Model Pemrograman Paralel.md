---
type: Note
cssclasses:
- cornell-notes
---


_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> >
> > - Apa beda _Concurrent_, _Parallel_, dan _Distributed_?
> >     
> > - Apa itu sistem _Shared-Memory_?
> >     
> > - Apa itu sistem _Distributed-Memory_?
> >     
> > - Bagaimana cara _core_ berkomunikasi?
> >     
> > - Apa saja contoh model pemrograman paralel?
> >     
> > - Apa itu MPI?
> >     
> > - Apa itu Pthreads?
> >     
> > - Apa saja aspek koordinasi dalam program paralel?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3230-01-Dasar-2024.pdf
> >     
> 
> > ### Terminologi Kunci
> >
> > Meskipun sering digunakan bergantian, ada perbedaan mendasar antara istilah-istilah berikut:
> >
> > - **Concurrent Computing (Komputasi Konkuren):** Sebuah program di mana beberapa tugas dapat **sedang dalam proses (in progress)** pada satu waktu. Ini tidak berarti mereka berjalan bersamaan. Contohnya adalah sistem operasi yang menjalankan banyak aplikasi dengan beralih-alih antar tugas dengan sangat cepat.
> >     
> > - **Parallel Computing (Komputasi Paralel):** Sebuah program di mana beberapa tugas **bekerja sama secara erat dan berjalan secara bersamaan** untuk menyelesaikan satu masalah besar.
> >     
> > - **Distributed Computing (Komputasi Terdistribusi):** Sebuah program yang komponennya berada di mesin-mesin berbeda dan mungkin perlu bekerja sama dengan program lain untuk menyelesaikan masalah.
> >     
> >
> > ### Arsitektur Sistem Paralel
> >
> > Secara fundamental, sistem paralel dapat dibagi menjadi dua jenis arsitektur berdasarkan cara _core_ mengakses memori:
> > 
> > ![[Pasted image 20250902080200.png]]
> > 
> > 1. **Shared-Memory System:**
> > 	  - **Konsep:** Semua *core* terhubung ke satu ruang memori utama (RAM) yang sama. Setiap *core* dapat membaca dan menulis ke lokasi memori yang sama.
> > 	  - **Komunikasi:** Koordinasi antar *core* dilakukan secara **implisit** dengan cara membaca dan memodifikasi data di lokasi memori yang mereka bagikan.
> > 	  - **Analogi:** Sebuah tim yang bekerja di satu papan tulis yang sama. Semua anggota bisa melihat dan menulis di papan tulis tersebut.
> > 	  - **Contoh Teknologi:** Pthreads, OpenMP.
> >
> > 2. **Distributed-Memory System:**
> > 	  - **Konsep:** Setiap *core* memiliki akses eksklusif ke memorinya sendiri yang bersifat privat. Tidak ada *core* yang bisa mengakses memori milik *core* lain secara langsung.
> > 	  - **Komunikasi:** Koordinasi antar *core* harus dilakukan secara **eksplisit** dengan saling mengirimkan pesan (*messages*) melalui sebuah jaringan interkoneksi.
> > 	  - **Analogi:** Sebuah tim yang setiap anggotanya bekerja di kantor terpisah. Untuk bertukar informasi, mereka harus menelepon atau mengirim email satu sama lain.
> > 	  - **Contoh Teknologi:** MPI (*Message-Passing Interface*).
> >
> > ### Model Pemrograman Paralel
> >
> > Untuk menulis program paralel, developer menggunakan _framework_ atau API (_Application Programming Interface_) yang dirancang untuk arsitektur tertentu:
> >
> > - **MPI (Message-Passing Interface):** Standar _de facto_ untuk pemrograman pada sistem **distributed-memory**. MPI menyediakan fungsi-fungsi untuk mengirim dan menerima data antar proses yang berjalan di _core_ atau mesin yang berbeda.
> >     
> > - **Pthreads (POSIX Threads):** Sebuah standar eksekusi untuk membuat dan mengelola _threads_ pada sistem **shared-memory**. Pthreads memungkinkan sebuah program untuk memiliki beberapa alur eksekusi yang berjalan secara bersamaan dalam satu ruang memori.
> >     
> > - **OpenMP:** Model pemrograman yang lebih tinggi levelnya dibandingkan Pthreads untuk sistem **shared-memory**. Developer cukup menambahkan direktif khusus (disebut `#pragma`) pada kode C/C++/Fortran untuk memberitahu kompiler bagian mana dari kode yang harus dijalankan secara paralel.
> >     
> > - **CUDA:** Arsitektur komputasi paralel dan model pemrograman yang dibuat oleh NVIDIA khusus untuk GPU (_Graphics Processing Unit_). Ini memungkinkan penggunaan ribuan _core_ GPU untuk komputasi umum (_general-purpose computing_).
> >     
> >
> > ### Aspek Penting dalam Koordinasi
> >
> > Menulis program paralel bukan hanya tentang membagi pekerjaan, tetapi juga tentang mengelola bagaimana para "pekerja" (_cores_) berkoordinasi. Tiga aspek utama koordinasi adalah:
> >
> > 1. **Communication (Komunikasi):** Proses pengiriman data dari satu _core_ ke _core_ lainnya. Ini bisa berupa pengiriman hasil parsial, seperti pada contoh penjumlahan di catatan sebelumnya.
> >     
> > 2. **Load Balancing (Penyeimbangan Beban):** Memastikan setiap _core_ mendapatkan porsi pekerjaan yang seimbang. Jika satu _core_ bekerja terlalu berat sementara yang lain sudah selesai, maka efisiensi program akan menurun.
> >     
> > 3. **Synchronization (Sinkronisasi):** Memastikan _core-core_ berjalan dalam urutan yang benar. Terkadang, sebuah _core_ harus menunggu _core_ lain menyelesaikan tugasnya sebelum ia bisa melanjutkan.
> >     

> [!cornell] #### Summary
>  Pemrograman paralel memerlukan pemahaman tentang arsitektur _**hardware**_ yang mendasarinya, yang secara umum terbagi menjadi sistem _**Shared-Memory**_ (di mana _**core**_ berbagi memori dan berkomunikasi secara implisit) dan _**Distributed-Memory**_ (di mana _**core**_ memiliki memori privat dan berkomunikasi secara eksplisit melalui pesan). Pilihan model pemrograman seperti Pthreads dan OpenMP untuk _**shared-memory**_, atau MPI untuk _**distributed-memory**_, bergantung pada arsitektur ini. Keberhasilan program paralel tidak hanya ditentukan oleh pembagian kerja, tetapi juga oleh manajemen koordinasi yang efektif antar _**core**_ melalui komunikasi, penyeimbangan beban, dan sinkronisasi.**

> [!ad-libitum]- Additional Information
>  #### Pendalaman Konsep: _Race Condition_
>  Dalam sistem shared-memory, salah satu tantangan terbesar adalah race condition. Ini terjadi ketika dua atau lebih threads mencoba mengakses (membaca dan menulis) lokasi memori yang sama pada saat yang bersamaan, dan hasil akhirnya bergantung pada urutan eksekusi yang tidak bisa diprediksi.
>  
>  Contoh: Dua threads mencoba menambah nilai 1 ke variabel sum yang awalnya bernilai 0.
> 1. Thread A membaca `sum` (nilai 0).
> 2. Sebelum Thread A menulis kembali, sistem beralih ke Thread B.
> 3. Thread B membaca `sum` (masih bernilai 0).
> 4. Thread B menambah 1, dan menulis `sum = 1`.
> 5. Sistem beralih kembali ke Thread A.
> 6. Thread A, yang sebelumnya sudah membaca nilai 0, menambah 1, dan menulis sum = 1.
> >    Hasil akhirnya adalah 1, padahal seharusnya 2. Untuk mencegah ini, diperlukan mekanisme sinkronisasi seperti locks atau mutexes.
>     
> #### Hybrid Model: MPI + OpenMP
>  Di dunia _High-Performance Computing_ (HPC), arsitektur yang paling umum adalah _cluster_ komputer. Setiap komputer (disebut _node_) dalam _cluster_ adalah sistem _shared-memory_ dengan banyak _core_. Namun, antar-_node_ terhubung melalui jaringan, menjadikannya sistem _distributed-memory_ secara keseluruhan.
>  Untuk memprogram _cluster_ seperti ini, sering digunakan model hibrida:
>  - **MPI** digunakan untuk komunikasi **antar-node**.
> - OpenMP atau Pthreads digunakan untuk paralelisasi di dalam satu node (antar-core).
> 
> Pendekatan ini memungkinkan pemanfaatan arsitektur hardware secara maksimal.    
> 
> #### Eksplorasi Mandiri
>  - **Visualisasi Algoritma Paralel:** Cari di YouTube video yang memvisualisasikan algoritma _sorting_ paralel (contoh: "parallel merge sort" atau "parallel quicksort"). Perhatikan bagaimana data dibagi dan digabungkan kembali. Ini akan memberikan intuisi yang baik tentang bagaimana koordinasi dan komunikasi terjadi.
> 