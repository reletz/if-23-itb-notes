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
> > - Mengapa beban ada pada _software_?
> >     
> > - Apa model pemrograman utama?
> >     
> > - Beda _process-based_ vs _thread-based_?
> > 
> > - Apa itu _Vectorization_ & _Stream Processing_?
> >     
> > - Apa itu SPMD?
> >     
> > - Bagaimana langkah-langkah menulis program paralel?
> >     
> > - Apa itu _Nondeterminism_?
> >     
> > - Apa itu _Race Condition_ & solusinya?
> >     
> > - Apa itu _Message Passing_?
> >     
> > - Bagaimana menangani I/O?
> >     
> >
> > ## Reference Points
> >
> > - Slides IF3230-02-ParallelHardware-Software-2022.pdf
> >     
> 
> > ### Beban Beralih ke Software
> >
> > Perkembangan _hardware_ paralel (seperti _multicore_) tidak akan memberikan peningkatan performa jika _software_ tidak dirancang untuk memanfaatkannya. Kompiler modern belum cukup pintar untuk mengubah program serial menjadi program paralel yang efisien secara otomatis. Oleh karena itu, beban untuk mengekspos dan mengelola paralelisme sepenuhnya berada di tangan **programmer**.
> >
> > ### Model Pemrograman Paralel Utama
> >
> > Ada dua pendekatan fundamental untuk menulis program paralel, yang sangat dipengaruhi oleh arsitektur _hardware_ yang mendasarinya.
> >
> > 1. **Process-based (Message Passing):**
> > 	  - **Konsep:** Program utama meluncurkan beberapa **proses** independen. Setiap proses memiliki ruang memori privatnya sendiri.
> > 	  - **Komunikasi:** Karena memori terisolasi, proses-proses ini berkomunikasi dengan cara saling mengirim dan menerima **pesan** secara eksplisit.
> > 	  - **Cocok untuk:** Arsitektur *Distributed Memory*.
> > 	  
> > 	  ![[Pasted image 20250903102347.png]]
> >
> > 2. **Thread-based (Shared Data):**
> >     
> > 	  - **Konsep:** Program utama berjalan sebagai satu proses, yang kemudian membuat beberapa **threads**. Semua *thread* ini berjalan di dalam proses yang sama dan berbagi ruang memori yang sama.
> > 	  - **Komunikasi:** *Threads* berkomunikasi secara implisit dengan cara membaca dan menulis ke variabel yang sama di memori bersama.
> > 	  - **Cocok untuk:** Arsitektur *Shared Memory*.
> > 
> > 	![[Pasted image 20250903102411.png]]
> > 
> > 3. **Vectorization (SIMD)**
> > 	- **Konsep:** Memanfaatkan unit _hardware_ khusus (seperti _Vector Processor_ di CPU) untuk menjalankan **satu instruksi pada banyak data** sekaligus.
> > 	- **Implementasi:** Programmer sering kali memberikan petunjuk (_pragmas_) kepada kompiler, dan kompiler akan mencoba menghasilkan instruksi vektor yang efisien.
> > 	- **Catatan:** Performanya bergantung dengan _compiler_ yang digunakan.
> > 	
> > 	![[Pasted image 20250903102428.png]]
> > 
> > 4. **Stream Processing**
> > 	- **Konsep:** Sebuah pola yang spesifik untuk _hardware_ akselerator seperti **GPU**. CPU akan "memindahkan" (_offload_) data dan fungsi komputasi (_kernel_) ke GPU.
> > 	
> > 	- **Alur Kerja:** Ribuan _core_ di GPU akan memproses aliran (_stream_) data tersebut secara masif dan paralel. Setelah selesai, hasilnya dikirim kembali ke CPU.
> > 	
> > 	![[Pasted image 20250903102449.png]]
> >
> > 
> > ### SPMD (Single Program, Multiple Data)
> >
> > Ini adalah gaya pemrograman yang sangat umum dalam komputasi paralel. Idenya adalah kita hanya menulis **satu kode program**, yang kemudian akan dieksekusi oleh semua proses atau _thread_. Namun, setiap proses/thread bisa berperilaku berbeda dengan menggunakan percabangan kondisional berdasarkan identitas unik mereka (disebut _rank_ atau ID).
> >
> > ```c
> > // Contoh SPMD
> > if (my_rank == 0) {
> >   // Lakukan tugas master
> > } else {
> >   // Lakukan tugas worker
> > }
> > ```
> >
> > ### Tantangan dalam Pemrograman Paralel
> >
> > - **Langkah-langkah:**
> >	1. **Bagi pekerjaan di antara proses/thread** 
> >		(a) sehingga setiap proses/thread mendapatkan jumlah pekerjaan yang kurang lebih sama
> >		(b) dan komunikasi diminimalkan.
> >	2.  **Atur agar proses/thread melakukan sinkronisasi.**
> >	3. **Atur komunikasi di antara proses/thread**
> >
> > Penggunaan _thread_ dalam **_Shared Memory_** dapat dibagi dalam dua jenis:
> > - **Thread Dinamis**
> > 	- Thread master menunggu pekerjaan, membuat (forks) thread baru, dan ketika thread selesai, mereka berhenti (terminate).
> > 	- Penggunaan sumber daya yang efisien, tetapi pembuatan dan penghentian thread memakan waktu.
> > - **Thread Statis**
> > 	- Sekumpulan (pool) thread dibuat dan dialokasikan pekerjaan, tetapi tidak berhenti sampai proses pembersihan (cleanup).
> > 	- Performa lebih baik, tetapi berpotensi membuang-buang sumber daya sistem.
> > 
> > Namun, menulis program paralel mengenalkan beberapa tantangan unik yang tidak ada dalam pemrograman serial. 
> > - **Nondeterminism:** Karena setiap _thread_ berjalan dengan kecepatannya sendiri, urutan eksekusi antar _thread_ tidak dapat diprediksi. Jika beberapa _thread_ mencoba mencetak ke layar, urutan outputnya bisa berbeda setiap kali program dijalankan.
> >     
> >
> > - **Race Condition:** Masalah serius yang terjadi ketika beberapa _thread_ mencoba mengakses (membaca dan menulis) lokasi memori yang sama secara bersamaan, dan hasil akhirnya bergantung pada urutan eksekusi yang tidak menentu tersebut.
> >   - **Contoh:** Dua *thread* mencoba menambahkan nilainya ke variabel global `x`. *Thread 0* membaca `x` (nilai 0), lalu *Thread 1* membaca `x` (masih 0), kemudian *Thread 0* menulis hasilnya (0+7=7), dan terakhir *Thread 1* menulis hasilnya (0+19=19). Nilai `x` akhir menjadi 19, padahal seharusnya 26.
> >
> > - **Solusi: Mutual Exclusion (Mutex):** Untuk mencegah _race condition_, bagian kode yang mengakses data bersama (disebut **critical section**) harus dilindungi. Hanya satu _thread_ yang diizinkan masuk ke _critical section_ pada satu waktu. Ini dicapai dengan menggunakan **lock** atau **mutex**.
> >     
> >
> > ```c
> > Lock(&my_lock);
> > x += my_val; // Critical section
> > Unlock(&my_lock);
> > ```
> > 
> > - **Solusi Lain: Busy Waiting:** Salah satu solusi lain yang dapat dipertimbangkan adalah _busy waiting_. Ia memaksa sebuah _thread_ untuk menunggu secara aktif (terus-menerus memeriksa sebuah kondisi dalam _loop_) sampai _thread_ lain memberikan sinyal bahwa ia boleh melanjutkan.
> > 	- Dengan cara ini, kita **memaksakan sebuah urutan eksekusi yang deterministik** pada bagian kode yang kritis. _Thread_ B tidak akan pernah bisa mendahului _thread_ A dalam mengakses data bersama, sehingga _race condition_ dapat dihindari. Jadi, ia "menyembuhkan" gejala (_race condition_) yang disebabkan oleh sifat dasar (_nondeterminism_).
> > 	- Kelemahan utama _busy-waiting_ adalah **sangat tidak efisien**. _Thread_ yang sedang menunggu akan menghabiskan 100% siklus CPU-nya hanya untuk berputar dalam _loop_ kosong. Ini sama saja dengan membakar energi dan sumber daya komputasi tanpa melakukan pekerjaan yang produktif.
> > 
> > ```c
> > my_val = Compute_val(my_rank); 
> > if ( my_rank == 1)
> > 	while ( ! ok_for_1 ) ; /* Busy−wait loop */ 
> > x += my_val ; /* Critical section */ 
> > if ( my_rank == 0) 
> > 	ok_for_1 = true ; /* Let thread 1 update x */
> > ```
> > 
> > ### Komunikasi dan Manajemen I/O
> >
> > - **Message Passing:** Dalam model _distributed memory_, proses berkomunikasi dengan perintah `Send` dan `Receive`. Satu proses mengirim pesan, dan proses lain harus siap menerimanya.
> >     
> >
> > - **Input/Output (I/O):**
> >   - **Input (stdin):** Biasanya, hanya satu proses/thread (misalnya, *rank* 0) yang diizinkan membaca dari input standar untuk menghindari kekacauan.
> >   - **Output (stdout):** Semua proses/thread bisa menulis ke output, tetapi karena *nondeterminism*, urutannya tidak akan terjamin. Oleh karena itu, untuk output final, biasanya hanya satu proses/thread yang melakukannya, sementara yang lain digunakan untuk *debugging* (dengan menyertakan *rank/ID*).
> >   - **File I/O:** Aturan umumnya adalah tidak boleh ada dua proses/thread yang membuka dan menulis ke file yang sama secara bersamaan. Setiap proses/thread bisa mengelola filenya sendiri.
> >

> [!cornell] #### Summary
> Pemrograman paralel menuntut programmer untuk secara eksplisit mengelola paralelisme, umumnya menggunakan model _**thread-based**_ untuk _**shared memory**_ atau _**process-based**_ (message passing) untuk _**distributed memory**_. Gaya pemrograman SPMD memungkinkan satu basis kode untuk dijalankan oleh banyak entitas paralel yang dibedakan oleh ID unik mereka. Namun, pendekatan ini menimbulkan tantangan seperti _**nondeterminism**_ dan _**race condition**_, yang harus diatasi dengan mekanisme sinkronisasi seperti _**mutex**_ untuk melindungi _**critical section**_ dan memastikan kebenaran program.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Static vs. Dynamic Threads
> 
> Dalam model _thread-based_, ada dua cara mengelola _thread_:
> 
> - **Static Threads:** Sebuah _pool_ (kumpulan) _thread_ dibuat saat program dimulai dan tetap aktif menunggu pekerjaan. Mereka baru berhenti saat program selesai. Ini lebih efisien karena tidak ada _overhead_ pembuatan _thread_ berulang kali, tetapi bisa memboroskan sumber daya jika _thread_ lebih banyak diam.
>      
>  - **Dynamic Threads:** _Thread_ master hanya akan membuat _thread_ baru saat ada pekerjaan yang perlu dilakukan. Setelah selesai, _thread_ tersebut akan dihancurkan. Ini lebih hemat sumber daya tetapi memiliki _overhead_ yang signifikan dari proses pembuatan dan penghancuran _thread_ yang terus-menerus.
>      
> 
>  #### Analogi Sederhana: Race Condition di Dapur
> 
>  Bayangkan Anda dan teman Anda (_threads_) sedang membuat kue dan ada satu toples gula (_shared memory_). Resepnya bilang "tambahkan 1 cangkir gula".
> 
>  1. Anda membaca resep (_read_).
>      
>  2. Teman Anda juga membaca resep (_read_).
>      
>  3. Anda mengambil 1 cangkir gula (_compute & write_).
>      
>  4. Teman Anda juga mengambil 1 cangkir gula (compute & write).
>     
>     Hasilnya, kue menjadi terlalu manis karena ada 2 cangkir gula, padahal seharusnya hanya 1.
>      
>      Solusi Mutex: Letakkan "gembok" (lock) di toples gula. Siapa pun yang mau mengambil gula harus mengambil gemboknya dulu. Selama Anda memegang gembok, teman Anda harus menunggu. Setelah Anda selesai dan mengembalikan gembok, baru teman Anda bisa mengambilnya. Ini memastikan hanya satu orang yang mengakses toples gula pada satu waktu.
>      
> 
>  #### Eksplorasi Mandiri
> 
> - **Cari tahu tentang OpenMP:** Selain Pthreads dan MPI, OpenMP adalah model pemrograman paralel populer untuk _shared memory_. Ciri khasnya adalah penggunaan _directive_ atau `#pragma` di dalam kode C/C++/Fortran. Cari contoh sederhana "Hello World" menggunakan OpenMP dan bandingkan betapa mudahnya dibandingkan dengan membuat _thread_ secara manual.
> 