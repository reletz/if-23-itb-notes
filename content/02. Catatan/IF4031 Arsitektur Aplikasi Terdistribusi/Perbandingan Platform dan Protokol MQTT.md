---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Perbandingan Platform dan Protokol MQTT
> 
> > ## Questions/Cues
> > 
> > - Apa perbedaan utama RabbitMQ vs Kafka?
> >     
> > - Kapan menggunakan RabbitMQ?
> >     
> > - Kapan menggunakan Kafka?
> >     
> > - Apa itu MQTT?
> >     
> > - Apa fitur utama MQTT?
> >     
> > - Apa itu **QoS** di MQTT?
> >     
> > - Apa fungsi flag **RETAIN**?
> >     
> > - Apa itu **Last Will and Testament**?
> >     
> > 
> > ## Reference Points
> > 
> > - 10b-IF4031-07b-2024-Message-Publish-Subscribe-Perbandingan.pdf
> >     
> 
> > ### Perbandingan: RabbitMQ vs Apache Kafka
> > 
> > |**Fitur**|**RabbitMQ**|**Apache Kafka**|
> > |---|---|---|
> > |**Arsitektur**|**Smart Broker, Dumb Client**|**Dumb Broker, Smart Client**|
> > |**Model**|Message Broker Tradisional|Distributed Streaming Platform (Log)|
> > |**Routing**|Sangat fleksibel & kompleks (Direct, Fanout, Topic, Headers Exchange)|Sederhana, berbasis Topic dan Partisi|
> > |**Retensi Pesan**|Pesan dihapus setelah di-consume & di-ack|Pesan disimpan berdasarkan periode waktu/ukuran (dapat di-replay)|
> > |**Urutan Pesan**|Terjamin per _queue_ (FIFO)|Terjamin hanya per **partisi**|
> > |**Throughput**|Sedang hingga Tinggi|Sangat Tinggi|
> > 
> > **Kapan menggunakan RabbitMQ?**
> > 
> > - Untuk kebutuhan _messaging_ aplikasi secara umum.
> >     
> > - Ketika Anda memerlukan logika perutean pesan yang kompleks.
> >     
> > - Untuk _background jobs_ atau komunikasi antar microservice dengan pola _request/reply_.
> >     
> > - Ketika urutan pesan global atau prioritas pesan penting.
> >     
> > 
> > **Kapan menggunakan Kafka?**
> > 
> > - Untuk _pipeline_ data bervolume sangat besar (_big data_).
> >     
> > - _Real-time streaming_ dan pemrosesan event.
> >     
> > - Pelacakan aktivitas pengguna, agregasi log, atau _event sourcing_.
> >     
> > - Ketika kemampuan untuk memutar ulang (_replay_) pesan historis adalah sebuah kebutuhan.
> >     
> > 
> > ### MQTT: Protokol untuk IoT
> > 
> > **MQ Telemetry Transport (MQTT)** adalah protokol _publish-subscribe_ yang sangat **ringan** dan efisien. Didesain secara spesifik untuk:
> > 
> > - Perangkat dengan sumber daya terbatas (CPU, memori rendah).
> >     
> > - Jaringan dengan _bandwidth_ rendah dan latensi tinggi (tidak andal).
> >     
> > 
> > ### Fitur Unik MQTT
> > 
> > 1. **Quality of Service (QoS)**: MQTT mendefinisikan tiga level garansi pengiriman, memberikan fleksibilitas antara keandalan dan overhead jaringan:
> > 
> > 	- **QoS 0 (At most once):** "Fire and forget". Pengiriman tercepat, tapi pesan bisa hilang.
> > 	    
> > 	- **QoS 1 (At least once):** Menjamin pesan sampai, tapi bisa ada duplikat. Memerlukan _ack_.
> > 	    
> > 	- **QoS 2 (Exactly once):** Menjamin pesan sampai tepat satu kali. Paling andal, tapi paling lambat karena memerlukan jabat tangan (_handshake_) 4 langkah.
> >     
> > 
> > 2. **Retain Flag**: Jika sebuah pesan dipublikasikan dengan flag RETAIN aktif, broker akan menyimpan pesan tersebut sebagai "nilai terakhir yang diketahui" untuk topic itu. Ketika ada subscriber baru yang berlangganan ke topic tersebut, broker akan langsung mengirimkan pesan yang tersimpan itu tanpa menunggu publisher baru. Sangat berguna untuk menyiarkan state atau status terakhir dari sebuah sensor.
> > 
> > 3. **Last Will and Testament (LWT)**: Saat sebuah klien terhubung ke broker, ia dapat mendaftarkan sebuah pesan "wasiat" (LWT). Jika klien tersebut terputus secara tidak normal (misalnya, kehabisan baterai atau kehilangan sinyal) tanpa mengirim pesan DISCONNECT, broker akan secara otomatis mempublikasikan pesan LWT tersebut ke topic yang telah ditentukan. Ini berguna untuk memberitahu klien lain bahwa sebuah perangkat telah offline.

> [!cornell] #### Summary
> 
> **Pemilihan antara RabbitMQ dan Kafka bergantung pada kasus penggunaan: RabbitMQ unggul dalam perutean pesan yang kompleks untuk aplikasi umum, sementara Kafka didesain untuk streaming data bervolume tinggi dengan kemampuan replay. Di sisi lain, MQTT adalah protokol pub/sub yang sangat ringan, dioptimalkan untuk perangkat IoT di jaringan yang tidak andal, dengan fitur unik seperti level QoS yang fleksibel, pesan Retain untuk status terakhir, dan Last Will and Testament untuk deteksi koneksi terputus.**

> [!ad-libitum]- Additional Information
> 
> #### Sesi Persisten (Persistent Sessions) di MQTT
> 
> Untuk perangkat di jaringan yang tidak stabil, MQTT menyediakan fitur _persistent sessions_. Ketika klien terhubung, ia bisa meminta sesi persisten. Jika koneksi terputus, broker akan menyimpan:
> 
> 1. Informasi _subscription_ dari klien.
>     
> 2. Semua pesan dengan QoS 1 dan 2 yang belum selesai di-ack oleh klien.
>     
> 
> Ketika klien terhubung kembali dengan ID klien yang sama, broker akan memulihkan sesi tersebut dan mengirimkan semua pesan yang tertunda. Ini memastikan tidak ada data penting yang hilang saat perangkat sedang _offline_ sementara.
> 
> #### Contoh Praktis: Smart Home dengan MQTT
> 
> - **Sensor Suhu (Publisher):** Secara berkala mempublikasikan suhu ke _topic_ `home/livingroom/temperature` dengan _flag_ **RETAIN** aktif.
>     
> - **Aplikasi Mobile (Subscriber):** Berlangganan ke `home/livingroom/temperature`. Saat aplikasi dibuka, ia akan langsung mendapatkan suhu terakhir berkat _flag Retain_, tanpa harus menunggu sensor mengirim pembaruan berikutnya.
>     
> - **Sensor Gerak (Publisher):** Terhubung dengan pesan **LWT** ke _topic_ `home/livingroom/motion/status` dengan isi `offline`. Jika sensor tiba-tiba mati, aplikasi mobile akan menerima notifikasi bahwa sensor gerak tersebut _offline_.
>     
> - **Lampu (Subscriber):** Berlangganan ke _topic_ `home/livingroom/light/command`. Aplikasi mobile mempublikasikan pesan `ON` atau `OFF` ke _topic_ ini untuk mengontrol lampu.
>