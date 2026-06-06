---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Integrasi Static Analysis ke SDLC dan CI-CD
>
> > ## Questions/Cues
> >
> > - Mengapa static analysis perlu diintegrasikan ke SDLC dan CI/CD sejak dini?
> > - Apa tujuh langkah mengintegrasikan static analysis dari pemilihan tool hingga edukasi developer?
> > - Apa best practice agar integrasi tidak membebani developer?
> > - Bagaimana alur workflow dari development lokal hingga build & deploy?
> > - Pelajaran apa dari Equifax, Dependabot, Capital One, dan Log4Shell?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W07 Static Analysis & Secure SDLC — bagian "Why Integrate & 7 Steps")
> > - IF4053 Keamanan Perangkat Lunak (W07 Static Analysis & Secure SDLC — bagian "Best Practices & Workflow")
> > - IF4053 Keamanan Perangkat Lunak (W07 Static Analysis & Secure SDLC — bagian "Challenges, Future Trends & Case Studies")
>
> > ### Mengapa Integrasi ke SDLC Penting
> >
> > Static code analysis membantu keamanan perangkat lunak dengan **mendeteksi kerentanan lebih dini** dalam development lifecycle, **mengurangi biaya** perbaikan bug, serta **mengotomasi** pemeriksaan keamanan dan menegakkan praktik secure coding. Contoh kerentanan yang dideteksi mencakup **SQL Injection** (input pengguna tak tersanitasi pada query database) dan **XSS** (penanganan konten buatan pengguna yang tidak benar). Misalnya kode PHP `$query = "SELECT * FROM users WHERE id = " . $_GET['id'];` akan ditandai sebagai potensi SQL injection.
> >
> > Alasan mengintegrasikan static analysis ke alur kerja ada empat: **Early Detection of Issues** (menemukan kerentanan dan bug dini sehingga biaya dan upaya perbaikan turun); **Continuous Monitoring** (memastikan setiap perubahan kode dianalisis untuk keamanan dan kualitas); **Improved Code Quality** (menegakkan coding standard dan best practice); dan **Automation** (mengurangi upaya manual dengan mengotomasi pemeriksaan keamanan dalam CI/CD pipeline). Inti gagasannya adalah menggeser keamanan ke kiri (shift-left) agar bukan menjadi langkah akhir yang mahal.
> >
> > ### Tujuh Langkah Integrasi
> >
> > W07 menjabarkan tujuh langkah konkret. **Langkah 1 — Pilih tool yang tepat**: pilih yang mendukung bahasa proyek, sesuai kebutuhan, dan terintegrasi baik dengan environment serta CI/CD (PHP: PHPStan/Psalm/Phan; JavaScript: ESLint/SonarQube/Retire.js; multi-language: SonarQube/Semgrep). **Langkah 2 — Konfigurasi tool**: pasang dan konfigurasi lokal untuk developer, definisikan ruleset (gunakan ruleset standar seperti OWASP Top 10 atau PSR-12, lalu kustomisasi); contohnya `.eslintrc.json` untuk ESLint atau `phpstan.neon` untuk menetapkan analysis level. **Langkah 3 — Integrasi dengan Version Control System**: pasang **pre-commit/pre-push hooks** agar analisis berjalan sebelum kode di-commit, memakai Husky (JavaScript) atau Git hooks (mis. pre-commit menjalankan `eslint . --ext .js,.jsx`).
> >
> > **Langkah 4 — Integrasi dengan CI/CD Pipeline**: otomasi analisis pada setiap perubahan kode dengan menambah step di konfigurasi pipeline (GitHub Actions via workflow file, GitLab CI/CD via `.gitlab-ci.yml`, atau Jenkins via plugin/script). **Langkah 5 — Monitor dan Report**: hasilkan laporan tiap run dan buat dapat diakses tim, gunakan dashboard atau notifikasi (SonarQube menyediakan dashboard web; GitHub Actions dapat mem-posting hasil langsung di pull request). **Langkah 6 — Enforce Quality Gates**: definisikan **quality gate** untuk memblokir build/deployment bila ditemukan isu kritis (mis. gagalkan pipeline jika ada kerentanan high-severity atau gagal memenuhi ambang coverage). **Langkah 7 — Edukasi Developer**: latih developer menafsirkan hasil dan memperbaiki isu, serta dorong mereka menjalankan analisis lokal sebelum commit.
> >
> > ```mermaid
> > flowchart LR
> >     L["1. Pilih tool"] --> C["2. Konfigurasi &amp; ruleset"]
> >     C --> V["3. VCS pre-commit hooks"]
> >     V --> CI["4. CI/CD pipeline"]
> >     CI --> M["5. Monitor &amp; report"]
> >     M --> Q["6. Quality gates"]
> >     Q --> E["7. Edukasi developer"]
> > ```
> >
> > ### Best Practices dan Workflow
> >
> > **Best practices** integrasi: **Start Small** (mulai dari sedikit aturan lalu perluas; fokus dulu pada isu high-severity/keamanan); **Automate as Much as Possible** (otomasi di CI/CD untuk pemeriksaan konsisten; pakai Dependabot atau Snyk untuk dependency check otomatis); **Customize Rules** (hindari membanjiri developer dengan warning tak relevan, mis. nonaktifkan aturan unused variable di file test); **Balance False Positives and Negatives** (tinjau dan fine-tune ruleset berkala, gunakan tool yang memungkinkan suppress warning tertentu); **Integrate with Code Reviews** (sertakan hasil analisis dalam review agar isu ditangani sebelum merge); dan **Track Metrics** (pantau jumlah isu diperbaiki, skor kualitas, dan waktu resolusi kerentanan untuk mengukur efektivitas).
> >
> > **Workflow** mengalir melalui empat tahap. **Local Development**: developer menjalankan tool lokal (ESLint, PHPStan) sebelum commit, dengan pre-commit hooks menegakkan pemeriksaan dasar. **Code Commit**: kode di-push ke VCS (GitHub/GitLab) dan analisis berjalan otomatis di CI pipeline. **Pull Request**: hasil analisis diposting di PR untuk review, developer memperbaiki isu yang ditandai. **Build and Deploy**: bila lolos semua quality gate, kode lanjut ke build dan deployment; bila ada isu, pipeline gagal dan developer diberi tahu. Manfaatnya: keamanan meningkat (kerentanan diperbaiki sebelum deploy), kualitas kode konsisten, dan development lebih cepat karena tugas berulang diotomasi.
> >
> > ```mermaid
> > flowchart LR
> >     DEV["Local Development<br/>(ESLint/PHPStan + pre-commit)"] --> COMMIT["Code Commit<br/>(push ke VCS, CI jalan)"]
> >     COMMIT --> PR["Pull Request<br/>(hasil diposting, developer fix)"]
> >     PR --> GATE{"Quality gates<br/>lolos?"}
> >     GATE -->|Ya| DEPLOY["Build &amp; Deploy"]
> >     GATE -->|Tidak| FAIL["Pipeline gagal,<br/>developer dinotifikasi"]
> >     FAIL --> DEV
> > ```
> >
> > ### Challenges, Future Trends, dan Studi Kasus
> >
> > **Challenges** mencakup: **False Positives/Negatives** (FP membuang waktu, FN melewatkan kerentanan pada basis kode kompleks; solusi: fine-tune ruleset dan pakai beberapa tool); **Scalability** (basis kode besar lambat dianalisis; solusi: incremental analysis hanya pada kode yang berubah); **Integration Complexity** (sulit terutama untuk legacy system; solusi: mulai kecil lalu perluas); **Developer Resistance** (developer menolak karena dianggap rumit; solusi: pelatihan dan demonstrasi penghematan waktu); dan **Keeping Up with New Vulnerabilities** (tool harus diperbarui; solusi: pilih tool dengan dukungan komunitas aktif). **Future Trends**: **AI/Machine Learning** (mengurangi FP/FN, memprediksi kerentanan dari data historis, mis. GitHub Copilot menyarankan kode aman); **Shift-Left Security** (memindahkan pemeriksaan lebih awal, SonarLint/ESLint untuk pemakaian lokal); **DevSecOps** (menanam keamanan ke DevOps, mis. Jenkins + SonarQube); **Real-Time Analysis** (plugin IDE seperti SonarLint memberi umpan balik instan); dan dukungan teknologi modern (**IaC** Terraform/Kubernetes, microservices, serverless), serta kolaborasi open-source seperti Semgrep.
> >
> > Empat **studi kasus** menegaskan urgensinya. **Equifax (2017)**: breach yang mengekspos data 147 juta orang akibat kerentanan tak ter-patch pada **Apache Struts (CVE-2017-5638)** yang dieksploitasi untuk RCE; dependency scanning (SonarQube/Retire.js) bisa menandai versi Struts usang, taint analysis bisa mendeteksi penanganan input tak aman, dan automated alert di CI/CD bisa memperingatkan sebelum eksploitasi. **GitHub Dependabot**: memindai dependency (npm, Composer, Maven) untuk kerentanan diketahui dan otomatis membuat pull request pembaruan, sehingga developer fokus menulis kode sementara keamanan dependency ditangani otomatis. **Capital One (2019)**: breach akibat instance AWS salah konfigurasi dan kode tidak aman; static analysis bisa menandai konfigurasi tak aman dan access control yang buruk. **Log4Shell (2021)**: versi rentan pustaka **Log4j**; dependency scanning bisa menandai pustaka usang. Pelajaran utamanya: static analysis rutin plus dependency scanning krusial untuk mengidentifikasi dan memitigasi kerentanan pada pustaka pihak ketiga.

> [!cornell] #### Summary
>
> Mengintegrasikan static analysis ke SDLC memberi **early detection**, **continuous monitoring**, **kualitas kode lebih baik**, dan **automation**, sehingga biaya perbaikan turun. Implementasinya melalui **tujuh langkah**: pilih tool → konfigurasi ruleset → integrasi VCS (pre-commit hooks) → CI/CD pipeline → monitor & report → quality gates → edukasi developer. **Best practice** menekankan start small, otomasi, kustomisasi aturan, menyeimbangkan FP/FN, integrasi dengan code review, dan pelacakan metrik. **Workflow** mengalir dari development lokal → commit → pull request → build & deploy, dengan pipeline gagal bila quality gate tak terpenuhi. Tantangan (FP/FN, skalabilitas, resistensi developer) diatasi sambil tren masa depan bergerak ke **AI/ML, shift-left, DevSecOps, real-time, dan IaC**. Studi kasus **Equifax (Apache Struts CVE-2017-5638)**, **Dependabot**, **Capital One**, dan **Log4Shell** membuktikan dependency scanning rutin sangat krusial.

> [!ad-libitum]- Additional Information
>
> #### Anatomi CVE-2017-5638 (Apache Struts) Lebih Dalam
> Kerentanan Equifax berakar pada parser Jakarta Multipart pada Apache Struts 2: header `Content-Type` yang dibuat khusus diinterpretasikan sebagai ekspresi **OGNL (Object-Graph Navigation Language)** dan dievaluasi, memungkinkan **Remote Code Execution** tanpa autentikasi. Patch tersedia Maret 2017 namun Equifax gagal menerapkannya selama berbulan-bulan. Insiden ini menyoroti bahwa SCA (Software Composition Analysis) bukan sekadar mendeteksi versi usang, tetapi harus terhubung ke proses patch management yang menegakkan SLA remediasi — deteksi tanpa tindakan tetap berujung breach.
>
> #### Quality Gate sebagai Kontrak, Bukan Sekadar Threshold
> Praktik matang memperlakukan quality gate sebagai kontrak tim yang disepakati: misalnya "tidak boleh ada kerentanan baru severity tinggi pada kode yang berubah" (clean-as-you-code) ketimbang menuntut seluruh basis kode legacy bersih sekaligus. Pendekatan diferensial ini menghindari kebuntuan pada proyek lama sekaligus mencegah utang keamanan baru, dan jauh lebih diterima developer dibanding gate absolut yang langsung memblokir semua build.
>
> #### Proyek Eksplorasi Mandiri
> 1. Bangun repositori contoh dengan GitHub Actions yang menjalankan Semgrep + Dependabot, tetapkan quality gate yang menggagalkan PR bila ada temuan high-severity, lalu suntikkan kerentanan (mis. dependency Log4j rentan) dan amati seluruh alur notifikasi hingga PR perbaikan otomatis.
> 2. Terapkan pre-commit hook (Husky/Git hook) yang menjalankan linter lokal, ukur dampaknya terhadap waktu commit, lalu bandingkan jumlah isu yang tertangkap di lokal vs di CI untuk mengukur efektivitas shift-left.
>
> #### Bacaan Lanjutan
> - NVD — CVE-2017-5638 (Apache Struts): https://nvd.nist.gov/vuln/detail/CVE-2017-5638
> - GitHub Dependabot documentation: https://docs.github.com/en/code-security/dependabot
> - Synopsys, "Shift-Left Security Overview" — pengantar shift-left dan DevSecOps.
> - Semgrep documentation (custom ruleset & CI integration): https://semgrep.dev/docs/
