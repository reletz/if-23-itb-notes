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
> > - Apa itu Subquery?
> > - Apa itu Set Membership (`IN`)?
> > - Apa arti perbandingan `> SOME`?
> > - Apa arti perbandingan `> ALL`?
> > - Kapan menggunakan `EXISTS`?
> > - Apa itu _correlated subquery_?
> > - Apa kegunaan subquery di klausa `FROM`?
> > - Apa fungsi `WITH` clause?
> > - Apa itu _Scalar Subquery_?
> 
> > ### Nested Subqueries (Subquery Bersarang)
> > 
> > - **Definisi:** Sebuah **Subquery** (atau _subselect_) adalah sebuah ekspresi `SELECT-FROM-WHERE` lengkap yang disisipkan di dalam query lain. Subquery dievaluasi terlebih dahulu, dan hasilnya (bisa berupa satu nilai, satu kolom, atau sebuah tabel) digunakan oleh query luar untuk menyelesaikan operasinya.
> > 
> > ### Subquery di Klausa `WHERE`
> > 
> > - **Set Membership (`IN`, `NOT IN`):** Memeriksa apakah sebuah nilai atribut ada (atau tidak ada) di dalam himpunan hasil yang dikembalikan oleh subquery.
> >     - **Contoh:** Mencari semua mata kuliah yang ditawarkan pada semester 'Fall 2017' dan juga pada 'Spring 2018'.
> >         
> >         SQL
> >         
> >         ```
> >         SELECT DISTINCT course_id
> >         FROM section
> >         WHERE semester = 'Fall' AND year = 2017 AND
> >               course_id IN (SELECT course_id FROM section WHERE semester = 'Spring' AND year = 2018);
> >         ```
> >         
> > - **Set Comparison (`SOME`/`ANY`, `ALL`):** Membandingkan sebuah nilai dengan setiap nilai dalam himpunan hasil subquery.
> >     - **`SOME` (atau `ANY`):** Kondisi bernilai `TRUE` jika perbandingan benar untuk **setidaknya satu** nilai dari subquery.
> >         - **Contoh:** Mencari instruktur yang gajinya lebih besar dari _setidaknya satu_ instruktur di departemen 'Biology'.
> >             
> >             SQL
> >             
> >             ```
> >             SELECT name FROM instructor
> >             WHERE salary > SOME (SELECT salary FROM instructor WHERE dept_name = 'Biology');
> >             ```
> >             
> >     - **`ALL`:** Kondisi bernilai `TRUE` jika perbandingan benar untuk **semua** nilai dari subquery.
> >         - **Contoh:** Mencari instruktur yang gajinya lebih tinggi dari _semua_ instruktur di departemen 'Biology'.
> >             
> >             SQL
> >             
> >             ```
> >             SELECT name FROM instructor
> >             WHERE salary > ALL (SELECT salary FROM instructor WHERE dept_name = 'Biology');
> >             ```
> >             
> > - **Test for Empty Relations (`EXISTS`, `NOT EXISTS`):** Memeriksa apakah subquery mengembalikan setidaknya satu baris atau tidak. Ini sangat efisien karena berhenti mencari setelah baris pertama ditemukan.
> >     - **`EXISTS`:** `TRUE` jika subquery mengembalikan satu atau lebih baris.
> >     - **_Correlated Subquery_:** Subquery yang bergantung pada nilai dari query luar. Subquery ini dievaluasi ulang untuk setiap baris dari query luar, menjadikannya kuat namun bisa lambat jika tidak digunakan dengan hati-hati. `EXISTS` sering digunakan bersamaan dengan ini.
> >     - **Contoh:** Mencari semua mata kuliah yang ditawarkan pada 'Fall 2017' dan 'Spring 2018' (menggunakan `EXISTS`).
> >         
> >         SQL
> >         
> >         ```
> >         SELECT course_id FROM section AS S
> >         WHERE semester = 'Fall' AND year = 2017 AND
> >               EXISTS (SELECT * FROM section AS T WHERE semester = 'Spring' AND year = 2018 AND S.course_id = T.course_id);
> >         ```
> >         
> > 
> > ### Subquery di Klausa `FROM`
> > 
> > - **Fungsi:** Memungkinkan kita untuk menggunakan hasil dari sebuah query sebagai sebuah tabel virtual atau temporer yang kemudian bisa di-query lagi oleh query luar. Hasil subquery ini wajib diberi nama alias.
> > - **Contoh:** Menemukan departemen yang rata-rata gajinya di atas $42,000.
> >     
> >     SQL
> >     
> >     ```
> >     SELECT dept_name, avg_salary
> >     FROM (SELECT dept_name, AVG(salary) AS avg_salary FROM instructor GROUP BY dept_name) AS dept_avg
> >     WHERE avg_salary > 42000;
> >     ```
> >     
> > 
> > ### `WITH` Clause
> > 
> > - **Fungsi:** Menyediakan cara untuk mendefinisikan sebuah atau beberapa relasi temporer yang diberi nama di awal query. Ini sangat berguna untuk memecah query yang sangat kompleks menjadi bagian-bagian logis yang lebih mudah dibaca, di-debug, dan digunakan kembali dalam query yang sama.
> > - **Contoh:** Menemukan departemen dengan anggaran maksimum.
> >     
> >     SQL
> >     
> >     ```
> >     WITH max_budget (value) AS (
> >       SELECT MAX(budget) FROM department
> >     )
> >     SELECT dept_name
> >     FROM department, max_budget
> >     WHERE department.budget = max_budget.value;
> >     ```
> >     
> > 
> > ### Scalar Subquery
> > 
> > - **Definisi:** Sebuah subquery yang dijamin hanya mengembalikan **satu baris dan satu kolom** (satu nilai tunggal). Dapat digunakan di hampir semua tempat di mana satu nilai tunggal diharapkan, seperti dalam klausa `SELECT` atau di sisi kanan perbandingan `WHERE`.
> > - **Contoh:** Menampilkan nama setiap departemen beserta jumlah instrukturnya.
> >     
> >     SQL
> >     
> >     ```
> >     SELECT dept_name,
> >            (SELECT COUNT(*) FROM instructor WHERE department.dept_name = instructor.dept_name) AS num_instructors
> >     FROM department;
> >     ```
> >     
> > 
> > ### Studi Kasus: Correlated Subquery
> > 
> > Permasalahan:
> > 
> > "Temukan nama dan gaji instruktur yang memiliki gaji lebih besar dari rata-rata gaji semua instruktur di departemen mereka sendiri."
> > 
> > Analisis:
> > 
> > Untuk setiap instruktur, kita perlu membandingkan gajinya dengan rata-rata gaji di departemennya. Ini memerlukan subquery yang "berkorelasi" atau terhubung dengan baris dari query luar.
> > 
> > **Query Solusi:**
> > 
> > SQL
> > 
> > ```
> > SELECT name, salary
> > FROM instructor AS I1
> > WHERE salary > (
> >   SELECT AVG(salary)
> >   FROM instructor AS I2
> >   WHERE I2.dept_name = I1.dept_name
> > );
> > ```
> > 
> > **Penjelasan:**
> > 
> > - Query luar (`FROM instructor AS I1`) memindai setiap baris instruktur.
> > - Untuk setiap instruktur `I1`, subquery dieksekusi. Subquery ini menghitung `AVG(salary)` **hanya** untuk instruktur (`I2`) yang departemennya sama dengan departemen `I1` saat ini (`WHERE I2.dept_name = I1.dept_name`).
> > - Hasil rata-rata ini kemudian dibandingkan dengan gaji instruktur `I1` di query luar.

> [!cornell] #### Summary
> 
> Subquery adalah query yang berada di dalam query lain. Di klausa WHERE, subquery digunakan untuk perbandingan himpunan (IN, SOME, ALL) dan untuk memeriksa keberadaan data (EXISTS). Di klausa FROM, subquery berfungsi sebagai tabel temporer. Untuk query yang sangat kompleks, WITH clause menyediakan cara yang lebih bersih untuk mendefinisikan tabel-tabel temporer ini di awal. Subquery yang terhubung dengan query luarnya disebut correlated subquery, yang sangat kuat untuk perbandingan baris-demi-baris.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### `UNIQUE` dan `NOT UNIQUE`
> 
> Selain `EXISTS`, ada juga predikat `UNIQUE` untuk menguji ketiadaan tuple duplikat dalam hasil subquery.
> 
> - `UNIQUE`: Bernilai `TRUE` jika subquery tidak memiliki baris yang duplikat (atau jika subquery mengembalikan nol atau satu baris).
> - `NOT UNIQUE`: Bernilai `TRUE` jika ada setidaknya satu pasang baris yang duplikat di dalam hasil subquery.
> 
> Predikat ini lebih jarang digunakan dibandingkan `EXISTS` tetapi berguna dalam skenario spesifik, seperti mencari item yang hanya pernah dijual satu kali.