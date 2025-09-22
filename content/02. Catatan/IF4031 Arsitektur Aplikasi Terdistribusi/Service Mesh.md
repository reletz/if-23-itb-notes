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
> > - Apa itu Service Mesh?
> >     
> > - Apa fokus utama Service Mesh?
> >     
> > - Apa saja fitur utama Service Mesh?
> >     
> > - Apa itu Control Plane & Data Plane?
> >     
> > - Bagaimana arsitektur Service Mesh?
> >     
> > - Apa itu Pola Sidecar Proxy?
> >     
> > - Apa bedanya dengan API Gateway?
> >     
> >
> > ## Reference Points
> > 
> > - Slides 05-IF4031-05d-2023-APIGateway.pdf
> >     
> 
> > ### Apa itu Service Mesh?
> > 
> > **Service Mesh** adalah sebuah **lapisan infrastruktur (infrastructure layer)** khusus yang didedikasikan untuk mengelola dan mengontrol semua komunikasi antar layanan (service-to-service) dalam sebuah aplikasi terdistribusi. Lapisan ini memungkinkan semua konfigurasi jaringan dikelola dari satu titik pusat yang disebut _control plane_.
> > 
> > Tujuannya adalah untuk memisahkan logika jaringan dari logika bisnis. Dengan begitu, developer bisa fokus membangun fitur layanan, sementara Service Mesh menangani kompleksitas komunikasi jaringan seperti routing, keamanan, dan observabilitas.
> > 
> > ### Fokus Utama: Komunikasi Internal (East-West Traffic)
> > 
> > Berbeda dengan API Gateway yang fokus pada trafik masuk dari luar ke dalam sistem (_North-South traffic_), Service Mesh fokus pada komunikasi **antar layanan di dalam sistem** (_East-West traffic_). Ia menyediakan fungsionalitas yang mirip dengan API Gateway, tetapi untuk lingkup internal.
> > 
> > Contoh teknologi Service Mesh populer: **Istio/Envoy, Linkerd, Consul, AWS App Mesh**.
> > 
> > ### Fitur Utama Service Mesh
> > 
> > Service Mesh menyediakan serangkaian fitur canggih untuk mengelola komunikasi internal:
> > 
> > - **Observability**: Menyediakan metrik, log, dan _trace_ secara otomatis untuk semua layanan, memberikan visibilitas mendalam tentang bagaimana layanan berinteraksi.
> >     
> > - **Routing & Traffic Shaping**: Pengaturan routing yang dinamis (misalnya, _canary deployments_, _A/B testing_), _load balancing_, dan manajemen trafik lainnya.
> >     
> > - **Resiliency**: Mengimplementasikan pola ketahanan seperti _retries_, _timeouts_, dan _circuit breakers_ secara otomatis.
> >     
> > - **Trust & Security**: Mengamankan komunikasi antar layanan dengan menerapkan mTLS (_mutual TLS_) secara otomatis, serta mengelola sertifikat dan kebijakan akses (_authorization_).
> >     
> > - **Automatic Service Discovery**: Secara otomatis mendeteksi dan mendaftarkan layanan baru saat mereka muncul atau hilang dari sistem.
> >     
> > - **Separation of Duties**: Memungkinkan tim platform/operasi untuk mengelola jaringan secara independen dari tim pengembang.
> >     
> > 
> > ### Konsep Inti: Control Plane & Data Plane
> > 
> > Arsitektur Service Mesh secara fundamental terbagi menjadi dua bagian:
> > 
> > 1. **Control Plane**: Ini adalah "otak" dari Service Mesh. Fungsinya adalah untuk mengatur dan mendistribusikan konfigurasi ke semua proxy di dalam mesh.
> >     
> >     - **Karakteristik**: Volume trafik rendah, mengutamakan **konsistensi** konfigurasi di atas ketersediaan. Jika Control Plane mati sementara, trafik data tetap berjalan dengan konfigurasi terakhir.
> >         
> > 2. **Data Plane**: Ini adalah bagian yang menangani lalu lintas data/permintaan pengguna secara langsung. Terdiri dari serangkaian _proxy_ (biasanya diimplementasikan sebagai _sidecar_) yang berjalan di samping setiap instance layanan.
> >     
> >     - **Karakteristik**: Volume trafik tinggi, mengutamakan **kecepatan dan ketersediaan**.
> >         
> > 
> > Pemisahan ini sangat penting untuk skalabilitas dan ketahanan. Jalur konfigurasi (Control Plane) tidak mengganggu jalur data (Data Plane).
> > 
> > ### Arsitektur & Pola Sidecar Proxy
> > 
> > Service Mesh diimplementasikan menggunakan pola **Sidecar Proxy**.
> > 
> > - **Sidecar Proxy**: Sebuah proxy jaringan (seperti Envoy) di-_deploy_ di samping setiap container aplikasi/layanan. Semua lalu lintas jaringan yang masuk dan keluar dari layanan tersebut akan dicegat dan dikelola oleh proxy ini.
> >     
> > - **Interaksi**:
> >     
> >     1. Layanan A ingin berkomunikasi dengan Layanan B.
> >         
> >     2. Permintaan dari Layanan A dicegat oleh Sidecar Proxy-nya.
> >         
> >     3. Sidecar Proxy A, berdasarkan konfigurasi dari Control Plane, menerapkan kebijakan (keamanan, routing, dll.) dan meneruskan permintaan ke Sidecar Proxy B.
> >         
> >     4. Sidecar Proxy B menerima permintaan, menerapkan kebijakannya, lalu meneruskannya ke Layanan B.
> >         
> > 
> > Aplikasi itu sendiri tidak sadar bahwa ada proxy yang mencegat komunikasinya.
> > 
> > ### Perbedaan Service Mesh vs. API Gateway
> > 
> > |**Aspek**|**API Gateway**|**Service Mesh**|
> > |---|---|---|
> > |**Fokus Utama**|Mengelola trafik dari luar ke dalam sistem (**North-South Traffic**).|Mengelola trafik antar layanan di dalam sistem (**East-West Traffic**).|
> > |**Tujuan**|Menyediakan satu titik masuk, melindungi, dan menyederhanakan akses ke backend API.|Menyediakan komunikasi yang aman, andal, dan dapat diamati antar layanan internal.|
> > |**Posisi**|Berada di "tepi" (edge) arsitektur, antara client dan sistem.|Terdistribusi di seluruh arsitektur, berjalan di samping setiap layanan.|
> > |**Fungsi Khas**|Komposisi API, monetisasi, manajemen siklus hidup API.|mTLS otomatis, _service discovery_, _circuit breaking_, _traffic shifting_ internal.|
> > |**Penggabungan**|Keduanya sering digunakan bersama. API Gateway mengelola trafik masuk, lalu menyerahkannya ke layanan pertama dalam Service Mesh untuk komunikasi internal lebih lanjut.|Sama.|

> [!cornell] #### Summary
> 
> Service Mesh adalah sebuah lapisan infrastruktur terdedikasi yang mengelola komunikasi antar layanan (East-West traffic) dalam arsitektur microservices melalui sebuah Control Plane terpusat dan Data Plane yang terdistribusi. Dengan menggunakan pola Sidecar Proxy untuk mencegat semua trafik, Service Mesh menyediakan fitur-fitur krusial seperti keamanan (mTLS), observabilitas, dan ketahanan (resiliency) secara transparan, membebaskan pengembang dari kompleksitas logika jaringan dan memungkinkan pengelolaan yang konsisten di seluruh sistem.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: Envoy Proxy
> 
> Sebagian besar implementasi Service Mesh modern (seperti Istio dan AWS App Mesh) menggunakan **Envoy** sebagai proxy di Data Plane mereka. Envoy adalah proxy L7 open-source berkinerja tinggi yang dikembangkan di Lyft. Keunggulannya adalah API konfigurasinya yang dinamis, yang memungkinkannya menerima pembaruan dari Control Plane tanpa perlu me-restart, menjadikannya pilihan ideal untuk lingkungan yang dinamis seperti Kubernetes.
> 
> #### Pendalaman Teknis: Peran dalam Kubernetes
> 
> Service Mesh sangat bersinar di lingkungan orkestrasi kontainer seperti Kubernetes. Kubernetes menyediakan fitur jaringan dasar, tetapi Service Mesh melengkapinya dengan kemampuan yang jauh lebih canggih. Misalnya, Kubernetes `Service` menyediakan _load balancing_ Layer 4 (TCP), sementara Service Mesh dapat melakukan _load balancing_ Layer 7 (HTTP) yang lebih cerdas berdasarkan header atau path.
> 
> #### Eksplorasi Mandiri
> 
> Cara terbaik untuk memahami Service Mesh adalah dengan mencobanya.
> 
> 1. **Siapkan Klaster Kubernetes**: Gunakan Minikube atau kind untuk membuat klaster Kubernetes lokal.
>     
> 2. **Deploy Aplikasi Contoh**: Deploy aplikasi microservices sederhana, misalnya aplikasi _bookinfo_ yang disediakan oleh Istio.
>     
> 3. **Install Istio**: Ikuti panduan instalasi Istio untuk menyuntikkan (_inject_) sidecar Envoy ke dalam aplikasi Anda.
>     
> 4. **Eksperimen dengan Fitur**:
>     
>     - Gunakan _Traffic Shifting_ untuk mengarahkan 90% trafik ke versi v1 dari sebuah layanan dan 10% ke v2.
>         
>     - Gunakan _Request Timeouts_ untuk membuat layanan gagal lebih cepat jika dependensinya lambat.
>         
>     - Visualisasikan topologi layanan dan metrik trafik menggunakan Kiali, salah satu addon Istio.
>         
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Dokumentasi Istio**: [istio.io](https://istio.io/latest/docs/ "null")
>     
> - **Dokumentasi Linkerd**: [linkerd.io/2/overview/](https://linkerd.io/2/overview/ "null")
>     
> - **Penjelasan Service Mesh oleh Red Hat**: [www.redhat.com/en/topics/microservices/what-is-a-service-mesh](https://www.redhat.com/en/topics/microservices/what-is-a-service-mesh "null")
>