---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3140 Sistem Basis Data]]

> [!cornell] Topic
> 
> > Evaluasi Ekspresi: Materialization vs Pipelining
> > 
> > ## Questions/Cues
> > 
> > - Apa itu Evaluasi Ekspresi?
> >     
> > - Apa itu strategi Materialization?
> >     
> > - Apa analogi Materialization?
> >     
> > - Apa kelebihan & kekurangan Materialization?
> >     
> > - Apa itu Double Buffering?
> >     
> > - Apa itu strategi Pipelining?
> >     
> > - Apa analogi Pipelining?
> >     
> > - Apa kelebihan & kekurangan Pipelining?
> >     
> > - Apa dua model eksekusi Pipelining?
> >     
> > - Apa itu Demand-Driven Pipelining?
> >     
> > - Apa itu Producer-Driven Pipelining?
> >     
> > - Bagaimana implementasi Demand-Driven Pipelining?
> >     
> > - Apa itu "Blocking Algorithm"?
> >     
> > - Bagaimana Pipelining menangani algoritma Blocking?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 46-53
>    
> > 
> > ### Gambaran Umum Evaluasi Ekspresi
> > 
> > Setelah _query_ di-parse dan dioptimasi, _query execution engine_ mendapatkan sebuah _expression tree_ (pohon ekspresi relasional aljabar). Tugas engine adalah mengeksekusi pohon ini untuk mendapatkan hasil akhir. Ada dua strategi utama untuk mengeksekusi pohon ini:
> > 
> > 1. **Materialization**
> >     
> > 2. **Pipelining**
> >     
> > 
> > ### 1. Materialization
> > 
> > **Materialization** adalah pendekatan evaluasi di mana setiap operasi dalam pohon dieksekusi satu per satu, dimulai dari level terendah (daun).
> > 
> > - **Proses:** Hasil dari setiap operasi _ditulis_ (dimaterialisasi) ke disk sebagai **relasi sementara** (temporary relation).
> >     
> > - Operasi di level berikutnya (induknya) kemudian akan membaca relasi sementara ini dari disk sebagai inputnya.
> >     
> > - Ini terus berlanjut hingga operasi di _root_ (akar) pohon selesai dan menghasilkan jawaban akhir.
> >     
> >  ![[Pasted image 20251024024350.png]]
> >     
> > 
> > #### Kelebihan dan Kekurangan Materialization
> > 
> > - **Kelebihan:**
> >     
> >     - **Selalu Berlaku (Always Applicable):** Metode ini sederhana dan selalu bisa digunakan untuk operasi apa pun.
> >         
> > - **Kekurangan:**
> >     
> >     - **Biaya Tinggi:** Sangat mahal karena melibatkan banyak operasi I/O (Input/Output) ke disk. Biaya totalnya adalah jumlah biaya semua operasi _ditambah_ biaya untuk **menulis** dan **membaca kembali** semua relasi sementara dari disk.
> >         
> > 
> > #### Optimasi: Double Buffering
> > 
> > Untuk mengurangi waktu tunggu saat menulis ke disk, **double buffering** bisa digunakan.
> > 
> > - Sistem menggunakan _dua buffer output_ untuk satu operasi.
> >     
> > - Saat buffer pertama penuh dan sedang dalam proses ditulis ke disk, operasi dapat langsung mulai mengisi buffer kedua.
> >     
> > - Ini memungkinkan **overlap** (tumpang tindih) antara waktu komputasi (mengisi buffer) dan waktu disk I/O (menulis buffer), sehingga mengurangi total waktu eksekusi.
> >     
> > 
> > ### 2. Pipelining
> > 
> > **Pipelining** adalah pendekatan evaluasi di mana beberapa operasi dieksekusi secara bersamaan (simultan) dalam sebuah "aliran data".
> > 
> > - **Proses:** Hasil (tuple) dari satu operasi _tidak disimpan ke disk_. Sebaliknya, tuple tersebut langsung diteruskan (di-passing) ke operasi induknya (parent) sebagai input.
> >     
> > - Operasi induk langsung memproses tuple yang baru diterimanya dan meneruskan hasilnya lagi ke induknya, dan begitu seterusnya.
> >     
> > 
> > ![[Pasted image 20251024024416.png]]
> >     
> > 
> > #### Kelebihan dan Kekurangan Pipelining
> > 
> > - **Kelebihan:**
> >     
> >     - **Jauh Lebih Murah:** Jauh lebih efisien daripada materialization karena **menghilangkan biaya I/O disk** untuk menyimpan dan membaca relasi sementara.
> >         
> > - **Kekurangan:**
> >     
> >     - **Tidak Selalu Bisa:** Pipelining tidak bisa diterapkan pada semua algoritma. Algoritma yang bersifat **"blocking"** (membutuhkan semua input sebelum bisa menghasilkan output pertama) tidak dapat di-pipeline. Contohnya: `sort` atau `hash-join` (pada fase _build_).
> >         
> > 
> > #### Model Eksekusi Pipelining
> > 
> > Ada dua cara untuk mengelola aliran data dalam pipeline:
> > 
> > 1. **Demand-Driven (Lazy Evaluation / Pull Model):**
> >     
> >     - Operasi di level atas (root) "meminta" (requests) satu tuple dari anaknya.
> >         
> >     - Anak tersebut kemudian meminta tuple dari anak-anaknya, dan begitu seterusnya ke bawah.
> >         
> >     - Setiap operasi harus menyimpan "state" (status/posisi terakhirnya) agar tahu tuple mana yang harus dikirim selanjutnya saat diminta lagi.
> >         
> > 2. **Producer-Driven (Eager Pipelining / Push Model):**
> >     
> >     - Operasi di level bawah (daun) "secara antusias" (eagerly) menghasilkan tuple dan "mendorong" (pushes) ke atas ke induknya.
> >         
> >     - Sebuah **buffer** (antrian) diletakkan di antara setiap operator (anak dan induk).
> >         
> >     - Anak memproduksi tuple dan menaruhnya di buffer. Induk mengambil tuple dari buffer untuk diproses.
> >         
> >     - Jika buffer penuh, operator anak akan berhenti (wait) sampai ada ruang kosong.
> >         
> > 
> > #### Implementasi: Model Iterator (untuk Demand-Driven)
> > 
> > Implementasi paling umum untuk _demand-driven pipelining_ adalah menggunakan **model iterator**. Setiap operator (operasi) di pohon query diimplementasikan sebagai sebuah _iterator_ yang memiliki tiga metode utama:
> > 
> > 1. `open()`: Melakukan inisialisasi. (Contoh: untuk _file scan_, `open()` akan menyiapkan pointer ke awal file. Untuk _merge join_, `open()` akan menyortir relasi input terlebih dahulu).
> >     
> > 2. `next()`: Menghasilkan satu tuple output berikutnya. Ini adalah inti dari pipeline. Saat `next()` dipanggil, operator akan memanggil `next()` pada anak-anaknya seperlunya untuk mendapatkan input yang dibutuhkan. (Contoh: untuk _file scan_, `next()` akan membaca tuple berikutnya dan memajukan pointer file).
> >     
> > 3. `close()`: Membersihkan state setelah semua tuple habis.
> >     
> > 
> > #### Pipelining dan "Blocking Algorithms"
> > 
> > Beberapa algoritma secara alami bersifat _blocking_—mereka tidak bisa menghasilkan output pertama sampai mereka melihat semua data input. Contohnya, `sort` (tidak bisa tahu tuple minimum sebelum melihat semua tuple) atau `hash-join` (harus membangun seluruh _hash table_ dari relasi _build_ terlebih dahulu).
> > 
> > Untuk algoritma ini, pipeline "terputus". Sistem terpaksa menggunakan _materialization_ di titik tersebut (misalnya, hasil `sort` ditulis ke disk, lalu dibaca lagi oleh operator di atasnya).
> > 
> > Namun, beberapa algoritma varian (seperti _hybrid hash-join_) dirancang agar "setidaknya" bisa menghasilkan _beberapa_ output secara _on-the-fly_ (misalnya, hasil join dari partisi 0 yang ada di memori) sambil tetap memproses sisa datanya.

> [!cornell] #### Summary
> 
> Evaluasi ekspresi query dapat dilakukan dengan dua cara utama: **Materialization** dan **Pipelining**. **Materialization** adalah pendekatan langkah-demi-langkah di mana setiap hasil operasi disimpan sementara ke disk, sebuah metode yang selalu bisa diterapkan namun memakan biaya I/O yang tinggi. Sebaliknya, **Pipelining** mengalirkan tuple antar operasi secara bersamaan tanpa menyimpannya ke disk, sehingga jauh lebih efisien. Pipelining dapat diimplementasikan dengan model _demand-driven_ (pull/lazy) menggunakan iterator (`open`, `next`, `close`) atau _producer-driven_ (push/eager) menggunakan buffer. Namun, Pipelining tidak bisa diterapkan pada _blocking algorithm_ seperti `sort` atau `hash-join` yang harus memproses seluruh inputnya terlebih dahulu.

> [!ad-libitum]- Additional Information
> 
> #### Analisis Mendalam: Iterator vs. Buffering (Pull vs. Push)
> 
> - **Model Iterator (Demand-Driven/Pull):** Model ini, yang dipopulerkan oleh sistem "Volcano", sangat elegan. Kontrol alirannya sederhana: pemanggil (parent) memegang kendali penuh kapan ia ingin memproses data. Ini menyederhanakan logika _query plan_ dan _error handling_. Namun, pemanggilan fungsi `next()` yang berulang-ulang (satu per tuple, dari atas sampai bawah pohon) dapat menimbulkan _overhead_ CPU (disebut _function call overhead_).
>     
> - **Model Buffering (Producer-Driven/Push):** Model ini sering digunakan dalam sistem _stream processing_ modern (seperti Apache Flink) dan juga sistem database yang berorientasi pada _throughput_ (disebut juga _vectorized processing_ atau _batch processing_). Operator "mendorong" sekumpulan (batch/vector) tuple sekaligus ke buffer, bukan satu per satu. Ini secara drastis mengurangi _function call overhead_ dan memanfaatkan _CPU cache_ dengan lebih baik, sehingga _throughput_ data menjadi jauh lebih tinggi.
>     
> 
> #### Analisis Mendalam: Blocking (Pipeline Breakers)
> 
> Operator yang "memutus" pipeline (disebut _pipeline breakers_) adalah titik kritis dalam optimasi query.
> 
> - **Non-Blocking (Pipelined Penuh):** $\sigma$ (Selection), $\Pi$ (Projection). Keduanya bisa memproses tuple satu per satu saat mereka tiba.
>     
> - **Full Blocking (Harus Materialisasi):** `Sort`, `GROUP BY`/Aggregation (yang berbasis sort), `Hash Join` (pada fase _build_), `Merge Join` (pada fase _sort_). Mereka harus mengkonsumsi _seluruh_ input sebelum bisa menghasilkan _satu_ output pun.
>     
> - **Partial Blocking (Hybrid):** `Hash Join` (pada fase _probe_) dan `Hybrid Hash Join`. Mereka bisa mulai menghasilkan output _setelah_ fase _build_ selesai (untuk Hash Join standar) atau bahkan _selama_ fase _probe_ untuk partisi pertama (untuk Hybrid Hash Join).
>     
> 
> _Query optimizer_ modern akan berusaha keras untuk meminimalkan jumlah _pipeline breakers_ dalam sebuah _execution plan_, atau setidaknya menempatkannya di titik di mana data yang harus diproses sudah sekecil mungkin (misalnya, setelah operasi _selection_ yang sangat selektif).
> 
> #### Eksplorasi Mandiri
> 
> - Cari tahu tentang **Vectorized Execution** (atau _Batch-Oriented Processing_) yang digunakan oleh sistem seperti MonetDB atau ClickHouse. Bagaimana model ini berhubungan dengan Pipelining? (Petunjuk: Ini adalah varian dari model _producer-driven_ yang memproses data dalam _batch_ atau _vector_, bukan tuple per tuple).
>     
> - Baca paper "Volcano - An Extensible and Parallel Query Evaluation System" oleh Goetz Graefe. Ini adalah paper fundamental yang memperkenalkan model iterator `open-next-close` ke dunia database.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku:** Silberschatz, Korth, Sudarshan: "Database System Concepts", 7th Edition, Chapter 15.
>     
> - **Paper:** Graefe, G. (1994). Volcano - An Extensible and Parallel Query Evaluation System. _IEEE Transactions on Knowledge and Data Engineering_.
>