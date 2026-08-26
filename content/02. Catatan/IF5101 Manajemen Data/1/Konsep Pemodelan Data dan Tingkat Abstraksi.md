---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Konsep Pemodelan Data dan Tingkat Abstraksi
>
> > ## Questions/Cues
> >
> > - Apa definisi pemodelan data menurut DAMA dan di konteks apa ia dilakukan?
> > - Apa perbedaan tiga tingkat arsitektur ANSI-SPARC (conceptual, external, internal)?
> > - Bagaimana model konseptual, logis, dan fisik berkembang dari kebutuhan menuju basis data nyata?
> > - Kategori data apa saja yang biasa dimodelkan dalam sebuah organisasi?
> > - Mengapa sebuah model data tidak selalu berujung pada basis data?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Modeling using ER (Slides 3-7)
>
> > ### Definisi dan Konteks Pemodelan Data
> >
> > Menurut **DAMA DMBOK2**, **pemodelan data (data modeling)** adalah *proses menemukan, menganalisis, dan menentukan lingkup (scoping) kebutuhan data*, lalu **merepresentasikan dan mengomunikasikan** kebutuhan itu dalam bentuk presisi yang disebut **data model**. Intinya ada dua aktivitas: (1) memahami data apa yang dibutuhkan, dan (2) menuangkannya dalam notasi baku yang bisa dipahami bersama oleh pemangku kepentingan bisnis maupun teknis.
> >
> > Pemodelan data paling sering dilakukan dalam konteks **pengembangan dan pemeliharaan sistem** — dikenal sebagai **System Development Lifecycle (SDLC)**. Namun ia juga dipakai untuk inisiatif berlingkup luas seperti **Business & Data Architecture**, **Master Data Management**, dan **data governance**. Pada inisiatif semacam ini hasil akhirnya **bukan sebuah basis data**, melainkan **pemahaman bersama tentang data organisasi**.
> >
> > Sebuah **data model menggambarkan data organisasi sebagaimana organisasi memahaminya**, atau sebagaimana organisasi **menginginkannya di masa depan** (kondisi target). Analogi: seperti denah arsitektur bangunan — bisa menggambarkan gedung yang sudah berdiri (as-is) atau gedung yang direncanakan (to-be).
> >
> > ### Arsitektur Tiga Tingkat ANSI-SPARC
> >
> > **ANSI-SPARC three level architecture** membagi cara memandang data menjadi tiga tingkat abstraksi:
> >
> > 1. **Conceptual level** — pandangan **"dunia nyata"** atas enterprise yang dimodelkan dalam basis data. Ini adalah tingkat yang paling dekat dengan bisnis dan bebas dari detail teknis.
> > 2. **External level** — berbagai **pengguna** DBMS bekerja hanya pada **sub-himpunan** model enterprise yang relevan bagi kebutuhan spesifik mereka. Satu basis data bisa memiliki banyak *view* eksternal (mis. view bagian keuangan berbeda dengan view bagian akademik).
> > 3. **Internal / physical level** — mendeskripsikan **representasi tersimpan** dari informasi enterprise: struktur file, indeks, tata letak byte di media penyimpanan.
> >
> > Pemisahan tiga tingkat ini memberi **data independence**: perubahan pada tingkat fisik (mis. mengganti struktur indeks) tidak memaksa perubahan pada tingkat konseptual maupun aplikasi pengguna.
> >
> > ```mermaid
> > flowchart TD
> >     E1["External View 1<br/>(Keuangan)"] --> C
> >     E2["External View 2<br/>(Akademik)"] --> C
> >     E3["External View 3<br/>(SDM)"] --> C
> >     C["Conceptual Level<br/>(model 'dunia nyata' enterprise)"] --> I
> >     I["Internal / Physical Level<br/>(struktur tersimpan: file, indeks)"]
> > ```
> >
> > ### Tiga Tingkat Detail Model Data
> >
> > Saat bergerak dari **kebutuhan** menuju **basis data aktual**, dihasilkan tiga jenis model data dengan tingkat detail yang menaik:
> >
> > | Model | Isi | Ketergantungan teknologi |
> > |---|---|---|
> > | **Conceptual Model** | Kebutuhan data tingkat tinggi sebagai kumpulan **konsep yang saling terkait**; hanya entitas bisnis **dasar dan kritis** dalam suatu ranah/fungsi, beserta deskripsi tiap entitas dan relasinya. | Bebas teknologi |
> > | **Logical Model** | Representasi **rinci** kebutuhan data, biasanya untuk mendukung **konteks penggunaan tertentu**; sering dimulai sebagai perluasan dari model konseptual. | Masih bebas teknologi/implementasi |
> > | **Physical Model** | **Solusi teknis rinci**; memakai model logis sebagai titik awal lalu diadaptasi agar bekerja pada seperangkat **hardware, software, dan tools jaringan** tertentu. | Dibangun untuk teknologi spesifik |
> >
> > Perhatikan bahwa perkembangan **conceptual → logical → physical** ini sejajar dengan tingkat **conceptual** dan **internal** pada ANSI-SPARC: konseptual berorientasi bisnis, fisik berorientasi implementasi.
> >
> > ### Kategori Data yang Dimodelkan
> >
> > Data yang dimodelkan dalam sebuah organisasi umumnya jatuh ke beberapa kategori:
> >
> > - **Category information** — data untuk **mengklasifikasikan** dan memberi tipe pada entitas. Contoh: kategori pasar untuk pelanggan, kategori produk.
> > - **Resource information** — **profil dasar sumber daya** yang dibutuhkan untuk menjalankan proses operasional. Contoh: Product, Customer, Supplier, Facility, Organization, Account.
> > - **Business event information** — data yang **tercipta saat proses operasional berlangsung**. Contoh: Customer Order, Supplier Invoice, Cash Withdrawal, Business Meeting.
> > - **Detail transaction information** — sering dihasilkan oleh sistem **point-of-sale** (toko maupun online), sistem media sosial, interaksi internet lain, dan **sensor pada mesin**.
> >
> > Membedakan kategori ini membantu menentukan **entitas mana yang stabil** (resource) dan **mana yang bertumbuh cepat** (event, transaction) — informasi penting untuk keputusan desain dan penyimpanan.

> [!cornell] #### Summary
>
> **Pemodelan data** (DAMA) adalah proses menemukan, menganalisis, dan melingkupi kebutuhan data lalu merepresentasikannya sebagai **data model** yang presisi; dilakukan dalam **SDLC** maupun inisiatif arsitektur/governance yang hasilnya berupa pemahaman, bukan basis data. **ANSI-SPARC** memisahkan pandangan data menjadi tiga tingkat — **conceptual** (dunia nyata enterprise), **external** (view per kebutuhan pengguna), dan **internal/physical** (representasi tersimpan) — demi **data independence**. Seiring bergerak dari kebutuhan ke basis data, dihasilkan **conceptual model** (konsep dasar & kritis, bebas teknologi), **logical model** (rinci, masih bebas teknologi), dan **physical model** (solusi teknis untuk hardware/software tertentu). Data organisasi lazim dikelompokkan menjadi **category, resource, business event, dan detail transaction information**.

> [!ad-libitum]- Additional Information
>
> #### DAMA-DMBOK dan Data Management Framework
>
> Buku acuan mata kuliah, **DAMA DMBOK2 (Data Management Body of Knowledge, 2nd Ed., 2017)**, menempatkan *Data Modeling & Design* sebagai satu dari sebelas *knowledge area* dalam roda (wheel) manajemen data, bersama Data Governance di pusatnya. Pemodelan data dipandang sebagai keterampilan pendukung untuk hampir semua area lain (Data Architecture, Master & Reference Data, Data Warehousing, dsb.).
>
> #### Tiga Skema vs Empat Model
>
> Literatur basis data modern (mis. Silberschatz) kadang menyebut **physical, logical, view level**; ANSI-SPARC menyebut **internal, conceptual, external**. Pemetaannya: physical↔internal, logical↔conceptual, view↔external. Istilah "conceptual model" dalam konteks pemodelan data (DAMA) lebih tinggi lagi levelnya daripada "conceptual schema" ANSI-SPARC — yang pertama adalah sketsa bisnis, yang kedua adalah skema logis lengkap.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil satu domain sederhana (mis. perpustakaan kampus). Buat **conceptual model** (5-7 entitas inti + relasi), lalu kembangkan menjadi **logical model** dengan atribut & tipe, lalu petakan ke **physical model** untuk PostgreSQL.
> 2. Untuk aplikasi yang kamu pakai sehari-hari (mis. e-wallet), klasifikasikan 15 elemen data ke dalam empat kategori (category/resource/event/transaction) dan diskusikan implikasi volume & retensinya.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK: Data Management Body of Knowledge*, 2nd Ed., Technics Publications, 2017 — Chapter 5 "Data Modeling and Design".
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed., 2019 — Chapter 1 (level of abstraction) & Chapter 6.
> - Matthew West & Julian Fowler. *Developing High Quality Data Models* (EPISTLE) — sumber diagram arsitektur tiga tingkat ANSI-SPARC.
