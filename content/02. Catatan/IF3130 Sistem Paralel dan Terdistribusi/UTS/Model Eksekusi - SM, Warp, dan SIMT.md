---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Model Eksekusi Perangkat Keras: SM, Warp, dan SIMT
> 
> > ## Questions/Cues
> > 
> > - Apa itu Streaming Multiprocessor (SM)?
> >     
> > - Bagaimana thread block dipetakan ke SM?
> >     
> > - Apa itu "Warp"?
> >     
> > - Bagaimana thread diorganisir dalam Warp?
> >     
> > - Apa itu eksekusi SIMT?
> >     
> > - Apa bedanya SIMD dan SIMT?
> >     
> > - Bagaimana penjadwalan Warp bekerja?
> >     
> > - Apa itu "zero-overhead scheduling"?
> >     
> > 
> > ## Reference Points
> > 
> > - `7 - IF-3230-07-GPU-04-2022.pdf`
> >     
> > - `7 - IF-3230-07-GPU-02-2022.pdf`
> >     
> > - `6a - IF3230-06a-GPU-2022.pdf`
> >     
> 
> > ### Apa itu Streaming Multiprocessor (SM)?
> > 
> > **Streaming Multiprocessor (SM)** adalah jantung dari GPU NVIDIA. Sebuah GPU modern terdiri dari banyak SM. Setiap SM adalah sebuah **prosesor independen** yang memiliki semua sumber daya yang diperlukan untuk mengelola dan mengeksekusi ratusan _thread_ secara bersamaan.
> > 
> > Setiap SM berisi:
> > 
> > - **CUDA Cores**: Unit eksekusi (ALU) yang melakukan perhitungan.
> >     
> > - **Shared Memory**: Memori on-chip berkecepatan tinggi yang digunakan oleh _thread block_.
> >     
> > - **Register File**: Kumpulan register yang sangat besar untuk _thread_.
> >     
> > - **Warp Schedulers**: Unit kontrol yang menjadwalkan eksekusi _thread_.
> >     
> > - **Load/Store Units**: Unit yang menangani akses ke memori.
> >     
> > 
> > ### Pemetaan Thread Block ke SM
> > 
> > Saat sebuah kernel diluncurkan, Grid dari _thread block_ akan didistribusikan ke SM yang tersedia.
> > 
> > - **Granularitas Block**: Perangkat keras memetakan _thread_ ke SM dalam satuan **block**. Seluruh _thread_ dalam satu block dijamin akan dieksekusi di SM yang sama.
> >     
> > - **Penjadwalan**: Sebuah SM dapat menampung dan mengeksekusi **beberapa block secara bersamaan**, selama total sumber daya yang dibutuhkan (jumlah _thread_, _shared memory_, _register_) tidak melebihi kapasitas SM tersebut.
> >     
> > - **Skalabilitas Transparan**: Karena block bersifat independen, GPU dapat secara otomatis menskalakan eksekusi dengan mendistribusikan block ke SM sebanyak apa pun yang dimilikinya. Program yang sama akan berjalan lebih cepat di GPU dengan lebih banyak SM tanpa perlu diubah.
> >     
> > 
> > ### Apa itu "Warp"?
> > 
> > **Warp** adalah sebuah **konsep perangkat keras**, bukan bagian dari model pemrograman CUDA secara langsung.
> > 
> > - **Definisi**: Sebuah Warp adalah sekelompok **32 thread** yang dieksekusi dan dijadwalkan bersama-sama.
> >     
> > - **Unit Fundamental**: Di dalam SM, Warp adalah **unit penjadwalan fundamental**. SM tidak memilih _thread_ individual untuk dijalankan, melainkan memilih Warp.
> >     
> > 
> > ### Organisasi Thread dalam Warp
> > 
> > Sebelum dieksekusi, _thread block_ akan dipecah menjadi beberapa Warp oleh perangkat keras.
> > 
> > 1. **Linearisasi**: _Thread block_ multi-dimensi (2D atau 3D) pertama-tama "diratakan" atau dilinearisasi menjadi urutan 1D (dalam urutan _row-major_: X, lalu Y, lalu Z).
> >     
> > 2. **Partisi**: Urutan _thread_ yang sudah linear ini kemudian dipartisi menjadi grup-grup berukuran 32.
> >     
> >     - `threadIdx` 0 hingga 31 menjadi **Warp 0**.
> >         
> >     - `threadIdx` 32 hingga 63 menjadi **Warp 1**, dan seterusnya.
> >         
> > 
> > Akibatnya, _thread-thread_ dengan ID yang berurutan di dalam block akan berada di dalam Warp yang sama.
> > 
> > ### Eksekusi SIMT
> > 
> > GPU menjalankan _thread_ menggunakan model **SIMT (Single Instruction, Multiple Thread)**.
> > 
> > - **Prinsip**: Semua 32 _thread_ dalam satu Warp mengeksekusi **instruksi yang sama pada waktu yang sama**.
> >     
> > - **Analogi**: Bayangkan seorang sersan (Warp Scheduler) meneriakkan satu perintah ("Maju!"), dan 32 prajurit (_thread_ dalam satu Warp) semuanya melangkah maju serempak.
> >     
> > - **Fleksibilitas**: Meskipun semua _thread_ menjalankan instruksi yang sama, setiap _thread_ memiliki state-nya sendiri (register, program counter), yang memungkinkannya bekerja pada data yang berbeda dan mengambil jalur eksekusi yang berbeda (ini mengarah ke _control divergence_, yang akan dibahas nanti).
> >     
> > 
> > ### Perbedaan SIMD dan SIMT
> > 
> > - **SIMD (Single Instruction, Multiple Data)**: Model ini biasanya beroperasi pada **vektor data** dalam satu _thread_. Satu instruksi melakukan operasi pada beberapa komponen data sekaligus (misalnya, `ADD [r1, r2, r3, r4], [g1, g2, g3, g4]`).
> >     
> > - **SIMT (Single Instruction, Multiple Thread)**: Model ini beroperasi pada **thread skalar**. Satu instruksi dieksekusi oleh beberapa _thread_ independen. SIMT lebih fleksibel karena setiap _thread_ bisa memiliki alur kontrolnya sendiri, meskipun ini bisa menimbulkan biaya performa jika alurnya berbeda-beda dalam satu warp.
> >     
> > 
> > ### Penjadwalan Warp dan "Zero-Overhead Scheduling"
> > 
> > Ini adalah salah satu fitur paling kuat dari arsitektur GPU untuk **menyembunyikan latensi**.
> > 
> > - **Pool of Warps**: Setiap SM memiliki "kolam" yang berisi Warp-warp dari semua block yang ditugaskan padanya.
> >     
> > - **Mekanisme**:
> >     
> >     1. Pada setiap siklus, _warp scheduler_ memilih satu Warp yang **siap dieksekusi** (yaitu, tidak sedang menunggu data dari memori atau hasil dari operasi sebelumnya).
> >         
> >     2. _Scheduler_ mengeluarkan instruksi berikutnya dari Warp tersebut ke _CUDA core_.
> >         
> >     3. Jika Warp tersebut kemudian harus menunggu (misalnya, untuk membaca data dari Global Memory yang lambat), _scheduler_ akan **seketika** mengalihkannya keluar dari eksekusi.
> >         
> >     4. Pada siklus berikutnya, _scheduler_ akan memilih **Warp lain yang sudah siap** dari kolam untuk dieksekusi.
> >         
> > 
> > **Zero-Overhead**: Proses pengalihan (konteks switching) antar Warp ini terjadi di perangkat keras dan **tidak memakan waktu (zero overhead)**. Dengan memiliki banyak Warp yang siap dieksekusi, SM dapat selalu menemukan pekerjaan untuk dilakukan, sehingga _core_ komputasi tetap sibuk dan latensi memori yang panjang dapat disembunyikan secara efektif.

> [!cornell] #### Summary
> 
> GPU mengeksekusi thread block pada unit prosesor independen yang disebut Streaming Multiprocessor (SM). Di dalam SM, thread dikelompokkan menjadi Warp (32 thread), yang merupakan unit penjadwalan fundamental. Eksekusi berjalan dengan model SIMT, di mana semua thread dalam satu Warp menjalankan instruksi yang sama secara serempak. Untuk mencapai throughput maksimal, SM menggunakan "zero-overhead scheduling" untuk secara instan beralih di antara Warp yang siap dieksekusi, secara efektif menyembunyikan latensi akses memori dan menjaga agar core komputasi selalu sibuk.

> [!ad-libitum]- Additional Information
> 
> #### Okupansi (Occupancy)
> 
> Okupansi adalah metrik kunci dalam analisis performa CUDA. Ini didefinisikan sebagai rasio jumlah Warp aktif di sebuah SM terhadap jumlah maksimum Warp yang dapat ditampung oleh SM tersebut. Okupansi yang tinggi penting karena ia menyediakan cukup banyak Warp bagi _scheduler_ untuk dipilih guna menyembunyikan latensi. Okupansi yang rendah dapat terjadi jika sebuah kernel:
> 
> - Menggunakan terlalu banyak **register per thread**.
>     
> - Menggunakan terlalu banyak **shared memory per block**.
>     
> - Dikonfigurasi dengan **jumlah thread per block yang terlalu kecil**.
>     
> 
> NVIDIA menyediakan _Occupancy Calculator_ untuk membantu developer memilih konfigurasi _thread block_ yang optimal.
> 
> #### Warp-Level Synchronous Programming
> 
> Karena semua _thread_ dalam satu Warp dieksekusi secara serempak (lockstep), ada teknik pemrograman tingkat lanjut yang memanfaatkan sifat ini. Misalnya, _thread-thread_ dalam satu Warp dapat bertukar data menggunakan operasi _shuffle_ (`__shfl_sync()`) tanpa perlu menggunakan _shared memory_ atau `__syncthreads()`. Ini bisa sangat cepat tetapi memerlukan pemahaman yang mendalam dan harus digunakan dengan hati-hati, karena mengasumsikan perilaku perangkat keras yang mungkin berubah di generasi GPU mendatang.
> 
> #### Pertimbangan Ukuran Block
> 
> Memilih ukuran block yang tepat adalah salah satu keputusan terpenting. Ukuran block yang ideal biasanya:
> 
> - **Kelipatan dari 32**: Agar tidak ada Warp yang sebagian terisi, yang akan membuang-buang sumber daya.
>     
> - **Cukup Besar**: Untuk menyediakan Warp yang cukup bagi _scheduler_. Ukuran 128, 256, atau 512 adalah pilihan umum yang baik.
>     
> - **Tidak Terlalu Besar**: Agar beberapa block bisa berjalan bersamaan di satu SM, yang juga membantu menyembunyikan latensi (misalnya, latensi saat satu block selesai dan yang lain dimulai).
>