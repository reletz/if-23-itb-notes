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
> > - Apa itu _load imbalance_?
> >     
> > - Bagaimana `schedule` mengatasi ini?
> >     
> > - Beda `static`, `dynamic`, `guided`?
> >     
> > - Kapan sinkronisasi eksplisit perlu?
> >     
> > - Apa fungsi `#pragma omp barrier`?
> >     
> > - Beda `critical`, `atomic`, dan `lock`?
> >     
> >
> > ## Reference Points
> >
> > - Slide "paralel programming model: shared memory - OpenMP" (Hal. 55-68, 76-85)
> >     
> 
> > ### Masalah Beban Kerja Tidak Seimbang (_Load Imbalance_)
> >
> > Secara _default_, OpenMP membagi iterasi loop secara merata (partisi blok). Jika kita punya 100 iterasi dan 4 _thread_, _thread_ 0 mendapat iterasi 0-24, _thread_ 1 mendapat 25-49, dan seterusnya.
> >
> > **Masalah**: Bagaimana jika beban kerja setiap iterasi tidak sama? Misalnya, iterasi akhir membutuhkan waktu jauh lebih lama daripada iterasi awal. Akibatnya, beberapa _thread_ akan selesai lebih dulu dan menganggur, sementara satu _thread_ terakhir masih bekerja keras. Ini disebut **load imbalance** dan mengurangi efisiensi paralelisme.
> >
> > ### Klausa `schedule`: Mengatur Distribusi Kerja
> >
> > Untuk mengatasi _load imbalance_, OpenMP menyediakan klausa `schedule` pada direktif `for`. Klausa ini memungkinkan kita mengontrol cara iterasi didistribusikan ke _thread_.
> >
> > **Sintaks**: `schedule(<type>, <chunk_size>)`
> >
> > - **`schedule(static, chunk_size)`**:
> > 	- **Cara Kerja**: Iterasi dibagi menjadi "potongan" (`chunk`) berukuran `chunk_size` dan dibagikan ke *thread* secara *round-robin* **sebelum loop dimulai**.
> > 	- **Contoh**: `schedule(static, 1)` menghasilkan partisi siklik (iterasi 0 ke thread 0, 1 ke thread 1, dst.), yang bisa menyeimbangkan beban jika ada pola beban kerja yang teratur.
> > 	- **Kapan Digunakan**: Saat beban kerja setiap iterasi relatif seragam dan dapat diprediksi. Overhead-nya paling rendah.
> >
> > - **`schedule(dynamic, chunk_size)`**:
> > 	- **Cara Kerja**: Iterasi dibagi menjadi `chunk`, tetapi tidak langsung dibagikan. Setiap *thread* yang selesai mengerjakan satu `chunk` akan meminta `chunk` berikutnya dari *runtime system*.
> > 	- **Kapan Digunakan**: Saat beban kerja sangat tidak terduga atau tidak teratur. Setiap *thread* akan terus bekerja selama masih ada pekerjaan. Overhead-nya lebih tinggi karena ada komunikasi saat runtime.
> >
> >
> > - **`schedule(guided, chunk_size)`**:
> >   
> > 	- **Cara Kerja**: Mirip `dynamic`, tetapi ukuran `chunk` yang dibagikan semakin mengecil seiring berjalannya waktu. Dimulai dengan `chunk` besar, lalu mengecil untuk "membersihkan" sisa-sisa pekerjaan.
> > 	- **Kapan Digunakan**: Kompromi yang baik antara `static` dan `dynamic`. Mengurangi overhead permintaan `chunk` di awal, tetapi tetap adaptif di akhir.
> >
> > ### Sinkronisasi Eksplisit
> >
> > Terkadang kita butuh kontrol lebih dari sekadar `reduction` atau _barrier_ implisit di akhir loop.
> >
> > - **`#pragma omp barrier`**:
> > 	- Sebuah titik henti paksa. Tidak ada *thread* yang bisa melewati *barrier* ini sampai **semua *thread* dalam *team*** telah mencapainya. Berguna untuk memastikan satu fase komputasi selesai sebelum fase berikutnya dimulai.
> > 
> >
> > - **`#pragma omp critical`**:
> > 	- Melindungi blok kode agar hanya bisa dieksekusi oleh **satu *thread* pada satu waktu**. Ini adalah mekanisme *mutual exclusion* serbaguna.
> > 	- **Named Critical**: Kita bisa memberi nama, misal `#pragma omp critical(q_lock)`. Blok *critical* dengan nama yang berbeda dapat dieksekusi secara paralel.
> > 
> >
> > - **`#pragma omp atomic`**:
> >    
> > 	- Versi "ringan" dan super cepat dari `critical`, tetapi **hanya untuk satu statement assignment sederhana** seperti `x++`, `x -= y`, atau `x = x + 1`.
> > 	- Jauh lebih efisien karena sering kali diterjemahkan menjadi satu instruksi *hardware* khusus. Gunakan ini jika memungkinkan.
> >
> >
> > - **Locks (`omp_lock_t`)**:
> > 	- Mekanisme *mutual exclusion* yang paling manual dan fleksibel, mirip *mutex* di Pthreads.
> > 	- Melibatkan fungsi `omp_init_lock`, `omp_set_lock` (mengunci), `omp_unset_lock` (membuka), dan `omp_destroy_lock`.
> > 	- Berguna untuk skenario kompleks, seperti melindungi akses ke elemen-elemen berbeda dari sebuah struktur data (misalnya, setiap antrian pesan memiliki *lock*-nya sendiri).
> >

> [!cornell] #### Summary
> 
> Untuk mengatasi _load imbalance_ dalam loop paralel, OpenMP menyediakan klausa `schedule`, di mana `static` cocok untuk beban kerja seragam, sementara `dynamic` dan `guided` lebih adaptif untuk beban kerja yang tidak teratur. Untuk sinkronisasi di luar loop, `#pragma omp barrier` digunakan untuk menyamakan langkah semua _thread_, sementara `#pragma omp critical`, `#pragma omp atomic`, dan _locks_ menyediakan mekanisme _mutual exclusion_ dengan tingkat fleksibilitas dan overhead yang berbeda untuk melindungi _critical section_.

> [!ad-libitum]- Additional Information
> 
> #### Visualisasi Penjadwalan
> 
> Bayangkan 12 piring yang harus dicuci (iterasi) oleh 3 orang (_thread_), di mana piring bernomor besar lebih kotor (beban kerja lebih berat).
> 
> - **`schedule(static, 4)` (Default)**: Orang A dapat piring 0-3, B dapat 4-7, C dapat 8-11. Orang A dan B akan selesai cepat dan menunggu C yang bekerja paling keras. **Tidak efisien**.
>     
> - **`schedule(static, 1)` (Cyclic)**: A dapat 0,3,6,9; B dapat 1,4,7,10; C dapat 2,5,8,11. Beban kerja jadi jauh lebih seimbang. **Lebih baik**.
>     
> - **`schedule(dynamic, 1)`**: Siapa pun yang selesai mencuci satu piring, langsung ambil piring berikutnya yang tersedia. Menjamin semua orang sibuk, tapi ada waktu terbuang untuk "jalan mengambil piring baru". **Paling adil, tapi ada overhead**.
>     
> 
> #### Waspada Deadlock!
> 
> Saat menggunakan mekanisme sinkronisasi eksplisit seperti _locks_ atau _named critical_, ada risiko **deadlock**. Ini terjadi ketika _Thread A_ mengunci sumber daya X dan menunggu sumber daya Y, sementara _Thread B_ mengunci Y dan menunggu X. Keduanya akan saling menunggu selamanya. Hindari mengunci beberapa sumber daya secara bersamaan, atau jika harus, pastikan semua _thread_ menguncinya dalam urutan yang sama persis.
> 
> #### Eksplorasi Mandiri
> 
> - Coba implementasikan masalah Produsen-Konsumen menggunakan OpenMP. Gunakan sebuah _array_ sebagai _queue_. Bagaimana Anda akan melindungi operasi _enqueue_ dan _dequeue_? Pilihan apa yang lebih baik antara `critical` atau `lock` untuk kasus ini?
>     
> - Ubah program _odd-even sort_ dari catatan sebelumnya. Alih-alih menggunakan dua direktif `#pragma omp parallel for` yang terpisah, gunakan satu `#pragma omp parallel` yang membungkus kedua loop. Apa yang harus Anda tambahkan di antara kedua loop `for` di dalam blok `parallel` untuk memastikan hasilnya benar? (Petunjuk: fase genap harus selesai sepenuhnya sebelum fase ganjil dimulai).
>