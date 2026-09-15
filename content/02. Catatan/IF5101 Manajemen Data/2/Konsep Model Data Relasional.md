---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Konsep Model Data Relasional
>
> > ## Questions/Cues
> >
> > - Apa itu DBMS, database, dan relational database — dan apa bedanya?
> > - Mengapa model relasional masih jadi pilihan utama aplikasi pemrosesan data komersial?
> > - Apa beda **relation schema** dan **relation instance**? Bagaimana notasinya?
> > - Apa itu **domain**, dan mengapa nilai atribut umumnya harus **atomic**?
> > - Apa makna nilai **null** dan komplikasi apa yang ditimbulkannya?
> > - Mengapa "urutan tuple dalam relasi tidak relevan"?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 1 (Slides 4-10)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 2 (Introduction to the Relational Model)
>
> > ### DBMS, Database, dan Relational Database
> >
> > Sebuah **Database Management System (DBMS)** adalah **kumpulan data yang saling terkait (interrelated data)** beserta **sekumpulan program** untuk mengakses data tersebut.
> >
> > Sebuah **database** adalah **kumpulan data saling terkait yang memuat informasi relevan bagi sebuah enterprise** (organisasi/perusahaan/institusi).
> >
> > Sebuah **relational database** adalah database yang terdiri dari **sekumpulan tabel (relations)**, di mana **setiap tabel diberi nama yang unik** di dalam database.
> >
> > ### Mengapa Memakai Relational Database?
> >
> > Relational database **tetap menjadi pilihan utama** untuk aplikasi pemrosesan data komersial. Kekuatan utamanya:
> >
> > - **Model datanya sederhana** — mudah dipahami dan digunakan.
> > - **Punya fondasi matematis yang kokoh dan dipahami dengan baik** — yaitu konsep *relation* (relasi matematis).
> > - **Teknik implementasinya sudah matang** — dikenal luas, efisien, dan banyak dipakai.
> > - **Ada standar** baik untuk bahasa query (**SQL**) maupun untuk antarmuka lewat bahasa pemrograman.
> > - **Prosedur perancangan basis data yang lugas** (straightforward).
> >
> > Rule of thumb: jika data sebuah proyek **dapat diprediksi** dari sisi **struktur, ukuran, dan frekuensi akses**, relational database masih menjadi pilihan terbaik (bahkan menurut vendor NoSQL seperti MongoDB).
> >
> > Contoh RDBMS: **PostgreSQL**, **MySQL**, **SQL Server**, **IBM DB2**, **SQLite**, dan lainnya.
> >
> > ### Struktur Model Data Relasional
> >
> > Pada model relasional, **data direpresentasikan dalam bentuk tabel (relations)**:
> >
> > - Di dalam sebuah database, **setiap tabel diberi nama unik**.
> > - Setiap tabel punya **beberapa kolom (columns / attributes)**, dan **setiap kolom punya nama yang unik**.
> > - Setiap **baris (row / tuple)** merepresentasikan **satu potong informasi** (mis. satu dosen tertentu).
> > - **Urutan tuple dalam sebuah relasi tidak relevan** — relasi bersifat **unordered**. Secara konseptual relasi adalah *himpunan* tuple, bukan daftar berurut; DBMS bebas menyimpan/mengembalikan baris dalam urutan apa pun kecuali diminta `order by`.
> >
> > Istilah: baris = **tuple**, kolom = **attribute**, isi tabel saat ini = **relation instance**.
> >
> > ```mermaid
> > flowchart TB
> >     RS["Relation Schema<br/>instructor = (ID, name, dept_name, salary)"]
> >     RS -->|"didefinisikan atas"| RI["Relation Instance r(R)<br/>tabel dengan nilai saat ini"]
> >     RI --> T1["tuple: (22222, Einstein, Physics, 95000)"]
> >     RI --> T2["tuple: (12121, Wu, Finance, 90000)"]
> >     RI --> T3["tuple: (33456, Gold, Physics, 87000)"]
> > ```
> >
> > ### Relation Schema dan Relation Instance
> >
> > Misalkan $A_1, A_2, \dots, A_n$ adalah **atribut**. Maka:
> >
> > $$
> >
> > R = (A_1, A_2, \dots, A_n)
> >
> > $$
> >
> > adalah sebuah **relation schema** — mendefinisikan *struktur* tabel. Contoh: `instructor = (ID, name, dept_name, salary)`.
> >
> > Sebuah **relation instance** $r$ yang didefinisikan atas schema $R$ dinotasikan **$r(R)$**. Nilai relasi saat ini dispesifikasikan oleh sebuah **tabel konkret**. Sebuah elemen $t$ dari relasi $r$ disebut **tuple** dan direpresentasikan oleh **satu baris** dalam tabel.
> >
> > Analoginya: **schema** ≈ deklarasi tipe/kelas (blueprint), **instance** ≈ objek dengan nilai nyata pada satu titik waktu. Schema relatif statis; instance berubah setiap ada `insert`/`update`/`delete`.
> >
> > ### Atribut, Domain, dan Nilai Null
> >
> > **Domain** sebuah atribut adalah **himpunan nilai yang diperbolehkan** untuk atribut tersebut. Contoh: domain `salary` adalah bilangan non-negatif; domain `semester` adalah `{'Fall', 'Winter', 'Spring', 'Summer'}`.
> >
> > Nilai atribut **(normalnya) harus atomic** — yaitu **tidak dapat dibagi lagi (indivisible)** dari sudut pandang model. Model relasional "datar" tidak mengizinkan sel berisi himpunan atau struktur bertingkat; inilah alasan atribut composite dan multivalued harus "diratakan" saat mapping dari ER (lihat [[Reduksi Entity Set ke Skema Relasional]]).
> >
> > Nilai spesial **`null`** adalah **anggota dari setiap domain**. `null` menandakan nilai yang **"tidak diketahui" (unknown)** atau **tidak ada**. Nilai `null` **menimbulkan komplikasi** dalam definisi banyak operasi — misalnya hasil ekspresi aritmetika yang melibatkan `null` adalah `null`, dan perbandingan dengan `null` menghasilkan `unknown` (dibahas tuntas pada [[Set Operations, Null Values, dan Aggregate Functions]]).

> [!cornell] #### Summary
>
> **DBMS** = data saling terkait + program pengaksesnya; **database** = data saling terkait yang berisi informasi sebuah enterprise; **relational database** = kumpulan **tabel (relations)** bernama unik. Model relasional dominan karena **sederhana**, punya **fondasi matematis kuat (relation)**, implementasi matang, ada **standar (SQL)**, dan perancangannya lugas. Data disusun sebagai **tabel** dengan **kolom (atribut, nama unik)** dan **baris (tuple)**; **urutan tuple tidak relevan** (relasi = himpunan). **Relation schema** $R=(A_1,\dots,A_n)$ mendefinisikan struktur; **relation instance $r(R)$** adalah isi tabel saat ini. **Domain** = himpunan nilai sah tiap atribut; nilai wajib **atomic**; **`null`** ada di setiap domain, berarti *unknown*/tidak ada, dan menyulitkan definisi banyak operasi.

> [!ad-libitum]- Additional Information
>
> #### Terminologi formal vs istilah SQL
>
> Model relasional teoretis (Codd) memakai *relation*, *tuple*, *attribute*; implementasi SQL memakai *table*, *row*, *column*. Perbedaan penting: relasi teoretis adalah **himpunan** (tanpa duplikat, tanpa urutan), tetapi **SQL memakai *multiset*** — tabel dan hasil query SQL **boleh berisi baris duplikat** kecuali dipaksa `distinct`. Jadi "relasi = himpunan" adalah model konseptual, bukan perilaku persis SQL.
>
> #### E. F. Codd dan aljabar relasional
>
> Model relasional diperkenalkan **E. F. Codd** (IBM, 1970) dalam makalah *"A Relational Model of Data for Large Shared Data Banks"*. Fondasi matematisnya memungkinkan **aljabar relasional** (operator seleksi σ, proyeksi π, join ⨝, union, difference) dan **kalkulus relasional** — dasar teoretis di balik optimizer query SQL modern.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Instal PostgreSQL atau SQLite. Buat tabel `instructor` dan `department` dari skema universitas Silberschatz, isi beberapa baris, lalu amati bahwa `SELECT * FROM instructor` bisa mengembalikan baris dalam urutan berbeda setelah `UPDATE`.
> 2. Sisipkan satu baris `instructor` dengan `salary` bernilai `NULL`. Jalankan `SELECT AVG(salary), SUM(salary), COUNT(salary), COUNT(*) FROM instructor` dan jelaskan mengapa `COUNT(salary) ≠ COUNT(*)`.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 2 (Structure of Relational Databases, Database Schema, Keys).
> - Codd, E. F. (1970). *A Relational Model of Data for Large Shared Data Banks*. Communications of the ACM.
