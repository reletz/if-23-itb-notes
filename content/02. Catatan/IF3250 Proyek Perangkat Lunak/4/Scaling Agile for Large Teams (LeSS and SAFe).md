---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3250 Proyek Perangkat Lunak]]

> [!cornell] Scaling Agile for Large Teams (LeSS and SAFe)
>
> > ## Questions/Cues
> >
> > - Apa isu khusus ketika menerapkan Scrum pada tim besar?
> > - Pola umum apa yang dimiliki semua scaling framework?
> > - Apa itu LeSS dan bagaimana prinsipnya?
> > - Apa itu SAFe dan konsep "value stream" serta "release train"?
> > - Bagaimana sinkronisasi sprint antar tim dilakukan?
> >
> > ## Reference Points
> >
> > - Large Scale Software Development (Halaman 31-33)
> > - Large Scale Software Development (Halaman 34-35)
>
> > ### Isu Scrum pada Tim Besar
> >
> > Saat Scrum diterapkan pada tim yang sangat besar, muncul masalah lintas-tim:
> >
> > - **Cross team dependencies** — ketergantungan pekerjaan antar tim.
> > - **Risks that affect several teams** — risiko yang berdampak ke banyak tim sekaligus.
> > - **Scheduling of (coordinated) deliveries** — penjadwalan pengiriman yang harus terkoordinasi.
> >
> > ### Pola Umum Semua Scaling Framework
> >
> > > *"Scaled Agile works, and using a scaling framework helps you get a quick start."*
> >
> > Semua scaling framework berbagi pola umum:
> >
> > - **Scrum di level tim** (setiap tim tetap menjalankan Scrum).
> > - **Banyak tim berbagi satu backlog**.
> > - **Planning dilakukan kolaboratif lintas tim**.
> > - Prinsip umum **pull** dan **self-organization** tetap dipertahankan.
> >
> > ### LeSS (Large Scale Scrum)
> >
> > LeSS berasal dari **Craig Larman dan Bas Vodde**, berbasis pengalaman mereka di industri finansial dan telekomunikasi.
> >
> > - Didefinisikan oleh **minimalism dan minimal process** — gunakan proses sesedikit mungkin agar banyak tim Scrum bekerja baik.
> > - Pada level paling dasar, LeSS adalah **klarifikasi bagaimana Scrum memang seharusnya bekerja**.
> > - Tim Scrum berupa **long-lived cross-functional feature teams** yang dipertahankan lintas proyek.
> > - Mengelola kompleksitas large-scale dengan **menyederhanakannya** sebisa mungkin.
> > - LeSS merekomendasikan banyak tim memiliki **Product Owner yang sama** dan **shared Product Backlog**. Sprint disinkronkan ke Product-level Sprint menuju **satu Potentially Shippable Product Increment** terintegrasi. **Sprint Planning, Sprint Review, dan Sprint Retrospective berjalan bersamaan** untuk semua tim.
> >
> > ```mermaid
> > flowchart TD
> >     PO["1 Product Owner"] --> PB["Shared Product Backlog"]
> >     PB --> SP1["Sprint Planning 1 (Overall)"]
> >     SP1 --> TA["Team A — Sprint Planning 2 + Daily Scrum"]
> >     SP1 --> TB["Team B — Sprint Planning 2 + Daily Scrum"]
> >     SP1 --> TC["Team C — Sprint Planning 2 + Daily Scrum"]
> >     TA --> COORD["Coordination antar tim"]
> >     TB --> COORD
> >     TC --> COORD
> >     COORD --> PSPI["1 Potentially Shippable<br/>Product Increment (mis. v1.3.2)"]
> >     PSPI --> SR["Sprint Review (gabungan)"]
> >     SR --> OR["Overall Retrospective"]
> > ```
> >
> > Pada level **Overall**: Sprint Planning 1, Backlog refinement, Sprint Review, dan Overall Retrospective. Pada level **Team**: Sprint Planning 2, Daily Scrum, dan Team Retrospective. Peserta Overall Retrospective mencakup Manager, Scrum Master, Product Owner, dan perwakilan tim.
> >
> > ### SAFe (Scaled Agile Framework)
> >
> > Premis utama SAFe: **membagi pekerjaan ke dalam value streams**.
> >
> > - **Value stream** adalah langkah-langkah yang diulang perusahaan secara kontinu untuk memberi nilai ke pelanggan dan pengguna.
> > - **5–15 tim** biasanya terlibat dalam satu value stream; pengelompokan tim ini disebut **release train** (Agile Release Train).
> > - Satu release train bisa menampung **hingga 150 orang**. Bila melebihi ambang itu, disarankan ada **beberapa Agile Release Train** dalam tiap value stream.
> > - Konsep waktu SAFe: **Program Increment** terdiri atas beberapa **Sprints**, diawali **Big Room Planning** dan ditutup dengan **Innovation- and Planning Sprint**.
> > - Peran: **Product Manager** dan **Release Train Engineer (RTE)**.
> >
> > ```mermaid
> > flowchart LR
> >     BRP["Big Room Planning"] --> S1["Sprint 1"] --> S2["Sprint 2"] --> S3["Sprint 3"] --> S4["Sprint 4"] --> IP["Innovation & Planning Sprint"]
> >     subgraph PI["Program Increment"]
> >         S1
> >         S2
> >         S3
> >         S4
> >     end
> > ```

> [!cornell] #### Summary
>
> Menerapkan Scrum pada tim besar memunculkan **cross-team dependencies, risiko lintas-tim, dan penjadwalan pengiriman terkoordinasi**. Semua scaling framework berbagi pola: **Scrum di level tim, shared backlog, planning kolaboratif, pull, dan self-organization**. **LeSS** menekankan minimalism — satu Product Owner, satu backlog, sprint tersinkronisasi menjadi satu integrated increment. **SAFe** membagi kerja ke **value streams**, mengelompokkan 5–15 tim (hingga 150 orang) ke dalam **Agile Release Train**, mengorganisasi waktu dalam **Program Increment** (Big Room Planning → Sprints → Innovation & Planning Sprint). Ini adalah respons proses terhadap tantangan di [[Large-Scale Software Problems and Characteristics]] dan [[Principles and Coordination in Large-Scale Development]].

> [!ad-libitum]- Additional Information
>
> #### LeSS vs SAFe Secara Singkat
>
> **LeSS** condong *lightweight*: sedikit peran/aturan tambahan, mempercayai Scrum murni yang diperluas. **SAFe** lebih *prescriptive* dan berlapis (Team, Program, Large Solution, Portfolio), cocok untuk enterprise sangat besar yang butuh struktur eksplisit. Pilihan bergantung pada budaya organisasi dan toleransi terhadap struktur formal.
>
> #### Kaitan dengan Agile Dasar
>
> Penskalaan ini membangun di atas fondasi [[Agile Methodology Foundations and Principles]] dan [[Scrum Framework Implementation]] — prinsip iteratif, self-organizing team, dan increment tetap berlaku, hanya direplikasi dan disinkronkan lintas banyak tim.
