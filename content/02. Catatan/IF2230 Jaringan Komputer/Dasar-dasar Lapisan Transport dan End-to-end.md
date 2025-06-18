---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Transport Layer: Dasar-dasar Lapisan Transport
> 
> > ## Questions/Cues
> > 
> > - Apa masalah utama yang diselesaikan Lapisan Transport?
> > - Apa itu komunikasi _process-to-process_?
> > - Apa saja fungsi-fungsi fundamental Lapisan Transport?
> > - Jelaskan konsep _multiplexing_ dan _demultiplexing_.
> > - Apa peran _port number_?
> > - Apa saja keterbatasan jaringan di bawahnya yang harus diatasi?
> > 
> > ## Reference Points
> > 
> > - Lecture 7, Slides: 2, 5, 6, 7, 8, 9, 15, 21
> 
> > ### Masalah: Dari Host-ke-Host ke Proses-ke-Proses
> > 
> > Lapisan Jaringan (Network Layer) di bawahnya telah menyediakan layanan pengiriman paket dari satu komputer (host) ke komputer lain. Namun, ini tidak cukup. Dalam satu komputer, bisa berjalan banyak sekali aplikasi yang menggunakan jaringan secara bersamaan (misalnya, browser web, aplikasi email, game online).
> > 
> > **Masalah Inti:** Bagaimana cara mengubah layanan pengiriman _host-ke-host_ menjadi saluran komunikasi yang spesifik dari satu **aplikasi** di host A ke **aplikasi** lain di host B?
> > 
> > Lapisan Transport hadir untuk menyediakan **komunikasi logis** antara **proses-proses aplikasi** yang berjalan di host yang berbeda.
> > 
> > ### Fungsi Fundamental Lapisan Transport
> > 
> > Secara umum, sebuah protokol transport diharapkan dapat menyediakan properti-properti berikut untuk aplikasi:
> > 
> > 1. **Guaranteed Message Delivery:** Menjamin pesan sampai ke tujuan.
> > 2. **In-Order Delivery:** Mengirimkan pesan dalam urutan yang sama seperti saat dikirim.
> > 3. **No Duplicates:** Memastikan paling banyak hanya satu salinan dari setiap pesan yang dikirimkan.
> > 4. **Arbitrarily Large Messages:** Mendukung pengiriman pesan dengan ukuran berapapun (dengan melakukan segmentasi).
> > 5. **Synchronization:** Mendukung sinkronisasi antara pengirim dan penerima.
> > 6. **Flow Control:** Memungkinkan penerima untuk mengatur laju pengirim.
> > 7. **Multiplexing/Demultiplexing:** Mendukung beberapa proses aplikasi di setiap host.
> > 
> > ### Multiplexing dan Demultiplexing
> > 
> > Ini adalah salah satu fungsi paling krusial dari Lapisan Transport.
> > 
> > - **Multiplexing (di sisi pengirim):** Proses mengambil data dari banyak proses aplikasi yang berbeda, membungkusnya dengan header transport (yang berisi informasi seperti port sumber dan tujuan), dan menyerahkannya ke lapisan jaringan.
> > - **Demultiplexing (di sisi penerima):** Proses menggunakan informasi di header (khususnya **nomor port tujuan**) untuk mengirimkan segmen yang diterima ke _socket_ atau antrian pesan dari proses aplikasi yang benar.
> > 
> > **Peran Port Number:**
> > 
> > - **Port number** adalah pengenal numerik 16-bit yang digunakan untuk mengidentifikasi proses aplikasi secara unik di dalam sebuah host.
> > - **Analogi:** Jika alamat IP adalah alamat jalan dan nomor gedung, maka nomor port adalah nomor apartemen di dalam gedung tersebut. Tanpa nomor port, paket hanya akan sampai di "lobi" (sistem operasi) dan tidak tahu harus diserahkan ke "penghuni" (aplikasi) yang mana.
> > 
> > ### Tantangan dari Jaringan di Bawahnya
> > 
> > Lapisan Transport harus bekerja di atas lapisan jaringan (seperti IP) yang pada dasarnya tidak andal. Protokol transport harus mampu mengatasi keterbatasan-keterbatasan berikut:
> > 
> > - **Pesan bisa hilang (dropped):** Router bisa membuang paket karena antrian penuh.
> > - **Pesan bisa datang tidak berurutan (reordered):** Paket bisa mengambil rute yang berbeda dan tiba di tujuan dalam urutan yang berbeda dari saat dikirim.
> > - **Pesan bisa terduplikasi (duplicated):** Kesalahan di jaringan bisa menyebabkan satu paket diterima beberapa kali.
> > - **Ukuran pesan terbatas:** Jaringan membatasi ukuran maksimum paket (MTU).
> > - **Delay bisa sangat lama dan bervariasi:** Tidak ada jaminan waktu pengiriman.
> > 
> > Protokol seperti TCP dan UDP dirancang secara spesifik untuk membangun layanan yang andal di atas fondasi yang tidak andal ini.
> > 
> > ### Nomor Port (Port Number)
> > 
> > Digunakan untuk mengidentifikasi proses/program, baik dalam client maupun server.
> > ![[Pasted image 20250618164214.png]]

> [!cornell] #### Summary
> 
> - Fungsi fundamental Lapisan Transport adalah untuk meningkatkan layanan pengiriman **host-to-host** dari Lapisan Jaringan menjadi komunikasi **proses-ke-proses** yang logis antar aplikasi.
> - Ini dicapai melalui mekanisme **multiplexing dan demultiplexing**, yang menggunakan **nomor port** untuk mengarahkan data ke aplikasi yang benar di dalam sebuah host.
> - Lapisan Transport juga dirancang untuk menyediakan layanan-layanan penting seperti keandalan, pengurutan, dan kontrol aliran untuk mengatasi sifat jaringan di bawahnya yang tidak dapat diandalkan.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Filosofi Desain: The End-to-End Argument
> 
> - Keberadaan Lapisan Transport yang canggih ini adalah manifestasi dari salah satu prinsip desain internet yang paling penting: _The End-to-End Argument_. Prinsip ini menyatakan bahwa fungsi-fungsi yang spesifik untuk aplikasi (seperti memastikan keandalan pengiriman) sebaiknya diimplementasikan di "ujung-ujung" jaringan (yaitu, di host pengirim dan penerima) daripada di dalam jaringan inti (router). Jaringan inti harus tetap sederhana dan hanya fokus pada tugas utamanya: meneruskan paket secepat mungkin. Inilah sebabnya mengapa "kecerdasan" seperti TCP berada di host, bukan di router.
> 
> #### Well-Known, Registered, and Dynamic Ports
> 
> - Nomor port dibagi menjadi beberapa rentang:
>     - **0-1023 (Well-Known Ports):** Disediakan untuk layanan sistem standar dan sangat dikenal. Contoh: Port 80 untuk HTTP, 443 untuk HTTPS, 22 untuk SSH, 53 untuk DNS.
>     - **1024-49151 (Registered Ports):** Port yang dapat didaftarkan oleh perusahaan atau organisasi untuk aplikasi spesifik mereka.
>     - **49152-65535 (Dynamic/Private Ports):** Digunakan oleh aplikasi klien secara dinamis sebagai port sumber saat memulai koneksi.