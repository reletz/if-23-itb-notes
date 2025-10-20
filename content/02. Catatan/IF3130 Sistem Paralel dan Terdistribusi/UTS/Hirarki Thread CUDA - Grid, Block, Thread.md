---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Organisasi Paralelisme CUDA: Hierarki Grid, Block, dan Thread
> 
> > ## Questions/Cues
> >
> > - Apa itu hierarki thread CUDA?
> >     
> > - Apa peran Grid?
> >     
> > - Apa peran Thread Block?
> >     
> > - Apa peran Thread?
> >     
> > - Apa saja variabel built-in untuk identifikasi?
> >     
> > - Bagaimana memetakan thread ke data 1D?
> >     
> > - Mengapa perlu Grid/Block 2D & 3D?
> >     
> > - Bagaimana memetakan thread ke data 2D?
> >     
> > - Apa artinya "Block harus independen"?
> >     
> > - Bagaimana hubungan antar thread?
> >     
> >
> > ## Reference Points
> >
> > - `7 - IF-3230-07-GPU-02-2022.pdf`
> >     
> > - `6a - IF3230-06a-GPU-2022.pdf`
> >     
> > - `7 - IF-3230-07-GPU-01-2022.pdf`
> >     
> 
> > ### Hierarki Thread CUDA
> >
> > CUDA mengorganisir eksekusi paralel masif dalam sebuah **hierarki tiga tingkat** yang terstruktur. Saat sebuah kernel diluncurkan, GPU membuat sekelompok besar thread yang diatur dalam struktur ini. Memahami hierarki ini sangat penting karena ia menentukan bagaimana thread diidentifikasi, bagaimana mereka mengakses data, dan bagaimana mereka dapat bekerja sama.
> >
> > ### Level 1: Grid
> >
> > - **Definisi**: Sebuah **Grid** adalah kontainer tingkat tertinggi yang terdiri dari semua _thread block_ yang mengeksekusi satu pemanggilan kernel.
> >     
> > - **Analogi**: Jika kernel adalah "rencana kerja" (misalnya, "hitung perkalian matriks"), maka Grid adalah "seluruh proyek" yang mencakup semua pekerjaan yang perlu dilakukan untuk menyelesaikan rencana tersebut.
> >     
> > - **Dimensi**: Grid dapat diorganisir dalam 1D, 2D, atau 3D.
> >     
> >
> > ### Level 2: Thread Block
> >
> > - **Definisi**: Sebuah **Thread Block** (atau sering disingkat **Block**) adalah sekelompok thread (maksimal 1024 thread pada arsitektur modern) yang dijadwalkan untuk dieksekusi bersama pada satu Streaming Multiprocessor (SM).
> >     
> > - **Fitur Kunci (Kerja Sama)**: Thread di dalam block yang sama dapat **bekerja sama**. Mereka dapat:
> >     
> >     1. **Berbagi data** melalui memori on-chip yang sangat cepat yang disebut **Shared Memory**.
> >         
> >     2. **Melakukan sinkronisasi** eksekusi menggunakan `__syncthreads()`, yaitu sebuah _barrier_ di mana tidak ada thread dalam block yang bisa lewat sebelum semua thread lain mencapainya.
> >         
> > - **Dimensi**: Block juga dapat diorganisir dalam 1D, 2D, atau 3D.
> >     
> >
> > ### Level 3: Thread
> >
> > - **Definisi**: Sebuah **Thread** adalah unit eksekusi individual terkecil. Setiap thread menjalankan kode kernel yang sama.
> >     
> > - **Identitas Unik**: Setiap thread memiliki ID unik yang memungkinkannya untuk mengerjakan porsi data yang berbeda dari thread lainnya.
> >     
> > - **Sumber Daya Pribadi**: Setiap thread memiliki _register_ pribadi dan _local memory_.
> >     
> >
> > ### Variabel Built-in untuk Identifikasi
> >
> > Di dalam kernel, CUDA secara otomatis menyediakan variabel-variabel _read-only_ untuk mengetahui identitas setiap thread. Variabel ini bertipe `dim3`, yang memiliki komponen `.x`, `.y`, dan `.z`.
> >
> > - `gridDim`: Dimensi dari Grid (misalnya, berapa banyak block dalam arah x, y, z).
> >     
> > - `blockDim`: Dimensi dari setiap Block (misalnya, berapa banyak thread dalam arah x, y, z).
> >     
> > - `blockIdx`: Indeks unik (koordinat) dari block saat ini di dalam Grid.
> >     
> > - `threadIdx`: Indeks unik (koordinat) dari thread saat ini di dalam Block-nya.
> >     
> >
> > ### Pemetaan Thread ke Data (1D)
> >
> > Kasus paling umum adalah memproses array 1D. Untuk memberikan setiap thread sebuah indeks global yang unik, kita menggunakan formula standar:
> >
> > ```c
> > // Formula untuk mendapatkan indeks global unik dalam grid 1D
> > int index = blockIdx.x * blockDim.x + threadIdx.x;
> > ```
> >
> > - `blockIdx.x * blockDim.x`: Menghitung "offset" atau posisi awal dari block saat ini. Ini seperti menghitung berapa banyak thread yang ada di semua block sebelumnya.
> >     
> > - `+ threadIdx.x`: Menambahkan posisi lokal thread di dalam block-nya.
> >     
> >
> > **Contoh: Penjumlahan Vektor**
> >
> > ```c
> > __global__ void vecAdd(float* C, float* A, float* B, int n) {
> >     int i = blockIdx.x * blockDim.x + threadIdx.x;
> >     if (i < n) { // Boundary check
> >         C[i] = A[i] + B[i];
> >     }
> > }
> > ```
> >
> > Setiap thread menghitung indeks `i` yang unik dan melakukan satu penjumlahan.
> >
> > ### Mengapa Perlu Grid & Block 2D/3D?
> >
> > Mengorganisir grid dan block dalam 2D atau 3D sangat berguna karena **mempermudah pemetaan ke struktur data multi-dimensi**.
> >
> > - **Contoh**: Untuk memproses gambar (matriks 2D piksel), jauh lebih intuitif jika kita meluncurkan grid 2D dari block 2D. Setiap thread block bisa memproses satu "tile" atau "ubin" dari gambar, dan setiap thread di dalam block itu bisa memproses satu piksel.
> >     
> >
> > ### Pemetaan Thread ke Data (2D)
> >
> > Untuk data 2D seperti gambar, kita menghitung indeks baris dan kolom secara terpisah:
> >
> > ```c
> > // Mendapatkan koordinat baris (Y) dan kolom (X) global
> > int row = blockIdx.y * blockDim.y + threadIdx.y;
> > int col = blockIdx.x * blockDim.x + threadIdx.x;
> > ```
> >
> > Karena memori komputer pada dasarnya linear (1D), kita perlu mengubah koordinat 2D ini menjadi indeks 1D untuk mengakses array (dalam urutan _row-major_):
> >
> > ```
> > // Mengonversi koordinat 2D ke indeks memori 1D
> > int index = row * width + col;
> > ```
> >
> > ### Penting: Block Harus Independen
> >
> > Ini adalah konsep fundamental untuk skalabilitas di CUDA. **Thread block harus dapat dieksekusi secara independen**:
> >
> > - **Urutan Acak**: GPU dapat mengeksekusi block dalam urutan apa pun (misalnya, block 5 sebelum block 0).
> >     
> > - **Konkuren atau Serial**: Tergantung pada sumber daya GPU, block bisa dieksekusi secara bersamaan di SM yang berbeda atau secara berurutan di SM yang sama.
> >     
> > - **Tanpa Sinkronisasi Antar-Block**: **Tidak ada** mekanisme untuk mensinkronisasi eksekusi antar block yang berbeda dalam satu pemanggilan kernel. Jika Block A perlu hasil dari Block B, ini harus dilakukan dengan meluncurkan kernel yang terpisah.
> >     
> >
> > Sifat independen ini memungkinkan kode CUDA yang sama untuk berjalan dan **berskala** secara otomatis pada berbagai jenis GPU, dari laptop dengan sedikit SM hingga superkomputer dengan banyak SM.
> >
> > ### Hubungan Antar Thread
> >
> > - **Di dalam Block**: Thread bersifat "kooperatif". Mereka dapat berbagi data dan melakukan sinkronisasi.
> >     
> > - **Antar Block**: Thread bersifat "independen". Mereka tidak dapat berkomunikasi atau melakukan sinkronisasi secara langsung.
> >     

> [!cornell] #### Summary
> 
> CUDA mengorganisir komputasi paralel dalam hierarki tiga tingkat: Grid (keseluruhan tugas), Block (grup thread yang bisa bekerja sama), dan Thread (unit eksekusi individual). Setiap thread mendapatkan identitas unik melalui variabel built-in blockIdx dan threadIdx, yang memungkinkan pemetaan komputasi ke struktur data 1D, 2D, atau 3D secara intuitif. Kemampuan thread untuk bekerja sama di dalam sebuah block dan sifat independen antar block adalah fondasi yang memberikan kekuatan, fleksibilitas, dan skalabilitas pada model pemrograman CUDA.

> [!ad-libitum]- Additional Information
> 
> #### Linearisasi ID Thread di Dalam Block
> 
> Terkadang, meskipun Anda menggunakan block 2D atau 3D, Anda mungkin memerlukan ID linear unik untuk setiap thread _di dalam block-nya_ (misalnya, untuk mengakses array 1D di shared memory). Anda bisa menghitungnya sebagai berikut untuk block 2D:
> 
> ```
> int local_linear_id = threadIdx.y * blockDim.x + threadIdx.x;
> ```
> 
> Ini adalah kebalikan dari proses pemetaan 2D ke 1D di memori global, tetapi diterapkan pada skala lokal di dalam block.
> 
> #### Batasan Arsitektur (Compute Capability)
> 
> Setiap generasi GPU memiliki batasan perangkat keras yang berbeda, yang dikenal sebagai _Compute Capability_ (misalnya, 8.6 untuk arsitektur Ampere). Batasan ini mencakup:
> 
> - Maksimum thread per block (umumnya 1024).
>     
> - Maksimum dimensi untuk grid (`gridDim.x`, `.y`, `.z`).
>     
> - Maksimum dimensi untuk block (`blockDim.x`, `.y`, `.z`).
>     
> - Jumlah maksimum block yang bisa berada di satu SM.
>     
> - Jumlah shared memory per SM.
>     
> 
> Mengetahui batasan ini penting saat merancang kernel untuk performa optimal.
> 
> #### Strategi Pemilihan Ukuran Block
> 
> Memilih dimensi block (`blockDim`) bukanlah hal sepele dan berpengaruh besar pada performa. Beberapa pertimbangan awal:
> 
> - **Kelipatan 32**: Ukuran total block (misal, `blockDim.x * blockDim.y`) sebaiknya merupakan kelipatan dari 32, karena thread dieksekusi dalam grup 32 yang disebut _warp_.
>     
> - **Okupansi**: Pilihlah ukuran yang memungkinkan beberapa block berjalan secara bersamaan di satu SM untuk memaksimalkan utilisasi dan menyembunyikan latensi. Misalnya, jika satu block menggunakan terlalu banyak shared memory atau register, hanya sedikit block yang bisa berjalan bersamaan, yang dapat menurunkan performa.
>