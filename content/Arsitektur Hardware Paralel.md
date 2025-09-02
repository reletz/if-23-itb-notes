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
> > - Apa itu _Instruction Level Parallelism_ (ILP)?
> >     
> > - Apa itu _Pipelining_?
> > - Apa itu _Multiple issue_?
> >     
> > - Apa itu _Hardware Multithreading_?
> >     
> > - Apa saja 4 kategori Taksonomi Flynn?
> >     
> > - Apa itu arsitektur SIMD?
> >     
> > - Apa itu _Vector Processor_ & GPU?
> >     
> > - Apa itu arsitektur MIMD?
> >     
> > - Apa beda _Shared_ vs _Distributed Memory_?
> >     
> > - Apa itu UMA & NUMA?
> >     
> > - Apa masalah _Cache Coherence_?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3230-02-ParallelHardware-Software-2022.pdf
>     
> > 
> > ### Paralelisme Level Instruksi (ILP)
> > 
> > ILP adalah sekumpulan teknik yang digunakan prosesor untuk mengeksekusi beberapa instruksi secara bersamaan dalam satu _core_. Tujuannya adalah untuk meningkatkan performa tanpa harus menunggu satu instruksi selesai sepenuhnya sebelum memulai yang berikutnya.
> > 
> > - **Pipelining:** Memecah proses eksekusi sebuah instruksi menjadi beberapa tahapan (seperti jalur perakitan). Saat tahap pertama dari instruksi A selesai, tahap pertama dari instruksi B bisa langsung dimulai tanpa menunggu seluruh instruksi A selesai. Ini memungkinkan banyak instruksi berada dalam berbagai tahap eksekusi secara bersamaan.
> > 	- _Contoh_: Misalkan operasi penjumlahan *floating point* membutuhkan 7 tahap (Fetch, Compare, Shift, Add, Normalize, Round, Store), dan setiap tahap butuh 1 nanosekon. 
> > 	
> > 		![[Pasted image 20250902081518.png]]
> > 		- **Tanpa Pipelining:** Satu penjumlahan butuh 7 ns. Untuk menjumlahkan 1000 pasang angka (`for i=0 to 999, z[i]=x[i]+y[i]`), total waktu yang dibutuhkan adalah `1000 * 7 ns = 7000 ns`. 
> > 		- **Dengan Pipelining:** Hasil pertama keluar pada nanosekon ke-7. Namun, hasil kedua keluar pada nanosekon ke-8, hasil ketiga pada nanosekon ke-9, dan seterusnya. Total waktu untuk 1000 penjumlahan menjadi `7 ns (untuk hasil pertama) + 999 ns (untuk 999 hasil berikutnya) = 1006 ns`. Ini adalah percepatan hampir 7x lipat.
> > 	
> > 			![[Pasted image 20250902081437.png]]
> >     
> > - **Multiple Issue:** Menyediakan beberapa unit eksekusi fungsional (misalnya, beberapa unit penambahan) sehingga prosesor dapat memulai eksekusi beberapa instruksi yang tidak saling bergantung dalam satu siklus _clock_ yang sama.
> > 	- _Contoh_: Pada loop `z[i]=x[i]+y[i]`, jika prosesor memiliki dua unit penambahan (*adder*), ia bisa menghitung `z[0]=x[0]+y[0]` dan `z[1]=x[1]+y[1]` pada saat yang bersamaan. 
> > 	- **Jenis:** *Static Multiple Issue* (penjadwalan instruksi dilakukan oleh *compiler* saat kompilasi) dan *Dynamic Multiple Issue* atau *Superscalar* (penjadwalan dilakukan oleh *hardware* saat eksekusi).
> > 	- Teknik ini akan terhenti (*stall*) saat menghadapi percabangan (`if-else`) karena prosesor tidak tahu jalur mana yang harus dieksekusi. Untuk mengatasinya, digunakan **spekulasi**: prosesor "menebak" hasil dari percabangan dan mulai mengeksekusi instruksi di jalur yang paling mungkin agar unit eksekusi tidak menganggur.
> > 		- _Contoh_: 
> > 			![[Pasted image 20250902082236.png]]
> > 
> > ### Hardware Multithreading
> > 
> > Teknik ini memungkinkan satu _core_ prosesor untuk menangani beberapa _threads_ (alur eksekusi) secara bersamaan. Tujuannya adalah untuk menjaga _core_ tetap sibuk. Jika satu _thread_ berhenti (misalnya, menunggu data dari memori), _core_ dapat langsung beralih mengerjakan _thread_ lain.
> > 
> > - **Fine-grained:** Beralih antar _thread_ setelah setiap instruksi.
> > 	- **Pro:** Berpotensi untuk menghindari waktu mesin yang terbuang karena *stall*. 
> > 	- **Kontra:** Sebuah *thread* yang siap mengeksekusi banyak instruksi berurutan mungkin harus menunggu giliran untuk setiap instruksinya, sehingga bisa jadi malah melambat.
> >     
> > - **Coarse-grained:** Hanya beralih _thread_ saat terjadi jeda yang panjang (misalnya, _cache miss_).
> > 	- **Pro:** Proses peralihan tidak harus secepat kilat, sehingga *overhead*-nya lebih kecil. 
> > 	- **Kontra:** Prosesor bisa tetap menganggur saat terjadi jeda-jeda singkat, dan proses peralihan itu sendiri juga menimbulkan sedikit penundaan.
> >     
> > - **Simultaneous Multithreading (SMT):** Dikenal sebagai _Hyper-Threading_ oleh Intel. Ini adalah variasi dari _fine-grained multithreading_ yang memungkinkan beberapa _thread_ untuk menggunakan unit-unit eksekusi fungsional yang berbeda di dalam satu _core_ **pada saat yang bersamaan**. Ini memaksimalkan utilisasi _hardware_ di dalam _core_.
> >     
> > 
> > ### Taksonomi Flynn
> > 
> > Ini adalah klasifikasi klasik untuk arsitektur komputer berdasarkan jumlah alur instruksi (_instruction stream_) dan alur data (_data stream_).
> > 
> > - **SISD (Single Instruction, Single Data):** Komputer sekuensial tradisional. Satu instruksi memproses satu data pada satu waktu.
> >     
> > - **SIMD (Single Instruction, Multiple Data):** Satu instruksi dieksekusi secara serentak pada banyak data yang berbeda. Ini adalah inti dari _data parallelism_.
> >     
> > - **MISD (Multiple Instruction, Single Data):** Beberapa instruksi berbeda beroperasi pada data yang sama. Sangat jarang diimplementasikan.
> >     
> > - **MIMD (Multiple Instruction, Multiple Data):** Beberapa instruksi berbeda secara serentak memproses beberapa data yang berbeda. Ini adalah arsitektur yang paling umum untuk komputer paralel modern (_multicore_).
> >     
> > 
> > ### Arsitektur SIMD: Vector Processor dan GPU
> > 
> > Arsitektur SIMD adalah perwujudan _data parallelism_, di mana satu instruksi diterapkan ke banyak data sekaligus. Arsitektur SIMD sangat efisien untuk tugas-tugas yang repetitif pada data dalam jumlah besar. 
> > 
> > ![[Pasted image 20250902083852.png]]
> > 
> > Model SIMD ini memiliki beberapa kelemahan, yakni tidak fleksibel (semua ALU harus seragam atau diam), harus sinkron, dan terbatas hanya untuk masalah _data-parallel_ yang seragam. Perlu diingat juga bahwa ALU tidak mempunyai kemampuan menyimpan data. 
> > 
> > Untuk itu, terdapat dua modifikasi SIMD yang mencoba mengatasi hal tersebut:
> > 
> > - **Vector Processors:** CPU khusus yang memiliki instruksi yang dapat melakukan satu operasi (misalnya, penjumlahan) pada seluruh larik (vektor) data sekaligus.
> > 
> > 	![[Pasted image 20250902084712.png]]
> > 	
> > 	- **Fitur:** Memiliki *Vector Registers*, *Pipelined Units*, *Vector Instructions*, dan *Interleaved Memory*.
> > 	- **Kelebihan:** Sangat cepat, mudah digunakan karena adanya *vectorizing compilers*, dan punya bandwidth memori tinggi. 
> > 	- **Kekurangan:** Kurang fleksibel untuk struktur data tidak teratur dan skalabilitasnya terbatas.
> >     
> > - **GPU (Graphics Processing Unit):** Berevolusi menjadi prosesor paralel masif dengan ribuan _core_ sederhana, ideal untuk mengeksekusi instruksi yang sama pada ribuan data secara bersamaan.
> > 	- **Cara Kerja:** GPU menggunakan *pipeline* grafis untuk mengubah representasi internal objek (titik, garis, segitiga) menjadi piksel di layar. Beberapa tahapan *pipeline* ini, yang disebut ***shader functions***, dapat diprogram. Fungsi-fungsi ini bersifat **implisit paralel** karena diterapkan pada ribuan elemen (misalnya, piksel) secara bersamaan, yang pada dasarnya adalah operasi SIMD. 
> > 	- **Arsitektur:** Terdiri dari ribuan *core* sederhana, ideal untuk mengeksekusi instruksi yang sama pada ribuan data secara bersamaan. 
> > 	- **Jenis:** 
> > 		- **Integrated:** GPU berada dalam satu *chip* yang sama dengan CPU. 
> > 		- **Discrete:** GPU berada di kartu grafis terpisah, memiliki memorinya sendiri (DRAM), dan terhubung ke CPU melalui bus PCI. Komunikasi melalui bus ini menimbulkan *overhead*.
> >     
> > 
> > ### Arsitektur MIMD: Otak dari Komputasi Paralel Modern
> > 
> > Sistem MIMD terdiri dari banyak unit pemrosesan yang sepenuhnya independen, masing-masing dengan unit kontrol dan ALU-nya sendiri.
> > 
> > #### Shared-Memory Systems
> >  ![[Pasted image 20250902083057.png]]
> > - **Konsep:** Semua prosesor/core terhubung ke satu ruang memori utama (RAM) yang sama.
> >     
> > - **Jenis:**
> >     
> >     - **UMA (Uniform Memory Access):** Waktu yang dibutuhkan setiap _core_ untuk mengakses lokasi memori mana pun adalah sama. Umum pada PC dan laptop _multicore_.
> > 	    ![[Pasted image 20250902083118.png]]
> >         
> >     - **NUMA (Non-Uniform Memory Access):** Terdiri dari beberapa _chip_ prosesor. Sebuah _core_ dapat mengakses memori yang terhubung langsung dengannya lebih cepat daripada memori yang terhubung ke _chip_ lain.
> > 	    ![[Pasted image 20250902083132.png]]
> >         
> > 
> > #### Distributed-Memory Systems
> > 
> > - **Konsep:** Setiap prosesor memiliki memorinya sendiri yang bersifat privat. Tidak ada prosesor yang dapat mengakses memori milik prosesor lain secara langsung.
> >     
> > - **Komunikasi:** Prosesor harus berkomunikasi secara eksplisit melalui jaringan interkoneksi untuk bertukar data.
> >     
> > - **Implementasi Umum:** _Cluster_, yaitu kumpulan komputer komoditas (disebut _node_) yang dihubungkan oleh jaringan berkecepatan tinggi.
> >
> > ![[Pasted image 20250902085508.png]]
> > ![[Pasted image 20250902085514.png]]
> > 
> >     

> [!cornell] #### Summary
> Arsitektur hardware paralel modern menggunakan berbagai strategi berlapis, mulai dari mengeksekusi beberapa instruksi dalam satu _**core**_ (ILP, SMT) hingga menggunakan banyak _**core**_ dalam satu sistem (MIMD). Sistem ini secara fundamental dibedakan oleh model memorinya: sistem _**Shared-Memory**_ (seperti UMA dan NUMA) memungkinkan komunikasi implisit melalui memori bersama, yang menimbulkan tantangan _**Cache Coherence**_. Sebaliknya, sistem _**Distributed-Memory**_ (seperti _**cluster**_) menuntut komunikasi eksplisit antar prosesor melalui jaringan. Arsitektur khusus seperti GPU juga memainkan peran penting dengan menyediakan kemampuan SIMD secara masif untuk tugas _**data-parallel**_.

> [!ad-libitum]- Additional Information
>  
>  #### Analogi Sederhana: Tim Penulis di Google Docs vs. Email
>  
>  - **Shared-Memory (Google Docs):** Semua penulis (cores) bekerja pada satu dokumen yang sama (shared memory). Perubahan yang dibuat oleh satu penulis akan langsung terlihat oleh yang lain. Ini sangat efisien, tetapi bisa menimbulkan masalah jika dua orang mengedit kalimat yang sama secara bersamaan (_race condition_ dan _cache coherence_).
>      
>  - **Distributed-Memory (Email):** Setiap penulis (processor) memiliki salinan drafnya sendiri (local memory). Untuk berkolaborasi, mereka harus secara eksplisit mengirimkan versi terbaru draf mereka melalui email (message passing) kepada yang lain. Tidak ada risiko dua orang mengedit kalimat yang sama secara bersamaan, tetapi ada _overhead_ dari proses mengirim dan menerima email.
>      
>  
>  #### Eksplorasi Mandiri
>   - **Cari Tahu Topologi Jaringan Superkomputer:** Cari di internet "Top500 Supercomputers". Pilih salah satu superkomputer teratas dan cari tahu jenis jaringan interkoneksi yang digunakannya (misalnya, InfiniBand, Slingshot, dll.). Ini akan memberi Anda gambaran tentang betapa pentingnya "sistem peredaran darah" pada sistem skala besar.
>