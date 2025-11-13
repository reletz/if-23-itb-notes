---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu Aplikasi Internet?
> >     
> > - Apa saja karakteristik utamanya?
> >     
> > - Apa itu Sistem Terdistribusi?
> >     
> > - Perbedaan Client-Server & Peer-to-Peer?
> >     
> > - Perbedaan Stateless & Stateful?
> >     
> > - Apa itu Protokol Komunikasi?
> >     
> > - Beda Aplikasi Internet vs Aplikasi Web?
> >     
> > - Komponen teknologi Aplikasi Web?
> >     
> > - Apa itu URL, HTTP, HTML, CSS?
> >     
> > - Jenis-jenis Web Programming?
> >     
> > - Bagaimana alur proses aplikasi web?
> >     
> > - Apa itu Arsitektur N-Tier?
> >     
> > - Apa itu Web Stack?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3110 - 01b - InternetApp.pdf
> >     
> 
> > ### Konsep Utama Aplikasi Internet
> > 
> > **Aplikasi Internet** (Internet App) adalah sebuah program komputer yang komponen-komponennya tersebar di berbagai lokasi (tidak berada dalam satu mesin tunggal) dan menggunakan jaringan internet sebagai media untuk berkomunikasi satu sama lain.
> > 
> > Kata kunci dari konsep ini adalah:
> > 
> > 1. **Sistem Terdistribusi (Distributed System):** Logika dan data aplikasi tidak terpusat di satu komputer, melainkan terbagi ke beberapa komputer yang saling terhubung.
> >     
> > 2. **Komunikasi via Internet:** Pertukaran data dan instruksi antar komponen aplikasi tersebut terjadi melalui infrastruktur internet.
> >     
> > 
> > ### Karakteristik Aplikasi Internet
> > 
> > Sebagai sistem terdistribusi, Aplikasi Internet memiliki karakteristik khusus:
> > 
> > - **Concurrency (Konkurensi):** Kemampuan untuk menangani banyak tugas secara bersamaan. Contohnya, sebuah server aplikasi harus bisa melayani permintaan dari ratusan klien, memproses data, dan mengirim/menerima informasi ke database pada waktu yang hampir bersamaan.
> >     
> > - **Synchronization (Sinkronisasi):** Perlunya koordinasi aktivitas antar komponen yang berjalan terpisah. Ini penting untuk menjaga konsistensi data dan urutan proses, misalnya memastikan transaksi bank diproses dalam urutan yang benar.
> >     
> > - **Exception Handling (Penanganan Kegagalan):** Sistem harus dirancang agar tangguh. Jika satu komponen atau satu proses untuk satu pengguna gagal, hal itu tidak boleh menyebabkan seluruh sistem berhenti bekerja atau mengganggu layanan untuk pengguna lain.
> >     
> > 
> > ### Model Sistem Terdistribusi
> > 
> > Ada dua model utama dalam sistem terdistribusi:
> > 
> > 1. **Client-Server:** Model yang paling umum, di mana ada pembagian peran yang jelas.
> >     
> >     - **Client:** Pihak yang meminta layanan atau sumber daya (misalnya, browser Anda saat meminta halaman web).
> >         
> >     - **Server:** Pihak yang menyediakan layanan atau sumber daya (misalnya, web server yang menyimpan dan mengirimkan halaman web).
> >         
> > 2. **Peer-to-Peer (P2P):** Dalam model ini, setiap komponen (disebut _peer_) memiliki kedudukan yang setara. Setiap _peer_ bisa berfungsi sebagai client (meminta layanan) dan juga sebagai server (memberikan layanan) secara bersamaan. Contoh klasiknya adalah aplikasi file-sharing seperti BitTorrent.
> >     
> > 
> > ### Varian Model Client-Server
> > 
> > Interaksi antara client dan server dapat dibedakan menjadi:
> > 
> > - **Stateless (Tanpa Status):** Server tidak menyimpan informasi atau status apa pun tentang client dari interaksi sebelumnya. Setiap permintaan dari client dianggap sebagai transaksi yang baru dan independen. HTTP secara dasar bersifat stateless. Analogi: Mesin penjual otomatis, setiap pembelian adalah transaksi baru tanpa mengingat siapa Anda.
> >     
> > - **Stateful (Dengan Status):** Server menyimpan informasi konteks dari interaksi sebelumnya dengan client (ini disebut _session_). Permintaan berikutnya dari client yang sama dapat diproses berdasarkan konteks yang sudah ada. Analogi: Percakapan telepon dengan teman, Anda berdua ingat apa yang sudah dibicarakan sebelumnya.
> >     
> > 
> > ### Protokol Komunikasi
> > 
> > Protokol adalah **seperangkat aturan atau standar** yang disepakati oleh pihak-pihak yang berkomunikasi (misalnya, client dan server) agar dapat saling memahami.
> > 
> > - **Protokol Aplikasi:** Mendefinisikan format pesan, sintaks, dan urutan komunikasi untuk aplikasi tertentu. Contoh: HTTP untuk web, FTP untuk transfer file, SMTP untuk email.
> >     
> > - **Protokol Transport:** Mengatur bagaimana data dipecah menjadi paket-paket kecil, dikirim melalui jaringan, dan disusun kembali di tujuan. Contoh: TCP (yang andal dan berorientasi koneksi) dan UDP (yang lebih cepat tetapi tidak andal).
> >     
> > 
> > ### Perbedaan Aplikasi Internet vs Aplikasi Berbasis Web
> > 
> > Meskipun sering digunakan secara bergantian, keduanya memiliki perbedaan teknis:
> > 
> > | Kriteria | Aplikasi Internet (Umum) | Aplikasi Berbasis Web (Spesifik) |
> > | :--- | :--- | :--- |
> > | Protokol | Bisa menggunakan protokol aplikasi apa pun (FTP, SMTP, dll) atau bahkan protokol buatan sendiri. | Hanya menggunakan HTTP/HTTPS sebagai protokol utama. |
> > | Komunikasi | Aplikasi di server bisa berkomunikasi langsung dengan aplikasi client. | Aplikasi di server berkomunikasi dengan client melalui sebuah Web Server. |
> > | Antarmuka Client| Bisa berupa aplikasi standalone (desktop), komponen dalam aplikasi lain, atau terminal. | Umumnya berjalan dan diakses melalui Web Browser. |
> > 
> > Singkatnya, **Aplikasi Web adalah salah satu jenis (subset) dari Aplikasi Internet** yang secara khusus menggunakan teknologi web (HTTP, Browser).
> > 
> > ### Teknologi Inti Aplikasi Berbasis Web
> > 
> > Sebuah aplikasi web dibangun dari beberapa komponen teknologi yang bekerja sama:
> > 
> > - **Web Client (Web Browser):** Perangkat lunak di sisi pengguna (misal: Chrome, Firefox) yang bertugas meminta, menerima, dan me-_render_ (menampilkan) halaman web.
> >     
> > - **Web Server:** Perangkat lunak di sisi server (misal: Apache, NginX) yang bertugas menerima permintaan HTTP dari browser dan mengirimkan dokumen web sebagai respons.
> >     
> > - **URL (Uniform Resource Locator):** Alamat unik yang digunakan untuk menemukan sebuah sumber daya (seperti halaman HTML atau gambar) di internet.
> >     
> > - **HTTP (HyperText Transfer Protocol):** Protokol aplikasi yang menjadi fondasi komunikasi data di World Wide Web.
> >     
> > - **HTML (HyperText Markup Language):** Bahasa standar untuk membuat struktur dan konten dari sebuah halaman web.
> >     
> > - **CSS (Cascading Style Sheet):** Bahasa yang digunakan untuk mendefinisikan gaya dan tata letak (presentasi visual) dari dokumen HTML.
> >     
> > 
> > ### Jenis-Jenis Pemrograman Web
> > 
> > Eksekusi kode dalam aplikasi web dapat terjadi di dua tempat:
> > 
> > 1. **Server-Side Scripting (PHP, Python, JSP, ASP.NET):** Kode dieksekusi di web server. Server memproses skrip, menghasilkan output (biasanya HTML), lalu mengirimkan hasil jadinya ke browser. Ini digunakan untuk logika bisnis, akses database, dan otentikasi.
> >     
> > 2. **Client-Side Scripting (JavaScript):** Kode dikirim bersama HTML/CSS ke browser, lalu dieksekusi oleh browser di komputer pengguna. Ini digunakan untuk membuat halaman web yang interaktif, memvalidasi input form, atau memanipulasi tampilan halaman tanpa perlu me-refresh (misalnya, menggunakan teknologi AJAX).
> >     
> > 
> > Selain itu, ada juga **CGI (Common Gateway Interface)**, sebuah standar lama di mana web server menjalankan program eksternal dan menyalurkan outputnya sebagai respons HTTP, serta **Plugin (Applet, Flash)** yang merupakan program eksternal yang dieksekusi oleh browser dengan bantuan perangkat lunak tambahan.
> > 
> > ### Arsitektur Aplikasi Web
> > Sebelum saat ini, arsitektur aplikasi web hanya berkutat pada penyajian file statis.
> > 
> > ![[Pasted image 20250903095733.png]]
> > 
> > Seiring waktu, arsitektur aplikasi web berevolusi dari sekadar penyajian file statis menjadi sistem multi-lapis (_N-Tier Architecture_) yang kompleks. Arsitektur modern umumnya memisahkan tugas menjadi beberapa lapisan (layer):
> > 
> > - **Presentation Layer (UI):** Bertanggung jawab untuk menampilkan antarmuka kepada pengguna dan menangkap input dari pengguna. Ini adalah bagian yang dilihat dan diinteraksi oleh pengguna di browser.
> >     
> > - **Business Layer (Logic):** Berisi logika bisnis inti dari aplikasi. Lapisan ini memproses data, menerapkan aturan, dan membuat keputusan.
> >     
> > - **Data Layer (Data Access):** Bertanggung jawab untuk komunikasi dengan penyimpanan data, seperti database. Tugasnya adalah mengambil, menyimpan, memperbarui, dan menghapus data.
> >  
> >  ![[Pasted image 20250903095641.png]]
> >  ![[Pasted image 20250903095457.png]]
> > 
> > ### Web Stack
> > 
> > **Web Stack** adalah kumpulan dari beberapa teknologi perangkat lunak yang dibutuhkan untuk membangun dan menjalankan sebuah aplikasi web dari awal hingga akhir. Ini mencakup sistem operasi, web server, database, dan bahasa pemrograman. Contoh stack populer adalah:
> > 
> > - **LAMP:** Linux (OS), Apache (Web Server), MySQL (Database), PHP/Perl/Python (Programming Language).
> >     
> > - **MEAN:** MongoDB (Database), Express.js (Web Framework), Angular (Frontend Framework), Node.js (Runtime Environment).
> >     

> [!cornell] #### Summary
> Aplikasi Internet adalah sistem perangkat lunak terdistribusi yang berkomunikasi melalui internet, dengan karakteristik utama seperti konkurensi, sinkronisasi, dan penanganan kegagalan. Model yang paling umum adalah Client-Server, yang bisa bersifat **stateless** (tiap permintaan independen) atau **stateful** (server mengingat interaksi sebelumnya). Aplikasi Web merupakan subset spesifik dari Aplikasi Internet yang menggunakan protokol HTTP, diakses melalui browser, dan dibangun di atas tumpukan teknologi (Web Stack) seperti Web Server, Database, HTML, CSS, dan bahasa pemrograman sisi server (misal: PHP) serta sisi klien (JavaScript). Arsitektur aplikasi web modern berevolusi menjadi model multi-lapis (N-Tier) yang memisahkan logika presentasi, bisnis, dan data untuk skalabilitas dan pemeliharaan yang lebih baik.

> [!ad-libitum]- Additional Information
> #### Pendalaman Teknis: HTTP sebagai Protokol Stateless
>  Sifat *stateless* dari HTTP berarti setiap permintaan dari browser ke server adalah peristiwa yang terisolasi. Server tidak secara inheren tahu apakah 10 permintaan yang berbeda berasal dari pengguna yang sama atau 10 pengguna yang berbeda. Untuk mengatasi keterbatasan ini dan menciptakan pengalaman pengguna yang *stateful* (misalnya, login atau keranjang belanja), aplikasi web menggunakan teknik seperti:
>  - **Cookies:** Potongan kecil data yang dikirim server ke browser pengguna. Browser kemudian mengirimkan kembali cookie tersebut pada setiap permintaan berikutnya ke server yang sama, memungkinkan server untuk "mengingat" pengguna tersebut.
>  - **Sessions:** Server membuat ID sesi unik untuk setiap pengguna dan menyimpannya (misalnya di database atau memori). ID ini dikirim ke client melalui cookie. Pada permintaan selanjutnya, client mengirim kembali ID sesi, dan server menggunakannya untuk mengambil data konteks pengguna yang relevan. 
> 
> #### Pendalaman Arsitektur: Dari Monolith ke Microservices
> - **Arsitektur Monolithic:** Pada awalnya, banyak aplikasi web dibangun sebagai satu unit tunggal yang besar (monolith). Seluruh kode untuk UI, logika bisnis, dan akses data berada dalam satu basis kode dan di-_deploy_ sebagai satu aplikasi. Ini sederhana untuk memulai, tetapi menjadi sulit untuk dipelihara, diperbarui, dan diskalakan seiring pertumbuhan aplikasi.
> - **Arsitektur Microservices:** Sebagai evolusi, arsitektur microservices memecah aplikasi besar menjadi kumpulan layanan-layanan kecil yang independen. Setiap layanan fokus pada satu fungsi bisnis tertentu (misalnya, layanan otentikasi, layanan produk, layanan pembayaran), memiliki database sendiri, dan dapat di-_deploy_ secara independen. Mereka berkomunikasi satu sama lain melalui API. Pendekatan ini meningkatkan skalabilitas, fleksibilitas, dan ketahanan sistem.
> 
> #### Eksplorasi Mandiri
> - **Gunakan Chrome DevTools:** Buka situs web apa pun, klik kanan dan pilih "Inspect", lalu buka tab "Network". Muat ulang halaman dan amati permintaan HTTP yang terjadi. Klik pada salah satu permintaan untuk melihat detail _Request Headers_, _Response Headers_, dan konten yang ditransfer.
> - **Coba buat Web Server Sederhana:** Gunakan Python atau Node.js untuk membuat web server "Hello World" hanya dengan beberapa baris kode. Ini akan memberikan pemahaman praktis tentang bagaimana server merespons permintaan HTTP.
>
>  #### Sumber & Referensi Lanjutan:
> - **RFC 2616:** Dokumen standar teknis asli yang mendefinisikan protokol HTTP/1.1.
> - **Mozilla Developer Network (MDN) Web Docs:** Sumber daya terlengkap untuk mempelajari semua teknologi web, mulai dari HTML, CSS, JavaScript, hingga HTTP.
> - **Buku "Web Application Architecture: Principles, Protocols and Practices" oleh Leon Shklar:** Buku yang dirujuk dalam slide untuk pemahaman arsitektur yang lebih mendalam.
>