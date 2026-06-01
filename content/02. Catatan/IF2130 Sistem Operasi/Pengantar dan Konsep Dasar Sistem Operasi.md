---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Pengantar dan Konsep Dasar Sistem Operasi
> 
> > ## Questions/Cues
> > 
> > - Apa itu Sistem Operasi (OS)?
> >     
> > - Apa saja 2 peran utama OS?
> >     
> > - Apa itu Abstraksi dalam OS?
> >     
> > - Apa itu Manajemen Sumber Daya?
> >     
> > - Apa 3 aspek utama OS?
> >     
> > - Bagaimana struktur sistem komputer?
> >     
> > - Apa beda OS sebagai _resource allocator_ vs _control program_?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 4-14, IF2130-01-2025-OSIntro.pdf
> >     
> 
> > ### Apa itu Sistem Operasi (OS)?
> > 
> > Sistem Operasi (SO) adalah **perangkat lunak inti (software)** yang bertindak sebagai **jembatan (interface)** antara pengguna (user) dan aplikasi dengan perangkat keras (hardware) komputer.
> > 
> > Secara fundamental, OS memiliki empat fungsi utama:
> > 
> > 1. **Menjalankan Program**: Memuat, mengelola, dan mengeksekusi program milik pengguna maupun program sistem.
> >     
> > 2. **Mengelola Perangkat Keras**: Mengatur dan mengoordinasikan semua komponen hardware seperti CPU, memori, disk, keyboard, dll.
> >     
> > 3. **Alokator Sumber Daya (Resource Allocator)**: Mengalokasikan sumber daya komputer kepada berbagai program dan pengguna secara adil dan efisien.
> >     
> > 4. **Berbasis Interupsi (Interrupt-Driven)**: Sebagian besar aktivitas OS dipicu oleh kejadian (events) atau interupsi, baik dari hardware maupun software.
> >     
> > 
> > **Analogi:** Bayangkan OS sebagai seorang manajer gedung. Manajer ini tidak membuat produk sendiri, tetapi memastikan semua fasilitas (listrik, air, keamanan) berfungsi agar para penyewa (aplikasi) dapat bekerja dengan baik tanpa harus pusing memikirkan detail teknis gedung (hardware).
> > 
> > ### Peran Utama 1: Abstraksi
> > 
> > Abstraksi adalah proses **menyederhanakan** interaksi dengan hardware yang kompleks. OS menyembunyikan detail teknis perangkat keras dan menyediakan antarmuka (interface) yang standar dan mudah digunakan oleh aplikasi.
> > 
> > - **Mengapa perlu abstraksi?**
> >     
> >     - **Kemudahan**: Aplikasi tidak perlu tahu cara kerja spesifik setiap jenis hard drive atau kartu jaringan. Mereka cukup menggunakan perintah standar seperti `readFile()` atau `sendData()`.
> >         
> >     - **Portabilitas**: Aplikasi yang sama bisa berjalan di berbagai komputer dengan hardware berbeda, selama OS-nya sama.
> >         
> > - **Contoh Abstraksi:**
> >     
> >     - **CPU** diabstraksikan menjadi **Proses & Thread** (unit eksekusi yang bisa dijadwalkan).
> >         
> >     - **Memori Fisik (RAM)** diabstraksikan menjadi **Ruang Alamat (Address Space)** (setiap program merasa memiliki memorinya sendiri).
> >         
> >     - **Disk Penyimpanan** diabstraksikan menjadi **File & Direktori** (struktur yang mudah dipahami manusia).
> >         
> > 
> > ### Peran Utama 2: Manajemen Sumber Daya (Resource Management)
> > 
> > Manajemen Sumber Daya adalah proses **membagi, melindungi, dan mengatur** penggunaan sumber daya (resources) komputer secara efisien dan adil di antara banyak aplikasi yang berjalan bersamaan. Sumber daya mencakup CPU, memori, disk, jaringan, dll.
> > 
> > - **Tujuan Manajemen Sumber Daya:**
> >     
> >     1. **Proteksi**: Melindungi aplikasi dari satu sama lain. Jika satu aplikasi crash, aplikasi lain tidak boleh ikut terpengaruh.
> >         
> >     2. **Efisiensi**: Memastikan sumber daya digunakan secara optimal untuk mendapatkan performa terbaik (hemat waktu, biaya, energi).
> >         
> >     3. **Keadilan (Fairness)**: Memberikan akses yang adil ke sumber daya bagi setiap aplikasi, sehingga tidak ada aplikasi yang "kelaparan" (starvation) atau memonopoli.
> >         
> > 
> > ### Tiga Aspek Utama dalam Desain Sistem Operasi
> > 
> > 1. **Virtualisasi (Virtualization)**: Proses membuat setiap aplikasi seolah-olah memiliki perangkat kerasnya sendiri secara eksklusif. OS "menipu" aplikasi agar berpikir ia memiliki CPU, memori, dan disk pribadi, padahal sebenarnya semua itu dibagi-pakai dengan aplikasi lain. Ini adalah inti dari abstraksi.
> >     
> > 2. **Konkurensi (Concurrency)**: Kemampuan OS untuk menangani banyak kejadian (event) atau tugas yang seolah-olah berjalan pada saat yang bersamaan. OS harus bisa mengelola interaksi dan koordinasi antar tugas-tugas ini agar tidak terjadi konflik atau kekacauan data.
> >     
> > 3. **Persistensi (Persistence)**: Kemampuan untuk menyimpan informasi (data) secara permanen, bahkan setelah komputer dimatikan. OS menyediakan abstraksi (seperti sistem file) agar aplikasi dapat menyimpan dan mengakses data tanpa perlu tahu detail teknis bagaimana data ditulis ke disk fisik.
> >     
> > 
> > ### Struktur Sistem Komputer
> > 
> > Sistem komputer secara umum terdiri dari empat lapisan komponen yang saling berinteraksi:
> > 
> > 1. **Users**: Pengguna akhir, baik itu manusia, mesin, atau komputer lain.
> >     
> > 2. **Application Programs**: Program yang digunakan user untuk menyelesaikan tugas komputasi (mis: browser, word processor, game). Program ini mendefinisikan _bagaimana_ sumber daya digunakan.
> >     
> > 3. **Operating System**: Perangkat lunak yang mengontrol dan mengoordinasikan penggunaan hardware oleh berbagai aplikasi dan user.
> >     
> > 4. **Hardware**: Komponen fisik yang menyediakan sumber daya komputasi dasar (CPU, memori, perangkat I/O).
> >     
> > 
> > ### Dua Sudut Pandang Definisi OS
> > 
> > 1. **OS sebagai Resource Allocator (Alokator Sumber Daya)**: Dari sudut pandang ini, OS adalah manajer utama. Tugasnya adalah mengelola semua sumber daya, menengahi permintaan yang konflik dari berbagai program, dan memutuskan alokasi yang paling efisien dan adil untuk semua pihak.
> >     
> > 2. **OS sebagai Control Program (Program Pengendali)**: Dari sudut pandang ini, OS adalah pengawas. Tugasnya adalah mengatur eksekusi program-program lain untuk mencegah terjadinya kesalahan (errors) atau penggunaan komputer yang tidak semestinya (improper use), serta menjaga stabilitas sistem secara keseluruhan.
> >     

> [!cornell] #### Summary
> 
> Sistem Operasi adalah perangkat lunak fundamental yang bertindak sebagai perantara antara hardware dan aplikasi, dengan dua peran utama: menyediakan Abstraksi untuk menyederhanakan kompleksitas hardware dan melakukan Manajemen Sumber Daya untuk memastikan pembagian yang adil, efisien, dan aman. Tiga pilar utama desainnya—Virtualisasi, Konkurensi, dan Persistensi—memungkinkan banyak aplikasi berjalan secara bersamaan seolah-olah masing-masing memiliki komputernya sendiri, dengan data yang dapat disimpan secara permanen.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis 1: User Mode vs. Kernel Mode
> 
> Untuk menjalankan peran proteksi dan kontrol, OS modern membagi operasinya menjadi dua mode:
> 
> - **User Mode**: Mode standar di mana aplikasi berjalan. Akses ke hardware sangat dibatasi. Jika sebuah aplikasi ingin mengakses hardware (misalnya, membaca file dari disk), ia tidak bisa melakukannya secara langsung.
>     
> - **Kernel Mode (atau Supervisor Mode)**: Mode dengan hak akses penuh ke seluruh instruksi dan perangkat keras komputer. Hanya komponen inti dari OS (disebut **Kernel**) yang berjalan di mode ini.
>     
> 
> Transisi dari User Mode ke Kernel Mode terjadi melalui mekanisme yang disebut **System Call**. Ketika aplikasi butuh layanan OS, ia melakukan system call, yang menyebabkan CPU beralih ke Kernel Mode. OS kemudian memverifikasi permintaan tersebut, melaksanakannya atas nama aplikasi, dan mengembalikan hasilnya serta mengalihkan mode kembali ke User Mode. Mekanisme ini krusial untuk mencegah aplikasi jahat atau yang error merusak sistem.
> 
> #### Pendalaman Teknis 2: Arsitektur Berbasis Interupsi (Interrupt-Driven)
> 
> Konsep "interrupt-driven" berarti OS bersifat reaktif. Ia tidak terus-menerus memeriksa status setiap perangkat, yang akan sangat boros sumber daya CPU (proses ini disebut _polling_). Sebaliknya, OS menunggu sinyal dari hardware atau software. Sinyal inilah yang disebut **interupsi**.
> 
> - **Hardware Interrupt**: Dihasilkan oleh perangkat keras. Contoh: Anda menekan tombol di keyboard, mouse bergerak, atau proses transfer data dari disk selesai.
>     
> - **Software Interrupt (Trap atau Exception)**: Dihasilkan oleh program. Contoh: Program mencoba mengakses memori ilegal, melakukan pembagian dengan nol, atau secara sengaja meminta layanan OS melalui _system call_.
>     
> 
> Ketika interupsi terjadi, CPU akan menghentikan apa yang sedang dikerjakannya, menyimpan konteksnya saat ini, lalu melompat untuk menjalankan kode khusus milik OS yang disebut **Interrupt Handler** untuk menangani kejadian tersebut.
> 
> #### Eksplorasi Mandiri
> 
> - **Buka Task Manager (Windows) atau Activity Monitor (macOS)**: Amati tab 'Processes' dan 'Performance'. Anda sedang melihat hasil kerja OS dalam mengelola proses (abstraksi CPU) dan alokasi memori (manajemen sumber daya) secara real-time.
>     
> - **Gunakan Command Line/Terminal**: Perintah sederhana seperti `ls` (Linux/macOS) atau `dir` (Windows) adalah contoh aplikasi yang menggunakan _system call_ ke OS untuk meminta daftar file dalam sebuah direktori (abstraksi sistem file).
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku Teks**:
>     
>     - _Operating System Concepts_ oleh Silberschatz, Galvin, and Gagne.
>         
>     - _Modern Operating Systems_ oleh Andrew S. Tanenbaum.
>         
>     - _Operating Systems: Three Easy Pieces_ oleh Remzi H. Arpaci-Dusseau and Andrea C. Arpaci-Dusseau (tersedia gratis online).
>