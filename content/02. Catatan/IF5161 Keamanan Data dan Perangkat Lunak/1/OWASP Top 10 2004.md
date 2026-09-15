---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] OWASP Top 10 2004
>
> > ## Questions/Cues
> >
> > - Bagaimana OWASP menyusun daftar 2004 tanpa data statistik, dan mengapa urutannya "tidak berurutan"?
> > - Apa 10 kategori kerentanan 2004?
> > - Apa dua perubahan utama dari [[OWASP Top 10 2003]] (WAS-XML alignment & DoS)?
> > - Mengapa "Remote Administration Flaws" 2003 dilebur ke Broken Access Control?
> > - Apa saja sub-kasus Broken Access Control (Insecure Id's, Forced Browsing, Path Traversal, File Permissions, Client Side Caching)?
> >
> > ## Reference Points
> >
> > - IF5161 — The Ten Most Critical Web Application Security Vulnerabilities, 2004 Update (27 Jan 2004)
> > - IF5161 — GitHub OWASP/Top10 — `2004/OWASP_Top_Ten_2004.pdf` (Halaman 5-23)
>
> > ### Konteks & Metodologi
> >
> > **OWASP Top Ten 2004** adalah **dokumen konsensus komunitas** — *"kebijaksanaan gabungan puluhan pakar keamanan aplikasi"* — bukan hasil analisis data. *"Tidak ada sumber statistik yang andal tentang masalah keamanan aplikasi web"*; OWASP berharap suatu hari bisa memakai metrik frekuensi, *"tetapi karena beberapa alasan, pengukuran semacam itu tak mungkin terjadi dalam waktu dekat."*
> >
> > - Disajikan dalam **format mirip SANS/FBI Top Twenty List** agar mudah dipakai; SANS fokus pada produk jaringan tertentu, sedangkan OWASP — *"karena tiap situs unik"* — diorganisasi seputar **tipe/kategori kerentanan**.
> > - **Urutan A1–A10 BUKAN peringkat risiko.** *"Kesepuluhnya tidak dalam urutan tertentu, karena hampir mustahil menentukan mana yang mewakili risiko agregat terbesar."*
> > - Kategori diselaraskan dengan **OASIS Web Application Security (WAS) Technical Committee** — sebuah skema klasifikasi + *WAS Thesaurus* (kosakata standar untuk membahas keamanan aplikasi web).
> > - **_Living document_** yang diperbarui tahunan berdasarkan diskusi milis OWASP.
> >
> > ### Daftar OWASP Top Ten 2004
> >
> > | # | Kategori | WAS Thesaurus | Inti masalah (dari dokumen) |
> > |---|---|---|---|
> > | **A1** | Unvalidated Input | Input Validation | Informasi dari request web dipakai aplikasi tanpa divalidasi → serang komponen back-end |
> > | **A2** | Broken Access Control | Access Control | Pembatasan atas apa yang boleh dilakukan *authenticated user* tidak ditegakkan |
> > | **A3** | Broken Authentication and Session Management | Authentication and Session Management | Kredensial akun & token sesi tak dilindungi → asumsi identitas user lain |
> > | **A4** | Cross-Site Scripting (XSS) Flaws | Input Validation → Cross site scripting | Aplikasi jadi mekanisme untuk mengantar serangan ke browser pengguna akhir |
> > | **A5** | Buffer Overflows | Buffer Overflows | Komponen di bahasa tertentu yang tak memvalidasi input bisa crash / diambil alih prosesnya |
> > | **A6** | Injection Flaws | Input Validation → Injection | Parameter ke sistem eksternal / OS lokal disisipi perintah jahat |
> > | **A7** | Improper Error Handling | Error Handling | Kondisi error tidak ditangani benar → bocor info sistem, DoS, kegagalan mekanisme keamanan |
> > | **A8** | Insecure Storage | Data Protection | Fungsi kripto untuk melindungi info & kredensial sulit dikode benar → proteksi lemah |
> > | **A9** | Denial of Service **(NEW)** | Availability | Penyerang menghabiskan sumber daya aplikasi → user sah tak bisa mengakses |
> > | **A10** | Insecure Configuration Management | Application/Infrastructure Configuration Management | Standar konfigurasi server yang kuat kritikal; server tak aman *out of the box* |
> >
> > ```mermaid
> > flowchart LR
> >     subgraph S2003["2003"]
> >         O1["A1 Unvalidated Parameters"]
> >         O2["A2 Broken Access Control"]
> >         O3["A3 Broken Account &amp; Session Mgmt"]
> >         O4["A4 XSS Flaws"]
> >         O5["A5 Buffer Overflows"]
> >         O6["A6 Command Injection Flaws"]
> >         O7["A7 Error Handling Problems"]
> >         O8["A8 Insecure Use of Cryptography"]
> >         O9["A9 Remote Administration Flaws"]
> >         O10["A10 Web &amp; App Server Misconfiguration"]
> >     end
> >     subgraph S2004["2004"]
> >         N1["A1 Unvalidated Input"]
> >         N2["A2 Broken Access Control"]
> >         N3["A3 Broken Authentication &amp; Session Mgmt"]
> >         N4["A4 XSS Flaws"]
> >         N5["A5 Buffer Overflows"]
> >         N6["A6 Injection Flaws"]
> >         N7["A7 Improper Error Handling"]
> >         N8["A8 Insecure Storage"]
> >         N9["A9 Denial of Service (NEW)"]
> >         N10["A10 Insecure Configuration Management"]
> >     end
> >     O1 -- "rename" --> N1
> >     O2 --> N2
> >     O9 -- "dilebur (special case)" --> N2
> >     O3 -- "rename" --> N3
> >     O4 --> N4
> >     O5 --> N5
> >     O6 -- "rename" --> N6
> >     O7 -- "rename" --> N7
> >     O8 -- "rename" --> N8
> >     O10 -- "rename" --> N10
> >     X9["(slot A9 kosong)"] -- "diisi" --> N9
> > ```
> >
> > ### A1 — Unvalidated Input
> >
> > **Deskripsi.** Aplikasi web memakai input dari **request HTTP** (kadang file) untuk menentukan responsnya. Penyerang bisa **memodifikasi bagian mana pun** dari request HTTP — URL, *querystring*, header, cookie, *form field*, *hidden field* — untuk melewati mekanisme keamanan. Nama serangan *input tampering* yang umum: **forced browsing, command insertion, cross site scripting, buffer overflows, format string attacks, SQL injection, cookie poisoning, hidden field manipulation** (masing-masing dibahas di butir lain).
> >
> > **Konsep _canonicalization_.** Banyak format *encoding* HTTP (mudah di-*decode*, bukan enkripsi); developer sering lupa **men-*decode* parameter ke bentuk paling sederhana sebelum memvalidasinya** — input jahat bisa "disamarkan" dan lolos filter. Proses menyederhanakan encoding disebut **canonicalization**. **Validasi sisi klien mudah dilewati** (penyerang membuat request sendiri dengan telnet) → *"validasi sisi klien tidak punya manfaat keamanan sama sekali."*
> >
> > **Cara Menentukan Kerentanan.** Setiap bagian request HTTP yang dipakai tanpa divalidasi hati-hati disebut parameter **"tainted"**. Cara paling sederhana: **code review** mencari semua pemanggilan yang mengambil info dari request HTTP (mis. metode `HttpServletRequest` di J2EE), lalu telusuri pemakaiannya. Perl: opsi **`taint` (-T)**. Bisa juga pakai *tool* seperti WebScarab.
> >
> > **Cara Melindungi Diri.** Validasi **semua** parameter sebelum dipakai — paling efektif lewat **komponen/library terpusat**. Tiap parameter dicek terhadap **spesifikasi "positif"** yang mendefinisikan: tipe data, *character set* yang diizinkan, panjang min/maks, apakah `null` boleh, apakah wajib, apakah duplikat boleh, rentang numerik, nilai legal spesifik (enumerasi), pola spesifik (*regex*). Pendekatan "negatif"/berbasis *signature* **tidak efektif & sulit dipelihara**. *Web application firewall* bisa membantu bila dikonfigurasi dengan definisi ketat per parameter.
> >
> > ### A2 — Broken Access Control
> >
> > **Deskripsi.** *Access control* (kadang disebut *authorization*) menentukan konten/fungsi mana yang diberikan ke user tertentu **setelah autentikasi**. *"Terdengar sederhana tetapi sangat sulit diimplementasikan dengan benar."* Skema kontrol akses sering **tidak dirancang sengaja** — berkembang bersama situs, aturannya tersebar di seluruh kode sampai *"hampir mustahil dipahami."* Konsekuensi cacat: melihat konten tak berwenang, **mengubah/menghapus konten, menjalankan fungsi tak berwenang, bahkan mengambil alih administrasi situs**.
> >
> > **Sub-kasus spesifik:**
> >
> > - **Insecure Id's** — situs memakai id/key/index untuk merujuk user/role/konten/objek/fungsi; bila bisa ditebak & tidak divalidasi, penyerang bebas mengeksplorasi. *"Aplikasi web tidak boleh mengandalkan kerahasiaan id apa pun untuk proteksi."*
> > - **Forced Browsing Past Access Control Checks** — user yang **melewati halaman ber-cek keamanan** tidak boleh tetap mendapat akses.
> > - **Path Traversal** — menyisipkan info path relatif (`../../target_dir/target_file`) untuk mengakses file yang normalnya tak dapat diakses.
> > - **File Permissions** — hanya file yang memang untuk web user ditandai *readable*; kebanyakan direktori tidak; sangat sedikit (jika ada) file *executable*.
> > - **Client Side Caching** — banyak user memakai komputer bersama (perpustakaan, sekolah, bandara); browser sering *cache* halaman → pakai **HTTP header + meta tag** agar halaman sensitif tidak di-*cache*.
> >
> > **Cara Menentukan Kerentanan.** **Kebijakan kontrol akses harus terdokumentasi jelas** + pendekatan penegakannya di dokumentasi desain — bila tak ada, situs kemungkinan rentan. Kode kontrol akses harus **terstruktur, modular, terpusat**; lakukan *code review* detail + pentest. **Cari tahu cara situs diadministrasi** (bagaimana halaman diubah, di mana diuji, bagaimana ditransfer ke produksi, bagaimana kanal komunikasi admin dilindungi).
> >
> > **Cara Melindungi Diri.** Pikirkan kebutuhan kontrol akses dan tangkap dalam **kebijakan keamanan aplikasi**; **gunakan matriks kontrol akses**. Tanpa kebijakan terdokumentasi, tak ada definisi "aman" untuk situs itu. Uji ekstensif dengan berbagai akun. Untuk **fungsi administratif**: *"jangan pernah izinkan akses admin lewat pintu depan situs bila memungkinkan"* — bila akses admin jarak jauh mutlak perlu, pakai **VPN** ke jaringan internal lalu akses via koneksi back-end terlindungi.
> >
> > ### A3 — Broken Authentication and Session Management
> >
> > **Deskripsi.** Mencakup **semua aspek autentikasi user + pengelolaan sesi aktif**. Bahkan mekanisme autentikasi yang solid bisa **dilemahkan oleh fungsi manajemen kredensial yang cacat** — *password change, forgot my password, remember my password, account update*. Karena serangan **"walk by" mungkin**, *"semua fungsi manajemen akun harus meminta re-autentikasi meski user punya session id valid."* HTTP tak menyediakan sesi → aplikasi membuatnya sendiri; membuat token sesi kuat & melindunginya sepanjang siklus hidup *"terbukti sulit dipahami banyak developer."*
> >
> > **Cara Menentukan Kerentanan.** *Code review* + pentest. Tinjau tiap aspek: kredensial dilindungi **saat _at rest_ (disk) dan _in transit_ (login)**; tiap mekanisme ganti kredensial hanya bisa oleh user berwenang; session identifier selalu dilindungi.
> >
> > **Cara Melindungi Diri.** Dokumentasikan **kebijakan pengelolaan kredensial** lalu tegakkan konsisten. Area kritis:
> >
> > - **Password Strength** — ukuran & kompleksitas minimum; ganti berkala; cegah pemakaian ulang password lama.
> > - **Password Use** — batasi jumlah percobaan login per satuan waktu; log kegagalan (**jangan catat password**); jangan indikasikan apakah *username* atau *password* yang salah; beri tahu user tanggal/waktu login sukses terakhir & jumlah percobaan gagal.
> > - **Password Change Controls** — satu mekanisme ganti password; selalu minta password **lama + baru**; bila password lupa di-email, minta re-autentikasi saat user mengubah alamat email.
> > - **Password Storage** — semua password disimpan **ter-hash (lebih disukai, tak reversibel) atau terenkripsi**; jangan pernah *hardcode* di kode sumber.
> > - **Protecting Credentials in Transit** — satu-satunya teknik efektif: **enkripsi seluruh transaksi login (SSL)**; hashing di klien "memberi sedikit proteksi" karena versi hash bisa di-*intercept* & di-*retransmit*.
> > - **Session ID Protection** — idealnya seluruh sesi via SSL; session ID **tidak di URL**, angka acak panjang & rumit, diganti saat transisi (SSL, autentikasi); **session ID pilihan user tidak boleh diterima**.
> > - **Account Lists** — hindari mengekspos daftar nama akun; bila perlu, pakai **pseudonim (screen name)**.
> > - **Browser Caching** — data autentikasi/sesi jangan lewat GET (pakai POST); halaman autentikasi ber-*no cache*; `autocomplete=false`.
> > - **Trust Relationships** — hindari *implicit trust* antar komponen; tiap komponen mengautentikasi diri.
> >
> > ### A4 — Cross-Site Scripting (XSS) Flaws
> >
> > **Deskripsi.** Terjadi ketika penyerang **memakai aplikasi web untuk mengirim kode jahat (umumnya JavaScript) ke pengguna akhir lain**. Browser korban *"tak punya cara tahu skrip tak boleh dipercaya"* dan mengeksekusinya karena mengira datang dari sumber tepercaya → skrip bisa mengakses **cookie, token sesi, info sensitif** dan bahkan menulis ulang konten halaman HTML. Dua kategori: **stored** (kode tersimpan permanen di server — DB, forum, log pengunjung, kolom komentar) dan **reflected** (kode dipantulkan dari server — pesan error, hasil pencarian; dikirim ke korban lewat email atau situs lain). *"Jangan tertipu berpikir situs 'read only' / 'brochureware' aman dari reflected XSS."* Contoh dampak ekstrem: XSS di situs farmasi bisa **mengubah info dosis → overdosis**; XSS pada siaran pers → memengaruhi harga saham. XSS juga bisa ada di **error page web/app server** (404, 500) yang memantulkan info request.
> >
> > **Cara Menentukan Kerentanan.** *Security review* kode, cari semua tempat input dari request HTTP bisa masuk ke output HTML. Nessus, Nikto membantu tetapi *"hanya menggores permukaan."*
> >
> > **Cara Melindungi Diri.** **Validasi semua header, cookie, query string, form field, hidden field** terhadap spesifikasi ketat. Validasi **jangan mencoba mengidentifikasi & menghapus/memfilter/menyanitasi _active content_** — terlalu banyak tipe & cara *encoding*. Pakai **kebijakan "positif"**. *Encoding* output juga membantu — konversi karakter ke **HTML entity encoding**:
> >
> > | Dari | Ke |
> > |---|---|
> > | `<` | `&lt;` |
> > | `>` | `&gt;` |
> > | `(` | `&#40;` |
> > | `)` | `&#41;` |
> > | `#` | `&#35;` |
> > | `&` | `&#38;` |
> >
> > OWASP menyediakan **OWASP Filters project**, **CodeSeeker** (*application level firewall*), dan pelajaran XSS di **WebGoat**.
> >
> > ### A5 — Buffer Overflows
> >
> > **Deskripsi.** Penyerang memakai *buffer overflow* untuk **merusak _execution stack_** aplikasi web; dengan input yang dirancang cermat, aplikasi bisa **mengeksekusi kode arbitrer — praktis mengambil alih mesin**. *"Tidak mudah ditemukan dan bahkan setelah ditemukan, umumnya sangat sulit dieksploitasi."* Kelas serupa: **format string attacks**. Bisa ada di produk web/app server maupun kode aplikasi kustom (mis. saat memakai **library grafis** untuk membuat gambar). **Java & J2EE kebal** (kecuali overflow di JVM itu sendiri).
> >
> > **Cara Menentukan Kerentanan.** Untuk produk server & library: **ikuti laporan bug terbaru**. Untuk kode kustom: **review semua kode yang menerima input via request HTTP** — pastikan menangani input berukuran arbitrer besar.
> >
> > **Cara Melindungi Diri.** Ikuti laporan bug & **terapkan patch terbaru** untuk produk web/app server & infrastruktur; **pindai berkala** dengan *scanner* buffer overflow. Untuk kode kustom: **cek ukuran semua input** — bahkan di environment yang kebal, input besar yang tak tertangani bisa menyebabkan **DoS**.
> >
> > ### A6 — Injection Flaws
> >
> > **Deskripsi.** Memungkinkan penyerang **merelai kode jahat lewat aplikasi web ke sistem lain** — *system call* ke OS, program eksternal via *shell command*, dan **SQL (SQL injection)**. Seluruh skrip Perl/Python bisa disisipkan ke aplikasi yang dirancang buruk. *"Setiap kali aplikasi web memakai interpreter tipe apa pun, ada bahaya serangan injeksi."* **Sendmail** adalah program eksternal yang paling sering dipanggil. **SQL injection** sangat luas & berbahaya — penyerang menemukan parameter yang diteruskan ke database, menyisipkan perintah SQL jahat → **memperoleh, merusak, atau menghancurkan isi database**.
> >
> > **Contoh (dari dokumen).** Parameter jahat mengubah aksi *system call* yang normalnya mengambil file user (via `../`); perintah tambahan di akhir parameter ke *shell script* (mis. `; rm –r *`); query SQL dimodifikasi dengan menambah *constraint* ke *where clause* (mis. `OR 1=1`).
> >
> > **Cara Menentukan Kerentanan.** **Cari di kode sumber semua pemanggilan ke sumber daya eksternal** (`system`, `exec`, `fork`, `Runtime.exec`, query SQL, dll.) — banyak bahasa punya berbagai cara menjalankan perintah eksternal; periksa tiap pemanggilan.
> >
> > **Cara Melindungi Diri.**
> >
> > - **Hindari mengakses interpreter eksternal** bila memungkinkan — untuk banyak *shell command* & *system call* ada **library khusus bahasa** yang tak melibatkan *shell interpreter*.
> > - Untuk pemanggilan yang tetap dipakai (mis. ke database): **validasi data secara cermat**; strukturkan request agar semua parameter diperlakukan sebagai **data, bukan konten yang bisa dieksekusi** — **_stored procedure_ / _prepared statement_** memberi proteksi signifikan.
> > - **Least privilege** — jangan jalankan web server sebagai `root` atau akses database sebagai `DBADMIN`. Java sandbox (J2EE) bisa mencegah eksekusi *system command*.
> > - **Cek semua output, return code, dan error code** dari pemanggilan — minimal agar tahu ada yang salah.
> >
> > ### A7 — Improper Error Handling
> >
> > **Deskripsi.** Masalah paling umum: **pesan error internal detail** (*stack trace, database dump, error code*) ditampilkan ke user/hacker → membocorkan detail implementasi. Error muncul saat operasi normal (*out of memory, null pointer, system call failure, database unavailable, network timeout*) — harus ditangani dengan skema yang **memberi pesan berarti ke user, info diagnostik ke pemelihara, dan _tidak ada info berguna_ ke penyerang**. Bahkan **inkonsistensi** pesan membocorkan petunjuk: *"file not found"* vs *"access denied"* mengungkapkan keberadaan file / struktur direktori. Masalah keamanan umum: **_fail-open_ security check** — semua mekanisme keamanan harus **menolak akses sampai diberikan secara eksplisit**, bukan sebaliknya.
> >
> > **Cara Menentukan Kerentanan.** *Testing* sederhana untuk melihat respons terhadap error input; testing lebih menyeluruh untuk memicu **error internal**. **Code review** logika penanganan error — harus konsisten di seluruh situs; bila tak ada organisasi atau ada beberapa skema berbeda → kemungkinan bermasalah.
> >
> > **Cara Melindungi Diri.** **Dokumentasikan kebijakan penanganan error** — tipe error yang ditangani, apa yang dilaporkan ke user, apa yang di-*log*. Semua developer memahami & mengikutinya. Situs **_gracefully handle_ semua error**; kelas error tertentu di-*log* untuk mendeteksi cacat/upaya *hacking*. Aplikasi web bisa **melacak percobaan gagal berulang & menghasilkan alert**; *"mayoritas serangan aplikasi web tak pernah terdeteksi karena sedikit situs punya kemampuan mendeteksinya."*
> >
> > ### A8 — Insecure Storage
> >
> > **Deskripsi.** Kebanyakan aplikasi web perlu **menyimpan info sensitif** (password, nomor kartu kredit, rekaman akun, info proprietary). Enkripsi kini mudah dipakai, tetapi developer sering **salah saat mengintegrasikannya** — dan sering **melebih-lebihkan proteksi** yang didapat sehingga lengah pada aspek lain. Kesalahan umum: **gagal mengenkripsi data kritikal**; **penyimpanan kunci/sertifikat/password yang tak aman**; penyimpanan *secret* di memori yang keliru; **sumber _randomness_ yang buruk**; **pilihan algoritma yang buruk**; **mencoba membuat algoritma enkripsi baru**; gagal mendukung perubahan kunci. *(Bagian ini TIDAK mencakup SSL — itu di A10.)*
> >
> > **Cara Menentukan Kerentanan.** Tanpa akses kode sumber, sangat memakan waktu — tetapi bisa **memeriksa token/session ID/cookie apakah jelas tidak acak**. Cara termudah: **review kode** implementasi fungsi kripto (peninjau harus **berlatar kuat di kriptografi & cacat umum**), termasuk bagaimana kunci/password/*secret* disimpan, dilindungi, dimuat, diproses, dan **dibersihkan dari memori**.
> >
> > **Cara Melindungi Diri.**
> >
> > - **Minimalkan pemakaian enkripsi** — simpan hanya info yang mutlak perlu. Contoh: alih-alih menyimpan nomor kartu kredit terenkripsi, **minta user memasukkannya ulang**.
> > - Alih-alih menyimpan password terenkripsi, pakai **fungsi satu arah (SHA-1)** untuk mem-*hash*-nya.
> > - Bila kripto harus dipakai: pilih **library yang telah melalui pengawasan publik** & tanpa kerentanan terbuka; **enkapsulasi** fungsi kripto & review kode dengan cermat.
> > - *"Master secret harus dipecah ke setidaknya dua lokasi dan dirakit saat runtime"* (mis. *config file*, server eksternal, atau di dalam kode).
> >
> > ### A9 — Denial of Service **(kategori baru 2004)**
> >
> > **Deskripsi.** Aplikasi web **sangat rentan** DoS. (DoS jaringan seperti *SYN flood* di luar cakupan.) Aplikasi *"tak bisa dengan mudah membedakan serangan dari trafik biasa"* — **IP address bukan credential identifikasi yang berguna**; sulit membedakan serangan terdistribusi dari banyak user me-*reload* bersamaan atau efek *"slashdotted"*. Kebanyakan web server menangani beberapa ratus user konkuren; **satu penyerang dari satu host bisa membanjiri banyak aplikasi**. Sumber daya terbatas yang bisa dihabiskan: **bandwidth, koneksi database, disk, CPU, memori, thread**. Contoh: situs yang mengizinkan user tak terautentikasi meminta trafik forum memicu banyak query DB per request → *connection pool* habis. Varian lain menyasar sumber daya per-user: **mengunci akun** dengan kredensial salah berulang, atau memaksa *password reset*. Aplikasi yang **tak menangani error dengan benar** bahkan bisa **menjatuhkan container aplikasi**.
> >
> > **Cara Menentukan Kerentanan.** *"Salah satu bagian tersulit dari serangan DoS adalah menentukan apakah kamu rentan."* Tool *load testing* (**JMeter**) — uji **berapa request per detik** aplikasi bisa layani; uji dari **satu IP** untuk memperkirakan berapa yang harus dihasilkan penyerang. Analisis tiap sumber daya untuk melihat apakah bisa dihabiskan — fokus pada apa yang bisa dilakukan **user tak terautentikasi**.
> >
> > **Cara Melindungi Diri.** *"Tidak ada cara melindungi sempurna."* Aturan umum: **batasi sumber daya per user seminimal mungkin**.
> >
> > - User terautentikasi: **kuota**; pertimbangkan **hanya menangani satu request per user pada satu waktu** (sinkron pada sesi user); atau *drop* request yang sedang diproses saat request baru datang dari user itu.
> > - User tak terautentikasi: **hindari akses tak perlu ke database / sumber daya mahal**; arsitektur alur agar user tak terautentikasi tak bisa memanggil operasi mahal; pertimbangkan **caching** konten.
> > - **Cek skema penanganan error** agar satu error tak memengaruhi operasi keseluruhan aplikasi.
> >
> > ### A10 — Insecure Configuration Management
> >
> > **Deskripsi.** Konfigurasi **web server & application server** berperan kunci. Sering ada **jurang lebar antara yang menulis aplikasi dan yang mengoperasikan situs**. Masalah konfigurasi server yang beragam: **celah keamanan tak ter-patch**; **directory listing & directory traversal**; **file default/backup/sample yang tak perlu**; **izin file & direktori yang keliru**; **servis tak perlu aktif** (manajemen konten, remote administration); **akun default dengan password default**; **fungsi admin/debugging yang aktif/dapat diakses**; **pesan error berlebihan**; **sertifikat SSL & setelan enkripsi salah konfigurasi**; **sertifikat _self-signed_ / default**; autentikasi keliru dengan sistem eksternal.
> >
> > **Cara Menentukan Kerentanan.** *"Jika kamu belum berupaya sungguh-sungguh mengunci web & app server, kamu kemungkinan besar rentan"* — sedikit produk server yang aman *out of the box*. **Konfigurasi aman harus terdokumentasi & sering diperbarui**; review manual panduan konfigurasi secara berkala + bandingkan dengan sistem yang benar-benar ter-deploy. Pindai dengan **Nessus & Nikto** — internal & eksternal — minimal **bulanan**.
> >
> > **Cara Melindungi Diri.** Buat **_hardening guideline_** untuk konfigurasi spesifikmu, dipakai di semua host (termasuk environment pengembangan). Mulai dari panduan vendor / OWASP / CERT / SANS lalu sesuaikan. Isi guideline: **konfigurasi semua mekanisme keamanan, matikan semua servis tak terpakai, atur role/permission/account (nonaktifkan/ganti password akun default), logging & alert**. Untuk banyak server: **otomasi** proses konfigurasi (atau *disk replication* seperti Ghost dari server yang sudah di-*harden*). **Assign tanggung jawab** menjaga konfigurasi mutakhir ke individu/tim; proses pemeliharaan: pantau kerentanan terbaru, terapkan patch, perbarui guideline, pemindaian rutin internal & eksternal, laporan status berkala ke manajemen.
> >
> > ### Perubahan dari Edisi 2003
> >
> > *(Menurut bagian "What's New?" dokumen 2004 — hanya ada perbaikan minor di semua bagian, ditambah beberapa perubahan besar:)*
> >
> > 1. **WAS-XML Alignment** — Top Ten **di-reprofile** memakai **OASIS WAS Technical Committee** sebagai referensi, memberi pendekatan terstandardisasi untuk klasifikasi; kosakata **WAS Thesaurus** diadopsi.
> > 2. **Penambahan A9 Denial of Service** — *"satu-satunya kategori level atas yang berubah."* Riset OWASP menunjukkan beragam organisasi rentan; berdasarkan *likelihood* & konsekuensi, layak masuk Top Ten.
> > 3. **Untuk mengakomodasi A9:** **A9:2003 _Remote Administration Flaws_ dilebur ke A2 _Broken Access Control_** — dianggap **kasus khusus** dari kategori itu (jenis cacat & remediasinya sama).
> > 4. **Ganti nama:** A1 *Unvalidated Parameters* → **Unvalidated Input**; A3 *Broken Account and Session Management* → **Broken Authentication and Session Management**; A6 *Command Injection Flaws* → **Injection Flaws**; A7 *Error Handling Problems* → **Improper Error Handling**; A8 *Insecure Use of Cryptography* → **Insecure Storage**; A10 *Web and Application Server Misconfiguration* → **Insecure Configuration Management**.

> [!cornell] #### Summary
>
> **OWASP Top Ten 2004** adalah **dokumen konsensus komunitas** (bukan berbasis data — *"tidak ada sumber statistik yang andal"*), disajikan dalam **format SANS/FBI Top Twenty**, diorganisasi seputar **kategori kerentanan**, dan **tidak diurutkan berdasarkan risiko**. Ia menyelaraskan kategori dengan **OASIS WAS Thesaurus**. Perubahan dari [[OWASP Top 10 2003]]: penambahan **A9 Denial of Service** (satu-satunya kategori level-atas yang berubah), peleburan **Remote Administration Flaws** ke **Broken Access Control** sebagai kasus khusus, plus penamaan ulang enam kategori (*Unvalidated Parameters → Unvalidated Input*, *Command Injection Flaws → Injection Flaws*, *Insecure Use of Cryptography → Insecure Storage*, dst.). Edisi ini menjadi rujukan bagi [[OWASP Top 10 2007]] — yang memecah *Broken Access Control* menjadi *Insecure Direct Object Reference* + *Failure to Restrict URL Access*, memindahkan *validasi input* menjadi solusi lintas-kategori, serta menghapus *Buffer Overflows*, *Denial of Service*, dan *Insecure Configuration Management*.

> [!ad-libitum]- Additional Information
>
> #### Nasib kategori 2004 di edisi berikutnya (konteks tambahan, bukan dari dokumen 2004)
>
> | 2004 | 2007 |
> |---|---|
> | A1 Unvalidated Input | **Dihapus** — validasi input jadi bagian solusi banyak item lain |
> | A2 Broken Access Control | **Dipecah** → A4 Insecure Direct Object Reference + A10 Failure to Restrict URL Access |
> | A5 Buffer Overflows | **Dihapus** — isu C/C++, ditangani komunitas non-web |
> | A9 Denial of Service | **Dihapus** — peringkat MITRE tak cukup |
> | A10 Insecure Configuration Management | **Dihapus** (kembali sebagai A6 pada [[OWASP Top 10 2010]]) |
> | A6 Injection Flaws | Naik → A2:2007 |
> | A4 XSS Flaws | Naik → A1:2007 |
> | A8 Insecure Storage | → A8:2007 Insecure Cryptographic Storage |
>
> #### Karakter era: pra-data, WAS-XML, ESAPI/CodeSeeker
>
> - **2003–2004 adalah edisi "konsensus murni"** — tak ada MITRE/CVE, survei, atau data pentest. Metodologi berbasis data baru mulai [[OWASP Top 10 2007]] (MITRE) lalu [[OWASP Top 10 2010]] & [[OWASP Top 10 2013]] (data kontributor).
> - Proyek **OASIS WAS-XML** (klasifikasi kerentanan berbasis XML) berpengaruh besar pada 2004 tetapi kemudian ditinggalkan — [[OWASP Top 10 2007]] menyatakan *"kami tak lagi memakai skema penamaan WAS XML."*
> - Tool yang dirujuk (**OWASP Filters, CodeSeeker, Stinger, WebGoat**) mencerminkan ekosistem OWASP awal; sebagian besar kini digantikan **ESAPI**, lalu **Cheat Sheet Series** & framework modern.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil tabel "What's New?" 2004 dan tabel pemetaan 2007 → buat satu diagram besar evolusi 2003 → 2010.
> 2. Untuk tiap kategori 2004, tentukan padanan terdekatnya di [[OWASP Top 10 2021]] (atau tandai "dihapus/dilebur") — perhatikan bahwa DoS & Buffer Overflow tak pernah kembali.
> 3. Baca sub-kasus "Broken Access Control" 2004 (Insecure Id's, Path Traversal, dll.) dan bandingkan dengan daftar kelemahan di A01:2021 Broken Access Control — banyak yang identik.
>
> #### Bacaan Lanjutan
>
> - OWASP Top Ten 2004 (PDF resmi) — GitHub `OWASP/Top10/2004/`.
> - SANS/FBI Top 20 Internet Security Vulnerabilities (format acuan).
> - OASIS Web Application Security (WAS) TC — WAS Thesaurus.
> - Aleph One, *"Smashing the Stack for Fun and Profit"* (Phrack 49) — konteks A5.
