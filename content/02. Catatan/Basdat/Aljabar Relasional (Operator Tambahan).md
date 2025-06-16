---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[Basdat]]
> [!cornell] Topic
> > ## Questions/Cues
> > - Mengapa ada operator tambahan?
> > - Notasi dan definisi `Intersection`?
> > - Persyaratan `Intersection`?
> > - Contoh `Intersection` sederhana?
> > - Bagaimana `Intersection` dinyatakan dengan operator dasar?
> > - Notasi dan definisi `Natural Join`?
> > - Bagaimana *tuple* digabungkan di `Natural Join`?
> > - Contoh `Natural Join` sederhana?
> > - Bagaimana `Natural Join` dinyatakan dengan operator dasar?
> > - Sifat asosiatif dan komutatif `Natural Join`?
> > - Apa itu `Theta Join`?
> > - Notasi dan penggunaan `Assignment`?
> > - Contoh `Assignment`?
> > - Notasi `Outer Join`?
> > - Definisi `Outer Join`?
> > - Apa itu *null values*?
> > - Hasil operasi aritmatika dengan *null*?
> > - Perilaku *aggregate functions* dengan *null*?
> > - Perilaku eliminasi duplikat dan *grouping* dengan *null*?
> > - Hasil perbandingan dengan *null*?
> > - Logika tiga nilai (*Three-valued logic*)?
> > - Apa itu *Multiset Relational Algebra*?
> > - Bagaimana `Selection` di *Multiset Algebra*?
> > - Bagaimana `Projection` di *Multiset Algebra*?
> > - Bagaimana `Cross Product` di *Multiset Algebra*?
> > - Bagaimana `Union`, `Intersection`, `Difference` di *Multiset Algebra*?
> > - Notasi dan definisi `Division`?
> > - Contoh `Division` query?
> > - Contoh `Division` sederhana?
> > - Bagaimana `Division` dinyatakan dengan operator dasar?
> > - Notasi `Deletion`?
> > - Contoh `Deletion` sederhana?
> > - Contoh `Deletion` kompleks?
> > - Notasi `Insertion`?
> > - Tipe `Insertion`?
> > - Contoh `Insertion` *tuple* spesifik?
> > - Contoh `Insertion` dari hasil *query*?
> > - Notasi `Updating`?
> > - Bagaimana `Updating` menggunakan `Generalized Projection`?
> > - Contoh `Update` sederhana?
> > - Contoh `Update` bersyarat?
> > - Contoh `Update` dengan beberapa kondisi?
> >
> > ## Reference Points
> > - Slide 1-19 dari "5. IF2240---SemII_2425---m02-2---Relational-Algebra_Additional-Operators..pdf" 
> > - Slide 1-16 dari "6. IF2240-SemII2425-m03-1-Relational-AlgebraExtendedModification.pdf" 
> > - Slide 3-5 dari "7. IF2240-SemII2425-m03-2-Relational-Calculus.pdf" 
>
> > ### Operator Tambahan Aljabar Relasional
> > Kami mendefinisikan operasi tambahan yang tidak menambahkan kekuatan apapun pada aljabar relasional, tetapi **menyederhanakan *query* umum**.
> > 1.  **Set Intersection** 
> > 2.  **Natural Join** 
> > 3.  **Assignment** 
> > 4.  **Outer Join** 
> > 5.  **Division** 
> >
> > ### Operator `Set Intersection` ($\cap$)
> > - **Notasi**: $r \cap s$ 
> > - **Definisi**: $r \cap s = \{t \mid t \in r \text{ and } t \in s\}$ 
> >   - Ini adalah himpunan semua *tuple* yang ada di `r` DAN di `s`.
> > - **Persyaratan**: Irisan himpunan harus diambil antara **relasi yang kompatibel**.
> > - **Contoh 1**: `RELATION R(A,B)` dan `S(A,B)`. Hasil `R ∩ S` adalah *tuple* yang sama persis di kedua relasi.
> > - **Ekspresi dengan Operator Dasar**: `r ∩ s` dapat dinyatakan menggunakan operator dasar sebagai: `r - (r - s)`.
> >
> > ### Operator `Natural Join` ($\bowtie$)
> > - **Notasi**: $r \bowtie s$ 
> > - **Definisi**: Misalkan `r` dan `s` adalah relasi pada skema `R` dan `S` masing-masing. Maka, `r ⋈ s` adalah relasi pada skema $R \cup S$ (gabungan semua atribut dari `R` dan `S`).
> >   - Jika `t_r` dan `t_s` memiliki nilai yang sama pada setiap atribut di $R \cap S$ (atribut umum/bersama), tambahkan *tuple* hasil (konkatenasi dari `t_r` dan `t_s`) ke hasilnya.
> > - **Contoh 1**: `RELATION R(A,B,C,D)` dan `S(B,D,E)`. Atribut umum adalah `B` dan `D`. Hasil `R ⋈ S` akan menggabungkan baris dari `R` dan `S` di mana nilai `B` dan `D` cocok.
> > - **Ekspresi dengan Operator Dasar**: `r ⋈ s` dapat ditulis sebagai `Π r.A, r.B, r.C, r.D, s.E (σ r.B=s.B ∧ r.D=s.D (r × s))`.
> > - **Sifat `Natural Join`**:
> >   - **Asosiatif**: `(instructor ⋈ teaches) ⋈ course` setara dengan `instructor ⋈ (teaches ⋈ course)`.
> >   - **Komutatif**: `instructor ⋈ teaches` setara dengan `teaches ⋈ instructor`.
> > - **`Theta Join` ($\bowtie_{\theta}$)**: Operasi `theta join` didefinisikan sebagai `r ⋈_θ s = σ_θ (r × s)`. Ini adalah *Cartesian product* yang diikuti oleh *select* dengan predikat `θ`.
> >
> > ### Operator `Assignment` ($\leftarrow$)
> > - **Notasi**: $(\leftarrow)$ 
> > - **Penggunaan**: Menyediakan cara mudah untuk mengekspresikan *query* kompleks.
> >   - Menulis *query* sebagai program sekuensial yang terdiri dari serangkaian penugasan.
> >   - Diikuti oleh ekspresi yang nilainya ditampilkan sebagai hasil *query*.
> > - Penugasan harus selalu dilakukan ke variabel relasi sementara.
> > - **Contoh**: "Temukan semua instruktur di departemen 'Physics' dan 'Music'".
> >   ```
> >   Physics ← σ dept_name="Physics" (instructor) 
> >   Music ← σ dept_name="Music" (instructor) 
> >   Physics ∪ Music 
> >   ```
> >
> > ### Operator `Outer Join` ($\stackrel{\bowtie}{\ell}, \stackrel{\bowtie}{r}, \stackrel{\bowtie}{f}$)
> > - **Notasi**:
> >   - `Left outer join`: $\stackrel{\bowtie}{\ell}$ 
> >   - `Right outer join`: $\stackrel{\bowtie}{r}$ 
> >   - `Full outer join`: $\stackrel{\bowtie}{f}$ 
> > - **Definisi**: Menghitung *join* dan kemudian **menambahkan *tuple* dari satu relasi yang tidak cocok dengan *tuple* di relasi lain ke hasil *join***.
> >   - **Menggunakan nilai `null`**: `null` menandakan bahwa nilai tidak diketahui atau tidak ada. Semua perbandingan yang melibatkan `null` secara kasar (menurut definisi) adalah `false`.
> > - **Ekspresi dengan Operator Dasar**: Contoh `outer join` (`r ⟕ s`) dapat dinyatakan menggunakan operasi dasar sebagai: `(r ⋈ s) ∪ ((r - Π_R(r ⋈ s)) × {(null, ..., null)})`.
> >
> > ### Null Values
> > - Dimungkinkan bagi *tuple* untuk memiliki nilai **`null`** untuk beberapa atributnya.
> > - `null` menandakan **nilai yang tidak diketahui** atau bahwa **nilai tidak ada**.
> > - Hasil dari ekspresi aritmatika apa pun yang melibatkan `null` adalah `null`.
> > - **Fungsi agregat** (seperti `SUM`, `AVG`, `COUNT`) **mengabaikan nilai `null`** (seperti di SQL).
> > - Untuk eliminasi duplikat dan pengelompokan, `null` diperlakukan seperti nilai lainnya, dan **dua `null` diasumsikan sama** (seperti di SQL).
> > - **Perbandingan dengan `null`** mengembalikan nilai kebenaran khusus: **`unknown`**.
> >   - Jika `false` digunakan alih-alih `unknown`, maka `NOT (A < 5)` tidak akan setara dengan `A >= 5`.
> > - **Logika Tiga Nilai (`Three-valued logic`)** menggunakan nilai kebenaran `unknown`:
> >   - `OR`: `(unknown or true) = true`, `(unknown or false) = unknown`, `(unknown or unknown) = unknown`.
> >   - `AND`: `(true and unknown) = unknown`, `(false and unknown) = false`, `(unknown and unknown) = unknown`.
> >   - `NOT`: `(not unknown) = unknown`.
> >   - Di SQL, "`P is unknown`" dievaluasi menjadi `true` jika predikat `P` dievaluasi menjadi `unknown`. Hasil dari predikat `select` diperlakukan sebagai `false` jika dievaluasi menjadi `unknown`.
> >
> > ### Multiset Relational Algebra
> > - **Aljabar relasional murni** menghilangkan semua duplikat (misalnya, setelah proyeksi).
> > - **Aljabar relasional multiset** **mempertahankan duplikat**, untuk mencocokkan semantik SQL.
> >   - Retensi duplikat di SQL awalnya untuk efisiensi, tetapi sekarang menjadi fitur.
> > - **Definisi Aljabar Relasional Multiset**:
> >   - **`Selection`**: Memiliki sebanyak mungkin duplikat dari *tuple* seperti pada input, jika *tuple* memenuhi seleksi.
> >   - **`Projection`**: Satu *tuple* per *tuple* input, bahkan jika itu adalah duplikat.
> >   - **`Cross Product`**: Jika ada `m` salinan `t1` di `r`, dan `n` salinan `t2` di `s`, maka ada $m \times n$ salinan `t1.t2` di `r × s`.
> >   - **Operator lain didefinisikan serupa**:
> >     - **`Union`**: `m + n` salinan.
> >     - **`Intersection`**: `min(m, n)` salinan.
> >     - **`Difference`**: `max(0, m - n)` salinan.
> >
> > ### Operator `Division` ($\div$)
> > - **Notasi**: $r \div s$ 
> > - **Definisi**: Diberikan relasi `r(R)` dan `s(S)`, sedemikian rupa sehingga `S ⊆ R`, `r ÷ s` adalah relasi terbesar `t(R-S)` sedemikian rupa sehingga `t × s ⊆ r`.
> >   - `R-S` adalah atribut di `R` yang tidak ada di `S`.
> > - **Contoh Query**: "Mahasiswa yang telah mengambil semua mata kuliah di departemen Biologi."
> >   - Misalkan `r(ID, course_id) = Π ID, course_id (takes)` dan `s(course_id) = Π course_id (σ dept_name="Biology" (course))`.
> >   - Maka `r ÷ s` adalah mahasiswa yang telah mengambil semua mata kuliah di Departemen Biologi.
> > - **Contoh 1**: `RELATION r(A,B)` dan `s(B)`. Hasil `r ÷ s` adalah nilai `A` yang berpasangan dengan SEMUA nilai `B` yang ada di `s`.
> > - **Ekspresi dengan Operator Dasar**: `r ÷ s` dapat dinyatakan sebagai:
> >   ```
> >   temp1 ← Π R-S (r) 
> >   temp2 ← Π R-S ((temp1 × s) - Π R-S, S (r)) 
> >   temp1 - temp2 
> >   ```
> >
> > ### Modifikasi Data (Data Modifications)
> > Aljabar relasional juga dapat digunakan untuk memodifikasi data.
> >
> > #### Deletion (Penghapusan)
> > - **Notasi**: `r ← r - E` 
> >   - Menghapus *tuple* yang dihasilkan oleh ekspresi `E` dari relasi `r`.
> > - **Contoh 1**: "Hapus semua prasyarat (`prereq`) dari mata kuliah 'IF2240'".
> >   - `prereq ← prereq - σ course_id="IF2240" (prereq)` 
> > - **Contoh 2 (lebih kompleks)**: "Hapus rencana studi mahasiswa dengan ID '13518000' untuk semester 1-2019."
> >   ```
> >   takes ← takes - σ ID="13518000" ∧ semester=1 ∧ year=2019 (takes) 
> >   ```
> >   "Hapus semua seksi yang diajarkan oleh instruktur dengan ID '132132132' untuk semester 2-2019."
> >   ```
> >   r1 ← σ ID="132132132" ∧ semester=2 ∧ year=2019 (teaches) 
> >   r2 ← Π course_id, sec_id, semester, year (r1) ∩ takes 
> >   r3 ← Π course_id, sec_id, semester, year (r1) ∩ section 
> >   teaches ← teaches - r1 
> >   takes ← takes - r2 
> >   section ← section - r3 
> >   ```
> >   Ini menunjukkan penghapusan yang kompleks melibatkan beberapa relasi dan *intermediate results*.
> >
> > #### Insertion (Penyisipan)
> > - **Notasi**: `r ← r ∪ E` 
> >   - Menambahkan *tuple* yang dihasilkan oleh ekspresi `E` ke relasi `r`.
> > - **Tipe Penyisipan**:
> >   1.  Menentukan *tuple* yang akan disisipkan.
> >   2.  Menulis *query* yang hasilnya adalah sekumpulan *tuple* yang akan disisipkan.
> > - **Contoh 1 (menyisipkan *tuple* spesifik)**: "Sisipkan informasi di *database* bahwa seorang mahasiswa pindahan, Abdul, dengan ID 13518600 terdaftar di departemen Comp. Sci. dengan 36 total kredit transfer dan instruktur 132132132 sebagai penasihatnya."
> >   ```
> >   student ← student ∪ {(13518600, "Abdul", "Comp. Sci.", 36)} 
> >   advisor ← advisor ∪ {(13518600, 132132132)} 
> >   ```
> > - **Contoh 2 (menyisipkan dari hasil *query*)**: "Semua mahasiswa dari departemen Comp. Sci. dengan total kredit kurang dari 130 secara otomatis terdaftar di mata kuliah IF4000 pada semester 2-2019 (didistribusikan secara merata ke 3 ID seksi yang tersedia: 1, 2, 3)."
> >   ```
> >   r1 ← σ dept_name="Comp.Sci." ∧ tot_cred<130 (student) 
> >   takes ← takes ∪ Π ID, "IF4000", ((ID-1) mod 3)+1, 2, 2019, null (r1) 
> >   ```
> >
> > #### Updating (Pembaruan)
> > - Menggunakan operator **`Generalized Projection` ($\Pi_{F1, F2, ..., Fn}(E)$)** untuk melakukan tugas ini.
> > - **Notasi**: `r ← Π F1, F2, ..., Fn (r)` 
> >   - Setiap $F_j$ adalah:
> >     - Atribut ke-$i$ dari `r`, jika atribut ke-$j$ tidak diperbarui.
> >     - Jika atribut akan diperbarui, $F_i$ adalah ekspresi yang hanya melibatkan konstanta dan atribut dari `r`, yang memberikan nilai baru untuk atribut tersebut.
> > - **Contoh 1 (pembaruan sederhana)**: "Berikan kenaikan gaji 5% kepada semua instruktur."
> >   - `instructor ← Π ID, name, dept_name, salary * 1.05 (instructor)` 
> > - **Contoh 2 (pembaruan bersyarat)**: "Berikan kenaikan gaji 5% kepada instruktur yang gajinya kurang dari 70000."
> >   - `instructor ← Π ID, name, dept_name, salary * 1.05 (σ salary<70000 (instructor)) ∪ σ salary>=70000 (instructor)` 
> >   - Ini menggabungkan hasil pembaruan untuk yang memenuhi syarat dengan yang tidak diubah.
> > - **Contoh 3 (pembaruan dengan beberapa kondisi)**: "Tingkatkan gaji instruktur yang gajinya di atas $70,000 sebesar 3%, dan semua yang lain menerima kenaikan 5%."
> >   ```
> >   instructor ← Π ID, name, dept_name, salary * 1.05 (σ salary<=70000 (instructor)) 
> >                ∪ Π ID, name, dept_name, salary * 1.03 (σ salary>70000 (instructor)) 
> >   ```
> >

> [!cornell] #### Summary
> Selain enam operator dasar, Aljabar Relasional memiliki **operator tambahan** seperti `Intersection`, `Natural Join`, `Assignment`, `Outer Join`, dan `Division` untuk menyederhanakan *query* kompleks, yang semuanya dapat diekspresikan menggunakan operator dasar. Konsep **`null values`** (`unknown` atau tidak ada) memengaruhi operasi aritmatika, perbandingan (menghasilkan `unknown`), dan agregasi, serta diperlakukan sama dalam eliminasi duplikat. **`Multiset Relational Algebra`** mempertahankan duplikat, berbeda dari aljabar relasional murni. Aljabar relasional juga mendukung **modifikasi data** melalui operasi **`Deletion`** (mengurangi *tuple*), **`Insertion`** (menambah *tuple* baik spesifik maupun dari hasil *query*), dan **`Updating`** (memperbarui nilai atribut menggunakan `Generalized Projection`), memungkinkan manipulasi data yang komprehensif.

> [!ad-libitum]- Additional Information (Optional)
> #### Aspek Teknis Lanjutan:
> - **Implementasi `Outer Join`**: Dalam praktik SQL, `OUTER JOIN` adalah fitur yang sangat sering digunakan karena kebutuhan untuk melihat semua data dari satu tabel bahkan jika tidak ada kecocokan di tabel lain. Pemahaman bagaimana ini dapat disimulasikan dengan operator dasar menunjukkan fondasi teoretisnya.
> - **Normalisasi dan Operasi**: Operasi seperti `Natural Join` sangat bergantung pada skema *database* yang ter-normalisasi dengan baik, di mana kunci asing dan primer memiliki nama dan domain yang konsisten.
> - **Atomicity dalam Modifikasi Data**: Meskipun aljabar relasional tidak secara eksplisit membahas transaksi, dalam implementasi nyata (DBMS), operasi modifikasi data ini biasanya merupakan bagian dari transaksi atomik.
> - **Generalized Projection dalam SQL**: Di SQL, konsep *Generalized Projection* dapat dianalogikan dengan penggunaan ekspresi dalam klausa `SELECT` untuk menghitung nilai baru atau memodifikasi tampilan kolom.
>
> #### Sumber & Referensi Lanjutan:
> - **Buku Teks**: Silberschatz, Korth, Sudarshan: "Database System Concepts", 7th Edition, Bagian 2.6 (untuk operator) dan Bab 3 (untuk modifikasi data).
> - **Tutorial Online**: Cari tutorial tentang "SQL NULL handling" dan "SQL Outer Joins" untuk melihat implementasi praktis konsep-konsep ini.
>
> #### Eksplorasi Mandiri:
> - **Tulis Query Modifikasi**: Dengan menggunakan skema *database* universitas, buatlah ekspresi aljabar relasional untuk:
>   - Menghapus semua mahasiswa yang memiliki total kredit kurang dari 50.
>   - Menyisipkan mata kuliah baru dengan `course_id`, `title`, `dept_name`, dan `credits` yang Anda tentukan.
>   - Memberikan bonus 1000 kepada semua instruktur di departemen "Finance" yang gajinya di bawah $85000.
>   - **Eksperimen dengan Null**: Dalam *database* SQL, coba masukkan nilai *null* dan jalankan *query* dengan `IS NULL`, `IS NOT NULL`, dan perbandingan aritmatika untuk memahami perilakunya secara langsung.