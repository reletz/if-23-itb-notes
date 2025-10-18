---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Teknik Optimasi Fundamental: Tiled Algorithm dan Barrier Synchronization
> 
> > ## Questions/Cues
> >
> > - Apa ide dasar Tiling?
> >     
> > - Mengapa Tiling sangat efektif?
> >     
> > - Analogi Tiling: Carpooling
> >     
> > - Apa itu Barrier Synchronization?
> >     
> > - Mengapa `__syncthreads()` esensial?
> >     
> > - Bagaimana alur eksekusi Tiled Algorithm?
> >     
> > - Studi Kasus: Tiled Matrix Multiplication
> >     
> > - Bagaimana Tiling mengurangi akses memori?
> >     
> > - Apa pertimbangan ukuran Tile?
> >     
> >
> > ## Reference Points
> >
> > - `7 - IF-3230-07-GPU-03-2022.pdf`
> >     
> > - `6a - IF3230-06a-GPU-2022.pdf`
> >     
> 
> > ### Ide Dasar Tiling (Blocking)
> >
> > **Tiling** adalah sebuah teknik optimasi fundamental untuk mengatasi _bottleneck_ akses Global Memory. Idenya adalah untuk secara drastis mengurangi lalu lintas ke memori utama yang lambat dengan memaksimalkan penggunaan kembali data dari Shared Memory yang sangat cepat.
> >
> > **Prosesnya**:
> >
> > 1. Partisi data input yang besar di Global Memory menjadi blok-blok kecil yang disebut **"tile"** atau "ubin".
> >     
> > 2. Sebuah _thread block_ secara kolektif memuat satu _tile_ dari Global Memory ke Shared Memory **hanya sekali**.
> >     
> > 3. Semua _thread_ dalam block tersebut kemudian melakukan komputasi intensif dengan mengakses data dari _tile_ yang sudah ada di Shared Memory berulang kali.
> >     
> > 4. Setelah selesai dengan satu _tile_, block tersebut melanjutkan ke _tile_ berikutnya.
> >     
> >
> > ### Analogi Tiling: Carpooling (Nebeng Mobil)
> >
> > Bayangkan Global Memory adalah sebuah kantor yang jauh, dan setiap thread adalah seorang pekerja yang butuh data dari sana.
> >
> > - **Tanpa Tiling**: Setiap pekerja (`thread`) mengendarai mobilnya sendiri (`memory request`) ke kantor (`Global Memory`) setiap kali ia butuh sesuatu. Ini menyebabkan kemacetan parah di jalan raya (`memory bus`).
> >     
> > - **Dengan Tiling**: Para pekerja dalam satu departemen (`thread block`) sepakat untuk **carpooling**. Satu mobil (`satu set memory request yang coalesced`) pergi ke kantor untuk mengambil semua dokumen yang dibutuhkan (`tile`) dan membawanya kembali ke ruang rapat departemen (`Shared Memory`). Setelah itu, semua pekerja bisa mengakses dokumen dari meja rapat dengan sangat cepat tanpa harus pergi ke kantor lagi. Ini secara drastis mengurangi kemacetan.
> >     
> >
> > ### Barrier Synchronization (`__syncthreads()`)
> >
> > _Carpooling_ membutuhkan koordinasi. Semua orang harus sudah masuk ke dalam mobil sebelum mobil berangkat. Dalam CUDA, koordinasi ini dilakukan dengan **Barrier Synchronization**.
> >
> > - **Definisi**: `__syncthreads()` adalah sebuah instruksi yang menghentikan eksekusi setiap _thread_ dalam sebuah block di titik tersebut. Eksekusi tidak akan dilanjutkan sampai **SEMUA** _thread_ dalam block yang sama telah mencapai titik `__syncthreads()` ini.
> >     
> > - **Scope**: Hanya berlaku untuk _thread_ di dalam **satu block**. Tidak ada cara untuk mensinkronisasi antar block yang berbeda.
> >     
> > - **Pentingnya**: Ini krusial untuk menjaga kebenaran data dalam _tiled algorithm_. Tanpanya, bisa terjadi _race condition_ di mana sebagian _thread_ sudah mulai menghitung menggunakan data di Shared Memory, sementara _thread_ lain bahkan belum selesai menulis data ke sana.
> >     
> >
> > ### Alur Eksekusi Tiled Algorithm
> >
> > Sebuah _tiled algorithm_ beroperasi dalam **fase-fase** yang dikoordinasikan oleh `__syncthreads()`:
> >
> > 1. **Fase Pemuatan (Load Phase)**: Setiap _thread_ dalam block membaca satu bagian dari _tile_ dari Global Memory dan menulisnya ke Shared Memory.
> >     
> > 2. **`__syncthreads()`**: Menunggu semua _thread_ selesai memuat. Memastikan seluruh _tile_ utuh di Shared Memory.
> >     
> > 3. **Fase Komputasi (Compute Phase)**: Setiap _thread_ melakukan perhitungan menggunakan data yang kini tersedia di Shared Memory yang cepat.
> >     
> > 4. **`__syncthreads()`**: (Jika ada iterasi berikutnya) Menunggu semua _thread_ selesai menggunakan data _tile_ saat ini sebelum block melanjutkan untuk memuat _tile_ baru di iterasi selanjutnya.
> >     
> >
> > ### Studi Kasus: Tiled Matrix Multiplication
> >
> > Mari kita terapkan Tiling pada perkalian matriks `P = M * N`.
> >
> > - **Strategi**: Setiap _thread block_ bertanggung jawab untuk menghitung satu sub-matriks (tile) dari matriks P, sebut saja `P_sub`. Untuk melakukan ini, block tersebut akan secara berulang memuat tile-tile yang relevan dari M dan N ke Shared Memory.
> >     
> >
> > - **Alur Kerja Konseptual**:
> > 	1.  Setiap *thread* dalam block diberikan satu elemen dari `P_sub` untuk dihitung, yang disimpan dalam register privat (`Pvalue`).
> > 	2.  Program masuk ke dalam sebuah loop yang berjalan sebanyak jumlah *tile* yang ada di lebar matriks M.
> > 	3.  Di setiap iterasi loop:
> > 	      - **Pemuatan**: Setiap *thread* memuat satu elemen dari *tile* M saat ini dan satu elemen dari *tile* N saat ini ke dalam array Shared Memory `ds_M` dan `ds_N`.
> > 	      - **Sinkronisasi**: `__syncthreads()` dipanggil untuk memastikan seluruh *tile* M dan N sudah berada di Shared Memory sebelum ada *thread* yang mulai menghitung.
> > 	      - **Komputasi**: Setiap *thread* melakukan perkalian-akumulasi (dot product) menggunakan baris dari `ds_M` dan kolom dari `ds_N` untuk mengakumulasi hasil ke dalam `Pvalue`-nya.
> > 	      - **Sinkronisasi**: `__syncthreads()` dipanggil lagi untuk memastikan semua *thread* sudah selesai menggunakan data di `ds_M` dan `ds_N` sebelum iterasi loop berikutnya dimulai (yang akan menimpa isi Shared Memory dengan *tile* baru).
> > 	1.  Setelah loop selesai, setiap *thread* menulis nilai akhir `Pvalue`-nya ke lokasi yang benar di matriks P di Global Memory.
> > 
> >
> > ### Analisis Pengurangan Bandwidth Memori
> >
> > Tiling secara dramatis mengubah rasio komputasi terhadap akses memori.
> >
> > - **Tanpa Tiling**: Untuk setiap 1 operasi _multiply-add_, kita butuh 2 akses Global Memory (satu dari M, satu dari N).
> >     
> > - **Dengan Tiling (TILE_WIDTH=16)**:
> >     
> >     - Setiap _thread block_ (256 threads) memuat `2 * 256 = 512` float dari Global Memory per fase.
> >         
> >     - Block tersebut kemudian melakukan `256 * 16 * 2 = 8192` operasi floating point (16 _multiply-add_ per thread).
> >         
> >     - Rasionya menjadi `8192 ops / 512 floats = 16` operasi per float yang dimuat.
> >         
> >
> > Kita meningkatkan efisiensi penggunaan data sebanyak **16 kali lipat**. Ini mengubah kernel dari yang tadinya _memory-bound_ menjadi lebih _compute-bound_, memungkinkan kita untuk lebih mendekati performa puncak teoritis GPU.
> >
> > ### Pertimbangan Ukuran Tile (Block)
> >
> > Ukuran _tile_ (yang biasanya sama dengan ukuran _thread block_) adalah parameter penting untuk tuning.
> >
> > - **Tile Lebih Besar (misal, 32x32)**:
> > 	- **Pro**: Meningkatkan rasio komputasi-ke-memori (menjadi 32x), yang secara teori lebih baik.
> > 	- **Kontra**: Mengkonsumsi lebih banyak Shared Memory dan Register per block. Ini akan mengurangi jumlah *thread block* yang bisa berjalan secara bersamaan di satu SM (menurunkan *occupancy*), yang bisa jadi kontra-produktif karena mengurangi kemampuan hardware untuk menyembunyikan latensi.
> > 
> >
> > - **Tile Lebih Kecil (misal, 8x8)**:
> >     
> > 	- **Pro**: Kebutuhan resource per block lebih kecil, memungkinkan lebih banyak block berjalan bersamaan di satu SM (*higher occupancy*).
> > 	- **Kontra**: Rasio komputasi-ke-memori lebih rendah (hanya 8x).
> >
> > Ukuran **16x16** (256 threads/block) atau **32x32** (1024 threads/block) seringkali menjadi titik awal yang baik, namun ukuran optimal bergantung pada arsitektur GPU spesifik.

> [!cornell] #### Summary
> 
> Tiling adalah teknik optimasi esensial yang mengubah algoritma memory-bound menjadi compute-bound dengan cara memaksimalkan penggunaan kembali data. Dengan membuat thread-thread dalam satu block bekerja sama untuk memuat "ubin" data dari Global Memory ke Shared Memory yang cepat, dan kemudian melakukan komputasi berulang kali dari sana, Tiling secara dramatis mengurangi lalu lintas ke memori utama. Teknik ini bergantung sepenuhnya pada __syncthreads() untuk barrier synchronization, yang memastikan integritas data selama alur eksekusi multi-fase (load-compute-load-compute) di dalam block.

> [!ad-libitum]- Additional Information
> 
> #### Menangani Ukuran Matriks Sembarang
> 
> Kernel yang disajikan di atas mengasumsikan dimensi matriks adalah kelipatan dari ukuran _tile_. Dalam aplikasi nyata, ini jarang terjadi. Solusinya adalah dengan menambahkan **pemeriksaan batas (boundary checks)** di dalam kernel:
> 
> 1. **Saat Memuat**: Sebelum memuat elemen `M[row][col]` ke Shared Memory, _thread_ harus memeriksa apakah `row` dan `col` berada di dalam batas matriks M yang sebenarnya. Jika tidak, _thread_ harus memuat nilai 0.0f ke Shared Memory. Hal yang sama berlaku untuk matriks N.
>     
> 2. **Saat Menyimpan**: Sebelum _thread_ menulis hasil `Pvalue` ke `P[row][col]`, ia harus memeriksa apakah `row` dan `col` berada di dalam batas matriks P.
>     
> 
> Pendekatan ini memastikan tidak ada akses memori di luar batas dan elemen "hantu" yang dimuat sebagai nol tidak akan mempengaruhi hasil perkalian matriks.
> 
> #### Shared Memory Bank Conflicts
> 
> Shared Memory secara fisik terorganisir dalam beberapa _bank_ memori (misalnya, 32 bank). Akses bisa terjadi secara paralel penuh jika setiap _thread_ dalam satu _warp_ mengakses _bank_ yang berbeda. Namun, jika beberapa _thread_ dalam satu _warp_ mengakses _bank_ yang sama, terjadi **bank conflict** dan akses tersebut diserialisasi, yang dapat menurunkan performa. Ini adalah topik optimasi tingkat lanjut, di mana programmer mungkin perlu menyesuaikan cara data diletakkan di Shared Memory untuk menghindari konflik ini.
> 
> #### Eksplorasi Mandiri
> 
> - Coba pikirkan bagaimana Anda akan menerapkan Tiling pada algoritma lain yang telah kita bahas, seperti konvolusi 2D. Apa yang menjadi "tile"? Bagaimana alur kerja load-sync-compute-nya?
>