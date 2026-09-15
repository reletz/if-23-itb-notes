---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Integrity Constraints dan Referential Integrity
>
> > ## Questions/Cues
> >
> > - Apa tujuan **integrity constraints**, dan apa contoh konkretnya?
> > - Apa empat konstrain pada **satu relasi** (`not null`, `primary key`, `unique`, `check`)?
> > - Apa beda `unique` dan `primary key` terkait nilai `null`?
> > - Apa itu **referential integrity**, dan bagaimana **foreign key** dideklarasikan?
> > - Apa yang terjadi saat konstrain referential dilanggar — dan apa alternatif **cascade**?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 2 (Slides 12-13)
> > - IF5101 — Database System Concepts: SQL (Slides 2.9, 2.14-2.21)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 4.4 (Integrity Constraints)
>
> > ### Tujuan Integrity Constraints
> >
> > **Integrity constraints menjaga basis data dari kerusakan tak sengaja** — memastikan bahwa perubahan terotorisasi **tidak menyebabkan hilangnya konsistensi data**.
> >
> > Contoh aturan bisnis yang diwujudkan sebagai konstrain:
> >
> > - Rekening giro harus punya saldo lebih dari $10.000,00.
> > - Gaji pegawai bank minimal $4,00 per jam.
> > - Seorang customer harus punya nomor telepon (non-null).
> >
> > **SQL mencegah setiap update yang melanggar sebuah integrity constraint.**
> >
> > ### Konstrain pada Satu Relasi
> >
> > Konstrain yang dapat dideklarasikan di dalam statement `create table`:
> >
> > | Konstrain | Makna |
> > |---|---|
> > | **`not null`** | Menyatakan atribut **wajib diisi** (tidak boleh `null`). Contoh: `name varchar(20) not null`. |
> > | **`primary key (A1, ..., An)`** | Atribut-atribut ini membentuk primary key: **unik** dan **otomatis `not null`**. |
> > | **`unique (A1, ..., Am)`** | Atribut-atribut ini membentuk **candidate key (alternate key)**. **Berbeda dari primary key: nilai `null` diperbolehkan.** |
> > | **`check (P)`** | Menetapkan **predikat `P` yang harus dipenuhi setiap tuple** dalam relasi. |
> >
> > Contoh `check`: memastikan `semester` bernilai salah satu dari empat musim:
> >
> > ```sql
> > create table section (
> >     course_id     varchar(8),
> >     sec_id        varchar(8),
> >     semester      varchar(6),
> >     year          numeric(4,0),
> >     building      varchar(15),
> >     room_number   varchar(7),
> >     time_slot_id  varchar(4),
> >     primary key (course_id, sec_id, semester, year),
> >     check (semester in ('Fall', 'Winter', 'Spring', 'Summer')),
> >     foreign key (course_id) references course,
> >     foreign key (building, room_number) references classroom (building, room_number)
> > );
> > ```
> >
> > **Catatan default:** jika tidak dideklarasikan, **semua atribut boleh `null`**, kecuali atribut yang menjadi bagian **primary key**.
> >
> > ### Referential Integrity
> >
> > **Referential integrity** memastikan bahwa **nilai yang muncul pada satu relasi untuk sekumpulan atribut, juga muncul pada sekumpulan atribut di relasi lain**.
> >
> > Contoh: jika `"Biology"` muncul sebagai `dept_name` pada suatu tuple `instructor`, maka **harus ada tuple `department` untuk `"Biology"`**.
> >
> > Definisi formal: misalkan $A$ sekumpulan atribut, $R$ dan $S$ dua relasi yang memuat $A$, dan $A$ adalah **primary key $S$**. $A$ disebut **foreign key dari $R$** jika **untuk setiap nilai $A$ yang muncul di $R$, nilai itu juga muncul di $S$**.
> >
> > ### Deklarasi Foreign Key
> >
> > Foreign key dispesifikasikan sebagai bagian dari `create table`:
> >
> > ```sql
> > foreign key (dept_name) references department
> > ```
> >
> > - **Secara default, foreign key mereferensikan atribut primary key** dari tabel yang ditunjuk.
> > - SQL mengizinkan **daftar atribut relasi yang ditunjuk dispesifikasikan secara eksplisit**:
> >
> > ```sql
> > foreign key (dept_name) references department (dept_name)
> > ```
> >
> > Contoh lengkap `create table` dengan konstrain integritas:
> >
> > ```sql
> > create table instructor (
> >     ID         char(5),
> >     name       varchar(20) not null,
> >     dept_name  varchar(20),
> >     salary     numeric(8,2),
> >     primary key (ID),
> >     foreign key (dept_name) references department
> > );
> > ```
> >
> > ### Cascading Actions
> >
> > Saat konstrain referential-integrity **dilanggar**, prosedur normalnya adalah **menolak aksi** yang menyebabkan pelanggaran.
> >
> > Alternatif — untuk kasus `delete` atau `update` — adalah **cascade**:
> >
> > ```sql
> > create table course (
> >     ...
> >     dept_name varchar(20),
> >     foreign key (dept_name) references department
> >         on delete cascade
> >         on update cascade,
> >     ...
> > );
> > ```
> >
> > Dengan `on delete cascade`, menghapus tuple `department` **otomatis menghapus** semua tuple `course` yang merujuknya. Selain `cascade`, dapat dipakai:
> >
> > - **`set null`** — nilai foreign key di baris yang merujuk di-set `null`.
> > - **`set default`** — nilai foreign key di-set ke nilai default kolom.
> >
> > ```mermaid
> > flowchart TB
> >     D["DELETE / UPDATE pada baris di referenced relation<br/>yang masih dirujuk foreign key"]
> >     D --> Q{"Aksi rujukan pada FK?"}
> >     Q -->|"(default)"| REJ["Tolak aksi (error)"]
> >     Q -->|"on delete/update cascade"| CAS["Hapus/ubah juga baris yang merujuk"]
> >     Q -->|"set null"| SN["Set kolom FK di baris perujuk = null"]
> >     Q -->|"set default"| SD["Set kolom FK di baris perujuk = nilai default"]
> > ```

> [!cornell] #### Summary
>
> **Integrity constraints** mencegah update terotorisasi merusak konsistensi data; SQL menolak setiap update yang melanggarnya. Konstrain satu relasi: **`not null`** (wajib isi), **`primary key`** (unik + otomatis `not null`), **`unique`** (candidate/alternate key, **tetapi boleh `null`**), dan **`check (P)`** (predikat yang wajib benar untuk setiap tuple). Default: atribut boleh `null` kecuali bagian primary key. **Referential integrity**: nilai foreign key di relasi $R$ harus muncul sebagai primary key di relasi $S$; dideklarasikan `foreign key (...) references S`, default menunjuk PK $S$, bisa eksplisit `references S (kolom)`. Pelanggaran referential (mis. hapus baris yang masih dirujuk) **default ditolak**; alternatif `on delete/update` **`cascade`** (ikut terhapus/berubah), **`set null`**, atau **`set default`**.

> [!ad-libitum]- Additional Information
>
> #### `deferrable` constraints dan urutan insert
>
> Saat memuat data dengan siklus foreign key (A→B dan B→A), konstrain yang dicek per-statement membuat insert mustahil. SQL standar menyediakan `constraint ... deferrable initially deferred` sehingga pengecekan ditunda sampai `commit`. Berguna untuk migrasi/ETL.
>
> #### `check` lintas-baris dan lintas-tabel: assertion & trigger
>
> `check (P)` standar hanya boleh merujuk kolom baris yang sama (banyak DBMS bahkan melarang subquery di dalamnya). Konstrain lintas-baris/lintas-tabel butuh `create assertion` (jarang diimplementasikan) atau **trigger**. Contoh: "total SKS yang diambil mahasiswa ≤ 24 per semester".
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat `department` dan `course` dengan FK `on delete cascade`. Isi beberapa baris, hapus satu `department`, dan verifikasi `course`-nya ikut hilang. Ulangi dengan `on delete set null` dan bandingkan.
> 2. Tambahkan `check (salary >= 0)` dan `unique (name)` ke `instructor`. Coba `insert` gaji negatif dan nama duplikat; catat pesan error dan bandingkan perilaku `unique` terhadap dua baris yang `name`-nya `NULL`.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 4.4 (Integrity Constraints), 4.4.7 (Referential Integrity in SQL).
> - Dokumentasi PostgreSQL — "Constraints" (CHECK, UNIQUE, FOREIGN KEY, referential actions).
