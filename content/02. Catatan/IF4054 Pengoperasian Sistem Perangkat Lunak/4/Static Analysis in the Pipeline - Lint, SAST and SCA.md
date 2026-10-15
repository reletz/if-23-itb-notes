---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Static Analysis in the Pipeline - Lint, SAST and SCA
>
> > ## Questions/Cues
> >
> > - Bagaimana urutan stage pipeline build-time?
> > - Apa peran linting?
> > - Apa yang ditangkap SAST dan bagaimana contohnya?
> > - Apa itu SCA dan mengapa penting?
> > - Apa pelajaran dari kasus CVE ala Log4Shell?
> >
> > ## Reference Points
> >
> > - IF4054 CI Automation & Shift-Left (Slides 22-27)
>
> > ### Anatomi Pipeline Build-Time
> >
> > ```mermaid
> > flowchart TD
> >     L["Lint<br/>detik"] --> U["Unit test<br/>logika"] --> S["SAST<br/>pola kode tak aman"]
> >     S --> B["Build<br/>compile + containerize"] --> SC["SCA scan<br/>dependency rentan"]
> >     SC --> I["Image scan<br/>Trivy"] --> P["Publish<br/>push ke registry"]
> > ```
> >
> > ### Linting
> >
> > Menegakkan **format, penamaan, dan pola idiomatik** secara otomatis, mengakhiri debat gaya di code review. Juga menangkap bug nyata: variabel tak terpakai, kode tak terjangkau, pola null-dereference. Dijalankan **pertama** karena paling cepat, dan dapat ditegakkan lokal lewat **pre-commit hook**.
> >
> > ### SAST (Static Application Security Testing)
> >
> > | Kelas temuan | Contoh |
> > |---|---|
> > | **Injection flaws** | SQL/command injection: input tak disanitasi masuk ke query atau shell |
> > | **Hardcoded secrets** | API key, password, token di source code |
> > | **Insecure deserialization** | Deserialisasi data tak tepercaya yang berujung RCE |
> > | **Broken access logic** | Authorization check hilang, insecure direct object reference |
> >
> > Contoh pada slide: menyambung string ke query SQL (`"... WHERE email = '" + email + "'"`) ditandai SonarQube; perbaikannya **parameterized query** (`WHERE email = %s` dengan parameter terpisah), yang menutup seluruh kelas kerentanan. Scan berjalan di setiap commit, menggagalkan build, dan berkomentar langsung di PR.
> >
> > ### SCA (Software Composition Analysis)
> >
> > SCA menginventarisasi **seluruh library pihak ketiga**, langsung maupun transitif, lalu mencocokkan versinya dengan database kerentanan publik (mis. NVD). Aplikasi modern sering **80-90% kode pihak ketiga**, sehingga kode Anda hanya sebagian kecil dari attack surface. Temuan diberi skor severity (Critical/High/Medium/Low) agar gate bisa difokuskan pada Critical/High.
> >
> > ### Studi Kasus: CVE ala Log4Shell
> >
> > 1. Library logging diam-diam mendukung **remote lookup** di dalam pesan log.
> > 2. Penyerang mengirim satu string rekayasa yang dilog sehingga memicu **remote code execution**.
> > 3. **SCA menandai versi rentan saat build**, sehingga diperbaiki sebelum mencapai layanan yang berjalan.

> [!cornell] #### Summary
>
> Pipeline build-time berurutan **Lint → Unit Test → SAST → Build → SCA → Image Scan → Publish**. **Lint** menegakkan gaya dan menangkap bug dangkal; **SAST** menangkap injection, hardcoded secret, insecure deserialization, dan broken access logic (mis. SQL injection diperbaiki dengan parameterized query); **SCA** mengecek seluruh dependency langsung dan transitif terhadap database CVE dengan gate pada severity. Kasus Log4Shell menunjukkan SCA di build-time menangkap kerentanan sebelum sampai produksi.

> [!ad-libitum]- Additional Information
>
> #### SBOM
>
> **Software Bill of Materials** (format SPDX atau CycloneDX) adalah inventaris komponen yang dihasilkan SCA. Setelah insiden Log4Shell, SBOM menjadi persyaratan banyak regulasi dan prosedur pengadaan.
>
> #### Proyek Eksplorasi Mandiri
> 1. Jalankan `pip-audit` atau `npm audit` pada proyek Anda, lalu tulis kebijakan gate (severity apa yang memblokir build).
>
> #### Bacaan Lanjutan
> - OWASP — *Top 10* dan *Dependency-Check*.
> - NVD — National Vulnerability Database.
