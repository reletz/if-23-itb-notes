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
> > - Apa beda model _request-based_ vs _event-based_?
> >     
> > - Apa itu _Broker Topology_?
> >     
> > - Apa keuntungan arsitektur _event-driven_?
> >     
> > - Apa kerugian (_trade-offs_) nya?
> >     
> > - Apa itu _Eventual Consistency_?
> >     
> > - Apa dampak performa asinkronus?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 21-23 (10 - IF3130-09-Architecture-2022.pdf)
> >     
> > - Kuliah Arsitektur Sistem Terdistribusi
> >     
> 
> > ### 1. Request-Based vs Event-Based
> > 
> > Ini adalah dua model fundamental untuk interaksi antar komponen.
> > 
> > 1. **Request-Based Model (Sinkronus):**
> >     
> >     ![[Pasted image 20251111002030.png]]
> > 
> > 	- Ada **Request Orchestrator** (Pengatur) yang mengontrol alur.
> > 	    
> > 	- Alur: UI mengirim _Request_ -> _Orchestrator_ memanggil _Processor A_ -> Menunggu A selesai -> Memanggil _Processor B_, dst.
> > 	    
> > 	- _Control flow_ sangat jelas dan eksplisit.
> > 	    
> > 	- Komunikasi bersifat **sinkronus** (menunggu balasan).
> > 	    
> > 
> > 2. **Event-Based Model (Asinkronus):**
> > 
> > 	  ![[Pasted image 20251111002057.png]]  
> > 
> > 	- Menggunakan topologi **Broker**.
> > 	    
> > 	- Komponen **Event Producer** (misal: _service A_) mengirimkan _event_ (pesan "sesuatu telah terjadi") ke **Event Channel / Broker** (misal: Kafka, RabbitMQ).
> > 	    
> > 	- Komponen **Event Processor** (misal: _service B_) _subscribe_ (berlangganan) ke _event_ tersebut. Ketika _event_ muncul di _Broker_, _Broker_ mengirimkannya ke _Processor_.
> > 	    
> > 	- _Producer_ tidak tahu (dan tidak peduli) siapa yang akan memproses _event_-nya.
> > 	    
> > 	- Komunikasi bersifat **asinkronus** (_fire-and-forget_).
> > 	    
> > 
> > ### 2. Trade-offs Event-Driven Architecture (EDA)
> > 
> > EDA memiliki keuntungan dan kerugian yang signifikan.
> > 
> > **Keuntungan (Advantages):**
> > 
> > - **Responsif:** Sistem bisa bereaksi secara _real-time_ terhadap perubahan/kejadian.
> >     
> > - **Skalabilitas & Elastisitas:** Sangat mudah di-_scale_. Jika satu _processor_ kewalahan, tinggal tambahkan _instance processor_ baru yang _subscribe_ ke _event_ yang sama.
> >     
> > - **Agility & Extensibility:** Sangat mudah menambah fungsionalitas baru. Cukup buat _service_ baru dan minta ia _subscribe_ ke _event_ yang ada, tanpa perlu mengubah _service_ lama.
> >     
> > - **Performance:** Performa _dirasakan_ (perceived performance) meningkat karena komunikasi asinkronus (dijelaskan di poin 3).
> >     
> > 
> > **Kerugian (Trade-offs):**
> > 
> > - **Eventual Consistency:** Karena asinkronus, data tidak akan konsisten secara instan. Ada jeda waktu. _Contoh:_ Anda pesan tiket, status langsung "Pending". _Event_ diproses di _background_, dan beberapa detik kemudian status berubah jadi "Confirmed". Sistem _pada akhirnya_ (eventually) akan konsisten.
> >     
> > - **Kontrol Alur Kurang:** Sulit melacak alur proses secara keseluruhan. (Misal: "Setelah _event A_, apakah _B_ atau _C_ yang jalan duluan?").
> >     
> > - **Sulit di-Test dan di-Debug:** Jauh lebih sulit melacak _bug_ karena alurnya tidak linear dan tersebar di banyak _processor_.
> >     
> > 
> > ### 3. Synchronous vs Asynchronous Communication
> > 
> > ![[Pasted image 20251111002203.png]]
> > 
> > Asumsi: Proses di server (Consumer) butuh 3000ms.
> > 
> > - **Synchronous (misal: REST):**
> >     
> > 
> > 	1. Producer kirim _request_ (butuh 50ms).
> > 	    
> > 	2. Producer **WAIT (Menunggu)**.
> > 	    
> > 	3. Consumer proses (3000ms).
> > 	    
> > 	4. Consumer kirim _response_ (50ms).
> > 	    
> > 	5. Producer menerima _response_ dan bebas (GO).
> > 	    
> > 
> > - **Total Waktu Producer Terblokir: 3100ms.**
> >     
> > - **Asynchronous (misal: Event):**
> >     
> > 	
> > 	1. Producer kirim _event_ (butuh 25ms, lebih cepat karena protokol _messaging_ ringan).
> > 	    
> > 	2. Producer langsung bebas (GO). _Broker_ akan mengurus pengiriman.
> > 	    
> > 	3. Di _background_, Consumer menerima _event_ (25ms) dan memprosesnya (3000ms).
> > 	    
> > 
> > - **Total Waktu Producer Terblokir: 25ms.**
> >     
> > 
> > **Kesimpulan:** Waktu proses total _end-to-end_ mungkin sama (sekitar 3050ms), tapi **responsiveness** (dilihat dari sisi _Producer_) jauh lebih cepat di model asinkronus. _Producer_ bisa langsung mengerjakan hal lain.

> [!cornell] #### Summary
> 
> **Arsitektur Berbasis Peristiwa (Event-Driven) mengubah model komunikasi dari** _**request-reply**_ **sinkronus menjadi** _**publish-subscribe**_ **asinkronus menggunakan** _**event broker**_**. Ini memberikan **keuntungan besar** dalam hal **skalabilitas, fleksibilitas (extensibility), dan responsiveness** (karena** _**producer**_ **tidak terblokir lama). Namun, ini dibayar dengan **kerugian** berupa kompleksitas** _**debugging**_ **dan model konsistensi data yang lebih lemah, yaitu **Eventual Consistency**.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Eventual Consistency
> 
> Ini adalah konsep fundamental di sistem terdistribusi modern. Dalam sistem monolit, kita terbiasa dengan konsistensi **ACID** (Atomic, Consistent, Isolated, Durable), di mana setelah _query_ `UPDATE` selesai, _query_ `SELECT` berikutnya **pasti** melihat data baru.
> 
> Di _Eventual Consistency_, hal ini tidak dijamin. Setelah Anda mem-_"publish"_ _event_, mungkin butuh beberapa milidetik (atau bahkan detik) sebelum _processor_ menerima, memproses, dan menyimpan data baru. Jika Anda melakukan `SELECT` dalam jeda waktu itu, Anda akan melihat data lama.
> 
> Sistem ini "menerima" inkonsistensi sementara demi mendapatkan skalabilitas dan ketersediaan (_availability_) yang lebih tinggi (prinsip Teorema CAP).
> 
> #### Perbandingan
> 
> |**Aspek**|**Layered (N-Tier)**|**Service-Based**|**Event-Driven (EDA)**|
> |---|---|---|---|
> |**Definisi**|Kode disusun secara horizontal berdasarkan **peran teknis** (misal: Presentation, Business, Database). Tiap layer hanya boleh bicara dengan layer di bawahnya.|Sistem dipecah menjadi beberapa layanan **berdasarkan domain bisnis** (misal: Order Service, User Service). Layanan ini berukuran besar (makro) dan seringkali masih berbagi satu database yang sama.|Arsitektur yang berpusat pada **produksi dan konsumsi "event"** (kejadian). Komponen tidak memanggil satu sama lain secara langsung, melainkan melempar pesan (event) secara asinkron.|
> |**Kelebihan (Pros)**|• **Simpel & Familiar:** Paling mudah dipahami pemula.<br><br>  <br><br>• **Standar:** Hampir semua framework (Spring, Django, Laravel) mendukung ini secara default.<br><br>  <br><br>• **Separation of Concern:** Memisahkan UI dari logika bisnis dan database.|• **Kompromi Terbaik:** Lebih modular daripada Monolith Layered, tapi tidak serumit Microservices.<br><br>  <br><br>• **Deployment Terpisah:** Bisa update satu service tanpa redeploy seluruh aplikasi.<br><br>  <br><br>• **Kinerja Baik:** Koneksi ke DB biasanya langsung (native), tidak lewat banyak network hop.|• **Decoupling Tinggi:** Produser event tidak perlu tahu siapa yang menerima event.<br><br>  <br><br>• **Skalabilitas Tinggi:** Mudah menambah consumer baru tanpa mengubah produser.<br><br>  <br><br>• **Responsif:** Cocok untuk sistem real-time dan high-volume data.|
> |**Kekurangan (Cons)**|• **Sinkhole Anti-pattern:** Request seringkali cuma "numpang lewat" di layer tengah tanpa logika apa-apa.<br><br>  <br><br>• **Monolithic:** Biasanya dideploy sebagai satu kesatuan besar (sulit di-scale per fitur).<br><br>  <br><br>• **Ketergantungan:** Perubahan di database sering merembet harus ubah code di semua layer di atasnya.|• **Ketergantungan Database:** Karena sering berbagi DB, perubahan skema tabel bisa merusak service lain.<br><br>  <br><br>• **Batas Service:** Kadang bingung menentukan seberapa besar ukuran satu service (terlalu besar jadi monolith, terlalu kecil jadi ribet).|• **Kompleksitas Tinggi:** Sangat sudah untuk di-debug dan di-test (alur tidak linear).<br><br>  <br><br>• **Eventual Consistency:** Data tidak langsung sinkron di semua tempat (ada jeda waktu).<br><br>  <br><br>• **Error Handling:** Susah menangani kalau ada event yang gagal diproses di tengah jalan.|
> |**Implementasi**|Aplikasi web standar, aplikasi internal perusahaan (Enterprise apps), MVP (Minimum Viable Product).|Migrasi dari Monolith ke Microservices (langkah transisi), aplikasi bisnis yang butuh pemisahan domain tapi timnya kecil.|Sistem notifikasi, aplikasi trading saham, IoT (sensor), sistem e-commerce skala raksasa (misal: order placed -> trigger email, trigger gudang, trigger logistik secara paralel).|
> |**Cara Komunikasi**|**Sinkron (Synchronous):** Request turun dari UI -> Logic -> DB, lalu return ke atas.|**Hibrida:** Biasanya kombinasi REST API (sinkron) untuk user, dan kadang pakai Queue untuk antar service.|**Asinkron (Asynchronous):** Menggunakan Message Broker (seperti Kafka, RabbitMQ) untuk melempar event "Fire and Forget".|
>
> #### Tools Event Broker Populer
> 
> - **RabbitMQ:** Broker tradisional, matang, mendukung banyak protokol (AMQP, MQTT).
>     
> - **Apache Kafka:** Platform _streaming_ _event_. Didesain untuk _throughput_ sangat tinggi, persisten (menyimpan _event_), dan _fault-tolerant_. Menjadi standar de-facto untuk arsitektur berbasis _event_ skala besar.
>     
> - **Google Cloud Pub/Sub, AWS SQS/SNS:** Layanan _messaging_ terkelola di _cloud_.
>     
> 
> #### Eksplorasi Mandiri
> 
> - Pikirkan proses _checkout_ di e-commerce. (Misal: 1. Buat Order, 2. Proses Pembayaran, 3. Kurangi Stok, 4. Kirim Email Konfirmasi, 5. Siapkan Pengiriman).
>     
> - Bagaimana Anda mengimplementasikannya dengan model _Request-Based_ (Orchestrator)? Apa masalahnya?
>     
> - Bagaimana Anda mengimplementasikannya dengan model _Event-Based_? (Misal: _event_ "OrderCreated" memicu 4 _processor_ berbeda secara independen).
>