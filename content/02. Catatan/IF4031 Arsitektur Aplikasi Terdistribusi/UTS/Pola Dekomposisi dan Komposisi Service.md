---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Pola Dekomposisi dan Komposisi Service
> 
> > ## Questions/Cues
> > 
> > - Apa itu Pola Dekomposisi?
> >     
> > - Bagaimana cara memecah berdasarkan **kapabilitas bisnis**?
> >     
> > - Apa itu **Domain-Driven Design (DDD)**?
> >     
> > - Apa itu **Strangler Fig Pattern**?
> >     
> > - Apa itu Pola Komposisi?
> >     
> > - Bagaimana pola **Aggregator** bekerja?
> >     
> > - Kapan pola **Proxy** digunakan?
> >     
> > - Apa itu pola **Chained**?
> >     
> > - Apa peran **API Gateway**?
> >     
> > - Mengapa API Gateway penting?
> >     
> > 
> > ## Reference Points
> > 
> > - 06-IF4031-05e-2024-Microservice.pdf (hlm. 14-19)
> >     
> 
> > ### Pola Dekomposisi: Cara Memecah Monolit
> > 
> > Pola dekomposisi adalah strategi untuk memecah aplikasi monolitik menjadi layanan-layanan yang lebih kecil dan terkelola. Ini adalah langkah pertama dan paling krusial dalam mengadopsi microservices.
> > 
> > **1. Decompose by Business Capability (Fungsionalitas Bisnis)**
> > 	Ini adalah pendekatan paling umum. Layanan diidentifikasi berdasarkan fungsionalitas atau kapabilitas bisnis yang mereka sediakan. Contohnya, aplikasi e-commerce dapat dipecah menjadi layanan seperti Manajemen Katalog, Manajemen Pesanan, Manajemen Pembayaran, dan Manajemen Pengiriman. Setiap layanan memiliki tanggung jawab tunggal yang jelas.
> > 
> > **2. Decompose by Subdomain (Domain-Driven Design - DDD)**
> > 	Pendekatan yang lebih canggih, DDD berfokus pada pemodelan perangkat lunak di sekitar domain bisnis yang kompleks. Aplikasi dipecah menjadi layanan-layanan yang sesuai dengan subdomain bisnis. Setiap layanan memiliki model domainnya sendiri dalam sebuah Bounded Context, yang memastikan batas-batas yang jelas dan mengurangi ketergantungan antar layanan.
> > 
> > **3. Strangler Fig Pattern (Pola Pencekik)**
> > 	Pola ini digunakan untuk merefaktor aplikasi monolitik yang sudah ada (legacy) secara bertahap.
> > - Analogi: Seperti pohon ara pencekik yang tumbuh melilit pohon inangnya, lama-kelamaan menggantikannya.
> > - Prosesnya:
> > 	
> > 	1. Buat fasad (_facade_) di depan monolit yang akan merutekan lalu lintas.
> > 		
> > 	2. Identifikasi satu fungsionalitas dan bangun sebagai microservice baru.
> > 		
> > 	3. Ubah fasad untuk mengarahkan panggilan untuk fungsionalitas tersebut ke microservice baru, sementara sisa lalu lintas tetap ke monolit.
> > 		
> > 	4. Ulangi proses ini secara bertahap, "mencekik" monolit hingga semua fungsionalitasnya telah digantikan oleh microservice baru dan monolit dapat dimatikan.
> >     
> > 
> > ### Pola Komposisi: Cara Menggabungkan Hasil
> > 
> > Setelah aplikasi dipecah, klien (misalnya, aplikasi web atau mobile) sering kali perlu mengambil data dari beberapa microservice untuk menampilkan satu halaman. Pola komposisi menangani cara mengagregasi data ini.
> > 
> > **1. Aggregator Pattern**
> > 
> > Sebuah layanan agregator bertindak sebagai perantara. Ia menerima satu permintaan dari klien, kemudian memanggil beberapa microservice, mengumpulkan dan memproses hasilnya, lalu mengirimkan satu respons tunggal kembali ke klien. Contoh: Halaman detail produk mungkin memerlukan panggilan ke layanan Katalog, Ulasan, dan Inventaris. Agregator yang akan melakukan ketiga panggilan tersebut.
> > 
> > **2. Proxy Pattern**
> > 
> > Pola ini adalah varian sederhana dari agregator di mana hanya ada satu layanan tujuan. Proxy menyediakan titik akses terkontrol, sering kali untuk menambahkan fitur seperti caching, keamanan, atau logging tanpa mengubah layanan aslinya.
> > 
> > **3. Chained Pattern**
> > 
> > Dalam pola ini, layanan-layanan dipanggil dalam urutan sekuensial. Respons dari layanan pertama menjadi input untuk layanan kedua, dan seterusnya. Contoh: Untuk merencanakan perjalanan, permintaan pertama ke layanan Booking Penerbangan, hasilnya diteruskan ke layanan Booking Hotel, lalu ke Booking Mobil.
> > 
> > **4. API Gateway Pattern**
> > 
> > Ini adalah pola yang paling komprehensif dan umum digunakan. API Gateway bertindak sebagai pintu gerbang tunggal (single entry point) untuk semua permintaan klien ke ekosistem microservice.
> > 
> > Fungsi Utama API Gateway:
> > 
> > - **Routing:** Meneruskan permintaan klien ke microservice yang sesuai.
> >     
> > - **Agregasi/Komposisi:** Dapat bertindak sebagai agregator untuk beberapa layanan.
> >     
> > - **Offloading Fungsionalitas:** Menangani tugas-tugas umum (_cross-cutting concerns_) sehingga tidak perlu diimplementasikan di setiap microservice. Contohnya:
> >     
> > 	- **Autentikasi & Otorisasi:** Memastikan hanya klien yang sah yang dapat mengakses API.
> > 			
> > 	- **Rate Limiting & Throttling:** Melindungi layanan dari beban berlebih.
> > 			
> > 	- **Logging & Monitoring:** Mencatat semua permintaan di satu tempat.
> > 			
> > 	- **Konversi Protokol:** Menerjemahkan antara protokol yang ramah-klien (misalnya, REST) dan protokol internal (misalnya, gRPC).
> >         
> > 
> > Penggunaan API Gateway menyederhanakan arsitektur dari sisi klien dan mengamankan layanan backend dari akses langsung.

> [!cornell] #### Summary
> 
> **Desain arsitektur microservice bergantung pada dua jenis pola utama: Pola Dekomposisi, yang menyediakan strategi untuk memecah aplikasi monolitik menjadi layanan independen berdasarkan kapabilitas bisnis, subdomain (DDD), atau secara bertahap dengan Strangler Fig Pattern; dan Pola Komposisi, yang memungkinkan klien berinteraksi dengan ekosistem microservice secara efisien melalui mekanisme seperti Aggregator, Chained, dan terutama API Gateway, yang berfungsi sebagai titik masuk tunggal untuk menangani routing, keamanan, dan agregasi data.**

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Domain-Driven Design (DDD)
> 
> DDD adalah disiplin ilmu yang sangat mendalam. Dua konsep kuncinya adalah:
> 
> - **Ubiquitous Language (Bahasa Universal):** Tim teknis dan tim bisnis harus menggunakan kosakata yang sama dan konsisten untuk mendeskripsikan konsep-konsep dalam domain bisnis. Bahasa ini digunakan dalam percakapan, dokumentasi, dan yang terpenting, di dalam kode itu sendiri (nama kelas, metode, variabel). Ini menghilangkan ambiguitas dan kesalahpahaman.
>     
> - **Bounded Context (Konteks Terbatas):** Ini adalah batas eksplisit di mana sebuah model domain (dan Bahasa Universalnya) berlaku. Di dalam satu _bounded context_, setiap istilah memiliki makna yang tunggal dan jelas. Misalnya, istilah "Pelanggan" di dalam konteks `Penjualan` mungkin memiliki arti dan atribut yang berbeda dengan "Pelanggan" di dalam konteks `Dukungan Teknis`. Setiap _bounded context_ adalah kandidat ideal untuk menjadi sebuah microservice.
>     
> 
> #### Implementasi Teknis API Gateway
> 
> API Gateway bukanlah sekadar _reverse proxy_ sederhana. Implementasi modern seringkali melibatkan:
> 
> - **Service Discovery Integration:** Gateway secara dinamis mengetahui lokasi (_instance_) dari setiap microservice dengan berintegrasi dengan _Service Registry_ (seperti Eureka atau Consul).
>     
> - **Circuit Breaker Integration:** Gateway dapat mengimplementasikan pola _Circuit Breaker_ untuk mencegah permintaan terus-menerus ke layanan yang sedang bermasalah.
>     
> - **Programmable Pipelines/Middleware:** Gateway canggih (seperti Kong, Tyk, atau yang dibangun sendiri) memungkinkan definisi _pipeline_ permintaan di mana setiap tahap melakukan tugas tertentu (autentikasi, transformasi, logging) sebelum permintaan mencapai layanan tujuan.
>