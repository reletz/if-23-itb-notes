---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - 3 model komunikasi utama?
> >     
> > - Apa itu MOM?
> >     
> > - 2 Tipe MOM?
> >     
> > - Apa itu MOM Transient?
> >     
> > - Alur Socket (Server & Client)?
> >     
> > - Apa itu MOM Persistent?
> >     
> > - 4 skenario MOM Persistent?
> >     
> > - Apa itu Message Broker?
> >     
> > - 3 fungsi Message Broker?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 9-16 (11 - IF3130-11-Communication-2022.pdf)
> >     
> > - Kuliah Komunikasi
> >     
> 
> > ### 1. Tiga Model Komunikasi
> > 
> > Ada 3 model yang banyak digunakan untuk komunikasi:
> > 
> > 1. **Message-Oriented Communication (MOM)**
> >     
> > 2. **Remote Procedure Call (RPC)**
> >     
> > 3. **Stream-Oriented Communication**
> >     
> > 
> > ### 2. Message-Oriented Transient Communication (Socket)
> > 
> > Ini adalah model komunikasi berorientasi pesan yang paling sederhana, _transient_ (sementara), yang ditawarkan langsung oleh _transport layer_. Contoh paling umum adalah **Socket**.
> > 
> > **Alur Socket:**
> > 
> > ![[Pasted image 20251111153012.png]]
> > 
> > - **Server:**
> >     
> > 	
> > 	1. `socket()`: Membuat _endpoint_ komunikasi.
> > 	    
> > 	2. `bind()`: Mengaitkan _socket_ dengan alamat (IP & port).
> > 	    
> > 	3. `listen()`: Menandakan siap menerima koneksi.
> > 	    
> > 	4. `accept()`: **Blocking** (menunggu) sampai ada _client_ yang terhubung, lalu membuat _socket_ baru untuk koneksi itu.
> > 	    
> > 	
> > - **Client:**
> >     
> > 	
> > 	1. `socket()`: Membuat _endpoint_ komunikasi.
> > 	    
> > 	2. `connect()`: **Blocking** (mencoba terhubung) ke _socket_ server.
> > 	    
> > 
> > _Synchronization Point_ terjadi saat `connect()` dan `accept()` bertemu. Setelah itu, kedua sisi bisa berkomunikasi menggunakan `read()` dan `write()`.
> > 
> > Contoh implementasi level tinggi dari model ini adalah **MPI (Message Passing Interface)**, yang populer di _high-performance computing_.
> > 
> > ### 3. Message-Oriented Persistent Communication (MOM)
> > 
> > Model ini juga dikenal sebagai **Message Queuing System** atau **Message-Oriented Middleware (MOM)**. Ini adalah komunikasi _persistent_ (tetap ada) dan _asynchronous_.
> > 
> > **Ide Utama:** Aplikasi berkomunikasi dengan cara memasukkan pesan ke dalam **antrian (queues)** spesifik. _Middleware_ (Sistem Antrian) bertanggung jawab menyimpan pesan itu dan meneruskannya (mungkin melalui beberapa _communication server_ / _router_) sampai akhirnya terkirim ke _queue_ penerima.
> > 
> > **Arsitektur (Slide 14):**
> > 
> > ![[Pasted image 20251111153129.png]]
> > 
> > - **Sender A** memiliki `Send queue`. Ia menaruh pesan di sana.
> >     
> > - **Router (R1, R2)** adalah server _middleware_ yang memindahkan pesan antar _queue_.
> >     
> > - **Receiver B** memiliki `Receive queue`. _Router_ menaruh pesan di sini, dan aplikasi _Receiver B_ mengambilnya saat siap.
> >     
> > 
> > **Fleksibilitas:**
> > 
> > Model ini mengizinkan decoupling penuh dalam waktu. Keempat skenario ini valid:
> > 
> > ![[Pasted image 20251111153109.png]]
> > 
> > a. Sender running, Receiver running.
> > 
> > b. Sender running, Receiver passive (pesan akan menumpuk di queue receiver).
> > 
> > c. Sender passive, Receiver running (receiver bisa mengambil pesan yang dikirim tadi).
> > 
> > d. Sender passive, Receiver passive.
> > 
> > ### 4. Message Broker
> >  
> > Masalah dengan _message queuing_ dasar adalah ia mengasumsikan semua aplikasi "setuju" pada format pesan yang sama (struktur, representasi data).
> > 
> > **Message Broker** adalah komponen **terpusat** yang ditambahkan untuk menangani _heterogeneity_ (keberagaman) aplikasi.
> > 
> > ![[Pasted image 20251111155226.png]]
> > 
> > **Fungsi Message Broker:**
> > 
> > 1. **Transformasi Pesan:** Mengubah (konversi) format pesan. Misal: Aplikasi A kirim XML, _broker_ mengubahnya jadi JSON untuk Aplikasi B.
> >     
> > 2. **Application Gateway:** Bertindak sebagai gerbang masuk/keluar untuk aplikasi.
> >     
> > 3. **Subject-Based Routing:** Mengarahkan pesan berdasarkan _isi_ atau _topik_ pesan, bukan hanya tujuan akhir. (Contoh: _Event_ "NewOrder" bisa dikirim ke _queue_ _Inventory_ dan _queue_ _Notification_).
> >     

> [!cornell] #### Summary
> 
> **Model Message-Oriented (MOM) berfokus pada pengiriman pesan, baik secara **Transient** (lewat Socket) yang sinkronus, atau secara **Persistent** (lewat Message Queuing / MOM) yang asinkronus. Model** _**queuing**_ **sangat fleksibel karena pesan disimpan dan di-routing, memungkinkan sender/receiver tidak perlu aktif bersamaan. **Message Broker** adalah komponen tambahan yang menangani transformasi dan** _**routing**_ **pesan yang kompleks di lingkungan yang heterogen.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Socket vs. Message Queue
> 
> - **Socket (Transient):**
>     
> - _Analogi:_ Panggilan telepon.
>     
> - Anda harus tahu alamat (IP:Port) penerima.
>     
> - Keduanya harus "online" saat bersamaan.
>     
> - Jika penerima sibuk, Anda harus coba lagi.
>     
> - _Low-level_, cepat, _point-to-point_.
>     
> - **Message Queue (Persistent):**
>     
> - _Analogi:_ Kantor Pos (dengan kotak surat).
>     
> - Anda hanya perlu tahu alamat "Kantor Pos" (_broker_).
>     
> - Anda taruh surat (pesan) dan bisa langsung pergi (_async_).
>     
> - Penerima akan cek kotak suratnya (_queue_) saat dia siap.
>     
> - _High-level_, lebih lambat, _decoupled_, sangat _reliable_.
>     
> 
> #### Tools Populer
> 
> - **Message Queuing:** RabbitMQ, ActiveMQ, AWS SQS, Google Cloud Pub/Sub.
>     
> - **Message Broker (sering juga** _**streaming platform**_**):** Apache Kafka (sangat populer untuk _subject-based routing_ dan _streaming_).
>     
> 
> #### Eksplorasi Mandiri
> 
> - Cari tahu perbedaan antara model "Queue" (Point-to-Point, 1-to-1) dan "Topic" (Publish/Subscribe, 1-to-N) dalam sistem MOM. (Hint: Message Broker di Slide 15 lebih mirip Publish/Subscribe).
>