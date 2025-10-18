---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Kinerja Eksekusi: Control Divergence dan Dampaknya pada Performa
> 
> > ## Questions/Cues
> >
> > - Apa itu Control Divergence?
> >     
> > - Mengapa Divergence buruk untuk performa?
> >     
> > - Bagaimana GPU menangani Divergence?
> >     
> > - Apa penyebab umum Divergence?
> >     
> > - Kapan sebuah `if` tidak menyebabkan Divergence?
> >     
> > - Analisis Divergence: Penjumlahan Vektor
> >     
> > - Analisis Divergence: Perkalian Matriks
> >     
> > - Apakah boundary check harus dihindari?
> >     
> >
> > ## Reference Points
> >
> > - `7 - IF-3230-07-GPU-04-2022.pdf`
> >     
> > - `7 - IF-3230-07-GPU-07-2023.pdf`
> >     
> 
> > ### Apa itu Control Divergence?
> >
> > **Control Divergence** terjadi ketika _thread-thread_ di dalam satu **Warp** yang sama mengambil jalur eksekusi yang berbeda. Karena model eksekusi SIMT mengharuskan semua thread dalam satu Warp menjalankan instruksi yang sama pada satu waktu, perbedaan alur kontrol ini menciptakan masalah.
> >
> > Ini biasanya terjadi dalam struktur kontrol seperti:
> >
> > - Pernyataan `if-then-else`.
> >     
> > - Loop (`for`, `while`) yang jumlah iterasinya berbeda untuk setiap thread.
> >     
> >
> > ### Mengapa Divergence Buruk untuk Performa?
> >
> > Control Divergence secara efektif **menghancurkan paralelisme** pada tingkat Warp. Ketika thread-thread dalam satu Warp "tidak setuju" ke mana harus pergi, GPU tidak dapat mengeksekusi semua jalur secara bersamaan. Akibatnya, eksekusi menjadi **tersialisasi**, yang berarti:
> >
> > - **Idle Threads**: Saat satu jalur dieksekusi, thread-thread yang seharusnya mengambil jalur lain menjadi tidak aktif (idle), menunggu giliran mereka.
> >     
> > - **Penurunan Throughput**: Unit komputasi tidak dimanfaatkan sepenuhnya karena hanya sebagian dari 32 thread dalam Warp yang bekerja pada satu waktu. Ini secara langsung mengurangi efisiensi dan performa.
> >     
> >
> > ### Bagaimana GPU Menangani Divergence?
> >
> > Perangkat keras menangani divergence dengan **mengeksekusi setiap jalur kontrol secara sekuensial**.
> >
> > 1. GPU pertama-tama akan mengeksekusi jalur pertama (misalnya, blok `then`), dengan hanya mengaktifkan thread-thread yang memenuhi kondisi tersebut. Thread lain di dalam Warp yang sama akan dinonaktifkan.
> >     
> > 2. Setelah jalur pertama selesai, GPU akan beralih dan mengeksekusi jalur kedua (misalnya, blok `else`), dengan mengaktifkan thread-thread yang mengambil jalur ini. Thread dari jalur pertama kini dinonaktifkan.
> >     
> > 3. Proses ini berlanjut sampai semua jalur yang berbeda di dalam Warp telah dieksekusi.
> >     
> >
> > Total waktu eksekusi untuk Warp yang divergen adalah **jumlah waktu dari semua jalur yang diambil**.
> >
> > ### Penyebab Umum Control Divergence
> >
> > Penyebab utamanya adalah kondisi percabangan (`if`) atau loop yang bergantung pada **ID unik thread**, seperti `threadIdx`.
> >
> > - **Contoh Penyebab Divergence**:
> >     
> > ```cpp
> > if (threadIdx.x > 2) { ... } 
> > ```
> >
> > Di dalam Warp pertama (thread 0-31), thread 0, 1, dan 2 akan mengambil jalur `else` (atau tidak melakukan apa-apa), sementara thread 3 hingga 31 akan mengambil jalur `then`. Ini menciptakan dua jalur berbeda dalam satu Warp, menyebabkan divergence.
> >
> > - **Contoh TANPA Divergence**:
> >     
> >
> > ```cpp
> > if (blockIdx.x > 2) { ... }
> > ```
> >
> > Kondisi ini tidak menyebabkan divergence karena `blockIdx.x` memiliki nilai yang **sama** untuk semua 32 thread di dalam satu Warp (karena semua thread dalam satu Warp berasal dari block yang sama). Oleh karena itu, semua thread dalam Warp tersebut akan mengambil keputusan yang sama serempak.
> >
> > ### Analisis Divergence: Penjumlahan Vektor
> >
> > Mari kita analisis kernel penjumlahan vektor dengan _boundary check_:
> >
> > ```CPP
> > __global__ void vecAdd(float* C, ..., int n) {
> >     int i = blockIdx.x * blockDim.x + threadIdx.x;
> >     if (i < n) { // Potensi Divergence
> >         C[i] = A[i] + B[i];
> >     }
> > }
> > ```
> >
> > - **Skenario**: Vektor berukuran 1000 elemen, dengan block size 256. Ini membutuhkan 4 block (Block 0, 1, 2, 3).
> >     
> > - **Block 0, 1, 2**: Semua thread (i = 0..767) memenuhi kondisi `i < 1000`. **Tidak ada divergence** di sini.
> >     
> > - **Block 3**:
> >     
> >     - **Warp 0-6** (i = 768..991): Semua thread memenuhi kondisi `i < 1000`. **Tidak ada divergence**.
> >         
> >     - **Warp 7** (i = 992..1023): Thread dengan `i` dari 992 hingga 999 akan masuk ke blok `if`. Thread dengan `i` dari 1000 hingga 1023 **tidak** akan masuk. **Terjadi divergence** di sini.
> >         
> > - **Dampak**: Dari total 32 Warp yang dieksekusi (8 Warp/block * 4 block), hanya **satu Warp terakhir** yang mengalami divergence. Dampak performanya sangat kecil, kemungkinan di bawah 3%.
> >     
> >
> > ### Analisis Dampak pada Perkalian Matriks
> >
> > Dalam perkalian matriks _tiled_ dengan ukuran arbitrer, _boundary check_ sangat diperlukan saat memuat data ke _shared memory_.
> >
> > ```cpp
> > // Contoh boundary check saat loading tile
> > if (Row < Height && Col < Width) {
> >     ds_M[ty][tx] = M[...];
> > } else {
> >     ds_M[ty][tx] = 0.0;
> > }
> > ```
> >
> > - **Analisis**: Dampak divergence terjadi terutama pada **block-block di tepi matriks**. Block yang berada di tengah matriks tidak akan mengalami divergence sampai fase pemrosesan tile terakhir.
> >     
> > - **Hasil**: Untuk matriks berukuran besar, jumlah _warp_ yang memproses bagian tengah matriks (tanpa divergence) jauh lebih banyak daripada jumlah _warp_ yang memproses bagian tepi (dengan divergence).
> >     
> > - **Kesimpulan**: Seperti pada penjumlahan vektor, meskipun ada banyak pernyataan `if`, proporsi _warp_ yang benar-benar mengalami divergence relatif kecil. Untuk matriks 100x100 dengan tile 16x16, estimasi dampak performa kurang dari 12%. Untuk matriks yang lebih besar, persentasenya akan semakin kecil.
> >     
> >
> > ### Apakah Boundary Check Harus Dihindari?
> >
> > **Tidak.** Pelajaran utamanya adalah:
> >
> > - _Boundary check_ sangat **penting** untuk memastikan fungsionalitas dan kebenaran program (robustness), terutama untuk menangani data dengan ukuran yang tidak pas.
> >     
> > - Dampak performa dari _control divergence_ yang disebabkan oleh _boundary check_ seringkali **tidak signifikan** untuk dataset yang besar.
> >     
> > - **Jangan ragu** untuk menggunakan _boundary check_ demi kebenaran kode. Manfaat dari kode yang benar jauh lebih besar daripada kerugian performa yang biasanya kecil.
> >     

> [!cornell] #### Summary
> 
> Control Divergence terjadi ketika thread-thread dalam satu Warp mengambil jalur eksekusi yang berbeda, yang memaksa GPU untuk menserialisasi eksekusi setiap jalur dan secara signifikan mengurangi paralelisme serta performa. Fenomena ini umumnya disebabkan oleh kondisi percabangan yang bergantung pada threadIdx. Meskipun merupakan masalah performa yang serius, dampak dari divergence yang disebabkan oleh boundary check yang esensial seringkali dapat diabaikan pada dataset besar, sehingga memprioritaskan kebenaran dan robustnes kode adalah pendekatan yang tepat.

> [!ad-libitum]- Additional Information
> 
> #### Predication
> 
> GPU modern seringkali tidak benar-benar "menghentikan" thread yang tidak aktif selama divergence. Sebaliknya, mereka menggunakan teknik yang disebut **predication**. Instruksi untuk _kedua_ jalur (`then` dan `else`) akan dieksekusi oleh semua 32 thread dalam Warp. Namun, setiap thread memiliki "predicate flag" internal. Hasil dari sebuah instruksi hanya akan ditulis kembali ke register atau memori jika _predicate flag_ untuk thread tersebut aktif. Ini menghindari kompleksitas mengubah _program counter_ bolak-balik, tetapi tetap membuang-buang slot eksekusi karena instruksi yang dijalankan tidak menghasilkan output yang berguna untuk thread yang "tidak aktif".
> 
> #### Warp Uniformity
> 
> Sebuah nilai atau ekspresi dikatakan **warp-uniform** jika ia dievaluasi menghasilkan nilai yang sama untuk semua 32 thread di dalam satu Warp.
> 
> - `blockIdx`, `gridDim`, `blockDim` selalu warp-uniform.
>     
> - Variabel yang dibaca dari _constant memory_ juga seringkali warp-uniform.
>     
> - Variabel yang bergantung pada `threadIdx` **tidak** warp-uniform.
>     
> 
> Aturan praktisnya: Jika kondisi dalam `if` atau loop Anda adalah ekspresi yang _warp-uniform_, maka tidak akan terjadi control divergence.
> 
> #### Divergence dalam Algoritma Lain
> 
> Sementara _boundary check_ adalah sumber divergence yang jinak, ada beberapa pola algoritma paralel di mana divergence adalah masalah inti dan lebih sulit diatasi. Contoh klasiknya adalah **parallel reduction** (akan dibahas di catatan mendatang). Dalam implementasi reduksi yang naif, setelah setiap langkah, setengah dari thread menjadi tidak aktif. Ini menyebabkan divergence yang parah di setiap langkah dan utilisasi sumber daya yang sangat buruk. Mengatasi divergence semacam ini seringkali memerlukan perancangan ulang algoritma secara mendasar.