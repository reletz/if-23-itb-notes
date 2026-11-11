---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Keterbatasan Database Relasional dan Lahirnya NoSQL
>
> > ## Questions/Cues
> >
> > - Apa saja karakteristik utama **database relasional** (SQL, ACID, abstraksi layer fisik)?
> > - Mengapa relasional mulai kesulitan menghadapi **aplikasi web skala besar**?
> > - Mengapa solusi seperti *upgrade* hardware dan denormalisasi tidak cukup?
> > - Apa arti **NoSQL**: "No SQL" atau "Not Only SQL"?
> > - Apa saja karakteristik pembeda NoSQL dibanding relasional?
> >
> > ## Reference Points
> >
> > - IF5101 — Introduction to NoSQL Databases (Pages 2-14)
> > - IBM — *What is NoSQL?* (ibm.com/topics/nosql-databases)
>
> > ### Karakteristik Database Relasional
> >
> > Database relasional menyimpan data dalam **relasi (tabel)** dan **atribut (kolom)**; hubungan antar data dinyatakan lewat **foreign key**. Ciri-ciri utamanya:
> >
> > - **SQL** sebagai bahasa standar (ISO/IEC 9075, sejak 1987 dan terus berkembang: referential integrity 1989, SQL2 1992, user-defined types 1999, SQL/XML 2003, hingga *system-versioned tables* 2011).
> > - **DML** (`select`, `insert`, `update`, `delete`, agregasi, fungsi/prosedur, kontrol transaksi eksplisit) dan **DDL** (skema didefinisikan di awal, `create`/`alter`/`drop`, constraint PK/FK, trigger, *stored modules*, kontrol akses).
> > - **Abstraksi layer fisik**: aplikasi hanya menyatakan *apa* yang diinginkan, bukan *bagaimana*; *query optimizer* yang memilih cara eksekusi. Layer fisik (misalnya menambah index atau memakai *in-memory database*) bisa berubah tanpa mengubah aplikasi.
> > - **Transaksi ACID**: **Atomic** (semua atau tidak sama sekali), **Consistent** (dari satu state konsisten ke state konsisten lain, berdasarkan constraint), **Isolated** (perubahan tidak terlihat sebelum commit), **Durable** (hasil commit bertahan walau terjadi kegagalan).
> >
> > Produk komersial (IBM DB2, Oracle, SQL Server, Sybase) dan open source (MySQL, PostgreSQL) menopang sebagian besar ekonomi dunia.
> >
> > ### Mengapa Relasional Mulai Kewalahan
> >
> > Relasional berhasil mengatasi kelemahan *flat file*, database hierarkis, dan network. Namun perusahaan web menemukan bahwa melayani **jutaan pengguna web** berbeda jauh dari melayani segelintir pengguna bisnis pada satu aplikasi. Aplikasi web menuntut:
> >
> > - **volume baca/tulis yang sangat besar**,
> > - **latensi respons rendah**,
> > - **high availability**.
> >
> > Teknik lama tidak lagi memadai pada skala ini:
> >
> > | Upaya | Keterbatasan |
> > | --- | --- |
> > | Upgrade CPU, memori, storage lebih cepat (*scale up*) | Hanya efektif sampai titik tertentu |
> > | Redesain skema / **denormalisasi** | Mengorbankan konsistensi |
> > | Banyak server relasional | Operasi menjadi kompleks |
> >
> > ```mermaid
> > flowchart LR
> >     W["Aplikasi web skala besar"] --> R1["Volume read/write besar"]
> >     W --> R2["Latensi rendah"]
> >     W --> R3["High availability"]
> >     R1 --> X["Relasional: scale up<br/>terbatas"]
> >     R2 --> Y["Denormalisasi<br/>risiko inkonsistensi"]
> >     R3 --> Z["Multi-server<br/>operasi kompleks"]
> >     X --> N["NoSQL"]
> >     Y --> N
> >     Z --> N
> > ```
> >
> > ### Definisi NoSQL
> >
> > Selama satu dekade terakhir disadari bahwa **tidak semua masalah** manajemen/analisis data paling cocok diselesaikan dengan DBMS relasional. Nama **NoSQL** awalnya berarti "tidak memakai relasional/SQL", tetapi kini dipahami sebagai **"Not Only SQL"**. Menurut IBM, NoSQL adalah pendekatan desain database yang memungkinkan penyimpanan dan query data **di luar struktur tabel relasional**; ia tetap dapat menyimpan data yang biasa ada di RDBMS, hanya dengan cara berbeda. Pilihan relasional vs non-relasional bersifat **kontekstual**, bergantung pada *use case*.
> >
> > Contoh produk/proyek: BigTable, Cassandra, CouchDB, Hadoop & HBase, MongoDB, Cloud Firestore, dan lain-lain.
> >
> > ### Karakteristik Pembeda NoSQL
> >
> > - **Volume data besar** (*big data*).
> > - **Replikasi dan distribusi yang scalable**, hingga ribuan mesin yang tersebar di seluruh dunia.
> > - Query harus **cepat**; beban kerja umumnya **banyak query, sedikit update**.
> > - **Insert dan update asinkron**.
> > - **Schema-less**.
> > - Mengikuti prinsip **BASE** dan dibatasi **CAP Theorem** (lihat [[BASE dan CAP Theorem]]).
> > - Banyak dikembangkan secara **open source**.

> [!cornell] #### Summary
>
> **Database relasional** menawarkan model tabel, **SQL**, abstraksi layer fisik, dan transaksi **ACID**, tetapi sulit memenuhi kebutuhan aplikasi web berskala besar (volume baca/tulis tinggi, **latensi rendah**, **high availability**) karena *scale up* terbatas, **denormalisasi** mengorbankan konsistensi, dan multi-server relasional kompleks. **NoSQL** ("Not Only SQL") muncul sebagai pendekatan di luar struktur relasional dengan ciri **big data, replikasi terdistribusi, schema-less, asinkron, BASE, dan CAP**.

> [!ad-libitum]- Additional Information
>
> #### Scale up vs scale out
>
> Relasional tradisional condong ke **vertical scaling** (mesin lebih kuat), sedangkan NoSQL dirancang untuk **horizontal scaling** (menambah node murah). Beberapa sistem *NewSQL* (CockroachDB, Google Spanner) mencoba menggabungkan SQL/ACID dengan skala horizontal, sehingga batas relasional vs NoSQL tidak sepenuhnya kaku.
>
> #### Polyglot persistence
>
> Praktik modern jarang memilih satu jenis database saja. Satu sistem dapat memakai relasional untuk transaksi keuangan, key-value untuk cache sesi, dan graph untuk rekomendasi (lihat [[Jenis-jenis NoSQL Database]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil satu aplikasi yang Anda kenal (marketplace, media sosial) dan tentukan bagian mana yang cocok dengan relasional dan mana yang cocok dengan NoSQL; jelaskan alasannya.
> 2. Jalankan PostgreSQL dan Redis secara lokal, lalu bandingkan waktu 100.000 operasi baca berdasarkan primary key.
>
> #### Bacaan Lanjutan
>
> - Sullivan, D. *NoSQL for Mere Mortals*. Addison-Wesley, 2015.
> - Meier, A. & Kauffmann, M. *SQL and NoSQL Databases*. Springer Vieweg, 2019.
> - Hills, T. *NoSQL and SQL Data Modeling*. Technics Publications, 2016.
