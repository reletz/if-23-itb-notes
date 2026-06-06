---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Teknik dan Standar Security Testing
>
> > ## Questions/Cues
> >
> > - Apa saja teknik security testing utama dan apa sasaran masing-masing?
> > - Apa itu Web Application Security Standard menurut OWASP?
> > - Bagaimana kategori kontrol OWASP dipetakan ke lapisan Unit/Integration/Acceptance?
> > - Aktivitas keamanan apa yang sesuai pada fase development, deployment, dan maintenance?
> > - Mengapa NDA dan Rules of Engagement penting sebelum penetration testing?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W09 Security Testing — bagian "Security Testing Techniques & Web Application Security Standards by OWASP")
>
> > ### Daftar Teknik Security Testing
> >
> > Materi mendaftarkan beragam **teknik security testing** yang membentuk gudang senjata penguji. Pada level sistem dan jaringan: **OS Hardening** (konfigurasi dan patch, update OS, menonaktifkan service/port tak perlu, mengunci port, mengelola log, memasang root certificate, proteksi malware); **Vulnerability Scanning** (mengidentifikasi kerentanan yang dikenal dan memindai secara intrusif untuk yang tak dikenal); **Penetration Testing** (mensimulasikan serangan dari sumber jahat, mencakup network & vulnerability scanning, dengan atau tanpa akses source code/password); **Port Scanning and Service Mapping** (menemukan port terbuka dan service yang berjalan); serta **Firewall Rule Testing** (mengidentifikasi aturan yang tidak tepat/konflik, penempatan sistem rentan di belakang firewall, dan menemukan backdoor/tunnel administratif).
> >
> > Pada level aplikasi web: **SQL Injection** (mengeksploitasi kerentanan lapisan database lewat eksekusi input pengguna yang tak terduga); **Cross Site Scripting (XSS)** dengan tipe **Persistent, Non-Persistent, dan DOM-based**; serta beragam **manipulation**: **Parameter Manipulation**, **Cookie Manipulation**, **Form Field Manipulation**, **URL Manipulation**, dan **HTTP Header Manipulation**. Ditambah **Command Injection** (menyuntik dan mengeksekusi perintah level sistem lewat aplikasi rentan) dan **Denial of Service (DoS) Testing** (membanjiri target dengan trafik hingga lumpuh).
> >
> > Teknik lanjutan lainnya: **Network Scanning** (mengidentifikasi host aktif, IP, detail OS, user/group, routing table & SNMP); **Password Cracking** (brute force dan dictionary attack, mengidentifikasi password lemah); **Buffer Overflow Testing** (menimpa fragmen memori, buffer bertipe char); **Format String Testing** (menyuplai format specifier pada input); **Session Hijacking** (mengeksploitasi sesi valid untuk akses tidak sah); **Phishing** (menyamar sebagai entitas tepercaya untuk memanen kredensial); **IP Spoofing** (memalsukan source IP pada paket); **Packet Sniffing** (menangkap dan menganalisis trafik jaringan); dan **Social Engineering** (manipulasi psikologis manusia agar membocorkan informasi rahasia). Materi juga menyebut War Dialing, Wireless LAN Testing, File Integrity Testing, dan Random/Mutation Testing.
> >
> > ### Web Application Security Standard oleh OWASP
> >
> > Sebuah **Web Application Security Standard** adalah standar yang **diturunkan dari Security Policy** organisasi — analog dengan **Operating System Build Standard**. Standar ini **mendefinisikan bagaimana aplikasi harus berperilaku dari sudut pandang keamanan**, dan **harus mencakup aspek keamanan fungsional maupun non-fungsional**. Dengan adanya standar, kepatuhan keamanan dapat diukur dan dibuktikan secara objektif, bukan sekadar opini.
> >
> > Contoh konkret yang dirujuk materi adalah **OWASP Testing Checklist** (tersedia di repositori WSTG OWASP). Checklist ini menyusun pertanyaan kontrol per kategori, sehingga tim dapat menelusuri secara sistematis apakah setiap kontrol keamanan telah dipenuhi.
> >
> > ### Pemetaan Kategori Kontrol ke Lapisan Pengujian
> >
> > Kekuatan utama standar OWASP ini adalah **memetakan setiap kategori kontrol ke lapisan pengujian** — **Unit**, **Integration**, atau **Acceptance** — sehingga jelas di mana tiap kontrol paling efektif diuji. Beberapa kategori kontrol beserta pertanyaannya:
> >
> > - **Lockout** — apakah ada account lockout yang efektif? (Integration, Acceptance)
> > - **Storage** — apakah kredensial autentikasi disimpan secara aman? (Integration)
> > - **Authorisation** — apakah aplikasi mengelola akses ke resource terlindungi? (Integration, Acceptance)
> > - **Manipulation** — apakah model kontrol akses ditegakkan dengan sukses? (Integration, Acceptance)
> > - **Logout/Log off** — apakah fungsi logout tersedia dan efektif? (Integration, Acceptance)
> > - **Transport / Cookie Transport** — apakah Session ID dan cookie ditransmisikan/disimpan aman dengan direktif yang tepat? (Acceptance; Cookie: Integration & Acceptance)
> > - **Expiration** — apakah kriteria kedaluwarsa sesi wajar dan lengkap? (Integration, Acceptance)
> > - **Input Validation & Special Characters** — apakah semua input klien diperiksa tipe, panjang, dan kewajarannya? (Unit, Integration, Acceptance)
> > - **HTML Injection / Active script injection** — apakah aplikasi tahan terhadap HTML/script sebagai input? (Acceptance)
> > - **OS Injection / SQL Injection** — apakah akses ke perintah OS dicegah dan aplikasi tahan SQL command insertion? (Integration, Acceptance)
> > - **Legacy data** — apakah data lama telah dihapus dari server? (Acceptance)
> > - **Error Messages** — apakah semua pesan error generik untuk mencegah kebocoran informasi? (Integration, Acceptance)
> >
> > Pola yang muncul: kontrol **input validation** dan **special characters** dapat diuji di **ketiga lapisan** (paling fleksibel), kontrol berbasis penegakan model (authorisation, lockout, SQL injection) cenderung di **Integration + Acceptance**, sedangkan kontrol yang murni tampak dari luar (HTML/script injection, legacy data, transport) hanya di **Acceptance**.
> >
> > ### Other Remarks — Aktivitas Keamanan per Fase SDLC
> >
> > Materi menutup dengan memetakan aktivitas keamanan ke fase siklus hidup. **Saat development (While development)**: lakukan **Code Review and Walkthrough**. **Saat deployment (In Deployment)**: lakukan **Penetration Testing** dan **Configuration Management Testing**. **Saat maintenance & operation (In Maintenance and Operation)**: lakukan **Operational Management Review**, **Health Checks**, dan **Change Verification**.
> >
> > Khusus untuk **Penetration Testing**, ada hal yang harus disiapkan terlebih dahulu: **Testing process & procedure** yang jelas, **Non-disclosure Agreement (NDA)** untuk melindungi informasi sensitif yang terungkap, dan **Rules of Engagement (RoE)** yang menetapkan batasan legal dan teknis — apa yang boleh dan tidak boleh diuji, kapan, serta bagaimana. Tanpa NDA dan RoE, pentest dapat menimbulkan masalah hukum maupun gangguan operasional yang serius.
> >
> > ### Conclusions
> >
> > Kesimpulan materi menegaskan beberapa poin kunci. **Tools dan teknik pengujian yang sudah ada dapat dipakai untuk security testing di dalam development lifecycle** — tidak perlu menunggu fase terpisah di akhir. **Pelatihan keamanan untuk developer adalah investasi yang baik**, karena isu keamanan teridentifikasi lebih dini, kode menjalani **deep testing**, dan **kepatuhan terhadap Web App Security Standard dapat dibuktikan**. Dengan kata lain, keamanan yang menyatu ke dalam proses pengembangan jauh lebih murah dan efektif daripada perbaikan reaktif setelah rilis.

> [!cornell] #### Summary
>
> Materi mendaftarkan teknik security testing yang luas — dari **OS hardening, vulnerability/port/network scanning, firewall rule testing, penetration testing** hingga **SQL injection, XSS, command injection, beragam manipulation (parameter/cookie/URL/HTTP header/form field), DoS, buffer overflow, format string, session hijacking, password cracking, phishing, IP spoofing, packet sniffing, dan social engineering**. **Web Application Security Standard OWASP** diturunkan dari security policy, mencakup aspek fungsional & non-fungsional, dan diwujudkan lewat **OWASP Testing Checklist** yang **memetakan kategori kontrol** (lockout, storage, authorisation, session, input validation, injection, error messages) ke lapisan **Unit/Integration/Acceptance** — input validation menjangkau ketiganya, kontrol penegakan ke Integration+Acceptance, kontrol eksternal ke Acceptance. Aktivitas keamanan dipetakan per fase: **code review saat development, pentest + configuration management saat deployment, operational review/health check saat maintenance**, dengan **NDA dan Rules of Engagement** wajib sebelum pentest. Kesimpulannya: tools yang ada cukup, pelatihan developer adalah investasi, dan kepatuhan standar dapat dibuktikan.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — OWASP ASVS sebagai Standar Formal (DI LUAR sumber)
> Konsep "Web Application Security Standard" dalam materi kini diformalkan oleh OWASP menjadi **ASVS (Application Security Verification Standard)** — kerangka berisi ratusan requirement keamanan yang dibagi tiga **level** (L1 untuk aplikasi umum, L2 untuk yang menangani data sensitif, L3 untuk aplikasi kritis tinggi). ASVS melengkapi WSTG: WSTG menjelaskan *bagaimana menguji*, ASVS menetapkan *apa yang harus benar*. Banyak kontrak dan audit modern mewajibkan kepatuhan ASVS level tertentu sebagai acceptance criteria — perwujudan langsung dari "compliance can be demonstrated".
>
> #### Lebih dalam — Rules of Engagement secara Praktis
> Sebuah RoE yang matang menetapkan: scope (IP/domain yang boleh diuji), window waktu pengujian, teknik yang dilarang (mis. DoS yang merusak produksi, social engineering ke staf tertentu), jalur eskalasi darurat ("get out of jail" contact bila terjadi insiden), serta penanganan data sensitif yang ditemukan. NDA dan RoE bersama-sama melindungi kedua pihak secara hukum dan operasional — mengabaikannya pernah membuat pentester menghadapi tuntutan pidana meski diizinkan klien (mis. kasus Coalfire 2019).
>
> #### Proyek Eksplorasi Mandiri
> 1. Ambil OWASP Testing Checklist dan petakan 10 kontrol pertama ke aplikasi nyata milik Anda, tandai lapisan (Unit/Integration/Acceptance) yang akan Anda pakai untuk menguji masing-masing.
> 2. Susun draft Rules of Engagement satu halaman untuk pentest fiktif: scope, jadwal, teknik terlarang, dan kontak eskalasi.
> 3. Pilih lima teknik dari daftar materi (mis. SQL injection, XSS, session hijacking, buffer overflow, social engineering) dan klasifikasikan tiap teknik ke kategori STRIDE dan ke fase SDLC yang paling tepat untuk mendeteksinya.
>
> #### Bacaan Lanjutan
> - OWASP Web Security Testing Guide v4.2 dan OWASP Testing Checklist (repositori WSTG)
> - OWASP Application Security Verification Standard (ASVS)
> - PTES — Penetration Testing Execution Standard (struktur RoE & pelaporan)
> - Vinay Srinivasan, "Software Security Testing"
