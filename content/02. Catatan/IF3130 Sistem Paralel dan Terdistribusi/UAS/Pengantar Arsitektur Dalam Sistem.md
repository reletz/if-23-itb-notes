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
> > - Apa definisi arsitektur (IEEE)?
> >     
> > - Apa itu aplikasi terdistribusi?
> >     
> > - Apa 5 hal penting?
> >     
> > - Apa itu 'abstraction leak'?
> >     
> > - Apa 3 perspektif anatomi?
> >     
> > - Beda Service vs Instance?
> >     
> > - Apa itu Adapter?
> >     
> > - Apa itu komunikasi sinkronus?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 1-9 (10 - IF3130-09-Architecture-2022.pdf)
> >     
> > - Kuliah Arsitektur Sistem Terdistribusi
> >     
> 
> > ### 1. Definisi Arsitektur (IEEE)
> > 
> > Menurut IEEE, arsitektur adalah **konsep level tertinggi** dari sebuah sistem di lingkungannya.
> > 
> > Ini adalah tentang **organisasi atau struktur dari komponen-komponen penting** yang berinteraksi melalui **antarmuka (interfaces)**. Komponen-komponen itu sendiri bisa jadi tersusun atas komponen dan antarmuka yang lebih kecil lagi.
> > 
> > _Analogi:_ Arsitektur adalah seperti denah bangunan. Ia tidak menunjukkan warna cat atau merek furnitur, tapi menunjukkan ruangan utama (komponen), di mana letaknya, dan bagaimana pintu/koridor (interface) menghubungkan ruangan-ruangan tersebut.
> > 
> > ### 2. Aplikasi Terdistribusi
> > 
> > Sebuah aplikasi terdistribusi terdiri dari **beberapa proses (multiple processes)** yang berjalan di **satu atau lebih komputer/node**.
> > 
> > Fitur utamanya adalah:
> > 
> > - **Komunikasi Jaringan:** Proses-proses ini berkomunikasi satu sama lain menggunakan infrastruktur jaringan (misal: Socket, TCP/UDP, HTTP, WebSocket).
> >     
> > - **Heterogen:** Seringkali berjalan di lingkungan yang berbeda-beda. Contoh:
> >     
> > 	- _Perangkat Keras/OS:_ Sebagian di _mobile_ (Android/iOS), sebagian di server (Linux), sebagian di PC (Windows).
> > 	    
> > 	- _Jaringan:_ Ada yang di LAN (jaringan lokal), ada yang lewat Internet.
> > 	    
> > 	- _Teknologi:_ Bisa dikembangkan dengan bahasa yang berbeda (Python, C, Javascript) yang saling berkomunikasi.
> > 	    
> > 
> > ### 3. Hal yang Perlu Diperhatikan (Concerns)
> > 
> > Saat membangun sistem terdistribusi, ada 5 tantangan utama yang harus selalu diperhatikan:
> > 
> > 1. **Komunikasi:**
> >     
> > 
> > 	- Mekanisme pengiriman data antar node (request/response via HTTP, TCP, dll).
> > 	    
> > 	- Waspada terhadap _**Abstraction Leak**_ (Kebocoran Abstraksi): Meskipun kita pakai _library_ canggih, kita tetap harus paham _stack_ komunikasi di bawahnya. Contoh: _Library_ HTTP mungkin menyembunyikan kompleksitas TCP, tapi saat terjadi _network timeout_, kita tetap harus menanganinya. Abstraksi itu "bocor" dan mengingatkan kita ada jaringan di baliknya.
> > 	    
> > 	
> > 2. **Koordinasi:**
> >     
> > 
> > 	- Mengatur siapa melakukan apa.
> > 	    
> > 	- Bagaimana sistem menangani jika ada salah satu node yang gagal (gagal _failover_, _consensus_).
> > 	    
> > 
> > 3. **Skalabilitas:**
> >     
> > 
> > 	- Efisiensi sistem dalam menangani beban kerja yang meningkat.
> > 	    
> > 	- Diukur dari:
> > 	    
> > 		- _Throughput:_ Berapa banyak pekerjaan yang bisa diselesaikan per satuan waktu (misal: 1000 transaksi per detik).
> > 		    
> > 		- _Latency/Response Time:_ Waktu yang dibutuhkan untuk merespons sebuah _request_.
> > 		    
> > 
> > 4. **Resiliensi:**
> >     
> > 
> > 	- Kemampuan sistem untuk tetap beroperasi (meskipun mungkin dengan performa berkurang) walaupun terjadi kegagalan di beberapa bagiannya.
> > 	    
> > 
> > 5. **Operations (Operasional):**
> >     
> > 	
> > 	- Seluruh proses pengelolaan siklus hidup aplikasi, mulai dari _development_ (pengembangan), _testing_ (pengujian), _deployment_ (pemasangan ke server), hingga _maintain_ (pemeliharaan).
> > 	    
> > 
> > ### 4. Anatomi Sistem Terdistribusi
> > 
> > Kita bisa melihat anatomi sistem terdistribusi dari tiga perspektif:
> > 
> > 1. **Fisik:** Secara fisik, ini adalah sekumpulan **mesin** (komputer, server) yang terhubung melalui **jaringan**.
> >     
> > 2. **Runtime (Saat Berjalan):** Saat berjalan, ini adalah sejumlah **proses software** yang berkomunikasi satu sama lain melalui mekanisme **IPC (Inter-Process Communication)**, seperti HTTP.
> >     
> > 3. **Implementasi (Kode):** Dari perspektif kode, ini adalah sekumpulan **komponen** _**loosely-coupled**_ (tidak terikat erat) yang bisa di-_deploy_ dan di-_scale_ (ditingkatkan kapasitasnya) secara independen. Komponen-komponen inilah yang disebut **Services (Layanan)**.
> >     
> > 
> > ### 5. Service, Instance, dan Interface
> > 
> > - **Service:** Bagian fungsionalitas dari sistem. _Service_ mengimplementasikan _business logic_ (aturan bisnis) tertentu. Contoh: _Service-Otentikasi_, _Service-Pembayaran_.
> >     
> > - **Service Instance:** _Service_ adalah 'kode' atau 'desain'. Saat _service_ itu dijalankan, ia berjalan sebagai sebuah **proses**. Proses yang sedang berjalan inilah yang disebut _Service Instance_. Bisa ada banyak _instance_ dari _service_ yang sama untuk menangani beban tinggi.
> >     
> > 	- _Analogi:_ _Service_ adalah resep masakan. _Service Instance_ adalah koki yang sedang memasak resep itu. Anda bisa punya banyak koki (instance) yang memasak resep yang sama (service).
> > 	    
> > - **Interface (Antarmuka):** Cara _service_ berkomunikasi dengan dunia luar.
> >     
> > 	- _Inbound Interface:_ Menerima permintaan dari luar (misal: API yang diekspos).
> > 	    
> > 	- _Outbound Interface:_ Melakukan panggilan ke komponen lain (misal: memanggil API _service_ lain atau _query_ ke database).
> > 	    
> > 
> > ### 6. API dan Adapter
> > 
> > - **API (Application Programming Interface):** Ini adalah _Service Interface_ itu sendiri, kontrak yang mendefinisikan cara _service_ bisa diakses.
> >     
> > - **Adapter:** Komponen yang "menerjemahkan" teknologi komunikasi spesifik menjadi panggilan ke _Service Interface_.
> >     
> > 	- _Contoh:_ Sebuah _Service_ punya _interface_ `GetUser(id)`. _Adapter_ **HTTP Controller** akan mengambil _request_ HTTP `GET /users/123`, mengekstrak `123`, lalu memanggil `GetUser(123)`. _Adapter_ lain bisa berupa **gRPC** atau **Kafka Consumer** yang melakukan hal serupa.
> > 	    
> > 	- Data yang dikirimkan (request/response) biasanya di-**serialisasi** ke format yang _language-agnostic_ (tidak tergantung bahasa), seperti JSON atau Protobuf.
> > 	
> > ![[Pasted image 20251111001010.png]]
> > 
> > ### 7. Komunikasi Sinkronus (Synchronous)
> > 
> > Ini adalah model komunikasi di mana _client_ mengirim _request_ ke _server_ dan kemudian **terblokir (menunggu)** sampai _server_ mengirim _response_.
> > 
> > - **Kekurangan:** Dianggap tidak efisien karena _thread_ (jalur eksekusi) _client_ "menganggur" selama menunggu, padahal bisa digunakan untuk pekerjaan lain.
> >     
> > - **Teknologi Umum:** gRPC, REST, GraphQL sering diimplementasikan dengan pola sinkronus.
> >     

> [!cornell] #### Summary
> 
> **Arsitektur sistem terdistribusi adalah konsep level tertinggi tentang bagaimana komponen-komponen (services) yang independen diatur, berjalan sebagai** _**instances**_ **di banyak mesin, dan berinteraksi melalui** _**interface**_ **(API) untuk mencapai tujuan bersama.** **Pengembangan sistem ini harus mempertimbangkan tantangan utama seperti Komunikasi (misal: sinkronus/asinkronus dan** _**abstraction leak**_**), Koordinasi, Skalabilitas (throughput/latency), Resiliensi (toleransi gagal), dan Operations.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: The Law of Leaky Abstractions (Slide 5)
> 
> Istilah ini dipopulerkan oleh Joel Spolsky. Intinya adalah semua abstraksi (penyederhanaan) yang non-trivial pasti 'bocor'. Dalam konteks sistem terdistribusi, _library_ HTTP adalah abstraksi. Ia menyembunyikan kompleksitas TCP/IP, DNS, dll. Namun, abstraksi ini "bocor" ketika Anda mengalami masalah dunia nyata:
> 
> - _Latency:_ Panggilan fungsi lokal instan, panggilan HTTP butuh waktu.
>     
> - _Network Failure:_ Jaringan bisa putus. Panggilan _library_ Anda akan _timeout_ atau _error_.
>     
> - _Data Serialization:_ Anda harus mengubah data (misal: objek) menjadi format lain (JSON/XML) untuk dikirim.
>     
> 
> Seorang _engineer_ yang baik paham bahwa meskipun pakai _library_, mereka tidak bisa mengabaikan fakta bahwa ada jaringan yang tidak bisa diandalkan di baliknya.
> 
> #### Perbandingan: gRPC vs. REST (Disebut di Slide 9)
> 
> Keduanya adalah cara populer untuk membuat API, tapi punya filosofi berbeda:
> 
> - **REST (REpresentational State Transfer):** Pola arsitektur. Biasanya menggunakan HTTP + JSON. Berfokus pada _resource_ (sumber daya) dan _verb_ (kata kerja HTTP: GET, POST, PUT, DELETE). Contoh: `GET /users/123`. Sangat fleksibel dan mudah dipahami manusia.
>     
> - **gRPC (Google Remote Procedure Call):** Sebuah _framework_. Menggunakan HTTP/2 untuk performa tinggi dan _streaming_ dua arah. Menggunakan _Protocol Buffers_ (Protobuf) untuk serialisasi data, yang lebih ringkas dan cepat daripada JSON. Modelnya adalah pemanggilan fungsi (RPC) secara langsung (e.g., `client.GetUser({id: 123})`).
>     
> 
> #### Eksplorasi Mandiri
> 
> - Coba buat dua program sederhana (misal: dengan Python) yang berkomunikasi menggunakan:
>     
> 
> 1. Socket TCP biasa (untuk merasakan level rendahnya).
>     
> 2. HTTP (misal: menggunakan _library_ Flask/FastAPI) (untuk merasakan abstraksi REST).
>     
> 
> - Baca artikel asli "The Law of Leaky Abstractions" oleh Joel Spolsky.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku:** _Understanding Distributed Systems_ oleh Roberto Vitillo (disebut di slide).
>     
> - **Buku:** _Designing Data-Intensive Applications_ oleh Martin Kleppmann (dianggap buku "emas" untuk topik ini).
>     
> - **Artikel:** "Who Needs an Architect?" oleh Martin Fowler (disebut di slide 2).
>