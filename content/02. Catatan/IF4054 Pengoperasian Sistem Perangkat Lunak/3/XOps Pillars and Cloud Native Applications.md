---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF4054 Pengoperasian Sistem Perangkat Lunak]]

> [!cornell] XOps Pillars and Cloud Native Applications
>
> > ## Questions/Cues
> >
> > - Apa yang dimaksud XOps dan apa empat pilarnya?
> > - Bagaimana satu lifecycle dilihat dari empat lensa berbeda?
> > - Apa metrik keberhasilan DevOps?
> > - Apa ciri aplikasi cloud native dan praktik DevOps yang *bukan* target kita?
> >
> > ## Reference Points
> >
> > - IF4054 DevOps (Slides 5-7)
> > - IF4054 Foundations & Architecture (Slides 3-9)
>
> > ### Apa Itu XOps?
> >
> > **XOps** adalah penerapan disiplin yang sama — **otomasi, versioning, testing, monitoring** — pada setiap artefak yang dihasilkan tim: **kode, data, dan model**. Huruf "X" bervariasi menurut artefak. Semua varian meminjam loop inti yang sama: *plan → build → test → release → operate → monitor → feedback*. Taksonominya ada untuk memberi **kosakata bersama**, bukan membuat tembok antar-disiplin.
> >
> > ### Empat Pilar
> >
> > | Pilar | Fokus |
> > |---|---|
> > | **DevOps** | Build, test, dan release software secara andal dan sering; fondasi bagi pilar lain |
> > | **DataOps** | Disiplin CI/CD untuk data pipeline: ingestion, quality, schema, lineage |
> > | **MLOps** | Memperluas DevOps ke siklus hidup model: eksperimen, training, versioning, serving |
> > | **SecOps** | Menyisipkan security (scanning, least privilege, compliance) ke **setiap tahap**, bukan ditempel di akhir |
> >
> > Beberapa detail penting dari slide:
> >
> > - **DevOps** diukur dengan metrik delivery: **deployment frequency, lead time, change failure rate, time to restore**.
> > - **DataOps**: data quality checks (validasi skema, deteksi anomali) menjadi **pipeline gate**, setara unit test; **lineage** memungkinkan menelusuri angka di dashboard ke data mentahnya.
> > - **MLOps**: model diperlakukan sebagai **artefak berversi** seperti container image; **Continuous Training (CT)** adalah jawaban MLOps atas CI.
> > - **SecOps**: sebuah **lensa**, bukan pilar terpisah; mencakup PII masking, access auditing, dan risiko adversarial pada model.
> >
> > ### Satu Lifecycle, Empat Lensa
> >
> > ```mermaid
> > flowchart TD
> >     PL["Plan<br/>kode, data, model"] --> BU["Build<br/>DevOps + DataOps + MLOps"]
> >     BU --> VE["Verify<br/>test, quality gate, scan"]
> >     VE --> RE["Release<br/>artefak, data, model"]
> >     RE --> OP["Operate<br/>sistem, pipeline, drift"]
> >     OP --> PL
> > ```
> >
> > ### Aplikasi Cloud Native
> >
> > Aplikasi **cloud native** secara inheren **scalable, flexible, dan resilient**. Karakteristiknya:
> >
> > - **Microservice architecture** — bagian-bagian kecil yang *loosely coupled*.
> > - **Containerization** — lingkungan konsisten, portabel, ringan.
> > - **DevOps dan automation** — scalability, resilience, konsistensi, delivery mulus.
> > - **Dynamic orchestration** — skala dan toleransi kegagalan.
> >
> > Slide menegaskan hal yang **bukan** target: provisioning dan konfigurasi infrastruktur **manual**, deploy ke server fisik/VM, scaling secara **vertikal**, dan resilience dengan server redundan semata.
> >
> > ### Praktik Umum DevOps
> >
> > **Monitoring dan logging** (menangkap dan menganalisis perilaku serta performa sistem) dan **komunikasi dan kolaborasi** (teamwork, berbagi pengetahuan, alur kerja ramping lintas development, operations, dan stakeholder lain).

> [!cornell] #### Summary
>
> **XOps** menerapkan otomasi, versioning, testing, dan monitoring pada kode, data, dan model; empat pilarnya adalah **DevOps, DataOps, MLOps, dan SecOps** yang berbagi satu lifecycle (*Plan → Build → Verify → Release → Operate*). DevOps diukur lewat **deployment frequency, lead time, change failure rate, time to restore**, sedangkan SecOps adalah **lensa** di setiap tahap. Target arsitekturnya adalah aplikasi **cloud native**: microservice, container, otomasi DevOps, dan orchestration dinamis — bukan provisioning manual dan scaling vertikal.

> [!ad-libitum]- Additional Information
>
> #### DORA Metrics
>
> Empat metrik delivery di atas dikenal sebagai **DORA metrics** (DevOps Research and Assessment). Riset DORA (*Accelerate*, Forsgren dkk.) menunjukkan metrik ini berkorelasi dengan performa organisasi.
>
> #### Proyek Eksplorasi Mandiri
> 1. Hitung kasar empat metrik DORA untuk repositori proyek Anda dari riwayat Git dan CI.
>
> #### Bacaan Lanjutan
> - Forsgren, Humble, Kim — *Accelerate*.
> - CNCF — *Cloud Native Definition*.
