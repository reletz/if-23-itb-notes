---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Enterprise Architecture dan Zachman Framework
>
> > ## Questions/Cues
> >
> > - Apa saja empat **domain enterprise architecture** dan hubungan dependensinya?
> > - Apa itu **architecture framework**?
> > - Bagaimana struktur **matriks 6×6 Zachman**?
> > - Apa arti kolom (interogatif) dan baris (reification) Zachman?
> > - Bagaimana perspektif tiap baris terhadap kolom *What (data)*?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Architecture (Slides 14-23)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 4.1.2 dan 4.1.4; Zachman, J. A. (1987)
>
> > ### Domain Enterprise Architecture
> >
> > Data architecture beroperasi bersama domain lain; arsitek tiap domain harus berkolaborasi karena **setiap domain memengaruhi dan membatasi domain lain**.
> >
> > | Domain | Tujuan | Elemen | Dependensi | Peran |
> > | --- | --- | --- | --- | --- |
> > | **Enterprise Business Architecture** | Mengidentifikasi bagaimana enterprise menciptakan nilai | Model bisnis, proses, kapabilitas, layanan, event, strategi, kosakata | Menetapkan kebutuhan bagi domain lain | Business architect/analyst, business data steward |
> > | **Enterprise Data Architecture** | Menjelaskan bagaimana data diorganisasi dan dikelola | Model data, definisi, spesifikasi pemetaan, data flow, API data terstruktur | Mengelola data yang dibuat dan dibutuhkan arsitektur bisnis | Data architect/modeler, data steward |
> > | **Enterprise Applications Architecture** | Menjelaskan struktur dan fungsi aplikasi | Sistem bisnis, paket perangkat lunak, database | Mengolah data sesuai kebutuhan bisnis | Application architect |
> > | **Enterprise Technology Architecture** | Menjelaskan teknologi fisik yang menjalankan sistem | Platform teknis, jaringan, keamanan, integration tools | Meng-host dan mengeksekusi arsitektur aplikasi | Infrastructure architect |
> >
> > ```mermaid
> > flowchart TD
> >     B["Business Architecture<br/>(menetapkan kebutuhan)"] --> D["Data Architecture"]
> >     D --> A["Application Architecture"]
> >     A --> T["Technology Architecture<br/>(host &amp; eksekusi)"]
> > ```
> >
> > ### Enterprise Architecture Framework
> >
> > **Architecture framework** adalah struktur fondasional untuk mengembangkan beragam arsitektur terkait; ia menyediakan cara berpikir dan memahami arsitektur. Framework EA paling terkenal adalah **Zachman Framework** (John A. Zachman, 1980-an).
> >
> > ### Zachman Framework
> >
> > Zachman adalah **ontologi**: matriks **6×6** yang memuat himpunan lengkap model untuk mendeskripsikan enterprise dan hubungannya. Dua dimensi:
> >
> > - **Kolom** — *communication interrogatives*: What, How, Where, Who, When, Why.
> > - **Baris** — *reification transformations*: Identification, Definition, Representation, Specification, Configuration, Instantiation.
> >
> > Setiap **sel** (irisan baris-kolom) adalah **tipe artefak desain yang unik**.
> >
> > | Kolom | Fokus |
> > | --- | --- |
> > | **What** (inventory) | Entitas yang dipakai membangun arsitektur — *data* |
> > | **How** (process) | Aktivitas yang dilakukan — *function* |
> > | **Where** (distribution) | Lokasi bisnis dan teknologi — *network* |
> > | **Who** (responsibility) | Peran dan organisasi — *people* |
> > | **When** (timing) | Interval, event, siklus, jadwal — *time* |
> > | **Why** (motivation) | Tujuan, strategi, sarana — *motivation* |
> >
> > Baris merepresentasikan langkah menerjemahkan ide abstrak menjadi instansiasi konkret, masing-masing dari perspektif berbeda:
> >
> > | Baris | Perspektif | Model | Terhadap kolom What (data) |
> > | --- | --- | --- | --- |
> > | Planner | Executive (business context) | Identification | Daftar elemen bisnis yang mendefinisikan scope |
> > | Owner | Business management (business concepts) | Definition | Klarifikasi hubungan konsep bisnis oleh pemilik |
> > | Designer | Architect (business logic) | Representation | Model logis sistem; kebutuhan tanpa batasan implementasi |
> > | Builder | Engineer (business physics) | Specification | Model fisik yang dioptimalkan untuk teknologi, orang, biaya, waktu tertentu |
> > | Implementer | Technician (component assemblies) | Configuration | Pandangan spesifik-teknologi tentang perakitan komponen |
> > | User | User (operations classes) | — | Instansi nyata yang berfungsi oleh pekerja; **tidak ada model** |

> [!cornell] #### Summary
>
> EA terdiri dari domain **business, data, application, technology** yang saling bergantung (bisnis menetapkan kebutuhan, data mengelola data bisnis, aplikasi mengolahnya, teknologi menjadi host). **Architecture framework** memberi cara berpikir tentang arsitektur; yang paling dikenal adalah **Zachman Framework**, ontologi **6×6**: kolom **What/How/Where/Who/When/Why** dan baris **Planner → Owner → Designer → Builder → Implementer → User**. Setiap sel adalah tipe artefak desain unik; baris mewakili perspektif executive, business management, architect, engineer, technician, dan user.

> [!ad-libitum]- Additional Information
>
> #### Framework EA lain
>
> **TOGAF** (ADM, The Open Group), **FEAF** (pemerintah AS), **ArchiMate** (bahasa pemodelan). Zachman adalah *taksonomi* (apa yang didokumentasikan), TOGAF adalah *proses* (bagaimana membangunnya).
>
> #### Membaca kolom What untuk data architect
>
> Kolom What dari baris Owner→Designer→Builder pada praktiknya menurunkan model konseptual → logis → fisik (lihat [[Enterprise Data Architecture dan Enterprise Data Model]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Isi 6 sel kolom *What* untuk sebuah sistem (mis. perpustakaan kampus) dengan satu artefak per baris.
> 2. Bandingkan Zachman dan TOGAF ADM dalam satu tabel: tujuan, keluaran, kapan dipakai.
>
> #### Bacaan Lanjutan
>
> - Zachman, J. A. (1987). "A framework for information systems architecture". *IBM Systems Journal* 26(3).
> - The Open Group. *TOGAF Standard*, 10th Ed.
