_back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]
### Tabel Konsep dan Fungsi Penting CUDA

Berikut adalah rangkuman konsep, fungsi, dan teknik fundamental dalam pemrograman CUDA yang perlu dikuasai.

|**Konsep / Fungsi**|**Keterangan**|**Poin Kunci & Kapan Digunakan**|
|---|---|---|
|**Konsep Fundamental**|||
|Filosofi Desain CPU vs. GPU|CPU dioptimalkan untuk **Latency** (mengerjakan 1 tugas secepat mungkin). GPU dioptimalkan untuk **Throughput** (mengerjakan banyak tugas bersamaan).|Gunakan CPU untuk bagian sekuensial dan kontrol. Gunakan GPU untuk bagian yang dapat diparalelkan secara masif (komputasi data besar).|
|Model Host + Device|Program terdiri dari **Host (CPU)** yang menjadi manajer dan **Device (GPU)** yang menjadi pekerja paralel. Keduanya punya memori terpisah.|Ini adalah model dasar. Semua alur kerja CUDA melibatkan transfer data antara Host dan Device.|
|**Model Pemrograman**|||
|`__global__ void namaKernel(...)`|Keyword untuk mendefinisikan sebuah **Kernel**, yaitu fungsi yang akan dieksekusi di Device (GPU) oleh banyak _thread_.|Ini adalah inti dari kode paralel Anda. Dideklarasikan di kode global, dipanggil dari Host.|
|`namaKernel<<<...>>>()`|Sintaks **peluncuran kernel** dari Host ke Device.|Digunakan di `main()` atau fungsi Host lainnya untuk memulai eksekusi paralel di GPU.|
|`cudaMalloc`, `cudaMemcpy`, `cudaFree`|Fungsi-fungsi untuk manajemen memori Device: alokasi, penyalinan data, dan membebaskan memori.|**Wajib** digunakan untuk mentransfer data input dari Host ke Device sebelum kernel diluncurkan, dan mengambil hasilnya kembali setelah selesai.|
|**Hierarki & Eksekusi**|||
|Hierarki **Grid > Block > Thread**|Struktur 3 tingkat untuk mengorganisir _thread_. **Grid** berisi semua _thread_ untuk satu kernel. **Block** adalah grup _thread_ yang bisa bekerja sama. **Thread** adalah unit eksekusi terkecil.|Struktur ini fundamental untuk memetakan komputasi ke data. **Penting:** _Thread_ di dalam satu _Block_ bisa sinkronisasi, tapi antar-_Block_ bersifat independen.|
|`blockIdx`, `threadIdx`, `blockDim`|Variabel _built-in_ di dalam kernel untuk mendapatkan ID unik dari _thread_ dan _block_.|**Selalu digunakan** di dalam kernel untuk menghitung indeks data mana yang harus dikerjakan oleh setiap _thread_. Formula `idx = blockIdx.x * blockDim.x + threadIdx.x` sangat esensial.|
|**SM, Warp, dan SIMT**|**SM**: Prosesor di dalam GPU. **Warp**: Grup berisi **32 thread** yang dieksekusi serempak. **SIMT**: Model eksekusi GPU (_Single Instruction, Multiple Thread_).|Ini menjelaskan bagaimana _hardware_ bekerja. _Scheduler_ GPU mengeksekusi dalam satuan **Warp**, bukan _thread_ individual.|
|**Manajemen Memori**|||
|**Hierarki Memori**|CUDA punya berbagai jenis memori dengan kecepatan dan _scope_ berbeda.|Kunci performa adalah **meminimalkan akses ke Global Memory** yang lambat dan memaksimalkan penggunaan memori _on-chip_ (Shared & Register) yang cepat.|
|**Sinkronisasi & Penanganan Masalah**|||
|`__syncthreads()`|**Barrier sinkronisasi.** Memastikan semua _thread_ di dalam satu _Block_ mencapai titik ini sebelum ada yang bisa lanjut.|**Wajib** digunakan dalam **Tiled Algorithm**, yaitu setelah memuat data dari Global ke Shared Memory, dan sebelum mulai komputasi.|
|Operasi Atomik (e.g., `atomicAdd`)|Operasi _Read-Modify-Write_ yang dijamin aman dari _race condition_.|Untuk mengatasi _data race_ saat banyak _thread_ perlu mengupdate lokasi memori yang sama. Contoh: pada pembuatan histogram.|
|_Control Divergence_|Terjadi ketika _thread-thread_ dalam satu Warp mengambil jalur `if-else` yang berbeda.|Ini adalah "pembunuh" performa karena GPU terpaksa menjalankan setiap jalur secara serial. Hindari kondisi percabangan yang bergantung pada `threadIdx`.|
|**Teknik Optimasi Utama**|||
|_Tiled Algorithm / Blocking_|Pola **Load-Sync-Compute**. _Thread block_ bekerja sama memuat "ubin" (tile) data dari Global ke Shared Memory untuk digunakan berulang kali.|Teknik paling fundamental untuk mengubah algoritma yang _memory-bound_ menjadi _compute-bound_. Sangat mengurangi _bottleneck_ akses memori.|
|_Memory Coalescing_|Terjadi ketika _thread-thread_ dalam satu Warp mengakses lokasi memori Global yang berurutan dan berdekatan.|Penting untuk mendapatkan _throughput_ maksimal dari Global Memory. Desain pola akses data agar _coalesced_.|

#### Tabel Detail Hierarki Memori CUDA

|**Tipe Memori**|**Lokasi**|**Kecepatan**|**Scope Akses**|**Lifetime**|**Deklarasi & Penggunaan**|
|---|---|---|---|---|---|
|**Registers**|On-chip|**Sangat Cepat**|Per-Thread|Per-Thread|Variabel lokal biasa di dalam kernel.|
|**Shared Memory**|On-chip|Sangat Cepat|Per-Block|Per-Block|__shared__ int var;<br><br>Kunci untuk kerja sama antar-thread.|
|**Global Memory**|Off-chip (DRAM)|**Lambat**|Grid (Semua Thread)|Aplikasi|Hasil dari `cudaMalloc` atau variabel global dengan `__device__`.|
|**Constant Memory**|Off-chip (di-cache)|Cepat (jika hit)|Grid (Read-Only)|Aplikasi|__constant__ int var;<br><br>Untuk data read-only yang diakses seragam.|
|**Local Memory**|Off-chip (DRAM)|Lambat|Per-Thread|Per-Thread|Tumpahan dari register (_spilling_) atau array lokal besar. **Harus dihindari**.|