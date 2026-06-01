---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Software Measurement Tools
>
> > ## Questions/Cues
> >
> > - Tool apa saja yang dipakai untuk mengukur metrik software?
> > - Metrik apa yang didukung MetricsReloaded?
> > - Apa yang ditampilkan PHPMetrics dan SonarQube?
> > - Apa itu quality gate pada SonarQube?
> > - Apa yang diukur JHawk dan Radon?
> >
> > ## Reference Points
> >
> > - Software Quality and Metrics (Halaman 58-60)
> > - Software Quality and Metrics (Halaman 61-71)
>
> > ### MetricsReloaded
> >
> > Plugin **IntelliJ IDE** (supported language: Java). Mengukur source code metrics otomatis untuk IntelliJ IDEA dan IntelliJ Platform IDE. Metrik LOC & file-count tersedia untuk semua bahasa yang didukung IDE, dan banyak metrik lain untuk Java. Dapat dijalankan via *Help | Find Action → Calculate Metrics*, atau dari command line untuk integrasi ke build server (`idea metrics`).
> >
> > **Supported Metrics/Measurement**: Chidamber-Kemerer, Class-count, Complexity, Dependency, LOC, Martin Packaging.
> >
> > - **Sample Results (CK Metrics)**: kolom **CBO, DIT, LCOM, NOC, RFC, WMC** per class — mis. average CBO 4.69, DIT 4.06, LCOM 3.31, RFC 33.81, WMC 13.88 (total WMC 222).
> > - **Sample Results (Cyclomatic Complexity)** per method: **CogC** (Cognitive Complexity), **ev(G)** (Essential Cyclomatic Complexity), **iv(G)** (Design Complexity), **v(G)** (Cyclomatic Complexity).
> >
> > ### PHPMetrics
> >
> > Static analyzer untuk **PHP**. Dashboard menampilkan: jumlah Violations, Lines of code, Classes, Average cyclomatic complexity by class, Average bugs by class, serta visualisasi **Maintainability/complexity** (tiap file = lingkaran; ukuran = cyclomatic complexity, warna = Maintainability Index) dan **ClassRank** (PageRank Google diterapkan ke relasi antar class).
> >
> > - **Sample Metrics**: Complexity & defect, Size & Volume (LLOC, CLOC, Volume, Intelligent content, Comment weight), Object Relation, Coupling (Afferent coupling, Efferent coupling, Instability, ClassRank).
> > - **Sample Static Analysis**: Violations, Information, Warnings, Errors — dengan Class Violations seperti *Too complex class code*, *Too complex method code*, *Probably bugged* (berbasis jumlah operator, operand, cyclomatic complexity, mengacu Halstead).
> >
> > ### SonarQube
> >
> > Platform untuk **continuous inspection** Code Quality.
> >
> > - Mendukung **27 bahasa**: Java (termasuk Android), C#, C/C++, JavaScript, TypeScript, Python, Go, Swift, COBOL, Apex, PHP, Kotlin, Ruby, Scala, HTML, CSS, ABAP, Flex, Objective-C, PL/I, PL/SQL, RPG, T-SQL, VB.NET, VB6, XML.
> > - **Open-source** dengan versi free dan enterprise; dapat diintegrasikan dengan IDE dan **CI/CD pipelines**.
> > - Melakukan **static analysis** (code smells, vulnerabilities, dll.) + **software metrics** (LOC, Cyclomatic Complexity, dll.).
> > - **Reliability Dashboard**: rating reliability, jumlah bugs, remediation effort.
> > - **Quality Gates**: kondisi pada *New Code* dan *Overall Code*. Contoh kondisi: Coverage < 80% (gagal), Duplicated Lines > 3%, Maintainability/Reliability/Security Rating worse than A, Security Hotspots Reviewed < 100%, Cognitive Complexity > 10, Cyclomatic Complexity > 15, Lines of Code > 100, Classes > 100. Status bisa **Failed** bila kondisi tidak terpenuhi.
> >
> > ### JHawk
> >
> > Tool metrik untuk **Java** (Virtual Machinery). Alur: pilih file Java (**Select Files → Analyse**), lihat **Results** berupa dashboard System Metric Gauges. Contoh: Average Cyclomatic Complexity SAFE 100%, Maximum Cyclomatic Complexity SAFE 47% / WARNING 23% / DANGER 30%, Cyclomatic Complexity SAFE 94% / WARNING 2% / DANGER 4% (19610 records all methods). **Preferences** memungkinkan atur warna level metrik: **Normal (hijau), Warning (oranye), Danger (merah)**.
> >
> > ### Radon
> >
> > Tool **Python** yang menghitung berbagai code metrics:
> >
> > - **Raw metrics**: SLOC, comment lines, blank lines, dll.
> > - **Cyclomatic Complexity** (McCabe's Complexity).
> > - **Halstead metrics** (semuanya).
> > - **Maintainability Index** (metrik gaya Visual Studio).
> > - Dapat dipakai dari command line atau secara programatik via API.
> >
> > **Sample Metrics**: *Size & comments* (LOC, LLOC, SLOC, Comments, Single comments, Multi, Blank) dan *Halstead* (h1, h2, N1, N2, vocabulary, length, calculated_length, volume, difficulty, effort, time, bugs).
> >
> > ### Ringkasan Perbandingan Tool
> >
> > | Tool | Bahasa | Sorotan |
> > |---|---|---|
> > | MetricsReloaded | Java (IntelliJ) | CK metrics, complexity, LOC, dependency |
> > | PHPMetrics | PHP | Maintainability/complexity viz, ClassRank, static analysis |
> > | SonarQube | 27 bahasa | Continuous inspection, quality gates, CI/CD |
> > | JHawk | Java | Dashboard gauges Safe/Warning/Danger |
> > | Radon | Python | Raw, Cyclomatic, Halstead, Maintainability Index |

> [!cornell] #### Summary
>
> Berbagai tool mengotomasi pengukuran metrik: **MetricsReloaded** (plugin IntelliJ, CK metrics & complexity untuk Java), **PHPMetrics** (analyzer PHP dengan visualisasi maintainability & ClassRank), **SonarQube** (continuous inspection 27 bahasa dengan **quality gates** terintegrasi CI/CD), **JHawk** (dashboard gauge Safe/Warning/Danger untuk Java), dan **Radon** (raw, cyclomatic, Halstead, Maintainability Index untuk Python). Tools ini mewujudkan prinsip *automatable & economical* dari [[Software Measurement Fundamentals]] dan menghitung metrik dari [[Size and Complexity Metrics]] serta [[Object-Oriented Metrics]].

> [!ad-libitum]- Additional Information
>
> #### Quality Gate sebagai Policy Enforcement
>
> Quality gate SonarQube adalah contoh konkret **policy enforcement** otomatis (lihat [[Principles and Coordination in Large-Scale Development]]): build ditolak bila kondisi kualitas (coverage, complexity, duplication) tidak terpenuhi — kebijakan ditegakkan mesin, bukan sekadar diaudit manual.
>
> #### Maintainability Index
>
> *Maintainability Index* menggabungkan Halstead Volume, Cyclomatic Complexity, dan LOC menjadi satu skor 0–100 (makin tinggi makin mudah dipelihara). Dipakai Radon dan Visual Studio sebagai ringkasan tunggal kesehatan kode.
