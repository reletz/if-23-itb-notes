---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Security Testing per Layer - Unit, Integration, Acceptance
>
> > ## Questions/Cues
> >
> > - Aspek keamanan apa saja yang dapat diuji pada unit test (JUnit)?
> > - Apa beda in-container testing dan mock objects pada integration test?
> > - Bagaimana lifecycle sebuah Apache Cactus test berjalan?
> > - Mengapa acceptance test cocok untuk XSS/SQLi tetapi punya coverage rendah?
> > - Apa empat kelas serangan keamanan yang harus diantisipasi?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W09 Security Testing — bagian "Testing Security in Unit / Integration / Acceptance Tests")
>
> > ### Unit Testing — JUnit dan Input Validation
> >
> > Pada lapisan **Unit**, pengujian keamanan dilakukan pada level metode/kelas individual, umumnya memakai **JUnit**. Struktur JUnit klasik memakai `setUp()` (dijalankan sebelum tiap metode `testXXX`), `tearDown()` (sesudahnya), dan serangkaian metode uji seperti `testAddTwoItems()` atau `testAddNullItem()`. Contoh dalam materi menguji kelas shopping cart: memastikan cart baru berisi 0 item, penambahan item tercermin benar, dan **penambahan item null memicu exception** tanpa mengubah isi cart (`assertEquals("Null not in cart", instance.getNumberOfItems(), 0)`).
> >
> > Fokus keamanan yang paling alami di lapisan ini adalah **input validation**. Materi menampilkan contoh validasi nomor telepon: `testValidPhoneNumbers()` memastikan input sah seperti `"232321"`, `"+23 232321"`, atau `"(44) 32321"` **tidak** memicu validation error; sementara `testIllegalCharactersInPhoneNumber()` dengan input `"+(23)';[]232 - 321"` dan `testAlphabeticInPhoneNumber()` dengan `"12a12121"` **harus** memicu validation error. Pola ini menguji baik jalur positif maupun negatif validasi.
> >
> > Aspek keamanan lain yang dapat disentuh di unit test mencakup: **input validation & encoding**, **encryption**, **user and session management**, **error and exception handling**, serta **auditing & logging**.
> >
> > **Keunggulan** menguji di lapisan ini: tes dijalankan **sangat sering (frequently)** sehingga isu cepat teridentifikasi, dan merupakan **bentuk tes paling granular** dengan **test coverage tinggi**. **Kelemahannya**: **tidak banyak kerentanan keamanan yang bisa diuji** di lapisan ini, karena banyak kerentanan baru muncul saat komponen berinteraksi.
> >
> > ### Integration Testing — In-Container vs Mock Objects
> >
> > Pada lapisan **Integration**, pengujian menyasar interaksi antar komponen. Ada dua strategi. **In-container testing** menjalankan tes di dalam container/server sungguhan: **realistis dan lengkap**, tetapi **membutuhkan tools khusus** dan menanggung **overhead memulai container**. **Mock Objects** memalsukan (**fake**) API server: solusinya **generik** dan **tanpa overhead container**, tetapi kurang realistis.
> >
> > Materi memakai **Apache Cactus** sebagai contoh in-container testing untuk aplikasi **J2EE** — dapat menguji **EJB dan Web tiers**, dengan plugin untuk **Jetty, Eclipse, Ant, dan Maven**. **Lifecycle** sebuah Cactus test berjalan dalam lima tahap berurutan:
> >
> > 1. **beginXXX()** — setup sisi klien (client side).
> > 2. **setUp()** — kode umum sisi server.
> > 3. **testXXX()** — tes inti sisi server.
> > 4. **tearDown()** — kode umum sisi server (pembersihan).
> > 5. **endXXX()** — tes sisi klien (memeriksa respons).
> >
> > ```mermaid
> > flowchart TD
> >     B["beginXXX()<br/>client setup"] --> S["setUp()<br/>server common"] --> T["testXXX()<br/>server test"] --> D["tearDown()<br/>server common"] --> E["endXXX()<br/>client tests"]
> > ```
> >
> > Contoh dalam materi (`TestAccessControl`) menguji kontrol akses: `beginUnprivilegedUserAccessControl` menyetel autentikasi `BasicAuthentication("user","password")`, `testUnprivilegedUserAccessControl` memanggil `AdminServlet`, lalu `endUnprivilegedUserAccessControl` memverifikasi bahwa pengguna normal mendapat **status 401** saat mengakses `/admin`.
> >
> > **Keunggulan** lapisan ini: dapat menguji **di dalam application server**, dan **banyak kerentanan dapat diuji**, contohnya **Injection**, **Authentication flaws**, dan **Authorization flaws**. **Kelemahannya**: **tidak dieksekusi sesering unit test**, ada **overhead memulai application server**, dan beberapa kerentanan **sulit diuji** di sini, misalnya **XSS** atau **URL filtering** yang dilakukan oleh web server / application firewall. Aspek keamanan yang relevan: **dependency** dan **architecture flaws** (lack of randomness, no authentication, no compartments, race conditions).
> >
> > ### Acceptance Testing — External API
> >
> > Pada lapisan **Acceptance**, pengujian menyasar **external API** aplikasi dan bersifat **language agnostic** (tidak terikat bahasa implementasi). Ada **dua jenis tools**: yang **menyertakan HTTP client dan HTML parser sendiri** — **HTTPUnit, jWebUnit, HtmlUnit, Canoo Webtest**; dan yang **mengemudikan instance browser sungguhan** — **Selenium, WATIR, Watij**.
> >
> > Lapisan ini ideal untuk menguji kerentanan yang hanya tampak dari luar. Contoh **HTML/XSS injection dengan jWebUnit** (`XSSinSearchFieldTest`): mengisi field `query` dengan `<a id="injection" href=...>Injection</a>`, submit, lalu memastikan link injeksi **tidak muncul** (`assertLinkNotPresent("injection")`). Contoh **SQL injection dengan WATIR**: mengisi username dengan `corsaire1' OR 1=1--` lalu submit, dan memverifikasi muncul `'Signon failed'`. Contoh **XSS dengan WATIR**: menyisipkan `<script>window.open(...)</script>` ke field pencarian dan memastikan window berbahaya tidak terbuka.
> >
> > **Keunggulan**: **pengujian penuh atas external API**, konsultan keamanan dapat **men-script kerentanan**, hasilnya **mendokumentasikan kerentanan**, dan **retesting mudah**. **Kelemahannya**: **test coverage rendah** (hanya menjangkau yang terekspos via API), dan **developer tidak terlibat** dalam pengujian.
> >
> > ### Four Classes of Security Attacks
> >
> > Materi merangkum **empat kelas serangan keamanan** yang harus diantisipasi pengujian di seluruh lapisan:
> >
> > 1. **Dependencies** — aplikasi dapat **mewarisi kerentanan** dari komponen yang menjadi dependensinya; bahkan **library yang menyediakan layanan keamanan dapat gagal**, sehingga aplikasi harus tetap merespons secara aman (**defense in depth**).
> > 2. **Unanticipated user input** — input yang tak diantisipasi seperti **reserved words, escape characters, long strings, dan boundary values** yang dapat **mengekspos kerentanan desain**.
> > 3. **Design vulnerabilities** — terutama **port yang terbuka**, **insecure default values**, dan **test instrumentation yang terjalin dengan kode implementasi** (yang bisa secara eksplisit melewati keamanan demi kemudahan pengujian).
> > 4. **Implementation vulnerabilities** — developer hanya memahami bagiannya sendiri, sehingga tanpa sadar dapat **mengekspos data**.
> >
> > Keempat kelas ini mengingatkan bahwa serangan datang dari dependensi, input, desain, maupun implementasi — dan pengujian per lapisan harus dirancang agar saling melengkapi menutup keempatnya.

> [!cornell] #### Summary
>
> Pengujian keamanan dapat ditanam di tiga lapisan. **Unit testing** (JUnit) menguji metode individual — contohnya validasi nomor telepon dan aspek input validation, encryption, session, error handling, serta logging — dengan keunggulan frekuensi tinggi dan granularitas, tetapi sedikit kerentanan yang terjangkau. **Integration testing** memilih antara **in-container** (realistis, mis. Apache Cactus dengan lifecycle beginXXX→setUp→testXXX→tearDown→endXXX) dan **mock objects** (tanpa overhead); mampu menguji Injection, Authentication, dan Authorization flaws, namun berat dan tak menjangkau XSS. **Acceptance testing** menyasar external API secara language-agnostic memakai HTTPUnit/jWebUnit/HtmlUnit atau Selenium/WATIR untuk menguji XSS dan SQLi; menawarkan pengujian API penuh tetapi coverage rendah dan tanpa keterlibatan developer. Semua lapisan harus mengantisipasi **empat kelas serangan**: dependencies, unanticipated user input, design vulnerabilities, dan implementation vulnerabilities.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Test Pyramid dan Security (DI LUAR sumber)
> Pemetaan Unit→Integration→Acceptance mencerminkan **Test Pyramid** Mike Cohn: banyak unit test yang cepat di dasar, lebih sedikit integration test di tengah, dan paling sedikit end-to-end/acceptance test di puncak. Trade-off coverage vs realism dalam materi adalah konsekuensi langsung piramida ini — semakin tinggi lapisan, semakin realistis tetapi semakin lambat dan rapuh (flaky). Strategi keamanan modern (DevSecOps) menempatkan SAST di lapisan unit/build, DAST di lapisan acceptance, dan menjadwalkannya dalam pipeline CI/CD agar "test early and often" tercapai.
>
> #### Lebih dalam — Modern Equivalents
> Apache Cactus kini sebagian besar usang; padanan modern mencakup **Testcontainers** (menjalankan dependensi nyata seperti database dalam Docker untuk in-container testing) dan **WireMock/Mockito** untuk mock objects. Pada lapisan acceptance, HTTPUnit/jWebUnit digantikan **REST Assured** (API), **Playwright/Cypress** (browser-driven, pengganti Selenium/WATIR). Prinsipnya tetap sama, hanya toolingnya yang berevolusi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis suite JUnit untuk satu validator input (mis. validator email), lengkap dengan kasus positif dan negatif termasuk payload XSS/SQLi sebagai input ilegal.
> 2. Bangun integration test memakai Testcontainers + PostgreSQL untuk membuktikan bahwa query memakai parameterized statement tahan terhadap `' OR 1=1--`.
> 3. Skrip satu acceptance test dengan Playwright yang menyuntik payload `<script>` ke form pencarian dan menegaskan tidak ada eksekusi skrip (cek output encoding).
>
> #### Bacaan Lanjutan
> - Stephen de Vries, "Security Testing through Automated Software Tests" (Corsaire)
> - Dokumentasi JUnit 5, Testcontainers, dan Playwright
> - OWASP Web Security Testing Guide v4.2 (mapping kontrol ke lapisan)
> - Mike Cohn, "Succeeding with Agile" (konsep Test Pyramid)
