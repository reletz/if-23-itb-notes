---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Mapping Cardinality, Partisipasi, dan Weak Entity Set
>
> > ## Questions/Cues
> >
> > - Apa empat tipe mapping cardinality dan bagaimana notasinya di ER diagram?
> > - Apa beda total participation dan partial participation?
> > - Mengapa hanya boleh ada satu panah keluar dari relationship ternary?
> > - Apa yang membuat sebuah entity set disebut "weak"?
> > - Apa peran discriminator dan identifying relationship pada weak entity set?
> >
> > ## Reference Points
> >
> > - IF5101 — Database Design Using the E-R Model (Slides 6.22-6.30, 6.35-6.39)
> > - IF5101 — Data Modeling using ER (Slides 16-18)
>
> > ### Mapping Cardinality Constraints
> >
> > **Mapping cardinality** menyatakan **berapa banyak entitas yang dapat diasosiasikan** dengan entitas lain melalui sebuah relationship set. Paling berguna untuk mendeskripsikan **relationship biner**. Untuk relationship biner, cardinality harus salah satu dari:
> >
> > - **One-to-one (1-1)** — sebuah entitas A berasosiasi dengan **paling banyak satu** entitas B, dan sebaliknya.
> > - **One-to-many (1-n)** — sebuah A berasosiasi dengan **beberapa (termasuk 0)** B, tetapi sebuah B berasosiasi dengan **paling banyak satu** A.
> > - **Many-to-one (n-1)** — kebalikan dari 1-n.
> > - **Many-to-many (n-m)** — sebuah A berasosiasi dengan beberapa B, dan sebuah B dengan beberapa A.
> >
> > Catatan penting: pada semua tipe, **sebagian elemen di A atau B boleh tidak terpetakan** ke elemen mana pun di himpunan lain (itu urusan *participation*, bukan cardinality).
> >
> > **Notasi ER diagram:** cardinality dinyatakan dengan menggambar
> >
> > - **garis berarah (→)** dari relationship set ke entity set → berarti **"one"**;
> > - **garis tak berarah (—)** → berarti **"many"**.
> >
> > Contoh: relationship *advisor* dengan panah ke *instructor* berarti setiap mahasiswa punya **paling banyak satu** advisor (one-to-many dari instructor ke student).
> >
> > ### Total dan Partial Participation
> >
> > **Participation constraint** menyatakan apakah **setiap** entitas dalam sebuah entity set wajib ikut dalam relationship:
> >
> > | Jenis | Notasi | Makna |
> > |---|---|---|
> > | **Total participation** | **garis ganda** (double line) | **Setiap** entitas dalam entity set berpartisipasi dalam **minimal satu** relationship. |
> > | **Partial participation** | **garis tunggal** (single line) | **Sebagian** entitas boleh **tidak** berpartisipasi dalam relationship mana pun. |
> >
> > Contoh: pada relationship *advisor*, entity set *student* berpartisipasi **total** (setiap mahasiswa **wajib** punya advisor), sedangkan *instructor* berpartisipasi **partial** (ada dosen yang tidak membimbing siapa pun).
> >
> > **Cardinality ≠ participation.** *Cardinality* menjawab "berapa banyak" (1 atau many); *participation* menjawab "wajib atau opsional" (minimal 1 atau boleh 0). Keduanya konstrain terpisah dan digambar berbeda (panah vs garis ganda).
> >
> > ### Cardinality pada Relationship Ternary
> >
> > Untuk relationship ternary (atau derajat lebih tinggi), **hanya boleh ada paling banyak satu panah keluar**. Contoh: panah dari `proj_guide` ke *instructor* berarti **setiap mahasiswa punya paling banyak satu pembimbing** untuk sebuah proyek.
> >
> > Mengapa dilarang lebih dari satu panah? Karena **maknanya ambigu**. Untuk relationship R antara A, B, C dengan panah ke B dan C, bisa berarti:
> >
> > 1. setiap entitas A berasosiasi dengan entitas unik dari B **dan** C; atau
> > 2. setiap pasangan (A, B) berasosiasi dengan C unik, **dan** setiap pasangan (A, C) berasosiasi dengan B unik.
> >
> > Kedua tafsir dipakai di formalisme berbeda, jadi untuk menghindari kebingungan **lebih dari satu panah dilarang**.
> >
> > ### Weak Entity Set
> >
> > Pertimbangkan entitas *section* yang diidentifikasi unik oleh `course_id`, `semester`, `year`, dan `sec_id`. *section* jelas terkait dengan *course*. Jika `course_id` disimpan sebagai atribut *section*, informasinya **redundan** dengan relationship *sec_course*. Jika `course_id` **dibuang** dari *section*, maka *section* **tidak punya cukup atribut** untuk mengidentifikasi dirinya sendiri.
> >
> > Solusinya: perlakukan *sec_course* sebagai relationship khusus yang menyediakan informasi tambahan (yaitu `course_id`) yang diperlukan untuk mengidentifikasi *section*. Inilah **weak entity set**:
> >
> > - **Weak entity set** = entity set yang **keberadaannya bergantung** pada entitas lain, disebut **identifying (strong) entity**.
> > - Alih-alih primary key sendiri, weak entity diidentifikasi lewat **identifying entity + atribut tambahan yang disebut discriminator** (atau *partial key*).
> > - Entity set yang **bukan** weak disebut **strong entity set**.
> > - Weak entity **existence dependent** pada identifying entity set; identifying entity set dikatakan **own** (memiliki) weak entity set.
> > - Relationship yang menghubungkan weak entity set dengan identifying strong entity set disebut **identifying relationship**.
> >
> > **Notasi ER diagram:**
> >
> > - Weak entity set → **persegi panjang ganda** (double rectangle).
> > - Discriminator digarisbawahi dengan **garis putus-putus** (dashed).
> > - Identifying relationship → **diamond ganda** (double diamond).
> > - Primary key *section* = (`course_id`, `sec_id`, `semester`, `year`) — yaitu PK identifying entity (`course_id`) + discriminator (`sec_id`, `semester`, `year`).
> >
> > ```mermaid
> > flowchart LR
> >     C["course (strong entity)<br/>course_id, title, credits"]
> >     R{{"sec_course<br/>identifying relationship"}}
> >     S["section (weak entity)<br/>sec_id, semester, year"]
> >     C === R
> >     R === S
> > ```
> >
> > Garis ganda (`===`) menandai total participation weak entity pada identifying relationship: setiap *section* wajib punya *course*.

> [!cornell] #### Summary
>
> **Mapping cardinality** (1-1, 1-n, n-1, n-m) menyatakan berapa entitas yang bisa dihubungkan lewat relationship biner; digambar dengan **panah (→) = "one"** dan **garis polos (—) = "many"**. **Participation** adalah konstrain terpisah: **total** (garis ganda, setiap entitas wajib ikut) vs **partial** (garis tunggal, boleh 0). Pada relationship **ternary hanya boleh satu panah keluar** karena banyak panah bermakna ambigu. **Weak entity set** adalah entity set yang **existence-dependent** pada **identifying (strong) entity**; ia tak punya PK sendiri melainkan diidentifikasi oleh identifying entity + **discriminator**, dihubungkan lewat **identifying relationship**. Notasi: **double rectangle**, **discriminator digarisbawahi putus-putus**, **double diamond**; PK weak entity = PK identifying entity + discriminator.

> [!ad-libitum]- Additional Information
>
> #### Notasi (min, max) — alternatif Chen
>
> Selain notasi panah/garis Silberschatz, banyak buku memakai notasi **(min, max)** pada tiap sisi relationship: `(0,1)`, `(1,1)`, `(0,N)`, `(1,N)`. Notasi ini menyatukan cardinality **dan** participation dalam satu label — `(1,1)` berarti "one" + total, `(0,N)` berarti "many" + partial. Crow's foot notation (dipakai banyak tools) juga menggabungkan keduanya secara visual.
>
> #### Weak Entity → Tabel
>
> Saat mapping ke relasional, weak entity menjadi tabel dengan PK = **(FK ke identifying entity) + discriminator**. FK tersebut biasanya juga menjadi bagian foreign key `ON DELETE CASCADE` — menghapus *course* otomatis menghapus semua *section*-nya, mencerminkan existence dependence.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Untuk enterprise universitas, tandai cardinality **dan** participation untuk relationship *teaches* (instructor–course), *takes* (student–section), *advisor*. Bandingkan hasilmu dengan diagram lengkap di Silberschatz Gambar 6.15.
> 2. Cari tiga contoh weak entity nyata (mis. *order_line* pada *order*, *dependent* pada *employee*, *room* pada *building*). Tentukan discriminator & identifying relationship masing-masing.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 6 (Mapping Cardinalities, Total/Partial Participation, Weak Entity Sets).
> - Elmasri & Navathe. *Fundamentals of Database Systems* — bab notasi (min, max) dan weak entity.
