---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Organisasi dan Operating Model Data Governance
>
> > ## Questions/Cues
> >
> > - Fungsi apa saja yang dijalankan **organisasi data governance**?
> > - Apa tiga **operating model** data governance?
> > - Apa beda model **centralized**, **replicated**, dan **federated**?
> > - Bagaimana memilih model yang sesuai?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Governance (Slides 15-19)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 3.2.3-3.2.4
>
> > ### Fungsi Organisasi Data Governance
> >
> > Struktur DG meniru **pemisahan kekuasaan** dalam pemerintahan. Ia mencakup:
> >
> > - **Fungsi legislatif** — mendefinisikan kebijakan, standar, dan Enterprise Data Architecture.
> > - **Fungsi yudisial** — manajemen isu dan eskalasi.
> > - **Fungsi eksekutif** — melindungi dan melayani; tanggung jawab administratif.
> >
> > Biasanya berlapis: *Data Governance Council / Steering Committee* di puncak, *Data Governance Office (DGO)*, lalu *working groups* dan para steward.
> >
> > ### Tiga Operating Model
> >
> > | Model | Deskripsi | Cocok untuk |
> > | --- | --- | --- |
> > | **Centralized** | **Satu** organisasi DG mengawasi **semua aktivitas di semua subject area** | Organisasi kecil/menengah atau regulasi ketat dengan kontrol seragam |
> > | **Replicated** | **Model dan standar DG yang sama** diadopsi oleh **tiap unit bisnis** | Banyak unit semi-otonom dengan kebutuhan serupa |
> > | **Federated** | **Satu organisasi DG** berkoordinasi dengan **banyak unit bisnis** untuk menjaga definisi dan standar tetap konsisten | Enterprise besar dengan unit beragam namun butuh konsistensi lintas-unit |
> >
> > ```mermaid
> > flowchart TB
> >     subgraph C["Centralized"]
> >         CG["DG tunggal"] --> CU1["Unit A"]
> >         CG --> CU2["Unit B"]
> >         CG --> CU3["Unit C"]
> >     end
> >     subgraph R["Replicated"]
> >         RG1["DG unit A"]
> >         RG2["DG unit B"]
> >         RG3["DG unit C"]
> >     end
> >     subgraph F["Federated"]
> >         FG["DG enterprise"] --- FU1["DG unit A"]
> >         FG --- FU2["DG unit B"]
> >         FG --- FU3["DG unit C"]
> >     end
> > ```
> >
> > ### Trade-off
> >
> > - **Centralized**: konsistensi tinggi, tetapi bisa menjadi *bottleneck* dan jauh dari konteks unit.
> > - **Replicated**: fleksibel per unit, tetapi **risiko divergensi** definisi antar unit.
> > - **Federated**: keseimbangan lokal vs enterprise, namun butuh koordinasi lebih berat.

> [!cornell] #### Summary
>
> Organisasi DG menjalankan fungsi **legislatif** (kebijakan, standar, Enterprise Data Architecture), **yudisial** (manajemen isu & eskalasi), dan **eksekutif** (melindungi & melayani). Tiga **operating model**: **centralized** (satu DG untuk semua subject area), **replicated** (model dan standar sama dipakai tiap unit bisnis), **federated** (satu DG berkoordinasi dengan banyak unit untuk menjaga definisi dan standar konsisten). Pilihan model adalah trade-off antara konsistensi, fleksibilitas lokal, dan beban koordinasi.

> [!ad-libitum]- Additional Information
>
> #### Struktur umum program DG
>
> Executive sponsor → Data Governance Council → Data Governance Office → Domain/Working groups → Data stewards (lihat [[Data Stewardship, Data Policies, dan Valuasi Data]]). RACI disusun untuk keputusan kunci (siapa setuju kebijakan, siapa memiliki domain).
>
> #### Kapan beralih model
>
> Banyak organisasi memulai **centralized** lalu bergerak ke **federated** seiring bertambahnya unit bisnis dan kebutuhan lokal.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Pilih sebuah grup perusahaan (mis. bank dengan banyak anak usaha) dan tentukan model yang paling cocok beserta alasan.
> 2. Gambar RACI sederhana untuk keputusan "menetapkan definisi tunggal *Customer*".
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 3.2.
> - Thomas, G. *The DGI Data Governance Framework: The Data Governance Institute*.
