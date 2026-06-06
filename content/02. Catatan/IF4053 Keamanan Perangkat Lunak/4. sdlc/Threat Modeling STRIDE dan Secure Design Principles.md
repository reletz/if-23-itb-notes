---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Threat Modeling STRIDE dan Secure Design Principles
>
> > ## Questions/Cues
> >
> > - Apa itu threat modeling dan mengapa dilakukan sebelum implementasi?
> > - Apa empat langkah dalam proses threat modeling?
> > - Apa enam kategori ancaman dalam kerangka STRIDE?
> > - Apa tujuh secure design principles dan contoh penerapannya?
> > - Bagaimana secure design principles mengurangi attack surface?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Threat Modeling & STRIDE Framework")
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Secure Design Principles Overview")
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Principles in Practice")
>
> > ### Definisi dan Tujuan Threat Modeling
> >
> > **Threat Modeling** adalah proses **mengidentifikasi, menganalisis, dan memitigasi** potensi ancaman terhadap sebuah sistem. Ia dilakukan pada fase **Design**—setelah risk assessment merumuskan apa yang berisiko, tetapi sebelum sebaris kode ditulis. Tujuannya adalah memikirkan secara sistematis "bagaimana sistem ini bisa diserang?" saat arsitektur masih berupa diagram yang murah untuk diubah.
> >
> > Slide menjelaskan **mengapa threat modeling penting**: ia **secara proaktif mengidentifikasi risiko sebelum implementasi (proactively identifies risks before implementation)**, **membantu memprioritaskan upaya keamanan (helps prioritize security efforts)**, dan **mengurangi kemungkinan kerentanan (reduces the likelihood of vulnerabilities)**. Dengan kata lain, threat modeling adalah perwujudan "Shift Left" pada fase desain—mencegah kerentanan lahir alih-alih memburunya kelak.
> >
> > Nilai utama threat modeling adalah memaksa tim mengambil **perspektif penyerang** secara terstruktur. Tanpa proses ini, pengembang cenderung hanya membayangkan _happy path_—bagaimana sistem dipakai dengan benar. Threat modeling membalik lensa itu, bertanya bagaimana setiap komponen, aliran data, dan batas kepercayaan (_trust boundary_) dapat disalahgunakan, sehingga mitigasi dapat dirancang ke dalam arsitektur sejak awal.
> >
> > ### Empat Langkah dalam Threat Modeling
> >
> > Slide merinci empat langkah. **Pertama, identifikasi aset (identify assets)**: apa yang perlu dilindungi? Ini menetapkan fokus—data, layanan, atau fungsi yang bernilai sehingga layak dipertahankan. Langkah ini selaras dengan langkah pertama risk assessment, menjaga kesinambungan antarfase.
> >
> > **Kedua, identifikasi ancaman (identify threats)**: apa yang bisa salah (what could go wrong)? Di sinilah kerangka seperti **STRIDE** sangat membantu, karena memberi taksonomi sistematis sehingga tim tidak melewatkan kategori ancaman. **Ketiga, identifikasi kerentanan (identify vulnerabilities)**: di mana letak kelemahannya (where are the weaknesses)? Tim memeriksa titik-titik dalam desain di mana ancaman dapat terwujud—misalnya endpoint tanpa otentikasi atau aliran data tanpa enkripsi.
> >
> > **Keempat, mitigasi ancaman (mitigate threats)**: bagaimana risiko dapat dikurangi (how can risks be reduced)? Untuk tiap ancaman yang teridentifikasi, tim merancang kontrol—menerapkan otentikasi, enkripsi, validasi, atau prinsip desain aman. Empat langkah ini membentuk siklus yang menerjemahkan kekhawatiran abstrak menjadi keputusan desain konkret yang dapat diimplementasikan dan diuji.
> >
> > ### Kerangka STRIDE
> >
> > **STRIDE** adalah kerangka kategorisasi ancaman yang membantu tim secara sistematis mengenali enam jenis ancaman. Akronimnya menurut slide: **Spoofing** (menyamar sebagai pengguna atau sistem lain), **Tampering** (memodifikasi data atau kode), **Repudiation** (menyangkal tindakan atau transaksi), **Information Disclosure** (membocorkan data sensitif), **Denial of Service / DoS** (mengganggu ketersediaan sistem), dan **Elevation of Privilege** (memperoleh akses tidak sah ke hak istimewa yang lebih tinggi).
> >
> > Keindahan STRIDE adalah pemetaannya yang bersih ke properti keamanan yang dilanggar. **Spoofing** melanggar **otentikasi**; **Tampering** melanggar **integritas**; **Repudiation** melanggar **non-repudiation**; **Information Disclosure** melanggar **kerahasiaan**; **DoS** melanggar **ketersediaan**; dan **Elevation of Privilege** melanggar **otorisasi**. Dengan menelusuri setiap komponen sistem melawan keenam kategori ini, tim mendapat _checklist_ yang memastikan tidak ada jenis ancaman yang terlewat.
> >
> >
> > ```mermaid
> > flowchart TD
> >     STRIDE["STRIDE"] --> S["Spoofing<br/>melanggar Otentikasi"]
> >     STRIDE --> T["Tampering<br/>melanggar Integritas"]
> >     STRIDE --> R["Repudiation<br/>melanggar Non-repudiation"]
> >     STRIDE --> I["Information Disclosure<br/>melanggar Kerahasiaan"]
> >     STRIDE --> D["Denial of Service<br/>melanggar Ketersediaan"]
> >     STRIDE --> E["Elevation of Privilege<br/>melanggar Otorisasi"]
> > ```
> >
> >
> > Contoh konkret: pada sebuah API perbankan, ancaman **Spoofing** dapat berupa penyerang memakai token curian; **Tampering** berupa mengubah nominal transaksi saat transit; **Repudiation** berupa nasabah menyangkal melakukan transfer; **Information Disclosure** berupa kebocoran saldo rekening; **DoS** berupa membanjiri endpoint hingga layanan lumpuh; dan **Elevation of Privilege** berupa pengguna biasa memperoleh hak admin. Tiap kategori menuntun ke mitigasi spesifik (MFA, signing, audit log, enkripsi, rate limiting, kontrol akses ketat).
> >
> > ### Tujuh Secure Design Principles
> >
> > Slide menyajikan tujuh **secure design principles** yang memandu pengembangan perangkat lunak yang kokoh dan aman. **Least Privilege**: berikan hanya akses minimum yang diperlukan. **Fail-Safe Defaults**: secara default berada pada keadaan aman ketika terjadi kesalahan. **Separation of Duties**: bagi tanggung jawab untuk mengurangi ancaman orang dalam (_insider threat_). **Defense in Depth**: gunakan beberapa lapisan keamanan untuk melindungi terhadap ancaman.
> >
> > **Economy of Mechanism**: jaga desain tetap sederhana untuk mengurangi kesalahan. **Complete Mediation**: pastikan setiap permintaan akses diperiksa otorisasinya. **Open Design**: andalkan kekuatan desain, bukan kerahasiaannya (lawan dari _security through obscurity_). Ketujuh prinsip ini, yang sebagian berakar pada karya klasik Saltzer & Schroeder, berfungsi sebagai pagar pengaman saat membuat keputusan arsitektur.
> >
> > Slide menegaskan **fondasi secure design**: prinsip-prinsip ini bertujuan **mengurangi attack surface (reduce the attack surface)**, **meminimalkan dampak kerentanan (minimize the impact of vulnerabilities)**, dan **memastikan perangkat lunak tahan terhadap serangan (ensure software is resilient to attacks)**. Artinya, bahkan ketika satu kontrol gagal, prinsip-prinsip ini memastikan kegagalan itu terbatas, tidak meluas menjadi kompromi total.
> >
> > ### Secure Design Principles dalam Praktik
> >
> > Slide memberi contoh konkret penerapan tiap prinsip. **Least Privilege**: akun pengguna basis data hanya memiliki akses _read_, bukan _write_—membatasi kerusakan bila akun itu dikompromikan. **Fail-Safe Defaults**: sistem menolak akses secara default kecuali secara eksplisit diizinkan—sehingga kesalahan konfigurasi cenderung gagal ke keadaan aman, bukan terbuka.
> >
> > **Separation of Duties**: pengembang tidak dapat men-deploy kode langsung ke produksi; sebuah tim terpisah menangani deployment—mencegah satu orang menyelundupkan kode jahat tanpa pengawasan. **Defense in Depth**: sebuah aplikasi web memakai **HTTPS**, **Web Application Firewall (WAF)**, dan **validasi input** sekaligus—sehingga jika satu lapisan ditembus, lapisan lain masih melindungi. **Economy of Mechanism**: mekanisme otentikasi yang sederhana mengurangi risiko kesalahan implementasi—kompleksitas adalah musuh keamanan.
> >
> > **Complete Mediation**: setiap permintaan API diperiksa otentikasi dan otorisasinya—tidak ada permintaan yang lolos tanpa pemeriksaan, mencegah celah di mana akses awal "dipercaya" untuk seterusnya. **Open Design**: algoritma kriptografi bersifat terbuka dan ditelaah sejawat (_peer-reviewed_), bukan mengandalkan kerahasiaan—karena keamanan yang bergantung pada "musuh tidak tahu cara kerjanya" runtuh begitu rahasia itu bocor. Contoh-contoh ini menunjukkan bahwa prinsip abstrak menjadi keputusan teknis nyata yang, bersama threat modeling dan STRIDE, membentuk fondasi fase Design dalam Secure SDLC.

> [!cornell] #### Summary
>
> **Threat Modeling** pada fase Design secara proaktif **mengidentifikasi, menganalisis, dan memitigasi** ancaman melalui empat langkah: identifikasi **aset**, **ancaman**, **kerentanan**, lalu **mitigasi**. Kerangka **STRIDE** menyediakan taksonomi enam ancaman—**Spoofing** (otentikasi), **Tampering** (integritas), **Repudiation** (non-repudiation), **Information Disclosure** (kerahasiaan), **Denial of Service** (ketersediaan), dan **Elevation of Privilege** (otorisasi)—sehingga tidak ada kategori yang terlewat. Tujuh **Secure Design Principles**—**Least Privilege**, **Fail-Safe Defaults**, **Separation of Duties**, **Defense in Depth**, **Economy of Mechanism**, **Complete Mediation**, dan **Open Design**—memandu arsitektur untuk **mengurangi attack surface**, **meminimalkan dampak kerentanan**, dan menjadikan sistem **tahan serangan**, dengan contoh praktik konkret seperti akun DB read-only, deny-by-default, pemisahan deployment, serta HTTPS+WAF+validasi input.

> [!ad-libitum]- Additional Information
>
> #### DREAD, PASTA, dan Attack Trees (DI LUAR sumber)
>
> Selain STRIDE (untuk _mengkategorikan_ ancaman), ada kerangka pelengkap. **DREAD** memberi cara _menilai_ peringkat ancaman: Damage, Reproducibility, Exploitability, Affected users, Discoverability. **PASTA (Process for Attack Simulation and Threat Analysis)** adalah metodologi tujuh tahap berbasis risiko bisnis. **Attack Trees** (Bruce Schneier) memodelkan tujuan penyerang sebagai akar pohon dengan cabang-cabang cara mencapainya. **MITRE ATT&CK** menyediakan basis pengetahuan TTP nyata yang dapat memperkaya identifikasi ancaman dengan teknik dunia nyata.
>
> #### Tools Threat Modeling (DI LUAR sumber)
>
> **Microsoft Threat Modeling Tool** memungkinkan menggambar _Data Flow Diagram_ dan otomatis menghasilkan ancaman STRIDE per elemen. **OWASP Threat Dragon** adalah alternatif open-source dengan kemampuan serupa. **pytm** memungkinkan threat modeling sebagai kode (_threat-model-as-code_) sehingga model dapat diversionkan bersama kode. **IriusRisk** menawarkan otomasi tingkat enterprise yang mengaitkan ancaman dengan kontrol dan requirement.
>
> #### Saltzer & Schroeder: Akar Akademis (DI LUAR sumber)
>
> Tujuh prinsip pada slide berakar pada makalah klasik **Saltzer & Schroeder (1975), "The Protection of Information in Computer Systems"**, yang sebenarnya memuat delapan prinsip—termasuk **Psychological Acceptability** (mekanisme keamanan harus mudah dipakai agar tidak diakali pengguna) dan **Least Common Mechanism** (minimalkan mekanisme bersama antar pengguna). Memahami akar ini membantu melihat bahwa prinsip desain aman bukan tren, melainkan kebijaksanaan yang teruji selama lima dekade.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. **Threat Model Lengkap dengan STRIDE** — Pilih sebuah aplikasi (misalnya aplikasi chat sederhana), gambar Data Flow Diagram-nya, lalu terapkan STRIDE pada setiap elemen dan trust boundary. Hasilkan daftar ancaman beserta mitigasinya.
> 2. **Audit Prinsip Desain** — Ambil kode sebuah proyek dan periksa pelanggaran terhadap tujuh prinsip (misalnya akun dengan hak berlebih, default yang terbuka, endpoint tanpa complete mediation). Usulkan perbaikan untuk tiap pelanggaran.
> 3. **Bandingkan STRIDE vs Attack Tree** — Untuk satu skenario serangan (misalnya pengambilalihan akun), modelkan dengan STRIDE dan dengan attack tree. Bandingkan kelengkapan dan kegunaan tiap pendekatan.
>
> #### Bacaan Lanjutan
>
> - *"Threat Modeling: Designing for Security"* — Adam Shostack, Wiley, 2014.
> - *"The Protection of Information in Computer Systems"* — Saltzer & Schroeder, Proceedings of the IEEE, 1975.
> - *"OWASP Threat Modeling Cheat Sheet"* — https://cheatsheetseries.owasp.org.
> - *"Securing Systems: Applied Security Architecture and Threat Models"* — Brook Schoenfield, CRC Press, 2015.
> - *"MITRE ATT&CK Framework"* — https://attack.mitre.org.
