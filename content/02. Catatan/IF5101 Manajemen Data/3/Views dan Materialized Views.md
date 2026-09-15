---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Views dan Materialized Views
>
> > ## Questions/Cues
> >
> > - Mengapa tidak semua pengguna sebaiknya melihat seluruh logical model?
> > - Apa definisi **view**, dan bagaimana `create view` bekerja?
> > - Mengapa definisi view **bukan** sama dengan membuat relasi baru dari hasil query?
> > - Apa arti sebuah view **bergantung** (langsung/tak langsung) pada view lain, dan kapan view disebut **rekursif**?
> > - Apa itu **view expansion**, dan mengapa loop-nya berhenti?
> > - Apa itu **materialized view**, dan masalah apa yang muncul saat relasi dasarnya diperbarui?
> >
> > ## Reference Points
> >
> > - IF5101 — Database System Concepts: SQL (Slides 2.96-2.103)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 4.2 (Views)
>
> > ### Motivasi View
> >
> > Kadang **tidak diinginkan semua pengguna melihat seluruh logical model** (yaitu semua relasi nyata yang tersimpan).
> >
> > Contoh: seseorang perlu tahu **nama dan departemen** dosen, **tetapi bukan gajinya**. Orang ini sebaiknya melihat relasi:
> >
> > ```sql
> > select ID, name, dept_name from instructor;
> > ```
> >
> > Sebuah **view menyediakan mekanisme untuk menyembunyikan data tertentu** dari pandangan pengguna tertentu.
> >
> > **Setiap relasi yang bukan bagian dari conceptual model tetapi dibuat terlihat oleh pengguna sebagai "virtual relation" disebut view.**
> >
> > ### View Definition
> >
> > Sebuah view didefinisikan dengan **`create view`**:
> >
> > ```sql
> > create view v as <query expression>;
> > ```
> >
> > dengan `<query expression>` ekspresi SQL legal apa pun, dan `v` nama view. Setelah didefinisikan, **nama view dapat dipakai untuk merujuk virtual relation** yang dihasilkannya.
> >
> > **Penting: definisi view BUKAN sama dengan membuat relasi baru dengan mengevaluasi ekspresi query.** Sebaliknya, definisi view menyebabkan **penyimpanan sebuah ekspresi**; ekspresi itu **disubstitusikan ke dalam query** yang memakai view tersebut.
> >
> > ```sql
> > -- view dosen tanpa gaji
> > create view faculty as
> >     select ID, name, dept_name
> >     from   instructor;
> >
> > -- dipakai seperti relasi biasa
> > select name from faculty where dept_name = 'Biology';
> >
> > -- view dengan agregasi + penamaan kolom eksplisit
> > create view departments_total_salary (dept_name, total_salary) as
> >     select dept_name, sum(salary)
> >     from   instructor
> >     group by dept_name;
> > ```
> >
> > ### View di Atas View
> >
> > Satu view boleh dipakai dalam ekspresi yang mendefinisikan view lain:
> >
> > - View $v_1$ **bergantung langsung** pada $v_2$ jika $v_2$ dipakai dalam ekspresi yang mendefinisikan $v_1$.
> > - View $v_1$ **bergantung** pada $v_2$ jika $v_1$ bergantung langsung pada $v_2$ **atau** ada **rantai dependensi** dari $v_1$ ke $v_2$.
> > - View $v$ disebut **rekursif** jika ia **bergantung pada dirinya sendiri**.
> >
> > ```sql
> > create view physics_fall_2017 as
> >     select course.course_id, sec_id, building, room_number
> >     from   course, section
> >     where  course.course_id = section.course_id
> >            and course.dept_name = 'Physics'
> >            and section.semester = 'Fall'
> >            and section.year = '2017';
> >
> > create view physics_fall_2017_watson as
> >     select course_id, room_number
> >     from   physics_fall_2017          -- view di atas view
> >     where  building = 'Watson';
> > ```
> >
> > ```mermaid
> > flowchart TD
> >     I["instructor / course / section<br/>(relasi dasar)"] --> V1["physics_fall_2017<br/>(view)"]
> >     V1 --> V2["physics_fall_2017_watson<br/>(view di atas view)"]
> >     V2 -->|"view expansion"| EXP["query akhir hanya atas relasi dasar"]
> > ```
> >
> > ### View Expansion
> >
> > **View expansion** adalah cara mendefinisikan makna view yang didefinisikan lewat view lain. Prosedurnya mengulang langkah penggantian:
> >
> > ```
> > repeat
> >     Cari relasi view vi di dalam ekspresi e1
> >     Ganti vi dengan ekspresi yang mendefinisikan vi
> > until tidak ada lagi relasi view di e1
> > ```
> >
> > Contoh: `physics_fall_2017_watson` diekspansi dengan menyubstitusi definisi `physics_fall_2017` ke dalam klausa `from`-nya, menghasilkan query yang **hanya** atas `course` dan `section`.
> >
> > **Selama definisi view tidak rekursif, loop ini pasti berhenti.**
> >
> > ### Materialized View
> >
> > Sebagian sistem basis data mengizinkan relasi view **disimpan secara fisik**:
> >
> > - **Salinan fisik dibuat saat view didefinisikan.**
> > - View semacam ini disebut **materialized view**.
> > - **Masalah:** jika relasi yang dipakai dalam query view **diperbarui**, hasil materialized view menjadi **usang (out of date)**.
> > - Perlu **memelihara (maintain) view** — memperbaruinya setiap kali relasi yang mendasarinya berubah (**view maintenance**).
> >
> > Trade-off: materialized view **mempercepat baca** (hasil sudah dihitung) dengan **biaya penyimpanan** dan **biaya pemeliharaan** saat data dasar berubah.

> [!cornell] #### Summary
>
> **View** = "virtual relation" yang bukan bagian conceptual model tetapi terlihat oleh pengguna — dipakai untuk **menyembunyikan data** (mis. `faculty` menyembunyikan `salary`). **`create view v as <query>`** **menyimpan ekspresinya**, bukan hasilnya; ekspresi itu **disubstitusikan** ke query yang memakai view. Satu view bisa dibangun di atas view lain: $v_1$ **bergantung** pada $v_2$ langsung atau lewat rantai; **rekursif** bila bergantung pada dirinya sendiri. **View expansion** mengganti setiap nama view dengan definisinya berulang-ulang sampai tersisa hanya relasi dasar — **berhenti selama tidak rekursif**. **Materialized view** menyimpan hasil view **secara fisik** (dibuat saat definisi): mempercepat baca, tetapi menjadi **usang** saat relasi dasar berubah sehingga butuh **view maintenance**.

> [!ad-libitum]- Additional Information
>
> #### Updatable views dan `with check option`
>
> `INSERT`/`UPDATE`/`DELETE` lewat view hanya mungkin bila view "sederhana" (satu tabel, tanpa agregasi/`distinct`/`group by`). `create view ... with check option` menolak modifikasi yang membuat baris "keluar" dari view. View kompleks bisa dibuat updatable lewat **`INSTEAD OF` trigger**.
>
> #### Materialized view di praktik
>
> PostgreSQL: `CREATE MATERIALIZED VIEW`, disegarkan manual dengan `REFRESH MATERIALIZED VIEW [CONCURRENTLY]`. Oracle mendukung `REFRESH FAST ON COMMIT` (incremental). Untuk agregasi berat yang sering dibaca dan jarang berubah (dashboard, laporan), materialized view + refresh terjadwal adalah pola standar. Alternatif ringan: tabel ringkasan yang dipelihara trigger.
>
> #### View sebagai lapisan keamanan & abstraksi
>
> Selain menyembunyikan kolom, view membatasi **baris** (mis. `create view my_students as select * from student where advisor_id = current_user_id()`) dan menstabilkan **kontrak API** ke aplikasi meski skema fisik berubah. Row-Level Security (RLS) di PostgreSQL adalah mekanisme yang lebih kuat untuk pembatasan baris.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat `faculty` dan `physics_fall_2017_watson`. Lakukan view expansion secara manual di kertas, lalu bandingkan dengan `EXPLAIN` untuk query atas view — perhatikan bahwa planner memang mensubstitusi definisinya.
> 2. Buat `CREATE MATERIALIZED VIEW dept_headcount AS SELECT dept_name, count(*) FROM instructor GROUP BY dept_name`. `insert` dosen baru, jalankan `SELECT * FROM dept_headcount` (masih usang), lalu `REFRESH` dan bandingkan.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 4.2 (Views), 4.2.3 (Materialized Views), 4.2.4 (Update of a View).
> - Dokumentasi PostgreSQL — "CREATE VIEW", "CREATE MATERIALIZED VIEW", "Rules on INSERT/UPDATE/DELETE".
