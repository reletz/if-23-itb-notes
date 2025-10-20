---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell]  Dasar-dasar Library Pemrograman Asynchronous (libevent, libev, libuv)
> 
> > ## Questions/Cues
> > 
> > - Masalah Threading?
> >     
> > - Konsumsi Memori?
> >     
> > - Apa itu Asyncio?
> >     
> > - Sintaks `async/await`?
> >     
> > - Struktur dasar `asyncio`?
> >     
> > - Cara menjalankan program?
> >     
> > - Apa itu Coroutine?
> >     
> > - Bagaimana Coroutine dieksekusi?
> >     
> > - Menangani Blocking Code?
> >     
> > - Peran Executor?
> >     
> > - `run_in_executor`?
> >     
> > 
> > ## Reference Points
> > 
> > - IF4031-04-2022-Async-Library.pdf
> >     
> 
> > ### Motivasi Pemrograman Asynchronous
> > 
> > Pemrograman asinkron adalah sebuah paradigma yang sangat efisien, terutama untuk aplikasi yang bersifat **I/O bound**. Aplikasi I/O bound adalah program yang sebagian besar waktunya dihabiskan untuk menunggu operasi Input/Output selesai, seperti menunggu respons dari jaringan, membaca file dari disk, atau mengakses database. Daripada membuat sebuah thread 'menganggur' saat menunggu, model asinkron memungkinkan program untuk melakukan tugas lain.
> > 
> > #### Efisiensi Penggunaan Resource
> > 
> > Model asinkron menawarkan beberapa keuntungan efisiensi dibandingkan model multithreading tradisional:
> > 
> > 1. **Tidak Perlu Alokasi Stack per Thread**: Setiap thread biasanya membutuhkan alokasi memori sendiri untuk _stack_. Dengan model asinkron yang seringkali berjalan pada satu thread utama, kita dapat menangani ribuan koneksi tanpa perlu membuat ribuan thread, sehingga menghemat memori secara signifikan.
> >     
> > 2. **Menghindari Context Switching**: Dalam multithreading, sistem operasi perlu sering beralih konteks (menyimpan state CPU satu thread dan memuat state thread lain). Proses ini memakan waktu dan sumber daya. Model asinkron berbasis _event loop_ meminimalkan _context switching_ ini.
> >     
> > 3. **Mengurangi Race Condition**: Karena banyak operasi terjadi secara sekuensial dalam satu thread yang dikelola oleh _event loop_, ini secara inheren menghindari masalah _race condition_ yang sering terjadi saat banyak thread mencoba mengakses memori yang sama secara bersamaan.
> >     
> > 
> > #### Miskonsepsi Umum
> > 
> > - **Asynchronous tidak selalu lebih cepat**: Tujuan utamanya adalah efisiensi dan skalabilitas (kemampuan menangani banyak koneksi), bukan kecepatan eksekusi tunggal. Untuk tugas CPU-bound (yang banyak melakukan kalkulasi), multithreading atau multiprocessing mungkin lebih cocok.
> >     
> > - **Asynchronous tidak menghilangkan kebutuhan akan thread**: Beberapa library asinkron, seperti `libuv`, menggunakan _thread pool_ di belakang layar untuk menangani operasi yang sifatnya _blocking_ (misalnya, beberapa jenis file I/O) agar tidak mengganggu _event loop_ utama.
> >     
> > 
> > ### Arsitektur Library Asynchronous
> > 
> > Inti dari arsitektur ini adalah mengubah model _blocking request_ (menunggu sampai selesai) menjadi model berbasis **event loop dan handler**.
> > 
> > - **Event Loop**: Bayangkan sebagai sebuah siklus tak berujung yang terus-menerus memeriksa: "Apakah ada event yang terjadi?" (misalnya, data masuk di soket jaringan, timer selesai).
> >     
> > - **Handler (Callback)**: Sebuah fungsi yang akan dipanggil oleh _event loop_ ketika event yang sesuai terdeteksi. Aturan terpenting adalah **handler tidak boleh melakukan operasi blocking** dan harus selesai secepat mungkin agar tidak menahan seluruh _event loop_.
> >     
> > 
> > Saat mempelajari sebuah library asinkron, kita perlu memahami:
> > 
> > 1. Cara membuat, menjalankan, dan menghentikan **event loop**.
> >     
> > 2. Cara mendefinisikan dan mendaftarkan **event beserta handler-nya** ke dalam event loop.
> >     
> > 3. Cara menangani **blocking request** yang tidak bisa dihindari.
> >     
> > 
> > ### Library Asynchronous Fundamental
> > 
> > Terdapat beberapa library tingkat rendah (umumnya ditulis dalam C) yang menjadi fondasi bagi banyak aplikasi modern:
> > 
> > - **libevent**: Salah satu library event-notification yang paling awal dan populer. Ia menyediakan mekanisme untuk memanggil _callback_ ketika sebuah event terjadi pada file descriptor. Mendukung berbagai mekanisme OS seperti `epoll` (Linux) dan `kqueue` (BSD/macOS).
> >     
> > - **libev**: Dikembangkan sebagai alternatif yang lebih bersih dan berkinerja tinggi dari `libevent`, dengan memperbaiki beberapa batasan dan bug yang ada.
> >     
> > - **libuv**: Awalnya dikembangkan untuk **Node.js**. Ini adalah library multi-platform yang memberikan abstraksi di atas `libev` (untuk Linux/macOS) dan **IOCP** (I/O Completion Ports, mekanisme asinkron di Windows), sehingga menyediakan API yang konsisten di berbagai sistem operasi.
> >     
> > 
> > ### Anatomi `libev`: Watcher
> > 
> > Di `libev`, minat kita terhadap suatu event diekspresikan melalui sebuah struktur data yang disebut **Watcher**.
> > 
> > - **Watcher**: Sebuah struct yang kita alokasikan dan konfigurasikan untuk "mengawasi" jenis event tertentu (misalnya, I/O, timer, sinyal sistem).
> >     
> > - **Fungsi Dasar**:
> >     
> > 
> > 1. `ev_init(watcher, callback)`: Menginisialisasi watcher dengan fungsi callback yang a38383838383838383838383838kan dijalankan.
> >     
> > 2. `ev_TYPE_set(...)`: Mengatur detail spesifik watcher (misalnya, `ev_io_set` untuk mengatur file descriptor dan jenis event I/O).
> >     
> > 3. `ev_TYPE_start(loop, watcher)`: Mendaftarkan dan mengaktifkan watcher pada event loop.
> >     
> > 4. `ev_TYPE_stop(loop, watcher)`: Menghentikan dan membatalkan pendaftaran watcher.
> >     
> > 
> > **Jenis-jenis Watcher** yang umum di `libev` antara lain `ev_io` (untuk I/O), `ev_timer` (timer satu kali), `ev_periodic` (timer berulang), dan `ev_signal` (untuk sinyal OS seperti SIGINT).
> > 
> > ### Arsitektur `libuv`
> > 
> > `libuv` menyediakan arsitektur komprehensif untuk I/O asinkron.
> > 
> > - **Lapisan Abstraksi**: Ia menyembunyikan detail implementasi spesifik OS. Di Linux, ia menggunakan mekanisme seperti `epoll`, sementara di Windows ia menggunakan `IOCP`. Semua ini diabstraksikan melalui API `uv_io_t`.
> >     
> > - **Penanganan Operasi**: `libuv` tidak hanya menangani Network I/O (TCP, UDP) tetapi juga operasi lain seperti File I/O, operasi DNS, dan kode pengguna kustom.
> >     
> > - **Thread Pool**: Untuk operasi yang secara inheren bersifat _blocking_ (seperti beberapa akses file), `libuv` menggunakan **Thread Pool** internal untuk menjalankannya tanpa memblokir event loop utama. Ketika operasi di thread pool selesai, hasilnya dikirim kembali sebagai event ke event loop.
> >     
> > 
> > #### Siklus Iterasi Event Loop `libuv`
> > 
> > Setiap putaran (tick) dari event loop `libuv` mengikuti urutan fase yang terdefinisi dengan baik:
> > 
> > 1. **Update Loop Time**: Loop memperbarui waktu internalnya untuk meng-cache waktu saat ini.
> >     
> > 2. **Run Due Timers**: Menjalankan semua callback dari timer yang waktunya telah tiba.
> >     
> > 3. **Call Pending Callbacks**: Menjalankan callback I/O yang ditunda dari iterasi sebelumnya.
> >     
> > 4. **Run Prepare & Idle Handles**: Menjalankan handle `prepare` dan `idle` sebelum melakukan polling I/O.
> >     
> > 5. **Poll for I/O**: Ini adalah fase _blocking_ (dengan timeout) di mana loop menunggu event I/O dari sistem operasi (misalnya, data tiba di soket).
> >     
> > 6. **Run Check Handles**: Handle `check` dieksekusi segera setelah polling I/O.
> >     
> > 7. Call Close Callbacks: Menjalankan callback pembersihan, misalnya saat sebuah handle ditutup.
> >     
> >     Loop akan terus berjalan selama masih ada handle yang aktif (loop is alive).
> >     

> [!cornell] Summary
> 
> Pemrograman asinkron adalah paradigma efisiensi untuk menangani tugas I/O-bound dengan menggunakan model event loop dan handler non-blocking, yang secara signifikan mengurangi overhead memori dan context-switching dibandingkan multithreading. Library fundamental seperti libev dan libuv menyediakan mekanisme dasar ini, di mana libev menggunakan "watcher" untuk mendaftarkan minat pada event, dan libuv memberikan abstraksi cross-platform yang kuat dengan siklus event loop terstruktur dan thread pool untuk menangani operasi blocking tanpa mengganggu loop utama.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Mekanisme Polling Sistem Operasi
> 
> Slide menyebutkan `epoll`, `kqueue`, `select`, dan `poll`. Ini adalah panggilan sistem (_system calls_) yang digunakan oleh _event loop_ untuk secara efisien memantau banyak _file descriptor_ (seperti soket jaringan atau file) sekaligus.
> 
> - **`select` dan `poll`**: Mekanisme yang lebih tua. Setiap kali dipanggil, mereka harus memeriksa seluruh daftar _file descriptor_ untuk melihat mana yang siap, yang menjadi tidak efisien jika daftarnya sangat besar (kompleksitas O(n)).
>     
> - **`epoll` (Linux)**: Mekanisme modern yang jauh lebih efisien. Alih-alih memeriksa seluruh daftar, kernel akan memberitahu program _file descriptor_ mana saja yang siap. Ini membuatnya sangat skalabel untuk menangani puluhan ribu koneksi (kompleksitas O(1)).
>     
> - kqueue (BSD/macOS): Mirip dengan epoll dalam hal efisiensi dan fungsionalitas, tetapi dengan API yang sedikit berbeda.
>     
>     libuv dan libev secara cerdas memilih mekanisme terbaik yang tersedia di sistem operasi tempat mereka berjalan.
>     
> 
> #### Pendalaman: IOCP (I/O Completion Ports) di Windows
> 
> Berbeda dengan model _readiness notification_ (`epoll`/`kqueue`) di mana OS memberitahu kita "soket ini siap untuk dibaca", IOCP di Windows menggunakan model _completion notification_.
> 
> 1. Anda memulai operasi I/O (misalnya, "baca data dari soket ini").
>     
> 2. Anda tidak perlu menunggu. OS akan mengambil alih dan melakukan operasi I/O di latar belakang.
>     
> 3. Ketika operasi tersebut **selesai**, OS akan menempatkan notifikasi penyelesaian di sebuah antrian (Completion Port).
>     
> 4. Event loop (atau thread worker) hanya perlu memeriksa antrian ini untuk memproses hasil operasi yang telah selesai.
>     
>     Model ini dianggap sangat efisien dan skalabel di lingkungan Windows. libuv berhasil mengabstraksikan kedua model yang sangat berbeda ini ke dalam satu API yang konsisten.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba cari dan kompilasi contoh program `libev` yang ada di slide (halaman 10-12) pada lingkungan Linux. Amati bagaimana program merespons input dari `stdin` dan `timer` secara bersamaan tanpa menggunakan thread eksplisit.
>     
> - Baca bagian "Design Overview" dari dokumentasi resmi `libuv` untuk memahami filosofi di balik desainnya.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **libevent**: [https://libevent.org/](https://libevent.org/ "null")
>     
> - **libev**: [http://software.schmorp.de/pkg/libev.html](http://software.schmorp.de/pkg/libev.html "null")
>     
> - **libuv**: [https://github.com/libuv/libuv](https://github.com/libuv/libuv "null")
>     
> - **Buku (libevent)**: [http://www.wangafu.net/~nickm/libevent-book/](http://www.wangafu.net/~nickm/libevent-book/ "null")
>