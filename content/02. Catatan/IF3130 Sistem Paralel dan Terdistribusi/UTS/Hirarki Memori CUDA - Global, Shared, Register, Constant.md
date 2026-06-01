---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Hierarki Memori CUDA: Memanfaatkan Kecepatan untuk Performa Optimal
> 
> > ## Questions/Cues
> > 
> > - Mengapa memori jadi bottleneck?
> >     
> > - Apa saja tipe memori di CUDA?
> >     
> > - Apa itu Global Memory?
> >     
> > - Apa itu Shared Memory?
> >     
> > - Apa itu Registers?
> >     
> > - Apa perbedaan Local vs. Shared Memory?
> >     
> > - Apa itu Constant Memory?
> >     
> > - Bagaimana scope & lifetime setiap memori?
> >     
> > - Di mana variabel dideklarasikan?
> >     
> > 
> > ## Reference Points
> > 
> > - `7 - IF-3230-07-GPU-03-2022.pdf`
> >     
> > - `6a - IF3230-06a-GPU-2022.pdf`
> >     
> 
> > ### Mengapa Memori Menjadi Bottleneck?
> > 
> > Banyak algoritma paralel, terutama pada GPU, bersifat **memory-bound**, bukan compute-bound. Artinya, performa mereka tidak dibatasi oleh seberapa cepat GPU bisa menghitung, melainkan oleh seberapa cepat data bisa disuplai ke unit komputasi.
> > 
> > Contoh: Perkalian Matriks Naif
> > 
> > Dalam perkalian matriks sederhana, untuk setiap elemen hasil, sebuah thread harus membaca satu baris penuh dari matriks pertama dan satu kolom penuh dari matriks kedua. Ini berarti setiap elemen data di matriks input dibaca berulang kali dari memori utama (Global Memory) yang lambat.
> > 
> > - **Rasio Komputasi-Memori**: Perbandingannya sangat buruk. Untuk setiap operasi _multiply-add_, diperlukan dua akses memori. GPU dengan kekuatan 1500 GFLOPS mungkin memerlukan 6000 GB/s bandwidth memori, sementara perangkat kerasnya hanya menyediakan ~200 GB/s. Akibatnya, GPU menghabiskan sebagian besar waktunya menunggu data, dan hanya mencapai sebagian kecil dari performa puncaknya.
> >     
> > 
> > Solusinya adalah dengan cerdas memanfaatkan **hierarki memori** yang disediakan CUDA untuk meminimalkan akses ke memori yang lambat.
> > 
> > ### Tipe-Tipe Memori di CUDA
> > 
> > CUDA menyediakan beberapa jenis memori yang berbeda, masing-masing dengan karakteristik kecepatan, ukuran, scope, dan lifetime yang unik.
> > 
> > ### Global Memory
> > 
> > - **Lokasi**: Off-chip (DRAM). Ini adalah memori VRAM utama GPU.
> >     
> > - **Ukuran**: Paling besar (Gigabyte).
> >     
> > - **Kecepatan**: Paling lambat, dengan latensi tinggi.
> >     
> > - **Scope**: **Grid**. Semua thread dari semua block dalam satu pemanggilan kernel dapat mengaksesnya. Host (CPU) juga dapat membaca dan menulis ke memori ini.
> >     
> > - **Lifetime**: **Aplikasi**. Data tetap ada selama Host tidak membebaskannya (`cudaFree()`).
> >     
> > - **Fungsi Utama**: Komunikasi data antara Host dan Device, serta sebagai penyimpanan utama untuk dataset yang besar.
> >     
> > 
> > ### Shared Memory
> > 
> > - **Lokasi**: On-chip, di dalam setiap Streaming Multiprocessor (SM).
> >     
> > - **Ukuran**: Kecil (puluhan atau ratusan Kilobyte per SM).
> >     
> > - **Kecepatan**: Sangat cepat, latensinya mendekati register.
> >     
> > - **Scope**: **Block**. Data hanya dapat diakses oleh thread-thread di dalam block yang sama.
> >     
> > - **Lifetime**: **Block**. Data hanya ada selama block tersebut dieksekusi. Begitu block selesai, isinya hilang.
> >     
> > - **Fungsi Utama**: Kunci untuk performa tinggi. Digunakan sebagai cache yang dikelola secara manual oleh programmer untuk **berbagi data antar thread dalam satu block** dan secara drastis mengurangi lalu lintas ke Global Memory. Dideklarasikan dengan `__shared__`.
> >     
> > 
> > ### Registers
> > 
> > - **Lokasi**: On-chip, di dalam setiap _core_ komputasi.
> >     
> > - **Ukuran**: Sangat kecil (ribuan register per SM, dibagi untuk semua thread).
> >     
> > - **Kecepatan**: **Paling cepat**. Akses instan.
> >     
> > - **Scope**: **Thread**. Setiap thread memiliki set registernya sendiri yang tidak bisa dilihat oleh thread lain.
> >     
> > - **Lifetime**: **Thread**. Nilai ada selama thread dieksekusi.
> >     
> > - **Fungsi Utama**: Menyimpan variabel lokal yang sering diakses (variabel otomatis dalam kernel). Compiler akan berusaha menempatkan variabel di register sebisa mungkin.
> >     
> > 
> > ### Local Memory
> > 
> > - **Lokasi**: Off-chip (secara fisik berada di Global Memory).
> >     
> > - **Kecepatan**: Lambat, sama seperti Global Memory.
> >     
> > - **Scope**: **Thread**. Private untuk setiap thread.
> >     
> > - **Lifetime**: **Thread**.
> >     
> > - **Fungsi Utama**: Digunakan secara otomatis oleh compiler sebagai "tumpahan" (**register spilling**) ketika tidak ada cukup register yang tersedia, atau untuk variabel lokal berukuran besar seperti array. **Penggunaannya harus dihindari** karena dapat menurunkan performa secara signifikan.
> >     
> > 
> > ### Constant Memory
> > 
> > - **Lokasi**: Off-chip, namun dengan **cache on-chip**.
> >     
> > - **Ukuran**: Kecil (biasanya 64 KB).
> >     
> > - **Kecepatan**: Cepat jika terjadi _cache hit_. Data di-broadcast ke semua thread dalam satu _warp_, sangat efisien untuk akses seragam.
> >     
> > - **Scope**: **Grid**. Read-only untuk semua thread, ditulis oleh Host.
> >     
> > - **Lifetime**: **Aplikasi**.
> >     
> > - **Fungsi Utama**: Menyimpan data yang tidak berubah selama eksekusi kernel dan dibaca oleh banyak thread (misalnya, koefisien filter, konstanta fisika). Dideklarasikan dengan `__constant__`.
> >     
> > 
> > ### Ringkasan Scope dan Lifetime
> > 
> > |**Deklarasi Variabel**|**Memori**|**Scope**|**Lifetime**|
> > |---|---|---|---|
> > |`int varLokal;` (di dalam kernel)|Register|Thread|Thread|
> > |`__device__ __shared__ int varBersama;`|Shared|Block|Block|
> > |`__device__ int varGlobal;`|Global|Grid|Aplikasi|
> > |`__device__ __constant__ int varKonstan;`|Constant|Grid|Aplikasi|
> > 
> > - `__device__` bersifat opsional jika digunakan bersama `__shared__` atau `__constant__`.
> >     
> > - Variabel yang dideklarasikan di luar fungsi apa pun secara default masuk ke Global Memory.
> >     
> > - Variabel otomatis (tanpa qualifier) di dalam kernel secara default masuk ke Register.
> >     

> [!cornell] #### Summary
> 
> CUDA menyediakan hierarki memori yang kaya, mulai dari Register on-chip yang super cepat namun terbatas hingga Global Memory off-chip yang besar namun lambat. Kunci untuk mencapai performa tinggi di GPU adalah menulis kernel yang memaksimalkan penggunaan memori on-chip (Register dan Shared Memory) untuk komputasi internal dan meminimalkan akses ke Global Memory. Shared Memory, khususnya, adalah alat vital yang memungkinkan thread dalam satu block untuk bekerja sama secara efisien dengan berbagi data dan mengurangi ketergantungan pada memori utama yang lambat.

> [!ad-libitum]- Additional Information
> 
> #### Analogi Hierarki Memori
> 
> Bayangkan seorang koki (sebuah **Thread**) sedang memasak:
> 
> - **Registers**: Peralatan yang ada di tangannya (pisau, sendok). Akses instan.
>     
> - **Shared Memory**: Meja kerja kecil yang ia bagi dengan beberapa koki lain dalam timnya (sebuah **Block**). Mereka bisa saling mengambil bahan dari meja ini dengan sangat cepat.
>     
> - **Global Memory**: Gudang besar atau supermarket tempat semua bahan mentah disimpan. Perlu waktu untuk pergi ke sana dan mengambil bahan.
>     
> - **Local Memory**: Kantong belanja pribadi koki. Jika tangannya (register) penuh, ia terpaksa meletakkan barang di kantong ini, yang sama lambatnya dengan bolak-balik ke gudang.
>     
> - **Constant Memory**: Buku resep yang dipajang di dinding. Semua koki bisa membacanya kapan saja dengan cepat (di-cache).
>     
> 
> #### Texture Memory
> 
> Selain Constant Memory, ada jenis memori read-only lain yang di-cache bernama **Texture Memory**. Memori ini dioptimalkan secara khusus untuk pola akses yang memiliki **lokalitas spasial**, terutama dalam 2D. Ini sangat berguna dalam aplikasi pemrosesan gambar, di mana thread seringkali perlu membaca piksel-piksel tetangga. Hardware texture fetching dapat menangani kondisi batas (clamping, wrapping) secara otomatis dan melakukan interpolasi linier antar piksel, yang bisa sangat mempercepat beberapa jenis komputasi.
> 
> #### Pengaruh Hierarki Memori pada Desain Algoritma
> 
> Pemahaman mendalam tentang hierarki ini secara langsung mengarah pada desain algoritma yang lebih baik, seperti **Tiled Algorithms**. Ide utamanya adalah:
> 
> 1. Satu block thread secara kolektif memuat satu "ubin" (_tile_) data dari Global Memory ke Shared Memory yang cepat.
>     
> 2. Lakukan sinkronisasi (`__syncthreads()`) untuk memastikan semua data sudah dimuat.
>     
> 3. Lakukan komputasi intensif di mana thread berulang kali mengakses data dari Shared Memory, bukan Global Memory.
>     
> 4. Setelah selesai, tulis hasilnya kembali ke Global Memory.
>     
> 
> Pendekatan ini secara dramatis meningkatkan rasio komputasi terhadap akses memori dan merupakan fondasi dari hampir semua kernel CUDA berkinerja tinggi.