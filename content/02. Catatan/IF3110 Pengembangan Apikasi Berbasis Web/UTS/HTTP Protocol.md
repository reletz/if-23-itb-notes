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
> > - Apa itu HTTP?
> >     
> > - Bagaimana struktur dasar HTTP?
> >     
> > - Apa saja metode permintaan (Request Methods)?
> >     
> > - Apa perbedaan GET vs POST?
> >     
> > - Apa fungsi Status Code?
> >     
> > - Apa saja jenis-jenis HTTP Header?
> >     
> > - Bagaimana cara kerja Caching?
> >     
> > - Apa itu Persistent Connection?
> >     
> > - Apa perbedaan HTTP/1.1 dan HTTP/2?
> >     
> > - Apa itu HTTPS?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides IF3110-02a-HTTP-Protocol.pdf
> >     
> 
> >### Apa itu Protokol HTTP?
> > HTTP (Hypertext Transfer Protocol) adalah protokol fundamental yang digunakan dalam World Wide Web (WWW). Ia berfungsi sebagai protokol lapisan aplikasi (Application Layer) yang berjalan di atas TCP (Transmission Control Protocol).
> >
> > **Karakteristik Utama:**
> > 
> > - **Sederhana:** Desainnya yang simpel adalah kekuatan sekaligus kelemahannya.
> >     
> > - **Stateless:** HTTP tidak menyimpan status atau informasi dari transaksi sebelumnya. Setiap permintaan (request) dari klien ke server dianggap sebagai transaksi yang independen dan tunggal. Server tidak mengingat apapun tentang klien setelah merespons.
> >     
> > - **Request-Response Paradigm:** Komunikasi selalu diawali oleh klien yang mengirimkan _request_ ke server, dan server akan membalas dengan sebuah _response_.
> >     
> >
> >### Struktur Pesan HTTP
> >
> >Baik pesan _request_ maupun _response_ memiliki struktur yang serupa, terdiri dari tiga bagian utama:
> >
> >1. **Start Line:** Baris pertama yang mendefinisikan permintaan (misalnya, `GET /index.html HTTP/1.1`) atau status respons (misalnya, `HTTP/1.1 200 OK`).
>  >   
> >2. **Headers:** Beberapa baris metadata dalam format `Nama-Header: nilai` yang memberikan informasi tambahan tentang permintaan atau respons. Contohnya `Host: www.itb.ac.id` atau `Content-Type: text/html`.
>  >   
> >3. **Message Body (Opsional):** Bagian yang berisi data yang dikirim, seperti data formulir (dalam request POST) atau konten halaman HTML (dalam response). Bagian header dan body dipisahkan oleh satu baris kosong (CRLF).
>  >   
>  >   ![[Pasted image 20250908071906.png]]
>  >   ![[Pasted image 20250908072526.png]]
> >
> >### Metode Permintaan (Request Methods)
> >
> >Metode ini mendefinisikan aksi yang ingin dilakukan oleh klien terhadap sumber daya di server.
> >
> >- **GET:** Metode paling sederhana untuk meminta/mengambil data dari server. Parameter dikirim melalui URL (query string). Tidak memiliki _request body_ dan seharusnya tidak mengubah data di server (idempotent).
>  >   
> > - **POST:** Mengirimkan data untuk diproses oleh server, misalnya data dari sebuah formulir. Data dikirim dalam _request body_. Metode ini dapat mengubah data di server.
>  >   
> > - **HEAD:** Sama seperti GET, tetapi server hanya mengembalikan header tanpa _response body_. Berguna untuk memeriksa metadata sumber daya (seperti tanggal modifikasi terakhir) tanpa perlu mengunduh seluruh konten.
>  >   
> > - **PUT:** Menyimpan (mengunggah atau memperbarui) sebuah sumber daya di URL tertentu. Jika sumber daya sudah ada, ia akan diperbarui.
>  >   
> >- **DELETE:** Menghapus sumber daya yang ada di URL tertentu.
> >    
> >- **TRACE:** Mengembalikan pesan request yang diterima oleh server. Berguna untuk _debugging_ dan melihat apakah ada proxy di tengah jalan yang mengubah request.
> >   
> > - **OPTIONS:** Menanyakan metode HTTP apa saja yang didukung oleh server untuk URL tertentu.
> >    
> >- **CONNECT:** Mengubah koneksi menjadi terowongan TCP/IP transparan, biasanya digunakan untuk komunikasi SSL/TLS (HTTPS).
> >   
> >- **PATCH:** Menerapkan modifikasi parsial pada sebuah sumber daya.
> >    
> > 
> > ### Perbandingan GET vs POST
> >
> > |**Fitur**|**GET**|**POST**|
> > |---|---|---|
> > |**Caching**|Bisa di-cache|Tidak pernah di-cache|
> > |**History Browser**|Tersimpan di riwayat|Tidak tersimpan di riwayat|
> > |**Bookmark**|Bisa di-bookmark|Tidak bisa di-bookmark|
> > |**Visibilitas Data**|Data terlihat di URL|Data tidak terlihat di URL (di body)|
> > |**Panjang Data**|Ada batasan panjang (tergantung browser/server)|Tidak ada batasan panjang|
> > |**Tipe Data**|Hanya karakter ASCII|Bisa data biner (misal: upload file)|
> > |**Request Parameters**|Ditambahkan di URL setelah tanda "?"|Ada di _Request body_|
> >
> > ### Kode Status (Status Code)
> > 
> > Kode tiga digit yang dikirim oleh server sebagai bagian dari _response_ untuk menginformasikan hasil dari _request_ yang diterima.
> >
> >- **1xx (Informational):** Permintaan diterima, proses berlanjut.
>  >   
> >- **2xx (Success):** Aksi berhasil diterima, dipahami, dan diterima. Contoh: `200 OK`.
> >    
> >- **3xx (Redirection):** Klien perlu melakukan aksi lebih lanjut untuk menyelesaikan permintaan, biasanya pengalihan ke URL lain. Contoh: `301 Moved Permanently`.
>  >   
> >- **4xx (Client Error):** Permintaan mengandung sintaks yang salah atau tidak dapat dipenuhi. Contoh: `404 Not Found`, `403 Forbidden`.
>  >   
> >- **5xx (Server Error):** Server gagal memenuhi permintaan yang valid. Contoh: `500 Internal Server Error`.
>  >   
> >
> > ### HTTP Headers
> > 
> > Header menyediakan informasi kontekstual tentang pesan.
> >
> > - **General Headers:** Berlaku untuk request dan response (misal: `Date`, `Connection`).
> >   
> > - **Request Headers:** Spesifik untuk request (misal: `Host`, `User-Agent`, `Referer`, `Authorization`, `Cookie`). `Host` wajib ada di HTTP/1.1 untuk mendukung _virtual hosting_.
> >    
> >- **Response Headers:** Spesifik untuk response (misal: `Server`, `Location`, `Set-Cookie`).
> >   
> > - **Entity Headers:** Mendeskripsikan _message body_ (misal: `Content-Type`, `Content-Length`, `Last-Modified`).
> >
> > |**Header Variable**|**Fungsi Utama**|**HTTP Request **|**HTTP Response **|
> >|---|---|---|---|
> >|**Content-Length**|Menunjukkan ukuran _body_ pesan (penting saat mengirim POST/PUT atau respons).|✅|✅|
> >|**Content-Type**|Menunjukkan format data di _body_ (misalnya, `application/json`, `text/html`).|✅|✅|
> >|**Set-Cookie**|Menginstruksikan _browser_ untuk menyimpan _cookie_ baru.|❌|✅|
> >|**User-Agent**|Mengidentifikasi _client_ (jenis _browser_, sistem operasi).|✅|❌|
> >|**Cookie**|Mengirimkan _cookie_ yang tersimpan kembali ke _server_.|✅|❌|
> >|**Last-Modified**|Menunjukkan kapan sumber daya terakhir dimodifikasi di _server_.|❌|✅|
> >|**Accept**|Memberi tahu _server_ format data apa yang diterima _client_ (misalnya, `application/json`).|✅|❌|
> >|**Authorization**|Mengirimkan kredensial otentikasi (misalnya, _Bearer Token_).|✅|❌|
> >|**Location**|Digunakan untuk pengalihan (_redirect_).|❌|✅|
> >    
> >
> > ### Caching Control & Persistent Connection
> >
> > - **Caching:** Browser dapat menyimpan salinan respons untuk mempercepat waktu muat. Header `If-Modified-Since` pada request dan `Last-Modified` pada response digunakan untuk memeriksa apakah konten telah berubah, sehingga browser tidak perlu mengunduh ulang jika masih sama.
> >   
> > - **Persistent Connection:** HTTP/1.0 membuka koneksi TCP baru untuk setiap request, yang tidak efisien. HTTP/1.1 memperkenalkan koneksi persisten (`Connection: Keep-Alive`), di mana satu koneksi TCP dapat digunakan kembali untuk beberapa request-response, mengurangi latensi.
> >   
> >
> > ### Evolusi HTTP: HTTP/1.1 vs HTTP/2
> >
> > HTTP/1.1, yang telah digunakan sejak lama, memiliki beberapa masalah kinerja seperti _Head-of-Line Blocking_ (satu request lambat menahan request berikutnya). HTTP/2 diperkenalkan untuk mengatasi masalah ini.
> > 
> > ![[Pasted image 20250908082911.png]]
> > 
> >**Peningkatan di HTTP/2:**
> >
> > 1. **Protokol Biner:** Lebih efisien untuk diproses oleh mesin dibandingkan protokol teks HTTP/1.1.
>  >   
> > 2. **Multiplexing:** Memungkinkan beberapa request dan response dikirim secara bersamaan melalui satu koneksi TCP tunggal, menghilangkan _Head-of-Line Blocking_.
> >   
> > 3. **Kompresi Header:** Mengurangi ukuran header untuk menghemat bandwidth.
> >   
> > 4. **Server Push:** Server dapat proaktif mengirim sumber daya yang akan dibutuhkan klien bahkan sebelum diminta (misalnya, mengirim file CSS saat HTML diminta).
> >    
> >
> > ### HTTPS: HTTP yang Aman
> >
> > HTTPS adalah singkatan dari HTTP over TLS (Transport Layer Security) over TCP. Ini bukan protokol yang terpisah, melainkan penggunaan HTTP di atas lapisan enkripsi. Sebelum komunikasi HTTP dimulai, klien dan server melakukan _TCP 3-way handshake_ diikuti oleh _TLS handshake_ untuk membuat saluran komunikasi yang aman dan terenkripsi.
> > 
> > ![[Pasted image 20250908082934.png]]

> [!cornell] #### Summary
> HTTP adalah protokol lapisan aplikasi yang stateless dan bekerja dengan model permintaan-respons untuk komunikasi di World Wide Web. Setiap pesan HTTP, baik permintaan maupun respons, memiliki struktur yang terdiri dari start-line, header, dan body opsional. Metode permintaan seperti GET dan POST mendefinisikan aksi yang diinginkan, sementara kode status memberikan umpan balik atas hasilnya. Evolusi dari HTTP/1.1 ke HTTP/2 membawa perbaikan kinerja signifikan melalui fitur seperti multiplexing dan kompresi header. Untuk keamanan, HTTPS mengenkripsi komunikasi HTTP menggunakan TLS.

> [!ad-libitum]- Additional Information
> 
> #### Pendalaman Teknis: TCP & TLS Handshake
> 
> - **TCP 3-Way Handshake:** Sebelum data HTTP dikirim, TCP memastikan koneksi andal terbentuk. Proses ini melibatkan tiga langkah:
>     
>     1. **SYN:** Klien mengirim paket SYN (Synchronize) ke server.
>         
>     2. **SYN-ACK:** Server merespons dengan paket SYN-ACK (Synchronize-Acknowledge).
>         
>     3. **ACK:** Klien mengirim paket ACK (Acknowledge) kembali ke server. Setelah ini, koneksi siap digunakan.
>         
> - **TLS Handshake (untuk HTTPS):** Setelah koneksi TCP terbentuk, proses ini terjadi untuk membuat saluran aman:
>     
>     1. **ClientHello:** Klien mengirimkan spesifikasi kriptografi yang didukungnya.
>         
>     2. **ServerHello:** Server memilih salah satu spesifikasi dan mengirimkan sertifikat digitalnya.
>         
>     3. **Verifikasi & Key Exchange:** Klien memverifikasi sertifikat server dan kedua belah pihak secara aman bertukar kunci sesi yang akan digunakan untuk enkripsi data.
>         
>     4. **Finished:** Kedua sisi mengonfirmasi bahwa proses handshake selesai dan enkripsi dimulai.
>         
> 
> #### Eksplorasi Mandiri
> 
> - **Gunakan Developer Tools Browser:** Buka tab 'Network' di browser Anda (biasanya dengan F12), lalu kunjungi sebuah website. Anda dapat melihat setiap permintaan dan respons HTTP secara detail, termasuk metode, status, header, dan body. Ini adalah cara terbaik untuk melihat HTTP beraksi.
>     
> - **Gunakan `curl` atau Postman:** Untuk kontrol yang lebih besar, gunakan alat baris perintah seperti `curl` atau aplikasi GUI seperti Postman untuk membuat permintaan HTTP kustom. Coba lakukan request GET ke API publik, atau coba kirim data dengan POST.
>     
>     - Contoh dengan `curl`: `curl -v http://example.com` (Opsi `-v` untuk melihat detail request dan response).
>         
> 
> #### Sumber & Referensi Lanjutan:
> 
> - **MDN Web Docs - HTTP:** Sumber daya yang sangat baik dan mudah dipahami untuk semua hal tentang HTTP: [https://developer.mozilla.org/en-US/docs/Web/HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP "null")
>     
> - **RFC 7230-7235:** Dokumen spesifikasi resmi untuk HTTP/1.1. Sangat teknis tetapi merupakan sumber kebenaran utama.
>     
> - **RFC 7540:** Spesifikasi resmi untuk HTTP/2.
>     
> - **High Performance Browser Networking (HPBN) by Ilya Grigorik:** Buku online gratis yang membahas seluk beluk jaringan web, termasuk HTTP/1.1 dan HTTP/2 secara mendalam.
>