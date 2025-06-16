---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/OS]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Metode Manajemen Ruang Kosong
> > - Fungsi Perintah TRIM pada SSD
> > - Strategi Peningkatan Kinerja FS
> > - Masalah Konsistensi & Pemulihan
> > - Pendekatan Lama: `fsck`
> > - Solusi Modern: Journaling
> > - Solusi Canggih: Copy-on-Write
> > - Jaring Pengaman: Backup
>
> >
> > ### Manajemen Ruang Kosong (Free-Space Management)
> > Sistem operasi harus melacak blok-blok disk yang tidak terpakai agar dapat dialokasikan untuk berkas baru. Beberapa metode umum:
> > 1. **Bit Vector (Bitmap):** Sebuah array bit, di mana setiap bit mewakili satu blok disk. Misal, `1` berarti kosong, `0` berarti terisi. Sederhana dan efisien untuk menemukan blok kosong yang berurutan. Kelemahannya, ukurannya bisa menjadi besar untuk disk modern.
> > 2. **Linked List (Free List):** Semua blok kosong dirangkai dalam sebuah _linked list_. OS hanya perlu menyimpan penunjuk ke blok kosong pertama. Efisien dalam penggunaan ruang, tetapi lambat untuk menemukan blok kosong yang berurutan.
> > 3. **Grouping:** Modifikasi dari _linked list_. Blok kosong pertama menyimpan alamat dari N blok kosong berikutnya. Ini mempercepat pencarian banyak blok sekaligus.
> > 4. **Counting:** Daripada menyimpan daftar setiap blok kosong, metode ini menyimpan alamat blok kosong pertama dan jumlah blok berurutan yang mengikutinya. Sangat efisien jika banyak berkas dihapus secara bersamaan.
> >
> > ### TRIM
> > - Perangkat NVM (seperti SSD) tidak bisa langsung menimpa data. Untuk menulis ke halaman yang sudah berisi data, seluruh blok yang berisi halaman itu harus dihapus terlebih dahulu, dan operasi hapus ini lambat.
> > - **Masalah:** Saat Anda menghapus berkas, OS hanya menandai blok tersebut sebagai kosong di level sistem berkas, tetapi SSD tidak tahu bahwa data di dalamnya tidak lagi valid.
> > - **Solusi:** Perintah **TRIM** memungkinkan sistem operasi untuk memberitahu SSD blok mana yang tidak lagi digunakan. Ini memungkinkan kontroler SSD untuk melakukan "pengumpulan sampah" (_garbage collection_) dan menghapus blok-blok ini di latar belakang (saat idle). Hasilnya, ketika penulisan baru diperlukan, SSD sudah memiliki blok yang bersih dan siap tulis, mencegah penurunan kinerja drastis yang dikenal sebagai _write cliff_.
> > 
> > ### Efisiensi dan Kinerja Sistem Berkas
> > - I/O disk adalah salah satu _bottleneck_ paling signifikan dalam kinerja sistem. Strategi utamanya adalah **meminimalkan akses disk** dengan menggunakan **caching** di memori (RAM).
> > - **Page Cache / Buffer Cache:** OS menyimpan salinan blok disk yang baru saja diakses di RAM. Jika data yang sama diminta lagi, OS dapat menyediakannya dari _cache_ yang jauh lebih cepat daripada harus membaca dari disk lagi.
> > - **Unified Buffer Cache:** Sistem modern menggunakan _cache_ tunggal (_page cache_) untuk data berkas I/O biasa dan berkas yang dipetakan ke memori (_memory-mapped files_) untuk menghindari duplikasi data di _cache_ (_double caching_).
> > - **Write Policies:**
> > 	- **Synchronous (Sinkron):** Kontrol tidak kembali ke aplikasi sampai data benar-benar ditulis ke disk. Aman tapi lambat. Sering digunakan untuk metadata.
> > 	- **Asynchronous (Asinkron):** Kontrol langsung kembali setelah data ditulis ke _cache_. OS akan menuliskannya ke disk nanti. Cepat tapi berisiko kehilangan data jika sistem _crash_ sebelum data sempat ditulis.
> > 
> > ### Pemulihan dari Kegagalan (Recovery):
> > Jika sistem _crash_ (misalnya, mati listrik) saat _cache_ berisi data yang belum ditulis ke disk, struktur sistem berkas di disk bisa menjadi **tidak konsisten** (misalnya, sebuah blok sudah dialokasikan tetapi inode belum diperbarui).
> >  Apa yang terjadi jika listrik mati saat sedang menyimpan data?
> >  
> >  **Consistency Checking (`fsck`):**
> >  - **Konsep:** Sebuah program utilitas (seperti `fsck` di UNIX atau `chkdsk` di Windows) yang dijalankan setelah _crash_. Program ini akan memindai seluruh metadata sistem berkas untuk mencari dan mencoba memperbaiki inkonsistensi.
> >  - **Kekurangan:** Sangat lambat karena harus memeriksa seluruh volume disk. Prosesnya bisa memakan waktu berjam-jam pada disk besar dan tidak selalu bisa memperbaiki semua kerusakan.
> >  
> > **Log-Structured / Journaling File Systems:**
> > - **Konsep:** Pendekatan modern untuk pemulihan cepat. Sebelum melakukan perubahan pada struktur sistem berkas utama, perubahan tersebut pertama-tama dicatat sebagai sebuah transaksi dalam area khusus di disk yang disebut **jurnal (log)**.
> > - **Proses Pemulihan:** Setelah _crash_, sistem tidak perlu memindai seluruh disk. Ia hanya perlu membaca jurnal:
> > 	- Jika sebuah transaksi sudah selesai di jurnal, ia akan "diputar ulang" (_replayed_) untuk memastikan perubahan diterapkan ke sistem berkas.
> > 	- Jika transaksi belum selesai, ia akan diabaikan.
> > - **Kelebihan:** Proses pemulihan menjadi sangat cepat, hanya dalam hitungan detik, karena hanya membaca jurnal yang ukurannya kecil. Ini adalah standar de-facto di sistem berkas modern (NTFS, ext4, APFS).
> > 
> > **Copy-on-Write (CoW) File Systems:**
> > - **Konsep:** Pendekatan yang lebih canggih (digunakan oleh ZFS dan WAFL). Sistem ini **tidak pernah menimpa data di tempatnya**.
> > - **Cara Kerja:** Ketika sebuah blok data dimodifikasi, perubahan tersebut ditulis ke **blok baru yang kosong**. Kemudian, semua penunjuk di atasnya (metadata) diperbarui untuk menunjuk ke blok baru ini, juga dengan mekanisme CoW.
> > - **Kelebihan:** Sistem berkas selalu dalam keadaan konsisten. Tidak ada jendela waktu di mana data korup. Jika sistem _crash_, versi lama yang valid masih ada. Ini juga membuat fitur seperti _snapshot_ menjadi sangat efisien.
> > 
> > **Backup and Restore:**
> > - Merupakan jaring pengaman terakhir untuk semua jenis kegagalan (kegagalan perangkat keras, penghapusan yang tidak disengaja, serangan ransomware).
> > 	- **Full Backup:** Menyalin semua data.
> > 	- **Incremental Backup:** Hanya menyalin data yang telah berubah sejak _backup_ terakhir. Ini menghemat ruang dan waktu, tetapi proses pemulihan lebih kompleks karena memerlukan _full backup_ terakhir ditambah semua _incremental backup_ setelahnya.

> [!cornell] #### Summary
> Manajemen sistem berkas yang efektif memerlukan metode canggih untuk melacak ruang kosong (seperti bitmap atau journaling), strategi peningkatan kinerja yang berpusat pada caching dan buffering di memori, serta mekanisme pemulihan yang tangguh untuk menjaga konsistensi data setelah terjadi kegagalan. Solusi pemulihan modern telah beralih dari pengecekan konsistensi yang lambat (`fsck`) ke pendekatan yang lebih cepat dan aman seperti journaling atau sistem copy-on-write (CoW), yang semuanya dilengkapi dengan strategi backup dan restore sebagai jaring pengaman terakhir dari kehilangan data.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> **Mode-mode Journaling pada ext3/ext4:**
> Konsep "journaling" tidak monolitik; ada beberapa mode yang menawarkan _trade-off_ antara keamanan data dan kinerja.
> 1. **`writeback` mode:** Kinerja tertinggi, keamanan terendah. Hanya metadata yang dicatat di jurnal. Data berkas ditulis langsung ke lokasinya di disk, tanpa jaminan urutan. Jika terjadi _crash_, struktur FS akan konsisten, tetapi isi berkas bisa saja berisi data lama atau sampah, karena metadata mungkin sudah menunjuk ke blok yang belum sempat ditulis dengan data baru.
> 2. **`ordered` mode:** Keseimbangan terbaik dan merupakan mode _default_. Seperti `writeback`, hanya metadata yang dicatat di jurnal. **NAMUN**, ada jaminan bahwa blok data terkait ditulis ke disk **SEBELUM** metadata yang menunjuk ke blok tersebut dicatat (_committed_) di jurnal. Ini mencegah skenario data korup seperti pada mode `writeback` dan memastikan integritas berkas.
> 3. **`journal` mode:** Keamanan tertinggi, kinerja terendah. Baik metadata **maupun data** ditulis terlebih dahulu ke jurnal sebelum ditulis ke lokasi akhirnya di sistem berkas. Ini pada dasarnya "menulis semuanya dua kali", yang bisa memperlambat operasi tulis, tetapi memberikan jaminan konsistensi terkuat untuk struktur dan konten berkas.
> 
> **Mekanisme Atomik pada Copy-on-Write (CoW) ZFS:**  
> Konsistensi pada ZFS dijamin oleh struktur pohonnya dan pembaruan atomik pada akarnya.
> - **Struktur Pohon:** Seluruh data dan metadata di ZFS diatur dalam pohon blok, di mana blok induk menunjuk ke blok anak. Akar dari semua pohon ini disebut **uberblock**.
>  - **Proses Update:**
> 	 1. Saat blok data `D` diubah, ZFS tidak menimpanya. Ia menulis versi baru ke blok kosong `D'`.
> 	 2. Blok induk `P` yang tadinya menunjuk ke `D` sekarang harus diubah. ZFS membuat salinan `P` menjadi `P'` dan memperbarui penunjuknya agar menunjuk ke `D'`.
> 	 3. Proses ini ber каскад (cascade) ke atas pohon. Setiap blok di jalur menuju akar akan disalin dan diperbarui.
> 	 4. Akhirnya, sebuah **uberblock baru** dibuat yang menunjuk ke akar pohon yang baru.
> 	 5. Operasi **atomik** terakhir yang membuat semua perubahan ini "aktif" adalah dengan hanya mengubah satu penunjuk di disk agar menunjuk ke _uberblock_ terbaru. Jika sistem _crash_ di tengah proses, penunjuk akar masih menunjuk ke _uberblock_ lama yang valid, dan sistem berkas tetap konsisten.
> 
> **Detail Proses `fsck` (File System Consistency Check):**
> - `fsck` bukanlah proses tunggal, melainkan serangkaian tahapan (pass) yang sistematis:
> 	- **Tahap 1: Periksa Blok dan Ukuran (Check Blocks and Sizes):** `fsck` menelusuri semua inode. Ia memverifikasi bahwa setiap penunjuk blok dalam inode menunjuk ke alamat yang valid dan tidak ada blok yang diklaim oleh lebih dari satu inode. Ia membangun tabel alokasi blok berdasarkan apa yang ditemukannya.
> 	- **Tahap 2: Periksa Nama Path (Check Pathnames):** Melintasi struktur direktori dari root, memastikan setiap entri menunjuk ke inode yang valid dan format direktori benar.
> 	- **Tahap 3: Periksa Konektivitas Direktori (Check Directory Connectivity):** Menggunakan informasi dari tahap 1 & 2, `fsck` mencari inode yang ditandai "digunakan" tetapi tidak dapat dijangkau dari direktori mana pun. Ini adalah "berkas yatim" (_orphaned files_), dan `fsck` akan menawari untuk menempatkannya di direktori `/lost+found`.
> 	- **Tahap 4: Periksa Jumlah Referensi (Check Reference Counts):** Memvalidasi _link count_ di setiap inode dengan menghitung berapa banyak entri direktori yang sebenarnya menunjuk padanya, lalu memperbaiki jika ada ketidakcocokan.
> 	- **Tahap 5: Periksa Peta Blok Kosong (Check Free Block Map):** Membandingkan peta blok yang dialokasikan (yang dibangun di tahap 1) dengan bitmap ruang kosong milik sistem berkas. Jika ada perbedaan, `fsck` akan membangun kembali bitmap tersebut.
> - Urutan ini menunjukkan mengapa `fsck` sangat intensif I/O dan memakan waktu.
>
> #### Sumber & Referensi Lanjutan:
>
> - **Dokumentasi Kernel Linux:** `Documentation/filesystems/ext4.rst` dalam kode sumber kernel Linux berisi detail teknis tentang mode journaling dan fitur lainnya.
> - **Presentasi & Artikel:** Cari "ZFS Internals" atau "How ZFS works" (misalnya, presentasi dari Brendan Gregg). Banyak sumber daya visual yang bagus menjelaskan proses CoW.
>
> #### Eksplorasi Mandiri:
> - **Lihat Mode Journaling:** Pada sistem Linux dengan ext4, Anda dapat melihat mode journaling yang sedang digunakan dengan perintah `tune2fs -l /dev/sdXn | grep 'Default mount options'`.
> - **Trigger `fsck` (Hati-hati!):** Cara paling aman untuk melihat `fsck` beraksi adalah dengan memaksa pengecekan saat boot berikutnya. Buat berkas kosong di root: `sudo touch /forcefsck`, lalu reboot. Sistem akan melakukan pengecekan penuh saat startup. **Lakukan ini hanya pada sistem non-kritis.**