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
> > - Apa saja jenis aplikasi terdistribusi?
> >     
> > - Karakteristik arsitektur Monolithic?
> >     
> > - Kelebihan & kekurangan Monolith?
> >     
> > - Apa itu arsitektur Microservice?
> >     
> > - Kelebihan & kekurangan Microservice?
> >     
> > - Mengapa 'Stateless' itu penting?
> >     
> > - Beda 'Stateful' vs 'Stateless' worker?
> >     
> > - Bagaimana 'stateless' membantu skalabilitas?
> >     
> > - Apa masalah desain 'stateful'?
> >     
> >
> > ## Reference Points
> > 
> > - Slides IF4031 Hal 30-52
> >     
> 
> > ### Jenis-Jenis Aplikasi Terdistribusi
> > 
> >  #### Aplikasi Klasik & Web
> >  
> >  - **Aplikasi Klasik:** Seperti FTP atau remote shell, memiliki fungsi spesifik, bergantung pada protokol standar, dan memiliki client-server yang terdedikasi.
> >      
> >  - **Aplikasi Web:** Menggunakan HTTP, dengan client berjalan di browser. Logika utama biasanya ada di sisi server, dan manajemen sesi menjadi tantangan.
> >      
> > 
> >  #### Enterprise & Cloud Computing
> >  
> >  - **Aplikasi Enterprise:** Software skala besar untuk perusahaan, seringkali dengan arsitektur N-Tier, performa tinggi, dan membutuhkan maintenance yang kritikal.
> >      
> >  - **Cloud Computing:** Model di mana pengguna tidak perlu mengelola infrastruktur (deployment, hosting). Layanan disediakan secara online (SaaS, IaaS, PaaS) dan dibayar berdasarkan penggunaan.
> >      
> >
> > ### Arsitektur Monolithic
> > 
> > Arsitektur Monolithic adalah pendekatan di mana seluruh aplikasi dibangun sebagai satu unit tunggal yang besar. Semua komponen (frontend, backend, business logic) digabungkan dalam satu _codebase_ dan di-_deploy_ sebagai satu aplikasi.
> > 
> > - **Kelebihan:**
> >     
> >     - Mudah untuk dibangun, diuji, dan di-_deploy_ pada awalnya.
> >         
> >     - Koordinasi dan berbagi data antar komponen lebih sederhana.
> >         
> >     - Cocok untuk aplikasi sederhana atau tim kecil.
> >         
> > - **Kekurangan:**
> >     
> >     - Sulit di-_maintain_ seiring waktu; perubahan kecil bisa menyebabkan bug tak terduga di tempat lain.
> >         
> >     - Seluruh aplikasi harus di-_deploy_ ulang bahkan untuk perubahan kecil.
> >         
> >     - Menjadi _bottleneck_ dalam pengembangan karena banyak developer bekerja di satu codebase.
> >         
> >     - Terikat pada satu tumpukan teknologi (bahasa, framework).
> >         
> >
> > ### Arsitektur Microservice
> > 
> > Arsitektur Microservice adalah pendekatan di mana aplikasi dipecah menjadi kumpulan layanan-layanan kecil yang independen. Setiap layanan bertanggung jawab atas satu kapabilitas bisnis, memiliki _codebase_ sendiri, dan berkomunikasi dengan layanan lain melalui API yang jelas (biasanya HTTP/gRPC).
> >
> > - **Kelebihan:**
> >     
> >     - Setiap layanan bisa di-_deploy_ dan di-_scale_ secara independen.
> >         
> >     - Memungkinkan pembagian tim yang jelas berdasarkan layanan.
> >         
> >     - Fleksibel dalam memilih teknologi untuk setiap layanan.
> >         
> >     - _Separation of concerns_: kegagalan satu layanan tidak langsung meruntuhkan seluruh aplikasi.
> >         
> > - **Kekurangan:**
> >     
> >     - Lebih kompleks untuk dikelola (deployment, monitoring).
> >         
> >     - Komunikasi antar layanan menambah latensi jaringan.
> >         
> >     - Membutuhkan penanganan khusus untuk konsistensi data lintas layanan.
> >         
> >
> > ### Pentingnya Service 'Stateless'
> > 
> > - **Stateful Service:** Sebuah service yang **mengingat** informasi dari request sebelumnya. State (data sesi, status game, dll.) disimpan secara lokal di memori instance service tersebut.
> >     
> > - **Stateless Service:** Sebuah service yang **tidak mengingat** apa pun dari request sebelumnya. Setiap request diperlakukan sebagai transaksi baru dan independen. Semua _state_ yang dibutuhkan disimpan di luar service, misalnya di database terpusat atau _cache_.
> >     
> > 
> >  #### Contoh: Aplikasi Catur
> >  
> > - **Desain Stateful:** State papan catur disimpan di memori server aplikasi. Jika ada 3 server, maka sebuah game terikat pada satu server spesifik. **Masalahnya:** Jika server itu _crash_, semua game di dalamnya hilang. Untuk melanjutkan game, user _harus_ terhubung ke server yang sama, ini menyulitkan _load balancing_.
> >     
> >  - **Desain Stateless:** State papan catur disimpan di database eksternal. Server aplikasi hanya berisi logika untuk memproses langkah. **Keuntungannya:** Setiap request dari user dapat dilayani oleh server mana pun. Ini memungkinkan _horizontal scaling_ yang mudah; cukup tambahkan instance server baru, dan _load balancer_ bisa mengarahkan traffic ke sana tanpa masalah.
> >      

> [!cornell] #### Summary
>  Aplikasi terdistribusi dapat dibangun dengan arsitektur monolithic, di mana semua komponen menjadi satu kesatuan, atau microservice, yang memecah aplikasi menjadi layanan-layanan kecil dan independen. Kunci utama untuk mencapai skalabilitas, terutama dalam arsitektur microservice, adalah dengan merancang service yang stateless. Dengan memindahkan state ke penyimpanan eksternal seperti database, setiap instance service menjadi identik dan dapat diganti, memungkinkan penambahan atau pengurangan server secara fleksibel sesuai dengan beban.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Di Mana 'State' Disimpan?
> 
> Jika service harus stateless, lalu di mana data sesi (seperti siapa user yang login atau isi keranjang belanja) disimpan?
> 
> - **Shared Database:** Pendekatan paling umum, seperti pada contoh aplikasi catur. Namun, database bisa menjadi _bottleneck_.
>     
> - **Distributed Cache:** Menggunakan layanan cache di-memori seperti **Redis** atau **Memcached**. Ini jauh lebih cepat daripada database untuk menyimpan data sesi yang sering diakses. Cache ini berada di luar service dan dapat diakses oleh semua instance.
>     
> - **Client-side Token:** Menyimpan state dalam token yang dikirim ke klien (misalnya, JSON Web Token - JWT). Klien akan mengirimkan token ini pada setiap request. Server kemudian bisa memvalidasi token untuk mendapatkan state tanpa perlu menyimpannya di sisi server.
>     
> 
> #### Tantangan Nyata Microservices
> 
> - **Service Discovery:** Bagaimana service A menemukan alamat jaringan service B? Ini memerlukan mekanisme registrasi dan penemuan service seperti Consul atau Eureka.
>     
> - **Distributed Tracing:** Saat sebuah request gagal, bagaimana cara melacak perjalanannya melewati 5 service yang berbeda untuk menemukan di mana letak kesalahannya? Ini memerlukan alat seperti Jaeger atau Zipkin.
>     
> - **Data Consistency:** Menjaga konsistensi data di beberapa database milik service yang berbeda adalah tantangan besar. Pola seperti _Saga pattern_ sering digunakan untuk menangani transaksi lintas layanan.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Pola Desain:** Cari tahu lebih lanjut tentang "The Twelve-Factor App", sebuah metodologi untuk membangun aplikasi _software-as-a-service_ yang sangat relevan dengan prinsip _statelessness_.
>     
> - **Buku:** "Building Microservices: Designing Fine-Grained Systems" oleh Sam Newman.
>