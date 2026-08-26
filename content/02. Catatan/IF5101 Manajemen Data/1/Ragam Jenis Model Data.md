---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Ragam Jenis Model Data
>
> > ## Questions/Cues
> >
> > - Apa tiga konsep dasar yang dipakai model ER?
> > - Bagaimana model relasional merepresentasikan data dan relasi sekaligus?
> > - Apa yang khas dari model berorientasi objek dan model fact-based?
> > - Untuk kebutuhan apa model dimensional dirancang, dan apa dua variannya?
> > - Empat tipe utama basis data NoSQL dan kapan masing-masing dipakai?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Modeling using ER (Slides 8-12)
>
> > ### Entity Relationship (ER) dan Relational Model
> >
> > **Entity Relationship (ER) Model** adalah **kumpulan objek dasar yang disebut entitas, beserta relasi (relationship) di antara objek-objek tersebut**. ER dikembangkan untuk **memfasilitasi perancangan basis data** dengan memungkinkan spesifikasi *enterprise schema*. Konsep detailnya dibahas pada catatan berikutnya di payung ini.
> >
> > **Relational Model** adalah **kumpulan tabel (relations)** yang merepresentasikan **baik data maupun relasi antar-data** sekaligus — tidak ada konstruk terpisah untuk "relationship" seperti pada ER; keterhubungan dinyatakan lewat nilai kolom yang sama (foreign key). Model relasional menjadi fondasi RDBMS dan dibahas lebih lanjut pada materi minggu berikutnya.
> >
> > ### Object-Oriented Data Model
> >
> > **Object-oriented data model** adalah **adaptasi paradigma pemrograman berorientasi objek ke sistem basis data**. Data dimodelkan sebagai objek dengan atribut dan perilaku (method), mendukung pewarisan (inheritance) dan enkapsulasi. Notasi yang umum dipakai adalah **UML Class Diagram**. Model ini cocok ketika struktur data kompleks dan erat dengan kode aplikasi OOP.
> >
> > ### Fact-Based Data Models
> >
> > **Fact-based data models** dibangun dari **analisis verbalisasi natural** yang mungkin muncul dalam domain bisnis — yaitu kalimat fakta apa adanya dari pengguna ("Mahasiswa dengan NIM X mengambil mata kuliah Y"). Dua metode utamanya:
> >
> > - **ORM (Object-Role Modeling)** dan penerusnya **ORM2**
> > - **FCO-IM (Fully Communication Oriented Information Modeling)**
> >
> > Keunggulannya: model dibangun dan diverifikasi langsung dengan bahasa alami bersama pemangku kepentingan, sehingga minim kesalahan interpretasi. ORM tidak membedakan atribut vs entitas seketat ER — semuanya diperlakukan sebagai peran (role) dalam fakta.
> >
> > ### Dimensional Data Model
> >
> > **Dimensional data model** dirancang untuk **menangkap pertanyaan bisnis yang berfokus pada suatu proses bisnis tertentu**. Data distrukturkan untuk **mengoptimalkan query dan analisis data dalam jumlah besar** — orientasinya analitik (OLAP), bukan transaksional (OLTP). Dua jenis model:
> >
> > - **Star schema** — satu tabel **fact** di tengah dikelilingi tabel-tabel **dimension** yang ter-denormalisasi (bentuk bintang).
> > - **Snowflake schema** — seperti star schema, tetapi tabel dimension dinormalisasi menjadi sub-dimensi bertingkat (bentuk kepingan salju).
> >
> > ### NoSQL
> >
> > **NoSQL** adalah nama untuk **kategori basis data yang dibangun di atas teknologi non-relasional**. Modelnya **sangat bergantung pada struktur fisik** basis data yang mendasarinya (berbeda dengan relasional yang menyembunyikan detail fisik). Empat tipe utama:
> >
> > | Tipe | Bentuk data | Contoh penggunaan |
> > |---|---|---|
> > | **Key-value** | Pasangan kunci → nilai buram | Cache, session store |
> > | **Document** | Dokumen (mis. JSON) per record, skema fleksibel | Katalog produk, profil pengguna |
> > | **Column-based** | Data dikelompokkan per kolom / column family | Time-series, data analitik lebar |
> > | **Graph** | Simpul (node) dan sisi (edge) sebagai warga kelas satu | Jejaring sosial, rekomendasi, fraud detection |
> >
> > Contoh dokumen pada basis data document: `{ 'employeeName': 'Janice Collins', 'department': 'Software engineering', 'startDate': '10-Feb-2010', 'pastProjectCodes': [189847, 187731, 176533, 154812] }` — perhatikan nilai array yang tersimpan langsung dalam satu dokumen (tidak perlu tabel join terpisah).
> >
> > ```mermaid
> > flowchart LR
> >     DM["Model Data"]
> >     DM --> ER["Entity Relationship (ER)"]
> >     DM --> REL["Relational (tabel)"]
> >     DM --> OO["Object-Oriented (UML)"]
> >     DM --> FB["Fact-Based"]
> >     DM --> DIM["Dimensional"]
> >     DM --> NOSQL["NoSQL"]
> >     FB --> ORM["ORM / ORM2"]
> >     FB --> FCO["FCO-IM"]
> >     DIM --> STAR["Star schema"]
> >     DIM --> SNOW["Snowflake schema"]
> >     NOSQL --> KV["Key-value"]
> >     NOSQL --> DOC["Document"]
> >     NOSQL --> COL["Column-based"]
> >     NOSQL --> GR["Graph"]
> > ```

> [!cornell] #### Summary
>
> Terdapat beragam **model data**, masing-masing dengan konteks pemakaian. **ER model** memandang dunia sebagai **entitas + relationship** dan memfasilitasi perancangan basis data; **relational model** merepresentasikan data dan relasi sama-sama sebagai **tabel**. **Object-oriented data model** mengadaptasi paradigma OOP (notasi **UML Class Diagram**). **Fact-based models** (**ORM/ORM2**, **FCO-IM**) dibangun dari verbalisasi bahasa alami domain bisnis. **Dimensional model** dioptimalkan untuk **query analitik volume besar** dengan varian **star** dan **snowflake schema**. **NoSQL** mencakup basis data non-relasional yang bergantung pada struktur fisik, dengan empat tipe: **key-value, document, column-based, dan graph**.

> [!ad-libitum]- Additional Information
>
> #### OLTP vs OLAP
>
> Model **ER/relational** biasanya melayani beban **OLTP** (banyak transaksi kecil, tulis-baca, butuh normalisasi untuk konsistensi). Model **dimensional** melayani **OLAP** (query agregat besar, jarang tulis, denormalisasi demi kecepatan baca). Data warehouse modern kerap memakai ER untuk *staging* lalu dimensional untuk *presentation layer*.
>
> #### Teorema CAP dan NoSQL
>
> Basis data NoSQL sering muncul dalam diskusi **CAP theorem** (Consistency, Availability, Partition tolerance — pilih dua saat partisi jaringan). Banyak sistem NoSQL memilih **AP** dengan *eventual consistency*, berbeda dari RDBMS yang cenderung **CP** dengan transaksi ACID. Materi NoSQL dibahas lebih detail beberapa minggu berikutnya di mata kuliah ini.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil satu skenario (mis. toko online). Modelkan bagian katalog produk dalam tiga cara: skema relasional ternormalisasi, dokumen MongoDB, dan star schema untuk laporan penjualan. Bandingkan kemudahan query "total penjualan per kategori per bulan".
> 2. Pelajari satu tools ORM (mis. NORMA untuk Visual Studio) dan bangun model fact-based kecil dari 10 kalimat fakta bahasa Indonesia, lalu turunkan skema relasionalnya.
>
> #### Bacaan Lanjutan
>
> - DAMA-DMBOK2, Chapter 5 — bagian "Data Modeling Schemes".
> - Dan Sullivan. *NoSQL for Mere Mortals*, 2015.
> - Rick Sherman. *Business Intelligence Guidebook*, 2015 — bab star/snowflake schema.
> - Terry Halpin. *Information Modeling and Relational Databases* (ORM/ORM2).
