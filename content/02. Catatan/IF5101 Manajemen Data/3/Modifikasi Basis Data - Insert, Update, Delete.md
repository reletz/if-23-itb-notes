---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Modifikasi Basis Data - Insert, Update, Delete
>
> > ## Questions/Cues
> >
> > - Apa dua bentuk `insert` (dengan/tanpa daftar kolom), dan bagaimana `insert ... select` bekerja?
> > - Mengapa `select` pada `insert ... select` dievaluasi penuh sebelum penyisipan?
> > - Bagaimana `delete` dengan subquery bisa bermasalah (kasus rata-rata berubah), dan apa solusi SQL?
> > - Apa tiga bentuk `update` (semua baris / bersyarat / dengan subquery)?
> > - Mengapa urutan dua `update` bersyarat penting, dan bagaimana `case` mengatasinya?
> > - Bagaimana `update` dengan scalar subquery dipakai untuk menghitung ulang nilai turunan?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 2 (Slides 16-18)
> > - IF5101 — Database System Concepts: SQL (Slides 2.66-2.74)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 3.9
>
> > ### Insert Statement
> >
> > Menambah satu tuple ke `course` — dua bentuk ekuivalen:
> >
> > ```sql
> > insert into course values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);
> >
> > insert into course (course_id, title, dept_name, credits)
> > values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);
> > ```
> >
> > Bentuk **dengan daftar kolom** lebih aman: tidak bergantung urutan kolom di skema, dan kolom yang tidak disebut diisi `null`/default.
> >
> > Menyisipkan tuple `student` dengan `tot_cred` = `null`:
> >
> > ```sql
> > insert into student values ('3003', 'Green', 'Finance', null);
> > insert into student (ID, name, dept_name) values ('3003', 'Green', 'Finance');
> > ```
> >
> > **`insert ... select`** — menyisipkan hasil sebuah query. "Jadikan setiap mahasiswa departemen Music dengan > 144 SKS sebagai dosen Music bergaji $18.000":
> >
> > ```sql
> > insert into instructor
> >     select ID, name, dept_name, 18000
> >     from   student
> >     where  dept_name = 'Music' and tot_cred > 144;
> > ```
> >
> > **Statement `select-from-where` dievaluasi penuh sebelum hasilnya disisipkan.** Kalau tidak, query seperti `insert into table1 select * from table1` akan menyisip tanpa henti (baris baru ikut terbaca lagi).
> >
> > ### Delete Statement
> >
> > ```sql
> > delete from instructor;                              -- hapus semua baris (skema tetap)
> > delete from instructor where dept_name = 'Finance';  -- hapus bersyarat
> >
> > -- hapus dosen yang departemennya di gedung Watson
> > delete from instructor
> > where  dept_name in (select dept_name
> >                      from   department
> >                      where  building = 'Watson');
> > ```
> >
> > `delete` hanya menghapus **baris** dari **satu relasi**; untuk menghapus tabel beserta skemanya pakai `drop table` (lihat [[DDL - Create Table, Tipe Data, dan Perubahan Skema]]).
> >
> > ### Masalah Subquery yang Merujuk Relasi yang Dimodifikasi
> >
> > "Hapus semua dosen yang gajinya di bawah rata-rata gaji dosen":
> >
> > ```sql
> > delete from instructor
> > where  salary < (select avg(salary) from instructor);
> > ```
> >
> > **Masalah:** saat tuple dihapus, **rata-rata gaji ikut berubah** — evaluasi berulang akan menghasilkan hasil yang bergantung urutan.
> >
> > **Solusi yang dipakai SQL (dua langkah):**
> >
> > 1. **Hitung `avg(salary)` dulu** dan tentukan **semua tuple yang akan dihapus**.
> > 2. **Hapus semua tuple** yang ditemukan di langkah 1 — **tanpa menghitung ulang** rata-rata atau menguji ulang tuple.
> >
> > ### Update Statement
> >
> > ```sql
> > -- kenaikan gaji 5% untuk SEMUA dosen
> > update instructor set salary = salary * 1.05;
> >
> > -- kenaikan 5% hanya untuk yang bergaji < 70000
> > update instructor set salary = salary * 1.05 where salary < 70000;
> >
> > -- kenaikan 5% untuk yang bergaji di bawah rata-rata
> > update instructor
> > set    salary = salary * 1.05
> > where  salary < (select avg(salary) from instructor);
> > ```
> >
> > ### Urutan Update Bersyarat dan `case`
> >
> > "Naikkan gaji dosen bergaji > $100.000 sebesar 3%, sisanya 5%." Dengan **dua `update`**, **urutan penting**:
> >
> > ```sql
> > update instructor set salary = salary * 1.03 where salary > 100000;
> > update instructor set salary = salary * 1.05 where salary <= 100000;
> > ```
> >
> > Jika urutan dibalik, sebagian dosen bisa terkena **dua kali** kenaikan (yang tadinya ≤ 100.000 lalu melewati ambang). Lebih baik dengan **satu `update` + `case`**:
> >
> > ```sql
> > update instructor
> > set salary = case
> >                  when salary <= 100000 then salary * 1.05
> >                  else salary * 1.03
> >              end;
> > ```
> >
> > ### Update dengan Scalar Subquery
> >
> > Menghitung ulang `tot_cred` semua mahasiswa dari total SKS course yang lulus:
> >
> > ```sql
> > update student S
> > set tot_cred = ( select sum(credits)
> >                  from   takes, course
> >                  where  takes.course_id = course.course_id
> >                         and S.ID = takes.ID
> >                         and takes.grade is not null
> >                         and takes.grade <> 'F' );
> > ```
> >
> > Ini men-set `tot_cred` = `null` untuk mahasiswa yang belum mengambil course apa pun (`sum` atas himpunan kosong = `null`). Untuk menghasilkan `0`, bungkus dengan `case`:
> >
> > ```sql
> > case when sum(credits) is not null then sum(credits) else 0 end
> > ```

> [!cornell] #### Summary
>
> **`insert into r values (...)`** atau **`insert into r (kol...) values (...)`** (bentuk berdaftar-kolom lebih aman); **`insert into r select ...`** menyisipkan hasil query — `select` **dievaluasi penuh dulu** agar `insert into t select * from t` tidak berulang tanpa henti. **`delete from r`** menghapus baris (semua / bersyarat / via subquery), berbeda dari `drop table`. **`delete` (dan `update`) dengan subquery atas relasi yang sama** berisiko: kondisi seperti `salary < (select avg(salary) ...)` berubah saat baris dihapus — SQL menyelesaikannya **dua langkah**: tentukan semua tuple sasaran dulu, baru modifikasi tanpa evaluasi ulang. **`update r set A = expr where P`** dalam tiga bentuk (semua / bersyarat / subquery). Untuk aturan bertingkat, **satu `update` + `case`** menghindari bug urutan dua `update` berturut. **Scalar subquery di `set`** menghitung ulang nilai turunan (mis. `tot_cred`); `sum` atas himpunan kosong = `null`, gunakan `case` untuk memaksa `0`.

> [!ad-libitum]- Additional Information
>
> #### `upsert`: `insert ... on conflict` / `merge`
>
> Kebutuhan umum "sisipkan jika belum ada, kalau ada perbarui" tidak ada di SQL-92. Solusi: `INSERT ... ON CONFLICT (key) DO UPDATE` (PostgreSQL/SQLite), `INSERT ... ON DUPLICATE KEY UPDATE` (MySQL), atau `MERGE` (SQL standar 2003, Oracle/SQL Server, dan PostgreSQL 15+).
>
> #### `RETURNING`
>
> `INSERT`/`UPDATE`/`DELETE ... RETURNING *` mengembalikan baris yang terpengaruh dalam satu round-trip — sangat berguna untuk mengambil surrogate key hasil auto-increment atau mengaudit apa yang berubah.
>
> #### `UPDATE ... FROM` untuk update berbasis join
>
> Scalar subquery per baris bisa lambat. Banyak dialek mendukung `UPDATE student SET tot_cred = t.total FROM (SELECT ID, sum(credits) AS total FROM takes JOIN course USING (course_id) WHERE ... GROUP BY ID) t WHERE student.ID = t.ID` — satu agregasi, bukan per baris.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat `instructor` berisi 5 gaji. Jalankan `delete from instructor where salary < (select avg(salary) from instructor)` dan verifikasi bahwa hasilnya sesuai model "hitung avg sekali" (bukan iteratif). Hitung manual avg awal untuk mengecek.
> 2. Implementasikan aturan kenaikan gaji bertingkat dengan (a) dua `update` urutan benar, (b) dua `update` urutan salah, (c) satu `update` + `case`. Bandingkan hasil ketiganya pada dosen bergaji tepat 99.000 dan 101.000.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 3.9 (Modification of the Database).
> - Dokumentasi PostgreSQL — "INSERT", "UPDATE", "DELETE", "INSERT ... ON CONFLICT".
