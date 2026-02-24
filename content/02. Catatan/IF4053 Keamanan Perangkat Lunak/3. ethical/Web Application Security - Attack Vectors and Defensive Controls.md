---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Course Name]]

> [!cornell] Web Application Security: Attack Vectors and Defensive Controls
>
> > ## Questions/Cues
> >
> > - Mengapa autentikasi menjadi target utama penyerang?
> > - Bagaimana serangan pada manajemen sesi dapat memanipulasi identitas pengguna?
> > - Apa perbedaan antara kontrol akses vertikal dan horizontal?
> > - Bagaimana input pengguna dapat memengaruhi interpreter back‑end?
> > - Apa mekanisme pertahanan utama terhadap serangan XSS dan CSRF?
> >
> > ## Reference Points
> >
> > - Lecture_Slides.pptx (Slides 20‑32)
> > - OWASP_Guide.pdf (Pages 45‑78)
> > - Secure_Coding_Handbook.pdf (Pages 112‑138)
>
> > ### Authentication
> >
> > Autentikasi merupakan garis pertahanan pertama pada sebuah aplikasi web. Pada dasarnya, proses ini memastikan bahwa entitas yang mengklaim identitas tertentu memang memiliki hak untuk melakukannya. Jika mekanisme autentikasi lemah, penyerang dapat memperoleh akses tidak sah ke sistem, yang selanjutnya membuka peluang untuk eksploitasi lebih lanjut. Contoh umum kelemahan autentikasi meliputi penggunaan kata sandi default, kata sandi yang terlalu sederhana, atau penyimpanan kata sandi dalam bentuk teks biasa. Praktik yang baik meliputi penerapan kebijakan kata sandi kuat (minimal 12 karakter, kombinasi huruf besar, huruf kecil, angka, dan simbol), serta penggunaan algoritma hash yang tahan terhadap serangan brute‑force, seperti Argon2 atau bcrypt, dengan penambahan *salt* unik per pengguna.
> >
> > Untuk meningkatkan keamanan, banyak organisasi mengadopsi autentikasi multi‑faktor (MFA). MFA menambahkan lapisan verifikasi tambahan, misalnya kode satu kali yang dikirim melalui SMS, aplikasi autentikator, atau token hardware. Dengan demikian, meskipun kata sandi berhasil dicuri, penyerang tetap memerlukan faktor kedua untuk berhasil masuk. Implementasi MFA harus memperhatikan kegunaan; misalnya, menyediakan opsi backup seperti kode pemulihan yang disimpan secara aman.
> >
> > Selain itu, penting untuk melindungi proses autentikasi dari serangan *credential stuffing* dan *password spraying*. Kedua teknik ini memanfaatkan kredensial yang bocor dari layanan lain. Mekanisme mitigasi meliputi pembatasan percobaan login (rate limiting), deteksi pola login anomali, serta penggunaan CAPTCHA pada percobaan yang mencurigakan.
> >
> > Secara keseluruhan, autentikasi yang kuat tidak hanya melindungi akses awal, tetapi juga mempengaruhi seluruh rantai keamanan aplikasi karena banyak kontrol lain (seperti otorisasi) bergantung pada identitas yang terverifikasi.
> >
> > ### Session Management
> >
> > Manajemen sesi bertanggung jawab untuk menjaga kontinuitas interaksi pengguna setelah proses autentikasi berhasil. Setiap sesi biasanya diidentifikasi oleh token unik yang disimpan dalam cookie atau header. Jika token sesi dapat diprediksi atau dicuri, penyerang dapat melakukan *session hijacking* dan beroperasi seolah‑olah mereka adalah pengguna sah.
> >
> > Salah satu praktik dasar adalah menghasilkan token sesi dengan entropi tinggi, menggunakan generator kriptografis yang kuat. Token harus bersifat *stateless* (misalnya JWT) atau *stateful* (disimpan di server) tergantung pada arsitektur, namun keduanya memerlukan perlindungan terhadap manipulasi. Penggunaan flag `Secure` pada cookie memastikan bahwa cookie hanya dikirim melalui koneksi HTTPS, sementara flag `HttpOnly` mencegah akses JavaScript ke cookie, mengurangi risiko serangan *cross‑site scripting* (XSS) yang mencuri token.
> >
> > Pengaturan masa berlaku (expiration) juga krusial. Sesi yang tidak memiliki batas waktu dapat dimanfaatkan oleh penyerang untuk akses jangka panjang. Implementasi *idle timeout* (misalnya 15 menit tanpa aktivitas) dan *absolute timeout* (misalnya 8 jam sejak login) membantu membatasi jendela serangan. Selain itu, mekanisme *session regeneration* setelah perubahan hak istimewa (seperti setelah login atau elevasi peran) mencegah serangan *session fixation*.
> >
> > Untuk meningkatkan deteksi anomali, server dapat mencatat metadata sesi seperti alamat IP, agen pengguna, dan lokasi geografis. Jika terjadi perubahan mendadak, sistem dapat memaksa logout atau meminta verifikasi tambahan.
> >
> > ### Access Controls
> >
> > Kontrol akses menentukan apa yang dapat dilakukan oleh pengguna atau entitas setelah identitasnya terverifikasi. Pada aplikasi web, kontrol ini biasanya diimplementasikan melalui model *role‑based access control* (RBAC) atau *attribute‑based access control* (ABAC). Kesalahan dalam desain atau implementasi kontrol akses dapat mengakibatkan pengguna memperoleh hak yang tidak semestinya, yang dikenal sebagai eskalasi hak.
> >
> > Pada RBAC, setiap peran (misalnya *admin*, *editor*, *viewer*) memiliki kumpulan izin yang terdefinisi secara eksplisit. Penting untuk memastikan prinsip *least privilege*—memberikan hanya izin yang diperlukan untuk tugas tertentu. Selain itu, kontrol harus dilakukan pada sisi server; memeriksa izin hanya di sisi klien dapat dengan mudah diabaikan oleh penyerang.
> >
> > ABAC memperluas konsep dengan mempertimbangkan atribut dinamis seperti waktu, lokasi, atau status perangkat. Misalnya, sebuah aplikasi dapat mengizinkan akses ke data sensitif hanya jika permintaan berasal dari jaringan internal pada jam kerja. Implementasi ABAC memerlukan kebijakan yang terpusat dan mesin evaluasi kebijakan yang konsisten.
> >
> > Pengujian kontrol akses melibatkan teknik *forced browsing* (mencoba mengakses URL yang tidak terdaftar) dan *parameter tampering* (mengubah nilai parameter untuk mengakses sumber daya yang tidak diizinkan). Penanganan yang tepat meliputi validasi server‑side terhadap setiap permintaan dan penolakan default (deny‑by‑default) bila tidak ada kebijakan yang secara eksplisit mengizinkannya.
> >
> > ### Client Controls
> >
> > Kontrol yang berada di sisi klien (browser) sering kali dianggap lemah karena data dapat dimodifikasi oleh pengguna. Namun, kontrol klien tetap penting untuk meningkatkan pengalaman pengguna dan mengurangi beban pada server. Contoh kontrol klien meliputi validasi input menggunakan JavaScript, penyembunyian elemen UI, atau penggunaan *hidden fields* untuk menyimpan nilai sementara.
> >
> > Karena semua data yang dikirim dari klien dapat diubah, server harus selalu memvalidasi kembali data tersebut. Misalnya, manipulasi *User‑Agent* dapat digunakan untuk mengelabui mekanisme deteksi perangkat, sementara perubahan nilai pada *hidden fields* dapat mengubah parameter penting seperti harga produk. Oleh karena itu, kontrol klien sebaiknya dianggap sebagai lapisan tambahan, bukan pengganti validasi server‑side.
> >
> > Praktik terbaik meliputi: (1) menghindari kepercayaan pada nilai yang dikirimkan oleh klien; (2) menggunakan token anti‑CSRF yang dihasilkan server untuk melindungi formulir; (3) menerapkan kebijakan *Content Security Policy* (CSP) untuk membatasi sumber daya yang dapat dijalankan di halaman; serta (4) menandai semua data sensitif dengan atribut `HttpOnly` dan `Secure` pada cookie.
> >
> > ### Back‑end Interpreters
> >
> > Aplikasi web sering berinteraksi dengan interpreter back‑end seperti mesin basis data (SQL), parser XML, atau mesin template. Input pengguna yang tidak dibersihkan dapat menyebabkan interpreter mengeksekusi perintah yang tidak diinginkan, yang dikenal sebagai *injection attacks*. Contoh paling terkenal adalah *SQL injection*, di mana penyerang menyisipkan sintaks SQL ke dalam parameter yang kemudian dijalankan oleh basis data.
> >
> > Untuk mencegah serangan ini, pendekatan utama adalah penggunaan *prepared statements* atau *parameterized queries*. Dengan cara ini, nilai input dipisahkan dari kode perintah, sehingga interpreter tidak dapat menginterpretasikan nilai sebagai bagian dari sintaks. Selain itu, teknik *input sanitization* (menghapus atau mengekode karakter khusus) dapat melengkapi, tetapi tidak boleh menjadi satu‑satunya pertahanan.
> >
> > Pada konteks XML, serangan *XML External Entity* (XXE) dapat terjadi bila parser memperbolehkan entitas eksternal. Mengkonfigurasi parser untuk menonaktifkan resolusi entitas eksternal dan membatasi ukuran dokumen dapat mengurangi risiko. Untuk mesin template, penting untuk menonaktifkan fitur eksekusi kode dinamis jika tidak diperlukan.
> >
> > Secara umum, prinsip *defense in depth* pada interpreter back‑end meliputi: (a) pembatasan hak akses basis data (contoh: akun dengan hak *read‑only* untuk operasi SELECT); (b) audit log semua query yang dijalankan; serta (c) penggunaan *web application firewall* (WAF) yang dapat mendeteksi pola injection umum.
> >
> > ### Attacking the Client
> >
> > Fokus serangan pada sisi klien telah meningkat seiring dengan kematangan mekanisme pertahanan server. Serangan *cross‑site scripting* (XSS) dan *cross‑site request forgery* (CSRF) adalah dua contoh utama yang memanfaatkan kepercayaan browser terhadap konten yang dimuat dari domain yang sama.
> >
> > **XSS** terbagi menjadi tiga tipe: *reflected* (payload dikirim melalui URL dan langsung dipantulkan), *stored* (payload disimpan di server, misalnya dalam komentar), dan *DOM‑based* (payload dimanipulasi oleh skrip di sisi klien). Pencegahan meliputi *output encoding* (mengubah karakter khusus menjadi entitas HTML), penggunaan CSP yang membatasi sumber skrip, serta menghindari penggunaan fungsi `innerHTML` yang tidak aman.
> >
> > **CSRF** memanfaatkan fakta bahwa browser secara otomatis mengirimkan cookie autentikasi bersama setiap permintaan ke domain asal. Penyerang dapat memaksa pengguna yang sudah masuk untuk mengirimkan permintaan berbahaya ke aplikasi target. Mekanisme pertahanan utama adalah penggunaan token anti‑CSRF yang unik per sesi dan diverifikasi pada setiap permintaan yang mengubah state. Selain itu, mengatur header `SameSite` pada cookie dapat membatasi pengiriman cookie pada permintaan lintas situs.
> >
> > Serangan lain yang menargetkan klien meliputi *clickjacking* (menyembunyikan elemen interaktif di dalam iframe) dan *malicious extensions* yang dapat mengakses data halaman. Implementasi header `X‑Frame‑Options` atau CSP `frame‑ancestors` dapat mencegah clickjacking, sementara kebijakan keamanan ekstensi harus dipantau secara ketat.
> >
> > Dengan memahami vektor serangan pada klien, pengembang dapat merancang pertahanan berlapis yang mengurangi kemungkinan eksploitasi melalui browser pengguna.

> [!cornell] #### Summary
>
> **Web application security** berpusat pada identifikasi vektor serangan utama—autentikasi, manajemen sesi, kontrol akses, kontrol klien, interpreter back‑end, dan serangan sisi klien—serta penerapan kontrol defensif yang tepat untuk masing‑masing. Autentikasi kuat dan MFA melindungi pintu masuk, sementara manajemen sesi yang aman mencegah pencurian token. Kontrol akses harus mengikuti prinsip *least privilege* dan divalidasi di server. Input pengguna harus selalu diproses dengan prepared statements untuk menghindari injection, dan CSP serta token anti‑CSRF menjadi pertahanan utama terhadap XSS dan CSRF. Pendekatan *defense in depth* serta pemantauan berkelanjutan memastikan bahwa setiap lapisan aplikasi tetap tahan terhadap ancaman yang terus berkembang.

> [!ad-libitum]- Additional Information
>
> #### OWASP Top 10 Overview
>
> OWASP (Open Web Application Security Project) secara periodik merilis daftar *Top 10* yang mencerminkan risiko keamanan aplikasi web paling kritis. Daftar ini mencakup: (1) *Injection*, (2) *Broken Authentication*, (3) *Sensitive Data Exposure*, (4) *XML External Entities (XXE)*, (5) *Broken Access Control*, (6) *Security Misconfiguration*, (7) *Cross‑Site Scripting (XSS)*, (8) *Insecure Deserialization*, (9) *Using Components with Known Vulnerabilities*, dan (10) *Insufficient Logging & Monitoring*. Memahami masing‑masing kategori membantu tim keamanan memprioritaskan upaya mitigasi, serta menyediakan kerangka kerja standar untuk audit keamanan.
>
> Setiap kategori memiliki kontrol teknis yang direkomendasikan. Misalnya, untuk *Injection* disarankan penggunaan ORM atau query builder yang otomatis memparametrisasi pernyataan, sedangkan untuk *Broken Authentication* diwajibkan MFA, penyimpanan kata sandi dengan hash adaptif, dan deteksi anomali login. Mengintegrasikan OWASP Top 10 ke dalam proses *Secure Development Lifecycle* (SDL) memastikan bahwa pertimbangan keamanan dimasukkan sejak fase perancangan.
>
> #### Secure Development Lifecycle (SDL)
>
> SDL adalah metodologi yang menggabungkan praktik keamanan ke dalam setiap tahapan pengembangan perangkat lunak: (a) *Training*—tim pengembang dilatih tentang prinsip keamanan dasar; (b) *Requirements*—spesifikasi keamanan ditetapkan bersama kebutuhan fungsional; (c) *Design*—model threat modeling dilakukan untuk mengidentifikasi potensi vektor serangan; (d) *Implementation*—kode ditulis mengikuti pedoman secure coding, termasuk penggunaan linting keamanan; (e) *Verification*—melakukan pengujian statis (SAST), dinamis (DAST), dan penetrasi; (f) *Release*—menyertakan proses review konfigurasi dan hardening; (g) *Response*—menyiapkan prosedur penanganan insiden. Dengan mengikuti SDL, organisasi dapat mengurangi biaya perbaikan bug keamanan yang ditemukan pada tahap produksi.
>
> #### Advanced Defensive Mechanisms
>
> 1. **Content Security Policy (CSP) dengan nonce** – CSP dapat dikonfigurasi untuk mengizinkan skrip hanya bila memiliki nilai