---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Tools, Implementasi, Risiko, Governance, dan Metrics Data Architecture
>
> > ## Questions/Cues
> >
> > - Tools dan teknik apa yang dipakai dalam data architecture?
> > - Apa saja pedoman **implementasi** awal?
> > - Risiko besar apa yang mengancam proyek data architecture?
> > - Faktor apa yang menentukan penerimaan organisasi terhadap praktik ini?
> > - Bagaimana **governance** dan **metrics** data architecture dirancang?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Architecture (Slides 44-50)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 4.3-4.6
>
> > ### Tools dan Techniques
> >
> > | Tools | Teknik |
> > | --- | --- |
> > | **Data modeling tools** — mengelola model data enterprise di semua level | **Lifecycle projections** — desain bisa aspirasional/masa depan, aktif terimplementasi, atau rencana pensiun; semuanya harus didokumentasikan |
> > | **Asset management software** — melacak lisensi dan data aset untuk menekan biaya dan mengoptimalkan jejak TI | **Diagrammatic clarity** — model dan diagram mengikuti konvensi visual yang sudah ditetapkan |
> > | **Graphical design applications** — diagram arsitektur, data flow, data value chain | |
> >
> > ### Implementation Guidelines
> >
> > 1. **Mengorganisasi** tim dan forum Enterprise Data Architecture.
> > 2. **Menghasilkan versi awal artefak**: enterprise data model, enterprise-wide data flow, roadmap.
> > 3. **Membentuk cara kerja arsitektural** dalam proyek pengembangan.
> > 4. **Membangun kesadaran** organisasi akan nilai upaya data architecture.
> >
> > ### Risiko Signifikan
> >
> > ```mermaid
> > mindmap
> >   root((Risiko<br/>proyek DA))
> >     Dukungan
> >       Kurang dukungan manajemen
> >       Sponsor ragu
> >       Keputusan eksekutif kontraproduktif
> >     Pengalaman
> >       Tanpa rekam jejak
> >       Project leader kurang berpengalaman
> >     Budaya
> >       Culture shock
> >       Dominasi pandangan satu dimensi
> > ```
> >
> > ### Perubahan Organisasi dan Budaya
> >
> > Kemampuan adopsi bergantung pada: **penerimaan budaya** terhadap pendekatan arsitektural; pengakuan data sebagai **aset bisnis, bukan hanya urusan TI**; kemampuan melepas perspektif lokal ke **perspektif enterprise**; kemampuan memasukkan **deliverable arsitektural ke metodologi proyek**; tingkat penerimaan **formal data governance**; serta kemampuan melihat enterprise secara holistik, bukan hanya penyelesaian proyek dan solusi TI (Edvinsson, 2013).
> >
> > ### Data Architecture Governance
> >
> > Enterprise Data Architecture dan organisasi **Data Governance** harus selaras. Idealnya, **data architect dan data steward** ditunjuk untuk setiap subject area, bahkan setiap entitas dalam subject area. Aktivitas governance: **mengawasi proyek, mengelola desain/lifecycle/tools, mendefinisikan standar, menciptakan artefak terkait data**.
> >
> > ### Metrics
> >
> > | Kategori | Contoh pengukuran |
> > | --- | --- |
> > | **Architecture standards compliance rate** | Seberapa patuh proyek terhadap arsitektur data dan proses keterlibatan EA |
> > | **Implementation trends** | *Use/reuse/replace/retire* (proporsi artefak baru vs dipakai ulang/diganti/dipensiunkan); *project execution efficiency* (lead time dan biaya sumber daya) |
> > | **Business value** | *Business agility* (manfaat lifecycle & biaya penundaan), *business quality* (business case terpenuhi), *business operation quality* (efisiensi), *business environment improvements* |

> [!cornell] #### Summary
>
> **Tools**: data modeling, asset management, graphical design; **teknik**: lifecycle projections dan diagrammatic clarity. **Implementasi**: organisasi tim, artefak awal (EDM, data flow, roadmap), cara kerja dalam proyek, dan kesadaran nilai. **Risiko**: kurang dukungan manajemen, tanpa rekam jejak, sponsor ragu, keputusan eksekutif kontraproduktif, culture shock, project leader kurang berpengalaman, pandangan satu dimensi. Adopsi bergantung pada **budaya enterprise**; **governance** menyelaraskan EDA dengan DG (architect + steward per subject area). **Metrics**: compliance rate, implementation trends, dan business value.

> [!ad-libitum]- Additional Information
>
> #### Tools nyata
>
> ER/Studio, erwin Data Modeler, SQLDBM, dbdiagram.io, draw.io/diagrams.net, Lucidchart, ArchiMate lewat Archi (gratis), serta *docs-as-code* (Mermaid, Structurizr) di repositori.
>
> #### Mengaitkan metrics ke kematangan
>
> Gunakan metrics ini sebagai bagian scorecard di [[Aktivitas, Metrics, Tools, dan Scorecards Data Governance]] agar data architecture dan governance diukur dengan bahasa yang sama.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis daftar 7 risiko di atas sebagai risk register (probabilitas, dampak, mitigasi) untuk proyek data architecture fiktif.
> 2. Rancang tiga metrics (satu per kategori) lengkap dengan cara pengambilan datanya.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 4.3-4.6.
> - Edvinsson, H. (2013). "Enterprise architecture management and organizational culture" (dalam referensi DMBOK Chapter 4).
