---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Business Drivers, Outcomes, dan Praktik Data Architecture
>
> > ## Questions/Cues
> >
> > - Apa tujuan utama data architecture sebagai "jembatan"?
> > - Apa peran **data architect** dalam enterprise architecture?
> > - Apa **outcomes** utama data architecture?
> > - Spesifikasi apa yang didefinisikan dan dipelihara data architect?
> > - Apa saja isi **praktik** data architecture?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Architecture (Slides 9-13)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 4.1-4.2
>
> > ### Business Drivers
> >
> > Tujuan data architecture adalah menjadi **jembatan antara strategi bisnis dan eksekusi teknologi**. Sebagai bagian dari EA, data architect:
> >
> > - **Menyiapkan organisasi secara strategis** agar cepat mengembangkan produk, layanan, dan data memanfaatkan peluang teknologi baru.
> > - **Menerjemahkan kebutuhan bisnis** menjadi kebutuhan data dan sistem agar proses selalu mendapat data yang dibutuhkan.
> > - **Mengelola penyampaian data dan informasi yang kompleks** di seluruh enterprise.
> > - **Memfasilitasi keselarasan bisnis dan TI**.
> > - Bertindak sebagai **agen perubahan, transformasi, dan agility**.
> >
> > ```mermaid
> > flowchart LR
> >     BS["Strategi bisnis"] --> DA["Data Architecture<br/>(jembatan)"]
> >     DA --> TE["Eksekusi teknologi<br/>sistem &amp; data"]
> > ```
> >
> > ### Outcomes Data Architecture
> >
> > Outcome utama:
> >
> > - **Desain struktur dan rencana** yang memenuhi kebutuhan data enterprise saat ini dan jangka panjang.
> > - **Kebutuhan penyimpanan dan pemrosesan data**.
> >
> > Agar membawa nilai, data architect mendefinisikan dan memelihara spesifikasi yang:
> >
> > 1. Mendefinisikan **kondisi data saat ini** di organisasi.
> > 2. Menyediakan **kosakata bisnis standar** untuk data dan komponennya.
> > 3. **Menyelaraskan** data architecture dengan strategi enterprise dan arsitektur bisnis.
> > 4. Menyatakan **kebutuhan data strategis**.
> > 5. Menguraikan **desain terintegrasi tingkat tinggi** untuk memenuhinya.
> > 6. **Terintegrasi** dengan roadmap enterprise architecture.
> >
> > ### Praktik Data Architecture
> >
> > Praktik menyeluruh mencakup:
> >
> > - Memakai **artefak data architecture** (*master blueprint*) untuk mendefinisikan kebutuhan data, memandu integrasi data, mengendalikan aset data, dan **menyelaraskan investasi data dengan strategi bisnis**.
> > - **Berkolaborasi, belajar, dan memengaruhi** pemangku kepentingan yang memperbaiki bisnis atau pengembangan sistem TI.
> > - Menetapkan **semantik enterprise** lewat **kosakata bisnis bersama**.

> [!cornell] #### Summary
>
> Data architecture adalah **jembatan strategi bisnis ↔ eksekusi teknologi**: data architect menyiapkan organisasi memanfaatkan teknologi, menerjemahkan kebutuhan bisnis menjadi kebutuhan data/sistem, mengelola penyampaian data kompleks, menyelaraskan bisnis–TI, dan menjadi agen perubahan. **Outcomes**: desain struktur dan rencana yang memenuhi kebutuhan data saat ini dan jangka panjang, plus kebutuhan penyimpanan dan pemrosesan. Spesifikasinya mendefinisikan kondisi saat ini, kosakata bisnis standar, keselarasan dengan strategi, kebutuhan data, desain terintegrasi, dan roadmap EA. **Praktiknya** memakai blueprint, kolaborasi stakeholder, dan kosakata bisnis bersama.

> [!ad-libitum]- Additional Information
>
> #### Kosakata bisnis bersama
>
> Satu definisi "Customer" yang disepakati lintas unit (bukan lima versi berbeda di tiap sistem) adalah salah satu kontribusi paling konkret data architecture; biasanya dikelola di business glossary di bawah [[Data Stewardship, Data Policies, dan Valuasi Data]].
>
> #### Peran data architect di tim modern
>
> Di perusahaan berbasis produk, peran ini sering bergeser menjadi *platform/data mesh architect* yang menetapkan standar data product alih-alih satu model pusat.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis tiga kebutuhan data strategis untuk sebuah startup e-commerce fiktif dan terjemahkan menjadi kebutuhan sistem.
> 2. Buat glossary 8 istilah inti untuk domain akademik kampus dengan definisi tunggal.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 4.1-4.2.
> - Dehghani, Z. (2022). *Data Mesh*. O'Reilly.
