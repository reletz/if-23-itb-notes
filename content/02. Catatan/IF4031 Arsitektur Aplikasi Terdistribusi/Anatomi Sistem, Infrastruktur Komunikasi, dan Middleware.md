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
> > - Bagaimana anatomi sistem terdistribusi?
> >     
> > - Apa itu 'Service' dan 'Adapter'?
> >     
> > - Peran API dalam service?
> >     
> > - Beda komunikasi sinkron vs. asinkron?
> >     
> > - Apa fungsi Middleware?
> >     
> > - Apa itu RPC & Serialisasi?
> >     
> > - Beda pola 'Queue' vs 'Topic'?
> >     
> > - Fungsi 'Application Server'?
> >     
> >
> > ## Reference Points
> > 
> > - Slides IF4031 Hal 14-29
> >     
> 
> > ### Anatomi Sistem Terdistribusi
> > 
> > Sebuah sistem terdistribusi dapat dilihat dari tiga perspektif:
> > 
> > 1. **Fisik:** Kumpulan mesin/komputer yang terhubung melalui jaringan.
> >     
> > 2. **Run-time:** Sejumlah proses software yang berjalan di mesin-mesin tersebut dan berkomunikasi melalui mekanisme _Inter-Process Communication_ (IPC) seperti HTTP.
> >     
> > 3. **Implementasi:** Kumpulan komponen yang _loosely-coupled_ (tidak saling bergantung erat) yang disebut **services**. Services ini dapat di-_deploy_ dan di-_scale_ secara independen.
> >     
> >
> > ### Service, Interface, dan Adapter
> > 
> > - **Service:** Komponen utama yang mengimplementasikan kapabilitas tertentu dari sistem. Di dalamnya terdapat **business logic**. Setiap service yang berjalan disebut **instance**.
> >     
> > - **Interface:** Service menyediakan "pintu" untuk berkomunikasi dengan dunia luar. Ada dua jenis:
> >     
> >     - _Inbound Interface_: Pintu masuk agar service lain bisa memanggilnya (misal: API endpoint).
> >         
> >     - _Outbound Interface_: Pintu keluar saat service ini perlu memanggil service lain.
> >         
> > - **Adapter:** Komponen yang menerjemahkan komunikasi dari teknologi spesifik (misal: HTTP Controller, gRPC server, Kafka Consumer) menjadi panggilan yang dimengerti oleh _business logic_ melalui _interface_.
> >     
> >
> > ### API dan Pola Komunikasi
> > 
> > API (Application Programming Interface) adalah kontrak atau cara sebuah service menyediakan layanannya. Komunikasi antar service bisa terjadi secara:
> > 
> > - **Direct:** Klien mengirim _request_ langsung ke server dan menunggu _response_. Contoh: REST, gRPC.
> >     
> > - **Indirect:** Komunikasi dilakukan melalui perantara (_broker_) seperti message queue.
> >     
> > 
> > Saat klien mengirim request dan harus menunggu balasan sebelum melanjutkan (terblok), ini disebut **synchronous communication**. Ini seringkali tidak efisien karena memblokir sumber daya (thread) yang bisa digunakan untuk hal lain.
> >
> > ### Middleware dan Infrastruktur Komunikasi
> > 
> > **Middleware** adalah lapisan software yang bertindak sebagai "lem" atau perantara yang menghubungkan berbagai komponen software yang berbeda, bahkan yang berjalan di sistem yang berbeda. Tujuannya adalah menyembunyikan kompleksitas komunikasi jaringan.
> > 
> > Layanan umum yang disediakan Middleware:
> > 
> > - Lokasi transparan (komponen tidak perlu tahu lokasi fisik komponen lain).
> >     
> > - Komunikasi yang terstandarisasi.
> >     
> > - Independen dari platform dan jaringan.
> >     
> > - Menyediakan fitur reliabilitas, skalabilitas, dan ketersediaan.
> >     
> >
> > ### Contoh Teknologi Middleware
> > 
> > #### Stack Protocol (e.g., Socket)
> >  
> >  Menyediakan API level rendah untuk mengakses jaringan (TCP/IP). Memberikan kontrol penuh namun kompleks untuk digunakan.
> > 
> >  #### Remote Procedure Call (RPC) & Serialization
> >  
> >  Menyediakan abstraksi seolah-olah memanggil fungsi/method yang ada di mesin lain (remote). Framework RPC menyembunyikan detail komunikasi jaringan dan menangani **serialisasi** (mengubah data/objek menjadi format yang bisa dikirim lewat jaringan).
> > 
> >  #### Message-Oriented Middleware (Messaging)
> >  
> >  Komunikasi terjadi secara asinkron melalui pengiriman _message_ ke sebuah _channel_. Klien tidak berkomunikasi langsung.
> > 
> >  - **Point-to-Point (Queue):** Sebuah pesan dikirim ke antrian (_queue_) dan hanya akan diproses oleh **satu** penerima/konsumen.
> >      
> >  - **Publish-Subscribe (Topic):** Sebuah pesan dikirim ke sebuah topik dan akan diterima oleh **semua** _subscriber_ yang tertarik pada topik tersebut.
> >      
> > 
> >  #### Application Server
> >  
> >  Menyediakan sebuah lingkungan (runtime) untuk menjalankan aplikasi. Ia mengelola banyak hal kompleks seperti siklus hidup komponen, transaksi, dan persistensi data.
> > 
> >  #### Database Access
> >  
> >  Middleware yang menyediakan API untuk berinteraksi dengan database, seringkali dengan mengonversi model data (misal dari SQL ke model Objek).

> [!cornell] #### Summary
> 
> Anatomi sistem terdistribusi terdiri dari services independen yang berjalan sebagai proses di berbagai mesin. Services ini berkomunikasi melalui API menggunakan adapter, dan interaksi ini difasilitasi oleh middleware yang menyembunyikan kompleksitas jaringan. Middleware menyediakan berbagai model komunikasi, mulai dari pemanggilan fungsi langsung seperti RPC hingga pengiriman pesan asinkron melalui queue atau topic, yang masing-masing memiliki kegunaan spesifik dalam arsitektur.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Serialisasi di RPC
> 
> Serialisasi adalah proses krusial di RPC. Pilihan format serialisasi sangat mempengaruhi performa dan fleksibilitas.
> 
> - **JSON/XML:** Human-readable, mudah di-debug, namun cenderung boros tempat dan lebih lambat untuk di-parsing. Sangat umum untuk Web API.
>     
> - **Protocol Buffers (Protobuf) / Apache Avro:** Format binary. Sangat cepat dan efisien dalam ukuran data, namun tidak human-readable. Mendukung _schema evolution_, artinya Anda bisa mengubah struktur data tanpa merusak kompatibilitas dengan service lama. Pilihan utama untuk komunikasi antar microservices berperforma tinggi.
>     
> 
> #### Pendalaman Teknis: Kapan Menggunakan Queue vs. Topic?
> 
> - **Gunakan Queue (Point-to-Point)** ketika Anda ingin sebuah pekerjaan (misal: memproses video yang di-upload) dilakukan **tepat satu kali** oleh salah satu dari banyak worker yang tersedia. Ini memungkinkan Anda men-scaling jumlah worker untuk meningkatkan throughput pemrosesan. Contoh teknologi: RabbitMQ, Amazon SQS.
>     
> - **Gunakan Topic (Publish-Subscribe)** ketika sebuah kejadian (misal: "Pengguna baru telah mendaftar") perlu diketahui oleh **banyak service lain** untuk melakukan tindakan yang berbeda-beda. Service 'A' mungkin akan mengirim email selamat datang, Service 'B' akan meng-update data analitik, dan Service 'C' akan menyiapkan profil awal. Contoh teknologi: Apache Kafka, Google Cloud Pub/Sub.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku:** "Designing Data-Intensive Applications" oleh Martin Kleppmann—dianggap sebagai "kitab suci" untuk desain sistem terdistribusi modern.
>     
> - **Teknologi untuk Dicoba:**
>     
>     - **gRPC:** Pelajari cara mendefinisikan service dan message dengan `.proto` file.
>         
>     - **RabbitMQ:** Coba implementasikan sebuah worker queue sederhana.
>         
>     - **Apache Kafka:** Pahami konsep log terdistribusi dan bagaimana ini berbeda dari message broker tradisional.
>