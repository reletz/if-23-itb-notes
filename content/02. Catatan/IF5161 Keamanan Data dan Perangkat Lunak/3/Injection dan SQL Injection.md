---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5161 Keamanan Data dan Perangkat Lunak]]

> [!cornell] Injection dan SQL Injection
>
> > ## Questions/Cues
> >
> > - Apa yang dimaksud injection dan mengapa interpreter menjadi akar masalahnya?
> > - Bagaimana alur serangan SQL injection langkah demi langkah?
> > - Seperti apa kode PHP/Java yang "berdosa" (sinful)?
> > - Mengapa port database yang terbuka ikut menjadi masalah?
> > - Apa saja cara menghindari injection (bind variable, whitelist, least privilege)?
> >
> > ## Reference Points
> >
> > - IF5161 — W02 Web Application Vulnerability (berbasis OWASP Top 10 2010), bagian "Injection" s.d. "Avoiding Injection Flaws"
>
> > ### Hakikat Injection
> >
> > **Injection** terjadi saat data tak tepercaya dikirim ke sebuah **interpreter** (SQL, OS shell, LDAP, XPath, dsb.) sebagai bagian dari perintah/query. Penyerang menipu interpreter agar mengeksekusi perintah tak diinginkan atau mengakses data tanpa otorisasi. Akar masalahnya: **data dan kode bercampur dalam satu string**, sehingga interpreter tidak bisa membedakan mana yang niat developer dan mana yang input penyerang.
> >
> > Dampak tipikal: kehilangan atau korupsi data, pembocoran data (mis. nomor kartu kredit), hilangnya akuntabilitas, bahkan pengambilalihan host.
> >
> > ### Anatomi SQL Injection
> >
> > Karakteristik aplikasi rentan: (1) menerima input pengguna, (2) **tidak memeriksa validitasnya**, (3) memakai input itu untuk query database, (4) membangun SQL lewat **string concatenation/replacement** atau perintah `exec`.
> >
> > ```mermaid
> > sequenceDiagram
> >     participant A as Attacker
> >     participant APP as Aplikasi (Custom Code)
> >     participant DB as Database
> >     APP->>A: 1. Tampilkan form
> >     A->>APP: 2. Kirim attack di form data
> >     APP->>DB: 3. Teruskan dalam query SQL
> >     DB->>APP: 4. Jalankan query berisi serangan, kirim hasil
> >     APP->>A: 5. Dekripsi seperti biasa, tampilkan ke pengguna
> > ```
> >
> > Contoh klasik: `SELECT * FROM accounts WHERE acct='' OR 1=1--` — kondisi `OR 1=1` selalu benar sehingga **seluruh baris tabel** (semua nomor akun) dikembalikan, dan `--` menjadikan sisa query sebagai komentar. Perhatikan bahwa enkripsi data di database tidak menolong: aplikasi yang sah mendekripsi hasilnya untuk si penyerang.
> >
> > ### Kode yang "Berdosa"
> >
> > - **PHP**: `$qry = "SELECT ccnum FROM cust WHERE id =%$id%";` dengan `$id` diambil langsung dari `$HTTP_GET_VARS["id"]`.
> > - **Java**: `st.executeQuery("SELECT ccnum FROM cust WHERE id = " + Id);` — penyambungan string langsung ke `Statement`.
> >
> > Kedua contoh juga menyimpan **kredensial hardcoded** (`root`, `sa`) pada kode. Hampir semua bahasa tingkat tinggi terdampak.
> >
> > **Pintu depan terbuka**: sering penyerang bahkan tak perlu celah aplikasi. Port database (TCP/1433 SQL Server, 1521 Oracle, 523 IBM DB2, 3306 MySQL) kerap dibiarkan terbuka ke internet dengan password default oleh administrator.
> >
> > ### Cara Menghindari
> >
> > 1. **Hindari string concatenation** untuk membangun query.
> > 2. **Hindari interpreter** jika memungkinkan, dan jangan pernah percaya input pengguna.
> > 3. Gunakan antarmuka dengan **bind variable** (prepared statement atau stored procedure) agar interpreter **membedakan kode dari data**.
> > 4. **Encode** input sebelum dikirim ke interpreter.
> > 5. Lakukan **whitelist input validation** pada semua input.
> > 6. **Minimalkan hak akses database** (least privilege) untuk membatasi dampak jika celah tetap ada.

> [!cornell] #### Summary
>
> **Injection** muncul karena input tak tepercaya digabung ke dalam perintah yang dijalankan **interpreter**. Pada SQL injection, penyerang memanipulasi query melalui string concatenation sehingga data database terbaca atau dimodifikasi. Pertahanan utamanya adalah **bind variable/prepared statement** yang memisahkan kode dari data, ditambah **whitelist validation, encoding, dan least privilege** database serta menutup port database dari internet.

> [!ad-libitum]- Additional Information
>
> #### Contoh Perbaikan dengan Prepared Statement
> ```java
> PreparedStatement ps = con.prepareStatement(
>     "SELECT ccnum FROM cust WHERE id = ?");
> ps.setString(1, id);
> ResultSet rs = ps.executeQuery();
> ```
> Parameter `?` selalu diperlakukan sebagai **data**, apa pun isinya. Injeksi tetap mungkin pada bagian yang tidak bisa diparameterisasi (nama tabel/kolom, `ORDER BY`); gunakan allowlist di sana.
>
> #### Proyek Eksplorasi Mandiri
> 1. Eksploitasi SQL injection pada OWASP Juice Shop (lihat [[writeup]]), lalu perbaiki dengan prepared statement.
> 2. Jalankan `sqlmap` pada aplikasi lab Anda sendiri dan analisis query yang dihasilkan.
>
> #### Bacaan Lanjutan
> - OWASP SQL Injection Prevention Cheat Sheet
> - OWASP Input Validation Cheat Sheet
> - Lihat juga [[OWASP Top 10 2010]] dan [[OWASP Top 10 2021]]
