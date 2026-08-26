---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Proses dan Pendekatan Perancangan Basis Data
>
> > ## Questions/Cues
> >
> > - Apa saja fase perancangan basis data dari kebutuhan hingga implementasi?
> > - Apa beda keputusan bisnis vs keputusan computer science pada logical design?
> > - Dua "jebakan" (pitfall) desain apa yang harus dihindari?
> > - Apa dua pendekatan perancangan skema, dan peran masing-masing?
> > - Tiga konsep dasar apa yang dipakai model ER?
> >
> > ## Reference Points
> >
> > - IF5101 — Database Design Using the E-R Model (Slides 6.2-6.7)
>
> > ### Fase-Fase Perancangan
> >
> > Perancangan basis data bergerak dari kebutuhan pengguna menuju basis data yang berjalan, melalui beberapa fase:
> >
> > 1. **Initial phase** — **mengarakterisasi secara lengkap kebutuhan data** dari calon pengguna basis data. Melibatkan wawancara ekstensif dengan pakar domain.
> > 2. **Second phase** — **memilih data model** (mis. ER), menerapkan konsep-konsepnya, dan **menerjemahkan kebutuhan menjadi conceptual schema**. Conceptual schema yang matang **mencerminkan functional requirements** enterprise, yaitu: mendeskripsikan jenis-jenis **operasi (transaksi)** yang akan dijalankan atas data.
> > 3. **Final phase** — berpindah dari model data abstrak ke **implementasi** basis data, terbagi dua:
> >    - **Logical Design** — menentukan **skema basis data**. Di sinilah harus ditemukan **kumpulan skema relasi yang "baik"**.
> >    - **Physical Design** — menentukan **tata letak fisik** basis data (file, indeks, partisi, dsb.).
> >
> > ```mermaid
> > flowchart LR
> >     A["Initial phase<br/>karakterisasi kebutuhan data"] --> B["Choose data model<br/>+ conceptual schema"]
> >     B --> C["Spesifikasi operasi/<br/>transaksi (functional req.)"]
> >     C --> D["Logical Design<br/>tentukan skema relasi"]
> >     D --> E["Physical Design<br/>tata letak fisik"]
> > ```
> >
> > ### Keputusan pada Logical Design
> >
> > Menemukan kumpulan skema relasi yang baik melibatkan dua jenis keputusan yang berbeda sifat:
> >
> > - **Keputusan bisnis** — *atribut apa yang harus dicatat* dalam basis data? Ini butuh pengetahuan domain, bukan teknis.
> > - **Keputusan computer science** — *skema relasi apa yang harus dimiliki*, dan *bagaimana atribut didistribusikan* di antara berbagai skema relasi tersebut?
> >
> > ### Alternatif Desain: Dua Jebakan yang Harus Dihindari
> >
> > Saat merancang skema, ada **dua pitfall utama**:
> >
> > 1. **Redundancy** — desain buruk menyebabkan **informasi terulang**. Representasi berulang bisa memicu **inkonsistensi data** antar salinan informasi (satu salinan diperbarui, yang lain tidak).
> > 2. **Incompleteness** — desain buruk membuat **aspek tertentu dari enterprise sulit atau mustahil dimodelkan**.
> >
> > Menghindari desain buruk **belum cukup**: biasanya masih ada **banyak desain baik** yang harus dipilih salah satunya berdasarkan pertimbangan lain (kejelasan, kinerja, kemudahan evolusi).
> >
> > ### Dua Pendekatan Perancangan
> >
> > | Pendekatan | Peran |
> > |---|---|
> > | **Entity-Relationship Model** | Memodelkan enterprise sebagai **kumpulan entitas dan relationship**. **Entity** = "benda"/objek dalam enterprise yang dapat dibedakan dari objek lain, dideskripsikan oleh sekumpulan **atribut**. **Relationship** = asosiasi di antara beberapa entitas. Direpresentasikan secara diagramatik lewat **ER diagram**. |
> > | **Normalization Theory** | **Memformalkan desain mana yang buruk** dan menyediakan **uji** untuk mendeteksinya. Bersifat korektif/analitik, melengkapi ER. Dibahas pada materi berikutnya. |
> >
> > ### Tiga Konsep Dasar Model ER
> >
> > **ER data model dikembangkan untuk memfasilitasi perancangan basis data** dengan memungkinkan spesifikasi *enterprise schema* yang merepresentasikan **struktur logis keseluruhan** basis data. Model ER memakai **tiga konsep dasar**:
> >
> > - **entity sets**
> > - **relationship sets**
> > - **attributes**
> >
> > Model ER juga memiliki **representasi diagramatik** — **ER diagram** — yang dapat mengekspresikan struktur logis keseluruhan basis data secara grafis. Ketiga konsep ini dirinci pada catatan-catatan berikutnya di payung ini: [[Entity Set, Relationship Set, dan Primary Key]], [[Mapping Cardinality, Partisipasi, dan Weak Entity Set]], dan [[Extended ER Features dan Isu Perancangan]].

> [!cornell] #### Summary
>
> Perancangan basis data berjalan melalui fase: **karakterisasi kebutuhan data** → **memilih data model & menyusun conceptual schema** (yang mencerminkan functional requirements berupa transaksi) → **logical design** (menentukan skema relasi "baik") → **physical design** (tata letak fisik). Logical design memadukan **keputusan bisnis** (atribut apa yang dicatat) dan **keputusan computer science** (skema relasi apa & distribusi atribut). Desain harus menghindari dua jebakan: **redundancy** (memicu inkonsistensi) dan **incompleteness**. Ada dua pendekatan komplementer: **ER model** (memodelkan enterprise sebagai entitas + relationship, digambar lewat ER diagram) dan **normalization theory** (memformalkan & menguji desain buruk). Model ER berdiri di atas tiga konsep: **entity sets, relationship sets, attributes**.

> [!ad-libitum]- Additional Information
>
> #### Posisi ER dalam SDLC
>
> ER diagram adalah artefak fase **analisis/desain konseptual**. Ia bebas dari pilihan DBMS. Transformasi ER → skema relasional (fase logical design) mengikuti aturan mapping baku (entitas → tabel, relationship M-N → tabel asosiasi, atribut multivalued → tabel terpisah, dst.), lalu normalisasi memverifikasi hasilnya bebas anomali.
>
> #### Redundancy yang "Sengaja"
>
> Slide mencatat: saat mengonversi ER kembali ke tabel, kadang atribut yang tadinya dibuang karena redundan **muncul kembali** (mis. `course_id` pada tabel `section`). Ini bukan kesalahan — redundansi terkontrol pada level skema relasional kadang diperlukan untuk merepresentasikan relationship secara eksplisit. Lihat pembahasan weak entity set.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Ambil satu form pendaftaran nyata (mis. registrasi seminar). Jalankan fase 1-2: daftar kebutuhan data, pilih ER, buat conceptual schema, lalu daftar 5 transaksi yang harus didukung.
> 2. Cari satu contoh skema basis data yang redundan di internet, tunjukkan anomali update/insert/delete yang mungkin terjadi, lalu perbaiki.
>
> #### Bacaan Lanjutan
>
> - Silberschatz, Korth, Sudarshan. *Database System Concepts*, 7th Ed. — Chapter 6 "Database Design Using the E-R Model" (bagian Overview of the Design Process) & Chapter 7 (Normalization).
> - DAMA-DMBOK2, Chapter 5 — "Data Modeling and Design".
