---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Course Overview and Learning Objectives
>
> > ## Questions/Cues
> >
> > - Apa tujuan pembelajaran (CPMK) dari IF3211 dan bagaimana hubungannya dengan biologi?
> > - Apa konteks biologi (BIO1-3) yang harus dikuasai mahasiswa informatika?
> > - Bagaimana struktur, bobot penilaian, dan aturan main mata kuliah ini?
> > - Buku teks dan roadmap topik apa yang menjadi acuan kuliah?
> > - Mengapa mahasiswa CS perlu mengambil kuliah biologi sama sekali?
> >
> > ## Reference Points
> >
> > - IF3211 — Course Introduction (PPT 1, bagian Objectives/CPMK)
> > - IF3211 — Course Introduction (PPT 1, bagian Course Description & General Rules)
> > - IF3211 — Course Introduction (PPT 1, bagian Textbooks & Course Contents)
>
> > ### Posisi dan Konteks Mata Kuliah
> >
> > **IF3211 Komputasi Domain Spesifik (Domain-Specific Computation)** adalah mata kuliah **2 SKS** (2×45 jam/semester) di STEI ITB yang mengajarkan **biologi kepada mahasiswa informatika** sebagai sebuah *domain* untuk diterapkannya komputasi. Mata kuliah ini memiliki **prasyarat IF3170 Artificial Intelligence**, menandakan bahwa biologi di sini diperlakukan sebagai sumber masalah komputasi yang kaya — bukan biologi hafalan, melainkan biologi yang **dipetakan ke algoritma, model, dan data**.
> >
> > Ide besarnya: sebuah *domain-specific computation* berarti kita mengambil teknik komputasi umum (search, optimization, machine learning, modeling) lalu **menspesialisasikannya** untuk karakteristik unik domain biologi — data berukuran masif, derau (noise) tinggi, dan aturan yang belum sepenuhnya universal.
> >
> > ### Capaian Pembelajaran (CPMK)
> >
> > Terdapat **empat CPMK** yang membentuk sebuah pipeline rekayasa (analisis → desain → implementasi → distribusi):
> >
> > 1. **Menganalisis** masalah komputasi di Biologi dan menerapkan **teori komputasi** untuk mengidentifikasi solusi.
> > 2. **Merancang** solusi berbasis *computing* untuk serangkaian kebutuhan komputasi di Biologi.
> > 3. **Mengimplementasikan** solusi berbasis *computing* atas kebutuhan tersebut.
> > 4. **Mengorganisasikan dan mendistribusikan** hasil pekerjaan komputasi di Biologi secara **efisien dan efektif**.
> >
> > Perhatikan urutan ini identik dengan siklus rekayasa perangkat lunak: dari **problem formulation** hingga **deployment/communication**.
> >
> > ### Konteks Biologi yang Dibangun (BIO1-3)
> >
> > Selain kemampuan komputasi, kuliah menetapkan tiga **capaian konteks biologi**:
> >
> > - **BIO 1** — memahami dasar biologi dari **makromolekul, sel, sistem organ, organisme, hingga ekosistem** (hierarki kehidupan).
> > - **BIO 2** — menyadari bahwa **biologi sangat luas** dan berkaitan dengan banyak disiplin lain (interdisipliner).
> > - **BIO 3** — mengasah **critical thinking** terhadap konsep dan fenomena biologi.
> >
> > BIO1 menjadi peta jalan konten kuliah; BIO3 menekankan bahwa mahasiswa tidak menghafal, melainkan **bernalar** seperti seorang saintis.
> >
> > ### Aturan, Penilaian, dan Bahan Acuan
> >
> > Komponen nilai: **Midterm (minggu 8)**, **Final (minggu 16)**, **Project Assignments (kelompok)**, dan **Exercises**. Kuliah berlangsung 2 jam/minggu. **Aturan ketat**: midterm/final wajib — tidak hadir tanpa alasan force majeure (bukti dokter/wali) berakibat nilai **E**; segala bentuk **kecurangan** (termasuk membantu mencontek dan curang pada tugas kelompok) berakibat **E untuk semua komponen** bagi semua anggota; penggunaan **Generative AI** diatur eksplisit di tiap tugas; dan untuk lulus, mahasiswa **tidak boleh ada nilai nol** di komponen mana pun. Buku acuan: **Campbell, *Biology*** (Pearson, 2014) untuk fondasi biologi, **Suraishkumar, *Biology for Engineers*** (2019) untuk sudut pandang rekayasa, dan **Jones & Pevzner, *An Introduction to Bioinformatics Algorithms*** (MIT Press, 2004) untuk sisi algoritmik.
> >
> > ### Computational Framing: Silabus sebagai Peta Domain-ke-Algoritma
> >
> > Roadmap konten kuliah — **Cell & Molecular → Genetics → Evolution → Biological Diversity → Ecology** — dapat dibaca sebagai sebuah **stack abstraksi** yang memetakan tiap topik biologi ke kelas masalah komputasi. Bagi mahasiswa CS, silabus ini adalah daftar *problem domains*: genetika memunculkan masalah **string/sequence alignment**, evolusi memunculkan **graph/tree inference** (pohon filogenetik), keragaman hayati memunculkan **klasifikasi**, dan ekologi memunculkan **simulasi sistem dinamis**. CPMK 1-4 adalah *contract* output: tiap topik harus berakhir menjadi solusi komputasi yang teranalisis, terdesain, terimplementasi, dan terkomunikasikan.
> >
> > ```mermaid
> > flowchart TD
> >     C["IF3211 Domain-Specific<br/>Computation"]
> >     C --> O["CPMK 1-4:<br/>Analisis &rarr; Desain &rarr;<br/>Implementasi &rarr; Distribusi"]
> >     C --> B["Konteks BIO 1-3:<br/>Hierarki, Interdisiplin,<br/>Critical Thinking"]
> >     C --> R["Roadmap Topik"]
> >     R --> R1["Cell &amp; Molecular"]
> >     R --> R2["Genetics"]
> >     R --> R3["Evolution"]
> >     R --> R4["Biological Diversity"]
> >     R --> R5["Ecology"]
> > ```

> [!cornell] #### Summary
>
> **IF3211 Komputasi Domain Spesifik** adalah mata kuliah 2 SKS (prasyarat **IF3170 AI**) yang memperlakukan **biologi sebagai domain komputasi** bagi mahasiswa informatika. Empat **CPMK** membentuk pipeline rekayasa **analisis → desain → implementasi → distribusi** solusi *computing* untuk masalah biologi, sementara tiga **capaian konteks BIO1-3** menargetkan penguasaan **hierarki kehidupan**, kesadaran sifat **interdisipliner**, dan **critical thinking**. Penilaian terdiri atas **midterm, final, proyek kelompok, dan latihan** dengan aturan integritas ketat (kecurangan → nilai E, tidak boleh ada komponen nol). Buku acuan utama adalah **Campbell *Biology***, **Suraishkumar *Biology for Engineers***, dan **Jones & Pevzner *Bioinformatics Algorithms***. Fondasi konseptualnya dibahas di [[Foundations of Computational Biology and Bioinformatics]] dan [[Bio-Inspired Computing and Why Engineers Study Biology]].

> [!ad-libitum]- Additional Information
>
> #### Mengapa Prasyarat AI?
>
> IF3170 membekali mahasiswa dengan **search, optimization, dan machine learning** — tepat alat yang dibutuhkan untuk *sequence alignment* (dynamic programming/search), *phylogenetic inference* (heuristic search), dan prediksi struktur protein (ML/deep learning seperti AlphaFold). Biologi menyediakan **data** dan **fungsi objektif**; AI menyediakan **mesin penyelesaiannya**.
>
> #### CS / Computational Angle
>
> CPMK 4 ("mengorganisasikan dan mendistribusikan secara efisien") sering diremehkan, padahal di bioinformatika praktik ini berarti **reproducibility**: pipeline harus dapat diulang (Snakemake/Nextflow), data versioned, dan hasil dapat diaudit. Anggap tiap proyek sebagai **artefak rekayasa**, bukan sekadar skrip sekali pakai.
>
> #### Proyek Eksplorasi Mandiri
> 1. Petakan tiap topik di roadmap kuliah ke minimal satu kelas masalah CS klasik (mis. Genetics → edit distance) dan tuliskan kompleksitasnya.
> 2. Susun template *reproducible project* (struktur folder + README + environment file) yang memenuhi CPMK 4 untuk proyek kelompok nanti.
>
> #### Bacaan Lanjutan
> - Campbell, N. A., et al. *Biology*. Pearson, 2014 — Bab 1.
> - Suraishkumar, G. K. *Biology for Engineers*. 2019.
> - Jones, N. C., & Pevzner, P. A. *An Introduction to Bioinformatics Algorithms*. MIT Press, 2004.
