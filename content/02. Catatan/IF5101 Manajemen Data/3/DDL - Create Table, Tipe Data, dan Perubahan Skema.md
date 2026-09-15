---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] DDL - Create Table, Tipe Data, dan Perubahan Skema
>
> > ## Questions/Cues
> >
> > - Informasi apa saja tentang relasi yang bisa dispesifikasikan lewat DDL?
> > - Apa sintaks umum `create table`, dan apa arti tiap bagiannya?
> > - Apa saja **tipe domain bawaan** SQL dan kapan memakainya (`char` vs `varchar`, `numeric(p,d)`, `float(n)`)?
> > - Apa itu tipe **large object** (`blob`, `clob`), dan apa yang dikembalikan query untuknya?
> > - Apa beda `create type` dan `create domain`?
> > - Bagaimana mengubah struktur tabel yang sudah ada (`drop table`, `alter table`)?
> >
> > ## Reference Points
> >
> > - IF5101 — Relational Data Model Part 2 (Slides 9-11, 14)
> > - IF5101 — Database System Concepts: SQL (Slides 2.6-2.8, 2.23-2.26)
> > - Silberschatz, Korth, Sudarshan — *Database System Concepts* 7th Ed., Chapter 3.2 & 4.5
>
> > ### Peran DDL
> >
> > **SQL Data-Definition Language (DDL)** memungkinkan spesifikasi informasi tentang relasi, meliputi:
> >
> > - **Skema** setiap relasi.
> > - **Tipe nilai** yang diasosiasikan dengan setiap atribut.
> > - **Integrity constraints** (dibahas pada [[Integrity Constraints dan Referential Integrity]]).
> > - Himpunan **indeks** yang dipelihara untuk setiap relasi.
> > - Informasi **keamanan dan otorisasi** untuk setiap relasi.
> > - **Struktur penyimpanan fisik** relasi di disk.
> >
> > ### Tipe Domain Bawaan SQL
> >
> > | Tipe | Keterangan |
> > |---|---|
> > | **`char(n)`** | String karakter **panjang tetap**, panjang `n` ditentukan pengguna. Nilai lebih pendek di-*pad* dengan spasi. |
> > | **`varchar(n)`** | String karakter **panjang variabel**, panjang **maksimum** `n`. |
> > | **`int`** | Integer (subset berhingga bilangan bulat, *machine-dependent*). |
> > | **`smallint`** | Integer kecil (subset yang lebih kecil, *machine-dependent*). |
> > | **`numeric(p,d)`** | Bilangan **fixed point**, presisi `p` digit total dengan `d` digit di kanan titik desimal. Contoh: `numeric(3,1)` menyimpan `44.5` persis, tetapi **tidak** `444.5` maupun `0.32`. |
> > | **`real`, `double precision`** | Bilangan **floating point** dan double-precision, presisi *machine-dependent*. |
> > | **`float(n)`** | Bilangan floating point, presisi **minimal** `n` digit yang ditentukan pengguna. |
> > | **`date`** | Tanggal: tahun (4 digit), bulan, hari. Contoh: `date '2005-7-27'`. |
> > | **`time`** | Waktu dalam sehari: jam, menit, detik. Contoh: `time '09:00:30'`, `time '09:00:30.75'`. |
> > | **`timestamp`** | `date` + `time`. Contoh: `timestamp '2005-7-27 09:00:30.75'`. |
> > | **`interval`** | Periode waktu. Contoh: `interval '1' day`. Selisih dua nilai date/time/timestamp menghasilkan `interval`; `interval` bisa ditambahkan ke date/time/timestamp. |
> >
> > Panduan cepat: pakai **`char(n)`** hanya untuk string yang benar-benar berpanjang tetap (mis. kode 5 karakter); **`varchar(n)`** untuk sisanya; **`numeric`** (bukan `float`) untuk **uang** agar tak ada galat pembulatan.
> >
> > ### Large-Object Types
> >
> > **Large object** (foto, video, file CAD, dll.) disimpan sebagai:
> >
> > - **`blob`** — *binary large object*: koleksi besar **data biner tak diinterpretasi** (interpretasinya diserahkan ke aplikasi di luar DBMS).
> > - **`clob`** — *character large object*: koleksi besar **data karakter**.
> >
> > Ketika sebuah query mengembalikan large object, yang dikembalikan adalah **pointer**, bukan objek besarnya sendiri.
> >
> > ### Create Table Construct
> >
> > Sebuah relasi SQL didefinisikan dengan perintah **`create table`**:
> >
> > ```sql
> > create table r (
> >     A1  D1,
> >     A2  D2,
> >     ...,
> >     An  Dn,
> >     <integrity-constraint1>,
> >     ...,
> >     <integrity-constraintk>
> > );
> > ```
> >
> > - `r` — nama relasi.
> > - setiap `Ai` — nama atribut dalam skema `r`.
> > - `Di` — tipe data nilai pada domain atribut `Ai`.
> > - `<integrity-constraint>` — konstrain integritas untuk tabel.
> >
> > Contoh:
> >
> > ```sql
> > create table instructor (
> >     ID         char(5),
> >     name       varchar(20),
> >     dept_name  varchar(20),
> >     salary     numeric(8,2),
> >     primary key (ID)
> > );
> > ```
> >
> > ### User-Defined Types dan Domains
> >
> > **`create type`** membuat **tipe yang didefinisikan pengguna**:
> >
> > ```sql
> > create type Dollars as numeric(12,2) final;
> >
> > create table department (
> >     dept_name  varchar(20),
> >     building   varchar(15),
> >     budget     Dollars
> > );
> > ```
> >
> > **`create domain`** (SQL-92) membuat **domain type** yang didefinisikan pengguna. **Tipe dan domain mirip**, tetapi **domain dapat memiliki konstrain** (seperti `not null` atau `check`):
> >
> > ```sql
> > create domain person_name char(20) not null;
> >
> > create domain degree_level varchar(10)
> >     constraint degree_level_test
> >     check (value in ('Bachelors', 'Masters', 'Doctorate'));
> > ```
> >
> > ### Mengubah Struktur Tabel
> >
> > | Perintah | Fungsi |
> > |---|---|
> > | **`drop table r`** | Menghapus tabel `r` **beserta skema dan seluruh isinya**. (Bandingkan `delete from r` yang hanya mengosongkan isi, skema tetap.) |
> > | **`alter table r add A D`** | Menambah atribut `A` bertipe `D` ke relasi `r`. **Semua tuple yang ada diberi nilai `null`** untuk atribut baru. |
> > | **`alter table r drop A`** | Menghapus atribut `A` dari relasi `r`. **Tidak didukung banyak DBMS.** |

> [!cornell] #### Summary
>
> **DDL** menspesifikasikan skema relasi, tipe atribut, integrity constraint, indeks, otorisasi, dan penyimpanan fisik. Tipe domain bawaan: **`char(n)`** (panjang tetap) vs **`varchar(n)`** (maks `n`); **`int`/`smallint`**; **`numeric(p,d)`** fixed-point (`p` digit, `d` di belakang koma — presisi eksak, cocok untuk uang); **`real`/`double precision`/`float(n)`** floating point; **`date`/`time`/`timestamp`/`interval`** (selisih date → interval). **Large object**: **`blob`** (biner) dan **`clob`** (karakter); query mengembalikan **pointer**, bukan objeknya. **`create table r (Ai Di, ..., <constraint>)`** mendefinisikan relasi. **`create type`** membuat tipe user-defined; **`create domain`** serupa tetapi **bisa diberi konstrain** (`not null`, `check`). Ubah skema: **`drop table`** (hapus total), **`alter table ... add`** (kolom baru → semua baris `null`), **`alter table ... drop`** (sering tak didukung).

> [!ad-libitum]- Additional Information
>
> #### `char` vs `varchar` dan jebakan perbandingan
>
> Nilai `char(n)` di-*pad* spasi sampai panjang `n`, sehingga `'abc '::char(5) = 'abc'` bisa bernilai true tergantung aturan *padding* dialek — sumber bug halus. Praktik modern: default ke `varchar` (atau `text` di PostgreSQL, yang tanpa batas dan sama cepatnya), pakai `char(n)` hanya untuk kode benar-benar tetap. `numeric` tanpa argumen di beberapa dialek berarti presisi arbitrer.
>
> #### BLOB di era object storage
>
> Menyimpan file besar sebagai `blob` di dalam DBMS membebani backup dan buffer pool. Pola umum sekarang: simpan file di **object storage** (S3/GCS) dan hanya simpan **URL/kunci** + metadata di tabel. `blob`/`clob` masih berguna untuk data yang wajib transaksional bersama baris-nya.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat tabel `payment(id, amount numeric(10,2), amount_float real)`. Sisipkan `0.1` sepuluh kali ke kedua kolom lewat akumulasi, lalu bandingkan `SUM` keduanya untuk melihat galat floating point.
> 2. Di PostgreSQL, buat `create domain positive_int as int check (value > 0)` dan pakai di sebuah tabel; coba `insert` nilai negatif dan amati pesan errornya. Bandingkan dengan menaruh `check` langsung di kolom.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 3.2 (SQL Data Definition), 4.5 (Data Types and Schemas).
> - Dokumentasi PostgreSQL — "Data Types" dan "CREATE DOMAIN".
