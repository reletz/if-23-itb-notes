---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Keamanan Aplikasi Web]]

> [!cornell] Cross‑Site Request Forgery (CSRF) Mechanics and Mitigations
>
> > ## Questions/Cues
> >
> > - Mengapa browser otomatis mengirim kredensial?
> > - Bagaimana serangan CSRF memanfaatkan tag <img>?
> > - Apa perbedaan token sinkronisasi dan double‑submit?
> > - Kapan pemeriksaan header Referer tidak cukup?
> > - Bagaimana atribut SameSite mencegah CSRF?
> >
> > ## Reference Points
> >
> > - Web Application Vulnerability IF4053 – Software Security (Pages 26‑29)
> > - OWASP Top 10 – 2010 (Page 3, mapping A5 – CSRF)
>
> > ### Definisi dan Prinsip Dasar CSRF
> >
> > Cross‑Site Request Forgery (CSRF) adalah jenis serangan di mana penyerang memaksa browser korban untuk mengirimkan permintaan HTTP yang sah ke aplikasi web target tanpa sepengetahuan pengguna. Kunci utama serangan ini terletak pada fakta bahwa browser secara otomatis melampirkan data otentikasi—seperti cookie sesi, token SSL‑client, atau kredensial HTTP Basic—pada setiap permintaan ke domain yang bersangkutan. Karena aplikasi web biasanya mengandalkan keberadaan kredensial ini untuk mengidentifikasi pengguna, permintaan yang dipicu oleh pihak ketiga dapat dianggap sah oleh server.
> >
> > Contoh sederhana: seorang pengguna sedang masuk ke layanan perbankan online. Jika pengguna mengunjungi situs berbahaya yang menyisipkan elemen HTML yang mengarah ke URL “/transfer?amount=1000&to=attacker”, browser akan mengirimkan cookie sesi perbankan bersama permintaan GET tersebut. Server perbankan, melihat cookie yang valid, akan mengeksekusi transfer dana tanpa ada interaksi eksplisit dari pengguna.
> >
> > CSRF berbeda dengan serangan yang menargetkan kerentanan kode (seperti injection). Di sini, tidak ada eksploitasi bug pada aplikasi; melainkan, penyerang memanfaatkan perilaku standar browser yang “percaya” pada kredensial yang sudah ada.
> >
> > ### Mekanisme Serangan CSRF
> >
> > Browser menyediakan beberapa cara untuk mengirimkan permintaan secara otomatis: tag `<img>`, `<script>`, `<link>`, atau formulir HTML yang disubmit secara otomatis dengan JavaScript. Karena semua elemen ini dapat memuat sumber daya dari domain lain, penyerang dapat menanamkan kode berikut pada halaman berbahaya:
> >
> > ```html
> >
> > <img src="https://bank.example.com/transfer?amount=5000&to=attacker"
> >
> > style="display:none" />
> >
> > ```
> >
> > Ketika halaman berbahaya dibuka, browser akan melakukan permintaan GET ke `bank.example.com` dengan menyertakan cookie sesi korban. Jika endpoint transfer menerima metode GET (atau bahkan POST yang dipicu oleh formulir tersembunyi), aksi tidak sah akan terjadi.
> >
> > Serangan dapat diperkaya dengan teknik “auto‑submit” menggunakan JavaScript:
> >
> > ```html
> >
> > <form id="csrfForm" action="https://bank.example.com/transfer" method="POST">
> >
> > <input type="hidden" name="amount" value="5000"/>
> >
> > <input type="hidden" name="to" value="attacker"/>
> >
> > </form>
> >
> > <script>document.getElementById('csrfForm').submit();</script>
> >
> > ```
> >
> > Karena formulir ini berada pada domain penyerang, namun aksi dikirim ke domain target, kredensial korban tetap terlampir, sehingga server mengeksekusi permintaan.
> >
> > ### Pola Kerentanan yang Membuka Pintu CSRF
> >
> > 1. **Penggunaan Kredensial Otomatis** – Semua aplikasi web yang mengandalkan cookie sesi atau header otentikasi tanpa memeriksa sumber permintaan rentan.
> > 2. **Tidak Ada Verifikasi Token pada Permintaan Sensitif** – Jika setiap aksi penting (misalnya transfer dana, perubahan kata sandi) tidak memerlukan nilai acak yang hanya diketahui oleh server dan klien, penyerang dapat menebak atau meniru permintaan.
> > 3. **Metode HTTP yang Tidak Aman** – Mengizinkan operasi penting melalui metode GET meningkatkan risiko, karena GET dapat dipicu oleh elemen gambar atau tag <link> tanpa interaksi pengguna.
> > 4. **Kurangnya Pembatasan Header Referer/Origin** – Server yang tidak memeriksa header `Referer` atau `Origin` tidak dapat membedakan apakah permintaan berasal dari halaman sah atau dari situs pihak ketiga.
> >
> > Pola‑polanya saling terkait; misalnya, jika aplikasi menggunakan GET untuk aksi sensitif, bahkan pemeriksaan Referer sekalipun dapat di‑bypass dengan manipulasi header pada permintaan yang dibuat oleh skrip penyerang.
> >
> > ### Contoh Ilustrasi CSRF dalam Praktik
> >
> > Pada slide “CSRF Illustrated” (hal 28), penyerang menempatkan tag `<img>` tersembunyi pada situsnya:
> >
> > ```html
> >
> > <img src="http://vulnerablebank.com/deleteblog.do?blogId=alice_blog"
> >
> > style="display:none">
> >
> > ```
> >
> > Saat korban yang sedang masuk ke `vulnerablebank.com` mengunjungi situs penyerang, browser otomatis mengirimkan permintaan GET ke endpoint `deleteblog.do`. Karena cookie sesi korban disertakan, server menganggap permintaan sah dan menghapus blog milik Alice.
> >
> > Contoh ini menegaskan tiga poin penting: (a) kredensial otomatis, (b) aksi sensitif melalui GET, dan (c) tidak ada token anti‑CSRF.
> >
> > ### Mitigasi Utama terhadap CSRF
> >
> > **1. Token Anti‑CSRF (Synchronizer Token Pattern)** – Server menghasilkan nilai acak (biasanya 128‑bit) yang disimpan dalam sesi pengguna dan menyisipkannya ke setiap formulir atau URL sensitif sebagai field tersembunyi atau parameter query. Pada saat permintaan diterima, server memverifikasi bahwa token yang dikirim cocok dengan yang ada di sesi. Karena penyerang tidak dapat membaca token (same‑origin policy), ia tidak dapat menyisipkan nilai yang valid.
> >
> > **2. Double‑Submit Cookie** – Server mengirimkan cookie bernama `XSRF‑TOKEN` berisi nilai acak, dan klien harus mengirimkan nilai yang sama baik melalui header custom (misalnya `X‑XSRF‑TOKEN`) atau field formulir. Server membandingkan nilai cookie dengan nilai yang dikirimkan dalam body permintaan. Pendekatan ini tidak memerlukan penyimpanan token di sisi server, tetapi tetap mengandalkan kerahasiaan cookie.
> >
> > **3. Atribut SameSite pada Cookie** – Browser modern mendukung atribut `SameSite=Strict` atau `SameSite=Lax`. Dengan `Strict`, cookie tidak akan dikirim pada permintaan lintas situs sama sekali; dengan `Lax`, cookie dikirim hanya pada navigasi top‑level GET (misalnya klik link). Ini secara otomatis memblokir banyak vektor CSRF tanpa perubahan kode aplikasi.
> >
> > **4. Pemeriksaan Header Referer atau Origin** – Server dapat menolak permintaan yang tidak memiliki header `Referer` yang mengarah ke domain yang sama, atau yang memiliki header `Origin` berbeda. Namun, header ini dapat di‑spoof pada permintaan yang dibuat oleh skrip non‑browser, sehingga tidak boleh menjadi satu‑satunya mekanisme.
> >
> > **5. Menggunakan Metode HTTP yang Aman** – Operasi yang mengubah state (POST, PUT, DELETE) harus dipaksa menggunakan metode selain GET, dan server harus menolak GET untuk aksi sensitif. Kombinasi ini mengurangi vektor serangan berbasis tag <img>.
> >
> > **6. Validasi Tambahan** – Untuk aksi yang sangat kritis (misalnya transfer uang), dapat ditambahkan otentikasi dua faktor atau konfirmasi melalui kanal terpisah (SMS, email).
> >
> > Implementasi yang tepat biasanya menggabungkan beberapa teknik di atas untuk menambah lapisan pertahanan berlapis (defense‑in‑depth).

> [!cornell] #### Summary
>
> **Cross‑Site Request Forgery (CSRF)** memanfaatkan fakta bahwa browser secara otomatis melampirkan kredensial pada setiap permintaan lintas situs, memungkinkan penyerang memaksa aksi tidak sah melalui elemen HTML seperti `<img>` atau formulir tersembunyi. Kerentanan muncul ketika aplikasi tidak menuntut token acak pada permintaan sensitif, menggunakan metode GET untuk aksi penting, atau tidak memeriksa header `Referer/Origin`. Mitigasi yang paling efektif meliputi penggunaan token anti‑CSRF (synchronizer atau double‑submit), atribut cookie `SameSite`, serta pembatasan metode HTTP dan pemeriksaan header. Kombinasi teknik‑teknik ini memberikan pertahanan berlapis yang kuat terhadap serangan CSRF.

> [!ad-libitum]- Additional Information
>
> #### Formal Threat Model and Security Properties
>
> Dalam model keamanan formal, CSRF dapat dipandang sebagai pelanggaran **integritas permintaan**. Model Dolev‑Yao mengasumsikan bahwa penyerang dapat mengendalikan jaringan dan mengirimkan pesan apa pun, tetapi tidak dapat memecahkan kriptografi yang kuat. Untuk mencegah CSRF, sistem harus menjamin **unforgeability** token: hanya pihak yang memegang sesi sah yang dapat menghasilkan nilai token yang valid. Formalisasi ini biasanya dinyatakan dengan permainan keamanan di mana penyerang mencoba menghasilkan pasangan `(request, token)` yang diterima oleh server tanpa mengetahui token yang disimpan di sesi. Bukti keamanan dapat dibangun dengan mengasumsikan token dihasilkan oleh fungsi PRF (Pseudo‑Random Function) dengan entropi yang cukup (≥ 128 bit). Referensi: Bellare & Rogaway, “Random Oracles are Practical” (1993); OWASP CSRF Prevention Cheat Sheet (2023).
>
> #### Token Generation and Cryptographic Considerations
>
> Token anti‑CSRF harus bersifat **unik per sesi** dan **tidak dapat diprediksi**. Praktik terbaik meliputi:
>
> 1. Menggunakan generator kriptografis yang disediakan oleh bahasa (mis. `java.security.SecureRandom`, `openssl rand`, atau `crypto.randomBytes` di Node.js).
> 2. Menggabungkan nilai‑nilai yang bersifat unik seperti `session_id`, `timestamp`, dan `secret_key` server, kemudian menghitung HMAC‑SHA256 untuk menghasilkan token.
> 3. Menetapkan masa berlaku (mis. 30 menit) untuk mengurangi risiko pencurian token melalui serangan side‑channel.
>
> Implementasi yang buruk—misalnya token berbasis timestamp yang dapat diprediksi atau token yang sama untuk semua sesi—akan mengurangi keamanan secara signifikan. Beberapa framework (Spring Security, Django, Laravel) sudah menyediakan mekanisme token yang memenuhi kriteria di atas.
>
> #### SameSite Cookie Attribute and Browser Compatibility
>
> Atribut `SameSite` pertama kali diusulkan oleh Google pada tahun 2016 dan kini menjadi standar RFC 6265bis. Nilai yang dapat dipilih:
>
> - `Strict`: cookie **tidak** dikirim pada permintaan lintas situs, termasuk navigasi melalui link. Ini memberikan perlindungan maksimal tetapi dapat memengaruhi alur login sosial (OAuth).
> - `Lax`: cookie dikirim pada navigasi top‑level GET (mis. klik link) tetapi **tidak** pada permintaan sub‑resource (gambar, iframe). Ini merupakan kompromi yang umum dipakai.
> - `None`: cookie dikirim pada semua permintaan, tetapi harus disertai flag `Secure` (hanya melalui HTTPS).
>
> Dukungan browser: Chrome 80+, Firefox 69+, Edge 79+, Safari 12.1+. Pada browser lama yang tidak mengenal `SameSite`, nilai default adalah `None`, sehingga pengembang harus tetap menyediakan mekanisme token tradisional untuk kompatibilitas.
>
> #### CSRF dalam API RESTful dan CORS
>
> API modern yang menggunakan JSON dan CORS (Cross‑Origin Resource Sharing) sering mengandalkan header `Authorization: Bearer <token>` alih‑alih cookie. Karena header ini **tidak** dikirim secara otomatis oleh browser pada permintaan lintas situs, serangan CSRF menjadi tidak relevan bila semua endpoint sensitif mengharuskan token Bearer. Namun, banyak aplikasi masih mendukung sesi berbasis cookie untuk kemudahan UI, sehingga kombinasi keduanya memerlukan perlindungan ganda.
>
> Jika API menerima permintaan `POST` dengan `Content-Type: application/json`, browser tidak dapat mengirimkan payload tersebut melalui tag `<img>`; namun penyerang dapat menggunakan `XMLHttpRequest` atau `fetch` dengan mode `cors` jika server mengizinkan origin yang tidak dipercaya. Oleh karena itu, server harus mengatur header `Access-Control-Allow-Origin` secara ketat dan tetap memverifikasi token anti‑CSRF pada setiap mutasi state.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi Token CSRF di Framework Pilihan** – Buat modul middleware untuk Express.js (Node.js) yang menghasilkan token synchronizer, menyimpannya di sesi, dan memvalidasinya pada setiap permintaan POST/PUT/DELETE. Uji dengan serangan otomatis menggunakan Selenium atau Puppeteer.
> 2. **Analisis Efektivitas SameSite** – Bangun aplikasi sederhana dengan login berbasis cookie, lalu uji perilaku serangan CSRF pada browser yang berbeda (Chrome, Firefox, Safari) dengan mengubah nilai `SameSite` menjadi `Strict`, `Lax`, dan `None`. Dokumentasikan perbedaan hasil dan catat fallback yang diperlukan untuk browser lama.
>
> #### Tools and Resources
>
> - **OWASP CSRF Prevention Cheat Sheet** (https://owasp.org/www-project-cheat-sheets/cheatsheets/Cross‑Site_Request_Forgery_Prevention_Cheat_Sheet.html) – Panduan resmi dengan contoh kode untuk berbagai bahasa.
> - **Burp Suite Intruder / CSRF PoC** – Modul “CSRF PoC” di Burp dapat secara otomatis menghasilkan permintaan CSRF untuk menguji aplikasi.
> - **OWASP ZAP** – Fitur “Active Scan” mencakup deteksi token anti‑CSRF yang lemah.
> - **Postman** – Untuk menguji API RESTful dengan header `Authorization` vs. cookie.
> - **Browser DevTools** – Memeriksa nilai `SameSite` pada cookie melalui tab “Application”.
>
> #### Further Reading
>
> - “Web Application Security, A Beginner’s Guide” – Bryan Sullivan & Vincent Liu, Chapter 7 (CSRF).
> - “The Tangled Web” – Michal Zalewski, bagian tentang SameSite dan kebijakan cookie.
> - RFC 6265bis – HTTP State Management Mechanism (SameSite).
> - “CSRF Attacks and Defenses” – Adam Barth, IEEE Security & Privacy, 2011.