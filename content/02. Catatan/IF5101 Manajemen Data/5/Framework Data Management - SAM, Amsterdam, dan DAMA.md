---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Framework Data Management - SAM, Amsterdam, dan DAMA
>
> > ## Questions/Cues
> >
> > - Untuk apa **framework** data management dipakai?
> > - Apa itu **Strategic Alignment Model** dan **Amsterdam Information Model**?
> > - Apa itu **DAMA-DMBOK** dan komponen frameworknya (Wheel, Environmental Factors, Context Diagram)?
> > - Apa kontribusi **Aiken Pyramid** dan **DAMA Framework Evolved**?
> >
> > ## Reference Points
> >
> > - IF5101 — Introduction to Data Management (Slides 18-27)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 1.4 (Data Management Frameworks)
>
> > ### Mengapa Framework?
> >
> > Framework pada berbagai **tingkat abstraksi** memberi beragam perspektif tentang cara mendekati data management. Perspektif itu membantu **memperjelas strategi, menyusun roadmap, mengorganisasi tim, dan menyelaraskan fungsi**.
> >
> > Lima framework dibahas:
> >
> > 1. Strategic Alignment Model
> > 2. Amsterdam Information Model
> > 3. DAMA-DMBOK Framework
> > 4. DMBOK Pyramid (Aiken)
> > 5. DAMA Data Management Framework Evolved
> >
> > ### Strategic Alignment Model (SAM)
> >
> > Dikembangkan oleh **Henderson & Venkatraman (1999)**. Mengabstraksikan **pendorong fundamental** pendekatan data management: keselarasan antara **strategi bisnis, strategi TI, struktur organisasi/proses bisnis, dan infrastruktur/proses TI**.
> >
> > ### Amsterdam Information Model
> >
> > Dikembangkan oleh **Abcouwer, Maes, dan Truijens (1997)**. Mengambil **perspektif strategis** pada keselarasan bisnis–TI, dengan dimensi horizontal (bisnis vs TI) dan vertikal (strategis vs operasional), diperluas dengan konsep **pengelolaan informasi** sebagai penghubung.
> >
> > ### DAMA-DMBOK Framework
> >
> > **DAMA** (Data Management Association) adalah organisasi nirlaba global. **DMBOK** terbit edisi 1 pada **November 2009** dan edisi 2 pada **Juli 2017**. Ia memberi konteks bagi pekerjaan profesional data management di berbagai **knowledge area**.
> >
> > Tiga komponen:
> >
> > | Komponen | Isi |
> > | --- | --- |
> > | **DAMA Wheel** | Knowledge area yang membentuk keseluruhan cakupan data management (Data Governance di tengah) |
> > | **Environmental Factors Hexagon** | Hubungan **people, process, technology** |
> > | **Knowledge Area Context Diagram** | Detail tiap knowledge area: aktivitas, input, output, pelaku, tools, metrics |
> >
> > ```mermaid
> > flowchart TD
> >     G(("Data<br/>Governance"))
> >     G --- A["Data Architecture"]
> >     G --- M["Data Modeling<br/>&amp; Design"]
> >     G --- ST["Data Storage<br/>&amp; Operations"]
> >     G --- SEC["Data Security"]
> >     G --- INT["Data Integration<br/>&amp; Interoperability"]
> >     G --- DOC["Document &amp;<br/>Content Mgmt"]
> >     G --- REF["Reference &amp;<br/>Master Data"]
> >     G --- DW["DW &amp; BI"]
> >     G --- META["Metadata"]
> >     G --- Q["Data Quality"]
> > ```
> >
> > ### Aiken Pyramid
> >
> > Kerangka **Peter Aiken**: memakai area fungsional DMBOK untuk menggambarkan kondisi organisasi pada umumnya. Piramida terinspirasi DAMA Wheel tetapi menunjukkan **hubungan antar knowledge area** — fondasi (governance, arsitektur, metadata, quality) harus kuat sebelum kapabilitas di atasnya (BI/analytics) bermanfaat.
> >
> > ### DAMA Framework Evolved
> >
> > - **Sue Geuens**: menekankan **dependensi antar knowledge area**; BI dan Analytics bergantung pada **semua** fungsi data management lain.
> > - **Alternatif ketiga**: memakai konsep **arsitektural** untuk mengusulkan hubungan antar knowledge area, dengan detail tambahan pada beberapa area untuk memperjelas relasinya.

> [!cornell] #### Summary
>
> Framework data management menawarkan perspektif pada tingkat abstraksi berbeda untuk **strategi, roadmap, organisasi tim, dan penyelarasan fungsi**. **SAM** (Henderson & Venkatraman, 1999) menjelaskan pendorong dasar; **Amsterdam Information Model** (1997) memandang keselarasan bisnis–TI secara strategis. **DAMA-DMBOK** (edisi 2: 2017) menyediakan **Wheel** (knowledge areas), **Environmental Factors** (people-process-technology), dan **Context Diagram**. **Aiken Pyramid** dan **DAMA Framework Evolved** (Geuens) menonjolkan **dependensi** antar knowledge area — BI/analytics bergantung pada semua fungsi lain.

> [!ad-libitum]- Additional Information
>
> #### 11 knowledge area DMBOK 2
>
> Data Governance, Data Architecture, Data Modeling & Design, Data Storage & Operations, Data Security, Data Integration & Interoperability, Document & Content Management, Reference & Master Data, Data Warehousing & BI, Metadata, Data Quality. Catatan berikut memperdalam dua di antaranya: [[Pengantar dan Business Drivers Data Governance]] dan [[Istilah Arsitektur, Praktik, dan Komponen Data Architecture]].
>
> #### Framework lain
>
> **COBIT** (tata kelola TI), **TOGAF** (enterprise architecture), **DCAM** (EDM Council), **DGI Data Governance Framework**. Dalam praktik, organisasi sering memadukan DMBOK dengan framework regulasi (mis. UU PDP).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Gambar ulang DAMA Wheel dari memori lalu cocokkan dengan buku DMBOK.
> 2. Pilih satu organisasi dan nilai kematangan kasar tiap knowledge area (skala 1-5).
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 1.4.
> - Henderson, J. C. & Venkatraman, N. (1999). "Strategic alignment: Leveraging information technology for transforming organizations". *IBM Systems Journal*.
> - Aiken, P. (2016). *Data Management Maturity & the DMBOK Pyramid*.
