---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] OWASP Top 10 2007
>
> > ## Questions/Cues
> >
> > - Apa metodologi 2007 (data MITRE 2006) dan apa bedanya dari edisi 2004?
> > - Apa 10 kerentanan 2007 dan urutannya?
> > - Mengapa CSRF (peringkat mentah MITRE #36) dan Insecure Communications tetap dimasukkan?
> > - Isu apa yang dihapus dari [[OWASP Top 10 2004]] dan mengapa?
> > - Contoh konstruksi rentan untuk Malicious File Execution dan Insecure Direct Object Reference?
> >
> > ## Reference Points
> >
> > - IF5161 — OWASP Top 10 2007: The Ten Most Critical Web Application Security Vulnerabilities (2007 Update)
> > - IF5161 — GitHub OWASP/Top10 — `2007/OWASP Top 10 2007.pdf` (Halaman 8-32)
>
> > ### Konteks & Metodologi
> >
> > **OWASP Top 10 2007** adalah **edisi yang ditulis ulang total**; berbeda dari 2004 yang mencampur *attack, vulnerability,* dan *countermeasure*, edisi ini **fokus semata pada _vulnerability_**. Ia menegaskan diri sebagai **"education piece, not a standard"** — *"jangan mengadopsi dokumen ini sebagai kebijakan/standar tanpa berbicara dulu dengan kami."* Untuk standar sejati OWASP menunjuk proyek *secure coding policy/standard*.
> >
> > **Metodologi:** *"sederhana — ambil **MITRE Vulnerability Trends untuk 2006**, dan distilasi menjadi 10 isu keamanan aplikasi web teratas."* Pemetaan 1:1 dari data mentah MITRE ke judul bagian sebagian besar dipertahankan, tetapi **beberapa kategori sengaja diubah agar lebih memetakan ke _root cause_**. Rekomendasi proteksi diberikan untuk tiga framework paling umum: **Java EE, ASP.NET, PHP**.
> >
> > **Bias metodologi (disebut eksplisit):** metodologi ini condong ke penemuan komunitas peneliti keamanan — mirip pola serangan *"script kiddy"*. Melindungi dari Top 10 memberi proteksi dasar terhadap serangan paling umum dan **menetapkan arah** perbaikan keamanan.
> >
> > *Catatan: edisi 2007 belum memakai tabel rating Exploitability/Prevalence/Detectability/Impact — sistem itu baru diperkenalkan pada [[OWASP Top 10 2010]].*
> >
> > ### Daftar OWASP Top 10 2007
> >
> > | # | Kerentanan | Ringkasan (dari dokumen) |
> > |---|---|---|
> > | **A1** | Cross Site Scripting (XSS) | Data pengguna dikirim ke browser tanpa validasi/encoding → skrip jalan di browser korban |
> > | **A2** | Injection Flaws | Data pengguna dikirim ke interpreter sebagai bagian perintah/query (SQL, LDAP, XPath, OS, dll.) |
> > | **A3** | Malicious File Execution **(NEW)** | *Remote File Inclusion* (RFI) — kode/data jahat di-*include*, diproses, atau dieksekusi server |
> > | **A4** | Insecure Direct Object Reference | Referensi objek internal (file, direktori, record/key DB) diekspos sebagai URL/parameter form tanpa cek akses |
> > | **A5** | Cross Site Request Forgery (CSRF) **(NEW)** | Browser korban yang login dipaksa mengirim request *pre-authenticated* ke aplikasi rentan |
> > | **A6** | Information Leakage and Improper Error Handling | Aplikasi membocorkan info konfigurasi / internal / privasi lewat pesan error atau perbedaan respons/timing |
> > | **A7** | Broken Authentication and Session Management | Kredensial & token sesi tak dilindungi sepanjang siklus hidupnya |
> > | **A8** | Insecure Cryptographic Storage | Data sensitif tak dienkripsi, atau kripto salah desain/pakai |
> > | **A9** | Insecure Communications **(NEW)** | Trafik jaringan sensitif tak dienkripsi (front-end maupun back-end) |
> > | **A10** | Failure to Restrict URL Access | Fungsi sensitif hanya dilindungi dengan menyembunyikan link — *security by obscurity* |
> >
> > ```mermaid
> > flowchart LR
> >     subgraph S2004["2004"]
> >         O1["A1 Unvalidated Input"]
> >         O2["A2 Broken Access Control"]
> >         O3["A3 Broken Auth &amp; Session Mgmt"]
> >         O4["A4 XSS"]
> >         O5["A5 Buffer Overflows"]
> >         O6["A6 Injection Flaws"]
> >         O7["A7 Improper Error Handling"]
> >         O8["A8 Insecure Storage"]
> >         O9["A9 Denial of Service"]
> >         O10["A10 Insecure Configuration Management"]
> >     end
> >     subgraph S2007["2007"]
> >         N1["A1 XSS"]
> >         N2["A2 Injection Flaws"]
> >         N3["A3 Malicious File Execution (NEW)"]
> >         N4["A4 Insecure Direct Object Reference"]
> >         N5["A5 CSRF (NEW)"]
> >         N6["A6 Information Leakage &amp; Improper Error Handling"]
> >         N7["A7 Broken Auth &amp; Session Mgmt"]
> >         N8["A8 Insecure Cryptographic Storage"]
> >         N9["A9 Insecure Communications (NEW)"]
> >         N10["A10 Failure to Restrict URL Access"]
> >     end
> >     O4 --> N1
> >     O6 --> N2
> >     O2 -- "dipecah" --> N4
> >     O2 -- "dipecah" --> N10
> >     O7 -- "diperluas" --> N6
> >     O3 --> N7
> >     O8 -- "rename" --> N8
> >     O10 -- "sebagian jadi" --> N9
> >     O1 -- "dihapus (jadi bagian solusi item lain)" --> X1["dihapus"]
> >     O5 -- "dihapus (isu C/C++, bukan web)" --> X5["dihapus"]
> >     O9 -- "dihapus (rank MITRE rendah)" --> X9["dihapus"]
> > ```
> >
> > ### A1 — Cross Site Scripting (XSS)
> >
> > **Deskripsi.** XSS sebenarnya **subset dari HTML injection** — *"isu keamanan aplikasi web paling prevalen dan paling merusak."* Terjadi kapan pun aplikasi mengambil data yang berasal dari pengguna dan mengirimkannya ke browser **tanpa lebih dulu memvalidasi atau meng-*encode*** konten itu. Semua framework aplikasi web rentan. Tiga tipe: **reflected, stored, DOM injection**. Dampak: pembajakan sesi, defacement, penyisipan konten jahat, phishing, pengambilalihan browser via *scripting malware*; skrip bisa memanipulasi **XmlHttpRequest** untuk membuat *worm* dan *zombie* selama browser terbuka.
> >
> > **Kerentanan.** Reflected paling mudah: `echo $_REQUEST['userinput'];`. Stored: data jahat disimpan (file/DB) lalu ditampilkan ke pengguna lain tanpa filter — sangat berbahaya di CMS/blog/forum.
> >
> > **Verifikasi Keamanan.** Tujuan: verifikasi **semua parameter divalidasi dan/atau di-*encode*** sebelum masuk halaman HTML. *Automated pentest* menemukan reflected XSS lewat *parameter injection* tetapi sering gagal untuk *persistent XSS*; **tidak ada tool yang menemukan DOM-based XSS** → aplikasi berbasis AJAX berisiko bila hanya diuji otomatis.
> >
> > **Proteksi.** Kombinasi **validasi "whitelist"** semua input + **encoding kuat** semua output.
> >
> > - **Input validation** — mekanisme standar untuk validasi panjang/tipe/sintaks/aturan bisnis; strategi *"accept known good"*; **tolak** input tak valid, jangan disanitasi. Ingat: pesan error juga bisa memuat data tak valid.
> > - **Strong output encoding** — *entity-encode* semua data pengguna (HTML/XML) sebelum di-*render*; encode semua karakter kecuali subset sangat terbatas (pendekatan Microsoft Anti-XSS Library / OWASP PHP Anti-XSS). Tetapkan *character encoding* tiap halaman.
> > - **Jangan pakai "blacklist"** — mengganti beberapa karakter (`<`, `>`, `script`) lemah & sudah berhasil ditembus.
> > - **Awasi _canonicalization error_** — input harus di-*decode* & di-*canonicalize* ke representasi internal sebelum divalidasi; jangan *decode* dua kali.
> > - **Java:** `<bean:write>`, `<c:out escapeXml="true">` — JANGAN `<%= … %>` telanjang. **.NET:** Microsoft Anti-XSS Library 1.5. **PHP:** `htmlentities()` / `htmlspecialchars()`; nonaktifkan `register_globals`.
> >
> > ### A2 — Injection Flaws
> >
> > **Deskripsi.** *"Injection terjadi ketika data pengguna dikirim ke interpreter sebagai bagian perintah atau query."* Banyak jenis: **SQL, LDAP, XPath, XSLT, HTML, XML, OS command**, dll. Memungkinkan penyerang **membuat/membaca/mengubah/menghapus data arbitrer**; kasus terburuk: **kompromi aplikasi & sistem di baliknya secara penuh, bahkan melewati _firewall_ berlapis**.
> >
> > **Kerentanan.**
> >
> > - PHP: `$sql = "SELECT * FROM table WHERE id = '" . $_REQUEST['id'] . "'";`
> > - Java: `String query = "SELECT user_id FROM user_data WHERE user_name = '" + req.getParameter("userID") + "' and user_password = '" + req.getParameter("pwd") + "'";`
> >
> > **Verifikasi Keamanan.** Tujuan: verifikasi **data pengguna tidak dapat mengubah _makna_** perintah/query. Cara paling efisien & akurat: **cek kode** yang memanggil interpreter — verifikasi *safe API* atau validasi/encoding yang tepat. Pengujian sangat memakan waktu dengan cakupan rendah.
> >
> > **Proteksi.** Hindari interpreter bila bisa; bila harus, kunci utamanya **_safe API_** — *strongly typed parameterized query* & **ORM**. Selain itu:
> >
> > - **Input validation** ("accept known good"), tolak input tak valid.
> > - **Parameterized query API** dengan *placeholder*, bahkan saat memanggil *stored procedure* (yang tetap bisa injeksi via `exec()` / konkatenasi argumen di dalamnya).
> > - **Least privilege** saat konek ke database & sistem back-end.
> > - Hindari pesan error detail; hindari **fungsi escape sederhana** (`addslashes()`, `str_replace("'", "''")`) — lemah & sudah ditembus. **Nama tabel tidak bisa di-escape.**
> > - **Java EE:** `PreparedStatement`, Hibernate/Spring. **.NET:** `SqlCommand` + `SqlParameter` atau ORM. **PHP:** PDO + `bindParam()`.
> >
> > ### A3 — Malicious File Execution **(kategori baru 2007)**
> >
> > **Deskripsi.** **Peringkat mentah MITRE #3.** Developer sering **memakai/mengonkatenasi input berbahaya langsung** dengan fungsi file/stream, atau mempercayai file input secara keliru. Framework mengizinkan **referensi objek eksternal** (URL / referensi *file system*); bila data kurang diperiksa → **konten jahat remote di-*include*/diproses/dieksekusi** oleh web server. Memungkinkan **RCE, instalasi rootkit remote & kompromi sistem penuh**; di Windows, kompromi internal via *SMB file wrapper* PHP. **Sangat prevalen di PHP** (*Remote File Inclusion* / RFI).
> >
> > **Kerentanan.** Konstruksi umum yang rentan: `include $_REQUEST['filename'];`. Metode serang lain: data jahat diunggah ke *session file*/log/unggahan gambar; *wrapper* `php://input`, `zlib://`, `ogg://`, `data:;base64,…` untuk melewati `allow_url_include`; DTD jahat di dokumen XML memaksa parser memuat DTD remote (port scanning di balik firewall). Kerusakan **berbanding lurus dengan kekuatan _sandbox_/isolasi platform** — PHP jarang terisolasi & tanpa konsep sandbox, jadi dampaknya jauh lebih buruk.
> >
> > **Proteksi.** Butuh perencanaan sejak arsitektur & desain. Aplikasi yang ditulis baik **tidak memakai input pengguna dalam nama file** sumber daya server apa pun, dan punya **firewall rule** yang mencegah koneksi keluar baru.
> >
> > - **Indirect object reference map** (lih. A4) — mis. `value="78463a384a5aa4fad5fa73e2f506ecfc"` alih-alih `value="English"`; atau *index* 1, 2, 3 dengan cek batas array.
> > - **_Taint checking_ eksplisit** / skema penamaan variabel: `$hostile = &$_POST; $safe['filename'] = validate_file_name($hostile['unsafe_filename']);`
> > - **Firewall rule** mencegah web server konek ke situs eksternal / sistem internal; isolasi web server bernilai tinggi di **VLAN / subnet privat**.
> > - Pertimbangkan **chroot jail / virtualisasi / sandbox**.
> > - **PHP:** nonaktifkan `allow_url_fopen` & `allow_url_include` di `php.ini`; vet semua fungsi `stream_*`; jauhkan input pengguna dari `include()`, `require()`, `fopen()`, `file_get_contents()`, `move_uploaded_file()`, dll.; sangat hati-hati dengan `system()`, `eval()`, `passthru()`, backtick. **J2EE:** aktifkan & konfigurasi *security manager*. **ASP.NET:** desain segmentasi *trust*, mayoritas aplikasi di *trust state* serendah mungkin.
> >
> > ### A4 — Insecure Direct Object Reference
> >
> > **Deskripsi.** Developer mengekspos referensi ke **objek implementasi internal** (file, direktori, record/key DB) sebagai **URL atau parameter form**; tanpa cek kontrol akses, penyerang **memanipulasi referensi** untuk mengakses objek lain. Contoh: aplikasi *Internet Banking* memakai nomor rekening sebagai *primary key* dan menaruhnya langsung di antarmuka — meski query SQL parameterized (anti SQL injection), tanpa cek "user = pemilik rekening", penyerang mengubah parameter dan **melihat/mengubah semua rekening**.
> >
> > *Kasus nyata: situs **Australian Taxation Office GST Start Up Assistance** (2000) — pengguna sah tetapi jahat mengubah **ABN** (tax id) di URL, memanen ± **17.000 detail perusahaan**, lalu meng-email setiap perusahaan itu tentang serangannya.*
> >
> > **Kerentanan.**
> >
> > - *Path traversal* via `null byte`: `require_once ($_REQUEST['language']."lang.php");` diserang dengan `"../../../../etc/passwd%00"`.
> > - Menebak *database key* sekuensial: `int cartID = Integer.parseInt(request.getParameter("cartID")); String query = "SELECT * FROM table WHERE cartID=" + cartID;` — penyerang mengganti `cartID` ke keranjang mana pun.
> >
> > **Verifikasi Keamanan.** Tujuan: verifikasi aplikasi **tidak mengizinkan referensi objek langsung dimanipulasi** penyerang. *Code review* dapat menelusuri parameter kritis; *scanner* & *static analysis* sulit menentukan parameter mana yang butuh cek kontrol akses.
> >
> > **Proteksi.** Hindari mengekspos referensi objek langsung; pakai **index / _indirect reference map_** yang mudah divalidasi. Bila referensi langsung terpaksa dipakai, **verifikasi otorisasi sebelum memakainya**. Bila terpaksa mengekspos struktur DB, pastikan query hanya menampilkan record berwenang: `String query = "SELECT * FROM table WHERE cartID=" + cartID + " AND userID=" + user.getID();`
> >
> > ### A5 — Cross Site Request Forgery (CSRF) **(kategori baru 2007)**
> >
> > **Deskripsi.** *"Bukan serangan baru, tetapi sederhana dan menghancurkan."* Memaksa **browser korban yang login** mengirim request ke aplikasi rentan, yang lalu **menjalankan aksi atas nama korban**. Rentan bila aplikasi mengotorisasi request **hanya berdasarkan kredensial yang otomatis dikirim browser** — *session cookie*, *basic auth*, IP sumber, sertifikat SSL, kredensial domain Windows. Peringkat mentah MITRE hanya **#36**, tetapi OWASP menilainya **cukup penting** sehingga aplikasi bernilai tinggi harus mulai memproteksi hari ini. Juga dikenal sebagai *Session Riding, One-Click Attack, XSRF*.
> >
> > **Kerentanan.** Tag di halaman mana pun yang dilihat korban menghasilkan request:
> >
> > - Logout paksa: `<img src="http://www.example.com/logout.php">`
> > - Transfer dana: `<img src="http://www.example.com/transfer.do?frmAcct=...&toAcct=4345754&amt=3434.43">`
> >
> > *Jeremiah Grossman (BlackHat 2006) mendemonstrasikan memaksa pengguna mengubah setelan router DSL-nya tanpa persetujuan, memakai akun default router.* **XSS tidak dibutuhkan** untuk CSRF, tetapi aplikasi dengan XSS **selalu** rentan CSRF (XSS bisa mencuri token anti-CSRF).
> >
> > **Proteksi.** Satu-satunya solusi: **_custom token_ yang tidak "diingat" & dikirim otomatis oleh browser**.
> >
> > - **Hilangkan semua kerentanan XSS** (lih. A1).
> > - **Sisipkan token acak kustom** ke setiap form & URL: `<input type="hidden" name="8438927730" value="43847384383">`, lalu verifikasi tokennya benar untuk user saat ini. Makin fokus token ke fungsi/data tertentu → makin kuat.
> > - Untuk data/transaksi sensitif: **re-autentikasi** atau **_transaction signing_**; verifikasi via email/telepon.
> > - **Jangan pakai GET** untuk transaksi bernilai; **POST saja tidak cukup** — harus dikombinasikan dengan token acak / autentikasi *out of band*.
> > - **ASP.NET:** set `ViewStateUserKey`.
> >
> > ### A6 — Information Leakage and Improper Error Handling
> >
> > **Deskripsi.** Aplikasi **tanpa sengaja membocorkan** info konfigurasi, cara kerja internal, atau melanggar privasi — lewat pesan error *debug* yang detail, atau lewat **perbedaan waktu proses / perbedaan respons** terhadap input berbeda (mis. pesan error sama tetapi **nomor error berbeda** untuk "user tidak ada" vs "password salah"). Info ini sering dipakai untuk **meluncurkan atau mengotomasi serangan yang lebih kuat**.
> >
> > **Kerentanan.** (1) *Detailed error handling* — memicu error menampilkan **stack trace, pernyataan SQL yang gagal, info debug**. (2) Fungsi menghasilkan **hasil berbeda untuk input berbeda** — mis. login yang membedakan "no such user" vs "bad password".
> >
> > **Verifikasi Keamanan.** Tujuan: verifikasi aplikasi **tidak membocorkan info** lewat pesan error atau cara lain. Pakai **OWASP WebScarab** untuk memaksa aplikasi menghasilkan error.
> >
> > **Proteksi.** Butuh disiplin:
> >
> > - **Seluruh tim** berbagi pendekatan *exception handling* yang sama.
> > - **Nonaktifkan/batasi _detailed error handling_** — jangan tampilkan info debug, stack trace, atau info path ke pengguna akhir.
> > - **Jalur dengan banyak _outcome_ mengembalikan pesan error serupa/identik dalam waktu yang kira-kira sama**; bila tak bisa, tambahkan *random wait time*.
> > - Cek & konfigurasi error dari **semua lapisan** (database, web server IIS/Apache).
> > - Buat **_default error handler_** yang mengembalikan pesan tersanitasi untuk semua jalur error di produksi; opsi *"return 200 OK"* untuk semua error mengurangi kemampuan *scanner* (*security through obscurity*, lapisan ekstra).
> >
> > ### A7 — Broken Authentication and Session Management
> >
> > **Deskripsi.** Cacat di area ini paling sering berupa **kegagalan melindungi kredensial & token sesi sepanjang siklus hidupnya**. Kelemahan lebih sering masuk lewat **fungsi autentikasi tambahan** — *logout, password management, timeout, remember me, secret question, account update* — ketimbang mekanisme autentikasi utama. Dampak: pembajakan akun user/admin, merusak kontrol otorisasi & *accountability*, pelanggaran privasi.
> >
> > **Verifikasi Keamanan.** Tujuan: verifikasi aplikasi **mengautentikasi user dengan benar** dan **melindungi identitas + kredensialnya**. *Vulnerability scanner* & *static analysis* **sulit** mendeteksi cacat di skema autentikasi/sesi kustom → **code review + testing** (terutama dikombinasikan) paling efektif.
> >
> > **Proteksi.** Autentikasi bergantung pada **komunikasi aman (A9)** & **penyimpanan kredensial aman (A8)** — pastikan **SSL satu-satunya opsi** untuk semua bagian terautentikasi dan semua kredensial disimpan **ter-hash/terenkripsi**.
> >
> > - **Hanya pakai mekanisme manajemen sesi bawaan** — jangan tulis/pakai *session handler* sekunder.
> > - **Jangan terima session ID baru/preset/tak valid dari URL atau request** (*session fixation*).
> > - Batasi/hilangkan **cookie kustom** untuk autentikasi/sesi ("remember me", SSO buatan sendiri) — tidak berlaku untuk solusi SSO/federasi yang teruji.
> > - **Satu mekanisme autentikasi** dengan kekuatan & jumlah faktor sesuai; tak mudah di-*spoof*/replay; tidak terlalu kompleks.
> > - **Jangan mulai login dari halaman tak terenkripsi** — mulai dari halaman kedua terenkripsi dengan **session token baru**.
> > - **Regenerasi sesi** saat autentikasi sukses / perubahan level privilege.
> > - **Setiap halaman punya link logout**; logout menghancurkan semua *server-side session state* & cookie klien. Jangan minta konfirmasi (user akan menutup tab saja).
> > - *Timeout* otomatis sesuai nilai data (makin pendek makin baik).
> > - **Hash satu arah** untuk jawaban *secret question*.
> > - Jangan ekspos session ID / kredensial di URL/log; **cek password lama** saat ganti password; jangan andalkan kredensial yang bisa di-*spoof* (IP, DNS, *referrer*).
> >
> > ### A8 — Insecure Cryptographic Storage
> >
> > **Deskripsi.** Melindungi data sensitif dengan kripto sudah menjadi bagian kunci aplikasi web. **Sekadar gagal mengenkripsi data sensitif sangat lazim.** Aplikasi yang mengenkripsi sering punya **kripto yang buruk desainnya** — *cipher* tak tepat, atau kesalahan serius saat memakai *cipher* kuat. Berujung pada **pengungkapan data sensitif & pelanggaran kepatuhan**.
> >
> > **Kerentanan.** Masalah paling umum: (1) **tidak mengenkripsi data sensitif**; (2) **algoritma buatan sendiri**; (3) pemakaian **tak aman** algoritma kuat; (4) terus memakai **algoritma lemah terbukti** (MD5, SHA-1, RC3, RC4); (5) **_hard coding_ kunci** & menyimpan kunci di *store* tak terlindungi.
> >
> > **Verifikasi Keamanan.** *Vulnerability scanner* **tak bisa** memverifikasi *cryptographic storage* sama sekali; *code scanning* mendeteksi pemakaian API kripto tetapi tak bisa menilai apakah dipakai dengan benar. **Code review adalah cara terbaik.**
> >
> > **Proteksi.**
> >
> > - **Jangan buat algoritma kripto sendiri** — pakai algoritma publik yang disetujui: **AES, RSA, SHA-256 atau lebih baik** untuk hashing.
> > - **Jangan pakai MD5 / SHA-1.**
> > - **Generate kunci _offline_**; simpan *private key* dengan sangat hati-hati; jangan pernah mengirim *private key* lewat kanal tak aman.
> > - Amankan kredensial infrastruktur (DB, MQ) via **izin file system ketat** atau enkripsi.
> > - Enkripsi data di disk **tidak berguna** bila *connection pool* database memberi akses tak terenkripsi.
> > - **PCI DSS req. 3** (wajib 2008 bagi pedagang kartu kredit): jangan simpan data tak perlu (magnetic stripe, PAN); **CVV tak boleh disimpan dalam kondisi apa pun**.
> >
> > ### A9 — Insecure Communications **(kategori baru 2007)**
> >
> > **Deskripsi.** Aplikasi sering **gagal mengenkripsi trafik jaringan** saat diperlukan. Enkripsi (biasanya SSL) **harus** dipakai untuk **semua koneksi terautentikasi** — terutama halaman web yang dapat diakses internet, **tetapi juga koneksi back-end** — jika tidak, aplikasi mengekspos token autentikasi/sesi. Aplikasi yang bisa **_fall back_ / dipaksa keluar dari mode enkripsi** dapat disalahgunakan. *"Cepat atau lambat, sebuah host akan terkompromi di hampir setiap jaringan, dan penyerang akan segera memasang _sniffer_."*
> >
> > **Kerentanan.** HTTP menyertakan kredensial/token sesi di **setiap** request → **semua trafik terautentikasi** harus lewat SSL, bukan hanya request login. Koneksi back-end membawa info & kredensial yang **lebih sensitif & luas** → SSL back-end juga penting.
> >
> > **Verifikasi Keamanan.** *Automated scanner* memverifikasi SSL di *front-end* & menemukan banyak cacat SSL, tetapi **tak punya akses ke koneksi back-end**. **Code review** efisien untuk memverifikasi pemakaian SSL yang benar di semua koneksi back-end.
> >
> > **Proteksi.**
> >
> > - **Pakai SSL untuk semua koneksi terautentikasi** atau yang mengirim data sensitif/bernilai (kredensial, kartu kredit, data kesehatan/pribadi).
> > - **Komunikasi antar-elemen infrastruktur** (web server ↔ database) dilindungi TLS / enkripsi level protokol.
> > - **PCI DSS req. 4** (wajib 2008): lindungi data pemegang kartu **dalam transit**; akses klien/mitra/staf/admin harus dienkripsi dengan SSL atau serupa.
> >
> > ### A10 — Failure to Restrict URL Access
> >
> > **Deskripsi.** Sering satu-satunya proteksi untuk sebuah URL adalah **link ke halaman itu tidak ditampilkan** ke user tak berwenang. Namun penyerang yang termotivasi/terampil/beruntung dapat **menemukan & mengakses** halaman itu, memanggil fungsi, melihat data. *"Security by obscurity tidak cukup."* **Cek kontrol akses harus dilakukan sebelum request ke fungsi sensitif diberikan.**
> >
> > **Kerentanan.** Metode serang utama: **_forced browsing_** — menebak link & *brute force* untuk menemukan halaman tak terproteksi. Contoh cacat:
> >
> > - **URL "tersembunyi"/"khusus"** yang hanya di-*render* untuk admin di *presentation layer* tetapi dapat diakses siapa pun yang tahu (`/admin/adduser.php`, `/approveTransfer.do`).
> > - Akses ke **"file tersembunyi"** (XML statis, laporan) mengandalkan *obscurity*.
> > - Kode kontrol akses yang **usang/tak cukup** (mis. `/approveTransfer.do` dulu untuk semua, kini seharusnya hanya *approver*, tetapi tak ada penegakan).
> > - Kode yang **mengevaluasi privilege di klien, bukan server** — mis. serangan **MacWorld 2007** yang menyetujui *"Platinum pass"* senilai $1700 lewat JavaScript di browser.
> >
> > **Verifikasi Keamanan.** Tujuan: verifikasi kontrol akses **ditegakkan konsisten di _presentation layer_ DAN _business logic_** untuk **semua URL**. Kombinasi *code review* + *security testing*.
> >
> > **Proteksi.** Buat **matriks otorisasi** yang memetakan peran & fungsi aplikasi.
> >
> > - Matriks kontrol akses bagian dari **bisnis, arsitektur, dan desain** aplikasi.
> > - **Semua URL & fungsi bisnis** dilindungi mekanisme kontrol akses yang memverifikasi peran & *entitlement* **sebelum pemrosesan apa pun**, dan **di setiap langkah** proses multi-langkah — bukan sekali di awal.
> > - **Pentest sebelum deployment.**
> > - Perhatikan **file _include_/_library_** (terutama ber-ekstensi `.php`) — sedapat mungkin di luar *web root*; verifikasi tidak diakses langsung.
> > - **Blok akses ke semua tipe file** yang aplikasi tak seharusnya layani (pendekatan "accept known good": hanya `.html`, `.pdf`, `.php`).
> >
> > ### Perubahan dari Edisi 2004
> >
> > - **Ditambahkan:** **A3 Malicious File Execution** (peringkat mentah MITRE #3), **A5 CSRF** (MITRE #36, dinilai cukup penting), **A9 Insecure Communications** (sebelumnya dibahas di bawah A10:2004 Insecure Configuration Management).
> > - **Dipecah:** **A2:2004 Broken Access Control** dipecah menjadi **A4:2007 Insecure Direct Object Reference** + **A10:2007 Failure to Restrict URL Access**.
> > - **Ganti nama:** A6:2004 Injection Flaws → **A2:2007**; A4:2004 XSS → **A1:2007**; A3:2004 Broken Auth & Session Mgmt → **A7:2007**; A8:2004 Insecure Storage → **A8:2007 Insecure Cryptographic Storage**; A7:2004 Improper Error Handling → **A6:2007 Information Leakage and Improper Error Handling**.
> > - **Dihapus:**
> >   - **A1:2004 Unvalidated Input** — validasi input kini menjadi **bagian dari solusi** banyak item lain; OWASP tetap menyarankan mekanisme validasi input terpusat.
> >   - **A5:2004 Buffer Overflows** — isu serius untuk **C/C++**, ditangani komunitas keamanan non-web (SANS, CERT).
> >   - **A9:2004 Denial of Service** — peringkat MITRE **tidak cukup** untuk masuk tahun ini.
> >   - **A10:2004 Insecure Configuration Management** — peringkat MITRE tidak mengizinkan (kembali sebagai kategori pada [[OWASP Top 10 2010]]).

> [!cornell] #### Summary
>
> **OWASP Top 10 2007** adalah edisi yang **ditulis ulang total** dan **fokus semata pada _vulnerability_**, disusun dengan **mendistilasi MITRE Vulnerability Trends 2006** (dengan beberapa kategori digeser ke _root cause_). Ini **bukan standar, melainkan _education piece_**, dengan rekomendasi proteksi konkret untuk **Java EE, ASP.NET, PHP**. **XSS** naik ke **#1** dan **Injection Flaws** ke **#2**. Tiga kategori **baru**: **A3 Malicious File Execution** (RFI, wabah di PHP), **A5 CSRF** (meski peringkat mentah MITRE hanya #36), dan **A9 Insecure Communications**. **A2:2004 Broken Access Control** dipecah menjadi **A4 Insecure Direct Object Reference** + **A10 Failure to Restrict URL Access**. Empat isu 2004 dihapus: **Unvalidated Input** (jadi bagian solusi item lain), **Buffer Overflows** (isu C/C++), **Denial of Service**, dan **Insecure Configuration Management** (kembali di [[OWASP Top 10 2010]]). Edisi ini adalah pendahulu langsung [[OWASP Top 10 2010]].

> [!ad-libitum]- Additional Information
>
> #### Nasib kategori 2007 di edisi berikutnya (konteks tambahan, bukan dari dokumen 2007)
>
> | 2007 | 2010 |
> |---|---|
> | A1 XSS | Turun → A2:2010 |
> | A2 Injection Flaws | Naik → A1:2010 Injection |
> | A3 Malicious File Execution | **Dihapus** — PHP kini dikirim dengan konfigurasi default lebih aman |
> | A6 Information Leakage and Improper Error Handling | **Dihapus** — dampak minimal; diserap ke A6:2010 Security Misconfiguration |
> | A9 Insecure Communications | Ganti nama → A9:2010 Insufficient Transport Layer Protection |
> | A10 Failure to Restrict URL Access | Tetap → A8:2010 |
>
> #### Konteks era: PHP, MITRE/CVE, dan PCI DSS
>
> - **PHP** mendominasi lanskap kerentanan 2006–2007; banyak butir 2007 (Malicious File Execution, `register_globals`, `allow_url_include`) khusus PHP. Perbaikan default PHP kemudian menghapus A3 pada 2010.
> - **Metodologi berbasis MITRE/CVE** berarti peringkat mencerminkan **apa yang dilaporkan peneliti**, bukan survei atau data pentest komersial (baru mulai 2010 & 2013).
> - **PCI DSS v1.1** (wajib bagi pedagang kartu kredit mulai 2008) dirujuk berkali-kali — pendorong utama adopsi Top 10 di industri.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buka Excel *raw MITRE 2006* yang dirujuk dokumen (arsip situs OWASP Top 10) dan bandingkan peringkat mentah vs urutan final 2007.
> 2. Reproduksi RFI klasik `include $_REQUEST['filename'];` di lab PHP dengan `allow_url_include` on lalu off — amati mengapa OWASP menghapus A3 pada 2010.
> 3. Petakan tiap butir 2007 ke CWE (CWE-79, CWE-89, CWE-98, CWE-22, CWE-352, CWE-200, CWE-287, CWE-311, CWE-285) dan lacak kelanjutannya sampai [[OWASP Top 10 2021]].
>
> #### Bacaan Lanjutan
>
> - OWASP Top 10 2007 (PDF resmi) — GitHub `OWASP/Top10/2007/`.
> - MITRE CWE — *Vulnerability Type Distributions in CVE* (2006).
> - OWASP Guide to Building Secure Web Applications, OWASP Testing Guide, OWASP Code Review Guide.
> - PCI DSS v1.1; NIST SP 800-52 (TLS), NIST SP 800-95 (secure web services).
