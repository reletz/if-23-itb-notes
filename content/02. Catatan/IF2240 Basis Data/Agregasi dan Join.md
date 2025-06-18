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
> > - Apa itu Fungsi Agregat?
> > - Apa fungsi klausa `GROUP BY`?
> > - Apa bedanya `WHERE` dan `HAVING`?
> > - Apa itu Operasi Join?
> > - Bagaimana `NATURAL JOIN` bekerja?
> > - Apa itu `INNER JOIN`?
> > - Apa kegunaan `OUTER JOIN`?
> > - Bedanya `LEFT`, `RIGHT`, dan `FULL OUTER JOIN`?
> > - Apa itu klausa `ON` dan `USING`?
> 
> > ### Fungsi Agregat (Aggregate Functions)
> > 
> > - **Definisi:** Fungsi yang beroperasi pada sekumpulan nilai (satu kolom dari beberapa baris) untuk menghasilkan satu nilai ringkasan tunggal.
> > - **Fungsi Umum:**
> >     - `AVG()`: Menghitung nilai rata-rata.
> >     - `MIN()`: Menemukan nilai minimum.
> >     - `MAX()`: Menemukan nilai maksimum.
> >     - `SUM()`: Menghitung jumlah total.
> >     - `COUNT()`: Menghitung jumlah baris/item.
> > - **Variasi `COUNT`:**
> >     - `COUNT(*)`: Menghitung semua baris dalam grup.
> >     - `COUNT(DISTINCT attribute)`: Menghitung jumlah nilai unik pada suatu atribut.
> > - **Contoh:** Menghitung rata-rata gaji semua instruktur.
> >     
> >     SQL
> >     
> >     ```
> >     SELECT AVG(salary) AS rata_rata_gaji
> >     FROM instructor;
> >     ```
> >     
> > 
> > ### Pengelompokan Hasil Agregat
> > 
> > - **Klausa `GROUP BY`:** Digunakan untuk mengelompokkan baris-baris yang memiliki nilai yang sama pada kolom tertentu ke dalam satu grup ringkasan. Fungsi agregat kemudian akan diterapkan pada setiap grup ini, bukan pada keseluruhan tabel.
> >     - **Aturan Penting:** Setiap kolom pada klausa `SELECT` yang bukan merupakan fungsi agregat **harus** tercantum dalam klausa `GROUP BY`.
> >     - **Contoh:** Menghitung rata-rata gaji untuk setiap departemen.
> >         
> >         SQL
> >         
> >         ```
> >         SELECT dept_name, AVG(salary)
> >         FROM instructor
> >         GROUP BY dept_name;
> >         ```
> >         
> > - **Klausa `HAVING`:** Digunakan untuk menyaring **grup** berdasarkan kondisi yang melibatkan fungsi agregat. `HAVING` mirip `WHERE`, tetapi beroperasi pada hasil agregasi.
> >     - **Perbedaan `WHERE` vs `HAVING`:** `WHERE` menyaring _baris individu_ **sebelum** pengelompokan, sedangkan `HAVING` menyaring _grup_ **setelah** pengelompokan dan agregasi.
> >     - **Contoh:** Menampilkan departemen yang rata-rata gajinya di atas $70,000.
> >         
> >         SQL
> >         
> >         ```
> >         SELECT dept_name, AVG(salary)
> >         FROM instructor
> >         GROUP BY dept_name
> >         HAVING AVG(salary) > 70000;
> >         ```
> >         
> > 
> > ### Operasi Join (Joined Relations)
> > 
> > - **Definisi:** Operasi untuk menggabungkan baris dari dua atau lebih tabel berdasarkan kolom yang saling berhubungan. Ini adalah cara modern dan lebih eksplisit untuk menggabungkan tabel.
> > - **`INNER JOIN`:** Bentuk join paling umum. Hanya akan menampilkan baris yang memiliki nilai yang cocok di kedua tabel.
> >     - **Klausa `ON`:** Cara paling eksplisit dan direkomendasikan untuk menentukan kondisi join.
> >     - **Contoh:** `SELECT I.name, T.course_id FROM instructor AS I INNER JOIN teaches AS T ON I.ID = T.ID;`
> > - **`NATURAL JOIN`:** Secara otomatis menggabungkan tabel berdasarkan semua kolom yang memiliki nama dan tipe data yang sama.
> >     - **Bahaya:** Praktik ini bisa berbahaya jika ada kolom dengan nama sama yang tidak dimaksudkan untuk join, karena dapat menyebabkan hasil yang salah secara diam-diam.
> >     - **Contoh:** `SELECT name, title FROM student NATURAL JOIN takes;`
> > 
> > ### `OUTER JOIN`
> > 
> > - **Definisi:** Jenis join yang digunakan untuk memastikan tidak ada data yang hilang dari salah satu atau kedua tabel. Selain menampilkan baris yang cocok, `OUTER JOIN` juga akan menampilkan baris yang tidak memiliki pasangan, dengan mengisi kolom dari tabel pasangannya dengan nilai `NULL`.
> > - **Jenis-jenis Outer Join:**
> >     - **`LEFT OUTER JOIN` (atau `LEFT JOIN`):** Menampilkan **semua** baris dari tabel **kiri**, dan hanya baris yang cocok dari tabel kanan.
> >     - **`RIGHT OUTER JOIN` (atau `RIGHT JOIN`):** Menampilkan **semua** baris dari tabel **kanan**, dan hanya baris yang cocok dari tabel kiri.
> >     - **`FULL OUTER JOIN`:** Menampilkan **semua** baris dari **kedua** tabel, baik yang cocok maupun yang tidak.
> > - **Contoh `LEFT JOIN`:** Menampilkan semua mata kuliah dan prasyaratnya (jika ada). Mata kuliah yang tidak punya prasyarat akan tetap tampil.
> >     
> >     SQL
> >     
> >     ```
> >     SELECT C.course_id, C.title, P.prereq_id
> >     FROM course AS C
> >     LEFT JOIN prereq AS P ON C.course_id = P.course_id;
> >     ```
> >     
> > 
> > ### Studi Kasus: Menggabungkan Agregasi dan Join
> > 
> > Permasalahan:
> > 
> > "Tampilkan nama setiap departemen beserta jumlah instruktur di dalamnya. Hanya tampilkan departemen yang memiliki lebih dari 5 instruktur, lalu urutkan hasilnya berdasarkan jumlah instruktur dari yang terbanyak ke yang paling sedikit."
> > 
> > Analisis:
> > 
> > Kita hanya membutuhkan tabel instructor. Kita perlu mengelompokkan instruktur berdasarkan departemen (GROUP BY), menghitung jumlahnya (COUNT), lalu menyaring grup berdasarkan hasil hitungan tersebut (HAVING), dan terakhir mengurutkannya (ORDER BY).
> > 
> > **Query Solusi:**
> > 
> > SQL
> > 
> > ```
> > SELECT dept_name, COUNT(ID) AS jumlah_instruktur
> > FROM instructor
> > GROUP BY dept_name
> > HAVING COUNT(ID) > 5
> > ORDER BY jumlah_instruktur DESC;
> > ```
> > 
> > **Penjelasan:**
> > 
> > 1. **`FROM instructor`**: Mengambil data dari tabel instruktur.
> > 2. **`GROUP BY dept_name`**: Mengelompokkan semua baris berdasarkan nama departemennya.
> > 3. **`COUNT(ID)`**: Untuk setiap grup departemen, hitung jumlah ID instruktur di dalamnya.
> > 4. **`HAVING COUNT(ID) > 5`**: Setelah dihitung, saring dan hanya pertahankan grup (departemen) yang jumlah instrukturnya lebih dari 5.
> > 5. **`SELECT dept_name, ... AS jumlah_instruktur`**: Pilih nama departemen dan hasil hitungan (diberi nama alias `jumlah_instruktur`) untuk ditampilkan.
> > 6. **`ORDER BY jumlah_instruktur DESC`**: Urutkan hasil akhir berdasarkan kolom `jumlah_instruktur` secara menurun.

> [!cornell] #### Summary
> 
> Fungsi Agregat (seperti AVG, COUNT) digunakan untuk meringkas data menjadi satu nilai. Dengan klausa GROUP BY, fungsi-fungsi ini dapat diterapkan pada setiap grup data, dan hasilnya dapat disaring menggunakan HAVING. Untuk menggabungkan data dari tabel yang berbeda, digunakan operasi JOIN. INNER JOIN hanya menampilkan data yang cocok, sementara OUTER JOIN (LEFT, RIGHT, FULL) digunakan untuk memastikan tidak ada data yang hilang dari salah satu atau kedua tabel.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Urutan Eksekusi Logis dalam Query
> 
> Meskipun kita menulis query dengan urutan `SELECT`, `FROM`, `GROUP BY`, `HAVING`, `ORDER BY`, urutan eksekusi logis (bagaimana DBMS "berpikir") umumnya berbeda. Memahami ini bisa membantu memecahkan masalah pada query yang kompleks:
> 
> 1. **`FROM`** (dan **`JOIN`**): Menentukan dan menggabungkan tabel sumber data.
> 2. **`WHERE`**: Menyaring baris individu.
> 3. **`GROUP BY`**: Mengelompokkan baris yang telah disaring.
> 4. **`HAVING`**: Menyaring grup yang telah dibuat.
> 5. **`SELECT`**: Memilih kolom final dan mengeksekusi ekspresi.
> 6. **`DISTINCT`**: Menghilangkan duplikat.
> 7. **`ORDER BY`**: Mengurutkan hasil akhir.
> 8. **`LIMIT` / `TOP`** (jika ada): Membatasi jumlah baris yang ditampilkan.