---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Entity Set, Relationship Set, dan Primary Key
>
> > ## Questions/Cues
> >
> > - Apa beda entity dan entity set? Bagaimana keduanya digambar di ER diagram?
> > - Apa empat jenis atribut kompleks dan bagaimana notasinya?
> > - Bagaimana definisi matematis sebuah relationship set?
> > - Apa itu role dan degree pada relationship? Kapan relationship non-biner dipakai?
> > - Bagaimana menentukan primary key untuk entity set dan untuk relationship set?
> >
> > ## Reference Points
> >
> > - IF5101 — Database Design Using the E-R Model (Slides 6.8-6.21, 6.31-6.34)
> > - IF5101 — Data Modeling using ER (Slides 14-15)
>
> > ### Entity dan Entity Set
> >
> > Sebuah **entity** adalah **objek yang ada (exists) dan dapat dibedakan (distinguishable) dari objek lain**. Contoh: seorang dosen tertentu, sebuah perusahaan, sebuah kejadian, sebuah pohon.
> >
> > Sebuah **entity set** adalah **himpunan entitas berjenis sama yang berbagi properti (atribut) yang sama**. Contoh: himpunan semua dosen, himpunan semua mata kuliah.
> >
> > Sebuah entity direpresentasikan oleh **sekumpulan atribut**, yaitu **properti deskriptif yang dimiliki oleh semua anggota** entity set tersebut. Contoh:
> >
> > - `instructor = (ID, name, salary)`
> > - `course = (course_id, title, credits)`
> >
> > Sebuah **subset atribut membentuk primary key** entity set — mengidentifikasi setiap anggota himpunan secara unik.
> >
> > **Notasi ER diagram:**
> >
> > - **Rectangle** (persegi panjang) merepresentasikan entity set.
> > - **Atribut ditulis di dalam** kotak entity.
> > - **Garis bawah (underline)** menandai atribut yang menjadi primary key.
> >
> > ### Atribut dan Atribut Kompleks
> >
> > Jenis-jenis atribut:
> >
> > | Jenis | Penjelasan | Contoh |
> > |---|---|---|
> > | **Simple** | Tidak dapat dibagi lagi | `salary` |
> > | **Composite** | Dapat dibagi menjadi sub-bagian (atribut komponen) | `name` → first_name, middle_initial, last_name; `address` → street, city, state, postal_code (dan `street` → street_number, street_name, apartment_number) |
> > | **Single-valued** | Satu nilai per entitas | `ID` |
> > | **Multivalued** | Bisa punya banyak nilai; notasi kurung kurawal `{ }` | `{phone_number}` |
> > | **Derived** | Dapat dihitung dari atribut lain; notasi kurung `( )` | `age` diturunkan dari `date_of_birth` |
> >
> > **Domain** adalah **himpunan nilai yang diperbolehkan** untuk setiap atribut.
> >
> > ### Relationship dan Relationship Set
> >
> > Sebuah **relationship** adalah **asosiasi di antara beberapa entitas**. Contoh: entitas mahasiswa `44553 (Peltier)` berasosiasi dengan entitas dosen `22222 (Einstein)` lewat relationship *advisor*.
> >
> > Sebuah **relationship set** adalah **relasi matematis di antara n ≥ 2 entitas**, masing-masing diambil dari sebuah entity set:
> >
> > $$
> >
> > \{(e_1, e_2, \dots, e_n) \mid e_1 \in E_1,\ e_2 \in E_2,\ \dots,\ e_n \in E_n\}
> >
> > $$
> >
> > di mana $(e_1, e_2, \dots, e_n)$ adalah sebuah relationship. Contoh: $(44553, 22222) \in advisor$.
> >
> > **Notasi ER diagram:** **diamond** (belah ketupat) merepresentasikan relationship set; **garis** ditarik antara entitas yang berelasi.
> >
> > Sebuah relationship set **dapat memiliki atribut sendiri**. Contoh: relationship set *advisor* antara *instructor* dan *student* dapat memiliki atribut **`date`** yang mencatat kapan mahasiswa mulai dibimbing oleh advisor tersebut. Atribut ini bukan milik *student* maupun *instructor* — ia hanya bermakna dalam konteks pasangan tersebut.
> >
> > ### Peran (Roles) dan Derajat (Degree)
> >
> > **Roles** — entity set yang berpartisipasi dalam sebuah relationship **tidak harus berbeda**. Setiap kemunculan entity set memainkan sebuah **"role"** dalam relationship. Contoh: relationship *prereq* pada entity set *course* dengan dirinya sendiri — label **`course_id`** dan **`prereq_id`** adalah role (mana yang mata kuliah, mana yang prasyarat). Ini disebut relationship **rekursif**.
> >
> > **Degree** — jumlah entity set yang berpartisipasi dalam sebuah relationship:
> >
> > - **Binary** (degree 2) — melibatkan dua entity set. **Mayoritas relationship di sistem basis data adalah biner.**
> > - **Ternary** (degree 3) — contoh: `proj_guide` melibatkan *instructor*, *student*, dan *project* (mahasiswa mengerjakan proyek riset di bawah bimbingan seorang dosen).
> >
> > Relationship antar lebih dari dua entity set **jarang**. Kadang lebih nyaman merepresentasikan relationship sebagai non-biner, meski selalu bisa diuraikan menjadi beberapa relationship biner (dibahas pada [[Extended ER Features dan Isu Perancangan]]).
> >
> > ```mermaid
> > flowchart LR
> >     subgraph Binary [Binary - degree 2]
> >         S1["student"] --- A1{"advisor"}
> >         A1 --- I1["instructor"]
> >     end
> >     subgraph Ternary [Ternary - degree 3]
> >         S2["student"] --- PG{"proj_guide"}
> >         I2["instructor"] --- PG
> >         P2["project"] --- PG
> >     end
> > ```
> >
> > ### Primary Key: Entity Set dan Relationship Set
> >
> > **Untuk entity set:** entitas per definisi berbeda satu sama lain, tetapi dari sudut pandang basis data perbedaannya **harus terekspresikan lewat atribut**. Nilai atribut sebuah entitas harus dapat mengidentifikasinya secara unik — **tidak boleh ada dua entitas dengan nilai identik pada semua atribut**. Sebuah **key** adalah sekumpulan atribut yang cukup untuk membedakan entitas satu dari lainnya.
> >
> > **Untuk relationship set:** primary key dibentuk dari **gabungan (union) primary key entitas-entitas** yang terlibat. Jika R adalah relationship set atas entity set $E_1, E_2, \dots, E_n$, maka PK dari R = union PK dari $E_1, \dots, E_n$. Jika R punya atribut $a_1, \dots, a_m$, atribut itu **juga masuk** ke PK R. Contoh: PK *advisor* = {`instructor.ID`, `student.ID`}.
> >
> > **Pilihan PK relationship biner bergantung pada mapping cardinality:**
> >
> > | Cardinality | Primary key relationship |
> > |---|---|
> > | **Many-to-many** | Union PK kedua sisi (minimal superkey) |
> > | **One-to-many** / **Many-to-one** | PK sisi **"many"** saja |
> > | **One-to-one** | PK salah satu sisi (pilih salah satu) |
> >
> > Detail mapping cardinality dibahas pada [[Mapping Cardinality, Partisipasi, dan Weak Entity Set]].

> [!cornell] #### Summary
>
> **Entity** adalah objek yang dapat dibedakan; **entity set** adalah himpunan entitas sejenis dengan atribut sama, digambar sebagai **rectangle** (PK diberi **underline**). Atribut bisa **simple/composite**, **single/multivalued** (`{ }`), atau **derived** (`( )`), dengan **domain** sebagai himpunan nilai sah. **Relationship** adalah asosiasi antar entitas; **relationship set** adalah relasi matematis atas n ≥ 2 entity set, digambar sebagai **diamond**, dan boleh punya **atribut sendiri** (mis. `date` pada *advisor*). **Role** memberi label saat satu entity set muncul berulang (relationship rekursif); **degree** menyatakan jumlah entity set — mayoritas relationship **biner**, sebagian **ternary** (mis. `proj_guide`). **Primary key** entity set = atribut pembeda; PK relationship set = **union PK entitas peserta** (+ atribut relationship), dengan pilihan spesifik bergantung **mapping cardinality**.

> [!ad-libitum]- Additional Information
>
> #### Superkey, Candidate Key, Primary Key
>
> **Superkey** = himpunan atribut yang menjamin keunikan. **Candidate key** = superkey minimal (tidak ada subset-nya yang masih superkey). **Primary key** = satu candidate key yang dipilih perancang sebagai identitas resmi. Slide menyebut "minimal superkey" — itu identik dengan candidate key.
>
> #### Mengapa atribut composite & multivalued penting saat mapping ke tabel
>
> Model relasional **datar** tidak mendukung atribut composite maupun multivalued secara langsung. Saat mapping ER → relasional: atribut composite "diratakan" menjadi kolom-kolom komponen; atribut multivalued dipindah ke **tabel terpisah** ber-PK (entitas_id, nilai). Atribut derived umumnya **tidak disimpan** melainkan dihitung saat query.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Gambar ER diagram mini untuk enterprise universitas: entity set *student*, *instructor*, *course*, *department* dengan relationship *advisor*, *teaches*, *stud_dept*. Beri atribut composite pada `name` dan multivalued pada `phone`.
> 2. Ambil relationship rekursif nyata (mis. *employee–manages–employee*, *part–contains–part* BOM). Tentukan role label dan primary key-nya.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 6 (Entity Sets, Relationship Sets, Complex Attributes, Primary Key).
> - Chen, P. P. (1976). *The Entity-Relationship Model — Toward a Unified View of Data*. ACM TODS — makalah asli model ER.
