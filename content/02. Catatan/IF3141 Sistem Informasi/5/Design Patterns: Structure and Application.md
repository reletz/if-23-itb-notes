---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Sistem Informasi]]

> [!cornell] Design Patterns: Structure and Application
>
> > ## Questions/Cues
> >
> > - Mengapa standar teknis penting dalam desain sistem?
> > - Bagaimana prinsip coupling dan cohesion memengaruhi desain modular?
> > - Apa perbedaan model database hierarkis vs relasional?
> > - Teknik apa yang digunakan dalam normalisasi data?
> > - Bagaimana lifecycle pengembangan memengaruhi desain?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Design (Slides 4-9, 24-27, 34-38)
> > - IF3141 Sistem Design (Slides 31-33, 40-42)
>
> > ### Standar Teknis dalam Desain Sistem
> >
> > Standar teknis berfungsi sebagai kerangka kerja yang memastikan konsistensi dan interoperabilitas dalam desain sistem. Terdapat dua jenis standar utama: standar industri (seperti XML untuk format data, SOAP/REST untuk protokol komunikasi) dan standar organisasi (seperti panduan antarmuka pengguna dan laporan). Contoh konkret adalah penggunaan UML sebagai standar pemodelan yang memungkinkan tim pengembang berkolaborasi dengan notasi visual yang seragam.
> >
> > Penerapan standar ISO seperti 27001 untuk keamanan informasi membantu melindungi aset digital melalui kontrol sistematis. Dalam praktiknya, standar ini diterjemahkan ke dalam desain autentikasi pengguna dan enkripsi data. Tantangan utamanya adalah menjaga keseimbangan antara kepatuhan standar dan fleksibilitas desain, terutama ketika menghadapi perubahan kebutuhan bisnis.
> >
> > ### Prinsip Desain Modular
> >
> > Konsep modularitas didasarkan pada pembagian sistem menjadi komponen-komponen independen dengan antarmuka jelas. Dua prinsip kunci adalah **coupling** (tingkat ketergantungan antar modul) dan **cohesion** (keterkaitan fungsi dalam satu modul). Modul ideal memiliki coupling rendah dan cohesion tinggi, seperti komponen autentikasi yang bisa bekerja mandiri namun terintegrasi melalui API.
> >
> > Analoginya seperti mobil: modul mesin, rem, dan kelistrikan saling berinteraksi melalui antarmuka standar (konektor kabel, mounting bracket) namun bisa dikembangkan secara terpisah. Dalam implementasi, teknik **black-box specification** digunakan dimana detail internal modul disembunyikan, hanya menyediakan kontrak fungsional melalui input-output. Pendekatan **top-down** (dari gambaran sistem ke detail) dan **bottom-up** (dari komponen kecil ke sistem utuh) memberikan fleksibilitas dalam skenario pengembangan berbeda.
> >
> > ### Model Database dalam Desain Sistem
> >
> > Terdapat empat model database utama dengan karakteristik unik:
> >
> > 1. **Hierarkis**: Data diatur seperti pohon dengan relasi parent-child (contoh: XML, Windows Registry). Cocok untuk data dengan struktur tetap namun kaku dalam menangani relasi kompleks.
> > 2. **Jaringan**: Memungkinkan node memiliki multiple parents (contoh: IDMS). Lebih fleksibel daripada hierarkis tetapi kompleks dalam implementasi.
> > 3. **Relasional**: Data disimpan dalam tabel terhubung (contoh: MySQL). Menggunakan SQL untuk query dan mendukung ACID transactions. Keunggulannya adalah fleksibilitas melalui normalisasi.
> > 4. **Berorientasi Objek**: Menyimpan data sebagai objek dengan metode (contoh: MongoDB). Cocok untuk aplikasi kompleks dengan inheritance dan polymorphism. Teknik **object-relational mapping** (ORM) menjadi jembatan antara OOP dan database relasional.
> >
> > ### Teknik Normalisasi Data
> >
> > Normalisasi adalah proses mengorganisasi struktur data untuk meminimalkan redundansi melalui serangkaian bentuk normal:
> >
> > - **1NF**: Menghilangkan grup berulang (contoh: memisahkan alamat multi-baris ke kolom terpisah)
> > - **2NF**: Menghapus ketergantungan parsial dengan memisahkan data ke tabel terkait
> > - **3NF**: Menghilangkan ketergantungan transitif dimana atribut non-kunci tidak bergantung pada atribut non-kunci lain
> >
> > Contoh praktis: database penjualan yang awalnya menyimpan semua informasi pelanggan dan pesanan dalam satu tabel, dipecah menjadi tabel Pelanggan, Pesanan, dan Detail_Pesanan. Hasilnya adalah integritas data lebih baik dan efisiensi penyimpanan. Kunci unik (seperti kode pelanggan) dirancang dengan mempertimbangkan **uniqueness**, **stability**, dan **expandability**.
> >
> > ### Pengaruh Lifecycle pada Desain
> >
> > Model pengembangan sistem menentukan pendekatan desain:
> >
> > - **Waterfall**: Desain komprehensif dibuat setelah finalisasi requirements, cocok untuk proyek dengan kebutuhan stabil tetapi kurang fleksibel terhadap perubahan.
> > - **V-Model**: Memisahkan desain sistem level tinggi dan modul, dengan penekanan pada keselarasan dengan fase testing.
> > - **Incremental/Iterative**: Desain berkembang secara bertahap (contoh: Agile). Setiap iterasi menghasilkan subset fungsionalitas lengkap, memungkinkan adaptasi cepat tetapi memerlukan integrasi berkala.
> >
> > Tantangan utama adalah memilih pendekatan yang sesuai dengan kompleksitas proyek dan ketersediaan stakeholder. Dalam praktik modern, kombinasi model sering digunakan, seperti desain antarmuka dibuat iteratif sementara desain database menggunakan pendekatan waterfall.

> [!cornell] #### Summary
>
> **Desain sistem** merupakan proses transformasi kebutuhan fungsional menjadi solusi teknis yang mempertimbangkan **standar compliance**, **modularitas**, dan **integritas data**. Pemilihan **model database** (hierarkis, jaringan, relasional, atau OO) ditentukan oleh kompleksitas data dan kebutuhan aplikasi. Prinsip **coupling rendah** dan **cohesion tinggi** memastikan maintainability sistem, sementara **normalisasi** mengoptimalkan struktur data. **Lifecycle pengembangan** yang berbeda (Waterfall, V-Model, Agile) memengaruhi granularitas dan fleksibilitas desain, dengan trade-off antara prediktabilitas dan adaptabilitas.

> [!ad-libitum]- Additional Information
>
> #### Analisis Kompleksitas Desain Modular
>
> Kompleksitas desain modular dapat diukur menggunakan metrik seperti:
>
> - **Cyclomatic Complexity**: Menghitung jalur eksekusi independen dalam modul (nilai >10 menunjukkan risiko tinggi)
> - **Halstead Volume**: Mengukur usaha pengembangan berdasarkan operator dan operand
> - **Maintainability Index**: Kombinasi volume Halstead, kompleksitas cyclomatic, dan LOC
>
> Studi kasus: sistem e-commerce dengan 50 modul menunjukkan bahwa modul dengan cohesion <70% cenderung memiliki bug 2x lebih banyak. Tools seperti SonarQube dapat memantau metrik ini secara real-time.
>
> #### Pola Desain untuk Keamanan Sistem
>
> Beberapa pola arsitektural yang relevan:
>
> - **Gatekeeper Pattern**: Mengisolasi akses resource melalui checkpoint terpusat
> - **Role-Based Access Control (RBAC)**: Memberikan hak akses berdasarkan peran pengguna
> - **Audit Logger**: Mencatat semua aktivitas kritis untuk forensik digital
>
> Implementasi RBAC mencakup tabel `Users`, `Roles`, dan `Permissions` dengan relasi many-to-many. Teknik attribute-based encryption (ABE) meningkatkan keamanan data sensitif.
>
> #### Optimasi Query Database
>
> Teknik lanjutan untuk performa query:
>
> - **Indexing**: Membuat B-tree index pada kolom yang sering di-query
> - **Query Rewriting**: Mengubah query menjadi bentuk lebih efisien
> - **Materialized Views**: Menyimpan hasil query kompleks sebagai tabel fisik
> - **Partitioning**: Membagi tabel besar berdasarkan range/waktu
>
> Contoh: query JOIN pada 10 juta row bisa dipercepat 100x dengan kombinasi index covering dan batch processing.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun sistem manajemen perpustakaan dengan menerapkan:
> - Model database relasional ternormalisasi
> - Modularitas menggunakan REST API
> - RBAC untuk petugas/pengguna
> - Unit test dengan coverage >80%
> 2. Implementasikan pola CQRS (Command Query Responsibility Segregation) untuk aplikasi logistik dengan:
> - Write database terpisah dari read database
> - Event sourcing untuk audit trail
> - Cache Redis untuk query sering diakses
>
> #### Alat dan Framework Rekomendasi
>
> - **Database Design**: MySQL Workbench, pgModeler
> - **Modelling Tools**: Lucidchart, Enterprise Architect
> - **Code Quality**: SonarQube, ESLint
> - **Testing**: Postman (API), Selenium (UI)
> - **ORM**: Hibernate (Java), Entity Framework (.NET)
>
> #### Bacaan Lanjutan
>
> - Fowler, M. (2002). *Patterns of Enterprise Application Architecture*
> - Gamma, E. et al. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*
> - Dokumentasi resmi UML: https://www.omg.org/spec/UML/
> - Kursus online "Database Systems Concepts" edX
> - Artikel IEEE: "Comparative Analysis of NoSQL Database Models"