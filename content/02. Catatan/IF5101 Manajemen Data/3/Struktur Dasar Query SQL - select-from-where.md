---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Struktur Dasar Query SQL - select-from-where
>
> > ## Questions/Cues
> >
> > - Apa bentuk umum query SQL, dan bagaimana tiap klausa berkorespondensi dengan operasi aljabar relasional?
> > - Apa fungsi `distinct` dan `all` pada klausa `select`? Apakah SQL menghapus duplikat secara default?
> > - Bagaimana `select` menangani ekspresi aritmetika dan literal?
> > - Apa yang dilakukan klausa `from` bila memuat beberapa relasi?
> > - Bagaimana operasi **rename** (`as`) dipakai, dan mengapa berguna untuk self-join?
> > - Bagaimana operator `like`, `between`, dan tuple comparison bekerja pada `where`?
> > - Bagaimana `order by` mengurutkan hasil?
> >
> > ## Reference Points
> >
> > - IF5101 — Database System Concepts: SQL (Slides 2.29-2.41)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 3.3-3.4
>
> > ### Bentuk Dasar Query
> >
> > Sebuah query SQL tipikal berbentuk:
> >
> > ```sql
> > select A1, A2, ..., An
> > from   r1, r2, ..., rm
> > where  P
> > ```
> >
> > - `Ai` — atribut; `ri` — relasi; `P` — predikat.
> > - **Hasil sebuah query SQL adalah sebuah relasi.**
> >
> > Korespondensi dengan aljabar relasional:
> >
> > | Klausa | Operasi aljabar relasional |
> > |---|---|
> > | `select` | **proyeksi** ($\pi$) |
> > | `from` | **cartesian product** ($\times$) |
> > | `where` | **seleksi** ($\sigma$) |
> >
> > ### Klausa `select`
> >
> > Klausa `select` mendaftar atribut yang diinginkan pada hasil.
> >
> > ```sql
> > select name from instructor;
> > ```
> >
> > - **Nama di SQL bersifat case-insensitive**: `Name ≡ NAME ≡ name`.
> > - **SQL mengizinkan duplikat** baik pada relasi maupun pada hasil query. Untuk **memaksa penghapusan duplikat**, sisipkan kata kunci **`distinct`** setelah `select`:
> >
> > ```sql
> > select distinct dept_name from instructor;
> > ```
> >
> > - Kata kunci **`all`** secara eksplisit menyatakan **duplikat tidak dihapus** (perilaku default).
> > - **Asterisk `*`** berarti **"semua atribut"**: `select * from instructor;`
> > - Sebuah atribut boleh berupa **literal**:
> >   - `select '437'` → tabel satu kolom, satu baris bernilai `"437"`. Beri nama kolom dengan `select '437' as FOO`.
> >   - `select 'A' from instructor` → tabel satu kolom, **N baris** (sebanyak tuple `instructor`), tiap baris bernilai `"A"`.
> > - Klausa `select` boleh memuat **ekspresi aritmetika** (`+`, `−`, `*`, `/`) atas konstanta atau atribut:
> >
> > ```sql
> > select ID, name, salary/12 as monthly_salary
> > from   instructor;
> > ```
> >
> > ### Klausa `where`
> >
> > Klausa `where` menetapkan **kondisi yang harus dipenuhi hasil** (≈ predikat seleksi aljabar relasional).
> >
> > ```sql
> > select name from instructor where dept_name = 'Comp. Sci.';
> > ```
> >
> > - Konektif logika: **`and`, `or`, `not`**.
> > - Operator perbandingan: **`<`, `<=`, `>`, `>=`, `=`, `<>`**.
> > - Perbandingan dapat diterapkan pada hasil ekspresi aritmetika:
> >
> > ```sql
> > select name
> > from   instructor
> > where  dept_name = 'Comp. Sci.' and salary > 70000;
> > ```
> >
> > ### Klausa `from`
> >
> > Klausa `from` mendaftar relasi yang terlibat (≈ **cartesian product** aljabar relasional).
> >
> > ```sql
> > select *
> > from   instructor, teaches;
> > ```
> >
> > - Menghasilkan **setiap pasangan** tuple `instructor`–`teaches`, dengan semua atribut dari kedua relasi.
> > - Untuk atribut yang **namanya sama** (mis. `ID`), atribut hasil **diberi awalan nama relasi** — `instructor.ID`, `teaches.ID`.
> > - Cartesian product **tidak berguna langsung**, tetapi berguna **digabung kondisi `where`** (menjadi operasi join):
> >
> > ```sql
> > -- nama dosen yang pernah mengajar + course_id-nya
> > select name, course_id
> > from   instructor, teaches
> > where  instructor.ID = teaches.ID;
> >
> > -- dibatasi departemen Art
> > select name, course_id
> > from   instructor, teaches
> > where  instructor.ID = teaches.ID
> >        and instructor.dept_name = 'Art';
> > ```
> >
> > ### Operasi Rename (`as`)
> >
> > SQL mengizinkan penamaan ulang relasi dan atribut lewat klausa **`as`**: `old-name as new-name`. Kata kunci `as` **opsional** untuk relasi: `instructor as T ≡ instructor T`.
> >
> > Berguna untuk **self-join** — merujuk relasi yang sama dua kali dengan alias berbeda:
> >
> > ```sql
> > -- nama dosen bergaji lebih tinggi dari beberapa dosen di 'Comp. Sci.'
> > select distinct T.name
> > from   instructor as T, instructor as S
> > where  T.salary > S.salary and S.dept_name = 'Comp. Sci.';
> > ```
> >
> > ### String Operations
> >
> > Operator **`like`** mencocokkan pola string dengan dua karakter spesial:
> >
> > - **`%`** — mencocokkan **substring apa pun** (termasuk kosong).
> > - **`_`** — mencocokkan **tepat satu karakter apa pun**.
> >
> > ```sql
> > select name from instructor where name like '%dar%';
> > ```
> >
> > Contoh pola: `'Intro%'` (diawali "Intro"), `'%Comp%'` (mengandung "Comp"), `'_ _ _'` (tepat tiga karakter), `'_ _ _ %'` (minimal tiga karakter). **Pola bersifat case-sensitive.**
> >
> > Untuk mencocokkan karakter `%` literal, pakai **escape character**:
> >
> > ```sql
> > where s like '100 \%' escape '\'
> > ```
> >
> > SQL juga mendukung **konkatenasi** (`||`), konversi huruf besar/kecil, panjang string, ekstraksi substring, dll.
> >
> > ### Where Clause Predicates: `between` dan Tuple Comparison
> >
> > Operator **`between`**:
> >
> > ```sql
> > select name
> > from   instructor
> > where  salary between 90000 and 100000;   -- inklusif kedua batas
> > ```
> >
> > **Tuple comparison** — membandingkan beberapa nilai sekaligus:
> >
> > ```sql
> > select name, course_id
> > from   instructor, teaches
> > where  (instructor.ID, dept_name) = (teaches.ID, 'Biology');
> > ```
> >
> > ### Ordering the Display of Tuples
> >
> > **`order by`** mengurutkan tampilan hasil:
> >
> > ```sql
> > select distinct name
> > from   instructor
> > order by name;
> > ```
> >
> > - **`asc`** (naik, **default**) atau **`desc`** (turun) dapat dispesifikasikan per atribut: `order by name desc`.
> > - Bisa mengurutkan berdasarkan **beberapa atribut**: `order by dept_name, name` (urut `dept_name` dulu, lalu `name` dalam tiap grup).

> [!cornell] #### Summary
>
> Query SQL berbentuk **`select A... from r... where P`**, hasilnya selalu **sebuah relasi**; `select`≈proyeksi, `from`≈cartesian product, `where`≈seleksi. **SQL membiarkan duplikat** — `distinct` menghapusnya, `all` (default) mempertahankannya; `*` = semua atribut; `select` boleh memuat **literal** dan **ekspresi aritmetika** (`salary/12 as monthly_salary`). `where` memakai `and/or/not` dan `< <= > >= = <>`. `from` dengan beberapa relasi = **cartesian product**; digabung `where R1.k = R2.k` menjadi join, atribut senama diberi awalan nama relasi. **`as`** merename relasi/atribut — kunci untuk **self-join**. String: **`like`** (`%` = substring, `_` = satu karakter, case-sensitive, `escape` untuk literal), `||` konkatenasi. **`between a and b`** inklusif; **tuple comparison** `(x,y) = (a,b)`. **`order by`** mengurutkan (`asc` default / `desc`, multi-atribut).

> [!ad-libitum]- Additional Information
>
> #### Urutan evaluasi logis vs urutan penulisan
>
> Meskipun ditulis `select ... from ... where ...`, DBMS mengevaluasi secara logis: **`from` → `where` → `group by` → `having` → `select` → `order by`**. Ini menjelaskan mengapa alias yang dibuat di `select` (mis. `monthly_salary`) sering **tidak bisa dipakai di `where`** (tetapi bisa di `order by`), dan mengapa `where` tidak boleh memuat fungsi agregat.
>
> #### `like` vs full-text search vs regex
>
> `like '%kata%'` tidak bisa memakai indeks B-tree biasa (leading wildcard) → lambat untuk tabel besar. Alternatif: `ILIKE` (case-insensitive, PostgreSQL), operator regex `~`, indeks **trigram** (`pg_trgm`), atau **full-text search** (`tsvector`/`tsquery`) untuk pencarian bahasa alami dengan ranking.
>
> #### `NULL` dan `order by`
>
> Query berbasis `where salary between ...` diam-diam membuang baris dengan `salary IS NULL` (perbandingan menghasilkan `unknown`). Pada `order by`, posisi `NULL` bergantung dialek — SQL standar & PostgreSQL menaruhnya terakhir untuk `asc` (kontrol via `nulls first`/`nulls last`); MySQL menaruhnya pertama.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis satu query yang memakai `distinct`, ekspresi aritmetika dengan `as`, `like`, `between`, dan `order by` multi-kolom sekaligus atas tabel `instructor`. Jalankan, lalu hapus `distinct` dan jelaskan perubahan jumlah baris.
> 2. Lakukan self-join `instructor` untuk mencari semua pasangan dosen dalam departemen yang sama dengan selisih gaji > 20.000. Cegah pasangan ganda (A,B) dan (B,A) dengan syarat `T.ID < S.ID`.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 3.3 (Basic Structure of SQL Queries), 3.4 (Additional Basic Operations).
> - Dokumentasi PostgreSQL — "Queries", "Pattern Matching" (LIKE, SIMILAR TO, POSIX regex).
