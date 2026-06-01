---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Transport‑Layer Protection, Logging, and Runtime Attack Defense
>
> > ## Questions/Cues
> >
> > - Mengapa TLS penting untuk keamanan transport?
> > - Bagaimana cara kerja sertifikat digital dalam HTTPS?
> > - Apa perbedaan antara logging audit dan logging error?
> > - Kapan harus menerapkan mekanisme deteksi serangan runtime?
> > - Bagaimana cara mengamankan header HTTP untuk mencegah serangan?
> > - Apa konsekuensi konfigurasi protokol yang lemah?
> > - Bagaimana cara memvalidasi integritas log secara kriptografis?
> >
> > ## Reference Points
> >
> > - Web Application Vulnerability IF4053 – Software Security (Halaman 3)
> > - OWASP Top 10 – 2010 (Halaman 3, A9 – Insufficient Transport Layer Protection)
> 
> > ### Transport Layer Protection (TLS/SSL)
> >
> > Transport Layer Security (TLS) adalah protokol kriptografi yang menyediakan kerahasiaan, integritas, dan otentikasi data yang berpindah antara klien dan server. Pada dasarnya, TLS membungkus data aplikasi dalam “envelop” terenkripsi sehingga pihak ketiga yang menyadap jaringan tidak dapat membaca atau memodifikasi isi paket. Proses handshake TLS dimulai dengan negosiasi versi protokol dan cipher suite yang akan dipakai, diikuti dengan pertukaran sertifikat digital. Sertifikat ini berisi kunci publik server yang ditandatangani oleh otoritas sertifikat (CA) terpercaya; klien memverifikasi tanda tangan tersebut untuk memastikan identitas server sebelum melanjutkan pertukaran kunci simetris yang akan dipakai untuk enkripsi data sesungguhnya.
> >
> > Analogi yang sering dipakai adalah “menutup surat dalam amplop berlapis”. Sertifikat digital berperan sebagai cap resmi yang menandakan bahwa amplop memang berasal dari pengirim yang sah, sementara kunci simetris adalah kunci rahasia yang hanya diketahui oleh pengirim dan penerima setelah amplop dibuka. Tanpa amplop (TLS), data aplikasi akan “terbuka” di jaringan, memudahkan penyadapan (eavesdropping) atau manipulasi (tampering).
> >
> > Implementasi TLS yang aman memerlukan beberapa langkah penting: 
> > 1. menonaktifkan versi protokol lama seperti SSL v2/v3 dan TLS 1.0/1.1 karena memiliki kelemahan kriptografi yang diketahui; 
> > 2. memilih cipher suite yang menggunakan algoritma enkripsi kuat (misalnya AES‑GCM) dan algoritma pertukaran kunci berbasis elliptic‑curve (ECDHE) untuk forward secrecy; 
> > 3. mengaktifkan HTTP Strict Transport Security (HSTS) sehingga browser secara otomatis menegakkan penggunaan HTTPS pada domain yang bersangkutan. Selain itu, penggunaan Perfect Forward Secrecy (PFS) memastikan bahwa kompromi kunci jangka panjang tidak memungkinkan dekripsi data yang telah dienkripsi sebelumnya.
> >
> > **Contoh praktis**: sebuah aplikasi perbankan online mengonfigurasi servernya dengan TLS 1.3, cipher suite `TLS_AES_128_GCM_SHA256`, dan mengaktifkan HSTS dengan nilai max‑age 31536000 detik. Pengguna yang mengakses situs melalui HTTP akan otomatis diarahkan ke HTTPS, dan setiap sesi komunikasi dijamin kerahasiaannya bahkan jika kunci privat server diungkap di masa depan.
> >
> > ### Logging yang Efektif untuk Deteksi dan Forensik
> >
> > Logging merupakan komponen krusial dalam siklus pertahanan berlapis karena menyediakan jejak audit yang dapat dianalisis untuk mendeteksi perilaku anomali, mengidentifikasi serangan, serta mendukung investigasi pasca‑insiden. Log yang baik harus memenuhi tiga prinsip utama: 
> > 1. **Kelengkapan** – mencatat semua peristiwa penting seperti autentikasi, perubahan hak akses, dan error kritis
> > 2. **Konsistensi** – menggunakan format terstruktur (misalnya JSON atau Common Event Format) sehingga dapat diproses otomatis oleh sistem SIEM (Security Information and Event Management)
> > 3. **Keamanan** – melindungi integritas log dengan tanda tangan digital atau HMAC, serta menyimpan log di lokasi terpisah (write‑once storage) untuk mencegah manipulasi oleh penyerang yang berhasil masuk ke sistem.
> >
> > Praktik terbaik meliputi: 
> > 1. menambahkan **request ID** unik pada setiap permintaan HTTP sehingga semua log terkait dapat di‑correlate; 
> > 2. mencatat **user identifier**, **timestamp** dengan zona waktu UTC, serta **source IP**; 
> > 3. menghindari pencatatan data sensitif secara mentah (misalnya nomor kartu kredit) dan menggantinya dengan hash atau token; 
> > 4. mengatur retensi log sesuai regulasi (misalnya GDPR atau PCI‑DSS) dan memastikan rotasi log secara periodik. 
> > 5. integrasi selain log: metrics dan traces
> > 
> > Implementasi log aggregation dengan alat seperti **ELK Stack** (Elasticsearch, Logstash, Kibana) atau **Graylog** memungkinkan visualisasi real‑time dan pembuatan alert berbasis pola (misalnya banyak percobaan login gagal dalam satu menit).
> >
> > Contoh: Sebuah layanan e‑commerce menambahkan middleware yang menulis log JSON berisi `request_id`, `user_id`, `endpoint`, `status_code`, dan `response_time`. Log tersebut dikirim ke Logstash, di‑index ke Elasticsearch, dan dipantau oleh Kibana dashboard yang menampilkan lonjakan status 5xx atau peningkatan latency, yang kemudian memicu alert ke tim keamanan melalui Slack.
> >
> > ### Runtime Attack Defense (RASP, WAF, IDS/IPS)
> >
> > Pertahanan pada fase runtime berfokus pada deteksi dan mitigasi serangan yang sedang berlangsung, sebelum mereka dapat menimbulkan kerusakan permanen. Tiga teknologi utama yang sering dipadukan adalah **Runtime Application Self‑Protection (RASP)**, **Web Application Firewall (WAF)**, dan **Intrusion Detection/Prevention Systems (IDS/IPS)**. RASP diintegrasikan langsung ke dalam proses aplikasi; ia memantau alur eksekusi, memeriksa input yang masuk, dan dapat menghentikan operasi berbahaya secara otomatis. Karena berada di dalam konteks aplikasi, RASP memiliki visibilitas yang lebih tinggi dibandingkan WAF yang beroperasi di lapisan jaringan (layer 7) dan biasanya mengandalkan pola signature atau aturan berbasis aturan. IDS/IPS menambahkan lapisan deteksi jaringan yang dapat mengidentifikasi traffic berbahaya melalui analisis protokol dan anomali.
> >
> > Implementasi RASP biasanya melibatkan pustaka atau agen yang disisipkan pada runtime (misalnya **OWASP AppSensor**, **Contrast Security**, atau **Signal Sciences**). Agen ini dapat memblokir eksekusi fungsi yang mencurigakan, mengisolasi thread, atau menghasilkan log keamanan yang kaya konteks. WAF, di sisi lain, dapat dikonfigurasi dengan aturan OWASP ModSecurity Core Rule Set (CRS) untuk memfilter request yang mengandung pola berbahaya, seperti payload yang melanggar format yang diharapkan. IDS/IPS seperti **Snort** atau **Suricata** dapat dipasang di perimeter jaringan untuk mendeteksi scanning, brute‑force, atau traffic yang tidak sesuai dengan baseline. Kombinasi ketiganya memberikan pertahanan berlapis: WAF menolak serangan pada level HTTP, RASP menanggapi ancaman yang berhasil melewati WAF, dan IDS/IPS memberi visibilitas jaringan secara keseluruhan.
> >
> > Contoh skenario: Sebuah aplikasi SaaS mengaktifkan ModSecurity dengan CRS v3.3 pada load balancer, menambahkan agen RASP dari Contrast Security ke dalam container Docker, serta men-deploy Suricata pada jaringan VPC. Ketika penyerang mencoba mengirimkan payload yang memanfaatkan kerentanan deserialisasi (yang telah dipatch), WAF menolak request karena pola anomali, sementara RASP mencatat upaya tersebut dalam log audit, dan Suricata menghasilkan alert “Potential Deserialization Attack” yang dikirim ke SIEM.
> >
> > ### Pengelolaan Konfigurasi Keamanan Transport (Cipher Suites, HSTS, HPKP)
> >
> > Pengaturan konfigurasi TLS tidak hanya melibatkan pemilihan protokol, tetapi juga penentuan **cipher suite** yang tepat, serta header keamanan HTTP yang memperkuat kebijakan transport. Cipher suite menentukan algoritma enkripsi, mode operasi, dan fungsi hash yang dipakai; pemilihan yang buruk dapat membuka celah seperti **BEAST**, **POODLE**, atau **Logjam**. Oleh karena itu, administrator harus menonaktifkan cipher suite yang menggunakan RSA key exchange atau CBC mode, dan lebih memilih **AEAD** (Authenticated Encryption with Associated Data) seperti AES‑GCM atau ChaCha20‑Poly1305. Header **HSTS** (Strict‑Transport‑Security) memberi instruksi kepada browser untuk selalu menggunakan HTTPS selama periode yang ditentukan, mengurangi risiko **SSL‑Stripping**. Sementara **HPKP** (Public Key Pinning) memungkinkan server “menyematkan” fingerprint kunci publik tertentu, sehingga browser menolak sertifikat yang tidak cocok; meskipun HPKP kini dianggap berisiko tinggi dan banyak organisasi beralih ke **Expect‑CT** atau **Certificate Transparency** untuk memantau sertifikat yang dikeluarkan.
> >
> > Implementasi contoh: Pada server Nginx, administrator menambahkan blok konfigurasi berikut:
> >
> > ```nginx
> >
> > ssl_protocols TLSv1.2 TLSv1.3;
> >
> > ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256';
> >
> > ssl_prefer_server_ciphers on;
> >
> > add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
> >
> > ```
> >
> > Konfigurasi ini memastikan hanya protokol TLS 1.2/1.3 yang diizinkan, menggunakan cipher suite AEAD yang kuat, dan mengaktifkan HSTS dengan masa satu tahun serta preload list.
> >
> > ### Integrasi Log dengan Sistem Deteksi Anomali
> >
> > Log yang dihasilkan oleh TLS, WAF, dan RASP dapat di‑konsolidasikan ke dalam platform SIEM untuk analisis korelasi dan deteksi anomali berbasis machine learning. Misalnya, **Elastic Security** atau **Splunk Enterprise Security** dapat memanfaatkan model statistik untuk mengidentifikasi lonjakan koneksi TLS yang tidak biasa (misalnya banyak handshake dengan cipher suite lama) atau pola request yang menandakan serangan **TLS Renegotiation**. Dengan menambahkan metadata seperti **TLS version**, **cipher suite**, dan **certificate fingerprint** ke dalam log, tim keamanan dapat membangun dashboard yang menampilkan tren keamanan transport secara real‑time. Deteksi anomali ini memungkinkan respons cepat, seperti memblokir IP yang melakukan scanning TLS atau menurunkan prioritas cipher suite yang terdeteksi berbahaya.
> >
> > Contoh: Sebuah perusahaan mengonfigurasi Logstash untuk mengekstrak field `tls.version` dan `tls.cipher` dari log Nginx, kemudian menambahkan rule di Elastic Watcher yang mengirim email ke tim keamanan bila persentase handshake TLS 1.0 melebihi 0,1 % dalam satu jam.

> [!cornell] #### Summary
>
> **Transport‑Layer Protection** memastikan kerahasiaan dan integritas data melalui TLS dengan konfigurasi protokol, cipher suite, serta header keamanan seperti HSTS; **Logging** yang lengkap, terstruktur, dan terproteksi memberikan jejak audit yang dapat dianalisis untuk deteksi serangan dan forensik; **Runtime Attack Defense** menggabungkan RASP, WAF, dan IDS/IPS untuk memblokir ancaman yang berhasil melewati lapisan pertama, sementara integrasi log ke SIEM memungkinkan deteksi anomali berbasis perilaku. Kombinasi ketiga lapisan ini membentuk pertahanan berlapis yang kuat terhadap serangan jaringan dan aplikasi modern.

> [!ad-libitum]- Additional Information
>
> #### Formal Security Model for TLS Handshake
>
> Model matematis TLS handshake dapat dijelaskan dengan notasi **Authenticated Key Exchange (AKE)**. Pada fase pertama, client mengirimkan `ClientHello` yang berisi daftar cipher suite yang didukung. Server merespon dengan `ServerHello` yang memilih satu cipher suite, mengirimkan sertifikat X.509, dan (opsional) `ServerKeyExchange`. Kedua pihak kemudian melakukan **Diffie‑Hellman Ephemeral (DHE)** atau **Elliptic‑Curve Diffie‑Hellman Ephemeral (ECDHE)** untuk menghasilkan shared secret `Z = g^{ab} mod p` (atau `Z = (g^a)^b` pada kurva eliptik). Selanjutnya, kedua pihak menurunkan **master secret** `MS = PRF(pre_master_secret, "master secret", ClientHello.random || ServerHello.random)` dan akhirnya **key material** untuk enkripsi dan MAC. Formal proof keamanan AKE menunjukkan bahwa, asalkan masalah log‑discrete‑hard (DL) atau elliptic‑curve‑discrete‑hard (ECDLP) tidak dapat dipecahkan, penyerang tidak dapat memperoleh `MS` atau `Z`. Referensi: **RFC 5246** (TLS 1.2) dan **RFC 8446** (TLS 1.3).
>
> #### Advanced Log Integrity Techniques
>
> Untuk menjamin integritas log pada skala besar, teknik **Merkle Tree** dapat diterapkan. Setiap entri log di‑hash (misalnya SHA‑256) dan digabungkan secara berpasangan hingga terbentuk satu root hash yang disebut **Merkle Root**. Root ini kemudian ditandatangani secara kriptografis dan disimpan di lokasi terpisah (misalnya layanan penyimpanan objek yang hanya dapat ditulis). Pada saat audit, setiap entri dapat diverifikasi dengan membangun kembali jalur hash ke Merkle Root; perubahan pada satu entri akan mengubah seluruh jalur dan menyebabkan verifikasi gagal. Implementasi praktis tersedia dalam proyek **Apache Kafka** (log compaction) dan **AWS CloudTrail** (integrasi dengan AWS KMS untuk tanda tangan).
>
> #### Runtime Application Self‑Protection (RASP) Architecture
>
> RASP biasanya terdiri dari tiga lapisan: (1) **Instrumentation Layer** – menyuntikkan bytecode atau hook ke dalam aplikasi (misalnya Java Agent, .NET Profiler); (2) **Policy Engine** – mendefinisikan aturan deteksi (misalnya “jangan panggil fungsi exec() dengan argumen yang berasal dari input pengguna”); (3) **Response Module** – menentukan aksi mitigasi (block, alert, sandbox). Kebijakan dapat diprogram secara dinamis melalui API, memungkinkan adaptasi cepat terhadap ancaman baru. RASP juga dapat mengumpulkan **telemetry** (call stack, parameter values) yang kemudian dikirim ke SIEM untuk analisis lebih lanjut. Kelebihan utama RASP adalah **context awareness**: ia mengetahui state aplikasi pada saat serangan terjadi, sehingga dapat membedakan antara false positive dan serangan nyata.
>
> #### Edge Cases: TLS Renegotiation and Session Resumption
>
> *Renegotiation* memungkinkan klien dan server melakukan handshake tambahan pada koneksi yang sudah ada, misalnya untuk meminta sertifikat klien setelah otentikasi awal. Namun, renegotiasi yang tidak terkontrol dapat dimanfaatkan untuk **DoS** (renegotiation flood) atau **session injection**.
> - OWASP Cheat Sheet Series: Transport Layer Protection (https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html)
> - OWASP Logging Cheat Sheet (https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
> - OWASP Runtime Application Self‑Protection (RASP) Guide (https://owasp.org/www-project-rasp/)