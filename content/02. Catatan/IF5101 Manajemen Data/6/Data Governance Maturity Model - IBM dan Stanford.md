---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Data Governance Maturity Model - IBM dan Stanford
>
> > ## Questions/Cues
> >
> > - Apa fungsi **maturity model** dalam data governance?
> > - Apa itu **CMM** dan bagaimana hubungannya dengan model IBM?
> > - Apa yang dinilai oleh **IBM Data Governance Maturity Model**?
> > - Apa kekhasan **Stanford Data Governance Maturity Model**?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Governance (Slides 28-32)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 3.6 (Maturity Assessment)
>
> > ### Fungsi Maturity Model
> >
> > **Maturity model** membantu organisasi **menilai kondisi saat ini** program data governance-nya dan merencanakan peningkatan bertahap. Dua model dibahas singkat: **IBM** dan **Stanford**.
> >
> > ### Dasar: CMM
> >
> > **Capability Maturity Model (CMM)** dikembangkan oleh **Software Engineering Institute (SEI)** pada **1984** untuk mengembangkan dan menyempurnakan proses pengembangan perangkat lunak. Levelnya umumnya:
> >
> > 1. **Initial / ad hoc**
> > 2. **Repeatable / managed**
> > 3. **Defined**
> > 4. **Quantitatively managed**
> > 5. **Optimizing**
> >
> > ```mermaid
> > flowchart LR
> >     L1["1 Initial<br/>ad hoc"] --> L2["2 Repeatable"] --> L3["3 Defined"] --> L4["4 Managed<br/>(terukur)"] --> L5["5 Optimizing"]
> > ```
> >
> > ### IBM Data Governance Maturity Model
> >
> > - Dipublikasikan **Oktober 2007**.
> > - Berbasis **CMM**.
> > - Membantu menilai dan mengukur kemajuan di setiap dari **11 domain data governance**, masing-masing dinilai pada level kematangan.
> >
> > ### Stanford Data Governance Maturity Model
> >
> > - Dikembangkan **2011** oleh **Data Governance Office Stanford University**.
> > - Diadaptasi dari model lain seperti **IBM** dan **CMM**.
> > - Berbasis **struktur program DG** Stanford, dengan fokus pada **aspek fondasional dan aspek proyek**.
> >
> > | Aspek | IBM | Stanford |
> > | --- | --- | --- |
> > | Tahun | 2007 | 2011 |
> > | Basis | CMM | IBM + CMM + struktur program internal |
> > | Fokus | 11 domain DG | Komponen *foundational* dan *project* |

> [!cornell] #### Summary
>
> **Maturity model** dipakai menilai kondisi program DG saat ini. **IBM model** (Oktober 2007) berbasis **CMM** (SEI, 1984) dan menilai **11 domain** DG. **Stanford model** (2011, Stanford Data Governance Office) diadaptasi dari IBM/CMM berdasarkan struktur program DG-nya dengan fokus pada aspek **foundational** dan **project**. Keduanya membantu menetapkan *baseline* dan target peningkatan bertahap.

> [!ad-libitum]- Additional Information
>
> #### Model lain
>
> **DCAM** (EDM Council), **CMMI DMM** (Data Management Maturity), dan **Gartner EIM Maturity Model**. DMBOK Chapter 3.6 menyarankan memilih satu model, menilai *baseline*, lalu menilai ulang berkala.
>
> #### Pitfall
>
> Mengejar level tertinggi untuk semua domain bukan tujuan; targetkan level yang sepadan dengan kebutuhan bisnis dan regulasi.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Nilai organisasi pilihan Anda pada skala 1-5 untuk 5 domain DG (policy, stewardship, quality, security, metadata) beserta bukti.
> 2. Tentukan target 12 bulan ke depan dan tiga inisiatif untuk mencapainya.
>
> #### Bacaan Lanjutan
>
> - IBM Data Governance Council (2007). *The IBM Data Governance Council Maturity Model: Building a roadmap for effective data governance*.
> - Stanford University Data Governance Office — *Data Governance Maturity Model* (2011).
> - Paulk, M. et al. (1993). *Capability Maturity Model for Software*, SEI.
