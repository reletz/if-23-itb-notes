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
> > - Apa fungsi Load Balancer?
> >     
> > - Apa itu 'rolling updates'?
> >     
> > - Beda Load Balancer NAT vs. Reverse Proxy?
> >     
> > - Apa keterbatasan Load Balancer lokal?
> >     
> > - Bagaimana DNS digunakan untuk Load Balancing?
> >     
> > - Apa itu Geographic Load Balancing?
> >     
> > - Apa itu CDN?
> >     
> > - Bagaimana cara kerja IP Anycast?
> >     
> > - Mengapa perlu Load Balancing 2 level?
> >     
> >
> > ## Reference Points
> > 
> > - Slides IF4031 Hal 53-67
> >     
> 
> > ### Load Balancer Lokal
> > 
> > **Load Balancer** adalah sebuah perangkat (hardware atau software) yang bertindak sebagai "gerbang depan" untuk sekelompok server (cluster). Fungsinya adalah mendistribusikan traffic/request yang masuk ke beberapa server di belakangnya, sehingga membuat cluster tersebut tampak seperti satu server super yang sangat kuat.
> > 
> > **Keuntungan Tambahan:**
> > 
> > - **Rolling Updates:** Memungkinkan pembaruan software tanpa _downtime_. Sebagian server bisa di-update sementara yang lain tetap melayani traffic, lalu dilakukan secara bergantian.
> >     
> > - **Health Checks:** Load balancer secara periodik memeriksa "kesehatan" setiap server. Jika ada server yang gagal merespons, load balancer akan berhenti mengirimkan traffic ke server tersebut.
> >     
> >
> > ### Jenis Load Balancer Lokal
> > 
> >  #### 1. IP/NAT Load Balancer
> >  
> >  Bekerja di level jaringan (IP layer). Ia hanya meneruskan paket dengan mengubah alamat IP dan port tujuan. Sangat cepat dan efisien karena tidak perlu memahami isi request (seperti HTTP). Dapat digunakan untuk semua jenis layanan, tidak hanya web.
> > 
> >  #### 2. Reverse Proxy Load Balancer
> >  
> >  Bekerja di level aplikasi (HTTP layer). Ia menerima seluruh request HTTP, lalu membuat koneksi baru untuk meneruskannya ke server internal. Karena "mengerti" HTTP, ia bisa melakukan fungsi tambahan seperti:
> >  
> >  - **SSL Termination:** Proses dekripsi HTTPS dilakukan di proxy, server internal tidak perlu terbebani.
> >      
> >  - **Caching:** Menyimpan response yang sering diminta.
> >      
> >  - Compression: Mengompres data sebelum dikirim ke klien.
> >      
> >      Contoh paling populer adalah Nginx dan HAProxy.
> >      
> >
> > ### Load Balancer Global
> > 
> > Load Balancer lokal memiliki keterbatasan: ia sendiri bisa menjadi _single point of failure_ dan hanya beroperasi di satu data center, sehingga tidak bisa mengurangi latensi untuk pengguna yang lokasinya jauh. Untuk skala global, diperlukan teknik lain.
> > 
> > #### 1. DNS Load Balancing (Round-Robin)
> > 
> >  DNS dapat dikonfigurasi untuk memberikan beberapa alamat IP yang berbeda untuk satu nama domain. Ketika klien melakukan query, DNS server akan memberikan salah satu alamat IP (misalnya secara bergiliran). Klien kemudian akan terhubung ke alamat IP yang diterimanya, sehingga traffic terdistribusi ke beberapa data center.
> > 
> >  #### 2. Geographic Load Balancing dengan DNS
> >  
> > Ini adalah versi cerdas dari DNS Load Balancing. DNS server akan mendeteksi lokasi geografis klien dari alamat IP-nya, lalu memberikan alamat IP dari data center yang secara fisik paling dekat dengan klien tersebut. Ini secara signifikan mengurangi latensi.
> > 
> >  #### 3. Content Delivery Network (CDN)
> >  
> >  CDN adalah jaringan server proxy yang tersebar secara global (_edge servers_). CDN menggunakan _Geographic DNS_ untuk mengarahkan pengguna ke _edge server_ terdekat. Server ini akan menyimpan _cache_ dari konten statis (gambar, video, CSS), sehingga konten dapat dikirimkan dengan sangat cepat tanpa harus mengambilnya dari server utama yang mungkin jauh.
> > 
> >  #### 4. IP Anycast
> >  
> >  Teknik canggih di mana banyak server di lokasi berbeda di seluruh dunia menggunakan alamat IP yang **sama persis**. Protokol routing internet (BGP) secara otomatis akan mengarahkan traffic pengguna ke server terdekat yang mengiklankan IP tersebut. Ini digunakan oleh layanan fundamental seperti DNS publik Google (8.8.8.8).

> [!cornell] #### Summary
> 
> Skalabilitas sistem terdistribusi dicapai melalui dua level load balancing. Di level lokal (dalam satu data center), NAT atau Reverse Proxy digunakan untuk mendistribusikan beban dan memastikan ketersediaan layanan melalui health checks. Untuk skala global, teknik seperti DNS Load Balancing, CDN, dan IP Anycast digunakan untuk mengarahkan pengguna ke data center atau edge server terdekat, yang bertujuan mengurangi latensi dan mendistribusikan traffic secara geografis di seluruh dunia.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Algoritma Penjadwalan Load Balancer
> 
> Selain Round-Robin (bergiliran), ada beberapa algoritma lain yang digunakan oleh load balancer:
> 
> - **Least Connections:** Mengirim request baru ke server yang sedang memiliki koneksi aktif paling sedikit. Berguna jika durasi request bervariasi.
>     
> - **IP Hash:** Menentukan server tujuan berdasarkan hash dari alamat IP klien. Ini memastikan bahwa seorang klien akan selalu dilayani oleh server yang sama, sebuah teknik yang disebut _sticky session_. Ini berguna untuk aplikasi _stateful_, meskipun desain _stateless_ lebih dianjurkan.
>     
> 
> #### Tantangan DNS Load Balancing: Caching dan TTL
> 
> Salah satu kelemahan utama menggunakan DNS untuk load balancing adalah _caching_. Resolver DNS di seluruh internet akan menyimpan (cache) hasil query untuk durasi tertentu yang disebut **Time-To-Live (TTL)**. Jika sebuah data center gagal dan Anda mengubah DNS record untuk menghapusnya, perubahan tersebut baru akan efektif dirasakan semua pengguna setelah TTL berakhir, yang bisa memakan waktu beberapa menit hingga jam.
> 
> #### Kapan Menggunakan IP Anycast?
> 
> IP Anycast sangat kuat tetapi juga sangat kompleks untuk diimplementasikan. Anda harus mengoperasikan _Autonomous System (AS)_ Anda sendiri dan berinteraksi langsung dengan protokol BGP, yang biasanya hanya dilakukan oleh perusahaan skala besar seperti penyedia layanan internet (ISP) atau raksasa teknologi (Google, Cloudflare). Untuk sebagian besar aplikasi, Geographic DNS dan CDN adalah solusi yang jauh lebih praktis.
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Software untuk Dicoba:**
>     
>     - **Nginx:** Coba konfigurasikan Nginx sebagai reverse proxy dan load balancer sederhana untuk dua web server lokal.
>         
>     - **HAProxy:** Dikenal sebagai load balancer yang sangat tangguh dan beperforma tinggi.
>         
> - **Layanan CDN:** Pelajari layanan seperti Cloudflare, Akamai, atau AWS CloudFront dan bagaimana mereka bisa mempercepat website Anda.
>