---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/OS]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Arsitektur Berlapis Sistem Berkas?
> > - Struktur Data di Disk vs. di Memori
> > - Peran Virtual File System (VFS)
> > - Opsi Implementasi Direktori
> > - Alokasi Berurutan (Contiguous)
> > - Alokasi Tertaut (Linked)
> > - Alokasi Terindeks (Indexed)
> > - Perbandingan Metode Alokasi 
>
> > ### Arsitektur Sistem Berkas Berlapis (Layered File System)
> > Sistem berkas modern diorganisir dalam lapisan-lapisan untuk memisahkan fungsionalitas dan mengurangi kompleksitas. Setiap lapisan menggunakan layanan dari lapisan di bawahnya.
> >
> > **Urutan Lapisan**
> > ![[Pasted image 20250609181856.png]]
> > 1. **Program Aplikasi:** Pengguna berinteraksi melalui program.
> > 2. **Sistem Berkas Logis:** Mengelola metadata, seperti struktur direktori dan _File Control Block_ (FCB)/inode. Ini adalah pandangan pengguna terhadap sistem berkas.
> > 3. **Modul Organisasi Berkas:** Bertanggung jawab untuk memetakan blok logis berkas ke blok fisik di disk. Juga mengelola alokasi ruang kosong.
> > 4. **Sistem Berkas Dasar:** Mengirimkan perintah generik (misalnya, "baca blok X") ke _device driver_ yang sesuai. Mengelola _caching_ dan _buffering_.
> > 5. **Kontrol I/O:** Berisi _device driver_ spesifik perangkat dan _interrupt handler_ yang berkomunikasi langsung dengan perangkat keras.
> > 6. **Perangkat:** Perangkat keras penyimpanan fisik (HDD, NVM/SSD).
> > 
> > Struktur ini mempermudah pengembangan (kode tidak duplikatif) tetapi dapat menambah _overhead_ kinerja karena setiap permintaan harus melewati beberapa lapisan.
> >
> > ### Struktur Data Filesystem
> > Sistem berkas memerlukan struktur data baik di penyimpanan permanen (disk) maupun di memori utama (RAM) untuk dapat beroperasi.
> > 
> > **Struktur di Disk (On-Storage):**
> > - **Boot Control Block:** Blok pertama volume, berisi informasi untuk mem-boot sistem operasi dari volume tersebut.
> > - **Volume Control Block (Superblock):** Berisi detail volume seperti total jumlah blok, ukuran blok, dan jumlah blok kosong.
> > - **Struktur Direktori:** Mengorganisir berkas dengan memetakan nama ke pengenal (misalnya, nomor inode).
> > - **File Control Block (FCB):** Satu FCB per berkas, berisi semua atribut berkas seperti izin, ukuran, dan lokasi blok data.
> >
> > **Struktur di Memori (In-Memory):**
> > - Ini adalah salinan atau _cache_ dari struktur di disk untuk mempercepat akses.
> > - **Mount Table:** Melacak semua volume sistem berkas yang sedang terpasang (di-_mount_).
> > - **Directory-Structure Cache:** Menyimpan informasi direktori yang baru diakses untuk mempercepat pencarian berkas.
> > - **System-Wide Open-File Table:** Berisi salinan FCB dari setiap berkas yang sedang dibuka di seluruh sistem.
> > - **Per-Process Open-File Table:** Melacak berkas yang dibuka oleh setiap proses individu.
> > - **Buffers:** Menampung blok data yang sedang ditransfer dari atau ke disk.
> > 
> > ### Virtual Filesystem (VFS)
> > **Tujuan:**
> > Sebuah lapisan abstraksi yang memungkinkan sistem operasi mendukung berbagai jenis sistem berkas (misalnya, ext4, NTFS, NFS) secara bersamaan melalui antarmuka tunggal.
> > **Analogi:**
> > VFS berfungsi seperti adaptor universal. Program aplikasi cukup melakukan panggilan sistem standar (seperti `open()`, `read()`), dan VFS akan menerjemahkan panggilan tersebut ke operasi spesifik yang sesuai dengan sistem berkas target (lokal, jaringan, dll.). Ini memisahkan operasi generik dari implementasi konkretnya, membuat sistem menjadi sangat modular dan dapat diperluas.
> > 
> > ### Implementasi Direktori
> > Metode untuk menyimpan pemetaan nama berkas ke datanya. Pilihan metode ini sangat mempengaruhi kinerja.
> > 
> > **Linear List:** Cara paling sederhana, berupa daftar nama berkas dan penunjuk ke datanya.
> > - **Kelebihan:** Mudah diprogram.
> > - **Kekurangan:** Lambat. Untuk menemukan berkas, sistem harus melakukan pencarian linier dari awal daftar.
> >
> > **Hash Table:** Menggunakan fungsi hash pada nama berkas untuk langsung menunjuk ke entri di dalam daftar.
> > - **Kelebihan:** Pencarian sangat cepat (hampir instan).
> > - **Kekurangan:** Perlu penanganan _collision_ (dua nama menghasilkan hash yang sama) dan ukuran tabel yang biasanya tetap.
> > 
> > ### Alokasi Berkas
> > **Contiguous Allocation:**
> > - **Konsep:** Setiap berkas menempati satu blok blok yang berurutan (berdampingan) di disk.
> > - **Direktori:** Hanya perlu menyimpan alamat blok awal dan panjang berkas.
> > - **Kelebihan:** Sangat cepat untuk akses sekuensial dan acak (kepala disk bergerak minimal).
> > - **Kekurangan:**
> > 	- **Fragmentasi Eksternal:** Muncul celah-celah kosong yang tidak terpakai di antara berkas. Celah ini mungkin terlalu kecil untuk berkas baru, sehingga ruang terbuang.
> > 	- Sulit bagi berkas untuk tumbuh setelah dibuat.
> >  
> > ![[Pasted image 20250609182351.png]]
> > 
> > **Linked Allocation**
> > - **Konsep:** Setiap berkas adalah rantai (linked list) dari blok-blok disk yang bisa tersebar di mana saja. Setiap blok berisi penunjuk ke alamat blok berikutnya.
> > - **Direktori:** Hanya menyimpan alamat blok pertama.
> > - **Kelebihan:** Tidak ada fragmentasi eksternal, dan berkas dapat tumbuh dengan mudah.
> > - **Kekurangan:**
> > 	- **Sangat lambat untuk akses acak.** Untuk mencapai blok ke-N, harus membaca N-1 blok sebelumnya.
> > 	- **Overhead ruang** untuk menyimpan penunjuk di setiap blok.
> > 	- **Tidak andal:** Satu penunjuk yang rusak dapat menyebabkan seluruh sisa berkas hilang.
> > 	- **Variasi:** **FAT (File-Allocation Table)** memindahkan semua penunjuk ke satu tabel terpusat di awal volume, mengatasi masalah akses acak.
> > 	
> > ![[Pasted image 20250609182456.png]]
> > 
> > **Indexed Allocation**
> > - **Konsep:** Mengumpulkan semua penunjuk ke blok data sebuah berkas ke dalam satu blok khusus yang disebut **blok indeks**.
> > - **Direktori:** Menyimpan alamat dari blok indeks ini.
> > - **Kelebihan:** Mendukung akses acak yang cepat (cukup baca blok indeks untuk menemukan blok data mana pun) dan tidak memiliki fragmentasi eksternal.
> > - **Kekurangan:**
> > 	- **Overhead ruang:** Boros jika berkas sangat kecil, karena tetap membutuhkan satu blok indeks penuh.
> > 	- **Batasan Ukuran Berkas:** Bagaimana jika berkas sangat besar sehingga penunjuknya tidak muat dalam satu blok indeks? Solusinya adalah skema gabungan (seperti pada inode UNIX) yang menggunakan penunjuk langsung, tidak langsung, ganda, dan tiga kali lipat.
> > 	
> > ![[Pasted image 20250609182619.png]]
> > ![[Pasted image 20250609182943.png]]
> > 
> > **Perbandingan Kinerja Alokasi:**
> > - Contiguous: Memerlukan satu akses per blok (jika alamat awal di memori).
> > - Linked: Memerlukan satu akses untuk berurutan tetapi i akses untuk acak ke blok ke-i.
> > - Indexed: Memerlukan satu akses jika blok indeks di memori, atau lebih banyak jika tidak. Beberapa sistem memilih metode berdasarkan jenis akses yang dideklarasikan berkas. Penggunaan cluster meningkatkan throughput HDD dan mengurangi overhead manajemen blok, tetapi meningkatkan internal fragmentation. Perangkat NVM memiliki karakteristik kinerja yang berbeda (tidak ada seek head).**

> [!cornell] #### Summary
> Implementasi sistem berkas mengandalkan arsitektur berlapis untuk memisahkan logika dari detail fisik, memanfaatkan struktur data di disk (untuk persistensi) dan di memori (untuk kecepatan), serta diabstraksi oleh Virtual File System (VFS) agar dapat mendukung berbagai tipe FS secara seragam. Kinerja dan efisiensi sistem sangat ditentukan oleh pilihan metode implementasi direktori (seperti _linear list_ vs. _hash table_) dan terutama oleh metode alokasi blok disk untuk berkas (yaitu _contiguous_, _linked_, atau _indexed_), di mana masing-masing metode menawarkan trade-off yang berbeda antara kecepatan akses, fragmentasi ruang, dan overhead manajemen.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> 
> **File Control Block (FCB) vs. Inode:**
>  - **FCB** adalah konsep generik untuk struktur data yang menyimpan semua informasi tentang sebuah berkas. Setiap sistem berkas memiliki beberapa bentuk FCB.
>  - **Inode** adalah implementasi spesifik dari FCB yang digunakan dalam sistem berkas UNIX (UFS) dan turunannya (ext2, ext3, ext4 di Linux). Jadi, bisa dikatakan bahwa inode adalah "nama merek" FCB versi UNIX. Perbedaan utamanya adalah inode secara eksplisit memisahkan nama berkas (yang disimpan di direktori) dari sisa metadata lainnya (yang disimpan di struktur inode itu sendiri).
> 
> **Objek-Objek Inti dalam Linux VFS:**
> Lapisan VFS di Linux bekerja dengan empat objek utama untuk mencapai abstraksinya:
> 1. **Superblock Object:** Mewakili sebuah sistem berkas yang telah di-_mount_. Isinya adalah metadata tingkat tinggi seperti tipe FS, ukuran blok, waktu modifikasi terakhir, dan penunjuk ke inode root.
> 2. **Inode Object:** Mewakili sebuah berkas spesifik di disk. Ini adalah representasi VFS dari inode fisik dan berisi atribut-atribut seperti izin, ukuran, dan pointer ke operasi-operasi yang bisa dilakukan pada inode tersebut (misalnya, `create`, `lookup`).
> 3. **Dentry Object (Directory Entry):** Mewakili sebuah komponen path (nama direktori atau berkas). Dentry berfungsi sebagai "lem" yang menghubungkan nama berkas ke sebuah inode. Dentry di-_cache_ secara agresif untuk mempercepat translasi path (misalnya, mengubah `/home/user/file.txt` menjadi serangkaian inode). Ini adalah implementasi dari `Directory-Structure Cache`.
> 4. **File Object:** Mewakili sebuah berkas yang sedang dibuka oleh suatu proses. Dibuat oleh panggilan sistem `open()`. Objek ini menyimpan informasi spesifik sesi, seperti _current-file-position pointer_ dan mode akses (baca/tulis). Beberapa proses yang membuka berkas yang sama akan memiliki _File Object_ yang berbeda, tetapi semuanya akan menunjuk ke _Dentry_ dan _Inode Object_ yang sama.
>
> **Skema Alokasi Gabungan pada Inode UNIX (Indexed Allocation Lanjutan):**
> - Untuk mengatasi masalah batasan ukuran pada alokasi terindeks, inode UNIX menggunakan skema gabungan yang sangat efisien:
> 	- **Penunjuk Langsung (Direct Pointers):** Inode berisi sekitar 12 penunjuk yang langsung menunjuk ke 12 blok data pertama. Ini membuat akses ke berkas kecil (hingga 12 * ukuran blok, misal 48KB) menjadi sangat cepat, hanya butuh satu kali baca disk untuk inode-nya.
> 	- **Penunjuk Tidak Langsung Tunggal (Single Indirect):** Satu penunjuk di inode menunjuk ke sebuah blok yang berisi penunjuk-penunjuk ke blok data. Jika satu blok bisa menampung 1024 alamat, ini akan menambah kapasitas berkas sebesar 1024 blok (misalnya, 4MB).
> 	- **Penunjuk Tidak Langsung Ganda (Double Indirect):** Satu penunjuk menunjuk ke sebuah blok, yang berisi penunjuk-penunjuk ke blok lain, yang baru berisi penunjuk-penunjuk ke blok data. Ini memungkinkan akses ke 1024 * 1024 blok (misalnya, 4GB).
> 	- **Penunjuk Tidak Langsung Tiga Kali Lipat (Triple Indirect):** Menambah satu tingkat lagi untuk berkas yang sangat besar (misalnya, 4TB).
> 	- Skema ini sangat optimal: cepat untuk berkas kecil yang umum, dan tetap mampu menangani berkas yang ukurannya masif.
> 
> **Detail Implementasi FAT (File Allocation Table):**
> - FAT adalah solusi cerdas untuk masalah akses acak pada alokasi tertaut.
> - **Struktur:** Bayangkan sebuah array raksasa di awal partisi disk. Setiap indeks dalam array ini merepresentasikan satu blok data di disk. Jadi, entri ke-`i` di tabel FAT berhubungan dengan blok ke-`i` di disk.
> - **Cara Kerja:**
> 1. Entri direktori untuk sebuah berkas hanya menyimpan nama dan nomor blok _pertama_ dari berkas tersebut.
> 2. Untuk menemukan blok selanjutnya, sistem melihat entri di tabel FAT yang indeksnya sama dengan nomor blok saat ini. Nilai di dalam entri tersebut adalah nomor blok berikutnya.
> 3. Rantai ini berlanjut sampai ditemukan nilai penanda akhir berkas (End-of-File).
> 	- Keunggulan:** Karena seluruh tabel FAT (atau bagian yang sering diakses) dapat di-_cache_ di memori, melintasi rantai berkas tidak lagi memerlukan pembacaan disk di setiap langkah. Proses ini terjadi di memori, sehingga akses acak menjadi jauh lebih cepat dibandingkan dengan alokasi tertaut murni.
> #### Sumber & Referensi Lanjutan:
>- **Buku:** "Understanding the Linux Kernel" oleh Daniel P. Bovet & Marco Cesati. Memberikan penjelasan yang sangat mendalam tentang implementasi VFS dan sistem berkas di Linux.
> - **Artikel:** "The Design and Implementation of a Log-Structured File System" oleh Mendel Rosenblum dan John K. Ousterhout. Meskipun membahas jenis FS yang berbeda, artikel ini memberikan wawasan hebat tentang masalah kinerja dalam implementasi sistem berkas.
>
> #### Eksplorasi Mandiri:
> 
> - **Inspeksi Superblock:** Pada sistem Linux, gunakan perintah `dumpe2fs /dev/sdXn | grep -i 'block size'` (ganti `/dev/sdXn` dengan partisi Anda) untuk melihat informasi yang tersimpan di superblock, seperti ukuran blok.
> - **Visualisasi Inode:** Gunakan perintah `debugfs` (di Linux) untuk menjelajahi struktur internal sistem berkas ext2/3/4. Anda bisa menggunakan perintah seperti `stat <inode_number>` untuk melihat isi dari sebuah inode secara detail, termasuk penunjuk-penunjuk blok datanya.