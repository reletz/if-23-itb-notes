---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Pola Algoritma Paralel: Reduksi (Reduction)
> 
> > ## Questions/Cues
> >
> > - Apa itu komputasi reduksi?
> >     
> > - Apa strategi "Partition and Summarize"?
> >     
> > - Bagaimana cara kerja Reduksi Pohon (Reduction Tree)?
> >     
> > - Apa itu _work-efficiency_?
> >     
> > - Apakah reduksi paralel naif efisien?
> >     
> > - Bagaimana implementasi reduksi di CUDA?
> >     
> > - Mengapa `__syncthreads()` penting dalam reduksi?
> >     
> > - Bagaimana cara mengurangi _control divergence_?
> >     
> > - Apa itu teknik _thread compaction_?
> >     
> >
> > ## Reference Points
> >
> > - `7 - IF-3230-07-GPU-07-2023.pdf`
> >     
>
> > ### Apa itu Komputasi Reduksi?
> >
> > **Reduksi** adalah operasi untuk "meringkas" sebuah set data input menjadi satu nilai tunggal menggunakan sebuah operasi biner yang bersifat **asosiatif dan komutatif**.
> >
> > - **Operasi Umum**: Penjumlahan (`sum`), perkalian (`product`), nilai maksimum (`max`), nilai minimum (`min`).
> >     
> > - **Contoh**: Menjumlahkan semua elemen dalam sebuah array untuk mendapatkan totalnya. Atau, mencari suhu tertinggi dari data sensor di seluruh kota.
> >     
> >
> > Sifat asosiatif `(a+b)+c = a+(b+c)` dan komutatif `a+b = b+a` sangat penting karena ini berarti urutan pemrosesan elemen tidak mempengaruhi hasil akhir, yang merupakan syarat fundamental untuk paralelisasi yang efektif.
> >
> > ### Strategi "Partition and Summarize"
> >
> > Ini adalah strategi inti di balik banyak framework komputasi terdistribusi (seperti MapReduce) dan merupakan cara alami untuk memparalelkan operasi reduksi.
> >
> > 1. **Partition (Partisi)**: Kumpulan data input yang besar dipecah menjadi beberapa bagian (chunk) yang lebih kecil.
> >     
> > 2. **Process in Parallel**: Setiap _thread_ (atau prosesor) secara independen menghitung hasil parsial untuk satu partisi. Misalnya, setiap thread menjumlahkan angka-angka di bagiannya masing-masing.
> >     
> > 3. **Summarize (Ringkas)**: Hasil-hasil parsial dari setiap thread kemudian digabungkan (direduksi lagi) untuk menghasilkan satu nilai akhir. Proses peringkasan ini sering diimplementasikan menggunakan **Pohon Reduksi**.
> >     
> >
> > ### Reduksi Pohon (Reduction Tree)
> >
> > Ini adalah metode yang sangat efisien untuk melakukan fase "Summarize". Daripada satu thread menjumlahkan semua hasil parsial secara sekuensial, thread-thread bekerja sama dalam struktur seperti turnamen.
> >
> > - **Cara Kerja**:
> >     
> >     - **Langkah 1**: Setengah dari thread yang aktif mengambil nilai dari setengah thread lainnya dan menambahkannya ke nilainya sendiri. Setelah langkah ini, jumlah data yang perlu diproses berkurang setengahnya.
> >         
> >     - **Langkah 2**: Proses diulangi. Setengah dari thread yang masih aktif mengambil nilai dari setengah lainnya.
> >         
> >     - **Seterusnya**: Proses ini berlanjut sampai hanya satu thread yang tersisa, yang memegang hasil akhir.
> >         
> >
> > Untuk `N` elemen, proses ini hanya membutuhkan **log₂(N)** langkah, membuatnya sangat cepat secara teoretis.
> >
> > ### Analisis Efisiensi Kerja (Work-Efficiency)
> >
> > _Work-efficiency_ membandingkan jumlah total operasi yang dilakukan oleh algoritma paralel dengan algoritma sekuensial yang paling efisien.
> >
> > - **Algoritma Sekuensial Efisien**: Untuk menjumlahkan `N` elemen, diperlukan `N-1` operasi penjumlahan. Kompleksitasnya adalah **O(N)**.
> >     
> > - **Algoritma Reduksi Pohon Paralel**: Jumlah total operasi yang dilakukan di semua langkah adalah `N/2 + N/4 + N/8 + ... + 1 = N-1`. Kompleksitas kerjanya juga **O(N)**.
> >     
> >
> > Karena jumlah total pekerjaannya sama, algoritma reduksi pohon ini disebut **work-efficient**. Ini adalah properti yang sangat diinginkan; algoritma paralel yang tidak _work-efficient_ (misalnya, O(N log N)) bisa jadi lebih lambat dari versi sekuensialnya jika sumber daya komputasi terbatas.
> >
> > ### Implementasi Reduksi Paralel di CUDA
> >
> > Implementasi umum di CUDA menggunakan Shared Memory untuk melakukan reduksi di dalam satu _thread block_.
> >
> > **Alur Kernel**:
> >
> > 1. Setiap _thread_ dalam block memuat satu atau lebih elemen dari Global Memory ke sebuah array di Shared Memory (`partialSum[]`).
> >     
> > 2. Lakukan sinkronisasi (`__syncthreads()`) untuk memastikan semua data telah dimuat.
> >     
> > 3. Lakukan reduksi pohon di dalam Shared Memory dalam sebuah loop `log(N)` langkah.
> >     
> > 4. Setelah loop selesai, thread pertama (`threadIdx.x == 0`) menulis hasil akhir dari Shared Memory kembali ke Global Memory.
> >     
> >
> > **Contoh Kode Reduksi Naif (dalam loop reduksi):**
> >
> > ```cpp
> > for (unsigned int stride = 1; stride < blockDim.x; stride *= 2) {
> >     __syncthreads();
> >     if (threadIdx.x % (2 * stride) == 0) {
> >         partialSum[threadIdx.x] += partialSum[threadIdx.x + stride];
> >     }
> > }
> > ```
> >
> > Implementasi ini **tidak efisien** karena menyebabkan _control divergence_ yang parah. Pada setiap iterasi, setengah dari thread menjadi tidak aktif.
> >
> > ### Implementasi yang Lebih Baik: Mencegah Divergence
> >
> > Untuk menghindari _divergence_, kita harus memastikan bahwa semua thread yang aktif dalam satu _warp_ selalu berdekatan (kompak). Ini disebut **thread compaction**.
> >
> > **Kode yang Dioptimalkan (dalam loop reduksi):**
> >
> > ```cpp
> > for (unsigned int stride = blockDim.x / 2; stride > 0; stride /= 2) {
> >     __syncthreads();
> >     if (threadIdx.x < stride) {
> >         partialSum[threadIdx.x] += partialSum[threadIdx.x + stride];
> >     }
> > }
> > ```
> >
> > - **Cara Kerja**: Alih-alih membuat thread ganjil menjadi tidak aktif, pendekatan ini membuat separuh _terakhir_ dari thread menjadi tidak aktif.
> >     
> > - **Keuntungan**: Selama `stride` lebih besar dari ukuran _warp_ (32), seluruh _warp_ akan aktif atau tidak aktif bersamaan. Ini menghilangkan _control divergence_ untuk sebagian besar iterasi, hanya menyisakannya di beberapa langkah terakhir, sehingga performanya jauh lebih baik.
> >     

> [!cornell] #### Summary
> 
> Reduksi adalah pola komputasi paralel fundamental untuk meringkas dataset menjadi satu nilai melalui operasi asosiatif. Implementasi yang efisien menggunakan struktur Reduksi Pohon (Reduction Tree) yang memiliki kompleksitas waktu O(log N) dan kerja O(N), menjadikannya work-efficient. Di CUDA, reduksi biasanya diimplementasikan di dalam thread block menggunakan Shared Memory, dan sangat penting untuk menggunakan strategi thread compaction untuk meminimalkan control divergence dan memaksimalkan performa.

> [!ad-libitum]- Additional Information
> 
> #### Menangani Array yang Sangat Besar (Inter-Block Reduction)
> 
> Satu _thread block_ hanya bisa mereduksi sejumlah elemen yang terbatas (misalnya, 1024 atau 2048, tergantung ukuran block dan shared memory). Untuk array dengan jutaan elemen, diperlukan pendekatan multi-langkah:
> 
> 1. **Kernel Reduksi Parsial**: Luncurkan kernel reduksi pertama dengan banyak block. Setiap block mereduksi satu bagian dari array input dan menulis hasil parsialnya (satu nilai per block) ke sebuah array perantara di Global Memory.
>     
> 2. **Kernel Reduksi Final**: Luncurkan kernel reduksi kedua (biasanya hanya dengan satu block) yang membaca array hasil parsial tadi dan mereduksinya menjadi satu nilai akhir.
>     
> 3. **Alternatif Langkah 2**: Jika jumlah hasil parsial cukup kecil (misalnya, beberapa ribu), Host (CPU) dapat menyalin array tersebut dari GPU dan melakukan reduksi final secara sekuensial, terkadang ini lebih cepat daripada meluncurkan kernel kedua.
>     
> 
> #### Reduksi dan Floating Point
> 
> Meskipun penjumlahan secara matematis bersifat asosiatif, pada komputasi floating-point di komputer, urutan operasi dapat sedikit mengubah hasil akhir karena adanya error pembulatan. Hasil reduksi paralel mungkin sedikit berbeda dari reduksi sekuensial. Ini bukanlah _bug_, melainkan sifat dari aritmatika floating-point. Untuk sebagian besar aplikasi, perbedaan ini dapat diabaikan, tetapi untuk kasus yang memerlukan presisi tinggi, ini adalah sesuatu yang perlu diperhatikan.
> 
> #### Eksplorasi Mandiri
> 
> - Coba pikirkan bagaimana Anda akan mengimplementasikan operasi reduksi `max` (mencari nilai maksimum) menggunakan pola yang dioptimalkan. Perubahan apa yang perlu dilakukan pada kode? (Petunjuk: hanya inisialisasi dan operasinya saja yang berubah).
>     
> - Bandingkan performa antara kernel reduksi naif (dengan `%`) dan kernel yang dioptimalkan (dengan `< stride`). Anda akan melihat perbedaan yang signifikan, terutama pada GPU modern.
>