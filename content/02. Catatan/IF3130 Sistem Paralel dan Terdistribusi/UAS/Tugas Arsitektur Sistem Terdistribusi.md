_Back to_ [[IF3130 Sistem Paralel dan Terdistribusi]]

> Pilihlah 1 aplikasi yang ada di handphone kalian [Aplikasi yang sama dengan Tugas CAP].  
>   
> Kemudian jelaskan pendekatan yang diambil oleh aplikasi tersebut terkait dengan Arsitektur nya.  
  
## WhatsApp

WhatsApp, dengan lebih dari dua miliar pengguna, tidak dapat dianalisis menggunakan satu pola arsitektur saja. Sebaliknya, WhatsApp menggunakan **Arsitektur Hybrid** yang menggabungkan beberapa pola arsitektur untuk menangani tugas-tugas spesifik yang berbeda. WhatsApp memadukan pola **Client-Server** sebagai fondasi, dengan arsitektur **Event-Driven (Berbasis Peristiwa)** untuk inti pesannya, dan elemen **Peer-to-Peer (P2P)** serta **Edge-Server**  untuk fitur-fitur khusus seperti panggilan dan media.

Pada dasarnya, WhatsApp adalah sistem **Client-Server**. _Client_ adalah aplikasi di ponsel kita, dan _Server_ adalah infrastruktur backend masif yang dijalankan oleh WhatsApp/Meta. Server mengimplementasikan **Service-Based Architecture**  (atau _Microservices_). Ada layanan-layanan terpisah untuk menangani otentikasi pengguna, manajemen profil, daftar kontak, dan (yang paling penting) pengiriman pesan.

Untuk pengiriman pesan, WhatsApp menggunakan **Event-Driven Architecture (EDA)**.

1. **Pengiriman (Asinkronus):** Saat kita mengirim pesan, _client_ kita (Producer) mengirimkan "event" ke _backend_ WhatsApp. _Backend_ menempatkan pesan ini di _event channel_ (antrian/broker) dan segera mengirim balasan "OK" ke ponsel kita (menghasilkan centang satu). Ini adalah komunikasi **asinkronus**; _client_ kita tidak terblokir.
    
2. **Penerimaan (Push):** _Client_ penerima tidak _menarik_ (pull) pesan. Sebaliknya, ia memelihara satu koneksi persisten (terbuka) ke server. Server (Processor), yang memonitor _event channel_, melihat ada pesan baru untuk _client_ tersebut dan langsung **mendorong (push)** "event" pesan itu melalui koneksi yang sudah terbuka.
  
Lalu, saat kita mengirim foto atau video, _file_ media tersebut _tidak_ dikirim melalui _event channel_ yang sama dengan teks. WhatsApp menggunakan model yang mirip dengan **Edge-Server / Content Delivery Network (CDN)**.

1. Media (foto/video) diunggah ke server penyimpanan media (_edge server_) yang terpisah.
    
2. Server ini merespons dengan sebuah _pointer_ (seperti URL) ke media tersebut.
    
3. Pesan teks (event) yang dikirimkan ke penerima hanyalah pesan kecil yang berisi _pointer_ tersebut (dan _thumbnail_).
    
4. Aplikasi penerima kemudian menggunakan _pointer_ itu untuk mengunduh media dari _edge server_ terdekat.


Untuk panggilan suara dan video, latensi menjadi masalah. Di sini, WhatsApp menggunakan **Peer-to-Peer (P2P)**.

1. **Inisiasi (Server):** Saat kita memulai panggilan, _client_ kita menghubungi server WhatsApp (model Client-Server). Server bertindak seperti _Tracker_ pada BitTorrent, mengoordinasikan _client_ kita dan _client_ penerima.
    
2. **Koneksi (P2P):** Server membantu kedua _client_ untuk menemukan satu sama lain dan mencoba membangun koneksi **P2P** langsung. Jika berhasil, data suara/video mengalir langsung antar _peers_, menghasilkan latensi terendah.
    
3. **Fallback (Server Relay):** Jika koneksi P2P gagal (misalnya karena _firewall_ atau NAT), sistem secara dinamis beralih ke model _fallback_. Panggilan akan di-relay melalui **server** khusus (mirip _Superpeer_). Ini lebih lambat, tetapi menjamin panggilan tetap terhubung.
    

## Kesimpulan

Arsitektur WhatsApp mengadopsi **pendekatan hybrid**:

- **Service-Based** untuk organisasi _backend_.
    
- **Event-Driven** untuk _messaging_ (mengutamakan skalabilitas dan responsivitas).
    
- **Edge-Server (CDN)** untuk _media_ (mengutamakan efisiensi _bandwidth_).
    
- **P2P** untuk _panggilan_ (mengutamakan latensi rendah).