---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Reduksi Relationship Set, Specialization, dan Aggregation
>
> > ## Questions/Cues
> >
> > - Bagaimana relationship set **many-to-many** direduksi menjadi skema?
> > - Bagaimana relationship **one-to-many / many-to-one** direduksi — dan mengapa cukup menambah kolom, tanpa tabel baru?
> > - Kapan penambahan kolom (bukan tabel terpisah) tepat, terkait **total participation**?
> > - Untuk relationship **one-to-one**, sisi mana yang dijadikan "many"?
> > - Bagaimana **specialization** direpresentasikan menjadi skema?
> > - Bagaimana **aggregation** direpresentasikan menjadi skema?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 1 (Slides 18-22)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 6.7 (Reducing E-R Diagrams to Relational Schemas)
>
> > ### Relationship Set Many-to-Many
> >
> > Relationship set **many-to-many** direpresentasikan sebagai **skema tersendiri** dengan atribut:
> >
> > - **primary key dari kedua entity set** yang berpartisipasi, dan
> > - **semua atribut deskriptif** milik relationship set.
> >
> > Primary key skema ini = **gabungan primary key kedua entity set** yang berpartisipasi (atribut deskriptif tidak masuk PK).
> >
> > Contoh: relationship `advisor` (M:N) antara `student` dan `instructor`, dengan atribut deskriptif `date`:
> >
> > ```
> > advisor = (s_id, i_id, date)
> > FK: advisor(i_id) → instructor(ID)
> > FK: advisor(s_id) → student(ID)
> > ```
> >
> > ### Relationship Set One-to-Many dan Many-to-One
> >
> > Relationship **many-to-one** dan **one-to-many** dapat direpresentasikan **tanpa tabel baru** — cukup **menambahkan atribut ekstra pada sisi "many"** yang berisi **primary key sisi "one"** (atribut ini menjadi foreign key).
> >
> > **Terutama tepat ketika ada total participation pada sisi "many"** — setiap entitas sisi "many" pasti punya pasangan, sehingga kolom FK tidak akan bernilai null.
> >
> > Contoh: relationship `inst_advisor` (setiap `student` punya paling banyak satu `instructor` sebagai advisor) — tambahkan `i_id` ke `student`:
> >
> > ```
> > student = (ID, name, tot_cred, dept_name, i_id)
> > FK: student(i_id) → instructor(ID)
> > FK: student(dept_name) → department(dept_name)
> > ```
> >
> > Skema relationship terpisah (`advisor = (s_id, i_id)`) menjadi **redundan** dan dibuang.
> >
> > ### Relationship Set One-to-One
> >
> > Untuk relationship **one-to-one**, **salah satu sisi bebas dipilih** untuk berperan sebagai sisi "many" (yaitu sisi yang menerima kolom FK tambahan).
> >
> > Pedoman: **pilih entity set dengan total participation (jika ada) sebagai sisi "many"** — karena partial participation akan menghasilkan **nilai null** pada kolom FK.
> >
> > ```
> > -- Alternatif 1: kolom di instructor
> > instructor = (ID, name, salary, s_id)
> > FK: instructor(s_id) → student(ID)
> >
> > -- Alternatif 2: kolom di student
> > student = (ID, name, tot_cred, i_id)
> > FK: student(i_id) → instructor(ID)
> > ```
> >
> > ```mermaid
> > flowchart TB
> >     R["Relationship Set biner"] --> C{"Mapping cardinality?"}
> >     C -->|"Many-to-many"| MM["Skema baru:<br/>PK kedua sisi + atribut deskriptif<br/>PK = gabungan PK kedua sisi"]
> >     C -->|"One-to-many / Many-to-one"| OM["Tambah kolom PK sisi 'one'<br/>ke tabel sisi 'many' (jadi FK)<br/>— ideal bila sisi 'many' total participation"]
> >     C -->|"One-to-one"| OO["Tambah kolom ke salah satu sisi<br/>pilih sisi total participation<br/>agar tidak muncul null"]
> > ```
> >
> > ### Representasi Specialization
> >
> > Untuk **specialization** (entity level-tinggi dengan beberapa subclass level-rendah):
> >
> > - Buat **satu skema untuk entity level-tinggi**.
> > - Buat **satu skema untuk setiap lower-level entity set**, berisi **primary key entity level-tinggi** + **atribut lokal** subclass tersebut.
> >
> > Contoh: `Person` di-specialize menjadi `Employee` dan `Customer`:
> >
> > ```
> > Person   = (ssn, address, type)
> > Employee = (ssn, salary)
> > Customer = (ssn, credit_rating)
> > FK: Employee(ssn) → Person(ssn)
> > FK: Customer(ssn) → Person(ssn)
> > ```
> >
> > Untuk melihat data lengkap seorang employee → join `Person` dengan `Employee` pada `ssn`.
> >
> > ### Representasi Aggregation
> >
> > **Aggregation** memperlakukan sebuah relationship set (beserta entitasnya) sebagai satu entitas abstrak yang bisa ikut relationship lain. Untuk merepresentasikannya, buat skema yang berisi:
> >
> > - **primary key dari relationship yang diagregasi**,
> > - **primary key dari associated entity set**, dan
> > - **semua atribut deskriptif** relationship luar.
> >
> > Contoh: relationship ternary `proj_guide` (instructor–project–student) diagregasi, lalu direlasikan ke `evaluation` lewat `eval_for`:
> >
> > ```
> > proj_guide = (i_id, p_id, s_id)
> > eval_for   = (i_id, p_id, s_id, e_id)
> > FK: eval_for(i_id, p_id, s_id) → proj_guide(i_id, p_id, s_id)
> > FK: eval_for(e_id) → evaluation(e_id)
> > ```
> >
> > Perhatikan `eval_for` mereferensikan **primary key `proj_guide` yang utuh** (gabungan tiga PK), bukan masing-masing entity set langsung.

> [!cornell] #### Summary
>
> **Many-to-many** → **skema baru** berisi PK kedua entity set + atribut deskriptif; PK = **gabungan PK kedua sisi** (mis. `advisor = (s_id, i_id, date)`). **One-to-many / many-to-one** → **tanpa tabel baru**: tambahkan PK sisi "one" sebagai **kolom FK di tabel sisi "many"**, ideal bila sisi "many" **total participation** (menghindari null); skema relationship terpisah dibuang. **One-to-one** → tambahkan kolom ke **salah satu** sisi; pilih sisi **total participation** agar tak ada null. **Specialization** → skema entity level-tinggi + skema per subclass berisi **PK level-tinggi + atribut lokal** (FK ke superclass); data lengkap didapat lewat join. **Aggregation** → skema berisi **PK relationship yang diagregasi + PK associated entity + atribut deskriptif**, dengan FK ke PK relationship agregat yang utuh.

> [!ad-libitum]- Additional Information
>
> #### Tiga strategi mapping specialization
>
> Silberschatz menyajikan strategi "PK di superclass + tabel per subclass". Dua alternatif umum: (a) **satu tabel gabungan** berisi semua atribut superclass + subclass, dengan kolom `type` dan banyak nilai null — sederhana untuk query tetapi longgar dari sisi integritas; (b) **tabel per subclass yang berdiri sendiri** tanpa tabel superclass — hanya cocok bila specialization *disjoint* dan *total*. Pilihan bergantung pada apakah specialization overlapping/disjoint dan total/partial.
>
> #### Junction table / associative entity
>
> Skema hasil reduksi relationship M:N (mis. `takes`, `advisor`) di praktik industri disebut **junction table**, **bridge table**, atau **associative entity**. Ia sering berkembang punya atribut sendiri (mis. `grade` pada `takes`) sehingga akhirnya diperlakukan sebagai entity set penuh.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Untuk ER universitas, reduksi relationship `teaches` (instructor–section, M:N), `inst_dept` (instructor–department, N:1), dan `stud_advisor` (1:1 hipotetis) menjadi skema. Tandai di mana kolom FK bisa bernilai null dan kaitkan dengan participation.
> 2. Modelkan specialization `Account → SavingsAccount, CheckingAccount` dan tuliskan skema dengan strategi Silberschatz, lalu bandingkan jumlah join & jumlah null-nya dengan strategi "satu tabel gabungan".
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 6.7 (Representation of Relationship Sets, Schema for Specialization/Generalization, Aggregation).
> - Elmasri & Navathe. *Fundamentals of Database Systems* — bab "Mapping EER Model Constructs to Relations" (opsi 8A–8D untuk specialization).
