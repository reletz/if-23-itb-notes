---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Set Operations, Null Values, dan Aggregate Functions
>
> > ## Questions/Cues
> >
> > - Apa tiga operasi himpunan SQL (`union`, `intersect`, `except`), dan bagaimana mereka menangani duplikat?
> > - Apa arti `null`, dan bagaimana ia memengaruhi aritmetika dan perbandingan?
> > - Bagaimana logika **tiga-nilai** (`true`/`false`/`unknown`) bekerja untuk `and`/`or`?
> > - Apa lima fungsi agregat, dan bagaimana `count(*)` berbeda dari `count(A)`?
> > - Apa fungsi `group by`, dan aturan apa yang mengikat atribut di `select`?
> > - Apa beda `having` dan `where`?
> >
> > ## Reference Points
> >
> > - IF5101 — Database System Concepts: SQL (Slides 2.42-2.50)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 3.5-3.7
>
> > ### Set Operations
> >
> > Operasi himpunan bekerja pada hasil dua subquery yang **union-compatible**:
> >
> > ```sql
> > -- course yang berjalan di Fall 2017 ATAU Spring 2018
> > (select course_id from section where semester = 'Fall'   and year = 2017)
> > union
> > (select course_id from section where semester = 'Spring' and year = 2018);
> >
> > -- course yang berjalan di Fall 2017 DAN Spring 2018
> > (... ) intersect (... );
> >
> > -- course yang berjalan di Fall 2017 TAPI TIDAK di Spring 2018
> > (... ) except (... );
> > ```
> >
> > - **`union`, `intersect`, `except` otomatis menghapus duplikat.**
> > - Untuk **mempertahankan semua duplikat**, gunakan **`union all`**, **`intersect all`**, **`except all`**.
> >
> > ### Null Values
> >
> > Tuple boleh punya nilai **`null`** untuk sebagian atributnya. `null` menandakan **nilai yang tidak diketahui** atau **tidak ada**.
> >
> > - **Hasil ekspresi aritmetika apa pun yang melibatkan `null` adalah `null`**. Contoh: `5 + null` → `null`.
> > - Predikat **`is null`** memeriksa nilai null; **`is not null`** kebalikannya:
> >
> > ```sql
> > select name from instructor where salary is null;
> > ```
> >
> > - **SQL memperlakukan hasil perbandingan apa pun yang melibatkan `null` sebagai `unknown`** (kecuali `is null` / `is not null`). Contoh: `5 < null`, `null <> null`, `null = null` → semuanya **`unknown`**.
> >
> > ### Logika Tiga-Nilai
> >
> > Karena ada nilai `unknown`, operasi Boolean diperluas:
> >
> > | Operasi | Hasil |
> > |---|---|
> > | `true and unknown` | `unknown` |
> > | `false and unknown` | `false` |
> > | `unknown and unknown` | `unknown` |
> > | `true or unknown` | `true` |
> > | `false or unknown` | `unknown` |
> > | `unknown or unknown` | `unknown` |
> >
> > **Hasil predikat klausa `where` diperlakukan sebagai `false` jika ia bernilai `unknown`** — baris tersebut tidak masuk hasil.
> >
> > ```mermaid
> > flowchart TD
> >     A["Ekspresi melibatkan null"] --> B{"Jenis?"}
> >     B -->|"Aritmetika: 5 + null"| C["Hasil = null"]
> >     B -->|"Perbandingan: 5 = null / null = null"| D["Hasil = unknown"]
> >     B -->|"is null / is not null"| E["Hasil = true atau false (pasti)"]
> >     D --> F["di WHERE: unknown diperlakukan sebagai false<br/>maka baris dibuang"]
> > ```
> >
> > ### Aggregate Functions
> >
> > Fungsi agregat beroperasi pada **multiset nilai sebuah kolom** dan mengembalikan **satu nilai**:
> >
> > | Fungsi | Hasil |
> > |---|---|
> > | **`avg`** | rata-rata |
> > | **`min`** | nilai minimum |
> > | **`max`** | nilai maksimum |
> > | **`sum`** | jumlah nilai |
> > | **`count`** | banyaknya nilai |
> >
> > ```sql
> > select avg(salary) from instructor where dept_name = 'Comp. Sci.';
> >
> > select count(distinct ID)
> > from   teaches
> > where  semester = 'Spring' and year = 2018;
> >
> > select count(*) from course;
> > ```
> >
> > Catatan: **`count(*)`** menghitung **baris** (termasuk yang semua kolomnya null); **`count(A)`** menghitung baris dengan `A` **bukan null**. `sum`/`avg` juga mengabaikan `null`.
> >
> > ### Group By
> >
> > **`group by`** mengelompokkan tuple lalu menerapkan agregat per grup:
> >
> > ```sql
> > select dept_name, avg(salary) as avg_salary
> > from   instructor
> > group by dept_name;
> > ```
> >
> > **Aturan wajib:** **atribut di klausa `select` yang berada di luar fungsi agregat harus muncul di daftar `group by`**. Query berikut **salah** karena `ID` tidak diagregasi dan tidak ada di `group by`:
> >
> > ```sql
> > /* erroneous query */
> > select dept_name, ID, avg(salary)
> > from   instructor
> > group by dept_name;
> > ```
> >
> > ### Having Clause
> >
> > **`having`** menyaring **grup** (bukan baris) berdasarkan predikat yang boleh memuat agregat:
> >
> > ```sql
> > select dept_name, avg(salary) as avg_salary
> > from   instructor
> > group by dept_name
> > having avg(salary) > 42000;
> > ```
> >
> > **Perbedaan kunci:** predikat **`having` diterapkan setelah pembentukan grup**, sedangkan predikat **`where` diterapkan sebelum grup dibentuk** (pada baris individual).

> [!cornell] #### Summary
>
> **`union`/`intersect`/`except`** menggabungkan hasil dua subquery dan **menghapus duplikat** secara default (`... all` untuk mempertahankan). **`null`** = *unknown*/tidak ada: aritmetika dengan `null` → **`null`**; perbandingan dengan `null` → **`unknown`** (kecuali **`is null`/`is not null`**). Logika **tiga-nilai**: `true and unknown = unknown`, `false and unknown = false`, `true or unknown = true`; di `where`, **`unknown` diperlakukan `false`** sehingga baris dibuang. Fungsi agregat **`avg`, `min`, `max`, `sum`, `count`** mengembalikan satu nilai atas multiset kolom; **`count(*)`** menghitung baris, **`count(A)`/`sum`/`avg`** mengabaikan `null`; `count(distinct ...)` menghapus duplikat dulu. **`group by`** membuat grup — **atribut non-agregat di `select` wajib ada di `group by`**. **`having`** menyaring grup dengan predikat agregat **setelah** grup terbentuk, berbeda dari **`where`** yang menyaring baris **sebelum** grup.

> [!ad-libitum]- Additional Information
>
> #### `NOT IN` dengan subquery ber-`NULL` — jebakan klasik
>
> Jika subquery pada `x NOT IN (subquery)` mengembalikan satu saja `NULL`, seluruh predikat menjadi `unknown` untuk **semua** `x`, sehingga hasilnya **kosong** — bukan error, tetapi diam-diam salah. Gunakan `NOT EXISTS` (lihat [[Nested Subqueries dan With Clause]]) atau tambahkan `WHERE kolom IS NOT NULL` di subquery.
>
> #### Window functions: agregasi tanpa kolaps baris
>
> `group by` mengurangi jumlah baris. Untuk menghitung agregat **sambil mempertahankan setiap baris** (mis. gaji dosen vs rata-rata departemennya di baris yang sama), pakai window function: `avg(salary) over (partition by dept_name)`. Juga `row_number()`, `rank()`, `sum(...) over (order by ...)` untuk running total. Masuk standar sejak SQL:2003.
>
> #### `FILTER` dan agregasi bersyarat
>
> SQL standar: `count(*) filter (where grade = 'A')` menghitung hanya baris yang memenuhi syarat, beberapa di satu query. Alternatif portabel: `sum(case when grade = 'A' then 1 else 0 end)`.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat tabel `instructor` dengan beberapa `salary` bernilai `NULL`. Bandingkan `count(*)`, `count(salary)`, `sum(salary)`, `avg(salary)`, dan `sum(salary)/count(*)`. Jelaskan setiap selisih.
> 2. Tulis query "departemen dengan gaji rata-rata > 42000 **dan** jumlah dosen ≥ 3" memakai `group by` + `having` dengan dua kondisi. Lalu tulis ulang tanpa `having` memakai subquery di `from`.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 3.5 (Set Operations), 3.6 (Null Values), 3.7 (Aggregate Functions).
> - Dokumentasi PostgreSQL — "Aggregate Functions", "Window Functions".
