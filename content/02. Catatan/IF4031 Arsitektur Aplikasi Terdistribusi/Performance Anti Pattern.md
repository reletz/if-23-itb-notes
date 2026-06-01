---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF4031 Arsitektur Aplikasi Terdistribusi]]

> [!cornell] Topic: Performance Anti-Patterns & Uber Case Study
> 
> > ## Questions/Cues
> >
> > - Apa itu No Caching?
> >     
> > - Masalah N+1 (Chatty I/O)
> >     
> > - Database vs Repository
> >     
> > - Extraneous Fetching
> >     
> > - Sync vs Async I/O
> >     
> > - Singleton & DI
> >     
> > - Fenomena Retry Storm
> >     
> > - Thread Starvation
> >     
> > - Polyglot Persistence
> >     
> > - Noisy Neighbor
> >     
> > - Evolusi Uber (DOMA)
> >     
> >
> > ## Reference Points
> >
> > - Performance Anti Pattern.pdf
> >     
> > - Arsitektur Uber.pdf
> >     
> 
> > ### 1. No Caching (Tanpa Penyimpanan Sementara)
> >
> > Penyebab: Terjadi ketika aplikasi selalu mengambil data dari sumber aslinya (database/remote service) setiap kali ada permintaan, meskipun datanya sama.
> > 
> > Analogi: Seperti seorang pustakawan yang harus turun ke gudang bawah tanah setiap kali ada yang meminjam buku yang sama, alih-alih meletakkannya di meja depan untuk akses cepat.
> > 
> > Dampak: Response time melambat dan database kelelahan menangani permintaan redundan, yang akhirnya membatasi kemampuan sistem untuk berkembang (scalability).
> > 
> > Solusi: Gunakan strategi caching seperti Redis. Terapkan pola Cache-Aside: cek cache dulu, jika tidak ada baru ambil ke DB dan simpan di cache. Berikan waktu kadaluwarsa (expiration policy) agar data tetap segar.
> >
> > ### 2. Chatty I/O (I/O yang Cerewet)
> >
> > Penyebab: Melakukan banyak permintaan kecil secara berulang untuk satu tugas logis. Contohnya masalah N+1: mengambil data 10 pengguna, lalu melakukan 10 query terpisah untuk mengambil alamat masing-masing.
> > 
> > Dampak: Latensi tinggi karena setiap "perjalanan" jaringan memiliki ongkos (overhead). Akumulasi waktu tunggu ini membuat aplikasi terasa lambat atau bahkan timeout.
> > 
> > Solusi: Gunakan Batching (menggabungkan permintaan) atau Eager Loading (mengambil data terkait sekaligus menggunakan JOIN atau Include()).
> >
> > ### 3. Busy Database (Database Terlalu Sibuk)
> >
> > Penyebab: Memaksa database melakukan tugas logika bisnis seperti manipulasi teks, kalkulasi kompleks, atau pemformatan tanggal/mata uang yang seharusnya dilakukan di sisi kode aplikasi.
> > 
> > Analogi: Menggunakan perpustakaan bukan hanya untuk menyimpan buku, tapi juga sebagai pabrik percetakan dan toko roti di dalamnya. Akibatnya, fungsi utama sebagai tempat simpan-pinjam terganggu.
> > 
> > Solusi: Biarkan database fokus pada akses data. Pindahkan logika pemrosesan ke Application Layer. Ambil raw data saja, lalu olah di server aplikasi.
> >
> > ### 4. Extraneous Fetching (Pengambilan Data Berlebih)
> >
> > Penyebab: Mengambil data lebih banyak dari yang dibutuhkan (misal: SELECT * padahal hanya butuh nama). Sering terjadi saat filter data dilakukan di memori aplikasi (client-side filtering) bukan di database.
> > 
> > Dampak: Pemborosan bandwidth dan memori. Mengirim data "sampah" lewat jaringan memperlambat sistem.
> > 
> > Solusi: Gunakan Projection (pilih kolom tertentu saja) dan pastikan operasi agregasi (SUM, COUNT) atau filter dilakukan langsung di sisi database.
> >
> > ### 5. Synchronous I/O (I/O Sinkron/Blocking)
> >
> > Penyebab: Memblokir pengerjaan program (thread) hingga operasi I/O (seperti baca database) selesai.
> > 
> > Dampak: Thread menganggur sambil menunggu, sehingga resource terbuang sia-sia. Sistem sulit menangani banyak pengguna sekaligus.
> > 
> > Studi Kasus Uber: Awalnya Uber menggunakan Python/PHP yang bersifat sinkron. Ini menyebabkan latensi tinggi. Mereka akhirnya pindah ke Node.js yang menggunakan asynchronous event loop untuk menangani permintaan secara non-blocking.
> >
> > ### 6. Improper Instantiation (Instansiasi Tidak Tepat)
> >
> > Penyebab: Membuat objek baru yang "berat" (seperti koneksi database atau HttpClient) setiap kali ada request, padahal objek itu bisa dipakai bersama.
> > 
> > Dampak: Kehabisan sockets jaringan dan beban berat pada Garbage Collector.
> > 
> > Solusi: Gunakan pola Singleton atau Dependency Injection (DI) agar objek tersebut hanya dibuat sekali dan digunakan berulang kali.
> >
> > ### 7. Retry Storm (Badai Percobaan Ulang)
> >
> > Penyebab: Ketika sistem gagal, ribuan pengguna atau layanan lain mencoba menghubungkan kembali secara bersamaan dalam waktu singkat.
> > 
> > Dampak: Sistem yang sudah goyah malah "dihantam" lebih keras oleh banjir request, menyebabkannya mati total (cascading failure).
> > 
> > Solusi: Gunakan Rate Limiting atau Exponential Backoff (menambah jeda waktu secara bertahap setiap kali mencoba ulang).
> >
> > ### 8. Busy Front End (Front End Terlalu Sibuk)
> >
> > Penyebab: Menjalankan tugas berat (seperti pengolahan gambar atau data besar) di thread utama yang melayani pengguna.
> > 
> > Dampak: Antarmuka menjadi tidak responsif karena semua resource digunakan untuk tugas latar belakang.
> > 
> > Solusi: Gunakan Message Queue. Pindahkan tugas berat ke layanan latar belakang (backend worker) agar front-end tetap ringan.
> >
> > ### 9. Monolithic Persistence (Penyimpanan Monolitik)
> >
> >
> > Penyebab: Memaksakan satu jenis database (misal SQL) untuk semua jenis data (log, gambar, dokumen).
> > 
> > Analogi: Menggunakan palu untuk memasang baut. Bisa, tapi tidak efisien.
> > 
> > Dampak: Performa buruk karena database relasional tidak cocok untuk data besar tak terstruktur seperti log aktivitas.
> > 
> > Studi Kasus Uber: Uber awalnya hanya pakai satu database PostgreSQL untuk semuanya. Sekarang mereka menggunakan Schemaless (di atas MySQL) untuk data perjalanan dan Google Cloud Spanner untuk konsistensi global.
> >
> > ### 10. Noisy Neighbor (Tetangga Berisik)
> >
> > Penyebab: Dalam lingkungan berbagi (shared environment), satu pengguna atau layanan memonopoli CPU/Memori sehingga pengguna lain terganggu.
> > 
> > Solusi: Terapkan isolasi resource atau pindahkan layanan yang sangat sibuk ke infrastruktur yang terdedikasi (dedicated service).
> >
> > ### 11. Evolusi Arsitektur Uber: Dari Monolith ke DOMA
> >
> > Uber bertransformasi dari sistem tunggal (LAMP) menjadi ribuan microservices. Namun, ribuan microservices menyebabkan kekacauan (Microservice Sprawl).
> > 
> > Solusi Modern: DOMA (Domain-Oriented Microservice Architecture). Layanan dikelompokkan ke dalam "Domain" yang jelas untuk mengurangi komunikasi antar-layanan yang tidak perlu (mengurangi Chatty I/O antar layanan).

> [!cornell] #### Summary
> 
> Performance Anti-Patterns adalah kesalahan desain sistem yang menghambat skalabilitas dan efisiensi, sering kali melibatkan penyalahgunaan resource seperti database (Busy DB, Monolithic Persistence) atau jaringan (Chatty I/O, No Caching). Studi kasus Uber menunjukkan bahwa arsitektur harus berevolusi secara organik; dari Monolith yang sederhana menuju DOMA yang terstruktur, sembari mengganti operasi Synchronous menjadi Asynchronous dan menerapkan pola Sharding serta Gossip Protocol untuk menangani data masif dan menjaga ketersediaan tinggi tanpa titik kegagalan tunggal (Single Point of Failure).

> [!ad-libitum]- Additional Information: Pendalaman Teknis
> 
> #### Gossip Dissemination & Ringpop
> 
> Uber menggunakan library bernama **Ringpop** yang mengimplementasikan **Gossip Protocol**. Dalam sistem terdistribusi, setiap node server secara acak "bergosip" (bertukar status) dengan node lain. Ini memungkinkan klaster untuk mengetahui node mana yang sehat atau mati tanpa perlu satu server pusat (koordinator) yang mengawasi semuanya. Ini adalah kunci dari sifat _High Availability_ Uber.
> 
> #### Schemaless & Write-Ahead Log (WAL)
> 
> Sistem **Schemaless** Uber didesain sebagai _append-only store_. Artinya, data tidak pernah diubah (update) di tempat, melainkan setiap perubahan ditulis sebagai entri baru yang berurutan. Konsep ini mirip dengan **Write-Ahead Log** di database tradisional, yang menjamin data tidak hilang dan memudahkan replikasi data ke berbagai lokasi geografis.
> 
> #### DOMA (Domain-Oriented Microservice Architecture)
> 
> Ketika jumlah layanan mencapai ribuan, Uber mengelompokkan mereka ke dalam 4 lapisan:
> 
> 1. **Gateway**: Titik masuk utama.
>     
> 2. **Presentation**: Khusus untuk kebutuhan tampilan (Backends for Frontends).
>     
> 3. **Product**: Logika bisnis utama (misal: Ride, Eat).
>     
> 4. **Domain**: Layanan dasar yang menyediakan data inti.
>     
> 
> #### Sumber & Referensi Lanjutan:
> 
> - _Uber Engineering Blog_: Exploring DOMA and Schemaless.
>     
> - _Microsoft Azure Architecture Center_: Catalog of Cloud Design Patterns.
>     
> - Tools: **Redis** (Caching), **Envoy/gRPC** (Service Communication), **Google Cloud Spanner** (Global Database).
>     

> [!ad-libitum]- Spaced Repetition Questions (Review)
> 
> <details>
> 
> <summary><strong>1. Mengapa No Caching dianggap anti-pattern yang berbahaya bagi skalabilitas?</strong></summary>
> 
> Karena tanpa cache, setiap permintaan harus membebani database atau layanan remote. Saat jumlah pengguna melonjak, database akan mencapai batas kemampuannya lebih cepat karena harus melakukan operasi baca yang redundan (berulang untuk data yang sama).
> 
> </details>
>
> <details>
> 
> <summary><strong>2. Jelaskan perbedaan antara Chatty I/O dan Extraneous Fetching!</strong></summary>
> 
> <strong>Chatty I/O</strong> fokus pada <em>frekuensi</em> (terlalu banyak panggilan kecil), sedangkan <strong>Extraneous Fetching</strong> fokus pada <em>volume</em> (mengambil data yang terlalu besar/banyak kolom yang tidak perlu).
> 
> </details>
>
> <details>
> 
> <summary><strong>3. Apa solusi Uber untuk mengatasi kelemahan arsitektur Monolith di awal fasenya?</strong></summary>
> 
> Uber memecah sistem menjadi SOA (Service Oriented Architecture) dengan dua layanan utama: Dispatch (menggunakan Node.js untuk I/O asinkron) dan API (menggunakan Python untuk logika bisnis).
> 
> </details>
>
> <details>
> 
> <summary><strong>4. Mengapa Busy Database bisa menjadi bottleneck dalam sistem terdistribusi?</strong></summary>
> 
> Database adalah <em>shared resource</em>. Jika ia dibebani tugas kalkulasi yang berat, waktu CPU-nya habis untuk menghitung alih-alih melayani permintaan baca/tulis data dari layanan lain, sehingga seluruh sistem melambat.
> 
> </details>
>
> <details>
> 
> <summary><strong>5. Apa yang dimaksud dengan pola Circuit Breaker dalam konteks Uber?</strong></summary>
> 
> Pola yang digunakan untuk memutus koneksi ke sebuah layanan yang sedang gagal atau lambat secara otomatis. Tujuannya agar kegagalan tersebut tidak merambat ke layanan lain (mencegah <em>cascading failure</em>).
> 
> </details>