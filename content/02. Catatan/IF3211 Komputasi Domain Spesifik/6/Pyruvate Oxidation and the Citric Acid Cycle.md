---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Pyruvate Oxidation and the Citric Acid Cycle
>
> > ## Questions/Cues
> >
> > - Apa yang terjadi pada **pyruvate** sebelum masuk citric acid cycle dan apa hasilnya?
> > - Mengapa **acetyl-CoA** disebut "tiket masuk" ke citric acid cycle?
> > - Apa input, output, dan sifat siklik dari **citric acid (Krebs) cycle**?
> > - Berapa NADH, FADH2, dan GTP/ATP yang dihasilkan, dan ke mana CO2 dilepas?
> > - Di kompartemen mana proses ini berlangsung dan mengapa lokasi itu penting?
> >
> > ## Reference Points
> >
> > - IF3211 — Cellular Respiration (PPT 7, bagian The Stages of Cellular Respiration: A Preview)
> > - IF3211 — Cellular Respiration (PPT 7, bagian An Overview of Cellular Respiration, Step 2)
>
> > ### Pyruvate Oxidation: Jembatan Menuju Mitokondria
> >
> > Setelah glikolisis menghasilkan **pyruvate** di sitosol, jika O2 tersedia, pyruvate diangkut masuk ke **mitochondrial matrix**. Di sana terjadi **pyruvate oxidation**, sebuah reaksi "jembatan" (link reaction) yang mengubah setiap pyruvate (3C) menjadi **acetyl-CoA** (2C). Tiga hal terjadi serentak dalam langkah ini:
> >
> > 1. Satu atom karbon dilepas sebagai **CO2** (dekarboksilasi) — inilah pelepasan karbon pertama yang akan kita "buang napas".
> > 2. Fragmen dua-karbon yang tersisa dioksidasi, dan elektronnya ditangkap **NAD+ → NADH**.
> > 3. Gugus dua-karbon teroksidasi diikat ke **coenzyme A** membentuk **acetyl-CoA**.
> >
> > Acetyl-CoA adalah "tiket masuk" (entry ticket) ke citric acid cycle. Karena satu glukosa menghasilkan dua pyruvate, langkah ini berjalan **dua kali** per glukosa, menghasilkan 2 CO2 dan 2 NADH.
> >
> > ### Citric Acid (Krebs) Cycle
> >
> > **Citric acid cycle** (juga disebut **Krebs cycle** atau TCA cycle) menuntaskan oksidasi molekul organik. Disebut "siklus" karena molekul awal (**oxaloacetate**, 4C) diregenerasi di akhir untuk menerima acetyl-CoA berikutnya — sebuah loop yang terus berputar. Acetyl-CoA (2C) bergabung dengan oxaloacetate (4C) membentuk **citrate** (6C), lalu lewat serangkaian reaksi citrate dioksidasi kembali menjadi oxaloacetate, melepas 2 CO2 per putaran.
> >
> > Per **satu putaran** (per acetyl-CoA), siklus menghasilkan: **3 NADH**, **1 FADH2**, **1 GTP** (yang setara 1 ATP, dibuat via substrate-level phosphorylation), dan melepas **2 CO2**. Karena ada 2 acetyl-CoA per glukosa, siklus berputar **dua kali**, sehingga total per glukosa: **6 NADH + 2 FADH2 + 2 GTP/ATP + 4 CO2**.
> >
> > ### Neraca Karbon dan Energi
> >
> > Jika kita jumlahkan pelepasan CO2: 2 dari pyruvate oxidation + 4 dari citric acid cycle = **6 CO2** per glukosa — tepat sesuai persamaan ringkas respirasi (glukosa punya 6 karbon, semuanya kini dilepas sebagai CO2). Pada titik ini, **seluruh atom karbon glukosa telah dioksidasi sempurna**.
> >
> > Namun, hingga akhir citric acid cycle, hanya **4 ATP** (2 dari glikolisis + 2 GTP) yang langsung terbentuk via substrate-level phosphorylation. Mayoritas energi kini **tersimpan dalam pembawa elektron**: total **10 NADH** (2 glikolisis + 2 pyruvate oxidation + 6 siklus) dan **2 FADH2**. Pembawa-pembawa "bermuatan penuh" ini akan menjadi input bagi tahap berikutnya, oxidative phosphorylation, tempat sebagian besar ATP sebenarnya dibuat.
> >
> > ### Computational Framing: Transform Module dan Cyclic Buffer
> >
> > Bagi mahasiswa informatika, **pyruvate oxidation** adalah **adapter/transform module** di tengah pipeline: ia mengubah format data dari output stage sebelumnya (pyruvate) menjadi format yang dapat dikonsumsi modul berikutnya (acetyl-CoA) — persis seperti serializer/deserializer antara dua microservice dengan kontrak berbeda.
> >
> > **Citric acid cycle** adalah contoh sempurna **loop dengan invariant**: oxaloacetate adalah state yang dikonsumsi di awal iterasi dan diregenerasi di akhir, sehingga kondisi awal loop selalu terpenuhi untuk iterasi berikutnya — analog dengan **ring buffer** atau loop yang menjaga loop-invariant. Setiap putaran memproses satu "record" (acetyl-CoA) dan mengeluarkan output terstruktur (NADH, FADH2, GTP, CO2). Yang menarik secara komputasi: alih-alih langsung memproduksi ATP, siklus ini **menulis energi ke register pembawa elektron** (NADH/FADH2) — sebuah **write-back ke buffer** yang baru "di-flush" menjadi ATP pada stage hilir. Ini memungkinkan **batching**: energi dipanen dalam bentuk terkonsentrasi (10 NADH + 2 FADH2) lalu diproses sekaligus secara efisien di oxidative phosphorylation.

> [!cornell] #### Summary
>
> Bila O2 tersedia, **pyruvate** masuk ke **mitochondrial matrix** dan mengalami **pyruvate oxidation** menjadi **acetyl-CoA**, melepas **CO2** dan menghasilkan **NADH** (2 NADH + 2 CO2 per glukosa). Acetyl-CoA lalu memasuki **citric acid (Krebs) cycle**, sebuah loop yang meregenerasi **oxaloacetate** dan, per putaran, menghasilkan **3 NADH + 1 FADH2 + 1 GTP** serta melepas 2 CO2. Karena berputar dua kali per glukosa, tahap ini menyumbang **6 NADH + 2 FADH2 + 2 ATP + 4 CO2**, menuntaskan pelepasan keenam karbon glukosa sebagai CO2. Mayoritas energi kini **tersimpan di pembawa elektron** (total 10 NADH + 2 FADH2) yang akan dicairkan menjadi ATP di [[Oxidative Phosphorylation and Chemiosmosis]]. Input tahap ini berasal dari [[Glycolysis]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Pyruvate Dehydrogenase Complex
> Pyruvate oxidation dikatalisis oleh **pyruvate dehydrogenase complex (PDC)**, salah satu kompleks enzim terbesar di sel (menggabungkan tiga enzim dan lima koenzim). PDC adalah **titik kontrol regulasi kunci** (gatekeeper) yang menentukan apakah karbon dari glukosa masuk ke jalur oksidatif penuh atau dialihkan. Defisiensi PDC menyebabkan gangguan metabolik serius karena karbon tidak bisa diteruskan ke siklus Krebs.
>
> #### CS Angle: Krebs Cycle sebagai State Machine Siklik
> Citric acid cycle adalah **finite state machine siklik**: deretan intermediate (citrate → isocitrate → α-ketoglutarate → ... → oxaloacetate) adalah state, dan tiap transisi dikatalisis enzim spesifik (transition function). Karena oxaloacetate diregenerasi, FSM-nya **never halts** selama ada input acetyl-CoA — mirip event loop yang terus berputar memproses event. Strategi "tulis ke buffer NADH dulu, baru flush jadi ATP nanti" identik dengan **write-back caching** dan **lazy evaluation**: tunda komputasi mahal (sintesis ATP) sampai semua energi terkumpul, lalu proses dalam satu batch yang efisien.
>
> #### Proyek Eksplorasi Mandiri
> 1. Implementasikan citric acid cycle sebagai state machine yang berputar `n` kali, akumulasikan NADH/FADH2/GTP, dan verifikasi neraca karbon (6 CO2 per glukosa).
> 2. Lacak setiap atom karbon glukosa melalui pyruvate oxidation dan siklus, dan tunjukkan kapan masing-masing dilepas sebagai CO2 (carbon-tracking simulation).
> 3. Bandingkan pola "write-back buffer" NADH dengan write-back cache di arsitektur komputer — tuliskan persamaan dan perbedaannya.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 7, Concept 7.3.
> - Krebs, H.A. (1937), makalah asli penemuan siklus asam sitrat.
> - Nelson & Cox, *Lehninger Principles of Biochemistry* — bab The Citric Acid Cycle.
