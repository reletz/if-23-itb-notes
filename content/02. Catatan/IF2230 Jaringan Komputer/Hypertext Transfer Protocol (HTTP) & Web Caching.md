---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF2230 Jaringan Komputer]]

> [!cornell] Lapisan Aplikasi: Hypertext Transfer Protocol (HTTP) & Web Caching
> 
> > ## Questions/Cues
> > 
> > - Apa itu **HTTP**?
> > - Apa artinya HTTP itu _stateless_?
> > - Bedakan koneksi **Non-persistent** dan **Persistent** HTTP.
> > - Bagaimana model waktu respons untuk Non-persistent HTTP?
> > - Apa saja bagian dari **pesan request HTTP**?
> > - Apa saja metode HTTP yang umum? (GET, POST)
> > - Apa saja bagian dari **pesan response HTTP**?
> > - Sebutkan beberapa _status code_ HTTP.
> > - Bagaimana cara kerja **Cookies** untuk menjaga state?
> > - Apa itu **Web Cache (Proxy Server)**?
> > - Mengapa Web Caching penting?
> > - Apa itu **Conditional GET**?
> > 
> > ## Reference Points
> > 
> > - Lecture 10
> 
> > ### Dasar-dasar Hypertext Transfer Protocol (HTTP)
> > 
> > **HTTP** adalah protokol lapisan aplikasi yang menjadi fondasi untuk komunikasi data di World Wide Web. Ia mengikuti model _client-server_, di mana browser bertindak sebagai klien dan web server sebagai server.
> > 
> > - **Karakteristik Utama:**
> >     - Menggunakan **TCP** sebagai protokol transport di bawahnya, biasanya pada port 80.
> >     - Bersifat _**Stateless**_: Server tidak menyimpan informasi apa pun tentang permintaan klien sebelumnya. Setiap permintaan diperlakukan sebagai transaksi yang sepenuhnya independen. Hal ini menyederhanakan desain server, namun memerlukan mekanisme lain (seperti cookies) untuk mengelola sesi pengguna.
> > 
> > ### Response Time Modelling
> > - Definisi RTT (Round-Trip Time)
> > 	- **RTT**: Waktu yang dibutuhkan untuk mengirim paket kecil dari client ke server dan kembali lagi
> > 	- **Fungsi**: Mengukur latensi dasar komunikasi jaringan antara dua titik
> > - Komponen Response Time
> > 	1. Inisiasi Koneksi TCP
> > 		- **Durasi**: Satu RTT untuk memulai koneksi TCP
> > 		- **Proses**: Handshake antara client dan server
> > 		- **Tujuan**: Membuat koneksi yang reliable sebelum transfer data
> > 	1. HTTP Request dan Response Awal
> > 		- **Durasi**: Satu RTT untuk HTTP request dan beberapa byte pertama HTTP response
> > 		- **Proses**:
> > 			- Client mengirim HTTP request
> > 			- Server merespons dengan header HTTP dan data awal
> > 		- **Karakteristik**: Response dimulai segera setelah request diterima
> > 	1. File Transmission Time
> > 		- **Durasi**: Waktu untuk mentransmisikan seluruh file
> > 		- **Faktor**: Tergantung pada ukuran file dan bandwidth jaringan
> > 		- **Proses**: Data file dikirim secara bertahap dari server ke client
> > -  Rumus Total Response Time
> > `Total Response Time = 2RTT + Transmit Time`
> > ![[Pasted image 20250618215719.png]]
> > - **RTT pertama**: Untuk inisiasi koneksi TCP
> > - **RTT kedua**: Untuk HTTP request dan response awal
> > - **Transmit Time**: Waktu aktual pengiriman file
> > 
> > ### Tipe Koneksi HTTP
> > 
> > 1. **Non-persistent HTTP (digunakan di HTTP/1.0):**
> >     - Satu koneksi TCP dibuka hanya untuk mengambil **satu objek** (misalnya, satu file HTML atau satu gambar). Setelah objek terkirim, koneksi langsung ditutup.
> >     - **Sangat tidak efisien.** Untuk halaman web yang berisi 10 gambar, dibutuhkan 11 koneksi TCP terpisah.
> >     - **Waktu Respons per Objek:** `2 RTT + waktu transmisi file`. (1 RTT untuk membangun koneksi TCP, dan 1 RTT lagi untuk request & response HTTP).
> > 2. **Persistent HTTP (standar di HTTP/1.1):**
> >     - Satu koneksi TCP tetap terbuka untuk mengambil **beberapa objek** dari server yang sama.
> >     - **Jauh lebih efisien** karena mengurangi overhead pembuatan koneksi berulang kali.
> >     - Dengan _pipelining_, klien dapat mengirim beberapa _request_ sekaligus di satu koneksi tanpa menunggu _response_ sebelumnya, yang dapat mengurangi total waktu muat secara signifikan.
> > 
> > ### Format Pesan HTTP
> > 
> > - **Pesan Request (dari Klien ke Server):**
> >     
> >     - **Request Line:** Berisi metode (misal, `GET`), URL objek, dan versi HTTP. Contoh: `GET /index.html HTTP/1.1`
> >     - **Header Lines:** Informasi tambahan seperti `Host: www.somesite.com`, `User-Agent: Mozilla/5.0`, dll.
> >     - **Entity Body:** (Opsional) Berisi data yang dikirim ke server, misalnya data dari form HTML yang menggunakan metode `POST`.
> > - **Pesan Response (dari Server ke Klien):**
> >     
> >     - **Status Line:** Berisi versi HTTP, _status code_, dan deskripsi. Contoh: `HTTP/1.1 200 OK`
> >     - **Header Lines:** Informasi tambahan seperti `Content-Type: text/html`, `Content-Length: 1234`, dll.
> >     - **Entity Body:** Berisi objek yang diminta, misalnya kode HTML dari sebuah halaman web.
> >
> > ### Metode Request HTTP Umum
> > - **GET:** Digunakan untuk meminta representasi dari sumber daya tertentu. Semua data yang diperlukan dikirim sebagai bagian dari URL (misal: `.../search?q=jaringan_komputer`).
> > - **POST:** Digunakan untuk mengirimkan data agar diproses oleh sumber daya target. Data dikirimkan di dalam _entity body_ dari pesan request. Umumnya digunakan untuk mengirimkan data formulir.
> > 
> > ### Menjaga State: Cookies
> > 
> > Cookies adalah mekanisme yang digunakan untuk mengatasi sifat _stateless_ HTTP, memungkinkan server untuk "mengingat" informasi tentang klien.
> > 
> > - **Cara Kerja:**
> >     1. Saat klien pertama kali mengunjungi situs, server mengirimkan header `Set-Cookie:` yang berisi ID unik dalam responsnya.
> >     2. Browser klien menyimpan ID ini di dalam file cookie di komputer lokal.
> >     3. Untuk setiap permintaan selanjutnya ke server yang sama, browser akan otomatis menyertakan header `Cookie:` yang berisi ID tersebut.
> >     4. Server menggunakan ID ini untuk mengidentifikasi klien dan mengambil data sesinya (misalnya, isi keranjang belanja atau status login).
> > 
> > ### Web Caching (Proxy Server)
> > 
> > **Web Cache** adalah sebuah server perantara yang menyimpan salinan objek-objek web yang baru saja diminta. Saat klien meminta sebuah objek, permintaan tersebut pertama kali dikirim ke cache.
> > ![[Pasted image 20250618220258.png]]
> > - **Tujuan dan Manfaat:**
> >     
> >     1. **Mengurangi Waktu Respons Klien:** Jika objek yang diminta ada di cache (_cache hit_), objek tersebut dapat segera dikirim ke klien tanpa harus mengambilnya dari server asli yang mungkin berlokasi jauh.
> >     2. **Mengurangi Beban Lalu Lintas Jaringan:** Dengan melayani permintaan secara lokal, cache mengurangi jumlah lalu lintas yang harus melewati link akses internet sebuah institusi, sehingga menghemat bandwidth.
> > - Conditional GET:
> >     
> >     Ini adalah mekanisme untuk memastikan konten di cache tetap segar. Cache akan mengirim permintaan ke server asli dengan header If-Modified-Since: <tanggal_salinan_di_cache>.
> >     
> >     - Jika konten di server **tidak berubah**, server akan merespons dengan status `304 Not Modified` dan body kosong. Cache kemudian akan menggunakan salinan yang dimilikinya.
> >     - Jika konten **telah berubah**, server akan merespons dengan `200 OK` dan mengirimkan versi baru dari objek tersebut.
> >     - ![[Pasted image 20250618220333.png]]
> >  
> >  ![[Pasted image 20250618214243.png]]

> [!cornell] #### Summary
> 
> - **HTTP** adalah protokol _stateless_ yang menggunakan model client-server di atas TCP untuk mentransfer objek web. Evolusinya dari koneksi **non-persistent** ke **persistent** secara drastis meningkatkan efisiensi transfer data.
> - Untuk mengatasi sifat _stateless_-nya, HTTP menggunakan **Cookies**, yang memungkinkan server untuk melacak sesi pengguna dan menyimpan preferensi antar permintaan.
> - **Web Caching (Proxy)** secara signifikan meningkatkan performa dengan menyimpan salinan objek web secara lokal untuk mengurangi waktu respons dan beban jaringan, serta menggunakan **Conditional GET** untuk memastikan konten yang disajikan tetap up-to-date.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Evolusi HTTP: HTTP/2 dan HTTP/3
> 
> - Perkembangan HTTP tidak berhenti di versi 1.1.
>     - **HTTP/2** memperkenalkan fitur revolusioner seperti _multiplexing_, yang memungkinkan banyak _request_ dan _response_ dikirim secara bersamaan melalui satu koneksi TCP tanpa saling memblokir (_head-of-line blocking_), serta kompresi header untuk mengurangi overhead.
>     - **HTTP/3** melangkah lebih jauh dengan berjalan di atas protokol **QUIC** (berbasis UDP) alih-alih TCP. Ini dirancang untuk mengatasi beberapa keterbatasan inheren TCP dan lebih meningkatkan performa, terutama di jaringan yang kurang stabil.
> 
> #### Metode HTTP Lainnya
> 
> - Selain `GET` dan `POST` yang paling umum, ada metode lain seperti:
>     - **PUT:** Untuk mengunggah atau mengganti file secara keseluruhan di server.
>     - **DELETE:** Untuk menghapus file atau sumber daya di server.
>     - **HEAD:** Sama seperti `GET`, tetapi hanya meminta header respons tanpa _body_. Berguna untuk memeriksa metadata tanpa mengunduh seluruh konten.
> 
> #### Eksplorasi Mandiri
> 
> - Gunakan **Developer Tools** di browser Anda (biasanya diakses dengan tombol F12). Buka tab **"Network"**, lalu muat ulang halaman web favorit Anda. Anda dapat menginspeksi setiap _request_ dan _response_ HTTP secara detail, melihat header, status code, metode yang digunakan, dan waktu yang dibutuhkan. Di tab **"Application"** (atau "Storage"), Anda juga bisa melihat _cookies_ yang disimpan oleh situs tersebut.