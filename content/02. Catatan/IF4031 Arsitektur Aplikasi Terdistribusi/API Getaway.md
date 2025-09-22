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
> > - Apa isu utama pengelolaan API?
> >     
> > - Apa itu API Gateway?
> >     
> > - Apa saja fungsi inti API Gateway?
> >     
> > - Apa itu _cross-cutting concerns_?
> >     
> > - Bagaimana evolusi teknologi API Gateway?
> >     
> > - Contoh: Arsitektur AWS API Gateway
> >     
> > - Apa itu _Stages_?
> >     
> > - Apa fungsi _Authorizer_?
> >     
> > - Bagaimana cara mengatur trafik?
> >     
> > - Apa saja aspek _Observability_?
> >     
> > - Contoh: Arsitektur Traefik
> >     
> >
> > ## Reference Points
> > 
> > - Slides 05-IF4031-05d-2023-APIGateway.pdf
> >     
> 
> > ### Isu dalam Pengelolaan API
> > 
> > Dalam arsitektur modern, terutama microservices, muncul dua tantangan utama dalam mengelola banyak API:
> > 
> > 1. **Manajemen Trafik**: Bagaimana cara mengarahkan, membatasi, dan memonitor lalu lintas permintaan yang masuk ke berbagai layanan.
> >     
> > 2. **Keamanan**: Bagaimana cara mengamankan setiap endpoint dari penyalahgunaan, serangan, dan akses yang tidak sah secara konsisten.
> >     
> > 
> > ### Apa itu API Gateway?
> > 
> > **API Gateway** adalah sebuah pola arsitektur yang bertindak sebagai **titik masuk tunggal (single entry point)** untuk semua client yang ingin mengakses layanan di backend. Ia berfungsi sebagai **reverse proxy** atau **façade** yang menyembunyikan kompleksitas arsitektur internal dari dunia luar.
> > 
> > Tujuannya adalah untuk:
> > 
> > - **Menyederhanakan Akses**: Client hanya perlu tahu satu alamat (endpoint gateway), bukan alamat dari puluhan atau ratusan microservice.
> >     
> > - **Mengurangi Coupling**: Perubahan pada layanan internal (misalnya, alamat IP berubah, layanan dipecah) tidak akan memengaruhi client, karena gateway yang akan menangani perutean baru.
> >     
> > - **Melindungi API**: Memberikan lapisan pertahanan terpusat terhadap penyalahgunaan (_overuse & abuse_).
> >     
> > - **Manajemen & Monetisasi**: Mengelola siklus hidup API (versi, staging, produksi) dan bahkan memungkinkan monetisasi (pengaturan akun, billing, pembayaran).
> >     
> > 
> > ### Fungsi Inti API Gateway
> > 
> > 1. **Routing**: Meneruskan permintaan masuk dari client ke layanan internal yang tepat berdasarkan aturan tertentu (seperti path URL, HTTP method, atau header).
> >     
> > 2. **Composition (Orkestrasi)**: Menggabungkan beberapa panggilan ke layanan internal yang _low-level_ menjadi satu respons tunggal yang lebih _high-level_. Misalnya, satu panggilan `GET /user-profile` di API Gateway bisa memicu panggilan konkuren ke layanan `UserService`, `OrderService`, dan `ReviewService` di backend.
> >     
> > 3. **Translation**: Mengubah protokol atau format data antara client dan server. Contohnya, API Gateway bisa mengekspos endpoint RESTful ke publik, tetapi di belakangnya ia berkomunikasi dengan layanan internal menggunakan gRPC atau menerjemahkan satu query GraphQL menjadi beberapa panggilan REST API internal.
> >     
> > 
> > ### Implementasi _Cross-Cutting Concerns_
> > 
> > Salah satu fungsi terpenting API Gateway adalah menangani **cross-cutting concerns**, yaitu fungsionalitas yang dibutuhkan oleh hampir semua layanan. Dengan memusatkannya di gateway, developer layanan tidak perlu mengimplementasikannya berulang kali.
> > 
> > Contoh _cross-cutting concerns_ yang ditangani gateway:
> > 
> > - **Authentication & Authorization**: Memverifikasi identitas client dan memeriksa hak aksesnya.
> >     
> > - **Rate Limiting**: Membatasi jumlah permintaan dari satu client dalam periode waktu tertentu untuk mencegah _overload_.
> >     
> > - **Timeout & Retries**: Mengatur batas waktu respons dan mekanisme coba lagi jika layanan backend gagal.
> >     
> > - **Logging & Tracing**: Mencatat semua permintaan dan melacak alurnya melalui berbagai layanan untuk keperluan debugging dan monitoring.
> >     
> > 
> > ### Evolusi Teknologi Gateway
> > 
> > - **1990s**: _Hardware Load Balancer_ (e.g., F5) sebagai gateway untuk web server.
> >     
> > - **2000s**: _Software Load Balancer_ (e.g., NGINX, HAProxy) menjadi populer.
> >     
> > - **Mid 2000s**: _Application Delivery Controllers_ (ADC) muncul, hardware khusus dengan fitur canggih seperti SSL offload, caching, dan traffic shaping.
> >     
> > - **Early 2010s - Sekarang**: Era **API Gateway** modern seperti Kong, NGINX Plus, dan layanan cloud seperti AWS API Gateway, GCP Apigee, serta solusi open-source seperti Traefik dan Zuul.
> >     
> > 
> > ### Contoh Implementasi
> > 
> > #### AWS API Gateway
> > 
> > Layanan terkelola dari AWS yang menyediakan endpoint publik dan terintegrasi erat dengan ekosistem AWS.
> > 
> > ![[Pasted image 20250922161124.png]]
> > - **Routing/Integration**: Permintaan masuk dapat dipetakan ke berbagai backend seperti AWS Lambda, Amazon EC2, DynamoDB, atau endpoint HTTP eksternal.
> >     
> > - **Stages**: Memungkinkan deployment API ke lingkungan yang berbeda (misalnya `dev`, `staging`, `prod`) atau untuk versioning (misalnya `v1`, `v2`).
> >     
> > - **Authorizers**: Konfigurasi terpusat untuk otorisasi, bisa menggunakan AWS Cognito atau fungsi Lambda kustom.
> >     
> > - **Usage Plans**: Mengatur _throttling_ (rate & burst limit) dan _quota_ (jumlah permintaan per periode) untuk setiap API key, berguna untuk monetisasi atau pembatasan akses.
> >     
> > - **Observability**: Terintegrasi dengan Amazon CloudWatch untuk metrik (jumlah panggilan, latensi, error) dan AWS X-Ray untuk _distributed tracing_ (melacak alur satu permintaan melalui berbagai layanan).
> >     
> > 
> > #### Traefik
> > 
> > Sebuah _edge router_ dan _reverse proxy_ modern yang dirancang untuk microservices.
> > ![[Pasted image 20250922161203.png]]
> > 
> > - **Arsitektur**:
> >     
> >     - **Entrypoints**: Mendefinisikan port yang akan menerima trafik (e.g., port 80 untuk HTTP).
> >         
> >     - **Routers**: Menganalisis permintaan masuk dan menentukan ke mana harus pergi berdasarkan _Rules_ (e.g., Host, Path).
> >         
> >     - **Middlewares**: Dapat memodifikasi permintaan sebelum diteruskan ke layanan (e.g., menambahkan header otentikasi).
> >         
> >     - **Services**: Menunjuk ke backend server yang sebenarnya.
> >         
> > - **Providers**: Traefik dapat secara otomatis mendeteksi layanan dari berbagai sumber seperti Docker atau Kubernetes.
> >     

> [!cornell] #### Summary
> 
> API Gateway adalah komponen krusial dalam arsitektur terdistribusi yang bertindak sebagai gerbang utama untuk semua permintaan eksternal, menyederhanakan interaksi client dengan menyembunyikan kompleksitas sistem backend. Ia tidak hanya berfungsi untuk merutekan, menyusun, dan menerjemahkan permintaan, tetapi juga secara terpusat menangani fungsionalitas non-bisnis yang esensial (cross-cutting concerns) seperti keamanan (otentikasi, otorisasi), manajemen trafik (rate limiting, quota), dan observabilitas (logging, monitoring, tracing), sehingga memungkinkan tim pengembang untuk fokus pada logika bisnis inti layanan mereka.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: API Gateway sebagai _Single Point of Failure_
> 
> Karena semua trafik melewati API Gateway, ia berpotensi menjadi _Single Point of Failure_ (SPOF). Jika gateway mati, seluruh aplikasi tidak dapat diakses. Untuk mitigasi risiko ini, API Gateway harus dirancang untuk memiliki **ketersediaan tinggi (high availability)** dengan menjalankan beberapa instance di zona ketersediaan yang berbeda dan menggunakan load balancer di depannya.
> 
> #### Pendalaman Teknis: Pola Backend for Frontend (BFF)
> 
> Dalam beberapa kasus, satu API Gateway tunggal mungkin tidak cukup. Pola BFF menyarankan untuk membuat beberapa API Gateway yang disesuaikan untuk kebutuhan client yang berbeda. Misalnya, ada satu gateway untuk aplikasi mobile (yang mungkin membutuhkan payload lebih kecil) dan satu lagi untuk aplikasi web (yang bisa menangani data lebih kaya). Setiap BFF ini akan mengorkestrasi layanan backend sesuai dengan kebutuhan UI frontend-nya masing-masing.
> 
> #### Eksplorasi Mandiri
> 
> Coba implementasikan API Gateway sederhana menggunakan salah satu tool open-source berikut:
> 
> 1. **Buat dua microservice sederhana**: Gunakan Node.js/Express atau Python/Flask. Satu service `users` (misal di port 3001) dan satu service `products` (di port 3002).
>     
> 2. **Deploy API Gateway**: Install **Kong** atau **Traefik** menggunakan Docker.
>     
> 3. **Konfigurasi Rute**:
>     
>     - Atur gateway agar permintaan ke `/api/users` diteruskan ke service `users` di port 3001.
>         
>     - Atur gateway agar permintaan ke `/api/products` diteruskan ke service `products` di port 3002.
>         
> 4. **Terapkan Plugin/Middleware**: Coba tambahkan plugin rate-limiting pada salah satu rute.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Dokumentasi AWS API Gateway**: [docs.aws.amazon.com/apigateway/](https://docs.aws.amazon.com/apigateway/ "null")
>     
> - **Dokumentasi Traefik Proxy**: [doc.traefik.io/traefik/](https://doc.traefik.io/traefik/ "null")
>     
> - **Dokumentasi Kong API Gateway**: [docs.konghq.com/gateway/](https://docs.konghq.com/gateway/ "null")
>     
> - **Artikel Pola API Gateway oleh NGINX**: [nginx.com/blog/building-microservices-using-an-api-gateway/](https://www.nginx.com/blog/building-microservices-using-an-api-gateway/ "null")
>