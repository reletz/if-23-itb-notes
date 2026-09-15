---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Reduksi Entity Set ke Skema Relasional
>
> > ## Questions/Cues
> >
> > - Mengapa entity set dan relationship set bisa direpresentasikan **secara seragam** sebagai relation schema?
> > - Bagaimana **strong entity set** direduksi menjadi tabel?
> > - Apa tambahan kolom yang diperlukan saat mereduksi **weak entity set**?
> > - Bagaimana atribut **composite** ditangani saat mapping ke relasional?
> > - Bagaimana atribut **multivalued** direpresentasikan? Mengapa butuh skema terpisah?
> > - Mengapa atribut **derived** tidak direpresentasikan secara eksplisit?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 1 (Slides 15-17)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 6.7 (Reducing E-R Diagrams to Relational Schemas)
>
> > ### Prinsip Umum Reduksi
> >
> > **Entity set dan relationship set dapat diekspresikan secara seragam sebagai relation schema** yang merepresentasikan isi basis data. Sebuah basis data yang sesuai dengan sebuah ER diagram dapat direpresentasikan oleh **sekumpulan skema**.
> >
> > Aturannya:
> >
> > - Untuk **setiap** entity set dan relationship set, ada **satu skema unik** yang **diberi nama sama** dengan entity/relationship set yang bersangkutan.
> > - Setiap skema punya sejumlah **kolom** (umumnya berkorespondensi dengan atribut), masing-masing dengan **nama unik**.
> >
> > Reduksi relationship set dibahas terpisah pada [[Reduksi Relationship Set, Specialization, dan Aggregation]].
> >
> > ### Strong Entity Set
> >
> > Sebuah **strong entity set** direduksi menjadi **skema dengan atribut yang sama persis**. Primary key entity set menjadi primary key skema.
> >
> > Contoh:
> >
> > ```
> > course = (course_id, title, credits)
> > ```
> >
> > ### Weak Entity Set
> >
> > Sebuah **weak entity set menjadi tabel yang menyertakan kolom untuk primary key dari identifying strong entity set** yang memilikinya. Kolom tambahan itu sekaligus menjadi **foreign key** ke strong entity, dan menjadi bagian dari primary key weak entity (bersama discriminator).
> >
> > Contoh: `section` adalah weak entity dengan discriminator `(sec_id, semester, year)` dan identifying entity `course`:
> >
> > ```
> > section = (course_id, sec_id, semester, year)
> > FK: section(course_id) → course(course_id)
> > ```
> >
> > PK `section` = `(course_id, sec_id, semester, year)` = PK identifying entity + discriminator.
> >
> > ```mermaid
> > flowchart LR
> >     E["Entity Set"] --> S{"Strong atau Weak?"}
> >     S -->|Strong| ST["Skema = atribut sama<br/>course = (course_id, title, credits)"]
> >     S -->|Weak| WK["Skema = discriminator + PK identifying entity<br/>section = (course_id, sec_id, semester, year)<br/>+ FK ke identifying entity"]
> > ```
> >
> > ### Atribut Composite
> >
> > Atribut **composite diratakan (flattened)** dengan **membuat satu atribut untuk setiap atribut komponen** — atribut composite induknya sendiri **tidak** menjadi kolom.
> >
> > Contoh: atribut `name` dengan komponen `first_name` dan `last_name` direduksi menjadi dua atribut `name_first_name` dan `name_last_name` (atau cukup `first_name` dan `last_name` bila tidak ambigu). Komponen bertingkat juga diratakan sampai ke daun, mis. `address → street, city, state, zip` dan `street → street_number, street_name, apt_number`.
> >
> > ```
> > instructor = (ID, first_name, middle_initial, last_name,
> >               street_number, street_name, apt_number,
> >               city, state, zip, date_of_birth)
> > ```
> >
> > ### Atribut Multivalued
> >
> > Sebuah atribut **multivalued $M$** dari entity set $E$ direpresentasikan oleh **skema terpisah $E_M$**. Skema $E_M$ berisi **primary key $E$** dan **satu kolom untuk satu nilai $M$**; setiap nilai multivalued menjadi **satu baris** tersendiri. Primary key $E_M$ = seluruh atributnya, dan PK $E$ menjadi foreign key ke $E$.
> >
> > Alasannya: model relasional datar tidak bisa menyimpan "banyak nilai dalam satu sel" (nilai harus atomic). Skema terpisah adalah cara merepresentasikan relasi 1-ke-banyak antara entitas dan nilai-nilainya.
> >
> > Contoh: atribut `phone_number` pada `instructor`:
> >
> > ```
> > instructor_phone = (ID, phone_number)
> > FK: instructor_phone(ID) → instructor(ID)
> > ```
> >
> > Dosen dengan 3 nomor telepon → 3 baris di `instructor_phone`.
> >
> > ### Atribut Derived
> >
> > Atribut **derived tidak direpresentasikan secara eksplisit** dalam model data relasional — karena nilainya **dapat dihitung** dari atribut lain, menyimpannya berarti redundansi dan risiko inkonsistensi.
> >
> > Contoh: `age` diturunkan dari `date_of_birth` — cukup simpan `date_of_birth`, hitung `age` saat query.
> >
> > Dalam model data lain, atribut derived bisa direpresentasikan sebagai **stored procedure, function, atau method**.

> [!cornell] #### Summary
>
> Entity set dan relationship set direduksi **seragam** menjadi relation schema **bernama sama**, satu skema per set. **Strong entity set** → skema dengan **atribut sama persis**. **Weak entity set** → tabel yang **menyertakan PK identifying strong entity** (sekaligus FK ke sana), dengan PK = PK identifying entity + discriminator (mis. `section = (course_id, sec_id, semester, year)`). Atribut **composite** **diratakan** menjadi kolom per komponen daun (induknya hilang). Atribut **multivalued $M$** dari $E$ → **skema terpisah $E_M$ = (PK $E$, nilai $M$)**, satu nilai per baris, dengan FK ke $E$ (mis. `instructor_phone = (ID, phone_number)`). Atribut **derived tidak disimpan** — dihitung saat query, atau diwujudkan sebagai function/method di model lain.

> [!ad-libitum]- Additional Information
>
> #### Normalisasi dan skema $E_M$
>
> Pemisahan atribut multivalued ke skema sendiri sebenarnya adalah bentuk awal **normalisasi** — menghilangkan *repeating group* agar skema memenuhi **1NF** (semua nilai atomic). Topik normalisasi lanjutan (2NF, 3NF, BCNF, functional dependency) dibahas di materi terpisah dan menyempurnakan hasil reduksi ER ini.
>
> #### Composite attribute di RDBMS modern
>
> Sebagian RDBMS (PostgreSQL) mendukung *composite type* dan kolom bertipe `JSONB`/array — secara teknis melanggar 1NF klasik. Ini pragmatis untuk data semi-terstruktur, tetapi kehilangan sebagian jaminan integritas dan kemudahan query relasional; untuk data inti yang butuh konstrain kuat, tetap ratakan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil ER diagram universitas: entity `instructor` dengan `name` (composite: first/last), `address` (composite bertingkat), `{phone_number}` (multivalued), dan `age` (derived). Tuliskan **semua** relation schema hasil reduksi lengkap dengan FK.
> 2. Buat tabel `instructor` dan `instructor_phone` di SQLite, isi seorang dosen dengan 3 nomor, lalu tulis query yang mengembalikan satu baris per dosen dengan nomor telepon digabung koma (`GROUP BY` + `string_agg`/`group_concat`).
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 6.7 (Representation of Entity Sets, Complex Attributes).
> - Materi lanjutan mata kuliah: Normalisasi (functional dependency, 1NF–BCNF).
