---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Keys dan Foreign Key pada Model Relasional
>
> > ## Questions/Cues
> >
> > - Apa definisi **superkey**, dan bagaimana ia berbeda dari **candidate key**?
> > - Bagaimana **primary key** dipilih, dan apa itu **alternate key**?
> > - Apa itu **foreign key constraint**? Apa beda *referencing relation* dan *referenced relation*?
> > - Bagaimana notasi FK ditulis (mis. `instructor(dept_name) → department(dept_name)`)?
> > - Apa yang ditampilkan sebuah **schema diagram**?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 1 (Slides 11-13)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 2 (Keys, Schema Diagrams)
>
> > ### Superkey
> >
> > Misalkan $K \subseteq R$ (K adalah sekumpulan atribut dari relasi R).
> >
> > $K$ adalah **superkey** dari $R$ jika **nilai-nilai $K$ cukup untuk mengidentifikasi satu tuple unik** pada setiap relation instance $r(R)$ yang mungkin.
> >
> > Contoh pada `instructor = (ID, name, dept_name, salary)`: `{ID}` adalah superkey, dan `{ID, name}` **juga** superkey (menambah atribut ke superkey tetap menghasilkan superkey). Superkey boleh mengandung atribut "berlebih".
> >
> > ### Candidate Key
> >
> > Sebuah superkey $K$ adalah **candidate key** jika $K$ **minimal** — artinya **tidak ada subset sejati dari $K$ yang masih merupakan superkey**.
> >
> > Contoh: `{ID}` adalah candidate key untuk `instructor` (subset satu-satunya adalah himpunan kosong, yang jelas bukan superkey). `{ID, name}` **bukan** candidate key karena subset `{ID}` sudah superkey.
> >
> > Sebuah relasi bisa punya **beberapa candidate key**. Contoh klasik: tabel `classroom` bisa punya candidate key `{building, room_number}`; tabel karyawan bisa punya `{employee_id}` **dan** `{national_id}` sebagai dua candidate key.
> >
> > ### Primary Key dan Alternate Key
> >
> > **Salah satu candidate key dipilih menjadi primary key** oleh perancang basis data — menjadi identitas "resmi" tuple yang dipakai relasi lain untuk merujuk.
> >
> > *Which one?* Pertimbangan pemilihan: pilih key yang **nilainya jarang/tidak pernah berubah**, **sesederhana mungkin** (sedikit atribut, tipe pendek), dan **tidak pernah null**.
> >
> > **Alternate key** = candidate key yang **tidak dipilih** menjadi primary key. Alternate key tetap perlu dijaga keunikannya — di SQL lewat konstrain `unique` (lihat [[Integrity Constraints dan Referential Integrity]]).
> >
> > ```mermaid
> > flowchart LR
> >     SK["Superkey<br/>cukup mengidentifikasi tuple unik<br/>(boleh ada atribut berlebih)"]
> >     SK -->|"minimal"| CK["Candidate Key<br/>superkey tanpa subset superkey"]
> >     CK -->|"dipilih perancang"| PK["Primary Key<br/>identitas resmi tuple"]
> >     CK -->|"tidak dipilih"| AK["Alternate Key<br/>dijaga via UNIQUE"]
> > ```
> >
> > ### Foreign Key Constraint
> >
> > **Foreign key constraint**: **nilai pada satu relasi harus muncul pada relasi lain**.
> >
> > - **Referencing relation** — relasi yang memuat foreign key (yang "menunjuk").
> > - **Referenced relation** — relasi yang ditunjuk; atribut yang ditunjuk biasanya adalah **primary key** relasi tersebut.
> >
> > Contoh: `dept_name` pada `instructor` adalah **foreign key** dari `instructor` yang **mereferensikan** `department`. Setiap nilai `dept_name` yang muncul di `instructor` **wajib** sudah ada sebagai `dept_name` di `department`. Notasi:
> >
> > $$
> >
> > \text{FK: } instructor(dept\_name) \rightarrow department(dept\_name)
> >
> > $$
> >
> > Konstrain ini disebut juga **referential integrity** — dibahas lebih dalam (termasuk `on delete cascade`) pada [[Integrity Constraints dan Referential Integrity]].
> >
> > ### Schema Diagram
> >
> > Sebuah **database schema** — beserta konstrain **primary key** dan **foreign key** — dapat digambarkan sebagai **schema diagram**:
> >
> > - Setiap **relasi** digambar sebagai kotak, nama relasi di atas, atribut di dalam.
> > - **Primary key** ditandai (mis. digarisbawahi / dipisahkan garis di bagian atas kotak).
> > - **Foreign key** digambar sebagai **panah** dari atribut referencing menuju relasi referenced.
> >
> > ### Contoh: Skema Universitas
> >
> > Potongan skema relasional universitas beserta foreign key-nya:
> >
> > | Relasi | Skema |
> > |---|---|
> > | `department` | `(dept_name, building, budget)` |
> > | `instructor` | `(ID, name, dept_name, salary)` |
> > | `student` | `(ID, name, dept_name, tot_cred)` |
> > | `course` | `(course_id, title, dept_name, credits)` |
> > | `advisor` | `(s_id, i_id)` |
> > | `section` | `(course_id, sec_id, semester, year, building, room_number, time_slot_id)` |
> > | `takes` | `(ID, course_id, sec_id, semester, year, grade)` |
> > | `teaches` | `(ID, course_id, sec_id, semester, year)` |
> > | `prereq` | `(course_id, prereq_id)` |
> >
> > Sebagian foreign key:
> >
> > - `instructor(dept_name) → department(dept_name)`
> > - `student(dept_name) → department(dept_name)`
> > - `advisor(i_id) → instructor(ID)`, `advisor(s_id) → student(ID)`
> > - `section(course_id) → course(course_id)`
> > - `section(building, room_number) → classroom(building, room_number)` — FK **multi-atribut**
> > - `prereq(course_id) → course(course_id)`, `prereq(prereq_id) → course(course_id)` — **dua FK ke relasi yang sama** (relationship rekursif)
> > - `takes(course_id, sec_id, semester, year) → section(course_id, sec_id, semester, year)`

> [!cornell] #### Summary
>
> **Superkey** = himpunan atribut yang cukup mengidentifikasi tuple unik (boleh ada atribut berlebih). **Candidate key** = superkey **minimal** (tak ada subset yang masih superkey); satu relasi bisa punya beberapa. **Primary key** = candidate key yang **dipilih perancang** sebagai identitas resmi — idealnya stabil, sederhana, tak pernah null; candidate key lain menjadi **alternate key** (dijaga via `unique`). **Foreign key constraint** mensyaratkan nilai di **referencing relation** muncul di **referenced relation** (umumnya pada primary key-nya), dinotasikan `R1(atrib) → R2(atrib)` — inti dari **referential integrity**. **Schema diagram** menampilkan relasi, primary key, dan foreign key (panah) dalam satu gambar; skema universitas Silberschatz adalah contoh rujukannya.

> [!ad-libitum]- Additional Information
>
> #### Natural key vs surrogate key
>
> **Natural key** berasal dari data nyata (mis. NIM, ISBN). **Surrogate key** adalah nilai buatan tanpa makna bisnis (mis. kolom `id SERIAL`/`AUTO_INCREMENT`/UUID). Surrogate key populer karena stabil (tak pernah berubah) dan sederhana (satu kolom integer), dengan biaya: butuh join tambahan untuk melihat data bermakna, dan tidak mencegah duplikat "logis" — jadi natural key tetap dijadikan `unique` constraint.
>
> #### Foreign key dan aksi rujukan
>
> Saat FK dilanggar (mis. menghapus `department` yang masih dirujuk `instructor`), default SQL adalah **menolak** aksi. Alternatif: `on delete cascade` (hapus baris yang merujuk), `on delete set null`, `on delete set default`. Ini membuat weak entity (`section`) otomatis terhapus saat identifying entity (`course`) dihapus.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Untuk tabel `takes(ID, course_id, sec_id, semester, year, grade)`, tuliskan primary key-nya dan jelaskan mengapa `grade` tidak masuk PK. Identifikasi semua foreign key.
> 2. Ambil satu tabel dari proyekmu sendiri, daftar **semua** candidate key yang mungkin, lalu argumentasikan pemilihan primary key-nya dengan kriteria stabil/sederhana/non-null.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 2.3 (Keys), 2.5 (Schema Diagrams).
> - Date, C. J. *An Introduction to Database Systems* — pembahasan mendalam candidate key & functional dependency.
