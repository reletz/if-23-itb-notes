---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Summary OWASP Top 10
>
> > ## Questions/Cues
> >
> > - Ada berapa edisi OWASP Top 10 dan rentang tahunnya?
> > - Bagaimana **kriteria pemilihan & pengurutan** berevolusi (konsensus → data MITRE → estimasi risiko → incidence rate + survei)?
> > - Apa **statistik data** tiap edisi (jumlah aplikasi, CWE, CVE)?
> > - Berapa CWE & incidence rate per kategori pada edisi modern (2021 & 2025)?
> > - Bagaimana **pemetaan satu konsep risiko dari 2003 sampai 2025** (bertahan / digabung / dipecah / dihapus / kembali)?
> > - Kategori apa yang **selalu ada**, yang **datang lalu pergi**, dan yang **baru muncul**?
> >
> > ## Reference Points
> >
> > - IF5161 — OWASP Top 10, seluruh edisi: [[OWASP Top 10 2003]] · [[OWASP Top 10 2004]] · [[OWASP Top 10 2007]] · [[OWASP Top 10 2010]] · [[OWASP Top 10 2013]] · [[OWASP Top 10 2017]] · [[OWASP Top 10 2021]] · [[OWASP Top 10 2025]]
> > - IF5161 — owasp.org/Top10 + GitHub OWASP/Top10 (arsip PDF edisi lama)
>
> > ### Konteks: 8 Edisi dalam 22 Tahun
> >
> > **OWASP Top 10** adalah _standard awareness document_ — **konsensus tentang risiko keamanan aplikasi web paling kritis**, bukan standar sertifikasi (untuk itu ada **OWASP ASVS**). Delapan edisi:
> >
> > | Edisi | Rilis | Judul dokumen | Catatan |
> > |---|---|---|---|
> > | 1 | **2003** (Jan) | *The Ten Most Critical Web Application Security Vulnerabilities* | Edisi pertama; cikal-bakal standar |
> > | 2 | **2004** (Jan) | *… 2004 Update* | Selaras OASIS WAS-XML; +DoS |
> > | 3 | **2007** | *… 2007 Update* | Ditulis ulang; fokus *vulnerability* saja |
> > | 4 | **2010** | *The Ten Most Critical Web Application Security Risks* | Judul berubah: **Risiko**, bukan kelemahan |
> > | 5 | **2013** | *OWASP Top 10 – 2013* | Ulang tahun ke-10 proyek |
> > | 6 | **2017** | *OWASP Top 10 - 2017* | Tiap risiko ditulis *testable* |
> > | 7 | **2021** | *OWASP Top 10:2021* | Fokus *root cause*; format situs modern |
> > | 8 | **2025** | *OWASP Top 10:2025* | Rilis ke-8 (awalnya *Release Candidate*) |
> >
> > ### Evolusi Kriteria & Metodologi
> >
> > | Edisi | Basis pemilihan | Cara memilih 10 | Cara mengurutkan |
> > |---|---|---|---|
> > | **2003** | Konsensus puluhan pakar | Kategori yang cacatnya berkaitan erat, se-*countermeasure*, sering muncul | **Tidak diurutkan** (*"mustahil menentukan risiko agregat terbesar"*) |
> > | **2004** | Konsensus + kosakata **OASIS WAS Thesaurus** | Reprofiling memakai WAS TC sebagai referensi | **Tidak diurutkan** |
> > | **2007** | **Data MITRE** *Vulnerability Trends 2006* (CVE) | Distilasi 10 teratas dari data mentah MITRE | Peringkat mentah MITRE (beberapa kategori digeser ke *root cause*) |
> > | **2010** | Data kontributor + estimasi risiko | 8 dari data + tambah/ganti 2 item | **Estimasi RISIKO**, bukan sekadar frekuensi: `Exploitability × Prevalence × Detectability × Impact` (skala 1–3, konsensus) |
> > | **2013** | **8 dataset / 7 firma**, >500.000 kerentanan | Prevalence data + konsensus | Prevalence + estimasi *exploitability / detectability / impact* |
> > | **2017** | **40+ pengiriman data** + **survei industri 500+ orang** | **8 dari data, 2 dari survei komunitas** (A8, A10) | Prevalence data + estimasi konsensus *exploitability / detectability / impact* |
> > | **2021** | >500.000 aplikasi; **~30 → ~400 CWE**; 125k CVE (NVD) | **8 dari data, 2 dari community survey** (A04, A10) | **Incidence rate** (persen populasi aplikasi yang punya ≥1 instance CWE) + skor *exploit/impact* tertimbang CVSS |
> > | **2025** | **2,8 juta+ aplikasi**, 13 organisasi; **175k CVE** | **8 dari data, 2 dari community survey** (A03, A10) | **Incidence rate** + *exploit/impact* tertimbang prevalensi versi CVSS |
> >
> > **Tiga pergeseran besar:**
> >
> > 1. **2010 — dari _frekuensi_ ke _risiko_.** Sebelumnya urutan ≈ seberapa sering kelemahan dilaporkan; sejak 2010, *dampak + kemudahan eksploitasi* ikut menimbang → kelemahan langka tetapi berdampak besar bisa masuk.
> > 2. **2017 — hibrida data + survei.** 8 kategori dari data, 2 dari survei komunitas untuk menangkap risiko yang *belum bisa diuji alat otomatis* (mis. desain, rantai pasok).
> > 3. **2021 — _incidence rate_.** Mengukur *"berapa persen aplikasi **punya** masalah ini"* alih-alih *frequency* (jumlah temuan mentah) → menghindari bias jenis kerentanan bervolume tinggi dari pemindai.
> >
> > ### Statistik Data & CWE per Edisi
> >
> > | Edisi | Aplikasi dianalisis | CWE ditelaah | CVE dipetakan | Kontributor data |
> > |---|---|---|---|---|
> > | 2003 | — | kategori ad-hoc | — | konsensus komunitas |
> > | 2004 | — | selaras WAS Thesaurus | — | konsensus komunitas |
> > | 2007 | data MITRE (ratusan CVE 2006) | pemetaan CWE per bagian | CVE 2006 (MITRE) | MITRE |
> > | 2010 | — | — | CVE (MITRE) | Aspect, MITRE, Softtek, WhiteHat |
> > | 2013 | ribuan aplikasi | — | — | 8 dataset / 7 firma (>500.000 kerentanan) |
> > | 2017 | **>100.000** aplikasi & API | — | — | 40+ firma + survei 500+ orang |
> > | 2021 | **>500.000** | **~400** (naik dari ~30) | **~125.000** rekaman (NVD) | banyak kontributor |
> > | 2025 | **>2.800.000** | **589** (248 di dalam 10 kategori) | **~175.000**; 643 CWE unik di CVE | 13 organisasi |
> >
> > ### Rincian CWE & Incidence Rate — Edisi Modern
> >
> > **OWASP Top 10:2025** (CVSS: 160k v2, 156k v3, 6k v4):
> >
> > | # | Kategori | CWE | Incidence rate maks | CVE | Total kemunculan |
> > |---|---|---|---|---|---|
> > | A01 | Broken Access Control | 40 | 20,15% | ~32.654 | ~1,84 jt |
> > | A02 | Security Misconfiguration | 16 | 27,70% | ~1.375 | ~719 rb |
> > | A03 | Software Supply Chain Failures | 6 | 5,72% (rata-rata) | — | ~215 rb |
> > | A04 | Cryptographic Failures | 32 | 13,77% | ~2.185 | ~1,67 jt |
> > | A05 | Injection | 37 | 13,77% | **~62.445** (tertinggi) | ~1,4 jt |
> > | A06 | Insecure Design | 39 | 22,18% | ~7.647 | — |
> > | A07 | Authentication Failures | 36 | 15,80% | ~7.147 | — |
> > | A08 | Software or Data Integrity Failures | 14 | 8,98% | ~3.331 | impact tertimbang 4,79 |
> > | A09 | Security Logging and Alerting Failures | 5 | 11,33% | ~723 | — |
> > | A10 | Mishandling of Exceptional Conditions | 24 | 20,67% | ~3.416 | — |
> >
> > **OWASP Top 10:2021** (perbandingan):
> >
> > | # | Kategori | CWE | Incidence rate maks | CVE |
> > |---|---|---|---|---|
> > | A01 | Broken Access Control | 34 | **55,97%** | ~19.013 |
> > | A02 | Cryptographic Failures | 29 | 46,44% | ~3.075 |
> > | A03 | Injection | 33 | 19,09% | ~32.078 |
> > | A04 | Insecure Design | 40 | 24,19% | ~2.691 |
> > | A05 | Security Misconfiguration | 20 | — | ~789 |
> > | A06 | Vulnerable and Outdated Components | 3 | 8,77% (rata-rata) | — (tanpa CVE → bobot default 5,0) |
> > | A07 | Identification and Authentication Failures | 22 | 14,84% | ~3.897 |
> > | A08 | Software and Data Integrity Failures | 10 | 16,67% | impact tertimbang **7,94** |
> > | A09 | Security Logging and Monitoring Failures | 4 | 19,23% | ~242 |
> > | A10 | Server-Side Request Forgery (SSRF) | 1 | 2,72% | ~385 |
> >
> > **Cara membaca tabel.** **CWE** = jumlah *Common Weakness Enumeration* yang dikelompokkan ke kategori itu. **Incidence rate** = persentase aplikasi teruji yang punya ≥1 instance — mengukur *seberapa umum*, bukan *seberapa parah*. **CVE** = jumlah kerentanan nyata terdaftar yang dipetakan ke CWE kategori itu; dari sini dihitung skor *exploit* & *impact*.
> >
> > ### Peta Tahun-ke-Tahun (Lineage Konsep Risiko)
> >
> > Kode sel: **`Ax`** = nomor kategori di edisi itu · **`baru`** = pertama muncul · **`→ Kat`** = dilebur ke kategori lain · **`✗`** = dihapus · **`(Ax)`** = jadi bagian kategori Ax tanpa entri sendiri · **`—`** = tidak ada.
> >
> > | Konsep risiko | 2003 | 2004 | 2007 | 2010 | 2013 | 2017 | 2021 | 2025 |
> > |---|---|---|---|---|---|---|---|---|
> > | **Broken Access Control** (otorisasi umum) | A2 | A2 | A4¹ | A4 | A4 | A5² | **A01** | **A01**³ |
> > | Missing Function / URL Level Access Control | (A2) | (A2) | A10¹ | A8 | A7 | → A5 | (A01) | (A01) |
> > | **Server-Side Request Forgery (SSRF)** | — | — | — | — | — | — | **A10 baru** | → A01 |
> > | Cross-Site Request Forgery (CSRF) | — | — | A5 baru | A5 | A8 | ✗ (5% aplikasi) | (terkait A01) | (terkait A01) |
> > | **Injection** (SQL / OS / LDAP / Command) | A6 | A6 | A2 | A1 | A1 | A1 | A3⁴ | A05 |
> > | Cross-Site Scripting (XSS) | A4 | A4 | A1 | A2 | A3 | A7 | → A3 Injection | (A05) |
> > | XML External Entities (XXE) | — | — | — | — | — | A4 baru | → A05 Sec. Misconfig | (A02) |
> > | **Authentication & Session Management** | A3 | A3 | A7 | A3 | A2 | A2 | A07⁵ | A07⁶ |
> > | **Cryptographic Storage / Sensitive Data** | A8 | A8 | A8 | A7 | A6⁷ | A3 | **A02**⁸ | A04 |
> > | Transport Layer / Insecure Communications | (config) | (config) | A9 baru | A9 | → A6 | (A3) | (A02) | (A04) |
> > | **Security Misconfiguration** | A10 | A10 | ✗ (rank MITRE) | A6⁹ | A5 | A6 | A05¹⁰ | **A02** |
> > | **Vulnerable Components → Supply Chain** | (config) | (config) | (config) | (A6) | A9 baru | A9 | A06 | **A03**¹¹ |
> > | **Software & Data Integrity / Insecure Deserialization** | — | — | — | — | — | A8 baru¹² | A08 | A08 |
> > | **Logging / Monitoring / Alerting** | (dibahas)¹³ | — | — | — | — | A10 baru | A09 | A09⁶ |
> > | **Insecure Design** | — | — | — | — | — | — | A04 baru | A06 |
> > | **Improper Error Handling / Exceptional Conditions** | A7 | A7 | A6¹⁴ | ✗¹⁵ | — | — | — | A10 baru¹⁶ |
> > | Unvalidated Input / Parameters | A1 | A1 | ✗¹⁷ | — | — | — | — | — |
> > | Buffer Overflows | A5 | A5 | ✗ (isu C/C++) | — | — | — | — | — |
> > | Malicious File Execution (RFI) | — | — | A3 baru | ✗¹⁸ | — | — | — | — |
> > | Unvalidated Redirects and Forwards | — | — | — | A10 baru | A10 | ✗ (kalah dari XXE) | — | — |
> > | Denial of Service | (dibahas)¹³ | A9 baru | ✗ (rank MITRE) | — | — | — | — | — |
> > | Remote Administration Flaws | A9 | → A2 BAC | — | — | — | — | — | — |
> >
> > **Catatan sel:**
> > ¹ 2007 memecah *Broken Access Control* (A2:2004) menjadi **A4 Insecure Direct Object Reference** + **A10 Failure to Restrict URL Access**.
> > ² 2017 menyatukan kembali IDOR + Missing Function Level Access Control → **A5 Broken Access Control**.
> > ³ 2025: A01 juga menyerap **SSRF** (CWE-918) dan mencakup CSRF.
> > ⁴ 2021: A3 Injection menyerap **XSS**.
> > ⁵ 2021: ganti nama *Broken Authentication* → **Identification and Authentication Failures**.
> > ⁶ 2025: A07 *Authentication Failures*; A09 *Security Logging and **Alerting** Failures* (ganti nama dari *Monitoring*).
> > ⁷ 2013: A6 *Sensitive Data Exposure* = merge **A7 Insecure Cryptographic Storage + A9 Insufficient Transport Layer Protection** (2010) + risiko data sisi browser.
> > ⁸ 2021: ganti nama *Sensitive Data Exposure* → **Cryptographic Failures** (fokus akar masalah).
> > ⁹ 2010: *Security Misconfiguration* kembali (adalah A10:2004, dihapus 2007).
> > ¹⁰ 2021: A05 menyerap **XXE**.
> > ¹¹ 2025: *Vulnerable and Outdated Components* diperluas besar menjadi **Software Supply Chain Failures** (proses build/distribusi/update).
> > ¹² 2017: **A8 Insecure Deserialization** (dari survei) → 2021 dilebur ke **A08 Software and Data Integrity Failures**.
> > ¹³ 2003 "Conclusions" menyebut *Denial of Service* dan *Accountability Problems and Weak Logging* sebagai kandidat yang **dipertimbangkan tetapi tak masuk**.
> > ¹⁴ 2007: A6 *Information Leakage and Improper Error Handling*.
> > ¹⁵ 2010: dihapus — *"dampak membocorkan stack trace biasanya minimal"*; diserap ke Security Misconfiguration.
> > ¹⁶ 2025: **A10 Mishandling of Exceptional Conditions** (baru) menggantikan payung "poor code quality" yang kabur — semangatnya kembali ke A7:2003/2004.
> > ¹⁷ 2007: dihapus — *"validasi input kini menjadi bagian dari solusi"* banyak item lain.
> > ¹⁸ 2010: dihapus — PHP kini dikirim dengan konfigurasi default lebih aman.
> >
> > ```mermaid
> > flowchart TD
> >     E1["2003-2004<br/>Konsensus komunitas<br/>(tanpa data, daftar tak diurutkan)"]
> >     E2["2007<br/>Distilasi data MITRE CVE 2006<br/>(fokus vulnerability saja)"]
> >     E3["2010<br/>Peringkat = ESTIMASI RISIKO<br/>Exploitability x Prevalence x Detectability x Impact"]
> >     E4["2013<br/>Data prevalensi<br/>8 dataset / 7 firma"]
> >     E5["2017<br/>8 kategori dari data + 2 dari community survey<br/>ditulis testable"]
> >     E6["2021 &amp; 2025<br/>Incidence rate + exploit/impact CVSS<br/>8 data + 2 survey; 0,5jt lalu 2,8jt aplikasi"]
> >     E1 --> E2 --> E3 --> E4 --> E5 --> E6
> > ```
> >
> > ### Kategori: Bertahan, Datang-Pergi, Kembali
> >
> > **Selalu ada (8/8 edisi, dalam bentuk apa pun):** Broken Access Control · Injection · Authentication & Session Management · Cryptographic/Sensitive Data · Security Misconfiguration *(kecuali absen 2007)* · XSS *(2003–2017 sendiri, lalu melebur ke Injection)*.
> >
> > **Muncul belakangan & bertahan:** Vulnerable Components (2013→) yang jadi **Supply Chain** (2025) · Insecure Deserialization (2017) → **Software & Data Integrity Failures** (2021→) · **Logging/Monitoring/Alerting** (2017→) · **Insecure Design** (2021→) · **SSRF** (2021, lalu diserap 2025).
> >
> > **Datang lalu pergi:** Unvalidated Input (2003–2004) · Buffer Overflows (2003–2004) · Malicious File Execution/RFI (2007) · Unvalidated Redirects and Forwards (2010–2013) · Denial of Service (2004) · Remote Administration Flaws (2003) · CSRF (2007–2013) · XXE (2017).
> >
> > **Kembali setelah dihapus:** Security Misconfiguration (A10:2004 → dihapus 2007 → A6:2010) · semangat Error Handling (A7:2003/2004 → dihapus 2010 → A10:2025 *Mishandling of Exceptional Conditions*).
> >
> > **Nomor #1 tiap edisi** (bermakna sebagai peringkat risiko baru sejak 2007):
> >
> > | 2007 | 2010 | 2013 | 2017 | 2021 | 2025 |
> > |---|---|---|---|---|---|
> > | XSS | Injection | Injection | Injection | **Broken Access Control** | **Broken Access Control** |

> [!cornell] #### Summary
>
> **OWASP Top 10** telah terbit **8 kali (2003–2025)**. **Kriteria pemilihannya berevolusi** dari **konsensus pakar murni** (2003–2004, daftar bahkan tak diurutkan), ke **distilasi data MITRE/CVE** (2007), ke **estimasi risiko** `Exploitability × Prevalence × Detectability × Impact` (2010), ke **hibrida 8 data + 2 community survey** (2017), lalu ke metrik **incidence rate + exploit/impact tertimbang CVSS** (2021 & 2025). **Skala datanya melonjak**: dari kategori ad-hoc, ke ~100.000 aplikasi (2017), **500.000** dan **~400 CWE** (2021), hingga **2,8 juta aplikasi, 589 CWE, dan ~175.000 CVE** (2025). Enam konsep **hadir di semua edisi** (kontrol akses, injeksi, autentikasi, kripto, misconfig, XSS), sementara banyak kategori **datang lalu pergi** (Buffer Overflows, DoS, RFI, Unvalidated Redirects, XXE, CSRF) atau **muncul belakangan** (Insecure Design, Supply Chain, Logging/Alerting, SSRF). **Broken Access Control** — konsep tertua (A2:2003) yang sempat dipecah lalu disatukan — kini menjadi **#1 pada 2021 dan 2025**. Rincian tiap edisi: [[OWASP Top 10 2003]] … [[OWASP Top 10 2025]].

> [!ad-libitum]- Additional Information
>
> #### Jebakan saat membandingkan angka lintas edisi
>
> - **Nomor kategori ≠ peringkat risiko sebelum 2007.** Edisi 2003 & 2004 **eksplisit tidak mengurutkan**; "A1" 2004 (*Unvalidated Input*) bukan berarti risiko terbesar.
> - **Incidence rate ≠ frequency ≠ jumlah CVE.** Incidence rate = persen *aplikasi* yang punya masalah; frequency (dipakai pra-2021 sebagian) = jumlah temuan; jumlah CVE = kerentanan publik terdaftar. Ketiganya bisa memberi urutan berbeda.
> - **Definisi kategori bergeser.** "Broken Access Control" 2004 mencakup *Remote Administration Flaws*; "Cryptographic Failures" 2021 = *Sensitive Data Exposure* 2013 yang di-*reframe* ke akar masalah. Membandingkan tren satu kategori butuh melacak *lineage*-nya, bukan namanya.
> - **Kategori survei tidak sebanding dengan kategori data.** Insecure Design (2021) & Supply Chain (2025) naik karena **penilaian komunitas**, bukan peringkat data — memang belum terukur alat otomatis.
>
> #### Konteks non-teknis yang mendorong perubahan
>
> - **PHP** mendominasi lanskap 2006–2007 (RFI, `register_globals`) → A3:2007; hilang 2010 setelah PHP mengamankan default-nya.
> - **PCI DSS** (wajib 2008) & **GDPR** (2018) mendorong penekanan pada kripto & proteksi data.
> - **SolarWinds (2020), Log4Shell (2021), worm npm (2025)** mendorong *Vulnerable Components* → *Software Supply Chain Failures*.
> - **Framework modern** (Rails, React auto-escape; token CSRF bawaan) menurunkan XSS & menghapus CSRF sebagai kategori tersendiri.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Lengkapi kolom **2010 & 2007** pada tabel *lineage* dengan nomor persis, lalu buat diagram Sankey/alur besar 2003→2025.
> 2. Pilih satu CVE terkenal per dekade (mis. CVE-2007-5638 Struts, CVE-2017-5638 Struts, CVE-2021-44228 Log4Shell) dan petakan ke kategori Top 10 di edisi yang berlaku saat itu **dan** di edisi 2025.
> 3. Ambil kategori *Broken Access Control* dan tulis narasi 1 paragraf: mengapa konsep tertua ini justru baru jadi #1 pada 2021 (petunjuk: metodologi incidence rate + 94% aplikasi terdampak).
> 4. Bandingkan daftar "kandidat yang tak masuk" di *Conclusions* 2003 dengan kategori 2025 — berapa yang akhirnya masuk?
>
> #### Bacaan Lanjutan
>
> - OWASP Top 10 — halaman resmi seluruh edisi: `https://owasp.org/www-project-top-ten/` dan `https://owasp.org/Top10/`
> - GitHub `OWASP/Top10` — arsip PDF/PPTX edisi 2003–2025 + folder `2021-2003_Comparison/`
> - MITRE **CWE** & **CWE Top 25 Most Dangerous Software Weaknesses** (pembanding berbasis CWE)
> - OWASP **ASVS**, **Proactive Controls**, **Cheat Sheet Series**, **Web Security Testing Guide**
