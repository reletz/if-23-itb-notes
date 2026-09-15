---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] OWASP Top 10 2021
>
> > ## Questions/Cues
> >
> > - Apa yang berubah dari [[OWASP Top 10 2017]] ke 2021 (kategori baru / ganti nama / gabung)?
> > - Bagaimana metodologi 2021 — 8 kategori data + 2 survei; apa itu *incidence rate*?
> > - Apa 10 kategori 2021 dan urutannya?
> > - Mengapa Broken Access Control naik dari #5 ke #1?
> > - Contoh skenario serangan untuk Cryptographic Failures, Insecure Design, dan SSRF?
> >
> > ## Reference Points
> >
> > - IF5161 — OWASP Top 10:2021, Introduction (owasp.org/Top10/2021)
> > - IF5161 — OWASP Top 10:2021, halaman kategori A01–A10
>
> > ### Konteks & Metodologi
> >
> > **OWASP Top 10:2021** adalah edisi ke-7 dan merupakan lompatan besar dalam basis data: mengubah fokus dari *gejala* ke **akar masalah (root cause)**. Dari 10 kategori: **8 dipilih dari data kontribusi** dan **2 dari _community survey_** (menangkap risiko yang naik tetapi belum dapat diukur alat otomatis — pada 2021: **A04 Insecure Design** dan **A10 SSRF**).
> >
> > **Skala data (2021):**
> >
> > | Aspek | Angka |
> > |---|---|
> > | Aplikasi dianalisis | > 500.000 (dataset terbesar saat itu) |
> > | CWE yang ditelaah | naik dari ± 30 → **hampir 400 CWE** |
> > | CVE dipetakan ke CWE (dari NVD) | ± 125.000 rekaman |
> >
> > **Pergeseran metodologi:**
> >
> > - **Incidence rate, bukan frequency** — dihitung *persentase populasi aplikasi yang punya setidaknya satu instance* sebuah CWE, bukan jumlah temuan mentah. Ini mencegah jenis kerentanan bervolume tinggi (mis. hasil pemindai) mendominasi peringkat.
> > - **Fokus akar masalah** — mis. "Cryptographic Failures" menggantikan "Sensitive Data Exposure".
> > - **Integrasi CVSS** — skor exploit & impact dihitung per CWE dari CVE ber-CVSS, ditimbang antara CVSSv2 & v3.
> >
> > ### Daftar OWASP Top 10 2021
> >
> > | # | Kategori | Inti masalah | Perubahan vs 2017 |
> > |---|---|---|---|
> > | **A01** | Broken Access Control | Pengguna bertindak di luar izin | **#5 → #1**; CSRF sudah tergabung di sini |
> > | **A02** | Cryptographic Failures | Kegagalan/ketiadaan kriptografi → data terekspos | **Ganti nama** dari "Sensitive Data Exposure"; #3 → #2 |
> > | **A03** | Injection | Input tak tepercaya dieksekusi interpreter | **#1 → #3**; **XSS digabung** ke sini |
> > | **A04** | Insecure Design | Kontrol keamanan hilang/tak efektif sejak desain | **Baru** (dari community survey) |
> > | **A05** | Security Misconfiguration | Konfigurasi tidak aman di seluruh stack | #6 → #5; **XXE digabung** ke sini |
> > | **A06** | Vulnerable and Outdated Components | Memakai komponen usang/rentan | **Ganti nama** dari "Using Components with Known Vulnerabilities"; #9 → #6 |
> > | **A07** | Identification and Authentication Failures | Sistem menerima pengguna ilegitim | **Ganti nama** dari "Broken Authentication"; #2 → #7 |
> > | **A08** | Software and Data Integrity Failures | Kode/data tak terverifikasi dianggap tepercaya | **Baru**; **Insecure Deserialization digabung** ke sini |
> > | **A09** | Security Logging and Monitoring Failures | Gagal mendeteksi & merespons serangan | **Ganti nama** dari "Insufficient Logging & Monitoring"; #10 → #9 |
> > | **A10** | Server-Side Request Forgery (SSRF) | Aplikasi mengambil URL tanpa validasi | **Baru** (dari community survey) |
> >
> > ```mermaid
> > flowchart LR
> >     subgraph S2017["2017"]
> >         O1["A1 Injection"]
> >         O2["A2 Broken Authentication"]
> >         O3["A3 Sensitive Data Exposure"]
> >         O4["A4 XXE"]
> >         O5["A5 Broken Access Control"]
> >         O6["A6 Security Misconfiguration"]
> >         O7["A7 XSS"]
> >         O8["A8 Insecure Deserialization"]
> >         O9["A9 Vulnerable Components"]
> >         O10["A10 Insufficient Logging &amp; Monitoring"]
> >     end
> >     subgraph S2021["2021"]
> >         N1["A01 Broken Access Control"]
> >         N2["A02 Cryptographic Failures"]
> >         N3["A03 Injection"]
> >         N4["A04 Insecure Design (baru)"]
> >         N5["A05 Security Misconfiguration"]
> >         N6["A06 Vulnerable &amp; Outdated Components"]
> >         N7["A07 Identification &amp; Auth Failures"]
> >         N8["A08 Software &amp; Data Integrity Failures (baru)"]
> >         N9["A09 Security Logging &amp; Monitoring Failures"]
> >         N10["A10 SSRF (baru)"]
> >     end
> >     O5 --> N1
> >     O3 -- "rename" --> N2
> >     O1 --> N3
> >     O7 -- "merge" --> N3
> >     O6 --> N5
> >     O4 -- "merge" --> N5
> >     O9 -- "rename" --> N6
> >     O2 -- "rename" --> N7
> >     O8 -- "merge" --> N8
> >     O10 -- "rename" --> N9
> > ```
> >
> > ### A01 — Broken Access Control
> >
> > **Deskripsi.** *Access control* menegakkan batas kebijakan; kegagalannya memungkinkan **pengungkapan, modifikasi, atau penghancuran data tanpa izin, serta menjalankan fungsi di luar hak pengguna**. Naik dari **#5 ke #1**: 94% aplikasi yang diuji punya suatu bentuk *broken access control*. **34 CWE**, incidence rate maks **55,97%**, ± 19.013 CVE. Kelemahan umum:
> >
> > - Melanggar *least privilege* / *deny by default* — akses seharusnya dibatasi tetapi terbuka untuk semua.
> > - Melewati pengecekan lewat **manipulasi parameter URL, modifikasi *state*, atau memodifikasi request API**.
> > - Melihat/menyunting akun orang lain via **IDOR (Insecure Direct Object Reference)**.
> > - **Endpoint POST/PUT/DELETE tanpa kontrol akses**.
> > - **Elevasi privilege** — bertindak sebagai user tanpa login, atau sebagai admin sebagai user biasa.
> > - **Manipulasi metadata** — tampering JWT, penyalahgunaan cookie / *hidden field*.
> > - **CORS salah konfigurasi** → API diakses origin tak berwenang.
> > - **Force browsing** ke halaman terbatas.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi memakai data tak terverifikasi dalam SQL: `pstmt.setString(1, request.getParameter("acct")); ResultSet results = pstmt.executeQuery();` Penyerang mengubah parameter `acct` di browser: `https://example.com/app/accountInfo?acct=notmyacct` → mengakses akun mana pun.
> > 2. Penyerang cukup memaksa URL. `https://example.com/app/getappInfo` dan `https://example.com/app/admin_getappInfo`. *"Jika user tak terautentikasi bisa mengakses salah satu halaman, itu cacat. Jika non-admin bisa mengakses halaman admin, itu cacat."*
> >
> > **Cara Pencegahan.**
> >
> > - **Deny by default** kecuali sumber daya publik.
> > - Mekanisme kontrol akses **terpusat**, dipakai ulang di seluruh aplikasi; minimalkan CORS.
> > - Tegakkan **kepemilikan record**, bukan asumsi bahwa user bisa akses record apa pun.
> > - Batasan **logika bisnis** lewat *domain model*.
> > - Nonaktifkan *directory listing*; hapus file metadata/backup dari web root.
> > - **Log** kegagalan kontrol akses + alert admin.
> > - **Rate limit** akses API/controller.
> > - Invalidasi session ID di server saat logout; JWT berumur pendek.
> > - Sertakan **uji fungsional kontrol akses** di proses dev & QA.
> >
> > ### A02 — Cryptographic Failures
> >
> > **Deskripsi.** Naik ke #2; dulu **"Sensitive Data Exposure"** — yang lebih merupakan *gejala luas* ketimbang akar masalah. Fokus kini pada **kegagalan terkait kriptografi (atau ketiadaannya)**. Langkah pertama: tentukan kebutuhan proteksi data **in transit** dan **at rest** — password, nomor kartu kredit, rekam medis, rahasia bisnis, terutama di bawah **GDPR / PCI DSS**. **29 CWE**, incidence rate maks **46,44%**, ± 3.075 CVE. Pertanyaan kritis:
> >
> > - Ada data dikirim *clear text* (HTTP, SMTP, FTP)?
> > - Algoritma/protokol kripto **usang atau lemah**?
> > - Kunci **default/lemah**; manajemen kunci buruk?
> > - Enkripsi tidak dipaksakan; *security header* HTTP hilang?
> > - Validasi sertifikat server benar?
> > - **IV** dibuat tepat dan tidak pernah dipakai ulang?
> > - Password dipakai sebagai kunci kripto tanpa **KDF**?
> > - Randomness **cryptographically secure**?
> > - Fungsi hash *deprecated* (**MD5, SHA-1**)?
> > - Padding *deprecated* (**PKCS#1 v1.5**)?
> > - Pesan error kripto dieksploitasi lewat **side-channel** (mis. *padding oracle*)?
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Aplikasi mengenkripsi nomor kartu kredit dengan **enkripsi database otomatis**. Namun data **otomatis di-dekripsi** saat diambil, sehingga celah **SQL injection** mengembalikan nomor kartu dalam *clear text*.
> > 2. Situs tidak memaksa TLS / mendukung enkripsi lemah. Penyerang di Wi-Fi publik **men-*downgrade* HTTPS → HTTP**, mencuri *session cookie*, lalu **membajak sesi** dan mengakses/mengubah data pribadi korban (atau mengganti penerima transfer uang).
> > 3. Database password memakai hash **tanpa salt** / hash sederhana. Celah *file upload* memungkinkan penyerang mengambil database; hash tanpa salt dibongkar *rainbow table*, hash cepat dibongkar GPU meski di-salt.
> >
> > **Cara Pencegahan.**
> >
> > - **Klasifikasikan** semua data yang diproses/disimpan/dikirim; identifikasi mana yang sensitif.
> > - Jangan simpan data sensitif yang tak perlu; buang cepat atau pakai **tokenisasi/truncation** sesuai PCI DSS.
> > - **Enkripsi semua data sensitif at rest**; enkripsi data in transit dengan **TLS + forward secrecy**, paksa **HSTS**.
> > - Algoritma/protokol/kunci **mutakhir & kuat**; manajemen kunci benar.
> > - **Nonaktifkan caching** untuk respons berdata sensitif.
> > - Hindari protokol lama (FTP, SMTP) untuk data sensitif.
> > - Simpan password dengan **hash adaptif ber-salt + work factor** — Argon2, scrypt, bcrypt, PBKDF2.
> > - IV sesuai mode operasi, **tidak pernah dipakai ulang** untuk kunci tetap.
> > - Selalu **authenticated encryption**.
> > - Kunci dibuat acak; password → kunci lewat **KDF**.
> > - Verifikasi konfigurasi secara independen.
> >
> > ### A03 — Injection
> >
> > **Deskripsi.** Turun dari **#1 ke #3**. 94% aplikasi diuji terhadap suatu bentuk injection. **33 CWE**, incidence rate maks **19,09%**, ± 32.078 CVE. **XSS kini digabung** ke kategori ini (tercermin di **CWE-79**). Rentan bila:
> >
> > 1. Data pengguna **tidak divalidasi/difilter/disanitasi**.
> > 2. **Query dinamis / pemanggilan non-parameterized** tanpa *escaping* sadar-konteks dipakai langsung ke interpreter.
> > 3. Data berbahaya dipakai di **parameter pencarian ORM** untuk menarik record sensitif.
> > 4. Data berbahaya dipakai/dikonkatenasi langsung — struktur + data jahat bercampur.
> >
> > Jenis umum: **SQL, NoSQL, OS command, ORM, LDAP, Expression Language / OGNL** — *"konsepnya identik di semua interpreter."*
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Konstruksi SQL rentan: `String query = "SELECT * FROM accounts WHERE custID='" + request.getParameter("id") + "'";`
> > 2. Pemakaian **HQL/ORM** rentan serupa: `Query HQLQuery = session.createQuery("FROM accounts WHERE custID='" + request.getParameter("id") + "'");`
> >
> > Pada kedua kasus penyerang mengubah `id` menjadi `' UNION SELECT SLEEP(10);--` (URL: `http://example.com/app/accountView?id=' UNION SELECT SLEEP(10);--`), mengubah arti query untuk **mengembalikan semua record** tabel `accounts`. Serangan lebih berbahaya bisa **mengubah/menghapus data atau memanggil stored procedure**.
> >
> > **Cara Pencegahan.**
> >
> > - Pilihan utama: **safe API / parameterized interface**, atau migrasi ke **ORM** (tetap awas pada parameter pencarian ORM).
> > - **Validasi input positif sisi server** (*allowlist*) — bukan pertahanan lengkap.
> > - Untuk sisa query dinamis: **escape karakter khusus** dengan sintaks spesifik interpreter.
> > - Ingat: **nama tabel/kolom SQL tidak bisa di-escape** — nama struktur dari input pengguna berbahaya. Pakai `LIMIT` dsb. untuk membatasi kebocoran massal.
> >
> > ### A04 — Insecure Design
> >
> > **Deskripsi.** **Kategori baru 2021** — *"missing or ineffective control design"*. Perbedaan kunci: *"desain yang aman masih bisa punya cacat implementasi… tetapi **desain yang tidak aman tidak bisa diperbaiki oleh implementasi yang sempurna**"* karena kontrol yang dibutuhkan tak pernah dirancang. Akar utama: **tidak ada _business risk profiling_** sehingga tingkat keamanan yang dibutuhkan tak ditentukan. **40 CWE**, incidence rate maks **24,19%**, ± 2.691 CVE. Tiga pilar:
> >
> > - **Requirements & resource management** — kumpulkan & negosiasikan kebutuhan proteksi **CIA + authenticity** dan logika bisnis; anggarkan aktivitas keamanan di seluruh tahap.
> > - **Secure design** — *"budaya dan metodologi yang terus mengevaluasi ancaman"*; **threat modeling** disatukan ke sesi *refinement*; alur & *failure state* dipahami bersama. *"Secure design bukan add-on atau tool."*
> > - **Secure development lifecycle** — pola desain aman, *paved road*, library komponen aman, tooling, threat modeling; libatkan spesialis keamanan; pertimbangkan **OWASP SAMM**.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Alur pemulihan kredensial memakai **"pertanyaan & jawaban"** — dilarang NIST 800-63b, OWASP ASVS, dan OWASP Top 10, karena jawaban bisa diketahui lebih dari satu orang, jadi bukan bukti identitas. Harus dihapus & diganti.
> > 2. **Bioskop** memberi diskon rombongan (maks 15 orang sebelum deposit). Penyerang men-*threat model* alur ini dan menguji apakah bisa memesan **600 kursi di semua bioskop** dalam beberapa request → kerugian pendapatan besar.
> > 3. **E-commerce retail** tanpa proteksi bot: *scalper* memborong kartu grafis kelas atas untuk dijual lagi. *"Publisitas buruk… dan permusuhan abadi dengan penggemar."* Aturan domain (pembelian dalam hitungan detik sejak stok tersedia) bisa menolak transaksi tak otentik.
> >
> > **Cara Pencegahan.**
> >
> > - Bangun & pakai **SDLC aman** dengan profesional AppSec.
> > - Library **pola desain aman** / komponen *paved road* siap pakai.
> > - **Threat modeling** untuk autentikasi, kontrol akses, logika bisnis, alur kunci.
> > - Integrasikan bahasa & kontrol keamanan ke **user story**.
> > - **Plausibility check** di tiap tier (frontend → backend).
> > - **Unit & integration test** yang memvalidasi alur kritis terhadap threat model; susun **use-case _dan_ misuse-case** per tier.
> > - **Segregasi lapisan** sistem & jaringan menurut eksposur; **tenant segregation by design**.
> > - **Batasi konsumsi resource** per pengguna/servis.
> >
> > ### A05 — Security Misconfiguration
> >
> > **Deskripsi.** Naik dari **#6 ke #5**; 90% aplikasi diuji terhadap suatu bentuk *misconfiguration*. **20 CWE** — termasuk **CWE-611 (XXE)** yang kini **digabung** ke sini. ± 789 CVE. Rentan bila:
> >
> > - *Hardening* kurang di suatu lapisan; **izin layanan cloud keliru**.
> > - **Fitur tak perlu** aktif (port, service, halaman, akun, privilege).
> > - **Akun & password default** masih aktif.
> > - **Pesan error** membocorkan *stack trace* / info berlebihan.
> > - Fitur keamanan **dinonaktifkan/tak aman** di sistem yang di-upgrade.
> > - **Setelan tidak aman** di server/framework/library/database.
> > - **Security header** hilang/tak aman.
> > - Software **usang atau rentan**.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Aplikasi contoh** tetap di server produksi dengan kerentanan yang diketahui; **kredensial admin default** tak diganti → penyerang mengambil alih.
> > 2. **Directory listing aktif** → penyerang meng-enumerasi direktori, menemukan & men-*decompile* kode terkompilasi, menemukan celah kontrol akses.
> > 3. Server mengembalikan **pesan error detail (stack trace)** → membocorkan versi komponen yang rentan.
> > 4. **Izin berbagi default cloud** = internet-accessible → data sensitif diakses tanpa izin.
> >
> > **Cara Pencegahan.**
> >
> > - **Proses hardening yang dapat diulang & terotomasi**; konfigurasi identik di dev/QA/prod.
> > - **Platform minimalis** — tanpa fitur/komponen/dokumentasi/sampel yang tak dipakai.
> > - **Review & update konfigurasi** sebagai bagian *patch management* (termasuk izin cloud storage).
> > - **Arsitektur tersegmentasi** — segmentasi, kontainerisasi, atau *cloud security groups (ACL)*.
> > - Kirim **security header** ke klien.
> > - **Proses otomatis** untuk memverifikasi efektivitas konfigurasi di semua environment.
> >
> > ### A06 — Vulnerable and Outdated Components
> >
> > **Deskripsi.** Dulu **"Using Components with Known Vulnerabilities"**; peringkat **#2 di community survey** dan masuk lewat data. Satu-satunya kategori **tanpa CVE yang dipetakan** ke CWE-nya → diberi bobot exploit/impact default **5,0**. **3 CWE**, incidence rate rata-rata **8,77%**. Kemungkinan rentan bila:
> >
> > - **Tidak tahu versi** semua komponen (klien & server), termasuk **dependensi transitif**.
> > - Software **tak didukung / usang** (OS, app server, DBMS, aplikasi, API, runtime, library).
> > - **Tidak rutin memindai** kerentanan; tak mengikuti *security bulletin*.
> > - **Terlambat patch/upgrade** karena proses *change control* → jendela kerentanan lebar.
> > - Tidak menguji **kompatibilitas** library yang diperbarui.
> > - **Konfigurasi komponen tidak aman**.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Komponen berjalan dengan **privilege aplikasi** → celah bisa fatal. **CVE-2017-5638** (Apache Struts 2 RCE) *"memungkinkan eksekusi kode arbitrer di server"* dan berkontribusi pada kebocoran besar. Perangkat **IoT & biomedis** sulit di-patch meski dampaknya tinggi. Alat seperti **Shodan** dipakai untuk menemukan sistem tak ter-patch.
> >
> > **Cara Pencegahan.**
> >
> > - Hapus **dependensi & fitur tak terpakai**.
> > - **Inventaris versi komponen terus-menerus** — OWASP **Dependency-Check**, **retire.js**.
> > - Pantau **CVE & NVD**; berlangganan *security alert*.
> > - Ambil komponen **hanya dari sumber resmi & aman**; **utamakan paket bertanda tangan**.
> > - Lacak **library tak terpelihara**; pertimbangkan *virtual patch*.
> > - Jalankan **program manajemen siklus hidup** untuk memantau, memilah, dan menerapkan update.
> >
> > ### A07 — Identification and Authentication Failures
> >
> > **Deskripsi.** Dulu **"Broken Authentication"**; **turun dari #2 ke #7** — ketersediaan framework autentikasi standar membantu. **22 CWE**, incidence rate maks **14,84%**, ± 3.897 CVE. Lemah bila aplikasi:
> >
> > - Membiarkan **credential stuffing** (daftar user/pass valid dari kebocoran).
> > - Membiarkan **brute force / serangan otomatis**.
> > - Menerima **password default/lemah/umum** ("Password1", "admin/admin").
> > - Pemulihan password lemah — *"knowledge-based answers"* yang tak bisa diamankan.
> > - Menyimpan password **plain text / terenkripsi / hash lemah**.
> > - **MFA** hilang atau tidak efektif.
> > - **Session ID di URL**.
> > - **Memakai ulang session ID** setelah login sukses.
> > - **Tidak menginvalidasi session ID** dengan benar — sesi / token SSO tidak dibatalkan saat logout atau idle.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Credential stuffing** — tanpa proteksi *automated threat*, aplikasi jadi **password oracle** untuk menguji validitas kredensial.
> > 2. Sebagian besar serangan autentikasi terjadi karena **password sebagai satu-satunya faktor**. Rotasi & kompleksitas wajib (dulu "best practice") justru mendorong password lemah & dipakai ulang. NIST 800-63 menyarankan menghentikannya dan memakai **MFA**.
> > 3. **Timeout sesi salah** — user memakai komputer publik, hanya menutup tab (bukan "logout"). Satu jam kemudian penyerang memakai browser yang sama; user **masih terautentikasi**.
> >
> > **Cara Pencegahan.**
> >
> > - **MFA** sedapat mungkin — menangkal credential stuffing, brute force, dan reuse kredensial curian.
> > - Jangan kirim/deploy dengan **kredensial default**, terutama admin.
> > - **Cek password lemah** — uji password baru/berubah terhadap daftar 10.000 password terburuk.
> > - Kebijakan password ikut **NIST 800-63b §5.1.1** (Memorized Secrets).
> > - Perkuat registrasi/pemulihan/API terhadap **enumerasi akun** — pesan seragam untuk semua hasil.
> > - **Batasi / perlambat login gagal** (hindari DoS); log semua kegagalan & alert saat serangan terdeteksi.
> > - **Session manager sisi server** — ID acak entropi tinggi setelah login; tidak di URL; disimpan aman; diinvalidasi setelah logout, idle, dan *absolute timeout*.
> >
> > ### A08 — Software and Data Integrity Failures
> >
> > **Deskripsi.** **Kategori baru 2021** — asumsi tak aman soal update software, data kritis, dan **pipeline CI/CD tanpa verifikasi integritas**. **Menyerap Insecure Deserialization (A8:2017)**. **10 CWE**, incidence rate maks **16,67%**, impact tertimbang **7,94** (tertinggi). Aplikasi bisa bergantung pada plugin/library/modul/repo/CDN tak tepercaya; **pipeline CI/CD lemah** membuka celah injeksi kode jahat; **auto-update** sering tanpa verifikasi memadai → update terkompromi disebar ke semua instalasi; objek *serialized* yang terlihat penyerang rentan tampering.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Update tanpa signing** — banyak router rumah, *set-top box*, firmware perangkat tidak memverifikasi update via firmware bertanda tangan. Celah membesar seiring perangkat jadi target, dengan sedikit opsi remediasi selain menunggu versi usang.
> > 2. **SolarWinds (Orion)** — *"Nation-state menyerang mekanisme update."* Meski proses keamanan kuat, penyerang mengompromikan **build system** dan mendistribusikan update jahat ke **> 18.000 organisasi** selama berbulan-bulan; ± 100 organisasi terkompromi langsung.
> > 3. **Insecure deserialization** — aplikasi React memanggil microservice Spring Boot; *user state* di-*serialize* dan dikirim bolak-balik. Penyerang mengenali tanda objek Java `rO0` (base64), memakai *Java Serial Killer* → **RCE** di server aplikasi.
> >
> > **Cara Pencegahan.**
> >
> > - **Tanda tangan digital** untuk memverifikasi keaslian software/data.
> > - Konsumsi library/dependensi dari **repositori tepercaya**; untuk risiko tinggi, buat **repo internal ter-vetting**.
> > - Alat keamanan rantai pasok — **OWASP Dependency-Check** atau **OWASP CycloneDX**.
> > - **Review** kode & konfigurasi untuk meminimalkan injeksi kode jahat.
> > - **Segregasi, konfigurasi, & kontrol akses pipeline CI/CD** yang menjaga integritas build/deploy.
> > - Lindungi **data serialized** dengan *integrity check* / tanda tangan saat dikirim ke klien tak tepercaya.
> >
> > ### A09 — Security Logging and Monitoring Failures
> >
> > **Deskripsi.** Dulu **"Insufficient Logging & Monitoring"**; **#3 di community survey**, naik dari **#10 (2017)**. Sulit diuji dengan metode biasa, tetapi menentukan kemampuan deteksi & respons kebocoran. **4 CWE**, incidence rate rata-rata **6,51%**, ± 242 CVE. *Insufficient logging* terjadi bila:
> >
> > - Event auditable (login, login gagal, transaksi bernilai tinggi) **tidak dicatat**.
> > - Warning & error menghasilkan log **tidak ada / tidak memadai / tidak jelas**.
> > - Log aplikasi & API **tidak dimonitor** untuk aktivitas mencurigakan.
> > - Log **hanya disimpan lokal**.
> > - **Ambang alert & proses eskalasi** tidak ada / tidak efektif.
> > - **Pentest & pemindaian DAST** tidak memicu alert.
> > - Aplikasi tak bisa **mendeteksi/eskalasi/alert serangan aktif** real-time.
> > - **Kebocoran informasi** karena event logging/alert terlihat oleh pengguna/penyerang.
> > - Rentan **injeksi ke sistem logging/monitoring** bila data log tak di-*encode* benar.
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. Penyedia **asuransi kesehatan anak** — kebocoran tak terdeteksi **> 7 tahun** karena tak ada monitoring/logging; **3,5 juta** rekam medis sensitif terdampak.
> > 2. **Maskapai India** — kebocoran data penumpang **10 tahun** (paspor, kartu kredit) lewat penyedia cloud pihak ketiga.
> > 3. **Maskapai Eropa** — kebocoran wajib-lapor GDPR lewat celah aplikasi pembayaran; **> 400.000** rekaman pembayaran; denda **£20 juta**.
> >
> > **Cara Pencegahan.**
> >
> > - Pastikan kegagalan **login, kontrol akses, validasi input sisi server** dapat dicatat dengan **konteks pengguna** yang cukup untuk mengenali akun mencurigakan.
> > - Log dalam **format yang mudah dikonsumsi** solusi manajemen log.
> > - **Encode data log** untuk mencegah injeksi ke sistem logging/monitoring.
> > - Transaksi bernilai tinggi punya **audit trail dengan kontrol integritas** (anti-tamper/hapus).
> > - Tim **DevSecOps** membangun monitoring & alerting efektif — aktivitas mencurigakan terdeteksi & direspons cepat.
> > - **Adopsi rencana incident response & recovery** — NIST 800-61r2 atau lebih baru.
> >
> > ### A10 — Server-Side Request Forgery (SSRF)
> >
> > **Deskripsi.** **Kategori baru** dari *community survey*. Incidence rate rendah (**2,72%**) tetapi coverage, exploitability, dan impact **di atas rata-rata**. **1 CWE (CWE-918)**, ± 385 CVE. *"SSRF terjadi kapan pun aplikasi web mengambil sumber daya jarak jauh tanpa memvalidasi URL yang diberikan pengguna."* Penyerang memaksa aplikasi mengirim request ke tujuan tak diinginkan — **melewati firewall, VPN, dan ACL jaringan**. Naik seiring adopsi cloud & arsitektur kompleks. (Pada 2025 kategori ini **diserap ke A01**.)
> >
> > **Contoh Skenario Serangan.**
> >
> > 1. **Port scanning** — penyerang memetakan jaringan internal & mengidentifikasi port terbuka/tertutup dari hasil koneksi & informasi *timing*.
> > 2. **Data exposure** — mengakses file lokal / servis internal via `file:///etc/passwd` atau `http://localhost:28017/`.
> > 3. **Akses metadata cloud** — query endpoint metadata (mis. `http://169.254.169.254/`) untuk mencuri kredensial & konfigurasi.
> > 4. **Kompromi servis internal** — memakai servis internal untuk RCE atau DoS.
> >
> > **Cara Pencegahan.**
> >
> > - **Lapisan jaringan:** isolasi fungsi *fetch* sumber daya jarak jauh di jaringan terpisah; **firewall "deny by default"** untuk trafik intranet non-esensial; log flow yang diterima *dan* ditolak.
> > - **Lapisan aplikasi:** validasi & sanitasi semua input; **allowlist** skema URL, port, dan tujuan; jangan kembalikan *raw response* ke klien; **nonaktifkan HTTP redirect**; awasi konsistensi URL (cegah **DNS rebinding** & *TOCTOU race*).
> > - **Jangan andalkan deny list / regex** — penyerang punya cara melewatinya.
> > - Jangan hosting servis relevan-keamanan di sistem frontend; pakai enkripsi jaringan (VPN) untuk sistem bernilai tinggi.
> >
> > ### Perubahan dari Edisi 2017
> >
> > - **Kategori baru (3):** A04 Insecure Design, A08 Software and Data Integrity Failures, A10 SSRF.
> > - **Penggabungan:** **XXE** (A4:2017) → A05 Security Misconfiguration; **XSS** (A7:2017) → A03 Injection; **Insecure Deserialization** (A8:2017) → A08.
> > - **Ganti nama:** Sensitive Data Exposure → **Cryptographic Failures** (A02); Broken Authentication → **Identification and Authentication Failures** (A07); Using Components with Known Vulnerabilities → **Vulnerable and Outdated Components** (A06); Insufficient Logging & Monitoring → **Security Logging and Monitoring Failures** (A09).
> > - **Pergeseran peringkat:** Broken Access Control **#5 → #1**; Injection **#1 → #3**; Broken Authentication **#2 → #7**; Security Misconfiguration **#6 → #5**; Vulnerable Components **#9 → #6**; Logging & Monitoring **#10 → #9**.

> [!cornell] #### Summary
>
> **OWASP Top 10:2021** menggeser fokus dari *gejala* ke **akar masalah**, disusun dari **> 500.000 aplikasi** dan hampir **400 CWE** dengan metrik **incidence rate** (persentase populasi aplikasi yang punya ≥ 1 instance CWE) plus skor **exploit/impact dari CVSS**; **8 kategori dari data, 2 dari _community survey_**. **Broken Access Control** melonjak ke **#1** (94% aplikasi terdampak). Tiga kategori **baru**: **A04 Insecure Design** (menuntut *threat modeling* & SDLC aman), **A08 Software and Data Integrity Failures** (menyerap *Insecure Deserialization*, contoh **SolarWinds**), dan **A10 SSRF**. Empat kategori **berganti nama** demi menyebut akar masalah: *Sensitive Data Exposure → Cryptographic Failures*, *Broken Authentication → Identification and Authentication Failures*, *Using Components with Known Vulnerabilities → Vulnerable and Outdated Components*, *Insufficient Logging & Monitoring → Security Logging and Monitoring Failures*. **XXE** melebur ke Security Misconfiguration dan **XSS** ke Injection. Lihat kelanjutannya di [[OWASP Top 10 2025]] dan asal-usulnya di [[OWASP Top 10 2017]].

> [!ad-libitum]- Additional Information
>
> #### Peta gabung/pisah kategori (2017 → 2021)
>
> | 2017 | Nasib di 2021 |
> |---|---|
> | A4 XML External Entities (XXE) | Melebur ke A05 Security Misconfiguration |
> | A7 Cross-Site Scripting (XSS) | Melebur ke A03 Injection |
> | A8 Insecure Deserialization | Melebur ke A08 Software and Data Integrity Failures |
> | A5 Broken Access Control | Naik jadi A01 |
>
> #### Mengapa metodologi "incidence rate" penting
>
> Sebelum 2021, sebagian peringkat memakai *frequency* (jumlah temuan), yang bias terhadap kerentanan yang dilaporkan alat pemindai secara masif (mis. header hilang di setiap halaman). *Incidence rate* menanyakan "berapa persen aplikasi yang **punya** masalah ini", sehingga lebih adil lintas jenis kerentanan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil satu aplikasi web open-source, jalankan **OWASP Dependency-Check** dan **retire.js**, lalu petakan temuan ke A06.
> 2. Lakukan *threat modeling* STRIDE ringkas pada alur "reset password" aplikasi kuliahmu; identifikasi potensi A04 & A07.
> 3. Uji satu endpoint yang mengambil URL (mis. *webhook*, *image proxy*) terhadap SSRF di lab pribadi.
>
> #### Bacaan Lanjutan
>
> - OWASP Top 10:2021 — `https://owasp.org/Top10/2021/`
> - OWASP Application Security Verification Standard (ASVS), OWASP Proactive Controls, OWASP SAMM.
> - OWASP Cheat Sheet Series (SQL Injection Prevention, Password Storage, SSRF Prevention, Deserialization).
