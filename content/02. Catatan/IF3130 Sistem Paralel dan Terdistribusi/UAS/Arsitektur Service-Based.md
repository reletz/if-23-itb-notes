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
> > - Apa itu _service-based architecture_?
> >     
> > - Apa ciri khasnya?
> >     
> > - Apa topologi dasarnya?
> >     
> > - 3 Varian UI?
> >     
> > - 3 Varian Database?
> >     
> > - Apa fungsi _API Layer_ (Gateway)?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 16-20 (10 - IF3130-09-Architecture-2022.pdf)
> >     
> > - Kuliah Arsitektur Sistem Terdistribusi
> >     
> 
> > ### 1. Service-Based Architecture (Arsitektur Berbasis Layanan)
> > 
> > Ini adalah pola arsitektur di mana aplikasi besar (monolit) dipecah menjadi beberapa **layanan (services)** yang lebih kecil.
> > 
> > **Ciri Khas:**
> > 
> > - **Pengelompokan Domain:** Layanan dikelompokkan berdasarkan _domain bisnis_. Contoh: Layanan _User_, Layanan _Order_, Layanan _Payment_.
> >     
> > - **Akses:** Komunikasi antar layanan atau dari UI ke layanan biasanya menggunakan protokol standar seperti **REST**, **RPC (gRPC)**, atau **SOAP**.
> >     
> > - **Shared Database:** Ini adalah ciri penting. Seringkali, beberapa layanan _domain_ yang berbeda **masih berbagi database yang sama** (lihat Slide 19, gambar kiri atas). Ini membedakannya dari _microservices_ murni.
> >     
> > - **API Gateway:** Sering menggunakan _API Gateway_ sebagai perantara.
> >     
> > 
> > **Topologi Dasar:**
> > 
> > ![[Pasted image 20251111001733.png]]
> > 
> > User Interface -> [Service 1, Service 2, ... Service N] -> Database
> > 
> > ### 2. Varian User Interface (UI)
> > 
> > Ada fleksibilitas dalam cara UI diatur:
> > 
> > ![[Pasted image 20251111001806.png]]
> > 
> > 1. **Single Monolithic User Interface:**
> >     
> > 
> > 	- Hanya ada **satu aplikasi UI** besar (monolit).
> > 	    
> > 	- Aplikasi UI ini memanggil semua layanan _domain_ yang berbeda sesuai kebutuhan.
> > 	    
> > 	- _Analogi:_ Sebuah _dashboard_ besar yang memiliki semua menu dan fitur.
> > 	    
> > 
> > 2. **Domain-Based User Interface:**
> >     
> > 	
> > 	- Ada **beberapa aplikasi UI** yang terpisah.
> > 	    
> > 	- Setiap aplikasi UI dikhususkan untuk _domain bisnis_ tertentu.
> > 	    
> > 	- _Contoh:_ Aplikasi UI _Admin_, Aplikasi UI _Customer_, Aplikasi UI _Finance_. Masing-masing memanggil layanan yang relevan.
> > 	    
> > 
> > 3. **Service-Based User Interface:**
> >     
> > 
> > 	- Setiap _service_ bertanggung jawab atas UI-nya sendiri.
> > 	    
> > 	- Ini mengarah ke konsep modern seperti _**Micro-Frontends**_, di mana UI "dirakit" dari potongan-potongan kecil yang independen.
> > 	    
> > 
> > ### 3. Varian Database
> > 
> > Sama seperti UI, ada fleksibilitas dalam organisasi database:
> > 
> > ![[Pasted image 20251111001830.png]]
> > 
> > 1. **Single Monolithic Database:**
> >     
> > 
> > 	- Ini adalah pola **paling umum** untuk _service-based architecture_.
> > 	    
> > 	- Semua _service_ membaca dan menulis ke **satu database fisik yang sama**.
> > 	    
> > 	- _Pro:_ Mudah untuk transaksi data (misal: _join_ tabel), konsistensi data terjamin.
> > 	    
> > 	- _Con:_ _Coupling_ (keterikatan) tinggi. Jika skema DB berubah, banyak _service_ bisa terdampak.
> >     
> > 
> > 2. **Domain-Based Database:**
> >     
> > 
> > 	- Database dibagi per _domain_ besar.
> > 	    
> > 	- _Contoh:_ _Service_ A dan B (Domain _Sales_) menggunakan DB _Sales_. _Service_ C dan D (Domain _Support_) menggunakan DB _Support_.
> > 	    
> > 
> > 3. **Service-Based Database:**
> >     
> > 
> > 	- **Setiap** _**service**_ **memiliki database-nya sendiri**.
> > 	    
> > 	- _Service_ lain tidak boleh mengakses database ini secara langsung; mereka harus melalui API _service_ pemiliknya.
> > 	    
> > 	- Ini adalah **ciri khas Microservices**.
> > 	    
> > 
> > ### 4. API Layer (Proxy atau Gateway) (Slide 20)
> > 
> > Seringkali, sebuah lapisan (layer) tambahan ditempatkan di antara _User Interface_ dan _Domain Services_.
> > 
> > ![[Pasted image 20251111001847.png]]
> > 
> > **Fungsi API Gateway:**
> > 
> > - **Single Entry Point:** UI hanya perlu tahu satu alamat (Gateway), tidak perlu tahu alamat setiap _service_.
> >     
> > - **Routing:** Meneruskan _request_ dari UI ke _service_ yang tepat.
> >     
> > - **Authentication & Authorization:** Menangani login dan cek hak akses secara terpusat.
> >     
> > - **Rate Limiting:** Mencegah _request_ berlebihan (abuse) ke _service_.
> >     
> > - **Agregation:** Mengambil data dari beberapa _service_ dan menggabungkannya menjadi satu _response_ untuk UI.
> >     

> [!cornell] #### Summary
> 
> **Arsitektur Berbasis Layanan memecah aplikasi menjadi layanan-layanan per** _**domain**_ **yang seringkali masih berbagi** _**database**_ **yang sama (**_**shared database**_**). Pola ini menawarkan fleksibilitas tinggi dalam cara UI dan** _**database**_ **diatur (bisa monolit, per domain, atau per** _**service**_**). Penambahan** _**API Gateway**_ **berfungsi sebagai pintu masuk tunggal yang menyederhanakan** _**routing**_**, keamanan, dan komunikasi dari UI ke berbagai layanan.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Service-Based vs. Microservices
> 
> Ini adalah poin kebingungan yang umum. Keduanya memecah monolit.
> 
> - **Service-Based Architecture:**
>     
> 	- Layanan bersifat _coarse-grained_ (berbutir kasar/besar). Contoh: Layanan "Manajemen Inventaris".
> 	    
> 	- Seringkali masih berbagi _database_.
> 	    
> 	- Dianggap sebagai langkah awal/evolusi dari Monolit.
>     
> - **Microservice Architecture:**
>     
> 	- Layanan bersifat _fine-grained_ (berbutir halus/kecil). Contoh: Layanan "Cek Stok", Layanan "Update Stok", Layanan "Notifikasi Stok Habis".
> 	    
> 	- **Wajib** memiliki _database_ sendiri per _service_.
> 	    
> 	- Jauh lebih _decoupled_ tapi juga jauh lebih kompleks (memerlukan _service discovery_, _eventual consistency_, dll).
> 	    
> 
> Arsitektur di slide 19 (kanan bawah) pada dasarnya adalah Microservices.
> 
> #### Tools API Gateway Populer
> 
> - Kong
>     
> - Tyk
>     
> - NGINX API Gateway
>     
> - Spring Cloud Gateway (untuk ekosistem Java)
>     
> 
> #### Eksplorasi Mandiri
> 
> - Bayangkan aplikasi Tokopedia. Coba pecah fungsionalitasnya menjadi layanan-layanan _domain_ (Service-Based). (Misal: Layanan Produk, Layanan User, Layanan Keranjang, Layanan Checkout, Layanan Pengiriman).
>     
> - Kemudian, coba pikirkan bagaimana Layanan Checkout bisa dipecah lagi menjadi _microservices_.
>