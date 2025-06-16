---
type: Note
cssclasses:
  - cornell-notes
---
_Back To_ [[01. Matkul/OS]]

> [!cornell] Topic
> > ## Questions/Cues
> > - Bagaimana Alokasi Frame dilakukan? (Equal vs. Proportional)
> > - Global vs. Local Page Replacement?
> > - Apa itu Thrashing & Penyebabnya?
> > - Cara Mencegah Thrashing? (Working-Set & PFF)
> > - Apa itu Kompresi Memori?
> > - Alokasi Memori Kernel? (Buddy & Slab)
> > - Pertimbangan: Prepaging?
> > - Pertimbangan: Ukuran Page?
> > - Pertimbangan: Struktur Program?
> > - Pertimbangan: I/O & Locked Pages?
> > - Konsep Tambahan: NUMA & Major/Minor Faults?
>
> >
> >
> > ### Kebijakan Tingkat Sistem
> > - **Alokasi Frame (Allocation of Frames):** Ini adalah kebijakan tentang bagaimana OS membagi-bagikan _frame_ fisik yang tersedia kepada semua proses yang berjalan.
> > 	- **Alokasi Sama Rata (Equal Allocation):** Cara paling sederhana. Jika ada _m_ frame dan _n_ proses, setiap proses mendapat jatah _m/n_ frame. Tidak adil jika ada proses kecil dan besar.
> > 	- **Alokasi Proporsional (Proportional Allocation):** Mengalokasikan frame ke setiap proses sesuai dengan ukurannya. Proses yang lebih besar mendapat lebih banyak frame. Ini lebih adil.
> > - **Penggantian Global vs. Lokal (Global vs. Local Replacement)**
> > 	- **Penggantian Global:** Ketika sebuah proses butuh frame baru, ia boleh mengambil frame dari proses mana pun di sistem (biasanya yang prioritasnya lebih rendah). Strategi ini lebih fleksibel dan dapat meningkatkan throughput sistem secara keseluruhan.
> > 	- **Penggantian Lokal:** Setiap proses hanya boleh memilih "korban" dari jatah frame yang sudah dialokasikan untuknya. Ini mengisolasi performa setiap proses, sehingga satu proses yang "boros" tidak akan mengganggu proses lain, tetapi bisa jadi kurang efisien.
> >
> > ### Thrashing
> > **Definisi Thrashing**
> > Kondisi di mana sebuah proses menghabiskan lebih banyak waktu untuk _paging_ (memuat dan mengeluarkan _page_ dari disk) daripada melakukan pekerjaan komputasi yang sebenarnya.
> > 
> > **Penyebab**
> > Tingkat _multiprogramming_ terlalu tinggi sehingga tidak ada cukup frame memori fisik untuk menampung _page-page_ aktif (_working set_) dari semua proses.
> > 
> > **Gejala**
> > Utilitas CPU anjlok secara drastis. Saat OS melihat CPU nganggur, ia mungkin keliru mengira perlu menambah proses baru, yang justru memperparah _thrashing_.
> > 
> > **Cara Mencegah Thrashing:**
> > - **Model Set Kerja (Working-Set Model):**
> > 	- _Working set_ adalah kumpulan _page_ yang baru saja diakses oleh sebuah proses dalam jendela waktu tertentu (Δ).
> > 	- OS memonitor _working set_ setiap proses. Jika total ukuran _working set_ dari semua proses melebihi total frame yang tersedia, OS akan **menangguhkan (suspend)** salah satu proses untuk membebaskan frame dan meredakan tekanan.
> > - **Frekuensi Page Fault (Page-Fault Frequency - PFF):**
> > 	- Metode ini mengontrol tingkat _page fault_ secara langsung. OS menetapkan ambang batas atas dan bawah.
> > 	- Jika _page fault rate_ suatu proses melebihi batas atas, OS memberinya frame tambahan.
> > 	- Jika di bawah batas bawah, OS mengambil kembali frame darinya.
> > 
> > Praktisnya, thrashing dan swapping yang diakibatkannya berdampak negatif pada kinerja. Praktik terbaik saat ini adalah menyertakan cukup memori fisik untuk menghindari thrashing dan swapping sebisa mungkin.
> > 
> > #### Teknik dan Pertimbangan Lainnya
> > **Kompresi Memori (Memory Compression):**
> > - Alternatif modern untuk _paging_ ke disk, terutama populer di perangkat seluler.
> > - Daripada mengusir _page_ kotor ke disk, beberapa _page_ "dipadatkan" dan disimpan dalam satu _frame_ khusus di RAM.
> > - Jika _page_ terkompresi ini dibutuhkan lagi, proses dekompresi dari RAM jauh lebih cepat daripada membacanya dari disk.
> >
> > **Alokasi Memori Kernel:** Kernel OS juga butuh memori, dan alokasinya harus sangat cepat dan efisien. Dua strategi populer:
> > - **Buddy System:** Memori dibagi menjadi blok-blok berukuran pangkat dua (misal, 4KB, 8KB, 16KB, ...). Saat ada permintaan, dicarikan blok "pasangan" (_buddy_) terkecil yang cukup. Metode ini cepat dalam menggabungkan kembali blok-blok yang telah dibebaskan.
> > - **Slab Allocation:** OS membuat _cache_ khusus untuk setiap jenis objek kernel yang sering dibuat (misal, PCB, inode). Setiap _cache_ berisi satu atau lebih "slab", yaitu beberapa _page_ fisik berdekatan yang sudah diisi dengan objek-objek siap pakai. Ini menghilangkan fragmentasi internal dan sangat cepat.
> >
> > **Prepaging:** Upaya untuk **memuat _page-page_ ke memori sebelum mereka benar-benar diminta**. Tujuannya adalah mengurangi badai _page fault_ yang biasanya terjadi saat proses pertama kali dimulai. Namun, ini bisa boros jika _page_ yang dimuat ternyata tidak digunakan.
> > 
> > **Ukuran Page (Page Size):** Tidak ada ukuran "terbaik" yang universal. Ini adalah _trade-off_ yang kompleks:
> > - **Kecil:** Mengurangi fragmentasi internal.
> > - **Besar:** Mengurangi ukuran _page table_ dan lebih efisien untuk I/O disk.
> >
> > Tren saat ini adalah mendukung beberapa ukuran _page_ sekaligus (_huge pages_).
> > 
> > **Struktur Program:** Cara seorang programmer menulis kode dapat sangat memengaruhi kinerja _paging_. Mengakses data secara lokal (misalnya, memproses array baris demi baris jika disimpan secara baris) akan menghasilkan lebih sedikit _page fault_ daripada mengaksesnya secara acak.
> > 
> > **I/O & Locked Pages:** Jika sebuah _page_ sedang digunakan untuk transfer I/O (misalnya, sebagai _buffer_), _page_ tersebut tidak boleh diusir dari memori. OS menangani ini dengan **"mengunci" (_locking_ atau _pinning_) _page_** tersebut di memori sampai operasi I/O selesai.
> > 
> >  **Konsep Tambahan:**
> >  - **NUMA (Non-Uniform Memory Access):** Pada sistem server modern, kecepatan akses ke RAM bisa berbeda tergantung pada jarak antara CPU dan modul RAM. OS yang "sadar-NUMA" akan berusaha mengalokasikan memori untuk sebuah proses sedekat mungkin dengan CPU yang menjalankannya.
> >  - **Major vs. Minor Faults:**
> > 	 - **Major Fault:** _Page fault_ yang membutuhkan akses disk (lambat).
> > 	 - **Minor Fault:** _Page fault_ di mana _page_ sudah ada di memori tetapi belum dipetakan ke proses (misal, _shared library_). Hanya perlu pembaruan _page table_ (cepat).

> [!cornell] #### Summary
> Manajemen memori tingkat lanjut berfokus pada kebijakan sistem untuk mengoptimalkan kinerja, seperti menentukan alokasi frame untuk setiap proses dan memilih antara strategi penggantian global atau lokal. Masalah kinerja terbesar adalah _thrashing_, yang dapat dicegah dengan memonitor _working set_ atau frekuensi _page fault_. Selain _paging_ tradisional, teknik modern seperti kompresi memori menawarkan alternatif yang lebih cepat, sementara kernel menggunakan alokator khusus seperti Buddy System dan Slab Allocation. Pada akhirnya, kinerja keseluruhan juga dipengaruhi oleh berbagai pertimbangan praktis seperti ukuran _page_, struktur program yang baik, dan penanganan I/O yang aman.

> [!ad-libitum]- Additional Information (Optional)
>#### Aspek Teknis Lanjutan:
>- **Detail Slab Allocator:** Konsep _slab_ terdiri dari tiga komponen utama:
>	1. **Cache:** Satu _cache_ dibuat untuk setiap jenis objek kernel (misal, `kmem_cache_create()` untuk membuat _cache_ `task_struct`).
>	2. **Slab:** Terdiri dari satu atau lebih _page_ fisik yang berdekatan. Sebuah _slab_ bisa dalam kondisi: _full_ (semua objek terpakai), _partial_ (ada yang terpakai, ada yang kosong), atau _empty_ (semua objek bebas). Permintaan alokasi akan dipenuhi dari _slab_ yang _partial_ terlebih dahulu.
>	3. **Object:** Objek kernel itu sendiri yang disimpan di dalam _slab_. Struktur ini sangat efisien untuk alokasi dan dealokasi objek berukuran sama yang sering dilakukan.
>- **File yang Dipetakan ke Memori (Memory-Mapped Files - `mmap`):** Ini adalah fitur OS modern yang sangat kuat yang menggunakan infrastruktur _demand paging_ untuk tujuan yang berbeda. Panggilan sistem `mmap()` memetakan sebuah file di disk langsung ke ruang alamat virtual sebuah proses.
>	- Membaca dari alamat memori tersebut akan secara transparan menyebabkan _page fault_ dan OS akan memuat _page_ yang sesuai dari file.
>	- Menulis ke alamat memori tersebut akan menandai _page_ sebagai _dirty_, dan pada akhirnya akan ditulis kembali ke file di disk oleh OS.
>	- Ini adalah mekanisme dasar untuk _loader_ program dan juga cara yang sangat efisien untuk melakukan I/O file tanpa panggilan `read()`/`write()` eksplisit.
>
>- **Memori Anonim vs. Berbasis File (Anonymous vs. File-Backed Memory):**
>	- **Memori Anonim:** Memori yang dialokasikan tanpa diasosiasikan dengan file apa pun di disk (misalnya, dari `malloc()` untuk _heap_ atau untuk _stack_). Jika _page_ ini perlu diusir, ia harus ditulis ke area khusus di disk yang disebut **swap space**.
>	- **Memori Berbasis File:** Memori yang dipetakan dari sebuah file (misal, dari `mmap()` atau saat memuat kode program). Jika _page_ ini perlu diusir, ia akan ditulis kembali ke file aslinya di disk.
>#### Sumber & Referensi Lanjutan:
>- **Laman `man` di Linux:** `man mmap` memberikan detail teknis tentang panggilan sistem `mmap`.
>- **"Understanding the Linux Kernel" oleh Bovet & Cesati:** Buku ini memberikan pembahasan yang sangat mendalam tentang implementasi nyata dari alokator memori (Slab, SLUB, SLOB) dan manajemen memori virtual di dalam kernel Linux.
>#### Eksplorasi Mandiri:
>
>**Mencoba `mmap`:** Coba buat program sederhana dalam bahasa C atau Python yang:
> 1. Membuat sebuah file besar di disk.
> 2. Menggunakan `mmap` untuk memetakan file tersebut ke memori.
> 3. Mengubah isi file dengan menulis langsung ke pointer memori yang dikembalikan oleh `mmap`.
> 4. Tutup pemetaan dan periksa isi file di disk untuk memverifikasi bahwa perubahan Anda telah disimpan. Ini akan memberikan pemahaman praktis tentang bagaimana _demand paging_ bekerja untuk I/O file.