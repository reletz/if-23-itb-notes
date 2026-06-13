---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Phases of the Cell Cycle
>
> > ## Questions/Cues
> >
> > - Apa dua fase besar dalam cell cycle dan proporsi waktunya?
> > - Apa yang terjadi pada subfase **G1**, **S**, dan **G2** dari interphase?
> > - Pada fase mana kromosom diduplikasi?
> > - Apa saja lima tahap **mitosis**, dan kapan cytokinesis berlangsung?
> > - Mengapa cell cycle dipandang sebagai siklus yang berurutan (ordered)?
> >
> > ## Reference Points
> >
> > - IF3211 — Cell Cycle (PPT 8, bagian Phases of the Cell Cycle)
> > - IF3211 — Cell Cycle (PPT 8, Figure 9.6 The Cell Cycle)
>
> > ### Dua Fase Besar: Interphase dan M Phase
> >
> > Cell cycle terdiri dari dua bagian besar. **Mitotic (M) phase** mencakup **mitosis** (pembagian inti) dan **cytokinesis** (pembagian sitoplasma). **Interphase** mencakup **pertumbuhan sel** dan **penyalinan kromosom** sebagai persiapan membelah. Yang sering mengejutkan: **interphase memakan ~90%** durasi siklus, sedangkan M phase relatif singkat. Sel menghabiskan sebagian besar hidupnya "bekerja dan tumbuh", bukan membelah.
> >
> > ### Subfase Interphase: G1, S, G2
> >
> > Interphase dibagi menjadi tiga subfase berurutan:
> >
> > - **G1 phase** ("first gap") — sel tumbuh, menjalankan fungsi normal, dan bersiap menyalin DNA.
> > - **S phase** ("synthesis") — **DNA direplikasi**; di sinilah, dan **hanya** di sinilah, kromosom diduplikasi sehingga muncul sister chromatids.
> > - **G2 phase** ("second gap") — sel terus tumbuh dan menyiapkan komponen untuk mitosis (mis. protein spindle).
> >
> > Sel **tumbuh selama ketiga subfase**, tetapi **duplikasi kromosom hanya terjadi di S phase**. Pembedaan ini penting: G1 dan G2 adalah jeda persiapan, S adalah peristiwa penyalinan inti data.
> >
> > ### Lima Tahap Mitosis dan Posisi Cytokinesis
> >
> > Secara konvensional **mitosis** dibagi menjadi lima tahap berurutan: **Prophase → Prometaphase → Metaphase → Anaphase → Telophase**. **Cytokinesis** tidak berdiri sebagai tahap mitosis tersendiri melainkan **menumpang (overlaps)** pada tahap-tahap akhir mitosis (mulai anaphase/telophase). Rincian mekanis tiap tahap dibahas di [[Mitosis and the Mitotic Spindle]] dan [[Cytokinesis and Prokaryotic Binary Fission]].
> >
> > ### Framing Komputasional: Cell Cycle sebagai Finite State Machine
> >
> > Cell cycle adalah contoh nyata **Finite State Machine (FSM)**: himpunan **state** berhingga (G1, S, G2, M, plus state istirahat G0) dengan **transisi berurutan** yang searah. Sel tidak boleh "melompat" sembarangan — urutan G1 → S → G2 → M bersifat **deterministik** dan dijaga oleh **checkpoints** yang berlaku seperti **guard condition** (lihat [[Cell Cycle Control, Checkpoints, and Cancer]]). S phase berperan sebagai **critical section** tunggal di mana state terbesar (genome) disalin; G1/G2 adalah state persiapan/validasi sebelum dan sesudah penyalinan itu.
> >
> > Diagram lifecycle berikut memodelkan siklus sebagai mesin state dengan posisi checkpoint sebagai gerbang transisi:
> >
> > ```mermaid
> > stateDiagram-v2
> >     [*] --> G1
> >     G1 --> S : G1/restriction<br/>checkpoint (go)
> >     G1 --> G0 : no go-ahead<br/>(exit cycle)
> >     G0 --> G1 : re-entry signal
> >     S --> G2 : DNA fully<br/>replicated
> >     G2 --> M : G2/M<br/>checkpoint
> >     state M {
> >       [*] --> Prophase
> >       Prophase --> Prometaphase
> >       Prometaphase --> Metaphase
> >       Metaphase --> Anaphase : M (spindle)<br/>checkpoint
> >       Anaphase --> Telophase
> >       Telophase --> Cytokinesis
> >       Cytokinesis --> [*]
> >     }
> >     M --> G1 : two daughter<br/>cells
> > ```
> >
> > Setiap panah berlabel checkpoint adalah **precondition**: transisi hanya terjadi jika sinyal "go-ahead" diterima — persis seperti *assertion* yang harus `true` sebelum mesin berpindah state.

> [!cornell] #### Summary
>
> Cell cycle = **Interphase** (≈90% waktu) + **Mitotic (M) phase**. Interphase terbagi menjadi **G1** (pertumbuhan, "first gap"), **S** (**synthesis** — satu-satunya fase tempat **DNA direplikasi**), dan **G2** ("second gap", persiapan mitosis). M phase berisi **mitosis** dengan lima tahap (**Prophase, Prometaphase, Metaphase, Anaphase, Telophase**) dan **cytokinesis** yang menumpang tahap-tahap akhir. Siklus ini paling baik dipahami sebagai **Finite State Machine** berurutan dengan **checkpoints** sebagai *guard*, sebagaimana dirinci di [[Cell Cycle Control, Checkpoints, and Cancer]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: G0 dan Variasi Durasi Siklus
>
> Banyak sel terdiferensiasi (mis. neuron, sel otot) keluar dari siklus ke state **G0** yang non-membelah dan bisa bertahan permanen. Durasi siklus sangat bervariasi: sel embrio awal dapat membelah tiap beberapa puluh menit (G1/G2 nyaris hilang), sedangkan sel hati manusia bisa berbulan-bulan. Ini menunjukkan bahwa "lama" tiap state bukan konstanta melainkan bergantung sinyal lingkungan.
>
> #### CS Angle: Modeling dengan State Pattern
>
> Implementasikan cell cycle dengan **State design pattern**: tiap fase adalah kelas yang mengetahui satu-satunya transisi `next()` yang sah dan kondisi yang harus dicek. Ini mencegah transisi ilegal pada *compile/run time*, mencerminkan bagaimana sel "secara struktural" tidak bisa membelah sebelum melewati S. G0 dimodelkan sebagai *terminal/parked state* dengan transisi balik kondisional.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan FSM cell cycle (G1→S→G2→M→G1, dengan jalur G0) di bahasa pilihanmu; tambahkan log transisi dan tolak transisi yang melanggar urutan.
> 2. Cari data durasi tiap fase pada beberapa tipe sel dan visualisasikan sebagai *pie chart* untuk membuktikan dominasi interphase.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 9 — *Phases of the Cell Cycle*.
> - Morgan, D. O., *The Cell Cycle: Principles of Control*.
