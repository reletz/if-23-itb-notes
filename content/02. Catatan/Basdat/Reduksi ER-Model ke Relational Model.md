---
type: Note
cssclasses:
  - cornell-notes
---
_Back to_ [[Basdat]]

> [!cornell] Topic
> 
> > ## Questions/Cues
> > 
> > - Bagaimana memetakan _Strong Entity Set_?
> > - Bagaimana memetakan _Weak Entity Set_?
> > - Bagaimana memetakan Atribut _Composite_?
> > - Bagaimana memetakan Atribut _Multi-valued_?
> > - Bagaimana memetakan relasi _Many-to-Many_ (N:M)?
> > - Bagaimana cara optimal memetakan relasi _One-to-Many_ (1:N)?
> > - Bagaimana memetakan relasi _Ternary_?
> > - Bagaimana memetakan _Specialization/Generalization_?
> 
> > ### Aturan Pemetaan Entitas dan Atribut
> > 
> > Proses ini mengubah konsep visual dari ERD menjadi struktur tabel yang konkret.
> > 
> > - **_Strong Entity Set_:**
> >     
> >     - **Aturan:** Setiap _strong entity set_ menjadi sebuah **tabel** (relasi) dengan kolom-kolom yang sama persis dengan atribut-atributnya.
> >     - **Contoh:** Entitas `course` dengan atribut `_course_id_`, `title`, `credits` menjadi tabel `course(course_id, title, credits)`.
> > - **_Weak Entity Set_:**
> >     
> >     - **Aturan:** Setiap _weak entity set_ menjadi sebuah **tabel** yang berisi semua atributnya, ditambah dengan **Primary Key dari _identifying entity_** sebagai Foreign Key. Gabungan dari Primary Key _identifying entity_ dan _discriminator_ dari _weak entity_ akan menjadi Primary Key tabel baru ini.
> > - **Atribut _Composite_:**
> >     
> >     - **Aturan:** Atribut _composite_ "diratakan" (_flattened out_) dengan membuat kolom terpisah untuk setiap komponennya.
> >     - **Contoh:** Atribut `name(first_name, last_name)` pada entitas `instructor` akan menjadi dua kolom, `first_name` dan `last_name`, di dalam tabel `instructor`.
> > - **Atribut _Multi-valued_:**
> >     
> >     - **Aturan:** Atribut _multi-valued_ **TIDAK** menjadi kolom di tabel aslinya. Sebaliknya, ia dibuatkan menjadi **tabel baru** yang terpisah.
> >     - Tabel baru ini berisi Primary Key dari entitas asli (sebagai Foreign Key) dan satu kolom untuk atribut _multi-valued_ itu sendiri.
> >     - **Contoh:** Atribut `{phone_number}` pada `instructor` menjadi tabel `inst_phone(ID, phone_number)`.
> > - **Atribut _Derived_:**
> >     
> >     - **Aturan:** Atribut ini **diabaikan** selama pembuatan skema fisik. Nilainya tidak disimpan, melainkan dihitung saat dibutuhkan, biasanya melalui _view_ atau logika aplikasi.
> > 
> > ### Aturan Pemetaan Relationship Sets
> > 
> > - **Relasi _Many-to-Many_ (N:M):**
> >     
> >     - **Aturan:** Setiap relasi N:M menjadi sebuah **tabel baru** (disebut _junction table_).
> >     - Tabel ini minimal berisi Primary Key dari kedua entitas yang berpartisipasi (keduanya sebagai Foreign Key). Atribut deskriptif dari relasi juga menjadi kolom di tabel ini.
> > - **Relasi _One-to-Many_ (1:N):**
> >     
> >     - **Aturan (Optimal):** Tidak perlu membuat tabel baru. Cukup tambahkan sebuah kolom **Foreign Key** pada tabel di sisi **"Many"** yang merujuk ke Primary Key di sisi **"One"**.
> >     - **Contoh:** Relasi `inst_dept` (1:N) antara `department` (sisi "one") dan `instructor` (sisi "many") dipetakan dengan menambahkan kolom `dept_name` (FK) ke dalam tabel `instructor`.
> > - **Relasi _Ternary_ (dan n-ary):**
> >     
> >     - **Aturan:** Sama seperti relasi N:M, setiap relasi _ternary_ menjadi sebuah **tabel baru** yang berisi Primary Key dari semua entitas yang berpartisipasi sebagai Foreign Key.
> > - **_Specialization/Generalization_ (IS A):**
> >     
> >     - **Aturan:** Ada beberapa metode, salah satu yang umum adalah membuat tabel terpisah. Buat satu tabel untuk entitas level tinggi (_superclass_) dan satu tabel untuk setiap entitas level rendah (_subclass_). Tabel _subclass_ berisi atribut lokalnya dan Primary Key dari _superclass_ (yang berfungsi sebagai PK dan FK sekaligus).
> > 
> > ### Studi Kasus: Translasi ERD ke Skema
> > 
> > Permasalahan:
> > 
> > "Diberikan ERD berikut, translasikan ke dalam skema relasional (CREATE TABLE)."
> > 
> > ```
> >   +---------------+ 1                N +-----------------+
> >   |   Department  |<----(works_in)-----|    Employee     |
> >   |---------------|                    |-----------------|
> >   | _dept_id_     |                    | _emp_id_        |
> >   | dept_name     |                    | emp_name        |
> >   +---------------+                    | {skills}        |
> >                                        +-----------------+
> > ```
> > 
> > **Analisis & Solusi:**
> > 
> > 1. Entitas `Department` menjadi tabel `Department`.
> > 2. Entitas `Employee` menjadi tabel `Employee`.
> > 3. Relasi `works_in` adalah 1:N. Maka, kita tambahkan Foreign Key (`dept_id`) ke sisi 'N', yaitu tabel `Employee`.
> > 4. Atribut `skills` adalah _multi-valued_. Maka, kita buat tabel baru `Employee_Skills`.
> > 
> > **Skema Relasional Solusi:**
> > 
> > 
> > ```sql
> > -- Tabel untuk entitas Department
> > CREATE TABLE Department (
> >     dept_id   VARCHAR(10) PRIMARY KEY,
> >     dept_name VARCHAR(50) NOT NULL
> > );
> > 
> > -- Tabel untuk entitas Employee (dengan FK dari relasi 1:N)
> > CREATE TABLE Employee (
> >     emp_id    VARCHAR(10) PRIMARY KEY,
> >     emp_name  VARCHAR(50),
> >     dept_id   VARCHAR(10),
> >     FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
> > );
> > 
> > -- Tabel untuk atribut multi-valued 'skills'
> > CREATE TABLE Employee_Skills (
> >     emp_id    VARCHAR(10),
> >     skill     VARCHAR(50),
> >     PRIMARY KEY (emp_id, skill),
> >     FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
> > );
> > ```

> [!cornell] #### Summary
> 
> Reduksi ER ke Relasional adalah proses sistematis untuk mengubah desain konseptual menjadi tabel fisik. Aturannya jelas: Entitas menjadi tabel, atribut composite diratakan, atribut multi-valued menjadi tabel baru, dan relasi dipetakan secara berbeda tergantung kardinalitasnya. Relasi N:M menjadi tabel baru, sementara relasi 1:N secara efisien dipetakan dengan menambahkan sebuah Foreign Key pada tabel di sisi 'N'.

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Pilihan Lain untuk Relasi 1:1
> 
> Untuk relasi 1:1, ada dua pilihan pemetaan:
> 
> 1. **Pendekatan Foreign Key:** Sama seperti 1:N, Anda bisa memilih salah satu tabel untuk ditambahkan Foreign Key yang merujuk ke tabel lainnya. Pilihlah tabel yang partisipasinya bersifat **total** untuk ditambahkan FK, ini akan menghindari nilai `NULL` pada kolom FK tersebut.
> 2. **Menggabungkan Menjadi Satu Tabel:** Jika partisipasi kedua entitas bersifat total, Anda bisa menggabungkan keduanya menjadi satu tabel tunggal. Namun, pendekatan ini jarang dilakukan karena bisa jadi kedua entitas tersebut memang konsep yang berbeda secara logis.