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
> > - Beda Level-triggered & Edge-triggered?
> >     
> > - Bagaimana arsitektur server Apache?
> >     
> > - Apa itu MPM di Apache?
> >     
> > - Bagaimana arsitektur server Nginx?
> >     
> > - Apa peran Master dan Worker di Nginx?
> >     
> > - Kenapa Nginx sangat cepat?
> >     
> >
> > ## Reference Points
> > 
> > - Slides IF4031 Hal 45-49
> >     
> 
> > ### Level-triggered vs. Edge-triggered
> > 
> > Ini adalah dua mode notifikasi dalam sistem event seperti `epoll`. Misalkan ada 100 byte data tiba di socket, dan aplikasi hanya membaca 10 byte.
> > 
> > - **Level-triggered (dipicu oleh level/status):** Sistem akan terus-menerus memberitahu aplikasi bahwa socket "siap dibaca" selama masih ada data yang tersisa (90 byte) di buffer. Ini lebih aman dan mudah ditangani.
> >     
> > - **Edge-triggered (dipicu oleh perubahan):** Sistem hanya akan memberitahu aplikasi **satu kali**, yaitu saat data pertama kali tiba. Aplikasi bertanggung jawab untuk membaca _semua_ data yang tersedia sampai habis. Jika tidak, aplikasi tidak akan diberitahu lagi tentang sisa data tersebut. Mode ini lebih efisien karena mengurangi jumlah notifikasi, tetapi lebih sulit diimplementasikan dengan benar.
> >     
> >
> > ### Contoh Desain Server: Apache HTTP Server
> > 
> > Apache adalah server web veteran dengan arsitektur yang sangat modular. Model konkurensinya tidak tunggal, melainkan dapat dikonfigurasi melalui **MPM (Multi-Processing Modules)**.
> > 
> >  #### MPM di Apache
> >  
> >  - **`mpm_prefork`**: Model klasik. Apache membuat beberapa proses anak di awal. Setiap proses anak bersifat _single-threaded_ dan menangani satu koneksi pada satu waktu. Sangat stabil dan aman (isolasi proses), tetapi memakan banyak memori.
> >      
> >  - **`mpm_worker`**: Model hibrida. Apache membuat beberapa proses anak, dan setiap proses anak memiliki _thread pool_ (beberapa thread). Setiap thread dapat menangani satu koneksi. Ini lebih hemat memori daripada `prefork`.
> >      
> >  - **`mpm_event`**: Mirip dengan `worker`, tetapi dioptimalkan untuk menangani koneksi _keep-alive_. Ada satu thread khusus yang mendengarkan semua koneksi. Koneksi yang aktif akan diserahkan ke thread pekerja, sementara koneksi yang idle (menunggu request berikutnya) tidak mengikat satu thread penuh.
> >      
> >
> > ### Contoh Desain Server: Nginx
> > 
> > Nginx dirancang dari awal untuk mengatasi C10K Problem, sehingga arsitektur dasarnya adalah **event-based, asynchronous, dan non-blocking**.
> > 
> >  #
> >  ### Arsitektur Nginx
> >  
> >  1. **Master Process:** Bertugas untuk membaca konfigurasi, membuka port, dan menjalankan serta mengelola beberapa _Worker Process_.
> >      
> >  2. **Worker Processes:** Biasanya ada satu _worker_ per inti CPU. Setiap _worker_ bersifat _single-threaded_ dan menjalankan _event loop_ (`epoll` atau `kqueue`). Satu _worker process_ ini mampu menangani ribuan koneksi secara bersamaan karena tidak pernah ada operasi yang memblokir.
> >      
> >  3. **Non-blocking I/O:** Semua operasi I/O (membaca dari jaringan, menulis ke disk, berkomunikasi dengan backend) dilakukan secara non-blocking. Worker tidak menunggu operasi selesai, melainkan mendaftarkan minat pada event dan melanjutkan memproses event lain.
> >     

> [!cornell] #### Summary
> 
> Arsitektur server di dunia nyata mengaplikasikan paradigma thread dan event secara berbeda. Apache menggunakan pendekatan modular dengan MPM, yang memungkinkannya beradaptasi dari model multi-proses (prefork) ke model hibrida multi-thread (worker/event) untuk efisiensi yang lebih baik. Sebaliknya, Nginx dibangun sepenuhnya di atas fondasi arsitektur event-driven yang non-blocking, dengan satu master process yang mengelola beberapa worker process single-threaded, di mana setiap worker mampu menangani ribuan koneksi secara bersamaan, memberikannya keunggulan signifikan dalam menangani beban konkurensi tinggi.

> [!ad-libitum]- Additional Information
> 
> #### Kapan Menggunakan Apache vs. Nginx?
> 
> - **Apache:** Fleksibilitasnya sangat tinggi. Dengan modul seperti `.htaccess` yang memungkinkan konfigurasi per-direktori, Apache seringkali lebih mudah digunakan dalam lingkungan _shared hosting_. MPM Event membuatnya jauh lebih kompetitif dalam hal performa.
>     
> - **Nginx:** Keunggulannya yang tak tertandingi dalam menangani koneksi statis dan konkurensi tinggi membuatnya menjadi pilihan utama untuk server file statis, _load balancer_, dan _reverse proxy_. Banyak arsitektur modern menempatkan Nginx di depan (sebagai _reverse proxy_) untuk menangani semua traffic masuk, yang kemudian meneruskan request dinamis ke server aplikasi seperti Apache atau Gunicorn.
>     
> 
> #### Event Handling Libraries
> 
> Seperti yang disebutkan di slide, programmer jarang berinteraksi langsung dengan `epoll` atau `kqueue`. Mereka menggunakan pustaka abstraksi yang menangani detail tingkat rendah ini, seperti:
> 
> - **libevent:** Pustaka event-notification yang matang dan portabel.
>     
> - **libev:** Alternatif yang lebih minimalis dan berkinerja tinggi untuk libevent.
>     
> - **libuv:** Pustaka yang mendukung I/O asinkron, dikembangkan untuk dan digunakan oleh Node.js.
>