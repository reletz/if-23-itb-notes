---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Kinerja Memori Global: DRAM, Bursting, dan Memory Coalescing
> 
> > ## Questions/Cues
> >
> > - Mengapa bandwidth DRAM penting?
> >     
> > - Bagaimana cara kerja DRAM?
> >     
> > - Apa itu DRAM Bursting?
> >     
> > - Apa itu DRAM Banks & Channels?
> >     
> > - Apa itu Memory Coalescing?
> >     
> > - Mengapa Coalescing penting?
> >     
> > - Bagaimana cara mengetahui akses _coalesced_?
> >     
> > - Contoh akses coalesced vs. non-coalesced
> >     
> > - Apa solusi untuk akses non-coalesced?
> >     
> >
> > ## Reference Points
> >
> > - `7 - IF-3230-07-GPU-04-2022.pdf`
> >     
> 
> > ### Pentingnya Bandwidth Global Memory (DRAM)
> >
> > Kinerja aplikasi GPU seringkali dibatasi oleh **bandwidth memori**—seberapa cepat data dapat dipindahkan antara DRAM (Global Memory) dan Streaming Multiprocessor (SM).
> >
> > - **Ideal vs. Realita**: Secara ideal, kita ingin data mengalir deras seperti air dari bendungan. Namun, pada kenyataannya, mengakses setiap data secara individual lebih mirip seperti menyedot minuman melalui sedotan. Kuncinya adalah mengambil data dalam jumlah besar sekaligus untuk memaksimalkan throughput.
> >     
> >
> > ### Cara Kerja Perangkat Keras DRAM
> >
> > Untuk memahami mengapa akses memori GPU memiliki karakteristik tertentu, kita perlu melihat cara kerja DRAM:
> >
> > 1. **Core Array yang Lambat**: Inti chip DRAM (tempat data disimpan dalam kapasitor kecil) sebenarnya sangat lambat. Kecepatan antarmuka (pin) DRAM jauh lebih cepat daripada kecepatan inti internalnya (bisa 8x lebih cepat atau lebih).
> >     
> > 2. **DRAM Bursting**: Untuk mengatasi kelambatan ini, DRAM dirancang untuk tidak membaca satu data, melainkan satu **blok data besar** sekaligus dari baris yang sama. Data ini dibaca dari inti yang lambat ke buffer internal berkecepatan tinggi, lalu dikirim keluar melalui antarmuka yang cepat secara berurutan. Proses ini disebut _bursting_. Artinya, mengambil satu `float` sama mahalnya dengan mengambil beberapa `float` di sekitarnya.
> >     
> > 3. **DRAM Banks & Channels**: Untuk meningkatkan paralelisme akses, memori DRAM dibagi menjadi beberapa _channel_, dan setiap _channel_ dibagi lagi menjadi beberapa _bank_. Ini memungkinkan beberapa permintaan akses memori dilayani secara bersamaan, asalkan permintaan tersebut ditujukan ke bank yang berbeda.
> >     
> >
> > ### Apa itu Memory Coalescing?
> >
> > **Memory Coalescing** adalah situasi ideal di mana **semua 32 thread dalam satu Warp** mengakses lokasi memori yang berdekatan dan selaras, sehingga permintaan akses mereka dapat dipenuhi oleh **satu transaksi DRAM burst tunggal**.
> >
> > - **Akses Coalesced (Efisien)**: Ketika 32 thread meminta 32 `float` yang berurutan, GPU dapat mengambil satu segmen memori 128-byte (32 * 4 byte) dalam satu kali permintaan. Seluruh data yang diambil digunakan. Bandwidth dimanfaatkan 100%.
> >     
> >
> > - **Akses Non-Coalesced / Un-coalesced (Tidak Efisien)**: Ketika 32 thread meminta data dari lokasi yang terpencar-pencar, GPU terpaksa mengeluarkan **beberapa transaksi DRAM burst**. Sebagian besar data yang diambil dalam setiap _burst_ akan dibuang karena tidak diminta oleh thread mana pun. Bandwidth terbuang sia-sia dan performa turun drastis.
> >     
> >
> > ### Bagaimana Mengetahui Sebuah Akses Coalesced?
> >
> > Aturan praktis yang paling umum untuk array 1D adalah:
> >
> > Sebuah akses dikatakan _coalesced_ jika indeks yang diakses oleh thread-thread dalam satu warp berbentuk:
> >
> > ```
> > A[ (ekspresi_dasar) + threadIdx.x ];
> > ```
> >
> > Di mana `ekspresi_dasar` adalah nilai yang **sama (warp-uniform)** untuk semua thread dalam warp tersebut. Ini memastikan bahwa `threadIdx.x` yang berurutan (0, 1, 2, ...) akan mengakses lokasi memori yang juga berurutan.
> >
> > ### Studi Kasus: Perkalian Matriks Naif
> >
> > Mari kita analisis pola akses memori pada kernel perkalian matriks dasar. Ingat bahwa matriks 2D disimpan dalam memori 1D secara _row-major_.
> >
> > `P[Row][Col] = M[Row][k] * N[k][Col];`
> >
> > - **Akses ke Matriks N (Coalesced)**:
> >     
> > 	- Indeks linear: `N[k * Width + Col]`.
> > 	- `Col` dihitung sebagai `blockIdx.x * blockDim.x + threadIdx.x`.
> > 	- `k * Width` dan `blockIdx.x * blockDim.x` adalah *ekspresi dasar* yang sama untuk semua thread dalam warp.
> > 	- Karena `threadIdx.x` bertambah secara berurutan, thread-thread dalam warp akan mengakses **elemen-elemen yang berdekatan dalam satu baris** matriks N. Ini adalah akses yang **coalesced**.
> > 
> >
> > - **Akses ke Matriks M (Non-Coalesced)**:
> >     
> > 	- Indeks linear: `M[Row * Width + k]`.
> > 	- `Row` dihitung menggunakan `threadIdx.y` dan `blockIdx.y`. `k` adalah variabel loop.
> > 	- Untuk thread-thread dalam satu warp, `threadIdx.x` berubah-ubah, tetapi `Row` tetap relatif konstan.
> > 	- Akibatnya, thread-thread dalam satu warp akan mengakses elemen-elemen yang **terpencar dengan jarak `Width` byte** (mengakses kolom yang sama di baris yang berbeda). Ini adalah akses *strided* yang sangat **tidak efisien dan non-coalesced**.
> > 
> > ### Solusi: "Corner Turning" Menggunakan Shared Memory
> >
> > Pola akses yang buruk pada matriks M adalah penyebab utama performa rendah pada kernel naif. Teknik _tiling_ yang dibahas sebelumnya memecahkan masalah ini dengan sebuah strategi yang disebut **"corner turning"**:
> >
> > 1. **Muat secara Coalesced**: Muat _tile_ dari matriks M dan N ke dalam _shared memory_. Lakukan pemuatan ini dengan pola akses yang **selalu coalesced**. Ini mungkin berarti setiap thread memuat elemen yang berbeda dari yang akan ia proses nanti.
> >     
> > 2. **Sinkronisasi**: Gunakan `__syncthreads()` untuk memastikan seluruh _tile_ sudah ada di _shared memory_.
> >     
> > 3. **Akses dari Shared Memory**: Lakukan komputasi perkalian dengan mengakses data dari _shared memory_ yang super cepat. Karena data sudah ada di on-chip, pola akses (misalnya, mengakses kolom dari _tile_ M) tidak lagi menjadi masalah performa.
> >     
> >
> > Dengan cara ini, kita mengubah akses global memory yang lambat dan non-coalesced menjadi akses _shared memory_ yang cepat, meskipun pola aksesnya sendiri tidak berubah.

> [!cornell] #### Summary
> 
> Kinerja GPU sangat bergantung pada pemanfaatan bandwidth memori global (DRAM) secara efisien, yang dicapai melalui memory coalescing. Coalescing terjadi ketika semua thread dalam satu Warp mengakses lokasi memori yang berurutan, memungkinkan permintaan mereka dipenuhi oleh satu transaksi DRAM burst. Akses yang non-coalesced atau strided akan menyebabkan pemborosan bandwidth yang parah. Oleh karena itu, merancang kernel dengan pola akses data yang coalesced, atau menggunakan shared memory untuk memperbaiki pola akses yang buruk (corner turning), adalah salah satu teknik optimasi paling fundamental dan penting dalam pemrograman CUDA.

> [!ad-libitum]- Additional Information
> 
> #### Aturan Coalescing pada Arsitektur Berbeda
> 
> Aturan untuk memory coalescing telah berevolusi seiring dengan arsitektur GPU:
> 
> - **Compute Capability 1.x (GPU Tua)**: Aturannya sangat ketat. Thread pertama dalam _half-warp_ (16 thread) harus mengakses alamat yang merupakan kelipatan dari ukuran segmen memori, dan semua thread lain harus mengakses lokasi yang berurutan setelahnya.
>     
> - **Compute Capability 2.x (Fermi) dan Lebih Baru**: Aturannya jauh lebih fleksibel. Selama thread-thread dalam satu Warp mengakses data yang berada dalam segmen L1 cache line (biasanya 128-byte), perangkat keras dapat "menggabungkan" permintaan tersebut. Urutan akses tidak lagi penting. Ini membuat pemrograman menjadi lebih mudah karena pola akses yang sedikit tidak teratur masih bisa mencapai coalescing penuh.
>     
> 
> #### Aligned vs. Unaligned Access
> 
> Meskipun aturan coalescing modern lebih fleksibel, performa terbaik tetap dicapai ketika akses selaras (_aligned_). Ini berarti alamat awal dari segmen memori yang diakses oleh sebuah Warp adalah kelipatan dari ukuran segmen tersebut (misalnya, kelipatan 128). Jika aksesnya _unaligned_ (misalnya, dimulai dari alamat 4-byte), maka Warp tersebut mungkin perlu mengakses _dua_ segmen cache line 128-byte, yang mengakibatkan dua transaksi memori, meskipun semua thread mengakses data yang berdekatan.
> 
> #### Eksplorasi Mandiri
> 
> - Coba modifikasi kernel penjumlahan vektor sederhana. Buat dua versi:
>     
>     1. **Coalesced**: `C[i] = A[i] + B[i];`
>         
>     2. **Strided (Non-coalesced)**: `C[i] = A[i * 2] + B[i * 2];` atau `C[i * 2] = A[i * 2] + B[i * 2];`
>         
> - Gunakan **NVIDIA Nsight Compute** (profiler) untuk menjalankan kedua kernel tersebut. Lihat metrik "Global Memory Load/Store Efficiency". Anda akan melihat efisiensi mendekati 100% untuk versi coalesced dan angka yang jauh lebih rendah untuk versi strided. Ini memberikan bukti nyata dampak dari coalescing.
>