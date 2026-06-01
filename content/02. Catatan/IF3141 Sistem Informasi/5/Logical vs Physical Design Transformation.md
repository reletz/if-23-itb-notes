---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[Sistem Informasi]]

> [!cornell] Logical vs Physical Design Transformation
>
> > ## Questions/Cues
> >
> > - Mengapa desain logis perlu dipisahkan dari fisik?
> > - Bagaimana model basis data memengaruhi transformasi desain?
> > - Apa peran normalisasi dalam desain data?
> > - Kapan pendekatan top-down lebih efektif?
> > - Tantangan integrasi antar komponen sistem?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Design Slides (Halaman 7-8, 24-27, 28-38, 43-51)
>
> > ### Konsep Dasar Transformasi Desain
> >
> > Transformasi desain logis ke fisik merupakan proses mengubah representasi konseptual sistem menjadi implementasi teknis yang spesifik. Desain logis berfokus pada **struktur fungsional** sistem tanpa mempertimbangkan teknologi, mencakup alur data, hubungan entitas, dan interaksi modul. Sebaliknya, desain fisik menentukan **implementasi konkret** seperti jenis basis data, bahasa pemrograman, dan infrastruktur jaringan.
> >
> > Contoh nyata: Dalam desain logis basis data, kita mendefinisikan entitas "Mahasiswa" dengan atribut nama dan NIM. Pada desain fisik, ini diimplementasikan sebagai tabel MySQL dengan kolom VARCHAR(50) untuk nama dan CHAR(8) untuk NIM, termasuk indeks untuk pencarian cepat.
> >
> > Pentingnya pemisahan ini terletak pada **fleksibilitas** – perubahan platform teknologi tidak harus mengubah desain logis. Misalnya, sistem yang awalnya menggunakan basis data hierarkis dapat bermigrasi ke basis data relasional tanpa mengubah model bisnis inti.
> >
> > ### Peran Model dalam Transformasi Desain
> >
> > Model sistem berfungsi sebagai **blueprint** yang menghubungkan desain logis dan fisik. Terdapat tiga jenis model kunci:
> >
> > 1. **Model Konseptual**: Menggambarkan kebutuhan bisnis (contoh: diagram UML use case)
> > 2. **Model Logis**: Menentukan struktur sistem independen teknologi (contoh: ER diagram tanpa tipe data spesifik)
> > 3. **Model Fisik**: Menetapkan implementasi teknis (contoh: skema tabel SQL dengan foreign keys)
> >
> > Proses transformasi melibatkan **pemetaan elemen model** logis ke komponen fisik. Contoh: Entitas "Transaksi" dalam model logis dapat diimplementasikan sebagai:
> >
> > - Kelas Java dalam pendekatan OOP
> > - Tabel relational database dengan primary key
> > - Dokumen JSON dalam basis data NoSQL
> >
> > ### Pendekatan Transformasi (Top-Down vs Bottom-Up)
> >
> > **Pendekatan Top-Down** dimulai dari gambaran sistem secara utuh kemudian melakukan dekomposisi bertahap. Metode ini efektif untuk sistem kompleks dengan integrasi tinggi seperti sistem ERP. Keunggulannya mencakup **konsistensi desain** dan visi holistik, tetapi berisiko menghasilkan desain yang terlalu abstrak jika tidak diimbangi dengan pengetahuan teknis.
> >
> > **Pendekatan Bottom-Up** menyusun sistem dari komponen-komponen kecil yang kemudian diintegrasikan. Cocok untuk pengembangan berbasis microservices atau ketika menggunakan komponen existing. Contoh: Membangun modul autentikasi terlebih dahulu sebelum merancang sistem keseluruhan.
> >
> > Praktik terbaik menggunakan **kombinasi kedua pendekatan** – desain arsitektur secara top-down, sementara implementasi komponen dilakukan bottom-up dengan prototype.
> >
> > ### Tantangan dalam Transformasi Desain
> >
> > **Ketidakcocokan paradigma** merupakan tantangan utama saat memetakan desain logis ke fisik. Contoh: Model relasional yang ketat sulit diimplementasikan di basis data NoSQL. Solusinya memerlukan **desain adaptif** dengan abstraksi layer seperti ORM (Object-Relational Mapping).
> >
> > **Integrasi antar komponen** menjadi kompleks ketika sistem melibatkan heterogenitas teknologi. Middleware seperti Apache Kafka sering digunakan sebagai **pemersatu arsitektur** untuk sistem dengan komponen berbeda bahasa pemrograman dan platform.
> >
> > **Keterbatasan kinerja** muncul ketika optimasi logis tidak sejalan dengan realitas fisik. Contoh: Desain normalisasi sempurna secara logis dapat menghasilkan query join lambat secara fisik, memerlukan denormalisasi selektif untuk optimasi.

> [!cornell] #### Summary
>
> **Transformasi desain logis ke fisik** merupakan proses kritis yang mengubah abstraksi sistem menjadi implementasi teknis, dengan model konseptual sebagai jembatan antara kebutuhan bisnis dan solusi teknologi. Pendekatan **top-down** cocok untuk sistem terintegrasi tinggi, sementara **bottom-up** efektif untuk pengembangan berbasis komponen. Tantangan utama meliputi **mismatch paradigma** basis data, kompleksitas integrasi sistem heterogen, dan trade-off antara **integritas logis** dengan **kinerja fisik**. Pemahaman mendalam tentang **karakteristik platform target** menjadi kunci keberhasilan transformasi desain.

> [!ad-libitum]- Additional Information
>
> #### Perbandingan Mendalam Model Basis Data
>
> **Basis Data Hierarkis** (contoh: XML databases) menggunakan struktur parent-child yang rigid, cocok untuk data dengan relasi tetap seperti dokumen terstruktur. **Basis Data Jaringan** memperkenalkan multiple parent nodes, memungkinkan relasi many-to-many yang kompleks tapi sulit di-maintain. **Basis Data Relasional** mendominasi pasar dengan fleksibilitas query SQL dan ACID compliance, namun kurang cocok untuk data unstructured. **Basis Data OO** menyimpan data sebagai objek lengkap dengan method, ideal untuk aplikasi kompleks tapi memerlukan tools khusus.
>
> **Kriteria Seleksi Teknologi**:
>
> - Volume dan struktur data
> - Kebutuhan transaksional vs analitis
> - Skalabilitas horizontal/vertikal
> - Keterampilan tim pengembang
>
> #### Studi Kasus Transformasi Desain
>
> **Sistem E-commerce**:
>
> 1. Logis: Model entitas Produk, Keranjang, Pembayaran
> 2. Fisik:
> - Microservice Node.js untuk manajemen produk
> - Redis untuk keranjang volatile
> - PostgreSQL untuk transaksi pembayaran ACID
> - Message Queue untuk integrasi antar layanan
>
> **Pelajaran**: Desain fisik perlu mempertimbangkan pola akses data – Redis untuk read-heavy, PostgreSQL untuk write-intensive dengan konsistensi kuat.
>
> #### Tools untuk Transformasi Desain
>
> 1. **ERDPlus**: Transformasi diagram ER ke skema SQL
> 2. **Hibernate ORM**: Pemetaan objek Java ke tabel relasional
> 3. **Apache Avro**: Serialisasi data untuk sistem heterogen
> 4. **Sparx EA**: Pemodelan multi-layer dari konseptual ke fisik
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Bangun model logis sistem perpustakaan dengan 5 entitas utama, lalu implementasikan dalam dua teknologi berbeda (contoh: MySQL vs MongoDB). Bandingkan trade-off desain fisiknya.
> 2. Konversi skema basis data relasional ke format graph database (Neo4j), analisis perubahan yang diperlukan dalam query dan struktur data.
>
> #### Bacaan Lanjutan
>
> - Fowler, M. (2002). *Patterns of Enterprise Application Architecture*
> - Kleppmann, M. (2017). *Designing Data-Intensive Applications* Bab 2-3
> - Dokumentasi resmi Apache Kafka: https://kafka.apache.org/documentation/
> - Tutorial ORM Advanced: https://hibernate.org/orm/documentation/6.2/