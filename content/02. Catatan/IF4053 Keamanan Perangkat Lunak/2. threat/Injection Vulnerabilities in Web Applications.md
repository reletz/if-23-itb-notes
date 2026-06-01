---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Keamanan Aplikasi Web]]

> [!cornell] Injection Vulnerabilities in Web Applications
>
> > ## Questions/Cues
> >
> > - Mengapa string concatenation rentan injeksi?
> > - Bagaimana interpreter membedakan kode vs data?
> > - Apa dampak utama SQL injection?
> > - Teknik apa yang mencegah injeksi pada query?
> > - Contoh injeksi selain SQL yang umum?
> > - Bagaimana prinsip least‑privilege mengurangi risiko?
> > - Apa perbedaan blind vs union‑based injection?
> >
> > ## Reference Points
> >
> > - Web Application Vulnerability IF4053 (Halaman 1)
> > - OWASP Top 10 – 2010 (Halaman 2‑3)
> > - Injection Overview (Halaman 8)
> > - SQL Injection Illustrated (Halaman 9‑10)
> > - “Sinful” PHP contoh (Halaman 11)
> > - “Sinful” Java contoh (Halaman 12)
> > - Avoiding Injection Flaws (Halaman 14)
> > - Sophisticated trick (Halaman 13)
>
> > ### Definisi dan Kategori Injection
> >
> > **Injection** adalah teknik menyerang aplikasi dengan memasukkan data yang secara tidak sengaja diperlakukan sebagai perintah oleh interpreter.  Interpreter dapat berupa mesin basis data (SQL), shell sistem operasi, layanan direktori (LDAP), atau bahasa kueri XML (XPath).  Pada dasarnya, aplikasi “mengambil string” yang diberikan pengguna, lalu **menyisipkannya langsung ke dalam perintah** tanpa memisahkan antara *data* dan *kode*.  Karena interpreter mengeksekusi seluruh string, penyerang dapat menambahkan atau memodifikasi perintah asli, sehingga memperoleh kontrol yang tidak diinginkan.
> >
> > Kategori utama injeksi meliputi:
> >
> > 1. **SQL Injection** – memanipulasi pernyataan SQL untuk membaca, mengubah, atau menghapus data.
> > 2. **Command Injection** – menyuntikkan perintah sistem operasi melalui fungsi seperti `exec`, `system`, atau `popen`.
> > 3. **LDAP Injection** – memodifikasi filter LDAP sehingga penyerang dapat mengakses atau memodifikasi direktori.
> > 4. **XPath Injection** – memanipulasi kueri XML untuk mengekstrak atau mengubah dokumen XML.
> > 5. **ORM/Framework Injection** – memanfaatkan API tingkat tinggi (mis. Hibernate, JPA) yang masih membangun kueri dinamis dari input pengguna.
> >
> > Setiap jenis memiliki interpreter yang berbeda, namun pola kerentanannya serupa: **kurangnya pemisahan antara data dan perintah**.
> >
> > ### Mekanisme SQL Injection dan Dampaknya
> >
> > Pada SQL injection, aplikasi biasanya membangun kueri dengan menggabungkan nilai input ke dalam string SQL, misalnya:
> >
> > ```php
> >
> > $qry = "SELECT ccnum FROM cust WHERE id = $id";
> >
> > ```
> >
> > Jika `$id` berisi `0 OR 1=1 --`, kueri menjadi `SELECT ccnum FROM cust WHERE id = 0 OR 1=1 --`, yang mengembalikan **semua baris** tabel `cust`.  Penyerang dapat memperluas serangan menjadi:
> >
> > - **Data exfiltration**: membaca seluruh basis data.
> > - **Data tampering**: mengubah, menghapus, atau menambah data.
> > - **Escalation**: mengeksekusi perintah administratif jika akun database memiliki hak istimewa tinggi.
> > - **Remote code execution**: pada beberapa DBMS, fungsi seperti `xp_cmdshell` memungkinkan eksekusi perintah OS.
> >
> > Dampak biasanya **parah** karena basis data menyimpan informasi sensitif (rekening, data pribadi, kredensial).  Seperti yang ditunjukkan pada slide halaman 9, serangan dapat mengakibatkan **pencurian data massal** atau bahkan **akses penuh ke server** bila kombinasi dengan command injection terjadi.
> >
> > ### Pola Kode yang Menyebabkan Injection
> >
> > Beberapa ciri umum pada kode yang rentan:
> >
> > 1. **Penggunaan string concatenation atau interpolasi** untuk membangun pernyataan query.
> > 2. **Tidak ada validasi atau sanitasi** terhadap input pengguna sebelum dimasukkan ke dalam query.
> > 3. **Penggunaan API eksekusi langsung** seperti `mysql_query`, `Statement.executeQuery`, atau `Runtime.exec` tanpa parameterisasi.
> > 4. **Penggunaan perintah “exec”** pada bahasa pemrograman yang mengeksekusi perintah shell secara langsung.
> >
> > Contoh PHP (halaman 11) dan Java (halaman 12) memperlihatkan kedua pola ini: nilai `$_GET["id"]` atau `Id` langsung disisipkan ke dalam pernyataan SQL, sehingga **tidak ada batasan** antara data dan kode.
> >
> > Selain itu, **konfigurasi basis data yang terlalu permisif** (mis. hak istimewa `sa` pada SQL Server) memperparah konsekuensi karena penyerang dapat menjalankan perintah administratif setelah berhasil menyuntikkan.
> >
> > ### Teknik Pencegahan Utama
> >
> > 1. **Prepared Statements / Bind Variables** – API seperti `PDO::prepare` (PHP) atau `PreparedStatement` (Java) memisahkan placeholder (`?` atau `:name`) dari nilai aktual, sehingga interpreter memperlakukan nilai sebagai data murni.
> > 2. **Stored Procedures** – bila dirancang dengan parameter yang terdefinisi, prosedur tersimpan mengurangi kebutuhan concatenation.
> > 3. **Input Validation (Whitelist)** – memeriksa bahwa nilai hanya mengandung karakter yang diharapkan (mis. angka untuk ID).  Validasi harus dilakukan **sebelum** nilai masuk ke logika bisnis.
> > 4. **Least‑Privilege Principle** – akun basis data yang dipakai aplikasi seharusnya hanya memiliki hak `SELECT`/`INSERT` pada tabel yang diperlukan, bukan hak `DROP` atau `ADMIN`.
> > 5. **Encoding / Escaping** – bila tidak dapat menghindari interpolasi, gunakan fungsi escaping khusus DBMS (mis. `mysqli_real_escape_string`). Namun, ini dianggap **lapisan terakhir** dan tidak menggantikan parameterisasi.
> > 6. **Security‑Focused Code Review & Static Analysis** – alat seperti SonarQube atau OWASP Dependency‑Check dapat mendeteksi pola concatenation berisiko.
> >
> > Implementasi kombinasi teknik‑teknik di atas secara konsisten dapat menurunkan peluang terjadinya injeksi hingga hampir nol.
> >
> > ### Vektor Injeksi Lanjutan selain SQL
> >
> > **Command Injection**: contoh penggunaan `system($_GET['cmd'])` pada PHP memungkinkan penyerang mengeksekusi perintah OS apa pun.  Mitigasinya meliputi whitelist perintah yang diizinkan, penggunaan fungsi bahasa yang tidak memanggil shell (mis. `proc_open` dengan argumen terpisah), dan menjalankan proses dengan hak terbatas.
> >
> > **LDAP Injection**: filter LDAP biasanya berbentuk `(&(uid=$input)(objectClass=person))`.  Jika `$input` mengandung karakter `*` atau `)` tanpa sanitasi, penyerang dapat memodifikasi filter menjadi `(|(uid=*)(objectClass=*))`, yang mengembalikan semua entri.  Pencegahan meliputi **escaping karakter khusus LDAP** (`\2a`, `\28`, `\29`, dll.) dan penggunaan API yang menyediakan parameterisasi.
> >
> > **XPath Injection**: serupa dengan LDAP, namun pada XML.  Input yang dimasukkan ke dalam ekspresi XPath harus di‑escape atau diparameterisasi, misalnya menggunakan `XPathExpression.compile` dengan variabel.
> >
> > **ORM Injection**: meskipun ORM (mis. Hibernate) mengabstraksi SQL, banyak developer masih membangun HQL/JPQL secara dinamis.  Contoh: `session.createQuery("from User where name = '" + name + "'")`.  Solusinya adalah **named parameters** (`:name`) atau **Criteria API** yang membangun kueri secara terstruktur.
> >
> > Semua vektor ini berbagi akar masalah yang sama: **menyuntikkan data mentah ke dalam interpreter**.  Oleh karena itu, prinsip umum (parameterisasi, validasi, hak minimum) tetap berlaku.

> [!cornell] #### Summary
>
> **Injection** merupakan ancaman kritis karena memanfaatkan kegagalan aplikasi memisahkan data dari perintah interpreter.  **SQL injection** adalah contoh paling umum, yang dapat mengakibatkan pencurian atau manipulasi data serta eskalasi hak istimewa bila basis data dikonfigurasi secara longgar.  Pencegahan yang paling efektif meliputi penggunaan **prepared statements**, **whitelist input validation**, dan **prinsip least‑privilege** pada akun basis data.  Vektor lain seperti **command, LDAP, XPath, dan ORM injection** mengikuti pola serupa, sehingga teknik mitigasi yang konsisten dapat melindungi seluruh lapisan aplikasi.

> [!ad-libitum]- Additional Information
>
> #### Blind SQL Injection Techniques
>
> Blind SQL injection muncul ketika aplikasi tidak menampilkan pesan error atau hasil kueri secara langsung.  Penyerang harus **mengamati perilaku aplikasi** (waktu respons, perubahan halaman) untuk mengekstrak data.  Dua metode utama:
>
> 1. **Boolean‑based** – penyerang mengirimkan kondisi yang menghasilkan nilai true/false, mis. `id=1 AND SUBSTRING(password,1,1)='a'`.  Jika halaman berubah (mis. menampilkan “login gagal”), penyerang dapat menebak karakter demi karakter.
> 2. **Time‑based** – menggunakan fungsi `SLEEP()` atau `WAITFOR DELAY` untuk menunda respons bila kondisi benar.  Mis. `id=1; IF (ASCII(SUBSTRING(password,1,1))=97) WAITFOR DELAY '00:00:05'`.  Perbedaan waktu respons mengindikasikan nilai yang tepat.
>
> Kedua teknik memerlukan **otomatisasi** (script Python, sqlmap) karena prosesnya iteratif.  Penting untuk menambahkan **rate‑limiting** dan **monitoring** pada server database untuk mendeteksi pola permintaan yang mencurigakan.
>
> #### Union‑Based and Error‑Based Injection
>
> **Union‑based injection** memanfaatkan operator `UNION SELECT` untuk menggabungkan hasil kueri penyerang dengan kueri asli.  Contoh: `id=1 UNION SELECT username,password FROM users--`.  Dengan menyesuaikan jumlah kolom dan tipe data, penyerang dapat mengekstrak tabel lain.  Pencegahan meliputi **pemeriksaan jumlah kolom** pada kueri statis dan penggunaan **prepared statements** yang menolak sintaks `UNION`.
>
> **Error‑based injection** memaksa database menghasilkan pesan error yang mengungkap struktur tabel.  Misalnya, `id=1 AND 1=CONVERT(int,(SELECT TOP 1 name FROM sysobjects))`.  Pesan error “Conversion failed” dapat mengindikasikan nama tabel.  Mengonfigurasi **mode error** database menjadi “generic” atau menonaktifkan detail error pada aplikasi dapat mengurangi kebocoran informasi.
>
> #### Automated Detection and Static Analysis
>
> Alat‑alat seperti **OWASP ZAP**, **Burp Suite**, dan **sqlmap** dapat melakukan pemindaian dinamis untuk menemukan titik injeksi.  Di sisi statis, **SonarQube**, **FindSecBugs**, dan **PMD** dapat mendeteksi pola berbahaya (concatenation of user input ke dalam query).  Integrasi ke dalam **CI/CD pipeline** memastikan setiap commit diuji secara otomatis, sehingga regresi kerentanan dapat dicegah lebih awal.
>
> #### Mitigasi Tambahan: WAF, ORM Safe APIs, dan Runtime Hardening
>
> * **Web Application Firewall (WAF)** – aturan signature atau anomaly‑based dapat memblokir payload yang mengandung pola SQLi (mis. `' OR 1=1--`).  Namun, WAF bersifat **defensive‑in‑depth** dan tidak menggantikan kode yang aman.
> * **ORM Safe APIs** – gunakan **Criteria API** (Hibernate) atau **Query Builder** (Laravel Eloquent) yang membangun kueri secara terstruktur tanpa string concatenation.
> * **Runtime Hardening** – jalankan proses database dengan **user terbatas**, aktifkan **audit logging** untuk perintah DDL/DML, dan gunakan **SQL Server’s “query store”** untuk memantau kueri yang tidak biasa.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi dan perbandingan**: Buat dua versi aplikasi CRUD sederhana (satu dengan string concatenation, satu dengan prepared statements).  Uji keduanya menggunakan `sqlmap` dan dokumentasikan perbedaan tingkat kerentanan.
> 2. **Blind SQLi time‑based tool**: Kembangkan skrip Python yang mengirimkan payload `SLEEP` dan mengukur latency untuk mengekstrak password hash dari basis data dummy.  Tambahkan mekanisme throttling untuk menghindari deteksi.
>
> #### Tools and Resources
>
> - OWASP SQL Injection Prevention Cheat Sheet: https://owasp.org/www-project-cheat-sheets/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
> - sqlmap (automated SQLi scanner): https://github.com/sqlmapproject/sqlmap
> - SonarQube (static analysis): https://www.sonarqube.org
> - Hibernate Criteria API Documentation: https://docs.jboss.org/hibernate/orm/5.4/userguide/html_single/Hibernate_User_Guide.html#criteria
>
> #### Further Reading
>
> - C. Kumar, *SQL Injection Attacks and Defense*, 2nd ed., Springer, 2021.
> - M. Howard & D. LeBlanc, *Writing Secure Code*, 2nd ed., Microsoft Press, 2020 – Bab 9 tentang parameterisasi query.
> - OWASP Top 10 – A1: Injection (versi 2021) – https://owasp.org/Top10/A01_2021-Injection/
> - “Blind SQL Injection – A Practical Guide” – Black Hat USA 2022 presentation (PDF).