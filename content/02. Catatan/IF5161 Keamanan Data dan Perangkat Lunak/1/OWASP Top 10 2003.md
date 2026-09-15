---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] OWASP Top 10 2003
>
> > ## Questions/Cues
> >
> > - Apa itu OWASP Top Ten 2003 dan mengapa ia disebut edisi pertama / "cikal bakal" standar?
> > - Bagaimana daftar 2003 disusun (konsensus, format SANS/FBI, tanpa statistik)?
> > - Apa 10 kategori kerentanan versi 2003?
> > - Apa dua kategori yang **hanya ada di 2003** dan hilang setelahnya (Remote Administration Flaws)?
> > - Bagaimana istilah 2003 berbeda dari edisi 2004 (Parameters vs Input, Account vs Authentication, Command Injection vs Injection)?
> >
> > ## Reference Points
> >
> > - IF5161 — The Ten Most Critical Web Application Security Vulnerabilities (Januari 2003, edisi pertama)
> > - IF5161 — GitHub OWASP/Top10 — `2003/OWASPWebApplicationSecurityTopTen-Version1.pdf` (Halaman 3-22)
>
> > ### Konteks & Metodologi
> >
> > **OWASP Top Ten 2003 adalah edisi PERTAMA** (rilis Januari 2003). Dari edisi inilah proyek berkembang menjadi **_de facto_ standar keamanan aplikasi web** yang dirujuk banyak standar, buku, dan organisasi. Karakter dokumen (bertahan di semua edisi awal):
> >
> > - **Dokumen konsensus komunitas** — *"kebijaksanaan gabungan puluhan pakar keamanan aplikasi terkemuka."*
> > - Disajikan dalam **format mirip SANS/FBI Top Twenty List** agar mudah dipakai & dipahami.
> > - Karena **tiap situs unik**, daftar diorganisasi seputar **tipe/kategori kerentanan** yang sering muncul di aplikasi web (bukan kerentanan spesifik satu organisasi).
> > - *"Tidak ada sumber statistik yang andal tentang masalah keamanan aplikasi web"* — di masa depan OWASP ingin mengumpulkan metrik frekuensi untuk memprioritaskan, tetapi belum bisa.
> > - **Urutan A1–A10 bukan peringkat risiko** — *"hampir mustahil menentukan mana yang mewakili risiko agregat terbesar."*
> > - Kriteria kategori yang baik: **cacatnya berkaitan erat, bisa ditangani dengan _countermeasure_ serupa, dan sering muncul di arsitektur aplikasi web tipikal.**
> > - **_Living document_** — direncanakan diperbarui setiap **enam bulan** (kelak menjadi tahunan).
> > - Ditujukan dipakai **tim pengembangan & manajer** saat perencanaan proyek; *project manager* harus mengalokasikan **waktu & anggaran** untuk pelatihan developer, kebijakan keamanan aplikasi, desain mekanisme keamanan, pentest, dan *security code review*.
> >
> > *Catatan: edisi 2003 belum memakai skema rating Exploitability/Prevalence/Detectability/Impact (mulai [[OWASP Top 10 2010]]) maupun format kartu Threat Agents/Attack Vectors (mulai [[OWASP Top 10 2010]]). Tiap butir memakai struktur: Description → Environments Affected → Examples and References → How to Determine If You Are Vulnerable → How to Protect Yourself.*
> >
> > ### Daftar OWASP Top Ten 2003
> >
> > | # | Kategori | Inti masalah (dari dokumen) |
> > |---|---|---|
> > | **A1** | Unvalidated Parameters | Informasi dari request web tidak divalidasi sebelum dipakai → serang komponen back-end |
> > | **A2** | Broken Access Control | Pembatasan atas apa yang boleh dilakukan *authenticated user* tidak ditegakkan |
> > | **A3** | Broken Account and Session Management | Kredensial akun & token sesi tak dilindungi → asumsi identitas user lain |
> > | **A4** | Cross-Site Scripting (XSS) Flaws | Aplikasi web jadi mekanisme mengantar serangan ke browser pengguna akhir |
> > | **A5** | Buffer Overflows | Komponen di bahasa tertentu yang tak memvalidasi input bisa crash / diambil alih prosesnya |
> > | **A6** | Command Injection Flaws | Kode jahat direlai lewat aplikasi web ke sistem lain (OS, shell, SQL) |
> > | **A7** | Error Handling Problems | Kondisi error tak ditangani benar → bocor info sistem, DoS, kegagalan mekanisme keamanan, server crash |
> > | **A8** | Insecure Use of Cryptography | Fungsi kripto untuk melindungi info & kredensial sulit dikode benar → proteksi lemah |
> > | **A9** | Remote Administration Flaws | Antarmuka admin berbasis web yang tak dilindungi cukup → akses penuh ke seluruh aspek situs |
> > | **A10** | Web and Application Server Misconfiguration | Standar konfigurasi server yang kuat kritikal; server tak aman *out of the box* |
> >
> > ```mermaid
> > flowchart LR
> >     subgraph S2003["OWASP Top Ten 2003 (edisi pertama)"]
> >         A1["A1 Unvalidated Parameters"]
> >         A2["A2 Broken Access Control"]
> >         A3["A3 Broken Account &amp; Session Mgmt"]
> >         A4["A4 XSS Flaws"]
> >         A5["A5 Buffer Overflows"]
> >         A6["A6 Command Injection Flaws"]
> >         A7["A7 Error Handling Problems"]
> >         A8["A8 Insecure Use of Cryptography"]
> >         A9["A9 Remote Administration Flaws"]
> >         A10["A10 Web &amp; App Server Misconfiguration"]
> >     end
> >     subgraph S2004["OWASP Top Ten 2004"]
> >         B1["A1 Unvalidated Input"]
> >         B2["A2 Broken Access Control"]
> >         B3["A3 Broken Authentication &amp; Session Mgmt"]
> >         B6["A6 Injection Flaws"]
> >         B7["A7 Improper Error Handling"]
> >         B8["A8 Insecure Storage"]
> >         B9["A9 Denial of Service (baru)"]
> >         B10["A10 Insecure Configuration Management"]
> >     end
> >     A1 -- "rename" --> B1
> >     A2 --> B2
> >     A9 -- "dilebur sbg kasus khusus" --> B2
> >     A3 -- "rename" --> B3
> >     A6 -- "rename" --> B6
> >     A7 -- "rename" --> B7
> >     A8 -- "rename" --> B8
> >     A10 -- "rename" --> B10
> >     N9["(slot A9 kosong)"] --> B9
> > ```
> >
> > ### A1 — Unvalidated Parameters
> >
> > **Deskripsi.** Aplikasi web memakai info dari **request HTTP** untuk menentukan responsnya. Penyerang bisa **memodifikasi bagian mana pun** dari request — URL, *querystring*, header, cookie, *form field*, *hidden field* — untuk melewati mekanisme keamanan. Nama serangan *parameter tampering* yang umum: **forced browsing, command insertion, cross site scripting, SQL injection, cookie poisoning, hidden field manipulation**. Banyak format *encoding* (mudah di-*decode*); developer sering lupa **men-*decode* parameter ke bentuk paling sederhana sebelum validasi** → input jahat disamarkan lolos filter. Proses menyederhanakan encoding = **canonicalization**. *"Sejumlah mengejutkan aplikasi web hanya memakai mekanisme validasi sisi klien"* — mudah dilewati (penyerang membuat request sendiri dengan telnet); **validasi sisi klien tidak punya manfaat keamanan sama sekali**, hanya untuk performa & UX.
> >
> > **Cara Menentukan Kerentanan.** Bagian request HTTP yang dipakai tanpa validasi hati-hati disebut parameter **"tainted"**. **Code review** — cari semua pemanggilan yang mengekstrak info dari request HTTP (mis. metode `HttpServletRequest` di J2EE), telusuri pemakaiannya. Perl: opsi **`taint` (-t)**. Tool: Achilles, WebScarab.
> >
> > **Cara Melindungi Diri.** Validasi **semua parameter sebelum dipakai** — paling efektif lewat **komponen/library terpusat**. Tiap parameter dicek terhadap **spesifikasi "positif"**: tipe data, *character set* yang diizinkan, panjang min/maks, apakah `null` boleh, apakah wajib, apakah duplikat boleh, rentang numerik, nilai legal spesifik (enumerasi), pola spesifik (*regex*). Pendekatan "negatif" / berbasis *signature* **tidak efektif & sulit dipelihara**. *Web application firewall* bisa membantu bila dikonfigurasi ketat per parameter.
> >
> > ### A2 — Broken Access Control
> >
> > **Deskripsi.** *Access control* (kadang disebut *authorization*) menentukan konten/fungsi mana yang diberikan ke user tertentu, **setelah autentikasi**. *"Terdengar sederhana tetapi sangat sulit diimplementasikan dengan benar."* Skema kontrol akses sering **berkembang bersama situs** (bukan dirancang sengaja); aturannya tersebar di kode sampai *"hampir mustahil dipahami"*. Konsekuensi cacat: melihat konten tak berwenang, **mengubah/menghapus konten, menjalankan fungsi tak berwenang, mengambil alih administrasi situs**.
> >
> > **Sub-kasus spesifik:**
> >
> > - **Insecure Id's** — situs memakai id/key/index untuk merujuk user/konten/objek/fungsi; bila bisa ditebak & tak divalidasi, penyerang bebas mengeksplorasi. *"Tidak boleh mengandalkan kerahasiaan id apa pun untuk proteksi."*
> > - **Forced Browsing Past Access Control Checks** — cek keamanan tidak boleh **bisa dilewati** oleh user yang melompati halaman ber-cek.
> > - **Path Traversal** — menyisipkan info path relatif (`../../target_dir/target_file`) untuk mengakses file yang normalnya tak dapat diakses.
> > - **File Permissions** — hanya file yang memang untuk web user ditandai *readable*; kebanyakan direktori tidak; sangat sedikit (jika ada) file *executable*.
> > - **Client Side Caching** — banyak user memakai komputer bersama (perpustakaan, sekolah, bandara); pakai **HTTP header + meta tag** agar halaman sensitif tidak di-*cache*.
> >
> > **Cara Menentukan Kerentanan.** **Kebijakan kontrol akses harus terdokumentasi** + pendekatan penegakannya di dokumentasi desain — bila tak ada, situs kemungkinan rentan. Kode kontrol akses harus **terstruktur, modular, terpusat**; *code review* detail + pentest.
> >
> > **Cara Melindungi Diri.** Tangkap kebutuhan kontrol akses dalam **kebijakan keamanan aplikasi**; **gunakan matriks kontrol akses**. Tanpa kebijakan terdokumentasi, tak ada definisi "aman" untuk situs itu. Uji ekstensif dengan berbagai akun untuk memastikan **tak ada cara melewati** mekanisme. Komponen keamanan *application layer* bisa membantu bila dikonfigurasi dengan definisi ketat request akses yang valid.
> >
> > ### A3 — Broken Account and Session Management
> >
> > **Deskripsi.** Mencakup **semua aspek pengelolaan akun user + sesi aktif**. Autentikasi bisa **dilemahkan oleh fungsi manajemen kredensial yang cacat** — *password change, forgot my password, remember my password, account update*. HTTP tak menyediakan sesi → aplikasi membuatnya sendiri; membuat token sesi kuat & melindunginya sepanjang siklus hidup *"terbukti sulit dipahami banyak developer"*. **Risiko besar lain: _backend authentication_** — bagaimana aplikasi web mengautentikasi diri ke sistem back-end (database, direktori, *web service*); sering **password plaintext tertanam di kode sumber / file konfigurasi** → bila web server terkompromi, sistem back-end ikut berisiko.
> >
> > **Cara Menentukan Kerentanan.** *Code review* + pentest. Tinjau tiap aspek autentikasi: kredensial dilindungi **_at rest_ (disk) & _in transit_ (login)**; tiap mekanisme ganti kredensial hanya bisa oleh user berwenang; session identifier selalu dilindungi & dipakai agar meminimalkan risiko *exposure*.
> >
> > **Cara Melindungi Diri.** Dokumentasikan **kebijakan pengelolaan kredensial** lalu tegakkan konsisten. Area kritis:
> >
> > - **Password Change Controls** — satu mekanisme ganti password; selalu minta **password lama + baru**; bila password lupa di-email, minta re-autentikasi saat user mengubah alamat email.
> > - **Password Strength** — ukuran & kompleksitas minimum; ganti berkala; batasi jumlah percobaan login (log kegagalan, **jangan catat password**); jangan indikasikan apakah *username* atau *password* yang salah.
> > - **Password Storage** — semua password **ter-hash (lebih disukai) atau terenkripsi**; jangan pernah *hardcode* di kode sumber.
> > - **Protecting Credentials in Transit** — satu-satunya teknik efektif: **enkripsi seluruh transaksi login (SSL)**.
> > - **Session ID Protection** — idealnya seluruh sesi via SSL; session ID **tidak di URL**, **angka acak panjang & rumit yang tak mudah ditebak**, diganti saat transisi (SSL, autentikasi); **session ID pilihan user tidak boleh diterima**.
> > - **Account Lists** — hindari mengekspos daftar nama akun; pakai **pseudonim (screen name)**.
> > - **Browser Caching** — data autentikasi/sesi jangan lewat GET (pakai POST); halaman autentikasi ber-*no cache*.
> > - **Trust Relationships** — hindari *implicit trust* antar komponen.
> > - **Backend Authentication** — kredensial back-end **terenkripsi**; *master key* disimpan agar sulit didapat penyerang; pakai **SSL** untuk koneksi back-end.
> >
> > ### A4 — Cross-Site Scripting (XSS) Flaws
> >
> > **Deskripsi.** Terjadi ketika penyerang **memakai aplikasi web untuk mengirim kode jahat (umumnya JavaScript) ke pengguna akhir lain**. Browser korban mempercayai aplikasi web, dan serangan mengeksploitasi kepercayaan itu untuk melakukan hal-hal yang normalnya tak diizinkan. Dua kategori: **stored** (kode tersimpan permanen di server — DB, forum, log pengunjung) dan **reflected** (kode dipantulkan dari server — pesan error, hasil pencarian; dikirim ke korban lewat email atau situs lain). *"Jangan tertipu berpikir situs 'read only' / 'brochureware' aman dari reflected XSS."* Dampak dari gangguan ringan sampai **kompromi akun penuh** (pengungkapan *session cookie*); contoh ekstrem: XSS di **situs farmasi bisa mengubah info dosis → overdosis**; XSS pada siaran pers → memengaruhi harga saham. XSS juga bisa ada di **error page web/app server** yang memantulkan info request. XSS umumnya berupa **JavaScript tertanam**, tetapi *active content* apa pun berbahaya: **ActiveX (OLE), VBScript, Shockwave, Flash**.
> >
> > **Cara Menentukan Kerentanan.** *Security review* kode — cari semua tempat input dari request HTTP bisa masuk ke output HTML (berbagai tag HTML bisa mengangkut JavaScript jahat). Nessus, Nikto membantu tetapi *"hanya menggores permukaan."*
> >
> > **Cara Melindungi Diri.** **Code review** detail untuk validasi **semua header, cookie, query string, form field, hidden field** terhadap spesifikasi ketat. Validasi **jangan mencoba mengidentifikasi & menghapus/memfilter/menyanitasi _active content_** — terlalu banyak tipe & cara *encoding*. Pakai **kebijakan "positif"**. *Filtering* output juga membantu — konversi karakter di output: `<` → `&lt;`, `>` → `&gt;`, `(` → `&#40;`, `)` → `&#41;`, `#` → `&#35;`, `&` → `&#38;`. Tersedia **OWASP Filters project**, **CodeSeeker**, dan pelajaran encoding di **WebGoat**.
> >
> > ### A5 — Buffer Overflows
> >
> > **Deskripsi.** Penyerang memakai *buffer overflow* untuk **merusak _execution stack_** aplikasi web; dengan input yang dirancang cermat → aplikasi **mengeksekusi kode arbitrer, praktis mengambil alih mesin**. *"Tidak mudah ditemukan dan bahkan setelah ditemukan, umumnya sangat sulit dieksploitasi."* Kelas serupa: **format string attacks**. Bisa ada di produk web/app server maupun kode aplikasi kustom (mis. saat memakai **library grafis**). Di aplikasi kustom **kurang mungkin terdeteksi** (lebih sedikit hacker yang mencarinya), dan kemampuan eksploitasi berkurang karena kode sumber & pesan error detail tak tersedia bagi hacker. **Java & J2EE kebal** (kecuali overflow di JVM sendiri).
> >
> > **Cara Menentukan Kerentanan.** Produk server & library: **ikuti laporan bug terbaru**. Kode kustom: **review semua kode yang menerima input via request HTTP** — pastikan menangani input berukuran arbitrer besar.
> >
> > **Cara Melindungi Diri.** Ikuti laporan bug & **terapkan patch terbaru**; **pindai berkala** dengan *scanner* buffer overflow. Untuk kode kustom: **cek ukuran semua input** — bahkan di environment kebal, input besar yang tak tertangani bisa menyebabkan **DoS** atau masalah operasional lain.
> >
> > ### A6 — Command Injection Flaws
> >
> > **Deskripsi.** Memungkinkan penyerang **merelai kode jahat lewat aplikasi web ke sistem lain** — *system call* ke OS, program eksternal via *shell command*, dan **SQL (SQL injection)**. Seluruh skrip Perl/Python bisa disisipkan ke aplikasi yang dirancang buruk. *"Setiap kali aplikasi web memakai interpreter tipe apa pun, ada bahaya serangan injeksi."* **Sendmail** adalah program eksternal yang paling sering dipanggil. **SQL injection** sangat luas & berbahaya — penyerang menemukan parameter yang diteruskan ke database, memanipulasi isinya untuk **forwarding query jahat** → **memperoleh, merusak, atau menghancurkan isi database**.
> >
> > **Contoh (dari dokumen).** Parameter jahat mengubah aksi *system call* yang normalnya mengambil file user (via *path traversal* `../`); perintah tambahan di akhir parameter ke *shell script* (`; rm –r *`); query SQL dimodifikasi dengan menambah *constraint* ke *where clause* (`OR 1=1`).
> >
> > **Cara Menentukan Kerentanan.** **Cari di kode sumber semua pemanggilan ke sumber daya eksternal** (`system`, `exec`, `fork`, `Runtime.exec`, query SQL) — banyak bahasa punya berbagai cara menjalankan perintah eksternal; periksa tiap pemanggilan.
> >
> > **Cara Melindungi Diri.**
> >
> > - **Hindari mengakses interpreter eksternal** bila memungkinkan — banyak *shell command* & *system call* punya **library khusus bahasa** yang tak melibatkan *shell interpreter*.
> > - Untuk pemanggilan yang tetap dipakai (mis. ke database): **validasi data secara cermat**; strukturkan request agar semua parameter diperlakukan sebagai **data** — **_stored procedure_ / _prepared statement_** memberi proteksi signifikan.
> > - **Least privilege** — jangan jalankan web server sebagai `root` atau akses database sebagai `DBADMIN`. Java sandbox (J2EE) bisa mencegah eksekusi *system command*.
> > - **Cek semua output, return code, error code** dari pemanggilan.
> >
> > ### A7 — Error Handling Problems
> >
> > **Deskripsi.** Masalah paling umum: **pesan error internal detail** (*stack trace, database dump, error code*) ditampilkan ke user/hacker → membocorkan detail implementasi. Error muncul saat operasi normal (*out of memory, null pointer, system call failure, database unavailable, network timeout*) — harus ditangani dengan skema yang **memberi pesan berarti ke user, info diagnostik ke pemelihara, dan _tidak ada info berguna_ ke penyerang**. Bahkan **inkonsistensi** membocorkan petunjuk: *"file not found"* vs *"access denied"* mengungkapkan keberadaan file / struktur direktori. Masalah keamanan umum: **_fail-open_ security check** — semua mekanisme keamanan harus **menolak akses sampai diberikan eksplisit**, bukan sebaliknya. Error lain bisa **membuat sistem crash / menghabiskan sumber daya** (DoS).
> >
> > **Cara Menentukan Kerentanan.** *Testing* sederhana untuk melihat respons terhadap error input; testing lebih menyeluruh untuk memicu **error internal**. **Code review** logika penanganan error — harus konsisten di seluruh situs & bagian dari skema yang dirancang baik.
> >
> > **Cara Melindungi Diri.** **Dokumentasikan kebijakan penanganan error** — tipe error yang ditangani, apa yang dilaporkan ke user, apa yang di-*log*; semua developer memahami & mengikutinya. Situs **_gracefully handle_ semua error**; kelas error tertentu di-*log*. Aplikasi web bisa **melacak percobaan gagal berulang & menghasilkan alert** (*"sedikit situs punya kemampuan IDS di aplikasi web-nya"* → prevalensi serangan aplikasi web *"kemungkinan sangat diremehkan"*).
> >
> > ### A8 — Insecure Use of Cryptography
> >
> > **Deskripsi.** Kebanyakan aplikasi web perlu **menyimpan info sensitif** (password, nomor kartu kredit, rekaman akun, info proprietary). Enkripsi kini mudah dipakai, tetapi developer sering **salah saat mengintegrasikannya** — dan **melebih-lebihkan proteksi** yang didapat sehingga lengah pada aspek lain. Kesalahan umum: **penyimpanan kunci/sertifikat/password yang tak aman**; penyimpanan *secret* di memori yang keliru; **sumber _randomness_ yang buruk**; **pilihan algoritma yang buruk**; **gagal mengenkripsi data kritikal**; **mencoba membuat algoritma enkripsi baru**; gagal mendukung perubahan kunci. *(Bagian ini TIDAK mencakup SSL — itu di bagian "Server Configuration"/A10; hanya enkripsi programatik data _application layer_.)*
> >
> > **Cara Menentukan Kerentanan.** Tanpa akses kode sumber sangat memakan waktu — tetapi bisa **memeriksa token/session ID/cookie apakah jelas tidak acak**; teknik kriptanalisis tradisional bisa dipakai. Cara termudah: **review kode** implementasi fungsi kripto (peninjau harus **berlatar kuat di kriptografi & cacat umum**), termasuk bagaimana kunci/password/*secret* disimpan, dimuat, diproses, dan **dibersihkan dari memori**.
> >
> > **Cara Melindungi Diri.**
> >
> > - **Minimalkan pemakaian enkripsi** — simpan hanya info yang mutlak perlu. Contoh: alih-alih menyimpan nomor kartu kredit terenkripsi, **minta user memasukkannya ulang**.
> > - Alih-alih menyimpan password terenkripsi, pakai **fungsi satu arah (SHA-1)** untuk mem-*hash*-nya.
> > - Bila kripto harus dipakai: pilih **library yang telah melalui pengawasan publik** & tanpa kerentanan terbuka; **enkapsulasi** fungsi kripto & review kode dengan cermat.
> > - *"Master secret harus dipecah ke setidaknya dua lokasi dan dirakit saat runtime"* (mis. *config file*, server eksternal, atau di dalam kode).
> >
> > ### A9 — Remote Administration Flaws **(hanya ada di edisi 2003)**
> >
> > **Deskripsi.** **Antarmuka administratif** menyediakan fitur kuat untuk mengelola aplikasi web (mengelola user, data, konten). Karena kuatnya, antarmuka ini adalah **target utama serangan orang luar _maupun_ orang dalam**. Masalah umum: **tidak ada autentikasi/enkripsi kuat** untuk antarmuka yang dapat diakses web; **admin junior tidak terbatas** pada fungsi yang seharusnya; **cacat pada mekanisme pemisahan** antara user & admin; **fitur administratif yang terlalu kuat** disediakan tanpa perlu.
> >
> > **Cara Menentukan Kerentanan.** **Cari tahu bagaimana situs diadministrasi** — bagaimana halaman diubah, di mana diuji, bagaimana ditransfer ke server produksi; bila admin bisa mengubah dari jarak jauh, bagaimana komunikasinya dilindungi. Tinjau tiap antarmuka: hanya **admin berwenang** yang boleh akses; hanya **data berwenang** yang bisa diakses; bila memakai *external command*, cek terhadap cacat **command injection**. Karena autentikasi adalah pertahanan pertama, tinjau mekanisme autentikasi admin **lebih menyeluruh lagi**.
> >
> > **Cara Melindungi Diri.**
> >
> > - **Rekomendasi utama: jangan pernah izinkan akses admin lewat pintu depan situs bila memungkinkan** — kebanyakan organisasi *"tidak boleh menerima risiko"* membuat antarmuka ini tersedia untuk serangan luar. Bila akses admin jarak jauh mutlak perlu, pakai **VPN** ke jaringan internal lalu akses via **koneksi back-end terlindungi**.
> > - Bila akses web ke antarmuka admin harus disediakan: gunakan **autentikasi kuat** (sertifikat, *token-based authenticator*). Seluruh sesi administratif via **enkripsi (VPN atau SSL)**.
> > - **Pisahkan antarmuka administratif dari antarmuka user biasa** — *"menghentikan tuntas"* upaya user biasa menaikkan privilege; jalankan di **port berbeda atau server berbeda** (bukan sebagai keamanan sejati — mudah dipindai — tetapi lapisan tambahan).
> > - **Pemisahan jaringan / IP filtering** — bila akses admin hanya boleh dari dalam situs, *bind* aplikasi admin ke **kartu jaringan terpisah**, izinkan hanya **IP internal**; bila di port berbeda pada kartu sama, batasi dengan **cek IP sumber**.
> >
> > *(Pada [[OWASP Top 10 2004]] kategori ini **dilebur ke A2 Broken Access Control** sebagai kasus khusus — jenis cacat & remediasinya dinilai sama. Sejak 2004 "Remote Administration Flaws" tak pernah muncul lagi sebagai kategori tersendiri.)*
> >
> > ### A10 — Web and Application Server Misconfiguration
> >
> > **Deskripsi.** Konfigurasi **web server & application server** berperan kunci. Sering ada **jurang lebar antara yang menulis aplikasi dan yang mengoperasikan situs**. Masalah konfigurasi server yang beragam: **celah keamanan tak ter-patch**; **directory listing & directory traversal**; **file default/backup/sample yang tak perlu** (skrip, aplikasi, file konfigurasi, halaman web); **izin file & direktori yang keliru**; **servis tak perlu aktif** (manajemen konten, remote administration); **akun default dengan password default**; **fungsi admin/debugging yang aktif/dapat diakses**; **pesan error berlebihan**; **sertifikat SSL & setelan enkripsi salah konfigurasi**; **sertifikat _self-signed_** (untuk autentikasi & proteksi MITM); **sertifikat default**. Banyak bisa dideteksi *scanner* → bila terdeteksi, **mudah dieksploitasi → kompromi total situs** (juga sistem back-end: database, jaringan korporat). *"Software aman DAN konfigurasi aman keduanya dibutuhkan."*
> >
> > **Cara Menentukan Kerentanan.** *"Jika kamu belum berupaya sungguh-sungguh mengunci web & app server, kamu kemungkinan besar rentan."* Sedikit produk server yang aman *out of the box*. **Konfigurasi aman harus terdokumentasi & sering diperbarui**. Pindai eksternal dengan **Nessus & Nikto** — internal & eksternal — minimal **bulanan**.
> >
> > **Cara Melindungi Diri.** Buat **_hardening guideline_** untuk konfigurasi spesifikmu, dipakai di semua host (termasuk environment pengembangan); mulai dari panduan vendor / OWASP / CERT / SANS lalu sesuaikan. Isi guideline: **konfigurasi semua mekanisme keamanan, matikan semua servis tak terpakai, atur role/permission/account, logging & alert**. Untuk banyak server: **otomasi** proses konfigurasi (atau *disk replication* seperti Ghost dari server yang sudah di-*harden*). **Assign tanggung jawab** menjaga konfigurasi mutakhir; proses pemeliharaan: pantau kerentanan terbaru, terapkan patch, perbarui guideline, pemindaian rutin internal & eksternal, **laporan status berkala ke manajemen atas**. *(OWASP menjanjikan seri panduan konfigurasi keamanan untuk Java application server pada awal 2003.)*
> >
> > ### Catatan Sejarah (edisi pertama — tidak ada "perubahan dari edisi sebelumnya")
> >
> > OWASP Top Ten 2003 **mendefinisikan struktur dasar** yang bertahan lama: 10 kategori kerentanan, format SANS-style, per-butir **Description → Environments Affected → Examples/References → How to Determine If You Are Vulnerable → How to Protect Yourself**. Bagian **Conclusions** mencatat area yang **dipertimbangkan tetapi tidak masuk**: *Unnecessary and Malicious Code, Broken Thread Safety and Concurrent Programming, Denial of Service, Unauthorized Information Gathering, Accountability Problems and Weak Logging, Data Corruption, Broken Caching/Pooling/Reuse* — beberapa di antaranya muncul di edisi kemudian (**Denial of Service** → [[OWASP Top 10 2004]]; *weak logging* → A10:2017 di [[OWASP Top 10 2017]]).

> [!cornell] #### Summary
>
> **OWASP Top Ten 2003** adalah **edisi pertama** dari daftar yang kelak menjadi **standar _de facto_ keamanan aplikasi web**. Ia adalah **dokumen konsensus komunitas** (bukan berbasis data — *"tidak ada sumber statistik yang andal"*), berformat **SANS/FBI Top Twenty**, diorganisasi seputar **kategori kerentanan**, dan **tidak diurutkan berdasarkan risiko**. Sepuluh kategorinya: *Unvalidated Parameters, Broken Access Control, Broken Account and Session Management, XSS Flaws, Buffer Overflows, Command Injection Flaws, Error Handling Problems, Insecure Use of Cryptography, **Remote Administration Flaws**, dan Web and Application Server Misconfiguration*. Dua ciri khas 2003: **A9 Remote Administration Flaws** (dilebur ke Broken Access Control pada [[OWASP Top 10 2004]] dan tak pernah kembali) dan penamaan awal beberapa kategori (*Parameters* bukan *Input*, *Account* bukan *Authentication*, *Command Injection* bukan *Injection*). Lihat evolusi lengkapnya lewat [[OWASP Top 10 2004]] → [[OWASP Top 10 2007]] → [[OWASP Top 10 2010]] → [[OWASP Top 10 2013]] → [[OWASP Top 10 2017]] → [[OWASP Top 10 2021]] → [[OWASP Top 10 2025]].

> [!ad-libitum]- Additional Information
>
> #### Garis besar evolusi kategori 2003 (konteks tambahan, bukan dari dokumen 2003)
>
> | Kategori 2003 | Jejak di edisi modern |
> |---|---|
> | A1 Unvalidated Parameters | 2004: *Unvalidated Input*; 2007: dihapus (jadi solusi lintas-kategori) |
> | A2 Broken Access Control | 2007: dipecah (IDOR + Failure to Restrict URL Access); 2017: disatukan lagi; 2021–2025: **A01** |
> | A3 Broken Account and Session Management | 2004: *Broken Authentication…*; 2021: *Identification and Authentication Failures*; 2025: *Authentication Failures* |
> | A4 XSS Flaws | 2017: A7; 2021: **dilebur ke Injection** |
> | A5 Buffer Overflows | 2007: **dihapus** (isu C/C++) — tak pernah kembali |
> | A6 Command Injection Flaws | 2004: *Injection Flaws*; 2021–2025: bagian **Injection** |
> | A7 Error Handling Problems | 2010: dihapus; 2025: kembali sbg **A10 Mishandling of Exceptional Conditions** |
> | A8 Insecure Use of Cryptography | 2013: *Sensitive Data Exposure*; 2021: *Cryptographic Failures* |
> | A9 Remote Administration Flaws | 2004: **dilebur ke Broken Access Control** — tak pernah kembali |
> | A10 Web & App Server Misconfiguration | 2004: *Insecure Configuration Management*; 2007: dihapus; 2010→: **Security Misconfiguration** |
>
> #### Mengapa edisi 2003 penting untuk dipahami (bukan sekadar dibaca judulnya)
>
> - Ia menunjukkan bahwa **konsep inti keamanan aplikasi web sudah dipahami sejak 2003** — validasi input, kontrol akses, manajemen sesi, injeksi, kripto, konfigurasi. Yang berubah sejak itu **bukan jenis masalahnya**, melainkan **pengorganisasian, penekanan, dan basis bukti** (konsensus → MITRE → data kontributor → survei).
> - Beberapa gagasan 2003 **kembali beberapa dekade kemudian**: *weak logging* (Conclusions 2003) → A10:2017; *error handling* (A7:2003) → A10:2025.
> - Kosakata sudah bergeser: *"validasi sisi klien tidak punya manfaat keamanan"* (2003) tetap benar hari ini.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat **satu tabel besar 2003 → 2025**: baris = 10 kategori 2003, kolom = tiap edisi, sel = padanan terdekat / "dihapus" / "dilebur".
> 2. Ambil A2:2003 Broken Access Control (sub-kasus Insecure Id's, Path Traversal, dll.) dan tandai mana yang masih persis sama di A01:2025 — lalu jelaskan mengapa kategori ini **selalu #1 sejak 2021**.
> 3. Diskusikan (pesan dosen): apakah *Remote Administration Flaws* benar-benar "hilang", atau hanya terserap? Cari contoh CVE panel admin modern dan petakan ke Top 10:2025.
>
> #### Bacaan Lanjutan
>
> - OWASP Top Ten 2003 (PDF resmi) — GitHub `OWASP/Top10/2003/OWASPWebApplicationSecurityTopTen-Version1.pdf`.
> - SANS/FBI Top 20 Internet Security Vulnerabilities (format acuan asli).
> - Bruce Schneier, *Applied Cryptography* (dirujuk A8).
> - Aleph One, *"Smashing the Stack for Fun and Profit"* (Phrack 49) — konteks A5.
