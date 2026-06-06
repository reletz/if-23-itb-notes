---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Tools Static Analysis
>
> > ## Questions/Cues
> >
> > - Bagaimana arsitektur (pipeline) khas sebuah static analysis tool?
> > - Apa perbedaan FindBugs dan PMD, dan kapan masing-masing dipakai?
> > - Apa itu text scanner (Flawfinder/RATS/ITS4) dan keterbatasannya?
> > - Apa contoh defect finder proprietary vs open source, dan apa keunggulan RIPS?
> > - Tool apa yang tersedia per bahasa (PHP, JavaScript, multi-language) dan opsi open source apa yang ada?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W06 Static Analysis — bagian "Typical static analysis tool")
> > - IF4053 Keamanan Perangkat Lunak (W06 Static Analysis — bagian "FindBugs, PMD, text scanners, defect finders, RIPS")
> > - IF4053 Keamanan Perangkat Lunak (W07 Static Analysis & Secure SDLC — bagian "Choose the Right Tool & Open Source Options")
>
> > ### Arsitektur Pipeline Static Analysis Tool
> >
> > Sebuah static analysis tool tipikal bekerja sebagai **pipeline** bertahap. Inputnya dapat berupa **source code**, **bytecode**, atau **executable** (kadang melalui build instrumentation). Tahap pertama adalah **Parser/Extractor** yang menerjemahkan kode menjadi **Intermediate Representation (IR)** — representasi internal yang lebih mudah dianalisis. IR ini bisa spesifik terhadap tool, terhadap compiler (LLVM, gcc), terhadap bahasa (ASIS milik Ada), atau berupa standar (KDM). IR kemudian disimpan dalam **Database** dan diproses oleh satu atau lebih **Analyzer**.
> >
> > Analyzer dipandu oleh beberapa jenis aturan: **modeling rules** (versi compiler, environment, apa yang dipercaya), **user rules** (aturan kustom proyek), **built-in query rules**, dan **library/framework config**. Hasil analisis dijalankan sebagai **queries** terhadap database, lalu disajikan melalui **Results Viewer**. Memahami pipeline ini menjelaskan mengapa tool yang membangun IR kaya (data/control flow) lebih akurat daripada text scanner sederhana yang melompati tahap IR.
> >
> > ```mermaid
> > flowchart LR
> >     SRC["Source / Bytecode / Executable"] --> P["Parser / Extractor"]
> >     RULES["Modeling rules &amp; library config"] --> P
> >     P --> IR["Intermediate Representation (IR)"]
> >     IR --> DB["Database"]
> >     UR["User rules &amp; built-in query rules"] --> AN["Analyzer (queries)"]
> >     DB --> AN
> >     AN --> RV["Results Viewer"]
> > ```
> >
> > ### Quality Scanner Java: FindBugs vs PMD
> >
> > **FindBugs** adalah program yang menggunakan static analysis untuk mencari bug pada kode **Java**, relatif mudah dipasang, dengan antarmuka yang dapat memfilter kategori bug, panel review bug yang mendeskripsikan bug beserta resolusinya, dan Bug Info Panel berisi stack trace. **PMD** adalah static analysis tool untuk **source code Java** yang mengidentifikasi kemungkinan bug, dead code, kode suboptimal, **cyclomatic complexity** tinggi, dan kode duplikat; ia punya rule-set yang dapat diperluas, vulnerability view, serta **Copy-Paste Detector (CPD)** untuk menemukan kode hasil copy-paste, dan tersedia GDS PMD Secure Coding Ruleset.
> >
> > Perbandingannya: keduanya fokus pada isu **"quality"** (bukan keamanan), open source gratis, dan beroperasi pada Java. **PMD** bekerja pada **source code** Java — contoh temuan: pelanggaran konvensi penamaan, ketiadaan kurung kurawal, null check salah tempat, konstruktor tak perlu, missing break pada switch — dan menyediakan cyclomatic complexity. **FindBugs** bekerja pada **bytecode JVM** — contoh temuan: method `equals()` gagal pada subtype, clone mengembalikan null, perbandingan referensi nilai Boolean, impossible cast, int 32-bit di-shift di luar rentang 0-31, koleksi yang memuat dirinya sendiri. **Keduanya tidak bagus menemukan isu keamanan** karena memang bukan tujuannya; untuk itu ada plugin **"FindSecurityBugs"** pada FindBugs.
> >
> > ### Text Scanners dan Security Defect Finders
> >
> > **Security defect text scanners** memindai source code memakai lexer sederhana mirip grep, biasanya "tahu" tentang komentar dan string, lalu mencari pemanggilan fungsi yang cenderung bermasalah. Contohnya **Flawfinder**, **RATS**, dan **ITS4** (Flawfinder ditulis David A. Wheeler). **Pro**: cepat dan murah, serta dapat memproses kode parsial (termasuk yang tidak bisa dikompilasi). **Kontra**: minim konteks sehingga **FN dan FP rate besar**, dan terutama berguna untuk memperingatkan fungsi "berbahaya" saja.
> >
> > **Security defect finders** yang lebih canggih membaca perangkat lunak dan membangun **model internal**, lalu mencari pola yang cenderung menghasilkan security defect (kadang sulit dibedakan dari quality scanner, bergantung ruleset). Contoh **proprietary**: HP/Fortify dan Coverity. Contoh **OSS**: **splint** (untuk C), **LAPSE+** (untuk Java), **Cppcheck** (C++, juga C, fokus low false positive), dan **clang static analyzer** (C, C++, Objective-C) yang tidak eksplisit fokus keamanan tetapi punya analisis inter-procedural (dalam satu translation unit) untuk buffer overflow & alokasi. Khusus PHP, **RIPS** ditulis dalam PHP untuk menemukan kerentanan PHP, membangun program model dari source, mendeteksi fungsi rentan (sink) yang bisa dimanfaatkan input pengguna, menyediakan audit framework gaya IDE, dan mengklaim mendeteksi XSS, SQL Injection, LFI/RFI, dan RCE.
> >
> > ### Tools per Bahasa dan Opsi Open Source
> >
> > W07 menambahkan rekomendasi tool berdasarkan bahasa untuk memilih yang tepat. Untuk **PHP**: PHPStan, Psalm, Phan. Untuk **JavaScript**: ESLint, SonarQube, Retire.js. Untuk **multi-language**: **SonarQube** dan **Semgrep**. Untuk dependency scanning otomatis disarankan Dependabot atau Snyk. SonarLint dan ESLint cocok untuk pemakaian lokal (real-time, shift-left). Daftar tool lengkap dapat dirujuk dari OWASP, Wikipedia "List of tools for static code analysis", dan NIST.
> >
> > Tabel **Open Source Options** dari W07 merangkum beberapa pilihan beserta lisensi, tipe, bahasa, dan fitur:
> >
> > | Product | License | Type | Bahasa | Fitur |
> > |---|---|---|---|---|
> > | LAPSE+ | GNU GPL | Eclipse Plugin | Java | Variable Traceback, baik untuk analisis injection &amp; XSS |
> > | FindBugs 2.0 | GNU LGPL | Eclipse Plugin | Java | Bug umum, antarmuka bagus, deteksi security masih under-developed |
> > | Orizon | GNU GPL | Standalone Text | Java | Report-based, under-developed, UI kurang, sebagian deteksi security |
> > | SWAAT | Custom | Standalone HTML Report | Java, PHP, C, JSP | Deteksi report-based, tidak selalu fokus security |
> > | PMD | BSD | Eclipse Plugin | Java, C#, JavaScript, XML, XSL | Quality generik, UI bagus, extensible ke ruleset security |
> > | FxCop | MS-PL | VS Plugin | .NET | Security-specific, UI dalam Visual Studio |
> > | RIPS | GPL | Standalone | PHP | UI profesional, analisis security-specific |
> > | FlawFinder | GPL | Standalone Text | C++ | Security-specific: injection, overflow, fungsi berbahaya |
> > | PreFast | MS-PL | VS Plugin | C++ | Static analysis umum, UI dalam Visual Studio |
> > | BrakeMan | MIT | Standalone Text | Ruby | Security-specific, komunitas kuat |
> >
> > Daftar tool lebih luas (Source/Byte/Binary code scanner) dapat ditelusuri lewat NIST SAMATE Tool Survey, OWASP Static Code Analysis, dan halaman Flawfinder.

> [!cornell] #### Summary
>
> Static analysis tool tipikal berbentuk **pipeline**: input (source/bytecode/executable) → **Parser/Extractor** → **Intermediate Representation (IR)** → **Database** → **Analyzer** (dipandu modeling/user/built-in rules) → **Results Viewer**. Untuk Java ada quality scanner **PMD** (bekerja pada source, mendeteksi style, dead code, cyclomatic complexity, CPD) dan **FindBugs** (bekerja pada bytecode); keduanya bukan untuk keamanan, dilengkapi plugin FindSecurityBugs. **Text scanner** (Flawfinder, RATS, ITS4) cepat tetapi FP/FN tinggi, sedangkan **defect finder** lebih dalam mencakup proprietary (Fortify, Coverity) dan OSS (splint, cppcheck, clang, LAPSE+), serta **RIPS** untuk PHP. W07 menambah pilihan per bahasa (PHPStan/Psalm, ESLint/SonarQube, Semgrep) dan tabel **Open Source Options** (LAPSE+, FindBugs, RIPS, FlawFinder, Brakeman, dll.).

> [!ad-libitum]- Additional Information
>
> #### SAST vs DAST vs IAST vs SCA — Memetakan Kategori Modern
> Istilah industri kontemporer menyusun ulang kategori slide: **SAST** (Static Application Security Testing) mencakup tool pada catatan ini; **DAST** (Dynamic) menguji aplikasi berjalan; **IAST** (Interactive) menggabungkan keduanya via instrumentasi runtime; dan **SCA** (Software Composition Analysis) adalah evolusi origin analysis untuk pustaka pihak ketiga (Dependabot, Snyk, OWASP Dependency-Check). Memahami pemetaan ini membantu membaca dokumentasi vendor modern yang jarang lagi memakai istilah "text scanner".
>
> #### Mengapa Semgrep Naik Daun
> Semgrep populer karena rule-nya ditulis dengan sintaks yang menyerupai kode target (pattern-based) sehingga jauh lebih mudah dibuat daripada query AST tradisional, mendukung banyak bahasa, dan cukup cepat untuk dijalankan pada pre-commit hook. Ini menjembatani celah antara text scanner (cepat tapi dangkal) dan defect finder berat (akurat tapi lambat), menjadikannya favorit untuk aturan keamanan kustom di pipeline CI/CD.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bandingkan tiga tool PHP (PHPStan, Psalm, RIPS) pada aplikasi rentan yang sama; catat perbedaan jumlah temuan, FP, dan waktu eksekusi, lalu petakan hasilnya ke arsitektur pipeline (mana yang berbasis IR vs grep).
> 2. Tulis satu rule Semgrep dan satu rule PMD kustom untuk pola insecure yang sama (mis. penggunaan `Runtime.exec` dengan input pengguna), lalu evaluasi mana yang lebih mudah ditulis dan lebih presisi.
>
> #### Bacaan Lanjutan
> - OWASP Source Code Analysis Tools: https://owasp.org/www-community/Source_Code_Analysis_Tools
> - NIST SAMATE Tool Survey (Source/Byte/Binary Code scanners): http://samate.nist.gov/index.php/Tool_Survey.html
> - Flawfinder oleh David A. Wheeler: http://www.dwheeler.com/flawfinder
