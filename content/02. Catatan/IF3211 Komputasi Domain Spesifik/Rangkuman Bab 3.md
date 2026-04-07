---
type: Note

cssclasses:

- cornell-notes
---

_Back to_ [[IF3211 Komputasi Domain Spesifik]]

> [!cornell] Rangkuman Komprehensif: Genetika Molekuler, Ekspresi Gen, dan Genomik
> 
> > ## Questions/Cues
> > 
> > - Bagaimana DNA mempertahankan stabilitas sekaligus mereplikasi diri secara akurat?
> >     
> > - Bagaimana kode genetik dalam DNA diterjemahkan menjadi sifat fenotipik melalui sintesis protein?
> >     
> > - Mengapa kesalahan kecil pada tingkat nukleotida (mutasi) dapat menjadi kunci dalam evolusi dan adaptasi?
> >     
> > - Bagaimana algoritma ilmu komputer digunakan untuk memecahkan (sequencing) kode genom berskala gigabase?
> >     
> > - Apa yang dapat kita pelajari dari membandingkan genom antar spesies menggunakan pendekatan bioinformatika?
> >     
> > 
> > ## Reference Points
> > 
> > - Campbell Biology in Focus (Bab 13, 14, 18)
> >     
> > - Lecture Slides IF3211 (DNA Replication, Gene Expression, Genomics)
> >     
> > - Dokumen: Sequencing Technology Review, Human Genome Project Summary
> >     
> 
> > ### 1. Struktur dan Replikasi DNA
> > 
> > **DNA** terdiri dari dua untai polinukleotida anti-paralel yang membentuk _double helix_. Kestabilannya berasal dari tulang punggung gula-fosfat dan ikatan hidrogen pasangan basa komplementer (A=T, G$\equiv$C). Dalam proses replikasi, enzim **helikase** membuka heliks, dan **DNA polymerase** mensintesis untai baru secara $5' \rightarrow 3'$. Karena arah sintesis yang searah ini, replikasi menghasilkan untai kontinu (_leading strand_) dan untai terputus-putus (_lagging strand_ / fragmen Okazaki). Integritas replikasi dijaga melalui mekanisme **proofreading** (eksonuklease $3' \rightarrow 5'$) dan **Mismatch Repair (MMR)** yang menekan tingkat kesalahan hingga $1$ per $10^9$ nukleotida.
> > 
> > ### 2. Ekspresi Gen: Transkripsi dan Translasi
> > 
> > Informasi genetik diekspresikan (Sentral Dogma) lewat dua tahap utama:
> > 
> > - **Transkripsi**: Berlangsung di inti sel (pada eukariot). **RNA polymerase** membaca DNA _template_ untuk menyintesis _messenger RNA_ (mRNA). Proses ini melibatkan inisiasi di daerah _promoter_, elongasi, dan terminasi.
> >     
> > - **Translasi**: Terjadi di sitoplasma. **Ribosom** membaca kodon (tiga basa nukleotida) pada mRNA. Molekul **tRNA** dengan antikodon yang komplementer akan membawa asam amino spesifik. Asam amino dirangkai melalui ikatan peptida hingga menemukan kodon STOP.
> >     
> > 
> > Keduanya diregulasi secara ketat—mulai dari _splicing_ pada transkripsi hingga regulasi _mTOR_ pada translasi—untuk menyesuaikan produksi protein dengan kebutuhan sel.
> > 
> > ### 3. Mutasi dan Konsekuensinya
> > 
> > Kerusakan DNA akibat radiasi atau lolosnya proses _proofreading_ menghasilkan **mutasi**. Mutasi titik berdampak pada urutan kodon:
> > 
> > - **Missense**: Mengubah asam amino spesifik (misal: penyakit anemia sel sabit dari mutasi pada gen $\beta$-globin).
> >     
> > - **Nonsense**: Menghasilkan kodon stop prematur, sering menyebabkan protein terpotong dan tidak berfungsi.
> >     
> > - **Silent**: Mutasi netral yang tidak mengubah asam amino karena redundansi kodon.
> >     
> >     Meskipun banyak yang merugikan atau netral, mutasi adalah variasi mentah untuk **seleksi alam** dan evolusi (misal: resistensi antibiotik, kemampuan adaptasi).
> >     
> > 
> > ### 4. Teknologi Sequencing dan Bioinformatika
> > 
> > Penentuan urutan genom mengalami revolusi teknologi:
> > 
> > - **Generasi Pertama (Sanger)**: Lambat tapi sangat akurat. Digunakan pada _Human Genome Project_ bersama strategi _Whole-Genome Shotgun_.
> >     
> > - **Generasi Kedua (NGS)**: Membaca jutaan _read_ pendek secara paralel, sangat cepat, _throughput_ tinggi, namun rentan pada daerah DNA berulang.
> >     
> > - **Generasi Ketiga (Long-read)**: Mampu membaca fragmen DNA yang sangat panjang untuk menutup celah (_gap_) dalam perakitan genom.
> >     
> > 
> > Diperlukan pendekatan bioinformatika seperti algoritma **de Bruijn graph** dan **Overlap-Layout-Consensus (OLC)** untuk merakit jutaan _read_ menjadi urutan kromosom utuh.
> > 
> > ### 5. Genomik Komparatif
> > 
> > Genom yang telah terakit (seperti data dari _NCBI_ dan _Ensembl_) digunakan dalam **genomik komparatif**. Membandingkan ukuran, kepadatan gen, dan urutan basa antarspesies memberikan wawasan kuat mengenai filogeni dan pohon evolusi. Variasi $1,2\%$ Single Nucleotide Polymorphism (SNP) antara manusia dan simpanse menjelaskan asal-usul adaptasi kita (seperti imun dan otak). Analisis **Horizontal Gene Transfer (HGT)** pada prokariota juga memetakan persebaran cepat faktor resistensi dan virulensi bakteri.

> [!cornell] #### Summary
> 
> Keberlangsungan biologis bertumpu pada stabilitas replikasi **DNA** yang dijaga ketat oleh sistem _proofreading_ serta mesin ekspresi gen melalui **transkripsi dan translasi**. Di sisi lain, perubahan pada tingkat ini (**mutasi**) menyediakan bahan bagi divergensi evolusioner. Saat ini, kemajuan pesat **Teknologi Genomik (NGS)** dan analisis komputasional algoritma perakitan memungkinkan kita mengeksplorasi miliaran pasang basa. Melalui **genomik komparatif**, ilmuwan memanfaatkan _big data_ biologi untuk mengungkap pola adaptasi genetik masa lalu dan menemukan target terapi gen yang presisi untuk masa depan.

> [!ad-libitum]- Additional Information
> 
> #### Landasan Formal & Matematis
> 
> 1. **Kinetika Proofreading**: Kecepatan pemotongan basa yang salah oleh polimerase (_k_exo_) jauh melampaui laju polimerisasinya (_k_pol_), dapat dimodelkan dengan modifikasi kinetika Michaelis-Menten. Hal ini menjamin perbaikan dilakukan seketika sebelum replikasi dilanjutkan.
>     
> 2. **Distribusi Probabilitas Mutasi**: Tingkat munculnya mutasi gen dapat dimodelkan menggunakan distribusi **Poisson**, $P(k; \lambda) = e^{-\lambda} \lambda^k/k!$. Model ini krusial saat menghitung laju munculnya mutasi langka penyebab tumor (sel somatik) maupun adaptasi genetik.
>     
> 3. **Kompleksitas Algoritma Perakitan Genom**: Algoritma perakitan berbasis NGS menggunakan **de Bruijn graph** dengan pembagian _k-mer_. Kompleksitas memori berada di rentang $\mathcal{O}(N \cdot k)$ dengan waktu transversal lintasan Eulerian sekitar $\mathcal{O}(L \log L)$. _Hybrid assembly_ menggunakan OLC menurunkan kesalahan perakitan secara drastis dengan kompleksitas logaritmik yang disesuaikan (_MinHash_).
>     
> 
> #### Self‑Exploration Projects
> 
> 4. **Membangun Mini-Assembler**: Menggunakan dataset _E. coli_ publik, buat skrip _Python_ yang menyusun _de Bruijn graph_ dari _reads_ berformat FASTQ, lakukan perakitan dasar, lalu bandingkan statistik N50-nya menggunakan QUAST.
>     
> 5. **Analisis Variasi (SNP) Manusia-Simpanse**: Melalui data dari _1000 Genomes Project_, lakukan ekstraksi data komparatif menggunakan _vcftools_ untuk melihat persentase mutasi Missense vs Nonsense dan identifikasi _Selective Sweep_ pada _gene driver_.
>     
> 6. **Simulasi Replisom & CRISPR**: Buat kode komputasional yang melatih pemahaman perbaikan NHEJ pasca pemotongan menggunakan guide-RNA (Cas9) untuk melihat terbentuknya mutasi Indel (Insertion-Deletion) yang mengacak _open reading frame_ gen tersebut.
>     
> 
> #### Tools and Resources
> 
> - **Sequencing Aligner & Assembler**: _BWA-MEM_ dan _Bowtie2_ (untuk NGS _short-reads_), _SPAdes_, _MEGAHIT_, _Flye_.
>     
> - **Variant Calling**: _GATK_ (Genome Analysis Toolkit), _FreeBayes_.
>     
> - **Library Pemrograman**: _Biopython_ (manipulasi _seq_ DNA, RNA), _PyDNArep_ (simulasi replisom).
>     
> - **Database & Platform**: _Ensembl_, _NCBI Genome_, _UCSC Genome Browser_.
>