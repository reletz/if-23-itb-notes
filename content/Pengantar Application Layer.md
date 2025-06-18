---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Jaringan Komputer: Pengantar Application Layer
> 
> > ## Questions/Cues
> > 
> > - Apa itu application layer?
> > - Apa saja kebutuhan aplikasi (loss, bandwidth, timing)?
> > - Bagaimana transport layer melayani aplikasi?
> > - Apa beda UDP, TCP, dan RTP?
> > - Bagaimana proses berkomunikasi?
> > - Apa itu API dan Socket?
> > - Bagaimana cara mengidentifikasi proses? (IP + Port)
> > - Apa yang didefinisikan oleh protokol aplikasi?
> > - Apa saja arsitektur aplikasi?
> > - Beda Client-Server dan P2P?
> > 
> > ## Reference Points
> > 
> > - Slides 4-7
> > - Slides 8-11
> > - Slides 12-16
> > - Slides 17
> > - Slides 18-19
>
> > ### Kebutuhan Aplikasi dan Layanan Transport
> > 
> > Application Layer adalah lapisan tempat aplikasi jaringan dan protokol-protokolnya berada. Tujuannya adalah untuk menyediakan layanan yang berguna bagi pengguna akhir.
> > 
> > **Kebutuhan Aplikasi:**
> > 
> > Berbagai aplikasi memiliki kebutuhan yang berbeda terhadap jaringan, yang dapat dikategorikan menjadi tiga hal utama:
> > 
> > 1. **Data Loss (Kehilangan Data):**
> >     - **Tidak Toleran:** Aplikasi seperti transfer file, email, dan remote terminal (telnet) memerlukan keandalan 100% dan tidak bisa mentolerir kehilangan data sedikit pun.
> >     - **Toleran:** Aplikasi seperti streaming audio/video atau game interaktif dapat mentolerir sedikit kehilangan data tanpa merusak pengalaman pengguna secara signifikan.
> > 2. **Bandwidth:**
> >     - **Elastis:** Aplikasi seperti transfer file atau web Browse akan menggunakan sebanyak mungkin bandwidth yang tersedia untuk menyelesaikan tugasnya secepat mungkin.
> >     - **Membutuhkan Minimum:** Aplikasi multimedia (audio/video) memerlukan jumlah bandwidth minimum agar "efektif" dan dapat berjalan dengan kualitas yang dapat diterima.
> > 3. **Timing (Waktu):**
> >     - **Sensitif terhadap Delay:** Aplikasi interaktif seperti telepon internet (VoIP) dan game online memerlukan delay yang sangat rendah (misalnya, di bawah 100-an milidetik) agar terasa responsif.
> >     - **Tidak Sensitif:** Aplikasi seperti email atau transfer file tidak terlalu peduli dengan penundaan beberapa detik.
> > 
> > **Layanan dari Transport Layer:**
> > 
> > Jaringan di bawahnya (IP Layer) hanya menyediakan layanan "Best-Effort" yang tidak andal. Oleh karena itu, Transport Layer "membungkus" layanan ini untuk menyediakan layanan yang lebih berguna bagi aplikasi:
> > 
> > - **UDP (User Datagram Protocol):** Menyediakan layanan datagram yang tidak andal. Ini adalah "pembungkus" minimal yang hanya menambahkan fungsi multiplexing/demultiplexing menggunakan port. Semua urusan keandalan diserahkan kepada aplikasi.
> > - **TCP (Transmission Control Protocol):** Menyediakan layanan "pipa virtual" yang andal dan berorientasi koneksi. Ia menangani pengurutan data, pemulihan dari paket hilang, dan kontrol alur/kemacetan. Ini adalah pilihan utama untuk aplikasi yang tidak mentolerir kehilangan data.
> > - **RTP (Real-time Transport Protocol):** Sering berjalan di atas UDP. Ia tidak menjamin pengiriman tetapi menambahkan fitur penting untuk aplikasi real-time, seperti _timestamp_ untuk sinkronisasi pemutaran (playback) dan _sequence number_ untuk mendeteksi paket yang hilang atau tidak berurutan.
> > 
> > ### Konsep Dasar Aplikasi Jaringan
> > 
> > - **Proses Berkomunikasi:** Aplikasi jaringan terdiri dari **proses-proses** yang berjalan di host yang berbeda dan saling bertukar pesan.
> >     
> >     - **Client Process:** Proses yang **memulai** komunikasi.
> >     - **Server Process:** Proses yang **menunggu** untuk dihubungi.
> > - **API dan Socket:**
> >     
> >     - **API (Application Programming Interface):** Adalah antarmuka yang mendefinisikan cara aplikasi berinteraksi dengan transport layer.
> >     - **Socket:** Adalah implementasi API untuk jaringan internet. Socket bisa diibaratkan sebagai "pintu" tempat sebuah proses bisa mengirim dan menerima pesan dari/ke transport layer. Aplikasi (dikontrol developer) hanya perlu berurusan dengan pintu ini, sementara sistem operasi (yang mengontrol transport layer) mengurus sisanya.
> > - **Pengalamatan Proses:** Untuk berkomunikasi, sebuah proses perlu mengidentifikasi proses lainnya.
> >     
> >     - Alamat IP saja tidak cukup, karena satu host bisa menjalankan banyak proses jaringan secara bersamaan.
> >     - Oleh karena itu, identitas unik sebuah proses adalah kombinasi dari **Alamat IP host** dan **nomor port** yang spesifik untuk proses tersebut (misalnya, server HTTP di port 80, server email di port 25).
> > 
> > ### Arsitektur Aplikasi Jaringan
> > 
> > **Protokol Lapisan Aplikasi** mendefinisikan aturan main antar aplikasi, mencakup:
> > 
> > 1. **Tipe Pesan:** Pesan permintaan (request) dan balasan (response).
> > 2. **Sintaks Pesan:** Struktur dan field-field dalam pesan.
> > 3. **Semantik Pesan:** Arti dari setiap informasi di dalam field.
> > 4. **Aturan (Rules):** Kapan dan bagaimana sebuah proses mengirim dan merespons pesan.
> > 
> > Ada tiga model arsitektur utama untuk aplikasi jaringan:
> > 
> > - **Client-Server:**
> >     - Terdapat sebuah **server** yang selalu aktif (_always-on_), memiliki alamat IP permanen, dan menunggu untuk melayani permintaan.
> >     - Terdapat banyak **klien** yang memulai komunikasi dengan server untuk meminta layanan. Klien bisa saja tidak selalu aktif dan alamat IP-nya bisa dinamis.
> >     - Klien tidak berkomunikasi langsung satu sama lain. Contoh klasik: Web (Browser sebagai klien, Web Server sebagai server).
> > - **Peer-to-Peer (P2P):**
> >     - Tidak ada server pusat yang selalu aktif.
> >     - Sistem-sistem akhir (disebut _peers_) berkomunikasi secara langsung satu sama lain.
> >     - Setiap _peer_ dapat bertindak sebagai klien sekaligus server.
> >     - Sangat skalabel tetapi lebih sulit untuk dikelola. Contoh: Gnutella, BitTorrent.
> > - **Hybrid:**
> >     - Menggabungkan elemen dari kedua model di atas.
> >     - Contoh: Instant Messaging. Deteksi kehadiran teman (_presence_) dilakukan secara terpusat melalui server, namun percakapan (chat) berlangsung secara P2P langsung antar pengguna.

> [!cornell] #### Summary
> 
> - **Application Layer** terdiri dari proses-proses terdistribusi yang berkomunikasi menggunakan **protokol** untuk memenuhi kebutuhan spesifik pengguna, seperti **keandalan data, bandwidth, dan sensitivitas waktu**. Protokol ini dibangun di atas layanan **Transport Layer (TCP/UDP)** melalui antarmuka **Socket**. Aplikasi jaringan dapat dirancang menggunakan arsitektur yang berbeda, terutama **client-server** yang terpusat dan **peer-to-peer (P2P)** yang terdesentralisasi.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Protokol Publik vs. Protokol Proprietary
> 
> - **Protokol Publik (Public-domain):** Didefinisikan secara terbuka dalam dokumen **RFC (Request for Comments)**. Siapa pun dapat mengimplementasikannya, yang menjamin **interoperabilitas** antar aplikasi dari vendor yang berbeda. Contoh: HTTP, SMTP, FTP.
> - **Protokol Proprietary:** Dimiliki dan dikontrol oleh entitas tertentu (misalnya, perusahaan). Contohnya adalah protokol yang digunakan oleh Skype (versi lama) atau banyak game online. Keuntungannya adalah memungkinkan inovasi dan optimisasi yang cepat, tetapi kekurangannya adalah menciptakan ekosistem yang tertutup.
> 
> #### Peran Unik RTP (Real-time Transport Protocol)
> 
> - RTP bukanlah protokol transport mandiri seperti TCP atau UDP. Ia adalah protokol lapisan aplikasi yang biasanya **berjalan di atas UDP**. Tujuannya adalah untuk menambahkan fungsionalitas yang tidak dimiliki UDP tetapi sangat penting untuk aplikasi media real-time:
>     - **Payload Type Identification:** Memberitahu jenis media yang dibawa (misalnya, audio codec A, video codec B).
>     - **Sequence Numbering:** Memungkinkan penerima mendeteksi paket yang hilang dan mengurutkan kembali paket yang datang tidak beraturan.
>     - **Timestamping:** Memungkinkan penerima untuk memutar ulang media pada interval waktu yang benar dan mengatasi _jitter_ (variasi delay).
>     - **Delivery Monitoring:** Melalui protokol pendampingnya, **RTCP (RTP Control Protocol)**, peserta dapat saling bertukar laporan tentang kualitas pengiriman.