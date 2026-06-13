---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Foundations of Computational Biology and Bioinformatics
>
> > ## Questions/Cues
> >
> > - Apa definisi computational biology menurut NIH dan disiplin apa yang berpotongan di dalamnya?
> > - Apa beda bioinformatics, bio-inspired computing, biomedical engineering, dan biological computing?
> > - Mengapa di kuliah ini bioinformatics ≈ computational biology?
> > - Bagaimana data science berpotongan dengan bidang ini?
> > - Mengapa biologi makin menjadi "computational science"?
> >
> > ## Reference Points
> >
> > - IF3211 — Course Introduction (PPT 1, bagian Computational Biology & Bioinformatics)
> > - IF3211 — Course Introduction (PPT 1, bagian Biology vs Computing)
> > - IF3211 — Course Introduction (PPT 1, bagian Why Computational Biology?)
>
> > ### Definisi Computational Biology
> >
> > Mengikuti definisi kerja **NIH (2000)**, **computational biology** adalah penggunaan **teknik computer science, analisis data, pemodelan matematis, dan simulasi komputasi** untuk memahami **sistem dan relasi biologis**. Bidang ini merupakan **irisan (intersection)** dari **computer science, biology, dan data science**, dengan fondasi tambahan pada applied mathematics, molecular biology, cell biology, chemistry, dan genetics. Intinya: **komputasi sebagai alat untuk menjawab pertanyaan biologi**.
> >
> > ### Bioinformatics dan Hubungannya
> >
> > **Bioinformatics** adalah penggunaan **komputasi untuk memahami dan menganalisis data biologis** — *genetic sequences*, *protein structures*, dan informasi biologis lain. Jika computational biology berfokus pada **pertanyaan/model**, bioinformatics cenderung berfokus pada **data dan pipeline analisisnya** (penyimpanan, indexing, pencarian, anotasi). Dalam praktik keduanya tumpang tindih erat, sehingga **kuliah ini menyatakan bioinformatics ≈ computational biology** dan memakai kedua istilah secara bergantian.
> >
> > ### Lima Disiplin yang Sering Tertukar
> >
> > Deck membedakan lima bidang berdasarkan **arah aliran** antara biologi dan komputasi:
> >
> > | Bidang | Esensi | Arah |
> > |---|---|---|
> > | **Computational Biology** | memakai CS, math, statistik untuk **memahami biologi** | komputasi → biologi |
> > | **Bioinformatics** | memakai teknologi untuk **menganalisis DNA/RNA/protein & Big Data** biologi | komputasi → data biologi |
> > | **Bio-inspired Computing** | memakai **model biologi** untuk menyelesaikan masalah CS | biologi → komputasi |
> > | **Biomedical Engineering** | memakai engineering/computing untuk **mengobati penyakit** | rekayasa → kesehatan |
> > | **Biological Computing** | memakai **molekul biologis** (DNA/protein) untuk **melakukan komputasi** | biologi *menjadi* komputer |
> >
> > Catatan kunci: **bio-inspired computing** dan **biological computing** mudah tertukar tetapi berlawanan — yang pertama *meminjam ide* biologi untuk dijalankan di komputer silikon, yang kedua menjadikan **molekul biologis sebagai substrat komputasi** itu sendiri (mis. DNA computing).
> >
> > ### Mengapa Computational Biology Menarik Sekarang
> >
> > Deck memberi tiga alasan: (1) **problemnya cukup besar** sehingga memotivasi **algoritma yang efisien**; (2) problemnya **accessible, fresh, dan menarik**; (3) biologi **semakin menjadi computational science**. Bidang ini juga merupakan **sumber pertanyaan kompleks dan data nyata**, dengan aliran ide **dua arah**: dari biologi ke CS (mis. *fragment assembly*, *sequence analysis*, algoritma *phylogenetic trees*) dan dari CS ke biologi (mis. *sequencing by hybridization*, *DNA computing*).
> >
> > ### Computational Framing: Irisan dengan Data Science
> >
> > Bagi mahasiswa informatika, peta ini adalah **taksonomi teknik berdasarkan substrat dan tujuan**. **Data science** menjadi tulang punggung bioinformatics: data sekuens adalah **string berukuran giga/terabyte** yang menuntut **struktur data efisien** (suffix array, hash index, Bloom filter) dan **algoritma sub-kuadratik**. Computational biology menambahkan lapisan **pemodelan** (HMM, jaringan Bayesian, ODE) dan **simulasi**. Karena "problemnya cukup besar", isu inti adalah **kompleksitas asimptotik** dan **skalabilitas** — persis ranah algoritma dan sistem terdistribusi.
> >
> > ```mermaid
> > flowchart TD
> >     CB["Computational<br/>Biology"]
> >     CB --> A["Computer Science"]
> >     CB --> B["Biology"]
> >     CB --> D["Data Science"]
> >     A --> M["Applied Math<br/>&amp; Statistics"]
> >     B --> MB["Molecular &amp;<br/>Cell Biology"]
> >     B --> G["Genetics &amp;<br/>Chemistry"]
> > ```

> [!cornell] #### Summary
>
> **Computational biology** (definisi NIH) memakai **computer science, analisis data, pemodelan matematis, dan simulasi** untuk memahami sistem biologis — sebuah **irisan CS, biologi, dan data science**. **Bioinformatics** menekankan **analisis data biologis** (DNA, RNA, protein, Big Data); dalam kuliah ini keduanya dianggap setara. Lima bidang serupa dibedakan berdasarkan **arah aliran**: **computational biology** dan **bioinformatics** (komputasi → biologi), **bio-inspired computing** (biologi → algoritma), **biomedical engineering** (rekayasa → pengobatan), dan **biological computing** (molekul biologis sebagai **substrat komputasi**). Bidang ini menarik karena **problemnya masif**, **data nyata**, dan **aliran ide dua arah** antara biologi dan CS. Lihat juga [[Bio-Inspired Computing and Why Engineers Study Biology]].

> [!ad-libitum]- Additional Information
>
> #### Deeper Dive: Aliran Ide Dua Arah
>
> Contoh **biologi → CS**: masalah *fragment assembly* melahirkan algoritma graf (Eulerian path / de Bruijn graph). Contoh **CS → biologi**: *DNA computing* Adleman (1994) menyelesaikan instans *Hamiltonian path* memakai untai DNA, membuktikan komputasi tidak harus berbasis silikon. Pertukaran ini menjadikan bidang ini laboratorium ide bagi kedua disiplin.
>
> #### CS / Computational Angle
>
> Bedakan **bio-inspired** (algoritma genetika, ant colony, neural networks — berjalan di CPU/GPU biasa) dari **biological computing** (DNA strands, enzim, sel sebagai gerbang logika — komputasi *in vitro/in vivo*). Yang pertama soal **metafora algoritmik**; yang kedua soal **substrat fisik komputasi** dan menjadi cabang *unconventional computing*.
>
> #### Proyek Eksplorasi Mandiri
> 1. Buat tabel klasifikasi: untuk lima tool populer (BLAST, AlphaFold, PLINK, NEAT, Adleman's experiment) tentukan masuk kategori bidang yang mana dan mengapa.
> 2. Tulis ringkasan satu paper *de Bruijn graph assembly* dan jelaskan struktur data grafnya.
>
> #### Bacaan Lanjutan
> - NIH BISTI. *Working Definition of Bioinformatics and Computational Biology* (2000).
> - Jones, N. C., & Pevzner, P. A. *An Introduction to Bioinformatics Algorithms*. MIT Press, 2004.
> - Adleman, L. M. "Molecular Computation of Solutions to Combinatorial Problems." *Science*, 1994.
