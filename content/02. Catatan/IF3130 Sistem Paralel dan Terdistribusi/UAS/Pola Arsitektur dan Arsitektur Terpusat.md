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
> > - Apa itu _style_ arsitektur?
> >     
> > - Apa beda _Layered_ vs _Object-based_?
> >     
> > - Apa itu _decoupling_ (space & time)?
> >     
> > - Beda _Pub/Sub_ vs _Shared Data Space_?
> >     
> > - Apa itu model Client-Server?
> >     
> > - Apa itu 3-layer tradisional?
> >     
> > - Apa alur di contoh _search engine_?
> >     
> > - Apa itu _multi-tiered_?
> >     
> > - Apa beda 2-tier vs 3-tier?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 10-15 (10 - IF3130-09-Architecture-2022.pdf)
> >     
> > - Kuliah Arsitektur Sistem Terdistribusi
> >     
> 
> > ### 1. Architecture Styles (Pola Arsitektur)
> > 
> > Pola arsitektur adalah cara-cara umum untuk **membagi tanggung jawab menjadi komponen-komponen** dan **mendistribusikannya pada mesin-mesin yang berbeda**.
> > 
> > Dua contoh awal adalah:
> > 
> > 1. **Layered Style (a):**
> > 
> >     ![[Pasted image 20251111001300.png]]
> > 
> > 	- Komponen diorganisir dalam lapisan-lapisan (layers).
> > 	    
> > 	- Sebuah _request_ mengalir ke bawah (dari Layer N ke N-1, ... ke Layer 1).
> > 	    
> > 	- Sebuah _response_ mengalir ke atas (dari Layer 1 ke ... N-1, ke Layer N).
> > 	    
> > 	- Aturan umum: Layer N hanya boleh memanggil Layer N-1.
> > 	    
> > 	- _Contoh:_ Model OSI 7-layer, Arsitektur Client-Server (UI, Business, Data).
> > 	    
> > 
> > 2. **Object-Based Style (b):**
> >     
> >     ![[Pasted image 20251111001317.png]]
> > 
> > 	- Komponen adalah objek-objek.
> > 	    
> > 	- Interaksi terjadi melalui pemanggilan _method_ (seperti _Remote Procedure Call_ / RPC).
> > 	    
> > 	- _Contoh:_ Sistem objek terdistribusi (CORBA, Java RMI).
> >     
> > 
> > ### 2. Decoupling (Pemisahan)
> > 
> > Pola arsitektur sering digunakan untuk **memisahkan proses (decoupling)** dalam _ruang (space)_ dan _waktu (time)_.
> > 
> > 1. **Publish/Subscribe (a):**
> >     
> >     ![[Pasted image 20251111001337.png]]
> > 
> > 	- Komponen (Publisher) mempublikasikan _event_ ke _Event Bus_ tanpa tahu siapa penerimanya.
> > 	    
> > 	- Komponen lain (Subscriber) menerima _event_ dari _Bus_ tanpa tahu siapa pengirimnya.
> > 	    
> > 	- Ini **decouple in space**: Publisher dan Subscriber tidak perlu saling kenal secara langsung.
> >     
> > 
> > 2. **Shared Data Space (b):**
> >     
> >     ![[Pasted image 20251111001348.png]]
> > 
> > 	- Komponen mempublikasikan data ke sebuah _shared space_ (database, blackboard) yang persisten.
> > 	    
> > 	- Komponen lain bisa mengambil data itu kapan saja.
> > 	    
> > 	- Ini **decouple in space** (komponen tidak saling kenal) dan **decouple in time** (komponen tidak harus aktif bersamaan. Satu bisa _publish_ hari ini, yang lain _consume_ besok).
> > 	    
> > 
> > ### 3. Arsitektur Terpusat (Centralized)
> > 
> > Pola yang paling umum adalah **Client-Server**.
> > 
> > - **Servers:** Proses yang menyediakan/memberikan layanan.
> >     
> > - **Clients:** Proses yang menggunakan layanan.
> >     
> > 
> > Model interaksi dasarnya adalah **Request/Reply**:
> > 
> > ![[Pasted image 20251111001408.png]]
> > 
> > 1. Client mengirim pesan _Request_ ke Server.
> >     
> > 2. Client **menunggu (terblokir)**.
> >     
> > 3. Server memproses _request_ (_Provide service_).
> >     
> > 4. Server mengirim pesan _Reply_ kembali ke Client.
> >     
> > 5. Client menerima _reply_ dan melanjutkan eksekusi.
> >     
> > 
> > ### 4. Application Layering (Lapisan Aplikasi)
> > 
> > Ini adalah implementasi spesifik dari _Layered Style_. Pandangan tradisional membaginya menjadi 3 lapisan logis:
> > 
> > 1. **UI (User Interface) Layer:** Berisi logika untuk menangani interaksi dengan pengguna (tampilan, form).
> >     
> > 2. **Processing (Business) Layer:** Berisi logika bisnis/aplikasi inti (aturan, kalkulasi).
> >     
> > 3. **Data Layer:** Berisi logika untuk mengakses dan menyimpan data (biasanya ke database).
> >     
> > 
> > **Contoh (Search Engine Sederhana):**
> > 
> > ![[Pasted image 20251111001433.png]]
> > 
> > - **UI Level:** `User Interface` (tempat user mengetik _keyword_).
> >     
> > - **Processing Level:**
> > 	    
> > 	- `Query Generator` (mengubah _keyword_ jadi _database query_).
> > 	    
> > 	- `Ranking Algorithm` (mengurutkan hasil).
> > 	    
> > 	- `HTML Generator` (mem-format hasil jadi halaman HTML).
> >     
> > - **Data Level:** `Database with Web pages` (menyimpan data web).
> >     
> > 
> > ### 5. Multi-Tiered Architecture (Arsitektur Multi-Lapis)
> > 
> > Ini adalah tentang bagaimana lapisan-lapisan (layers) logis di atas **ditempatkan (dideploy) secara fisik** di mesin yang berbeda.
> > 
> > - **Single-tiered:** Semua layer (UI, Processing, Data) ada di satu mesin (misal: Mainframe dengan _dumb terminal_).
> >     
> > - **Two-tiered:** Layer dibagi antara mesin Client dan satu mesin Server.
> >     
> > - **Three-tiered:** Setiap layer ada di mesin terpisah (Mesin Client, Mesin Application Server, Mesin Database Server).
> >     
> > 
> > ![[Pasted image 20251111001506.png]]
> > 
> > Gambar ini menunjukkan berbagai cara membagi logika antara Client dan Server:
> > 
> > - (a) **Fat Server:** Hampir semua logika (UI, App, Data) di Server. Client hanya penampil (mirip _dumb terminal_).
> >     
> > - (b) **Thin Client:** UI di Client, sisanya (App, Data) di Server. Ini model yang sangat umum untuk _web applications_.
> >     
> > - (c) **Fat Client:** UI dan sebagian logika Aplikasi di Client. Server menangani sebagian Aplikasi dan Data.
> >     
> > - (d) **Very Fat Client:** UI dan semua logika Aplikasi di Client. Server murni hanya Database. (Umum untuk aplikasi desktop + DB server).
> >     
> > - (e) **Standalone:** Semua di "Client" (bukan sistem terdistribusi).
> >     

> [!cornell] #### Summary
> 
> **Pola arsitektur mendefinisikan cara komponen diatur, seperti** _**Layered**_ **(berlapis) atau** _**Object-based**_ **(via method call), dan bagaimana mereka dipisahkan (**_**decoupled**_**) seperti** _**Pub/Sub**_**. Pola terpusat yang paling umum adalah** _**Client-Server**_**, yang sering diimplementasikan sebagai arsitektur** _**Multi-Tiered**_ **(khususnya** _**Two-Tier**_ **atau** _**Three-Tier**_**) yang memisahkan lapisan logis (UI, Processing, Data) ke mesin fisik yang berbeda.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Three-Tier vs Two-Tier
> 
> - **Two-Tier (Client-Server):**
>     
> - **Pro:** Sederhana, mudah dikembangkan untuk aplikasi skala kecil/menengah.
>     
> - **Con:** Logika bisnis sering tercampur di UI (Client) atau di Database (Server). Sulit di-skala (scale). Jika logika bisnis berubah, seringkali harus _update_ aplikasi di semua client.
>     
> - **Three-Tier (Client-AppServer-DBServer):**
>     
> - **Pro:** Pemisahan yang jelas. UI tidak tahu-menahu soal Database. Logika bisnis terpusat di _Application Server_, membuatnya mudah di-_update_ dan di-_scale_ (App Server bisa ditambah tanpa mengubah client atau DB). Lebih aman karena Client tidak pernah terhubung langsung ke Database.
>     
> - **Con:** Lebih kompleks untuk di-setup awalnya. Ada _overhead_ komunikasi tambahan (Client -> AppServer -> DBServer).
>     
> 
> #### Eksplorasi Mandiri
> 
> - Cari tahu tentang Java RMI (Remote Method Invocation) sebagai contoh implementasi _Object-Based Style_.
>     
> - Identifikasi arsitektur aplikasi web modern (misal: Facebook, Tokopedia). Apakah mereka _Two-Tier_ atau _Three-Tier_ (atau N-Tier)? (Petunjuk: Seringkali N-Tier, yang merupakan perluasan dari 3-Tier).
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Buku:** _Pattern-Oriented Software Architecture (POSA)_ - Volume 1. Membahas pola-pola ini secara mendalam.
>     
> - **Istilah:** _"Fat Client" vs "Thin Client"_. Ini adalah terminologi klasik yang sangat penting untuk dipahami dalam evolusi arsitektur.
>