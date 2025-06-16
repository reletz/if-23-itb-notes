---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_: [[01. Matkul/OS]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Bagaimana komputer menamai data?
> > - Apa itu Pemetaan Alamat (LBA)?
> > - Mengapa perlu penjadwalan HDD?
> > - Algoritma Penjadwalan HDD?
> > - Bagaimana penjadwalan pada NVM?
> > - Langkah persiapan drive baru?
> > - Apa itu Boot Block?
> > - Bagaimana menangani Bad Block?
> > - Fungsi Ruang Swap (Swap Space)?
> > - Apa itu RAID?
> > - Tujuan utama RAID?
> > - Level RAID umum?
> > - Apa itu Hot Spare?
> >
>
> >
> > ### Pemetaan Alamat
> > Alat penyimpan data itu dilihat komputer sebagai urutan blok-blok data yang panjang banget. Setiap blok ini punya nomor urut, namanya logical block. Nah, logical block ini nanti dipetakan (dicocokkan) ke lokasi fisik di alat penyimpanannya, entah itu sektor di HDD atau page di NVM. Cara pemetaannya berurutan. Misalnya di HDD, blok nomor 0 itu sektor pertama di trek terluar, terus lanjut sampai semua sektor di trek itu habis, pindah ke trek berikutnya di silinder yang sama, dan seterusnya sampai semua silinder habis
> > 
> > Skema penomoran sederhana ini disebut **Logical Block Addressing (LBA)**.
> > - **Analogi:** Bayangkan sebuah buku yang sangat tebal. Daripada mencari dengan "halaman ke-5 dari atas, baris ke-10, kata ke-3", kita cukup mencari "kata ke-25.015 dari awal buku". LBA menyederhanakan alamat menjadi satu nomor urut saja.
> > - Kontroler di dalam drive-lah yang bertugas menerjemahkan nomor LBA ini ke lokasi fisik sebenarnya di dalam piringan atau chip memori.
> >
> > ### Penjadwalan
> > **Penjadwalan HDD:** Karena HDD memiliki komponen mekanis yang bergerak (lengan dan piringan), waktu yang dihabiskan untuk bergerak (_seek time_) dan menunggu (_rotational latency_) sangat signifikan. Tujuan penjadwalan HDD adalah **mengatur ulang urutan antrian permintaan I/O untuk meminimalkan total gerakan lengan**, sehingga meningkatkan efisiensi dan throughput.
> > 
> > **Algoritma Penjadwalan HDD Umum**
> > - **FCFS (First-Come, First-Served):** Siapa cepat dia dapat. Paling adil tapi tidak efisien karena lengan bisa bergerak bolak-balik secara acak.
> > *Contoh:*
> > Antrian Permintaan Silinder: 98, 183, 37, 122, 14, 124, 65, 67
> > Head Awal di Silinder: 53
> > Gerakan Head (FCFS):
> > 53 -> 98 -> 183 -> 37 -> 122 -> 14 -> 124 -> 65 -> 67
> > Total Gerakan = (98-53) + (183-98) + (183-37) + (122-37) + (122-14) + (124-14) + (124-65) + (67-65) = 640 silinder
> > - **SCAN (Elevator Algorithm):** Lengan bergerak dari satu ujung disk ke ujung lainnya, melayani semua permintaan di jalurnya (seperti lift yang naik dan turun). Ini jauh lebih efisien daripada FCFS.
> > _Contoh:_
> > Antrian Permintaan Silinder: 98, 183, 37, 122, 14, 124, 65, 67
> > Head Awal di Silinder: 53, Bergerak ke arah 0
> > Gerakan Head (SCAN):
> > 53 -> 37 -> 14 -> 0 (Ujung, balik arah) -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 (Ujung)
> > Total Gerakan = (53-0) + (183-0) = 236 silinder
> > - **C-SCAN (Circular SCAN):** Mirip SCAN, tapi saat mencapai ujung, lengan langsung kembali ke awal tanpa melayani permintaan. Ini memberikan waktu tunggu yang lebih seragam karena tidak ada permintaan yang harus menunggu lengan "kembali" dari ujung jauh.
> > _Contoh:_
> > Antrian Permintaan Silinder: 98, 183, 37, 122, 14, 124, 65, 67
> > Head Awal di Silinder: 53, Bergerak ke arah 199 (asumsi maks silinder 199)
> > Gerakan Head (C-SCAN):
> > 53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 (Ujung)
> > (Langsung balik ke 0 tanpa melayani)
> > -> 0 -> 14 -> 37 (Ujung)
> > Total Gerakan = (199-53) + (199-0) + (37-0) = 146 + 199 + 37 = 382 silinder
> > 
> > **Penjadwalan NVM (SSD)**
> > Karena NVM (SSD) tidak memiliki bagian bergerak, tidak ada _seek time_ atau _rotational latency_. Oleh karena itu, algoritma penjadwalan yang kompleks seperti SCAN tidak diperlukan.
> > - **Pendekatan:** Biasanya, penjadwalan yang lebih sederhana seperti **FCFS** atau bahkan **NOOP (No Operation)** sudah cukup. Fokusnya adalah melayani permintaan secepat mungkin. Namun, optimasi masih bisa dilakukan dengan menggabungkan permintaan I/O untuk LBA yang berdekatan.
> >
> > ### ECC
> > - Kontroler penyimpanan modern pakai kode canggih namanya ECC *(Error-Correction Code)* buat ngecek dan benerin kesalahan data. 
> > - Tiap data ditulis, ECC-nya dihitung dan disimpan. 
> > - Pas dibaca, ECC dihitung ulang dan dibandingin. Kalau beda, berarti ada error. 
> > - **ECC bisa benerin error kecil** (soft error) atau **ngasih tahu kalau errornya parah** (hard error).
> >
> > ### Storage Device Management
> > - Sistem operasi bertanggung jawab atas beberapa aspek lain dari manajemen perangkat penyimpanan. Ini termasuk inisialisasi drive (pemformatan), booting dari drive, dan pemulihan bad-block.**
> > - Perangkat penyimpanan baru harus dibagi menjadi sektor (atau page untuk NVM) yang dapat dibaca dan ditulis oleh kontroler. 
> > - Proses ini disebut low-level formatting atau physical formatting. 
> > - Diisi dengan struktur data khusus untuk setiap lokasi penyimpanan, termasuk header, area data, dan trailer (berisi nomor sektor/page dan kode deteksi/koreksi kesalahan).
> > 
> > **Persiapan Drive Baru** 
> > Sebelum sebuah drive dapat digunakan untuk menyimpan file, ia harus melalui tiga tahap:
> > 1. **Partitioning (Partisi):** Drive dibagi menjadi satu atau lebih "ruangan" atau segmen yang disebut partisi. Setiap partisi bisa dianggap sebagai drive terpisah.
> > 2. **Logical Formatting (Pemformatan):** Proses membuat sebuah **sistem file** (seperti NTFS, ext4, APFS) di dalam sebuah partisi. Ini seperti membangun rak dan label di dalam "ruangan" yang sudah dibuat, menyiapkan struktur untuk menyimpan dan mengelola file.
> > 3. **Mounting (Pemasangan):** Sistem operasi "memasang" atau menautkan sistem file pada partisi tersebut ke dalam struktur direktori utama agar dapat diakses oleh pengguna dan aplikasi.
> > 
> > **Boot Block:** Sektor pertama dari sebuah partisi yang dapat di-boot. Isinya adalah sebuah program kecil (boot loader) yang tugasnya adalah menemukan dan memuat kernel sistem operasi dari dalam sistem file ke memori utama (RAM) untuk memulai komputer.
> > 
> > **Bad Block:**
> > Hampir semua drive memiliki beberapa sektor yang cacat. Kontroler drive modern menangani ini secara otomatis melalui **sector sparing**.
> > - **Cara Kerja**
> >	1. Drive memiliki sektor cadangan (_spare sectors_).
> >	2. Jika kontroler mendeteksi sebuah sektor rusak, ia akan secara permanen memetakan ulang alamat LBA dari sektor rusak tersebut ke salah satu sektor cadangan yang baik. Proses ini transparan bagi sistem operasi
> >
> > Saat bad block dipetakan ulang, kontroler menggunakan spare sector dari silinder yang sama jika memungkinkan.
> >	
> > **Manajemen Ruang Swap (Swap-Space):** 
> > Area pada penyimpanan sekunder (HDD/SSD) yang digunakan oleh sistem operasi sebagai perpanjangan tangan dari RAM. Ketika RAM penuh, data (halaman memori) yang sedang tidak aktif akan dipindahkan sementara ke ruang swap untuk memberi ruang bagi data yang lebih mendesak.
> > 
> > ** RAID (Redundant Array of Independent Disks)**
> > Sebuah teknologi yang **menggabungkan beberapa drive fisik menjadi satu unit penyimpanan logis tunggal**. Tujuannya ada dua:
> > - **Peningkatan Kinerja:** Dengan menyebar data ke beberapa drive (_striping_), operasi baca/tulis dapat dilakukan secara paralel, meningkatkan kecepatan.
> > - **Redundansi/Keandalan:** Dengan menyimpan informasi ekstra (salinan data atau data paritas), sistem dapat bertahan dari kegagalan satu atau lebih drive tanpa kehilangan data.
> > 
> > Level-Level RAID Umum:
> > - **RAID 0 (Striping):** Data dipecah dan disebar ke semua disk. **Sangat cepat, tapi tidak aman.** Jika satu disk gagal, semua data hilang.
> > - **RAID 1 (Mirroring):** Data disalin persis ke disk lain. **Sangat aman, tapi boros kapasitas** (kapasitas total = kapasitas satu disk).
> > - **RAID 5 (Striping dengan Paritas Terdistribusi):** Kombinasi seimbang antara kecepatan, kapasitas, dan keamanan. Menggunakan data paritas (seperti checksum) yang disebar di semua disk untuk merekonstruksi data jika satu disk gagal.
> > - **RAID 6 (Striping dengan Paritas Ganda):** Seperti RAID 5, tapi dengan dua set data paritas. **Lebih aman**, dapat bertahan dari kegagalan dua disk secara bersamaan.
> >
> > Sebuah disk cadangan yang siaga dalam sistem RAID disebut **Hot Spare**. Jika salah satu disk aktif gagal, _hot spare_ akan secara otomatis masuk dan mulai proses _rebuild_ (membangun ulang data yang hilang) tanpa perlu intervensi manual.

> [!cornell] #### Summary
> Untuk mengubah perangkat penyimpanan fisik menjadi ruang yang berguna dan efisien, sistem operasi dan kontroler menerapkan beberapa lapisan manajemen. Ini dimulai dengan abstraksi alamat fisik menjadi LBA yang sederhana, dilanjutkan dengan algoritma penjadwalan I/O untuk mengoptimalkan urutan akses, terutama pada HDD. Selanjutnya, teknologi RAID memungkinkan penggabungan beberapa drive untuk meningkatkan kinerja dan/atau keandalan data. Terakhir, proses seperti partisi, format, dan mounting mempersiapkan drive untuk penyimpanan file, sementara fitur seperti manajemen bad block dan swap space memastikan operasi yang andal dan stabil.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **RAID Write Hole:** Sebuah masalah klasik pada RAID 5/6. Jika terjadi mati listrik di tengah-tengah operasi tulis yang melibatkan beberapa blok (misalnya, saat menulis data baru dan memperbarui paritasnya), ada kemungkinan blok data berhasil ditulis tetapi blok paritas gagal. Ini menyebabkan paritas tidak lagi konsisten dengan data, sebuah "lubang" yang tidak akan terdeteksi hingga data tersebut perlu direkonstruksi, yang pada saat itu akan menghasilkan data yang rusak. Sistem file modern dan kontroler RAID canggih memiliki mekanisme untuk memitigasi ini.
> - **Perintah TRIM untuk NVM:** Saat Anda menghapus file di OS, data di disk tidak benar-benar dihapus, hanya tandanya saja yang dihilangkan. Pada HDD, ini tidak masalah. Tetapi pada NVM, kontroler tidak tahu bahwa _page_ tersebut sudah tidak valid lagi dan akan terus menyalinnya saat _garbage collection_. Perintah **TRIM** adalah cara OS untuk secara eksplisit memberi tahu kontroler SSD, "Hei, _page_ LBA ini tidak lagi berisi data yang valid, kamu bebas menghapusnya saat _garbage collection_ berikutnya." Ini sangat penting untuk menjaga kinerja SSD dalam jangka panjang.
> - **Journaling File Systems:** Banyak sistem file modern (NTFS, ext4, APFS) adalah sistem file _journaling_. Sebelum melakukan perubahan pada struktur utama sistem file (metadata), perubahan tersebut dicatat terlebih dahulu dalam sebuah log khusus yang disebut **jurnal**. Jika terjadi crash, sistem tidak perlu memeriksa seluruh disk untuk konsistensi. Ia cukup membaca jurnal untuk melihat operasi apa yang belum selesai dan menyelesaikannya atau mengembalikannya. Ini secara drastis mempercepat waktu pemulihan setelah _crash_.
> #### Sumber & Referensi Lanjutan:
> - **Software RAID di Linux:** Pelajari tentang `mdadm`, utilitas standar di Linux untuk membuat dan mengelola perangkat RAID perangkat lunak.
> - **I/O Schedulers di Linux:** Telusuri dokumentasi kernel Linux mengenai I/O Schedulers yang berbeda seperti `CFQ` (Completely Fair Queuing), `Deadline`, dan `NOOP`, dan untuk kasus penggunaan apa mereka direkomendasikan.
> - **File Systems Lanjutan:** Baca tentang **ZFS** dan **Btrfs**, sistem file generasi berikutnya yang mengintegrasikan manajemen volume (fungsionalitas RAID) dan sistem file menjadi satu kesatuan, menawarkan fitur seperti _copy-on-write_, _snapshots_, dan integritas data bawaan.
> #### Eksplorasi Mandiri:
> - Gunakan mesin virtual (seperti VirtualBox) dan dua atau lebih disk virtual kecil untuk mencoba membuat array RAID 1 atau RAID 0 perangkat lunak menggunakan `mdadm` di Linux.
> - Pada sistem Linux, gunakan perintah `cat /sys/block/[nama_drive]/queue/scheduler` (misalnya `sda`) untuk melihat I/O scheduler mana yang sedang aktif untuk drive Anda. Cari tahu mengapa scheduler tersebut menjadi default untuk tipe drive Anda (HDD vs SSD).