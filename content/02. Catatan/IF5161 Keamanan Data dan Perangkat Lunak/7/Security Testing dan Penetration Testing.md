---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Security Testing dan Penetration Testing
>
> > ## Questions/Cues
> >
> > - Apa itu piramida security testing?
> > - Bagaimana menulis security unit test (Arrange-Act-Assert) dan apa bedanya use case test vs abuse case test?
> > - Apa lima fase PTES/OWASP WSTG?
> > - Apa ciri laporan PoC yang baik dan anti-pattern "scan-and-dump"?
> > - Alat apa untuk web, SQLi, jaringan, dan eksploitasi?
> >
> > ## Reference Points
> >
> > - IF5161 — W06 Bugs, Vulnerability, Program Analysis, and Testing, "Security Testing, Penetration Testing & Adversarial Testing" (The Security Testing Pyramid s.d. "Tools Recap: Security Testing")
>
> > ### Piramida Security Testing
> >
> > ```mermaid
> > flowchart TB
> >     T3["Red-team / adversarial simulation<br/>(lambat, realistis, human-driven)"]
> >     T2["DAST / automated scanning<br/>(lebih luas, otomatis)"]
> >     T1["Unit-level security tests<br/>(cepat, sempit)"]
> >     T1 --> T2 --> T3
> > ```
> >
> > ### Security Unit Test
> >
> > Pola **Arrange-Act-Assert** dengan prinsip **fail loud**:
> >
> > | Langkah | Isi |
> > |---|---|
> > | **Arrange** | Siapkan input jahat/edge case, mis. `' OR 1=1--` atau payload 10 MB |
> > | **Act** | Panggil fungsi persis seperti kode produksi |
> > | **Assert** | Harapkan penolakan, sanitasi, atau error aman, **bukan sukses diam-diam** |
> > | **Fail loud** | Gagalkan build CI saat regresi agar perbaikan terkirim sebelum bug |
> >
> > Contoh JUnit pada kelas `Cart`: **use case test** (`testAddTwoItems`: menambah dua item dan memastikan keduanya ada) dibandingkan **abuse case test** (`testAddNullItem`: menambah `null` harus melempar `RuntimeException` dan keranjang tetap kosong). Abuse case test adalah buah dari [[Abuse Case dan Misuse Case]].
> >
> > ### Metodologi Pentest (PTES / OWASP WSTG)
> >
> > 1. **Reconnaissance**
> > 2. **Mapping attack surface**
> > 3. **Discovery** (kandidat kerentanan)
> > 4. **Exploitation**
> > 5. **Reporting**
> >
> > **Praktik terbaik**: *rules of engagement* tertulis dan ditandatangani sebelum pengujian, laporan berbasis **PoC yang dapat direproduksi** dengan panduan remediasi, serta **DAST berkelanjutan** di pipeline. **Anti-pattern: scan-and-dump** (menyerahkan laporan scanner mentah tanpa validasi), pengujian tanpa izin/scope, pentest sekali tanpa retest, dan mengabaikan business-logic flaw yang secara struktural tak terlihat scanner.
> >
> > ### Mini-Pentest dan Struktur Laporan PoC
> >
> > Alur: recon (stack dan endpoint) → mapping (input, alur auth, versi komponen) → discovery (silang dengan temuan SAST) → exploitation (PoC) → reporting. Contoh: `sqlmap -u "http://target/app?id=1" --batch --dbs` mengonfirmasi temuan SQLi dari Semgrep/CodeQL; overflow dikonfirmasi dengan payload `'A'*76 + 'BBBB'` dan memeriksa `eip` di gdb.
> >
> > **Struktur laporan PoC**: (1) **Summary** satu kalimat, (2) **Steps to reproduce** (perintah/request persis), (3) **Impact**, (4) **Evidence**, (5) **Remediation** spesifik (bukan sekadar "sanitize input").
> >
> > ### Alat
> >
> > | Alat | Tujuan | Lisensi |
> > |---|---|---|
> > | OWASP ZAP | Scanning/proxy aplikasi web | Open source |
> > | Burp Suite Community | Pengujian aplikasi web | Free tier |
> > | sqlmap | Eksploitasi SQLi | Open source |
> > | Nmap | Recon jaringan/service | Open source |
> > | Metasploit Framework | Framework eksploitasi | Open source |
> >
> > **Tantangan terbuka**: tidak ada metrik "coverage" pentest sebersih code coverage, menjaga metodologi tetap mutakhir, dan scoping pada komponen AI non-deterministik.

> [!cornell] #### Summary
>
> Security testing berbentuk **piramida** (unit test → DAST → red team). **Security unit test** memakai Arrange-Act-Assert dan harus *fail loud* di CI; **abuse case test** melengkapi use case test. **Pentest** mengikuti lima fase (recon, mapping, discovery, exploitation, reporting) dan menghasilkan **laporan PoC yang reproducible**. Menghindari scan-and-dump dan selalu retest setelah perbaikan.

> [!ad-libitum]- Additional Information
>
> #### Etika dan Legalitas
> Pengujian hanya boleh dilakukan atas sistem yang **Anda miliki atau yang secara tertulis diizinkan**. UU ITE dan KUHP Indonesia mengancam akses ilegal; ikuti program *responsible disclosure*/bug bounty dan batasi dampak (tanpa merusak atau mengeksfiltrasi data nyata).
>
> #### Proyek Eksplorasi Mandiri
> 1. Tulis 5 abuse case test (JUnit/pytest) untuk modul keranjang/login Anda dan jalankan di CI.
> 2. Lakukan mini-pentest pada Juice Shop dan tulis satu laporan PoC memakai struktur lima bagian di atas (lihat [[writeup]]).
>
> #### Bacaan Lanjutan
> - OWASP Web Security Testing Guide (WSTG)
> - PTES Technical Guidelines
