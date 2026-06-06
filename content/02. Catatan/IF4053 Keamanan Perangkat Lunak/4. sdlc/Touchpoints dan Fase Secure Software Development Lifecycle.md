---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Touchpoints dan Fase Secure Software Development Lifecycle
>
> > ## Questions/Cues
> >
> > - Apa enam fase Secure SDLC dan aktivitas keamanan apa yang melekat di tiap fase?
> > - Apa yang dimaksud "Touchpoints for Software Security" oleh Gary McGraw?
> > - Mengapa setiap fase butuh aktivitas keamanan yang berbeda?
> > - Bagaimana static analysis berbeda dari dynamic analysis dalam lifecycle?
> > - Bagaimana fase deployment dan maintenance menjaga keamanan setelah rilis?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Secure Software Engineering Development Life Cycle")
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Touchpoints for Software Security")
> > - IF4053 Keamanan Perangkat Lunak (W05 Secure SDLC — bagian "Benefits")
>
> > ### Gambaran Umum Enam Fase Secure SDLC
> >
> > **Secure Software Development Lifecycle (Secure SDLC)** memetakan keamanan ke dalam enam fase pengembangan: **Requirement**, **Design**, **Construct**, **Testing**, **Deployment**, dan **Maintenance**. Gagasan kuncinya adalah bahwa setiap fase memiliki **aktivitas keamanan spesifik** yang melekat padanya—bukan satu pemeriksaan keamanan tunggal di akhir. Dengan demikian, keamanan menjadi benang merah yang menyertai seluruh siklus, bukan gerbang terpisah.
> >
> > Pemetaan ini mengikuti diagram yang dirujuk dari **snyk.io** dalam slide. Pada **Requirement** dilakukan **Risk Assessment**, perumusan **Security Requirement**, dan pemeriksaan **Compliance**. Pada **Design** dilakukan **Threat Modeling** dan penerapan **Secure Design Principle**. Pada **Construct** (implementasi) dilakukan **Static Analysis**, **Dynamic Analysis**, **Code Review**, dan **Secure Configuration**. Pada **Testing** dilakukan **Security Testing**. Pada **Deployment** dilakukan **Security Assessment**. Pada **Maintenance** dilakukan **Monitor** dan **Patch**.
> >
> > Logika di balik distribusi ini adalah bahwa keputusan keamanan paling efektif diambil pada fase di mana informasi yang relevan tersedia dan biaya perubahan paling murah. Risiko paling baik dipetakan saat kebutuhan masih dirumuskan; cacat arsitektural paling murah diperbaiki saat masih berupa diagram; sementara cacat implementasi terdeteksi paling cepat oleh alat analisis kode saat kode sedang ditulis.
> >
> > ### Aktivitas Keamanan per Fase
> >
> > Pada fase **Requirement**, **Risk Assessment** mengidentifikasi aset, ancaman, dan kerentanan untuk menentukan apa yang perlu dilindungi. Dari sini lahir **Security Requirement**—spesifikasi konkret seperti enkripsi dan kontrol akses—serta pemeriksaan **Compliance** terhadap standar hukum dan regulasi (misalnya GDPR, PCI-DSS) sehingga kepatuhan tidak menjadi kejutan di akhir.
> >
> > Pada fase **Design**, **Threat Modeling** secara sistematis memetakan bagaimana sistem dapat diserang sebelum sebaris kode pun ditulis, sering memakai kerangka seperti STRIDE. Hasilnya memandu penerapan **Secure Design Principle** seperti _least privilege_ dan _fail-safe defaults_, sehingga arsitektur itu sendiri meminimalkan _attack surface_.
> >
> > Pada fase **Construct**, keamanan masuk ke level kode. **Static Analysis (SAST)** memeriksa kode sumber tanpa menjalankannya untuk menemukan pola berbahaya; **Dynamic Analysis (DAST)** menguji aplikasi yang sedang berjalan; **Code Review** menambahkan penelaahan manusia; dan **Secure Configuration** memastikan pengaturan default yang aman. Pada fase **Testing**, **Security Testing** memvalidasi bahwa _security requirement_ benar-benar terpenuhi melalui SAST, DAST, hingga penetration testing. Pada **Deployment**, **Security Assessment** memverifikasi konfigurasi produksi (firewall, secure defaults). Akhirnya, pada **Maintenance**, **Monitor** mengawasi ancaman baru di produksi dan **Patch** memperbaiki kerentanan serta merespons insiden.
> >
> >
> > ```mermaid
> > flowchart LR
> >     A["Requirement<br/>Risk Assessment<br/>Security Requirement<br/>Compliance"] --> B["Design<br/>Threat Modeling<br/>Secure Design Principle"]
> >     B --> C["Construct<br/>Static &amp; Dynamic Analysis<br/>Code Review<br/>Secure Configuration"]
> >     C --> D["Testing<br/>Security Testing"]
> >     D --> E["Deployment<br/>Security Assessment"]
> >     E --> F["Maintenance<br/>Monitor<br/>Patch"]
> >     F -.-> A
> > ```
> >
> >
> > ### Touchpoints for Software Security (Gary McGraw)
> >
> > Slide merujuk pada **"Touchpoints for Software Security"** dari buku **_Software Security: Building Security In_ oleh Gary McGraw**. Konsep _touchpoints_ adalah titik-titik sentuh keamanan—praktik konkret yang ditanamkan pada artefak pengembangan yang sudah ada (requirement, desain, kode, hasil tes) alih-alih menambahkan proses terpisah. Filosofinya: keamanan paling efektif bila menyatu dengan pekerjaan yang sudah dilakukan tim, bukan menjadi beban administratif tambahan.
> >
> > Versi yang dipaparkan slide memetakan touchpoint ke fase pengembangan. Pada **Requirements Gathering**, touchpoint-nya adalah mengidentifikasi _security requirement_ (misalnya enkripsi, kontrol akses) dan memastikan kepatuhan terhadap standar hukum serta regulasi. Pada **Design**, touchpoint-nya adalah menerapkan _secure design principle_ (least privilege, fail-safe defaults) dan melakukan _threat modeling_ untuk mengidentifikasi risiko potensial.
> >
> > Pada **Implementation**, touchpoint-nya adalah menulis kode aman dengan praktik terbaik (validasi input, manajemen memori yang aman) dan menggunakan _static analysis tools_ untuk mendeteksi kerentanan. Pada **Testing**, dilakukan _security testing_ (SAST, DAST, penetration testing) serta validasi bahwa _security requirement_ terpenuhi. Pada **Deployment**, dipastikan konfigurasi aman (firewall, secure defaults) dan dilakukan monitoring kerentanan di produksi. Pada **Maintenance**, perangkat lunak di-_patch_ dan diperbarui secara berkala, sambil memantau ancaman baru dan merespons insiden.
> >
> > Kontribusi terpenting McGraw adalah menggeser wacana dari "keamanan aplikasi" (menguji aplikasi jadi dari luar) ke "**software security**" (membangun keamanan ke dalam selama proses rekayasa). Touchpoints menjadi jembatan praktis yang menerjemahkan prinsip abstrak menjadi tindakan nyata di setiap artefak.
> >
> > ### Benefits dan Sinergi Antarfase
> >
> > Slide menutup dengan **Benefits** dari pendekatan ini: **mengurangi kerentanan**, **memastikan kepatuhan regulasi** (misalnya GDPR, PCI-DSS), serta **membangun kepercayaan pengguna** dan melindungi data sensitif. Manfaat ini bersifat kumulatif—tiap fase menutup celah yang berbeda, sehingga celah yang lolos dari satu fase masih punya peluang tertangkap di fase berikutnya, mewujudkan _defense in depth_ pada level proses.
> >
> > Sinergi antarfase tampak jelas. Hasil **Risk Assessment** di Requirement menjadi input bagi **Threat Modeling** di Design; threat model itu memandu fokus **Static Analysis** dan **Code Review** di Construct; temuan dari analisis kode mengarahkan prioritas **Security Testing**; dan kerentanan yang tetap lolos akan diawasi oleh **Monitor** serta diperbaiki oleh **Patch** di Maintenance. Tidak ada fase yang berdiri sendiri.
> >
> > Penting dicatat bahwa panah dari Maintenance kembali ke Requirement bukan sekadar formalitas. Insiden produksi, ancaman baru, dan hasil monitoring menjadi umpan balik yang memperkaya _risk assessment_ siklus berikutnya. Dengan demikian Secure SDLC adalah **lingkaran (loop)**, bukan garis lurus—keamanan adalah proses berkelanjutan yang terus beradaptasi terhadap lanskap ancaman yang berubah.

> [!cornell] #### Summary
>
> **Secure SDLC** menanamkan aktivitas keamanan ke enam fase: **Requirement** (risk assessment, security requirement, compliance), **Design** (threat modeling, secure design principle), **Construct** (static & dynamic analysis, code review, secure configuration), **Testing** (security testing), **Deployment** (security assessment), dan **Maintenance** (monitor, patch). Konsep **Touchpoints for Software Security** dari **Gary McGraw** menjadikan keamanan sebagai titik sentuh yang menyatu dengan artefak pengembangan yang sudah ada, menggeser fokus dari "keamanan aplikasi" ke "**software security**" yang dibangun ke dalam. Setiap fase menutup jenis celah yang berbeda dan saling memberi input, sementara umpan balik dari Maintenance kembali ke Requirement menjadikan lifecycle sebagai **loop berkelanjutan**. Manfaatnya: **mengurangi kerentanan**, **kepatuhan GDPR/PCI-DSS**, dan **kepercayaan pengguna**.

> [!ad-libitum]- Additional Information
>
> #### Tujuh Touchpoints Asli McGraw (DI LUAR sumber)
>
> Versi kanonik dalam buku McGraw sebenarnya menyebut **tujuh touchpoints**, diurutkan berdasarkan efektivitas: (1) **Code Review** dengan static analysis tools, (2) **Architectural Risk Analysis**, (3) **Penetration Testing**, (4) **Risk-Based Security Testing**, (5) **Abuse Cases**, (6) **Security Requirements**, dan (7) **Security Operations**. _Abuse cases_ menarik karena merupakan kebalikan _use cases_—mendeskripsikan bagaimana sistem dapat disalahgunakan, memaksa tim berpikir adversarial sejak fase requirement. Urutan McGraw mencerminkan _return on investment_: code review dan architectural risk analysis memberi dampak terbesar per unit usaha.
>
> #### SAST vs DAST vs IAST vs SCA (DI LUAR sumber)
>
> Pada fase Construct dan Testing, ada spektrum teknik: **SAST** (Static Application Security Testing) menganalisis kode sumber/bytecode tanpa eksekusi—cepat dan _shift-left_, tetapi rawan _false positive_. **DAST** (Dynamic) menyerang aplikasi berjalan dari luar—menemukan masalah runtime/konfigurasi tetapi butuh aplikasi yang sudah dideploy. **IAST** (Interactive) menggabungkan keduanya dengan instrumentasi agen di dalam aplikasi saat tes berjalan. **SCA** (Software Composition Analysis) memindai dependensi pihak ketiga untuk CVE yang diketahui—krusial mengingat sebagian besar kode modern adalah pustaka open-source.
>
> #### Studi Kasus: Microsoft SDL sebagai Touchpoint Operasional (DI LUAR sumber)
>
> **Microsoft SDL** menerjemahkan touchpoints menjadi gerbang wajib: setiap rilis harus melewati _threat modeling_ pada design, _static analysis_ pada implementation, _fuzzing_ pada verification, dan _Final Security Review (FSR)_ sebelum rilis. Setelah mengadopsi SDL, Microsoft melaporkan penurunan signifikan kerentanan pada produk seperti SQL Server dan Windows Vista dibanding versi sebelumnya—bukti empiris bahwa menanam touchpoint di tiap fase menekan kerentanan produksi.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. **Peta Touchpoint pada Proyek Nyata** — Ambil sebuah proyek perangkat lunak (tugas besar atau open-source), lalu petakan setiap aktivitas yang sudah dilakukan tim ke enam fase Secure SDLC. Identifikasi fase mana yang "kosong" dari aktivitas keamanan dan usulkan touchpoint untuk mengisinya.
> 2. **Bandingkan SAST dan DAST** — Pilih satu aplikasi web rentan yang legal untuk diuji (misalnya OWASP Juice Shop), jalankan SAST (Semgrep) dan DAST (OWASP ZAP), lalu bandingkan jenis kerentanan yang masing-masing temukan. Catat overlap dan blind spot tiap teknik.
> 3. **Rancang Abuse Cases** — Untuk satu fitur (misalnya reset password), tulis tiga _use case_ normal dan tiga _abuse case_ yang sesuai. Turunkan _security requirement_ dari abuse case tersebut.
>
> #### Bacaan Lanjutan
>
> - *"Software Security: Building Security In"* — Gary McGraw, Addison-Wesley, 2006.
> - *"The Security Development Lifecycle"* — Michael Howard & Steve Lipner, Microsoft Press, 2006.
> - *"OWASP Application Security Verification Standard (ASVS)"* — tersedia di https://owasp.org/asvs.
> - *"Snyk: Secure SDLC"* — https://snyk.io/learn/secure-sdlc/.
> - *"NIST SP 800-218 SSDF"* — National Institute of Standards and Technology, 2022.
