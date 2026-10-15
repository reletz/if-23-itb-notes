---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] Course Overview and X-Ops Scope
>
> > ## Questions/Cues
> >
> > - Mengapa aplikasi bisnis modern tidak lagi cukup dipandang sebagai "sekadar kode"?
> > - Apa tujuan (goals) dan capaian pembelajaran (outcome) dari X-Ops?
> > - Apa arti "mengoperasionalkan" perangkat lunak?
> > - Bagaimana struktur kuliah, penilaian, dan aturan integritas akademiknya?
> > - Topik apa saja yang dicakup di mata kuliah ini?
> >
> > ## Reference Points
> >
> > - IF4054 Course Introduction (Slides 2-9)
>
> > ### Mengapa X-Ops?
> >
> > Di era digital, sebuah **aplikasi bisnis bukan hanya kode**. Ia adalah kombinasi dari **data**, **infrastruktur yang highly-available**, dan **lingkungan cloud on-demand**. Agar andal, aman, dan produktif, tim *development*, *security*, *network*, dan *cloud* harus berkolaborasi dengan tim *IT operations* — bukan bekerja di silo masing-masing.
> >
> > Dua tujuan utama **X-Ops**:
> >
> > - Membangun **enterprise technology stack** yang memungkinkan **otomasi** dan mengurangi duplikasi teknologi serta proses.
> > - Memungkinkan profesional data dan analitik untuk **mengoperasionalkan proses dan otomasinya sejak awal**, bukan sebagai *afterthought* di akhir proyek.
> >
> > ### Apa Arti "Mengoperasionalkan" Perangkat Lunak?
> >
> > **Operationalize** berarti menerapkan pendekatan sistematis untuk mengotomasi proses *build* perangkat lunak dan mengorkestrasi proses operasional sehingga memenuhi **tujuan terukur** yang selaras dengan prioritas bisnis. Slide mengelompokkannya menjadi tiga lapis:
> >
> > | Lapis | Isi |
> > |---|---|
> > | **Best Practices** | Agility, Automations, Integrated Configuration & Change Management, Monitoring |
> > | **Tools** | Containerization & Orchestration, CI/CD, Monitoring tools, aspek Cloud |
> > | **Fields** | DevOps, DataOps, MLOps |
> >
> > ```mermaid
> > flowchart TD
> >     X["X-Ops"]
> >     X --> D["DevOps<br/>(software)"]
> >     X --> DO["DataOps<br/>(data)"]
> >     X --> M["MLOps<br/>(model ML)"]
> >     D --> P["Best practices:<br/>agility, automation,<br/>config mgmt, monitoring"]
> >     DO --> P
> >     M --> P
> > ```
> >
> >
> > ### Peta Topik
> >
> > Pengantar X-Ops → DevOps, MLOps, DataOps → budaya, prinsip, praktik, metrik/KPI, dan tools → CI/CD → Infrastructure as Code → Observability → Security dalam X-Ops.

> [!cornell] #### Summary
>
> **X-Ops** lahir karena aplikasi modern adalah gabungan **kode, data, infrastruktur, dan cloud** yang butuh kolaborasi lintas tim dan **otomasi** sejak awal. Mata kuliah ini mengajarkan cara **mengoperasionalkan** perangkat lunak — menerapkan **best practices** (agility, automation, configuration management, monitoring) dan **tools** (container, orchestration, CI/CD, monitoring) pada tiga bidang: **DevOps, DataOps, dan MLOps**. Capaiannya meliputi pemahaman prinsip, pengalaman hands-on container/CI/CD, hingga mendesain sistem X-Ops, dengan kehadiran minimum **70%** dan larangan keras terhadap kecurangan.

> [!ad-libitum]- Additional Information
>
> #### Mengapa Kata "X"?
>
> Huruf **X** adalah placeholder: **Dev**Ops, **Data**Ops, **ML**Ops, **Sec**Ops, **FinOps**, **GitOps**, dan seterusnya. Benang merahnya sama — membawa disiplin *build–release–operate* yang terotomasi dan terukur ke domain baru.
>
> #### Proyek Eksplorasi Mandiri
> 1. Pilih satu aplikasi yang Anda pakai sehari-hari, lalu petakan komponen **kode, data, infrastruktur, dan cloud**-nya. Bagian mana yang paling rawan jika tidak diotomasi?
> 2. Buat daftar sederhana: tahap apa saja dalam proyek kuliah Anda saat ini yang masih manual (build, test, deploy)?
>
> #### Bacaan Lanjutan
> - Kim, Humble, Debois, Willis — *The DevOps Handbook*.
> - Parikh & Johri (2022) — *Combining DataOps, MLOps and DevOps* (referensi pada slide).
