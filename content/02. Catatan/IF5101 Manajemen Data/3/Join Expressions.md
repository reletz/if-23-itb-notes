---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Join Expressions
>
> > ## Questions/Cues
> >
> > - Apa itu operasi join, dan bagaimana hubungannya dengan cartesian product?
> > - Apa beda **join condition** dan **join type**?
> > - Bagaimana **natural join** mencocokkan tuple, dan apa bahayanya?
> > - Apa fungsi klausa `using` dan klausa `on`?
> > - Apa itu **inner join** vs **outer join**, dan tiga bentuk outer join?
> > - Bagaimana outer join memakai nilai `null` untuk menghindari kehilangan informasi?
> >
> > ## Reference Points
> >
> > - IF5101 — Database System Concepts: SQL (Slides 2.76-2.94)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 4.1 (Join Expressions)
>
> > ### Apa Itu Join
> >
> > Operasi **join mengambil dua relasi dan mengembalikan sebuah relasi lain**. Sebuah join adalah **cartesian product yang mensyaratkan tuple di kedua relasi cocok** (di bawah suatu kondisi), dan menentukan atribut mana yang hadir di hasil.
> >
> > Join biasanya dipakai sebagai **ekspresi subquery di klausa `from`**.
> >
> > Dua konsep yang perlu dibedakan:
> >
> > | Konsep | Definisi |
> > |---|---|
> > | **Join condition** | Mendefinisikan **tuple mana di dua relasi yang cocok**, dan atribut apa yang muncul di hasil. |
> > | **Join type** | Mendefinisikan **bagaimana tuple yang tidak cocok** dengan tuple mana pun di relasi lain diperlakukan. |
> >
> > Tiga tipe join: **natural join**, **inner join**, **outer join**.
> >
> > ```mermaid
> > flowchart LR
> >     J["JOIN dua relasi"] --> COND["Join condition:<br/>natural | using (A) | on (predikat)"]
> >     J --> TYPE["Join type:<br/>bagaimana baris tak-cocok diperlakukan"]
> >     TYPE --> IN["inner join<br/>buang baris tak-cocok"]
> >     TYPE --> LO["left outer join ⟕<br/>simpan semua baris kiri, isi null di kanan"]
> >     TYPE --> RO["right outer join ⟖<br/>simpan semua baris kanan, isi null di kiri"]
> >     TYPE --> FO["full outer join ⟗<br/>simpan semua baris kedua sisi"]
> > ```
> >
> > ### Natural Join
> >
> > **Natural join mencocokkan tuple yang punya nilai sama pada SEMUA atribut bernama sama**, dan **hanya mempertahankan satu salinan** tiap kolom bersama.
> >
> > ```sql
> > -- nama instructor + course_id yang diajarkannya
> > select name, course_id
> > from   instructor natural join teaches;
> >
> > -- ekuivalen tanpa natural join:
> > select name, course_id
> > from   instructor, teaches
> > where  instructor.ID = teaches.ID;
> > ```
> >
> > Klausa `from` boleh merangkai beberapa relasi: `from r1 natural join r2 natural join ... natural join rn`.
> >
> > ### Bahaya Natural Join
> >
> > **Waspadai atribut tak-berkaitan yang kebetulan bernama sama** — natural join akan menyamakannya secara keliru.
> >
> > "Daftar nama mahasiswa beserta judul course yang telah diambil":
> >
> > ```sql
> > -- SALAH: student, takes, dan course sama-sama punya dept_name
> > select name, title
> > from   student natural join takes natural join course;
> >
> > -- BENAR:
> > select name, title
> > from   student natural join takes, course
> > where  takes.course_id = course.course_id;
> > ```
> >
> > Versi salah **membuang** semua pasangan (nama mahasiswa, judul course) di mana mahasiswa mengambil course dari **departemen selain departemennya sendiri** — karena `student.dept_name` ikut dipaksa sama dengan `course.dept_name`.
> >
> > ### Klausa `using`
> >
> > Untuk menghindari bahaya di atas, **`using`** menetapkan **persis kolom mana yang disamakan**:
> >
> > ```sql
> > select name, title
> > from   (student natural join takes) join course using (course_id);
> > ```
> >
> > ### Klausa `on`
> >
> > Klausa **`on`** mengizinkan **predikat umum** atas relasi yang di-join — ditulis seperti predikat `where` tetapi memakai kata kunci `on`:
> >
> > ```sql
> > select *
> > from   student join takes on student.ID = takes.ID;
> >
> > -- ekuivalen dengan:
> > select *
> > from   student, takes
> > where  student.ID = takes.ID;
> > ```
> >
> > Beda `on` vs `where` baru terasa pada **outer join** — kondisi di `on` menentukan kecocokan (baris tak-cocok tetap dipertahankan dengan null), sedangkan kondisi di `where` menyaring **setelah** join (bisa membuang baris ber-null).
> >
> > ### Outer Join
> >
> > **Outer join** adalah perluasan join yang **menghindari kehilangan informasi**: menghitung join, lalu **menambahkan tuple dari satu relasi yang tidak cocok** dengan tuple di relasi lain, memakai **nilai `null`** untuk kolom yang hilang.
> >
> > Tiga bentuk:
> >
> > | Bentuk | Simbol aljabar relasional | Perilaku |
> > |---|---|---|
> > | **`left outer join`** | ⟕ | Semua baris relasi **kiri** dipertahankan; kolom kanan yang tak cocok → `null`. |
> > | **`right outer join`** | ⟖ | Semua baris relasi **kanan** dipertahankan; kolom kiri yang tak cocok → `null`. |
> > | **`full outer join`** | ⟗ | Semua baris **kedua** relasi dipertahankan. |
> >
> > Contoh: `course` kehilangan info untuk `CS-347`, `prereq` kehilangan info untuk `CS-315`.
> >
> > ```sql
> > course natural left outer join prereq;   -- CS-347 muncul dengan prereq_id = null
> > course natural right outer join prereq;  -- CS-315 muncul dengan title/credits = null
> > course natural full outer join prereq;   -- keduanya muncul
> > ```
> >
> > **Inner join** adalah join biasa (tanpa "outer") — baris yang tidak cocok **dibuang**. `course inner join prereq on course.course_id = prereq.course_id` berbeda dari natural join hanya karena tidak otomatis menyamakan kolom senama dan tidak menggabungkan kolom bersama.

> [!cornell] #### Summary
>
> **Join** = cartesian product + syarat kecocokan; dipakai di klausa `from`. Bedakan **join condition** (tuple mana yang cocok: `natural` / `using (A)` / `on (predikat)`) dari **join type** (nasib baris tak-cocok: inner vs outer). **Natural join** menyamakan **semua** kolom bernama sama dan menyatukan kolom bersama — **berbahaya** bila ada kolom senama tak-berkaitan (mis. `dept_name` di `student`/`takes`/`course`), yang diam-diam membuang baris; **`using (course_id)`** membatasi penyamaan ke kolom tertentu, **`on`** mengizinkan predikat bebas. **Inner join** membuang baris tak-cocok; **outer join** mempertahankannya dengan mengisi **`null`**: **`left`** (semua baris kiri), **`right`** (semua baris kanan), **`full`** (kedua sisi). Pada outer join, kondisi di **`on`** menentukan kecocokan sedangkan di **`where`** menyaring setelah join.

> [!ad-libitum]- Additional Information
>
> #### `LEFT JOIN` + `IS NULL` = anti-join
>
> Pola umum "cari course yang **tidak** punya prasyarat": `course left join prereq using (course_id) where prereq.course_id is null`. `LEFT JOIN` menyertakan semua course, lalu `where ... is null` menyisakan hanya yang tak punya pasangan. Setara dengan `NOT EXISTS`.
>
> #### `on` vs `where` pada outer join — bug halus
>
> `a left join b on a.id = b.id and b.status = 'active'` mempertahankan **semua** baris `a` (status non-aktif → kolom `b` null). Memindah `b.status = 'active'` ke `where` mengubahnya menjadi **inner join** efektif — baris `a` tanpa `b` aktif ikut terbuang. Perbedaan ini sering jadi sumber bug laporan.
>
> #### Algoritma eksekusi join
>
> Optimizer memilih di antara **nested-loop join** (baik untuk relasi kecil / indeks selektif), **hash join** (equi-join relasi besar tanpa urutan), dan **merge join** (kedua input terurut pada kunci join). `EXPLAIN` menampilkan pilihannya; indeks pada kolom join sangat memengaruhi.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Isi `course` dan `prereq` seperti contoh Silberschatz (course kehilangan `CS-347`, prereq kehilangan `CS-315`). Jalankan keempat varian (`inner`, `left`, `right`, `full` outer) dan tabulasikan baris hasilnya.
> 2. Reproduksi bug "natural join tiga tabel" dengan `student`, `takes`, `course` yang punya `dept_name`. Tunjukkan baris yang hilang, lalu perbaiki dengan `using (course_id)`.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 4.1 (Join Expressions), 6.1.3 (Natural Join dalam aljabar relasional).
> - Dokumentasi PostgreSQL — "Joins Between Tables", "Table Expressions".
