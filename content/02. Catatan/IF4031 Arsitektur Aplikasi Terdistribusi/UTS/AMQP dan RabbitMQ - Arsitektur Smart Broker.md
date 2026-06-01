---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] AMQP dan RabbitMQ - Arsitektur Smart Broker
> 
> > ## Questions/Cues
> > 
> > - Apa itu AMQP?
> >     
> > - Apa model AMQP?
> >     
> > - Apa itu arsitektur **Smart Broker**?
> >     
> > - Apa peran **Exchange**?
> >     
> > - Apa peran **Queue**?
> >     
> > - Apa itu **Binding**?
> >     
> > - Apa saja jenis-jenis Exchange?
> >     
> > - Bagaimana cara kerja **Direct Exchange**?
> >     
> > - Bagaimana cara kerja **Fanout Exchange**?
> >     
> > - Bagaimana cara kerja **Topic Exchange**?
> >     
> > 
> > ## Reference Points
> > 
> > - 10-IF4031-07-2023-Message-Publish-Subscribe-2.pdf
> >     
> 
> > ### Advanced Message Queuing Protocol (AMQP)
> > 
> > AMQP adalah sebuah protokol _open standard_ di _application layer_ untuk sistem _messaging_. Tujuannya adalah untuk menstandardisasi komunikasi antara klien dan _message broker_, sehingga implementasi dari vendor yang berbeda dapat saling berinteraksi. RabbitMQ adalah salah satu implementasi _message broker_ AMQP yang paling populer.
> > 
> > ### Arsitektur Smart Broker, Dumb Client
> > 
> > RabbitMQ mengikuti filosofi "broker pintar, klien bodoh".
> > 
> > - **Smart Broker:** Semua logika perutean (_routing_) pesan yang kompleks berada di sisi broker (RabbitMQ). Broker bertanggung jawab penuh untuk menentukan ke mana sebuah pesan harus dikirim.
> >     
> > - **Dumb Client (Producer/Consumer):** Klien tidak perlu tahu ke mana pesan akan berakhir. _Producer_ hanya mempublikasikan pesan ke sebuah entitas bernama **Exchange**. _Consumer_ hanya mengambil pesan dari entitas bernama **Queue**.
> >     
> > 
> > ### Komponen Inti RabbitMQ
> > 
> > Alur pesan di RabbitMQ tidak langsung dari _producer_ ke _queue_.
> > 
> > 1. **Producer** mengirimkan pesan ke sebuah **Exchange**.
> >     
> > 2. **Exchange** menerima pesan tersebut dan, berdasarkan aturan tertentu, meneruskannya ke satu atau lebih **Queue**.
> >     
> > 3. **Queue** adalah tempat penyimpanan pesan sementara, menunggu untuk diambil.
> >     
> > 4. **Consumer** terhubung ke sebuah **Queue** dan menerima pesan darinya.
> >     
> > 
> > **Binding:** Ini adalah "aturan" yang menghubungkan sebuah _Exchange_ ke sebuah _Queue_. _Binding_ memberi tahu _Exchange_ pesan mana yang harus diteruskan ke _queue_ mana.
> > 
> > ### Jenis-jenis Exchange
> > 
> > Perilaku _routing_ ditentukan oleh tipe _Exchange_. Tiga tipe utama adalah:
> > 
> > **1. Direct Exchange**
> > 
> > - **Mekanisme:** Meneruskan pesan ke _queue_ yang _binding key_-nya **cocok persis** dengan _routing key_ pada pesan.
> >     
> > - **Kasus Penggunaan:** _Unicast_ atau _point-to-point_. Sangat cocok untuk mengarahkan tugas ke _worker queue_ tertentu.
> >     
> > 
> > **2. Fanout Exchange**
> > 
> > - **Mekanisme:** Meneruskan pesan ke **semua** _**queue**_ yang terikat padanya, tanpa mempedulikan _routing key_.
> >     
> > - **Kasus Penggunaan:** _Broadcast_ atau _publish-subscribe_ murni. Ideal untuk menyiarkan pembaruan _state_ atau notifikasi ke banyak penerima.
> >     
> > 
> > **3. Topic Exchange**
> > 
> > - **Mekanisme:** Meneruskan pesan ke _queue_ yang _binding key_-nya **cocok dengan pola (**_**pattern**_**)** dari _routing key_ pada pesan. Pola ini menggunakan _wildcard_:
> >     
> >     - `*` (bintang) cocok untuk tepat satu kata.
> >         
> >     - `#` (pagar) cocok untuk nol atau lebih kata.
> >         
> > - **Contoh:**
> >     
> >     - _Routing key_ pesan: `logs.europe.error`
> >         
> >     - _Binding key_ `logs.*.error` akan cocok.
> >         
> >     - _Binding key_ `logs.europe.#` akan cocok.
> >         
> >     - _Binding key_ `logs.asia.*` tidak akan cocok.
> >         
> > - **Kasus Penggunaan:** _Multicast_ atau _publish-subscribe_ berbasis konten. Sangat fleksibel untuk mengarahkan pesan ke _subscriber_ yang hanya tertarik pada sub-kategori tertentu.
> >     

> [!cornell] #### Summary
> 
> **RabbitMQ adalah implementasi Message Broker dari protokol AMQP yang mengadopsi arsitektur "Smart Broker", di mana semua logika perutean pesan yang kompleks berada di pusat. Pesan dari Producer dikirim ke sebuah Exchange, yang kemudian mendistribusikannya ke satu atau lebih Queue berdasarkan aturan Binding dan tipe Exchange (Direct untuk pencocokan pasti, Fanout untuk broadcast, dan Topic untuk pencocokan pola). Consumer kemudian mengambil pesan dari Queue, sepenuhnya terpisah dari logika perutean tersebut.**

> [!ad-libitum]- Additional Information
> 
> #### Channel dalam AMQP
> 
> Koneksi TCP/IP antara klien dan broker adalah "mahal" untuk dibuat. Untuk memungkinkan banyak komunikasi terisolasi melalui satu koneksi fisik, AMQP menggunakan konsep **Channel**. Bayangkan satu koneksi TCP sebagai pipa besar, dan _channel_ adalah banyak jalur kecil di dalam pipa tersebut. Setiap operasi (mempublikasikan pesan, mendeklarasikan _queue_) terjadi di dalam sebuah _channel_. Ini sangat efisien dan merupakan praktik terbaik untuk menggunakan satu koneksi per proses aplikasi dan membuka banyak _channel_ sesuai kebutuhan.
> 
> #### Durable vs. Transient
> 
> Untuk mencegah kehilangan data jika broker RabbitMQ di-restart, komponen-komponennya dapat dibuat persisten:
> 
> - **Durable Exchange/Queue:** Metadata tentang _exchange_ atau _queue_ tersebut akan bertahan setelah restart.
>     
> - Persistent Message: Isi pesan itu sendiri akan ditulis ke disk oleh broker.
>     
>     Untuk menjamin pesan tidak hilang, Anda harus mendeklarasikan queue sebagai durable DAN mempublikasikan pesan sebagai persistent. Ini memberikan jaminan at-least-once, tetapi dengan trade-off performa karena adanya operasi I/O disk.
>