---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3141 Sistem Informasi]]

> [!cornell] Stakeholders and Architecture Governance
>
> > ## Questions/Cues
> >
> > - Siapa saja stakeholders dalam arsitektur?
> > - Apa peran architecture planning (strategic vs tactical)?
> > - Mengapa governance krusial dalam architecture management?
> > - Apa tiga hal yang dibutuhkan governance?
> > - Apa saja governance processes?
> >
> > ## Reference Points
> >
> > - IF3141 Sistem Informasi (Slides 28-32)
>
> > ### Stakeholders dan Roles dalam Arsitektur
> >
> > Arsitektur melibatkan banyak **stakeholder** dengan kepentingan beragam. Daftar stakeholder dan role utama:
> >
> > - **Organisation owners/board** — pemilik dan dewan direksi yang menetapkan arah strategis
> > - **External legal, standard dan compliance regimes** — rezim hukum, standar, dan kepatuhan eksternal
> > - **Senior business management** — manajemen bisnis senior
> > - **Project, programme dan portfolio management** — pengelola proyek, program, dan portofolio
> > - **Operations managers** — manajer operasional
> > - **Process workers dan application users** — pekerja proses dan pengguna aplikasi
> > - **Suppliers** — pemasok
> > - **Solutions developers** — pengembang solusi
> >
> > Setiap stakeholder memiliki **concerns** berbeda yang harus dipenuhi arsitektur — dari kepatuhan regulasi (legal regimes) hingga usability (application users).
> >
> > ### Architecture Planning: Strategic
> >
> > Dalam **Architecture Management**, terdapat fungsi **Architecture Planning**. Pada tingkat **strategic**, EA seharusnya menjadi fungsi **business-as-usual** yang terus-menerus membantu organisasi mengelola **strategic change**. Selain memelihara EA content, fungsi ini melakukan **prioritisasi dan perencanaan tactical change activities**, yang sering dikomunikasikan dalam bentuk **road-map**. Road-map menggambarkan urutan perubahan untuk mencapai visi strategis.
> >
> > ### Architecture Planning: Tactical
> >
> > Pada tingkat **tactical**, enterprise dan solution architects dapat terlibat dalam sejumlah **proyek** — misalnya sebuah **programme** yang men-deliver beberapa perubahan sesuai EA road-map. Ketika terdapat beberapa deliverable terpisah yang harus dirakit menjadi solusi holistik, **programme plan** dapat dipandang sebagai **tactical road-map yang lebih detail** — mencerminkan **inter-project dependencies** dan isu sinkronisasi yang perlu dikelola sebagai **risks**.
> >
> > ### Architecture Governance: Mengapa Krusial
> >
> > **Governance** telah disebut berulang kali sepanjang bab ini. Ia adalah **fungsi kunci** seorang arsitek dan bagian penting dari **architecture management**. Analogi tegasnya: *"Architecture without governance is like requirements without testing."* — arsitektur tanpa governance tidak ada gunanya, sebagaimana requirements tanpa pengujian.
> >
> > Governance perlu **mengawasi seluruh aspek**, terutama melalui **validation dan verification** terhadap **struktur akhir** maupun **kepatuhan** pada principles dan constraints lain yang dikenakan pada pengembangannya. Governance memerlukan tiga hal: **sesuatu untuk di-govern**, **defined governance roles** dengan otoritas, dan **governance processes**.
> >
> > ### Something to Govern dan Governance Roles
> >
> > **Something to govern** mencakup:
> >
> > - **Architecture contract** yang mendefinisikan roles, responsibilities, dan authorities
> > - **Target system organisation/structures** (komponen dan relasinya) sebagaimana dideskripsikan pada level abstrak dalam architecture description
> > - **Requirements** yang mencakup legislasi, standar, principles, dan policies yang berlaku — harus menjadi bagian dari architecture description
> >
> > **Defined governance roles with authority**: Umumnya terdapat **level governance** — dari **corporate**, melalui **enterprise architecture**, hingga **solutions** dan level **specific architecture**. Setiap level memiliki otoritas governance yang sesuai dengan cakupannya.
> >
> > ### Governance Processes
> >
> > **Governance processes** mencakup:
> >
> > - **Menetapkan architecture contract** di awal untuk menggariskan roles, responsibilities, dan authority (termasuk governance roles)
> > - **Mendefinisikan apa yang akan di-review** melalui proses (lihat 'something to govern'), kapan, dan oleh siapa
> > - **Conducting reviews** — menjalankan review
> > - **Reporting dan acting** atas hasil review, yang dapat mencakup pemberian **dispensations** kepada pihak terkait untuk menyimpang dari deskripsi awal dengan alasan valid
> > - **Mengambil tindakan korektif** atas discrepancies atau non-conformities
> >
> > Proses ini memastikan arsitektur yang dibangun benar-benar sesuai dengan rencana, principles, dan policies, serta menyediakan mekanisme formal untuk penyimpangan yang dapat dibenarkan.
> >
> > ```mermaid
> > flowchart LR
> >     G["Something to Govern<br/>(contract, structures,<br/>requirements)"]
> >     R["Conduct Review<br/>(validation & verification)"]
> >     A["Report & Act<br/>(dispensations)"]
> >     C["Corrective Action<br/>(non-conformities)"]
> >     G --> R
> >     R --> A
> >     A --> C
> >     C --> G
> > ```
> >

> [!cornell] #### Summary
>
> Arsitektur melibatkan beragam **stakeholders** — dari **board** dan **legal/compliance regimes** hingga **users**, **suppliers**, dan **developers** — yang masing-masing memiliki concerns berbeda. **Architecture management** mencakup **planning** pada tingkat **strategic** (EA sebagai fungsi BAU yang menghasilkan **road-map**) dan **tactical** (programme plan sebagai road-map detail dengan inter-project dependencies sebagai risks). **Governance** adalah fungsi kunci arsitek — *"architecture without governance is like requirements without testing"* — yang mengawasi melalui validation/verification. Governance membutuhkan tiga hal: **something to govern** (architecture contract, target structures, requirements/principles/policies), **defined governance roles** berjenjang (corporate → EA → solution → specific), dan **governance processes** (menetapkan contract, mendefinisikan review, menjalankan review, melaporkan & memberi dispensations, serta mengoreksi non-conformities).

> [!ad-libitum]- Additional Information
>
> #### Stakeholder Analysis
>
> Teknik **Power/Interest Grid** (Mendelow Matrix) membantu mengklasifikasi stakeholder: *Manage Closely* (high power, high interest), *Keep Satisfied*, *Keep Informed*, dan *Monitor*. Berguna untuk menentukan strategi engagement tiap stakeholder arsitektur.
>
> #### Architecture Review Board (ARB)
>
> Banyak organisasi membentuk **ARB** sebagai badan governance formal yang melakukan review terhadap proposal arsitektur, memberi approval/dispensation, dan memastikan kepatuhan terhadap principles. Mirip dengan governance roles berjenjang yang dijelaskan dalam catatan.
>
> #### TOGAF Governance Framework
>
> TOGAF mendefinisikan **Architecture Governance** dengan empat pilar: *processes, content, organisation,* dan *governance repository*. Phase G (Implementation Governance) dalam ADM memastikan implementasi sesuai target architecture melalui *Architecture Contracts* dan *Compliance Reviews*.
>
> #### Roadmap Tools
>
> - **Capability-Based Planning**: merencanakan road-map berbasis kapabilitas bisnis
> - **Tools**: LeanIX, Sparx EA, Bizzdesign, ServiceNow APM untuk EA road-mapping
>
> #### Self-Exploration Projects
>
> 1. Buat Power/Interest Grid untuk stakeholder proyek sistem informasi rumah sakit.
> 2. Rancang governance process (review checklist + dispensation flow) untuk sebuah Architecture Review Board.
>
> #### Further Reading
>
> - The Open Group. *TOGAF Standard – Architecture Governance*
> - Weill, P., Ross, J. *IT Governance: How Top Performers Manage IT Decision Rights*
> - COBIT 2019 Framework (ISACA) untuk Governance of Enterprise IT
