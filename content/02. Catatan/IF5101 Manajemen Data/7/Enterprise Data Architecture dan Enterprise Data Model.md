---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Enterprise Data Architecture dan Enterprise Data Model
>
> > ## Questions/Cues
> >
> > - Apa itu **Enterprise Data Architecture** dan dua elemen deskripsinya?
> > - Apa itu **Enterprise Data Model (EDM)**?
> > - Bagaimana EDM dibangun berlapis (*layers*)?
> > - Apa beda pemetaan **vertikal** dan **horizontal** antar model?
> > - Apa itu **subject area model** dan ontologi dalam pemodelan modern?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Architecture (Slides 24-30)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 4.1.4.2 (Enterprise Data Model)
>
> > ### Enterprise Data Architecture
> >
> > Mendefinisikan **istilah dan desain standar** untuk elemen yang penting bagi organisasi. Deskripsinya mencakup:
> >
> > - **Enterprise Data Model (EDM)** — model data konseptual atau logis tingkat enterprise yang **holistik dan independen dari implementasi**, memberi pandangan data yang **konsisten** lintas enterprise. Memuat entitas data enterprise kunci (konsep bisnis), relasinya, aturan bisnis panduan penting, dan beberapa atribut kritis.
> > - **Data Flow Design** — kebutuhan dan *master blueprint* penyimpanan dan pemrosesan lintas database, aplikasi, platform, dan jaringan (lihat [[Data Flow Design]]).
> >
> > ### Membangun EDM Berlapis
> >
> > EDM dapat dibangun pada berbagai tingkat detail. EDM paling sukses dibangun **inkremental dan iteratif**, berlapis:
> >
> > 1. **Gambaran konseptual** subject area enterprise.
> > 2. **Pandangan entitas dan relasi** per subject area.
> > 3. **Pandangan logis** terperinci (sebagian berantribut) dari subject area yang sama.
> > 4. **Model logis dan fisik** spesifik aplikasi/proyek.
> >
> > ```mermaid
> > flowchart TD
> >     L1["Enterprise Conceptual Model<br/>(subject areas)"] --> L2["Subject Area Model<br/>(entitas &amp; relasi)"]
> >     L2 --> L3["Enterprise Logical Model<br/>(atribut parsial)"]
> >     L3 --> L4["Project Logical Model"]
> >     L4 --> L5["Project Physical Model<br/>(tabel/file)"]
> > ```
> >
> > ### Pemetaan Vertikal dan Horizontal
> >
> > | Arah | Arti | Contoh |
> > | --- | --- | --- |
> > | **Vertikal** | Model tiap level terpetakan ke model level lain | Tabel `MobileDevice` di model fisik proyek ↔ entitas `MobileDevice` di model logis proyek ↔ entitas di Enterprise Logical Model (subject area Product) ↔ entitas konseptual `Product` ↔ `Product` di Enterprise Conceptual Model |
> > | **Horizontal** | Entitas/relasi dapat muncul di beberapa model pada level sama; entitas pada satu topik dapat berelasi dengan topik lain (ditandai *external to the subject area*) | `Product Part` muncul di subject area Product dan di Sales Order, Inventory, Marketing sebagai tautan eksternal |
> >
> > EDM di semua level dikembangkan dengan **teknik pemodelan data seperti ER modeling** (lihat folder ER dan Relasional).
> >
> > ### Contoh EDM
> >
> > - **Subject area data model**: terdiri dari tiga subject area, masing-masing berisi model data konseptual (ER); relasi boleh melintasi batas subject area; **sebuah entitas hanya berada di satu subject area**.
> > - **Subject area model** sebagai *breakdown* definisi bisnis yang mencakup area data tingkat tinggi organisasi.
> > - **Common subject area model** yang berlaku hampir di semua industri, lalu diturunkan menjadi **industry-based subject area model** sesuai kebutuhan spesifik industri.
> > - **Ontologi**: gambaran besar dan pemahaman konseptual bisnis yang memberi orientasi bagi model aplikasi; pendekatan modern memadukan **top-down** (ontologi) dan **bottom-up** (data atoms yang ditautkan ke ontologi).

> [!cornell] #### Summary
>
> **Enterprise Data Architecture** mendefinisikan istilah dan desain standar lewat **EDM** (model konseptual/logis holistik independen implementasi: entitas kunci, relasi, aturan bisnis, atribut kritis) dan **data flow design**. EDM dibangun **inkremental dan berlapis** dari konseptual enterprise → subject area → logis → model proyek/fisik, dengan pemetaan **vertikal** antar level dan **horizontal** antar subject area. Teknik pemodelannya ER; praktik modern memadukan ontologi top-down dengan data atoms bottom-up.

> [!ad-libitum]- Additional Information
>
> #### Subject area vs. data domain
>
> Dalam praktik, subject area (mis. Customer, Product, Order) sering sejajar dengan *data domain* yang dimiliki satu owner/steward — kaitan langsung ke [[Data Stewardship, Data Policies, dan Valuasi Data]].
>
> #### Peringatan: big-bang EDM
>
> Membangun EDM lengkap dahulu sebelum proyek berjalan biasanya gagal; pendekatan inkremental per subject area prioritas lebih realistis.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Gambar enterprise conceptual model satu halaman untuk kampus (5-7 subject area) dan tandai entitas yang melintasi batas.
> 2. Pilih satu entitas dan telusuri pemetaan vertikalnya dari konseptual hingga tabel fisik.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 4.1.4 dan Chapter 5 (Data Modeling).
> - Hay, D. C. (1996). *Data Model Patterns: Conventions of Thought*. Dorset House.
