---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF2130 Sistem Operasi]]

> [!cornell] Desain Arsitektur Sistem Operasi
> 
> > ## Questions/Cues
> > 
> > - Apa itu pemisahan _Policy_ vs _Mechanism_?
> >     
> > - Apa itu arsitektur _Simple Structure_?
> >     
> > - Apa itu arsitektur Monolitik?
> >     
> > - Apa itu arsitektur Berlapis (_Layered_)?
> >     
> > - Apa itu arsitektur Microkernel?
> >     
> > - Apa itu arsitektur Modular?
> >     
> > - Apa itu arsitektur Hybrid?
> >     
> > - Bagaimana arsitektur OS Modern?
> >     
> 
> > ## Reference Points
> > 
> > - Slides 34-50, IF2130-02-2025-OS-Structure.pdf
> >     
> > 
> > ### Prinsip Desain: Policy vs. Mechanism
> > 
> > Salah satu prinsip terpenting dalam desain OS adalah memisahkan antara _policy_ dan _mechanism_.
> > 
> > - **Mechanism**: Menjawab pertanyaan "**Bagaimana** melakukan sesuatu?" Ini adalah implementasi dari sebuah fungsionalitas. Contoh: sebuah _timer_ yang bisa diatur untuk menginterupsi CPU.
> >     
> > - **Policy**: Menjawab pertanyaan "**Apa** yang akan dilakukan?" Ini adalah cara sebuah mekanisme digunakan. Contoh: memutuskan bahwa setiap proses pengguna diberi jatah waktu 100 milidetik menggunakan mekanisme _timer_.
> >     
> > 
> > Pemisahan ini memberikan fleksibilitas. _Mechanism_ (yang sulit diubah) bisa tetap sama, sementara _policy_ (yang mungkin perlu disesuaikan) dapat diubah dengan mudah.
> > 
> > ### Model-Model Arsitektur OS
> > 
> > **1. Simple Structure (Contoh: MS-DOS)**
> > 
> > - Tidak memiliki struktur yang jelas. Tidak ada pemisahan modul atau proteksi memori.
> >     
> > - Aplikasi dapat mengakses BIOS dan perangkat keras secara langsung.
> >     
> > - **Kelebihan**: Ukuran kecil, performa baik (tidak ada overhead).
> >     
> > - **Kekurangan**: Tidak aman, tidak stabil. Satu bug di aplikasi bisa merusak seluruh sistem.
> >     
> > 
> > **2. Monolithic (Contoh: UNIX Tradisional, Linux)**
> > 
> > - Seluruh fungsionalitas OS (penjadwalan CPU, manajemen memori, sistem file, driver) dijalankan di dalam satu ruang alamat besar di _kernel mode_.
> >     
> > - Komunikasi antar komponen sangat cepat (hanya pemanggilan fungsi biasa).
> >     
> > - **Kelebihan**: Performa sangat tinggi.
> >     
> > - **Kekurangan**: Sulit dikelola dan di-debug, sangat tidak modular. Bug pada satu driver bisa meruntuhkan seluruh kernel (_kernel panic_).
> >     
> > 
> > **3. Layered Approach**
> > 
> > - OS diorganisir dalam hierarki lapisan-lapisan. Lapisan paling bawah adalah hardware (Layer 0), dan paling atas adalah UI.
> >     
> > - Setiap lapisan hanya boleh menggunakan fungsi dari lapisan yang berada tepat di bawahnya.
> >     
> > - **Kelebihan**: Desain yang bersih, modular, dan lebih mudah untuk verifikasi dan debugging.
> >     
> > - **Kekurangan**: Performa bisa menjadi lambat karena setiap permintaan harus melewati banyak lapisan.
> >     
> > 
> > **4. Microkernel (Contoh: Mach, QNX)**
> > 
> > - Filosofinya adalah memindahkan sebanyak mungkin layanan dari kernel ke _user space_.
> >     
> > - Kernel (microkernel) hanya menangani fungsi paling esensial: komunikasi antar proses (IPC), manajemen memori dasar, dan penjadwalan CPU.
> >     
> > - Layanan lain seperti driver, sistem file, dan server jaringan berjalan sebagai proses biasa di _user mode_.
> >     
> > - **Kelebihan**: Lebih andal (jika file server crash, kernel tetap berjalan), lebih aman, dan lebih mudah diperluas.
> >     
> > - **Kekurangan**: Performa lebih lambat karena komunikasi antar proses di _user mode_ lebih lambat daripada pemanggilan fungsi di dalam kernel.
> >     
> > 
> > **5. Modular (Contoh: Solaris, Linux Modern)**
> > 
> > - Mengambil pendekatan terbaik dari Monolithic dan Microkernel.
> >     
> > - Kernel memiliki sekumpulan komponen inti, tetapi juga dapat memuat dan membongkar modul lain (seperti driver atau sistem file) secara dinamis saat runtime.
> >     
> > - Ini seperti kernel monolitik yang dapat diperluas.
> >     
> > - **Kelebihan**: Fleksibel, efisien, dan lebih mudah dikelola daripada monolitik murni.
> >     
> > 
> > **6. Hybrid Systems (OS Modern)**
> > 
> > - Hampir semua OS modern adalah sistem hybrid yang menggabungkan beberapa pendekatan.
> >     
> > - **macOS & iOS**: Menggunakan arsitektur hybrid yang disebut Darwin. Intinya adalah kernel XNU yang menggabungkan microkernel Mach (untuk IPC, penjadwalan) dengan komponen dari kernel monolitik BSD (untuk networking, sistem file) dan mendukung modul yang dapat dimuat (_kernel extensions_).
> >     
> > - **Android**: Didasarkan pada kernel Linux (monolitik dengan modul) yang telah dimodifikasi. Namun, aplikasi berjalan di atas _runtime environment_ (ART/Dalvik VM) dan serangkaian pustaka C/C++ yang luas, membuatnya terlihat seperti sistem berlapis.
> >     
> > - **Windows**: Sebagian besar monolitik, tetapi menggunakan beberapa konsep dari microkernel untuk subsistem yang menjalankan aplikasi dari lingkungan OS lain (seperti WSL - Windows Subsystem for Linux).
> >     

> [!cornell] #### Summary
> 
> Arsitektur Sistem Operasi telah berevolusi dari struktur monolitik yang sederhana dan cepat namun tidak aman, menjadi pendekatan yang lebih terstruktur seperti berlapis dan microkernel yang menawarkan keandalan dan modularitas dengan mengorbankan sedikit performa. OS modern seperti macOS, iOS, Android, dan Windows tidak menganut satu model murni, melainkan menggunakan arsitektur hybrid—paling umum adalah model kernel monolitik yang modular—untuk mencapai keseimbangan terbaik antara performa, keamanan, fleksibilitas, dan kemudahan pengembangan.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis 1: Komunikasi di Microkernel
> 
> Karena layanan seperti file server berada di _user space_, bagaimana aplikasi berkomunikasi dengannya?
> 
> 1. Aplikasi (klien) ingin membaca file. Ia mengirim pesan ke file server melalui _system call_ IPC yang ditangani oleh microkernel.
>     
> 2. Microkernel menerima pesan ini dan meneruskannya ke proses file server yang sedang menunggu.
>     
> 3. File server memproses permintaan tersebut (misalnya, dengan meminta driver disk, yang juga merupakan proses lain).
>     
> 4. Setelah mendapatkan data, file server mengirim pesan balasan berisi data tersebut kembali ke aplikasi klien, lagi-lagi melalui microkernel.
>     
> 
> Proses pengiriman pesan (message passing) ini melibatkan dua kali _context switch_ (klien -> kernel, kernel -> server) dan penyalinan data, yang menjadi sumber utama _overhead_ performa dibandingkan dengan pemanggilan fungsi langsung di kernel monolitik.
> 
> #### Pendalaman Teknis 2: Loadable Kernel Modules (LKMs) di Linux
> 
> Pendekatan modular di Linux sangat kuat. Anda dapat mengkompilasi sebuah driver perangkat sebagai LKM. Tanpa perlu me-reboot sistem, Anda dapat menggunakan perintah `insmod` untuk menyisipkan modul tersebut langsung ke dalam kernel yang sedang berjalan. Kernel akan menghubungkan fungsi-fungsi modul ke dalam struktur internalnya. Jika perangkat dicabut, Anda dapat menggunakan `rmmod` untuk membongkar modul tersebut, membebaskan memori. Ini membuat pengembangan driver dan penambahan fungsionalitas baru menjadi sangat fleksibel.
> 
> #### Eksplorasi Mandiri
> 
> - **Lihat Modul yang Dimuat (Linux)**: Buka terminal dan jalankan perintah `lsmod`. Anda akan melihat daftar semua modul kernel yang sedang dimuat di sistem Anda, mulai dari driver USB, kartu suara, hingga sistem file.
>     
> - **Lihat Arsitektur macOS/iOS**: Cari "XNU Kernel Architecture". Anda akan menemukan banyak diagram yang memvisualisasikan bagaimana microkernel Mach dan komponen BSD bekerja sama di dalam inti Darwin.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku**: _Operating Systems: Three Easy Pieces_ (Arpaci-Dusseau) memiliki bab-bab terpisah yang didedikasikan untuk membahas berbagai filosofi desain ini dengan cara yang sangat mudah dipahami.
>     
> - **Talks**: Cari "The Linux Kernel: As A Crying Baby" oleh Robert Love. Ini adalah presentasi yang menarik tentang bagaimana kernel Linux bekerja dan mengapa desain monolitiknya tetap relevan.
>