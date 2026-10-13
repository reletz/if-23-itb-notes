---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Aktivitas, Metrics, Tools, dan Scorecards Data Governance
>
> > ## Questions/Cues
> >
> > - Apa saja **aktivitas** program data governance dari awal sampai tertanam?
> > - Metrics apa yang dipakai untuk mengukur DG?
> > - Tools dan teknik apa yang mendukung DG?
> > - Apa itu **DG scorecard** dan apa lima kategori contohnya?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Governance (Slides 23-27)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 3.3-3.6
>
> > ### Aktivitas Data Governance
> >
> > Rangkaian aktivitas dari mendefinisikan program sampai menanamkannya:
> >
> > ```mermaid
> > flowchart LR
> >     A["Define DG for<br/>the organization"] --> A1["Readiness assessment"]
> >     A1 --> A2["Discovery &amp;<br/>business alignment"]
> >     A2 --> A3["Organizational<br/>touch points"]
> >     A3 --> B["Develop DG strategy"]
> >     B --> B1["Operating framework"]
> >     B1 --> B2["Goals, principles,<br/>policies"]
> >     B2 --> C["Implement DG"]
> >     C --> D["Embed DG"]
> > ```
> >
> > Aktivitas pendukung: **underwrite** proyek data management, **change management**, **issue management**, asesmen **kebutuhan kepatuhan regulasi**, sponsor **standar & prosedur data**, membangun **business glossary**, koordinasi dengan **grup arsitektur**, dan sponsor **valuasi aset data**.
> >
> > ### Metrics
> >
> > Mengukur progres peluncuran, kepatuhan terhadap persyaratan DG, dan **nilai** yang diberikannya.
> >
> > | Kategori | Contoh |
> > | --- | --- |
> > | **Value** | Kontribusi ke tujuan bisnis; pengurangan risiko; peningkatan efisiensi operasi |
> > | **Effectiveness** | Pencapaian goal; sejauh mana steward memakai tools; efektivitas komunikasi & pelatihan; kecepatan adopsi perubahan |
> > | **Sustainability** | Kinerja kebijakan dan proses; kesesuaian terhadap standar dan prosedur |
> >
> > ### Tools dan Teknik
> >
> > Program DG harus mengelola pekerjaan dan datanya sendiri secara efektif. Contoh: **online presence / website**, **business glossary**, **workflow tools**, **document management tools**, **DG scorecards**, dan **maturity model**.
> >
> > ### Data Governance Scorecard
> >
> > Kumpulan metrics untuk **melacak aktivitas DG dan kepatuhan kebijakan**, dilaporkan ke *data governance council* dan *steering committee*.
> >
> > - Didefinisikan di level **enterprise atau bisnis** (bergantung operating model).
> > - **Diukur dan dilaporkan secara berkala**.
> > - Dapat dipecah menjadi scorecard **steward bisnis** atau **proyek**.
> > - Tidak ada standar kategori; bergantung implementasi, industri, budaya, dan kebutuhan.
> >
> > **Contoh lima kategori:**
> >
> > | Kategori | Tujuan | Contoh KPI |
> > | --- | --- | --- |
> > | **Organization** | Skill data, pelatihan, kematangan program | # steward tersertifikasi, kepuasan karyawan |
> > | **Data infrastructure** | Kemajuan penyimpanan, sistem, aplikasi | # sistem yang memakai master data, % penurunan TCO |
> > | **Data controls** | Kepatuhan standar data, kelengkapan metadata | Hasil compliance test, % penurunan kegagalan kebijakan |
> > | **Data quality** | Perbaikan dimensi kualitas | % peningkatan completeness, accuracy rate |
> > | **Financial** | ROI DG pada level proyek/program | Budget vs aktual, % penghematan anggaran operasi |

> [!cornell] #### Summary
>
> Aktivitas DG bergerak dari **mendefinisikan program** (readiness, discovery, touch points) → **strategi dan operating framework, goals, principles, policies** → **implementasi** (glossary, standar, change & issue management, valuasi) → **embed**. **Metrics** terbagi **value, effectiveness, sustainability**. Tools: website, glossary, workflow, document management, scorecard, maturity model. **Scorecard** melaporkan metrics ke council dalam kategori seperti **organization, data infrastructure, data controls, data quality, financial**.

> [!ad-libitum]- Additional Information
>
> #### Tools nyata
>
> Collibra, Alation, Atlan, Microsoft Purview, Informatica Axon (katalog/glossary & workflow); Apache Atlas dan DataHub (open source). Pilihan tool kurang penting dibanding kejelasan owner dan proses.
>
> #### Anti-pattern
>
> Metrics yang hanya "jumlah kebijakan terbit" tanpa mengukur dampak. Pilih leading dan lagging indicator, mis. waktu penyelesaian isu kualitas data.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Rancang scorecard satu halaman dengan 3 KPI per kategori untuk organisasi pilihan.
> 2. Bangun business glossary kecil (10 istilah) dalam spreadsheet dengan owner, definisi, dan sumber.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 3.3-3.6.
> - Eryurek, E. et al. (2021). *Data Governance: The Definitive Guide*. O'Reilly.
