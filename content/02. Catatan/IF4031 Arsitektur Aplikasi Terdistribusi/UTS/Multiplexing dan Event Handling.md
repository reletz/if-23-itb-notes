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
> > **Contoh `select()`**
> > ```c
> > #include <stdio.h>
> >#include <string.h>
> >#include <sys/select.h>
> >#include <sys/time.h>
> >#include <unistd.h>
> >
> >// Makro untuk menemukan nilai maksimum antara dua angka
> >#define max(a,b) ((a) > (b) ? (a) : (b))
> >
> >// Asumsikan MAXLINE dan sockfd sudah didefinisikan di tempat lain
> >#define MAXLINE 1024
> >
> >/*
> >    CATATAN: Kode ini adalah gabungan dari contoh-contoh yang ada di slide 21 & 23
> >    dari dokumen PDF untuk memberikan gambaran yang lebih lengkap.
> >    Ini adalah contoh ilustratif dan bukan program yang bisa langsung dijalankan.
> >*/
> >void handle_client_with_select(int sockfd, FILE *fp) {
> >    int maxfdp1;
> >    fd_set rset; // set deskriptor yang akan dibaca (read set)
> >    char sendline[MAXLINE], recvline[MAXLINE];
> >
> >    // 1. Inisialisasi set deskriptor
> >    FD_ZERO(&rset); // Mengosongkan set, semua bit di-set ke 0
> >
> >    for (;;) {
> >        // 2. Menambahkan file descriptor ke dalam set setiap kali loop
> >        // Ini harus dilakukan setiap kali karena select() memodifikasi set
> >        FD_SET(fileno(fp), &rset); // Menambahkan file pointer (stdin)
> >        FD_SET(sockfd, &rset);     // Menambahkan socket
> >
> >        // Menentukan deskriptor dengan nomor tertinggi + 1
> >        maxfdp1 = max(fileno(fp), sockfd) + 1;
> >
> >        // 3. Memanggil select() untuk menunggu event
> >        // Program akan berhenti (block) di sini sampai ada data yang siap
> >        select(maxfdp1, &rset, NULL, NULL, NULL);
> >
> >        // 4. Memeriksa deskriptor mana yang siap
> >        if (FD_ISSET(sockfd, &rset)) { /* socket siap untuk dibaca */
> >            printf("Socket is readable...\n");
> >            // Logika untuk membaca dari socket
> >            // if (Readline(sockfd, recvline, MAXLINE) == 0) {
> >            //     printf("Server terminated prematurely\n");
> >            //     break;
> >            // }
> >            // Fputs(recvline, stdout);
> >        }
> >
> >        if (FD_ISSET(fileno(fp), &rset)) { /* input dari stdin siap untuk dibaca */
> >            printf("Standard input is readable...\n");
> >            // Logika untuk membaca dari stdin dan mengirim ke socket
> >            // if (Fgets(sendline, MAXLINE, fp) == NULL) {
> >            //     return; /* semua selesai */
> >            // }
> >            // Writen(sockfd, sendline, strlen(sendline));
> >        }
> >    }
> >}
> >
> >/**
> > * --- Penjelasan Langkah-langkah Penggunaan `select` ---
> > * (Berdasarkan slide 19-24)
> > *
> > * 1.  **Inisialisasi Set (`FD_ZERO`)**:
> > * Sebelum digunakan, `fd_set` (sebuah set yang berisi file descriptor) harus diinisialisasi atau dibersihkan
> > * menggunakan `FD_ZERO(&rset)`.
> > *
> > * 2.  **Menambahkan Deskriptor (`FD_SET`)**:
> > * Setiap file descriptor (misalnya socket atau `stdin`) yang ingin dipantau harus ditambahkan ke dalam `fd_set`
> > * menggunakan `FD_SET(fd, &rset)`. Langkah ini **harus diulang setiap kali** sebelum memanggil `select()`,
> > * karena `select()` akan memodifikasi `fd_set` untuk menandai deskriptor mana yang siap.
> > *
> > * 3.  **Memanggil `select()`**:
> > * Panggil fungsi `select()` dengan memberikan set deskriptor yang ingin dipantau (untuk dibaca, ditulis, atau error).
> > * Proses akan berhenti (blocking) sampai salah satu deskriptor menjadi siap atau timeout tercapai.
> > *
> > * 4.  **Memeriksa Deskriptor (`FD_ISSET`)**:
> > * Setelah `select()` kembali, kita harus memeriksa setiap deskriptor dalam set secara manual menggunakan `FD_ISSET(fd, &rset)`
> > * untuk mengetahui deskriptor mana yang menyebabkan `select()` berhenti.
> > *
> > * 5.  **Melakukan Operasi I/O**:
> > * Jika `FD_ISSET` mengembalikan nilai true, artinya deskriptor tersebut siap untuk operasi I/O (misalnya membaca data dari socket
> > * tanpa harus menunggu).
> > *
> > * 6.  **Mengulang Loop**:
> > * Seluruh proses (langkah 2 hingga 5) diulang dalam sebuah loop untuk terus memantau koneksi.
> > */
> >
> > ```
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
> >  - `EV_SET()`: Macro untuk mempermudah inisialisasi struct kevent.
> >      
> >      Karena kernel sudah tahu apa yang dimonitor, saat aplikasi menunggu, kernel hanya akan mengembalikan daftar event yang benar-benar terjadi. Ini jauh lebih efisien.
> >  
> >  **Contoh `kqueue()` dan `kevent()`:**
> >  ```c
> >
> >#include <sys/types.h>
> >#include <sys/event.h>
> >#include <sys/time.h>
> >#include <stdio.h>
> >#include <stdlib.h>
> >#include <string.h>
> >#include <unistd.h>
> >
> >// Asumsikan fungsi diep, tcpopen, dan sendbuftosck sudah ada
> >void diep(const char *s) { perror(s); exit(EXIT_FAILURE); }
> >#define BUFSIZE 1024
> >
> >/*
> >    CATATAN: Kode ini diambil dari contoh lengkap di slide 33 & 34
> >    dari dokumen PDF.
> >*/
> >int main(int argc, char *argv[]) {
> >    // chlist: daftar event yang ingin kita pantau
> >    // evlist: daftar event yang terpicu dan dikembalikan oleh kevent()
> >    struct kevent chlist[2];
> >    struct kevent evlist[2];
> >    char buf[BUFSIZE];
> >    int sckfd, kq, nev, i;
> >
> >    // // Logika untuk membuka koneksi TCP, di-komen karena tcpopen tidak didefinisikan
> >    // if (argc != 3) {
> >    //     fprintf(stderr, "usage: %s host port\n", argv[0]);
> >    //     exit(EXIT_FAILURE);
> >    // }
> >    // sckfd = tcpopen(argv[1], atoi(argv[2]));
> >
> >    // 1. Membuat kernel event queue baru
> >    if ((kq = kqueue()) == -1) {
> >        diep("kqueue()");
> >    }
> >
> >    // 2. Menginisialisasi struktur kevent untuk mendefinisikan event yang akan dipantau
> >    // EV_SET adalah sebuah makro untuk mengisi struktur kevent dengan mudah.
> >    // Memantau event 'read' pada socket (sckfd)
> >    EV_SET(&chlist[0], sckfd, EVFILT_READ, EV_ADD | EV_ENABLE, 0, 0, 0);
> >    // Memantau event 'read' pada standard input (stdin)
> >    EV_SET(&chlist[1], fileno(stdin), EVFILT_READ, EV_ADD | EV_ENABLE, 0, 0, 0);
> >
> >    printf("Monitoring events...\n");
> >
> >    // Loop utama untuk memproses event
> >    for (;;) {
> >        // 3. Memanggil kevent() untuk menunggu event
> >        // Program akan berhenti (block) di sini sampai ada event yang terpicu.
> >        // `chlist` adalah daftar perubahan yang kita daftarkan, `evlist` akan diisi dengan event yang terjadi.
> >        nev = kevent(kq, chlist, 2, evlist, 2, NULL);
> >
> >        if (nev < 0) {
> >            diep("kevent()");
> >        } else if (nev > 0) {
> >            // 4. Iterasi melalui semua event yang terpicu
> >            for (i = 0; i < nev; i++) {
> >                if (evlist[i].flags & EV_ERROR) {
> >                    fprintf(stderr, "EV_ERROR: %s\n", strerror(evlist[i].data));
> >                    exit(EXIT_FAILURE);
> >                }
> >
> >                // 5. Memproses event berdasarkan identitasnya
> >                if (evlist[i].ident == sckfd) {
> >                    /* Ada data dari host/socket */
> >                    memset(buf, 0, BUFSIZE);
> >                    if (read(sckfd, buf, BUFSIZE) < 0) diep("read()");
> >                    fputs(buf, stdout);
> >                } else if (evlist[i].ident == fileno(stdin)) {
> >                    /* Ada data dari stdin */
> >                    memset(buf, 0, BUFSIZE);
> >                    fgets(buf, BUFSIZE, stdin);
> >                    // sendbuftosck(sckfd, buf, strlen(buf));
> >                }
> >            }
> >        }
> >    }
> >    return 0;
> >}
> >
> >/**
> > * --- Penjelasan Langkah-langkah Penggunaan `kqueue` ---
> > * (Berdasarkan slide 26-34)
> > *
> > * 1.  **Membuat Queue (`kqueue()`)**:
> > * Buat sebuah *kernel event queue* baru dengan memanggil `kqueue()`. Fungsi ini mengembalikan sebuah
> > * file descriptor yang merepresentasikan queue tersebut.
> > *
> > * 2.  **Mendaftarkan Event (`EV_SET` dan `kevent()`)**:
> > * Gunakan makro `EV_SET` untuk mengisi struktur `struct kevent`. Struktur ini mendefinisikan event apa yang
> > * ingin Anda pantau (`filter`, misal `EVFILT_READ`), pada deskriptor mana (`ident`, misal `sckfd`), dan
> > * aksi apa yang ingin dilakukan (`flags`, misal `EV_ADD` untuk menambahkan event).
> > * Perubahan ini didaftarkan ke kernel saat `kevent()` dipanggil.
> > *
> > * 3.  **Menunggu Event (`kevent()`)**:
> > * Panggil `kevent()` di dalam sebuah loop. Fungsi ini akan berhenti (blocking) hingga salah satu event yang
> > * terdaftar terjadi. `kevent()` akan mengisi `evlist` dengan daftar event yang telah terpicu.
> > *
> > * 4.  **Iterasi Event yang Terpicu**:
> > * Setelah `kevent()` kembali, `nev` akan berisi jumlah event yang terjadi. Lakukan iterasi dari 0 hingga `nev-1`
> > * pada `evlist` untuk memproses setiap event.
> > *
> > * 5.  **Memproses Event**:
> > * Periksa `ident` dari setiap event di dalam `evlist` untuk mengetahui sumbernya (misalnya, apakah dari socket
> > * atau dari `stdin`). Kemudian, lakukan operasi I/O yang sesuai.
> > */
> >  ```
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