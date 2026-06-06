---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Risk Assessment dan Security Requirements
>
> > ## Questions/Cues
> >
> > - Apa langkah-langkah dalam melakukan Risk Assessment?
> > - Bagaimana likelihood dan impact digunakan untuk memprioritaskan risiko?
> > - Apa perbedaan functional dan non-functional security requirements?
> > - Dari sumber apa saja security requirements diturunkan?
> > - Bagaimana hasil risk assessment mengalir menjadi security requirements?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Risk Assessment")
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Security Requirements")
>
> > ### Konsep dan Tujuan Risk Assessment
> >
> > **Risk Assessment** adalah proses yang **mengidentifikasi, menganalisis, dan memprioritaskan** potensi risiko terhadap sistem perangkat lunak. Ia dilakukan pada fase **Requirement**—paling awal dalam Secure SDLC—karena keputusan keamanan yang diambil di sini akan memandu seluruh fase berikutnya. Tanpa risk assessment, tim akan menebak-nebak kontrol keamanan apa yang dibutuhkan, berisiko membuang sumber daya pada ancaman yang tidak relevan sambil mengabaikan yang kritis.
> >
> > Inti risk assessment adalah membuat keamanan bersifat **berbasis bukti dan terprioritas**, bukan reaktif. Tidak semua aset bernilai sama, tidak semua ancaman mungkin terjadi, dan tidak semua kerentanan berdampak besar. Dengan menilai risiko secara terstruktur, organisasi dapat mengalokasikan anggaran keamanan yang terbatas ke titik-titik yang paling berbahaya terlebih dahulu.
> >
> > **Outcome** dari risk assessment menurut slide adalah **daftar risiko yang sudah diprioritaskan** untuk ditangani dalam proses pengembangan. Daftar ini menjadi artefak penghubung—ia langsung memberi makan perumusan _security requirement_ dan kemudian _threat modeling_ pada fase Design.
> >
> > ### Langkah-Langkah Risk Assessment
> >
> > Slide merinci lima langkah berurutan. **Pertama, identifikasi aset (identify assets)**—apa yang perlu dilindungi. Contohnya **data pengguna** dan **kekayaan intelektual (intellectual property)**. Aset adalah segala sesuatu yang bernilai bagi organisasi sehingga kehilangan atau kerusakannya menimbulkan kerugian; mengetahuinya menetapkan "apa yang dipertaruhkan".
> >
> > **Kedua, identifikasi ancaman (identify threats)**—apa yang bisa menyerang aset tersebut. Contohnya **akses tidak sah (unauthorized access)** dan **kebocoran data (data breaches)**. Ancaman menggambarkan kejadian buruk yang mungkin menimpa aset. **Ketiga, identifikasi kerentanan (identify vulnerabilities)**—kelemahan yang memungkinkan ancaman terwujud. Contohnya **ketiadaan enkripsi (lack of encryption)** dan **otentikasi yang lemah (weak authentication)**. Kerentanan adalah celah konkret pada sistem yang dapat dimanfaatkan ancaman.
> >
> > **Keempat, nilai risiko (assess risk)** dengan mengevaluasi **likelihood (kemungkinan)** dan **impact (dampak)**. Sebuah risiko menjadi serius hanya jika ia cukup mungkin terjadi _dan_ berdampak cukup besar. **Kelima, prioritaskan risiko (prioritize risks)** berdasarkan **severity (tingkat keparahan)**. Hasilnya adalah urutan risiko dari yang paling mendesak ke yang dapat diterima, sehingga tim tahu harus mulai dari mana.
> >
> > ### Menilai Risiko: Likelihood × Impact
> >
> > Penilaian risiko bertumpu pada dua dimensi yang dikalikan: **likelihood** (seberapa mungkin ancaman terwujud) dan **impact** (seberapa parah kerugiannya bila terjadi). Sebuah risiko dengan likelihood tinggi tetapi impact remeh (misalnya defacement halaman statis sepele) mungkin berperingkat rendah, sementara risiko dengan likelihood sedang tetapi impact katastrofik (misalnya kebocoran seluruh basis data pelanggan) berperingkat tinggi. Perkalian ini mencegah dua kesalahan umum: mengabaikan bencana yang jarang dan panik atas gangguan yang sering tapi sepele.
> >
> > Dalam praktik, dimensi ini sering dipetakan ke **matriks risiko** dua sumbu (misalnya rendah–sedang–tinggi pada masing-masing sumbu) yang menghasilkan zona warna: hijau (diterima), kuning (dimitigasi), merah (wajib ditangani segera). Likelihood diestimasi dari faktor seperti mudahnya kerentanan dieksploitasi, motivasi penyerang, dan apakah eksploit publik sudah ada. Impact diestimasi dari nilai aset, kerugian finansial, dampak regulasi, dan kerusakan reputasi.
> >
> > Hasil penilaian inilah yang menentukan **severity** untuk pemrioritasan. Risiko ber-severity tertinggi diangkat menjadi _security requirement_ yang wajib, sementara yang lebih rendah dapat menjadi rekomendasi atau diterima sebagai risiko residual. Dengan demikian, perumusan kebutuhan keamanan berakar pada analisis yang dapat dipertanggungjawabkan, bukan sekadar intuisi.
> >
> > ### Security Requirements: Functional vs Non-Functional
> >
> > **Security Requirements** adalah **pedoman yang spesifik dan terukur (specific, measurable)** untuk memastikan keamanan perangkat lunak. Sifat "terukur" penting agar requirement dapat diuji dan diverifikasi nanti pada fase testing—requirement yang kabur seperti "sistem harus aman" tidak dapat divalidasi, sedangkan "semua password disimpan dengan hashing bcrypt cost ≥ 12" dapat diperiksa.
> >
> > Slide membagi requirement menjadi dua jenis. **Functional Security Requirements** adalah **fitur** keamanan yang dapat diobservasi, seperti **authentication (otentikasi)**, **encryption (enkripsi)**, dan **logging (pencatatan)**. Ini adalah "apa yang dilakukan sistem" untuk keamanan—fungsi konkret yang dibangun ke dalam aplikasi. **Non-Functional Security Requirements** adalah **atribut** kualitas, seperti **resilience (ketahanan)**, **availability (ketersediaan)**, dan **compliance (kepatuhan)**. Ini adalah "seberapa baik sistem berperilaku" di bawah tekanan—properti lintas-cutting yang tidak terikat pada satu fitur tunggal.
> >
> > Perbedaan ini penting karena keduanya diuji secara berbeda. Functional requirement diuji dengan kasus uji fungsional (apakah login menolak password salah?), sedangkan non-functional requirement diuji dengan pengujian beban, _chaos engineering_, atau audit kepatuhan (apakah sistem tetap tersedia di bawah serangan DoS?). Secure SDLC yang baik memastikan kedua jenis tercakup, karena sistem dengan fitur keamanan lengkap pun bisa gagal bila tidak tahan terhadap beban atau tidak patuh regulasi.
> >
> > ### Sumber Penurunan Security Requirements
> >
> > Slide menyebut tiga sumber tempat security requirement **diturunkan (derived from)**. **Pertama, temuan risk assessment (risk assessment findings)**—inilah hubungan langsung antara dua topik catatan ini. Risiko berperingkat tinggi dari penilaian sebelumnya diterjemahkan menjadi requirement konkret; misalnya, risiko "kebocoran data karena ketiadaan enkripsi" melahirkan requirement "semua data sensitif dienkripsi saat transit dan saat disimpan".
> >
> > **Kedua, standar hukum dan regulasi (legal and regulatory standards)**, contohnya **GDPR** dan **PCI-DSS**. GDPR menuntut perlindungan data pribadi warga Uni Eropa dengan prinsip seperti _privacy by design_ dan hak untuk dihapus, sementara PCI-DSS menetapkan kontrol spesifik atas data kartu pembayaran. Regulasi ini menjadi requirement non-negotiable—kegagalan memenuhinya berisiko denda besar dan sanksi hukum, bukan sekadar kerentanan teknis.
> >
> > **Ketiga, praktik terbaik industri (industry best practices)**, contohnya **panduan OWASP**. OWASP menyediakan rujukan seperti OWASP Top 10 dan ASVS yang merangkum pelajaran komunitas keamanan global tentang kerentanan paling umum dan cara mencegahnya. Dengan menurunkan requirement dari tiga sumber ini, **outcome** akhirnya adalah **daftar security requirement yang komprehensif** yang memandu fase **design, implementation, dan testing**—menjadikan risk assessment dan security requirements sebagai fondasi yang menyatukan keamanan di seluruh sisa lifecycle.

> [!cornell] #### Summary
>
> **Risk Assessment** mengidentifikasi, menganalisis, dan memprioritaskan risiko melalui lima langkah: identifikasi **aset** (data pengguna, IP), **ancaman** (akses tidak sah, kebocoran data), dan **kerentanan** (ketiadaan enkripsi, otentikasi lemah), lalu menilai risiko dengan **likelihood × impact** dan memprioritaskannya berdasarkan **severity**. Outcome-nya adalah daftar risiko terprioritas yang langsung memberi makan **Security Requirements**—pedoman spesifik dan terukur yang terbagi menjadi **functional** (authentication, encryption, logging) dan **non-functional** (resilience, availability, compliance). Requirement ini diturunkan dari tiga sumber: **temuan risk assessment**, **standar hukum/regulasi (GDPR, PCI-DSS)**, dan **praktik terbaik industri (OWASP)**, menghasilkan daftar komprehensif yang memandu design, implementation, dan testing.

> [!ad-libitum]- Additional Information
>
> #### Metodologi Risk Assessment Formal (DI LUAR sumber)
>
> Di luar langkah dasar slide, terdapat metodologi terstandar. **NIST SP 800-30** menyediakan panduan _Risk Management Guide_ dengan pendekatan kualitatif dan kuantitatif. **OCTAVE** (Carnegie Mellon) berfokus pada risiko berbasis aset organisasi. **FAIR (Factor Analysis of Information Risk)** menawarkan model kuantitatif yang menerjemahkan risiko ke nilai finansial (_Annualized Loss Expectancy_), memungkinkan diskusi risiko dalam bahasa yang dipahami eksekutif. Untuk prioritisasi kerentanan teknis, **CVSS (Common Vulnerability Scoring System)** memberi skor 0–10 yang menggabungkan _exploitability_ dan _impact_, mirip dengan logika likelihood × impact pada slide.
>
> #### Misuse Cases dan Security Requirements Engineering (DI LUAR sumber)
>
> Teknik **misuse cases** (Sindre & Opdahl) memperluas UML use case dengan aktor jahat dan skenario penyalahgunaan, sehingga security requirement lahir secara sistematis dari ancaman yang dimodelkan. Kerangka **SQUARE (Security Quality Requirements Engineering)** dari Carnegie Mellon memberi proses sembilan langkah khusus untuk menggali, mengkategorikan, dan memprioritaskan security requirement. Standar **ISO/IEC 27001** dan **OWASP ASVS** menyediakan checklist requirement yang dapat langsung diadopsi sebagai baseline.
>
> #### Studi Kasus: GDPR dan PCI-DSS dalam Praktik (DI LUAR sumber)
>
> Sebuah platform e-commerce yang melayani pelanggan Eropa harus menurunkan requirement dari **GDPR** seperti _consent management_, _right to erasure_, dan notifikasi pelanggaran dalam 72 jam. Karena memproses kartu kredit, ia juga terikat **PCI-DSS** yang melarang penyimpanan CVV, mewajibkan enkripsi PAN, dan segmentasi jaringan _cardholder data environment_. Kegagalan British Airways memenuhi standar ini pada 2018 (pembobolan 380.000 transaksi) menghasilkan denda GDPR awal sebesar 183 juta poundsterling—ilustrasi konkret bahwa regulasi adalah sumber requirement yang mahal bila diabaikan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. **Bangun Matriks Risiko** — Pilih sebuah aplikasi (misalnya aplikasi perbankan sederhana), lakukan lima langkah risk assessment, lalu plot setiap risiko pada matriks likelihood × impact 3×3. Tentukan tiga risiko prioritas teratas.
> 2. **Turunkan Requirement dari Tiga Sumber** — Untuk satu risiko prioritas, tulis security requirement yang berasal dari (a) risk assessment, (b) GDPR atau PCI-DSS, dan (c) OWASP ASVS. Pastikan tiap requirement spesifik dan terukur.
> 3. **Hitung Risiko dengan FAIR** — Ambil satu skenario ancaman, estimasikan frekuensi kejadian dan magnitudo kerugian, lalu hitung _Annualized Loss Expectancy_. Bandingkan hasilnya dengan penilaian kualitatif Anda.
>
> #### Bacaan Lanjutan
>
> - *"NIST SP 800-30 Rev.1: Guide for Conducting Risk Assessments"* — NIST, 2012.
> - *"Measuring and Managing Information Risk: A FAIR Approach"* — Jack Freund & Jack Jones, 2014.
> - *"OWASP Application Security Verification Standard (ASVS)"* — https://owasp.org/asvs.
> - *"Security Requirements Engineering: A Framework for Representation and Analysis"* — Haley et al., IEEE TSE, 2008.
> - *"GDPR (Regulation EU 2016/679)"* dan *"PCI-DSS v4.0"* — teks resmi regulasi.
