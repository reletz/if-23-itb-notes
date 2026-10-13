---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Data Flow Design
>
> > ## Questions/Cues
> >
> > - Apa itu **data flow** dan hubungannya dengan **data lineage**?
> > - Pertanyaan apa yang dijawab data flow?
> > - Data flow memetakan hubungan data dengan apa saja?
> > - Pada tingkat detail apa data flow bisa didokumentasikan?
> > - Bagaimana data flow direpresentasikan (matriks vs diagram)?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Architecture (Slides 31-33)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 4.1.4.3 (Data Flow Design)
>
> > ### Definisi
> >
> > **Data flow** adalah jenis dokumentasi **data lineage** yang menggambarkan bagaimana data bergerak melalui proses bisnis dan sistem. Ia menunjukkan:
> >
> > - **dari mana** data berasal,
> > - **di mana** data disimpan dan dipakai,
> > - **bagaimana** data ditransformasi saat bergerak di dalam dan antar proses/sistem.
> >
> > ### Apa yang Dipetakan
> >
> > Data flow memetakan dan mendokumentasikan hubungan data dengan:
> >
> > | Elemen | Kegunaan |
> > | --- | --- |
> > | **Aplikasi** dalam suatu proses bisnis | Siapa memakai/menghasilkan data |
> > | **Data store / database** di suatu lingkungan | Lokasi penyimpanan |
> > | **Segmen jaringan** | Berguna untuk *security mapping* |
> > | **Peran bisnis** | Siapa bertanggung jawab *create, read/use, update, delete* (**CRUD**) |
> > | **Lokasi** | Tempat perbedaan lokal terjadi |
> >
> > ### Tingkat Detail
> >
> > Data flow dapat didokumentasikan di level **subject area**, **business entity**, hingga **atribut**.
> >
> > ### Representasi
> >
> > 1. **Matriks dua dimensi** — baris = entitas/subject area, kolom = proses/aplikasi/peran; sel diisi aksi CRUD.
> > 2. **Data flow diagram** — node (proses/sistem/data store) dan panah aliran data.
> >
> > | Entitas | Aplikasi Registrasi | Aplikasi Keuangan | Portal Dosen |
> > | --- | --- | --- | --- |
> > | Mahasiswa | C, U | R | R |
> > | Mata Kuliah | R | R | C, U, D |
> > | Tagihan | R | C, U | — |
> >
> > ```mermaid
> > flowchart LR
> >     SRC["Sumber: Form Registrasi"] -->|"input"| APP["Aplikasi Registrasi"]
> >     APP -->|"insert"| DB[("Database Akademik")]
> >     DB -->|"ETL harian"| DW[("Data Warehouse")]
> >     DW --> BI["Dashboard BI"]
> > ```

> [!cornell] #### Summary
>
> **Data flow** adalah dokumentasi **data lineage**: asal data, tempat disimpan/dipakai, dan transformasinya antar proses dan sistem. Ia memetakan hubungan data dengan **aplikasi, data store, segmen jaringan, peran bisnis (CRUD), dan lokasi**, pada tingkat **subject area, entitas, atau atribut**. Dapat direpresentasikan sebagai **matriks dua dimensi** atau **data flow diagram**.

> [!ad-libitum]- Additional Information
>
> #### Matriks CRUD untuk audit
>
> Matriks CRUD cepat menunjukkan pelanggaran *single source of truth*: bila dua aplikasi sama-sama mengisi **C** untuk entitas yang sama, ada potensi inkonsistensi (lihat juga kontrol replikasi di [[Aktivitas Data Architecture dan Integrasi dengan EA]]).
>
> #### Lineage otomatis
>
> Tool seperti OpenLineage, dbt docs, dan katalog data dapat menurunkan lineage dari query/pipeline otomatis sehingga dokumentasi tidak cepat usang.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Buat matriks CRUD untuk 4 entitas dan 3 aplikasi sistem yang Anda kenal; tandai konflik.
> 2. Gambar data flow diagram ETL dari satu sumber ke dashboard dan tandai titik transformasi.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 4.1.4.3 dan Chapter 8 (Data Integration).
> - OpenLineage. *OpenLineage specification* (openlineage.io).
