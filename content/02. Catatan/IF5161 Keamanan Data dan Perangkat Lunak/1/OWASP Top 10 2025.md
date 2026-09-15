---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] OWASP Top 10 2025
>
> > ## Questions/Cues
> >
> > - Apa itu OWASP Top 10 dan apa status/posisi edisi 2025?
> > - Bagaimana metodologi penyusunan daftar 2025 — mana yang dari data, mana dari survei komunitas?
> > - Apa 10 kategori risiko teratas 2025 dan urutannya?
> > - Kategori apa yang **baru**, **digabung**, **berganti nama**, atau **bergeser peringkat** dibanding [[OWASP Top 10 2021]]?
> > - Bagaimana contoh skenario serangan untuk Broken Access Control, Injection, dan Software Supply Chain Failures?
> > - Apa beda "incidence rate" vs "exploitability/impact" dalam menentukan peringkat?
> >
> > ## Reference Points
> >
> > - IF5161 — OWASP Top 10:2025, Introduction (owasp.org/Top10/2025/0x00_2025-Introduction)
> > - IF5161 — OWASP Top 10:2025, halaman kategori A01–A10 (owasp.org/Top10/2025/A01_2025 … A10_2025)
>
> > ### Konteks & Metodologi
> >
> > **OWASP Top 10 adalah _standard awareness document_** — dokumen kesadaran standar untuk developer dan praktisi keamanan aplikasi web. Ia bukan standar sertifikasi, melainkan **konsensus luas tentang risiko keamanan paling kritis pada aplikasi web** dan dimaksudkan sebagai *langkah pertama* menuju budaya pengembangan yang lebih aman. Edisi 2025 adalah **rilis ke-8** sejak 2003; seperti biasa daftar awal dipublikasikan sebagai *Release Candidate* untuk masa komentar publik sebelum difinalkan.
> >
> > **Pendekatan: _"data-informed, but not blindly data-driven"_** (dipandu data, bukan diperbudak data). Dari 10 kategori:
> >
> > - **8 kategori** diturunkan langsung dari **data pengujian** yang disumbangkan komunitas.
> > - **2 kategori** dipromosikan dari **hasil _community survey_** — untuk menangkap risiko yang sedang naik namun belum bisa diuji secara massal oleh alat otomatis (mis. kelemahan desain, kelemahan rantai pasok).
> >
> > **Skala data yang dianalisis (2025):**
> >
> > | Aspek | Angka |
> > |---|---|
> > | Aplikasi yang diuji | > 2,8 juta |
> > | Organisasi kontributor | 13 |
> > | Total CWE dianalisis | 589 (248 berada di dalam 10 kategori) |
> > | Rekaman CVE dipetakan ke CWE | ± 175.000 |
> > | CWE unik yang muncul di CVE | 643 |
> > | Skor CVSS | 160rb v2, 156rb v3, 6rb v4 |
> >
> > **Cara peringkat dihitung.** Tiap kategori adalah kelompok **CWE (Common Weakness Enumeration) yang berakar pada penyebab yang sama**, bukan sekadar gejala. Untuk tiap CWE dihitung:
> >
> > - **Incidence rate** — persentase aplikasi yang teruji memiliki setidaknya satu instance CWE tersebut (mengukur *seberapa umum* kelemahan itu di dunia nyata, bukan seberapa sering ditemukan dalam satu aplikasi).
> > - **Exploitability & Impact** — diambil dari skor exploit dan impact rata-rata CVE yang terkait, ditimbang menurut prevalensi versi CVSS.
> >
> > Delapan kategori data-driven diurutkan dengan menggabungkan incidence rate dan skor exploit/impact tertimbang; dua kategori survei disisipkan berdasarkan urgensi yang dirasakan komunitas.
> >
> > ### Daftar OWASP Top 10 2025
> >
> > | # | Kategori | Inti masalah | Perubahan vs 2021 |
> > |---|---|---|---|
> > | **A01** | Broken Access Control | Pengguna bisa bertindak di luar izin yang seharusnya | Tetap #1; **SSRF diserap** ke sini |
> > | **A02** | Security Misconfiguration | Konfigurasi sistem/cloud/framework yang tidak aman | Naik **#5 → #2** |
> > | **A03** | Software Supply Chain Failures | Kompromi pada proses build, distribusi, update, dan dependensi | **Baru** — perluasan dari "Vulnerable and Outdated Components" (#6 2021) |
> > | **A04** | Cryptographic Failures | Kegagalan melindungi data lewat kriptografi (transit & at rest) | Turun **#2 → #4** |
> > | **A05** | Injection | Input tak tepercaya dieksekusi oleh interpreter (SQL, OS, dll.) | Turun **#3 → #5**; **XSS termasuk di sini** |
> > | **A06** | Insecure Design | Kontrol keamanan yang hilang/tidak efektif **sejak tahap desain** | Turun **#4 → #6** |
> > | **A07** | Authentication Failures | Sistem menerima pengguna ilegitim sebagai sah | **Ganti nama** dari "Identification and Authentication Failures" |
> > | **A08** | Software or Data Integrity Failures | Kode/data tak terverifikasi diperlakukan sebagai tepercaya | Tetap; mencakup *insecure deserialization* |
> > | **A09** | Security Logging and Alerting Failures | Tidak mampu mendeteksi & **memicu tindakan** atas serangan | **Ganti nama** dari "…Monitoring Failures" — menekankan *alerting* |
> > | **A10** | Mishandling of Exceptional Conditions | Program gagal mencegah/mendeteksi/merespons kondisi tak lazim | **Baru** — menggantikan kategori "poor code quality" yang terlalu kabur |
> >
> > ```mermaid
> > flowchart LR
> >     subgraph Y2021["OWASP Top 10 2021"]
> >         B1["A01 Broken Access Control"]
> >         B2["A02 Cryptographic Failures"]
> >         B3["A03 Injection"]
> >         B4["A04 Insecure Design"]
> >         B5["A05 Security Misconfiguration"]
> >         B6["A06 Vulnerable &amp; Outdated Components"]
> >         B7["A07 Identification &amp; Auth Failures"]
> >         B8["A08 Software &amp; Data Integrity Failures"]
> >         B9["A09 Security Logging &amp; Monitoring Failures"]
> >         B10["A10 SSRF"]
> >     end
> >     subgraph Y2025["OWASP Top 10 2025"]
> >         N1["A01 Broken Access Control"]
> >         N2["A02 Security Misconfiguration"]
> >         N3["A03 Software Supply Chain Failures"]
> >         N4["A04 Cryptographic Failures"]
> >         N5["A05 Injection"]
> >         N6["A06 Insecure Design"]
> >         N7["A07 Authentication Failures"]
> >         N8["A08 Software or Data Integrity Failures"]
> >         N9["A09 Security Logging &amp; Alerting Failures"]
> >         N10["A10 Mishandling of Exceptional Conditions"]
> >     end
> >     B1 --> N1
> >     B10 -- "diserap" --> N1
> >     B5 --> N2
> >     B6 -- "diperluas" --> N3
> >     B2 --> N4
> >     B3 --> N5
> >     B4 --> N6
> >     B7 -- "rename" --> N7
> >     B8 --> N8
> >     B9 -- "rename" --> N9
> > ```
> >
> > ### A01 — Broken Access Control
> >
> > **Deskripsi.** *Access control* menegakkan batas kebijakan sehingga pengguna tidak dapat melampaui izin yang diberikan. Ketika gagal, akibatnya: **pengungkapan data tanpa izin, perubahan/penghapusan data, dan eksekusi fungsi bisnis yang seharusnya terbatas**. Kelemahan yang umum:
> >
> > - Memberi akses secara luas padahal seharusnya *default deny* (dibatasi per kapabilitas/peran/pengguna).
> > - Melewati kontrol lewat **manipulasi URL, modifikasi *state* internal, atau alat serang API** (Burp, curl).
> > - Mengakses akun orang lain lewat **identifier yang bisa ditebak** (*Insecure Direct Object Reference* / IDOR).
> > - Endpoint **POST, PUT, DELETE tanpa proteksi**.
> > - **Elevasi privilege** — bertindak sebagai pengguna lain tanpa login, atau sebagai admin saat login sebagai user biasa.
> > - Tampering **token JWT, cookie, atau *hidden field*** untuk menaikkan hak.
> > - **CORS salah konfigurasi** sehingga API bisa diakses origin tak berwenang.
> > - **Force browsing** — menebak URL halaman terbatas.
> >
> > Kategori ini kini juga mencakup **SSRF (CWE-918)** dan **CSRF** sebagai bentuk kegagalan kontrol akses. Statistik: **40 CWE**, incidence rate maks **20,15%**, ± **32.654 CVE**, ± 1,84 juta kemunculan.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi memakai parameter akun tanpa validasi di query SQL. Penyerang mengubah parameter `acct` di request sehingga bisa melihat rekening siapa pun — verifikasi kepemilikan tidak ada.
> > 2. **Force browsing**: penyerang cukup mengetik URL `/app/admin_getappInfo`. Halaman admin tidak mengecek autentikasi/otorisasi, sehingga user tak terautentikasi pun bisa membukanya.
> > 3. Kontrol akses hanya diterapkan di *front-end* (JavaScript). Penyerang memanggil API langsung lewat command line, melewati semua pembatasan browser.
> >
> > **Cara Pencegahan.**
> >
> > - **Default deny** kecuali sumber daya publik.
> > - Terapkan mekanisme kontrol akses **satu kali, dipakai ulang** di seluruh aplikasi; minimalkan ketergantungan pada CORS.
> > - Model kontrol akses menegakkan **kepemilikan record**, bukan sekadar CRUD global.
> > - Nonaktifkan *directory listing*; hapus file metadata/backup dari web root.
> > - **Log** kegagalan kontrol akses, beri alert ke admin bila berulang.
> > - **Rate limit** API untuk menghambat alat otomatis.
> > - Invalidasi session ID di sisi server saat logout; JWT dibuat berumur pendek atau pakai *refresh token* sesuai standar OAuth.
> > - Uji kontrol akses lewat **unit & integration test**.
> >
> > ### A02 — Security Misconfiguration
> >
> > **Deskripsi.** Terjadi ketika sistem, aplikasi, atau layanan cloud tidak disetel dengan aman. Indikator rentan:
> >
> > - *Hardening* kurang di salah satu lapisan *stack*, atau **izin cloud yang keliru**.
> > - **Fitur tak perlu aktif** (port, service, halaman, akun, framework, privilege).
> > - **Kredensial default** masih aktif dan belum diganti.
> > - **Pesan error** membocorkan *stack trace* dan detail sensitif.
> > - Fitur keamanan **dinonaktifkan atau salah setel** setelah upgrade.
> > - Kompatibilitas ke belakang diutamakan di atas konfigurasi aman.
> > - **Setelan default tidak aman** pada server, framework, library, database.
> > - **Security header** hilang atau salah setel.
> >
> > Statistik: **16 CWE**, incidence rate maks **27,70%**, ± 1.375 CVE, ± 719 ribu kemunculan.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Aplikasi contoh** (*sample app*) tidak dihapus dari server produksi. Salah satunya konsol admin dengan **kredensial default**; penyerang login dan mengambil alih server.
> > 2. **Directory listing aktif**. Penyerang melihat isi direktori, mengunduh kelas Java terkompilasi, men-*decompile*, lalu menemukan celah kontrol akses.
> > 3. Konfigurasi server mengirim **pesan error detail (stack trace)** ke pengguna, membocorkan versi komponen yang diketahui rentan.
> > 4. **Cloud storage** default terbuka ke internet, sehingga data sensitif bisa diakses siapa saja.
> >
> > **Cara Pencegahan.**
> >
> > - **Proses instalasi yang dapat diulang & terotomasi** (*hardening*), konfigurasi identik di dev/QA/prod, hanya kredensial yang berbeda.
> > - Platform **minimalis** — tanpa fitur, komponen, dokumentasi, sampel yang tidak dipakai.
> > - **Review konfigurasi berkala**, disinkronkan dengan patch/update (termasuk izin cloud storage).
> > - **Arsitektur tersegmentasi** — pemisahan komponen/tenant lewat segmentasi, kontainerisasi, atau kontrol keamanan cloud.
> > - Kirim **security header** ke klien.
> > - **Verifikasi konfigurasi otomatis** di semua environment.
> > - **Intersepsi pesan error terpusat** sebagai jaring pengaman.
> > - Gunakan *identity federation*, kredensial berumur pendek, atau mekanisme RBAC platform alih-alih *secret* statis yang ditanam.
> >
> > ### A03 — Software Supply Chain Failures
> >
> > **Deskripsi.** Kategori **baru 2025**, memperluas "Vulnerable and Outdated Components" (2021) menjadi **seluruh kegagalan/kompromi pada proses membangun, mendistribusikan, dan memperbarui perangkat lunak** — termasuk perubahan jahat pada kode pihak ketiga, *tooling*, dan dependensi. Indikator rentan:
> >
> > - Tidak melacak versi komponen (dependensi **langsung maupun transitif**).
> > - Memakai software usang, tak didukung, atau rentan di seluruh *stack*.
> > - Tidak rutin memindai kerentanan / mengikuti buletin keamanan.
> > - Tidak ada *change management* untuk elemen rantai pasok.
> > - *Hardening* & kontrol akses lemah di sepanjang rantai (repo kode, workstation developer, server build, CI/CD, artifact, registry).
> > - Tidak ada **pemisahan tugas** (*separation of duties*) di alur deploy.
> > - Mengambil komponen dari **sumber tak tepercaya**; patch/upgrade terlambat.
> > - Keamanan **pipeline CI/CD** lemah.
> >
> > Statistik: **6 CWE**, incidence rate rata-rata **5,72%**, ± 215 ribu kemunculan.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **SolarWinds (2019/2020)** — vendor tepercaya disusupi malware; sistem pelanggan ikut terkompromi saat mereka meng-*update*. ± 18.000 organisasi terdampak.
> > 2. **Bybit (2025)** — kompromi vendor pada *wallet software* yang berperilaku jahat hanya pada kondisi tertentu; pencurian senilai **US$1,5 miliar**.
> > 3. **Shai-Hulud (2025)** — *"npm worm"* pertama yang menyebar sendiri: versi paket jahat memakai *post-install script* untuk memanen data sensitif dan token npm, lalu menular ke paket lain. > 500 versi terdampak.
> > 4. **Kerentanan yang diketahui** — komponen berjalan dengan privilege aplikasi; contoh: CVE-2017-5638 (RCE Apache Struts 2), CVE-2021-44228 (**Log4Shell**, RCE Apache Log4j).
> >
> > **Cara Pencegahan.**
> >
> > - Buat & kelola **SBOM (Software Bill of Materials)** terpusat; lacak dependensi langsung & transitif.
> > - Inventarisasi versi komponen klien & server terus-menerus (OWASP **Dependency-Track**/**Dependency-Check**).
> > - Pantau **CVE, NVD, OSV**; otomasikan pelacakan kerentanan.
> > - Ambil komponen **hanya dari sumber resmi & tepercaya** lewat koneksi aman; **utamakan paket yang ditandatangani**.
> > - Pilih versi dependensi secara sengaja; deploy **bertahap / canary**.
> > - Untuk library tak terpelihara: pertimbangkan *virtual patch* bila migrasi tak memungkinkan.
> > - Amankan **repo kode** (cegah commit secret, proteksi branch, backup), **workstation developer** (patch, MFA, monitoring), **server build/CI-CD** (*separation of duties*, akses terkontrol, *signed build*, secret ber-*scope*), **artifact** (provenance, signing, timestamping), dan **infrastructure-as-code** (perlakukan seperti kode terkelola).
> > - Dokumentasikan semua perubahan pada CI/CD, repo, IDE, tooling SBOM, artifact, registry.
> >
> > ### A04 — Cryptographic Failures
> >
> > **Deskripsi.** Kegagalan (atau ketiadaan) kriptografi yang mengakibatkan data sensitif terekspos. Data **in transit** harus dienkripsi di *transport layer*; CPU modern & layanan seperti Let's Encrypt sudah menghapus hambatan lama. Selain itu organisasi harus menentukan data mana yang perlu **enkripsi at rest** dan enkripsi tambahan di *application layer* — mis. *password*, nomor kartu kredit, rekam medis, data pribadi, rahasia bisnis, terutama bila tunduk pada **GDPR** atau **PCI DSS**. Hal kritis:
> >
> > - Algoritma kriptografi **usang/lemah**.
> > - Kunci **default, lemah, atau dipakai ulang**; manajemen kunci buruk; kunci di **repo kode sumber**.
> > - Enkripsi tidak dipaksakan; *security header* hilang.
> > - Validasi sertifikat server & *trust chain* tidak benar.
> > - **IV (initialization vector)** tidak aman; mode enkripsi *deprecated* (mis. ECB, CBC bermasalah).
> > - **Password dipakai langsung sebagai kunci** tanpa KDF.
> > - Randomness non-kriptografis di konteks keamanan.
> > - Fungsi hash *deprecated* (**MD5, SHA-1**).
> >
> > Statistik: **32 CWE**, incidence rate maks **13,77%**, ± 2.185 CVE, ± 1,67 juta kemunculan.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Situs tidak memaksa TLS di semua halaman / mendukung enkripsi lemah. Penyerang di Wi-Fi publik **men-*downgrade* HTTPS → HTTP**, mencuri *session cookie*, lalu **membajak sesi** korban. Ia juga bisa mengubah semua data yang lewat, mis. mengganti penerima transfer uang.
> > 2. Database password memakai hash **tanpa salt** atau hash sederhana. Celah *file upload* memungkinkan penyerang mengunduh database; hash tanpa salt dibongkar dengan *rainbow table*, hash cepat dibongkar GPU meski di-*salt*.
> >
> > **Cara Pencegahan.**
> >
> > - **Klasifikasikan & beri label** data (sensitif menurut hukum privasi / regulasi / kebutuhan bisnis).
> > - Jangan simpan data sensitif yang tidak perlu; buang secepatnya atau pakai **tokenisasi/truncation** sesuai PCI DSS.
> > - **Enkripsi semua data sensitif at rest**; enkripsi semua data in transit dengan **TLS ≥ 1.2**, *forward secrecy*, tanpa cipher CBC, dukung algoritma pertukaran kunci *quantum*; paksa **HSTS**.
> > - Simpan kunci paling sensitif di **HSM** (hardware/cloud).
> > - Gunakan implementasi kripto yang **teruji**; selalu **authenticated encryption**.
> > - Simpan password dengan **hash adaptif ber-salt & *work factor*** — Argon2, yescrypt, scrypt, atau PBKDF2-HMAC-SHA-512.
> > - IV dipilih sesuai mode operasi (pakai **CSPRNG**); randomness kripto tidak di-*seed* dengan entropi rendah.
> > - Hindari MD5, SHA-1, mode CBC, padding PKCS#1 v1.5.
> > - Nonaktifkan *caching* untuk respons berisi data sensitif (CDN, web server, Redis).
> > - Jangan pakai protokol tanpa enkripsi (FTP, SMTP untuk data rahasia).
> > - **Siapkan Post-Quantum Cryptography (PQC)** — sistem berisiko tinggi harus aman selambatnya akhir 2030.
> >
> > ### A05 — Injection
> >
> > **Deskripsi.** "*Injection vulnerability* adalah cacat aplikasi yang membiarkan input pengguna tak tepercaya dikirim ke sebuah interpreter (browser, database, command line) dan menyebabkan interpreter mengeksekusi sebagian input itu sebagai perintah." Termasuk SQL, NoSQL, OS command, ORM, LDAP, EL/OGNL, dan **XSS (Cross-Site Scripting) kini masuk kategori ini**. Rentan bila:
> >
> > - Input tidak divalidasi/difilter/disanitasi.
> > - **Query dinamis atau pemanggilan non-parameterized** dipakai langsung tanpa *escaping* sadar-konteks.
> > - Data tak disanitasi dipakai di parameter pencarian ORM untuk menarik record sensitif.
> > - Data berbahaya dikonkatenasi langsung — struktur perintah + data jahat bercampur.
> >
> > Statistik: **37 CWE**, incidence rate maks **13,77%**, ± **62.445 CVE** (tertinggi di antara semua kategori), ± 1,4 juta kemunculan.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi mengonkatenasi data ke query SQL: `String query = "SELECT * FROM accounts WHERE custID='" + request.getParameter("id") + "'";` Penyerang mengisi `id` dengan `' OR '1'='1` → seluruh tabel `accounts` dikembalikan.
> > 2. Query **HQL** dikonkatenasi serupa; penyerang mengisi `' OR custID IS NOT NULL OR custID='` untuk mengakses semua akun.
> > 3. Input mengalir ke **OS command**: `String cmd = "nslookup " + request.getParameter("domain"); Runtime.getRuntime().exec(cmd);` Penyerang mengisi `example.com; cat /etc/passwd` → eksekusi perintah arbitrer di server.
> >
> > **Cara Pencegahan.**
> >
> > - **Pisahkan data dari perintah/query.** Pilihan utama: **safe API / parameterized interface**, atau migrasi ke **ORM** (tetap hati-hati pada parameter pencarian ORM).
> > - **Validasi input positif di sisi server** (*allowlist*) — bukan pertahanan penuh karena banyak aplikasi butuh karakter khusus.
> > - Untuk sisa query dinamis: **escape karakter khusus** dengan sintaks *escape* spesifik interpreter.
> > - Pakai `LIMIT` dan kontrol SQL lain untuk membatasi kebocoran massal.
> >
> > ### A06 — Insecure Design
> >
> > **Deskripsi.** *"Missing or ineffective control design"* — kelemahan yang berakar pada **desain**, bukan implementasi. Perbedaan kunci: *"Desain yang aman masih bisa punya cacat implementasi… tetapi **desain yang tidak aman tidak bisa diperbaiki oleh implementasi yang sempurna** karena kontrol keamanan yang dibutuhkan memang tidak pernah dibuat."* Tiga komponen *secure design*:
> >
> > - **Requirements & resource management** — kumpulkan kebutuhan proteksi CIA + authenticity, tingkat eksposur tenant, dan anggarkan aktivitas keamanan.
> > - **Secure design** — budaya & metodologi yang terus mengevaluasi ancaman; **threat modeling** disatukan ke sesi *refinement*, asumsi didokumentasikan.
> > - **Secure development lifecycle** — pola desain aman, *paved road*, library komponen aman, *tooling*, threat modeling, *incident post-mortem*.
> >
> > Statistik: **39 CWE**, incidence rate maks **22,18%**, ± 7.647 CVE.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Pemulihan kredensial via "pertanyaan keamanan"** melanggar NIST 800-63b & OWASP ASVS — jawaban bisa diketahui lebih dari satu orang, jadi bukan bukti identitas.
> > 2. **Bioskop** memberi diskon rombongan hingga 15 kursi tanpa deposit. Penyerang mengeksploitasi *business logic*: memesan **600 kursi** di banyak bioskop sekaligus → kerugian pendapatan besar.
> > 3. **E-commerce** tanpa proteksi bot: *scalper* memborong stok terbatas (mis. kartu grafis). Aturan domain (pembelian dalam hitungan detik sejak stok tersedia) bisa menandai transaksi tak wajar.
> >
> > **Cara Pencegahan.**
> >
> > - Tegakkan **SDLC aman** dengan bantuan profesional AppSec.
> > - Bangun **library pola desain aman** / komponen *paved road*.
> > - **Threat modeling** untuk autentikasi, kontrol akses, logika bisnis, dan alur kritis.
> > - Sisipkan bahasa keamanan ke **user story**; tulis **unit/integration test** yang memvalidasi alur kritis terhadap *threat model*, termasuk *misuse case*.
> > - **Plausibility check** di setiap lapis aplikasi.
> > - **Segregasi lapisan** menurut eksposur & kebutuhan proteksi; **tenant segregation by design**.
> >
> > ### A07 — Authentication Failures
> >
> > **Deskripsi.** Sebelumnya "Identification and Authentication Failures"; **diganti nama** menjadi "Authentication Failures" agar lebih akurat mencerminkan 36 CWE-nya. Terjadi ketika penyerang membuat sistem menerima pengguna ilegitim sebagai sah. Aplikasi lemah bila:
> >
> > - Membiarkan **credential stuffing** (pasangan user/pass hasil kebocoran), termasuk *hybrid attack* yang memodifikasi password secara sistematis.
> > - Tidak cepat memblokir **brute force / serangan terotomasi**.
> > - Menerima password **default/lemah/umum** ("Password1", "admin/admin").
> > - Membiarkan registrasi dengan kredensial yang sudah bocor.
> > - Mekanisme **pemulihan password lemah** ("knowledge-based answers").
> > - Menyimpan password *plain text*, ter-enkripsi (reversibel), atau hash lemah.
> > - **MFA kurang** atau *fallback*-nya lemah.
> > - **Session ID** diekspos di URL, dipakai ulang setelah login, atau tidak diinvalidasi saat logout/idle.
> > - Tidak memvalidasi *scope* & *audience* kredensial (JWT).
> >
> > Statistik: **36 CWE**, incidence rate maks **15,80%**, ± 7.147 CVE.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Credential stuffing** dengan daftar kredensial bocor. Varian modern menaikkan pola: `Winter2025` → `Winter2026`, `ILoveMyDog6` → `ILoveMyDog7`. Tanpa pertahanan otomatis, aplikasi menjadi **password oracle**.
> > 2. **Autentikasi hanya password** ada di balik sebagian besar kebocoran. Praktik lama (kompleksitas + rotasi wajib) justru mendorong pemakaian ulang & password lemah; NIST 800-63 menyarankan menghapusnya dan memakai MFA untuk sistem kritis.
> > 3. **Timeout sesi salah**: user menutup tab tanpa logout, sesi tetap aktif. Di lingkungan **SSO**, *Single Logout* yang gagal membuat user masih terautentikasi ke sistem lain. Orang lain di komputer yang tak terkunci mewarisi sesi aktif.
> >
> > **Cara Pencegahan.**
> >
> > - **MFA** sedapat mungkin — menangkal credential stuffing & reuse.
> > - Dorong pemakaian **password manager**; jangan deploy dengan **kredensial default** (terutama admin).
> > - Uji password lemah terhadap **daftar password paling sering bocor**; cek kredensial baru terhadap database *breach*.
> > - Kebijakan password ikut **NIST 800-63b**; **jangan wajibkan rotasi** kecuali ada indikasi kompromi.
> > - Perkuat endpoint registrasi/pemulihan/API terhadap **enumerasi akun** — pesan seragam.
> > - **Rate limit** login gagal (tanpa menciptakan DoS); log & alert.
> > - **Session manager sisi server** — ID acak entropi tinggi, dibuat ulang setelah login, disimpan aman, diinvalidasi tepat waktu.
> > - Untuk JWT: validasi klaim `aud`, `iss`, dan *scope*.
> >
> > ### A08 — Software or Data Integrity Failures
> >
> > **Deskripsi.** *"…kode dan infrastruktur yang tidak melindungi dari kode atau data yang tidak valid / tak tepercaya diperlakukan sebagai tepercaya dan valid."* Contoh akar masalah: plugin/library/modul dari sumber tanpa verifikasi memadai; **pipeline CI/CD** yang tidak memverifikasi artifact sebelum integrasi; fitur **auto-update tanpa verifikasi integritas** (penyerang bisa menyebar update jahat ke semua instalasi); serta **insecure deserialization** — objek/data yang di-*serialize* ke struktur yang bisa dilihat & diubah penyerang.
> >
> > Statistik: **14 CWE**, incidence rate maks **8,98%**, ± 3.331 CVE, impact tertimbang **4,79** (salah satu tertinggi).
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Fungsionalitas web dari sumber tak tepercaya** — perusahaan memetakan DNS `myCompany.SupportProvider.com` → `support.myCompany.com`; akibatnya **semua cookie** (termasuk cookie autentikasi) di domain `myCompany.com` ikut terkirim ke penyedia support.
> > 2. **Update tanpa *signing*** — banyak router rumah, *set-top box*, firmware perangkat tidak memverifikasi update dengan firmware bertanda tangan; firmware tak tertandatangani jadi target yang makin besar.
> > 3. **Paket dari sumber tak tepercaya** — developer tak menemukan versi paket di *package manager* resmi, lalu mengunduhnya dari sebuah situs. Paket tak ditandatangani → tak ada jaminan integritas; ternyata berisi kode jahat.
> > 4. **Insecure deserialization** — aplikasi React memanggil microservice Spring Boot; *user state* di-*serialize* dan dikirim bolak-balik tiap request. Penyerang melihat tanda objek Java `rO0` (base64), memakai *Java Deserialization Scanner* → **RCE** di server aplikasi.
> >
> > **Cara Pencegahan.**
> >
> > - Pakai **tanda tangan digital** untuk memverifikasi software/data berasal dari sumber yang diharapkan & tak diubah.
> > - Pastikan library/dependensi (npm, Maven) hanya dari **repositori tepercaya**.
> > - **Review** setiap perubahan kode & konfigurasi.
> > - Pastikan **pipeline CI/CD** ber-segregasi, terkonfigurasi, dan ber-kontrol akses yang menjaga integritas kode.
> > - Jangan terima **data serialized tak bertanda tangan / tak terenkripsi** dari klien tak tepercaya tanpa *integrity check*.
> >
> > ### A09 — Security Logging and Alerting Failures
> >
> > **Deskripsi.** Sebelumnya "Security Logging and **Monitoring** Failures"; **diganti nama** menjadi "…**Alerting** Failures" untuk menekankan bahwa log harus **memicu tindakan**. Organisasi gagal ketika tidak bisa mendeteksi serangan/kebocoran karena logging, monitoring, deteksi, atau alerting yang kurang. Titik kegagalan antara lain:
> >
> > - Event auditable (login, login gagal) **tidak dicatat** atau tidak konsisten.
> > - Warning/error tidak menghasilkan log memadai.
> > - **Integritas log** tidak dilindungi dari tampering; log hanya disimpan lokal tanpa backup.
> > - Aplikasi/API **tidak dimonitor** untuk pola mencurigakan.
> > - **Ambang alert & proses respons** tidak ada / tidak efektif.
> > - Pentest/scanner **tidak memicu alert**.
> > - Sistem tak bisa mendeteksi/eskalasi serangan **real-time**.
> > - Data sensitif/PII **terekspos di dalam log**; log rentan *log injection* karena tak di-*encode*.
> > - **Alert fatigue** — terlalu banyak *false positive*; *playbook* respons usang.
> >
> > Statistik: **5 CWE**, incidence rate maks **11,33%**, ± 723 CVE.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Operator situs **asuransi kesehatan anak** gagal mendeteksi kebocoran selama **> 7 tahun** karena tak ada monitoring/logging. Pemberitahuan datang dari pihak luar; penyerang telah mengakses & mengubah rekam medis **3,5 juta anak**.
> > 2. **Maskapai India** mengalami kebocoran **10 tahun** data penumpang (paspor, kartu kredit). Penyedia cloud pihak ketiga baru memberitahu setelah jeda.
> > 3. **Maskapai Eropa** — celah aplikasi pembayaran; penyerang memanen **> 400.000** rekaman pembayaran. Regulator privasi menjatuhkan denda **£20 juta** (GDPR).
> >
> > **Cara Pencegahan.**
> >
> > - **Catat event autentikasi** (login gagal, pelanggaran kontrol akses, kegagalan validasi sisi server) dengan konteks cukup untuk forensik, disimpan cukup lama.
> > - Catat **sukses & gagal** setiap kontrol keamanan; hasilkan log dalam **format yang kompatibel** dengan solusi manajemen log.
> > - **Cegah log injection** — *encode* data log; jaga **integritas** dengan *append-only table* / audit trail tahan-tamper.
> > - **Fail securely** — transaksi yang error di-*rollback* & diulang; selalu *fail closed*.
> > - Tetapkan **protokol alerting**; DevSecOps & tim keamanan mendefinisikan *use case* & *playbook* untuk SOC.
> > - Pasang **honeytoken** — jebakan di database/identitas; aksesnya memicu alert andal dengan *false positive* minimal.
> > - Siapkan **rencana incident response** (NIST 800-61r2 atau lebih baru); alat seperti **OWASP ModSecurity Core Rule Set** dan *ELK stack*.
> >
> > ### A10 — Mishandling of Exceptional Conditions
> >
> > **Deskripsi.** Kategori **baru 2025**. Sebelumnya tersembunyi di bawah "poor code quality" yang dinilai **terlalu kabur**; kini difokuskan pada **penanganan error/eksepsi**. *"Terjadi ketika program gagal mencegah, mendeteksi, dan merespons situasi tak lazim dan tak terduga, yang menyebabkan crash, perilaku tak terduga, dan kadang kerentanan."* Tiga kegagalan inti: aplikasi **tidak mencegah** situasi tak lazim, **tidak mengenalinya** saat terjadi, atau **merespons dengan buruk** setelahnya. Akar masalah: validasi input kurang, penanganan error ditunda ke level tinggi (bukan di titik asal), state lingkungan tak terduga (memori, privilege, jaringan), penanganan eksepsi inkonsisten/hilang. Akibat: *logic bug*, overflow, *race condition*, transaksi curang, masalah resource/state/timing/authz — mengancam CIA.
> >
> > Statistik: **24 CWE**, incidence rate maks **20,67%**, ± 3.416 CVE.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Denial of Service** — aplikasi menangkap eksepsi *file upload* tetapi **tidak melepaskan resource** sesudahnya. Tiap eksepsi mengunci resource → akhirnya habis, layanan mati.
> > 2. **Sensitive Data Exposure** — error database membocorkan info sistem; penyerang **sengaja memicu error** untuk mengumpulkan intel guna menyusun serangan SQL injection.
> > 3. **Korupsi transaksi keuangan** — penyerang menyela transaksi multi-langkah (debit → kredit → catat) lewat gangguan jaringan. Tanpa *rollback*, penyerang menguras rekening atau mengeksploitasi *race condition* untuk mengirim uang berkali-kali.
> >
> > **Cara Pencegahan.**
> >
> > - **Tangkap error di titik asalnya** dan tangani secara berarti; sertakan *throwing*, logging, dan alert lokal.
> > - Pasang **global exception handler** sebagai *fallback*.
> > - **Observability** — deteksi error berulang / pola serangan untuk memicu blokir/pertahanan.
> > - **Fail securely** — *rollback* semua komponen transaksi lalu ulang; *fail closed*.
> > - Terapkan **batas resource** — *rate limiting*, kuota, *throttling*.
> > - **Validasi input terpusat** dengan sanitasi/escaping karakter berbahaya; **penanganan eksepsi terpusat & konsisten** di seluruh aplikasi dan organisasi.
> > - Lakukan **threat modeling, secure design review, code review, static analysis, stress/penetration testing**.
> >
> > ### Perubahan dari Edisi 2021
> >
> > - **Kategori baru:**
> >   - **A03 Software Supply Chain Failures** — perluasan besar dari "Vulnerable and Outdated Components" (A06:2021), kini mencakup seluruh proses build/distribusi/update.
> >   - **A10 Mishandling of Exceptional Conditions** — menggantikan payung "poor code quality" yang kabur.
> > - **Penggabungan:** **SSRF** (A10:2021) diserap ke **A01 Broken Access Control**.
> > - **Pergeseran peringkat:** A02 Security Misconfiguration **#5 → #2**; Cryptographic Failures **#2 → #4**; Injection **#3 → #5**; Insecure Design **#4 → #6**.
> > - **Ganti nama:** "Identification and Authentication Failures" → **"Authentication Failures"** (A07); "Security Logging and Monitoring Failures" → **"Security Logging and Alerting Failures"** (A09).
> > - **Bertahan di #1:** Broken Access Control tetap risiko paling kritis.

> [!cornell] #### Summary
>
> **OWASP Top 10:2025** adalah rilis ke-8 dari _standard awareness document_ OWASP — **konsensus risiko keamanan aplikasi web paling kritis**, disusun dengan pendekatan *data-informed but not blindly data-driven*: **8 kategori dari data** > 2,8 juta aplikasi (13 organisasi, ± 175.000 CVE, 589 CWE) dan **2 kategori dari _community survey_**. Peringkat memakai **incidence rate** (seberapa umum sebuah CWE) plus **exploitability & impact** dari CVE/CVSS. **Broken Access Control** tetap **#1** dan kini menyerap **SSRF**. Dua kategori benar-benar baru: **A03 Software Supply Chain Failures** (perluasan "Vulnerable and Outdated Components", dipicu SolarWinds, Log4Shell, worm npm) dan **A10 Mishandling of Exceptional Conditions** (menggantikan "poor code quality"). **Security Misconfiguration** melonjak ke **#2**, sementara **Cryptographic Failures**, **Injection** (mencakup XSS), dan **Insecure Design** turun peringkat. **A07** dan **A09** berganti nama untuk menegaskan fokus pada *authentication* dan *alerting*. Bandingkan dengan [[OWASP Top 10 2021]] dan lihat garis evolusinya sejak [[OWASP Top 10 2017]].

> [!ad-libitum]- Additional Information
>
> #### Membaca angka OWASP dengan benar
>
> - **Incidence rate ≠ frequency.** Sejak metodologi 2017–2021, OWASP memakai *incidence rate* (persentase aplikasi yang punya ≥ 1 instance CWE) alih-alih *frequency* (jumlah temuan). Ini menghindari bias alat pemindai yang melaporkan ribuan instance dari satu pola.
> - **Kategori = kelompok akar masalah (CWE), bukan gejala.** Karena itu satu serangan nyata (mis. pencurian sesi) bisa memetakan ke beberapa kategori (Cryptographic Failures + Authentication Failures).
> - **8 + 2.** Ingat: 8 kategori dipilih dari data, 2 dari survei — kategori survei (mis. Insecure Design pada 2021, Supply Chain pada 2025) sengaja dinaikkan karena belum bisa diukur alat otomatis.
>
> #### Sumber daya OWASP pendukung (bukan bagian dari daftar, tapi selalu dirujuk)
>
> - **OWASP ASVS** (Application Security Verification Standard) — daftar requirement keamanan yang bisa diuji.
> - **OWASP Proactive Controls** — 10 kontrol yang harus dibangun sejak awal.
> - **OWASP Cheat Sheet Series** & **Web Security Testing Guide (WSTG)** — panduan teknis per topik.
> - **OWASP Dependency-Track / Dependency-Check** — untuk A03.
> - **OWASP ModSecurity Core Rule Set** — untuk A09.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil 3 CVE terkenal (mis. Log4Shell CVE-2021-44228, Struts CVE-2017-5638, dan satu SSRF) lalu petakan masing-masing ke kategori Top 10:2025 — jelaskan mengapa.
> 2. Lakukan mini *threat modeling* (STRIDE) pada satu fitur aplikasi kuliahmu, dan tandai kategori Top 10 yang relevan per ancaman.
> 3. Bandingkan tabel peringkat 2017 → 2021 → 2025 untuk satu kategori (mis. Injection) dan tulis narasi mengapa ia bergerak.
>
> #### Bacaan Lanjutan
>
> - OWASP Top 10:2025 — halaman resmi: `https://owasp.org/Top10/2025/`
> - MITRE CWE Top 25 Most Dangerous Software Weaknesses (pembanding berbasis CWE).
> - NIST SP 800-63B (autentikasi), NIST SP 800-61r2 (incident response), NIST SP 800-218 SSDF (rantai pasok).
