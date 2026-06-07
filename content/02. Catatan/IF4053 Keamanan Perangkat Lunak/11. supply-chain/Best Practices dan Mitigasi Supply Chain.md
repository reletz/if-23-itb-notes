---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4053 Keamanan Perangkat Lunak]]

> [!cornell] Best Practices dan Mitigasi Supply Chain
>
> > ## Questions/Cues
> >
> > - Apa praktik terbaik utama untuk mengamankan software supply chain?
> > - Bagaimana cara melakukan automated dependency scanning dan database mana yang dirujuk?
> > - Apa beda provenance dan attestation, serta peran in-toto dan SLSA?
> > - Apa itu SBOM dan tool apa yang menghasilkannya?
> > - Apa emerging trends dan standar industri pada supply chain security?
> >
> > ## Reference Points
> >
> > - IF4053 Keamanan Perangkat Lunak (W11 Supply Chain Security — bagian "Best Practices")
> > - IF4053 Keamanan Perangkat Lunak (W11 Supply Chain Security — bagian "How-to ... (Verify Source, Scanning, Code Signing, Attestation, Build Pipelines, Reproducible Builds, Runtime Monitoring, SBOM, 3rd-Party Risk)")
> > - IF4053 Keamanan Perangkat Lunak (W11 Supply Chain Security — bagian "Emerging Trends")
>
> > ### Kerangka Best Practices
> >
> > Slide merangkum sembilan **best practice** untuk mengamankan supply chain. **Verify Sources**—gunakan repositori tepercaya dan verifikasi integritas kode. **Automated Dependency Scanning**—deteksi kerentanan yang sudah diketahui. **Code Signing & Verification**—pastikan semua artefak otentik dan tidak diubah. **Artifact Attestation & Provenance**—lacak dan verifikasi asal serta proses build artefak. **Secure Build Pipelines**—lindungi lingkungan CI/CD dengan kontrol kuat. **Reproducible Builds**—pastikan build deterministik agar tampering terdeteksi. **Runtime Monitoring & Anomaly Detection**—deteksi dan tanggapi ancaman di produksi. **Maintain SBOM**—inventaris semua komponen dan versinya. **Manage 3rd-Party Risk**—nilai postur keamanan sebelum memakai/bergantung pada pihak ketiga.
> >
> > ```mermaid
> > flowchart TD
> >     A["Best Practices Supply Chain"] --> B["Verify Sources"]
> >     A --> C["Automated Dependency Scanning"]
> >     A --> D["Code Signing &amp; Verification"]
> >     A --> E["Attestation &amp; Provenance"]
> >     A --> F["Secure Build Pipelines"]
> >     A --> G["Reproducible Builds"]
> >     A --> H["Runtime Monitoring"]
> >     A --> I["SBOM"]
> >     A --> J["Manage 3rd-Party Risk"]
> > ```
> >
> > ### Verify Sources dan Dependency Scanning
> >
> > **Verify Sources**: konfigurasi package manager agar memakai repositori **resmi dan tertandatangani**; validasi **checksum** dan **tanda tangan digital** paket yang diunduh; serta hindari sumber yang **tak terawat atau tidak resmi**. Praktik ini memutus jalur masuk paket yang sudah dirusak sebelum sampai ke build.
> >
> > **Automated Dependency Scanning**: gunakan tool seperti **OWASP Dependency-Check**, **Snyk**, atau **GitHub Dependabot**. Periksa dependensi terhadap **Vulnerability Databases**—**NVD**, **CVE Details**, dan **OSV**. Jadwalkan **pemindaian rutin** dan integrasikan ke proses build, serta pasang **alert** untuk kerentanan baru yang ditemukan pada dependensi. Dengan begitu, kerentanan yang dipublikasikan setelah rilis tetap terpantau, bukan hanya saat pertama kali kode ditulis.
> >
> > ### Integritas Artefak: Signing, Attestation, dan Reproducible Builds
> >
> > **Code Signing & Verification**: tandatangani semua **biner, skrip, dan container** dengan kunci kriptografis; verifikasi tanda tangan **sebelum deployment** dan saat update; simpan **signing key** secara aman (misalnya di **HSM** atau secure vault). Slide mencatat topik ini telah dibahas pada pertemuan sebelumnya.
> >
> > **Artifact Attestation & Provenance**: **provenance** adalah informasi terverifikasi yang mendeskripsikan **bagaimana** sebuah artefak diproduksi; **attestation** adalah pernyataan (sering berupa **dokumen JSON tertandatangani**) yang menegaskan validitas/keaslian provenance tersebut. Gunakan tool seperti **in-toto** atau **SLSA** (https://slsa.dev/) untuk menghasilkan metadata provenance; wajibkan attestation untuk semua artefak kritis; serta simpan dan verifikasi data provenance sebagai bagian dari rilis.
> >
> > **Reproducible Builds**: pakai tool reproducible build dan dokumentasikan lingkungan build; bandingkan output build dari **lingkungan independen**—jika hasilnya identik, tidak ada tampering. Untuk jaminan tinggi, adopsi persyaratan **SLSA Level 4**.
> >
> > ### Secure Pipelines, Runtime Monitoring, SBOM, dan 3rd-Party Risk
> >
> > **Secure Build Pipelines**: terapkan **autentikasi dan kontrol akses** kuat; batasi akses ke sistem build/deployment; gunakan **role-based access control (RBAC)**; tinjau izin berkala; gunakan **just-in-time access** untuk operasi sensitif; **isolasi** lingkungan build dan pakai **ephemeral build agents**; pantau **build log** untuk aktivitas mencurigakan; serta perbarui dan patch tool/server build secara rutin. Tool yang disebut: **GitGuardian, Spectral, Checkmarx**.
> >
> > **Runtime Monitoring & Anomaly Detection**: terapkan solusi **RASP** (*Runtime Application Self-Protection*); gunakan **behavioral analytics** untuk mengenali aktivitas mencurigakan; dan integrasikan monitoring dengan proses incident response. Tool keamanan container yang disebut: **Trivy, Clair, Anchore**.
> >
> > **Maintain SBOM**: minta **SBOM** dari vendor dan penyedia pihak ketiga; integrasikan pengecekan SBOM ke pipeline CI/CD. Tool generator SBOM: **CycloneDX, SPDX, Syft**. **Manage 3rd-Party Risk**: nilai postur keamanan sebelum integrasi/ketergantungan; atur **kontrak** dengan persyaratan keamanan; tata kelola dependensi lewat **kebijakan** penambahan dependensi baru. Tool vendor assessment: **SecurityScorecard, BitSight**.
> >
> > ### Emerging Trends dan Standar
> >
> > Slide menutup dengan tren yang sedang berkembang: **blockchain** untuk transparansi dan verifikasi integritas supply chain; **machine learning** untuk *predictive threat analytics*; **standar industri** seperti **NIST SP 800-161**, **ISO/IEC 27036**, dan **SLSA framework**; **automated vulnerability remediation** dan patch management; serta pendekatan **zero-trust** terhadap supply chain security. Arah umumnya jelas: bergerak dari kepercayaan implisit menuju **verifikasi yang terotomasi, terstandar, dan terus-menerus** di seluruh rantai.
>
> [!cornell] #### Summary
>
> Mitigasi supply chain bertumpu pada sembilan best practice: **Verify Sources** (repo resmi, checksum, tanda tangan), **Automated Dependency Scanning** (OWASP Dependency-Check, Snyk, Dependabot terhadap NVD/CVE/OSV), **Code Signing** (kunci di HSM), **Attestation & Provenance** (in-toto, SLSA—provenance mendeskripsikan cara artefak dibuat, attestation menegaskannya via JSON tertandatangani), **Secure Build Pipelines** (RBAC, JIT access, ephemeral agents; GitGuardian/Spectral/Checkmarx), **Reproducible Builds** (deterministik, SLSA L4), **Runtime Monitoring** (RASP; Trivy/Clair/Anchore), **SBOM** (CycloneDX/SPDX/Syft), dan **Manage 3rd-Party Risk** (kontrak, kebijakan; SecurityScorecard/BitSight). Emerging trends meliputi **blockchain, ML predictive analytics, zero-trust**, serta standar **NIST SP 800-161, ISO/IEC 27036, dan SLSA**.

> [!ad-libitum]- Additional Information
>
> #### Lebih dalam — Empat Level SLSA (DI LUAR sumber)
> **SLSA** (*Supply-chain Levels for Software Artifacts*) menyusun jaminan integritas build secara bertingkat. Versi klasiknya: **L1** mengharuskan proses build terotomasi dan menghasilkan provenance; **L2** menambah build service yang menandatangani provenance; **L3** memperkuat dengan build platform yang terisolasi dan tahan-rusak (*non-falsifiable*); **L4** (yang dirujuk slide untuk reproducible builds) menuntut review dua orang dan build yang **hermetik & reproducible**. Memahami tangga ini membantu menentukan target jaminan sesuai kekritisan artefak.
>
> #### Lebih dalam — SBOM: CycloneDX vs SPDX (DI LUAR sumber)
> **SBOM** ibarat "daftar bahan" perangkat lunak. **CycloneDX** (OWASP) berorientasi keamanan dan mendukung VEX (*Vulnerability Exploitability eXchange*) untuk menyatakan apakah suatu kerentanan benar-benar dapat dieksploitasi pada produk. **SPDX** (Linux Foundation, kini standar ISO/IEC 5962) kuat pada aspek lisensi dan kepatuhan. **Syft** dapat menghasilkan keduanya dari image container atau filesystem. Regulasi seperti US Executive Order 14028 mendorong SBOM menjadi syarat pengadaan.
>
> #### Proyek Eksplorasi Mandiri
> 1. Integrasikan **OWASP Dependency-Check** atau **Trivy** ke pipeline CI sebuah proyek, lalu picu temuan dengan menambahkan dependensi versi rentan dan amati alert-nya.
> 2. Hasilkan SBOM proyek Anda dengan **Syft** dalam format CycloneDX dan SPDX, lalu bandingkan isinya.
> 3. Susun rancangan kebijakan penambahan dependensi baru (3rd-party risk policy) untuk sebuah tim, mencakup kriteria evaluasi dan proses approval.
>
> #### Bacaan Lanjutan
> - SLSA Framework — https://slsa.dev/ (provenance, level L1–L4).
> - NIST SP 800-161 Rev.1 — Supply Chain Risk Management Practices for Systems and Organizations.
> - OWASP CycloneDX dan OWASP Software Component Verification Standard (SCVS).
