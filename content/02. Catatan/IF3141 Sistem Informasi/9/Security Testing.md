---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Security Testing
>
> > ## Questions/Cues
> >
> > - Apa itu security testing dan apa yang ingin dipastikannya?
> > - Apa enam konsep dasar keamanan yang harus dicakup?
> > - Apa perbedaan confidentiality, integrity, dan availability?
> > - Apa beda authentication, authorization, dan non-repudiation?
> > - Apa saja serangan terkait authentication (brute force, session fixation, dll)?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi — System Testing (Slides 46-54)
>
> > ### Definisi dan Enam Konsep Dasar
> >
> > **Security testing** adalah proses untuk menentukan bahwa sistem **melindungi data dan mempertahankan fungsionalitas sebagaimana dimaksud (as intended)**. **Enam konsep keamanan dasar** yang harus dicakup oleh security testing adalah:
> >
> > 1. **Confidentiality** (kerahasiaan)
> > 2. **Integrity** (integritas)
> > 3. **Authentication** (autentikasi)
> > 4. **Authorization** (otorisasi)
> > 5. **Availability** (ketersediaan)
> > 6. **Non-repudiation** (nirsangkal)
> >
> > ```mermaid
> > mindmap
> >   root(("Security<br/>Testing"))
> >     C["Confidentiality<br/>cegah disclosure"]
> >     I["Integrity<br/>data tak teralter"]
> >     AU["Authentication<br/>siapa kamu"]
> >     AZ["Authorization<br/>boleh apa"]
> >     AV["Availability<br/>siap saat dibutuhkan"]
> >     N["Non-repudiation<br/>cegah penyangkalan"]
> > ```
> >
> > Enam konsep keamanan dasar yang harus dicakup oleh security testing.
> >
> > ### Confidentiality, Integrity, Availability
> >
> > **Confidentiality** — Ukuran keamanan yang **melindungi terhadap pengungkapan informasi (disclosure)** kepada pihak selain penerima yang dimaksud — meskipun ini bukan satu-satunya cara memastikan kerahasiaan (sering dicapai lewat enkripsi).
> >
> > **Integrity** — Ukuran yang ditujukan agar penerima dapat menentukan bahwa informasi yang diterima **tidak diubah (not altered) saat transit** atau oleh pihak selain pembuat asli (originator). Skema integrity sering memakai teknologi dasar yang sama dengan confidentiality, tetapi biasanya melibatkan **penambahan informasi tambahan** pada komunikasi untuk membentuk dasar **pemeriksaan algoritmik** (mis. checksum/hash) alih-alih mengenkode seluruh komunikasi.
> >
> > **Availability** — Menjamin layanan informasi dan komunikasi **siap digunakan saat diharapkan (ready for use when expected)**. Informasi harus tetap tersedia bagi orang yang berwenang ketika mereka membutuhkannya (lawan dari serangan seperti DoS).
> >
> > ### Authentication, Authorization, Non-Repudiation
> >
> > **Authentication** — Ukuran yang dirancang untuk **menetapkan validitas (validity)** suatu transmisi, pesan, atau originator. Memungkinkan penerima memiliki keyakinan bahwa informasi yang diterima **berasal dari sumber spesifik yang diketahui**. (Menjawab "siapa kamu?")
> >
> > **Authorization** — Pengaturan **kontrol akses** terhadap konten/fungsionalitas sensitif. (Menjawab "apa yang boleh kamu lakukan?")
> >
> > **Non-Repudiation** — Ukuran yang ditujukan untuk **mencegah penyangkalan di kemudian hari (later denial)** bahwa suatu aksi atau komunikasi terjadi. Dalam istilah komunikasi sering melibatkan **pertukaran informasi autentikasi** dikombinasikan dengan suatu bentuk **time stamp yang dapat dibuktikan (provable time stamp)** — sehingga pihak tidak dapat menyangkal telah melakukan transaksi.
> >
> > ### Serangan Terkait Authentication & Session
> >
> > - **Brute force attack** — Proses otomatis trial-and-error untuk menebak username, password, nomor kartu kredit, atau kunci kriptografis seseorang.
> > - **Insufficient authentication** — Terjadi ketika situs web mengizinkan penyerang mengakses konten/fungsionalitas sensitif **tanpa harus terautentikasi dengan benar**.
> > - **Weak password recovery validation** — Ketika situs web mengizinkan penyerang **memperoleh, mengubah, atau memulihkan password pengguna lain** secara ilegal.
> > - **Credential/Session Prediction** — Metode **membajak atau menyamar (hijacking/impersonating)** sebagai pengguna situs web dengan memprediksi credential/session.
> > - **Insufficient Authorization** — Ketika situs web mengizinkan akses ke konten/fungsionalitas sensitif yang seharusnya memerlukan **kontrol akses lebih ketat**.
> > - **Insufficient Session Expiration** — Ketika situs web mengizinkan penyerang **menggunakan kembali (reuse)** credential lama atau session ID lama untuk otorisasi.
> > - **Session Fixation** — Teknik serangan yang **memaksa session ID pengguna ke suatu nilai eksplisit** sehingga penyerang dapat menggunakannya kembali setelah pengguna login.

> [!cornell] #### Summary
>
> **Security testing** memastikan sistem **melindungi data dan mempertahankan fungsionalitas sebagaimana dimaksud**, mencakup **enam konsep dasar**: **confidentiality** (cegah disclosure, mis. enkripsi), **integrity** (data tak teralter saat transit, via checksum/hash), **authentication** (validitas asal — "siapa kamu"), **authorization** (kontrol akses — "boleh apa"), **availability** (siap saat dibutuhkan, lawan DoS), dan **non-repudiation** (cegah penyangkalan, via autentikasi + provable timestamp). Pengujian autentikasi menyoroti serangan: **brute force**, **insufficient authentication**, **weak password recovery**, **credential/session prediction**, **insufficient authorization**, **insufficient session expiration**, dan **session fixation** — kebanyakan berpusat pada kelemahan kredensial dan manajemen sesi.

> [!ad-libitum]- Additional Information
>
> #### Triad CIA dan Perluasannya
>
> Tiga konsep inti **Confidentiality, Integrity, Availability** dikenal sebagai **CIA Triad** — fondasi keamanan informasi. Penambahan Authentication, Authorization, dan Non-repudiation kadang disebut model **AAA + CIA** atau **Parkerian Hexad** (varian: confidentiality, possession, integrity, authenticity, availability, utility).
>
> #### Pertahanan terhadap Serangan Sesi/Kredensial
>
> - **Brute force** → rate limiting, account lockout, CAPTCHA, MFA
> - **Session fixation** → regenerasi session ID setelah login
> - **Session prediction** → session ID acak panjang & kriptografis
> - **Insufficient expiration** → timeout & invalidasi server-side saat logout
> - **Weak password recovery** → token sekali pakai, kanal terverifikasi, MFA
>
> #### Tools Security Testing
>
> - **OWASP ZAP, Burp Suite** — DAST untuk aplikasi web
> - **SQLMap, Hydra** — uji injeksi & brute force terkontrol
> - **Nessus, OpenVAS** — vulnerability scanning
> - **OWASP Top 10 & ASVS** — kerangka acuan kerentanan & verifikasi
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Lakukan uji session fixation pada aplikasi latihan dan verifikasi regenerasi session ID.
> 2. Jalankan OWASP ZAP terhadap aplikasi sandbox dan petakan temuan ke enam konsep keamanan.
> 3. Terapkan rate limiting + MFA lalu ukur efektivitasnya terhadap serangan brute force tersimulasi.
>
> #### Bacaan Lanjutan
>
> - OWASP Top 10 & OWASP Testing Guide — owasp.org
> - Stuttard, D. & Pinto, M. *The Web Application Hacker's Handbook*. Wiley.
> - WASC (Web Application Security Consortium) Threat Classification
