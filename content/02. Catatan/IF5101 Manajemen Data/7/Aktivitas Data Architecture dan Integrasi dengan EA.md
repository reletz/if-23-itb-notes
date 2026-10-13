---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF5101 Manajemen Data]]

> [!cornell] Aktivitas Data Architecture dan Integrasi dengan EA
>
> > ## Questions/Cues
> >
> > - Apa dua sudut pandang (**quality-oriented** dan **innovation-oriented**) aktivitas data architecture?
> > - Apa lima **work stream** dalam membangun praktik data architecture?
> > - Bagaimana enterprise data architecture memengaruhi **lingkup proyek**?
> > - Apa isi **roadmap** dan bagaimana mengelola kebutuhan enterprise dalam proyek?
> > - Bagaimana peran data architect pada metode waterfall, incremental, dan agile?
> >
> > ## Reference Points
> >
> > - IF5101 — Data Architecture (Slides 34-43)
> > - DAMA International — *DAMA-DMBOK*, 2nd Ed. (2017), Chapter 4.2 (Activities)
>
> > ### Dua Sudut Pandang
> >
> > - **Quality-oriented**: memperbaiki **eksekusi** dalam siklus pengembangan bisnis dan TI; tanpa itu sistem makin kompleks dan kaku sehingga meningkatkan risiko.
> > - **Innovation-oriented**: **mentransformasi** bisnis dan TI untuk ekspektasi dan peluang baru; mendorong inovasi lewat teknologi disruptif adalah peran arsitek enterprise modern.
> >
> > ### Dua Aktivitas Utama
> >
> > ```mermaid
> > flowchart LR
> >     E["Establish data<br/>architecture practice"] --> E1["Evaluate existing<br/>specifications"]
> >     E --> E2["Develop roadmap"]
> >     E --> E3["Manage enterprise<br/>requirements in projects"]
> >     E --> I["Integrate with<br/>enterprise architecture"]
> > ```
> >
> > ### Establish Data Architecture Practice
> >
> > Lima **work stream**:
> >
> > | Work stream | Isi |
> > | --- | --- |
> > | **Strategy** | Memilih framework, menyatakan pendekatan, menyusun roadmap |
> > | **Acceptance & culture** | Menginformasikan dan memotivasi perubahan perilaku |
> > | **Organization** | Menetapkan akuntabilitas dan tanggung jawab |
> > | **Working methods** | Best practice dan eksekusi dalam proyek, berkoordinasi dengan EA |
> > | **Results** | Menghasilkan artefak dalam roadmap keseluruhan |
> >
> > Enterprise Data Architecture juga memengaruhi **batas lingkup proyek dan rilis**:
> >
> > - **Defining project data requirements** — memberi kebutuhan data enterprise ke proyek.
> > - **Reviewing project data designs** — memastikan model konseptual, logis, fisik konsisten dengan arsitektur.
> > - **Determining data lineage impact** — aturan bisnis sepanjang data flow konsisten dan *traceable*.
> > - **Data replication control** — replikasi meningkatkan kinerja tapi dapat menimbulkan inkonsistensi.
> > - **Enforcing standards** — standar lifecycle Enterprise Data Architecture.
> > - **Guiding technology & renewal decisions** — mengelola versi, patch, dan kebijakan teknologi data.
> >
> > ### Develop a Roadmap
> >
> > - Identifikasi dokumen yang ada; evaluasi **akurasi, kelengkapan, tingkat detail**.
> > - Roadmap menggambarkan jalur pengembangan **3-5 tahun** dan bagaimana arsitektur target menjadi nyata.
> > - Harus terintegrasi ke roadmap EA keseluruhan: milestone, sumber daya, estimasi biaya, dibagi per *business capability work stream*.
> > - Kapabilitas bisnis membentuk **rantai dependensi data**: sebagian hanya mengonsumsi data, sebagian juga menghasilkan data yang dibutuhkan kapabilitas lain.
> >
> > ### Manage Enterprise Requirements within Projects
> >
> > Setelah spesifikasi proyek selesai, data architect memeriksa:
> >
> > - Apakah entitas enterprise-wide **sesuai standar**.
> > - Entitas mana yang perlu **masuk ke Enterprise Data Architecture**.
> > - Apakah entitas/definisi perlu **digeneralisasi** untuk tren masa depan.
> > - Apakah perlu **arsitektur penyampaian data baru** atau mengarahkan ke **reuse**.
> >
> > Aktivitas terkait proyek: **define scope** (selaras EDM), **understand business requirements** (entitas, sumber, ketersediaan, kualitas, pain points), **design** (spesifikasi target + aturan bisnis lifecycle), **implement** (buy/reuse/build).
> >
> > | Metodologi | Peran data architect |
> > | --- | --- |
> > | **Waterfall** | Memahami kebutuhan dan membangun sistem berurutan dalam desain enterprise |
> > | **Incremental** | Belajar dan membangun bertahap (mini-waterfall) |
> > | **Agile / iteratif** | Belajar, membangun, menguji per *sprint* kecil sehingga kerja yang dibuang tidak mahal |
> >
> > ### Integrate with Enterprise Architecture
> >
> > Isu data architecture enterprise-wide harus ditangani **proaktif**; ia dapat memengaruhi lingkup proyek, sehingga sebaiknya diintegrasikan dengan **project portfolio management**, dan data architect harus dilibatkan dalam **perencanaan pengembangan dan integrasi aplikasi** enterprise.

> [!cornell] #### Summary
>
> Aktivitas data architecture dipandang dari sisi **quality-oriented** (memperbaiki eksekusi, mencegah kompleksitas kaku) dan **innovation-oriented** (transformasi dan inovasi). Aktivitas utamanya: **establish practice** (strategy, acceptance & culture, organization, working methods, results; evaluasi spesifikasi, **roadmap 3-5 tahun**, kelola kebutuhan enterprise di proyek) dan **integrate with EA**. EDA memengaruhi lingkup proyek lewat requirement, design review, dampak lineage, kontrol replikasi, standar, dan keputusan teknologi. Peran arsitek menyesuaikan metodologi: waterfall, incremental, atau agile.

> [!ad-libitum]- Additional Information
>
> #### Architecture runway di tim agile
>
> Di SAFe/agile, data architect menyiapkan *runway*: keputusan data fondasional yang cukup agar sprint tidak terblokir, tanpa big design up front.
>
> #### Review desain sebagai gerbang ringan
>
> Checklist 5 poin di PR skema (penamaan, PII, kunci, entitas enterprise, lineage) lebih efektif daripada komite arsitektur bulanan.
>
> #### Proyek Eksplorasi Mandiri
>
> 1. Tulis roadmap 3 tahun (3 milestone/tahun) untuk data architecture sebuah organisasi fiktif.
> 2. Lakukan "design review" pada skema proyek tugas besar Anda memakai enam aktivitas pengaruh di atas.
>
> #### Bacaan Lanjutan
>
> - DAMA International. *DAMA-DMBOK*, 2nd Ed. — Chapter 4.2.
> - Ross, J., Weill, P., Robertson, D. (2006). *Enterprise Architecture as Strategy*. HBR Press.
