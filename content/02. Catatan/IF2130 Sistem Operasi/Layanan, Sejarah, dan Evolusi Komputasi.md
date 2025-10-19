---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Layanan, Sejarah, dan Evolusi Komputasi
> 
> > ## Questions/Cues
> > 
> > - Apa saja layanan utama OS?
> >     
> > - Apa itu IPC?
> >     
> > - Apa tujuan desain sebuah OS?
> >     
> > - Bagaimana evolusi OS dari awal?
> >     
> > - Apa itu _batch jobs_?
> >     
> > - Apa revolusi yang dibawa IBM 360?
> >     
> > - Kapan revolusi PC & GUI dimulai?
> >     
> > - Apa dampak internet & mobile?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 15-26, IF2130-01-2025-OSIntro.pdf
> >     
>  
> > ### Layanan-Layanan Sistem Operasi
> > 
> > Sistem Operasi menyediakan serangkaian layanan fundamental untuk memudahkan program dan pengguna dalam berinteraksi dengan komputer. Layanan ini dapat dikelompokkan menjadi:
> > 
> > 1. **Eksekusi Program**: OS bertanggung jawab untuk memuat program ke dalam memori, menjalankannya, menghentikan sementara (suspend), atau menghentikannya sepenuhnya (halt). OS juga menangani dan menampilkan error yang mungkin terjadi selama eksekusi.
> >     
> > 2. **Operasi I/O (Input/Output)**: OS menyediakan mekanisme agar program dapat berinteraksi dengan perangkat I/O (seperti disk, printer, keyboard, jaringan) secara mulus tanpa perlu mengetahui detail teknis perangkat tersebut.
> >     
> > 3. **Manipulasi Sistem File**: OS mengelola bagaimana data disimpan. Ini termasuk membuat, membaca, menulis, dan menghapus file atau direktori. OS juga bertanggung jawab untuk menegakkan hak akses (permission) dan menyediakan fungsi pencarian.
> >     
> > 4. **Komunikasi Antar Proses (Inter-Process Communication/IPC)**: Ketika banyak proses berjalan bersamaan, seringkali mereka perlu bertukar informasi. OS memfasilitasi komunikasi ini melalui berbagai mekanisme seperti _shared memory_, _message passing_, _sockets_, atau _pipes_. IPC bahkan bisa terjadi antar komputer yang terhubung dalam jaringan.
> >     
> > 5. **Deteksi dan Pemulihan Error**: OS secara konstan memonitor kemungkinan adanya error di CPU, memori, perangkat I/O, atau dalam program pengguna. Ketika error terdeteksi, OS akan mencoba melakukan pemulihan (recovery) secara elegan untuk menjaga konsistensi dan stabilitas sistem.
> >     
> > 
> > ### Sejarah dan Evolusi Sistem Operasi
> > 
> > Evolusi OS sangat erat kaitannya dengan perkembangan perangkat keras dan kebutuhan komputasi dari masa ke masa.
> > 
> > - **1940s - Awal Mula**: Komputer generasi pertama tidak memiliki sistem operasi. Pengguna berinteraksi langsung dengan perangkat keras, seringkali dengan menyambungkan kabel secara manual.
> >     
> > - **1950s - Otomatisasi & Batch Jobs**: Untuk meningkatkan efisiensi, konsep **Job** diperkenalkan. Sebuah _job_ adalah satu unit pekerjaan (program, data input, dan instruksi) yang diserahkan oleh pengguna. _Job-job_ ini dikumpulkan dan dieksekusi secara berurutan dalam sebuah **batch** menggunakan media seperti _punch cards_. Ini adalah bentuk paling awal dari otomatisasi OS.
> >     
> > - **1960s - IBM 360 & Multiprogramming**: Peluncuran IBM System/360 pada tahun 1964 menjadi sebuah revolusi. Komputer ini memperkenalkan sistem operasi yang lebih kompleks yang mendukung berbagai jenis periferal dan, yang terpenting, konsep _multiprogramming_ (akan dibahas di catatan selanjutnya).
> >     
> > - **1970s - Interaktivitas & CRT**: Terminal CRT (Cathode Ray Tube) berbasis teks memungkinkan interaksi langsung antara pengguna dan komputer, menggantikan sistem _batch_ yang tertunda. Era _timesharing_ dimulai.
> >     
> > - **1980s - Revolusi PC & GUI**: Komputer personal (PC) seperti Apple II membawa komputasi ke ranah personal. Kemudian, Apple Macintosh (1984) mempopulerkan **Graphical User Interface (GUI)**, yang menggunakan ikon, jendela, dan mouse, membuat komputer jauh lebih mudah digunakan oleh masyarakat umum.
> >     
> > - **1990s/2000s - Revolusi Internet**: Kemunculan World Wide Web mendorong pengembangan OS yang berfokus pada jaringan dan konektivitas. OS harus bisa menangani protokol internet, keamanan jaringan, dan layanan web secara native.
> >     
> > - **2010s - Revolusi Mobile**: Ledakan smartphone dan tablet melahirkan OS mobile seperti iOS dan Android. OS ini didesain dengan prioritas pada efisiensi daya, antarmuka sentuh (touch interface), dan konektivitas nirkabel.
> >     

> [!cornell] #### Summary
> 
> Sistem Operasi menyediakan layanan esensial seperti eksekusi program, operasi I/O, manajemen file, IPC, dan penanganan error, yang memungkinkan aplikasi berjalan dengan aman dan efisien. Sejarahnya mencerminkan evolusi dari sistem batch manual yang tidak interaktif pada tahun 1950-an, menuju komputasi personal dengan antarmuka grafis (GUI) pada 1980-an, hingga sistem operasi modern yang terhubung ke internet dan dioptimalkan untuk perangkat mobile, di mana setiap tahap perkembangan didorong oleh kebutuhan akan interaktivitas dan kemudahan penggunaan yang lebih besar.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis 1: GUI (Graphical User Interface) vs. CLI (Command-Line Interface)
> 
> Dua antarmuka utama yang disediakan OS untuk pengguna adalah:
> 
> - **CLI**: Antarmuka berbasis teks di mana pengguna mengetikkan perintah untuk berinteraksi dengan OS. Contoh: Command Prompt/PowerShell (Windows), Terminal (macOS, Linux). CLI sangat efisien, cepat, dan mudah diotomatisasi (scripting), tetapi membutuhkan pengguna untuk menghafal perintah. Ini adalah antarmuka dominan di era awal komputasi interaktif.
>     
> - **GUI**: Antarmuka visual yang menggunakan metafora seperti jendela, ikon, menu, dan pointer (WIMP). Dipelopori oleh Xerox PARC dan dipopulerkan oleh Apple, GUI bersifat intuitif dan mudah dipelajari, yang menjadi kunci adopsi massal komputer personal. Hampir semua OS modern menyediakan GUI, namun CLI tetap menjadi alat yang sangat penting bagi developer dan administrator sistem.
>     
> 
> #### Pendalaman Teknis 2: Evolusi Konsep 'Job' menjadi 'Proses'
> 
> Konsep "Job" pada sistem batch adalah entitas pasif. Ia adalah sekumpulan instruksi dan data pada punch card yang menunggu untuk dieksekusi dari awal hingga akhir tanpa interupsi. Ketika OS yang lebih canggih seperti sistem multiprogramming dan timesharing muncul, konsep ini berevolusi menjadi **"Proses"**. Sebuah proses adalah program yang _sedang dieksekusi_. Tidak seperti job, proses adalah entitas aktif yang memiliki state (running, waiting, etc.), program counter, dan sumber daya yang dialokasikan padanya. OS dapat menghentikan satu proses dan beralih ke proses lain, memungkinkan ilusi bahwa banyak program berjalan secara bersamaan.
> 
> #### Eksplorasi Mandiri
> 
> - **Coba Gunakan CLI**: Buka Terminal atau Command Prompt di komputermu. Coba jalankan beberapa perintah dasar: `ls` atau `dir` untuk melihat daftar file, `cd` untuk berpindah direktori, `ping google.com` untuk memeriksa koneksi jaringan. Ini akan memberimu gambaran bagaimana interaksi dengan komputer sebelum era GUI.
>     
> - **Jelajahi Sejarah GUI**: Cari video "Xerox Alto demo" di YouTube. Ini adalah salah satu demonstrasi pertama dari sistem berbasis GUI pada tahun 1970-an, yang kemudian menginspirasi Steve Jobs untuk menciptakan Apple Lisa dan Macintosh.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Film/Dokumenter**:
>     
>     - _Triumph of the Nerds_ (1996): Dokumenter yang sangat baik mengenai sejarah revolusi komputer personal.
>         
>     - _Pirates of Silicon Valley_ (1999): Film yang mendramatisasi persaingan antara Apple (Steve Jobs) dan Microsoft (Bill Gates) di masa-masa awal.
>         
> - **Museum**: Computer History Museum (computerhistory.org) memiliki banyak sekali arsip dan pameran online tentang evolusi komputasi dan sistem operasi.
>