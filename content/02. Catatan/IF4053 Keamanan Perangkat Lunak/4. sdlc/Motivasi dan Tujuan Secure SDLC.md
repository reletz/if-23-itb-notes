---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Motivasi dan Tujuan Secure SDLC
>
> > ## Questions/Cues
> >
> > - Mengapa keamanan harus _built-in_ dan bukan ditambal (_patch_) setelahnya?
> > - Apa bedanya _security engineering_ dengan _reliability engineering_?
> > - Apa makna pendekatan "Shift Left" dan mengapa ia menekan biaya?
> > - Mengapa keamanan yang menjadi _afterthought_ menimbulkan banyak vulnerability?
> > - Apa kelemahan model "many eyes" dan code review pada praktik SDLC saat ini?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Motivation behind Secure SDLC")
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Why Integrate Security? & Benefits")
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Current SDLC")
>
> > ### Mengapa Keamanan Harus Built-In, Bukan Patch
> >
> > Premis utama **Secure SDLC** adalah bahwa keamanan harus **built-in** sejak awal proses pengembangan, bukan ditempelkan sebagai **patch** setelah perangkat lunak selesai dibangun. Ketika keamanan diperlakukan sebagai tambalan, organisasi hanya bereaksi terhadap kerentanan yang sudah terlanjur ada di kode produksi—seringkali setelah eksploitasi terjadi. Pendekatan reaktif ini mahal, rapuh, dan cenderung meninggalkan celah residual karena perbaikan dilakukan secara tergesa-gesa tanpa memahami akar arsitektural masalahnya.
> >
> > Analogi yang mudah dipahami adalah membangun rumah. Memasang pondasi tahan gempa jauh lebih murah dan efektif jika dirancang sejak gambar arsitektur dibuat, dibandingkan menyuntikkan tulangan baja ke dinding yang sudah berdiri. Begitu pula dengan perangkat lunak: keputusan desain seperti **enkripsi data**, **kontrol akses**, dan **validasi input** yang ditanamkan pada fase requirement dan design akan membentuk fondasi yang sukar ditembus, sementara penambalan belakangan hanya menutupi gejala.
> >
> > Slide W05 menegaskan bahwa **vendor besar pun seharusnya membangun perangkat lunak yang lebih aman** secara default. Artinya, tanggung jawab keamanan bukan hanya milik tim keamanan terpisah, melainkan melekat pada setiap tahap rekayasa. Dengan menjadikan keamanan sebagai _first-class requirement_, kerentanan dapat dicegah sebelum lahir, bukan diburu setelah menetas.
> >
> > ### Security Engineering Melampaui Reliability Engineering
> >
> > Salah satu poin krusial dari materi adalah bahwa **security engineering is beyond reliability engineering**. _Reliability engineering_ berfokus pada memastikan sistem berperilaku benar di bawah kondisi normal dan kegagalan acak—misalnya, apakah sistem tetap berjalan ketika disk penuh atau jaringan terputus. Asumsi dasarnya adalah lingkungan yang **netral**: gangguan terjadi karena kebetulan, bukan karena niat.
> >
> > Keamanan menambahkan dimensi yang fundamental berbeda: **kehadiran penyerang (attacker/malicious agent)** yang secara aktif dan cerdas mencari cara untuk merusak sistem. Penyerang tidak menunggu kegagalan acak; ia menciptakan kondisi terburuk dengan sengaja, memanfaatkan input yang tidak terduga, _race condition_, dan asumsi tersembunyi yang dibuat pengembang. Oleh karena itu, model ancaman tidak bisa hanya bersandar pada statistik kegagalan, melainkan harus mengasumsikan adversary yang adaptif.
> >
> > Konsekuensinya, teknik reliabilitas seperti redundansi dan _graceful degradation_ memang perlu, tetapi tidak cukup. Sebuah sistem yang sangat andal pun bisa hancur oleh satu **SQL injection** atau **buffer overflow** karena penyerang mengeksploitasi jalur yang tidak pernah diuji oleh skenario kegagalan normal. Security engineering karenanya menuntut pola pikir **adversarial**—bertanya "bagaimana ini bisa disalahgunakan?" bukan hanya "bagaimana ini bisa gagal?".
> >
> > ### Pendekatan "Shift Left" dan Kurva Biaya Perbaikan
> >
> > Pendekatan **"Shift Left"** berarti menggeser aktivitas keamanan ke **fase paling awal** dalam timeline pengembangan—ke kiri pada diagram lifecycle. Daripada menunggu fase testing atau deployment untuk menemukan masalah, keamanan ditangani sejak _requirement_ dan _design_. Slide menegaskan: "_Integrating security early reduces costs and risks_."
> >
> > Alasan ekonomisnya digambarkan oleh **kurva biaya perbaikan** yang menanjak tajam seiring lifecycle berjalan. Memperbaiki cacat keamanan pada fase requirement mungkin hanya butuh mengubah satu kalimat spesifikasi. Memperbaikinya pada fase design butuh mengulang sebagian arsitektur. Pada fase coding, butuh menulis ulang modul. Pada testing, butuh _rework_ plus regresi. Dan pada **produksi**, biayanya melonjak berkali-kali lipat karena melibatkan _incident response_, _patch_ darurat, potensi pelanggaran data, denda regulasi, serta kerusakan reputasi.
> >
> >
> > ```mermaid
> > flowchart LR
> >     R["Requirement<br/>biaya 1x"] --> D["Design<br/>biaya ~5x"]
> >     D --> C["Construct<br/>biaya ~10x"]
> >     C --> T["Testing<br/>biaya ~15x"]
> >     T --> P["Production<br/>biaya 30-100x"]
> >     S["Shift Left:<br/>geser aktivitas keamanan<br/>ke fase paling kiri"] -.-> R
> > ```
> >
> > Inti pesan kurva ini: semakin lambat sebuah kerentanan ditemukan, semakin **eksponensial** biaya memperbaikinya. "Shift Left" membalik logika ini dengan menanam pemeriksaan keamanan di titik termurah, sehingga investasi kecil di awal mencegah kerugian besar di akhir.
> >
> > ### Mengapa Keamanan Menjadi Afterthought Menimbulkan Vulnerability
> >
> > Slide menyatakan bahwa "**security is often an afterthought, leading to vulnerabilities**". Dalam praktik pengembangan yang dikejar tenggat (_deadline-driven_), fitur fungsional selalu didahulukan karena itulah yang terlihat dan menghasilkan nilai bisnis langsung. Keamanan, yang sifatnya **non-fungsional** dan baru terasa dampaknya ketika gagal, dengan mudah tergeser ke akhir backlog atau dilupakan sama sekali.
> >
> > Ketika keamanan baru dipikirkan menjelang rilis, tim terpaksa menambahkan kontrol di atas arsitektur yang tidak dirancang untuk itu. Hasilnya adalah _bolt-on security_—lapisan yang ditempel paksa, sering tidak konsisten, dan meninggalkan jalur-jalur yang terlewat. Misalnya, menambahkan otentikasi setelah API publik sudah beroperasi berisiko meninggalkan endpoint lama yang tetap terbuka, atau menambahkan enkripsi setelah skema basis data jadi memaksa migrasi data yang berbahaya.
> >
> > Manfaat mengintegrasikan keamanan sejak dini sangat jelas menurut slide: **mengurangi jumlah vulnerability**, **memastikan kepatuhan regulasi** seperti **GDPR** dan **PCI-DSS**, serta **membangun kepercayaan pengguna** sekaligus melindungi data sensitif. Kepatuhan ini bukan sekadar formalitas; GDPR mensyaratkan _privacy by design_ dan PCI-DSS menuntut kontrol konkret atas data kartu pembayaran—keduanya hanya bisa dipenuhi secara meyakinkan bila keamanan menjadi bagian desain, bukan tambalan.
> >
> > ### Masalah Code Review dan Mitos "Many Eyes" pada SDLC Saat Ini
> >
> > Materi menyoroti kelemahan praktik SDLC saat ini, terutama pada **code review**. Pertama, ada **lack of incentive**: code review dianggap **slow, tiring, and boring**. Reviewer jarang diberi penghargaan eksplisit atas waktu yang dihabiskan menelusuri kode orang lain, sehingga kualitas review menurun seiring kelelahan dan tekanan jadwal. Insentif organisasi cenderung menghargai penulisan fitur baru, bukan pencegahan bug yang tidak terlihat.
> >
> > Kedua, **security bugs is particular**—bug keamanan punya sifat khusus yang membedakannya dari bug fungsional biasa. Ia sering tidak memunculkan kegagalan yang kasat mata; kode berjalan "benar" pada input normal dan hanya bocor pada input yang dirancang penyerang. Akibatnya, reviewer yang fokus pada "apakah ini bekerja?" mudah melewatkan jalur eksploitasi yang hanya muncul pada kondisi adversarial.
> >
> > Ketiga, slide membantah mitos populer **"many eyes fail altogether"**—gagasan bahwa "dengan cukup banyak mata, semua bug menjadi dangkal" (hukum Linus). Kenyataannya, banyaknya orang yang melihat kode tidak otomatis berarti **cukup banyak orang yang berkompeten** benar-benar mereview **bagian kode yang tepat dengan frekuensi yang memadai**. Banyak mata yang sekadar lewat tidak setara dengan beberapa mata ahli yang menelaah secara mendalam. Inilah mengapa Secure SDLC tidak menggantungkan keamanan pada review ad-hoc semata, melainkan menanamkan aktivitas keamanan terstruktur (threat modeling, static analysis, security testing) di setiap fase agar tidak bergantung pada keberuntungan "mata yang kebetulan jeli".

> [!cornell] #### Summary
>
> **Secure SDLC** berangkat dari keyakinan bahwa keamanan harus **built-in** sejak awal, bukan ditambal (**patch**) belakangan, karena **security engineering melampaui reliability engineering** dengan mengasumsikan kehadiran **penyerang aktif**, bukan sekadar kegagalan acak. Pendekatan **"Shift Left"** menggeser aktivitas keamanan ke fase requirement dan design, memanfaatkan kenyataan bahwa **biaya perbaikan kerentanan meningkat eksponensial** seiring lifecycle berjalan. Ketika keamanan menjadi **afterthought**, ia melahirkan _bolt-on security_ yang penuh celah; integrasinya sejak dini justru **mengurangi vulnerability**, memenuhi **kepatuhan GDPR/PCI-DSS**, dan membangun **kepercayaan pengguna**. Praktik SDLC saat ini lemah karena **code review tanpa insentif** yang terasa membosankan dan mitos **"many eyes"** yang gagal—banyak mata tidak menjamin reviewer kompeten menelaah kode yang tepat cukup sering.

> [!ad-libitum]- Additional Information
>
> #### Framework dan Standar Secure SDLC di Dunia Nyata (DI LUAR sumber)
>
> Beberapa kerangka kerja industri mengoperasionalkan ide Secure SDLC. **Microsoft Security Development Lifecycle (SDL)** adalah pelopornya, dengan praktik wajib seperti threat modeling, fuzzing, dan _final security review_ sebelum rilis. **OWASP SAMM (Software Assurance Maturity Model)** menyediakan model penilaian kematangan di lima domain (Governance, Design, Implementation, Verification, Operations) sehingga organisasi dapat mengukur dan menaikkan level keamanannya secara terukur. **BSIMM (Building Security In Maturity Model)** bersifat deskriptif—mengumpulkan data praktik nyata dari ratusan perusahaan sebagai _benchmark_. Untuk konteks pemerintah dan kepatuhan, **NIST SSDF (Secure Software Development Framework, SP 800-218)** menjadi rujukan yang kini banyak disyaratkan dalam pengadaan perangkat lunak.
>
> #### DevSecOps dan Otomasi "Shift Left" (DI LUAR sumber)
>
> Konsep "Shift Left" mencapai puncaknya dalam **DevSecOps**, di mana pemeriksaan keamanan diotomatisasi ke dalam pipeline **CI/CD**. Tools seperti **SonarQube** dan **Semgrep** menjalankan _static analysis (SAST)_ pada setiap commit; **OWASP Dependency-Check** dan **Snyk** memindai kerentanan pada dependensi pihak ketiga (_SCA_); **Trivy** memeriksa image container; serta **OWASP ZAP** melakukan _dynamic analysis (DAST)_ otomatis. Dengan menjadikan _security gate_ sebagai bagian pipeline, kerentanan tertangkap pada menit yang sama saat kode ditulis—perwujudan paling konkret dari kurva biaya yang ditekan ke kiri.
>
> #### Studi Kasus: Biaya Afterthought (DI LUAR sumber)
>
> Insiden **Equifax (2017)** adalah ilustrasi mahalnya keamanan sebagai afterthought: kerentanan **Apache Struts (CVE-2017-5638)** yang sudah ada patch-nya tidak ditambal tepat waktu, membocorkan data 147 juta orang dan menelan biaya lebih dari 1,4 miliar dolar. Sebaliknya, **Heartbleed (2014)** pada OpenSSL menunjukkan kegagalan mitos "many eyes"—pustaka kritis yang dipakai jutaan sistem ternyata direview oleh segelintir relawan tanpa pendanaan memadai, persis seperti yang diperingatkan slide.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. **Audit Maturity dengan OWASP SAMM** — Pilih sebuah proyek open-source (atau proyek tugas Anda), lalu petakan praktiknya ke lima domain SAMM. Hitung skor maturity tiap domain dan susun roadmap perbaikan tiga tahap.
> 2. **Bangun Security Gate di CI/CD** — Buat repositori GitHub dengan workflow Actions yang menjalankan Semgrep (SAST) dan Snyk/Dependency-Check (SCA) pada setiap pull request, lalu blokir merge jika ditemukan temuan _high severity_. Dokumentasikan waktu eksekusi dan tingkat temuan.
> 3. **Simulasi Kurva Biaya** — Ambil satu kerentanan sederhana (misalnya SQL injection) dan estimasikan effort memperbaikinya jika ditemukan di tiap fase (requirement, design, coding, testing, produksi). Visualisasikan sebagai kurva untuk memvalidasi argumen "Shift Left".
>
> #### Bacaan Lanjutan
>
> - *"Software Security: Building Security In"* — Gary McGraw, Addison-Wesley, 2006.
> - *"The Security Development Lifecycle"* — Michael Howard & Steve Lipner, Microsoft Press, 2006.
> - *"OWASP SAMM v2"* — tersedia di https://owaspsamm.org.
> - *"NIST SP 800-218: Secure Software Development Framework (SSDF)"* — National Institute of Standards and Technology, 2022.
> - *"Securing DevOps"* — Julien Vehent, Manning Publications, 2018.
