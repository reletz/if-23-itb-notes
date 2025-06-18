---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2240 Basis Data]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Apa struktur dasar query SQL?
> > - Apa fungsi klausa `SELECT`?
> > - Bagaimana cara menghilangkan duplikat?
> > - Apa fungsi klausa `WHERE`?
> > - Apa fungsi klausa `FROM`?
> > - Bagaimana cara menggabungkan data dari dua tabel?
> > - Apa gunanya `AS` (rename)?
> > - Bagaimana cara mencari string dengan pola (`LIKE`)?
> > - Bagaimana cara mengurutkan hasil?
> > - Apa saja Operasi Himpunan (Set Operations)?
> > - Bagaimana SQL menangani nilai `NULL`?
> 
> > ### Struktur Dasar Query SQL
> > 
> > Sebuah query SQL yang paling dasar memiliki struktur berikut, yang secara konseptual mengeksekusi urutan `FROM` -> `WHERE` -> `SELECT`:
> > 
> > ```sql
> > SELECT A1, A2, ..., An -- 3. Pilih kolom-kolom yang ingin ditampilkan
> > FROM r1, r2, ..., rm   -- 1. Ambil data dari tabel-tabel ini
> > WHERE P;              -- 2. Saring baris berdasarkan kondisi ini
> > ```
> > 
> > - `A` merepresentasikan atribut (kolom).
> > - `r` merepresentasikan relasi (tabel).
> > - `P` merepresentasikan predikat (kondisi atau kriteria penyaringan).
> > 
> > ### Klausa `SELECT`
> > 
> > - **Fungsi:** Menentukan kolom-kolom mana yang akan ditampilkan dalam hasil akhir. Ini adalah implementasi dari operasi **proyeksi** dalam aljabar relasional.
> > - **Menghilangkan Duplikat:** Gunakan kata kunci `DISTINCT` setelah `SELECT` untuk memastikan setiap baris dalam hasil query bersifat unik.
> >     - **Contoh:** `SELECT DISTINCT dept_name FROM instructor;`
> > - **Memilih Semua Kolom:** Gunakan simbol asterisk (`*`) untuk menampilkan semua kolom dari tabel.
> > - **Ekspresi Aritmatika & Alias:** `SELECT` dapat berisi ekspresi, dan `AS` memberikan nama pada kolom hasil.
> >     - **Contoh:** `SELECT name, salary/12 AS monthly_salary FROM instructor;`
> > 
> > ### Klausa `WHERE`
> > 
> > - **Fungsi:** Menyaring baris-baris data dan hanya menampilkan yang memenuhi kondisi tertentu. Ini adalah implementasi dari operasi **seleksi**.
> > - **Operator:** Mendukung operator perbandingan (`=`, `>`, `<`, `<>`) dan logika (`AND`, `OR`, `NOT`).
> >     - **Contoh:** `SELECT name, salary FROM instructor WHERE dept_name = 'Comp. Sci.' AND salary > 70000;`
> > - **Predikat `BETWEEN`:** Untuk memeriksa apakah sebuah nilai berada dalam suatu rentang (inklusif).
> >     - **Contoh:** `SELECT name FROM instructor WHERE salary BETWEEN 90000 AND 100000;`
> > 
> > ### Klausa `FROM`
> > 
> > - **Fungsi:** Menyebutkan relasi (tabel) mana yang menjadi sumber data untuk query.
> > - **Menggabungkan Tabel (Join Sederhana):** Untuk mendapatkan hasil yang bermakna dari gabungan tabel, kita harus menambahkan kondisi pada klausa `WHERE` untuk menghubungkan tabel-tabel tersebut berdasarkan kunci yang sama.
> >     - **Contoh:** `SELECT name, course_id FROM instructor, teaches WHERE instructor.ID = teaches.ID;`
> > 
> > ### Operasi Tambahan dalam Query
> > 
> > - **Rename (`AS`):** Memberikan nama alias pada kolom atau tabel untuk kemudahan membaca atau untuk kebutuhan query yang lebih kompleks seperti _self-join_ (menggabungkan tabel dengan dirinya sendiri).
> >     
> >     - **Contoh:** `FROM instructor AS T, instructor AS S`
> > - **String Operations (`LIKE`):** Digunakan pada `WHERE` untuk pencocokan string berdasarkan pola.
> >     
> >     - `%` (persen): Mewakili nol atau lebih karakter.
> >     - `_` (underscore): Mewakili tepat satu karakter.
> >     - **Contoh:** `SELECT name FROM instructor WHERE name LIKE '%dar%';`
> > - **Ordering (`ORDER BY`):** Digunakan di akhir query untuk mengurutkan hasil yang ditampilkan.
> >     
> >     - `ASC`: Mengurutkan secara menaik (default).
> >     - `DESC`: Mengurutkan secara menurun.
> >     - **Contoh:** `SELECT * FROM instructor ORDER BY dept_name ASC, salary DESC;`
> > 
> > ### Operasi Himpunan (Set Operations)
> > 
> > Menggabungkan hasil dari dua atau lebih query `SELECT`.
> > 
> > - `UNION`: Menggabungkan hasil dan menghilangkan duplikat.
> > - `INTERSECT`: Menghasilkan baris yang hanya ada di kedua hasil query.
> > - `EXCEPT`: Menghasilkan baris dari query pertama yang tidak ada di query kedua.
> >     - **Contoh:** `(SELECT course_id FROM section WHERE semester = 'Fall') UNION (SELECT course_id FROM section WHERE semester = 'Spring');`
> > 
> > ### Menangani Nilai `NULL`
> > 
> > - `NULL` merepresentasikan nilai yang tidak diketahui.
> > - **Logika Boolean:** Perbandingan yang melibatkan `NULL` akan menghasilkan nilai `unknown`. Klausa `WHERE` hanya akan memproses baris yang hasilnya `TRUE`.
> > - **Pengecekan:** Selalu gunakan `IS NULL` atau `IS NOT NULL`.
> >     - **Contoh:** `SELECT name FROM instructor WHERE salary IS NULL;`
> > 
> > ### Studi Kasus: Menggabungkan Konsep
> > 
> > Permasalahan:
> > 
> > "Tampilkan nama semua instruktur dari departemen 'Comp. Sci.' beserta judul mata kuliah yang mereka ajar. Urutkan hasilnya berdasarkan nama instruktur."
> > 
> > Analisis:
> > 
> > Kita membutuhkan data dari tiga tabel:
> > 
> > 1. `instructor` (untuk nama instruktur dan filter departemen).
> > 2. `teaches` (untuk menghubungkan instruktur dengan ID mata kuliah).
> > 3. `course` (untuk mendapatkan judul mata kuliah berdasarkan ID).
> > 
> > **Query Solusi:**
> > 
> > 
> > ```sql
> > SELECT I.name, C.title
> > FROM instructor AS I, teaches AS T, course AS C
> > WHERE I.ID = T.ID 
> >   AND T.course_id = C.course_id
> >   AND I.dept_name = 'Comp. Sci.'
> > ORDER BY I.name;
> > ```
> > 
> > **Penjelasan:**
> > 
> > - **`FROM`:** Kita mengambil data dari tiga tabel dan memberikan alias (`I`, `T`, `C`) agar query lebih singkat.
> > - **`WHERE`:** Kita menetapkan dua kondisi join (`I.ID = T.ID` dan `T.course_id = C.course_id`) untuk menghubungkan ketiga tabel dengan benar, dan satu kondisi filter (`I.dept_name = 'Comp. Sci.'`).
> > - **`SELECT`:** Kita memilih kolom nama instruktur dari tabel `instructor` (`I.name`) dan judul mata kuliah dari tabel `course` (`C.title`).
> > - **`ORDER BY`:** Kita mengurutkan hasil akhir berdasarkan nama instruktur.

> [!cornell] #### Summary
> 
> Query SQL dasar dibangun di atas tiga klausa utama: FROM untuk menentukan sumber tabel, WHERE untuk menyaring baris berdasarkan kondisi, dan SELECT untuk memilih kolom yang akan ditampilkan. Hasil query dapat diurutkan dengan ORDER BY, dan hasil dari beberapa query dapat digabungkan menggunakan operasi himpunan seperti UNION. Pencocokan pola string dilakukan dengan LIKE, dan penanganan nilai yang tidak diketahui (NULL) memerlukan logika tiga nilai (TRUE, FALSE, UNKNOWN) dan penggunaan IS NULL.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Sejarah Singkat dan Bagian-Bagian SQL
> 
> - **Sejarah:** SQL (awalnya disebut SEQUEL) dikembangkan oleh IBM di San Jose Research Laboratory pada tahun 1970-an sebagai bagian dari proyek "System R". Sejak itu, SQL telah menjadi standar industri yang dikelola oleh ANSI dan ISO, dengan berbagai versi seperti SQL-92, SQL:1999, dan seterusnya.
>     
> - **SQL Bukan Hanya Query:** SQL adalah bahasa yang komprehensif, terdiri dari beberapa bagian:
>     
>     - **DML (Data Manipulation Language):** Untuk query dan modifikasi data (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
>     - **DDL (Data Definition Language):** Untuk mendefinisikan skema (`CREATE TABLE`, `ALTER TABLE`).
>     - **Integrity:** Bagian DDL untuk mendefinisikan batasan.
>     - **View Definition:** Untuk mendefinisikan view.
>     - **Transaction Control:** Untuk mengelola transaksi (`COMMIT`, `ROLLBACK`).
>     - **Authorization:** Untuk mengelola hak akses (`GRANT`, `REVOKE`).