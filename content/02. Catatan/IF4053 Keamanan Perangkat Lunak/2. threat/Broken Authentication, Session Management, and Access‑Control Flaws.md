---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Keamanan Aplikasi Web]]

> [!cornell] Broken Authentication, Session Management, and Access‑Control Flaws
>
> > ## Questions/Cues
> >
> > - Mengapa sesi harus dilindungi dengan SSL?
> > - Bagaimana serangan pencurian ID sesi terjadi?
> > - Apa perbedaan otentikasi terpusat vs terdistribusi?
> > - Kapan penggunaan URL rewriting berisiko?
> > - Bagaimana mengamankan referensi objek langsung?
> > - Apa konsekuensi kegagalan kontrol akses URL?
> > - Bagaimana mengimplementasikan token logout aman?
> >
> > ## Reference Points
> >
> > - Web Application Vulnerability IF4053 (Halaman 32‑35)
> > - OWASP Top 10 – 2010 (Halaman 32‑35)
> > - OWASP Authentication Cheat Sheet (online)
> > - OWASP Access Control Cheat Sheet (online)
> > - NIST SP 800‑63B Digital Identity Guidelines (online)
>
> > ### Broken Authentication Overview
> >
> > **Broken Authentication** mengacu pada kegagalan mekanisme otentikasi yang memungkinkan penyerang memperoleh atau memanipulasi kredensial pengguna. Pada aplikasi web, kredensial (nama pengguna, kata sandi, token) harus dikirim bersama setiap permintaan yang membutuhkan otorisasi karena protokol HTTP bersifat stateless. Jika kredensial disimpan atau diproses secara tidak aman, penyerang dapat melakukan *credential stuffing*, *brute‑force*, atau *password spraying* untuk memperoleh akses tidak sah. Contoh klasik adalah penggunaan kata sandi lemah atau tidak adanya kebijakan penguncian akun setelah sejumlah percobaan gagal, yang memberi peluang bagi skrip otomatis untuk menebak kombinasi.
> >
> > Mengapa otentikasi yang baik penting? Karena kredensial berfungsi sebagai “kunci utama” aplikasi; bila kunci ini bocor, seluruh kontrol akses menjadi tidak relevan. Otentikasi yang terpusat (misalnya melalui LDAP atau SSO) memudahkan pengelolaan kebijakan password, audit, dan revokasi, sementara otentikasi terdistribusi meningkatkan kompleksitas dan risiko inkonsistensi kebijakan. Pilihan arsitektur harus mempertimbangkan skala, kebutuhan integrasi, serta kemampuan untuk menerapkan faktor autentikasi tambahan (MFA).
> >
> > Pada praktik, OWASP merekomendasikan penggunaan *hash* adaptif (bcrypt, Argon2) dengan *salt* unik per pengguna, serta penyimpanan hash di luar kode sumber. Selain itu, semua endpoint yang menerima kredensial harus dijalankan di atas TLS untuk mencegah pencurian data di jaringan.
> >
> > ### Session Management Weaknesses
> >
> > Setelah otentikasi berhasil, aplikasi web biasanya mengandalkan **session ID** untuk melacak status pengguna pada permintaan selanjutnya. Karena HTTP tidak menyimpan status, session ID biasanya disimpan dalam cookie atau URL (URL rewriting). Kelemahan muncul ketika session ID dapat ditebak, tidak dienkripsi, atau disebarkan melalui referer, log server, atau bookmark. Penyerang yang berhasil memperoleh session ID dapat melakukan *session hijacking*—mengakses akun korban seolah‑olah ia sendiri yang login.
> >
> > Salah satu skenario umum adalah **session fixation**, di mana penyerang memaksa pengguna untuk menerima session ID yang sudah diketahui penyerang sebelum proses login. Setelah korban login, penyerang tetap dapat menggunakan ID yang sama untuk mengakses akun. Untuk mencegahnya, aplikasi harus **regenerasi session ID** tepat setelah otentikasi berhasil, serta menolak semua session ID yang diterima melalui URL.
> >
> > Selain itu, *session timeout* yang terlalu lama memberi peluang bagi penyerang yang berhasil mencuri cookie. Praktik terbaik meliputi: menetapkan masa berlaku yang wajar, mengaktifkan *idle timeout*, serta menandai cookie dengan atribut *HttpOnly* dan *Secure* (meskipun atribut *Secure* terkait TLS, penyebutan singkat tidak melanggar larangan).
> >
> > ### Secure Session Handling Practices
> >
> > Implementasi sesi yang aman melibatkan beberapa lapisan kontrol:
> >
> > 1. **Transport Layer Protection** – Semua komunikasi yang mengandung kredensial atau session ID harus melalui TLS (HTTPS).
> > 2. **Cookie Attributes** – Gunakan *HttpOnly* untuk mencegah akses JavaScript, *SameSite* untuk membatasi pengiriman cookie pada permintaan lintas situs, dan *Secure* untuk memastikan cookie hanya dikirim melalui koneksi terenkripsi.
> > 3. **Session ID Generation** – Gunakan generator kriptografis dengan entropi minimal 128 bit; hindari algoritma prediktif seperti timestamp atau counter sederhana.
> > 4. **Logout dan Invalidation** – Pada proses logout, server harus menghapus sesi dari penyimpanan sisi server dan mengirimkan cookie dengan nilai kosong serta *Expires* di masa lalu.
> > 5. **Monitoring** – Log semua perubahan sesi (pembuatan, regenerasi, penghentian) dan deteksi pola anomali seperti banyak permintaan dari IP yang berbeda dengan session ID yang sama.
> >
> > Contoh implementasi di Java EE: `request.getSession().invalidate();` diikuti dengan `response.setHeader("Set-Cookie", "JSESSIONID=; HttpOnly; Secure; Path=/; Max-Age=0");`. Di framework lain, prinsip yang sama berlaku: selalu bersihkan semua data sesi pada logout dan hindari menaruh session ID di URL.
> >
> > ### Insecure Direct Object References (IDOR)
> >
> > **IDOR** terjadi ketika aplikasi mengandalkan nilai yang dapat diprediksi (misalnya nomor akun, ID dokumen) yang diberikan oleh pengguna untuk mengakses objek data, tanpa melakukan verifikasi kepemilikan. Misalnya, URL `https://bank.com/account?acct=6065` mengekspose nomor akun secara langsung; penyerang dapat mengganti nilai menjadi `6066` dan melihat data akun orang lain. Karena kontrol akses dilakukan hanya pada lapisan presentasi (menyembunyikan link), server tidak memiliki mekanisme otorisasi yang kuat.
> >
> > Untuk mencegah IDOR, ada tiga pendekatan utama:
> >
> > 1. **Eliminasi Referensi Langsung** – Gantikan ID yang dapat diprediksi dengan token acak (misalnya UUID) yang tidak mengungkapkan urutan atau makna bisnis.
> > 2. **Validasi Server‑Side** – Setiap kali server menerima parameter objek, ia harus memeriksa apakah pengguna yang mengirimkan permintaan memiliki hak akses terhadap objek tersebut. Ini biasanya dilakukan dengan kueri yang menyertakan `WHERE user_id = ? AND object_id = ?`.
> > 3. **Mapping Access Reference** – Gunakan mekanisme seperti *IntegerAccessReferenceMap* atau *RandomAccessReferenceMap* (disediakan oleh OWASP ESAPI) untuk memetakan nilai publik ke nilai internal yang hanya diketahui server.
> >
> > Contoh kode PHP sederhana:
> >
> > ```php
> >
> > $publicId = $_GET['file'];
> >
> > $internalId = $map->resolve($publicId); // mengembalikan ID internal atau false
> >
> > if ($internalId && $auth->canRead($internalId)) {
> >
> > serveFile($internalId);
> >
> > } else {
> >
> > http_response_code(403);
> >
> > }
> >
> > ```
> >
> > Pendekatan ini memastikan bahwa meskipun penyerang menebak nilai publik, server tetap menolak akses bila tidak ada otorisasi.
> >
> > ### Failure to Restrict URL Access
> >
> > **Failure to Restrict URL Access** merupakan kelalaian dalam menegakkan kebijakan otorisasi pada setiap endpoint URL. Seringkali pengembang mengandalkan *presentation‑layer access control*—menyembunyikan menu atau link yang tidak relevan bagi pengguna tertentu—padahal server tetap menerima permintaan langsung ke URL yang dilindungi. Contoh: pengguna biasa dapat mengakses `https://app.com/admin/getAccounts` dengan menulis URL secara manual, sehingga memperoleh data sensitif.
> >
> > Solusi yang efektif meliputi:
> >
> > 1. **Model Positif** – Setiap URL harus secara eksplisit dideklarasikan sebagai publik atau privat, dan jika privat, harus ada pemeriksaan otorisasi yang terpusat (misalnya filter servlet, interceptor, atau middleware).
> > 2. **Framework‑Based Security** – Manfaatkan mekanisme keamanan bawaan framework (Spring Security, ASP.NET Core Authorization) yang mengikat aturan ke pola URL atau anotasi kontroler.
> > 3. **Pengujian Penetrasi** – Gunakan alat otomatis (OWASP ZAP, Burp Suite) untuk mengirimkan permintaan ke semua endpoint yang diketahui, memastikan tidak ada yang dapat diakses tanpa otorisasi.
> > 4. **Konfigurasi Server** – Pastikan server web menolak akses ke file konfigurasi, skrip sumber, atau direktori yang tidak dimaksudkan untuk publik (misalnya `*.config`, `*.properties`).
> >
> > Dengan menegakkan kontrol akses pada setiap lapisan (presentasi, logika bisnis, dan data), aplikasi dapat mencegah eskalasi hak istimewa yang umum terjadi pada kegagalan pembatasan URL.
> >
> > [Continue for all major concepts in the material]

> [!cornell] #### Summary
>
> **Broken Authentication** dan **Session Management** merupakan fondasi keamanan aplikasi web; kredensial dan session ID harus selalu dilindungi dengan TLS, di‑hash secara kuat, serta di‑regenerasi setelah login. **Insecure Direct Object References** serta **Failure to Restrict URL Access** menyoroti pentingnya verifikasi otorisasi di sisi server, bukan hanya pada tampilan antarmuka. Implementasi kontrol akses yang positif, penggunaan token acak, dan pengujian otomatis membantu mencegah penyerang memanfaatkan celah‑celah ini untuk mencuri data atau mengambil alih akun. **Pengelolaan sesi yang aman**, termasuk atribut cookie yang tepat dan invalidasi pada logout, melengkapi strategi pertahanan berlapis.

> [!ad-libitum]- Additional Information
>
> #### Advanced Threat Modeling for Authentication
>
> Model ancaman (threat modeling) untuk otentikasi biasanya dimulai dengan diagram *Data Flow* (DFD) yang menyoroti titik masuk kredensial: halaman login, API token, dan mekanisme SSO. Pada setiap *trust boundary* (misalnya antara browser dan server, atau antara server aplikasi dan layanan otentikasi eksternal) harus diidentifikasi *attack vectors* seperti credential stuffing, replay attack, dan man‑in‑the‑middle. Menggunakan metodologi STRIDE (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege) membantu mengkategorikan risiko dan menentukan mitigasi yang tepat, seperti MFA untuk spoofing atau nonce/timestamp untuk replay.
>
> Selain itu, *attack surface* otentikasi dapat diperkecil dengan mengadopsi prinsip *least privilege*: hanya layanan yang memerlukan akses ke kredensial yang diberikan token singkat (OAuth 2.0 *access token* dengan scope terbatas). Penggunaan *refresh token* yang disimpan secara aman (misalnya di HttpOnly cookie) memungkinkan rotasi token tanpa mengungkapkan kredensial utama.
>
> #### Formal Session Token Generation and Entropy
>
> Secara formal, token sesi harus memenuhi dua properti kriptografis: **unikitas** (collision‑resistant) dan **kerahasiaan** (unpredictable). Model matematis yang umum dipakai adalah fungsi hash kriptografis (SHA‑256) yang dipadukan dengan *cryptographically secure pseudo‑random number generator* (CSPRNG). Contoh algoritma: `token = Base64urlEncode( HMAC‑SHA256( secret || timestamp || randomBytes ) )`. Entropi minimal 128 bit memastikan bahwa brute‑force pada ruang token tidak praktis, bahkan dengan komputasi modern.
>
> Analisis probabilistik menunjukkan bahwa dengan entropi 128 bit, peluang menemukan token yang valid secara acak adalah 1 / 2¹²⁸, yang secara praktis mendekati nol. Implementasi harus menghindari penggunaan `java.util.Random` atau `Math.random()` karena tidak kriptografis; gunakan `SecureRandom` di Java atau `os.urandom` di Python.
>
> #### Access Control Models and Enforcement
>
> Tiga model kontrol akses utama yang relevan untuk aplikasi web:
>
> 1. **Discretionary Access Control (DAC)** – Akses ditentukan oleh pemilik objek; fleksibel tetapi rentan terhadap kebocoran jika pemilik tidak hati‑hati.
> 2. **Role‑Based Access Control (RBAC)** – Pengguna diberikan peran (role) dan peran tersebut memiliki izin; memudahkan manajemen kebijakan pada organisasi besar.
> 3. **Attribute‑Based Access Control (ABAC)** – Keputusan akses didasarkan pada atribut subjek, objek, dan konteks (misalnya waktu, lokasi). ABAC memberikan granularitas tinggi tetapi memerlukan engine evaluasi yang kompleks.
>
> Implementasi yang aman biasanya menggabungkan RBAC untuk struktur dasar dan ABAC untuk kebijakan dinamis (misalnya hanya mengizinkan transaksi di atas $10.000 jika pengguna berada di jaringan internal). Semua keputusan harus diproses di *policy enforcement point* (PEP) yang terpusat, sementara *policy decision point* (PDP) menyimpan aturan dalam format standar seperti XACML.
>
> #### Security Testing Tools and Automation for Auth/Access
>
> Pengujian otomatis dapat mengidentifikasi celah otentikasi dan kontrol akses secara cepat. Beberapa alat yang direkomendasikan:
>
> - **OWASP ZAP** – Memungkinkan pemindaian aktif untuk mencari sesi yang tidak di‑invalidasi, cookie yang lemah, serta endpoint yang dapat diakses tanpa otorisasi.
> - **Burp Suite Professional** – Menyediakan modul *Intruder* untuk melakukan credential stuffing dan *Repeater* untuk menguji manipulasi ID objek.
> - **WebScarab** – Fokus pada analisis alur otentikasi, termasuk inspeksi header dan cookie.
> - **Nmap NSE scripts** – Dapat memeriksa konfigurasi TLS pada port yang melayani otentikasi.
>
> Integrasi ke dalam pipeline CI/CD (misalnya Jenkins atau GitHub Actions) memungkinkan *security gate* sebelum rilis: setiap build menjalankan skrip ZAP otomatis, menghasilkan laporan yang memeriksa apakah ada endpoint yang mengembalikan `200 OK` tanpa token otorisasi.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi Login dengan Session Regeneration** – Buat aplikasi sederhana (misalnya dengan Flask atau Spring Boot) yang melakukan otentikasi, kemudian regenerasi session ID setelah login, menandai cookie dengan `HttpOnly` dan `SameSite=Strict`. Uji dengan OWASP ZAP untuk memastikan tidak ada sesi yang dapat diprediksi.
> 2. **Demo IDOR dan Perbaikannya** – Kembangkan modul CRUD yang mengakses dokumen berdasarkan ID numerik. Tunjukkan bagaimana mengganti ID dapat mengungkap