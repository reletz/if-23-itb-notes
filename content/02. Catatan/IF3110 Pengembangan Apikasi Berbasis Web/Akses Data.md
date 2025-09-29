---
type: Note
cssclasses:
- cornell-notes
---

_Back to_ [[IF3110 Pengembangan Aplikasi Berbasis Web]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Mengapa perlu Akses Data?
> >     
> > - Apa saja mekanisme Akses Data?
> >     
> > - Bagaimana cara interaksi dengan Database?
> >     
> > - Apa itu PDO?
> >     
> > - Bagaimana cara melakukan CRUD di database?
> >     
> > - Apa itu SQL Injection?
> >     
> > - Bagaimana cara mencegah SQL Injection?
> >     
> > - Bagaimana cara mengakses File?
> >     
> > - Apa risiko keamanan saat mengakses file?
> >     
> > 
> > ## Reference Points
> > 
> > - Slides 1-26
> >     
> 
> > ### Mengapa Perlu Akses Data?
> > 
> > Teknik _State Handling_ (seperti Session dan Cookies) hanya cocok untuk menyimpan data **sementara** selama kunjungan pengguna. Untuk menyimpan data secara **permanen**, kita memerlukan mekanisme akses data.
> > 
> > **Kebutuhan Utama:**
> > 
> > - **Mengingat Pengguna:** Menyimpan informasi akun pengguna (nama, email, password).
> >     
> > - **Mencatat Transaksi:** Menyimpan riwayat pembelian, komentar, atau aktivitas lainnya.
> >     
> > - **Mengelola Konten:** Menyimpan "barang" yang dikelola oleh situs, seperti produk, artikel, atau data lainnya.
> >     
> > 
> > ### Mekanisme Akses Data
> > 
> > Ada beberapa cara bagi aplikasi web untuk menyimpan dan mengakses data permanen:
> > 
> > 1. **Database:** Metode yang paling umum, terstruktur, dan kuat. Menggunakan sistem seperti MySQL, PostgreSQL, atau SQLite.
> >     
> > 2. **File System:** Menyimpan data dalam file biasa, seperti `.txt`, `.csv`, atau `.json`. Cocok untuk data yang lebih sederhana atau konfigurasi.
> >     
> > 3. **Layanan Eksternal (Services):** Mengakses data melalui API dari layanan lain.
> >     
> > 4. **Object Storage:** Layanan penyimpanan untuk file besar seperti gambar atau video (misalnya, Amazon S3).
> >     
> > 
> > ### Interaksi dengan Database menggunakan PDO
> > 
> > **PDO (PHP Data Objects)** adalah sebuah ekstensi di PHP yang menyediakan _interface_ yang konsisten untuk mengakses berbagai jenis database. Ini berarti kita bisa mengganti database (misal dari MySQL ke PostgreSQL) dengan perubahan kode yang minimal.
> > 
> > **Langkah-langkah Umum:**
> > 
> > 1. **Koneksi ke Database:** Membuat objek PDO dengan informasi host, nama database, username, dan password.
> >     
> > 2. **Menjalankan Perintah SQL:** Mengeksekusi query untuk membaca atau memanipulasi data.
> >     
> > 3. **Mengambil Hasil (Fetching):** Mengambil data hasil query `SELECT`.
> >     
> > 4. **Menutup Koneksi:** Sebaiknya dilakukan, meskipun PHP sering menanganinya secara otomatis.
> >     
> > 
> > ### Operasi CRUD (Create, Read, Update, Delete)
> > 
> > - Create (INSERT): Menambahkan data baru.
> >     
> >     ```php
> >     $db->exec("INSERT INTO dishes (dish_name) VALUES ('Nasi Goreng')");
> >     ```
> >     
> > - Update (UPDATE): Mengubah data yang sudah ada.
> >     
> >     ```php
> >     $db->exec("UPDATE dishes SET price = 15000 WHERE dish_name = 'Nasi Goreng'");
> >     ```
> >     
> > - Delete (DELETE): Menghapus data.
> >     
> >     ```php
> >     $db->exec("DELETE FROM dishes WHERE price > 50000");
> >     ```
> >     
> > - Read (SELECT): Mengambil data.
> >     
> >     ```
> >     $q = $db->query('SELECT dish_name, price FROM dishes');
> >     ```
> >     
> >     - `$q->fetch()`: Mengambil satu baris data per panggilan (efisien untuk data besar).
> >         
> >     - `$q->fetchAll()`: Mengambil semua baris data sekaligus ke dalam sebuah array.
> >         
> > 
> > ### Keamanan: SQL Injection dan Prepared Statements
> > 
> > **SQL Injection** adalah serangan di mana penyerang menyisipkan (atau "menyuntikkan") kode SQL berbahaya ke dalam input yang dikirim ke aplikasi. Ini bisa terjadi jika input pengguna digabungkan langsung ke dalam string query SQL.
> > 
> > Contoh Bahaya:
> > 
> > Misalkan `$_POST['name'] berisi ' OR '1'='1'. Jika query-nya adalah "SELECT * FROM users WHERE name = '{$_POST['name']}'`", maka query finalnya menjadi SELECT * FROM users WHERE name = '' OR '1'='1', yang akan mengembalikan semua data pengguna.
> > 
> > Solusi: Prepared Statements
> > 
> > Prepared statements adalah cara paling aman untuk menjalankan query.
> > 
> > - **Cara Kerja:** Template query SQL dikirim ke database terlebih dahulu, terpisah dari data inputnya. Database "mempersiapkan" query tersebut. Setelah itu, data dikirim sebagai parameter. Dengan cara ini, data input tidak akan pernah bisa dieksekusi sebagai perintah SQL.
> >     
> > - **Implementasi di PDO:**
> >     
> >     1. prepare(): Menyiapkan template query dengan placeholder (?).
> >         
> >         `$stmt = $db->prepare('INSERT INTO dishes (dish_name) VALUES (?)');`
> >         
> >     2. execute(): Menjalankan query dengan menyertakan data input dalam sebuah array.
> >         
> >         `$stmt->execute(array($_POST['dish_name']));`
> >         
> > 
> > ### Mengakses File System
> > 
> > PHP juga menyediakan fungsi untuk membaca dan menulis file.
> > 
> > - **Cara Sederhana:**
> >     
> >     - `file_get_contents('file.txt')`: Membaca seluruh isi file menjadi sebuah string.
> >         
> >     - `file_put_contents('file.html', $data)`: Menulis sebuah string ke dalam file.
> >         
> > - **Cara Lebih Terkontrol (per baris):**
> >     
> >     - `fopen()`: Membuka sebuah file.
> >         
> >     - `fgets()` atau `fgetcsv()`: Membaca satu baris atau satu baris CSV.
> >         
> >     - `fclose()`: Menutup file.
> >         
> > 
> > **Risiko Keamanan:** Pastikan untuk selalu **membersihkan (sanitize)** nama file yang berasal dari input pengguna untuk mencegah serangan _Path Traversal_ (misalnya, input `../../../etc/passwd` bisa membocorkan file sistem).

> [!cornell] #### Summary
> 
> **Akses Data adalah proses menyimpan dan mengambil data secara permanen, di mana Database menjadi mekanisme utamanya. Di PHP, interaksi dengan database paling baik dilakukan melalui PDO. Untuk menjaga keamanan, sangat penting untuk selalu menggunakan** _**Prepared Statements**_ **untuk mencegah serangan SQL Injection dengan memisahkan perintah SQL dari data input. Selain database, akses ke** _**File System**_ **juga umum digunakan untuk tugas yang lebih sederhana, namun memerlukan validasi nama file yang ketat untuk menghindari celah keamanan.**

> [!ad-libitum]- Additional Information
> 
> #### PDO vs. mysqli
> 
> Selain PDO, PHP juga memiliki ekstensi `mysqli` (MySQL Improved). Apa bedanya?
> 
> - **mysqli:** Hanya bisa digunakan untuk database MySQL.
>     
> - **PDO:** Mendukung berbagai jenis database (MySQL, PostgreSQL, SQLite, Oracle, dll.).
>     
> 
> **Rekomendasi:** Gunakan **PDO** untuk proyek baru. Fleksibilitasnya untuk berganti database di masa depan adalah keuntungan besar. Sintaksnya juga sering dianggap lebih bersih dan modern.
> 
> #### Contoh Serangan SQL Injection Klasik
> 
> Bayangkan sebuah form login dengan query:
> 
> SELECT * FROM users WHERE username = '$user' AND password = '$pass'
> 
> Jika seorang penyerang memasukkan username ' OR '1'='1' -- dan password apa saja, query akan menjadi:
> 
> SELECT * FROM users WHERE username = '' OR '1'='1' -- ' AND password = '...
> 
> - `' OR '1'='1'` akan selalu `TRUE`, sehingga klausa `WHERE` terpenuhi.
>     
> - `--` adalah tanda komentar di SQL, yang membuat sisa query diabaikan.
>     
> - Hasilnya? Penyerang berhasil login sebagai pengguna pertama di database tanpa tahu passwordnya. Inilah mengapa _prepared statements_ wajib digunakan.
>     
> 
> #### Eksplorasi Mandiri
> 
> 1. Buat sebuah database sederhana (misalnya SQLite atau MySQL) dengan satu tabel `tamu` yang memiliki kolom `id` dan `nama`.
>     
> 2. Buat sebuah form HTML dengan satu input untuk `nama`.
>     
> 3. Buat skrip PHP yang:
>     
>     - Terhubung ke database menggunakan PDO.
>         
>     - Menggunakan _prepared statement_ untuk mengambil data `nama` dari `$_POST`.
>         
>     - Memasukkan nama tersebut ke dalam tabel `tamu`.
>
