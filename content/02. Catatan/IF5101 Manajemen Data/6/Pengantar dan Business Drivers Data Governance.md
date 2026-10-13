---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Pengantar dan Business Drivers Data Governance
>
> > ## Questions/Cues
> >
> > - Apa definisi **data governance** dan apa tujuannya?
> > - Apa beda **data governance** dan **data management**?
> > - Mengapa pemisahan **oversight** vs **execution** penting?
> > - Apa saja **business drivers** data governance?
> > - Bagaimana drivers dikelompokkan menjadi *reducing risks* dan *improving processes*?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Governance (Slides 4-10)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 3 (Data Governance)
>
> > ### Definisi
> >
> > **Data governance** adalah *pelaksanaan otoritas dan kendali* (**planning, monitoring, dan enforcement**) atas pengelolaan aset data.
> >
> > Tujuannya memastikan data **dikelola dengan benar sesuai kebijakan dan best practice** (Ladley, 2012). Fokusnya pada **bagaimana keputusan tentang data dibuat** dan bagaimana orang serta proses diharapkan berperilaku terhadap data.
> >
> > ### Governance vs. Management
> >
> > Data governance merepresentasikan **pemisahan tugas (separation of duty)** antara **pengawasan (oversight)** dan **eksekusi (execution)**. Governance memastikan data dikelola dengan benar **tanpa mengeksekusi sendiri** data management.
> >
> > ```mermaid
> > flowchart LR
> >     DG["Data Governance<br/>(oversight)<br/>kebijakan, standar, keputusan"] -->|"mengarahkan &amp; mengawasi"| DM["Data Management<br/>(execution)<br/>aktivitas operasional"]
> >     DM -->|"melaporkan kepatuhan &amp; metrics"| DG
> > ```
> >
> > ### Business Drivers
> >
> > **Pendorong paling umum** adalah **kepatuhan regulasi (regulatory compliance)**, terutama pada industri yang ketat diatur seperti **keuangan dan kesehatan**. Menanggapi legislasi yang terus berkembang menuntut proses governance yang ketat. Ledakan **advanced analytics dan data science** menjadi pendorong tambahan.
> >
> > | Kelompok | Driver | Penjelasan |
> > | --- | --- | --- |
> > | **Reducing risks** | General risk management | Pengawasan risiko data terhadap keuangan/reputasi, termasuk legal dan regulasi |
> > | | Data security | Proteksi aset data lewat kontrol *availability, usability, integrity, consistency, auditability, security* |
> > | | Privacy | Kontrol data privat/rahasia/PII lewat kebijakan dan pemantauan kepatuhan |
> > | **Improving processes** | Regulatory compliance | Merespons kebutuhan regulasi secara efisien dan konsisten |
> > | | Data quality improvement | Meningkatkan kinerja bisnis dengan data yang lebih andal |
> > | | Metadata management | Business glossary untuk mendefinisikan dan menemukan data |
> > | | Efficiency in development projects | Perbaikan SDLC dan pengelolaan *technical debt* data |
> > | | Vendor management | Kontrol kontrak terkait data: cloud storage, pembelian data eksternal, outsourcing |

> [!cornell] #### Summary
>
> **Data governance** = pelaksanaan otoritas dan kendali (planning, monitoring, enforcement) atas pengelolaan aset data; ia menetapkan **bagaimana keputusan tentang data dibuat** dan memisahkan **oversight** dari **execution** data management. Pendorong utamanya **kepatuhan regulasi**, ditambah ledakan analytics. Drivers dikelompokkan: **reducing risks** (risk management, security, privacy) dan **improving processes** (compliance, data quality, metadata/glossary, efisiensi pengembangan, vendor management).

> [!ad-libitum]- Additional Information
>
> #### Contoh regulasi pendorong
>
> GDPR (EU), HIPAA (kesehatan AS), SOX (laporan keuangan), Basel III (perbankan), UU PDP dan regulasi OJK/BI di Indonesia. Setiap regulasi diterjemahkan menjadi kontrol data konkret (retensi, akses, audit trail).
>
> #### Governance ≠ IT governance
>
> Data governance adalah **program bisnis**; ia mengatur keputusan TI terkait data, tetapi bukan sekadar urusan departemen TI (lihat [[Goals, Principles, dan Data-centric Organization]]).
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Pilih satu regulasi (mis. UU PDP) dan petakan tiga kewajibannya ke driver di tabel di atas.
> 2. Tulis satu halaman "piagam" data governance untuk organisasi fiktif: tujuan, ruang lingkup, drivers.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 3.1-3.2.
> - Ladley, J. (2012). *Data Governance: How to Design, Deploy and Sustain an Effective Data Governance Program*. Morgan Kaufmann.
