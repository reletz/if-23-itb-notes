---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Extended ER Features dan Isu Perancangan
>
> > ## Questions/Cues
> >
> > - Apa beda proses specialization (top-down) dan generalization (bottom-up)?
> > - Apa itu attribute inheritance dan ISA relationship?
> > - Apa tiga jenis design constraint pada specialization/generalization?
> > - Kapan aggregation dipakai, dan masalah apa yang dipecahkannya?
> > - Apa keputusan-keputusan desain ER yang umum (entity vs atribut, biner vs n-ary, dll.)?
> >
> > ## Reference Points
> >
> > - IF5101 — Database Design Using the E-R Model (Slides 6.40-6.57)
> > - IF5101 — Data Modeling using ER (Slides 19-20)
>
> > ### Specialization dan Generalization
> >
> > **Specialization** adalah **proses desain top-down**: dari satu entity set, kita **menetapkan subgrup** yang berbeda (distinctive) dari entitas lain dalam set. Subgrup ini menjadi **lower-level entity set** (subtype) yang punya atribut atau partisipasi relationship yang **tidak berlaku** untuk entity set tingkat atas (supertype). Digambar dengan **segitiga berlabel ISA** (mis. *customer* "is a" *person*).
> >
> > **Generalization** adalah **proses desain bottom-up**: menggabungkan beberapa entity set yang **berbagi fitur sama** menjadi satu **higher-level entity set**.
> >
> > Specialization dan generalization adalah **inversi sederhana** satu sama lain — digambar **sama** di ER diagram, dan istilahnya sering dipakai bergantian. ISA relationship juga disebut **superclass-subclass relationship**.
> >
> > **Attribute inheritance** — lower-level entity set **mewarisi semua atribut dan partisipasi relationship** dari higher-level entity set yang terhubung dengannya. **Primary key subtype = primary key supertype-nya**. Contoh: *Employee* dan *Customer* mewarisi atribut *Person* (`name`, `street`, `city`); PK keduanya adalah `ssn` (PK *Person*).
> >
> > Sebuah entity set bisa punya **beberapa specialization** berdasar fitur berbeda. Contoh: *Employee* dispesialisasi menjadi *officer* / *secretary* / *teller* (berdasar jabatan) **dan** menjadi *permanent-employee* / *temporary-employee* (berdasar status). Setiap pegawai adalah anggota **salah satu** dari tiap pengelompokan.
> >
> > ```mermaid
> > flowchart TD
> >     P["Person<br/>ssn, name, street, city"]
> >     P --- ISA{{"ISA"}}
> >     ISA --- E["Employee<br/>salary"]
> >     ISA --- C["Customer<br/>credit-rating"]
> >     E --- ISA2{{"ISA"}}
> >     ISA2 --- O["Officer<br/>office-number"]
> >     ISA2 --- T["Teller<br/>station-number, hours-worked"]
> >     ISA2 --- S["Secretary<br/>hours-worked"]
> > ```
> >
> > ### Design Constraint pada Specialization/Generalization
> >
> > Ada tiga jenis konstrain:
> >
> > | Konstrain | Pilihan | Makna |
> > |---|---|---|
> > | **Keanggotaan** | **condition-defined** | Keanggotaan lower-level set ditentukan oleh **kondisi atas atribut** (mis. `type = "employee"`). Notasi: tulis ekspresi di dekat ISA. |
> > | | **user-defined** | Keanggotaan ditetapkan **manual oleh pengguna**, bukan aturan otomatis. (tak ada ekspresi) |
> > | **Disjointness** | **disjoint** | Sebuah entitas hanya boleh masuk **satu** lower-level entity set. Notasi: tulis `disjoint` di dekat segitiga ISA. |
> > | | **overlapping** | Sebuah entitas boleh masuk **lebih dari satu** lower-level entity set. (default; tak ada teks `disjoint`) |
> > | **Completeness** | **total** | Setiap entitas higher-level **wajib** masuk minimal satu lower-level set. Notasi: **garis ganda**. |
> > | | **partial** | Entitas higher-level **boleh tidak** masuk lower-level set mana pun. Notasi: **garis tunggal** (default). |
> >
> > ### Aggregation
> >
> > Pertimbangkan relationship ternary *proj_guide* (instructor–student–project). Misalkan kita ingin **mencatat evaluasi** mahasiswa oleh guide pada sebuah proyek, lewat relationship *eval_for*.
> >
> > Masalahnya: *eval_for* dan *proj_guide* merepresentasikan **informasi yang tumpang tindih** — setiap *eval_for* berkorespondensi dengan sebuah *proj_guide*, tetapi sebagian *proj_guide* mungkin **tidak** punya *eval_for*. Jadi *proj_guide* **tak bisa dibuang**.
> >
> > **Aggregation** menghilangkan redundansi ini dengan:
> >
> > - **memperlakukan relationship sebagai entitas abstrak**,
> > - sehingga **relationship antar-relationship** dimungkinkan,
> > - yaitu **abstraksi relationship menjadi entitas baru**.
> >
> > Hasilnya: *proj_guide* (kombinasi student–instructor–project) di-agregasi menjadi entitas abstrak yang kemudian bisa punya relationship *eval_for* dengan entitas *evaluation* — tanpa memperkenalkan redundansi.
> >
> > ### Isu Perancangan ER (Design Issues)
> >
> > **1. Redundant attributes.** Jika *student* punya atribut `dept_name` **dan** ada relationship set *stud_dept* ke *department*, maka `dept_name` **mereplikasi** informasi relationship → redundan, harus dibuang. (Catatan: saat konversi balik ke tabel, atribut ini kadang muncul lagi sebagai foreign key.)
> >
> > **2. Entity set vs atribut.** Memakai *phone* sebagai **entity set** (bukan atribut) memungkinkan **informasi ekstra** tentang nomor telepon (mis. lokasi, tipe) **plus** banyak nomor per entitas. Gunakan entity set bila objek punya atribut sendiri atau berelasi dengan objek lain.
> >
> > **3. Entity set vs relationship set.** Pedoman: gunakan **relationship set untuk mendeskripsikan aksi yang terjadi antar entitas**. Perhatikan juga **penempatan atribut relationship** — mis. atribut `date` sebaiknya jadi atribut *advisor* (relationship), bukan atribut *student*.
> >
> > **4. Binary vs non-binary.** Relationship n-ary (n > 2) selalu bisa diganti beberapa relationship biner, tetapi **relationship n-ary menunjukkan lebih jelas** bahwa beberapa entitas berpartisipasi dalam **satu** relationship. Sebagian relationship yang tampak non-biner **lebih baik jadi biner** — mis. ternary *parents* (anak–ayah–ibu) lebih baik jadi dua biner *father* dan *mother* (memungkinkan informasi parsial, mis. hanya ibu yang diketahui). Namun sebagian **secara alami non-biner** — mis. *proj_guide*.
> >
> > **5. Konversi non-biner → biner.** Relationship R antar A, B, C dapat diganti **entity set artifisial E** plus tiga relationship: $R_A$ (E–A), $R_B$ (E–B), $R_C$ (E–C). Buat atribut pengidentifikasi untuk E (atau jadikan E weak entity set yang diidentifikasi oleh ketiga relationship). Untuk setiap $(a_i, b_i, c_i) \in R$, buat entitas baru $e_i \in E$ dan tambahkan $(e_i, a_i)$ ke $R_A$, $(e_i, b_i)$ ke $R_B$, $(e_i, c_i)$ ke $R_C$. Menerjemahkan **semua konstrain** tidak selalu mungkin.
> >
> > **6. Keputusan desain ER (ringkasan):** (a) atribut vs entity set untuk merepresentasikan objek; (b) entity set vs relationship set untuk sebuah konsep; (c) relationship ternary vs sepasang relationship biner; (d) strong vs weak entity set; (e) pemakaian specialization/generalization — menambah modularitas; (f) pemakaian aggregation — memperlakukan agregat sebagai satu unit tanpa memedulikan struktur internalnya.

> [!cornell] #### Summary
>
> **Specialization** (top-down) memecah entity set menjadi **subtype** dengan atribut khas; **generalization** (bottom-up) menyatukan entity set serupa menjadi **supertype** — keduanya inversi, digambar sama lewat **segitiga ISA**, dengan **attribute inheritance** (subtype mewarisi atribut + PK supertype). Tiga **design constraint**: keanggotaan (**condition-defined** vs **user-defined**), disjointness (**disjoint** vs **overlapping**), completeness (**total** vs **partial**). **Aggregation** memperlakukan sebuah relationship sebagai **entitas abstrak** agar bisa berelasi dengan relationship lain (mis. evaluasi atas *proj_guide*), menghilangkan redundansi tanpa membuang relationship asli. **Isu perancangan** utama: buang **atribut redundan**, pilih **entity set vs atribut** dan **entity set vs relationship set** dengan tepat, timbang **biner vs n-ary** (n-ary bisa dikonversi ke biner lewat **entity set artifisial**), serta putuskan strong/weak, specialization, dan aggregation demi modularitas.

> [!ad-libitum]- Additional Information
>
> #### Specialization → Tabel: tiga strategi
>
> Saat mapping hierarki ISA ke relasional ada tiga opsi: (1) **satu tabel per entitas** (supertype + tiap subtype, join via PK); (2) **tabel per subtype** saja (atribut supertype diduplikasi ke tiap subtype — hanya jika total & disjoint); (3) **satu tabel gabungan** dengan kolom nullable + kolom `type` (cocok untuk overlapping/partial, tapi banyak NULL). Pilihan bergantung pada konstrain disjoint/overlapping dan total/partial.
>
> #### Aggregation vs Ternary vs Weak Entity
>
> Ketiganya kadang bisa memodelkan situasi sama. Aggregation dipilih ketika kita perlu relationship **atas** sebuah relationship yang sudah ada dan tidak ingin menduplikasi peserta-pesertanya. Alternatif modern: banyak perancang langsung membuat *associative entity* (mirip hasil konversi non-biner → biner) dan melewati notasi aggregation.
>
> #### Common Mistakes in ER Diagrams
>
> Slide 6.49-6.51 menampilkan contoh ER diagram **keliru**: atribut diletakkan di entitas yang salah, relationship dipakai untuk sesuatu yang seharusnya atribut, atau entitas ganda merepresentasikan konsep yang sama. Latih mata dengan membandingkan versi salah dan benar.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Modelkan sistem perbankan: *Account* dispesialisasi menjadi *SavingsAccount* & *CheckingAccount*. Tentukan disjoint/overlapping, total/partial, condition/user-defined, lalu petakan ke skema relasional dengan salah satu dari tiga strategi.
> 2. Ambil satu relationship ternary nyata dan konversikan ke bentuk biner lewat entity set artifisial. Diskusikan konstrain mana yang hilang dalam konversi.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 6 (Extended E-R Features, Entity-Relationship Design Issues) & Chapter 6.8 (Reduction to Relational Schemas).
> - Elmasri & Navathe. *Fundamentals of Database Systems* — bab EER (Enhanced ER): specialization/generalization lattice, categories/union types.
