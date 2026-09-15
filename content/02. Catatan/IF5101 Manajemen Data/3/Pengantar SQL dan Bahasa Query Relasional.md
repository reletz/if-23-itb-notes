---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Pengantar SQL dan Bahasa Query Relasional
>
> > ## Questions/Cues
> >
> > - Apa itu **query language**, dan apa tiga kategorinya (imperative / functional / declarative)?
> > - Termasuk kategori mana SQL?
> > - Bagaimana sejarah singkat SQL (Sequel, System R, standardisasi)?
> > - Apa saja **bagian-bagian SQL** (DML, DDL, transaction control, embedded/dynamic, authorization)?
> > - Mengapa "tidak semua contoh SQL jalan di semua sistem"?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 2 (Slides 5-7)
> > - IF5101 — Database System Concepts: SQL (Slides 2.3-2.4)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 3 (Introduction to SQL)
>
> > ### Relational Query Languages
> >
> > Sebuah **query language** adalah bahasa yang dipakai pengguna untuk **meminta informasi dari basis data**. Kategorinya:
> >
> > | Kategori | Prinsip | Contoh |
> > |---|---|---|
> > | **Imperative** | Pengguna **menginstruksikan sistem melakukan urutan operasi tertentu** untuk menghitung hasil yang diinginkan. Ada *state* variabel yang diubah. | (gaya prosedural) |
> > | **Functional** | Komputasi diekspresikan sebagai **evaluasi fungsi-fungsi** yang beroperasi pada data atau pada hasil fungsi lain. | **relational algebra** |
> > | **Declarative** | Pengguna **mendeskripsikan informasi yang diinginkan** tanpa memberi urutan langkah atau pemanggilan fungsi untuk memperolehnya. | **tuple relational calculus**, **domain relational calculus** |
> >
> > **SQL mencakup elemen dari ketiga pendekatan** — imperative, functional, dan declarative. Inti `select-from-where` bersifat deklaratif (pengguna menyebut *apa* yang diinginkan, optimizer menentukan *bagaimana*), tetapi ada juga konstruksi yang lebih prosedural.
> >
> > ### Sejarah SQL
> >
> > - Bahasa **Sequel** dikembangkan IBM sebagai bagian dari **proyek System R** di **IBM San Jose Research Laboratory**.
> > - Kemudian **dinamai ulang menjadi Structured Query Language (SQL)**.
> > - Standar **ANSI dan ISO** untuk SQL:
> >   - **SQL-86**
> >   - **SQL-89**
> >   - **SQL-92**
> >   - **SQL:1999** (nama versi menjadi "Y2K compliant"!)
> >   - **SQL:2003**
> > - Sistem komersial menawarkan **sebagian besar (jika tidak semua) fitur SQL-92**, ditambah subset fitur dari standar yang lebih baru dan **fitur proprietary khusus** masing-masing.
> > - Konsekuensinya: **tidak semua contoh SQL bisa jalan di sistem tertentu** — dialek berbeda (PostgreSQL, MySQL, Oracle, SQL Server) punya penyimpangan sintaks & fungsi.
> >
> > ```mermaid
> > flowchart TD
> >     SR["Sequel / System R<br/>(riset IBM San Jose)"] --> S86["SQL-86<br/>standar ANSI/ISO pertama"]
> >     S86 --> S92["SQL-92<br/>basis fitur sistem komersial"]
> >     S92 --> S99["SQL:1999<br/>trigger, recursive query, tipe user-defined"]
> >     S99 --> S03["SQL:2003<br/>window function, XML, sequence"]
> > ```
> >
> > ### Bagian-Bagian SQL
> >
> > | Bagian | Fungsi |
> > |---|---|
> > | **DML (Data Manipulation Language)** | Query informasi dari basis data; `insert`, `delete`, dan `update` tuple. |
> > | **DDL (Data Definition Language)** | Spesifikasi informasi tentang relasi: skema, tipe atribut, **integrity constraints**, definisi **view**, indeks, info keamanan, struktur penyimpanan fisik. |
> > | **Transaction control** | Perintah untuk menandai **awal dan akhir transaksi**. |
> > | **Embedded SQL** & **dynamic SQL** | Mendefinisikan bagaimana statement SQL **disisipkan ke dalam bahasa pemrograman umum**. |
> > | **Authorization** | Perintah untuk menentukan **hak akses** ke relasi dan view (dibahas ringkas pada topik Data Security). |
> >
> > Dalam materi ini fokusnya adalah **DDL** ([[DDL - Create Table, Tipe Data, dan Perubahan Skema]], [[Integrity Constraints dan Referential Integrity]]), **query DML** ([[Struktur Dasar Query SQL - select-from-where]] dan seterusnya), dan **modifikasi basis data** ([[Modifikasi Basis Data - Insert, Update, Delete]]).

> [!cornell] #### Summary
>
> **Query language** = bahasa untuk meminta informasi dari basis data, dengan tiga kategori: **imperative** (instruksi urutan operasi), **functional** (evaluasi fungsi — mis. *relational algebra*), dan **declarative** (deskripsikan hasil, bukan langkah — mis. *tuple/domain relational calculus*). **SQL memadukan ketiganya**. Sejarah: **Sequel** dari proyek **System R** IBM → dinamai **SQL** → distandardisasi ANSI/ISO (**SQL-86, -89, -92, :1999, :2003**); sistem komersial mengimplementasikan hampir semua **SQL-92** plus ekstensi proprietary, sehingga **contoh tidak selalu portabel**. Bagian SQL: **DML** (query + insert/update/delete), **DDL** (skema, tipe, integrity constraint, view, indeks), **transaction control**, **embedded/dynamic SQL**, dan **authorization**.

> [!ad-libitum]- Additional Information
>
> #### SQL vs relational algebra dalam praktik
>
> Optimizer basis data menerjemahkan query SQL deklaratif menjadi **pohon operator relational algebra** (σ, π, ⨝, ∪, −), lalu memilih rencana eksekusi termurah berdasarkan statistik dan indeks. Memahami relational algebra membantu memprediksi rencana eksekusi dan menulis SQL yang efisien.
>
> #### Standar setelah SQL:2003
>
> Materi berhenti di SQL:2003, tetapi standar berlanjut: **SQL:2006** (XQuery), **SQL:2008/2011** (temporal/system-versioned tables), **SQL:2016** (JSON, polymorphic table functions, `LISTAGG`), **SQL:2023** (`JSON` type, `ANY_VALUE`). Fitur window function (`OVER`, `PARTITION BY`) yang penting untuk analitik masuk sejak SQL:2003.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil satu query kebutuhan sederhana ("nama semua dosen departemen Fisika bergaji > 80.000") dan tuliskan tiga versi: (a) pseudocode imperative (loop manual), (b) ekspresi relational algebra, (c) SQL. Bandingkan panjang & kejelasannya.
> 2. Jalankan satu query yang sama di dua DBMS berbeda (mis. `LIMIT` di PostgreSQL vs `TOP`/`FETCH FIRST` di SQL Server; `||` vs `CONCAT`) dan dokumentasikan perbedaan dialeknya.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 3.1 (Overview of the SQL Query Language), Chapter 6 (Formal Relational Query Languages).
> - Chamberlin, D. & Boyce, R. (1974). *SEQUEL: A Structured English Query Language* — makalah asli.
