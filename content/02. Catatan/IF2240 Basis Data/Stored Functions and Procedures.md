---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2240 Basis Data]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa tujuan utama Fungsi & Prosedur?
> > - Berikan contoh aturan bisnis.
> > - Apa keuntungan *stored procedures*?
> > - Bagaimana dukungan SQL:1999?
> > - Apa itu Fungsi Bernilai Tabel?
> > - Apa saja konstruksi imperatif di SQL?
> > - Contoh Fungsi SQL: `dept_count`?
> > - Bagaimana menggunakan `dept_count`?
> > - Apa itu *Compound Statement*?
> > - Apa beda `RETURNS` dan `RETURN`?
> > - Fungsi SQL sebagai apa?
> > - Contoh Fungsi Tabel?
> > - Contoh Prosedur SQL: `dept_count_proc`?
> > - Bagaimana memanggil Prosedur?
> > - Apa itu *name overloading*?
> > - Konstruksi bahasa untuk perulangan?
> > - Konstruksi bahasa kondisional?
> > - Bagaimana penanganan pengecualian?
> >
> > ## Reference Points
> > - Slide 38-48 dari "20. IF2240-SemII_2425-m13-1-Integrity-Constraints.pdf"
>
> >
> > ### Penggunaan Fungsi dan Prosedur
> > - **Prosedur dan fungsi** memungkinkan "**logika bisnis**" disimpan di dalam *database* dan dieksekusi dari pernyataan SQL.
> > - Contoh logika bisnis atau aturan universitas:
> >   - Berapa banyak mata kuliah yang bisa diambil seorang mahasiswa dalam satu semester.
> >   - Jumlah minimum mata kuliah yang harus diajarkan instruktur *full-time* dalam setahun.
> >   - Jumlah maksimum jurusan yang bisa diambil seorang mahasiswa.
> >   - Dan seterusnya.
> >
> > ### Keuntungan Stored Procedures
> > - Meskipun logika bisnis bisa dikodekan dalam prosedur bahasa pemrograman di luar *database*, mendefinisikannya sebagai **`stored procedures`** di *database* memiliki beberapa keuntungan:
> >   - Memungkinkan **banyak aplikasi untuk mengakses prosedur** yang sama.
> >   - Memungkinkan **satu titik perubahan** jika aturan bisnis berubah, tanpa harus mengubah bagian lain dari aplikasi.
> > - Kode aplikasi dapat memanggil *stored procedures* alih-alih langsung memperbarui relasi *database*.
> >
> > ### Dukungan SQL:1999 untuk Fungsi dan Prosedur
> > - **SQL:1999** mendukung fungsi dan prosedur.
> > - Fungsi/prosedur dapat ditulis dalam SQL itu sendiri, atau dalam bahasa pemrograman eksternal (misalnya, C, Java).
> > - Fungsi yang ditulis dalam bahasa eksternal sangat berguna untuk tipe data khusus seperti gambar dan objek geometris. Contohnya adalah fungsi untuk memeriksa apakah poligon tumpang tindih, atau untuk membandingkan gambar untuk kesamaan.
> > - Beberapa sistem *database* mendukung **fungsi bernilai tabel (table-valued functions)**, yang dapat mengembalikan relasi sebagai hasilnya.
> > - SQL:1999 juga mendukung set konstruksi imperatif yang kaya, termasuk perulangan (`loops`), pernyataan kondisional (`if-then-else`), dan penugasan (`assignment`).
> > - Banyak *database* memiliki ekstensi prosedural kepemilikan untuk SQL yang berbeda dari SQL:1999.
> >
> > ### Fungsi SQL: Contoh `dept_count`
> > - Mendefinisikan sebuah fungsi yang, diberikan nama departemen, mengembalikan jumlah instruktur di departemen tersebut.
> > - **Sintaks Fungsi:**
> >   ```sql
> >   create function dept_count (dept_name varchar(20))
> >   returns integer
> >   begin
> >       declare d_count integer;
> >       select count(*) into d_count
> >       from instructor
> >       where instructor.dept_name = dept_name;
> >       return d_count;
> >   end;
> >   ```
> >   - **`returns integer`**: Mengindikasikan tipe variabel yang akan dikembalikan oleh fungsi.
> >   - **`return`**: Menentukan nilai yang akan dikembalikan sebagai hasil pemanggilan fungsi.
> > - **Penggunaan Fungsi `dept_count`**:
> >   - Fungsi ini dapat digunakan untuk menemukan nama departemen dan anggaran semua departemen dengan lebih dari 12 instruktur.
> >   - **Contoh penggunaan dalam `SELECT`:**
> >     ```sql
> >     select dept_name, budget
> >     from department
> >     where dept_count (dept_name) > 12;
> >     ```
> > - **Compound statement**: `begin... end` 
> >   - Dapat berisi beberapa pernyataan SQL antara `begin` dan `end`.
> > - Fungsi SQL sebenarnya adalah *parameterized views* yang menggeneralisasi gagasan *view* biasa dengan memungkinkan parameter.
> >
> > ### Fungsi Tabel (Table Functions)
> > - **SQL:2003** menambahkan fungsi yang mengembalikan sebuah relasi (tabel) sebagai hasilnya.
> > - **Contoh: Mengembalikan semua instruktur di departemen tertentu**.
> >   ```sql
> >   create function instructor_of (dept_name char(20))
> >   returns table (
> >       ID varchar(5),
> >       name varchar(20),
> >       dept_name varchar(20),
> >       salary numeric(8,2)
> >   )
> >   return table
> >   select *
> >   from instructor
> >   where instructor.dept_name = instructor_of.dept_name;
> >   ```
> > - **Contoh Penggunaan:**
> >   ```sql
> >   select ID, name, dept_name, salary from table (instructor_of ('Music'))
> >   ```
> >
> > ### Prosedur SQL: Contoh `dept_count_proc`
> > - Fungsi `dept_count` dapat juga ditulis sebagai prosedur.
> > - **Sintaks Prosedur:**
> >   ```sql
> >   create procedure dept_count_proc (in dept_name varchar(20), out d_count integer)
> >   begin
> >       select count(*) into d_count
> >       from instructor
> >       where instructor.dept_name = dept_count_proc.dept_name;
> >   end;
> >   ```
> > - **Pemanggilan Prosedur**: Prosedur dapat dipanggil dari prosedur SQL lain atau dari Embedded SQL, menggunakan pernyataan `CALL`.
> >   - **Contoh Pemanggilan:**
> >     ```sql
> >     declare d_count integer;
> >     call dept_count_proc('Physics', d_count);
> >     ```
> > - Prosedur dan fungsi juga dapat dipanggil dari SQL Dinamis.
> > - **`Name overloading`**: SQL:1999 mengizinkan lebih dari satu fungsi/prosedur dengan nama yang sama, asalkan jumlah argumennya berbeda, atau setidaknya tipe argumennya berbeda.
> >
> > ### Konstruksi Bahasa untuk Prosedur & Fungsi
> > - SQL mendukung konstruksi yang memberikannya hampir semua kekuatan bahasa pemrograman tujuan umum.
> >   - **Peringatan**: Sebagian besar sistem *database* mengimplementasikan varian mereka sendiri dari sintaks standar di bawah ini.
> > - **Compound statement**: `begin... end`.
> >   - Dapat berisi beberapa pernyataan SQL antara `begin` dan `end`.
> >   - Variabel lokal dapat dideklarasikan di dalam *compound statements*.
> > - **Pernyataan `While` dan `Repeat`** (untuk perulangan):
> >   - **`while`**:
> >     ```sql
> >     while boolean_expression do
> >         sequence of statements;
> >     end while;
> >     ```
> >   - **`repeat`**:
> >     ```sql
> >     repeat
> >         sequence of statements;
> >     until boolean_expression
> >     end repeat;
> >     ```
> > - **`For loop`**: Memungkinkan iterasi atas semua hasil dari sebuah *query*.
> >   - **Contoh: Mencari total anggaran semua departemen**.
> >     ```sql
> >     declare n integer default 0;
> >     for r as select budget from department do
> >         set n = n + r.budget;
> >     end for;
> >     ```
> > - **Pernyataan Kondisional (`if-then-else`)**.
> >   - SQL:1999 juga mendukung pernyataan `CASE` yang mirip dengan pernyataan `case` di C.
> > - **Penandaan Kondisi Pengecualian (`Signaling of exception conditions`) dan Penanganan (`declaring handlers for exceptions`)**.
> >   - **Contoh:** Prosedur untuk mendaftarkan siswa setelah memastikan kapasitas kelas tidak terlampaui. Mengembalikan 0 jika berhasil dan -1 jika kapasitas terlampaui.
> >     ```sql
> >     declare out_of_classroom_seats condition;
> >     declare exit handler for out_of_classroom_seats
> >     begin
> >         signal out_of_classroom_seats;
> >     end;
> >     ```
> >   - `handler` di sini adalah `exit`, yang menyebabkan blok `begin..end` yang mengapitnya keluar. Tindakan lain juga dimungkinkan pada pengecualian.

> [!cornell] #### Summary
> **Fungsi dan Prosedur Tersimpan (Stored Functions and Procedures)** memungkinkan **logika bisnis** disimpan dan dieksekusi langsung di dalam *database*, menawarkan keuntungan seperti **akses multi-aplikasi** dan **satu titik perubahan** untuk aturan bisnis. SQL:1999 mendukung pembuatan fungsi (mengembalikan nilai atau tabel) dan prosedur (melakukan tindakan melalui parameter `OUT`), baik dalam SQL maupun bahasa eksternal. Bahasa SQL telah diperkaya dengan **konstruksi imperatif** seperti perulangan (`WHILE`, `REPEAT`, `FOR`), kondisional (`IF-THEN-ELSE`, `CASE`), dan mekanisme **penanganan pengecualian** , menjadikannya bahasa pemrograman tujuan umum yang kuat di dalam *database*.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Keamanan (Security)**: *Stored procedures* dapat meningkatkan keamanan *database* karena pengguna akhir dapat diberikan izin untuk mengeksekusi prosedur tanpa perlu izin langsung pada tabel dasar. Ini memungkinkan kontrol akses yang lebih granular.
> - **Performa**: Meskipun memiliki *overhead* awal saat dikompilasi, *stored procedures* sering kali meningkatkan performa karena kode dieksekusi di server *database*, mengurangi *network traffic*, dan dapat memanfaatkan *caching* eksekusi.
> - **Transaksional**: Prosedur dapat mengelola transaksi, memungkinkan beberapa operasi DML untuk dikelompokkan ke dalam satu unit kerja atomik. Ini sangat penting untuk menjaga konsistensi data.
>
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks**: Silberschatz, Korth, Sudarshan: "Database System Concepts", Edisi ke-7, Bagian 5.2: Functions and Procedures.
> - **Dokumentasi Resmi Database**: Pelajari ekstensi prosedural spesifik untuk *database* yang Anda gunakan (misalnya, PL/pgSQL untuk PostgreSQL, Transact-SQL untuk SQL Server, PL/SQL untuk Oracle) untuk memahami fitur-fitur uniknya.
>
> #### Eksplorasi Mandiri:
> - **Praktik Pembuatan Fungsi/Prosedur**: Buat fungsi yang menghitung usia karyawan dari tanggal lahir, atau prosedur yang secara otomatis menghitung bonus karyawan berdasarkan performa.
> - **Debugging Prosedur**: Pelajari cara menggunakan alat *debugging* yang disediakan oleh sistem *database* Anda untuk melacak eksekusi prosedur dan mengidentifikasi masalah.