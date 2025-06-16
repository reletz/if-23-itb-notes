---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[Basdat]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa itu _View_ dalam SQL?
> > - Bagaimana cara membuat _View_?
> > - Apa itu _Materialized View_?
> > - Mengapa update pada _View_ bisa bermasalah?
> > - Apa saja perintah DML untuk modifikasi?
> > - Apa saja perintah utama DDL?
> > - Bagaimana cara mendefinisikan _integrity constraints_ saat membuat tabel?
> > - Bagaimana cara mengubah struktur tabel yang sudah ada?
> 
> > ### Views (Tampilan Virtual)
> > 
> > - **Definisi:** Sebuah **View** adalah sebuah tabel virtual yang tidak menyimpan data secara fisik, melainkan didefinisikan oleh sebuah query SQL. View bertindak seperti "jendela" ke data yang ada di tabel asli. Kegunaannya antara lain:
> >     
> >     - Menyederhanakan query yang kompleks.
> >     - Menyediakan tampilan data yang disesuaikan untuk pengguna yang berbeda.
> >     - Menambah lapisan keamanan dengan menyembunyikan kolom atau baris tertentu.
> > - **Pembuatan View:** Menggunakan perintah `CREATE VIEW`. Query yang mendefinisikan view akan disimpan, dan akan dieksekusi setiap kali view tersebut diakses.
> >     
> >     - **Contoh:** Membuat view yang hanya menampilkan informasi dasar instruktur tanpa gaji.
> >         
> >         SQL
> >         
> >         ```
> >         CREATE VIEW faculty AS
> >           SELECT ID, name, dept_name
> >           FROM instructor;
> >         ```
> >         
> > - **Materialized View:** Jenis view khusus yang hasil query-nya **disimpan secara fisik** sebagai tabel. Tujuannya untuk mempercepat akses data pada query yang sangat kompleks. Konsekuensinya, data di materialized view bisa menjadi usang (_stale_) dan perlu diperbarui (_refresh_) secara berkala agar tetap sinkron dengan tabel aslinya.
> >     
> > - **Update pada View:** Melakukan operasi DML (`INSERT`, `UPDATE`, `DELETE`) pada view bisa menjadi masalah. Umumnya, DBMS hanya memperbolehkan update pada _simple views_ (view yang berasal dari satu tabel, tidak menggunakan `GROUP BY`, `DISTINCT`, atau fungsi agregat). Update pada view yang kompleks seringkali ditolak karena bisa **ambigu**; DBMS tidak tahu cara menerjemahkan perubahan pada view ke tabel-tabel dasarnya secara unik.
> >     
> > 
> > ### DML (Data Manipulation Language) - Modifikasi
> > 
> > - **`INSERT`:** Menambahkan baris (tuple) baru ke dalam sebuah tabel.
> >     
> >     - **Contoh:** `INSERT INTO course (course_id, title, credits) VALUES ('BIO-301', 'Genetics', 4);`
> > - **`DELETE`:** Menghapus baris dari sebuah tabel berdasarkan kondisi `WHERE`.
> >     
> >     - **Contoh:** `DELETE FROM instructor WHERE dept_name = 'Finance';`
> > - **`UPDATE`:** Memperbarui nilai pada kolom dari baris yang sudah ada, berdasarkan kondisi `WHERE`.
> >     
> >     - **Contoh:** `UPDATE instructor SET salary = salary * 1.05 WHERE salary < 70000;`
> > - **`CASE` dalam `UPDATE`:** Digunakan untuk melakukan pembaruan kondisional dalam satu perintah.
> >     
> >     - **Contoh:** Memberi kenaikan 5% untuk gaji di bawah 100k, dan 3% untuk sisanya.
> >         
> >         SQL
> >         
> >         ```
> >         UPDATE instructor
> >         SET salary = CASE
> >           WHEN salary <= 100000 THEN salary * 1.05
> >           ELSE salary * 1.03
> >         END;
> >         ```
> >         
> > 
> > ### DDL (Data Definition Language) - Definisi & Struktur
> > 
> > - **Definisi:** Bagian dari SQL yang digunakan untuk mendefinisikan dan mengelola struktur objek-objek basis data seperti tabel.
> >     
> > - **`CREATE TABLE`:** Perintah utama untuk membuat tabel baru. Di sini kita mendefinisikan nama-nama kolom, tipe datanya, dan batasan integritasnya.
> >     
> >     - **Contoh dengan Constraints:**
> >         
> >         SQL
> >         
> >         ```
> >         CREATE TABLE student (
> >           ID        VARCHAR(5),
> >           name      VARCHAR(20) NOT NULL,
> >           dept_name VARCHAR(20),
> >           tot_cred  NUMERIC(3,0) DEFAULT 0,
> >           PRIMARY KEY (ID),
> >           FOREIGN KEY (dept_name) REFERENCES department(dept_name)
> >         );
> >         ```
> >         
> > - **`ALTER TABLE`:** Memodifikasi struktur tabel yang sudah ada.
> >     
> >     - `ADD`: Menambah kolom baru. `ALTER TABLE student ADD gpa NUMERIC(3,2);`
> >     - `DROP`: Menghapus kolom. `ALTER TABLE student DROP gpa;`
> >     - `MODIFY` atau `ALTER COLUMN`: Mengubah tipe data sebuah kolom.
> > - **`DROP TABLE`:** Menghapus seluruh definisi tabel, data, dan indeks yang terkait secara permanen.
> >     
> >     - **Contoh:** `DROP TABLE student;`
> > 
> > ### Studi Kasus: Membuat dan Mengisi Tabel
> > 
> > Permasalahan:
> > 
> > "Buat sebuah tabel baru log_gaji untuk mencatat perubahan gaji instruktur. Tabel harus memiliki log_id (auto-increment primary key), instructor_id, gaji_lama, gaji_baru, dan tanggal_ubah. Setelah itu, simulasikan kenaikan gaji untuk instruktur 'Einstein' dari 95000 menjadi 100000 dan catat perubahan ini ke tabel log_gaji."
> > 
> > Analisis:
> > 
> > Ini adalah proses yang melibatkan DDL (CREATE TABLE) dan DML (UPDATE, INSERT).
> > 
> > **Query Solusi:**
> > 
> > 
> > ```sql
> > -- Langkah 1: Membuat tabel log (DDL)
> > CREATE TABLE log_gaji (
> >   log_id        INT AUTO_INCREMENT PRIMARY KEY,
> >   instructor_id VARCHAR(5),
> >   gaji_lama     NUMERIC(8,2),
> >   gaji_baru     NUMERIC(8,2),
> >   tanggal_ubah  DATE
> > );
> > 
> > -- Langkah 2: Mencatat log perubahan (DML)
> > -- (Dalam aplikasi nyata, ini biasanya dilakukan oleh trigger atau kode aplikasi)
> > INSERT INTO log_gaji (instructor_id, gaji_lama, gaji_baru, tanggal_ubah)
> > VALUES ('22222', 95000, 100000, CURDATE());
> > 
> > -- Langkah 3: Memperbarui gaji di tabel asli (DML)
> > UPDATE instructor
> > SET salary = 100000
> > WHERE ID = '22222';
> > ```
> > 
> > **Penjelasan:**
> > 
> > - Kita pertama-tama menggunakan DDL (`CREATE TABLE`) untuk mendefinisikan struktur tabel `log_gaji`.
> > - Kemudian, kita menggunakan DML (`INSERT`) untuk mencatat informasi perubahan ke dalam tabel log.
> > - Terakhir, kita menggunakan DML (`UPDATE`) untuk menerapkan perubahan gaji yang sebenarnya pada tabel `instructor`.

> [!cornell] #### Summary
> 
> Views adalah tabel virtual yang didefinisikan oleh query untuk menyederhanakan akses data, sedangkan DML (INSERT, UPDATE, DELETE) digunakan untuk memanipulasi data di dalam tabel. Di sisi lain, DDL (CREATE, ALTER, DROP) digunakan untuk mendefinisikan dan mengelola struktur dari tabel itu sendiri. Memahami perbedaan antara memanipulasi data (DML) dan memanipulasi struktur (DDL) adalah fundamental dalam penggunaan SQL.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Transaksi
> 
> Operasi DML seringkali dibungkus dalam sebuah **transaksi**. Sebuah transaksi adalah satu unit kerja yang terdiri dari satu atau lebih operasi SQL. Transaksi memiliki properti ACID (Atomicity, Consistency, Isolation, Durability) untuk memastikan integritas data. Perintah utamanya adalah:
> 
> - **`START TRANSACTION`**: Memulai unit kerja.
> - **`COMMIT`**: Menyimpan semua perubahan dalam transaksi secara permanen.
> - **`ROLLBACK`**: Membatalkan semua perubahan dalam transaksi seolah-olah tidak pernah terjadi.
> 
> Ini memastikan bahwa serangkaian operasi (seperti transfer uang, yang melibatkan `UPDATE` pada dua akun) berhasil sepenuhnya atau gagal sepenuhnya, tidak pernah setengah-setengah.