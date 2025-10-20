---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Model Pemrograman CUDA: Interaksi Host-Device, Kernel, dan Alur Eksekusi
> 
> > ## Questions/Cues
> >
> > - Apa itu model Host + Device?
> >     
> > - Apa itu Kernel?
> >     
> > - Bagaimana alur eksekusi program CUDA?
> >     
> > - Apa saja 3 cara akselerasi aplikasi?
> >     
> > - Apa itu CUDA C?
> >     
> > - Bagaimana cara meluncurkan Kernel?
> >     
> > - Bagaimana manajemen memori Host-Device?
> >     
> > - Apa saja qualifier fungsi di CUDA?
> >     
> >
> > ## Reference Points
> >
> > - `7 - IF-3230-07-GPU-01-2022.pdf`
> >     
> > - `6a` - IF3230-06a-GPU-2022.pdf
> >     
> > - `7 - IF-3230-07-GPU-02-2022.pdf`
> >     
> 
> > ### Model Pemrograman Host + Device
> >
> > Model pemrograman CUDA didasarkan pada sistem **heterogen** yang terdiri dari dua entitas utama:
> >
> > 1. **Host**: Merujuk pada **CPU** dan memorinya (RAM sistem). Host bertindak sebagai "otak" atau orkestrator utama. Ia menjalankan bagian sekuensial dari program, menangani I/O, dan mengelola eksekusi secara keseluruhan.
> >     
> > 2. **Device**: Merujuk pada **GPU** dan memorinya sendiri (VRAM atau _device memory_). Device bertindak sebagai _co-processor_ atau "pekerja keras" yang sangat kuat untuk komputasi paralel.
> >     
> >
> > Keduanya adalah unit pemrosesan yang terpisah, terhubung melalui bus PCI Express, dan yang terpenting, memiliki **ruang memori yang terpisah**. Data harus secara eksplisit ditransfer antara memori host dan memori device.
> >
> > ### Apa itu Kernel?
> >
> > Sebuah **Kernel** adalah fungsi C/C++ yang ditulis oleh programmer untuk dieksekusi di **Device (GPU)**. Ciri khas utama dari kernel adalah:
> >
> > - **Eksekusi Paralel**: Saat diluncurkan dari Host, sebuah kernel dieksekusi secara bersamaan oleh ribuan atau jutaan _thread_ di GPU.
> >     
> > - **SPMD (Single Program, Multiple Data)**: Semua _thread_ menjalankan kode program yang sama (kernel yang sama), tetapi setiap _thread_ bekerja pada porsi data yang berbeda, yang ditentukan oleh ID uniknya (akan dibahas di catatan berikutnya).
> >     
> > - **Qualifier Khusus**: Kernel didefinisikan dalam kode menggunakan qualifier `__global__`. Ini menandakan kepada compiler NVCC bahwa fungsi ini dapat dipanggil dari Host dan akan dieksekusi di Device.
> >     
> >
> > **Contoh Deklarasi Kernel:**
> >
> > ```c
> > __global__ void MyKernel(float* data, int size) {
> >     // Kode yang akan dijalankan oleh setiap thread di GPU
> > }
> > ```
> >
> > ### Alur Eksekusi Program CUDA
> >
> > Sebuah program CUDA tipikal mengikuti alur kerja standar yang melibatkan interaksi bolak-balik antara Host dan Device:
> >
> > 1. **Inisialisasi di Host**: Program dimulai dan berjalan di CPU.
> >     
> > 2. **Alokasi Memori di Device**: Host menginstruksikan GPU untuk mengalokasikan ruang memori di _device memory_ untuk input dan output (`cudaMalloc()`).
> >     
> > 3. **Transfer Data ke Device**: Host menyalin data input dari memorinya ke memori device yang baru dialokasikan (`cudaMemcpy()` dengan flag `cudaMemcpyHostToDevice`).
> >     
> > 4. **Peluncuran Kernel**: Host meluncurkan kernel di Device (`MyKernel<<<...>>>()`). Pada titik ini, CPU melanjutkan tugasnya atau menunggu, sementara GPU mulai mengeksekusi kernel secara masif paralel.
> >     
> > 5. **Transfer Hasil Kembali ke Host**: Setelah kernel selesai, Host menyalin data hasil dari memori device kembali ke memorinya (`cudaMemcpy()` dengan flag `cudaMemcpyDeviceToHost`).
> >     
> > 6. **Pembersihan**: Host membebaskan memori yang dialokasikan di Device (`cudaFree()`).
> >     
> > 7. **Lanjutan di Host**: Program melanjutkan eksekusi di CPU menggunakan hasil yang telah disalin.
> >     
> >
> > ### Tiga Cara Akselerasi Aplikasi
> >
> > Ada tiga pendekatan utama untuk memanfaatkan kekuatan GPU, dengan trade-off antara kemudahan penggunaan dan fleksibilitas:
> >
> > 1. **Libraries (Pustaka)**: Cara termudah. Menggunakan pustaka yang sudah dioptimalkan oleh para ahli (seperti NVIDIA) untuk tugas-tugas umum (misalnya, `cuBLAS` untuk aljabar linear, `Thrust` untuk algoritma data paralel). Seringkali bersifat "drop-in" dengan sedikit perubahan kode.
> >     
> > 2. **Compiler Directives (Direktif Compiler)**: Memberikan petunjuk kepada compiler tentang bagian kode mana yang harus diparalelkan. Contohnya adalah **OpenACC**. Ini memungkinkan kode tetap portabel dan lebih mudah dikelola, tetapi kinerjanya mungkin tidak seoptimal kode kustom.
> >     
> > 3. **Programming Languages (Bahasa Pemrograman)**: Pendekatan yang paling kuat dan fleksibel. Menggunakan bahasa seperti **CUDA C/C++** atau **OpenCL** untuk menulis kernel kustom. Ini memberikan kontrol penuh atas paralelisme dan pergerakan data, memungkinkan potensi performa maksimal.
> >     
> >
> > Pembelajaran kita akan fokus pada pendekatan ketiga, yaitu menggunakan CUDA C.
> >
> > ### CUDA C: Ekstensi untuk Pemrograman Paralel
> >
> > CUDA C bukanlah bahasa yang sepenuhnya baru, melainkan **ekstensi dari bahasa C/C++**. Ia menambahkan beberapa elemen kunci untuk memungkinkan pemrograman GPU:
> >
> > - **Function Qualifiers**: Seperti `__global__`, `__device__`, `__host__` untuk menentukan di mana sebuah fungsi dieksekusi dan dari mana ia bisa dipanggil.
> >     
> > - **Variable Qualifiers**: Seperti `__shared__`, `__constant__` untuk menentukan tipe memori GPU tempat variabel disimpan.
> >     
> > - **Execution Configuration**: Sintaks `<<<...>>>` yang digunakan saat memanggil kernel untuk menentukan jumlah _thread block_ dan _thread_ per-blok yang akan diluncurkan.
> >     
> > - **Built-in Variables**: Variabel yang disediakan secara otomatis di dalam kernel seperti `threadIdx` dan `blockIdx` yang memungkinkan setiap _thread_ mengetahui identitas uniknya.
> >     
> >
> > ### Manajemen Memori dan Transfer Data
> >
> > Karena Host dan Device memiliki memori terpisah, manajemen data harus dilakukan secara eksplisit:
> >
> > - `cudaMalloc((void**)&d_ptr, size)`: Mengalokasikan `size` byte memori di Device dan menyimpan alamatnya di pointer `d_ptr`.
> >     
> > - `cudaMemcpy(dst, src, size, direction)`: Menyalin `size` byte data. `direction` bisa berupa:
> >     
> >     - `cudaMemcpyHostToDevice`: Dari CPU ke GPU.
> >         
> >     - `cudaMemcpyDeviceToHost`: Dari GPU ke CPU.
> >         
> > - `cudaFree(d_ptr)`: Membebaskan memori di Device yang ditunjuk oleh `d_ptr`.
> >     
> >
> > ### Function Qualifiers di CUDA
> >
> > Qualifier ini menentukan lokasi eksekusi dan pemanggilan sebuah fungsi:
> >
> > |**Qualifier**|**Dieksekusi di...**|**Dapat Dipanggil dari...**|
> > |---|---|---|
> > |`__global__`|Device (GPU)|Host (CPU)|
> > |`__device__`|Device (GPU)|Device (GPU)|
> > |`__host__`|Host (CPU)|Host (CPU)|
> >
> > Fungsi `__host__` dan `__device__` dapat digabungkan agar satu fungsi bisa dipanggil dari CPU maupun GPU.

> [!cornell] #### Summary
> 
> Model pemrograman CUDA adalah sistem komputasi heterogen yang memisahkan peran antara Host (CPU) sebagai orkestrator dan Device (GPU) sebagai eksekutor paralel masif. Alur kerja utamanya melibatkan Host yang secara eksplisit mengelola alokasi memori dan transfer data ke Device, lalu meluncurkan Kernel (fungsi __global__ yang berjalan secara paralel di ribuan thread) di Device untuk melakukan komputasi berat, dan akhirnya mengambil kembali hasilnya. CUDA C menyediakan ekstensi minimal pada C/C++ untuk memfasilitasi interaksi ini dan memberikan kontrol penuh atas paralelisme.

> [!ad-libitum]- Additional Information
> 
> #### Proses Kompilasi dengan NVCC
> 
> Kode CUDA (`.cu` file) tidak dikompilasi oleh compiler C++ biasa. NVIDIA menyediakan **NVCC (NVIDIA C Compiler)**. Saat Anda mengkompilasi file `.cu`, NVCC secara cerdas memisahkan kode menjadi dua bagian:
> 
> 1. **Kode Host**: Ini adalah kode C++ standar (bagian `main()`, dll.). NVCC meneruskannya ke compiler C++ standar sistem Anda (seperti `gcc` atau `cl.exe`).
>     
> 2. **Kode Device**: Ini adalah kode kernel (`__global__`) dan fungsi device (`__device__`). NVCC mengkompilasinya menjadi **PTX (Parallel Thread Execution)**.
>     
> 
> #### Apa itu PTX?
> 
> PTX adalah _Instruction Set Architecture_ (ISA) virtual tingkat rendah, mirip dengan bytecode Java atau CIL di .NET. Ini adalah bahasa perantara. Keuntungannya adalah portabilitas ke depan: driver NVIDIA di komputer Anda akan mengambil kode PTX ini dan melakukan kompilasi _Just-In-Time_ (JIT) menjadi kode mesin biner yang dioptimalkan secara spesifik untuk arsitektur GPU yang sedang Anda gunakan. Ini berarti kode yang Anda kompilasi hari ini masih akan dapat berjalan (dan bahkan mungkin lebih cepat) pada GPU generasi mendatang.
> 
> #### Contoh Kode Host Lengkap untuk Vector Addition
> 
> Berikut adalah kerangka lengkap dari sisi Host untuk mengilustrasikan alur kerja:
> 
> ```
> int main() {
>     int N = 1024;
> ```