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
> > - Apa dua paradigma desain server?
> >     
> > - Bagaimana model Thread bekerja?
> >     
> > - Bagaimana model Event bekerja?
> >     
> > - Perbandingan Performa?
> >     
> > - Perbandingan Alur Kontrol (Control Flow)?
> >     
> > - Perbandingan Sinkronisasi?
> >     
> > - Beda manajemen State?
> >     
> > - Beda Penjadwalan (Scheduling)?
> >     
> > - Apa itu "Stack Ripping"?
> >     
> > - Apa kelebihan utama setiap model?
> >     
> >
> > ## Reference Points
> > 
> > - Slides IF4031 Hal 36-44
> >     
> 
> > ### Paradigma Thread-based
> > 
> > Dalam model ini, setiap urutan kejadian yang terkait (misalnya, satu koneksi klien dari awal hingga akhir) ditangani oleh **satu thread**.
> > 
> > - **Alur Kerja:** Logika program ditulis secara sekuensial. Jika thread perlu menunggu operasi I/O, thread tersebut akan **diblokir** oleh sistem operasi.
> >     
> > - **State:** State untuk setiap koneksi (variabel lokal, alur eksekusi) disimpan secara otomatis di dalam _stack_ milik thread tersebut.
> >     
> > - **Skalabilitas:** Secara teori, skalabilitas dicapai dengan membuat satu thread untuk setiap koneksi.
> >     
> >
> > ### Paradigma Event-based
> > 
> > Dalam model ini, **satu event loop** (biasanya satu thread per inti CPU) menunggu dan menangani semua event dari semua koneksi.
> > 
> > - **Alur Kerja:** Ketika sebuah event terjadi (misal, data masuk), _event handler_ yang sesuai akan dieksekusi. Handler ini harus berjalan dengan cepat dan **tidak boleh blocking**.
> >     
> > - **State:** Karena hanya ada satu thread, state untuk setiap koneksi harus dikelola secara **eksplisit** oleh programmer, seringkali dalam struktur data global.
> >     
> > - **Skalabilitas:** Satu thread dapat menangani ribuan koneksi karena tidak pernah terblokir menunggu I/O.
> >     
> >
> > ### Perbandingan Head-to-Head
> > 
> >  #### Performa
> >  
> >  - **Thread:** Abstraksi lebih berat. _Context switching_ antar thread bisa sangat mahal jika jumlah thread sangat banyak.
> >      
> >  - **Event:** Lebih ringan dan lebih dekat ke cara kerja hardware (interrupts). Umumnya lebih efisien karena kompleksitas manajemen konkurensi dilimpahkan ke aplikasi.
> >      
> > 
> >  #### Alur Kontrol (Control Flow)
> >  
> >  - **Thread:** Sangat mudah untuk alur sekuensial (panggil fungsi, tunggu hasil, lanjut). Terlihat natural bagi programmer.
> >      
> >  - **Event:** Lebih sulit untuk alur sekuensial karena logika harus dipecah menjadi _callback_ atau _handler_. Namun, sangat fleksibel untuk alur yang kompleks.
> >      
> > 
> >  #### Sinkronisasi
> >  
> >  - **Thread:** Sangat sulit. Membutuhkan mekanisme seperti _locks_ atau _mutex_ untuk melindungi data bersama, yang rawan _deadlock_ dan _race condition_.
> >      
> >  - **Event:** "Gratis" pada sistem single-core. Karena hanya ada satu thread eksekusi, tidak ada akses data bersamaan, sehingga tidak perlu sinkronisasi. Pada multi-core, sinkronisasi tetap dibutuhkan antar event loop.
> >      
> > 
> >  #### Manajemen State
> >  
> >  - **Thread:** Otomatis. State disimpan di _stack_ thread. Programmer tidak perlu khawatir. Namun, ukuran _stack_ bisa boros memori.
> >      
> >  - **Event:** Manual. Programmer harus secara eksplisit menyimpan dan mengambil kembali state untuk setiap koneksi. Proses ini disebut **"Stack Ripping"**. Ini lebih hemat memori tetapi lebih rumit.
> >      
> > 
> >  #### Penjadwalan (Scheduling)
> >  
> >  - **Thread:** **Preemptive**. Sistem operasi dapat menghentikan thread kapan saja untuk menjalankan thread lain. Ini memberikan isolasi, tapi keputusan penjadwalan bisa jadi tidak optimal untuk aplikasi.
> >      
> >  - **Event:** **Cooperative**. Sebuah _event handler_ berjalan sampai selesai. Jika satu _handler_ berjalan terlalu lama, ia akan memblokir semua koneksi lain.
> >      

> [!cornell] #### Summary
> 
> Desain server terbagi menjadi dua paradigma utama: Thread-based dan Event-based. Model Thread menawarkan kemudahan pemrograman dengan alur sekuensial yang natural dan manajemen state otomatis via stack, namun dibayar dengan biaya performa dari context switching dan kompleksitas sinkronisasi. Sebaliknya, model Event menawarkan performa dan efisiensi sumber daya yang superior dengan menghilangkan overhead tersebut, namun menuntut programmer untuk mengelola state dan alur kontrol secara manual, yang membuat kode menjadi lebih kompleks.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: "Callback Hell"
> 
> Salah satu kritik terbesar terhadap pemrograman berbasis event adalah "Callback Hell" atau "Pyramid of Doom", di mana logika sekuensial yang sederhana berubah menjadi serangkaian _callback_ yang bersarang dalam, membuat kode sulit dibaca dan di-debug. Bahasa pemrograman modern telah mengatasi ini dengan fitur seperti **Promises** dan sintaks **async/await**, yang memungkinkan programmer menulis kode asinkron dengan gaya yang terlihat sinkron.
> 
> #### Model Hibrida: Yang Terbaik dari Dua Dunia
> 
> Kenyataannya, server paling canggih saat ini tidak murni menggunakan satu model saja. Mereka menggunakan **model hibrida**. Contohnya **Nginx**:
> 
> 1. Nginx memulai satu _master process_.
>     
> 2. Master process ini membuat beberapa _worker process_, biasanya satu per inti CPU, untuk memanfaatkan hardware multi-core (seperti model multi-proses).
>     
> 3. Setiap _worker process_ ini adalah **single-threaded** dan menjalankan **event loop** yang sangat efisien (menggunakan `epoll` atau `kqueue`) untuk menangani ribuan koneksi secara bersamaan.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **"Why Threads Are A Bad Idea (for most purposes)"**: Paper oleh John Ousterhout yang menjadi argumen klasik yang mendukung model event-based.
>     
> - **"Why Events Are A Bad Idea (for high-concurrency servers)"**: Paper tandingan yang menyoroti kelemahan model event, terutama dalam hal kompleksitas pemrograman.
>