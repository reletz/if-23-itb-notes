---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Lanskap Ancaman Mobile dan OWASP Mobile Top 10
>
> > ## Questions/Cues
> >
> > - Mengapa perangkat mobile menjadi target serangan yang semakin dominan?
> > - Apa perbedaan kelima tipe aplikasi mobile dan implikasi keamanannya?
> > - Mengapa OWASP Web Top Ten tidak sepenuhnya relevan untuk mobile?
> > - Apa saja kategori risiko pada OWASP Mobile Top 10 2024 dan 2016?
> > - Tantangan khas apa yang membedakan keamanan mobile dari keamanan web tradisional?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W10 Mobile Security — bagian "Mobile Insecurity & OWASP Mobile Top 10")
>
> > ### Statistik Mobile Insecurity dan Tren Enterprise
> >
> > Lanskap ancaman mobile berkembang dengan kecepatan yang mengkhawatirkan. Antara 2021 dan 2022, sampel **malware mobile meningkat 51%**, dengan lebih dari 920.000 sampel unik terdeteksi. Yang lebih meresahkan, **43% perangkat mobile yang dikompromikan** ternyata di-exploit sepenuhnya tanpa perlu di-jailbreak atau di-root—sebuah lonjakan **187% year-over-year**. Hal ini menandakan bahwa penyerang kini mampu mengeksploitasi celah pada perangkat dalam kondisi standar pabrik, tanpa mengandalkan modifikasi sistem yang biasanya menjadi prasyarat serangan.
> >
> > Vektor serangan favorit pun bergeser ke arah mobile. Sebanyak **80% situs phishing** secara khusus menargetkan perangkat mobile atau dirancang agar berfungsi baik di desktop maupun mobile. Pengguna **6-10 kali lebih mungkin** terjebak serangan **SMS phishing (smishing)** dibanding phishing berbasis email, karena antarmuka mobile yang ringkas menyembunyikan indikator kecurigaan seperti URL lengkap. Pada 2022, malware terdeteksi pada **1 dari 20 perangkat Android**, naik dari 1 dari 50 pada 2021. Puncaknya, **89% organisasi** mengalami setidaknya satu *breach* terkait mobile yang berhasil.
> >
> > Konsep **"Mobile is Anyware"** merangkum lima tren dengan implikasi signifikan bagi enterprise: (1) **mobile is primary**—perangkat mobile menjadi titik akses utama pengguna; (2) **insights from mobile data** membuka peluang bisnis baru lewat data perilaku; (3) **mobile is about transacting**—mobile menjadi kanal transaksi finansial utama; (4) **mobile must create a continuous brand experience**—pengalaman merek harus mulus lintas perangkat; dan (5) **mobile enables the Internet of Things**—mobile menjadi *hub* yang menghubungkan ekosistem IoT. Setiap tren ini memperluas permukaan serangan organisasi secara substansial.
> >
> > ### Tipe-Tipe Aplikasi Mobile
> >
> > Memahami tipe aplikasi penting karena masing-masing memiliki profil risiko berbeda. **Native App** dibangun khusus untuk satu platform (misalnya Kotlin/Java untuk Android, Swift untuk iOS), memberikan performa optimal dan akses penuh ke API perangkat, namun memerlukan basis kode terpisah per platform. **Cross-Platform Native App** menggunakan satu basis kode yang dikompilasi menjadi komponen native pada tiap platform (misalnya React Native, Flutter), menyeimbangkan efisiensi pengembangan dengan akses native.
> >
> > **Web App** pada dasarnya adalah situs web responsif yang berjalan di browser mobile—tidak diinstal dan tidak memiliki akses langsung ke fitur perangkat. **Hybrid App** membungkus konten web di dalam *container* native (misalnya melalui WebView/Cordova), sehingga bisa didistribusikan lewat app store sekaligus memanfaatkan sebagian API perangkat, tetapi mewarisi kerentanan web seperti XSS. **Progressive Web App (PWA)** adalah web app yang memanfaatkan *service worker* untuk kemampuan offline, *push notification*, dan instalasi ke layar utama, mengaburkan batas antara web dan native. Tipe yang berbeda menentukan permukaan serangan: aplikasi berbasis web rentan terhadap kerentanan web, sedangkan native lebih rentan terhadap masalah penyimpanan lokal dan IPC.
> >
> > ### Relevansi OWASP Web Top Ten terhadap Mobile
> >
> > **OWASP Top Ten** untuk aplikasi web (versi 2010, 2013, 2017) mencakup kategori seperti **A1-Injection**, **A2-Broken Authentication and Session Management**, **A3-Cross-Site Scripting (XSS)**, **A6-Sensitive Data Exposure**, hingga **XML External Entities (XXE)** dan **Insecure Deserialization** pada 2017. Pertanyaan kuncinya: mana yang relevan untuk mobile? Sebagian besar kategori web tetap berlaku pada bagian *server-side* aplikasi mobile dan pada aplikasi hybrid/web yang merender konten HTML. Namun, model ancaman mobile berbeda secara fundamental—penyerang sering memiliki **akses fisik** ke perangkat, sehingga risiko seperti penyimpanan data tidak aman dan *reverse engineering* menjadi jauh lebih dominan dibanding pada aplikasi web murni.
> >
> > Karena perbedaan inilah OWASP menerbitkan daftar terpisah, yaitu **OWASP Mobile Top 10**, yang menyoroti risiko khas perangkat mobile. Kategori web seperti injection tetap relevan bagi *backend*, tetapi tidak menangkap nuansa seperti kebocoran kredensial pada keystore lokal atau lemahnya proteksi biner aplikasi yang telah diinstal di perangkat pengguna.
> >
> > ### OWASP Mobile Top 10: Edisi 2024 vs 2016
> >
> > **OWASP Mobile Top 10 (2024)** memperbarui kategori risiko: **M1: Improper Credential Usage** (penanganan/penyimpanan kredensial yang buruk hingga akses tak sah), **M2: Inadequate Supply Chain Security** (kelemahan pada komponen/pustaka pihak ketiga), **M3: Insecure Authentication/Authorization**, **M4: Insufficient Input/Output Validation** (memicu serangan injeksi), **M5: Insecure Communication** (kanal tanpa enkripsi), **M6: Inadequate Privacy Controls** (perlindungan data pribadi tidak memadai), **M7: Insufficient Binary Protections** (minim obfuscation sehingga mudah di-*reverse engineer*), **M8: Security Misconfiguration**, **M9: Insecure Data Storage**, dan **M10: Insufficient Cryptography** (algoritma enkripsi lemah).
> >
> > Sebagai pembanding, **OWASP Mobile Top 10 (2016)** menampilkan: **M1: Improper Platform Usage**, **M2: Insecure Data Storage**, **M3: Insecure Communication**, **M4: Insecure Authentication**, **M5: Insufficient Cryptography**, **M6: Insecure Authorization**, **M7: Client Code Quality**, **M8: Code Tampering**, **M9: Reverse Engineering**, dan **M10: Extraneous Functionality**. Pergeseran dari 2016 ke 2024 mencerminkan evolusi ancaman: munculnya **supply chain security** dan **privacy controls** sebagai kategori tersendiri menunjukkan meningkatnya perhatian terhadap dependensi pihak ketiga dan regulasi privasi data.
> >
> > ### Tantangan Spesifik Mobile
> >
> > Beberapa karakteristik membuat keamanan mobile menantang secara unik. Pertama, **akses fisik dan risiko pencurian**—perangkat dapat hilang atau dicuri, memberi penyerang waktu tak terbatas untuk membongkar penyimpanan lokal. Kedua, **distribusi melalui app store (gatekeeping)**—meski toko aplikasi menyaring malware, proses ini tidak sempurna dan menambah ketergantungan pada pihak ketiga.
> >
> > Ketiga, **sumber daya terbatas** (baterai, daya komputasi) membatasi seberapa berat mekanisme kriptografi yang dapat diterapkan. Keempat, **banyak kanal komunikasi** (seluler, WiFi, Bluetooth, NFC) memperluas permukaan serangan. Kelima, **penggunaan pustaka dan SDK pihak ketiga secara ekstensif** memperkenalkan risiko rantai pasok. Keenam, **fragmentasi platform**, khususnya pada Android, menyebabkan banyak perangkat menjalankan versi OS usang yang tidak lagi menerima patch keamanan—menciptakan populasi besar perangkat rentan.

> [!cornell] #### Summary
>
> Lanskap ancaman mobile tumbuh pesat: malware naik 51%, smishing jauh lebih efektif dari phishing email, dan 89% organisasi mengalami breach mobile. Konsep **"Mobile is Anyware"** menegaskan sentralitas mobile bagi enterprise sekaligus memperluas permukaan serangan. Kelima tipe aplikasi (**Native, Cross-Platform Native, Web, Hybrid, PWA**) memiliki profil risiko berbeda. Karena model ancaman mobile berbeda dari web—terutama adanya akses fisik—OWASP menerbitkan **Mobile Top 10** tersendiri; edisi **2024** menonjolkan *supply chain* dan *privacy controls* dibanding edisi **2016**. Tantangan khas seperti akses fisik, gatekeeping app store, sumber daya terbatas, banyak kanal komunikasi, SDK pihak ketiga, dan fragmentasi platform menjadikan keamanan mobile sebagai disiplin tersendiri.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — DI LUAR sumber
>
> Selain SMS phishing, vektor **QRLjacking** dan **quishing** (phishing via QR code) memanfaatkan kebiasaan pengguna mobile memindai kode tanpa verifikasi tujuan. Pada level platform, **Android StrandHogg** (task hijacking) dan **tapjacking** mengeksploitasi cara Android mengelola *activity* dan *overlay*, memungkinkan aplikasi jahat menumpangi UI aplikasi sah. Untuk *supply chain* (M2 2024), insiden seperti penyisipan kode jahat ke SDK iklan populer menunjukkan bagaimana satu pustaka terkompromi dapat menjangkau ribuan aplikasi sekaligus—relevan dengan tren SBOM (Software Bill of Materials) yang kini didorong regulasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil satu aplikasi APK open-source, lalu petakan kerentanannya ke kategori OWASP Mobile Top 10 2024 menggunakan **MobSF (Mobile Security Framework)**. Bandingkan temuan dengan hasil pemetaan ke edisi 2016.
> 2. Bangun tabel perbandingan kelima tipe aplikasi (Native/Cross-Platform/Web/Hybrid/PWA) untuk satu fitur sederhana (misalnya catatan), dokumentasikan perbedaan akses API dan permukaan serangan tiap tipe.
> 3. Lakukan studi kasus smishing: kumpulkan contoh pesan phishing SMS publik dan analisis teknik *social engineering* serta indikator yang tersembunyi di antarmuka mobile.
>
> #### Bacaan Lanjutan
> - OWASP Mobile Application Security Verification Standard (MASVS) dan Mobile Application Security Testing Guide (MASTG).
> - OWASP Mobile Top 10 (2024) — https://owasp.org/www-project-mobile-top-10/
> - Zimperium / Verizon Mobile Security Index — laporan tahunan statistik ancaman mobile.
