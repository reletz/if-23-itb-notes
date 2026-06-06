---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] OWASP API Security Top 10 dan Kerentanan Umum
>
> > ## Questions/Cues
> >
> > - Apa saja sepuluh risiko utama dalam OWASP API Security Top 10?
> > - Apa itu BOLA dan mengapa menjadi risiko nomor satu?
> > - Bagaimana excessive data exposure dan lack of rate limiting dieksploitasi?
> > - Apa yang membedakan injection flaws pada konteks API?
> > - Pelajaran apa yang bisa diambil dari breach API dunia nyata?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W11 Secure APIs and Microservices — bagian "API Security Threat Landscape, Common Vulnerabilities & Case Study")
>
> > ### OWASP API Security Top 10
> >
> > **OWASP API Security Top 10** adalah daftar standar yang menyoroti risiko keamanan paling kritis khusus untuk API. Berbeda dari OWASP Top 10 web umum, daftar ini fokus pada masalah yang dominan pada antarmuka mesin-ke-mesin. Kesepuluh risiko tersebut adalah: **(1) Broken Object Level Authorization (BOLA)**—penyerang mengakses objek milik pengguna lain dengan mengganti identifier; **(2) Broken Authentication**—mekanisme autentikasi yang lemah atau salah implementasi memungkinkan pengambilalihan identitas; **(3) Broken Object Property Level Authorization**—gabungan *excessive data exposure* dan *mass assignment*, di mana API membocorkan atau menerima properti objek yang tidak seharusnya.
> >
> > Selanjutnya: **(4) Unrestricted Resource Consumption**—tidak adanya batasan kuota/rate sehingga rentan terhadap DoS dan pembengkakan biaya; **(5) Broken Function Level Authorization**—pengguna biasa dapat mengakses fungsi administratif karena pengecekan otorisasi per-fungsi yang lemah; **(6) Unrestricted Access to Sensitive Business Flows**—alur bisnis sensitif (misalnya pembelian tiket, registrasi) dapat disalahgunakan secara otomatis (bot, scalping) tanpa pembatasan; **(7) Server Side Request Forgery (SSRF)**—API dipaksa melakukan permintaan ke sumber daya internal yang tidak seharusnya diakses.
> >
> > Tiga sisanya: **(8) Security Misconfiguration**—konfigurasi default yang tidak aman, header keamanan yang hilang, atau pesan error yang terlalu informatif; **(9) Improper Inventory Management**—endpoint lama/versi usang (*shadow API* dan *zombie API*) yang masih aktif tanpa pengawasan; serta **(10) Unsafe Consumption of APIs**—terlalu mempercayai data dari API pihak ketiga tanpa validasi, sehingga rentan diserang melalui rantai pasok (supply chain). Memahami daftar ini memberi kerangka prioritas mitigasi yang terstruktur.
> >
> > ```mermaid
> > flowchart TD
> >     A["OWASP API Top 10"] --> B["Authorization: BOLA, Function-Level, Property-Level"]
> >     A --> C["Authentication: Broken Auth"]
> >     A --> D["Resource: Unrestricted Consumption &amp; Business Flows"]
> >     A --> E["Server-side: SSRF, Misconfiguration"]
> >     A --> F["Operasional: Inventory Mgmt, Unsafe Consumption"]
> > ```
> >
> > ### Kerentanan API yang Umum
> >
> > Beberapa kerentanan paling sering dijumpai di lapangan. **Broken Object-Level Authorization (BOLA)** terjadi ketika penyerang dapat mengakses data yang bukan miliknya. Contoh klasik: endpoint `GET /api/users/123/invoice`; bila server hanya memeriksa bahwa pengguna telah login tetapi tidak memverifikasi bahwa `123` memang milik pengguna tersebut, penyerang cukup mengganti angka menjadi `124` untuk mencuri faktur orang lain. Inilah mengapa BOLA menempati peringkat teratas—mudah dieksploitasi dan dampaknya besar.
> >
> > **Broken Authentication** mencakup autentikasi yang lemah atau hilang: token JWT tanpa verifikasi signature, endpoint reset password yang dapat di-brute-force, atau API key yang tertanam (hardcoded) di kode klien. **Excessive Data Exposure** terjadi ketika API mengembalikan lebih banyak data dari yang dibutuhkan—misalnya endpoint profil mengembalikan seluruh objek user termasuk `password_hash` dan `is_admin`, mengandalkan klien untuk menyaringnya. Penyerang cukup mengamati respons mentah untuk memanen data sensitif tersebut.
> >
> > **Lack of Rate Limiting** membuat API rentan terhadap serangan **brute-force** dan **DoS**: tanpa pembatasan, penyerang dapat mencoba ribuan kombinasi password atau membanjiri server hingga lumpuh. **Injection Flaws** muncul ketika input yang tidak divalidasi diteruskan ke interpreter—menyebabkan **SQL injection** (penyisipan sintaks SQL ke parameter) atau **command injection** (eksekusi perintah OS). Pencegahannya konsisten: validasi otorisasi per objek, prepared statements, rate limiting, dan tidak mengembalikan data lebih dari kebutuhan.
> >
> > ### Studi Kasus: API Breach Dunia Nyata
> >
> > Insiden nyata menunjukkan betapa mahalnya kelalaian pada **autentikasi** dan **otorisasi** API. Pada kasus **Facebook (2018)**, fitur "View As" mengandung bug yang membocorkan **access token** sehingga penyerang dapat mengambil alih sekitar 50 juta akun—token yang seharusnya hanya untuk satu konteks ternyata dapat digunakan lintas konteks (kegagalan kontrol otorisasi).
> >
> > Pada kasus **Twitter**, kerentanan pada API memungkinkan korelasi nomor telepon atau email dengan akun pengguna, sehingga data jutaan akun dapat dikumpulkan (di-scrape) dan kemudian dibocorkan—contoh gabungan *excessive data exposure* dan *lack of rate limiting* yang memungkinkan enumerasi massal. Pada kasus **T-Mobile**, penyerang mengeksploitasi sebuah API tanpa autentikasi yang memadai untuk menarik data jutaan pelanggan (nama, alamat, nomor) secara berulang—klasik **Broken Authentication** dikombinasikan dengan tidak adanya pembatasan akses.
> >
> > **Pelajaran** yang dapat dipetik konsisten di seluruh kasus: pertama, **strong access control** wajib diberlakukan dan diverifikasi di sisi server untuk setiap permintaan, bukan hanya saat login. Kedua, **rate limiting** dan deteksi pola enumerasi mencegah pemanenan data massal. Ketiga, **monitoring dan logging** yang aktif memungkinkan deteksi dini—banyak breach baru disadari berbulan-bulan kemudian karena tidak ada pemantauan terhadap akses anomali. Keempat, **minimalkan data exposure**—API tidak boleh mengembalikan field sensitif yang tidak relevan dengan kebutuhan klien.

> [!cornell] #### Summary
>
> **OWASP API Security Top 10** memetakan risiko khas API, dipimpin oleh **Broken Object Level Authorization (BOLA)**, diikuti Broken Authentication, Broken Object Property Level Authorization, Unrestricted Resource Consumption, Broken Function Level Authorization, akses tak terbatas ke alur bisnis sensitif, SSRF, Security Misconfiguration, Improper Inventory Management, dan Unsafe Consumption of APIs. Kerentanan paling umum di lapangan adalah BOLA, broken authentication, excessive data exposure, lack of rate limiting, dan injection flaws. Studi kasus nyata pada **Facebook, Twitter, dan T-Mobile** memperlihatkan bahwa lemahnya autentikasi/otorisasi berujung kebocoran data dan pengambilalihan akun, dengan pelajaran utama: kontrol akses kuat, rate limiting, serta monitoring dan logging yang konsisten.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Mengapa BOLA Sulit Dideteksi Otomatis (DI LUAR sumber)
> Scanner keamanan otomatis mudah menemukan injection atau misconfiguration, tetapi **BOLA bersifat kontekstual**: tool tidak tahu bahwa objek `124` "seharusnya" tidak boleh diakses oleh pengguna pemilik objek `123`, karena itu adalah logika bisnis. Karena itu BOLA paling efektif ditemukan lewat **pengujian manual** atau alat yang memahami relasi kepemilikan objek. Mitigasi terbaik adalah pola *object ownership check* yang dipusatkan di lapisan middleware/authorization, bukan ditulis ulang di setiap handler.
>
> #### Lebih dalam — GraphQL dan Risiko Spesifiknya
> API **GraphQL** memunculkan variasi risiko: **query depth/complexity attack** (query bersarang dalam yang membebani server—bentuk *Unrestricted Resource Consumption*), **introspection** yang membocorkan seluruh skema bila tidak dimatikan di produksi, serta *batching* yang dapat menyiasati rate limiting berbasis request. Mitigasinya meliputi pembatasan kedalaman/kompleksitas query, mematikan introspection di produksi, dan rate limiting berbasis kompleksitas.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pasang aplikasi rentan **OWASP crAPI** atau **VAmPI**, lalu reproduksi serangan BOLA dan broken authentication menggunakan Postman/Burp Suite; dokumentasikan request dan responsnya.
> 2. Tulis skrip untuk menguji ada/tidaknya rate limiting pada sebuah endpoint login lab, ukur berapa banyak percobaan yang diizinkan sebelum diblokir.
> 3. Buat tabel pemetaan: untuk setiap risiko OWASP API Top 10, tuliskan satu contoh konkret dan satu kontrol mitigasi spesifik.
>
> #### Bacaan Lanjutan
> - OWASP API Security Top 10 (2023) — dokumen resmi dan penjelasan tiap kategori.
> - Buku *Hacking APIs* oleh Corey Ball (No Starch Press).
> - Laporan post-mortem resmi insiden Facebook 2018 (Security Update) dan analisis breach T-Mobile.
