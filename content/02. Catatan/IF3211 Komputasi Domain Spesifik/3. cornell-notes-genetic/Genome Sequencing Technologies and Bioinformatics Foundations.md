---
type: Note
cssclasses:
  - cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Genome Sequencing Technologies and Bioinformatics Foundations
>
> > ## Questions/Cues
> >
> > - Mengapa pendekatan whole‑genome shotgun dipilih?
> > - Bagaimana algoritma perakitan menggabungkan fragmen pendek?
> > - Apa perbedaan utama antara data high‑throughput dan Sanger?
> > - Bagaimana basis data genom memfasilitasi analisis komparatif?
> > - Apa tantangan utama dalam analisis metagenom?
> >
> > ## Reference Points
> >
> > - Lecture_18_Genomics.pptx (Slides 31‑34, 36‑41)
> > - Human_Genome_Project_Summary.pdf (Pages 2‑5)
> > - Sequencing_Technology_Review.pdf (Pages 12‑19)
>
> > ### Teknologi Sequensing Generasi Pertama vs. Generasi Kedua
> >
> > Pada akhir abad ke‑20, metode Sanger masih menjadi standar “gold‑standard” untuk penentuan urutan DNA. Metode ini menggunakan terminator dideoksinukleotida yang menghentikan sintesis pada tiap basa, menghasilkan fragmen dengan panjang berbeda yang kemudian dipisahkan melalui elektroforesis kapiler. Meskipun akurasinya tinggi (≈99,99 %), prosesnya lambat, mahal, dan hanya dapat menghasilkan sekitar 800 bp per reaksi. Karena keterbatasan tersebut, proyek Human Genome Project (1990‑2003) menggabungkan Sanger dengan strategi **whole‑genome shotgun (WGS)**, di mana seluruh genom dibagi menjadi fragmen acak (biasanya 2‑10 kb) yang kemudian di‑clone dan di‑sequencing secara paralel.
> >
> > Generasi kedua (NGS – Next‑Generation Sequencing) mengubah paradigma dengan memproduksi jutaan hingga miliaran **read pendek** (35‑300 bp) secara bersamaan pada satu aliran (flow cell). Platform Illumina, misalnya, menggunakan sintesis berbasis reversible terminator, memungkinkan deteksi fluoresen pada tiap siklus penambahan basa. Keunggulan utama NGS meliputi throughput tinggi (gigabase per run), biaya per basis turun drastis, serta kemampuan untuk memproses banyak sampel secara multiplex. Namun, read pendek menimbulkan tantangan dalam perakitan, terutama pada wilayah berulang atau kaya GC.
> >
> > Teknologi generasi ketiga (PacBio SMRT, Oxford Nanopore) memperkenalkan **read panjang** (ratusan kilobasa hingga megabasa). Meskipun tingkat kesalahan mentahnya lebih tinggi (≈10‑15 %), kesalahan dapat dikurangi melalui konsensus berulang (circular consensus sequencing) atau perbaikan hybrid dengan data NGS. Read panjang mempermudah perakitan kontig panjang, mengidentifikasi struktur variasi besar (inversi, translokasi), serta menyelesaikan wilayah repetitif yang sebelumnya tidak dapat diurai.
> >
> > Secara keseluruhan, evolusi teknologi sequencing mencerminkan trade‑off antara **akurasi**, **panjang read**, dan **throughput**; pemilihan platform harus disesuaikan dengan tujuan riset (misalnya, resequencing populasi vs. de‑novo assembly).
> >
> > ### Proses Perakitan (Assembly) Genom
> >
> > Perakitan genom adalah langkah krusial yang mengubah ribuan hingga jutaan read pendek menjadi satu urutan kontinu (contig). Dua pendekatan utama digunakan: **de Bruijn graph** dan **overlap‑layout‑consensus (OLC)**. Pada de Bruijn graph, setiap read di‑split menjadi *k‑mer* (potongan sepanjang k). Node graph merepresentasikan k‑mer unik, sementara edge menghubungkan k‑mer yang berurutan dalam read. Traversal graph menghasilkan jalur yang merekonstruksi urutan asli. Kelebihan metode ini terletak pada efisiensi memori untuk data NGS, tetapi sensitif terhadap pilihan nilai k; nilai k terlalu kecil meningkatkan ambiguitas, nilai k terlalu besar memecah graph pada wilayah dengan coverage rendah.
> >
> > OLC, yang lebih umum pada data read panjang, memulai dengan menemukan pasangan read yang tumpang tindih (overlap) menggunakan algoritma seperti **MinHash** atau **seed‑and‑extend**. Setelah overlap teridentifikasi, layout dibangun untuk menentukan urutan relatif read, dan konsensus akhir dihasilkan untuk memperbaiki kesalahan. Karena memerlukan perbandingan semua‑versus‑semua, OLC menuntut sumber komputasi yang besar, tetapi menghasilkan contig yang lebih panjang dan akurat pada data long‑read.
> >
> > Setelah perakitan kontig, proses **scaffolding** menghubungkan kontig menjadi scaffold menggunakan informasi jarak (paired‑end, mate‑pair, atau data Hi‑C). Akhirnya, **gap‑filling** dan **polishing** (misalnya Pilon, Racon) memperbaiki basis yang salah serta menutup celah. Hasil akhir biasanya berupa assembly dengan statistik N50 (panjang contig di mana 50 % total panjang assembly berada pada atau di atas nilai tersebut) yang menjadi indikator kualitas.
> >
> > ### Basis Data Genom dan Analisis Bioinformatika
> >
> > Data hasil sequencing tidak berguna tanpa infrastruktur penyimpanan, anotasi, dan distribusi. **GenBank**, **ENA**, dan **DDBJ** merupakan repositori publik yang menyimpan urutan lengkap beserta metadata (organisme, metode sequencing, kualitas). Pada skala proyek besar, konsorsium seperti **1000 Genomes Project** atau **TCGA** menyediakan dataset yang telah diproses (variant call format, expression matrices) serta platform visualisasi (UCSC Genome Browser, Ensembl).
> >
> > Analisis bioinformatika dimulai dengan **quality control** (FastQC, MultiQC) untuk menilai kualitas base‑calling, adaptor, dan distribusi kualitas. Selanjutnya, **aligner** (BWA‑MEM, Bowtie2) memetakan read ke referensi, menghasilkan file BAM yang dapat diproses lebih lanjut. **Variant calling** (GATK, FreeBayes) mengidentifikasi SNP, indel, dan varian struktural, sementara **annotation** (SnpEff, VEP) menambahkan informasi fungsional (konsekuensi pada gen, prediksi patogenisitas).
> >
> > Pada studi metagenomik, pendekatan **taxonomic profiling** (Kraken2, MetaPhlAn) dan **assembly metagenomik** (MEGAHIT, metaSPAdes) memungkinkan identifikasi mikroorganisme serta rekonstruksi genom mikroba (MAGs). Analisis downstream mencakup **pangenome** (Roary, Panaroo) untuk menilai variasi genetik antar strain, serta **gene ontology** atau **pathway enrichment** (KEGG, GO) untuk menafsirkan fungsi biologis.
> >
> > ### Tantangan Etika, Legal, dan Reproducibility
> >
> > Dengan meningkatnya kemampuan sequencing, muncul isu‑isu etika terkait **privasi data genomik** manusia. Regulasi seperti **GDPR** (EU) dan **HIPAA** (AS) mengatur penyimpanan dan berbagi data pribadi, menuntut de‑identifikasi yang ketat serta persetujuan informatif (informed consent). Selain itu, **data sharing** dalam format standar (FASTA, FASTQ, BAM/CRAM, VCF) dan penggunaan **workflow management system** (Snakemake, Nextflow, CWL) meningkatkan reproducibility penelitian. Repositori kode (GitHub, GitLab) dan lingkungan kontainer (Docker, Singularity) memudahkan replikasi analisis pada platform komputasi yang berbeda.
> >
> > ### Aplikasi Praktis Sequensing dan Bioinformatika
> >
> > - **Diagnostik klinis**: NGS panel genetik untuk kanker, penyakit langka, serta tes **non‑invasive prenatal testing (NIPT)** berbasis cfDNA.
> > - **Pertanian**: Pemetaan genomik tanaman (misalnya jagung, padi) untuk marker‑assisted selection dan rekayasa genetik.
> > - **Mikrobiologi lingkungan**: Metagenomik laut dan tanah untuk menemukan enzim industri baru atau memantau resistensi antibiotik.
> > - **Evolusi dan filogenetika**: Analisis whole‑genome alignment (Mauve, progressiveCactus) untuk merekonstruksi pohon filogenetik dengan resolusi tinggi.
> >
> > Setiap aplikasi menuntut penyesuaian pipeline, pemilihan platform sequencing, serta interpretasi hasil yang mempertimbangkan konteks biologis dan klinis.

> [!cornell] #### Summary
>
> **Sequencing generasi kedua (NGS) dan ketiga (long‑read)** telah mengubah cara ilmuwan memperoleh data genomik, menyeimbangkan antara throughput tinggi, biaya rendah, dan kemampuan membaca wilayah kompleks. Proses **perakitan** mengandalkan struktur graf (de Bruijn atau OLC) dan teknik scaffolding untuk menghasilkan assembly berkualitas, yang selanjutnya dianalisis melalui **pipeline bioinformatika**—dari kontrol kualitas hingga anotasi varian. Penyimpanan dan distribusi data melalui basis data publik serta standar format memastikan **reproducibility** dan **kolaborasi** global, sementara pertimbangan etika dan privasi menjadi semakin penting dalam aplikasi klinis dan populasi.

> [!ad-libitum]- Additional Information
>
> #### Formal Complexity Analysis of Assembly Algorithms
>
> Pada de Bruijn graph, kompleksitas memori utama adalah O(N · k) dimana N adalah jumlah total *k‑mer* unik dan k adalah panjang k‑mer. Operasi pembuatan graph bersifat linear terhadap total read length (L), sehingga waktu pembuatan ≈ O(L). Traversal untuk menemukan Eulerian path dapat dilakukan dalam O(N + E) dimana E≈N (karena graph biasanya hampir regular). Namun, proses **tip removal**, **bubble popping**, dan **coverage‑based cleaning** menambah iterasi tambahan yang meningkatkan waktu menjadi O(L · log L) pada praktik. Untuk OLC, kompleksitas utama adalah pencarian overlap, yang secara naïf adalah O(R² · l) (R = jumlah read, l = panjang rata‑rata). Implementasi modern menggunakan **MinHash** atau **FM‑index** menurunkan kompleksitas menjadi hampir linear O(R · l · log R).
>
> #### Hybrid Assembly Strategies
>
> Kombinasi data short‑read (Illumina) dan long‑read (PacBio/Oxford Nanopore) dikenal sebagai **hybrid assembly**. Pendekatan “**polishing**” pertama menggunakan long‑read untuk membangun kontur panjang (misalnya Canu), kemudian memperbaiki kesalahan dengan short‑read melalui alat seperti Pilon atau Racon. Strategi ini memanfaatkan keunggulan masing‑masing platform: long‑read mengatasi repetisi, short‑read meningkatkan akurasi basis. Studi benchmark (Wick et al., 2021) menunjukkan peningkatan N50 hingga 3‑5× dan penurunan error rate di bawah 0,1 % dibandingkan dengan penggunaan satu platform saja.
>
> #### Metagenomic Assembly and Binning
>
> Pada data metagenom, tidak ada referensi tunggal; oleh karena itu, pendekatan **co‑assembly** menggabungkan semua read, diikuti oleh **binning** untuk memisahkan kontig ke dalam **Metagenome‑assembled Genomes (MAGs)**. Algoritma binning (MetaBAT2, CONCOCT, MaxBin) memanfaatkan pola k‑mer, coverage across multiple samples, dan tanda taksonomi (tanda marker gene). Evaluasi kualitas MAG menggunakan **CheckM** mengukur completeness dan contamination; standar Minimum Information about a Metagenome‑assembled Genome (MIMAG) merekomendasikan >90 % completeness dan <5 % contamination untuk MAG berkualitas tinggi.
>
> #### Comparative Genomics Tools
>
> Untuk membandingkan genom secara besar‑skala, alat **MUMmer4** menyediakan alignment berbasis suffix‑tree yang dapat memproses gigabase dalam hitungan menit. **OrthoFinder** dan **Proteinortho** mengidentifikasi ortolog dengan pendekatan graph‑based clustering, memfasilitasi analisis pangenome. Visualisasi perbedaan struktural dapat dilakukan dengan **Syri** atau **JBrowse** yang menampilkan inversi, duplikasi, dan transposon.
>
> #### Self‑Exploration Projects
>
> 1. **Implementasi Mini‑Assembler**: Buat skrip Python sederhana yang membangun de Bruijn graph dari dataset *E. coli* Illumina (public domain). Evaluasi kontig yang dihasilkan dengan QUAST dan bandingkan N50 dengan hasil SPAdes.
> 2. **Analisis Metagenom Laut**: Unduh data shotgun metagenom dari proyek Tara Oceans, lakukan quality control, assemble dengan MEGAHIT, dan lakukan binning menggunakan MetaBAT2. Identifikasi MAG yang mengandung gen untuk fotosintesis dan anotasi fungsi dengan Prokka.
>
> #### Tools and Resources
>
> - **FastQC** / **MultiQC** – evaluasi kualitas read.
> - **BWA‑MEM**, **Bowtie2** – aligner untuk short‑read.
> - **Minimap2** – aligner universal untuk long‑read.
> - **SPAdes**, **MEGAHIT**, **Canu**, **Flye** – assembler masing‑masing platform.
> - **GATK**, **FreeBayes** – variant calling pipelines.
> - **Ensembl**, **UCSC Genome Browser**, **NCBI Genome** – basis data referensi.
> - **Snakemake**, **Nextflow** – workflow management.
> - **Docker**, **Singularity** – containerization untuk reproducibility.
>
> #### Further Reading
>
> - **“Genome Sequencing Technologies”** – Mardis, *Nature Reviews Genetics* (2022).
> - **“Bioinformatics Data Skills”** – Vince Buffalo, O’Reilly Media (2020).
> - **“Metagenomics: Methods and Protocols”** – Singh et al., *Methods in Molecular Biology* (2021).
> - **NCBI Handbook** – Chapter on “Next‑Generation Sequencing”.
> - **The 1000 Genomes Project** – Data portal and analysis tutorials.