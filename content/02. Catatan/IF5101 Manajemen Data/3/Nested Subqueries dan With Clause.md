---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Nested Subqueries dan With Clause
>
> > ## Questions/Cues
> >
> > - Di klausa mana saja subquery boleh disisipkan (`from`, `where`, `select`)?
> > - Bagaimana `in` / `not in` menguji keanggotaan himpunan?
> > - Apa arti `> some` dan `> all`, dan bagaimana definisi formalnya?
> > - Apa itu `exists` / `not exists` dan **correlated subquery**?
> > - Bagaimana pola `not exists (X except Y)` mengekspresikan "untuk semua"?
> > - Apa fungsi subquery di klausa `from`, dan apa fungsi klausa `with`?
> > - Apa itu **scalar subquery**?
> >
> > ## Reference Points
> >
> > - IF5101 — Database System Concepts: SQL (Slides 2.51-2.64)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 3.8
>
> > ### Prinsip Nesting
> >
> > Sebuah **subquery** adalah ekspresi `select-from-where` yang **disarangkan di dalam query lain**. Pada bentuk:
> >
> > ```sql
> > select A1, A2, ..., An
> > from   r1, r2, ..., rm
> > where  P
> > ```
> >
> > nesting dapat dilakukan di:
> >
> > - **Klausa `from`** — `ri` boleh diganti **subquery valid apa pun**.
> > - **Klausa `where`** — `P` boleh berbentuk `B <operation> (subquery)`, dengan `B` sebuah atribut.
> > - **Klausa `select`** — `Ai` boleh diganti subquery yang **menghasilkan satu nilai** (scalar subquery).
> >
> > ### Set Membership: `in` / `not in`
> >
> > ```sql
> > -- course yang ditawarkan Fall 2017 DAN Spring 2018
> > select distinct course_id
> > from   section
> > where  semester = 'Fall' and year = 2017 and
> >        course_id in (select course_id
> >                      from   section
> >                      where  semester = 'Spring' and year = 2018);
> >
> > -- course Fall 2017 TAPI TIDAK Spring 2018 → not in
> > ```
> >
> > `in` juga bisa dengan daftar enumerasi: `where name not in ('Mozart', 'Einstein')`. `in` mendukung **tuple**: `where (course_id, sec_id, semester, year) in (select ... from teaches where teaches.ID = 10101)`.
> >
> > ### Set Comparison: `some` dan `all`
> >
> > **`> some`** — benar jika `F` lebih besar dari **paling sedikit satu** nilai subquery:
> >
> > ```sql
> > select name
> > from   instructor
> > where  salary > some (select salary
> >                       from   instructor
> >                       where  dept_name = 'Biology');
> > ```
> >
> > Definisi: $F \;\langle comp \rangle\; \textbf{some}\; r \;\equiv\; \exists\, t \in r \;\text{ sedemikian sehingga } (F \;\langle comp \rangle\; t)$.
> > Contoh: `(5 < some {0,5,6}) = true`; `(5 < some {0,5}) = false`; `(5 = some {0,5}) = true`; `(5 <> some {0,5}) = true`. Perhatikan **`= some` ≡ `in`**, tetapi **`<> some` ≠ `not in`**.
> >
> > **`> all`** — benar jika `F` lebih besar dari **semua** nilai subquery:
> >
> > ```sql
> > select name
> > from   instructor
> > where  salary > all (select salary
> >                      from   instructor
> >                      where  dept_name = 'Biology');
> > ```
> >
> > Definisi: $F \;\langle comp \rangle\; \textbf{all}\; r \;\equiv\; \forall\, t \in r \;(F \;\langle comp \rangle\; t)$.
> > Contoh: `(5 < all {6,10}) = true`; `(5 < all {0,5,6}) = false`; `(5 <> all {4,6}) = true` (≡ `not in`). Perhatikan **`<> all` ≡ `not in`**, tetapi **`= all` ≠ `in`**.
> >
> > ### Test for Empty Relations: `exists` / `not exists`
> >
> > **`exists r`** bernilai `true` jika subquery `r` **tidak kosong**; **`not exists r`** jika `r = ∅`.
> >
> > ```sql
> > select course_id
> > from   section as S
> > where  semester = 'Fall' and year = 2017 and
> >        exists (select *
> >                from   section as T
> >                where  semester = 'Spring' and year = 2018
> >                       and S.course_id = T.course_id);
> > ```
> >
> > - **Correlation name** — variabel `S` di query luar.
> > - **Correlated subquery** — subquery dalam yang **merujuk** variabel query luar (`S.course_id`); dievaluasi ulang untuk tiap baris luar.
> >
> > ### Pola "For All" dengan `not exists`
> >
> > "Cari semua mahasiswa yang telah mengambil **semua** course departemen Biology":
> >
> > ```sql
> > select distinct S.ID, S.name
> > from   student as S
> > where  not exists ( (select course_id
> >                      from   course
> >                      where  dept_name = 'Biology')
> >                     except
> >                     (select T.course_id
> >                      from   takes as T
> >                      where  S.ID = T.ID) );
> > ```
> >
> > Idenya: `(course Biology) except (course yang diambil S)` = himpunan course Biology yang **belum** diambil S. Jika himpunan itu **kosong** (`not exists`), berarti S sudah mengambil semuanya. Catatan: $X - Y = \emptyset \iff X \subseteq Y$. Query ini **tidak bisa** ditulis dengan `= all`.
> >
> > ### Subquery di Klausa `from`
> >
> > ```sql
> > select dept_name, avg_salary
> > from   ( select dept_name, avg(salary) as avg_salary
> >          from   instructor
> >          group by dept_name ) as dept_avg
> > where  avg_salary > 42000;
> > ```
> >
> > Tidak perlu `having` — grup sudah "diratakan" menjadi tabel turunan. Alias tabel turunan (dan nama kolomnya) bisa ditulis `as dept_avg (dept_name, avg_salary)`.
> >
> > ### With Clause
> >
> > **`with`** mendefinisikan **relasi sementara** yang hanya tersedia untuk query tempat `with` itu berada:
> >
> > ```sql
> > with max_budget (value) as
> >      (select max(budget) from department)
> > select department.dept_name
> > from   department, max_budget
> > where  department.budget = max_budget.value;
> > ```
> >
> > Bisa mendefinisikan **beberapa** relasi sementara yang saling bergantung — berguna untuk memecah query kompleks agar terbaca:
> >
> > ```sql
> > with dept_total (dept_name, value) as
> >        (select dept_name, sum(salary) from instructor group by dept_name),
> >      dept_total_avg (value) as
> >        (select avg(value) from dept_total)
> > select dept_name
> > from   dept_total, dept_total_avg
> > where  dept_total.value > dept_total_avg.value;
> > ```
> >
> > ### Scalar Subquery
> >
> > **Scalar subquery** dipakai di tempat yang mengharapkan **satu nilai**:
> >
> > ```sql
> > select dept_name,
> >        ( select count(*)
> >          from   instructor
> >          where  department.dept_name = instructor.dept_name ) as num_instructors
> > from   department;
> > ```
> >
> > **Runtime error jika subquery mengembalikan lebih dari satu tuple.**

> [!cornell] #### Summary
>
> Subquery (`select-from-where` bersarang) bisa masuk **`from`** (sebagai relasi), **`where`** (`B <op> (subquery)`), atau **`select`** (scalar). **`in`/`not in`** menguji keanggotaan (mendukung tuple & daftar enum). **`> some`** = lebih besar dari **minimal satu** ($\exists$), **`> all`** = lebih besar dari **semua** ($\forall$); `= some ≡ in`, `<> all ≡ not in` (bukan sebaliknya). **`exists`/`not exists`** menguji kekosongan subquery; **correlated subquery** merujuk variabel query luar dan dievaluasi per baris. Pola **`not exists ((X) except (Y))`** mengekspresikan "Y mencakup semua X" ($X \subseteq Y$) — cara SQL menyatakan "untuk semua". Subquery di **`from`** meratakan grup tanpa `having`. **`with`** mendefinisikan relasi sementara (boleh berantai) agar query kompleks terbaca. **Scalar subquery** menghasilkan satu nilai — error jika lebih.

> [!ad-libitum]- Additional Information
>
> #### CTE (`with`) dan rekursi
>
> `with` adalah **Common Table Expression (CTE)**. Ditambah kata kunci `recursive`, ia menelusuri struktur hierarkis/graf — mis. semua prasyarat transitif sebuah course, bill-of-materials, jaringan pertemanan: `with recursive prereq_all(course_id, prereq_id) as (select * from prereq union select ...)`.
>
> #### `IN` vs `EXISTS` vs `JOIN` — performa
>
> Secara logis sering setara, tetapi optimizer memperlakukannya berbeda. `EXISTS` bisa berhenti di kecocokan pertama (short-circuit). `IN` dengan subquery ber-`NULL` berbahaya (lihat catatan di [[Set Operations, Null Values, dan Aggregate Functions]]). Untuk sekadar memfilter, `semi join` via `EXISTS`/`IN` sering lebih efisien dari `JOIN` + `distinct` (yang bisa menggandakan baris dulu).
>
> #### Subquery berkorelasi dan biaya O(n·m)
>
> Scalar/correlated subquery yang dievaluasi ulang per baris luar bisa menjadi O(n·m). Optimizer modern kadang menulisnya ulang menjadi join/agregasi, tetapi tidak selalu — periksa `EXPLAIN` dan pertimbangkan menulis ulang sebagai `LEFT JOIN ... GROUP BY` atau CTE.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis "mahasiswa yang mengambil semua course Biology" dengan pola `not exists (except)`. Lalu tulis versi ekuivalen memakai `group by ... having count(distinct course_id) = (select count(*) from course where dept_name = 'Biology')` dan bandingkan `EXPLAIN`-nya.
> 2. Bangun CTE `recursive` untuk mendaftar semua prasyarat langsung maupun tak langsung dari sebuah `course_id`. Uji pada data dengan rantai prasyarat 3 tingkat.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 3.8 (Nested Subqueries), 5.4 (Recursive Queries).
> - Dokumentasi PostgreSQL — "WITH Queries (Common Table Expressions)".
