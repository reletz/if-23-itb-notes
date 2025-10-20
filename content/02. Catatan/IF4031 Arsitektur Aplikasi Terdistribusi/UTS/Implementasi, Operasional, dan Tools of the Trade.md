---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Implementasi, Operasional, dan Tools of the Trade
> 
> > ## Questions/Cues
> > 
> > - Apa tantangan operasional utama?
> >     
> > - Apa itu **Service Discovery**?
> >     
> > - Bagaimana mengatasi **Fan Out**?
> >     
> > - Apa itu **Client-Side Load Balancing**?
> >     
> > - Apa itu **Observability**?
> >     
> > - Apa peran **Netflix OSS**?
> >     
> > - Apa itu **SideCar Pattern**?
> >     
> > - Apa gunanya **Prana**?
> >     
> > - Bagaimana mengelola _deployment_?
> >     
> > - Apa itu _Red/Black push_?
> >     
> > 
> > ## Reference Points
> > 
> > - 07-IF4031-Microservices.pdf (hampir seluruh dokumen)
> >     
> 
> > ### Tantangan Operasional
> > 
> > Mengelola puluhan atau ratusan layanan memperkenalkan kompleksitas operasional yang signifikan. DevOps menjadi model yang mutlak diperlukan.
> > 
> > **1. Service Discovery**
> > 
> > Di lingkungan cloud yang dinamis, instance layanan bisa muncul dan menghilang (karena auto-scaling, deployment, atau kegagalan). Alamat IP mereka tidak tetap.
> > 
> > - **Masalah:** Bagaimana layanan A bisa menemukan alamat IP layanan B yang sedang berjalan?
> >     
> > - **Solusi:** Sebuah **Service Registry** (seperti **Netflix Eureka**). Saat sebuah _instance_ layanan dimulai, ia mendaftarkan dirinya (alamat IP dan port) ke _Registry_. Ketika layanan lain ingin memanggilnya, ia akan bertanya ke _Registry_ untuk mendapatkan daftar alamat yang tersedia.
> >     
> > 
> > **2. Chattiness dan Fan Out**
> > 
> > Satu permintaan masuk dari pengguna (misalnya, ke API Gateway) dapat "menyebar" (fan out) menjadi puluhan atau ratusan permintaan ke layanan-layanan internal. Ini meningkatkan lalu lintas jaringan secara eksponensial dan bisa menciptakan bottleneck.
> > 
> > - **Solusi:**
> >     
> >     - **Caching Agresif:** Simpan hasil dari panggilan layanan yang sering diakses.
> >         
> >     - **Passing Data via Headers:** Daripada setiap layanan harus memanggil layanan `User Account` untuk mendapatkan detail pengguna, informasi tersebut dapat dilewatkan di _HTTP Header_ dari satu layanan ke layanan berikutnya.
> >         
> > 
> > ### Praktik Terbaik dan Pola Implementasi
> > 
> > **1. Client-Side Smart Load Balancers**
> > 
> > - **Load Balancer Tradisional (Proxy):** Klien memanggil satu alamat _load balancer_, yang kemudian mendistribusikan lalu lintas ke beberapa _instance_ di belakangnya.
> >     
> > - **Client-Side Load Balancer (Contoh: Netflix Ribbon):** Klien (pemanggil layanan) mendapatkan daftar semua _instance_ yang tersedia dari _Service Registry_. Klien itu sendiri yang kemudian memilih _instance_ mana yang akan dipanggil berdasarkan algoritma tertentu (misalnya, _round-robin_). Ini menghilangkan satu _hop_ jaringan dan memberikan lebih banyak kecerdasan pada klien.
> >     
> > 
> > **2. Isolasi dan Keamanan**
> > 
> > Setiap layanan harus diisolasi. Di AWS, ini dapat dicapai dengan menggunakan Security Groups untuk secara ketat mengontrol port dan alamat IP mana yang diizinkan untuk berkomunikasi dengan layanan tersebut.
> > 
> > **3. SideCar Pattern untuk Ekosistem Polyglot**
> > 
> > Ketika Anda memiliki layanan yang ditulis dalam berbagai bahasa (Java, Python, Node.js - sebuah ekosistem polyglot), sulit untuk menyediakan fungsionalitas umum seperti service discovery, monitoring, atau circuit breaking secara konsisten.
> > 
> > - **Solusi:** **SideCar Pattern**. Sebuah proses kecil ("sidecar") di-_deploy_ di samping setiap _instance_ aplikasi utama. Aplikasi utama berkomunikasi dengan dunia luar melalui _sidecar_ ini. _Sidecar_ menangani semua interaksi jaringan dan fungsionalitas infrastruktur. Contoh dari Netflix adalah **Prana**, sebuah _sidecar_ yang memungkinkan aplikasi non-JVM untuk terintegrasi dengan ekosistem infrastruktur Netflix (Eureka, Archaius, dll.).
> >     
> > 
> > ### Observability: Memahami Sistem yang Kompleks
> > 
> > Observability adalah kemampuan untuk memahami keadaan internal sistem hanya dengan melihat _output_ eksternalnya. Ini lebih dari sekadar _monitoring_ biasa dan terdiri dari tiga pilar:
> > 
> > 1. **Logging:** Mengumpulkan log terpusat dari semua layanan (misalnya, menggunakan ELK Stack).
> >     
> > 2. **Metrics:** Mengumpulkan metrik numerik (misalnya, jumlah permintaan per detik, latensi, penggunaan CPU) dari setiap layanan. **Netflix Servo** adalah _library_ untuk ini.
> >     
> > 3. **Distributed Tracing:** Melacak alur sebuah permintaan saat melewati beberapa layanan. Setiap permintaan diberi ID unik yang dibawa ke setiap layanan, memungkinkan visualisasi dependensi dan identifikasi _bottleneck_.
> >     
> > 
> > ### Deployment dan Tools of the Trade
> > 
> > #### Deployment Strategy: Red/Black (Blue/Green) Pushes
> > 
> > Ini adalah strategi deployment tanpa downtime.
> > 
> > 1. Versi baru dari layanan ("Black") di-_deploy_ di samping versi lama yang sedang berjalan ("Red").
> >     
> > 2. Lalu lintas masih sepenuhnya diarahkan ke versi Red.
> >     
> > 3. Setelah versi Black lolos semua tes, _load balancer_ dialihkan untuk mengirim semua lalu lintas baru ke versi Black.
> >     
> > 4. Versi Red tetap siaga untuk rollback cepat jika terjadi masalah, sebelum akhirnya dimatikan.
> >     
> >     Netflix Asgard adalah tool yang digunakan untuk mengelola deployment semacam ini.
> >     
> > 
> > #### Netflix OSS (Open Source Software)
> > 
> > Netflix telah membuka banyak sekali tools infrastruktur mereka yang menjadi standar de-facto dalam membangun microservices, terutama di ekosistem JVM:
> > 
> > - **Eureka:** Service Discovery.
> >     
> > - **Ribbon:** Client-Side Load Balancing.
> >     
> > - **Hystrix:** Fault Tolerance (Circuit Breaker).
> >     
> > - **Archaius:** Konfigurasi dinamis.
> >     
> > - **Zuul:** API Gateway (versi lebih lama).
> >     

> [!cornell] #### Summary
> 
> **Implementasi microservice pada skala besar memerlukan penanganan tantangan operasional yang kompleks seperti Service Discovery menggunakan Service Registry (Eureka), dan mitigasi Fan Out melalui caching dan penyebaran data via header. Praktik terbaik meliputi penggunaan Client-Side Load Balancer (Ribbon) dan SideCar Pattern (Prana) untuk ekosistem polyglot, didukung oleh Observability yang kuat (logging, metrics, tracing) dan strategi deployment canggih seperti Red/Black. Ekosistem Netflix OSS menyediakan serangkaian tools yang teruji untuk mengatasi sebagian besar tantangan ini.**

> [!ad-libitum]- Additional Information
> 
> #### Arsitektur Internal Eureka
> 
> Eureka memiliki arsitektur client-server:
> 
> - **Eureka Server (Registry):** Setiap server adalah _peer_ dalam sebuah klaster. Mereka mereplikasi status pendaftaran satu sama lain. Desain ini mengutamakan ketersediaan (_Availability_) daripada konsistensi (_Consistency_) - ini sesuai dengan teorema CAP. Artinya, bahkan jika beberapa server terputus (partisi jaringan), klien masih bisa mendapatkan daftar layanan (meskipun mungkin sedikit usang).
>     
> - **Eureka Client:** Terintegrasi di dalam setiap microservice. Bertanggung jawab untuk:
>     
>     - **Register:** Mendaftarkan dirinya ke Eureka Server saat _startup_.
>         
>     - **Renew (Heartbeat):** Secara berkala mengirim sinyal "hidup" ke server untuk menandakan bahwa ia masih sehat. Jika server tidak menerima _heartbeat_ dalam periode tertentu, ia akan menghapus _instance_ tersebut dari daftar.
>         
>     - **Fetch Registry:** Secara berkala mengambil salinan _registry_ dari server dan menyimpannya di _cache_ lokal untuk kecepatan dan ketahanan.
>         
> 
> #### Deployment: Canary vs. Blue/Green
> 
> - **Blue/Green (Red/Black):** Mengalihkan 100% lalu lintas ke versi baru secara sekaligus. Ini sederhana dan memungkinkan _rollback_ instan. Namun, ini adalah pendekatan "semua atau tidak sama sekali".
>     
> - **Canary Release:** Pendekatan yang lebih hati-hati. Versi baru dirilis dan hanya sebagian kecil lalu lintas (misalnya, 1% atau 5%) yang diarahkan ke sana. Tim memonitor metrik performa dan _error rate_ secara ketat. Jika semuanya baik-baik saja, persentase lalu lintas secara bertahap ditingkatkan hingga mencapai 100%. Ini meminimalkan dampak jika ada _bug_ di rilis baru, tetapi memerlukan infrastruktur dan _monitoring_ yang lebih canggih.
>