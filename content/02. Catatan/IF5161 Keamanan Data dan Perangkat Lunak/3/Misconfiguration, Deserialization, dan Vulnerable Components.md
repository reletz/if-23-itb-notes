---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Misconfiguration, Deserialization, dan Vulnerable Components
>
> > ## Questions/Cues
> >
> > - Mengapa konfigurasi harus dikelola di seluruh stack, bukan hanya di aplikasi?
> > - Bagaimana insecure deserialization berujung pada remote code execution?
> > - Apa contoh manipulasi objek ter-serialisasi (cookie PHP)?
> > - Mengapa komponen rentan begitu umum dan bagaimana mengelolanya?
> >
> > ## Reference Points
> >
> > - IF5161 — W02 Web Application Vulnerability, bagian "Security Misconfiguration", "Insecure Deserialization", "Using Known Vulnerable Components"
>
> > ### Security Misconfiguration
> >
> > Aplikasi web bergantung pada fondasi aman: dari OS sampai application server, **termasuk semua library**. Pelajaran penting: **keamanan tidak boleh bergantung pada kerahasiaan source code** (kode melewati banyak tempat: source control, QA, test server, developer, insider). *Configuration management* harus mencakup seluruh bagian aplikasi, dan **semua kredensial default harus diganti di produksi**.
> >
> > Dampak: backdoor lewat patch OS/server yang hilang, eksploitasi XSS karena framework belum ditambal, akses ke akun default atau fungsi tak terpakai yang tetap dapat diakses.
> >
> > **Pencegahan**: panduan *hardening* konfigurasi aman yang diotomasi; ikuti patch **untuk semua komponen** (library juga, bukan hanya OS dan server); analisis efek keamanan setiap perubahan; bangun pelaporan ke dalam proses. Prinsipnya: *"if you can't verify it, it isn't secure"*.
> >
> > ```mermaid
> > flowchart TB
> >     A["Custom Code"] --> B["Framework"]
> >     B --> C["App Configuration"]
> >     C --> D["App Server"]
> >     D --> E["Web Server"]
> >     E --> F["Hardened OS"]
> >     G["Dev / QA / Test / Source Control"] -.insider & kebocoran.-> A
> > ```
> >
> > ### Insecure Deserialization
> >
> > Aplikasi/API rentan jika **mendeserialisasi objek hostile atau yang dimanipulasi** penyerang. Serialisasi dipakai untuk RPC/IPC, wire protocol, web service, message broker, caching/persistence, dan **cookie HTTP, parameter form, serta token autentikasi API**.
> >
> > **Dampak**: manipulasi logika aplikasi, serangan data tampering (mis. akses kontrol), hingga **remote code execution (RCE)** bila tersedia class yang mengubah perilaku saat/after deserialisasi.
> >
> > **Skenario**:
> >
> > 1. Aplikasi React + Spring Boot menyerialisasi state pengguna dan mengirimnya bolak-balik; penyerang mengenali signature objek Java (`R00`) dan memakai alat *Java Serial Killer* untuk RCE di server.
> > 2. Forum PHP menyimpan "super cookie" berisi `user ID, role, password hash`. Penyerang mengubah `s:4:"user"` menjadi `s:5:"admin"` dan mendapat hak admin.
> >
> > **Pencegahan**: pola paling aman adalah **tidak menerima objek serialisasi dari sumber tak tepercaya** atau memakai format yang hanya mengizinkan tipe primitif. Jika terpaksa: **integrity check (tanda tangan digital)**, batasan tipe ketat sebelum pembuatan objek (tidak boleh jadi satu-satunya), jalankan deserialisasi pada lingkungan **low privilege**, log kegagalan, batasi/monitor koneksi jaringan, dan beri alert pada deserialisasi berulang.
> >
> > ### Using Known Vulnerable Components
> >
> > Komponen rentan (mis. library framework) bisa **diidentifikasi dan dieksploitasi dengan alat otomatis**, memperluas pelaku ancaman hingga aktor acak. Hampir semua aplikasi bermasalah karena tim tidak memperbarui, bahkan tidak tahu semua komponen beserta versi dan dependensinya. Dampak: seluruh spektrum kelemahan (injection, access control, XSS...) hingga host takeover.
> >
> > **Proses yang diperlukan**:
> >
> > 1. **Identifikasi** semua komponen dan versinya, termasuk dependensi transitif.
> > 2. **Pantau** keamanan komponen lewat database publik dan mailing list; selalu perbarui.
> > 3. Tetapkan **kebijakan keamanan** penggunaan komponen (praktik pengembangan, uji keamanan, lisensi).
> > 4. Bila perlu, bungkus komponen dengan *security wrapper* untuk menonaktifkan fungsi tak terpakai.
> >
> > Karena sebagian besar proyek hanya menambal di versi berikutnya, **upgrade ke versi baru itu krusial**. Lanjutan topik ini ada di [[Software Supply Chain Security dan SBOM]].

> [!cornell] #### Summary
>
> **Security misconfiguration** menuntut manajemen konfigurasi dan patch di seluruh stack. **Insecure deserialization** memungkinkan data tampering hingga RCE bila objek dari sumber tak tepercaya dideserialisasi. **Komponen rentan** umum karena tim tak tahu dependensinya, sehingga perlu inventaris, pemantauan, kebijakan, dan upgrade rutin.

> [!ad-libitum]- Additional Information
>
> #### Log4Shell sebagai Studi Kasus
> Log4Shell (CVE-2021-44228) menggabungkan ketiganya: komponen logging yang hampir ada di mana-mana (vulnerable component), fitur lookup JNDI yang diaktifkan secara default (misconfiguration), dan pemuatan objek remote (mirip deserialization). Dibahas lebih jauh di [[Software Supply Chain Security dan SBOM]].
>
> #### Proyek Eksplorasi Mandiri
> 1. Jalankan `pip-audit`/`npm audit`/`OWASP Dependency-Check` pada proyek lama Anda dan triase hasilnya.
> 2. Reproduksi skenario cookie PHP di atas dengan `serialize()`/`unserialize()` di lab lokal, lalu tambahkan HMAC.
>
> #### Bacaan Lanjutan
> - OWASP Deserialization Cheat Sheet
> - CIS Benchmarks
