---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[01. Matkul/OS]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Komponen Keras I/O?
> > - Bagaimana CPU berkomunikasi dengan perangkat?
> > - Apa itu Polling?
> > - Apa itu Interrupt?
> > - Fungsi DMA?
> > - Bagaimana OS menyederhanakan I/O?
> > - Apa itu Device Driver?
> > - Layanan I/O di Kernel?
> > - Beda Buffer dan Cache?
> > - Apa itu Spooling?
> > - Alur lengkap permintaan I/O?
> > - Faktor Kinerja I/O?
>
> >
> > ### Komponen Keras I/O 
> > Fondasi dari semua operasi I/O adalah perangkat kerasnya, yang umumnya terdiri dari:
> > - **Port:** Titik koneksi fisik, seperti _port_ USB atau _port_ serial.
> > - **Bus:** Jalur data bersama yang menghubungkan beberapa perangkat. Ini adalah sekumpulan kabel dan protokol (aturan komunikasi). Contoh: bus PCIe, bus SATA.
> > - **Controller:** Sirkuit elektronik cerdas yang mengoperasikan _port_, _bus_, atau perangkat. Ia bertindak sebagai perantara antara CPU dan perangkat I/O fisik.
> >
> > ### Komunikasi
> > **Komunikasi CPU dengan Perangkat:**
> >  CPU tidak berbicara langsung ke disk atau keyboard. Ia berkomunikasi dengan **kontroler perangkat** dengan membaca dan menulis nilai ke lokasi memori khusus di dalam kontroler yang disebut **register**. Ada register untuk mengirim perintah (kontrol), membaca status (status), dan mentransfer data (data).
> >  
> >  **Metode Komunikasi I/O:**
> >  - **Polling (Busy-Waiting):** CPU secara terus-menerus bertanya kepada kontroler, "Apakah kamu sudah selesai? Apakah kamu sudah selesai?". Ini sangat tidak efisien karena membuang waktu CPU yang berharga hanya untuk menunggu.
> >  - **Interrupt (Interupsi):** Metode yang jauh lebih efisien. CPU memberikan perintah ke kontroler, lalu melanjutkan pekerjaan lain. Ketika kontroler selesai, ia akan mengirim sinyal **interupsi** (seperti mengetuk pintu) ke CPU. CPU kemudian berhenti sejenak dari tugasnya untuk menangani hasil I/O tersebut.
> >  - **DMA (Direct Memory Access):** Untuk transfer data besar, menggunakan CPU bahkan dengan interupsi masih tidak efisien. **DMA** adalah solusi di mana CPU mendelegasikan tugas transfer data massal ke sebuah **kontroler DMA** khusus. CPU hanya perlu memberi tahu kontroler DMA: "Pindahkan X byte data dari perangkat Y ke memori Z". Kontroler DMA akan menangani seluruh proses transfer, dan hanya akan menginterupsi CPU **satu kali** setelah semuanya selesai.
> >  - **Abstraksi oleh Sistem Operasi:** Perangkat keras I/O sangat beragam. Untuk menyembunyikan kerumitan ini dari aplikasi, sistem operasi menyediakan **abstraksi**. OS mengelompokkan perangkat ke dalam beberapa tipe umum (misalnya, **perangkat blok** seperti disk, **perangkat karakter** seperti keyboard) dan menyediakan antarmuka standar untuk berinteraksi dengan mereka.
> > 	 - **Device Driver (Pengandar Perangkat):** Ini adalah komponen kunci untuk abstraksi. _Device driver_ adalah modul perangkat lunak yang bertindak sebagai **penerjemah**. Setiap _driver_ dibuat khusus untuk satu jenis perangkat keras, tetapi ia menyajikan antarmuka yang seragam ke seluruh bagian sistem operasi. Inilah yang memungkinkan OS Anda bekerja dengan ribuan jenis mouse, keyboard, dan printer yang berbeda.
> >
> > ### Layanan Subsistem I/O Kernel:
> > Kernel OS menyediakan berbagai layanan untuk mengelola I/O, termasuk:
> > - **Penjadwalan I/O:** Mengatur urutan permintaan I/O untuk efisiensi (seperti yang dibahas di Bagian 2).
> > - **Buffering:** Menggunakan area memori untuk menyimpan data sementara saat ditransfer, untuk mengatasi perbedaan kecepatan atau ukuran data.
> > - **Caching:** Menyimpan salinan data yang sering diakses di memori (cache) untuk mempercepat akses berikutnya, menghindari keharusan membaca dari perangkat yang lambat.
> > - **Spooling:** Mengantrikan permintaan untuk perangkat yang hanya bisa melayani satu tugas pada satu waktu (contoh paling umum adalah antrian cetak / _print spool_ untuk printer).
> > - **Proteksi I/O:** Memastikan program pengguna tidak dapat mengeluarkan perintah I/O ilegal yang dapat mengganggu sistem.
> >  
> > ### Perbedaan Buffer dan Cache:
> > - **Buffer:** Area penyimpanan sementara untuk data yang **sedang dalam perjalanan**. Fokusnya adalah sinkronisasi transfer.
> > - **Cache:** Tempat menyimpan **salinan** data untuk akses di masa depan yang lebih cepat. Fokusnya adalah kinerja.
> > - Dalam praktiknya, satu area memori seperti _buffer cache_ disk dapat berfungsi sebagai keduanya.
> > 
> > ### Alur Lengkap Permintaan I/O (Contoh: Membaca File):
> > 1. Aplikasi memanggil _system call_ `read()`.
> > 2. Kernel I/O Subsystem menerima permintaan. Ia memeriksa **cache** terlebih dahulu. Jika data ada, data langsung dikembalikan.
> > 3. Jika tidak ada di cache, permintaan ditempatkan di **antrian** untuk perangkat tersebut.
> > 4. **Scheduler I/O** menentukan kapan permintaan ini akan dijalankan.
> > 5. **Device driver** menerjemahkan permintaan logis menjadi perintah spesifik untuk **kontroler perangkat keras**.
> > 6. Kontroler mengeksekusi perintah dan mentransfer data (seringkali menggunakan **DMA**).
> > 7. Setelah selesai, kontroler mengirim **interrupt** ke CPU.
> > 8. _Interrupt handler_ berjalan, memproses data (misalnya, menaruhnya di _cache_), dan memberi tahu kernel bahwa I/O telah selesai.
> > 9. Proses aplikasi yang tadinya menunggu (diblokir) kini dibangunkan dan dapat melanjutkan eksekusinya dengan data yang diminta.
> > 
> > I/O seringkali menjadi **bottleneck** (penghambat) utama dalam kinerja sistem. Peningkatan kinerja melibatkan penyeimbangan kecepatan CPU, memori, bus, dan perangkat I/O itu sendiri, serta memindahkan fungsionalitas I/O ke lapisan yang paling efisien (dari aplikasi -> ke driver -> hingga ke perangkat keras itu sendiri)
> >

> [!cornell] #### Summary
> Sistem I/O adalah arsitektur berlapis canggih yang menjembatani aplikasi perangkat lunak dengan perangkat keras yang beragam. Melalui abstraksi yang disediakan oleh device driver, OS menyajikan antarmuka yang konsisten. Komunikasi yang efisien dicapai dengan beralih dari Polling ke mekanisme Interrupt dan DMA yang jauh lebih unggul. Kernel menyediakan layanan vital seperti caching, buffering, dan scheduling untuk mengoptimalkan aliran data. Seluruh alur kerja ini, dari permintaan aplikasi hingga sinyal interrupt dari perangkat keras, dirancang untuk memastikan I/O berjalan secara teratur, aman, dan seefisien mungkin.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Vectored I/O (Scatter-Gather I/O):** Sebuah fitur efisien yang memungkinkan satu _system call_ untuk melakukan I/O pada beberapa _buffer_ memori sekaligus. Misalnya, `readv()` dapat membaca data dari satu sumber (seperti socket jaringan) dan menyebarkannya (_scatter_) ke beberapa _buffer_ yang lokasinya tidak bersebelahan di memori. Sebaliknya, `writev()` dapat mengumpulkan (_gather_) data dari beberapa _buffer_ dan menuliskannya sebagai satu aliran tunggal. Ini menghindari _overhead_ dari banyak panggilan sistem yang terpisah.
> - **Memory-Mapped I/O vs. Port-Mapped I/O:** Dua cara fundamental arsitektur komputer menangani alamat kontroler.
> 	- **Memory-Mapped I/O:** Register kontroler perangkat dipetakan ke dalam ruang alamat memori utama. CPU menggunakan instruksi transfer data standar (seperti `mov`) untuk mengaksesnya, seolah-olah register tersebut adalah lokasi RAM biasa.
> 	- **Port-Mapped I/O (atau Isolated I/O):** Register perangkat berada di ruang alamat terpisah. CPU harus menggunakan instruksi I/O khusus (seperti `IN` dan `OUT` pada arsitektur x86) untuk mengaksesnya.
> - **STREAMS:** Mekanisme di UNIX yang memungkinkan pembuatan _pipeline_ pemrosesan I/O secara dinamis. Sebuah _stream_ terdiri dari _stream head_ (di sisi aplikasi), _driver end_ (di sisi perangkat keras), dan beberapa _stream module_ di antaranya. Setiap modul dapat melakukan pemrosesan data (misalnya, enkripsi, kompresi) saat data mengalir melalui _stream_. Ini sangat modular dan sering digunakan dalam implementasi protokol jaringan.
>
>#### Sumber & Referensi Lanjutan:
> - **Buku Arsitektur Komputer:** "Computer Architecture: A Quantitative Approach" oleh Hennessy & Patterson memberikan wawasan mendalam tentang interaksi antara perangkat keras dan perangkat lunak, termasuk sistem I/O.
> - **Kode Sumber Kernel:** Menjelajahi direktori `/drivers` dan `/fs` pada kode sumber kernel Linux dapat memberikan pemahaman paling mendalam tentang bagaimana _device driver_ dan subsistem I/O diimplementasikan.
> - **Halaman Manual (Man Pages):** Di sistem UNIX/Linux, membaca `man 2 read`, `man 2 write`, `man 2 ioctl` memberikan detail tentang antarmuka _system call_ I/O.
> #### Eksplorasi Mandiri:
> - Pada sistem Linux, jalankan perintah `dmesg` setelah menyambungkan perangkat USB. Anda akan melihat pesan-pesan dari kernel saat ia mendeteksi perangkat, memuat _device driver_ yang sesuai, dan mengkonfigurasinya.
> - Gunakan perintah `lsblk -o NAME,MAJ:MIN` untuk melihat nama perangkat blok dan nomor _major/minor_ mereka. Nomor _major_ mengidentifikasi _driver_ yang digunakan.
> - Cari tahu perbedaan antara `raw I/O` dan `direct I/O` (menggunakan flag `O_DIRECT`) pada sistem operasi modern dan kapan masing-masing digunakan, terutama oleh aplikasi basis data.