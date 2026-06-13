---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Catabolic Pathways and Redox Chemistry
>
> > ## Questions/Cues
> >
> > - Mengapa sel makhluk hidup membutuhkan energi dari sumber luar dan bagaimana energi mengalir dalam ekosistem?
> > - Apa perbedaan antara **catabolic** dan **anabolic pathway**, serta antara fermentasi, respirasi aerob, dan anaerob?
> > - Apa itu reaksi **redoks** (oksidasi vs reduksi) dan mengapa transfer elektron melepaskan energi?
> > - Apa peran **NAD+/NADH** dan **FAD/FADH2** sebagai electron carrier?
> > - Apa tiga tahap besar (three stages) respirasi seluler secara keseluruhan?
> >
> > ## Reference Points
> >
> > - IF3211 — Cellular Respiration (PPT 7, bagian Overview: Life Is Work)
> > - IF3211 — Cellular Respiration (PPT 7, bagian Catabolic Pathways and Production of ATP)
> > - IF3211 — Cellular Respiration (PPT 7, bagian Redox Reactions & The Stages of Cellular Respiration)
>
> > ### Aliran Energi: Life Is Work
> >
> > Sel hidup adalah mesin yang terus-menerus melakukan **kerja** (work): kerja mekanik (kontraksi otot), kerja transport (memompa ion melawan gradien), dan kerja kimia (sintesis makromolekul). Semua kerja ini membutuhkan energi, dan sel tidak dapat menciptakan energi dari ketiadaan — energi harus diimpor dari **sumber luar** berupa molekul organik (misal **glukosa**).
> >
> > Pada level ekosistem, energi **mengalir masuk** sebagai cahaya matahari dan **keluar** sebagai panas. **Fotosintesis** mengikat energi cahaya menjadi O2 dan molekul organik; molekul organik itu lalu menjadi bahan bakar bagi **cellular respiration**. Sel menggunakan energi kimia yang tersimpan dalam molekul organik untuk meregenerasi **ATP**, mata uang energi universal yang menyalakan kerja sel. Perhatikan polanya: energi tidak didaur ulang (ia mengalir satu arah lalu hilang sebagai panas), sedangkan materi (atom karbon, oksigen) **didaur ulang** antara fotosintesis dan respirasi.
> >
> > ### Catabolic Pathways dan Produksi ATP
> >
> > **Catabolic pathway** adalah jalur metabolik yang **memecah** molekul kompleks menjadi molekul sederhana, dan proses pemecahan molekul organik ini bersifat **exergonic** (melepaskan energi bebas). Energi yang dilepaskan inilah yang ditangkap untuk membuat ATP. Ada beberapa varian jalur katabolik:
> >
> > - **Fermentation**: degradasi parsial gula yang berlangsung **tanpa O2**. Hasil energinya kecil karena glukosa hanya dipecah sebagian.
> > - **Aerobic respiration**: mengonsumsi molekul organik **dan O2**, menghasilkan ATP dalam jumlah besar. O2 berperan sebagai acceptor elektron terakhir.
> > - **Anaerobic respiration**: mirip aerobik (menggunakan electron transport chain), tetapi memakai senyawa selain O2 (misal sulfat, SO4^2-) sebagai acceptor elektron terakhir.
> >
> > Istilah **cellular respiration** mencakup proses aerob maupun anaerob, namun seringkali merujuk khusus pada respirasi aerob. Meski karbohidrat, lemak, dan protein semuanya dapat menjadi bahan bakar, lebih mudah menelusuri respirasi dengan gula **glukosa**. Persamaan ringkasnya: **C6H12O6 + 6 O2 → 6 CO2 + 6 H2O + Energi (ATP + panas)**.
> >
> > ### Reaksi Redoks: Oksidasi dan Reduksi
> >
> > Inti energetika respirasi adalah **reaksi redoks (oxidation-reduction)** — transfer elektron antar molekul. **Oksidasi** adalah **kehilangan** elektron; **reduksi** adalah **penambahan** elektron (jembatan keledai: *OIL RIG* — Oxidation Is Loss, Reduction Is Gain). Transfer elektron selama reaksi kimia **melepaskan energi** yang tersimpan dalam molekul organik, dan energi inilah yang akhirnya dipakai mensintesis ATP.
> >
> > Selama respirasi, bahan bakar (glukosa) **dioksidasi** dan O2 **direduksi**. Molekul organik yang kaya hidrogen — seperti karbohidrat dan lemak — adalah bahan bakar yang sangat baik, karena setiap atom hidrogen membawa elektron berenergi tinggi. Saat hidrogen (beserta elektronnya) dipindahkan ke oksigen, energi dilepaskan dan dapat dipakai untuk sintesis ATP. Perhatikan: elektron tidak langsung "jatuh" ke O2 sekaligus (itu akan melepas energi sebagai ledakan panas), melainkan diturunkan **bertahap** lewat serangkaian pembawa, sehingga energinya dapat dipanen sedikit demi sedikit secara terkendali.
> >
> > ### Electron Carrier: NAD+ dan FAD
> >
> > Elektron tidak mengalir langsung dari glukosa ke O2; mereka "dititipkan" pada **electron carrier**. Pembawa utamanya adalah **NAD+ (nicotinamide adenine dinucleotide)**. NAD+ bertindak sebagai oxidizing agent: ia menerima dua elektron dan satu proton menjadi **NADH** (bentuk tereduksi, "terisi"). Reaksinya: NAD+ + 2e- + H+ → NADH. NADH ibarat baterai bermuatan yang menyimpan elektron berenergi tinggi untuk diserahkan ke electron transport chain.
> >
> > Pembawa kedua adalah **FAD**, yang menerima elektron menjadi **FADH2**. FADH2 memasuki rantai transport elektron pada titik yang lebih rendah energinya daripada NADH, sehingga menghasilkan lebih sedikit ATP. Kedua pembawa ini adalah "shuttle" yang memisahkan tahap **pemanenan** elektron (glycolysis, citric acid cycle) dari tahap **konversi menjadi ATP** (oxidative phosphorylation).
> >
> > ### Computational Framing: Respirasi sebagai Staged Data Pipeline
> >
> > Bagi mahasiswa informatika, respirasi seluler paling jelas dipahami sebagai **pipeline data bertahap**: ada **input** (glukosa), serangkaian **modul/stage** yang masing-masing mentransformasi data antara (intermediate), dan **output** (ATP). Setiap stage memiliki kontrak input-output yang jelas, persis seperti tahap dalam compiler atau ETL pipeline.
> >
> > Reaksi redoks dapat dianalogikan sebagai **aliran arus/sinyal dalam rangkaian**: elektron mengalir dari potensial tinggi (glukosa) ke potensial rendah (O2), seperti elektron mengalir dari tegangan tinggi ke ground. **NADH/FADH2** berperan sebagai **buffer/register** yang menampung elektron sementara antar-stage, memungkinkan decoupling antara producer (glikolisis) dan consumer (ETC) — pola yang mirip dengan message queue. Ada tiga tahap besar yang menjadi "modul" pipeline:
> >
> > 1. **Glycolysis** — memecah glukosa menjadi dua **pyruvate** di **cytosol**.
> > 2. **Pyruvate oxidation + Citric acid cycle** — menuntaskan pemecahan glukosa di **mitochondrial matrix**.
> > 3. **Oxidative phosphorylation** — memproduksi mayoritas ATP di **inner mitochondrial membrane**.
> >
> > ```mermaid
> > flowchart LR
> >     G["Glucose<br/>(input)"] --> GLY["Glycolysis<br/>(cytosol)"]
> >     GLY --> PYR["2 Pyruvate"]
> >     PYR --> PO["Pyruvate Oxidation<br/>(matrix)"]
> >     PO --> CAC["Citric Acid Cycle<br/>(matrix)"]
> >     CAC --> OP["Oxidative Phosphorylation<br/>(inner membrane)"]
> >     OP --> ATP["~32 ATP<br/>(output)"]
> >     GLY -.->|"2 NADH"| OP
> >     PO -.->|"2 NADH"| OP
> >     CAC -.->|"6 NADH + 2 FADH2"| OP
> > ```
> >
> > Garis putus-putus menunjukkan "side-channel" pembawa elektron (**NADH/FADH2**) yang dipanen di stage awal lalu di-redeem menjadi ATP di stage akhir — sebuah lazy evaluation di mana energi baru "dicairkan" saat dibutuhkan.

> [!cornell] #### Summary
>
> Sel hidup melakukan **kerja** dan membutuhkan energi dari molekul organik; energi **mengalir** searah dalam ekosistem (cahaya → panas) sementara materi **didaur ulang** antara **fotosintesis** dan **cellular respiration**. **Catabolic pathway** memecah molekul secara **exergonic** untuk membuat **ATP**, melalui fermentasi (tanpa O2), respirasi aerob (dengan O2), atau respirasi anaerob (acceptor selain O2). Inti energetikanya adalah **reaksi redoks**: glukosa **dioksidasi** (kehilangan elektron), O2 **direduksi**, dan elektron berenergi tinggi dititipkan ke pembawa **NAD+→NADH** dan **FAD→FADH2** sebelum diturunkan bertahap untuk memanen energi. Respirasi berlangsung dalam tiga tahap — **glycolysis**, **pyruvate oxidation + citric acid cycle**, dan **oxidative phosphorylation** — yang membentuk sebuah **pipeline data bertahap** dari input glukosa ke output ATP. Lanjutkan ke [[Glycolysis]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Potensial Redoks dan "Air Terjun" Elektron
> Setiap pembawa elektron punya **redox potential** (kecenderungan menerima elektron) yang dapat diurutkan. Elektron mengalir dari pembawa berpotensial rendah (NADH, sangat "rela melepas") ke yang berpotensial tinggi (O2, sangat "rakus menerima"). Perbedaan potensial total NADH→O2 setara dengan energi bebas besar (-222 kJ/mol). Jika pelepasan ini terjadi sekaligus, energinya hilang sebagai panas (seperti membakar hidrogen). Sel mengubahnya menjadi "air terjun bertingkat" lewat electron transport chain agar energi dipanen secara bertahap dan efisien — sebuah trik termodinamika yang sangat elegan.
>
> #### CS Angle: Redoks sebagai Information/Charge Flow
> Bayangkan setiap molekul sebagai node dengan "voltage level" (redox potential), dan elektron sebagai sinyal yang mengalir menuruni gradien tegangan. **NADH** adalah register yang di-*load* dengan 2 elektron berenergi tinggi; rantai transport elektron adalah deretan **logic gate / voltage divider** yang menurunkan tegangan setahap demi setahap, mengkonversi energi potensial menjadi kerja (memompa proton). Konsep ini paralel dengan **dataflow architecture**: komputasi terjadi ketika data (elektron) mengalir melalui jaringan unit pemroses, bukan dengan program counter sentral. Decoupling producer-consumer via NADH juga mirip **backpressure** dalam streaming systems.
>
> #### Proyek Eksplorasi Mandiri
> 1. Modelkan tiga tahap respirasi sebagai pipeline di kode (mis. fungsi `glycolysis(glucose) -> (pyruvate, atp, nadh)` yang outputnya menjadi input stage berikutnya), lalu akumulasikan total ATP & NADH sebagai metrik throughput.
> 2. Buat simulasi sederhana "electron cascade": daftar pembawa elektron dengan redox potential masing-masing, dan hitung energi yang dilepas pada tiap langkah penurunan — bandingkan total dengan pelepasan satu langkah.
> 3. Tinjau jalur fermentasi vs aerob sebagai *conditional branching* (`if O2: aerobic_path() else: fermentation()`) dan bandingkan yield ATP-nya.
>
> #### Bacaan Lanjutan
> - Campbell Biology in Focus, 3rd ed., Chapter 7 — Cellular Respiration and Fermentation.
> - Nelson & Cox, *Lehninger Principles of Biochemistry* — bab bioenergetika dan redoks.
> - Nicholls & Ferguson, *Bioenergetics* — pembahasan mendalam potensial redoks dan chemiosmosis.
