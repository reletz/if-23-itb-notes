---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> [!cornell] 8 Fallacies (Kesalahpahaman) dalam Sistem Terdistribusi
> 
> > ## Questions/Cues
> > 
> > - Apa itu 'Fallacies of Distributed Computing'?
> >     
> > - Siapa yang merumuskan?
> >     
> > - Fallacy 1?
> >     
> > - Fallacy 2?
> >     
> > - Fallacy 3?
> >     
> > - Fallacy 4?
> >     
> > - Fallacy 5?
> >     
> > - Fallacy 6?
> >     
> > - Fallacy 7?
> >     
> > - Fallacy 8?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 34-38
> >     
> 
> > ### Pengantar 8 Fallacies
> > 
> > - Dirumuskan oleh L. Peter Deutsch.
> >     
> > - Ini adalah delapan asumsi atau kepercayaan yang _salah_ yang sering dimiliki oleh programmer saat pertama kali membangun aplikasi terdistribusi.
> >     
> > - Mempercayai hal-hal ini akan menyebabkan desain sistem yang rapuh, tidak andal, dan tidak aman.
> >     
> > - Programmer sistem terdistribusi yang baik harus selalu berasumsi bahwa _kebalikan_ dari _fallacy_ inilah yang benar.
> >     
> > 
> > ### Fallacy 1: Network is reliable (Jaringan itu andal)
> > 
> > - **Kesalahpahaman:** Menganggap jaringan akan selalu berfungsi.
> >     
> > - **Realitas:** Jaringan _pasti_ akan gagal.
> >     
> > - Contoh: Switch canggih mungkin punya MTBF (Mean Time Between Failures) 50.000+ jam, tapi itu bukan tak terbatas. Kegagalan bisa terjadi karena: _power failure_ (listrik mati), _human error_ (salah konfigurasi), _burst traffic_, faktor eksternal (kabel putus), atau serangan (DDoS attack).
> >     
> > - **Implikasi:** Aplikasi harus bisa menangani paket yang hilang, koneksi yang putus, dan _timeout_.
> >     
> > 
> > ### Fallacy 2: Latency is zero (Latensi adalah nol)
> > 
> > - **Kesalahpahaman:** Menganggap pengiriman data via jaringan itu instan.
> >     
> > - **Realitas:** Selalu ada penundaan (latency), dan bisa jadi sangat besar.
> >     
> > - Contoh: Komunikasi dalam satu Data Center mungkin (misal) < 1ms, tapi komunikasi antar benua (WAN) bisa ratusan milidetik. Bahkan request AJAX di web yang terlihat cepat pun memiliki latensi.
> >     
> > - **Implikasi:** Desain harus memperhitungkan latensi. Terlalu banyak bolak-balik (chatty) antar servis akan membunuh kinerja.
> >     
> > 
> > ### Fallacy 3: Bandwidth is infinite (Bandwidth tidak terbatas)
> > 
> > - **Kesalahpahaman:** Menganggap kita bisa mengirim data sebanyak apapun secepat apapun.
> >     
> > - **Realitas:** Bandwidth adalah sumber daya yang terbatas dan mahal.
> >     
> > - **Implikasi:** Aplikasi harus efisien dalam penggunaan data. Hindari pengiriman data besar yang tidak perlu. Pertimbangkan kompresi dan serialisasi yang efisien.
> >     
> > 
> > ### Fallacy 4: Network is secure (Jaringan itu aman)
> > 
> > - **Kesalahpahaman:** Menganggap tidak ada orang jahat di jaringan, terutama di jaringan internal (intranet).
> >     
> > - **Realitas:** Jaringan (terutama internet) adalah lingkungan yang _hostile_ (bermusuhan).
> >     
> > - Contoh: Serangan internet tumbuh 64% per tahun (data Rip Tech).
> >     
> > - **Implikasi:** JANGAN PERNAH percaya input dari jaringan. Selalu asumsikan data bisa disadap (butuh enkripsi), diubah (butuh verifikasi/integritas), atau dipalsukan (butuh autentikasi).
> >     
> > 
> > ### Fallacy 5: Topology does not change (Topologi tidak berubah)
> > 
> > - **Kesalahpahaman:** Menganggap tata letak jaringan, IP address, dan rute bersifat statis.
> >     
> > - **Realitas:** Topologi jaringan berubah _secara konstan_.
> >     
> > - Contoh: Node baru ditambahkan, node lama mati, rute jaringan berubah karena kegagalan, laptop/HP berpindah jaringan (WiFi ke 4G).
> >     
> > - **Implikasi:** Aplikasi tidak boleh melakukan _hardcode_ pada alamat IP atau rute. Gunakan _service discovery_ (seperti DNS) untuk menemukan layanan lain.
> >     
> > 
> > ### Fallacy 6: There is one administrator (Hanya ada satu administrator)
> > 
> > - **Kesalahpahaman:** Menganggap seluruh sistem (client, server, jaringan) dikelola oleh satu orang atau satu tim yang maha tahu dan terkoordinasi.
> >     
> > - **Realitas:** Dalam sistem besar, ada banyak admin dari tim, departemen, atau bahkan perusahaan yang berbeda (misal: admin jaringan, admin database, admin server, admin di sisi client).
> >     
> > - **Implikasi:** Sistem harus bisa dikelola, di-debug, dan di-upgrade tanpa memerlukan koordinasi penuh dari semua pihak. _Logging_ dan _monitoring_ yang baik menjadi sangat penting.
> >     
> > 
> > ### Fallacy 7: Transport cost is zero (Biaya transport adalah nol)
> > 
> > - **Kesalahpahaman:** Menganggap biaya (CPU, memori) untuk mengirim dan menerima data di jaringan itu gratis.
> >     
> > - **Realitas:** Proses _packing_ (serialisasi), _sending_ (menjalankan network stack OS), _receiving_, dan _unpacking_ (deserialisasi) data membutuhkan sumber daya CPU dan memori yang signifikan.
> >     
> > - **Implikasi:** Mengirim banyak pesan kecil bisa jadi lebih boros CPU daripada mengirim satu pesan besar.
> >     
> > 
> > ### Fallacy 8: Network is homogeneous (Jaringan itu seragam)
> > 
> > - **Kesalahpahaman:** Menganggap semua komputer dan perangkat di jaringan itu sama (hardware, OS, arsitektur CPU, bahasa).
> >     
> > - **Realitas:** Jaringan (terutama internet) sangat _heterogen_. Ada server Linux, PC Windows, Mac, HP Android, iPhone, IoT, dll.
> >     
> > - **Implikasi:** Gunakan protokol dan format data standar (seperti HTTP, JSON, Protobuf) untuk memastikan interoperabilitas. Waspadai hal-hal seperti _endianness_ (byte order) jika mengirim data biner.
> >     

> [!cornell] #### Summary
> 
> **Terdapat delapan asumsi salah (Fallacies) yang dirumuskan oleh Peter Deutsch, yang harus dihindari saat membangun sistem terdistribusi. Programmer harus berasumsi bahwa jaringan itu** _**tidak andal**_**, memiliki** _**latensi**_**,** _**bandwidth terbatas**_**, dan** _**tidak aman**_**. Selain itu, topologi jaringan** _**selalu berubah**_**, ada** _**banyak administrator**_**, proses transport data itu** _**memakan biaya**_ **(CPU), dan jaringan itu** _**heterogen**_ **(beragam). Mengabaikan realitas ini akan menghasilkan sistem yang gagal.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman: Pola Desain (Design Patterns) untuk Mengatasi Fallacies
> 
> Mengetahui _fallacies_ adalah langkah pertama. Langkah kedua adalah menerapkan pola desain (design patterns) untuk mengatasinya. Slide meminta Anda untuk mempelajari ini, jadi berikut adalah beberapa pola penting:
> 
> - **vs. Fallacy 1 (Jaringan tidak andal) & 2 (Latensi tinggi):**
>     
>     - **Retry Pattern:** Jika panggilan jaringan gagal (timeout atau error), coba lagi.
>         
>     - **Exponential Backoff:** Jangan langsung _retry_ beruntun (bisa memperburuk masalah/DDoS). Tunggu 1 detik, coba lagi. Gagal? Tunggu 2 detik, coba lagi. Gagal? Tunggu 4 detik... Ini memberi waktu bagi layanan yang gagal untuk pulih.
>         
>     - **Circuit Breaker Pattern:** Jika sebuah layanan terus-menerus gagal, "putuskan sirkuit" (Circuit Breaker _trips_). Semua panggilan ke layanan itu akan langsung gagal (fast-fail) tanpa melalui jaringan, menghemat sumber daya. Setelah beberapa waktu, sirkuit akan mencoba "setengah terbuka" (half-open) untuk melihat apakah layanan sudah pulih.
>         
> - **vs. Fallacy 4 (Jaringan tidak aman):**
>     
>     - **Zero Trust Architecture (ZTA):** Asumsikan _tidak ada_ jaringan yang aman, bahkan jaringan internal perusahaan. _Setiap_ permintaan, dari mana pun asalnya, harus di-autentikasi (siapa Anda?) dan di-otorisasi (apa yang boleh Anda lakukan?).
>         
>     - **mTLS (Mutual TLS):** Tidak hanya _client_ yang memverifikasi _server_ (seperti HTTPS biasa), tetapi _server_ juga memverifikasi _client_. Ini memastikan komunikasi aman antar _microservices_.
>         
> - **vs. Fallacy 5 (Topologi berubah):**
>     
>     - **Service Discovery:** Jangan _hardcode_ IP address. Gunakan DNS atau _service registry_ (seperti Consul atau etcd) di mana layanan mendaftarkan diri saat _online_ dan dihapus saat _offline_. Aplikasi lain akan "menemukan" (discover) lokasi layanan dari registry ini.
>         
> - **vs. Fallacy 7 (Transport cost tinggi):**
>     
>     - **Request Bundling / Batching:** Jika Anda perlu mengirim 100 pesan kecil, jangan buat 100 panggilan jaringan. Gabungkan (bundle) menjadi satu pesan besar dan buat satu panggilan jaringan. Ini secara drastis mengurangi _overhead_ serialisasi dan network stack.
>         
> 
> #### Eksplorasi Mandiri
> 
> - **Service Mesh (misal: Istio, Linkerd):** Ini adalah _tools_ modern yang bertindak sebagai _middleware_ (lihat Catatan 3) yang mengimplementasikan banyak pola di atas secara otomatis (Circuit Breaking, Retries, mTLS) tanpa harus mengubah kode aplikasi Anda.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **Artikel:** "The 8 Fallacies of Distributed Computing" (Cari artikel asli atau penjelasannya oleh Arnon Rotem-Gal-Oz).
>     
> - **Pola Desain:** "Cloud Design Patterns" (Dokumentasi Microsoft Azure memiliki penjelasan bagus tentang Retry, Circuit Breaker, dll.)
>