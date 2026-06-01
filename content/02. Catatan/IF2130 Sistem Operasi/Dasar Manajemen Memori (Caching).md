---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Dasar Manajemen Memori: Caching
> 
> > ## Questions/Cues
> > 
> > - Apa itu caching?
> >     
> > - Mengapa caching sangat penting?
> >     
> > - Bagaimana hierarki memori?
> >     
> > - Bagaimana algoritma dasar caching?
> >     
> > - Apa itu Prinsip Lokalitas?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 36-39, IF2130-01-2025-OSIntro.pdf
> >     
>  
> > ### Apa itu Caching?
> > 
> > Caching adalah sebuah teknik fundamental dalam ilmu komputer di mana sejumlah kecil data disimpan sementara dalam **komponen memori yang berkecepatan tinggi (cache)**. Tujuannya adalah untuk mempercepat akses data di masa depan.
> > 
> > - **Ide Utama**: Daripada selalu mengambil data dari sumber yang lambat (seperti hard disk atau memori utama/RAM), sistem akan terlebih dahulu memeriksa apakah data yang dibutuhkan sudah ada di cache yang jauh lebih cepat.
> >     
> > 
> > ### Mengapa Caching Penting?
> > 
> > Tujuan utama desain sistem operasi adalah **performa yang cepat dan efisien**. Terdapat kesenjangan kecepatan yang sangat besar antara CPU dan perangkat penyimpanan. CPU dapat memproses data jutaan kali lebih cepat daripada hard disk dapat membacanya. Caching berfungsi sebagai **jembatan** untuk mengatasi kesenjangan ini. Tanpa caching, CPU akan menghabiskan sebagian besar waktunya hanya untuk menunggu data datang dari memori yang lebih lambat.
> > 
> > ### Hierarki Memori
> > 
> > Sistem komputer modern tidak menggunakan satu jenis memori, melainkan beberapa level memori yang membentuk sebuah hierarki. Semakin tinggi levelnya, semakin **cepat**, **kecil ukurannya**, dan **mahal harganya per bit**.
> > 
> > 
> > |**Level**|**Nama**|**Ukuran Tipikal**|**Waktu Akses (ns)**|**Dikelola Oleh**|
> > |---|---|---|---|---|
> > |1|Registers|< 1 KB|0.25 - 0.5|Compiler|
> > |2|Cache (L1-L3)|> 16 MB|0.5 - 25|Hardware|
> > |3|Main Memory (RAM)|> 16 GB|80 - 250|Sistem Operasi|
> > |4|Disk Storage|> 100 GB|5,000,000+|Sistem Operasi|
> > 
> > Data berpindah ke atas hierarki saat digunakan. OS berperan penting dalam mengelola pergerakan data antara Memori Utama dan Disk.
> > 
> > ![[Pasted image 20251019130151.png]]
> > 
> > ### Algoritma Dasar Caching
> > 
> > Proses caching bekerja dengan algoritma sederhana:
> > 
> > 1. Ketika CPU membutuhkan data dari memori, ia akan **memeriksa cache terlebih dahulu**.
> >     
> > 2. **Jika data ditemukan di cache (disebut** _**Cache Hit**_**)**: Data langsung dibaca dari cache dengan sangat cepat.
> >     
> > 3. **Jika data tidak ditemukan di cache (disebut** _**Cache Miss**_**)**: Data akan disalin dari memori utama (yang lebih lambat) ke dalam cache. Setelah itu, data baru dibaca dari cache oleh CPU. Harapannya, jika data ini dibutuhkan lagi nanti, ia sudah ada di cache (_cache hit_).
> >     
> > 
> > ### Prinsip Lokalitas (Principle of Locality)
> > 
> > Caching bisa sangat efektif karena program komputer cenderung menunjukkan "prinsip lokalitas" dalam mengakses memori. Ada dua jenis lokalitas:
> > 
> > 1. **Lokalitas Temporal (Waktu)**: Jika sebuah item data diakses, kemungkinan besar item yang sama akan **diakses lagi dalam waktu dekat**. Contoh: variabel dalam sebuah loop.
> >     
> > 2. **Lokalitas Spasial (Ruang)**: Jika sebuah item data di lokasi memori X diakses, kemungkinan besar item data di **lokasi yang berdekatan** (seperti X+1, X+2) akan diakses segera setelahnya. Contoh: mengakses elemen-elemen sebuah array secara berurutan.
> >     
> > 
> > Karena prinsip ini, daripada menyalin hanya satu byte data, sistem akan menyalin satu blok atau halaman data (misalnya 64KB) ke dalam cache saat terjadi _cache miss_. Ini meningkatkan peluang terjadinya _cache hit_ untuk akses data berikutnya.

> [!cornell] #### Summary
> 
> Caching adalah teknik optimasi performa krusial yang menjembatani kesenjangan kecepatan masif dalam hierarki memori, dari register CPU yang sangat cepat hingga disk yang lambat. Dengan menyimpan data yang sering digunakan di memori cache berkecepatan tinggi, sistem dapat mengurangi waktu tunggu CPU secara drastis. Efektivitas caching sangat bergantung pada Prinsip Lokalitas (temporal dan spasial), di mana pola akses data oleh program dapat diprediksi, sehingga memungkinkan cache untuk menyimpan data yang relevan sebelum benar-benar dibutuhkan, yang pada akhirnya meningkatkan throughput dan responsivitas sistem secara keseluruhan.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis 1: Cache Replacement Policies
> 
> Apa yang terjadi ketika cache sudah penuh dan terjadi _cache miss_? Sistem harus memutuskan data mana di dalam cache yang harus "diusir" (evict) untuk memberi ruang bagi data baru. Kebijakan untuk memutuskan ini disebut _Replacement Policy_. Beberapa yang umum adalah:
> 
> - **LRU (Least Recently Used)**: Mengusir data yang paling lama tidak digunakan. Ini didasarkan pada asumsi lokalitas temporal.
>     
> - **FIFO (First-In, First-Out)**: Mengusir data yang pertama kali masuk, seperti antrean.
>     
> - **Random**: Mengusir data secara acak. Sederhana untuk diimplementasikan dan terkadang performanya tidak jauh berbeda dari kebijakan yang lebih kompleks.
>     
> 
> #### Pendalaman Teknis 2: Cache Coherence di Sistem Multi-Core
> 
> Pada CPU modern dengan banyak core, setiap core seringkali memiliki cache L1 dan L2-nya sendiri. Masalah muncul ketika beberapa core menyimpan salinan dari data memori yang sama di cache masing-masing. Jika satu core mengubah data tersebut, salinan di cache core lain menjadi usang (stale). Masalah untuk menjaga agar semua cache memiliki pandangan data yang konsisten disebut **Cache Coherence Problem**. Protokol perangkat keras yang kompleks seperti MESI (Modified, Exclusive, Shared, Invalid) digunakan untuk mengatasi masalah ini secara otomatis.
> 
> #### Eksplorasi Mandiri
> 
> - **Periksa Cache CPU Anda**: Gunakan perangkat lunak untuk melihat spesifikasi cache pada CPU Anda.
>     
>     - Di **Windows**, unduh dan jalankan aplikasi gratis seperti **CPU-Z**. Tab "Caches" akan menunjukkan ukuran cache L1, L2, dan L3 Anda.
>         
>     - Di macOS atau Linux, buka terminal. Di macOS, coba perintah sysctl -a | grep cache. Di Linux, coba lscpu | grep cache.
>         
>         Anda akan melihat bagaimana hierarki cache ini diimplementasikan pada perangkat keras yang Anda gunakan sehari-hari.
>         
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Video**: Cari "How CPU Caches Work" di YouTube untuk menemukan banyak visualisasi animasi yang menjelaskan konsep ini secara intuitif.
>     
> - **Artikel**: "What Every Programmer Should Know About Memory" oleh Ulrich Drepper. Ini adalah bacaan yang sangat mendalam dan teknis, tetapi dianggap sebagai referensi klasik tentang bagaimana memori dan caching bekerja dari perspektif seorang programmer.
>