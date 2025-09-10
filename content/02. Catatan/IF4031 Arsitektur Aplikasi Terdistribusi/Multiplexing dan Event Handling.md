---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu `select()`?
> >     
> > - Bagaimana cara kerja `fd_set`?
> >     
> > - Apa saja kelemahan `select()`?
> >     
> > - Apa itu `poll()` dan bedanya dengan `select()`?
> >     
> > - Apa itu `kqueue()`?
> >     
> > - Bagaimana `kqueue()` mengelola event?
> >     
> > - Apa itu `epoll()`?
> >     
> > - Apa tiga fungsi utama `epoll()`?
> >     
> > - Beda `kqueue()`/`epoll()` dengan `select()`?
> >     
> >
> > ## Reference Points
> > 
> > - Slides IF4031 Hal 18-35
> >     
> 
> > ### Multiplexing dengan `select()`
> > 
> > `select()` adalah panggilan sistem klasik yang memungkinkan satu proses untuk memonitor beberapa _file descriptor_ (misalnya socket) dan menunggu hingga salah satunya siap untuk operasi I/O.
> > 
> > Cara kerjanya adalah dengan menggunakan `fd_set`, sebuah struktur data yang pada dasarnya adalah bitmask (kumpulan bit). Aplikasi akan mengatur bit yang sesuai dengan _file descriptor_ yang ingin dimonitor.
> > 
> > - `FD_ZERO()`: Mengosongkan (me-nol-kan) seluruh set.
> >     
> > - `FD_SET()`: Mengaktifkan bit untuk _file descriptor_ tertentu.
> >     
> > - `FD_CLR()`: Menonaktifkan bit.
> >     
> > - `FD_ISSET()`: Memeriksa apakah bit untuk _descriptor_ tertentu aktif setelah `select()` kembali.
> >     
> >
> > **Kelemahan `select()`:**
> > 
> > 1. **Tidak Efisien:** Setiap kali memanggil `select()`, aplikasi harus mengirimkan seluruh `fd_set` dari _user space_ ke _kernel space_, dan kernel akan menyalinnya kembali dengan hasil. Ini boros jika jumlah _descriptor_ banyak.
> >     
> > 2. **Harus Iterasi:** Setelah `select()` kembali, aplikasi tidak tahu _descriptor_ mana yang siap. Aplikasi harus melakukan iterasi (looping) melalui seluruh _descriptor_ yang dimonitor dan memeriksa satu per satu menggunakan `FD_ISSET()`. Ini memiliki kompleksitas O(n).
> >     
> > 3. **Stateless:** Kernel tidak mengingat _descriptor_ mana yang sedang dimonitor. Seluruh set harus dibangun ulang dan dikirim pada setiap pemanggilan.
> >     
> >
> > ### Alternatif: `poll()`
> > 
> > `poll()` adalah alternatif yang sedikit lebih baik dari `select()`. Alih-alih menggunakan bitmask, `poll()` menggunakan sebuah array dari struct `pollfd`. Setiap elemen array ini berisi:
> > 
> > - `fd`: _File descriptor_ yang dimonitor.
> >     
> > - `events`: Jenis event yang ditunggu (misal: `POLLIN` untuk data masuk).
> >     
> > - `revents`: Diisi oleh kernel untuk memberitahu event apa yang terjadi.
> >     
> > 
> > `poll()` mengatasi beberapa masalah `select()` (seperti batasan jumlah _descriptor_), tetapi masih memiliki kelemahan utama yang sama: kompleksitas O(n) karena kernel masih harus memindai seluruh array.
> >
> > ### Event Handling Modern: `kqueue()` dan `epoll()`
> > 
> > Untuk mengatasi masalah skalabilitas `select()` dan `poll()`, sistem operasi modern menyediakan mekanisme yang jauh lebih efisien.
> > 
> >  #### `kqueue()` (BSD, macOS)
> >  
> >  `kqueue()` adalah sistem notifikasi event yang _stateful_. Kernel **mengingat** event apa saja yang diminati oleh aplikasi.
> > 
> >  - **`kqueue()`**: Membuat sebuah _kernel event queue_ baru.
> >     
> >  - **`kevent()`**: Satu fungsi serbaguna untuk **mendaftarkan** minat pada event baru, **mengubah** event yang ada, dan **menunggu** event terjadi.
> >      
> >  - EV_SET(): Macro untuk mempermudah inisialisasi struct kevent.
> >      
> >      Karena kernel sudah tahu apa yang dimonitor, saat aplikasi menunggu, kernel hanya akan mengembalikan daftar event yang benar-benar terjadi. Ini jauh lebih efisien.
> >      
> > 
> >  #### `epoll()` (Linux)
> >  
> >  `epoll()` adalah jawaban Linux untuk `kqueue()` dan bekerja dengan prinsip yang sama (stateful).
> >  
> >  - **`epoll_create()`**: Membuat sebuah _epoll instance_ di dalam kernel.
> >      
> >  - **`epoll_ctl()`**: Mengontrol _epoll instance_ tersebut, digunakan untuk **menambah** (`EPOLL_CTL_ADD`), **mengubah** (`EPOLL_CTL_MOD`), atau **menghapus** (`EPOLL_CTL_DEL`) _file descriptor_ dari daftar pantauan.
> >      
> >  - **`epoll_wait()`**: Menunggu (memblokir) hingga event terjadi pada salah satu _descriptor_ yang dipantau. Fungsi ini hanya akan mengembalikan _descriptor_ yang benar-benar siap.
> >      
> >  
> >  Keunggulan `kqueue()` dan `epoll()` adalah kompleksitasnya O(1). Waktu yang dibutuhkan untuk menunggu event tidak bergantung pada jumlah koneksi yang sedang dipantau.

> [!cornell] #### Summary
> 
> Mekanisme I/O Multiplexing berevolusi dari `select()` yang sederhana namun tidak efisien karena harus memindai semua koneksi setiap saat. Untuk mengatasi masalah skalabilitas ini, sistem operasi modern memperkenalkan `kqueue()` (di BSD/macOS) dan `epoll()` (di Linux). Keduanya adalah sistem notifikasi event yang stateful, di mana kernel mengingat koneksi mana yang sedang dipantau. Hal ini memungkinkan aplikasi untuk hanya menerima notifikasi tentang koneksi yang aktif, mengubah proses yang tadinya berkinerja O(n) menjadi O(1) dan menjadi fondasi bagi server berkinerja tinggi.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Edge-Triggered vs. Level-Triggered
> 
> `epoll` menawarkan dua mode notifikasi yang sangat penting:
> 
> - **Level-Triggered (Default):** `epoll_wait()` akan terus melaporkan bahwa sebuah _descriptor_ siap dibaca selama masih ada data yang belum dibaca di buffernya. Mirip dengan `select()`.
>     
> - **Edge-Triggered (`EPOLLET`):** `epoll_wait()` hanya akan melaporkan event **satu kali**, yaitu saat data pertama kali tiba. Aplikasi bertanggung jawab untuk membaca _seluruh_ data yang tersedia dari buffer hingga `read()` mengembalikan `EAGAIN`. Mode ini lebih rumit tetapi bisa memberikan performa lebih tinggi karena mengurangi jumlah panggilan sistem.
>     
> 
> #### Mengapa `kqueue` Dianggap Lebih Fleksibel?
> 
> Desain `kqueue` sering dianggap lebih elegan dan general. Selain memonitor I/O pada socket, `kevent` juga bisa digunakan untuk memonitor event lain secara seragam, seperti perubahan status file, sinyal, timer, atau status proses anak. `epoll` di sisi lain lebih fokus pada I/O jaringan.
> 
> #### Pustaka Abstraksi
> 
> Dalam praktiknya, programmer jarang berinteraksi langsung dengan `epoll` atau `kqueue`. Mereka menggunakan pustaka (library) abstraksi level tinggi yang menyediakan API tunggal dan akan otomatis memilih mekanisme terbaik yang tersedia di sistem operasi tersebut. Contoh populer:
> 
> - **libevent**: Salah satu yang tertua dan paling stabil.
>     
> - **libuv**: Digunakan sebagai pondasi oleh Node.js.
>     
> - **Boost.Asio**: Untuk pemrograman jaringan di C++.
>