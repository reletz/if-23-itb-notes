---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2130 Sistem Operasi]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Tujuan Manajemen Memori?
> > - Alamat Logis vs Fisik?
> > - Peran Unit Manajemen Memori (MMU)?
> > - Apa itu Pemuatan Dinamis?
> > - Bagaimana Pemuatan Dinamis bekerja?
> > - Definisi Alokasi Memori Berdekatan?
> > - Bagaimana proteksi memori bekerja?
> > - Masalah Alokasi Penyimpanan Dinamis?
> > - Strategi alokasi First-Fit?
> > - Strategi alokasi Best-Fit?
> > - Strategi alokasi Worst-Fit?
> > - Perbandingan strategi alokasi?
> > - Apa itu Fragmentasi?
> > - Perbedaan Fragmentasi Eksternal & Internal?
> > - Aturan 50 Persen?
> > - Apa itu Kompaksi?
> > - Syarat dan biaya Kompaksi?
> > - Masalah I/O saat Kompaksi?
>
> > ### Konsep Dasar Manajemen Memori
> > Tujuan utamanya adalah untuk mengelola sumber daya memori utama (RAM) secara efisien. Dalam sistem operasi modern, beberapa proses perlu berada di memori secara bersamaan untuk memaksimalkan penggunaan CPU dan meningkatkan kecepatan respons sistem bagi pengguna. Manajemen memori adalah mekanisme yang bertanggung jawab untuk mengalokasikan ruang memori yang tersedia kepada proses-proses tersebut.
> >
>> Memori dapat dibayangkan seperti **deretan besar byte, di mana setiap byte memiliki alamat yang unik**. CPU mengambil instruksi dari memori berdasarkan alamat yang ditunjuk oleh _program counter_. Instruksi ini bisa menyuruh CPU mengambil data lain dari memori atau menyimpan hasil perhitungan ke memori.
>> 
> >  **Perangkat Keras Dasar Memori**
> > - Hanya **memori utama (RAM) dan register** (penyimpanan super cepat di dalam CPU) yang bisa diakses langsung oleh CPU.
> > - Semua instruksi yang akan dijalankan dan data yang akan dipakai harus ada di salah satu dari dua tempat ini. Jika data awalnya ada di disk, ia harus dipindahkan dulu ke memori utama.
> > - Akses ke **register** sangat cepat, bisa dalam satu denyut jam CPU.
> > - Akses ke **memori utama (RAM)** lebih lambat karena harus melalui jalur khusus (bus memori) dan bisa memakan beberapa denyut jam.
> >
> > ** Proteksi Memori **
>> Sistem operasi harus dilindungi dari program pengguna, dan program pengguna juga harus dilindungi satu sama lain. Proteksi ini biasanya dilakukan oleh hardware. Salah satu caranya pakai dua register khusus:
> > - Register Basis (Base Register): Menyimpan alamat fisik terkecil yang boleh diakses program.
> > - Register Batas (Limit Register): Menyimpan ukuran jangkauan alamat yang boleh diakses program.
> >
> > Sebuah akses dianggap ilegal jika:
> > - Alamat yang dituju lebih kecil dari isi `Register Basis`.
> > 
> > **ATAU**
> > - Alamat yang dituju lebih besar atau sama dengan `(Register Basis + Register Limit)`.
> > Jika akses ilegal terjadi, akan timbul _error_ dan program akan dihentikan oleh sistem operasi.
> > ![[Pasted image 20250609130332.png]]
> > ![[Pasted image 20250609130359.png]]
> > 
> > ** Alamat Logis vs. Fisik **
> > - **Ruang Alamat Logis (Logical Address Space):** Adalah alamat yang dihasilkan oleh CPU, sering juga disebut alamat virtual. Alamat ini adalah cara pandang sebuah proses terhadap memori. Setiap proses memiliki ruang alamat logisnya sendiri, dimulai dari alamat 0.
> > - **Ruang Alamat Fisik (Physical Address Space):** Adalah alamat yang sesungguhnya dilihat oleh unit memori (RAM). Ini adalah alamat lokasi fisik di dalam chip memori.
> > - **Analogi:** Alamat logis seperti nomor kamar di sebuah hotel besar (#101, #205), yang unik untuk setiap tamu (proses). Alamat fisik adalah lokasi _sebenarnya_ dari kamar itu di dalam gedung (misalnya, Lantai 2, koridor barat, kamar ke-3).
> >
> > ** Peran Unit Manajemen Memori (MMU) **
> > MMU adalah komponen perangkat keras (hardware) yang berfungsi sebagai "penerjemah". Tugasnya adalah menerjemahkan alamat logis yang diberikan oleh CPU menjadi alamat fisik yang sesuai di memori utama. Proses penerjemahan ini terjadi secara _runtime_ untuk setiap akses memori. Tanpa mekanisme yang canggih, ukuran sebuah proses bisa jadi **dibatasi oleh ukuran memori fisik** yang tersedia.
> > Contoh Kerja MMU dengan Register Relokasi:
> > - Register relokasi (mirip register basis) menyimpan alamat awal sebuah program di memori fisik.
> > - Nilai di register ini ditambahkan ke setiap alamat logis yang dibuat program.
> > - **Contoh:** Register relokasi berisi `14000`. Program ingin akses alamat logis `346`. Maka, alamat fisik yang diakses adalah `14000 + 346 = 14346`. Program itu sendiri tidak pernah tahu alamat fisik aslinya.
> > ![[Pasted image 20250609130605.png]]
> >
> > ### Teknik Efisiensi Memori
> > ** Address Binding **
> > Alamat-alamat di program itu bisa berubah-ubah bentuknya selama proses ini:
> > - _Waktu Kompilasi (Compile Time)_: Kalau dari awal sudah tahu persis programnya mau ditaruh di alamat memori mana, compiler (program yang nerjemahin kode sumber jadi bahasa mesin) bisa langsung bikin kode dengan alamat absolut (alamat pasti). Tapi kalau nanti lokasinya pindah, kodenya harus dikompilasi ulang.
> > - _Waktu Pemuatan (Load Time)_: Kalau pas kompilasi belum tahu mau ditaruh di mana, compiler bikin kode yang alamatnya bisa dipindah-pindah (relocatable code). Nanti pas programnya dimuat ke memori, baru alamat pastinya ditentuin.
> > -  _Waktu Eksekusi (Execution Time)_: Kalau programnya bisa dipindah-pindah di memori pas lagi jalan, penentuan alamat pastinya ditunda sampai bener-bener mau dipakai. Ini butuh bantuan hardware khusus dan ini yang paling umum dipakai sistem operasi modern.
> >
> > ** Pemuatan Dinamis (Dynamic Loading)**
> > Sebuah teknik untuk mendapatkan penggunaan ruang memori yang lebih baik. Dengan pemuatan dinamis, sebuah _routine_ (bagian dari program, seperti fungsi) **tidak akan dimuat ke memori sampai _routine_ tersebut dipanggil**.
> > Proses Pemuatan Dinamis:
> >  1. Semua _routine_ disimpan di disk dalam format pemuatan yang dapat direlokasi (_relocatable loading format_).
> >  2. Program utama dimuat ke memori dan dieksekusi terlebih dahulu.
> >  3. Ketika sebuah _routine_ pemanggil perlu memanggil _routine_ lain, ia pertama-tama memeriksa apakah _routine_ yang akan dipanggil itu sudah dimuat di memori.
> >  4. Jika belum, _relocatable linking loader_ akan dipanggil untuk memuat _routine_ yang diinginkan dari disk ke memori.
> >  5. Loader kemudian memperbarui tabel alamat program untuk mencerminkan perubahan ini.
> >  6. Terakhir, kontrol eksekusi diteruskan ke _routine_ yang baru saja dimuat.
> >
> > ** Penyambungan Dinamis (Dynamic Linking) **
> > Biasanya program kita pakai fungsi-fungsi dari library (kumpulan kode yang sudah jadi, misalnya buat ngurusin teks atau matematika).
> > - _Static Linking_: Library digabungin langsung ke program kita pas kompilasi. Program jadi gede, dan kalau banyak program pakai library yang sama, jadi boros memori karena tiap program punya kopiannya sendiri.
> > - _Dynamic Linking_: Penyambungan ke library ditunda sampai programnya jalan. Library-nya (disebut Dynamically Linked Libraries - DLLs atau Shared Libraries) dimuat ke memori cuma sekali, terus bisa dipakai bareng-bareng sama banyak program. Ini hemat memori! Kalau library-nya di-update (misalnya ada perbaikan bug), semua program yang pakai otomatis dapat versi baru tanpa perlu dikompilasi ulang. Sistem operasi bantu ngurusin ini.
> > ### Alokasi Memori Kontigu
> > ** Definisi **
> > - Dalam skema ini, setiap proses dimuat ke dalam **satu bagian memori tunggal yang berdekatan** (tidak terpecah-pecah). 
> > - Pas CPU mau ngejalanin satu program, ada bagian namanya dispatcher yang bakal ngatur register relokasi (sama kayak register basis, nyimpen alamat awal program di RAM) dan register limit (nyimpen ukuran program). Setiap kali program itu akses memori, alamatnya dicek dulu sama register ini. Jadi, sistem operasi dan program lain aman tidak bakal diacak-acak.
> > 
> > **Dynamic Storage-Allocation Problem**
> > Saat proses masuk dan keluar, memori akan memiliki banyak **"lubang" (_hole_)** atau ruang kosong dengan ukuran bervariasi. Tantangannya adalah: Bagaimana cara paling efisien untuk memilih _hole_ yang akan digunakan untuk proses baru? Jika _hole_ yang dipilih terlalu besar, sisanya akan menjadi _hole_ baru yang lebih kecil. Jika proses selesai, ruang yang ditinggalkannya menjadi _hole_ baru dan bisa digabung dengan _hole_ tetangganya. Makanya, ada strategi Pemilihan _Hole_:
> > - **First-Fit:** Mengalokasikan **_hole_ pertama** yang ditemukan yang ukurannya cukup besar. Strategi ini cepat.
> > - **Best-Fit:** Mengalokasikan **_hole_ terkecil** yang ukurannya masih cukup. Strategi ini menghasilkan sisa _hole_ yang sangat kecil (seringkali tidak berguna), namun harus mencari di seluruh daftar.
> > - **Worst-Fit:** Mengalokasikan **_hole_ terbesar**. Idenya adalah sisa _hole_-nya akan tetap cukup besar untuk digunakan proses lain.
> > - **Next-Fit:** Alokasi dilanjutkan dari tempat alokasi terakhir.
> >
> > Simulasi menunjukkan bahwa **First-Fit dan Best-Fit lebih baik daripada Worst-Fit** dalam hal kecepatan dan utilisasi memori. First-Fit umumnya menjadi yang tercepat.
> >
> >** Fragmentasi**
> > Baik strategi first-fit maupun best-fit menderita fragmentasi eksternal.
> >
> > - _Fragmentasi Eksternal_: **Total ruang memori ada untuk memuaskan permintaan, tetapi ruang tersebut tidak berdekatan**. Ruang penyimpanan terfragmentasi menjadi sejumlah besar hole kecil. Masalah fragmentasi ini bisa parah. Dalam kasus terburuk, mungkin ada blok memori bebas di antara setiap dua proses. Jika semua potongan memori kecil ini berada dalam satu blok bebas besar, beberapa proses lagi mungkin dapat dijalankan. Analisis first fit menunjukkan bahwa, _bahkan dengan beberapa optimasi, dengan N blok yang dialokasikan, 0.5 N blok akan hilang karena fragmentasi. Artinya, sepertiga memori mungkin tidak dapat digunakan_, dikenal sebagai **aturan 50 persen**.
> > - _Fragmentasi Internal_: **Memori yang dialokasikan mungkin sedikit lebih besar dari memori yang diminta**. Perbedaan ukuran ini adalah memori yang internal terhadap partisi, tetapi tidak digunakan. Pendekatan umum untuk menghindari masalah ini adalah memecah memori fisik menjadi blok berukuran tetap dan mengalokasikan memori dalam unit berdasarkan ukuran blok.
> > 
> > ** Kompaksi **
> > Fragmentasi eksternal bisa dikurangin pakai cara kompaksi (compaction). 
> > - Proses "menggeser" semua proses yang ada di memori ke satu sisi untuk menyatukan semua _hole_ yang terpecah menjadi satu blok besar yang kosong.
>> - Kompaksi hanya mungkin jika pengikatan alamat bersifat **dinamis (execution time)**. Proses ini sangat **mahal** karena memakan banyak siklus CPU untuk memindahkan data dalam jumlah besar.
>> - Sebuah proses tidak dapat dipindahkan saat sedang melakukan operasi I/O. Solusinya adalah dengan "mengunci" proses tersebut di memori selama I/O berlangsung.
> > ![[Pasted image 20250609132905.png]]
> > ![[Pasted image 20250609132916.png]]

> [!cornell] #### Summary
> Manajemen memori bertujuan mengalokasikan RAM secara efisien untuk banyak proses, dengan konsep inti pemisahan alamat logis (dilihat program) dan fisik (di RAM) yang diterjemahkan oleh MMU dan dilindungi oleh register basis/batas. Metode alokasi berdekatan memberikan setiap proses satu blok memori utuh, namun menghadapi masalah besar yaitu _fragmentasi eksternal_, di mana memori kosong terpecah-pecah menjadi tidak dapat digunakan. Walaupun strategi seperti First-Fit dan Best-Fit mencoba mengoptimalkan alokasi, solusi akhirnya seperti _kompaksi_ terbukti mahal dan tidak efisien, yang mendorong kebutuhan akan teknik yang lebih canggih seperti Paging.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Implementasi Daftar _Hole_ (Free List):** Daftar ruang kosong atau _hole_ yang dijelaskan di catatan utama tidak hanya konsep, tetapi diimplementasikan menggunakan struktur data spesifik untuk efisiensi:
>   - **Untuk First-Fit:** Biasanya digunakan **Doubly Linked List** yang diurutkan berdasarkan alamat memori. Keuntungannya, ketika sebuah proses selesai dan memorinya dibebaskan, sistem dapat dengan mudah memeriksa blok tetangga (kiri dan kanan) untuk melihat apakah mereka juga _hole_. Jika ya, mereka bisa digabungkan (_coalesced_) menjadi satu _hole_ yang lebih besar dengan sangat cepat.
>   - **Untuk Best-Fit/Worst-Fit:** Menggunakan linked list biasa akan sangat lambat karena setiap alokasi harus memindai seluruh daftar (kompleksitas O(n)). Implementasi yang lebih canggih menggunakan struktur data yang diurutkan berdasarkan ukuran, seperti **Balanced Binary Search Tree** atau **Heap**, yang mengurangi waktu pencarian menjadi O(log n).
> - **Overhead Metadata:** Sistem Operasi perlu menyimpan informasi tentang setiap blok memori (apakah sedang digunakan atau bebas, ukurannya, penunjuk ke blok berikutnya/sebelumnya dalam daftar _hole_). Informasi ini (disebut **metadata**) juga memakan memori. Biasanya, metadata ini disimpan dalam sebuah _header_ kecil tepat sebelum blok memori yang sebenarnya. Ini adalah contoh fragmentasi internal yang hampir selalu ada. 
> - **Proses Coalescing (Penggabungan _Hole_):** Ini adalah detail penting saat membebaskan memori. Ketika sebuah blok `P` dibebaskan, algoritma akan memeriksa:  
 >   1. Apakah blok di sebelah kanan `P` juga _hole_? Jika ya, gabungkan.
 >   2. Apakah blok di sebelah kiri `P` juga _hole_? Jika ya, gabungkan. Proses ini mencegah akumulasi _hole-hole_ yang sangat kecil dan tidak berguna.
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks:**
>   - **Silberschatz, A., Galvin, P. B., & Gagne, G. (2018). _Operating System Concepts_. 10th Edition.** Bab-bab awal tentang manajemen memori di buku ini adalah referensi emas untuk semua konsep yang dibahas.
 >   - **Tanenbaum, A. S., & Bos, H. (2015). _Modern Operating Systems_. 4th Edition.** Memberikan perspektif yang sedikit berbeda dan seringkali lebih mendalam pada implementasi praktis.
 >   - **Bryant, R. E., & O'Hallaron, D. R. (2015). _Computer Systems: A Programmer's Perspective_.** Sangat direkomendasikan jika Anda ingin memahami bagaimana proses _linking_, _loading_, dan manajemen memori terlihat dari sudut pandang seorang programmer C.
> #### Eksplorasi Mandiri:
> - **Proyek Simulator Alokasi Memori:**
>   - **Tantangan:** Buatlah sebuah program sederhana menggunakan Python yang mensimulasikan alokasi memori berdekatan.
>    - **Langkah-langkah:**
>        1. Representasikan memori utama sebagai sebuah array atau list besar (misalnya, berukuran 1024 unit).
>        2. Implementasikan fungsi `alokasi(ukuran)` dan `bebaskan(posisi)`.
>        3. Terapkan ketiga strategi: First-Fit, Best-Fit, dan Worst-Fit. Anda bisa membuat pengguna memilih strategi mana yang akan dijalankan.
>        4. Buat fungsi untuk memvisualisasikan keadaan memori (misalnya, mencetak baris yang menunjukkan blok terpakai `[P]` dan blok kosong `[-]`).
>        5. Jalankan serangkaian alokasi dan pembebasan acak, lalu amati bagaimana fragmentasi eksternal terbentuk pada setiap strategi. Hitung total memori yang terbuang karena fragmentasi.