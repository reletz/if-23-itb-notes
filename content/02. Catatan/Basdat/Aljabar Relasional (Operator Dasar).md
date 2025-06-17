---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[IF2240 Basis Data]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Apa itu Aljabar Relasional?
> > - Apa kategori bahasa query?
> > - Diagram skema DB Universitas?
> > - Apa 6 operator dasar Aljabar Relasional?
> > - Bagaimana kerja operator?
> > - Notasi dan definisi `Select`?
> > - Contoh `Select` sederhana?
> > - Contoh `Select` kompleks?
> > - Notasi dan definisi `Project`?
> > - Bagaimana `Project` menghilangkan duplikat?
> > - Contoh `Project` sederhana?
> > - Contoh `Project` dengan duplikat?
> > - Bagaimana komposisi operasi relasional?
> > - Contoh komposisi `Select` dan `Project`?
> > - Notasi dan definisi `Union`?
> > - Persyaratan `Union`?
> > - Contoh `Union` sederhana?
> > - Contoh `Union` query?
> > - Notasi dan definisi `Set Difference`?
> > - Persyaratan `Set Difference`?
> > - Contoh `Set Difference` sederhana?
> > - Contoh `Set Difference` query?
> > - Notasi dan definisi `Cartesian Product`?
> > - Persyaratan `Cartesian Product`?
> > - Contoh `Cartesian Product` sederhana?
> > - Contoh `Cartesian Product` query?
> > - Notasi dan penggunaan `Rename`?
> > - Contoh `Rename`?
> > - Apa itu ekspresi dasar Aljabar Relasional?
> > - Apa itu ekspresi Aljabar Relasional?
> >
> > ## Reference Points
> > - Slide 1-27 dari "4. IF2240---SemII_2425---m02-1b---Relational-Algebra_Basic-Operators..pdf" 
>
> > ### Pengantar Aljabar Relasional
> > - **Aljabar Relasional** adalah **bahasa *query* prosedural**. Ini berarti pengguna menentukan *bagaimana* data akan diambil.
> > - **Kategori Bahasa *Query***:
> >   - **Fungsional/Prosedural**: Relational Algebra (menjawab pertanyaan "HOW?" - bagaimana cara mendapatkan data).
> >   - **Non-prosedural/Deklaratif**: Tuple Relational Calculus, Domain Relational Calculus (menjawab pertanyaan "WHAT?" - data apa yang ingin didapatkan).
> > - Bahasa-bahasa murni ini membentuk dasar mendasar dari bahasa *query* yang digunakan orang.
> > - **Diagram Skema Database Universitas**: Diagram ini digunakan sebagai contoh relasi dan atribut dalam berbagai *query* Aljabar Relasional. Relasi yang ada termasuk `section`, `takes`, `time_slot`, `course`, `student`, `department`, `advisor`, `classroom`, `teaches`, dan `instructor`.
> >
> > ### Enam Operator Dasar Aljabar Relasional
> > Aljabar Relasional memiliki enam operator dasar yang mengambil satu atau dua relasi sebagai input dan menghasilkan relasi baru sebagai hasilnya:
> > 1.  **Select** (notasi: $\sigma$) 
> > 2.  **Project** (notasi: $\Pi$) 
> > 3.  **Union** (notasi: $\cup$) 
> > 4.  **Set Difference** (notasi: $-$) 
> > 5.  **Cartesian Product** (notasi: $\times$) 
> > 6.  **Rename** (notasi: $\rho$) 
> >
> > Selain operator dasar, ada juga **Operator Tambahan** (Intersection, Natural Join, Assignment, Outer Join, Division) dan **Operator yang Diperluas** (Generalized Projection, Aggregation).
> >
> > ### Operator `Select` ($\sigma$)
> > - **Notasi**: $\sigma_p(r)$ 
> >   - `$p$` adalah **predikat seleksi** (kondisi filter).
> >   - `$r$` adalah nama relasi.
> > - **Definisi**: $\sigma_p(r) = \{t \mid t \in r \text{ and } p(t)\}$ 
> >   - Ini adalah himpunan semua *tuple* (`t`) dari relasi `r` di mana predikat `p` benar untuk *tuple* tersebut.
> > - Predikat `p` adalah formula dalam kalkulus proposisional: istilah yang dihubungkan oleh $\wedge$ (AND), $\vee$ (OR), $\neg$ (NOT).
> >   - Istilah (`Term`) = `<attribute> op <attribute>` ATAU `<attribute> op <constant>`.
> > - **Contoh 1**: Mencari semua instruktur dari departemen "PHYSICS" dari relasi `INSTRUCTOR (ID, NAME, DEPT_NAME, SALARY)`.
> >   - `σ DEPT_NAME="PHYSICS" (INSTRUCTOR)` 
> >   - Hasilnya adalah *tuple* instruktur yang `dept_name`-nya adalah "Physics" (misalnya, Einstein dan Gold).
> > - **Contoh 2**: Mencari *tuple* dari `RELATION R(A, B, C, D)` di mana `A=B` DAN `D>5`.
> >   - `σ A=B ∧ D>5 (R)` 
> >
> > ### Operator `Project` ($\Pi$)
> > - **Notasi**: $\Pi_{A1, A2, ..., Ak}(r)$ 
> >   - `$A_1, A_2, ..., A_k$` adalah nama-nama atribut.
> >   - `$r$` adalah nama relasi.
> > - **Definisi**: Relasi yang dihasilkan memiliki `k` kolom yang diperoleh dengan menghapus kolom-kolom yang tidak tercantum dalam daftar atribut.
> > - **Baris duplikat dihapus dari hasil**, karena relasi adalah himpunan (*set*).
> > - **Contoh 1**: Mencari `ID`, `NAME`, `DEPT_NAME` dari relasi `INSTRUCTOR`.
> >   - `Π ID, NAME, DEPT_NAME (INSTRUCTOR)` 
> >   - Hasilnya adalah tabel baru dengan hanya tiga kolom tersebut.
> > - **Contoh 2**: Mencari `A` dan `C` dari `RELATION R(A, B, C)`.
> >   - `Π A,C (R)` 
> >   - Jika ada baris duplikat setelah proyeksi (misalnya, `(α, 1)` muncul dua kali), hanya satu salinannya yang akan dipertahankan dalam hasil akhir.
> >
> > ### Komposisi Operasi Relasional
> > - Hasil dari sebuah operasi aljabar relasional adalah sebuah relasi, sehingga beberapa operasi aljabar relasional dapat **dikomposisikan bersama** menjadi sebuah ekspresi aljabar relasional.
> > - **Contoh Query**: "Temukan nama semua instruktur di departemen Fisika".
> >   - Pertama, pilih instruktur dari departemen Fisika: `σ dept_name="Physics" (instructor)`.
> >   - Kemudian, proyeksikan hanya nama mereka: `Π name (σ dept_name="Physics" (instructor))`.
> >
> > ### Operator `Union` ($\cup$)
> > - **Notasi**: $r \cup s$ 
> > - **Definisi**: $r \cup s = \{t \mid t \in r \text{ or } t \in s\}$ 
> >   - Ini adalah himpunan semua *tuple* yang ada di `r` ATAU di `s`.
> > - **Persyaratan**:
> >   1.  Relasi `r` dan `s` harus memiliki **arity (jumlah kolom/atribut) yang sama**.
> >   2.  **Domain atribut harus kompatibel** (misalnya, kolom pertama di `r` dan `s` harus memiliki tipe data yang serupa).
> > - **Contoh 1**: `RELATION R(A,B)` dan `S(A,B)`.
> >   - `R ∪ S` akan menggabungkan semua baris unik dari R dan S.
> > - **Contoh 2 Query**: "Temukan semua mata kuliah yang diajarkan pada semester Fall 2017, ATAU pada semester Spring 2018, atau pada keduanya".
> >   - `Π course_id (σ semester="Fall" ∧ year=2017 (section)) ∪ Π course_id (σ semester="Spring" ∧ year=2018 (section))` 
> >
> > ### Operator `Set Difference` ($-$ )
> > - **Notasi**: $r - s$ 
> > - **Definisi**: $r - s = \{t \mid t \in r \text{ and } t \notin s\}$ 
> >   - Ini adalah himpunan semua *tuple* yang ada di `r` TAPI TIDAK ada di `s`.
> > - **Persyaratan**: Perbedaan himpunan harus diambil antara **relasi yang kompatibel** (arity dan domain atribut harus sama).
> > - **Contoh 1**: `RELATION R(A,B)` dan `S(A,B)`.
> >   - `R - S` akan menghasilkan baris-baris di R yang tidak ada di S.
> > - **Contoh 2 Query**: "Temukan semua mata kuliah yang diajarkan pada semester Fall 2017, TAPI TIDAK pada semester Spring 2018".
> >   - `Π course_id (σ semester="Fall" ∧ year=2017 (section)) - Π course_id (σ semester="Spring" ∧ year=2018 (section))` 
> >
> > ### Operator `Cartesian Product` ($\times$)
> > - **Notasi**: $r \times s$ 
> > - **Definisi**: $r \times s = \{t q \mid t \in r \text{ and } q \in s\}$ 
> >   - Ini menggabungkan setiap *tuple* dari relasi `r` dengan setiap *tuple* dari relasi `s`. Jika `r` memiliki $N_r$ *tuple* dan `s` memiliki $N_s$ *tuple*, hasilnya akan memiliki $N_r \times N_s$ *tuple*.
> > - **Persyaratan**:
> >   - Atribut dari `r(R)` dan `s(S)` harus **disjoint** (tidak ada nama atribut yang sama).
> >   - Jika atribut dari `r(R)` dan `s(S)` tidak disjoint, maka perlu dilakukan ***renaming* ATAU melampirkan nama relasi sumbernya** (misalnya `instructor.ID`) untuk menghindari ambiguitas.
> > - **Contoh 1**: `RELATION R(A,B)` dan `S(C,D,E)`.
> >   - `R × S` akan menghasilkan relasi baru dengan kolom `A, B, C, D, E`, di mana setiap kombinasi baris dari R dan S muncul.
> > - **Contoh 2 Query**: "Temukan nama semua siswa yang ID penasihatnya adalah 22222".
> >   - `Π name (σ i_ID=22222 (σ ID=s_ID (student × advisor)))` 
> >     - Pertama, lakukan *Cartesian Product* antara `student` dan `advisor`.
> >     - Kemudian, filter hasilnya di mana `ID` siswa sama dengan `s_ID` penasihat (ini berfungsi seperti *join* implisit).
> >     - Selanjutnya, filter di mana `i_ID` penasihat adalah 22222.
> >     - Terakhir, proyeksikan hanya nama siswa.
> >
> > ### Operator `Rename` ($\rho$)
> > - **Penggunaan**:
> >   - Untuk **menamai hasil** dari ekspresi aljabar relasional.
> >   - Untuk **merujuk pada sebuah relasi dengan lebih dari satu nama** (misalnya, saat melakukan *self-join* atau *Cartesian product* dengan dirinya sendiri).
> > - **Notasi (rename relasi)**: $\rho_X(E)$ 
> >   - Mengembalikan hasil ekspresi `E` di bawah nama `X`.
> > - **Notasi (rename atribut)**: $\rho_{X(A1, A2, ..., An)}(E)$ 
> >   - Mengembalikan hasil ekspresi `E` di bawah nama `X`, dan dengan atribut yang diganti namanya menjadi `A1, A2, ..., An`.
> > - **Contoh**: "Temukan ID dan nama instruktur yang gajinya lebih besar dari instruktur dengan ID 12121".
> >   - `Π z.ID, z.name (σ z.salary > w.salary (ρ z (instructor) × (σ ID=12121 (ρ w (instructor)))))` 
> >     - `ρ z (instructor)`: Mengubah nama relasi `instructor` menjadi `z`.
> >     - `ρ w (instructor)`: Mengubah nama relasi `instructor` menjadi `w`.
> >     - Kemudian, lakukan *Cartesian product* dan *selection* untuk membandingkan gaji.
> >
> > ### Definisi Formal Ekspresi Aljabar Relasional
> > - Sebuah **ekspresi dasar** dalam aljabar relasional terdiri dari salah satu dari berikut ini:
> >   - Sebuah relasi dalam *database*.
> >   - Sebuah relasi konstan (yaitu, sebuah tabel nilai yang sudah ditentukan).
> > - Misalkan $E_1$ dan $E_2$ adalah ekspresi aljabar relasional; berikut ini semuanya adalah ekspresi aljabar relasional:
> >   - $E_1 \cup E_2$ 
> >   - $E_1 - E_2$ 
> >   - $E_1 \times E_2$ 
> >   - $\sigma_p(E_1)$, di mana `p` adalah predikat pada atribut di $E_1$.
> >   - $\Pi_S(E_1)$, di mana `S` adalah daftar yang terdiri dari beberapa atribut di $E_1$.
> >   - $\rho_X(E_1)$, di mana `X` adalah nama baru untuk hasil $E_1$.
> >

> [!cornell] #### Summary
> **Aljabar Relasional** adalah **bahasa *query* prosedural** yang fundamental dalam sistem *database*, menggunakan enam operator dasar: **`Select` ($\sigma$)** untuk memfilter baris berdasarkan predikat; **`Project` ($\Pi$)** untuk memilih kolom dan menghilangkan duplikat; **`Union` ($\cup$)** untuk menggabungkan *tuple* unik dari dua relasi yang kompatibel; **`Set Difference` ($-$ )** untuk mengambil *tuple* yang ada di satu relasi tetapi tidak di relasi lain; **`Cartesian Product` ($\times$)** untuk menggabungkan setiap *tuple* dari dua relasi (membutuhkan penanganan atribut yang tumpang tindih); dan **`Rename` ($\rho$)** untuk menamai ulang hasil ekspresi atau relasi. Operator-operator ini dapat **dikomposisikan** untuk membentuk *query* yang lebih kompleks, menghasilkan relasi baru sebagai output di setiap langkah.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Closure Property**: Salah satu sifat penting dari Aljabar Relasional adalah *closure property*, yang berarti hasil dari setiap operasi aljabar relasional selalu merupakan sebuah relasi. Ini memungkinkan komposisi operasi yang kompleks.
> - **Equivalensi Query**: Beberapa *query* dapat diekspresikan dengan cara yang berbeda dalam Aljabar Relasional, tetapi menghasilkan hasil yang sama. Misalnya, *join* dapat diekspresikan menggunakan kombinasi *Cartesian Product*, *Select*, dan *Project*.
> - **Optimasi Query**: Sistem DBMS secara internal mengonversi *query* SQL menjadi ekspresi aljabar relasional dan kemudian mengoptimalkannya untuk eksekusi yang efisien, dengan mempertimbangkan urutan operasi.
> 
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks**: Silberschatz, Korth, Sudarshan: "Database System Concepts", 7th Edition, Bagian 2.6: The Relational Algebra. 
> - **Online Chapters**: Chapter 27: Formal-Relational Query Languages (online chapter) dari buku teks yang sama. 
> 
> #### Eksplorasi Mandiri:
> - **Latihan Query**: Buat *query* Aljabar Relasional untuk skema *database* universitas (yang tersedia di slide 5 ) untuk menjawab pertanyaan-pertanyaan berikut:
>   - Temukan nama semua mahasiswa yang terdaftar di departemen "Comp. Sci.".
>   - Temukan `ID` instruktur yang mengajar mata kuliah dengan `course_id` "CS101".
>   - Temukan `ID` dan nama semua siswa yang total kreditnya lebih dari 100.
> - **Visualisasi**: Coba gunakan alat online atau gambar untuk memvisualisasikan bagaimana setiap operator mengubah relasi input menjadi relasi output.