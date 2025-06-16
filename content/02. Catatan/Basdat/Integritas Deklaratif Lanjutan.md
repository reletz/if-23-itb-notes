---
type: Note 
cssclasses:
- cornell-notes
---

_Back to_ [[Basdat]]

> [!cornell] Integrity Constraints - Declarative Approach
> 
> > ## Questions/Cues
> > 
> > - Apa itu Integrity Constraints?
> > - Mengapa constraint penting?
> > - Bagaimana klasifikasi constraint?
> > - Apa perbedaan Type vs Attribute constraint?
> > - Kapan constraint dicek?
> > - Apa bedanya State vs Transition constraint?
> > - Bagaimana cara kerja Keys?
> > - Apa itu Foreign Key?
> > - Bagaimana Referential Actions bekerja?
> > - Apa saja jenis constraint di SQL?
> > 
> > ## Reference Points
> > 
> > - PDF: Integrity-Constraints.pdf
> > - Halaman 4-21 (Konsep Dasar)
> > - Halaman 22-30 (SQL Implementation)
>
> > ### Definisi dan Pentingnya Integrity Constraints
> > 
> > **Integrity Constraints** adalah aturan yang menjaga **konsistensi data** dalam database. Constraints tidak bisa memastikan kebenaran atau keakuratan data, tetapi melindungi dari kerusakan tidak sengaja dengan memastikan perubahan yang diotorisasi tidak mengakibatkan hilangnya konsistensi data.
> > 
> > **Contoh constraint**:
> > 
> > - Rekening tabungan harus memiliki saldo > $10,000
> > - Gaji karyawan bank minimal $4.00 per jam
> > - Customer harus memiliki nomor telepon (non-null)
> > 
> > ### Klasifikasi Integrity Constraints
> > 
> > #### 1. Type Constraints
> > 
> > Menentukan nilai legal untuk suatu **tipe data**:
> > 
> > 
> > ```sql
> > TYPE WEIGHT POSSREP (RATIONAL)
> > CONSTRAINT THE_WEIGHT (WEIGHT) > 0.0;
> > ```
> > 
> > - Dicek segera saat eksekusi selector
> > 
> > #### 2. Attribute Constraints
> > 
> > Deklarasi bahwa atribut tertentu dari relasi tertentu adalah dari tipe tertentu:
> > 
> > 
> > ```sql
> > VAR S BASE RELATION (
> >     S# S#,
> >     SNAME SNAME, ... );
> > ```
> > 
> > - Bagian dari definisi atribut
> > - Dapat diidentifikasi melalui nama atribut
> > 
> > #### 3. Relation Constraints
> > 
> > Constraint pada **relasi individual**, dinyatakan hanya dalam relasi yang bersangkutan:
> > 
> > 
> > ```sql
> > CONSTRAINT SC5
> > IS_EMPTY (S WHERE CITY = 'London' and status <> 20);
> > ```
> > 
> > - Selalu dicek segera (immediately)
> > 
> > #### 4. Database Constraints
> > 
> > Constraint yang **menghubungkan dua atau lebih relasi** berbeda:
> > 
> > 
> > ```sql
> > CONSTRAINT DBC1
> > IS_EMPTY ( (S JOIN SP)
> >     WHERE STATUS < 20 AND QTY > QTY(500) );
> > ```
> > 
> > - **Tidak bisa dicek segera**, harus ditunda sampai akhir transaksi
> > - Jika dilanggar di akhir transaksi → rollback
> > 
> > ### State vs. Transition Constraints
> > 
> > #### State Constraints
> > 
> > Berhubungan dengan **kondisi konsisten** database pada satu titik waktu.
> > 
> > #### Transition Constraints
> > 
> > Berhubungan dengan **transisi legal** dari satu state benar ke state benar lainnya.
> > 
> > **Contoh**: Perubahan status pernikahan
> > 
> > - **Valid**: never married → married, married → widowed
> > - **Invalid**: never married → widowed, widowed → divorced
> > 
> > **Implementasi**:
> > 
> > sql
> > 
> > ```sql
> > CONSTRAINT TRC1 IS_EMPTY
> > ( ( ( S' (S#, STATUS) RENAME STATUS AS STATUS')
> >     JOIN S (S#, STATUS) )
> >   WHERE STATUS' > STATUS );
> > ```
> > 
> > - `S'` merujuk relasi sebelum update
> > 
> > ### Keys dalam Relational Model
> > 
> > #### Candidate Keys
> > 
> > Set atribut K adalah **candidate key** untuk relasi R jika memiliki kedua properti:
> > 
> > 1. **Uniqueness**: Tidak ada dua tuple berbeda dengan nilai K yang sama
> > 2. **Irreducibility**: Tidak ada subset proper dari K yang memiliki properti uniqueness
> > 
> > #### Primary Keys vs. Alternate Keys
> > 
> > - **Primary Key**: Candidate key yang dipilih sebagai key utama relasi
> > - **Alternate Keys**: Candidate key lainnya yang tidak dipilih sebagai primary key
> > - **Superkey**: Superset dari candidate key
> > 
> > #### Foreign Keys
> > 
> > Set atribut FK dalam relasi R2 adalah **foreign key** jika:
> > 
> > - Ada relasi R1 dengan candidate key CK
> > - Setiap nilai FK di R2 identik dengan nilai CK di beberapa tuple di R1
> > 
> > **Karakteristik Foreign Key**:
> > 
> > - Bisa simple atau composite
> > - Nilai FK merepresentasikan **referensi** ke tuple yang mengandung matching candidate key
> > - **Referential Integrity Problem**: Memastikan database tidak berisi invalid foreign key values
> > 
> > ### Referential Actions
> > 
> > Tindakan yang diambil ketika terjadi operasi yang bisa melanggar referential integrity:
> > 
> > 1. **CASCADE**: Delete/update menyebar ke tuple terkait
> > 2. **RESTRICT**: Delete/update dibatasi agar tidak melanggar constraint
> > 3. **NO ACTION**: Delete/update dilakukan sesuai permintaan
> > 
> > **Ingat**: Database updates selalu **atomic**
> > 
> > ### SQL Implementation
> > 
> > #### Single Relation Constraints
> > 
> > 
> > ```sql
> > -- NOT NULL
> > name varchar(20) not null
> > budget numeric(12,2) not null
> > 
> > -- UNIQUE
> > unique(A1, A2, ..., Am)
> > 
> > -- CHECK
> > check (semester in ('Fall', 'Winter', 'Spring', 'Summer'))
> > ```
> > 
> > #### Referential Integrity dengan Cascading Actions
> > 
> > 
> > ```sql
> > create table course (
> >     course_id char(5) primary key,
> >     title varchar(20),
> >     dept_name varchar(20) references department
> > )
> > 
> > create table course (
> >     ...
> >     dept_name varchar(20),
> >     foreign key (dept_name) references department
> >         on delete cascade
> >         on update cascade,
> >     ...
> > )
> > ```
> > 
> > #### Alternatif Actions
> > 
> > - `SET NULL`: Set nilai foreign key menjadi NULL
> > - `SET DEFAULT`: Set nilai foreign key ke nilai default

> [!cornell] #### Summary
> 
> - **Integrity Constraints** menjaga konsistensi data melalui 4 level: Type, Attribute, Relation, dan Database constraints
> - **State constraints** mengatur kondisi konsisten, sedangkan **Transition constraints** mengatur perubahan legal antar state
> - **Keys** (candidate, primary, foreign) memberikan mekanisme addressing dan referential integrity, dengan **Referential Actions** (CASCADE, RESTRICT, NO ACTION) menangani pelanggaran constraint

> [!ad-libitum]- Additional Information (Optional)
> 
> #### Informasi Tambahan:
> 
> - **Referential Diagram**: Dapat merepresentasikan constraint referensial antar relasi menggunakan diagram panah
> - **Self-Referencing Relation**: Relasi yang foreign key-nya merujuk ke candidate key dirinya sendiri, bisa menyebabkan referential cycle
> - **Deferred Constraint Checking**: Database constraint harus ditunda sampai akhir transaksi untuk menghindari intermediate violations
> - **Complex Check Clauses**: Subquery dalam check clause tidak didukung oleh sebagian besar database, sehingga perlu menggunakan triggers sebagai alternatif