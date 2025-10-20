---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Fondasi GPGPU: Perbedaan Filosofi Desain CPU vs GPU dan Komputasi Heterogen
> 
> > ## Questions/Cues
> > 
> > - Apa itu GPGPU?
> >     
> > - Mengapa butuh komputasi paralel masif?
> >     
> > - Apa perbedaan desain inti CPU vs GPU?
> >     
> > - Apa itu desain berorientasi latensi?
> >     
> > - Apa itu desain berorientasi throughput?
> >     
> > - Bagaimana alokasi transistor berbeda?
> >     
> > - Apa itu komputasi heterogen?
> >     
> > - Kapan GPU tidak efektif?
> >     
> > 
> > ## Reference Points
> > 
> > - `7 - IF-3230-07-GPU-01-2022.pdf`
> >     
> > - `6a - IF3230-06a-GPU-2022.pdf`
> >     
> 
> > ### Apa itu GPGPU?
> > 
> > **GPGPU** adalah singkatan dari **General-Purpose computation on Graphics Processing Units**. Ini adalah sebuah paradigma di mana GPU, yang awalnya dirancang khusus untuk merender grafis komputer (seperti dalam video game), digunakan untuk melakukan komputasi untuk tujuan umum yang biasanya ditangani oleh CPU.
> > 
> > - **Evolusi**: GPU modern memiliki ribuan _core_ komputasi yang lebih sederhana, membuatnya ideal untuk tugas-tugas yang dapat dipecah menjadi banyak operasi independen dan identik (paralelisme data).
> >     
> > - **Pendorong Ekonomi**: Perkembangan pesat teknologi GPU didorong oleh industri game yang masif. Skala ekonomi ini membuat GPU menjadi perangkat keras komputasi paralel yang kuat dan relatif terjangkau.
> >     
> > - **Konsep Kunci**: Daripada hanya memproses piksel dan vertex untuk grafis, GPGPU memungkinkan kita memanfaatkan kekuatan ini untuk aplikasi ilmiah, analisis data, machine learning, dan banyak lagi.
> >     
> > 
> > ### Mengapa Butuh Komputasi Paralel Masif?
> > 
> > Kebutuhan ini muncul karena adanya **Massively Parallel Computing**, yaitu pendekatan komputasi yang menggunakan ribuan unit pemrosesan secara bersamaan. Tren perkembangan perangkat keras menunjukkan bahwa performa GPU telah melampaui CPU secara eksponensial dalam dua metrik kunci:
> > 
> > 1. **Computational Power (GFLOP/s)**: Kemampuan melakukan operasi floating-point per detik. GPU menunjukkan pertumbuhan yang jauh lebih cepat daripada CPU, terutama untuk kalkulasi presisi tunggal (_single precision_).
> >     
> > 2. **Memory Bandwidth (GB/s)**: Kecepatan transfer data antara prosesor dan memorinya. GPU memiliki bandwidth memori yang jauh lebih tinggi untuk mengimbangi kebutuhan data dari ribuan _core_-nya.
> >     
> > 
> > Grafik perbandingan historis jelas menunjukkan bahwa untuk tugas-tugas yang sangat paralel, arsitektur GPU menawarkan potensi percepatan yang luar biasa besar dibandingkan CPU.
> > 
> > ### Perbedaan Desain Inti: CPU vs. GPU
> > 
> > Perbedaan fundamental terletak pada filosofi desain mereka, yang ditentukan oleh tujuan utama masing-masing prosesor.
> > 
> > - **Analogi**: Bayangkan **CPU** sebagai seorang **koki master** yang sangat ahli, mampu menangani satu resep rumit dengan sangat cepat dari awal hingga akhir. Sebaliknya, **GPU** adalah **sebuah dapur besar dengan ribuan asisten koki**, di mana setiap asisten melakukan satu tugas sederhana (misalnya, memotong bawang) secara bersamaan. Untuk satu resep, koki master lebih cepat. Tapi untuk menyiapkan perjamuan bagi ribuan orang, dapur besar jauh lebih efisien.
> >     
> > 
> > Perbedaan ini mengarah pada dua jenis desain: _latency-oriented_ (CPU) dan _throughput-oriented_ (GPU).
> > 
> > ### Desain Berorientasi Latensi (CPU)
> > 
> > **Tujuan**: Mengeksekusi satu _thread_ atau tugas tunggal secepat mungkin. Latensi adalah waktu yang dibutuhkan untuk menyelesaikan satu instruksi atau tugas.
> > 
> > Untuk mencapai ini, CPU mendedikasikan sebagian besar area transistornya untuk:
> > 
> > 1. **Cache yang Besar**: Untuk menyimpan data yang sering diakses lebih dekat ke prosesor, mengubah akses memori utama (DRAM) yang lambat menjadi akses cache yang sangat cepat.
> >     
> > 2. **Unit Kontrol yang Canggih**:
> >     
> >     - **Branch Prediction**: Menebak jalur mana dari sebuah percabangan (`if-else`) yang akan diambil untuk menghindari jeda.
> >         
> >     - **Out-of-Order Execution**: Menjalankan instruksi tidak sesuai urutan program jika datanya sudah tersedia, untuk menjaga agar unit eksekusi tetap sibuk.
> >         
> >     - **Data Forwarding**: Mengirim hasil dari satu instruksi langsung ke instruksi berikutnya yang membutuhkannya tanpa harus menunggu ditulis ke memori.
> >         
> > 
> > Semua fitur ini bertujuan untuk meminimalkan waktu tunggu dan mempercepat eksekusi sebuah _thread_ tunggal.
> > 
> > ### Desain Berorientasi Throughput (GPU)
> > 
> > **Tujuan**: Memproses sebanyak mungkin _thread_ atau tugas secara bersamaan. Throughput adalah jumlah total pekerjaan yang diselesaikan dalam satu unit waktu. GPU tidak terlalu peduli seberapa cepat satu _thread_ selesai, tetapi seberapa banyak total pekerjaan yang bisa diselesaikan oleh semua _thread_.
> > 
> > Untuk mencapai ini, GPU mendedikasikan sebagian besar area transistornya untuk:
> > 
> > 1. **Banyak ALU (Arithmetic Logic Unit)**: Ribuan _core_ komputasi yang lebih sederhana.
> >     
> > 2. **Hardware Multithreading**: GPU menyembunyikan latensi akses memori yang panjang dengan cara yang cerdas. Ketika satu grup _thread_ (disebut _warp_) harus menunggu data dari memori, _scheduler_ perangkat keras GPU akan secara instan mengalihkan eksekusi ke _warp_ lain yang sudah siap. Dengan ribuan _thread_ yang tersedia, hampir selalu ada pekerjaan yang bisa dilakukan, sehingga _core_ komputasi tetap sibuk dan throughput tetap tinggi.
> >     
> > 
> > ### Perbedaan Alokasi Transistor
> > 
> > Visualisasi alokasi transistor pada chip menunjukkan perbedaan ini dengan jelas:
> > 
> > - **CPU**: Sebagian besar area digunakan untuk **Cache** dan **Control Unit**. Area untuk ALU relatif kecil.
> >     
> > - **GPU**: Sebagian besar area digunakan untuk **ALU**. Area untuk Cache dan Control Unit sangat kecil.
> >     
> > 
> > ### Komputasi Heterogen
> > 
> > Ini adalah model komputasi yang menggabungkan kedua jenis prosesor untuk mendapatkan yang terbaik dari keduanya. Aplikasi yang "menang" adalah yang menggunakan:
> > 
> > - **CPU** untuk bagian **sekuensial** dari program, di mana latensi sangat penting (misalnya, logika utama aplikasi, I/O, atau tugas-tugas kompleks yang tidak bisa diparalelkan).
> >     
> > - **GPU** untuk bagian **paralel** dari program, di mana throughput adalah kuncinya (misalnya, operasi pada array besar, simulasi fisika, atau training model neural network).
> >     
> > 
> > Kode berjalan di CPU (disebut **Host**) dan "meluncurkan" fungsi khusus (disebut **Kernel**) untuk dieksekusi secara paralel di GPU (disebut **Device**).
> > 
> > ### Kapan Kinerja GPU Tidak Bagus?
> > 
> > GPU bukanlah solusi untuk semua masalah. Kinerjanya akan buruk dalam skenario berikut:
> > 
> > - **Kurangnya Paralelisme**: Jika sebuah masalah pada dasarnya bersifat sekuensial dan tidak dapat dipecah menjadi banyak tugas kecil, GPU tidak akan memberikan manfaat.
> >     
> > - **Thread Divergence**: Jika _thread-thread_ dalam satu grup eksekusi (warp) mengambil jalur percabangan yang berbeda (misalnya, sebagian masuk ke `if` dan sebagian lagi ke `else`), eksekusi akan diserialisasi, yang menghapus keuntungan paralelisme.
> >     
> > - **Kebutuhan Memori Dinamis**: Alokasi memori di GPU biasanya dilakukan dari CPU dan bisa menjadi bottleneck. Algoritma yang sering membutuhkan alokasi memori dinamis tidak cocok untuk GPU.
> >     
> > - **Algoritma Rekursif**: GPU memiliki keterbatasan pada _memory stack_, sehingga tidak ideal untuk rekursi yang dalam.
> >     

> [!cornell] #### Summary
> 
> CPU dan GPU dirancang dengan filosofi yang berlawanan: CPU dioptimalkan untuk latensi rendah pada tugas-tugas sekuensial dengan mendedikasikan mayoritas transistornya untuk cache besar dan unit kontrol canggih, sementara GPU dioptimalkan untuk throughput tinggi pada komputasi paralel masif dengan mendedikasikan transistornya untuk ribuan core komputasi sederhana. Komputasi heterogen memanfaatkan kekuatan keduanya, di mana CPU menangani bagian sekuensial dan GPU mengakselerasi bagian paralel dari sebuah aplikasi, memberikan performa keseluruhan yang optimal.

> [!ad-libitum]- Additional Information
> 
> #### FLOPs vs. Bandwidth: Dua Sisi Mata Uang Kinerja
> 
> Penting untuk dipahami bahwa kekuatan komputasi (diukur dalam FLOPs - Floating Point Operations per Second) tidak ada artinya tanpa kemampuan untuk menyuplai data ke unit komputasi tersebut. GPU tidak hanya unggul dalam FLOPs, tetapi juga dalam **Memory Bandwidth**. Arsitektur memori GPU (seperti GDDR6) dirancang untuk mentransfer data dalam blok besar dengan sangat cepat, yang sangat cocok untuk pola akses data paralel. Sebaliknya, CPU menggunakan memori DDR yang dioptimalkan untuk latensi rendah pada akses data yang lebih kecil dan tidak terduga. Sebuah algoritma yang baik di GPU harus mampu memanfaatkan kedua kekuatan ini: komputasi masif dan bandwidth memori yang tinggi.
> 
> #### Relevansi Hukum Amdahl
> 
> Hukum Amdahl menyatakan bahwa percepatan keseluruhan dari sebuah program dibatasi oleh bagian dari program tersebut yang tidak dapat diparalelkan. Ini sangat relevan dalam komputasi heterogen. Sekalipun Anda dapat membuat bagian paralel berjalan 100x lebih cepat di GPU, jika 10% dari program Anda harus berjalan secara sekuensial di CPU, percepatan maksimal yang bisa Anda capai tidak akan pernah melebihi 10x. Ini menekankan pentingnya peran CPU dan perlunya menganalisis seluruh alur kerja aplikasi, bukan hanya bagian yang berjalan di GPU.
> 
> #### Eksplorasi Mandiri
> 
> - Coba cari diagram arsitektur chip (die shot) dari CPU modern (misalnya, Intel Core i9 atau AMD Ryzen 9) dan GPU modern (misalnya, NVIDIA GeForce RTX 4090 atau AMD Radeon RX 7900 XTX). Perhatikan secara visual seberapa besar porsi chip yang didedikasikan untuk core komputasi (ALU), cache (SRAM), dan unit kontrol. Ini akan memberikan gambaran nyata dari konsep yang dibahas.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - `7 - IF-3230-07-GPU-01-2022.pdf`: "CUDA" (Slide Deck, Fondasi CPU vs GPU)
>     
> - `6a - IF3230-06a-GPU-2022.pdf`: "paralel programming model: GPU" (Slide Deck, Konsep GPGPU dan Tren Kinerja)
>